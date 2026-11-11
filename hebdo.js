'use strict';
/* ============ Le feuilleton (#/feuilleton), les lettres de Noa (#/lettres) et les nombres en vrai (#/chiffres) ============ */
(() => {
  const auj = () => dayKey();
  const plus = (k, n) => { const d = new Date(k + 'T00:00'); d.setDate(d.getDate() + n); return dayKey(d); };
  const dateFr = (k) => new Date(k + 'T00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  const dans = (k) => { const n = daysBetween(auj(), k); return n <= 0 ? 'aujourd’hui' : n === 1 ? 'demain' : `dans ${n} jours`; };
  // Une phrase dont chaque mot se touche (sens et son), avec la bulle placée juste dessous
  const phraseMots = (he) => phraseCliquable(he);
  function brancherBulle(zone) {
    let bulle = document.getElementById('bulleMot');
    if (!bulle) { bulle = document.createElement('div'); bulle.className = 'bulle-mot'; bulle.id = 'bulleMot'; bulle.hidden = true; }
    brancherMotsClic(zone, bulle);
    zone.querySelectorAll('.mot-clic').forEach((b) => b.addEventListener('click', () => { const ligne = b.closest('[data-ligne]'); if (ligne) ligne.appendChild(bulle); }));
  }
  async function lireSuite(textes) { for (const t of textes) { if (!document.body.contains(app)) break; await speak(t); } }

  // Les mots du feuilleton et des lettres deviennent cliquables (sens et forme de base)
  if (typeof MOTS_HISTOIRES !== 'undefined') FEUILLETON.forEach((e) => e.mots.forEach((m) => { if (!MOTS_HISTOIRES.some((x) => NFC(x[0]) === NFC(m[0]))) MOTS_HISTOIRES.push(m); }));
  if (typeof GLOSES_HISTOIRES !== 'undefined') Object.assign(GLOSES_HISTOIRES, window.GLOSES_HEBDO || {});
  if (typeof INDEX_GLOSES !== 'undefined') INDEX_GLOSES = null;

  /* ====================== 1. Le feuilleton ====================== */
  const etatF = () => { if (!S.feuilleton) S.feuilleton = { debut: auj(), vus: {} }; return S.feuilleton; };
  const sortieF = (n) => plus(etatF().debut, 7 * (n - 1));
  const dispoF = (n) => n === 1 || (!!etatF().vus[n - 1] && sortieF(n) <= auj());
  const nouvelEpisode = () => { if (!S.feuilleton) return FEUILLETON[0]; return FEUILLETON.find((e) => !S.feuilleton.vus[e.num] && dispoF(e.num)) || null; };

  function feuilleton(num) {
    const st = etatF(); save();
    const ep = FEUILLETON.find((e) => String(e.num) === String(num));
    if (!ep) {
      app.innerHTML = `<section class="fe-hero">
          <span class="he fe-hero-he" lang="he" dir="rtl">הַמִּכְתָּב</span>
          <h2>📺 La lettre cachée</h2>
          <p>Un feuilleton en ${FEUILLETON.length} épisodes. En déménageant des meubles, Shira et toi trouvez une lettre de 1962, jamais ouverte… Un nouvel épisode chaque semaine.</p>
          <div class="fe-persos">${Object.values(FEUILLETON_PERSOS).slice(0, 4).map((p) => `<span title="${esc(p.desc)}">${p.em} <b>${esc(p.nom)}</b><small>${esc(p.desc)}</small></span>`).join('')}</div>
        </section>
        <div class="fe-episodes">${FEUILLETON.map((e) => {
          const vu = st.vus[e.num], ok = dispoF(e.num);
          const etat = vu ? '✓ Vu' : ok ? '▶ Regarder' : st.vus[e.num - 1] ? `🔒 ${dans(sortieF(e.num))}` : `🔒 après l’épisode ${e.num - 1}`;
          const corps = `<span class="fe-num">${e.num}</span><span class="fe-txt"><b>${e.em} ${esc(e.titre)}</b><small>${ok || vu ? esc(e.lieu) : 'À venir…'}</small></span><span class="fe-etat">${etat}</span>`;
          return ok || vu ? `<a class="card fe-ep${vu ? ' vu' : ' neuf'}" href="#/feuilleton/${e.num}">${corps}</a>` : `<div class="card fe-ep lock">${corps}</div>`;
        }).join('')}</div>`;
      return;
    }
    if (!dispoF(ep.num) && !st.vus[ep.num]) { location.hash = '#/feuilleton'; return; }
    // Les autres répliques possibles, prises dans les autres épisodes
    const autresReps = FEUILLETON.filter((e) => e !== ep).flatMap((e) => e.lignes.filter((l) => l.rep).map((l) => l.rep));
    const fil = []; let i = 0, attendReponse = false;
    const bulleHtml = (l, k) => {
      const p = l.moi ? { nom: 'Toi', em: '🙋🏻‍♀️' } : FEUILLETON_PERSOS[l.qui];
      return `<div class="fe-bulle${l.moi ? ' moi' : ''}" data-ligne="${k}">
        <span class="fe-qui">${p.em} ${esc(p.nom)}</span>
        <div class="fe-he">${phraseMots(l.he)}${sayBtn(l.he)}</div>
        <small class="tr fe-tr">${esc(l.tr)}</small>
        <button type="button" class="link fe-voir" data-k="${k}">Traduction</button><div class="fe-fr" id="feFr${k}" hidden>${esc(l.fr)}</div>
      </div>`;
    };
    const dessiner = () => {
      const l = ep.lignes[i - 1];
      const fini = i >= ep.lignes.length && !attendReponse;
      let bas = '';
      if (attendReponse) {
        const choix = shuffle([{ ...l.rep, ok: true }, ...pick(autresReps.filter((r) => r.he !== l.rep.he), 2)]);
        bas = `<p class="sub center">Que réponds-tu ?</p><div class="col-choices fe-choix">${choix.map((c) => `<button class="opt choice" data-he="${esc(c.he)}" data-ok="${c.ok ? 1 : 0}"><span class="he" lang="he" dir="rtl">${esc(c.he)}</span><small class="tr">${esc(c.tr)}</small></button>`).join('')}</div>`;
      } else if (!fini) bas = '<p class="center"><button class="btn gold" id="feSuite">Suite →</button></p>';
      app.innerHTML = `<div class="q-head"><a href="#/feuilleton">← Épisodes</a><span>📺 Épisode ${ep.num} · ${esc(ep.titre)}</span></div>
        <p class="fe-lieu">📍 ${esc(ep.lieu)}</p>
        <div class="fe-fil">${fil.map(bulleHtml).join('')}</div>${bas}<div id="feFin"></div>`;
      brancherBulle($('.fe-fil'));
      $$('.fe-voir').forEach((b) => (b.onclick = () => { const z = $('#feFr' + b.dataset.k); z.hidden = !z.hidden; }));
      const dernier = $$('.fe-bulle').pop(); if (dernier) dernier.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      if (attendReponse) {
        $$('.fe-choix .choice').forEach((b) => (b.onclick = () => {
          if (b.dataset.ok === '1') { fil.push({ moi: true, he: l.rep.he, tr: l.rep.tr, fr: l.rep.fr }); attendReponse = false; speak(l.rep.he); avancer(700); }
          else { b.classList.add('ko'); b.disabled = true; toast('Ce n’est pas la bonne réplique : relis ce qu’on te dit.'); }
        }));
      } else if (!fini) $('#feSuite').onclick = () => avancer(0);
      else finir();
    };
    const avancer = (delai) => {
      later(() => {
        if (i >= ep.lignes.length) { dessiner(); return; }
        const l = ep.lignes[i++]; fil.push(l); attendReponse = !!l.rep;
        dessiner(); speak(l.he);
      }, delai);
    };
    const finir = () => {
      const premiere = !st.vus[ep.num];
      if (premiere) { st.vus[ep.num] = auj(); addXP(20); save(); }
      const suivant = FEUILLETON.find((e) => e.num === ep.num + 1);
      $('#feFin').innerHTML = `<section class="card fe-suspense">
        <p class="fe-asuivre">${suivant ? 'À suivre…' : 'Fin de la saison 1'}</p>
        <p>${esc(ep.suspense)}</p>
        <div class="fe-mots"><b>Les mots de l’épisode</b><div>${ep.mots.map(([he, , fr]) => `<span class="rs-puce">${HE(he)}<small>${esc(fr)}</small>${sayBtn(he)}</span>`).join('')}</div>
        <button class="btn ghost" id="feMots">⭐ Ajouter ces mots à Mes mots</button></div>
        ${suivant ? `<p class="hint">${premiere ? '+20 XP · ' : ''}Prochain épisode, « ${esc(suivant.titre)} » : ${dispoF(suivant.num) ? 'disponible maintenant !' : `${dans(sortieF(suivant.num))} (${dateFr(sortieF(suivant.num))}).`}</p>` : `<p class="hint">${premiere ? '+20 XP · ' : ''}Merci d’avoir suivi l’enquête jusqu’au bout !</p>`}
        <div class="row" style="justify-content:center">${suivant && dispoF(suivant.num) ? `<a class="btn gold" href="#/feuilleton/${suivant.num}">Épisode ${suivant.num} →</a>` : ''}<a class="btn ghost" href="#/feuilleton">Tous les épisodes</a></div>
      </section>`;
      $('#feMots').onclick = (e) => { ep.mots.forEach((m) => ajouterMesMots(m)); e.currentTarget.disabled = true; toast('⭐ Mots ajoutés à tes cartes'); };
    };
    avancer(0);
  }
  routes.feuilleton = feuilleton;

  /* ====================== 2. Les lettres de Noa ====================== */
  const etatL = () => { if (!S.lettres) S.lettres = { debut: auj(), rep: {} }; return S.lettres; };
  const sortieL = (n) => plus(etatL().debut, 7 * (n - 1));
  const dispoL = (n) => n === 1 || (!!etatL().rep[n - 1] && sortieL(n) <= auj());
  const nouvelleLettre = () => { if (!S.lettres) return LETTRES_NOA[0]; return LETTRES_NOA.find((l) => !S.lettres.rep[l.num] && dispoL(l.num)) || null; };
  const ouvertureDe = (l) => { if (l.num === 1) return null; const avant = etatL().rep[l.num - 1]; const k = avant && avant.r[0]; return l.ouverture[k] || Object.values(l.ouverture)[0]; };

  function lettres(num) {
    const st = etatL(); save();
    const L = LETTRES_NOA.find((x) => String(x.num) === String(num));
    if (!L) {
      app.innerHTML = `<section class="fe-hero lt-hero">
          <span class="he fe-hero-he" lang="he" dir="rtl">מִכְתָּבִים מִנּוֹעָה</span>
          <h2>💌 Les lettres de Noa</h2>
          <p>Noa, rencontrée au café de Tel-Aviv dans la première histoire, t’écrit une lettre chaque semaine. Lis-la, puis réponds-lui en choisissant tes phrases : sa lettre suivante tiendra compte de ta réponse.</p>
        </section>
        <div class="fe-episodes">${LETTRES_NOA.map((x) => {
          const fait = st.rep[x.num], ok = dispoL(x.num);
          const etat = fait ? '✓ Répondu' : ok ? '💌 À lire' : st.rep[x.num - 1] ? `📭 ${dans(sortieL(x.num))}` : `📭 après ta réponse à la lettre ${x.num - 1}`;
          const corps = `<span class="fe-num">${x.num}</span><span class="fe-txt"><b>${esc(x.titre)}</b><small>${fait ? `reçue le ${dateFr(fait.d)}` : ok ? 'Une lettre t’attend' : 'Pas encore arrivée'}</small></span><span class="fe-etat">${etat}</span>`;
          return ok || fait ? `<a class="card fe-ep${fait ? ' vu' : ' neuf'}" href="#/lettres/${x.num}">${corps}</a>` : `<div class="card fe-ep lock">${corps}</div>`;
        }).join('')}</div>`;
      return;
    }
    if (!dispoL(L.num) && !st.rep[L.num]) { location.hash = '#/lettres'; return; }
    const ouv = ouvertureDe(L);
    const phrases = [L.phrases[0], ...(ouv ? [ouv] : []), ...L.phrases.slice(1), ...L.questions.map((q) => ({ he: q.he, tr: q.tr, fr: q.fr })), LETTRES_FORMULES.signature];
    const deja = st.rep[L.num];
    const choix = deja ? deja.r.map((c, k) => L.questions[k].options.find((o) => o.cle === c)) : [null, null];
    const ligne = (p, k) => `<p class="lt-phrase" data-ligne="l${k}">${phraseMots(p.he)} ${sayBtn(p.he)}<small class="lt-fr" hidden>${esc(p.fr)}</small></p>`;
    const reponseHtml = () => {
      const morceaux = [LETTRES_FORMULES.salut, ...choix.filter(Boolean), LETTRES_FORMULES.bises];
      return `<div class="lt-papier moi">${morceaux.map((m, k) => `<p class="lt-phrase" data-ligne="r${k}">${phraseMots(m.he)} ${sayBtn(m.he)}<small class="lt-fr" hidden>${esc(m.fr)}</small></p>`).join('')}</div>`;
    };
    const dessiner = () => {
      const complet = choix.every(Boolean);
      app.innerHTML = `<div class="q-head"><a href="#/lettres">← Les lettres</a><span>💌 Lettre ${L.num} · ${esc(L.titre)}</span></div>
        <div class="lt-papier">
          <p class="lt-date">תֵּל אָבִיב · ${dateFr(deja ? deja.d : auj())}</p>
          ${phrases.map(ligne).join('')}
        </div>
        <div class="row lt-outils"><button class="btn ghost" id="ltEcoute">🔊 Écouter la lettre</button><button class="btn ghost" id="ltTrad">🇫🇷 Traduction</button></div>
        <h3>${deja ? 'Ta réponse' : 'Réponds à Noa'}</h3>
        ${deja ? reponseHtml() : `${L.questions.map((q, k) => `<div class="lt-question"><p><b>${esc(q.fr)}</b></p><div class="lt-options">${q.options.map((o) => `<button type="button" class="opt lt-opt${choix[k] === o ? ' on' : ''}" data-q="${k}" data-c="${o.cle}"><span class="he" lang="he" dir="rtl">${esc(o.he)}</span><small>${esc(o.fr)}</small></button>`).join('')}</div></div>`).join('')}
          ${complet ? `<p class="sub">Ta lettre :</p>${reponseHtml()}<p class="center"><button class="btn gold" id="ltEnvoi">📨 Envoyer ma réponse</button></p>` : ''}`}
        ${deja ? `<p class="hint center">${LETTRES_NOA.find((x) => x.num === L.num + 1) ? (dispoL(L.num + 1) ? `<a href="#/lettres/${L.num + 1}">Noa t’a répondu : lire sa lettre →</a>` : `Noa te répondra ${dans(sortieL(L.num + 1))}.`) : 'C’était la dernière lettre… pour l’instant !'}</p>` : ''}`;
      brancherBulle(app);
      $('#ltTrad').onclick = () => $$('.lt-fr').forEach((x) => { x.hidden = !x.hidden; });
      $('#ltEcoute').onclick = () => lireSuite(phrases.map((p) => p.he));
      $$('.lt-opt').forEach((b) => (b.onclick = () => { const q = L.questions[+b.dataset.q]; choix[+b.dataset.q] = q.options.find((o) => o.cle === b.dataset.c); dessiner(); }));
      const envoi = $('#ltEnvoi');
      if (envoi) envoi.onclick = () => {
        st.rep[L.num] = { r: choix.map((c) => c.cle), d: auj() };
        addXP(15); save();
        toast('📨 Réponse envoyée à Noa · +15 XP');
        lettres(L.num);
      };
    };
    dessiner();
  }
  routes.lettres = lettres;

  /* ====================== 3. Les nombres en vrai ====================== */
  const CATS = {
    prix: { nom: '💰 Les prix', astuce: 'Le shekel est masculin : on dit שְׁלוֹשָׁה שְׁקָלִים, עֶשְׂרִים וַחֲמִשָּׁה שְׁקָלִים. (Dans la rue, tu entendras souvent la forme féminine, plus relâchée.)', aide: 'Tape le prix en chiffres' },
    heure: { nom: '🕐 L’heure', astuce: 'Les heures sont au féminin, car on sous-entend שָׁעָה : שָׁלוֹשׁ וָחֵצִי, רֶבַע לְאַרְבַּע (4 h moins le quart).', aide: 'Tape l’heure, par exemple 3:15' },
    age: { nom: '🎂 Les âges', astuce: 'On dit « fils de… » ou « fille de… » : בֶּן ou בַּת, puis le nombre au féminin (car שָׁנִים, « années », est féminin).', aide: 'Tape l’âge en chiffres' },
    tel: { nom: '📞 Les numéros', astuce: 'Chiffre par chiffre, au féminin : אֶפֶס, אַחַת, שְׁתַּיִם, שָׁלוֹשׁ… Les portables commencent par 05.', aide: 'Tape le numéro (10 chiffres)' },
  };
  const PAR_TOUR = 10;
  const lireReponse = (cat, v) => {
    const s = String(v).trim();
    if (cat === 'heure') { const m = s.match(/(\d{1,2})\s*[:h.,\s]\s*(\d{1,2})?/i) || s.match(/^(\d{1,2})$/); if (!m) return null; const h = +m[1] % 12 || 12, mn = +(m[2] || 0); return `${h}:${String(mn).padStart(2, '0')}`; }
    const chiffres = s.replace(/\D/g, '');
    return chiffres ? (cat === 'tel' ? chiffres : String(+chiffres)) : null;
  };
  function chiffres(cat) {
    if (!CATS[cat] && cat !== 'tout') {
      const st = S.chiffres || {};
      app.innerHTML = `<div class="q-head"><a href="#/jeux">← Jeux</a><span>🔢 Les nombres en vrai</span></div>
        <h2>Les nombres en vrai</h2>
        <p class="sub">Tu entends un prix, une heure, un âge ou un numéro de téléphone, comme dans la vraie vie, et tu le tapes en chiffres. Le piège de l’hébreu : le nombre change selon que ce qu’on compte est masculin ou féminin.</p>
        <div class="rc-niveaux">${Object.entries(CATS).map(([k, c]) => `<a class="card rc-niveau" href="#/chiffres/${k}"><b>${c.nom}</b><small>${st[k] ? `meilleur score ${st[k]}/${PAR_TOUR}` : `${PAR_TOUR} questions`}</small></a>`).join('')}
          <a class="card rc-niveau" href="#/chiffres/tout"><b>🎲 Tout mélangé</b><small>${st.tout ? `meilleur score ${st.tout}/${PAR_TOUR}` : `${PAR_TOUR} questions`}</small></a></div>`;
      return;
    }
    const pool = NOMBRES_VRAIS.filter((x) => cat === 'tout' || x.cat === cat);
    const serie = pick(pool, PAR_TOUR);
    let i = 0, bons = 0;
    const question = () => {
      if (i >= serie.length) return fin();
      const q = serie[i], c = CATS[q.cat];
      app.innerHTML = `<div class="q-head"><a href="#/chiffres">← Catégories</a><span>🔢 ${i + 1}/${serie.length} · ${c.nom}</span></div>
        <div class="card nb-carte">
          <button class="btn gold nb-ecoute" id="nbEcoute">🔊 Écouter</button>
          <form id="nbForm" class="nb-form"><input class="input nb-saisie" id="nbSaisie" ${q.cat === 'heure' ? 'inputmode="text" placeholder="h:mm"' : 'inputmode="numeric" placeholder="…"'} autocomplete="off" aria-label="${esc(c.aide)}"><button class="btn" type="submit">Vérifier</button></form>
          <p class="hint">${esc(c.aide)}</p>
          <div id="nbRes"></div>
          <details class="nb-astuce"><summary>💡 L’astuce</summary><p>${texteHe(c.astuce)}</p></details>
        </div>`;
      const ecouter = () => speak(q.he);
      $('#nbEcoute').onclick = ecouter; later(ecouter, 300);
      $('#nbSaisie').focus();
      $('#nbForm').onsubmit = (e) => {
        e.preventDefault();
        const r = lireReponse(q.cat, $('#nbSaisie').value);
        if (!r) return;
        const ok = r === lireReponse(q.cat, q.rep);
        if (ok) bons++;
        $('#nbSaisie').disabled = true; $('#nbForm button').disabled = true;
        $('#nbRes').innerHTML = `<div class="nb-bilan ${ok ? 'ok' : 'ko'}"><b>${ok ? '✓ Bravo !' : `Non : c’était ${esc(q.cat === 'tel' ? q.fr : q.rep)}`}</b>
          <div class="nb-he">${HE(q.he)}${sayBtn(q.he)}</div><small>${esc(q.fr)}</small></div>
          <p class="center"><button class="btn gold" id="nbSuite">${i + 1 < serie.length ? 'Suivant →' : 'Voir mon score'}</button></p>`;
        $('#nbSuite').onclick = () => { i++; question(); };
        $('#nbSuite').focus();
      };
    };
    const fin = () => {
      S.chiffres = S.chiffres || {}; S.chiffres[cat] = Math.max(S.chiffres[cat] || 0, bons);
      addXP(bons); save();
      app.innerHTML = `<div class="card center result"><div class="em">🔢</div><h2>${bons} / ${serie.length}</h2><p class="sub">+${bons} XP</p>
        <div class="row" style="justify-content:center"><a class="btn gold" href="#/chiffres/${cat}" id="nbEncore">Rejouer</a><a class="btn ghost" href="#/chiffres">Autre catégorie</a></div></div>`;
      $('#nbEncore').onclick = (e) => { e.preventDefault(); chiffres(cat); };
    };
    question();
  }
  // Un texte français avec quelques mots hébreux : on les met en forme
  const texteHe = (t) => esc(t).replace(/([֐-׿][֐-׿\s]*[֐-׿])/g, (m) => HE(m));
  routes.chiffres = chiffres;

  /* ====================== Les chemins vers ces pages ====================== */
  // Accueil : un bandeau quand un épisode ou une lettre arrive
  const accueilAvant = routes[''];
  routes[''] = (...args) => {
    accueilAvant(...args);
    const ep = nouvelEpisode(), lt = nouvelleLettre();
    const bandeaux = [ep ? `<a class="ac-fete hb-neuf" href="#/feuilleton/${ep.num}"><span>📺</span><span><b>${ep.num === 1 && !S.feuilleton ? 'Nouveau : un feuilleton !' : `Nouvel épisode : ${esc(ep.titre)}`}</b> <small>La lettre cachée · épisode ${ep.num}</small></span><i>›</i></a>` : '',
      lt ? `<a class="ac-fete hb-neuf" href="#/lettres/${lt.num}"><span>💌</span><span><b>${lt.num === 1 && !S.lettres ? 'Noa t’écrit !' : 'Nouvelle lettre de Noa'}</b> <small>${esc(lt.titre)}</small></span><i>›</i></a>` : ''].join('');
    const ciel = $('.ac-ciel');
    if (bandeaux && ciel) ciel.insertAdjacentHTML('afterend', bandeaux);
  };
  // Histoires : le feuilleton et les lettres en tête
  const histoireAvant = routes.histoire;
  routes.histoire = (...args) => {
    histoireAvant(...args);
    if (args[0]) return;
    const h2 = $('#app > h2');
    if (h2) h2.insertAdjacentHTML('beforebegin', `<div class="hb-entrees">
      <a class="card hb-entree" href="#/feuilleton"><span>📺</span><span><b>Le feuilleton : La lettre cachée</b><small>${nouvelEpisode() ? '▶ un épisode t’attend' : `${Object.keys((S.feuilleton || {}).vus || {}).length}/${FEUILLETON.length} épisodes vus`}</small></span><i>›</i></a>
      <a class="card hb-entree" href="#/lettres"><span>💌</span><span><b>Les lettres de Noa</b><small>${nouvelleLettre() ? 'une lettre t’attend' : `${Object.keys((S.lettres || {}).rep || {}).length}/${LETTRES_NOA.length} lettres`}</small></span><i>›</i></a></div>`);
  };
  // Salle de jeux : les nombres en vrai
  const jeuxAvant = routes.jeux;
  routes.jeux = (...args) => {
    jeuxAvant(...args);
    const g = $('.jv-grille');
    if (g) g.insertAdjacentHTML('beforeend', `<a class="jv-carte" href="#/chiffres" style="--c1:#c4733a;--c2:#8a3a5a">
      <span class="he jv-he" lang="he" dir="rtl" aria-hidden="true">מִסְפָּרִים</span>
      <span class="jv-em">🔢</span><b>Les nombres en vrai</b><small>Prix, heures, âges et numéros de téléphone à l’oreille.</small>
      <span class="jv-bas"><span class="jv-info">4 catégories</span><span class="jv-jouer">Jouer →</span></span></a>`);
  };
  if (/^#\/(feuilleton|lettres|chiffres|histoire|jeux)?$|^#\/(feuilleton|lettres|chiffres)\//.test(location.hash) || location.hash === '' || location.hash === '#/') route();
})();
