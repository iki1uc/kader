// respo-map.js — ordnet Namen zu Pfaden, aber aus dem realen Zustand
// Kein statisches Objekt. Eine Funktion, die die Map baut.

export function RESPO_MAP(module){
  // module = das, was online() als realen Bestand gemeldet hat
  const map = {};

  for(const name of Object.keys(module)){
    // Der Pfad ergibt sich aus dem Namen — nicht aus einer Tabelle
    // Jedes Modul wohnt in seinem eigenen Ordner mit index.html
    map[name] = `/${name}/index.html`;
  }

  // Zusätzliche Pfade, die nicht aus dem Modulnamen folgen,
  // aber real existieren — als explizite Ergänzung
  const ergaenzung = {
    'WpiR':     '/WpiR/index.html',
    'dir':      '/dir/index.html',
    'RUN8':     '/RUN8/index.html',
    'FIT':      '/FIT/index.html',
    'FAIL':     '/FAIL/index.html',
    '9vec3tor': '/9vec3tor/index.html',
    'CLONE':    '/CLONE/index.html',
    'ONLINE':   '/online/index.html',
    'TMP':      '/TMP/index.html',
    '3hit90':   '/3hit90/index.html',
  };

  return { ...map, ...ergaenzung };
}
