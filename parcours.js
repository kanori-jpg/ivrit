'use strict';
/* ============ Mon parcours ============
   Un chemin dans l'ordre, pour ne plus avoir à choisir quoi faire :
   l'alphabet, puis, en boucle, un thème de vocabulaire, deux leçons de grammaire et une histoire.
   Chaque étape se débloque quand la précédente est acquise. Rien de nouveau n'est enregistré :
   on lit la progression existante (cartes, leçons, histoires), donc tout ce qui est fait ailleurs compte aussi. */

const PC_THEME_SEUIL = 0.8; // un thème est acquis quand 80 % de ses mots ont été sus au moins une fois

function etapesParcours() {
  const etapes = [{ type: 'alphabet', em: '🔤', titre: 'Les 22 lettres de l’alphabet', sous: 'Alef-Bet', href: '#/alphabet' }];
  const themes = THEMES.filter((t) => t.id !== 'mesmots' && t.words.length).map((t) => ({ type: 'theme', id: t.id, em: t.emoji, titre: t.name, sous: 'Vocabulaire', href: `#/cartes/${t.id}` }));
  const gram = (typeof GRAMMAIRE_PARTIES !== 'undefined' ? GRAMMAIRE_PARTIES.flatMap((p) => p.ids) : GRAMMAIRE.map((l) => l.id))
    .map((id) => GRAMMAIRE.find((l) => l.id === id)).filter(Boolean)
    .map((l) => ({ type: 'grammaire', id: l.id, em: l.em || '📐', titre: l.titre, sous: 'Grammaire', href: `#/grammaire/${l.id}` }));
  // Les histoires dans l'ordre des chapitres : les 5 premiers, puis les villes (5 histoires chacune)
  const vie = typeof STORIES_VIE !== 'undefined' ? STORIES_VIE : [];
  const histoires = [
    ...STORIES.filter((s) => typeof CHAPITRES === 'undefined' || CHAPITRES[s.id]).map((s) => ({ s, ch: (CHAPITRES[s.id] || {}).num })),
    ...(typeof VILLES !== 'undefined' ? [...VILLES].sort((a, b) => a.num - b.num) : []).flatMap((v) => v.histoires.map((id) => ({ s: vie.find((x) => x.id === id), ch: v.num, lieu: v.lieu }))),
  ].filter((x) => x.s).map(({ s, ch, lieu }) => ({ type: 'histoire', id: s.id, em: s.emoji || '📖', titre: s.title || s.fr || 'Histoire', sous: `Histoire · chapitre ${ch || ''}${lieu ? ` (${lieu})` : ''}`, href: `#/histoire/${s.id}` }));
  let g = 0, h = 0;
  themes.forEach((t) => {
    etapes.push(t);
    for (let k = 0; k < 2 && g < gram.length; k++) etapes.push(gram[g++]);
    if (h < histoires.length) etapes.push(histoires[h++]);
  });
  etapes.push(...gram.slice(g), ...histoires.slice(h));
  return etapes;
}

// Où en est une étape : { fait, txt (détail), pct }
function etatEtape(e) {
  if (e.type === 'alphabet') { const n = S.seen.length; return { fait: n >= 22, txt: `${Math.min(n, 22)} / 22 lettres`, pct: Math.min(1, n / 22) }; }
  if (e.type === 'theme') {
    const ws = themeWords(e.id), su = ws.filter((w) => S.cards[w.he] && (S.cards[w.he].box || 0) >= 1).length, but = Math.ceil(ws.length * PC_THEME_SEUIL);
    return { fait: su >= but, txt: `${su} / ${but} mots sus`, pct: Math.min(1, su / but) };
  }
  if (e.type === 'grammaire') { const f = !!S.grammaire[e.id]; return { fait: f, txt: f ? 'leçon faite' : 'leçon et exercices', pct: f ? 1 : 0 }; }
  const f = !!S.story[e.id]; return { fait: f, txt: f ? 'histoire terminée' : 'à lire', pct: f ? 1 : 0 };
}

function etatParcours() {
  const etapes = etapesParcours().map((e) => ({ ...e, ...etatEtape(e) }));
  const i = etapes.findIndex((e) => !e.fait);
  return { etapes, courante: i < 0 ? etapes.length : i, faites: etapes.filter((e) => e.fait).length };
}

const PC_PALIER = 10;
function parcours() {
  const { etapes, courante, faites } = etatParcours();
  const e = etapes[courante];
  const ligne = (x, k) => {
    const ouverte = x.fait || k <= courante, cls = x.fait ? 'fait' : k === courante ? 'courante' : 'fermee';
    const contenu = `<span class="pc-num">${x.fait ? '✓' : k === courante ? '▶' : k + 1}</span><span class="pc-em">${x.em}</span>
      <span class="pc-txt"><small>${esc(x.sous)}</small><b>${esc(x.titre)}</b>${!x.fait && x.pct > 0 ? `<span class="pc-barre"><i style="width:${Math.round(x.pct * 100)}%"></i></span>` : ''}</span>
      <span class="pc-etat">${x.fait ? '' : ouverte ? esc(x.txt) : '🔒'}</span>`;
    return ouverte ? `<a class="pc-etape ${cls}" href="${x.href}">${contenu}</a>` : `<div class="pc-etape ${cls}" aria-disabled="true">${contenu}</div>`;
  };
  const paliers = [];
  for (let k = 0; k < etapes.length; k += PC_PALIER) paliers.push(k);
  app.innerHTML = `<section class="pc-hero card">
      <span class="he pc-hero-he" lang="he" dir="rtl">הַדֶּרֶךְ שֶׁלִּי</span>
      <h2>Mon parcours</h2>
      <p class="sub">Un chemin dans l’ordre : un thème de vocabulaire, deux leçons de grammaire, une histoire… Chaque étape se débloque quand la précédente est acquise. Tout ce que tu fais ailleurs dans le site compte aussi.</p>
      <div class="pc-total"><span class="pc-barre grande"><i style="width:${(faites / etapes.length) * 100}%"></i></span><small>${faites} / ${etapes.length} étapes</small></div>
      ${e ? `<a class="pc-suite" href="${e.href}"><span class="pc-em">${e.em}</span><span><small>Étape ${courante + 1} · ${esc(e.sous)}</small><b>${esc(e.titre)}</b><span>${esc(e.txt)}${e.type === 'theme' ? ' — fais des séances de cartes de ce thème' : ''}</span></span><span class="btn gold">Continuer →</span></a>`
        : '<p class="pc-bravo">🎉 Tu as terminé tout le parcours. Bravo !</p>'}
    </section>
    ${paliers.map((k) => {
      const morceau = etapes.slice(k, k + PC_PALIER), fini = morceau.every((x) => x.fait), ici = courante >= k && courante < k + PC_PALIER;
      return `<details class="pc-palier${fini ? ' fini' : ''}"${ici ? ' open' : ''}><summary><b>Palier ${k / PC_PALIER + 1}</b><small>${fini ? '✓ terminé' : `${morceau.filter((x) => x.fait).length} / ${morceau.length}`}</small></summary>
        <div class="pc-liste">${morceau.map((x, j) => ligne(x, k + j)).join('')}</div></details>`;
    }).join('')}
    <p class="hint center mt">Pour un thème, l’étape est acquise quand tu as su ${Math.round(PC_THEME_SEUIL * 100)} % de ses mots au moins une fois dans les cartes.</p>`;
  const ici = courante >= PC_PALIER && $('.pc-palier[open]');
  if (ici) setTimeout(() => ici.scrollIntoView({ block: 'start', behavior: 'smooth' }), 50);
}

routes.parcours = parcours;
if (/^#\/parcours/.test(location.hash) && typeof route === 'function') route();
