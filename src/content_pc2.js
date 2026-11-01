'use strict';
/* ============ P5 Molécules et quantité de matière ============ */
concept({
  id: 'p-lewis', ch: 'P5', title: 'Modèle de Lewis des molécules', prereq: ['p-tab'],
  lesson: [
    { h: 'Partager des électrons', t: '<p>Dans une molécule, les atomes <b>mettent en commun</b> des électrons pour obtenir la structure électronique du gaz noble le plus proche. Une <b>liaison covalente</b> = un <b>doublet liant</b> = 2 électrons partagés. Les électrons de valence non partagés forment des <b>doublets non liants</b>.</p>', w: { type: 'lewis' } },
    { h: 'Combien de liaisons ?', t: '<table class="simple"><tr><th>Atome</th><th>H</th><th>C</th><th>N</th><th>O</th><th>Cl</th></tr><tr><th>Électrons de valence</th><td>1</td><td>4</td><td>5</td><td>6</td><td>7</td></tr><tr><th>Électrons manquants = liaisons</th><td>1</td><td>4</td><td>3</td><td>2</td><td>1</td></tr><tr><th>Doublets non liants</th><td>0</td><td>0</td><td>1</td><td>2</td><td>3</td></tr></table><p>(H vise la structure de l’hélium : 2 électrons ; les autres, celle du néon ou de l’argon : 8 électrons sur la couche externe.)</p>' }],
  qs: [
    Q('Dans le modèle de Lewis de l’eau H₂O, l’atome d’oxygène porte…', '2 doublets liants et 2 doublets non liants', [['2 doublets liants et aucun doublet non liant', 'O a 6 électrons de valence : 2 sont engagés dans les liaisons, il en reste 4, soit 2 doublets non liants.'], ['1 doublet liant et 3 doublets non liants', 'O est lié à 2 atomes H : 2 doublets liants.'], ['6 doublets liants', 'O ne forme que 2 liaisons.']]),
    Q('Combien de liaisons covalentes un atome de carbone forme-t-il ?', '4', [['6', '6 est son nombre total d’électrons. Il a 4 électrons de valence et il lui en manque 4.', 'p-tab'], ['2', 'Il manque 4 électrons au carbone pour avoir la structure du néon.'], ['1', 'C’est le cas de H ou de Cl.']]),
    Q('Combien de doublets non liants porte l’azote dans NH₃ ?', '1', [['0', 'N a 5 électrons de valence ; 3 servent aux liaisons, il en reste 2, soit 1 doublet.'], ['3', '3 est le nombre de liaisons (doublets liants).'], ['2', '5 − 3 = 2 électrons, soit un seul doublet.']]),
    Q('Un doublet liant correspond à…', '2 électrons mis en commun par deux atomes', [['2 protons partagés', 'Ce sont les électrons qui sont partagés ; le noyau ne change pas.'], ['1 électron', 'Un doublet = deux électrons.'], ['2 électrons qui restent sur un seul atome', 'Ça, c’est un doublet non liant.']]),
    Q('Dans CO₂, entre l’atome de carbone et chaque atome d’oxygène, il y a…', 'une double liaison', [['une simple liaison', 'C doit former 4 liaisons au total : 2 + 2.'], ['une triple liaison', 'O ne forme que 2 liaisons.'], ['aucune liaison', 'C’est une molécule : les atomes sont liés.']])]
});
concept({
  id: 'p-liaison', ch: 'P5', title: 'Stabilité et énergie de liaison', prereq: ['p-lewis'],
  lesson: [{ h: 'Une molécule est plus stable que les atomes séparés', t: '<p>Former une liaison <b>libère</b> de l’énergie ; pour la <b>casser</b>, il faut fournir de l’énergie : c’est l’<b>énergie de liaison</b>.</p><p>Plus l’énergie de liaison est grande, plus la liaison est solide (difficile à rompre). Exemple : une liaison double C=O est plus solide qu’une liaison simple C−O.</p>', w: { type: 'lewis', keys: ['N₂', 'CO₂', 'HCl'] } }],
  qs: [
    Q('Pour casser une liaison covalente, il faut…', 'fournir de l’énergie', [['que la liaison libère de l’énergie', 'C’est la formation d’une liaison qui libère de l’énergie.'], ['ajouter des protons', 'Le noyau n’intervient pas.'], ['rien du tout : elle casse seule', 'Une liaison stabilise la molécule : il faut de l’énergie pour la rompre.']]),
    Q('Une molécule est plus stable que les atomes isolés car…', 'la formation des liaisons libère de l’énergie', [['les atomes perdent des protons', 'Le noyau ne change pas dans une transformation chimique.'], ['elle est plus lourde', 'La masse n’explique pas la stabilité.'], ['les électrons disparaissent', 'Les électrons sont partagés, pas détruits.']]),
    Q('Plus l’énergie d’une liaison est grande…', 'plus la liaison est difficile à rompre', [['plus la liaison est fragile', 'C’est l’inverse.'], ['plus la molécule est légère', 'L’énergie de liaison ne dit rien de la masse.'], ['plus elle contient d’électrons non liants', 'Ce n’est pas lié.']])]
});
concept({
  id: 'p-mole', ch: 'P5', title: 'La mole et la quantité de matière', prereq: ['cm-pow', 'p-masse'],
  lesson: [
    { h: 'Un paquet géant', t: '<p>Les entités (atomes, molécules, ions) sont si petites qu’on les compte par <b>paquets</b> : une <b>mole</b> contient N<sub>A</sub> = 6,02 × 10²³ entités (constante d’Avogadro). La quantité de matière n s’exprime en mol.</p>', w: { type: 'mole' } },
    { h: 'Les formules', t: '', w: { type: 'steps', lines: ['N = n × N<sub>A</sub> et n = N ÷ N<sub>A</sub>', 'Nombre d’entités dans un échantillon : N = m(échantillon) ÷ m(une entité)', 'Exemple : 18 g d’eau = 1,8 × 10⁻² kg ; m(H₂O) = 2,99 × 10⁻²⁶ kg', 'N = 1,8 × 10⁻² ÷ 2,99 × 10⁻²⁶ ≈ 6,0 × 10²³ molécules', 'n = 6,0 × 10²³ ÷ 6,02 × 10²³ ≈ 1,0 mol'] } }],
  qs: [
    () => { const n = pick([0.5, 2.0, 3.0, 1.5, 0.25]); return Q(`Combien d’entités dans ${nf(n, n < 1 ? 2 : 1)} mol ?`, sci(n * 6.02e23), [[sci(6.02e23 / n), 'N = n × N<sub>A</sub> : on multiplie.', 'cp-quot'], [sci(6.02e23), 'C’est le nombre d’entités dans 1 mol seulement.'], [sci(n * 6.02e22), 'Attention à la puissance de 10.', 'cm-pow']]); },
    Q('Un échantillon contient N = 3,01 × 10²³ molécules. Quantité de matière ?', '0,500 mol', [['2,00 mol', 'n = N ÷ N<sub>A</sub> = 3,01 × 10²³ ÷ 6,02 × 10²³ : moins d’une mole.', 'cp-quot'], ['1,81 × 10⁴⁷ mol', 'On divise par N<sub>A</sub>, on ne multiplie pas.', 'cp-quot'], ['0,0500 mol', '3,01 ÷ 6,02 = 0,500 et 10²³ ÷ 10²³ = 1.', 'm-pow']]),
    Q('Une mole, c’est…', '6,02 × 10²³ entités, comme une douzaine est un paquet de 12', [['la masse d’un atome', 'La mole est un nombre d’entités, pas une masse.'], ['1 gramme de matière', 'La masse d’une mole dépend de l’espèce.'], ['un volume de 1 L', 'Ce n’est pas un volume.']]),
    Q('Une molécule d’eau a une masse de 2,99 × 10⁻²⁶ kg. Combien de molécules dans 1,8 × 10⁻² kg d’eau ?', '6,0 × 10²³', [['5,4 × 10⁻²⁸', 'On divise la masse de l’échantillon par celle d’une molécule.', 'cp-quot'], ['6,0 × 10²⁶', 'Attention aux puissances : 10⁻² ÷ 10⁻²⁶ = 10²⁴, et 1,8 ÷ 2,99 ≈ 0,60.', 'm-pow'], ['1,7 × 10⁻²⁴', 'C’est la division à l’envers.', 'cp-quot']])]
});

/* ============ P6 Transformations physiques ============ */
concept({
  id: 'p-endoexo', ch: 'P6', title: 'Changements d’état : endo ou exothermique', prereq: ['cp-chg'],
  lesson: [
    { h: 'Recevoir ou céder de l’énergie', t: '<p><b>Endothermique</b> : le système reçoit de l’énergie (fusion, vaporisation, sublimation). <b>Exothermique</b> : il en cède (solidification, liquéfaction, condensation).</p>', w: { type: 'states' } },
    { h: 'Écriture symbolique', t: '<p>Fusion de l’eau : H₂O(s) → H₂O(ℓ). Vaporisation : H₂O(ℓ) → H₂O(g). Les lettres indiquent l’état : (s) solide, (ℓ) liquide, (g) gaz.</p><p>À l’échelle microscopique, les molécules ne changent pas : seule leur organisation change.</p><p>⚠ <b>Fusion ≠ dissolution</b> : le sucre « qui fond » dans le café se <b>dissout</b> (il se disperse dans l’eau), il ne devient pas liquide.</p>' }],
  qs: [
    Q('La fusion de la glace est une transformation…', 'endothermique', [['exothermique', 'Pour faire fondre la glace, il faut lui apporter de l’énergie.'], ['chimique', 'Les molécules d’eau ne changent pas : c’est physique.'], ['nucléaire', 'Les noyaux ne changent pas.']]),
    Q('Écriture symbolique de la vaporisation de l’eau ?', 'H₂O(ℓ) → H₂O(g)', [['H₂O(g) → H₂O(ℓ)', 'Ça, c’est la liquéfaction.'], ['H₂O(s) → H₂O(ℓ)', 'Ça, c’est la fusion.'], ['H₂O(ℓ) → H₂ + O', 'La molécule ne se casse pas : c’est un changement d’état.']]),
    Q('Quand l’eau se solidifie dans un congélateur, elle…', 'cède de l’énergie', [['reçoit de l’énergie', 'La solidification est exothermique : l’eau cède de l’énergie.'], ['ne fait aucun échange d’énergie', 'Tout changement d’état s’accompagne d’un transfert d’énergie.'], ['perd de la masse', 'La masse se conserve.', 'cp-chg']]),
    Q('Après une baignade, l’eau qui s’évapore sur la peau donne froid car la vaporisation…', 'est endothermique : elle prend de l’énergie à la peau', [['est exothermique', 'Une transformation exothermique réchaufferait la peau.'], ['fait baisser la masse de la peau', 'Ça n’a rien à voir.'], ['est une transformation chimique', 'C’est un changement d’état : physique.']]),
    Q('Le sucre « fond » dans le café. Le terme correct est…', 'il se dissout', [['il fond', 'Fondre = passer de solide à liquide par chauffage. Ici, le sucre se disperse dans l’eau.'], ['il se vaporise', 'Il ne devient pas gazeux.'], ['il se sublime', 'Sublimation : solide → gaz.']])]
});
concept({
  id: 'p-Lmass', ch: 'P6', title: 'Énergie massique de changement d’état', prereq: ['p-endoexo', 'cp-quot'],
  lesson: [{ h: 'Q = m × L', t: '<p>L’énergie nécessaire pour changer d’état une masse m d’un corps pur est Q = m × L, où L est l’<b>énergie massique de changement d’état</b> (en J/kg). Pendant le changement d’état, la température reste constante (palier).</p><p>Eau : L<sub>fusion</sub> = 3,3 × 10⁵ J/kg ; L<sub>vaporisation</sub> = 2,26 × 10⁶ J/kg.</p>', w: { type: 'heating' }, t2: '<p>Exemple : faire fondre 2,0 kg de glace demande Q = 2,0 × 3,3 × 10⁵ = 6,6 × 10⁵ J. Pour la solidification, la même énergie est <b>cédée</b>.</p>' }],
  qs: [
    () => { const m = pick([0.5, 1.5, 2.0, 3.0, 0.20]); return Q(`Énergie pour faire fondre ${nf(m, m < 1 ? 2 : 1)} kg de glace à 0 °C (L<sub>fusion</sub> = 3,3 × 10⁵ J/kg) ?`, sci(m * 3.3e5, 1) + ' J', [[sci(3.3e5 / m, 1) + ' J', 'Q = m × L : on multiplie.', 'cp-quot'], [sci(m / 3.3e5, 1) + ' J', 'Q = m × L.', 'cp-quot'], [sci(m * 3.3e4, 1) + ' J', 'Attention à la puissance de 10.', 'cm-pow']]); },
    Q('Énergie pour vaporiser 0,10 kg d’eau à 100 °C (L<sub>vap</sub> = 2,26 × 10⁶ J/kg) ?', '2,26 × 10⁵ J', [['2,26 × 10⁷ J', 'On multiplie par 0,10 = 10⁻¹ : l’exposant diminue de 1.', 'm-pow'], ['2,26 × 10⁶ J', 'C’est l’énergie pour 1 kg.'], ['4,4 × 10⁻⁸ J', 'On multiplie m par L.', 'cp-quot']]),
    Q('Pendant la fusion d’un corps pur, l’énergie reçue sert à…', 'changer d’état, la température restant constante', [['augmenter la température', 'Pendant le palier, la température ne varie pas.', 'p-ident'], ['augmenter la masse', 'La masse se conserve.'], ['casser les molécules', 'Les molécules restent intactes : seule leur organisation change.']]),
    Q('Lors de la solidification de 1,0 kg d’eau à 0 °C, l’eau…', 'cède 3,3 × 10⁵ J', [['reçoit 3,3 × 10⁵ J', 'La solidification est exothermique : l’eau cède de l’énergie.', 'p-endoexo'], ['cède 2,26 × 10⁶ J', 'Cette valeur concerne la vaporisation.'], ['n’échange pas d’énergie', 'Elle cède autant d’énergie qu’il en faut pour la fondre.']])]
});

/* ============ P7 Transformations chimiques ============ */
concept({
  id: 'p-reac', ch: 'P7', title: 'Réaction chimique et équation', prereq: ['p-cpm'],
  lesson: [{ h: 'Réactifs → produits', t: '<p>Lors d’une transformation chimique, les <b>réactifs</b> sont consommés et des <b>produits</b> se forment. Une espèce présente mais non transformée est <b>spectatrice</b> (elle n’apparaît pas dans l’équation).</p><p>Une équation est <b>ajustée</b> quand il y a autant d’atomes de chaque élément, et la même charge, de chaque côté. La masse totale se conserve.</p>', w: { type: 'eqbal', list: [0, 1] } }],
  qs: [
    Q('Combustion du carbone : C + O₂ → CO₂. Les réactifs sont…', 'C et O₂', [['CO₂', 'CO₂ est le produit (à droite de la flèche).'], ['C, O₂ et CO₂', 'Les réactifs sont seulement à gauche.'], ['O₂ seulement', 'Le carbone est aussi consommé.']]),
    Q('Une espèce spectatrice est une espèce…', 'présente dans le système mais non transformée', [['qui se forme pendant la réaction', 'Ça, c’est un produit.'], ['entièrement consommée', 'Ça, c’est le réactif limitant.'], ['qui regarde la réaction', 'Elle est bien présente, mais elle ne réagit pas.']]),
    Q('Une équation de réaction est ajustée quand…', 'chaque élément et la charge sont conservés', [['il y a autant de molécules à gauche qu’à droite', 'C’est le nombre d’atomes de chaque élément qui se conserve, pas le nombre de molécules.'], ['tous les nombres devant les formules valent 1', 'Il faut souvent d’autres nombres pour ajuster.'], ['il y a autant de réactifs que de produits', 'Le nombre d’espèces peut être différent.']]),
    Q('Pendant une transformation chimique, la masse totale…', 'se conserve', [['diminue', 'Les atomes se réarrangent ; aucun ne disparaît.'], ['augmente', 'Aucun atome n’apparaît.'], ['dépend de la température', 'La masse se conserve.']])]
});
concept({
  id: 'p-ajust', ch: 'P7', title: 'Ajuster une équation', prereq: ['p-reac'],
  lesson: [{ h: 'À toi de jouer', t: '<p>On ajuste avec les <b>nombres stœchiométriques</b> placés devant les formules. On ne modifie jamais les formules (les petits indices).</p>', w: { type: 'eqbal' } }],
  qs: [
    Q('Nombre manquant : CH₄ + … O₂ → CO₂ + 2 H₂O', '2', [['1', 'À droite : 2 O (dans CO₂) + 2 O (dans 2 H₂O) = 4 O. Il faut donc 2 O₂.'], ['3', 'Compte les O à droite : 2 + 2 = 4.'], ['4', '4 atomes O, soit 2 molécules O₂.']]),
    Q('Nombre manquant : … H₂ + O₂ → 2 H₂O', '2', [['1', 'À droite : 4 atomes H. Il faut 2 H₂.'], ['4', '4 H₂ apporteraient 8 atomes H.'], ['3', 'À droite il y a 2 × 2 = 4 atomes H.']]),
    Q('Nombre manquant : Fe + … H⁺ → Fe²⁺ + H₂', '2', [['1', 'Il faut 2 atomes H (dans H₂) et une charge 2+ (comme Fe²⁺).'], ['3', 'Compte les H : 2 à droite.'], ['4', 'Charge à droite : 2+. Il faut 2 H⁺.']]),
    Q('Formule manquante : CaCO₃ + 2 H⁺ → Ca²⁺ + CO₂ + …', 'H₂O', [['H₂', 'Il reste 1 atome O à placer : H₂O.'], ['2 H₂O', 'À gauche : 3 O. À droite : 2 (CO₂) + 1 = 3. Une seule molécule d’eau.'], ['O₂', 'Il reste aussi 2 atomes H à placer.']]),
    Q('Ajuste : a Al + 3 O₂ → b Al₂O₃. Valeurs de a et b ?', 'a = 4 et b = 2', [['a = 2 et b = 1', 'À gauche 6 atomes O, à droite seulement 3.'], ['a = 4 et b = 3', 'b = 3 donnerait 9 atomes O.'], ['a = 1 et b = 2', 'b = 2 demande 4 atomes Al.']])]
});
concept({
  id: 'p-limit', ch: 'P7', title: 'Réactif limitant et stœchiométrie', prereq: ['p-ajust'],
  lesson: [{ h: 'Qui s’épuise en premier ?', t: '<p>Le <b>réactif limitant</b> est celui qui est entièrement consommé en premier : il arrête la réaction. Les proportions sont données par l’équation. Si les réactifs sont dans ces proportions, le mélange est <b>stœchiométrique</b>.</p>', w: { type: 'limitant' }, t2: '<p>Plus il y a de réactif limitant, plus la transformation dégage (ou absorbe) d’énergie : la variation de température est plus grande.</p>' }],
  qs: [
    Q('2 H₂ + O₂ → 2 H₂O. On mélange 4 mol de H₂ et 3 mol de O₂. Réactif limitant ?', 'H₂', [['O₂', 'Il y a moins de O₂, mais il en faut deux fois moins : 4 mol de H₂ ne consomment que 2 mol de O₂.'], ['aucun', 'Il restera 1 mol de O₂ : H₂ est épuisé en premier.'], ['les deux', 'Il faudrait 6 mol de H₂ pour consommer 3 mol de O₂.']]),
    Q('Même mélange : 2 H₂ + O₂ → 2 H₂O, avec 4 mol de H₂ et 3 mol de O₂. Quantité d’eau formée ?', '4 mol', [['6 mol', '2 mol de H₂ donnent 2 mol d’eau : 4 mol de H₂ donnent 4 mol d’eau.'], ['3 mol', 'C’est H₂ qui limite.'], ['7 mol', 'On n’additionne pas les quantités.']]),
    () => { const a = ri(2, 6), b = ri(2, 6); const lim = a === b ? 'aucun : le mélange est stœchiométrique' : a < b ? 'le carbone C' : 'le dioxygène O₂'; const unk = ['on ne peut pas savoir', 'L’équation donne les proportions : 1 mol de C pour 1 mol de O₂.']; return Q(`C + O₂ → CO₂. On a ${a} mol de C et ${b} mol de O₂. Réactif limitant ?`, lim, a === b ? [['le carbone C', 'Les proportions sont 1 pour 1 et les quantités sont égales : les deux sont consommés.'], ['le dioxygène O₂', 'Les proportions sont 1 pour 1 et les quantités sont égales : les deux sont consommés.'], unk] : [a < b ? ['le dioxygène O₂', 'Il y a moins de C que de O₂, et il en faut autant : C s’épuise en premier.'] : ['le carbone C', 'Il y a moins de O₂ que de C, et il en faut autant : O₂ s’épuise en premier.'], ['aucun : le mélange est stœchiométrique', 'Il faudrait autant de C que de O₂.'], unk]); },
    Q('Un mélange est stœchiométrique quand…', 'les réactifs sont dans les proportions de l’équation et tous consommés', [['il y a autant de chaque réactif', 'Pas forcément : pour 2 H₂ + O₂, il faut deux fois plus de H₂.'], ['un réactif est en excès', 'Au contraire, aucun n’est en excès.'], ['la réaction ne se fait pas', 'Elle se fait, et consomme tout.']])]
});
concept({
  id: 'p-synth', ch: 'P7', title: 'Synthèse d’une espèce chimique', prereq: ['p-tests'],
  lesson: [{ h: 'Fabriquer au laboratoire', t: '<p>Une <b>synthèse</b> produit une espèce chimique, identique à une espèce naturelle (arôme de banane, d’ananas…) ou nouvelle.</p><p>Le <b>chauffage à reflux</b> accélère la transformation <b>sans perte de matière</b> : les vapeurs se condensent dans le réfrigérant et retombent dans le ballon.</p><p>On vérifie le produit par <b>CCM</b> en le comparant à l’espèce naturelle (ou par ses températures de changement d’état).</p>', w: { type: 'ccm' } }],
  qs: [
    Q('Le chauffage à reflux permet…', 'd’accélérer la transformation sans perte de matière', [['de refroidir le mélange', 'On chauffe : la température accélère la transformation.'], ['de séparer les produits', 'Ce n’est pas une technique de séparation.'], ['d’éviter de chauffer', 'C’est justement un chauffage, avec un réfrigérant pour ne rien perdre.']]),
    Q('Une espèce synthétique identique à une espèce naturelle a…', 'les mêmes propriétés (mêmes températures de changement d’état, même tache en CCM)', [['des propriétés différentes car elle est artificielle', 'Même espèce chimique = mêmes propriétés, quelle que soit son origine.'], ['une couleur toujours différente', 'Elle est identique.'], ['une formule différente', 'C’est la même molécule.']]),
    Q('En CCM, le produit synthétisé donne une tache à la hauteur de l’arôme naturel, et une autre tache. On conclut que…', 'le produit contient l’espèce voulue, mais il n’est pas pur', [['la synthèse a échoué', 'Une tache correspond bien à l’espèce voulue.', 'p-tests'], ['le produit est pur', 'Deux taches : au moins deux espèces.', 'p-tests'], ['l’arôme naturel est impur', 'On ne parle que des taches du produit.']])]
});

/* ============ P8 Transformations nucléaires ============ */
concept({
  id: 'p-nucl', ch: 'P8', title: 'Réactions nucléaires', prereq: ['p-nota'],
  lesson: [
    { h: 'Les noyaux changent', t: `<p>Dans une transformation <b>nucléaire</b>, ce sont les <b>noyaux</b> qui se transforment : les éléments chimiques changent. On écrit une équation en conservant le <b>nombre de nucléons A</b> (en haut) et la <b>charge Z</b> (en bas).</p><p>Particules utiles : neutron ${NUC(1, 0, 'n')}, proton ${NUC(1, 1, 'p')}, électron ${NUC(0, '−1', 'e')}, positon ${NUC(0, 1, 'e')}, noyau d’hélium ${NUC(4, 2, 'He')}.</p>`, w: { type: 'steps', lines: [`${NUC(238, 92, 'U')} → ${NUC(234, 90, 'Th')} + ${NUC('A', 'Z', 'X')}`, 'Nucléons : 238 = 234 + A, donc A = 4', 'Charges : 92 = 90 + Z, donc Z = 2', `X est un noyau d’hélium ${NUC(4, 2, 'He')}`] } },
    { h: 'Fusion et fission', t: `<p><b>Fusion</b> : des noyaux légers s’assemblent en un noyau plus lourd. C’est la source d’énergie du <b>Soleil</b> (hydrogène → hélium).</p><p><b>Fission</b> : un noyau lourd (uranium 235) est cassé par un neutron. C’est ce qui se passe dans les <b>centrales nucléaires</b>.</p><p>Ces transformations libèrent une énergie énorme, des millions de fois plus que les réactions chimiques pour une même masse.</p>` }],
  qs: [
    Q(`${NUC(238, 92, 'U')} → ${NUC(234, 90, 'Th')} + X. X est…`, NUC(4, 2, 'He'), [[NUC(1, 0, 'n'), 'Nucléons : 238 − 234 = 4, pas 1.'], [NUC(0, '−1', 'e'), 'Il manque 4 nucléons et 2 charges.'], [NUC(4, 1, 'H'), 'Charges : 92 − 90 = 2.']]),
    Q(`${NUC(14, 6, 'C')} → ${NUC(14, 7, 'N')} + X. X est…`, NUC(0, '−1', 'e') + ' (un électron)', [[NUC(0, 1, 'e') + ' (un positon)', 'Charges : 6 = 7 + Z, donc Z = −1.', 'cm-rel'], [NUC(1, 1, 'p'), 'Nucléons : 14 = 14 + A, donc A = 0.'], [NUC(1, 0, 'n'), 'A = 0 et Z = −1.']]),
    Q(`${NUC(2, 1, 'H')} + ${NUC(3, 1, 'H')} → ${NUC(4, 2, 'He')} + X. X est…`, NUC(1, 0, 'n') + ' (un neutron)', [[NUC(1, 1, 'p'), 'Charges : 1 + 1 = 2 + Z, donc Z = 0.'], [NUC(0, '−1', 'e'), 'Nucléons : 2 + 3 = 4 + A, donc A = 1.'], [NUC(2, 1, 'H'), 'A = 5 − 4 = 1.']]),
    Q('Dans une réaction nucléaire, ce qui se conserve, c’est…', 'le nombre total de nucléons et la charge totale', [['les éléments chimiques', 'Les noyaux changent : les éléments aussi.'], ['le nombre de neutrons', 'Des neutrons peuvent se transformer ou être émis.'], ['le nombre de protons', 'Z total se conserve, mais en comptant aussi les électrons et positons émis.']]),
    Q('Le Soleil produit son énergie par…', 'la fusion de noyaux d’hydrogène en hélium', [['la fission de l’uranium', 'La fission, c’est dans les centrales nucléaires.'], ['la combustion de gaz', 'Une combustion est chimique, bien trop peu énergétique.'], ['une réaction chimique', 'C’est une transformation nucléaire.']])]
});
concept({
  id: 'p-ntype', ch: 'P8', title: 'Physique, chimique ou nucléaire ?', prereq: ['p-nucl', 'p-reac', 'p-endoexo'],
  lesson: [{ h: 'Trois niveaux de transformation', t: '<table class="simple"><tr><th>Transformation</th><th>Ce qui change</th><th>Exemples</th></tr><tr><td><b>physique</b></td><td>l’état ou le mélange ; les espèces restent les mêmes</td><td>fusion, vaporisation, dissolution</td></tr><tr><td><b>chimique</b></td><td>les espèces (les atomes se réarrangent) ; les éléments sont conservés</td><td>combustion, rouille, acide sur calcaire</td></tr><tr><td><b>nucléaire</b></td><td>les noyaux, donc les éléments</td><td>fusion dans le Soleil, fission dans une centrale</td></tr></table>' }],
  qs: [
    () => { const L = [['la glace qui fond', 'physique'], ['le bois qui brûle', 'chimique'], ['la fission de l’uranium dans une centrale', 'nucléaire'], ['le fer qui rouille', 'chimique'], ['le sel qui se dissout dans l’eau', 'physique'], ['la fusion de l’hydrogène dans le Soleil', 'nucléaire'], ['l’eau qui bout', 'physique'], ['le vinaigre versé sur du calcaire (effervescence)', 'chimique']]; const [ex, ans] = pick(L); const why = { physique: 'Les espèces chimiques restent les mêmes : seul leur état ou leur mélange change.', chimique: 'De nouvelles espèces se forment, mais les éléments chimiques sont conservés.', nucléaire: 'Les noyaux se transforment : les éléments chimiques changent.' }; return Q(`Quel type de transformation : ${ex} ?`, ans, ['physique', 'chimique', 'nucléaire'].filter(x => x !== ans).map(x => [x, why[ans]]).concat([['aucune transformation', 'Il se passe bien quelque chose : ' + why[ans].toLowerCase()]])); },
    Q('Lors d’une transformation chimique, les éléments chimiques…', 'sont conservés : les atomes se réarrangent', [['changent', 'Seule une transformation nucléaire change les éléments.'], ['disparaissent', 'Aucun atome ne disparaît : la masse se conserve.', 'p-reac'], ['se transforment en énergie', 'Ce n’est pas le cas dans une transformation chimique.']]),
    Q('Quelle transformation peut changer un élément chimique en un autre ?', 'une transformation nucléaire', [['une transformation chimique', 'En chimie, les éléments sont conservés ; seuls les assemblages changent.'], ['un changement d’état', 'Les espèces ne changent même pas.'], ['une dissolution', 'C’est une transformation physique.']])]
});

/* ============ P9 Décrire un mouvement ============ */
concept({
  id: 'p-ref', ch: 'P9', title: 'Système et référentiel',
  lesson: [{ h: 'Le mouvement est relatif', t: '<p>Le <b>système</b> est l’objet étudié. Le <b>référentiel</b> est l’objet de référence (avec une horloge) par rapport auquel on décrit le mouvement. Un même système peut être immobile dans un référentiel et en mouvement dans un autre.</p>', w: { type: 'train' }, t2: '<p>Le <b>référentiel terrestre</b> (le sol, la Terre) est le plus utilisé pour les mouvements de la vie courante.</p>' }],
  qs: [
    Q('Un passager assis dans un train qui roule est…', 'immobile dans le référentiel du train et en mouvement dans celui du quai', [['immobile dans tous les référentiels', 'Vu du quai, il avance avec le train.'], ['en mouvement dans le référentiel du train', 'Il reste à sa place dans le train.'], ['en mouvement dans tous les référentiels', 'Par rapport au train, il ne bouge pas.']]),
    Q('Pour étudier le mouvement d’une voiture sur la route, on choisit en général…', 'le référentiel terrestre', [['le référentiel de la voiture', 'Dans ce référentiel, la voiture est immobile : impossible d’étudier son mouvement.'], ['le Soleil', 'Possible, mais bien trop compliqué pour une voiture.'], ['aucun référentiel', 'Un mouvement se décrit toujours par rapport à un référentiel.']]),
    Q('Un référentiel, c’est…', 'un objet de référence, avec une horloge, par rapport auquel on décrit un mouvement', [['l’objet dont on étudie le mouvement', 'Ça, c’est le système.'], ['la trajectoire', 'La trajectoire dépend du référentiel.'], ['la vitesse du système', 'La vitesse se mesure dans un référentiel.']]),
    Q('Dire « le Soleil se lève à l’est » décrit son mouvement dans le référentiel…', 'terrestre', [['du Soleil', 'Dans son propre référentiel, le Soleil est immobile.'], ['de la Lune', 'On décrit ce qu’on voit depuis la Terre.'], ['galiléen du Soleil', 'Depuis la Terre, on voit le Soleil bouger.']])]
});
concept({
  id: 'p-traj', ch: 'P9', title: 'Trajectoire et chronophotographie', prereq: ['p-ref'],
  lesson: [{ h: 'Positions successives', t: '<p>On modélise le système par un <b>point</b>. La <b>trajectoire</b> est l’ensemble de ses positions successives : rectiligne (droite), circulaire (cercle) ou curviligne. Sur une chronophotographie, les positions sont prises à intervalles de temps égaux Δt.</p>', w: { type: 'chrono', mode: 'uni' } }],
  qs: [
    Q('Ce mouvement (de gauche à droite) est…', 'rectiligne accéléré', [['rectiligne uniforme', 'Les écarts entre les points augmentent : la vitesse augmente.'], ['rectiligne ralenti', 'Les points sont de plus en plus espacés, pas de moins en moins.'], ['circulaire', 'Les points sont alignés.']], { w: { type: 'chrono', mode: 'acc', fixed: true, nocap: true } }),
    Q('Sur une chronophotographie, les points sont alignés et également espacés. Le mouvement est…', 'rectiligne uniforme', [['rectiligne accéléré', 'Accéléré : les écarts augmenteraient.'], ['circulaire uniforme', 'Les points sont alignés, pas sur un cercle.'], ['immobile', 'Le point change de position.']]),
    Q('Ce mouvement est…', 'circulaire uniforme', [['rectiligne uniforme', 'La trajectoire est un cercle.'], ['circulaire accéléré', 'Les écarts entre les points sont égaux : la vitesse a toujours la même valeur.'], ['rectiligne ralenti', 'La trajectoire n’est pas une droite.']], { w: { type: 'chrono', mode: 'circ', fixed: true, nocap: true } }),
    Q('Modéliser un ballon par un point fait perdre…', 'l’information sur sa rotation et sa forme', [['l’information sur sa position', 'Le point indique justement la position.'], ['l’information sur sa trajectoire', 'On peut toujours tracer la trajectoire du point.'], ['rien du tout', 'On ne voit plus si le ballon tourne sur lui-même.']])]
});
concept({
  id: 'p-vit', ch: 'P9', title: 'Vitesse et vecteur vitesse', prereq: ['p-traj', 'cp-quot', 'm-vtrans'],
  lesson: [
    { h: 'Vitesse moyenne', t: '<p>v = d ÷ Δt, en m/s. Conversion : 1 m/s = 3,6 km/h. Donc pour passer de km/h à m/s, on <b>divise par 3,6</b> (36 km/h = 10 m/s).</p>' },
    { h: 'Vecteur vitesse', t: `<p>Au point M<sub>i</sub>, le vecteur vitesse est environ ${V('M<sub>i</sub>M<sub>i+1</sub>')} ÷ Δt : il a la direction du mouvement (tangent à la trajectoire), le sens du mouvement et pour norme la vitesse.</p>`, w: { type: 'chrono', mode: 'circ', vec: true } }],
  qs: [
    Q('36 km/h = ? m/s', '10 m/s', [['129,6 m/s', 'Pour passer de km/h à m/s, on divise par 3,6.'], ['3,6 m/s', '36 ÷ 3,6 = 10.'], ['36 000 m/s', '36 km = 36 000 m, mais en 3 600 s.']]),
    Q('Chronophotographie : Δt = 0,040 s et M₃M₄ = 2,0 cm. Vitesse au point M₃ ?', '0,50 m/s', [['50 m/s', '2,0 cm = 0,020 m : il faut convertir en mètres.', 'cp-unit'], ['0,080 m/s', 'v = d ÷ Δt : on divise.', 'cp-quot'], ['2,0 m/s', 'v = 0,020 m ÷ 0,040 s.']]),
    Q('Dans un mouvement rectiligne uniforme, le vecteur vitesse…', 'reste le même (direction, sens et norme)', [['garde la même norme mais change de direction', 'Ça, c’est le mouvement circulaire uniforme.'], ['est nul', 'Le système bouge : sa vitesse n’est pas nulle.'], ['augmente', 'Uniforme : la vitesse est constante.']]),
    Q('Dans un mouvement circulaire uniforme, le vecteur vitesse…', 'garde la même norme mais change de direction', [['reste constant', 'Sa direction change à chaque instant (tangente au cercle).'], ['augmente', 'La norme reste la même : uniforme.'], ['pointe vers le centre', 'Il est tangent à la trajectoire.']]),
    () => { const t = pick([2, 4, 5, 8, 10]), v = pick([3, 5, 6, 12, 15]); return Q(`Un cycliste parcourt ${v * t * 10} m en ${t * 10} s. Sa vitesse moyenne ?`, `${v} m/s`, [[`${v * t * t * 100} m/s`, 'v = d ÷ Δt : on divise.', 'cp-quot'], [nf(+(t / v / 10).toFixed(3)) + ' m/s', 'v = d ÷ t, pas t ÷ d.', 'cp-quot'], [nf(+(v * 3.6).toFixed(1)) + ' m/s', nf(+(v * 3.6).toFixed(1)) + ', c’est la vitesse en km/h.']]); }]
});

/* ============ P10 Forces et principe d'inertie ============ */
concept({
  id: 'p-force', ch: 'P10', title: 'Modéliser une action par une force', prereq: ['m-vtrans'],
  lesson: [{ h: 'Une flèche pour chaque action', t: '<p>Une action mécanique se modélise par une <b>force</b> : point d’application, direction, sens, valeur (en newtons, N, mesurée avec un dynamomètre). Une action peut être <b>de contact</b> (table, fil, main) ou <b>à distance</b> (poids, aimant).</p>', w: { type: 'forces' } }],
  qs: [
    Q('Le poids est une action…', 'à distance', [['de contact', 'La Terre attire les objets même sans les toucher.'], ['ni de contact ni à distance', 'Toute action est de l’un ou de l’autre type.'], ['qui n’existe qu’au contact du sol', 'Un objet qui tombe subit son poids en l’air.']]),
    Q('La Terre attire la Lune avec une force F. La Lune attire la Terre avec une force…', 'de même valeur et de sens opposé', [['plus faible, car la Lune est moins massive', 'Principe des actions réciproques : les deux forces ont toujours la même valeur.'], ['nulle', 'La Lune attire aussi la Terre (c’est l’origine des marées).'], ['plus grande', 'Les deux forces ont la même valeur.']]),
    Q('Les caractéristiques d’une force sont…', 'son point d’application, sa direction, son sens et sa valeur', [['sa masse et son volume', 'Ce sont des caractéristiques d’un objet, pas d’une force.'], ['sa vitesse', 'Une force n’a pas de vitesse.'], ['seulement sa valeur', 'Il faut aussi savoir où et dans quel sens elle s’exerce.']]),
    Q('Unité de la valeur d’une force ?', 'le newton (N)', [['le kilogramme (kg)', 'Le kilogramme est l’unité de masse.'], ['le joule (J)', 'Le joule est l’unité d’énergie.'], ['le watt (W)', 'Le watt est l’unité de puissance.']]),
    Q('Un livre est posé sur une table. La force exercée par la table sur le livre est…', 'verticale, vers le haut', [['verticale, vers le bas', 'Vers le bas, c’est le poids.'], ['horizontale', 'La table empêche le livre de tomber : elle pousse vers le haut.'], ['nulle', 'Sans elle, le livre tomberait.']])]
});
concept({
  id: 'p-grav', ch: 'P10', title: 'Interaction gravitationnelle et poids', prereq: ['p-force', 'cm-pow'],
  lesson: [
    { h: 'Deux masses s’attirent', t: `<p class="formula">F = G × ${F('m<sub>A</sub> × m<sub>B</sub>', 'd²')}</p><p>G = 6,67 × 10⁻¹¹ N·m²·kg⁻². La force est toujours <b>attractive</b>. Si la distance d double, F est divisée par 2² = 4.</p>` },
    { h: 'Le poids', t: '<p>Près de la surface d’un astre, le poids est P = m × g. Sur Terre, g ≈ 9,8 N/kg ; sur la Lune, g ≈ 1,6 N/kg.</p>', w: { type: 'grav' } }],
  qs: [
    () => { const m = pick([5, 10, 25, 50, 60, 70, 2]); return Q(`Poids sur Terre d’un objet de ${m} kg (g = 9,8 N/kg) ?`, nf(+(m * 9.8).toFixed(1)) + ' N', [[m + ' N', 'La masse (kg) et le poids (N) sont différents : P = m × g.'], [nf(+(m / 9.8).toFixed(2)) + ' N', 'On multiplie par g, on ne divise pas.', 'cp-quot'], [nf(+(m * 1.6).toFixed(1)) + ' N', 'Ce serait sur la Lune.']]); },
    Q('Un astronaute de 80 kg est sur la Lune (g = 1,6 N/kg). Sa masse et son poids ?', 'masse 80 kg, poids 128 N', [['masse 13 kg, poids 128 N', 'La masse ne change pas en changeant d’astre.'], ['masse 80 kg, poids 784 N', '784 N est son poids sur Terre.'], ['masse 128 kg, poids 80 N', 'Masse en kg, poids en N : P = m × g.']]),
    Q('Si la distance entre deux corps double, la force gravitationnelle est…', 'divisée par 4', [['divisée par 2', 'F dépend de d² : 2² = 4.'], ['multipliée par 2', 'Quand les corps s’éloignent, la force diminue.'], ['multipliée par 4', 'd² est au dénominateur : la force diminue.']]),
    Q('La force gravitationnelle entre deux objets est…', 'toujours attractive', [['toujours répulsive', 'Les masses s’attirent.'], ['attractive ou répulsive selon les charges', 'Ça, c’est la force électrique.'], ['nulle pour les petits objets', 'Elle est très faible, mais pas nulle.']])]
});
concept({
  id: 'p-inertie', ch: 'P10', title: 'Principe d’inertie', prereq: ['p-force', 'p-vit'],
  lesson: [{ h: 'Forces et variation de vitesse', t: '<p><b>Principe d’inertie</b> : si les forces qui s’exercent sur un système <b>se compensent</b> (ou s’il n’en subit aucune), il est immobile ou en mouvement <b>rectiligne uniforme</b>. Et réciproquement.</p><p>Donc : si le vecteur vitesse <b>varie</b> (en valeur ou en direction), les forces <b>ne se compensent pas</b>. Le vecteur vitesse varie dans le sens de la somme des forces.</p>', w: { type: 'inertia' } }],
  qs: [
    Q('Un palet glisse en ligne droite à vitesse constante sur la glace. Les forces qui s’exercent sur lui…', 'se compensent', [['ne se compensent pas : une force le pousse vers l’avant', 'Pas besoin de force pour continuer à avancer : mouvement rectiligne uniforme = forces compensées.'], ['sont nulles : aucune force ne s’exerce', 'Son poids et l’action de la glace s’exercent, mais se compensent.'], ['sont toutes vers l’avant', 'Le poids est vertical.']]),
    Q('Une balle lâchée sans vitesse tombe en chute libre. Sa vitesse…', 'augmente, car son poids n’est pas compensé', [['reste constante', 'Le poids n’est pas compensé : la vitesse varie.'], ['diminue', 'Le poids est vers le bas, dans le sens du mouvement : la vitesse augmente.'], ['augmente, car une force d’élan la pousse', 'La seule force est le poids.']]),
    Q('Une voiture prend un virage à vitesse constante. Les forces qui s’exercent sur elle…', 'ne se compensent pas', [['se compensent, car la vitesse est constante', 'La valeur est constante, mais la direction du vecteur vitesse change.'], ['sont nulles', 'Il faut une force pour tourner.'], ['sont toutes dirigées vers l’avant', 'Leur somme est dirigée vers l’intérieur du virage.']]),
    Q('Une balle est lancée vers le haut. Pendant la montée (frottements négligés), elle est soumise à…', 'son poids seulement, vers le bas', [['une force vers le haut qui diminue', 'Une fois la balle lâchée, la main ne la pousse plus : il ne reste que le poids.'], ['son poids et une force d’élan', 'La « force d’élan » n’existe pas.'], ['aucune force', 'Le poids s’exerce toujours.']]),
    Q('Un objet est immobile sur une table. On peut affirmer que…', 'les forces qui s’exercent sur lui se compensent', [['aucune force ne s’exerce sur lui', 'Son poids et l’action de la table s’exercent.'], ['son poids est nul', 'Il a bien un poids.'], ['la table n’exerce aucune force', 'Elle compense le poids.']])]
});

/* ============ P11 Le son ============ */
concept({
  id: 'p-sonprop', ch: 'P11', title: 'Émission et propagation d’un son', prereq: ['cp-quot'],
  lesson: [{ h: 'Une vibration qui se propage', t: '<p>Un son est produit par un objet qui <b>vibre</b> (la caisse de résonance d’un instrument l’amplifie). Il se propage dans un <b>milieu matériel</b> (air, eau, solides), pas dans le vide.</p>', w: { type: 'wave' }, t2: '<p>Vitesse du son : environ <b>340 m/s</b> dans l’air, 1 500 m/s dans l’eau, 5 000 à 6 000 m/s dans l’acier. La lumière, elle, va à 3,00 × 10⁸ m/s.</p>' }],
  qs: [
    Q('Le son peut-il se propager dans le vide ?', 'Non : il a besoin d’un milieu matériel', [['Oui, comme la lumière', 'La lumière traverse le vide, pas le son.'], ['Oui, mais moins vite', 'Sans matière, pas de vibration transmise : pas de son.'], ['Seulement s’il est très fort', 'Aucun son ne traverse le vide.']]),
    () => { const t = pick([2, 3, 4, 5, 6]); return Q(`On entend le tonnerre ${t},0 s après l’éclair. Distance de l’orage (son : 340 m/s) ?`, nf(340 * t) + ' m', [[nf(+(340 / t).toFixed(1)) + ' m', 'd = v × t : on multiplie.', 'cp-quot'], [nf(+(t / 340).toFixed(4)) + ' m', 'd = v × t.', 'cp-quot'], [nf(340 + t) + ' m', 'On multiplie la vitesse par la durée.']]); },
    Q('Dans quel milieu le son se propage-t-il le plus vite ?', 'l’acier', [['l’air', 'Dans l’air, environ 340 m/s seulement.'], ['le vide', 'Le son ne se propage pas dans le vide.'], ['l’eau', 'Dans l’eau, environ 1 500 m/s ; dans l’acier, plus de 5 000 m/s.']]),
    Q('Rôle de la caisse de résonance d’une guitare ?', 'amplifier le son produit par les cordes', [['produire la note', 'Ce sont les cordes qui vibrent et fixent la note.'], ['empêcher le son de sortir', 'Au contraire.'], ['changer la fréquence', 'La fréquence dépend des cordes.']])]
});
concept({
  id: 'p-periode', ch: 'P11', title: 'Période et fréquence', prereq: ['cm-pow', 'cp-quot'],
  lesson: [{ h: 'Un motif qui se répète', t: '<p>Un signal <b>périodique</b> répète le même motif. La <b>période</b> T (en s) est la durée d’un motif ; la <b>fréquence</b> f (en Hz) est le nombre de motifs par seconde.</p><p class="formula">f = 1 / T</p><p>Astuce : mesure la durée de plusieurs périodes, puis divise, c’est plus précis.</p>', w: { type: 'signal', f: 500 } }],
  qs: [
    Q('T = 2,0 ms. Fréquence ?', '500 Hz', [['0,50 Hz', 'Il faut convertir : 2,0 ms = 2,0 × 10⁻³ s.', 'cm-pow'], ['2,0 Hz', 'f = 1 / T.'], ['5 000 Hz', '1 ÷ 0,0020 = 500.']]),
    () => { const f = pick([100, 200, 250, 400, 500, 1000]); const T = 1000 / f; return Q(`Un son a une fréquence de ${f} Hz. Sa période ?`, nf(T) + ' ms', [[nf(f) + ' ms', 'T = 1 / f.'], [nf(T / 1000) + ' ms', 'T = 1/' + f + ' s = ' + nf(T) + ' ms.', 'cm-pow'], [nf(T * 10) + ' ms', 'Recalcule 1 ÷ ' + f + '.']]); },
    Q('Sur l’oscillogramme, 4 périodes occupent 10 ms. Période ?', '2,5 ms', [['40 ms', 'On divise la durée par le nombre de périodes.'], ['10 ms', '10 ms, c’est la durée de 4 périodes.'], ['0,4 ms', '10 ÷ 4 = 2,5.']], { w: { type: 'signal', f: 400, fixed: true } }),
    Q('Si la période d’un son double, sa fréquence…', 'est divisée par 2', [['double', 'f = 1 / T : si T augmente, f diminue.'], ['ne change pas', 'f et T sont liées : f = 1 / T.'], ['est multipliée par 4', 'f = 1 / T.']])]
});
concept({
  id: 'p-percep', ch: 'P11', title: 'Perception du son', prereq: ['p-periode'],
  lesson: [{ h: 'Hauteur, timbre, intensité', t: '<p><b>Hauteur</b> ↔ fréquence (aigu = grande fréquence). <b>Timbre</b> ↔ forme du signal. <b>Intensité</b> ↔ amplitude.</p>', w: { type: 'signal', f: 300 }, t2: '<p>Niveau d’intensité sonore L, en <b>décibels (dB)</b>, mesuré au sonomètre : 0 dB seuil d’audibilité ; 60 dB conversation ; <b>85 dB : danger</b> en cas d’exposition prolongée ; 120 dB seuil de douleur.</p><p>L’oreille humaine entend de 20 Hz à 20 kHz. En dessous : <b>infrasons</b> ; au-dessus : <b>ultrasons</b>.</p>' }],
  qs: [
    Q('Un son plus aigu a…', 'une fréquence plus grande', [['une amplitude plus grande', 'L’amplitude donne l’intensité (fort/faible).'], ['une période plus grande', 'Plus aigu = fréquence plus grande = période plus petite.', 'p-periode'], ['une vitesse plus grande', 'Tous les sons vont à la même vitesse dans l’air.']]),
    Q('Une flûte et une guitare jouent la même note avec la même intensité. Ce qui les distingue…', 'le timbre (la forme du signal)', [['la fréquence', 'Même note = même fréquence.'], ['l’amplitude', 'Même intensité = même amplitude.'], ['la vitesse du son', 'Elle est la même pour les deux.']]),
    Q('Un son de fréquence 30 kHz est…', 'un ultrason, inaudible pour l’humain', [['un son très grave', '30 kHz est au-dessus de 20 kHz : très aigu.'], ['un infrason', 'Les infrasons ont une fréquence inférieure à 20 Hz.'], ['un son audible très aigu', 'Au-delà de 20 kHz, l’oreille humaine n’entend plus.']]),
    Q('À partir de quel niveau sonore une exposition prolongée devient-elle dangereuse ?', 'environ 85 dB', [['environ 30 dB', '30 dB est très calme (bibliothèque).'], ['environ 60 dB', '60 dB correspond à une conversation.'], ['seulement à partir de 140 dB', 'Le danger commence bien avant, vers 85 dB.']]),
    Q('Quand l’amplitude d’un son augmente…', 'le son est plus fort', [['le son est plus aigu', 'L’aigu dépend de la fréquence.'], ['le timbre change', 'Le timbre dépend de la forme du signal.'], ['la fréquence diminue', 'Amplitude et fréquence sont indépendantes.']])]
});

/* ============ P12 Lumière, spectres et lentilles ============ */
concept({
  id: 'p-spectre', ch: 'P12', title: 'Lumière et spectres', prereq: ['cm-pow'],
  lesson: [{ h: 'Décomposer la lumière', t: '<p>Dans un milieu homogène, la lumière se propage en ligne droite, à <b>3,00 × 10⁸ m/s</b> dans le vide (et presque autant dans l’air). Le visible va de <b>400 nm</b> (violet) à <b>800 nm</b> (rouge). Un prisme ou un réseau <b>disperse</b> la lumière blanche.</p>', w: { type: 'spectrum' } }],
  qs: [
    Q('Vitesse de la lumière dans le vide ?', '3,00 × 10⁸ m/s', [['340 m/s', 'C’est la vitesse du son dans l’air.'], ['3,00 × 10⁵ m/s', '3,00 × 10⁵ est la valeur en km/s, pas en m/s.', 'cm-pow'], ['3,00 × 10⁸ km/s', 'C’est 3,00 × 10⁸ m/s (= 300 000 km/s).']]),
    Q('Longueur d’onde dans le vide d’une lumière rouge, environ ?', '700 nm', [['400 nm', '400 nm correspond au violet.'], ['7 m', 'Les longueurs d’onde visibles se mesurent en nanomètres.'], ['70 µm', '70 µm = 70 000 nm : c’est de l’infrarouge, invisible.']]),
    Q('Un objet chauffé devient de plus en plus chaud. Son spectre…', 's’enrichit vers le bleu et le violet', [['s’enrichit vers le rouge', 'C’est l’inverse : un corps peu chaud émet surtout du rouge.'], ['devient un spectre de raies', 'Un corps chaud dense donne un spectre continu.'], ['ne change pas', 'La température change le spectre (rouge → blanc).']]),
    Q('Un spectre de raies d’émission permet…', 'd’identifier les éléments chimiques d’un gaz', [['de mesurer la température d’un solide', 'C’est le spectre continu qui renseigne sur la température.'], ['de mesurer la vitesse de la lumière', 'Ce n’est pas son usage.'], ['de voir les ultrasons', 'Les ultrasons sont des sons.']]),
    Q('La lumière met environ combien de temps à venir du Soleil (1,5 × 10¹¹ m) ?', '500 s (environ 8 min)', [['4,5 × 10¹⁹ s', 't = d ÷ v : on divise.', 'cp-quot'], ['2,0 × 10⁻³ s', 't = d ÷ v, pas v ÷ d.', 'cp-quot'], ['instantanément', 'La lumière est très rapide, mais pas infiniment.']])]
});
concept({
  id: 'p-refr', ch: 'P12', title: 'Réflexion et réfraction', prereq: ['p-spectre'],
  lesson: [{ h: 'Lois de Snell-Descartes', t: `<p>Indice de réfraction d’un milieu : n = ${F('c', 'v')} (n ≥ 1). Les angles se mesurent par rapport à la <b>normale</b>.</p><p>Réflexion : angle de réflexion = angle d’incidence. Réfraction : <b>n₁ × sin i₁ = n₂ × sin i₂</b>.</p>`, w: { type: 'refraction' } }],
  qs: [
    Q('Les angles d’incidence et de réfraction se mesurent par rapport à…', 'la normale à la surface', [['la surface de séparation', 'On utilise la droite perpendiculaire à la surface : la normale.'], ['l’horizontale', 'Ce serait faux si la surface est inclinée.'], ['le rayon réfléchi', 'Tous les angles sont repérés par rapport à la normale.']]),
    Q('Un rayon passe de l’air (n = 1,00) dans l’eau (n = 1,33) avec i₁ = 30°. i₂ ≈ ?', '22°', [['30°', 'Le rayon est dévié : sin i₂ = 1,00 × sin 30° ÷ 1,33.'], ['42°', 'sin i₂ = n₁ sin i₁ ÷ n₂, et non n₂ sin i₁ ÷ n₁. Dans l’eau, le rayon se rapproche de la normale.'], ['15°', 'sin 30° = 0,5 ; 0,5 ÷ 1,33 ≈ 0,376 ; i₂ ≈ 22°.']]),
    Q('Dans un milieu, la lumière se propage à 2,0 × 10⁸ m/s. Indice de réfraction ?', '1,5', [['0,67', 'n = c ÷ v, et pas v ÷ c (n est toujours ≥ 1).', 'cp-quot'], ['6,0 × 10¹⁶', 'On divise c par v.', 'cp-quot'], ['1,0', 'n = 3,0 × 10⁸ ÷ 2,0 × 10⁸ = 1,5.']]),
    Q('Réflexion : angle d’incidence de 40°. Angle de réflexion ?', '40°', [['50°', 'L’angle de réflexion est égal à l’angle d’incidence (par rapport à la normale).'], ['140°', 'Les angles se mesurent par rapport à la normale.'], ['80°', 'Il est égal, pas double.']]),
    Q('En passant de l’air dans le verre, le rayon réfracté…', 'se rapproche de la normale', [['s’éloigne de la normale', 'Le verre est plus réfringent (n plus grand) : i₂ &lt; i₁.'], ['n’est pas dévié', 'Il est dévié sauf si i₁ = 0°.'], ['revient toujours en arrière', 'Il y a un rayon réfracté dans le verre.']])]
});
concept({
  id: 'p-lentille', ch: 'P12', title: 'Lentille convergente et œil', prereq: ['p-refr', 'cm-prop'],
  lesson: [
    { h: 'Former une image', t: '<p>Une lentille convergente a un centre optique O, un foyer objet F, un foyer image F’ ; f’ = OF’ est la <b>distance focale</b>. Déplace l’objet :</p>', w: { type: 'lens' } },
    { h: 'Grandissement et œil', t: `<p>γ = ${F('A’B’', 'AB')} = ${F('OA’', 'OA')} (théorème de Thalès). γ &lt; 0 : image renversée ; |γ| &gt; 1 : agrandie.</p><p><b>Œil réduit</b> : le cristallin joue le rôle de la lentille, la rétine celui de l’écran, l’iris celui du diaphragme.</p>` }],
  qs: [
    Q('Un rayon parallèle à l’axe optique ressort de la lentille en passant par…', 'le foyer image F’', [['le foyer objet F', 'Les rayons parallèles convergent au foyer image, après la lentille.'], ['le centre optique O', 'Seul le rayon qui passe par O n’est pas dévié.'], ['nulle part : il n’est pas dévié', 'La lentille le dévie vers F’.']]),
    Q('Un rayon qui passe par le centre optique O…', 'n’est pas dévié', [['ressort parallèle à l’axe', 'C’est le cas du rayon qui passe par F.'], ['passe ensuite par F’', 'C’est le cas du rayon parallèle à l’axe.'], ['est réfléchi', 'Une lentille transmet la lumière.']]),
    Q('Objet AB = 2,0 cm, image A’B’ = −6,0 cm. Grandissement ?', '−3,0', [['3,0', 'A’B’ est négatif (image renversée) : γ est négatif.'], ['−0,33', 'γ = A’B’ ÷ AB, pas AB ÷ A’B’.', 'cp-quot'], ['4,0', 'On divise, on ne soustrait pas.']]),
    Q('Dans le modèle de l’œil réduit, la rétine joue le rôle…', 'de l’écran', [['de la lentille', 'La lentille, c’est le cristallin.'], ['du diaphragme', 'Le diaphragme, c’est l’iris.'], ['de l’objet', 'L’objet est ce que l’on regarde.']]),
    Q('L’image d’un objet très éloigné se forme…', 'dans le plan du foyer image F’', [['dans le plan du foyer objet F', 'Les rayons venant de très loin sont parallèles : ils convergent en F’.'], ['au centre optique O', 'L’image est derrière la lentille, à la distance f’.'], ['à l’infini', 'C’est l’objet qui est à l’infini, l’image est en F’.']])]
});

/* ============ P13 Circuits électriques et capteurs ============ */
concept({
  id: 'p-lois', ch: 'P13', title: 'Lois des nœuds et des mailles',
  lesson: [{ h: 'Série et dérivation', t: '<p><b>Loi des nœuds</b> : la somme des intensités qui arrivent à un nœud est égale à la somme de celles qui en partent.</p><p><b>Loi des mailles</b> : dans une boucle, les tensions s’équilibrent. En série : U<sub>G</sub> = U₁ + U₂. En dérivation : même tension aux bornes de chaque branche.</p>', w: { type: 'circuit' } }],
  qs: [
    () => { const I = pick([0.5, 0.6, 0.8, 1.2]), I1 = pick([0.1, 0.2, 0.3]); return Q(`À un nœud, I = ${nf(I)} A arrive ; une branche emporte I₁ = ${nf(I1)} A. Intensité I₂ dans l’autre branche ?`, nf(+(I - I1).toFixed(2)) + ' A', [[nf(+(I + I1).toFixed(2)) + ' A', 'Le courant se partage : I = I₁ + I₂, donc I₂ = I − I₁.'], [nf(I) + ' A', 'Une partie du courant part par I₁.'], [nf(+(I / 2).toFixed(2)) + ' A', 'Le courant ne se partage pas forcément en deux parts égales.']]); },
    Q('Circuit en série : U<sub>G</sub> = 12 V et U₁ = 7,5 V. Tension U₂ ?', '4,5 V', [['19,5 V', 'U<sub>G</sub> = U₁ + U₂, donc U₂ = 12 − 7,5.'], ['12 V', 'En série, la tension se partage.'], ['7,5 V', 'Les deux tensions ne sont pas forcément égales.']]),
    Q('Deux lampes sont branchées en dérivation sur un générateur de 6,0 V. Tension aux bornes de chaque lampe ?', '6,0 V', [['3,0 V', 'C’est en série que la tension se partage. En dérivation, chaque branche a la tension du générateur.'], ['12 V', 'Les tensions ne s’additionnent pas en dérivation.'], ['0 V', 'Les lampes sont alimentées.']]),
    Q('Un ampèremètre se branche…', 'en série', [['en dérivation', 'C’est le voltmètre qui se branche en dérivation.'], ['n’importe comment', 'Il doit être traversé par le courant à mesurer.'], ['aux bornes du générateur seulement', 'Il se place en série dans la branche étudiée.']]),
    Q('Dans un circuit en série, l’intensité…', 'est la même en tout point', [['diminue après chaque lampe', 'Le courant n’est pas « consommé » : il est le même partout.'], ['est plus forte près du générateur', 'Elle est identique partout dans une boucle.'], ['dépend de la position de l’interrupteur', 'Interrupteur fermé : même intensité partout.']])]
});
concept({
  id: 'p-ohm', ch: 'P13', title: 'Caractéristique et loi d’Ohm', prereq: ['cp-quot', 'm-faff'],
  lesson: [{ h: 'U = R × I', t: '<p>La <b>caractéristique</b> d’un dipôle est la courbe U = f(I). Pour un <b>conducteur ohmique</b>, c’est une droite qui passe par l’origine : U = R × I (U en V, I en A, R en ohms Ω).</p>', w: { type: 'ohm' }, t2: '<p>Le <b>point de fonctionnement</b> d’un circuit est l’intersection des caractéristiques du générateur et du dipôle.</p>' }],
  qs: [
    () => { const R0 = pick([10, 47, 100, 220, 330]), I = pick([0.01, 0.02, 0.05, 0.1]); return Q(`R = ${R0} Ω et I = ${nf(I)} A. Tension U ?`, nf(+(R0 * I).toFixed(3)) + ' V', [[nf(+(R0 / I).toFixed(1)) + ' V', 'U = R × I : on multiplie.', 'cp-quot'], [nf(+(I / R0).toFixed(6)) + ' V', 'U = R × I.', 'cp-quot'], [nf(R0 + I) + ' V', 'On multiplie R par I.']]); },
    Q('U = 6,0 V et I = 0,020 A. Résistance ?', '300 Ω', [['0,12 Ω', 'R = U ÷ I : on divise.', 'cp-quot'], ['3,3 × 10⁻³ Ω', 'R = U ÷ I, pas I ÷ U.', 'cp-quot'], ['6,0 Ω', 'Il faut diviser par l’intensité.']]),
    Q('La caractéristique d’un conducteur ohmique est…', 'une droite passant par l’origine', [['une courbe qui monte de plus en plus vite', 'U et I sont proportionnels : c’est une droite.'], ['une droite horizontale', 'U augmente avec I.'], ['une droite ne passant pas par l’origine', 'Pour I = 0, U = 0.']]),
    Q('I = 20 mA et R = 150 Ω. Tension U ?', '3,0 V', [['3 000 V', '20 mA = 0,020 A : il faut convertir.', 'cm-pow'], ['7,5 V', 'U = R × I = 150 × 0,020.'], ['0,13 V', 'On multiplie, on ne divise pas.']])]
});
concept({
  id: 'p-capteur', ch: 'P13', title: 'Capteurs et étalonnage', prereq: ['p-ohm', 'm-flect'],
  lesson: [{ h: 'Mesurer une grandeur avec une résistance', t: '<p>Un <b>capteur résistif</b> a une résistance qui dépend d’une grandeur physique : la température (thermistance), l’éclairement (photorésistance), la pression… Une <b>courbe d’étalonnage</b> permet de retrouver la grandeur à partir de la résistance mesurée.</p>', w: { type: 'etalon' } }],
  qs: [
    Q('Une thermistance est un capteur dont la résistance dépend…', 'de la température', [['de la lumière', 'Ça, c’est une photorésistance.'], ['du son', 'Un micro capte le son.'], ['de la tension seulement', 'Sa résistance varie avec la température.']]),
    Q('D’après la courbe d’étalonnage, R = 8 kΩ correspond à…', '40 °C', [['8 °C', 'On ne lit pas directement la résistance comme une température : on va jusqu’à la courbe.'], ['20 °C', 'À 20 °C, R vaut 16 kΩ.'], ['60 °C', 'À 60 °C, R vaut 4 kΩ.']], { w: { type: 'etalon', fixed: true } }),
    Q('Une photorésistance permet de mesurer…', 'l’éclairement (la quantité de lumière reçue)', [['la température', 'C’est le rôle de la thermistance.'], ['la masse', 'Une balance mesure la masse.'], ['la fréquence d’un son', 'Ce n’est pas un capteur sonore.']]),
    Q('Une courbe d’étalonnage sert à…', 'relier la valeur mesurée par le capteur à la grandeur cherchée', [['augmenter la résistance', 'Elle sert à interpréter la mesure.'], ['protéger le circuit', 'Ce n’est pas son rôle.'], ['remplacer le capteur', 'On l’utilise avec le capteur.']])]
});

/* ============ P14 Mesure et incertitudes ============ */
concept({
  id: 'p-mesure', ch: 'P14', title: 'Série de mesures et dispersion', prereq: ['m-stmoy'],
  lesson: [{ h: 'Pourquoi les mesures varient', t: '<p>Si on répète une mesure, on n’obtient pas toujours la même valeur : c’est la <b>variabilité</b> (instrument, opérateur, conditions). On prend la <b>moyenne</b> comme résultat, et l’<b>écart type</b> décrit la dispersion.</p>', w: { type: 'histo' } }],
  qs: [
    Q('Pourquoi des mesures répétées d’une même grandeur donnent-elles des valeurs différentes ?', 'à cause de la variabilité (instrument, opérateur, conditions)', [['parce que la grandeur change à chaque fois', 'La grandeur est la même ; c’est la mesure qui varie.'], ['parce qu’une seule mesure est juste', 'Aucune mesure n’est parfaite.'], ['parce que l’instrument est cassé', 'Même avec un bon instrument, les mesures fluctuent.']]),
    Q('Le résultat d’une série de mesures est en général…', 'la moyenne des mesures', [['la plus grande valeur', 'On prend la moyenne, qui compense les écarts.'], ['la première mesure', 'Une seule mesure est moins fiable.'], ['l’écart type', 'L’écart type mesure la dispersion.']]),
    Q('Une série de mesures est plus dispersée qu’une autre. Son écart type est…', 'plus grand', [['plus petit', 'Plus les valeurs sont éparpillées, plus l’écart type est grand.', 'm-stet'], ['le même', 'La dispersion est différente.'], ['nul', 'Il n’est nul que si toutes les valeurs sont égales.']]),
    Q('Mesures de la période d’un pendule : 1,42 s ; 1,45 s ; 1,40 s ; 1,43 s. Moyenne ?', '1,425 s', [['1,42 s', '1,42 s est la première mesure ; la moyenne est 5,70 ÷ 4.'], ['1,45 s', 'C’est la plus grande valeur.'], ['5,70 s', 'Il faut diviser la somme par 4.', 'm-stmoy']])]
});
concept({
  id: 'p-incert', ch: 'P14', title: 'Incertitude-type et écriture d’un résultat', prereq: ['p-mesure', 'm-enc'],
  lesson: [{ h: 'Écrire un résultat honnêtement', t: '<p>L’<b>incertitude-type</b> u(x) indique l’étendue des valeurs que l’on peut raisonnablement attribuer à la grandeur. Par une approche statistique, on l’estime à partir de l’écart type de la série de mesures.</p><p>On écrit le résultat avec un nombre de <b>chiffres significatifs</b> adapté : u avec 1 ou 2 chiffres significatifs, et la valeur arrondie au même rang. Exemple : g = 9,7 m/s² avec u(g) = 0,2 m/s².</p><p>Chiffres significatifs : on compte à partir du premier chiffre non nul. 0,0250 → 3 chiffres significatifs (2, 5, 0).</p><p>On compare ensuite le résultat à une <b>valeur de référence</b> : si l’écart est petit devant u, le résultat est cohérent.</p>' }],
  qs: [
    Q('Combien de chiffres significatifs dans 0,0250 ?', '3', [['4', 'Les zéros à gauche ne comptent pas : 2, 5, 0.'], ['5', 'On commence à compter au premier chiffre non nul.'], ['2', 'Le zéro final compte : il indique la précision.']]),
    Q('On mesure g = 9,742 m/s² avec u(g) = 0,2 m/s². Écriture adaptée ?', 'g = 9,7 m/s² avec u(g) = 0,2 m/s²', [['g = 9,742 m/s² avec u(g) = 0,2 m/s²', 'Les chiffres 4 et 2 sont bien plus petits que l’incertitude : ils n’ont pas de sens.'], ['g = 10 m/s² avec u(g) = 0,2 m/s²', 'On arrondit au même rang que l’incertitude : au dixième.'], ['g = 9,74 m/s² avec u(g) = 0,2 m/s²', 'u est connue au dixième près : on arrondit la valeur au dixième.']]),
    Q('Valeur de référence : g = 9,81 m/s². Mesure : g = 9,7 m/s² avec u(g) = 0,2 m/s². Conclusion ?', 'Le résultat est cohérent : l’écart (0,1) est plus petit que l’incertitude-type', [['Le résultat est faux, car 9,7 ≠ 9,81', 'Une mesure n’est jamais exactement égale à la référence : on compare l’écart à u.'], ['La valeur de référence est fausse', 'La valeur de référence est fiable.'], ['On ne peut rien conclure', 'On compare l’écart |9,7 − 9,81| à l’incertitude-type.']]),
    Q('Plus l’incertitude-type est petite, plus la mesure est…', 'précise', [['fausse', 'Une petite incertitude indique une mesure précise.'], ['grande', 'L’incertitude ne dit rien de la taille de la valeur.'], ['dispersée', 'C’est l’inverse.']])]
});
