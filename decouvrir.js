'use strict';
/* ============ Découvrir Israël : la carte (#/carte-israel), les recettes de Savta (#/recettes) et le quiz d'Israël (#/israel) ============ */
(() => {
  /* ====================== 1. La carte ====================== */
  // Les lieux du site, avec leurs vraies coordonnées, et ce qui s'y passe (chapitres, villes, voyage, feuilleton)
  const LIEUX = [
    { id: 'telaviv', fr: 'Tel-Aviv', he: 'תֵּל אָבִיב', lat: 32.08, lon: 34.78, info: 'Fondée en 1909 sur les dunes, « la ville blanche » compte des milliers d’immeubles de style Bauhaus.', liens: [{ chap: 'noa' }, { voyage: 3 }] },
    { id: 'jaffa', fr: 'Jaffa', he: 'יָפוֹ', lat: 32.05, lon: 34.75, info: 'L’un des plus vieux ports du monde, aujourd’hui un quartier de Tel-Aviv.', liens: [{ ville: 'vjaffa' }, { feuil: [4, 5, 9, 16] }], decale: [-1, 1] },
    { id: 'jerusalem', fr: 'Jérusalem', he: 'יְרוּשָׁלַיִם', lat: 31.77, lon: 35.21, info: 'Des remparts de pierre dorée entourent sa vieille ville, sur les collines de Judée.', liens: [{ chap: 'shouk' }, { ville: 'vjerusalem' }, { voyage: 4 }, { feuil: [6] }] },
    { id: 'haifa', fr: 'Haïfa', he: 'חֵיפָה', lat: 32.79, lon: 34.99, info: 'Un grand port au pied du mont Carmel et de ses jardins en terrasses.', liens: [{ chap: 'gueshem' }, { ville: 'vhaifa' }, { voyage: 0 }] },
    { id: 'akko', fr: 'Akko', he: 'עַכּוֹ', lat: 32.93, lon: 35.08, info: 'Une ville de croisés aux remparts plongeant dans la mer, classée par l’UNESCO.', liens: [{ ville: 'vakko' }, { feuil: [10] }] },
    { id: 'netanya', fr: 'Netanya', he: 'נְתַנְיָה', lat: 32.33, lon: 34.86, info: 'De longues plages au pied de falaises, au bord de la Méditerranée.', liens: [{ ville: 'vnetanya' }] },
    { id: 'cesaree', fr: 'Césarée', he: 'קֵיסָרְיָה', lat: 32.50, lon: 34.89, info: 'Un théâtre et un aqueduc romains au bord de la mer.', liens: [{ ville: 'vcesaree' }, { voyage: 2 }, { feuil: [11] }] },
    { id: 'tsippori', fr: 'Tsippori', he: 'צִפּוֹרִי', lat: 32.75, lon: 35.28, info: 'Célèbre pour ses mosaïques romaines, dont un visage surnommé « la Joconde de Galilée ».', liens: [{ chap: 'tsippori' }] },
    { id: 'tiberiade', fr: 'Tibériade', he: 'טְבֶרְיָה', lat: 32.79, lon: 35.53, info: 'Au bord du lac de Tibériade, le grand lac d’eau douce du pays.', liens: [{ ville: 'vtiberiade' }, { voyage: 1 }] },
    { id: 'safed', fr: 'Safed', he: 'צְפַת', lat: 32.96, lon: 35.50, info: '« La ville bleue », perchée dans les montagnes de Galilée.', liens: [{ ville: 'vtsfat' }] },
    { id: 'roshpina', fr: 'Rosh Pina', he: 'רֹאשׁ פִּנָּה', lat: 33.02, lon: 35.56, info: 'Un village de pierre fondé en 1882, l’un des tout premiers du pays.', liens: [{ ville: 'vroshpina' }], decale: [1, -1] },
    { id: 'eingedi', fr: 'Ein Guedi', he: 'עֵין גֶּדִי', lat: 31.46, lon: 35.39, info: 'Une oasis avec des cascades et des bouquetins, au-dessus de la mer Morte.', liens: [{ chap: 'eingedi' }] },
    { id: 'mermorte', fr: 'La mer Morte', he: 'יַם הַמֶּלַח', lat: 31.30, lon: 35.42, info: 'L’endroit le plus bas du monde, si salé qu’on y flotte sans nager.', liens: [{ voyage: 5 }] },
    { id: 'beersheva', fr: 'Be’er Sheva', he: 'בְּאֵר שֶׁבַע', lat: 31.25, lon: 34.79, info: 'La capitale du Néguev, une ville d’étudiants au bord du désert.', liens: [{ ville: 'vbeersheva' }, { feuil: [12] }] },
    { id: 'mitspe', fr: 'Mitspé Ramon', he: 'מִצְפֵּה רָמוֹן', lat: 30.61, lon: 34.80, info: 'Au bord du cratère Ramon, long d’environ quarante kilomètres.', liens: [{ ville: 'vmitspe' }, { feuil: [13] }] },
    { id: 'eilat', fr: 'Eilat', he: 'אֵילַת', lat: 29.56, lon: 34.95, info: 'Tout au sud, entre les montagnes rouges et les coraux de la mer Rouge.', liens: [{ ville: 'veilat' }, { voyage: 6 }, { feuil: [14] }] },
  ];
  // Un contour simplifié de la région, du Liban à la mer Rouge
  const CONTOUR = [[33.09, 35.10], [33.10, 35.30], [33.10, 35.50], [33.28, 35.57], [33.10, 35.62], [32.92, 35.62], [32.82, 35.66], [32.70, 35.58], [32.50, 35.56], [32.20, 35.56], [31.80, 35.55], [31.50, 35.52], [31.20, 35.45], [30.90, 35.35], [30.50, 35.17], [30.00, 35.06], [29.56, 34.96], [29.50, 34.90], [29.90, 34.72], [30.40, 34.55], [30.90, 34.40], [31.25, 34.27], [31.40, 34.38], [31.60, 34.50], [31.80, 34.64], [32.08, 34.77], [32.33, 34.85], [32.50, 34.89], [32.70, 34.94], [32.83, 34.96], [32.82, 35.04], [32.93, 35.07], [33.01, 35.09]];
  const X = (lon) => (lon - 34.12) * 175, Y = (lat) => (33.42 - lat) * 210;
  const liensDe = (l) => l.liens.flatMap((x) => {
    if (x.chap) { const st = STORIES.find((s) => s.id === x.chap), c = CHAPITRES[x.chap]; return st ? [{ href: `#/histoire/${x.chap}`, txt: `📖 Chapitre ${c ? c.num : ''} · ${st.title}`, fait: !!S.story[x.chap] }] : []; }
    if (x.ville) { const v = VILLES.find((y) => y.id === x.ville); return v ? [{ href: `#/histoire/${v.id}`, txt: `🏙️ Chapitre ${v.num} · ${v.histoires.length} histoires de la vie`, fait: v.histoires.some((h) => S.story[h]) }] : []; }
    if (x.voyage !== undefined && typeof VOYAGE !== 'undefined') { const v = VOYAGE[x.voyage]; return v ? [{ href: `#/voyage/${v.id}`, txt: `🧳 Mon voyage · ${v.lieu}`, fait: !!(S.voyage || {})[x.voyage] }] : []; }
    if (x.feuil) return x.feuil.map((n) => { const e = FEUILLETON.find((f) => f.num === n); return e ? { href: `#/feuilleton/${n}`, txt: `📺 Feuilleton · épisode ${n}, ${e.titre}`, fait: !!((S.feuilleton || {}).vus || {})[n] } : null; }).filter(Boolean);
    return [];
  });
  const visite = (l) => liensDe(l).some((x) => x.fait);

  function carteIsrael(choix) {
    const nb = LIEUX.filter(visite).length;
    const pts = CONTOUR.map(([la, lo]) => `${X(lo).toFixed(1)},${Y(la).toFixed(1)}`).join(' ');
    const lieu = LIEUX.find((l) => l.id === choix) || null;
    app.innerHTML = `<div class="q-head"><a href="#/histoire">← Histoires</a><span>🗺️ Ma carte d’Israël</span></div>
      <h2>Ma carte d’Israël</h2>
      <p class="sub">Tous les lieux de tes histoires, de ton voyage et du feuilleton. Ceux où tu as déjà joué s’allument. <b>${nb} lieu${nb > 1 ? 'x' : ''} sur ${LIEUX.length}</b>.</p>
      <div class="ci-cadre">
        <svg class="ci-carte" viewBox="-20 -10 340 840" role="img" aria-label="Carte d’Israël">
          <defs><linearGradient id="ciMer" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a8ac4"/><stop offset="1" stop-color="#8ab8e0"/></linearGradient></defs>
          <rect x="-20" y="-10" width="340" height="840" fill="url(#ciMer)" opacity=".55"/>
          <polygon points="${pts}" class="ci-terre"/>
          <ellipse cx="${X(35.585)}" cy="${Y(32.82)}" rx="7" ry="20" class="ci-eau"/>
          <ellipse cx="${X(35.495)}" cy="${Y(31.47)}" rx="8" ry="${(31.77 - 31.08) * 105}" class="ci-eau"/>
          <path d="M${X(34.90)} ${Y(29.50)} L${X(35.0)} ${Y(29.50)} L${X(34.96)} ${Y(29.36)} Z" class="ci-eau"/>
          <text x="${X(34.30)}" y="${Y(32.30)}" class="ci-mer">הַיָּם הַתִּיכוֹן</text>
          ${LIEUX.map((l) => { const x = X(l.lon), y = Y(l.lat), v = visite(l), d = l.decale || [1, 0]; return `<g class="ci-lieu${v ? ' vu' : ''}${l === lieu ? ' choisi' : ''}" data-l="${l.id}" tabindex="0" role="button" aria-label="${esc(l.fr)}">
            <circle cx="${x}" cy="${y}" r="${l === lieu ? 9 : 6}"/>${v ? `<circle cx="${x}" cy="${y}" r="13" class="ci-halo"/>` : ''}
            <text x="${x + 11 * d[0]}" y="${y + 4 + 12 * d[1]}" text-anchor="${d[0] < 0 ? 'end' : 'start'}">${esc(l.fr)}</text></g>`; }).join('')}
        </svg>
        <aside class="card ci-info" id="ciInfo">${lieu ? `
          <span class="ci-he">${HE(lieu.he)}${sayBtn(lieu.he)}</span>
          <h3>${esc(lieu.fr)} ${visite(lieu) ? '<small>✓ visité</small>' : ''}</h3>
          <p>${esc(lieu.info)}</p>
          <div class="ci-liens">${liensDe(lieu).map((x) => `<a href="${x.href}" class="${x.fait ? 'fait' : ''}">${esc(x.txt)}${x.fait ? ' ✓' : ''}</a>`).join('')}</div>`
          : '<p class="sub" style="margin:0">Touche une ville sur la carte pour la découvrir : son nom en hébreu, une anecdote et tout ce qui s’y passe dans Ivrit.</p>'}</aside>
      </div>`;
    $$('.ci-lieu').forEach((g) => { const ouvrir = () => { location.hash = `#/carte-israel/${g.dataset.l}`; }; g.onclick = ouvrir; g.onkeydown = (e) => { if (e.key === 'Enter') ouvrir(); }; });
    if (lieu) { speak(lieu.he); if (innerWidth < 760) $('#ciInfo').scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
  }
  routes['carte-israel'] = carteIsrael;

  /* ====================== 2. Les recettes de Savta ====================== */
  const dessin = (art) => (art && typeof OBJ !== 'undefined' && OBJ[art] ? `<svg class="re-dessin" viewBox="-80 -120 160 160" aria-hidden="true">${OBJ[art]()}</svg>` : '');
  function recettes(id, mode) {
    const r = RECETTES.find((x) => x.id === id);
    if (!r) {
      app.innerHTML = `<section class="fe-hero re-hero"><span class="he fe-hero-he" lang="he" dir="rtl">הַמִּטְבָּח שֶׁל סָבְתָא</span>
          <h2>🍲 Cuisiner avec Savta</h2><p>Cinq recettes israéliennes en hébreu simple, avec le son et les mots qui se touchent. Comme dans les vraies recettes israéliennes, les étapes sont à l’infinitif : לַחְתֹּךְ, « couper », לְעַרְבֵּב, « mélanger »…</p></section>
        <div class="re-grille">${RECETTES.map((x) => `<a class="card re-carte" href="#/recettes/${x.id}" style="--c:${x.couleur}"><span class="re-em">${x.em}</span><span class="he" lang="he" dir="rtl">${esc(x.he)}</span><b>${esc(x.fr)}</b><small>⏱️ ${esc(x.duree)}${(S.recettes || {})[x.id] ? ' · ✓ cuisinée' : ''}</small></a>`).join('')}</div>`;
      return;
    }
    if (mode === 'pas') return pasAPas(r);
    const fait = (S.recettes || {})[r.id];
    app.innerHTML = `<div class="q-head"><a href="#/recettes">← Les recettes</a><span>${r.em} ${esc(r.fr)}</span></div>
      <section class="re-tete" style="--c:${r.couleur}">
        <div><span class="he re-he" lang="he" dir="rtl">${esc(r.he)}</span><h2>${esc(r.fr)}</h2><p>⏱️ ${esc(r.duree)}</p></div>
        <div class="re-dessins">${r.ingredients.filter((g) => g[4]).slice(0, 3).map((g) => dessin(g[4])).join('')}</div>
      </section>
      <p class="re-intro" data-ligne="intro">👵🏻 ${phraseCliquable(r.intro.he)} ${sayBtn(r.intro.he)}<small>${esc(r.intro.fr)}</small></p>
      <div class="re-cols">
        <section class="card"><h3>Les ingrédients · <span class="he" lang="he" dir="rtl">מִצְרָכִים</span></h3>
          <ul class="re-ingr">${r.ingredients.map((g, k) => `<li><label><input type="checkbox"> <span class="he" lang="he" dir="rtl">${esc(g[0])}</span></label>${sayBtn(g[0])}<small>${esc(g[3])} · ${esc(g[2])}</small></li>`).join('')}</ul></section>
        <section class="card"><h3>Les étapes · <span class="he" lang="he" dir="rtl">אֹפֶן הַהֲכָנָה</span></h3>
          <ol class="re-etapes">${r.etapes.map((e, k) => `<li data-ligne="e${k}"><div class="re-et-he">${phraseCliquable(e.he)} ${sayBtn(e.he)}</div><small class="tr">${esc(e.tr)}</small><button type="button" class="link re-voir" data-k="${k}">Traduction</button><span class="re-fr" id="reFr${k}" hidden>${esc(e.fr)}</span></li>`).join('')}</ol>
          <p class="re-sod" data-ligne="sod">💡 ${phraseCliquable(r.sod.he)} ${sayBtn(r.sod.he)}<small>${esc(r.sod.fr)}</small></p></section>
      </div>
      <p class="center"><a class="btn gold" href="#/recettes/${r.id}/pas">🧑‍🍳 Cuisiner pas à pas</a> <button class="btn ghost" id="reFait"${fait ? ' disabled' : ''}>${fait ? '✓ Déjà cuisinée' : '✅ Je l’ai cuisinée !'}</button></p>`;
    const bulle = document.createElement('div'); bulle.className = 'bulle-mot'; bulle.id = 'bulleMot'; bulle.hidden = true;
    brancherMotsClic(app, bulle);
    $$('.mot-clic').forEach((b) => b.addEventListener('click', () => { const z = b.closest('[data-ligne]'); if (z) z.appendChild(bulle); }));
    $$('.re-voir').forEach((b) => (b.onclick = () => { const z = $('#reFr' + b.dataset.k); z.hidden = !z.hidden; }));
    $('#reFait').onclick = () => { S.recettes = S.recettes || {}; S.recettes[r.id] = dayKey(); addXP(10); save(); toast('🍲 Bravo, cheffe ! +10 XP'); recettes(r.id); };
  }
  // Une étape à la fois, en grand, pour cuisiner pour de vrai
  function pasAPas(r) {
    let i = 0;
    const montrer = () => {
      const e = r.etapes[i];
      app.innerHTML = `<div class="q-head"><a href="#/recettes/${r.id}">← La recette</a><span>🧑‍🍳 Étape ${i + 1}/${r.etapes.length}</span></div>
        <div class="nv-barre"><i style="width:${((i + 1) / r.etapes.length) * 100}%"></i></div>
        <section class="card re-pas" data-ligne="pas"><span class="re-num">${i + 1}</span>
          <div class="re-pas-he">${phraseCliquable(e.he)}</div>${sayBtn(e.he, '🔊 Réécouter')}
          <p class="re-pas-fr">${esc(e.fr)}</p></section>
        <div class="row" style="justify-content:center"><button class="btn ghost" id="rePrec"${i ? '' : ' disabled'}>← Précédente</button><button class="btn gold" id="reSuiv">${i + 1 < r.etapes.length ? 'Suivante →' : 'Terminé ! 🎉'}</button></div>`;
      const bulle = document.createElement('div'); bulle.className = 'bulle-mot'; bulle.id = 'bulleMot'; bulle.hidden = true;
      brancherMotsClic(app, bulle);
      $$('.mot-clic').forEach((b) => b.addEventListener('click', () => $('.re-pas').appendChild(bulle)));
      later(() => speak(e.he), 250);
      $('#rePrec').onclick = () => { i--; montrer(); };
      $('#reSuiv').onclick = () => { if (i + 1 < r.etapes.length) { i++; montrer(); } else location.hash = `#/recettes/${r.id}`; };
    };
    montrer();
  }
  routes.recettes = recettes;

  /* ====================== 3. Le quiz d'Israël ====================== */
  const PAR_PARTIE = 10;
  function israel(etape) {
    if (etape !== 'jouer') {
      const best = (S.quizIsrael || {}).best;
      app.innerHTML = `<div class="q-head"><a href="#/jeux">← Jeux</a><span>🇮🇱 Le quiz d’Israël</span></div>
        <section class="fe-hero qi-hero"><span class="he fe-hero-he" lang="he" dir="rtl">חִידוֹן</span><h2>Le quiz d’Israël</h2>
          <p>${PAR_PARTIE} questions en hébreu simple sur le pays : géographie, villes, fêtes, cuisine et langue. Après chaque réponse, une petite anecdote.</p></section>
        ${best !== undefined ? `<p class="hint center">🏆 Ton meilleur score : ${best}/${PAR_PARTIE}</p>` : ''}
        <p class="center"><a class="btn gold" href="#/israel/jouer">C’est parti →</a></p>`;
      return;
    }
    const serie = pick(QUIZ_ISRAEL, PAR_PARTIE);
    let i = 0, bons = 0;
    const question = () => {
      if (i >= serie.length) return fin();
      const q = serie[i], opts = shuffle([q.ok, ...q.non]);
      app.innerHTML = `<div class="q-head"><a href="#/israel">← Quitter</a><span>🇮🇱 ${i + 1}/${serie.length}</span></div>
        <div class="nv-barre"><i style="width:${(i / serie.length) * 100}%"></i></div>
        <div class="card nv-carte qi-carte" data-ligne="q">
          <span class="qi-cat">${q.cat}</span>
          <div class="qi-q">${phraseCliquable(q.q.he)} ${sayBtn(q.q.he)}</div>
          <button type="button" class="link" id="qiTrad">Traduction</button><p class="qi-fr" id="qiFr" hidden>${esc(q.q.fr)}</p>
          <div class="opts nv-opts">${opts.map((o) => `<button class="opt" data-o="${esc(o.he)}">${HE(o.he)}</button>`).join('')}</div>
          <div id="qiRes"></div></div>`;
      const bulle = document.createElement('div'); bulle.className = 'bulle-mot'; bulle.id = 'bulleMot'; bulle.hidden = true;
      brancherMotsClic($('.qi-q'), bulle);
      $$('.qi-q .mot-clic').forEach((b) => b.addEventListener('click', () => $('.qi-q').after(bulle)));
      $('#qiTrad').onclick = () => { $('#qiFr').hidden = !$('#qiFr').hidden; };
      later(() => speak(q.q.he), 250);
      $$('.nv-opts .opt').forEach((b) => (b.onclick = () => {
        const bon = b.dataset.o === q.ok.he; if (bon) bons++;
        $$('.nv-opts .opt').forEach((x) => { x.disabled = true; const o = opts.find((y) => y.he === x.dataset.o); x.insertAdjacentHTML('beforeend', `<small class="qi-trad">${esc(o.fr)}</small>`); if (x.dataset.o === q.ok.he) x.classList.add('ok'); });
        if (!bon) b.classList.add('ko');
        speak(q.ok.he);
        $('#qiRes').innerHTML = `<p class="qi-info"><b>${bon ? '✓ Bravo !' : `C’était : ${esc(q.ok.fr)}`}</b><br>${esc(q.info)}</p><p class="center"><button class="btn gold" id="qiSuite">${i + 1 < serie.length ? 'Question suivante →' : 'Voir mon score'}</button></p>`;
        $('#qiSuite').onclick = () => { i++; question(); };
      }));
    };
    const fin = () => {
      S.quizIsrael = S.quizIsrael || {}; S.quizIsrael.best = Math.max(S.quizIsrael.best || 0, bons); S.quizIsrael.parties = (S.quizIsrael.parties || 0) + 1;
      addXP(bons * 2); save();
      app.innerHTML = `<div class="card center result"><div class="em">🇮🇱</div><h2>${bons} / ${serie.length}</h2><p class="sub">+${bons * 2} XP${bons === serie.length ? ' · un sans-faute !' : ''}</p>
        <div class="row" style="justify-content:center"><a class="btn gold" href="#/israel/jouer" id="qiEncore">Rejouer</a><a class="btn ghost" href="#/carte-israel">Voir la carte</a></div></div>`;
      $('#qiEncore').onclick = (e) => { e.preventDefault(); israel('jouer'); };
    };
    question();
  }
  routes.israel = israel;

  /* ====================== Les chemins vers ces pages ====================== */
  const histoireAvant = routes.histoire;
  routes.histoire = (...args) => {
    histoireAvant(...args);
    if (args[0]) return;
    const z = $('.hb-entrees');
    const nb = LIEUX.filter(visite).length;
    const html = `<a class="card hb-entree" href="#/carte-israel"><span>🗺️</span><span><b>Ma carte d’Israël</b><small>${nb}/${LIEUX.length} lieux visités</small></span><i>›</i></a>
      <a class="card hb-entree" href="#/recettes"><span>🍲</span><span><b>Cuisiner avec Savta</b><small>${Object.keys(S.recettes || {}).length}/${RECETTES.length} recettes cuisinées</small></span><i>›</i></a>`;
    if (z) z.insertAdjacentHTML('beforeend', html);
  };
  const jeuxAvant = routes.jeux;
  routes.jeux = (...args) => {
    jeuxAvant(...args);
    const g = $('.jv-grille'), best = (S.quizIsrael || {}).best;
    if (g) g.insertAdjacentHTML('beforeend', `<a class="jv-carte" href="#/israel" style="--c1:#2f6ab0;--c2:#5a9ad8">
      <span class="he jv-he" lang="he" dir="rtl" aria-hidden="true">חִידוֹן</span>
      <span class="jv-em">🇮🇱</span><b>Le quiz d’Israël</b><small>Géographie, villes, fêtes, cuisine : le pays en hébreu simple.</small>
      <span class="jv-bas"><span class="jv-info">${best !== undefined ? `🏆 ${best}/${PAR_PARTIE}` : '10 questions'}</span><span class="jv-jouer">Jouer →</span></span></a>`);
  };
  if (/^#\/(carte-israel|recettes|israel|histoire|jeux)(\/|$)/.test(location.hash)) route();
})();
