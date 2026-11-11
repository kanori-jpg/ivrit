/* Ma chambre : illustrations (pièce, lumière, objets, personnage). La logique est dans chambre.js. */
const CH_LARGE = 800, CH_HAUT = 520, CH_SOL = 330;
const chMiroir = (svg) => `${svg}<g transform="scale(-1 1)">${svg}</g>`;
const chEtoile = (x, y, r, c) => { let d = ''; for (let i = 0; i < 10; i++) { const a = Math.PI / 5 * i - Math.PI / 2, q = i % 2 ? r * .45 : r; d += `${i ? 'L' : 'M'}${(x + q * Math.cos(a)).toFixed(1)} ${(y + q * Math.sin(a)).toFixed(1)}`; } return `<path d="${d}Z" fill="${c}"/>`; };
const chFleurette = (x, y, r, c, coeur = '#f7d774') => `<g transform="translate(${x} ${y})">${[0, 72, 144, 216, 288].map((a) => `<circle cx="${(r * Math.cos(a * Math.PI / 180)).toFixed(1)}" cy="${(r * Math.sin(a * Math.PI / 180)).toFixed(1)}" r="${r * .8}" fill="${c}"/>`).join('')}<circle r="${r * .6}" fill="${coeur}"/></g>`;
const chFeuilles = (l) => l.map(([x, y, a, n], i) => `<g transform="translate(${x} ${y}) rotate(${a})"><path d="M0 0Q${n * .34} ${-n * .45} 0 ${-n}Q${-n * .34} ${-n * .45} 0 0Z" fill="${['#6fa97c', '#5b9670', '#86bd8b', '#4c845f'][i % 4]}"/><path d="M0-2Q${n * .05} ${-n * .5} 0 ${-n * .9}" stroke="#2f5e43" stroke-width=".8" fill="none" opacity=".45"/></g>`).join('');
const chQuad = (a, b, c, t) => [(1 - t) ** 2 * a[0] + 2 * (1 - t) * t * b[0] + t * t * c[0], (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * b[1] + t * t * c[1]];

/* Ampoules de la guirlande, calculées une fois */
const CH_AMPOULES = [...[0.08, .24, .4, .56, .72, .9].map((t) => chQuad([-210, -6], [-105, 46], [0, 10], t)), ...[0.1, .28, .44, .6, .76, .92].map((t) => chQuad([0, 10], [105, 46], [210, -6], t))];

/* ---------- Objets à poser. Origine (0,0) : le bas de l'objet, sauf pour ce qui s'accroche au mur. ---------- */
const CH_OBJETS = {
  plante: { x: 72, y: 452, art: () => `<ellipse rx="38" ry="6" fill="#2b1f3a" opacity=".2"/>
    <path d="M0-58Q-6-100-18-140M0-58Q4-110 10-162M0-58Q10-90 26-120" stroke="#4d6b45" stroke-width="2.500" fill="none"/>
    ${chFeuilles([[0, -70, -70, 18], [2, -72, 75, 18], [-4, -82, -40, 22], [3, -88, 35, 22], [16, -100, 60, 22], [-9, -102, -55, 24], [6, -106, 40, 24], [22, -110, 30, 20], [26, -120, 70, 18], [-13, -120, -30, 22], [8, -126, 25, 24], [-17, -138, -60, 20], [-19, -142, -10, 22], [10, -144, -20, 22], [12, -160, 15, 20], [9, -162, -35, 18]])}
    <path d="M-26-54H26L20-5Q19 0 14 0H-14Q-19 0-20-5Z" fill="url(#chPot)"/><rect x="-29" y="-61" width="58" height="10" rx="4" fill="url(#chPotBord)"/><ellipse cy="-58" rx="24" ry="2.500" fill="#4a3326"/>
    <path d="M-24-36H24" stroke="#f6e7d8" stroke-width="2" opacity=".55"/>${[-15, -5, 5, 15].map((x) => `<circle cx="${x}" cy="-28" r="1.800" fill="#f6e7d8" opacity=".55"/>`).join('')}<path d="M-20-48Q-22-24-16-6" stroke="#fff" stroke-width="3" opacity=".18" fill="none" stroke-linecap="round"/>` },
  bougie: { x: 472, y: 296, lueurs: [[0, -60, 70]], art: () => `<circle cy="-58" r="28" fill="url(#chLueur)" opacity=".75"/><ellipse cy="-3" rx="20" ry="5" fill="url(#chOr)"/>
    <rect x="-10" y="-46" width="20" height="43" rx="3" fill="url(#chCire)"/><ellipse cy="-46" rx="10" ry="3" fill="#fff7e6"/><path d="M-10-44Q-9-34-7-36Q-6-43-4-44Z" fill="#fff7e6"/>
    <path d="M0-46V-51" stroke="#3a2b22" stroke-width="1.200"/><path d="M0-70Q9-57 0-50Q-9-57 0-70Z" fill="url(#chFlamme)"/><path d="M0-61Q3-55 0-52Q-3-55 0-61Z" fill="#fff6c9"/>` },
  livres: { x: 150, y: 496, art: () => `<ellipse rx="48" ry="5" fill="#2b1f3a" opacity=".2"/>
    <rect x="-40" y="-15" width="80" height="15" rx="2" fill="#5a7fb0"/><rect x="31" y="-13" width="7" height="11" fill="#f5efe3"/><path d="M-36-10H24M-36-5H24" stroke="#e8cf8e" stroke-width="1.200" opacity=".8"/>
    <g transform="rotate(-3)"><rect x="-34" y="-29" width="70" height="14" rx="2" fill="#b65a72"/><rect x="-33" y="-27" width="6" height="10" fill="#f5efe3"/><path d="M-20-22H30" stroke="#f5d6dd" stroke-width="1" opacity=".7"/></g>
    <rect x="-28" y="-42" width="58" height="13" rx="2" fill="#d9a74a"/><rect x="22" y="-41" width="6" height="11" fill="#f5efe3"/><path d="M-24-35H16" stroke="#fff3cf" stroke-width="1" opacity=".8"/><path d="M-10-42V-26L-7-30L-4-26V-42" fill="#c75d6f"/>
    <ellipse cx="6" cy="-43" rx="16" ry="3" fill="#efe6dc"/><path d="M-4-60H16Q16-46 6-43Q-4-46-4-60Z" fill="#fbf7f1"/><path d="M16-56Q23-56 22-50Q21-46 15-47" stroke="#fbf7f1" stroke-width="2.500" fill="none"/><ellipse cx="6" cy="-60" rx="10" ry="2" fill="#b07a55"/>
    <path class="ch-vapeur" d="M2-64Q-2-70 2-76Q6-82 2-88" stroke="#fff" stroke-width="1.600" fill="none" opacity=".7" stroke-linecap="round"/><path class="ch-vapeur ch-v2" d="M9-64Q5-71 9-78" stroke="#fff" stroke-width="1.400" fill="none" opacity=".6" stroke-linecap="round"/>` },
  ours: { x: 628, y: 334, art: () => `<ellipse rx="40" ry="6" fill="#2b1f3a" opacity=".2"/>
    <g fill="url(#chFourrure)"><circle cx="-17" cy="-90" r="9"/><circle cx="17" cy="-90" r="9"/><ellipse cy="-34" rx="25" ry="27"/><ellipse cx="-25" cy="-40" rx="9" ry="15" transform="rotate(18 -25 -40)"/><ellipse cx="25" cy="-40" rx="9" ry="15" transform="rotate(-18 25 -40)"/><ellipse cx="-16" cy="-9" rx="13" ry="9"/><ellipse cx="16" cy="-9" rx="13" ry="9"/><circle cy="-72" r="22"/></g>
    <circle cx="-17" cy="-90" r="4.500" fill="#e7b98f"/><circle cx="17" cy="-90" r="4.500" fill="#e7b98f"/><ellipse cy="-30" rx="14" ry="15" fill="#e3c39c" opacity=".7"/><ellipse cx="-16" cy="-8" rx="6" ry="4.500" fill="#ecd3b2"/><ellipse cx="16" cy="-8" rx="6" ry="4.500" fill="#ecd3b2"/>
    <ellipse cy="-65" rx="10" ry="8" fill="#ecd3b2"/><ellipse cy="-69" rx="4" ry="3" fill="#3b2a2a"/><path d="M0-66V-63M-4-61Q0-63 4-61" stroke="#3b2a2a" stroke-width="1.200" fill="none"/>
    <circle cx="-8" cy="-78" r="2.800" fill="#2b1f2a"/><circle cx="8" cy="-78" r="2.800" fill="#2b1f2a"/><circle cx="-7" cy="-79" r=".9" fill="#fff"/><circle cx="9" cy="-79" r=".9" fill="#fff"/>
    <path d="M12-26L20-18M20-26L12-18" stroke="#8a5c3a" stroke-width="1.200" opacity=".6"/><path d="M0-51L-14-58V-44ZM0-51L14-58V-44Z" fill="#e46a92"/><circle cy="-51" r="3.500" fill="#c94f7a"/>
    <path d="M14-90Q22-70 20-40Q24-20 18-4" stroke="#000" stroke-width="10" opacity=".06" fill="none"/>` },
  cadre: { x: 390, y: 140, mur: true, art: () => `<rect x="-58" y="-42" width="124" height="96" rx="3" fill="#2b1f3a" opacity=".14"/><path d="M-20-48L0-66L20-48" stroke="#8a6a2a" stroke-width="1" fill="none"/><circle cy="-66" r="2.500" fill="#8a6a2a"/>
    <rect x="-62" y="-48" width="124" height="96" rx="3" fill="url(#chOr)"/><rect x="-54" y="-40" width="108" height="80" fill="#8a6a2a" opacity=".45"/><rect x="-50" y="-36" width="100" height="72" fill="url(#chToile)"/>
    <circle cx="16" cy="2" r="9" fill="#fff0cc"/><circle cx="16" cy="2" r="16" fill="#fff0cc" opacity=".3"/>
    <path d="M-50 14Q-20 2 6 12T50 8V36H-50Z" fill="#c4a2c6"/><path d="M-36 14V6A9 9 0 0 1-18 6V14Z" fill="#b08cb5"/><rect x="-12" y="-2" width="5" height="14" fill="#b08cb5"/><path d="M26 14Q24 2 28-10Q32 2 30 14Z" fill="#8f7aa8"/>
    <path d="M-50 26Q-10 14 20 24T50 22V36H-50Z" fill="#9b82b4"/><path d="M-30-18q3-3 6 0q3-3 6 0" stroke="#7a6a94" stroke-width=".8" fill="none"/>
    <rect x="-62" y="-48" width="124" height="96" rx="3" fill="none" stroke="#fff4c9" stroke-width="1" opacity=".5"/>` },
  lune: { x: 600, y: 112, mur: true, lueurs: [[0, 0, 120]], art: () => `<path d="M0-90V-38" stroke="#b9a98a" stroke-width="1"/><circle r="64" fill="url(#chLueur)" opacity=".5"/>
    <path d="M12-36A36 36 0 1 0 12 36A44 44 0 0 1 12-36Z" fill="url(#chLune)"/><circle cx="-18" cy="-8" r="3" fill="#e8c35e" opacity=".5"/><circle cx="-12" cy="14" r="2" fill="#e8c35e" opacity=".5"/>
    <path d="M-44-60V8M42-60V22M30-60V-8" stroke="#b9a98a" stroke-width=".7"/>${chEtoile(-44, 14, 7, '#f7d774')}${chEtoile(42, 28, 6, '#fbe3a0')}${chEtoile(30, -2, 4.500, '#f7d774')}` },
  fauteuil: { x: 240, y: 478, art: () => `<ellipse rx="72" ry="8" fill="#2b1f3a" opacity=".22"/>
    ${chMiroir('<path d="M-50-14L-47 0H-42L-42-14Z" fill="#7d5136"/>')}
    <path d="M-50-50Q-56-114 0-118Q56-114 50-50Z" fill="url(#chVelours)"/>${[[-26, -96], [0, -100], [26, -96], [-30, -74], [-10, -78], [10, -78], [30, -74]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="#7a2f58"/><path d="M${x - 8} ${y - 6}L${x} ${y}L${x + 8} ${y - 6}" stroke="#7a2f58" stroke-width=".8" opacity=".35" fill="none"/>`).join('')}
    <path d="M-30-112Q-44-100-44-70" stroke="#fff" stroke-width="4" opacity=".14" fill="none" stroke-linecap="round"/>
    <path d="M-56-44Q0-38 56-44L54-14Q0-8-54-14Z" fill="#9c4673"/>
    <path d="M-46-58Q0-66 46-58Q50-46 46-42Q0-36-46-42Q-50-46-46-58Z" fill="#d17aa3"/>
    <g transform="rotate(-12 -16 -66)"><rect x="-32" y="-82" width="32" height="28" rx="8" fill="#f1d6e2"/><path d="M-26-68H-6" stroke="#d9aebf" stroke-width="1"/></g>
    ${chMiroir('<path d="M-66-78Q-70-90-57-90Q-47-88-47-74L-47-16Q-57-11-64-16Z" fill="url(#chVelours)"/><ellipse cx="-57" cy="-82" rx="9" ry="7" fill="#e08ab2" opacity=".5"/>')}
    <path d="M42-88Q60-94 70-80L68-34Q60-28 54-34L50-70Z" fill="#f2d9a8"/><path d="M58-86L60-34M64-84L65-36" stroke="#e0b66e" stroke-width="2"/><path d="M54-34V-26M58-32V-24M62-32V-24M66-34V-26" stroke="#e0b66e" stroke-width="1.200"/>` },
  hanoukia: { x: 200, y: 246, lueurs: [[0, -66, 90]], art: () => { const pos = [-40, -30, -20, -10, 10, 20, 30, 40]; const cierge = (x, y, i) => `<rect x="${x - 2}" y="${y - 13}" width="4" height="13" fill="${i % 2 ? '#a9c7ea' : '#f2f4fb'}"/><circle cx="${x}" cy="${y - 19}" r="7" fill="url(#chLueur)" opacity=".8"/><path d="M${x} ${y - 23}Q${x + 3} ${y - 18} ${x} ${y - 14}Q${x - 3} ${y - 18} ${x} ${y - 23}Z" fill="url(#chFlamme)"/>`;
    return `<ellipse rx="26" ry="3" fill="#2b1f3a" opacity=".2"/>${[10, 20, 30, 40].map((r) => `<path d="M${-r} -50A${r} ${r * .8} 0 0 0 ${r} -50" stroke="url(#chOr)" stroke-width="2.600" fill="none"/>`).join('')}
      <rect x="-2.500" y="-62" width="5" height="54" fill="url(#chOr)"/><ellipse cy="-30" rx="4" ry="2.500" fill="#e8c26a"/><path d="M-18 0Q-16-9-5-10H5Q16-9 18 0Z" fill="url(#chOr)"/>
      ${pos.map((x) => `<rect x="${x - 3.500}" y="-53" width="7" height="3" rx="1" fill="#d9ad4e"/>`).join('')}<rect x="-3.500" y="-65" width="7" height="3" rx="1" fill="#d9ad4e"/>
      ${pos.map((x, i) => cierge(x, -53, i)).join('')}${cierge(0, -65, 1)}`; } },
  hatoul: { x: 330, y: 506, art: () => `<ellipse rx="38" ry="6" fill="#2b1f3a" opacity=".22"/>
    <path d="M22-6Q46-6 44-30Q42-44 33-40" stroke="url(#chChat)" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M-24-4Q-30-40-16-66Q0-76 16-66Q30-40 24-4Z" fill="url(#chChat)"/><path d="M-9-62Q0-50 9-62Q8-36 0-30Q-8-36-9-62Z" fill="#dcd7e3" opacity=".85"/>
    <path d="M-12-32V-5M12-32V-5" stroke="#6d6579" stroke-width="8" stroke-linecap="round"/><ellipse cx="-12" cy="-3" rx="7" ry="4" fill="#dcd7e3"/><ellipse cx="12" cy="-3" rx="7" ry="4" fill="#dcd7e3"/>
    ${chMiroir('<path d="M-19-88L-16-112L-3-98Z" fill="#787088"/><path d="M-15-93L-14-105L-7-98Z" fill="#e9b3c4"/>')}<ellipse cy="-82" rx="21" ry="18" fill="url(#chChat)"/>
    <path d="M-4-98L-3-92M0-99V-92M4-98L3-92" stroke="#4f4859" stroke-width="1.400"/>
    ${chMiroir('<path d="M-13-84Q-8-89-3-84Q-8-79-13-84Z" fill="#c3d872"/><ellipse cx="-8" cy="-84" rx="1.300" ry="3.500" fill="#1f1a26"/><circle cx="-7" cy="-85.500" r=".8" fill="#fff"/><path d="M-6-73L-24-76M-6-71L-24-70" stroke="#fff" stroke-width=".7" opacity=".7"/>')}
    <path d="M-3-76H3L0-73Z" fill="#e48aa3"/><path d="M0-73Q-3-70-5-71M0-73Q3-70 5-71" stroke="#3b3346" stroke-width=".8" fill="none"/>` },
  tapis: { x: 400, y: 452, plat: true, art: () => `${[-1, 1].map((s) => [...Array(13).keys()].map((i) => { const a = (s < 0 ? Math.PI : 0) + (i - 6) * .07; return `<path d="M${(150 * Math.cos(a)).toFixed(1)} ${(46 * Math.sin(a)).toFixed(1)}l${(9 * Math.cos(a)).toFixed(1)} ${(3 * Math.sin(a)).toFixed(1)}" stroke="#f1e2d6" stroke-width="1.600"/>`; }).join('')).join('')}
    <ellipse rx="152" ry="47" fill="#c97f98"/><ellipse rx="142" ry="42" fill="#f5e6dd"/><ellipse rx="128" ry="37" fill="#9d86c9"/><ellipse rx="118" ry="33" fill="#f5e6dd"/>
    ${[...Array(14).keys()].map((i) => { const a = i / 14 * Math.PI * 2, x = 101 * Math.cos(a), y = 27 * Math.sin(a); return `<path d="M${(x - 6).toFixed(1)} ${y.toFixed(1)}L${x.toFixed(1)} ${(y - 3).toFixed(1)}L${(x + 6).toFixed(1)} ${y.toFixed(1)}L${x.toFixed(1)} ${(y + 3).toFixed(1)}Z" fill="#c97f98"/>`; }).join('')}
    <ellipse rx="80" ry="21" fill="#e3b48f"/><ellipse rx="70" ry="17" fill="#f5e6dd"/><g transform="scale(1 .3)">${[0, 45, 90, 135].map((a) => `<ellipse rx="34" ry="9" transform="rotate(${a})" fill="#c97f98" opacity=".75"/>`).join('')}<circle r="9" fill="#9d86c9"/></g>
    <ellipse rx="135" ry="40" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="2 4" opacity=".45"/>` },
  guirlande: { x: 520, y: 30, mur: true, lueurs: CH_AMPOULES.map(([x, y]) => [x, y + 10, 34]), art: () => `<path d="M-210-6Q-105 46 0 10Q105 46 210-6" fill="none" stroke="#5b4a6e" stroke-width="1.500"/>
    ${[[.5, 0], [.5, 1]].map(([t, k]) => { const [x, y] = k ? chQuad([0, 10], [105, 46], [210, -6], .2) : chQuad([-210, -6], [-105, 46], [0, 10], .48); return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${k ? 6 : -5})"><rect x="-11" y="3" width="22" height="26" fill="#fbf7f1"/><rect x="-8" y="6" width="16" height="15" fill="${k ? '#c9b6e6' : '#f3c1c9'}"/><circle cx="${k ? 3 : -2}" cy="11" r="3" fill="#fff0cc"/><path d="M-8 21L-2 15L3 19L8 14V21Z" fill="${k ? '#8f7aa8' : '#b98a9c'}"/><rect x="-2" y="-2" width="4" height="8" rx="1" fill="#c9a96e"/></g>`; }).join('')}
    ${CH_AMPOULES.map(([x, y], i) => `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle cy="10" r="13" fill="url(#chLueur)" opacity=".55"/><rect x="-2.500" y="-1" width="5" height="5" rx="1" fill="#5b4a6e"/><ellipse cy="10" rx="4.500" ry="6.500" fill="${['#ffe08f', '#ffd2b0', '#fff1b8'][i % 3]}"/><ellipse cx="-1.500" cy="8" rx="1.200" ry="2.500" fill="#fff" opacity=".7"/></g>`).join('')}` },
  affiche: { x: 720, y: 118, mur: true, art: () => { const branche = (s) => `<g transform="scale(${s} 1)"><path d="M-38 52Q-30 30-36 10" stroke="#7d9a6e" stroke-width="1.200" fill="none"/>${[[-36, 44, -30], [-33, 36, 40], [-35, 28, -40], [-33, 20, 35], [-36, 14, -20]].map(([x, y, a]) => `<ellipse cx="${x}" cy="${y}" rx="2.200" ry="5" transform="rotate(${a} ${x} ${y})" fill="#8aa27a"/>`).join('')}</g>`;
    return `<rect x="-40" y="-52" width="88" height="116" fill="#2b1f3a" opacity=".12"/><rect x="-44" y="-58" width="88" height="116" fill="#fbf5ec"/><rect x="-38" y="-52" width="76" height="104" fill="none" stroke="#c9a96e" stroke-width="1"/>
      ${branche(1)}${branche(-1)}<text y="20" text-anchor="middle" font-size="62" font-family="'Frank Ruhl Libre', serif" font-weight="700" fill="#4a2f8e">א</text><text y="42" text-anchor="middle" font-size="11" font-family="'Frank Ruhl Libre', serif" fill="#8e73b9">אָלֶף</text>
      <rect x="-14" y="-64" width="28" height="11" fill="#e8a7bd" opacity=".85" transform="rotate(-4)"/>`; } },
};

/* ---------- Murs et sols ---------- */
const CH_MURS = {
  lilas: { nom: 'Lilas', haut: '#e9e1f2', bas: '#d9cde9', motif: '<path d="M30 18Q34 26 30 34M30 24l-4-3M30 29l4-3" stroke="#b7a3d6" stroke-width="1" fill="none"/><circle cx="30" cy="17" r="1.500" fill="#d9a7c7"/><circle cx="0" cy="48" r="1.200" fill="#b7a3d6"/><circle cx="60" cy="48" r="1.200" fill="#b7a3d6"/>', taille: 60, op: .55 },
  'mur-ciel': { nom: 'Bleu ciel', haut: '#dcebf4', bas: '#c3d9ea', motif: '<ellipse cx="20" cy="22" rx="12" ry="4" fill="#fff"/><ellipse cx="27" cy="19" rx="7" ry="4" fill="#fff"/><ellipse cx="62" cy="62" rx="10" ry="3.500" fill="#fff"/>', taille: 80, op: .55 },
  'mur-peche': { nom: 'Pêche', haut: '#fbe7d8', bas: '#f1cfb9', motif: '<path d="M7 0V28" stroke="#eec4ab" stroke-width="1"/><circle cx="21" cy="14" r="1.300" fill="#e7b095"/>', taille: 28, op: .7 },
  'mur-rayures': { nom: 'Rayures', haut: '#fbeef2', bas: '#f1dbe4', motif: '<rect width="16" height="40" fill="#f2d2df"/><path d="M24 0V40" stroke="#ecc6d5" stroke-width="1"/>', taille: 40, op: 1 },
  'mur-etoiles': { nom: 'Étoiles', haut: '#41376f', bas: '#2b2456', motif: `${chEtoile(18, 16, 4, '#f2d98a')}${chEtoile(54, 50, 2.800, '#f2d98a')}<circle cx="44" cy="14" r="1" fill="#fff"/><circle cx="12" cy="56" r=".9" fill="#fff"/>`, taille: 70, op: .9 },
};
const CH_SOLS = {
  bois: { nom: 'Bois', a: '#bb8a64', b: '#8a5d41', ligne: '#5e3d2a', type: 'planches' },
  'sol-clair': { nom: 'Parquet clair', a: '#ecd5b4', b: '#cba982', ligne: '#a3825d', type: 'planches' },
  'sol-carrelage': { nom: 'Carrelage', a: '#f1ece4', b: '#d6ccc0', ligne: '#b3a798', type: 'carreaux' },
};

/* ---------- Personnage ---------- */
const CH_PEAUX = ['#f6d7bf', '#eec3a1', '#d9a57c', '#a9744f', '#6e4530'];
const CH_CHEVEUX = ['#2b2230', '#513040', '#8a5a33', '#d4a55a', '#b5482f', '#8e73b9'];
const CH_COIFFURES = { longs: 'Longs', carre: 'Carré', queue: 'Queue', chignon: 'Chignon', boucles: 'Boucles', courts: 'Courts' };
const CH_EMPLACEMENTS = { pose: 'Pose', tenue: 'Tenue', tete: 'Sur la tête', yeux: 'Lunettes', cou: 'Autour du cou', dos: 'Dans le dos', main: 'Dans la main' };
const CH_PERSO_DEFAUT = { peau: CH_PEAUX[1], cheveux: CH_CHEVEUX[1], coiffure: 'longs', pose: '', tenue: '', tete: '', yeux: '', cou: '', dos: '', main: '' };
/* Personnage en style kawaii : grosse tête, grands yeux brillants, contours foncés, couleurs franches */
const CH_TRAIT = '#3a2730';
const CH_O = `stroke="${CH_TRAIT}" stroke-width="2" stroke-linejoin="round"`;
const CH_OMBRE = 'rgba(60,20,40,.13)';
// Un tube cerné (bras, jambes, manches) : trait foncé dessous, couleur dessus
const chTube = (d, c, l = 7.500) => `<path d="${d}" stroke="${CH_TRAIT}" stroke-width="${l + 3.400}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${c}" stroke-width="${l}" fill="none" stroke-linecap="round"/>`;
// Une masse de cercles cernée seulement à l'extérieur (boucles)
const chNuage = (l, c) => l.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${CH_TRAIT}" stroke="${CH_TRAIT}" stroke-width="4"/>`).join('') + l.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`).join('');
const CH_BRAS = { g: 'M-14-143Q-21-125-22-101', d: 'M14-143Q21-125 22-101' };
const CH_JAMBES = { g: 'M-6-98L-7-7', d: 'M6-98L7-7' };
const CH_PIEDS = [-7, 7];

const chBaskets = (c, lacet) => CH_PIEDS.map((x) => `<path d="M${x - 7} 0Q${x - 8}-9 ${x}-10Q${x + 8}-9 ${x + 7} 0Z" fill="${c}" ${CH_O}/><path d="M${x - 6.500}-2.500H${x + 6.500}" stroke="${CH_TRAIT}" stroke-width="1.200"/><path d="M${x - 2.500}-7.500L${x + 2.500}-6.500M${x - 2.500}-5.500L${x + 2.500}-4.500" stroke="${lacet}" stroke-width="1.300"/>`).join('');
const chBallerines = (c) => CH_PIEDS.map((x) => `<path d="M${x - 6} 0Q${x - 6.500}-6 ${x}-7Q${x + 6.500}-6 ${x + 6} 0Z" fill="${c}" ${CH_O}/><circle cx="${x}" cy="-5.500" r="1.600" fill="#fff4f0"/>`).join('');
const chBottines = (c) => CH_PIEDS.map((x) => `<path d="M${x - 5}-14H${x + 5}L${x + 6}-3Q${x + 7} 0 ${x + 3} 0H${x - 6}Q${x - 7}-1 ${x - 6}-4Z" fill="${c}" ${CH_O}/>`).join('');
const chPantalon = (c, d, ourlet) => `<path d="${d}" fill="${c}" ${CH_O}/><path d="M-11-60Q-8-57-5-60M5-60Q8-57 11-60" stroke="rgba(0,0,0,.18)" stroke-width="1" fill="none"/>${ourlet ? `<path d="M-13-18H-2.200M2.200-18H13" stroke="${CH_TRAIT}" stroke-width="1.300"/>` : ''}`;

const CH_TENUES = {
  '': () => ({ corps: `${chPantalon('#5c7fb8', 'M-14-102H14L13-11H2.500L0-78L-2.500-11H-13Z', true)}<path d="M0-101V-90" stroke="rgba(0,0,0,.2)" stroke-width="1"/>${chBaskets('#fbf7f2', '#e46a92')}
      <path d="M-7-148Q0-144 7-148L16-146L23-131L15-127.500L14-99H-14L-15-127.500L-23-131L-16-146Z" fill="#b9a6e2" ${CH_O}/><path d="M7-140Q11-118 10-100H14L15-127.500Z" fill="${CH_OMBRE}"/><path d="M-6-148Q0-142 6-148" stroke="${CH_TRAIT}" stroke-width="1.400" fill="none"/>`, manches: '' }),
  'p-robe': () => {
    const robe = 'M-6-148Q0-144 6-148L12-147Q13-130 14-118Q22-98 30-68Q0-60-30-68Q-22-98-14-118Q-13-130-12-147Z';
    return { corps: `<defs><clipPath id="chClipRobe"><path d="${robe}"/></clipPath></defs>${chBallerines('#e47a90')}
      <path d="${robe}" fill="#f4b3c4" ${CH_O}/><g clip-path="url(#chClipRobe)">${[[-20, -76], [-6, -84], [10, -78], [22, -72], [-14, -98], [6, -104], [-2, -128], [8, -140], [-8, -138], [16, -92], [-24, -70], [0, -70]].map(([x, y], i) => chFleurette(x, y, 2, i % 2 ? '#fff' : '#c8b8ea')).join('')}<path d="M6-146Q16-110 30-68H18Q12-100 4-140Z" fill="${CH_OMBRE}"/></g>
      <path d="M-14-121Q0-118 14-121V-115Q0-112-14-115Z" fill="#fff" ${CH_O}/><path d="M-30-68Q-15-63 0-64Q15-63 30-68" stroke="${CH_TRAIT}" stroke-width="2" fill="none"/><path d="M-27-72Q0-65 27-72" stroke="#fff" stroke-width="1.500" stroke-dasharray="2 3" fill="none"/>`, manches: '' };
  },
  'p-pull': () => {
    const pull = 'M-7-148Q0-144 7-148L16-146Q18-122 16-97H-16Q-18-122-16-146Z';
    return { corps: `<defs><clipPath id="chClipPull"><path d="${pull}"/></clipPath></defs>${chPantalon('#c99a6a', 'M-15-100H15L15-11H3L0-76L-3-11H-15Z', false)}${chBaskets('#fbf7f2', '#4f64a0')}
      <path d="${pull}" fill="#fbf6ee" ${CH_O}/><g clip-path="url(#chClipPull)">${[...Array(7).keys()].map((i) => `<rect x="-20" y="${-140 + i * 7}" width="40" height="3.200" fill="#4f64a0"/>`).join('')}</g><path d="M-7-148Q0-142 7-148" stroke="#4f64a0" stroke-width="2.400" fill="none"/>`,
      manches: ['g', 'd'].map((s) => `${chTube(CH_POSE.bras[s], '#fbf6ee', 8.500)}<path d="${CH_POSE.bras[s]}" stroke="#4f64a0" stroke-width="8.500" stroke-dasharray="3 4" fill="none"/>`).join('') };
  },
  'p-salopette': () => ({ corps: `${chPantalon('#6d8fc0', 'M-15-108H15L14-11H2.500L0-78L-2.500-11H-14Z', true)}${chBaskets('#fbf7f2', '#e6b85e')}
      <path d="M-7-148Q0-144 7-148L16-146L23-131L15-127.500L14-106H-14L-15-127.500L-23-131L-16-146Z" fill="#fff8ee" ${CH_O}/><path d="M-6-148Q0-142 6-148" stroke="${CH_TRAIT}" stroke-width="1.400" fill="none"/>
      <path d="M-10-134H10L11-106H-11Z" fill="#6d8fc0" ${CH_O}/><rect x="-5" y="-129" width="10" height="9" rx="1.500" fill="none" stroke="#e6c98c" stroke-width="1" stroke-dasharray="1.500 1.200"/>
      <path d="M-9-133L-12-147M9-133L12-147" stroke="${CH_TRAIT}" stroke-width="5"/><path d="M-9-133L-12-147M9-133L12-147" stroke="#6d8fc0" stroke-width="3"/><circle cx="-9" cy="-132" r="1.800" fill="#e6c98c" ${CH_O.replace('2"', '1"')}/><circle cx="9" cy="-132" r="1.800" fill="#e6c98c" ${CH_O.replace('2"', '1"')}/>`, manches: '' }),
  'p-sport': () => ({ corps: `${chPantalon('#7b63b8', 'M-14-102H14L13-15H2.500L0-78L-2.500-15H-13Z', false)}<path d="M-13-98L-12-16M13-98L12-16" stroke="#fff" stroke-width="1.400"/><path d="M-13-16H-2.500V-11H-12.500ZM2.500-16H13L12.500-11H2.500Z" fill="#6a52a6" ${CH_O.replace('2"', '1.400"')}/>${chBaskets('#fbf7f2', '#7b63b8')}
      <path d="M-7-148Q0-144 7-148L16-146Q17-122 15-98H-15Q-17-122-16-146Z" fill="#9a84d4" ${CH_O}/><path d="M0-146V-99" stroke="${CH_TRAIT}" stroke-width="1.200"/><rect x="-1.500" y="-140" width="3" height="5" rx="1" fill="#f2eef9" ${CH_O.replace('2"', '.8"')}/><path d="M-9-150Q0-144 9-150L7-145Q0-141-7-145Z" fill="#8a72c6" ${CH_O.replace('2"', '1.400"')}/>`,
      manches: ['g', 'd'].map((s) => `${chTube(CH_POSE.bras[s], '#9a84d4', 8.500)}<path d="${CH_POSE.bras[s]}" stroke="#fff" stroke-width="1.300" fill="none" transform="translate(${s === 'd' ? 2.800 : -2.800} 0)"/>`).join('') }),
};

const CH_ACCESSOIRES = {
  'p-chapeau': () => `<g transform="rotate(-8 0 -226)"><ellipse cy="-226" rx="58" ry="12" fill="#efd59d" ${CH_O}/><ellipse cy="-226" rx="50" ry="8.500" fill="none" stroke="#d4b672" stroke-width="1.200" stroke-dasharray="2.500 2.500"/>
    <path d="M-30-228Q-31-266 0-266Q31-266 30-228Z" fill="#e6c785" ${CH_O}/><path d="M-30-239Q0-233 30-239V-229Q0-224-30-229Z" fill="#e46a92" ${CH_O}/><path d="M28-236Q42-228 40-212M30-232Q46-226 46-214" stroke="${CH_TRAIT}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M28-236Q42-228 40-212M30-232Q46-226 46-214" stroke="#e46a92" stroke-width="3" fill="none" stroke-linecap="round"/>${chFleurette(-18, -234, 3.600, '#fff')}</g>`,
  'p-bonnet': () => `<path d="M-42-206Q-44-258 0-260Q44-258 42-206Z" fill="#e07a8f" ${CH_O}/>${[-24, -12, 0, 12, 24].map((x) => `<path d="M${x * .8}-254Q${x}-236 ${x * 1.15}-214" stroke="rgba(0,0,0,.15)" stroke-width="1.400" fill="none"/>`).join('')}<path d="M-44-216Q0-207 44-216V-201Q0-192-44-201Z" fill="#c95f75" ${CH_O}/>${[-36, -27, -18, -9, 0, 9, 18, 27, 36].map((x) => `<path d="M${x}-214V-200" stroke="rgba(0,0,0,.18)" stroke-width="1.200"/>`).join('')}<circle cy="-262" r="11" fill="#fff3ea" ${CH_O}/>`,
  'p-couronne': () => `<path d="M-40-208Q0-246 40-208" stroke="#6f9a62" stroke-width="2.400" fill="none"/>${[[-38, -212], [-26, -226], [-9, -233], [9, -233], [26, -226], [38, -212]].map(([x, y], i) => `<ellipse cx="${x + (i < 3 ? 5 : -5)}" cy="${y + 2}" rx="2.600" ry="5" transform="rotate(${i < 3 ? 60 : -60} ${x} ${y})" fill="#8ab27a" ${CH_O.replace('2"', '1"')}/>${chFleurette(x, y, 3.800, ['#f6a8bd', '#fff', '#c8b8ea', '#f7d774'][i % 4], '#e8a04e')}`).join('')}`,
  'p-casquette': () => `<path d="M-42-206Q-44-254 0-256Q44-254 42-206Z" fill="#2f9a8d" ${CH_O}/><path d="M0-256V-208M-22-250Q-24-230-26-208M22-250Q24-230 26-208" stroke="rgba(0,0,0,.18)" stroke-width="1.300" fill="none"/><circle cy="-256" r="3" fill="#23736a" ${CH_O.replace('2"', '1"')}/><path d="M-44-208Q0-197 44-208Q52-198 40-193Q0-185-40-193Q-52-198-44-208Z" fill="#23736a" ${CH_O}/>`,
  'p-lunettes': () => `<g fill="rgba(255,255,255,.18)" stroke="#a87b2f" stroke-width="2.200"><circle cx="-15" cy="-186" r="13"/><circle cx="15" cy="-186" r="13"/></g><path d="M-2-188Q0-191 2-188M-28-188L-38-191M28-188L38-191" stroke="#a87b2f" stroke-width="2" fill="none"/>`,
  'p-solaires': () => `${chMiroir(`<path d="M-27-192Q-15-197-3-192Q-2-180-15-176Q-28-180-27-192Z" fill="#2b2230" ${CH_O}/><path d="M-22-189L-17-188" stroke="#fff" stroke-width="1.600" opacity=".6"/>`)}<path d="M-3-190Q0-193 3-190" stroke="${CH_TRAIT}" stroke-width="2" fill="none"/>`,
  'p-echarpe': () => `<path d="M-15-155Q0-145 15-155L17-143Q0-133-17-143Z" fill="#e2ad55" ${CH_O}/><path d="M3-145H13L12-112H2Z" fill="#e2ad55" ${CH_O}/><path d="M5-140V-116M9-140V-116" stroke="rgba(0,0,0,.15)" stroke-width="1"/><path d="M3-112V-107M6-112V-106M9-112V-106M12-112V-107" stroke="#e2ad55" stroke-width="1.500"/>`,
  'p-collier': () => `<path d="M-6-148Q0-133 6-148" stroke="#c9a23f" stroke-width="1" fill="none"/><path d="M0-131.500Q-4-136-4-138Q-4-140.500-1.700-140.500Q0-140.500 0-138.500Q0-140.500 1.700-140.500Q4-140.500 4-138Q4-136 0-131.500Z" fill="#f08aa6" ${CH_O.replace('2"', '.8"')}/>`,
  'p-sac': { arriere: () => `<path d="M-21-146Q-23-155-12-155H12Q23-155 21-146L23-104Q23-97 16-97H-16Q-23-97-23-104Z" fill="#9b80c9" ${CH_O}/>`, devant: () => `<path d="M-10-146Q-14-128-13-108M10-146Q14-128 13-108" stroke="${CH_TRAIT}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-10-146Q-14-128-13-108M10-146Q14-128 13-108" stroke="#7a62ad" stroke-width="3" fill="none" stroke-linecap="round"/>` },
};

/* Coiffures : une calotte derrière la tête, puis la frange par-dessus le visage */
const CH_CALOTTE = 'M0-236Q-45-236-45-192Q-45-176-41-166L41-166Q45-176 45-192Q45-236 0-236Z';
const chFrangeCote = (forme, traits, clair) => forme('M-39-188Q-44-236 2-238Q38-238 40-200Q36-220 16-226Q-10-226-26-212Q-36-202-39-188Z') + traits(['M10-234Q-10-230-26-214', 'M20-232Q32-226 36-210', 'M-2-235Q-18-228-32-206']) + traits(['M-14-232Q-26-226-31-216'], clair, 2.200);
function chCheveux(p) {
  const ch = p.cheveux, sombre = 'rgba(30,8,20,.22)', clair = 'rgba(255,255,255,.32)';
  const forme = (d) => `<path d="${d}" fill="${ch}" ${CH_O}/>`;
  const traits = (l, c = sombre, w = 1.300) => `<path d="${l.join('')}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
  const frange = chMiroir(forme('M0-234Q-26-234-36-214Q-41-202-39-186Q-38-198-35-207Q-26-218 0-223Z') + traits(['M-6-230Q-20-227-31-214', 'M-14-228Q-28-220-36-204'])) + traits(['M-14-232Q-26-228-32-218'], clair, 2.200) + `<path d="M0-235V-222" stroke="${sombre}" stroke-width="1.400"/>`;
  const meches = chMiroir(forme('M-38-212Q-46-178-42-152Q-40-136-44-120Q-42-108-36-104Q-38-116-34-128Q-30-146-32-170Q-32-192-30-210Z') + traits(['M-38-186Q-42-160-39-140', 'M-36-150Q-37-130-39-114']));
  const styles = {
    longs: { arriere: forme('M0-236Q-46-236-46-192Q-48-160-45-136Q-48-118-42-104Q-46-96-38-90Q-34-96-30-92Q-28-100-30-112L30-112Q28-100 30-92Q34-96 38-90Q46-96 42-104Q48-118 45-136Q48-160 46-192Q46-236 0-236Z') + chMiroir(traits(['M-42-180Q-46-150-42-112', 'M-36-170Q-40-140-36-100'])), devant: meches + frange },
    carre: { arriere: forme('M0-236Q-46-236-46-192Q-47-168-42-152Q-32-147-26-152L26-152Q32-147 42-152Q47-168 46-192Q46-236 0-236Z'), devant: chMiroir(forme('M-38-212Q-44-180-41-158Q-36-154-32-158Q-33-178-30-210Z') + traits(['M-38-190Q-40-176-38-162'])) + frange },
    queue: { arriere: forme('M24-224Q56-226 54-186Q54-160 42-136Q40-150 40-166Q34-148 30-140Q36-168 34-190Q30-210 18-216Z') + traits(['M30-220Q48-212 46-170', 'M28-214Q40-200 36-160']) + forme(CH_CALOTTE), devant: chMiroir(forme('M-38-210Q-41-188-38-176Q-35-182-32-208Z')) + frange + `<ellipse cx="27" cy="-222" rx="6" ry="8" fill="#e46a92" ${CH_O} transform="rotate(30 27 -222)"/>` },
    chignon: { arriere: forme('M0-258A18 18 0 1 0 0.1-258Z') + traits(['M-10-244Q0-256 10-244', 'M-8-236Q2-248 10-238']) + forme(CH_CALOTTE), devant: frange + chMiroir(`<path d="M-37-196Q-41-184-38-172" stroke="${CH_TRAIT}" stroke-width="3.400" fill="none" stroke-linecap="round"/><path d="M-37-196Q-41-184-38-172" stroke="${ch}" stroke-width="1.600" fill="none" stroke-linecap="round"/>`) },
    boucles: { arriere: chNuage([[-34, -222, 14], [-42, -204, 14], [-46, -184, 13], [-46, -164, 13], [-44, -144, 12], [-40, -124, 12], [34, -222, 14], [42, -204, 14], [46, -184, 13], [46, -164, 13], [44, -144, 12], [40, -124, 12], [-18, -236, 14], [0, -240, 14], [18, -236, 14], [0, -200, 30]], ch) + [[-42, -204], [-46, -164], [-40, -124], [42, -204], [46, -164], [40, -124], [0, -240]].map(([x, y]) => `<path d="M${x - 5} ${y + 2}a5 5 0 1 1 6 4" stroke="${sombre}" stroke-width="1.400" fill="none"/>`).join(''),
      devant: chNuage([[-26, -224, 10], [-11, -230, 10], [5, -231, 10], [20, -227, 10], [33, -216, 9], [-36, -212, 9]], ch) + [[-26, -224], [-11, -230], [5, -231], [20, -227]].map(([x, y]) => `<path d="M${x - 4} ${y + 1}a4 4 0 1 1 5 3" stroke="${sombre}" stroke-width="1.200" fill="none"/>`).join('') },
    'p-co-tresses': { arriere: forme(CH_CALOTTE), devant: chMiroir(forme('M-38-206Q-42-186-36-168L-29-172Q-33-188-31-204Z') + chTresse(-33, -164, -35, -112, 6, ch)) + frange },
    'p-co-couettes': { arriere: chMiroir(forme('M-34-222Q-62-222-64-190Q-66-160-56-140Q-54-158-50-170Q-48-150-42-142Q-46-170-44-190Q-42-208-32-212Z') + traits(['M-40-216Q-56-210-58-180', 'M-44-206Q-52-190-50-160'])) + forme(CH_CALOTTE), devant: frange + chMiroir(`<ellipse cx="-37" cy="-217" rx="5.500" ry="7.500" fill="#e46a92" ${CH_O} transform="rotate(-35 -37 -217)"/>`) },
    'p-co-ondules': { arriere: forme('M0-238Q-50-238-50-192Q-56-170-50-150Q-58-132-50-114Q-56-100-46-88Q-40-96-34-90Q-30-100-32-114L32-114Q30-100 34-90Q40-96 46-88Q56-100 50-114Q58-132 50-150Q56-170 50-192Q50-238 0-238Z') + chMiroir(traits(['M-46-180Q-52-160-46-140Q-52-120-44-100', 'M-38-170Q-44-150-38-130Q-42-112-36-96'])), devant: chMiroir(forme('M-38-212Q-50-190-44-170Q-38-154-46-136Q-48-122-40-112Q-42-126-36-140Q-30-156-34-176Q-34-196-30-210Z') + traits(['M-40-196Q-46-176-40-160Q-36-148-42-132'])) + chFrangeCote(forme, traits, clair) },
    'p-co-macarons': { arriere: chMiroir(forme('M-30-252A15 15 0 1 0-29.900-252Z') + traits(['M-38-238Q-30-247-22-239Q-26-232-32-236'])) + forme(CH_CALOTTE), devant: frange + chMiroir(`<path d="M-37-196Q-41-184-38-172" stroke="${CH_TRAIT}" stroke-width="3.400" fill="none" stroke-linecap="round"/><path d="M-37-196Q-41-184-38-172" stroke="${ch}" stroke-width="1.600" fill="none" stroke-linecap="round"/>`) },
    'p-co-tresse': { arriere: forme(CH_CALOTTE), devant: forme('M38-206Q42-186 36-168L29-172Q33-188 31-204Z') + chTresse(32, -164, 22, -110, 6, ch) + chFrangeCote(forme, traits, clair) },
    courts: { arriere: forme('M0-236Q-45-236-45-192Q-46-174-40-164Q-34-170-32-176L32-176Q34-170 40-164Q46-174 45-192Q45-236 0-236Z'), devant: forme('M-39-190Q-42-236 0-237Q38-236 40-200Q32-222 12-224Q-12-222-28-208Q-36-200-39-190Z') + traits(['M10-234Q-10-230-26-214', 'M20-232Q32-226 36-210', 'M-2-234Q-18-228-32-206']) + traits(['M-16-230Q-26-224-30-216'], clair, 2.200) },
  };
  return styles[p.coiffure] || styles.longs;
}

/* ---------- Extras à acheter : poses, couleurs, coiffures, tenues, accessoires, objets en main ---------- */
const chCoeur = (x, y, s, c, trait = 1.400) => `<path d="M${x} ${y + s * .9}C${x - s * 1.4} ${y - s * .1} ${x - s * .7} ${y - s * 1.2} ${x} ${y - s * .45}C${x + s * .7} ${y - s * 1.2} ${x + s * 1.4} ${y - s * .1} ${x} ${y + s * .9}Z" fill="${c}" stroke="${CH_TRAIT}" stroke-width="${trait}" stroke-linejoin="round"/>`;
const CH_POSES = {
  '': { bras: { g: 'M-14-143Q-21-125-22-101', d: 'M14-143Q21-125 22-101' }, mains: { g: [-22.500, -98], d: [22.500, -98] }, tient: 'd' },
  'p-pose-coucou': { bras: { g: 'M-14-143Q-21-125-22-101', d: 'M14-143Q26-146 34-152' }, apres: 'M34-152Q44-160 48-174', mains: { g: [-22.500, -98], d: [49, -178] }, mainApres: 'd', tient: 'g', coucou: true },
  'p-pose-hanches': { bras: { g: 'M-14-143Q-26-134-26-123', d: 'M14-143Q26-134 26-123' }, avant: { g: 'M-26-123L-16-112', d: 'M26-123L16-112' }, mains: { g: [-15, -111], d: [15, -111] } },
  'p-pose-dos': { bras: { g: 'M-14-143Q-20-128-14-114', d: 'M14-143Q20-128 14-114' }, mains: null },
  'p-pose-coeur': { bras: { g: 'M-14-143Q-21-134-21-126', d: 'M14-143Q21-134 21-126' }, avant: { g: 'M-21-126L-6-132', d: 'M21-126L6-132' }, mains: { g: [-4, -133], d: [4, -133] }, coeur: true },
  'p-pose-reveuse': { bras: { g: 'M-14-143Q-21-125-22-101', d: 'M14-143Q20-132 22-122' }, apres: 'M22-122L27-158', mains: { g: [-22.500, -98], d: [27.500, -162] }, mainApres: 'd', tient: 'g' },
};
let CH_POSE = CH_POSES[''];
const CH_TEINTES = {
  'p-ch-rose': { c: '#f3a6c3', css: '#f3a6c3' },
  'p-ch-bleu': { c: '#8fb8e8', css: '#8fb8e8' },
  'p-ch-menthe': { c: '#8fd6c0', css: '#8fd6c0' },
  'p-ch-platine': { c: '#f1e4c2', css: '#f1e4c2' },
  'p-ch-ombre': { c: 'url(#chDegradeCheveux)', css: 'linear-gradient(#5a3428, #f29cbc)' },
};
const CH_COIFFURES_ACHAT = { 'p-co-tresses': 'Deux tresses', 'p-co-couettes': 'Couettes', 'p-co-ondules': 'Longs ondulés', 'p-co-macarons': 'Macarons', 'p-co-tresse': 'Tresse sur le côté' };
const CH_MANCHES_LONGUES = { 'p-pull': '#fbf6ee', 'p-sport': '#9a84d4', 'p-hoodie': '#f4a9c4', 'p-ecoliere': '#4a5a8f', 'p-pyjama': '#b9d6f2' };
const chTresse = (x0, y0, x1, y1, n, ch) => {
  let s = '';
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1), x = x0 + (x1 - x0) * t + (i % 2 ? 1.600 : -1.600), y = y0 + (y1 - y0) * t;
    s += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(7 - t * 1.500).toFixed(1)}" ry="7.500" fill="${ch}" ${CH_O}/><path d="M${(x - 4).toFixed(1)} ${(y - 3).toFixed(1)}Q${x.toFixed(1)} ${(y + 2).toFixed(1)} ${(x + 4).toFixed(1)} ${(y - 1).toFixed(1)}" stroke="rgba(30,8,20,.25)" stroke-width="1.100" fill="none"/>`;
  }
  return s + `<path d="M${x1 - 4} ${y1 + 8}L${x1} ${y1 + 20}L${x1 + 4} ${y1 + 8}Z" fill="${ch}" ${CH_O}/><rect x="${x1 - 4.500}" y="${y1 + 5}" width="9" height="4.500" rx="2" fill="#e46a92" stroke="${CH_TRAIT}" stroke-width="1.200"/>`;
};
const chRobeCourte = 'M-6-148Q0-144 6-148L12-147Q13-130 14-118Q22-98 30-68Q0-60-30-68Q-22-98-14-118Q-13-130-12-147Z';
const chHautLong = (bas) => `M-7-148Q0-144 7-148L16-146Q18-122 16 ${bas}H-16Q-18-122-16-146Z`;
const chManchesLongues = (c) => ['g', 'd'].map((s) => chTube(CH_POSE.bras[s], c, 8.500)).join('');
const chBallon = (x, c) => `<circle cx="${x}" cy="-144" r="6.500" fill="${c}" ${CH_O}/>`;

Object.assign(CH_TENUES, {
  'p-hoodie': () => ({ corps: `${chPantalon('#4a4560', 'M-13-100H13L12-11H2.500L0-78L-2.500-11H-12Z', false)}${chBaskets('#fbf7f2', '#f4a9c4')}
      <path d="${chHautLong(-95)}" fill="#f4a9c4" ${CH_O}/><path d="M7-140Q12-118 11-96H16Q18-122 16-146Z" fill="${CH_OMBRE}"/><path d="M-16-99H16" stroke="${CH_TRAIT}" stroke-width="1.200"/>
      <path d="M-9-114H9L11-101H-11Z" fill="#e98fb0" ${CH_O}/><path d="M-16-150Q-14-162 0-162Q14-162 16-150Q8-143 0-144Q-8-143-16-150Z" fill="#e98fb0" ${CH_O}/>
      <path d="M-3-145L-4-130M3-145L4-130" stroke="#fff" stroke-width="1.500"/><circle cx="-4" cy="-129" r="1.300" fill="#fff"/><circle cx="4" cy="-129" r="1.300" fill="#fff"/>`, manches: chManchesLongues('#f4a9c4') }),
  'p-princesse': () => ({ corps: `${chBallerines('#b79be6')}
      <path d="M-13-121Q-26-80-38-14Q0-6 38-14Q26-80 13-121Z" fill="#c9b3f0" ${CH_O}/><path d="M-13-121Q-20-90-30-40Q-15-30 0-36Q15-30 30-40Q20-90 13-121Z" fill="#e5d8fb" opacity=".85"/>
      <path d="M-8-118Q-14-70-20-18M8-118Q14-70 20-18M0-118V-12" stroke="rgba(90,60,140,.18)" stroke-width="1.400" fill="none"/>
      ${[[-22, -56], [14, -80], [-8, -92], [24, -34], [-28, -26], [4, -44], [10, -24]].map(([x, y], i) => chEtoile(x, y, i % 2 ? 2.400 : 3.200, i % 2 ? '#fff' : '#f2d27a')).join('')}
      <path d="M-6-148Q0-144 6-148L12-147Q13-133 13-120H-13Q-13-133-12-147Z" fill="#b79be6" ${CH_O}/><path d="M-13-124H13V-118H-13Z" fill="#f2d27a" stroke="${CH_TRAIT}" stroke-width="1.200"/>${chEtoile(0, -134, 3.500, '#f2d27a')}
      ${chBallon(-14, '#e5d8fb')}${chBallon(14, '#e5d8fb')}`, manches: '' }),
  'p-pois': () => ({ corps: `<defs><clipPath id="chClipPois"><path d="${chRobeCourte}"/></clipPath></defs>${chBallerines('#d8475d')}
      <path d="${chRobeCourte}" fill="#e5566b" ${CH_O}/><g clip-path="url(#chClipPois)">${[...Array(48).keys()].map((i) => { const x = -30 + (i % 8) * 8.500 + (Math.floor(i / 8) % 2 ? 4 : 0), y = -146 + Math.floor(i / 8) * 14; return `<circle cx="${x}" cy="${y}" r="2.100" fill="#fff"/>`; }).join('')}<path d="M6-146Q16-110 30-68H18Q12-100 4-140Z" fill="${CH_OMBRE}"/></g>
      ${chMiroir(`<path d="M0-145Q-9-147-11-140Q-5-136 0-142Z" fill="#fff" ${CH_O}/>`)}${chBallon(-14, '#e5566b')}${chBallon(14, '#e5566b')}
      ${chMiroir(`<path d="M0-117Q-13-127-15-114Q-13-104 0-114Z" fill="#fff" ${CH_O}/><path d="M-2-113L-6-100" stroke="${CH_TRAIT}" stroke-width="4" stroke-linecap="round"/><path d="M-2-113L-6-100" stroke="#fff" stroke-width="2.200" stroke-linecap="round"/>`)}<circle cy="-116" r="3.200" fill="#fff" ${CH_O}/>`, manches: '' }),
  'p-ecoliere': () => ({ corps: `<defs><clipPath id="chClipJupe"><path d="M-15-106H15L23-72H-23Z"/></clipPath></defs>${chTube('M-6-60L-7-11', '#fbf7f2', 7.500)}${chTube('M6-60L7-11', '#fbf7f2', 7.500)}${chBallerines('#3a2730')}
      <path d="M-15-106H15L23-72H-23Z" fill="#c97fa6" ${CH_O}/><g clip-path="url(#chClipJupe)">${[-18, -9, 0, 9, 18].map((x) => `<path d="M${x * .65}-106L${x}-72" stroke="#e7b2cb" stroke-width="2.600"/>`).join('')}${[-98, -86].map((y) => `<path d="M-30 ${y}H30" stroke="#9b5b85" stroke-width="2"/>`).join('')}${[-12, -4, 4, 12].map((x) => `<path d="M${x * .7}-106L${x * 1.1}-72" stroke="rgba(0,0,0,.2)" stroke-width="1"/>`).join('')}</g>
      <path d="${chHautLong(-103)}" fill="#4a5a8f" ${CH_O}/><path d="M-6-148L0-132L6-148Z" fill="#fff" ${CH_O}/><circle cy="-124" r="1.300" fill="#f2d27a"/><circle cy="-114" r="1.300" fill="#f2d27a"/>`, manches: chManchesLongues('#4a5a8f') }),
  'p-pyjama': () => ({ corps: `<defs><clipPath id="chClipPyj"><path d="${chHautLong(-97)}"/><path d="M-14-102H14L13-11H2.500L0-78L-2.500-11H-13Z"/></clipPath></defs>
      ${chPantalon('#b9d6f2', 'M-14-102H14L13-11H2.500L0-78L-2.500-11H-13Z', false)}
      ${CH_PIEDS.map((x) => `<path d="M${x - 8} 0Q${x - 9}-9 ${x}-10Q${x + 9}-9 ${x + 8} 0Z" fill="#f6b6c8" ${CH_O}/><circle cx="${x}" cy="-9" r="3" fill="#fff" ${CH_O.replace('2"', '1.200"')}/>`).join('')}
      <path d="${chHautLong(-97)}" fill="#b9d6f2" ${CH_O}/><g clip-path="url(#chClipPyj)">${[[-8, -136], [8, -116], [-6, -104], [-8, -60], [7, -40], [-8, -26]].map(([x, y], i) => i % 2 ? chEtoile(x, y, 2.600, '#f2d27a') : `<path d="M${x - 4} ${y}a2.500 2.500 0 0 1 2.500-3a3 3 0 0 1 5 0a2.500 2.500 0 0 1 1.500 3Z" fill="#fff"/>`).join('')}</g>
      <path d="M-7-148Q0-139 7-148" stroke="#fff" stroke-width="2" fill="none"/>`, manches: chManchesLongues('#b9d6f2') }),
});

Object.assign(CH_ACCESSOIRES, {
  'p-oreilles-chat': () => `${chMiroir(`<path d="M-34-224L-35-258L-12-238Z" fill="#6b6275" ${CH_O}/><path d="M-30-232L-31-250L-18-239Z" fill="#f6b6c8"/>`)}<path d="M-40-204Q-44-244 0-246Q44-244 40-204" stroke="${CH_TRAIT}" stroke-width="6" fill="none"/><path d="M-40-204Q-44-244 0-246Q44-244 40-204" stroke="#e46a92" stroke-width="3.400" fill="none"/>`,
  'p-noeud-tete': () => `<g transform="translate(24 -228) rotate(18)">${chMiroir(`<path d="M0 0Q-16-13-18 0Q-16 13 0 0Z" fill="#f26d8f" ${CH_O}/><path d="M-5 0Q-11-4-13 0" stroke="rgba(0,0,0,.18)" stroke-width="1.200" fill="none"/>`)}<circle r="4.200" fill="#f26d8f" ${CH_O}/></g>`,
  'p-diademe': () => `<path d="M-22-226L-15-246L-7-233L0-254L7-233L15-246L22-226Q0-220-22-226Z" fill="#f2d27a" ${CH_O}/><circle cy="-246" r="3" fill="#f26d8f" ${CH_O.replace('2"', '1"')}/><circle cx="-15" cy="-240" r="2" fill="#8fb8e8"/><circle cx="15" cy="-240" r="2" fill="#8fb8e8"/><circle cy="-229" r="2.200" fill="#c8b8ea"/>`,
  'p-casque': () => `<path d="M-44-190Q-48-250 0-250Q48-250 44-190" stroke="${CH_TRAIT}" stroke-width="8" fill="none"/><path d="M-44-190Q-48-250 0-250Q48-250 44-190" stroke="#f4a9c4" stroke-width="5" fill="none"/>${chMiroir(`<rect x="-53" y="-202" width="13" height="26" rx="6.500" fill="#f4a9c4" ${CH_O}/><rect x="-49" y="-197" width="5" height="16" rx="2.500" fill="#e98fb0"/>`)}`,
  'p-lunettes-coeur': () => `${chMiroir(chCoeur(-15, -186, 10, 'rgba(242,80,120,.88)', 2))}<path d="M-4-188Q0-191 4-188M-28-190L-38-192M28-190L38-192" stroke="${CH_TRAIT}" stroke-width="2" fill="none"/>${chMiroir('<path d="M-20-190L-16-192" stroke="#fff" stroke-width="1.600" opacity=".7"/>')}`,
  'p-noeud-cou': () => `${chMiroir(`<path d="M0-147Q-11-155-13-147Q-11-139 0-147Z" fill="#e5566b" ${CH_O}/>`)}<circle cy="-147" r="3" fill="#e5566b" ${CH_O}/>`,
  'p-ailes': { arriere: () => chMiroir(`<path d="M-6-140Q-44-198-60-162Q-68-130-10-128Z" fill="#cfe6ff" fill-opacity=".9" ${CH_O}/><path d="M-8-128Q-42-124-48-102Q-40-90-10-118Z" fill="#f3d4ff" fill-opacity=".9" ${CH_O}/><path d="M-12-136Q-34-160-48-162M-14-124Q-30-118-38-106" stroke="#fff" stroke-width="1.300" fill="none"/>`) + chEtoile(-62, -184, 3, '#f2d27a') + chEtoile(58, -112, 2.600, '#f2d27a') },
});

const CH_MAINS = {
  'p-m-ballon': () => `<path d="M0-2Q-6-34-26-60" stroke="${CH_TRAIT}" stroke-width="1" fill="none"/>${chCoeur(-28, -72, 11, '#f26d8f', 2)}<path d="M-35-78Q-33-82-29-81" stroke="#fff" stroke-width="1.800" fill="none" stroke-linecap="round"/>`,
  'p-m-glace': () => `<path d="M-6-3H6L0 13Z" fill="#e3b071" ${CH_O}/><path d="M-3-1L3 5M3-1L-2 7" stroke="#b9853f" stroke-width=".8"/><circle cy="-9" r="7.500" fill="#f6a8bd" ${CH_O}/><circle cy="-19" r="6" fill="#a8e0c8" ${CH_O}/><circle cx="-1" cy="-25" r="1.800" fill="#e5566b"/>`,
  'p-m-fleurs': () => `<path d="M0 8L-7-14M0 8L0-18M0 8L7-14" stroke="#6f9a62" stroke-width="1.600"/>${chFleurette(-7, -16, 3, '#f6a8bd')}${chFleurette(0, -21, 3, '#fff')}${chFleurette(7, -16, 3, '#c8b8ea')}<path d="M-7-5H7L0 11Z" fill="#f7d6e3" ${CH_O}/>`,
  'p-m-livre': () => `<g transform="rotate(-10)"><rect x="-10" y="-20" width="20" height="24" rx="2" fill="#5e89c2" ${CH_O}/><rect x="-9" y="-19" width="4" height="22" fill="#4a6fa3"/><text x="2" y="-3" text-anchor="middle" font-size="12" font-family="'Frank Ruhl Libre', serif" font-weight="700" fill="#fff">א</text></g>`,
  'p-m-boba': () => `<path d="M2-15L6-30" stroke="${CH_TRAIT}" stroke-width="4" stroke-linecap="round"/><path d="M2-15L6-30" stroke="#e46a92" stroke-width="2.200" stroke-linecap="round"/><path d="M-6-15H6L5 6H-5Z" fill="#f4dce8" ${CH_O}/>${[[-2.500, 2], [1, 3], [3, 0], [-1, -1]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.500" fill="#3a2730"/>`).join('')}<path d="M-7-15H7" stroke="${CH_TRAIT}" stroke-width="2.400" stroke-linecap="round"/>`,
};

function persoSvg(p0) {
  const p = Object.assign({}, p0, { cheveux: CH_TEINTES[p0.cheveux] ? CH_TEINTES[p0.cheveux].c : p0.cheveux });
  CH_POSE = CH_POSES[p.pose] || CH_POSES[''];
  const pe = p.peau, ch = chCheveux(p);
  const acc = (id, part) => { const a = CH_ACCESSOIRES[id]; if (!a) return ''; if (typeof a === 'function') return part === 'devant' ? a() : ''; return a[part] ? a[part]() : ''; };
  const tenue = (CH_TENUES[p.tenue] || CH_TENUES[''])();
  const manche = CH_MANCHES_LONGUES[p.tenue] || pe, largeur = manche === pe ? 6.500 : 8.500;
  const main = (s) => { const m = CH_POSE.mains && CH_POSE.mains[s]; return m ? `<circle cx="${m[0]}" cy="${m[1]}" r="4.400" fill="${pe}" ${CH_O.replace('2"', '1.700"')}/>` : ''; };
  const tenu = CH_MAINS[p.main] && CH_POSE.tient && CH_POSE.mains ? `<g transform="translate(${CH_POSE.mains[CH_POSE.tient].join(' ')})">${CH_MAINS[p.main]()}</g>` : '';
  const avant = CH_POSE.avant ? chTube(CH_POSE.avant.g, manche, largeur) + chTube(CH_POSE.avant.d, manche, largeur) : '';
  const sourcil = p.cheveux.startsWith('url') ? '#7a4a52' : p.cheveux;
  const oeil = (x) => `<ellipse cx="${x}" cy="-185" rx="9.500" ry="11" fill="#24161d"/><ellipse cx="${x}" cy="-182" rx="7" ry="7.500" fill="#5b3a40"/><ellipse cx="${x}" cy="-181" rx="4.500" ry="5" fill="#24161d"/>
    <circle cx="${x + 3.500}" cy="-189.500" r="4.200" fill="#fff"/><circle cx="${x - 4}" cy="-180" r="2" fill="#fff"/><circle cx="${x + 4.500}" cy="-179" r=".9" fill="#fff"/>
    <path d="M${x - 8 * Math.sign(x)}-193.500Q${x + 1 * Math.sign(x)}-200.500 ${x + 10.500 * Math.sign(x)}-187" stroke="${CH_TRAIT}" stroke-width="2.800" fill="none" stroke-linecap="round"/><path d="M${x + 10 * Math.sign(x)}-188.500l${4.200 * Math.sign(x)}-2.500M${x + 8 * Math.sign(x)}-192.500l${3.500 * Math.sign(x)}-3.500M${x + 4.500 * Math.sign(x)}-195.500l${2.200 * Math.sign(x)}-3.800" stroke="${CH_TRAIT}" stroke-width="1.700" stroke-linecap="round"/>
    <path d="M${x - 6}-209Q${x}-212 ${x + 6}-209.500" stroke="${sourcil}" stroke-width="1.700" fill="none" stroke-linecap="round"/>`;
  return `<defs><radialGradient id="chJoue"><stop offset="0" stop-color="#f58fa0" stop-opacity=".75"/><stop offset="1" stop-color="#f58fa0" stop-opacity="0"/></radialGradient>
      <linearGradient id="chDegradeCheveux" gradientUnits="userSpaceOnUse" x1="0" y1="-236" x2="0" y2="-100"><stop offset=".25" stop-color="#5a3428"/><stop offset="1" stop-color="#f29cbc"/></linearGradient></defs>
    <ellipse rx="28" ry="5" fill="#2b1f3a" opacity=".22"/>
    ${acc(p.dos, 'arriere')}${ch.arriere}
    ${chTube(CH_JAMBES.g, pe)}${chTube(CH_JAMBES.d, pe)}
    ${chTube(CH_POSE.bras.g, pe, 6.500)}${chTube(CH_POSE.bras.d, pe, 6.500)}
    <path d="M-5-158V-145H5V-158Z" fill="${pe}"/><path d="M-5-158V-146M5-158V-146" stroke="${CH_TRAIT}" stroke-width="1.600"/><path d="M-5-154Q0-150 5-154V-151Q0-147-5-151Z" fill="${CH_OMBRE}"/>
    ${tenue.corps}${tenue.manches}${avant}${acc(p.dos, 'devant')}
    ${tenu}${CH_POSE.mainApres === 'g' ? '' : main('g')}${CH_POSE.mainApres === 'd' ? '' : main('d')}
    ${CH_POSE.coeur ? chCoeur(0, -142, 6, '#f26d8f') : ''}
    ${acc(p.cou, 'devant')}
    ${chMiroir(`<ellipse cx="-38" cy="-185" rx="5.500" ry="7.500" fill="${pe}" ${CH_O}/><path d="M-39-188Q-41-185-39-182" stroke="${CH_OMBRE}" stroke-width="1.500" fill="none"/>`)}
    <path d="M-38-196Q-38-233 0-233Q38-233 38-196Q38-168 22-157Q10-151 0-151Q-10-151-22-157Q-38-168-38-196Z" fill="${pe}" ${CH_O}/>
    <path d="M-30-212Q0-224 30-212Q20-218 0-219Q-20-218-30-212Z" fill="${CH_OMBRE}"/>
    <ellipse cx="-25" cy="-170" rx="10" ry="6.500" fill="url(#chJoue)"/><ellipse cx="25" cy="-170" rx="10" ry="6.500" fill="url(#chJoue)"/>
    ${oeil(-16)}${oeil(16)}
    <path d="M-1.500-174Q0-172.500 1.500-174" stroke="${CH_TRAIT}" stroke-width="1.300" fill="none" stroke-linecap="round"/>
    <path d="M-5-166.500Q0-160.500 5-166.500Q0-164.500-5-166.500Z" fill="#d9606f" ${CH_O.replace('2"', '1.600"')}/>
    ${ch.devant}${acc(p.yeux, 'devant')}${acc(p.tete, 'devant')}
    ${CH_POSE.apres ? chTube(CH_POSE.apres, manche, largeur) : ''}${CH_POSE.mainApres ? main(CH_POSE.mainApres) : ''}${CH_POSE.coucou ? `<path d="M56-184Q60-179 59-172M59-190Q66-182 64-170" stroke="${CH_TRAIT}" stroke-width="1.500" fill="none" stroke-linecap="round"/>` : ''}`;
}

/* ---------- La pièce ---------- */
function chSolSvg(s) {
  const vp = 120, k = (y) => (y - vp) / (CH_SOL - vp), larg = s.type === 'carreaux' ? 54 : 34, X = (i, y) => 400 + i * larg * k(y);
  let lignes = '', bandes = '';
  for (let i = -16; i <= 16; i++) lignes += `M${X(i, CH_SOL).toFixed(1)} ${CH_SOL}L${X(i, CH_HAUT).toFixed(1)} ${CH_HAUT}`;
  if (s.type === 'carreaux') {
    [1, 2, 3, 4].forEach((j) => { const y = vp + (CH_SOL - vp) / (1 - j * .12); lignes += `M0 ${y.toFixed(1)}H${CH_LARGE}`; });
  } else {
    for (let i = -16; i < 16; i++) {
      [0, 1].forEach((j) => { const y = CH_SOL + 8 + ((Math.abs(i) * 37 + j * 83 + (i < 0 ? 19 : 0)) % 175); lignes += `M${X(i, y).toFixed(1)} ${y}L${X(i + 1, y).toFixed(1)} ${y}`; });
      if (i % 2) bandes += `M${X(i, CH_SOL).toFixed(1)} ${CH_SOL}L${X(i + 1, CH_SOL).toFixed(1)} ${CH_SOL}L${X(i + 1, CH_HAUT).toFixed(1)} ${CH_HAUT}L${X(i, CH_HAUT).toFixed(1)} ${CH_HAUT}Z`;
    }
  }
  return `<rect y="${CH_SOL}" width="${CH_LARGE}" height="${CH_HAUT - CH_SOL}" fill="url(#chSolG)"/>${bandes ? `<path d="${bandes}" fill="#fff" opacity=".05"/>` : ''}<path d="${lignes}" stroke="${s.ligne}" stroke-width="1.200" opacity=".45"/>`;
}

function chFond() {
  const m = CH_MURS[S.chambre.mur], s = CH_SOLS[S.chambre.sol];
  const vitre = 'M122 244V112A78 78 0 0 1 278 112V244Z';
  const rideau = `<path d="M88 32H152Q142 110 130 158Q124 200 136 262L92 266Q84 200 96 158Q102 110 88 32Z" fill="#fff" opacity=".5"/><path d="M104 36Q112 100 108 156M122 36Q126 100 118 156M138 36Q136 100 126 156M104 166Q100 210 104 262M118 166Q118 214 122 264" stroke="#b9a6d6" stroke-width="1.500" opacity=".45" fill="none"/><path d="M112 36Q118 100 114 156" stroke="#fff" stroke-width="3" opacity=".5" fill="none"/><ellipse cx="114" cy="160" rx="13" ry="5" fill="#e8a7bd"/>`;
  return `<defs>
    <linearGradient id="chMurG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${m.haut}"/><stop offset="1" stop-color="${m.bas}"/></linearGradient>
    <pattern id="chMotif" width="${m.taille}" height="${m.taille}" patternUnits="userSpaceOnUse">${m.motif}</pattern>
    <linearGradient id="chSolG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s.a}"/><stop offset="1" stop-color="${s.b}"/></linearGradient>
    <linearGradient id="chOmbreMur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b1f3a" stop-opacity=".22"/><stop offset="1" stop-color="#2b1f3a" stop-opacity="0"/></linearGradient>
    <linearGradient id="chCielJour" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c3b3e6"/><stop offset=".45" stop-color="#f1b9c8"/><stop offset=".8" stop-color="#f9d2b0"/><stop offset="1" stop-color="#fbe3c2"/></linearGradient>
    <linearGradient id="chCielNuit" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#141238"/><stop offset=".6" stop-color="#2d2768"/><stop offset="1" stop-color="#4b3f86"/></linearGradient>
    <linearGradient id="chToile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9b6e6"/><stop offset=".6" stop-color="#f3c1c9"/><stop offset="1" stop-color="#f9dcb8"/></linearGradient>
    <radialGradient id="chLueur"><stop offset="0" stop-color="#fff3c4"/><stop offset=".35" stop-color="#ffd98a" stop-opacity=".6"/><stop offset="1" stop-color="#ffd98a" stop-opacity="0"/></radialGradient>
    <radialGradient id="chLueurNuit"><stop offset="0" stop-color="#ffd27a" stop-opacity=".6"/><stop offset=".45" stop-color="#ffb46a" stop-opacity=".22"/><stop offset="1" stop-color="#ffb46a" stop-opacity="0"/></radialGradient>
    <radialGradient id="chVignette" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#2b1640" stop-opacity="0"/><stop offset="1" stop-color="#2b1640" stop-opacity=".32"/></radialGradient>
    <linearGradient id="chRayon" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe6b0" stop-opacity=".55"/><stop offset="1" stop-color="#ffe6b0" stop-opacity="0"/></linearGradient>
    <linearGradient id="chRayonLune" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9c6ff" stop-opacity=".4"/><stop offset="1" stop-color="#b9c6ff" stop-opacity="0"/></linearGradient>
    <linearGradient id="chOr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6dc8c"/><stop offset=".5" stop-color="#c99a3c"/><stop offset="1" stop-color="#e8c26a"/></linearGradient>
    <linearGradient id="chBois" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a8714c"/><stop offset="1" stop-color="#7d5136"/></linearGradient>
    <linearGradient id="chTete" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ad98d2"/><stop offset="1" stop-color="#7f68ad"/></linearGradient>
    <linearGradient id="chOreiller" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#e3d8ee"/></linearGradient>
    <linearGradient id="chDuvet" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4cfdb"/><stop offset="1" stop-color="#dc9fb5"/></linearGradient>
    <linearGradient id="chAbatJour" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fdf0de"/><stop offset="1" stop-color="#eccbaa"/></linearGradient>
    <linearGradient id="chPot" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d9937a"/><stop offset="1" stop-color="#a95c45"/></linearGradient>
    <linearGradient id="chPotBord" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e4a28a"/><stop offset="1" stop-color="#b8684f"/></linearGradient>
    <linearGradient id="chCire" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#ead9bf"/></linearGradient>
    <linearGradient id="chFlamme" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a0"/><stop offset=".6" stop-color="#f6a640"/><stop offset="1" stop-color="#e5603a"/></linearGradient>
    <linearGradient id="chFourrure" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#cc9e6e"/><stop offset="1" stop-color="#9b6c45"/></linearGradient>
    <linearGradient id="chVelours" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#cf76a0"/><stop offset="1" stop-color="#8f3d68"/></linearGradient>
    <linearGradient id="chChat" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#928aa0"/><stop offset="1" stop-color="#5d5669"/></linearGradient>
    <linearGradient id="chLune" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff6cf"/><stop offset="1" stop-color="#f0c95e"/></linearGradient>
    <clipPath id="chVitre"><path d="${vitre}"/></clipPath>
  </defs>
  <rect width="${CH_LARGE}" height="${CH_SOL}" fill="url(#chMurG)"/><rect width="${CH_LARGE}" height="${CH_SOL}" fill="url(#chMotif)" opacity="${m.op}"/>
  <rect y="236" width="${CH_LARGE}" height="${CH_SOL - 236}" fill="#fff" opacity=".2"/>${[...Array(8).keys()].map((i) => `<rect x="${i * 100 + 12}" y="250" width="76" height="60" rx="3" fill="none" stroke="#fff" stroke-width="1.500" opacity=".5"/><rect x="${i * 100 + 13}" y="251" width="76" height="60" rx="3" fill="none" stroke="#000" stroke-width="1" opacity=".05"/>`).join('')}
  <rect y="230" width="${CH_LARGE}" height="6" fill="#fff" opacity=".6"/><rect y="236" width="${CH_LARGE}" height="3" fill="#000" opacity=".05"/>
  ${chSolSvg(s)}<rect y="${CH_SOL}" width="${CH_LARGE}" height="30" fill="url(#chOmbreMur)"/>
  <rect y="${CH_SOL - 14}" width="${CH_LARGE}" height="15" fill="#fbf6ee"/><rect y="${CH_SOL - 14}" width="${CH_LARGE}" height="2" fill="#fff"/>
  <path d="M110 250V110A90 90 0 0 1 290 110V250Z" fill="#000" opacity=".06" transform="translate(4 4)"/><path d="M110 250V110A90 90 0 0 1 290 110V250Z" fill="#f7f1ea"/>
  <g clip-path="url(#chVitre)">
    <g class="ch-j"><rect x="120" y="30" width="160" height="220" fill="url(#chCielJour)"/><circle cx="234" cy="196" r="34" fill="url(#chLueur)"/><circle cx="234" cy="196" r="15" fill="#fff1cf"/>
      <ellipse cx="160" cy="92" rx="22" ry="5" fill="#fff" opacity=".55"/><ellipse cx="172" cy="88" rx="12" ry="5" fill="#fff" opacity=".55"/><ellipse cx="248" cy="132" rx="16" ry="4" fill="#fff" opacity=".45"/>
      <path d="M150 140q4-4 8 0q4-4 8 0M180 120q3-3 6 0q3-3 6 0" stroke="#7a6a94" stroke-width="1" fill="none"/>
      <path d="M110 214Q150 196 190 206T290 200V260H110Z" fill="#c9a7cf"/><path d="M156 212V200A14 14 0 0 1 184 200V212Z" fill="#b897c2"/><rect x="198" y="186" width="7" height="26" fill="#b897c2"/><rect x="214" y="196" width="18" height="16" fill="#b897c2"/>
      <path d="M250 216Q246 196 250 176Q254 196 250 216ZM262 218Q259 202 262 186Q265 202 262 218Z" fill="#8a7aa8"/><path d="M110 232Q170 214 230 226T300 222V260H110Z" fill="#9c84b5"/></g>
    <g class="ch-n"><rect x="120" y="30" width="160" height="220" fill="url(#chCielNuit)"/><path d="M168 70A20 20 0 1 0 168 110A26 26 0 0 1 168 70Z" fill="#f7e7a6"/><circle cx="160" cy="90" r="40" fill="#f7e7a6" opacity=".12"/>
      ${[[136, 60, 1.400], [210, 52, 1], [236, 86, 1.600], [258, 64, 1], [196, 120, 1.200], [140, 140, 1], [248, 150, 1.300], [222, 30, 1.100]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/>`).join('')}
      <path d="M110 214Q150 196 190 206T290 200V260H110Z" fill="#2b2455"/><path d="M156 212V200A14 14 0 0 1 184 200V212Z" fill="#241e4a"/><rect x="198" y="186" width="7" height="26" fill="#241e4a"/>
      ${[[162, 208], [176, 206], [216, 204], [226, 208], [140, 220], [272, 212], [200, 196]].map(([x, y]) => `<rect x="${x}" y="${y}" width="2.500" height="2.500" fill="#ffd98a"/>`).join('')}<path d="M110 232Q170 214 230 226T300 222V260H110Z" fill="#1d1840"/></g>
    <path d="M140 244L184 112H200L156 244Z" fill="#fff" opacity=".12"/>
  </g>
  <path d="M200 34V244M122 160H278" stroke="#f7f1ea" stroke-width="5"/><path d="${vitre}" fill="none" stroke="#e7ddd1" stroke-width="2"/>
  <rect x="98" y="244" width="204" height="10" rx="3" fill="#efe6db"/><rect x="104" y="254" width="192" height="4" fill="#000" opacity=".07"/>
  <rect x="80" y="25" width="240" height="5" rx="2.500" fill="url(#chOr)"/><circle cx="78" cy="27.500" r="6" fill="url(#chOr)"/><circle cx="322" cy="27.500" r="6" fill="url(#chOr)"/>
  ${rideau}<g transform="matrix(-1 0 0 1 400 0)">${rideau}</g>
  <g class="ch-j"><path d="M122 332H278L392 520H168Z" fill="url(#chRayon)" opacity=".55"/></g><g class="ch-n"><path d="M122 332H278L392 520H168Z" fill="url(#chRayonLune)" opacity=".7"/></g>
  <rect x="456" y="300" width="80" height="90" fill="#000" opacity=".05"/>
  <path d="M446 296H536Q538 296 538 299V304H444V299Q444 296 446 296Z" fill="#b88158"/><rect x="452" y="304" width="78" height="78" fill="url(#chBois)"/>
  <rect x="458" y="311" width="66" height="28" rx="2" fill="none" stroke="#5e3d2a" stroke-width="1" opacity=".5"/><circle cx="491" cy="325" r="3" fill="url(#chOr)"/><rect x="458" y="346" width="66" height="30" fill="#4e3323" opacity=".55"/>
  <rect x="462" y="360" width="9" height="16" fill="#c75d6f"/><rect x="472" y="356" width="8" height="20" fill="#5e89c2"/><rect x="481" y="362" width="10" height="14" fill="#e6b85e"/>
  <path d="M455 382L458 394H462L463 382ZM527 382L524 394H520L519 382Z" fill="#7d5136"/><ellipse cx="491" cy="395" rx="50" ry="5" fill="#2b1f3a" opacity=".18"/>
  <ellipse cx="514" cy="296" rx="12" ry="3" fill="url(#chOr)"/><path d="M506 296Q502 280 510 272H518Q526 280 522 296Z" fill="#e9d3c4"/><path d="M509 292Q506 282 511 275" stroke="#fff" stroke-width="1.500" opacity=".5" fill="none"/><path d="M514 272V258" stroke="#c99a3c" stroke-width="2"/>
  <path d="M498 258L504 234H524L530 258Z" fill="url(#chAbatJour)"/><path class="ch-n" d="M498 258L504 234H524L530 258Z" fill="#ffe3a6"/><ellipse cx="514" cy="258" rx="16" ry="2.500" fill="#d9b08a"/>
  <rect x="574" y="204" width="218" height="200" fill="#000" opacity=".05"/>
  <path d="M572 302V232Q572 198 606 198H754Q788 198 788 232V302Z" fill="url(#chTete)"/>${[598, 624, 650, 676, 702, 728, 754].map((x) => `<path d="M${x} 206V300" stroke="#000" stroke-width="2" opacity=".08"/><path d="M${x + 1.500} 206V300" stroke="#fff" stroke-width="1" opacity=".15"/>`).join('')}
  <path d="M572 302V232Q572 198 606 198H754Q788 198 788 232V302" fill="none" stroke="#6d579b" stroke-width="3"/>
  ${[625, 735].map((c) => `<path d="M${c - 40} 302Q${c - 44} 274 ${c - 34} 268Q${c} 262 ${c + 34} 268Q${c + 44} 274 ${c + 40} 302Z" fill="url(#chOreiller)"/><path d="M${c - 20} 272Q${c} 280 ${c + 18} 272" stroke="#cfc0de" stroke-width="1.200" fill="none"/>`).join('')}
  <path d="M684 300Q680 282 690 278Q704 274 716 280Q722 290 718 300Z" fill="#e8a7bd"/><path d="M576 300H784L796 372H564Z" fill="#f5eff6"/>
  <path d="M574 316Q680 304 786 316L798 372Q680 382 562 372Z" fill="url(#chDuvet)"/><path d="M610 320Q640 340 630 368M700 314Q720 340 742 368" stroke="#c98aa1" stroke-width="2" opacity=".5" fill="none"/><path d="M590 322Q620 316 650 320" stroke="#fff" stroke-width="3" opacity=".35" fill="none" stroke-linecap="round"/>
  <path d="M562 372Q680 382 798 372L796 420Q680 432 564 420Z" fill="#d295ab"/><path d="M566 412Q680 424 794 412" stroke="#fff" stroke-width="1.500" stroke-dasharray="4 4" opacity=".5" fill="none"/>
  <path d="M700 312Q744 310 786 316L798 372Q762 376 728 378Q720 340 700 312Z" fill="#f2d29b"/><path d="M716 316Q726 344 734 376M736 314Q744 344 752 375M758 314Q764 344 772 374" stroke="#e2b46e" stroke-width="2" fill="none"/>
  <path d="M728 378Q762 376 798 372L796 438Q770 444 746 438Q738 410 728 378Z" fill="#e8bd78"/>${[750, 758, 766, 774, 782, 790].map((x) => `<path d="M${x} 440V448" stroke="#e8bd78" stroke-width="1.500"/>`).join('')}
  <rect x="566" y="420" width="228" height="14" rx="3" fill="url(#chBois)"/><rect x="572" y="434" width="8" height="12" fill="#6d4630"/><rect x="780" y="434" width="8" height="12" fill="#6d4630"/><ellipse cx="680" cy="447" rx="128" ry="8" fill="#2b1f3a" opacity=".2"/>`;
}

/* Poussières dans le rayon, toujours aux mêmes places */
const CH_POUSSIERES = [[160, 160, 1.400, 0], [190, 230, 1, 2.500], [214, 300, 1.600, 5], [240, 190, 1.100, 1.500], [256, 270, 1.300, 6.500], [280, 360, 1.200, 3.500], [300, 420, 1.500, 7.500], [230, 400, 1, 4.500], [330, 470, 1.300, 2], [200, 350, 1.100, 8]];

function chAvantPlan() {
  const lueurs = [];
  Object.entries(S.chambre.objets).forEach(([id, p]) => (CH_OBJETS[id].lueurs || []).forEach(([dx, dy, r]) => lueurs.push([p.x + (p.m ? -1 : 1) * p.e * dx, p.y + p.e * dy, r * p.e])));
  return `<g pointer-events="none">
    <g class="ch-j"><path d="M122 112H278L392 520H168Z" fill="url(#chRayon)" opacity=".16"/>${CH_POUSSIERES.map(([x, y, r, d]) => `<circle class="ch-poussiere" cx="${x}" cy="${y}" r="${r}" fill="#fff6d8" style="animation-delay:-${d}s"/>`).join('')}</g>
    <g class="ch-n"><rect width="${CH_LARGE}" height="${CH_HAUT}" fill="#15113a" opacity=".42"/><path d="M122 112H278L392 520H168Z" fill="url(#chRayonLune)" opacity=".25"/>
      <g style="mix-blend-mode:screen"><circle cx="514" cy="252" r="150" fill="url(#chLueurNuit)"/>${lueurs.map(([x, y, r]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="url(#chLueurNuit)"/>`).join('')}</g></g>
    <rect width="${CH_LARGE}" height="${CH_HAUT}" fill="url(#chVignette)"/></g>`;
}

function chScene(sel) {
  const objets = Object.entries(S.chambre.objets).map(([id, p]) => ({ id, p, d: CH_OBJETS[id] }));
  const rang = (o) => (o.d.plat ? 0 : o.d.mur ? 1 : 2);
  objets.sort((a, b) => rang(a) - rang(b) || a.p.y - b.p.y);
  const plats = objets.filter((o) => rang(o) < 2), debout = objets.filter((o) => rang(o) === 2);
  const tous = [...debout.map((o) => ({ y: o.p.y, html: chNoeud(o.id, o.p, chNomObjet(o.id), o.d.art(), sel) })), { y: S.chambre.moi.y, html: chNoeud('moi', S.chambre.moi, 'Ton personnage', persoSvg(S.perso), sel) }];
  tous.sort((a, b) => a.y - b.y);
  return chFond() + plats.map((o) => chNoeud(o.id, o.p, chNomObjet(o.id), o.d.art(), sel)).join('') + tous.map((o) => o.html).join('') + chAvantPlan();
}
