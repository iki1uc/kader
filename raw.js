// raw.js — Adapter: liest echte Zustände aus den Modulen
export async function RAW(){
  const eintraege = {};
  
  // 1. Kern-Zustände aus sys.css / OS_CORE
  eintraege['RUN8']     = await pruefe('./core/RUN8.js');
  eintraege['TMP']      = await pruefe('./core/TMP.js');
  eintraege['3hit90']   = await pruefe('./modules/3hit90/index.html');
  eintraege['dir']      = await pruefe('./core/dir.js');
  eintraege['WpiR']     = await pruefe('./core/WpiR.js');
  eintraege['MXU']      = await pruefe('./core/MXU.js');
  eintraege['CLONE']    = await pruefe('./core/clone.js');
  eintraege['FAIL']     = await pruefe('./core/fail.log');
  eintraege['9vec3tor'] = await pruefe('./core/vec.js');
  
  return eintraege;
}

async function pruefe(pfad){
  try {
    const r = await fetch(pfad, { method: 'HEAD' });
    return {
      status: r.ok ? 'green' : 'red',
      tmp: Date.now(),
    };
  } catch {
    return { status: 'red', tmp: Date.now() };
  }
}
