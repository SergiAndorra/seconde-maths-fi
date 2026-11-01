'use strict';
/* ============ Aides pour écrire les questions ============ */
// Q(énoncé, bonne réponse, [[mauvaise, pourquoi, notion-cause], ...], {exp, w})
function Q(q, good, bads, extra) {
  const c = [{ t: String(good), ok: true }], seen = new Set([String(good)]);
  for (const b of bads) {
    const [t, why, cause] = Array.isArray(b) ? b : [b];
    const s = String(t); if (seen.has(s)) continue; seen.add(s);
    c.push({ t: s, why, cause });
    if (c.length === 4) break;
  }
  return Object.assign({ q, c }, extra || {});
}
// polynôme : poly([[1,'x²'],[-6,'x'],[9,'']]) -> "x² − 6x + 9"
function poly(terms) {
  let s = '';
  for (const [a, v] of terms) {
    if (!a) continue;
    const abs = Math.abs(a), coef = abs === 1 && v ? '' : nf(abs);
    s += (s ? (a < 0 ? ' − ' : ' + ') : (a < 0 ? '−' : '')) + coef + v;
  }
  return s || '0';
}
const supDigits = s => String(s).replace(/-/g, '⁻').replace(/\d/g, d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]);
function sci(x, d = 2) {
  const e = Math.floor(Math.log10(Math.abs(x)));
  let m = x / Math.pow(10, e);
  let mm = +m.toFixed(d), ee = e;
  if (Math.abs(mm) >= 10) { mm = +(mm / 10).toFixed(d); ee++; }
  return nf(mm, d) + ' × 10' + supDigits(ee);
}
function itv(a, b, ca, cb) {
  const A = a === -Infinity ? '−∞' : nf(a), B = b === Infinity ? '+∞' : nf(b);
  return (a === -Infinity || !ca ? ']' : '[') + A + ' ; ' + B + (b === Infinity || !cb ? '[' : ']');
}
const pw = (base, e) => base + supDigits(e);   // pw('2', 3) -> 2³
function nz(a, b) { let x; do { x = ri(a, b); } while (x === 0); return x; }
