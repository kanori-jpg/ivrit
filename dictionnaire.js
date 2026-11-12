/* ============ Dictionnaire : tous les mots, de א à ת ============ */
const DICO_ORDRE = 'אבגדהוזחטיכלמנסעפצקרשת';
const DICO_FIN = { 'ך': 'כ', 'ם': 'מ', 'ן': 'נ', 'ף': 'פ', 'ץ': 'צ' };
const dicoCle = (he) => [...strip(he).normalize('NFC')].map((c) => DICO_FIN[c] || c).filter((c) => DICO_ORDRE.includes(c)).join('');
const dicoFrCle = (fr) => fr.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/œ/g, 'oe').replace(/æ/g, 'ae').replace(/^[^a-z0-9]+/, '').replace(/^((le|la|les|un|une|des|du|de la)\s+|l['’])/, '').replace(/^[^a-z0-9]+/, '').trim();
const dicoNorm = (s) => s.normalize('NFD').replace(/[̀-֑ͯ-ׇ]/g, '').toLowerCase();
let dicoEtat = { tous: false, tri: 'he', q: '', cat: 'mot' };

// Trois dictionnaires : les mots (y compris les mots composés comme בֵּית סֵפֶר), les expressions toutes faites, les phrases
const DICO_EXPRESSIONS = new Set(['תּוֹדָה רַבָּה', 'בֹּקֶר טוֹב', 'עֶרֶב טוֹב', 'לַיְלָה טוֹב', 'צָהֳרַיִם טוֹבִים', 'מַה נִּשְׁמָע?', 'מַה שְּׁלוֹמְךָ?', 'מַה שְּׁלוֹמֵךְ?',
  'אֲנִי בְּסֵדֶר', 'קוֹרְאִים לִי', 'נָעִים מְאוֹד', 'מַה זֶּה?', 'אֵין בְּעָיָה', 'לֹא נוֹרָא', 'מַזָּל טוֹב', 'שַׁבָּת שָׁלוֹם', 'בָּרוּךְ הַבָּא',
  'יֵשׁ לִי', 'אֵין לִי', 'נִתְרָאֶה שׁוּב מָחָר', 'מַה קּוֹרֶה?', 'מָה הָעִנְיָנִים?', 'מְזֻמָּן בִּלְבַד', 'שָׁנָה טוֹבָה'].map((s) => s.normalize('NFC')));
const DICO_PRONOMS = /(^|\s)(אֲנִי|אַתָּה|אַתְּ|הוּא|הִיא|אֲנַחְנוּ|אַתֶּם|אַתֶּן|הֵם|הֵן)(\s|$)/;
const DICO_CATS = [['mot', '📗', 'Mots'], ['expr', '💬', 'Expressions'], ['phrase', '📝', 'Phrases']];
// Le rangement choisi à la main (bouton ⇄) l'emporte : S.dicoCat[mot] = 'mot' | 'expr' | 'phrase'
function dicoCatAuto(w) {
  const he = w.he.normalize('NFC').trim();
  if (DICO_EXPRESSIONS.has(he)) return 'expr';
  if (w.theme === 'parle' && /\s/.test(he)) return 'expr'; // l'hébreu parlé : les tournures de plusieurs mots sont des expressions
  if (!/\s/.test(he)) return 'mot';
  // Plusieurs mots : une question, une virgule, un pronom sujet ou trois mots et plus, c'est une phrase ; sinon un mot composé
  return /[?!,.]/.test(he) || DICO_PRONOMS.test(he.normalize('NFC')) || he.split(/\s+/).length >= 3 ? 'phrase' : 'mot';
}
function dicoCat(w) {
  const choix = S.dicoCat && S.dicoCat[w.he.normalize('NFC').trim()];
  return DICO_CATS.some((c) => c[0] === choix) ? choix : dicoCatAuto(w);
}
function dicoDeplacer(he, cat) {
  const k = he.normalize('NFC').trim(), w = WORDS.find((x) => x.he.normalize('NFC').trim() === k);
  if (!S.dicoCat) S.dicoCat = {};
  if (w && dicoCatAuto(w) === cat) delete S.dicoCat[k]; else S.dicoCat[k] = cat;
  save();
}

function dictionnaire() {
  const vus = new Set();
  const tousMots = WORDS.filter((w) => { const k = w.he.normalize('NFC'); if (vus.has(k)) return false; vus.add(k); return true; });
  const parCat = {}; DICO_CATS.forEach(([c]) => (parCat[c] = tousMots.filter((w) => dicoCat(w) === c)));
  const cat = DICO_CATS.find((c) => c[0] === dicoEtat.cat) || DICO_CATS[0];
  const mots = parCat[cat[0]];
  const appris = mots.filter((w) => S.cards[w.he]);
  const fem = cat[0] === 'mot' ? '' : 'e';
  const unite = { mot: ['mot', 'mots'], expr: ['expression', 'expressions'], phrase: ['phrase', 'phrases'] }[cat[0]];
  const maitrises = appris.filter((w) => (S.cards[w.he].box || 0) >= 3).length;
  const niveau = (w) => { const c = S.cards[w.he]; if (!c) return ['nv', 'pas encore vu']; if ((c.box || 0) >= 3) return ['ok', 'maîtrisé']; return ['ec', 'en cours']; };
  const theme = (w) => THEMES.find((t) => t.id === w.theme);
  app.innerHTML = `<section class="dico-hero">
    <div><span class="he gr-hero-he" lang="he" dir="rtl">מִלּוֹן</span><h2>Dictionnaire</h2>
    <p>Tout ce que tu as appris, rangé de א à ת, en trois dictionnaires : les mots, les expressions et les phrases. Touche une entrée pour l’écouter.</p>
    <div class="gr-chiffres"><span><b>${appris.length}</b> ${unite[appris.length > 1 ? 1 : 0]} appris${fem}${appris.length > 1 && fem ? 's' : ''}</span><span><b>${maitrises}</b> maîtrisé${fem}${maitrises > 1 ? 's' : ''}</span><span><b>${mots.length}</b> dans le site</span></div></div>
    <div class="dico-livre" aria-hidden="true"><span class="he" lang="he">א</span><span class="he" lang="he">ת</span></div>
  </section>
  <div class="dico-cats" role="tablist" aria-label="Quel dictionnaire">${DICO_CATS.map(([c, em, nom]) => `<button type="button" role="tab" data-cat="${c}" aria-selected="${c === cat[0]}" class="${c === cat[0] ? 'on' : ''}">${em} ${nom}<small>${parCat[c].filter((w) => S.cards[w.he]).length} / ${parCat[c].length}</small></button>`).join('')}</div>
  <div class="dico-outils">
    <input type="search" id="dicoQ" class="gr-cherche" placeholder="🔍 Chercher, en français ou en hébreu…" aria-label="Chercher dans le dictionnaire" value="${esc(dicoEtat.q)}">
    <div class="dico-bascules">
      <div class="dico-choix" role="group" aria-label="Quels mots"><button type="button" data-tous="0">Appris</button><button type="button" data-tous="1">Tout le site</button></div>
      <div class="dico-choix" role="group" aria-label="Ordre"><button type="button" data-tri="he">א → ת</button><button type="button" data-tri="fr">A → Z</button></div>
    </div>
  </div>
  <nav class="dico-saut" id="dicoSaut" aria-label="Aller à une lettre"></nav>
  <div id="dicoListe"></div>`;

  const rendre = () => {
    $$('[data-tous]').forEach((b) => b.classList.toggle('on', (b.dataset.tous === '1') === dicoEtat.tous));
    $$('[data-tri]').forEach((b) => b.classList.toggle('on', b.dataset.tri === dicoEtat.tri));
    const q = dicoNorm(dicoEtat.q.trim());
    let liste = (dicoEtat.tous ? mots : appris).filter((w) => !q || dicoNorm(w.he).includes(q) || dicoNorm(w.fr).includes(q) || dicoNorm(w.tr || '').includes(q));
    const he = dicoEtat.tri === 'he';
    liste = liste.map((w) => ({ w, k: he ? dicoCle(w.he) : dicoFrCle(w.fr) })).sort((a, b) => (he ? (a.k < b.k ? -1 : a.k > b.k ? 1 : 0) : a.k.localeCompare(b.k, 'fr')));
    const groupes = [];
    liste.forEach(({ w, k }) => {
      const l = he ? k[0] || '·' : (k[0] || '·').toUpperCase();
      if (!groupes.length || groupes[groupes.length - 1].l !== l) groupes.push({ l, mots: [] });
      groupes[groupes.length - 1].mots.push(w);
    });
    $('#dicoSaut').innerHTML = groupes.length > 3 ? groupes.map((g, i) => `<a href="#" data-g="${i}" class="${he ? 'he' : ''}"${he ? ' lang="he"' : ''}>${esc(g.l)}</a>`).join('') : '';
    $('#dicoSaut').dir = he ? 'rtl' : 'ltr';
    if (!liste.length) {
      $('#dicoListe').innerHTML = `<div class="card dico-vide"><div class="em">${q ? '🔎' : '📕'}</div>${q ? `<p>Rien ne correspond à ta recherche dans les ${esc(cat[2].toLowerCase())}.</p>` : `<p>Ce dictionnaire est encore vide : les ${unite[1]} s’y ajoutent dès que tu les vois dans les cartes mémoire ou la séance du jour.</p><p><a class="btn gold" href="#/seance">Faire ma séance du jour</a> <button type="button" class="btn ghost" id="dicoTout">Voir tout le site</button></p>`}</div>`;
      if ($('#dicoTout')) $('#dicoTout').onclick = () => { dicoEtat.tous = true; rendre(); };
      return;
    }
    $('#dicoListe').innerHTML = groupes.map((g, i) => `<section class="dico-groupe" id="dicoG${i}">
      <h3 class="dico-lettre${he ? ' he' : ''}"${he ? ' lang="he"' : ''}>${esc(g.l)}<small>${g.mots.length}</small></h3>
      <div class="dico-mots">${g.mots.map((w) => { const [c, t] = niveau(w); const th = theme(w); return `<div class="dico-case"><button type="button" class="dico-mot" data-say="${esc(w.he)}">
        <span class="he" lang="he" dir="rtl">${esc(w.he)}</span>
        <span class="dico-fr"><b>${esc(w.fr)}</b><small>${esc(w.tr || '')}${th ? ` · ${th.emoji} ${esc(th.name)}` : ''}</small></span>
        <span class="dico-niv ${c}" title="${t}"><i></i>${t}</span></button><button type="button" class="dico-deplacer" data-he="${esc(w.he)}" aria-label="Changer de dictionnaire" title="Changer de dictionnaire">⇄</button></div>`; }).join('')}</div></section>`).join('');
  };
  $('#dicoQ').oninput = (e) => { dicoEtat.q = e.target.value; rendre(); };
  $$('[data-cat]').forEach((b) => (b.onclick = () => { dicoEtat.cat = b.dataset.cat; dictionnaire(); }));
  // ⇄ : ranger l'entrée dans un autre dictionnaire
  $('#dicoListe').addEventListener('click', (ev) => {
    const d = ev.target.closest('.dico-deplacer'), v = ev.target.closest('[data-vers]'), a = ev.target.closest('.dico-dep-annuler');
    if (d) {
      ev.stopPropagation();
      $$('.dico-dep').forEach((x) => x.remove());
      const he = d.dataset.he, ici = cat[0];
      d.closest('.dico-case').insertAdjacentHTML('beforeend', `<div class="dico-dep"><span>Ranger dans :</span>${DICO_CATS.filter((c) => c[0] !== ici).map(([c, em, nom]) => `<button type="button" data-vers="${c}" data-he="${esc(he)}">${em} ${nom}</button>`).join('')}<button type="button" class="dico-dep-annuler">annuler</button></div>`);
    } else if (v) {
      const y = window.scrollY, nom = DICO_CATS.find((c) => c[0] === v.dataset.vers)[2];
      dicoDeplacer(v.dataset.he, v.dataset.vers);
      dictionnaire(); window.scrollTo(0, y);
      toast(`⇄ Rangé dans les ${nom.toLowerCase()}`);
    } else if (a) a.closest('.dico-dep').remove();
  });
  $$('[data-tous]').forEach((b) => (b.onclick = () => { dicoEtat.tous = b.dataset.tous === '1'; rendre(); }));
  $$('[data-tri]').forEach((b) => (b.onclick = () => { dicoEtat.tri = b.dataset.tri; rendre(); }));
  $('#dicoSaut').onclick = (e) => {
    const a = e.target.closest('[data-g]'); if (!a) return;
    e.preventDefault();
    const s = $('#dicoG' + a.dataset.g);
    if (s) s.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  };
  if (!appris.length && !dicoEtat.q) dicoEtat.tous = dicoEtat.tous || false;
  rendre();
}
routes.dictionnaire = dictionnaire;
