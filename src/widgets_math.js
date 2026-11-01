'use strict';
/* ============ Visuels : maths ============ */
const C = { ink: 'var(--ink)', ink2: 'var(--ink2)', line: 'var(--line)', acc: 'var(--accent)', blue: 'var(--accent2)', ok: 'var(--ok)', ko: 'var(--ko)', warn: 'var(--warn)', card: 'var(--card)', pc: 'var(--pc)' };

/* axe gradué générique */
function drawAxis(g, { x0 = 30, x1 = 570, y = 70, min, max, step = 1, labels = true, labelEvery = 1 }) {
  const X = v => x0 + (v - min) * (x1 - x0) / (max - min);
  sv('line', { x1: x0 - 12, y1: y, x2: x1 + 12, y2: y, stroke: C.ink, 'stroke-width': 2 }, g);
  sv('path', { d: `M${x1 + 18} ${y} l-10 -6 v12 z`, fill: C.ink }, g);
  let k = 0;
  for (let v = min; v <= max + 1e-9; v += step, k++) {
    const vv = +v.toFixed(6);
    sv('line', { x1: X(vv), y1: y - 6, x2: X(vv), y2: y + 6, stroke: C.ink, 'stroke-width': vv === 0 ? 2.5 : 1.5 }, g);
    if (labels && k % labelEvery === 0) sv('text', { x: X(vv), y: y + 26, 'text-anchor': 'middle', 'font-size': 16, fill: C.ink2, text: nf(vv) }, g);
  }
  return X;
}

/* ---------- droite numérique : intervalles / inéquations ---------- */
// presets : [{a, b, ca, cb, label}] a/b peuvent être ±Infinity ; ca/cb : bornes fermées
widget('numline', (el, o) => {
  const min = o.min ?? -5, max = o.max ?? 5;
  const svg = svgRoot(600, 120, el);
  const g = sv('g', {}, svg);
  const X = drawAxis(g, { min, max, step: o.step || 1, labelEvery: o.labelEvery || 1 });
  const layer = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' });
  const info = h('div', { class: 'cap' });
  let cur = o.presets[0], x = o.x ?? 0;
  const inI = v => (cur.a === -Infinity || (cur.ca ? v >= cur.a : v > cur.a)) && (cur.b === Infinity || (cur.cb ? v <= cur.b : v < cur.b));
  const draw = () => {
    layer.innerHTML = '';
    const xa = cur.a === -Infinity ? 18 : X(cur.a), xb = cur.b === Infinity ? 582 : X(cur.b);
    sv('line', { x1: xa, y1: 70, x2: xb, y2: 70, stroke: C.acc, 'stroke-width': 8, 'stroke-linecap': 'butt', opacity: .8 }, layer);
    const br = (xv, closed, left) => sv('text', { x: xv, y: 82, 'text-anchor': 'middle', 'font-size': 40, 'font-weight': 700, fill: C.acc, text: (left ? (closed ? '[' : ']') : (closed ? ']' : '[')) }, layer);
    if (cur.a !== -Infinity) br(X(cur.a) + (cur.ca ? 4 : -4), cur.ca, true);
    if (cur.b !== Infinity) br(X(cur.b) + (cur.cb ? -4 : 4), cur.cb, false);
    if (o.point !== false) {
      const ok = inI(x);
      sv('circle', { cx: X(x), cy: 38, r: 9, fill: ok ? C.ok : C.ko }, layer);
      sv('line', { x1: X(x), y1: 47, x2: X(x), y2: 64, stroke: ok ? C.ok : C.ko, 'stroke-width': 2 }, layer);
      sv('text', { x: X(x), y: 22, 'text-anchor': 'middle', 'font-size': 15, fill: C.ink, text: 'x = ' + nf(x) }, layer);
      info.innerHTML = `${M('x')} = ${nf(x)} : ${ok ? '<b style="color:var(--ok)">appartient</b> à' : '<b style="color:var(--ko)">n’appartient pas</b> à'} ${cur.label}` + (cur.note ? '<br>' + cur.note : '');
    } else info.innerHTML = cur.label + (cur.note ? '<br>' + cur.note : '');
  };
  if (o.presets.length > 1) wbtns(el, o.presets.map(p => p.label), i => { cur = o.presets[i]; draw(); });
  if (o.point !== false) slider(ctrl, 'Déplace x', min, max, o.xstep || 0.5, x, v => { x = v; draw(); });
  el.append(ctrl, info);
  draw();
});

/* ---------- addition de relatifs : flèches ---------- */
widget('reladd', (el, o) => {
  const svg = svgRoot(600, 120, el);
  const X = drawAxis(sv('g', {}, svg), { min: -10, max: 10, step: 1, labelEvery: 2 });
  const layer = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  let a = o.a ?? 3, b = o.b ?? -5;
  const draw = () => {
    layer.innerHTML = '';
    const s = a + b;
    sv('path', { d: `M${X(0)} 52 L${X(a)} 52`, stroke: C.blue, 'stroke-width': 4 }, layer);
    sv('path', { d: `M${X(a)} 52 l${a >= 0 ? -8 : 8} -6 v12 z`, fill: C.blue }, layer);
    sv('path', { d: `M${X(a)} 34 L${X(s)} 34`, stroke: C.acc, 'stroke-width': 4 }, layer);
    if (b !== 0) sv('path', { d: `M${X(s)} 34 l${b >= 0 ? -8 : 8} -6 v12 z`, fill: C.acc }, layer);
    sv('circle', { cx: X(s), cy: 70, r: 8, fill: C.acc }, layer);
    cap.innerHTML = `On part de 0, on avance de <b style="color:var(--accent2)">${nf(a)}</b>, puis de <b style="color:var(--accent)">${nf(b)}</b> : on arrive à <b>${nf(s)}</b>.<br>${nf(a)} + ${par(b)} = ${nf(s)}` + (b < 0 ? ` (ajouter ${nf(b)}, c’est reculer de ${nf(-b)})` : '');
  };
  slider(ctrl, 'Premier nombre', -10, 10, 1, a, v => { a = v; if (a + b > 10) b = 10 - a; if (a + b < -10) b = -10 - a; draw(); });
  slider(ctrl, 'On ajoute', -10, 10, 1, b, v => { b = Math.max(-10 - a, Math.min(10 - a, v)); draw(); });
  el.append(ctrl, cap); draw();
});

/* ---------- valeur absolue = distance ---------- */
widget('absdist', (el, o) => {
  const svg = svgRoot(600, 130, el);
  const X = drawAxis(sv('g', {}, svg), { y: 80, min: -8, max: 8, step: 1, labelEvery: 2 });
  const layer = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  let a = o.a ?? -3, b = o.b ?? 4;
  const draw = () => {
    layer.innerHTML = '';
    const lo = Math.min(a, b), hi = Math.max(a, b);
    sv('line', { x1: X(lo), y1: 50, x2: X(hi), y2: 50, stroke: C.acc, 'stroke-width': 3 }, layer);
    sv('line', { x1: X(lo), y1: 42, x2: X(lo), y2: 58, stroke: C.acc, 'stroke-width': 3 }, layer);
    sv('line', { x1: X(hi), y1: 42, x2: X(hi), y2: 58, stroke: C.acc, 'stroke-width': 3 }, layer);
    sv('text', { x: (X(lo) + X(hi)) / 2, y: 36, 'text-anchor': 'middle', 'font-size': 16, fill: C.acc, 'font-weight': 700, text: 'distance = ' + nf(hi - lo) }, layer);
    sv('circle', { cx: X(a), cy: 80, r: 8, fill: C.blue }, layer);
    sv('circle', { cx: X(b), cy: 80, r: 8, fill: C.ok }, layer);
    cap.innerHTML = o.zero ? `La distance entre ${nf(a)} et 0 est ${nf(Math.abs(a))} : |${nf(a)}| = ${nf(Math.abs(a))}.` :
      `Distance entre <b style="color:var(--accent2)">a = ${nf(a)}</b> et <b style="color:var(--ok)">b = ${nf(b)}</b> : |a − b| = |${nf(a)} − ${par(b)}| = |${nf(a - b)}| = <b>${nf(Math.abs(a - b))}</b>`;
  };
  slider(ctrl, 'a', -8, 8, 1, a, v => { a = v; draw(); });
  if (o.zero) { b = 0; } else slider(ctrl, 'b', -8, 8, 1, b, v => { b = v; draw(); });
  el.append(ctrl, cap); draw();
});

/* ---------- ensembles de nombres ---------- */
widget('sets', (el, o) => {
  const svg = svgRoot(600, 300, el);
  const sets = [['R', 'ℝ réels', 10, 10, 580, 280], ['Q', 'ℚ rationnels', 30, 45, 500, 235], ['D', '𝔻 décimaux', 50, 80, 400, 190], ['Z', 'ℤ entiers relatifs', 70, 115, 290, 145], ['N', 'ℕ naturels', 90, 150, 160, 100]];
  const cols = [C.ink2, C.pc, C.blue, C.ok, C.acc];
  sets.forEach(([k, lab, x, y, w, hh], i) => {
    sv('rect', { x, y, width: w, height: hh, rx: 18, fill: C.card, 'fill-opacity': .0001, stroke: cols[i], 'stroke-width': 2.5 }, svg);
    sv('text', { x: x + 12, y: y + 22, 'font-size': 15, 'font-weight': 700, fill: cols[i], text: lab }, svg);
  });
  const dot = sv('g', {}, svg);
  const cap = h('div', { class: 'cap', html: 'Touche un nombre pour voir dans quel ensemble il se range.' });
  const items = o.items || [
    ['7', 'N', '7 est un entier naturel : il est donc aussi dans ℤ, 𝔻, ℚ et ℝ.'],
    ['−3', 'Z', '−3 est un entier, mais négatif : il est dans ℤ, pas dans ℕ.'],
    ['0,25', 'D', '0,25 = 25/100 : un nombre décimal (un nombre fini de chiffres après la virgule).'],
    [F(1, 3), 'Q', '1/3 = 0,333… : les 3 ne s’arrêtent jamais, donc 1/3 n’est pas décimal. C’est un quotient d’entiers : il est rationnel.'],
    [F(12, 4), 'N', '12/4 = 3 : sous son écriture fractionnaire se cache un entier naturel !'],
    [R(2), 'R', '√2 ne peut pas s’écrire comme un quotient d’entiers : c’est un irrationnel. Il est seulement dans ℝ.'],
    ['π', 'R', 'π est irrationnel : il est dans ℝ mais pas dans ℚ.'],
    [F('−7', 2), 'D','−7/2 = −3,5 : c’est un décimal.']];
  const chips = h('div', { class: 'chips', style: 'margin-top:8px' });
  items.forEach(([lab, k, why]) => {
    const b = h('button', { class: 'chip', html: lab, onclick: () => {
      chips.querySelectorAll('.chip').forEach(c => c.classList.remove('on')); b.classList.add('on');
      dot.innerHTML = '';
      const rx = sets.find(s => s[0] === k); const nx = sets[sets.indexOf(rx) + 1];
      const cx = nx ? (nx[2] + nx[4] + rx[2] + rx[4]) / 2 : rx[2] + rx[4] / 2, cy = nx ? rx[3] + rx[5] / 2 + 10 : rx[3] + rx[5] / 2 + 10;
      sv('circle', { cx, cy, r: 26, fill: C.acc, opacity: .9 }, dot);
      const fo = sv('foreignObject', { x: cx - 26, y: cy - 16, width: 52, height: 34 }, dot);
      fo.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="color:#fff;font-weight:700;text-align:center;font-size:15px">${lab}</div>`;
      cap.innerHTML = why;
    } });
    chips.append(b);
  });
  el.append(chips, cap);
});

/* ---------- barres de fractions ---------- */
widget('fracbar', (el, o) => {
  const mode = o.mode || 'simplify';
  const svg = svgRoot(600, mode === 'mul' ? 260 : 170, el);
  const g = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  const bar = (y, n, k, col, lab) => {
    const w = 500 / n;
    for (let i = 0; i < n; i++) sv('rect', { x: 60 + i * w, y, width: w, height: 40, fill: i < k ? col : C.card, stroke: C.ink, 'stroke-width': 1.5 }, g);
    sv('text', { x: 30, y: y + 27, 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 700, fill: C.ink, text: lab }, g);
  };
  if (mode === 'simplify') {
    let a = o.a || 6, b = o.b || 8;
    const draw = (k) => {
      g.innerHTML = '';
      bar(20, b, a, C.blue, `${a}/${b}`);
      if (a % k === 0 && b % k === 0) {
        bar(100, b / k, a / k, C.acc, `${a / k}/${b / k}`);
        cap.innerHTML = `On regroupe les parts par ${k} : ${F(a, b)} = ${F(a + '÷' + k, b + '÷' + k)} = ${F(a / k, b / k)}. La part colorée a <b>la même longueur</b> : c’est le même nombre.`;
      } else cap.innerHTML = `On ne peut pas regrouper ${a} parts et ${b} parts par paquets de ${k} : ${k} ne divise pas les deux nombres.`;
    };
    slider(ctrl, 'Regrouper par', 1, 6, 1, 1, draw);
  } else if (mode === 'add') {
    const [a, b, c, d] = o.f || [1, 2, 1, 3];
    const den = b * d / gcd(b, d);
    let step = 0;
    const draw = () => {
      g.innerHTML = '';
      if (step === 0) { bar(20, b, a, C.blue, `${a}/${b}`); bar(100, d, c, C.acc, `${c}/${d}`); cap.innerHTML = `Les parts n’ont pas la même taille : on ne peut pas encore additionner. Il faut un <b>dénominateur commun</b>.`; }
      else if (step === 1) { bar(20, den, a * den / b, C.blue, `${a * den / b}/${den}`); bar(100, den, c * den / d, C.acc, `${c * den / d}/${den}`); cap.innerHTML = `On découpe tout en ${den} parts égales : ${F(a, b)} = ${F(a * den / b, den)} et ${F(c, d)} = ${F(c * den / d, den)}.`; }
      else { const n1 = a * den / b, n2 = c * den / d; for (let i = 0; i < den; i++) sv('rect', { x: 60 + i * 500 / den, y: 60, width: 500 / den, height: 40, fill: i < n1 ? C.blue : i < n1 + n2 ? C.acc : C.card, stroke: C.ink, 'stroke-width': 1.5 }, g); cap.innerHTML = `Maintenant on additionne les parts : ${F(n1, den)} + ${F(n2, den)} = ${F(n1 + n2, den)}. On additionne les <b>numérateurs</b>, le dénominateur ne change pas.`; }
    };
    wbtns(el, ['1. Les deux fractions', '2. Même découpage', '3. On additionne'], i => { step = i; draw(); });
    draw();
  } else if (mode === 'mul') {
    const [a, b, c, d] = o.f || [2, 3, 3, 4];
    const W = 300, H = 200, x0 = 150, y0 = 30;
    for (let i = 0; i < b; i++) for (let j = 0; j < d; j++) {
      const inA = i < a, inC = j < c;
      sv('rect', { x: x0 + i * W / b, y: y0 + j * H / d, width: W / b, height: H / d, fill: inA && inC ? C.acc : inA ? 'var(--soft-blue)' : inC ? 'var(--soft-warn)' : C.card, stroke: C.ink, 'stroke-width': 1.2 }, g);
    }
    sv('text', { x: x0 + W / 2, y: 22, 'text-anchor': 'middle', 'font-size': 16, fill: C.blue, text: `${a}/${b} de la largeur` }, g);
    sv('text', { x: x0 - 10, y: y0 + H / 2, 'text-anchor': 'end', 'font-size': 16, fill: C.warn, text: `${c}/${d} de la hauteur` }, g);
    cap.innerHTML = `Le carré entier est découpé en ${b}×${d} = ${b * d} cases. La zone orange contient ${a}×${c} = ${a * c} cases : ${F(a, b)} × ${F(c, d)} = ${F(a * c, b * d)}. On multiplie les numérateurs entre eux et les dénominateurs entre eux.`;
  }
  el.append(ctrl, cap);
});

/* ---------- puissances ---------- */
widget('powers', (el, o) => {
  const box = h('div', { style: 'font-size:1.25rem;text-align:center;padding:10px;min-height:96px' });
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  let a = o.a || 2, n = o.n ?? 3;
  const draw = () => {
    const base = a < 0 ? `(${nf(a)})` : nf(a);
    let html;
    if (n > 0) html = `${base}<sup>${n}</sup> = ${Array(n).fill(base).join(' × ')} = <b>${nf(Math.pow(a, n))}</b>`;
    else if (n === 0) html = `${base}<sup>0</sup> = <b>1</b>`;
    else html = `${base}<sup>${nf(n)}</sup> = ${F(1, base + '<sup>' + (-n) + '</sup>')} = ${F(1, Array(-n).fill(base).join(' × '))} = ${F(1, nf(Math.pow(a, -n)))} = <b>${nf(Math.pow(a, n))}</b>`;
    box.innerHTML = html;
    cap.innerHTML = n > 0 ? `L’exposant ${n} compte les facteurs ${base} qu’on multiplie.` : n === 0 ? 'Par convention, un nombre non nul à la puissance 0 vaut 1 (on n’a multiplié aucun facteur).' : `Un exposant négatif signifie « l’inverse » : on divise 1 par ${base} répété ${-n} fois. Ce n’est <b>pas</b> un nombre négatif !`;
  };
  slider(ctrl, 'Nombre a', o.amin ?? 2, o.amax ?? 10, 1, a, v => { a = v; draw(); });
  slider(ctrl, 'Exposant n', -4, 6, 1, n, v => { n = v; draw(); });
  el.append(box, ctrl, cap);
});
widget('powrule', (el, o) => {
  const box = h('div', { style: 'font-size:1.2rem;text-align:center;padding:10px;min-height:120px' });
  const ctrl = h('div', { class: 'ctrl' });
  let m = 3, n = 2, rule = 0;
  const f = (k, col) => `<span style="background:${col};color:#fff;border-radius:6px;padding:0 6px;margin:1px">a</span>`;
  const draw = () => {
    if (rule === 0) box.innerHTML = `a<sup>${m}</sup> × a<sup>${n}</sup> = (${Array(m).fill(f(0, 'var(--accent2)')).join('×')}) × (${Array(n).fill(f(0, 'var(--accent)')).join('×')})<br>= a<sup>${m}+${n}</sup> = <b>a<sup>${m + n}</sup></b><br><span class="small muted">On ajoute les exposants (on ne les multiplie pas).</span>`;
    else if (rule === 1) box.innerHTML = `(a<sup>${m}</sup>)<sup>${n}</sup> = ${Array(n).fill('(' + Array(m).fill(f(0, 'var(--accent2)')).join('×') + ')').join(' × ')}<br>= a<sup>${m}×${n}</sup> = <b>a<sup>${m * n}</sup></b><br><span class="small muted">${n} paquets de ${m} facteurs : on multiplie les exposants.</span>`;
    else box.innerHTML = `${F('a<sup>' + m + '</sup>', 'a<sup>' + n + '</sup>')} = ${F(Array(m).fill(f(0, 'var(--accent2)')).map((x, i) => i < Math.min(m, n) ? '<s>' + x + '</s>' : x).join('×'), Array(n).fill(f(0, 'var(--accent)')).map((x, i) => i < Math.min(m, n) ? '<s>' + x + '</s>' : x).join('×') || '1')} = <b>a<sup>${m}−${n}</sup> = a<sup>${m - n}</sup></b><br><span class="small muted">Les facteurs communs se simplifient : on soustrait les exposants.</span>`;
  };
  wbtns(el, ['a<sup>m</sup> × a<sup>n</sup>', '(a<sup>m</sup>)<sup>n</sup>', 'a<sup>m</sup> ÷ a<sup>n</sup>'], i => { rule = i; draw(); });
  slider(ctrl, 'm', 1, 5, 1, m, v => { m = v; draw(); });
  slider(ctrl, 'n', 1, 4, 1, n, v => { n = v; draw(); });
  el.append(box, ctrl);
});

/* ---------- modèle d'aires : distributivité et identités ---------- */
widget('area', (el, o) => {
  const mode = o.mode || 'sq+';
  const svg = svgRoot(600, 330, el);
  const g = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  let a = o.a || 5, b = o.b || 2;
  const rect = (x, y, w, hh, col, lab) => {
    sv('rect', { x, y, width: w, height: hh, fill: col, stroke: C.ink, 'stroke-width': 1.5, opacity: .9 }, g);
    if (w > 26 && hh > 20) sv('text', { x: x + w / 2, y: y + hh / 2 + 6, 'text-anchor': 'middle', 'font-size': Math.min(20, w / 3.2), 'font-weight': 700, fill: '#fff', text: lab }, g);
  };
  const draw = () => {
    g.innerHTML = '';
    const u = 270 / Math.max(a + b, 1), x0 = 160, y0 = 20;
    if (mode === 'dist') {
      const k = o.k || 3, uu = 400 / (a + b), hk = k * 36;
      rect(x0 - 100, y0 + 40, a * uu, hk, C.blue, `${k}×${a}`);
      rect(x0 - 100 + a * uu, y0 + 40, b * uu, hk, C.acc, `${k}×${b}`);
      sv('text', { x: x0 - 100 + a * uu / 2, y: y0 + 30, 'text-anchor': 'middle', 'font-size': 18, fill: C.blue, text: 'a = ' + a }, g);
      sv('text', { x: x0 - 100 + a * uu + b * uu / 2, y: y0 + 30, 'text-anchor': 'middle', 'font-size': 18, fill: C.acc, text: 'b = ' + b }, g);
      sv('text', { x: x0 - 112, y: y0 + 40 + hk / 2 + 6, 'text-anchor': 'end', 'font-size': 18, fill: C.ink, text: 'k = ' + k }, g);
      cap.innerHTML = `Aire du grand rectangle : k × (a + b) = ${k} × ${a + b} = ${k * (a + b)}. Aire des deux morceaux : k×a + k×b = ${k * a} + ${k * b} = ${k * a + k * b}. Donc <b>k(a + b) = ka + kb</b> : le facteur k multiplie <b>chaque</b> terme.`;
      return;
    }
    if (mode === 'sq+') {
      rect(x0, y0, a * u, a * u, C.blue, 'a²'); rect(x0 + a * u, y0, b * u, a * u, C.warn, 'ab'); rect(x0, y0 + a * u, a * u, b * u, C.warn, 'ab'); rect(x0 + a * u, y0 + a * u, b * u, b * u, C.acc, 'b²');
      sv('text', { x: x0 + a * u / 2, y: y0 + (a + b) * u + 22, 'text-anchor': 'middle', 'font-size': 17, fill: C.ink, text: 'a = ' + a }, g);
      sv('text', { x: x0 + a * u + b * u / 2, y: y0 + (a + b) * u + 22, 'text-anchor': 'middle', 'font-size': 17, fill: C.ink, text: 'b = ' + b }, g);
      cap.innerHTML = `Le grand carré a pour côté a + b = ${a + b}, donc pour aire (a + b)² = ${(a + b) ** 2}.<br>Il contient a² = ${a * a}, b² = ${b * b} <b>et deux rectangles</b> ab = ${a * b} : ${a * a} + ${2 * a * b} + ${b * b} = ${(a + b) ** 2}.<br><b>(a + b)² = a² + 2ab + b²</b>, et non a² + b² (il manquerait les deux rectangles jaunes).`;
    } else if (mode === 'sq-') {
      const s = a * u, t = b * u;
      rect(x0, y0, s, s, C.card, '');
      rect(x0, y0, s - t, s - t, C.blue, '(a−b)²'); rect(x0 + s - t, y0, t, s, C.warn, 'ab'); rect(x0, y0 + s - t, s - t, t, 'var(--ko)', '');
      rect(x0 + s - t, y0 + s - t, t, t, C.acc, 'b²');
      cap.innerHTML = `Dans le carré a² = ${a * a}, on enlève une bande ab (jaune) et une bande ab (qui chevauche le petit carré b²). On a retiré b² une fois de trop, on le rajoute :<br><b>(a − b)² = a² − 2ab + b²</b> = ${a * a} − ${2 * a * b} + ${b * b} = ${(a - b) ** 2}.`;
      sv('text', { x: x0 + s / 2, y: y0 + s + 22, 'text-anchor': 'middle', 'font-size': 17, fill: C.ink, text: 'côté a = ' + a + ', b = ' + b }, g);
    } else if (mode === 'diff') {
      const s = a * u, t = b * u;
      rect(x0, y0, s - t, s, C.blue, ''); rect(x0 + s - t, y0, t, s - t, C.blue, '');
      rect(x0 + s - t, y0 + s - t, t, t, C.card, 'b²');
      sv('text', { x: x0 + (s - t) / 2, y: y0 + s / 2, 'text-anchor': 'middle', 'font-size': 18, fill: '#fff', 'font-weight': 700, text: 'a² − b²' }, g);
      cap.innerHTML = `On enlève le carré b² du carré a² : il reste a² − b² = ${a * a} − ${b * b} = ${a * a - b * b}. En déplaçant le morceau du haut à droite, on obtient un rectangle de côtés (a + b) et (a − b) : ${a + b} × ${a - b} = ${(a + b) * (a - b)}.<br><b>(a + b)(a − b) = a² − b²</b>`;
    }
  };
  slider(ctrl, 'a', mode === 'dist' ? 1 : 3, 9, 1, a, v => { a = v; if (mode !== 'sq+' && mode !== 'dist' && b >= a) b = a - 1; draw(); });
  slider(ctrl, 'b', 1, mode === 'sq+' || mode === 'dist' ? 6 : 8, 1, b, v => { b = (mode !== 'sq+' && mode !== 'dist') ? Math.min(v, a - 1) : v; draw(); });
  el.append(ctrl, cap); draw();
});

/* ---------- balance (équations) ---------- */
widget('balance', (el, o) => {
  const [A, B, Cc] = o.eq || [3, 2, 11];
  const svg = svgRoot(600, 230, el);
  const g = sv('g', {}, svg);
  const eqLine = h('div', { class: 'formula' });
  const cap = h('div', { class: 'cap' });
  let st = 0;
  const xval = (Cc - B) / A;
  const draw = () => {
    g.innerHTML = '';
    sv('path', { d: 'M300 210 L270 210 L300 120 L330 210 Z', fill: C.ink2 }, g);
    sv('line', { x1: 80, y1: 120, x2: 520, y2: 120, stroke: C.ink, 'stroke-width': 5 }, g);
    sv('line', { x1: 80, y1: 120, x2: 80, y2: 150, stroke: C.ink, 'stroke-width': 2 }, g);
    sv('line', { x1: 520, y1: 120, x2: 520, y2: 150, stroke: C.ink, 'stroke-width': 2 }, g);
    sv('rect', { x: 20, y: 150, width: 140, height: 10, fill: C.ink }, g);
    sv('rect', { x: 440, y: 150, width: 140, height: 10, fill: C.ink }, g);
    const nx = st >= 2 ? 1 : A, nu = st >= 1 ? 0 : B, nr = st === 0 ? Cc : st === 1 ? Cc - B : xval;
    let px = 24;
    for (let i = 0; i < nx; i++) { sv('rect', { x: px, y: 106, width: 34, height: 40, rx: 5, fill: C.blue }, g); sv('text', { x: px + 17, y: 132, 'text-anchor': 'middle', fill: '#fff', 'font-size': 18, 'font-weight': 700, text: 'x' }, g); px += 38; }
    for (let i = 0; i < nu; i++) { sv('circle', { cx: px + 10, cy: 136, r: 10, fill: C.acc }, g); px += 22; }
    let qx = 444, row = 0;
    for (let i = 0; i < nr; i++) { sv('circle', { cx: qx + 10, cy: 136 - row * 22, r: 10, fill: C.acc }, g); qx += 22; if (qx > 560) { qx = 444; row++; } }
    eqLine.innerHTML = st === 0 ? `${A}${M('x')} + ${B} = ${Cc}` : st === 1 ? `${A}${M('x')} = ${Cc - B}` : `${M('x')} = ${nf(xval)}`;
    cap.innerHTML = st === 0 ? 'La balance est en équilibre : les deux côtés ont la même valeur. Chaque boîte bleue vaut x, chaque boule vaut 1.' :
      st === 1 ? `On retire ${B} boules <b>des deux côtés</b> : l’équilibre est conservé. ${A}${M('x')} + ${B} − ${B} = ${Cc} − ${B}.` :
        `On partage chaque côté en ${A} parts égales : <b>on divise les deux membres par ${A}</b>. Une boîte x équilibre ${nf(xval)} boules : ${M('x')} = ${nf(xval)}.`;
  };
  wbtns(el, ['Départ', `Retirer ${B} de chaque côté`, `Diviser par ${A}`], i => { st = i; draw(); });
  el.append(eqLine, cap); draw();
});

/* ---------- pourcentages ---------- */
widget('percent', (el, o) => {
  const mode = o.mode || 'part';
  const svg = svgRoot(600, 140, el);
  const g = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  let T = o.total || 80, p = o.p || 25;
  const draw = () => {
    g.innerHTML = '';
    if (mode === 'part') {
      sv('rect', { x: 40, y: 40, width: 520, height: 46, fill: C.card, stroke: C.ink, 'stroke-width': 1.5 }, g);
      sv('rect', { x: 40, y: 40, width: 520 * p / 100, height: 46, fill: C.acc }, g);
      for (let i = 0; i <= 10; i++) sv('line', { x1: 40 + 52 * i, y1: 86, x2: 40 + 52 * i, y2: 94, stroke: C.ink2 }, g);
      sv('text', { x: 300, y: 28, 'text-anchor': 'middle', 'font-size': 16, fill: C.ink, text: `Le tout : ${nf(T)} = 100 %` }, g);
      sv('text', { x: 40 + 260 * p / 100, y: 120, 'text-anchor': 'middle', 'font-size': 16, fill: C.acc, 'font-weight': 700, text: `${p} % → ${nf(T * p / 100)}` }, g);
      cap.innerHTML = `${p} % de ${nf(T)} = ${F(p, 100)} × ${nf(T)} = ${nf(p / 100)} × ${nf(T)} = <b>${nf(T * p / 100)}</b>`;
    } else {
      const k = 1 + p / 100, hMax = 320;
      const w1 = hMax * 100 / Math.max(100, 100 * k), w2 = hMax * k * 100 / Math.max(100, 100 * k);
      sv('rect', { x: 140, y: 30, width: w1 * 1.3, height: 34, fill: C.blue }, g);
      sv('rect', { x: 140, y: 80, width: w2 * 1.3, height: 34, fill: p >= 0 ? C.ok : C.ko }, g);
      sv('text', { x: 130, y: 53, 'text-anchor': 'end', 'font-size': 16, fill: C.ink, text: 'Avant : ' + nf(T) }, g);
      sv('text', { x: 130, y: 103, 'text-anchor': 'end', 'font-size': 16, fill: C.ink, text: 'Après : ' + nf(+(T * k).toFixed(4)) }, g);
      cap.innerHTML = `${p >= 0 ? 'Augmenter' : 'Diminuer'} de ${Math.abs(p)} %, c’est <b>multiplier par ${nf(+k.toFixed(4))}</b> (= 1 ${p >= 0 ? '+' : '−'} ${nf(Math.abs(p) / 100)}). ${nf(T)} × ${nf(+k.toFixed(4))} = ${nf(+(T * k).toFixed(4))}.`;
    }
  };
  if (mode === 'part') slider(ctrl, 'Total', 20, 400, 10, T, v => { T = v; draw(); });
  else slider(ctrl, 'Valeur', 20, 400, 10, T, v => { T = v; draw(); });
  slider(ctrl, mode === 'part' ? 'Pourcentage' : 'Évolution (%)', mode === 'part' ? 0 : -50, 100, 5, p, v => { p = v; draw(); }, v => v + ' %');
  el.append(ctrl, cap); draw();
});

/* ---------- graphique de fonction ---------- */
widget('graph', (el, o) => {
  const W = 600, H = 400, pad = 36;
  const xmin = o.xmin ?? -5, xmax = o.xmax ?? 5, ymin = o.ymin ?? -5, ymax = o.ymax ?? 5;
  const X = x => pad + (x - xmin) * (W - 2 * pad) / (xmax - xmin), Y = y => H - pad - (y - ymin) * (H - 2 * pad) / (ymax - ymin);
  const svg = svgRoot(W, H, el);
  const grid = sv('g', {}, svg);
  for (let x = Math.ceil(xmin); x <= xmax; x++) sv('line', { x1: X(x), y1: Y(ymin), x2: X(x), y2: Y(ymax), stroke: C.line, 'stroke-width': 1 }, grid);
  for (let y = Math.ceil(ymin); y <= ymax; y++) sv('line', { x1: X(xmin), y1: Y(y), x2: X(xmax), y2: Y(y), stroke: C.line, 'stroke-width': 1 }, grid);
  sv('line', { x1: X(xmin), y1: Y(0), x2: X(xmax), y2: Y(0), stroke: C.ink, 'stroke-width': 1.8 }, grid);
  sv('line', { x1: X(0), y1: Y(ymin), x2: X(0), y2: Y(ymax), stroke: C.ink, 'stroke-width': 1.8 }, grid);
  const lstep = o.lstep || (xmax - xmin > 12 ? 2 : 1);
  for (let x = Math.ceil(xmin); x <= xmax; x++) if (x && x % lstep === 0) sv('text', { x: X(x), y: Y(0) + 18, 'text-anchor': 'middle', 'font-size': 13, fill: C.ink2, text: nf(x) }, grid);
  for (let y = Math.ceil(ymin); y <= ymax; y++) if (y && y % (o.ylstep || lstep) === 0) sv('text', { x: X(0) - 6, y: Y(y) + 4, 'text-anchor': 'end', 'font-size': 13, fill: C.ink2, text: nf(y) }, grid);
  sv('text', { x: X(0) - 6, y: Y(0) + 16, 'text-anchor': 'end', 'font-size': 13, fill: C.ink2, text: '0' }, grid);
  const curves = sv('g', {}, svg), top = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  const cols = [C.blue, C.acc, C.ok, C.pc];
  let fns = o.fns || [];
  let m = o.m ?? 1, p = o.p ?? 1, x = o.x ?? 1, k = o.k ?? 2, px = o.px ?? 1, py = o.py ?? 2;
  const pathOf = f => {
    let d = '', pen = false;
    for (let i = 0; i <= 600; i++) {
      const xx = xmin + (xmax - xmin) * i / 600, yy = f(xx);
      if (!isFinite(yy) || yy > ymax + 50 || yy < ymin - 50) { pen = false; continue; }
      const prev = i ? f(xmin + (xmax - xmin) * (i - 1) / 600) : yy;
      if (pen && Math.abs(yy - prev) > (ymax - ymin)) pen = false;
      d += (pen ? 'L' : 'M') + X(xx).toFixed(1) + ' ' + Y(Math.max(ymin - 1, Math.min(ymax + 1, yy))).toFixed(1); pen = true;
    }
    return d;
  };
  const clip = sv('clipPath', { id: 'clip' + (el.id = 'g' + Math.random().toString(36).slice(2)) }, svg);
  sv('rect', { x: pad, y: pad, width: W - 2 * pad, height: H - 2 * pad }, clip);
  curves.setAttribute('clip-path', `url(#${clip.id})`);
  const drawCurves = () => {
    curves.innerHTML = '';
    if (o.mode === 'affine') fns = [{ f: t => m * t + p, label: '' }];
    (o.points || []).forEach(([px0, py0, lab]) => { sv('circle', { cx: X(px0), cy: Y(py0), r: 7, fill: C.acc }, curves); if (lab) sv('text', { x: X(px0) + 10, y: Y(py0) - 10, 'font-size': 17, 'font-weight': 700, fill: C.acc, text: lab }, curves); });
    fns.forEach((fn, i) => {
      sv('path', { d: pathOf(fn.f), fill: 'none', stroke: fn.color || cols[i], 'stroke-width': 3 }, curves);
      if (fn.label) { const lx = fn.lx ?? xmax - 0.6; sv('text', { x: X(lx), y: Y(Math.max(ymin + .5, Math.min(ymax - .5, fn.f(lx)))) - 10, 'text-anchor': 'end', 'font-size': 16, 'font-weight': 700, fill: fn.color || cols[i], text: fn.label }, curves); }
    });
  };
  const roots = (f, kk) => { const r = []; const N = 2000; let prev = f(xmin) - kk; for (let i = 1; i <= N; i++) { const xx = xmin + (xmax - xmin) * i / N, v = f(xx) - kk; if (!isFinite(v) || !isFinite(prev)) { prev = v; continue; } if (v === 0 || prev * v < 0) { if (Math.abs(f(xx) - kk) < (ymax - ymin) / 20) r.push(+xx.toFixed(2)); } prev = v; } return r.filter((v, i, a) => !i || Math.abs(v - a[i - 1]) > .05); };
  const draw = () => {
    top.innerHTML = '';
    const f = fns[0] && fns[0].f;
    if (o.mode === 'image') {
      const y = f(x);
      if (isFinite(y)) {
        sv('line', { x1: X(x), y1: Y(0), x2: X(x), y2: Y(y), stroke: C.acc, 'stroke-width': 2, 'stroke-dasharray': '6 5' }, top);
        sv('line', { x1: X(x), y1: Y(y), x2: X(0), y2: Y(y), stroke: C.acc, 'stroke-width': 2, 'stroke-dasharray': '6 5' }, top);
        sv('circle', { cx: X(x), cy: Y(y), r: 8, fill: C.acc }, top);
        sv('circle', { cx: X(x), cy: Y(0), r: 6, fill: C.blue }, top);
        cap.innerHTML = `On part de ${M('x')} = <b style="color:var(--accent2)">${nf(x)}</b> sur l’axe horizontal, on monte jusqu’à la courbe, puis on lit la hauteur : ${M('f')}(${nf(x)}) = <b style="color:var(--accent)">${nf(+y.toFixed(2))}</b>. C’est <b>l’image</b> de ${nf(x)}.` + (o.formula ? `<br>Par le calcul : ${o.formula(x)}` : '');
      } else cap.innerHTML = `${nf(x)} n’a pas d’image : la fonction n’est pas définie en ce point.`;
    } else if (o.mode === 'antecedent' || o.mode === 'ineq') {
      sv('line', { x1: X(xmin), y1: Y(k), x2: X(xmax), y2: Y(k), stroke: C.acc, 'stroke-width': 2.5, 'stroke-dasharray': o.mode === 'ineq' ? '0' : '8 6' }, top);
      sv('text', { x: X(xmin) + 4, y: Y(k) - 8, 'font-size': 15, fill: C.acc, 'font-weight': 700, text: 'y = ' + nf(k) }, top);
      const rs = roots(f, k);
      rs.forEach(r => { sv('line', { x1: X(r), y1: Y(k), x2: X(r), y2: Y(0), stroke: C.blue, 'stroke-width': 2, 'stroke-dasharray': '5 4' }, top); sv('circle', { cx: X(r), cy: Y(k), r: 7, fill: C.acc }, top); sv('circle', { cx: X(r), cy: Y(0), r: 6, fill: C.blue }, top); });
      if (o.mode === 'ineq') {
        let inside = false, start = null;
        const segs = [];
        for (let i = 0; i <= 600; i++) { const xx = xmin + (xmax - xmin) * i / 600, yy = f(xx); const ins = isFinite(yy) && yy < k; if (ins && !inside) { start = xx; inside = true; } if ((!ins || i === 600) && inside) { segs.push([start, xx]); inside = false; } }
        segs.forEach(([s0, s1]) => sv('line', { x1: X(s0), y1: Y(0), x2: X(s1), y2: Y(0), stroke: C.ok, 'stroke-width': 8, opacity: .8 }, top));
        cap.innerHTML = `Les solutions de ${M('f')}(${M('x')}) &lt; ${nf(k)} sont les ${M('x')} pour lesquels la courbe est <b>sous</b> la droite y = ${nf(k)} : en vert sur l’axe des abscisses.` + (rs.length ? ` Les bornes sont les abscisses des points d’intersection : ${rs.map(v => nf(v)).join(' ; ')}.` : '');
      } else cap.innerHTML = rs.length ? `On part de la hauteur <b style="color:var(--accent)">${nf(k)}</b> sur l’axe vertical, on va jusqu’à la courbe, et on descend lire ${M('x')}. Antécédent(s) de ${nf(k)} : <b style="color:var(--accent2)">${rs.map(v => nf(v)).join(' ; ')}</b>. Il peut y en avoir plusieurs… ou aucun.` : `La droite y = ${nf(k)} ne coupe pas la courbe : ${nf(k)} n’a <b>aucun antécédent</b>.`;
    } else if (o.mode === 'affine') {
      sv('circle', { cx: X(0), cy: Y(p), r: 7, fill: C.acc }, top);
      if (Math.abs(m) <= 6) {
        sv('line', { x1: X(0), y1: Y(p), x2: X(1), y2: Y(p), stroke: C.ok, 'stroke-width': 3 }, top);
        sv('line', { x1: X(1), y1: Y(p), x2: X(1), y2: Y(p + m), stroke: C.pc, 'stroke-width': 3 }, top);
        sv('text', { x: X(1) + 6, y: Y(p + m / 2) + 5, 'font-size': 15, fill: C.pc, 'font-weight': 700, text: (m >= 0 ? '+' : '') + nf(m) }, top);
      }
      cap.innerHTML = `${M('f')}(${M('x')}) = ${poly([[m, 'x'], [p, '']])}. <b style="color:var(--accent)">p = ${nf(p)}</b> : la droite coupe l’axe vertical en ${nf(p)} (ordonnée à l’origine).<br><b style="color:var(--pc)">m = ${nf(m)}</b> : quand ${M('x')} augmente de 1, ${M('f')}(${M('x')}) ${m > 0 ? 'augmente' : m < 0 ? 'diminue' : 'ne change pas'}${m ? ' de ' + nf(Math.abs(m)) : ''} (coefficient directeur). La fonction est ${m > 0 ? 'croissante' : m < 0 ? 'décroissante' : 'constante'}.`;
    } else if (o.mode === 'point') {
      sv('line', { x1: X(px), y1: Y(0), x2: X(px), y2: Y(py), stroke: C.blue, 'stroke-width': 2, 'stroke-dasharray': '5 4' }, top);
      sv('line', { x1: X(0), y1: Y(py), x2: X(px), y2: Y(py), stroke: C.ok, 'stroke-width': 2, 'stroke-dasharray': '5 4' }, top);
      sv('circle', { cx: X(px), cy: Y(py), r: 8, fill: C.acc }, top);
      sv('text', { x: X(px) + 10, y: Y(py) - 10, 'font-size': 16, 'font-weight': 700, fill: C.acc, text: `A(${nf(px)} ; ${nf(py)})` }, top);
      if (f) { const on = Math.abs(f(px) - py) < 1e-9; cap.innerHTML = `Le point A a pour coordonnées (${nf(px)} ; ${nf(py)}). ${M('f')}(${nf(px)}) = ${nf(+f(px).toFixed(3))}. ${on ? '<b style="color:var(--ok)">Les deux nombres sont égaux : A est sur la courbe.</b>' : '<b style="color:var(--ko)">' + nf(+f(px).toFixed(3)) + ' ≠ ' + nf(py) + ' : A n’est pas sur la courbe.</b>'}`; }
      else cap.innerHTML = `A(<b style="color:var(--accent2)">${nf(px)}</b> ; <b style="color:var(--ok)">${nf(py)}</b>) : d’abord l’<b>abscisse</b> (on se déplace horizontalement), ensuite l’<b>ordonnée</b> (verticalement).`;
    }
  };
  if (o.mode === 'image') slider(ctrl, 'x', xmin, xmax, o.xstep || 0.5, x, v => { x = v; draw(); });
  if (o.mode === 'antecedent' || o.mode === 'ineq') slider(ctrl, 'k', ymin, ymax, o.kstep || 0.5, k, v => { k = v; draw(); });
  if (o.mode === 'affine') { slider(ctrl, 'm', -4, 4, 0.5, m, v => { m = v; drawCurves(); draw(); }); slider(ctrl, 'p', -4, 4, 0.5, p, v => { p = v; drawCurves(); draw(); }); }
  if (o.mode === 'point') { slider(ctrl, 'abscisse', xmin, xmax, o.xstep || 1, px, v => { px = v; draw(); }); slider(ctrl, 'ordonnée', ymin, ymax, o.xstep || 1, py, v => { py = v; draw(); }); }
  drawCurves();
  el.append(ctrl, cap);
  if (!o.mode) cap.innerHTML = o.cap || '';
  draw();
});

/* ---------- racine carrée = côté d'un carré ---------- */
widget('sqroot', (el, o) => {
  const svg = svgRoot(600, 260, el);
  const g = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  let A = o.A || 9;
  const draw = () => {
    g.innerHTML = '';
    const s = Math.sqrt(A), u = 220 / 10;
    for (let i = 0; i <= 10; i++) { sv('line', { x1: 40 + i * u, y1: 20, x2: 40 + i * u, y2: 240, stroke: C.line }, g); sv('line', { x1: 40, y1: 20 + i * u, x2: 260, y2: 20 + i * u, stroke: C.line }, g); }
    sv('rect', { x: 40, y: 240 - s * u, width: s * u, height: s * u, fill: C.blue, opacity: .75, stroke: C.ink, 'stroke-width': 2 }, g);
    sv('text', { x: 40 + s * u / 2, y: 240 - s * u / 2 + 6, 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 700, fill: '#fff', text: 'aire ' + nf(A) }, g);
    const exact = Number.isInteger(s);
    sv('text', { x: 300, y: 90, 'font-size': 22, fill: C.ink, text: `√${nf(A)} = ${exact ? nf(s) : '≈ ' + nf(+s.toFixed(3))}` }, g);
    sv('text', { x: 300, y: 130, 'font-size': 16, fill: C.ink2, text: exact ? `car ${nf(s)}² = ${nf(A)}` : `car ${nf(+s.toFixed(3))}² ≈ ${nf(A)}` }, g);
    sv('text', { x: 300, y: 170, 'font-size': 16, fill: C.ink2, text: exact ? 'carré parfait : racine entière' : 'pas un carré parfait' }, g);
    cap.innerHTML = `√${nf(A)} est le nombre <b>positif</b> dont le carré vaut ${nf(A)} : c’est le côté d’un carré d’aire ${nf(A)}.`;
  };
  slider(ctrl, 'Aire du carré', 0, 100, 1, A, v => { A = v; draw(); });
  el.append(ctrl, cap); draw();
});

/* ---------- multiples, diviseurs, nombres premiers : rectangles ---------- */
widget('rects', (el, o) => {
  const box = h('div', { style: 'display:flex;flex-wrap:wrap;gap:14px;justify-content:center;min-height:120px;padding:8px' });
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  let n = o.n || 12;
  const draw = () => {
    box.innerHTML = '';
    const divs = []; for (let d = 1; d <= n; d++) if (n % d === 0) divs.push(d);
    divs.filter(d => d <= n / d).forEach(d => {
      const w = n / d, cell = Math.max(6, Math.min(16, 180 / Math.max(w, d)));
      const s = svgRoot(w * cell + 4, d * cell + 4, null); s.style.width = (w * cell + 4) + 'px'; s.style.maxWidth = '100%';
      for (let i = 0; i < d; i++) for (let j = 0; j < w; j++) sv('circle', { cx: 2 + j * cell + cell / 2, cy: 2 + i * cell + cell / 2, r: cell * .38, fill: divs.length === 2 ? C.acc : C.blue }, s);
      box.append(h('div', { style: 'text-align:center' }, s, h('div', { class: 'small' }, `${d} × ${w}`)));
    });
    const prime = divs.length === 2;
    cap.innerHTML = `${n} points peuvent être rangés en ${divs.filter(d => d <= n / d).length} rectangle(s). Diviseurs de ${n} : <b>${divs.join(' ; ')}</b>.` +
      (n === 1 ? ' 1 n’a qu’un seul diviseur : il n’est <b>pas premier</b>.' : prime ? ` <b style="color:var(--accent)">${n} est premier</b> : seulement deux diviseurs, 1 et lui-même (une seule ligne possible).` : ` ${n} n’est pas premier.`) +
      (n % 2 === 0 ? ` ${n} est pair (multiple de 2).` : ` ${n} est impair.`);
  };
  slider(ctrl, 'Nombre de points', 1, 40, 1, n, v => { n = v; draw(); });
  el.append(box, ctrl, cap);
});
widget('pairs', (el, o) => {
  const svg = svgRoot(600, 120, el);
  const g = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  let n = o.n || 9;
  const draw = () => {
    g.innerHTML = '';
    const k = Math.floor(n / 2);
    for (let i = 0; i < k; i++) { sv('circle', { cx: 30 + i * 26, cy: 35, r: 10, fill: C.blue }, g); sv('circle', { cx: 30 + i * 26, cy: 65, r: 10, fill: C.blue }, g); }
    if (n % 2) sv('circle', { cx: 30 + k * 26, cy: 50, r: 10, fill: C.acc }, g);
    cap.innerHTML = n % 2 ? `${n} = 2 × ${k} + 1 : on fait ${k} paires et il reste <b style="color:var(--accent)">un point seul</b>. ${n} est <b>impair</b> : il s’écrit 2k + 1.` : `${n} = 2 × ${k} : tous les points sont en paires. ${n} est <b>pair</b> : il s’écrit 2k.`;
  };
  slider(ctrl, 'n', 1, 21, 1, n, v => { n = v; draw(); });
  el.append(ctrl, cap);
});

/* ---------- décomposition en facteurs premiers ---------- */
widget('ftree', (el, o) => {
  const out = h('div', { style: 'text-align:center;font-size:1.1rem;min-height:140px' });
  const cap = h('div', { class: 'cap' });
  const nums = o.nums || [60, 84, 126, 90, 210, 72];
  const draw = n => {
    const steps = []; let r = n, d = 2; const fac = [];
    while (r > 1) { if (r % d === 0) { steps.push(`${r} = ${d} × ${r / d}`); fac.push(d); r /= d; } else d++; }
    out.innerHTML = steps.map((s, i) => `<div style="margin-left:${i * 22}px;text-align:left;display:inline-block;width:100%">${s}${fac[i] ? ' <span style="color:var(--accent)">← ' + fac[i] + ' est premier</span>' : ''}</div>`).join('') +
      `<div class="formula">${n} = ${fac.join(' × ')}</div>`;
    cap.innerHTML = 'À chaque étape, on divise par le plus petit nombre premier possible (2, puis 3, 5, 7…) jusqu’à arriver à 1.';
  };
  wbtns(el, nums.map(String), i => draw(nums[i]));
  el.append(out, cap); draw(nums[0]);
});

/* ---------- encadrement par zooms successifs ---------- */
widget('zoom', (el, o) => {
  const val = o.val ?? Math.SQRT2, name = o.name || '√2';
  const svg = svgRoot(600, 120, el);
  const g = sv('g', {}, svg);
  const cap = h('div', { class: 'cap' });
  let lvl = 0;
  const draw = () => {
    g.innerHTML = '';
    const step = Math.pow(10, -lvl), lo = Math.floor(val / step) * step;
    const min = +lo.toFixed(lvl), max = +(lo + step).toFixed(lvl);
    const X = drawAxis(g, { min, max, step: step / 10, labelEvery: 5, x0: 40, x1: 560 });
    sv('circle', { cx: X(val), cy: 70, r: 8, fill: C.acc }, g);
    sv('text', { x: X(val), y: 40, 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 700, fill: C.acc, text: name }, g);
    const lo2 = Math.floor(val / (step / 10)) * step / 10;
    cap.innerHTML = `Encadrement à ${nf(step / 10)} près (amplitude ${nf(step / 10)}) : <b>${nf(+lo2.toFixed(lvl + 1))} &lt; ${name} &lt; ${nf(+(lo2 + step / 10).toFixed(lvl + 1))}</b>. Arrondi au ${['dixième', 'centième', 'millième', 'dix-millième'][lvl]} : ${nf(+val.toFixed(lvl + 1))}.`;
  };
  wbtns(el, ['Unités', 'Zoom ×10', 'Zoom ×100', 'Zoom ×1000'], i => { lvl = i; draw(); });
  el.append(cap); draw();
});

/* ---------- déroulé pas à pas (calculs) ---------- */
widget('steps', (el, o) => {
  const box = h('div', { style: 'font-size:1.15rem' });
  let k = 0;
  const btn = h('button', { class: 'wbtn', onclick: () => { k++; draw(); } }, 'Étape suivante');
  const draw = () => {
    box.innerHTML = o.lines.slice(0, k + 1).map((l, i) => `<div style="padding:6px 0;${i === k ? 'animation:pop .3s' : 'opacity:.75'}">${l}</div>`).join('');
    btn.style.display = k >= o.lines.length - 1 ? 'none' : '';
  };
  el.append(box, h('div', { class: 'wbtns' }, btn)); draw();
});
