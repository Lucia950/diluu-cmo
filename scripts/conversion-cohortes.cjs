// Conversión prueba → curso por semana ISO de la prueba (lessonStart), a 7, 14 y 30 días, y por mes e idioma a 14 días.
// Solo lectura, base de producción (lib/mongo.cjs del plugin diluu-ops). Uso: node scripts/conversion-cohortes.cjs
// Rango fijo 31 ago – 1 nov 2026 (editar las dos fechas del find). Añadido el 4 nov 2026 (pregunta de Lucia).
const fs=require('fs'),path=require('path'),os=require('os')
const base=path.join(os.homedir(),'.claude/plugins/cache/diluu/diluu-ops')
const lib=fs.readdirSync(base).map(d=>path.join(base,d,'scripts/lib/mongo.cjs')).filter(fs.existsSync).sort((a,b)=>fs.statSync(b).mtimeMs-fs.statSync(a).mtimeMs)[0]
const {withDb}=require(lib)
const dias=(a,b)=>(new Date(b.slice(0,10))-new Date(a.slice(0,10)))/86400000
const wk=s=>{const d=new Date(s.slice(0,10)+'T00:00:00Z');const day=d.getUTCDay()||7;d.setUTCDate(d.getUTCDate()+4-day);const y0=new Date(Date.UTC(d.getUTCFullYear(),0,1));return 'S'+String(Math.ceil(((d-y0)/86400000+1)/7)).padStart(2,'0')}
withDb(async db=>{
  const B=db.collection('v3-bookings'),E=db.collection('v3-enrolments'),R=db.collection('v3-trial-results')
  const pruebas=await B.find({type:'TRIAL',lessonStart:{$gte:'2026-08-31',$lt:'2026-11-02'}},{projection:{id:1,lessonStart:1,cancelled:1,'client.id':1,'course.subject':1,subject:1,language:1}}).toArray()
  const ids=pruebas.map(p=>p.id)
  const res=await R.find({bookingId:{$in:ids}},{projection:{bookingId:1,attended:1}}).toArray()
  const att=new Map(res.map(r=>[r.bookingId,r.attended]))
  const mats=await E.find({trialBookingId:{$in:ids}},{projection:{trialBookingId:1,createdAt:1}}).toArray()
  const first={}; for(const m of mats){ if(!first[m.trialBookingId]||m.createdAt<first[m.trialBookingId]) first[m.trialBookingId]=m.createdAt }
  const hoy='2026-11-04'
  const agg={}
  for(const p of pruebas){ if(p.cancelled) continue
    const w=wk(p.lessonStart), a=agg[w]||(agg[w]={n:0,asist:0,noshow:0,c7:0,c14:0,c30:0,n14:0,n30:0,lang:{}})
    a.n++; const at=att.get(p.id); if(at===true)a.asist++; if(at===false)a.noshow++
    const c=first[p.id]; const d=c?dias(p.lessonStart,c):null; const edad=dias(p.lessonStart,hoy)
    if(d!==null&&d<=7)a.c7++
    if(edad>=14){a.n14++; if(d!==null&&d<=14)a.c14++}
    if(edad>=30){a.n30++; if(d!==null&&d<=30)a.c30++}
    const l=p.course?.subject||p.subject||p.language||'?'; a.lang[l]=(a.lang[l]||0)+1
  }
  console.log('semana  pruebas  asist  noshow%  conv7d%  conv14d%(n)  conv30d%(n)  idiomas')
  for(const w of Object.keys(agg).sort()){const a=agg[w]; console.log(w, a.n, a.asist, (100*a.noshow/Math.max(1,a.asist+a.noshow)).toFixed(0), (100*a.c7/a.n).toFixed(1), a.n14?(100*a.c14/a.n14).toFixed(1)+'('+a.n14+')':'-', a.n30?(100*a.c30/a.n30).toFixed(1)+'('+a.n30+')':'-', JSON.stringify(a.lang))}
  // por mes y por idioma a 14 d
  const porMes={}
  for(const p of pruebas){ if(p.cancelled) continue; const m=p.lessonStart.slice(0,7); const l=p.course?.subject||'?'; const k=m+' '+l; const a=porMes[k]||(porMes[k]={n14:0,c14:0}); const edad=dias(p.lessonStart,hoy); if(edad>=14){a.n14++; const c=first[p.id]; if(c&&dias(p.lessonStart,c)<=14)a.c14++} }
  console.log('\nconv 14 d por mes e idioma (pruebas con ≥14 días):'); for(const k of Object.keys(porMes).sort()){const a=porMes[k]; if(a.n14) console.log(k, a.n14, (100*a.c14/a.n14).toFixed(1)+'%')}
}).then(()=>process.exit(0)).catch(e=>{console.error('ERROR',String(e.message).replace(/mongodb(\+srv)?:\/\/\S+/g,'[oculto]'));process.exit(1)})
