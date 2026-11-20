/* Petite bulle « Une question ? » en bas à droite.
   La question s'ouvre dans claude.ai (nouvel onglet), déjà remplie avec le contexte.
   Rien n'est envoyé ailleurs : c'est le compte Claude de la personne qui répond. */
(function () {
  const MAX = 1800; // longueur max de l'adresse (au-delà, certains navigateurs coupent)
  let selection = '';

  const pageActuelle = () => {
    const app = document.getElementById('app');
    const t = app && app.querySelector('h1, h2');
    return t ? t.textContent.replace(/\s+/g, ' ').trim().slice(0, 80) : '';
  };
  const lireSelection = () => {
    const s = (window.getSelection && String(window.getSelection())) || '';
    return s.replace(/\s+/g, ' ').trim().slice(0, 300);
  };

  const prompt = (question, avecContexte) => {
    let p = "J'apprends l'hébreu moderne (je suis francophone). Réponds en français, simplement, "
      + "en écrivant l'hébreu avec les voyelles (nikoud) et une transcription en lettres latines, avec un ou deux exemples.";
    if (avecContexte) {
      const page = pageActuelle();
      if (page) p += `\nJe suis sur la page « ${page} » de mon application.`;
      if (selection) p += `\nPassage concerné : « ${selection} »`;
    }
    p += `\n\nMa question : ${question}`;
    return p;
  };

  const exemples = [
    'Quelle est la différence entre אֶת et שֶׁל ?',
    'Comment conjuguer un verbe au passé ?',
    'Pourquoi certains mots changent au pluriel ?',
  ];

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'aide-ia-btn';
  btn.setAttribute('aria-label', 'Poser une question sur l’hébreu');
  btn.innerHTML = '<span>?</span>';

  const panneau = document.createElement('div');
  panneau.className = 'aide-ia';
  panneau.hidden = true;
  panneau.innerHTML = `
    <div class="aide-ia-tete"><b>Une question ?</b><button type="button" class="aide-ia-fermer" aria-label="Fermer">✕</button></div>
    <p class="aide-ia-info">Grammaire, vocabulaire, prononciation… Ta question s'ouvre dans Claude, dans un nouvel onglet.</p>
    <div class="aide-ia-sel" hidden></div>
    <textarea rows="3" placeholder="Ex. : quand utilise-t-on שֶׁ ?"></textarea>
    <div class="aide-ia-ex">${exemples.map((e) => `<button type="button">${e}</button>`).join('')}</div>
    <label class="aide-ia-ctx"><input type="checkbox" checked> Joindre la page où je suis</label>
    <button type="button" class="btn gold aide-ia-go">Demander à Claude →</button>`;

  const zone = panneau.querySelector('textarea');
  const sel = panneau.querySelector('.aide-ia-sel');
  const ctx = panneau.querySelector('.aide-ia-ctx input');

  const ouvrir = () => {
    panneau.hidden = false;
    btn.classList.add('ouvert');
    sel.hidden = !selection;
    sel.textContent = selection ? `Passage sélectionné : « ${selection} »` : '';
    zone.focus();
  };
  const fermer = () => { panneau.hidden = true; btn.classList.remove('ouvert'); };
  const envoyer = () => {
    const q = zone.value.trim();
    if (!q) { zone.focus(); return; }
    let texte = prompt(q, ctx.checked);
    if (encodeURIComponent(texte).length > MAX) texte = prompt(q.slice(0, 600), false);
    window.open('https://claude.ai/new?q=' + encodeURIComponent(texte), '_blank', 'noopener');
  };

  // garder le texte sélectionné sur la page avant que le clic ne l'efface
  btn.addEventListener('pointerdown', () => { if (panneau.hidden) selection = lireSelection(); });
  btn.onclick = () => (panneau.hidden ? ouvrir() : fermer());
  panneau.querySelector('.aide-ia-fermer').onclick = fermer;
  panneau.querySelector('.aide-ia-go').onclick = envoyer;
  panneau.querySelectorAll('.aide-ia-ex button').forEach((b) => { b.onclick = () => { zone.value = b.textContent; zone.focus(); }; });
  zone.addEventListener('keydown', (e) => {
    e.stopPropagation(); // ne pas déclencher les raccourcis des exercices
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); envoyer(); }
    if (e.key === 'Escape') fermer();
  });
  window.addEventListener('hashchange', fermer);

  const poser = () => { document.body.append(btn, panneau); };
  if (document.body) poser(); else document.addEventListener('DOMContentLoaded', poser);
})();
