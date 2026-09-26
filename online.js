// online.js — wacht über die Module des Kaders
const MODULE = [
  'index.html','master.html','spitze.html','spitze.js',
  'pyramide.html','stand.html','CUBE.html','de.html','sub.html',
  'zauber6y.html','zum.html','um.js','add.js','clone.js','sys.css',
];

export async function ONLINE(){
  const results = {};
  await Promise.all(MODULE.map(async name => {
    try {
      const r = await fetch('./' + name, { method:'HEAD' });
      results[name] = { online: r.ok, status: r.status, tmp: Date.now() };
    } catch(e){
      results[name] = { online: false, status: 0, tmp: Date.now() };
    }
  }));
  const online = Object.values(results).filter(r => r.online).length;
  return {
    zeit: new Date().toISOString(),
    gesamt: MODULE.length,
    online,
    offline: MODULE.length - online,
    module: results,
  };
}
