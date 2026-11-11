'use strict';
/* Chapitres 12 à 15 : quatre nouvelles villes, cinq histoires chacune. */
VILLES.push(
  { id: 'vhaifa', num: 12, lieu: 'Haïfa', he: 'חֵיפָה', theme: 'Les services du quartier', devise: 'Là où la montagne descend jusqu’à la mer',
    pal: { d: '#2f5a44', p: '#dcefe0', t: '#eef8f0', i: '#244a38' }, ridge: 'collines', sil: 'cypres',
    poeme: ['Sur les pentes du Carmel, les jardins descendent vers la mer.', 'On y monte des escaliers, on y règle mille petites choses,', 'et chaque service rendu se dit <span class="he">תּוֹדָה רַבָּה</span>.'],
    note: 'Bibliothèque, vétérinaire, réparateur, serrurier, salle de sport : à Haïfa, tu apprends à te débrouiller dans ton nouveau quartier.',
    mots: [['כַּרְמֶל', 'le mont Carmel'], ['גַּן', 'jardin'], ['מַדְרֵגוֹת', 'escaliers'], ['שְׁכוּנָה', 'quartier']],
    histoires: ['bibliotheque', 'veterinaire', 'reparation', 'serrurier', 'salledesport'] },
  { id: 'vjerusalem', num: 13, lieu: 'Jérusalem', he: 'יְרוּשָׁלַיִם', theme: 'Culture et découvertes', devise: 'Là où chaque pierre raconte une histoire',
    pal: { d: '#7a5a2a', p: '#f6e8c8', t: '#fff6e2', i: '#5e4420' }, ridge: 'remparts', sil: 'porte',
    poeme: ['La pierre dorée garde des siècles d’histoire.', 'Entre le musée et le marché, on flâne sans compter les heures,', 'et le soir, la ville devient <span class="he">שֶׁל זָהָב</span>, « d’or ».'],
    note: 'Musée, cinéma, marché aux épices, librairie, visite de la vieille ville : à Jérusalem, chaque sortie est une découverte.',
    mots: [['אֶבֶן', 'pierre'], ['חוֹמָה', 'rempart'], ['שׁוּק', 'marché'], ['זָהָב', 'or']],
    histoires: ['musee', 'cinema', 'epices', 'librairie', 'visite'] },
  { id: 'vjaffa', num: 14, lieu: 'Jaffa', he: 'יָפוֹ', theme: 'Les loisirs', devise: 'Là où le vieux port prend son temps',
    pal: { d: '#2a5f6e', p: '#f9e3d6', t: '#fff2ea', i: '#22505c' }, ridge: 'vagues', sil: 'horloge',
    poeme: ['Le vieux port regarde Tel-Aviv au loin.', 'Plage, vélo, concert : ici, les journées sont légères,', 'et l’on se souhaite <span class="he">תֵּהָנִי!</span>, « profite ! ».'],
    note: 'Plage, balade à vélo, concert, match de foot, pique-nique : à Jaffa, tu apprends l’hébreu des week-ends.',
    mots: [['נָמָל', 'port'], ['חוֹף', 'plage'], ['גַּל', 'vague'], ['שְׁקִיעָה', 'coucher de soleil']],
    histoires: ['plage', 'velo', 'concert', 'match', 'piquenique'] },
  { id: 'vmitspe', num: 15, lieu: 'Mitspé Ramon', he: 'מִצְפֵּה רָמוֹן', theme: 'La nature', devise: 'Là où le ciel est le plus noir',
    pal: { d: '#4a2f5e', p: '#ead8e8', t: '#f6ecf4', i: '#3a2450' }, ridge: 'montagnes', sil: 'telescope',
    poeme: ['Au bord du grand cratère, le désert se tait.', 'Le jour, on marche entre les rochers ; la nuit, on compte les étoiles,', 'et l’on murmure : <span class="he">אֵיזֶה שֶׁקֶט</span>, « quel calme ».'],
    note: 'Camping, randonnée dans le cratère, nuit des étoiles, pluie dans le désert, kibboutz : le chapitre de la nature, au cœur du Néguev.',
    mots: [['מַכְתֵּשׁ', 'cratère'], ['מִדְבָּר', 'désert'], ['כּוֹכָב', 'étoile'], ['יָעֵל', 'bouquetin']],
    histoires: ['camping', 'cratere', 'etoiles', 'meteo', 'kibboutz'] },
);

/* Décors des nouvelles villes (cadre 380 × 640) */
Object.assign(DECORS, {
  vhaifa: (u) => { const r = aleaChap(81);
    const pente = (y) => 380 - ((y - 170) * 270) / 260;
    let terrasses = ''; for (let y = 230; y < 430; y += 26) { const x = pente(y); terrasses += `<path d="M${x.toFixed(0)} ${y} H380 V${y + 12} H${(x + 8).toFixed(0)}Z" fill="#a8d48e"/><path d="M${(x + 14).toFixed(0)} ${y + 4} H380" stroke="#f4e9c8" stroke-width="1.500" opacity=".7"/>`; }
    let cypres = ''; for (let i = 0; i < 12; i++) { const y = 220 + r() * 200, x = pente(y) + 10 + r() * (380 - pente(y) - 20); cypres += `<path d="M${x.toFixed(0)} ${(y + 4).toFixed(0)} q-6-16 0-34 q6 18 0 34z" fill="#2f5a3a"/>`; }
    let maisons = ''; for (let i = 0; i < 9; i++) { const x = r() * 140, y = 395 + r() * 30, w = 16 + r() * 18; maisons += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${(440 - y).toFixed(0)}" fill="${['#f6efe2', '#efe2cc', '#e8d6bc'][i % 3]}"/><rect x="${x.toFixed(0)}" y="${(y - 5).toFixed(0)}" width="${w.toFixed(0)}" height="6" fill="#d9825a"/>`; }
    return `<defs><linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#86b8dc"/><stop offset=".6" stop-color="#f6dcc0"/></linearGradient><linearGradient id="${u}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc0d4"/><stop offset="1" stop-color="#2c6a88"/></linearGradient></defs>
    <rect width="380" height="640" fill="url(#${u}s)"/><circle cx="90" cy="130" r="56" fill="#fff6dc" opacity=".35"/><circle cx="90" cy="130" r="26" fill="#fff6dc"/>
    <path d="M20 90q6-6 12 0q6-6 12 0M150 60q5-5 10 0q5-5 10 0" stroke="#4a6a7a" stroke-width="2" fill="none"/>
    <rect y="440" width="380" height="200" fill="url(#${u}m)"/><g fill="#e6f6f8" opacity=".6"><rect x="30" y="480" width="60" height="2"/><rect x="150" y="520" width="80" height="2"/><rect x="60" y="570" width="50" height="2"/></g>
    <path d="M110 440 L120 440 Q200 240 380 170 V440Z" fill="#6f9e60"/>${terrasses}
    <path d="M${pente(250).toFixed(0)} 250 L330 250 M318 262 V420" stroke="#f4e9c8" stroke-width="3" opacity=".9"/>
    <rect x="286" y="236" width="40" height="22" fill="#f6efe2"/><path d="M290 236 A16 16 0 0 1 322 236Z" fill="#e8b84a"/><circle cx="306" cy="224" r="22" fill="#ffe2a0" opacity=".25"/>
    ${cypres}${maisons}
    <g transform="translate(250 540)"><path d="M-40 0 H40 L30 14 H-30Z" fill="#f6efe2"/><rect x="-14" y="-16" width="26" height="16" fill="#e46a4f"/></g>
    <path d="M0 600 Q120 580 220 600 L220 640 H0Z" fill="#4a6a5a"/><path d="M0 610 H200" stroke="#2f4a3e" stroke-width="2"/>`; },
  vjerusalem: (u) => { let cr = ''; for (let x = 0; x < 380; x += 24) cr += `<rect x="${x}" y="318" width="14" height="18"/>`;
    let pierres = ''; for (let y = 350; y < 470; y += 16) pierres += `<path d="M0 ${y} H380" stroke="#b08a58" stroke-width="1" opacity=".5"/>`;
    for (let y = 342; y < 470; y += 32) for (let x = (y % 64) ? 0 : 22; x < 380; x += 44) pierres += `<path d="M${x} ${y} v16" stroke="#b08a58" stroke-width="1" opacity=".4"/>`;
    return `<defs><linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6c78b2"/><stop offset=".5" stop-color="#f4c38e"/><stop offset=".7" stop-color="#ffe2b4"/></linearGradient><linearGradient id="${u}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0d8a8"/><stop offset="1" stop-color="#c8a06a"/></linearGradient></defs>
    <rect width="380" height="640" fill="url(#${u}s)"/><circle cx="300" cy="250" r="70" fill="#fff0c8" opacity=".3"/><circle cx="300" cy="250" r="32" fill="#fff4d6"/>
    <path d="M0 300 Q90 250 190 280 T380 262 V340 H0Z" fill="#c9a07a" opacity=".55"/>
    <g fill="url(#${u}w)"><rect x="40" y="170" width="70" height="170"/>${[0, 1, 2, 3].map((i) => `<rect x="${40 + i * 20}" y="156" width="12" height="16"/>`).join('')}${cr}<rect y="334" width="380" height="136"/></g>
    <rect x="62" y="210" width="10" height="22" rx="5" fill="#7a5a3a"/><rect x="80" y="210" width="10" height="22" rx="5" fill="#7a5a3a"/><rect x="62" y="260" width="10" height="22" rx="5" fill="#7a5a3a"/><rect x="80" y="260" width="10" height="22" rx="5" fill="#7a5a3a"/>
    ${pierres}<path d="M160 470 V400 a30 30 0 0 1 60 0 V470Z" fill="#5a3e2a"/><path d="M166 470 V402 a24 24 0 0 1 48 0 V470Z" fill="#ffd9a0" opacity=".25"/>
    <rect y="470" width="380" height="170" fill="#e2c294"/>${[490, 520, 560, 610].map((y, i) => `<path d="M0 ${y} H380" stroke="#c8a474" stroke-width="${1 + i * .5}"/>`).join('')}<path d="M190 470 L120 640 M190 470 L260 640" stroke="#c8a474" stroke-width="2"/>
    <g transform="translate(320 600)"><path d="M0 0 Q-4-60 6-110" stroke="#6a5038" stroke-width="9" fill="none"/><path d="M6-110 Q-4-80 -14-60" stroke="#6a5038" stroke-width="5" fill="none"/><g fill="#8aa07a"><ellipse cx="6" cy="-128" rx="44" ry="26"/><ellipse cx="-24" cy="-104" rx="28" ry="16"/><ellipse cx="34" cy="-100" rx="26" ry="15"/></g><g fill="#6a8a62" opacity=".7"><ellipse cx="-4" cy="-136" rx="20" ry="9"/><ellipse cx="26" cy="-118" rx="16" ry="7"/></g></g>`; },
  vjaffa: (u) => { const r = aleaChap(91); let reflets = ''; for (let i = 0; i < 14; i++) reflets += `<rect x="${(60 + r() * 110).toFixed(0)}" y="${(350 + r() * 140).toFixed(0)}" width="${(12 + r() * 26).toFixed(0)}" height="2" fill="#ffd8b0" opacity=".75"/>`;
    let maisons = ''; [[210, 300, 50, 60], [252, 280, 46, 80], [180, 330, 44, 40], [300, 300, 40, 60], [330, 270, 50, 90], [230, 250, 30, 40]].forEach(([x, y, w, h], i) => { maisons += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${['#f2dcc0', '#e8cca8', '#f6e6d0'][i % 3]}"/><path d="M${x + 8} ${y + 14} h10 v14 h-10z M${x + w - 18} ${y + 14} h10 v14 h-10z" fill="#6a8aa0" opacity=".8"/>`; });
    const palmier = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 Q-4-50 6-100" stroke="#6a4a38" stroke-width="6" fill="none"/><g fill="#3f7a5a"><path d="M6-100 q-40-6-60 20 q30-18 60-14z"/><path d="M6-100 q40-8 60 16 q-32-16-60-10z"/><path d="M6-100 q-16-30-46-28 q26 8 42 32z"/><path d="M6-100 q20-28 48-22 q-28 6-44 26z"/></g></g>`;
    return `<defs><linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3e4c8c"/><stop offset=".45" stop-color="#e88a7c"/><stop offset=".55" stop-color="#ffcf9e"/></linearGradient><linearGradient id="${u}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0a888"/><stop offset=".4" stop-color="#6a8aa8"/><stop offset="1" stop-color="#2e5a78"/></linearGradient></defs>
    <rect width="380" height="640" fill="url(#${u}s)"/><circle cx="110" cy="330" r="60" fill="#ffe0b8" opacity=".3"/><circle cx="110" cy="334" r="28" fill="#fff0d0"/>
    <g fill="#8a7aa0" opacity=".55">${[[10, 300, 10, 40], [24, 286, 8, 54], [36, 306, 12, 34], [52, 292, 6, 48], [62, 310, 10, 30]].map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`).join('')}</g>
    <rect y="340" width="380" height="200" fill="url(#${u}m)"/>${reflets}
    <path d="M160 540 Q170 300 260 236 Q330 220 380 240 V540Z" fill="#d6b088"/>${maisons}
    <rect x="276" y="170" width="24" height="90" fill="#f2e4cc"/><rect x="272" y="164" width="32" height="10" fill="#c88a5a"/><path d="M276 164 L288 140 L300 164Z" fill="#c88a5a"/><circle cx="288" cy="196" r="8" fill="#fff"/><path d="M288 196 V190 M288 196 H292" stroke="#5a3e2a" stroke-width="1.500"/>
    ${palmier(196, 340, .8)}${palmier(350, 300, .9)}
    <path d="M0 520 H170 V532 H0Z" fill="#9a8a7a"/>${[30, 80, 130].map((x) => `<g transform="translate(${x} 510)"><path d="M-16 0 H16 L12 8 H-12Z" fill="#f6efe2"/><rect x="-1" y="-24" width="2" height="24" fill="#4a3a30"/><path d="M1-22 L1-2 L14-2Z" fill="#e46a6a"/></g>`).join('')}
    <rect y="560" width="380" height="80" fill="#c9a882"/><path d="M0 560 H380" stroke="#8a6a4a" stroke-width="3"/>${[50, 160, 270].map((x) => `<rect x="${x}" y="566" width="12" height="16" rx="4" fill="#4a3a30"/>`).join('')}`; },
  vmitspe: (u) => { const r = aleaChap(101); let etoiles = ''; for (let i = 0; i < 70; i++) etoiles += `<circle cx="${(r() * 380).toFixed(0)}" cy="${(r() * 330).toFixed(0)}" r="${(.6 + r() * 1.500).toFixed(1)}" fill="#fff" opacity="${(.5 + r() * .5).toFixed(2)}"/>`;
    const yael = (x, y) => `<g transform="translate(${x} ${y})" fill="#2a1a2e"><path d="M-22 0 L-18-20 Q-10-28 10-26 L18-34 L24-30 L20-20 L22 0 H18 L16-14 H-12 L-14 0Z"/><path d="M18-34 Q8-56 -6-58 Q6-50 12-34Z"/></g>`;
    return `<defs><linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c0a2a"/><stop offset=".55" stop-color="#2c2060"/><stop offset=".75" stop-color="#6a3a6e"/></linearGradient><filter id="${u}f"><feGaussianBlur stdDeviation="10"/></filter></defs>
    <rect width="380" height="640" fill="url(#${u}s)"/>
    <g filter="url(#${u}f)" opacity=".5"><ellipse cx="190" cy="170" rx="260" ry="30" transform="rotate(-32 190 170)" fill="#c8b8f0"/></g><g opacity=".35"><ellipse cx="190" cy="170" rx="220" ry="8" transform="rotate(-32 190 170)" fill="#fff"/></g>
    ${etoiles}<path d="M310 70 a26 26 0 1 0 18 44 a20 20 0 1 1 -18 -44z" fill="#fff4d8"/>
    <path d="M0 360 L60 340 L120 352 L200 334 L280 348 L380 330 V420 H0Z" fill="#5a3a5e"/>
    <path d="M0 420 L40 392 L110 410 L170 386 L240 404 L300 380 L380 396 V470 H0Z" fill="#8a5248"/><path d="M0 440 Q100 420 190 438 T380 430" stroke="#b06a4a" stroke-width="3" fill="none" opacity=".7"/>
    <path d="M0 470 Q120 450 200 466 T380 458 V520 H0Z" fill="#b0704c"/><path d="M0 500 Q140 482 380 496" stroke="#d08a5a" stroke-width="2" fill="none" opacity=".6"/>
    <path d="M0 520 Q190 506 380 520 V560 H0Z" fill="#6a4a58"/>
    <g transform="translate(70 330)"><rect x="-26" y="-6" width="52" height="30" fill="#ece6f2"/><path d="M-26-6 A26 26 0 0 1 26-6Z" fill="#f8f4fa"/><rect x="-3" y="-30" width="6" height="16" fill="#2a1a2e" transform="rotate(30)"/></g>
    <path d="M220 560 L260 520 L330 516 L380 540 V560Z" fill="#3a2440"/>${yael(300, 520)}
    <rect y="560" width="380" height="80" fill="#2a1a2e"/><path d="M0 560 Q90 548 190 560 T380 556" stroke="#4a2f5e" stroke-width="3" fill="none"/>`; },
});

/* Silhouettes du bas des affiches */
Object.assign(SILHOUETTES, {
  cypres: (c) => `<g fill="${c}"><path d="M80 270 Q56 170 88 40 Q120 170 96 270Z"/><path d="M150 270 Q124 150 160 10 Q196 150 170 270Z"/><path d="M226 270 Q204 190 234 80 Q264 190 242 270Z"/><path d="M0 300 V276 H70 V262 H250 V276 H320 V300Z"/></g>`,
  porte: (c) => `<path d="M30 300 V110 H60 V88 H90 V110 H120 V88 H150 V110 H170 V88 H200 V110 H230 V88 H260 V110 H290 V300 H200 V210 A40 40 0 0 0 120 210 V300Z" fill="${c}"/>`,
  horloge: (c) => `<g fill="${c}"><rect x="124" y="120" width="72" height="180"/><rect x="112" y="108" width="96" height="16"/><rect x="132" y="66" width="56" height="44"/><path d="M128 66 L160 24 L192 66Z"/></g><circle cx="160" cy="166" r="22" fill="#fff" opacity=".85"/><path d="M160 166 V150 M160 166 H172" stroke="${c}" stroke-width="4" stroke-linecap="round"/>`,
  telescope: (c) => `<g fill="${c}"><path d="M50 300 V196 H270 V300Z"/><path d="M62 196 A98 98 0 0 1 258 196Z"/><circle cx="270" cy="40" r="5"/><circle cx="40" cy="70" r="4"/><circle cx="210" cy="20" r="3"/></g><path d="M160 150 L262 74" stroke="${c}" stroke-width="22" stroke-linecap="round"/>`,
});

/* Cartes postales des vingt nouvelles histoires */
Object.assign(CARTES_VIE, {
  bibliotheque: { lieu: 'À la bibliothèque', he: 'בַּסִּפְרִיָּה', decor: 'bibliotheque', objets: [['livre', 330, 470, 1.300], ['lunettes', 480, 485, 1.100]] },
  veterinaire: { lieu: 'Chez le vétérinaire', he: 'רְפוּאָה שְׁלֵמָה', decor: 'medecin', objets: [['chat', 360, 470, 1.300], ['medicament', 510, 480, 1.100]] },
  reparation: { lieu: 'Chez le réparateur', he: 'מָסַךְ חָדָשׁ', decor: 'atelier', objets: [['telephone', 360, 470, 1.300], ['tournevis', 500, 480, 1.100]] },
  serrurier: { lieu: 'Devant la porte', he: 'מִחוּץ לַדִּירָה', decor: 'ville', objets: [['porte', 480, 430, 1], ['cle', 360, 475, 1.300]] },
  salledesport: { lieu: 'À la salle de sport', he: 'בַּחֲדַר הַכֹּשֶׁר', decor: 'sport', objets: [['bouteille', 360, 480, 1.100], ['serviette', 490, 470, 1.100]] },
  musee: { lieu: 'Au musée', he: 'בַּמּוּזֵאוֹן', decor: 'jerusalem', objets: [['mosaique', 370, 460, 1.200], ['amphore', 520, 470, 1.100]] },
  cinema: { lieu: 'Au cinéma', he: 'עֶרֶב שֶׁל סֶרֶט', decor: 'cinema', objets: [['popcorn', 360, 480, 1.200], ['billet', 500, 485, 1.100]] },
  epices: { lieu: 'Au marché aux épices', he: 'בַּשּׁוּק', decor: 'marche', objets: [['etal', 400, 450, 1.200]] },
  librairie: { lieu: 'À la librairie', he: 'מַתָּנָה לַחֲבֵרָה', decor: 'bibliotheque', objets: [['cadeau', 360, 475, 1.200], ['livre', 500, 480, 1.200]] },
  visite: { lieu: 'Dans la vieille ville', he: 'בָּעִיר הָעַתִּיקָה', decor: 'jerusalem', objets: [['porteVille', 400, 430, 1.100]] },
  plage: { lieu: 'À la plage', he: 'עַל חוֹף הַיָּם', decor: 'plage', objets: [['maitreNageur', 380, 440, 1.100], ['transat', 530, 480, 1]] },
  velo: { lieu: 'À vélo', he: 'עַל הָאוֹפַנַּיִם', decor: 'ville', objets: [['velo', 400, 465, 1.300]] },
  concert: { lieu: 'Au concert', he: 'בַּהוֹפָעָה', decor: 'musique', objets: [['micro', 360, 460, 1.200], ['guitare', 500, 460, 1.100]] },
  match: { lieu: 'Au stade', he: 'בַּמִּשְׂחָק', decor: 'sport', objets: [['ballonFoot', 380, 480, 1.200], ['sifflet', 510, 480, 1]] },
  piquenique: { lieu: 'Au parc', he: 'מִתַּחַת לָעֵץ', decor: 'parc', objets: [['panierFruits', 360, 480, 1.100], ['fourmi', 510, 500, 1]] },
  camping: { lieu: 'Au camping', he: 'בָּאֹהֶל', decor: 'camping', objets: [['tente', 380, 450, 1.200], ['feuCamp', 530, 490, 1]] },
  cratere: { lieu: 'Dans le cratère', he: 'בַּמַּכְתֵּשׁ', decor: 'desert', objets: [['sacDos', 360, 480, 1.100], ['boussole', 500, 490, 1]] },
  etoiles: { lieu: 'Sous les étoiles', he: 'תַּחַת הַכּוֹכָבִים', decor: 'nuit', objets: [['telescope', 400, 450, 1.200]] },
  meteo: { lieu: 'Pluie sur le désert', he: 'גֶּשֶׁם בַּמִּדְבָּר', decor: 'pluie', objets: [['parapluie', 400, 450, 1.200]] },
  kibboutz: { lieu: 'Au kibboutz', he: 'בַּקִּבּוּץ', decor: 'verger', objets: [['dattes', 380, 480, 1.200], ['panierFruits', 510, 480, 1]] },
});
