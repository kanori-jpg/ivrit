'use strict';
/* ============ Contrôles de fin de partie (grammaire) et « Tes points faibles » ============
   S.controles[k] = { best, reussi, date } pour chaque partie k de GRAMMAIRE_PARTIES.
   S.gramRates[id] = nombre d'erreurs récentes sur une leçon (baisse quand on réussit). */
const CONTROLE_NB = 15, CONTROLE_SEUIL = 12, FAIBLES_NB = 10;

// Une erreur ou une réussite dans un exercice de grammaire
function noterGram(id, ok) {
  if (!S.gramRates) S.gramRates = {};
  if (!ok) S.gramRates[id] = Math.min((S.gramRates[id] || 0) + 1, 9);
  else if (S.gramRates[id]) { S.gramRates[id]--; if (!S.gramRates[id]) delete S.gramRates[id]; }
}

// Un badge « diplôme » par partie
GRAMMAIRE_PARTIES.forEach((p, k) => BADGES.push({ id: 'controle' + k, em: '🎓', name: `Diplôme ${k + 1}`, desc: `Réussir le contrôle « ${p.titre} »`, ok: () => !!(S.controles && S.controles[k] && S.controles[k].reussi) }));

// Le bouton du contrôle, en bas de chaque partie de la liste des leçons
function boutonControle(k) {
  const p = GRAMMAIRE_PARTIES[k];
  if (!p) return '';
  const c = (S.controles || {})[k], faites = p.ids.filter((id) => S.grammaire[id]).length;
  const etat = c ? (c.reussi ? `🎓 Réussi · meilleur score ${c.best}/${CONTROLE_NB}` : `Meilleur score ${c.best}/${CONTROLE_NB} · il en faut ${CONTROLE_SEUIL}`) : faites < p.ids.length ? `${faites}/${p.ids.length} leçons faites : tu peux déjà essayer` : 'Toutes les leçons sont faites : à toi !';
  return `<a class="gr-ctrl${c && c.reussi ? ' ok' : ''}" href="#/grammaire/controle/${k}">
    <span class="gr-ctrl-em">${c && c.reussi ? '🎓' : '📝'}</span>
    <span class="gr-ctrl-txt"><b>Contrôle de la partie</b><small>${CONTROLE_NB} questions mélangées · ${etat}</small></span>
    <span class="btn">${c ? 'Repasser' : 'Passer le contrôle'} →</span></a>`;
}

// Les leçons à retravailler, de la plus faible à la moins faible
function leconsFaibles() {
  return GRAMMAIRE.map((l) => {
    const sc = S.grammaire[l.id];
    const poids = ((S.gramRates || {})[l.id] || 0) * 2 + (sc ? l.exercices.length - sc.bonnes : 0);
    return { l, poids };
  }).filter((x) => x.poids > 0).sort((a, b) => b.poids - a.poids);
}

// Le contrôle : 'k' (numéro de partie) ou 'faibles' (révision des points faibles)
function controleGram(cle) {
  const faibles = cle === 'faibles';
  const k = +cle, partie = GRAMMAIRE_PARTIES[k];
  const lecons = faibles ? leconsFaibles().slice(0, 6).map((x) => x.l) : partie ? partie.ids.map((id) => GRAMMAIRE.find((l) => l.id === id)).filter(Boolean) : [];
  if (!lecons.length) { location.hash = faibles ? '#/progres' : '#/grammaire'; return; }
  const total = Math.min(faibles ? FAIBLES_NB : CONTROLE_NB, lecons.reduce((t, l) => t + l.exercices.length, 0));
  // On pioche à tour de rôle dans chaque leçon (mélangées), sans reprendre deux fois la même question
  const restes = shuffle(lecons).map((l) => ({ l, ex: shuffle(l.exercices) }));
  const file = [];
  for (let r = 0; file.length < total; r = (r + 1) % restes.length) { const x = restes[r]; if (x.ex.length) file.push({ ...x.ex.pop(), lecon: x.l }); }
  const titre = faibles ? '🎯 Mes points faibles' : `📝 Contrôle · ${partie.em} ${esc(partie.titre)}`;
  let n = 0, bonnes = 0;
  const ratees = new Set();
  const montrer = () => {
    if (n >= file.length) return finir();
    const e = file[n], opts = shuffle([e.ok, ...e.non]), he = estHebreu(e.ok);
    app.innerHTML = `<div class="q-head"><a href="${faibles ? '#/progres' : '#/grammaire'}">← Quitter</a><span>${titre}</span><span>${n + 1}/${file.length}</span></div>
    <div class="progress"><i style="width:${(n / file.length) * 100}%"></i></div>
    <div class="card"><p class="hint ctrl-lecon">${e.lecon.em} ${texteGram(e.lecon.titre)}</p>
    <div class="prompt gram-q">${esc(e.q).replace(/\[\[(.+?)\]\]/g, (_, m) => HE(m) + (strip(m).replace(/[^א-ת]/g, '').length > 1 ? ' ' + sayBtn(m) : ''))}</div>
    <div class="opts">${opts.map((o, j) => `<button class="opt ${he ? 'he gram-opt' : ''}" data-j="${j}" ${he ? 'lang="he" dir="rtl"' : ''}><kbd>${j + 1}</kbd>${esc(o)}</button>`).join('')}</div>
    <p class="center hint" id="fb">&nbsp;</p><div class="center" id="suite"></div></div>`;
    let bloque = false;
    const avancer = () => { n++; montrer(); };
    const choisir = (j) => {
      if (bloque) return; bloque = true;
      const ok = opts[j] === e.ok;
      $$('.opt').forEach((b, x) => { b.disabled = true; if (opts[x] === e.ok) b.classList.add('ok'); else if (x === j) b.classList.add('ko'); });
      S.stats.q++;
      if (ok) { S.stats.ok++; bonnes++; lucioles($$('.opt')[j]); } else ratees.add(e.lecon);
      noterGram(e.lecon.id, ok); save();
      $('#fb').innerHTML = `${ok ? '✅ Bravo !' : '❌ Pas tout à fait.'} ${texteGramSon(e.pourquoi)}`;
      if (he && strip(e.ok).length > 1) speak(e.ok);
      if (ok) later(avancer, 1600);
      else { $('#suite').innerHTML = '<button class="btn" id="contin">Continuer</button>'; $('#contin').onclick = avancer; }
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
    S.stats.quiz++;
    let gagne = bonnes * 3, titreRes, sous = '';
    if (faibles) {
      titreRes = bonnes === file.length ? 'Points faibles en recul !' : 'Bien travaillé';
    } else {
      if (!S.controles) S.controles = {};
      const avant = S.controles[k], reussi = bonnes >= CONTROLE_SEUIL, premiere = reussi && !(avant && avant.reussi);
      S.controles[k] = { best: Math.max(bonnes, avant ? avant.best : 0), reussi: reussi || !!(avant && avant.reussi), date: dayKey() };
      if (premiere) gagne += 30;
      titreRes = reussi ? 'Contrôle réussi !' : 'Pas encore…';
      sous = reussi ? `${premiere ? 'Tu gagnes le badge 🎓 Diplôme ' + (k + 1) + ' et 30 XP de bonus. ' : ''}Bravo pour « ${esc(partie.titre)} » !${premiere && typeof VOYAGE !== 'undefined' && VOYAGE[k] ? ` <a href="#/voyage/${VOYAGE[k].id}">🧳 Tu arrives à ${VOYAGE[k].lieu} dans ton voyage en Israël !</a>` : ''}` : `Il faut ${CONTROLE_SEUIL} bonnes réponses sur ${CONTROLE_NB}. Revois les leçons ci-dessous, puis retente ta chance.`;
    }
    save(); addXP(gagne); checkBadges();
    const parfait = bonnes === file.length;
    if (parfait || (!faibles && bonnes >= CONTROLE_SEUIL)) confetti();
    const liste = [...ratees];
    app.innerHTML = `<div class="card center result"><div class="em">${parfait ? '🏆' : !faibles && bonnes >= CONTROLE_SEUIL ? '🎓' : '💪'}</div><h2>${titreRes}</h2><p class="score">${bonnes} / ${file.length}</p><p class="sub">+${gagne} XP</p>${sous ? `<p>${sous}</p>` : ''}
    ${liste.length ? `<div class="ctrl-revoir"><b>À revoir :</b>${liste.map((l) => `<a href="#/grammaire/${l.id}">${l.em} ${texteGram(l.titre)}</a>`).join('')}</div>` : ''}
    <div class="row" style="justify-content:center"><button class="btn gold" id="ctrlAgain">${faibles ? 'Encore une série' : 'Repasser le contrôle'}</button><a class="btn ghost" href="${faibles ? '#/progres' : '#/grammaire'}">${faibles ? 'Mes progrès' : 'Toutes les leçons'}</a></div></div>`;
    $('#ctrlAgain').onclick = () => controleGram(cle);
  };
  montrer();
}

// La carte « Tes points faibles » de la page Mes progrès
function pointsFaibles() {
  const lecons = leconsFaibles().slice(0, 5);
  const mots = motsEnErreur().slice(0, 8);
  const ctrlRates = GRAMMAIRE_PARTIES.map((p, k) => ({ p, k, c: (S.controles || {})[k] })).filter((x) => x.c && !x.c.reussi);
  if (!lecons.length && !mots.length && !ctrlRates.length) {
    return `<section class="card pg-carte pf"><div class="pg-carte-tete"><h3>Tes points faibles</h3></div><p class="pf-vide">✨ Rien à signaler pour l’instant. Les leçons et les mots où tu te trompes apparaîtront ici.</p></section>`;
  }
  return `<section class="card pg-carte pf">
    <div class="pg-carte-tete"><h3>Tes points faibles</h3><small>là où tu te trompes le plus</small></div>
    <div class="pf-cols">
      ${lecons.length ? `<div class="pf-col"><h4>📐 Grammaire</h4>
        ${lecons.map(({ l }) => { const sc = S.grammaire[l.id], r = (S.gramRates || {})[l.id] || 0; return `<a class="pf-ligne" href="#/grammaire/${l.id}"><span class="pf-em">${l.em}</span><span class="pf-txt"><b>${texteGram(l.titre)}</b><small>${sc ? `meilleur score ${sc.bonnes}/${l.exercices.length}` : 'pas encore terminée'}${r ? ` · ${r} erreur${r > 1 ? 's' : ''} récente${r > 1 ? 's' : ''}` : ''}</small></span><span class="pf-fl">›</span></a>`; }).join('')}
        <a class="btn gold pf-btn" href="#/grammaire/controle/faibles">🎯 Réviser ces leçons</a></div>` : ''}
      ${mots.length ? `<div class="pf-col"><h4>🃏 Vocabulaire</h4>
        <div class="pf-mots">${mots.map((w) => `<span class="pf-mot">${HE(w.he)}<small>${esc(w.fr)}</small>${sayBtn(w.he)}</span>`).join('')}</div>
        <a class="btn gold pf-btn" href="#/quiz/erreurs">🎯 Réviser ces mots</a></div>` : ''}
      ${ctrlRates.length ? `<div class="pf-col"><h4>📝 Contrôles à repasser</h4>
        ${ctrlRates.map(({ p, k, c }) => `<a class="pf-ligne" href="#/grammaire/controle/${k}"><span class="pf-em">${p.em}</span><span class="pf-txt"><b>${esc(p.titre)}</b><small>meilleur score ${c.best}/${CONTROLE_NB} · il en faut ${CONTROLE_SEUIL}</small></span><span class="pf-fl">›</span></a>`).join('')}</div>` : ''}
    </div></section>`;
}

// Séance du jour : quelques questions sur les leçons déjà faites (jamais ajoutées aux cartes).
// Priorité aux leçons faibles et à celles qu'on n'a pas revues depuis longtemps.
function questionsGramSeance(n) {
  const faites = GRAMMAIRE.filter((l) => S.grammaire[l.id]);
  if (!faites.length) return [];
  const auj = new Date(dayKey()), vu = S.gramVu || {};
  const poids = Object.fromEntries(leconsFaibles().map((x) => [x.l.id, x.poids]));
  const choisies = faites.map((l) => {
    const jours = vu[l.id] ? Math.round((auj - new Date(vu[l.id])) / 864e5) : 30;
    return { l, score: (poids[l.id] || 0) * 3 + Math.min(jours, 30) + Math.random() * 4 };
  }).filter((x) => vu[x.l.id] !== dayKey()).sort((a, b) => b.score - a.score).slice(0, n);
  return choisies.map(({ l }) => ({ ...l.exercices[Math.floor(Math.random() * l.exercices.length)], lecon: l }));
}
function noterGramVue(id) { if (!S.gramVu) S.gramVu = {}; S.gramVu[id] = dayKey(); }
