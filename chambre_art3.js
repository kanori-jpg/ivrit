'use strict';
/* Ma chambre, 3e collection (18/11/2026) : 20 objets de plus. Mêmes conventions que chambre_art.js. */
const chOmbreSol = (rx, ry = 5) => `<ellipse rx="${rx}" ry="${ry}" fill="#2b1f3a" opacity=".2"/>`;
const chFeuilleMonstera = (x, y, a, n) => `<g transform="translate(${x} ${y}) rotate(${a})"><path d="M0 0Q${n * .7}-${n * .4} ${n * .45}-${n}Q0-${n * 1.1}-${n * .45}-${n}Q-${n * .7}-${n * .4} 0 0Z" fill="#4f9a68"/>${[.35, .55, .75].map((t) => `<path d="M${n * .5 * (1 - t)}-${n * t}l${n * .22}-${n * .04}M-${n * .5 * (1 - t)}-${n * t}l-${n * .22}-${n * .04}" stroke="#e9e1f2" stroke-width="${n * .05}" stroke-linecap="round"/>`).join('')}<path d="M0 0V-${n * .95}" stroke="#2f6e48" stroke-width="1.200" opacity=".6"/></g>`;

Object.assign(CH_OBJETS, {
  monstera: { x: 760, y: 512, art: () => `${chOmbreSol(40, 6)}<path d="M-4-44Q-14-80-30-104M0-44Q2-100 6-130M4-44Q16-80 32-100" stroke="#3f7a52" stroke-width="2.500" fill="none"/>
    ${chFeuilleMonstera(-30, -100, -40, 40)}${chFeuilleMonstera(6, -126, 5, 44)}${chFeuilleMonstera(32, -96, 45, 38)}${chFeuilleMonstera(-10, -70, -70, 30)}
    <path d="M-28-46H28L23-4Q22 0 17 0H-17Q-22 0-23-4Z" fill="#f5efe3"/><rect x="-31" y="-52" width="62" height="9" rx="3" fill="#e8dfd3"/><ellipse cy="-50" rx="26" ry="3" fill="#5a3d2a"/><path d="M-24-30H24" stroke="#c9b6e6" stroke-width="3" opacity=".7"/>` },
  'panier-chat': { x: 300, y: 500, art: () => `${chOmbreSol(48, 7)}<path d="M-44-30Q-46-4-34 0H34Q46-4 44-30Z" fill="#d9a46a"/>${[-36, -24, -12, 0, 12, 24, 36].map((x) => `<path d="M${x}-28V-2" stroke="#b07d45" stroke-width="1.500" opacity=".7"/>`).join('')}${[-22, -14, -6].map((y) => `<path d="M-43 ${y}H43" stroke="#b07d45" stroke-width="1.200" opacity=".55"/>`).join('')}
    <ellipse cy="-30" rx="40" ry="10" fill="#f1c9d6"/><path d="M14-36Q34-34 30-46Q26-52 18-48" stroke="#e8955a" stroke-width="7" fill="none" stroke-linecap="round"/>
    <ellipse cx="2" cy="-40" rx="26" ry="13" fill="#f0a868"/><circle cx="-18" cy="-44" r="12" fill="#f0a868"/>
    <path d="M-28-54L-26-64L-20-55Z M-14-55L-10-64L-7-53Z" fill="#f0a868"/><path d="M-24-44Q-21-42-18-44M-16-44Q-13-42-10-44" stroke="#5a3418" stroke-width="1.200" fill="none" stroke-linecap="round"/>
    <path d="M-2-48l6 0M-2-42l7 0M0-36l6 0" stroke="#d07e3a" stroke-width="2" stroke-linecap="round"/><path d="M-36-30Q0-22 36-30" stroke="#d99a6a" stroke-width="3" fill="none"/>` },
  valise: { x: 120, y: 500, art: () => `${chOmbreSol(44, 6)}<path d="M-14-62V-70Q-14-74-10-74H10Q14-74 14-70V-62" stroke="#7d5136" stroke-width="4" fill="none"/>
    <rect x="-44" y="-62" width="88" height="58" rx="7" fill="#e46a6a"/><rect x="-44" y="-62" width="88" height="58" rx="7" fill="none" stroke="#b84a4a" stroke-width="2"/><path d="M-30-62V-4M30-62V-4" stroke="#b84a4a" stroke-width="3"/>
    <circle cx="-30" cy="-2" r="4" fill="#3a2730"/><circle cx="30" cy="-2" r="4" fill="#3a2730"/>
    <g transform="rotate(-10 -12 -40)"><rect x="-24" y="-50" width="24" height="16" rx="3" fill="#fbf5ec"/><text x="-12" y="-39" text-anchor="middle" font-size="7" fill="#2f8fb0" font-weight="700">TLV</text></g>
    <circle cx="14" cy="-28" r="9" fill="#f2d27a"/><text x="14" y="-25" text-anchor="middle" font-size="8">🌴</text><rect x="-10" y="-22" width="18" height="10" rx="2" fill="#9db8e2" transform="rotate(8)"/>` },
  oranges: { x: 660, y: 506, art: () => `${chOmbreSol(36)}${[[-14, -34], [0, -38], [14, -34], [-7, -46], [8, -46], [0, -54]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="#f5973f"/><circle cx="${x - 3}" cy="${y - 3}" r="2.500" fill="#fff" opacity=".45"/>`).join('')}
    <ellipse cx="6" cy="-62" rx="7" ry="3" fill="#5b9670" transform="rotate(-25 6 -62)"/>
    <path d="M-30-30H30L24-3Q23 0 19 0H-19Q-23 0-24-3Z" fill="#c99a62"/>${[-20, -10, 0, 10, 20].map((x) => `<path d="M${x}-29V-2" stroke="#9b6c3a" stroke-width="1.200" opacity=".6"/>`).join('')}<path d="M-28-18H28" stroke="#9b6c3a" stroke-width="1.200" opacity=".6"/>
    <rect x="-16" y="-24" width="32" height="12" rx="2" fill="#fbf5ec"/><text y="-15" text-anchor="middle" font-size="8" font-weight="700" fill="#e07a2e">JAFFA</text>` },
  'tourne-disque': { x: 560, y: 470, art: () => `${chOmbreSol(46, 6)}${chMiroir('<path d="M-36-34L-40 0H-34L-28-34Z" fill="#8a5d41"/>')}<rect x="-44" y="-40" width="88" height="8" rx="2" fill="url(#chBois)"/>
    <rect x="-40" y="-62" width="80" height="22" rx="4" fill="#5a7fb0"/><ellipse cx="-6" cy="-64" rx="28" ry="6" fill="#2b2230"/><ellipse cx="-6" cy="-64" rx="18" ry="3.800" fill="none" stroke="#4a3f55" stroke-width=".8"/><ellipse cx="-6" cy="-64" rx="7" ry="1.800" fill="#f26d8f"/>
    <path d="M30-66L22-70L4-64" stroke="#d9d2c8" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="30" cy="-66" r="3" fill="#d9d2c8"/>
    <path d="M30-84Q34-90 32-96M36-80Q42-86 40-92" stroke="#9d86c9" stroke-width="1.500" fill="none"/><text x="38" y="-96" font-size="11" fill="#9d86c9">♪</text><text x="26" y="-104" font-size="9" fill="#e46a92">♫</text>` },
  coussins: { x: 220, y: 506, art: () => `${chOmbreSol(44, 6)}<rect x="-40" y="-18" width="80" height="18" rx="8" fill="#9d86c9"/><path d="M-36-9H36" stroke="#fff" stroke-width="1" stroke-dasharray="3 3" opacity=".6"/>
    <rect x="-34" y="-36" width="68" height="19" rx="8" fill="#9fcfb3"/>${[-20, 0, 20].map((x) => `<circle cx="${x}" cy="-27" r="2" fill="#5b9670"/>`).join('')}
    <rect x="-28" y="-54" width="56" height="19" rx="8" fill="#f4a9c4"/><path d="M-22-49Q0-40 22-49" stroke="#fff" stroke-width="1.500" opacity=".5" fill="none"/>` },
  bougies: { x: 440, y: 300, lueurs: [[0, -40, 70]], art: () => `<circle cy="-40" r="34" fill="url(#chLueur)" opacity=".7"/><ellipse cy="-2" rx="34" ry="5" fill="url(#chOr)"/>
    ${[[-18, 34], [0, 48], [18, 26]].map(([x, h]) => `<rect x="${x - 7}" y="${-h}" width="14" height="${h - 3}" rx="2" fill="url(#chCire)"/><ellipse cx="${x}" cy="${-h}" rx="7" ry="2" fill="#fff7e6"/><path d="M${x} ${-h}V${-h - 4}" stroke="#3a2b22" stroke-width="1"/><path d="M${x} ${-h - 17}Q${x + 6} ${-h - 8} ${x} ${-h - 4}Q${x - 6} ${-h - 8} ${x} ${-h - 17}Z" fill="url(#chFlamme)"/>`).join('')}` },
  chabbat: { x: 380, y: 300, lueurs: [[-16, -76, 60], [16, -76, 60]], art: () => `${chMiroir('<rect x="-18" y="-54" width="4" height="48" fill="url(#chOr)"/><circle cx="-16" cy="-30" r="3.500" fill="url(#chOr)"/><path d="M-26 0Q-24-10-16-10Q-8-10-6 0Z" fill="url(#chOr)"/><path d="M-21-54H-11L-13-58H-19Z" fill="url(#chOr)"/><rect x="-19" y="-74" width="6" height="18" fill="#fffaf0"/><path d="M-16-74V-78" stroke="#3a2b22"/><path d="M-16-92Q-11-84-16-79Q-21-84-16-92Z" fill="url(#chFlamme)"/>')}
    <circle cx="-16" cy="-82" r="16" fill="url(#chLueur)" opacity=".7"/><circle cx="16" cy="-82" r="16" fill="url(#chLueur)" opacity=".7"/>
    <g transform="translate(58 0)"><rect x="-26" y="-6" width="52" height="6" rx="2" fill="url(#chBois)"/>${[-14, -4, 6, 16].map((x, i) => `<ellipse cx="${x}" cy="${-14 - (i % 2) * 2}" rx="8" ry="8" fill="#d99a4e"/><path d="M${x - 5} ${-18}Q${x} ${-12} ${x + 5} ${-18}" stroke="#b5762e" stroke-width="1" fill="none"/>`).join('')}</g>` },
  arrosoir: { x: 80, y: 470, art: () => `${chOmbreSol(34)}<path d="M-24-4L-20-46H20L24-4Z" fill="#8fb8e8"/><ellipse cy="-46" rx="20" ry="4" fill="#b6d0ee"/><path d="M-20-44Q-30-62-12-62H12Q30-62 20-44" stroke="#6b93c6" stroke-width="4" fill="none"/>
    <path d="M22-14L48-44L54-40L28-8Z" fill="#7aa5da"/><ellipse cx="52" cy="-44" rx="6" ry="3" fill="#6b93c6" transform="rotate(35 52 -44)"/>${chFleurette(-6, -26, 4, '#f2a3c0')}${chFleurette(8, -18, 3, '#fff')}
    <path d="M-16-38Q-18-24-14-8" stroke="#fff" stroke-width="3" opacity=".4" fill="none" stroke-linecap="round"/>` },
  chaise: { x: 640, y: 470, art: () => `${chOmbreSol(40, 6)}${chMiroir('<path d="M-30-46L-34 0H-28L-22-46Z" fill="#c99a62"/>')}<path d="M-34-52H34L30-40H-30Z" fill="#d9b07a"/><ellipse cy="-54" rx="32" ry="8" fill="#e3c08f"/>
    <path d="M-28-56Q-34-110 0-114Q34-110 28-56Z" fill="#e3c08f"/>${[-18, -6, 6, 18].map((x) => `<path d="M${x}-58Q${x * 1.1}-90 ${x * .6}-108" stroke="#c99a62" stroke-width="1.500" fill="none"/>`).join('')}${[-70, -84, -98].map((y) => `<path d="M-26 ${y}Q0 ${y - 6} 26 ${y}" stroke="#c99a62" stroke-width="1.200" fill="none"/>`).join('')}
    <rect x="-20" y="-70" width="40" height="18" rx="8" fill="#f4a9c4"/>` },
  licorne: { x: 360, y: 512, art: () => `${chOmbreSol(30)}<ellipse cy="-24" rx="22" ry="22" fill="#fbf7fb"/><ellipse cx="-12" cy="-4" rx="9" ry="6" fill="#fbf7fb"/><ellipse cx="12" cy="-4" rx="9" ry="6" fill="#fbf7fb"/>
    <path d="M10-60Q24-64 26-44Q28-28 18-22" fill="#c9b6e6"/><path d="M12-64Q26-58 22-36" stroke="#f2a3c0" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M8-66Q20-66 20-50" stroke="#9fcfb3" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cy="-56" r="19" fill="#fbf7fb"/><path d="M-4-74L0-96L5-74Z" fill="#f6c95e"/><path d="M-3-80L4-82M-2-86L3-88" stroke="#d99a1f" stroke-width="1"/>
    <path d="M-12-70L-8-80L-3-72Z" fill="#fbf7fb"/><path d="M-10-58Q-7-55-4-58M4-58Q7-55 10-58" stroke="#3b2a2a" stroke-width="1.400" fill="none" stroke-linecap="round"/><ellipse cx="-11" cy="-50" rx="4" ry="2.500" fill="#f58fa0" opacity=".5"/><ellipse cx="11" cy="-50" rx="4" ry="2.500" fill="#f58fa0" opacity=".5"/>` },
  champignon: { x: 500, y: 512, lueurs: [[0, -40, 60]], art: () => `${chOmbreSol(26)}<circle cy="-40" r="34" fill="url(#chLueur)" opacity=".55"/><path d="M-10 0Q-12-20-8-30H8Q12-20 10 0Z" fill="#fbf5ec"/>
    <path d="M-30-30Q-32-62 0-64Q32-62 30-30Q0-24-30-30Z" fill="#f26d8f"/>${[[-16, -46, 5], [4, -54, 4], [18, -40, 4.500], [-4, -38, 3]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff6f0"/>`).join('')}<path d="M-22-50Q-14-60 0-60" stroke="#fff" stroke-width="2" opacity=".4" fill="none" stroke-linecap="round"/>` },
  'affiche-shabbat': { x: 250, y: 290, mur: true, art: () => `<rect x="-52" y="-18" width="108" height="40" fill="#2b1f3a" opacity=".12"/><rect x="-56" y="-22" width="112" height="40" rx="6" fill="url(#chBois)"/><rect x="-50" y="-16" width="100" height="28" rx="4" fill="#fbf5ec"/>
    <text y="4" text-anchor="middle" font-size="15" font-family="'Frank Ruhl Libre', serif" font-weight="700" fill="#7a4f8a">שַׁבָּת שָׁלוֹם</text>${chFleurette(-44, -10, 2.500, '#f2a3c0')}${chFleurette(44, 6, 2.500, '#9db8e2')}` },
  polaroids: { x: 400, y: 40, mur: true, art: () => `<path d="M-90-6Q0 18 90-6" stroke="#8a6a5a" stroke-width="1.200" fill="none"/>
    ${[[-64, 0, -6, '#f9c9a0', '#4f8fc0'], [-20, 8, 4, '#c9e6f2', '#f2d27a'], [24, 8, -3, '#f3c1c9', '#9fcfb3'], [66, 0, 7, '#d6c8ee', '#f6854f']].map(([x, y, a, c1, c2]) => `<g transform="translate(${x} ${y}) rotate(${a})"><rect x="-15" y="2" width="30" height="36" fill="#2b1f3a" opacity=".12"/><rect x="-16" y="0" width="30" height="36" fill="#fff"/><rect x="-13" y="3" width="24" height="22" fill="${c1}"/><circle cx="3" cy="11" r="4" fill="${c2}"/><path d="M-13 25L-4 16L4 22L11 15V25Z" fill="${c2}" opacity=".7"/><rect x="-4" y="-5" width="6" height="10" rx="1" fill="#d9b07a"/></g>`).join('')}` },
  'arc-en-ciel': { x: 640, y: 70, mur: true, art: () => `${['#f26d8f', '#f6a640', '#f6d35e', '#86bd8b', '#8fb8e8', '#9d86c9'].map((c, i) => `<path d="M${-54 + i * 7} 20A${54 - i * 7} ${54 - i * 7} 0 0 1 ${54 - i * 7} 20" stroke="${c}" stroke-width="7" fill="none"/>`).join('')}
    ${chNuage([[-56, 22, 10], [-44, 18, 12], [-34, 24, 9]], '#fff')}${chNuage([[34, 24, 9], [44, 18, 12], [56, 22, 10]], '#fff')}` },
  papillons: { x: 720, y: 270, mur: true, art: () => `<rect x="-36" y="-28" width="76" height="60" fill="#2b1f3a" opacity=".12"/><rect x="-40" y="-32" width="76" height="60" rx="2" fill="#fbf7f1" stroke="#c9a96e" stroke-width="4"/>
    ${[[-20, -12, '#8fb8e8', 1], [10, -14, '#f2a3c0', .8], [-6, 10, '#f6c95e', .9], [20, 12, '#9fcfb3', .7]].map(([x, y, c, s]) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="-6" cy="-4" rx="7" ry="6" fill="${c}"/><ellipse cx="6" cy="-4" rx="7" ry="6" fill="${c}"/><ellipse cx="-5" cy="5" rx="5" ry="4" fill="${c}" opacity=".8"/><ellipse cx="5" cy="5" rx="5" ry="4" fill="${c}" opacity=".8"/><path d="M0-8V9" stroke="#3a2730" stroke-width="1.600" stroke-linecap="round"/></g>`).join('')}` },
  liege: { x: 150, y: 290, mur: true, art: () => `<rect x="-46" y="-30" width="96" height="66" fill="#2b1f3a" opacity=".12"/><rect x="-50" y="-34" width="96" height="66" rx="3" fill="#c99a62" stroke="#8a5d41" stroke-width="4"/>
    ${[...Array(30).keys()].map((n) => `<circle cx="${-44 + (n * 37) % 86}" cy="${-28 + (n * 23) % 54}" r=".8" fill="#9b6c3a" opacity=".5"/>`).join('')}
    ${[[-28, -14, -5, '#fff4a8', 'מַיִם'], [4, -16, 4, '#f9c9d6', 'לֶחֶם'], [-12, 12, 3, '#c9e6f2', 'תּוֹדָה'], [28, 10, -6, '#d6eed8', '']].map(([x, y, a, c, m]) => `<g transform="translate(${x} ${y}) rotate(${a})"><rect x="-14" y="-11" width="28" height="22" fill="${c}"/>${m ? `<text y="4" text-anchor="middle" font-size="8.500" font-family="'Frank Ruhl Libre', serif" font-weight="700" fill="#4a2f8e">${m}</text>` : '<path d="M-9-3H9M-9 2H5" stroke="#8a7f68" stroke-width="1"/>'}<circle cy="-9" r="2.200" fill="#e46a92"/></g>`).join('')}` },
  'attrape-reves': { x: 60, y: 60, mur: true, art: () => `<path d="M0-48V-28" stroke="#c9a86e" stroke-width="1"/><circle cy="-4" r="24" fill="none" stroke="#e8a7bd" stroke-width="4"/>
    <path d="${[...Array(8).keys()].map((i) => { const a = i * Math.PI / 4; return `M${(22 * Math.cos(a)).toFixed(1)} ${(-4 + 22 * Math.sin(a)).toFixed(1)}L${(8 * Math.cos(a + .4)).toFixed(1)} ${(-4 + 8 * Math.sin(a + .4)).toFixed(1)}`; }).join('')}" stroke="#c9a96e" stroke-width=".8" fill="none"/><circle cy="-4" r="3" fill="#9db8e2"/>
    ${[-16, 0, 16].map((x, i) => `<path d="M${x} ${16 + Math.abs(x) * -.4}V${40 + i % 2 * 8}" stroke="#c9a86e" stroke-width=".8"/><path d="M${x} ${38 + i % 2 * 8}q-5 8 0 18q5-10 0-18Z" fill="${['#f2a3c0', '#c9b6e6', '#9fcfb3'][i]}"/>`).join('')}` },
  mezouza: { x: 300, y: 190, mur: true, art: () => `<g transform="rotate(-12)"><rect x="-6" y="-26" width="12" height="52" rx="4" fill="#2b1f3a" opacity=".15" transform="translate(2 2)"/><rect x="-6" y="-26" width="12" height="52" rx="4" fill="url(#chOr)"/><rect x="-3.500" y="-18" width="7" height="34" rx="2" fill="#4f8fc0"/>
    <text y="4" text-anchor="middle" font-size="9" font-family="'Frank Ruhl Libre', serif" font-weight="700" fill="#f6dc8c">ש</text><circle cy="-22" r="1.300" fill="#8a6a2a"/><circle cy="22" r="1.300" fill="#8a6a2a"/></g>` },
  'neon-coeur': { x: 400, y: 200, mur: true, lueurs: [[0, -4, 70]], art: () => `<circle cy="-2" r="46" fill="#ff7aa8" opacity=".14"/>${chCoeur(0, -6, 26, 'none', 0).replace('fill="none"', 'fill="none" stroke="#ff7aa8" stroke-width="10" opacity=".3"')}${chCoeur(0, -6, 26, 'none', 0).replace('fill="none"', 'fill="none" stroke="#ffb3cc" stroke-width="3.500"')}
    <path d="M-2 22V36" stroke="#8a7f68" stroke-width="1"/>` },
});

SHOP.push(
  { id: 'monstera', kind: 'deco', em: '🌿', name: 'Grande plante monstera', price: 120 },
  { id: 'panier-chat', kind: 'deco', em: '🐱', name: 'Chat roux dans son panier', price: 150 },
  { id: 'valise', kind: 'deco', em: '🧳', name: 'Valise de voyage', price: 80 },
  { id: 'oranges', kind: 'deco', em: '🍊', name: 'Panier d’oranges de Jaffa', price: 60 },
  { id: 'tourne-disque', kind: 'deco', em: '🎶', name: 'Tourne-disque', price: 120 },
  { id: 'coussins', kind: 'deco', em: '🛏️', name: 'Pile de coussins', price: 60 },
  { id: 'bougies', kind: 'deco', em: '🕯️', name: 'Trois bougies', price: 60 },
  { id: 'chabbat', kind: 'deco', em: '🍞', name: 'Bougies de Chabbat et hallot', price: 120 },
  { id: 'arrosoir', kind: 'deco', em: '🚿', name: 'Arrosoir fleuri', price: 40 },
  { id: 'chaise', kind: 'deco', em: '🪑', name: 'Chaise en rotin', price: 90 },
  { id: 'licorne', kind: 'deco', em: '🦄', name: 'Licorne en peluche', price: 80 },
  { id: 'champignon', kind: 'deco', em: '🍄', name: 'Lampe champignon', price: 70 },
  { id: 'affiche-shabbat', kind: 'deco', em: '🪧', name: 'Panneau « Chabbat chalom »', price: 60 },
  { id: 'polaroids', kind: 'deco', em: '📸', name: 'Guirlande de photos', price: 70 },
  { id: 'arc-en-ciel', kind: 'deco', em: '🌈', name: 'Arc-en-ciel', price: 60 },
  { id: 'papillons', kind: 'deco', em: '🦋', name: 'Cadre à papillons', price: 70 },
  { id: 'liege', kind: 'deco', em: '📌', name: 'Tableau de liège en hébreu', price: 60 },
  { id: 'attrape-reves', kind: 'deco', em: '🪶', name: 'Attrape-rêves', price: 60 },
  { id: 'mezouza', kind: 'deco', em: '📜', name: 'Mezouza', price: 80 },
  { id: 'neon-coeur', kind: 'deco', em: '💖', name: 'Néon cœur', price: 100 },
);
