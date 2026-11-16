'use strict';
/* Chapitre 18 : Zikhron Ya'akov, les fêtes et les traditions (cinq histoires, dans histoires_vie.js). */
VILLES.push(
  { id: 'vzikhron', num: 18, lieu: 'Zikhron Ya’akov', he: 'זִכְרוֹן יַעֲקֹב', theme: 'Fêtes et traditions', devise: 'Là où chaque fête a son goût',
    pal: { d: '#6a3a5a', p: '#f6dfe6', t: '#fff0f4', i: '#55304a' }, ridge: 'collines', sil: 'grappe',
    poeme: ['Sur la colline, les vignes descendent vers la mer.', 'Ici, chaque saison apporte sa fête :', 'on se souhaite <span class="he">חַג שָׂמֵחַ</span>, « joyeuse fête ».'],
    note: 'Des beignets pour Hanoukka, un séder chez la voisine, un déguisement pour Pourim, une soukka à construire et les vœux de Rosh Hashana.',
    mots: [['חַג', 'fête'], ['כֶּרֶם', 'vigne'], ['גִּבְעָה', 'colline'], ['מָסֹרֶת', 'tradition']],
    histoires: ['soufganiyot', 'invitationseder', 'pourim', 'construiresoukka', 'shanatova'] },
);

Object.assign(DECORS, {
  vzikhron: (u) => { const r = aleaChap(131); let etoiles = ''; for (let i = 0; i < 26; i++) etoiles += `<circle cx="${(r() * 380).toFixed(0)}" cy="${(20 + r() * 150).toFixed(0)}" r="${(1 + r() * 1.4).toFixed(1)}" fill="#fff" opacity=".8"/>`;
    let vignes = ''; for (let k = 0; k < 6; k++) { const y = 420 + k * 36; for (let i = 0; i < 9; i++) { const x = -10 + i * 46 + (k % 2) * 23; vignes += `<ellipse cx="${x}" cy="${y}" rx="18" ry="10" fill="${k % 2 ? '#5f8a4a' : '#6f9a56'}"/>${r() > .6 ? `<circle cx="${x + 6}" cy="${y + 8}" r="4" fill="#7a3a6a"/>` : ''}`; } }
    return `<defs><linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2450"/><stop offset=".45" stop-color="#8a5a8a"/><stop offset=".7" stop-color="#f2b89a"/></linearGradient></defs>
    <rect width="380" height="640" fill="url(#${u}s)"/>${etoiles}
    <circle cx="300" cy="120" r="34" fill="#fff3c4"/><circle cx="314" cy="112" r="30" fill="#8a5a8a" opacity=".55"/>
    <path d="M0 360 Q90 300 200 330 T380 310 V640 H0Z" fill="#8a7a9a"/>
    <g fill="#d8c0a8"><rect x="150" y="270" width="46" height="70"/><path d="M146 270 L173 236 L200 270Z" fill="#b8604a"/><rect x="166" y="296" width="14" height="44" fill="#5a4a5a"/><rect x="206" y="290" width="70" height="50"/><path d="M202 290 L241 262 L280 290Z" fill="#b8604a"/><rect x="216" y="302" width="12" height="12" fill="#ffd98a"/><rect x="250" y="302" width="12" height="12" fill="#ffd98a"/></g>
    ${[60, 110, 320].map((x) => `<path d="M${x} 400 q-10-30 0-80 q10 50 0 80z" fill="#3f5a3a"/>`).join('')}
    <path d="M0 400 Q120 370 240 392 T380 384 V640 H0Z" fill="#7a9a5a"/>${vignes}
    <path d="M0 610 Q120 590 240 604 T380 596 V640 H0Z" fill="#9a7a5a"/>`; },
});

Object.assign(SILHOUETTES, {
  grappe: (c) => `<g fill="${c}"><path d="M160 60 Q170 30 200 34" stroke="${c}" stroke-width="8" fill="none"/><path d="M168 50 Q220 20 240 60 Q200 70 168 50Z"/>${[[130, 100], [170, 100], [210, 100], [150, 140], [190, 140], [130, 180], [170, 180], [210, 180], [150, 220], [190, 220], [170, 260]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="22"/>`).join('')}</g>`,
});

Object.assign(CARTES_VIE, {
  soufganiyot: { lieu: 'Les beignets de Hanoukka', he: 'חַג שָׂמֵחַ!', decor: 'hanoukka', objets: [['beignet', 380, 470, 1.200], ['latke', 510, 480, 1.100]] },
  invitationseder: { lieu: 'Le séder chez Orit', he: 'בְּחַג הַפֶּסַח', decor: 'seder', objets: [['matza', 360, 470, 1.100], ['vin', 500, 460, 1]] },
  pourim: { lieu: 'Le déguisement de Pourim', he: 'תַּחְפֹּשֶׂת', decor: 'pourim', objets: [['masque', 370, 460, 1.200], ['crecelle', 510, 480, 1]] },
  construiresoukka: { lieu: 'La soukka d’Eli', he: 'הַסֻּכָּה', decor: 'soukkot', objets: [['loulav', 360, 440, 1], ['etrog', 480, 480, .9]] },
  shanatova: { lieu: 'Bonne année, mamie !', he: 'שָׁנָה טוֹבָה', decor: 'roshhashana', objets: [['pomme', 370, 480, 1.100], ['grenade', 500, 480, 1]] },
});

// Le sens des mots de ces histoires qui ne sont pas encore dans le vocabulaire (quand on les touche)
window.GLOSES_HEBDO = Object.assign(window.GLOSES_HEBDO || {}, {
  'לְבִיבוֹת': ['latkes, galettes de pommes de terre', 'levivot'], 'חַמּוֹת': ['chaudes', 'khamot'], 'וְהַדְלִיקִי': ['et allume (à une femme)', 'vehadliki'], 'מַצּוֹת': ['matsot (pluriel de matsa)', 'matsot'],
  'יְחַפְּשׂוּ': ['chercheront', 'yekhapsou'], 'אִתָּם': ['avec eux', 'itam'], 'שֶׁמּוֹצֵא': ['qui trouve', 'shemotsé'], 'מְקַבֵּל': ['reçoit', 'mekabel'], 'פּוּרִים': ['Pourim (fête)', 'Pourim'],
  'וְרוֹפְאָה': ['et une docteure', 'verofa'], 'חַיּוֹת': ['animaux', 'khayot'], 'חֲתוּלָה': ['chatte', 'khatoula'], 'אָזְנַיִם': ['oreilles', 'oznayim'], 'כְּשֶׁשּׁוֹמְעִים': ['quand on entend', 'keshéshomim'],
  'הָמָן': ['Haman (le méchant de l’histoire de Pourim)', 'Haman'], 'תַּחְזִיקִי': ['tiens (à une femme)', 'takhziki'], 'אֶקְשֹׁר': ['j’attacherai', 'ekshor'], 'שָׂמִים': ['on met', 'samim'],
  'יִתְלוּ': ['accrocheront', 'yitlou'], 'שְׁלוֹמֵךְ': ['« מָה שְׁלוֹמֵךְ » : comment vas-tu (à une femme)', 'shlomekh'], 'אָכַלְתְּ': ['tu as mangé (femme)', 'akhalt'], 'מְאַחֶלֶת': ['souhaite (femme)', 'meakhélet'],
  'וּבְרִיאָה': ['et en bonne santé (féminin)', 'oubria'], 'שָׁמַעְתְּ': ['tu as entendu (femme)', 'shamat'], 'הַכְּנֶסֶת': ['« בֵּית הַכְּנֶסֶת » : la synagogue', 'hakneset'],
});

/* Chapitres 19 et 20 : Ramla (le goût du quotidien) et Ashkelon (l'entraide). */
VILLES.push(
  { id: 'vramla', num: 19, lieu: 'Ramla', he: 'רַמְלָה', theme: 'Le goût du quotidien', devise: 'Là où l’on mange, on parle',
    pal: { d: '#8a5a2a', p: '#f8e6cc', t: '#fff4e2', i: '#6e4520' }, ridge: 'collines', sil: 'tour',
    poeme: ['Autour de la vieille tour blanche, le marché s’éveille.', 'On goûte, on discute, on marchande,', 'et l’on se dit <span class="he">בְּתֵאָבוֹן</span>, « bon appétit ».'],
    note: 'Un houmous, des fraises au marché, un café à la cardamome, des amis à dîner et une livraison qui arrive… sans le yaourt.',
    mots: [['שׁוּק', 'marché'], ['טַעַם', 'goût'], ['אֹכֶל', 'nourriture'], ['מִגְדָּל', 'tour']],
    histoires: ['houmous', 'shoukramla', 'cafenoir', 'receptionamis', 'livraisonsuper'] },
  { id: 'vashkelon', num: 20, lieu: 'Ashkelon', he: 'אַשְׁקְלוֹן', theme: 'Entraide et bénévolat', devise: 'Là où l’on se donne la main',
    pal: { d: '#2a6a7a', p: '#dcf0f2', t: '#eefafa', i: '#1f5260' }, ridge: 'vagues', sil: 'coeur',
    poeme: ['Au bord de la mer, les vieilles colonnes regardent les vagues.', 'Ici, on aide un voisin, on donne un peu de son temps,', 'et l’on apprend le mot <span class="he">עֶזְרָה</span>, « l’aide ».'],
    note: 'Des colis pour la fête, la voisine du troisième, un don du sang, une plage à nettoyer et un élève fâché avec le calcul.',
    mots: [['עֶזְרָה', 'aide'], ['שָׁכֵן', 'voisin'], ['חוֹף', 'plage'], ['יָם', 'mer']],
    histoires: ['colisfete', 'voisinedessus', 'dondusang', 'plagepropre', 'devoirs'] },
);

Object.assign(DECORS, {
  vramla: (u) => { const r = aleaChap(141); let etals = ''; for (let i = 0; i < 5; i++) { const x = 10 + i * 74; etals += `<path d="M${x} 470 H${x + 66} L${x + 58} 440 H${x + 8}Z" fill="${['#e5566b', '#f2c14e', '#5f9a4a', '#e88a3a', '#8e4f9e'][i]}"/><rect x="${x + 6}" y="470" width="54" height="34" fill="#a8774a"/>${[0, 1, 2].map((k) => `<circle cx="${x + 16 + k * 17}" cy="468" r="7" fill="${['#f2a54a', '#d84a4f', '#7fb35c'][(k + i) % 3]}"/>`).join('')}`; }
    let nuages = ''; for (let i = 0; i < 4; i++) nuages += `<ellipse cx="${(r() * 380).toFixed(0)}" cy="${(60 + r() * 90).toFixed(0)}" rx="${(40 + r() * 30).toFixed(0)}" ry="12" fill="#fff" opacity=".55"/>`;
    return `<defs><linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7ab4e0"/><stop offset=".6" stop-color="#f6dcb0"/></linearGradient></defs>
    <rect width="380" height="640" fill="url(#${u}s)"/>${nuages}
    <g fill="#f2ead8"><rect x="160" y="150" width="60" height="230"/><rect x="152" y="140" width="76" height="16"/><path d="M160 140 V120 H220 V140" /><rect x="170" y="100" width="40" height="22"/></g>
    <g fill="#8a7a6a">${[190, 240, 290, 340].map((y) => `<rect x="182" y="${y - 30}" width="16" height="26" rx="8"/>`).join('')}</g>
    <path d="M0 380 Q120 350 240 372 T380 364 V640 H0Z" fill="#d8b888"/>${etals}
    <path d="M0 520 Q120 500 240 516 T380 508 V640 H0Z" fill="#c8a070"/>`; },
  vashkelon: (u) => { const r = aleaChap(151); let reflets = ''; for (let i = 0; i < 16; i++) reflets += `<rect x="${(r() * 360).toFixed(0)}" y="${(320 + r() * 120).toFixed(0)}" width="${(10 + r() * 24).toFixed(0)}" height="2" fill="#fff" opacity=".6"/>`;
    const colonne = (x, h) => `<rect x="${x}" y="${470 - h}" width="22" height="${h}" fill="#efe6d4"/><rect x="${x - 5}" y="${462 - h}" width="32" height="10" fill="#e2d6c0"/><path d="M${x + 6} ${474 - h} V466 M${x + 12} ${474 - h} V466" stroke="#d6c8ae" stroke-width="2"/>`;
    return `<defs><linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5ab0d8"/><stop offset=".5" stop-color="#bfe4ee"/><stop offset=".52" stop-color="#2f8ab0"/><stop offset="1" stop-color="#1f6a8a"/></linearGradient></defs>
    <rect width="380" height="640" fill="url(#${u}s)"/><circle cx="90" cy="110" r="34" fill="#fff6c4"/>${reflets}
    <path d="M0 440 Q100 420 200 436 T380 428 V640 H0Z" fill="#f0dcae"/>
    ${colonne(230, 120)}${colonne(276, 90)}${colonne(322, 140)}<rect x="220" y="466" width="140" height="12" fill="#e2d6c0"/>
    <path d="M0 520 Q100 500 200 514 T380 506 V640 H0Z" fill="#e6cc98"/>`; },
});

Object.assign(SILHOUETTES, {
  coeur: (c) => `<path d="M160 280 C60 210 40 140 80 100 C120 60 160 90 160 120 C160 90 200 60 240 100 C280 140 260 210 160 280Z" fill="${c}"/>`,
});

Object.assign(CARTES_VIE, {
  houmous: { lieu: 'Au restaurant de houmous', he: 'בְּתֵאָבוֹן!', decor: 'resto', objets: [['houmous', 370, 470, 1.200], ['pita', 500, 480, 1]] },
  shoukramla: { lieu: 'Le marché de Ramla', he: 'תּוּתִים טְרִיִּים!', decor: 'marche', objets: [['panierFruits', 370, 470, 1.200], ['orange', 500, 480, 1]] },
  cafenoir: { lieu: 'Le café à la cardamome', he: 'קָפֶה עִם הֶל', decor: 'cafeville', objets: [['cafe', 400, 470, 1.200]] },
  receptionamis: { lieu: 'Des amis à dîner', he: 'בְּתֵאָבוֹן', decor: 'cuisine', objets: [['assiette', 370, 480, 1.100], ['verre', 500, 480, 1]] },
  livraisonsuper: { lieu: 'La livraison', he: 'מִשְׁלוֹחַ', decor: 'salon', objets: [['sachet', 370, 470, 1.200], ['colis', 500, 480, 1]] },
  colisfete: { lieu: 'Les colis de fête', he: 'חֲבִילוֹת לַחַג', decor: 'supermarche', objets: [['colis', 370, 470, 1.200], ['huile', 500, 470, 1]] },
  voisinedessus: { lieu: 'La voisine du troisième', he: 'אַתְּ מַלְאָךְ!', decor: 'salon', objets: [['the', 370, 480, 1.100], ['biscuits', 500, 480, 1]] },
  dondusang: { lieu: 'Le don du sang', he: 'הִצַּלְתְּ חַיִּים', decor: 'medecin', objets: [['pansement', 370, 480, 1.100], ['jus', 500, 470, 1]] },
  plagepropre: { lieu: 'La plage propre', he: 'עֲבוֹדָה טוֹבָה!', decor: 'plage', objets: [['tortue', 370, 490, 1.100], ['bouteille', 500, 470, 1]] },
  devoirs: { lieu: 'L’aide aux devoirs', he: 'חֶשְׁבּוֹן', decor: 'classe', objets: [['cahier', 370, 480, 1.100], ['crayon', 500, 480, 1]] },
});

// Le sens des mots des chapitres 19 et 20 qui ne sont pas encore dans le vocabulaire
window.GLOSES_HEBDO = Object.assign(window.GLOSES_HEBDO || {}, {
  'עָלֵינוּ': ['sur nous ; « עָלֵינוּ » : c’est pour nous, c’est offert', 'alenou'], 'תּוּתִים': ['fraises', 'toutim'], 'מְתוּקִים': ['sucrés, doux (pluriel)', 'metoukim'], 'תִּטְעֲמִי': ['goûte (à une femme)', 'titami'],
  'טְעִימִים': ['bons, savoureux (pluriel)', 'teïmim'], 'בִּשְׁבִילִי': ['pour moi', 'bishvili'], 'חוֹתֵךְ': ['coupe (homme)', 'khotekh'], 'שֶׁנּוֹתֵן': ['qui donne', 'shenoten'],
  'תִּזָּהֲרִי': ['fais attention (à une femme)', 'tizahari'], 'בִּשַּׁלְתְּ': ['tu as cuisiné (femme)', 'bishalt'], 'וְהַסַּכִּינִים': ['et les couteaux', 'vehasakinim'], 'שׁוֹטְפִים': ['lavons, lavent', 'shotfim'],
  'מֵהַסּוּפֶּר': ['du supermarché', 'mehasouper'], 'כְּבֵדוֹת': ['lourdes', 'kvedot'], 'אֲשַׁלֵּם': ['je paierai', 'ashalem'], 'שָׂמִים': ['on met', 'samim'], 'מְהִירָה': ['rapide (féminin)', 'mehira'],
  'הָאַחְרָאִית': ['la responsable', 'haakhraït'], 'הַסַּלִּים': ['les paniers', 'hasalim'], 'הַבִּרְכַּיִם': ['les genoux', 'habirkayim'], 'אֶתְקַשֵּׁר': ['j’appellerai (au téléphone)', 'etkasher'],
  'אָכִין': ['je préparerai', 'akhin'], 'שְׁכֵנִים': ['voisins', 'shkhenim'], 'תּוֹרֶמֶת': ['donnes (femme), fais un don', 'torémet'], 'אָכַלְתְּ': ['tu as mangé (femme)', 'akhalt'],
  'אָכַלְתִּי': ['j’ai mangé', 'akhalti'], 'וְשָׁתִיתִי': ['et j’ai bu', 'veshatiti'], 'עָלַי': ['sur moi ; « תִּסְתַּכְּלִי עָלַי » : regarde-moi', 'alaï'], 'קְחִי': ['prends (à une femme)', 'kkhi'],
  'הִצַּלְתְּ': ['tu as sauvé (femme)', 'hitsalt'], 'סִיגַרְיוֹת': ['cigarettes', 'sigariyot'], 'מְסֻכָּנוֹת': ['dangereuses', 'mesoukanot'], 'יָדַעְתִּי': ['je savais', 'yadati'],
  'נְשַׁחְרֵר': ['libérons, nous libérerons', 'neshakhrer'], 'חוֹזֵר': ['revient, retourne', 'khozer'], 'שׂוֹנֵא': ['déteste (homme)', 'soné'], 'זוֹכֵר': ['se souvient (homme)', 'zokher'], 'תִּזְכֹּר': ['retiens, souviens-toi (à un homme)', 'tizkor'],
});
