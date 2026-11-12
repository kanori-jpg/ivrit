'use strict';
/* ============ Le feuilleton en « vidéo » (#/feuilleton/N/video) ============
   Un petit dessin animé : le décor bouge (nuages, rideau, lampe, poussière), le personnage qui parle s'anime,
   les répliques s'enchaînent avec le son et les sous-titres, et la vidéo s'arrête quand c'est à toi de répondre.
   FEUILLETON_VIDEO[num] = { decor, persos: { qui: apparence }, plans: [état du gros plan pour chaque réplique] } */
const FEUILLETON_VIDEO = {
  1: {
    decor: 'appart',
    persos: { shira: { peau: '#eec3a1', cheveux: '#2b2230', coiffure: 'boucles', tenue: 'p-salopette', tenueSinon: 'p-pull' } },
    plans: ['env', 'env-date', 'env-nom', 'env-nom', 'env-ouverte', 'photo-cle'],
  },
};

(() => {
  /* ---------- Les décors ---------- */
  const FV_DECORS = {
    // Ton appartement de Tel-Aviv, en plein déménagement
    appart: () => {
      let planches = '';
      for (let i = -6; i <= 14; i++) { const x = i * 62; planches += `M${x} 330L${(400 + (x - 400) * 1.7).toFixed(0)} 450`; }
      const immeubles = [[522, 168, 46, 82, '#fbf6ec'], [566, 140, 40, 110, '#f3ead9'], [604, 182, 52, 68, '#fffaf2'], [654, 150, 36, 100, '#efe3cf'], [688, 176, 34, 74, '#f8f1e4']]
        .map(([x, y, w, h, c]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>${[...Array(Math.floor(h / 22)).keys()].map((r) => `<rect x="${x + 6}" y="${y + 8 + r * 22}" width="${w - 12}" height="5" rx="2" fill="#cfe0ea" opacity=".9"/>`).join('')}`).join('');
      const poussiere = [...Array(12).keys()].map((k) => `<circle class="fv-poussiere" cx="${470 + ((k * 53) % 200)}" cy="${250 + ((k * 37) % 120)}" r="${1.2 + (k % 3) * .6}" fill="#fff6d8" style="animation-delay:-${(k * 1.3).toFixed(1)}s"/>`).join('');
      return `<defs>
        <linearGradient id="fvMur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7ecdc"/><stop offset="1" stop-color="#ead6bb"/></linearGradient>
        <linearGradient id="fvCiel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fc6ee"/><stop offset=".75" stop-color="#cfe6f2"/><stop offset="1" stop-color="#f6e2c4"/></linearGradient>
        <linearGradient id="fvSol" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c99a6e"/><stop offset="1" stop-color="#a5754d"/></linearGradient>
        <linearGradient id="fvRayon" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3d0" stop-opacity=".55"/><stop offset="1" stop-color="#fff3d0" stop-opacity="0"/></linearGradient>
        <radialGradient id="fvHalo"><stop offset="0" stop-color="#fff2c2" stop-opacity=".9"/><stop offset="1" stop-color="#fff2c2" stop-opacity="0"/></radialGradient>
        <clipPath id="fvVitre"><rect x="520" y="60" width="200" height="190" rx="8"/></clipPath>
      </defs>
      <rect width="800" height="330" fill="url(#fvMur)"/>
      <rect width="800" height="330" fill="#fff" opacity=".04"/>
      <rect y="318" width="800" height="12" fill="#fffaf2" opacity=".7"/>
      <rect y="330" width="800" height="120" fill="url(#fvSol)"/>
      <path d="${planches}" stroke="#7d5535" stroke-width="1.300" opacity=".35"/>
      <!-- La fenêtre sur Tel-Aviv -->
      <g clip-path="url(#fvVitre)">
        <rect x="520" y="60" width="200" height="190" fill="url(#fvCiel)"/>
        <circle cx="664" cy="106" r="44" fill="url(#fvHalo)" class="fv-soleil"/><circle cx="664" cy="106" r="18" fill="#fff4c4"/>
        <g class="fv-nuages"><ellipse cx="560" cy="96" rx="26" ry="8" fill="#fff"/><ellipse cx="574" cy="90" rx="14" ry="8" fill="#fff"/><ellipse cx="690" cy="132" rx="20" ry="6" fill="#fff" opacity=".9"/></g>
        <rect x="520" y="200" width="200" height="12" fill="#6fb2d8"/>
        ${immeubles}
        <path d="M700 250Q696 214 704 188" stroke="#8a6a46" stroke-width="5" fill="none"/>
        <g class="fv-palme"><path d="M704 188Q680 178 664 190M704 188Q690 168 672 166M704 188Q716 166 734 170M704 188Q728 182 740 196M704 188Q702 170 708 156" stroke="#5f9a5c" stroke-width="5" fill="none" stroke-linecap="round"/></g>
      </g>
      <rect x="520" y="60" width="200" height="190" rx="8" fill="none" stroke="#fffaf3" stroke-width="10"/>
      <path d="M620 60V250M520 152H720" stroke="#fffaf3" stroke-width="6"/>
      <rect x="506" y="248" width="228" height="12" rx="4" fill="#fffaf3"/><rect x="506" y="258" width="228" height="4" fill="#000" opacity=".06"/>
      <path class="fv-rideau" d="M486 40H530Q522 120 528 200Q532 250 520 296H478Q490 240 486 200Q480 120 486 40Z" fill="#f2bfcb" opacity=".85"/>
      <rect x="476" y="34" width="268" height="8" rx="4" fill="#b98a5e"/>
      <path d="M470 262L540 250H710L790 330H420Z" fill="url(#fvRayon)" opacity=".6"/>
      ${poussiere}
      <!-- Un cadre resté de travers -->
      <g transform="rotate(-6 150 110)"><rect x="104" y="72" width="92" height="74" rx="3" fill="#fff" stroke="#9b7653" stroke-width="5"/><path d="M110 140L140 108L160 128L172 116L190 140Z" fill="#9fc7a8"/><circle cx="174" cy="92" r="8" fill="#f4c56a"/></g>
      <path d="M150 50L150 66" stroke="#8a7a6a" stroke-width="1.500"/>
      <!-- La lampe qui se balance -->
      <g class="fv-lampe"><path d="M360 0V58" stroke="#5b4a5e" stroke-width="2"/><path d="M336 58H384L398 88H322Z" fill="#f6d9a2"/><ellipse cx="360" cy="90" rx="38" ry="6" fill="#fff4cf" opacity=".55"/></g>
      <!-- La commode, avec le tiroir sorti -->
      <rect x="54" y="214" width="190" height="116" rx="6" fill="#b37c52"/><rect x="54" y="208" width="196" height="10" rx="4" fill="#9a6642" transform="translate(-3 0)"/>
      <rect x="66" y="226" width="166" height="28" rx="3" fill="#c48c60"/><circle cx="149" cy="240" r="4" fill="#e8c27a"/>
      <rect x="66" y="260" width="166" height="28" rx="3" fill="#3b2a24"/><rect x="72" y="266" width="154" height="16" fill="#2a1d19"/>
      <rect x="66" y="294" width="166" height="28" rx="3" fill="#c48c60"/><circle cx="149" cy="308" r="4" fill="#e8c27a"/>
      <g transform="translate(96 374) rotate(-8)"><path d="M0 0H150L162 30H-10Z" fill="#a36f47"/><rect x="-10" y="30" width="172" height="26" rx="3" fill="#c48c60"/><circle cx="76" cy="43" r="4" fill="#e8c27a"/></g>
      <!-- Les cartons du déménagement -->
      <g><rect x="684" y="318" width="108" height="86" rx="3" fill="#d6aa72"/><path d="M684 338H792" stroke="#c49558" stroke-width="2"/><rect x="730" y="318" width="16" height="86" fill="#efd9a8" opacity=".8"/>
        <rect x="700" y="262" width="82" height="58" rx="3" fill="#e0b67e"/><rect x="734" y="262" width="14" height="58" fill="#f2dfb2" opacity=".8"/></g>
      <!-- La plante -->
      <g transform="translate(455 330)"><g class="fv-plante"><path d="M0 0Q-4-30-20-52M0 0Q2-36 8-62M0 0Q8-26 26-44M0 0Q-10-20-30-28" stroke="#4f8a5f" stroke-width="4" fill="none" stroke-linecap="round"/><g fill="#6aa772"><ellipse cx="-20" cy="-54" rx="10" ry="6" transform="rotate(-40 -20 -54)"/><ellipse cx="8" cy="-64" rx="7" ry="11"/><ellipse cx="27" cy="-46" rx="10" ry="6" transform="rotate(35 27 -46)"/><ellipse cx="-31" cy="-29" rx="9" ry="5" transform="rotate(-15 -31 -29)"/></g></g><path d="M-16 0H16L12 26H-12Z" fill="#d07a5a"/></g>`;
    },
  };

  /* ---------- Le gros plan sur les objets (180 × 150) ---------- */
  const enveloppe = (ouverte) => `<rect x="25" y="38" width="130" height="80" rx="4" fill="#ecd7a6" stroke="#b39257" stroke-width="2"/>
    <circle cx="48" cy="100" r="9" fill="#d9bd85" opacity=".6"/><circle cx="130" cy="58" r="6" fill="#d9bd85" opacity=".5"/>
    ${ouverte ? '<path d="M25 38L90 4L155 38Z" fill="#e3cb93" stroke="#b39257" stroke-width="2"/><rect x="40" y="16" width="100" height="40" rx="2" fill="#fbf6ea" stroke="#d6c8a8"/><path d="M50 28H128M50 36H120M50 44H110" stroke="#8a90c0" stroke-width="1.500"/>'
      : '<path d="M25 38L90 82L155 38" fill="none" stroke="#b39257" stroke-width="2"/>'}
    <rect x="130" y="44" width="18" height="22" rx="1" fill="#d98a8a" stroke="#fff" stroke-width="2"/>`;
  const PLANS = {
    env: () => enveloppe(false),
    'env-date': () => `${enveloppe(false)}<text x="34" y="111" class="fv-main">1962</text>`,
    'env-nom': () => `${enveloppe(false)}<text x="34" y="111" class="fv-main">1962</text><text x="108" y="102" class="fv-main he" direction="rtl" text-anchor="end">לְיוֹסֵף</text>`,
    'env-ouverte': () => enveloppe(true),
    'photo-cle': () => `<g transform="rotate(-7 70 75)"><rect x="14" y="20" width="104" height="112" rx="3" fill="#fbf7ee" stroke="#d6cbb4" stroke-width="2"/>
        <rect x="22" y="28" width="88" height="80" fill="#bcd9e8"/><rect x="22" y="80" width="88" height="28" fill="#6fa9c9"/><path d="M22 84Q44 78 66 84T110 82" stroke="#e6f3f8" stroke-width="2" fill="none"/>
        <circle cx="66" cy="62" r="8" fill="#f0c9a8"/><path d="M58 60Q60 48 66 50Q74 48 74 60Q72 54 66 54Q60 54 58 60Z" fill="#5a3a2c"/><path d="M56 104Q58 74 66 72Q74 74 76 104Z" fill="#f4f1ea"/><path d="M63 64Q66 67 69 64" stroke="#b05060" stroke-width="1.300" fill="none"/></g>
      <g transform="translate(138 92) rotate(28)" class="fv-cle"><circle r="12" fill="none" stroke="#e2b54a" stroke-width="5"/><path d="M12 0H40M30 0V8M36 0V6" stroke="#e2b54a" stroke-width="5" stroke-linecap="round"/></g>
      <g class="fv-brille"><path d="M156 60L159 68L167 71L159 74L156 82L153 74L145 71L153 68Z" fill="#fff6c8"/><path d="M126 112L128 117L133 119L128 121L126 126L124 121L119 119L124 117Z" fill="#fff6c8"/></g>`,
  };

  const persoDe = (cfg) => {
    const base = Object.assign({}, typeof CH_PERSO_DEFAUT !== 'undefined' ? CH_PERSO_DEFAUT : {});
    const moi = Object.assign({}, base, S.perso || {});
    const p = Object.assign({}, base, cfg);
    if (cfg.tenueSinon && moi.tenue === cfg.tenue) p.tenue = cfg.tenueSinon; // jamais la même tenue que toi
    if (typeof CH_TENUES !== 'undefined' && !CH_TENUES[p.tenue]) p.tenue = '';
    return p;
  };

  function video(num) {
    const ep = FEUILLETON.find((e) => String(e.num) === String(num)), cfg = FEUILLETON_VIDEO[num];
    const st = S.feuilleton || (S.feuilleton = { debut: dayKey(), vus: {} });
    const sortie = (n) => { const d = new Date(st.debut + 'T00:00'); d.setDate(d.getDate() + 7 * (n - 1)); return dayKey(d); };
    const dispo = (n) => n === 1 || (!!st.vus[n - 1] && sortie(n) <= dayKey());
    if (!ep || !cfg || (!dispo(ep.num) && !st.vus[ep.num])) { location.hash = '#/feuilleton'; return; }
    const quiParle = [...new Set(ep.lignes.map((l) => l.qui))];
    const autre = quiParle[0];
    const moiP = Object.assign({}, typeof CH_PERSO_DEFAUT !== 'undefined' ? CH_PERSO_DEFAUT : {}, S.perso || {});
    const autreP = persoDe(cfg.persos[autre] || {});
    const autresReps = FEUILLETON.filter((e) => e !== ep).flatMap((e) => e.lignes.filter((l) => l.rep).map((l) => l.rep));
    let fr = !!S.videoFr, lent = false;
    const etroit = matchMedia('(max-width: 600px)').matches;

    app.innerHTML = `<div class="q-head"><a href="#/feuilleton/${ep.num}">← Version à lire</a><span>🎬 Épisode ${ep.num} · ${esc(ep.titre)}</span></div>
      <div class="fv-ecran" id="fvEcran">
      <div class="fv-scene" id="fvScene" style="aspect-ratio:${etroit ? '560 / 450' : '16 / 9'}">
        <svg viewBox="${etroit ? '150 0 560 450' : '0 0 800 450'}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(ep.lieu)}">
          ${FV_DECORS[cfg.decor]()}
          <g class="fv-perso" id="fvAutre" transform="translate(255 446) scale(1.2)"><g class="fv-corps">${persoSvg(autreP)}</g></g>
          <g class="fv-perso" id="fvMoi" transform="translate(590 446) scale(1.2)"><g class="fv-corps">${persoSvg(moiP)}</g></g>
          <g class="fv-gros" id="fvGros" transform="translate(310 20)"><rect width="180" height="150" rx="16" fill="#fffdf8" stroke="#fff" stroke-width="6"/><rect width="180" height="150" rx="16" fill="none" stroke="#2b1f3a" stroke-opacity=".12" stroke-width="1"/><g id="fvGrosContenu"></g></g>
        </svg>
        <div class="fv-lieu">📍 ${esc(ep.lieu)}</div>
        <button type="button" class="fv-debut" id="fvDebut"><span class="fv-clap">🎬</span><small>Épisode ${ep.num}</small><b>${esc(ep.titre)}</b><span class="fv-go">▶ Regarder</span></button>
        <div class="fv-fin" id="fvFin" hidden></div>
      </div>
      <div class="fv-st" id="fvSous"><p class="fv-aide">Touche ▶ pour lancer l’épisode. Pendant la vidéo, touche un mot des sous-titres pour avoir son sens.</p></div>
      <div class="fv-ctrl">
        <button type="button" id="fvPrec" title="Réplique précédente" aria-label="Réplique précédente">⏮</button>
        <button type="button" id="fvPlay" class="fv-play" title="Pause" aria-label="Pause">⏸</button>
        <button type="button" id="fvRe" title="Réécouter la réplique" aria-label="Réécouter la réplique">🔁</button>
        <button type="button" id="fvLent" title="Plus lentement" aria-label="Plus lentement">🐢</button>
        <span class="fv-prog" id="fvProg"></span>
        <label class="fv-frbtn"><input type="checkbox" id="fvFr" ${fr ? 'checked' : ''}> FR</label>
      </div>
      </div>`;

    const scene = $('#fvScene'), sous = $('#fvSous');
    const bulle = document.createElement('div'); bulle.className = 'bulle-mot'; bulle.hidden = true;
    const n = ep.lignes.length;
    let i = 0, jeton = 0, pause = false, phase = 'ligne';
    const vivant = () => scene.isConnected;
    const dodo = (ms) => new Promise((r) => setTimeout(r, ms));
    const attendrePause = async () => { while (pause && vivant()) await dodo(150); };
    const lecteur = new Audio();
    lecteur.preload = 'auto';
    const fichierSon = (texte) => {
      const k = NFC(texte);
      const humain = HUMAN[k] && !((S.sonsAvis[k] === 'faux' || (window.SONS_REFAITS || {})[k]) && SOUNDS[k]);
      return humain ? 'humain/' + HUMAN[k].fichier : SOUNDS[k] ? `${SOUNDS[k]}?v=2` : null;
    };
    // Lit un texte avec le lecteur de la vidéo ; sans fichier son, la voix de l'appareil prend le relais
    const parler = (texte) => new Promise((res) => {
      stopAudio();
      const f = fichierSon(texte);
      if (!f) { speak(texte).then(res); return; }
      let fini = false;
      const done = () => { if (fini) return; fini = true; if (endSpeech === done) endSpeech = null; res(); };
      endSpeech = done; player = lecteur;
      lecteur.onended = done; lecteur.onerror = done;
      lecteur.src = 'audio/' + f;
      lecteur.playbackRate = lent ? 0.75 : 1;
      lecteur.play().catch(() => { if (!pause) done(); });
    });
    window.addEventListener('hashchange', () => { lecteur.pause(); }, { once: true });
    const anime = (qui) => {
      $('#fvAutre').classList.toggle('fv-parle', qui === 'autre');
      $('#fvMoi').classList.toggle('fv-parle', qui === 'moi');
    };
    const plan = (k) => {
      const g = $('#fvGros'), id = cfg.plans[k];
      if (!id) { g.classList.remove('on'); return; }
      const avant = g.dataset.plan;
      $('#fvGrosContenu').innerHTML = PLANS[id]();
      g.dataset.plan = id;
      if (avant !== id) { g.classList.remove('on'); void g.getBoundingClientRect(); }
      g.classList.add('on');
    };
    const sousTitre = (nom, l, choixHtml = '') => {
      sous.innerHTML = `<div class="fv-qui">${nom}</div>
        <div class="fv-he">${phraseCliquable(l.he)}</div>
        <small class="tr">${esc(l.tr)}</small>
        <div class="fv-fr" ${fr ? '' : 'hidden'}>${esc(l.fr)}</div>${choixHtml}`;
      sous.appendChild(bulle); bulle.hidden = true;
      brancherMotsClic(sous, bulle);
      sous.querySelectorAll('.mot-clic').forEach((b) => b.addEventListener('click', () => mettrePause(true)));
    };
    const progres = () => { $('#fvProg').textContent = `${Math.min(i + 1, n)} / ${n}`; };
    const mettrePause = (v) => {
      if (v === pause) return;
      pause = v;
      const b = $('#fvPlay'); b.textContent = pause ? '▶' : '⏸'; b.title = pause ? 'Lecture' : 'Pause'; b.setAttribute('aria-label', b.title);
      scene.classList.toggle('fv-en-pause', pause);
      if (pause) lecteur.pause(); else if (lecteur.src && !lecteur.ended && endSpeech) lecteur.play().catch(() => {});
      if ('speechSynthesis' in window) { if (pause) speechSynthesis.pause(); else speechSynthesis.resume(); }
    };

    async function jouer(k) {
      const t = ++jeton; i = k; phase = 'ligne';
      stopAudio(); progres();
      const l = ep.lignes[k], p = FEUILLETON_PERSOS[l.qui];
      plan(k); anime('autre');
      sousTitre(`${p.em} ${esc(p.nom)}`, l);
      if (pause) { await attendrePause(); if (t !== jeton || !vivant()) return; }
      await parler(l.he);
      anime(null);
      await dodo(450); await attendrePause(); if (t !== jeton || !vivant()) return;
      if (l.rep) return choisir(k, t);
      if (k + 1 < n) return jouer(k + 1);
      fin();
    }
    function choisir(k, t) {
      phase = 'choix';
      const l = ep.lignes[k], p = FEUILLETON_PERSOS[l.qui];
      const choix = shuffle([{ ...l.rep, ok: true }, ...pick(autresReps.filter((r) => r.he !== l.rep.he), 2)]);
      sousTitre(`${p.em} ${esc(p.nom)}`, l, `<p class="fv-atoi">À toi ! Que réponds-tu ?</p><div class="fv-choix">${choix.map((c) => `<button type="button" class="opt" data-ok="${c.ok ? 1 : 0}"><span class="he" lang="he" dir="rtl">${esc(c.he)}</span><small class="tr">${esc(c.tr)}</small></button>`).join('')}</div>`);
      scene.classList.add('fv-attend');
      const z = sous.querySelector('.fv-choix'); if (z && z.getBoundingClientRect().bottom > innerHeight) z.scrollIntoView({ block: 'end', behavior: 'smooth' });
      sous.querySelectorAll('.fv-choix .opt').forEach((b) => (b.onclick = async () => {
        if (b.dataset.ok !== '1') { b.classList.add('ko'); b.disabled = true; toast('Ce n’est pas la bonne réplique : relis ce qu’on te dit.'); return; }
        scene.classList.remove('fv-attend');
        if (t !== jeton) return;
        phase = 'reponse';
        anime('moi');
        sousTitre('🙋🏻‍♀️ Toi', l.rep);
        await parler(l.rep.he);
        anime(null);
        await dodo(450); await attendrePause(); if (t !== jeton || !vivant()) return;
        if (k + 1 < n) jouer(k + 1); else fin();
      }));
    }
    function fin() {
      jeton++; anime(null); phase = 'fin';
      const premiere = !st.vus[ep.num];
      if (premiere) { st.vus[ep.num] = dayKey(); addXP(20); save(); }
      const suivant = FEUILLETON.find((e) => e.num === ep.num + 1);
      const finSaison = !suivant || (suivant.saison || 1) !== (ep.saison || 1);
      const f = $('#fvFin');
      f.innerHTML = `<p class="fv-asuivre">${finSaison ? `Fin de la saison ${ep.saison || 1}` : 'À suivre…'}</p><p>${esc(ep.suspense)}</p>
        <div class="row" style="justify-content:center"><button type="button" class="btn ghost" id="fvRevoir">↺ Revoir</button>${suivant && dispo(suivant.num) ? `<a class="btn gold" href="#/feuilleton/${suivant.num}${FEUILLETON_VIDEO[suivant.num] ? '/video' : ''}">Épisode ${suivant.num} →</a>` : ''}<a class="btn ghost" href="#/feuilleton">Épisodes</a></div>`;
      f.hidden = false;
      sous.innerHTML = `<div class="fe-mots"><b>Les mots de l’épisode</b>${premiere ? ' <small>· +20 XP</small>' : ''}<div>${ep.mots.map(([he, , frm]) => `<span class="rs-puce">${HE(he)}<small>${esc(frm)}</small>${sayBtn(he)}</span>`).join('')}</div>
        <button class="btn ghost" id="fvMots">⭐ Ajouter ces mots à Mes mots</button></div>`;
      $('#fvMots').onclick = (e) => { ep.mots.forEach((m) => ajouterMesMots(m)); e.currentTarget.disabled = true; toast('⭐ Mots ajoutés à tes cartes'); };
      $('#fvRevoir').onclick = () => { f.hidden = true; mettrePause(false); jouer(0); };
    }

    $('#fvDebut').onclick = (e) => { e.currentTarget.remove(); jouer(0); };
    $('#fvPlay').onclick = () => { if ($('#fvDebut')) { $('#fvDebut').click(); return; } mettrePause(!pause); };
    $('#fvPrec').onclick = () => { if ($('#fvDebut')) return; mettrePause(false); $('#fvFin').hidden = true; jouer(Math.max(0, phase === 'ligne' && i > 0 ? i - 1 : i)); };
    $('#fvRe').onclick = () => { if ($('#fvDebut')) return; mettrePause(false); $('#fvFin').hidden = true; if (phase === 'fin') return jouer(n - 1); jouer(i); };
    $('#fvLent').onclick = (e) => { lent = !lent; e.currentTarget.classList.toggle('on', lent); lecteur.playbackRate = lent ? 0.75 : 1; toast(lent ? '🐢 Voix plus lente' : 'Voix normale'); };
    $('#fvFr').onchange = (e) => { fr = e.target.checked; S.videoFr = fr; save(); sous.querySelectorAll('.fv-fr').forEach((z) => (z.hidden = !fr)); };
    keyHandler = (ev) => { if (ev.key === ' ' && !/INPUT|BUTTON/.test(document.activeElement.tagName)) { ev.preventDefault(); $('#fvPlay').click(); } };
  }

  // La page de l'épisode : un bouton « Regarder en vidéo » quand la vidéo existe
  const lire = routes.feuilleton;
  routes.feuilleton = (num, mode) => {
    if (mode === 'video' && FEUILLETON_VIDEO[num]) return video(num);
    lire(num);
    if (num && FEUILLETON_VIDEO[num]) {
      // La page se redessine à chaque réplique : on remet le bouton à chaque fois
      const poser = () => { const l = $('.fe-lieu'); if (l && !$('.fv-entree')) l.insertAdjacentHTML('afterend', `<a class="fv-entree" href="#/feuilleton/${num}/video"><span>🎬</span><span><b>Regarder en vidéo</b><small>Le même épisode en dessin animé, avec le son et les sous-titres</small></span><span class="fv-entree-go">▶</span></a>`); };
      const obs = new MutationObserver(poser); obs.observe(app, { childList: true });
      window.addEventListener('hashchange', () => obs.disconnect(), { once: true });
      poser();
    }
    if (!num) $$('.fe-ep').forEach((a) => { const m = (a.getAttribute('href') || '').match(/feuilleton\/(\d+)$/); if (m && FEUILLETON_VIDEO[m[1]]) { a.setAttribute('href', `#/feuilleton/${m[1]}/video`); const e = a.querySelector('.fe-etat'); if (e) e.insertAdjacentHTML('afterbegin', '🎬 '); } });
  };
  // Le site déjà affiché avant ce fichier : on redessine les pages du feuilleton
  if (/^#\/feuilleton(\/|$)/.test(location.hash)) route();
})();
