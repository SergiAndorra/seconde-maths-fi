'use strict';
/* ============ M6 Vecteurs ============ */
concept({
  id: 'm-vtrans', ch: 'M6', title: 'Translation et vecteurs', prereq: ['cm-coord'],
  lesson: [
    { h: 'Un vecteur, c’est un déplacement', t: `<p>La translation qui transforme A en B est associée au vecteur ${V('AB')}. Un vecteur a une <b>direction</b> (celle de la droite (AB)), un <b>sens</b> (de A vers B) et une <b>norme</b> (la longueur AB).</p>`, w: { type: 'vec', mode: 'translate', ux: 5, uy: 2 } },
    { h: 'Vecteurs égaux et parallélogramme', t: `<p>Deux vecteurs sont <b>égaux</b> s’ils ont même direction, même sens et même norme : c’est le même déplacement, dessiné à deux endroits.</p><p class="formula">${V('AB')} = ${V('CD')} ⟺ ABDC est un parallélogramme</p><p>⚠ Attention à l’ordre des lettres : A → B → D → C (on « tourne » autour de la figure).</p><p>${V('BA')} est l’<b>opposé</b> de ${V('AB')} : même direction, même norme, sens contraire. Le vecteur nul ${V('AA')} = ${V('0')} correspond à « ne pas bouger ».</p>` }],
  qs: [
    Q(`Les vecteurs ${V('AB')} et ${V('BA')} ont…`, 'la même direction et la même norme, mais des sens opposés', [['exactement les mêmes caractéristiques : ils sont égaux', `${V('AB')} va de A vers B, ${V('BA')} de B vers A : les sens sont opposés.`], ['des directions différentes', 'Ils sont portés par la même droite (AB) : même direction.'], ['des normes différentes', 'La longueur AB est égale à la longueur BA.']]),
    Q(`On sait que ${V('AB')} = ${V('DC')}. Quel quadrilatère est un parallélogramme ?`, 'ABCD', [['ABDC', `ABDC est un parallélogramme quand ${V('AB')} = ${V('CD')}. Ici c’est ${V('DC')}.`], ['ACBD', 'Dessine-le : A → B, puis on revient de C vers D avec le même déplacement.'], ['On ne peut rien dire', 'L’égalité de deux vecteurs donne toujours un parallélogramme (éventuellement aplati).']]),
    Q(`La translation de vecteur ${V('u')} transforme A en A’ et B en B’. Alors…`, `${V('AA’')} = ${V('BB’')}`, [[`${V('AA’')} = ${V('B’B')}`, 'Les deux points se déplacent dans le même sens : de B vers B’, pas de B’ vers B.'], [`${V('AB’')} = ${V('BA’')}`, 'Le déplacement de chaque point est le vecteur u : AA’ et BB’.'], ['A’ = B’', 'Deux points différents ont des images différentes.']]),
    Q(`Le vecteur ${V('AA')} est…`, 'le vecteur nul (norme 0)', [['impossible à définir', 'Il correspond à un déplacement nul : c’est le vecteur nul.'], ['égal au vecteur AB', 'AB a une norme non nulle si A ≠ B.'], ['un vecteur de norme 1', 'Aller de A à A, c’est ne pas bouger : norme 0.']]),
    Q('Dans le quadrilatère ABCD, si ABCD est un parallélogramme, alors…', `${V('AB')} = ${V('DC')}`, [[`${V('AB')} = ${V('CD')}`, `${V('CD')} va de C vers D : sens opposé à ${V('AB')}.`], [`${V('AB')} = ${V('AD')}`, 'Ces deux côtés n’ont pas la même direction.'], [`${V('AC')} = ${V('BD')}`, 'Les diagonales ne sont pas parallèles.']])]
});
concept({
  id: 'm-vsom', ch: 'M6', title: 'Somme de vecteurs et relation de Chasles', prereq: ['m-vtrans'],
  lesson: [
    { h: 'Enchaîner deux déplacements', t: '<p>Additionner deux vecteurs, c’est enchaîner les translations : on met le début du second au bout du premier.</p>', w: { type: 'vec', mode: 'sum', ux: 4, uy: 2, vx: 3, vy: -3 } },
    { h: 'Relation de Chasles', t: `<p class="formula">${V('AB')} + ${V('BC')} = ${V('AC')}</p><p>La « lettre du milieu » doit être la même : B à la fin du premier, B au début du second.</p><p>Astuce : on peut changer l’ordre d’une somme. ${V('AB')} + ${V('CA')} = ${V('CA')} + ${V('AB')} = ${V('CB')}.</p><p>Soustraire, c’est ajouter l’opposé : ${V('AB')} − ${V('AC')} = ${V('AB')} + ${V('CA')} = ${V('CB')}.</p><p><b>Règle du parallélogramme</b> : si ABCD est un parallélogramme, ${V('AB')} + ${V('AD')} = ${V('AC')}.</p>` }],
  qs: [
    () => { const L = shuffle(['A', 'B', 'C', 'D', 'E', 'M', 'N', 'P']).slice(0, 3); const [a, b, c] = L; return Q(`${V(a + b)} + ${V(b + c)} = ?`, V(a + c), [[V(c + a), 'Le résultat va du point de départ ' + a + ' au point d’arrivée ' + c + '.'], [V(b + b), 'On garde le départ du premier et l’arrivée du second.'], [V(a + b), 'Il faut tenir compte du second déplacement.']]); },
    Q(`Simplifie : ${V('AB')} + ${V('CA')}`, V('CB'), [[V('BC'), 'On réordonne : CA + AB = CB (de C à B), pas de B à C.'], [V('AC'), 'Les lettres du milieu doivent se suivre : CA + AB.'], [V('0'), 'Ce n’est nul que si C = B.']]),
    Q(`${V('AB')} − ${V('AC')} = ?`, V('CB'), [[V('BC'), 'AB − AC = AB + CA = CA + AB = CB.'], [V('0'), 'Les deux vecteurs ne sont pas égaux en général.'], [V('AB') + ' + ' + V('AC'), 'Soustraire, c’est ajouter l’opposé : −AC = CA.']]),
    Q(`ABCD est un parallélogramme. ${V('AB')} + ${V('AD')} = ?`, V('AC'), [[V('BD'), 'Règle du parallélogramme : la somme est la diagonale issue de A.'], [V('DB'), 'La somme part de A.'], [V('CA'), 'Le sens va de A vers C.']]),
    () => { const ux = nz(-5, 5), uy = nz(-5, 5), vx = nz(-5, 5), vy = nz(-5, 5); return Q(`${V('u')}(${nf(ux)} ; ${nf(uy)}) et ${V('v')}(${nf(vx)} ; ${nf(vy)}). Coordonnées de ${V('u')} + ${V('v')} ?`, `(${nf(ux + vx)} ; ${nf(uy + vy)})`, [[`(${nf(ux - vx)} ; ${nf(uy - vy)})`, 'Pour la somme, on additionne les coordonnées.', 'cm-rel'], [`(${nf(ux * vx)} ; ${nf(uy * vy)})`, 'On additionne, on ne multiplie pas.'], [`(${nf(ux + uy)} ; ${nf(vx + vy)})`, 'On additionne les abscisses entre elles, puis les ordonnées entre elles.']]); }]
});
concept({
  id: 'm-vcoord', ch: 'M6', title: 'Coordonnées d’un vecteur, distance et milieu', prereq: ['m-vtrans', 'cm-coord', 'cm-rel', 'm-rac'],
  lesson: [
    { h: 'Lire le déplacement', t: `<p>Dans un repère, ${V('AB')} a pour coordonnées <b>(x<sub>B</sub> − x<sub>A</sub> ; y<sub>B</sub> − y<sub>A</sub>)</b> : « arrivée moins départ ». Déplace A et B :</p>`, w: { type: 'vec', mode: 'coord', xa: -4, ya: -2, xb: 3, yb: 2 } },
    { h: 'Norme, distance et milieu', t: `<p>Dans un repère orthonormé, si ${V('u')}(x ; y), sa norme est ${R('x² + y²')} (théorème de Pythagore).</p><p>Distance : AB = ${R('(x<sub>B</sub> − x<sub>A</sub>)² + (y<sub>B</sub> − y<sub>A</sub>)²')}.</p><p>Milieu M de [AB] : M(${F('x<sub>A</sub> + x<sub>B</sub>', 2)} ; ${F('y<sub>A</sub> + y<sub>B</sub>', 2)}) : on fait la moyenne des coordonnées.</p>`, w: { type: 'steps', lines: ['A(1 ; 2) et B(4 ; 6)', 'AB(4 − 1 ; 6 − 2) = (3 ; 4)', 'AB = √(3² + 4²) = √25 = 5', 'Milieu : M((1 + 4)/2 ; (2 + 6)/2) = (2,5 ; 4)'] } }],
  qs: [
    () => { const xa = ri(-5, 5), ya = ri(-5, 5), xb = xa + nz(-4, 4), yb = ya + nz(-4, 4); return Q(`A(${nf(xa)} ; ${nf(ya)}) et B(${nf(xb)} ; ${nf(yb)}). Coordonnées de ${V('AB')} ?`, `(${nf(xb - xa)} ; ${nf(yb - ya)})`, [[`(${nf(xa - xb)} ; ${nf(ya - yb)})`, 'C’est « arrivée moins départ » : x<sub>B</sub> − x<sub>A</sub>.'], [`(${nf(xa + xb)} ; ${nf(ya + yb)})`, 'On soustrait les coordonnées.'], [`(${nf(xb - xa)} ; ${nf(ya - yb)})`, 'Même règle pour l’ordonnée : y<sub>B</sub> − y<sub>A</sub>.', 'cm-rel'], [`(${nf(xb + xa)} ; ${nf(yb - ya)})`, 'Pour l’abscisse aussi, on soustrait.'], [`(${nf(yb - ya)} ; ${nf(xb - xa)})`, 'L’abscisse (horizontale) s’écrit en premier.'], [`(${nf(xb - xa + 1)} ; ${nf(yb - ya)})`, 'Recompte : x<sub>B</sub> − x<sub>A</sub>.', 'cm-rel']]); },
    () => { const [a, b, c] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10]]), sx = pick([1, -1]), sy = pick([1, -1]); return Q(`Norme de ${V('u')}(${nf(sx * a)} ; ${nf(sy * b)}) dans un repère orthonormé ?`, String(c), [[String(a + b), 'La norme n’est pas la somme des coordonnées : ‖u‖ = √(x² + y²).'], [String(c * c), 'Il faut encore prendre la racine carrée.', 'm-rac'], [nf(Math.abs(sx * a + sy * b)), 'On utilise le théorème de Pythagore : √(x² + y²).']]); },
    () => { const xa = ri(-5, 5), ya = ri(-5, 5), xb = xa + 2 * nz(-3, 3), yb = ya + 2 * nz(-3, 3); return Q(`A(${nf(xa)} ; ${nf(ya)}) et B(${nf(xb)} ; ${nf(yb)}). Coordonnées du milieu de [AB] ?`, `(${nf((xa + xb) / 2)} ; ${nf((ya + yb) / 2)})`, [[`(${nf((xb - xa) / 2)} ; ${nf((yb - ya) / 2)})`, 'Pour le milieu, on additionne les coordonnées avant de diviser par 2.'], [`(${nf(xa + xb)} ; ${nf(ya + yb)})`, 'Il faut diviser par 2 (moyenne).'], [`(${nf((xa + ya) / 2)} ; ${nf((xb + yb) / 2)})`, 'On fait la moyenne des abscisses, puis celle des ordonnées.'], [`(${nf((ya + yb) / 2)} ; ${nf((xa + xb) / 2)})`, 'L’abscisse s’écrit en premier.'], [`(${nf((xa + xb) / 2 + 1)} ; ${nf((ya + yb) / 2)})`, 'Refais le calcul : (x<sub>A</sub> + x<sub>B</sub>) ÷ 2.']]); },
    () => { const [a, b, c] = pick([[3, 4, 5], [4, 3, 5], [6, 8, 10], [5, 12, 13]]), xa = ri(-3, 2), ya = ri(-3, 2); return Q(`A(${nf(xa)} ; ${nf(ya)}) et B(${nf(xa + a)} ; ${nf(ya + b)}). Distance AB ?`, String(c), [[String(a + b), 'AB = √((x<sub>B</sub> − x<sub>A</sub>)² + (y<sub>B</sub> − y<sub>A</sub>)²).'], [String(c * c), 'N’oublie pas la racine carrée.', 'm-rac'], [nf(+Math.sqrt((2 * xa + a) ** 2 + (2 * ya + b) ** 2).toFixed(2)), 'On utilise les différences des coordonnées, pas leurs sommes.']]); }]
});
concept({
  id: 'm-vcol', ch: 'M6', title: 'Produit par un réel et colinéarité', prereq: ['m-vcoord', 'cm-frac-op'],
  lesson: [
    { h: 'Multiplier un vecteur par k', t: '<p>k u a la même direction que u. Si k &gt; 0 : même sens ; si k &lt; 0 : sens opposé. Sa norme est multipliée par |k|. En coordonnées, on multiplie chaque coordonnée par k.</p>', w: { type: 'vec', mode: 'scalar', ux: 2, uy: 1, k: 2 } },
    { h: 'Colinéarité et déterminant', t: `<p>Deux vecteurs sont <b>colinéaires</b> s’ils ont la même direction (l’un est un multiple de l’autre).</p><p class="formula">det(${V('u')}, ${V('v')}) = x y’ − y x’ ; colinéaires ⟺ det = 0</p>`, w: { type: 'vec', mode: 'det', ux: 2, uy: 1, vx: 4, vy: 2 } },
    { h: 'À quoi ça sert ?', t: `<p><b>Alignement</b> : A, B, C sont alignés ⟺ ${V('AB')} et ${V('AC')} sont colinéaires.</p><p><b>Parallélisme</b> : (AB) // (CD) ⟺ ${V('AB')} et ${V('CD')} sont colinéaires.</p>`, w: { type: 'steps', lines: ['A(1 ; 1), B(3 ; 2), C(7 ; 4) sont-ils alignés ?', 'AB(2 ; 1) et AC(6 ; 3)', 'det(AB, AC) = 2 × 3 − 1 × 6 = 0', 'Les vecteurs sont colinéaires : A, B et C sont alignés.'] } }],
  qs: [
    () => { const x = nz(-4, 4), y = nz(-4, 4), k = pick([-3, -2, 2, 3, 4]); return Q(`${V('u')}(${nf(x)} ; ${nf(y)}). Coordonnées de ${nf(k)}${V('u')} ?`, `(${nf(k * x)} ; ${nf(k * y)})`, [[`(${nf(k + x)} ; ${nf(k + y)})`, 'On multiplie chaque coordonnée par ' + nf(k) + ' (on n’ajoute pas).'], [`(${nf(k * x)} ; ${nf(y)})`, 'Les deux coordonnées sont multipliées.'], [`(${nf(-k * x)} ; ${nf(-k * y)})`, 'Attention au signe.', 'cm-rel']]); },
    () => { const x = nz(-4, 4), y = nz(-4, 4), col = Math.random() < .5, k = pick([2, 3, -2]), x2 = col ? k * x : k * x + pick([-1, 1]), y2 = k * y, d = x * y2 - y * x2; return Q(`${V('u')}(${nf(x)} ; ${nf(y)}) et ${V('v')}(${nf(x2)} ; ${nf(y2)}) sont-ils colinéaires ?`, col ? `Oui : det = ${par(x)} × ${par(y2)} − ${par(y)} × ${par(x2)} = 0` : `Non : det = ${par(x)} × ${par(y2)} − ${par(y)} × ${par(x2)} = ${nf(d)} ≠ 0`, col ? [[`Non : det = ${par(x)} × ${par(x2)} − ${par(y)} × ${par(y2)} = ${nf(x * x2 - y * y2)}`, 'Le déterminant est x y’ − y x’ : on croise.'], ['Non, car ils n’ont pas la même norme', 'Des vecteurs colinéaires peuvent avoir des normes différentes.'], ['On ne peut pas savoir sans figure', 'Le calcul du déterminant suffit.']] : [[`Oui : det = ${par(x)} × ${par(x2)} − ${par(y)} × ${par(y2)} = ${nf(x * x2 - y * y2)}`, 'Le déterminant est x y’ − y x’ : on croise les coordonnées.'], ['Oui, car leurs ordonnées sont proportionnelles', 'Il faut que les deux coordonnées soient multipliées par le même nombre.'], ['On ne peut pas savoir sans figure', 'Le calcul du déterminant suffit.']]); },
    Q('Les points A, B et C sont alignés si et seulement si…', `${V('AB')} et ${V('AC')} sont colinéaires`, [[`${V('AB')} = ${V('AC')}`, 'Ce serait vrai seulement si B = C.'], ['AB = AC', 'Ça veut dire que A est équidistant de B et C, pas qu’ils sont alignés.'], [`${V('AB')} + ${V('AC')} = ${V('0')}`, 'Ça signifie que A est le milieu de [BC] : un cas particulier.']]),
    Q(`Par rapport à ${V('u')}, le vecteur −2${V('u')}…`, 'a la même direction, le sens opposé et une norme deux fois plus grande', [['a une direction perpendiculaire', 'Un multiple de u garde la même direction.'], ['a le même sens et une norme deux fois plus petite', 'Le signe − change le sens ; la norme est multipliée par 2.'], ['a une norme négative', 'Une norme est toujours positive : ‖−2u‖ = 2‖u‖.']]),
    () => { const x = nz(-5, 5), y = nz(-5, 5), x2 = nz(-5, 5), y2 = nz(-5, 5); return Q(`det(${V('u')}, ${V('v')}) avec ${V('u')}(${nf(x)} ; ${nf(y)}) et ${V('v')}(${nf(x2)} ; ${nf(y2)}) ?`, nf(x * y2 - y * x2), [[nf(x * x2 - y * y2), 'det = x y’ − y x’ : on multiplie en croix.'], [nf(x * y2 + y * x2), 'C’est une soustraction : x y’ − y x’.'], [nf(y * x2 - x * y2), 'L’ordre compte : x y’ − y x’.', 'cm-rel'], [nf(x * y2), 'Il faut encore soustraire y × x’.'], [nf(x * y2 - y * x2 + 2), 'Refais le calcul des deux produits.', 'cm-rel']]); }]
});

/* ============ M5 Fonctions de référence, variations, signe ============ */
const T1 = { x: ['−3', '1', '4'], f: [['2', 'h'], ['−5', 'l'], ['6', 'h']] };
concept({
  id: 'm-fref', ch: 'M5', title: 'Fonctions de référence', prereq: ['m-fcourbe', 'cm-pow', 'm-rac'],
  lesson: [
    { h: 'Cinq courbes à reconnaître', t: '<p>Choisis une fonction, puis déplace x pour lire des images.</p>', w: { type: 'refs' } },
    { h: 'Comparer x, x² et x³', t: '<p>Pour 0 &lt; x &lt; 1 : x³ &lt; x² &lt; x (exemple : 0,5³ = 0,125 &lt; 0,5² = 0,25 &lt; 0,5).</p><p>Pour x &gt; 1 : x &lt; x² &lt; x³ (exemple : 2 &lt; 4 &lt; 8).</p><p>Résoudre x² ≤ 9 : sur la parabole, les points sous la droite y = 9 ont une abscisse entre −3 et 3, donc S = [−3 ; 3].</p>', w: { type: 'graph', mode: 'ineq', fns: [{ f: x => x * x, label: 'y = x²' }], xmin: -5, xmax: 5, ymin: -2, ymax: 12, k: 9, ylstep: 2 } }],
  qs: [
    Q('Quelle fonction n’est pas définie en 0 ?', 'la fonction inverse', [['la fonction racine carrée', '√0 = 0 : elle est définie en 0 (mais pas pour x &lt; 0).'], ['la fonction carré', '0² = 0.'], ['la fonction cube', '0³ = 0.']]),
    Q('La fonction racine carrée est définie sur…', '[0 ; +∞[', [[']0 ; +∞[', '√0 = 0 existe : 0 est inclus.'], ['ℝ', 'On ne peut pas prendre la racine carrée d’un nombre négatif.'], [']−∞ ; 0]', 'C’est l’inverse : seulement les nombres positifs ou nuls.']]),
    () => { const opts = [['x ↦ x²', x => x * x, -1, 9], ['x ↦ 1/x', x => 1 / x, -5, 5], ['x ↦ √x', x => (x >= 0 ? Math.sqrt(x) : NaN), -1, 4], ['x ↦ x³', x => x ** 3, -8, 8], ['x ↦ |x|', Math.abs, -1, 5]]; const i = ri(0, 4), [lab, f, y0, y1] = opts[i]; return Q('Quelle fonction est représentée ?', lab, shuffle(opts.filter((_, j) => j !== i)).slice(0, 3).map(o => [o[0], 'Revois la forme de cette courbe dans la leçon.']), { w: { type: 'graph', fns: [{ f }], xmin: -4, xmax: 4, ymin: y0, ymax: y1, ylstep: y1 - y0 > 12 ? 2 : 1 } }); },
    Q('Pour 0 &lt; x &lt; 1, on a…', 'x³ &lt; x² &lt; x', [['x &lt; x² &lt; x³', 'C’est vrai pour x &gt; 1. Teste x = 0,5 : 0,5² = 0,25 et 0,5³ = 0,125.'], ['x² &lt; x &lt; x³', 'Teste x = 0,5.'], ['x = x² = x³', 'Seulement pour x = 0 ou x = 1.']]),
    Q('Solutions de x² ≤ 9 ?', '[−3 ; 3]', [[']−∞ ; 3]', '(−4)² = 16 &gt; 9 : les nombres très négatifs ne conviennent pas.', 'm-eq1'], ['[0 ; 3]', '(−2)² = 4 ≤ 9 : les nombres négatifs entre −3 et 0 conviennent aussi.'], [']−3 ; 3[', '≤ : −3 et 3 sont solutions (leur carré vaut 9).', 'm-int']]),
    Q('Solutions de 1/x = 4 ?', `x = ${F(1, 4)}`, [['x = 4', '1/4 ≠ 4 : on cherche x tel que 1 ÷ x = 4.'], ['x = −4', '1/(−4) = −0,25.'], ['aucune', 'x = 0,25 convient : 1 ÷ 0,25 = 4.']])]
});
concept({
  id: 'm-var', ch: 'M5', title: 'Variations, tableau de variations, extremums', prereq: ['m-fcourbe'],
  lesson: [
    { h: 'Croissante, décroissante', t: '<p>f est <b>croissante</b> sur un intervalle si, quand x augmente, f(x) augmente (la courbe monte). Elle est <b>décroissante</b> si f(x) diminue (la courbe descend). Le <b>tableau de variations</b> résume tout ça avec des flèches.</p>', w: { type: 'vartab', t: { x: ['−1', '2', '5'], f: [['−5', 'l'], ['4', 'h'], ['−5', 'l']] }, g: { fns: [{ f: x => -(x - 2) * (x - 2) + 4, label: 'f' }], xmin: -1, xmax: 5, ymin: -5, ymax: 5, x: 0 } } },
    { h: 'Lire un tableau', t: '<p>Maximum : la plus grande valeur de f(x) sur l’intervalle ; minimum : la plus petite. On lit la valeur dans la ligne de f, et l’endroit où elle est atteinte dans la ligne de x.</p>' + vtab(T1) + '<p>Ici : minimum −5, atteint en x = 1 ; maximum 6, atteint en x = 4.</p><p>Comparer : f est décroissante sur [−3 ; 1], donc pour −2 &lt; 0 on a f(−2) <b>&gt;</b> f(0) (l’ordre est inversé).</p>' }],
  qs: [
    Q('Sur quel intervalle f est-elle croissante ?', '[−1 ; 2]', [['[2 ; 5]', 'Sur [2 ; 5], la courbe descend : f est décroissante.'], ['[0 ; 4]', 'Les intervalles de variation se lisent sur l’axe des x, pas sur celui des valeurs de f.'], ['[−1 ; 5]', 'La courbe monte puis descend.']], { w: { type: 'graph', fns: [{ f: x => -(x - 2) * (x - 2) + 4, label: 'f' }], xmin: -1, xmax: 5, ymin: -5, ymax: 5 } }),
    Q('D’après ce tableau, compare f(−2) et f(0).' + vtab(T1), 'f(−2) &gt; f(0)', [['f(−2) &lt; f(0)', 'f est décroissante sur [−3 ; 1] : quand x augmente, f(x) diminue. L’ordre est inversé.'], ['f(−2) = f(0)', 'f n’est pas constante sur cet intervalle.'], ['On ne peut pas comparer', '−2 et 0 sont dans le même intervalle où f est décroissante : on peut conclure.']]),
    Q('D’après ce tableau, le minimum de f sur [−3 ; 4] est…' + vtab(T1), '−5, atteint en x = 1', [['1, atteint en x = −5', 'La valeur du minimum se lit dans la ligne de f ; l’endroit (x) dans la première ligne.'], ['−3', '−3 est une borne de l’intervalle des x, pas une valeur de f.'], ['2', '2 est la valeur en x = −3, mais f descend ensuite jusqu’à −5.']]),
    Q('D’après ce tableau, le maximum de f sur [−3 ; 4] est…' + vtab(T1), '6', [['2', 'f(−3) = 2, mais f(4) = 6 est plus grand.'], ['4', '4 est la valeur de x où le maximum est atteint.'], ['1', '1 est une valeur de x.']]),
    Q('La fonction carré est…', 'décroissante sur ]−∞ ; 0], puis croissante sur [0 ; +∞[', [['croissante sur ℝ', '(−3)² = 9 &gt; (−1)² = 1 : sur les négatifs, elle décroît.', 'm-fref'], ['décroissante sur ℝ', '1² &lt; 3² : sur les positifs, elle croît.', 'm-fref'], ['croissante puis décroissante', 'Sa courbe est une parabole « en U » : elle descend puis monte.', 'm-fref']])]
});
concept({
  id: 'm-signe', ch: 'M5', title: 'Signe et tableau de signes', prereq: ['m-faff', 'm-ineq', 'm-eq1'],
  lesson: [
    { h: 'Signe de ax + b', t: '<p>ax + b s’annule en x = −b/a. À droite de cette valeur, il a le <b>signe de a</b> ; à gauche, le signe contraire.</p>' + stab(['−∞', '3', '+∞'], [['2x − 6', ['', '−', '0', '+', '']]]) + '<p>Exemple : 2x − 6 = 0 pour x = 3 ; a = 2 &gt; 0, donc négatif avant 3, positif après.</p>' },
    { h: 'Produit : un tableau de signes', t: '<p>On étudie le signe de chaque facteur, puis on applique la règle des signes dans chaque colonne. Bouge les racines :</p>', w: { type: 'signtab', r1: -3, r2: 1 } },
    { h: 'Quotient : valeur interdite', t: `<p>Pour ${F('x + 2', 'x − 5')}, le dénominateur ne doit pas être nul : 5 est une <b>valeur interdite</b> (double barre ‖ dans le tableau). Le quotient a le même signe que le produit (x + 2)(x − 5).</p>` }],
  qs: [
    () => { const r = nz(-6, 6), a = pick([2, 3, -2, -3, 4]), b = -a * r; const e = poly([[a, 'x'], [b, '']]); const good = a > 0 ? `négatif pour x &lt; ${nf(r)}, positif pour x &gt; ${nf(r)}` : `positif pour x &lt; ${nf(r)}, négatif pour x &gt; ${nf(r)}`; const bad = a > 0 ? `positif pour x &lt; ${nf(r)}, négatif pour x &gt; ${nf(r)}` : `négatif pour x &lt; ${nf(r)}, positif pour x &gt; ${nf(r)}`; return Q(`Signe de ${e} ?`, good, [[bad, 'À droite de la valeur d’annulation, ax + b a le signe de a = ' + nf(a) + '.'], [`négatif pour x &lt; ${nf(-r)}, positif pour x &gt; ${nf(-r)}`, e + ' = 0 pour x = ' + nf(r) + '.', 'cm-eq'], ['toujours positif', 'Une fonction affine non constante change de signe.']]); },
    Q('Solutions de (x − 1)(x + 3) ≥ 0 ?', ']−∞ ; −3] ∪ [1 ; +∞[', [['[−3 ; 1]', 'Entre −3 et 1, les deux facteurs sont de signes contraires : le produit est négatif.'], [']−∞ ; −3[ ∪ ]1 ; +∞[', '≥ 0 : les valeurs où le produit est nul (−3 et 1) sont solutions.', 'm-int'], ['[1 ; +∞[', 'Pour x = −4 : (−5)(−1) = 5 ≥ 0. Il y a aussi des solutions à gauche.']]),
    Q(`Valeur interdite de ${F('x + 2', 'x − 5')} ?`, '5', [['−2', 'En x = −2, c’est le numérateur qui est nul : le quotient vaut 0, c’est permis.'], ['−5', 'x − 5 = 0 pour x = 5.', 'cm-eq'], ['aucune', 'On ne peut pas diviser par 0 : x − 5 ≠ 0.']]),
    Q('Solutions de (x − 4)(x + 1) &lt; 0 ?', ']−1 ; 4[', [[']−∞ ; −1[ ∪ ]4 ; +∞[', 'Là, le produit est positif.'], ['[−1 ; 4]', 'Inégalité stricte : en −1 et 4 le produit vaut 0, ce n’est pas &lt; 0.', 'm-int'], [']−4 ; 1[', 'Les facteurs s’annulent en 4 et en −1.', 'cm-eq']])]
});
concept({
  id: 'm-parite', ch: 'M5', title: 'Fonctions paires et impaires', prereq: ['m-fref'],
  lesson: [{ h: 'Symétries', t: '<p>f est <b>paire</b> si f(−x) = f(x) pour tout x : sa courbe est symétrique par rapport à l’axe des ordonnées.</p><p>f est <b>impaire</b> si f(−x) = −f(x) : sa courbe est symétrique par rapport à l’origine.</p><p>L’ensemble de définition doit être symétrique par rapport à 0.</p>', w: { type: 'parity' } }],
  qs: [
    Q('La fonction carré est…', 'paire', [['impaire', '(−x)² = x² : f(−x) = f(x), c’est la définition de paire.'], ['ni paire ni impaire', 'Sa courbe est symétrique par rapport à l’axe des ordonnées.'], ['paire et impaire', 'Seule la fonction nulle est les deux à la fois.']]),
    Q('f(x) = x³ − x est…', 'impaire', [['paire', 'f(−x) = −x³ + x = −(x³ − x) = −f(x).'], ['ni paire ni impaire', 'Calcule f(−x) : (−x)³ − (−x) = −x³ + x.', 'cm-rel'], ['impossible à dire', 'Il suffit de calculer f(−x).']]),
    Q('f(x) = x² + x est…', 'ni paire ni impaire', [['paire', 'f(1) = 2 mais f(−1) = 0 : f(−1) ≠ f(1).'], ['impaire', 'f(−1) = 0 ≠ −f(1) = −2.'], ['paire et impaire', 'f(−1) = 0 et f(1) = 2.']]),
    Q('La courbe d’une fonction impaire est symétrique par rapport…', 'à l’origine du repère', [['à l’axe des ordonnées', 'C’est le cas d’une fonction paire.'], ['à l’axe des abscisses', 'Ce n’est jamais la courbe d’une fonction (sauf la fonction nulle).'], ['à la droite y = x', 'Ce n’est pas la définition.']]),
    Q('f est paire et f(3) = 7. f(−3) = ?', '7', [['−7', 'Ce serait le cas d’une fonction impaire.'], ['3', 'On cherche une image, pas un antécédent.'], ['−3', 'Paire : f(−3) = f(3).']])]
});

/* ============ M7 Logique et ensembles ============ */
concept({
  id: 'm-logprop', ch: 'M7', title: 'Propositions, « et », « ou », négation',
  lesson: [
    { h: 'Vrai ou faux', t: '<p>Une <b>proposition</b> est une phrase mathématique qui est soit vraie, soit fausse.</p>', w: { type: 'truth' } },
    { h: 'Négation et contre-exemple', t: '<p>Négation de « x &gt; 3 » : « x ≤ 3 » (attention, pas « x &lt; 3 »).</p><p>Négation de « A et B » : « non A <b>ou</b> non B ». Négation de « A ou B » : « non A <b>et</b> non B ».</p><p>Pour montrer qu’une phrase « pour tout x… » est fausse, <b>un seul contre-exemple suffit</b>. Mais des exemples ne suffisent jamais à prouver qu’elle est vraie.</p>' }],
  qs: [
    Q('Négation de « x &gt; 3 » ?', '« x ≤ 3 »', [['« x &lt; 3 »', 'Si x = 3, « x &gt; 3 » est fausse : sa négation doit être vraie, donc il faut inclure 3.'], ['« x &gt; −3 »', 'La négation ne change pas le nombre, elle change l’inégalité.'], ['« x ≥ 3 »', 'x ≥ 3 contient les nombres plus grands que 3 : ce n’est pas le contraire.']]),
    Q('« 4 est pair ou 4 est premier » est…', 'vraie', [['fausse, car 4 n’est pas premier', 'En maths, « ou » est vrai dès qu’une des deux est vraie (4 est pair).'], ['ni vraie ni fausse', 'Une proposition est toujours vraie ou fausse.'], ['vraie seulement si 4 est à la fois pair et premier', 'Ça, c’est « et ».']]),
    Q('Pour montrer que « pour tout réel x, x² &gt; x » est fausse, il suffit…', 'de donner un contre-exemple, comme x = 0,5', [['de montrer que c’est vrai pour x = 2', 'Un exemple qui marche ne prouve rien.'], ['de tester beaucoup de valeurs qui marchent', 'Il faut au contraire trouver une valeur où c’est faux.'], ['de prendre x = 3', '3² = 9 &gt; 3 : ça marche, ce n’est pas un contre-exemple.']]),
    Q('Négation de « n est pair et n &gt; 10 » ?', '« n est impair ou n ≤ 10 »', [['« n est impair et n ≤ 10 »', 'La négation de « et » est « ou ».'], ['« n est impair ou n &lt; 10 »', 'La négation de n &gt; 10 est n ≤ 10.'], ['« n est pair et n ≤ 10 »', 'Il faut nier les deux parties et changer « et » en « ou ».']]),
    Q('« x ∈ [2 ; 5] » équivaut à…', '« x ≥ 2 et x ≤ 5 »', [['« x ≥ 2 ou x ≤ 5 »', 'Avec « ou », tous les réels conviennent (par exemple 10 ≥ 2).'], ['« x &gt; 2 et x &lt; 5 »', 'Les crochets sont fermés : 2 et 5 sont inclus.', 'm-int'], ['« x = 2 ou x = 5 »', 'L’intervalle contient tous les réels entre 2 et 5.', 'm-int']])]
});
concept({
  id: 'm-logimp', ch: 'M7', title: 'Implication, réciproque, contraposée', prereq: ['m-logprop'],
  lesson: [{ h: 'Si… alors…', t: '<p>« Si P, alors Q » se note P ⇒ Q.</p><p>Sa <b>réciproque</b> est Q ⇒ P : elle peut être fausse !<br>Sa <b>contraposée</b> est « non Q ⇒ non P » : elle a toujours la même valeur de vérité que P ⇒ Q.</p>', w: { type: 'steps', lines: ['« Si n est multiple de 4, alors n est pair. » → vraie', 'Réciproque : « Si n est pair, alors n est multiple de 4. » → fausse (contre-exemple : 6)', 'Contraposée : « Si n est impair, alors n n’est pas multiple de 4. » → vraie', 'Quand P ⇒ Q et Q ⇒ P sont vraies : équivalence P ⟺ Q.', 'Raisonnement par l’absurde : on suppose le contraire de ce qu’on veut montrer et on aboutit à une contradiction.'] } }],
  qs: [
    Q('Réciproque de « Si un quadrilatère est un carré, alors c’est un rectangle » ?', '« Si un quadrilatère est un rectangle, alors c’est un carré »', [['« Si un quadrilatère n’est pas un rectangle, alors ce n’est pas un carré »', 'Ça, c’est la contraposée.'], ['« Un quadrilatère n’est jamais un carré »', 'La réciproque échange l’hypothèse et la conclusion.'], ['« Si un quadrilatère n’est pas un carré, alors ce n’est pas un rectangle »', 'C’est la contraposée de la réciproque.']], { exp: 'Cette réciproque est fausse : un rectangle n’est pas forcément un carré.' }),
    Q('Contraposée de « Si x = 2, alors x² = 4 » ?', '« Si x² ≠ 4, alors x ≠ 2 »', [['« Si x² = 4, alors x = 2 »', 'Ça, c’est la réciproque.'], ['« Si x ≠ 2, alors x² ≠ 4 »', 'On nie sans échanger : c’est faux (x = −2).'], ['« Si x² ≠ 4, alors x = 2 »', 'Il faut nier aussi la conclusion.']]),
    Q('« Si x² = 4, alors x = 2 » est…', 'fausse : x = −2 est un contre-exemple', [['vraie', '(−2)² = 4 mais −2 ≠ 2.', 'm-eq1'], ['vraie car 2² = 4', 'C’est la réciproque qui est vraie.'], ['ni vraie ni fausse', 'Une proposition est vraie ou fausse.']]),
    Q('On sait que P ⇒ Q est vraie. Alors forcément…', '« non Q ⇒ non P » est vraie', [['Q ⇒ P est vraie', 'La réciproque peut être fausse.'], ['« non P ⇒ non Q » est vraie', 'Ce n’est pas la contraposée ; elle peut être fausse.'], ['P est vraie', 'L’implication ne dit pas si P est vraie.']]),
    Q('Pour démontrer par l’absurde que √2 est irrationnel, on suppose…', 'que √2 est rationnel, et on aboutit à une contradiction', [['que √2 est irrationnel', 'On suppose le contraire de ce qu’on veut montrer.'], ['que √2 ≈ 1,414', 'Une valeur approchée ne démontre rien.'], ['que √2 est un entier', 'On suppose que √2 = p/q, une fraction.']])]
});
concept({
  id: 'm-ensop', ch: 'M7', title: 'Intersection, réunion, complémentaire', prereq: ['m-int'],
  lesson: [
    { h: 'Trois opérations', t: '', w: { type: 'venn' } },
    { h: 'Avec des intervalles', t: '<p>[1 ; 5] ∩ [3 ; 8] = [3 ; 5] (les nombres dans les deux).<br>[1 ; 5] ∪ [3 ; 8] = [1 ; 8] (les nombres dans l’un ou l’autre).<br>Complémentaire de ]−∞ ; 2] dans ℝ : ]2 ; +∞[.</p><p>Nombre d’éléments : Card(A ∪ B) = Card(A) + Card(B) − Card(A ∩ B) (on ne compte pas deux fois ceux qui sont dans les deux).</p>' }],
  qs: [
    Q('[1 ; 5] ∩ [3 ; 8] = ?', '[3 ; 5]', [['[1 ; 8]', 'Ça, c’est la réunion. L’intersection garde les nombres communs.'], [']3 ; 5[', '3 et 5 appartiennent aux deux intervalles.', 'm-int'], ['∅', 'Les intervalles se chevauchent entre 3 et 5.']]),
    () => { const a = ri(-5, 0), b = a + ri(3, 5), c = a + ri(1, 2), d = b + ri(1, 4); return Q(`[${nf(a)} ; ${nf(b)}] ∪ [${nf(c)} ; ${nf(d)}] = ?`, `[${nf(a)} ; ${nf(d)}]`, [[`[${nf(c)} ; ${nf(b)}]`, 'Ça, c’est l’intersection. La réunion regroupe les deux.'], [`[${nf(a)} ; ${nf(b)}]`, 'Il faut ajouter les nombres du second intervalle.'], [`]${nf(a)} ; ${nf(d)}[`, 'Les bornes sont incluses.', 'm-int']]); },
    Q('E = {1 ; 2 ; … ; 10}, A = nombres pairs, B = multiples de 3. A ∩ B = ?', '{6}', [['{2 ; 3 ; 4 ; 6 ; 8 ; 9 ; 10}', 'Ça, c’est A ∪ B.'], ['{3 ; 6 ; 9}', 'C’est B. Il faut être pair ET multiple de 3.'], ['∅', '6 est pair et multiple de 3.']], { w: { type: 'venn' } }),
    Q('Complémentaire de ]−∞ ; 2] dans ℝ ?', ']2 ; +∞[', [['[2 ; +∞[', '2 est déjà dans ]−∞ ; 2] : il n’est pas dans le complémentaire.'], [']−∞ ; 2[', 'Le complémentaire contient les nombres qui ne sont pas dans l’ensemble.'], ['[−2 ; +∞[', 'On ne change pas le signe de la borne.']]),
    Q('Card(A) = 12, Card(B) = 8 et Card(A ∩ B) = 3. Card(A ∪ B) = ?', '17', [['20', 'Les 3 éléments communs ont été comptés deux fois : 12 + 8 − 3.'], ['23', 'On soustrait les éléments communs.'], ['3', 'Ça, c’est l’intersection.']])]
});

/* ============ M8 Information chiffrée ============ */
concept({
  id: 'm-ppp', ch: 'M8', title: 'Proportions et pourcentages de pourcentages', prereq: ['cm-prop'],
  lesson: [{ h: 'Proportion d’une proportion', t: `<p>Proportion : p = ${F('effectif du sous-groupe', 'effectif total')}.</p><p>Un pourcentage d’un pourcentage se calcule en <b>multipliant</b> les proportions.</p>`, w: { type: 'nested', p1: 60, p2: 25 } }],
  qs: [
    Q('Dans un lycée, 60 % des élèves sont des filles, et 25 % des filles font du sport en club. Quelle proportion de tous les élèves sont des filles faisant du sport en club ?', '15 %', [['85 %', 'On ne les additionne pas : on prend 25 % de 60 %.'], ['35 %', 'On multiplie : 0,25 × 0,60.'], ['25 %', '25 % concerne seulement les filles, pas tous les élèves.']]),
    () => { const p1 = pick([20, 40, 50, 60, 80]), p2 = pick([10, 25, 50, 75]); return Q(`${p2} % de ${p1} % = ?`, nf(p1 * p2 / 100) + ' %', [[(p1 + p2) + ' %', 'On multiplie les proportions.'], [nf(p1 * p2) + ' %', p2 + ' % = ' + nf(p2 / 100) + ' : on multiplie par ' + nf(p2 / 100) + ', pas par ' + p2 + '.'], [Math.abs(p1 - p2) + ' %', 'On multiplie les proportions.']]); },
    Q('Dans une classe de 30 élèves, 12 sont demi-pensionnaires. Proportion de demi-pensionnaires ?', '40 %', [['12 %', '12 élèves sur 30 : 12 ÷ 30 = 0,4.'], ['2,5 %', 'C’est 12 ÷ 30, pas 30 ÷ 12.'], ['18 %', '18 est le nombre d’élèves externes.']]),
    Q('Une entreprise compte 240 salariés ; 15 % sont des cadres. Nombre de cadres ?', '36', [['16', '240 ÷ 15 ne donne pas 15 % : on calcule 0,15 × 240.', 'cm-prop'], ['204', '204, c’est le nombre de non-cadres (85 %).'], ['225', 'On ne soustrait pas 15.']])]
});
concept({
  id: 'm-evol', ch: 'M8', title: 'Taux d’évolution et coefficient multiplicateur', prereq: ['cm-prop'],
  lesson: [{ h: 'Trois façons de décrire une évolution', t: `<p>De V₁ à V₂ : variation absolue V₂ − V₁ ; taux d’évolution t = ${F('V₂ − V₁', 'V₁')} ; coefficient multiplicateur CM = ${F('V₂', 'V₁')} = 1 + t.</p><p>Hausse de 15 % ⟺ CM = 1,15. Baisse de 8 % ⟺ CM = 0,92.</p>`, w: { type: 'percent', mode: 'evol', total: 80, p: 15 } }],
  qs: [
    () => { const V1 = pick([40, 50, 80, 120, 200, 250]), t = pick([10, 20, 25, -20, -10, 5, -5, 40]); const V2 = +(V1 * (1 + t / 100)).toFixed(2); return Q(`Une valeur de ${V1} ${t > 0 ? 'augmente' : 'baisse'} de ${Math.abs(t)} %. Nouvelle valeur ?`, nf(V2), [[nf(V1 + t), 'On n’ajoute pas ' + t + ' : on multiplie par ' + nf(1 + t / 100) + '.'], [nf(+(V1 * t / 100).toFixed(2)), 'Ça, c’est la variation, pas la nouvelle valeur.'], [nf(+(V1 * (1 - t / 100)).toFixed(2)), t > 0 ? 'C’est une hausse : on multiplie par 1 + ' + nf(t / 100) + '.' : 'C’est une baisse : on multiplie par 1 − ' + nf(-t / 100) + '.']]); },
    Q('Un prix passe de 80 € à 92 €. Taux d’évolution ?', '+15 %', [['+12 %', '12 €, c’est la variation absolue. On la divise par le prix de départ : 12 ÷ 80.'], ['+13 %', 'On divise par la valeur de départ (80), pas d’arrivée (92).'], ['+1,15 %', '1,15 est le coefficient multiplicateur, soit +15 %.']]),
    Q('Coefficient multiplicateur associé à une baisse de 8 % ?', '0,92', [['0,08', '0,08 est la part retirée ; il reste 1 − 0,08.'], ['1,08', '1,08 correspond à une hausse de 8 %.'], ['−0,08', 'Un coefficient multiplicateur est positif.']]),
    Q('Un coefficient multiplicateur de 1,035 correspond à…', 'une hausse de 3,5 %', [['une hausse de 35 %', '1,035 = 1 + 0,035, soit 3,5 %.'], ['une baisse de 3,5 %', 'Un coefficient plus grand que 1 traduit une hausse.'], ['une hausse de 0,035 %', '0,035 = 3,5 %.']])]
});
concept({
  id: 'm-evsucc', ch: 'M8', title: 'Évolutions successives et réciproques', prereq: ['m-evol'],
  lesson: [{ h: 'On multiplie les coefficients', t: '<p>Évolutions successives : le coefficient global est le <b>produit</b> des coefficients. +10 % puis −10 % : 1,1 × 0,9 = 0,99, soit −1 % (et pas 0 %).</p><p>Évolution réciproque (pour revenir à la valeur de départ) : coefficient 1 ÷ CM.</p>', w: { type: 'evsucc', t1: 10, t2: -10 } }],
  qs: [
    Q('Un prix augmente de 10 %, puis baisse de 10 %. Au total…', 'il a baissé de 1 %', [['il n’a pas changé', '1,1 × 0,9 = 0,99 : les taux ne s’additionnent pas.'], ['il a augmenté de 1 %', '0,99 &lt; 1 : c’est une baisse.'], ['il a baissé de 20 %', '1,1 × 0,9 = 0,99, soit −1 %.']]),
    Q('Une hausse de 20 % suivie d’une hausse de 30 % équivaut à une hausse de…', '56 %', [['50 %', '1,2 × 1,3 = 1,56 : on multiplie les coefficients.'], ['60 %', '1,2 × 1,3 = 1,56.'], ['6 %', '0,2 × 0,3 = 0,06 : il faut multiplier les coefficients 1,2 et 1,3.']]),
    Q('Après une hausse de 25 %, un prix vaut 100 €. Prix de départ ?', '80 €', [['75 €', 'On ne retire pas 25 % du nouveau prix : on divise par 1,25.'], ['125 €', 'Le prix de départ est plus petit que le prix après hausse.'], ['78 €', '100 ÷ 1,25 = 80.']]),
    Q('Une valeur baisse de 20 %. Pour revenir à la valeur de départ, il faut une hausse de…', '25 %', [['20 %', '0,8 × 1,2 = 0,96 : ça ne suffit pas. Il faut 1 ÷ 0,8 = 1,25.'], ['80 %', '0,8 × 1,8 = 1,44 : bien trop.'], ['120 %', 'Le coefficient réciproque est 1 ÷ 0,8 = 1,25, soit +25 %.']]),
    () => { const L = [10, 20, 25, 50, -10, -20, -50], t1 = pick(L), t2 = pick(L), g = +(((1 + t1 / 100) * (1 + t2 / 100) - 1) * 100).toFixed(2); const s = x => (x > 0 ? '+' : '') + nf(x) + ' %'; return Q(`Évolution de ${s(t1)} suivie de ${s(t2)}. Évolution globale ?`, s(g), [[s(t1 + t2), 'On multiplie les coefficients multiplicateurs, on n’additionne pas les taux.'], [s(+(t1 * t2 / 100).toFixed(2)), 'Il faut multiplier les coefficients (1 + t), pas les taux.'], [s(+(g + 10).toFixed(2)), 'Recalcule le produit des coefficients.']]); }]
});

/* ============ M9 Droites et systèmes ============ */
concept({
  id: 'm-dteq', ch: 'M9', title: 'Équation réduite d’une droite', prereq: ['m-faff', 'm-vcoord'],
  lesson: [
    { h: 'y = mx + p', t: '<p>Une droite non parallèle à l’axe des ordonnées a une équation <b>y = mx + p</b> : m est la pente, p l’ordonnée à l’origine. Une droite parallèle à l’axe des ordonnées a une équation <b>x = c</b>.</p>', w: { type: 'graph', mode: 'affine', xmin: -5, xmax: 5, ymin: -5, ymax: 5, m: 2, p: -1 } },
    { h: 'Avec deux points', t: '', w: { type: 'steps', lines: ['A(1 ; 3) et B(3 ; 7)', 'm = (y<sub>B</sub> − y<sub>A</sub>) / (x<sub>B</sub> − x<sub>A</sub>) = (7 − 3) / (3 − 1) = 2', 'y = 2x + p ; A est sur la droite : 3 = 2 × 1 + p, donc p = 1', 'Équation : y = 2x + 1. Vérification avec B : 2 × 3 + 1 = 7 ✓'] } }],
  qs: [
    () => { const m = nz(-3, 3), p = nz(-4, 4), xa = ri(-2, 1), xb = xa + ri(1, 3), ya = m * xa + p, yb = m * xb + p; return Q(`Équation de la droite (AB) avec A(${nf(xa)} ; ${nf(ya)}) et B(${nf(xb)} ; ${nf(yb)}) ?`, `y = ${poly([[m, 'x'], [p, '']])}`, [[`y = ${poly([[m, 'x'], [ya, '']])}`, 'p n’est pas l’ordonnée de A (sauf si x<sub>A</sub> = 0) : on calcule p avec y<sub>A</sub> = m x<sub>A</sub> + p.'], [`y = ${poly([[-m, 'x'], [p, '']])}`, 'Attention au signe de la pente : (y<sub>B</sub> − y<sub>A</sub>)/(x<sub>B</sub> − x<sub>A</sub>).', 'm-faff'], [`y = ${poly([[m, 'x'], [-p, '']])}`, 'Recalcule p avec les coordonnées de A.', 'cm-eq']]); },
    Q('La droite d’équation x = 3 est…', 'parallèle à l’axe des ordonnées', [['parallèle à l’axe des abscisses', 'Ce serait y = 3.'], ['la droite passant par l’origine de pente 3', 'Ce serait y = 3x.'], ['impossible : il manque y', 'Tous les points d’abscisse 3 conviennent, quel que soit y.']]),
    Q('A(2 ; 7) appartient-il à la droite d’équation y = 3x + 1 ?', 'Oui, car 3 × 2 + 1 = 7', [['Non, car 3 × 7 + 1 ≠ 2', 'On remplace x par l’abscisse (2), pas par l’ordonnée.', 'm-fcourbe'], ['Non, car 2 ≠ 7', 'On vérifie si y<sub>A</sub> = 3 x<sub>A</sub> + 1.'], ['On ne peut pas savoir sans tracer', 'Le calcul suffit.']]),
    Q('Pente de la droite d’équation y = 4 − 2x ?', '−2', [['4', '4 est l’ordonnée à l’origine.'], ['2', 'Attention au signe : −2x.'], ['−2x', 'La pente est un nombre : le coefficient de x.']])]
});
concept({
  id: 'm-dtcart', ch: 'M9', title: 'Équation cartésienne et vecteur directeur', prereq: ['m-dteq', 'm-vcol'],
  lesson: [{ h: 'ax + by + c = 0', t: `<p>Toute droite a une équation <b>cartésienne</b> ax + by + c = 0. Un vecteur directeur est alors ${V('u')}(−b ; a).</p><p>Pour y = mx + p, un vecteur directeur est (1 ; m).</p><p>Méthode : M(x ; y) est sur la droite passant par A et dirigée par ${V('u')} ⟺ det(${V('AM')}, ${V('u')}) = 0.</p>`, w: { type: 'steps', lines: ['Droite passant par A(1 ; 2), de vecteur directeur u(3 ; 1)', 'AM(x − 1 ; y − 2)', 'det(AM, u) = (x − 1) × 1 − (y − 2) × 3 = 0', 'x − 1 − 3y + 6 = 0, soit x − 3y + 5 = 0'] } }],
  qs: [
    Q('Un vecteur directeur de la droite 2x − 3y + 5 = 0 ?', '(3 ; 2)', [['(2 ; −3)', 'Ce sont les coefficients a et b ; un vecteur directeur est (−b ; a).'], ['(−3 ; 2)', '−b = −(−3) = 3.', 'cm-rel'], ['(2 ; 3)', 'Un vecteur directeur est (−b ; a) = (3 ; 2).']]),
    Q('Un vecteur directeur de la droite y = 5x − 1 ?', '(1 ; 5)', [['(5 ; −1)', 'Pour y = mx + p, un vecteur directeur est (1 ; m).'], ['(5 ; 1)', 'Quand x augmente de 1, y augmente de 5 : (1 ; 5).'], ['(−1 ; 5)', 'Ce vecteur n’est pas colinéaire à (1 ; 5).']]),
    Q(`Équation cartésienne de la droite passant par A(1 ; 2) et dirigée par ${V('u')}(3 ; 1) ?`, 'x − 3y + 5 = 0', [['3x + y − 5 = 0', 'Pour ce vecteur (−b ; a) = (3 ; 1), il faut b = −3 et a = 1.'], ['x − 3y − 5 = 0', 'Vérifie avec A : 1 − 6 − 5 ≠ 0.'], ['x + 3y − 7 = 0', 'Le vecteur directeur serait (−3 ; 1), pas (3 ; 1).']]),
    Q('B(4 ; 3) appartient-il à la droite x − 3y + 5 = 0 ?', 'Oui : 4 − 9 + 5 = 0', [['Non : 4 − 3 + 5 ≠ 0', 'Il faut multiplier y par 3 : 3 × 3 = 9.'], ['Non : 3 − 12 + 5 ≠ 0', 'x vaut 4 et y vaut 3, pas l’inverse.', 'cm-coord'], ['On ne peut pas savoir', 'On remplace x et y par les coordonnées de B.']])]
});
concept({
  id: 'm-dtpos', ch: 'M9', title: 'Droites parallèles ou sécantes, systèmes', prereq: ['m-dteq', 'cm-eq'],
  lesson: [
    { h: 'Même pente ou pas ?', t: '<p>Deux droites y = mx + p et y = m’x + p’ sont <b>parallèles</b> si m = m’. Sinon, elles sont <b>sécantes</b> : leur point d’intersection est la solution du système.</p>', w: { type: 'sys' } },
    { h: 'Résoudre un système', t: '', w: { type: 'steps', lines: ['{ x + y = 7 ; x − y = 1 }', 'Combinaison : on additionne les deux équations → 2x = 8, donc x = 4', 'On remplace : 4 + y = 7, donc y = 3', 'Solution : (4 ; 3). Vérification : 4 − 3 = 1 ✓', 'Autre méthode (substitution) : on isole y dans une équation et on remplace dans l’autre.'] } }],
  qs: [
    Q('Les droites y = 2x + 1 et y = 2x − 3 sont…', 'parallèles', [['sécantes en (0 ; 1)', 'Elles ont la même pente (2) : elles ne se coupent pas.'], ['confondues', 'Les ordonnées à l’origine sont différentes (1 et −3).'], ['perpendiculaires', 'Même pente : même direction.']]),
    () => { const x = nz(-3, 3); let y = nz(-3, 3); if (y === x) y = -x; const m1 = nz(-3, 3); let m2 = nz(-3, 3); if (m2 === m1) m2 = -m1 || 1; const p1 = y - m1 * x, p2 = y - m2 * x; return Q(`Point d’intersection des droites y = ${poly([[m1, 'x'], [p1, '']])} et y = ${poly([[m2, 'x'], [p2, '']])} ?`, `(${nf(x)} ; ${nf(y)})`, [[`(${nf(y)} ; ${nf(x)})`, 'D’abord l’abscisse, ensuite l’ordonnée.', 'cm-coord'], [`(${nf(x)} ; ${nf(p1)})`, nf(p1) + ' est l’ordonnée à l’origine de la 1re droite.'], [`(${nf(-x)} ; ${nf(y)})`, 'Résous m₁x + p₁ = m₂x + p₂ en faisant attention aux signes.', 'cm-eq']]); },
    () => { const x = ri(1, 6); let y = nz(-5, 5); if (y === x) y = -y; const s = x + y, d = x - y; return Q(`Solution du système { x + y = ${nf(s)} ; x − y = ${nf(d)} } ?`, `(${nf(x)} ; ${nf(y)})`, [[`(${nf(y)} ; ${nf(x)})`, 'Vérifie la 2e équation : x − y = ' + nf(d) + '.'], [`(${nf(s)} ; ${nf(d)})`, 'On additionne les équations : 2x = ' + nf(s + d) + '.'], [`(${nf(s + d)} ; ${nf(s - d)})`, 'Il reste à diviser par 2.']]); },
    Q('Le système { 2x + y = 5 ; 4x + 2y = 3 } a…', 'aucune solution', [['une seule solution', 'La 2e équation équivaut à 2x + y = 1,5 : impossible d’avoir à la fois 2x + y = 5.'], ['une infinité de solutions', 'Il faudrait 4x + 2y = 10 pour que les droites soient confondues.'], ['deux solutions', 'Deux droites distinctes se coupent en un point au plus.']])]
});

/* ============ M10 Statistiques ============ */
concept({
  id: 'm-stmoy', ch: 'M10', title: 'Moyenne', prereq: ['cm-prio'],
  lesson: [
    { h: 'Le point d’équilibre', t: `<p>Moyenne : ${F('somme des valeurs', 'effectif total')}. Moyenne pondérée : ${F('n₁x₁ + n₂x₂ + …', 'n₁ + n₂ + …')}.</p>`, w: { type: 'dotplot' } },
    { h: 'Propriétés', t: '<p><b>Linéarité</b> : si on ajoute b à toutes les valeurs, la moyenne augmente de b ; si on les multiplie par a, la moyenne est multipliée par a.</p><p>Séries regroupées en classes : on prend le <b>centre</b> de chaque classe ([10 ; 20[ → 15).</p>' }],
  qs: [
    () => { const n = 5, base = ri(8, 14), vals = Array.from({ length: n }, () => base + ri(-4, 4)); const s = vals.reduce((a, b) => a + b, 0); return Q(`Moyenne de la série : ${vals.join(' ; ')} ?`, nf(+(s / n).toFixed(2)), [[nf(median(vals)), median(vals) === +(s / n).toFixed(2) ? '' : 'Ça, c’est la médiane.'], [nf(s), 'Il faut diviser la somme par l’effectif (' + n + ').'], [nf(+(s / (n - 1)).toFixed(2)), 'On divise par le nombre de valeurs : ' + n + '.'], [nf(+(s / n + 1).toFixed(2)), 'Recalcule la somme : ' + s + '.']]); },
    Q('Notes : 12 (coefficient 2), 15 (coefficient 1), 9 (coefficient 3). Moyenne ?', '11', [['12', '(12 + 15 + 9) ÷ 3 = 12 ne tient pas compte des coefficients.'], ['66', 'Il faut diviser par la somme des coefficients : 6.'], ['22', 'On divise par 2 + 1 + 3 = 6.']]),
    Q('On ajoute 2 points à toutes les notes d’une série. La moyenne…', 'augmente de 2', [['ne change pas', 'Toutes les valeurs augmentent de 2 : la moyenne aussi.'], ['est multipliée par 2', 'On ajoute 2, on ne multiplie pas.'], ['augmente de 2 × l’effectif', 'Linéarité de la moyenne : elle augmente de 2.']]),
    Q('20 élèves ont 12 de moyenne et 10 élèves ont 15. Moyenne des 30 élèves ?', '13', [['13,5', '(12 + 15) ÷ 2 ne tient pas compte des effectifs différents.'], ['27', 'Il faut une moyenne pondérée : (20 × 12 + 10 × 15) ÷ 30.'], ['12', 'Les élèves à 15 font monter la moyenne.']]),
    Q('Classes [0 ; 10[ (effectif 4) et [10 ; 20[ (effectif 6). Estimation de la moyenne ?', '11', [['10', 'On utilise les centres des classes : (4 × 5 + 6 × 15) ÷ 10.'], ['15', 'Il y a aussi des valeurs dans la première classe.'], ['5', 'On pondère par les effectifs.']])]
});
concept({
  id: 'm-stmed', ch: 'M10', title: 'Médiane, quartiles, boîte à moustaches', prereq: ['m-stmoy'],
  lesson: [
    { h: 'Partager la série', t: '<p>On range les valeurs dans l’ordre croissant. La <b>médiane</b> partage la série en deux moitiés. Q₁ est la plus petite valeur telle qu’au moins 25 % des valeurs lui sont inférieures ou égales ; Q₃ : au moins 75 %. Écart interquartile : Q₃ − Q₁.</p>', w: { type: 'boxplot' } },
    { h: 'Exemple', t: '', w: { type: 'steps', lines: ['11 valeurs rangées : 3 ; 5 ; 6 ; 8 ; 9 ; 11 ; 12 ; 14 ; 15 ; 17 ; 20', 'Médiane : la 6e valeur (5 de chaque côté) → 11', 'Q₁ : 25 % de 11 = 2,75 → on prend la 3e valeur → 6', 'Q₃ : 75 % de 11 = 8,25 → on prend la 9e valeur → 15', 'Écart interquartile : 15 − 6 = 9'] } }],
  qs: [
    () => { const vals = shuffle(Array.from({ length: 18 }, (_, i) => i + 2)).slice(0, 7); const s = vals.slice().sort((a, b) => a - b); return Q(`Médiane de la série : ${vals.join(' ; ')} ?`, nf(s[3]), [[nf(vals[3]), 'Il faut d’abord ranger les valeurs dans l’ordre croissant.'], [nf(+mean(vals).toFixed(2)), 'Ça, c’est la moyenne.'], [nf(s[4]), 'Avec 7 valeurs rangées, la médiane est la 4e (3 valeurs de chaque côté).'], [nf(s[2]), 'Avec 7 valeurs rangées, la médiane est la 4e.'], [nf((s[0] + s[6]) / 2), 'La médiane n’est pas le milieu entre la plus petite et la plus grande valeur.']]); },
    Q('Médiane de la série : 2 ; 5 ; 7 ; 10 ; 12 ; 15 ?', '8,5', [['7', 'Avec 6 valeurs, la médiane est entre la 3e et la 4e : (7 + 10) ÷ 2.'], ['10', 'Avec 6 valeurs, on fait la moyenne des deux valeurs du milieu.'], ['8,5 et 9', 'La médiane est un seul nombre.']]),
    Q('Série rangée : 3 ; 5 ; 6 ; 8 ; 9 ; 11 ; 12 ; 14 ; 15 ; 17 ; 20. Premier quartile Q₁ ?', '6', [['5', '25 % de 11 = 2,75 : on prend la 3e valeur.'], ['5,5', 'Q₁ est une valeur de la série.'], ['8', '8 est la 4e valeur.']]),
    Q('Même série : 3 ; 5 ; 6 ; 8 ; 9 ; 11 ; 12 ; 14 ; 15 ; 17 ; 20 (Q₁ = 6, Q₃ = 15). Écart interquartile ?', '9', [['17', '20 − 3 = 17, c’est l’étendue.'], ['21', 'C’est Q₃ − Q₁.'], ['11', '11 est la médiane.']]),
    Q('On remplace la plus grande valeur d’une série par une valeur beaucoup plus grande. Ce qui change le plus…', 'la moyenne', [['la médiane', 'La médiane ne dépend que de la position du milieu.'], ['le premier quartile', 'Q₁ ne dépend pas de la plus grande valeur.'], ['rien', 'La somme augmente, donc la moyenne aussi.']])]
});
concept({
  id: 'm-stet', ch: 'M10', title: 'Écart type et dispersion', prereq: ['m-stmoy'],
  lesson: [
    { h: 'Mesurer l’éparpillement', t: '<p>L’<b>écart type</b> σ mesure la dispersion des valeurs autour de la moyenne : plus il est grand, plus les valeurs sont éloignées de la moyenne. On le calcule avec la calculatrice, un tableur ou Python.</p>', w: { type: 'spread' } },
    { h: 'Bons couples d’indicateurs', t: '<p>On décrit une série avec (moyenne ; écart type) ou (médiane ; écart interquartile).</p><p>Ajouter un même nombre à toutes les valeurs ne change pas σ (on décale tout, sans éparpiller).</p>' }],
  qs: [
    Q('Deux classes ont la même moyenne, 11. Classe A : σ = 1,5 ; classe B : σ = 4. Que peut-on dire ?', 'Les notes de B sont plus dispersées', [['La classe B a de meilleures notes', 'Les moyennes sont égales ; σ décrit seulement la dispersion.'], ['Les notes de A sont plus dispersées', 'Plus σ est grand, plus les valeurs sont dispersées.'], ['Les deux classes ont les mêmes notes', 'Même moyenne ne veut pas dire mêmes notes.']]),
    Q('Si on ajoute 3 à toutes les valeurs d’une série, son écart type…', 'ne change pas', [['augmente de 3', 'Les valeurs sont décalées ensemble : leur éparpillement ne change pas.'], ['est multiplié par 3', 'On ajoute, on ne multiplie pas.'], ['diminue', 'La dispersion reste la même.']]),
    Q('Écart type de la série 5 ; 5 ; 5 ; 5 ?', '0', [['5', 'Toutes les valeurs sont égales à la moyenne : aucune dispersion.'], ['1', 'Les valeurs ne s’écartent pas du tout de la moyenne.'], ['20', '20 est la somme.']]),
    Q('Quel indicateur de dispersion va avec la médiane ?', 'l’écart interquartile', [['l’écart type', 'L’écart type va avec la moyenne.'], ['la moyenne', 'La moyenne est un indicateur de position, pas de dispersion.'], ['le maximum', 'Le maximum seul ne mesure pas la dispersion.']])]
});
const TCROIS = '<table class="simple"><tr><th></th><th>Demi-pensionnaires</th><th>Externes</th><th>Total</th></tr><tr><th>Filles</th><td>88</td><td>22</td><td>110</td></tr><tr><th>Garçons</th><td>36</td><td>54</td><td>90</td></tr><tr><th>Total</th><td>124</td><td>76</td><td>200</td></tr></table>';
concept({
  id: 'm-stcroise', ch: 'M10', title: 'Tableaux croisés et fréquences conditionnelles', prereq: ['cm-prop'],
  lesson: [{ h: 'Deux caractères à la fois', t: TCROIS + `<p><b>Fréquence marginale</b> : dans la population entière. Demi-pensionnaires : ${F(124, 200)} = 62 %.</p><p><b>Fréquence conditionnelle</b> : dans un sous-groupe. Parmi les filles, demi-pensionnaires : ${F(88, 110)} = 80 %.</p><p>⚠ « Parmi les demi-pensionnaires, les filles » : ${F(88, 124)} ≈ 71 %. Ce n’est pas la même chose !</p>` }],
  qs: [
    Q('Fréquence des demi-pensionnaires parmi les filles ?' + TCROIS, '80 %', [['44 %', '88 ÷ 200 : c’est la part des « filles demi-pensionnaires » dans tout le lycée. Parmi les filles, on divise par 110.'], ['71 %', '88 ÷ 124 : c’est la part des filles parmi les demi-pensionnaires.'], ['62 %', 'C’est la fréquence marginale des demi-pensionnaires.']]),
    Q('Fréquence marginale des demi-pensionnaires ?' + TCROIS, '62 %', [['80 %', 'Ça, c’est parmi les filles seulement.'], ['44 %', 'Il faut tous les demi-pensionnaires : 124 sur 200.'], ['124 %', 'Une fréquence est entre 0 et 100 %.']]),
    Q('Parmi les demi-pensionnaires, proportion de filles ?' + TCROIS, 'environ 71 %', [['80 %', '80 % est la proportion de demi-pensionnaires parmi les filles. Ici, on se place parmi les demi-pensionnaires : 88 ÷ 124.'], ['44 %', 'On divise par le nombre de demi-pensionnaires (124).'], ['55 %', '110 ÷ 200 : c’est la part des filles dans tout le lycée.']])]
});

/* ============ M11 Probabilités ============ */
concept({
  id: 'm-prbase', ch: 'M11', title: 'Événements et probabilités', prereq: ['cm-frac-op', 'm-ensop'],
  lesson: [
    { h: 'Le vocabulaire', t: '<p>L’<b>univers</b> Ω est l’ensemble des issues. Un <b>événement</b> est un ensemble d’issues. Une probabilité est toujours entre 0 et 1.</p><p>Si les issues sont équiprobables : P(A) = Card(A) ÷ Card(Ω).</p>', w: { type: 'dice' } },
    { h: 'Règles de calcul', t: `<p>Événement contraire : P(${OV('A')}) = 1 − P(A).</p><p class="formula">P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</p><p>On retire P(A ∩ B) car les issues communes sont comptées deux fois.</p>` }],
  qs: [
    Q('On lance un dé équilibré à 6 faces. Probabilité d’obtenir un nombre pair ?', F(1, 2), [[F(1, 6), 'Il y a 3 issues paires (2, 4, 6) sur 6.'], [F(1, 3), '3 issues sur 6 : 3/6 = 1/2.'], [F(2, 3), 'Les nombres pairs sont 2, 4, 6 : 3 issues.']]),
    () => { const p = pick([0.1, 0.2, 0.25, 0.3, 0.35, 0.6, 0.85]); return Q(`P(A) = ${nf(p)}. P(${OV('A')}) = ?`, nf(+(1 - p).toFixed(2)), [[nf(-p), 'Une probabilité n’est jamais négative : P(Ā) = 1 − P(A).'], [nf(p), 'L’événement contraire a pour probabilité 1 − P(A).'], [nf(+(1 / p).toFixed(2)), 'Ce n’est pas l’inverse : c’est 1 − P(A).']]); },
    Q('P(A) = 0,5 ; P(B) = 0,4 ; P(A ∩ B) = 0,2. P(A ∪ B) = ?', '0,7', [['0,9', 'Les issues de A ∩ B sont comptées deux fois : on retire 0,2.'], ['0,2', 'C’est P(A ∩ B).'], ['1,1', 'Une probabilité ne dépasse jamais 1.']]),
    Q('On lance deux dés équilibrés. Probabilité que la somme fasse 7 ?', F(1, 6), [[F(1, 11), 'Les sommes 2 à 12 ne sont pas équiprobables : il faut compter les 36 issues.'], [F(7, 36), '6 issues donnent 7 : (1;6), (2;5), (3;4), (4;3), (5;2), (6;1).'], [F(1, 12), 'Compte les cases du tableau qui font 7.']], { w: { type: 'dice' } }),
    Q('Une probabilité peut-elle valoir 1,2 ?', 'Non, une probabilité est toujours comprise entre 0 et 1', [['Oui, si l’événement est très probable', 'Un événement certain a une probabilité de 1, pas plus.'], ['Oui, en pourcentage', '1,2 = 120 % : impossible.'], ['Seulement pour une réunion d’événements', 'Même P(A ∪ B) est au plus 1.']])]
});
concept({
  id: 'm-prarbre', ch: 'M11', title: 'Arbres et tableaux (deux épreuves)', prereq: ['m-prbase'],
  lesson: [{ h: 'Multiplier le long d’un chemin', t: '<p>On représente deux épreuves successives par un arbre. La probabilité d’un chemin est le <b>produit</b> des probabilités de ses branches ; pour un événement formé de plusieurs chemins, on <b>additionne</b>.</p><p>Exemple : deux lancers de pièce. P₁ = « Pile au 1er lancer », P₂ = « Pile au 2e lancer ». P(P₁ ∩ P₂) = 0,5 × 0,5 = 0,25.</p>', w: { type: 'tree', pa: 0.5, pba: 0.5, pbn: 0.5, A: 'P₁', B: 'P₂' } }],
  qs: [
    Q('On lance deux fois une pièce équilibrée. Probabilité d’obtenir deux fois Pile ?', F(1, 4), [[F(1, 2), 'Il faut Pile au 1er lancer ET au 2e : 1/2 × 1/2.'], [F(1, 3), 'Les issues PP, PF, FP, FF sont au nombre de 4 (PF et FP sont différentes).'], [F(2, 4), 'Une seule issue sur 4 convient : PP.']]),
    Q('On lance deux fois une pièce équilibrée. Probabilité d’obtenir exactement une fois Pile ?', F(1, 2), [[F(1, 4), 'Deux issues conviennent : PF et FP.'], [F(1, 3), 'Il y a 4 issues équiprobables, dont 2 favorables.'], [F(3, 4), 'FF et PP ne conviennent pas.']]),
    Q('Une urne contient 3 boules rouges et 2 bleues. On tire deux boules avec remise. Probabilité d’avoir deux rouges ?', F(9, 25), [[F(6, 5), 'Une probabilité ne dépasse pas 1 : on multiplie 3/5 × 3/5.'], [F(3, 10), '3/5 × 2/4, c’est sans remise. Ici on remet la boule.'], [F(3, 5), 'Il faut deux rouges : on multiplie par 3/5 une deuxième fois.']]),
    Q('Sur un arbre, P(A) = 0,4 et la branche de A vers B porte 0,5. P(A ∩ B) = ?', '0,2', [['0,9', 'On multiplie le long du chemin, on n’additionne pas.'], ['0,45', 'On multiplie : 0,4 × 0,5.'], ['0,5', '0,5 est P<sub>A</sub>(B), pas P(A ∩ B).']])]
});
concept({
  id: 'm-prcond', ch: 'M11', title: 'Probabilités conditionnelles', prereq: ['m-prarbre', 'm-stcroise'],
  lesson: [
    { h: 'Sachant que…', t: `<p class="formula">P<sub>A</sub>(B) = ${F('P(A ∩ B)', 'P(A)')}</p><p>P<sub>A</sub>(B) se lit « probabilité de B sachant A ». Sur un arbre, ce sont les nombres des branches du 2e niveau.</p>` },
    { h: 'Le piège des faux positifs', t: '<p>Une maladie touche 1 % des gens. Un test est positif chez 99 % des malades, mais aussi chez 5 % des non-malades. Si ton test est positif, quelle est la probabilité d’être malade ?</p>', w: { type: 'tree', pa: 0.01, pba: 0.99, pbn: 0.05, A: 'M', B: 'T', step: 0.01, N: 10000 } }],
  qs: [
    Q('P(A) = 0,5 et P(A ∩ B) = 0,2. P<sub>A</sub>(B) = ?', '0,4', [['0,1', 'On divise P(A ∩ B) par P(A), on ne multiplie pas.'], ['2,5', 'C’est P(A) ÷ P(A ∩ B), à l’envers.'], ['0,7', 'On divise, on n’additionne pas.']]),
    Q('Maladie : 1 % de la population. Test positif chez 99 % des malades et chez 5 % des non-malades. Une personne a un test positif : probabilité qu’elle soit malade ?', 'environ 17 %', [['99 %', '99 % est P<sub>M</sub>(T) : positif sachant malade. On cherche P<sub>T</sub>(M) : malade sachant positif.'], ['1 %', 'Le test positif augmente la probabilité d’être malade.'], ['95 %', 'Sur 10 000 personnes : 99 malades positifs et 495 non-malades positifs. 99 ÷ 594 ≈ 0,17.']], { w: { type: 'tree', pa: 0.01, pba: 0.99, pbn: 0.05, A: 'M', B: 'T', fixed: true, N: 10000 } }),
    Q('P<sub>A</sub>(B) se lit…', '« probabilité de B sachant A »', [['« probabilité de A sachant B »', 'L’événement en indice (A) est celui qu’on sait réalisé.'], ['« probabilité de A et B »', 'Ça, c’est P(A ∩ B).'], ['« probabilité de A ou B »', 'Ça, c’est P(A ∪ B).']]),
    Q('Sur un arbre, le nombre placé sur la branche qui va de A à B est…', 'P<sub>A</sub>(B)', [['P(B)', 'Au 2e niveau, on sait déjà que A est réalisé : c’est une probabilité conditionnelle.'], ['P(A ∩ B)', 'P(A ∩ B) s’obtient en multipliant le long du chemin.'], ['P<sub>B</sub>(A)', 'On part de A pour aller vers B : B sachant A.']])]
});
concept({
  id: 'm-lgn', ch: 'M11', title: 'Loi des grands nombres', prereq: ['m-prbase'],
  lesson: [{ h: 'Fréquence et probabilité', t: '<p>Quand on répète une expérience un grand nombre de fois, la fréquence observée d’un événement se rapproche (sauf exception) de sa probabilité. Sur peu d’essais, elle peut en être loin.</p>', w: { type: 'lln' } }],
  qs: [
    Q('On lance une pièce équilibrée 10 fois et on obtient 7 Pile. Que peut-on dire ?', 'C’est possible : sur peu de lancers, la fréquence varie beaucoup', [['La pièce est forcément truquée', '10 lancers, c’est trop peu pour conclure.'], ['La probabilité de Pile est 0,7', '0,7 est une fréquence observée, pas la probabilité.'], ['C’est impossible', 'Obtenir 7 Pile sur 10 arrive assez souvent par hasard.']]),
    Q('Quand le nombre de lancers devient très grand, la fréquence de Pile…', 'se rapproche de 0,5', [['vaut exactement 0,5', 'Elle s’en approche, sans être forcément égale.'], ['s’éloigne de 0,5', 'C’est l’inverse : elle s’en rapproche.'], ['augmente jusqu’à 1', 'Pile ne sort pas de plus en plus souvent.']]),
    Q('Pour estimer la probabilité qu’une punaise tombe pointe en l’air, on…', 'la lance un grand nombre de fois et on calcule la fréquence', [['suppose que c’est 1/2', 'La punaise n’est pas symétrique : rien n’indique l’équiprobabilité.'], ['la lance une seule fois', 'Une seule expérience ne permet pas d’estimer une probabilité.'], ['compte ses faces', 'Les deux positions ne sont pas équiprobables.']])]
});

/* ============ M12 Échantillonnage et Python ============ */
concept({
  id: 'm-ech', ch: 'M12', title: 'Échantillonnage', prereq: ['m-lgn'],
  lesson: [{ h: 'Fluctuation d’échantillonnage', t: `<p>D’un échantillon à l’autre, la fréquence observée f <b>fluctue</b>. Pour des échantillons de taille n, dans la grande majorité des cas, |f − p| ≤ ${F(1, '√n')}.</p><p>Inversement, la fréquence observée sur un grand échantillon permet d’<b>estimer</b> la proportion p inconnue.</p>`, w: { type: 'sample', n: 100 } }],
  qs: [
    Q('Pour n = 100, 1/√n = ?', '0,1', [['0,01', '√100 = 10, donc 1/√100 = 1/10.'], ['10', 'C’est √n. On cherche 1/√n.'], ['0,5', '1/√100 = 1/10 = 0,1.']]),
    Q('p = 0,5 et n = 400. Dans la grande majorité des échantillons, f est comprise entre…', '0,45 et 0,55', [['0,4 et 0,6', 'C’est pour n = 100. Ici 1/√400 = 1/20 = 0,05.'], ['0,25 et 0,75', '1/√400 = 0,05, pas 0,25.'], ['0,49 et 0,51', '1/√400 = 0,05.']]),
    Q('Quand la taille n des échantillons augmente, la fluctuation de f…', 'diminue', [['augmente', '1/√n diminue quand n augmente.'], ['ne change pas', 'La bande p ± 1/√n se resserre.'], ['disparaît complètement', 'Elle diminue mais ne disparaît pas.']]),
    Q('Sondage sur 1 000 personnes : 52 % sont favorables. La proportion p dans toute la population est…', 'probablement entre 49 % et 55 % environ', [['exactement 52 %', 'Un sondage donne une estimation, avec une marge d’environ 1/√1000 ≈ 0,03.'], ['forcément supérieure à 50 %', 'Avec la marge de 3 points, ce n’est pas certain.'], ['impossible à estimer', 'Un échantillon de 1 000 permet une estimation assez précise.']])]
});
concept({
  id: 'm-py', ch: 'M12', title: 'Python : variables et affectations',
  lesson: [
    { h: 'Une variable, c’est une boîte', t: '<p>a = 3 range la valeur 3 dans la variable a. Ce n’est pas une équation : <b>a = a + 1</b> veut dire « la nouvelle valeur de a est l’ancienne plus 1 ». Exécute pas à pas :</p>', w: { type: 'pytrace', code: ['a = 3', 'b = a + 2', 'a = a * b', 'print(a, b)'], trace: [[0, { a: 3 }], [1, { a: 3, b: 5 }], [2, { a: 15, b: 5 }, null, 'a prend la valeur 3 × 5 ; b ne change pas.'], [3, { a: 15, b: 5 }, '15 5']] } },
    { h: 'Les types', t: '<p><b>int</b> : entier (7). <b>float</b> : nombre à virgule, écrit avec un point (3.5). <b>str</b> : chaîne de caractères, entre guillemets ("bonjour", "7"). <b>bool</b> : True ou False.</p><p>Attention : "3" + "4" donne "34" (on colle deux textes), alors que 3 + 4 donne 7.</p>' }],
  qs: [
    Q('Après ce programme, que valent a et b ?' + PY(['a = 5', 'b = 2', 'a = a + b', 'b = a * 2']), 'a = 7 et b = 14', [['a = 7 et b = 4', 'À la ligne 4, a vaut déjà 7 : b = 7 × 2.'], ['a = 5 et b = 10', 'La ligne 3 change la valeur de a.'], ['a = 7 et b = 10', 'b utilise la nouvelle valeur de a (7).']]),
    Q('Type de la variable x après x = 3.5 ?', 'float', [['int', 'Un int est un entier ; 3.5 a une virgule.'], ['str', 'Il n’y a pas de guillemets.'], ['bool', 'Un booléen vaut True ou False.']]),
    Q('Qu’affiche print("3" + "4") ?', '34', [['7', 'Entre guillemets, ce sont des textes : + les colle l’un à l’autre.'], ['3 + 4', 'Python calcule l’opération + sur les deux textes.'], ['une erreur', 'Additionner deux textes est permis : ça les met bout à bout.']]),
    Q('Que signifie l’instruction a = a + 1 ?', 'la nouvelle valeur de a est l’ancienne augmentée de 1', [['c’est une équation impossible', 'En Python, = est une affectation, pas une égalité mathématique.'], ['a vaut 1', 'On ajoute 1 à la valeur actuelle de a.'], ['a et 1 sont égaux', '= range une valeur dans la variable.']])]
});
concept({
  id: 'm-pyboucle', ch: 'M12', title: 'Python : conditions et boucles', prereq: ['m-py'],
  lesson: [
    { h: 'Boucle bornée : for', t: '<p>range(1, 4) donne 1, 2, 3 (le 4 est exclu). range(4) donne 0, 1, 2, 3.</p>', w: { type: 'pytrace', code: ['s = 0', 'for i in range(1, 4):', '    s = s + i', 'print(s)'], trace: [[0, { s: 0 }], [1, { s: 0, i: 1 }], [2, { s: 1, i: 1 }], [1, { s: 1, i: 2 }], [2, { s: 3, i: 2 }], [1, { s: 3, i: 3 }], [2, { s: 6, i: 3 }], [3, { s: 6, i: 3 }, '6', 'La boucle est terminée : i a pris les valeurs 1, 2, 3.']] } },
    { h: 'Boucle non bornée : while, et condition : if', t: '<p>while répète <b>tant que</b> la condition est vraie. if … else choisit entre deux actions.</p>', w: { type: 'pytrace', code: ['n = 1', 'while n < 20:', '    n = 2 * n', 'print(n)'], trace: [[0, { n: 1 }], [1, { n: 1 }, null, '1 < 20 : on entre dans la boucle.'], [2, { n: 2 }], [1, { n: 2 }], [2, { n: 4 }], [1, { n: 4 }], [2, { n: 8 }], [1, { n: 8 }], [2, { n: 16 }], [1, { n: 16 }, null, '16 < 20 : encore un tour !'], [2, { n: 32 }], [1, { n: 32 }, null, '32 < 20 est faux : on sort de la boucle.'], [3, { n: 32 }, '32']] } }],
  qs: [
    Q('Qu’affiche ce programme ?' + PY(['for i in range(4):', '    print(i)']), '0 1 2 3', [['1 2 3 4', 'range(4) commence à 0.'], ['0 1 2 3 4', 'range(4) s’arrête avant 4.'], ['4', 'print est dans la boucle : il affiche chaque valeur de i.']]),
    Q('Qu’affiche ce programme ?' + PY(['s = 0', 'for i in range(1, 5):', '    s = s + i', 'print(s)']), '10', [['15', 'range(1, 5) donne 1, 2, 3, 4 : le 5 est exclu.'], ['4', 'On additionne toutes les valeurs de i : 1 + 2 + 3 + 4.'], ['5', 's accumule les valeurs de i.']]),
    Q('Que vaut y à la fin ?' + PY(['x = 7', 'if x > 5:', '    y = 1', 'else:', '    y = 2']), '1', [['2', '7 > 5 est vrai : on exécute y = 1.'], ['7', 'y prend la valeur 1 ou 2.'], ['1 puis 2', 'Seul l’un des deux blocs est exécuté.']]),
    Q('Qu’affiche ce programme ?' + PY(['n = 1', 'while n < 20:', '    n = 2 * n', 'print(n)']), '32', [['16', '16 < 20 : la boucle fait encore un tour, n devient 32.'], ['20', 'n ne prend que des puissances de 2.'], ['64', 'Après 32, la condition 32 < 20 est fausse : on s’arrête.']]),
    Q('Combien de fois la boucle for k in range(10) s’exécute-t-elle ?', '10 fois', [['9 fois', 'k prend les valeurs 0, 1, …, 9 : cela fait 10 valeurs.'], ['11 fois', '10 est exclu.'], ['une seule fois', 'C’est une boucle : elle répète.']])]
});
concept({
  id: 'm-pyfonc', ch: 'M12', title: 'Python : fonctions', prereq: ['m-py'],
  lesson: [{ h: 'def … return', t: '<p>Une fonction reçoit des arguments et <b>renvoie</b> un résultat avec return.</p>', w: { type: 'steps', lines: ['def f(x):<br>&nbsp;&nbsp;&nbsp;&nbsp;return 3 * x + 1', 'f(2) renvoie 3 × 2 + 1 = 7', 'x ** 2 veut dire x² (et pas 2x)', 'from random import random : random() renvoie un nombre au hasard dans [0 ; 1[', 'from random import randint : randint(1, 6) renvoie un entier entre 1 et 6 inclus (un dé)'] } }],
  qs: [
    Q('Que renvoie f(3) ?' + PY(['def f(x):', '    return x ** 2 - 1']), '8', [['5', 'x ** 2 est le carré de x : 3² = 9, pas 3 × 2.'], ['9', 'On retire 1 : 9 − 1.'], ['2', 'x ** 2 n’est pas x − 1.']]),
    Q('Que renvoie aire(4, 5) ?' + PY(['def aire(L, l):', '    return L * l']), '20', [['9', 'L * l est une multiplication.'], ['45', 'L vaut 4 et l vaut 5.'], ['aire', 'La fonction renvoie un nombre.']]),
    Q('Que renvoie random() (module random) ?', 'un nombre au hasard dans [0 ; 1[', [['un entier au hasard entre 0 et 1', 'C’est un nombre à virgule, comme 0,374…'], ['0 ou 1', 'Pour un entier, on utiliserait randint.'], ['un nombre entre 1 et 6', 'Ce serait randint(1, 6).']]),
    Q('Que renvoie test(7) ? (n % 2 est le reste de la division de n par 2)' + PY(['def test(n):', '    if n % 2 == 0:', '        return True', '    return False']), 'False', [['True', '7 % 2 = 1, pas 0 : la condition est fausse.'], ['1', 'La fonction renvoie True ou False.'], ['7', 'La fonction renvoie un booléen.']])]
});
