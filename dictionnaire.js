/* ============ Dictionnaire : tous les mots, de א à ת ============ */
const DICO_ORDRE = 'אבגדהוזחטיכלמנסעפצקרשת';
const DICO_FIN = { 'ך': 'כ', 'ם': 'מ', 'ן': 'נ', 'ף': 'פ', 'ץ': 'צ' };
const dicoCle = (he) => [...strip(he).normalize('NFC')].map((c) => DICO_FIN[c] || c).filter((c) => DICO_ORDRE.includes(c)).join('');
const dicoFrCle = (fr) => fr.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/œ/g, 'oe').replace(/æ/g, 'ae').replace(/^[^a-z0-9]+/, '').replace(/^((le|la|les|un|une|des|du|de la)\s+|l['’])/, '').replace(/^[^a-z0-9]+/, '').trim();
const dicoNorm = (s) => s.normalize('NFD').replace(/[̀-֑ͯ-ׇ]/g, '').toLowerCase();
let dicoEtat = { tous: false, tri: 'he', q: '' };

function dictionnaire() {
  const vus = new Set();
  const mots = WORDS.filter((w) => { const k = w.he.normalize('NFC'); if (vus.has(k)) return false; vus.add(k); return true; });
  const appris = mots.filter((w) => S.cards[w.he]);
  const maitrises = appris.filter((w) => (S.cards[w.he].box || 0) >= 3).length;
  const niveau = (w) => { const c = S.cards[w.he]; if (!c) return ['nv', 'pas encore vu']; if ((c.box || 0) >= 3) return ['ok', 'maîtrisé']; return ['ec', 'en cours']; };
  const theme = (w) => THEMES.find((t) => t.id === w.theme);
  app.innerHTML = `<section class="dico-hero">
    <div><span class="he gr-hero-he" lang="he" dir="rtl">מִלּוֹן</span><h2>Dictionnaire</h2>
    <p>Tous les mots que tu as appris, rangés de א à ת. Touche un mot pour l’écouter.</p>
    <div class="gr-chiffres"><span><b>${appris.length}</b> mot${appris.length > 1 ? 's' : ''} appris</span><span><b>${maitrises}</b> maîtrisé${maitrises > 1 ? 's' : ''}</span><span><b>${mots.length}</b> dans le site</span></div></div>
    <div class="dico-livre" aria-hidden="true"><span class="he" lang="he">א</span><span class="he" lang="he">ת</span></div>
  </section>
  <div class="dico-outils">
    <input type="search" id="dicoQ" class="gr-cherche" placeholder="🔍 Chercher un mot, en français ou en hébreu…" aria-label="Chercher un mot" value="${esc(dicoEtat.q)}">
    <div class="dico-bascules">
      <div class="dico-choix" role="group" aria-label="Quels mots"><button type="button" data-tous="0">Mes mots appris</button><button type="button" data-tous="1">Tout le site</button></div>
      <div class="dico-choix" role="group" aria-label="Ordre"><button type="button" data-tri="he">א → ת</button><button type="button" data-tri="fr">A → Z</button></div>
    </div>
  </div>
  <nav class="dico-saut" id="dicoSaut" aria-label="Aller à une lettre"></nav>
  <div id="dicoListe"></div>`;

  const rendre = () => {
    $$('[data-tous]').forEach((b) => b.classList.toggle('on', (b.dataset.tous === '1') === dicoEtat.tous));
    $$('[data-tri]').forEach((b) => b.classList.toggle('on', b.dataset.tri === dicoEtat.tri));
    const q = dicoNorm(dicoEtat.q.trim());
    let liste = (dicoEtat.tous ? mots : appris).filter((w) => !q || dicoNorm(w.he).includes(q) || dicoNorm(w.fr).includes(q) || dicoNorm(w.tr || '').includes(q));
    const he = dicoEtat.tri === 'he';
    liste = liste.map((w) => ({ w, k: he ? dicoCle(w.he) : dicoFrCle(w.fr) })).sort((a, b) => (he ? (a.k < b.k ? -1 : a.k > b.k ? 1 : 0) : a.k.localeCompare(b.k, 'fr')));
    const groupes = [];
    liste.forEach(({ w, k }) => {
      const l = he ? k[0] || '·' : (k[0] || '·').toUpperCase();
      if (!groupes.length || groupes[groupes.length - 1].l !== l) groupes.push({ l, mots: [] });
      groupes[groupes.length - 1].mots.push(w);
    });
    $('#dicoSaut').innerHTML = groupes.length > 3 ? groupes.map((g, i) => `<a href="#" data-g="${i}" class="${he ? 'he' : ''}"${he ? ' lang="he"' : ''}>${esc(g.l)}</a>`).join('') : '';
    $('#dicoSaut').dir = he ? 'rtl' : 'ltr';
    if (!liste.length) {
      $('#dicoListe').innerHTML = `<div class="card dico-vide"><div class="em">${q ? '🔎' : '📕'}</div>${q ? '<p>Aucun mot ne correspond à ta recherche.</p>' : `<p>Ton dictionnaire est encore vide : les mots s’y ajoutent dès que tu les vois dans les cartes mémoire ou la séance du jour.</p><p><a class="btn gold" href="#/seance">Faire ma séance du jour</a> <button type="button" class="btn ghost" id="dicoTout">Voir tous les mots du site</button></p>`}</div>`;
      if ($('#dicoTout')) $('#dicoTout').onclick = () => { dicoEtat.tous = true; rendre(); };
      return;
    }
    $('#dicoListe').innerHTML = groupes.map((g, i) => `<section class="dico-groupe" id="dicoG${i}">
      <h3 class="dico-lettre${he ? ' he' : ''}"${he ? ' lang="he"' : ''}>${esc(g.l)}<small>${g.mots.length}</small></h3>
      <div class="dico-mots">${g.mots.map((w) => { const [c, t] = niveau(w); const th = theme(w); return `<button type="button" class="dico-mot" data-say="${esc(w.he)}">
        <span class="he" lang="he" dir="rtl">${esc(w.he)}</span>
        <span class="dico-fr"><b>${esc(w.fr)}</b><small>${esc(w.tr || '')}${th ? ` · ${th.emoji} ${esc(th.name)}` : ''}</small></span>
        <span class="dico-niv ${c}" title="${t}"><i></i>${t}</span></button>`; }).join('')}</div></section>`).join('');
  };
  $('#dicoQ').oninput = (e) => { dicoEtat.q = e.target.value; rendre(); };
  $$('[data-tous]').forEach((b) => (b.onclick = () => { dicoEtat.tous = b.dataset.tous === '1'; rendre(); }));
  $$('[data-tri]').forEach((b) => (b.onclick = () => { dicoEtat.tri = b.dataset.tri; rendre(); }));
  $('#dicoSaut').onclick = (e) => {
    const a = e.target.closest('[data-g]'); if (!a) return;
    e.preventDefault();
    const s = $('#dicoG' + a.dataset.g);
    if (s) s.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  };
  if (!appris.length && !dicoEtat.q) dicoEtat.tous = dicoEtat.tous || false;
  rendre();
}
routes.dictionnaire = dictionnaire;
