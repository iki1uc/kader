// master.js — bindet die Online-Objekte zur einen Zahl
import { SPITZE } from './spitze.js';

export function MASTER(online){
  // RAW aus ONLINE bauen: jedes online-Modul wird ein RAW-Eintrag
  const RAW = {};
  for(const [name, r] of Object.entries(online.module)){
    RAW[name] = {
      status: r.online ? 'green' : 'red',
      tmp: r.tmp,
    };
  }

  // RESPO_MAP aus den Modulnamen — Pfad = der Name selbst
  const RESPO_MAP = {};
  for(const name of Object.keys(RAW)){
    RESPO_MAP[name] = './' + name;
  }

  // SPITZE führt: trennt beitragsfähig / nicht-beitragsfähig
  const bindung = SPITZE.fuehrt(RAW, RESPO_MAP);

  // Der Master ist die Bindung + der Online-Zustand
  return {
    name: 'MASTER',
    zustand: online.online > 0 ? 'wachend' : 'schlafend',
    zeit: online.zeit,
    kader: {
      gesamt: online.gesamt,
      online: online.online,
      offline: online.offline,
    },
    spitze: {
      beitrag: bindung.beitrag.length,
      nichtbeitrag: bindung.nichtbeitrag.length,
      bindung: bindung.bindung,
      zahl: bindung.zahl,
    },
    // Die eine Zahl — aus der Spitze gezogen
    DIE_EINE_ZAHL: bindung.zahl,
  };
}
