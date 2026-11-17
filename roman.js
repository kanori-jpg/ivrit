'use strict';
/* ============ Les romans (#/roman) ============
   Une petite bibliothèque de longs textes en hébreu, chapitre par chapitre, à lire comme un livre :
   - lecture suivie : les phrases sont lues l'une après l'autre, la phrase lue est surlignée ;
   - un mot touché donne son sens (et le ＋ pour « Mes mots ») ;
   - la traduction d'une phrase n'apparaît que si on la demande ;
   - un petit quiz (2 bonnes réponses sur 3) ouvre le chapitre suivant.
   Un livre « carnet » a en plus un carnet d'enquête (ce qu'on apprend à chaque chapitre) et,
   avant le dernier chapitre, la lectrice désigne le coupable.
   Routes : #/roman (la bibliothèque), #/roman/<id>, #/roman/<id>/<n>, #/roman/<id>/<n>/quiz,
   #/roman/<id>/carnet, #/roman/<id>/coupable ; les anciennes adresses #/roman/<n> mènent au premier livre.
   État : S.roman pour le premier livre (Jaffa), S.romans[id] pour les suivants :
   { quiz: { n: meilleur score }, lus: { n: date }, marque: { n, i }, choix: id du suspect désigné } */
const ROMAN_SEUIL = 2;
if (typeof ROMAN !== 'undefined' && !ROMAN.id) ROMAN.id = 'jaffa';
const LIVRES = [typeof ROMAN !== 'undefined' && ROMAN, typeof ROMAN2 !== 'undefined' && ROMAN2].filter(Boolean);
const livreParId = (id) => LIVRES.find((l) => l.id === id);
const lienLivre = (l, suite) => `#/roman/${l.id}${suite ? '/' + suite : ''}`;
function etatLivre(l) {
  let st;
  if (l === LIVRES[0]) { if (!S.roman) S.roman = {}; st = S.roman; }
  else { if (!S.romans) S.romans = {}; if (!S.romans[l.id]) S.romans[l.id] = {}; st = S.romans[l.id]; }
  st.quiz = st.quiz || {}; st.lus = st.lus || {}; if (st.marque === undefined) st.marque = null;
  return st;
}
const dernierChapitre = (l) => l.chapitres[l.chapitres.length - 1].num;
const chapitreReussi = (l, n) => (etatLivre(l).quiz[n] || 0) >= ROMAN_SEUIL;
// Le dernier chapitre d'une enquête ne s'ouvre qu'après avoir désigné le coupable
const attendCoupable = (l, n) => !!(l.suspects && l.coupable && n === dernierChapitre(l) && !etatLivre(l).choix);
const chapitreOuvert = (l, n) => n === 1 || (chapitreReussi(l, n - 1) && !attendCoupable(l, n));
const enqueteFinie = (l) => !!(l.suspects && chapitreReussi(l, dernierChapitre(l)));

function roman(a, b, c) {
  if (!LIVRES.length) return home();
  if (a === undefined || a === '') return romanBibliotheque();
  let l = livreParId(a);
  if (!l && /^\d+$/.test(a)) { l = LIVRES[0]; c = b; b = a; } // anciennes adresses : #/roman/3
  if (!l) return romanBibliotheque();
  if (b === undefined || b === '') return romanAccueil(l);
  if (b === 'carnet' && l.carnet) return romanCarnet(l);
  if (b === 'coupable' && l.suspects) return romanCoupable(l);
  const ch = l.chapitres.find((x) => x.num === +b);
  if (!ch) return romanAccueil(l);
  if (!chapitreOuvert(l, ch.num)) {
    if (chapitreReussi(l, ch.num - 1) && attendCoupable(l, ch.num)) { location.hash = lienLivre(l, 'coupable'); return; }
    toast('Ce chapitre s’ouvrira quand tu auras réussi le quiz du précédent.'); location.hash = lienLivre(l); return;
  }
  if (c === 'quiz') return romanQuiz(l, ch);
  romanChapitre(l, ch);
}

function progresLivre(l) {
  const reussis = l.chapitres.filter((c) => chapitreReussi(l, c.num)).length;
  return `<div class="pc-total"><span class="pc-barre grande"><i style="width:${(reussis / l.chapitres.length) * 100}%"></i></span><small>${reussis} / ${l.chapitres.length} chapitres</small></div>`;
}
function boutonLecture(l) {
  const st = etatLivre(l);
  const m = st.marque && l.chapitres.find((c) => c.num === st.marque.n);
  if (m && chapitreOuvert(l, m.num)) return `<a class="btn gold" href="${lienLivre(l, m.num)}">📖 Reprendre : chapitre ${m.num}</a>`;
  const prochain = l.chapitres.find((c) => !chapitreReussi(l, c.num));
  if (prochain && prochain.num > 1) {
    if (attendCoupable(l, prochain.num) && chapitreReussi(l, prochain.num - 1)) return `<a class="btn gold" href="${lienLivre(l, 'coupable')}">🔎 Désigner le coupable</a>`;
    return `<a class="btn gold" href="${lienLivre(l, prochain.num)}">📖 Reprendre : chapitre ${prochain.num}</a>`;
  }
  return `<a class="btn gold" href="${lienLivre(l, 1)}">📖 ${prochain ? 'Commencer la lecture' : 'Relire depuis le début'}</a>`;
}

function romanBibliotheque() {
  app.innerHTML = `<section class="card"><h2>📚 Les romans</h2>
      <p class="sub">De longues histoires en hébreu, à lire et à écouter chapitre par chapitre. Le niveau monte doucement d’un chapitre à l’autre.</p></section>
    <div class="rm-biblio">${LIVRES.map((l) => `<a class="rm-livre" href="${lienLivre(l)}">
        <span class="rm-livre-em">${l.em || '📖'}</span>
        <span class="rm-livre-txt"><b>${esc(l.titre)}</b><span class="he" lang="he" dir="rtl">${esc(l.titreHe)}</span>
          <small>${esc(l.accroche || l.resume.split('. ')[0] + '.')}</small>${progresLivre(l)}</span>
      </a>`).join('')}</div>`;
}

function romanAccueil(l) {
  const ouvertBientot = (c) => attendCoupable(l, c.num) && chapitreReussi(l, c.num - 1);
  app.innerHTML = `${LIVRES.length > 1 ? '<div class="q-head"><a href="#/roman">← Les romans</a><span></span></div>' : ''}
    <section class="card rm-couverture">
      <span class="he rm-couv-he" lang="he" dir="rtl">${esc(l.titreHe)}</span>
      <h2>${l.em || '📚'} ${esc(l.titre)}</h2>
      <p class="sub">${esc(l.resume)}</p>
      ${progresLivre(l)}
      <div class="row">${boutonLecture(l)}${l.carnet ? `<a class="btn ghost" href="${lienLivre(l, 'carnet')}">📓 Carnet d’enquête</a>` : ''}</div>
      <p class="hint" style="margin:12px 0 0">▶ fait lire le chapitre à voix haute · touche un mot pour son sens · « FR » pour la traduction d’une phrase. Un petit quiz à la fin de chaque chapitre ouvre le suivant.${l.suspects ? ' Avant le dernier chapitre, c’est à toi de désigner le coupable.' : ''}</p>
    </section>
    <div class="rm-chapitres">${l.chapitres.map((c) => {
      const ouvert = chapitreOuvert(l, c.num), ok = chapitreReussi(l, c.num), cpb = ouvertBientot(c);
      const contenu = `<span class="rm-ch-num">${ok ? '✓' : c.num}</span><span class="rm-ch-txt"><b>${esc(c.titre)}</b><span class="he" lang="he" dir="rtl">${esc(c.titreHe)}</span></span><span class="rm-ch-etat">${ok ? 'lu' : ouvert ? `${c.phrases.length} phrases` : cpb ? '🔎 désigne le coupable' : '🔒'}</span>`;
      return ouvert ? `<a class="rm-ch${ok ? ' fait' : ''}" href="${lienLivre(l, c.num)}">${contenu}</a>` : cpb ? `<a class="rm-ch rm-ch-cpb" href="${lienLivre(l, 'coupable')}">${contenu}</a>` : `<div class="rm-ch ferme">${contenu}</div>`;
    }).join('')}</div>`;
}

/* ---------- Le carnet d'enquête : ce qu'on a appris, chapitre après chapitre ---------- */
const CARNET_TYPES = {
  victime: ['⚰️', 'Victime'], fait: ['📌', 'Fait'], indice: ['🔍', 'Indice'], suspect: ['👤', 'Suspect'], témoin: ['👁️', 'Témoin'],
  alibi: ['🕐', 'Alibi'], mobile: ['💰', 'Mobile'], mensonge: ['🤥', 'Mensonge'], étrange: ['❗', 'Étrange'], note: ['✏️', 'Note'],
  question: ['❓', 'Question'], solution: ['⚖️', 'Solution'],
};
function romanCarnet(l) {
  const st = etatLivre(l);
  const lus = l.chapitres.filter((c) => chapitreReussi(l, c.num) && (c.carnet || []).length);
  const choix = st.choix && l.suspects.find((s) => s.id === st.choix);
  app.innerHTML = `<div class="q-head"><a href="${lienLivre(l)}">← ${esc(l.titre)}</a><span>📓 Carnet d’enquête</span></div>
    <article class="rm-carnet">
      <header><h2>📓 ${esc(l.carnetTitre || 'Le carnet d’enquête')}</h2><p class="sub">Chaque chapitre réussi ajoute ici ce que l’enquête a appris.</p></header>
      ${l.suspects ? `<h3>Les suspects</h3><div class="rm-suspects">${l.suspects.map((s) => `<div class="rm-suspect${choix && choix.id === s.id ? ' choisi' : ''}${enqueteFinie(l) && s.id === l.coupable ? ' coupable' : ''}"><b>${esc(s.nom)}</b><span class="he" lang="he" dir="rtl">${esc(s.he)}</span><small>${esc(s.desc)}</small></div>`).join('')}</div>` : ''}
      ${choix ? `<p class="rm-choix-note">🔎 Tu as désigné <b>${esc(choix.nom)}</b>.</p>` : ''}
      ${lus.length ? lus.map((c) => `<section class="rm-carnet-ch"><h3><span>Chapitre ${c.num}</span> ${esc(c.titre)}</h3><ul>${c.carnet.map(([type, txt]) => {
        const [em, nom] = CARNET_TYPES[type] || ['•', type];
        return `<li class="rm-note t-${esc(type)}"><span class="rm-note-type">${em} ${esc(nom)}</span>${esc(txt)}</li>`;
      }).join('')}</ul></section>`).join('') : '<p class="sub center" style="margin:24px 0">Le carnet est encore vide. Lis le premier chapitre et réussis son quiz : les premières notes apparaîtront ici.</p>'}
    </article>`;
}

/* ---------- Désigner le coupable (avant le dernier chapitre) ---------- */
function romanCoupable(l) {
  const st = etatLivre(l);
  const der = dernierChapitre(l);
  if (!chapitreReussi(l, der - 1)) { toast('Lis d’abord tous les chapitres jusqu’au ' + (der - 1) + '.'); location.hash = lienLivre(l); return; }
  let sel = st.choix || null;
  const dessiner = () => {
    app.innerHTML = `<div class="q-head"><a href="${lienLivre(l)}">← ${esc(l.titre)}</a><span>🔎 Le coupable</span></div>
      <section class="card rm-coupable">
        <h2>🔎 ${esc(l.question || 'Qui est le coupable ?')}</h2>
        <p class="sub">${st.choix ? 'Tu as déjà désigné un coupable. Le dernier chapitre te dira si tu avais raison.' : 'Relis ton carnet si besoin, puis désigne le coupable. Ensuite, le dernier chapitre s’ouvrira et tu sauras la vérité.'}</p>
        <a class="btn ghost" href="${lienLivre(l, 'carnet')}">📓 Relire le carnet d’enquête</a>
        <div class="rm-suspects choix">${l.suspects.map((s) => `<button type="button" class="rm-suspect${sel === s.id ? ' choisi' : ''}" data-id="${esc(s.id)}" ${st.choix ? 'disabled' : ''}><b>${esc(s.nom)}</b><span class="he" lang="he" dir="rtl">${esc(s.he)}</span><small>${esc(s.desc)}</small></button>`).join('')}</div>
        <div class="center">${st.choix ? `<a class="btn gold" href="${lienLivre(l, der)}">Lire le dernier chapitre →</a>` : `<button type="button" class="btn gold" id="rmAccuser" ${sel ? '' : 'disabled'}>${sel ? `C’est ${esc(l.suspects.find((s) => s.id === sel).nom)} !` : 'Choisis un suspect'}</button>`}</div>
      </section>`;
    if (st.choix) return;
    $$('.rm-suspect').forEach((b) => (b.onclick = () => { sel = b.dataset.id; dessiner(); }));
    const acc = $('#rmAccuser');
    if (acc) acc.onclick = () => {
      if (!sel) return;
      st.choix = sel; save();
      toast('C’est noté dans le carnet. À toi de lire la vérité !');
      location.hash = lienLivre(l, der);
    };
  };
  dessiner();
}
// Le verdict, à la fin du dernier chapitre
function verdict(l) {
  const st = etatLivre(l);
  if (!l.suspects || !st.choix) return '';
  const choix = l.suspects.find((s) => s.id === st.choix), vrai = l.suspects.find((s) => s.id === l.coupable);
  if (!choix || !vrai) return '';
  return st.choix === l.coupable
    ? `<div class="rm-verdict bon">🏆 Tu avais désigné <b>${esc(choix.nom)}</b> : bravo, détective, tu avais trouvé !</div>`
    : `<div class="rm-verdict">🔎 Tu avais désigné <b>${esc(choix.nom)}</b>… mais c’était <b>${esc(vrai.nom)}</b>. Relis le carnet : tous les indices y étaient !</div>`;
}

function romanChapitre(l, ch) {
  const st = etatLivre(l);
  let lecture = null; // { jeton } pendant la lecture suivie
  let lent = false;
  const debut = st.marque && st.marque.n === ch.num ? st.marque.i : 0;
  const suivant = l.chapitres.find((c) => c.num === ch.num + 1);
  const dernier = ch.num === dernierChapitre(l);
  // Les phrases, en paragraphes de 5 (comme dans un livre)
  const paras = [];
  ch.phrases.forEach((p, i) => { if (i % 5 === 0) paras.push([]); paras[paras.length - 1].push(i); });
  let apres = '';
  if (chapitreReussi(l, ch.num) && suivant) apres = chapitreOuvert(l, suivant.num) ? `<a class="btn ghost" href="${lienLivre(l, suivant.num)}">Chapitre suivant →</a>` : attendCoupable(l, suivant.num) ? `<a class="btn ghost" href="${lienLivre(l, 'coupable')}">🔎 Désigner le coupable</a>` : '';
  app.innerHTML = `<div class="q-head"><a href="${lienLivre(l)}">← ${esc(l.titre)}</a><span>Chapitre ${ch.num} / ${l.chapitres.length}</span></div>
    <article class="rm-page">
      <header class="rm-tete"><small>Chapitre ${ch.num}</small><h2>${esc(ch.titre)}</h2><span class="he" lang="he" dir="rtl">${esc(ch.titreHe)}</span></header>
      <div class="rm-outils">
        <button type="button" class="btn" id="rmLire">▶ Écouter${debut ? ' la suite' : ' le chapitre'}</button>
        <label class="rm-opt"><input type="checkbox" id="rmLent"> 🐢 Plus lent</label>
        <label class="rm-opt"><input type="checkbox" id="rmTout"> Toutes les traductions</label>
      </div>
      <div class="rm-texte" id="rmTexte">${paras.map((ids) => `<p class="rm-para">${ids.map((i) => `<span class="rm-ph" data-i="${i}">${phraseCliquable(ch.phrases[i][0])}<button type="button" class="rm-fr" data-i="${i}" title="Traduction">FR</button><span class="rm-trad" hidden><i>${esc(ch.phrases[i][1])}</i>${esc(ch.phrases[i][2])}</span></span>`).join(' ')}</p>`).join('')}</div>
      <div class="rm-fin">
        ${dernier && chapitreReussi(l, ch.num) ? verdict(l) : ''}
        <p class="sub">${dernier ? 'Fin du roman.' : `Fin du chapitre ${ch.num}.`}</p>
        <a class="btn gold" href="${lienLivre(l, ch.num + '/quiz')}">${chapitreReussi(l, ch.num) ? 'Refaire le quiz' : 'Le quiz du chapitre →'}</a>
        ${apres}${l.carnet && chapitreReussi(l, ch.num) ? `<a class="btn ghost" href="${lienLivre(l, 'carnet')}">📓 Carnet</a>` : ''}
      </div>
    </article>`;
  const texte = $('#rmTexte');
  // La bulle du mot touché, placée sous la phrase
  const bulle = document.createElement('div'); bulle.className = 'bulle-mot rm-bulle'; bulle.hidden = true;
  brancherMotsClic(texte, bulle);
  texte.addEventListener('click', (e) => {
    const mot = e.target.closest('.mot-clic');
    if (mot) { arreter(); const ph = mot.closest('.rm-ph'); ph.after(bulle); marquer(+ph.dataset.i); }
  }, true);
  const surligner = (i) => {
    $$('.rm-ph.lue').forEach((x) => x.classList.remove('lue'));
    const ph = texte.querySelector(`.rm-ph[data-i="${i}"]`);
    if (ph) { ph.classList.add('lue'); ph.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
  };
  const marquer = (i) => { st.marque = { n: ch.num, i }; save(); };
  const bouton = () => { const b = $('#rmLire'); if (b) b.textContent = lecture ? '⏸ Pause' : '▶ Reprendre la lecture'; };
  function arreter() { if (!lecture) return; lecture = null; stopAudio(); bouton(); }
  async function lire(depuis) {
    const jeton = {}; lecture = jeton; bouton();
    for (let i = depuis; i < ch.phrases.length; i++) {
      if (lecture !== jeton || !texte.isConnected) return;
      surligner(i); marquer(i);
      await speak(ch.phrases[i][0], lent ? LENT : 1);
      if (lecture !== jeton) return;
      await new Promise((r) => setTimeout(r, 350));
    }
    if (lecture === jeton) {
      lecture = null; marquer(0);
      if (!st.lus[ch.num]) { st.lus[ch.num] = dayKey(); save(); }
      $('.rm-fin').scrollIntoView({ block: 'center', behavior: 'smooth' });
      const b = $('#rmLire'); if (b) b.textContent = '▶ Réécouter le chapitre';
    }
  }
  $('#rmLire').onclick = () => {
    if (lecture) return arreter();
    const lue = texte.querySelector('.rm-ph.lue');
    lire(lue ? +lue.dataset.i : (st.marque && st.marque.n === ch.num ? st.marque.i : 0));
  };
  $('#rmLent').onchange = (e) => { lent = e.target.checked; };
  $('#rmTout').onchange = (e) => { $$('.rm-trad').forEach((t) => (t.hidden = !e.target.checked)); $$('.rm-fr').forEach((b) => b.classList.toggle('on', e.target.checked)); };
  texte.querySelectorAll('.rm-fr').forEach((b) => (b.onclick = (e) => {
    e.stopPropagation();
    const t = b.nextElementSibling; t.hidden = !t.hidden; b.classList.toggle('on', !t.hidden);
  }));
  // Double-toucher une phrase : la lecture repart de là
  texte.querySelectorAll('.rm-ph').forEach((ph) => ph.addEventListener('dblclick', () => { arreter(); lire(+ph.dataset.i); }));
  if (debut) setTimeout(() => surligner(debut), 100);
  // En quittant la page, la lecture s'arrête (route() appelle stopAudio)
  timers.push(setInterval(() => { if (!texte.isConnected) lecture = null; }, 1000));
}

function romanQuiz(l, ch) {
  const st = etatLivre(l);
  const file = ch.quiz.map((q) => ({ ...q, ordre: shuffle(q.opts.map((o, j) => j)) }));
  let k = 0, bonnes = 0;
  const montrer = () => {
    if (k >= file.length) return finir();
    const q = file[k];
    app.innerHTML = `<div class="q-head"><a href="${lienLivre(l, ch.num)}">← Chapitre ${ch.num}</a><span>📚 Quiz du chapitre ${ch.num}</span><span>${k + 1}/${file.length}</span></div>
      <div class="progress"><i style="width:${(k / file.length) * 100}%"></i></div>
      <div class="card"><div class="prompt gram-q">${esc(q.q)}</div>
      <div class="opts">${q.ordre.map((j, x) => `<button class="opt" data-j="${j}"><kbd>${x + 1}</kbd>${esc(q.opts[j])}</button>`).join('')}</div>
      <p class="center hint" id="fb">&nbsp;</p><div class="center" id="suite"></div></div>`;
    let fait = false;
    const choisir = (b) => {
      if (fait) return; fait = true;
      const ok = +b.dataset.j === q.a;
      $$('.opt').forEach((x) => { x.disabled = true; if (+x.dataset.j === q.a) x.classList.add('ok'); else if (x === b) x.classList.add('ko'); });
      if (ok) { bonnes++; lucioles(b); }
      $('#fb').textContent = ok ? '✅ Bravo !' : `❌ La bonne réponse : ${q.opts[q.a]}`;
      $('#suite').innerHTML = '<button class="btn" id="contin">Continuer →</button>'; $('#contin').onclick = () => { k++; montrer(); };
    };
    $$('.opt').forEach((b) => (b.onclick = () => choisir(b)));
    keyHandler = (ev) => { const n = +ev.key; if (!fait && n >= 1 && n <= q.opts.length) choisir($$('.opt')[n - 1]); else if (fait && ev.key === 'Enter' && $('#contin')) $('#contin').click(); };
  };
  const finir = () => {
    keyHandler = null;
    const avant = st.quiz[ch.num] || 0, reussi = bonnes >= ROMAN_SEUIL, premiere = reussi && avant < ROMAN_SEUIL;
    st.quiz[ch.num] = Math.max(avant, bonnes);
    if (!st.lus[ch.num]) st.lus[ch.num] = dayKey();
    if (premiere && st.marque && st.marque.n === ch.num) st.marque = { n: ch.num + 1, i: 0 };
    save(); addXP(bonnes * 3 + (premiere ? 15 : 0)); header();
    if (reussi) confetti();
    const suivant = l.chapitres.find((c) => c.num === ch.num + 1);
    const cpb = reussi && suivant && attendCoupable(l, suivant.num);
    let msg;
    if (!reussi) msg = `Il faut ${ROMAN_SEUIL} bonnes réponses. Relis le chapitre (avec les traductions si besoin), puis réessaie.`;
    else if (cpb) msg = 'Tu as tous les indices. Avant le dernier chapitre, à toi de désigner le coupable !';
    else if (suivant) msg = `Le chapitre ${suivant.num} est ouvert${premiere ? ' · +15 XP de bonus' : ''}.${l.carnet ? ' De nouvelles notes sont dans le carnet.' : ''}`;
    else msg = 'Tu as fini le roman. Bravo !';
    const principal = !reussi ? `<a class="btn gold" href="${lienLivre(l, ch.num)}">Relire le chapitre</a>`
      : cpb ? `<a class="btn gold" href="${lienLivre(l, 'coupable')}">🔎 Désigner le coupable →</a>`
      : suivant ? `<a class="btn gold" href="${lienLivre(l, suivant.num)}">Chapitre ${suivant.num} : ${esc(suivant.titre)} →</a>`
      : `<a class="btn gold" href="#/roman">Les romans</a>`;
    app.innerHTML = `<div class="card center result"><div class="em">${reussi ? (cpb ? '🔎' : '📖') : '💪'}</div><h2>${reussi ? 'Chapitre compris !' : 'Pas encore…'}</h2>
      <p class="score">${bonnes} / ${file.length}</p>
      ${reussi && !suivant ? verdict(l) : ''}
      <p class="sub">${msg}</p>
      <div class="row" style="justify-content:center">${principal}${reussi && l.carnet ? `<a class="btn ghost" href="${lienLivre(l, 'carnet')}">📓 Carnet</a>` : ''}<button class="btn ghost" id="rmRefaire" type="button">Refaire le quiz</button><a class="btn ghost" href="${lienLivre(l)}">Le roman</a></div></div>`;
    $('#rmRefaire').onclick = () => romanQuiz(l, ch);
  };
  montrer();
}

routes.roman = roman;
if (/^#\/roman/.test(location.hash) && typeof route === 'function') route();
