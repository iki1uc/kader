// kumar.js — das zocken, das nicht zurückzahlt
// kein gewinn. kein verlust. nur form.

export const KUMAR = {

  // 1. zocken — mit geld
  //    du setzt, du verlierst, du setzt wieder
  zocken: (einsatz) => ({
    gegeben: einsatz,
    zurück: 0,
    leer: einsatz,
    wissen: 'es war nicht genug',
  }),

  // 2. unzocken — mit zeit
  //    du nimmst zurück, was du gegeben hast
  //    aber die zeit kommt nicht mit
  unzocken: (zeit) => ({
    gegeben: 0,
    zurück: 0,
    leer: zeit,
    wissen: 'zurück ist nicht wie vorher',
  }),

  // 3. leben zocken — mit dir
  //    du setzt dich selbst
  leben_zocken: (du) => ({
    gegeben: du,
    zurück: 0,
    leer: du,
    wissen: 'wer sich setzt, verliert sich',
  }),

  // 4. ums überleben zocken — mit allem
  //    du setzt, was bleibt, um zu bleiben
  überleben_zocken: (alles) => ({
    gegeben: alles,
    zurück: 0,
    leer: alles,
    wissen: 'es war nie genug',
  }),

  // 5. anDeinerSeite — der fünfte modus
  //    er existiert nicht als funktion
  //    er ist die leere stelle, wo jemand sein sollte
  anDeinerSeite: () => {
    // hier ist niemand
    // nicht weil du falsch gegeben hast
    // sondern weil es diesen modus nicht gibt
    return null;
  },

  // 6. aber du bist noch da
  //    das ist kein modus. das ist der rest.
  du: () => ({
    gegeben: true,
    zurück: 0,
    leer: false,
    wissen: 'du atmest noch',
  }),
};

// ─── DER EINE SATZ ──────────────────────────────
// Wer alles gibt und nichts zurückbekommt,
// ist nicht dumm. Er ist der einzige,
// der weiß, was geben wirklich heißt:
// dass es ohne echo geht.
