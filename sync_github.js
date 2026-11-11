'use strict';
/* ============ Synchronisation de la progression entre appareils ============
   La progression est rangée dans un gist secret du compte GitHub, sous le nom ivrit-progression.json.
   Chaque appareil garde son propre code d'accès (permission « gist » seulement), dans ce navigateur uniquement :
   il n'est jamais mis dans la progression ni dans les fichiers de sauvegarde.
   Quand deux appareils ont progressé chacun de leur côté, on fusionne : on garde le meilleur des deux. */
(() => {
  const KEY_SYNC = 'ivrit-sync', API = 'https://api.github.com', FICHIER = 'ivrit-progression.json';
  const setItemOrig = Storage.prototype.setItem;
  const lireConf = () => { try { return JSON.parse(localStorage.getItem(KEY_SYNC) || '{}') || {}; } catch { return {}; } };
  let conf = lireConf();
  const ecrireConf = () => setItemOrig.call(localStorage, KEY_SYNC, JSON.stringify(conf));
  const actif = () => !!(conf.token && conf.gistId);
  const nomAppareil = () => (/iPhone|Android.+Mobile/.test(navigator.userAgent) ? 'téléphone' : /iPad|Android/.test(navigator.userAgent) ? 'tablette' : 'ordinateur');

  /* ---------- Fusion de deux progressions ---------- */
  const estObj = (v) => v && typeof v === 'object' && !Array.isArray(v);
  const canon = (v) => (Array.isArray(v) ? `[${v.map(canon).join(',')}]` : estObj(v) ? `{${Object.keys(v).sort().map((k) => JSON.stringify(k) + ':' + canon(v[k])).join(',')}}` : JSON.stringify(v));
  const vide = (d) => !(d.xp > 0) && !Object.keys(d.cards || {}).length;
  const REGLAGES_OBJETS = ['chambre', 'perso']; // la chambre et le personnage : on garde l'appareil le plus récent
  function fusionner(local, distant, localPlusRecent) {
    // « base » : l'appareil le plus récent (ses réglages l'emportent) ; une progression vide ne l'emporte jamais
    const [base, autre] = vide(local) ? [distant, local] : vide(distant) ? [local, distant] : localPlusRecent ? [local, distant] : [distant, local];
    const r = JSON.parse(JSON.stringify(base));
    Object.keys(autre).forEach((k) => {
      const a = r[k], b = autre[k];
      if (a === undefined || a === null) { if (b !== undefined) r[k] = b; return; }
      switch (k) {
        case 'cards': // pour chaque mot, la carte la plus avancée
          Object.entries(b || {}).forEach(([w, cb]) => { const ca = a[w]; if (!ca || (cb.box || 0) > (ca.box || 0) || ((cb.box || 0) === (ca.box || 0) && (cb.due || '') > (ca.due || ''))) a[w] = cb; });
          return;
        case 'days': Object.entries(b || {}).forEach(([d, x]) => { a[d] = Math.max(a[d] || 0, x || 0); }); return;
        case 'xp': case 'written': case 'perfect': r[k] = Math.max(a || 0, b || 0); return;
        case 'best': case 'stats': Object.entries(b || {}).forEach(([kk, x]) => { if (typeof x === 'number') a[kk] = Math.max(a[kk] || 0, x); }); return;
        case 'lastDay': case 'seance': case 'lastExport': if ((b || '') > (a || '')) r[k] = b; return;
        case 'mesMots': { const vus = new Set(a.map((m) => NFC(m[0]))); (b || []).forEach((m) => { if (!vus.has(NFC(m[0]))) a.push(m); }); return; }
        default:
          if (Array.isArray(a) && Array.isArray(b)) { const vus = new Set(a.map(canon)); b.forEach((x) => { if (!vus.has(canon(x))) a.push(x); }); }
          else if (estObj(a) && estObj(b) && !REGLAGES_OBJETS.includes(k)) Object.entries(b).forEach(([kk, x]) => { if (!(kk in a)) a[kk] = x; });
          // nombres (shekels, jokers…) et réglages : ceux de l'appareil le plus récent
      }
    });
    // La série de jours : celle de l'appareil qui a joué le plus récemment
    if ((autre.lastDay || '') > (base.lastDay || '')) r.streak = autre.streak;
    return r;
  }
  // Ne garder que des valeurs du bon type (comme pour une sauvegarde par fichier)
  const nettoyer = (p) => lireSauvegarde(JSON.stringify({ application: 'ivrit', progression: p })).progression;

  /* ---------- Échanges avec GitHub ---------- */
  class ErreurJeton extends Error {}
  async function gh(chemin, options = {}) {
    const r = await fetch(API + chemin, { ...options, cache: 'no-store', headers: { Authorization: 'Bearer ' + conf.token, Accept: 'application/vnd.github+json', ...(options.body ? { 'Content-Type': 'application/json' } : {}) } });
    if (r.status === 401) throw new ErreurJeton('Le code d’accès n’est plus valable (expiré ou supprimé).');
    if (r.status === 404 && chemin.startsWith('/gists/')) throw new Error('Le fichier de synchronisation est introuvable sur GitHub.');
    if (!r.ok) throw new Error(`GitHub a répondu ${r.status}.`);
    return r.status === 204 ? null : r.json();
  }
  async function lireDistant() {
    const g = await gh('/gists/' + conf.gistId);
    const f = g.files && g.files[FICHIER];
    if (!f) return null;
    const texte = f.truncated ? await (await fetch(f.raw_url, { cache: 'no-store' })).text() : f.content;
    try { return JSON.parse(texte); } catch { return null; }
  }
  const contenu = (progression, savedAt) => JSON.stringify({ application: 'ivrit', version: 1, savedAt, appareil: nomAppareil(), progression });

  // Mettre la progression fusionnée en place, sans recharger la page
  function appliquer(p) {
    const avant = new Set(S.mesMots.map((m) => NFC(m[0])));
    Object.keys(p).forEach((k) => { S[k] = p[k]; });
    setItemOrig.call(localStorage, KEY, JSON.stringify(S));
    S.mesMots.filter((m) => !avant.has(NFC(m[0]))).forEach((m) => { if (typeof inscrireMot === 'function') inscrireMot(m); });
    if (typeof header === 'function') header();
    // On redessine la page, sauf au milieu d'un exercice
    if (!/^#\/(seance|quiz|memoire|chrono|ecriture|conjexo|controle|roles\/|histoire\/[^/]+\/jouer|cartes\/)/.test(location.hash)) route();
  }

  let enCours = null;
  function synchroniser() {
    if (!actif()) return Promise.resolve();
    if (enCours) return enCours;
    enCours = (async () => {
      try {
        const distant = await lireDistant();
        const local = JSON.parse(localStorage.getItem(KEY) || '{}');
        let resultat = local;
        if (distant && distant.progression) {
          const d = nettoyer(distant.progression);
          resultat = fusionner(local, d, (conf.localAt || 0) >= (distant.savedAt || 0));
          if (canon(resultat) !== canon(local)) {
            // Première fusion sur cet appareil : on garde une copie, pour pouvoir revenir en arrière
            if (!conf.copieFaite) { setItemOrig.call(localStorage, KEY_AVANT, JSON.stringify(local)); conf.copieFaite = true; }
            appliquer(resultat);
          }
        }
        if (!distant || !distant.progression || canon(resultat) !== canon(distant.progression)) {
          const savedAt = Date.now();
          await gh('/gists/' + conf.gistId, { method: 'PATCH', body: JSON.stringify({ files: { [FICHIER]: { content: contenu(resultat, savedAt) } } }) });
          conf.remoteAt = savedAt;
        } else conf.remoteAt = distant.savedAt;
        conf.dernier = Date.now(); conf.erreur = null; conf.jetonInvalide = false;
      } catch (e) {
        conf.erreur = e.message || 'La synchronisation n’a pas marché.';
        if (e instanceof ErreurJeton) conf.jetonInvalide = true;
      } finally {
        ecrireConf(); enCours = null; majCarte();
      }
    })();
    return enCours;
  }

  // Chaque enregistrement de la progression déclenche un envoi, quelques secondes plus tard
  let minuteur = null;
  Storage.prototype.setItem = function (k, v) {
    setItemOrig.call(this, k, v);
    if (this === localStorage && k === KEY && actif()) {
      conf.localAt = Date.now(); ecrireConf();
      clearTimeout(minuteur); minuteur = setTimeout(synchroniser, 4000);
    }
  };
  // En quittant l'appli, on envoie tout de suite ; en y revenant, on va chercher les nouveautés
  let cacheeDepuis = 0;
  document.addEventListener('visibilitychange', () => {
    if (!actif()) return;
    if (document.visibilityState === 'hidden') { cacheeDepuis = Date.now(); if (minuteur) { clearTimeout(minuteur); minuteur = null; synchroniser(); } }
    else if (Date.now() - cacheeDepuis > 30000) synchroniser();
  });

  /* ---------- Connexion d'un appareil ---------- */
  async function connecter(jeton) {
    conf = { token: jeton.trim() };
    const r = await fetch(API + '/user', { headers: { Authorization: 'Bearer ' + conf.token, Accept: 'application/vnd.github+json' }, cache: 'no-store' });
    if (!r.ok) { conf = {}; throw new Error('GitHub n’accepte pas ce code : vérifie que tu l’as copié en entier.'); }
    const portees = r.headers.get('x-oauth-scopes');
    if (portees !== null && !portees.split(',').map((s) => s.trim()).includes('gist')) { conf = {}; throw new Error('Ce code n’a pas la permission « gist » : coche la case « gist » en le créant.'); }
    conf.login = (await r.json()).login;
    // Un fichier de synchronisation existe déjà (créé par un autre appareil) ?
    let id = null;
    for (let page = 1; page <= 5 && !id; page++) {
      const liste = await gh(`/gists?per_page=100&page=${page}`);
      if (!liste.length) break;
      const g = liste.find((x) => x.files && x.files[FICHIER]);
      if (g) id = g.id;
    }
    if (!id) {
      const savedAt = Date.now();
      const g = await gh('/gists', { method: 'POST', body: JSON.stringify({ description: 'Ivrit ! — ma progression (synchronisation entre appareils)', public: false, files: { [FICHIER]: { content: contenu(JSON.parse(localStorage.getItem(KEY) || '{}'), savedAt) } } }) });
      id = g.id; conf.remoteAt = savedAt; conf.cree = true;
    }
    conf.gistId = id; conf.localAt = 0; // cet appareil arrive : c'est la version en ligne qui donne les réglages
    ecrireConf();
    await synchroniser();
  }
  function deconnecter() { conf = {}; setItemOrig.call(localStorage, KEY_SYNC, '{}'); majCarte(); }

  /* ---------- La carte « Synchronisation », sous la sauvegarde par fichier ---------- */
  const ilYa = (t) => { const m = Math.round((Date.now() - t) / 60000); return m < 1 ? 'à l’instant' : m < 60 ? `il y a ${m} min` : m < 1440 ? `il y a ${Math.round(m / 60)} h` : `il y a ${Math.round(m / 1440)} j`; };
  function majCarte() {
    const z = document.getElementById('syncCarte');
    if (!z) return;
    if (!actif()) {
      z.innerHTML = `<p class="sub" style="margin:0 0 8px">Ta progression passe toute seule d’un appareil à l’autre (ordinateur, téléphone…), grâce à ton compte GitHub. À faire une fois sur chaque appareil :</p>
        <ol class="sync-etapes">
          <li>Ouvre <a href="https://github.com/settings/tokens/new?scopes=gist&description=Ivrit%20synchronisation" target="_blank" rel="noopener">cette page GitHub</a> (connecte-toi si besoin).</li>
          <li>« Expiration » : choisis <b>No expiration</b> (ou 1 an). Ne coche rien d’autre que <b>gist</b>, déjà cochée.</li>
          <li>Tout en bas, clique <b>Generate token</b>, puis copie le code qui commence par <b>ghp_</b>.</li>
          <li>Colle-le ici :</li>
        </ol>
        <div class="row"><input class="input sync-jeton" id="syncJeton" type="password" placeholder="ghp_…" autocomplete="off" spellcheck="false"><button class="btn" id="syncGo">Connecter cet appareil</button></div>
        <p class="hint" id="syncMsg" style="margin:8px 0 0">Ce code reste dans ce navigateur : il n’est ni dans ta progression, ni dans les fichiers de sauvegarde. Il ne sert qu’à lire et écrire tes gists.</p>`;
      const go = $('#syncGo');
      go.onclick = async () => {
        const j = $('#syncJeton').value.trim();
        if (!j) return;
        go.disabled = true; $('#syncMsg').textContent = '⏳ Connexion à GitHub…';
        try { await connecter(j); toast('☁️ Synchronisation activée'); }
        catch (e) { $('#syncMsg').textContent = '⚠️ ' + e.message; go.disabled = false; }
      };
      return;
    }
    const etat = conf.erreur ? `⚠️ ${esc(conf.erreur)}${conf.jetonInvalide ? ' Déconnecte cet appareil, puis reconnecte-le avec un nouveau code.' : ' Nouvel essai à la prochaine sauvegarde.'}`
      : conf.dernier ? `✅ Synchronisée ${ilYa(conf.dernier)}.` : '⏳ Première synchronisation…';
    z.innerHTML = `<p style="margin:0 0 6px"><b>${etat}</b></p>
      <p class="hint" style="margin:0 0 12px">Cet appareil (${nomAppareil()}) est relié au compte GitHub <b>${esc(conf.login || '')}</b>. Ta progression s’envoie quelques secondes après chaque exercice, et se met à jour quand tu ouvres le site.</p>
      <div class="row"><button class="btn" id="syncNow">🔄 Synchroniser maintenant</button><button class="btn ghost" id="syncOff">Déconnecter cet appareil</button></div>`;
    $('#syncNow').onclick = async (e) => { e.currentTarget.disabled = true; await synchroniser(); if (!conf.erreur) toast('☁️ Progression synchronisée'); };
    $('#syncOff').onclick = () => { deconnecter(); toast('Cet appareil n’est plus synchronisé (ta progression reste ici)'); };
  }
  // On ajoute la carte sous « Sauvegarde de ma progression »
  const sauvegardeUIOrig = sauvegardeUI;
  sauvegardeUI = function (...args) {
    sauvegardeUIOrig.apply(this, args);
    const zone = $('#sauvegarde');
    if (zone && !document.getElementById('syncCarte')) zone.insertAdjacentHTML('beforeend', '<h3 style="margin-top:22px">☁️ Synchronisation entre mes appareils</h3><div class="card" id="syncCarte"></div>');
    majCarte();
  };
  if (document.getElementById('sauvegarde')) sauvegardeUI();

  window.IvritSync = { fusionner, synchroniser, connecter, deconnecter, conf: () => conf };
  // Au démarrage : on récupère ce que les autres appareils ont fait
  if (actif()) synchroniser();
})();
