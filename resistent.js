'use strict';
/* ============ Les mots qui résistent ============
   Les mots ratés au moins deux fois (cartes « À revoir », quiz, Défi 60 s, séance), avec pour chacun :
   une phrase du site qui l'emploie, sa famille (même racine) et les mots qui lui ressemblent. */
(() => {
  // Au premier passage, les erreurs en cours servent de point de départ
  if (!S.rates) { S.rates = {}; Object.keys(S.erreurs || {}).forEach((k) => { S.rates[NFC(k)] = { n: 1, d: dayKey() }; }); save(); }

  /* ---------- Reconnaître un mot dans une phrase ---------- */
  const FINALES = { 'ך': 'כ', 'ם': 'מ', 'ן': 'נ', 'ף': 'פ', 'ץ': 'צ' };
  // Le « squelette » d'un mot : sans voyelles, sans lettres de lecture (ו, י), finales ramenées à la normale
  const squelette = (s) => strip(NFC(s)).replace(/[־׳״'"`]/g, ' ').replace(/[^א-ת\s]/g, ' ').replace(/[ךםןףץ]/g, (c) => FINALES[c]).replace(/[וי]/g, '').split(/\s+/).filter(Boolean);
  const contient = (phrase, mot) => {
    if (!mot.length) return false;
    if (mot.length > 1) return (' ' + phrase.join(' ') + ' ').includes(' ' + mot.join(' ') + ' ');
    const m = mot[0];
    return phrase.some((t) => t === m || (m.length >= 3 && t.length > m.length && t.endsWith(m) && /^[הבלמשכ]{1,2}$/.test(t.slice(0, t.length - m.length))));
  };
  let CORPUS = null;
  function corpus() {
    if (CORPUS) return CORPUS;
    const c = [], vus = new Set();
    const ajoute = (he, fr, src) => { if (!he || !fr || vus.has(he)) return; vus.add(he); c.push({ he, fr, src, sq: squelette(he) }); };
    [...STORIES, ...STORIES_VIE].forEach((s) => s.lines.forEach((l) => { ajoute(l.he, l.fr, `Histoire · ${s.title}`); (l.choices || []).filter((x) => x.ok).forEach((x) => ajoute(x.he, x.fr, `Histoire · ${s.title}`)); }));
    if (typeof PRESSE !== 'undefined') PRESSE.forEach((a) => a.sentences.forEach((s) => ajoute(s.he, s.fr, 'Journal')));
    if (typeof GRAMMAIRE !== 'undefined') GRAMMAIRE.forEach((l) => (l.exemples || []).forEach((e) => ajoute(e.he, e.fr, 'Grammaire')));
    if (typeof EXPRESSIONS !== 'undefined') EXPRESSIONS.forEach((x) => x.ex && ajoute(x.ex.he, x.ex.fr, 'Expression'));
    return (CORPUS = c);
  }
  const phrasesAvec = (w) => {
    const sq = squelette(w.he);
    return corpus().filter((p) => p.sq.length > sq.length && contient(p.sq, sq)).sort((a, b) => a.he.length - b.he.length).slice(0, 2);
  };
  const familleDe = (w) => {
    if (typeof RACINES === 'undefined') return null;
    const sq = squelette(w.he).join(' ');
    const r = RACINES.find((x) => x.mots.some(([he]) => squelette(he).join(' ') === sq));
    return r ? { r, autres: r.mots.filter(([he]) => squelette(he).join(' ') !== sq).slice(0, 6) } : null;
  };
  // Les mots qui s'écrivent presque pareil (une lettre de différence)
  const SOSIES = ['כחקה', 'בכפ', 'דר', 'התח', 'סמ', 'טת', 'אע', 'זנ', 'גנ', 'שס', 'צע', 'בו'];
  const sosies = (x, y) => SOSIES.some((g) => g.includes(x) && g.includes(y));
  const uneLettre = (a, b) => {
    if (a === b || a.length !== b.length) return false;
    const diff = [...a].map((c, i) => [c, b[i]]).filter(([c, d]) => c !== d);
    return diff.length === 1 && sosies(diff[0][0], diff[0][1]);
  };
  const prochesDe = (w) => {
    const sq = squelette(w.he).join('');
    if (sq.length < 3) return [];
    const vus = new Set([NFC(w.he)]);
    return WORDS.filter((x) => { const k = NFC(x.he); if (vus.has(k)) return false; vus.add(k); return x.fr !== w.fr && uneLettre(sq, squelette(x.he).join('')); }).slice(0, 3);
  };

  /* ---------- Les mots ---------- */
  function motsQuiResistent(min = 2) {
    const parMot = new Map(WORDS.map((w) => [NFC(w.he), w]));
    return Object.entries(S.rates || {}).filter(([, r]) => r.n >= min).map(([k, r]) => ({ w: parMot.get(k), n: r.n, d: r.d })).filter((x) => x.w)
      .sort((a, b) => b.n - a.n || (b.d || '').localeCompare(a.d || ''));
  }
  window.motsQuiResistent = motsQuiResistent;

  const puce = ([he, fr]) => `<span class="rs-puce">${HE(he)}<small>${esc(fr)}</small>${sayBtn(he)}</span>`;
  function carte({ w, n }) {
    const phrases = phrasesAvec(w), fam = familleDe(w), proches = prochesDe(w), box = (S.cards[w.he] || {}).box || 0;
    return `<article class="card rs-mot">
      <div class="rs-tete">
        <span class="rs-he">${HE(w.he)}</span>${sayBtn(w.he)}
        <span class="rs-sens"><b>${esc(w.fr)}</b><small>${esc(w.tr || '')}</small></span>
        <span class="rs-badge" title="Boîte ${box + 1} sur ${INTERVALS.length}">raté ${n} fois</span>
      </div>
      ${phrases.length ? `<div class="rs-bloc"><h4>Dans une phrase</h4>${phrases.map((p) => `<div class="rs-phrase"><div class="rs-ph-he">${HE(p.he)}${sayBtn(p.he)}</div><small>${esc(p.fr)} · <i>${esc(p.src)}</i></small></div>`).join('')}</div>` : ''}
      ${fam ? `<div class="rs-bloc"><h4>Même famille · racine <span class="he" lang="he" dir="rtl">${esc(fam.r.r)}</span> (${esc(fam.r.fr)})</h4><div class="rs-puces">${fam.autres.map(puce).join('')}</div></div>` : ''}
      ${proches.length ? `<div class="rs-bloc"><h4>À ne pas confondre</h4><div class="rs-puces">${proches.map((x) => puce([x.he, x.fr])).join('')}</div></div>` : ''}
    </article>`;
  }

  function resistent() {
    const mots = motsQuiResistent();
    const aSurveiller = mots.length ? [] : motsQuiResistent(1).slice(0, 12);
    app.innerHTML = `<div class="q-head"><a href="#/progres">← Mes progrès</a><span>🧱 Les mots qui résistent</span></div>
      <h2>Les mots qui résistent</h2>
      <p class="sub">Les mots que tu as ratés au moins deux fois : cartes « À revoir », quiz, Défi 60 s et séance du jour. Pour chacun, une phrase où il apparaît, sa famille et les mots qui lui ressemblent.</p>
      ${mots.length ? `<p><a class="btn gold" href="#/quiz/resistent">🎯 M’entraîner sur ${mots.length > 10 ? '10 de ces mots' : mots.length > 1 ? `ces ${mots.length} mots` : 'ce mot'}</a></p>
        <div class="rs-liste">${mots.slice(0, 30).map(carte).join('')}</div>
        ${mots.length > 30 ? `<p class="hint center">Et ${mots.length - 30} autre${mots.length - 30 > 1 ? 's' : ''} : commence par ceux-là.</p>` : ''}`
      : `<div class="card center"><p style="font-size:2rem;margin:0">🌿</p><p><b>Aucun mot ne résiste pour l’instant.</b></p><p class="hint">Le site compte maintenant chaque mot raté. Un mot apparaîtra ici dès que tu l’auras raté deux fois.</p></div>
        ${aSurveiller.length ? `<h3>À surveiller</h3><p class="sub">Ratés une fois récemment.</p><div class="rs-puces">${aSurveiller.map(({ w }) => puce([w.he, w.fr])).join('')}</div>` : ''}`}`;
  }
  routes.resistent = resistent;

  /* ---------- Les chemins vers la page ---------- */
  // Dans « Tes points faibles » (Mes progrès)
  const pointsFaiblesAvant = pointsFaibles;
  pointsFaibles = function (...args) {
    const html = pointsFaiblesAvant.apply(this, args), n = motsQuiResistent().length;
    const lien = `<a class="pf-resiste" href="#/resistent">🧱 Les mots qui résistent${n ? ` · ${n}` : ''} <span>›</span></a>`;
    const i = html.lastIndexOf('</section>');
    return i < 0 ? html + lien : html.slice(0, i) + lien + html.slice(i);
  };
  // En bas de « Mes erreurs »
  const erreursAvant = routes.erreurs;
  routes.erreurs = (...args) => {
    erreursAvant(...args);
    const n = motsQuiResistent().length;
    if (n) app.insertAdjacentHTML('beforeend', `<p class="center mt"><a class="btn ghost" href="#/resistent">🧱 Les mots qui résistent · ${n}</a></p>`);
  };
  if (/^#\/(resistent|erreurs|progres)/.test(location.hash)) route();
})();
