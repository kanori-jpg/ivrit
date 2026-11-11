'use strict';
/* Chapitres 16 et 17 : deux nouvelles villes, cinq histoires chacune. */
VILLES.push(
  { id: 'vcesaree', num: 16, lieu: 'Césarée', he: 'קֵיסָרְיָה', theme: 'Famille et amis', devise: 'Là où l’on se retrouve entre proches',
    pal: { d: '#8a4a3a', p: '#f8e0d0', t: '#fff0e6', i: '#6e3a2c' }, ridge: 'vagues', sil: 'aqueduc',
    poeme: ['Au bord de la mer, un vieil aqueduc marche dans le sable.', 'Ici, on se retrouve en famille et entre amis,', 'et l’on trinque en disant <span class="he">לְחַיִּים</span>, « à la vie ».'],
    note: 'Une amie se marie, une autre a eu un bébé, un ami déménage… et la grand-mère de Noa t’apprend sa shakshouka.',
    mots: [['מִשְׁפָּחָה', 'famille'], ['חֲבֵרִים', 'amis'], ['חוֹל', 'sable'], ['יָם', 'mer']],
    histoires: ['invitation', 'bebe', 'demenagement', 'babysitting', 'recette'] },
  { id: 'vroshpina', num: 17, lieu: 'Rosh Pina', he: 'רֹאשׁ פִּנָּה', theme: 'Les petits imprévus', devise: 'Là où l’imprévu a du charme',
    pal: { d: '#3e4e6a', p: '#dde4ee', t: '#eef2f8', i: '#2e3c56' }, ridge: 'collines', sil: 'eclair',
    poeme: ['Sur la colline, le vieux village de pierre regarde la Galilée.', 'Un train en retard, un orage, une addition qui se trompe :', 'ici, on apprend à dire <span class="he">זֶה קוֹרֶה</span>, « ça arrive ».'],
    note: 'Retard, grippe, voisin bruyant, erreur dans l’addition, coupure de courant : les petits imprévus de la vie, et les mots pour s’en sortir.',
    mots: [['הַפְתָּעָה', 'surprise'], ['סְעָרָה', 'orage'], ['כְּפָר', 'village'], ['גֶּשֶׁם', 'pluie']],
    histoires: ['retard', 'grippe', 'bruit', 'addition', 'coupure'] },
);

Object.assign(DECORS, {
  vcesaree: (u) => { const r = aleaChap(111); let reflets = ''; for (let i = 0; i < 14; i++) reflets += `<rect x="${(160 + r() * 160).toFixed(0)}" y="${(330 + r() * 130).toFixed(0)}" width="${(12 + r() * 28).toFixed(0)}" height="2" fill="#ffe0c0" opacity=".7"/>`;
    let arches = ''; for (let i = 0; i < 9; i++) { const x = -10 + i * 44; arches += `<path d="M${x} 520 V448 a18 18 0 0 1 36 0 V520 Z" fill="#a8603e"/>`; }
    return `<defs><linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a5a9a"/><stop offset=".5" stop-color="#f0a080"/><stop offset=".62" stop-color="#ffd6a4"/></linearGradient><linearGradient id="${u}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2b090"/><stop offset=".4" stop-color="#5a8aa8"/><stop offset="1" stop-color="#2e5a7a"/></linearGradient><linearGradient id="${u}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8b47c"/><stop offset="1" stop-color="#c8865a"/></linearGradient></defs>
    <rect width="380" height="640" fill="url(#${u}s)"/><circle cx="250" cy="318" r="70" fill="#fff0c8" opacity=".3"/><circle cx="250" cy="322" r="32" fill="#fff4d6"/>
    <path d="M60 140q6-6 12 0q6-6 12 0M200 110q5-5 10 0q5-5 10 0" stroke="#5a4a6e" stroke-width="2" fill="none"/>
    <rect y="330" width="380" height="140" fill="url(#${u}m)"/>${reflets}
    <path d="M0 470 Q190 444 380 470 V640 H0Z" fill="#f2d6a8"/>
    <rect x="-10" y="420" width="400" height="30" fill="url(#${u}a)"/><rect x="-10" y="414" width="400" height="8" fill="#d89a6a"/><g fill="url(#${u}a)"><rect x="-10" y="448" width="400" height="72"/></g>${arches}
    ${[30, 120, 210, 300].map((x) => `<path d="M${x} 452 v60" stroke="#d89a6a" stroke-width="1" opacity=".5"/>`).join('')}
    <path d="M0 560 Q120 540 240 560 T380 556 V640 H0Z" fill="#e8c490"/>
    <g transform="translate(70 600)"><path d="M0 0 Q-4-60 6-120" stroke="#6a4a38" stroke-width="7" fill="none"/><g fill="#3f7a5a"><path d="M6-120 q-50-6-74 24 q36-20 74-16z"/><path d="M6-120 q50-10 74 18 q-40-18-74-12z"/><path d="M6-120 q-20-34-56-32 q30 8 52 36z"/><path d="M6-120 q24-32 58-26 q-32 8-54 30z"/></g></g>
    <g transform="translate(290 600)"><ellipse rx="40" ry="8" fill="#c8a070" opacity=".5"/><path d="M-26-4 L-6-40 L14-4Z" fill="#f6efe2"/><path d="M-6-40 V-48" stroke="#8a5a3a" stroke-width="2"/></g>`; },
  vroshpina: (u) => { const r = aleaChap(121); let gouttes = ''; for (let i = 0; i < 40; i++) { const x = r() * 380, y = 120 + r() * 220; gouttes += `<path d="M${x.toFixed(0)} ${y.toFixed(0)} l-4 12" stroke="#c8d4ec" stroke-width="1.500" opacity=".6"/>`; }
    const maison = (x, y, w, h, c) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/><path d="M${x - 4} ${y} L${x + w / 2} ${y - h * .45} L${x + w + 4} ${y}Z" fill="#b8604a"/><rect x="${x + w / 2 - 5}" y="${y + h - 16}" width="10" height="16" fill="#5a4a5a"/><rect x="${x + 6}" y="${y + 8}" width="8" height="10" fill="#ffd98a"/>`;
    return `<defs><linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4462"/><stop offset=".5" stop-color="#7a86a8"/><stop offset=".75" stop-color="#e8c8a0"/></linearGradient></defs>
    <rect width="380" height="640" fill="url(#${u}s)"/>
    <g fill="#4a5272"><ellipse cx="90" cy="110" rx="110" ry="40"/><ellipse cx="220" cy="90" rx="120" ry="46"/><ellipse cx="340" cy="120" rx="90" ry="36"/></g><g fill="#5c6688"><ellipse cx="150" cy="140" rx="120" ry="30"/><ellipse cx="300" cy="150" rx="100" ry="26"/></g>
    <path d="M250 150 L232 214 H252 L236 280 L282 196 H260 L276 150Z" fill="#ffe89a"/><path d="M250 150 L232 214 H252 L236 280 L282 196 H260 L276 150Z" fill="#fff6c8" opacity=".5" transform="translate(2 2)"/>
    ${gouttes}
    <path d="M0 380 Q60 300 160 330 Q260 290 380 320 V640 H0Z" fill="#7a9a6a"/><path d="M0 430 Q120 380 240 410 T380 400 V640 H0Z" fill="#6a8a5a"/>
    ${maison(40, 380, 54, 46, '#d8c8a8')}${maison(110, 366, 46, 52, '#e6d6b8')}${maison(170, 386, 58, 42, '#d0bc9a')}${maison(244, 372, 48, 50, '#e2d0b0')}
    ${[30, 300, 340].map((x) => `<path d="M${x} 470 q-8-22 0-58 q8 36 0 58z" fill="#3f5a3a"/>`).join('')}
    <g transform="translate(300 520)"><path d="M0 40 V-10" stroke="#6a5a48" stroke-width="7"/><ellipse cx="0" cy="-26" rx="40" ry="24" fill="#8aa07a"/><ellipse cx="-14" cy="-34" rx="16" ry="8" fill="#a8bc96" opacity=".7"/></g>
    <path d="M0 560 Q100 540 200 556 T380 548 V640 H0Z" fill="#a89070"/><path d="M60 640 Q140 590 220 560" stroke="#c8b090" stroke-width="10" fill="none"/>
    <path d="M60 470 A120 120 0 0 1 300 470" stroke="#ffd08a" stroke-width="4" fill="none" opacity=".35"/><path d="M66 470 A114 114 0 0 1 294 470" stroke="#9ad0a0" stroke-width="4" fill="none" opacity=".3"/><path d="M72 470 A108 108 0 0 1 288 470" stroke="#8ab4e8" stroke-width="4" fill="none" opacity=".3"/>`; },
});

Object.assign(SILHOUETTES, {
  aqueduc: (c) => `<path d="M0 300 V150 H320 V300 H286 V220 a26 26 0 0 0 -52 0 V300 H206 V220 a26 26 0 0 0 -52 0 V300 H126 V220 a26 26 0 0 0 -52 0 V300 H46 V220 a26 26 0 0 0 -46 -10 Z" fill="${c}"/><rect x="0" y="134" width="320" height="16" fill="${c}" opacity=".8"/>`,
  eclair: (c) => `<g fill="${c}"><ellipse cx="110" cy="110" rx="80" ry="50"/><ellipse cx="200" cy="90" rx="90" ry="62"/><ellipse cx="160" cy="140" rx="120" ry="40"/><path d="M170 170 L140 240 H166 L146 300 L208 214 H180 L200 170Z"/></g>`,
});

Object.assign(CARTES_VIE, {
  invitation: { lieu: 'Une grande nouvelle', he: 'מַזָּל טוֹב!', decor: 'mariage', objets: [['bague', 380, 470, 1.200], ['enveloppe', 510, 480, 1.100]] },
  bebe: { lieu: 'Le nouveau bébé', he: 'הִיא נִרְדְּמָה', decor: 'chambreenfant', objets: [['nounours', 380, 470, 1.200], ['cadeau', 510, 480, 1]] },
  demenagement: { lieu: 'Le déménagement', he: 'דִּירָה חֲדָשָׁה', decor: 'salon', objets: [['colis', 350, 470, 1.300], ['colis', 470, 485, 1]] },
  babysitting: { lieu: 'Le baby-sitting', he: 'עוֹד סִפּוּר', decor: 'chambreenfant', objets: [['livre', 370, 480, 1.200], ['jouetVoiture', 500, 490, 1]] },
  recette: { lieu: 'La shakshouka', he: 'שַׁקְשׁוּקָה', decor: 'cuisine', objets: [['oeuf', 350, 480, 1.200], ['tomate', 460, 480, 1.100], ['oignon', 560, 485, 1]] },
  retard: { lieu: 'Le train en retard', he: 'הָרַכֶּבֶת תְּקוּעָה', decor: 'gare', objets: [['train', 380, 450, 1.300], ['horloge', 590, 300, 1]] },
  grippe: { lieu: 'La grippe', he: 'תֵּה עִם לִימוֹן וּדְבַשׁ', decor: 'salon', objets: [['thermometre', 360, 480, 1.200], ['the', 490, 480, 1.100]] },
  bruit: { lieu: 'Trop de bruit', he: 'מְסִבָּה קְטַנָּה', decor: 'nuit', objets: [['notes', 380, 400, 1.200], ['micro', 520, 470, 1]] },
  addition: { lieu: 'L’addition', he: 'הַחֶשְׁבּוֹן', decor: 'resto', objets: [['verre', 360, 465, 1.200], ['argent', 490, 480, 1.100]] },
  coupure: { lieu: 'La coupure de courant', he: 'לְאוֹר הַנֵּרוֹת', decor: 'nuit', objets: [['bougie', 380, 470, 1.300], ['lampe', 520, 460, 1]] },
});
