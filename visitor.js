// visitor.js — der Besucher lebt: er kommt, bleibt, geht, kommt wieder.
// Kein Snapshot. Ein Zustand, der sich über Zeit und Seitenwechsel hält.

const SPEICHER = 'visitor.leben';

// ─── GEDÄCHTNIS ──────────────────────────────────────────
// Ein Besucher, der sich nicht erinnert, ist kein Besucher.
// Er ist ein Erstkontakt, der jeden Moment neu anfängt.

function lade(){
  try {
    const roh = localStorage.getItem(SPEICHER);
    return roh ? JSON.parse(roh) : null;
  } catch { return null; }
}

function speichere(zustand){
  try {
    localStorage.setItem(SPEICHER, JSON.stringify(zustand));
  } catch {}
}

// ─── DER LEBENDIGE BESUCHER ──────────────────────────────
// Beim ersten Aufruf wird er geboren. Danach wächst er.

function geburt(){
  return {
    id: crypto.randomUUID(),
    geboren: Date.now(),
    besuche: 0,
    seiten: [],
    verweildauer: 0,
    letzter_besuch: null,
    aktionen: [],
    status: 'neu',     // neu → wiederkehrend → treu
  };
}

function atme(){
  const jetzt = Date.now();
  let z = lade();

  if(!z){
    z = geburt();
    z.status = 'neu';
  } else {
    // Die Lücke zwischen letztem und diesem Besuch
    const luecke = jetzt - (z.letzter_besuch || jetzt);
    z.status = luecke < 1000 * 60 * 30
      ? 'wiederkehrend'          // innerhalb 30 Min → gleiche Sitzung
      : luecke < 1000 * 60 * 60 * 24
        ? 'wiederkehrend'        // innerhalb 24 Std → wiederkehrend
        : 'treu';                // später → treu
  }

  z.besuche += 1;
  z.letzter_besuch = jetzt;

  // Seite merken
  const url = location.href;
  if(!z.seiten.includes(url)){
    z.seiten.push(url);
    if(z.seiten.length > 50) z.seiten.shift(); // Gedächtnis begrenzt
  }

  // Aktion registrieren
  const aktion = {
    typ: 'view',
    url,
    zeit: jetzt,
  };
  z.aktionen.push(aktion);
  if(z.aktionen.length > 200) z.aktionen.shift();

  speichere(z);
  return z;
}

// ─── VERWEILDAUER ────────────────────────────────────────
// Der Besucher lebt, solange die Seite sichtbar ist.
// Wird sie versteckt, hört die Zeit auf.

let sichtbar_seit = document.visibilityState === 'visible' ? Date.now() : null;

document.addEventListener('visibilitychange', () => {
  const z = lade();
  if(!z) return;

  if(document.visibilityState === 'visible'){
    sichtbar_seit = Date.now();
  } else if(sichtbar_seit){
    const dauer = Math.round((Date.now() - sichtbar_seit) / 1000);
    z.verweildauer += dauer;
    z.aktionen.push({ typ: 'verlassen', dauer, zeit: Date.now() });
    speichere(z);
    sichtbar_seit = null;
  }
});

// ─── AKTIONEN ────────────────────────────────────────────
// Klick, Scroll, Tastatur – der Besucher tut etwas.

function registriere(typ){
  const z = lade();
  if(!z) return;
  z.aktionen.push({ typ, zeit: Date.now(), url: location.href });
  if(z.aktionen.length > 200) z.aktionen.shift();
  speichere(z);
}

if(typeof window !== 'undefined'){
  window.addEventListener('click', () => registriere('klick'), { passive: true });
  window.addEventListener('scroll', () => registriere('scroll'), { passive: true });
  window.addEventListener('keydown', () => registriere('taste'), { passive: true });
}

// ─── EXPORT ──────────────────────────────────────────────
// VISITOR() gibt den aktuellen Zustand zurück – lebendig, nicht statisch.

export function VISITOR(){
  const z = atme();

  // Verweildauer in dieser Sitzung
  const sitzung = sichtbar_seit
    ? Math.round((Date.now() - sichtbar_seit) / 1000)
    : 0;

  return {
    id: z.id,
    geboren: z.geboren,
    besuche: z.besuche,
    seiten: z.seiten.length,
    verweildauer: z.verweildauer + sitzung,
    sitzung,
    status: z.status,
    letzte_aktion: z.aktionen[z.aktionen.length - 1] || null,
    aktiv: sichtbar_seit !== null,
  };
}

// ─── SPITZE-INTEGRATION ──────────────────────────────────
// Der Besucher wird Teil der Kette: sein Zustand fließt in RAW.

export function VISITOR_RAW(){
  const v = VISITOR();

  // Status-Kodierung:
  // neu → yellow  (noch nicht beitragsfähig)
  // wiederkehrend → green  (beitragsfähig)
  // treu → green  (beitragsfähig)
  const status = v.status === 'neu'
    ? 'yellow'
    : 'green';

  return {
    VISITOR: {
      status,
      tmp: v.verweildauer,
      online: true,
      besuche: v.besuche,
      seiten: v.seiten,
      aktiv: v.aktiv,
    },
  };
}
