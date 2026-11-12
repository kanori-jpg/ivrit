'use strict';
/* ============ Outils ============ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const app = $('#app');
const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a, n) => shuffle(a).slice(0, n);
const strip = (s) => s.replace(/[֑-ׇֽֿׁׂׅׄ]/g, '');
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const addDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return dayKey(d); };
const HE = (t, cls = '') => `<span class="he ${cls}" lang="he" dir="rtl">${esc(t)}</span>`;
const TR = (t) => `<span class="tr-x">${esc(t)}</span>`;
const TRS = (t) => `<span class="tr-x">${esc(t)} · </span>`;
const sayBtn = (t, label = '🔊') => `<button class="say" data-say="${esc(t)}" title="Écouter">${label}</button>`;

const WORDS = THEMES.flatMap((t) => t.words.map(([he, tr, fr]) => ({ he, tr, fr, theme: t.id })));
const themeWords = (id) => (id && id !== 'tout' ? WORDS.filter((w) => w.theme === id) : WORDS);
const themeName = (id) => (THEMES.find((t) => t.id === id) || { name: 'Tous les thèmes' }).name;

/* ============ Sauvegarde ============ */
const KEY = 'ivrit-ludique-v1';
const defaults = () => ({ xp: 0, days: {}, streak: 0, lastDay: null, cards: {}, badges: [], seen: [], best: { chrono: 0, memory: 0 }, written: 0, perfect: 0, goal: 50, sh: 0, shInit: false, stats: { quiz: 0, q: 0, ok: 0, sec: 0 }, freezes: 0, jokers: 0, boostUntil: 0, deco: [], found: [], sceneDone: [], story: {}, daily: {}, articles: [], presse: [], racines: {}, night: false, postcards: {}, lastExport: null, seance: null, conj: {}, erreurs: {}, sansVoyelles: false, sansTranslit: false, cursive: {}, grammaire: {}, conversations: {}, mesMots: [], sonsAvis: {}, chronoMuet: false, styleScenes: {}, chambre: {}, perso: {}, controles: {}, gramRates: {}, voyProg: true });
let S;
try { S = Object.assign(defaults(), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch { S = defaults(); }
S.best = Object.assign(defaults().best, S.best);
S.stats = Object.assign(defaults().stats, S.stats);
const save = () => localStorage.setItem(KEY, JSON.stringify(S));
// Orthographes corrigées après vérification : la progression déjà acquise suit le mot
const MOTS_CORRIGES = [['מָסָךְ', 'מָסַךְ'], ['מָה נִשְׁמָע?', 'מַה נִּשְׁמָע?'], ['מַה נִּשְׁמַע?', 'מַה נִּשְׁמָע?'], ['מָה קוֹרֶה מָחָר?', 'מַה קּוֹרֶה מָחָר?'], ['סַבְתָּא', 'סָבְתָא'], ['פָּנָס', 'פַּנָּס'], ['פְּסִיפָס', 'פְּסֵיפָס'], ['תֻּרְמוֹס', 'צִבְעוֹנִי'], ['תֻּרְמוּס', 'צִבְעוֹנִי']];
MOTS_CORRIGES.forEach(([ancien, nouveau]) => {
  [S.cards, S.erreurs, S.rates || {}].forEach((liste) => Object.keys(liste).forEach((k) => {
    if (k.normalize('NFC') === ancien.normalize('NFC')) { const n = nouveau.normalize('NFC'); if (k === n) return; if (!liste[n]) liste[n] = liste[k]; delete liste[k]; }
  }));
  S.found = S.found.map((k) => (k.normalize('NFC') === ancien.normalize('NFC') ? nouveau.normalize('NFC') : k));
  (S.mesMots || []).forEach((m) => { if (m[0].normalize('NFC') === ancien.normalize('NFC')) m[0] = nouveau.normalize('NFC'); });
});
// Les XP déjà gagnés avant l'arrivée des shekels sont convertis une seule fois
if (!S.shInit) { S.sh += Math.floor(S.xp / 5); S.shInit = true; save(); }

// « Mes mots » : le vocabulaire que tu ajoutes toi-même, révisé comme les autres thèmes
function inscrireMot(m) {
  let t = THEMES.find((x) => x.id === 'mesmots');
  if (!t) { t = { id: 'mesmots', name: 'Mes mots', emoji: '⭐', words: [] }; THEMES.unshift(t); }
  t.words.push(m);
  WORDS.push({ he: m[0], tr: m[1], fr: m[2], theme: 'mesmots' });
}
S.mesMots.forEach(inscrireMot);
const estDansMesMots = (he) => S.mesMots.some((m) => m[0].normalize('NFC') === he.normalize('NFC'));
function ajouterMesMots(m) {
  if (estDansMesMots(m[0])) return;
  S.mesMots.push(m); inscrireMot(m); save();
}
function retirerMesMots(he) {
  const n = he.normalize('NFC');
  S.mesMots = S.mesMots.filter((m) => m[0].normalize('NFC') !== n);
  const i = WORDS.findIndex((w) => w.theme === 'mesmots' && w.he.normalize('NFC') === n);
  if (i >= 0) WORDS.splice(i, 1);
  const t = THEMES.find((x) => x.id === 'mesmots');
  if (t) { t.words = t.words.filter((m) => m[0].normalize('NFC') !== n); if (!t.words.length) THEMES.splice(THEMES.indexOf(t), 1); }
  save();
}

const level = (xp = S.xp) => Math.floor(Math.sqrt(xp / 40)) + 1;
const levelXp = (l) => 40 * (l - 1) ** 2;
const daysBetween = (a, b) => Math.round((new Date(b + 'T00:00') - new Date(a + 'T00:00')) / 864e5);
const streakNow = () => (S.lastDay && daysBetween(S.lastDay, dayKey()) <= 1 + S.freezes ? S.streak : 0);
const mastered = (list = WORDS) => list.filter((w) => (S.cards[w.he]?.box || 0) >= 3).length;

function addXP(n) {
  if (n <= 0) return;
  if (Date.now() < S.boostUntil) n *= 2;
  const today = dayKey();
  const before = S.days[today] || 0;
  const lvBefore = level();
  if (S.lastDay !== today) {
    const missed = S.lastDay ? daysBetween(S.lastDay, today) - 1 : -1;
    if (missed === 0) S.streak++;
    else if (missed > 0 && missed <= S.freezes) { S.freezes -= missed; S.streak++; toast(`🧊 Série sauvée par ${missed > 1 ? missed + ' gels' : 'un gel'} !`); }
    else S.streak = 1;
    S.lastDay = today;
  }
  S.xp += n;
  S.days[today] = before + n;
  S.sh += Math.max(1, Math.round(n / 5));
  if (level() > lvBefore) S.sh += 20;
  save();
  if (before < S.goal && S.days[today] >= S.goal) { toast('🎯 Objectif du jour atteint !'); confetti(); }
  if (level() > lvBefore) { toast(`🚀 Niveau ${level()} atteint ! +20 ₪`); confetti(); }
  checkBadges();
  header();
}

const BADGES = [
  { id: 'debut', em: '🌱', name: 'Premier pas', desc: 'Gagner tes premiers XP', ok: () => S.xp > 0 },
  { id: 'alefbet', em: '🔤', name: 'Alef-Bet', desc: 'Découvrir les 22 lettres', ok: () => S.seen.length >= 22 },
  { id: 'parfait', em: '💯', name: 'Sans faute', desc: 'Un quiz à 10/10', ok: () => S.perfect > 0 },
  { id: 'memoire', em: '🧠', name: 'Mémoire d’éléphant', desc: 'Un memory en 10 coups max', ok: () => S.best.memory > 0 && S.best.memory <= 10 },
  { id: 'eclair', em: '⚡', name: 'Éclair', desc: '20 points au défi 60 s', ok: () => S.best.chrono >= 20 },
  { id: 'scribe', em: '✍️', name: 'Scribe', desc: 'Écrire 10 mots', ok: () => S.written >= 10 },
  { id: 'serie3', em: '🔥', name: 'Sur la lancée', desc: '3 jours d’affilée', ok: () => S.streak >= 3 },
  { id: 'serie7', em: '🏅', name: 'Une semaine !', desc: '7 jours d’affilée', ok: () => S.streak >= 7 },
  { id: 'mots25', em: '📚', name: 'Vocabulaire', desc: 'Maîtriser 25 mots', ok: () => mastered() >= 25 },
  { id: 'mots60', em: '🎓', name: 'Polyglotte', desc: 'Maîtriser 60 mots', ok: () => mastered() >= 60 },
  { id: 'xp500', em: '👑', name: 'Centurion', desc: 'Atteindre 500 XP', ok: () => S.xp >= 500 },
];
function checkBadges() {
  BADGES.forEach((b) => {
    if (!S.badges.includes(b.id) && b.ok()) { S.badges.push(b.id); save(); setTimeout(() => toast(`${b.em} Badge débloqué : ${b.name}`), 900); }
  });
}

/* ============ Interface commune ============ */
function header() {
  $('#hStreak').textContent = `🔥 ${streakNow()}`;
  $('#hXp').textContent = `⭐ ${S.xp}`;
  $('#hSh').textContent = `₪ ${S.sh}`;
  $('#hLvl').textContent = `Niv. ${level()}`;
  if (typeof majRail === 'function') majRail();
}
// Lucioles de récompense
function lucioles(el, n = 14) {
  if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const r = el.getBoundingClientRect();
  for (let i = 0; i < n; i++) {
    const f = document.createElement('i'); f.className = 'fly';
    f.style.left = r.left + Math.random() * r.width + 'px'; f.style.top = r.top + Math.random() * r.height + 'px';
    f.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px'); f.style.animationDelay = Math.random() * .4 + 's';
    document.body.appendChild(f); setTimeout(() => f.remove(), 2300);
  }
}
// Mode nuit : ciel étoilé, enregistré avec la progression
function applyNight() {
  document.body.classList.toggle('night', !!S.night);
  $('#moonI').textContent = S.night ? '☀️' : '🌙'; $('#moonT').textContent = S.night ? 'Mode jour' : 'Mode nuit';
}
(() => {
  const sky = $('#sky-night');
  for (let i = 0; i < 90; i++) { const e = document.createElement('i'); e.style.left = Math.random() * 100 + '%'; e.style.top = Math.random() * 100 + '%'; e.style.opacity = .3 + Math.random() * .7; sky.appendChild(e); }
  [[18, 10, 0], [52, 22, -1.4], [76, 8, -2.6], [34, 52, -3.2]].forEach(([x, y, d]) => { const s = document.createElement('span'); s.className = 'shoot'; s.style.left = x + '%'; s.style.top = y + '%'; s.style.animationDelay = d + 's'; sky.appendChild(s); });
  $('#moon').onclick = () => { S.night = !S.night; save(); applyNight(); };
})();
let toastT;
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('on');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2800);
}
function confetti() {
  const colors = ['#f2b134', '#2f5bd3', '#2fae6b', '#e0524f', '#9b5de5'];
  for (let i = 0; i < 70; i++) {
    const c = document.createElement('i');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = colors[i % colors.length];
    c.style.animationDuration = 1.6 + Math.random() * 1.6 + 's';
    c.style.animationDelay = Math.random() * 0.4 + 's';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3800);
  }
}

/* Prononciation : fichiers audio de audio/ (générés par outils/generer_audio.py),
   sinon synthèse vocale du navigateur en secours */
const SOUNDS = window.SONS || {};
let player = null;
let endSpeech = null; // termine la lecture en cours (fin normale ou interruption)
function stopAudio() {
  if (player) { player.pause(); player = null; }
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  if (endSpeech) { endSpeech(); endSpeech = null; }
}
let heVoice = null, warned = false;
const loadVoices = () => { heVoice = speechSynthesis.getVoices().find((v) => /^(he|iw)/i.test(v.lang)) || null; };
if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
// Voix humaines (Lingua Libre, outils/voix_humaines.py) en priorité, sinon voix de synthèse
const HUMAN = window.VOIX || {};
// Lit un texte. La promesse se termine quand la lecture est finie ou interrompue.
function speak(text) {
  stopAudio();
  return new Promise((resolve) => {
    const timer = setTimeout(() => done(), 12000); // sécurité si le navigateur ne signale jamais la fin
    function done() { clearTimeout(timer); if (endSpeech === done) endSpeech = null; resolve(); }
    endSpeech = done;
    const key = text.normalize('NFC');
    // Une vraie voix signalée comme fausse laisse la place à la voix de synthèse
    const humain = HUMAN[key] && !((S.sonsAvis[key] === 'faux' || (window.SONS_REFAITS || {})[key]) && SOUNDS[key]); // une vraie voix signalée puis refaite reste écartée
    const file = humain ? 'humain/' + HUMAN[key].fichier : SOUNDS[key] && `${SOUNDS[key]}?v=2`;
    // La voix de l'appareil
    function synthese(alerter) {
      if (!('speechSynthesis' in window)) { if (alerter) toast('La synthèse vocale n\u2019est pas disponible sur ce navigateur.'); return done(); }
      loadVoices();
      if (alerter && !heVoice && !warned) { warned = true; toast('Pas de voix hébraïque trouvée : ouvre le site dans Microsoft Edge ou ajoute la voix « Hébreu » dans Windows.'); }
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'he-IL'; if (heVoice) u.voice = heVoice; u.rate = 0.8;
      u.onend = done; u.onerror = done;
      speechSynthesis.speak(u);
    }
    if (file) {
      player = new Audio('audio/' + file);
      player.onended = done;
      // Hors connexion, un son pas encore gardé sur l'appareil : on prend la voix de l'appareil
      player.onerror = () => (navigator.onLine ? done() : synthese(false));
      player.play().catch((err) => { if (navigator.onLine || (err && err.name === 'NotAllowedError')) done(); }); // lecture bloquée sans geste de l'utilisateur : on continue
      return;
    }
    synthese(true);
  });
}
document.addEventListener('click', (e) => { const b = e.target.closest('[data-say]'); if (b) { e.stopPropagation(); speak(b.dataset.say); } }, true);

/* Minuteurs & clavier propres à chaque écran */
let timers = [], keyHandler = null;
const later = (fn, ms) => timers.push(setTimeout(fn, ms));
const every = (fn, ms) => timers.push(setInterval(fn, ms));
function cleanup() { timers.forEach((t) => { clearTimeout(t); clearInterval(t); }); timers = []; keyHandler = null; }
document.addEventListener('keydown', (e) => keyHandler && keyHandler(e));

/* ============ Navigation ============ */
const ACTIVITIES = [
  { id: 'seance', em: '🌅', name: 'Séance du jour', desc: 'Révisions, nouveaux mots et exercice en un bouton', color: '#e46a92' },
  { id: 'alphabet', em: '🔤', name: 'Alef-Bet', desc: 'Les 22 lettres et les voyelles', color: '#2f5bd3' },
  { id: 'histoire', em: '📖', name: 'Histoires', desc: 'Dialogue en hébreu et choisis tes réponses', color: '#c9607f' },
  { id: 'scenes', em: '🌳', name: 'Scènes', desc: 'Touche les objets pour découvrir les mots', color: '#2fae6b' },
  { id: 'conjugaison', em: '📝', name: 'Conjugaison', desc: 'Passé, présent, futur : consulte et entraîne-toi', color: '#00a6a6' },
  { id: 'grammaire', em: '📐', name: 'Grammaire', desc: 'Les règles de base, avec exercices', color: '#2a5f8a' },
  { id: 'cartes', em: '🃏', name: 'Cartes mémoire', desc: 'Révisions espacées par thème', color: '#f2b134' },
  { id: 'dictionnaire', em: '📕', name: 'Dictionnaire', desc: 'Tous tes mots, de א à ת', color: '#b5485a' },
  { id: 'jeux', em: '🎮', name: 'Jeux', desc: 'Quiz, Memory, Défi 60 s, écriture et mot caché', color: '#9b5de5' },
  { id: 'cursive', em: '🖋️', name: 'Écriture cursive', desc: 'Lire et écrire à la main, comme en Israël', color: '#6d5f8f' },
  { id: 'journal', em: '📰', name: 'Lire un journal', desc: 'Ta feuille de route vers la lecture', color: '#6b7286' },
  { id: 'chambre', em: '🛏️', name: 'Ma chambre', desc: 'Décore ta chambre et ton personnage, et fais tes achats', color: '#c75d8a' },
  { id: 'progres', em: '🏆', name: 'Mes progrès', desc: 'Niveau, série, badges', color: '#d9822b' },
];
// Le menu « constellation » : chaque page est une petite étoile, avec son nom en hébreu dans la bulle
const NOMS_HE = { '': 'הַבַּיִת', seance: 'הַשִּׁעוּר שֶׁל הַיּוֹם', alphabet: 'אָלֶף־בֵּית', grammaire: 'דִּקְדּוּק', conjugaison: 'פְּעָלִים', cartes: 'כַּרְטִיסִיּוֹת', dictionnaire: 'מִלּוֹן', jeux: 'מִשְׂחָקִים', histoire: 'סִפּוּרִים', scenes: 'תְּמוּנוֹת', cursive: 'כְּתַב יָד', journal: 'הָעִתּוֹן שֶׁלִּי', chambre: 'הַחֶדֶר שֶׁלִּי', progres: 'הַהִתְקַדְּמוּת שֶׁלִּי' };
const NOMS_RAIL = { cursive: 'Écriture cursive', journal: 'Lire un journal', seance: 'Séance du jour' };
const RAIL_GROUPES = [['', 'seance'], ['alphabet', 'grammaire', 'conjugaison', 'cartes', 'dictionnaire'], ['jeux', 'histoire', 'scenes', 'cursive'], ['journal', 'chambre', 'progres']];
const infoPage = (id) => (id === '' ? { id: '', em: '🏠', name: 'Accueil', desc: 'Ton écran d’accueil et le programme du jour' } : ACTIVITIES.find((x) => x.id === id));
$('#nav').innerHTML = RAIL_GROUPES.map((g) => g.map(infoPage).filter(Boolean).map((a) => `<a href="#/${a.id}" class="rail-etoile${a.id === 'seance' ? ' seance' : ''}" aria-label="${esc(a.name)}" data-nom="${esc(a.name)}" data-he="${esc(NOMS_HE[a.id] || '')}" data-desc="${esc(a.desc)}"><span class="rail-ic">${a.em}<b class="rail-badge" data-badge="${a.id}"></b></span><span class="rail-txt"><span class="rail-nom">${esc(NOMS_RAIL[a.id] || a.name)}</span>${NOMS_HE[a.id] ? `<span class="rail-he" lang="he" dir="rtl">${esc(NOMS_HE[a.id])}</span>` : ''}</span></a>`).join('')).join('<span class="rail-scintille" aria-hidden="true">✦</span>');
// La bulle : nom, nom hébreu et description, à côté de l'étoile survolée
(function bulleRail() {
  const bulle = $('#railBulle');
  const montrer = (lien) => {
    if (matchMedia('(max-width: 860px)').matches) return;
    bulle.innerHTML = `<b>${esc(lien.dataset.nom)}</b>${lien.dataset.he ? `<span class="he" lang="he" dir="rtl">${esc(lien.dataset.he)}</span>` : ''}<small>${esc(lien.dataset.desc || '')}</small>`;
    const r = lien.getBoundingClientRect();
    bulle.hidden = false;
    bulle.style.top = `${Math.max(8, Math.min(innerHeight - bulle.offsetHeight - 8, r.top + r.height / 2 - bulle.offsetHeight / 2))}px`;
    bulle.style.left = `${r.right + 16}px`;
    bulle.classList.remove('vu'); void bulle.offsetWidth; bulle.classList.add('vu');
  };
  const cacher = () => { bulle.hidden = true; };
  $$('#railMoi, #railPalette, .rail-logo').forEach((l) => {
    l.addEventListener('mouseenter', () => montrer(l));
    l.addEventListener('focus', () => montrer(l));
    l.addEventListener('mouseleave', cacher);
    l.addEventListener('blur', cacher);
  });
  window.addEventListener('hashchange', cacher);
  $('.rail-logo').dataset.nom = 'Ivrit'; $('.rail-logo').dataset.he = 'עִבְרִית'; $('.rail-logo').dataset.desc = 'L’hébreu, un mot après l’autre';
  $('#railPalette').dataset.nom = 'Thème'; $('#railPalette').dataset.desc = 'Choisir les couleurs du site';
  $('#railMoi').dataset.nom = 'Mes progrès'; $('#railMoi').dataset.he = NOMS_HE.progres;
  // La palette des thèmes
  const themes = $('#railThemes'), palette = $('#railPalette');
  const fermer = () => { themes.hidden = true; palette.setAttribute('aria-expanded', 'false'); };
  palette.onclick = (e) => { e.stopPropagation(); themes.hidden = !themes.hidden; palette.setAttribute('aria-expanded', String(!themes.hidden)); cacher(); };
  document.addEventListener('click', (e) => { if (!themes.hidden && !themes.contains(e.target)) fermer(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fermer(); });
})();
// Les étoiles en zigzag, reliées par les traits d'une constellation
(function constellation() {
  const nav = $('#nav');
  $$('#nav a.rail-etoile').forEach((a, i) => a.classList.toggle('decale', i % 2 === 1));
  const dessiner = () => {
    const ancien = nav.querySelector('.rail-traits');
    if (ancien) ancien.remove();
    if (matchMedia('(max-width: 860px)').matches) return;
    const base = nav.getBoundingClientRect();
    const pts = $$('#nav .rail-ic').map((ic) => { const r = ic.getBoundingClientRect(); return [r.left - base.left + r.width / 2, r.top - base.top + nav.scrollTop + r.height / 2]; });
    if (pts.length < 2) return;
    const svg = `<svg class="rail-traits" width="${nav.clientWidth}" height="${nav.scrollHeight}" aria-hidden="true"><polyline points="${pts.map((p) => p.map((v) => v.toFixed(1)).join(',')).join(' ')}"/>${pts.map((p) => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="21"/>`).join('')}</svg>`;
    nav.insertAdjacentHTML('afterbegin', svg);
  };
  window.addEventListener('resize', dessiner);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(dessiner);
  setTimeout(dessiner, 50);
  setTimeout(dessiner, 600);
})();
// L'avatar dans son anneau de niveau, et les petites pastilles (cartes à revoir, séance à faire)
function majRail() {
  const lv = level(), de = levelXp(lv), a = levelXp(lv + 1), pct = Math.max(0, Math.min(100, Math.round(((S.xp - de) / (a - de)) * 100)));
  const perso = typeof persoSvg === 'function' ? Object.assign({}, typeof CH_PERSO_DEFAUT !== 'undefined' ? CH_PERSO_DEFAUT : {}, S.perso || {}) : null;
  const moi = $('#railMoi');
  moi.style.setProperty('--p', pct);
  moi.innerHTML = `<span class="rail-avatar">${perso ? `<svg viewBox="-50 -246 100 104" aria-hidden="true">${persoSvg(perso)}</svg>` : '🙂'}</span><b class="rail-niveau">${lv}</b>`;
  moi.dataset.desc = `Niveau ${lv} · ${pct} % vers le niveau ${lv + 1} · 🔥 ${streakNow()} jour${streakNow() > 1 ? 's' : ''}`;
  const aRevoir = WORDS.filter((w) => S.cards[w.he] && isDue(w)).length;
  $$('[data-badge="cartes"]').forEach((b) => { b.textContent = aRevoir > 99 ? '99+' : aRevoir || ''; });
  $$('[data-badge="seance"]').forEach((b) => { b.textContent = S.seance === dayKey() ? '' : ' '; b.classList.toggle('point', S.seance !== dayKey()); });
}
(function flechesMenu() {
  const nav = $('#nav'), haut = $('#navHaut'), bas = $('#navBas');
  const etat = () => {
    haut.disabled = nav.scrollTop <= 1;
    bas.disabled = nav.scrollTop + nav.clientHeight >= nav.scrollHeight - 1;
  };
  const mesure = () => {
    haut.hidden = bas.hidden = true;
    const deborde = getComputedStyle(nav).flexDirection === 'column' && nav.scrollHeight > nav.clientHeight + 1;
    haut.hidden = bas.hidden = !deborde;
    etat();
  };
  const defile = (sens) => nav.scrollBy({ top: sens * nav.clientHeight * .6, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  haut.onclick = () => defile(-1);
  bas.onclick = () => defile(1);
  nav.addEventListener('scroll', etat, { passive: true });
  window.addEventListener('resize', mesure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(mesure);
  mesure();
})();

const routes = { '': home, alphabet, cartes, jeux, quiz, memoire, chrono, ecriture, progres, credits };
function route() {
  cleanup();
  stopAudio();
  Vallee.stop();
  const [view = '', ...args] = location.hash.replace(/^#\/?/, '').split('/').map(decodeURIComponent);
  (routes[view] || home)(...args);
  const actif = ['quiz', 'memoire', 'chrono', 'ecriture', 'jour', 'roles'].includes(view) ? 'jeux' : view;
  $$('#nav a').forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#/' + actif));
  header();
}
window.addEventListener('hashchange', () => { route(); window.scrollTo(0, 0); });

/* ============ Accueil ============ */
function home() {
  const w = WORDS[Math.floor(Date.now() / 864e5) % WORDS.length];
  const auj = dayKey();
  const todayXp = S.days[auj] || 0, pct = Math.min(100, Math.round((todayXp / S.goal) * 100));
  const due = WORDS.filter((x) => S.cards[x.he] && isDue(x)).length, lv = level();
  const pLv = Math.round(((S.xp - levelXp(lv)) / (levelXp(lv + 1) - levelXp(lv))) * 100);
  const h = new Date().getHours();
  const salut = h < 12 ? ['בֹּקֶר טוֹב', 'Bonjour'] : h < 18 ? ['צָהֳרַיִם טוֹבִים', 'Bon après-midi'] : h < 22 ? ['עֶרֶב טוֹב', 'Bonsoir'] : ['לַיְלָה טוֹב', 'Bonne nuit'];
  const dateFr = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  const art = typeof PRESSE !== 'undefined' ? presseDuJour() : null;
  const taches = [
    { ok: S.seance === auj, em: '🌅', nom: 'Séance du jour', sous: 'cartes, nouveaux mots et questions', href: '#/seance' },
    { ok: !!S.daily[auj], em: '🔎', nom: 'Le mot caché', sous: '+30 XP', href: '#/jour' },
    art ? { ok: S.presse.includes(art.id), em: '🗞️', nom: 'L’article du jour', sous: art.uneFr.length > 44 ? art.uneFr.slice(0, 42) + '…' : art.uneFr, href: '#/journal/jour' } : null,
    { ok: todayXp >= S.goal, em: '⭐', nom: `Objectif : ${S.goal} XP`, sous: `${todayXp} XP gagnés aujourd’hui`, href: '#/progres' },
  ].filter(Boolean);
  const faites = taches.filter((t) => t.ok).length;
  const GROUPES = [
    ['Apprendre', ['alphabet', 'grammaire', 'conjugaison', 'cursive']],
    ['S’entraîner', ['seance', 'cartes', 'jeux', 'dictionnaire']],
    ['Lire et explorer', ['histoire', 'scenes', 'journal']],
    ['Mon espace', ['chambre', 'progres']],
  ];
  const ranges = new Set(GROUPES.flatMap((g) => g[1]));
  const reste = ACTIVITIES.filter((a) => !ranges.has(a.id)).map((a) => a.id);
  if (reste.length) GROUPES[GROUPES.length - 1][1].push(...reste);
  const tuile = (id) => { const a = ACTIVITIES.find((x) => x.id === id); return a ? `<a class="acc-tuile" href="#/${a.id}" style="--c:${a.color}"><span class="acc-tuile-em">${a.em}</span><span><b>${a.name}</b><small>${a.desc}</small></span></a>` : ''; };
  app.innerHTML = `
  <section class="vallee" id="vallee">
    <div class="v-grain"></div>
    <div class="v-title"><h1>${[...'IVRIT'].map((c, i) => `<span class="ch" style="animation-delay:${(.3 + i * .14).toFixed(2)}s">${c}</span>`).join('')}</h1>
      <p>« Les fleurs paraissent sur la terre »</p><small>Cantique des cantiques 2, 12</small><span class="he" lang="he" dir="rtl">הַנִּצָּנִים נִרְאוּ בָאָרֶץ</span></div>
    <a class="btn v-go" href="${S.seance !== auj ? '#/seance' : due ? '#/cartes/tout' : '#/quiz'}">${S.seance !== auj ? 'Commencer ma séance du jour' : due ? `Réviser mes cartes (${due})` : 'Continuer avec un quiz'}</a>
  </section>
  <div class="acc-salut"><span class="he" lang="he" dir="rtl">${salut[0]}</span><span>${salut[1]} ! <small>${dateFr}</small></span></div>
  <section class="acc-bandeau">
    <a href="#/progres" class="acc-chiffre"><span class="h-ring acc-anneau" style="--p:${pLv}"><span>${lv}</span></span><span><b>Niveau ${lv}</b><small>${S.xp} XP · ${pLv} % vers le ${lv + 1}</small></span></a>
    <a href="#/progres" class="acc-chiffre"><span class="acc-gros">🔥</span><span><b>${streakNow()} jour${streakNow() > 1 ? 's' : ''}</b><small>d’affilée</small></span></a>
    <a href="#/progres" class="acc-chiffre"><span class="h-ring acc-anneau or" style="--p:${pct}"><span>${pct}%</span></span><span><b>${todayXp} / ${S.goal} XP</b><small>objectif du jour</small></span></a>
    <a href="#/chambre/boutique" class="acc-chiffre"><span class="acc-gros">₪</span><span><b>${S.sh} shekels</b><small>pour ta chambre</small></span></a>
  </section>
  <div class="acc-deux">
    <section class="card acc-programme">
      <div class="acc-titre"><h3>Ton programme du jour</h3><span class="acc-compte${faites === taches.length ? ' fini' : ''}">${faites}/${taches.length}</span></div>
      ${taches.map((t) => `<a class="acc-tache${t.ok ? ' ok' : ''}" href="${t.href}"><span class="acc-coche">${t.ok ? '✓' : ''}</span><span class="acc-tache-em">${t.em}</span><span class="acc-tache-txt"><b>${t.nom}</b><small>${esc(t.sous)}</small></span><span class="acc-fleche">›</span></a>`).join('')}
      ${faites === taches.length ? '<p class="acc-bravo">🎉 Tout est fait pour aujourd’hui, bravo !</p>' : ''}
    </section>
    <section class="card acc-mot">
      <div class="cap">Mot du jour</div>
      <span class="he acc-mot-he" lang="he" dir="rtl">${esc(w.he)}</span>
      <span class="acc-mot-tr">${esc(w.tr || '')}</span>
      <b class="acc-mot-fr">${esc(w.fr)}</b>
      ${sayBtn(w.he, '🔊 Écouter')}
    </section>
  </div>
  ${GROUPES.map(([nom, ids]) => `<section class="acc-groupe"><h3>${nom}</h3><div class="acc-tuiles">${ids.map(tuile).join('')}</div></section>`).join('')}`;
  Vallee.mount($('#vallee'));
}

/* ============ Alphabet ============ */
function alphabet(tab = 'lettres', idx) {
  const tabs = `<nav class="abc-onglets"><a href="#/alphabet/lettres" class="${tab === 'lettres' ? 'on' : ''}">Lettres</a><span>·</span><a href="#/alphabet/voyelles" class="${tab === 'voyelles' ? 'on' : ''}">Voyelles</a><span>·</span><a href="#/cursive">Cursive</a></nav>`;
  if (tab === 'voyelles') {
    app.innerHTML = `<div class="abc">
    <header class="abc-tete"><span class="he" lang="he" dir="rtl">נִקּוּד</span><h2>Les voyelles</h2><p>De petits signes placés sous ou au-dessus des consonnes. Ici sous la lettre ${HE('בּ')} : touche une case pour l’écouter.</p>${tabs}</header>
    <div class="abc-specimen abc-voy">${VOWELS.map((v) => {
      const syl = 'בּ' + v.mark;
      return `<button type="button" class="abc-case" data-say="${esc(syl)}"><span class="he" lang="he">${syl}</span><b>${v.name}</b><i>b${esc(v.sound.split(' ')[0])}</i><small>${esc(v.tip)}</small></button>`;
    }).join('')}</div>
    <p class="abc-bas"><a class="btn gold" href="#/quiz/syllabes">Lire des syllabes →</a></p>
    </div>`;
    return;
  }
  const i = idx !== undefined ? +idx : null;
  const L = i !== null ? LETTERS[i] : null;
  if (L && !S.seen.includes(L.l)) { S.seen.push(L.l); save(); addXP(2); }
  const vues = S.seen.length;
  const k0 = i !== null ? i : Math.max(0, LETTERS.findIndex((x) => !S.seen.includes(x.l)));
  const M = LETTERS[k0];
  app.innerHTML = `<div class="abc">
  <header class="abc-tete"><span class="he" lang="he" dir="rtl">אָלֶף־בֵּית</span><h2>L’Alef-Bet</h2>
    <p>22 lettres, toutes des consonnes, qui se lisent de droite à gauche.</p>
    <div class="abc-jauge"><i style="width:${(vues / 22) * 100}%"></i></div><small class="abc-compte">${vues} lettre${vues > 1 ? 's' : ''} découverte${vues > 1 ? 's' : ''} sur 22</small>
    ${tabs}
  </header>
  <section class="abc-livre${L ? '' : ' apercu'}">
    <div class="abc-page abc-page-texte">
      <span class="abc-folio">${k0 + 1} / 22</span>
      <h3>${M.name}</h3>
      <p class="abc-nomhe"><span class="he" lang="he" dir="rtl">${esc(M.he)}</span> ${sayBtn(M.he)}</p>
      <dl class="abc-fiche"><div><dt>Son</dt><dd>${esc(M.sound)}</dd></div><div><dt>Valeur</dt><dd>${M.value}</dd></div>${M.fin ? `<div><dt>Fin de mot</dt><dd><span class="he" lang="he">${M.fin}</span></dd></div>` : ''}</dl>
      <p class="abc-astuce">${esc(M.tip)}</p>
      <div class="abc-exemple"><span class="he" lang="he" dir="rtl">${esc(M.ex[0])}</span><span><i>${esc(M.ex[1])}</i> · ${esc(M.ex[2])}</span>${sayBtn(M.ex[0])}</div>
      ${L ? '' : `<a class="btn gold abc-decouvrir" href="#/alphabet/lettres/${k0}">${vues ? 'Découvrir cette lettre' : 'Commencer par Alef'} →</a>`}
    </div>
    <div class="abc-page abc-page-lettre"><span class="he" lang="he">${M.l}</span></div>
    ${k0 > 0 ? `<a class="abc-tourne gauche" href="#/alphabet/lettres/${k0 - 1}" aria-label="Lettre précédente : ${LETTERS[k0 - 1].name}">‹</a>` : ''}
    ${k0 < 21 ? `<a class="abc-tourne droite" href="#/alphabet/lettres/${k0 + 1}" aria-label="Lettre suivante : ${LETTERS[k0 + 1].name}">›</a>` : ''}
  </section>
  <div class="abc-specimen abc-lettres">${LETTERS.map((x, k) => `<a href="#/alphabet/lettres/${k}" class="abc-case${S.seen.includes(x.l) ? ' vue' : ''}${k === k0 && L ? ' sel' : ''}"><span class="he" lang="he">${x.l}</span><small>${x.name}</small></a>`).join('')}</div>
  <p class="abc-bas"><a class="btn gold" href="#/quiz/lettres">Me tester sur les lettres →</a></p>
  </div>`;
  if (L) later(() => speak(L.he), 200);
}

/* ============ Cartes mémoire (répétition espacée) ============ */
// Boîtes de Leitner : délai (en jours) avant de revoir un mot. « Bien » : +1 boîte. « Super bien » : +2 boîtes.
const INTERVALS = [0, 1, 3, 7, 14, 30];
Object.values(S.cards).forEach((c) => { if (c && c.box > INTERVALS.length - 1) c.box = INTERVALS.length - 1; });
const cardOf = (w) => S.cards[w.he] || { box: 0, due: null };
// Un mot raté repart à zéro dans les cartes et doit être réussi deux fois pour sortir de « Mes erreurs »
// Chaque raté est compté sur la durée (« Les mots qui résistent »)
const noterRate = (he) => { const k = he.normalize('NFC'); if (!S.rates) S.rates = {}; const r = S.rates[k] || { n: 0 }; r.n++; r.d = dayKey(); S.rates[k] = r; };
const noterErreur = (he) => { noterRate(he); S.erreurs[he] = 2; S.cards[he] = { box: 0, due: dayKey() }; };
const noterReussite = (he) => { if (S.erreurs[he]) { S.erreurs[he]--; if (!S.erreurs[he]) delete S.erreurs[he]; } };
const motsEnErreur = () => WORDS.filter((w, i) => S.erreurs[w.he] && WORDS.findIndex((x) => x.he === w.he) === i);
const isDue = (w) => { if (w.theme === 'dehors' && !S.found.includes(w.he.normalize('NFC'))) return false; const c = cardOf(w); return !c.due || c.due <= dayKey(); };

function cartes(theme) {
  if (!theme) {
    const COUL = ['#e46a92', '#f2b134', '#2fae6b', '#2f8fb0', '#3d5fd6', '#8a4fbf', '#c75d8a'];
    const vus = WORDS.filter((w) => S.cards[w.he]);
    const aRevoir = vus.filter(isDue).length;
    const nouveaux = WORDS.filter((w) => !S.cards[w.he] && isDue(w)).length;
    const maitrise = mastered();
    const boites = INTERVALS.map((_, b) => vus.filter((w) => (S.cards[w.he].box || 0) === b).length);
    const maxB = Math.max(1, ...boites);
    const ECH = INTERVALS.map((j) => (j === 0 ? 'le jour même' : `après ${j} jour${j > 1 ? 's' : ''}`));
    app.innerHTML = `<section class="cm-hero">
      <div class="cm-hero-txt">
        <span class="he gr-hero-he" lang="he" dir="rtl">כַּרְטִיסִיּוֹת</span>
        <h2>Cartes mémoire</h2>
        <p>Retourne la carte, puis dis honnêtement si tu savais. Les mots connus reviennent de plus en plus tard : c’est la répétition espacée.</p>
        <div class="gr-chiffres"><span><b>${maitrise}</b> / ${WORDS.length} mots maîtrisés</span><span><b>${vus.length}</b> mots déjà vus</span></div>
      </div>
      <div class="cm-pile" aria-hidden="true"><i></i><i></i><i><span class="he" lang="he" dir="rtl">זִכָּרוֹן</span><small>la mémoire</small></i></div>
    </section>
    <a class="card cm-jour" href="#/cartes/tout">
      <span class="cm-jour-em">✨</span>
      <span class="cm-jour-txt"><small>Révision du jour</small><b>${aRevoir ? `${aRevoir} carte${aRevoir > 1 ? 's' : ''} à revoir` : 'Rien à revoir'}${nouveaux ? ` · ${nouveaux} nouveaux mots` : ''}</b><span>Une séance : 12 cartes au plus, environ 2 minutes.</span></span>
      <span class="btn gold">C’est parti →</span></a>
    <div class="card cm-boites">
      <div class="cm-boites-tete"><b>📦 Tes boîtes</b><small>« Bien » fait monter le mot d’une boîte, « super bien » de deux : il revient plus tard. « À revoir » le renvoie dans la boîte 1.</small></div>
      <div class="cm-barres" style="grid-template-columns:repeat(${INTERVALS.length}, 1fr)">${boites.map((n, b) => `<div class="cm-boite" style="--h:${(n / maxB) * 100}%;--c:${COUL[b]}" title="Boîte ${b + 1} : revient ${ECH[b]}"><span class="cm-n">${n}</span><span class="cm-col"><i></i></span><b>${b + 1}</b><small>${ECH[b]}</small></div>`).join('')}</div>
      ${vus.length ? '' : '<p class="hint center" style="margin:8px 0 0">Tes boîtes se rempliront dès ta première séance.</p>'}
    </div>
    <div class="cm-filtres">${[['tous', 'Tous les thèmes'], ['revoir', 'À revoir'], ['finis', 'Maîtrisés']].map(([k, n], i) => `<button type="button" data-f="${k}" class="${i ? '' : 'on'}" aria-pressed="${!i}">${n}</button>`).join('')}</div>
    <div class="cm-themes">${THEMES.map((t, k) => {
      const ws = themeWords(t.id), m = mastered(ws), d = ws.filter((w) => S.cards[w.he] && isDue(w)).length, nv = ws.filter((w) => !S.cards[w.he] && isDue(w)).length, fini = m === ws.length;
      return `<a class="cm-theme${fini ? ' fini' : ''}" href="#/cartes/${t.id}" data-revoir="${d ? 1 : 0}" data-fini="${fini ? 1 : 0}" style="--c:${COUL[k % COUL.length]}">
        <span class="cm-theme-he he" lang="he" dir="rtl" aria-hidden="true">${esc(ws[0].he)}</span>
        <span class="cm-theme-em">${t.emoji}</span><b>${t.name}</b>
        <span class="cm-theme-bas"><span class="cm-mini"><i style="width:${(m / ws.length) * 100}%"></i></span><small>${m}/${ws.length}</small></span>
        ${d ? `<span class="cm-badge">${d} à revoir</span>` : fini ? '<span class="cm-badge ok">✓ Maîtrisé</span>' : nv ? `<span class="cm-badge neuf">${nv} nouveaux</span>` : '<span class="cm-badge calme">À jour</span>'}</a>`;
    }).join('')}</div>
    <p class="hint center" id="cmVide" hidden>Aucun thème dans cette catégorie pour l’instant.</p>`;
    $$('.cm-filtres button').forEach((b) => (b.onclick = () => {
      $$('.cm-filtres button').forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
      let n = 0;
      $$('.cm-theme').forEach((t) => { const ok = b.dataset.f === 'tous' || (b.dataset.f === 'revoir' ? t.dataset.revoir === '1' : t.dataset.fini === '1'); t.hidden = !ok; if (ok) n++; });
      $('#cmVide').hidden = n > 0;
    }));
    return;
  }
  // Les cartes à revoir d'abord, puis les nouveaux mots pour compléter la séance
  const dus = themeWords(theme).filter(isDue);
  let queue = [...shuffle(dus.filter((w) => S.cards[w.he])), ...shuffle(dus.filter((w) => !S.cards[w.he]))].slice(0, 12);
  if (!queue.length) {
    app.innerHTML = `<div class="card center result"><div class="em">😌</div><h2>Rien à réviser ici aujourd’hui !</h2><p class="sub">Tes cartes reviendront au bon moment.</p><div class="row" style="justify-content:center"><a class="btn" href="#/cartes">Autres thèmes</a><a class="btn ghost" href="#/quiz">Faire un quiz</a></div></div>`;
    return;
  }
  const total = queue.length; let doneCount = 0, known = 0;
  const pile = [];
  const revenir = () => { const p = pile.pop(); if (!p) return; queue = p.queue; doneCount = p.doneCount; known = p.known; p.w._retry = p.retry; if (p.carte) S.cards[p.w.he] = p.carte; else delete S.cards[p.w.he]; if (p.gains) { S.xp = p.gains.xp; S.sh = p.gains.sh; S.days[dayKey()] = p.gains.jour; header(); } save(); show(); };
  const show = () => {
    if (!queue.length) {
      const avantGain = { xp: S.xp, sh: S.sh, jour: S.days[dayKey()] || 0 };
      addXP(known * 3 + 5);
      app.innerHTML = `<div class="card center result"><div class="em">🎉</div><h2>Séance terminée !</h2><p class="score">${known} / ${total}</p><p class="sub">reconnus du premier coup · +${known * 3 + 5} XP</p><div class="row" style="justify-content:center"><a class="btn" href="#/cartes">Autres thèmes</a><a class="btn gold" href="#/quiz/mots/${theme}">Quiz sur ce thème</a></div></div>`;
      if (known === total) confetti();
      pile[pile.length - 1].gains = avantGain;
      $('.result').insertAdjacentHTML('beforeend', '<p class="center mt"><button class="btn ghost" id="precedente" type="button">← Revenir à la dernière carte</button></p>');
      $('#precedente').onclick = revenir;
      return;
    }
    const w = queue[0]; const c = cardOf(w);
    app.innerHTML = `<div class="q-head"><span>${themeName(theme)}</span><span>${doneCount}/${total}</span></div>
    <div class="progress"><i style="width:${(doneCount / total) * 100}%"></i></div>
    <div class="flip" id="flip">
      <div class="flip-in">
        <div class="face"><span class="big">${HE(w.he)}</span>${sayBtn(w.he)}<span class="hint">${c.due ? 'Boîte ' + (c.box + 1) : 'Nouveau mot'} · touche pour retourner</span></div>
        <div class="face back"><span class="big">${HE(w.he)}</span><span class="tr">${esc(w.tr)}</span><span class="fr">${esc(w.fr)}</span></div>
      </div>
    </div>
    <div class="row mt" style="justify-content:center" id="ans" hidden>
      <button class="btn red" id="no">😕 À revoir</button>
      <button class="btn green" id="yes">🙂 Bien</button>
      <button class="btn gold" id="super">🌟 Super bien</button>
    </div>
    <p class="center hint">Touche la carte pour la retourner autant que tu veux. Clavier : Espace pour retourner, ← à revoir, → bien, ↑ super bien, Retour pour revenir.</p>
    ${pile.length ? '<p class="center"><button class="btn ghost" id="precedente" type="button">↩ Carte précédente</button></p>' : ''}`;
    later(() => speak(w.he), 250);
    const flip = () => { $('#flip').classList.toggle('on'); $('#ans').hidden = false; };
    if ($('#precedente')) $('#precedente').onclick = revenir;
    $('#flip').onclick = flip;
    const answer = (ok, saut = 1) => {
      const cur = cardOf(w);
      pile.push({ queue: [...queue], doneCount, known, w, retry: w._retry, carte: S.cards[w.he] ? { ...S.cards[w.he] } : null });
      if (ok) {
        const box = Math.min(cur.box + saut, INTERVALS.length - 1);
        S.cards[w.he] = { box, due: addDays(INTERVALS[box]) };
        if (!w._retry) known++;
        queue.shift(); doneCount++;
      } else {
        if (!w._retry) noterRate(w.he);
        S.cards[w.he] = { box: 0, due: dayKey() };
        w._retry = true; queue.push(queue.shift());
      }
      save(); show();
    };
    $('#yes').onclick = () => answer(true);
    $('#super').onclick = () => answer(true, 2);
    $('#no').onclick = () => answer(false);
    keyHandler = (e) => {
      if (e.key === ' ') { e.preventDefault(); flip(); }
      else if (e.key === 'Backspace' && pile.length) { e.preventDefault(); revenir(); }
      else if (!$('#ans').hidden && e.key === 'ArrowRight') answer(true);
      else if (!$('#ans').hidden && e.key === 'ArrowUp') { e.preventDefault(); answer(true, 2); }
      else if (!$('#ans').hidden && e.key === 'ArrowLeft') answer(false);
    };
  };
  queue = queue.map((w) => ({ ...w }));
  show();
}

/* ============ Quiz ============ */
const QUIZ_MODES = [
  { id: 'lettres', em: '🔤', name: 'Lettres', desc: 'Reconnais chaque lettre' },
  { id: 'syllabes', em: '🧩', name: 'Syllabes', desc: 'Lis consonne + voyelle' },
  { id: 'mots', em: '📖', name: 'Hébreu → Français', desc: 'Que veut dire ce mot ?', themed: true },
  { id: 'inverse', em: '🔁', name: 'Français → Hébreu', desc: 'Trouve le bon mot hébreu', themed: true },
  { id: 'ecoute', em: '👂', name: 'Écoute', desc: 'Comprends le mot prononcé', themed: true },
];
function syllables() {
  const out = [];
  SYLL_CONS.forEach(([c, s]) => VOWELS.forEach((v) => {
    if (v.name === 'Shva') return;
    const base = c === 'ו' ? 'ו' : c;
    if (c === 'ו' && /ו/.test(v.mark)) return;
    out.push({ he: base + v.mark, ans: s + v.sound });
  }));
  return out;
}
function options(correct, pool, n = 4) {
  const vus = new Set([strip(correct)]), others = [];
  shuffle(pool).forEach((p) => { if (others.length < n - 1 && !vus.has(strip(p))) { vus.add(strip(p)); others.push(p); } });
  return shuffle([correct, ...others]);
}
function buildQuiz(mode, theme) {
  const N = 10;
  if (mode === 'lettres') {
    return pick(LETTERS, N).map((L) => ({ prompt: `<div class="he" lang="he">${L.l}</div><p class="sub">Quelle est cette lettre ?</p>`, say: L.he, answer: L.name, opts: options(L.name, LETTERS.map((x) => x.name)), he: false, after: `${L.name} — son « ${L.sound} »` }));
  }
  if (mode === 'syllabes') {
    const all = syllables();
    return pick(all, N).map((s) => ({ prompt: `<div class="he" lang="he">${s.he}</div><p class="sub">Comment se lit cette syllabe ?</p>`, answer: s.ans, opts: options(s.ans, all.map((x) => x.ans)), say: s.he }));
  }
  const pool = mode === 'erreurs' ? motsEnErreur() : mode === 'resistent' && typeof motsQuiResistent === 'function' ? motsQuiResistent().map((x) => x.w) : themeWords(theme);
  const wide = pool.length >= 6 ? pool : WORDS;
  return pick(pool, Math.min(N, pool.length)).map((w) => {
    const genre = mode === 'erreurs' || mode === 'resistent' ? pick(['mots', 'inverse', 'ecoute'], 1)[0] : mode;
    if (genre === 'inverse') return { w, prompt: `<div class="fr">${esc(w.fr)}</div><p class="sub">Comment dit-on en hébreu ?</p>`, answer: w.he, opts: options(w.he, wide.map((x) => x.he)), he: true, say: w.he };
    if (genre === 'ecoute') return { w, prompt: `<button class="btn gold" data-say="${esc(w.he)}" style="font-size:2rem">🔊</button><p class="sub">Écoute et choisis la traduction</p>`, answer: w.fr, opts: options(w.fr, wide.map((x) => x.fr)), say: w.he, autoplay: true, after: w.he };
    return { w, prompt: `<div>${HE(w.he)}</div><div>${sayBtn(w.he)}</div><p class="sub">Que signifie ce mot ?</p>`, answer: w.fr, opts: options(w.fr, wide.map((x) => x.fr)), say: w.he };
  });
}
const JEUX = [['jeux', '🎮 Tous les jeux'], ['quiz', '❓ Quiz'], ['memoire', '🧠 Memory'], ['chrono', '⚡ Défi 60 s'], ['ecriture', '✍️ Écriture'], ['jour', '🔎 Mot caché']];
const ongletsJeux = (actif) => `<div class="tabs tabs-jeux">${JEUX.map(([id, nom]) => `<a href="#/${id}" class="${actif === id ? 'on' : ''}">${nom}</a>`).join('')}</div>`;
function jeux() {
  const nbErr = motsEnErreur().length;
  const fait = !!S.daily[dayKey()];
  const precision = S.stats.q ? Math.round((S.stats.ok / S.stats.q) * 100) : null;
  const J = [
    { id: 'quiz', em: '❓', nom: 'Quiz', desc: '10 questions, 5 façons de jouer : lettres, syllabes, mots, traduction et écoute.', info: S.stats.quiz ? `${S.stats.quiz} quiz joué${S.stats.quiz > 1 ? 's' : ''} · ${precision} % de réussite` : 'Premier quiz à faire', c1: '#3d5fd6', c2: '#8a4fbf', he: 'שְׁאֵלָה' },
    { id: 'memoire', em: '🧠', nom: 'Memory', desc: 'Retourne les cartes et associe chaque mot à sa traduction.', info: S.best.memory ? `🏆 Record : ${S.best.memory} coups` : 'Aucun record', c1: '#e46a92', c2: '#f29a5a', he: 'זִכָּרוֹן' },
    { id: 'chrono', em: '⚡', nom: 'Défi 60 s', desc: 'Le plus de bonnes réponses possible en une minute.', info: S.best.chrono ? `🏆 Record : ${S.best.chrono} point${S.best.chrono > 1 ? 's' : ''}` : 'Aucun record', c1: '#f2a12e', c2: '#e0524f', he: 'מַהֵר' },
    { id: 'ecriture', em: '✍️', nom: 'Écriture', desc: 'Écris les mots hébreux, lettre par lettre.', info: S.written ? `${S.written} mot${S.written > 1 ? 's' : ''} écrit${S.written > 1 ? 's' : ''}` : 'À toi d’écrire', c1: '#2fae6b', c2: '#2f8fb0', he: 'כְּתִיבָה' },
    { id: 'roles', em: '🎭', nom: 'Jeux de rôle', desc: 'Restaurant, médecin, marché : tes réponses changent la fin de l’histoire.', info: (() => { const n = Object.values(S.roles || {}).reduce((x, l) => x + l.length, 0); return n ? `${n} fin${n > 1 ? 's' : ''} découverte${n > 1 ? 's' : ''}` : 'Nouveau !'; })(), c1: '#8a4fbf', c2: '#e46a92', he: 'תַּפְקִיד' },
    { id: 'jour', em: '🔎', nom: 'Mot caché', desc: 'Le défi du jour : trouve le mot mystère.', info: fait ? '✓ Réussi aujourd’hui' : '+30 XP à gagner', c1: '#5a3aa8', c2: '#1f1660', he: 'סוֹד', badge: fait ? '' : 'Défi du jour' },
  ];
  app.innerHTML = `<section class="jv-salle">
    <div class="jv-salle-txt">
      <span class="he gr-hero-he" lang="he" dir="rtl">מִשְׂחָקִים</span>
      <h2>Salle de jeux</h2>
      <p>Apprendre en s’amusant : choisis un jeu. Chaque partie rapporte des XP.</p>
      <div class="gr-chiffres"><span><b>${S.stats.quiz}</b> quiz joué${S.stats.quiz > 1 ? 's' : ''}</span><span><b>${precision === null ? '–' : precision + ' %'}</b> de réussite</span><span><b>${S.written}</b> mot${S.written > 1 ? 's' : ''} écrit${S.written > 1 ? 's' : ''}</span></div>
    </div>
    <div class="jv-des" aria-hidden="true"><span>🎲</span><span>🃏</span><span>🎯</span></div>
  </section>
  ${nbErr ? `<a class="card jv-erreurs" href="#/erreurs"><span class="jv-erreurs-em">🎯</span><span class="jv-erreurs-txt"><b>Retravailler mes erreurs</b><small>${nbErr} mot${nbErr > 1 ? 's' : ''} raté${nbErr > 1 ? 's' : ''} récemment : un petit quiz rien que pour eux.</small></span><span class="btn">C’est parti →</span></a>` : ''}
  <div class="jv-grille">${J.map((j, k) => `<a class="jv-carte${k === 0 ? ' grand' : ''}" href="#/${j.id}" style="--c1:${j.c1};--c2:${j.c2}">
    <span class="he jv-he" lang="he" dir="rtl" aria-hidden="true">${j.he}</span>
    ${j.badge ? `<span class="jv-badge">${j.badge}</span>` : ''}
    <span class="jv-em">${j.em}</span><b>${j.nom}</b><small>${j.desc}</small>
    <span class="jv-bas"><span class="jv-info">${j.info}</span><span class="jv-jouer">Jouer →</span></span></a>`).join('')}</div>`;
}
function quiz(mode, theme = 'tout') {
  if (!mode) {
    let sel = 'mots';
    const nbErr = motsEnErreur().length;
    app.innerHTML = `<h2>Jeux</h2>${ongletsJeux('quiz')}<p class="sub">10 questions. Enchaîne les bonnes réponses pour un combo 🔥 et plus d’XP !</p>
    ${nbErr ? `<p><a class="btn" href="#/erreurs">🎯 Retravailler mes erreurs (${nbErr})</a></p>` : ''}
    <div class="modes">${QUIZ_MODES.map((m) => `<button class="mode ${m.id === sel ? 'on' : ''}" data-m="${m.id}"><span style="font-size:1.6rem">${m.em}</span><b>${m.name}</b><small>${m.desc}</small></button>`).join('')}</div>
    <div class="row"><label>Thème : <select class="select" id="th"><option value="tout">Tous les thèmes</option>${THEMES.map((t) => `<option value="${t.id}">${t.emoji} ${t.name}</option>`).join('')}</select></label>
    <button class="btn gold" id="go">C’est parti !</button></div>`;
    $$('.mode').forEach((b) => (b.onclick = () => { sel = b.dataset.m; $$('.mode').forEach((x) => x.classList.toggle('on', x === b)); $('#th').disabled = !QUIZ_MODES.find((m) => m.id === sel).themed; }));
    $('#go').onclick = () => (location.hash = `#/quiz/${sel}/${$('#th').value}`);
    return;
  }
  const qs = buildQuiz(mode, theme);
  if (mode === 'erreurs' && !qs.length) { location.hash = '#/erreurs'; return; }
  if (mode === 'resistent' && !qs.length) { location.hash = '#/resistent'; return; }
  let k = 0, score = 0, combo = 0, xp = 0;
  const modeInfo = mode === 'erreurs' ? { em: '🎯', name: 'Mes erreurs' } : mode === 'resistent' ? { em: '🧱', name: 'Les mots qui résistent' } : QUIZ_MODES.find((m) => m.id === mode) || QUIZ_MODES[2];
  const show = () => {
    if (k >= qs.length) return finish();
    const q = qs[k];
    app.innerHTML = `<div class="q-head"><span>${modeInfo.em} ${modeInfo.name}${modeInfo.themed ? ' · ' + themeName(theme) : ''}</span><span class="combo">${combo >= 2 ? `🔥 x${combo}` : ''}</span><span>${k + 1}/${qs.length}</span></div>
    <div class="progress"><i style="width:${(k / qs.length) * 100}%"></i></div>
    <div class="card"><div class="prompt">${q.prompt}</div>
    <div class="opts">${q.opts.map((o, j) => `<button class="opt ${q.he ? 'he' : ''}" data-j="${j}" ${q.he ? 'lang="he" dir="rtl"' : ''}><kbd>${j + 1}</kbd>${esc(o)}</button>`).join('')}</div>
    ${S.jokers > 0 ? `<p class="center"><button class="btn ghost" id="joker">🎯 Joker 50/50 (${S.jokers})</button></p>` : ''}
    <p class="center hint" id="fb">&nbsp;</p></div>`;
    if (q.autoplay) later(() => speak(q.say), 300);
    let locked = false;
    const choose = (j) => {
      if (locked) return; locked = true;
      const ok = q.opts[j] === q.answer;
      if (q.w) { if (ok) noterReussite(q.w.he); else noterErreur(q.w.he); save(); }
      const suite = `${q.after ? '· ' + esc(q.after) : ''}${q.w ? `<span class="tr-x"> · ${esc(q.w.tr)}</span>` : ''}`;
      $$('.opt').forEach((b, x) => { b.disabled = true; if (q.opts[x] === q.answer) b.classList.add('ok'); else if (x === j) b.classList.add('ko'); });
      S.stats.q++; if (ok) { lucioles($$('.opt')[j]); S.stats.ok++; score++; combo++; const g = 8 + Math.min(combo, 5) * 2; xp += g; $('#fb').innerHTML = `✅ Bravo ! +${g} XP ${suite}`; }
      else { combo = 0; $('#fb').innerHTML = `❌ La bonne réponse : <b>${esc(q.answer)}</b> ${suite}`; }
      if (q.say && mode !== 'ecoute') speak(q.say);
      later(() => { k++; show(); }, ok ? 1100 : 2200);
    };
    $$('.opt').forEach((b) => (b.onclick = () => choose(+b.dataset.j)));
    const jk = $('#joker');
    if (jk) jk.onclick = () => { S.jokers--; save(); jk.remove(); pick(q.opts.map((o, x) => x).filter((x) => q.opts[x] !== q.answer), 2).forEach((x) => { const o = $(`.opt[data-j="${x}"]`); o.disabled = true; o.style.visibility = 'hidden'; }); };
    keyHandler = (e) => { const n = +e.key; if (n >= 1 && n <= q.opts.length) choose(n - 1); };
  };
  const finish = () => {
    S.stats.quiz++; save();
    if (score === qs.length) { S.perfect++; save(); confetti(); }
    addXP(xp);
    const em = score === qs.length ? '🏆' : score >= qs.length * 0.7 ? '🎉' : score >= qs.length / 2 ? '👍' : '💪';
    app.innerHTML = `<div class="card center result"><div class="em">${em}</div><h2>${score === qs.length ? 'Sans faute !' : 'Quiz terminé'}</h2><p class="score">${score} / ${qs.length}</p><p class="sub">+${xp} XP</p>
    <div class="row" style="justify-content:center"><a class="btn gold" href="#/quiz/${mode}/${theme}" id="again">${mode === 'erreurs' ? 'Voir mes erreurs' : mode === 'resistent' ? 'Revoir ces mots' : 'Rejouer'}</a><a class="btn ghost" href="#/quiz">Changer de quiz</a></div></div>`;
    $('#again').onclick = (e) => { e.preventDefault(); if (mode === 'erreurs') location.hash = '#/erreurs'; else if (mode === 'resistent') location.hash = '#/resistent'; else quiz(mode, theme); };
  };
  show();
}

/* ============ Memory ============ */
function memoire(theme) {
  if (!theme) {
    app.innerHTML = `<h2>Jeux</h2>${ongletsJeux('memoire')}<p class="sub">Retourne deux cartes : associe chaque mot hébreu à sa traduction. Le moins de coups possible !</p>
    <div class="themes">${[{ id: 'tout', emoji: '🎲', name: 'Mélange surprise' }, ...THEMES].map((t) => `<a class="theme" href="#/memoire/${t.id}"><span class="em">${t.emoji}</span> <b>${t.name}</b></a>`).join('')}</div>
    ${S.best.memory ? `<p class="sub mt">Record : ${S.best.memory} coups</p>` : ''}`;
    return;
  }
  const words = pick(themeWords(theme).filter((w) => w.he.length <= 14), 6);
  const cards = shuffle(words.flatMap((w, i) => [{ i, he: true, t: w.he }, { i, he: false, t: w.fr }]));
  let open = [], moves = 0, found = 0, busy = false;
  app.innerHTML = `<div class="q-head"><span>🧠 ${themeName(theme)}</span><span id="mv">0 coup</span></div>
  <div class="mem">${cards.map((c, k) => `<button class="mc" data-k="${k}">?</button>`).join('')}</div>
  <p class="center hint mt">Astuce : chaque mot hébreu est prononcé quand tu le retournes.</p>`;
  const els = $$('.mc');
  els.forEach((el) => (el.onclick = () => {
    const k = +el.dataset.k; const c = cards[k];
    if (busy || el.classList.contains('up')) return;
    el.classList.add('up', c.he ? 'he' : 'fr');
    if (c.he) { el.setAttribute('lang', 'he'); speak(c.t); }
    el.textContent = c.t;
    open.push(k);
    if (open.length === 2) {
      moves++; $('#mv').textContent = `${moves} coup${moves > 1 ? 's' : ''}`;
      const [a, b] = open;
      if (cards[a].i === cards[b].i) {
        els[a].classList.add('done'); els[b].classList.add('done'); open = []; found++;
        if (found === words.length) later(end, 600);
      } else {
        busy = true;
        later(() => { [a, b].forEach((x) => { els[x].className = 'mc'; els[x].textContent = '?'; els[x].removeAttribute('lang'); }); open = []; busy = false; }, 1100);
      }
    }
  }));
  const end = () => {
    const bonus = moves <= 10 ? 25 : moves <= 14 ? 10 : 0;
    if (!S.best.memory || moves < S.best.memory) S.best.memory = moves;
    save(); addXP(25 + bonus); if (bonus) confetti();
    app.innerHTML = `<div class="card center result"><div class="em">🧠</div><h2>Toutes les paires trouvées !</h2><p class="score">${moves} coups</p><p class="sub">+${25 + bonus} XP · record : ${S.best.memory} coups</p>
    <div class="themes" style="text-align:left">${words.map((w) => `<div class="theme">${HE(w.he)} ${sayBtn(w.he)}<br><small>${TRS(w.tr)}${esc(w.fr)}</small></div>`).join('')}</div>
    <div class="row mt" style="justify-content:center"><a class="btn gold" href="#/memoire/${theme}" id="again">Rejouer</a><a class="btn ghost" href="#/memoire">Changer de thème</a></div></div>`;
    $('#again').onclick = (e) => { e.preventDefault(); memoire(theme); };
  };
}

/* ============ Défi 60 secondes ============ */
function chrono(start) {
  if (start !== 'go') {
    app.innerHTML = `<h2>Jeux</h2>${ongletsJeux('chrono')}<div class="card center"><div style="font-size:3.5rem">⚡</div><h2>Défi 60 secondes</h2>
    <p class="sub">Un mot hébreu, une traduction : vrai ou faux ? Bonne réponse +1, mauvaise réponse −1. Chaque mot est prononcé.<br>Clavier : ← faux, → vrai.</p>
    <p><b>Record : ${S.best.chrono} point${S.best.chrono > 1 ? 's' : ''}</b></p>
    <a class="btn gold" href="#/chrono/go">Démarrer</a></div>`;
    return;
  }
  let t = 60, score = 0, cur, over = false;
  app.innerHTML = `<div class="card center" id="box">
    <div class="q-head"><span>Score : <b id="sc">0</b></span><span class="timer" id="tm">60</span><button class="say" id="muet" type="button" title="Couper ou remettre le son">${S.chronoMuet ? '🔇' : '🔊'}</button></div>
    <div class="pair" id="pair"></div>
    <div class="tf mt"><button class="btn red" id="f">✗</button><button class="btn green" id="v">✓</button></div></div>`;
  const next = () => {
    const w = WORDS[(Math.random() * WORDS.length) | 0];
    const truth = Math.random() < 0.5;
    let fr = w.fr;
    if (!truth) { let o; do { o = WORDS[(Math.random() * WORDS.length) | 0]; } while (o.fr === w.fr); fr = o.fr; }
    cur = { truth, w };
    $('#pair').innerHTML = `${HE(w.he)} ${sayBtn(w.he)}<span>= ${esc(fr)} ?</span>`;
    if (!S.chronoMuet) speak(w.he);
  };
  const answer = (v) => {
    if (over) return;
    const ok = v === cur.truth;
    score = Math.max(0, score + (ok ? 1 : -1));
    $('#sc').textContent = score;
    const box = $('#box'); box.classList.remove('flash-ok', 'flash-ko'); void box.offsetWidth; box.classList.add(ok ? 'flash-ok' : 'flash-ko');
    if (!ok) { noterErreur(cur.w.he); save(); toast(`${cur.w.he} = ${cur.w.fr}`); }
    next();
  };
  $('#v').onclick = () => answer(true);
  $('#f').onclick = () => answer(false);
  $('#muet').onclick = (e) => { S.chronoMuet = !S.chronoMuet; save(); e.target.textContent = S.chronoMuet ? '🔇' : '🔊'; if (S.chronoMuet) stopAudio(); else speak(cur.w.he); };
  keyHandler = (e) => { if (e.key === 'ArrowRight') answer(true); if (e.key === 'ArrowLeft') answer(false); };
  next();
  every(() => {
    t--; const tm = $('#tm'); if (!tm) return;
    tm.textContent = t; tm.classList.toggle('low', t <= 10);
    if (t <= 0) {
      over = true; cleanup(); stopAudio();
      const record = score > S.best.chrono;
      if (record) { S.best.chrono = score; save(); confetti(); }
      addXP(score * 3);
      app.innerHTML = `<div class="card center result"><div class="em">${record ? '🏆' : '⏱️'}</div><h2>${record ? 'Nouveau record !' : 'Temps écoulé !'}</h2><p class="score">${score} point${score > 1 ? 's' : ''}</p><p class="sub">+${score * 3} XP · record : ${S.best.chrono}</p>
      <div class="row" style="justify-content:center"><a class="btn gold" href="#/chrono" id="again">Rejouer</a><a class="btn ghost" href="#/cartes">Réviser mes cartes</a></div></div>`;
      $('#again').onclick = (e) => { e.preventDefault(); chrono('go'); };
    }
  }, 1000);
}

/* ============ Atelier d'écriture ============ */
const LETTER_ONLY = (s) => [...strip(s)].filter((ch) => /[א-ת]/.test(ch));
function ecriture() {
  const pool = WORDS.filter((w) => !/\s/.test(w.he) && LETTER_ONLY(w.he).length >= 2 && LETTER_ONLY(w.he).length <= 6);
  const round = pick(pool, 5);
  let k = 0, good = 0, xp = 0;
  const show = () => {
    if (k >= round.length) {
      addXP(xp);
      app.innerHTML = `<div class="card center result"><div class="em">✍️</div><h2>Atelier terminé</h2><p class="score">${good} / ${round.length}</p><p class="sub">+${xp} XP · ${S.written} mots écrits au total</p>
      <div class="row" style="justify-content:center"><a class="btn gold" href="#/ecriture" id="again">Encore !</a><a class="btn ghost" href="#/alphabet">Revoir l’alphabet</a></div></div>`;
      $('#again').onclick = (e) => { e.preventDefault(); ecriture(); };
      if (good === round.length) confetti();
      return;
    }
    const w = round[k];
    const target = LETTER_ONLY(w.he);
    const extra = pick(LETTERS.map((L) => L.l).filter((l) => !target.includes(l)), Math.max(2, 7 - target.length));
    const tiles = shuffle([...target, ...extra]);
    let typed = [], hints = 0;
    app.innerHTML = `${k === 0 ? `<h2>Jeux</h2>${ongletsJeux('ecriture')}` : ''}<div class="q-head"><span>✍️ Atelier d’écriture</span><span>${k + 1}/${round.length}</span></div>
    <div class="progress"><i style="width:${(k / round.length) * 100}%"></i></div>
    <div class="card center">
      <p class="sub">Écris en hébreu (sans voyelles), de droite à gauche :</p>
      <div class="fr" style="font-size:1.8rem;font-weight:800">${esc(w.fr)}</div>
      <div class="tr">${esc(w.tr)} ${sayBtn(w.he)}</div>
      <div class="slots" id="slots"></div>
      <div class="tiles" id="tiles">${tiles.map((l, j) => `<button class="tl" data-j="${j}" lang="he">${l}</button>`).join('')}</div>
      <div class="row mt" style="justify-content:center">
        <button class="btn ghost" id="hint">💡 Indice</button>
        <button class="btn ghost" id="clr">↺ Effacer</button>
        <button class="btn green" id="chk">Vérifier</button>
      </div>
      <p class="hint" id="fb">Rappel : les lettres ך ם ן ף ץ ne s’utilisent qu’en fin de mot.</p>
    </div>`;
    const render = () => {
      $('#slots').innerHTML = typed.map((j, x) => `<button class="tl" data-x="${x}" lang="he">${tiles[j]}</button>`).join('');
      $$('#tiles .tl').forEach((b) => b.classList.toggle('used', typed.includes(+b.dataset.j)));
      $$('#slots .tl').forEach((b) => (b.onclick = () => { typed.splice(+b.dataset.x, 1); render(); }));
    };
    $$('#tiles .tl').forEach((b) => (b.onclick = () => { if (!typed.includes(+b.dataset.j)) { typed.push(+b.dataset.j); render(); } }));
    $('#clr').onclick = () => { typed = []; render(); };
    $('#hint').onclick = () => {
      // garde le début correct puis ajoute la lettre suivante
      let ok = 0; while (ok < typed.length && tiles[typed[ok]] === target[ok]) ok++;
      typed = typed.slice(0, ok);
      if (ok < target.length) {
        const j = tiles.findIndex((l, x) => l === target[ok] && !typed.includes(x));
        typed.push(j); hints++; render();
      }
    };
    let done = false;
    $('#chk').onclick = () => {
      if (done) return;
      const guess = typed.map((j) => tiles[j]).join('');
      if (guess === target.join('')) {
        done = true; good++; S.written++; save();
        const g = Math.max(4, 14 - hints * 4); xp += g;
        $('#fb').innerHTML = `✅ Parfait ! ${HE(w.he)} +${g} XP`;
        speak(w.he);
        later(() => { k++; show(); }, 1600);
      } else {
        $('#slots').classList.remove('shake'); void $('#slots').offsetWidth; $('#slots').classList.add('shake');
        $('#fb').innerHTML = `Pas tout à fait… La réponse : <span class="he" lang="he" style="font-size:1.8rem">${target.join('')}</span> <button class="btn ghost" id="skip">Mot suivant →</button>`;
        done = true;
        $('#skip').onclick = () => { k++; show(); };
      }
    };
  };
  show();
}

/* ============ Progrès ============ */
function progres() {
  const lv = level(), from = levelXp(lv), to = levelXp(lv + 1);
  const pLv = Math.round(((S.xp - from) / (to - from)) * 100);
  const days = [...Array(7)].map((_, i) => { const d = new Date(); d.setDate(d.getDate() - (6 - i)); return { k: dayKey(d), lab: d.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', '') }; });
  const max = Math.max(S.goal, ...days.map((d) => S.days[d.k] || 0));
  const semaine = days.reduce((t, d) => t + (S.days[d.k] || 0), 0);
  const precision = S.stats.q ? Math.round((S.stats.ok / S.stats.q) * 100) : null;
  const temps = `${S.stats.sec >= 3600 ? Math.floor(S.stats.sec / 3600) + ' h ' : ''}${Math.floor((S.stats.sec % 3600) / 60)} min`;
  const gram = typeof GRAMMAIRE !== 'undefined' ? GRAMMAIRE.filter((l) => S.grammaire[l.id]).length : 0;
  const articles = S.articles.length + (S.presse ? S.presse.length : 0);
  const nbErr = motsEnErreur().length;
  const tuile = (em, val, nom, sous, pct) => `<div class="pg-tuile"><span class="pg-tuile-em">${em}</span><b>${val}</b><span>${nom}</span>${pct !== undefined ? `<span class="pg-mini"><i style="width:${pct}%"></i></span>` : ''}<small>${sous}</small></div>`;
  const themesTri = THEMES.map((t) => ({ t, m: mastered(t.words.map(([he]) => ({ he }))), n: t.words.length })).sort((a, b) => b.m / b.n - a.m / a.n);
  app.innerHTML = `<section class="pg-hero">
    <div class="h-ring pg-anneau" style="--p:${pLv}"><span><small>Niveau</small>${lv}</span></div>
    <div class="pg-hero-txt">
      <span class="he gr-hero-he" lang="he" dir="rtl">הַהִתְקַדְּמוּת שֶׁלִּי</span>
      <h2>Mes progrès</h2>
      <p>${S.xp} XP au total · encore <b>${to - S.xp} XP</b> pour le niveau ${lv + 1}</p>
      <div class="gr-chiffres"><span>🔥 <b>${streakNow()}</b> jour${streakNow() > 1 ? 's' : ''} d’affilée</span><span>⭐ <b>${semaine}</b> XP cette semaine</span><span>₪ <b>${S.sh}</b></span></div>
    </div>
  </section>
  <div class="pg-tuiles">
    ${tuile('🃏', mastered(), 'mots maîtrisés', `sur ${WORDS.length}`, (mastered() / WORDS.length) * 100)}
    ${tuile('🔤', S.seen.length, 'lettres découvertes', 'sur 22', (S.seen.length / 22) * 100)}
    ${tuile('📐', gram, 'leçons de grammaire', `sur ${typeof GRAMMAIRE !== 'undefined' ? GRAMMAIRE.length : 0}`, typeof GRAMMAIRE !== 'undefined' ? (gram / GRAMMAIRE.length) * 100 : 0)}
    ${tuile('🎯', precision === null ? '–' : precision + ' %', 'de réussite aux quiz', `${S.stats.quiz} quiz terminé${S.stats.quiz > 1 ? 's' : ''}`)}
    ${tuile('📰', articles, 'articles lus', 'petits articles et article du jour')}
    ${tuile('⏱️', temps, 'd’étude', `${S.found.length} mots trouvés dans les scènes`)}
  </div>
  ${typeof pointsFaibles === 'function' ? pointsFaibles() : ''}
  <div class="pg-deux">
    <section class="card pg-carte">
      <div class="pg-carte-tete"><h3>Ces 7 derniers jours</h3><label class="pg-objectif">Objectif <select class="select" id="goal">${[20, 50, 100, 150].map((g) => `<option ${g === S.goal ? 'selected' : ''} value="${g}">${g} XP</option>`).join('')}</select></label></div>
      <div class="pg-semaine" style="--obj:${(S.goal / max) * 100}%">
        <span class="pg-ligne-obj" title="Objectif : ${S.goal} XP"></span>
        ${days.map((d, i) => { const v = S.days[d.k] || 0; return `<div class="${v >= S.goal ? 'ok' : ''}${i === 6 ? ' auj' : ''}"><span>${v || ''}</span><i style="height:${(v / max) * 80}%"></i><small>${i === 6 ? 'auj.' : d.lab}</small></div>`; }).join('')}
      </div>
    </section>
    <section class="card pg-carte">
      <div class="pg-carte-tete"><h3>Assiduité</h3><small>28 derniers jours</small></div>
      <div class="cal28 pg-cal">${[...Array(28)].map((_, i) => { const d = new Date(); d.setDate(d.getDate() - (27 - i)); const k = dayKey(d), v = S.days[k] || 0; return `<i class="${v >= S.goal ? 'l2' : v > 0 ? 'l1' : ''}${i === 27 ? ' auj' : ''}" title="${k} : ${v} XP">${d.getDate()}</i>`; }).join('')}</div>
      <p class="pg-legende"><span><i class="l1"></i>étudié</span><span><i class="l2"></i>objectif atteint</span><span>🧊 ${S.freezes} gel${S.freezes > 1 ? 's' : ''}</span></p>
    </section>
  </div>
  <section class="card pg-carte">
    <div class="pg-carte-tete"><h3>Badges</h3><small>${S.badges.length} / ${BADGES.length} gagnés</small></div>
    <div class="pg-badges">${[...BADGES].sort((a, b) => S.badges.includes(b.id) - S.badges.includes(a.id)).map((b) => `<div class="pg-badge${S.badges.includes(b.id) ? '' : ' off'}" title="${esc(b.desc)}"><span class="em">${b.em}</span><b>${b.name}</b><small>${b.desc}</small></div>`).join('')}</div>
  </section>
  <section class="card pg-carte">
    <div class="pg-carte-tete"><h3>Vocabulaire par thème</h3><small>maîtrisé = reconnu 3 fois de suite</small></div>
    <div class="pg-themes">${themesTri.map(({ t, m, n }) => `<a class="pg-theme" href="#/cartes/${t.id}"><span>${t.emoji}</span><span class="pg-theme-nom">${t.name}</span><span class="pg-mini"><i style="width:${(m / n) * 100}%"></i></span><small>${m}/${n}</small></a>`).join('')}</div>
  </section>
  <section class="pg-outils">
    <a class="card pg-outil" href="#/bilan"><span>📊</span><b>Bilan de la semaine</b><small>Ce que tu as appris, et tes objectifs</small></a>
    <a class="card pg-outil" href="#/voyage"><span>🧳</span><b>Mon voyage en Israël</b><small>${typeof etapesAtteintes === 'function' ? etapesAtteintes() : 0} / 7 étapes atteintes</small></a>
    <a class="card pg-outil" href="#/erreurs"><span>🎯</span><b>Mes erreurs</b><small>${nbErr ? `${nbErr} mot${nbErr > 1 ? 's' : ''} à retravailler` : 'Rien à retravailler'}</small></a>
    <a class="card pg-outil" href="#/sons"><span>🎧</span><b>Vérifier les sons</b><small>Signaler un mot mal prononcé</small></a>
    <a class="card pg-outil" href="#/credits"><span>🎙️</span><b>Crédits des voix</b><small>${Object.keys(HUMAN).length} mots enregistrés par de vraies personnes</small></a>
  </section>
  <div class="section" id="sauvegarde"></div>`;
  sauvegardeUI();
  $('#goal').onchange = (e) => { S.goal = +e.target.value; save(); toast('Objectif mis à jour'); progres(); };
}

/* ============ Crédits des enregistrements ============ */
function credits() {
  const rows = Object.entries(HUMAN).map(([he, v]) => ({ he, ...v, w: WORDS.find((w) => w.he.normalize('NFC') === he) }));
  const speakers = [...new Set(rows.map((r) => r.auteur))];
  const missing = WORDS.filter((w) => !HUMAN[w.he.normalize('NFC')]);
  app.innerHTML = `<h2>🎙️ Crédits des voix</h2>
  <p class="sub">Les mots ci-dessous sont prononcés par de vraies personnes, locutrices et locuteurs de l’hébreu, qui ont partagé leurs enregistrements sous licence libre sur
  <a href="https://lingualibre.org" target="_blank" rel="noopener" style="color:var(--blue)">Lingua Libre</a> (Wikimedia Commons). Merci à ${speakers.map(esc).join(', ') || '—'} !</p>
  <p class="sub">🖋️ Les lettres cursives sont des dessins de Dan Pelleg, placés dans le domaine public (<a href="https://commons.wikimedia.org/wiki/File:Hebrew_letter_Alef_handwriting.svg" target="_blank" rel="noopener" style="color:var(--blue)">Wikimedia Commons</a>).</p>
  <p class="sub">🗣️ Les phrases des thèmes « Phrases du quotidien », « Demander quelque chose » et « En cas de problème » viennent de <a href="https://tatoeba.org" target="_blank" rel="noopener" style="color:var(--blue)">Tatoeba</a> (CC BY 2.0 FR) et du guide de conversation de <a href="https://en.wikivoyage.org/wiki/Hebrew_phrasebook" target="_blank" rel="noopener" style="color:var(--blue)">Wikivoyage</a> (CC BY-SA 4.0). Elles ont été adaptées : voyelles et translittération ajoutées, traductions françaises revues.</p>
  <div class="card"><table style="width:100%;border-collapse:collapse">
    <tr style="text-align:left"><th>Mot</th><th>Sens</th><th>Voix</th><th>Licence</th><th></th></tr>
    ${rows.map((r) => `<tr style="border-top:1px solid var(--line)"><td>${HE(r.he)}</td><td>${esc(r.w ? r.w.fr : '')}</td><td>${esc(r.auteur)}</td><td><a href="${esc(r.source)}" target="_blank" rel="noopener" style="color:var(--blue)">${esc(r.licence || 'voir')}</a></td><td>${sayBtn(r.he)}</td></tr>`).join('')}
  </table></div>
  <p class="hint mt">Les ${missing.length} autres mots, ainsi que les noms des lettres et les syllabes, utilisent une voix de synthèse (Microsoft Hila), faute d’enregistrement humain disponible.</p>`;
}

