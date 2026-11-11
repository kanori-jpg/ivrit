'use strict';
/* ============ Le voyage en Israël ============
   Chaque contrôle de grammaire réussi débloque une étape, du nord au sud.
   S.voyage[k] = date à laquelle l'étape k a été atteinte. */
const VOYAGE = [
  { id: 'haifa', lieu: 'Haïfa', he: 'חֵיפָה', tr: 'heifa', em: '🚡', x: 97, y: 82, lab: 'gauche', ciel: ['#ffd9a8', '#9fd4e8'], deco: '🌿 ⚓ 🌳',
    fait: 'Accrochée au mont Carmel, Haïfa descend jusqu’à la mer par des jardins en terrasses. Juifs et Arabes y vivent côte à côte, et la ville a un métro qui grimpe la montagne : le Carmelit.',
    mots: [['הַר', 'har', 'montagne'], ['גַּן', 'gan', 'jardin'], ['נָמָל', 'namal', 'port'], ['נוֹף', 'nof', 'paysage, vue']],
    phrase: { he: 'אֵיזֶה נוֹף יָפֶה!', tr: 'eize nof yafe', fr: 'quel beau paysage !' } },
  { id: 'tiberiade', lieu: 'Tibériade', he: 'טְבֶרְיָה', tr: 'tverya', em: '⛵', x: 152, y: 84, lab: 'haut', ciel: ['#c9e8ff', '#7fc4c9'], deco: '🐟 🌊 🌾',
    fait: 'Au bord du lac de Tibériade, la כִּנֶּרֶת, le plus grand lac d’eau douce d’Israël. Selon la tradition, son nom viendrait de כִּנּוֹר, la harpe, à cause de sa forme.',
    mots: [['אֲגַם', 'agam', 'lac'], ['דָּג', 'dag', 'poisson'], ['סִירָה', 'sira', 'barque, bateau'], ['חוֹף', 'khof', 'plage, rivage']],
    phrase: { he: 'הַמַּיִם חַמִּים!', tr: 'hamayim khamim', fr: 'l’eau est chaude !' } },
  { id: 'cesaree', lieu: 'Césarée', he: 'קֵיסָרְיָה', tr: 'keisarya', em: '🏛️', x: 84, y: 122, ciel: ['#ffe2c2', '#8ec5e6'], deco: '🌊 🏺 🐚',
    fait: 'Le roi Hérode y a fait construire un grand port romain. On y voit encore un théâtre, un hippodrome et un aqueduc qui longe la plage.',
    mots: [['תֵּאַטְרוֹן', 'te’atron', 'théâtre'], ['עַתִּיק', 'atik', 'ancien, antique'], ['חוֹל', 'khol', 'sable'], ['גַּל', 'gal', 'vague']],
    phrase: { he: 'זֶה מָקוֹם עַתִּיק מְאוֹד', tr: 'ze makom atik me’od', fr: 'c’est un lieu très ancien' } },
  { id: 'telaviv', lieu: 'Tel-Aviv', he: 'תֵּל אָבִיב', tr: 'tel aviv', em: '🏖️', x: 72, y: 172, ciel: ['#fff1c9', '#6ec3ea'], deco: '🚲 ☕ 🏢',
    fait: 'La « Ville blanche » : des milliers d’immeubles de style Bauhaus, inscrits au patrimoine mondial de l’UNESCO, et une longue promenade le long de la mer, la טַיֶּלֶת.',
    mots: [['יָם', 'yam', 'mer'], ['אוֹפַנַּיִם', 'ofanayim', 'vélo'], ['בֵּית קָפֶה', 'beit kafe', 'café (le lieu)'], ['טַיֶּלֶת', 'tayelet', 'promenade du bord de mer']],
    phrase: { he: 'נִפָּגֵשׁ בַּחוֹף?', tr: 'nipagesh bakhof', fr: 'on se retrouve à la plage ?' } },
  { id: 'jerusalem', lieu: 'Jérusalem', he: 'יְרוּשָׁלַיִם', tr: 'yeroushalayim', em: '🌅', x: 121, y: 216, ciel: ['#ffcf8a', '#c99ad1'], deco: '🧱 🫒 🕊️',
    fait: 'Presque tous les bâtiments y sont couverts de « pierre de Jérusalem », d’un blanc doré : au coucher du soleil, toute la ville s’illumine. La vieille ville est entourée de remparts.',
    mots: [['אֶבֶן', 'even', 'pierre'], ['חוֹמָה', 'khoma', 'rempart'], ['שׁוּק', 'shouk', 'marché'], ['עִיר', 'ir', 'ville']],
    phrase: { he: 'שַׁבָּת שָׁלוֹם!', tr: 'shabat shalom', fr: 'bon shabbat !' } },
  { id: 'mermorte', lieu: 'La mer Morte', he: 'יַם הַמֶּלַח', tr: 'yam hamelakh', em: '🧂', x: 147, y: 262, ciel: ['#ffe6b8', '#b8d8d4'], deco: '🏜️ ☀️ 🪨',
    fait: 'Le point le plus bas de la Terre, à plus de 400 mètres sous le niveau de la mer. L’eau est si salée qu’on y flotte sans effort ! En hébreu, c’est la « mer du sel ».',
    mots: [['מֶלַח', 'melakh', 'sel'], ['מִדְבָּר', 'midbar', 'désert'], ['בֹּץ', 'bots', 'boue'], ['לָצוּף', 'latsouf', 'flotter']],
    phrase: { he: 'אֲנִי צָפָה!', tr: 'ani tsafa', fr: 'je flotte ! (femme)' } },
  { id: 'eilat', lieu: 'Eilat', he: 'אֵילַת', tr: 'eilat', em: '🐠', x: 92, y: 500, ciel: ['#ffd0a6', '#4fb3d9'], deco: '🪸 🤿 ☀️',
    fait: 'Tout au sud, sur la mer Rouge : des récifs de coraux à quelques mètres de la plage, et du soleil presque toute l’année. Fin du voyage… ou début des vacances !',
    mots: [['אַלְמֹג', 'almog', 'corail'], ['צְלִילָה', 'tslila', 'plongée'], ['שֶׁמֶשׁ', 'shemesh', 'soleil'], ['מָלוֹן', 'malon', 'hôtel']],
    phrase: { he: 'הִגַּעְנוּ!', tr: 'higanou', fr: 'on est arrivés !' } },
];

// Les étapes atteintes : on note la date la première fois qu'un contrôle est réussi
function majVoyage() {
  if (!S.voyage) S.voyage = {};
  const nouvelles = [];
  VOYAGE.forEach((v, k) => { if (S.controles && S.controles[k] && S.controles[k].reussi && !S.voyage[k]) { S.voyage[k] = dayKey(); nouvelles.push(v); } });
  if (nouvelles.length) save();
  return nouvelles;
}
majVoyage();
const etapesAtteintes = () => VOYAGE.filter((v, k) => S.voyage && S.voyage[k]).length;

// Une silhouette stylisée du pays, de la Méditerranée au Jourdain (ce n'est pas une carte exacte)
const VOYAGE_TERRE = 'M99 44 L118 30 L166 19 L190 40 L191 68 L170 95 L162 140 L160 175 L162 220 L163 262 L160 330 L140 380 L115 445 L94 504 L85 510 L60 440 L36 360 L15 277 L41 238 L58 205 L71 172 L80 140 L87 108 L96 78 L106 68 Z';

function voyage(choix) {
  const nouvelles = majVoyage();
  const atteintes = etapesAtteintes();
  const prochaine = VOYAGE.findIndex((v, k) => !S.voyage[k]);
  let sel = VOYAGE.findIndex((v) => v.id === choix);
  if (sel < 0) sel = prochaine >= 0 ? prochaine : VOYAGE.length - 1;
  const chemin = VOYAGE.map((v) => `${v.x},${v.y}`).join(' ');
  const fait = VOYAGE.slice(0, Math.max(1, atteintes)).map((v) => `${v.x},${v.y}`).join(' ');
  const v = VOYAGE[sel], atteinte = !!S.voyage[sel], partie = GRAMMAIRE_PARTIES[sel], c = (S.controles || {})[sel];
  const faites = partie ? partie.ids.filter((id) => S.grammaire[id]).length : 0;
  const date = atteinte ? new Date(S.voyage[sel] + 'T00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
  app.innerHTML = `<section class="vy-hero">
    <div><span class="he gr-hero-he" lang="he" dir="rtl">הַמַּסָּע שֶׁלִּי</span><h2>Mon voyage en Israël</h2>
    <p>Chaque contrôle de grammaire réussi te fait avancer d’une étape, du nord au sud.</p>
    <div class="gr-chiffres"><span>🧳 <b>${atteintes}</b> / ${VOYAGE.length} étapes</span><span>${prochaine >= 0 ? `Prochaine : <b>${VOYAGE[prochaine].lieu}</b>` : '🎉 Voyage terminé !'}</span></div></div>
  </section>
  ${nouvelles.length ? `<div class="card vy-nouveau">🎉 Nouvelle étape : <b>${nouvelles.map((n) => n.lieu).join(', ')}</b> ! Découvre ${nouvelles.length > 1 ? 'ces villes' : 'cette ville'} ci-dessous.</div>` : ''}
  <div class="vy-grille">
    <div class="card vy-carte">
      <svg viewBox="0 0 210 530" role="img" aria-label="Carte du voyage en Israël">
        <defs><linearGradient id="vyMer" x1="0" x2="1"><stop offset="0" stop-color="var(--vy-mer1)"/><stop offset="1" stop-color="var(--vy-mer2)"/></linearGradient></defs>
        <rect x="0" y="0" width="210" height="530" rx="18" fill="url(#vyMer)"/>
        <path d="${VOYAGE_TERRE}" class="vy-terre"/>
        <ellipse cx="163" cy="80" rx="6" ry="10" class="vy-lac"/><ellipse cx="152" cy="255" rx="5" ry="24" class="vy-lac"/>
        <text x="22" y="120" class="vy-mer-nom">Méditerranée</text>
        <polyline points="${chemin}" class="vy-chemin"/>
        ${atteintes ? `<polyline points="${fait}" class="vy-chemin fait"/>` : ''}
        ${VOYAGE.map((e, k) => `<a href="#/voyage/${e.id}" class="vy-pt${S.voyage[k] ? ' ok' : ''}${k === prochaine ? ' prochaine' : ''}${k === sel ? ' sel' : ''}" aria-label="${esc(e.lieu)}">
          <circle cx="${e.x}" cy="${e.y}" r="${k === sel ? 11 : 8}"/><text x="${e.x}" y="${e.y + 4}" class="vy-em">${S.voyage[k] ? e.em : k === prochaine ? '📍' : '🔒'}</text>
          <text x="${e.lab === 'haut' ? e.x : e.lab === 'gauche' || e.x > 140 ? e.x - 14 : e.x + 14}" y="${e.lab === 'haut' ? e.y - 15 : e.y + 4}" class="vy-nom" text-anchor="${e.lab === 'haut' ? 'middle' : e.lab === 'gauche' || e.x > 140 ? 'end' : 'start'}">${esc(e.lieu)}</text></a>`).join('')}
      </svg>
    </div>
    <article class="card vy-ville${atteinte ? '' : ' fermee'}">
      <div class="vy-scene" style="--c1:${v.ciel[0]};--c2:${v.ciel[1]}"><span class="vy-scene-em">${v.em}</span><span class="vy-scene-deco">${v.deco}</span><span class="vy-etape">Étape ${sel + 1}</span></div>
      <h3>${esc(v.lieu)} <span class="he" lang="he" dir="rtl">${esc(v.he)}</span> ${sayBtn(v.he)}</h3>
      ${atteinte ? `<p class="hint">Atteinte le ${date} grâce au contrôle « ${esc(partie.titre)} »</p>
      <p>${v.fait.replace(/([א-ת][א-ת֑-ׇ]*)/g, '<span class="he" lang="he" dir="rtl">$1</span>')}</p>
      <div class="cap">Le vocabulaire du lieu</div>
      <div class="vy-mots">${v.mots.map(([h, t, f]) => `<div class="vy-mot">${HE(h)}<small>${TRS(t)}${esc(f)}</small>${sayBtn(h)}</div>`).join('')}</div>
      <div class="vy-phrase">${HE(v.phrase.he)} ${sayBtn(v.phrase.he)}<small>${TRS(v.phrase.tr)}${esc(v.phrase.fr)}</small></div>
      <p><button class="btn" id="vyMots" type="button">⭐ Ajouter ces mots à mes mots à apprendre</button></p>`
      : `<p>🔒 Pour atteindre ${esc(v.lieu)}, réussis le contrôle de la partie <b>${partie ? `${partie.em} ${esc(partie.titre)}` : ''}</b> (${CONTROLE_SEUIL} bonnes réponses sur ${CONTROLE_NB}).</p>
      <p class="hint">${faites}/${partie ? partie.ids.length : 0} leçons faites dans cette partie${c ? ` · meilleur score au contrôle : ${c.best}/${CONTROLE_NB}` : ''}</p>
      <p class="vy-teaser">${v.deco} Ce qui t’attend : ${v.mots.length} mots du lieu, une anecdote et une phrase à dire en arrivant.</p>
      <p><a class="btn gold" href="#/grammaire/controle/${sel}">📝 Passer le contrôle</a> <a class="btn ghost" href="#/grammaire">Voir les leçons</a></p>`}
      <div class="row vy-nav">${sel > 0 ? `<a class="btn ghost" href="#/voyage/${VOYAGE[sel - 1].id}">← ${esc(VOYAGE[sel - 1].lieu)}</a>` : '<span></span>'}${sel < VOYAGE.length - 1 ? `<a class="btn ghost" href="#/voyage/${VOYAGE[sel + 1].id}">${esc(VOYAGE[sel + 1].lieu)} →</a>` : '<span></span>'}</div>
    </article>
  </div>`;
  if (nouvelles.length) confetti();
  if ($('#vyMots')) {
    const majBouton = () => { const reste = v.mots.filter(([h]) => !estDansMesMots(h) && !WORDS.some((w) => NFC(w.he) === NFC(h))); $('#vyMots').disabled = !reste.length; if (!reste.length) $('#vyMots').textContent = '✓ Ces mots sont déjà dans ton vocabulaire'; return reste; };
    majBouton();
    $('#vyMots').onclick = () => { const reste = majBouton(); reste.forEach(([h, t, f]) => ajouterMesMots([NFC(h), t, f])); toast(`⭐ ${reste.length} mot${reste.length > 1 ? 's' : ''} ajouté${reste.length > 1 ? 's' : ''} à tes mots à apprendre`); majBouton(); };
  }
}
routes.voyage = voyage;
// Ce fichier est chargé après le premier affichage : si on arrive directement sur #/voyage, on affiche la page
if (/^#\/voyage/.test(location.hash) && typeof route === 'function') route();
// L'accueil parle aussi du voyage : on le redessine maintenant que tout est chargé
if ((location.hash === '' || location.hash === '#/') && typeof route === 'function') route();
