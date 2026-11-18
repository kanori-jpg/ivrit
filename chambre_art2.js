'use strict';
/* Ma chambre, 2e collection (18/11/2026) : 20 objets, 10 coiffures, de nouveaux murs et sols.
   Les dessins suivent les conventions de chambre_art.js : (0, 0) = le point posé au sol (ou le centre pour un objet mural). */
const CH_SOL_OMBRE = (rx, ry = 5) => `<ellipse rx="${rx}" ry="${ry}" fill="#2b1f3a" opacity=".2"/>`;
const chPetitPot = (x, y, l = 24, h = 20) => `<path d="M${x - l / 2} ${y - h}H${x + l / 2}L${x + l / 2 - 3} ${y - 1}Q${x + l / 2 - 4} ${y} ${x + l / 2 - 6} ${y}H${x - l / 2 + 6}Q${x - l / 2 + 4} ${y} ${x - l / 2 + 3} ${y - 1}Z" fill="url(#chPot)"/><rect x="${x - l / 2 - 2}" y="${y - h - 4}" width="${l + 4}" height="6" rx="2" fill="url(#chPotBord)"/>`;

Object.assign(CH_OBJETS, {
  lampadaire: { x: 690, y: 470, lueurs: [[0, -150, 110]], art: () => `${CH_SOL_OMBRE(34, 6)}<ellipse cy="-4" rx="22" ry="5" fill="#6b5a7a"/><rect x="-3" y="-140" width="6" height="136" fill="#7d6a8c"/><rect x="-1" y="-140" width="2" height="136" fill="#fff" opacity=".25"/>
    <circle cy="-150" r="42" fill="url(#chLueur)" opacity=".7"/><path d="M-32-128L-20-178H20L32-128Z" fill="url(#chAbatJour)"/><path d="M-32-128H32" stroke="#d9b48f" stroke-width="3"/><path d="M-20-178H20" stroke="#e8c9a6" stroke-width="2"/>
    <path d="M-12-174L-19-132M6-176L9-130" stroke="#fff" stroke-width="2" opacity=".35"/>` },
  etagere: { x: 560, y: 196, mur: true, art: () => `<rect x="-70" y="2" width="140" height="8" rx="2" fill="#2b1f3a" opacity=".12"/><rect x="-72" y="0" width="144" height="8" rx="2" fill="url(#chBois)"/><path d="M-52 8L-46 22M52 8L46 22" stroke="#7d5136" stroke-width="4" stroke-linecap="round"/>
    ${[[-66, '#5a7fb0', 36, 10], [-55, '#e8a7bd', 42, 11], [-43, '#f2d27a', 32, 9], [-33, '#8fcfb0', 38, 10]].map(([x, c, h, w]) => `<rect x="${x}" y="${-h}" width="${w}" height="${h}" rx="1.500" fill="${c}"/><rect x="${x + 2}" y="${-h + 6}" width="${w - 4}" height="3" fill="#fff" opacity=".5"/>`).join('')}
    <g transform="rotate(16 -12 0)"><rect x="-22" y="-34" width="10" height="34" rx="1.500" fill="#b65a72"/></g>
    ${chFeuilles([[28, -20, -45, 15], [28, -20, 0, 18], [28, -20, 45, 14], [28, -20, -15, 16]])}${chPetitPot(28, 0, 24, 18)}
    <circle cx="58" cy="-10" r="10" fill="#c9b6e6"/><circle cx="55" cy="-13" r="3" fill="#fff" opacity=".6"/>` },
  bocal: { x: 560, y: 506, art: () => `${CH_SOL_OMBRE(34)}<ellipse cy="-2" rx="20" ry="4" fill="#cfe6f2"/>
    <circle cy="-36" r="34" fill="#d6eef8" opacity=".6"/><path d="M-32-46A34 34 0 0 0 32-46Q0-40-32-46Z" fill="#7cc4e4" opacity=".7"/>
    ${[[-14, -8, '#e9b06a'], [-4, -6, '#c97f98'], [8, -7, '#9d86c9'], [16, -9, '#e9b06a']].map(([x, y, c]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3" fill="${c}"/>`).join('')}
    <path d="M10-6Q6-20 12-30M14-6Q20-18 16-28" stroke="#5b9670" stroke-width="2.500" fill="none" stroke-linecap="round"/>
    <g transform="translate(-6 -26)"><ellipse rx="10" ry="6.500" fill="#f5973f"/><path d="M8 0L18-8V8Z" fill="#f08a2e"/><path d="M-2-6Q2-11 6-5" fill="#f08a2e"/><circle cx="-5" cy="-1.500" r="1.600" fill="#24161d"/></g>
    <circle cx="-14" cy="-40" r="2" fill="none" stroke="#fff" stroke-width="1"/><circle cx="-11" cy="-48" r="1.400" fill="none" stroke="#fff" stroke-width="1"/>
    <ellipse cy="-68" rx="16" ry="4" fill="none" stroke="#a9d3e6" stroke-width="2.500"/><path d="M-22-56Q-29-40-22-24" stroke="#fff" stroke-width="3" opacity=".6" fill="none" stroke-linecap="round"/>` },
  horloge: { x: 470, y: 70, mur: true, art: () => `<circle cx="3" cy="3" r="32" fill="#2b1f3a" opacity=".12"/><circle r="32" fill="#e46a92"/><circle r="26" fill="#fffaf3"/>
    ${[...Array(12).keys()].map((i) => { const a = i * Math.PI / 6, l = i % 3 ? 3 : 5; return `<path d="M${(21 * Math.sin(a)).toFixed(1)} ${(-21 * Math.cos(a)).toFixed(1)}L${((21 + l) * Math.sin(a)).toFixed(1)} ${(-(21 + l) * Math.cos(a)).toFixed(1)}" stroke="#7a5b6e" stroke-width="${i % 3 ? 1.200 : 2}"/>`; }).join('')}
    <path d="M0 0L9-10" stroke="#3a2730" stroke-width="2.600" stroke-linecap="round"/><path d="M0 0L-4 17" stroke="#3a2730" stroke-width="1.800" stroke-linecap="round"/><circle r="2.500" fill="#e46a92"/>
    <path d="M-20-18A28 28 0 0 1 2-28" stroke="#fff" stroke-width="2.500" opacity=".5" fill="none" stroke-linecap="round"/>` },
  cactus: { x: 520, y: 512, art: () => `${CH_SOL_OMBRE(24)}
    <path d="M-7-26V-84Q-7-92 0-92Q7-92 7-84V-26Z" fill="#7cb87f"/><path d="M-7-52H-16Q-22-52-22-58V-70Q-22-75-18-75Q-14-75-14-70V-60H-7Z" fill="#7cb87f"/><path d="M7-62H15Q20-62 20-68V-78Q20-82 17-82Q13-82 13-78V-69H7Z" fill="#7cb87f"/>
    <path d="M0-88V-30M-3-86V-32M3-86V-32" stroke="#5b9670" stroke-width="1" opacity=".7"/>${[[-4, -78], [4, -66], [-4, -50], [4, -40], [-18, -66], [16, -74]].map(([x, y]) => `<path d="M${x - 2} ${y}h4M${x} ${y - 2}v4" stroke="#fff" stroke-width=".8" opacity=".8"/>`).join('')}
    ${chFleurette(0, -95, 3.500, '#f2a3c0')}${chPetitPot(0, 0, 32, 26)}<path d="M-14-14H14" stroke="#f6e7d8" stroke-width="2" opacity=".55"/>` },
  'affiche-ta': { x: 660, y: 196, mur: true, art: () => `<rect x="-36" y="-50" width="78" height="104" fill="#2b1f3a" opacity=".12"/><rect x="-40" y="-54" width="78" height="104" fill="#fbf5ec"/>
    <rect x="-34" y="-48" width="66" height="70" fill="#f9c9a0"/><circle cx="-1" cy="-8" r="14" fill="#f6854f"/><rect x="-34" y="0" width="66" height="22" fill="#4f8fc0"/><path d="M-34 6Q-22 2-10 6T14 6T32 6" stroke="#fff" stroke-width="1.200" opacity=".6" fill="none"/>
    <path d="M-30 0V-26H-24V-34H-18V0ZM16 0V-22H22V-30H26V0Z" fill="#7d5a78" opacity=".75"/><path d="M-6 0Q-5-18-10-30" stroke="#5a3d2a" stroke-width="2" fill="none"/>${[-60, -20, 20, 60, 100].map((a) => `<ellipse cx="-10" cy="-30" rx="9" ry="2.500" transform="rotate(${a} -10 -30)" fill="#3f7a52"/>`).join('')}
    <text x="-1" y="40" text-anchor="middle" font-size="13" font-family="'Frank Ruhl Libre', serif" font-weight="700" fill="#4a2f8e">תֵּל אָבִיב</text>
    <rect x="-12" y="-60" width="24" height="10" fill="#9fcfb3" opacity=".85" transform="rotate(5)"/>` },
  pouf: { x: 520, y: 476, art: () => `${CH_SOL_OMBRE(46, 7)}<path d="M-42-6Q-46-30-38-38Q0-48 38-38Q46-30 42-6Q0 4-42-6Z" fill="#f2b134"/>
    <ellipse cy="-38" rx="38" ry="11" fill="#f6c95e"/>${[-30, -15, 0, 15, 30].map((x) => `<path d="M${x}-29Q${x + 2}-16 ${x}-2" stroke="#d99a1f" stroke-width="1.200" fill="none" opacity=".6"/>`).join('')}
    <circle cy="-38" r="4" fill="#d99a1f"/><path d="M-26-44Q0-50 22-46" stroke="#fff" stroke-width="2.500" opacity=".35" fill="none" stroke-linecap="round"/>` },
  chiot: { x: 450, y: 508, art: () => `${CH_SOL_OMBRE(42, 6)}
    <path d="M20-10Q38-12 40-24" stroke="#e3b27a" stroke-width="7" fill="none" stroke-linecap="round"/>
    <ellipse cy="-18" rx="34" ry="18" fill="#efc48e"/><ellipse cx="6" cy="-22" rx="14" ry="10" fill="#fff3e2" opacity=".7"/><ellipse cx="18" cy="-3" rx="10" ry="5" fill="#e3b27a"/>
    <ellipse cx="-24" cy="-28" rx="18" ry="15" fill="#efc48e"/><ellipse cx="-38" cy="-24" rx="9" ry="7" fill="#fff3e2"/><ellipse cx="-44" cy="-26" rx="3.500" ry="2.800" fill="#3b2a2a"/>
    <path d="M-12-38Q-2-36-4-18Q-12-16-14-26Z" fill="#b5784a"/><path d="M-30-27Q-26-24-22-27M-22-31Q-18-28-14-31" stroke="#3b2a2a" stroke-width="1.400" fill="none" stroke-linecap="round"/>
    <path d="M-36-12Q-30-10-26-14" stroke="#e3b27a" stroke-width="6" fill="none" stroke-linecap="round"/><text x="2" y="-48" font-size="11" fill="#9d86c9" font-weight="700">z</text><text x="12" y="-58" font-size="8" fill="#9d86c9" font-weight="700">z</text>` },
  guitare: { x: 760, y: 476, art: () => `${CH_SOL_OMBRE(26)}<g transform="rotate(-8)">
    <rect x="-4" y="-150" width="8" height="84" fill="#7d5136"/>${[-140, -128, -116, -104, -92, -80].map((y) => `<path d="M-4 ${y}H4" stroke="#e8cf8e" stroke-width=".9"/>`).join('')}<rect x="-8" y="-166" width="16" height="18" rx="3" fill="#5a3826"/>${[-162, -156, -150].map((y) => `<circle cx="-10" cy="${y}" r="2" fill="#e8c26a"/><circle cx="10" cy="${y}" r="2" fill="#e8c26a"/>`).join('')}
    <path d="M0-74Q-18-76-20-56Q-21-46-14-40Q-26-34-26-18Q-26 0 0 0Q26 0 26-18Q26-34 14-40Q21-46 20-56Q18-76 0-74Z" fill="#e39a5a"/><path d="M0-70Q-14-70-15-56Q-16-46-10-40Q-21-34-21-18Q-21-5 0-5" fill="none" stroke="#f6c08a" stroke-width="2" opacity=".7"/>
    <circle cy="-34" r="7" fill="#5a3826"/><rect x="-9" y="-14" width="18" height="4" rx="1" fill="#5a3826"/><path d="M-1.500-150V-12M1.500-150V-12" stroke="#f3eadb" stroke-width=".6"/></g>` },
  tablebasse: { x: 400, y: 472, art: () => `${CH_SOL_OMBRE(64, 7)}${chMiroir('<path d="M-46-30L-50 0H-44L-38-30Z" fill="#8a5d41"/>')}
    <path d="M-60-34H60L56-26H-56Z" fill="#7d5136"/><ellipse cy="-36" rx="62" ry="10" fill="url(#chBois)"/><ellipse cy="-37" rx="54" ry="7" fill="#c39069" opacity=".5"/>
    <ellipse cx="-22" cy="-40" rx="9" ry="2.500" fill="#e8dfd3"/><path d="M-31-56H-13Q-13-42-22-40Q-31-42-31-56Z" fill="#fbf7f1"/><path d="M-13-52Q-6-52-7-46Q-8-43-13-44" stroke="#fbf7f1" stroke-width="2.500" fill="none"/><ellipse cx="-22" cy="-56" rx="9" ry="2" fill="#c27a4e"/>
    <path class="ch-vapeur" d="M-24-60Q-28-66-24-72Q-20-78-24-84" stroke="#fff" stroke-width="1.500" fill="none" opacity=".7" stroke-linecap="round"/>
    <ellipse cx="18" cy="-40" rx="18" ry="4" fill="#f5e6dd"/>${[[10, -44, '#d9a74a'], [18, -46, '#c97f98'], [26, -44, '#d9a74a']].map(([x, y, c]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3" fill="${c}"/>`).join('')}` },
  miroir: { x: 52, y: 150, mur: true, art: () => `<ellipse cx="3" cy="4" rx="34" ry="52" fill="#2b1f3a" opacity=".12"/><ellipse rx="34" ry="52" fill="url(#chOr)"/><ellipse rx="27" ry="45" fill="#cfe1ee"/>
    <path d="M-14-30L8-40M-18-12L14-30" stroke="#fff" stroke-width="5" opacity=".6" stroke-linecap="round"/><path d="M-20 20L4 8" stroke="#fff" stroke-width="2.500" opacity=".4" stroke-linecap="round"/>
    ${chFleurette(0, -52, 4, '#f2a3c0')}${chFleurette(-26, 36, 3, '#c9b6e6')}${chFleurette(26, 36, 3, '#c9b6e6')}` },
  suspension: { x: 330, y: 70, mur: true, art: () => `<path d="M0-70V-20M-14-20L0-70L14-20" stroke="#c9a86e" stroke-width="1.300" fill="none"/>
    ${chFeuilles([[-8, -14, 160, 26], [10, -14, -160, 24], [-14, -6, 200, 30], [16, -4, 145, 28], [0, -10, 180, 22], [-20, -18, 230, 20], [22, -16, 125, 20]])}
    <path d="M-20-24H20L16-4Q15 0 11 0H-11Q-15 0-16-4Z" fill="#f5efe3"/><path d="M-18-16H18M-17-9H17" stroke="#c9a86e" stroke-width="1.200" stroke-dasharray="3 2"/>` },
  'coussin-coeur': { x: 300, y: 506, art: () => `${CH_SOL_OMBRE(38)}<g transform="translate(0 -34)">${chCoeur(0, 0, 36, '#f26d8f', 0)}</g><path d="M-20-56Q-28-46-22-34" stroke="#fff" stroke-width="3" opacity=".45" fill="none" stroke-linecap="round"/>
    <path d="M-14-30Q0-20 14-30" stroke="#c94f7a" stroke-width="1.200" stroke-dasharray="2 2" fill="none"/>` },
  globe: { x: 610, y: 506, art: () => `${CH_SOL_OMBRE(28)}<path d="M-18 0Q-16-8 0-9Q16-8 18 0Z" fill="url(#chOr)"/><rect x="-2" y="-22" width="4" height="14" fill="#c99a3c"/>
    <path d="M-34-56A34 34 0 0 0 30-30" stroke="#c99a3c" stroke-width="3" fill="none"/><circle cy="-56" r="28" fill="#6fb3dd"/>
    <path d="M-20-72Q-10-80 0-74Q4-66-6-62Q-14-60-18-66Z M4-50Q14-56 20-48Q22-36 12-34Q4-38 4-50Z M-22-48Q-14-46-14-38Q-18-34-24-40Z" fill="#8fcf8f"/>
    <path d="M-28-56H28M-24-70Q0-66 24-70M-24-42Q0-46 24-42" stroke="#fff" stroke-width=".8" opacity=".4" fill="none"/><path d="M-16-78Q-24-70-24-58" stroke="#fff" stroke-width="3" opacity=".45" fill="none" stroke-linecap="round"/>` },
  lapin: { x: 180, y: 512, art: () => `${CH_SOL_OMBRE(30)}
    ${chMiroir('<ellipse cx="-9" cy="-92" rx="7" ry="22" fill="#f5eef4" transform="rotate(-10 -9 -92)"/><ellipse cx="-9" cy="-92" rx="3.500" ry="16" fill="#f2b8cb" transform="rotate(-10 -9 -92)"/>')}
    <ellipse cy="-26" rx="22" ry="24" fill="#f5eef4"/><ellipse cy="-24" rx="12" ry="14" fill="#fbe3ec"/><ellipse cx="-14" cy="-4" rx="10" ry="6" fill="#f5eef4"/><ellipse cx="14" cy="-4" rx="10" ry="6" fill="#f5eef4"/>
    <circle cy="-60" r="20" fill="#f5eef4"/><circle cx="-7" cy="-62" r="2.500" fill="#2b1f2a"/><circle cx="7" cy="-62" r="2.500" fill="#2b1f2a"/><path d="M-2-55L0-53L2-55Z" fill="#e48aa3"/>
    <ellipse cx="-12" cy="-55" rx="4" ry="2.500" fill="#f58fa0" opacity=".45"/><ellipse cx="12" cy="-55" rx="4" ry="2.500" fill="#f58fa0" opacity=".45"/><path d="M0-42L-8-48V-36ZM0-42L8-48V-36Z" fill="#9d86c9"/>` },
  lavelampe: { x: 712, y: 512, lueurs: [[0, -44, 60]], art: () => `${CH_SOL_OMBRE(20)}<circle cy="-44" r="36" fill="url(#chLueur)" opacity=".5"/>
    <path d="M-14 0L-9-18H9L14 0Z" fill="#6b5a7a"/><path d="M-9-18L-13-66Q-13-72-7-72H7Q13-72 13-66L9-18Z" fill="#f6a7c1" opacity=".85"/>
    <ellipse cx="-2" cy="-58" rx="5" ry="6" fill="#f26d8f"/><ellipse cx="3" cy="-40" rx="6" ry="8" fill="#f26d8f"/><ellipse cx="-3" cy="-26" rx="4" ry="4" fill="#f26d8f"/>
    <path d="M-7-72L-4-82H4L7-72Z" fill="#6b5a7a"/><path d="M-9-66L-6-24" stroke="#fff" stroke-width="2" opacity=".45" stroke-linecap="round"/>` },
  hamsa: { x: 470, y: 176, mur: true, art: () => `<path d="M0-48V-36" stroke="#c9a86e" stroke-width="1"/><circle cy="-49" r="2" fill="#c9a86e"/>
    <path d="M-24 22Q-28 2-24-14V-30Q-24-36-19-36Q-14-36-14-30V-18H-10V-38Q-10-44-5-44Q0-44 0-38V-18H2V-38Q2-44 7-44Q12-44 12-38V-18H14V-30Q14-36 19-36Q24-36 24-30V-14Q28 2 24 22Q12 34 0 34Q-12 34-24 22Z" fill="#4f8fc0"/>
    <path d="M-17 18Q-20 4-17-8M17 18Q20 4 17-8" stroke="#fff" stroke-width="1.200" opacity=".5" fill="none"/>
    <ellipse cy="8" rx="11" ry="7" fill="#fff"/><circle cy="8" r="5" fill="#2f8fb0"/><circle cy="8" r="2.200" fill="#1d2a40"/><circle cx="1.500" cy="6.500" r="1" fill="#fff"/>
    ${[-16, -8, 8, 16].map((x) => `<circle cx="${x}" cy="24" r="1.600" fill="#f2d27a"/>`).join('')}` },
  grenadier: { x: 40, y: 506, art: () => `${CH_SOL_OMBRE(40, 6)}<path d="M0-40Q-2-70 4-96M2-70Q-14-84-20-100M4-80Q18-90 22-108" stroke="#7d5136" stroke-width="4" fill="none" stroke-linecap="round"/>
    ${chFeuilles([[-20, -100, -50, 16], [-18, -104, 10, 14], [4, -98, -20, 16], [6, -102, 30, 14], [22, -108, 40, 15], [20, -112, -10, 14], [-6, -80, -70, 14], [14, -86, 70, 14], [-12, -116, -20, 14], [10, -120, 15, 14]])}
    ${[[-16, -92], [16, -98], [0, -112], [-4, -84]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6.500" fill="#d64f5c"/><path d="M${x - 2} ${y - 6}l2-3 2 3" stroke="#a83a46" stroke-width="1.200" fill="none"/><circle cx="${x - 2}" cy="${y - 2}" r="1.500" fill="#fff" opacity=".5"/>`).join('')}
    ${chPetitPot(0, 0, 44, 38)}<path d="M-18-22H18" stroke="#f6e7d8" stroke-width="2" opacity=".55"/>` },
  tournesols: { x: 620, y: 470, art: () => `${CH_SOL_OMBRE(24)}<path d="M0-40Q-4-80-20-104M0-40Q2-86 4-118M0-40Q8-74 22-96" stroke="#5b9670" stroke-width="2.500" fill="none"/>
    ${chFeuilles([[-6, -70, -60, 14], [4, -80, 55, 14]])}
    ${[[-20, -104, 13], [4, -120, 15], [22, -96, 12]].map(([x, y, r]) => `<g transform="translate(${x} ${y})">${[...Array(12).keys()].map((i) => `<ellipse cy="${-r}" rx="${r * .32}" ry="${r * .55}" fill="#f6c42e" transform="rotate(${i * 30})"/>`).join('')}<circle r="${r * .55}" fill="#7a4a24"/><circle r="${r * .3}" fill="#5a3418"/></g>`).join('')}
    <path d="M-14-42Q-18-20-12 0H12Q18-20 14-42Z" fill="#9db8e2"/><ellipse cy="-42" rx="14" ry="3.500" fill="#b9cdf0"/><path d="M-10-36Q-12-20-8-6" stroke="#fff" stroke-width="2.500" opacity=".45" fill="none" stroke-linecap="round"/>` },
  'affiche-shalom': { x: 560, y: 86, mur: true, art: () => `<rect x="-44" y="-26" width="96" height="58" fill="#2b1f3a" opacity=".12"/><rect x="-48" y="-30" width="96" height="58" rx="3" fill="#fdf0e2"/><rect x="-43" y="-25" width="86" height="48" rx="2" fill="none" stroke="#e8a7bd" stroke-width="1.500" stroke-dasharray="4 3"/>
    <text y="8" text-anchor="middle" font-size="24" font-family="'Frank Ruhl Libre', serif" font-weight="700" fill="#4a2f8e">שָׁלוֹם</text><text y="20" text-anchor="middle" font-size="7" fill="#8e73b9" letter-spacing="1">SHALOM</text>
    ${chCoeur(-34, -16, 4, '#f26d8f', 0)}${chCoeur(34, 14, 4, '#9d86c9', 0)}<path d="M-40-34H-20M20-34H40" stroke="#c9a86e" stroke-width="1"/>` },
});

Object.assign(CH_MURS, {
  'mur-vagues': { nom: 'Vagues', haut: '#d8eef4', bas: '#b9dde9', motif: '<path d="M0 30Q10 22 20 30T40 30T60 30" stroke="#8cc3d8" stroke-width="2" fill="none"/><path d="M0 52Q10 46 20 52T40 52T60 52" stroke="#fff" stroke-width="1.500" fill="none" opacity=".8"/>', taille: 60, op: .7 },
  'mur-grenades': { nom: 'Grenades', haut: '#fbf1ea', bas: '#f1ddd2', motif: '<circle cx="22" cy="26" r="7" fill="#e07a84"/><path d="M19 19l3-4 3 4" stroke="#c45a66" stroke-width="1.300" fill="none"/><ellipse cx="32" cy="22" rx="5" ry="2" fill="#9fcfb3" transform="rotate(-30 32 22)"/><circle cx="62" cy="64" r="5" fill="#e9a0a8"/><path d="M60 59l2-3 2 3" stroke="#c45a66" stroke-width="1" fill="none"/>', taille: 84, op: .8 },
  'mur-terrazzo': { nom: 'Terrazzo', haut: '#f6f1ea', bas: '#ebe2d6', motif: '<ellipse cx="10" cy="12" rx="4" ry="2.500" fill="#f2b8cb"/><ellipse cx="34" cy="8" rx="2.500" ry="1.800" fill="#9db8e2"/><ellipse cx="24" cy="30" rx="3.500" ry="2" fill="#f2d27a" transform="rotate(30 24 30)"/><ellipse cx="44" cy="40" rx="3" ry="2" fill="#9fcfb3"/><ellipse cx="8" cy="42" rx="2" ry="1.500" fill="#c9b6e6"/>', taille: 50, op: 1 },
  'mur-palmes': { nom: 'Feuilles de palmier', haut: '#e4f2e7', bas: '#cbe5d2', motif: '<path d="M20 50Q22 30 34 14" stroke="#6fa97c" stroke-width="1.500" fill="none"/>' + [0, 1, 2, 3, 4, 5].map((i) => `<ellipse cx="${22 + i * 2}" cy="${44 - i * 5.500}" rx="9" ry="2.200" fill="#86bd8b" transform="rotate(${i % 2 ? -35 : 35} ${22 + i * 2} ${44 - i * 5.500})"/>`).join(''), taille: 70, op: .8 },
  'mur-lavande': { nom: 'Lavande', haut: '#efe9f8', bas: '#dfd4f0', motif: '<path d="M20 44V22" stroke="#8aa27a" stroke-width="1.200"/>' + [24, 28, 32, 36].map((y, i) => `<ellipse cx="${i % 2 ? 22 : 18}" cy="${y}" rx="2" ry="3" fill="#a891c9"/>`).join('') + '<circle cx="48" cy="56" r="1.300" fill="#c9b6e6"/>', taille: 60, op: .75 },
});
Object.assign(CH_SOLS, {
  'sol-gris': { nom: 'Parquet gris', a: '#c9c3bd', b: '#a19a93', ligne: '#6f6862', type: 'planches' },
  'sol-bleu': { nom: 'Carreaux bleus', a: '#d6e6f5', b: '#a9c4e2', ligne: '#7c9cc4', type: 'carreaux' },
  'sol-terrazzo': { nom: 'Terrazzo', a: '#f3eee6', b: '#ddd3c6', ligne: '#b3a798', type: 'terrazzo', points: ['#f2b8cb', '#9db8e2', '#f2d27a', '#9fcfb3', '#c9b6e6', '#b3a798'] },
  'sol-moquette-rose': { nom: 'Moquette rose', a: '#f6cddb', b: '#e3a9be', ligne: '#c27a94', type: 'moquette' },
  'sol-damier-menthe': { nom: 'Damier menthe', a: '#f3faf6', b: '#dcefe4', ligne: '#8cc0a6', c: '#a9dcc2', type: 'damier' },
});

/* ---------- 10 nouvelles coiffures ---------- */
// Chaque coiffure reçoit les outils de chCheveux (couleur, formes, frange…) et rend { arriere, devant }
const chMeche = (d, ch, l = 1.600) => `<path d="${d}" stroke="${CH_TRAIT}" stroke-width="${l + 1.800}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${ch}" stroke-width="${l}" fill="none" stroke-linecap="round"/>`;
const chChouchou = (x, y, a, c = '#e46a92') => `<ellipse cx="${x}" cy="${y}" rx="7" ry="5" fill="${c}" ${CH_O} transform="rotate(${a} ${x} ${y})"/><path d="M${x - 4} ${y}h8" stroke="rgba(0,0,0,.15)" stroke-width="1.200" transform="rotate(${a} ${x} ${y})"/>`;
window.CH_COIFFURES_PLUS = {
  'p-co-chignon-bas': ({ ch, forme, traits, frange }) => ({
    arriere: forme(CH_CALOTTE) + forme('M30-176A17 15 0 1 0 30.100-176Z') + traits(['M20-170Q30-180 40-170', 'M22-162Q32-170 42-162']) + chChouchou(40, -176, 60, '#9d86c9'),
    devant: frange + chMiroir(chMeche('M-37-196Q-41-184-38-172', ch)),
  }),
  'p-co-queue-haute': ({ ch, forme, traits, frange }) => ({
    arriere: forme('M-6-238Q2-266 26-262Q52-254 52-214Q54-184 46-156Q42-172 40-190Q36-170 30-160Q36-192 32-220Q26-244 8-242Z') + traits(['M12-254Q40-250 44-200', 'M10-248Q30-236 34-190']) + forme(CH_CALOTTE),
    devant: frange + chMiroir(chMeche('M-37-200Q-40-190-38-180', ch)) + chChouchou(4, -244, -20),
  }),
  'p-co-afro': ({ ch, sombre }) => ({
    arriere: chNuage([[-40, -232, 20], [-54, -206, 20], [-58, -178, 19], [-52, -150, 18], [40, -232, 20], [54, -206, 20], [58, -178, 19], [52, -150, 18], [-20, -252, 20], [0, -258, 20], [20, -252, 20], [0, -205, 40]], ch)
      + [[-54, -206], [-52, -150], [54, -206], [52, -150], [0, -258], [-40, -232], [40, -232]].map(([x, y]) => `<path d="M${x - 6} ${y + 2}a6 6 0 1 1 7 5" stroke="${sombre}" stroke-width="1.400" fill="none"/>`).join(''),
    devant: chNuage([[-30, -226, 11], [-14, -233, 11], [3, -235, 11], [19, -231, 11], [33, -220, 10], [-38, -212, 9]], ch) + [[-30, -226], [-14, -233], [3, -235], [19, -231]].map(([x, y]) => `<path d="M${x - 4} ${y + 1}a4 4 0 1 1 5 3" stroke="${sombre}" stroke-width="1.200" fill="none"/>`).join(''),
  }),
  'p-co-garconne': ({ forme, traits, clair }) => ({
    arriere: forme('M0-236Q-44-236-44-194Q-44-182-40-174L40-174Q44-182 44-194Q44-236 0-236Z'),
    devant: chMiroir(forme('M-38-206Q-41-194-37-184Q-35-192-33-204Z')) + chFrangeCote(forme, traits, clair),
  }),
  'p-co-frange': ({ forme, traits, clair, longs }) => ({
    arriere: longs.arriere,
    devant: chMiroir(forme('M-38-212Q-44-180-41-140Q-40-120-42-104Q-36-104-34-112Q-33-150-31-208Z') + traits(['M-38-186Q-41-150-38-118']))
      + forme('M-40-205Q-43-238 0-239Q43-238 40-205Q38-212 33-213H-33Q-38-212-40-205Z') + traits(['M-24-232L-26-214', 'M-10-236L-11-214', 'M6-236L6-214', 'M22-233L24-214']) + traits(['M-16-234Q-24-232-30-224'], clair, 2.200),
  }),
  'p-co-demi-queue': ({ longs }) => ({
    arriere: longs.arriere,
    devant: longs.devant + `<path d="M-9-238L0-243L-9-248Z M9-238L0-243L9-248Z" fill="#f2d27a" ${CH_O}/><circle cy="-243" r="3" fill="#e9bd4c" ${CH_O}/>`,
  }),
  'p-co-couronne': ({ ch, forme, frange }) => {
    let tresse = '';
    for (let i = 0; i <= 10; i++) {
      const a = Math.PI + (i / 10) * Math.PI, x = 40 * Math.cos(a), y = -206 + 34 * Math.sin(a);
      tresse += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="7.500" ry="6" fill="${ch}" ${CH_O} transform="rotate(${((a * 180) / Math.PI + 90 + (i % 2 ? 20 : -20)).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
    }
    return { arriere: forme(CH_CALOTTE), devant: frange + tresse + chFleurette(-30, -232, 3, '#f7f1ea', '#f2d27a') + chFleurette(30, -232, 3, '#f2a3c0') };
  },
  'p-co-mi-longs': ({ forme, traits, clair }) => ({
    arriere: forme('M0-236Q-46-236-46-192Q-48-164-43-140Q-46-130-40-126Q-36-132-32-128Q-30-134-30-138L30-138Q30-134 32-128Q36-132 40-126Q46-130 43-140Q48-164 46-192Q46-236 0-236Z') + chMiroir(traits(['M-42-176Q-45-156-40-136'])),
    devant: chMiroir(forme('M-38-212Q-47-182-42-160Q-40-146-44-134Q-37-134-35-144Q-32-170-30-208Z') + traits(['M-40-190Q-43-170-39-150'])) + chFrangeCote(forme, traits, clair),
  }),
  'p-co-boucles-longues': ({ ch, sombre }) => {
    const cote = (s) => [[-36, -220, 12], [-44, -200, 12], [-46, -178, 12], [-46, -156, 12], [-44, -134, 11], [-42, -114, 11], [-38, -96, 10]].map(([x, y, r]) => [s * x, y, r]);
    const spirales = (l) => l.map(([x, y]) => `<path d="M${x - 4} ${y + 1}a4.500 4.500 0 1 1 5 4" stroke="${sombre}" stroke-width="1.300" fill="none"/>`).join('');
    return {
      arriere: chNuage([...cote(1), ...cote(-1), [-16, -236, 13], [0, -240, 13], [16, -236, 13], [0, -196, 30]], ch) + spirales([...cote(1), ...cote(-1)].filter((_, i) => i % 2)),
      devant: chNuage([[-26, -225, 10], [-10, -231, 10], [6, -231, 10], [21, -226, 10], [-37, -208, 9], [37, -208, 9]], ch) + spirales([[-26, -225], [-10, -231], [6, -231], [21, -226]]),
    };
  },
  'p-co-queue-cote': ({ ch, forme, traits, clair }) => ({
    arriere: forme(CH_CALOTTE),
    devant: forme('M-28-214Q-52-206-50-176Q-52-150-42-122Q-46-106-36-96Q-34-110-35-124Q-41-150-37-176Q-37-196-22-206Z') + traits(['M-44-180Q-46-150-39-120', 'M-40-170Q-40-146-36-128']) + chChouchou(-44, -200, 70, '#8fb8e8') + chFrangeCote(forme, traits, clair) + chMeche('M37-200Q40-190 38-180', ch),
  }),
};
Object.assign(CH_COIFFURES_ACHAT, {
  'p-co-chignon-bas': 'Chignon bas', 'p-co-queue-haute': 'Queue haute', 'p-co-afro': 'Afro', 'p-co-garconne': 'Coupe garçonne', 'p-co-frange': 'Longs à frange',
  'p-co-demi-queue': 'Demi-queue avec nœud', 'p-co-couronne': 'Tresse couronne', 'p-co-mi-longs': 'Mi-longs dégradés', 'p-co-boucles-longues': 'Longues boucles', 'p-co-queue-cote': 'Queue sur le côté',
});

/* ---------- Dans la boutique ---------- */
SHOP.push(
  { id: 'lampadaire', kind: 'deco', em: '💡', name: 'Lampadaire', price: 90 },
  { id: 'etagere', kind: 'deco', em: '📗', name: 'Étagère murale', price: 80 },
  { id: 'bocal', kind: 'deco', em: '🐠', name: 'Poisson rouge', price: 100 },
  { id: 'horloge', kind: 'deco', em: '🕰️', name: 'Horloge', price: 60 },
  { id: 'cactus', kind: 'deco', em: '🌵', name: 'Cactus en fleur', price: 40 },
  { id: 'affiche-ta', kind: 'deco', em: '🌅', name: 'Affiche Tel-Aviv', price: 70 },
  { id: 'pouf', kind: 'deco', em: '🟡', name: 'Pouf', price: 60 },
  { id: 'chiot', kind: 'deco', em: '🐶', name: 'Chiot endormi', price: 150 },
  { id: 'guitare', kind: 'deco', em: '🎸', name: 'Guitare', price: 110 },
  { id: 'tablebasse', kind: 'deco', em: '☕', name: 'Table basse et thé', price: 100 },
  { id: 'miroir', kind: 'deco', em: '🪞', name: 'Miroir doré', price: 90 },
  { id: 'suspension', kind: 'deco', em: '🌿', name: 'Plante suspendue', price: 70 },
  { id: 'coussin-coeur', kind: 'deco', em: '💗', name: 'Coussin cœur', price: 40 },
  { id: 'globe', kind: 'deco', em: '🌍', name: 'Globe terrestre', price: 80 },
  { id: 'lapin', kind: 'deco', em: '🐰', name: 'Lapin en peluche', price: 60 },
  { id: 'lavelampe', kind: 'deco', em: '🫧', name: 'Lampe à lave', price: 70 },
  { id: 'hamsa', kind: 'deco', em: '🪬', name: 'Hamsa', price: 60 },
  { id: 'grenadier', kind: 'deco', em: '🌳', name: 'Grenadier en pot', price: 120 },
  { id: 'tournesols', kind: 'deco', em: '🌻', name: 'Bouquet de tournesols', price: 70 },
  { id: 'affiche-shalom', kind: 'deco', em: '🖼️', name: 'Affiche Shalom', price: 50 },
  { id: 'mur-vagues', kind: 'decor', em: '🌊', name: 'Mur vagues', price: 70 },
  { id: 'mur-grenades', kind: 'decor', em: '🍎', name: 'Mur aux grenades', price: 80 },
  { id: 'mur-terrazzo', kind: 'decor', em: '🎨', name: 'Mur terrazzo', price: 70 },
  { id: 'mur-palmes', kind: 'decor', em: '🌴', name: 'Mur feuilles de palmier', price: 80 },
  { id: 'mur-lavande', kind: 'decor', em: '💜', name: 'Mur lavande', price: 60 },
  { id: 'sol-gris', kind: 'decor', em: '🩶', name: 'Parquet gris', price: 60 },
  { id: 'sol-bleu', kind: 'decor', em: '🟦', name: 'Carreaux bleus', price: 60 },
  { id: 'sol-terrazzo', kind: 'decor', em: '🎨', name: 'Sol terrazzo', price: 90 },
  { id: 'sol-moquette-rose', kind: 'decor', em: '🩷', name: 'Moquette rose', price: 70 },
  { id: 'sol-damier-menthe', kind: 'decor', em: '🍃', name: 'Damier menthe', price: 80 },
  ...Object.entries({ 'p-co-chignon-bas': ['🍥', 80], 'p-co-queue-haute': ['🎀', 80], 'p-co-afro': ['☁️', 100], 'p-co-garconne': ['✂️', 70], 'p-co-frange': ['💇', 80], 'p-co-demi-queue': ['🎗️', 90], 'p-co-couronne': ['👑', 110], 'p-co-mi-longs': ['💁', 80], 'p-co-boucles-longues': ['🌀', 100], 'p-co-queue-cote': ['💫', 80] })
    .map(([id, [em, price]]) => ({ id, kind: 'perso', place: 'coiffure', em, name: CH_COIFFURES_ACHAT[id], price })),
);
