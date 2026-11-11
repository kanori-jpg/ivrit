'use strict';
/* Affiches de chapitres et cartes postales : un lieu par histoire. */
const CHAPITRES = {
  noa: { lieu: 'Tel-Aviv', he: 'תֵּל אָבִיב', devise: 'Là où la journée commence par un café', num: 1,
    pal: { d: '#1d4a66', p: '#f6dcc4', t: '#ffe9d6', i: '#1d4a66' }, ridge: 'vagues', sil: 'palmier',
    poeme: ['La ville blanche s’éveille face à la mer.', 'Ici, on se salue d’un seul mot :', '<span class="he">שָׁלוֹם</span>, bonjour et paix à la fois.'],
    note: 'Sur le front de mer, les cafés ouvrent avec le soleil. Ta première conversation t’y attend.',
    mots: [['יָם', 'mer'], ['חוֹף', 'plage'], ['קָפֶה', 'café'], ['שֶׁמֶשׁ', 'soleil']] },
  shouk: { lieu: 'Jérusalem', he: 'יְרוּשָׁלַיִם', devise: 'Là où chaque pierre a une histoire', num: 2,
    pal: { d: '#6e3a4e', p: '#f2dcc6', t: '#fbe9dc', i: '#5a2f40' }, ridge: 'remparts', sil: 'tour',
    poeme: ['Le soir, la pierre devient dorée.', 'Au marché, les voix se mêlent', 'et chaque fruit a son nom à apprendre.'],
    note: 'Passe la porte de la vieille ville et va faire tes courses chez Dan, le marchand de fruits.',
    mots: [['שׁוּק', 'marché'], ['שַׁעַר', 'porte'], ['חוֹמָה', 'rempart'], ['תַּפּוּחַ', 'pomme']] },
  gueshem: { lieu: 'Haïfa', he: 'חֵיפָה', devise: 'Là où la pluie descend vers la mer', num: 3,
    pal: { d: '#33415e', p: '#d6dfe8', t: '#e6eef6', i: '#2a3650' }, ridge: 'collines', sil: 'parapluie',
    poeme: ['La ville grimpe sur sa montagne.', 'Quand il pleut, les rues deviennent des ruisseaux,', 'et l’on cherche sa <span class="he">מִטְרִיָּה</span>.'],
    note: 'Un jour de pluie sur le mont Carmel : tu croises ton ami Yossi au coin de la rue.',
    mots: [['גֶּשֶׁם', 'pluie'], ['מִטְרִיָּה', 'parapluie'], ['תִּיק', 'sac'], ['הַר', 'montagne']] },
  eingedi: { lieu: 'Ein Guedi', he: 'עֵין גֶּדִי', devise: 'Là où les mots coulent de source', num: 4,
    pal: { d: '#163845', p: '#bfe3e6', t: '#bff0ee', i: '#163845' }, ridge: 'montagnes', sil: 'bouquetin',
    poeme: ['L’eau ici ne fait pas de bruit. Elle dure.', 'En hébreu, <span class="he">עַיִן</span> veut dire « œil »', 'et aussi « source ».'],
    note: 'Entre le désert de Judée et la mer Morte, l’oasis cache ses cascades, gardées par les bouquetins.',
    mots: [['מַפָּל', 'cascade'], ['סֶלַע', 'rocher'], ['יָעֵל', 'bouquetin'], ['מַיִם', 'eau']] },
  tsippori: { lieu: 'Tsippori', he: 'צִפּוֹרִי', devise: 'Là où dormaient les mots anciens', num: 5,
    pal: { d: '#6a5a7e', p: '#e3dcec', t: '#f4ecfa', i: '#4f4064' }, ridge: 'prairie', sil: 'tulipes',
    poeme: ['Les tulipes poussent où se dressaient les maisons.', 'Son nom vient de <span class="he">צִפּוֹר</span>, « oiseau » :', 'perchée sur sa colline, la ville regardait la Galilée.'],
    note: 'L’hébreu aussi a dormi des siècles… avant de se réveiller. Avi t’attend devant la mosaïque.',
    mots: [['פְּסֵיפָס', 'mosaïque'], ['אֶבֶן', 'pierre'], ['עַתִּיק', 'ancien'], ['צִבְעוֹנִי', 'tulipe']] },
};

/* Petit générateur reproductible pour que chaque dessin reste identique */
function aleaChap(n) { let s = n; return () => (s = (s * 9301 + 49297) % 233280) / 233280; }

/* Les cinq décors, dessinés pour un cadre de 380 × 640 */
const DECORS = {
  noa: (u) => { const r = aleaChap(3); let pl = ''; for (let i = 0; i < 18; i++) pl += `<rect x="${(r() * 340).toFixed(0)}" y="${(330 + r() * 130).toFixed(0)}" width="${(16 + r() * 34).toFixed(0)}" height="2" fill="#ffe2c8" opacity=".7"/>`;
    return `<defs><linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f7fa8"/><stop offset=".45" stop-color="#f0b48a"/><stop offset=".6" stop-color="#ffd9a8"/></linearGradient><linearGradient id="${u}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2c79e"/><stop offset=".3" stop-color="#5fa0bc"/><stop offset="1" stop-color="#1f5f80"/></linearGradient></defs>
    <rect width="380" height="640" fill="url(#${u}s)"/><circle cx="250" cy="280" r="46" fill="#fff0c8"/><circle cx="250" cy="280" r="90" fill="#fff0c8" opacity=".25"/>
    <rect y="310" width="380" height="180" fill="url(#${u}m)"/>${pl}
    <path d="M190 400 v-70 l44 62z" fill="#fff"/><path d="M160 402 h84 l-14 16 h-58z" fill="#e8805a"/>
    <g fill="#f4efe6"><rect x="0" y="210" width="96" height="290"/><rect x="60" y="270" width="80" height="230"/></g>
    <g fill="#d8cfc0"><rect x="0" y="240" width="96" height="10" rx="5"/><rect x="0" y="290" width="96" height="10" rx="5"/><rect x="0" y="340" width="96" height="10" rx="5"/><rect x="0" y="390" width="96" height="10" rx="5"/><rect x="60" y="310" width="84" height="9" rx="4"/><rect x="60" y="360" width="84" height="9" rx="4"/><rect x="60" y="410" width="84" height="9" rx="4"/></g>
    <path d="M0 500 Q190 470 380 490 V640 H0Z" fill="#f2dfb8"/><path d="M0 560 Q190 530 380 556 V640 H0Z" fill="#e6c996"/>
    <path d="M300 470 q-12 -60 12 -110" stroke="#5a4038" stroke-width="7" fill="none"/><g fill="#2f6a55"><path d="M312 360 q-40 -6 -64 22 q34 -14 64 -14z"/><path d="M312 360 q40 -8 64 18 q-34 -12 -64 -10z"/><path d="M312 360 q-16 -36 -50 -42 q28 16 46 46z"/><path d="M312 360 q20 -34 54 -36 q-30 16 -48 42z"/></g>
    <g transform="translate(120 540)"><path d="M-40 0 a40 26 0 0 1 80 0z" fill="#e8805a"/><path d="M-13 0 a13 26 0 0 1 26 0z" fill="#fff"/><rect x="-1.5" y="0" width="3" height="40" fill="#5a4038"/></g>`; },
  shouk: (u) => { let cr = ''; for (let x = 0; x < 380; x += 26) cr += `<rect x="${x}" y="316" width="15" height="22"/>`;
    const r = aleaChap(5); let fl = ''; for (let i = 0; i < 60; i++) fl += `<circle cx="${(250 + r() * 140).toFixed(0)}" cy="${(420 + r() * 120).toFixed(0)}" r="${(2 + r() * 5).toFixed(1)}" fill="${['#f6cfdc', '#fbeaf0', '#efb6ca'][Math.floor(r() * 3)]}"/>`;
    return `<defs><linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a4a78"/><stop offset=".45" stop-color="#d88a86"/><stop offset=".62" stop-color="#f6c890"/></linearGradient><linearGradient id="${u}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9b080"/><stop offset="1" stop-color="#8f5f58"/></linearGradient></defs>
    <rect width="380" height="640" fill="url(#${u}s)"/><circle cx="110" cy="250" r="60" fill="#fff0c8" opacity=".7"/>
    <path d="M150 300 a42 42 0 0 1 84 0z" fill="#e2b445"/><rect x="146" y="298" width="92" height="40" fill="#b98a78"/>
    <g fill="#b98a78"><rect x="278" y="196" width="50" height="150"/><rect x="272" y="186" width="62" height="12"/><path d="M290 186 v-26 h26 v26z"/></g><path d="M293 160 a10 10 0 0 1 20 0z" fill="#9c7468"/>
    <g fill="url(#${u}w)">${cr}<rect y="336" width="380" height="240"/></g>
    <path d="M150 576 V440 a42 42 0 0 1 84 0 V576Z" fill="#3a2430"/><path d="M160 576 V444 a32 32 0 0 1 64 0 V576Z" fill="#f6b870"/><g stroke="#8f5f58" stroke-width="1" opacity=".55"><path d="M0 380 H150 M234 380 H380 M0 430 H150 M234 430 H380 M0 480 H150 M234 480 H380 M0 530 H150 M234 530 H380"/></g>
    <path d="M0 576 Q190 556 380 576 V640 H0Z" fill="#5a3a44"/>
    <g stroke="#3a2430" stroke-width="5" fill="none" stroke-linecap="round"><path d="M372 590 Q330 530 300 470"/><path d="M340 530 Q320 500 280 490"/><path d="M322 500 Q340 470 370 450"/></g>${fl}`; },
  gueshem: (u) => { const r = aleaChap(11); let pl = ''; for (let i = 0; i < 110; i++) { const x = r() * 380, y = r() * 600; pl += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="1.4" height="11" fill="#fff" opacity=".55"/>`; }
    let h = ''; [[20, 320, 56, 70], [84, 280, 50, 110], [140, 330, 44, 60], [190, 290, 60, 100], [258, 340, 50, 50], [310, 300, 60, 90]].forEach(([x, y, w, ht], i) => { h += `<rect x="${x}" y="${y}" width="${w}" height="${ht + 90}" fill="${i % 2 ? '#c8cfdc' : '#aeb8cc'}"/>`; for (let a = 0; a < 3; a++) for (let b = 0; b < 2; b++) h += `<rect x="${x + 8 + b * (w / 2)}" y="${y + 10 + a * 24}" width="11" height="13" fill="${(a + b + i) % 3 ? '#6d7c98' : '#ffe2a8'}"/>`; });
    return `<defs><linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4f5f80"/><stop offset=".55" stop-color="#a9b6cc"/></linearGradient><linearGradient id="${u}r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7c869c"/><stop offset="1" stop-color="#454f68"/></linearGradient></defs>
    <rect width="380" height="640" fill="url(#${u}s)"/><path d="M0 250 Q120 170 240 220 T380 200 V420 H0Z" fill="#7584a0"/><rect y="250" width="130" height="50" fill="#a9c0d4" opacity=".5"/>
    ${h}<path d="M0 450 Q190 430 380 450 V640 H0Z" fill="url(#${u}r)"/><g fill="#c4cede" opacity=".5"><ellipse cx="100" cy="560" rx="60" ry="6"/><ellipse cx="290" cy="600" rx="70" ry="7"/></g>
    <rect x="48" y="360" width="6" height="150" fill="#2a3044"/><path d="M38 366 h26 l-4 -18 h-18z" fill="#ffe2a8"/>
    <g transform="translate(210 520)"><path d="M-62 -60 a62 50 0 0 1 124 0z" fill="#d86a7c"/><path d="M-22 -60 a22 50 0 0 1 44 0z" fill="#ee8e9c"/><rect x="-1.5" y="-60" width="3" height="66" fill="#2a3044"/><circle cx="-14" cy="-34" r="11" fill="#2a2030"/><path d="M-28 -24 h28 v42 h-28z" fill="#3a4a68"/><g fill="#2a2030"><rect x="-26" y="18" width="9" height="24"/><rect x="-11" y="18" width="9" height="24"/></g></g>${pl}`; },
  eingedi: (u) => `<defs><linearGradient id="${u}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a5f8a"/><stop offset=".55" stop-color="#3f7fb0"/><stop offset="1" stop-color="#1c4f78"/></linearGradient><linearGradient id="${u}p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fe0f0"/><stop offset=".4" stop-color="#4fa8d8"/><stop offset="1" stop-color="#1f5f9a"/></linearGradient><linearGradient id="${u}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8fbff"/><stop offset="1" stop-color="#9fe0f0"/></linearGradient><radialGradient id="${u}g"><stop offset="0" stop-color="#6ff2f0" stop-opacity=".8"/><stop offset="1" stop-color="#6ff2f0" stop-opacity="0"/></radialGradient></defs>
    <g transform="translate(-40 -150)"><rect x="40" y="150" width="380" height="640" fill="url(#${u}c)"/><g fill="#5a8fc0" opacity=".85"><path d="M40 150 L120 150 L110 420 L40 470Z"/><path d="M420 150 L330 150 L345 380 L420 420Z"/></g><g fill="#7ab0d8" opacity=".6"><path d="M150 150 L200 150 L190 300 L160 320Z"/><path d="M260 150 L300 150 L290 280 L270 300Z"/></g>
    <path d="M80 380 L180 360 L240 420 L330 380 L420 420 L420 520 L40 520 L40 400Z" fill="#2a5f8a"/><rect x="160" y="240" width="42" height="190" fill="url(#${u}f)"/><rect x="182" y="380" width="34" height="100" fill="url(#${u}f)"/><ellipse cx="200" cy="480" rx="60" ry="12" fill="#e8fbff" opacity=".7"/>
    <rect x="40" y="480" width="380" height="310" fill="url(#${u}p)"/><g fill="#e8fbff" opacity=".6"><rect x="110" y="540" width="60" height="2"/><rect x="230" y="580" width="80" height="2"/><rect x="150" y="640" width="70" height="2"/><rect x="280" y="690" width="60" height="2"/></g>
    <path d="M40 640 Q90 620 150 650 Q120 680 40 690Z" fill="#0f2a35"/><path d="M330 520 Q380 500 420 520 L420 560 Q370 560 330 520Z" fill="#0f2a35"/>
    <g transform="translate(330 470)" fill="#0f2a35"><path d="M0 0 h50 v6 h-50z"/><path d="M8 0 l2 -14 l26 -2 l6 -10 l6 2 l-2 10 l-4 4 l-2 10 h-4 l0 -8 l-18 2 l-2 6z"/><path d="M42 -26 q-8 -14 -2 -24 q2 10 6 18z"/></g>
    <circle cx="110" cy="660" r="60" fill="url(#${u}g)"/><circle cx="300" cy="740" r="70" fill="url(#${u}g)"/><g fill="#6ff2f0"><path d="M90 660 q10 -40 20 -8 q8 -30 14 4 q12 -20 10 10z"/><path d="M270 760 q8 -50 22 -10 q10 -40 18 6 q14 -26 12 12z"/><path d="M330 700 q6 -30 14 -4 q6 -24 12 2z"/></g><g stroke="#0f2a35" stroke-width="3" fill="none"><path d="M70 680 q10 -40 2 -70"/><path d="M84 680 q16 -46 30 -60"/><path d="M250 780 q6 -50 -6 -84"/><path d="M262 780 q14 -60 40 -80"/></g></g>`,
  tsippori: (u) => { const r = aleaChap(21); let lu = ''; [[40, 610, 120, '#b06ad0'], [80, 640, 150, '#c98ae0'], [130, 630, 110, '#9a5ac0'], [260, 640, 140, '#b06ad0'], [310, 610, 120, '#c98ae0'], [350, 650, 160, '#9a5ac0'], [210, 650, 90, '#d8a6e8']].forEach(([x, y, h, c]) => { for (let i = 0; i < 14; i++) { const t = i / 14, yy = y - t * h, w = (1 - t * .7) * h * .12; lu += `<ellipse cx="${(x - w * .6).toFixed(1)}" cy="${yy.toFixed(1)}" rx="${(w * .55).toFixed(1)}" ry="${(w * .38).toFixed(1)}" fill="${c}"/><ellipse cx="${(x + w * .6).toFixed(1)}" cy="${(yy - 3).toFixed(1)}" rx="${(w * .55).toFixed(1)}" ry="${(w * .38).toFixed(1)}" fill="${c}"/>`; } });
    let pe = ''; for (let i = 0; i < 16; i++) pe += `<circle cx="${(r() * 380).toFixed(0)}" cy="${(r() * 300).toFixed(0)}" r="${(1.6 + r() * 2).toFixed(1)}" fill="#f2c6e6"/>`;
    return `<defs><linearGradient id="${u}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbeaf6"/><stop offset=".45" stop-color="#e9c6e6"/><stop offset="1" stop-color="#b58ac8"/></linearGradient><radialGradient id="${u}l"><stop offset="0" stop-color="#fff"/><stop offset=".3" stop-color="#ffe8f6" stop-opacity=".8"/><stop offset="1" stop-color="#ffe8f6" stop-opacity="0"/></radialGradient></defs>
    <rect width="380" height="640" fill="url(#${u}f)"/><g fill="#d8b4dc" opacity=".8"><ellipse cx="70" cy="240" rx="70" ry="40"/><ellipse cx="300" cy="230" rx="70" ry="44"/></g>
    <g fill="#c9a6d4"><rect x="80" y="230" width="14" height="90"/><rect x="76" y="224" width="22" height="8"/><rect x="260" y="210" width="14" height="110"/><rect x="256" y="204" width="22" height="8"/><rect x="290" y="260" width="12" height="60"/><path d="M110 320 v-60 a40 40 0 0 1 80 0 v8 h-12 v-6 a28 28 0 0 0 -56 0 v58z"/></g>
    <path d="M0 370 Q160 320 380 370 V640 H0Z" fill="#d6b0dc"/><path d="M130 640 Q160 490 190 340 L210 340 Q220 490 290 640Z" fill="#e9d0ec"/>
    <g fill="#8a6a9e"><ellipse cx="160" cy="350" rx="12" ry="5"/><ellipse cx="196" cy="356" rx="10" ry="4"/><ellipse cx="218" cy="348" rx="8" ry="4"/><ellipse cx="230" cy="364" rx="9" ry="4"/></g>
    <g transform="translate(70 410) rotate(-8)"><rect width="70" height="42" fill="#efe0f2" stroke="#8a6a9e" stroke-width="2"/><g fill="#b58ac8"><rect x="6" y="6" width="8" height="8"/><rect x="18" y="6" width="8" height="8"/><rect x="30" y="6" width="8" height="8"/><rect x="42" y="6" width="8" height="8"/><rect x="54" y="6" width="8" height="8"/></g><path d="M12 30 q12 -12 24 0 q12 12 24 0" stroke="#8a6a9e" stroke-width="2" fill="none"/></g>
    <circle cx="200" cy="336" r="40" fill="url(#${u}l)"/><path d="M186 340 q14 10 30 0 q-2 8 -16 8 q-12 0 -14 -8z" fill="#8a6a9e"/><path d="M200 334 q-5 -8 0 -16 q5 8 0 16z" fill="#fff"/>
    <g fill="#6a5a7e"><path d="M30 370 q20 -40 60 -20 q10 20 -10 34z"/><path d="M290 390 q30 -36 70 -10 l-10 30z"/></g>${lu}${pe}`; },
};

/* Séparations entre les deux tons (cadre 740 × 120) */
const CRETES = {
  vagues: 'M0 120 V70 Q46 40 92 70 T185 70 T278 70 T370 70 T463 70 T555 70 T648 70 T740 70 V120Z',
  remparts: 'M0 120 V70 H40 V48 H70 V70 H110 V48 H140 V70 H180 V48 H210 V70 H250 V48 H280 V70 H320 V48 H350 V70 H390 V48 H420 V70 H460 V48 H490 V70 H530 V48 H560 V70 H600 V48 H630 V70 H670 V48 H700 V70 H740 V120Z',
  collines: 'M0 120 V90 Q90 30 190 66 T380 56 T570 40 T740 22 V120Z',
  montagnes: 'M0 120 V96 L40 72 L70 90 L120 46 L160 66 L210 16 L260 40 L300 6 L350 30 L400 0 L440 22 L480 0 L520 18 L560 0 L600 16 L640 0 L690 14 L740 0 V120Z',
  prairie: 'M0 120 V98 Q130 90 250 66 T520 34 T740 8 V120Z',
};

/* Grandes silhouettes du bas de l'affiche */
const SILHOUETTES = {
  palmier: (c) => `<path d="M170 300 Q130 170 186 56" stroke="${c}" stroke-width="20" fill="none" stroke-linecap="round"/><g fill="${c}"><path d="M186 56 q-90 -14 -150 46 q70 -34 150 -26z"/><path d="M186 56 q90 -20 150 40 q-74 -32 -150 -22z"/><path d="M186 56 q-36 -56 -108 -52 q60 18 100 66z"/><path d="M186 56 q44 -54 112 -46 q-62 18 -96 68z"/></g>`,
  tour: (c) => `<g fill="${c}"><rect x="96" y="96" width="120" height="204"/><rect x="82" y="78" width="148" height="22"/><rect x="82" y="58" width="26" height="24"/><rect x="143" y="58" width="26" height="24"/><rect x="204" y="58" width="26" height="24"/><rect x="134" y="20" width="44" height="40"/><path d="M134 20 a22 22 0 0 1 44 0z"/></g><g fill="#fff" opacity=".35"><rect x="124" y="130" width="14" height="26" rx="7"/><rect x="174" y="130" width="14" height="26" rx="7"/><rect x="149" y="200" width="14" height="26" rx="7"/></g>`,
  parapluie: (c) => `<path d="M40 150 a120 110 0 0 1 240 0z" fill="${c}"/><path d="M40 150 q30 -16 60 0 q30 -16 60 0 q30 -16 60 0 q30 -16 60 0" fill="#fff" opacity="0"/><path d="M160 150 V276 q0 22 -26 22 q-24 0 -24 -22" stroke="${c}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M160 40 v-18" stroke="${c}" stroke-width="7" stroke-linecap="round"/>`,
  bouquetin: (c) => `<g fill="${c}"><path d="M40 300 L50 230 Q40 190 70 164 Q104 138 150 128 Q176 120 184 96 L190 70 Q196 50 216 46 L250 42 Q272 44 284 62 L294 84 Q298 96 286 100 L264 102 Q250 106 242 118 Q262 170 284 240 Q296 280 304 300Z"/><path d="M260 100 Q258 128 244 138 Q242 118 248 102Z"/><path d="M204 56 Q180 50 168 60 Q186 68 206 66Z"/><path d="M226 46 C216 -26 150 -66 86 -48 C58 -40 46 -16 56 12 C66 -14 92 -26 124 -22 C170 -14 200 18 208 50Z" transform="translate(0 46)"/></g><circle cx="250" cy="62" r="3.6" fill="#fff"/>`,
  tulipes: (c) => { let o = ''; [[90, 280, 130], [170, 295, 190], [250, 285, 110]].forEach(([x, y, h]) => { const t = y - h; o += `<path d="M${x} ${y}V${t}" stroke="${c}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M${x} ${y - 25}C${x - 30} ${y - 60} ${x - 32} ${y - 95} ${x - 26} ${y - 110}C${x - 12} ${y - 85} ${x - 4} ${y - 60} ${x} ${y - 40}Z" fill="${c}"/><path d="M${x - 24} ${t + 4}C${x - 28} ${t - 18} ${x - 26} ${t - 34} ${x - 22} ${t - 44}L${x - 9} ${t - 26}L${x} ${t - 48}L${x + 9} ${t - 26}L${x + 22} ${t - 44}C${x + 26} ${t - 34} ${x + 28} ${t - 18} ${x + 24} ${t + 4}C${x + 12} ${t + 16} ${x - 12} ${t + 16} ${x - 24} ${t + 4}Z" fill="${c}"/>`; }); return o; },
};

/* Bord éclaboussé de la fenêtre illustrée */
function bordEclabousse(graine) {
  const r = aleaChap(graine), cx = 190, cy = 320, rx = 172, ry = 300, n = 90; let d = '';
  for (let i = 0; i <= n; i++) { const a = i / n * 6.2832, k = 1 + (r() - .5) * .12 + (r() < .12 ? .05 : -.02); d += `${i ? 'L' : 'M'}${(cx + Math.cos(a) * rx * k).toFixed(1)} ${(cy + Math.sin(a) * ry * k).toFixed(1)}`; }
  return d + 'Z';
}

const decorSvg = (id, classe = '') => `<svg class="${classe}" viewBox="0 0 380 640" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${DECORS[id]('d' + id + classe.replace(/\W/g, ''))}</svg>`;

/* Affiche complète d'un chapitre */
function afficheChapitre(st) {
  const c = CHAPITRES[st.id], fini = !!S.story[st.id];
  const u = 'a' + st.id;
  return `<article class="poster" style="--pd:${c.pal.d};--pp:${c.pal.p};--pt:${c.pal.t};--pi:${c.pal.i}">
    <p class="p-devise"><span>◇</span> ${esc(c.devise)} <span>◇</span></p>
    <div class="p-top">
      <svg class="p-win" viewBox="0 0 380 640" aria-hidden="true"><clipPath id="${u}clip"><path d="${bordEclabousse(c.num * 7 + 3)}"/></clipPath><g clip-path="url(#${u}clip)">${DECORS[st.id](u)}</g></svg>
      <div class="p-name"><i class="p-dia"></i><small>Chapitre ${c.num}</small><h2>${esc(c.lieu)}</h2><span class="he p-he" lang="he" dir="rtl">${esc(c.he)}</span><div class="p-rule"></div>${c.poeme.map((l) => `<p>${l}</p>`).join('')}</div>
    </div>
    <svg class="p-ridge" viewBox="0 0 740 120" preserveAspectRatio="none" aria-hidden="true"><path d="${CRETES[c.ridge]}" fill="${c.pal.p}"/></svg>
    <div class="p-bottom">
      <div class="p-info">
        <p class="p-note">${esc(c.note)}</p>
        <div class="p-box"><b>${esc(st.title)}</b><br>Avec ${esc(st.who)} · ${st.lines.length} répliques</div>
        <div class="p-mots">${c.mots.map(([he, fr]) => `<button data-say="${esc(he)}"><span class="he" lang="he" dir="rtl">${esc(he)}</span><small>${esc(fr)}</small></button>`).join('')}</div>
        <div class="row mt"><a class="btn" href="#/histoire/${st.id}/jouer">▸ ${fini ? 'Rejouer le chapitre' : 'Entrer dans le chapitre'}</a>${fini ? `<a class="btn ghost" href="#/carte/${st.id}">💌 Ma carte postale</a>` : ''}</div>
      </div>
      <svg class="p-sil" viewBox="0 0 320 300" aria-hidden="true">${SILHOUETTES[c.sil](c.pal.d)}</svg>
    </div>
  </article>`;
}

/* Cartes postales */
const dateFr = (k) => new Date(k + 'T00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
function petiteCarte(st) {
  const c = CHAPITRES[st.id], date = S.postcards[st.id];
  if (!date) return `<div class="pc lock" style="background:${c.pal.d}"><b>${esc(c.lieu)}</b><small>🔒 chapitre ${c.num}</small></div>`;
  return `<a class="pc" href="#/carte/${st.id}">${decorSvg(st.id, 'pc-img')}<span class="pc-h">♥</span><b>${esc(c.lieu)}</b><small>${dateFr(date)}</small></a>`;
}
function carte(id) {
  if (!STORIES.some((s) => s.id === id) && typeof carteVie === 'function') return carteVie(id);
  const st = STORIES.find((s) => s.id === id), c = CHAPITRES[id];
  if (!st || !S.postcards[id]) { location.hash = '#/histoire'; return; }
  const date = new Date(S.postcards[id] + 'T00:00');
  const i = STORIES.indexOf(st), prev = STORIES.slice(0, i).reverse().find((s) => S.postcards[s.id]), next = STORIES.slice(i + 1).find((s) => S.postcards[s.id]);
  app.innerHTML = `<div class="q-head"><a href="#/histoire">← Mes histoires</a><span>💌 Carte postale</span></div>
  <div class="postcard">
    <div class="pg-photo">${decorSvg(id, 'pg-img')}<div class="pg-title"><h2>${esc(c.lieu)}</h2><span class="he" lang="he" dir="rtl">${esc(c.he)}</span></div>
      <div class="pg-date"><b>${date.getDate()}</b><span>${date.toLocaleDateString('fr-FR', { month: 'long' })}<br>${date.getFullYear()}</span></div></div>
    <div class="pg-side">
      <p class="cap">Souvenir de</p><h3>${esc(st.title)}</h3><p class="sub">${esc(c.devise)}.</p>
      <p class="cap">Mots du lieu</p>
      <div class="pg-mots">${c.mots.map(([he, fr]) => `<button data-say="${esc(he)}"><span class="he" lang="he" dir="rtl">${esc(he)}</span><small>${esc(fr)}</small></button>`).join('')}</div>
      <div class="row mt">${prev ? `<a class="btn ghost" href="#/carte/${prev.id}">← ${esc(CHAPITRES[prev.id].lieu)}</a>` : ''}${next ? `<a class="btn" href="#/carte/${next.id}">${esc(CHAPITRES[next.id].lieu)} →</a>` : ''}</div>
    </div>
  </div>`;
}
