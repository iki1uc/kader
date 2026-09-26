// raw.js — sammelt den rohen Zustand aus online() und visitor()
import { VISITOR_RAW } from './visitor.js';

export function RAW(online){
  const raw = {};

  for(const [name, m] of Object.entries(online.module)){
    raw[name] = { status: m.status, tmp: m.tmp, online: m.online };
  }

  // Der Besucher wird ein RAW-Eintrag
  const v = VISITOR_RAW();
  Object.assign(raw, v);

  return raw;
}
