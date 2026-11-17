'use strict';
/* ============ Le roman (#/roman) ============
   Un long texte en hébreu, chapitre par chapitre, à lire comme un livre :
   - lecture suivie : les phrases sont lues l'une après l'autre, la phrase lue est surlignée ;
   - un mot touché donne son sens (et le ＋ pour « Mes mots ») ;
   - la traduction d'une phrase n'apparaît que si on la demande ;
   - un petit quiz (2 bonnes réponses sur 3) ouvre le chapitre suivant.
   S.roman = { quiz: { n: meilleur score }, lus: { n: date }, marque: { n, i } } */
const ROMAN_SEUIL = 2;
const etatRoman = () => { if (!S.roman) S.roman = { quiz: {}, lus: {}, marque: null }; S.roman.quiz = S.roman.quiz || {}; S.roman.lus = S.roman.lus || {}; return S.roman; };
const chapitreOuvert = (n) => n === 1 || (etatRoman().quiz[n - 1] || 0) >= ROMAN_SEUIL;
const chapitreReussi = (n) => (etatRoman().quiz[n] || 0) >= ROMAN_SEUIL;

function roman(n, vue) {
  const st = etatRoman();
  const ch = ROMAN.chapitres.find((c) => c.num === +n);
  if (!ch) return romanAccueil();
  if (!chapitreOuvert(ch.num)) { toast('Ce chapitre s’ouvrira quand tu auras réussi le quiz du précédent.'); location.hash = '#/roman'; return; }
  if (vue === 'quiz') return romanQuiz(ch);
  romanChapitre(ch, st);
}

function romanAccueil() {
  const st = etatRoman();
  const reussis = ROMAN.chapitres.filter((c) => chapitreReussi(c.num)).length;
  const m = st.marque && ROMAN.chapitres.find((c) => c.num === st.marque.n);
  app.innerHTML = `<section class="card rm-couverture">
      <span class="he rm-couv-he" lang="he" dir="rtl">${esc(ROMAN.titreHe)}</span>
      <h2>📚 ${esc(ROMAN.titre)}</h2>
      <p class="sub">${esc(ROMAN.resume)}</p>
      <div class="pc-total"><span class="pc-barre grande"><i style="width:${(reussis / ROMAN.chapitres.length) * 100}%"></i></span><small>${reussis} / ${ROMAN.chapitres.length} chapitres</small></div>
      ${m && chapitreOuvert(m.num) ? `<a class="btn gold" href="#/roman/${m.num}">📖 Reprendre : chapitre ${m.num}</a>` : `<a class="btn gold" href="#/roman/1">📖 Commencer la lecture</a>`}
      <p class="hint" style="margin:12px 0 0">▶ fait lire le chapitre à voix haute · touche un mot pour son sens · « FR » pour la traduction d’une phrase. Un petit quiz à la fin de chaque chapitre ouvre le suivant.</p>
    </section>
    <div class="rm-chapitres">${ROMAN.chapitres.map((c) => {
      const ouvert = chapitreOuvert(c.num), ok = chapitreReussi(c.num);
      const contenu = `<span class="rm-ch-num">${ok ? '✓' : c.num}</span><span class="rm-ch-txt"><b>${esc(c.titre)}</b><span class="he" lang="he" dir="rtl">${esc(c.titreHe)}</span></span><span class="rm-ch-etat">${ok ? 'lu' : ouvert ? `${c.phrases.length} phrases` : '🔒'}</span>`;
      return ouvert ? `<a class="rm-ch${ok ? ' fait' : ''}" href="#/roman/${c.num}">${contenu}</a>` : `<div class="rm-ch ferme">${contenu}</div>`;
    }).join('')}
    ${ROMAN.chapitres.length < 12 ? '<div class="rm-ch ferme"><span class="rm-ch-num">…</span><span class="rm-ch-txt"><b>La suite arrive bientôt</b></span></div>' : ''}</div>`;
}

function romanChapitre(ch, st) {
  let lecture = null; // { jeton } pendant la lecture suivie
  let lent = false;
  const debut = st.marque && st.marque.n === ch.num ? st.marque.i : 0;
  // Les phrases, en paragraphes de 4 ou 5 (comme dans un livre)
  const paras = [];
  ch.phrases.forEach((p, i) => { if (i % 5 === 0) paras.push([]); paras[paras.length - 1].push(i); });
  app.innerHTML = `<div class="q-head"><a href="#/roman">← ${esc(ROMAN.titre)}</a><span>Chapitre ${ch.num} / ${ROMAN.chapitres.length}</span></div>
    <article class="rm-page">
      <header class="rm-tete"><small>Chapitre ${ch.num}</small><h2>${esc(ch.titre)}</h2><span class="he" lang="he" dir="rtl">${esc(ch.titreHe)}</span></header>
      <div class="rm-outils">
        <button type="button" class="btn" id="rmLire">▶ Écouter${debut ? ' la suite' : ' le chapitre'}</button>
        <label class="rm-opt"><input type="checkbox" id="rmLent"> 🐢 Plus lent</label>
        <label class="rm-opt"><input type="checkbox" id="rmTout"> Toutes les traductions</label>
      </div>
      <div class="rm-texte" id="rmTexte">${paras.map((ids) => `<p class="rm-para">${ids.map((i) => `<span class="rm-ph" data-i="${i}">${phraseCliquable(ch.phrases[i][0])}<button type="button" class="rm-fr" data-i="${i}" title="Traduction">FR</button><span class="rm-trad" hidden><i>${esc(ch.phrases[i][1])}</i>${esc(ch.phrases[i][2])}</span></span>`).join(' ')}</p>`).join('')}</div>
      <div class="rm-fin">
        <p class="sub">Fin du chapitre ${ch.num}.</p>
        <a class="btn gold" href="#/roman/${ch.num}/quiz">${chapitreReussi(ch.num) ? 'Refaire le quiz' : 'Le quiz du chapitre →'}</a>
        ${chapitreReussi(ch.num) && ROMAN.chapitres.find((c) => c.num === ch.num + 1) ? `<a class="btn ghost" href="#/roman/${ch.num + 1}">Chapitre suivant →</a>` : ''}
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
  // Toucher une phrase en dehors des mots : la lecture repart de là
  texte.querySelectorAll('.rm-ph').forEach((ph) => ph.addEventListener('dblclick', () => { arreter(); lire(+ph.dataset.i); }));
  if (debut) setTimeout(() => surligner(debut), 100);
  // En quittant la page, la lecture s'arrête (route() appelle stopAudio)
  timers.push(setInterval(() => { if (!texte.isConnected) lecture = null; }, 1000));
}

function romanQuiz(ch) {
  const st = etatRoman();
  const file = ch.quiz.map((q) => ({ ...q, ordre: shuffle(q.opts.map((o, j) => j)) }));
  let k = 0, bonnes = 0;
  const montrer = () => {
    if (k >= file.length) return finir();
    const q = file[k];
    app.innerHTML = `<div class="q-head"><a href="#/roman/${ch.num}">← Chapitre ${ch.num}</a><span>📚 Quiz du chapitre ${ch.num}</span><span>${k + 1}/${file.length}</span></div>
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
    const suivant = ROMAN.chapitres.find((c) => c.num === ch.num + 1);
    app.innerHTML = `<div class="card center result"><div class="em">${reussi ? '📖' : '💪'}</div><h2>${reussi ? 'Chapitre compris !' : 'Pas encore…'}</h2>
      <p class="score">${bonnes} / ${file.length}</p>
      <p class="sub">${reussi ? (suivant ? `Le chapitre ${suivant.num} est ouvert${premiere ? ' · +15 XP de bonus' : ''}.` : 'Tu as lu tous les chapitres parus. La suite arrive bientôt !') : `Il faut ${ROMAN_SEUIL} bonnes réponses. Relis le chapitre (avec les traductions si besoin), puis réessaie.`}</p>
      <div class="row" style="justify-content:center">${reussi && suivant ? `<a class="btn gold" href="#/roman/${suivant.num}">Chapitre ${suivant.num} : ${esc(suivant.titre)} →</a>` : `<a class="btn gold" href="#/roman/${ch.num}">Relire le chapitre</a>`}<button class="btn ghost" id="rmRefaire" type="button">Refaire le quiz</button><a class="btn ghost" href="#/roman">Le roman</a></div></div>`;
    $('#rmRefaire').onclick = () => romanQuiz(ch);
  };
  montrer();
}

routes.roman = roman;
if (/^#\/roman/.test(location.hash) && typeof route === 'function') route();
