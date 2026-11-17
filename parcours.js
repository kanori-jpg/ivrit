'use strict';
/* ============ Mon parcours ============
   Un chemin dans l'ordre, pour ne plus avoir à choisir quoi faire :
   l'alphabet, puis, en boucle, un thème de vocabulaire, deux leçons de grammaire et une histoire.
   Chaque étape se débloque quand la précédente est acquise. Rien de nouveau n'est enregistré :
   on lit la progression existante (cartes, leçons, histoires), donc tout ce qui est fait ailleurs compte aussi. */

const PC_THEME_SEUIL = 0.8; // un thème est acquis quand 80 % de ses mots ont été sus au moins une fois
const PC_CONTENU = 10, PC_Q_NB = 10, PC_Q_SEUIL = 7; // contrôle de palier : 10 questions, 7 bonnes pour le réussir

function etapesParcours() {
  const etapes = [{ type: 'alphabet', em: '🔤', titre: 'Les 22 lettres de l’alphabet', sous: 'Alef-Bet', href: '#/alphabet' }];
  const themes = THEMES.filter((t) => t.id !== 'mesmots' && t.words.length).map((t) => ({ type: 'theme', id: t.id, em: t.emoji, titre: t.name, sous: 'Vocabulaire', href: `#/cartes/${t.id}` }));
  const gram = (typeof GRAMMAIRE_PARTIES !== 'undefined' ? GRAMMAIRE_PARTIES.flatMap((p) => p.ids) : GRAMMAIRE.map((l) => l.id))
    .map((id) => GRAMMAIRE.find((l) => l.id === id)).filter(Boolean)
    .map((l) => ({ type: 'grammaire', id: l.id, em: l.em || '📐', titre: l.titre, sous: 'Grammaire', href: `#/grammaire/${l.id}` }));
  // Les histoires dans l'ordre des chapitres : les 5 premiers, puis les villes (5 histoires chacune)
  const vie = typeof STORIES_VIE !== 'undefined' ? STORIES_VIE : [];
  const histoires = [
    ...STORIES.filter((s) => typeof CHAPITRES === 'undefined' || CHAPITRES[s.id]).map((s) => ({ s, ch: (CHAPITRES[s.id] || {}).num })),
    ...(typeof VILLES !== 'undefined' ? [...VILLES].sort((a, b) => a.num - b.num) : []).flatMap((v) => v.histoires.map((id) => ({ s: vie.find((x) => x.id === id), ch: v.num, lieu: v.lieu }))),
  ].filter((x) => x.s).map(({ s, ch, lieu }) => ({ type: 'histoire', id: s.id, em: s.emoji || '📖', titre: s.title || s.fr || 'Histoire', sous: `Histoire · chapitre ${ch || ''}${lieu ? ` (${lieu})` : ''}`, href: `#/histoire/${s.id}` }));
  let g = 0, h = 0;
  themes.forEach((t) => {
    etapes.push(t);
    for (let k = 0; k < 2 && g < gram.length; k++) etapes.push(gram[g++]);
    if (h < histoires.length) etapes.push(histoires[h++]);
  });
  etapes.push(...gram.slice(g), ...histoires.slice(h));
  // À la fin de chaque palier de 10 étapes : un contrôle qui mélange ce qu'on vient de voir
  const avecControles = [];
  for (let k = 0; k < etapes.length; k += PC_CONTENU) {
    const n = k / PC_CONTENU + 1, contenu = etapes.slice(k, k + PC_CONTENU);
    avecControles.push(...contenu, { type: 'controle', id: n, contenu, em: '📝', titre: `Contrôle du palier ${n}`, sous: `${PC_Q_NB} questions sur ce palier`, href: `#/parcours/controle/${n}` });
  }
  return avecControles;
}

// Où en est une étape : { fait, txt (détail), pct }
function etatEtape(e) {
  if (e.type === 'alphabet') { const n = S.seen.length; return { fait: n >= 22, txt: `${Math.min(n, 22)} / 22 lettres`, pct: Math.min(1, n / 22) }; }
  if (e.type === 'theme') {
    const ws = themeWords(e.id), su = ws.filter((w) => S.cards[w.he] && (S.cards[w.he].box || 0) >= 1).length, but = Math.ceil(ws.length * PC_THEME_SEUIL);
    return { fait: su >= but, txt: `${su} / ${but} mots sus`, pct: Math.min(1, su / but) };
  }
  if (e.type === 'controle') {
    const c = (S.paliers || {})[e.id];
    return { fait: !!(c && c.reussi), txt: c ? `meilleur score ${c.best}/${PC_Q_NB}` : `il faut ${PC_Q_SEUIL}/${PC_Q_NB}`, pct: c ? Math.min(1, c.best / PC_Q_SEUIL) : 0 };
  }
  if (e.type === 'grammaire') { const f = !!S.grammaire[e.id]; return { fait: f, txt: f ? 'leçon faite' : 'leçon et exercices', pct: f ? 1 : 0 }; }
  const f = !!S.story[e.id]; return { fait: f, txt: f ? 'histoire terminée' : 'à lire', pct: f ? 1 : 0 };
}

function etatParcours() {
  const etapes = etapesParcours().map((e) => ({ ...e, ...etatEtape(e) }));
  const i = etapes.findIndex((e) => !e.fait);
  return { etapes, courante: i < 0 ? etapes.length : i, faites: etapes.filter((e) => e.fait).length };
}

const PC_PALIER = PC_CONTENU + 1; // 10 étapes + le contrôle
function parcours(sous, n) {
  if (sous === 'controle') return controlePalier(+n);
  const { etapes, courante, faites } = etatParcours();
  const e = etapes[courante];
  const ligne = (x, k) => {
    const ouverte = x.fait || k <= courante, cls = x.fait ? 'fait' : k === courante ? 'courante' : 'fermee';
    const contenu = `<span class="pc-num">${x.fait ? '✓' : k === courante ? '▶' : k + 1}</span><span class="pc-em">${x.em}</span>
      <span class="pc-txt"><small>${esc(x.sous)}</small><b>${esc(x.titre)}</b>${!x.fait && x.pct > 0 ? `<span class="pc-barre"><i style="width:${Math.round(x.pct * 100)}%"></i></span>` : ''}</span>
      <span class="pc-etat">${x.fait ? '' : ouverte ? esc(x.txt) : '🔒'}</span>`;
    return ouverte ? `<a class="pc-etape ${cls}" href="${x.href}">${contenu}</a>` : `<div class="pc-etape ${cls}" aria-disabled="true">${contenu}</div>`;
  };
  const paliers = [];
  for (let k = 0; k < etapes.length; k += PC_PALIER) paliers.push(k);
  app.innerHTML = `<section class="pc-hero card">
      <span class="he pc-hero-he" lang="he" dir="rtl">הַדֶּרֶךְ שֶׁלִּי</span>
      <h2>Mon parcours</h2>
      <p class="sub">Un chemin dans l’ordre : un thème de vocabulaire, deux leçons de grammaire, une histoire… Chaque étape se débloque quand la précédente est acquise. Tout ce que tu fais ailleurs dans le site compte aussi.</p>
      <div class="pc-total"><span class="pc-barre grande"><i style="width:${(faites / etapes.length) * 100}%"></i></span><small>${faites} / ${etapes.length} étapes</small></div>
      ${e ? `<a class="pc-suite" href="${e.href}"><span class="pc-em">${e.em}</span><span><small>Étape ${courante + 1} · ${esc(e.sous)}</small><b>${esc(e.titre)}</b><span>${esc(e.txt)}${e.type === 'theme' ? ' — fais des séances de cartes de ce thème' : ''}</span></span><span class="btn gold">Continuer →</span></a>`
        : '<p class="pc-bravo">🎉 Tu as terminé tout le parcours. Bravo !</p>'}
    </section>
    ${paliers.map((k) => {
      const morceau = etapes.slice(k, k + PC_PALIER), fini = morceau.every((x) => x.fait), ici = courante >= k && courante < k + PC_PALIER;
      return `<details class="pc-palier${fini ? ' fini' : ''}"${ici ? ' open' : ''}><summary><b>Palier ${k / PC_PALIER + 1}</b><small>${fini ? '✓ terminé' : `${morceau.filter((x) => x.fait).length} / ${morceau.length}`}</small></summary>
        <div class="pc-liste">${morceau.map((x, j) => ligne(x, k + j)).join('')}</div></details>`;
    }).join('')}
    <p class="hint center mt">Pour un thème, l’étape est acquise quand tu as su ${Math.round(PC_THEME_SEUIL * 100)} % de ses mots au moins une fois dans les cartes. Chaque palier se termine par un contrôle de ${PC_Q_NB} questions : il en faut ${PC_Q_SEUIL} justes pour passer au palier suivant.</p>`;
  const ici = courante >= PC_PALIER && $('.pc-palier[open]');
  if (ici) setTimeout(() => ici.scrollIntoView({ block: 'start', behavior: 'smooth' }), 50);
}

/* ============ Contrôle de fin de palier ============
   10 questions mélangées : des mots des thèmes du palier (sens, traduction, écoute), des exercices de ses leçons
   de grammaire et des répliques de ses histoires. S.paliers[n] = { best, reussi, date }.
   Première réussite : 20 shekels et 30 XP de bonus. */
function lignesHistoire(id) {
  const vie = typeof HISTOIRES_VIE !== 'undefined' ? HISTOIRES_VIE.find((h) => h.id === id) : null;
  if (vie) return vie.lignes.flatMap((l) => [{ he: l[0], fr: l[2] }, l[3] ? { he: l[3], fr: l[5] } : null]).filter((x) => x && x.he && x.fr);
  const s = STORIES.find((x) => x.id === id) || (typeof STORIES_VIE !== 'undefined' ? STORIES_VIE.find((x) => x.id === id) : null);
  if (!s) return [];
  return (s.lines || []).flatMap((l) => [l.he && l.fr ? { he: l.he, fr: l.fr } : null, ...((l.choices || []).filter((c) => c.ok && c.he && c.fr).map((c) => ({ he: c.he, fr: c.fr })))]).filter(Boolean);
}

function questionsPalier(contenu) {
  const pris = (arr, n) => shuffle([...arr]).slice(0, n);
  const unique = (arr, cle) => { const vus = new Set(); return arr.filter((x) => { const k = cle(x); if (vus.has(k)) return false; vus.add(k); return true; }); };
  const avecSon = (t) => esc(t).replace(/\[\[(.+?)\]\]/g, (_, m) => HE(m) + (strip(m).replace(/[^א-ת]/g, '').length > 1 ? ' ' + sayBtn(m) : ''));
  // Grammaire : un exercice par leçon du palier (3 au plus)
  const lecons = contenu.filter((e) => e.type === 'grammaire').map((e) => GRAMMAIRE.find((l) => l.id === e.id)).filter((l) => l && l.exercices && l.exercices.length);
  const qGram = pris(lecons, 3).map((l) => {
    const x = l.exercices[Math.floor(Math.random() * l.exercices.length)];
    return { cat: `${l.em} ${l.titre}`, q: avecSon(x.q), ok: x.ok, opts: [x.ok, ...x.non], pourquoi: texteGramSon(x.pourquoi || ''), dire: estHebreu(x.ok) ? x.ok : null };
  });
  // Histoires : que veut dire cette réplique ? (2 au plus)
  const qHist = [];
  pris(contenu.filter((e) => e.type === 'histoire'), 2).forEach((e) => {
    const lignes = unique(lignesHistoire(e.id), (x) => x.fr);
    if (lignes.length < 4) return;
    const l = lignes[Math.floor(Math.random() * lignes.length)];
    qHist.push({ cat: `${e.em} ${e.titre}`, q: `Dans l’histoire, que veut dire :<br>${HE(l.he)} ${sayBtn(l.he)}`, ok: l.fr, opts: [l.fr, ...pris(lignes.filter((x) => x !== l), 3).map((x) => x.fr)], pourquoi: '', dire: null });
  });
  // Mots : les thèmes du palier, sinon les mots déjà sus
  let mots = unique(contenu.filter((e) => e.type === 'theme').flatMap((e) => themeWords(e.id)), (w) => w.fr);
  if (mots.length < 8) mots = unique([...mots, ...WORDS.filter((w) => S.cards[w.he] && (S.cards[w.he].box || 0) >= 1)], (w) => w.fr);
  if (mots.length < 8) mots = unique([...mots, ...WORDS.slice(0, 40)], (w) => w.fr);
  const faux = (w, cle) => pris(unique(mots.filter((x) => x[cle] !== w[cle] && x.fr !== w.fr), (x) => x[cle]), 3).map((x) => x[cle]);
  const nbMots = PC_Q_NB - qGram.length - qHist.length;
  const qMots = pris(mots, nbMots).map((w, i) => {
    const sorte = i % 3;
    if (sorte === 1) return { cat: '📗 Vocabulaire', q: `Comment dit-on « ${esc(w.fr)} » ?`, ok: w.he, opts: [w.he, ...faux(w, 'he')], he: true, pourquoi: '', dire: w.he };
    if (sorte === 2) return { cat: '👂 Écoute', q: `Écoute et choisis le sens : ${sayBtn(w.he, '🔊 Réécouter')}`, ok: w.fr, opts: [w.fr, ...faux(w, 'fr')], pourquoi: `${HE(w.he)} ${w.tr ? `<i>${esc(w.tr)}</i>` : ''}`, auto: w.he };
    return { cat: '📗 Vocabulaire', q: `Que veut dire ${HE(w.he)} ${sayBtn(w.he)} ?`, ok: w.fr, opts: [w.fr, ...faux(w, 'fr')], pourquoi: '', dire: null };
  });
  return shuffle([...qMots, ...qGram, ...qHist]);
}

function controlePalier(n) {
  const e = etapesParcours().find((x) => x.type === 'controle' && x.id === n);
  if (!e) { location.hash = '#/parcours'; return; }
  const file = questionsPalier(e.contenu);
  let i = 0, bonnes = 0;
  const ratees = [];
  const sansBoutons = (h) => h.replace(/<button[^>]*>[^<]*<\/button>/g, '');
  const montrer = () => {
    if (i >= file.length) return finir();
    const q = file[i], opts = shuffle(q.opts.slice(0, 4)), he = q.he || estHebreu(q.ok);
    app.innerHTML = `<div class="q-head"><a href="#/parcours">← Quitter</a><span>📝 Contrôle du palier ${n}</span><span>${i + 1}/${file.length}</span></div>
    <div class="progress"><i style="width:${(i / file.length) * 100}%"></i></div>
    <div class="card"><p class="hint ctrl-lecon">${esc(q.cat)}</p>
    <div class="prompt gram-q">${q.q}</div>
    <div class="opts">${opts.map((o, j) => `<button class="opt ${he ? 'he gram-opt' : ''}" data-j="${j}" ${he ? 'lang="he" dir="rtl"' : ''}><kbd>${j + 1}</kbd>${esc(o)}</button>`).join('')}</div>
    <p class="center hint" id="fb">&nbsp;</p><div class="center" id="suite"></div></div>`;
    if (q.auto) later(() => speak(q.auto), 300);
    let bloque = false;
    const avancer = () => { i++; montrer(); };
    const choisir = (j) => {
      if (bloque) return; bloque = true;
      const ok = opts[j] === q.ok;
      $$('.opt').forEach((b, x) => { b.disabled = true; if (opts[x] === q.ok) b.classList.add('ok'); else if (x === j) b.classList.add('ko'); });
      S.stats.q++;
      if (ok) { S.stats.ok++; bonnes++; if (typeof lucioles === 'function') lucioles($$('.opt')[j]); } else ratees.push(q);
      save();
      $('#fb').innerHTML = `${ok ? '✅ Bravo !' : `❌ La bonne réponse : ${he ? HE(q.ok) : `<b>${esc(q.ok)}</b>`}`} ${q.pourquoi}`;
      if (q.dire) speak(q.dire);
      $('#suite').innerHTML = '<button class="btn" id="contin">Continuer →</button>'; $('#contin').onclick = avancer;
    };
    $$('.opt').forEach((b) => (b.onclick = () => choisir(+b.dataset.j)));
    keyHandler = (ev) => {
      const c = +ev.key;
      if (!bloque && c >= 1 && c <= opts.length) choisir(c - 1);
      else if (bloque && ev.key === 'Enter' && $('#contin')) { ev.preventDefault(); avancer(); }
    };
  };
  const finir = () => {
    keyHandler = null;
    if (!S.paliers) S.paliers = {};
    const avant = S.paliers[n], reussi = bonnes >= PC_Q_SEUIL, premiere = reussi && !(avant && avant.reussi);
    S.paliers[n] = { best: Math.max(bonnes, avant ? avant.best : 0), reussi: reussi || !!(avant && avant.reussi), date: dayKey() };
    S.stats.quiz++;
    if (premiere) S.sh += 20;
    save(); addXP(bonnes * 3 + (premiere ? 30 : 0)); if (typeof checkBadges === 'function') checkBadges(); header();
    if (reussi) confetti();
    const suite = etatParcours(), prochaine = suite.etapes[suite.courante];
    app.innerHTML = `<div class="card center result"><div class="em">${reussi ? '🎓' : '💪'}</div>
      <h2>${reussi ? `Palier ${n} réussi !` : 'Pas encore…'}</h2><p class="score">${bonnes} / ${file.length}</p>
      <p class="sub">${reussi ? `${premiere ? '+20 shekels et 30 XP de bonus. ' : ''}Bravo, tu peux passer au palier suivant.` : `Il faut ${PC_Q_SEUIL} bonnes réponses. Revois les étapes du palier, puis retente ta chance quand tu veux.`}</p>
      ${ratees.length ? `<div class="pc-ratees"><b>À revoir</b>${ratees.map((q) => `<div class="pc-ratee"><small>${esc(q.cat)}</small><span>${q.auto ? `Écoute : ${HE(q.auto)}` : sansBoutons(q.q)}</span><span>→ ${estHebreu(q.ok) ? HE(q.ok) : esc(q.ok)} ${estHebreu(q.ok) ? sayBtn(q.ok) : ''}</span></div>`).join('')}</div>` : ''}
      <div class="row" style="justify-content:center">${reussi && prochaine ? `<a class="btn gold" href="${prochaine.href}">Étape suivante →</a>` : ''}<button class="btn ghost" id="pcRefaire" type="button">${reussi ? 'Refaire le contrôle' : 'Réessayer'}</button><a class="btn ghost" href="#/parcours">Mon parcours</a></div></div>`;
    $('#pcRefaire').onclick = () => controlePalier(n);
  };
  montrer();
}

routes.parcours = parcours;
if (/^#\/parcours/.test(location.hash) && typeof route === 'function') route();

/* ============ Suivre le parcours depuis les pages d'étape ============
   Quand on ouvre une étape depuis le parcours (ou l'accueil), un petit bandeau reste en bas de l'écran :
   il montre l'avancée de l'étape, puis, dès qu'elle est acquise, propose de passer à la suivante. */
const PC_SUIVI = 'ivrit-parcours-suivi';
const pcHrefNu = (h) => (h || '').replace(/^.*#/, '#');
document.addEventListener('click', (e) => {
  const a = e.target.closest && e.target.closest('a[href^="#/"]');
  if (!a) return;
  const href = pcHrefNu(a.getAttribute('href'));
  if (href === '#/parcours' || href.startsWith('#/parcours/')) return;
  const { etapes, courante } = etatParcours();
  // L'étape en cours (ou une étape déjà ouverte) : on la suit
  const i = etapes.findIndex((x, k) => x.href === href && (k === courante || !x.fait));
  try { if (i >= 0) sessionStorage.setItem(PC_SUIVI, String(i)); } catch { /* tant pis */ }
}, true);

function bandeauParcours() {
  let b = document.getElementById('pcBandeau');
  let i = null;
  try { i = sessionStorage.getItem(PC_SUIVI); } catch { i = null; }
  const ici = location.hash.replace(/^#\/?/, '');
  const enlever = () => { if (b) b.remove(); document.body.classList.remove('avec-pc-bandeau'); };
  if (i === null || ici === '' || ici.startsWith('parcours')) return enlever();
  const etapes = etapesParcours(), e = etapes[+i];
  if (!e) return enlever();
  const st = etatEtape(e);
  // On n'affiche le bandeau que sur la page de l'étape suivie (et ses sous-pages)
  if (!st.fait && !location.hash.startsWith(e.href)) return enlever();
  let ferme = null; try { ferme = sessionStorage.getItem(PC_SUIVI + '-ferme'); } catch { ferme = null; }
  if (ferme === `${i}-${st.fait}`) return enlever();
  if (!b) { b = document.createElement('div'); b.id = 'pcBandeau'; b.className = 'pc-bandeau'; document.body.appendChild(b); }
  const k = etapes.findIndex((x, n) => n > +i && !etatEtape(x).fait), suite = etapes[k];
  const html = st.fait
    ? `<span class="pc-b-ok">✓</span><span class="pc-b-txt"><b>Étape acquise : ${esc(e.titre)}</b>${suite ? `<small>Ensuite : ${suite.em} ${esc(suite.titre)}</small>` : '<small>Tu as fini le parcours !</small>'}</span>${suite ? `<a class="btn gold pc-b-go" href="${suite.href}" data-pc="${k}">Continuer →</a>` : '<a class="btn gold pc-b-go" href="#/parcours">Mon parcours</a>'}`
    : `<span class="pc-b-em">🧭</span><span class="pc-b-txt"><b>Mon parcours · ${esc(e.titre)}</b><small>${esc(st.txt)}${e.type === 'theme' ? (themeWords(e.id).some(motCache) ? ' — trouve les autres mots dans les scènes (onglet Scènes)' : ' — encore une séance de cartes si besoin') : ''}</small></span><a class="pc-b-lien" href="#/parcours">Voir le parcours</a>`;
  const avecX = html + `<button type="button" class="pc-b-x" aria-label="Fermer" title="Fermer">✕</button>`;
  if (b.dataset.html !== avecX) { b.innerHTML = avecX; b.dataset.html = avecX; b.classList.toggle('fait', st.fait); }
  document.body.classList.add('avec-pc-bandeau');
  b.querySelector('.pc-b-x').onclick = () => { try { sessionStorage.setItem(PC_SUIVI + '-ferme', `${i}-${st.fait}`); } catch { /* tant pis */ } enlever(); };
  const go = b.querySelector('[data-pc]');
  if (go) go.onclick = () => { try { sessionStorage.setItem(PC_SUIVI, go.dataset.pc); } catch { /* tant pis */ } };
}
window.addEventListener('hashchange', () => setTimeout(bandeauParcours, 50));
setInterval(() => { if (!document.hidden) bandeauParcours(); }, 1500);
setTimeout(bandeauParcours, 300);
