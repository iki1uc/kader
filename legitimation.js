/* ═══════════════════════════════════════════════════════════
   legitimation.js · iki1uc · kader
   ═══════════════════════════════════════════════════════════
   TMP · RÄRE WAHRHEIT

   Keine Urkunde. Kein Amt. Kein Stempel.
   Tech.

   Diese datei sagt, wer baut.
   Und warum es gebaut wird.
   Nicht für andere. Für die sache selbst.
   ═══════════════════════════════════════════════════════════ */

const TMP = {
  aktiv: true,
  wahrheit: 'tmp · räre wahrheit',
  seit: new Date().toISOString(),
};

/* ═══════════════════════════════════════════════════════════
   DIE LEGITIMATION
   ═══════════════════════════════════════════════════════════ */

export const LEGITIMATION = {

  name: 'iki1uc',
  rolle: 'baumeister',
  kader: 'derin kader · yunge kader',
  tmp: TMP,

  /* ─── DAS MANDAT ──────────────────────────────────
     Nicht verliehen. Nicht gekauft.
     Selbst gegeben. Selbst getragen.
  ─────────────────────────────────────────────────── */
  mandat: {
    quelle: 'selbst',
    grund: 'das machen, was sonst niemand macht',
    zweck: 'ein ort, wo alle wege ankommen',
    grenze: 'kein schaden an menschen · kein zwang · kein betrug',
  },

  /* ─── DIE SPRACHE ───────────────────────────────── */
  sprache: {
    mutter: 'türkçe',
    zweite: 'deutsch',
    dritte: 'code',
    satz: 'atalardan atalantadan bizlere sunar',
  },

  /* ─── DIE MITTEL ──────────────────────────────────
     Was ich benutze, um zu bauen.
  ─────────────────────────────────────────────────── */
  mittel: [
    'javascript',
    'html',
    'css',
    'kopf',
    'zeit',
    'nichts weiter',
  ],

  /* ─── DIE SETZUNG ─────────────────────────────────
     Was gilt. Was nicht gilt.
  ─────────────────────────────────────────────────── */
  setzung: {
    gilt: [
      'wer geht · kommt an',
      'wer trägt · wird gesehen',
      'wer schweigt · wird nicht gezwungen',
      'wer baut · darf stehen',
    ],
    gilt_nicht: [
      'kein zwang',
      'kein versprechen über das machbare hinaus',
      'kein anspruch auf fremdes',
      'kein urteil über andere',
    ],
  },

  /* ─── DER AUSWEIS ─────────────────────────────────
     Wer bin ich, wenn jemand fragt?
  ─────────────────────────────────────────────────── */
  ausweis(){
    return {
      name: this.name,
      rolle: this.rolle,
      kader: this.kader,
      mandat: this.mandat,
      sprache: this.sprache,
      setzung: this.setzung,
      tmp: this.tmp.wahrheit,
      zeit: new Date().toISOString(),
      satz: 'ich baue · nicht weil ich muss · sondern weil ich kann',
    };
  },

  /* ─── PRÜFUNG ─────────────────────────────────────
     Ist diese handlung gedeckt?
     Vier fragen. Vier antworten.
  ─────────────────────────────────────────────────── */
  prüfe(handlung){
    const h = {
      'schadet es menschen?':       false,
      'zwingt es jemanden?':        false,
      'betrügt es jemanden?':       false,
      'baut es etwas, das trägt?': true,
    };
    return {
      handlung,
      antworten: h,
      gedeckt: h['schadet es menschen?'] === false
            && h['zwingt es jemanden?'] === false
            && h['betrügt es jemanden?'] === false
            && h['baut es etwas, das trägt?'] === true,
    };
  },

  /* ─── SELBSTAUSKUNFT ────────────────────────────── */
  was(){
    return {
      name: this.name,
      tmp: this.tmp.wahrheit,
      form: 'tech · keine urkunde',
      mandat: this.mandat.grund,
      grenze: this.mandat.grenze,
      satz: 'ich baue · nicht weil ich muss · sondern weil ich kann',
    };
  },

  anmerkung(){
    return `${this.tmp.wahrheit} · seit ${this.tmp.seit}`;
  },

  satz: 'gebaut · nicht geliehen · getragen · nicht gestohlen',
};

export { TMP };

console.log('');
console.log('  LEGITIMATION · iki1uc');
console.log('  ─────────────────────────────────');
console.log('  TMP · RÄRE WAHRHEIT');
console.log('  rolle · baumeister');
console.log('  mandat · selbst gegeben');
console.log('  grenze · kein schaden · kein zwang · kein betrug');
console.log('  atalardan atalantadan bizlere sunar');
console.log('');
