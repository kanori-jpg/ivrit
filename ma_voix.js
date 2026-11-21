'use strict';
/* ============ Ma voix : enregistrer soi-même un son ============
   Le bouton 🎙️ (bulle qui suit chaque son, page « Écouter et signaler les sons ») ouvre l'enregistreur.
   L'enregistrement est gardé dans le navigateur (IndexedDB « ivrit-voix »), sur cet appareil seulement,
   et passe avant toutes les autres voix (fichierAudio dans app.js lit window.MA_VOIX). */
window.MA_VOIX = {}; // texte (NFC) → adresse blob: à jouer
const MV_BASE = 'ivrit-voix', MV_TABLE = 'sons', MV_MAX = 8000; // 8 s au plus par enregistrement

function mvOuvrir() {
  return new Promise((ok, ko) => {
    if (!window.indexedDB) return ko(new Error('pas d’IndexedDB'));
    const r = indexedDB.open(MV_BASE, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(MV_TABLE);
    r.onsuccess = () => ok(r.result);
    r.onerror = () => ko(r.error);
  });
}
async function mvTransaction(mode, faire) {
  const db = await mvOuvrir();
  return new Promise((ok, ko) => {
    const tx = db.transaction(MV_TABLE, mode), table = tx.objectStore(MV_TABLE);
    const r = faire(table);
    tx.oncomplete = () => { db.close(); ok(r && r.result); };
    tx.onerror = () => { db.close(); ko(tx.error); };
  });
}
const mvPoser = (k, blob) => { if (MA_VOIX[k]) URL.revokeObjectURL(MA_VOIX[k]); MA_VOIX[k] = URL.createObjectURL(blob); };

// Au démarrage : on recharge tes enregistrements
(async () => {
  try {
    const db = await mvOuvrir();
    const tx = db.transaction(MV_TABLE, 'readonly'), table = tx.objectStore(MV_TABLE);
    table.openCursor().onsuccess = (e) => { const c = e.target.result; if (c) { mvPoser(c.key, c.value); c.continue(); } };
    tx.oncomplete = () => db.close();
  } catch (e) { /* navigateur sans IndexedDB : la fonction reste simplement vide */ }
})();

async function mvGarder(k, blob) {
  await mvTransaction('readwrite', (t) => t.put(blob, k));
  mvPoser(k, blob);
  // ta voix remplace le son : un ancien 🚩 n'a plus lieu d'être
  if (S.sonsAvis[k] === 'faux') { S.sonsAvis[k] = 'ok'; save(); if (typeof envoyerAvis === 'function') envoyerAvis(k, 'aucun'); }
}
async function mvSupprimer(k) {
  await mvTransaction('readwrite', (t) => t.delete(k));
  if (MA_VOIX[k]) URL.revokeObjectURL(MA_VOIX[k]);
  delete MA_VOIX[k];
}
// Met à jour la ligne de la page des sons, si elle est affichée
function mvMajLigne(k) {
  document.querySelectorAll('.son-ligne').forEach((d) => {
    const b = d.querySelector('[data-ma-voix]');
    if (b && NFC(b.dataset.maVoix) === k) { const em = d.querySelector('em'); if (em) em.textContent = ` · ${sourceSon(k)}`; b.classList.toggle('on', !!MA_VOIX[k]); }
  });
}

// L'enregistreur
function ouvrirMaVoix(texte) {
  const k = NFC(texte);
  stopAudio();
  if (!navigator.mediaDevices || !window.MediaRecorder) { toast('Ce navigateur ne permet pas d’enregistrer le micro.'); return; }
  const w = WORDS.find((x) => NFC(x.he) === k);
  const fond = document.createElement('div');
  fond.className = 'bl-fenetre mv-fenetre';
  fond.innerHTML = `<div class="card bl-carte mv-carte" role="dialog" aria-label="Enregistrer ma voix">
    <div class="bl-titre"><span>🎙️</span><h2>Ma voix</h2></div>
    <div class="mv-mot">${HE(k)}${w ? `<small>${w.tr ? TRS(w.tr) : ''}${esc(w.fr)}</small>` : ''}</div>
    <p class="hint">Prononce le mot toi-même : ton enregistrement remplacera le son partout sur le site, sur cet appareil.</p>
    <div class="mv-ligne"><span class="mv-lab">Son actuel</span><button type="button" class="btn ghost" id="mvActuel">🔊 ${MA_VOIX[k] ? 'Ma voix actuelle' : esc(sourceSon(k))}</button></div>
    <div class="mv-enreg">
      <button type="button" class="mv-rec" id="mvRec" aria-label="Enregistrer"><span></span></button>
      <div class="mv-etat" id="mvEtat">Appuie sur le bouton rouge et parle.</div>
    </div>
    <div class="row mv-actions">
      <button type="button" class="btn ghost" id="mvEcoute" disabled>▶ Réécouter</button>
      <button type="button" class="btn gold" id="mvGarde" disabled>💾 Garder ma voix</button>
    </div>
    <div class="row mv-bas">
      ${MA_VOIX[k] ? '<button type="button" class="btn ghost" id="mvSuppr">🗑 Revenir au son du site</button>' : ''}
      <button type="button" class="btn ghost" id="mvFermer">Fermer</button>
    </div></div>`;
  document.body.appendChild(fond);
  const q = (s) => fond.querySelector(s);
  let flux = null, rec = null, morceaux = [], blob = null, url = null, minuteur = null, debut = 0, aff = null;
  const etat = (t) => { q('#mvEtat').textContent = t; };
  const couperMicro = () => { if (flux) flux.getTracks().forEach((t) => t.stop()); flux = null; };
  const fermer = () => {
    clearTimeout(minuteur); clearInterval(aff);
    if (rec && rec.state !== 'inactive') { rec.onstop = null; rec.stop(); }
    couperMicro(); stopAudio();
    if (url) URL.revokeObjectURL(url);
    fond.remove(); document.removeEventListener('keydown', touche, true);
  };
  const touche = (e) => { if (e.key === 'Escape') { e.stopPropagation(); fermer(); } };
  document.addEventListener('keydown', touche, true);
  fond.addEventListener('click', (e) => { if (e.target === fond) fermer(); });
  q('#mvFermer').onclick = fermer;
  q('#mvActuel').onclick = () => speakSansBulle(k);

  const arreter = () => { clearTimeout(minuteur); clearInterval(aff); if (rec && rec.state === 'recording') rec.stop(); };
  q('#mvRec').onclick = async () => {
    if (rec && rec.state === 'recording') return arreter();
    stopAudio();
    try { flux = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } }); } catch (e) {
      etat('Micro refusé ou introuvable : autorise le micro pour ce site dans le navigateur, puis réessaie.'); return;
    }
    morceaux = [];
    rec = new MediaRecorder(flux);
    rec.ondataavailable = (e) => { if (e.data && e.data.size) morceaux.push(e.data); };
    rec.onstop = () => {
      couperMicro();
      q('#mvRec').classList.remove('en-cours');
      blob = new Blob(morceaux, { type: rec.mimeType || 'audio/webm' });
      if (url) URL.revokeObjectURL(url);
      url = URL.createObjectURL(blob);
      q('#mvEcoute').disabled = false; q('#mvGarde').disabled = false;
      etat('Écoute-toi : si ça te va, garde-le ; sinon, recommence.');
      q('#mvEcoute').click();
    };
    rec.start();
    debut = Date.now();
    q('#mvRec').classList.add('en-cours');
    etat('🔴 Enregistrement… appuie de nouveau pour arrêter');
    aff = setInterval(() => etat(`🔴 Enregistrement… ${((Date.now() - debut) / 1000).toFixed(1)} s · appuie pour arrêter`), 200);
    minuteur = setTimeout(arreter, MV_MAX);
  };
  q('#mvEcoute').onclick = () => {
    if (!url) return;
    stopAudio();
    player = LECTEUR; player.onended = null; player.onerror = null;
    player.src = url; player.playbackRate = 1; player.play().catch(() => {});
  };
  q('#mvGarde').onclick = async () => {
    if (!blob) return;
    try { await mvGarder(k, blob); } catch (e) { etat('Impossible de garder l’enregistrement sur cet appareil (navigation privée ?).'); return; }
    mvMajLigne(k); fermer();
    toast('🎙️ Ta voix est gardée : c’est elle qu’on entendra pour ce mot');
  };
  if (q('#mvSuppr')) q('#mvSuppr').onclick = async () => {
    try { await mvSupprimer(k); } catch (e) { /* rien */ }
    mvMajLigne(k); fermer();
    toast('Le son du site est revenu');
  };
}

// Tous les boutons 🎙️ du site
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-ma-voix]'); if (!b) return;
  e.stopPropagation();
  ouvrirMaVoix(b.dataset.maVoix);
});
