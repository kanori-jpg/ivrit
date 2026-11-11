'use strict';
/* ============ Reconstruire des phrases (#/ordre) et test de niveau (#/niveau) ============ */
(() => {
  /* ---------- Les phrases du site ---------- */
  let PHRASES = null;
  function phrases() {
    if (PHRASES) return PHRASES;
    const c = [], vus = new Set();
    const ajoute = (he, fr, src) => {
      if (!he || !fr || /[«»"״]/.test(he) || vus.has(he)) return;
      const mots = he.trim().split(/\s+/);
      if (mots.length < 3 || mots.length > 9) return;
      vus.add(he); c.push({ he, fr, src, mots });
    };
    [...STORIES, ...STORIES_VIE].forEach((s) => s.lines.forEach((l) => { ajoute(l.he, l.fr, 'histoire'); (l.choices || []).filter((x) => x.ok).forEach((x) => ajoute(x.he, x.fr, 'histoire')); }));
    if (typeof PRESSE !== 'undefined') PRESSE.forEach((a) => a.sentences.forEach((s) => ajoute(s.he, s.fr, 'journal')));
    if (typeof GRAMMAIRE !== 'undefined') GRAMMAIRE.forEach((l) => (l.exemples || []).forEach((e) => ajoute(e.he, e.fr, 'grammaire')));
    if (typeof EXPRESSIONS !== 'undefined') EXPRESSIONS.forEach((x) => x.ex && ajoute(x.ex.he, x.ex.fr, 'expression'));
    return (PHRASES = c);
  }
  const propre = (m) => NFC(m).replace(/[.,!?:;…]+$/u, '');

  /* ---------- 1. Reconstruire des phrases ---------- */
  const NIVEAUX_ORDRE = { facile: [3, 4, '🌱 Facile', '3 ou 4 mots'], moyen: [5, 6, '🌿 Moyen', '5 ou 6 mots'], difficile: [7, 9, '🌳 Difficile', '7 à 9 mots'] };
  const PAR_PARTIE = 8;
  function ordre(niveau) {
    if (!NIVEAUX_ORDRE[niveau]) {
      const st = S.ordre || { parties: 0, reussies: 0 };
      app.innerHTML = `<div class="q-head"><a href="#/jeux">← Jeux</a><span>🧩 Reconstruire des phrases</span></div>
        <h2>Reconstruire des phrases</h2>
        <p class="sub">On te donne une phrase en français et ses mots en hébreu, mélangés. Touche-les dans l’ordre pour reformer la phrase : l’hébreu se lit de droite à gauche. Les phrases viennent des histoires, du journal et de la grammaire.</p>
        ${st.parties ? `<p class="hint">${st.reussies} phrase${st.reussies > 1 ? 's' : ''} reconstruite${st.reussies > 1 ? 's' : ''} du premier coup en ${st.parties} partie${st.parties > 1 ? 's' : ''}.</p>` : ''}
        <div class="rc-niveaux">${Object.entries(NIVEAUX_ORDRE).map(([k, [, , nom, desc]]) => `<a class="card rc-niveau" href="#/ordre/${k}"><b>${nom}</b><small>${desc} · ${PAR_PARTIE} phrases</small></a>`).join('')}</div>`;
      return;
    }
    const [min, max, nom] = NIVEAUX_ORDRE[niveau];
    const serie = pick(phrases().filter((p) => p.mots.length >= min && p.mots.length <= max), PAR_PARTIE);
    let i = 0, justes = 0, xp = 0;
    const suivante = () => {
      if (i >= serie.length) return fin();
      const p = serie[i];
      // Des tuiles mélangées (jamais déjà dans le bon ordre)
      let tuiles = p.mots.map((m, k) => ({ k, m: m.replace(/[.,!?:;…]+$/u, '') }));
      do { tuiles = shuffle(tuiles); } while (tuiles.length > 1 && tuiles.every((t, k) => t.k === k));
      const pose = [];
      let indice = false, verifie = false;
      const dessiner = () => {
        app.innerHTML = `<div class="q-head"><a href="#/ordre">← Niveaux</a><span>🧩 ${nom} · ${i + 1}/${serie.length}</span></div>
          <div class="card rc-carte">
            <p class="rc-consigne">Remets les mots dans l’ordre :</p>
            <p class="rc-fr">« ${esc(p.fr)} »</p>
            <div class="rc-reponse${verifie ? (juste() ? ' ok' : ' ko') : ''}" dir="rtl" lang="he">${pose.length ? pose.map((t, k) => `<button type="button" class="rc-tuile posee${verifie && !juste() ? (propre(t.m) === propre(p.mots[k]) ? ' bien' : ' mal') : ''}" data-p="${k}"${verifie ? ' disabled' : ''}>${esc(t.m)}</button>`).join('') : '<span class="rc-vide">Touche les mots ci-dessous</span>'}</div>
            <div class="rc-tuiles" dir="rtl" lang="he">${tuiles.map((t, k) => (pose.includes(t) ? '' : `<button type="button" class="rc-tuile" data-t="${k}"${verifie ? ' disabled' : ''}>${esc(t.m)}</button>`)).join('')}</div>
            ${verifie ? `<div class="rc-bilan">${juste() ? '<b>✓ Bravo !</b>' : `<b>Presque !</b> La phrase était :`}<div class="rc-solution">${HE(p.he)}${sayBtn(p.he)}</div></div>
              <p class="center"><button class="btn gold" id="rcSuite">${i + 1 < serie.length ? 'Phrase suivante →' : 'Voir mon score'}</button></p>`
            : `<div class="row rc-boutons"><button class="btn ghost" id="rcIndice">🔊 Indice : écouter</button><button class="btn ghost" id="rcEffacer"${pose.length ? '' : ' disabled'}>↺ Effacer</button><button class="btn gold" id="rcVerif"${pose.length === tuiles.length ? '' : ' disabled'}>Vérifier</button></div>`}
          </div>`;
        $$('.rc-tuiles .rc-tuile').forEach((b) => (b.onclick = () => { pose.push(tuiles[+b.dataset.t]); dessiner(); }));
        $$('.rc-reponse .rc-tuile').forEach((b) => (b.onclick = () => { pose.splice(+b.dataset.p, 1); dessiner(); }));
        if (verifie) { $('#rcSuite').onclick = () => { i++; suivante(); }; return; }
        $('#rcIndice').onclick = () => { indice = true; speak(p.he); };
        $('#rcEffacer').onclick = () => { pose.length = 0; dessiner(); };
        $('#rcVerif').onclick = () => {
          verifie = true;
          if (juste()) { justes++; const gain = indice ? 1 : 2; xp += gain; S.ordre = S.ordre || { parties: 0, reussies: 0 }; if (!indice) S.ordre.reussies++; }
          dessiner(); speak(p.he);
        };
      };
      const juste = () => pose.length === p.mots.length && pose.every((t, k) => propre(t.m) === propre(p.mots[k]));
      dessiner();
    };
    const fin = () => {
      S.ordre = S.ordre || { parties: 0, reussies: 0 }; S.ordre.parties++;
      addXP(xp); save();
      app.innerHTML = `<div class="card center result"><div class="em">🧩</div><h2>${justes} / ${serie.length} phrases</h2>
        <p class="sub">+${xp} XP${justes === serie.length ? ' · un sans-faute !' : ''}</p>
        <div class="row" style="justify-content:center"><a class="btn gold" href="#/ordre/${niveau}" id="rcEncore">Rejouer</a><a class="btn ghost" href="#/ordre">Changer de niveau</a></div></div>`;
      $('#rcEncore').onclick = (e) => { e.preventDefault(); ordre(niveau); };
    };
    suivante();
  }
  routes.ordre = ordre;

  /* ---------- 2. Test de niveau ---------- */
  const THEMES_NIVEAU = {
    A1: ['salutations', 'nombres', 'couleurs', 'famille', 'nourriture', 'maison', 'nature', 'essentiels', 'petits', 'corps', 'vetements'],
    A2: ['dehors', 'lieux', 'verbes', 'voyage', 'temps', 'grandsnombres', 'atable', 'ville', 'etudes', 'decrire', 'animaux', 'cuisiner', 'saisons', 'gestes', 'menage', 'jardin', 'betes'],
    B1: ['verbes2', 'urgences', 'maisonplus', 'loisirs', 'fetes', 'mondes', 'boutiques', 'emotions', 'metiers', 'caractere', 'sante', 'numerique', 'conduire', 'argent', 'relations', 'travail', 'discuter', 'ecole'],
  };
  const PARTIES_NIVEAU = { A1: [0, 1], A2: [2, 3], B1: [4, 5, 6] };
  const DESCRIPTIONS = {
    'Pré-A1': 'Tu découvres l’hébreu : les premiers mots et les bases arrivent. Continue tes séances, le A1 n’est pas loin !',
    A1: 'Tu comprends et utilises des mots et des phrases très simples du quotidien : te présenter, saluer, compter, nommer ce qui t’entoure.',
    A2: 'Tu te débrouilles dans les situations courantes : courses, transports, rendez-vous. Tu comprends des phrases simples sans toujours avoir besoin des voyelles.',
    B1: 'Tu comprends l’essentiel de textes simples, même sans voyelles, et tu manies les temps et les constructions courantes. Bravo !',
  };
  const motsDuNiveau = (n) => WORDS.filter((w) => THEMES_NIVEAU[n].includes(w.theme));
  const exercicesGram = (n) => (typeof GRAMMAIRE_PARTIES === 'undefined' ? [] : PARTIES_NIVEAU[n].flatMap((k) => (GRAMMAIRE_PARTIES[k] || { ids: [] }).ids))
    .map((id) => GRAMMAIRE.find((l) => l.id === id)).filter(Boolean).flatMap((l) => (l.exercices || []).filter((e) => e.ok && e.non && e.non.length >= 2));
  const estHe = (t) => /[א-ת]/.test(t);

  // Les questions, du plus facile au plus difficile
  function preparerTest() {
    const qs = [];
    const vocab = (n, w, sens, sansVoy) => {
      const pool = motsDuNiveau(n);
      if (sens === 'fr') return { n, type: 'Vocabulaire', prompt: `<div class="nv-he">${HE(sansVoy ? strip(w.he) : w.he)}</div><p class="sub">${sansVoy ? 'Sans les voyelles : que veut dire ce mot ?' : 'Que veut dire ce mot ?'}</p>`, ok: w.fr, opts: options(w.fr, pool.map((x) => x.fr)) };
      return { n, type: 'Vocabulaire', prompt: `<div class="nv-fr">${esc(w.fr)}</div><p class="sub">Comment dit-on en hébreu ?</p>`, ok: w.he, opts: options(w.he, pool.map((x) => x.he)), he: true };
    };
    const ecoute = (n, w) => ({ n, type: 'Écoute', prompt: `<button class="btn gold nv-ecoute" data-say="${esc(w.he)}">🔊 Écouter</button><p class="sub">Écoute et choisis le sens</p>`, ok: w.fr, opts: options(w.fr, motsDuNiveau(n).map((x) => x.fr)), say: w.he });
    const gram = (n, e) => ({ n, type: 'Grammaire', prompt: `<p class="nv-q">${texteGram(e.q)}</p>`, ok: e.ok, opts: shuffle([e.ok, ...pick(e.non, 3)]), he: estHe(e.ok) });
    const phrase = (n, p, sansVoy, autres) => ({ n, type: sansVoy ? 'Lecture sans voyelles' : 'Lecture', prompt: `<div class="nv-phrase">${HE(sansVoy ? strip(p.he) : p.he)}</div><p class="sub">Que veut dire cette phrase ?</p>`, ok: p.fr, opts: shuffle([p.fr, ...pick(autres.filter((x) => x.fr !== p.fr), 2).map((x) => x.fr)]) });
    const ph = phrases(), histoires = ph.filter((p) => p.src === 'histoire'), journal = ph.filter((p) => p.src === 'journal');
    // A1 : 6 questions
    const a1 = pick(motsDuNiveau('A1'), 4);
    qs.push(vocab('A1', a1[0], 'fr'), vocab('A1', a1[1], 'fr'), vocab('A1', a1[2], 'he'), ecoute('A1', a1[3]), ...pick(exercicesGram('A1'), 2).map((e) => gram('A1', e)));
    // A2 : 7 questions
    const a2 = pick(motsDuNiveau('A2'), 3);
    qs.push(vocab('A2', a2[0], 'he'), vocab('A2', a2[1], 'fr'), vocab('A2', a2[2], 'fr', true), ...pick(exercicesGram('A2'), 2).map((e) => gram('A2', e)), ...pick(histoires.filter((p) => p.mots.length <= 6), 2).map((p) => phrase('A2', p, false, histoires)));
    // B1 : 7 questions
    const b1 = pick(motsDuNiveau('B1'), 2);
    qs.push(vocab('B1', b1[0], 'fr', true), vocab('B1', b1[1], 'he'), ...pick(exercicesGram('B1'), 3).map((e) => gram('B1', e)), ...pick(journal, 2).map((p) => phrase('B1', p, true, journal)));
    return qs;
  }
  const SEUILS = { A1: 4, A2: 5, B1: 5 }; // bonnes réponses à avoir dans chaque palier (sur 6, 7 et 7)
  function niveauAtteint(sc) {
    let n = 'Pré-A1';
    for (const p of ['A1', 'A2', 'B1']) { if (sc[p][0] >= SEUILS[p]) n = p; else break; }
    return n;
  }
  const dateFr = (k) => new Date(k + 'T00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  function niveau(etape) {
    const historique = S.niveaux || [];
    if (etape !== 'test') {
      const dernier = historique[historique.length - 1];
      const jours = dernier ? daysBetween(dernier.d, dayKey()) : null;
      app.innerHTML = `<div class="q-head"><a href="#/progres">← Mes progrès</a><span>🎓 Test de niveau</span></div>
        <h2>Test de niveau</h2>
        <p class="sub">20 questions de plus en plus difficiles (vocabulaire, écoute, grammaire, lecture avec puis sans voyelles) pour situer ton niveau, du A1 au B1. Environ 5 minutes. Le test ne touche pas à tes cartes.</p>
        ${dernier ? `<div class="card nv-dernier"><span class="nv-badge">${dernier.niveau}</span><div><b>Ton dernier résultat</b><small>le ${dateFr(dernier.d)}${jours !== null && jours < 30 ? ` · le prochain test est conseillé dans ${30 - jours} jour${30 - jours > 1 ? 's' : ''}, pour voir de vrais progrès` : ''}</small></div></div>` : ''}
        <p class="center"><a class="btn gold" href="#/niveau/test">${dernier ? 'Repasser le test' : 'Commencer le test'} →</a></p>
        ${historique.length > 1 ? `<h3>Mes résultats</h3><div class="card nv-histo">${historique.slice().reverse().map((h) => `<div><span class="nv-badge petit">${h.niveau}</span><span>${dateFr(h.d)}</span><small>A1 ${h.A1[0]}/${h.A1[1]} · A2 ${h.A2[0]}/${h.A2[1]} · B1 ${h.B1[0]}/${h.B1[1]}</small></div>`).join('')}</div>` : ''}
        <p class="hint">C’est une estimation à partir du contenu d’Ivrit, inspirée des niveaux européens (CECR) : pas un examen officiel.</p>`;
      return;
    }
    const qs = preparerTest();
    const sc = { A1: [0, 0], A2: [0, 0], B1: [0, 0] };
    let i = 0;
    const montrer = () => {
      if (i >= qs.length) return resultat();
      const q = qs[i];
      app.innerHTML = `<div class="q-head"><a href="#/niveau">← Abandonner</a><span>🎓 ${i + 1}/${qs.length} · ${q.type}</span></div>
        <div class="nv-barre"><i style="width:${(i / qs.length) * 100}%"></i></div>
        <div class="card nv-carte">${q.prompt}<div class="opts nv-opts">${q.opts.map((o) => `<button class="opt" data-o="${esc(o)}">${q.he && estHe(o) ? HE(o) : esc(o)}</button>`).join('')}</div></div>`;
      if (q.say) later(() => speak(q.say), 300);
      $$('.nv-opts .opt').forEach((b) => (b.onclick = () => {
        const bon = b.dataset.o === q.ok;
        sc[q.n][1]++; if (bon) sc[q.n][0]++;
        $$('.nv-opts .opt').forEach((x) => { x.disabled = true; if (x.dataset.o === q.ok) x.classList.add('ok'); });
        if (!bon) b.classList.add('ko');
        later(() => { i++; montrer(); }, bon ? 700 : 1500);
      }));
    };
    const resultat = () => {
      const n = niveauAtteint(sc);
      S.niveaux = [...(S.niveaux || []), { d: dayKey(), niveau: n, A1: sc.A1, A2: sc.A2, B1: sc.B1 }];
      addXP(10); save();
      const avant = historique[historique.length - 1];
      const ordreN = ['Pré-A1', 'A1', 'A2', 'B1'];
      const evol = avant ? (ordreN.indexOf(n) > ordreN.indexOf(avant.niveau) ? `🎉 Tu es passée de ${avant.niveau} à ${n} depuis le ${dateFr(avant.d)} !` : ordreN.indexOf(n) === ordreN.indexOf(avant.niveau) ? `Même niveau que le ${dateFr(avant.d)} : les progrès se voient sur plusieurs semaines.` : `Un peu moins bien que le ${dateFr(avant.d)} : un test ne dit pas tout, tes cartes continuent d’avancer.`) : '';
      app.innerHTML = `<div class="card center result nv-resultat">
        <p class="sub" style="margin:0">Ton niveau estimé</p>
        <div class="nv-badge grand">${n}</div>
        <p>${DESCRIPTIONS[n]}</p>
        ${evol ? `<p><b>${evol}</b></p>` : ''}
        <div class="nv-paliers">${['A1', 'A2', 'B1'].map((p) => `<div class="${sc[p][0] >= SEUILS[p] ? 'ok' : ''}"><b>${p}</b><span>${sc[p][0]}/${sc[p][1]}</span><small>${sc[p][0] >= SEUILS[p] ? 'validé' : `il en faut ${SEUILS[p]}`}</small></div>`).join('')}</div>
        <p class="hint">+10 XP · Repasse le test dans un mois pour mesurer tes progrès.</p>
        <div class="row" style="justify-content:center"><a class="btn gold" href="#/niveau">Mes résultats</a><a class="btn ghost" href="#/progres">Mes progrès</a></div></div>`;
    };
    montrer();
  }
  routes.niveau = niveau;
  window.IvritNiveau = { niveauAtteint, preparerTest }; // pour les vérifications

  /* ---------- Les chemins vers ces pages ---------- */
  // Une tuile dans la salle de jeux
  const jeuxAvant = routes.jeux;
  routes.jeux = (...args) => {
    jeuxAvant(...args);
    const g = $('.jv-grille');
    if (g) g.insertAdjacentHTML('beforeend', `<a class="jv-carte" href="#/ordre" style="--c1:#3f8a8a;--c2:#2f5a8a">
      <span class="he jv-he" lang="he" dir="rtl" aria-hidden="true">מִשְׁפָּט</span>
      <span class="jv-em">🧩</span><b>Reconstruire des phrases</b><small>Remets dans l’ordre les mots d’une phrase des histoires ou du journal.</small>
      <span class="jv-bas"><span class="jv-info">${S.ordre && S.ordre.parties ? `${S.ordre.reussies} phrase${S.ordre.reussies > 1 ? 's' : ''} du premier coup` : '3 niveaux'}</span><span class="jv-jouer">Jouer →</span></span></a>`);
  };
  // Une carte dans Mes progrès
  const progresAvant = routes.progres;
  routes.progres = (...args) => {
    progresAvant(...args);
    const dernier = (S.niveaux || []).slice(-1)[0];
    const carte = `<a class="card nv-entree" href="#/niveau"><span class="nv-badge">${dernier ? dernier.niveau : '?'}</span><span><b>🎓 Test de niveau</b><small>${dernier ? `Dernier résultat le ${dateFr(dernier.d)} · repasse-le chaque mois` : '20 questions pour situer ton niveau, du A1 au B1'}</small></span><i>›</i></a>`;
    const premier = app.firstElementChild;
    if (premier) premier.insertAdjacentHTML('afterend', carte); else app.insertAdjacentHTML('afterbegin', carte);
  };
  if (/^#\/(ordre|niveau|jeux|progres)/.test(location.hash)) route();
})();
