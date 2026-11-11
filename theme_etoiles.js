/* ============ Thèmes du site : « Étoilé » (par défaut), « Aquarelle », « Sakura » et « Brume de jade » ============
   Le bouton du menu passe de l'un à l'autre. Le choix est gardé à part (pas dans la progression). */
const THEME_CLE = 'ivrit-theme';
const THEMES_SITE = [
  { id: 'etoiles', em: '✨', nom: 'Étoilé' },
  { id: 'aquarelle', em: '🎨', nom: 'Aquarelle' },
  { id: 'sakura', em: '🌸', nom: 'Sakura' },
  { id: 'jade', em: '🍃', nom: 'Brume de jade' },
];
const themeActuel = () => { try { const t = localStorage.getItem(THEME_CLE); return THEMES_SITE.some((x) => x.id === t) ? t : 'etoiles'; } catch (e) { return 'etoiles'; } };
const themeEtoiles = () => themeActuel() === 'etoiles';
(() => {
  // Les thèmes, dans la petite palette du menu
  const zone = document.getElementById('railThemes');
  const moon = document.getElementById('moon');
  const APERCUS = { etoiles: 'radial-gradient(circle at 30% 30%, #fff 0 1.5px, transparent 2px), linear-gradient(135deg, #2a1f6e, #8f6cf0 60%, #f5b5d6)', aquarelle: 'linear-gradient(135deg, #f3ebf8, #c9a2d8 60%, #f3cdba)', sakura: 'linear-gradient(135deg, #dfe9f8, #f6c1d1 60%, #e48aa6)', jade: 'linear-gradient(135deg, #f7f6ee, #a9d1c3 60%, #4f8a80)' };
  if (zone) zone.innerHTML = `<span class="rail-themes-titre">Les couleurs du ciel</span>${THEMES_SITE.map((x) => `<button type="button" class="rail-theme" data-theme="${x.id}"><i style="background:${APERCUS[x.id]}"></i><span>${x.em} ${x.nom}</span></button>`).join('')}`;
  const nuitOrigine = applyNight;
  const applique = () => {
    const t = themeActuel(), th = THEMES_SITE.find((x) => x.id === t);
    document.body.classList.toggle('etoiles', t === 'etoiles');
    document.body.classList.toggle('aquarelle', t === 'aquarelle');
    document.body.classList.toggle('sakura', t === 'sakura');
    document.body.classList.toggle('jade', t === 'jade');
    if (t === 'etoiles') document.body.classList.add('night');
    else document.body.classList.remove('night');
    if (zone) zone.querySelectorAll('.rail-theme').forEach((b) => { b.classList.toggle('on', b.dataset.theme === t); b.setAttribute('aria-pressed', String(b.dataset.theme === t)); });
    if (moon) moon.hidden = true;
  };
  applyNight = () => { nuitOrigine(); const t = themeActuel(); if (t === 'etoiles') document.body.classList.add('night'); if (t !== 'etoiles') document.body.classList.remove('night'); };
  if (zone) zone.querySelectorAll('.rail-theme').forEach((b) => (b.onclick = () => {
    try { localStorage.setItem(THEME_CLE, b.dataset.theme); } catch (e) {}
    applique();
    if (typeof route === 'function') route();
  }));
  applique();
})();
