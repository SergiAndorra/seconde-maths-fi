'use strict';
/* ============ Visuels : maths (suite) ============ */
const V = s => `<span class="vec">${s}</span>`;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const PY = lines => `<div class="code">${lines.map(l => `<div>${esc(l) || ' '}</div>`).join('')}</div>`;
const OV = s => s + '̅';            // lettre surlignée (événement contraire)
const subD = n => String(n).replace(/\d/g, d => '₀₁₂₃₄₅₆₇₈₉'[d]);

function arrowSvg(g, x1, y1, x2, y2, col, w, lab) {
  const L = Math.hypot(x2 - x1, y2 - y1);
  if (L < 2) { sv('circle', { cx: x1, cy: y1, r: 5, fill: col }, g); return; }
  const ux = (x2 - x1) / L, uy = (y2 - y1) / L, hl = Math.min(15, L * .45);
  sv('line', { x1, y1, x2: x2 - ux * hl * .7, y2: y2 - uy * hl * .7, stroke: col, 'stroke-width': w || 3, 'stroke-linecap': 'round' }, g);
  sv('path', { d: `M${x2} ${y2} L${x2 - ux * hl - uy * hl * .45} ${y2 - uy * hl + ux * hl * .45} L${x2 - ux * hl + uy * hl * .45} ${y2 - uy * hl - ux * hl * .45} Z`, fill: col }, g);
  if (lab) sv('text', { x: (x1 + x2) / 2 - uy * 18, y: (y1 + y2) / 2 + ux * 18 + 6, 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 700, fill: col, text: lab }, g);
}
function gridSvg(svg, o) {
  o = o || {};
  const u = o.u || 36, ox = o.ox ?? 300, oy = o.oy ?? 200, W = o.W || 600, H = o.H || 400;
  const g = sv('g', {}, svg);
  for (let x = ox % u; x <= W; x += u) sv('line', { x1: x, y1: 0, x2: x, y2: H, stroke: C.line, 'stroke-width': 1 }, g);
  for (let y = oy % u; y <= H; y += u) sv('line', { x1: 0, y1: y, x2: W, y2: y, stroke: C.line, 'stroke-width': 1 }, g);
  if (o.axes !== false) {
    sv('line', { x1: 0, y1: oy, x2: W, y2: oy, stroke: C.ink2, 'stroke-width': 1.8 }, g);
    sv('line', { x1: ox, y1: 0, x2: ox, y2: H, stroke: C.ink2, 'stroke-width': 1.8 }, g);
    sv('text', { x: ox - 6, y: oy + 18, 'text-anchor': 'end', 'font-size': 14, fill: C.ink2, text: 'O' }, g);
    sv('text', { x: ox + u, y: oy + 18, 'text-anchor': 'middle', 'font-size': 14, fill: C.ink2, text: '1' }, g);
    sv('text', { x: ox - 8, y: oy - u + 5, 'text-anchor': 'end', 'font-size': 14, fill: C.ink2, text: '1' }, g);
  }
  return (x, y) => [ox + x * u, oy - y * u];
}
// tableau de variations : vtab({x:['−3','1','4'], f:[['2','h'],['−5','l'],['6','h']]})
function vtab(t) {
  const n = t.x.length, cols = 2 * n - 1, rk = { l: 0, m: 1, h: 2 };
  let s = `<div class="vt" style="grid-template-columns:auto repeat(${cols},1fr)"><div class="vth vtx">x</div>`;
  t.x.forEach((v, i) => { s += `<div class="vtx">${v}</div>`; if (i < n - 1) s += '<div class="vtx"></div>'; });
  s += `<div class="vth">${t.name || 'f'}</div>`;
  t.f.forEach(([v, p], i) => { s += `<div class="vtv ${p}">${v}</div>`; if (i < n - 1) s += `<div class="vta">${rk[t.f[i + 1][1]] > rk[p] ? '↗' : '↘'}</div>`; });
  return s + '</div>';
}
// tableau de signes : stab(['−∞','−3','1','+∞'], [['x + 3', ['', '−', '0', '+', '', '+', '']], ...])
function stab(xs, rows) {
  const cols = 2 * xs.length - 1;
  let s = `<div class="vt" style="grid-template-columns:auto repeat(${cols},1fr)"><div class="vth vtx">x</div>`;
  xs.forEach((v, i) => { s += `<div class="vtx">${v}</div>`; if (i < xs.length - 1) s += '<div class="vtx"></div>'; });
  rows.forEach((r, k) => { const b = k < rows.length - 1 ? ' stb' : ''; s += `<div class="vth${b}">${r[0]}</div>`; r[1].forEach(c => { s += `<div class="stc${b}">${c}</div>`; }); });
  return s + '</div>';
}

/* ---------- vecteurs ---------- */
widget('vec', (el, o) => {
  const mode = o.mode || 'translate';
  const svg = svgRoot(600, 400, el);
  const P = gridSvg(svg, { axes: mode !== 'translate' });
  const g = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  let ux = o.ux ?? 3, uy = o.uy ?? 2, vx = o.vx ?? 2, vy = o.vy ?? -3, xa = o.xa ?? -4, ya = o.ya ?? -2, xb = o.xb ?? 3, yb = o.yb ?? 2, k = o.k ?? 2;
  const ar = (x1, y1, x2, y2, col, lab, w) => { const [a, b] = P(x1, y1), [c, d] = P(x2, y2); arrowSvg(g, a, b, c, d, col, w || 3.5, lab); };
  const pt = (x, y, lab, col, dx = -8, dy = -10) => { const [a, b] = P(x, y); sv('circle', { cx: a, cy: b, r: 5, fill: col || C.ink }, g); if (lab) sv('text', { x: a + dx, y: b + dy, 'text-anchor': dx < 0 ? 'end' : 'start', 'font-size': 17, 'font-weight': 700, fill: col || C.ink, text: lab }, g); };
  const dash = (x1, y1, x2, y2, col) => { const [a, b] = P(x1, y1), [c, d] = P(x2, y2); sv('line', { x1: a, y1: b, x2: c, y2: d, stroke: col, 'stroke-width': 2.2, 'stroke-dasharray': '7 5' }, g); };
  const norm = (x, y) => { const n2 = x * x + y * y, s = Math.sqrt(n2); return Number.isInteger(s) ? nf(s) : `${R(nf(n2))} ≈ ${nf(+s.toFixed(2))}`; };
  const draw = () => {
    g.innerHTML = '';
    if (mode === 'translate') {
      const T = [[-6, -2], [-3, -3], [-4, 1]], names = ['A', 'B', 'C'];
      const poly = (pts, col) => sv('polygon', { points: pts.map(([x, y]) => P(x, y).join(',')).join(' '), fill: col, 'fill-opacity': .22, stroke: col, 'stroke-width': 2 }, g);
      poly(T, C.blue); poly(T.map(([x, y]) => [x + ux, y + uy]), C.acc);
      T.forEach(([x, y], i) => { ar(x, y, x + ux, y + uy, C.ok, i === 2 ? 'u' : ''); pt(x, y, names[i], C.blue); pt(x + ux, y + uy, names[i] + '’', C.acc, 8, -10); });
      cap.innerHTML = `La translation de vecteur ${V('u')} déplace <b>tous les points de la même façon</b> : ${V('AA’')} = ${V('BB’')} = ${V('CC’')} = ${V('u')}. Les flèches vertes ont la même <b>direction</b>, le même <b>sens</b> et la même <b>longueur</b> (la norme : ${norm(ux, uy)} carreaux). La figure est simplement glissée, sans tourner ni changer de taille.`;
    } else if (mode === 'sum') {
      const x0 = -6, y0 = 0;
      dash(x0, y0, x0 + vx, y0 + vy, C.ink2); dash(x0 + vx, y0 + vy, x0 + ux + vx, y0 + uy + vy, C.ink2);
      ar(x0, y0, x0 + ux, y0 + uy, C.blue, 'u'); ar(x0 + ux, y0 + uy, x0 + ux + vx, y0 + uy + vy, C.acc, 'v'); ar(x0, y0, x0 + ux + vx, y0 + uy + vy, C.ok, 'u + v', 4.5);
      pt(x0, y0, 'A'); pt(x0 + ux, y0 + uy, 'B', null, 8, -10); pt(x0 + ux + vx, y0 + uy + vy, 'C', null, 8, -10);
      cap.innerHTML = `On enchaîne les translations : de A à B (vecteur ${V('u')}), puis de B à C (vecteur ${V('v')}). C’est comme aller directement de A à C : <b>${V('AB')} + ${V('BC')} = ${V('AC')}</b>, c’est la <b>relation de Chasles</b>. En pointillés, la règle du parallélogramme donne le même résultat.<br>En coordonnées : ${V('u')}(${nf(ux)} ; ${nf(uy)}) + ${V('v')}(${nf(vx)} ; ${nf(vy)}) = (${nf(ux + vx)} ; ${nf(uy + vy)}) : on additionne les abscisses entre elles et les ordonnées entre elles.`;
    } else if (mode === 'coord') {
      const dx = xb - xa, dy = yb - ya;
      dash(xa, ya, xb, ya, C.blue); dash(xb, ya, xb, yb, C.pc);
      ar(xa, ya, xb, yb, C.acc, '', 4);
      const [hx, hy] = P((xa + xb) / 2, ya), [vx0, vy0] = P(xb, (ya + yb) / 2);
      if (dx) sv('text', { x: hx, y: hy + (dy >= 0 ? 22 : -10), 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 700, fill: C.blue, text: (dx > 0 ? '+' : '') + nf(dx) }, g);
      if (dy) sv('text', { x: vx0 + (dx >= 0 ? 10 : -10), y: vy0 + 6, 'text-anchor': dx >= 0 ? 'start' : 'end', 'font-size': 17, 'font-weight': 700, fill: C.pc, text: (dy > 0 ? '+' : '') + nf(dy) }, g);
      pt(xa, ya, 'A', C.ink); pt(xb, yb, 'B', C.ink, 8, -10);
      pt((xa + xb) / 2, (ya + yb) / 2, 'M', C.ok, -8, 20);
      cap.innerHTML = `A(${nf(xa)} ; ${nf(ya)}) et B(${nf(xb)} ; ${nf(yb)}). Pour aller de A à B : <b style="color:var(--accent2)">${nf(dx)}</b> horizontalement et <b style="color:var(--pc)">${nf(dy)}</b> verticalement.<br>${V('AB')}(x<sub>B</sub> − x<sub>A</sub> ; y<sub>B</sub> − y<sub>A</sub>) = (${nf(xb)} − ${par(xa)} ; ${nf(yb)} − ${par(ya)}) = <b>(${nf(dx)} ; ${nf(dy)})</b>.<br>Longueur : AB = ${R('x² + y²')} = ${R(par(dx) + '² + ' + par(dy) + '²')} = ${norm(dx, dy)}.<br>Milieu M de [AB] : (${F('x<sub>A</sub> + x<sub>B</sub>', 2)} ; ${F('y<sub>A</sub> + y<sub>B</sub>', 2)}) = (${nf((xa + xb) / 2)} ; ${nf((ya + yb) / 2)}).`;
    } else if (mode === 'scalar') {
      ar(-7, 3, -7 + ux, 3 + uy, C.blue, 'u');
      ar(-1, -1, -1 + k * ux, -1 + k * uy, k < 0 ? C.ko : C.acc, k === 0 ? '' : nf(k) + 'u');
      if (k === 0) pt(-1, -1, '0⃗', C.acc);
      cap.innerHTML = `${V('u')}(${nf(ux)} ; ${nf(uy)}) et ${nf(k)}${V('u')}(${nf(k * ux)} ; ${nf(k * uy)}) : on multiplie chaque coordonnée par ${nf(k)}. ` +
        (k === 0 ? 'On obtient le vecteur nul.' : `Même <b>direction</b> (les flèches sont parallèles) : les vecteurs sont <b>colinéaires</b>. ${k > 0 ? 'Même <b>sens</b>' : '<b>Sens opposé</b> (k est négatif)'}, et une longueur multipliée par ${nf(Math.abs(k))}.`);
    } else if (mode === 'det') {
      const d = ux * vy - uy * vx;
      sv('polygon', { points: [P(0, 0), P(ux, uy), P(ux + vx, uy + vy), P(vx, vy)].map(p => p.join(',')).join(' '), fill: d === 0 ? C.ko : C.warn, 'fill-opacity': .25 }, g);
      ar(0, 0, ux, uy, C.blue, 'u'); ar(0, 0, vx, vy, C.acc, 'v');
      cap.innerHTML = `det(${V('u')}, ${V('v')}) = x × y’ − y × x’ = ${par(ux)} × ${par(vy)} − ${par(uy)} × ${par(vx)} = <b>${nf(d)}</b>. ` +
        (d === 0 ? '<b style="color:var(--ok)">Le déterminant est nul : les vecteurs sont colinéaires</b> (même direction, le parallélogramme est aplati).' : 'Le déterminant n’est pas nul : les vecteurs ne sont <b>pas colinéaires</b>. (Sa valeur absolue est l’aire du parallélogramme jaune.)');
    }
  };
  const sl = (lab, mn, mx, v, set) => slider(ctrl, lab, mn, mx, 1, v, x => { set(x); draw(); });
  if (mode === 'translate') { sl('u : abscisse', -2, 8, ux, x => ux = x); sl('u : ordonnée', -2, 4, uy, x => uy = x); }
  if (mode === 'sum') { sl('u : x', -2, 6, ux, x => ux = x); sl('u : y', -4, 4, uy, x => uy = x); sl('v : x', -2, 6, vx, x => vx = x); sl('v : y', -4, 4, vy, x => vy = x); }
  if (mode === 'coord') { sl('x<sub>A</sub>', -7, 7, xa, x => xa = x); sl('y<sub>A</sub>', -5, 5, ya, x => ya = x); sl('x<sub>B</sub>', -7, 7, xb, x => xb = x); sl('y<sub>B</sub>', -5, 5, yb, x => yb = x); }
  if (mode === 'scalar') slider(ctrl, 'k', -3, 3, 0.5, k, x => { k = x; draw(); });
  if (mode === 'det') { sl('u : x', -4, 4, ux, x => ux = x); sl('u : y', -4, 4, uy, x => uy = x); sl('v : x', -4, 4, vx, x => vx = x); sl('v : y', -4, 4, vy, x => vy = x); }
  el.append(ctrl, cap);
});

/* ---------- fonctions de référence ---------- */
widget('refs', (el, o) => {
  const defs = [
    ['x²', x => x * x, 'Fonction <b>carré</b> : définie sur ℝ, décroissante sur ]−∞ ; 0] puis croissante sur [0 ; +∞[. La courbe est une <b>parabole</b>, symétrique par rapport à l’axe des ordonnées. Un carré n’est jamais négatif.', { ymin: -1, ymax: 9, xmin: -4, xmax: 4 }],
    ['1/x', x => 1 / x, 'Fonction <b>inverse</b> : définie sur ℝ sauf 0 (on ne divise pas par 0). Décroissante sur ]−∞ ; 0[ et sur ]0 ; +∞[. La courbe est une <b>hyperbole</b>, symétrique par rapport à l’origine.', { ymin: -5, ymax: 5, xmin: -5, xmax: 5 }],
    ['√x', x => (x >= 0 ? Math.sqrt(x) : NaN), 'Fonction <b>racine carrée</b> : définie sur [0 ; +∞[ seulement, croissante. √0 = 0, √1 = 1, √4 = 2, √9 = 3.', { ymin: -1, ymax: 4, xmin: -1, xmax: 9 }],
    ['x³', x => x * x * x, 'Fonction <b>cube</b> : définie et croissante sur ℝ. Courbe symétrique par rapport à l’origine. Le cube d’un négatif est négatif : (−2)³ = −8.', { ymin: -8, ymax: 8, xmin: -3, xmax: 3, ylstep: 2 }],
    ['|x|', x => Math.abs(x), 'Fonction <b>valeur absolue</b> : |x| = x si x ≥ 0 et |x| = −x si x &lt; 0. Décroissante puis croissante, courbe en V.', { ymin: -1, ymax: 5, xmin: -5, xmax: 5 }]];
  const box = h('div'), cap = h('div', { class: 'cap', style: 'font-size:1rem;color:var(--ink)' });
  const show = i => { cleanupGraphs(box); const [lab, f, txt, r] = defs[i]; WG.graph(box, Object.assign({ fns: [{ f, label: 'y = ' + lab }], mode: 'image', x: 1, xstep: 0.5 }, r)); cap.innerHTML = txt; };
  wbtns(el, defs.map(d => 'x ↦ ' + d[0]), show, o.start || 0);
  el.append(cap, box); show(o.start || 0);
});
function cleanupGraphs(box) { box.innerHTML = ''; }

/* ---------- variations : courbe + tableau ---------- */
widget('vartab', (el, o) => { el.append(h('div', { html: vtab(o.t) })); WG.graph(el, Object.assign({ mode: 'image' }, o.g)); });

/* ---------- tableau de signes d’un produit ---------- */
widget('signtab', (el, o) => {
  const gbox = h('div'), tbox = h('div'), ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  let r1 = o.r1 ?? -3, r2 = o.r2 ?? 1;
  const fac = r => r === 0 ? 'x' : 'x ' + (r < 0 ? '+ ' + nf(-r) : '− ' + nf(r));
  const draw = () => {
    gbox.innerHTML = '';
    const f = x => (x - r1) * (x - r2);
    WG.graph(gbox, { fns: [{ f, label: 'f' }], xmin: -5, xmax: 5, ymin: -7, ymax: 7, points: [[r1, 0], [r2, 0]] });
    const rs = [...new Set([r1, r2])].sort((a, b) => a - b);
    const xs = ['−∞', ...rs.map(v => nf(v)), '+∞'], cols = 2 * xs.length - 1;
    const bnd = [-Infinity, ...rs, Infinity];
    const mid = i => (bnd[i] === -Infinity ? bnd[i + 1] - 1 : bnd[i + 1] === Infinity ? bnd[i] + 1 : (bnd[i] + bnd[i + 1]) / 2);
    const row = sign => { const c = []; for (let j = 0; j < cols; j++) { if (j % 2 === 0) { const b = j / 2; c.push(b > 0 && b < xs.length - 1 ? sign(rs[b - 1], true) : ''); } else c.push(sign(mid((j - 1) / 2), false)); } return c; };
    const facRow = r => row((x, atRoot) => atRoot ? (x === r ? '0' : '') : (x > r ? '+' : '−'));
    const prodRow = row((x, atRoot) => atRoot ? '0' : (f(x) > 0 ? '+' : '−'));
    tbox.innerHTML = stab(xs, r1 === r2 ? [[fac(r1), facRow(r1)], [fac(r2), facRow(r2)], ['f(x)', prodRow]] : [[fac(rs[0]), facRow(rs[0])], [fac(rs[1]), facRow(rs[1])], ['f(x)', prodRow]]);
    cap.innerHTML = `f(x) = (${fac(r1)})(${fac(r2)}). Chaque facteur affine change de signe en sa valeur d’annulation ; on applique la règle des signes colonne par colonne. ` +
      (r1 === r2 ? `Ici f(x) = (${fac(r1)})² est toujours positif ou nul.` : `f(x) est <b>négatif sur ]${nf(rs[0])} ; ${nf(rs[1])}[</b> (la courbe est sous l’axe) et positif ailleurs.`);
  };
  slider(ctrl, '1re racine', -4, 4, 1, r1, v => { r1 = v; draw(); });
  slider(ctrl, '2e racine', -4, 4, 1, r2, v => { r2 = v; draw(); });
  el.append(tbox, gbox, ctrl, cap);
});

/* ---------- parité ---------- */
widget('parity', (el, o) => {
  const defs = [['x²', x => x * x, 'paire'], ['x³', x => x ** 3, 'impaire'], ['|x|', Math.abs, 'paire'], ['1/x', x => 1 / x, 'impaire'], ['x² + x', x => x * x + x, 'ni']];
  let i = 0, x = o.x ?? 1.5;
  const gbox = h('div'), ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  const draw = () => {
    gbox.innerHTML = '';
    const [lab, f, kind] = defs[i];
    WG.graph(gbox, { fns: [{ f, label: 'y = ' + lab }], xmin: -4, xmax: 4, ymin: -5, ymax: 6, points: [[x, f(x), 'M'], [-x, f(-x), 'M’']] });
    cap.innerHTML = `f(${nf(x)}) = ${nf(+f(x).toFixed(3))} et f(${nf(-x)}) = ${nf(+f(-x).toFixed(3))}. ` +
      (kind === 'paire' ? 'f(−x) = f(x) : M et M’ sont symétriques par rapport à <b>l’axe des ordonnées</b>. La fonction est <b>paire</b>.' :
        kind === 'impaire' ? 'f(−x) = −f(x) : M et M’ sont symétriques par rapport à <b>l’origine</b>. La fonction est <b>impaire</b>.' :
          'f(−x) n’est égal ni à f(x) ni à −f(x) : la fonction n’est <b>ni paire ni impaire</b>.');
  };
  wbtns(el, defs.map(d => 'y = ' + d[0]), k => { i = k; draw(); });
  slider(ctrl, 'x', 0.5, 3, 0.5, x, v => { x = v; draw(); });
  el.append(gbox, ctrl, cap);
});

/* ---------- ensembles : diagramme de Venn ---------- */
widget('venn', (el, o) => {
  const uid = Math.random().toString(36).slice(2, 8);
  const svg = svgRoot(600, 300, el);
  const defs = sv('defs', {}, svg);
  const cA = sv('clipPath', { id: 'vA' + uid }, defs); sv('circle', { cx: 245, cy: 150, r: 112 }, cA);
  const shade = sv('g', {}, svg), top = sv('g', {}, svg);
  sv('rect', { x: 20, y: 15, width: 560, height: 270, rx: 14, fill: 'none', stroke: C.ink2, 'stroke-width': 2 }, top);
  sv('text', { x: 36, y: 40, 'font-size': 18, 'font-weight': 700, fill: C.ink2, text: 'E' }, top);
  sv('circle', { cx: 245, cy: 150, r: 112, fill: 'none', stroke: C.blue, 'stroke-width': 3 }, top);
  sv('circle', { cx: 355, cy: 150, r: 112, fill: 'none', stroke: C.acc, 'stroke-width': 3 }, top);
  sv('text', { x: 150, y: 58, 'font-size': 20, 'font-weight': 700, fill: C.blue, text: 'A' }, top);
  sv('text', { x: 440, y: 58, 'font-size': 20, 'font-weight': 700, fill: C.acc, text: 'B' }, top);
  [[2, 175, 120], [4, 200, 185], [8, 160, 160], [10, 215, 230], [6, 300, 155], [3, 400, 125], [9, 410, 195], [1, 60, 250], [5, 520, 60], [7, 540, 250]].forEach(([n, x, y]) => sv('text', { x, y, 'text-anchor': 'middle', 'font-size': 20, fill: C.ink, text: n }, top));
  const cap = h('div', { class: 'cap' });
  const modes = [
    ['A ∩ B', () => sv('circle', { cx: 355, cy: 150, r: 112, fill: C.ok, opacity: .35, 'clip-path': `url(#vA${uid})` }, shade), 'A ∩ B (« A inter B ») = {6} : les éléments qui sont dans A <b>et</b> dans B.'],
    ['A ∪ B', () => { sv('circle', { cx: 245, cy: 150, r: 112, fill: C.ok, opacity: .35 }, shade); sv('circle', { cx: 355, cy: 150, r: 112, fill: C.ok, opacity: .35 }, shade); }, 'A ∪ B (« A union B ») = {2 ; 3 ; 4 ; 6 ; 8 ; 9 ; 10} : les éléments qui sont dans A <b>ou</b> dans B (ou dans les deux). 6 n’est écrit qu’une fois.'],
    [OV('A') + ' (complémentaire de A)', () => { sv('rect', { x: 20, y: 15, width: 560, height: 270, rx: 14, fill: C.ok, opacity: .35 }, shade); sv('circle', { cx: 245, cy: 150, r: 113, fill: 'var(--bg)' }, shade); }, OV('A') + ' = {1 ; 3 ; 5 ; 7 ; 9} : les éléments de E qui ne sont <b>pas</b> dans A.']];
  const pickM = i => { shade.innerHTML = ''; modes[i][1](); cap.innerHTML = 'E = {1 ; 2 ; … ; 10}, A = nombres pairs, B = multiples de 3.<br>' + modes[i][2]; };
  wbtns(el, modes.map(m => m[0]), pickM);
  el.append(cap); pickM(0);
});

/* ---------- logique : et / ou / non ---------- */
widget('truth', (el, o) => {
  let a = true, b = false;
  const A = o.A || '« 12 est pair »', B = o.B || '« 12 est premier »';
  const box = h('div');
  const v = x => x ? '<b style="color:var(--ok)">vraie</b>' : '<b style="color:var(--ko)">fausse</b>';
  const bA = h('button', { class: 'wbtn', onclick: () => { a = !a; draw(); } }), bB = h('button', { class: 'wbtn', onclick: () => { b = !b; draw(); } });
  const draw = () => {
    bA.innerHTML = 'A : ' + (a ? 'vraie' : 'fausse'); bB.innerHTML = 'B : ' + (b ? 'vraie' : 'fausse');
    box.innerHTML = `<table class="simple"><tr><td>A ${o.A === undefined ? A : ''}</td><td>${v(a)}</td></tr><tr><td>B ${o.B === undefined ? B : ''}</td><td>${v(b)}</td></tr><tr><td><b>A et B</b></td><td>${v(a && b)}</td></tr><tr><td><b>A ou B</b></td><td>${v(a || b)}</td></tr><tr><td><b>non A</b></td><td>${v(!a)}</td></tr></table>
    <div class="cap">« et » n’est vraie que si les <b>deux</b> sont vraies. « ou » est vraie dès qu’<b>au moins une</b> est vraie (c’est un « ou » inclusif). Touche A ou B pour changer leur valeur.</div>`;
  };
  el.append(h('div', { class: 'wbtns' }, bA, bB), box); draw();
});

/* ---------- pourcentage de pourcentage ---------- */
widget('nested', (el, o) => {
  const svg = svgRoot(600, 180, el), g = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  let p1 = o.p1 ?? 60, p2 = o.p2 ?? 25;
  const draw = () => {
    g.innerHTML = '';
    const W = 520, x0 = 40;
    sv('rect', { x: x0, y: 20, width: W, height: 36, fill: C.line }, g);
    sv('text', { x: x0 + 8, y: 44, 'font-size': 15, fill: C.ink, text: 'Population totale : 100 %' }, g);
    sv('rect', { x: x0, y: 70, width: W * p1 / 100, height: 36, fill: C.blue }, g);
    sv('text', { x: x0 + 8, y: 94, 'font-size': 15, fill: '#fff', 'font-weight': 700, text: `sous-groupe : ${p1} %` }, g);
    sv('rect', { x: x0, y: 120, width: W * p1 * p2 / 10000, height: 36, fill: C.acc }, g);
    sv('text', { x: x0 + W * p1 * p2 / 10000 + 8, y: 144, 'font-size': 15, fill: C.acc, 'font-weight': 700, text: `${p2} % du sous-groupe = ${nf(p1 * p2 / 100)} % du total` }, g);
  };
  slider(ctrl, '1re proportion', 5, 100, 5, p1, v => { p1 = v; draw(); upd(); }, v => v + ' %');
  slider(ctrl, '2e proportion', 5, 100, 5, p2, v => { p2 = v; draw(); upd(); }, v => v + ' %');
  const upd = () => { cap.innerHTML = `${p2} % de ${p1} % = ${nf(p2 / 100)} × ${nf(p1 / 100)} = ${nf(p1 * p2 / 10000)} = <b>${nf(p1 * p2 / 100)} %</b>. On <b>multiplie</b> les proportions (on ne les additionne pas).`; };
  el.append(ctrl, cap);
});

/* ---------- évolutions successives ---------- */
widget('evsucc', (el, o) => {
  const svg = svgRoot(600, 170, el), g = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  let t1 = o.t1 ?? 10, t2 = o.t2 ?? -10;
  const draw = () => {
    g.innerHTML = '';
    const v1 = 100 * (1 + t1 / 100), v2 = v1 * (1 + t2 / 100), sc = 1.2;
    [[100, 'Départ'], [v1, 'Après la 1re'], [v2, 'Après la 2de']].forEach(([v, lab], i) => {
      sv('rect', { x: 140, y: 20 + i * 48, width: Math.min(440, v * sc), height: 34, fill: [C.ink2, C.blue, C.acc][i] }, g);
      sv('text', { x: 130, y: 43 + i * 48, 'text-anchor': 'end', 'font-size': 15, fill: C.ink, text: lab }, g);
      sv('text', { x: 148, y: 43 + i * 48, 'font-size': 15, fill: '#fff', 'font-weight': 700, text: nf(+v.toFixed(2)) }, g);
    });
    const c1 = 1 + t1 / 100, c2 = 1 + t2 / 100, cg = c1 * c2, tg = +((cg - 1) * 100).toFixed(2), inv = +((1 / c1 - 1) * 100).toFixed(2);
    cap.innerHTML = `Coefficients multiplicateurs : ${nf(c1)} puis ${nf(c2)}. Coefficient global : ${nf(c1)} × ${nf(c2)} = <b>${nf(+cg.toFixed(4))}</b>, soit une évolution globale de <b>${tg > 0 ? '+' : ''}${nf(tg)} %</b>` + (Math.abs(tg - (t1 + t2)) > 1e-9 ? ` (et non ${t1 + t2 > 0 ? '+' : ''}${nf(t1 + t2)} % : les taux ne s’additionnent pas).` : '.') +
      `<br>Évolution réciproque de la 1re : pour revenir à 100, il faut multiplier par 1 ÷ ${nf(c1)} ≈ ${nf(+(1 / c1).toFixed(4))}, soit ${inv > 0 ? '+' : ''}${nf(inv)} %.`;
  };
  slider(ctrl, '1re évolution', -50, 100, 5, t1, v => { t1 = v; draw(); }, v => (v > 0 ? '+' : '') + v + ' %');
  slider(ctrl, '2de évolution', -50, 100, 5, t2, v => { t2 = v; draw(); }, v => (v > 0 ? '+' : '') + v + ' %');
  el.append(ctrl, cap);
});

/* ---------- systèmes : deux droites ---------- */
widget('sys', (el, o) => {
  let m1 = o.m1 ?? 1, p1 = o.p1 ?? 1, m2 = o.m2 ?? -1, p2 = o.p2 ?? 3;
  const gbox = h('div'), ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  const draw = () => {
    gbox.innerHTML = '';
    const pts = [];
    if (m1 !== m2) { const x = (p2 - p1) / (m1 - m2); pts.push([x, m1 * x + p1, 'I']); }
    WG.graph(gbox, { fns: [{ f: x => m1 * x + p1, label: 'd₁' }, { f: x => m2 * x + p2, label: 'd₂', lx: -4.2 }], xmin: -5, xmax: 5, ymin: -5, ymax: 5, points: pts });
    const e1 = `y = ${poly([[m1, 'x'], [p1, '']])}`, e2 = `y = ${poly([[m2, 'x'], [p2, '']])}`;
    cap.innerHTML = `d₁ : ${e1} et d₂ : ${e2}. ` + (m1 === m2 ? (p1 === p2 ? 'Mêmes équations : les droites sont <b>confondues</b>.' : `Même pente (${nf(m1)}) : les droites sont <b>parallèles</b>. Pas de point commun, le système n’a <b>pas de solution</b>.`) :
      `Pentes différentes : les droites sont <b>sécantes</b> en I(${nf(+pts[0][0].toFixed(2))} ; ${nf(+pts[0][1].toFixed(2))}). Les coordonnées de I sont la solution du système formé par les deux équations.`);
  };
  slider(ctrl, 'm₁', -3, 3, 0.5, m1, v => { m1 = v; draw(); }); slider(ctrl, 'p₁', -4, 4, 0.5, p1, v => { p1 = v; draw(); });
  slider(ctrl, 'm₂', -3, 3, 0.5, m2, v => { m2 = v; draw(); }); slider(ctrl, 'p₂', -4, 4, 0.5, p2, v => { p2 = v; draw(); });
  el.append(gbox, ctrl, cap);
});

/* ---------- statistiques ---------- */
const mean = a => a.reduce((s, x) => s + x, 0) / a.length;
const median = a => { const s = a.slice().sort((x, y) => x - y), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
const quart = a => { const s = a.slice().sort((x, y) => x - y), n = s.length; return { s, min: s[0], max: s[n - 1], q1: s[Math.ceil(n / 4) - 1], q3: s[Math.ceil(3 * n / 4) - 1], me: median(s) }; };
const sdev = a => { const m = mean(a); return Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / a.length); };
widget('dotplot', (el, o) => {
  const base = o.vals || [8, 9, 10, 10, 11, 12, 12, 12, 13, 14];
  let vals = base.slice();
  const svg = svgRoot(600, 210, el), g = sv('g', {}, svg);
  const cap = h('div', { class: 'cap' });
  const draw = () => {
    g.innerHTML = '';
    const X = drawAxis(g, { min: 0, max: 20, step: 1, labelEvery: 2, y: 165 });
    const cnt = {};
    vals.forEach(v => { cnt[v] = (cnt[v] || 0) + 1; sv('circle', { cx: X(v), cy: 165 - 16 * cnt[v], r: 7, fill: C.blue }, g); });
    const m = mean(vals), me = median(vals);
    sv('line', { x1: X(m), y1: 40, x2: X(m), y2: 168, stroke: C.acc, 'stroke-width': 3, 'stroke-dasharray': '6 4' }, g);
    sv('text', { x: X(m), y: 34, 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 700, fill: C.acc, text: 'moyenne ' + nf(+m.toFixed(2)) }, g);
    sv('line', { x1: X(me), y1: 58, x2: X(me), y2: 168, stroke: C.ok, 'stroke-width': 3, 'stroke-dasharray': '2 4' }, g);
    sv('text', { x: X(me), y: 16, 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 700, fill: C.ok, text: 'médiane ' + nf(me) }, g);
    cap.innerHTML = `${vals.length} valeurs. Moyenne = ${F('somme des valeurs', 'effectif')} = ${F(vals.reduce((s, x) => s + x, 0), vals.length)} ≈ <b>${nf(+m.toFixed(2))}</b>. Médiane (la moitié des valeurs en dessous, la moitié au-dessus) = <b>${nf(me)}</b>. Ajoute une valeur extrême : la moyenne bouge beaucoup plus que la médiane.`;
  };
  const box = h('div', { class: 'wbtns' });
  [['Ajouter un 20', () => vals.push(20)], ['Ajouter un 1', () => vals.push(1)], ['Réinitialiser', () => { vals = base.slice(); }]].forEach(([l, f]) => box.append(h('button', { class: 'wbtn', onclick: () => { f(); draw(); } }, l)));
  el.append(box, cap); draw();
});
widget('boxplot', (el, o) => {
  const series = o.series || [['Classe A', [6, 8, 9, 10, 10, 11, 12, 12, 13, 14, 15, 17]], ['Classe B', [3, 5, 7, 9, 10, 11, 11, 12, 14, 16, 18, 19]]];
  const svg = svgRoot(600, 60 + 100 * series.length, el), g = sv('g', {}, svg);
  const X = drawAxis(g, { min: 0, max: 20, step: 1, labelEvery: 2, y: 30 + 100 * series.length });
  const lines = [];
  series.forEach(([lab, a], i) => {
    const q = quart(a), y = 40 + 100 * i, col = [C.blue, C.acc][i % 2];
    sv('text', { x: 30, y: y - 8, 'font-size': 15, 'font-weight': 700, fill: col, text: lab }, g);
    const cnt = {}; q.s.forEach(v => { cnt[v] = (cnt[v] || 0) + 1; sv('circle', { cx: X(v), cy: y + 4 - 7 * (cnt[v] - 1), r: 4, fill: col }, g); });
    const yb = y + 40;
    sv('line', { x1: X(q.min), y1: yb, x2: X(q.q1), y2: yb, stroke: col, 'stroke-width': 2.5 }, g);
    sv('line', { x1: X(q.q3), y1: yb, x2: X(q.max), y2: yb, stroke: col, 'stroke-width': 2.5 }, g);
    sv('rect', { x: X(q.q1), y: yb - 16, width: X(q.q3) - X(q.q1), height: 32, fill: col, 'fill-opacity': .18, stroke: col, 'stroke-width': 2.5 }, g);
    sv('line', { x1: X(q.me), y1: yb - 16, x2: X(q.me), y2: yb + 16, stroke: col, 'stroke-width': 4 }, g);
    [q.min, q.max].forEach(v => sv('line', { x1: X(v), y1: yb - 9, x2: X(v), y2: yb + 9, stroke: col, 'stroke-width': 2.5 }, g));
    lines.push(`<b style="color:${col}">${lab}</b> : min ${nf(q.min)}, Q₁ = ${nf(q.q1)}, médiane = ${nf(q.me)}, Q₃ = ${nf(q.q3)}, max ${nf(q.max)} ; écart interquartile Q₃ − Q₁ = ${nf(q.q3 - q.q1)}.`);
  });
  el.append(h('div', { class: 'cap', html: lines.join('<br>') + '<br>La boîte contient la moitié centrale des valeurs. Plus elle est large, plus les valeurs sont dispersées.' }));
});
widget('spread', (el, o) => {
  const series = o.series || [['Série A', [9, 9, 10, 10, 10, 10, 11, 11]], ['Série B', [4, 6, 8, 10, 10, 12, 14, 16]]];
  const svg = svgRoot(600, 70 + 90 * series.length, el), g = sv('g', {}, svg);
  const X = drawAxis(g, { min: 0, max: 20, step: 1, labelEvery: 2, y: 40 + 90 * series.length });
  const txt = [];
  series.forEach(([lab, a], i) => {
    const m = mean(a), s = sdev(a), y = 70 + 90 * i, col = [C.blue, C.acc][i % 2];
    sv('rect', { x: X(m - s), y: y - 46, width: X(m + s) - X(m - s), height: 56, fill: col, opacity: .12 }, g);
    sv('line', { x1: X(m), y1: y - 50, x2: X(m), y2: y + 12, stroke: col, 'stroke-width': 2.5, 'stroke-dasharray': '6 4' }, g);
    sv('text', { x: 30, y: y - 30, 'font-size': 15, 'font-weight': 700, fill: col, text: lab }, g);
    const cnt = {}; a.forEach(v => { cnt[v] = (cnt[v] || 0) + 1; sv('circle', { cx: X(v), cy: y - 12 * (cnt[v] - 1), r: 6, fill: col }, g); });
    txt.push(`<b style="color:${col}">${lab}</b> : moyenne ${nf(+m.toFixed(2))}, écart type σ ≈ ${nf(+s.toFixed(2))}`);
  });
  el.append(h('div', { class: 'cap', html: txt.join('<br>') + '<br>La bande colorée va de m − σ à m + σ. Même moyenne, mais un écart type plus grand : les valeurs sont plus <b>dispersées</b> autour de la moyenne.' }));
});

/* ---------- probabilités : arbre pondéré ---------- */
widget('tree', (el, o) => {
  let pa = o.pa ?? 0.4, pba = o.pba ?? 0.3, pbn = o.pbn ?? 0.6;
  const LA = o.A || 'A', LB = o.B || 'B';
  const svg = svgRoot(600, 400, el), g = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  const p = x => nf(+x.toFixed(4));
  const draw = () => {
    g.innerHTML = '';
    const nodes = { r: [30, 200], a: [210, 105], n: [210, 295], ab: [400, 50], abn: [400, 160], nb: [400, 240], nbn: [400, 350] };
    const br = (f, t, w, lab) => { const [x1, y1] = nodes[f], [x2, y2] = nodes[t]; sv('line', { x1: x1 + 14, y1, x2: x2 - 18, y2, stroke: C.ink2, 'stroke-width': 2 }, g); sv('text', { x: (x1 + x2) / 2, y: (y1 + y2) / 2 + (y2 < y1 ? -8 : 20), 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 700, fill: C.blue, text: p(w) }, g); sv('text', { x: x2, y: y2 + 7, 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 700, fill: C.ink, text: lab }, g); };
    br('r', 'a', pa, LA); br('r', 'n', 1 - pa, OV(LA));
    br('a', 'ab', pba, LB); br('a', 'abn', 1 - pba, OV(LB)); br('n', 'nb', pbn, LB); br('n', 'nbn', 1 - pbn, OV(LB));
    const leaf = (k, lab, v, hl) => { const [x, y] = nodes[k]; sv('text', { x: x + 26, y: y - 2, 'font-size': 14, fill: C.ink2, text: lab }, g); sv('text', { x: x + 26, y: y + 17, 'font-size': 16, 'font-weight': 700, fill: hl ? C.acc : C.ink, text: p(v) }, g); };
    leaf('ab', `${LA} ∩ ${LB} : ${p(pa)} × ${p(pba)}`, pa * pba, 1); leaf('abn', `${LA} ∩ ${OV(LB)}`, pa * (1 - pba));
    leaf('nb', `${OV(LA)} ∩ ${LB} : ${p(1 - pa)} × ${p(pbn)}`, (1 - pa) * pbn, 1); leaf('nbn', `${OV(LA)} ∩ ${OV(LB)}`, (1 - pa) * (1 - pbn));
    const pb = pa * pba + (1 - pa) * pbn;
    cap.innerHTML = `On <b>multiplie</b> les probabilités le long d’un chemin : P(${LA} ∩ ${LB}) = P(${LA}) × P<sub>${LA}</sub>(${LB}) = ${p(pa * pba)}. Sur les branches du 2e niveau, ce sont des probabilités <b>conditionnelles</b>.<br>On <b>additionne</b> les chemins qui mènent à ${LB} : P(${LB}) = ${p(pa * pba)} + ${p((1 - pa) * pbn)} = <b>${p(pb)}</b>.` +
      (pb > 0 ? `<br>Probabilité de ${LA} sachant ${LB} : P<sub>${LB}</sub>(${LA}) = ${F(`P(${LA} ∩ ${LB})`, `P(${LB})`)} = ${F(p(pa * pba), p(pb))} ≈ <b>${nf(+(pa * pba / pb).toFixed(3))}</b>. Ce n’est pas P<sub>${LA}</sub>(${LB}) = ${p(pba)} !` : '') +
      (o.N ? `<br>Sur ${nf(o.N)} personnes : ${nf(Math.round(o.N * pa * pba))} sont dans « ${LA} ∩ ${LB} » et ${nf(Math.round(o.N * (1 - pa) * pbn))} dans « ${OV(LA)} ∩ ${LB} ».` : '');
  };
  if (!o.fixed) {
    const st = o.step || 0.05;
    slider(ctrl, `P(${LA})`, st, 1 - st, st, pa, v => { pa = v; draw(); }, v => nf(+v.toFixed(2)));
    slider(ctrl, `P<sub>${LA}</sub>(${LB})`, 0, 1, st, pba, v => { pba = v; draw(); }, v => nf(+v.toFixed(2)));
    slider(ctrl, `P<sub>${OV(LA)}</sub>(${LB})`, 0, 1, st, pbn, v => { pbn = v; draw(); }, v => nf(+v.toFixed(2)));
  }
  el.append(ctrl, cap); draw();
});

/* ---------- deux dés : tableau des 36 issues ---------- */
widget('dice', (el, o) => {
  const evs = [['Somme = 7', (a, b) => a + b === 7], ['Un double', (a, b) => a === b], ['Somme ≥ 10', (a, b) => a + b >= 10], ['Au moins un 6', (a, b) => a === 6 || b === 6]];
  const box = h('div'), cap = h('div', { class: 'cap' });
  const show = i => {
    const [lab, f] = evs[i]; let k = 0, html = '<table class="simple"><tr><th>dé 1 \\ dé 2</th>' + [1, 2, 3, 4, 5, 6].map(x => `<th>${x}</th>`).join('') + '</tr>';
    for (let a = 1; a <= 6; a++) { html += `<tr><th>${a}</th>`; for (let b = 1; b <= 6; b++) { const on = f(a, b); if (on) k++; html += `<td style="${on ? 'background:var(--soft-acc);font-weight:700;color:var(--accent)' : ''}">${a + b}</td>`; } html += '</tr>'; }
    box.innerHTML = html + '</table>';
    const d = gcd(k, 36);
    cap.innerHTML = `Chaque case est une issue ; les 36 issues sont équiprobables (dés équilibrés). Événement « ${lab} » : ${k} issues favorables, donc P = ${F(k, 36)}${d > 1 ? ' = ' + F(k / d, 36 / d) : ''} ≈ ${nf(+(k / 36).toFixed(3))}. (Les cases indiquent la somme des deux dés.)`;
  };
  wbtns(el, evs.map(e => e[0]), show);
  el.append(box, cap); show(0);
});

/* ---------- loi des grands nombres ---------- */
widget('lln', (el, o) => {
  let n = 0, heads = 0, hist = [];
  const svg = svgRoot(600, 260, el), g = sv('g', {}, svg);
  const cap = h('div', { class: 'cap' });
  const draw = () => {
    g.innerHTML = '';
    const x0 = 60, x1 = 570, Y = f => 230 - f * 200, N = Math.max(n, 10);
    sv('line', { x1: x0, y1: 230, x2: x1, y2: 230, stroke: C.ink, 'stroke-width': 1.5 }, g); sv('line', { x1: x0, y1: 30, x2: x0, y2: 230, stroke: C.ink, 'stroke-width': 1.5 }, g);
    [0, 0.25, 0.5, 0.75, 1].forEach(f => { sv('line', { x1: x0, y1: Y(f), x2: x1, y2: Y(f), stroke: C.line }, g); sv('text', { x: x0 - 6, y: Y(f) + 5, 'text-anchor': 'end', 'font-size': 13, fill: C.ink2, text: nf(f) }, g); });
    sv('line', { x1: x0, y1: Y(.5), x2: x1, y2: Y(.5), stroke: C.ok, 'stroke-width': 2, 'stroke-dasharray': '6 4' }, g);
    sv('text', { x: x1, y: 250, 'text-anchor': 'end', 'font-size': 13, fill: C.ink2, text: 'nombre de lancers : ' + nf(n) }, g);
    if (hist.length > 1) { const step = Math.max(1, Math.floor(hist.length / 600)); let d = ''; hist.forEach(([k, f], i) => { if (i % step === 0 || i === hist.length - 1) d += (d ? 'L' : 'M') + (x0 + (x1 - x0) * k / N).toFixed(1) + ' ' + Y(f).toFixed(1); }); sv('path', { d, fill: 'none', stroke: C.acc, 'stroke-width': 2.5 }, g); }
    cap.innerHTML = n ? `${nf(n)} lancers, ${nf(heads)} « Pile » : fréquence ${nf(+(heads / n).toFixed(3))}. Au début, la fréquence varie beaucoup ; quand le nombre de lancers augmente, elle se rapproche de la probabilité 0,5 (<b>loi des grands nombres</b>).` : 'Lance la pièce (simulation) et regarde la fréquence de « Pile ».';
  };
  const flip = k => { for (let i = 0; i < k; i++) { n++; if (Math.random() < .5) heads++; hist.push([n, heads / n]); } draw(); };
  const box = h('div', { class: 'wbtns' });
  [['+10 lancers', 10], ['+100', 100], ['+1 000', 1000], ['+5 000', 5000]].forEach(([l, k]) => box.append(h('button', { class: 'wbtn', onclick: () => flip(k) }, l)));
  box.append(h('button', { class: 'wbtn', onclick: () => { n = 0; heads = 0; hist = []; draw(); } }, 'Recommencer'));
  el.append(box, cap); draw();
});

/* ---------- échantillonnage ---------- */
widget('sample', (el, o) => {
  let n = o.n || 100; const p = o.p ?? 0.5, N = 100;
  const svg = svgRoot(600, 280, el), g = sv('g', {}, svg);
  const cap = h('div', { class: 'cap' });
  const run = () => {
    g.innerHTML = '';
    const lo = p - 0.3, hi = p + 0.3, Y = f => 250 - (f - lo) / (hi - lo) * 230, e = 1 / Math.sqrt(n);
    sv('rect', { x: 50, y: Y(p + e), width: 530, height: Y(p - e) - Y(p + e), fill: C.ok, opacity: .15 }, g);
    sv('line', { x1: 50, y1: Y(p), x2: 580, y2: Y(p), stroke: C.ok, 'stroke-width': 2, 'stroke-dasharray': '6 4' }, g);
    [lo, p - e, p, p + e, hi].forEach(v => sv('text', { x: 44, y: Y(v) + 5, 'text-anchor': 'end', 'font-size': 12, fill: C.ink2, text: nf(+v.toFixed(3)) }, g));
    let ins = 0;
    for (let i = 0; i < N; i++) { let k = 0; for (let j = 0; j < n; j++) if (Math.random() < p) k++; const f = k / n, ok = Math.abs(f - p) <= e; if (ok) ins++; sv('circle', { cx: 56 + i * 5.2, cy: Math.max(10, Math.min(255, Y(f))), r: 3.5, fill: ok ? C.blue : C.ko }, g); }
    cap.innerHTML = `100 échantillons de taille n = ${nf(n)}, probabilité p = ${nf(p)}. Chaque point est la fréquence observée f dans un échantillon. La bande verte va de p − ${F(1, '√n')} à p + ${F(1, '√n')} (${F(1, '√n')} = ${nf(+e.toFixed(3))}). <b>${ins} échantillons sur 100</b> sont dans la bande. Plus n est grand, plus la bande est étroite : la fluctuation diminue.`;
  };
  wbtns(el, ['n = 25', 'n = 100', 'n = 400', 'n = 1 600'], i => { n = [25, 100, 400, 1600][i]; run(); }, [25, 100, 400, 1600].indexOf(n));
  el.append(h('div', { class: 'wbtns' }, h('button', { class: 'wbtn', onclick: run }, 'Nouveaux échantillons')), cap); run();
});

/* ---------- Python pas à pas ---------- */
widget('pytrace', (el, o) => {
  const tr = o.trace; let k = -1;
  const code = h('div', { class: 'code' }); o.code.forEach(l => code.append(h('div', { html: esc(l) || ' ' })));
  const vars = h('div'), out = h('div', { class: 'cap' });
  const nb = h('button', { class: 'wbtn', onclick: () => { k++; draw(); } }, 'Ligne suivante ▶'), rb = h('button', { class: 'wbtn', onclick: () => { k = -1; draw(); } }, 'Recommencer');
  const draw = () => {
    [...code.children].forEach((d, i) => d.classList.toggle('cur', k >= 0 && tr[k][0] === i));
    const st = k >= 0 ? tr[k][1] : {};
    vars.innerHTML = Object.keys(st).length ? `<table class="simple"><tr>${Object.keys(st).map(v => `<th>${esc(v)}</th>`).join('')}</tr><tr>${Object.values(st).map(v => `<td>${esc(v)}</td>`).join('')}</tr></table>` : '<div class="small muted">Variables : aucune pour l’instant. Touche « Ligne suivante ».</div>';
    const outs = tr.slice(0, k + 1).map(t => t[2]).filter(x => x != null);
    out.innerHTML = '<b>Affichage :</b> ' + (outs.length ? esc(outs.join('  ')) : '—') + (k >= 0 && tr[k][3] ? '<br>' + tr[k][3] : '');
    nb.disabled = k >= tr.length - 1;
  };
  el.append(code, h('div', { class: 'wbtns' }, nb, rb), vars, out); draw();
});
