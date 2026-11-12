/* ============ Article du jour : un vrai titre de presse, résumé en hébreu simple ============ */
// Un article différent chaque jour, à tour de rôle (le 10 novembre 2026 montre le premier).
function presseIndex(d = new Date()) {
  const jour = Math.round((new Date(d.getFullYear(), d.getMonth(), d.getDate()) - new Date(2026, 10, 10)) / 864e5);
  return ((jour % PRESSE.length) + PRESSE.length) % PRESSE.length;
}
const presseDuJour = () => PRESSE[presseIndex()];
function presseDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}
function presse(id) {
  if (!Array.isArray(S.presse)) S.presse = [];
  const auj = presseDuJour();
  const art = (id && PRESSE.find((a) => a.id === id)) || auj;
  const estAuj = art === auj;
  // Les 6 articles des jours précédents (dans l'ordre de la rotation)
  const passes = [1, 2, 3, 4, 5, 6].map((k) => PRESSE[(presseIndex() - k + PRESSE.length * 2) % PRESSE.length]);
  app.innerHTML = `<div class="q-head"><a href="#/journal">← Lire un journal</a><span>🗞️ ${estAuj ? 'L’article du jour' : 'Un article précédent'}</span></div>
  <div class="card presse">
    <div class="presse-meta"><span class="presse-cat">${esc(art.cat)}</span> Paru le ${presseDate(art.date)} · ${esc(art.src)}</div>
    <div class="presse-une"><span class="cap">Le vrai titre, tel qu’il est paru (sans voyelles)</span>
      <p dir="rtl" lang="he" class="he presse-titre">${esc(art.une)}</p>
      <button class="link" id="uneTr">Voir la traduction du titre</button><p class="tr" id="uneFr" hidden>${esc(art.uneFr)}</p>
    </div>
    <h3 class="mt">En hébreu simple</h3>
    <p class="hint">Un court résumé du titre, avec les voyelles. Touche un mot pour le comprendre.</p>
    <div id="sents">${art.sentences.map((s, i) => `<div class="sent"><div class="row" style="justify-content:flex-end;gap:6px"><span dir="rtl" lang="he" class="words">${s.w.map(([he, fr]) => `<button class="w he" data-g="${esc(fr)}" data-he="${esc(he)}">${esc(he)}</button>`).join(' ')}</span>${sayBtn(s.he)}</div><button class="link" data-t="${i}">Voir la traduction</button><div class="tr" id="t${i}" hidden>${esc(s.fr)}</div></div>`).join('')}</div>
    <p class="center" id="gloss" style="min-height:1.6em;font-weight:800">&nbsp;</p>
    <div class="section"><b>${esc(art.q)}</b><div class="col-choices mt">${art.opts.map((o, i) => `<button class="opt ans" data-i="${i}">${esc(o)}</button>`).join('')}</div><p class="center hint" id="fb">&nbsp;</p></div>
    <p class="center mt"><a class="btn" href="${esc(art.lien)}" target="_blank" rel="noopener">Lire l’article original (${esc(art.src)}) ↗</a></p>
    <p class="hint center">L’article original est en hébreu courant, sans voyelles : un bon défi !</p>
  </div>
  <div class="section"><h3>${estAuj ? 'Les jours précédents' : 'Autres articles'}</h3>
    <div class="themes">${(estAuj ? passes : [auj, ...passes.filter((p) => p !== art)].slice(0, 6)).map((a) => `<a class="theme" href="#/journal/${a === auj ? 'jour' : a.id}"><span class="em">${a === auj ? '🗞️' : '📄'}</span> <small>${a === auj ? 'Aujourd’hui' : presseDate(a.date)} · ${esc(a.cat)}</small><br><b>${esc(a.uneFr.length > 70 ? a.uneFr.slice(0, 68) + '…' : a.uneFr)}</b><br><small>${S.presse.includes(a.id) ? 'Lu ✓' : 'À lire'}</small></a>`).join('')}</div>
  </div>
  <p class="hint mt">Les titres sont de vrais titres parus dans la presse israélienne entre le 3 et le 9 novembre 2026. Les phrases en hébreu simple sont un résumé écrit pour apprendre : pour l’article complet, ouvre le lien. ${S.presse.length} / ${PRESSE.length} articles lus.</p>`;
  $('#uneTr').onclick = (e) => { $('#uneFr').hidden = false; e.target.remove(); };
  $$('.w').forEach((b) => (b.onclick = () => { $$('.w.on').forEach((x) => x.classList.remove('on')); b.classList.add('on'); gloseArticle(b, $('#gloss')); speak(b.dataset.he); }));
  $$('.link[data-t]').forEach((b) => (b.onclick = () => { $('#t' + b.dataset.t).hidden = false; b.remove(); }));
  $$('.ans').forEach((b) => (b.onclick = () => {
    if (+b.dataset.i === art.a) {
      b.classList.add('ok'); lucioles(b); $$('.ans').forEach((x) => (x.disabled = true));
      const first = !S.presse.includes(art.id);
      if (first) { S.presse.push(art.id); save(); addXP(30); confetti(); }
      $('#fb').innerHTML = `✅ Bravo !${first ? ' +30 XP' : ''} Reviens demain pour un nouvel article.`;
    } else { b.classList.add('ko'); b.disabled = true; $('#fb').textContent = 'Relis le texte et réessaie.'; }
  }));
}
// Anciens liens #/presse : renvoyés vers la page du journal
routes.presse = (id) => location.replace('#/journal/' + (id || 'jour'));
