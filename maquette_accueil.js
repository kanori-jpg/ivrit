/* ============ Accueil : calme, chaleureux, l'essentiel du jour ============ */
function maquetteAccueil() {
  const auj = dayKey(), now = new Date(), h = now.getHours();
  const salut = h < 5 ? ['לַיְלָה טוֹב', 'Bonne nuit'] : h < 12 ? ['בֹּקֶר טוֹב', 'Bonjour'] : h < 18 ? ['צָהֳרַיִם טוֹבִים', 'Bon après-midi'] : h < 22 ? ['עֶרֶב טוֹב', 'Bonsoir'] : ['לַיְלָה טוֹב', 'Bonne nuit'];
  const dateFr = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  const todayXp = S.days[auj] || 0, faite = S.seance === auj, objectif = todayXp >= S.goal;
  const w = WORDS[Math.floor(Date.now() / 864e5) % WORDS.length];
  const expr = typeof expressionDuJour === 'function' ? expressionDuJour() : null;
  const art = typeof PRESSE !== 'undefined' ? presseDuJour() : null;
  // Une phrase qui change selon la journée
  const phrase = !faite ? (todayXp ? 'Encore un petit effort : ta séance t’attend.' : 'Cinq minutes avec l’hébreu ? Ta séance t’attend.')
    : objectif ? 'Belle journée d’hébreu : séance faite et objectif atteint.' : 'Séance faite ! Tout le reste, c’est du bonus.';
  // Ce que contient la séance
  const aRevoir = WORDS.filter((x) => cardOf(x).due && isDue(x)).length;
  const nouveaux = aRevoir > 15 ? 0 : Math.min(typeof SEANCE !== 'undefined' ? SEANCE.nouveaux : 10, WORDS.filter((x) => !cardOf(x).due && isDue(x)).length);
  const gram = typeof questionsGramSeance === 'function' && GRAMMAIRE.some((l) => S.grammaire[l.id]);
  const contenu = [aRevoir ? `${Math.min(aRevoir, 8)} carte${Math.min(aRevoir, 8) > 1 ? 's' : ''} à revoir` : null, nouveaux ? `${nouveaux} nouveau${nouveaux > 1 ? 'x' : ''} mot${nouveaux > 1 ? 's' : ''}` : null, '5 questions', gram ? 'un peu de grammaire' : null].filter(Boolean).join(' · ');
  // La petite liste du jour
  const taches = [
    { ok: faite, nom: 'Faire ma séance', href: '#/seance' },
    { ok: !!S.daily[auj], nom: 'Trouver le mot caché', href: '#/jour' },
    art ? { ok: S.presse.includes(art.id), nom: 'Lire l’article du jour', href: '#/journal/jour' } : null,
    { ok: objectif, nom: `Gagner ${S.goal} XP`, href: '#/progres', sous: `${Math.min(todayXp, S.goal)}/${S.goal}` },
  ].filter(Boolean);
  // Reprendre là où on en était
  const lecon = typeof GRAMMAIRE !== 'undefined' ? GRAMMAIRE.find((l) => !S.grammaire[l.id]) : null;
  const etape = typeof VOYAGE !== 'undefined' ? VOYAGE.findIndex((v, i) => !(S.voyage || {})[i]) : -1;
  const reprendre = [
    lecon ? { em: lecon.em, titre: 'Grammaire', txt: texteGram(lecon.titre), href: `#/grammaire/${lecon.id}` } : null,
    etape >= 0 ? { em: '🧳', titre: 'Mon voyage', txt: `Prochaine étape : ${VOYAGE[etape].lieu}`, href: `#/voyage/${VOYAGE[etape].id}` } : null,
    { em: '🎭', titre: 'Jeux de rôle', txt: 'Une scène de la vie, plusieurs fins', href: '#/roles' },
  ].filter(Boolean).slice(0, 3);
  // La semaine, du lundi au dimanche
  const lundi = new Date(now.getFullYear(), now.getMonth(), now.getDate() - ((now.getDay() + 6) % 7));
  const semaine = [...Array(7)].map((_, i) => { const d = new Date(lundi); d.setDate(lundi.getDate() + i); const k = dayKey(d), v = S.days[k] || 0; return { l: 'LMMJVSD'[i], cls: `${v >= S.goal ? 'ok' : v > 0 ? 'fait' : ''}${k === auj ? ' auj' : ''}${k > auj ? ' futur' : ''}` }; });
  const lv = level(), pLv = Math.max(0, Math.min(100, Math.round(((S.xp - levelXp(lv)) / (levelXp(lv + 1) - levelXp(lv))) * 100)));
  const fete = typeof fetesAVenir === 'function' ? fetesAVenir()[0] : null;
  const feteProche = fete && fete.dans <= 30 ? fete : null;
  const he = (t) => `<span class="he" lang="he" dir="rtl">${esc(t)}</span>`;

  app.innerHTML = `<div class="ac">
    <section class="ac-ciel">
      <div class="vallee ac-vallee" id="vallee"><div class="v-grain"></div></div>
      <div class="ac-voile"></div>
      <div class="ac-salut">
        <span class="ac-salut-he" lang="he" dir="rtl">${salut[0]}</span>
        <h1>${salut[1]} !</h1>
        <p>${phrase}</p>
        <span class="ac-date">${dateFr.charAt(0).toUpperCase() + dateFr.slice(1)}${typeof dateHebraique === 'function' ? ` · ${he(dateHebraique())}` : ''}</span>
      </div>
    </section>
    ${feteProche ? `<a class="ac-fete" href="#/fetes/${feteProche.f.id}"><span>${feteProche.f.em}</span><span><b>${esc(feteProche.f.nom)}</b> ${he(feteProche.f.he)} <small>${feteProche.enCours ? 'c’est en ce moment !' : feteProche.dans === 1 ? 'c’est demain' : `dans ${feteProche.dans} jours`}</small></span><i>›</i></a>` : ''}
    <div class="ac-grille">
      <div class="ac-col">
        ${faite ? `<section class="ac-carte ac-seance faite">
          <div class="ac-seance-tete"><span class="ac-soleil">✓</span><div><span class="ac-surtitre">Séance du jour</span><h2>C’est fait, bravo !</h2></div></div>
          <p class="ac-doux">Et maintenant, si tu as envie :</p>
          <div class="ac-envies"><a href="#/histoire">📖 Une histoire</a><a href="#/roles">🎭 Un jeu de rôle</a><a href="#/jour">🔎 Le mot caché</a></div>
          <a class="ac-lien-discret" href="#/seance">Refaire une séance</a>
        </section>` : `<a class="ac-carte ac-seance" href="#/seance">
          <div class="ac-seance-tete"><span class="ac-soleil" aria-hidden="true"></span><div><span class="ac-surtitre">Séance du jour</span><h2>Dix minutes, tout s’enchaîne</h2></div></div>
          <p class="ac-doux">${contenu}</p>
          <span class="btn gold ac-go">Commencer ma séance →</span>
        </a>`}
        <section class="ac-carte ac-jour">
          <h3>Aujourd’hui</h3>
          <ul>${taches.map((t) => `<li><a href="${t.href}" class="${t.ok ? 'ok' : ''}"><i aria-hidden="true">${t.ok ? '✓' : ''}</i><span>${t.nom}</span>${t.sous ? `<small>${t.sous}</small>` : ''}</a></li>`).join('')}</ul>
        </section>
        <section class="ac-carte ac-reprendre">
          <h3>Reprendre</h3>
          ${reprendre.map((r) => `<a href="${r.href}"><span class="ac-r-em">${r.em}</span><span class="ac-r-txt"><small>${r.titre}</small><b>${r.txt}</b></span><i>›</i></a>`).join('')}
        </section>
      </div>
      <div class="ac-col">
        <section class="ac-carte ac-mot">
          <span class="ac-surtitre">Le mot du jour</span>
          <span class="ac-mot-he" lang="he" dir="rtl">${esc(w.he)}</span>
          <span class="ac-mot-fr">${esc(w.fr)}</span><small class="tr-x">${esc(w.tr || '')}</small>
          ${sayBtn(w.he, '🔊 Écouter')}
        </section>
        ${expr ? `<a class="ac-carte ac-expr" href="#/expressions">
          <span class="ac-surtitre">L’expression du jour</span>
          <span class="ac-expr-he" lang="he" dir="rtl">${esc(expr.he)}</span>
          <span class="ac-expr-sens">${esc(expr.sens.split(/[(]/)[0].trim())}</span>
          <small>mot à mot : <i>${esc(expr.mot)}</i></small>
        </a>` : ''}
        <a class="ac-carte ac-semaine" href="#/progres">
          <div class="ac-sem-tete"><span class="ac-anneau" style="--p:${pLv}"><b>${lv}</b></span><span><b>Niveau ${lv}</b><small>🔥 ${streakNow()} jour${streakNow() > 1 ? 's' : ''} d’affilée</small></span></div>
          <div class="ac-jours">${semaine.map((d) => `<span class="${d.cls}"><i></i>${d.l}</span>`).join('')}</div>
        </a>
      </div>
    </div>
  </div>`;
  Vallee.mount($('#vallee'));
}
routes.maquette = maquetteAccueil;
// C'est la page d'accueil (l'ancienne reste disponible sur #/accueil-classique)
routes['accueil-classique'] = home;
routes[''] = maquetteAccueil;
