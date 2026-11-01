'use strict';
/* ============ PHYSIQUE-CHIMIE : bases du collège ============ */
concept({
  id: 'cp-etats', ch: 'CP', title: 'États de la matière (modèle particulaire)',
  lesson: [
    { h: 'Trois états, trois organisations', t: '<p>La matière est faite de particules minuscules, toujours en mouvement. Leur organisation donne l’état.</p>', w: { type: 'particles', state: 'solid' } },
    { h: 'L’eau selon la température', t: '<p>Sous la pression atmosphérique normale, l’eau pure est solide en dessous de 0 °C, liquide entre 0 °C et 100 °C, gazeuse au-dessus de 100 °C.</p>', w: { type: 'particles', temp: true, T: 20, state: 'liquid' } }],
  qs: [
    Q('Dans un liquide, les particules sont…', 'proches les unes des autres et désordonnées', [['éloignées et désordonnées', 'C’est le cas d’un gaz.'], ['proches et ordonnées', 'C’est le cas d’un solide.'], ['immobiles', 'Les particules bougent toujours (dans un solide, elles vibrent sur place).']]),
    Q('Quel état n’a ni forme propre ni volume propre ?', 'l’état gazeux', [['l’état liquide', 'Un liquide a un volume propre (il ne remplit pas tout le récipient).'], ['l’état solide', 'Un solide a une forme et un volume propres.'], ['aucun', 'Un gaz occupe tout l’espace disponible.']]),
    Q('Sous la pression normale, l’eau pure à 50 °C est…', 'liquide', [['gazeuse', 'L’eau bout à 100 °C.'], ['solide', 'La glace fond à 0 °C.'], ['à moitié liquide, à moitié gazeuse', 'À 50 °C, l’eau est liquide.']])]
});
concept({
  id: 'cp-chg', ch: 'CP', title: 'Changements d’état', prereq: ['cp-etats'],
  lesson: [
    { h: 'Les six changements d’état', t: '<p>Touche chaque flèche. Pendant un changement d’état, <b>la masse se conserve</b> (le volume, lui, peut changer).</p>', w: { type: 'states' } }],
  qs: [
    Q('Le passage de l’état liquide à l’état gazeux s’appelle…', 'la vaporisation', [['la condensation', 'Condensation : gaz → solide. Gaz → liquide se dit liquéfaction.'], ['la fusion', 'Fusion : solide → liquide.'], ['la solidification', 'Solidification : liquide → solide.']]),
    Q('La buée sur un miroir après la douche : la vapeur d’eau…', 'se liquéfie (gaz → liquide)', [['se vaporise', 'Vaporisation : liquide → gaz. Ici, c’est l’inverse.'], ['se solidifie', 'La buée est liquide, pas solide.'], ['fond', 'Fusion : solide → liquide.']]),
    Q('Quand 100 g de glace fondent, on obtient…', '100 g d’eau liquide', [['moins de 100 g d’eau', 'Le volume change un peu, mais la masse se conserve.'], ['plus de 100 g d’eau', 'Aucune matière n’est ajoutée : la masse se conserve.'], ['on ne peut pas savoir', 'Lors d’un changement d’état, la masse se conserve.']])]
});
concept({
  id: 'cp-unit', ch: 'CP', title: 'Masses, volumes et conversions',
  lesson: [{ h: 'À connaître par cœur', t: '<table class="simple"><tr><td>1 L = 1 000 mL = 1 dm³</td></tr><tr><td>1 mL = 1 cm³</td></tr><tr><td>1 m³ = 1 000 L</td></tr><tr><td>1 kg = 1 000 g ; 1 g = 1 000 mg</td></tr></table>', w: { type: 'steps', lines: ['250 mL = 250 ÷ 1 000 L = 0,250 L', '1,5 L = 1,5 × 1 000 mL = 1 500 mL', '75 cm³ = 75 mL = 0,075 L', '2,4 kg = 2 400 g'] } }],
  qs: [
    () => { const v = pick([50, 125, 200, 250, 500, 750]); return Q(`${v} mL = ? L`, nf(v / 1000), [[nf(v / 100), '1 L = 1 000 mL : on divise par 1 000.'], [nf(v * 1000), 'Le litre est plus grand que le millilitre : le nombre doit diminuer.'], [nf(v / 10000), 'On divise par 1 000, pas par 10 000.']]); },
    Q('1 cm³ = ?', '1 mL', [['1 L', '1 L = 1 dm³ = 1 000 cm³.'], ['10 mL', '1 cm³ = 1 mL exactement.'], ['1 dL', '1 dL = 100 mL.']]),
    () => { const g = pick([350, 1250, 80, 2500, 45]); return Q(`${nf(g)} g = ? kg`, nf(g / 1000), [[nf(g / 100), '1 kg = 1 000 g : on divise par 1 000.'], [nf(g * 1000), 'Le kilogramme est plus grand : le nombre doit diminuer.'], [nf(g / 10), 'On divise par 1 000.']]); },
    Q('1 m³ = ?', '1 000 L', [['100 L', '1 m = 10 dm, donc 1 m³ = 10 × 10 × 10 dm³ = 1 000 dm³ = 1 000 L.'], ['1 L', 'Un mètre cube, c’est un cube d’un mètre de côté : bien plus qu’un litre.'], ['1 000 000 L', '1 m³ = 1 000 dm³ = 1 000 L.']])]
});
concept({
  id: 'cp-quot', ch: 'CP', title: 'Utiliser une formule quotient', prereq: ['cm-eq'],
  lesson: [{ h: 'Isoler une grandeur', t: '<p>Avec ρ = m / V, on peut retrouver m ou V. Vérifie avec des nombres simples : 6 = 12 ÷ 2, donc 12 = 6 × 2 et 2 = 12 ÷ 6.</p>', w: { type: 'steps', lines: ['ρ = m / V', 'On multiplie les deux membres par V : m = ρ × V', 'On divise les deux membres par ρ : V = m / ρ', 'Même chose avec v = d / t : d = v × t et t = d / v'] } }],
  qs: [
    Q('Si ρ = m / V, alors m = ?', 'ρ × V', [['ρ / V', 'On multiplie les deux membres par V.', 'cm-eq'], ['V / ρ', 'Teste avec 6 = 12 ÷ 2 : m = 12 = 6 × 2.'], ['ρ + V', 'On multiplie, on n’additionne pas.']]),
    Q('Si v = d / t, alors t = ?', 'd / v', [['d × v', 'Teste avec 50 = 100 ÷ 2 : t = 2 = 100 ÷ 50.'], ['v / d', 'Teste avec 50 = 100 ÷ 2 : 50 ÷ 100 = 0,5 ≠ 2.'], ['v − d', 'On divise, on ne soustrait pas.']]),
    () => { const t = pick([2, 3, 4]), v = pick([60, 75, 80, 90]); return Q(`Une voiture parcourt ${v * t} km en ${t} h. Sa vitesse moyenne ?`, v + ' km/h', [[v * t * t + ' km/h', 'v = d / t : on divise par la durée.'], [nf(+(t / (v * t)).toFixed(3)) + ' km/h', 'v = d / t, pas t / d.'], [(v * t + t) + ' km/h', 'On divise, on n’additionne pas.']]); }]
});
concept({
  id: 'cp-atome', ch: 'CP', title: 'L’atome (collège)',
  lesson: [{ h: 'Noyau et électrons', t: '<p>Un atome est formé d’un <b>noyau</b> chargé positivement et d’<b>électrons</b> chargés négativement qui se déplacent autour. Il est <b>électriquement neutre</b>.</p>', w: { type: 'atom', Z: 6, N: 6 } }],
  qs: [
    Q('Un atome est composé…', 'd’un noyau et d’électrons qui l’entourent', [['uniquement d’électrons', 'Il y a aussi un noyau, au centre.'], ['de plusieurs ions', 'Un ion est un atome qui a gagné ou perdu des électrons.'], ['de plusieurs molécules', 'C’est l’inverse : une molécule est un assemblage d’atomes.']]),
    Q('Pourquoi un atome est-il électriquement neutre ?', 'Il contient autant de charges positives (dans le noyau) que d’électrons', [['Ses particules n’ont pas de charge', 'Le noyau est positif et les électrons sont négatifs.'], ['Il n’a pas d’électrons', 'Tous les atomes ont des électrons.'], ['Le noyau est neutre', 'Le noyau est chargé positivement.']]),
    Q('La charge du noyau d’un atome est…', 'positive', [['négative', 'Ce sont les électrons qui sont négatifs.'], ['nulle', 'Le noyau contient des charges positives.'], ['variable selon les électrons', 'Le noyau ne dépend pas des électrons.']])]
});

/* ============ P1 Corps purs et mélanges ============ */
concept({
  id: 'p-cpm', ch: 'P1', title: 'Corps pur ou mélange ?', prereq: ['cp-etats'],
  lesson: [
    { h: 'Espèce chimique', t: '<p>Une <b>espèce chimique</b> est un ensemble d’entités identiques (mêmes molécules, mêmes atomes ou mêmes ions). Un <b>corps pur</b> ne contient qu’une seule espèce chimique ; un <b>mélange</b> en contient plusieurs.</p>', w: { type: 'particles', mixes: true } },
    { h: 'Homogène ou hétérogène', t: '<p><b>Homogène</b> : on ne distingue pas les constituants à l’œil nu (eau salée, eau minérale, air). <b>Hétérogène</b> : on les distingue (eau et huile, jus d’orange avec pulpe).</p><p>⚠ L’eau minérale est un <b>mélange</b> : elle contient de l’eau et des sels minéraux dissous.</p>' }],
  qs: [
    Q('L’eau minérale est…', 'un mélange homogène', [['un corps pur', 'L’eau minérale contient de l’eau et des sels minéraux dissous : plusieurs espèces chimiques.'], ['un mélange hétérogène', 'On ne distingue pas ses constituants à l’œil nu.'], ['une espèce chimique', 'Elle en contient plusieurs.']]),
    Q('Un mélange d’eau et d’huile est…', 'un mélange hétérogène', [['un mélange homogène', 'On voit deux couches : on distingue les constituants.'], ['un corps pur', 'Il y a deux espèces chimiques.'], ['une solution', 'L’huile ne se dissout pas dans l’eau.']]),
    Q('L’air est…', 'un mélange, surtout de diazote et de dioxygène', [['un corps pur', 'L’air contient plusieurs gaz.'], ['une espèce chimique', 'L’air contient plusieurs espèces chimiques.'], ['du dioxygène pur', 'Le dioxygène ne représente qu’environ 21 % de l’air.']]),
    Q('Un corps pur est constitué…', 'd’une seule espèce chimique', [['d’un seul atome', 'L’eau pure est un corps pur, et pourtant ses molécules H₂O contiennent 3 atomes.'], ['d’une seule phase visible', 'L’eau salée n’a qu’une phase, mais c’est un mélange.'], ['d’un seul état physique', 'Un mélange peut aussi être dans un seul état.']])]
});
const TCH = '<table class="simple"><tr><th>Espèce</th><th>Fusion</th><th>Ébullition</th></tr><tr><td>eau</td><td>0 °C</td><td>100 °C</td></tr><tr><td>éthanol</td><td>−114 °C</td><td>78 °C</td></tr><tr><td>cyclohexane</td><td>6,5 °C</td><td>81 °C</td></tr></table>';
concept({
  id: 'p-ident', ch: 'P1', title: 'Identifier une espèce par ses températures de changement d’état', prereq: ['p-cpm', 'cp-chg'],
  lesson: [
    { h: 'Le palier du corps pur', t: '<p>Pendant le changement d’état d’un corps pur, la température reste <b>constante</b>.</p>', w: { type: 'heating' } },
    { h: 'Une carte d’identité', t: '<p>Les températures de fusion et d’ébullition (sous pression normale) caractérisent une espèce chimique : on les compare à des valeurs de référence.</p>' + TCH }],
  qs: [
    Q('Pendant la fusion d’un corps pur, la température…', 'reste constante', [['augmente régulièrement', 'C’est le cas d’un mélange : pas de palier.'], ['diminue', 'On chauffe, mais l’énergie sert au changement d’état : la température reste constante.'], ['augmente puis diminue', 'Il y a un palier : la température ne varie pas.']]),
    Q('Un liquide pur bout à 78 °C sous pression normale. D’après le tableau, c’est…' + TCH, 'de l’éthanol', [['de l’eau', 'L’eau bout à 100 °C.'], ['du cyclohexane', 'Le cyclohexane bout à 81 °C.'], ['un mélange', 'On a observé une température d’ébullition fixe : c’est un corps pur.']]),
    Q('Pendant la solidification d’un liquide, la température baisse sans palier. Ce liquide est…', 'un mélange', [['un corps pur', 'Un corps pur présente un palier de température.'], ['de l’eau pure', 'L’eau pure se solidifie à 0 °C, avec un palier.'], ['impossible à identifier', 'L’absence de palier indique un mélange.']])]
});
concept({
  id: 'p-rho', ch: 'P1', title: 'Masse volumique', prereq: ['cp-quot', 'cp-unit'],
  lesson: [
    { h: 'ρ = m / V', t: '<p>La masse volumique ρ (« rhô ») est la masse d’un volume d’une unité. Elle caractérise une espèce chimique.</p>', w: { type: 'density' } },
    { h: 'Unités', t: '<p>Pour l’eau : ρ = 1,0 g/mL = 1,0 g/cm³ = 1,0 kg/L = 1 000 g/L = 1 000 kg/m³.</p><p>Un objet flotte sur l’eau si sa masse volumique est plus petite que celle de l’eau.</p>' }],
  qs: [
    () => { const [name, rho] = pick([['de l’aluminium', 2.7], ['du fer', 7.9], ['du cuivre', 8.9], ['du verre', 2.5]]), V = pick([10, 20, 30, 40, 50]); const m = +(rho * V).toFixed(1); return Q(`Un objet de ${nf(m)} g occupe ${V} cm³. Sa masse volumique ?`, nf(rho) + ' g/cm³', [[nf(+(m * V).toFixed(1)) + ' g/cm³', 'ρ = m / V : on divise la masse par le volume.', 'cp-quot'], [nf(+(V / m).toFixed(2)) + ' g/cm³', 'ρ = m / V, pas V / m.', 'cp-quot'], [nf(+(m - V).toFixed(1)) + ' g/cm³', 'On divise, on ne soustrait pas.']], { exp: `ρ = ${nf(m)} g ÷ ${V} cm³ = ${nf(rho)} g/cm³ : c’est la valeur de référence ${name}.` }); },
    Q('La masse volumique de l’eau vaut 1,0 g/mL. Cela correspond à…', '1,0 kg/L', [['1,0 g/L', '1 L = 1 000 mL d’eau a une masse de 1 000 g, soit 1 kg.', 'cp-unit'], ['1 000 kg/L', 'Un litre d’eau ne pèse pas une tonne !'], ['0,001 kg/L', '1 L d’eau pèse 1 kg.', 'cp-unit']]),
    () => { const V = pick([2, 3, 5]); return Q(`Quelle est la masse de ${V},0 L d’huile (ρ = 0,92 kg/L) ?`, nf(+(0.92 * V).toFixed(2)) + ' kg', [[nf(+(V / 0.92).toFixed(2)) + ' kg', 'm = ρ × V : on multiplie.', 'cp-quot'], [nf(+(0.92 / V).toFixed(2)) + ' kg', 'm = ρ × V.', 'cp-quot'], [nf(V) + ' kg', 'L’huile est moins dense que l’eau : 1 L d’huile pèse moins de 1 kg.']]); },
    Q('Un objet de masse volumique 0,8 g/cm³ est placé dans l’eau. Il…', 'flotte', [['coule', '0,8 g/cm³ est plus petit que 1,0 g/cm³ (eau) : il flotte.'], ['reste entre deux eaux', 'Il faudrait la même masse volumique que l’eau.'], ['se dissout', 'La masse volumique ne dit rien de la dissolution.']])]
});
concept({
  id: 'p-tests', ch: 'P1', title: 'Tests chimiques et chromatographie', prereq: ['p-cpm'],
  lesson: [
    { h: 'Quatre tests à connaître', t: '', w: { type: 'tests' } },
    { h: 'La chromatographie sur couche mince (CCM)', t: '<p>Elle sépare les espèces d’un mélange : chacune migre à sa propre hauteur.</p>', w: { type: 'ccm' } }],
  qs: [
    Q('Pour mettre en évidence le dioxyde de carbone, on utilise…', 'l’eau de chaux, qui se trouble', [['une bûchette incandescente, qui se rallume', 'C’est le test du dioxygène.'], ['du sulfate de cuivre anhydre, qui bleuit', 'C’est le test de l’eau.'], ['une flamme : petite détonation', 'C’est le test du dihydrogène.']]),
    Q('Le sulfate de cuivre anhydre devient bleu au contact…', 'd’eau', [['de dioxygène', 'Le dioxygène ravive une bûchette incandescente.'], ['de dioxyde de carbone', 'Le dioxyde de carbone trouble l’eau de chaux.'], ['de dihydrogène', 'Le dihydrogène produit une petite détonation près d’une flamme.']]),
    Q('Sur une CCM, un échantillon donne trois taches. On peut conclure que…', 'c’est un mélange d’au moins trois espèces', [['c’est un corps pur', 'Un corps pur ne donne qu’une seule tache.'], ['c’est un mélange de trois espèces exactement', 'Deux espèces peuvent migrer à la même hauteur : on dit « au moins ».'], ['il contient trois fois la même espèce', 'Une même espèce migre toujours à la même hauteur.']]),
    Q('Sur une CCM, une tache du mélange M est à la même hauteur que celle de l’espèce A. Cela indique que…', 'M contient probablement l’espèce A', [['M est un corps pur', 'M peut donner d’autres taches.'], ['A est un mélange', 'A peut ne donner qu’une seule tache.'], ['M et A sont la même espèce', 'M peut contenir A et d’autres espèces.']])]
});
concept({
  id: 'p-compo', ch: 'P1', title: 'Composition d’un mélange', prereq: ['cm-prop'],
  lesson: [
    { h: 'Pourcentage massique', t: `<p>Pourcentage en masse d’une espèce : ${F('m<sub>espèce</sub>', 'm<sub>mélange</sub>')} × 100.</p>`, w: { type: 'percent', mode: 'part', total: 200, p: 75 } },
    { h: 'L’air', t: '<p>En volume, l’air contient environ <b>78 % de diazote</b> (N₂), <b>21 % de dioxygène</b> (O₂) et 1 % d’autres gaz. Masse volumique de l’air : environ <b>1,2 g/L</b> (près de 1 000 fois moins que l’eau).</p>' }],
  qs: [
    () => { const tot = pick([200, 250, 400, 500]), p = pick([20, 40, 60, 75, 80]), m = tot * p / 100; return Q(`Un alliage de ${tot} g contient ${m} g de cuivre. Pourcentage massique de cuivre ?`, p + ' %', [[(100 - p) + ' %', 'Ça, c’est le pourcentage des autres métaux.'], [nf(+(tot / m).toFixed(2)) + ' %', 'On divise la masse de cuivre par la masse totale.', 'cm-prop'], [nf(m) + ' %', 'Il faut rapporter ' + m + ' g à la masse totale.', 'cm-prop']]); },
    Q('Dans l’air, le pourcentage en volume de dioxygène est d’environ…', '21 %', [['78 %', '78 %, c’est le diazote.'], ['50 %', 'Le diazote est largement majoritaire.'], ['100 %', 'L’air est un mélange.']]),
    Q('La masse volumique de l’air vaut environ…', '1,2 g/L', [['1,2 kg/L', 'Ce serait plus que l’eau (1 kg/L) !'], ['1 000 g/L', 'C’est celle de l’eau.'], ['0 g/L', 'L’air a une masse, même faible.']])]
});

/* ============ P2 Solutions aqueuses ============ */
concept({
  id: 'p-sol', ch: 'P2', title: 'Solvant, soluté, solution', prereq: ['p-cpm'],
  lesson: [{ h: 'Dissoudre', t: '<p>Une <b>solution</b> s’obtient en dissolvant un <b>soluté</b> (solide, liquide ou gaz) dans un <b>solvant</b> (l’espèce majoritaire). Si le solvant est l’eau, on parle de <b>solution aqueuse</b>.</p><p>On ne peut pas dissoudre une quantité illimitée de soluté : au-delà de la <b>concentration maximale</b> (environ 360 g/L pour le sel à 20 °C), la solution est <b>saturée</b> et le soluté ne se dissout plus.</p>', w: { type: 'beaker' } }],
  qs: [
    Q('Dans l’eau sucrée, le soluté est…', 'le sucre', [['l’eau', 'L’eau est le solvant : elle dissout le sucre et elle est majoritaire.'], ['l’eau sucrée', 'L’eau sucrée est la solution.'], ['il n’y en a pas', 'Le sucre est dissous : c’est le soluté.']]),
    Q('Une solution aqueuse est une solution dont…', 'le solvant est l’eau', [['le soluté est l’eau', 'Dans une solution aqueuse, l’eau est le solvant.'], ['le soluté est un liquide', 'Le soluté peut être solide, liquide ou gazeux.'], ['la concentration est maximale', 'Aqueux veut dire « dans l’eau ».']]),
    Q('On ajoute du sel dans l’eau ; à partir d’un moment, il ne se dissout plus. On dit que…', 'la solution est saturée', [['la solution est diluée', 'Diluer, c’est ajouter du solvant.'], ['le sel est devenu un solvant', 'Le sel reste le soluté.'], ['l’eau est un corps pur', 'L’eau salée est un mélange.']])]
});
concept({
  id: 'p-cm', ch: 'P2', title: 'Concentration en masse', prereq: ['p-sol', 'cp-quot', 'cp-unit'],
  lesson: [
    { h: 'Cm = m(soluté) / V(solution)', t: '<p>La concentration en masse indique la masse de soluté dissoute <b>par litre de solution</b>. Unité : g/L.</p>', w: { type: 'beaker' } },
    { h: 'Exemple', t: '', w: { type: 'steps', lines: ['On dissout 5,0 g de sel dans de l’eau ; on obtient 250 mL de solution.', 'V = 250 mL = 0,250 L', 'C<sub>m</sub> = 5,0 g ÷ 0,250 L = 20 g/L', 'Et inversement : m = C<sub>m</sub> × V'] } }],
  qs: [
    () => { const m = pick([2, 3, 4, 5, 6, 8, 10]), V = pick([100, 200, 250, 500]); return Q(`On dissout ${m},0 g de sucre et on obtient ${V} mL de solution. C<sub>m</sub> = ?`, nf(m / (V / 1000)) + ' g/L', [[nf(+(m / V).toFixed(3)) + ' g/L', 'Le volume doit être en litres : ' + V + ' mL = ' + nf(V / 1000) + ' L.', 'cp-unit'], [nf(+(m * V / 1000).toFixed(3)) + ' g/L', 'C<sub>m</sub> = m / V : on divise.', 'cp-quot'], [nf(+(V / 1000 / m).toFixed(4)) + ' g/L', 'C<sub>m</sub> = m / V, pas V / m.', 'cp-quot']]); },
    () => { const C = pick([10, 20, 25, 40, 50]), V = pick([100, 200, 500]); return Q(`Quelle masse de soluté faut-il pour préparer ${V} mL de solution à ${C} g/L ?`, nf(C * V / 1000) + ' g', [[nf(C * V) + ' g', 'Le volume doit être en litres : ' + V + ' mL = ' + nf(V / 1000) + ' L.', 'cp-unit'], [nf(+(C / (V / 1000)).toFixed(1)) + ' g', 'm = C<sub>m</sub> × V : on multiplie.', 'cp-quot'], [nf(C) + ' g', C + ' g correspondent à 1 L, pas à ' + V + ' mL.']]); },
    Q('« C<sub>m</sub> = 20 g/L » signifie que…', 'chaque litre de solution contient 20 g de soluté dissous', [['un litre de solution pèse 20 g', 'Ce serait une masse volumique, et elle concerne toute la solution.', 'p-rho'], ['il y a 20 L de solution', 'Le « par litre » est au dénominateur.'], ['il y a 20 g de solvant par litre', 'C’est la masse de soluté.']])]
});
concept({
  id: 'p-rhocm', ch: 'P2', title: 'Masse volumique ou concentration en masse ?', prereq: ['p-cm', 'p-rho'],
  lesson: [{ h: 'Ne pas confondre', t: `<p>C<sub>m</sub> = ${F('m<sub>soluté</sub>', 'V<sub>solution</sub>')} et ρ = ${F('m<sub>solution</sub>', 'V<sub>solution</sub>')}. Mêmes unités possibles (g/L), mais pas la même masse au numérateur.</p>`, w: { type: 'rhocm' } }],
  qs: [
    Q('On dissout 15 g de sel ; on obtient 0,50 L de solution de masse 520 g. Masse volumique de la solution ?', '1 040 g/L', [['30 g/L', 'Ça, c’est la concentration en masse (15 g ÷ 0,50 L). La masse volumique utilise la masse de toute la solution.'], ['260 g/L', 'On divise par le volume : 520 ÷ 0,50.', 'cp-quot'], ['1 070 g/L', 'Le sel est déjà compté dans les 520 g de solution.']]),
    Q('Même solution : 15 g de sel, 0,50 L, 520 g. Concentration en masse en sel ?', '30 g/L', [['1 040 g/L', 'Ça, c’est la masse volumique de la solution. C<sub>m</sub> ne compte que le soluté.'], ['7,5 g/L', 'On divise par le volume : 15 ÷ 0,50.', 'cp-quot'], ['0,03 g/L', 'C<sub>m</sub> = m / V.', 'cp-quot']]),
    Q('Quelle grandeur ne dépend que de la masse de soluté (pour un volume donné) ?', 'la concentration en masse', [['la masse volumique de la solution', 'ρ dépend de la masse de toute la solution.'], ['la masse volumique du solvant', 'Elle ne dépend pas du soluté.'], ['le volume de la solution', 'Le volume est fixé ici.']])]
});
concept({
  id: 'p-dil', ch: 'P2', title: 'Dilution', prereq: ['p-cm'],
  lesson: [
    { h: 'Ajouter du solvant', t: '<p>Diluer, c’est ajouter du solvant : la <b>masse de soluté ne change pas</b>, mais le volume augmente, donc la concentration diminue.</p>', w: { type: 'beaker', mode: 'dil', C0: 20 } },
    { h: 'Formules et verrerie', t: `<p>C<sub>mère</sub> × V<sub>mère</sub> = C<sub>fille</sub> × V<sub>fille</sub> (même masse de soluté).</p><p>Facteur de dilution : F = ${F('C<sub>mère</sub>', 'C<sub>fille</sub>')} = ${F('V<sub>fille</sub>', 'V<sub>mère</sub>')}.</p><p>On prélève avec une <b>pipette jaugée</b> et on complète dans une <b>fiole jaugée</b> (verrerie précise).</p>` }],
  qs: [
    () => { const C0 = pick([10, 20, 40, 50]), V0 = pick([5, 10, 20, 25]), V1 = pick([50, 100, 200, 250]); const C1 = C0 * V0 / V1; return Q(`On prélève ${V0},0 mL d’une solution à ${C0} g/L et on complète à ${V1},0 mL. Nouvelle concentration ?`, nf(+C1.toFixed(3)) + ' g/L', [[nf(+(C0 * V1 / V0).toFixed(2)) + ' g/L', 'Après dilution, la concentration doit diminuer : C<sub>fille</sub> = C<sub>mère</sub> × V<sub>mère</sub> / V<sub>fille</sub>.'], [nf(C0) + ' g/L', 'On a ajouté de l’eau : la concentration a diminué.'], [nf(+(C0 * V0).toFixed(1)) + ' g/L', 'Il faut encore diviser par le volume final.', 'p-cm']]); },
    Q('Diluer une solution 10 fois signifie que…', 'sa concentration est divisée par 10', [['sa concentration est multipliée par 10', 'Diluer fait baisser la concentration.'], ['on ajoute 10 mL d’eau', 'C’est le volume total qui est multiplié par 10.'], ['on prélève 10 mL', 'Le facteur 10 compare les concentrations (ou les volumes).']]),
    Q('Pour diluer 5 fois avec une fiole jaugée de 100,0 mL, on prélève…', '20,0 mL de solution mère', [['5,0 mL', 'V<sub>mère</sub> = V<sub>fille</sub> / F = 100 / 5 = 20 mL.'], ['500 mL', 'On ne peut pas prélever plus que le volume final.'], ['80,0 mL', '80 mL, ce serait le volume d’eau ajouté, pas le volume prélevé.']]),
    Q('Quelle verrerie pour prélever précisément 10,0 mL de solution ?', 'une pipette jaugée', [['un bécher', 'Les graduations d’un bécher sont très imprécises.'], ['une éprouvette graduée', 'Elle est moins précise qu’une pipette jaugée.'], ['un erlenmeyer', 'Il sert à contenir, pas à mesurer.']])]
});

/* ============ P3 Le noyau de l'atome ============ */
concept({
  id: 'p-atome', ch: 'P3', title: 'Protons, neutrons, électrons', prereq: ['cp-atome'],
  lesson: [
    { h: 'Dans le noyau', t: '<p>Le noyau contient des <b>protons</b> (charge +e) et des <b>neutrons</b> (charge nulle) : ce sont les <b>nucléons</b>. Autour : les <b>électrons</b> (charge −e).</p><p><b>Z</b> = numéro atomique = nombre de protons. <b>A</b> = nombre de masse = nombre de nucléons. Nombre de neutrons : N = A − Z. Un atome a autant d’électrons que de protons.</p>', w: { type: 'atom', Z: 6, N: 6 } }],
  qs: [
    () => { const [s, n, Z, A] = pick([['Na', 'sodium', 11, 23], ['Cl', 'chlore', 17, 35], ['Al', 'aluminium', 13, 27], ['O', 'oxygène', 8, 16], ['Mg', 'magnésium', 12, 24], ['P', 'phosphore', 15, 31]]); return Q(`Combien de neutrons dans le noyau ${NUC(A, Z, s)} ?`, String(A - Z), [[String(A + Z), 'N = A − Z : on soustrait.'], [String(A), 'A compte les protons ET les neutrons.'], [String(Z), 'Z est le nombre de protons.']]); },
    () => { const [s, Z, A] = pick([['C', 6, 12], ['N', 7, 14], ['F', 9, 19], ['S', 16, 32], ['Ar', 18, 40]]); return Q(`Combien d’électrons possède l’atome ${NUC(A, Z, s)} ?`, String(Z), [[String(A), 'Un atome est neutre : autant d’électrons que de protons (Z).'], [String(A - Z), 'A − Z donne le nombre de neutrons.'], [String(A + Z), 'Le nombre d’électrons est égal à Z.']]); },
    Q('Le nombre de masse A est le nombre…', 'de nucléons (protons + neutrons)', [['de protons', 'Le nombre de protons, c’est Z.'], ['d’électrons', 'Les électrons ne sont pas comptés dans A.'], ['de neutrons', 'N = A − Z.']]),
    Q('Quelle particule n’est pas dans le noyau ?', 'l’électron', [['le proton', 'Les protons sont dans le noyau.'], ['le neutron', 'Les neutrons sont dans le noyau.'], ['le nucléon', 'Nucléon = particule du noyau.']])]
});
concept({
  id: 'p-nota', ch: 'P3', title: 'Écriture conventionnelle et élément chimique', prereq: ['p-atome'],
  lesson: [{ h: 'A en haut, Z en bas', t: `<p>Un noyau s’écrit ${NUC('A', 'Z', 'X')}, où X est le symbole de l’élément. Exemple : ${NUC(23, 11, 'Na')} : 11 protons, 23 nucléons, 12 neutrons.</p><p>C’est <b>Z</b> qui définit l’<b>élément chimique</b>. Des noyaux de même Z mais de A différents sont des <b>isotopes</b> du même élément : ${NUC(12, 6, 'C')} et ${NUC(14, 6, 'C')}.</p>`, w: { type: 'atom', Z: 11, N: 12 } }],
  qs: [
    () => { const [s, Z, A] = pick([['Cl', 17, 35], ['Cl', 17, 37], ['K', 19, 39], ['Ca', 20, 40], ['Fe', 26, 56], ['Cu', 29, 63]]); return Q(`Composition du noyau ${NUC(A, Z, s)} ?`, `${Z} protons et ${A - Z} neutrons`, [[`${A} protons et ${Z} neutrons`, 'Z (en bas) = protons ; A (en haut) = nucléons.'], [`${Z} protons et ${A} neutrons`, 'A compte tous les nucléons : neutrons = A − Z.'], [`${A - Z} protons et ${Z} neutrons`, 'Le nombre de protons est Z.']]); },
    Q(`${NUC(12, 6, 'C')} et ${NUC(14, 6, 'C')} sont…`, 'deux isotopes du même élément', [['deux éléments différents', 'C’est Z qui définit l’élément : Z = 6 pour les deux.'], ['deux ions', 'Un ion diffère par ses électrons, pas par son noyau.'], ['identiques', 'Ils n’ont pas le même nombre de neutrons (6 et 8).']]),
    Q('Un noyau contient 11 protons et 12 neutrons. Son écriture ?', NUC(23, 11, 'Na'), [[NUC(12, 11, 'Na'), 'A = protons + neutrons = 23.'], [NUC(11, 23, 'Na'), 'A en haut, Z en bas.'], [NUC(23, 12, 'Mg'), 'Z = nombre de protons = 11 : c’est le sodium.']])]
});
concept({
  id: 'p-ordre', ch: 'P3', title: 'Ordres de grandeur dans l’atome', prereq: ['cm-pow', 'p-atome'],
  lesson: [
    { h: 'Un atome presque vide', t: '', w: { type: 'scale' } },
    { h: 'Les masses', t: '<p>Masse d’un nucléon : environ 1,67 × 10⁻²⁷ kg. Masse d’un électron : environ 9,11 × 10⁻³¹ kg, soit à peu près <b>2 000 fois moins</b>. La masse de l’atome est donc <b>concentrée dans le noyau</b>.</p>' }],
  qs: [
    Q('Ordre de grandeur du diamètre d’un atome ?', '10⁻¹⁰ m', [['10⁻¹⁵ m', 'C’est la taille du noyau.'], ['10⁻³ m', '10⁻³ m = 1 mm : on le verrait à l’œil nu !'], ['10¹⁰ m', 'Exposant positif : ce serait gigantesque.', 'cm-pow']]),
    Q('Le noyau est environ … fois plus petit que l’atome.', '100 000 (10⁵)', [['10', 'L’atome est essentiellement vide : l’écart est bien plus grand.'], ['1 000', '10⁻¹⁰ ÷ 10⁻¹⁵ = 10⁵.', 'm-pow'], ['10¹⁵', 'On compare 10⁻¹⁰ m et 10⁻¹⁵ m : le rapport est 10⁵.', 'm-pow']]),
    Q('La masse d’un atome est…', 'presque entièrement concentrée dans son noyau', [['surtout due aux électrons', 'Un électron est environ 2 000 fois plus léger qu’un nucléon.'], ['partagée à moitié entre noyau et électrons', 'Les électrons comptent très peu.'], ['nulle', 'Un atome a une masse, même si elle est très faible.']]),
    Q('10⁻¹⁰ ÷ 10⁻¹⁵ = ?', '10⁵', [['10⁻²⁵', 'Pour diviser, on soustrait les exposants : −10 − (−15) = 5.', 'm-pow'], ['10⁻⁵', '−10 − (−15) = −10 + 15 = 5.', 'cm-rel'], ['10²⁵', 'On soustrait les exposants.', 'm-pow']])]
});
concept({
  id: 'p-masse', ch: 'P3', title: 'Masse d’un atome', prereq: ['p-atome', 'cm-pow'],
  lesson: [{ h: 'm ≈ A × m(nucléon)', t: '<p>On néglige la masse des électrons : la masse d’un atome vaut environ A × 1,67 × 10⁻²⁷ kg.</p>', w: { type: 'steps', lines: ['Carbone 12 : A = 12', 'm ≈ 12 × 1,67 × 10⁻²⁷ kg', 'm ≈ 2,00 × 10⁻²⁶ kg', 'Nombre d’atomes dans 1,0 g de carbone : N = 1,0 × 10⁻³ kg ÷ 2,00 × 10⁻²⁶ kg ≈ 5,0 × 10²²'] } }],
  qs: [
    () => { const [s, Z, A] = pick([['O', 8, 16], ['Na', 11, 23], ['Al', 13, 27], ['S', 16, 32], ['Ca', 20, 40], ['Fe', 26, 56]]); const m = A * 1.67e-27; return Q(`Masse approchée de l’atome ${NUC(A, Z, s)} (m<sub>nucléon</sub> = 1,67 × 10⁻²⁷ kg) ?`, sci(m) + ' kg', [[sci(Z * 1.67e-27) + ' kg', 'Il faut compter tous les nucléons (A = ' + A + '), pas seulement les protons.', 'p-atome'], [sci(1.67e-27) + ' kg', 'C’est la masse d’un seul nucléon.'], [sci(m * 1e3) + ' kg', 'Attention aux puissances de 10.', 'cm-pow']]); },
    Q('On néglige la masse des électrons parce que…', 'un électron est environ 2 000 fois plus léger qu’un nucléon', [['les électrons n’ont pas de masse', 'Ils en ont une, mais très faible.'], ['ils sont en dehors du noyau', 'C’est leur masse très faible qui compte, pas leur position.'], ['ils sont chargés négativement', 'La charge n’a rien à voir avec la masse.']]),
    Q('Un atome de carbone a une masse de 2,0 × 10⁻²⁶ kg. Combien d’atomes dans 2,0 × 10⁻³ kg (2 g) de carbone ?', '1,0 × 10²³', [['1,0 × 10⁻²³', 'N = m(échantillon) / m(atome) : un très grand nombre.', 'cp-quot'], ['4,0 × 10⁻²⁹', 'On divise, on ne multiplie pas.', 'cp-quot'], ['1,0 × 10²⁹', '10⁻³ ÷ 10⁻²⁶ = 10⁻³⁺²⁶ = 10²³.', 'm-pow']])]
});

/* ============ P4 Électrons, tableau périodique et ions ============ */
concept({
  id: 'p-config', ch: 'P4', title: 'Configuration électronique', prereq: ['p-atome'],
  lesson: [{ h: 'Remplir les sous-couches', t: '<p>Les électrons se répartissent dans des sous-couches, remplies dans l’ordre <b>1s, 2s, 2p, 3s, 3p</b>. Une sous-couche s contient au plus 2 électrons, une sous-couche p au plus 6.</p>', w: { type: 'config', Z: 11 } }],
  qs: [
    () => { const Z = ri(3, 18), cfg = configOf(Z), s = configStr(Z); const tot = cfg.reduce((a, [, k]) => a + k, 0); const wrongs = []; const last = cfg[cfg.length - 1];
      if (Z > 4 && Z !== 10 && Z !== 12) { const alt = configOf(Z).map(x => x.slice()); if (alt.length >= 3) { alt[2][1] += alt.slice(3).reduce((a, [, k]) => a + k, 0); wrongs.push([alt.slice(0, 3).map(([n, k]) => n + '<sup>' + k + '</sup>').join(' '), 'Une sous-couche p contient au plus 6 électrons.']); } }
      if (Z >= 11 && last[0] === '3s') wrongs.push(['1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>6</sup> 3p<sup>' + last[1] + '</sup>', 'On remplit 3s avant 3p.']);
      wrongs.push([configStr(Z + 1), 'Compte les électrons : il en faut ' + Z + ' (autant que de protons).', 'p-atome']);
      wrongs.push([configStr(Z - 1), 'Compte les électrons : il en faut ' + Z + '.', 'p-atome']);
      return Q(`Configuration électronique de ${ELEM[Z][1]} (Z = ${Z}) ?`, s, shuffle(wrongs).slice(0, 3)); },
    Q('Combien d’électrons au maximum dans une sous-couche p ?', '6', [['2', '2, c’est le maximum d’une sous-couche s.'], ['8', '8, c’est une couche complète n = 2 ou 3 (s + p).'], ['3', 'Une sous-couche p peut contenir jusqu’à 6 électrons.']]),
    () => { const Z = ri(5, 18); return Q(`Un atome a la configuration ${configStr(Z)}. Son numéro atomique Z ?`, String(Z), [[String(Z + 2), 'On additionne les exposants : ce sont les nombres d’électrons.'], [String(configOf(Z).length), 'On compte les électrons, pas les sous-couches.'], [String(Z - 1), 'Recompte : on additionne tous les exposants.']]); }]
});
concept({
  id: 'p-tab', ch: 'P4', title: 'Tableau périodique et électrons de valence', prereq: ['p-config'],
  lesson: [
    { h: 'Ligne et colonne', t: '<p>La <b>ligne</b> (période) correspond à la dernière couche occupée (n = 1, 2 ou 3). Les électrons de cette couche sont les <b>électrons de valence</b> ; leur nombre donne la <b>colonne</b>. Touche les éléments :</p>', w: { type: 'config', Z: 17 } },
    { h: 'Familles', t: '<p>Une même colonne = même nombre d’électrons de valence = propriétés chimiques voisines. <b>Alcalins</b> (Li, Na, K), <b>halogènes</b> (F, Cl), <b>gaz nobles</b> (He, Ne, Ar).</p><p>Dans le tableau complet à 18 colonnes, ces colonnes sont numérotées 1, 2, puis 13 à 18.</p>' }],
  qs: [
    () => { const Z = pick([3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17]); const v = valenceOf(Z); return Q(`${ELEM[Z][1][0].toUpperCase() + ELEM[Z][1].slice(1)} : ${configStr(Z)}. Combien d’électrons de valence ?`, String(v), [[String(Z), 'Les électrons de valence sont seulement ceux de la dernière couche.'], [String(periodOf(Z)), periodOf(Z) + ' est le numéro de la dernière couche (la ligne).'], [String(8 - v), 'Compte les électrons de la couche n = ' + periodOf(Z) + '.']]); },
    Q('Le chlore (Z = 17) : 1s² 2s² 2p⁶ 3s² 3p⁵. Où est-il dans le tableau ?', '3e ligne, colonne des halogènes (7 électrons de valence)', [['2e ligne, colonne des halogènes', 'La dernière couche occupée est n = 3 : 3e ligne.'], ['3e ligne, colonne des gaz nobles', 'Il a 7 électrons de valence, pas 8.'], ['5e ligne, 3e colonne', 'La ligne correspond à n, la colonne aux électrons de valence.']]),
    Q('Les éléments d’une même colonne ont…', 'le même nombre d’électrons de valence', [['le même nombre de protons', 'Chaque élément a son propre Z.'], ['la même masse', 'Les masses sont différentes.'], ['le même nombre de couches occupées', 'Ça, c’est une même ligne.']]),
    Q('Les gaz nobles sont…', 'très stables : leur couche externe est pleine', [['très réactifs', 'Ils ne réagissent presque pas.'], ['des métaux', 'Ce sont des gaz.'], ['dans la première colonne', 'Ils sont dans la dernière colonne.']])]
});
concept({
  id: 'p-ion', ch: 'P4', title: 'Ions monoatomiques', prereq: ['p-tab'],
  lesson: [
    { h: 'Imiter le gaz noble le plus proche', t: '', w: { type: 'ion' } },
    { h: 'Le noyau ne change pas', t: '<p>Un ion se forme par gain ou perte d’<b>électrons</b>. À connaître : H⁺, Na⁺, K⁺, Ca²⁺, Mg²⁺, Cl⁻, F⁻.</p>', w: { type: 'atom', ion: true, Z: 11, N: 12 } }],
  qs: [
    () => { const [z, s, q] = pick([[3, 'Li', '+'], [11, 'Na', '+'], [12, 'Mg', '2+'], [13, 'Al', '3+'], [8, 'O', '2−'], [9, 'F', '−'], [16, 'S', '2−'], [17, 'Cl', '−']]); const neg = q.includes('−'), n = parseInt(q) || 1; const opp = (n > 1 ? n : '') + (neg ? '+' : '−'); const other = (n === 1 ? 2 : n === 2 ? '' : 2) + (neg ? '−' : '+'); return Q(`${ELEM[z][1][0].toUpperCase() + ELEM[z][1].slice(1)} (${configStr(z)}) forme l’ion…`, `${s}<sup>${q}</sup>`, [[`${s}<sup>${opp}</sup>`, neg ? 'Il gagne des électrons (négatifs) : sa charge devient négative.' : 'Il perd des électrons (négatifs) : sa charge devient positive.'], [`${s}<sup>${other}</sup>`, 'Il gagne ou perd juste assez d’électrons pour avoir la configuration du gaz noble le plus proche.', 'p-tab'], [`${s}`, 'Un atome isolé est neutre ; ici on demande l’ion.']]); },
    Q('L’ion Mg²⁺ possède…', '2 électrons de moins que l’atome Mg', [['2 électrons de plus', 'Une charge positive signifie que des électrons (négatifs) ont été perdus.'], ['2 protons de plus', 'Le noyau ne change pas quand un ion se forme.'], ['2 protons de moins', 'Le noyau ne change pas : seuls les électrons changent.']]),
    Q('Combien d’électrons possède l’ion Cl⁻ (Z = 17) ?', '18', [['16', 'Cl⁻ a gagné un électron : 17 + 1.'], ['17', '17, c’est l’atome neutre.'], ['35', '35 est le nombre de masse A de l’isotope le plus courant.']]),
    Q('Pourquoi le sodium forme-t-il l’ion Na⁺ ?', 'En perdant 1 électron, il obtient la configuration du néon, un gaz noble', [['En gagnant 1 électron, il devient stable', 'Gagner un électron donnerait une charge négative.'], ['Il perd un proton', 'Le noyau ne change pas.'], ['Il veut avoir 1 électron de valence', 'Il veut une couche externe pleine, comme un gaz noble.']])]
});
concept({
  id: 'p-elec', ch: 'P4', title: 'Composés ioniques et électroneutralité', prereq: ['p-ion'],
  lesson: [{ h: 'Des charges qui se compensent', t: '', w: { type: 'ionic' } }],
  qs: [
    Q('Formule du chlorure de calcium (ions Ca²⁺ et Cl⁻) ?', 'CaCl₂', [['CaCl', 'Ca²⁺ + Cl⁻ : charge totale +1, ce n’est pas neutre. Il faut deux Cl⁻.'], ['Ca₂Cl', 'Deux Ca²⁺ et un Cl⁻ donnent +3.'], ['CaCl²⁺', 'Dans la formule d’un solide ionique, on n’écrit pas de charge : il est neutre.']]),
    Q('Formule du fluorure de sodium (ions Na⁺ et F⁻) ?', 'NaF', [['Na₂F', 'Deux Na⁺ et un F⁻ donnent +1.'], ['NaF₂', 'Un Na⁺ et deux F⁻ donnent −1.'], ['NaF⁻', 'Un composé ionique est neutre : pas de charge dans la formule.']]),
    Q('Formule du chlorure de magnésium ?', 'MgCl₂', [['MgCl', 'L’ion magnésium est Mg²⁺ : il faut deux Cl⁻.', 'p-ion'], ['Mg₂Cl', 'Deux Mg²⁺ et un Cl⁻ donnent +3.'], ['MgCl₃', 'Mg²⁺ + 3 Cl⁻ donne −1.']]),
    Q('Un solide ionique comme le sel est…', 'électriquement neutre', [['chargé positivement', 'Les charges positives et négatives se compensent.'], ['chargé négativement', 'Les charges se compensent exactement.'], ['formé de molécules', 'Il est formé d’ions.']])]
});
