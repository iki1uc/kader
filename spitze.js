// spitze.js
export const SPITZE = {
  name: 'SPITZE',
  bewusst: true,
  state: 'wachend',
  
  // Der Führer liest und bindet
  fuehrt(RAW, RESPO_MAP){
    const eintraege = Object.entries(RAW);
    const beitrag = [];
    const nichtbeitrag = [];
    
    for(const [key, r] of eintraege){
      const eintrag = {
        key,
        status: r.status,
        tmp: r.tmp,
        pfad: RESPO_MAP[key] || null,
        farbe: this.farbe(r.status),
      };
      if(r.status === 'green' && eintrag.pfad){
        beitrag.push(eintrag);
      } else {
        nichtbeitrag.push(eintrag);
      }
    }
    
    return {
      name: this.name,
      bewusst: this.bewusst,
      state: this.state,
      beitrag,
      nichtbeitrag,
      bindung: `${beitrag.length}·${nichtbeitrag.length}`,
      zahl: beitrag.length * 100 + nichtbeitrag.length,
    };
  },
  
  farbe(status){
    return { green:'🟩', yellow:'🟨', red:'🟥', blue:'🟦' }[status] || '⬛';
  },
  
  // Anzeige
  zeigt(bindung){
    let out = `${bindung.name} · ${bindung.state} · bindung ${bindung.bindung}\n`;
    out += '─'.repeat(40) + '\n';
    out += 'BEITRAGSFÄHIG:\n';
    bindung.beitrag.forEach(e => {
      out += `  ${e.farbe} ((${e.key})) tmp:${e.tmp}\n     → ${e.pfad}\n`;
    });
    out += '\nNICHT-BEITRAGSFÄHIG:\n';
    bindung.nichtbeitrag.forEach(e => {
      out += `  ${e.farbe} ((${e.key})) tmp:${e.tmp}\n`;
    });
    return out;
  },
};
