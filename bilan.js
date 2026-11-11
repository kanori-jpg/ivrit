'use strict';
/* ============ Le bilan de la semaine ============
   Au début de chaque semaine (lundi), on photographie quelques compteurs (S.hebdo).
   La semaine suivante, la différence donne le bilan, gardé dans S.bilans[lundi].
   Le premier passage de la semaine affiche le bilan de la semaine écoulée, une seule fois. */
const lundiDe = (d = new Date()) => { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return dayKey(x); };
const decaler = (cle, jours) => { const d = new Date(cle + 'T00:00'); d.setDate(d.getDate() + jours); return dayKey(d); };
function compteurs() {
  return {
    mots: mastered(), cartes: Object.keys(S.cards).length, gram: Object.keys(S.grammaire).length,
    controles: Object.values(S.controles || {}).filter((c) => c.reussi).length, voyage: Object.keys(S.voyage || {}).length,
    mesMots: S.mesMots.length, sec: S.stats.sec, articles: S.articles.length + (S.presse ? S.presse.length : 0),
    histoires: Object.keys(S.postcards).length, quiz: S.stats.quiz, badges: S.badges.length,
  };
}
// Les XP jour par jour d'une semaine (S.days les garde déjà)
const joursSemaine = (lundi) => [...Array(7)].map((_, i) => { const k = decaler(lundi, i); return { k, xp: S.days[k] || 0 }; });

// À chaque ouverture : si une nouvelle semaine a commencé, on clôt la précédente
function majHebdo() {
  const lundi = lundiDe();
  if (!S.bilans) S.bilans = {};
  if (S.hebdo && S.hebdo.lundi === lundi) return;
  if (S.hebdo && S.hebdo.lundi < lundi) {
    const avant = S.hebdo.base, apres = compteurs(), diff = {};
    Object.keys(apres).forEach((k) => { diff[k] = Math.max(0, apres[k] - (avant[k] || 0)); });
    const jours = joursSemaine(S.hebdo.lundi);
    S.bilans[S.hebdo.lundi] = { ...diff, xp: jours.reduce((t, j) => t + j.xp, 0), joursActifs: jours.filter((j) => j.xp > 0).length, depuis: S.hebdo.depuis || S.hebdo.lundi };
    // Plusieurs semaines sans venir : on ne montre que la dernière, et seulement si elle n'est pas vide
    if (S.bilans[S.hebdo.lundi].xp > 0) S.bilanAVoir = S.hebdo.lundi;
  }
  S.hebdo = { lundi, depuis: S.hebdo ? lundi : dayKey(), base: compteurs() };
  save();
}
majHebdo();

const dateCourte = (k) => new Date(k + 'T00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
const nomJour = (k) => new Date(k + 'T00:00').toLocaleDateString('fr-FR', { weekday: 'long' });

// Des objectifs simples pour la semaine qui vient
function objectifsSemaine(b) {
  const obj = [];
  const actifs = b ? b.joursActifs : 0;
  obj.push(actifs >= 6 ? '🔥 Garder ton rythme : étudier au moins 6 jours sur 7' : `📅 Étudier au moins ${Math.min(7, Math.max(4, actifs + 1))} jours sur 7`);
  const prochaine = typeof GRAMMAIRE !== 'undefined' ? GRAMMAIRE.find((l) => !S.grammaire[l.id]) : null;
  const k = typeof VOYAGE !== 'undefined' ? VOYAGE.findIndex((v, i) => !(S.voyage || {})[i]) : -1;
  if (k >= 0 && GRAMMAIRE_PARTIES[k]) {
    const p = GRAMMAIRE_PARTIES[k], reste = p.ids.filter((id) => !S.grammaire[id]).length;
    obj.push(reste ? `📐 Faire ${Math.min(reste, 3)} leçon${Math.min(reste, 3) > 1 ? 's' : ''} de « ${p.titre} » pour te rapprocher de ${VOYAGE[k].lieu}` : `📝 Réussir le contrôle « ${p.titre} » et partir pour ${VOYAGE[k].lieu}`);
  } else if (prochaine) obj.push(`📐 Faire la leçon « ${prochaine.titre.replace(/\[\[|\]\]/g, '')} »`);
  const nbErr = motsEnErreur().length;
  obj.push(nbErr ? `🎯 Retravailler tes ${nbErr} mot${nbErr > 1 ? 's' : ''} en erreur` : `⭐ Gagner ${S.goal * 5} XP dans la semaine`);
  return obj;
}

// Le contenu d'un bilan (semaine terminée ou en cours)
function blocBilan(lundi, b, enCours) {
  const jours = joursSemaine(lundi), max = Math.max(1, ...jours.map((j) => j.xp));
  const meilleur = jours.reduce((m, j) => (j.xp > m.xp ? j : m), { xp: 0 });
  const prec = (S.bilans || {})[decaler(lundi, -7)];
  const ecart = prec ? b.xp - prec.xp : null;
  const min = Math.round((b.sec || 0) / 60);
  const tuile = (em, val, nom) => `<div class="bl-tuile"><span>${em}</span><b>${val}</b><small>${nom}</small></div>`;
  return `<div class="bl-entete"><b>${enCours ? 'Cette semaine' : 'Semaine'} du ${dateCourte(lundi)} au ${dateCourte(decaler(lundi, 6))}</b>${b.depuis && b.depuis > lundi ? `<small>suivi commencé le ${dateCourte(b.depuis)}</small>` : ''}</div>
    <div class="bl-tuiles">
      ${tuile('⭐', b.xp, 'XP gagnés')}
      ${tuile('📅', `${b.joursActifs}/7`, 'jours d’étude')}
      ${tuile('🃏', `+${b.mots}`, 'mots maîtrisés')}
      ${tuile('📐', `+${b.gram}`, b.gram > 1 ? 'leçons faites' : 'leçon faite')}
      ${b.controles ? tuile('🎓', `+${b.controles}`, b.controles > 1 ? 'contrôles réussis' : 'contrôle réussi') : ''}
      ${b.voyage ? tuile('🧳', `+${b.voyage}`, b.voyage > 1 ? 'étapes du voyage' : 'étape du voyage') : ''}
      ${tuile('⏱️', min >= 60 ? `${Math.floor(min / 60)} h ${min % 60}` : `${min} min`, 'd’étude')}
    </div>
    <div class="bl-jours">${jours.map((j) => `<div class="${j.xp >= S.goal ? 'ok' : ''}"><span>${j.xp || ''}</span><i style="height:${(j.xp / max) * 100}%"></i><small>${nomJour(j.k).slice(0, 3)}</small></div>`).join('')}</div>
    <p class="bl-notes">${meilleur.xp ? `🏆 Ton meilleur jour : <b>${nomJour(meilleur.k)}</b> (${meilleur.xp} XP).` : 'Pas encore d’XP cette semaine.'}${ecart !== null ? ` ${ecart > 0 ? `📈 ${ecart} XP de plus que la semaine d’avant !` : ecart < 0 ? `📉 ${-ecart} XP de moins que la semaine d’avant.` : 'Autant d’XP que la semaine d’avant.'}` : ''}${b.histoires ? ` 📖 ${b.histoires} histoire${b.histoires > 1 ? 's' : ''} lue${b.histoires > 1 ? 's' : ''}.` : ''}${b.articles ? ` 📰 ${b.articles} article${b.articles > 1 ? 's' : ''}.` : ''}</p>`;
}

// La semaine en cours, calculée en direct depuis lundi
function bilanEnCours() {
  const lundi = S.hebdo.lundi, avant = S.hebdo.base, apres = compteurs(), b = { depuis: S.hebdo.depuis };
  Object.keys(apres).forEach((k) => { b[k] = Math.max(0, apres[k] - (avant[k] || 0)); });
  const jours = joursSemaine(lundi);
  b.xp = jours.reduce((t, j) => t + j.xp, 0); b.joursActifs = jours.filter((j) => j.xp > 0).length;
  return b;
}

// La page « Bilan de la semaine »
function bilan() {
  majHebdo();
  const passes = Object.keys(S.bilans || {}).sort().reverse();
  const dernier = passes[0];
  app.innerHTML = `<div class="q-head"><a href="#/progres">← Mes progrès</a></div>
  <section class="bl-hero"><span class="he gr-hero-he" lang="he" dir="rtl">סִכּוּם שְׁבוּעִי</span><h2>Bilan de la semaine</h2><p>Chaque lundi, ce que tu as appris la semaine précédente, et quelques objectifs pour la suivante.</p></section>
  ${dernier ? `<section class="card bl-carte">${blocBilan(dernier, S.bilans[dernier], false)}</section>` : '<p class="card hint">Ton premier bilan complet arrivera lundi prochain. En attendant, voici ta semaine en cours.</p>'}
  <section class="card bl-carte">${blocBilan(S.hebdo.lundi, bilanEnCours(), true)}
    <div class="cap">🎯 Tes objectifs de la semaine</div><ul class="bl-obj">${objectifsSemaine(dernier ? S.bilans[dernier] : bilanEnCours()).map((o) => `<li>${esc(o)}</li>`).join('')}</ul></section>
  ${passes.length > 1 ? `<details class="card bl-anciens"><summary>Les semaines précédentes (${passes.length - 1})</summary>${passes.slice(1, 9).map((l) => { const x = S.bilans[l]; return `<p>Semaine du ${dateCourte(l)} : <b>${x.xp} XP</b> · ${x.joursActifs}/7 jours · +${x.mots} mots · +${x.gram} leçons</p>`; }).join('')}</details>` : ''}`;
}
routes.bilan = bilan;

// Le lundi (ou au premier passage de la semaine), le bilan s'affiche une fois par-dessus la page
function montrerBilanAuDemarrage() {
  const l = S.bilanAVoir, b = l && (S.bilans || {})[l];
  if (!b) return;
  delete S.bilanAVoir; save();
  const fond = document.createElement('div');
  fond.className = 'bl-fenetre';
  fond.innerHTML = `<div class="card bl-carte" role="dialog" aria-modal="true" aria-label="Bilan de la semaine">
    <div class="bl-titre"><span>📊</span><h2>Ton bilan de la semaine</h2></div>
    ${blocBilan(l, b, false)}
    <div class="cap">🎯 Pour cette semaine</div><ul class="bl-obj">${objectifsSemaine(b).map((o) => `<li>${esc(o)}</li>`).join('')}</ul>
    <div class="row" style="justify-content:center"><button class="btn gold" id="blOk" type="button">C’est parti !</button><a class="btn ghost" href="#/bilan" id="blVoir">Voir le détail</a></div></div>`;
  document.body.appendChild(fond);
  const fermer = () => fond.remove();
  fond.querySelector('#blOk').onclick = fermer;
  fond.querySelector('#blVoir').onclick = fermer;
  fond.onclick = (e) => { if (e.target === fond) fermer(); };
  document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { fermer(); document.removeEventListener('keydown', esc); } });
  if (b.xp > 0) setTimeout(confetti, 300);
}
setTimeout(montrerBilanAuDemarrage, 1200);
// Ce fichier est chargé après le premier affichage : si on arrive directement sur #/bilan, on affiche la page
if (/^#\/bilan/.test(location.hash) && typeof route === 'function') route();
