'use strict';
/* Les 2 styles retenus pour les scènes : polices, couleurs, recoloration de l'image et cadre. */
const SCENE_STYLES = [
  { id: 'fusion', nom: 'Fusion', pastille: '#e46a92', ramp: ['#3a2a5a', '#6a4a8a', '#e46a92', '#f6b48a', '#ffe2a8'], mix: .24, css: { fond: 'linear-gradient(160deg,#4a3a6a,#6a4a8a 50%,#e4849a)', encre: '#fff', texte: "'Poppins',sans-serif", titre: "'Playfair Display',serif", carte: 'rgba(255,255,255,.14)', puce: 'rgba(255,255,255,.16)', accent: '#e46a92', 'cadre-r': '26px' } },
  { id: 'chambre', nom: 'Ma petite chambre', pastille: '#ec8fb5', sur: 'Décore ta chambre mot après mot ♡', classe: 'scn-couture', ramp: ['#7b64b8', '#c9b8ef', '#fbdce9', '#fff8f3'], mix: .3, css: { fond: 'radial-gradient(circle at 12% 18%,#fff 0 60px,transparent 61px),#f6eefa', encre: '#3d2c6b', texte: "'Nunito',sans-serif", titre: "'Fredoka',sans-serif", 'titre-g': 600, carte: '#fff8f3', 'carte-r': '22px', 'carte-b': '3px solid #e7dcf3', puce: '#fbdce9', accent: '#ec8fb5', 'cadre-r': '28px', bord: '8px solid #fff8f3', 'mot-c': '#9d86d6' } },
];
const SCENE_STYLE_DEFAUT_THEME = {};
const SCENE_STYLE_DEFAUT = { parc: 'fusion', pluie: 'fusion', plage: 'fusion', nuit: 'chambre', cuisine: 'chambre', salon: 'chambre' };

/* Chaque couleur est remplacée, selon sa clarté, par une teinte de la palette du style */
function scnRgb(h) { if (h.length === 4) h = '#' + [...h.slice(1)].map((c) => c + c).join(''); return [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)); }
function scnTeinte(couleur, ramp, mix) {
  const c = scnRgb(couleur), l = (0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]) / 255;
  const p = l * (ramp.length - 1), i = Math.min(ramp.length - 2, Math.floor(p)), t = p - i;
  const a = scnRgb(ramp[i]), b = scnRgb(ramp[i + 1]);
  return '#' + c.map((v, k) => Math.round(v + (a[k] + (b[k] - a[k]) * t - v) * mix).toString(16).padStart(2, '0')).join('');
}
function sceneStylee(sc, st, u, interactif) {
  return dessinScene(sc, u, interactif).replace(/gSol/g, `${u}Sol`).replace(/gFlou/g, `${u}Flou`)
    .replace(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g, (m) => scnTeinte(m, st.ramp, st.mix));
}
// Les polices des styles ne sont chargées que lorsqu'on ouvre les scènes
function policesScenes() {
  if (document.getElementById('policesScenes')) return;
  const l = document.createElement('link');
  l.id = 'policesScenes'; l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Nunito:wght@600;800&family=Playfair+Display:wght@500&family=Poppins:wght@400;600&display=swap';
  document.head.appendChild(l);
}
