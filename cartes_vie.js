'use strict';
/* Cartes postales des histoires de la vie de tous les jours : un décor de scène, les objets de l'histoire, le lieu en hébreu. */
const CARTES_VIE = {
  supermarche: { lieu: 'Au supermarché', he: 'בַּסּוּפֶּרְמַרְקֶט', decor: 'marche', objets: [['pain', 300, 470, 1.200], ['lait', 420, 470, 1.200], ['pomme', 530, 485, 1.100]] },
  boulangerie: { lieu: 'À la boulangerie', he: 'בַּמַּאֲפִיָּה', decor: 'petitdej', objets: [['pain', 330, 470, 1.400], ['gateau', 490, 470, 1.200]] },
  restaurant: { lieu: 'Au restaurant', he: 'בַּמִּסְעָדָה', decor: 'resto', objets: [['assiette', 360, 470, 1.300], ['verre', 490, 465, 1.200]] },
  livraison: { lieu: 'À la maison', he: 'בַּבַּיִת', decor: 'salon', objets: [['telephone', 360, 470, 1.300], ['pita', 490, 475, 1.200]] },
  bus: { lieu: 'Dans le bus', he: 'בָּאוֹטוֹבּוּס', decor: 'arretbus', objets: [['bus', 400, 450, 1.400]] },
  taxi: { lieu: 'En taxi', he: 'בַּמּוֹנִית', decor: 'ville', objets: [['taxi', 400, 470, 1.400]] },
  train: { lieu: 'À la gare', he: 'בְּתַחֲנַת הָרַכֶּבֶת', decor: 'gare', objets: [['train', 380, 450, 1.300], ['billet', 570, 485, 1.100]] },
  aeroport: { lieu: 'À l’aéroport', he: 'בִּנְמַל הַתְּעוּפָה', decor: 'aeroport', objets: [['avion', 420, 280, 1.300], ['passeport', 330, 480, 1.200], ['billet', 470, 485, 1.100]] },
  appartement: { lieu: 'Le nouvel appartement', he: 'דִּירָה חֲדָשָׁה', decor: 'salon', objets: [['porte', 480, 430, 1], ['cle', 360, 475, 1.300]] },
  panne: { lieu: 'Dans la cuisine', he: 'בַּמִּטְבָּח', decor: 'cuisine', objets: [['eau', 380, 470, 1.300], ['verre', 490, 470, 1.100]] },
  voisine: { lieu: 'Dans l’immeuble', he: 'בַּבִּנְיָן', decor: 'ville', objets: [['porte', 360, 440, 1.100], ['gateau', 490, 485, 1.100]] },
  hotel: { lieu: 'À l’hôtel', he: 'בַּמָּלוֹן', decor: 'ville', objets: [['hotel', 400, 400, 1.700], ['cle', 570, 495, 1.200]] },
  pharmacie: { lieu: 'À la pharmacie', he: 'בְּבֵית הַמִּרְקַחַת', decor: 'medecin', objets: [['medecin', 400, 470, 1.800]] },
  rendezvous: { lieu: 'À la clinique', he: 'בַּמִּרְפָּאָה', decor: 'medecin', objets: [['telephone', 340, 475, 1.500], ['horloge', 490, 410, 1.400]] },
  dentiste: { lieu: 'Chez le dentiste', he: 'אֵצֶל רוֹפֵא הַשִּׁנַּיִם', decor: 'medecin', objets: [['medecin', 400, 470, 1.800]] },
  banque: { lieu: 'À la banque', he: 'בַּבַּנְק', decor: 'ville', objets: [['banque', 400, 420, 1.200], ['argent', 560, 490, 1.100]] },
  poste: { lieu: 'À la poste', he: 'בַּדֹּאַר', decor: 'ville', objets: [['boutique', 440, 410, 1.400], ['journal', 300, 485, 1.200]] },
  telephone: { lieu: 'Au magasin', he: 'בַּחֲנוּת', decor: 'ville', objets: [['boutique', 400, 420, 1.100], ['telephone', 560, 485, 1.200]] },
  oulpan: { lieu: 'À l’oulpan', he: 'בָּאוּלְפָּן', decor: 'classe', objets: [['cahier', 360, 470, 1.200], ['stylo', 480, 470, 1.200]] },
  entretien: { lieu: 'L’entretien d’embauche', he: 'רֵאָיוֹן עֲבוֹדָה', decor: 'bureau', objets: [['ordinateur', 400, 460, 1.200]] },
  collegue: { lieu: 'Au bureau', he: 'בַּמִּשְׂרָד', decor: 'bureau', objets: [['ordinateur', 360, 460, 1.200], ['cafe', 500, 470, 1.100]] },
  cours: { lieu: 'En classe', he: 'בַּכִּתָּה', decor: 'classe', objets: [['livre', 360, 470, 1.200], ['crayon', 480, 470, 1.200]] },
  shabbat: { lieu: 'Le dîner de shabbat', he: 'אֲרוּחַת שַׁבָּת', decor: 'cuisine', objets: [['bougie', 320, 460, 1.300], ['pain', 420, 470, 1.200], ['bougie', 530, 460, 1.300]] },
  anniversaire: { lieu: 'Un anniversaire', he: 'יוֹם הֻלֶּדֶת', decor: 'salon', objets: [['gateau', 400, 470, 1.500]] },
  sortie: { lieu: 'En ville', he: 'בָּעִיר', decor: 'cafeville', objets: [['billet', 400, 485, 1.300]] },
  appel: { lieu: 'Au téléphone', he: 'בַּטֶּלֶפוֹן', decor: 'nuit', objets: [['telephone', 400, 475, 1.300]] },
  vetements: { lieu: 'Boutique de mode', he: 'בַּחֲנוּת בְּגָדִים', decor: 'dressing', objets: [['robe', 340, 445, 1.500], ['chemise', 500, 445, 1.500]] },
  coiffeur: { lieu: 'Chez le coiffeur', he: 'בַּמִּסְפָּרָה', decor: 'dressing', objets: [['chaise', 400, 470, 1.600], ['lunettes', 540, 490, 1.200]] },
  ecole: { lieu: 'À l’école', he: 'בְּבֵית הַסֵּפֶר', decor: 'classe', objets: [['cahier', 360, 470, 1.200], ['crayon', 480, 470, 1.200]] },
  perdu: { lieu: 'Au commissariat', he: 'בַּמִּשְׁטָרָה', decor: 'ville', objets: [['argent', 340, 485, 1.400], ['passeport', 480, 480, 1.400]] },
};

// L'illustration d'une carte : le décor de scène, les objets, et un voile en haut pour lire le titre
function decorVie(id, classe = '') {
  const c = CARTES_VIE[id];
  if (!c || !DECORS_SCENE[c.decor]) return '';
  const u = 'pv' + id + classe.replace(/\W/g, '');
  const objets = c.objets.filter(([art]) => OBJ[art]).map(([art, x, y, s]) => `<g transform="translate(${x} ${y}) scale(${s})">${OBJ[art]()}</g>`).join('');
  return `<svg class="${classe}" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><radialGradient id="gSol"><stop offset="0" stop-color="#fff7cf"/><stop offset="1" stop-color="#ffc66b"/></radialGradient><filter id="gFlou"><feGaussianBlur stdDeviation="6"/></filter><linearGradient id="${u}voile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c1430" stop-opacity=".45"/><stop offset=".45" stop-color="#1c1430" stop-opacity="0"/></linearGradient></defs>${DECORS_SCENE[c.decor](u)}${objets}<rect width="800" height="600" fill="url(#${u}voile)"/></svg>`;
}

function petiteCarteVie(st) {
  const c = CARTES_VIE[st.id], date = S.postcards[st.id];
  if (!c) return '';
  if (!date) return `<div class="pc lock" style="background:#6b5d8f"><span class="pc-timbre">${st.emoji}</span><b>${esc(c.lieu)}</b><small>🔒 ${esc(st.title)}</small></div>`;
  return `<a class="pc" href="#/carte/${st.id}">${decorVie(st.id, 'pc-img')}<span class="pc-timbre">${st.emoji}</span><span class="pc-h">♥</span><b>${esc(c.lieu)}</b><small>${dateFr(date)}</small></a>`;
}

function carteVie(id) {
  const st = STORIES_VIE.find((s) => s.id === id), c = CARTES_VIE[id];
  if (!st || !c || !S.postcards[id]) { location.hash = '#/histoire'; return; }
  const date = new Date(S.postcards[id] + 'T00:00');
  const gagnees = VILLES.flatMap((v) => v.histoires).map((h) => STORIES_VIE.find((s) => s.id === h)).filter((s) => s && S.postcards[s.id]), i = gagnees.indexOf(st), prev = gagnees[i - 1], next = gagnees[i + 1];
  app.innerHTML = `<div class="q-head"><a href="#/histoire">← Mes histoires</a><span>💌 Carte postale</span></div>
  <div class="postcard">
    <div class="pg-photo">${decorVie(id, 'pg-img')}<div class="pg-title"><h2>${esc(c.lieu)}</h2><span class="he" lang="he" dir="rtl">${esc(c.he)}</span></div>
      <div class="pg-timbre">${st.emoji}</div>
      <div class="pg-date"><b>${date.getDate()}</b><span>${date.toLocaleDateString('fr-FR', { month: 'long' })}<br>${date.getFullYear()}</span></div></div>
    <div class="pg-side">
      <p class="cap">Souvenir de</p><h3>${esc(st.title)}</h3><p class="sub">${villeDe(id) ? `Chapitre ${villeDe(id).num} · ${esc(villeDe(id).lieu)}` : esc(st.cat)} · avec ${esc(st.who.replace(/^(L’|La |Le )/, (m) => m.toLowerCase()))}.</p>
      <p class="cap">Mots de l’histoire</p>
      <div class="pg-mots">${(st.mots || []).map(([he, , fr]) => `<button data-say="${esc(he)}"><span class="he" lang="he" dir="rtl">${esc(he)}</span><small>${esc(fr)}</small></button>`).join('')}</div>
      <div class="row mt"><a class="btn ghost" href="#/histoire/${st.id}/jouer">↻ Rejouer l’histoire</a></div>
      <div class="row mt">${prev ? `<a class="btn ghost" href="#/carte/${prev.id}">← ${esc(CARTES_VIE[prev.id].lieu)}</a>` : ''}${next ? `<a class="btn" href="#/carte/${next.id}">${esc(CARTES_VIE[next.id].lieu)} →</a>` : ''}</div>
    </div>
  </div>`;
}
