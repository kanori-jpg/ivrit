/* ============ Mots cliquables : le sens de chaque mot d'une phrase ============
   On cherche dans tout ce que le site connaît déjà (vocabulaire, mots des histoires, gloses des articles,
   de la presse et des familles de mots, GLOSES_HISTOIRES), en reconnaissant les préfixes (וְ, הַ, בְּ, לְ…). */
const PREFIXES_SENS = { 'ו': 'et', 'ה': 'le, la', 'ב': 'dans, à', 'ל': 'à, pour', 'כ': 'comme', 'מ': 'de', 'ש': 'que, qui' };
let INDEX_GLOSES = null;
function indexGloses() {
  if (INDEX_GLOSES) return INDEX_GLOSES;
  const idx = new Map();
  const ajoute = (he, fr, tr, base) => { const k = NFC(he); if (he && fr && !idx.has(k)) idx.set(k, { he, fr, tr: tr || '', base: base || null }); };
  if (typeof GLOSES_HISTOIRES !== 'undefined') Object.entries(GLOSES_HISTOIRES).forEach(([he, [fr, tr]]) => ajoute(he, fr, tr));
  WORDS.forEach((w) => ajoute(w.he, w.fr, w.tr, w.he));
  MOTS_HISTOIRES.forEach((m) => ajoute(m[0], m[2], m[1], m[0]));
  Object.entries(FORMES_HISTOIRES).forEach(([forme, base]) => { const e = idx.get(NFC(base)); if (e) ajoute(forme, e.fr, '', e.he); });
  const gloses = (liste) => liste.forEach((a) => a.sentences.forEach((s) => s.w.forEach(([he, fr]) => ajoute(he.replace(/[״"]/g, ''), fr))));
  if (typeof ARTICLES !== 'undefined') gloses(ARTICLES);
  if (typeof PRESSE !== 'undefined') gloses(PRESSE);
  if (typeof RACINES !== 'undefined') RACINES.forEach((r) => r.mots.forEach(([he, fr]) => ajoute(he, fr)));
  INDEX_GLOSES = idx;
  return idx;
}
function gloseMot(jeton) {
  const t = NFC(jeton.replace(/[^א-ת֑-ׇ]/g, ''));
  if (!t) return null;
  const idx = indexGloses();
  if (idx.has(t)) return { ...idx.get(t), jeton: t };
  const g = t.normalize('NFD').match(/[א-ת][֑-ׇ]*/g) || [];
  for (let p = 1; p <= 3 && g.length - p >= 2; p++) {
    const pre = g.slice(0, p).map((x) => x[0]);
    if (!pre.every((c) => PREFIXES_SENS[c])) break;
    const base = g.slice(p), tete = base[0], reste = base.slice(1).join('');
    const variantes = [tete + reste, tete.replace('ּ', '') + reste, 'בגדכפת'.includes(tete[0]) ? tete[0] + 'ּ' + tete.slice(1) + reste : null].filter(Boolean);
    for (const v of variantes) {
      const e = idx.get(NFC(v));
      if (e) return { ...e, jeton: t, prefixe: pre.map((c) => PREFIXES_SENS[c]).join(' + ') };
    }
  }
  return null;
}
// Une phrase dont chaque mot est un bouton
function phraseCliquable(he) {
  return `<span class="he mots-clic" lang="he" dir="rtl">${he.split(/(\s+)/).map((p) => (/[א-ת]/.test(p) ? `<button type="button" class="mot-clic" data-mot="${esc(p)}">${esc(p)}</button>` : esc(p))).join('')}</span>`;
}
function brancherMotsClic(zone, bulle) {
  zone.querySelectorAll('.mot-clic').forEach((b) => (b.onclick = (e) => {
    e.stopPropagation();
    zone.querySelectorAll('.mot-clic.on').forEach((x) => x.classList.remove('on'));
    b.classList.add('on');
    const g = gloseMot(b.dataset.mot), mot = NFC(b.dataset.mot.replace(/[^א-ת֑-ׇ]/g, ''));
    speak(mot);
    if (!g) { bulle.innerHTML = `<span class="he" lang="he" dir="rtl">${esc(mot)}</span><span class="bulle-fr">Nom propre ou mot pas encore dans le dictionnaire</span>`; bulle.hidden = false; return; }
    const vu = WORDS.find((w) => NFC(w.he) === NFC(g.base || g.he)), appris = vu && S.cards[vu.he];
    bulle.innerHTML = `<span class="he" lang="he" dir="rtl">${esc(mot)}</span>
      <span class="bulle-fr">${g.prefixe ? `<small>${esc(g.prefixe)} + </small>` : ''}<b>${esc(g.fr)}</b>${g.tr ? `<small> · ${esc(g.tr)}</small>` : ''}</span>
      ${g.prefixe ? `<span class="bulle-base">mot de base : <span class="he" lang="he" dir="rtl">${esc(g.he)}</span></span>` : ''}
      ${appris ? '<span class="bulle-etat">✓ dans tes cartes</span>' : ''}`;
    bulle.hidden = false;
  }));
}

// Articles du journal : le sens du mot touché, et un bouton « + » pour l'ajouter à tes mots à apprendre (seulement si tu le touches)
function gloseArticle(b, zone) {
  const he = NFC(b.dataset.he.replace(/[^א-ת֑-ׇ\s־׳]/g, '').trim()), fr = b.dataset.g;
  const g = gloseMot(he);
  const site = WORDS.find((w) => w.theme !== 'mesmots' && (NFC(w.he) === he || (g && g.base && NFC(w.he) === NFC(g.base))));
  const dessiner = () => {
    let etat;
    if (site) etat = `<span class="gl-etat">✓ ${NFC(site.he) === he ? 'déjà' : `<span class="he" lang="he" dir="rtl">${esc(site.he)}</span>`} dans le vocabulaire du site</span>`;
    else if (estDansMesMots(he)) etat = '<span class="gl-etat">⭐ Ajouté à tes mots</span><button type="button" class="gl-annuler">annuler</button>';
    else etat = '<button type="button" class="gl-plus" aria-label="Ajouter ce mot à mes mots à apprendre">＋</button>';
    zone.innerHTML = `<span class="gl-fr">${esc(fr)}</span>${etat}`;
    const plus = zone.querySelector('.gl-plus'), annuler = zone.querySelector('.gl-annuler');
    if (plus) plus.onclick = () => { ajouterMesMots([he, g && NFC(g.he) === he ? g.tr || '' : '', fr]); toast('⭐ Mot ajouté à tes cartes (thème « Mes mots »)'); dessiner(); };
    if (annuler) annuler.onclick = () => { retirerMesMots(he); dessiner(); };
  };
  dessiner();
}
