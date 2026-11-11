'use strict';
/* ============ Le calendrier hébraïque et les fêtes ============
   La date hébraïque vient du navigateur (calendrier « hebrew » d'Intl) : rien à mettre à jour d'une année sur l'autre. */
const FETES = [
  { id: 'roshhashana', nom: 'Roch Hachana', he: 'רֹאשׁ הַשָּׁנָה', mois: ['Tishri'], jour: 1, duree: 2, em: '🍎',
    texte: 'Le Nouvel An juif. On trempe des pommes dans le miel pour souhaiter une année douce, on mange de la grenade (aux nombreux grains, comme les bonnes actions qu’on espère) et on écoute sonner le chofar.',
    voeu: { he: 'שָׁנָה טוֹבָה וּמְתוּקָה!', tr: 'shana tova oumetouka', fr: 'une bonne et douce année !' },
    mots: [['תַּפּוּחַ', 'tapouakh', 'pomme'], ['דְּבַשׁ', 'dvash', 'miel'], ['רִמּוֹן', 'rimon', 'grenade'], ['שׁוֹפָר', 'shofar', 'chofar (corne de bélier)']] },
  { id: 'kippour', nom: 'Yom Kippour', he: 'יוֹם כִּפּוּר', mois: ['Tishri'], jour: 10, duree: 1, em: '🕊️',
    texte: 'Le jour du Grand Pardon, jour de jeûne. Tout le pays s’arrête : plus une voiture sur les routes… et les enfants en profitent pour faire du vélo au milieu des autoroutes vides !',
    voeu: { he: 'גְּמַר חֲתִימָה טוֹבָה!', tr: 'gmar khatima tova', fr: 'sois inscrit(e) pour une bonne année ! (le vœu de Kippour)' },
    mots: [['צוֹם', 'tsom', 'jeûne'], ['סְלִיחָה', 'slikha', 'pardon'], ['בֵּית כְּנֶסֶת', 'beit kneset', 'synagogue'], ['אוֹפַנַּיִם', 'ofanayim', 'vélo']] },
  { id: 'souccot', nom: 'Souccot', he: 'סֻכּוֹת', mois: ['Tishri'], jour: 15, duree: 7, em: '🌿',
    texte: 'La fête des Cabanes. Sur les balcons et dans les jardins, on construit une soucca, une cabane au toit de branchages, qu’on décore et où l’on mange pendant une semaine.',
    voeu: { he: 'חַג שָׂמֵחַ!', tr: 'khag same’akh', fr: 'joyeuse fête !' },
    mots: [['סֻכָּה', 'souka', 'cabane (de Souccot)'], ['לוּלָב', 'loulav', 'loulav (branche de palmier)'], ['אֶתְרוֹג', 'etrog', 'cédrat'], ['קִשּׁוּטִים', 'kishoutim', 'décorations']] },
  { id: 'hanoukka', nom: 'Hanoukka', he: 'חֲנֻכָּה', mois: ['Kislev'], jour: 25, duree: 8, em: '🕎',
    texte: 'La fête des Lumières, pendant huit jours : chaque soir, on allume une bougie de plus. On mange des beignets à la confiture et on joue à la toupie. En Israël, elle porte les lettres נ ג ה פ : « un grand miracle a eu lieu ici ».',
    voeu: { he: 'חַג חֲנֻכָּה שָׂמֵחַ!', tr: 'khag khanouka same’akh', fr: 'joyeuse fête de Hanoukka !' },
    mots: [['חֲנֻכִּיָּה', 'khanoukiya', 'chandelier de Hanoukka'], ['נֵר', 'ner', 'bougie'], ['סֻפְגָּנִיָּה', 'soufganiya', 'beignet'], ['סְבִיבוֹן', 'svivon', 'toupie']] },
  { id: 'toubichvat', nom: 'Tou Bichvat', he: 'ט״ו בִּשְׁבָט', mois: ['Shevat'], jour: 15, duree: 1, em: '🌳',
    texte: 'Le Nouvel An des arbres, quand les amandiers fleurissent. Les enfants plantent des arbres et on mange des fruits secs.',
    voeu: { he: 'חַג שָׂמֵחַ!', tr: 'khag same’akh', fr: 'joyeuse fête !' },
    mots: [['עֵץ', 'ets', 'arbre'], ['לִנְטֹעַ', 'lintoa', 'planter'], ['שָׁקֵד', 'shaked', 'amandier, amande'], ['פֵּרוֹת יְבֵשִׁים', 'perot yevéshim', 'fruits secs']] },
  { id: 'pourim', nom: 'Pourim', he: 'פּוּרִים', mois: ['Adar', 'Adar II'], jour: 14, duree: 1, em: '🎭',
    texte: 'Le carnaval ! Petits et grands se déguisent, on s’offre des paniers de friandises et on mange des « oreilles d’Haman », des biscuits triangulaires fourrés.',
    voeu: { he: 'פּוּרִים שָׂמֵחַ!', tr: 'pourim same’akh', fr: 'joyeux Pourim !' },
    mots: [['תַּחְפֹּשֶׂת', 'takhposet', 'déguisement'], ['מַסֵּכָה', 'masséka', 'masque'], ['אָזְנֵי הָמָן', 'ozney haman', 'oreilles d’Haman (biscuits)'], ['מִשְׁלוֹחַ מָנוֹת', 'mishloakh manot', 'panier de friandises offert']] },
  { id: 'pessah', nom: 'Pessah', he: 'פֶּסַח', mois: ['Nisan'], jour: 15, duree: 7, em: '🫓',
    texte: 'La Pâque juive, qui rappelle la sortie d’Égypte. Le premier soir, c’est le Seder : on lit la Haggada en famille. Pendant une semaine, pas de pain : on mange de la matsa.',
    voeu: { he: 'חַג פֶּסַח שָׂמֵחַ!', tr: 'khag pessakh same’akh', fr: 'joyeuse fête de Pessah !' },
    mots: [['מַצָּה', 'matsa', 'pain azyme'], ['סֵדֶר', 'seder', 'le repas du Seder'], ['הַגָּדָה', 'hagada', 'la Haggada'], ['חָמֵץ', 'khamets', 'aliment levé (interdit à Pessah)']] },
  { id: 'atsmaout', nom: 'Yom Haatsmaout', he: 'יוֹם הָעַצְמָאוּת', mois: ['Iyar'], jour: 5, duree: 1, em: '🎆', approx: true,
    texte: 'La fête de l’Indépendance d’Israël (1948). Feux d’artifice le soir, drapeaux partout, et le lendemain… tout le pays fait un barbecue dans les parcs !',
    voeu: { he: 'חַג עַצְמָאוּת שָׂמֵחַ!', tr: 'khag atsma’out same’akh', fr: 'joyeuse fête de l’Indépendance !' },
    mots: [['דֶּגֶל', 'degel', 'drapeau'], ['זִקּוּקִים', 'zikoukim', 'feux d’artifice'], ['מַנְגָּל', 'mangal', 'barbecue'], ['עַצְמָאוּת', 'atsma’out', 'indépendance']] },
  { id: 'chavouot', nom: 'Chavouot', he: 'שָׁבוּעוֹת', mois: ['Sivan'], jour: 6, duree: 1, em: '🧀',
    texte: 'La fête des Moissons, sept semaines après Pessah. On s’habille en blanc, les enfants portent des couronnes de fleurs, et on mange des laitages : gâteau au fromage à l’honneur !',
    voeu: { he: 'חַג שָׂמֵחַ!', tr: 'khag same’akh', fr: 'joyeuse fête !' },
    mots: [['גְּבִינָה', 'gvina', 'fromage'], ['חָלָב', 'khalav', 'lait'], ['עוּגַת גְּבִינָה', 'ougat gvina', 'gâteau au fromage'], ['פְּרָחִים', 'prakhim', 'fleurs']] },
];

const fmtHebreu = (() => { try { return new Intl.DateTimeFormat('he-u-ca-hebrew', { day: 'numeric', month: 'long', year: 'numeric' }); } catch (e) { return null; } })();
const fmtFrHebreu = (() => { try { return new Intl.DateTimeFormat('fr-u-ca-hebrew', { day: 'numeric', month: 'long', year: 'numeric' }); } catch (e) { return null; } })();
const fmtPartsHebreu = (() => { try { return new Intl.DateTimeFormat('en-u-ca-hebrew', { day: 'numeric', month: 'long' }); } catch (e) { return null; } })();
// Les nombres en lettres (gématria) : 1 → א׳, 15 → ט״ו, 787 → תשפ״ז
function gematria(n) {
  const u = ['', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט'], d = ['', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ'], c = ['', 'ק', 'ר', 'ש', 'ת', 'תק', 'תר', 'תש', 'תת', 'תתק'];
  const r = n % 100;
  const s = c[Math.floor(n / 100)] + (r === 15 ? 'טו' : r === 16 ? 'טז' : d[Math.floor(r / 10)] + u[r % 10]);
  return s.length > 1 ? `${s.slice(0, -1)}״${s.slice(-1)}` : `${s}׳`;
}
// « א׳ בכסלו תשפ״ז » : comme on l'écrit en Israël (sans voyelles, nombres en lettres)
function dateHebraique(d = new Date()) {
  if (!fmtHebreu) return '';
  const p = fmtHebreu.formatToParts(d), v = (t) => (p.find((x) => x.type === t) || {}).value || '';
  const mois = v('month');
  return `${gematria(+v('day'))} ב${mois} ${gematria(+v('year') % 1000)}`; // aucun nom de mois ne commence par ב
}
function dateHebraiqueFr(d = new Date()) { return fmtFrHebreu ? fmtFrHebreu.format(d) : ''; }
function moisJourHebreu(d) {
  const p = fmtPartsHebreu.formatToParts(d);
  return { mois: p.find((x) => x.type === 'month').value, jour: +p.find((x) => x.type === 'day').value };
}

// Les fêtes à venir (ou en cours), avec leur date de début et le nombre de jours qui restent
function fetesAVenir() {
  if (!fmtPartsHebreu) return [];
  const auj = new Date(); auj.setHours(12, 0, 0, 0);
  const res = [];
  for (let k = -9; k <= 400 && res.length < FETES.length; k++) {
    const d = new Date(auj); d.setDate(d.getDate() + k);
    const { mois, jour } = moisJourHebreu(d);
    FETES.forEach((f) => {
      if (res.some((r) => r.f === f) || !f.mois.includes(mois) || f.jour !== jour) return;
      if (k + f.duree <= 0) return; // déjà finie
      res.push({ f, debut: d, dans: k, enCours: k <= 0 });
    });
  }
  return res.sort((a, b) => a.dans - b.dans);
}

const dansJours = (x) => (x.enCours ? 'en ce moment !' : x.dans === 1 ? 'demain' : `dans ${x.dans} jours`);

// Le petit encart de l'accueil
function encartFete() {
  const x = fetesAVenir()[0];
  if (!x || x.dans > 45) return '';
  return `<a class="msp-w msp-fete" href="#/fetes/${x.f.id}"><div class="msp-wt">Prochaine fête</div><span class="msp-fete-em">${x.f.em}</span><b>${esc(x.f.nom)}</b><span class="he" lang="he" dir="rtl">${esc(x.f.he)}</span><small>${dansJours(x)}</small></a>`;
}

function fetes(choix) {
  const liste = fetesAVenir();
  const dateFr = (d) => d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  app.innerHTML = `<section class="ft-hero">
    <div><span class="he gr-hero-he" lang="he" dir="rtl">חַגִּים</span><h2>Le calendrier et les fêtes</h2>
    <p>Aujourd’hui, dans le calendrier hébraïque : <b class="he" lang="he" dir="rtl">${esc(dateHebraique())}</b> <span class="hint">(${esc(dateHebraiqueFr())})</span></p>
    <p class="hint">Les jours commencent la veille au coucher du soleil : une fête du mardi commence donc le lundi soir.</p></div>
  </section>
  <div class="ft-liste">${liste.map((x) => { const f = x.f, ouverte = choix ? choix === f.id : x === liste[0]; return `<details class="card ft-fete${x.enCours ? ' encours' : ''}" id="fete-${f.id}" ${ouverte ? 'open' : ''}>
    <summary><span class="ft-em">${f.em}</span><span class="ft-titre"><b>${esc(f.nom)}</b> <span class="he" lang="he" dir="rtl">${esc(f.he)}</span><small>${f.approx ? 'vers le ' : ''}${dateFr(x.debut)}${f.duree > 1 ? ` · ${f.duree} jours` : ''}</small></span><span class="ft-dans">${dansJours(x)}</span></summary>
    <div class="ft-corps">
      <p>${f.texte.replace(/([א-ת][א-ת֑-ׇ ]*[א-ת֑-ׇ])/g, '<span class="he" lang="he" dir="rtl">$1</span>')}</p>
      ${f.approx ? '<p class="hint">La date peut être avancée ou retardée d’un jour pour ne pas tomber près du shabbat.</p>' : ''}
      <div class="ft-voeu"><span class="cap">Le vœu à dire</span>${HE(f.voeu.he)} ${sayBtn(f.voeu.he)}<small>${TRS(f.voeu.tr)}${esc(f.voeu.fr)}</small></div>
      <div class="cap">Le vocabulaire de la fête</div>
      <div class="vy-mots">${f.mots.map(([h, t, fr]) => `<div class="vy-mot">${HE(h)}<small>${TRS(t)}${esc(fr)}</small>${sayBtn(h)}</div>`).join('')}</div>
      <p><button class="btn ft-ajout" data-f="${f.id}" type="button">⭐ Ajouter ces mots à mes mots à apprendre</button></p>
    </div></details>`; }).join('')}</div>`;
  $$('.ft-ajout').forEach((b) => {
    const f = FETES.find((x) => x.id === b.dataset.f);
    const reste = () => f.mots.filter(([h]) => !estDansMesMots(h) && !WORDS.some((w) => NFC(w.he) === NFC(h)));
    const maj = () => { if (!reste().length) { b.disabled = true; b.textContent = '✓ Ces mots sont déjà dans ton vocabulaire'; } };
    maj();
    b.onclick = () => { const r = reste(); r.forEach(([h, t, fr]) => ajouterMesMots([NFC(h), t, fr])); toast(`⭐ ${r.length} mot${r.length > 1 ? 's' : ''} ajouté${r.length > 1 ? 's' : ''} à tes mots à apprendre`); maj(); };
  });
  if (choix && $('#fete-' + choix)) $('#fete-' + choix).scrollIntoView({ block: 'start' });
}
routes.fetes = fetes;
