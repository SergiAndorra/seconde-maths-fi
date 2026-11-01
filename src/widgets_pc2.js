'use strict';
/* ============ Visuels : physique-chimie (suite) ============ */

/* ---------- modèle de Lewis ---------- */
const MOLS = {
  'H₂O': { a: [['O', 300, 135, [-135, -45]], ['H', 230, 195, []], ['H', 370, 195, []]], b: [[0, 1, 1], [0, 2, 1]], t: 'Eau : il manque 2 électrons à O pour avoir la structure du néon : il forme <b>2 liaisons</b> et garde 2 doublets non liants. Chaque H forme <b>1 liaison</b> (structure de l’hélium).' },
  'CH₄': { a: [['C', 300, 150, []], ['H', 215, 150, []], ['H', 385, 150, []], ['H', 300, 65, []], ['H', 300, 235, []]], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]], t: 'Méthane : il manque 4 électrons à C : il forme <b>4 liaisons</b> et n’a aucun doublet non liant.' },
  'NH₃': { a: [['N', 300, 130, [-90]], ['H', 225, 190, []], ['H', 300, 225, []], ['H', 375, 190, []]], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1]], t: 'Ammoniac : il manque 3 électrons à N : il forme <b>3 liaisons</b> et garde 1 doublet non liant.' },
  'CO₂': { a: [['O', 205, 150, [125, 235]], ['C', 300, 150, []], ['O', 395, 150, [-55, 55]]], b: [[0, 1, 2], [1, 2, 2]], t: 'Dioxyde de carbone : deux <b>doubles liaisons</b>. C forme bien 4 liaisons au total ; chaque O en forme 2 et garde 2 doublets non liants.' },
  'HCl': { a: [['H', 245, 150, []], ['Cl', 335, 150, [-90, 0, 90]]], b: [[0, 1, 1]], t: 'Chlorure d’hydrogène : Cl (7 électrons de valence) forme <b>1 liaison</b> et garde 3 doublets non liants.' },
  'N₂': { a: [['N', 260, 150, [180]], ['N', 340, 150, [0]]], b: [[0, 1, 3]], t: 'Diazote : une <b>triple liaison</b> ; chaque N forme 3 liaisons et garde 1 doublet non liant.' }
};
widget('lewis', (el, o) => {
  const keys = o.keys || Object.keys(MOLS);
  const svg = svgRoot(600, 280, el), g = sv('g', {}, svg);
  const cap = h('div', { class: 'cap' });
  const draw = key => {
    g.innerHTML = '';
    const m = MOLS[key];
    m.b.forEach(([i, j, ord]) => {
      const [, x1, y1] = m.a[i], [, x2, y2] = m.a[j], L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L, nx = -uy, ny = ux;
      for (let t = 0; t < ord; t++) { const off = (t - (ord - 1) / 2) * 8; sv('line', { x1: x1 + ux * 20 + nx * off, y1: y1 + uy * 20 + ny * off, x2: x2 - ux * 20 + nx * off, y2: y2 - uy * 20 + ny * off, stroke: C.ink, 'stroke-width': 3.5, 'stroke-linecap': 'round' }, g); }
    });
    let nl = 0;
    m.a.forEach(([s, x, y, lp]) => {
      sv('text', { x, y: y + 11, 'text-anchor': 'middle', 'font-size': 32, 'font-weight': 700, fill: s === 'H' ? C.ink2 : s === 'O' ? C.ko : s === 'N' ? C.blue : s === 'Cl' ? C.ok : C.ink, text: s }, g);
      lp.forEach(a => { nl++; const r = (s.length > 1 ? 34 : 27), t = a * Math.PI / 180, cx = x + r * Math.cos(t), cy = y + r * Math.sin(t), px = -Math.sin(t) * 10, py = Math.cos(t) * 10; sv('line', { x1: cx - px, y1: cy - py, x2: cx + px, y2: cy + py, stroke: C.acc, 'stroke-width': 4, 'stroke-linecap': 'round' }, g); });
    });
    const nb = m.b.reduce((s, b) => s + b[2], 0);
    cap.innerHTML = m.t + `<br><b>${nb}</b> doublet${nb > 1 ? 's' : ''} liant${nb > 1 ? 's' : ''} (traits noirs entre les atomes) et <b>${nl}</b> doublet${nl > 1 ? 's' : ''} non liant${nl > 1 ? 's' : ''} (traits orange). Un doublet = 2 électrons.`;
  };
  wbtns(el, keys, i => draw(keys[i]));
  el.append(cap); draw(keys[0]);
});

/* ---------- la mole ---------- */
widget('mole', (el, o) => {
  const svg = svgRoot(600, 170, el), g = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  let n = 1.5;
  const draw = () => {
    g.innerHTML = '';
    for (let i = 0; i < Math.ceil(n); i++) {
      const frac = Math.min(1, n - i), x = 20 + i * 96;
      sv('rect', { x, y: 30, width: 84, height: 100, rx: 12, fill: 'none', stroke: C.pc, 'stroke-width': 2.5, 'stroke-dasharray': frac < 1 ? '6 4' : '0' }, g);
      sv('rect', { x: x + 3, y: 30 + 100 * (1 - frac) + 3, width: 78, height: 100 * frac - 6, rx: 9, fill: C.pc, opacity: .25 }, g);
      for (let k = 0; k < Math.round(20 * frac); k++) sv('circle', { cx: x + 12 + (k % 5) * 15, cy: 122 - Math.floor(k / 5) * 22, r: 5, fill: C.pc }, g);
      sv('text', { x: x + 42, y: 150, 'text-anchor': 'middle', 'font-size': 13, fill: C.ink2, text: frac < 1 ? '½ mol' : '1 mol' }, g);
    }
  };
  slider(ctrl, 'Quantité n', 0.5, 6, 0.5, n, v => { n = v; draw(); cap.innerHTML = `Une mole est un « paquet » de N<sub>A</sub> = 6,02 × 10²³ entités (comme une douzaine est un paquet de 12). n = ${nf(n)} mol → N = n × N<sub>A</sub> = ${nf(n)} × 6,02 × 10²³ = <b>${sci(n * 6.02e23)}</b> entités. Inversement : n = N ÷ N<sub>A</sub>.`; }, v => nf(v) + ' mol');
  el.append(ctrl, cap);
});

/* ---------- ajuster une équation ---------- */
const REACS = [
  { l: 'Combustion du méthane', r: [['CH₄', { C: 1, H: 4 }], ['O₂', { O: 2 }]], p: [['CO₂', { C: 1, O: 2 }], ['H₂O', { H: 2, O: 1 }]] },
  { l: 'Synthèse de l’eau', r: [['H₂', { H: 2 }], ['O₂', { O: 2 }]], p: [['H₂O', { H: 2, O: 1 }]] },
  { l: 'Combustion du propane', r: [['C₃H₈', { C: 3, H: 8 }], ['O₂', { O: 2 }]], p: [['CO₂', { C: 1, O: 2 }], ['H₂O', { H: 2, O: 1 }]] },
  { l: 'Fer + acide', r: [['Fe', { Fe: 1 }], ['H⁺', { H: 1, q: 1 }]], p: [['Fe²⁺', { Fe: 1, q: 2 }], ['H₂', { H: 2 }]] }];
widget('eqbal', (el, o) => {
  const list = o.list ? o.list.map(i => REACS[i]) : REACS;
  let ri0 = 0, co = [];
  const eq = h('div', { class: 'eqline' }), tab = h('div'), cap = h('div', { class: 'cap' });
  const draw = () => {
    const Rx = list[ri0], all = [...Rx.r, ...Rx.p];
    if (co.length !== all.length) co = all.map(() => 1);
    eq.innerHTML = '';
    all.forEach(([f], i) => {
      if (i > 0) eq.append(h('span', { class: 'eqop' }, i === Rx.r.length ? '→' : '+'));
      eq.append(h('span', { class: 'eqsp' }, h('button', { class: 'eqb', onclick: () => { co[i] = Math.max(1, co[i] - 1); draw(); } }, '−'), h('b', { class: 'eqc' }, String(co[i])), h('span', { html: f }), h('button', { class: 'eqb', onclick: () => { co[i] = Math.min(9, co[i] + 1); draw(); } }, '+')));
    });
    const cnt = (side, off) => { const t = {}; side.forEach(([, at], i) => { for (const e in at) t[e] = (t[e] || 0) + co[i + off] * at[e]; }); return t; };
    const L = cnt(Rx.r, 0), Rt = cnt(Rx.p, Rx.r.length), els = [...new Set([...Object.keys(L), ...Object.keys(Rt)])];
    let ok = true, rows = '';
    els.forEach(e => { const a = L[e] || 0, b = Rt[e] || 0; if (a !== b) ok = false; rows += `<tr><td>${e === 'q' ? 'charges (+)' : e}</td><td>${a}</td><td>${b}</td><td>${a === b ? '✅' : '❌'}</td></tr>`; });
    tab.innerHTML = `<table class="simple"><tr><th>Élément</th><th>Réactifs</th><th>Produits</th><th></th></tr>${rows}</table>`;
    cap.innerHTML = ok ? '<b style="color:var(--ok)">Équation ajustée !</b> Chaque élément (et la charge) est conservé : autant d’atomes de chaque sorte à gauche et à droite.' : 'Change les <b>nombres stœchiométriques</b> (en orange, devant les formules) jusqu’à avoir autant d’atomes de chaque élément des deux côtés. On ne modifie jamais les formules elles-mêmes.';
  };
  if (list.length > 1) wbtns(el, list.map(r => r.l), i => { ri0 = i; co = []; draw(); });
  el.append(eq, tab, cap); draw();
});

/* ---------- réactif limitant ---------- */
widget('limitant', (el, o) => {
  let a = 6, b = 2;
  const svg = svgRoot(600, 250, el), g = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  const H2 = (x, y) => { sv('circle', { cx: x - 6, cy: y, r: 7, fill: '#cfd6e3', stroke: C.ink2 }, g); sv('circle', { cx: x + 6, cy: y, r: 7, fill: '#cfd6e3', stroke: C.ink2 }, g); };
  const O2 = (x, y) => { sv('circle', { cx: x - 8, cy: y, r: 9, fill: '#e04848' }, g); sv('circle', { cx: x + 8, cy: y, r: 9, fill: '#e04848' }, g); };
  const H2O = (x, y) => { sv('circle', { cx: x, cy: y, r: 10, fill: '#e04848' }, g); sv('circle', { cx: x - 11, cy: y + 7, r: 6, fill: '#cfd6e3', stroke: C.ink2 }, g); sv('circle', { cx: x + 11, cy: y + 7, r: 6, fill: '#cfd6e3', stroke: C.ink2 }, g); };
  const draw = () => {
    g.innerHTML = '';
    const x = Math.min(a / 2, b), A = a - 2 * x, B = b - x, P = 2 * x;
    [['Avant', 15], ['Après', 315]].forEach(([l, x0]) => { sv('rect', { x: x0, y: 10, width: 270, height: 200, rx: 12, fill: C.card, stroke: C.line, 'stroke-width': 2 }, g); sv('text', { x: x0 + 135, y: 235, 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 700, fill: C.ink, text: l }, g); });
    const place = (x0, items) => { items.forEach((f, k) => f(x0 + 40 + (k % 5) * 48, 40 + Math.floor(k / 5) * 38)); };
    place(15, [...Array(a).fill(H2), ...Array(b).fill(O2)]);
    place(315, [...Array(A).fill(H2), ...Array(B).fill(O2), ...Array(P).fill(H2O)]);
    const lim = A === 0 && B === 0 ? null : A === 0 ? 'H₂' : 'O₂';
    cap.innerHTML = `2 H₂ + O₂ → 2 H₂O : il faut <b>2 molécules de H₂ pour 1 de O₂</b>. Avec ${a} H₂ et ${b} O₂, la réaction se fait ${x} fois : il reste ${A} H₂ et ${B} O₂, et il se forme ${P} H₂O. ` +
      (x === 0 ? 'Il manque un des réactifs : rien ne se passe.' : lim ? `Le réactif entièrement consommé est <b>${lim}</b> : c’est le <b>réactif limitant</b>. L’autre est en excès.` : 'Les deux réactifs sont entièrement consommés : le mélange est <b>stœchiométrique</b>.');
  };
  slider(ctrl, 'Molécules de H₂', 0, 10, 2, a, v => { a = v; draw(); });
  slider(ctrl, 'Molécules de O₂', 0, 5, 1, b, v => { b = v; draw(); });
  el.append(ctrl, cap);
});

/* ---------- référentiel : le train ---------- */
widget('train', (el, o) => {
  let frame = 0, t = 0;
  const svg = svgRoot(600, 210, el), g = sv('g', {}, svg);
  const cap = h('div', { class: 'cap' });
  const caps = ['Référentiel du <b>quai</b> : le train et le passager avancent. Le passager est <b>en mouvement</b>.', 'Référentiel du <b>train</b> : le passager reste à sa place, il est <b>immobile</b>. Ce sont le quai et les arbres qui défilent en arrière.'];
  const draw = () => {
    g.innerHTML = '';
    sv('rect', { x: 0, y: 170, width: 600, height: 40, fill: C.line }, g);
    const sp = 1.6;
    for (let k = 0; k < 6; k++) { let x = 50 + k * 140; if (frame === 1) x = ((x - t * sp) % 840 + 840) % 840 - 70; sv('rect', { x: x - 3, y: 120, width: 6, height: 50, fill: '#8a6a4a' }, g); sv('circle', { cx: x, cy: 112, r: 20, fill: C.ok, opacity: .8 }, g); }
    const tx = frame === 0 ? ((t * sp) % 900) - 300 : 150;
    sv('rect', { x: tx, y: 95, width: 300, height: 70, rx: 12, fill: C.blue }, g);
    for (let w = 0; w < 4; w++) sv('rect', { x: tx + 20 + w * 70, y: 108, width: 50, height: 28, rx: 5, fill: '#dfe9ff' }, g);
    sv('circle', { cx: tx + 115, cy: 120, r: 8, fill: C.acc }, g); sv('rect', { x: tx + 109, y: 128, width: 12, height: 8, fill: C.acc }, g);
    sv('text', { x: 300, y: 30, 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 700, fill: C.ink, text: frame === 0 ? 'Vu depuis le quai' : 'Vu depuis le train' }, g);
  };
  onFrame(() => { t++; draw(); });
  wbtns(el, ['Référentiel du quai', 'Référentiel du train'], i => { frame = i; cap.innerHTML = caps[i] + ' Le passager (en orange) est le système étudié.'; });
  el.append(cap); cap.innerHTML = caps[0] + ' Le passager (en orange) est le système étudié.';
});

/* ---------- chronophotographies ---------- */
function chronoPts(mode) {
  const P = [];
  if (mode === 'uni') for (let i = 0; i <= 10; i++) P.push([60 + 48 * i, 190]);
  if (mode === 'acc') for (let i = 0; i <= 10; i++) P.push([60 + 4.4 * i * i, 190]);
  if (mode === 'dec') for (let i = 0; i <= 10; i++) P.push([60 + 88 * i - 4.4 * i * i, 190]);
  if (mode === 'circ') for (let i = 0; i <= 11; i++) { const a = -Math.PI / 2 + 0.52 * i; P.push([300 + 140 * Math.cos(a), 190 + 140 * Math.sin(a)]); }
  if (mode === 'chute') for (let i = 0; i <= 10; i++) P.push([300, 30 + 3.3 * i * i]);
  if (mode === 'up') for (let i = 0; i <= 10; i++) P.push([170 + 26 * i, 345 - 2 * (60 * i - 6 * i * i)]);
  return P;
}
const CHRONO_CAP = {
  uni: 'Points alignés et régulièrement espacés : mouvement <b>rectiligne uniforme</b> (la vitesse ne change pas).',
  acc: 'Points alignés, de plus en plus espacés : mouvement <b>rectiligne accéléré</b>.',
  dec: 'Points alignés, de moins en moins espacés : mouvement <b>rectiligne ralenti</b>.',
  circ: 'Points sur un cercle, régulièrement espacés : mouvement <b>circulaire uniforme</b>. La valeur de la vitesse est constante, mais sa direction change.',
  chute: 'Balle lâchée : les points sont de plus en plus espacés vers le bas, mouvement <b>rectiligne accéléré</b>.'
};
function drawChrono(g, pts, shown, vec, extra) {
  pts.slice(0, shown).forEach(([x, y], i) => {
    if (vec && i < pts.length - 1 && i < shown - 1) { const [x2, y2] = pts[i + 1]; arrowSvg(g, x, y, x + (x2 - x) * .95, y + (y2 - y) * .95, C.ok, 3); }
    if (extra) extra(x, y, i);
    sv('circle', { cx: x, cy: y, r: 6, fill: C.acc }, g);
    sv('text', { x: x, y: y + 24, 'text-anchor': 'middle', 'font-size': 12, fill: C.ink2, text: 'M' + subD(i) }, g);
  });
}
widget('chrono', (el, o) => {
  let mode = o.mode || 'uni', vec = !!o.vec, shown = o.fixed ? 99 : 0, last = 0;
  const svg = svgRoot(600, 380, el), g = sv('g', {}, svg);
  const cap = h('div', { class: 'cap' });
  const draw = () => { g.innerHTML = ''; const pts = chronoPts(mode); drawChrono(g, pts, Math.min(shown, pts.length), vec); if (!o.nocap) cap.innerHTML = CHRONO_CAP[mode] + ' Entre deux positions successives, il s’écoule toujours la même durée Δt.' + (vec ? ' <span style="color:var(--ok)">Flèches vertes</span> : vecteurs vitesse (≈ déplacement entre deux positions ÷ Δt).' : ''); };
  if (!o.fixed) {
    onFrame(ts => { if (!last) last = ts; if (ts - last > 260 && shown < chronoPts(mode).length) { shown++; last = ts; draw(); } });
    const modes = o.modes || ['uni', 'acc', 'dec', 'circ', 'chute'], labs = { uni: 'Uniforme', acc: 'Accéléré', dec: 'Ralenti', circ: 'Circulaire', chute: 'Chute' };
    wbtns(el, modes.map(m => labs[m]), i => { mode = modes[i]; shown = 0; draw(); }, modes.indexOf(mode));
    el.append(h('div', { class: 'wbtns' }, h('button', { class: 'wbtn', onclick: () => { vec = !vec; draw(); } }, 'Vecteurs vitesse'), h('button', { class: 'wbtn', onclick: () => { shown = 0; draw(); } }, 'Rejouer')));
  }
  el.append(cap); draw();
});

/* ---------- forces ---------- */
widget('forces', (el, o) => {
  const svg = svgRoot(600, 300, el), g = sv('g', {}, svg);
  const cap = h('div', { class: 'cap' });
  const lab = (x, y, t, col) => sv('text', { x, y, 'font-size': 15, 'font-weight': 700, fill: col, text: t }, g);
  const sc = [
    ['Livre posé sur une table', () => {
      sv('rect', { x: 120, y: 190, width: 360, height: 16, fill: '#a07850' }, g); sv('rect', { x: 140, y: 206, width: 14, height: 80, fill: '#a07850' }, g); sv('rect', { x: 446, y: 206, width: 14, height: 80, fill: '#a07850' }, g);
      sv('rect', { x: 250, y: 150, width: 100, height: 40, rx: 4, fill: C.blue }, g);
      arrowSvg(g, 300, 170, 300, 260, C.ko, 4); lab(310, 255, 'P : poids (action de la Terre, à distance)', C.ko);
      arrowSvg(g, 300, 190, 300, 100, C.ok, 4); lab(310, 110, 'R : action de la table (contact)', C.ok);
      return 'Deux forces modélisent les actions sur le livre : son <b>poids</b> P (vertical, vers le bas, appliqué au centre du livre) et l’<b>action de la table</b> R (verticale, vers le haut, au contact). Elles ont la même valeur : elles <b>se compensent</b>, le livre reste immobile.';
    }],
    ['Lampe suspendue', () => {
      sv('rect', { x: 150, y: 20, width: 300, height: 12, fill: C.ink2 }, g); sv('line', { x1: 300, y1: 32, x2: 300, y2: 140, stroke: C.ink, 'stroke-width': 2 }, g);
      sv('circle', { cx: 300, cy: 165, r: 26, fill: C.warn }, g);
      arrowSvg(g, 300, 141, 300, 60, C.ok, 4); lab(312, 80, 'T : action du fil (contact)', C.ok);
      arrowSvg(g, 300, 165, 300, 246, C.ko, 4); lab(312, 240, 'P : poids (à distance)', C.ko);
      return 'Le <b>fil</b> tire la lampe vers le haut (force de contact T, le long du fil) ; la <b>Terre</b> l’attire vers le bas (poids P, action à distance). La lampe est immobile : les deux forces se compensent.';
    }],
    ['Terre et Lune', () => {
      sv('circle', { cx: 130, cy: 150, r: 70, fill: C.blue }, g); sv('circle', { cx: 480, cy: 150, r: 20, fill: C.ink2 }, g);
      lab(100, 245, 'Terre', C.blue); lab(462, 195, 'Lune', C.ink2);
      arrowSvg(g, 480, 150, 380, 150, C.acc, 4); lab(340, 130, 'F(Terre sur Lune)', C.acc);
      arrowSvg(g, 130, 150, 230, 150, C.acc, 4); lab(150, 130, 'F(Lune sur Terre)', C.acc);
      return '<b>Principe des actions réciproques</b> : la Terre attire la Lune et la Lune attire la Terre avec des forces de <b>même valeur</b>, de même direction et de <b>sens opposés</b>. Même si la Lune est beaucoup moins massive !';
    }]];
  const show = i => { g.innerHTML = ''; cap.innerHTML = sc[i][1]() + ' Une force se représente par une flèche : point d’application, direction, sens et valeur (en newtons, N).'; };
  wbtns(el, sc.map(s => s[0]), show);
  el.append(cap); show(0);
});

/* ---------- poids sur différents astres ---------- */
widget('grav', (el, o) => {
  const astres = [['Terre', 9.8, '#2e6fe4'], ['Lune', 1.6, '#9aa3b3'], ['Mars', 3.7, '#d0643c'], ['Jupiter', 24.8, '#d9a066']];
  let ai = 0, m = 60;
  const svg = svgRoot(600, 300, el), g = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  const draw = () => {
    g.innerHTML = '';
    const [name, gg, col] = astres[ai], P = m * gg;
    sv('path', { d: 'M0 300 Q300 190 600 300 Z', fill: col, opacity: .85 }, g);
    sv('rect', { x: 270, y: 180, width: 60, height: 45, rx: 6, fill: C.ink2 }, g);
    sv('text', { x: 300, y: 208, 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 700, fill: '#fff', text: m + ' kg' }, g);
    const L = Math.min(170, P / 12);
    arrowSvg(g, 300, 202, 300, 202 + L, C.ko, 5);
    sv('text', { x: 320, y: 40, 'font-size': 17, 'font-weight': 700, fill: C.ink, text: `Sur ${name} : g = ${nf(gg)} N/kg` }, g);
    sv('text', { x: 320, y: 66, 'font-size': 17, fill: C.ko, 'font-weight': 700, text: `Poids P = ${nf(+P.toFixed(1))} N` }, g);
    cap.innerHTML = `P = m × g = ${m} × ${nf(gg)} = <b>${nf(+P.toFixed(1))} N</b>. La <b>masse</b> (${m} kg, quantité de matière) est la même partout ; le <b>poids</b> (force, en newtons) dépend de l’astre.`;
  };
  wbtns(el, astres.map(a => a[0]), i => { ai = i; draw(); });
  slider(ctrl, 'Masse', 1, 100, 1, m, v => { m = v; draw(); }, v => v + ' kg');
  el.append(ctrl, cap);
});

/* ---------- principe d'inertie ---------- */
widget('inertia', (el, o) => {
  const sc = [
    ['Palet sur la glace', 'uni', (g, x, y) => { arrowSvg(g, x, y, x, y + 45, C.ko, 3); arrowSvg(g, x, y, x, y - 45, C.blue, 3); }, 'Le poids (rouge) et l’action de la glace (bleu) <b>se compensent</b> (frottements négligés) : le palet garde un mouvement <b>rectiligne uniforme</b>. Pas besoin de force « vers l’avant » pour continuer à avancer !'],
    ['Balle lâchée', 'chute', (g, x, y) => arrowSvg(g, x, y, x + 0.01, y + 32, C.ko, 3), 'Chute libre : la balle n’est soumise qu’à son <b>poids</b> (rouge), qui n’est pas compensé. Le vecteur vitesse (vert) <b>varie</b> : il grandit vers le bas, dans le sens du poids.'],
    ['Balle lancée vers le haut', 'up', (g, x, y) => arrowSvg(g, x, y, x + 0.01, y + 32, C.ko, 3), 'Une fois lâchée, la balle n’est soumise qu’à son <b>poids</b>, vers le bas, même pendant la montée (il n’y a pas de « force d’élan »). La vitesse diminue en montant, puis augmente en descendant.'],
    ['Voiture dans un virage', 'circ', (g, x, y) => { const dx = 300 - x, dy = 190 - y, L = Math.hypot(dx, dy); arrowSvg(g, x, y, x + dx / L * 40, y + dy / L * 40, C.blue, 3); }, 'Même à vitesse constante, la <b>direction</b> du vecteur vitesse change : les forces <b>ne se compensent pas</b>. Leur somme (bleu) est dirigée vers l’intérieur du virage.']];
  let si = 0, shown = 0, last = 0;
  const svg = svgRoot(600, 380, el), g = sv('g', {}, svg);
  const cap = h('div', { class: 'cap' });
  const draw = () => { g.innerHTML = ''; const [, mode, f, txt] = sc[si], pts = chronoPts(mode); drawChrono(g, pts, Math.min(shown, pts.length), true, (x, y, i) => { if (i % 2 === 0) f(g, x, y); }); cap.innerHTML = txt + ' <span style="color:var(--ok)">Vert</span> : vitesse. Forces dessinées une position sur deux.'; };
  onFrame(ts => { if (!last) last = ts; if (ts - last > 300 && shown < chronoPts(sc[si][1]).length) { shown++; last = ts; draw(); } });
  wbtns(el, sc.map(s => s[0]), i => { si = i; shown = 0; draw(); });
  el.append(cap); draw();
});

/* ---------- propagation du son ---------- */
widget('wave', (el, o) => {
  let air = true;
  const svg = svgRoot(600, 220, el), g = sv('g', {}, svg);
  const cap = h('div', { class: 'cap' });
  sv('rect', { x: 20, y: 70, width: 40, height: 80, rx: 6, fill: C.ink2 }, g);
  const memb = sv('path', { d: '', fill: C.ink }, g);
  const parts = [];
  for (let c = 0; c < 22; c++) for (let r = 0; r < 7; r++) parts.push([120 + c * 21, 40 + r * 24, sv('circle', { r: 4.5, fill: C.blue }, g)]);
  const vac = sv('text', { x: 340, y: 115, 'text-anchor': 'middle', 'font-size': 18, fill: C.ink2, text: '' }, g);
  onFrame(ts => {
    const t = ts / 1000, w = 2 * Math.PI * 1.1, mx = 72 + 7 * Math.sin(w * t);
    memb.setAttribute('d', `M60 80 L${mx} 50 L${mx} 170 L60 140 Z`);
    parts.forEach(([x0, y0, c]) => { c.setAttribute('cx', air ? x0 + 7 * Math.sin(w * t - (x0 - 120) * 0.05) : -50); c.setAttribute('cy', y0); });
    vac.textContent = air ? '' : 'Vide : aucune particule à faire vibrer';
  });
  const caps = ['Le haut-parleur <b>vibre</b> et pousse les particules d’air voisines, qui poussent les suivantes : des zones serrées (compressions) se propagent. Chaque particule oscille sur place ; c’est la <b>perturbation</b> qui avance, à environ <b>340 m/s</b> dans l’air.', 'Dans le <b>vide</b>, il n’y a pas de matière : le son <b>ne peut pas se propager</b>. (La lumière, elle, traverse le vide.)'];
  wbtns(el, ['Dans l’air', 'Dans le vide'], i => { air = i === 0; cap.innerHTML = caps[i]; });
  el.append(cap); cap.innerHTML = caps[0];
});

/* ---------- signal sonore ---------- */
widget('signal', (el, o) => {
  let f = o.f ?? 500, A = o.A ?? 0.8, tim = 0;
  const svg = svgRoot(600, 260, el), g = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  const shapes = [p => Math.sin(p), p => (Math.sin(p) + .45 * Math.sin(2 * p)) / 1.3, p => (Math.sin(p) + .6 * Math.sin(2 * p + .5) + .4 * Math.sin(3 * p) + .25 * Math.sin(5 * p)) / 1.75];
  const draw = () => {
    g.innerHTML = '';
    const x0 = 50, x1 = 570, X = t => x0 + (x1 - x0) * t / 10, Y = v => 140 - v * 100;
    for (let k = 0; k <= 10; k++) { sv('line', { x1: X(k), y1: 40, x2: X(k), y2: 240, stroke: C.line }, g); sv('text', { x: X(k), y: 256, 'text-anchor': 'middle', 'font-size': 12, fill: C.ink2, text: k }, g); }
    sv('line', { x1: x0, y1: 140, x2: x1, y2: 140, stroke: C.ink2, 'stroke-width': 1.5 }, g);
    sv('text', { x: x1, y: 32, 'text-anchor': 'end', 'font-size': 12, fill: C.ink2, text: 'temps (ms)' }, g);
    let d = ''; for (let i = 0; i <= 800; i++) { const t = 10 * i / 800; d += (i ? 'L' : 'M') + X(t).toFixed(1) + ' ' + Y(A * shapes[tim](2 * Math.PI * f * t / 1000)).toFixed(1); }
    sv('path', { d, fill: 'none', stroke: C.pc, 'stroke-width': 3 }, g);
    const T = 1000 / f;
    if (!o.fixed && T <= 10) { sv('line', { x1: X(0), y1: 30, x2: X(T), y2: 30, stroke: C.acc, 'stroke-width': 3 }, g); [0, T].forEach(t => sv('line', { x1: X(t), y1: 22, x2: X(t), y2: 38, stroke: C.acc, 'stroke-width': 3 }, g)); sv('text', { x: X(T) + 8, y: 26, 'font-size': 15, 'font-weight': 700, fill: C.acc, text: 'T = ' + nf(+T.toFixed(3)) + ' ms' }, g); }
    if (!o.fixed) cap.innerHTML = `Le motif se répète toutes les T = ${nf(+T.toFixed(3))} ms = ${nf(+(T / 1000).toFixed(6))} s (la <b>période</b>). Fréquence : f = 1 / T = ${f} Hz (nombre de motifs par seconde). <b>Fréquence</b> ↔ hauteur (grave/aigu) ; <b>amplitude</b> ↔ intensité (fort/faible) ; <b>forme</b> ↔ timbre (instrument).`;
  };
  if (!o.fixed) {
    wbtns(el, ['Son pur', 'Flûte', 'Guitare'], i => { tim = i; draw(); });
    slider(ctrl, 'Fréquence', 100, 1500, 50, f, v => { f = v; draw(); }, v => v + ' Hz');
    slider(ctrl, 'Amplitude', 0.2, 1, 0.1, A, v => { A = v; draw(); }, v => nf(v));
  }
  el.append(ctrl, cap); draw();
});

/* ---------- spectres ---------- */
function lam2rgb(l) {
  let r = 0, g = 0, b = 0;
  if (l < 440) { r = -(l - 440) / 60; b = 1; } else if (l < 490) { g = (l - 440) / 50; b = 1; } else if (l < 510) { g = 1; b = -(l - 510) / 20; } else if (l < 580) { r = (l - 510) / 70; g = 1; } else if (l < 645) { r = 1; g = -(l - 645) / 65; } else r = 1;
  let f = l < 420 ? .35 + .65 * (l - 380) / 40 : l > 700 ? .35 + .65 * (780 - l) / 80 : 1; f = Math.max(0, f);
  return [r * f, g * f, b * f];
}
widget('spectrum', (el, o) => {
  const lines = { H: [410, 434, 486, 656], Na: [589], Hg: [405, 436, 546, 577, 579] };
  let mode = 0, T = 3000;
  const svg = svgRoot(600, 150, el), g = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  const X = l => 40 + (l - 400) * 520 / 400;
  const planck = (l, T) => 1 / (Math.pow(l, 5) * (Math.exp(0.014388 / (l * 1e-9 * T)) - 1));
  const draw = () => {
    g.innerHTML = '';
    sv('rect', { x: 40, y: 20, width: 520, height: 80, fill: '#000' }, g);
    if (mode <= 1) for (let l = 400; l < 800; l += 2) { let k = 1; if (mode === 1) k = Math.min(1, Math.pow(planck(l, T) / planck(700, T) * 0.5, 0.6)); const [r, gg, b] = lam2rgb(l); sv('rect', { x: X(l), y: 20, width: 2.7, height: 80, fill: `rgb(${Math.round(255 * r * k)},${Math.round(255 * gg * k)},${Math.round(255 * b * k)})` }, g); }
    else { const L = lines[['H', 'Na', 'Hg'][mode - 2]]; L.forEach(l => { const [r, gg, b] = lam2rgb(l); sv('rect', { x: X(l) - 2, y: 20, width: 4, height: 80, fill: `rgb(${Math.round(255 * r)},${Math.round(255 * gg)},${Math.round(255 * b)})` }, g); }); }
    for (let l = 400; l <= 800; l += 50) { sv('line', { x1: X(l), y1: 100, x2: X(l), y2: 108, stroke: C.ink2 }, g); sv('text', { x: X(l), y: 124, 'text-anchor': 'middle', 'font-size': 13, fill: C.ink2, text: l }, g); }
    sv('text', { x: 560, y: 144, 'text-anchor': 'end', 'font-size': 13, fill: C.ink2, text: 'longueur d’onde λ (nm)' }, g);
    cap.innerHTML = [
      'Lumière blanche : un <b>spectre continu</b> du violet (≈ 400 nm) au rouge (≈ 800 nm). Elle contient toutes les couleurs (lumière polychromatique).',
      `Corps chauffé à ${nf(T)} K : spectre continu d’origine thermique. Plus le corps est chaud, plus son spectre s’enrichit vers le <b>violet</b> (il passe du rouge au blanc).`,
      'Hydrogène : un <b>spectre de raies</b>. Les longueurs d’onde des raies sont la « signature » de l’élément.',
      'Sodium : une raie jaune-orangée vers 589 nm (en réalité deux raies très proches). C’est la couleur des anciens lampadaires.',
      'Mercure : des raies violettes, bleue, verte et jaunes, caractéristiques du mercure.'][mode];
  };
  wbtns(el, ['Lumière blanche', 'Corps chauffé', 'Hydrogène', 'Sodium', 'Mercure'], i => { mode = i; ctrl.style.display = i === 1 ? '' : 'none'; draw(); });
  slider(ctrl, 'Température', 1500, 8000, 100, T, v => { T = v; draw(); }, v => nf(v) + ' K');
  ctrl.style.display = 'none';
  el.append(ctrl, cap); draw();
});

/* ---------- réflexion et réfraction ---------- */
widget('refraction', (el, o) => {
  const media = [['air → eau', 1.00, 1.33, 'air', 'eau'], ['air → verre', 1.00, 1.50, 'air', 'verre'], ['eau → air', 1.33, 1.00, 'eau', 'air'], ['verre → air', 1.50, 1.00, 'verre', 'air']];
  let mi = 0, i1 = 40;
  const svg = svgRoot(600, 400, el), g = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  const draw = () => {
    g.innerHTML = '';
    const [, n1, n2, m1, m2] = media[mi], I = [300, 200], L = 190, r = i1 * Math.PI / 180;
    const fill = n => n === 1 ? 'var(--bg)' : n < 1.4 ? 'rgba(46,111,228,.18)' : 'rgba(120,170,190,.30)';
    sv('rect', { x: 0, y: 0, width: 600, height: 200, fill: fill(n1) }, g); sv('rect', { x: 0, y: 200, width: 600, height: 200, fill: fill(n2) }, g);
    sv('line', { x1: 0, y1: 200, x2: 600, y2: 200, stroke: C.ink2, 'stroke-width': 2 }, g);
    sv('line', { x1: 300, y1: 10, x2: 300, y2: 390, stroke: C.ink2, 'stroke-width': 1.5, 'stroke-dasharray': '6 5' }, g);
    sv('text', { x: 308, y: 24, 'font-size': 13, fill: C.ink2, text: 'normale' }, g);
    sv('text', { x: 20, y: 30, 'font-size': 15, 'font-weight': 700, fill: C.ink, text: `${m1} (n₁ = ${nf(n1)})` }, g); sv('text', { x: 20, y: 385, 'font-size': 15, 'font-weight': 700, fill: C.ink, text: `${m2} (n₂ = ${nf(n2)})` }, g);
    const A = [I[0] - L * Math.sin(r), I[1] - L * Math.cos(r)];
    arrowSvg(g, A[0], A[1], I[0] - (I[0] - A[0]) * .02, I[1] - (I[1] - A[1]) * .02, C.acc, 3.5);
    const s2 = n1 * Math.sin(r) / n2;
    arrowSvg(g, I[0], I[1], I[0] + L * Math.sin(r), I[1] - L * Math.cos(r), C.acc, s2 > 1 ? 3.5 : 1.8);
    sv('text', { x: I[0] - 60 * Math.sin(r / 2) - 6, y: I[1] - 60 * Math.cos(r / 2), 'text-anchor': 'end', 'font-size': 15, 'font-weight': 700, fill: C.acc, text: 'i₁ = ' + i1 + '°' }, g);
    let txt;
    if (s2 <= 1) {
      const r2 = Math.asin(s2);
      arrowSvg(g, I[0], I[1], I[0] + L * Math.sin(r2), I[1] + L * Math.cos(r2), C.blue, 3.5);
      sv('text', { x: I[0] + 70 * Math.sin(r2 / 2) + 8, y: I[1] + 70 * Math.cos(r2 / 2) + 10, 'font-size': 15, 'font-weight': 700, fill: C.blue, text: 'i₂ ≈ ' + nf(+(r2 * 180 / Math.PI).toFixed(1)) + '°' }, g);
      txt = `n₁ × sin i₁ = n₂ × sin i₂ : ${nf(n1)} × sin ${i1}° = ${nf(n2)} × sin i₂, donc sin i₂ = ${nf(+s2.toFixed(3))} et <b>i₂ ≈ ${nf(+(r2 * 180 / Math.PI).toFixed(1))}°</b>. ` + (n2 > n1 ? 'Le milieu 2 est plus réfringent : le rayon se <b>rapproche de la normale</b>.' : n2 < n1 ? 'Le milieu 2 est moins réfringent : le rayon s’<b>éloigne de la normale</b>.' : '');
    } else txt = `sin i₂ vaudrait ${nf(+s2.toFixed(2))} &gt; 1 : impossible. Il n’y a pas de rayon réfracté, toute la lumière est réfléchie (<b>réflexion totale</b>).`;
    cap.innerHTML = 'Les angles se mesurent par rapport à la <b>normale</b> (pointillés). Réflexion : angle de réflexion = angle d’incidence. ' + txt;
  };
  wbtns(el, media.map(m => m[0]), i => { mi = i; draw(); });
  slider(ctrl, 'Angle d’incidence i₁', 0, 85, 1, i1, v => { i1 = v; draw(); }, v => v + '°');
  el.append(ctrl, cap);
});

/* ---------- lentille convergente ---------- */
widget('lens', (el, o) => {
  let f = o.f ?? 4, d = o.d ?? 7;
  const svg = svgRoot(600, 320, el), g = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  const u = 16, O = 260, Y0 = 160, AB = 2;
  const draw = () => {
    g.innerHTML = '';
    const dd = Math.max(d, 1.6 * f), OAp = f * dd / (dd - f), gam = -f / (dd - f), xA = O - dd * u, xAp = O + OAp * u, yB = Y0 - AB * u, yBp = Y0 - gam * AB * u;
    sv('line', { x1: 0, y1: Y0, x2: 600, y2: Y0, stroke: C.ink2, 'stroke-width': 1.5 }, g);
    arrowSvg(g, O, Y0 + 110, O, Y0 - 110, C.blue, 3); arrowSvg(g, O, Y0 - 110, O, Y0 + 110, C.blue, 3);
    [[O - f * u, 'F'], [O + f * u, 'F’']].forEach(([x, l]) => { sv('circle', { cx: x, cy: Y0, r: 4, fill: C.ink }, g); sv('text', { x, y: Y0 + 22, 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 700, fill: C.ink, text: l }, g); });
    sv('text', { x: O + 6, y: Y0 + 22, 'font-size': 15, 'font-weight': 700, fill: C.ink, text: 'O' }, g);
    const ray = pts => sv('polyline', { points: pts.map(p => p.join(',')).join(' '), fill: 'none', stroke: C.warn, 'stroke-width': 2 }, g);
    const ext = (p, q, k) => [q[0] + (q[0] - p[0]) * k, q[1] + (q[1] - p[1]) * k];
    ray([[xA, yB], [O, yB], [xAp, yBp], ext([O, yB], [xAp, yBp], 0.15)]);
    ray([[xA, yB], [xAp, yBp], ext([xA, yB], [xAp, yBp], 0.08)]);
    ray([[xA, yB], [O, yBp], [Math.min(600, xAp + 40), yBp]]);
    arrowSvg(g, xA, Y0, xA, yB, C.ok, 4); sv('text', { x: xA - 8, y: yB - 6, 'text-anchor': 'end', 'font-size': 15, 'font-weight': 700, fill: C.ok, text: 'B' }, g); sv('text', { x: xA, y: Y0 + 22, 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 700, fill: C.ok, text: 'A' }, g);
    arrowSvg(g, xAp, Y0, xAp, yBp, C.acc, 4); sv('text', { x: xAp + 8, y: yBp + 14, 'font-size': 15, 'font-weight': 700, fill: C.acc, text: 'B’' }, g); sv('text', { x: xAp, y: Y0 - 10, 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 700, fill: C.acc, text: 'A’' }, g);
    cap.innerHTML = `Distance focale f’ = OF’ = ${nf(f)} cm ; objet à ${nf(dd)} cm de la lentille. Trois rayons : parallèle à l’axe → ressort par F’ ; par O → pas dévié ; par F → ressort parallèle à l’axe. Ils se croisent en B’ : l’image est <b>réelle</b> et <b>renversée</b>, à ${nf(+OAp.toFixed(1))} cm derrière la lentille.<br>Grandissement γ = ${F('A’B’', 'AB')} = ${F('OA’', 'OA')} ≈ <b>${nf(+gam.toFixed(2))}</b> (négatif : image renversée ; |γ| ${Math.abs(gam) > 1 ? '&gt; 1 : image agrandie' : '&lt; 1 : image réduite'}).`;
  };
  slider(ctrl, 'Distance focale', 3, 7, 0.5, f, v => { f = v; draw(); }, v => nf(v) + ' cm');
  slider(ctrl, 'Distance objet-lentille', 5, 15, 0.5, d, v => { d = v; draw(); }, v => nf(v) + ' cm');
  el.append(ctrl, cap);
});

/* ---------- circuits ---------- */
widget('circuit', (el, o) => {
  const svg = svgRoot(600, 320, el), g = sv('g', {}, svg);
  const cap = h('div', { class: 'cap' });
  const wire = pts => sv('polyline', { points: pts.map(p => p.join(',')).join(' '), fill: 'none', stroke: C.ink, 'stroke-width': 2.5 }, g);
  const lamp = (x, y, lab) => { sv('circle', { cx: x, cy: y, r: 20, fill: C.card, stroke: C.ink, 'stroke-width': 2.5 }, g); sv('line', { x1: x - 14, y1: y - 14, x2: x + 14, y2: y + 14, stroke: C.ink, 'stroke-width': 2 }, g); sv('line', { x1: x - 14, y1: y + 14, x2: x + 14, y2: y - 14, stroke: C.ink, 'stroke-width': 2 }, g); if (lab) sv('text', { x: x + 28, y: y + 5, 'font-size': 15, fill: C.ink, text: lab }, g); };
  const gen = (x, y) => { sv('circle', { cx: x, cy: y, r: 22, fill: C.card, stroke: C.ink, 'stroke-width': 2.5 }, g); sv('line', { x1: x, y1: y - 22, x2: x, y2: y + 22, stroke: C.ink, 'stroke-width': 2.5 }, g); sv('text', { x: x - 34, y: y - 18, 'font-size': 16, 'font-weight': 700, fill: C.ko, text: '+' }, g); };
  const tag = (x, y, t, col) => { sv('rect', { x: x - 4, y: y - 17, width: t.length * 8.6 + 8, height: 24, rx: 6, fill: col, opacity: .15 }, g); sv('text', { x, y, 'font-size': 15, 'font-weight': 700, fill: col, text: t }, g); };
  const sc = [
    ['Circuit en série', () => {
      wire([[100, 138], [100, 60], [500, 60], [500, 140]]); wire([[500, 180], [500, 260], [100, 260], [100, 182]]); gen(100, 160); lamp(300, 60); lamp(500, 160);
      tag(150, 50, 'I = 0,20 A', C.blue); tag(380, 285, 'I = 0,20 A', C.blue); tag(510, 228, 'I = 0,20 A', C.blue);
      tag(6, 220, 'U(G) = 9,0 V', C.ko); tag(250, 110, 'U₁ = 5,5 V', C.acc); tag(420, 120, 'U₂ = 3,5 V', C.acc);
      return 'En <b>série</b> (une seule boucle) : l’intensité est <b>la même partout</b> (0,20 A). Loi des mailles : la tension du générateur se partage, U<sub>G</sub> = U₁ + U₂ (9,0 = 5,5 + 3,5).';
    }],
    ['Circuit en dérivation', () => {
      wire([[100, 138], [100, 60], [500, 60], [500, 140]]); wire([[500, 180], [500, 260], [100, 260], [100, 182]]); wire([[300, 60], [300, 140]]); wire([[300, 180], [300, 260]]);
      gen(100, 160); lamp(300, 160); lamp(500, 160);
      [[300, 60], [300, 260]].forEach(([x, y]) => sv('circle', { cx: x, cy: y, r: 6, fill: C.ink }, g));
      tag(150, 50, 'I = 0,50 A', C.blue); tag(310, 110, 'I₁ = 0,30 A', C.blue); tag(510, 110, 'I₂ = 0,20 A', C.blue);
      tag(6, 220, 'U(G) = 6,0 V', C.ko); tag(310, 220, 'U₁ = 6,0 V', C.acc); tag(510, 220, 'U₂ = 6,0 V', C.acc);
      return 'En <b>dérivation</b> (plusieurs branches) : loi des nœuds, le courant qui arrive à un nœud se partage, I = I₁ + I₂ (0,50 = 0,30 + 0,20). La tension est <b>la même</b> aux bornes de chaque branche (6,0 V).';
    }]];
  const show = i => { g.innerHTML = ''; cap.innerHTML = sc[i][1]() + ' Un ampèremètre (intensité, en A) se branche <b>en série</b> ; un voltmètre (tension, en V) <b>en dérivation</b>.'; };
  wbtns(el, sc.map(s => s[0]), show);
  el.append(cap); show(0);
});

/* ---------- loi d'Ohm ---------- */
widget('ohm', (el, o) => {
  let R0 = o.R ?? 100, I = o.I ?? 0.05;
  const svg = svgRoot(600, 280, el), g = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  const X = i => 70 + i * 4900, Y = u => 240 - u * 18;
  const draw = () => {
    g.innerHTML = '';
    for (let k = 0; k <= 10; k++) { sv('line', { x1: X(k / 100), y1: Y(0), x2: X(k / 100), y2: Y(12), stroke: C.line }, g); if (k % 2 === 0) sv('text', { x: X(k / 100), y: 260, 'text-anchor': 'middle', 'font-size': 12, fill: C.ink2, text: nf(k / 100) }, g); }
    for (let u = 0; u <= 12; u += 2) { sv('line', { x1: X(0), y1: Y(u), x2: X(0.1), y2: Y(u), stroke: C.line }, g); sv('text', { x: 62, y: Y(u) + 4, 'text-anchor': 'end', 'font-size': 12, fill: C.ink2, text: u }, g); }
    sv('text', { x: 560, y: 276, 'text-anchor': 'end', 'font-size': 12, fill: C.ink2, text: 'I (A)' }, g); sv('text', { x: 74, y: 22, 'font-size': 12, fill: C.ink2, text: 'U (V)' }, g);
    const iMax = Math.min(0.1, 12 / R0);
    sv('line', { x1: X(0), y1: Y(0), x2: X(iMax), y2: Y(R0 * iMax), stroke: C.blue, 'stroke-width': 3 }, g);
    const U = R0 * I;
    if (U <= 12) { sv('line', { x1: X(I), y1: Y(0), x2: X(I), y2: Y(U), stroke: C.acc, 'stroke-dasharray': '5 4', 'stroke-width': 2 }, g); sv('line', { x1: X(0), y1: Y(U), x2: X(I), y2: Y(U), stroke: C.acc, 'stroke-dasharray': '5 4', 'stroke-width': 2 }, g); sv('circle', { cx: X(I), cy: Y(U), r: 7, fill: C.acc }, g); }
    cap.innerHTML = `Caractéristique d’un conducteur ohmique : une <b>droite qui passe par l’origine</b> (U et I sont proportionnels). Loi d’Ohm : U = R × I = ${R0} Ω × ${nf(I)} A = <b>${nf(+U.toFixed(3))} V</b>. Plus R est grande, plus la droite est pentue.` + (U > 12 ? ' (Point hors du graphique.)' : '');
  };
  slider(ctrl, 'Résistance R', 20, 200, 10, R0, v => { R0 = v; draw(); }, v => v + ' Ω');
  slider(ctrl, 'Intensité I', 0, 0.1, 0.005, I, v => { I = v; draw(); }, v => nf(v) + ' A');
  el.append(ctrl, cap);
});

/* ---------- courbe d'étalonnage d'une thermistance ---------- */
widget('etalon', (el, o) => {
  let Rv = o.R ?? 16;
  const svg = svgRoot(600, 300, el), g = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  const Rf = th => 32 * Math.pow(2, -th / 20), X = th => 70 + th * 4.9, Y = r => 260 - r * 7.5;
  const draw = () => {
    g.innerHTML = '';
    for (let th = 0; th <= 100; th += 10) { sv('line', { x1: X(th), y1: Y(0), x2: X(th), y2: Y(32), stroke: C.line }, g); if (th % 20 === 0) sv('text', { x: X(th), y: 280, 'text-anchor': 'middle', 'font-size': 12, fill: C.ink2, text: th }, g); }
    for (let r = 0; r <= 32; r += 4) { sv('line', { x1: X(0), y1: Y(r), x2: X(100), y2: Y(r), stroke: C.line }, g); sv('text', { x: 62, y: Y(r) + 4, 'text-anchor': 'end', 'font-size': 12, fill: C.ink2, text: r }, g); }
    sv('text', { x: 560, y: 296, 'text-anchor': 'end', 'font-size': 12, fill: C.ink2, text: 'température θ (°C)' }, g); sv('text', { x: 74, y: 12, 'font-size': 12, fill: C.ink2, text: 'R (kΩ)' }, g);
    let d = ''; for (let th = 0; th <= 100; th += 1) d += (th ? 'L' : 'M') + X(th).toFixed(1) + ' ' + Y(Rf(th)).toFixed(1);
    sv('path', { d, fill: 'none', stroke: C.pc, 'stroke-width': 3 }, g);
    if (!o.fixed) {
      const th = -20 * Math.log2(Rv / 32);
      sv('line', { x1: X(0), y1: Y(Rv), x2: X(th), y2: Y(Rv), stroke: C.acc, 'stroke-width': 2, 'stroke-dasharray': '6 4' }, g);
      sv('line', { x1: X(th), y1: Y(Rv), x2: X(th), y2: Y(0), stroke: C.blue, 'stroke-width': 2, 'stroke-dasharray': '6 4' }, g);
      sv('circle', { cx: X(th), cy: Y(Rv), r: 7, fill: C.acc }, g);
      cap.innerHTML = `On mesure R = <b>${nf(Rv)} kΩ</b> ; on va jusqu’à la courbe, puis on descend lire la température : <b>θ ≈ ${nf(Math.round(th))} °C</b>. Cette thermistance est une CTN : sa résistance <b>diminue</b> quand la température augmente.`;
    }
  };
  if (!o.fixed) slider(ctrl, 'Résistance mesurée', 1, 32, 1, Rv, v => { Rv = v; draw(); }, v => v + ' kΩ');
  el.append(ctrl, cap); draw();
});

/* ---------- série de mesures : histogramme ---------- */
widget('histo', (el, o) => {
  let data = [];
  const mu = 1.42, sg = 0.03;
  const svg = svgRoot(600, 240, el), g = sv('g', {}, svg);
  const cap = h('div', { class: 'cap' });
  const gauss = () => { let u = 0, v = 0; while (!u) u = Math.random(); v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
  const draw = () => {
    g.innerHTML = '';
    const lo = 1.32, w = 0.01, nb = 20, X = x => 40 + (x - lo) / (nb * w) * 520;
    const cnt = Array(nb).fill(0); data.forEach(x => { const k = Math.floor((x - lo) / w); if (k >= 0 && k < nb) cnt[k]++; });
    const mx = Math.max(1, ...cnt);
    cnt.forEach((c, k) => sv('rect', { x: X(lo + k * w) + 1, y: 200 - c / mx * 170, width: 520 / nb - 2, height: c / mx * 170, fill: C.blue, opacity: .75 }, g));
    sv('line', { x1: 40, y1: 200, x2: 560, y2: 200, stroke: C.ink, 'stroke-width': 1.5 }, g);
    for (let k = 0; k <= nb; k += 4) sv('text', { x: X(lo + k * w), y: 220, 'text-anchor': 'middle', 'font-size': 12, fill: C.ink2, text: nf(+(lo + k * w).toFixed(2)) }, g);
    sv('text', { x: 560, y: 236, 'text-anchor': 'end', 'font-size': 12, fill: C.ink2, text: 'période mesurée (s)' }, g);
    if (data.length > 1) {
      const m = mean(data), s = Math.sqrt(data.reduce((a, x) => a + (x - m) ** 2, 0) / (data.length - 1));
      sv('line', { x1: X(m), y1: 20, x2: X(m), y2: 200, stroke: C.acc, 'stroke-width': 3, 'stroke-dasharray': '6 4' }, g);
      cap.innerHTML = `${data.length} mesures de la période d’un pendule. Elles ne sont pas toutes égales : c’est la <b>variabilité</b> de la mesure. Moyenne m ≈ <b>${nf(+m.toFixed(3))} s</b> ; écart type s ≈ <b>${nf(+s.toFixed(3))} s</b> (dispersion). L’incertitude-type sur une mesure est estimée par cet écart type.`;
    } else cap.innerHTML = 'Lance des séries de mesures (simulées) de la période d’un pendule.';
  };
  const box = h('div', { class: 'wbtns' });
  [['+10 mesures', 10], ['+50 mesures', 50]].forEach(([l, k]) => box.append(h('button', { class: 'wbtn', onclick: () => { for (let i = 0; i < k; i++) data.push(+(mu + sg * gauss()).toFixed(3)); draw(); } }, l)));
  box.append(h('button', { class: 'wbtn', onclick: () => { data = []; draw(); } }, 'Recommencer'));
  el.append(box, cap); for (let i = 0; i < 20; i++) data.push(+(mu + sg * gauss()).toFixed(3)); draw();
});
