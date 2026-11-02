#!/usr/bin/env python3
"""Auditoría técnica de diluu.com (solo lectura: peticiones HTTP, nada más).

  python3 scripts/auditoria-web.py --rapido
      URLs de los sitemaps: todas deben dar 200 sin redirección. Para la rutina seo-lunes (domingo).

  python3 scripts/auditoria-web.py [--gsc data/gsc-paginas-AAAA-MM.csv] [--oculto OCULTOS SIN_MARCA]
      Auditoría completa para la revisión mensual (día 1):
      1. URLs de los sitemaps y URLs con impresiones en Search Console: 404, cadenas de redirecciones,
         redirecciones a otro idioma o a una portada.
      2. Enlaces internos de todas las páginas del sitemap que llevan a un 404 o a una redirección.
      3. Páginas de clases tal como las lee Google sin JavaScript: contadores, línea de precios
         (dlp-static) con los precios de la API, precio del schema, canonical, noindex y hreflang.
      4. Sitemap de Yoast: entradas que no dan 200 (van dentro del punto 1, separadas por sitemap).
      5. Búsquedas ocultas por Google en las páginas de clases (--oculto: clics con búsqueda «(unknown)» y clics
         sin marca de esas páginas en el mes, de Search Console vía Supermetrics): alarma si > 50 %.

  URLs con tráfico: scripts/auditoria-urls-historicas.csv (ruta,clics,impresiones; Search Console desde jun 2025).
  --gsc: CSV del mes (page o ruta,clicks,impressions) de Supermetrics (ds GW, sc-domain:diluu.com): sus URLs
  nuevas se añaden al histórico y las conocidas suben al máximo visto. Excepciones aceptadas (redirecciones a
  propósito): scripts/auditoria-excepciones.txt, una ruta por línea con «# motivo».
  Escribe data/auditoria-web-AAAA-MM-DD.md y un resumen. Sale con código 1 si hay algo roto.
"""
import argparse, csv, datetime, html, json, re, sys, urllib.error, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

BASE = "https://diluu.com"
UA = "Mozilla/5.0 (compatible; DiluuAuditoria/1.0; +https://diluu.com)"
SITEMAPS = ["/sitemap-static.xml", "/sitemap_index.xml"]
API_PRECIOS = "https://platform.diluu.com/api/public/class-prices"
# Páginas de clases (misma regla que la métrica de clics de padres, sin blog)
RE_CLASES = re.compile(r"classes-for-kids|cours-de-francais|cours-despagnol|clases-de-espanol|clases-de-frances|"
                       r"espanol-para|espagnol-pour|frances-para|lectoescritura|literacy|lire-et-ecrire|heritage|"
                       r"kindergartners|bilingues|cours-flam")
RE_LECTO = re.compile(r"literacy|lectoescritura|lire-et-ecrire")
PORTADAS = {"/", "/es/", "/fr/", "/blog/", "/es/blog/", "/fr/blog/"}
RAIZ = Path(__file__).resolve().parent.parent
HISTORICO = RAIZ / "scripts" / "auditoria-urls-historicas.csv"
EXCEPCIONES = RAIZ / "scripts" / "auditoria-excepciones.txt"


class SinRedireccion(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k):
        return None


ABRIR = urllib.request.build_opener(SinRedireccion)


def pedir(url, cuerpo=False, timeout=20):
    """Una petición sin seguir redirecciones. Devuelve (código, location, texto|None)."""
    req = urllib.request.Request(url, headers={"User-Agent": UA}, method="GET")
    try:
        with ABRIR.open(req, timeout=timeout) as r:
            txt = r.read().decode("utf-8", "replace") if cuerpo else None
            return r.status, None, txt
    except urllib.error.HTTPError as e:
        return e.code, e.headers.get("Location"), None
    except Exception as e:  # red, timeout
        return 0, str(e)[:80], None


def seguir(url, maximo=10):
    """Sigue redirecciones a mano. Devuelve dict con cadena, código final y URL final."""
    cadena, actual = [], url
    for _ in range(maximo):
        cod, loc, _ = pedir(actual)
        cadena.append((cod, actual))
        if cod in (301, 302, 303, 307, 308) and loc:
            actual = urllib.parse.urljoin(actual, loc)
            continue
        return {"url": url, "final": actual, "codigo": cod, "saltos": len(cadena) - 1, "cadena": cadena}
    return {"url": url, "final": actual, "codigo": -1, "saltos": maximo, "cadena": cadena}


def ruta(u):
    p = urllib.parse.urlparse(u)
    return p.path or "/"


def idioma(u):
    r = ruta(u)
    if r.startswith(("/en/es/", "/en/fr/")):  # rutas antiguas de Polylang: el idioma es el segundo segmento
        r = r[3:]
    return "es" if r.startswith("/es/") or r == "/es" else "fr" if r.startswith("/fr/") or r == "/fr" else "en"


def urls_sitemaps():
    """{url: nombre del sitemap}, leyendo índices de sitemaps de un nivel."""
    vistos, pendientes, out = set(), [BASE + s for s in SITEMAPS], {}
    while pendientes:
        sm = pendientes.pop()
        if sm in vistos:
            continue
        vistos.add(sm)
        cod, _, txt = pedir(sm, cuerpo=True)
        if cod != 200 or not txt:
            out[sm] = "sitemap ilegible"
            continue
        locs = re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", txt)
        if "<sitemapindex" in txt:
            pendientes += locs
        else:
            for l in locs:
                out.setdefault(html.unescape(l), ruta(sm).lstrip("/"))
    return out


def normalizar(u):
    """URL o ruta de diluu.com → URL canónica https://diluu.com/ruta (sin query ni #). None si es de otro host."""
    u = u.strip().split("#")[0]
    if u.startswith("/"):
        u = BASE + u
    p = urllib.parse.urlparse(u)
    if p.netloc not in ("diluu.com", "www.diluu.com") or "?" in u or p.path.startswith(("/_next", "/wp-content")):
        return None
    return BASE + (p.path or "/")


def leer_csv(path):
    filas = {}
    with open(path, newline="", encoding="utf-8") as f:
        for r in csv.reader(f):
            if len(r) < 2 or not r[0].strip().startswith(("/", "http")):
                continue
            u = normalizar(r[0])
            if not u:
                continue
            num = lambda x: int(float(x)) if x.strip().replace(".", "").isdigit() else 0
            c, i = num(r[1]), num(r[2]) if len(r) > 2 else 0
            a = filas.setdefault(u, [0, 0])
            a[0], a[1] = max(a[0], c), max(a[1], i)
    return filas


def leer_gsc(nuevo=None):
    """Histórico + CSV del mes; guarda el histórico ampliado."""
    hist = leer_csv(HISTORICO) if HISTORICO.exists() else {}
    if nuevo:
        antes = len(hist)
        for u, (c, i) in leer_csv(nuevo).items():
            a = hist.setdefault(u, [0, 0])
            a[0], a[1] = max(a[0], c), max(a[1], i)
        filas = sorted(hist.items(), key=lambda x: (-x[1][0], -x[1][1], x[0]))
        with open(HISTORICO, "w", newline="", encoding="utf-8") as f:
            w = csv.writer(f)
            w.writerow(["ruta", "clics", "impresiones"])
            for u, (c, i) in filas:
                w.writerow([ruta(u), c, i])
        print(f"Histórico de URLs: {antes} → {len(hist)}")
    return hist


def excepciones():
    if not EXCEPCIONES.exists():
        return set()
    return {normalizar(l.split("#")[0]) for l in EXCEPCIONES.read_text(encoding="utf-8").splitlines()
            if l.split("#")[0].strip()} - {None}


def numeros(txt):
    """Todos los importes de un texto como floats (acepta 10.50, 10,50, 150,000 no es importe)."""
    vals = set()
    for m in re.findall(r"(?<![\d.,])(\d{1,4}(?:[.,]\d{1,2})?)(?![\d])", txt):
        try:
            vals.add(round(float(m.replace(",", ".")), 2))
        except ValueError:
            pass
    return vals


def precios_api():
    cod, _, txt = pedir(API_PRECIOS, cuerpo=True)
    if cod != 200:
        return None
    d = json.loads(txt)
    esp = {}
    for c in d["currencies"]:
        if c["currency"] not in ("GBP", "EUR", "USD"):
            continue
        P = {(p["visibility"], p["weeklyClasses"], p["plan"]): p["pricePerClassDecimal"] for p in c["prices"]}
        esp[c["currency"]] = {
            "grupo_desde": P.get(("PUBLIC", 1, "FOUR_WEEKS")),
            "grupo_min": min(v for k, v in P.items() if k[0] == "PUBLIC"),
            "indiv_min": min(v for k, v in P.items() if k[0] == "PRIVATE"),
        }
    return {"actualizado": d.get("updatedAt"), "precios": esp}


def revisar_clase(u, txt, api):
    """Problemas del HTML servido de una página de clases."""
    prob = []
    nums = re.findall(r'<div class="num"[^>]*data-count="[^"]*"[^>]*>([^<]*)<', txt)
    if any(n.strip() in ("", "0") for n in nums):
        prob.append("contador a 0 en el HTML")
    can = re.findall(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']+)', txt)
    if not can:
        prob.append("sin canonical")
    elif can[0].rstrip("/") != u.rstrip("/"):
        prob.append(f"canonical a otra URL ({can[0]})")
    if re.search(r'<meta[^>]+name=["\']robots["\'][^>]+noindex', txt, re.I):
        prob.append("noindex")
    hl = set(re.findall(r'hreflang=["\']([a-zA-Z-]+)["\']', txt))
    if not {"en", "es", "fr"} <= {h.split("-")[0].lower() for h in hl}:
        prob.append(f"hreflang incompleto ({', '.join(sorted(hl)) or 'ninguno'})")
    lecto = bool(RE_LECTO.search(u))
    precios = re.findall(r'"price"\s*:\s*"([^"]+)"\s*,\s*"priceCurrency"\s*:\s*"([A-Z]+)"', txt)
    if api:
        P = api["precios"]
        esperado = (P["EUR"]["indiv_min"], "EUR") if lecto else (P["USD"]["grupo_min"], "USD")
        if not precios:
            prob.append("schema sin precio")
        else:
            for pr, cur in precios:
                if cur != esperado[1] or abs(float(pr) - esperado[0]) > 0.001:
                    prob.append(f"schema {pr} {cur}; según la API debería ser {esperado[0]:g} {esperado[1]}")
    widget = 'id="diluu-pricing"' in txt
    st = re.findall(r'class="dlp-static"[^>]*>(.*?)</p>', txt, re.S)
    if widget and not st:
        prob.append("widget de precios sin línea dlp-static (sin JS no se ven precios)")
    if st and api:
        vals = numeros(re.sub(r"<[^>]+>", " ", " ".join(st)))
        claves = ["indiv_min"] if lecto else ["grupo_desde", "grupo_min", "indiv_min"]
        faltan = [f"{cur} {P[cur][k]:g}" for cur in ("GBP", "EUR", "USD") for k in claves
                  if P[cur][k] is not None and round(P[cur][k], 2) not in vals]
        if faltan:
            prob.append("línea de precios desactualizada (no aparece: " + ", ".join(faltan) + ")")
        if lecto and re.search(r"grupo|group|groupe", " ".join(st), re.I):
            prob.append("lectoescritura con precios de grupo en la línea dlp-static")
    if lecto and widget and 'data-default-visibility="PRIVATE"' not in txt:
        prob.append("lectoescritura: el widget no abre en individual")
    return prob


def enlaces_internos(txt):
    out = set()
    for h in re.findall(r'<a\s[^>]*href=["\']([^"\'#]+)', txt, re.I):
        h = html.unescape(h).strip()
        if h.startswith(("mailto:", "tel:", "javascript:", "whatsapp:")):
            continue
        absu = urllib.parse.urljoin(BASE + "/", h)
        p = urllib.parse.urlparse(absu)
        if p.netloc not in ("diluu.com", "www.diluu.com") or p.path.startswith(("/wp-", "/cdn-cgi")):
            continue
        out.add(urllib.parse.urlunparse(p._replace(scheme="https", netloc="diluu.com", fragment="")))
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--rapido", action="store_true")
    ap.add_argument("--gsc")
    ap.add_argument("--oculto", nargs=2, type=float, metavar=("OCULTOS", "SIN_MARCA"))
    ap.add_argument("--hilos", type=int, default=12)
    a = ap.parse_args()
    hoy = datetime.date.today().isoformat()
    sm = urls_sitemaps()
    exc = excepciones()
    rotos_sm = []
    with ThreadPoolExecutor(a.hilos) as ex:
        res_sm = dict(zip(sm, ex.map(seguir, list(sm))))
    for u, r in res_sm.items():
        if (r["codigo"] != 200 or r["saltos"]) and u not in exc:
            rotos_sm.append((sm[u], u, r))

    if a.rapido:
        print(f"Sitemaps: {len(sm)} URLs; {len(rotos_sm)} no dan 200 directo.")
        for s, u, r in sorted(rotos_sm, key=lambda x: (x[0], x[1])):
            print(f"  [{s}] {ruta(u)} → {r['codigo']} ({r['saltos']} saltos) {ruta(r['final'])}")
        sys.exit(1 if rotos_sm else 0)

    L = [f"# Auditoría técnica de diluu.com · {hoy}", "",
         "Script: scripts/auditoria-web.py (solo lectura, HTTP). Sin JavaScript: lo que lee Google o un asistente.", ""]
    hay_algo = False

    # 1. URLs con tráfico (Search Console) + sitemaps
    gsc = leer_gsc(a.gsc)
    extra = [u for u in gsc if u not in res_sm]
    with ThreadPoolExecutor(a.hilos) as ex:
        res_gsc = dict(zip(extra, ex.map(seguir, extra)))
    todos = {**res_sm, **res_gsc}
    malos = []
    for u, r in todos.items():
        if u in exc:
            continue
        motivo = []
        if r["codigo"] != 200:
            motivo.append(f"{r['codigo'] or 'sin respuesta'} al final")
        if r["saltos"] > 1:
            motivo.append(f"{r['saltos']} saltos")
        if r["saltos"] and r["codigo"] == 200:
            if idioma(u) != idioma(r["final"]) and not ruta(r["final"]).startswith("/trial-"):
                motivo.append(f"cambia de idioma ({idioma(u)}→{idioma(r['final'])})")
            if ruta(r["final"]) in PORTADAS and ruta(u) not in PORTADAS:
                motivo.append("acaba en una portada")
        if u in res_sm and r["saltos"] and r["codigo"] == 200:
            motivo.append(f"está en {sm[u]} y redirige")
        if motivo:
            malos.append((gsc.get(u, [0, 0])[0], gsc.get(u, [0, 0])[1], u, r, motivo))
    malos.sort(key=lambda x: (-x[0], -x[1], x[2]))
    L += ["## 1. URLs que no llegan bien (sitemaps + Search Console)", "",
          f"Revisadas {len(todos)} URLs: {len(sm)} de los sitemaps y {len(extra)} más con impresiones en Search Console"
          + f" (histórico{' + ' + a.gsc if a.gsc else ''}). Excepciones aceptadas: {len(exc)}.", ""]
    if malos:
        hay_algo = True
        L += ["| Clics | Impr. | URL | Llega a | Problema |", "|---:|---:|---|---|---|"]
        for c, i, u, r, m in malos[:150]:
            L.append(f"| {c} | {i} | {ruta(u)} | {r['codigo']} {ruta(r['final'])} | {'; '.join(m)} |")
        if len(malos) > 150:
            L.append(f"| | | … y {len(malos) - 150} más | | |")
    else:
        L.append("Todo bien.")
    L.append("")

    # 2 y 3. Recorrer las páginas del sitemap que dan 200
    paginas = [u for u, r in res_sm.items() if r["codigo"] == 200 and not r["saltos"] and not u.endswith(".xml")]
    with ThreadPoolExecutor(a.hilos) as ex:
        cuerpos = dict(zip(paginas, ex.map(lambda u: pedir(u, cuerpo=True)[2] or "", paginas)))
    destinos = {}
    for u, txt in cuerpos.items():
        for d in enlaces_internos(txt):
            destinos.setdefault(d, set()).add(ruta(u))
    por_comprobar = [d for d in destinos if d not in todos]
    with ThreadPoolExecutor(a.hilos) as ex:
        todos.update(dict(zip(por_comprobar, ex.map(seguir, por_comprobar))))
    malos_enl = []
    for d, origen in destinos.items():
        r = todos[d]
        if r["codigo"] != 200:
            malos_enl.append((len(origen), d, f"{r['codigo']} (roto)", origen))
        elif r["saltos"]:
            malos_enl.append((len(origen), d, f"redirige a {ruta(r['final'])}", origen))
    malos_enl.sort(key=lambda x: (-x[0], x[1]))
    L += ["## 2. Enlaces internos a páginas rotas o que redirigen", "",
          f"{len(destinos)} destinos internos distintos en {len(cuerpos)} páginas.", ""]
    if malos_enl:
        hay_algo = True
        L += ["| Enlace | Qué pasa | Páginas que lo tienen |", "|---|---|---|"]
        for n, d, q, o in malos_enl[:120]:
            ej = ", ".join(sorted(o)[:3]) + (f" y {n - 3} más" if n > 3 else "")
            L.append(f"| {ruta(d)}{'?' + urllib.parse.urlparse(d).query if urllib.parse.urlparse(d).query else ''} | {q} | {ej} |")
    else:
        L.append("Todo bien.")
    L.append("")

    api = precios_api()
    clases = [u for u in cuerpos if RE_CLASES.search(ruta(u)) and "/blog/" not in u]
    prob_clases = {u: revisar_clase(u, cuerpos[u], api) for u in sorted(clases)}
    prob_clases = {u: p for u, p in prob_clases.items() if p}
    L += ["## 3. Páginas de clases sin JavaScript", "",
          f"{len(clases)} páginas. Precios de referencia: API pública"
          + (f" (actualizada {api['actualizado'][:10]}): grupo desde " + " / ".join(f"{api['precios'][c]['grupo_desde']:g} {c}" for c in ('GBP', 'EUR', 'USD'))
             + "; schema esperado: grupo " + f"{api['precios']['USD']['grupo_min']:g} USD, lectoescritura {api['precios']['EUR']['indiv_min']:g} EUR." if api else " no disponible: no se comprueban precios."), ""]
    if prob_clases:
        hay_algo = True
        for u, p in prob_clases.items():
            L.append(f"- **{ruta(u)}**: " + "; ".join(p))
    else:
        L.append("Todo bien.")
    L.append("")

    # 4. Yoast (resumen del punto 1)
    yoast = [(s, u, r) for s, u, r in rotos_sm if s not in ("sitemap-static.xml",)]
    L += ["## 4. Sitemap de Yoast (WordPress)", ""]
    if yoast:
        hay_algo = True
        L.append(f"{len(yoast)} entradas no dan 200 directo. Si son posts, pasarlos a borrador en wp-admin; si son "
                 "páginas que redirigen a propósito (formularios), dejarlas:")
        for s, u, r in yoast:
            L.append(f"- [{s}] {ruta(u)} → {r['codigo']} {r['final'].replace(BASE, '')}")
    else:
        L.append("Todo bien.")
    L.append("")

    # 5. Búsquedas ocultas
    L += ["## 5. Búsquedas que Google oculta (páginas de clases, clics sin marca)", ""]
    if a.oculto:
        oc, tot = a.oculto
        pct = oc / tot * 100 if tot else 0
        L.append(f"{oc:g} de {tot:g} clics sin marca llegan sin búsqueda visible ({pct:.0f} %)."
                 + (" **Alarma: más de la mitad.** Ninguna métrica que filtre por el texto de la búsqueda es fiable; "
                    "mide por página (como la de clics de padres)." if pct > 50 else ""))
        if pct > 50:
            hay_algo = True
    else:
        L.append("Sin dato (pasa --oculto OCULTOS SIN_MARCA desde Search Console).")
    L.append("")

    out = RAIZ / "data" / f"auditoria-web-{hoy}.md"
    out.parent.mkdir(exist_ok=True)
    out.write_text("\n".join(L), encoding="utf-8")
    print(f"Informe: {out.relative_to(RAIZ)}")
    print(f"1. URLs mal: {len(malos)} de {len(todos)} · 2. enlaces internos mal: {len(malos_enl)} · "
          f"3. páginas de clases con problemas: {len(prob_clases)} de {len(clases)} · 4. Yoast: {len(yoast)}"
          + (f" · 5. ocultas {a.oculto[0] / a.oculto[1] * 100:.0f} %" if a.oculto else ""))
    sys.exit(1 if hay_algo else 0)


if __name__ == "__main__":
    main()
