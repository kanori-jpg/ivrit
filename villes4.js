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
