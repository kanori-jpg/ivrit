'use strict';
/* ============ Deux options du panneau « Aides » ============
   1. Relire sans voyelles les histoires terminées (on touche un mot pour voir ses voyelles et son sens).
   2. Répondre à voix haute dans les histoires et les jeux de rôle (reconnaissance vocale du navigateur). */
(() => {
  const Reco = window.SpeechRecognition || window.webkitSpeechRecognition;

  /* ---------- Les cases à cocher ---------- */
  const pop = $('#aidePop');
  if (pop) {
    pop.insertAdjacentHTML('beforeend', `<b class="aide-sous">Options</b>
      <label><input type="checkbox" id="optRelire"> Relire les histoires sans voyelles</label>
      <label><input type="checkbox" id="optMicro"${Reco ? '' : ' disabled'}> Répondre à voix haute (micro)</label>
      <p>${Reco ? 'Relecture : un bouton « Relire sans voyelles » apparaît sur les histoires terminées. Micro : un bouton 🎤 apparaît sous les réponses des histoires et des jeux de rôle.' : 'Le micro n’est pas disponible dans ce navigateur (il marche dans Chrome et Edge).'}</p>`);
    $('#optRelire').checked = !!S.relecture;
    $('#optMicro').checked = !!(S.micro && Reco);
    $('#optRelire').onchange = (e) => { S.relecture = e.target.checked; save(); route(); };
    $('#optMicro').onchange = (e) => { S.micro = e.target.checked; save(); route(); };
  }

  /* ---------- 1. Relire sans voyelles ---------- */
  const toutes = () => [...STORIES, ...STORIES_VIE];
  const lieuDe = (st) => (typeof villeDe === 'function' && villeDe(st.id) ? villeDe(st.id).lieu : CHAPITRES[st.id] ? `Chapitre ${CHAPITRES[st.id].num}` : st.cat || '');

  function listeRelecture() {
    const finies = toutes().filter((s) => S.story[s.id]);
    app.innerHTML = `<div class="q-head"><a href="#/histoire">← Histoires</a><span>📖 Relire sans voyelles</span></div>
      <h2>Relire sans voyelles</h2>
      <p class="sub">Les histoires que tu as terminées, écrites comme dans un vrai journal : sans voyelles. Touche un mot pour voir ses voyelles et son sens.</p>
      ${finies.length ? `<div class="rel-liste">${finies.map((s) => `<a class="card rel-tuile" href="#/relire/${s.id}"><span class="rel-em">${s.emoji}</span><span><b>${esc(s.title)}</b><small>${esc(lieuDe(s))}</small></span><i>›</i></a>`).join('')}</div>`
        : '<p class="card center">Termine une histoire, et tu pourras la relire ici sans voyelles.</p>'}`;
  }

  function relire(id) {
    if (!id) return listeRelecture();
    const st = toutes().find((s) => s.id === id);
    if (!st) { location.hash = '#/relire'; return; }
    const lignes = st.lines.flatMap((l) => [{ qui: st.who, he: l.he, fr: l.fr }, ...(l.choices || []).filter((c) => c.ok).map((c) => ({ qui: 'Toi', moi: true, he: c.he, fr: c.fr }))]);
    const mots = (he) => he.split(/(\s+)/).map((p) => (/[א-ת]/.test(p) ? `<button type="button" class="mot-clic" data-mot="${esc(p)}">${esc(strip(p))}</button>` : esc(p))).join('');
    app.innerHTML = `<div class="q-head"><a href="#/relire">← Relire sans voyelles</a><span>${st.emoji} ${esc(st.title)}</span></div>
      <h2>${esc(st.title)}</h2>
      <p class="sub">Touche un mot pour voir ses voyelles et son sens. 👁 montre toute la phrase avec ses voyelles.</p>
      <div class="bulle-mot" id="bulleMot" hidden></div>
      <div class="rel-lignes">${lignes.map((l, i) => `<div class="rel-ligne${l.moi ? ' moi' : ''}">
        <small class="rel-qui">${esc(l.qui)}</small>
        <div class="rel-he mots-clic" lang="he" dir="rtl">${mots(l.he)}</div>
        <div class="rel-outils"><button type="button" class="link" data-voir="${i}">👁 Voyelles</button><button type="button" class="link" data-fr="${i}">Traduction</button>${sayBtn(l.he)}</div>
        <div class="rel-voy" id="rv${i}" hidden>${HE(l.he)}</div>
        <div class="rel-fr" id="rf${i}" hidden>${esc(l.fr)}</div>
      </div>`).join('')}</div>
      <p class="center mt"><a class="btn ghost" href="#/histoire/${st.id}/jouer">↻ Rejouer l’histoire avec les voyelles</a></p>`;
    const bulle = $('#bulleMot');
    brancherMotsClic(app, bulle);
    // La bulle se place juste sous la phrase du mot touché
    $$('.rel-ligne .mot-clic').forEach((b) => b.addEventListener('click', () => b.closest('.rel-ligne').querySelector('.rel-he').after(bulle)));
    $$('[data-voir]').forEach((b) => (b.onclick = () => { const z = $('#rv' + b.dataset.voir); z.hidden = !z.hidden; }));
    $$('[data-fr]').forEach((b) => (b.onclick = () => { const z = $('#rf' + b.dataset.fr); z.hidden = !z.hidden; }));
  }
  routes.relire = relire;

  // Les portes d'entrée, quand l'option est cochée
  const histoireOrig = routes.histoire;
  routes.histoire = (...args) => {
    histoireOrig(...args);
    if (!S.relecture) return;
    if (!args[0]) {
      const n = toutes().filter((s) => S.story[s.id]).length;
      const sub = $('#app > .sub');
      if (sub) sub.insertAdjacentHTML('afterend', `<p><a class="btn ghost rel-entree" href="#/relire">📖 Relire sans voyelles · ${n} histoire${n > 1 ? 's' : ''}</a></p>`);
    } else {
      $$('.v-hist').forEach((a) => {
        const m = (a.getAttribute('href') || '').match(/^#\/histoire\/([^/]+)\/jouer/);
        if (m && S.story[m[1]]) a.insertAdjacentHTML('afterend', `<a class="v-relire" href="#/relire/${m[1]}">📖 Relire sans voyelles</a>`);
      });
      if (CHAPITRES[args[0]] && S.story[args[0]] && !args[1]) {
        app.insertAdjacentHTML('beforeend', `<p class="center mt"><a class="btn ghost" href="#/relire/${args[0]}">📖 Relire sans voyelles</a></p>`);
      }
    }
  };

  /* ---------- 2. Répondre au micro ---------- */
  const FINALES = { 'ך': 'כ', 'ם': 'מ', 'ן': 'נ', 'ף': 'פ', 'ץ': 'צ' };
  const norm = (s) => strip(s).replace(/[^א-ת\s]/g, ' ').replace(/[ךםןףץ]/g, (c) => FINALES[c]).replace(/[וי]/g, '').replace(/\s+/g, ' ').trim();
  const lev = (a, b) => {
    let prev = [...Array(b.length + 1).keys()];
    for (let i = 1; i <= a.length; i++) {
      const cur = [i];
      for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
    return prev[b.length];
  };
  const ressemblance = (dit, attendu) => {
    const a = norm(dit), b = norm(attendu);
    if (!a || !b) return 0;
    const lettres = 1 - lev(a, b) / Math.max(a.length, b.length);
    const ma = new Set(a.split(' ')), mb = b.split(' ');
    const mots = mb.filter((m) => ma.has(m)).length / mb.length;
    return Math.max(lettres, mots);
  };
  const texteBouton = (b) => {
    if (b.dataset.he) return b.dataset.he;
    const he = b.querySelector('.he');
    if (!he) return '';
    return (typeof TEXTES_HE !== 'undefined' && TEXTES_HE.get(he.firstChild)) || he.textContent;
  };

  function ecouter(zone, btn, msg) {
    const boutons = [...zone.querySelectorAll('button.choice, button.rlv-btn')].filter((b) => !b.disabled);
    if (!boutons.length) return;
    stopAudio();
    const r = new Reco();
    r.lang = 'he-IL'; r.maxAlternatives = 5; r.interimResults = false;
    btn.disabled = true; btn.classList.add('ecoute'); msg.textContent = '🎙️ Je t’écoute…';
    r.onresult = (e) => {
      const entendus = [...e.results[0]].map((a) => a.transcript);
      const notes = boutons.map((b) => ({ b, s: Math.max(...entendus.map((t) => ressemblance(t, texteBouton(b)))) })).sort((x, y) => y.s - x.s);
      const [meilleur, second] = notes;
      const net = meilleur.s >= 0.8 || (meilleur.s >= 0.5 && (!second || meilleur.s - second.s >= 0.12));
      msg.innerHTML = `J’ai entendu : <span class="he" lang="he" dir="rtl">${esc(entendus[0])}</span>`;
      if (net) later(() => meilleur.b.click(), 400);
      else msg.innerHTML += '<br><small>Ce n’est pas assez proche d’une des réponses : réessaie, ou touche ta réponse.</small>';
    };
    r.onerror = (e) => {
      msg.textContent = e.error === 'not-allowed' || e.error === 'service-not-allowed' ? 'Le micro n’est pas autorisé : autorise-le dans le navigateur, puis réessaie.'
        : e.error === 'no-speech' ? 'Je n’ai rien entendu : réessaie.'
        : e.error === 'network' ? 'La reconnaissance vocale a besoin d’internet.'
        : `Le micro n’a pas marché (${e.error}).`;
    };
    r.onend = () => { btn.disabled = false; btn.classList.remove('ecoute'); };
    try { r.start(); } catch (err) { btn.disabled = false; btn.classList.remove('ecoute'); msg.textContent = 'Le micro n’a pas pu démarrer.'; }
  }

  function brancherMicro() {
    if (!S.micro || !Reco) return;
    $$('.col-choices, #rlChoix, #rlChoixBas').forEach((zone) => {
      if (zone.querySelector('.micro-zone') || !zone.querySelector('button.choice, button.rlv-btn')) return;
      zone.insertAdjacentHTML('beforeend', '<div class="micro-zone"><button type="button" class="btn ghost micro-btn">🎤 Dire ma réponse</button><span class="micro-msg" aria-live="polite"></span></div>');
      const z = zone.querySelector('.micro-zone');
      z.querySelector('.micro-btn').onclick = (e) => { e.stopPropagation(); ecouter(zone, e.currentTarget, z.querySelector('.micro-msg')); };
    });
  }
  let prevu = false;
  new MutationObserver(() => { if (prevu) return; prevu = true; requestAnimationFrame(() => { prevu = false; brancherMicro(); }); }).observe($('#app'), { childList: true, subtree: true });

  // Le fichier se charge après le premier affichage : on redessine les pages concernées
  if (/^#\/(relire|histoire)/.test(location.hash)) route();
})();
