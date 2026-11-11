'use strict';
/* Chapitres 6 à 11 : les histoires de la vie de tous les jours, regroupées par ville. */
const VILLES = [
  { id: 'vnetanya', num: 6, lieu: 'Netanya', he: 'נְתַנְיָה', theme: 'S’installer', devise: 'Là où l’on pose ses valises face à la mer',
    pal: { d: '#2f4f6e', p: '#f7dcc8', t: '#ffeedd', i: '#2f4f6e' }, ridge: 'vagues', sil: 'cle',
    poeme: ['Sur la falaise, les immeubles regardent la mer.', 'Un nouvel appartement, une nouvelle voisine :', 'ici, on apprend à dire <span class="he">בַּיִת</span>, « maison ».'],
    note: 'Tu t’installes dans un petit appartement avec balcon. Il reste à rencontrer les voisins… et à réparer cette fuite.',
    mots: [['דִּירָה', 'appartement'], ['מִרְפֶּסֶת', 'balcon'], ['שָׁכֵן', 'voisin'], ['מַפְתֵּחַ', 'clé']],
    histoires: ['appartement', 'voisine', 'panne', 'livraison', 'telephone'] },
  { id: 'vakko', num: 7, lieu: 'Akko', he: 'עַכּוֹ', theme: 'Courses et démarches', devise: 'Là où le vieux port garde ses secrets',
    pal: { d: '#5a3e2e', p: '#f3dfc4', t: '#fdf0de', i: '#4a3226' }, ridge: 'remparts', sil: 'voilier',
    poeme: ['Les remparts plongent dans la mer.', 'Au marché, on compte ses shekels', 'et l’on demande : <span class="he">כַּמָּה זֶה עוֹלֶה?</span>'],
    note: 'Courses, poste, coiffeur : une journée de démarches dans la vieille ville… sans perdre ton portefeuille.',
    mots: [['נָמָל', 'port'], ['חוֹמָה', 'rempart'], ['סִירָה', 'barque'], ['דָּג', 'poisson']],
    histoires: ['supermarche', 'boulangerie', 'poste', 'coiffeur', 'perdu'] },
  { id: 'vtiberiade', num: 8, lieu: 'Tibériade', he: 'טְבֶרְיָה', theme: 'Prendre soin de soi', devise: 'Là où le lac apaise les jours',
    pal: { d: '#2c5a5e', p: '#d7ece6', t: '#eaf7f2', i: '#24484c' }, ridge: 'collines', sil: 'barque',
    poeme: ['Au bord du lac, le matin est tranquille.', 'On y prend le temps de se soigner,', 'et l’on souhaite à chacun <span class="he">רְפוּאָה שְׁלֵמָה</span>.'],
    note: 'Pharmacie, rendez-vous, dentiste : ici, tu apprends à dire où tu as mal… et à prendre le bus pour l’école.',
    mots: [['כִּנֶּרֶת', 'lac de Tibériade'], ['אֲגַם', 'lac'], ['סִירָה', 'barque'], ['רוֹפֵא', 'médecin']],
    histoires: ['pharmacie', 'rendezvous', 'dentiste', 'bus', 'ecole'] },
  { id: 'vbeersheva', num: 9, lieu: 'Be’er Sheva', he: 'בְּאֵר שֶׁבַע', theme: 'Étudier et travailler', devise: 'Là où le désert fait pousser une ville',
    pal: { d: '#7a4a2a', p: '#f6e2c2', t: '#fff1dc', i: '#5e3820' }, ridge: 'collines', sil: 'chameau',
    poeme: ['Au bord du Néguev, la ville étudie.', 'Le matin à l’oulpan, l’après-midi au bureau :', 'un mot de plus chaque jour, <span class="he">לְאַט לְאַט</span>.'],
    note: 'Inscription à l’oulpan, premier cours, entretien d’embauche : ta nouvelle vie d’étudiante et de travailleuse commence.',
    mots: [['מִדְבָּר', 'désert'], ['גָּמָל', 'chameau'], ['בְּאֵר', 'puits'], ['לִלְמֹד', 'étudier']],
    histoires: ['oulpan', 'cours', 'entretien', 'collegue', 'banque'] },
  { id: 'vtsfat', num: 10, lieu: 'Safed', he: 'צְפַת', theme: 'La vie sociale', devise: 'Là où les ruelles sont bleues',
    pal: { d: '#2e3f7a', p: '#dfe6f7', t: '#eef2fd', i: '#25336a' }, ridge: 'montagnes', sil: 'bougies',
    poeme: ['Les portes sont peintes en bleu ciel.', 'Le vendredi soir, la ville se tait', 'et l’on se dit <span class="he">שַׁבָּת שָׁלוֹם</span>.'],
    note: 'Dîner de shabbat, anniversaire, sortie entre amis : à Safed, tu passes du temps avec ceux que tu aimes.',
    mots: [['דֶּלֶת', 'porte'], ['כָּחֹל', 'bleu'], ['נֵר', 'bougie'], ['חָבֵר', 'ami']],
    histoires: ['shabbat', 'anniversaire', 'sortie', 'appel', 'train'] },
  { id: 'veilat', num: 11, lieu: 'Eilat', he: 'אֵילַת', theme: 'Les vacances', devise: 'Là où la mer Rouge brille',
    pal: { d: '#8a3a3a', p: '#fbe0cf', t: '#fff0e4', i: '#6e2c2c' }, ridge: 'vagues', sil: 'poisson',
    poeme: ['Entre montagnes rouges et mer turquoise,', 'les vacances commencent à l’aéroport.', 'Dans la valise, un mot : <span class="he">חֻפְשָׁה</span>, « vacances ».'],
    note: 'Avion, taxi, hôtel, restaurant, boutiques : le chapitre des vacances, tout au bout du pays.',
    mots: [['חֻפְשָׁה', 'vacances'], ['מָלוֹן', 'hôtel'], ['אַלְמֻגִּים', 'coraux'], ['שֶׁמֶשׁ', 'soleil']],
    histoires: ['aeroport', 'taxi', 'hotel', 'restaurant', 'vetements'] },
];
const villeDe = (idHistoire) => VILLES.find((v) => v.histoires.includes(idHistoire));

/* Décors des villes, dans le même cadre 380 × 640 que les premiers chapitres */
Object.assign(DECORS, {
  vnetanya: (u) => { const r = aleaChap(31); let reflets = ''; for (let i = 0; i < 16; i++) reflets += `<rect x="${(150 + r() * 160).toFixed(0)}" y="${(330 + r() * 120).toFixed(0)}" width="${(14 + r() * 30).toFixed(0)}" height="2" fill="#ffe2c8" opacity=".7"/>`;
    let balcons = ''; for (let y = 180; y < 500; y += 34) balcons += `<rect x="0" y="${y}" width="112" height="7" fill="#cdbba6"/><rect x="10" y="${y - 20}" width="14" height="16" fill="#8fa8c4"/><rect x="44" y="${y - 20}" width="14" height="16" fill="#8fa8c4"/><rect x="78" y="${y - 20}" width="14" height="16" fill="#8fa8c4"/>`;
    for (let y = 240; y < 500; y += 30) balcons += `<rect x="96" y="${y}" width="74" height="6" fill="#c4b098"/><rect x="108" y="${y - 18}" width="12" height="14" fill="#9cb2cc"/><rect x="140" y="${y - 18}" width="12" height="14" fill="#9cb2cc"/>`;
    const fleurs = [...Array(26).keys()].map(() => `<circle cx="${(100 + r() * 40).toFixed(0)}" cy="${(380 + r() * 90).toFixed(0)}" r="${(3 + r() * 4).toFixed(1)}" fill="${['#e5579a', '#f07cb4', '#c9407e'][Math.floor(r() * 3)]}"/>`).join('');
    return `<defs><linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a6fa0"/><stop offset=".48" stop-color="#e9a48a"/><stop offset=".6" stop-color="#ffd4a0"/></linearGradient><linearGradient id="${u}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0b890"/><stop offset=".35" stop-color="#4f86ac"/><stop offset="1" stop-color="#2a5a80"/></linearGradient></defs>
    <rect width="380" height="640" fill="url(#${u}s)"/><circle cx="250" cy="300" r="80" fill="#fff0c8" opacity=".25"/><circle cx="250" cy="300" r="38" fill="#fff0c8"/>
    <rect y="318" width="380" height="200" fill="url(#${u}m)"/>${reflets}<path d="M120 200q6-6 12 0q6-6 12 0M300 160q5-5 10 0q5-5 10 0" stroke="#5a4a6e" stroke-width="2" fill="none"/>
    <rect x="0" y="150" width="112" height="370" fill="#efe4d6"/><rect x="96" y="210" width="74" height="310" fill="#e6d6c4"/>${balcons}${fleurs}
    <path d="M150 640 L176 520 Q260 470 380 482 V640Z" fill="#d9a86a"/><path d="M200 640 L214 560 Q290 530 380 540 V640Z" fill="#c08a50"/>
    <path d="M0 520 Q100 504 200 512 V640 H0Z" fill="#e8c99a"/><path d="M0 500 H200" stroke="#5a4038" stroke-width="3"/>${[...Array(11).keys()].map((i) => `<path d="M${i * 20} 500 V518" stroke="#5a4038" stroke-width="2"/>`).join('')}
    <rect x="300" y="380" width="6" height="110" fill="#3a3040"/><path d="M290 386 h26 l-5-16 h-16z" fill="#ffe2a8"/><circle cx="303" cy="378" r="22" fill="#ffe2a8" opacity=".3"/>
    <g transform="translate(60 560)"><rect x="-40" y="-14" width="80" height="8" rx="3" fill="#6a4a38"/><rect x="-40" y="-30" width="80" height="6" rx="3" fill="#6a4a38"/><rect x="-36" y="-6" width="6" height="20" fill="#4a3428"/><rect x="30" y="-6" width="6" height="20" fill="#4a3428"/></g>`; },
  vakko: (u) => { let cr = ''; for (let x = 0; x < 380; x += 26) cr += `<rect x="${x}" y="336" width="15" height="20"/>`;
    const bateau = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-30 0H30L22 12H-22Z" fill="#6a4030"/><rect x="-1.500" y="-44" width="3" height="44" fill="#4a3026"/><path d="M1.500-42L1.500-4L26-4Z" fill="${c}"/><path d="M-1.500-36L-1.500-4L-20-4Z" fill="#f6efe2"/></g>`;
    return `<defs><linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a7fb0"/><stop offset=".55" stop-color="#f2c18c"/></linearGradient><linearGradient id="${u}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4fb0b8"/><stop offset="1" stop-color="#1f5f70"/></linearGradient><linearGradient id="${u}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9b480"/><stop offset="1" stop-color="#a87a50"/></linearGradient></defs>
    <rect width="380" height="640" fill="url(#${u}s)"/><circle cx="90" cy="230" r="44" fill="#fff0c8" opacity=".75"/>
    <rect x="132" y="262" width="110" height="80" fill="#e6cfa8"/><path d="M142 262 a45 45 0 0 1 90 0z" fill="#4f8f6a"/><path d="M187 217 v-12" stroke="#e2b445" stroke-width="3"/>
    <rect x="252" y="170" width="12" height="172" fill="#e6cfa8"/><path d="M248 172 L258 140 L268 172Z" fill="#4f8f6a"/><rect x="249" y="196" width="18" height="6" fill="#d4b890"/>
    <rect x="300" y="190" width="28" height="152" fill="#f6efe2"/>${[0, 1, 2, 3].map((i) => `<rect x="300" y="${210 + i * 34}" width="28" height="12" fill="#c75d4f"/>`).join('')}<rect x="296" y="176" width="36" height="16" fill="#3a3040"/><circle cx="314" cy="170" r="10" fill="#ffe2a8"/><circle cx="314" cy="170" r="28" fill="#ffe2a8" opacity=".3"/>
    <g fill="url(#${u}w)">${cr}<rect y="354" width="380" height="76"/></g>${[40, 120, 200, 280].map((x) => `<path d="M${x} 430 V396 a18 18 0 0 1 36 0 V430Z" fill="#7a5638"/>`).join('')}
    <rect y="430" width="380" height="210" fill="url(#${u}m)"/><g fill="#d8f4f4" opacity=".55"><rect x="60" y="470" width="50" height="2"/><rect x="200" y="510" width="70" height="2"/><rect x="110" y="580" width="60" height="2"/></g>
    ${bateau(110, 520, 1.300, '#e46a4f')}${bateau(270, 560, 1.600, '#f2c14e')}${bateau(200, 470, .8, '#4f86c6')}
    <path d="M0 610 Q60 596 120 612 Q80 640 0 640Z" fill="#6a4a38"/>`; },
  vtiberiade: (u) => { const r = aleaChap(41); let roseaux = ''; for (let i = 0; i < 22; i++) { const x = 250 + r() * 130; roseaux += `<path d="M${x.toFixed(0)} 600 q${(r() * 10 - 5).toFixed(0)} -40 ${(r() * 14 - 7).toFixed(0)} -${(60 + r() * 50).toFixed(0)}" stroke="#4a6a4a" stroke-width="2.500" fill="none"/>`; }
    return `<defs><linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fb0d0"/><stop offset=".55" stop-color="#f6d2c0"/></linearGradient><linearGradient id="${u}l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d6ecee"/><stop offset=".4" stop-color="#7fbcc8"/><stop offset="1" stop-color="#3f8aa0"/></linearGradient></defs>
    <rect width="380" height="640" fill="url(#${u}s)"/><circle cx="130" cy="282" r="64" fill="#fff0d8" opacity=".35"/><circle cx="130" cy="282" r="30" fill="#fff4dc"/>
    <path d="M0 290 Q80 250 170 278 T380 262 V330 H0Z" fill="#9a98c0"/><path d="M0 306 Q120 286 240 300 T380 296 V330 H0Z" fill="#8486b0"/>
    <rect y="320" width="380" height="240" fill="url(#${u}l)"/><g fill="#fff" opacity=".45"><rect x="100" y="300" width="60" height="2" transform="translate(0 30)"/><rect x="40" y="380" width="80" height="2"/><rect x="190" y="420" width="90" height="2"/><rect x="90" y="470" width="70" height="2"/></g>
    <g transform="translate(180 440)"><path d="M-70 0 Q0 30 70 0 L58 16 Q0 40-58 16Z" fill="#7a4e30"/><path d="M-66 4 Q0 30 66 4" stroke="#a87a50" stroke-width="2" fill="none"/><rect x="-2" y="-90" width="4" height="92" fill="#4a3026"/><path d="M2-86 L2-10 L52-12Z" fill="#f6efe2"/><path d="M-60 10 L-96 34M60 10 L96 34" stroke="#5a3a26" stroke-width="3"/></g>
    <path d="M0 560 Q190 540 380 556 V640 H0Z" fill="#cdbb92"/><path d="M0 600 Q190 588 380 600 V640 H0Z" fill="#b8a47a"/>${roseaux}
    <g transform="translate(60 600)"><path d="M0 0 Q-10-90 10-180" stroke="#5a4038" stroke-width="8" fill="none"/><g fill="#3f6a50"><path d="M10-180 q-60-8-100 30 q46-24 100-18z"/><path d="M10-180 q60-14 100 26 q-50-22-100-14z"/><path d="M10-180 q-24-40-72-36 q40 12 66 44z"/><path d="M10-180 q30-38 76-30 q-42 12-64 46z"/></g></g>`; },
  vbeersheva: (u) => { const r = aleaChap(51); let pas = ''; for (let i = 0; i < 9; i++) pas += `<ellipse cx="${(150 + i * 22 + r() * 6).toFixed(0)}" cy="${(600 - i * 12).toFixed(0)}" rx="4" ry="2.500" fill="#b8784a" opacity=".6"/>`;
    let fen = ''; [[20, 250, 70, 70], [96, 228, 56, 92], [158, 262, 64, 58]].forEach(([x, y, w, h]) => { fen += `<rect x="${x}" y="${y}" width="${w}" height="${h + 40}" fill="#efdcc0"/>`; for (let a = 0; a < Math.floor(h / 20); a++) for (let b = 0; b < Math.floor(w / 16); b++) fen += `<rect x="${x + 5 + b * 16}" y="${y + 8 + a * 20}" width="9" height="11" fill="#7fa8c8"/>`; });
    return `<defs><linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8865a"/><stop offset=".6" stop-color="#f6d29a"/></linearGradient></defs>
    <rect width="380" height="640" fill="url(#${u}s)"/><circle cx="280" cy="220" r="110" fill="#fff0c0" opacity=".3"/><circle cx="280" cy="220" r="58" fill="#fff0c0"/>
    ${fen}<path d="M0 320 Q100 296 200 312 T380 300 V400 H0Z" fill="#e9b77c"/><path d="M0 380 Q120 350 240 372 T380 360 V480 H0Z" fill="#d99a5e"/><path d="M0 470 Q140 440 260 462 T380 452 V640 H0Z" fill="#c4844a"/>
    <g transform="translate(250 452) scale(.9)" fill="#7a4a2a"><path d="M-70 0 L-62-60 Q-70-90-50-104 Q-24-124 4-110 Q16-146 40-124 Q52-112 62-124 Q72-150 88-156 Q104-160 110-146 L112-126 L100-130 Q94-104 84-84 L90 0 H76 L70-70 Q40-62 10-66 L4 0 H-10 L-14-66 Q-40-64-54-74 L-58 0Z"/></g>
    <g transform="translate(80 470)"><path d="M0 0 Q4-50-2-90" stroke="#6e5a3a" stroke-width="7" fill="none"/><path d="M-2-60 Q-30-80-40-90M0-76 Q26-96 40-100" stroke="#6e5a3a" stroke-width="4" fill="none"/><ellipse cx="0" cy="-104" rx="70" ry="18" fill="#6e7a3a"/><ellipse cx="-10" cy="-112" rx="50" ry="12" fill="#829048"/></g>${pas}`; },
  vtsfat: (u) => { const r = aleaChap(61); let etoiles = ''; for (let i = 0; i < 30; i++) etoiles += `<circle cx="${(120 + r() * 140).toFixed(0)}" cy="${(r() * 250).toFixed(0)}" r="${(.8 + r() * 1.400).toFixed(1)}" fill="#fff"/>`;
    let marches = ''; for (let i = 0; i < 12; i++) { const y = 640 - i * 26, w = 140 - i * 4; marches += `<rect x="${190 - w / 2}" y="${y - 26}" width="${w}" height="26" fill="${i % 2 ? '#d8cab0' : '#e6dac2'}"/><rect x="${190 - w / 2}" y="${y - 26}" width="${w}" height="3" fill="#b8a888"/>`; }
    const porte = (x, y, w, h) => `<path d="M${x} ${y + h}V${y + w / 2}a${w / 2} ${w / 2} 0 0 1 ${w} 0V${y + h}Z" fill="#4f86d0"/><path d="M${x + w / 2} ${y + h}V${y + w / 2 - 6}" stroke="#3a6aa8" stroke-width="2"/><circle cx="${x + w * .75}" cy="${y + h * .6}" r="2.500" fill="#f2d27a"/>`;
    const fenetre = (x, y) => `<rect x="${x}" y="${y}" width="30" height="36" rx="15" fill="#ffd98a"/><circle cx="${x + 15}" cy="${y + 20}" r="26" fill="#ffd98a" opacity=".25"/><path d="M${x + 15} ${y}V${y + 36}M${x} ${y + 18}H${x + 30}" stroke="#4f86d0" stroke-width="2.500"/>`;
    return `<defs><linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f2a5a"/><stop offset=".5" stop-color="#5a6aa8"/><stop offset=".72" stop-color="#c9a6c8"/></linearGradient></defs>
    <rect width="380" height="640" fill="url(#${u}s)"/>${etoiles}<path d="M220 80 A26 26 0 1 0 220 132 A34 34 0 0 1 220 80Z" fill="#f7e7a6"/>
    <path d="M100 330 L150 250 L190 290 L240 230 L290 320Z" fill="#3a4680"/><path d="M110 340 L170 296 L220 320 L280 300 L300 340Z" fill="#4a5690"/>
    ${marches}<path d="M0 230 L130 300 L130 640 L0 640Z" fill="#e2d4b8"/><path d="M380 230 L250 300 L250 640 L380 640Z" fill="#d6c6a8"/>
    <g stroke="#c4b490" stroke-width="1.500" opacity=".7"><path d="M0 300 L130 340M0 380 L130 400M0 470 L130 480M0 560 L130 562M380 300 L250 340M380 380 L250 400M380 470 L250 480M380 560 L250 562"/></g>
    ${porte(30, 440, 64, 130)}${porte(290, 430, 60, 120)}${fenetre(70, 320)}${fenetre(296, 330)}
    <path d="M130 300 Q190 270 250 300" stroke="#3a2a40" stroke-width="2" fill="none"/><path d="M190 286 V306" stroke="#3a2a40" stroke-width="1.500"/><path d="M182 306 h16 l-3 14 h-10z" fill="#ffd98a"/><circle cx="190" cy="314" r="20" fill="#ffd98a" opacity=".3"/>
    <g transform="translate(150 590)">${[0, 26].map((dx) => `<rect x="${dx - 3}" y="-30" width="6" height="30" fill="#fbf1de"/><path d="M${dx} -46 Q${dx + 6} -36 ${dx} -30 Q${dx - 6} -36 ${dx} -46Z" fill="#f6a640"/><circle cx="${dx}" cy="-38" r="14" fill="#ffd98a" opacity=".35"/>`).join('')}</g>`; },
  veilat: (u) => { const r = aleaChap(71); let balcons = ''; for (let y = 200; y < 440; y += 26) balcons += `<rect x="262" y="${y}" width="96" height="6" fill="#d6dee6"/><rect x="270" y="${y - 16}" width="80" height="12" fill="#9cc8dc" opacity=".8"/>`;
    const corail = [[40, 600, '#f08a9a'], [110, 620, '#f2b14e'], [300, 610, '#e46a92'], [350, 630, '#f08a9a']].map(([x, y, c]) => `<path d="M${x} ${y} q-8-30-20-40 M${x} ${y} q2-34 -2-56 M${x} ${y} q10-26 22-36" stroke="${c}" stroke-width="7" fill="none" stroke-linecap="round"/>`).join('');
    const poisson = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse rx="16" ry="9" fill="${c}"/><path d="M14 0 L26-9 L26 9Z" fill="${c}"/><path d="M-4-8V8M4-8V8" stroke="#fff" stroke-width="2.500"/><circle cx="-9" cy="-2" r="1.800" fill="#2a2030"/></g>`;
    return `<defs><linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5fa8d8"/><stop offset=".62" stop-color="#f6d6b0"/></linearGradient><linearGradient id="${u}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5fd0d0"/><stop offset="1" stop-color="#1f8aa8"/></linearGradient><linearGradient id="${u}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f8aa8"/><stop offset="1" stop-color="#0f4f78"/></linearGradient></defs>
    <rect width="380" height="640" fill="url(#${u}s)"/><circle cx="90" cy="120" r="34" fill="#fff4d0"/><circle cx="90" cy="120" r="70" fill="#fff4d0" opacity=".25"/>
    <g transform="translate(250 90) rotate(-8)"><path d="M-30 0 H30 Q38 0 38 4 Q38 8 30 8 H-24Z" fill="#fff"/><path d="M-4 4 L-16 22 H-8 L8 4Z M-24 2 L-32-8 H-26 L-18 2Z" fill="#e46a6a"/></g><path d="M222 104 Q150 120 90 116" stroke="#fff" stroke-width="2" opacity=".6" fill="none"/>
    <path d="M0 330 L40 250 L80 290 L130 210 L190 300 L230 260 L280 330Z" fill="#b85a4a"/><path d="M0 330 L60 290 L110 320 L170 270 L240 330Z" fill="#9a4a40"/>
    <rect y="320" width="380" height="150" fill="url(#${u}m)"/><g fill="#e6fbfb" opacity=".6"><rect x="50" y="360" width="60" height="2"/><rect x="160" y="400" width="80" height="2"/><rect x="90" y="440" width="70" height="2"/></g>
    <rect x="258" y="170" width="104" height="290" fill="#f6f2ea"/>${balcons}<rect x="258" y="162" width="104" height="10" fill="#e46a6a"/>
    <g transform="translate(40 470)"><path d="M0 0 Q-6-80 12-160" stroke="#6a4a38" stroke-width="7" fill="none"/><g fill="#3f8a5a"><path d="M12-160 q-56-8-90 26 q42-22 90-16z"/><path d="M12-160 q56-12 90 22 q-46-20-90-12z"/><path d="M12-160 q-22-36-66-32 q36 10 60 40z"/></g></g>
    <rect y="470" width="380" height="170" fill="url(#${u}f)"/>${corail}${poisson(180, 540, 1.300, '#f2c14e')}${poisson(260, 580, 1, '#f28a4f')}${poisson(90, 560, .9, '#7fd0f0')}
    ${[...Array(10).keys()].map(() => `<circle cx="${(r() * 380).toFixed(0)}" cy="${(490 + r() * 140).toFixed(0)}" r="${(1 + r() * 2).toFixed(1)}" fill="#e6fbfb" opacity=".6"/>`).join('')}`; },
});

/* Silhouettes du bas des affiches de villes */
Object.assign(SILHOUETTES, {
  cle: (c) => `<circle cx="90" cy="150" r="54" fill="none" stroke="${c}" stroke-width="22"/><rect x="138" y="138" width="152" height="24" rx="8" fill="${c}"/><rect x="236" y="158" width="20" height="44" fill="${c}"/><rect x="266" y="158" width="18" height="30" fill="${c}"/>`,
  voilier: (c) => `<g fill="${c}"><path d="M40 230 H280 L250 282 H70Z"/><rect x="157" y="36" width="7" height="196"/><path d="M164 46 L164 220 L268 220Z"/><path d="M157 70 L157 220 L66 220Z" opacity=".75"/></g>`,
  barque: (c) => `<g fill="${c}"><path d="M30 216 Q160 286 290 216 L272 248 Q160 304 48 248Z"/><rect x="157" y="70" width="6" height="170"/><path d="M163 78 L163 220 L250 216Z" opacity=".8"/></g><path d="M60 236 L20 286M260 236 L300 286" stroke="${c}" stroke-width="6" stroke-linecap="round"/>`,
  chameau: (c) => `<path d="M40 300 L52 210 Q40 170 70 150 Q110 120 150 140 Q170 90 200 120 Q220 140 236 120 Q250 80 270 70 Q292 64 300 84 L304 110 L286 104 Q276 140 262 170 L270 300 H250 L244 200 Q200 214 160 210 L150 300 H130 L126 210 Q90 214 70 200 L64 300Z" fill="${c}"/>`,
  bougies: (c) => [110, 210].map((x) => `<path d="M${x - 34} 300 H${x + 34} L${x + 14} 280 H${x - 14}Z M${x - 6} 280 V200 H${x + 6} V280Z M${x - 26} 200 Q${x} 180 ${x + 26} 200Z" fill="${c}"/><rect x="${x - 9}" y="110" width="18" height="76" rx="2" fill="${c}" opacity=".8"/><path d="M${x} 66 Q${x + 16} 90 ${x} 106 Q${x - 16} 90 ${x} 66Z" fill="${c}"/>`).join(''),
  poisson: (c) => `<g fill="${c}"><ellipse cx="140" cy="160" rx="100" ry="62"/><path d="M228 160 L300 96 L300 224Z"/><path d="M120 100 Q150 50 190 104Z"/><path d="M120 220 Q150 270 186 216Z"/></g><circle cx="80" cy="146" r="12" fill="#fff" opacity=".85"/><path d="M110 104 V216M160 100 V220" stroke="#fff" stroke-width="12" opacity=".35"/>`,
});

function tuileVille(v) {
  const faites = v.histoires.filter((id) => S.story[id]).length, tout = faites === v.histoires.length;
  return `<a class="chap" href="#/histoire/${v.id}">${decorSvg(v.id, 'ch-img')}<div class="ch-t"><small>Chapitre ${v.num} · ${faites}/${v.histoires.length} histoires${tout ? ' ✓' : ''}</small><h3>${esc(v.lieu)}</h3><span class="he" lang="he" dir="rtl">${esc(v.he)}</span><p>${esc(v.theme)}</p></div></a>`;
}

function afficheVille(v) {
  const u = 'a' + v.id, faites = v.histoires.filter((id) => S.story[id]).length;
  const ligne = (id) => {
    const st = STORIES_VIE.find((s) => s.id === id);
    if (!st) return '';
    const fini = !!S.story[id], carte = !!S.postcards[id];
    return `<a class="v-hist${fini ? ' fini' : ''}" href="#/histoire/${id}/jouer"><span class="v-em">${st.emoji}</span><span class="v-txt"><b>${esc(st.title)}</b><small>Avec ${esc(st.who.replace(/^(L’|La |Le )/, (m) => m.toLowerCase()))}</small></span><span class="v-etat">${fini ? '✓' : '▸'}${carte ? ' 💌' : ''}</span></a>`;
  };
  return `<article class="poster" style="--pd:${v.pal.d};--pp:${v.pal.p};--pt:${v.pal.t};--pi:${v.pal.i}">
    <p class="p-devise"><span>◇</span> ${esc(v.devise)} <span>◇</span></p>
    <div class="p-top">
      <svg class="p-win" viewBox="0 0 380 640" aria-hidden="true"><clipPath id="${u}clip"><path d="${bordEclabousse(v.num * 7 + 3)}"/></clipPath><g clip-path="url(#${u}clip)">${DECORS[v.id](u)}</g></svg>
      <div class="p-name"><i class="p-dia"></i><small>Chapitre ${v.num} · ${esc(v.theme)}</small><h2>${esc(v.lieu)}</h2><span class="he p-he" lang="he" dir="rtl">${esc(v.he)}</span><div class="p-rule"></div>${v.poeme.map((l) => `<p>${l}</p>`).join('')}</div>
    </div>
    <svg class="p-ridge" viewBox="0 0 740 120" preserveAspectRatio="none" aria-hidden="true"><path d="${CRETES[v.ridge]}" fill="${v.pal.p}"/></svg>
    <div class="p-bottom">
      <div class="p-info">
        <p class="p-note">${esc(v.note)}</p>
        <div class="p-box"><b>${faites}/${v.histoires.length} histoires terminées</b><br>Dans l’ordre que tu veux · une carte postale par histoire</div>
        <div class="p-mots">${v.mots.map(([he, fr]) => `<button data-say="${esc(he)}"><span class="he" lang="he" dir="rtl">${esc(he)}</span><small>${esc(fr)}</small></button>`).join('')}</div>
      </div>
      <svg class="p-sil" viewBox="0 0 320 300" aria-hidden="true">${SILHOUETTES[v.sil](v.pal.d)}</svg>
    </div>
    <div class="v-histoires">${v.histoires.map(ligne).join('')}</div>
  </article>`;
}
