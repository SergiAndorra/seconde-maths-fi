'use strict';
/* ============ Déclic 2de : moteur ============ */
const APP = { name: 'Déclic 2de', key: 'declic2de.v1' };
const CH = [];          // chapitres
const CO = {};          // notions (concepts)
const WG = {};          // widgets visuels
const chapter = o => CH.push(Object.assign({ bloc: 1, level: '2de' }, o));
const concept = o => { CO[o.id] = Object.assign({ prereq: [], lesson: [], qs: [] }, o); };
const widget = (name, fn) => { WG[name] = fn; };

/* ---------- mise en forme mathématique ---------- */
const F = (a, b) => `<span class="frac"><span>${a}</span><span>${b}</span></span>`;
const R = x => `<span class="sqrt">√<span>${x}</span></span>`;
const NUC = (A, Z, X) => `<span class="nuc"><span class="az"><span>${A}</span><span>${Z}</span></span><span>${X}</span></span>`;
const M = x => `<span class="m">${x}</span>`;
const FX = x => `<span class="formula">${x}</span>`;
function nf(x, d) {
  if (typeof x !== 'number') return String(x);
  let s = d === undefined ? String(+x.toPrecision(12)) : x.toFixed(d);
  if (s.includes('e')) return s;
  const neg = s.startsWith('-'); if (neg) s = s.slice(1);
  let [i, f] = s.split('.');
  if (i.length > 4) i = i.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return (neg ? '−' : '') + i + (f ? ',' + f : '');
}
const sgn = x => (x < 0 ? '− ' + nf(-x) : '+ ' + nf(x));          // « + 3 » / « − 3 »
const par = x => (x < 0 ? '(' + nf(x) + ')' : nf(x));              // parenthèses si négatif

/* ---------- hasard ---------- */
const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pick = a => a[Math.floor(Math.random() * a.length)];
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };

/* ---------- dates ---------- */
function today() { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
function addDays(s, n) { const [y, m, d] = s.split('-').map(Number); const t = new Date(y, m - 1, d + n); return t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0'); }
function dayDiff(a, b) { const p = s => { const [y, m, d] = s.split('-').map(Number); return Date.UTC(y, m - 1, d); }; return Math.round((p(b) - p(a)) / 864e5); }

/* ---------- sauvegarde ---------- */
const INTERVALS = [0, 1, 2, 4, 8, 16, 30];
function freshState() { return { v: 1, created: today(), c: {}, skip: {}, days: {}, lastSubj: 'mix' }; }
function loadState() { try { const s = localStorage.getItem(APP.key); if (s) { const o = JSON.parse(s); if (o && o.v === 1) return o; } } catch (e) { } return freshState(); }
let S = loadState();
let storageOK = true;
function save() { try { localStorage.setItem(APP.key, JSON.stringify(S)); storageOK = true; } catch (e) { storageOK = false; } }
function rec(id) { return S.c[id] || (S.c[id] = { b: 0, d: null, n: 0, ok: 0, ko: 0, l: null, qi: [] }); }
function status(id) { const r = S.c[id]; if (!r || !r.n) return 'new'; if (r.b >= 3) return 'ok'; if (r.b === 0) return 'weak'; return 'learn'; }
const STATUS_LABEL = { new: 'pas encore vue', learn: 'en cours', weak: 'à retravailler', ok: 'maîtrisée' };
function recentlyMastered(id) { const r = S.c[id]; return !!(r && r.b >= 2 && r.l && dayDiff(r.l, today()) <= 21); }
function markResult(id, ok) {
  const r = rec(id), t = today();
  r.n++; r.l = t;
  if (ok) { r.ok++; r.b = Math.min(r.b + 1, INTERVALS.length - 1); } else { r.ko++; r.b = 0; }
  r.d = addDays(t, ok ? INTERVALS[r.b] : 1);
  const d = S.days[t] || (S.days[t] = { n: 0, ok: 0 }); d.n++; if (ok) d.ok++;
  save();
}
function streak() {
  let t = today(), n = 0;
  if (!(S.days[t] && S.days[t].n)) t = addDays(t, -1);
  while (S.days[t] && S.days[t].n) { n++; t = addDays(t, -1); }
  return n;
}
const chOf = cid => CH.find(c => c.id === CO[cid].ch);
const subjOf = cid => chOf(cid).subj;
const isCollege = cid => chOf(cid).level === 'college';
const skippedConcept = cid => !!S.skip[CO[cid].ch];
const title = cid => CO[cid].title;
function chapterReady(ch) { return Object.values(CO).some(c => c.ch === ch.id && c.qs.length); }
function conceptsOf(chId) { return Object.values(CO).filter(c => c.ch === chId); }

/* ---------- DOM ---------- */
function h(tag, props, ...kids) {
  const e = document.createElement(tag);
  if (props) for (const k in props) {
    const v = props[k];
    if (k === 'class') e.className = v; else if (k === 'html') e.innerHTML = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
    else if (k === 'style') e.style.cssText = v; else if (v !== false && v != null) e.setAttribute(k, v);
  }
  for (const c of kids.flat()) if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(c));
  return e;
}
const NS = 'http://www.w3.org/2000/svg';
function sv(tag, attrs, parent) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) {
    const v = attrs[k];
    if (k === 'text') e.textContent = v;
    else if ((k === 'fill' || k === 'stroke') && String(v).includes('var(')) e.style[k] = v;
    else e.setAttribute(k, v);
  }
  if (parent) parent.appendChild(e);
  return e;
}
function svgRoot(w, hgt, parent) { return sv('svg', { viewBox: `0 0 ${w} ${hgt}`, 'font-family': 'inherit' }, parent); }
function slider(ctrl, label, min, max, step, val, onInput, fmt) {
  const out = h('span', { class: 'readout' });
  const inp = h('input', { type: 'range', min, max, step, value: val });
  const upd = () => { out.innerHTML = fmt ? fmt(+inp.value) : nf(+inp.value); onInput(+inp.value); };
  inp.addEventListener('input', upd);
  ctrl.append(h('label', null, h('span', { html: label }), inp, out));
  setTimeout(upd, 0);
  return inp;
}
function wbtns(parent, items, onPick, initial) {
  const box = h('div', { class: 'wbtns' });
  const bs = items.map((it, i) => { const b = h('button', { class: 'wbtn' + (i === (initial || 0) ? ' on' : ''), html: it, onclick: () => { bs.forEach(x => x.classList.remove('on')); b.classList.add('on'); onPick(i); } }); box.append(b); return b; });
  parent.append(box);
  return bs;
}
let CLEANUPS = [], MARK = 0;
// arrête les animations de l’écran précédent, garde celles créées pour le nouvel écran
function cleanup() { const old = CLEANUPS.slice(0, MARK); CLEANUPS = CLEANUPS.slice(MARK); old.forEach(f => { try { f(); } catch (e) { } }); MARK = CLEANUPS.length; }
function onFrame(fn) { let id, alive = true; const loop = t => { if (!alive) return; fn(t); id = requestAnimationFrame(loop); }; id = requestAnimationFrame(loop); CLEANUPS.push(() => { alive = false; cancelAnimationFrame(id); }); }
function renderWidget(spec) {
  const box = h('div', { class: 'widget' });
  const fn = WG[spec.type];
  if (!fn) { box.textContent = '[visuel manquant : ' + spec.type + ']'; return box; }
  try { fn(box, spec); } catch (e) { console.error(e); box.textContent = 'Erreur dans le visuel.'; }
  return box;
}
function toast(msg) { const t = h('div', { class: 'toast', html: msg }); document.body.append(t); setTimeout(() => t.remove(), 2800); }
const app = () => document.getElementById('app');
function screen(...nodes) { cleanup(); const a = app(); a.innerHTML = ''; a.append(...nodes.filter(Boolean)); window.scrollTo(0, 0); }

/* ---------- questions ---------- */
function buildQ(cid) {
  const c = CO[cid], r = rec(cid);
  let idxs = c.qs.map((_, i) => i).filter(i => !r.qi.includes(i));
  if (!idxs.length) idxs = c.qs.map((_, i) => i);
  const i = pick(idxs);
  r.qi = [i].concat(r.qi).slice(0, Math.min(2, c.qs.length - 1));
  const raw = c.qs[i];
  const q = typeof raw === 'function' ? raw() : raw;
  const choices = q.keep ? q.c.slice() : shuffle(q.c);
  return Object.assign({}, q, { c: choices });
}

/* ---------- séance ---------- */
let SES = null, CUR = null;
function startSession(subj, focus, pool, back) {
  SES = { subj, target: pool ? (pool.length === 1 ? 5 : 8) : 10, answered: 0, correct: 0, stack: [], asked: new Set(), worked: new Set(), lessons: 0, alt: 0, pool: pool || null, cnt: {}, last: null, back: back || null };
  S.lastSubj = subj; save();
  if (focus) ask(focus, 'normal'); else nextTask();
}
function candidatesFor(subj) {
  const t = today(), avail = cid => !skippedConcept(cid) && !SES.asked.has(cid) && CO[cid].qs.length && subjOf(cid) === subj;
  const all = Object.keys(CO).filter(avail);
  const due = all.filter(id => S.c[id] && S.c[id].n && S.c[id].d <= t).sort((a, b) => (S.c[a].d < S.c[b].d ? -1 : S.c[a].d > S.c[b].d ? 1 : S.c[a].b - S.c[b].b));
  const order = CH.filter(c => c.subj === subj && c.level === '2de');
  let fresh = null;
  for (const ch of order) { if (S.skip[ch.id]) continue; const f = Object.keys(CO).find(id => CO[id].ch === ch.id && avail(id) && !(S.c[id] && S.c[id].n)); if (f) { fresh = f; break; } }
  const weak = all.filter(id => S.c[id] && S.c[id].n && !isCollege(id)).sort((a, b) => S.c[a].b - S.c[b].b || (S.c[a].l < S.c[b].l ? -1 : 1));
  return { due, fresh, weak };
}
function chooseConcept() {
  if (SES.pool) {
    const t = today();
    let ids = SES.pool.filter(id => CO[id] && CO[id].qs.length);
    if (ids.length > 1) ids = ids.filter(id => id !== SES.last);
    const score = id => { const r = S.c[id]; return (SES.cnt[id] || 0) * 100 + (!r || !r.n ? 0 : r.d <= t ? 10 + r.b : 20 + r.b) + Math.random(); };
    return ids.sort((a, b) => score(a) - score(b))[0] || null;
  }
  const subs = SES.subj === 'mix' ? (SES.alt++ % 2 ? ['pc', 'math'] : ['math', 'pc']) : [SES.subj];
  for (const s of subs) {
    const { due, fresh, weak } = candidatesFor(s);
    const preferNew = SES.answered % 2 === 1;
    if (preferNew && fresh) return fresh;
    if (due.length) return due[0];
    if (fresh) return fresh;
    if (weak.length && S.c[weak[0]].b < 3) return weak[0];
  }
  return null;
}
function nextTask() {
  if (SES.answered >= SES.target && !SES.stack.length) return summary();
  const cid = chooseConcept();
  if (!cid) return summary(true);
  ask(cid, 'normal');
}
function topBar(extra) {
  const pct = SES ? Math.min(100, Math.round(100 * SES.answered / SES.target)) : 0;
  return h('div', { class: 'topbar' },
    h('button', { class: 'iconbtn', 'aria-label': 'Accueil', onclick: () => { if (!SES || SES.answered === 0 || confirm('Arrêter la séance ? Ta progression est déjà enregistrée.')) home(); } }, '⌂'),
    h('div', { class: 'progress' }, h('div', { style: `width:${pct}%` })), extra || null);
}
function subjTag(cid) {
  const ch = chOf(cid); const cls = ch.level === 'college' ? 'college' : ch.subj;
  const lab = ch.level === 'college' ? 'Bases du collège' : (ch.subj === 'math' ? 'Maths' : 'Physique-chimie');
  return h('span', { class: 'tag ' + cls }, lab + ' · ' + CO[cid].title);
}
function ask(cid, mode, pre) {
  SES.asked.add(cid); SES.worked.add(cid);
  SES.cnt[cid] = (SES.cnt[cid] || 0) + 1; if (mode === 'normal') SES.last = cid;
  const q = buildQ(cid);
  CUR = { cid, mode, q };
  const card = h('div', { class: 'card' });
  if (pre) card.append(h('div', { class: 'fb info', html: pre }));
  card.append(subjTag(cid), h('div', { class: 'qtext', html: q.q }));
  if (q.w) card.append(renderWidget(q.w));
  const choices = h('div', { class: 'choices' });
  const btns = q.c.map((c, i) => h('button', { class: 'choice', html: c.t, onclick: () => answer(i) }));
  choices.append(...btns);
  card.append(choices);
  const foot = h('div', { class: 'qfoot' });
  foot.append(h('button', { class: 'btn ghost', onclick: () => answer('idk') }, 'Je ne sais pas'));
  if (mode === 'normal' && !isCollege(cid) && !SES.pool) foot.append(h('button', { class: 'btn ghost', onclick: notYet }, 'Pas encore vu en classe'));
  card.append(foot);
  CUR.btns = btns; CUR.foot = foot; CUR.card = card;
  screen(topBar(), card);
}
function notYet() {
  const ch = chOf(CUR.cid);
  S.skip[ch.id] = true; save();
  toast(`Chapitre « ${ch.title} » mis de côté. Tu pourras le réactiver dans Réglages.`);
  SES.asked.add(CUR.cid);
  nextTask();
}
function firstWeakPrereq(cid) { return (CO[cid].prereq || []).find(p => CO[p] && !recentlyMastered(p) && !skippedConcept(p)); }
function answer(i) {
  if (CUR.done) return; CUR.done = true;
  const { cid, mode, q } = CUR;
  const idk = i === 'idk';
  const ch = idk ? null : q.c[i];
  const ok = !!(ch && ch.ok);
  markResult(cid, ok);
  SES.answered++; if (ok) SES.correct++;
  CUR.btns.forEach((b, j) => { b.disabled = true; if (q.c[j].ok) b.classList.add('ok'); else if (j === i) b.classList.add('ko'); else b.classList.add('dim'); });
  CUR.foot.remove();
  const next = decide(ok, ch, idk);
  const fb = h('div', { class: 'fb ' + (ok ? 'ok' : 'ko') });
  if (ok) {
    fb.append(h('h3', null, pick(['Bravo !', 'Exact !', 'Bien joué !', 'C’est ça !'])));
    if (q.exp) fb.append(h('p', { html: q.exp }));
  } else {
    fb.append(h('h3', null, idk ? 'Pas de souci, on va regarder ça ensemble.' : 'Pas tout à fait.'));
    if (ch && ch.why) fb.append(h('p', { html: ch.why }));
    const good = q.c.find(c => c.ok);
    fb.append(h('p', { html: 'La bonne réponse : <b>' + good.t + '</b>' }));
    if (q.exp) fb.append(h('p', { class: 'muted', html: q.exp }));
  }
  if (next.msg) fb.append(h('div', { class: 'cause' }, h('span', { class: 'ico' }, next.ico || '🔎'), h('p', { html: next.msg })));
  fb.append(h('button', { class: 'btn accent wide', style: 'margin-top:10px', onclick: () => go(next) }, next.label || 'Continuer'));
  CUR.card.append(fb);
  fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function decide(ok, ch, idk) {
  const { cid, mode } = CUR, st = SES.stack;
  if (ok) {
    if (mode === 'diag') {
      const parent = st.pop();
      return { type: 'lesson', cid: parent, ico: '💡', msg: `Cette base est acquise. La difficulté est donc dans « ${title(parent)} » : je te l’explique en images.`, label: 'Voir l’explication' };
    }
    if ((mode === 'after' || mode === 'retry') && st.length) {
      const parent = st.pop();
      return { type: 'ask', cid: parent, mode: 'retry', ico: '↩️', msg: `« ${title(cid)} » est réglé. Revenons à « ${title(parent)} ».` };
    }
    return { type: 'next' };
  }
  if (mode === 'after') {
    SES.stack = [];
    return { type: 'next', ico: '📅', msg: 'Ce n’est pas grave : cette notion reviendra demain, et la leçon reste disponible dans « Ma carte ».' };
  }
  if (mode === 'retry') return { type: 'lesson', cid, ico: '💡', msg: 'Regardons maintenant cette notion elle-même, en images.', label: 'Voir l’explication' };
  let cause = idk ? firstWeakPrereq(cid) : (ch && ch.cause);
  if (cause && cause !== cid && CO[cause] && CO[cause].qs.length && st.length < 3 && !st.includes(cause) && !recentlyMastered(cause) && !skippedConcept(cause)) {
    st.push(cid);
    return { type: 'ask', cid: cause, mode: 'diag', msg: `Ce type d’erreur vient souvent d’une base : <b>${title(cause)}</b>. Vérifions-la avec une question rapide.` };
  }
  return { type: 'lesson', cid, ico: '💡', msg: 'Je t’explique cette notion en images.', label: 'Voir l’explication' };
}
function go(n) {
  if (n.type === 'next') return nextTask();
  if (n.type === 'ask') return ask(n.cid, n.mode, n.pre);
  if (n.type === 'lesson') return lesson(n.cid, () => ask(n.cid, 'after', 'À toi : une question pour vérifier.'));
}

/* ---------- leçon ---------- */
function lesson(cid, done, fromMap) {
  const c = CO[cid]; let k = 0;
  if (SES && !fromMap) SES.lessons++;
  rec(cid).ls = today(); save();
  const show = () => {
    const st = c.lesson[k];
    const card = h('div', { class: 'card lesson-step' });
    card.append(subjTag(cid));
    if (st.h) card.append(h('h2', { html: st.h }));
    if (st.t) card.append(h('div', { html: st.t }));
    if (st.w) card.append(renderWidget(st.w));
    if (st.t2) card.append(h('div', { html: st.t2 }));
    const dots = h('div', { class: 'dots' }, c.lesson.map((_, i) => h('span', { class: i === k ? 'on' : '' })));
    const nav = h('div', { class: 'row' });
    if (k > 0) nav.append(h('button', { class: 'btn ghost', onclick: () => { k--; show(); } }, '← Retour'));
    nav.append(h('div', { class: 'spacer' }));
    if (k < c.lesson.length - 1) nav.append(h('button', { class: 'btn accent', onclick: () => { k++; show(); } }, 'Suivant →'));
    else nav.append(h('button', { class: 'btn accent', onclick: done }, fromMap ? 'Terminé' : 'J’ai compris → question'));
    screen(fromMap ? h('div', { class: 'topbar' }, h('button', { class: 'iconbtn', onclick: done }, '←'), h('b', null, 'Leçon')) : topBar(), card, dots, nav);
  };
  show();
}

/* ---------- bilan ---------- */
function summary(empty) {
  const n = SES.answered, ok = SES.correct;
  const card = h('div', { class: 'card' });
  card.append(h('div', { class: 'sum-star' }, n === 0 ? '🌱' : ok / Math.max(n, 1) >= .7 ? '🌟' : '💪'));
  card.append(h('h1', { style: 'text-align:center' }, empty && n === 0 ? 'Tout est à jour !' : 'Séance terminée'));
  if (n) card.append(h('p', { style: 'text-align:center', html: `${ok} bonne${ok > 1 ? 's' : ''} réponse${ok > 1 ? 's' : ''} sur ${n} · ${SES.lessons} explication${SES.lessons > 1 ? 's' : ''} vue${SES.lessons > 1 ? 's' : ''}` }));
  if (empty) card.append(h('p', { class: 'muted', style: 'text-align:center' }, 'Il n’y a plus de nouvelle notion disponible pour cette matière aujourd’hui. Réactive des chapitres dans Réglages ou reviens demain pour les révisions.'));
  const list = h('div', { class: 'cpills', style: 'justify-content:center;margin:12px 0' });
  SES.worked.forEach(id => list.append(h('span', { class: 'cpill s-' + ({ new: 'new', learn: 'learn', weak: 'weak', ok: 'ok' })[status(id)] }, CO[id].title)));
  card.append(list);
  card.append(h('p', { class: 'small muted', style: 'text-align:center' }, 'Les notions ratées reviendront demain, les autres un peu plus tard : c’est en revoyant régulièrement qu’on retient.'));
  const row = h('div', { class: 'row' });
  const ses = SES;
  if (!empty) row.append(h('button', { class: 'btn ghost', style: 'flex:1', onclick: () => { SES = ses; SES.target = SES.answered + 5; nextTask(); } }, 'Encore 5 questions'));
  if (ses.back) row.append(h('button', { class: 'btn ghost', style: 'flex:1', onclick: ses.back }, 'Retour aux thèmes'));
  row.append(h('button', { class: 'btn accent', style: 'flex:1', onclick: home }, 'Accueil'));
  card.append(row);
  SES = null;
  screen(card);
}

/* ---------- accueil ---------- */
function counts(subj) {
  const ids = Object.keys(CO).filter(id => subjOf(id) === subj && !isCollege(id) && CO[id].qs.length);
  const ok = ids.filter(id => status(id) === 'ok').length;
  return { total: ids.length, ok };
}
function home() {
  SES = null;
  const t = today(), d = S.days[t] || { n: 0, ok: 0 };
  const m = counts('math'), p = counts('pc');
  const due = Object.keys(S.c).filter(id => CO[id] && S.c[id].n && S.c[id].d <= t && !skippedConcept(id)).length;
  const hero = h('div', { class: 'card' },
    h('h1', null, 'Déclic ', h('span', { style: 'color:var(--accent)' }, '2de')),
    h('p', { class: 'muted' }, 'Maths et physique-chimie de seconde, en images. Une séance courte par jour : 10 à 15 minutes.'),
    h('div', { class: 'row', style: 'margin-top:12px' },
      h('div', { class: 'stat' }, h('b', null, String(streak())), h('span', { class: 'small muted' }, 'jour(s) d’affilée')),
      h('div', { class: 'stat' }, h('b', null, String(d.n)), h('span', { class: 'small muted' }, 'questions aujourd’hui')),
      h('div', { class: 'stat' }, h('b', null, String(due)), h('span', { class: 'small muted' }, 'révisions prêtes'))));
  const subs = h('div', { class: 'subjects' },
    h('button', { class: 'subj mix', onclick: () => startSession('mix') }, h('b', null, 'Séance du jour'), h('span', null, 'Maths + physique-chimie')),
    h('button', { class: 'subj math', onclick: () => startSession('math') }, h('b', null, 'Maths'), h('span', null, `${m.ok}/${m.total} notions maîtrisées`)),
    h('button', { class: 'subj pc', onclick: () => startSession('pc') }, h('b', null, 'Physique-chimie'), h('span', null, `${p.ok}/${p.total} notions maîtrisées`)));
  const themesBtn = h('button', { class: 'subj themes', onclick: () => themes() }, h('b', null, '📚 Réviser par thème'), h('span', null, 'Choisis un chapitre vu en classe : vecteurs, solutions, fonctions…'));
  const nav = h('div', { class: 'row', style: 'margin-top:12px' },
    h('button', { class: 'btn ghost', style: 'flex:1', onclick: () => map('math') }, '🗺️ Ma carte'),
    h('button', { class: 'btn ghost', style: 'flex:1', onclick: settings }, '⚙️ Réglages'),
    h('button', { class: 'btn ghost', style: 'flex:1', onclick: help }, '❓ Mode d’emploi'));
  const warn = storageOK ? null : h('div', { class: 'fb ko' }, 'Attention : ce navigateur n’enregistre pas la progression (navigation privée ?). Ouvre l’application dans Safari normal ou depuis l’écran d’accueil.');
  screen(hero, warn, subs, h('div', { style: 'margin-top:12px' }, themesBtn), nav);
}

/* ---------- carte ---------- */
function map(subj) {
  subj = subj || 'math';
  const tabs = h('div', { class: 'row' },
    h('button', { class: 'btn small ' + (subj === 'math' ? 'blue' : 'ghost'), onclick: () => map('math') }, 'Maths'),
    h('button', { class: 'btn small ' + (subj === 'pc' ? 'blue' : 'ghost'), onclick: () => map('pc') }, 'Physique-chimie'));
  const legend = h('div', { class: 'legend' }, ['new', 'learn', 'weak', 'ok'].map(s => h('span', { class: 'cpill s-' + s }, STATUS_LABEL[s])));
  const body = h('div');
  const groups = [['2de', 'Programme de seconde'], ['college', 'Bases du collège (utilisées par l’application quand il le faut)']];
  for (const [b, lab] of groups) {
    const chs = CH.filter(c => c.subj === subj && c.level === b);
    if (!chs.length) continue;
    const card = h('div', { class: 'card' }, h('h2', null, lab));
    for (const ch of chs) {
      const ready = chapterReady(ch);
      const div = h('div', { class: 'chapter ' + (ch.level === 'college' ? 'college' : subj) });
      div.append(h('div', { class: 'row' }, h('b', null, ch.title),
        !ready ? h('span', { class: 'tag college' }, 'bientôt') : null,
        S.skip[ch.id] ? h('span', { class: 'tag college' }, 'pas encore vu en classe') : null));
      if (ready) {
        const pills = h('div', { class: 'cpills' });
        conceptsOf(ch.id).forEach(c => pills.append(h('button', { class: 'cpill s-' + status(c.id), onclick: () => sheet(c.id, () => map(subj)) }, c.title)));
        div.append(pills);
      } else if (ch.summary) div.append(h('div', { class: 'small muted' }, ch.summary));
      card.append(div);
    }
    body.append(card);
  }
  screen(h('div', { class: 'topbar' }, h('button', { class: 'iconbtn', onclick: home }, '⌂'), h('h1', null, 'Ma carte')), tabs, h('div', { class: 'card' }, legend), body);
}
function sheet(cid, back) {
  const r = S.c[cid];
  const card = h('div', { class: 'card' }, subjTag(cid), h('h2', null, CO[cid].title),
    h('p', null, 'État : ', h('b', null, STATUS_LABEL[status(cid)])),
    r && r.n ? h('p', { class: 'small muted' }, `${r.ok} bonne(s) réponse(s), ${r.ko} erreur(s). Prochaine révision : ${r.d <= today() ? 'aujourd’hui' : r.d.split('-').reverse().join('/')}.`) : null,
    CO[cid].prereq.length ? h('p', { class: 'small muted' }, 'S’appuie sur : ' + CO[cid].prereq.filter(p => CO[p]).map(p => CO[p].title).join(' · ')) : null,
    h('div', { class: 'row', style: 'margin-top:12px' },
      h('button', { class: 'btn ghost', style: 'flex:1', onclick: () => lesson(cid, () => sheet(cid, back), true) }, 'Voir la leçon'),
      h('button', { class: 'btn accent', style: 'flex:1', onclick: () => startNotion(cid, back) }, 'M’entraîner')));
  screen(h('div', { class: 'topbar' }, h('button', { class: 'iconbtn', onclick: back }, '←'), h('b', null, 'Notion')), card);
}
function unskip(chId) { if (S.skip[chId]) { delete S.skip[chId]; save(); } }
function startChapter(ch, back) { unskip(ch.id); SES = null; startSession(ch.subj, null, conceptsOf(ch.id).filter(c => c.qs.length).map(c => c.id), back); }
function startNotion(cid, back) { unskip(CO[cid].ch); SES = null; startSession(subjOf(cid), null, [cid], back); }

/* ---------- réviser par thème ---------- */
let THEME_OPEN = { subj: null, ch: null };
function themes() {
  const back = () => themes();
  const body = h('div');
  for (const [subj, lab] of [['math', 'Maths'], ['pc', 'Physique-chimie']]) {
    const isOpen = THEME_OPEN.subj === subj;
    const list = h('div', { class: 'acc-body', style: isOpen ? '' : 'display:none' });
    const chev = h('span', { class: 'chev' }, isOpen ? '▾' : '▸');
    const head = h('button', { class: 'acc-head ' + subj }, h('span', null, lab), chev);
    head.onclick = () => { const show = list.style.display === 'none'; list.style.display = show ? '' : 'none'; chev.textContent = show ? '▾' : '▸'; THEME_OPEN.subj = show ? subj : null; };
    CH.filter(c => c.subj === subj && c.level === '2de').forEach(ch => list.append(themeRow(ch, back)));
    body.append(h('div', { class: 'card acc' }, head, list));
  }
  screen(h('div', { class: 'topbar' }, h('button', { class: 'iconbtn', onclick: home }, '⌂'), h('h1', null, 'Réviser par thème')),
    h('p', { class: 'muted' }, 'Choisis la matière, puis le chapitre que tu travailles en classe. Tu peux réviser tout le chapitre ou une seule notion.'), body);
}
function themeRow(ch, back) {
  const ready = chapterReady(ch);
  const ids = conceptsOf(ch.id).filter(c => c.qs.length).map(c => c.id);
  const ok = ids.filter(id => status(id) === 'ok').length;
  const row = h('div', { class: 'theme' + (ready ? '' : ' off') });
  const head = h('button', { class: 'theme-head', disabled: !ready },
    h('span', null, ch.title), ready ? h('span', { class: 'small muted' }, `${ok}/${ids.length} maîtrisée${ok > 1 ? 's' : ''}`) : h('span', { class: 'tag college' }, 'bientôt'));
  row.append(head);
  if (ready) {
    const isOpen = THEME_OPEN.ch === ch.id;
    const inner = h('div', { class: 'theme-body', style: isOpen ? '' : 'display:none' },
      h('button', { class: 'btn accent wide', onclick: () => startChapter(ch, back) }, '▶ Tout le chapitre'),
      h('div', { class: 'small muted', style: 'margin:10px 0 4px' }, 'Ou une seule notion (leçon ou entraînement) :'),
      h('div', { class: 'cpills' }, ids.map(id => h('button', { class: 'cpill s-' + status(id), onclick: () => sheet(id, back) }, CO[id].title))));
    head.onclick = () => { const show = inner.style.display === 'none'; inner.style.display = show ? '' : 'none'; THEME_OPEN.ch = show ? ch.id : null; };
    row.append(inner);
  }
  return row;
}

/* ---------- réglages ---------- */
function settings() {
  const chs = h('div', { class: 'card' }, h('h2', null, 'Chapitres déjà vus en classe'),
    h('p', { class: 'small muted' }, 'Désactive un chapitre que tu n’as pas encore étudié : l’application ne te posera pas de questions dessus. Réactive-le quand tu le commences en classe.'));
  for (const subj of ['math', 'pc']) {
    chs.append(h('h3', null, subj === 'math' ? 'Maths' : 'Physique-chimie'));
    CH.filter(c => c.subj === subj && c.level === '2de' && chapterReady(c)).forEach(ch => {
      const tg = h('button', { class: 'toggle' + (S.skip[ch.id] ? '' : ' on'), 'aria-label': ch.title });
      tg.onclick = () => { if (S.skip[ch.id]) delete S.skip[ch.id]; else S.skip[ch.id] = true; save(); tg.classList.toggle('on', !S.skip[ch.id]); };
      chs.append(h('div', { class: 'switch' }, h('span', null, ch.title), tg));
    });
  }
  const code = h('textarea', { readonly: true });
  const backup = h('div', { class: 'card' }, h('h2', null, 'Sauvegarde'),
    h('p', { class: 'small muted' }, 'Ta progression est enregistrée sur cet appareil. Pour la mettre à l’abri ou la transférer, copie le code de sauvegarde et garde-le (dans Notes, par exemple).'),
    h('div', { class: 'row' },
      h('button', { class: 'btn small ghost', onclick: () => { code.value = btoa(unescape(encodeURIComponent(JSON.stringify(S)))); code.select(); try { navigator.clipboard.writeText(code.value); toast('Code copié.'); } catch (e) { } } }, 'Créer le code'),
      h('button', { class: 'btn small ghost', onclick: () => { const v = prompt('Colle ici ton code de sauvegarde :'); if (!v) return; try { const o = JSON.parse(decodeURIComponent(escape(atob(v.trim())))); if (o.v !== 1) throw 0; S = o; save(); toast('Progression restaurée.'); home(); } catch (e) { alert('Code invalide.'); } } }, 'Restaurer un code'),
      h('button', { class: 'btn small ghost', onclick: () => { if (confirm('Effacer toute la progression ?') && confirm('Vraiment ? C’est définitif.')) { S = freshState(); save(); home(); } } }, 'Tout effacer')),
    code);
  const install = h('div', { class: 'card' }, h('h2', null, 'Installer sur l’iPad'),
    h('p', { html: 'Dans Safari, touche le bouton <b>Partager</b> (le carré avec une flèche), puis <b>Sur l’écran d’accueil</b>. L’application s’ouvrira alors en plein écran, et ta progression sera mieux conservée.' }));
  const about = h('div', { class: 'card small muted', html: 'Programmes suivis : mathématiques de seconde générale et technologique (arrêté du 26-2-2026, BO n° 14 du 2 avril 2026, en vigueur à la rentrée 2026) ; physique-chimie de seconde générale et technologique (arrêté du 17-1-2019, BO spécial n° 1 du 22 janvier 2019).' });
  screen(h('div', { class: 'topbar' }, h('button', { class: 'iconbtn', onclick: home }, '⌂'), h('h1', null, 'Réglages')), chs, backup, install, about);
}
function help() {
  const c = h('div', { class: 'card', html: `
  <h2>Comment ça marche ?</h2>
  <p>1. Choisis une séance. Tu réponds à une dizaine de questions courtes.</p>
  <p>2. Si tu te trompes, l’application cherche <b>d’où vient l’erreur</b> : souvent une base plus ancienne. Elle te pose une question rapide sur cette base pour vérifier.</p>
  <p>3. Elle t’explique alors la notion qui coince <b>avec des images et des animations</b> que tu peux manipuler, puis te repose une question.</p>
  <p>4. Les notions reviennent les jours suivants pour être révisées : le lendemain si tu t’es trompée, puis de plus en plus espacées quand tu réussis.</p>
  <p><b>Je ne sais pas</b> : mieux vaut le dire que deviner, l’application t’aide aussitôt.</p>
  <p><b>Pas encore vu en classe</b> : le chapitre est mis de côté jusqu’à ce que tu le réactives dans Réglages.</p>
  <p><b>Ma carte</b> montre toutes les notions et leur état. Touche une notion pour revoir la leçon ou t’entraîner.</p>` });
  screen(h('div', { class: 'topbar' }, h('button', { class: 'iconbtn', onclick: home }, '⌂'), h('h1', null, 'Mode d’emploi')), c);
}
window.addEventListener('DOMContentLoaded', home);
