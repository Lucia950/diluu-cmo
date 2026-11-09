#!/usr/bin/env node
// Preguntas a las IA por API (sustituye el paso manual del viernes de Bárbara; decisión de Lucia, 9 nov 2026).
// Hace las 12 preguntas de la herramienta SEO Diluu (PREGUNTAS_IA de dashboard/seo-diluu.html) a ChatGPT (OpenAI
// Responses + web_search), Gemini (Google Search grounding) y Perplexity (sonar), sin sesión ni memoria, con la
// ubicación del padre que pregunta, y clasifica cada respuesta como en la herramienta:
//   "No sale" | "Sale 1.º–3.º" | "Sale 4.º o más"   (clave "<índice>-<asistente>", colección `ia`, documento AAAA-MM)
//
// Uso (con las claves propias de Lucia en S3, skill diluu-ops:claves-propias):
//   node ~/.claude/plugins/cache/diluu/diluu-ops/*/scripts/personal-keys.cjs run -- node scripts/ia-respuestas.cjs
//   node scripts/ia-respuestas.cjs --probar      # sin claves: comprueba la clasificación con textos de ejemplo
//   node scripts/ia-respuestas.cjs --solo ChatGPT,Gemini   --mes 2026-11
// Claves: OPENAI_API_KEY, GEMINI_API_KEY (Google AI Studio), PERPLEXITY_API_KEY. Modelos por variable opcional:
//   OPENAI_MODEL (gpt-5), GEMINI_MODEL (gemini-2.5-flash), PERPLEXITY_MODEL (sonar).
// Salida: data/ia-respuestas-AAAA-MM.json (r, citas, textos) y data/ia-respuestas-AAAA-MM.md (resumen). La revisión
// mensual escribe `r`, `citas` y `fuente: "api"` en ia/AAAA-MM de la base del artefacto. Coste: ≈ 36 llamadas al mes.

const fs = require("fs"), path = require("path");
const RAIZ = path.resolve(__dirname, "..");
const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const PROBAR = args.includes("--probar");
const MES = opt("--mes", new Date().toISOString().slice(0, 7));
const SOLO = (opt("--solo", "ChatGPT,Gemini,Perplexity")).split(",").map(s => s.trim());

// Las 12 preguntas, leídas del HTML para no duplicarlas.
function preguntas() {
  const html = fs.readFileSync(path.join(RAIZ, "dashboard/seo-diluu.html"), "utf8");
  const m = html.match(/const PREGUNTAS_IA = \[([\s\S]*?)\];/);
  if (!m) throw new Error("No encuentro PREGUNTAS_IA en dashboard/seo-diluu.html");
  return [...m[1].matchAll(/"([^"]+)"/g)].map(x => x[1]);
}
// País del padre que pregunta (se fija por API; en la herramienta Bárbara lo anota a mano).
function pais(q) {
  const s = q.toLowerCase();
  if (/\buk\b|united kingdom|royaume|reino unido/.test(s)) return "GB";
  if (/ireland|irlande|irlanda/.test(s)) return "IE";
  if (/\bus\b|estados unidos|usa/.test(s)) return "US";
  if (/[àâçéèêëîïôûùüÿœ]|français|cours/.test(s)) return "IE";   // francés: Irlanda, Australia y Reino Unido
  if (/[áéíóúñ¿]|español|niños/.test(s)) return "US";              // español: familias en EE. UU.
  return "US";
}
const CIUDAD = { GB: "London", IE: "Dublin", US: "New York" };

// Marcas que suelen recomendar (para las citas). Se amplía cuando aparezca una nueva.
const MARCAS = ["Diluu", "Preply", "italki", "Outschool", "Novakid", "Lingokids", "Duolingo", "Babbel", "Rosetta Stone",
  "Homeschool Spanish Academy", "Spanish School Bus", "Spanish Playground", "Cambly", "Verbling", "Berlitz", "Alliance Française",
  "Instituto Cervantes", "Gus on the Go", "Muzzy", "Little Pim", "Dinolingo", "Mango Languages", "Busuu", "Memrise",
  "Allschool", "Varsity Tutors", "Wyzant", "Superprof", "Tutorful", "Kidspire", "PandaTree", "Speak Spanish Kids",
  "Lingoda", "Learn French With Alexa", "French Together", "Talkpal", "Mondly", "Fluenz", "Pimsleur", "Rockalingua",
  "Calico Spanish", "Spanish Safari", "Canticos", "Whistlefritz", "Salsa", "Sesame"];

function clasifica(texto) {
  const t = String(texto || "");
  if (!/diluu/i.test(t)) return { r: "No sale", pos: null };
  // Elementos de lista (numerados, viñetas o títulos en negrita) en orden de aparición.
  const items = t.split(/\n/).filter(l => /^\s*(\d+[.)]|[-*•]|#{1,4}\s|\*\*)/.test(l));
  const idx = items.findIndex(l => /diluu/i.test(l));
  if (idx >= 0) return { r: idx < 3 ? "Sale 1.º–3.º" : "Sale 4.º o más", pos: idx + 1 };
  // Sin lista: orden entre las marcas mencionadas.
  const orden = MARCAS.map(m => ({ m, i: t.toLowerCase().indexOf(m.toLowerCase()) })).filter(x => x.i >= 0).sort((a, b) => a.i - b.i);
  const p = orden.findIndex(x => x.m === "Diluu") + 1;
  return { r: p && p <= 3 ? "Sale 1.º–3.º" : "Sale 4.º o más", pos: p || null };
}
function citas(texto) {
  const t = String(texto || ""), low = t.toLowerCase();
  const recomienda = MARCAS.filter(m => m !== "Diluu" && low.includes(m.toLowerCase()));
  const fr = t.split(/(?<=[.!?])\s+|\n/).find(s => /diluu/i.test(s));
  return { recomienda, diluu: fr ? fr.trim().slice(0, 240) : "" };
}

async function post(url, headers, body) {
  const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json", ...headers }, body: JSON.stringify(body) });
  const txt = await res.text();
  if (!res.ok) throw new Error(`${res.status} ${txt.slice(0, 300)}`);
  return JSON.parse(txt);
}
const ASIST = {
  ChatGPT: {
    clave: "OPENAI_API_KEY",
    async pregunta(q, pais) {
      const j = await post("https://api.openai.com/v1/responses", { authorization: `Bearer ${process.env.OPENAI_API_KEY}` }, {
        model: process.env.OPENAI_MODEL || "gpt-5",
        tools: [{ type: "web_search", user_location: { type: "approximate", country: pais, city: CIUDAD[pais] } }],
        input: q, store: false
      });
      const out = (j.output || []).flatMap(o => o.content || []).filter(c => c.type === "output_text").map(c => c.text).join("\n");
      return out || j.output_text || "";
    }
  },
  Gemini: {
    clave: "GEMINI_API_KEY",
    async pregunta(q, pais) {
      const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
      const j = await post(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, { "x-goog-api-key": process.env.GEMINI_API_KEY }, {
        contents: [{ role: "user", parts: [{ text: q }] }],
        tools: [{ google_search: {} }],
        systemInstruction: { parts: [{ text: `The user is a parent located in ${CIUDAD[pais]}, ${pais}. Answer as you would to any user.` }] }
      });
      return ((j.candidates || [])[0]?.content?.parts || []).map(p => p.text || "").join("\n");
    }
  },
  Perplexity: {
    clave: "PERPLEXITY_API_KEY",
    async pregunta(q, pais) {
      const j = await post("https://api.perplexity.ai/chat/completions", { authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}` }, {
        model: process.env.PERPLEXITY_MODEL || "sonar",
        messages: [{ role: "user", content: q }],
        web_search_options: { user_location: { country: pais } }
      });
      const c = j.choices?.[0]?.message?.content || "";
      const cit = (j.citations || []).map(u => `<${u}>`).join(" ");
      return cit ? `${c}\n\nFuentes: ${cit}` : c;
    }
  }
};

async function main() {
  const PQ = preguntas();
  if (PQ.length !== 12) console.error(`Aviso: ${PQ.length} preguntas (la herramienta cuenta 36 = 12 × 3).`);
  const r = {}, cit = {}, textos = {}, errores = [];
  if (PROBAR) {
    const ej = ["Here are good options:\n1. **Outschool** – live classes.\n2. **Diluu** – small groups for heritage kids.\n3. Preply tutors.",
      "Top picks: Preply, italki, Novakid, Outschool, Lingokids and Diluu (diluu.com) for Spanish-speaking families.",
      "Try Preply or italki for one-to-one tutors."];
    ej.forEach((t, i) => console.log(JSON.stringify({ ejemplo: i + 1, ...clasifica(t), ...citas(t) })));
    return;
  }
  for (const a of SOLO) {
    if (!ASIST[a]) { errores.push(`Asistente desconocido: ${a}`); continue; }
    if (!process.env[ASIST[a].clave]) { errores.push(`${a}: falta ${ASIST[a].clave}`); continue; }
    for (let i = 0; i < PQ.length; i++) {
      const q = PQ[i], p = pais(q);
      try {
        const t = await ASIST[a].pregunta(q, p);
        textos[`${i}-${a}`] = t;
        r[`${i}-${a}`] = clasifica(t).r;
        cit[`${i}-${a}`] = { pais: p, ...citas(t) };
        process.stderr.write(`${a} ${i + 1}/12 (${p}): ${r[`${i}-${a}`]}\n`);
      } catch (e) { errores.push(`${a} · ${q}: ${e.message}`); }
    }
  }
  const sale = Object.values(r).filter(v => v.startsWith("Sale")).length, hechas = Object.keys(r).length;
  const salida = { mes: MES, fecha: new Date().toISOString(), fuente: "api", preguntas: PQ, r, citas: cit, textos, errores, resumen: `Diluu aparece en ${sale} de ${hechas}` };
  fs.mkdirSync(path.join(RAIZ, "data"), { recursive: true });
  const base = path.join(RAIZ, "data", `ia-respuestas-${MES}`);
  fs.writeFileSync(base + ".json", JSON.stringify(salida, null, 2));
  const porIA = SOLO.map(a => `${a}: ${PQ.filter((_, i) => (r[`${i}-${a}`] || "").startsWith("Sale")).length} de ${PQ.filter((_, i) => r[`${i}-${a}`]).length}`).join(" · ");
  const filas = PQ.map((q, i) => `| ${i + 1} | ${q} | ${pais(q)} | ${SOLO.map(a => r[`${i}-${a}`] || "—").join(" | ")} | ${[...new Set(SOLO.flatMap(a => (cit[`${i}-${a}`] || {}).recomienda || []))].slice(0, 6).join(", ")} |`);
  const md = `# Preguntas a las IA por API · ${MES}\n\nFecha: ${salida.fecha.slice(0, 10)}. ${salida.resumen} (${porIA}). Línea base manual 30 oct: 10 de 36.\n\n| # | Pregunta | País | ${SOLO.join(" | ")} | Recomiendan |\n|---|---|---|${SOLO.map(() => "---").join("|")}|---|\n${filas.join("\n")}\n${errores.length ? `\nErrores:\n${errores.map(e => "- " + e).join("\n")}\n` : ""}`;
  fs.writeFileSync(base + ".md", md);
  console.log(md);
  console.log(`\nGuardado en ${base}.json y .md`);
  if (errores.length) process.exitCode = 2;
}
main().catch(e => { console.error(e.message); process.exit(1); });
