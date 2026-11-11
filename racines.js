/* Familles de mots : une racine de trois lettres, plusieurs mots.
   Page : #/grammaire/familles (et #/grammaire/familles/<id>). */
const RACINES = [
  { id: 'ktv', r: 'כ־ת־ב', fr: 'écrire', em: '✍️', mots: [['כָּתַב', 'il a écrit'], ['מִכְתָּב', 'une lettre (courrier)'], ['כְּתוֹבֶת', 'une adresse'], ['כַּתָּב', 'un reporter'], ['כְּתִיבָה', 'l’écriture']] },
  { id: 'lmd', r: 'ל־מ־ד', fr: 'apprendre', em: '📚', mots: [['לָמַד', 'il a appris'], ['תַּלְמִיד', 'un élève'], ['מְלַמֵּד', 'il enseigne'], ['לִמּוּדִים', 'les études']] },
  { id: 'spr', r: 'ס־פ־ר', fr: 'compter, raconter', em: '📖', mots: [['סֵפֶר', 'un livre'], ['סִפּוּר', 'une histoire'], ['סִפְרִיָּה', 'une bibliothèque'], ['מִסְפָּר', 'un nombre'], ['סַפָּר', 'un coiffeur']] },
  { id: 'shmr', r: 'ש־מ־ר', fr: 'garder', em: '💂', mots: [['שָׁמַר', 'il a gardé'], ['שׁוֹמֵר', 'un gardien'], ['שְׁמִירָה', 'la protection'], ['מִשְׁמֶרֶת', 'un service (de garde)']] },
  { id: 'akhl', r: 'א־כ־ל', fr: 'manger', em: '🍽️', mots: [['אָכַל', 'il a mangé'], ['אֹכֶל', 'la nourriture'], ['מַאֲכָל', 'un plat'], ['אֲכִילָה', 'le fait de manger']] },
  { id: 'avd', r: 'ע־ב־ד', fr: 'travailler', em: '💼', mots: [['עָבַד', 'il a travaillé'], ['עֲבוֹדָה', 'le travail'], ['עוֹבֵד', 'un employé'], ['מַעְבָּדָה', 'un laboratoire']] },
  { id: 'bshl', r: 'ב־ש־ל', fr: 'cuire', em: '🍳', mots: [['בִּשֵּׁל', 'il a cuisiné'], ['בִּשּׁוּל', 'la cuisine (l’art de cuisiner)'], ['מְבֻשָּׁל', 'cuit'], ['בָּשֵׁל', 'mûr']] },
  { id: 'nsa', r: 'נ־ס־ע', fr: 'voyager', em: '🚆', mots: [['נָסַע', 'il a voyagé'], ['נְסִיעָה', 'un trajet'], ['נוֹסֵעַ', 'un passager'], ['מַסָּע', 'une expédition']] },
  { id: 'tus', r: 'ט־ו־ס', fr: 'voler (en avion)', em: '✈️', mots: [['טָס', 'il prend l’avion'], ['מָטוֹס', 'un avion'], ['טַיָּס', 'un pilote'], ['טִיסָה', 'un vol']] },
  { id: 'shal', r: 'ש־א־ל', fr: 'demander', em: '❓', mots: [['שָׁאַל', 'il a demandé'], ['שְׁאֵלָה', 'une question'], ['שְׁאֵלוֹן', 'un questionnaire'], ['שׁוֹאֵל', 'il demande']] },
  { id: 'zkhr', r: 'ז־כ־ר', fr: 'se souvenir', em: '🧠', mots: [['זָכַר', 'il s’est souvenu'], ['זִכָּרוֹן', 'la mémoire'], ['מַזְכִּירָה', 'une secrétaire'], ['מַזְכֶּרֶת', 'un souvenir (objet)'], ['לְהַזְכִּיר', 'rappeler']] },
  { id: 'hshv', r: 'ח־ש־ב', fr: 'penser, compter', em: '💭', mots: [['חָשַׁב', 'il a pensé'], ['מַחְשֵׁב', 'un ordinateur'], ['חֶשְׁבּוֹן', 'l’addition (au restaurant)'], ['חָשׁוּב', 'important'], ['מַחֲשָׁבָה', 'une pensée']] },
  { id: 'dbr', r: 'ד־ב־ר', fr: 'parler', em: '🗣️', mots: [['דִּבֵּר', 'il a parlé'], ['דָּבָר', 'une chose'], ['דִּבּוּר', 'la parole'], ['דּוֹבֵר', 'un porte-parole']] },
  { id: 'shir', r: 'ש־י־ר', fr: 'chanter', em: '🎵', mots: [['שָׁר', 'il chante'], ['שִׁיר', 'une chanson'], ['שִׁירִים', 'des chansons'], ['שִׁירָה', 'la poésie']] },
  { id: 'shlm', r: 'ש־ל־ם', fr: 'complet, paix', em: '🕊️', mots: [['שָׁלוֹם', 'la paix, bonjour'], ['שָׁלֵם', 'entier'], ['שִׁלֵּם', 'il a payé'], ['תַּשְׁלוּם', 'un paiement'], ['מֻשְׁלָם', 'parfait']] },
  { id: 'gdl', r: 'ג־ד־ל', fr: 'grand, grandir', em: '🌳', mots: [['גָּדוֹל', 'grand'], ['גָּדַל', 'il a grandi'], ['גֹּדֶל', 'la taille'], ['מִגְדָּל', 'une tour'], ['לְגַדֵּל', 'élever, faire pousser']] },
  { id: 'hdsh', r: 'ח־ד־ש', fr: 'nouveau', em: '✨', mots: [['חָדָשׁ', 'nouveau'], ['חֹדֶשׁ', 'un mois'], ['חֲדָשׁוֹת', 'les informations (actualités)'], ['חִדּוּשׁ', 'une nouveauté'], ['לְחַדֵּשׁ', 'renouveler']] },
  { id: 'yshv', r: 'י־ש־ב', fr: 's’asseoir, habiter', em: '🪑', mots: [['יָשַׁב', 'il s’est assis'], ['יְשִׁיבָה', 'une réunion'], ['מוֹשָׁב', 'un siège'], ['תּוֹשָׁב', 'un habitant'], ['יִשּׁוּב', 'une localité']] },
  { id: 'sgr', r: 'ס־ג־ר', fr: 'fermer', em: '🔒', mots: [['סָגַר', 'il a fermé'], ['סָגוּר', 'fermé'], ['סֶגֶר', 'un confinement'], ['מִסְגֶּרֶת', 'un cadre']] },
  { id: 'ptkh', r: 'פ־ת־ח', fr: 'ouvrir', em: '🔑', mots: [['פָּתַח', 'il a ouvert'], ['פָּתוּחַ', 'ouvert'], ['פְּתִיחָה', 'une ouverture'], ['מַפְתֵּחַ', 'une clé']] },
  { id: 'azr', r: 'ע־ז־ר', fr: 'aider', em: '🤝', mots: [['עָזַר', 'il a aidé'], ['עֶזְרָה', 'l’aide'], ['עוֹזֵר', 'un assistant'], ['עוֹזֶרֶת', 'une assistante']] },
  { id: 'kna', r: 'ק־נ־ה', fr: 'acheter', em: '🛒', mots: [['קָנָה', 'il a acheté'], ['קְנִיָּה', 'un achat'], ['קוֹנֶה', 'un acheteur'], ['קַנְיוֹן', 'un centre commercial']] },
  { id: 'bna', r: 'ב־נ־ה', fr: 'construire', em: '🏗️', mots: [['בָּנָה', 'il a construit'], ['בִּנְיָן', 'un immeuble'], ['בְּנִיָּה', 'la construction'], ['מִבְנֶה', 'une structure']] },
  { id: 'mlkh', r: 'מ־ל־ך', fr: 'régner', em: '👑', mots: [['מֶלֶךְ', 'un roi'], ['מַלְכָּה', 'une reine'], ['מַמְלָכָה', 'un royaume'], ['מָלַךְ', 'il a régné']] },
  { id: 'hla', r: 'ח־ל־ה', fr: 'être malade', em: '🤒', mots: [['חוֹלֶה', 'malade'], ['חוֹלָה', 'malade (femme)'], ['מַחֲלָה', 'une maladie'], ['בֵּית חוֹלִים', 'un hôpital']] },
];

const RAC_FIN = { 'ך': 'כ', 'ם': 'מ', 'ן': 'נ', 'ף': 'פ', 'ץ': 'צ' };
const racBase = (c) => RAC_FIN[c] || c;
// Met en couleur les lettres de la racine dans le mot (on cherche de la fin vers le début ; une lettre faible absente est sautée)
function racSurligne(mot, r) {
  const lettres = r.split('־').map(racBase);
  const g = mot.normalize('NFD').match(/[א-ת][֑-ׇ]*|[^א-ת]/g) || [];
  const marque = g.map(() => false);
  let pos = g.length - 1;
  for (let j = lettres.length - 1; j >= 0; j--) {
    for (let k = pos; k >= 0; k--) if (racBase(g[k][0]) === lettres[j]) { marque[k] = true; pos = k - 1; break; }
  }
  return g.map((x, k) => (marque[k] ? `<b class="rac-l">${esc(x.normalize('NFC'))}</b>` : esc(x.normalize('NFC')))).join('');
}

function familles(id) {
  if (!S.racines || typeof S.racines !== 'object') S.racines = {};
  const R = RACINES.find((r) => r.id === id);
  if (!R) {
    const faites = RACINES.filter((r) => S.racines[r.id] !== undefined).length;
    app.innerHTML = `<div class="q-head"><a href="#/grammaire">← Grammaire</a><span>🌳 Familles de mots</span></div>
    <section class="rac-hero">
      <span class="he gr-hero-he" lang="he" dir="rtl">מִשְׁפְּחוֹת מִלִּים</span>
      <h2>Familles de mots</h2>
      <p>En hébreu, la plupart des mots sont bâtis sur une <b>racine</b> de trois lettres. Repère-la, et tu devineras le sens de mots que tu n’as jamais vus !</p>
      <div class="gr-chiffres"><span><b>${faites}</b> / ${RACINES.length} familles explorées</span></div>
    </section>
    <div class="rac-grille">${RACINES.map((r) => `<a class="rac-carte${S.racines[r.id] !== undefined ? ' faite' : ''}" href="#/grammaire/familles/${r.id}">
      <span class="rac-em">${r.em}</span><span class="he rac-r" lang="he" dir="rtl">${r.r}</span><b>${esc(r.fr)}</b>
      <small>${r.mots.length} mots${S.racines[r.id] !== undefined ? ` · ✓ ${S.racines[r.id]}/3` : ''}</small></a>`).join('')}</div>`;
    return;
  }
  const k = RACINES.indexOf(R), prec = RACINES[k - 1], suiv = RACINES[k + 1];
  const dejaVu = (he) => WORDS.some((w) => strip(w.he).normalize('NFC') === strip(he).normalize('NFC'));
  app.innerHTML = `<div class="q-head"><a href="#/grammaire/familles">← Toutes les familles</a><span>${R.em} ${esc(R.fr)}</span></div>
  <section class="rac-tete">
    <div class="rac-lettres" dir="rtl">${R.r.split('־').map((l) => `<span class="he" lang="he">${l}</span>`).join('')}</div>
    <h2>${esc(R.fr)}</h2>
    <p class="sub">Les trois lettres de la racine sont en couleur dans chaque mot. Écoute-les, et observe ce qui change autour.</p>
  </section>
  <div class="rac-mots">${R.mots.map(([he, fr]) => `<div class="rac-mot"><span class="he" lang="he" dir="rtl">${racSurligne(he, R.r)}</span><span class="rac-fr">${esc(fr)}${dejaVu(he) ? '<small>📚 déjà dans tes cartes</small>' : ''}</span>${sayBtn(he)}</div>`).join('')}</div>
  <section class="card rac-defi" id="racDefi"></section>
  <div class="row mt" style="justify-content:space-between">${prec ? `<a class="btn ghost" href="#/grammaire/familles/${prec.id}">← ${prec.em} ${esc(prec.fr)}</a>` : '<span></span>'}${suiv ? `<a class="btn ghost" href="#/grammaire/familles/${suiv.id}">${suiv.em} ${esc(suiv.fr)} →</a>` : '<span></span>'}</div>`;

  // Mini-défi : deux mots à comprendre, une racine à retrouver
  const autresSens = (fr) => shuffle(RACINES.filter((r) => r !== R).flatMap((r) => r.mots.map((m) => m[1]))).filter((x) => x !== fr);
  const [m1, m2, m3] = shuffle([...R.mots]);
  const qs = [
    { he: m1[0], q: 'Que veut dire ce mot ?', ok: m1[1], opts: shuffle([m1[1], ...autresSens(m1[1]).slice(0, 3)]) },
    { he: m2[0], q: 'Que veut dire ce mot ?', ok: m2[1], opts: shuffle([m2[1], ...autresSens(m2[1]).slice(0, 3)]) },
    { he: m3[0], q: 'Quelle est la racine de ce mot ?', ok: R.r, opts: shuffle([R.r, ...shuffle(RACINES.filter((r) => r !== R)).slice(0, 3).map((r) => r.r)]), racine: true },
  ];
  let n = 0, bonnes = 0;
  const zone = $('#racDefi');
  const montre = () => {
    if (n >= qs.length) {
      const premiere = S.racines[R.id] === undefined;
      S.racines[R.id] = Math.max(S.racines[R.id] || 0, bonnes); save();
      if (premiere) addXP(15);
      if (bonnes === qs.length) confetti();
      zone.innerHTML = `<div class="center"><div class="rac-res">${bonnes === qs.length ? '🌟' : bonnes ? '👍' : '🌱'}</div><h3>${bonnes} / ${qs.length}${premiere ? ' · +15 XP' : ''}</h3>
        <p class="sub">${bonnes === qs.length ? 'Parfait : tu as repéré la famille !' : 'Relis les mots en couleur, puis réessaie.'}</p>
        <div class="row" style="justify-content:center"><button type="button" class="btn ghost" id="racRejouer">Rejouer</button>${suiv ? `<a class="btn gold" href="#/grammaire/familles/${suiv.id}">Famille suivante →</a>` : '<a class="btn gold" href="#/grammaire/familles">Toutes les familles</a>'}</div></div>`;
      $('#racRejouer').onclick = () => familles(R.id);
      return;
    }
    const q = qs[n];
    zone.innerHTML = `<div class="q-head"><span>🎯 Petit défi</span><span>${n + 1}/${qs.length}</span></div>
      <p class="center"><b>${q.q}</b></p>
      <div class="rac-q"><span class="he" lang="he" dir="rtl">${esc(q.he)}</span>${sayBtn(q.he)}</div>
      <div class="opts">${q.opts.map((o, j) => `<button type="button" class="opt${q.racine ? ' he' : ''}" data-j="${j}"${q.racine ? ' lang="he" dir="rtl"' : ''}>${esc(o)}</button>`).join('')}</div>
      <p class="center hint" id="racFb">&nbsp;</p>`;
    let fini = false;
    $$('#racDefi .opt').forEach((b) => (b.onclick = () => {
      if (fini) return; fini = true;
      const ok = q.opts[+b.dataset.j] === q.ok;
      $$('#racDefi .opt').forEach((x) => { x.disabled = true; if (q.opts[+x.dataset.j] === q.ok) x.classList.add('ok'); });
      if (ok) { bonnes++; lucioles(b); } else b.classList.add('ko');
      $('#racFb').innerHTML = `${ok ? '✅ Bravo !' : '❌ Pas tout à fait.'} <span class="he" lang="he" dir="rtl">${racSurligne(q.he, R.r)}</span> : ${esc(R.mots.find((m) => m[0] === q.he)[1])} <button type="button" class="btn" id="racSuite">Suite →</button>`;
      $('#racSuite').onclick = () => { n++; montre(); };
    }));
  };
  montre();
}
