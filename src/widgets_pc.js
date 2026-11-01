'use strict';
/* ============ Visuels : physique-chimie ============ */
const ELEM = [null,
  ['H', 'hydrogène', 0], ['He', 'hélium', 2], ['Li', 'lithium', 4], ['Be', 'béryllium', 5], ['B', 'bore', 6], ['C', 'carbone', 6], ['N', 'azote', 7], ['O', 'oxygène', 8], ['F', 'fluor', 10],
  ['Ne', 'néon', 10], ['Na', 'sodium', 12], ['Mg', 'magnésium', 12], ['Al', 'aluminium', 14], ['Si', 'silicium', 14], ['P', 'phosphore', 16], ['S', 'soufre', 16], ['Cl', 'chlore', 18], ['Ar', 'argon', 22]];
const SUBS = [['1s', 2, 1], ['2s', 2, 2], ['2p', 6, 2], ['3s', 2, 3], ['3p', 6, 3]];
function configOf(z) { const out = []; let r = z; for (const [n, cap] of SUBS) { if (r <= 0) break; const k = Math.min(cap, r); out.push([n, k]); r -= k; } return out; }
const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶' };
function configStr(z) { return configOf(z).map(([n, k]) => `${n}<sup>${k}</sup>`).join(' '); }
function periodOf(z) { return z <= 2 ? 1 : z <= 10 ? 2 : 3; }
function valenceOf(z) { const p = periodOf(z); return configOf(z).filter(([n]) => +n[0] === p).reduce((s, [, k]) => s + k, 0); }
function colOf(z) { if (z === 1) return 1; if (z === 2) return 8; return valenceOf(z); }
const ord = n => n === 1 ? '1<sup>re</sup>' : n + '<sup>e</sup>';
function familyOf(z) { const c = colOf(z); if (z === 1) return 'hydrogène (cas à part)'; return { 1: 'métaux alcalins', 2: 'alcalino-terreux', 7: 'halogènes', 8: 'gaz nobles' }[c] || null; }

/* ---------- particules : états de la matière, corps purs et mélanges ---------- */
widget('particles', (el, o) => {
  const W = 600, H = 300;
  const svg = svgRoot(W, H, el);
  sv('rect', { x: 150, y: 20, width: 300, height: 260, rx: 10, fill: C.card, stroke: C.ink, 'stroke-width': 2 }, svg);
  const g = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  let state = o.state || 'solid', mix = o.mix || 'pur', T = o.T ?? -10;
  const N = 48;
  let P = [];
  const box = { x0: 160, x1: 440, y0: 30, y1: 270 };
  const init = () => {
    P = [];
    for (let i = 0; i < N; i++) {
      const col = i % 8, row = Math.floor(i / 8);
      const type = mix === 'pur' ? 0 : mix === 'hetero' ? (row < 3 ? 1 : 0) : (Math.random() < .35 ? 1 : 0);
      P.push({ hx: 180 + col * 34, hy: 252 - row * 32, x: 180 + col * 34, y: 252 - row * 32, vx: (Math.random() - .5), vy: (Math.random() - .5), t: type });
    }
    if (mix === 'homo') P.forEach((p, i) => { const j = Math.floor(Math.random() * N); [P[i].t, P[j].t] = [P[j].t, P[i].t]; });
  };
  const circles = [];
  const build = () => { g.innerHTML = ''; circles.length = 0; P.forEach(p => circles.push(sv('circle', { r: 12, fill: p.t ? C.acc : C.blue, stroke: C.ink, 'stroke-width': 1 }, g))); };
  init(); build();
  const states = { solid: 'solide', liquid: 'liquide', gas: 'gazeux' };
  const setCap = () => {
    if (o.temp) cap.innerHTML = `Eau à ${nf(T)} °C : état <b>${states[state]}</b>. `;
    else cap.innerHTML = '';
    cap.innerHTML += state === 'solid' ? 'Les particules sont <b>serrées et ordonnées</b> : elles vibrent sur place. Le solide a une forme propre.' :
      state === 'liquid' ? 'Les particules sont <b>serrées mais désordonnées</b> : elles glissent les unes sur les autres. Le liquide prend la forme du récipient.' :
        'Les particules sont <b>éloignées et désordonnées</b>, elles bougent très vite dans tout l’espace disponible.';
    if (o.mixes) cap.innerHTML = mix === 'pur' ? 'Une seule sorte de particules (une seule espèce chimique) : c’est un <b>corps pur</b>.' : mix === 'homo' ? 'Deux espèces chimiques mélangées partout : on ne les distingue pas à l’œil nu. <b>Mélange homogène</b> (ex. eau salée).' : 'Deux espèces qui ne se mélangent pas : on voit deux phases. <b>Mélange hétérogène</b> (ex. eau et huile).';
  };
  onFrame(() => {
    P.forEach((p, i) => {
      if (state === 'solid') { p.x = p.hx + (Math.random() - .5) * 3; p.y = p.hy + (Math.random() - .5) * 3; }
      else {
        const sp = state === 'gas' ? 3.2 : 0.9;
        p.vx += (Math.random() - .5) * .4; p.vy += (Math.random() - .5) * .4;
        const v = Math.hypot(p.vx, p.vy) || 1; p.vx = p.vx / v * sp; p.vy = p.vy / v * sp;
        p.x += p.vx; p.y += p.vy;
        const ytop = state === 'gas' ? box.y0 + 12 : (mix === 'hetero' ? (p.t ? 112 : 180) : 112);
        const ybot = state === 'gas' ? box.y1 - 12 : (mix === 'hetero' ? (p.t ? 170 : box.y1 - 12) : box.y1 - 12);
        if (p.x < box.x0 + 12) { p.x = box.x0 + 12; p.vx *= -1; } if (p.x > box.x1 - 12) { p.x = box.x1 - 12; p.vx *= -1; }
        if (p.y < ytop) { p.y = ytop; p.vy = Math.abs(p.vy); } if (p.y > ybot) { p.y = ybot; p.vy = -Math.abs(p.vy); }
      }
      circles[i].setAttribute('cx', p.x.toFixed(1)); circles[i].setAttribute('cy', p.y.toFixed(1));
    });
  });
  if (o.temp) slider(ctrl, 'Température', -30, 130, 1, T, v => { T = v; const ns = v < 0 ? 'solid' : v < 100 ? 'liquid' : 'gas'; if (ns !== state) { state = ns; init(); build(); } setCap(); }, v => nf(v) + ' °C');
  else if (o.mixes) wbtns(el, ['Corps pur', 'Mélange homogène', 'Mélange hétérogène'], i => { mix = ['pur', 'homo', 'hetero'][i]; state = 'liquid'; init(); build(); setCap(); });
  else wbtns(el, ['Solide', 'Liquide', 'Gaz'], i => { state = ['solid', 'liquid', 'gas'][i]; init(); build(); setCap(); }, ['solid', 'liquid', 'gas'].indexOf(state));
  if (o.mixes) state = 'liquid';
  el.append(ctrl, cap); setCap();
});

/* ---------- changements d'état ---------- */
widget('states', (el, o) => {
  const svg = svgRoot(600, 330, el);
  const pos = { S: [110, 280], L: [490, 280], G: [300, 50] };
  const names = { S: 'SOLIDE', L: 'LIQUIDE', G: 'GAZ' };
  const arrows = [['S', 'L', 'fusion', 1], ['L', 'S', 'solidification', 0], ['L', 'G', 'vaporisation', 1], ['G', 'L', 'liquéfaction', 0], ['S', 'G', 'sublimation', 1], ['G', 'S', 'condensation', 0]];
  const g = sv('g', {}, svg);
  for (const k in pos) { const [x, y] = pos[k]; sv('rect', { x: x - 70, y: y - 24, width: 140, height: 48, rx: 14, fill: C.card, stroke: C.ink, 'stroke-width': 2 }, svg); sv('text', { x, y: y + 7, 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 700, fill: C.ink, text: names[k] }, svg); }
  const cap = h('div', { class: 'cap', html: 'Touche un changement d’état.' });
  let sel = -1;
  const draw = () => {
    g.innerHTML = '';
    arrows.forEach(([a, b, name, endo], i) => {
      const [x1, y1] = pos[a], [x2, y2] = pos[b];
      const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L, off = 14;
      const sx = x1 + dx * .2 + nx * off, sy = y1 + dy * .2 + ny * off, ex = x1 + dx * .8 + nx * off, ey = y1 + dy * .8 + ny * off;
      const col = i === sel ? (endo ? C.ko : C.blue) : C.ink2;
      sv('line', { x1: sx, y1: sy, x2: ex, y2: ey, stroke: col, 'stroke-width': i === sel ? 5 : 2.5 }, g);
      const ang = Math.atan2(ey - sy, ex - sx);
      sv('path', { d: `M${ex} ${ey} L${ex - 14 * Math.cos(ang - .4)} ${ey - 14 * Math.sin(ang - .4)} L${ex - 14 * Math.cos(ang + .4)} ${ey - 14 * Math.sin(ang + .4)} Z`, fill: col }, g);
      sv('text', { x: (sx + ex) / 2 + nx * 18, y: (sy + ey) / 2 + ny * 18 + 5, 'text-anchor': 'middle', 'font-size': i === sel ? 16 : 13, 'font-weight': i === sel ? 700 : 400, fill: col, text: name }, g);
    });
  };
  wbtns(el, arrows.map(a => a[2]), i => { sel = i; draw(); const [a, b, name, endo] = arrows[i]; cap.innerHTML = `<b>${name[0].toUpperCase() + name.slice(1)}</b> : passage de l’état ${names[a].toLowerCase()} à l’état ${names[b].toLowerCase()}. ` + (endo ? 'Il faut <b>apporter de l’énergie</b> (chauffer) : transformation <b>endothermique</b>.' : 'Le système <b>cède de l’énergie</b> (il faut refroidir) : transformation <b>exothermique</b>.'); }, -1);
  el.append(cap); draw();
});

/* ---------- courbe de chauffage : palier ---------- */
widget('heating', (el, o) => {
  const W = 600, H = 300;
  const svg = svgRoot(W, H, el);
  const g = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  let kind = 0, t = 100;
  const X = s => 60 + s * 5, Y = T => 250 - (T + 20) * 2.4;
  const pure = s => s < 20 ? -20 + s : s < 60 ? 0 : Math.min(60, (s - 60) * 1.2);
  const mixf = s => s < 20 ? -20 + s * .85 : s < 60 ? -3 + (s - 20) * .12 + (s - 20) * (s - 20) * .002 : Math.min(60, 4.0 + (s - 60) * 1.2);
  const draw = () => {
    g.innerHTML = '';
    sv('line', { x1: 60, y1: 260, x2: 570, y2: 260, stroke: C.ink, 'stroke-width': 2 }, g);
    sv('line', { x1: 60, y1: 260, x2: 60, y2: 20, stroke: C.ink, 'stroke-width': 2 }, g);
    sv('text', { x: 570, y: 285, 'text-anchor': 'end', 'font-size': 14, fill: C.ink2, text: 'temps (min)' }, g);
    sv('text', { x: 66, y: 24, 'font-size': 14, fill: C.ink2, text: 'température (°C)' }, g);
    [-20, 0, 20, 40, 60].forEach(T => { sv('line', { x1: 56, y1: Y(T), x2: 570, y2: Y(T), stroke: C.line }, g); sv('text', { x: 50, y: Y(T) + 5, 'text-anchor': 'end', 'font-size': 13, fill: C.ink2, text: T }, g); });
    const f = kind ? mixf : pure;
    let d = ''; for (let s = 0; s <= t; s += 0.5) d += (s ? 'L' : 'M') + X(s) + ' ' + Y(f(s));
    sv('path', { d, fill: 'none', stroke: kind ? C.acc : C.blue, 'stroke-width': 3.5 }, g);
    if (!kind && t > 25) { sv('rect', { x: X(20), y: Y(0) - 16, width: X(60) - X(20), height: 32, fill: C.blue, opacity: .1 }, g); sv('text', { x: X(40), y: Y(0) - 22, 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 700, fill: C.blue, text: 'palier : 0 °C' }, g); }
    cap.innerHTML = kind ? 'Pour un <b>mélange</b> (eau salée, par exemple), la température continue de varier pendant le changement d’état : <b>pas de palier net</b>.' :
      'Pour un <b>corps pur</b> (eau pure), la température reste <b>constante</b> pendant tout le changement d’état (ici la fusion, à 0 °C) : c’est un <b>palier</b>. Cette température permet d’identifier l’espèce chimique.';
  };
  wbtns(el, ['Eau pure (corps pur)', 'Eau salée (mélange)'], i => { kind = i; draw(); });
  slider(ctrl, 'Temps', 0, 100, 1, t, v => { t = v; draw(); }, v => v + ' min');
  el.append(ctrl, cap);
});

/* ---------- masse volumique ---------- */
widget('density', (el, o) => {
  const svg = svgRoot(600, 280, el);
  const g = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  const mats = o.mats || [['Liège', .24], ['Bois de pin', .5], ['Glace', .92], ['Aluminium', 2.7], ['Fer', 7.87], ['Or', 19.3]];
  let mi = 0, V = 50;
  const draw = () => {
    g.innerHTML = '';
    const [name, rho] = mats[mi], m = rho * V;
    sv('rect', { x: 330, y: 80, width: 230, height: 180, fill: 'var(--soft-blue)', stroke: C.ink, 'stroke-width': 2 }, g);
    sv('text', { x: 445, y: 72, 'text-anchor': 'middle', 'font-size': 14, fill: C.ink2, text: 'eau : ρ = 1,0 g/cm³' }, g);
    const s = 20 + Math.cbrt(V) * 12;
    const yTop = rho < 1 ? 80 - s * (1 - rho) : 260 - s;
    sv('rect', { x: 445 - s / 2, y: yTop, width: s, height: s, fill: rho < 1 ? C.warn : C.ink2, stroke: C.ink, 'stroke-width': 2 }, g);
    sv('rect', { x: 60, y: 150, width: 200, height: 18, rx: 4, fill: C.ink2 }, g);
    sv('rect', { x: 160 - s / 2, y: 150 - s, width: s, height: s, fill: rho < 1 ? C.warn : C.ink2, stroke: C.ink, 'stroke-width': 2 }, g);
    sv('text', { x: 160, y: 196, 'text-anchor': 'middle', 'font-size': 16, fill: C.ink, text: `m = ${nf(+m.toFixed(1))} g` }, g);
    sv('text', { x: 160, y: 218, 'text-anchor': 'middle', 'font-size': 16, fill: C.ink, text: `V = ${nf(V)} cm³` }, g);
    cap.innerHTML = `<b>${name}</b> : ρ = ${F('m', 'V')} = ${F(nf(+m.toFixed(1)) + ' g', nf(V) + ' cm³')} = <b>${nf(rho)} g/cm³</b>. ` +
      `Si tu changes le volume, la masse change aussi, mais <b>ρ reste la même</b> : elle caractérise le matériau. ` +
      (rho < 1 ? 'ρ est plus petite que celle de l’eau : l’objet <b>flotte</b>.' : 'ρ est plus grande que celle de l’eau : l’objet <b>coule</b>.');
  };
  wbtns(el, mats.map(m => m[0]), i => { mi = i; draw(); });
  slider(ctrl, 'Volume', 5, 120, 5, V, v => { V = v; draw(); }, v => v + ' cm³');
  el.append(ctrl, cap);
});

/* ---------- chromatographie sur couche mince ---------- */
widget('ccm', (el, o) => {
  const svg = svgRoot(600, 320, el);
  const g = sv('g', {}, svg);
  const cap = h('div', { class: 'cap', html: 'On dépose une goutte de chaque échantillon sur la ligne de dépôt, puis on place la plaque dans un éluant (solvant) qui monte par capillarité.' });
  const spots = [{ x: 220, lab: 'M', heights: [.3, .72], col: [C.blue, C.acc] }, { x: 300, lab: 'A', heights: [.72], col: [C.acc] }, { x: 380, lab: 'B', heights: [.3], col: [C.blue] }, { x: 460, lab: 'C', heights: [.5], col: [C.ok] }];
  let prog = 0, running = false;
  const draw = () => {
    g.innerHTML = '';
    sv('rect', { x: 180, y: 20, width: 320, height: 280, fill: C.card, stroke: C.ink, 'stroke-width': 2 }, g);
    const base = 260, front = base - prog * 210;
    sv('rect', { x: 180, y: front, width: 320, height: 300 - front, fill: 'var(--soft-blue)', opacity: .6 }, g);
    sv('line', { x1: 180, y1: base, x2: 500, y2: base, stroke: C.ink2, 'stroke-dasharray': '6 4' }, g);
    if (prog > 0) sv('line', { x1: 180, y1: front, x2: 500, y2: front, stroke: C.blue, 'stroke-width': 1.5 }, g);
    spots.forEach(s => {
      s.heights.forEach((hh, i) => sv('circle', { cx: s.x, cy: base - hh * prog * 210, r: 9, fill: s.col[i], opacity: .9 }, g));
      sv('text', { x: s.x, y: base + 28, 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 700, fill: C.ink, text: s.lab }, g);
    });
    sv('text', { x: 170, y: base + 5, 'text-anchor': 'end', 'font-size': 13, fill: C.ink2, text: 'ligne de dépôt' }, g);
    if (prog > 0) sv('text', { x: 170, y: front + 5, 'text-anchor': 'end', 'font-size': 13, fill: C.blue, text: 'front de l’éluant' }, g);
  };
  const btn = h('button', { class: 'wbtn', onclick: () => { if (running) return; prog = 0; running = true; } }, 'Lancer l’élution');
  onFrame(() => { if (running) { prog = Math.min(1, prog + .006); draw(); if (prog >= 1) { running = false; cap.innerHTML = '<b>Lecture :</b> A, B et C donnent chacun une seule tache : ce sont des <b>corps purs</b>. Le mélange M donne <b>deux taches</b>, à la même hauteur que celles de A et de B : M contient les espèces A et B, et pas C.'; } } });
  el.append(h('div', { class: 'wbtns' }, btn), cap); draw();
});

/* ---------- tests chimiques ---------- */
widget('tests', (el, o) => {
  const data = [
    ['💧', 'Eau', 'Sulfate de cuivre anhydre', 'Le solide <b>blanc</b> devient <b>bleu</b>.'],
    ['💥', 'Dihydrogène H₂', 'Approcher une flamme', 'Petite <b>détonation</b> (« aboiement »).'],
    ['🔥', 'Dioxygène O₂', 'Bûchette incandescente', 'La bûchette <b>se rallume</b> (s’enflamme).'],
    ['🫧', 'Dioxyde de carbone CO₂', 'Eau de chaux', 'L’eau de chaux se <b>trouble</b> (devient blanchâtre).']];
  const grid = h('div', { style: 'display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px' });
  data.forEach(([ico, sp, test, res]) => {
    const c = h('button', { class: 'choice', style: 'text-align:center' });
    let open = false;
    const r = () => { c.innerHTML = open ? `<div style="font-size:1.6rem">${ico}</div><b>${sp}</b><br><span class="small">Test : ${test}</span><br>${res}` : `<div style="font-size:1.6rem">${ico}</div><b>${sp}</b><br><span class="small muted">Touche pour voir le test</span>`; };
    c.onclick = () => { open = !open; r(); }; r(); grid.append(c);
  });
  el.append(grid);
});

/* ---------- solution : concentration en masse, dilution ---------- */
function beakerDraw(g, x, y, w, hMax, Vfrac, nDots, alpha, label) {
  const hh = hMax * Vfrac;
  sv('path', { d: `M${x} ${y} L${x} ${y + hMax} Q${x} ${y + hMax + 10} ${x + 10} ${y + hMax + 10} L${x + w - 10} ${y + hMax + 10} Q${x + w} ${y + hMax + 10} ${x + w} ${y + hMax} L${x + w} ${y}`, fill: 'none', stroke: C.ink, 'stroke-width': 2.5 }, g);
  sv('rect', { x: x + 2, y: y + hMax - hh, width: w - 4, height: hh + 8, fill: C.pc, opacity: Math.min(.85, .06 + alpha) }, g);
  const rng = (s => () => (s = (s * 9301 + 49297) % 233280) / 233280)(nDots * 7 + Math.round(hh));
  for (let i = 0; i < nDots; i++) sv('circle', { cx: x + 8 + rng() * (w - 16), cy: y + hMax - hh + 6 + rng() * (hh - 4), r: 3.2, fill: C.ink }, g);
  if (label) sv('text', { x: x + w / 2, y: y + hMax + 32, 'text-anchor': 'middle', 'font-size': 15, fill: C.ink, text: label }, g);
}
widget('beaker', (el, o) => {
  const svg = svgRoot(600, 300, el);
  const g = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  if (o.mode === 'dil') {
    const C0 = o.C0 || 20;
    let V0 = 10, V1 = 100;
    const draw = () => {
      g.innerHTML = '';
      const m = C0 * V0 / 1000, C1 = C0 * V0 / V1;
      beakerDraw(g, 40, 40, 120, 180, .8, 60, C0 / 40, 'Solution mère');
      sv('text', { x: 100, y: 30, 'text-anchor': 'middle', 'font-size': 14, fill: C.ink2, text: `C = ${nf(C0)} g/L` }, g);
      beakerDraw(g, 220, 120, 60, 100, V0 / 50, V0, C0 / 40, `prélevé : ${nf(V0)} mL`);
      beakerDraw(g, 380, 40, 170, 180, V1 / 250, V0, C1 / 40, `après ajout d’eau : ${nf(V1)} mL`);
      sv('path', { d: 'M290 170 L370 170', stroke: C.acc, 'stroke-width': 3 }, g); sv('path', { d: 'M370 170 l-10 -6 v12 z', fill: C.acc }, g);
      cap.innerHTML = `Masse de soluté prélevée : m = ${nf(C0)} g/L × ${nf(V0 / 1000)} L = ${nf(+m.toFixed(4))} g. En ajoutant de l’eau, <b>la masse de soluté ne change pas</b> (même nombre de points), mais elle est répartie dans ${nf(V1)} mL.<br>Concentration de la solution fille : C = ${F(nf(+m.toFixed(4)) + ' g', nf(V1 / 1000) + ' L')} = <b>${nf(+C1.toFixed(3))} g/L</b>. Facteur de dilution : F = ${F(nf(V1), nf(V0))} = ${nf(+(V1 / V0).toFixed(2))}.`;
    };
    slider(ctrl, 'Volume prélevé', 5, 50, 5, V0, v => { V0 = v; draw(); }, v => v + ' mL');
    slider(ctrl, 'Volume final (fiole)', 50, 250, 50, V1, v => { V1 = v; draw(); }, v => v + ' mL');
  } else {
    let m = 5, V = 250;
    const draw = () => {
      g.innerHTML = '';
      const Cm = m / (V / 1000);
      beakerDraw(g, 200, 30, 200, 200, V / 500, Math.round(m * 6), Cm / 80, '');
      sv('text', { x: 300, y: 270, 'text-anchor': 'middle', 'font-size': 16, fill: C.ink, text: `${nf(m)} g de soluté dans ${nf(V)} mL de solution` }, g);
      cap.innerHTML = `Chaque point représente une petite quantité de soluté. C<sub>m</sub> = ${F('m<sub>soluté</sub>', 'V<sub>solution</sub>')} = ${F(nf(m) + ' g', nf(V / 1000) + ' L')} = <b>${nf(+Cm.toFixed(1))} g/L</b>. Plus il y a de soluté dans un même volume, plus la solution est concentrée (couleur plus intense). Attention : le volume doit être en <b>litres</b>.`;
    };
    slider(ctrl, 'Masse de soluté', 0, 20, 1, m, v => { m = v; draw(); }, v => v + ' g');
    slider(ctrl, 'Volume de solution', 50, 500, 50, V, v => { V = v; draw(); }, v => v + ' mL');
  }
  el.append(ctrl, cap);
});
widget('rhocm', (el) => {
  const svg = svgRoot(600, 240, el);
  const g = sv('g', {}, svg);
  sv('rect', { x: 60, y: 40, width: 480, height: 50, fill: C.blue, opacity: .8 }, g);
  sv('rect', { x: 60 + 480 * 970 / 1020, y: 40, width: 480 * 50 / 1020, height: 50, fill: C.acc }, g);
  sv('text', { x: 300, y: 72, 'text-anchor': 'middle', 'font-size': 16, fill: '#fff', 'font-weight': 700, text: 'eau ≈ 970 g' }, g);
  sv('text', { x: 540, y: 110, 'text-anchor': 'end', 'font-size': 15, fill: C.acc, 'font-weight': 700, text: 'sucre : 50 g' }, g);
  sv('text', { x: 300, y: 30, 'text-anchor': 'middle', 'font-size': 15, fill: C.ink, text: '1,0 L de solution sucrée : masse totale ≈ 1 020 g' }, g);
  sv('text', { x: 300, y: 160, 'text-anchor': 'middle', 'font-size': 18, fill: C.acc, text: 'Concentration en masse : Cm = 50 g ÷ 1,0 L = 50 g/L' }, g);
  sv('text', { x: 300, y: 200, 'text-anchor': 'middle', 'font-size': 18, fill: C.blue, text: 'Masse volumique : ρ = 1 020 g ÷ 1,0 L ≈ 1 020 g/L' }, g);
  el.append(h('div', { class: 'cap', html: 'Même solution, même volume, mais pas la même masse au numérateur : C<sub>m</sub> ne compte que le <b>soluté</b>, ρ compte <b>toute la solution</b> (eau + soluté).' }));
});

/* ---------- atome : protons, neutrons, électrons ---------- */
widget('atom', (el, o) => {
  const svg = svgRoot(600, 340, el);
  const g = sv('g', {}, svg);
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  let Z = o.Z || 6, N = o.N ?? 6, e = o.Z || 6;
  const draw = () => {
    g.innerHTML = '';
    const cx = 200, cy = 170;
    [70, 110, 150].forEach(r => sv('circle', { cx, cy, r, fill: 'none', stroke: C.line, 'stroke-width': 1.5 }, g));
    const nuc = []; for (let i = 0; i < Z; i++) nuc.push(1); for (let i = 0; i < N; i++) nuc.push(0);
    const sh = shuffle(nuc.map((t, i) => [t, i])).map(x => x[0]);
    sh.forEach((t, i) => { const a = i * 2.4, rr = 4.2 * Math.sqrt(i); sv('circle', { cx: cx + rr * Math.cos(a), cy: cy + rr * Math.sin(a), r: 6, fill: t ? C.ko : C.ink2, stroke: C.card, 'stroke-width': 1 }, g); });
    const caps = [2, 8, 8]; let left = e;
    [70, 110, 150].forEach((r, k) => { const n = Math.min(caps[k], left); left -= n; for (let i = 0; i < n; i++) { const a = i * 2 * Math.PI / caps[k] - Math.PI / 2; sv('circle', { cx: cx + r * Math.cos(a), cy: cy + r * Math.sin(a), r: 6, fill: C.blue }, g); } });
    const [sym, name] = ELEM[Z], A = Z + N, q = Z - e;
    const qs = q === 0 ? '' : (Math.abs(q) > 1 ? Math.abs(q) : '') + (q > 0 ? '+' : '−');
    const fo = sv('foreignObject', { x: 380, y: 40, width: 210, height: 280 }, g);
    fo.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:16px;line-height:1.5;color:var(--ink)">
      <div style="font-size:34px;text-align:center">${NUC(A, Z, sym + (qs ? '<sup>' + qs + '</sup>' : ''))}</div>
      <div style="text-align:center"><b>${name}</b>${q ? (q > 0 ? ' (cation)' : ' (anion)') : ''}</div>
      <div><span style="color:var(--ko)">●</span> ${Z} proton(s) : Z = ${Z}</div>
      <div><span style="color:var(--ink2)">●</span> ${N} neutron(s)</div>
      <div><span style="color:var(--accent2)">●</span> ${e} électron(s)</div>
      <div>A = Z + N = ${A}</div><div>Charge : ${q === 0 ? '0 (neutre)' : (q > 0 ? '+' : '−') + Math.abs(q) + ' e'}</div></div>`;
    cap.innerHTML = o.ion ? `Un ion se forme quand l’atome <b>gagne ou perd des électrons</b>. Le noyau (Z, A) ne change pas. Plus d’électrons que de protons → ion négatif (anion) ; moins → ion positif (cation).` :
      `C’est le nombre de <b>protons Z</b> qui détermine l’élément (ici ${name}). Les neutrons changent A mais pas l’élément. Un atome est <b>électriquement neutre</b> : autant d’électrons que de protons. (Représentation simplifiée, pas à l’échelle.)`;
  };
  slider(ctrl, 'Protons Z', 1, 18, 1, Z, v => { Z = v; if (!o.ion) e = v; else e = Math.max(0, Math.min(v + 3, e)); draw(); });
  slider(ctrl, 'Neutrons N', 0, 22, 1, N, v => { N = v; draw(); });
  if (o.ion) slider(ctrl, 'Électrons', 0, 21, 1, e, v => { e = v; draw(); });
  el.append(ctrl, cap);
});

/* ---------- échelle atome / noyau ---------- */
widget('scale', (el) => {
  const svg = svgRoot(600, 300, el);
  const g = sv('g', {}, svg);
  const cap = h('div', { class: 'cap' });
  let k = 0;
  const draw = () => {
    g.innerHTML = '';
    const r = 120 * Math.pow(10, k);
    if (k < 3) sv('circle', { cx: 300, cy: 150, r: Math.min(r, 2000), fill: 'var(--soft-blue)', stroke: C.blue, 'stroke-width': 2 }, g);
    else sv('rect', { x: 0, y: 0, width: 600, height: 300, fill: 'var(--soft-blue)' }, g);
    for (let i = 0; i < 25; i++) { const a = i * 2.39996, rr = r * (.3 + .65 * ((i * 37) % 25) / 25); const x = 300 + rr * Math.cos(a), y = 150 + rr * Math.sin(a); if (x > 0 && x < 600 && y > 0 && y < 300) sv('circle', { cx: x, cy: y, r: 3, fill: C.blue, opacity: .6 }, g); }
    const nr = 120 * Math.pow(10, k - 5);
    if (nr >= 2) sv('circle', { cx: 300, cy: 150, r: nr, fill: C.ko }, g);
    const size = ['10⁻¹⁰ m (0,1 nm)', '10⁻¹¹ m', '10⁻¹² m', '10⁻¹³ m', '10⁻¹⁴ m', '10⁻¹⁵ m'][k];
    sv('line', { x1: 40, y1: 280, x2: 160, y2: 280, stroke: C.ink, 'stroke-width': 3 }, g);
    sv('text', { x: 100, y: 270, 'text-anchor': 'middle', 'font-size': 14, fill: C.ink, text: 'largeur ≈ ' + size }, g);
    cap.innerHTML = k === 0 ? 'Voici un atome : diamètre d’environ 10⁻¹⁰ m. Le noyau est au centre… mais tu ne le vois pas encore. Zoome !' :
      k < 5 ? `Zoom ×${nf(Math.pow(10, k))}. Toujours presque rien au centre : l’atome est essentiellement <b>vide</b>.` :
        'Zoom ×100 000 : le noyau apparaît enfin, environ <b>10⁻¹⁵ m</b>. Le noyau est environ <b>100 000 fois (10⁵) plus petit</b> que l’atome. Si le noyau était une bille de 1 cm, l’atome ferait 1 km de diamètre !';
  };
  wbtns(el, ['Atome', '×10', '×100', '×1 000', '×10 000', '×100 000'], i => { k = i; draw(); });
  el.append(cap); draw();
});

/* ---------- configuration électronique + tableau périodique ---------- */
widget('config', (el, o) => {
  const out = h('div'), tab = h('div', { class: 'ptable', style: 'margin-top:10px' });
  const ctrl = h('div', { class: 'ctrl' }), cap = h('div', { class: 'cap' });
  let Z = o.Z || 11, inp;
  const cells = {};
  for (let p = 1; p <= 3; p++) for (let c = 1; c <= 8; c++) {
    const z = Object.keys(ELEM).find(zz => zz > 0 && periodOf(+zz) === p && colOf(+zz) === c);
    const cell = h('button', { class: 'pcell' + (z ? '' : ' empty') });
    if (z) { cell.innerHTML = `<span class="small">${z}</span><b>${ELEM[z][0]}</b>`; cell.onclick = () => { Z = +z; inp.value = Z; draw(); }; cells[z] = cell; }
    tab.append(cell);
  }
  const draw = () => {
    const cfg = configOf(Z), p = periodOf(Z), v = valenceOf(Z);
    out.innerHTML = `<div class="shells">${SUBS.map(([n, cap]) => { const f = (cfg.find(c => c[0] === n) || [0, 0])[1]; return `<div class="sub"><div class="boxes">${Array.from({ length: cap }, (_, i) => `<i class="${i < f ? 'f' : ''}" style="${+n[0] === p && i < f ? 'background:var(--ok);border-color:var(--ok)' : ''}"></i>`).join('')}</div>${n}</div>`; }).join('')}</div>
      <div class="formula">${ELEM[Z][0]} (Z = ${Z}) : ${configStr(Z)}</div>`;
    Object.values(cells).forEach(c => c.classList.remove('on')); cells[Z].classList.add('on');
    const fam = familyOf(Z);
    cap.innerHTML = `On remplit les sous-couches dans l’ordre 1s, 2s, 2p, 3s, 3p (2 électrons maximum dans une sous-couche s, 6 dans une p). Dernière couche occupée : n = ${p} → <b>${ord(p)} ligne</b> (période) du tableau. ` +
      `<b style="color:var(--ok)">${v} électron(s) de valence</b> (sur la couche n = ${p}) → <b>${Z === 2 ? 'dernière' : ord(v)} colonne</b>` + (Z === 2 ? ' (l’hélium est placé avec les gaz nobles)' : '') + '.' + (fam ? ` Famille : ${fam}.` : '');
  };
  inp = slider(ctrl, 'Numéro atomique Z', 1, 18, 1, Z, v => { Z = v; draw(); });
  el.append(out, ctrl, tab, cap);
});

/* ---------- ions et gaz nobles ---------- */
widget('ion', (el, o) => {
  const out = h('div'), cap = h('div', { class: 'cap' });
  const list = o.list || [3, 11, 12, 13, 8, 9, 16, 17];
  const noble = z => [2, 10, 18].reduce((best, n) => Math.abs(n - z) < Math.abs(best - z) ? n : best, 2);
  const draw = z => {
    const n = noble(z), d = n - z, [sym, name] = ELEM[z];
    const q = -d, qs = (Math.abs(q) > 1 ? Math.abs(q) : '') + (q > 0 ? '+' : '−');
    out.innerHTML = `<table class="simple"><tr><th>Atome ${sym}</th><th></th><th>Ion ${sym}<sup>${qs}</sup></th></tr>
      <tr><td>${configStr(z)}<br><span class="small muted">${valenceOf(z)} électron(s) de valence</span></td>
      <td style="font-size:1.4rem">${d < 0 ? 'perd ' + (-d) + ' e⁻ →' : 'gagne ' + d + ' e⁻ →'}</td>
      <td>${configStr(n)}<br><span class="small muted">comme le gaz noble ${ELEM[n][1]}</span></td></tr></table>`;
    cap.innerHTML = `Les <b>gaz nobles</b> (He, Ne, Ar) sont très stables : leur dernière couche est pleine. Les autres atomes ont tendance à gagner ou perdre des électrons pour avoir la même configuration que le gaz noble le plus proche. ${name[0].toUpperCase() + name.slice(1)} ${d < 0 ? 'perd ' + (-d) + ' électron(s) : il forme un ion positif (cation) ' : 'gagne ' + d + ' électron(s) : il forme un ion négatif (anion) '}<b>${sym}<sup>${qs}</sup></b>.`;
  };
  wbtns(el, list.map(z => ELEM[z][0]), i => draw(list[i]));
  el.append(out, cap); draw(list[0]);
});

/* ---------- composés ioniques : électroneutralité ---------- */
widget('ionic', (el, o) => {
  const cats = [['Na', 1, 'sodium'], ['K', 1, 'potassium'], ['Mg', 2, 'magnésium'], ['Ca', 2, 'calcium']];
  const ans = [['Cl', 1, 'chlorure'], ['F', 1, 'fluorure']];
  let ci = 2, ai = 0, nc = 1, na = 1;
  const out = h('div', { style: 'min-height:150px' }), cap = h('div', { class: 'cap' });
  const ion = (s, q, col) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:50%;background:${col};color:#fff;font-weight:700;margin:4px">${s}<sup>${q > 1 ? q : ''}${col === 'var(--accent)' ? '+' : '−'}</sup></span>`;
  const draw = () => {
    const [cs, cq, cn] = cats[ci], [as, aq, an] = ans[ai];
    const tot = nc * cq - na * aq;
    out.innerHTML = `<div style="text-align:center">${Array(nc).fill(ion(cs, cq, 'var(--accent)')).join('')}${Array(na).fill(ion(as, aq, 'var(--accent2)')).join('')}</div>
      <div class="formula">Charge totale : ${nc} × (+${cq}) + ${na} × (−${aq}) = <b style="color:${tot ? 'var(--ko)' : 'var(--ok)'}">${tot > 0 ? '+' : ''}${tot}</b></div>` +
      (tot === 0 ? `<div class="formula" style="color:var(--ok)">Neutre ! Formule : <b>${cs}${nc > 1 ? '<sub>' + nc + '</sub>' : ''}${as}${na > 1 ? '<sub>' + na + '</sub>' : ''}</b> (${an} de ${cn})</div>` : '');
    cap.innerHTML = 'Un composé ionique (un solide comme le sel) est <b>électriquement neutre</b> : les charges positives compensent exactement les charges négatives. Ajuste le nombre d’ions pour que la charge totale soit 0. La formule indique la <b>proportion</b> des ions, sans écrire les charges.';
  };
  const ctrlB = h('div', { class: 'wbtns' });
  const mk = (lab, f) => ctrlB.append(h('button', { class: 'wbtn', onclick: () => { f(); draw(); } }, lab));
  mk('+ cation', () => { nc = Math.min(4, nc + 1); }); mk('− cation', () => { nc = Math.max(1, nc - 1); });
  mk('+ anion', () => { na = Math.min(4, na + 1); }); mk('− anion', () => { na = Math.max(1, na - 1); });
  wbtns(el, cats.map(c => c[0] + '<sup>' + (c[1] > 1 ? c[1] : '') + '+</sup>'), i => { ci = i; draw(); }, ci);
  wbtns(el, ans.map(a => a[0] + '<sup>−</sup>'), i => { ai = i; draw(); });
  el.append(ctrlB, out, cap); draw();
});
