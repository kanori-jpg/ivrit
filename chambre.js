/* Ma chambre : décorer sa chambre et son personnage avec les objets de la boutique.
   Les dessins sont dans chambre_art.js. */
/* ---------- État enregistré : on ne garde que des valeurs valides ---------- */
const chNum = (v, min, max, defaut) => (typeof v === 'number' && isFinite(v) ? Math.min(max, Math.max(min, v)) : defaut);
const chPossede = (id) => S.deco.includes(id);
function chPose(o, d) { return { x: chNum(o && o.x, 10, CH_LARGE - 10, d.x), y: chNum(o && o.y, 20, CH_HAUT - 5, d.y), e: chNum(o && o.e, .5, 2, d.e || 1), m: !!(o && o.m) }; }
function chEtat() {
  const c = S.chambre && typeof S.chambre === 'object' ? S.chambre : {};
  const premiere = !c.init;
  const objets = {};
  Object.entries(c.objets && typeof c.objets === 'object' ? c.objets : {}).forEach(([id, o]) => { if (CH_OBJETS[id]) objets[id] = chPose(c.v === 2 ? o : o && { e: o.e, m: o.m }, CH_OBJETS[id]); });
  // À la première visite, ce qui a déjà été acheté est installé dans la chambre
  if (premiere) S.deco.forEach((id) => { if (CH_OBJETS[id]) objets[id] = chPose(null, CH_OBJETS[id]); });
  S.chambre = {
    init: true,
    v: 2,
    mur: CH_MURS[c.mur] && (c.mur === 'lilas' || chPossede(c.mur)) ? c.mur : 'lilas',
    sol: CH_SOLS[c.sol] && (c.sol === 'bois' || chPossede(c.sol)) ? c.sol : 'bois',
    objets,
    moi: chPose(c.v === 2 ? c.moi : c.moi && { m: c.moi.m }, { x: 430, y: 496 }),
  };
  const p = S.perso && typeof S.perso === 'object' ? S.perso : {};
  const porte = (v, table) => (table[v] && chPossede(v) ? v : '');
  S.perso = {
    peau: CH_PEAUX.includes(p.peau) ? p.peau : CH_PERSO_DEFAUT.peau,
    cheveux: CH_CHEVEUX.includes(p.cheveux) || (CH_TEINTES[p.cheveux] && chPossede(p.cheveux)) ? p.cheveux : CH_PERSO_DEFAUT.cheveux,
    coiffure: CH_COIFFURES[p.coiffure] || (CH_COIFFURES_ACHAT[p.coiffure] && chPossede(p.coiffure)) ? p.coiffure : CH_PERSO_DEFAUT.coiffure,
    pose: porte(p.pose, CH_POSES), main: porte(p.main, CH_MAINS), tenue: porte(p.tenue, CH_TENUES), tete: porte(p.tete, CH_ACCESSOIRES), yeux: porte(p.yeux, CH_ACCESSOIRES), cou: porte(p.cou, CH_ACCESSOIRES), dos: porte(p.dos, CH_ACCESSOIRES),
  };
  if (premiere || c.v !== 2) save();
}

function chNoeud(id, pose, nom, contenu, sel) {
  return `<g class="ch-o${sel === id ? ' sel' : ''}" data-o="${id}" tabindex="0" role="button" aria-label="${nom}" transform="translate(${pose.x} ${pose.y}) scale(${(pose.m ? -1 : 1) * pose.e} ${pose.e})">${contenu}</g>`;
}
const chNomObjet = (id) => (id === 'moi' ? 'Ton personnage' : (SHOP.find((i) => i.id === id) || {}).name || id);

/* ---------- La page ---------- */
function chambre(mode, idEssai) {
  chEtat();
  let onglet = mode === 'boutique' ? 'boutique' : 'objets', sel = null, essai = null, confirme = null;
  // Arrivée depuis la boutique : on essaie l'article avant de l'acheter
  const aEssayer = mode === 'essai' && SHOP.find((i) => i.id === idEssai && i.kind !== 'objet' && !chPossede(i.id));
  if (aEssayer) { essai = aEssayer.id; onglet = aEssayer.kind === 'deco' ? 'objets' : aEssayer.kind === 'decor' ? 'decor' : 'perso'; }
  if (mode) history.replaceState(null, '', '#/chambre');
  app.innerHTML = `<h2>Ma chambre</h2><p class="sub">Fais glisser les objets et ton personnage où tu veux. Clique sur un objet pour le grandir, le retourner ou le ranger.</p>
    <div class="ch-page">
      <div class="ch-gauche">
        <div class="ch-essai" id="chEssai" aria-live="polite" hidden></div>
        <div class="ch-cadre"><svg id="chSvg" viewBox="0 0 ${CH_LARGE} ${CH_HAUT}" role="group" aria-label="Ta chambre"></svg></div>
        <div class="ch-barre" id="chBarre" aria-live="polite"></div>
      </div>
      <div class="card ch-panneau">
        <div class="ch-onglets" role="tablist">${[['objets', 'Objets'], ['decor', 'Murs et sols'], ['perso', 'Personnage'], ['boutique', '🛍️ Boutique']].map(([id, nom]) => `<button type="button" role="tab" data-onglet="${id}">${nom}</button>`).join('')}</div>
        <p class="hint ch-solde">Tu as <b id="chSh"></b></p>
        <div id="chListe"></div>
      </div>
    </div>`;
  const svg = $('#chSvg'), barre = $('#chBarre'), liste = $('#chListe'), bandeau = $('#chEssai');

  const poseDe = (id) => (id === 'moi' ? S.chambre.moi : S.chambre.objets[id]);
  const transforme = (id) => { const p = poseDe(id); return `translate(${p.x} ${p.y}) scale(${(p.m ? -1 : 1) * p.e} ${p.e})`; };
  const noeud = (id) => svg.querySelector(`[data-o="${id}"]`);

  function dessine() {
    const actif = document.activeElement && document.activeElement.getAttribute && document.activeElement.getAttribute('data-o');
    const it = essai && SHOP.find((i) => i.id === essai);
    if (it) {
      // Aperçu : on applique l'article le temps de dessiner, puis on remet l'état tel quel (rien n'est enregistré)
      const chambreAvant = JSON.parse(JSON.stringify(S.chambre)), persoAvant = Object.assign({}, S.perso), selAvant = sel;
      applique(it);
      svg.innerHTML = chScene(it.kind === 'deco' ? it.id : sel);
      S.chambre = chambreAvant; S.perso = persoAvant; sel = selAvant;
    } else svg.innerHTML = chScene(sel);
    if (actif && noeud(actif)) noeud(actif).focus({ preventScroll: true });
  }
  function dessineBarre() {
    if (!sel || !poseDe(sel)) { barre.innerHTML = '<span class="hint">Clique sur un objet de la chambre pour le modifier.</span>'; return; }
    barre.innerHTML = `<b>${esc(chNomObjet(sel))}</b>
      <button type="button" class="btn ghost" data-act="moins" aria-label="Rétrécir">−</button>
      <button type="button" class="btn ghost" data-act="plus" aria-label="Agrandir">+</button>
      <button type="button" class="btn ghost" data-act="miroir">Retourner</button>
      ${sel === 'moi' ? '' : '<button type="button" class="btn ghost" data-act="ranger">Ranger</button>'}`;
  }
  function dessineEssai() {
    const it = essai && SHOP.find((i) => i.id === essai);
    bandeau.hidden = !it;
    if (!it) { bandeau.innerHTML = ''; return; }
    const manque = it.price - S.sh;
    bandeau.innerHTML = `<span class="ch-essai-em">${it.em}</span><span class="ch-essai-txt"><b>Essai : ${esc(it.name)}</b><small>${manque > 0 ? `Il te manque ${manque} ₪ : continue à apprendre !` : `Tu as ₪ ${S.sh}. Il t’en restera ${S.sh - it.price}.`}</small></span>
      <button type="button" class="btn gold" data-essai="acheter" ${manque > 0 ? 'disabled' : ''}>Acheter pour ${it.price} ₪</button><button type="button" class="btn ghost" data-essai="annuler">Annuler</button>`;
  }
  const finEssai = () => { essai = null; dessine(); dessineEssai(); dessineListe(); };
  function choisit(id) {
    sel = id;
    svg.querySelectorAll('.ch-o').forEach((n) => n.classList.toggle('sel', n.getAttribute('data-o') === id));
    dessineBarre();
  }

  /* Tuiles du panneau */
  const prix = (it) => `<span class="ch-prix ${S.sh >= it.price ? '' : 'trop'}">${it.price} ₪</span>`;
  const tuile = (it, attr, actif, etat) => {
    const a = chPossede(it.id);
    return `<button type="button" class="ch-tuile${actif ? ' on' : ''}${a ? '' : ' verrou'}${essai === it.id ? ' essai' : ''}" ${a ? attr : `data-achat="${it.id}"`}><span class="ch-em">${it.em}</span><span class="ch-nom">${esc(it.name)}</span>${a ? `<small>${etat}</small>` : prix(it)}</button>`;
  };
  const gratuite = (nom, attr, actif, apercu) => `<button type="button" class="ch-tuile${actif ? ' on' : ''}" ${attr}><span class="ch-em">${apercu}</span><span class="ch-nom">${esc(nom)}</span><small>${actif ? 'Choisi' : 'Gratuit'}</small></button>`;

  function dessineListe() {
    $('#chSh').textContent = `₪ ${S.sh}`;
    $$('.ch-onglets button').forEach((b) => { const on = b.dataset.onglet === onglet; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); });
    if (onglet === 'boutique') {
      const boost = Math.ceil((S.boostUntil - Date.now()) / 60000);
      liste.innerHTML = `<p class="hint ch-bout-intro">Les décorations, murs, sols et tenues s’achètent dans les autres onglets : touche un objet 🔒 pour l’essayer avant de l’acheter. Ici, les objets qui t’aident à apprendre.</p>
        <div class="ch-utiles">${SHOP.filter((i) => i.kind === 'objet').map((it) => {
          const plein = it.id === 'gel' && S.freezes >= 3, actif = it.id === 'boost' && boost > 0;
          const info = it.id === 'gel' ? `Tu en as ${S.freezes} (3 max)` : it.id === 'joker' ? `Tu en as ${S.jokers}` : actif ? `Actif encore ${boost} min` : '';
          return `<div class="ch-utile"><span class="ch-em">${it.em}</span><span class="ch-utile-txt"><b>${esc(it.name)}</b><small>${esc(it.desc)}</small>${info ? `<small class="ch-utile-info">${info}</small>` : ''}</span>
            <button type="button" class="btn ${S.sh >= it.price && !plein && !actif ? 'gold' : 'ghost'}${confirme === it.id ? ' confirme' : ''}" data-utile="${it.id}" ${plein || actif ? 'disabled' : ''}>${confirme === it.id ? `Confirmer ${it.price} ₪ ?` : `${it.price} ₪`}</button></div>`;
        }).join('')}</div>`;
    } else if (onglet === 'objets') {
      const items = SHOP.filter((i) => i.kind === 'deco' && CH_OBJETS[i.id]);
      liste.innerHTML = `<div class="ch-tuiles">${items.map((it) => { const pose = !!S.chambre.objets[it.id]; return tuile(it, `data-poser="${it.id}"`, pose, pose ? 'Dans la chambre' : 'À placer'); }).join('')}</div>`;
    } else if (onglet === 'decor') {
      const bloc = (titre, table, cle, base, baseEm) => `<h4 class="ch-titre">${titre}</h4><div class="ch-tuiles">${gratuite(table[base].nom, `data-${cle}="${base}"`, S.chambre[cle] === base, baseEm)}${SHOP.filter((i) => i.kind === 'decor' && table[i.id]).map((it) => tuile(it, `data-${cle}="${it.id}"`, S.chambre[cle] === it.id, S.chambre[cle] === it.id ? 'Choisi' : 'À toi')).join('')}</div>`;
      liste.innerHTML = bloc('Murs', CH_MURS, 'mur', 'lilas', '🟪') + bloc('Sols', CH_SOLS, 'sol', 'bois', '🟫');
    } else {
      const p = S.perso, aVendre = (place) => SHOP.filter((i) => i.kind === 'perso' && i.place === place);
      const rond = (cle, c) => `<button type="button" class="ch-rond${p[cle] === c ? ' on' : ''}" style="background:${c}" data-couleur="${cle}" data-val="${c}" aria-label="Couleur ${c}"></button>`;
      liste.innerHTML = `<h4 class="ch-titre">Peau</h4><div class="ch-ronds">${CH_PEAUX.map((c) => rond('peau', c)).join('')}</div>
        <h4 class="ch-titre">Cheveux</h4><div class="ch-ronds">${CH_CHEVEUX.map((c) => rond('cheveux', c)).join('')}${aVendre('cheveux').map((it) => chPossede(it.id)
          ? `<button type="button" class="ch-rond${p.cheveux === it.id ? ' on' : ''}" style="background:${CH_TEINTES[it.id].css}" data-couleur="cheveux" data-val="${it.id}" title="${esc(it.name)}" aria-label="${esc(it.name)}"></button>`
          : `<button type="button" class="ch-rond verrou${essai === it.id ? ' essai' : ''}" style="background:${CH_TEINTES[it.id].css}" data-achat="${it.id}" title="${esc(it.name)} : ${it.price} ₪" aria-label="Essayer ${esc(it.name)}, ${it.price} shekels"><span>${it.price}</span></button>`).join('')}</div>
        <div class="ch-pilules">${Object.entries(CH_COIFFURES).map(([id, nom]) => `<button type="button" class="${p.coiffure === id ? 'on' : ''}" data-coiffure="${id}">${nom}</button>`).join('')}${aVendre('coiffure').map((it) => chPossede(it.id)
          ? `<button type="button" class="${p.coiffure === it.id ? 'on' : ''}" data-coiffure="${it.id}">${esc(it.name)}</button>`
          : `<button type="button" class="verrou${essai === it.id ? ' essai' : ''}" data-achat="${it.id}">🔒 ${esc(it.name)} · ${it.price} ₪</button>`).join('')}</div>
        ${Object.entries(CH_EMPLACEMENTS).map(([cle, titre]) => `<h4 class="ch-titre">${titre}</h4><div class="ch-tuiles">${cle === 'tenue' ? gratuite('T-shirt et jean', 'data-porter="tenue" data-val=""', !p.tenue, '👕') : cle === 'pose' ? gratuite('Debout', 'data-porter="pose" data-val=""', !p.pose, '🧍') : ''}${SHOP.filter((i) => i.kind === 'perso' && i.place === cle).map((it) => tuile(it, `data-porter="${cle}" data-val="${it.id}"`, p[cle] === it.id, p[cle] === it.id ? 'Porté' : 'À toi')).join('')}</div>`).join('')}`;
    }
  }
  function applique(it) {
    if (it.kind === 'deco') { S.chambre.objets[it.id] = chPose(null, CH_OBJETS[it.id]); sel = it.id; }
    else if (it.kind === 'decor') S.chambre[CH_MURS[it.id] ? 'mur' : 'sol'] = it.id;
    else if (it.kind === 'perso') S.perso[it.place] = it.id;
  }
  const majTout = () => { save(); dessine(); dessineBarre(); dessineListe(); };

  liste.onclick = (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    const d = b.dataset;
    if (d.achat) {
      const it = SHOP.find((i) => i.id === d.achat);
      if (!it || chPossede(it.id)) return;
      essai = essai === it.id ? null : it.id;
      dessine(); dessineEssai(); dessineListe();
      if (essai) bandeau.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      return;
    }
    if (d.utile) {
      const it = SHOP.find((i) => i.id === d.utile);
      if (!it) return;
      if (S.sh < it.price) return toast(`Il te manque ${it.price - S.sh} ₪ : continue à apprendre !`);
      if (confirme !== it.id) { confirme = it.id; dessineListe(); return; }
      confirme = null; S.sh -= it.price;
      if (it.id === 'gel') S.freezes++;
      else if (it.id === 'joker') S.jokers++;
      else if (it.id === 'boost') S.boostUntil = Date.now() + 30 * 60000;
      save(); header(); toast(`${it.em} ${it.name} : acheté !`); dessineListe();
      return;
    }
    essai = null; dessineEssai();
    if (d.poser) {
      if (S.chambre.objets[d.poser]) { delete S.chambre.objets[d.poser]; if (sel === d.poser) sel = null; }
      else { S.chambre.objets[d.poser] = chPose(null, CH_OBJETS[d.poser]); sel = d.poser; }
    } else if (d.mur) S.chambre.mur = d.mur;
    else if (d.sol) S.chambre.sol = d.sol;
    else if (d.couleur) S.perso[d.couleur] = d.val;
    else if (d.coiffure) S.perso.coiffure = d.coiffure;
    else if (d.porter) S.perso[d.porter] = S.perso[d.porter] === d.val ? '' : d.val;
    else return;
    majTout();
  };
  bandeau.onclick = (e) => {
    const b = e.target.closest('[data-essai]');
    if (!b) return;
    const it = essai && SHOP.find((i) => i.id === essai);
    if (b.dataset.essai === 'annuler' || !it) return finEssai();
    if (chPossede(it.id)) return finEssai();
    if (S.sh < it.price) return toast(`Il te manque ${it.price - S.sh} ₪ : continue à apprendre !`);
    S.sh -= it.price; S.deco.push(it.id); applique(it); header();
    essai = null; dessineEssai();
    toast(`${it.em} ${it.name} : acheté !`);
    majTout();
  };
  $('.ch-onglets').onclick = (e) => { const b = e.target.closest('[data-onglet]'); if (b) { onglet = b.dataset.onglet; confirme = null; dessineListe(); } };
  barre.onclick = (e) => {
    const b = e.target.closest('[data-act]');
    if (!b || !sel) return;
    const p = poseDe(sel), a = b.dataset.act;
    if (a === 'plus') p.e = Math.min(2, +(p.e + .15).toFixed(2));
    if (a === 'moins') p.e = Math.max(.5, +(p.e - .15).toFixed(2));
    if (a === 'miroir') p.m = !p.m;
    if (a === 'ranger') { delete S.chambre.objets[sel]; sel = null; }
    majTout();
  };

  /* Glisser-déposer, à la souris comme au doigt */
  let prise = null;
  const pointSvg = (e) => { const m = svg.getScreenCTM().inverse(); return { x: m.a * e.clientX + m.c * e.clientY + m.e, y: m.b * e.clientX + m.d * e.clientY + m.f }; };
  svg.addEventListener('pointerdown', (e) => {
    const n = e.target.closest('.ch-o');
    if (!n) return choisit(null);
    const id = n.getAttribute('data-o'), pt = pointSvg(e), p = poseDe(id);
    if (!p) return;
    choisit(id);
    prise = { id, dx: p.x - pt.x, dy: p.y - pt.y, bouge: false, pointeur: e.pointerId };
    svg.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  svg.addEventListener('pointermove', (e) => {
    if (!prise || e.pointerId !== prise.pointeur) return;
    const pt = pointSvg(e), p = poseDe(prise.id);
    p.x = chNum(pt.x + prise.dx, 10, CH_LARGE - 10, p.x); p.y = chNum(pt.y + prise.dy, 20, CH_HAUT - 5, p.y);
    prise.bouge = true;
    noeud(prise.id).setAttribute('transform', transforme(prise.id));
  });
  const lache = (e) => {
    if (!prise || e.pointerId !== prise.pointeur) return;
    const bouge = prise.bouge;
    prise = null;
    if (bouge) { save(); dessine(); }
  };
  svg.addEventListener('pointerup', lache);
  svg.addEventListener('pointercancel', lache);
  svg.addEventListener('focusin', (e) => { const n = e.target.closest('.ch-o'); if (n && n.getAttribute('data-o') !== sel) choisit(n.getAttribute('data-o')); });
  keyHandler = (e) => {
    if (e.key === 'Escape' && essai) return finEssai();
    const dep = { ArrowLeft: [-10, 0], ArrowRight: [10, 0], ArrowUp: [0, -10], ArrowDown: [0, 10] }[e.key];
    if (!dep || !sel || !document.activeElement || !document.activeElement.closest || !document.activeElement.closest('#chSvg')) return;
    e.preventDefault();
    const p = poseDe(sel);
    p.x = chNum(p.x + dep[0], 10, CH_LARGE - 10, p.x); p.y = chNum(p.y + dep[1], 20, CH_HAUT - 5, p.y);
    save(); dessine();
  };

  dessine(); dessineBarre(); dessineListe(); dessineEssai();
}
routes.chambre = chambre;
