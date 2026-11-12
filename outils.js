'use strict';
/* Fonctions ajoutées : histoires, scènes, mot caché du jour, feuille de route, boutique. */
const NFC = (s) => s.normalize('NFC');
const WORD_BY_HE = Object.fromEntries(WORDS.map((w) => [NFC(w.he), w]));
const sayIfAny = (t) => sayBtn(t);

/* Temps d'étude : compté seulement quand la page est visible */
setInterval(() => { if (!document.hidden) { S.stats.sec += 15; save(); } }, 15000);

/* ============ Histoires ============ */
// Les histoires terminées avant l'arrivée des cartes postales reçoivent la leur
[...STORIES, ...STORIES_VIE].forEach((st) => { if (S.story[st.id] && !S.postcards[st.id]) S.postcards[st.id] = dayKey(); });
save();
const BASE_MISSION = ['noa', 'shouk', 'gueshem']; // les 3 chapitres de la feuille de route
const storyDone = () => BASE_MISSION.filter((id) => S.story[id]).length;
function histoire(id, mode) {
  const k = STORIES.findIndex((s) => s.id === id);
  const vie = STORIES_VIE.find((s) => s.id === id);
  const ville = VILLES.find((v) => v.id === id);
  if (ville) { app.innerHTML = `<div class="q-head"><a href="#/histoire">← Tous les chapitres</a></div>${afficheVille(ville)}`; return; }
  if (k < 0 && !vie) {
    const nb = STORIES.filter((s) => S.postcards[s.id]).length, nbVie = STORIES_VIE.filter((s) => S.postcards[s.id]).length;
    app.innerHTML = `<h2>Histoires</h2><p class="sub">Un voyage à travers Israël, un lieu par chapitre. Les chapitres 1 à 5 se suivent ; à partir du chapitre 6, chaque ville réunit cinq histoires de la vie de tous les jours, dans l’ordre que tu veux. Chaque histoire terminée t’envoie sa carte postale.</p>
    <div class="chaps">${STORIES.map((s, i) => {
      const open = i === 0 || S.story[STORIES[i - 1].id], c = CHAPITRES[s.id];
      const inner = `${decorSvg(s.id, 'ch-img')}<div class="ch-t"><small>Chapitre ${c.num}${S.story[s.id] ? ' · terminé ✓' : ''}</small><h3>${esc(c.lieu)}</h3><span class="he" lang="he" dir="rtl">${esc(c.he)}</span><p>${open ? esc(s.title) : '🔒 Termine le chapitre précédent'}</p></div>`;
      return open ? `<a class="chap" href="#/histoire/${s.id}">${inner}</a>` : `<div class="chap lock">${inner}</div>`;
    }).join('')}${VILLES.map(tuileVille).join('')}</div>
    <div class="section"><h3>Mes cartes postales (${nb}/${STORIES.length})</h3><div class="pcs">${STORIES.map(petiteCarte).join('')}</div></div>
    <div class="section"><h3>Cartes postales des villes (${nbVie}/${STORIES_VIE.length})</h3>${VILLES.map((v) => `<h4 class="vie-cat">${esc(v.lieu)} <span class="he" lang="he" dir="rtl">${esc(v.he)}</span></h4><div class="pcs">${v.histoires.map((id) => STORIES_VIE.find((x) => x.id === id)).filter(Boolean).map(petiteCarteVie).join('')}</div>`).join('')}</div>`;
    return;
  }
  const st = vie || STORIES[k];
  if (!vie && k > 0 && !S.story[STORIES[k - 1].id]) { location.hash = '#/histoire'; return; }
  if (mode !== 'jouer' && !vie) { app.innerHTML = `<div class="q-head"><a href="#/histoire">← Tous les chapitres</a></div>${afficheChapitre(st)}`; return; }
  let voirMots = false;
  let n = 0, turn = 0; // « turn » annule le passage automatique si on revient en arrière
  const show = () => {
    const l = st.lines[n], thisTurn = ++turn;
    app.innerHTML = `<div class="q-head">${vie ? `<a href="#/histoire/${villeDe(st.id) ? villeDe(st.id).id : ''}">← ${esc(villeDe(st.id) ? villeDe(st.id).lieu : 'Toutes les histoires')}</a>` : `<a href="#/histoire/${st.id}">← ${esc(CHAPITRES[st.id].lieu)}</a>`}<span>${st.emoji} ${esc(st.title)}</span><span>${n + 1}/${st.lines.length}</span></div>
    <div class="progress"><i style="width:${(n / st.lines.length) * 100}%"></i></div>
    ${n > 0 ? '<div class="row" style="margin-bottom:12px"><button class="btn ghost" id="prevLine">← Phrase précédente</button></div>' : ''}
    <div class="card">
      <b>${esc(st.who)}</b>
      <div class="center"><div class="big">${phraseCliquable(l.he)}</div><p class="hint mots-aide">Touche un mot pour voir son sens.</p><div class="bulle-mot" id="bulleMot" hidden></div><div class="tr">${esc(l.tr)}</div><div>${esc(l.fr)}</div><div class="mt">${sayBtn(l.he, '🔊 Écouter')}</div></div>
      ${l.choices ? `<p class="sub mt center">Que réponds-tu ?</p><div class="col-choices">${shuffle(l.choices).map((c) => `<button class="opt choice" data-he="${esc(c.he)}" data-ok="${c.ok ? 1 : 0}"><span class="he" lang="he" dir="rtl">${esc(c.he)}</span><small class="tr">${esc(c.tr)}</small></button>`).join('')}</div>
      <p class="center hint" id="fb">&nbsp;</p>` : `<div class="row mt" style="justify-content:center"><button class="btn gold" id="end">Terminer l’histoire</button></div>`}
    </div>
    ${(() => {
      const mots = motsDeTextes([l.he, ...(l.choices || []).map((c) => c.he)]);
      const nv = mots.filter((m) => m.nouveau).length;
      return mots.length ? `<details class="card hist-mots" id="motsLigne" ${voirMots ? 'open' : ''}><summary>📚 Mots de cette phrase${nv ? ` · ${nv} nouveau${nv > 1 ? 'x' : ''}` : ''}</summary>${mots.map(ligneMot).join('')}</details>` : '';
    })()}`;
    brancherMotsClic($('.mots-clic').parentElement, $('#bulleMot'));
    const zoneMots = $('#motsLigne');
    if (zoneMots) { zoneMots.ontoggle = () => { voirMots = zoneMots.open; }; brancherMots(zoneMots); }
    later(() => speak(l.he), 250);
    const prev = $('#prevLine');
    if (prev) prev.onclick = () => { cleanup(); stopAudio(); n--; show(); };
    if (l.choices) {
      $$('.choice').forEach((b) => (b.onclick = () => {
        const c = l.choices.find((x) => x.he === b.dataset.he);
        const reading = speak(c.he);
        if (c.ok) {
          b.classList.add('ok'); lucioles(b); $$('.choice').forEach((x) => (x.disabled = true));
          $('#fb').textContent = `✅ « ${c.fr} »`;
          // On attend la fin de la phrase (et au moins le temps de lire la traduction)
          const here = location.hash, pause = new Promise((r) => setTimeout(r, 1200));
          Promise.all([reading, pause]).then(() => { if (location.hash === here && thisTurn === turn) later(() => { n++; show(); }, 350); });
        } else {
          b.classList.add('ko'); b.disabled = true;
          $('#fb').textContent = `Cela veut dire « ${c.fr} ». Essaie encore !`;
        }
      }));
    } else {
      $('#end').onclick = () => {
        if (vie) {
          const premiere = !S.story[st.id], ville = villeDe(st.id), j = ville ? ville.histoires.indexOf(st.id) : -1, idSuite = ville && (ville.histoires.slice(j + 1).find((h) => !S.story[h]) || ville.histoires[j + 1]), suite = idSuite && STORIES_VIE.find((x) => x.id === idSuite);
          S.story[st.id] = true;
          const nouvelleCarte = !S.postcards[st.id];
          if (nouvelleCarte) S.postcards[st.id] = dayKey();
          save();
          if (premiere) addXP(20);
          confetti();
          const nv = motsDeTextes(st.lines.flatMap((x) => [x.he, ...(x.choices || []).map((c) => c.he)])).filter((m) => m.nouveau); nv.forEach((m) => { if (!estDansMesMots(m.he)) ajouterMesMots([m.he, m.tr, m.fr]); m.nouveau = false; m.perso = true; }); if (nv.length) toast(`⭐ ${nv.length} mot${nv.length > 1 ? 's' : ''} ajouté${nv.length > 1 ? 's' : ''} à tes cartes`);
          app.innerHTML = `<div class="card center result"><div class="em">${st.emoji}</div><h2>${nouvelleCarte ? 'Nouvelle carte postale !' : 'Histoire terminée !'}</h2><p class="sub">${premiere ? '+20 XP' : 'Déjà terminée, bravo pour la révision !'}${nouvelleCarte ? ` · Souvenir : ${esc(CARTES_VIE[st.id] ? CARTES_VIE[st.id].lieu : st.title)}` : ''}</p>
          <div class="pcs one">${petiteCarteVie(st)}</div>
          ${nv.length ? `<div class="hist-mots hist-fin" id="motsFin"><div class="cap">⭐ Ajoutés à tes mots à apprendre</div><p class="hint">Ils arrivent dans tes cartes mémoire (thème « Mes mots ») et dans ta séance du jour. Tu peux en retirer un si tu le connais déjà.</p>${nv.map(ligneMot).join('')}<p class="center" hidden><button class="btn ghost" id="toutAjouter" type="button"></button></p></div>` : ''}
          <div class="row mt" style="justify-content:center">${suite ? `<a class="btn" href="#/histoire/${suite.id}/jouer">Histoire suivante : ${esc(suite.title)}</a>` : ''}<a class="btn ghost" href="#/histoire/${ville ? ville.id : ''}">${ville ? `Retour à ${esc(ville.lieu)}` : 'Toutes les histoires'}</a></div></div>`;
          const zone = $('#motsFin');
          if (zone) {
            brancherMots(zone);
            $('#toutAjouter').onclick = (e) => {
              zone.querySelectorAll('.hist-mot').forEach((d) => { const m = motHistoire(d.dataset.he); if (m.nouveau) ajouterMesMots([m.he, m.tr, m.fr]); const b = d.querySelector('.hist-add'); if (b) b.textContent = '⭐ Retirer'; });
              toast('⭐ Mots ajoutés à « Mes mots »'); e.target.remove();
            };
          }
          return;
        }
        const first = !S.story[st.id];
        S.story[st.id] = true;
        if (!S.postcards[st.id]) S.postcards[st.id] = dayKey();
        save();
        if (first) addXP(40);
        confetti();
        const next = STORIES[k + 1];
        app.innerHTML = `<div class="card center result"><div class="em">💌</div><h2>${first ? 'Nouvelle carte postale !' : 'Chapitre terminé'}</h2><p class="sub">${first ? `+40 XP · Souvenir de ${esc(CHAPITRES[st.id].lieu)}` : 'Déjà terminé : pas de nouvelle récompense.'}</p>
        <div class="pcs one">${petiteCarte(st)}</div>
        ${(() => {
          const nv = motsDeTextes(st.lines.flatMap((x) => [x.he, ...(x.choices || []).map((c) => c.he)])).filter((m) => m.nouveau); nv.forEach((m) => { if (!estDansMesMots(m.he)) ajouterMesMots([m.he, m.tr, m.fr]); m.nouveau = false; m.perso = true; }); if (nv.length) toast(`⭐ ${nv.length} mot${nv.length > 1 ? 's' : ''} ajouté${nv.length > 1 ? 's' : ''} à tes cartes`);
          return nv.length ? `<div class="hist-mots hist-fin" id="motsFin"><div class="cap">⭐ Ajoutés à tes mots à apprendre</div><p class="hint">Ils arrivent dans tes cartes mémoire (thème « Mes mots ») et dans ta séance du jour. Tu peux en retirer un si tu le connais déjà.</p>${nv.map(ligneMot).join('')}<p class="center" hidden><button class="btn ghost" id="toutAjouter" type="button"></button></p></div>` : '';
        })()}
        <div class="row mt" style="justify-content:center">${next ? `<a class="btn" href="#/histoire/${next.id}">Chapitre suivant : ${esc(CHAPITRES[next.id].lieu)}</a>` : ''}<a class="btn ghost" href="#/histoire">Tous les chapitres</a></div></div>`;
        const motsFin = $('#motsFin');
        if (motsFin) {
          brancherMots(motsFin);
          $('#toutAjouter').onclick = (e) => {
            motsFin.querySelectorAll('.hist-mot').forEach((d) => { const m = motHistoire(d.dataset.he); if (m.nouveau) ajouterMesMots([m.he, m.tr, m.fr]); const b = d.querySelector('.hist-add'); if (b) b.textContent = '⭐ Retirer'; });
            toast('⭐ Mots ajoutés à « Mes mots »'); e.target.remove();
          };
        }
      };
    }
  };
  show();
}

/* ============ Scènes ============ */
const isNew = (he) => !S.found.includes(NFC(he));
function scenes(id) {
  policesScenes();
  const sc = SCENES.find((s) => s.id === id);
  const estNouveau = (he) => isNew(he);
  const styleDe = (scene) => SCENE_STYLES.find((x) => x.id === S.styleScenes[scene.id]) || SCENE_STYLES.find((x) => x.id === (SCENE_STYLE_DEFAUT[scene.id] || SCENE_STYLE_DEFAUT_THEME[scene.theme] || 'fusion'));
  if (!sc) {
    const themes = [...new Set(SCENES.map((s) => s.theme))];
    app.innerHTML = `<h2>Scènes</h2><p class="sub">Touche les objets pour entendre leur nom. Ceux qui brillent sont encore à découvrir (+2 XP la première fois). Chaque scène a son ambiance, que tu peux changer.</p>
    ${themes.map((t) => `<div class="section"><h3>${t}</h3><div class="sc-liste">${SCENES.filter((s) => s.theme === t).map((s) => {
      const nb = s.objects.filter((o) => estNouveau(o[0])).length, st = styleDe(s);
      return `<a class="sc-carte" href="#/scenes/${s.id}"><div class="sc-vignette">${sceneStylee(s, st, 'v' + s.id, false)}</div><div class="sc-legende"><b>${esc(s.name)}</b><small>${esc(st.nom)} · ${s.objects.length - nb}/${s.objects.length} découverts${nb ? '' : ' ✓'}</small><div class="bar"><i style="width:${((s.objects.length - nb) / s.objects.length) * 100}%"></i></div></div></a>`;
    }).join('')}</div></div>`).join('')}`;
    return;
  }
  let actif = null;
  const rendre = () => {
    const st = styleDe(sc);
    const vars = Object.entries(st.css).map(([k, v]) => `--${k}:${v}`).join(';');
    app.innerHTML = `<div class="q-head"><a href="#/scenes">← Scènes</a><span id="scCompte"></span></div>
    <div class="scn ${st.classe || ''}" style="${vars}"><div class="scn-deco"></div>
      <div class="scn-haut"><h2 class="scn-titre">${esc(sc.name)}</h2>${st.sur ? `<span class="scn-sur">${esc(st.sur)}</span>` : ''}</div>
      <div class="scn-corps">
        <div class="scn-cadre sc-cadre">${sceneStylee(sc, st, 's' + sc.id, true)}<div class="scn-voile"></div><div class="sc-bulle" id="scBulle" hidden></div></div>
        <div class="scn-cote"><div class="scn-mot" id="info"><p style="margin:0">Touche un objet de la scène.</p></div>
          <div class="scn-liste" lang="he" dir="rtl">${sc.objects.map((o, k) => `<button type="button" data-k="${k}">${esc(o[0])}</button>`).join('')}</div></div>
      </div>
    </div>
    <div class="section"><h3>Ambiance de cette scène</h3><div class="scn-choix">${SCENE_STYLES.map((x) => `<button type="button" class="${x === st ? 'on' : ''}" data-st="${x.id}"><i style="background:${x.pastille}"></i>${esc(x.nom)}</button>`).join('')}</div></div>`;
    const maj = () => {
      $('#scCompte').textContent = `${sc.objects.filter((o) => !estNouveau(o[0])).length}/${sc.objects.length}`;
      $$('.so').forEach((g) => g.classList.toggle('so-new', estNouveau(sc.objects[+g.dataset.i][0])));
    };
    const montrer = (i) => {
      const [he, , x, y] = sc.objects[i], w = WORD_BY_HE[NFC(he)];
      $$('.so').forEach((o) => o.classList.toggle('so-sel', +o.dataset.i === i));
      $$('.scn-liste button').forEach((b) => b.classList.toggle('on', +b.dataset.k === i));
      const bulle = $('#scBulle');
      bulle.hidden = false;
      bulle.innerHTML = HE(he);
      bulle.style.left = `${Math.min(84, Math.max(16, (x / 800) * 100))}%`;
      bulle.style.top = `${Math.max(11, (y / 600) * 100 - 15)}%`;
      $('#info').innerHTML = `<div class="big">${HE(he)}</div><div class="tr">${esc(w.tr)}</div><div><b>${esc(w.fr)}</b></div><div class="mt">${sayBtn(he, '🔊 Réécouter')}</div>`;
    };
    const toucher = (i) => {
      const he = sc.objects[i][0], w = WORD_BY_HE[NFC(he)];
      actif = i;
      speak(he);
      if (estNouveau(he)) { S.found.push(NFC(he)); save(); addXP(2); toast(`Nouveau mot : ${w.fr}`); }
      montrer(i); maj();
      if (!sc.objects.some((o) => estNouveau(o[0])) && !S.sceneDone.includes(sc.id)) { S.sceneDone.push(sc.id); save(); addXP(15); toast('🎉 Scène complète : +15 XP'); confetti(); }
    };
    $$('.so').forEach((g) => {
      const i = +g.dataset.i;
      g.onclick = () => toucher(i);
      g.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toucher(i); } };
      g.setAttribute('aria-label', WORD_BY_HE[NFC(sc.objects[i][0])]?.fr || sc.objects[i][0]);
    });
    $$('.scn-liste button').forEach((b) => (b.onclick = () => toucher(+b.dataset.k)));
    $$('.scn-choix button').forEach((b) => (b.onclick = () => { S.styleScenes[sc.id] = b.dataset.st; save(); rendre(); }));
    maj();
    if (actif !== null) montrer(actif);
  };
  rendre();
}

/* ============ Mot caché : défi du jour ============ */
function seeded(str) { let h = 2166136261; for (const c of str) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return () => { h += 0x6D2B79F5; let t = h; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function buildGrid() {
  const rand = seeded(dayKey()), N = 8;
  const pool = WORDS.filter((w) => !/\s/.test(w.he) && LETTER_ONLY(w.he).length >= 3 && LETTER_ONLY(w.he).length <= 6);
  const word = pool[Math.floor(rand() * pool.length)];
  const letters = LETTER_ONLY(word.he), base = LETTERS.map((L) => L.l);
  const grid = Array.from({ length: N }, () => Array.from({ length: N }, () => base[Math.floor(rand() * base.length)]));
  const vertical = rand() < .35, along = Math.floor(rand() * (N - letters.length + 1)), across = Math.floor(rand() * N);
  const cells = letters.map((_, i) => (vertical ? [along + i, across] : [across, along + i]));
  cells.forEach(([r, c], i) => { grid[r][c] = letters[i]; });
  return { word, letters, grid, cells, N };
}
function jour() {
  const G = buildGrid(), today = dayKey(), done = S.daily[today];
  const t0 = Date.now(); let first = null, found = !!done, hints = 0;
  const key = (r, c) => `${r}-${c}`;
  const solved = new Set(G.cells.map(([r, c]) => key(r, c)));
  app.innerHTML = `<h2>Jeux</h2>${ongletsJeux('jour')}<h3>Mot caché · défi du jour</h3>
  <p class="sub">Un nouveau mot chaque jour. Touche sa <b>première</b> lettre puis sa <b>dernière</b>. Il se lit de droite à gauche, ou de haut en bas.</p>
  <div class="card center event" id="event">
    <p style="margin:0">Trouve : <b>${esc(G.word.fr)}</b> <i class="tr">${esc(G.word.tr)}</i> ${sayBtn(G.word.he)}</p>
    <div class="timer" id="clock">${done ? '✓' : '0 s'}</div>
    <div class="ws" style="grid-template-columns:repeat(${G.N},1fr)">${G.grid.map((row, r) => row.map((l, c) => `<button class="wc ${found && solved.has(key(r, c)) ? 'ok' : ''}" data-r="${r}" data-c="${c}" lang="he">${l}</button>`).join('')).join('')}</div>
    <p class="hint" id="fb">${done ? 'Défi déjà réussi aujourd’hui. Reviens demain !' : 'Bonus si tu trouves en moins de 20 secondes.'}</p>
    ${done ? '' : '<button class="btn ghost" id="hint">💡 Indice</button>'}
  </div>`;
  (() => { const ev = $('#event');
    for (let i = 0; i < 16; i++) { const p = document.createElement('span'); p.className = 'ev-petal'; p.style.left = Math.random() * 100 + '%'; p.style.top = Math.random() * 100 + '%'; p.style.transform = `rotate(${Math.random() * 360}deg)`; ev.appendChild(p); }
    [[7, 16], [88, 60], [12, 74], [76, 88]].forEach(([x, y]) => { const b = document.createElement('span'); b.className = 'ev-fly'; b.style.left = x + '%'; b.style.top = y + '%'; b.innerHTML = '<svg width="26" height="20" viewBox="0 0 40 30"><path d="M20 15 C10 -2 0 4 4 12 C6 18 14 18 20 15Z M20 15 C30 -2 40 4 36 12 C34 18 26 18 20 15Z M20 15 C12 20 8 28 14 28 C18 28 20 22 20 15Z M20 15 C28 20 32 28 26 28 C22 28 20 22 20 15Z" fill="#fff"/></svg>'; ev.appendChild(b); }); })();
  const cell = (r, c) => $(`.wc[data-r="${r}"][data-c="${c}"]`);
  if (!done) {
    every(() => { const el = $('#clock'); if (el && !found) el.textContent = Math.floor((Date.now() - t0) / 1000) + ' s'; }, 1000);
    $('#hint').onclick = () => { hints++; const [r, c] = G.cells[0]; cell(r, c).classList.add('sel'); $('#fb').textContent = 'La première lettre est surlignée. Le bonus de vitesse est perdu.'; };
  }
  $$('.wc').forEach((b) => (b.onclick = () => {
    if (found) return;
    const r = +b.dataset.r, c = +b.dataset.c;
    if (!first) { first = [r, c]; b.classList.add('sel'); return; }
    const [r0, c0] = first, same = r0 === r || c0 === c;
    let picked = [];
    if (same) { const len = Math.max(Math.abs(r - r0), Math.abs(c - c0)) + 1, dr = Math.sign(r - r0), dc = Math.sign(c - c0); for (let i = 0; i < len; i++) picked.push([r0 + dr * i, c0 + dc * i]); }
    const text = picked.map(([a, d]) => G.grid[a][d]).join('');
    $$('.wc.sel').forEach((x) => x.classList.remove('sel')); first = null;
    if (text === G.letters.join('')) {
      found = true; picked.forEach(([a, d]) => cell(a, d).classList.add('ok')); lucioles($('.ws'), 20);
      const sec = Math.floor((Date.now() - t0) / 1000), fast = sec < 20 && !hints;
      S.daily[today] = { sec }; S.sh += fast ? 10 : 0; save(); addXP(30); speak(G.word.he); confetti();
      $('#fb').textContent = `🎉 Trouvé en ${sec} s ! +30 XP${fast ? ' et 10 ₪ de bonus vitesse' : ''}`;
      const h = $('#hint'); if (h) h.remove();
    } else { $('#fb').textContent = 'Pas ce mot-là. Touche la première lettre, puis la dernière.'; }
  }));
}

/* ============ Feuille de route : lire un journal en hébreu ============ */
const readDone = () => S.articles.length;
function roadmapSteps() {
  return [
    { name: 'Les lettres', desc: 'Découvrir les 22 lettres', now: S.seen.length, goal: 22, link: '#/alphabet' },
    { name: 'Les mots du quotidien', desc: 'Maîtriser 30 mots', now: mastered(), goal: 30, link: '#/cartes' },
    { name: 'Les phrases simples', desc: 'Terminer les 3 premiers chapitres', now: storyDone(), goal: BASE_MISSION.length, link: '#/histoire' },
    { name: 'Lire un article', desc: 'Lire et comprendre 3 articles', now: readDone(), goal: Math.min(3, ARTICLES.length), link: '#/journal' },
  ];
}
function journal(id) {
  // L'article du jour fait partie de la page « Lire un journal »
  if (typeof PRESSE !== 'undefined' && (id === 'jour' || PRESSE.some((p) => p.id === id))) return presse(id === 'jour' ? null : id);
  const open = storyDone() >= BASE_MISSION.length;
  const art = ARTICLES.find((a) => a.id === id);
  if (!art || !open) {
    const steps = roadmapSteps();
    const pct = Math.round(steps.reduce((t, s) => t + Math.min(1, s.now / s.goal), 0) / steps.length * 100);
    const cur = steps.findIndex((s) => s.now < s.goal);
    const lus = ARTICLES.filter((a) => S.articles.includes(a.id)).length;
    const auj = typeof PRESSE !== 'undefined' ? presseDuJour() : null;
    const ajd = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const court = (t, n) => (t.length > n ? t.slice(0, n - 2) + '…' : t);
    const passes = auj ? [1, 2, 3].map((k) => PRESSE[(presseIndex() - k + PRESSE.length * 2) % PRESSE.length]) : [];
    const ICONE = { Science: '🔬', Santé: '🩺', Sport: '⚽', Culture: '🎭', Technologie: '💻' };
    const NIV = [[1, '🌱', 'Niveau 1'], [2, '🌿', 'Niveau 2'], [3, '🌳', 'Niveau 3'], [4, '🌲', 'Niveau 4']];
    const parNiv = (n) => ARTICLES.filter((a) => (a.niveau || 1) === n);
    const nivOuvert = (NIV.find(([n]) => parNiv(n).some((a) => !S.articles.includes(a.id))) || NIV[0])[0];
    const auLu = auj && S.presse.includes(auj.id);
    app.innerHTML = `<div class="jx jx3">
    <header class="jx3-tete">
      <span class="jx3-date">${ajd}</span>
      <h2><span class="he" lang="he" dir="rtl">הָעִתּוֹן שֶׁלִּי</span></h2>
      <span class="jx3-sous">Mon journal en hébreu</span>
    </header>
    <div class="jx3-page">
      <main class="jx3-main">
        ${auj ? `<a class="jx3-une" href="#/journal/jour">
          <span class="jx3-une-img" aria-hidden="true">${ICONE[auj.cat] || '📰'}</span>
          <span class="jx3-une-txt">
            <span class="jx3-meta">À la une · ${esc(auj.cat)} · ${esc(auj.src)}${auLu ? ' · <span class="jx-ok">Lu ✓</span>' : ''}</span>
            <span class="he jx3-une-he" lang="he" dir="rtl">${esc(auj.une)}</span>
            <span class="jx3-une-fr">${esc(auj.uneFr)}</span>
            <span class="btn jx3-cta">${auLu ? 'Relire' : 'Lire l’article du jour'} →</span>
          </span>
        </a>` : ''}
        <section class="jx3-bloc">
          <div class="jx3-bloc-tete"><h3>Les petits articles</h3><span>${lus} / ${ARTICLES.length} lus</span></div>
          ${open ? '' : '<p class="jx-verrou">🔒 Termine les 3 premiers chapitres des histoires pour ouvrir les petits articles.</p>'}
          <div class="jx3-onglets" role="tablist">${NIV.map(([n, em, nom]) => { const l = parNiv(n), f = l.filter((a) => S.articles.includes(a.id)).length; return `<button type="button" role="tab" class="jx-n${n}${n === nivOuvert ? ' on' : ''}" data-niv="${n}" aria-selected="${n === nivOuvert}">${em} ${nom} <small>${f}/${l.length}</small></button>`; }).join('')}</div>
          ${NIV.map(([n]) => `<div class="jx3-liste jx-n${n}" data-niv="${n}"${n === nivOuvert ? '' : ' hidden'}>${parNiv(n).map((a) => {
            const lu = S.articles.includes(a.id);
            const inner = `<span class="he" lang="he" dir="rtl">${esc(a.title)}</span><span class="jx3-fr">${esc(a.fr)}</span><span class="jx3-etat">${!open ? '🔒' : lu ? '✓' : '›'}</span>`;
            return open ? `<a class="jx3-art${lu ? ' lu' : ''}" href="#/journal/${a.id}">${inner}</a>` : `<div class="jx3-art ferme">${inner}</div>`;
          }).join('')}</div>`).join('')}
        </section>
      </main>
      <aside class="jx3-cote">
        <section class="jx3-carte">
          <div class="jx3-carte-tete"><b>Ta mission</b><span>${pct} %</span></div>
          <div class="progress"><i style="width:${pct}%"></i></div>
          <ol class="jx3-etapes">${steps.map((s, i) => `<li class="${s.now >= s.goal ? 'done' : i === cur ? 'now' : ''}"><a href="${s.link}"><span class="jx3-pastille">${s.now >= s.goal ? '✓' : i + 1}</span><span>${s.name}</span><small>${Math.min(s.now, s.goal)}/${s.goal}</small></a></li>`).join('')}</ol>
        </section>
        ${passes.length ? `<section class="jx3-carte">
          <div class="jx3-carte-tete"><b>Les jours précédents</b></div>
          ${passes.map((a) => `<a class="jx3-breve" href="#/journal/${a.id}"><small>${presseDate(a.date)}${S.presse.includes(a.id) ? ' · <span class="jx-ok">Lu ✓</span>' : ''}</small><span>${esc(court(a.uneFr, 70))}</span></a>`).join('')}
        </section>` : ''}
      </aside>
    </div>
    <p class="jx3-pied">Les petits articles sont des textes simplifiés écrits pour apprendre. L’article du jour reprend un vrai titre de presse.</p>
    </div>`;
    $$('.jx3-onglets button').forEach((b) => (b.onclick = () => {
      $$('.jx3-onglets button').forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-selected', x === b); });
      $$('.jx3-liste').forEach((p) => (p.hidden = p.dataset.niv !== b.dataset.niv));
    }));
    return;
  }
  app.innerHTML = `<div class="q-head"><a href="#/journal">← Mission</a><span>📰 ${art.fr}</span></div>
  <div class="card">
    <h2 class="center" style="font-size:2rem">${HE(art.title)}</h2>
    <p class="hint center">Touche un mot pour le comprendre.</p>
    <div id="sents">${art.sentences.map((s, i) => `<div class="sent"><div class="row" style="justify-content:flex-end;gap:6px"><span dir="rtl" lang="he" class="words">${s.w.map(([he, fr]) => `<button class="w he" data-g="${esc(fr)}" data-he="${esc(he)}">${esc(he)}</button>`).join(' ')}</span>${sayBtn(s.he)}</div><button class="link" data-t="${i}">Voir la traduction</button><div class="tr" id="t${i}" hidden>${esc(s.fr)}</div></div>`).join('')}</div>
    <p class="center" id="gloss" style="min-height:1.6em;font-weight:800">&nbsp;</p>
    <div class="section"><b>${esc(art.q)}</b><div class="col-choices mt">${art.opts.map((o, i) => `<button class="opt ans" data-i="${i}">${esc(o)}</button>`).join('')}</div><p class="center hint" id="fb">&nbsp;</p></div>
  </div>`;
  $$('.w').forEach((b) => (b.onclick = () => { $$('.w.on').forEach((x) => x.classList.remove('on')); b.classList.add('on'); $('#gloss').textContent = b.dataset.g; speak(b.dataset.he); }));
  $$('.link').forEach((b) => (b.onclick = () => { $('#t' + b.dataset.t).hidden = false; b.remove(); }));
  $$('.ans').forEach((b) => (b.onclick = () => {
    if (+b.dataset.i === art.a) {
      b.classList.add('ok'); lucioles(b); $$('.ans').forEach((x) => (x.disabled = true));
      const first = !S.articles.includes(art.id);
      if (first) { S.articles.push(art.id); save(); addXP(30); confetti(); }
      $('#fb').innerHTML = `✅ Bravo !${first ? ' +30 XP' : ''} <a href="#/journal" style="color:var(--blue);font-weight:800">Retour à la mission</a>`;
    } else { b.classList.add('ko'); b.disabled = true; $('#fb').textContent = 'Relis le texte et réessaie.'; }
  }));
}

/* ============ Boutique : elle est maintenant dans « Ma chambre » (onglet Boutique) ============ */

/* ============ Conjugaison ============ */
const PRONOMS = { je: 'אֲנִי', tum: 'אַתָּה', tuf: 'אַתְּ', il: 'הוּא', elle: 'הִיא', nous: 'אֲנַחְנוּ', vm: 'אַתֶּם', vf: 'אַתֶּן', ilsm: 'הֵם', ilsf: 'הֵן' };
const forme = (txt, i) => { const [he, tr] = txt.split(',')[i].split(' '); return { he, tr }; };
function celluleConj(f, pron, span = 1) {
  return `<td colspan="${span}"><button class="conj-c" data-say="${esc(f.he)}"><small lang="he" dir="rtl">${pron.map((p) => PRONOMS[p]).join(' / ')}</small><span class="he" lang="he" dir="rtl">${esc(f.he)}</span><small class="tr">${esc(f.tr)}</small></button></td>`;
}
const enteteConj = '<tr><th></th><th>Sing. masc.</th><th>Sing. fém.</th><th>Plur. masc.</th><th>Plur. fém.</th></tr>';
function tablePasse(t) {
  const f = (i) => forme(t, i);
  return `<table class="conj">${enteteConj}
    <tr><th>1re pers.</th>${celluleConj(f(0), ['je'], 2)}${celluleConj(f(5), ['nous'], 2)}</tr>
    <tr><th>2e pers.</th>${celluleConj(f(1), ['tum'])}${celluleConj(f(2), ['tuf'])}${celluleConj(f(6), ['vm'])}${celluleConj(f(7), ['vf'])}</tr>
    <tr><th>3e pers.</th>${celluleConj(f(3), ['il'])}${celluleConj(f(4), ['elle'])}${celluleConj(f(8), ['ilsm', 'ilsf'], 2)}</tr></table>`;
}
function tablePresent(t) {
  const f = (i) => forme(t, i);
  return `<table class="conj">${enteteConj}
    <tr><th>Toutes pers.</th>${celluleConj(f(0), ['je', 'tum', 'il'])}${celluleConj(f(1), ['je', 'tuf', 'elle'])}${celluleConj(f(2), ['nous', 'vm', 'ilsm'])}${celluleConj(f(3), ['nous', 'vf', 'ilsf'])}</tr></table>`;
}
function tableFutur(t) {
  const f = (i) => forme(t, i);
  return `<table class="conj">${enteteConj}
    <tr><th>1re pers.</th>${celluleConj(f(0), ['je'], 2)}${celluleConj(f(5), ['nous'], 2)}</tr>
    <tr><th>2e pers.</th>${celluleConj(f(1), ['tum'])}${celluleConj(f(2), ['tuf'])}${celluleConj(f(6), ['vm', 'vf'], 2)}</tr>
    <tr><th>3e pers.</th>${celluleConj(f(3), ['il'])}${celluleConj(f(4), ['elle'])}${celluleConj(f(7), ['ilsm', 'ilsf'], 2)}</tr></table>`;
}
function conjugaison(tr) {
  const v = VERBES.find((x) => x.tr === tr);
  if (!v) {
    app.innerHTML = `<h2>Conjugaison</h2><p class="sub">Choisis un verbe pour voir le passé, le présent et le futur, au singulier et au pluriel, au masculin et au féminin.</p>
    <p><a class="btn gold" href="#/conjexo">🎯 M’entraîner à conjuguer</a></p>
    <p><input class="select" id="q" placeholder="Chercher un verbe…" style="width:100%;max-width:340px"></p>
    <div class="themes" id="list"></div>`;
    const draw = () => {
      const q = $('#q').value.trim().toLowerCase();
      $('#list').innerHTML = VERBES.filter((x) => !q || x.fr.toLowerCase().includes(q) || x.tr.includes(q) || strip(x.he).includes(q)).map((x) => `<a class="theme" href="#/conjugaison/${x.tr}">${HE(x.he)}<br><b>${esc(x.fr)}</b><br><small>${maitriseVerbe(x) ? `${TRS(x.tr)}${maitriseVerbe(x)} % maîtrisé` : TR(x.tr)}</small></a>`).join('') || '<p class="sub">Aucun verbe trouvé.</p>';
    };
    $('#q').oninput = draw; draw();
    return;
  }
  const i = VERBES.indexOf(v), prev = VERBES[i - 1], next = VERBES[i + 1];
  app.innerHTML = `<div class="q-head"><a href="#/conjugaison">← Tous les verbes</a><span>${i + 1}/${VERBES.length}</span></div>
  <div class="card center"><div class="big">${HE(v.he)}</div><div class="tr">${esc(v.tr)}</div><div><b>${esc(v.fr)}</b></div><div class="mt">${sayBtn(v.he, '🔊 Écouter')}</div></div>
  <p class="center mt"><a class="btn gold" href="#/conjexo/${v.tr}">🎯 M’entraîner sur ce verbe</a>${maitriseVerbe(v) ? `<br><small class="hint">${maitriseVerbe(v)} % des formes maîtrisées</small>` : ''}</p>
  <p class="hint center">Touche une forme pour l’écouter.</p>
  <div class="section"><h3>Passé</h3>${tablePasse(v.passe)}</div>
  <div class="section"><h3>Présent</h3>${v.present ? tablePresent(v.present) : `<div class="card">${esc(v.note)}</div>`}</div>
  <div class="section"><h3>Futur</h3>${tableFutur(v.futur)}<p class="hint">Dans l’hébreu courant, le pluriel du futur est le même au masculin et au féminin.</p>${v.noteFutur ? `<div class="card">${esc(v.noteFutur)}</div>` : ''}</div>
  <div class="row mt" style="justify-content:space-between">${prev ? `<a class="btn ghost" href="#/conjugaison/${prev.tr}">← ${esc(prev.fr)}</a>` : '<span></span>'}${next ? `<a class="btn" href="#/conjugaison/${next.tr}">${esc(next.fr)} →</a>` : ''}</div>`;
}

/* ============ Grammaire ============ */
// Dans les textes de leçons, [[…]] désigne de l'hébreu
const texteGram = (t) => esc(t).replace(/\[\[(.+?)\]\]/g, (_, he) => HE(he));
// Dans le texte des leçons, chaque mot hébreu se clique pour l'écouter
const texteGramSon = (t) => esc(t).replace(/\[\[(.+?)\]\]/g, (_, he) => (strip(he).replace(/[^\u05D0-\u05EA]/g, '').length > 1 ? `<span class="he gr-dit" lang="he" dir="rtl" role="button" tabindex="0" data-say="${he}" title="Écouter">${he}</span>` : HE(he)));
document.addEventListener('keydown', (e) => { const b = e.target.closest && e.target.closest('.gr-dit'); if (b && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); speak(b.dataset.say); } });
const estHebreu = (t) => /[א-ת]/.test(t);
function grammaire(id, etape) {
  if (id === 'familles' && typeof familles === 'function') return familles(etape);
  if (id === 'controle' && typeof controleGram === 'function') return controleGram(etape);
  const i = GRAMMAIRE.findIndex((l) => l.id === id);
  if (i < 0) {
    const COUL = ['#2fae6b', '#2f8fb0', '#e46a92', '#d9961a', '#8a4fbf', '#3d5fd6', '#6b7286'];
    const norm = (s) => s.normalize('NFD').replace(/[̀-֑ͯ-ׇ]/g, '').replace(/[[\]]/g, '').toLowerCase();
    const faites = GRAMMAIRE.filter((l) => S.grammaire[l.id]).length;
    const prochaine = GRAMMAIRE.find((l) => !S.grammaire[l.id]);
    const parties = GRAMMAIRE_PARTIES.map((p) => ({ ...p, lecons: p.ids.map((x) => GRAMMAIRE.find((l) => l.id === x)).filter(Boolean) }));
    const reste = GRAMMAIRE.filter((l) => !parties.some((p) => p.lecons.includes(l)));
    if (reste.length) parties.push({ em: '📎', titre: 'Autres leçons', lecons: reste });
    parties.forEach((p) => { p.faites = p.lecons.filter((l) => S.grammaire[l.id]).length; });
    const DESC = ['Être, avoir, le genre et le pluriel : les bases de toute phrase.', 'Les petits mots qui situent : à qui, où, quand.', 'Présent, passé, futur, et les grandes familles de verbes.', 'Compter, comparer, et les noms qui changent de forme.', 'Construire des phrases plus longues et dire ce que tu penses.', 'Pour aller plus loin : passif, discours rapporté, hypothèses.', 'Les formes rares, les phrases complexes et la langue des journaux.'];
    const aRevoir = GRAMMAIRE.filter((l) => S.grammaire[l.id] && S.grammaire[l.id].bonnes < l.exercices.length).slice(0, 6);
    const pct = Math.round((faites / GRAMMAIRE.length) * 100);
    const partieDe = (l) => parties.find((p) => p.lecons.includes(l));
    const tuile = (l, k) => {
      const score = S.grammaire[l.id], ici = l === prochaine;
      return `<a class="gr-t${score ? ' fini' : ''}${ici ? ' ici' : ''}" href="#/grammaire/${l.id}" data-cherche="${esc(norm(l.titre + ' ' + l.resume))}">
        <span class="gr-t-num">${score ? '✓' : k + 1}</span><span class="gr-t-em">${l.em}</span>
        <span class="gr-t-txt"><b>${texteGram(l.titre)}</b><small>${texteGram(l.resume)}</small></span>
        ${score ? `<span class="gr-t-score">${score.bonnes}/${l.exercices.length}</span>` : ici ? '<span class="gr-t-ici">À toi !</span>' : ''}</a>`;
    };
    app.innerHTML = `<section class="gr-hero">
      <div class="gr-hero-txt">
        <span class="he gr-hero-he" lang="he" dir="rtl">דִּקְדּוּק</span>
        <h2>Grammaire</h2>
        <p>Une petite leçon à la fois : l’essentiel, quelques exemples, puis 4 exercices.</p>
        <div class="gr-chiffres"><span><b>${faites}</b> / ${GRAMMAIRE.length} leçons</span><span><b>${parties.filter((p) => p.faites === p.lecons.length).length}</b> / ${parties.length} parties</span></div>
      </div>
      <div class="h-ring gr-anneau" style="--p:${pct}"><span>${pct} %</span></div>
    </section>
    ${prochaine ? `<a class="card gr-suite" href="#/grammaire/${prochaine.id}" style="--pc:${COUL[parties.indexOf(partieDe(prochaine)) % COUL.length]}">
      <span class="gr-suite-em">${prochaine.em}</span>
      <span class="gr-suite-txt"><small>${faites ? 'Continuer avec' : 'Commencer par'} · ${esc(partieDe(prochaine) ? partieDe(prochaine).titre : '')}</small><b>${texteGram(prochaine.titre)}</b><span>${texteGram(GRAMMAIRE_ESSENTIEL[prochaine.id] || prochaine.resume)}</span></span>
      <span class="btn gold">${faites ? 'Continuer' : 'Commencer'} →</span></a>` : '<div class="card gr-suite"><span class="gr-suite-em">🎉</span><span class="gr-suite-txt"><b>Toutes les leçons sont terminées !</b><span>Tu peux les refaire quand tu veux.</span></span></div>'}
    ${typeof RACINES !== 'undefined' ? `<a class="card gr-familles" href="#/grammaire/familles"><span class="gr-familles-em">🌳</span><span><b>Familles de mots</b><small>${RACINES.length} racines de trois lettres pour deviner le sens des mots · ${Object.keys(S.racines || {}).length} explorée${Object.keys(S.racines || {}).length > 1 ? 's' : ''}</small></span><span class="gr-familles-r he" lang="he" dir="rtl">כ־ת־ב</span></a>` : ''}
    ${aRevoir.length ? `<div class="gr-revoir"><span class="gr-revoir-tit">🔁 À revoir</span>${aRevoir.map((l) => `<a href="#/grammaire/${l.id}">${l.em} ${texteGram(l.titre)} <small>${S.grammaire[l.id].bonnes}/${l.exercices.length}</small></a>`).join('')}</div>` : ''}
    ${typeof VOYAGE !== 'undefined' ? `<a class="card gr-familles gr-voyage" href="#/voyage"><span class="gr-familles-em">🧳</span><span><b>Mon voyage en Israël</b><small>Chaque contrôle réussi te fait avancer d’une étape, de Haïfa à Eilat · ${etapesAtteintes()}/${VOYAGE.length} étapes</small></span><span class="gr-familles-r he" lang="he" dir="rtl">${(VOYAGE.find((v, i) => !(S.voyage || {})[i]) || VOYAGE[VOYAGE.length - 1]).he}</span></a>` : ''}
    <input type="search" id="grCherche" class="gr-cherche" placeholder="🔍 Chercher une leçon : futur, pluriel, נִ…" aria-label="Chercher une leçon">
    <div class="gr-chapitres">${parties.map((p, k) => `<button type="button" data-partie="${k}" style="--pc:${COUL[k % COUL.length]}"><span class="em">${p.em}</span><span class="gr-ch-txt"><small>Partie ${k + 1}</small><b>${esc(p.titre)}</b></span><span class="gr-mini"><i style="width:${(p.faites / p.lecons.length) * 100}%"></i></span><small class="gr-ch-compte">${p.faites}/${p.lecons.length}</small></button>`).join('')}</div>
    ${parties.map((p, k) => `<details class="gr-partie" id="grp${k}" style="--pc:${COUL[k % COUL.length]}"${p.lecons.includes(prochaine) || (!prochaine && k === 0) ? ' open' : ''}>
      <summary><span class="gr-p-em">${p.em}</span><span class="gr-p-titre"><small>Partie ${k + 1} · ${p.lecons.length} leçons</small><b>${esc(p.titre)}</b>${DESC[k] ? `<span class="gr-p-desc">${DESC[k]}</span>` : ''}</span><span class="h-ring gr-p-anneau" style="--p:${Math.round((p.faites / p.lecons.length) * 100)}"><span>${p.faites}/${p.lecons.length}</span></span><span class="gr-fleche" aria-hidden="true">▾</span></summary>
      <div class="gr-chemin">${p.lecons.map(tuile).join('')}</div>${k < GRAMMAIRE_PARTIES.length && typeof boutonControle === 'function' ? boutonControle(k) : ''}</details>`).join('')}
    <p class="hint center gr-vide" id="grVide" hidden>Aucune leçon ne correspond à ta recherche.</p>`;
    const blocs = $$('.gr-partie');
    blocs.forEach((d) => (d.dataset.ouvert = d.open ? '1' : ''));
    $$('.gr-chapitres button').forEach((b) => (b.onclick = () => {
      const d = $('#grp' + b.dataset.partie);
      d.open = true; d.dataset.ouvert = '1';
      d.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    }));
    blocs.forEach((d) => d.addEventListener('toggle', () => { if (!$('#grCherche').value.trim()) d.dataset.ouvert = d.open ? '1' : ''; }));
    $('#grCherche').oninput = (e) => {
      const q = norm(e.target.value.trim());
      let total = 0;
      blocs.forEach((d) => {
        let n = 0;
        d.querySelectorAll('.gr-t').forEach((t) => { const ok = !q || t.dataset.cherche.includes(q); t.hidden = !ok; if (ok) n++; });
        d.hidden = !!q && !n;
        d.open = q ? n > 0 : !!d.dataset.ouvert;
        total += n;
      });
      $('#grVide').hidden = total > 0;
    };
    return;
  }
  const l = GRAMMAIRE[i];
  if (etape === 'exercice') return exerciceGram(l, i);
  const prec = GRAMMAIRE[i - 1], suiv = GRAMMAIRE[i + 1];
  const partie = GRAMMAIRE_PARTIES.find((p) => p.ids.includes(l.id));
  const tete = `<div class="q-head"><a href="#/grammaire">← Toutes les leçons</a><span>${partie ? `${partie.em} ${esc(partie.titre)}` : `${i + 1}/${GRAMMAIRE.length}`}</span></div><h2>${l.em} ${texteGram(l.titre)}</h2>`;
  const exemple = (e) => `<div class="gr-ex"><div class="gr-ex-he">${HE(e.he)}</div><small>${TRS(e.tr)}${esc(e.fr)}</small>${sayBtn(e.he)}</div>`;
  const piedNav = `<div class="row mt" style="justify-content:space-between">${prec ? `<a class="btn ghost" href="#/grammaire/${prec.id}">← Leçon précédente</a>` : '<span></span>'}${suiv ? `<a class="btn ghost" href="#/grammaire/${suiv.id}">Leçon suivante →</a>` : '<span></span>'}</div>`;
  if (etape === 'tout') {
    app.innerHTML = `${tete}
    ${GRAMMAIRE_ESSENTIEL[l.id] ? `<div class="card gr-essentiel"><span class="cap">💡 À retenir</span><p>${texteGramSon(GRAMMAIRE_ESSENTIEL[l.id])}</p></div>` : ''}
    <div class="card gram-texte">${l.texte.map((p) => `<p>${texteGramSon(p)}</p>`).join('')}</div>
    <div class="section"><h3>Exemples</h3><div class="gr-exemples">${l.exemples.map(exemple).join('')}</div></div>
    <p class="center mt"><a class="btn gold" href="#/grammaire/${l.id}/exercice">✏️ Faire les exercices</a> <a class="btn ghost" href="#/grammaire/${l.id}">Revoir étape par étape</a></p>${piedNav}`;
    return;
  }
  // Étape par étape : l'essentiel, une idée par écran, les exemples, puis les exercices
  const etapes = [{ type: 'essentiel' }, ...l.texte.map((p) => ({ type: 'idee', p })), { type: 'exemples' }, { type: 'fin' }];
  let n = 0;
  const contenu = (e) => {
    if (e.type === 'essentiel') return `<div class="card gr-essentiel gr-carte"><span class="cap">💡 À retenir</span><p>${texteGramSon(GRAMMAIRE_ESSENTIEL[l.id] || l.resume)}</p>${l.exemples[0] ? exemple(l.exemples[0]) : ''}</div>`;
    if (e.type === 'idee') return `<div class="card gr-carte gr-idee"><p>${texteGramSon(e.p)}</p></div>`;
    if (e.type === 'exemples') return `<div class="gr-carte"><h3 class="gr-etape-titre">Écoute les exemples</h3><div class="gr-exemples">${l.exemples.map(exemple).join('')}</div></div>`;
    return `<div class="card gr-carte gr-fin"><div class="em">✏️</div><h3>Prête pour les exercices ?</h3><p class="sub">4 questions, avec une explication après chaque réponse.</p><a class="btn gold" href="#/grammaire/${l.id}/exercice">Faire les exercices</a></div>`;
  };
  const rendre = () => {
    const e = etapes[n];
    app.innerHTML = `${tete}
    <div class="gr-points" aria-label="Étape ${n + 1} sur ${etapes.length}">${etapes.map((_, k) => `<i class="${k < n ? 'vu' : k === n ? 'ici' : ''}"></i>`).join('')}</div>
    ${contenu(e)}
    <div class="row mt gr-nav">${n > 0 ? '<button type="button" class="btn ghost" id="grPrec">← Retour</button>' : '<span></span>'}${n < etapes.length - 1 ? '<button type="button" class="btn" id="grSuiv">Suite →</button>' : '<span></span>'}</div>
    <p class="center hint"><a href="#/grammaire/${l.id}/tout">Tout afficher sur une page</a></p>${n === etapes.length - 1 ? piedNav : ''}`;
    if ($('#grPrec')) $('#grPrec').onclick = () => { n--; rendre(); };
    if ($('#grSuiv')) $('#grSuiv').onclick = () => { n++; rendre(); };
  };
  keyHandler = (ev) => {
    if (ev.target && /INPUT|TEXTAREA/.test(ev.target.tagName)) return;
    if (ev.key === 'ArrowRight' && n < etapes.length - 1) { n++; rendre(); }
    if (ev.key === 'ArrowLeft' && n > 0) { n--; rendre(); }
  };
  rendre();
}
function exerciceGram(l, i) {
  const file = shuffle(l.exercices).map((e) => ({ ...e }));
  const nb = file.length;
  let k = 0, bonnes = 0, xp = 0;
  const montrer = () => {
    if (k >= file.length) return finir();
    const e = file[k], opts = shuffle([e.ok, ...e.non]), he = estHebreu(e.ok);
    app.innerHTML = `<div class="q-head"><span>${e.encore ? '🔁 On y revient' : `${l.em} ${texteGram(l.titre)}`}</span><span>${k + 1}/${file.length}</span></div>
    <div class="progress"><i style="width:${(k / file.length) * 100}%"></i></div>
    <div class="card"><div class="prompt gram-q">${esc(e.q).replace(/\[\[(.+?)\]\]/g, (_, m) => HE(m) + (strip(m).replace(/[^\u05D0-\u05EA]/g, '').length > 1 ? ' ' + sayBtn(m) : ''))}</div>
    <div class="opts">${opts.map((o, j) => `<button class="opt ${he ? 'he gram-opt' : ''}" data-j="${j}" ${he ? 'lang="he" dir="rtl"' : ''}><kbd>${j + 1}</kbd>${esc(o)}</button>`).join('')}</div>
    <p class="center hint" id="fb">&nbsp;</p><div class="center" id="suite"></div></div>`;
    let bloque = false;
    const avancer = () => { k++; montrer(); };
    const choisir = (j) => {
      if (bloque) return; bloque = true;
      const ok = opts[j] === e.ok;
      $$('.opt').forEach((b, x) => { b.disabled = true; if (opts[x] === e.ok) b.classList.add('ok'); else if (x === j) b.classList.add('ko'); });
      if (!e.encore) { S.stats.q++; if (ok) { S.stats.ok++; bonnes++; xp += 8; } if (typeof noterGram === 'function') noterGram(l.id, ok); }
      if (ok) lucioles($$('.opt')[j]);
      else if (!e.encore) file.push({ ...e, encore: true });
      save();
      $('#fb').innerHTML = `${ok ? '✅ Bravo !' : '❌ Pas tout à fait.'} ${texteGramSon(e.pourquoi)}`;
      if (he && strip(e.ok).length > 1) speak(e.ok);
      // Le temps de lire l'explication : c'est toi qui passes à la suite après une erreur
      if (ok) later(avancer, 1800);
      else { $('#suite').innerHTML = '<button class="btn" id="contin">Continuer</button>'; $('#contin').onclick = avancer; }
    };
    $$('.opt').forEach((b) => (b.onclick = () => choisir(+b.dataset.j)));
    keyHandler = (ev) => {
      const n = +ev.key;
      if (!bloque && n >= 1 && n <= opts.length) choisir(n - 1);
      else if (bloque && ev.key === 'Enter' && $('#contin')) { ev.preventDefault(); avancer(); }
    };
  };
  const finir = () => {
    keyHandler = null;
    const avant = S.grammaire[l.id];
    const premiere = !avant;
    if (!avant || bonnes > avant.bonnes) S.grammaire[l.id] = { bonnes };
    S.stats.quiz++; save();
    const gagne = xp + (premiere ? 10 : 0);
    addXP(gagne);
    if (bonnes === nb) confetti();
    const suiv = GRAMMAIRE[i + 1];
    // Les exemples de la leçon rejoignent « Mes mots », révisés dans les cartes et la séance du jour
    const nouveauxMots = l.exemples.filter((e) => !estDansMesMots(e.he) && !WORDS.some((w) => NFC(w.he) === NFC(e.he)));
    nouveauxMots.forEach((e) => ajouterMesMots([NFC(e.he), e.tr, e.fr]));
    if (nouveauxMots.length) later(() => toast(`⭐ ${nouveauxMots.length} expression${nouveauxMots.length > 1 ? 's' : ''} ajoutée${nouveauxMots.length > 1 ? 's' : ''} à tes mots à apprendre`), 600);
    app.innerHTML = `<div class="card center result"><div class="em">${bonnes === nb ? '🏆' : '💪'}</div><h2>${bonnes === nb ? 'Sans faute !' : 'Leçon terminée'}</h2><p class="score">${bonnes} / ${nb}</p><p class="sub">+${gagne} XP${premiere ? ' (dont 10 de bonus)' : ''}</p>
    ${nouveauxMots.length ? `<div class="sea-new"><div class="cap">⭐ Ajoutés à tes mots à apprendre</div>${nouveauxMots.map((e) => `<div>${HE(e.he)}<small>${TRS(e.tr)}${esc(e.fr)}</small>${sayBtn(e.he)}</div>`).join('')}</div>` : ''}
    <div class="row" style="justify-content:center">${suiv ? `<a class="btn gold" href="#/grammaire/${suiv.id}">Leçon suivante →</a>` : '<a class="btn gold" href="#/grammaire">Toutes les leçons</a>'}<a class="btn ghost" href="#/grammaire/${l.id}">Revoir la leçon</a><button class="btn ghost" id="gagain">Refaire</button></div></div>`;
    $('#gagain').onclick = () => exerciceGram(l, i);
  };
  montrer();
}

/* ============ Écriture cursive ============ */
const CURS_LISTE = LETTERS.flatMap((L) => {
  const liste = [{ c: L.l, nom: L.name, L }];
  if (L.fin) liste.push({ c: L.fin, nom: `${L.name} (fin de mot)`, L });
  return liste;
});
const CURS_HAUT = 309, CURS_BAS = 492; // lignes du modèle : le corps des lettres tient entre les deux
let cursBoites = null;
function boitesCursive() {
  if (cursBoites) return cursBoites;
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('style', 'position:absolute;width:0;height:0;visibility:hidden');
  document.body.appendChild(svg);
  cursBoites = {};
  Object.entries(CURSIVE).forEach(([c, d]) => {
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('d', d); svg.appendChild(p);
    const b = p.getBBox();
    cursBoites[c] = { x: b.x, y: b.y, w: b.width, h: b.height };
  });
  svg.remove();
  const tout = Object.values(cursBoites);
  cursBoites.haut = Math.min(...tout.map((b) => b.y)) - 12;
  cursBoites.bas = Math.max(...tout.map((b) => b.y + b.h)) + 12;
  return cursBoites;
}
// Une lettre seule, à une hauteur commune pour garder les lettres alignées
function svgLettre(c) {
  const B = boitesCursive(), b = B[c];
  return `<svg class="curs" viewBox="${b.x - 14} ${B.haut} ${b.w + 28} ${B.bas - B.haut}" role="img" aria-label="Lettre en cursive"><path d="${CURSIVE[c]}" fill="currentColor" fill-rule="evenodd"/></svg>`;
}
const lettresMot = (he) => [...strip(he.normalize('NFC'))].filter((c) => CURSIVE[c]);
// Un mot complet, de droite à gauche (les lettres cursives ne sont pas reliées entre elles)
function svgMot(he) {
  const B = boitesCursive();
  let x = 0;
  const morceaux = lettresMot(he).map((c) => {
    const b = B[c];
    x -= b.w;
    const p = `<path transform="translate(${(x - b.x).toFixed(1)} 0)" d="${CURSIVE[c]}" fill="currentColor" fill-rule="evenodd"/>`;
    x -= 26;
    return p;
  });
  const lettres = lettresMot(he).map((c) => B[c]);
  const haut = Math.min(...lettres.map((b) => b.y)) - 10, bas = Math.max(...lettres.map((b) => b.y + b.h)) + 10;
  return `<svg class="curs curs-mot" style="height:${Math.round((bas - haut) * .32)}px" viewBox="${x + 10} ${haut} ${-x} ${bas - haut}" role="img" aria-label="Mot en cursive">${morceaux.join('')}</svg>`;
}
// Repères visuels : hauteurs lues sur le dessin, et paires qui se ressemblent à la main
const CURS_SOSIES = { 'ו': 'ן', 'ן': 'ו', 'ס': 'ם', 'ם': 'ס', 'ך': 'ק', 'ק': 'ך', 'ף': 'ץ', 'ץ': 'ף' };
function repereLettre(c) {
  const b = boitesCursive()[c], reperes = [];
  if (b.y < 120) reperes.push('Elle monte nettement au-dessus de la ligne haute.');
  if (b.y + b.h > 650) reperes.push('Elle descend nettement sous la ligne basse.');
  return { texte: reperes.join(' '), sosie: CURS_SOSIES[c] };
}
const etoiles = (n) => (n ? '★'.repeat(n) + '☆'.repeat(3 - n) : '');

function cursive(onglet = 'tableau', idx) {
  const onglets = `<div class="tabs"><a href="#/cursive/tableau" class="${onglet === 'tableau' || onglet === 'lettre' ? 'on' : ''}">Les lettres</a><a href="#/cursive/lire" class="${onglet === 'lire' ? 'on' : ''}">M’entraîner à lire</a></div>`;
  if (onglet === 'lire') return cursiveLire(onglets);
  if (onglet === 'lettre' && CURS_LISTE[+idx]) return cursiveLettre(+idx, onglets);
  const tracees = CURS_LISTE.filter((x) => S.cursive[x.c]).length;
  app.innerHTML = `<h2>Écriture cursive</h2>
  <p class="sub">À la main, les Israéliens n’écrivent pas avec les lettres imprimées mais avec cet alphabet arrondi. Les voyelles sont rarement notées, et les lettres ne se relient pas entre elles. Touche une lettre pour l’agrandir et t’entraîner à la tracer.</p>
  ${onglets}
  <p class="hint">${tracees} lettre${tracees > 1 ? 's' : ''} tracée${tracees > 1 ? 's' : ''} sur ${CURS_LISTE.length}</p>
  <div class="curs-grille">${CURS_LISTE.map((x, i) => `<a class="card curs-case" href="#/cursive/lettre/${i}">${svgLettre(x.c)}<span class="he" lang="he" dir="rtl">${x.c}</span><small>${esc(x.nom)}</small><small class="curs-et">${etoiles(S.cursive[x.c]) || '&nbsp;'}</small></a>`).join('')}</div>`;
}

function cursiveLettre(i, onglets) {
  const x = CURS_LISTE[i], prec = CURS_LISTE[i - 1], suiv = CURS_LISTE[i + 1];
  app.innerHTML = `<div class="q-head"><a href="#/cursive">← Toutes les lettres</a><span>${i + 1}/${CURS_LISTE.length}</span></div>
  ${onglets}
  <div class="card center curs-fiche">
    <div class="curs-duo"><div>${svgLettre(x.c)}<small class="hint">À la main</small></div><div><span class="he curs-imp" lang="he" dir="rtl">${x.c}</span><small class="hint">Imprimée</small></div></div>
    <b>${esc(x.nom)}</b> · son : ${esc(x.L.sound)} ${sayBtn(x.L.he)}
    ${repereLettre(x.c).texte ? `<p class="hint">${esc(repereLettre(x.c).texte)}</p>` : ''}
    ${repereLettre(x.c).sosie ? `<div class="curs-sosie"><span class="hint">Attention, elle ressemble à :</span>${svgLettre(repereLettre(x.c).sosie)}<span class="he" lang="he" dir="rtl">${repereLettre(x.c).sosie}</span></div>` : ''}
  </div>
  <div class="section"><h3>À toi de la tracer</h3><div class="card center">
    <p class="sub" style="margin-top:0">Repasse sur le modèle avec ta souris ou ton doigt.</p>
    <canvas id="trace" class="curs-toile" width="640" height="640"></canvas>
    <p><label><input type="checkbox" id="sansModele"> Masquer le modèle</label></p>
    <div class="row" style="justify-content:center"><button class="btn ghost" id="efface">↺ Effacer</button><button class="btn green" id="verifie">Vérifier</button></div>
    <p class="hint" id="fb">${S.cursive[x.c] ? `Ton meilleur tracé : <span class="curs-et">${etoiles(S.cursive[x.c])}</span>` : '&nbsp;'}</p>
  </div></div>
  <div class="row mt" style="justify-content:space-between">${prec ? `<a class="btn ghost" href="#/cursive/lettre/${i - 1}">← ${prec.c}</a>` : '<span></span>'}${suiv ? `<a class="btn ghost" href="#/cursive/lettre/${i + 1}">${suiv.c} →</a>` : '<span></span>'}</div>`;
  traceurCursive($('#trace'), x.c);
}

// Toile de tracé : 320 unités de côté, la lettre y est centrée
function traceurCursive(toile, c) {
  const COTE = 320, b = boitesCursive()[c];
  const echelle = Math.min(250 / b.w, 250 / b.h, 1.15);
  const dx = COTE / 2 - (b.x + b.w / 2) * echelle, dy = COTE / 2 - (b.y + b.h / 2) * echelle;
  const lettre = new Path2D(CURSIVE[c]);
  const ctx = toile.getContext('2d');
  let traits = [], courant = null, sansModele = false;
  const placer = (g, k) => g.setTransform(k * echelle, 0, 0, k * echelle, k * dx, k * dy);
  const encre = (g, k, largeur, couleur) => {
    g.setTransform(k, 0, 0, k, 0, 0);
    g.lineCap = g.lineJoin = 'round'; g.lineWidth = largeur; g.strokeStyle = couleur; g.fillStyle = couleur;
    traits.forEach((t) => {
      g.beginPath();
      if (t.length === 1) { g.arc(t[0][0], t[0][1], largeur / 2, 0, 7); g.fill(); return; }
      t.forEach(([px, py], n) => (n ? g.lineTo(px, py) : g.moveTo(px, py)));
      g.stroke();
    });
  };
  const dessiner = () => {
    const encreCouleur = getComputedStyle(toile).color;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, toile.width, toile.height);
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    ctx.strokeStyle = 'rgba(128,128,160,.35)'; ctx.lineWidth = 1; ctx.setLineDash([5, 5]);
    [CURS_HAUT, CURS_BAS].forEach((y) => { const py = y * echelle + dy; ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(COTE, py); ctx.stroke(); });
    ctx.setLineDash([]);
    if (!sansModele) { placer(ctx, 2); ctx.fillStyle = 'rgba(228,106,146,.28)'; ctx.fill(lettre, 'evenodd'); }
    encre(ctx, 2, 7, encreCouleur);
  };
  const point = (e) => { const r = toile.getBoundingClientRect(); return [(e.clientX - r.left) * COTE / r.width, (e.clientY - r.top) * COTE / r.height]; };
  toile.onpointerdown = (e) => { e.preventDefault(); toile.setPointerCapture?.(e.pointerId); courant = [point(e)]; traits.push(courant); dessiner(); };
  toile.onpointermove = (e) => { if (courant) { courant.push(point(e)); dessiner(); } };
  toile.onpointerup = toile.onpointercancel = () => { courant = null; };
  $('#efface').onclick = () => { traits = []; dessiner(); $('#fb').innerHTML = '&nbsp;'; };
  $('#sansModele').onchange = (e) => { sansModele = e.target.checked; dessiner(); };
  // La note compare deux surfaces : la lettre recouverte, et l'encre restée près de la lettre
  const noter = () => {
    const k = .5, N = COTE * k;
    const masque = (remplir) => {
      const cv = document.createElement('canvas'); cv.width = cv.height = N;
      const g = cv.getContext('2d', { willReadFrequently: true }); remplir(g);
      return g.getImageData(0, 0, N, N).data;
    };
    const m = masque((g) => { placer(g, k); g.fillStyle = '#000'; g.fill(lettre, 'evenodd'); });
    const large = masque((g) => { placer(g, k); g.fillStyle = g.strokeStyle = '#000'; g.fill(lettre, 'evenodd'); g.lineWidth = 34 / echelle; g.lineJoin = 'round'; g.stroke(lettre); });
    const couvrant = masque((g) => encre(g, k, 30, '#000'));
    const fin = masque((g) => encre(g, k, 4, '#000'));
    let lettrePx = 0, couvert = 0, encrePx = 0, proche = 0;
    for (let i = 3; i < m.length; i += 4) {
      if (m[i] > 100) { lettrePx++; if (couvrant[i] > 100) couvert++; }
      if (fin[i] > 100) { encrePx++; if (large[i] > 100) proche++; }
    }
    return { couverture: lettrePx ? couvert / lettrePx : 0, precision: encrePx ? proche / encrePx : 0 };
  };
  $('#verifie').onclick = () => {
    if (!traits.length) return toast('Trace d’abord la lettre.');
    const { couverture, precision } = noter();
    const note = couverture >= .85 && precision >= .8 ? 3 : couverture >= .7 && precision >= .65 ? 2 : couverture >= .5 && precision >= .5 ? 1 : 0;
    const ancien = S.cursive[c] || 0;
    if (note > ancien) { S.cursive[c] = note; save(); addXP((note - ancien) * 4); }
    if (note === 3) { lucioles(toile); confetti(); }
    const conseil = couverture < precision ? 'Il manque des morceaux de la lettre.' : 'Ton tracé s’éloigne un peu du modèle.';
    $('#fb').innerHTML = note ? `<span class="curs-et">${etoiles(note)}</span> ${note === 3 ? 'Superbe tracé !' : conseil}` : `Pas encore. ${conseil}`;
  };
  dessiner();
}

function cursiveLire(onglets) {
  const types = shuffle(['lettre', 'lettre', 'lettre', 'imprimee', 'imprimee', 'imprimee', 'mot', 'mot', 'mot', 'mot']);
  const pool = WORDS.filter((w) => !/\s|־/.test(w.he) && lettresMot(w.he).length >= 2 && lettresMot(w.he).length <= 6 && (w.theme !== 'dehors' || S.found.includes(w.he.normalize('NFC'))));
  const fr = [...new Set(WORDS.map((w) => w.fr))];
  const questions = types.map((type) => {
    if (type === 'mot') { const w = pick(pool, 1)[0]; return { type, w, opts: options(w.fr, fr) }; }
    const x = pick(CURS_LISTE, 1)[0];
    return { type, x, opts: options(x.c, CURS_LISTE.map((y) => y.c)) };
  });
  let k = 0, bonnes = 0, xp = 0;
  const montrer = () => {
    if (k >= questions.length) return finir();
    const q = questions[k];
    const juste = q.type === 'mot' ? q.w.fr : q.x.c;
    const enonce = q.type === 'mot' ? `${svgMot(q.w.he)}<p class="sub">Que veut dire ce mot écrit à la main ?</p>`
      : q.type === 'lettre' ? `${svgLettre(q.x.c)}<p class="sub">Quelle est cette lettre ?</p>`
      : `<span class="he curs-imp" lang="he" dir="rtl">${q.x.c}</span><p class="sub">Comment s’écrit-elle à la main ?</p>`;
    const rendu = (o) => (q.type === 'mot' ? esc(o) : q.type === 'lettre' ? esc(o) : svgLettre(o));
    app.innerHTML = `<div class="q-head"><span>🖋️ Lire la cursive</span><span>${k + 1}/${questions.length}</span></div>
    <div class="progress"><i style="width:${(k / questions.length) * 100}%"></i></div>
    <div class="card"><div class="prompt center">${enonce}</div>
    <div class="opts">${q.opts.map((o, j) => `<button class="opt ${q.type === 'lettre' ? 'he' : ''} ${q.type === 'imprimee' ? 'opt-curs' : ''}" data-j="${j}" ${q.type === 'lettre' ? 'lang="he" dir="rtl"' : ''}><kbd>${j + 1}</kbd>${rendu(o)}</button>`).join('')}</div>
    <p class="center hint" id="fb">&nbsp;</p></div>`;
    let bloque = false;
    const choisir = (j) => {
      if (bloque) return; bloque = true;
      const ok = q.opts[j] === juste;
      $$('.opt').forEach((b, x) => { b.disabled = true; if (q.opts[x] === juste) b.classList.add('ok'); else if (x === j) b.classList.add('ko'); });
      S.stats.q++; if (ok) { S.stats.ok++; bonnes++; xp += 8; lucioles($$('.opt')[j]); }
      save();
      const det = q.type === 'mot' ? `${HE(q.w.he)} ${TRS(q.w.tr)}${esc(q.w.fr)}` : `${HE(q.x.c)} ${esc(q.x.nom)}`;
      $('#fb').innerHTML = `${ok ? '✅ Bravo !' : '❌ La bonne réponse :'} ${det}`;
      speak(q.type === 'mot' ? q.w.he : q.x.L.he);
      later(() => { k++; montrer(); }, ok ? 1500 : 2800);
    };
    $$('.opt').forEach((b) => (b.onclick = () => choisir(+b.dataset.j)));
    keyHandler = (e) => { const n = +e.key; if (n >= 1 && n <= q.opts.length) choisir(n - 1); };
  };
  const finir = () => {
    keyHandler = null;
    S.stats.quiz++; save();
    addXP(xp);
    if (bonnes === questions.length) confetti();
    app.innerHTML = `<div class="card center result"><div class="em">🖋️</div><h2>${bonnes === questions.length ? 'Sans faute !' : 'Entraînement terminé'}</h2><p class="score">${bonnes} / ${questions.length}</p><p class="sub">+${xp} XP</p>
    <div class="row" style="justify-content:center"><button class="btn gold" id="cagain">Encore !</button><a class="btn ghost" href="#/cursive">Revoir les lettres</a></div></div>`;
    $('#cagain').onclick = () => cursiveLire(onglets);
  };
  montrer();
}

/* ============ Mes erreurs ============ */
function erreurs() {
  const mots = motsEnErreur();
  if (!mots.length) {
    app.innerHTML = `<div class="card center result"><div class="em">🌿</div><h2>Aucune erreur à retravailler</h2><p class="sub">Les mots que tu rates aux quiz, au Défi 60 s et dans la séance du jour viendront ici.</p><div class="row" style="justify-content:center"><a class="btn gold" href="#/quiz">Faire un quiz</a></div></div>`;
    return;
  }
  app.innerHTML = `<h2>Mes erreurs</h2>
  <p class="sub">Un mot quitte cette liste quand tu l’as réussi deux fois. Il revient aussi en priorité dans ta séance du jour.</p>
  <p><a class="btn gold" href="#/quiz/erreurs">🎯 Retravailler ${mots.length > 10 ? '10 de ces mots' : mots.length > 1 ? `ces ${mots.length} mots` : 'ce mot'}</a></p>
  <div class="card sea-new err-list">${mots.map((w) => `<div>${HE(w.he)}<small>${TRS(w.tr)}${esc(w.fr)}</small><em class="hint">${S.erreurs[w.he] === 1 ? 'encore 1 fois' : 'encore 2 fois'}</em>${sayBtn(w.he)}</div>`).join('')}</div>`;
}

/* ============ Aides à la lecture : voyelles et translittération ============ */
const TEXTES_HE = new WeakMap();
const nikoudGarde = () => /^#\/(alphabet|grammaire|quiz\/(lettres|syllabes))/.test(location.hash);
// Voyelles progressives : un mot maîtrisé (bien reconnu 3 fois de suite) s'affiche sans voyelles
const VOY_SEUIL = 3;
let INDEX_VOY = null, TAILLE_VOY = 0;
function motMaitrise(texte) {
  if (!S.voyProg) return false;
  if (!INDEX_VOY || TAILLE_VOY !== WORDS.length) { INDEX_VOY = new Map(WORDS.map((w) => [NFC(w.he), w.he])); TAILLE_VOY = WORDS.length; }
  const he = INDEX_VOY.get(NFC(texte.trim()));
  return !!(he && S.cards[he] && S.cards[he].box >= VOY_SEUIL);
}
function appliquerNikoud(racine) {
  const garde = nikoudGarde();
  const masquer = S.sansVoyelles && !garde;
  const traiter = (n) => {
    const origine = TEXTES_HE.has(n) ? TEXTES_HE.get(n) : n.nodeValue;
    if (strip(origine) === origine) return;
    TEXTES_HE.set(n, origine);
    const titre = n.parentElement && n.parentElement.closest('.v-title');
    const maitrise = !masquer && !garde && !titre && motMaitrise(origine);
    n.nodeValue = (masquer && !titre) || maitrise ? strip(origine) : origine;
    if (n.parentElement) {
      n.parentElement.classList.toggle('voy-maitrise', maitrise);
      if (maitrise) n.parentElement.setAttribute('title', `Mot maîtrisé : ${origine.trim()}`);
      else if ((n.parentElement.getAttribute('title') || '').startsWith('Mot maîtrisé')) n.parentElement.removeAttribute('title');
    }
  };
  if (racine.nodeType === 3) return traiter(racine);
  if (racine.nodeType !== 1) return;
  const w = document.createTreeWalker(racine, NodeFilter.SHOW_TEXT);
  while (w.nextNode()) traiter(w.currentNode);
}
function appliquerAides() {
  document.body.classList.toggle('sans-tr', S.sansTranslit);
  [$('#app'), $('#toast')].forEach(appliquerNikoud);
  const b = $('#hAide');
  b.classList.toggle('actif', S.sansVoyelles || S.sansTranslit);
}
function initAides() {
  const b = $('#hAide'), pop = $('#aidePop');
  $('#aideV').checked = !S.sansVoyelles;
  $('#aideT').checked = !S.sansTranslit;
  b.onclick = (e) => { e.stopPropagation(); pop.hidden = !pop.hidden; };
  pop.onclick = (e) => e.stopPropagation();
  document.addEventListener('click', () => { pop.hidden = true; });
  $('#aideV').onchange = (e) => { S.sansVoyelles = !e.target.checked; save(); appliquerAides(); };
  $('#aideT').onchange = (e) => { S.sansTranslit = !e.target.checked; save(); appliquerAides(); };
  if ($('#aideP')) { $('#aideP').checked = !!S.voyProg; $('#aideP').onchange = (e) => { S.voyProg = e.target.checked; save(); appliquerAides(); }; }
  const obs = new MutationObserver((liste) => { if (S.sansVoyelles || S.voyProg) liste.forEach((m) => m.addedNodes.forEach(appliquerNikoud)); });
  [$('#app'), $('#toast')].forEach((el) => obs.observe(el, { childList: true, subtree: true }));
  appliquerAides();
}

/* ============ Exercices de conjugaison ============ */
const CONJ_TEMPS = {
  passe: { nom: 'Passé', pers: [['je', ['je']], ['tu (masc.)', ['tum']], ['tu (fém.)', ['tuf']], ['il', ['il']], ['elle', ['elle']], ['nous', ['nous']], ['vous (masc.)', ['vm']], ['vous (fém.)', ['vf']], ['ils / elles', ['ilsm', 'ilsf']]] },
  present: { nom: 'Présent', pers: [['il (masc. sing.)', ['il']], ['elle (fém. sing.)', ['elle']], ['ils (masc. plur.)', ['ilsm']], ['elles (fém. plur.)', ['ilsf']]] },
  futur: { nom: 'Futur', pers: [['je', ['je']], ['tu (masc.)', ['tum']], ['tu (fém.)', ['tuf']], ['il', ['il']], ['elle', ['elle']], ['nous', ['nous']], ['vous', ['vm', 'vf']], ['ils / elles', ['ilsm', 'ilsf']]] },
};
const CONJ_NB = 10;
const cleForme = (he) => (S.sansVoyelles ? strip(he) : he);
const nbFormes = (v, t) => (v[t] ? v[t].split(',').length : 0);
const conjCle = (v, t, i) => `${v.tr}|${t}|${i}`;
const pronomsHe = (t, i) => CONJ_TEMPS[t].pers[i][1].map((p) => PRONOMS[p]).join(' / ');
// Part des formes d'un verbe réussies au moins deux fois de suite
function maitriseVerbe(v) {
  let total = 0, sues = 0;
  Object.keys(CONJ_TEMPS).forEach((t) => { for (let i = 0; i < nbFormes(v, t); i++) { total++; if ((S.conj[conjCle(v, t, i)] || 0) >= 2) sues++; } });
  return Math.round((sues / total) * 100);
}
function tirerFormes(verbes, temps) {
  const toutes = verbes.flatMap((v) => temps.flatMap((t) => [...Array(nbFormes(v, t)).keys()].map((i) => ({ v, t, i }))));
  const triees = () => toutes.map((f) => [(S.conj[conjCle(f.v, f.t, f.i)] || 0) + Math.random() * 1.5, f]).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
  let liste = triees();
  while (liste.length < CONJ_NB) liste = [...liste, ...shuffle(toutes)];
  return liste.slice(0, CONJ_NB);
}
function typeQuestion(f, k, niveau) {
  if (niveau === 'ecrire' && k % 2 === 1) return 'ecrire';
  const r = Math.random();
  if (r < .6) return 'forme';
  if (r < .85) return 'qui';
  const he = cleForme(forme(f.v[f.t], f.i).he);
  const ailleurs = Object.keys(CONJ_TEMPS).filter((t) => t !== f.t && f.v[t]);
  const ambigu = ailleurs.some((t) => f.v[t].split(',').some((x) => cleForme(x.split(' ')[0]) === he));
  return ailleurs.length && !ambigu ? 'temps' : 'forme';
}

function conjexo(trVerbe) {
  const fixe = VERBES.find((x) => x.tr === trVerbe);
  let temps = new Set(['passe', 'present', 'futur']), niveau = 'choix';
  if (fixe && !fixe.present) temps.delete('present');
  const dessiner = () => {
    app.innerHTML = `<div class="q-head"><a href="${fixe ? `#/conjugaison/${fixe.tr}` : '#/conjugaison'}">← ${fixe ? esc(fixe.fr) : 'Tous les verbes'}</a></div>
    <h2>M’entraîner à conjuguer</h2>
    <p class="sub">${CONJ_NB} questions. Les formes que tu connais le moins reviennent en priorité.</p>
    <h3>Quels temps ?</h3>
    <div class="modes">${Object.entries(CONJ_TEMPS).filter(([t]) => !fixe || fixe[t]).map(([t, x]) => `<button class="mode ${temps.has(t) ? 'on' : ''}" data-t="${t}"><b>${x.nom}</b></button>`).join('')}</div>
    <h3>Quel niveau ?</h3>
    <div class="modes">
      <button class="mode ${niveau === 'choix' ? 'on' : ''}" data-n="choix"><b>Reconnaître</b><small>Tu choisis la bonne réponse parmi plusieurs</small></button>
      <button class="mode ${niveau === 'ecrire' ? 'on' : ''}" data-n="ecrire"><b>Écrire aussi</b><small>Une question sur deux : tu écris la forme, lettre par lettre</small></button>
    </div>
    <p class="row">${fixe ? '' : `<label>Verbes : <select class="select" id="cvb"><option value="">Les ${VERBES.length} verbes</option>${VERBES.map((v) => `<option value="${esc(v.tr)}">${esc(v.fr)}${S.sansTranslit ? '' : ` (${esc(v.tr)})`}</option>`).join('')}</select></label>`}
    <button class="btn gold" id="cgo">C’est parti !</button></p>`;
    $$('.mode[data-t]').forEach((b) => (b.onclick = () => {
      const t = b.dataset.t;
      if (temps.has(t) && temps.size === 1) return toast('Garde au moins un temps.');
      if (temps.has(t)) temps.delete(t); else temps.add(t);
      b.classList.toggle('on', temps.has(t));
    }));
    $$('.mode[data-n]').forEach((b) => (b.onclick = () => { niveau = b.dataset.n; $$('.mode[data-n]').forEach((x) => x.classList.toggle('on', x === b)); }));
    $('#cgo').onclick = () => {
      const choisi = fixe || VERBES.find((x) => x.tr === $('#cvb').value);
      const verbes = choisi ? [choisi] : VERBES;
      const ts = [...temps].filter((t) => verbes.some((v) => v[t]));
      if (!ts.length) return toast('Ce verbe n’a pas de forme au présent : choisis un autre temps.');
      lancerConj(verbes, ts, niveau, trVerbe);
    };
  };
  dessiner();
}

function lancerConj(verbes, temps, niveau, trVerbe) {
  const qs = tirerFormes(verbes, temps).map((f, k) => ({ ...f, type: typeQuestion(f, k, niveau) }));
  const nbPremieres = qs.length;
  let k = 0, bonnes = 0, xp = 0;
  const ratees = [];
  const montrer = () => {
    if (k >= qs.length) return finir();
    const q = qs[k], { v, t, i, type, encore } = q;
    const f = forme(v[t], i), personne = CONJ_TEMPS[t].pers[i][0], tete = `<div class="q-head"><span>${encore ? '🔁 On y revient' : '🎯 Conjugaison'}</span><span>${k + 1}/${qs.length}</span></div><div class="progress"><i style="width:${(k / qs.length) * 100}%"></i></div>`;
    const verbe = `<div class="cap">${type === 'temps' ? '' : `${CONJ_TEMPS[t].nom} · `}${esc(v.fr)}<span class="tr-x"> · ${esc(v.tr)}</span></div>`;
    const quiEnonce = `<div class="cq-qui">${esc(personne)}</div>${HE(pronomsHe(t, i), 'cq-pron')}`;
    let bloque = false;
    const repondre = (ok) => {
      if (bloque) return; bloque = true;
      const cle = conjCle(v, t, i);
      if (!encore) { S.stats.q++; if (ok) S.stats.ok++; }
      if (ok) {
        S.conj[cle] = Math.min((S.conj[cle] || 0) + 1, 3);
        if (!encore) { bonnes++; xp += type === 'ecrire' ? 10 : 6; }
      } else {
        S.conj[cle] = 0;
        if (!ratees.some((r) => r.cle === cle)) ratees.push({ cle, he: f.he, tr: f.tr, personne, temps: CONJ_TEMPS[t].nom, fr: v.fr });
        if (!encore) qs.push({ v, t, i, type: type === 'ecrire' ? 'ecrire' : 'forme', encore: true });
      }
      save();
      $('#fb').innerHTML = `${ok ? '✅ Bravo !' : '❌ La bonne réponse :'} ${HE(f.he)} <b class="tr-x">${esc(f.tr)} · </b>${esc(personne)}, ${esc(CONJ_TEMPS[t].nom.toLowerCase())}`;
      speak(f.he);
      later(() => { k++; montrer(); }, ok ? 1500 : 3000);
    };
    if (type === 'ecrire') return montrerEcriture(tete, verbe, quiEnonce, f, repondre);
    let opts, enonce, enHebreu = false;
    if (type === 'forme') {
      const vues = new Set([cleForme(f.he)]);
      const autres = v[t].split(',').map((x) => x.split(' ')[0]).filter((he) => { const c = cleForme(he); if (vues.has(c)) return false; vues.add(c); return true; });
      opts = shuffle([{ html: esc(f.he), bon: true }, ...pick(autres, 3).map((he) => ({ html: esc(he) }))]);
      enHebreu = true;
      enonce = `<div class="center">${quiEnonce}</div>`;
    } else if (type === 'qui') {
      // Plusieurs personnes peuvent avoir la même forme (au futur : « tu » masc. et « elle »)
      const groupes = {};
      CONJ_TEMPS[t].pers.forEach((p, x) => { const he = cleForme(forme(v[t], x).he); (groupes[he] = groupes[he] || []).push(p[0]); });
      const bon = groupes[cleForme(f.he)].join(' ou ');
      const autres = Object.entries(groupes).filter(([he]) => he !== cleForme(f.he)).map(([, l]) => l.join(' ou '));
      opts = shuffle([{ html: esc(bon), bon: true }, ...pick(autres, 3).map((x) => ({ html: esc(x) }))]);
      enonce = `<div class="center">Qui fait l’action ?<div class="big">${HE(f.he)}</div>${sayBtn(f.he)}</div>`;
    } else {
      opts = Object.keys(CONJ_TEMPS).filter((x) => v[x]).map((x) => ({ html: CONJ_TEMPS[x].nom, bon: x === t }));
      enonce = `<div class="center">À quel temps est cette forme ?<div class="big">${HE(f.he)}</div>${sayBtn(f.he)}</div>`;
    }
    app.innerHTML = `${tete}<div class="card">${verbe}<div class="prompt">${enonce}</div>
      <div class="opts">${opts.map((o, j) => `<button class="opt ${enHebreu ? 'he' : ''}" data-j="${j}" ${enHebreu ? 'lang="he" dir="rtl"' : ''}><kbd>${j + 1}</kbd>${o.html}</button>`).join('')}</div>
      <p class="center hint" id="fb">&nbsp;</p></div>`;
    const choisir = (j) => {
      if (bloque) return;
      $$('.opt').forEach((b, x) => { b.disabled = true; if (opts[x].bon) b.classList.add('ok'); else if (x === j) b.classList.add('ko'); });
      if (opts[j].bon) lucioles($$('.opt')[j]);
      repondre(!!opts[j].bon);
    };
    $$('.opt').forEach((b) => (b.onclick = () => choisir(+b.dataset.j)));
    keyHandler = (e) => { const n = +e.key; if (n >= 1 && n <= opts.length) choisir(n - 1); };
  };

  const montrerEcriture = (tete, verbe, quiEnonce, f, repondre) => {
    const cible = LETTER_ONLY(f.he);
    const leurresL = shuffle([...'אתינוהםןך'].filter((l) => !cible.includes(l))).slice(0, Math.max(3, 9 - cible.length));
    const tuiles = shuffle([...cible, ...leurresL]);
    let tape = [], fini = false;
    app.innerHTML = `${tete}<div class="card center">${verbe}<div class="prompt">${quiEnonce}</div>
      <p class="sub">Écris cette forme sans voyelles, de droite à gauche. ${sayBtn(f.he)}</p>
      <div class="slots" id="slots"></div>
      <div class="tiles" id="tiles">${tuiles.map((l, j) => `<button class="tl" data-j="${j}" lang="he">${l}</button>`).join('')}</div>
      <div class="row mt" style="justify-content:center"><button class="btn ghost" id="clr">↺ Effacer</button><button class="btn green" id="chk">Vérifier</button></div>
      <p class="hint" id="fb">Rappel : les lettres ך ם ן ף ץ ne s’utilisent qu’en fin de mot.</p></div>`;
    const rendu = () => {
      $('#slots').innerHTML = tape.map((j, x) => `<button class="tl" data-x="${x}" lang="he">${tuiles[j]}</button>`).join('');
      $$('#tiles .tl').forEach((b) => b.classList.toggle('used', tape.includes(+b.dataset.j)));
      $$('#slots .tl').forEach((b) => (b.onclick = () => { if (!fini) { tape.splice(+b.dataset.x, 1); rendu(); } }));
    };
    $$('#tiles .tl').forEach((b) => (b.onclick = () => { if (!fini && !tape.includes(+b.dataset.j)) { tape.push(+b.dataset.j); rendu(); } }));
    $('#clr').onclick = () => { if (!fini) { tape = []; rendu(); } };
    const verifier = () => {
      if (fini) return;
      if (!tape.length) return toast('Touche des lettres pour écrire la forme.');
      fini = true;
      repondre(tape.map((j) => tuiles[j]).join('') === cible.join(''));
    };
    $('#chk').onclick = verifier;
    keyHandler = (e) => { if (e.key === 'Enter') { e.preventDefault(); verifier(); } };
  };

  const finir = () => {
    keyHandler = null;
    S.stats.quiz++; save();
    const gagne = xp + 5;
    addXP(gagne);
    if (bonnes === nbPremieres) confetti();
    const retour = verbes.length === 1 ? `#/conjugaison/${verbes[0].tr}` : '#/conjugaison';
    app.innerHTML = `<div class="card center result"><div class="em">${bonnes === nbPremieres ? '🏆' : bonnes >= nbPremieres * .7 ? '🎉' : '💪'}</div>
      <h2>${bonnes === nbPremieres ? 'Sans faute !' : 'Entraînement terminé'}</h2><p class="score">${bonnes} / ${nbPremieres}</p><p class="sub">+${gagne} XP</p>
      ${ratees.length ? `<div class="sea-new"><div class="cap">À revoir</div>${ratees.map((r) => `<div>${HE(r.he)}<small>${TRS(r.tr)}${esc(r.personne)}, ${esc(r.temps.toLowerCase())} · ${esc(r.fr)}</small>${sayBtn(r.he)}</div>`).join('')}</div>` : ''}
      <div class="row" style="justify-content:center"><button class="btn gold" id="cagain">Encore !</button><a class="btn ghost" href="${retour}">Voir les tableaux</a></div></div>`;
    $('#cagain').onclick = () => lancerConj(verbes, temps, niveau, trVerbe);
  };
  montrer();
}

/* ============ Écouter et signaler les sons ============ */
function listeSons(choix) {
  const ligne = (he, tr, fr) => ({ he, tr: tr || '', fr: fr || '' });
  const connu = (he) => { const k = NFC(he), w = WORDS.find((x) => NFC(x.he) === k); return w ? ligne(w.he, w.tr, w.fr) : ligne(he); };
  if (choix === 'priorite' || choix === 'refaits') return window.SONS_A_ECOUTER[choix].map(connu);
  if (choix === 'faux') {
    const tous = ['priorite', 'refaits', 'verbes', 'grammaire', 'histoires', ...THEMES.map((t) => t.id)].flatMap(listeSons);
    const vus = new Set();
    return tous.filter((l) => { const k = NFC(l.he); if (S.sonsAvis[k] !== 'faux' || vus.has(k)) return false; vus.add(k); return true; });
  }
  if (choix === 'verbes') return VERBES.flatMap((v) => [ligne(v.he, v.tr, v.fr), ...['passe', 'present', 'futur'].flatMap((t) => (v[t] ? v[t].split(',') : []).map((f, i) => { const x = forme(v[t], i); return ligne(x.he, x.tr, `${v.fr}, ${CONJ_TEMPS[t].nom.toLowerCase()}, ${CONJ_TEMPS[t].pers[i][0]}`); }))]);
  if (choix === 'grammaire') return GRAMMAIRE.flatMap((l) => l.exemples.map((e) => ligne(e.he, e.tr, e.fr)));
  if (choix === 'histoires') return [...STORIES, ...STORIES_VIE].flatMap((s) => s.lines.flatMap((l) => [ligne(l.he, l.tr, l.fr), ...(l.choices || []).filter((c) => c.ok).map((c) => ligne(c.he, c.tr, c.fr))]));
  const t = THEMES.find((x) => x.id === choix);
  return t ? t.words.map(([he, tr, fr]) => ligne(he, tr, fr)) : [];
}
function pageSons(choix = 'priorite') {
  const avis = () => Object.values(S.sonsAvis);
  const nbFaux = () => avis().filter((a) => a === 'faux').length;
  const options = [['priorite', '⭐ À écouter en priorité'], ['refaits', '🔧 Sons corrigés récemment'], ['faux', '🚩 Mes sons signalés'], ['verbes', '📝 Conjugaisons'], ['grammaire', '📐 Exemples de grammaire'], ['histoires', '📖 Histoires'], ...THEMES.map((t) => [t.id, `${t.emoji} ${t.name}`])];
  const liste = listeSons(choix);
  app.innerHTML = `<div class="q-head"><a href="#/progres">← Mes progrès</a></div><h2>Écouter et signaler les sons</h2>
  <p class="sub">Ces sons n’ont pas été vérifiés à l’oreille : la tienne est le vrai contrôle. Marque chaque son ✓ s’il te semble juste, 🚩 s’il est faux. Une vraie voix signalée passe aussitôt à la voix de synthèse ; un son de synthèse signalé est refait par Claude avec une autre voix. Partout ailleurs sur le site, la bulle « 🚩 Mal prononcé ? » qui suit chaque son fait la même chose.</p>
  <p class="row"><label>Liste : <select class="select" id="sonListe">${options.map(([v, n]) => `<option value="${esc(v)}" ${v === choix ? 'selected' : ''}>${esc(n)}</option>`).join('')}</select></label>
  <button class="btn ghost" id="sonTout" type="button">▶ Tout écouter</button></p>
  <p class="hint" id="sonBilan"></p>
  <div class="card son-liste">${liste.length ? liste.map((l, i) => `<div class="son-ligne" data-i="${i}">${HE(l.he)}<small>${l.tr ? TRS(l.tr) : ''}${esc(l.fr)}<em class="hint"> · ${sourceSon(l.he)}</em></small><span class="son-actions">${sayBtn(l.he)}<button type="button" class="say son-ok" title="Le son est juste">✓</button><button type="button" class="say son-faux" title="Le son est faux">🚩</button></span></div>`).join('') : '<p class="sub" style="margin:0">Rien dans cette liste pour l’instant.</p>'}</div>
  <div class="section"><h3>Me transmettre tes signalements</h3><div class="card"><p id="sonNb" style="margin:0 0 10px"></p><button class="btn" id="sonCopie" type="button">📋 Copier la liste</button><textarea class="select son-texte" id="sonTexte" readonly hidden></textarea><p class="hint" id="sonTransmis">Colle ensuite cette liste dans ta conversation avec Claude pour les faire corriger.</p></div></div>`;
  const majBilan = () => {
    const faits = liste.filter((l) => S.sonsAvis[NFC(l.he)]).length;
    $('#sonBilan').textContent = `${faits} écouté${faits > 1 ? 's' : ''} sur ${liste.length} dans cette liste`;
    $('#sonNb').textContent = nbFaux() ? `${nbFaux()} son${nbFaux() > 1 ? 's' : ''} signalé${nbFaux() > 1 ? 's' : ''}.` : 'Aucun son signalé pour l’instant.';
    $('#sonCopie').disabled = !nbFaux();
  };
  const majLigne = (d) => {
    const a = S.sonsAvis[NFC(liste[+d.dataset.i].he)];
    d.querySelector('.son-ok').classList.toggle('on', a === 'ok');
    d.querySelector('.son-faux').classList.toggle('on', a === 'faux');
    d.querySelector('em').textContent = ` · ${sourceSon(liste[+d.dataset.i].he)}`;
  };
  $$('.son-ligne').forEach((d) => {
    const k = NFC(liste[+d.dataset.i].he);
    const donner = (valeur) => { if (S.sonsAvis[k] === valeur) delete S.sonsAvis[k]; else S.sonsAvis[k] = valeur; save(); majLigne(d); majBilan(); if (typeof envoyerAvis === 'function') envoyerAvis(k, S.sonsAvis[k] || 'aucun', liste[+d.dataset.i]); };
    d.querySelector('.son-ok').onclick = () => donner('ok');
    d.querySelector('.son-faux').onclick = () => donner('faux');
    majLigne(d);
  });
  $('#sonListe').onchange = (e) => { stopAudio(); pageSons(e.target.value); };
  // Lecture à la suite, interrompue si on relance ou si on quitte la page
  let lecture = 0;
  $('#sonTout').onclick = async (e) => {
    const b = e.target, tour = ++lecture;
    if (b.dataset.actif) { delete b.dataset.actif; b.textContent = '▶ Tout écouter'; stopAudio(); return; }
    b.dataset.actif = '1'; b.textContent = '⏹ Arrêter';
    const ici = location.hash;
    for (let i = 0; i < liste.length && tour === lecture && location.hash === ici; i++) {
      const d = $(`.son-ligne[data-i="${i}"]`);
      if (!d) break;
      $$('.son-ligne.joue').forEach((x) => x.classList.remove('joue'));
      d.classList.add('joue'); d.scrollIntoView({ block: 'nearest' });
      await speak(liste[i].he);
      await new Promise((r) => setTimeout(r, 700));
    }
    if (tour === lecture && b.isConnected) { delete b.dataset.actif; b.textContent = '▶ Tout écouter'; $$('.son-ligne.joue').forEach((x) => x.classList.remove('joue')); }
  };
  $('#sonCopie').onclick = async () => {
    const lignes = listeSons('faux').map((l) => `${l.he} | ${l.tr} | ${l.fr} | ${sourceSon(l.he)}`);
    const texte = `Sons à corriger :\n${lignes.join('\n')}`;
    try { await navigator.clipboard.writeText(texte); toast('📋 Liste copiée'); }
    catch { const z = $('#sonTexte'); z.hidden = false; z.value = texte; z.select(); toast('Copie la liste affichée ci-dessous'); }
  };
  majBilan();
  if (typeof majTransmission === 'function') majTransmission();
}
function sourceSon(he) {
  const k = NFC(he);
  if ((S.sonsAvis[k] === 'faux' || (window.SONS_REFAITS || {})[k]) && HUMAN[k] && SOUNDS[k]) return 'voix de synthèse (vraie voix écartée)';
  return HUMAN[k] ? 'vraie voix' : SOUNDS[k] ? 'voix de synthèse' : 'voix du navigateur';
}

/* ============ Ajouter les mots des histoires à « Mes mots » ============ */
const FORMES_NFC = Object.fromEntries(Object.entries(FORMES_HISTOIRES).map(([a, b]) => [NFC(a), NFC(b)]));
function motHistoire(jeton) {
  const n = NFC(jeton), base = FORMES_NFC[n] || n;
  const connu = WORDS.find((w) => NFC(w.he) === base);
  if (connu) return { he: connu.he, tr: connu.tr, fr: connu.fr, perso: connu.theme === 'mesmots' };
  const nouveau = MOTS_HISTOIRES.find((m) => NFC(m[0]) === base);
  return nouveau ? { he: nouveau[0], tr: nouveau[1], fr: nouveau[2], nouveau: true } : null; // prénoms et noms de lieux : ignorés
}
function motsDeTextes(textes) {
  const vus = new Set(), mots = [];
  textes.forEach((t) => (t.match(/[א-ת֑-ׇ]+/g) || []).forEach((j) => {
    const m = motHistoire(j);
    if (m && !vus.has(NFC(m.he))) { vus.add(NFC(m.he)); mots.push(m); }
  }));
  return mots;
}
function ligneMot(m) {
  const etat = m.nouveau ? '<button class="link hist-add" type="button">➕ Ajouter</button>'
    : m.perso ? '<button class="link hist-add" type="button">⭐ Retirer</button>'
    : '<span class="hint">✓ Déjà dans tes cartes</span>';
  return `<div class="hist-mot" data-he="${esc(m.he)}">${HE(m.he)}<small>${TRS(m.tr)}${esc(m.fr)}</small>${sayBtn(m.he)}${etat}</div>`;
}
function brancherMots(zone) {
  zone.querySelectorAll('.hist-add').forEach((b) => (b.onclick = () => {
    const he = b.closest('.hist-mot').dataset.he;
    if (estDansMesMots(he)) {
      retirerMesMots(he); b.textContent = '➕ Ajouter'; toast('Mot retiré de « Mes mots »');
    } else {
      const m = motHistoire(he);
      ajouterMesMots([m.he, m.tr, m.fr]); b.textContent = '⭐ Retirer'; toast('⭐ Ajouté à « Mes mots »');
    }
  }));
}

/* ============ Séance du jour ============ */
const SEANCE = { revisions: 8, nouveaux: 10, questions: 5, grammaire: 3, bonus: 15, tropDeRetard: 15 };
function seance() {
  const today = dayKey();
  const dejaFaite = S.seance === today;
  const aRevoir = WORDS.filter((w) => cardOf(w).due && isDue(w));
  const revisions = shuffle(aRevoir).sort((a, b) => (S.erreurs[b.he] ? 1 : 0) - (S.erreurs[a.he] ? 1 : 0) || cardOf(a).due.localeCompare(cardOf(b).due)).slice(0, SEANCE.revisions);
  // Trop de retard : on rattrape avant d'ajouter des mots
  const nouveaux = aRevoir.length > SEANCE.tropDeRetard ? [] : WORDS.filter((w) => !cardOf(w).due && isDue(w)).sort((a, b) => (b.theme === 'mesmots') - (a.theme === 'mesmots')).slice(0, SEANCE.nouveaux);
  const plur = (n, mot) => `${n} ${mot}${n > 1 ? 's' : ''}`;
  const gramQ = typeof questionsGramSeance === 'function' ? questionsGramSeance(SEANCE.grammaire) : [];
  let gramFaites = 0, enGram = false;

  const etapesSea = [
    revisions.length ? { em: '🃏', n: revisions.length, nom: revisions.length > 1 ? 'cartes à revoir' : 'carte à revoir', sous: 'les mots qui risquent de t’échapper' } : null,
    nouveaux.length ? { em: '✨', n: nouveaux.length, nom: nouveaux.length > 1 ? 'nouveaux mots' : 'nouveau mot', sous: 'à découvrir et à écouter' } : null,
    { em: '❓', n: SEANCE.questions, nom: 'questions', sous: 'pour vérifier ce que tu viens de voir' },
    gramQ.length ? { em: '📐', n: gramQ.length, nom: 'questions de grammaire', sous: 'sur les leçons déjà faites' } : null,
    dejaFaite ? null : { em: '🎁', n: '+' + SEANCE.bonus, nom: 'XP de bonus', sous: 'une fois par jour, à la fin' },
  ].filter(Boolean);
  const dateSea = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }); const dateMaj = dateSea.charAt(0).toUpperCase() + dateSea.slice(1);
  app.innerHTML = `<section class="sea-hero${dejaFaite ? ' faite' : ''}">
    <div class="sea-soleil" aria-hidden="true"><i></i></div>
    <div class="sea-hero-txt">
      <span class="he gr-hero-he" lang="he" dir="rtl">הַשִּׁעוּר שֶׁל הַיּוֹם</span>
      <h2>Séance du jour</h2>
      <p>${dejaFaite ? 'Ta séance d’aujourd’hui est déjà faite, bravo ! Tu peux en refaire une si tu en as envie.' : 'Environ 10 minutes. Tu n’as rien à choisir : tout s’enchaîne.'}</p>
      <div class="gr-chiffres"><span>📅 ${dateMaj}</span><span>🔥 <b>${streakNow()}</b> jour${streakNow() > 1 ? 's' : ''} d’affilée</span>${dejaFaite ? '<span>✓ <b>Faite</b></span>' : ''}</div>
    </div>
  </section>
  <div class="sea-parcours">${etapesSea.map((e, k) => `<div class="sea-etape" style="--k:${k}"><span class="sea-etape-em">${e.em}</span><b>${e.n}</b><span>${e.nom}</span><small>${e.sous}</small></div>`).join('<span class="sea-fleche" aria-hidden="true">›</span>')}</div>
  ${aRevoir.length > revisions.length ? `<p class="hint center">Il te restera ${plur(aRevoir.length - revisions.length, 'carte')} à revoir : elles reviendront dans les prochaines séances.</p>` : ''}
  <p class="center sea-go"><button class="btn gold" id="seaGo">${dejaFaite ? 'Refaire une séance' : 'Commencer ma séance'} →</button></p>`;

  const file = [...revisions, ...nouveaux.map((w) => ({ ...w, neuf: true }))].map((w) => ({ ...w }));
  const vus = [...revisions, ...nouveaux];
  const nbCartes = file.length;
  let cartesFaites = 0, questionsFaites = 0, xp = 0, reconnus = 0, bonnes = 0, premieres = 0, questions = [];
  const pile = [];
  const revenir = () => { const p = pile.pop(); if (!p) return; file.length = 0; file.push(...p.file); cartesFaites = p.cartesFaites; reconnus = p.reconnus; xp = p.xp; p.w._retry = p.retry; if (p.carte) S.cards[p.w.he] = p.carte; else delete S.cards[p.w.he]; questions = []; save(); montrerCarte(); };
  const entete = (titre) => {
    const faits = cartesFaites + questionsFaites + gramFaites;
    const totalPrevu = nbCartes + (questions.length || SEANCE.questions) + gramQ.length;
    const ici = enGram ? 3 : questions.length ? 2 : /Nouveau/.test(titre) ? 1 : 0;
    const etapes = [revisions.length ? ['🃏', 'Révisions'] : null, nouveaux.length ? ['✨', 'Nouveaux mots'] : null, ['❓', 'Questions'], gramQ.length ? ['📐', 'Grammaire'] : null].map((e, k) => e && [...e, k]).filter(Boolean);
    return `<div class="sea-barre"><div class="sea-pastilles">${etapes.map(([em, nom, k]) => `<span class="${k === ici ? 'ici' : k < ici ? 'fait' : ''}">${k < ici ? '✓' : em} ${nom}</span>`).join('')}</div><span class="sea-compte">${faits}/${totalPrevu}</span></div><div class="progress sea-prog"><i style="width:${(faits / totalPrevu) * 100}%"></i></div><p class="sea-titre">${titre}</p>`;
  };

  const montrerCarte = () => {
    if (!file.length) return preparerQuestions();
    const w = file[0];
    app.innerHTML = `${entete(w.neuf ? '✨ Nouveau mot' : '🃏 Révision')}
    <div class="flip" id="flip"><div class="flip-in">
      <div class="face"><span class="big">${HE(w.he)}</span>${sayBtn(w.he)}<span class="hint">${w.neuf ? 'Écoute-le, puis touche pour le découvrir' : 'Touche pour retourner'}</span></div>
      <div class="face back"><span class="big">${HE(w.he)}</span><span class="tr">${esc(w.tr)}</span><span class="fr">${esc(w.fr)}</span></div>
    </div></div>
    <div class="row mt" style="justify-content:center" id="ans" hidden>
      <button class="btn red" id="no">😕 À revoir</button>
      <button class="btn green" id="yes">${w.neuf ? '👍 C’est noté' : '🙂 Bien'}</button>
      <button class="btn gold" id="super">${w.neuf ? '🌟 Je le connaissais déjà' : '🌟 Super bien'}</button>
    </div>
    <p class="center hint">Touche la carte pour la retourner autant que tu veux. Clavier : Espace pour retourner, ← à revoir, → ${w.neuf ? 'c’est noté' : 'bien'}, ↑ ${w.neuf ? 'je le connaissais' : 'super bien'}, Retour pour revenir.</p>
    ${pile.length ? '<p class="center"><button class="btn ghost" id="precedente" type="button">↩ Carte précédente</button></p>' : ''}`;
    later(() => speak(w.he), 250);
    const retourner = () => { $('#flip').classList.toggle('on'); $('#ans').hidden = false; };
    if ($('#precedente')) $('#precedente').onclick = revenir;
    $('#flip').onclick = retourner;
    const repondre = (ok, saut = 1) => {
      const cur = cardOf(w);
      pile.push({ file: [...file], cartesFaites, reconnus, xp, w, retry: w._retry, carte: S.cards[w.he] ? { ...S.cards[w.he] } : null });
      if (ok) {
        const box = Math.min(cur.box + saut, INTERVALS.length - 1);
        S.cards[w.he] = { box, due: addDays(INTERVALS[box]) };
        if (!w._retry) { reconnus++; xp += 3; }
        file.shift(); cartesFaites++;
      } else {
        if (!w._retry) noterRate(w.he);
        S.cards[w.he] = { box: 0, due: dayKey() };
        w._retry = true; file.push(file.shift());
      }
      save(); montrerCarte();
    };
    $('#yes').onclick = () => repondre(true);
    $('#super').onclick = () => repondre(true, 2);
    $('#no').onclick = () => repondre(false);
    keyHandler = (e) => {
      if (e.key === ' ') { e.preventDefault(); retourner(); }
      else if (e.key === 'Backspace' && pile.length) { e.preventDefault(); revenir(); }
      else if (!$('#ans').hidden && e.key === 'ArrowRight') repondre(true);
      else if (!$('#ans').hidden && e.key === 'ArrowUp') { e.preventDefault(); repondre(true, 2); }
      else if (!$('#ans').hidden && e.key === 'ArrowLeft') repondre(false);
    };
  };

  // Exercice : d'abord les mots de la séance, complétés si besoin par des mots déjà rencontrés
  const disponible = (w) => w.theme !== 'dehors' || S.found.includes(w.he.normalize('NFC'));
  const preparerQuestions = () => {
    keyHandler = null;
    const dejaLa = new Set(vus.map((w) => w.he));
    const complement = shuffle(WORDS.filter((w) => disponible(w) && !dejaLa.has(w.he)));
    complement.sort((a, b) => (cardOf(b).due ? 1 : 0) - (cardOf(a).due ? 1 : 0));
    const mots = [...shuffle(vus), ...complement].slice(0, SEANCE.questions);
    const types = shuffle(['fr-he', 'ecoute', 'he-fr']);
    questions = shuffle(mots).map((w, i) => ({ w, type: types[i % types.length] }));
    premieres = questions.length;
    montrerQuestion();
  };
  const leurres = (w, n) => {
    const ok = (x) => disponible(x) && x.fr !== w.fr && strip(x.he) !== strip(w.he);
    const proches = shuffle(WORDS.filter((x) => x.theme === w.theme && ok(x)));
    const autres = shuffle(WORDS.filter((x) => x.theme !== w.theme && ok(x)));
    const choisis = [];
    [...proches, ...autres].forEach((x) => { if (choisis.length < n && !choisis.some((c) => c.fr === x.fr || strip(c.he) === strip(x.he))) choisis.push(x); });
    return choisis;
  };
  const montrerQuestion = () => {
    if (questionsFaites >= questions.length) return gramQ.length ? montrerGram() : terminer();
    const { w, type, encore } = questions[questionsFaites];
    const opts = shuffle([w, ...leurres(w, 3)]);
    const enHebreu = type === 'fr-he';
    const enonce = type === 'fr-he' ? `Comment dit-on <b>« ${esc(w.fr)} »</b> ?`
      : type === 'ecoute' ? `<div>Que veut dire ce mot ?</div><div class="mt">${sayBtn(w.he, '🔊 Réécouter')}</div>`
      : `<div>Que veut dire ce mot ?</div><div class="big">${HE(w.he)}</div>`;
    app.innerHTML = `${entete(encore ? '🔁 On y revient' : '❓ Exercice')}
    <div class="card"><div class="prompt">${enonce}</div>
    <div class="opts">${opts.map((o, j) => `<button class="opt ${enHebreu ? 'he' : ''}" data-j="${j}" ${enHebreu ? 'lang="he" dir="rtl"' : ''}><kbd>${j + 1}</kbd>${esc(enHebreu ? o.he : o.fr)}</button>`).join('')}</div>
    <p class="center hint" id="fb">&nbsp;</p></div>
    ${questionsFaites === 0 && pile.length ? '<p class="center"><button class="btn ghost" id="precedente" type="button">↩ Revenir à la dernière carte</button></p>' : ''}`;
    if ($('#precedente')) $('#precedente').onclick = () => { cleanup(); stopAudio(); revenir(); };
    if (type !== 'fr-he') later(() => speak(w.he), 300);
    let bloque = false;
    const choisir = (j) => {
      if (bloque) return; bloque = true;
      const ok = opts[j] === w;
      $$('.opt').forEach((b, x) => { b.disabled = true; if (opts[x] === w) b.classList.add('ok'); else if (x === j) b.classList.add('ko'); });
      if (!encore) { S.stats.q++; if (ok) S.stats.ok++; }
      if (ok) {
        lucioles($$('.opt')[j]);
        noterReussite(w.he);
        if (!encore) { bonnes++; xp += 8; }
        $('#fb').innerHTML = `✅ Bravo ! ${TRS(w.tr)}${esc(w.fr)}`;
      } else {
        // Un mot raté repart à zéro dans les cartes et revient une fois à la fin de l'exercice
        noterErreur(w.he);
        if (!encore) questions.push({ w, type: type === 'he-fr' ? 'fr-he' : 'he-fr', encore: true });
        $('#fb').innerHTML = `❌ La bonne réponse : <b>${TRS(w.tr)}${esc(w.fr)}</b>`;
      }
      save();
      if (type === 'fr-he' || !ok) speak(w.he);
      later(() => { questionsFaites++; montrerQuestion(); }, ok ? 1300 : 2500);
    };
    $$('.opt').forEach((b) => (b.onclick = () => choisir(+b.dataset.j)));
    keyHandler = (e) => { const n = +e.key; if (n >= 1 && n <= opts.length) choisir(n - 1); };
  };

  // Dernière étape : la grammaire déjà vue (ces questions ne deviennent jamais des cartes)
  let gramBonnes = 0;
  const montrerGram = () => {
    enGram = true;
    if (gramFaites >= gramQ.length) return terminer();
    const e = gramQ[gramFaites], opts = shuffle([e.ok, ...e.non]), he = estHebreu(e.ok);
    app.innerHTML = `${entete('📐 Grammaire')}
    <div class="card"><p class="hint ctrl-lecon">${e.lecon.em} ${texteGram(e.lecon.titre)}</p>
    <div class="prompt gram-q">${esc(e.q).replace(/\[\[(.+?)\]\]/g, (_, m) => HE(m) + (strip(m).replace(/[^\u05D0-\u05EA]/g, '').length > 1 ? ' ' + sayBtn(m) : ''))}</div>
    <div class="opts">${opts.map((o, j) => `<button class="opt ${he ? 'he gram-opt' : ''}" data-j="${j}" ${he ? 'lang="he" dir="rtl"' : ''}><kbd>${j + 1}</kbd>${esc(o)}</button>`).join('')}</div>
    <p class="center hint" id="fb">&nbsp;</p><div class="center" id="suite"></div></div>`;
    let bloque = false;
    const avancer = () => { gramFaites++; montrerGram(); };
    const choisir = (j) => {
      if (bloque) return; bloque = true;
      const ok = opts[j] === e.ok;
      $$('.opt').forEach((b, x) => { b.disabled = true; if (opts[x] === e.ok) b.classList.add('ok'); else if (x === j) b.classList.add('ko'); });
      S.stats.q++;
      if (ok) { S.stats.ok++; gramBonnes++; xp += 8; lucioles($$('.opt')[j]); }
      if (typeof noterGram === 'function') noterGram(e.lecon.id, ok);
      if (typeof noterGramVue === 'function') noterGramVue(e.lecon.id);
      save();
      $('#fb').innerHTML = `${ok ? '✅ Bravo !' : '❌ Pas tout à fait.'} ${texteGramSon(e.pourquoi)}`;
      if (he && strip(e.ok).length > 1) speak(e.ok);
      if (ok) later(avancer, 1600);
      else { $('#suite').innerHTML = `<button class="btn" id="contin">Continuer</button> <a class="btn ghost" href="#/grammaire/${e.lecon.id}">Revoir la leçon</a>`; $('#contin').onclick = avancer; }
    };
    $$('.opt').forEach((b) => (b.onclick = () => choisir(+b.dataset.j)));
    keyHandler = (ev) => {
      const c = +ev.key;
      if (!bloque && c >= 1 && c <= opts.length) choisir(c - 1);
      else if (bloque && ev.key === 'Enter' && $('#contin')) { ev.preventDefault(); avancer(); }
    };
  };

  const terminer = () => {
    keyHandler = null;
    const premiereDuJour = S.seance !== today;
    S.seance = today; S.stats.quiz++; save();
    const gagne = xp + (premiereDuJour ? SEANCE.bonus : 0);
    addXP(gagne);
    if (premiereDuJour) confetti();
    const suite = S.daily[today] ? { href: '#/histoire', txt: '📖 Lire une histoire' } : { href: '#/jour', txt: '🔎 Le défi du mot caché' };
    app.innerHTML = `<div class="card center result sea-fin"><div class="sea-soleil petit" aria-hidden="true"><i></i></div><h2>Séance terminée !</h2>
      <p class="sub">+${gagne} XP${premiereDuJour ? ` (dont ${SEANCE.bonus} de bonus)` : ''} · série de ${streakNow()} jour${streakNow() > 1 ? 's' : ''} 🔥</p>
      <p>${nbCartes ? `${reconnus} carte${reconnus > 1 ? 's' : ''} sur ${nbCartes} du premier coup · ` : ''}${bonnes} bonne${bonnes > 1 ? 's' : ''} réponse${bonnes > 1 ? 's' : ''} sur ${premieres}${gramQ.length ? ` · grammaire : ${gramBonnes}/${gramQ.length}` : ''}</p>
      ${nouveaux.length ? `<div class="sea-new"><div class="cap">Tes nouveaux mots</div>${nouveaux.map((w) => `<div>${HE(w.he)}<small>${TRS(w.tr)}${esc(w.fr)}</small>${sayBtn(w.he)}</div>`).join('')}</div>` : ''}
      <div class="row" style="justify-content:center">${motsEnErreur().length ? `<a class="btn" href="#/erreurs">🎯 Mes erreurs (${motsEnErreur().length})</a>` : ''}<a class="btn gold" href="${suite.href}">${suite.txt}</a><a class="btn ghost" href="#/">Retour à l’accueil</a></div></div>`;
  };

  $('#seaGo').onclick = () => (nbCartes ? montrerCarte() : preparerQuestions());
}

/* ============ Sauvegarde de la progression ============ */
const KEY_AVANT = 'ivrit-ludique-avant-restauration';
function resumeProgression(d) {
  const maitrises = Object.values(d.cards || {}).filter((c) => c && c.box >= 3).length;
  const cartes = Object.keys(d.postcards || {}).length;
  return `Niveau ${level(d.xp || 0)} · ${d.xp || 0} XP · ₪ ${d.sh || 0} · ${maitrises} mot${maitrises > 1 ? 's' : ''} maîtrisé${maitrises > 1 ? 's' : ''} · ${cartes} carte${cartes > 1 ? 's' : ''} postale${cartes > 1 ? 's' : ''}`;
}
function exporterProgression() {
  const quand = new Date();
  S.lastExport = dayKey(quand); save();
  const contenu = JSON.stringify({ application: 'ivrit', version: 1, date: quand.toISOString(), progression: S }, null, 1);
  const lien = document.createElement('a');
  lien.href = URL.createObjectURL(new Blob([contenu], { type: 'application/json' }));
  lien.download = `ivrit-progression-${dayKey(quand)}.json`;
  document.body.appendChild(lien); lien.click(); lien.remove();
  setTimeout(() => URL.revokeObjectURL(lien.href), 5000);
  toast('💾 Fichier de sauvegarde téléchargé');
  sauvegardeUI();
  boutonSauvegarde();
}
// Vérifie qu'un fichier est bien une sauvegarde d'Ivrit, et ne garde que des valeurs du bon type
function lireSauvegarde(texte) {
  let brut;
  try { brut = JSON.parse(texte); } catch { throw new Error('Ce fichier n’est pas lisible.'); }
  if (!brut || brut.application !== 'ivrit' || typeof brut.progression !== 'object' || !brut.progression) throw new Error('Ce fichier n’est pas une sauvegarde d’Ivrit.');
  const modele = defaults(), propre = {};
  Object.keys(modele).forEach((k) => {
    const v = brut.progression[k], m = modele[k];
    if (v === undefined) return;
    const memeType = m === null ? (v === null || typeof v === 'string') : Array.isArray(m) ? Array.isArray(v) : v !== null && typeof v === typeof m && !Array.isArray(v);
    if (memeType) propre[k] = v;
  });
  // Les données ajoutées au site depuis (voyage, jeux de rôle, bilans, options…) sont gardées telles quelles
  Object.keys(brut.progression).forEach((k) => {
    const v = brut.progression[k];
    if (!(k in modele) && /^[A-Za-z][A-Za-z0-9]*$/.test(k) && v !== undefined && typeof v !== 'function') propre[k] = v;
  });
  if (typeof propre.xp !== 'number' || propre.xp < 0 || !isFinite(propre.xp)) throw new Error('Cette sauvegarde est incomplète : elle ne contient pas d’XP valides.');
  return { progression: propre, date: brut.date };
}
// Bouton présent sur toutes les pages ; un point le signale quand une sauvegarde serait utile
function boutonSauvegarde() {
  const b = $('#hSave');
  b.onclick = exporterProgression;
  const aFaire = S.xp > 0 && (!S.lastExport || daysBetween(S.lastExport, dayKey()) >= 14);
  b.classList.toggle('due', aFaire);
  b.title = aFaire ? 'Pense à sauvegarder ta progression dans un fichier' : 'Sauvegarder ma progression dans un fichier';
}
function sauvegardeUI(apercu) {
  const zone = $('#sauvegarde');
  if (!zone) return;
  const avant = localStorage.getItem(KEY_AVANT);
  const jours = S.lastExport ? daysBetween(S.lastExport, dayKey()) : null;
  const etat = jours === null ? '⚠️ Tu n’as encore jamais sauvegardé ta progression.' : jours === 0 ? '✅ Dernière sauvegarde : aujourd’hui.' : `${jours >= 14 ? '⚠️' : '✅'} Dernière sauvegarde : il y a ${jours} jour${jours > 1 ? 's' : ''}.`;
  zone.innerHTML = `<h3>Sauvegarde de ma progression</h3><div class="card">
    <p class="sub" style="margin:0 0 4px">Ta progression est enregistrée dans ce navigateur seulement. Garde une copie dans un fichier pour la retrouver si ses données sont effacées, ou pour la transférer vers une autre adresse ou un autre appareil.</p>
    <p style="margin:6px 0 12px"><b>${etat}</b></p>
    <div class="row"><button class="btn" id="saveOut">💾 Sauvegarder dans un fichier</button><button class="btn ghost" id="saveIn">📂 Restaurer depuis un fichier</button><input type="file" id="saveFile" accept=".json,application/json" hidden></div>
    <div id="saveInfo">${apercu ? `<div class="save-box"><b>Remplacer ta progression actuelle ?</b>
      <p class="hint" style="margin:6px 0 0">Actuelle : ${esc(resumeProgression(S))}</p>
      <p class="hint" style="margin:2px 0 10px">Fichier${apercu.date ? ` du ${esc(new Date(apercu.date).toLocaleDateString('fr-FR'))}` : ''} : ${esc(resumeProgression(apercu.progression))}</p>
      <div class="row"><button class="btn" id="saveYes">Oui, restaurer</button><button class="btn ghost" id="saveNo">Annuler</button></div></div>` : ''}</div>
    ${avant ? '<p style="margin:12px 0 0"><button class="link" id="saveUndo">↩ Revenir à la progression d’avant la dernière restauration</button></p>' : ''}
  </div>`;
  $('#saveOut').onclick = exporterProgression;
  $('#saveIn').onclick = () => $('#saveFile').click();
  $('#saveFile').onchange = (e) => {
    const f = e.target.files[0]; if (!f) return;
    if (f.size > 5e6) return toast('Ce fichier est trop volumineux pour être une sauvegarde d’Ivrit.');
    const r = new FileReader();
    r.onerror = () => toast('Impossible de lire ce fichier.');
    r.onload = () => { try { sauvegardeUI(lireSauvegarde(r.result)); } catch (err) { toast(err.message); } };
    r.readAsText(f);
  };
  if (apercu) {
    $('#saveNo').onclick = () => sauvegardeUI();
    $('#saveYes').onclick = () => {
      localStorage.setItem(KEY_AVANT, JSON.stringify(S));
      localStorage.setItem(KEY, JSON.stringify(Object.assign(defaults(), apercu.progression, { shInit: true })));
      location.reload();
    };
  }
  if (avant) $('#saveUndo').onclick = () => { localStorage.setItem(KEY, avant); localStorage.removeItem(KEY_AVANT); location.reload(); };
}

Object.assign(routes, { sons: pageSons, seance, conjexo, erreurs, cursive, grammaire, histoire, carte, scenes, jour, journal, boutique: () => location.replace('#/chambre/boutique'), conjugaison });
applyNight();
boutonSauvegarde();
initAides();
route();
