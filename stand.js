/* ─────────────────────────────────────────────────────
   DER LAUF · zustände sind keine knöpfe · eine reihenfolge
   ───────────────────────────────────────────────────── */
const LAUF = [
  'stand', 'umstand', 'standesamt', 'standDerDinge',
  'liegestand', 'standesgemaess', 'linear', 'unlinear',
  'universell', 'makingOf', 'duMiaDochNet', 'jaMann',
  'lassMiaRuh', 'funktionAller'
];

/* ─── SPUR · geister der besuchten zustände ────── */
const spuren = [];        // { id, zeit, farbe }

function spurHinterlassen(id){
  // Geist aus der aktuellen position des Stehenden
  const geo = new THREE.BoxGeometry(.5, 2.4, .5);
  const mat = new THREE.MeshBasicMaterial({
    color:0x44aa77, transparent:true, opacity:.12,
    wireframe:true
  });
  const ghost = new THREE.Mesh(geo, mat);
  ghost.position.copy(standGroup.position);
  ghost.position.y = .7;
  ghost.rotation.copy(standGroup.rotation);
  ghost.userData = { id, lebenszeit: 1.0 };
  scene.add(ghost);
  spuren.push(ghost);
  if(spuren.length > 14){
    const alt = spuren.shift();
    scene.remove(alt);
    alt.geometry.dispose();
    alt.material.dispose();
  }
}

/* ─── DIE LEERE · der grundzustand ────────────── */
let leer = false;

function inDieLeere(){
  leer = true;
  // Alles blass, langsam, still
  boxMat.color.setHex(0x0a1212);
  boxMat.emissive.setHex(0x0a1212);
  boxMat.emissiveIntensity = .02;
  cornerDots.forEach(d=>{
    d.material.color.setHex(0x1a2a1a);
    d.material.emissive.setHex(0x1a2a1a);
  });
  // Zeige: die leere hat einen namen
  sayEl.innerHTML = `—<small>LEER · der grund · auf dem alles steht</small>`;
  sayEl.style.color = '#1e3328';
  // Kein Menü aktiv
  modeButtons.forEach(mb=>mb.btn.classList.remove('on'));
}

function ausDerLeere(){
  leer = false;
  setMode('stand');
}

// Tastatur: ESC → in die leere · jede andere taste → zurück
document.addEventListener('keydown', e=>{
  if(e.key === 'Escape') inDieLeere();
  else if(leer && e.key.length === 1) ausDerLeere();
});

// Klick auf leeren raum → in die leere
canvas.addEventListener('pointerup', e=>{
  if(leer) { ausDerLeere(); return; }
});

/* ─── LAUF-VERFOLGUNG · zeige wie weit man ist ── */
const laufEl = document.createElement('div');
laufEl.style.cssText = `
  position:fixed;bottom:14px;left:50%;transform:translateX(-50%);
  font-family:'Consolas',monospace;font-size:8px;
  letter-spacing:4px;color:rgba(58,90,74,.4);
  z-index:10;pointer-events:none;text-align:center;
  display:flex;gap:6px;
`;
document.body.appendChild(laufEl);

function aktualisiereLauf(){
  const besucht = new Set(spuren.map(s=>s.userData.id));
  laufEl.innerHTML = LAUF.map(id=>{
    const da = besucht.has(id) || id === currentMode;
    const a = da ? '1' : '.25';
    return `<span style="opacity:${a}">•</span>`;
  }).join('');
}

/* ─── ÜBERSCHREIBE setMode · füge spur + lauf hinzu ── */
const altSetMode = setMode;
setMode = function(id){
  if(!leer && currentMode) spurHinterlassen(currentMode);
  altSetMode(id);
  aktualisiereLauf();
};
