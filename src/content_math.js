'use strict';
/* ============ MATHS : bases du collège ============ */
concept({
  id: 'cm-rel', ch: 'CM', title: 'Nombres relatifs',
  lesson: [
    { h: 'Ajouter un nombre négatif', t: '<p>Sur une droite graduée, ajouter un nombre <b>positif</b> fait avancer vers la droite ; ajouter un nombre <b>négatif</b> fait reculer.</p>', w: { type: 'reladd', a: 3, b: -5 } },
    { h: 'Soustraire, c’est ajouter l’opposé', t: '<p>Soustraire un nombre revient à ajouter son opposé.</p>', w: { type: 'steps', lines: ['5 − (−3)', '= 5 + 3 <span class="muted small">(l’opposé de −3 est 3)</span>', '= 8', '−2 − 6 = −2 + (−6) = −8'] } },
    { h: 'Multiplier : la règle des signes', t: `<table class="simple"><tr><th>×</th><th>positif</th><th>négatif</th></tr><tr><th>positif</th><td>+</td><td>−</td></tr><tr><th>négatif</th><td>−</td><td>+</td></tr></table>
      <p>(−4) × (−3) = 12 ; (−2) × 5 = −10.</p><p><b>Piège :</b> (−3)² = (−3) × (−3) = 9, mais −3² = −(3 × 3) = −9 : sans parenthèses, le carré ne porte que sur 3.</p>` }],
  qs: [
    () => { const a = nz(-9, 9), b = nz(-9, -1); return Q(`Calcule : ${nf(a)} + (${nf(b)})`, nf(a + b), [[nf(a - b), 'Ajouter un nombre négatif fait reculer : on ne change pas le signe de l’opération.'], [nf(-(a + b)), 'Attention au signe du résultat : place les nombres sur une droite graduée.'], [nf(Math.abs(a) + Math.abs(b)), 'On ne peut pas additionner les « distances à zéro » quand les signes sont différents.'], [nf(a + b + (a + b >= 0 ? 1 : -1)), 'Recompte les graduations sur la droite.'], [nf(a + b + (a + b >= 0 ? -1 : 1)), 'Recompte les graduations sur la droite.']]); },
    () => { const a = nz(-9, 9), b = ri(2, 9); return Q(`Calcule : ${nf(a)} − (−${b})`, nf(a + b), [[nf(a - b), 'Soustraire −' + b + ', c’est ajouter ' + b + '.'], [nf(-a + b), 'Le premier nombre garde son signe.'], [nf(-(a + b)), 'Soustraire un négatif revient à ajouter son opposé.'], [nf(a * b), 'C’est une soustraction, pas une multiplication.'], [nf(a + b + 1), 'Recompte : soustraire −' + b + ', c’est avancer de ' + b + '.']]); },
    () => { const a = ri(3, 9), b = ri(2, 9); return Q(`Calcule : (−${a}) × (−${b})`, nf(a * b), [[nf(-a * b), 'Négatif × négatif = positif.'], [nf(-a - b), 'C’est une multiplication, pas une addition.'], [nf(a + b), 'C’est une multiplication, pas une addition.']]); },
    Q('Combien vaut −3² ?', '−9', [['9', 'Sans parenthèses, le carré ne porte que sur 3 : −3² = −(3²) = −9. C’est (−3)² qui vaut 9.'], ['−6', '3² = 3 × 3, et non 3 × 2.'], ['6', '3² = 3 × 3 = 9.']]),
    Q('Combien vaut (−2)³ ?', '−8', [['8', '(−2) × (−2) = 4, puis 4 × (−2) = −8 : avec un nombre impair de facteurs négatifs, le résultat est négatif.'], ['−6', '(−2)³ = (−2) × (−2) × (−2), pas (−2) × 3.'], ['6', '(−2)³ = (−2) × (−2) × (−2).']])]
});
concept({
  id: 'cm-prio', ch: 'CM', title: 'Priorités opératoires',
  lesson: [
    { h: 'Dans quel ordre calculer ?', t: '<p>1. Les <b>parenthèses</b> ; 2. les <b>puissances</b> ; 3. les <b>multiplications et divisions</b> ; 4. les <b>additions et soustractions</b> (de gauche à droite).</p>', w: { type: 'steps', lines: ['3 + 4 × 2²', '= 3 + 4 × 4 <span class="muted small">(puissance d’abord)</span>', '= 3 + 16 <span class="muted small">(puis multiplication)</span>', '= 19'] } },
    { h: 'Avec des parenthèses', t: '<p>Les parenthèses changent l’ordre :</p>', w: { type: 'steps', lines: ['(3 + 4) × 2²', '= 7 × 4', '= 28', 'Sans parenthèses : 3 + 4 × 2² = 19. Ce n’est pas le même calcul !'] } }],
  qs: [
    () => { const a = ri(2, 9), b = ri(2, 9), c = ri(2, 9); return Q(`Calcule : ${a} + ${b} × ${c}`, nf(a + b * c), [[nf((a + b) * c), 'La multiplication est prioritaire sur l’addition : on calcule ' + b + ' × ' + c + ' d’abord.'], [nf(a + b + c), 'C’est une multiplication, pas une addition.'], [nf(a * b + c), 'C’est ' + b + ' qui est multiplié par ' + c + ', pas ' + a + '.'], [nf(a * b * c), 'Il y a une addition et une multiplication : on ne multiplie pas tout.'], [nf(a + b * c + 1), 'Refais le calcul : ' + b + ' × ' + c + ' = ' + b * c + '.']]); },
    Q('Calcule : 10 − 2 × 3²', '−8', [['72', 'On ne commence pas par 10 − 2 : puissance d’abord, puis multiplication, puis soustraction.'], ['−26', '3² se calcule avant la multiplication : 2 × 9 = 18, pas (2 × 3)² = 36.'], ['−2', '3² = 9, pas 6.', 'cm-pow']]),
    () => { const a = ri(12, 30), b = ri(2, 5), c = ri(2, 4); return Q(`Calcule : ${a} − ${b} × (${c} + 1)`, nf(a - b * (c + 1)), [[nf((a - b) * (c + 1)), 'La multiplication passe avant la soustraction.'], [nf(a - b * c + 1), 'Les parenthèses se calculent en premier : (' + c + ' + 1) = ' + (c + 1) + '.'], [nf(a - b + c + 1), 'Il y a une multiplication entre ' + b + ' et la parenthèse.']]); }]
});
concept({
  id: 'cm-frac-s', ch: 'CM', title: 'Simplifier une fraction',
  lesson: [
    { h: 'Même valeur, autre écriture', t: '<p>On peut <b>multiplier ou diviser</b> le numérateur et le dénominateur par un même nombre non nul : la fraction garde la même valeur.</p>', w: { type: 'fracbar', mode: 'simplify', a: 6, b: 8 } },
    { h: 'Ce qu’on ne peut pas faire', t: `<p>On ne peut <b>pas ajouter ou retirer</b> le même nombre en haut et en bas : ${F(2, 3)} ≠ ${F('2 + 1', '3 + 1')} = ${F(3, 4)}.</p><p>Pour simplifier ${F(12, 18)} : 12 = 6 × 2 et 18 = 6 × 3, donc ${F(12, 18)} = ${F(2, 3)}.</p>` }],
  qs: [
    Q(`Forme simplifiée au maximum de ${F(12, 18)} ?`, F(2, 3), [[F(6, 9), F(6, 9) + ' est bien égal, mais on peut encore diviser par 3.'], [F(1, 6), 'On ne soustrait pas : on divise le haut et le bas par le même nombre.'], [F(3, 2), 'Le numérateur reste en haut : 12 ÷ 6 = 2 et 18 ÷ 6 = 3.']]),
    Q('Laquelle de ces égalités est vraie ?', `${F(3, 4)} = ${F(15, 20)}`, [[`${F(3, 4)} = ${F(4, 5)}`, 'On ne peut pas ajouter 1 en haut et en bas.'], [`${F(3, 4)} = ${F(9, 16)}`, 'Il faut multiplier en haut et en bas par le même nombre : 3 × 3 = 9 mais 4 × 3 = 12.'], [`${F(3, 4)} = ${F(6, 7)}`, 'On a ajouté 3 en haut et en bas : interdit.']]),
    () => { const pairs = [[2, 3], [3, 4], [2, 5], [3, 5], [4, 7], [5, 6]]; const [a, b] = pick(pairs), k = ri(3, 9); return Q(`Simplifie au maximum : ${F(a * k, b * k)}`, F(a, b), [[F(b, a), 'Le numérateur reste en haut.'], [F(a * k - k, b * k - k), 'On ne soustrait pas : on divise.'], [F(a + 1, b + 1), 'On divise le haut et le bas par ' + k + '.']]); }]
});
concept({
  id: 'cm-frac-op', ch: 'CM', title: 'Calculer avec des fractions', prereq: ['cm-frac-s'],
  lesson: [
    { h: 'Additionner', t: '<p>Pour additionner, il faut des parts <b>de même taille</b> : même dénominateur.</p>', w: { type: 'fracbar', mode: 'add', f: [1, 2, 1, 3] } },
    { h: 'Multiplier', t: '<p>On multiplie les numérateurs entre eux et les dénominateurs entre eux.</p>', w: { type: 'fracbar', mode: 'mul', f: [2, 3, 3, 4] } },
    { h: 'Diviser', t: `<p>Diviser par une fraction, c’est <b>multiplier par son inverse</b>.</p>`, w: { type: 'steps', lines: [`${F(2, 3)} ÷ ${F(4, 5)}`, `= ${F(2, 3)} × ${F(5, 4)}`, `= ${F(10, 12)}`, `= ${F(5, 6)}`] } }],
  qs: [
    () => { const b = ri(5, 11), a = ri(1, 3), c = ri(1, 3); return Q(`Calcule : ${F(a, b)} + ${F(c, b)}`, F(a + c, b), [[F(a + c, 2 * b), 'Les parts gardent la même taille : on n’additionne pas les dénominateurs.'], [F(a * c, b), 'C’est une addition : on additionne les numérateurs.'], [F(a + c, b * b), 'Le dénominateur ne change pas.']]); },
    Q(`Calcule : ${F(1, 2)} + ${F(1, 3)}`, F(5, 6), [[F(2, 5), 'On n’additionne jamais les numérateurs et les dénominateurs entre eux : il faut d’abord un dénominateur commun.'], [F(2, 6), 'Avec le dénominateur 6 : 1/2 = 3/6 et 1/3 = 2/6.'], [F(1, 6), '1/6 serait le produit, pas la somme.']]),
    () => { const [a, b, c, d] = pick([[2, 3, 4, 5], [3, 5, 2, 7], [1, 4, 3, 5], [5, 7, 2, 3]]); return Q(`Calcule : ${F(a, b)} × ${F(c, d)}`, F(a * c, b * d), [[F(a * c, b), 'Il faut aussi multiplier les dénominateurs.'], [F(a + c, b + d), 'Pour multiplier, on multiplie (on n’additionne pas).'], [F(a * d, b * c), 'Ça, ce serait une division.']]); },
    Q(`Calcule : ${F(3, 4)} ÷ ${F(1, 2)}`, F(3, 2), [[F(3, 8), 'Diviser par 1/2, c’est multiplier par 2 (l’inverse de 1/2).'], [F(4, 3), 'On multiplie par l’inverse du diviseur (1/2), pas par l’inverse de 3/4.'], [F(2, 3), '3/4 × 2/1 = 6/4 = 3/2.']])]
});
concept({
  id: 'cm-pow', ch: 'CM', title: 'Puissances et écriture scientifique', prereq: ['cm-rel'],
  lesson: [
    { h: 'Qu’est-ce qu’une puissance ?', t: '<p>a<sup>n</sup> est le produit de n facteurs égaux à a. Un exposant négatif désigne l’<b>inverse</b>.</p>', w: { type: 'powers', a: 2, n: 3 } },
    { h: 'Puissances de 10', t: '<p>10³ = 1 000 ; 10⁰ = 1 ; 10⁻³ = 0,001. L’exposant indique de combien de rangs la virgule se déplace.</p><p><b>Écriture scientifique :</b> a × 10<sup>n</sup> avec 1 ≤ a &lt; 10 (un seul chiffre non nul avant la virgule).</p>', w: { type: 'steps', lines: ['45 000 = 4,5 × 10 000 = 4,5 × 10⁴', '0,0032 = 3,2 × 0,001 = 3,2 × 10⁻³', 'Nombre plus grand que 10 → exposant positif ; plus petit que 1 → exposant négatif.'] } }],
  qs: [
    Q('2⁴ = ?', '16', [['8', '2⁴ = 2 × 2 × 2 × 2, pas 2 × 4.'], ['6', 'On ne fait pas 2 + 4.'], ['32', '32 = 2⁵ (un facteur 2 de trop).']]),
    Q('10⁻³ = ?', '0,001', [['−1 000', 'Un exposant négatif ne rend pas le nombre négatif : 10⁻³ = 1 / 10³.'], ['−30', '10⁻³ n’est pas 10 × (−3).'], ['0,0001', '1 / 1 000 = 0,001 : la virgule recule de 3 rangs.']]),
    () => { const m = ri(11, 99) / 10, e = -ri(2, 5), v = m * Math.pow(10, e); const s = nf(+v.toFixed(-e + 1)); return Q(`Écriture scientifique de ${s} ?`, `${nf(m)} × 10${supDigits(e)}`, [[`${nf(m * 10)} × 10${supDigits(e - 1)}`, 'Il faut un seul chiffre non nul avant la virgule (entre 1 et 10).'], [`${nf(m)} × 10${supDigits(-e)}`, 'Le nombre est plus petit que 1 : l’exposant est négatif.'], [`${nf(m)} × 10${supDigits(e + 1)}`, 'Compte de combien de rangs la virgule se déplace.']]); },
    () => { const m = ri(12, 98) / 10, e = ri(3, 6), v = Math.round(m * Math.pow(10, e)); return Q(`Écriture scientifique de ${nf(v)} ?`, `${nf(m)} × 10${supDigits(e)}`, [[`${nf(m * 10)} × 10${supDigits(e - 1)}`, 'Il faut un seul chiffre non nul avant la virgule.'], [`${nf(m)} × 10${supDigits(-e)}`, 'Le nombre est grand : l’exposant est positif.'], [`${nf(m)} × 10${supDigits(e + 1)}`, 'Compte de combien de rangs la virgule se déplace.']]); }]
});
concept({
  id: 'cm-dist', ch: 'CM', title: 'Développer (distributivité)', prereq: ['cm-rel'],
  lesson: [
    { h: 'k(a + b) = ka + kb', t: '<p>Le facteur devant la parenthèse multiplie <b>chaque terme</b>.</p>', w: { type: 'area', mode: 'dist', a: 4, b: 3, k: 3 } },
    { h: 'Attention aux signes', t: '', w: { type: 'steps', lines: ['3(x + 4) = 3x + 12', '−2(x − 5) = −2 × x + (−2) × (−5)', '= −2x + 10 <span class="muted small">(moins par moins donne plus)</span>'] } },
    { h: 'Double distributivité', t: '<p>(a + b)(c + d) = ac + ad + bc + bd : chaque terme de la première parenthèse multiplie chaque terme de la seconde.</p>', w: { type: 'steps', lines: ['(x + 2)(x + 3)', '= x × x + x × 3 + 2 × x + 2 × 3', '= x² + 3x + 2x + 6', '= x² + 5x + 6'] } }],
  qs: [
    () => { const k = ri(2, 9), b = ri(2, 9); return Q(`Développe : ${k}(x + ${b})`, poly([[k, 'x'], [k * b, '']]), [[poly([[k, 'x'], [b, '']]), 'Le facteur ' + k + ' multiplie aussi ' + b + '.'], [poly([[k + b, 'x']]), 'kx et un nombre ne s’additionnent pas.'], [poly([[k, 'x'], [k + b, '']]), k + ' × ' + b + ' = ' + k * b + '.']]); },
    () => { const k = ri(2, 9), b = ri(2, 9); return Q(`Développe : −${k}(x − ${b})`, poly([[-k, 'x'], [k * b, '']]), [[poly([[-k, 'x'], [-k * b, '']]), '(−' + k + ') × (−' + b + ') = +' + k * b + ' : moins par moins donne plus.', 'cm-rel'], [poly([[-k, 'x'], [-b, '']]), '−' + k + ' multiplie aussi le deuxième terme.'], [poly([[k, 'x'], [-k * b, '']]), '−' + k + ' × x = −' + k + 'x.']]); },
    Q('Développe : (x + 2)(x + 3)', 'x² + 5x + 6', [['x² + 6', 'Il manque les termes x × 3 et 2 × x.'], ['x² + 5x + 5', '2 × 3 = 6, pas 2 + 3.'], ['2x + 5', 'x × x = x², pas 2x.']])]
});
concept({
  id: 'cm-eq', ch: 'CM', title: 'Équations (collège)', prereq: ['cm-rel', 'cm-dist'],
  lesson: [
    { h: 'La balance', t: '<p>Une équation est une balance en équilibre. On peut faire <b>la même opération des deux côtés</b> : l’équilibre est conservé.</p>', w: { type: 'balance', eq: [3, 2, 11] } },
    { h: 'Méthode', t: '<p>On regroupe les x d’un côté, les nombres de l’autre, puis on divise.</p>', w: { type: 'steps', lines: ['5x − 7 = 2x + 8', '5x − 2x = 8 + 7 <span class="muted small">(on retire 2x et on ajoute 7 des deux côtés)</span>', '3x = 15', 'x = 15 ÷ 3 = 5', 'Vérification : 5 × 5 − 7 = 18 et 2 × 5 + 8 = 18 ✓'] } }],
  qs: [
    () => { const a = ri(2, 7), x = nz(-6, 9), b = nz(-9, 9), c = a * x + b; return Q(`Résous : ${poly([[a, 'x'], [b, '']])} = ${nf(c)}`, 'x = ' + nf(x), [['x = ' + nf(+((c + b) / a).toFixed(2)), 'Pour enlever ' + sgn(b) + ', on fait l’opération inverse.', 'cm-rel'], ['x = ' + nf((c - b) - a), 'On divise par ' + a + ' (on ne soustrait pas ' + a + ').'], ['x = ' + nf(+(c / a - b).toFixed(2)), 'Il faut d’abord enlever ' + nf(b) + ', puis diviser.']]); },
    () => { const x = nz(-5, 6), a = ri(4, 8), c = ri(1, a - 1), b = nz(-9, 9), d = (a - c) * x + b; return Q(`Résous : ${poly([[a, 'x'], [b, '']])} = ${poly([[c, 'x'], [d, '']])}`, 'x = ' + nf(x), [['x = ' + nf(+((d - b) / (a + c)).toFixed(2)), 'Pour retirer ' + c + 'x d’un côté, on le soustrait aussi de l’autre : ' + a + 'x − ' + c + 'x.'], ['x = ' + nf(+((d + b) / (a - c)).toFixed(2)), 'Attention au signe quand ' + nf(b) + ' change de côté.', 'cm-rel'], ['x = ' + nf(d - b), 'Il reste à diviser par ' + (a - c) + '.']]); }]
});
concept({
  id: 'cm-prop', ch: 'CM', title: 'Proportionnalité et pourcentages',
  lesson: [
    { h: 'Prendre un pourcentage', t: `<p>p % d’une quantité, c’est ${F('p', 100)} × la quantité.</p>`, w: { type: 'percent', mode: 'part', total: 80, p: 25 } },
    { h: 'Augmenter ou diminuer', t: '<p>Augmenter de t %, c’est multiplier par 1 + t/100 ; diminuer de t %, c’est multiplier par 1 − t/100.</p>', w: { type: 'percent', mode: 'evol', total: 50, p: 20 } },
    { h: 'Proportionnalité', t: '<p>Si 3 cahiers coûtent 4,50 €, un cahier coûte 4,50 ÷ 3 = 1,50 €, donc 7 cahiers coûtent 7 × 1,50 = 10,50 €.</p>' }],
  qs: [
    () => { const p = pick([10, 20, 25, 30, 40, 75]), T = pick([40, 60, 80, 120, 200, 240]); return Q(`Combien font ${p} % de ${T} ?`, nf(p * T / 100), [[nf(T - p), 'Prendre un pourcentage, ce n’est pas soustraire.'], [nf(+(T / p).toFixed(2)), 'On multiplie par ' + p + '/100 (on ne divise pas par ' + p + ').'], [nf(p * T / 10), p + ' % = ' + p + '/100, pas ' + p + '/10.']]); },
    Q('Un prix passe de 50 € à 60 €. De quel pourcentage a-t-il augmenté ?', '20 %', [['10 %', 'L’augmentation est de 10 €, mais on la compare au prix de départ : 10 ÷ 50 = 0,20 = 20 %.'], ['16,7 %', 'On divise par la valeur de départ (50), pas par la valeur d’arrivée.'], ['60 %', '60 € est le nouveau prix, pas l’augmentation.']]),
    Q('Si 3 cahiers coûtent 4,50 €, combien coûtent 7 cahiers ?', '10,50 €', [['8,50 €', 'Ce n’est pas une situation où l’on ajoute 4 : c’est proportionnel.'], ['9,00 €', 'Un cahier coûte 4,50 ÷ 3 = 1,50 €.'], ['31,50 €', '4,50 × 7 serait le prix de 21 cahiers.']]),
    Q('Diminuer un prix de 30 %, c’est le multiplier par…', '0,7', [['0,3', 'Multiplier par 0,3 donne les 30 % retirés, pas ce qui reste.'], ['1,3', '1,3 correspond à une augmentation de 30 %.'], ['−0,3', 'Le prix reste positif : 1 − 0,30 = 0,70.']])]
});
concept({
  id: 'cm-coord', ch: 'CM', title: 'Repère et coordonnées',
  lesson: [{ h: 'Lire les coordonnées d’un point', t: '<p>Dans un repère, un point a deux coordonnées : d’abord l’<b>abscisse</b> (lecture horizontale), ensuite l’<b>ordonnée</b> (lecture verticale).</p>', w: { type: 'graph', mode: 'point', xmin: -5, xmax: 5, ymin: -4, ymax: 4, px: 3, py: -2 } }],
  qs: [
    Q('Coordonnées du point A ?', '(3 ; −2)', [['(−2 ; 3)', 'L’abscisse (horizontale) s’écrit en premier.'], ['(3 ; 2)', 'A est sous l’axe horizontal : son ordonnée est négative.'], ['(−3 ; −2)', 'A est à droite de l’axe vertical : son abscisse est positive.']], { w: { type: 'graph', xmin: -5, xmax: 5, ymin: -4, ymax: 4, points: [[3, -2, 'A']] } }),
    Q('Coordonnées du point B ?', '(−4 ; 1)', [['(1 ; −4)', 'D’abord l’abscisse, ensuite l’ordonnée.'], ['(4 ; 1)', 'B est à gauche de l’axe vertical : abscisse négative.'], ['(−4 ; −1)', 'B est au-dessus de l’axe horizontal.']], { w: { type: 'graph', xmin: -5, xmax: 5, ymin: -4, ymax: 4, points: [[-4, 1, 'B']] } }),
    Q('Le point C(0 ; 3) est situé…', 'sur l’axe des ordonnées', [['sur l’axe des abscisses', 'Son abscisse est 0 : il est sur l’axe vertical.'], ['à l’origine', 'L’origine est (0 ; 0).'], ['en bas à gauche du repère', 'Son ordonnée est positive.']])]
});
concept({
  id: 'cm-sq', ch: 'CM', title: 'Carrés et racines carrées (collège)',
  lesson: [{ h: 'La racine carrée, côté d’un carré', t: '<p>√a est le nombre <b>positif</b> dont le carré vaut a. Carrés parfaits à connaître : 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144.</p>', w: { type: 'sqroot', A: 49 } }],
  qs: [
    Q('√49 = ?', '7', [['24,5', '√ ne veut pas dire « diviser par 2 ».'], ['2 401', 'C’est 49², pas √49.'], ['−7', 'La racine carrée est toujours positive.']]),
    () => { const n = ri(4, 12); return Q(`Un carré a une aire de ${n * n} cm². Quelle est la longueur de son côté ?`, n + ' cm', [[(n * n / 4) + ' cm', 'Diviser l’aire par 4 ne donne pas le côté : on cherche un nombre dont le carré vaut ' + n * n + '.'], [(n * n / 2) + ' cm', 'Diviser par 2 ne donne pas le côté.'], [(n * n * n * n) + ' cm', 'C’est l’aire au carré.']]); },
    Q('Entre quels entiers se trouve √30 ?', 'entre 5 et 6', [['entre 15 et 16', '√30 n’est pas 30 ÷ 2.'], ['entre 4 et 5', '5² = 25 < 30 et 6² = 36 > 30.'], ['entre 29 et 31', 'Il faut chercher un nombre dont le carré fait 30.']])]
});

/* ============ M1 Nombres réels et intervalles ============ */
concept({
  id: 'm-ens', ch: 'M1', title: 'Les ensembles de nombres', prereq: ['cm-frac-s'],
  lesson: [
    { h: 'ℕ ⊂ ℤ ⊂ 𝔻 ⊂ ℚ ⊂ ℝ', t: '<p>Chaque ensemble est contenu dans le suivant. Un nombre appartient à son « plus petit » ensemble et à tous ceux qui le contiennent.</p>', w: { type: 'sets' } },
    { h: 'Décimal, rationnel, irrationnel', t: `<p><b>Décimal</b> : nombre fini de chiffres après la virgule (0,25 = ${F(25, 100)}).</p><p><b>Rationnel</b> : quotient de deux entiers, comme ${F(1, 3)} = 0,333… (les chiffres se répètent à l’infini).</p><p><b>Irrationnel</b> : impossible à écrire comme quotient d’entiers, comme √2 ou π. Ils sont dans ℝ mais pas dans ℚ.</p>` }],
  qs: [
    Q(`Le nombre ${F(1, 3)} appartient à…`, 'ℚ, mais pas à 𝔻', [['𝔻', `${F(1, 3)} = 0,333… : une infinité de chiffres après la virgule, donc il n’est pas décimal.`], ['ℤ', `${F(1, 3)} n’est pas un entier.`], ['ℝ, mais pas à ℚ', `${F(1, 3)} est un quotient de deux entiers : il est rationnel.`, 'cm-frac-s']]),
    Q('Lequel de ces nombres est un entier naturel ?', F(20, 4), [['−2', 'Les entiers naturels sont positifs : 0, 1, 2, 3…'], ['2,5', '2,5 n’est pas entier.'], ['√5', '√5 ≈ 2,236 n’est pas entier.']], { exp: `${F(20, 4)} = 5 : l’écriture fractionnaire cache un entier naturel.` }),
    Q('√2 est…', 'irrationnel (dans ℝ, pas dans ℚ)', [['décimal, car √2 ≈ 1,414', '1,414 n’est qu’une valeur approchée : les chiffres de √2 ne s’arrêtent jamais et ne se répètent pas.'], ['rationnel', 'On démontre qu’il est impossible d’écrire √2 comme quotient de deux entiers.'], ['entier', '1² = 1 et 2² = 4 : aucun entier n’a pour carré 2.']]),
    Q('Quelle inclusion est correcte ?', 'ℤ ⊂ 𝔻', [['𝔻 ⊂ ℤ', 'Tout entier est décimal (5 = 5,0), mais 0,5 n’est pas entier.'], ['ℚ ⊂ 𝔻', `${F(1, 3)} est rationnel mais pas décimal.`], ['ℝ ⊂ ℚ', '√2 est réel mais pas rationnel.']]),
    Q('0,125 est-il un nombre décimal ?', `Oui : 0,125 = ${F(125, 1000)}`, [[`Non, car c’est la fraction ${F(1, 8)}`, `${F(1, 8)} = 0,125 a un nombre fini de chiffres après la virgule : c’est un décimal.`], ['Non, car il n’est pas entier', 'Un décimal n’a pas besoin d’être entier.'], ['On ne peut pas savoir', 'Il suffit de compter les chiffres après la virgule : il y en a 3.']])]
});
concept({
  id: 'm-int', ch: 'M1', title: 'Intervalles', prereq: ['cm-rel'],
  lesson: [
    { h: 'Lire un intervalle', t: '<p>Le crochet <b>tourné vers le nombre</b> : le nombre est inclus. Le crochet <b>tourné vers l’extérieur</b> : il est exclu. Du côté de l’infini, le crochet est toujours ouvert.</p>', w: { type: 'numline', min: -5, max: 5, x: 0, presets: [{ a: -2, b: 3, ca: 1, cb: 1, label: '[−2 ; 3]', note: '−2 ≤ x ≤ 3' }, { a: -2, b: 3, ca: 0, cb: 0, label: ']−2 ; 3[', note: '−2 &lt; x &lt; 3' }, { a: -2, b: 3, ca: 1, cb: 0, label: '[−2 ; 3[', note: '−2 ≤ x &lt; 3' }, { a: 1, b: Infinity, ca: 1, label: '[1 ; +∞[', note: 'x ≥ 1' }, { a: -Infinity, b: 0, cb: 0, label: ']−∞ ; 0[', note: 'x &lt; 0' }] } },
    { h: 'Intervalles et inégalités', t: '<table class="simple"><tr><th>Inégalité</th><th>Intervalle</th></tr><tr><td>−2 ≤ x ≤ 3</td><td>[−2 ; 3]</td></tr><tr><td>−2 &lt; x ≤ 3</td><td>]−2 ; 3]</td></tr><tr><td>x &gt; 4</td><td>]4 ; +∞[</td></tr><tr><td>x ≤ 1</td><td>]−∞ ; 1]</td></tr></table>' }],
  qs: [
    () => { const a = ri(-5, 1), b = a + ri(3, 6); return Q(`Lequel de ces nombres appartient à [${nf(a)} ; ${nf(b)}[ ?`, nf(a), [[nf(b), nf(b) + ' est exclu : le crochet est tourné vers l’extérieur.'], [nf(a - 1), nf(a - 1) + ' est plus petit que ' + nf(a) + '.', 'cm-rel'], [nf(b + 1), nf(b + 1) + ' est plus grand que ' + nf(b) + '.']]); },
    Q('L’ensemble des réels x tels que x > 4 s’écrit…', ']4 ; +∞[', [['[4 ; +∞[', 'x > 4 : 4 est exclu, le crochet est ouvert.'], [']4 ; +∞]', 'Du côté de l’infini, le crochet est toujours ouvert.'], [']−∞ ; 4[', 'x > 4 : ce sont les nombres plus grands que 4.']]),
    Q('« −1 ≤ x < 5 » s’écrit…', 'x ∈ [−1 ; 5[', [['x ∈ ]−1 ; 5]', '−1 est inclus (≤) et 5 est exclu (<).'], ['x ∈ [−1 ; 5]', '5 est exclu : x < 5.'], ['x ∈ [5 ; −1[', 'On écrit toujours la plus petite borne à gauche.']]),
    Q('Combien d’entiers appartiennent à ]−2 ; 3] ?', '5', [['6', '−2 est exclu : les entiers sont −1, 0, 1, 2, 3.'], ['4', '3 est inclus : les entiers sont −1, 0, 1, 2, 3.'], ['une infinité', 'Il y a une infinité de réels, mais seulement 5 entiers.']])]
});
concept({
  id: 'm-abs', ch: 'M1', title: 'Valeur absolue et distance', prereq: ['m-int', 'cm-rel'],
  lesson: [
    { h: '|a| = distance entre a et 0', t: '<p>La valeur absolue d’un nombre est sa distance à zéro : elle est toujours positive ou nulle. |−5| = 5 ; |5| = 5.</p>', w: { type: 'absdist', zero: true, a: -5 } },
    { h: 'Distance entre deux nombres', t: '<p>La distance entre a et b est |a − b| (ou |b − a|, c’est pareil).</p>', w: { type: 'absdist', a: -3, b: 4 } },
    { h: '|x − a| ≤ r', t: '<p>« La distance entre x et a est au plus r » : x est dans l’intervalle de centre a et de rayon r.</p>', w: { type: 'numline', min: -2, max: 7, x: 2, presets: [{ a: 1, b: 5, ca: 1, cb: 1, label: '[1 ; 5]', note: '|x − 3| ≤ 2 : centre 3, rayon 2' }] } }],
  qs: [
    Q('|−7| = ?', '7', [['−7', 'Une distance est toujours positive.'], ['0', '−7 est à 7 unités de zéro.'], ['49', 'La valeur absolue n’est pas un carré.']]),
    () => { const a = nz(-8, -1), b = ri(1, 8); return Q(`Quelle est la distance entre ${nf(a)} et ${nf(b)} ?`, nf(b - a), [[nf(Math.abs(a + b)), 'La distance est |a − b|, pas |a + b|.', 'cm-rel'], [nf(a - b), 'Une distance est positive.'], [nf(b), 'On part de ' + nf(a) + ', pas de 0.']], { w: { type: 'numline', min: -9, max: 9, point: false, presets: [{ a, b, ca: 1, cb: 1, label: 'Le segment entre ' + nf(a) + ' et ' + nf(b) }] } }); },
    Q('|x − 3| ≤ 2 équivaut à…', 'x ∈ [1 ; 5]', [['x ∈ [−2 ; 2]', 'C’est la distance entre x et 3 qui vaut au plus 2 : centre 3, rayon 2.'], ['x ∈ [3 ; 5]', 'On peut s’éloigner de 3 des deux côtés.'], ['x ∈ ]1 ; 5[', '≤ : les bornes sont incluses.', 'm-int']]),
    Q('|x + 1| est la distance entre x et…', '−1', [['1', 'x + 1 = x − (−1) : c’est la distance entre x et −1.', 'cm-rel'], ['0', 'C’est |x| qui est la distance à 0.'], ['x', 'La distance entre x et x est 0.']])]
});
concept({
  id: 'm-enc', ch: 'M1', title: 'Encadrer et arrondir', prereq: ['m-ens'],
  lesson: [
    { h: 'Zoomer sur la droite des réels', t: '<p>On ne peut pas écrire √2 en entier, mais on peut l’<b>encadrer</b> de plus en plus finement.</p>', w: { type: 'zoom', val: Math.SQRT2, name: '√2' } },
    { h: 'Arrondir', t: '<p>Arrondir au centième : on regarde le chiffre des millièmes. S’il vaut 5 ou plus, on arrondit au-dessus.</p><p>3,14159 → 3,14 au centième ; 3,142 au millième.</p>' }],
  qs: [
    Q('Un encadrement de √2 d’amplitude 0,01 est…', '1,41 < √2 < 1,42', [['1,4 < √2 < 1,5', 'L’amplitude est ici 0,1, pas 0,01.'], ['1,41 < √2 < 1,43', 'L’amplitude est 0,02.'], ['1,42 < √2 < 1,43', '√2 ≈ 1,414… est plus petit que 1,42.']]),
    () => { const i = ri(1, 9), d1 = ri(0, 9), d2 = ri(0, 8), d3 = ri(5, 9), d4 = ri(1, 9); const v = `${i},${d1}${d2}${d3}${d4}`; const up = +(i + (d1 * 10 + d2 + 1) / 100).toFixed(2); return Q(`Arrondi de ${v} au centième ?`, nf(up, 2), [[nf(+(i + (d1 * 10 + d2) / 100).toFixed(2), 2), 'Le chiffre des millièmes est ' + d3 + ' (5 ou plus) : on arrondit au-dessus.'], [nf(+(i + (d1 + (d2 >= 5 ? 1 : 0)) / 10).toFixed(1), 1), 'Ça, c’est l’arrondi au dixième.'], [`${i},${d1}${d2}${d3}`, 'Le centième correspond à 2 chiffres après la virgule.']]); },
    Q('π ≈ 3,14159… Arrondi au millième ?', '3,142', [['3,141', 'Le chiffre suivant le millième est 5 : on arrondit au-dessus.'], ['3,14', 'Ça, c’est l’arrondi au centième.'], ['3,1416', 'Ça, c’est l’arrondi au dix-millième.']])]
});

/* ============ M2 Arithmétique ============ */
concept({
  id: 'm-mult', ch: 'M2', title: 'Multiples et diviseurs',
  lesson: [
    { h: 'Ranger des points en rectangles', t: '<p>Les diviseurs de n correspondent aux façons de ranger n points en rectangle.</p>', w: { type: 'rects', n: 12 } },
    { h: 'Définition et critères', t: '<p><b>a est un multiple de b</b> (b divise a) s’il existe un entier k tel que a = k × b. Exemple : 35 = 5 × 7.</p><p>Critères : par <b>2</b> si le chiffre des unités est pair ; par <b>3</b> si la somme des chiffres est un multiple de 3 ; par <b>5</b> si le chiffre des unités est 0 ou 5 ; par <b>9</b> si la somme des chiffres est un multiple de 9.</p>' }],
  qs: [
    () => { const n = pick([12, 18, 20, 24, 28, 30, 36, 42]); const divs = []; for (let d = 2; d < n; d++) if (n % d === 0) divs.push(d); const good = pick(divs); const nons = shuffle([5, 7, 8, 9, 11, 13, 16].filter(d => n % d)).slice(0, 3); return Q(`Lequel de ces nombres est un diviseur de ${n} ?`, good, nons.map(d => [d, `${n} ÷ ${d} = ${nf(+(n / d).toFixed(2))} : ce n’est pas un entier.`]), { w: { type: 'rects', n } }); },
    Q('1 236 est-il divisible par 3 ?', 'Oui, car 1 + 2 + 3 + 6 = 12 est un multiple de 3', [['Non, car il ne se termine pas par 3', 'Le critère de divisibilité par 3 porte sur la somme des chiffres.'], ['Non, car il est pair', 'Être pair n’empêche pas d’être divisible par 3 (6 = 2 × 3).'], ['On ne peut pas savoir sans calculatrice', 'La somme des chiffres suffit : 1 + 2 + 3 + 6 = 12.']]),
    Q('« 35 est un multiple de 7 » signifie que…', 'il existe un entier k tel que 35 = 7 × k', [['il existe un entier k tel que 7 = 35 × k', 'C’est l’inverse : le multiple est le plus grand.'], ['35 + 7 est un entier', 'Il s’agit de multiplication.'], ['35 ÷ 7 est un nombre décimal non entier', '35 ÷ 7 = 5 : un entier.']]),
    Q('Lequel de ces nombres est un multiple de 6 ?', '84', [['64', '64 ÷ 6 ≈ 10,67 : pas un entier.'], ['63', '63 est impair : il n’est pas multiple de 2, donc pas de 6.'], ['56', '56 ÷ 6 ≈ 9,33 : pas un entier.']])]
});
concept({
  id: 'm-pair', ch: 'M2', title: 'Pairs, impairs et démonstration', prereq: ['m-mult', 'cm-dist'],
  lesson: [
    { h: 'Pair : 2k ; impair : 2k + 1', t: '<p>Un nombre pair s’écrit 2k, un nombre impair 2k + 1, avec k entier.</p>', w: { type: 'pairs', n: 9 } },
    { h: 'Démontrer pour tous les nombres', t: '<p>Des exemples ne suffisent pas : on utilise la lettre k pour parler de <b>tous</b> les nombres impairs.</p>', w: { type: 'steps', lines: ['Soit n impair : n = 2k + 1, avec k entier.', 'n² = (2k + 1)² = 4k² + 4k + 1', '= 2(2k² + 2k) + 1', '2k² + 2k est un entier : n² est de la forme 2K + 1, donc impair. ∎'] } },
    { h: 'Somme de deux multiples', t: '<p>Si a = k × m et b = k′ × m, alors a + b = (k + k′) × m : la somme de deux multiples de m est un multiple de m.</p>' }],
  qs: [
    Q('Un nombre impair s’écrit toujours…', '2k + 1, avec k entier', [['2k, avec k entier', '2k est un nombre pair.'], ['k + 1, avec k entier', 'k + 1 peut être pair (si k = 1, k + 1 = 2).'], ['3k, avec k entier', '3k peut être pair (si k = 2, 3k = 6).']]),
    Q('La somme de deux nombres impairs est…', 'toujours paire', [['toujours impaire', '(2k + 1) + (2m + 1) = 2k + 2m + 2 = 2(k + m + 1) : c’est pair.'], ['parfois paire, parfois impaire', 'Le calcul avec 2k + 1 et 2m + 1 montre que c’est toujours pair.'], ['toujours un multiple de 4', '3 + 3 = 6 n’est pas un multiple de 4.']]),
    Q('Pour démontrer que le carré d’un nombre impair est impair, on écrit…', '(2k + 1)² = 4k² + 4k + 1 = 2(2k² + 2k) + 1', [['3² = 9 et 5² = 25 sont impairs, donc c’est vrai', 'Des exemples ne démontrent pas une propriété générale (un contre-exemple, lui, suffit à la réfuter).'], ['(2k + 1)² = 4k² + 1', 'Il manque le double produit 2 × 2k × 1 = 4k.', 'm-idr'], ['(2k)² = 4k², qui est impair', '2k est pair, et 4k² aussi.']]),
    Q('n est un entier. 6n + 4 est…', 'pair, car 6n + 4 = 2(3n + 2)', [['impair, car 6n est pair et 4 aussi', 'pair + pair = pair.'], ['pair ou impair selon n', '6n + 4 = 2(3n + 2) est toujours de la forme 2K.'], ['impair si n est impair', 'Essaie n = 1 : 6 + 4 = 10, pair.']])]
});
concept({
  id: 'm-prem', ch: 'M2', title: 'Nombres premiers', prereq: ['m-mult'],
  lesson: [
    { h: 'Exactement deux diviseurs', t: '<p>Un nombre <b>premier</b> a exactement deux diviseurs : 1 et lui-même. 1 n’est pas premier (un seul diviseur). 2 est le seul nombre premier pair.</p><p>Premiers inférieurs à 30 : 2, 3, 5, 7, 11, 13, 17, 19, 23, 29.</p>', w: { type: 'rects', n: 13 } },
    { h: 'Décomposer en facteurs premiers', t: '<p>Tout entier supérieur à 1 se décompose en produit de nombres premiers.</p>', w: { type: 'ftree', nums: [60, 84, 126, 90, 210] } }],
  qs: [
    Q('Lequel de ces nombres est premier ?', '29', [['27', '27 = 3 × 9.'], ['21', '21 = 3 × 7.'], ['1', '1 n’a qu’un seul diviseur : il n’est pas premier.']]),
    Q('Décomposition de 60 en facteurs premiers ?', '2² × 3 × 5', [['6 × 10', '6 et 10 ne sont pas premiers.'], ['2 × 3 × 5', '2 × 3 × 5 = 30, pas 60.'], ['4 × 15', '4 et 15 ne sont pas premiers.']]),
    () => { const [n, d, w1, w2] = pick([[72, '2³ × 3²', '8 × 9', '2 × 3 × 12'], [90, '2 × 3² × 5', '9 × 10', '2 × 3 × 5'], [84, '2² × 3 × 7', '4 × 21', '2 × 3 × 7'], [126, '2 × 3² × 7', '2 × 63', '3 × 6 × 7'], [100, '2² × 5²', '10²', '2 × 5 × 10']]); return Q(`Décomposition de ${n} en produit de facteurs premiers ?`, d, [[w1, 'Les facteurs doivent tous être premiers.'], [w2, 'Vérifie : le produit doit redonner ' + n + ' et tous les facteurs doivent être premiers.']], { w: { type: 'ftree', nums: [n] } }); },
    Q('91 est-il premier ?', 'Non : 91 = 7 × 13', [['Oui, car il n’est divisible ni par 2, ni par 3, ni par 5', 'Il faut aussi tester 7 : 91 = 7 × 13.'], ['Oui, car il est impair', 'Être impair ne suffit pas : 9 est impair et 9 = 3 × 3.'], ['Non : 91 = 3 × 31', '3 × 31 = 93.']])]
});
concept({
  id: 'm-irr', ch: 'M2', title: 'Fraction irréductible', prereq: ['m-prem', 'cm-frac-s'],
  lesson: [
    { h: 'Simplifier avec les facteurs premiers', t: '<p>Une fraction est <b>irréductible</b> quand le numérateur et le dénominateur n’ont plus aucun diviseur commun autre que 1.</p>', w: { type: 'steps', lines: [`${F(84, 126)}`, `= ${F('2² × 3 × 7', '2 × 3² × 7')}`, `= ${F('<s>2</s> × 2 × <s>3</s> × <s>7</s>', '<s>2</s> × <s>3</s> × 3 × <s>7</s>')}`, `= ${F(2, 3)}`] } },
    { h: 'Visualiser', t: '', w: { type: 'fracbar', mode: 'simplify', a: 4, b: 6 } }],
  qs: [
    () => { const [a, b] = pick([[2, 3], [3, 4], [4, 5], [5, 6], [3, 7], [5, 8], [7, 9]]), k = pick([6, 8, 10, 12, 15]); const half = k % 2 === 0 ? F(a * k / 2, b * k / 2) : F(a * k / 3, b * k / 3); return Q(`Forme irréductible de ${F(a * k, b * k)} ?`, F(a, b), [[half, 'Cette fraction est égale, mais on peut encore simplifier.'], [F(b, a), 'Le numérateur reste en haut.'], [F(a * k - 1, b * k - 1), 'On ne retire pas le même nombre en haut et en bas.', 'cm-frac-s']]); },
    Q(`La fraction ${F(15, 28)} est-elle irréductible ?`, 'Oui : 15 = 3 × 5 et 28 = 2² × 7 n’ont aucun facteur commun', [['Non, on peut simplifier par 3', '28 n’est pas divisible par 3.'], ['Non, car 15 est impair et 28 est pair', 'Ce n’est pas une raison : 3/4 est irréductible.'], ['Non, on peut simplifier par 5', '28 n’est pas divisible par 5.']])]
});

/* ============ M3 Calcul algébrique ============ */
concept({
  id: 'm-pow', ch: 'M3', title: 'Règles sur les puissances', prereq: ['cm-pow', 'cm-frac-op'],
  lesson: [
    { h: 'Trois règles', t: '<p>Pour a non nul et m, n entiers relatifs :</p>', w: { type: 'powrule' } },
    { h: 'Exposants négatifs', t: `<p>a<sup>−n</sup> = ${F(1, 'a<sup>n</sup>')} : l’inverse, pas un nombre négatif.</p>`, w: { type: 'powers', a: 2, n: -3 } },
    { h: 'Puissance d’un produit', t: '<p>(ab)<sup>n</sup> = a<sup>n</sup> × b<sup>n</sup> : (3x)² = 9x².</p><p><b>Mais</b> (a + b)² ≠ a² + b² : la règle ne marche pas pour une somme.</p>' }],
  qs: [
    () => { const a = ri(2, 5), m = ri(2, 5), n = ri(3, 5); return Q(`${pw(a, m)} × ${pw(a, n)} = ?`, pw(a, m + n), [[pw(a, m * n), 'On ajoute les exposants : a<sup>m</sup> × a<sup>n</sup> = a<sup>m+n</sup>.'], [pw(a * a, m + n), 'La base ne change pas.'], [pw(a * a, m * n), 'La base ne change pas, et on ajoute les exposants.']], { exp: `${a}<sup>${m}</sup> × ${a}<sup>${n}</sup> = ${a}<sup>${m}+${n}</sup> = ${a}<sup>${m + n}</sup>.` }); },
    () => { const m = ri(2, 3), n = ri(3, 4); return Q(`(x${supDigits(m)})${supDigits(n)} = ?`, 'x' + supDigits(m * n), [['x' + supDigits(m + n), n + ' paquets de ' + m + ' facteurs : on multiplie les exposants.'], ['x' + supDigits(Math.pow(m, n)), 'On multiplie les exposants ' + m + ' et ' + n + '.'], [n + 'x' + supDigits(m), 'C’est une puissance, pas une multiplication par ' + n + '.']]); },
    () => { const a = ri(2, 9), m = ri(5, 9), n = ri(2, 4); return Q(`${F(pw(a, m), pw(a, n))} = ?`, pw(a, m - n), [[pw(a, m + n), 'Pour un quotient, on soustrait les exposants.'], [pw(1, m - n), 'La base reste ' + a + '.'], [pw(a, m / n === Math.floor(m / n) ? m / n : m * n), 'On soustrait les exposants (on ne les divise pas).']]); },
    Q('2⁻³ = ?', F(1, 8), [['−8', 'Un exposant négatif donne l’inverse, pas un nombre négatif : 2⁻³ = 1/2³.', 'cm-pow'], ['−6', '2⁻³ n’est pas 2 × (−3).', 'cm-pow'], [F(1, 6), '2³ = 2 × 2 × 2 = 8, pas 6.', 'cm-pow']]),
    Q('(3x)² = ?', '9x²', [['3x²', 'Le carré porte sur 3 et sur x : (3x)² = 3² × x².'], ['6x²', '3² = 9, pas 6.', 'cm-pow'], ['9x', 'x est aussi au carré.']])]
});
concept({
  id: 'm-rac', ch: 'M3', title: 'Racines carrées', prereq: ['cm-sq'],
  lesson: [
    { h: 'Définition', t: '<p>Pour a ≥ 0, √a est le nombre positif dont le carré vaut a : (√a)² = a.</p>', w: { type: 'sqroot', A: 50 } },
    { h: 'Règles', t: `<p>√(a × b) = √a × √b et √(${F('a', 'b')}) = ${F('√a', '√b')} (a, b positifs, b ≠ 0).</p><p><b>Mais</b> √(a + b) ≠ √a + √b : √(9 + 16) = √25 = 5, alors que √9 + √16 = 3 + 4 = 7.</p>` },
    { h: 'Simplifier et √(a²)', t: '', w: { type: 'steps', lines: ['√50 = √(25 × 2) = √25 × √2 = 5√2', '√72 = √(36 × 2) = 6√2', '√((−3)²) = √9 = 3 : en général √(a²) = |a|'] } }],
  qs: [
    Q('√(9 + 16) = ?', '5', [['7', 'On ne peut pas séparer la racine d’une somme : √(9 + 16) = √25.'], ['25', 'Il faut encore prendre la racine de 25.'], ['12,5', '√ ne veut pas dire « diviser par 2 ».', 'cm-sq']]),
    Q('√50 s’écrit aussi…', '5√2', [['25√2', '√50 = √25 × √2 = 5√2.'], ['2√5', '2√5 = √20.'], ['10√5', '10√5 = √500.']]),
    Q('√((−3)²) = ?', '3', [['−3', 'Une racine carrée est toujours positive : √(a²) = |a|.'], ['9', 'Il reste à prendre la racine de 9.'], ['impossible', '(−3)² = 9 est positif : sa racine existe.']]),
    () => { const [a, b, r] = pick([[2, 8, 4], [3, 12, 6], [2, 18, 6], [5, 20, 10], [3, 27, 9]]); return Q(`√${a} × √${b} = ?`, String(r), [['√' + (a + b), '√a × √b = √(a × b), pas √(a + b).'], [String(a * b), 'Il faut encore prendre la racine de ' + a * b + '.'], [String(r * r / 2), '√' + (a * b) + ' = ' + r + ' car ' + r + '² = ' + r * r + '.', 'cm-sq']]); },
    Q('(√7)² = ?', '7', [['49', '(√7)² = √7 × √7 = 7.'], ['14', 'Le carré n’est pas « fois 2 ».'], ['√14', 'Le carré d’une racine redonne le nombre.']])]
});
concept({
  id: 'm-idr', ch: 'M3', title: 'Identités remarquables', prereq: ['cm-dist'],
  lesson: [
    { h: '(a + b)² = a² + 2ab + b²', t: '<p>Le carré de côté a + b contient a², b² et <b>deux</b> rectangles ab.</p>', w: { type: 'area', mode: 'sq+', a: 5, b: 2 } },
    { h: '(a − b)² = a² − 2ab + b²', t: '', w: { type: 'area', mode: 'sq-', a: 6, b: 2 } },
    { h: '(a + b)(a − b) = a² − b²', t: '', w: { type: 'area', mode: 'diff', a: 6, b: 2 } },
    { h: 'Dans les deux sens', t: '<p>Développer : (x + 3)² = x² + 6x + 9. Factoriser : x² + 6x + 9 = (x + 3)². Repère le double produit !</p>' }],
  qs: [
    () => { const a = ri(2, 9); return Q(`Développe : (x + ${a})²`, poly([[1, 'x²'], [2 * a, 'x'], [a * a, '']]), [[poly([[1, 'x²'], [a * a, '']]), 'Il manque le double produit 2 × x × ' + a + ' = ' + 2 * a + 'x.'], [poly([[1, 'x²'], [a, 'x'], [a * a, '']]), 'Le double produit vaut 2 × x × ' + a + '.'], [poly([[1, 'x²'], [2 * a, 'x'], [2 * a, '']]), a + '² = ' + a * a + ', pas ' + 2 * a + '.', 'cm-pow']]); },
    () => { const a = ri(2, 9); return Q(`Développe : (x − ${a})²`, poly([[1, 'x²'], [-2 * a, 'x'], [a * a, '']]), [[poly([[1, 'x²'], [-a * a, '']]), 'Il manque le double produit, et (−' + a + ')² = +' + a * a + '.'], [poly([[1, 'x²'], [-2 * a, 'x'], [-a * a, '']]), '(−' + a + ')² = +' + a * a + ' : le dernier terme est positif.', 'cm-rel'], [poly([[1, 'x²'], [2 * a, 'x'], [a * a, '']]), 'Le double produit est négatif : 2 × x × (−' + a + ').']]); },
    () => { const a = ri(2, 9); return Q(`Développe : (x + ${a})(x − ${a})`, poly([[1, 'x²'], [-a * a, '']]), [[poly([[1, 'x²'], [a * a, '']]), 'x × (−' + a + ') + ' + a + ' × x = 0, et ' + a + ' × (−' + a + ') = −' + a * a + '.'], [poly([[1, 'x²'], [-2 * a, 'x'], [a * a, '']]), 'Ça, c’est (x − ' + a + ')².'], [poly([[1, 'x²'], [-2 * a, '']]), a + ' × ' + a + ' = ' + a * a + '.']]); },
    () => { const a = ri(1, 7); return Q(`Développe : (2x + ${a})²`, poly([[4, 'x²'], [4 * a, 'x'], [a * a, '']]), [[poly([[2, 'x²'], [4 * a, 'x'], [a * a, '']]), '(2x)² = 2² × x² = 4x².', 'm-pow'], [poly([[4, 'x²'], [a * a, '']]), 'Il manque le double produit 2 × 2x × ' + a + '.'], [poly([[4, 'x²'], [2 * a, 'x'], [a * a, '']]), 'Le double produit vaut 2 × 2x × ' + a + ' = ' + 4 * a + 'x.']]); }]
});
concept({
  id: 'm-fact', ch: 'M3', title: 'Factoriser', prereq: ['m-idr', 'cm-dist'],
  lesson: [
    { h: 'Factoriser = écrire un produit', t: '<p>On repère un <b>facteur commun</b> : ka + kb = k(a + b).</p>', w: { type: 'steps', lines: ['3x² + 6x', '= 3x × x + 3x × 2', '= 3x(x + 2)', 'Vérification : 3x(x + 2) = 3x² + 6x ✓'] } },
    { h: 'Avec les identités', t: '', w: { type: 'steps', lines: ['x² − 25 = x² − 5² = (x − 5)(x + 5)', 'x² − 10x + 25 = x² − 2 × x × 5 + 5² = (x − 5)²', '4x² − 9 = (2x)² − 3² = (2x − 3)(2x + 3)'] } },
    { h: 'Facteur commun entre parenthèses', t: '', w: { type: 'steps', lines: ['(x + 1)(2x − 3) + (x + 1)(x + 4)', '= (x + 1)[(2x − 3) + (x + 4)]', '= (x + 1)(3x + 1)'] } }],
  qs: [
    () => { const k = ri(2, 9), b = ri(2, 9); return Q(`Factorise : ${poly([[k, 'x'], [k * b, '']])}`, `${k}(x + ${b})`, [[`${k}(x + ${k * b})`, 'En développant ' + k + '(x + ' + k * b + ') on obtient ' + k + 'x + ' + k * k * b + '.', 'cm-dist'], [`x(${k} + ${k * b})`, k * b + ' ne contient pas x : x n’est pas un facteur commun.'], [`${k}x(1 + ${b})`, 'Développe pour vérifier : ' + k + 'x(1 + ' + b + ') = ' + k * (1 + b) + 'x.']]); },
    () => { const a = ri(2, 9); return Q(`Factorise : x² − ${a * a}`, `(x − ${a})(x + ${a})`, [[`(x − ${a})²`, '(x − ' + a + ')² = x² − ' + 2 * a + 'x + ' + a * a + '.', 'm-idr'], [`(x − ${a * a})(x + ${a * a})`, a * a + ' = ' + a + '² : on utilise ' + a + ', pas ' + a * a + '.'], [`x(x − ${a * a})`, 'Développe : x(x − ' + a * a + ') = x² − ' + a * a + 'x.']]); },
    Q('Factorise : 4x² − 12x', '4x(x − 3)', [['4(x² − 12x)', '4 × (−12x) = −48x : ça ne redonne pas l’expression.'], ['x(4x − 3)', 'x × (−3) = −3x, pas −12x.'], ['4x(x − 12)', '4x × (−12) = −48x.']]),
    Q('Factorise : x² + 10x + 25', '(x + 5)²', [['(x + 25)²', '25 = 5² : le terme est 5.'], ['(x + 5)(x − 5)', 'Ça donne x² − 25.', 'm-idr'], ['(x + 10)²', '(x + 10)² = x² + 20x + 100.']])]
});
concept({
  id: 'm-eq1', ch: 'M3', title: 'Équations : 1er degré, produit nul, x² = a', prereq: ['cm-eq', 'm-fact', 'm-rac'],
  lesson: [
    { h: 'Équation produit nul', t: '<p>Un produit est nul <b>si et seulement si</b> l’un de ses facteurs est nul.</p>', w: { type: 'steps', lines: ['(x − 2)(3x + 6) = 0', 'x − 2 = 0 ou 3x + 6 = 0', 'x = 2 ou x = −2', 'S = {−2 ; 2}'] } },
    { h: 'x² = a', t: '<p>Si a &gt; 0 : deux solutions, √a et −√a. Si a = 0 : une solution, 0. Si a &lt; 0 : aucune solution (un carré n’est jamais négatif). Fais bouger la droite y = k :</p>', w: { type: 'graph', mode: 'antecedent', fns: [{ f: x => x * x, label: 'y = x²' }], xmin: -5, xmax: 5, ymin: -3, ymax: 12, k: 4, lstep: 1, ylstep: 2 } },
    { h: 'Méthode générale', t: '<p>Pour une équation de degré 2 : on ramène tout d’un côté (= 0), on <b>factorise</b>, puis on utilise le produit nul.</p>', w: { type: 'steps', lines: ['x² = 3x', 'x² − 3x = 0', 'x(x − 3) = 0', 'x = 0 ou x = 3', '⚠ Diviser par x ferait perdre la solution 0 !'] } }],
  qs: [
    () => { const a = ri(1, 9), b = ri(1, 9); return Q(`Solutions de (x − ${a})(x + ${b}) = 0 ?`, `x = ${a} ou x = −${b}`, [[`x = −${a} ou x = ${b}`, 'x − ' + a + ' = 0 donne x = ' + a + '.'], [`x = ${a} ou x = ${b}`, 'x + ' + b + ' = 0 donne x = −' + b + '.'], [`x = ${a} seulement`, 'Il y a deux facteurs : chacun peut être nul.']]); },
    Q('Solutions de x² = 16 ?', 'x = 4 ou x = −4', [['x = 4', 'N’oublie pas −4 : (−4)² = 16.'], ['x = 8', '8² = 64, pas 16.', 'cm-sq'], ['aucune', '4² = 16.']]),
    Q('Solutions de x² = −9 ?', 'aucune solution réelle', [['x = 3 ou x = −3', '3² = 9 et (−3)² = 9 : un carré n’est jamais négatif.'], ['x = −3', '(−3)² = +9.', 'cm-rel'], ['x = −81', '(−81)² est positif.']]),
    Q('Pour résoudre x² − 9 = 0, on peut écrire…', '(x − 3)(x + 3) = 0, donc x = 3 ou x = −3', [['x = 9', 'x² = 9 donne x = 3 ou x = −3.'], ['(x − 3)² = 0, donc x = 3', 'x² − 9 n’est pas égal à (x − 3)².', 'm-idr'], ['x = 4,5', 'x² ne veut pas dire 2x.']]),
    () => { const x = nz(-6, 6), a = ri(2, 6), b = nz(-9, 9), c = a * x + b; return Q(`Résous : ${poly([[a, 'x'], [b, '']])} = ${nf(c)}`, 'x = ' + nf(x), [['x = ' + nf(+((c + b) / a).toFixed(2)), 'Pour enlever ' + sgn(b) + ', on fait l’opération inverse.', 'cm-eq'], ['x = ' + nf(c - b - a), 'On divise par ' + a + '.', 'cm-eq'], ['x = ' + nf(+(c / a - b).toFixed(2)), 'D’abord enlever ' + nf(b) + ', ensuite diviser.', 'cm-eq']]); }]
});
concept({
  id: 'm-ineq', ch: 'M3', title: 'Inéquations du 1er degré', prereq: ['cm-eq', 'm-int'],
  lesson: [
    { h: 'Comme une équation… presque', t: '<p>On peut ajouter, soustraire, multiplier ou diviser les deux membres par un même nombre. <b>Mais</b> si on multiplie ou divise par un nombre <b>négatif</b>, on <b>change le sens</b> de l’inégalité.</p>', w: { type: 'steps', lines: ['2 &lt; 5', 'Multiplions par −1 : −2 et −5', '−2 &gt; −5 : le sens a changé ! (sur la droite, −2 est à droite de −5)'] } },
    { h: 'Exemple', t: '', w: { type: 'steps', lines: ['−3x + 6 ≤ 0', '−3x ≤ −6', 'x ≥ 2 <span class="muted small">(division par −3 : le sens change)</span>', 'S = [2 ; +∞['] } },
    { h: 'Visualiser la solution', t: '', w: { type: 'numline', min: -2, max: 6, x: 3, presets: [{ a: 2, b: Infinity, ca: 1, label: '[2 ; +∞[', note: 'x ≥ 2' }] } }],
  qs: [
    () => { const a = ri(2, 6), s = nz(-5, 6), b = nz(-9, 9), c = a * s + b; return Q(`Solutions de ${poly([[a, 'x'], [b, '']])} &lt; ${nf(c)} ?`, itv(-Infinity, s, 0, 0), [[itv(-Infinity, s, 0, 1), 'Inégalité stricte (&lt;) : ' + nf(s) + ' est exclu.', 'm-int'], [itv(s, Infinity, 0, 0), a + ' est positif : le sens ne change pas, x &lt; ' + nf(s) + '.'], [itv(-Infinity, +((c + b) / a).toFixed(2), 0, 0), 'Pour enlever ' + sgn(b) + ', on fait l’opération inverse.', 'cm-eq']]); },
    () => { const a = ri(2, 6), s = nz(-5, 6), b = nz(-9, 9), c = -a * s + b; return Q(`Solutions de ${poly([[-a, 'x'], [b, '']])} ≥ ${nf(c)} ?`, itv(-Infinity, s, 0, 1), [[itv(s, Infinity, 1, 0), 'On divise par −' + a + ', un nombre négatif : on change le sens de l’inégalité.'], [itv(-Infinity, s, 0, 0), '≥ : la borne ' + nf(s) + ' est incluse.', 'm-int'], [itv(-Infinity, -s, 0, 1), 'Attention aux signes : −' + a + 'x ≥ ' + nf(c - b) + '.', 'cm-rel']]); },
    Q('Si x > 3, alors −2x…', '&lt; −6', [['&gt; −6', 'Multiplier par −2 (négatif) change le sens de l’inégalité.'], ['&gt; 6', '3 × (−2) = −6.'], ['&lt; 6', '3 × (−2) = −6.']])]
});

/* ============ M4 Fonctions : généralités ============ */
const fPar = x => -(x - 2) * (x - 2) + 4;
concept({
  id: 'm-fimg', ch: 'M4', title: 'Image et antécédent', prereq: ['cm-prio'],
  lesson: [
    { h: 'Une machine à nombres', t: '<p>Une fonction f associe à chaque nombre x <b>un seul</b> nombre f(x), appelé <b>l’image</b> de x.</p>', w: { type: 'graph', mode: 'image', fns: [{ f: x => x * x - 2, label: 'f' }], xmin: -4, xmax: 4, ymin: -3, ymax: 8, x: 2, formula: x => `f(${nf(x)}) = ${par(x)}² − 2 = ${nf(x * x - 2)}` } },
    { h: 'Antécédents', t: '<p>Si f(a) = b, on dit que a est <b>un antécédent</b> de b. Un nombre a une seule image, mais il peut avoir zéro, un ou plusieurs antécédents.</p>', w: { type: 'graph', mode: 'antecedent', fns: [{ f: x => x * x - 2, label: 'f' }], xmin: -4, xmax: 4, ymin: -3, ymax: 8, k: 2 } }],
  qs: [
    () => { const c = ri(1, 6), a = ri(2, 5); return Q(`f(x) = x² − ${c}. Image de −${a} par f ?`, nf(a * a - c), [[nf(-a * a - c), '(−' + a + ')² = +' + a * a + ' : le carré d’un nombre négatif est positif.', 'cm-rel'], [nf(-2 * a - c), '(−' + a + ')² = (−' + a + ') × (−' + a + '), pas 2 × (−' + a + ').', 'cm-pow'], [nf(a * a + c), 'f(−' + a + ') = ' + a * a + ' − ' + c + '.']]); },
    () => { const m = ri(2, 5), p = ri(1, 7), x = ri(2, 6), y = m * x - p; return Q(`f(x) = ${m}x − ${p}. Quel est l’antécédent de ${y} par f ?`, nf(x), [[nf(m * y - p), 'Ça, c’est l’image de ' + y + '. On cherche x tel que f(x) = ' + y + '.'], [nf(+((y - p) / m).toFixed(2)), 'On résout ' + m + 'x − ' + p + ' = ' + y + ' : on ajoute ' + p + ' des deux côtés.', 'cm-eq'], [nf(y + p), 'Il reste à diviser par ' + m + '.', 'cm-eq']]); },
    Q('On sait que f(2) = 7. Que peut-on dire ?', '7 est l’image de 2 par f', [['2 est l’image de 7 par f', 'f(2) = 7 : on part de 2 et on obtient 7.'], ['7 est un antécédent de 2', 'C’est 2 qui est un antécédent de 7.'], ['f = 3,5', 'f(2) n’est pas f × 2 : c’est l’image de 2.']]),
    Q('Voici la courbe de f. Que vaut f(3) ?', '3', [['1', '1 est un antécédent de 3. Pour f(3), on part de 3 sur l’axe horizontal.'], ['4', '4 est la valeur maximale, atteinte en x = 2.'], ['0', 'On lit la hauteur du point de la courbe d’abscisse 3.']], { w: { type: 'graph', fns: [{ f: fPar, label: 'f' }], xmin: -1, xmax: 5, ymin: -2, ymax: 5 } }),
    Q('Voici la courbe de f. Antécédents de 3 ?', '1 et 3', [['3 seulement', 'Il y a deux points de la courbe à la hauteur 3.'], ['f(3)', 'On cherche les x tels que f(x) = 3.'], ['4', 'On part de 3 sur l’axe vertical, et on lit les abscisses des points de la courbe à cette hauteur.']], { w: { type: 'graph', fns: [{ f: fPar, label: 'f' }], xmin: -1, xmax: 5, ymin: -2, ymax: 5 } })]
});
concept({
  id: 'm-fcourbe', ch: 'M4', title: 'Courbe représentative', prereq: ['m-fimg', 'cm-coord'],
  lesson: [
    { h: 'Un point sur la courbe', t: '<p>Le point M(x ; y) est sur la courbe de f <b>si et seulement si</b> y = f(x).</p>', w: { type: 'graph', mode: 'point', fns: [{ f: x => 0.5 * x * x - 1, label: 'f' }], xmin: -4, xmax: 4, ymin: -2, ymax: 7, px: 2, py: 1 } },
    { h: 'Pour vérifier', t: '<p>On calcule f(abscisse) et on compare à l’ordonnée. Exemple : f(x) = 0,5x² − 1 et A(2 ; 1) : f(2) = 0,5 × 4 − 1 = 1. Égal à l’ordonnée : A est sur la courbe.</p>' }],
  qs: [
    () => { const c = ri(1, 5), x = ri(1, 4), on = Math.random() < .5, y = x * x + c + (on ? 0 : pick([-1, 1, 2])); return Q(`A(${x} ; ${y}) est-il sur la courbe de f(x) = x² + ${c} ?`, on ? `Oui, car f(${x}) = ${y}` : `Non, car f(${x}) = ${x * x + c} ≠ ${y}`, on ? [[`Non, car f(${y}) ≠ ${x}`, 'On calcule l’image de l’abscisse (' + x + '), pas de l’ordonnée.', 'cm-coord'], [`Non, car f(${x}) = ${2 * x + c}`, x + '² = ' + x * x + ', pas ' + 2 * x + '.', 'cm-pow'], ['On ne peut pas savoir sans tracer la courbe', 'Le calcul de f(' + x + ') suffit.']] : [[`Oui, car f(${x}) = ${y}`, 'Recalcule : ' + x + '² + ' + c + ' = ' + (x * x + c) + '.'], [`Oui, car ${x} &lt; ${y}`, 'Il faut comparer f(abscisse) et l’ordonnée.'], ['On ne peut pas savoir sans tracer la courbe', 'Le calcul de f(' + x + ') suffit.']]); },
    Q('f(x) = 2x² − 3. Ordonnée du point de la courbe d’abscisse −1 ?', '−1', [['−5', '(−1)² = 1, donc 2 × 1 − 3 = −1.', 'cm-rel'], ['1', '2 × (−1)² − 3 = 2 − 3 = −1.'], ['7', '(−1)² = 1, pas 4.']]),
    Q('La courbe de f coupe l’axe des ordonnées au point…', '(0 ; f(0))', [['(f(0) ; 0)', 'Sur l’axe des ordonnées, l’abscisse vaut 0.', 'cm-coord'], ['(0 ; 0)', 'Seulement si f(0) = 0.'], ['(1 ; f(1))', 'L’axe des ordonnées correspond à x = 0.']])]
});
const fQ = x => 0.5 * x * x - 2;
concept({
  id: 'm-flect', ch: 'M4', title: 'Résoudre graphiquement', prereq: ['m-fcourbe', 'm-int'],
  lesson: [
    { h: 'f(x) = k', t: '<p>Les solutions sont les <b>abscisses</b> des points d’intersection de la courbe avec la droite horizontale y = k.</p>', w: { type: 'graph', mode: 'antecedent', fns: [{ f: fQ, label: 'f' }], xmin: -4, xmax: 4, ymin: -3, ymax: 6, k: 0 } },
    { h: 'f(x) &lt; k', t: '<p>Les solutions sont les abscisses des points où la courbe est <b>en dessous</b> de la droite y = k.</p>', w: { type: 'graph', mode: 'ineq', fns: [{ f: fQ, label: 'f' }], xmin: -4, xmax: 4, ymin: -3, ymax: 6, k: 0 } }],
  qs: [
    Q('Graphiquement, solutions de f(x) = 0 ?', '−2 et 2', [['−2 seulement', 'La courbe coupe l’axe des abscisses en deux points.'], ['0', 'On cherche les x pour lesquels f(x) vaut 0, pas x = 0.', 'm-fimg'], ['−2 et 0', 'Il faut lire les abscisses des points de la courbe situés à la hauteur 0.']], { w: { type: 'graph', fns: [{ f: fQ, label: 'f' }], xmin: -4, xmax: 4, ymin: -3, ymax: 6 } }),
    Q('Graphiquement, solutions de f(x) &lt; 0 ?', ']−2 ; 2[', [[']−∞ ; −2[ ∪ ]2 ; +∞[', 'Là, la courbe est au-dessus de l’axe : f(x) &gt; 0.'], ['[−2 ; 2]', 'Inégalité stricte : en −2 et 2, f(x) = 0, ce n’est pas &lt; 0.', 'm-int'], [']−2 ; 0[', 'La courbe est sous l’axe de −2 jusqu’à 2.']], { w: { type: 'graph', fns: [{ f: fQ, label: 'f' }], xmin: -4, xmax: 4, ymin: -3, ymax: 6 } }),
    Q('Graphiquement, solutions de f(x) = −3 ?', 'aucune solution', [['−3', 'On cherche les x tels que f(x) = −3 : la droite y = −3 ne coupe pas la courbe.', 'm-fimg'], ['0', 'f(0) = −2, pas −3.'], ['−2 et 2', 'Ce sont les solutions de f(x) = 0.']], { w: { type: 'graph', fns: [{ f: fQ, label: 'f' }], xmin: -4, xmax: 4, ymin: -4, ymax: 6 } })]
});
concept({
  id: 'm-faff', ch: 'M4', title: 'Fonctions affines', prereq: ['m-fcourbe', 'cm-prop'],
  lesson: [
    { h: 'f(x) = mx + p', t: '<p>La courbe d’une fonction affine est une <b>droite</b>. Bouge m et p :</p>', w: { type: 'graph', mode: 'affine', xmin: -5, xmax: 5, ymin: -5, ymax: 5, m: 1, p: 1 } },
    { h: 'Calculer m', t: `<p>Si la droite passe par A(x<sub>A</sub> ; y<sub>A</sub>) et B(x<sub>B</sub> ; y<sub>B</sub>) : m = ${F('y<sub>B</sub> − y<sub>A</sub>', 'x<sub>B</sub> − x<sub>A</sub>')}.</p><p>Si p = 0, f(x) = mx est <b>linéaire</b> : c’est une situation de proportionnalité, la droite passe par l’origine.</p>` }],
  qs: [
    () => { const m = nz(-5, 5), p = nz(-6, 6); return Q(`f(x) = ${nf(p)} ${m < 0 ? '−' : '+'} ${Math.abs(m) === 1 ? '' : Math.abs(m)}x. Coefficient directeur m ?`, nf(m), [[nf(p), 'Le coefficient directeur est le nombre qui multiplie x.'], [nf(-m), 'Attention au signe devant x.', 'cm-rel'], [nf(m + p), 'm est seulement le coefficient de x.']]); },
    () => { const m = nz(-3, 3), p = nz(-4, 4), a = ri(-3, 0), b = a + ri(2, 3); const fa = m * a + p, fb = m * b + p; return Q(`La droite passe par A(${nf(a)} ; ${nf(fa)}) et B(${nf(b)} ; ${nf(fb)}). Coefficient directeur ?`, nf(m), [[nf(+((b - a) / (fb - fa)).toFixed(2)), 'm = (y<sub>B</sub> − y<sub>A</sub>) / (x<sub>B</sub> − x<sub>A</sub>) : les ordonnées en haut.'], [nf(fb - fa), 'Il faut diviser par x<sub>B</sub> − x<sub>A</sub> = ' + nf(b - a) + '.'], [nf(+((fb + fa) / (b - a)).toFixed(2)), 'On soustrait les ordonnées.', 'cm-rel'], [nf(-m), 'Attention à l’ordre : y<sub>B</sub> − y<sub>A</sub> et x<sub>B</sub> − x<sub>A</sub>, dans le même ordre.', 'cm-rel']]); },
    Q('f(x) = −0,5x + 4 est…', 'décroissante', [['croissante, car 4 &gt; 0', 'C’est le signe de m (−0,5) qui donne le sens de variation, pas p.'], ['constante', 'm ≠ 0 : la fonction n’est pas constante.'], ['croissante puis décroissante', 'Une droite garde toujours le même sens de variation.']]),
    Q('Laquelle de ces fonctions est linéaire ?', 'f(x) = 7x', [['f(x) = 7x + 1', 'Linéaire : p = 0 (la droite passe par l’origine).'], ['f(x) = 7', 'C’est une fonction constante.'], ['f(x) = x²', 'Ce n’est pas une fonction affine.']])]
});
