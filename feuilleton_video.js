'use strict';
/* ============ Le feuilleton en « vidéo » (#/feuilleton/N/video) ============
   Un petit dessin animé : le décor bouge (nuages, rideau, lampe, poussière), le personnage qui parle s'anime,
   les répliques s'enchaînent avec le son et les sous-titres, et la vidéo s'arrête quand c'est à toi de répondre.
   FEUILLETON_VIDEO[num] = { decor, echelle, moi (place de ton personnage),
     persos: { qui: { type: 'perso' (style de ta chambre) | 'pnj' (style des scènes), x, apparence } },
     plans: [gros plan pour chaque réplique], emo: { qui: [humeur à chaque réplique] } } */
const FV_SHIRA = { type: 'perso', peau: '#eec3a1', cheveux: '#2b2230', coiffure: 'boucles', tenue: 'p-salopette', tenueSinon: 'p-pull' };
const FEUILLETON_VIDEO = {
  1: {
    decor: 'appart', echelle: 1.2, moi: 590,
    persos: { shira: { ...FV_SHIRA, x: 255 } },
    plans: ['env', 'env-date', 'env-nom', 'env-nom', 'env-ouverte', 'photo-cle'],
  },
  2: {
    decor: 'escalier', echelle: 1.05, moi: 625,
    persos: { cohen: { type: 'perso', x: 215, peau: '#f3d6c0', cheveux: '#d9d4de', coiffure: 'chignon', tenue: 'p-pull', tenueSinon: 'p-robe', yeux: 'p-lunettes', cou: 'p-collier' }, shira: { ...FV_SHIRA, x: 430 } },
    plans: [null, 'env-date', 'bateau', 'bateau', 'album', 'album-photo'],
  },
  3: {
    decor: 'poste', echelle: 1.05, moi: 640,
    persos: { pakid: { type: 'pnj', x: 222, peau: '#d9a57c', cheveux: '#2b2230', coiffure: 'court', haut: '#c94a4a', bas: '#3a3f55', lunettes: true, yeux: '#4a3a2a' }, shira: { ...FV_SHIRA, x: 455 } },
    plans: ['ticket', 'cle-112', 'recu', 'cle-112', 'boite-112', 'carte-postale'],
    emo: { pakid: ['content', 'neutre', 'surpris', 'desole', 'ravi'] },
  },
  4: {
    decor: 'jaffa', echelle: 1.05, moi: 630, gros: [470, 14],
    persos: { mokher: { type: 'pnj', x: 190, peau: '#c98e6a', cheveux: '#e6e1d8', coiffure: 'casquette', casquette: '#5b4a3a', haut: '#e2cfa6', bas: '#4a4038', tablier: '#7a5a3a', moustache: true, yeux: '#3a2a1a' }, shira: { ...FV_SHIRA, x: 440 } },
    plans: ['carte-postale', null, 'cartes', 'cafe', 'horloge', null],
    emo: { mokher: [null, 'ravi', 'content', 'neutre', 'desole'] },
  },
  5: {
    decor: 'port', echelle: 1.05, moi: 630,
    persos: { moshe: { type: 'pnj', x: 205, peau: '#e0b090', cheveux: '#eeeeee', coiffure: 'casquette', casquette: '#2f3f6a', haut: '#f2f2f2', bas: '#3a4560', moustache: true, yeux: '#4a6a8a' }, shira: { ...FV_SHIRA, x: 440 } },
    plans: ['cafe', 'photo-rivka', 'bateau-1962', 'alliance', 'maison-haifa', 'journaux'],
    emo: { moshe: ['content', 'desole', 'neutre', 'desole', 'content', 'neutre'] },
  },
  6: {
    decor: 'bibliotheque', echelle: 1.05, moi: 635,
    persos: { dalia: { type: 'perso', x: 210, peau: '#d9a57c', cheveux: '#ece8f2', coiffure: 'carre', tenue: 'p-pull', tenueSinon: 'p-ecoliere', yeux: 'p-lunettes', cou: 'p-echarpe' }, shira: { ...FV_SHIRA, x: 450 } },
    plans: ['archives', 'ordinateur', 'journal-mariage', 'boulangerie', 'horloge-2', 'horloge-2'],
  },
  7: {
    decor: 'boulangerie', echelle: 1.05, moi: 640,
    persos: { tamar: { type: 'perso', x: 210, peau: '#f1cfb4', cheveux: '#8a4a2a', coiffure: 'queue', tenue: 'p-pois', tenueSinon: 'p-sport' }, shira: { ...FV_SHIRA, x: 455 } },
    plans: ['photo-rivka', 'env-nom', null, 'gateau-85', 'telephone', 'horloge-10'],
  },
  8: {
    decor: 'salon', echelle: 1.05, moi: 640,
    persos: { rivka: { type: 'perso', x: 215, peau: '#f3d6c0', cheveux: '#f4f2f7', coiffure: 'courts', tenue: 'p-robe', tenueSinon: 'p-pull', cou: 'p-echarpe' }, shira: { ...FV_SHIRA, x: 455 } },
    plans: ['env-nom', 'lettre-rivka', null, 'sablier', 'vendredi', null],
    // La dernière réplique change de décor : le port au coucher du soleil, Yossef et Rivka main dans la main
    suite: { des: 5, decor: 'portSoir', echelle: .95, moi: 300, persos: { shira: { ...FV_SHIRA, x: 150 } } },
  },
  9: {
    decor: 'fete', echelle: 1, moi: 625,
    persos: {
      yossef: { type: 'pnj', x: 200, peau: '#e8c8a8', cheveux: '#f0f0f0', coiffure: 'degarni', haut: '#f4f1ea', bas: '#3a4560', lunettes: true, yeux: '#4a6a8a' },
      rivka: { type: 'perso', x: 340, peau: '#f3d6c0', cheveux: '#f4f2f7', coiffure: 'courts', tenue: 'p-robe', tenueSinon: 'p-pull', cou: 'p-echarpe' },
      shira: { ...FV_SHIRA, x: 480 },
    },
    plans: [null, 'cadeau', 'carte-marin', 'carte-marin', null, 'carte-akko'],
    emo: { yossef: ['ravi', null, 'content', 'content', 'neutre'] },
  },
  10: {
    decor: 'akko', echelle: 1.05, moi: 630,
    persos: { shimon: { type: 'pnj', x: 215, peau: '#c98e6a', cheveux: '#2c211d', coiffure: 'court', haut: '#3f7ab0', bas: '#3a3f4a', tablier: '#e8b44a', moustache: true, yeux: '#3f5a3a' }, shira: { ...FV_SHIRA, x: 450 } },
    plans: ['notes', 'photo-amis', 'caisse', null, 'caisse-cle', 'boussole-cesaree'],
    emo: { shimon: ['ravi', 'surpris', 'content', 'neutre', 'content'] },
  },
  11: {
    decor: 'cesaree', echelle: 1.05, moi: 600, gros: [470, 14],
    persos: { shira: { ...FV_SHIRA, x: 390 } },
    plans: [null, 'arches-3', 'boite-metal', 'photo-couple', 'photo-dos', 'cratere'],
  },
  12: {
    decor: 'train', echelle: 1.05, moi: 630,
    persos: { hila: { type: 'perso', x: 215, peau: '#c98e6a', cheveux: '#3a2a20', coiffure: 'queue', tenue: 'p-hoodie', tenueSinon: 'p-ecoliere', tete: 'p-casquette' }, shira: { ...FV_SHIRA, x: 450 } },
    plans: ['billet', null, 'badge-nature', 'rocher-lettres', 'lune', 'desert'],
  },
  13: {
    decor: 'ramon', echelle: 1.05, moi: 630,
    persos: { hila: { type: 'perso', x: 260, peau: '#c98e6a', cheveux: '#3a2a20', coiffure: 'queue', tenue: 'p-hoodie', tenueSinon: 'p-ecoliere', tete: 'p-casquette' }, shira: { ...FV_SHIRA, x: 455 } },
    plans: ['soleil-bas', 'gourde', 'rocher-lettres', 'trou', 'bague', 'bague'],
    gros: [470, 14],
  },
  14: {
    decor: 'eilat', echelle: 1.05, moi: 630,
    persos: { nourit: { type: 'perso', x: 220, peau: '#b97b52', cheveux: '#d8d0c0', coiffure: 'queue', tenue: 'p-ecoliere', tenueSinon: 'p-pois', yeux: 'p-solaires' }, shira: { ...FV_SHIRA, x: 450 } },
    plans: ['masque', 'photo-plongee', 'armoire-cadenas', 'cadenas-1961', 'enveloppes', 'enveloppes'],
  },
};

(() => {
  /* ---------- Les décors ---------- */
  const FV_DECORS = {
    // Ton appartement de Tel-Aviv, en plein déménagement
    appart: () => {
      let planches = '';
      for (let i = -6; i <= 14; i++) { const x = i * 62; planches += `M${x} 330L${(400 + (x - 400) * 1.7).toFixed(0)} 450`; }
      const immeubles = [[522, 168, 46, 82, '#fbf6ec'], [566, 140, 40, 110, '#f3ead9'], [604, 182, 52, 68, '#fffaf2'], [654, 150, 36, 100, '#efe3cf'], [688, 176, 34, 74, '#f8f1e4']]
        .map(([x, y, w, h, c]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>${[...Array(Math.floor(h / 22)).keys()].map((r) => `<rect x="${x + 6}" y="${y + 8 + r * 22}" width="${w - 12}" height="5" rx="2" fill="#cfe0ea" opacity=".9"/>`).join('')}`).join('');
      const poussiere = [...Array(12).keys()].map((k) => `<circle class="fv-poussiere" cx="${470 + ((k * 53) % 200)}" cy="${250 + ((k * 37) % 120)}" r="${1.2 + (k % 3) * .6}" fill="#fff6d8" style="animation-delay:-${(k * 1.3).toFixed(1)}s"/>`).join('');
      return `<defs>
        <linearGradient id="fvMur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7ecdc"/><stop offset="1" stop-color="#ead6bb"/></linearGradient>
        <linearGradient id="fvCiel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fc6ee"/><stop offset=".75" stop-color="#cfe6f2"/><stop offset="1" stop-color="#f6e2c4"/></linearGradient>
        <linearGradient id="fvSol" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c99a6e"/><stop offset="1" stop-color="#a5754d"/></linearGradient>
        <linearGradient id="fvRayon" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3d0" stop-opacity=".55"/><stop offset="1" stop-color="#fff3d0" stop-opacity="0"/></linearGradient>
        <radialGradient id="fvHalo"><stop offset="0" stop-color="#fff2c2" stop-opacity=".9"/><stop offset="1" stop-color="#fff2c2" stop-opacity="0"/></radialGradient>
        <clipPath id="fvVitre"><rect x="520" y="60" width="200" height="190" rx="8"/></clipPath>
      </defs>
      <rect width="800" height="330" fill="url(#fvMur)"/>
      <rect width="800" height="330" fill="#fff" opacity=".04"/>
      <rect y="318" width="800" height="12" fill="#fffaf2" opacity=".7"/>
      <rect y="330" width="800" height="120" fill="url(#fvSol)"/>
      <path d="${planches}" stroke="#7d5535" stroke-width="1.300" opacity=".35"/>
      <!-- La fenêtre sur Tel-Aviv -->
      <g clip-path="url(#fvVitre)">
        <rect x="520" y="60" width="200" height="190" fill="url(#fvCiel)"/>
        <circle cx="664" cy="106" r="44" fill="url(#fvHalo)" class="fv-soleil"/><circle cx="664" cy="106" r="18" fill="#fff4c4"/>
        <g class="fv-nuages"><ellipse cx="560" cy="96" rx="26" ry="8" fill="#fff"/><ellipse cx="574" cy="90" rx="14" ry="8" fill="#fff"/><ellipse cx="690" cy="132" rx="20" ry="6" fill="#fff" opacity=".9"/></g>
        <rect x="520" y="200" width="200" height="12" fill="#6fb2d8"/>
        ${immeubles}
        <path d="M700 250Q696 214 704 188" stroke="#8a6a46" stroke-width="5" fill="none"/>
        <g class="fv-palme"><path d="M704 188Q680 178 664 190M704 188Q690 168 672 166M704 188Q716 166 734 170M704 188Q728 182 740 196M704 188Q702 170 708 156" stroke="#5f9a5c" stroke-width="5" fill="none" stroke-linecap="round"/></g>
      </g>
      <rect x="520" y="60" width="200" height="190" rx="8" fill="none" stroke="#fffaf3" stroke-width="10"/>
      <path d="M620 60V250M520 152H720" stroke="#fffaf3" stroke-width="6"/>
      <rect x="506" y="248" width="228" height="12" rx="4" fill="#fffaf3"/><rect x="506" y="258" width="228" height="4" fill="#000" opacity=".06"/>
      <path class="fv-rideau" d="M486 40H530Q522 120 528 200Q532 250 520 296H478Q490 240 486 200Q480 120 486 40Z" fill="#f2bfcb" opacity=".85"/>
      <rect x="476" y="34" width="268" height="8" rx="4" fill="#b98a5e"/>
      <path d="M470 262L540 250H710L790 330H420Z" fill="url(#fvRayon)" opacity=".6"/>
      ${poussiere}
      <!-- Un cadre resté de travers -->
      <g transform="rotate(-6 150 110)"><rect x="104" y="72" width="92" height="74" rx="3" fill="#fff" stroke="#9b7653" stroke-width="5"/><path d="M110 140L140 108L160 128L172 116L190 140Z" fill="#9fc7a8"/><circle cx="174" cy="92" r="8" fill="#f4c56a"/></g>
      <path d="M150 50L150 66" stroke="#8a7a6a" stroke-width="1.500"/>
      <!-- La lampe qui se balance -->
      <g class="fv-lampe"><path d="M360 0V58" stroke="#5b4a5e" stroke-width="2"/><path d="M336 58H384L398 88H322Z" fill="#f6d9a2"/><ellipse cx="360" cy="90" rx="38" ry="6" fill="#fff4cf" opacity=".55"/></g>
      <!-- La commode, avec le tiroir sorti -->
      <rect x="54" y="214" width="190" height="116" rx="6" fill="#b37c52"/><rect x="54" y="208" width="196" height="10" rx="4" fill="#9a6642" transform="translate(-3 0)"/>
      <rect x="66" y="226" width="166" height="28" rx="3" fill="#c48c60"/><circle cx="149" cy="240" r="4" fill="#e8c27a"/>
      <rect x="66" y="260" width="166" height="28" rx="3" fill="#3b2a24"/><rect x="72" y="266" width="154" height="16" fill="#2a1d19"/>
      <rect x="66" y="294" width="166" height="28" rx="3" fill="#c48c60"/><circle cx="149" cy="308" r="4" fill="#e8c27a"/>
      <g transform="translate(96 374) rotate(-8)"><path d="M0 0H150L162 30H-10Z" fill="#a36f47"/><rect x="-10" y="30" width="172" height="26" rx="3" fill="#c48c60"/><circle cx="76" cy="43" r="4" fill="#e8c27a"/></g>
      <!-- Les cartons du déménagement -->
      <g><rect x="684" y="318" width="108" height="86" rx="3" fill="#d6aa72"/><path d="M684 338H792" stroke="#c49558" stroke-width="2"/><rect x="730" y="318" width="16" height="86" fill="#efd9a8" opacity=".8"/>
        <rect x="700" y="262" width="82" height="58" rx="3" fill="#e0b67e"/><rect x="734" y="262" width="14" height="58" fill="#f2dfb2" opacity=".8"/></g>
      <!-- La plante -->
      <g transform="translate(455 330)"><g class="fv-plante"><path d="M0 0Q-4-30-20-52M0 0Q2-36 8-62M0 0Q8-26 26-44M0 0Q-10-20-30-28" stroke="#4f8a5f" stroke-width="4" fill="none" stroke-linecap="round"/><g fill="#6aa772"><ellipse cx="-20" cy="-54" rx="10" ry="6" transform="rotate(-40 -20 -54)"/><ellipse cx="8" cy="-64" rx="7" ry="11"/><ellipse cx="27" cy="-46" rx="10" ry="6" transform="rotate(35 27 -46)"/><ellipse cx="-31" cy="-29" rx="9" ry="5" transform="rotate(-15 -31 -29)"/></g></g><path d="M-16 0H16L12 26H-12Z" fill="#d07a5a"/></g>`;
    },

    // La cage d'escalier de l'immeuble : la porte de Mme Cohen, la fenêtre, les marches et le chat de l'immeuble
    escalier: () => {
      const granito = [...Array(140).keys()].map((k) => `<circle cx="${(k * 97) % 800}" cy="${364 + ((k * 41) % 84)}" r="${1 + (k % 3) * .7}" fill="${['#9b8f7c', '#b7584a', '#5d6f8a', '#f2ede3'][k % 4]}" opacity=".55"/>`).join('');
      let marches = '', barreaux = '';
      for (let s = 0; s < 8; s++) { const x0 = 520 + s * 36, y = 360 - s * 26; marches += `<rect x="${x0}" y="${y - 26}" width="${800 - x0}" height="26" fill="${s % 2 ? '#c9bfae' : '#d6cdbd'}"/><path d="M${x0} ${y - 26}H800" stroke="#a89c88" stroke-width="2"/>`; barreaux += `M${x0 + 14} ${y - 26}V${y - 86}`; }
      const poussiere = [...Array(10).keys()].map((k) => `<circle class="fv-poussiere" cx="${330 + ((k * 31) % 110)}" cy="${230 + ((k * 43) % 110)}" r="${1.2 + (k % 3) * .5}" fill="#fff8dc" style="animation-delay:-${(k * 1.1).toFixed(1)}s"/>`).join('');
      return `<defs>
        <linearGradient id="fvEscMur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1f2e6"/><stop offset="1" stop-color="#e3e6d4"/></linearGradient>
        <linearGradient id="fvEscSol" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ddd5c6"/><stop offset="1" stop-color="#c7bdab"/></linearGradient>
        <linearGradient id="fvEscPorte" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffefc6"/><stop offset="1" stop-color="#f7cf8a"/></linearGradient>
        <linearGradient id="fvEscRayon" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffbe6" stop-opacity=".6"/><stop offset="1" stop-color="#fffbe6" stop-opacity="0"/></linearGradient>
        <radialGradient id="fvEscHalo"><stop offset="0" stop-color="#fff2c2" stop-opacity=".85"/><stop offset="1" stop-color="#fff2c2" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="800" height="360" fill="url(#fvEscMur)"/>
      <rect y="222" width="800" height="138" fill="#a9c3a4"/><rect y="218" width="800" height="5" fill="#8faa8a"/>
      <rect y="360" width="800" height="90" fill="url(#fvEscSol)"/>${granito}
      <!-- La porte de Mme Cohen, ouverte sur un appartement chaleureux -->
      <rect x="34" y="112" width="142" height="250" fill="#8a6a4a"/><rect x="46" y="124" width="118" height="238" fill="url(#fvEscPorte)" class="fv-lueur"/>
      <rect x="62" y="150" width="40" height="52" rx="3" fill="#e9b97a" opacity=".6"/><path d="M116 362V250H150V362" fill="#e8b46e" opacity=".45"/>
      <path d="M164 124L206 140V350L164 362Z" fill="#7a5a3e"/><circle cx="196" cy="248" r="4" fill="#e8c27a"/>
      <rect x="196" y="160" width="26" height="22" rx="3" fill="#e7e2d2" stroke="#9b8f7c"/><text x="209" y="176" text-anchor="middle" font-size="14" font-weight="700" fill="#5a4a3e">7</text>
      <ellipse cx="110" cy="372" rx="62" ry="9" fill="#b5524a" opacity=".85"/>
      <!-- La grande fenêtre de la cage d'escalier -->
      <rect x="324" y="36" width="116" height="170" rx="6" fill="#e9f4f8"/><rect x="324" y="36" width="116" height="170" rx="6" fill="#fff" class="fv-soleil" opacity=".35"/>
      <path d="M382 36V206M324 92H440M324 150H440" stroke="#fff" stroke-width="5"/><rect x="324" y="36" width="116" height="170" rx="6" fill="none" stroke="#f6f6ef" stroke-width="8"/>
      <path d="M324 206L440 206L520 360H250Z" fill="url(#fvEscRayon)" opacity=".7"/>${poussiere}
      <!-- L'ampoule de l'escalier -->
      <path d="M262 0V44" stroke="#5b4a5e" stroke-width="2"/><circle cx="262" cy="56" r="30" fill="url(#fvEscHalo)" class="fv-ampoule"/><circle cx="262" cy="54" r="9" fill="#fff6d0"/><rect x="257" y="40" width="10" height="8" fill="#9a8a7a"/>
      <!-- Les marches qui montent -->
      ${marches}
      <path d="${barreaux}" stroke="#5a4a3e" stroke-width="3"/><path d="M534 274L800 66" stroke="#4a3a30" stroke-width="8" stroke-linecap="round"/>
      <!-- Le chat de l'immeuble, sur la quatrième marche -->
      <g transform="translate(676 256)"><path d="M-22 0Q-26-26 0-28Q22-26 20 0Z" fill="#e3a35c"/><circle cx="-2" cy="-36" r="15" fill="#e3a35c"/><path d="M-14-44L-16-60L-4-48ZM10-46L14-60L2-49Z" fill="#e3a35c"/><path d="M-8-38Q-6-35-4-38M2-38Q4-35 6-38" stroke="#4a3020" stroke-width="1.600" fill="none"/><path d="M-3-32L0-30L3-32" stroke="#4a3020" stroke-width="1.300" fill="none"/>
        <g class="fv-queue"><path d="M18-4Q40-6 38-30" stroke="#e3a35c" stroke-width="7" fill="none" stroke-linecap="round"/></g></g>
      <!-- Une grande plante près de la porte -->
      <g transform="translate(250 362)"><g class="fv-plante"><path d="M0 0Q-6-50-26-84M0 0Q4-60 14-100M0 0Q10-40 34-70" stroke="#3f7a52" stroke-width="4" fill="none"/><g fill="#5c9c6a"><ellipse cx="-27" cy="-86" rx="16" ry="10" transform="rotate(-35 -27 -86)"/><ellipse cx="14" cy="-102" rx="12" ry="17"/><ellipse cx="35" cy="-72" rx="16" ry="9" transform="rotate(30 35 -72)"/><ellipse cx="-12" cy="-52" rx="13" ry="8" transform="rotate(-20 -12 -52)"/></g></g><path d="M-18 0H18L14 30H-14Z" fill="#c76f50"/></g>`;
    },

    // Le bureau de poste du quartier : le guichet (vitre et comptoir passent devant le guichetier), les boîtes postales
    poste: () => {
      let joints = '';
      for (let i = -6; i <= 14; i++) { const x = i * 70; joints += `M${x} 340L${(400 + (x - 400) * 1.6).toFixed(0)} 450`; }
      [372, 410].forEach((y) => (joints += `M0 ${y}H800`));
      let boites = '';
      for (let r = 0; r < 6; r++) for (let c = 0; c < 5; c++) { const x = 572 + c * 42, y = 102 + r * 37, ici = r === 2 && c === 1; boites += `<rect x="${x}" y="${y}" width="36" height="31" rx="2" fill="${ici ? '#f0c96e' : '#d7ae66'}" ${ici ? 'class="fv-boite"' : ''}/><circle cx="${x + 28}" cy="${y + 16}" r="2.300" fill="#7a5a2a"/><rect x="${x + 5}" y="${y + 5}" width="14" height="4" rx="1" fill="#fff6dc" opacity=".8"/>`; }
      return `<defs>
        <linearGradient id="fvPoMur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eaf1f6"/><stop offset="1" stop-color="#d6e1ea"/></linearGradient>
        <linearGradient id="fvPoSol" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d4dadf"/><stop offset="1" stop-color="#b9c2ca"/></linearGradient>
      </defs>
      <rect width="800" height="340" fill="url(#fvPoMur)"/><rect y="330" width="800" height="10" fill="#c4cfd8"/>
      <rect y="340" width="800" height="110" fill="url(#fvPoSol)"/><path d="${joints}" stroke="#9aa5ae" stroke-width="1.200" opacity=".6"/>
      <!-- L'enseigne -->
      <rect x="86" y="20" width="250" height="52" rx="12" fill="#d64545"/><rect x="104" y="32" width="40" height="28" rx="3" fill="#fff"/><path d="M104 32L124 48L144 32" stroke="#d64545" stroke-width="3" fill="none"/>
      <text x="318" y="58" text-anchor="end" font-family="Frank Ruhl Libre, serif" font-size="32" font-weight="700" fill="#fff">דֹּאַר</text>
      <!-- L'écran des numéros et l'horloge -->
      <rect x="362" y="34" width="84" height="44" rx="6" fill="#2b2230"/><text x="404" y="66" text-anchor="middle" font-family="Consolas, monospace" font-size="26" font-weight="700" fill="#ff6a5a" class="fv-clignote">38</text>
      <circle cx="490" cy="56" r="24" fill="#fff" stroke="#5a6a7a" stroke-width="4"/><path d="M490 56V40" stroke="#2b2230" stroke-width="3" stroke-linecap="round"/><path d="M490 56L502 56" stroke="#2b2230" stroke-width="3" stroke-linecap="round" class="fv-aiguille"/>
      <!-- Le mur des boîtes postales -->
      <rect x="560" y="90" width="226" height="240" rx="6" fill="#8a6234"/>${boites}
      <!-- Une affiche de timbres -->
      <rect x="470" y="120" width="70" height="90" rx="4" fill="#fff" stroke="#c9d3db" stroke-width="3"/><rect x="480" y="130" width="22" height="28" fill="#7fb3d9"/><rect x="508" y="130" width="22" height="28" fill="#f2b84b"/><rect x="480" y="166" width="22" height="28" fill="#8fc79a"/><rect x="508" y="166" width="22" height="28" fill="#e88a9a"/>
      <!-- Le fond du guichet -->
      <rect x="40" y="110" width="350" height="230" fill="#cfdbe4"/><rect x="60" y="150" width="80" height="60" rx="3" fill="#e8eef2"/><path d="M70 170H130M70 185H120" stroke="#aab7c2" stroke-width="3"/>
      <!-- Un banc d'attente -->
      <rect x="440" y="306" width="110" height="10" rx="4" fill="#7d8a96"/><path d="M450 316V340M540 316V340" stroke="#5f6b76" stroke-width="5"/>`;
    },

    // Jaffa : le marché aux puces au pied de la tour de l'Horloge, avec le stand du brocanteur
    jaffa: () => {
      let paves = '';
      for (let r = 0; r < 5; r++) { const y = 336 + r * 24; paves += `M0 ${y}H800`; for (let c = 0; c < 18; c++) { const x = c * 52 + (r % 2) * 26; paves += `M${x} ${y}V${y + 24}`; } }
      const maisons = [[0, 196, 120, '#e8cfa0'], [120, 222, 100, '#dfc08c'], [380, 214, 110, '#e6c99a'], [490, 186, 120, '#ead3a8'], [610, 230, 70, '#dcbd88']]
        .map(([x, y, w, c]) => `<rect x="${x}" y="${y}" width="${w}" height="${336 - y}" fill="${c}"/>${[0, 1].map((k) => `<path d="M${x + 16 + k * (w / 2)} ${y + 70}V${y + 40}A12 12 0 0 1 ${x + 40 + k * (w / 2)} ${y + 40}V${y + 70}Z" fill="#7a5a44" opacity=".75"/>`).join('')}`).join('');
      const tapis = [[680, '#b8483e', '#f2c45a'], [722, '#3f6a9a', '#f0e2c0'], [764, '#6a8a4a', '#e8a85a']]
        .map(([x, a, b], k) => `<g class="fv-tapis" style="animation-delay:-${k * 1.2}s"><rect x="${x}" y="150" width="38" height="150" fill="${a}"/><rect x="${x + 5}" y="158" width="28" height="134" fill="none" stroke="${b}" stroke-width="3"/><path d="M${x + 19} 180L${x + 30} 225L${x + 19} 270L${x + 8} 225Z" fill="${b}"/></g>`).join('');
      return `<defs>
        <linearGradient id="fvJaCiel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#86c3ee"/><stop offset=".8" stop-color="#d6ecf6"/><stop offset="1" stop-color="#fbe6c6"/></linearGradient>
        <linearGradient id="fvJaSol" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dcc6a2"/><stop offset="1" stop-color="#c6ac86"/></linearGradient>
        <linearGradient id="fvJaTour" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ecd09a"/><stop offset="1" stop-color="#cfa96c"/></linearGradient>
        <radialGradient id="fvJaHalo"><stop offset="0" stop-color="#fff4c8" stop-opacity=".9"/><stop offset="1" stop-color="#fff4c8" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="800" height="340" fill="url(#fvJaCiel)"/>
      <circle cx="700" cy="70" r="50" fill="url(#fvJaHalo)" class="fv-soleil"/><circle cx="700" cy="70" r="20" fill="#fff5cc"/>
      <g class="fv-nuages"><ellipse cx="520" cy="60" rx="34" ry="9" fill="#fff"/><ellipse cx="540" cy="53" rx="18" ry="9" fill="#fff"/><ellipse cx="120" cy="90" rx="26" ry="7" fill="#fff" opacity=".9"/></g>
      <g class="fv-mouettes"><path d="M80 120q7-7 14 0q7-7 14 0M150 96q5-5 10 0q5-5 10 0M610 130q6-6 12 0q6-6 12 0" stroke="#4a5568" stroke-width="2.200" fill="none" stroke-linecap="round"/></g>
      <!-- La mer du vieux port, entre les maisons -->
      <rect x="610" y="262" width="190" height="74" fill="#5fa6cf"/><path d="M610 280Q650 274 690 280T770 280" stroke="#d9eef8" stroke-width="2" fill="none"/>
      <g class="fv-bateau"><path d="M716 290H760L752 302H724Z" fill="#fff"/><path d="M738 290V258L756 288Z" fill="#f4f1ea"/><path d="M738 290V264L724 288Z" fill="#e88a6a"/></g>
      ${maisons}
      <!-- La tour de l'Horloge -->
      <rect x="290" y="70" width="84" height="266" fill="url(#fvJaTour)"/><rect x="282" y="62" width="100" height="14" fill="#c9a065"/><rect x="300" y="36" width="64" height="28" fill="url(#fvJaTour)"/><path d="M296 36H368L332 14Z" fill="#c9a065"/>
      <circle cx="332" cy="116" r="25" fill="#fffaf0" stroke="#7a5a34" stroke-width="4"/><path d="M332 116V100" stroke="#2b2230" stroke-width="3" stroke-linecap="round"/><path d="M332 116L346 116" stroke="#2b2230" stroke-width="3" stroke-linecap="round" class="fv-aiguille"/>
      <path d="M314 200V172A18 18 0 0 1 350 172V200Z" fill="#7a5a44" opacity=".8"/><path d="M314 268V240A18 18 0 0 1 350 240V268Z" fill="#7a5a44" opacity=".8"/>
      <!-- Le sol pavé -->
      <rect y="336" width="800" height="114" fill="url(#fvJaSol)"/><path d="${paves}" stroke="#a88c66" stroke-width="1.300" opacity=".5"/>
      <!-- Le stand de tapis -->
      <path d="M670 146H800" stroke="#6a4a30" stroke-width="5"/>${tapis}
      <!-- Le stand du brocanteur : l'auvent rayé et l'étagère d'antiquités -->
      <path d="M78 190V336M272 190V336" stroke="#6a4a30" stroke-width="6"/>
      <g class="fv-store"><path d="M60 150H290V190Q278 200 267 190Q256 200 244 190Q233 200 221 190Q210 200 198 190Q187 200 175 190Q164 200 152 190Q141 200 129 190Q118 200 106 190Q95 200 83 190Q72 200 60 190Z" fill="#f4ead8"/>${[0, 1, 2, 3, 4].map((k) => `<path d="M${60 + k * 46} 150H${83 + k * 46}V190Q${78 + k * 46} 196 ${72 + k * 46} 193L${60 + k * 46} 190Z" fill="#c9473f"/>`).join('')}</g>
      <rect x="86" y="236" width="180" height="8" fill="#7a5a3a"/>
      <g transform="translate(110 236)"><path d="M0 0V-22M-10-22H10L4-40H-4Z" fill="#c9a04a" stroke="#8a6a2a"/><path d="M-6-40Q0-52 6-40" fill="#fff3b0"/></g>
      <g transform="translate(160 236)"><rect x="-14" y="-16" width="28" height="16" fill="#7a4a2a"/><path d="M4-16L14-44Q30-50 34-36Q24-30 10-16Z" fill="#d9b04a" stroke="#8a6a2a"/></g>
      <g transform="translate(222 236)"><path d="M-10 0Q-16-14-8-26H8Q16-14 10 0Z" fill="#4a7ab0"/><path d="M-6-26V-32H6V-26" fill="#4a7ab0"/></g>`;
    },

    // Le vieux port de Jaffa : la terrasse du café, les bateaux de pêche, les filets
    port: () => {
      let planches = '';
      for (let i = -6; i <= 14; i++) { const x = i * 60; planches += `M${x} 336L${(400 + (x - 400) * 1.6).toFixed(0)} 450`; }
      const ampoules = [...Array(11).keys()].map((k) => { const x = 30 + k * 74, y = 34 + Math.sin(k * 1.1) * 8 + (k % 2) * 10; return `<circle cx="${x}" cy="${y.toFixed(0)}" r="5" fill="#ffe08a" class="fv-guirlande" style="animation-delay:-${(k * .37).toFixed(2)}s"/>`; }).join('');
      return `<defs>
        <linearGradient id="fvPoCiel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ec8ef"/><stop offset="1" stop-color="#fbe2c2"/></linearGradient>
        <linearGradient id="fvPoMer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4f9fcf"/><stop offset="1" stop-color="#2f78a8"/></linearGradient>
        <linearGradient id="fvPoBois" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b98a5e"/><stop offset="1" stop-color="#94673f"/></linearGradient>
        <radialGradient id="fvPoHalo"><stop offset="0" stop-color="#fff4c8" stop-opacity=".9"/><stop offset="1" stop-color="#fff4c8" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="800" height="230" fill="url(#fvPoCiel)"/>
      <circle cx="120" cy="80" r="46" fill="url(#fvPoHalo)" class="fv-soleil"/><circle cx="120" cy="80" r="18" fill="#fff5cc"/>
      <g class="fv-nuages"><ellipse cx="420" cy="70" rx="30" ry="8" fill="#fff"/><ellipse cx="440" cy="64" rx="16" ry="8" fill="#fff"/></g>
      <g class="fv-mouettes"><path d="M260 110q6-6 12 0q6-6 12 0M560 90q7-7 14 0q7-7 14 0M640 128q5-5 10 0q5-5 10 0" stroke="#4a5568" stroke-width="2.200" fill="none" stroke-linecap="round"/></g>
      <rect y="200" width="800" height="136" fill="url(#fvPoMer)"/>
      <g class="fv-vague"><path d="M0 220Q40 212 80 220T160 220T240 220T320 220T400 220T480 220T560 220T640 220T720 220T800 220M0 262Q50 254 100 262T200 262T300 262T400 262T500 262T600 262T700 262T800 262" stroke="#cbe6f5" stroke-width="2.500" fill="none" opacity=".7"/></g>
      <path d="M0 200H330L350 186H800V200" fill="#cdb48c"/>
      <g class="fv-bateau"><path d="M300 272H400L386 296H314Z" fill="#f2efe6"/><rect x="300" y="268" width="100" height="6" fill="#3f7ab0"/><path d="M352 268V200" stroke="#6a5a4a" stroke-width="3"/><path d="M352 206L392 262H352Z" fill="#f4ead4"/></g>
      <g class="fv-bateau" style="animation-delay:-1.3s"><path d="M520 246H600L590 264H530Z" fill="#c9473f"/><rect x="540" y="232" width="34" height="14" fill="#f2efe6"/><path d="M584 246V206" stroke="#6a5a4a" stroke-width="2.500"/></g>
      <!-- La terrasse du café -->
      <rect y="320" width="800" height="16" fill="#7a5a3a"/>
      <rect y="336" width="800" height="114" fill="url(#fvPoBois)"/><path d="${planches}" stroke="#6a4a2a" stroke-width="1.200" opacity=".4"/>
      <path d="M0 330H800" stroke="#5a3a20" stroke-width="3"/>
      <!-- Le filet et les bouées, sur le poteau de droite -->
      <path d="M760 336V120" stroke="#6a4a30" stroke-width="10"/>
      <g class="fv-tapis"><path d="M690 130Q725 150 760 130V250Q725 270 690 250Z" fill="none" stroke="#c9b48a" stroke-width="1.500"/>${[0, 1, 2, 3, 4, 5].map((k) => `<path d="M${696 + k * 11} 134V254" stroke="#c9b48a" stroke-width="1.200"/>`).join('')}${[0, 1, 2, 3, 4].map((k) => `<path d="M690 ${150 + k * 22}Q725 ${170 + k * 22} 760 ${150 + k * 22}" stroke="#c9b48a" stroke-width="1.200" fill="none"/>`).join('')}</g>
      <circle cx="770" cy="180" r="14" fill="#f2862e"/><path d="M756 180H784" stroke="#fff" stroke-width="4"/><circle cx="748" cy="282" r="12" fill="#f2862e"/>
      <!-- Le parasol du café et la guirlande -->
      <path d="M0 26Q200 60 400 30T800 34" stroke="#4a3a30" stroke-width="1.500" fill="none"/>${ampoules}
      <path d="M82 336V150" stroke="#e8e0d0" stroke-width="5"/><path d="M-10 160Q82 96 174 160Z" fill="#3f7ab0"/><path d="M-10 160Q36 150 82 160Q128 150 174 160" fill="none" stroke="#2f5a88" stroke-width="2"/>`;
    },

    // La grande bibliothèque : les rayonnages, la grande fenêtre, le bureau des archives
    bibliotheque: () => {
      const r = (k) => ((k * 9301 + 49297) % 233280) / 233280;
      let livres = '';
      [[20, 250], [560, 790]].forEach(([x0, x1], s) => {
        for (let rang = 0; rang < 6; rang++) {
          const y = 60 + rang * 46;
          let x = x0 + 6, k = rang * 31 + s * 400;
          while (x < x1 - 14) { const w = 9 + Math.floor(r(k) * 9), h = 30 + Math.floor(r(k + 7) * 12); livres += `<rect x="${x}" y="${y + 40 - h}" width="${w}" height="${h}" fill="${['#b8483e', '#3f6a9a', '#6a8a4a', '#d9a04a', '#7a5a8a', '#2f4a5a', '#c97a4a'][k % 7]}"/>`; x += w + 1; k++; }
          livres += `<rect x="${x0}" y="${y + 40}" width="${x1 - x0}" height="6" fill="#6a4a30"/>`;
        }
      });
      const poussiere = [...Array(10).keys()].map((k) => `<circle class="fv-poussiere" cx="${330 + ((k * 31) % 140)}" cy="${200 + ((k * 43) % 130)}" r="${1.2 + (k % 3) * .5}" fill="#fff8dc" style="animation-delay:-${(k * 1.1).toFixed(1)}s"/>`).join('');
      return `<defs>
        <linearGradient id="fvBiMur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1e5cf"/><stop offset="1" stop-color="#e2d0b0"/></linearGradient>
        <linearGradient id="fvBiSol" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a87a52"/><stop offset="1" stop-color="#8a5f3c"/></linearGradient>
        <linearGradient id="fvBiVitre" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe6f4"/><stop offset="1" stop-color="#f6ecd4"/></linearGradient>
        <linearGradient id="fvBiRayon" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6d8" stop-opacity=".55"/><stop offset="1" stop-color="#fff6d8" stop-opacity="0"/></linearGradient>
      </defs>
      <rect width="800" height="340" fill="url(#fvBiMur)"/>
      <rect y="340" width="800" height="110" fill="url(#fvBiSol)"/>${[...Array(9).keys()].map((k) => `<path d="M0 ${350 + k * 12}H800" stroke="#6a4a2a" stroke-width="1" opacity=".25"/>`).join('')}
      <!-- La grande fenêtre en arc -->
      <path d="M318 250V90A82 82 0 0 1 482 90V250Z" fill="url(#fvBiVitre)"/><path d="M400 8V250M318 150H482M318 90H482" stroke="#fffaf0" stroke-width="5"/><path d="M318 250V90A82 82 0 0 1 482 90V250Z" fill="none" stroke="#c9a77a" stroke-width="8"/>
      <rect x="306" y="246" width="188" height="12" rx="3" fill="#c9a77a"/>
      <path d="M318 258H482L560 400H240Z" fill="url(#fvBiRayon)" opacity=".7"/>${poussiere}
      <!-- Les rayonnages -->
      <rect x="14" y="50" width="242" height="300" fill="#7a5436"/><rect x="554" y="50" width="242" height="300" fill="#7a5436"/>${livres}
      <!-- L'échelle roulante -->
      <path d="M660 40L700 340M710 40L750 340" stroke="#b08a5a" stroke-width="6"/>${[0, 1, 2, 3, 4, 5, 6].map((k) => `<path d="M${664 + k * 5.300} ${70 + k * 40}H${714 + k * 5.300}" stroke="#b08a5a" stroke-width="5"/>`).join('')}
      <!-- Le globe -->
      <g transform="translate(520 330)"><path d="M-14 0H14L8-10H-8Z" fill="#6a4a30"/><path d="M0-10V-18" stroke="#6a4a30" stroke-width="3"/><g class="fv-globe"><circle cy="-40" r="22" fill="#6aa8d8"/><path d="M-12-52Q-2-48-6-40Q-14-36-10-28M6-58Q14-50 10-42Q4-36 12-30" fill="none" stroke="#7fbf7a" stroke-width="6" stroke-linecap="round"/></g><path d="M-26-40A26 26 0 0 0 0-14" stroke="#c9a04a" stroke-width="3" fill="none"/></g>`;
    },

    // La boulangerie Shamir : le pain sur les étagères, l'ardoise, et la photo de Rivka au mur
    boulangerie: () => {
      let carreaux = '';
      for (let y = 20; y < 330; y += 18) carreaux += `M0 ${y}H800`;
      for (let y = 20, k = 0; y < 330; y += 18, k++) for (let x = (k % 2) * 18; x < 800; x += 36) carreaux += `M${x} ${y}V${y + 18}`;
      let damier = '';
      for (let r = 0; r < 4; r++) for (let c = 0; c < 20; c++) if ((r + c) % 2) damier += `M${c * 40 + r * 0} ${340 + r * 28}h40v28h-40Z`;
      const pains = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="26" ry="11" fill="#d08a42"/><path d="M${x - 14} ${y - 6}l6 8M${x - 2} ${y - 8}l6 8M${x + 10} ${y - 6}l6 8" stroke="#a8622a" stroke-width="2.500" stroke-linecap="round"/>`;
      const halla = (x, y) => `<g transform="translate(${x} ${y})">${[-18, -6, 6, 18].map((d, k) => `<ellipse cx="${d}" cy="${k % 2 ? -2 : 0}" rx="9" ry="8" fill="${k % 2 ? '#c9782e' : '#d98e3e'}"/>`).join('')}</g>`;
      return `<defs>
        <linearGradient id="fvBoMur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbf4e8"/><stop offset="1" stop-color="#f0e2cb"/></linearGradient>
        <radialGradient id="fvBoLampe"><stop offset="0" stop-color="#fff0c4" stop-opacity=".8"/><stop offset="1" stop-color="#fff0c4" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="800" height="340" fill="url(#fvBoMur)"/><path d="${carreaux}" stroke="#e2d6c2" stroke-width="1.200"/>
      <rect y="340" width="800" height="110" fill="#efe6d6"/><path d="${damier}" fill="#c9a77a" opacity=".55"/>
      <!-- Les étagères à pain, derrière le comptoir -->
      <rect x="40" y="96" width="330" height="10" rx="2" fill="#8a5a36"/><rect x="40" y="170" width="330" height="10" rx="2" fill="#8a5a36"/><rect x="40" y="244" width="330" height="10" rx="2" fill="#8a5a36"/>
      ${pains(80, 86)}${halla(150, 88)}${pains(230, 86)}${halla(310, 88)}${halla(82, 160)}${pains(160, 160)}${halla(240, 160)}${pains(320, 160)}
      ${[70, 110, 150, 190, 230, 270, 310, 345].map((x) => `<circle cx="${x}" cy="234" r="9" fill="#e8c27a" stroke="#c99a4a" stroke-width="2"/>`).join('')}
      <!-- Les lampes suspendues -->
      <g class="fv-lampe" style="transform-origin:150px 0"><path d="M150 0V30" stroke="#5b4a5e" stroke-width="2"/><path d="M134 30H166L174 48H126Z" fill="#3f6a5a"/><circle cx="150" cy="56" r="34" fill="url(#fvBoLampe)"/></g>
      <g class="fv-lampe" style="transform-origin:420px 0;animation-delay:-1.5s"><path d="M420 0V30" stroke="#5b4a5e" stroke-width="2"/><path d="M404 30H436L444 48H396Z" fill="#3f6a5a"/><circle cx="420" cy="56" r="34" fill="url(#fvBoLampe)"/></g>
      <!-- La photo de Rivka, encadrée au mur -->
      <g transform="rotate(2 585 100)"><rect x="544" y="50" width="82" height="100" rx="3" fill="#8a6234"/><rect x="552" y="58" width="66" height="84" fill="#e9dcc0"/>
        <rect x="552" y="58" width="66" height="54" fill="#cdbf9e"/><rect x="552" y="112" width="66" height="30" fill="#a8977a"/>
        <circle cx="585" cy="96" r="7" fill="#e8d2b0"/><path d="M578 94Q580 84 585 86Q592 84 592 94Q590 89 585 89Q580 89 578 94Z" fill="#6a5040"/><path d="M576 140Q577 110 585 106Q593 110 594 140Z" fill="#f2ead8"/></g>
      <g class="fv-brille"><path d="M630 60L632 66L638 68L632 70L630 76L628 70L622 68L628 66Z" fill="#fff6c8"/></g>
      <!-- L'ardoise -->
      <rect x="660" y="60" width="120" height="150" rx="6" fill="#2f3a36" stroke="#8a5a36" stroke-width="6"/>
      ${halla(700, 96).replace(/fill="#[0-9a-f]+"/g, 'fill="none" stroke="#f2ead8" stroke-width="1.500"')}<text x="752" y="102" text-anchor="middle" font-family="Consolas, monospace" font-size="15" fill="#f2ead8">₪18</text>
      ${pains(700, 150).replace(/fill="#[0-9a-f]+"/g, 'fill="none" stroke="#f2ead8" stroke-width="1.500"')}<text x="752" y="156" text-anchor="middle" font-family="Consolas, monospace" font-size="15" fill="#f2ead8">₪12</text>
      <!-- La porte vitrée sur la rue -->
      <rect x="470" y="170" width="70" height="170" rx="4" fill="#cfe6f4" stroke="#8a5a36" stroke-width="6"/><path d="M478 186L500 230M490 186L520 246" stroke="#fff" stroke-width="3" opacity=".6"/>`;
    },

    // Chez Rivka : un salon d'autrefois, avec vue sur la mer
    salon: () => {
      let papier = '';
      for (let y = 30; y < 330; y += 60) for (let x = (y / 60 % 2) * 40; x < 800; x += 80) papier += `<g transform="translate(${x} ${y})" opacity=".35"><circle r="5" fill="#d99aa8"/><circle cx="6" cy="-4" r="4" fill="#e8b4c0"/><path d="M0 6Q-6 14-2 20" stroke="#9ab48a" stroke-width="2" fill="none"/></g>`;
      return `<defs>
        <linearGradient id="fvSaMur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6ead8"/><stop offset="1" stop-color="#ead6bc"/></linearGradient>
        <linearGradient id="fvSaMer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd0ee"/><stop offset=".55" stop-color="#d9eef8"/><stop offset=".56" stop-color="#5fa6cf"/><stop offset="1" stop-color="#3f86b8"/></linearGradient>
        <linearGradient id="fvSaSol" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a6a46"/><stop offset="1" stop-color="#7d5233"/></linearGradient>
      </defs>
      <rect width="800" height="336" fill="url(#fvSaMur)"/>${papier}
      <rect y="300" width="800" height="36" fill="#d9c2a2"/><rect y="298" width="800" height="5" fill="#b9966a"/>
      <rect y="336" width="800" height="114" fill="url(#fvSaSol)"/><ellipse cx="420" cy="410" rx="300" ry="34" fill="#b5524a" opacity=".55"/><ellipse cx="420" cy="410" rx="280" ry="28" fill="none" stroke="#e8c27a" stroke-width="3" opacity=".6"/>
      <!-- La fenêtre sur la mer, avec ses rideaux de dentelle -->
      <rect x="290" y="56" width="220" height="170" rx="6" fill="url(#fvSaMer)"/>
      <g class="fv-vague"><path d="M290 160Q320 154 350 160T410 160T470 160T530 160" stroke="#e6f4fb" stroke-width="2" fill="none"/></g>
      <g class="fv-bateau"><path d="M440 150H470L464 158H446Z" fill="#fff"/><path d="M455 150V130L466 148Z" fill="#fff"/></g>
      <path d="M400 56V226M290 140H510" stroke="#fffaf3" stroke-width="6"/><rect x="290" y="56" width="220" height="170" rx="6" fill="none" stroke="#fffaf3" stroke-width="9"/>
      <path class="fv-rideau" d="M270 40H318Q306 130 314 230H272Z" fill="#fffaf3" opacity=".8"/><path class="fv-rideau" d="M530 40H482Q494 130 486 230H528Z" fill="#fffaf3" opacity=".8" style="animation-delay:-3s"/>
      <rect x="262" y="34" width="276" height="8" rx="4" fill="#a8744a"/><rect x="280" y="224" width="240" height="12" rx="4" fill="#fffaf3"/>
      <!-- La photo de David et la pendule -->
      <rect x="96" y="70" width="70" height="86" rx="3" fill="#8a6234"/><rect x="104" y="78" width="54" height="70" fill="#d9cdb0"/><circle cx="131" cy="104" r="9" fill="#e8d2b0"/><path d="M122 100Q131 90 140 100Z" fill="#9a9aa6"/><path d="M118 148Q120 120 131 116Q142 120 144 148Z" fill="#4a4a5a"/>
      <g transform="translate(650 110)"><rect x="-30" y="-46" width="60" height="92" rx="10" fill="#8a5a36"/><circle r="22" fill="#fffaf0" stroke="#c9a04a" stroke-width="3"/><path d="M0 0V-14M0 0L10 4" stroke="#2b2230" stroke-width="2.500" stroke-linecap="round"/><g class="fv-balancier"><path d="M0 24V36" stroke="#c9a04a" stroke-width="2"/><circle cy="38" r="5" fill="#c9a04a"/></g></g>
      <!-- La bibliothèque basse avec les photos -->
      <rect x="560" y="226" width="200" height="110" fill="#8a5a36"/><rect x="570" y="236" width="180" height="40" fill="#6a4228"/><rect x="570" y="284" width="180" height="40" fill="#6a4228"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => `<rect x="${574 + k * 19}" y="${244 + (k % 3) * 2}" width="15" height="${30 - (k % 3) * 2}" fill="${['#b8483e', '#3f6a9a', '#d9a04a', '#6a8a4a'][k % 4]}"/>`).join('')}
      <rect x="586" y="200" width="34" height="26" fill="#fff" stroke="#c9a04a" stroke-width="3"/><rect x="636" y="196" width="28" height="30" fill="#fff" stroke="#c9a04a" stroke-width="3"/><rect x="590" y="204" width="26" height="18" fill="#bcd9e8"/><rect x="640" y="200" width="20" height="22" fill="#e8cfa0"/>
      <!-- Le fauteuil -->
      <g transform="translate(70 336)"><path d="M-10-130Q0-150 40-150Q80-150 90-130V-40H-10Z" fill="#7a8ab0"/><rect x="-24" y="-70" width="128" height="40" rx="14" fill="#8a9ac0"/><rect x="-30" y="-90" width="24" height="70" rx="10" fill="#6a7aa0"/><path d="M-20-30V0M94-30V0" stroke="#5a3a20" stroke-width="6"/></g>`;
    },

    // Le port de Jaffa au coucher du soleil : Yossef et Rivka, de dos, se tiennent la main face à la mer
    portSoir: () => `<defs>
        <linearGradient id="fvPsCiel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a4a8a"/><stop offset=".45" stop-color="#e48a8a"/><stop offset=".8" stop-color="#f6b46a"/><stop offset="1" stop-color="#fbd38a"/></linearGradient>
        <linearGradient id="fvPsMer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8946a"/><stop offset=".3" stop-color="#9a6a8a"/><stop offset="1" stop-color="#3a4a7a"/></linearGradient>
        <radialGradient id="fvPsSoleil"><stop offset="0" stop-color="#fff2b0"/><stop offset=".4" stop-color="#ffc46a" stop-opacity=".7"/><stop offset="1" stop-color="#ff9a5a" stop-opacity="0"/></radialGradient>
        <clipPath id="fvPsHorizon"><rect width="800" height="230"/></clipPath>
      </defs>
      <rect width="800" height="230" fill="url(#fvPsCiel)"/>
      <g class="fv-nuages"><ellipse cx="200" cy="70" rx="60" ry="8" fill="#f6a8a8" opacity=".7"/><ellipse cx="610" cy="96" rx="70" ry="9" fill="#f4b08a" opacity=".7"/></g>
      <g clip-path="url(#fvPsHorizon)"><circle cx="430" cy="230" r="90" fill="url(#fvPsSoleil)" class="fv-soleil"/><circle cx="430" cy="230" r="34" fill="#ffe08a"/></g>
      <rect y="230" width="800" height="220" fill="url(#fvPsMer)"/>
      <g class="fv-vague">${[0, 1, 2, 3, 4, 5].map((k) => `<path d="M${390 - k * 14} ${244 + k * 16}H${470 + k * 14}" stroke="#ffd98a" stroke-width="${4 - k * .5}" opacity="${.9 - k * .12}" stroke-linecap="round"/>`).join('')}</g>
      <g class="fv-mouettes"><path d="M300 120q7-7 14 0q7-7 14 0M380 100q5-5 10 0q5-5 10 0" stroke="#3a2a4a" stroke-width="2.200" fill="none" stroke-linecap="round"/></g>
      <!-- Le quai -->
      <path d="M0 330H800V450H0Z" fill="#6a4a3a"/><path d="M0 330H800" stroke="#8a6a4a" stroke-width="6"/>${[...Array(14).keys()].map((k) => `<path d="M${k * 62} 336V450" stroke="#5a3a2a" stroke-width="2"/>`).join('')}
      <!-- Le banc, et Yossef et Rivka vus de dos -->
      <g transform="translate(560 336)">
        <rect x="-110" y="-46" width="220" height="10" rx="3" fill="#4a3020"/><rect x="-110" y="-80" width="220" height="10" rx="3" fill="#4a3020"/><path d="M-96-36V0M96-36V0" stroke="#4a3020" stroke-width="7"/>
        <g transform="translate(-36 0)"><path d="M-30-46Q-32-110 0-112Q32-110 30-46Z" fill="#3a4a6a"/><circle cy="-128" r="22" fill="#e8c8a8"/><path d="M-23-132Q-24-154 0-156Q24-154 23-132Q18-140 0-140Q-18-140-23-132Z" fill="#2f3f6a"/><path d="M-26-138H26" stroke="#1f2f5a" stroke-width="5"/></g>
        <g transform="translate(36 0)"><path d="M-28-46Q-30-106 0-108Q30-106 28-46Z" fill="#c97a8a"/><path d="M-30-96Q0-112 30-96L26-70Q0-80-26-70Z" fill="#e8b4c0"/><circle cy="-122" r="20" fill="#f3d6c0"/><path d="M-21-122Q-24-146 0-146Q24-146 21-122Q24-132 0-134Q-24-132-21-122Z" fill="#f4f2f7"/><path d="M-20-120Q-22-104-16-100M20-120Q22-104 16-100" stroke="#f4f2f7" stroke-width="6" fill="none"/></g>
        <path d="M-8-70Q0-62 8-70" stroke="#e8c8a8" stroke-width="9" fill="none" stroke-linecap="round"/>
        ${[[-10, -170, 0], [16, -190, 1.2], [-4, -212, 2.4]].map(([x, y, d]) => `<path class="fv-coeur" style="animation-delay:-${d}s" d="M${x} ${y + 6}C${x - 9} ${y} ${x - 7} ${y - 8} ${x - 2} ${y - 7}C${x - 0.5} ${y - 6.5} ${x} ${y - 5} ${x} ${y - 4}C${x} ${y - 5} ${x + 0.5} ${y - 6.5} ${x + 2} ${y - 7}C${x + 7} ${y - 8} ${x + 9} ${y} ${x} ${y + 6}Z" fill="#f48aa8"/>`).join('')}
      </g>`,

    // La fête au café du port : le décor du port, avec des fanions et des ballons
    fete: () => `${FV_DECORS.port()}
      <path d="M0 70Q200 110 400 74T800 80" stroke="#6a4a3a" stroke-width="1.500" fill="none"/>
      ${[...Array(16).keys()].map((k) => { const x = 20 + k * 50, y = 78 + Math.sin(k * .8) * 10; return `<path class="fv-fanion" style="animation-delay:-${(k * .3).toFixed(1)}s" d="M${x - 12} ${y.toFixed(0)}L${x + 12} ${y.toFixed(0)}L${x} ${(y + 24).toFixed(0)}Z" fill="${['#e46a92', '#f2b134', '#3fae7a', '#4f9fcf', '#9b5de5'][k % 5]}"/>`; }).join('')}
      <g class="fv-ballons">${[[700, 150, '#e46a92'], [732, 136, '#f2b134'], [716, 120, '#4f9fcf']].map(([x, y, c]) => `<path d="M${x} ${y + 26}Q${x - 6} ${y + 60} ${x + 4} ${y + 96}" stroke="#6a5a5a" stroke-width="1.200" fill="none"/><ellipse cx="${x}" cy="${y}" rx="16" ry="20" fill="${c}"/><path d="M${x - 6} ${y - 8}Q${x - 2} ${y - 14} ${x + 4} ${y - 10}" stroke="#fff" stroke-width="3" opacity=".5" fill="none"/>`).join('')}</g>`,

    // Le vieux port d'Akko : les remparts, le phare, le quai et le bateau de Shimon
    akko: () => {
      let pierres = '';
      for (let r = 0; r < 5; r++) for (let c = 0; c < 9; c++) pierres += `<rect x="${c * 52 + (r % 2) * 26 - 26}" y="${150 + r * 18}" width="50" height="16" rx="2" fill="${['#d9b98a', '#d1af7e', '#dcc096'][(r + c) % 3]}"/>`;
      let dalles = '';
      for (let r = 0; r < 4; r++) for (let c = 0; c < 18; c++) dalles += `<rect x="${c * 46 + (r % 2) * 23 - 23}" y="${340 + r * 28}" width="44" height="26" rx="2" fill="${['#c9b08a', '#bfa47e', '#cdb592'][(r + c) % 3]}"/>`;
      return `<defs>
        <linearGradient id="fvAkCiel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fc0ee"/><stop offset="1" stop-color="#d9eef8"/></linearGradient>
        <linearGradient id="fvAkMer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f9cc9"/><stop offset="1" stop-color="#2a6f9e"/></linearGradient>
      </defs>
      <rect width="800" height="250" fill="url(#fvAkCiel)"/>
      <g class="fv-nuages"><ellipse cx="560" cy="60" rx="34" ry="9" fill="#fff"/><ellipse cx="580" cy="53" rx="18" ry="9" fill="#fff"/><ellipse cx="200" cy="44" rx="24" ry="6" fill="#fff" opacity=".9"/></g>
      <g class="fv-mouettes"><path d="M330 90q6-6 12 0q6-6 12 0M420 70q5-5 10 0q5-5 10 0" stroke="#4a5568" stroke-width="2.200" fill="none" stroke-linecap="round"/></g>
      <!-- Les remparts de la vieille ville -->
      <rect x="-30" y="140" width="470" height="100" fill="#d4b483"/>${pierres}
      ${[...Array(9).keys()].map((k) => `<rect x="${k * 50 - 10}" y="122" width="30" height="22" fill="#d4b483"/>`).join('')}
      <path d="M120 240V196A22 22 0 0 1 164 196V240Z" fill="#7a5a44"/>
      <!-- Le phare -->
      <path d="M690 230L700 120H724L734 230Z" fill="#f4f1ea"/><rect x="700" y="150" width="24" height="12" fill="#c9473f"/><rect x="698" y="190" width="28" height="12" fill="#c9473f"/>
      <rect x="696" y="104" width="32" height="18" fill="#4a5568"/><path d="M692 104H732L712 88Z" fill="#c9473f"/><circle cx="712" cy="113" r="22" fill="#fff6c8" opacity=".5" class="fv-phare"/>
      <rect x="440" y="226" width="360" height="14" fill="#d4b483"/>
      <!-- La mer du port, avec le bateau de Shimon -->
      <rect y="240" width="800" height="100" fill="url(#fvAkMer)"/>
      <g class="fv-vague"><path d="M0 262Q40 256 80 262T160 262T240 262T320 262T400 262T480 262T560 262T640 262T720 262T800 262M0 300Q50 294 100 300T200 300T300 300T400 300T500 300T600 300T700 300T800 300" stroke="#cbe6f5" stroke-width="2" fill="none" opacity=".7"/></g>
      <g class="fv-bateau"><path d="M470 300H700L676 334H494Z" fill="#f4f1ea"/><rect x="470" y="296" width="230" height="8" fill="#3f7ab0"/><path d="M494 318H676" stroke="#3f7ab0" stroke-width="4"/>
        <rect x="560" y="262" width="60" height="34" rx="3" fill="#f4f1ea" stroke="#3f7ab0" stroke-width="3"/><rect x="570" y="270" width="14" height="12" fill="#8fc0e0"/><rect x="594" y="270" width="14" height="12" fill="#8fc0e0"/><path d="M540 296V200" stroke="#6a5a4a" stroke-width="3"/>
        <rect x="640" y="282" width="28" height="16" fill="#9a6a3a" stroke="#6a4228" stroke-width="2"/></g>
      <!-- Le quai et ses marches mouillées -->
      ${dalles}<path d="M0 340H800" stroke="#9a8060" stroke-width="3"/>
      ${[0, 1, 2].map((k) => `<rect x="${720 + k * 14}" y="${340 + k * 30}" width="${80 - k * 14}" height="30" fill="#a8916c"/><path d="M${720 + k * 14} ${341 + k * 30}H800" stroke="#e6f4fb" stroke-width="2" opacity=".7" class="fv-mouille"/>`).join('')}
      <!-- Filets et bouées -->
      <g transform="translate(40 340)"><ellipse cx="30" cy="-12" rx="40" ry="14" fill="#5a8a6a" opacity=".85"/><path d="M-6-14Q30-30 66-14" stroke="#3f6a4a" stroke-width="2" fill="none"/><circle cx="62" cy="-20" r="9" fill="#f2862e"/></g>
      <!-- Les notes de la chanson de Shimon -->
      ${[[255, 200, 0], [275, 170, 1.3], [240, 150, 2.6]].map(([x, y, d]) => `<g class="fv-note" style="animation-delay:-${d}s"><path d="M${x} ${y}V${y - 22}L${x + 12} ${y - 26}V${y - 6}" stroke="#3a4a7a" stroke-width="2.500" fill="none"/><ellipse cx="${x - 4}" cy="${y}" rx="5" ry="4" fill="#3a4a7a"/><ellipse cx="${x + 8}" cy="${y - 5}" rx="5" ry="4" fill="#3a4a7a"/></g>`).join('')}`;
    },

    // L'aqueduc de Césarée : les arches au bord de la mer, la plage
    cesaree: () => {
      const arches = [...Array(8).keys()].map((k) => { const x = 20 + k * 70; return `<path d="M${x} 300V196A27 27 0 0 1 ${x + 54} 196V300H${x + 70}V150H${x - 16}V300Z" fill="${k === 2 ? '#e2c48e' : '#d9b882'}"/>`; }).join('');
      return `<defs>
        <linearGradient id="fvCeCiel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fb8ee"/><stop offset="1" stop-color="#d6eef8"/></linearGradient>
        <linearGradient id="fvCeSable" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2dcae"/><stop offset="1" stop-color="#e2c48e"/></linearGradient>
        <radialGradient id="fvCeHalo"><stop offset="0" stop-color="#fff4c8" stop-opacity=".9"/><stop offset="1" stop-color="#fff4c8" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="800" height="230" fill="url(#fvCeCiel)"/>
      <circle cx="720" cy="60" r="46" fill="url(#fvCeHalo)" class="fv-soleil"/><circle cx="720" cy="60" r="18" fill="#fff5cc"/>
      <g class="fv-nuages"><ellipse cx="300" cy="50" rx="30" ry="8" fill="#fff"/><ellipse cx="318" cy="44" rx="16" ry="8" fill="#fff"/></g>
      <g class="fv-mouettes"><path d="M600 110q6-6 12 0q6-6 12 0M660 90q5-5 10 0q5-5 10 0" stroke="#4a5568" stroke-width="2.200" fill="none" stroke-linecap="round"/></g>
      <!-- La mer -->
      <rect y="200" width="800" height="70" fill="#4fa0cf"/><g class="fv-vague"><path d="M560 230Q600 222 640 230T720 230T800 230M600 252Q640 246 680 252T760 252" stroke="#e6f4fb" stroke-width="3" fill="none"/></g>
      <!-- Le sable -->
      <path d="M0 250Q300 236 560 250Q680 258 800 270V450H0Z" fill="url(#fvCeSable)"/>
      <g class="fv-vague"><path d="M560 252Q640 262 800 272" stroke="#fff" stroke-width="5" fill="none" opacity=".8"/></g>
      <!-- L'aqueduc -->
      <rect x="0" y="136" width="580" height="18" fill="#c9a46e"/>${arches}<path d="M0 300H580" stroke="#b8935e" stroke-width="4"/>
      <g class="fv-brille"><path d="M187 220L190 230L200 233L190 236L187 246L184 236L174 233L184 230Z" fill="#fff6c8"/></g>
      <!-- Coquillages et une serviette de plage -->
      <path d="M640 380Q660 366 680 380Q660 388 640 380Z" fill="#f2a6a6"/><circle cx="720" cy="410" r="6" fill="#fff2e0"/>
      <g transform="translate(700 350) rotate(-8)"><rect x="-50" y="-14" width="100" height="40" rx="4" fill="#4f9fcf"/><path d="M-50-4H50M-50 8H50" stroke="#fff" stroke-width="4"/></g>`;
    },

    // Dans le train pour Be'er Sheva : le paysage défile par la fenêtre
    train: () => {
      const collines = (y, c, k) => `<path d="M-400 ${y}${[...Array(14).keys()].map((i) => `Q${-340 + i * 120} ${y - 30 - ((i * k) % 3) * 12} ${-280 + i * 120} ${y}`).join('')}V260H-400Z" fill="${c}"/>`;
      return `<defs>
        <linearGradient id="fvTrCiel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ec8ef"/><stop offset="1" stop-color="#fbe2b8"/></linearGradient>
        <linearGradient id="fvTrMur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e6ebf0"/><stop offset="1" stop-color="#cdd6de"/></linearGradient>
        <clipPath id="fvTrVitres"><rect x="40" y="70" width="200" height="150" rx="16"/><rect x="300" y="70" width="200" height="150" rx="16"/><rect x="560" y="70" width="200" height="150" rx="16"/></clipPath>
      </defs>
      <rect width="800" height="450" fill="url(#fvTrMur)"/>
      <g clip-path="url(#fvTrVitres)"><rect width="800" height="260" fill="url(#fvTrCiel)"/><circle cx="640" cy="110" r="18" fill="#fff5cc"/>
        <g class="fv-defile">${collines(200, '#e8c48e', 2)}${collines(230, '#d9a868', 1)}<g transform="translate(0 0)">${[...Array(12).keys()].map((i) => `<path d="M${-380 + i * 120} 224V196M${-388 + i * 120} 206Q${-380 + i * 120} 196 ${-372 + i * 120} 206" stroke="#7a9a5a" stroke-width="4" fill="none"/>`).join('')}</g>
          <path d="M-400 236H1200" stroke="#9a8a7a" stroke-width="3"/>${[...Array(30).keys()].map((i) => `<path d="M${-400 + i * 60} 240V246" stroke="#9a8a7a" stroke-width="2"/>`).join('')}</g></g>
      ${[40, 300, 560].map((x) => `<rect x="${x}" y="70" width="200" height="150" rx="16" fill="none" stroke="#9aa5ae" stroke-width="8"/><rect x="${x + 10}" y="76" width="70" height="20" rx="6" fill="#fff" opacity=".25"/>`).join('')}
      <rect y="40" width="800" height="12" fill="#b9c3cb"/><rect x="0" y="30" width="800" height="6" fill="#8a96a0"/>
      <!-- Les poignées et le porte-bagages -->
      ${[120, 380, 640].map((x) => `<path d="M${x} 36V54" stroke="#8a96a0" stroke-width="2"/><circle cx="${x}" cy="62" r="8" fill="none" stroke="#e8a83a" stroke-width="3" class="fv-poignee"/>`).join('')}
      <rect x="300" y="18" width="200" height="14" rx="3" fill="#8a96a0"/><rect x="330" y="2" width="44" height="18" rx="3" fill="#c9673f"/><rect x="390" y="6" width="34" height="14" rx="3" fill="#4f7aa8"/>
      <!-- Les sièges -->
      ${[0, 1, 2, 3].map((k) => `<g transform="translate(${30 + k * 200} 250)"><rect width="150" height="90" rx="14" fill="#3f6a9a"/><rect x="8" y="8" width="134" height="60" rx="10" fill="#4f7ab0"/><rect y="84" width="150" height="20" rx="6" fill="#2f5a88"/></g>`).join('')}
      <rect y="350" width="800" height="100" fill="#8a96a0"/><path d="M0 352H800" stroke="#6a7680" stroke-width="3"/>${[...Array(10).keys()].map((k) => `<path d="M${k * 90} 360L${k * 90 - 40} 450" stroke="#7a868f" stroke-width="2"/>`).join('')}`;
    },

    // Le cratère Ramon au coucher du soleil, et le rocher gravé
    ramon: () => `<defs>
        <linearGradient id="fvRaCiel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a3a7a"/><stop offset=".5" stop-color="#d9788a"/><stop offset="1" stop-color="#f6b46a"/></linearGradient>
        <linearGradient id="fvRaSol" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9784a"/><stop offset="1" stop-color="#9a5a3a"/></linearGradient>
        <radialGradient id="fvRaSoleil"><stop offset="0" stop-color="#fff2b0"/><stop offset=".4" stop-color="#ffb46a" stop-opacity=".7"/><stop offset="1" stop-color="#ff8a5a" stop-opacity="0"/></radialGradient>
        <clipPath id="fvRaHorizon"><rect width="800" height="200"/></clipPath>
      </defs>
      <rect width="800" height="220" fill="url(#fvRaCiel)"/>
      ${[[90, 40], [180, 26], [330, 54], [520, 30], [610, 60], [720, 22]].map(([x, y], k) => `<circle cx="${x}" cy="${y}" r="1.600" fill="#fff" class="fv-etoile" style="animation-delay:-${k * .5}s"/>`).join('')}
      <g clip-path="url(#fvRaHorizon)"><circle cx="300" cy="196" r="80" fill="url(#fvRaSoleil)" class="fv-soleil"/><circle cx="300" cy="200" r="28" fill="#ffe08a" class="fv-couchant"/></g>
      <!-- Les falaises du cratère -->
      <path d="M0 160L60 150L120 164L200 146L280 170L360 156L460 174L560 150L660 166L740 148L800 160V230H0Z" fill="#a8604a"/>
      <path d="M0 200Q200 180 400 196T800 190V260H0Z" fill="#b86a4a"/>
      <path d="M120 230Q260 206 400 214Q560 222 700 236" stroke="#d9925a" stroke-width="3" fill="none" opacity=".6"/>
      <rect y="250" width="800" height="200" fill="url(#fvRaSol)"/>
      ${[[620, 330], [700, 380], [80, 420], [520, 410]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="18" ry="7" fill="#8a4a2a" opacity=".5"/><path d="M${x - 12} ${y}Q${x - 6} ${y - 14} ${x + 4} ${y - 10}Q${x + 14} ${y - 6} ${x + 12} ${y}Z" fill="#a8604a"/>`).join('')}
      <!-- Un bouquetin, au loin -->
      <g transform="translate(560 170)" class="fv-bouquetin"><path d="M0 0H22V-8H0Z" fill="#6a3a2a"/><path d="M2 0V8M20 0V8" stroke="#6a3a2a" stroke-width="3"/><circle cx="24" cy="-10" r="4" fill="#6a3a2a"/><path d="M24-14Q20-26 30-28" stroke="#6a3a2a" stroke-width="2" fill="none"/></g>
      <!-- Le rocher gravé -->
      <g transform="translate(80 350)"><path d="M-70 0Q-80-70-30-96Q20-112 60-84Q90-50 76 0Z" fill="#8a4a32"/><path d="M-60-10Q-66-60-26-84Q10-96 40-80" stroke="#a8604a" stroke-width="6" fill="none" opacity=".6"/>
        <g class="fv-grave"><text x="-26" y="-40" font-family="Frank Ruhl Libre, serif" font-size="30" font-weight="700" fill="#f6d38a">ר</text><text x="18" y="-40" font-family="Frank Ruhl Libre, serif" font-size="30" font-weight="700" fill="#f6d38a">י</text><path d="M-2-52C-8-56-6-62-2-61C-1-61 0-60 0-59C0-60 1-61 2-61C6-62 8-56 2-52L0-50Z" fill="#f6d38a"/><text x="-4" y="-14" text-anchor="middle" font-family="Consolas, monospace" font-size="13" fill="#f6d38a">1961</text></g></g>`,

    // Eilat : le club de plongée au bord de la mer Rouge
    eilat: () => `<defs>
        <linearGradient id="fvEiCiel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fc0f0"/><stop offset="1" stop-color="#d6f0fa"/></linearGradient>
        <linearGradient id="fvEiMer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2fb8c8"/><stop offset="1" stop-color="#1f8aa8"/></linearGradient>
        <linearGradient id="fvEiSable" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4dfb4"/><stop offset="1" stop-color="#e6c48e"/></linearGradient>
        <radialGradient id="fvEiHalo"><stop offset="0" stop-color="#fff4c8" stop-opacity=".9"/><stop offset="1" stop-color="#fff4c8" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="800" height="240" fill="url(#fvEiCiel)"/>
      <circle cx="680" cy="56" r="48" fill="url(#fvEiHalo)" class="fv-soleil"/><circle cx="680" cy="56" r="20" fill="#fff5cc"/>
      <!-- Les montagnes rouges d'Eilat, de l'autre côté du golfe -->
      <path d="M0 170L70 120L130 150L210 96L290 146L360 118L430 156L520 110L600 150L680 124L760 156L800 140V200H0Z" fill="#c9785a"/><path d="M0 186L90 160L180 178L280 156L380 182L480 164L580 184L700 166L800 180V200H0Z" fill="#b8684a"/>
      <rect y="196" width="800" height="110" fill="url(#fvEiMer)"/>
      <g class="fv-vague"><path d="M0 220Q40 214 80 220T160 220T240 220T320 220T400 220T480 220T560 220T640 220T720 220T800 220M0 256Q50 250 100 256T200 256T300 256T400 256T500 256T600 256T700 256T800 256" stroke="#bff0f5" stroke-width="2" fill="none" opacity=".8"/></g>
      <g class="fv-poisson"><path d="M380 270Q396 258 412 270Q396 282 380 270ZM412 270L424 262V278Z" fill="#f2b134"/></g>
      <g class="fv-bateau"><path d="M600 236H690L680 250H610Z" fill="#fff"/><rect x="630" y="222" width="30" height="14" fill="#fff" stroke="#2f8aa8" stroke-width="2"/><path d="M600 234H690" stroke="#e46a92" stroke-width="3"/></g>
      <path d="M0 300Q400 286 800 302V450H0Z" fill="url(#fvEiSable)"/>
      <g class="fv-vague"><path d="M0 302Q400 288 800 304" stroke="#fff" stroke-width="5" fill="none" opacity=".8"/></g>
      <!-- La cabane du club de plongée -->
      <rect x="560" y="200" width="230" height="140" fill="#f4ecdc"/><path d="M548 204H802L790 176H560Z" fill="#2f8aa8"/><path d="M560 176H790" stroke="#fff" stroke-width="3" stroke-dasharray="14 10"/>
      <rect x="590" y="236" width="80" height="60" rx="4" fill="#bfe6f0" stroke="#8a6a4a" stroke-width="4"/><rect x="700" y="236" width="56" height="104" fill="#8a5a36"/><circle cx="746" cy="290" r="3" fill="#e8c27a"/>
      ${[600, 624, 648].map((x) => `<rect x="${x}" y="300" width="18" height="40" rx="9" fill="${x === 624 ? '#e8b44a' : '#e46a5a'}"/><rect x="${x + 5}" y="294" width="8" height="8" fill="#5a5a6a"/>`).join('')}
      <!-- Le drapeau de plongée et le palmier -->
      <path d="M540 340V160" stroke="#8a8a9a" stroke-width="4"/><g class="fv-fanion"><rect x="540" y="160" width="46" height="30" fill="#d64545"/><path d="M540 160L586 190" stroke="#fff" stroke-width="6"/></g>
      <path d="M60 340Q52 270 70 200" stroke="#8a6a46" stroke-width="10" fill="none"/>
      <g class="fv-palme"><path d="M70 200Q36 186 14 204M70 200Q50 172 26 168M70 200Q86 168 112 172M70 200Q104 190 122 210M70 200Q66 176 76 156" stroke="#4f9a5c" stroke-width="7" fill="none" stroke-linecap="round"/></g>`,
  };
  // Ce qui passe devant les personnages (comptoirs, tables)
  const FV_DEVANT = {
    poste: () => `<path d="M40 110H390V330H40Z M168 272H262V330H168Z" fill="#dff0fa" fill-rule="evenodd" opacity=".32"/>
      <path d="M40 110H390V330H40Z" fill="none" stroke="#9fb3c2" stroke-width="5"/><path d="M168 330V272H262V330" fill="none" stroke="#9fb3c2" stroke-width="4"/>
      <path d="M70 140L110 200M90 140L120 185M300 150L340 210" stroke="#fff" stroke-width="3" opacity=".5"/>
      <rect x="28" y="328" width="374" height="14" rx="3" fill="#e8d6b4"/><rect x="40" y="342" width="350" height="108" fill="#c9a77a"/>
      <path d="M156 342V450M272 342V450" stroke="#b08e60" stroke-width="3"/><rect x="60" y="358" width="76" height="56" rx="4" fill="none" stroke="#b08e60" stroke-width="3"/><rect x="176" y="358" width="76" height="56" rx="4" fill="none" stroke="#b08e60" stroke-width="3"/><rect x="292" y="358" width="76" height="56" rx="4" fill="none" stroke="#b08e60" stroke-width="3"/>`,
    salon: () => `<g transform="translate(330 400)"><ellipse cy="-30" rx="80" ry="14" fill="#8a5a36"/><path d="M-60-24V30M60-24V30" stroke="#6a4228" stroke-width="7"/>
        <g transform="translate(-30 -38)"><g class="fv-fumee"><path d="M-3-14q-4-5 0-10t0-10M5-14q-4-5 0-10t0-10" stroke="#fff" stroke-width="2.500" fill="none" stroke-linecap="round"/></g><path d="M-10-12H10L8 0H-8Z" fill="#fffaf2"/><path d="M10-9Q17-9 15-3Q14 0 8-1" stroke="#fffaf2" stroke-width="3" fill="none"/></g>
        <g transform="translate(12 -40)"><path d="M-16-6Q-18-26 0-26Q18-26 16-6Z" fill="#fffaf2"/><path d="M16-18Q28-22 26-10" stroke="#fffaf2" stroke-width="4" fill="none"/><circle cy="-29" r="4" fill="#fffaf2"/><path d="M-12-14H12" stroke="#7fb3d9" stroke-width="3"/></g>
        <g transform="translate(46 -38)"><ellipse rx="16" ry="5" fill="#fffaf2"/><circle cx="-6" cy="-4" r="5" fill="#d98e3e"/><circle cx="5" cy="-4" r="5" fill="#c9782e"/></g></g>`,
    port: () => `<g transform="translate(205 380)"><ellipse cx="0" cy="-36" rx="70" ry="13" fill="#f4efe6" stroke="#c9b48a" stroke-width="2"/><path d="M-4-30V40M4-30V40" stroke="#6a5a4a" stroke-width="4"/><path d="M-30 40H30" stroke="#6a5a4a" stroke-width="5" stroke-linecap="round"/>
        <g transform="translate(-26 -40)"><g class="fv-fumee"><path d="M-4-14q-4-5 0-10t0-10M4-14q-4-5 0-10t0-10" stroke="#fff" stroke-width="2.500" fill="none" stroke-linecap="round"/></g><path d="M-10-12H10L8 0H-8Z" fill="#fffaf2"/><path d="M10-9Q17-9 15-3Q14 0 8-1" stroke="#fffaf2" stroke-width="3" fill="none"/></g>
        <g transform="translate(24 -40)"><path d="M-10-12H10L8 0H-8Z" fill="#fffaf2"/><path d="M-9-10H9L8-6H-8Z" fill="#6b4530"/></g></g>
      <g transform="translate(320 450)"><path d="M-30-80H30V-70H-30Z" fill="#8a6a4a"/><path d="M-26-70V0M26-70V0" stroke="#8a6a4a" stroke-width="5"/><path d="M-30-130V-80M30-130V-80" stroke="#8a6a4a" stroke-width="5"/><path d="M-30-126H30M-30-104H30" stroke="#8a6a4a" stroke-width="4"/></g>`,
    bibliotheque: () => `<rect x="80" y="350" width="290" height="14" rx="3" fill="#8a5a36"/><rect x="90" y="364" width="270" height="86" fill="#a8744a"/><rect x="108" y="378" width="234" height="58" rx="4" fill="none" stroke="#8a5a36" stroke-width="3"/>
      <g transform="translate(104 350)"><circle cy="-34" r="24" fill="#fff0c4" opacity=".3" class="fv-lueur"/><path d="M-4 0V-30" stroke="#c9a04a" stroke-width="4"/><path d="M-22-30Q-4-50 14-30Z" fill="#2f7a4a"/><ellipse cy="0" rx="14" ry="4" fill="#c9a04a"/></g>
      <g transform="translate(326 350)"><rect x="-8" y="-12" width="16" height="12" fill="#5a5a6a"/><rect x="-44" y="-74" width="88" height="62" rx="4" fill="#3a3a4a"/><rect x="-38" y="-68" width="76" height="50" rx="2" fill="#8fc0e8" class="fv-ecran-pc"/><path d="M-30-56H24M-30-46H14M-30-36H20" stroke="#fff" stroke-width="3" opacity=".7"/></g>`,
    boulangerie: () => `<rect x="40" y="296" width="340" height="12" rx="3" fill="#e8d6b4"/>
      <rect x="44" y="308" width="332" height="56" fill="#e6f3f8" opacity=".55"/><path d="M44 308H376V364H44Z" fill="none" stroke="#b9cfd9" stroke-width="3"/>
      ${[[80, 344], [140, 340], [200, 344], [260, 340], [320, 344]].map(([x, y], k) => (k % 2 ? `<g transform="translate(${x} ${y})"><circle r="11" fill="#d98e3e"/><path d="M0 0m-7 0a7 7 0 1 0 7-7a4 4 0 1 0 4 4" fill="none" stroke="#8a4a1a" stroke-width="2"/></g>` : `<g transform="translate(${x} ${y})">${[-12, -4, 4, 12].map((d, j) => `<ellipse cx="${d}" cy="${j % 2 ? -2 : 0}" rx="6" ry="6" fill="${j % 2 ? '#c9782e' : '#d98e3e'}"/>`).join('')}</g>`)).join('')}
      <path d="M60 314L90 352M200 314L222 344" stroke="#fff" stroke-width="3" opacity=".6"/>
      <rect x="40" y="364" width="340" height="86" fill="#a8744a"/><path d="M40 380H380" stroke="#8a5a36" stroke-width="3"/>${[0, 1, 2, 3].map((k) => `<rect x="${58 + k * 82}" y="392" width="64" height="44" rx="4" fill="none" stroke="#8a5a36" stroke-width="3"/>`).join('')}`,
    jaffa: () => `<rect x="70" y="318" width="232" height="10" rx="3" fill="#6a4a30"/><path d="M76 328H296V408H76Z" fill="#8a3a3a"/><path d="M76 408${[...Array(22).keys()].map((k) => `L${81 + k * 10} 416L${86 + k * 10} 408`).join('')}" fill="#8a3a3a"/>
      <path d="M90 344H282M90 392H282" stroke="#e8c27a" stroke-width="3"/>
      <g transform="translate(108 318)"><rect x="-16" y="-12" width="44" height="12" rx="6" fill="#efe0bd" transform="rotate(-8)"/><rect x="-10" y="-22" width="40" height="11" rx="5.500" fill="#e4d2a8" transform="rotate(6)"/></g>
      <g transform="translate(176 318)"><circle cy="-11" r="11" fill="#c9a04a" stroke="#7a5a2a" stroke-width="2"/><path d="M0-19L3-11L0-3L-3-11Z" fill="#b8483e"/></g>
      <g transform="translate(238 318)"><path d="M-14 0Q-18-16 0-18Q18-16 14 0Z" fill="#9a6a3a"/><path d="M14-10Q26-14 26-4" stroke="#9a6a3a" stroke-width="4" fill="none"/><circle cy="-20" r="3" fill="#9a6a3a"/></g>`,
  };

  /* ---------- Le gros plan sur les objets (180 × 150) ---------- */
  const enveloppe = (ouverte) => `<rect x="25" y="38" width="130" height="80" rx="4" fill="#ecd7a6" stroke="#b39257" stroke-width="2"/>
    <circle cx="48" cy="100" r="9" fill="#d9bd85" opacity=".6"/><circle cx="130" cy="58" r="6" fill="#d9bd85" opacity=".5"/>
    ${ouverte ? '<path d="M25 38L90 4L155 38Z" fill="#e3cb93" stroke="#b39257" stroke-width="2"/><rect x="40" y="16" width="100" height="40" rx="2" fill="#fbf6ea" stroke="#d6c8a8"/><path d="M50 28H128M50 36H120M50 44H110" stroke="#8a90c0" stroke-width="1.500"/>'
      : '<path d="M25 38L90 82L155 38" fill="none" stroke="#b39257" stroke-width="2"/>'}
    <rect x="130" y="44" width="18" height="22" rx="1" fill="#d98a8a" stroke="#fff" stroke-width="2"/>`;


  // La carte de Yossef : la côte d'Israël et ses marques (n = la marque mise en avant)
  const carteMarin = (n) => `<rect x="12" y="8" width="156" height="134" rx="4" fill="#f0e2bd" stroke="#b39257" stroke-width="2"/>
      <path d="M12 8H70Q64 40 60 70Q56 100 50 142H12Z" fill="#a9d4ee" opacity=".7"/>
      <path d="M70 8Q64 40 60 70Q56 100 50 142" stroke="#8a6a3a" stroke-width="2.500" fill="none"/>
      <path d="M78 20Q90 40 84 60Q96 80 110 100Q120 120 118 134" stroke="#8a6a3a" stroke-width="1.500" stroke-dasharray="4 4" fill="none"/>
      ${[[74, 22, 'עַכּוֹ'], [66, 54, 'קֵיסָרְיָה'], [112, 100, 'מַכְתֵּשׁ'], [118, 132, 'אֵילַת']].map(([x, y, nom], k) => `<path d="M${x - 5} ${y - 5}L${x + 5} ${y + 5}M${x + 5} ${y - 5}L${x - 5} ${y + 5}" stroke="#c9473f" stroke-width="3" stroke-linecap="round"/><text x="${x + 10}" y="${y + 4}" font-family="Frank Ruhl Libre, serif" font-size="10" fill="#5a3a1a">${nom}</text>${k === n ? `<circle cx="${x}" cy="${y}" r="11" fill="none" stroke="#c9473f" stroke-width="2" class="fv-brille"/>` : ''}`).join('')}
      <g transform="translate(36 116)"><circle r="12" fill="#fffaf0" stroke="#8a6a3a"/><path d="M0-12L3 0L0 12L-3 0Z" fill="#b8483e"/></g>`;
  // Une horloge qui montre une heure précise (le soleil pour le matin)
  const horlogeSvg = (h, m, soleil) => {
    const pt = (deg, r) => [(90 + r * Math.sin(deg * Math.PI / 180)).toFixed(1), (75 - r * Math.cos(deg * Math.PI / 180)).toFixed(1)];
    const [hx, hy] = pt(((h % 12) + m / 60) * 30, 30), [mx, my] = pt(m * 6, 42);
    return `<circle cx="90" cy="75" r="58" fill="#fffaf0" stroke="#7a5a34" stroke-width="6"/>${[...Array(12).keys()].map((k) => { const [x, y] = pt(k * 30, 48); return `<circle cx="${x}" cy="${y}" r="${k % 3 ? 2 : 3.500}" fill="#5a4a3e"/>`; }).join('')}
      <path d="M90 75L${hx} ${hy}" stroke="#2b2230" stroke-width="5" stroke-linecap="round"/><path d="M90 75L${mx} ${my}" stroke="#2b2230" stroke-width="3.500" stroke-linecap="round"/><circle cx="90" cy="75" r="5" fill="#b8483e"/>
      ${soleil ? '<g transform="translate(150 24)"><circle r="12" fill="#ffd56a"/><path d="M0-20V-15M0 15V20M-20 0H-15M15 0H20M-14-14L-11-11M11 11L14 14M-14 14L-11 11M11-11L14-14" stroke="#f2b84b" stroke-width="2.500" stroke-linecap="round"/></g>' : '<g class="fv-clignote"><path d="M150 18L158 30H142Z" fill="#e46a92"/><rect x="149" y="22" width="2" height="5" fill="#fff"/></g>'}`;
  };  const PLANS = {
    env: () => enveloppe(false),
    'env-date': () => `${enveloppe(false)}<text x="34" y="111" class="fv-main">1962</text>`,
    'env-nom': () => `${enveloppe(false)}<text x="34" y="111" class="fv-main">1962</text><text x="108" y="102" class="fv-main he" direction="rtl" text-anchor="end">לְיוֹסֵף</text>`,
    'env-ouverte': () => enveloppe(true),
    'photo-cle': () => `<g transform="rotate(-7 70 75)"><rect x="14" y="20" width="104" height="112" rx="3" fill="#fbf7ee" stroke="#d6cbb4" stroke-width="2"/>
        <rect x="22" y="28" width="88" height="80" fill="#bcd9e8"/><rect x="22" y="80" width="88" height="28" fill="#6fa9c9"/><path d="M22 84Q44 78 66 84T110 82" stroke="#e6f3f8" stroke-width="2" fill="none"/>
        <circle cx="66" cy="62" r="8" fill="#f0c9a8"/><path d="M58 60Q60 48 66 50Q74 48 74 60Q72 54 66 54Q60 54 58 60Z" fill="#5a3a2c"/><path d="M56 104Q58 74 66 72Q74 74 76 104Z" fill="#f4f1ea"/><path d="M63 64Q66 67 69 64" stroke="#b05060" stroke-width="1.300" fill="none"/></g>
      <g transform="translate(138 92) rotate(28)" class="fv-cle"><circle r="12" fill="none" stroke="#e2b54a" stroke-width="5"/><path d="M12 0H40M30 0V8M36 0V6" stroke="#e2b54a" stroke-width="5" stroke-linecap="round"/></g>
      <g class="fv-brille"><path d="M156 60L159 68L167 71L159 74L156 82L153 74L145 71L153 68Z" fill="#fff6c8"/><path d="M126 112L128 117L133 119L128 121L126 126L124 121L119 119L124 117Z" fill="#fff6c8"/></g>`,
    // Épisode 2
    bateau: () => `<rect x="10" y="10" width="160" height="130" rx="10" fill="#cfe7f5"/><circle cx="140" cy="38" r="12" fill="#ffe9a8"/>
      <rect x="10" y="92" width="160" height="48" fill="#5fa6cf"/><g class="fv-vague"><path d="M10 100Q30 94 50 100T90 100T130 100T170 100" stroke="#e6f4fb" stroke-width="3" fill="none"/></g>
      <g class="fv-tangue"><path d="M46 92H134L120 112H58Z" fill="#3b4a6a"/><rect x="62" y="74" width="46" height="18" fill="#f4f1ea"/><rect x="68" y="78" width="8" height="8" fill="#8fc0e0"/><rect x="82" y="78" width="8" height="8" fill="#8fc0e0"/><rect x="96" y="78" width="8" height="8" fill="#8fc0e0"/><rect x="84" y="56" width="10" height="18" fill="#c9473f"/><path d="M89 52q-6-8 2-14q8-6 2-14" stroke="#b9c2ca" stroke-width="3" fill="none" class="fv-fumee"/></g>`,
    album: () => `<rect x="34" y="18" width="112" height="116" rx="6" fill="#6a3a2a"/><rect x="40" y="24" width="100" height="104" rx="4" fill="none" stroke="#d9b06a" stroke-width="2"/>
      <path d="M34 18L48 18L34 32Z M146 18L132 18L146 32Z M34 134L48 134L34 120Z M146 134L132 134L146 120Z" fill="#d9b06a"/><rect x="62" y="58" width="56" height="34" rx="3" fill="#f2e6c8"/><path d="M72 70H108M76 80H104" stroke="#8a6a3a" stroke-width="2"/>`,
    'album-photo': () => `<rect x="8" y="18" width="164" height="116" rx="5" fill="#f4ecd8" stroke="#c9b48a" stroke-width="2"/><path d="M90 18V134" stroke="#c9b48a" stroke-width="2"/>
      <g transform="rotate(-3 48 70)"><rect x="18" y="30" width="62" height="76" fill="#fff" stroke="#ddd2b8"/><rect x="23" y="35" width="52" height="58" fill="#d9cfbd"/>
        <circle cx="40" cy="54" r="7" fill="#f0c9a8"/><path d="M33 52Q35 42 40 44Q46 42 47 52Q45 47 40 47Q35 47 33 52Z" fill="#5a3a2c"/><path d="M31 93Q32 66 40 63Q48 66 50 93Z" fill="#fff"/><path d="M34 46Q40 36 47 46" stroke="#fff" stroke-width="3" fill="none"/>
        <circle cx="60" cy="54" r="7" fill="#e8bd98"/><path d="M53 50Q60 42 67 50Z" fill="#2b2230"/><path d="M52 93Q53 66 60 63Q67 66 68 93Z" fill="#2f3550"/></g>
      <path d="M22 116H76M28 124H70" stroke="#8a90c0" stroke-width="1.600"/>
      <g transform="rotate(4 132 70)"><rect x="102" y="34" width="58" height="48" fill="#fff" stroke="#ddd2b8"/><rect x="107" y="39" width="48" height="34" fill="#bcd9e8"/><rect x="107" y="60" width="48" height="13" fill="#6fa9c9"/></g>
      <path d="M106 100H156M110 108H150" stroke="#8a90c0" stroke-width="1.600"/>`,
    // Épisode 3
    ticket: () => `<g transform="rotate(-6 90 75)"><path d="M50 20H130V130L120 124L110 130L100 124L90 130L80 124L70 130L60 124L50 130Z" fill="#fffdf6" stroke="#d6cdb8" stroke-width="2"/>
      <rect x="60" y="30" width="60" height="14" rx="3" fill="#d64545"/><text x="90" y="92" text-anchor="middle" font-family="Consolas, monospace" font-size="38" font-weight="700" fill="#2b2230">38</text><path d="M64 104H116" stroke="#c9c0ac" stroke-width="2"/></g>`,
    'cle-112': () => `<g transform="translate(70 70) rotate(-20)" class="fv-tangue"><circle r="20" fill="none" stroke="#c9a04a" stroke-width="7"/><path d="M20 0H70M54 0V12M64 0V9" stroke="#c9a04a" stroke-width="7" stroke-linecap="round"/></g>
      <path d="M60 60L48 92" stroke="#b9a07a" stroke-width="2"/><rect x="22" y="90" width="58" height="34" rx="5" fill="#fff6dc" stroke="#c9b48a" stroke-width="2"/><text x="51" y="114" text-anchor="middle" font-family="Consolas, monospace" font-size="20" font-weight="700" fill="#3f4f96">112</text>`,
    recu: () => `<rect x="36" y="14" width="108" height="124" rx="4" fill="#fffdf6" stroke="#d6cdb8" stroke-width="2"/><rect x="36" y="14" width="108" height="20" rx="4" fill="#d64545"/>
      ${[0, 1, 2, 3, 4].map((k) => `<text x="48" y="${54 + k * 18}" font-family="Consolas, monospace" font-size="11" fill="#5a5a6a">${2022 + k}</text><path d="M84 ${50 + k * 18}H112" stroke="#c9c0ac" stroke-width="2"/><path d="M120 ${48 + k * 18}L124 ${53 + k * 18}L132 ${43 + k * 18}" stroke="#3fae7a" stroke-width="2.500" fill="none"/>`).join('')}`,
    'boite-112': () => `<rect x="30" y="16" width="120" height="118" rx="6" fill="#8a6234"/><rect x="44" y="30" width="92" height="90" rx="3" fill="#2e2219"/>
      <g transform="rotate(-8 90 80)"><rect x="56" y="52" width="70" height="46" rx="2" fill="#fbf6ea"/><rect x="104" y="58" width="16" height="18" fill="#7fb3d9"/></g>
      <path d="M44 30L14 40V128L44 120Z" fill="#e0b86e" stroke="#a8823e" stroke-width="2"/><text x="28" y="80" text-anchor="middle" font-family="Consolas, monospace" font-size="11" font-weight="700" fill="#5a3a1a" transform="rotate(-90 28 80)">112</text>
      <g class="fv-brille"><path d="M150 26L153 34L161 37L153 40L150 48L147 40L139 37L147 34Z" fill="#fff6c8"/></g>`,
    // Épisodes 3 et 4 : la carte postale de la tour de l'Horloge
    'carte-postale': () => `<g transform="rotate(-4 90 75)"><rect x="14" y="24" width="152" height="104" rx="4" fill="#fffdf6" stroke="#d6cdb8" stroke-width="2"/>
      <rect x="22" y="32" width="84" height="88" fill="#a9d4ee"/><rect x="22" y="100" width="84" height="20" fill="#dcc6a2"/>
      <rect x="54" y="48" width="22" height="58" fill="#e6c48c"/><rect x="50" y="44" width="30" height="6" fill="#c9a065"/><path d="M54 44H76L65 36Z" fill="#c9a065"/><circle cx="65" cy="60" r="6" fill="#fff" stroke="#7a5a34" stroke-width="1.500"/>
      <rect x="132" y="32" width="26" height="30" fill="#e88a9a" stroke="#fff" stroke-width="2"/><circle cx="130" cy="58" r="13" fill="none" stroke="#5a5a8a" stroke-width="1.500" opacity=".7"/>
      <path d="M114 78H158M114 90H152M114 102H156" stroke="#8a90c0" stroke-width="1.600"/></g>`,
    // Épisode 4
    cartes: () => `<g transform="rotate(-5 90 75)"><rect x="20" y="30" width="120" height="90" fill="#f0e2bd" stroke="#c9b48a" stroke-width="2"/>
      <path d="M40 110Q50 80 44 60Q60 44 80 50Q96 40 104 60Q120 74 108 96Q90 112 70 104Q54 116 40 110Z" fill="#d9c08a" stroke="#a88c5a" stroke-width="1.500"/>
      <path d="M30 40Q60 50 90 42T138 46" stroke="#8fb8d6" stroke-width="2" fill="none" stroke-dasharray="4 3"/>
      <g transform="translate(118 92)"><circle r="12" fill="#fffaf0" stroke="#8a6a3a"/><path d="M0-12L3 0L0 12L-3 0Z" fill="#b8483e"/></g></g>
      <rect x="128" y="18" width="16" height="120" rx="8" fill="#e8d6aa" stroke="#c9b48a" transform="rotate(12 136 78)"/>`,
    cafe: () => `<rect x="10" y="10" width="160" height="130" rx="10" fill="#cfe7f5"/><rect x="10" y="74" width="160" height="66" fill="#5fa6cf"/><path d="M10 82Q40 76 70 82T130 82T170 82" stroke="#e6f4fb" stroke-width="2" fill="none"/>
      <rect x="10" y="108" width="160" height="32" fill="#c9a77a"/>
      <g transform="translate(90 106)"><g class="fv-fumee"><path d="M-8-30q-6-8 0-16t0-16M8-30q-6-8 0-16t0-16" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".85"/></g>
        <path d="M-22-26H22L18 0H-18Z" fill="#fffaf2"/><path d="M-20-22H20L19-16H-19Z" fill="#6b4530"/><path d="M22-20Q36-20 32-8Q30-2 19-4" stroke="#fffaf2" stroke-width="5" fill="none"/><ellipse cy="2" rx="32" ry="6" fill="#fffaf2"/></g>`,
    // Épisode 12
    billet: () => `<g transform="rotate(-5 90 75)"><rect x="20" y="36" width="140" height="78" rx="6" fill="#fffdf6" stroke="#d6cdb8" stroke-width="2"/><rect x="20" y="36" width="140" height="20" rx="6" fill="#4f7aa8"/>
      <text x="90" y="86" text-anchor="middle" font-family="Frank Ruhl Libre, serif" font-size="18" font-weight="700" fill="#2b2230" direction="rtl">בְּאֵר שֶׁבַע</text>
      <path d="M32 100H76M104 100H148" stroke="#c9c0ac" stroke-width="2"/><path d="M120 46H148" stroke="#fff" stroke-width="3"/><circle cx="20" cy="85" r="7" fill="#cdd6de"/><circle cx="160" cy="85" r="7" fill="#cdd6de"/></g>`,
    'badge-nature': () => `<path d="M90 14L146 34V80Q146 118 90 138Q34 118 34 80V34Z" fill="#3f7a52" stroke="#2a5a3a" stroke-width="4"/><path d="M90 26L134 42V80Q134 110 90 126Q46 110 46 80V42Z" fill="#5c9c6a"/>
      <g transform="translate(90 84)"><path d="M-22 10H18V0H-22Z" fill="#f2dcae"/><path d="M-18 10V24M14 10V24" stroke="#f2dcae" stroke-width="4"/><circle cx="22" cy="-6" r="7" fill="#f2dcae"/><path d="M22-12Q14-36 32-40M26-12Q24-30 38-32" stroke="#f2dcae" stroke-width="3" fill="none"/></g>`,
    'rocher-lettres': () => `<rect x="10" y="10" width="160" height="130" rx="10" fill="#f0b07a"/><path d="M14 140Q20 70 70 48Q120 34 152 70Q168 100 166 140Z" fill="#9a5a3a"/>
      <g class="fv-grave"><text x="62" y="100" font-family="Frank Ruhl Libre, serif" font-size="34" font-weight="700" fill="#f6d38a">ר</text><text x="110" y="100" font-family="Frank Ruhl Libre, serif" font-size="34" font-weight="700" fill="#f6d38a">י</text>
      <path d="M95 84C88 79 90 72 94 73C95.500 73.300 96 74.500 96 75.500C96 74.500 96.500 73.300 98 73C102 72 104 79 97 84L96 86Z" fill="#f6d38a"/><text x="96" y="126" text-anchor="middle" font-family="Consolas, monospace" font-size="15" fill="#f6d38a">1961</text></g>`,
    lune: () => `<rect x="10" y="10" width="160" height="130" rx="10" fill="#2d2768"/>${[[40, 34], [70, 60], [140, 30], [126, 100], [36, 110], [100, 40]].map(([x, y], k) => `<circle cx="${x}" cy="${y}" r="2" fill="#fff" class="fv-etoile" style="animation-delay:-${k * .4}s"/>`).join('')}
      <path d="M104 46a30 30 0 1 0 22 52a24 24 0 1 1-22-52z" fill="#f8efc9"/><text x="58" y="100" font-family="Consolas, monospace" font-size="16" font-weight="700" fill="#cfc4e6">z</text><text x="70" y="84" font-family="Consolas, monospace" font-size="20" font-weight="700" fill="#cfc4e6">z</text>`,
    desert: () => `<rect x="10" y="10" width="160" height="130" rx="10" fill="#bfe2f6"/><circle cx="136" cy="40" r="16" fill="#ffe08a"/>
      <path d="M10 100Q50 70 90 96Q130 72 170 90V140H10Z" fill="#e8c48e"/><path d="M10 120Q60 100 110 118Q140 108 170 116V140H10Z" fill="#d9a868"/>
      <g transform="translate(46 100)"><path d="M0 0V-26M0-14Q-10-14-10-22M0-18Q8-18 8-26" stroke="#5c8a4a" stroke-width="5" fill="none" stroke-linecap="round"/></g>`,
    // Épisode 13
    'soleil-bas': () => `<rect x="10" y="10" width="160" height="130" rx="10" fill="#f6b46a"/><circle cx="90" cy="96" r="26" fill="#ffe08a" class="fv-couchant"/><rect x="10" y="96" width="160" height="44" fill="#a8604a"/>
      <path d="M90 30V48M74 40L80 52M106 40L100 52" stroke="#c9473f" stroke-width="4" stroke-linecap="round"/><path d="M82 52L90 62L98 52" stroke="#c9473f" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    gourde: () => `<rect x="62" y="24" width="56" height="106" rx="20" fill="#4f9fcf"/><rect x="74" y="12" width="32" height="18" rx="6" fill="#2f5a88"/><rect x="70" y="56" width="40" height="40" rx="8" fill="#e8f4fa" opacity=".6"/>
      <path d="M78 66q6-8 12 0t12 0" stroke="#4f9fcf" stroke-width="3" fill="none"/><g class="fv-fumee"><path d="M130 50q6 6 0 12" stroke="#7fc0e8" stroke-width="3" fill="none"/></g>`,
    trou: () => `<rect x="10" y="10" width="160" height="130" rx="10" fill="#c9784a"/><path d="M10 10H170V70Q90 50 10 70Z" fill="#9a5a3a"/><ellipse cx="90" cy="96" rx="44" ry="20" fill="#2a1a12"/>
      <path d="M134 40Q110 70 100 92" stroke="#f0c9a8" stroke-width="18" stroke-linecap="round"/><g class="fv-brille"><path d="M74 96L77 104L85 107L77 110L74 118L71 110L63 107L71 104Z" fill="#fff6c8"/></g>`,
    bague: () => `<rect x="10" y="10" width="160" height="130" rx="10" fill="#4a3a6a"/><g class="fv-brille"><path d="M140 30L143 38L151 41L143 44L140 52L137 44L129 41L137 38Z" fill="#fff6c8"/><path d="M40 110L42 115L47 117L42 119L40 124L38 119L33 117L38 115Z" fill="#fff6c8"/></g>
      <ellipse cx="90" cy="84" rx="40" ry="36" fill="none" stroke="#d6dde6" stroke-width="10"/><ellipse cx="90" cy="84" rx="40" ry="36" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>
      <text x="90" y="92" text-anchor="middle" font-family="Frank Ruhl Libre, serif" font-size="22" font-weight="700" fill="#d6dde6">ר</text>`,
    // Épisode 14
    masque: () => `<rect x="10" y="10" width="160" height="130" rx="10" fill="#bff0f5"/><g class="fv-tangue"><rect x="36" y="56" width="98" height="48" rx="22" fill="#2f8aa8"/><rect x="44" y="62" width="38" height="36" rx="14" fill="#dff6fa"/><rect x="88" y="62" width="38" height="36" rx="14" fill="#dff6fa"/>
      <path d="M134 70Q156 60 150 30" stroke="#e8b44a" stroke-width="8" fill="none" stroke-linecap="round"/></g>${[[50, 120], [70, 112], [120, 124]].map(([x, y], k) => `<circle cx="${x}" cy="${y}" r="${4 + k}" fill="none" stroke="#fff" stroke-width="2" class="fv-bulle" style="animation-delay:-${k * .7}s"/>`).join('')}`,
    'photo-plongee': () => `<g transform="rotate(-4 90 75)"><rect x="24" y="14" width="132" height="122" fill="#fbf7ee" stroke="#d6cbb4" stroke-width="2"/><rect x="32" y="22" width="116" height="90" fill="#3fa8c0"/>
      <path d="M40 92Q70 80 100 100L140 70" stroke="#2f8aa8" stroke-width="10" fill="none"/>${[[60, 50], [96, 62]].map(([x, y]) => `<g transform="translate(${x} ${y}) rotate(-20)"><ellipse rx="16" ry="7" fill="#2b2230"/><circle cx="16" cy="0" r="7" fill="#e8c8a8"/><rect x="18" y="-5" width="8" height="6" rx="2" fill="#dff6fa"/><path d="M-16 0L-28-6M-16 2L-28 8" stroke="#e8b44a" stroke-width="4"/></g>`).join('')}
      <circle cx="120" cy="40" r="3" fill="none" stroke="#fff" stroke-width="1.500"/><circle cx="126" cy="32" r="2" fill="none" stroke="#fff" stroke-width="1.500"/></g>`,
    'armoire-cadenas': () => `<rect x="40" y="12" width="100" height="128" rx="4" fill="#8a5a36" stroke="#5a3a20" stroke-width="3"/><path d="M90 12V140" stroke="#5a3a20" stroke-width="3"/>
      <circle cx="84" cy="76" r="3" fill="#e8c27a"/><circle cx="96" cy="76" r="3" fill="#e8c27a"/><g transform="translate(90 92)"><path d="M-10-10V-20A10 10 0 0 1 10-20V-10" stroke="#9aa5ae" stroke-width="5" fill="none"/><rect x="-16" y="-12" width="32" height="28" rx="4" fill="#c9a04a"/><circle cy="2" r="4" fill="#5a3a20"/></g>`,
    'cadenas-1961': () => `<g transform="translate(90 80)"><path d="M-30-24V-46A30 30 0 0 1 30-46V-24" stroke="#9aa5ae" stroke-width="9" fill="none"/><rect x="-50" y="-28" width="100" height="74" rx="10" fill="#c9a04a" stroke="#8a6a2a" stroke-width="3"/>
      ${[0, 1, 2, 3].map((k) => `<rect x="${-42 + k * 22}" y="-6" width="18" height="30" rx="3" fill="#2b2230"/><text x="${-33 + k * 22}" y="16" text-anchor="middle" font-family="Consolas, monospace" font-size="18" font-weight="700" fill="#f6d38a">${'1961'[k]}</text>`).join('')}</g>
      <g class="fv-brille"><path d="M150 26L153 34L161 37L153 40L150 48L147 40L139 37L147 34Z" fill="#fff6c8"/></g>`,
    enveloppes: () => `${[...Array(9).keys()].map((k) => { const x = 20 + (k % 3) * 46 + (k > 5 ? 10 : 0), y = 20 + Math.floor(k / 3) * 38, r = ((k * 37) % 17) - 8; return `<g transform="rotate(${r} ${x + 28} ${y + 18})"><rect x="${x}" y="${y}" width="56" height="36" rx="2" fill="${['#ecd7a6', '#f2e2bc', '#e6cf98'][k % 3]}" stroke="#b39257"/><path d="M${x} ${y}L${x + 28} ${y + 20}L${x + 56} ${y}" stroke="#b39257" fill="none"/><rect x="${x + 42}" y="${y + 4}" width="10" height="12" fill="#d98a8a"/></g>`; }).join('')}`,
    // Épisode 9
    cadeau: () => `<rect x="44" y="60" width="92" height="72" rx="4" fill="#4f9fcf"/><rect x="36" y="46" width="108" height="20" rx="4" fill="#5fb0df"/><rect x="82" y="46" width="16" height="86" fill="#f2b134"/>
      <path d="M90 46Q66 20 58 36Q56 48 90 46Q114 20 122 36Q124 48 90 46Z" fill="#f2b134" stroke="#d9952a" stroke-width="2"/>
      <g class="fv-brille"><path d="M150 30L153 38L161 41L153 44L150 52L147 44L139 41L147 38Z" fill="#fff6c8"/><path d="M28 100L30 105L35 107L30 109L28 114L26 109L21 107L26 105Z" fill="#fff6c8"/></g>`,
    'carte-marin': () => carteMarin(-1),
    'carte-akko': () => carteMarin(0),
    // Épisode 10
    notes: () => `<rect x="10" y="10" width="160" height="130" rx="10" fill="#e8f2fa"/>${[[50, 100, 0], [92, 76, .6], [134, 104, 1.2]].map(([x, y, d]) => `<g class="fv-note" style="animation-delay:-${d}s"><path d="M${x} ${y}V${y - 40}L${x + 22} ${y - 46}V${y - 10}" stroke="#3a4a7a" stroke-width="4" fill="none"/><ellipse cx="${x - 7}" cy="${y}" rx="9" ry="7" fill="#3a4a7a"/><ellipse cx="${x + 15}" cy="${y - 10}" rx="9" ry="7" fill="#3a4a7a"/></g>`).join('')}`,
    'photo-amis': () => `<g transform="rotate(-4 90 75)"><rect x="24" y="14" width="132" height="122" fill="#fbf7ee" stroke="#d6cbb4" stroke-width="2"/><rect x="32" y="22" width="116" height="90" fill="#c9bfa8"/><rect x="32" y="80" width="116" height="32" fill="#8a9aa8"/>
      ${[[70, '#2c211d', '#3a4a6a'], [110, '#4a3a2a', '#e8e0d0']].map(([x, ch, ha]) => `<circle cx="${x}" cy="54" r="10" fill="#e0b090"/><path d="M${x - 10} 50Q${x} 38 ${x + 10} 50Z" fill="${ch}"/><path d="M${x - 14} 112Q${x - 14} 70 ${x} 66Q${x + 14} 70 ${x + 14} 112Z" fill="${ha}"/>`).join('')}
      <path d="M84 84L96 80" stroke="#e0b090" stroke-width="5" stroke-linecap="round"/><path d="M40 124H140" stroke="#8a90c0" stroke-width="1.600"/></g>`,
    caisse: () => `<rect x="34" y="50" width="112" height="76" rx="4" fill="#a8744a" stroke="#6a4228" stroke-width="3"/><path d="M34 74H146M34 100H146" stroke="#6a4228" stroke-width="2"/><path d="M40 56L140 120M140 56L40 120" stroke="#8a5a36" stroke-width="2" opacity=".5"/>
      <rect x="80" y="40" width="20" height="14" rx="3" fill="#c9a04a" stroke="#8a6a2a" stroke-width="2"/><rect x="82" y="80" width="16" height="20" rx="3" fill="#c9a04a" stroke="#8a6a2a" stroke-width="2"/><circle cx="90" cy="88" r="2.500" fill="#4a3a2a"/>
      <g class="fv-vague"><path d="M14 136Q40 130 66 136T118 136T170 136" stroke="#7fbfe0" stroke-width="3" fill="none"/></g>`,
    'caisse-cle': () => `<rect x="20" y="58" width="112" height="76" rx="4" fill="#a8744a" stroke="#6a4228" stroke-width="3"/><path d="M20 82H132M20 108H132" stroke="#6a4228" stroke-width="2"/>
      <rect x="68" y="88" width="16" height="20" rx="3" fill="#c9a04a" stroke="#8a6a2a" stroke-width="2"/><circle cx="76" cy="96" r="2.500" fill="#4a3a2a"/>
      <g transform="translate(118 72) rotate(-30)" class="fv-tangue"><circle r="11" fill="none" stroke="#e2b54a" stroke-width="5"/><path d="M11 0H36M28 0V7M33 0V5" stroke="#e2b54a" stroke-width="5" stroke-linecap="round"/></g>
      <g class="fv-brille"><path d="M150 30L153 38L161 41L153 44L150 52L147 44L139 41L147 38Z" fill="#fff6c8"/></g>`,
    'boussole-cesaree': () => `<g transform="translate(60 72)"><circle r="40" fill="#c9a04a" stroke="#8a6a2a" stroke-width="4"/><circle r="32" fill="#fffaf0"/><g class="fv-aiguille-b"><path d="M0-28L6 0L0 28L-6 0Z" fill="#b8483e"/><path d="M0 0L6 0L0 28L-6 0Z" fill="#4a5568"/></g><circle r="4" fill="#8a6a2a"/></g>
      <g transform="rotate(6 130 80)"><rect x="98" y="52" width="70" height="56" fill="#fbf6ea" stroke="#d6c8a8"/><text x="133" y="86" text-anchor="middle" font-family="Frank Ruhl Libre, serif" font-size="15" font-weight="700" fill="#3f4f96" direction="rtl">קֵיסָרְיָה</text></g>`,
    // Épisode 11
    'arches-3': () => `<rect x="10" y="10" width="160" height="130" rx="10" fill="#cfe7f5"/><rect x="10" y="112" width="160" height="28" fill="#f2dcae"/>
      ${[0, 1, 2].map((k) => { const x = 20 + k * 52; return `<path d="M${x} 112V64A18 18 0 0 1 ${x + 36} 64V112H${x + 48}V38H${x - 8}V112Z" fill="${k === 2 ? '#e8c890' : '#d9b882'}"/><text x="${x + 18}" y="104" text-anchor="middle" font-family="Consolas, monospace" font-size="14" font-weight="700" fill="#5a3a1a">${k + 1}</text>`; }).join('')}
      <path d="M118 82L128 92M128 82L118 92" stroke="#c9473f" stroke-width="3" stroke-linecap="round"/><circle cx="123" cy="87" r="10" fill="none" stroke="#c9473f" stroke-width="2" class="fv-brille"/>`,
    'boite-metal': () => `<rect x="36" y="56" width="108" height="64" rx="8" fill="#8a9aa8" stroke="#5a6a78" stroke-width="3"/><rect x="32" y="46" width="116" height="18" rx="6" fill="#9aaab8" stroke="#5a6a78" stroke-width="3"/>
      <circle cx="58" cy="90" r="6" fill="#a86a3a" opacity=".5"/><circle cx="120" cy="100" r="8" fill="#a86a3a" opacity=".45"/><path d="M80 80Q90 70 100 80" stroke="#c9d3db" stroke-width="3" fill="none"/>
      <g class="fv-brille"><path d="M150 26L153 34L161 37L153 40L150 48L147 40L139 37L147 34Z" fill="#fff6c8"/></g>`,
    'photo-couple': () => `<g transform="rotate(-5 90 75)"><rect x="24" y="14" width="132" height="122" fill="#fbf7ee" stroke="#d6cbb4" stroke-width="2"/><rect x="32" y="22" width="116" height="90" fill="#e8b48a"/>
      <path d="M32 70L60 50L90 66L120 46L148 62V112H32Z" fill="#c9784a"/><path d="M32 90Q90 80 148 92V112H32Z" fill="#a85a3a"/>
      ${[[78, '#f0c9a8', '#5a3a2c', '#f4f1ea'], [100, '#e8c8a8', '#2c211d', '#3a4a6a']].map(([x, p, ch, ha]) => `<circle cx="${x}" cy="60" r="8" fill="${p}"/><path d="M${x - 8} 57Q${x} 48 ${x + 8} 57Z" fill="${ch}"/><path d="M${x - 11} 108Q${x - 11} 74 ${x} 70Q${x + 11} 74 ${x + 11} 108Z" fill="${ha}"/>`).join('')}
      <path d="M88 84L92 84" stroke="#f0c9a8" stroke-width="5" stroke-linecap="round"/></g>`,
    'photo-dos': () => `<g transform="rotate(4 90 75)"><rect x="24" y="14" width="132" height="122" fill="#f4ecd8" stroke="#d6cbb4" stroke-width="2"/>
      ${[0, 1, 2, 3].map((k) => `<path d="M${40 + (k % 2) * 8} ${44 + k * 18}Q90 ${40 + k * 18} ${140 - (k % 3) * 12} ${44 + k * 18}" stroke="#4a5a9a" stroke-width="2" fill="none"/>`).join('')}
      <text x="92" y="126" text-anchor="middle" class="fv-main">1962</text></g>`,
    cratere: () => `<rect x="10" y="10" width="160" height="130" rx="10" fill="#f6d8a8"/><circle cx="140" cy="36" r="14" fill="#fff0b0"/>
      <path d="M10 70Q50 60 90 66T170 64V140H10Z" fill="#d9925a"/><path d="M20 140Q40 86 90 84Q140 86 160 140Z" fill="#b8683e"/><path d="M40 140Q60 100 90 98Q120 100 140 140Z" fill="#a0583a"/>
      <path d="M60 120L66 112L72 120M100 116L108 106L116 116" stroke="#e8c290" stroke-width="2" fill="none"/>`,
    // Épisode 8
    'lettre-rivka': () => `<g transform="rotate(-4 90 75)"><rect x="24" y="10" width="132" height="130" fill="#fbf6ea" stroke="#d6c8a8"/>
      ${[0, 1, 2, 3, 4, 5].map((k) => `<path d="M${38 + (k % 2) * 6} ${34 + k * 16}Q${70} ${30 + k * 16} ${144 - (k % 3) * 10} ${34 + k * 16}" stroke="#4a5a9a" stroke-width="1.800" fill="none"/>`).join('')}
      <path d="M118 126C110 120 112 112 117 113C119 113.500 120 115 120 116C120 115 121 113.500 123 113C128 112 130 120 122 126Z" fill="#e46a92"/>
      <g transform="translate(48 120)"><path d="M0-12V8M-8-4H8M-10 4Q0 14 10 4" stroke="#4a5a9a" stroke-width="2" fill="none"/><circle cy="-14" r="3" fill="none" stroke="#4a5a9a" stroke-width="2"/></g></g>`,
    sablier: () => `<g class="fv-sablier"><path d="M54 16H126M54 134H126" stroke="#8a5a36" stroke-width="8" stroke-linecap="round"/>
      <path d="M62 20Q62 60 90 75Q62 90 62 130H118Q118 90 90 75Q118 60 118 20Z" fill="#e8f4fa" stroke="#9fc7e0" stroke-width="3"/>
      <path d="M70 34Q72 58 90 70Q108 58 110 34Z" fill="#e8c27a"/><path d="M68 128Q74 104 90 100Q106 104 112 128Z" fill="#e8c27a"/><path d="M90 74V100" stroke="#e8c27a" stroke-width="2" class="fv-clignote"/></g>`,
    vendredi: () => `<rect x="40" y="18" width="100" height="116" rx="8" fill="#fffdf6" stroke="#d6cdb8" stroke-width="2"/><rect x="40" y="18" width="100" height="30" rx="8" fill="#d64545"/><rect x="40" y="38" width="100" height="10" fill="#d64545"/>
      <circle cx="64" cy="18" r="5" fill="#8a8a9a"/><circle cx="116" cy="18" r="5" fill="#8a8a9a"/>
      <text x="90" y="88" text-anchor="middle" font-family="Frank Ruhl Libre, serif" font-size="30" font-weight="700" fill="#2b2230" direction="rtl">שִׁשִּׁי</text>
      <g transform="translate(90 112)"><path d="M-14 2L-6-6L2 0L14-10" stroke="#4f9fcf" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M-16 8H16" stroke="#4f9fcf" stroke-width="3" stroke-linecap="round"/></g>`,
    // Épisode 5
    'photo-rivka': () => `<rect x="38" y="10" width="104" height="130" rx="4" fill="#8a6234"/><rect x="48" y="20" width="84" height="110" fill="#e9dcc0"/>
      <rect x="48" y="20" width="84" height="70" fill="#cdbf9e"/><rect x="48" y="90" width="84" height="40" fill="#a8977a"/><path d="M48 94Q70 88 90 94T132 92" stroke="#e9dcc0" stroke-width="1.500" fill="none"/>
      <circle cx="90" cy="68" r="10" fill="#e8d2b0"/><path d="M80 66Q82 52 90 54Q99 52 100 66Q97 59 90 59Q83 59 80 66Z" fill="#6a5040"/><path d="M76 128Q78 88 90 84Q102 88 104 128Z" fill="#f2ead8"/><path d="M86 71Q90 75 94 71" stroke="#8a5040" stroke-width="1.500" fill="none"/>`,
    'bateau-1962': () => `${PLANS.bateau()}<text x="22" y="34" class="fv-main">1962</text>`,
    alliance: () => `<g class="fv-brille"><path d="M150 26L153 34L161 37L153 40L150 48L147 40L139 37L147 34Z" fill="#fff6c8"/></g>
      <ellipse cx="70" cy="82" rx="34" ry="30" fill="none" stroke="#e2b54a" stroke-width="9"/><ellipse cx="70" cy="82" rx="34" ry="30" fill="none" stroke="#fff3c0" stroke-width="2" opacity=".7"/>
      <ellipse cx="112" cy="88" rx="30" ry="27" fill="none" stroke="#d9a840" stroke-width="8"/><path d="M60 50L70 40L80 50L70 58Z" fill="#dff4ff" stroke="#9fc7e0" stroke-width="2"/>`,
    'maison-haifa': () => `<rect x="10" y="10" width="160" height="130" rx="10" fill="#cfe7f5"/><path d="M10 96Q60 54 110 74Q140 60 170 70V140H10Z" fill="#7fae7a"/>
      <rect x="44" y="64" width="92" height="60" fill="#f4ecdc"/><path d="M36 66L90 38L144 66Z" fill="#c9673f"/>${[0, 1, 2].map((k) => `<rect x="${54 + k * 28}" y="76" width="16" height="16" fill="#8fc0e0"/>`).join('')}<rect x="82" y="100" width="18" height="24" fill="#8a5a36"/>
      <g class="fv-plante"><circle cx="30" cy="112" r="14" fill="#5c9c6a"/><circle cx="152" cy="110" r="12" fill="#5c9c6a"/></g><path d="M10 132H170" stroke="#5fa6cf" stroke-width="8"/>`,
    journaux: () => `${[0, 1, 2].map((k) => `<g transform="rotate(${-8 + k * 7} 90 ${110 - k * 22})"><rect x="34" y="${88 - k * 24}" width="112" height="44" fill="${['#e8dcc0', '#efe4cc', '#f6eedc'][k]}" stroke="#c9b48a"/><rect x="42" y="${94 - k * 24}" width="96" height="8" fill="#5a5a6a" opacity=".7"/><path d="M42 ${110 - k * 24}H90M42 ${118 - k * 24}H86M98 ${110 - k * 24}H138M98 ${118 - k * 24}H132" stroke="#8a8a9a" stroke-width="2"/></g>`).join('')}`,
    // Épisode 6
    archives: () => `${[0, 1, 2].map((k) => `<g transform="translate(${30 + k * 42} ${60 - (k % 2) * 8})"><rect width="38" height="70" rx="3" fill="#d9c08a" stroke="#a88c5a" stroke-width="2"/><rect x="8" y="10" width="22" height="12" rx="2" fill="#fff6dc"/><circle cx="19" cy="52" r="5" fill="none" stroke="#a88c5a" stroke-width="2"/></g>`).join('')}<path d="M24 132H156" stroke="#8a5a36" stroke-width="6"/>`,
    ordinateur: () => `<rect x="20" y="16" width="140" height="96" rx="6" fill="#3a3a4a"/><rect x="28" y="24" width="124" height="80" rx="3" fill="#e8f2fa"/>
      <rect x="36" y="40" width="108" height="20" rx="10" fill="#fff" stroke="#8fb0cc" stroke-width="2"/><circle cx="48" cy="50" r="5" fill="none" stroke="#6a8aa8" stroke-width="2"/><path d="M52 54L56 58" stroke="#6a8aa8" stroke-width="2"/>
      <rect x="128" y="44" width="2.500" height="12" fill="#2b2230" class="fv-clignote"/><path d="M36 74H120M36 86H100" stroke="#b9cbd9" stroke-width="4"/>
      <rect x="80" y="112" width="20" height="14" fill="#5a5a6a"/><rect x="60" y="124" width="60" height="6" rx="3" fill="#5a5a6a"/>`,
    'journal-mariage': () => `<g transform="rotate(-3 90 75)"><rect x="18" y="14" width="144" height="124" fill="#efe4cc" stroke="#c9b48a"/>
      <text x="90" y="38" text-anchor="middle" font-family="Frank Ruhl Libre, serif" font-size="18" font-weight="700" fill="#3a3a4a" direction="rtl">מַזָּל טוֹב</text>
      <rect x="30" y="48" width="56" height="64" fill="#cdbf9e"/><circle cx="50" cy="70" r="6" fill="#e8d2b0"/><path d="M42 110Q44 82 50 80Q56 82 58 110Z" fill="#f6f0e2"/><circle cx="68" cy="70" r="6" fill="#e0c4a0"/><path d="M61 66Q68 60 75 66Z" fill="#3a3030"/><path d="M60 110Q61 82 68 80Q75 82 76 110Z" fill="#4a4a5a"/>
      <path d="M96 56H150M96 66H146M96 76H150M96 86H140M96 96H148M96 106H136M30 124H150" stroke="#8a8a9a" stroke-width="2"/></g>`,
    boulangerie: () => `<rect x="10" y="10" width="160" height="130" rx="10" fill="#cfe7f5"/><rect x="24" y="40" width="132" height="100" fill="#f4ecdc"/>
      <path d="M18 40H162L152 22H28Z" fill="#c9473f"/><path d="M28 40V30M52 40V30M76 40V30M100 40V30M124 40V30M148 40V30" stroke="#f4ead8" stroke-width="10" opacity=".9"/>
      <rect x="36" y="58" width="70" height="56" fill="#cfe6f4" stroke="#8a5a36" stroke-width="3"/><g transform="translate(70 96)">${[-14, -5, 4, 13].map((d, j) => `<ellipse cx="${d}" cy="${j % 2 ? -2 : 0}" rx="7" ry="7" fill="${j % 2 ? '#c9782e' : '#d98e3e'}"/>`).join('')}</g>
      <rect x="116" y="58" width="30" height="82" fill="#8a5a36"/><circle cx="140" cy="100" r="2.500" fill="#e8c27a"/>`,
    'horloge-2': () => horlogeSvg(1, 40, false),
    // Épisode 7
    'gateau-85': () => `<rect x="34" y="78" width="112" height="50" rx="8" fill="#f2c7a0"/><path d="M34 90Q90 104 146 90V78Q90 66 34 78Z" fill="#fbeadf"/><path d="M34 78Q90 66 146 78Q90 92 34 78Z" fill="#ee92ac"/>
      <ellipse cx="90" cy="130" rx="66" ry="8" fill="#e1d2bc"/><text x="90" y="118" text-anchor="middle" font-family="Consolas, monospace" font-size="20" font-weight="700" fill="#b8483e">85</text>
      ${[62, 90, 118].map((x) => `<rect x="${x - 3}" y="52" width="6" height="22" rx="2" fill="#8fc0e8"/><path d="M${x} 38Q${x + 6} 46 ${x} 52Q${x - 6} 46 ${x} 38Z" fill="#ffc15a" class="fv-flamme"/>`).join('')}`,
    telephone: () => `<g class="fv-sonne"><rect x="60" y="20" width="60" height="110" rx="10" fill="#2b2230"/><rect x="66" y="32" width="48" height="80" rx="4" fill="#8fc0e8"/><circle cx="90" cy="64" r="12" fill="#fff"/><path d="M84 58Q90 52 96 58V70Q90 76 84 70Z" fill="#3fae7a"/><rect x="82" y="120" width="16" height="4" rx="2" fill="#5a5a6a"/></g>
      <g class="fv-clignote"><path d="M134 40Q144 50 134 60M144 32Q160 50 144 68M46 40Q36 50 46 60M36 32Q20 50 36 68" stroke="#e46a92" stroke-width="3.500" fill="none" stroke-linecap="round"/></g>`,
    'horloge-10': () => horlogeSvg(10, 0, true),
    horloge: () => horlogeSvg(9, 0, true),
    horlogeAncienne: () => `<circle cx="90" cy="75" r="58" fill="#fffaf0" stroke="#7a5a34" stroke-width="6"/>${[...Array(12).keys()].map((k) => { const a = k * Math.PI / 6; return `<circle cx="${(90 + 48 * Math.sin(a)).toFixed(1)}" cy="${(75 - 48 * Math.cos(a)).toFixed(1)}" r="${k % 3 ? 2 : 3.500}" fill="#5a4a3e"/>`; }).join('')}
      <path d="M90 75L58 75" stroke="#2b2230" stroke-width="5" stroke-linecap="round"/><path d="M90 75V36" stroke="#2b2230" stroke-width="3.500" stroke-linecap="round" class="fv-aiguille"/><circle cx="90" cy="75" r="5" fill="#b8483e"/>
      <g transform="translate(150 24)"><circle r="12" fill="#ffd56a"/><path d="M0-20V-15M0 15V20M-20 0H-15M15 0H20M-14-14L-11-11M11 11L14 14M-14 14L-11 11M11-11L14-14" stroke="#f2b84b" stroke-width="2.500" stroke-linecap="round"/></g>`,
  };

  const persoDe = (cfg) => {
    const base = Object.assign({}, typeof CH_PERSO_DEFAUT !== 'undefined' ? CH_PERSO_DEFAUT : {});
    const moi = Object.assign({}, base, S.perso || {});
    const p = Object.assign({}, base, cfg);
    if (cfg.tenueSinon && moi.tenue === cfg.tenue) p.tenue = cfg.tenueSinon; // jamais la même tenue que toi
    if (typeof CH_TENUES !== 'undefined' && !CH_TENUES[p.tenue]) p.tenue = '';
    return p;
  };

  function video(num) {
    const ep = FEUILLETON.find((e) => String(e.num) === String(num)), cfg = FEUILLETON_VIDEO[num];
    const st = S.feuilleton || (S.feuilleton = { debut: dayKey(), vus: {} });
    const sortie = (n) => { const d = new Date(st.debut + 'T00:00'); d.setDate(d.getDate() + 7 * (n - 1)); return dayKey(d); };
    const dispo = (n) => n === 1 || (!!st.vus[n - 1] && sortie(n) <= dayKey());
    if (!ep || !cfg || (!dispo(ep.num) && !st.vus[ep.num])) { location.hash = '#/feuilleton'; return; }
    const moiP = Object.assign({}, typeof CH_PERSO_DEFAUT !== 'undefined' ? CH_PERSO_DEFAUT : {}, S.perso || {});
    const echelle = cfg.echelle || 1.2;
    const dessinPerso = (c, emo) => (c.type === 'pnj' ? pnjSvg(c, emo || 'content') : persoSvg(persoDe(c)));
    const emoDe = (qui, k) => (cfg.emo && cfg.emo[qui] ? cfg.emo[qui][k] : null);
    // Une « couche » : un décor, ses personnages, toi, et ce qui passe devant (la 2e sert aux changements de lieu)
    const couche = (sc, n) => { const e = sc.echelle || echelle; return `<g class="fv-couche" id="fvCouche${n}"${n > 1 ? ' style="opacity:0"' : ''}>${FV_DECORS[sc.decor]()}
      ${Object.entries(sc.persos).map(([qui, c]) => `<g class="fv-perso" data-qui="${qui}" transform="translate(${c.x} 446) scale(${e})"><g class="fv-corps">${dessinPerso(c, emoDe(qui, ep.lignes.findIndex((l) => l.qui === qui)))}</g></g>`).join('')}
      <g class="fv-perso" data-qui="moi" transform="translate(${sc.moi || 590} 446) scale(${e})"><g class="fv-corps">${persoSvg(moiP)}</g></g>
      ${FV_DEVANT[sc.decor] ? FV_DEVANT[sc.decor]() : ''}</g>`; };
    const autresReps = FEUILLETON.filter((e) => e !== ep).flatMap((e) => e.lignes.filter((l) => l.rep).map((l) => l.rep));
    let fr = !!S.videoFr, lent = false;
    const etroit = matchMedia('(max-width: 600px)').matches;

    app.innerHTML = `<div class="q-head"><a href="#/feuilleton/${ep.num}">← Version à lire</a><span>🎬 Épisode ${ep.num} · ${esc(ep.titre)}</span></div>
      <div class="fv-ecran" id="fvEcran">
      <div class="fv-scene" id="fvScene" style="aspect-ratio:${etroit ? '560 / 450' : '16 / 9'}">
        <svg viewBox="${etroit ? '150 0 560 450' : '0 0 800 450'}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(ep.lieu)}">
          ${couche(cfg, 1)}${cfg.suite ? couche(cfg.suite, 2) : ''}
          <g class="fv-gros" id="fvGros" transform="translate(${(cfg.gros || [310, 14]).join(' ')})" style="--gx:${(cfg.gros || [310])[0]}px;--gy:${(cfg.gros || [0, 14])[1]}px"><rect width="180" height="150" rx="16" fill="#fffdf8" stroke="#fff" stroke-width="6"/><rect width="180" height="150" rx="16" fill="none" stroke="#2b1f3a" stroke-opacity=".12" stroke-width="1"/><g id="fvGrosContenu"></g></g>
        </svg>
        <div class="fv-lieu">📍 ${esc(ep.lieu)}</div>
        <button type="button" class="fv-debut" id="fvDebut"><span class="fv-clap">🎬</span><small>Épisode ${ep.num}</small><b>${esc(ep.titre)}</b><span class="fv-go">▶ Regarder</span></button>
        <div class="fv-fin" id="fvFin" hidden></div>
      </div>
      <div class="fv-st" id="fvSous"><p class="fv-aide">Touche ▶ pour lancer l’épisode. Pendant la vidéo, touche un mot des sous-titres pour avoir son sens.</p></div>
      <div class="fv-ctrl">
        <button type="button" id="fvPrec" title="Réplique précédente" aria-label="Réplique précédente">⏮</button>
        <button type="button" id="fvPlay" class="fv-play" title="Pause" aria-label="Pause">⏸</button>
        <button type="button" id="fvRe" title="Réécouter la réplique" aria-label="Réécouter la réplique">🔁</button>
        <button type="button" id="fvLent" title="Plus lentement" aria-label="Plus lentement">🐢</button>
        <span class="fv-prog" id="fvProg"></span>
        <label class="fv-frbtn"><input type="checkbox" id="fvFr" ${fr ? 'checked' : ''}> FR</label>
      </div>
      </div>`;

    const scene = $('#fvScene'), sous = $('#fvSous');
    const bulle = document.createElement('div'); bulle.className = 'bulle-mot'; bulle.hidden = true;
    const n = ep.lignes.length;
    let i = 0, jeton = 0, pause = false, phase = 'ligne';
    const vivant = () => scene.isConnected;
    const dodo = (ms) => new Promise((r) => setTimeout(r, ms));
    const attendrePause = async () => { while (pause && vivant()) await dodo(150); };
    const lecteur = new Audio();
    lecteur.preload = 'auto';
    const fichierSon = (texte) => {
      const k = NFC(texte);
      const humain = HUMAN[k] && !((S.sonsAvis[k] === 'faux' || (window.SONS_REFAITS || {})[k]) && SOUNDS[k]);
      return humain ? 'humain/' + HUMAN[k].fichier : SOUNDS[k] ? `${SOUNDS[k]}?v=2` : null;
    };
    // Lit un texte avec le lecteur de la vidéo ; sans fichier son, la voix de l'appareil prend le relais
    const parler = (texte) => new Promise((res) => {
      stopAudio();
      const f = fichierSon(texte);
      if (!f) { speak(texte).then(res); return; }
      let fini = false;
      const done = () => { if (fini) return; fini = true; if (endSpeech === done) endSpeech = null; res(); };
      endSpeech = done; player = lecteur;
      lecteur.onended = done; lecteur.onerror = done;
      lecteur.src = 'audio/' + f;
      lecteur.playbackRate = lent ? 0.75 : 1;
      lecteur.play().catch(() => { if (!pause) done(); });
    });
    window.addEventListener('hashchange', () => { lecteur.pause(); }, { once: true });
    const anime = (qui) => { $$('.fv-perso').forEach((g) => g.classList.toggle('fv-parle', g.dataset.qui === qui)); };
    // L'humeur du personnage (style des scènes) change avec ce qu'il dit
    const humeur = (qui, k) => { const c = cfg.persos[qui], e = emoDe(qui, k); if (c && c.type === 'pnj' && e) $$(`.fv-perso[data-qui="${qui}"] .fv-corps`).forEach((g) => (g.innerHTML = pnjSvg(c, e))); };
    // Changement de lieu en cours d'épisode : on passe en fondu à la 2e couche
    const lieu = (k) => { if (!cfg.suite) return; const deux = k >= cfg.suite.des; $('#fvCouche1').style.opacity = deux ? 0 : 1; $('#fvCouche2').style.opacity = deux ? 1 : 0; };
    const plan = (k) => {
      const g = $('#fvGros'), id = cfg.plans[k];
      if (!id) { g.classList.remove('on'); return; }
      const avant = g.dataset.plan;
      $('#fvGrosContenu').innerHTML = PLANS[id]();
      g.dataset.plan = id;
      if (avant !== id) { g.classList.remove('on'); void g.getBoundingClientRect(); }
      g.classList.add('on');
    };
    const sousTitre = (nom, l, choixHtml = '') => {
      sous.innerHTML = `<div class="fv-qui">${nom}</div>
        <div class="fv-he">${phraseCliquable(l.he)}</div>
        <small class="tr">${esc(l.tr)}</small>
        <div class="fv-fr" ${fr ? '' : 'hidden'}>${esc(l.fr)}</div>${choixHtml}`;
      sous.appendChild(bulle); bulle.hidden = true;
      brancherMotsClic(sous, bulle);
      sous.querySelectorAll('.mot-clic').forEach((b) => b.addEventListener('click', () => mettrePause(true)));
    };
    const progres = () => { $('#fvProg').textContent = `${Math.min(i + 1, n)} / ${n}`; };
    const mettrePause = (v) => {
      if (v === pause) return;
      pause = v;
      const b = $('#fvPlay'); b.textContent = pause ? '▶' : '⏸'; b.title = pause ? 'Lecture' : 'Pause'; b.setAttribute('aria-label', b.title);
      scene.classList.toggle('fv-en-pause', pause);
      if (pause) lecteur.pause(); else if (lecteur.src && !lecteur.ended && endSpeech) lecteur.play().catch(() => {});
      if ('speechSynthesis' in window) { if (pause) speechSynthesis.pause(); else speechSynthesis.resume(); }
    };

    async function jouer(k) {
      const t = ++jeton; i = k; phase = 'ligne';
      stopAudio(); progres();
      const l = ep.lignes[k], p = FEUILLETON_PERSOS[l.qui];
      lieu(k); plan(k); humeur(l.qui, k); anime(l.qui);
      sousTitre(`${p.em} ${esc(p.nom)}`, l);
      if (pause) { await attendrePause(); if (t !== jeton || !vivant()) return; }
      await parler(l.he);
      anime(null);
      await dodo(450); await attendrePause(); if (t !== jeton || !vivant()) return;
      if (l.rep) return choisir(k, t);
      if (k + 1 < n) return jouer(k + 1);
      fin();
    }
    function choisir(k, t) {
      phase = 'choix';
      const l = ep.lignes[k], p = FEUILLETON_PERSOS[l.qui];
      const choix = shuffle([{ ...l.rep, ok: true }, ...pick(autresReps.filter((r) => r.he !== l.rep.he), 2)]);
      sousTitre(`${p.em} ${esc(p.nom)}`, l, `<p class="fv-atoi">À toi ! Que réponds-tu ?</p><div class="fv-choix">${choix.map((c) => `<button type="button" class="opt" data-ok="${c.ok ? 1 : 0}"><span class="he" lang="he" dir="rtl">${esc(c.he)}</span><small class="tr">${esc(c.tr)}</small></button>`).join('')}</div>`);
      scene.classList.add('fv-attend');
      const z = sous.querySelector('.fv-choix'); if (z && z.getBoundingClientRect().bottom > innerHeight) z.scrollIntoView({ block: 'end', behavior: 'smooth' });
      sous.querySelectorAll('.fv-choix .opt').forEach((b) => (b.onclick = async () => {
        if (b.dataset.ok !== '1') { b.classList.add('ko'); b.disabled = true; toast('Ce n’est pas la bonne réplique : relis ce qu’on te dit.'); return; }
        scene.classList.remove('fv-attend');
        if (t !== jeton) return;
        phase = 'reponse';
        anime('moi');
        sousTitre('🙋🏻‍♀️ Toi', l.rep);
        await parler(l.rep.he);
        anime(null);
        await dodo(450); await attendrePause(); if (t !== jeton || !vivant()) return;
        if (k + 1 < n) jouer(k + 1); else fin();
      }));
    }
    function fin() {
      jeton++; anime(null); phase = 'fin';
      const premiere = !st.vus[ep.num];
      if (premiere) { st.vus[ep.num] = dayKey(); addXP(20); save(); }
      const suivant = FEUILLETON.find((e) => e.num === ep.num + 1);
      const finSaison = !suivant || (suivant.saison || 1) !== (ep.saison || 1);
      const f = $('#fvFin');
      f.innerHTML = `<p class="fv-asuivre">${finSaison ? `Fin de la saison ${ep.saison || 1}` : 'À suivre…'}</p><p>${esc(ep.suspense)}</p>
        <div class="row" style="justify-content:center"><button type="button" class="btn ghost" id="fvRevoir">↺ Revoir</button>${suivant && dispo(suivant.num) ? `<a class="btn gold" href="#/feuilleton/${suivant.num}${FEUILLETON_VIDEO[suivant.num] ? '/video' : ''}">Épisode ${suivant.num} →</a>` : ''}<a class="btn ghost" href="#/feuilleton">Épisodes</a></div>`;
      f.hidden = false;
      sous.innerHTML = `<div class="fe-mots"><b>Les mots de l’épisode</b>${premiere ? ' <small>· +20 XP</small>' : ''}<div>${ep.mots.map(([he, , frm]) => `<span class="rs-puce">${HE(he)}<small>${esc(frm)}</small>${sayBtn(he)}</span>`).join('')}</div>
        <button class="btn ghost" id="fvMots">⭐ Ajouter ces mots à Mes mots</button></div>`;
      $('#fvMots').onclick = (e) => { ep.mots.forEach((m) => ajouterMesMots(m)); e.currentTarget.disabled = true; toast('⭐ Mots ajoutés à tes cartes'); };
      $('#fvRevoir').onclick = () => { f.hidden = true; mettrePause(false); jouer(0); };
    }

    $('#fvDebut').onclick = (e) => { e.currentTarget.remove(); jouer(0); };
    $('#fvPlay').onclick = () => { if ($('#fvDebut')) { $('#fvDebut').click(); return; } mettrePause(!pause); };
    $('#fvPrec').onclick = () => { if ($('#fvDebut')) return; mettrePause(false); $('#fvFin').hidden = true; jouer(Math.max(0, phase === 'ligne' && i > 0 ? i - 1 : i)); };
    $('#fvRe').onclick = () => { if ($('#fvDebut')) return; mettrePause(false); $('#fvFin').hidden = true; if (phase === 'fin') return jouer(n - 1); jouer(i); };
    $('#fvLent').onclick = (e) => { lent = !lent; e.currentTarget.classList.toggle('on', lent); lecteur.playbackRate = lent ? 0.75 : 1; toast(lent ? '🐢 Voix plus lente' : 'Voix normale'); };
    $('#fvFr').onchange = (e) => { fr = e.target.checked; S.videoFr = fr; save(); sous.querySelectorAll('.fv-fr').forEach((z) => (z.hidden = !fr)); };
    keyHandler = (ev) => { if (ev.key === ' ' && !/INPUT|BUTTON/.test(document.activeElement.tagName)) { ev.preventDefault(); $('#fvPlay').click(); } };
  }

  // La page de l'épisode : un bouton « Regarder en vidéo » quand la vidéo existe
  const lire = routes.feuilleton;
  routes.feuilleton = (num, mode) => {
    if (mode === 'video' && FEUILLETON_VIDEO[num]) return video(num);
    lire(num);
    if (num && FEUILLETON_VIDEO[num]) {
      // La page se redessine à chaque réplique : on remet le bouton à chaque fois
      const poser = () => { const l = $('.fe-lieu'); if (l && !$('.fv-entree')) l.insertAdjacentHTML('afterend', `<a class="fv-entree" href="#/feuilleton/${num}/video"><span>🎬</span><span><b>Regarder en vidéo</b><small>Le même épisode en dessin animé, avec le son et les sous-titres</small></span><span class="fv-entree-go">▶</span></a>`); };
      const obs = new MutationObserver(poser); obs.observe(app, { childList: true });
      window.addEventListener('hashchange', () => obs.disconnect(), { once: true });
      poser();
    }
    if (!num) $$('.fe-ep').forEach((a) => { const m = (a.getAttribute('href') || '').match(/feuilleton\/(\d+)$/); if (m && FEUILLETON_VIDEO[m[1]]) { a.setAttribute('href', `#/feuilleton/${m[1]}/video`); const e = a.querySelector('.fe-etat'); if (e) e.insertAdjacentHTML('afterbegin', '🎬 '); } });
  };
  // Le site déjà affiché avant ce fichier : on redessine les pages du feuilleton
  if (/^#\/feuilleton(\/|$)/.test(location.hash)) route();
})();
