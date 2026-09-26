export const RAW = {
  RUN8:  { status: rnd(), tmp: tmp() },
  TMP:   { status: rnd(), tmp: tmp() },
  "3hit90": { status: rnd(), tmp: tmp() },
  dir:   { status: rnd(), tmp: tmp() },
  WpiR:  { status: rnd(), tmp: tmp() },
  MXU:   { status: rnd(), tmp: tmp() },
  CLONE: { status: rnd(), tmp: tmp() },
  FAIL:  { status: rnd(), tmp: tmp() },
  "9vec3tor": { status: rnd(), tmp: tmp() }
};

function rnd(){
  const s = ["green","yellow","red","blue"];
  return s[Math.floor(Math.random()*s.length)];
}

function tmp(){
  return (Math.random()*0.999).toFixed(3);
}
