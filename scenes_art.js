'use strict';
/* Illustrations des scènes : décors et objets dessinés en SVG, cadre de 800 × 600.
   Chaque objet est dessiné autour de son centre (0, 0). */
const OBJ = {
  soleil: () => `<circle r="72" fill="#ffe6a8" opacity=".25"/><circle r="52" fill="#ffe2a0" opacity=".45"/><circle r="36" fill="url(#gSol)"/>`,
  lune: () => `<circle r="62" fill="#f7efcf" opacity=".14"/><circle r="44" fill="#f7efcf" opacity=".2"/><path d="M12-32a34 34 0 1 0 0 64a27 27 0 1 1 0-64z" fill="#f8efc9"/>`,
  etoile: () => `<circle r="26" fill="#fff4c8" opacity=".18"/><path d="M0-20L5-6L20-5L8 4L12 19L0 10L-12 19L-8 4L-20-5L-5-6Z" fill="#fff4c8" class="sc-brille"/>`,
  nuage: (c = '#fff') => `<g fill="${c}"><ellipse cx="-34" cy="8" rx="34" ry="21"/><ellipse cx="0" cy="-6" rx="38" ry="30"/><ellipse cx="38" cy="9" rx="32" ry="20"/><rect x="-62" y="8" width="124" height="20" rx="10"/></g>`,
  nuagePluie: () => `${OBJ.nuage('#6d7696')}<g stroke="#bcd0ec" stroke-width="4" stroke-linecap="round" class="sc-pluie"><path d="M-36 42l-7 20M-12 46l-7 20M12 42l-7 20M36 46l-7 20M-24 70l-7 20M0 74l-7 20M24 70l-7 20"/></g>`,
  arbre: () => `<path d="M-13 92Q-6 40-9 4L9 4Q6 40 15 92Z" fill="#6c4c3f"/><g class="sc-vent"><circle cx="-40" cy="-14" r="44" fill="#4f8f68"/><circle cx="38" cy="-20" r="46" fill="#4a8562"/><circle cx="0" cy="-58" r="50" fill="#5d9f73"/><circle cx="-16" cy="-30" r="30" fill="#70b284"/><circle cx="26" cy="-52" r="20" fill="#86c295"/></g>`,
  fleur: () => `<path d="M0 50Q-5 22 0 0" stroke="#4f8a5f" stroke-width="4" fill="none"/><path d="M-2 34q-20-4-24-18q18 0 24 18zM2 26q16-3 21-16q-15 0-21 16z" fill="#62a073"/><g fill="#ee8fae"><ellipse cy="-15" rx="8" ry="14"/><ellipse cy="15" rx="8" ry="14"/><ellipse cx="-15" rx="14" ry="8"/><ellipse cx="15" rx="14" ry="8"/><ellipse cx="-11" cy="-11" rx="8" ry="12" transform="rotate(-45 -11 -11)"/><ellipse cx="11" cy="-11" rx="8" ry="12" transform="rotate(45 11 -11)"/><ellipse cx="-11" cy="11" rx="8" ry="12" transform="rotate(45 -11 11)"/><ellipse cx="11" cy="11" rx="8" ry="12" transform="rotate(-45 11 11)"/></g><circle r="7" fill="#ffd86b"/>`,
  velo: () => `<g fill="none" stroke="#39425e" stroke-width="5"><circle cx="-44" cy="20" r="26"/><circle cx="44" cy="20" r="26"/></g><g fill="none" stroke="#d65c6f" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"><path d="M-44 20L-14-20L28-20L44 20M-14-20L0 20L28-20M0 20H-44"/><path d="M28-20L24-36H40M-14-20L-18-32"/></g><path d="M-30-34h24" stroke="#39425e" stroke-width="6" stroke-linecap="round"/><circle cy="20" r="5" fill="#39425e"/>`,
  oiseau: (c = '#5778b5') => `<path d="M-26 4Q-8-24 22-8L38-12L28 2Q12 22-12 14Z" fill="${c}"/><path d="M-6-2Q10-22 16 2Q2 8-6-2Z" fill="#fff" opacity=".3"/><circle cx="20" cy="-6" r="2.5" fill="#1d2238"/><path d="M-22 6L-42-4L-26 16Z" fill="${c}"/>`,
  chien: () => `<ellipse cx="-4" cy="10" rx="40" ry="24" fill="#c6935f"/><circle cx="38" cy="-14" r="23" fill="#c6935f"/><path d="M26-30Q16-18 22 2Q32-10 34-24Z" fill="#8c6340"/><ellipse cx="55" cy="-10" rx="9" ry="7" fill="#d9ad7c"/><circle cx="60" cy="-12" r="3.5" fill="#2b2230"/><circle cx="43" cy="-18" r="3" fill="#2b2230"/><g fill="#b78452"><rect x="-32" y="26" width="11" height="30" rx="5"/><rect x="-14" y="28" width="11" height="28" rx="5"/><rect x="10" y="28" width="11" height="28" rx="5"/><rect x="24" y="26" width="11" height="30" rx="5"/></g><path d="M-42 2Q-62-16-54-26" stroke="#c6935f" stroke-width="9" fill="none" stroke-linecap="round"/>`,
  chat: (c = '#3e3a56') => `<path d="M-24 40Q-34-6 0-6Q32-6 26 40Z" fill="${c}"/><circle cx="0" cy="-22" r="24" fill="${c}"/><path d="M-22-34L-24-58L-4-44ZM22-34L24-58L4-44Z" fill="${c}"/><circle cx="-9" cy="-24" r="3.6" fill="#f8d76a"/><circle cx="9" cy="-24" r="3.6" fill="#f8d76a"/><path d="M26 34Q56 34 48 4" stroke="${c}" stroke-width="9" fill="none" stroke-linecap="round"/>`,
  papillon: () => `<g class="sc-aile"><path d="M0 0Q-34-38-42-8Q-44 12 0 4Z" fill="#f09a5e"/><path d="M0 2Q-30 8-26 28Q-14 36 0 8Z" fill="#f6c06c"/><path d="M0 0Q34-38 42-8Q44 12 0 4Z" fill="#f09a5e"/><path d="M0 2Q30 8 26 28Q14 36 0 8Z" fill="#f6c06c"/></g><rect x="-3" y="-14" width="6" height="30" rx="3" fill="#3a2d3e"/>`,
  abeille: () => `<ellipse cx="-4" cy="-16" rx="13" ry="17" fill="#e4f0fa" opacity=".85" transform="rotate(-24 -4 -16)"/><ellipse cx="10" cy="-16" rx="12" ry="16" fill="#e4f0fa" opacity=".85" transform="rotate(20 10 -16)"/><ellipse rx="24" ry="16" fill="#f7c948"/><path d="M-8-15V15M4-15V15M14-12V12" stroke="#332a2a" stroke-width="5"/><circle cx="-20" cy="-4" r="9" fill="#332a2a"/>`,
  fille: () => `<path d="M-30 58L-16-8Q0-16 16-8L30 58Q0 70-30 58Z" fill="#e4688f"/><circle cy="-30" r="22" fill="#eec3a1"/><path d="M-24-28Q-26-58 0-56Q26-58 24-28Q24-42 0-42Q-24-42-24-28Z" fill="#513040"/><path d="M-22-30Q-34 0-22 10L-14-24ZM22-30Q34 0 22 10L14-24Z" fill="#513040"/><rect x="-13" y="58" width="9" height="28" rx="4" fill="#eec3a1"/><rect x="4" y="58" width="9" height="28" rx="4" fill="#eec3a1"/>`,
  parapluie: () => `<path d="M0-44V38Q0 54-16 50" stroke="#31324c" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-66-4Q-60-62 0-64Q60-62 66-4Q52-16 44-4Q32-16 22-4Q10-16 0-4Q-10-16-22-4Q-32-16-44-4Q-52-16-66-4Z" fill="#e9607c"/><path d="M0-64Q-26-40-22-4M0-64Q26-40 22-4" stroke="#b94160" stroke-width="2" fill="none"/>`,
  sac: () => `<path d="M-20-22Q-20-46 0-46Q20-46 20-22" fill="none" stroke="#7d4d31" stroke-width="7"/><rect x="-38" y="-26" width="76" height="62" rx="14" fill="#c67d48"/><rect x="-38" y="-8" width="76" height="9" fill="#9b5d31"/><rect x="-9" y="-13" width="18" height="18" rx="4" fill="#f4d48a"/>`,
  reverbere: () => `<rect x="-5" y="-40" width="10" height="170" fill="#2c2e47"/><path d="M-24 132H24" stroke="#2c2e47" stroke-width="9" stroke-linecap="round"/><circle cy="-66" r="62" fill="#ffd98a" opacity=".2"/><path d="M-20-46L-26-90H26L20-46Z" fill="#ffe9ae"/><path d="M-30-92H30L18-104H-18Z M-20-46H20" fill="#2c2e47" stroke="#2c2e47" stroke-width="5"/>`,
  maison: () => `<rect x="-78" y="-30" width="156" height="118" fill="#e8c9a7"/><path d="M-96-26L0-96L96-26Z" fill="#a9514e"/><rect x="-56" y="-6" width="38" height="38" fill="#ffe29d" stroke="#6c4c3f" stroke-width="4"/><path d="M-37-6V32M-56 13H-18" stroke="#6c4c3f" stroke-width="3"/><rect x="14" y="10" width="42" height="78" rx="3" fill="#6c4c3f"/><circle cx="48" cy="52" r="3.5" fill="#f4d48a"/>`,
  voiture: () => `<path d="M-74 22V2Q-70-8-52-10L-30-38Q-26-42-16-42H24Q32-42 38-36L54-10Q72-8 76 4V22Z" fill="#d65c5c"/><path d="M-22-32H-2V-10H-40ZM6-32H26Q30-32 33-28L44-10H6Z" fill="#cfe4f3"/><g><circle cx="-42" cy="24" r="16" fill="#25263a"/><circle cx="-42" cy="24" r="6" fill="#c8cede"/><circle cx="44" cy="24" r="16" fill="#25263a"/><circle cx="44" cy="24" r="6" fill="#c8cede"/></g><rect x="66" y="2" width="10" height="7" rx="2" fill="#ffe9ae"/>`,
  mer: () => `<g fill="none" stroke="#e2f3f7" stroke-width="5" stroke-linecap="round" class="sc-vague"><path d="M-70-8Q-52-24-34-8T2-8T38-8T74-8"/><path d="M-50 18Q-32 2-14 18T22 18T58 18" opacity=".7"/></g>`,
  poisson: () => `<path d="M-40 0Q-10-30 30-6L54-22L48 2L54 26L30 8Q-10 30-40 0Z" fill="#f49d4e"/><path d="M-8-16Q2-30 16-16M-4 14Q6 26 16 14" fill="#e27d32"/><circle cx="-22" cy="-4" r="4" fill="#1d2238"/><path d="M4-14Q12 0 4 14" stroke="#ffcf95" stroke-width="3" fill="none"/>`,
  sable: () => `<ellipse rx="66" ry="20" fill="#f6d9a0"/><path d="M-30-3q10-9 20 0t20 0" stroke="#d9b172" stroke-width="3" fill="none"/><path d="M34 2q5-14 12 0q-6 5-12 0z" fill="#ef9f8f"/>`,
  chapeau: () => `<ellipse cy="14" rx="58" ry="17" fill="#e5c07c"/><path d="M-30 12Q-28-32 0-32Q28-32 30 12Z" fill="#efcd8e"/><path d="M-30 4Q0 16 30 4V12Q0 24-30 12Z" fill="#d25a72"/>`,
  glace: () => `<path d="M-22-4L0 56L22-4Z" fill="#dda061"/><path d="M-12-2L6 42M12-2L-6 42" stroke="#bd7d41" stroke-width="2.5"/><circle cx="-11" cy="-16" r="16" fill="#ffc2d2"/><circle cx="11" cy="-16" r="16" fill="#fff0c9"/><circle cy="-34" r="16" fill="#a7dcc4"/>`,
  tortue: () => `<ellipse cx="42" cy="4" rx="17" ry="12" fill="#8fbf74"/><circle cx="48" cy="1" r="2.5" fill="#22301f"/><g fill="#8fbf74"><ellipse cx="-30" cy="24" rx="14" ry="8"/><ellipse cx="26" cy="24" rx="14" ry="8"/></g><path d="M-44 20Q-40-30 0-30Q40-30 42 20Z" fill="#4e8a5a"/><path d="M-20-14L0-24L20-14L14 8H-14ZM-14 8L-30 18M14 8L30 18" fill="#6aa772" stroke="#3d6f48" stroke-width="2"/>`,
  bougie: () => `<ellipse cy="-52" rx="30" ry="42" fill="#ffc76a" opacity=".22" class="sc-brille"/><path d="M0-82Q12-62 0-52Q-12-62 0-82Z" fill="#ffc15a" class="sc-flamme"/><rect x="-14" y="-50" width="28" height="74" rx="4" fill="#f6eedb"/><ellipse cy="26" rx="34" ry="9" fill="#a8895f"/>`,
  lampe: () => `<circle cy="-34" r="66" fill="#ffd98a" opacity=".2"/><path d="M-36-10L-20-60H20L36-10Z" fill="#ffe7ac"/><rect x="-4" y="-10" width="8" height="66" fill="#64487a"/><ellipse cy="58" rx="28" ry="8" fill="#64487a"/>`,
  lit: () => `<rect x="-140" y="-46" width="20" height="104" rx="6" fill="#6b4f62"/><rect x="122" y="-20" width="18" height="78" rx="6" fill="#6b4f62"/><rect x="-124" y="-4" width="248" height="46" rx="10" fill="#efe6da"/><path d="M-60-8Q60-20 124-4V42H-60Z" fill="#7d6bb0"/><rect x="-116" y="-26" width="58" height="30" rx="12" fill="#fff"/>`,
  fenetre: () => `<rect x="-62" y="-72" width="124" height="144" rx="6" fill="#8bb8d6"/><path d="M-62 30Q0 2 62 26V72H-62Z" fill="#8cbf8d"/><path d="M0-72V72M-62 0H62" stroke="#fff" stroke-width="7"/><rect x="-62" y="-72" width="124" height="144" rx="6" fill="none" stroke="#fff" stroke-width="10"/>`,
  livre: () => `<path d="M0-22Q-26-34-52-24V24Q-26 14 0 26Q26 14 52 24V-24Q26-34 0-22Z" fill="#fff8ec"/><path d="M0-22V26" stroke="#c9b89c" stroke-width="3"/><path d="M-52 24Q-26 14 0 26Q26 14 52 24V32Q26 22 0 34Q-26 22-52 32Z" fill="#b5536a"/><path d="M-40-14Q-24-20-10-12M-40-2Q-24-8-10 0M10-12Q24-20 40-14M10 0Q24-8 40-2" stroke="#b7a68b" stroke-width="2.5" fill="none"/>`,
  horloge: () => `<circle r="38" fill="#6c4c3f"/><circle r="31" fill="#fbf4e4"/><path d="M0 0V-22M0 0L15 8" stroke="#3a2d3e" stroke-width="4" stroke-linecap="round"/><circle r="3.5" fill="#d65c6f"/>`,
  pain: () => `<path d="M-52 22Q-62-10-36-22Q0-38 36-22Q62-10 52 22Q0 34-52 22Z" fill="#d79a55"/><path d="M-22-20Q-14-2-18 12M2-26Q10-6 6 12M26-20Q32-4 28 10" stroke="#a96f32" stroke-width="5" fill="none" stroke-linecap="round"/>`,
  lait: () => `<path d="M-26-20L-14-44H14L26-20V48Q0 56-26 48Z" fill="#f9f7f1"/><rect x="-14" y="-58" width="28" height="15" rx="4" fill="#5e89c2"/><path d="M-26 2Q0 14 26 2V24Q0 34-26 24Z" fill="#7da7dc"/>`,
  pomme: () => `<path d="M0-22Q-34-38-38 2Q-38 38-12 38Q-2 32 0 32Q2 32 12 38Q38 38 38 2Q34-38 0-22Z" fill="#d84a4f"/><path d="M0-22Q2-36 12-40" stroke="#5a3d2a" stroke-width="4" fill="none"/><path d="M6-30Q22-42 32-30Q18-24 6-30Z" fill="#63a26e"/><path d="M-22-6Q-24 8-14 20" stroke="#f29a96" stroke-width="5" fill="none" stroke-linecap="round"/>`,
  fromage: () => `<path d="M-52 26V-8L34-32L52-8V26Z" fill="#f5cd5d"/><path d="M-52-8L52-8L34-32Z" fill="#f9dc80"/><g fill="#dcaa35"><circle cx="-24" cy="10" r="8"/><circle cx="10" cy="4" r="6"/><circle cx="30" cy="16" r="5"/></g>`,
  oeuf: () => `<ellipse cy="35" rx="30" ry="7" fill="#b89a7a" opacity=".45"/><path d="M0-34Q-28-16-26 10Q-22 34 0 34Q22 34 26 10Q28-16 0-34Z" fill="#f4dcae" stroke="#c9a678" stroke-width="2.5"/><path d="M-14-6Q-18 8-10 18" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>`,
  cafe: () => `<g fill="none" stroke="#c6b5a0" stroke-width="4" stroke-linecap="round" class="sc-fumee"><path d="M-10-36q-7-10 0-20t0-20M12-36q-7-10 0-20t0-20"/></g><path d="M-30-22H30L24 26Q0 34-24 26Z" fill="#fbf4e4"/><path d="M-27-22H27L25-10H-25Z" fill="#6b4530"/><path d="M28-14Q52-14 44 8Q40 16 25 14" fill="none" stroke="#fbf4e4" stroke-width="7"/><ellipse cy="34" rx="44" ry="8" fill="#e1d2bc"/>`,
  gateau: () => `<path d="M-54 28V-8Q0-24 54-8V28Q0 42-54 28Z" fill="#f2c7a0"/><path d="M-54 8Q0 22 54 8V-8Q0-24-54-8Z" fill="#fbeadf"/><path d="M-54-8Q0-24 54-8Q0 8-54-8Z" fill="#ee92ac"/><circle cy="-22" r="10" fill="#d84a4f"/><path d="M0-30q5-12 14-12" stroke="#5f8f5f" stroke-width="3" fill="none"/>`,
  miel: () => `<rect x="-30" y="-24" width="60" height="62" rx="16" fill="#efb13c"/><path d="M-30-6Q-14 6 0-6T30-6V-24H-30Z" fill="#f7cf6c"/><rect x="-24" y="-40" width="48" height="18" rx="4" fill="#b9733a"/><rect x="-16" y="4" width="32" height="20" rx="3" fill="#fff4d6"/>`,
  eau: () => `<path d="M-22-44H22L28 44Q0 54-28 44Z" fill="#cfe9f4" opacity=".85"/><path d="M-24-8Q0 2 25-8L28 44Q0 54-28 44Z" fill="#7fc1e1"/><path d="M-12-30V30" stroke="#fff" stroke-width="4" opacity=".7" stroke-linecap="round"/>`,
  citron: () => `<path d="M-44 0Q-30-30 0-30Q30-30 44 0Q30 30 0 30Q-30 30-44 0Z" fill="#f4d94e"/><path d="M-20-12Q-6-20 8-16" stroke="#fff3a8" stroke-width="5" fill="none" stroke-linecap="round"/>`,
  verre: () => `<path d="M-24-36H24L18 38H-18Z" fill="#e6f4fa" opacity=".8" stroke="#a9cfe0" stroke-width="3"/><path d="M-21-4H21L18 38H-18Z" fill="#f0c15d" opacity=".85"/>`,
  assiette: () => `<ellipse rx="56" ry="20" fill="#f9f5ec" stroke="#d9cfbf" stroke-width="3"/><ellipse rx="36" ry="12" fill="#efe7d9"/>`,
  couteau: () => `<path d="M-52 4H4V-8Q40-8 52 4Z" fill="#cdd5df" transform="rotate(-8)"/><rect x="-54" y="-4" width="44" height="12" rx="5" fill="#6c4c3f" transform="rotate(-8)"/>`,
  fourchette: () => `<g fill="#cdd5df" transform="rotate(8)"><rect x="-52" y="-3" width="62" height="7" rx="3"/><path d="M8-14H40V-9H16V-3H40V2H16V8H40V13H8Z"/></g>`,
  table: () => `<ellipse cy="-30" rx="112" ry="20" fill="#a97550"/><ellipse cy="-36" rx="112" ry="20" fill="#c08c62"/><path d="M-78-26L-90 60M78-26L90 60M-30-20L-30 62M30-20L30 62" stroke="#855a3d" stroke-width="10" stroke-linecap="round"/>`,
  chaise: () => `<path d="M-38-74V60M38-74V60" stroke="#8b5b3c" stroke-width="10" stroke-linecap="round"/><path d="M-38-70H38M-38-44H38" stroke="#a97550" stroke-width="12" stroke-linecap="round"/><rect x="-44" y="-2" width="88" height="16" rx="6" fill="#d86a78"/>`,
  porte: () => `<rect x="-58" y="-116" width="116" height="232" rx="6" fill="#7a5340"/><rect x="-42" y="-100" width="84" height="84" rx="4" fill="#8d6249"/><rect x="-42" y="0" width="84" height="100" rx="4" fill="#8d6249"/><circle cx="38" cy="-4" r="7" fill="#f2cf7e"/>`,
  cle: () => `<circle cx="-30" r="18" fill="none" stroke="#e2b34f" stroke-width="9"/><path d="M-12 0H44M26 0V16M40 0V13" stroke="#e2b34f" stroke-width="8" stroke-linecap="round"/>`,
  telephone: () => `<rect x="-22" y="-42" width="44" height="84" rx="9" fill="#2c2e47"/><rect x="-17" y="-34" width="34" height="62" rx="3" fill="#a8d4e8"/><circle cy="34" r="4" fill="#8588a8"/>`,
  ordinateur: () => `<rect x="-58" y="-44" width="116" height="74" rx="6" fill="#34364e"/><rect x="-50" y="-37" width="100" height="58" fill="#8fc6df"/><path d="M-36-22H6M-36-8H24M-36 6H-2" stroke="#fff" stroke-width="4" opacity=".8"/><path d="M-72 30H72L78 42H-78Z" fill="#b8bdd0"/>`,
  journal: () => `<path d="M-50-34H42V30Q42 38 50 38H-42Q-50 38-50 30Z" fill="#f2ede1"/><path d="M42-16H50V30Q50 38 42 38" fill="#dcd5c4"/><rect x="-40" y="-26" width="70" height="11" fill="#4d4f68"/><path d="M-40-6H-8M-40 4H-8M-40 14H-8M-40 24H-8M2-6H30M2 4H30M2 14H30M2 24H30" stroke="#8d8d9b" stroke-width="3"/>`,
  stylo: () => `<g transform="rotate(-32)"><rect x="-44" y="-7" width="70" height="14" rx="4" fill="#3f64b5"/><path d="M26-7L48 0L26 7Z" fill="#eec79a"/><path d="M42-2L48 0L42 2Z" fill="#26283c"/><rect x="-32" y="-7" width="8" height="14" fill="#e8c365"/></g>`,
};

const degrade = (id, couleurs) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${couleurs.map((c, i) => `<stop offset="${(i / (couleurs.length - 1)).toFixed(2)}" stop-color="${c}"/>`).join('')}</linearGradient>`;
function aleaScene(g) { let s = g; return () => { s = (s * 16807) % 2147483647; return (s % 10000) / 10000; }; }

/* Décors */
const DECORS_SCENE = {
  parc: (u) => { const r = aleaScene(11); let herbe = ''; for (let i = 0; i < 90; i++) { const x = r() * 800, y = 410 + r() * 185; herbe += `<path d="M${x.toFixed(0)} ${y.toFixed(0)}q-3-10-7-13M${x.toFixed(0)} ${y.toFixed(0)}q1-11 3-15" stroke="#5e9a63" stroke-width="2" fill="none"/>`; }
    return `<defs>${degrade(`${u}a`, ['#8dc3df', '#cfe3df', '#fbe0bd'])}${degrade(`${u}b`, ['#a5d38a', '#7fb970'])}</defs>
    <rect width="800" height="600" fill="url(#${u}a)"/>
    <path d="M0 330Q130 240 280 310T560 280T800 320V440H0Z" fill="#a3c3b5"/><path d="M0 370Q180 300 380 360T800 340V460H0Z" fill="#8dbb97"/>
    <g fill="#5f9a76"><circle cx="130" cy="360" r="26"/><circle cx="170" cy="370" r="20"/><circle cx="520" cy="350" r="24"/><circle cx="560" cy="360" r="18"/><circle cx="700" cy="345" r="26"/></g>
    <path d="M0 400Q200 370 400 396T800 384V600H0Z" fill="url(#${u}b)"/>${herbe}
    <path d="M300 600Q340 500 450 440Q520 410 610 400Q540 450 520 500Q500 560 540 600Z" fill="#f0dfbe"/>
    <g transform="translate(610 392)"><rect x="-58" y="-8" width="116" height="10" rx="4" fill="#9b6a48"/><rect x="-58" y="-26" width="116" height="9" rx="4" fill="#a97550"/><path d="M-48 2V26M48 2V26M-48-26V-8M48-26V-8" stroke="#6c4c3f" stroke-width="6"/></g>`; },
  pluie: (u) => { const r = aleaScene(23); let gouttes = ''; for (let i = 0; i < 90; i++) { const x = r() * 800, y = r() * 480; gouttes += `<path d="M${x.toFixed(0)} ${y.toFixed(0)}l-5 16" />`; }
    let fen = ''; for (let i = 0; i < 44; i++) { fen += `<rect x="${(r() * 780).toFixed(0)}" y="${(160 + r() * 170).toFixed(0)}" width="10" height="15" fill="#ffd98a" opacity="${(0.25 + r() * 0.6).toFixed(2)}"/>`; }
    return `<defs>${degrade(`${u}a`, ['#3b4167', '#68709a', '#a5a3bd'])}${degrade(`${u}b`, ['#3a3f5e', '#232540'])}</defs>
    <rect width="800" height="600" fill="url(#${u}a)"/>
    <g fill="#474c75"><rect x="0" y="190" width="120" height="240"/><rect x="110" y="140" width="90" height="290"/><rect x="330" y="170" width="110" height="260"/><rect x="430" y="120" width="90" height="310"/><rect x="620" y="170" width="180" height="260"/></g>${fen}
    <rect y="420" width="800" height="180" fill="url(#${u}b)"/>
    <rect y="420" width="800" height="26" fill="#6d7096"/>
    <g opacity=".5"><rect x="108" y="470" width="12" height="100" fill="#ffd98a" filter="url(#gFlou)"/><rect x="605" y="470" width="14" height="110" fill="#ffd98a" filter="url(#gFlou)"/></g>
    <path d="M0 540H90M170 540H300M380 540H510M590 540H720" stroke="#d4d6e6" stroke-width="7" stroke-dasharray="46 30" opacity=".5"/>
    <g stroke="#cddcf0" stroke-width="2" stroke-linecap="round" opacity=".6" class="sc-pluie">${gouttes}</g>`; },
  plage: (u) => `<defs>${degrade(`${u}a`, ['#6d85bf', '#f0a890', '#ffdba6'])}${degrade(`${u}m`, ['#f2bfa0', '#62a6bf', '#2d6f92'])}${degrade(`${u}s`, ['#f6dcab', '#e8c28a'])}</defs>
    <rect width="800" height="600" fill="url(#${u}a)"/>
    <rect y="270" width="800" height="170" fill="url(#${u}m)"/>
    <g stroke="#ffe7c4" stroke-width="3" opacity=".65"><path d="M520 290H700M540 306H680M500 324H720M560 344H660"/></g>
    <path d="M0 420Q200 390 420 420T800 402V600H0Z" fill="url(#${u}s)"/>
    <path d="M0 420Q200 390 420 420T800 402V414Q600 432 420 432T0 434Z" fill="#fff" opacity=".6"/>
    <g transform="translate(680 440)"><path d="M-8 130L8 -60" stroke="#6c4c3f" stroke-width="7"/><path d="M-96-30Q10-130 112-46Q60-66 8-60Q-46-56-96-30Z" fill="#e8605d"/><path d="M-40-74Q8-96 40-82L8-60Z" fill="#fff" opacity=".85"/></g>
    <g fill="#d9a665"><circle cx="90" cy="540" r="3"/><circle cx="420" cy="570" r="3"/><circle cx="500" cy="500" r="2"/><circle cx="230" cy="470" r="2"/><circle cx="600" cy="560" r="3"/></g>`,
  nuit: (u) => { const r = aleaScene(37); let et = ''; for (let i = 0; i < 40; i++) et += `<circle cx="${(90 + r() * 400).toFixed(0)}" cy="${(50 + r() * 240).toFixed(0)}" r="${(0.8 + r() * 1.6).toFixed(1)}" fill="#fff" opacity="${(0.4 + r() * 0.6).toFixed(2)}"/>`;
    return `<defs>${degrade(`${u}a`, ['#39335f', '#574a78'])}${degrade(`${u}n`, ['#12173d', '#2a2f6a', '#4d4685'])}${degrade(`${u}s`, ['#6d5470', '#49385a'])}<clipPath id="${u}c"><path d="M80 320V130Q80 40 290 40Q500 40 500 130V320Z"/></clipPath></defs>
    <rect width="800" height="470" fill="url(#${u}a)"/>
    <g clip-path="url(#${u}c)"><rect x="70" y="30" width="440" height="300" fill="url(#${u}n)"/>${et}<path d="M70 320V280Q150 240 240 276T420 262T510 280V320Z" fill="#1c1d45"/></g>
    <path d="M80 320V130Q80 40 290 40Q500 40 500 130V320ZM290 40V320M80 180H500" fill="none" stroke="#ebdcc6" stroke-width="10"/>
    <rect x="62" y="318" width="456" height="16" rx="5" fill="#ebdcc6"/>
    <path d="M60 30Q20 180 38 350L80 340Q56 200 92 34Z" fill="#8a4f6f"/><path d="M520 30Q560 180 542 350L500 340Q524 200 488 34Z" fill="#8a4f6f"/>
    <rect y="470" width="800" height="130" fill="url(#${u}s)"/>
    <ellipse cx="540" cy="560" rx="240" ry="30" fill="#7d5f8f" opacity=".55"/>
    <rect x="345" y="392" width="80" height="80" rx="5" fill="#6b4f62"/><rect x="338" y="386" width="94" height="10" rx="4" fill="#7f6275"/><circle cx="385" cy="432" r="4" fill="#e2c58a"/>`; },
  cuisine: (u) => { let car = ''; for (let y = 200; y < 380; y += 30) for (let x = (y % 60 ? 0 : 15); x < 800; x += 30) car += `<rect x="${x}" y="${y}" width="28" height="28" fill="#fff" opacity=".22"/>`;
    return `<defs>${degrade(`${u}a`, ['#f4dcb9', '#eec79a'])}${degrade(`${u}p`, ['#b98a63', '#946a4b'])}</defs>
    <rect width="800" height="470" fill="url(#${u}a)"/>${car}
    <g transform="translate(120 130)">${OBJ.fenetre()}</g>
    <path d="M40 40H200L184 88Q120 70 56 88Z" fill="#d86a78"/>
    <rect x="300" y="108" width="470" height="12" rx="4" fill="#8b5b3c"/><path d="M340 120V144M730 120V144" stroke="#8b5b3c" stroke-width="7"/>
    <g fill="#d9a665"><rect x="620" y="56" width="34" height="52" rx="8"/><rect x="668" y="44" width="30" height="64" rx="8" fill="#a8c3a4"/><rect x="712" y="60" width="38" height="48" rx="8" fill="#e7a7a0"/></g>
    <rect x="0" y="400" width="800" height="200" fill="url(#${u}p)"/><rect x="0" y="392" width="800" height="14" fill="#7a5340"/>
    <rect y="430" width="800" height="170" fill="#f6efe2"/><path d="M0 430H800V600H0Z" fill="none"/><g fill="#d86a78" opacity=".34">${[...Array(14)].map((_, i) => `<rect x="${i * 60}" y="430" width="30" height="170"/>`).join('')}</g><g fill="#d86a78" opacity=".3">${[0, 1, 2].map((i) => `<rect y="${442 + i * 60}" width="800" height="30"/>`).join('')}</g>`; },
  salon: (u) => { const r = aleaScene(53); let liv = ''; let x = 560; for (let i = 0; i < 15; i++) { const w = 10 + r() * 9, h = 34 + r() * 22; liv += `<rect x="${x.toFixed(0)}" y="${(146 - h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="${['#c75d6f', '#5e89c2', '#e6b85e', '#6aa772', '#8e73b9'][i % 5]}"/>`; x += w + 2; }
    return `<defs>${degrade(`${u}a`, ['#dfe0ee', '#cfcbe3'])}${degrade(`${u}p`, ['#a98769', '#86664c'])}</defs>
    <rect width="800" height="450" fill="url(#${u}a)"/>
    <rect x="552" y="146" width="230" height="10" rx="3" fill="#7a5340"/>${liv}
    <rect y="440" width="800" height="160" fill="url(#${u}p)"/><rect y="434" width="800" height="12" fill="#f4f1e8"/>
    <path d="M250 450H560L650 590H160Z" fill="#b25f6f"/><path d="M270 470H540L606 570H204Z" fill="none" stroke="#f2d6a6" stroke-width="5"/>
    <g transform="translate(620 370)"><rect x="-112" y="-54" width="224" height="104" rx="26" fill="#6c7ab0"/><rect x="-132" y="-18" width="50" height="86" rx="20" fill="#5a6899"/><rect x="82" y="-18" width="50" height="86" rx="20" fill="#5a6899"/><rect x="-86" y="16" width="172" height="46" rx="14" fill="#7c8bc0"/><rect x="-62" y="-30" width="44" height="42" rx="10" fill="#efc77a"/></g>`; },
};

/* Dessine une scène : décor, puis objets touchables */
function dessinScene(sc, u, interactif) {
  const objets = sc.objects.map(([he, art, x, y, s = 1, opt], i) => {
    const dessin = OBJ[art](opt);
    return `<g class="so" data-i="${i}" transform="translate(${x} ${y}) scale(${s})"${interactif ? ` tabindex="0" role="button"` : ''}><circle class="so-halo" r="${art === 'vide' ? 18 : Math.max(46, 62 / s)}"/><g class="so-art">${dessin}</g></g>`;
  }).join('');
  return `<svg class="sc-svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="${interactif ? 'false' : 'true'}"><defs><radialGradient id="gSol"><stop offset="0" stop-color="#fff7cf"/><stop offset="1" stop-color="#ffc66b"/></radialGradient><filter id="gFlou"><feGaussianBlur stdDeviation="6"/></filter></defs>${DECORS_SCENE[sc.id](u)}${objets}</svg>`;
}
