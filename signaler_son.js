'use strict';
/* ============ Signaler un son mal prononcé, de n'importe où ============
   Après chaque son, une petite bulle « 🚩 Mal prononcé ? » apparaît quelques secondes.
   Le signalement est gardé dans S.sonsAvis et envoyé au serveur local (serveur.py),
   qui l'écrit dans audio/signalements.json pour que Claude remplace le son.
   Quand un son a été refait (audio/refaits.js), son signalement est effacé pour que tu le réécoutes. */
const SONS_REFAITS = window.SONS_REFAITS || {};
// Le serveur des signalements n'existe que sur ce PC (« Lancer Ivrit ») ; en ligne, on garde les signalements dans le navigateur
const SERVEUR_SONS = location.protocol.startsWith('http') && ['localhost', '127.0.0.1'].includes(location.hostname);

// Les sons refaits depuis ta dernière visite : on efface leur 🚩 et on les met en tête des « sons corrigés »
(() => {
  if (!S.sonsRefaitVu) S.sonsRefaitVu = {};
  let change = false;
  Object.entries(SONS_REFAITS).forEach(([k, n]) => {
    if (S.sonsRefaitVu[k] === n) return;
    if (S.sonsAvis[k] === 'faux') delete S.sonsAvis[k];
    S.sonsRefaitVu[k] = n; change = true;
  });
  if (change) save();
  if (window.SONS_A_ECOUTER) {
    const deja = new Set(window.SONS_A_ECOUTER.refaits.map(NFC));
    window.SONS_A_ECOUTER.refaits = [...Object.keys(SONS_REFAITS).filter((k) => !deja.has(NFC(k))), ...window.SONS_A_ECOUTER.refaits];
  }
})();

// Ce qu'on sait d'un texte hébreu (pour que Claude s'y retrouve)
function infosSon(he) {
  const k = NFC(he), w = WORDS.find((x) => NFC(x.he) === k);
  return { he: k, tr: w ? w.tr : '', fr: w ? w.fr : '', source: sourceSon(he) };
}

// Envoie un avis au serveur local. Renvoie true si le serveur l'a bien reçu.
async function envoyerAvis(he, avis, infos) {
  if (!SERVEUR_SONS) return false;
  try {
    const r = await fetch('api/signalements', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...infosSon(he), ...(infos || {}), he: NFC(he), avis }) });
    return r.ok;
  } catch (e) { return false; }
}

// Au démarrage : les 🚩 que le serveur n'a pas encore reçus (anciens, ou signalés hors connexion) lui sont envoyés
let serveurSonsOk = null;
(async () => {
  if (!SERVEUR_SONS) { serveurSonsOk = false; return; }
  try {
    const r = await fetch('api/signalements', { cache: 'no-store' });
    if (!r.ok) throw new Error();
    const recus = await r.json();
    serveurSonsOk = true;
    for (const [k, a] of Object.entries(S.sonsAvis)) if (a === 'faux' && !(recus[k] && recus[k].etat === 'a_refaire')) await envoyerAvis(k, 'faux');
  } catch (e) { serveurSonsOk = false; }
  if (typeof majTransmission === 'function') majTransmission();
})();

// Le texte « comment me transmettre », sur la page des sons
function majTransmission() {
  const z = document.getElementById('sonTransmis');
  if (!z) return;
  z.textContent = serveurSonsOk
    ? '✅ Tes signalements arrivent directement chez Claude : dis-lui simplement « j’ai signalé des sons » pour qu’il les remplace.'
    : 'Le site n’est pas ouvert avec « Lancer Ivrit » : copie la liste et colle-la dans ta conversation avec Claude.';
}

// Marquer un son faux (ou annuler) depuis la bulle
function signalerSon(he, faux) {
  const k = NFC(he), infos = infosSon(k); // la voix entendue, avant que le signalement ne la change
  if (faux) S.sonsAvis[k] = 'faux'; else delete S.sonsAvis[k];
  save();
  envoyerAvis(k, faux ? 'faux' : 'aucun', infos).then((ok) => {
    if (faux) toast(ok ? '🚩 Son signalé : Claude le remplacera par une autre voix' : '🚩 Son signalé (pense à le transmettre à Claude depuis Mes progrès › Vérifier les sons)');
  });
}

// La bulle qui suit chaque son
let bulleSon = null, minuteurBulle = null;
function montrerBulleSon(texte) {
  const k = NFC(texte);
  if (!/[א-ת]/.test(k) || location.hash.startsWith('#/sons')) return;
  if (!bulleSon) {
    bulleSon = document.createElement('div');
    bulleSon.className = 'bulle-son';
    bulleSon.setAttribute('role', 'status');
    document.body.appendChild(bulleSon);
  }
  const dessiner = () => {
    const faux = S.sonsAvis[k] === 'faux';
    bulleSon.innerHTML = `<span class="he" lang="he" dir="rtl">${esc(k.length > 40 ? k.slice(0, 40) + '…' : k)}</span>
      <button type="button" class="bulle-son-btn${faux ? ' on' : ''}">${faux ? '🚩 Signalé · annuler' : '🚩 Mal prononcé ?'}</button>`;
    bulleSon.querySelector('button').onclick = (e) => { e.stopPropagation(); signalerSon(k, S.sonsAvis[k] !== 'faux'); dessiner(); garder(); };
  };
  const garder = () => { clearTimeout(minuteurBulle); minuteurBulle = setTimeout(() => bulleSon.classList.remove('vu'), 6000); };
  dessiner();
  bulleSon.classList.add('vu');
  garder();
}

// Chaque lecture passe par speak : on l'enveloppe pour afficher la bulle
const speakSansBulle = speak;
speak = (texte, ...reste) => { const p = speakSansBulle(texte, ...reste); try { montrerBulleSon(texte); } catch (e) {} return p; };
