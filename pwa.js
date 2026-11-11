'use strict';
/* ============ L'appli sur le téléphone : installation et hors connexion ============
   Sur ce PC (« Lancer Ivrit », localhost), rien ne s'active : les modifications s'affichent toujours tout de suite. */
(() => {
  const LOCAL = ['localhost', '127.0.0.1'].includes(location.hostname) || location.protocol === 'file:';
  const PRIS_EN_CHARGE = 'serviceWorker' in navigator && 'caches' in window && !LOCAL;
  if (PRIS_EN_CHARGE) navigator.serviceWorker.register('sw.js').catch(() => {});

  // Installation : Android et Chrome proposent un bouton ; l'iPhone passe par le menu Partager
  let invite = null;
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); invite = e; majCarte(); });
  window.addEventListener('appinstalled', () => { invite = null; toast('📲 Ivrit est installée sur cet appareil'); majCarte(); });
  const installee = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const iPhone = /iPhone|iPad|iPod/.test(navigator.userAgent);

  // Tous les sons du site (mêmes adresses que celles que joue le lecteur)
  const adressesSons = () => {
    const a = new Set();
    Object.values(window.SONS || {}).forEach((f) => a.add(new URL(`audio/${f}?v=2`, location.href).href));
    Object.values(window.VOIX || {}).forEach((v) => a.add(new URL(`audio/humain/${v.fichier}`, location.href).href));
    return [...a];
  };
  let telechargement = null; // { fait, total, arret }
  async function compterSons() {
    const c = await caches.open('ivrit-sons'), deja = new Set((await c.keys()).map((r) => r.url));
    const toutes = adressesSons();
    return { deja, toutes, nb: toutes.filter((u) => deja.has(u)).length };
  }
  async function toutTelecharger() {
    if (navigator.storage && navigator.storage.persist) { try { await navigator.storage.persist(); } catch (e) { /* tant pis */ } }
    const { deja, toutes } = await compterSons();
    const reste = toutes.filter((u) => !deja.has(u));
    telechargement = { fait: toutes.length - reste.length, total: toutes.length, arret: false, erreurs: 0 };
    majCarte();
    const c = await caches.open('ivrit-sons');
    let i = 0;
    const ouvrier = async () => {
      while (i < reste.length && !telechargement.arret) {
        const u = reste[i++];
        try { const r = await fetch(u, { cache: 'no-store' }); if (r.ok) await c.put(u, r); else telechargement.erreurs++; }
        catch (e) { telechargement.erreurs++; if (!navigator.onLine) telechargement.arret = true; }
        telechargement.fait++;
        if (telechargement.fait % 25 === 0) majProgression();
      }
    };
    await Promise.all([...Array(6)].map(ouvrier));
    const fini = !telechargement.arret;
    telechargement = null;
    toast(fini ? '📥 Tous les sons sont sur cet appareil' : '⏸️ Téléchargement des sons interrompu : tu pourras le reprendre');
    majCarte();
  }
  function majProgression() {
    const p = document.getElementById('horsLigneProg');
    if (p && telechargement) { p.value = telechargement.fait; p.max = telechargement.total; }
    const t = document.getElementById('horsLigneTxt');
    if (t && telechargement) t.textContent = `${telechargement.fait} / ${telechargement.total} sons`;
  }

  /* ---------- La carte « Sur ton téléphone », dans Mes progrès ---------- */
  async function majCarte() {
    const z = document.getElementById('appliCarte');
    if (!z) return;
    if (LOCAL) {
      z.innerHTML = `<p class="sub" style="margin:0">Pour avoir Ivrit comme une appli, même sans réseau, ouvre la version en ligne sur ton téléphone : <a href="https://kanori-jpg.github.io/ivrit/" target="_blank" rel="noopener">kanori-jpg.github.io/ivrit</a>. Cette version-ci, lancée depuis ton ordinateur, n’en a pas besoin.</p>`;
      return;
    }
    if (!PRIS_EN_CHARGE) { z.innerHTML = '<p class="sub" style="margin:0">Ce navigateur ne permet pas le mode hors connexion. Essaie avec Chrome, Edge ou Safari.</p>'; return; }
    const install = installee() ? '<p style="margin:0 0 10px"><b>✅ Ivrit est installée comme une appli sur cet appareil.</b></p>'
      : invite ? '<p style="margin:0 0 6px">Ajoute Ivrit à ton écran d’accueil : elle s’ouvrira en plein écran, comme une appli.</p><p style="margin:0 0 12px"><button class="btn" id="appliInstaller">📲 Installer l’appli</button></p>'
      : iPhone ? '<p style="margin:0 0 12px">Pour l’installer : touche <b>Partager</b> (le carré avec une flèche), puis <b>Sur l’écran d’accueil</b>.</p>'
      : '<p style="margin:0 0 12px">Pour l’installer : ouvre le menu du navigateur <b>⋮</b>, puis <b>Ajouter à l’écran d’accueil</b> (ou <b>Installer l’application</b>).</p>';
    let sons = '';
    if (telechargement) {
      sons = `<p style="margin:0 0 6px">📥 Téléchargement des sons… <span id="horsLigneTxt">${telechargement.fait} / ${telechargement.total} sons</span></p>
        <progress id="horsLigneProg" value="${telechargement.fait}" max="${telechargement.total}" style="width:100%"></progress>
        <p style="margin:8px 0 0"><button class="btn ghost" id="horsLigneStop">⏸️ Mettre en pause</button></p>`;
    } else {
      const { nb, toutes } = await compterSons();
      const tout = nb >= toutes.length;
      sons = `<p style="margin:0 0 6px"><b>${tout ? '✅ Tous les sons sont sur cet appareil' : `🔊 ${nb} son${nb > 1 ? 's' : ''} sur ${toutes.length} gardé${nb > 1 ? 's' : ''} sur cet appareil`}</b></p>
        <p class="hint" style="margin:0 0 10px">Les pages marchent sans réseau dès la deuxième ouverture. Les sons, eux, sont gardés quand tu les écoutes${tout ? '.' : ' : télécharge-les tous pour que chaque mot ait sa voix, même dans le métro ou en avion (environ 120 Mo, de préférence en Wi-Fi).'}</p>
        ${tout ? '' : `<p style="margin:0"><button class="btn" id="horsLigneGo">📥 Télécharger tous les sons</button></p>`}`;
    }
    z.innerHTML = install + sons;
    const b = document.getElementById('appliInstaller');
    if (b) b.onclick = async () => { const e = invite; invite = null; if (e) { e.prompt(); await e.userChoice.catch(() => null); } majCarte(); };
    const go = document.getElementById('horsLigneGo');
    if (go) go.onclick = () => { if (!navigator.onLine) return toast('Il faut du réseau pour télécharger les sons.'); toutTelecharger(); };
    const stop = document.getElementById('horsLigneStop');
    if (stop) stop.onclick = () => { if (telechargement) telechargement.arret = true; };
  }

  // La carte se place sous la synchronisation, dans Mes progrès
  const sauvegardeUIAvant = sauvegardeUI;
  sauvegardeUI = function (...args) {
    sauvegardeUIAvant.apply(this, args);
    const zone = $('#sauvegarde');
    if (zone && !document.getElementById('appliCarte')) zone.insertAdjacentHTML('beforeend', '<h3 style="margin-top:22px">📱 Ivrit sur ton téléphone, même sans réseau</h3><div class="card" id="appliCarte"></div>');
    majCarte();
  };
  if (document.getElementById('sauvegarde')) sauvegardeUI();
  window.IvritAppli = { majCarte, compterSons };
})();
