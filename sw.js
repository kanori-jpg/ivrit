'use strict';
/* ============ Ivrit hors connexion ============
   - Les pages : la version en ligne si le réseau répond vite, sinon celle gardée sur l'appareil.
   - Les scripts et le style (numérotés ?v=) : gardés une fois pour toutes, mis à jour quand le numéro change.
   - Les sons : gardés dès qu'on les écoute (ou tous d'un coup, depuis Mes progrès).
   - GitHub (synchronisation) et tout le reste : jamais interceptés. */
const COQUILLE = 'ivrit-coquille', SONS = 'ivrit-sons', POLICES = 'ivrit-polices';
const RACINE = new URL('./', self.registration.scope).href;

self.addEventListener('install', (e) => { e.waitUntil(majCoquille().catch(() => {}).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(self.clients.claim()); });

// Tous les fichiers dont la page a besoin, lus dans index.html
function fichiersDe(html) {
  const urls = new Set([RACINE, new URL('manifest.webmanifest', RACINE).href, new URL('icons/icon-192.png', RACINE).href, new URL('icons/icon-512.png', RACINE).href]);
  for (const m of html.matchAll(/(?:src|href)="([^"#:]+)"/g)) urls.add(new URL(m[1], RACINE).href);
  return urls;
}
async function majCoquille(reponseHtml) {
  const rep = reponseHtml || await fetch(RACINE, { cache: 'no-store' });
  if (!rep.ok) return;
  const html = await rep.clone().text();
  const cache = await caches.open(COQUILLE);
  await cache.put(RACINE, rep);
  const voulus = fichiersDe(html), deja = new Set((await cache.keys()).map((r) => r.url));
  await Promise.all([...voulus].filter((u) => !deja.has(u)).map((u) => fetch(u, { cache: 'no-store' }).then((r) => (r.ok ? cache.put(u, r) : null)).catch(() => null)));
  // Les anciennes versions des fichiers ne servent plus
  for (const req of await cache.keys()) if (!voulus.has(req.url)) await cache.delete(req);
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin && url.href.startsWith(RACINE)) {
    if (req.mode === 'navigate') return e.respondWith(page(e));
    if (/\/audio\/.+\.(mp3|wav)$/i.test(url.pathname)) return e.respondWith(son(req));
    return e.respondWith(fichier(req));
  }
  if (/^fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) return e.respondWith(police(e));
});

// La page : en ligne si possible (4 s au plus), sinon la copie gardée
async function page(e) {
  const enLigne = fetch(e.request).then((rep) => { if (rep.ok) e.waitUntil(majCoquille(rep.clone()).catch(() => {})); return rep; });
  const delai = new Promise((ok) => setTimeout(ok, 4000, null));
  try {
    const rep = await Promise.race([enLigne, delai]);
    if (rep) return rep;
  } catch (err) { /* hors connexion */ }
  const copie = await caches.match(RACINE);
  return copie || enLigne;
}
async function fichier(req) {
  const copie = await caches.match(req.url, { cacheName: COQUILLE });
  if (copie) return copie;
  const rep = await fetch(req);
  if (rep.ok) { const c = await caches.open(COQUILLE); c.put(req.url, rep.clone()); }
  return rep;
}
// Les sons, avec la lecture par morceaux que demandent certains navigateurs (iPhone)
async function son(req) {
  const cache = await caches.open(SONS);
  let rep = await cache.match(req.url);
  if (!rep) {
    try { const r = await fetch(req.url); if (!r.ok) return r; await cache.put(req.url, r.clone()); rep = r; }
    catch (err) { return Response.error(); }
  }
  const morceau = req.headers.get('range');
  if (!morceau) return rep;
  const octets = await rep.clone().arrayBuffer(), m = /bytes=(\d*)-(\d*)/.exec(morceau) || [];
  const debut = m[1] ? +m[1] : 0, fin = m[2] ? Math.min(+m[2], octets.byteLength - 1) : octets.byteLength - 1;
  return new Response(octets.slice(debut, fin + 1), { status: 206, headers: { 'Content-Type': rep.headers.get('Content-Type') || 'audio/mpeg', 'Content-Range': `bytes ${debut}-${fin}/${octets.byteLength}`, 'Content-Length': String(fin - debut + 1), 'Accept-Ranges': 'bytes' } });
}
// Les polices : la copie tout de suite, mise à jour en arrière-plan
async function police(e) {
  const cache = await caches.open(POLICES), copie = await cache.match(e.request);
  const reseau = fetch(e.request).then((r) => { if (r.ok || r.type === 'opaque') cache.put(e.request, r.clone()); return r; }).catch(() => null);
  if (copie) { e.waitUntil(reseau); return copie; }
  return (await reseau) || Response.error();
}
