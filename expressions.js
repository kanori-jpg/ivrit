'use strict';
/* ============ Les expressions de tous les jours ============
   Une expression par jour, avec son sens mot à mot (souvent drôle) et son vrai sens. */
const EXPRESSIONS = [
  { he: 'סַבַּבָּה', tr: 'sababa', mot: 'mot venu de l’arabe', sens: 'super, d’accord, pas de souci', ex: { he: 'נִפָּגֵשׁ בְּשֶׁבַע? — סַבַּבָּה!', tr: 'nipagesh besheva? — sababa', fr: 'On se voit à sept heures ? — Ça marche !' } },
  { he: 'חֲבָל עַל הַזְּמַן', tr: 'khaval al hazman', mot: '« dommage pour le temps »', sens: 'génial, incroyable (et parfois : ce n’est pas la peine)', ex: { he: 'הַהוֹפָעָה הָיְתָה חֲבָל עַל הַזְּמַן', tr: 'hahofa’a hayta khaval al hazman', fr: 'Le concert était génial.' } },
  { he: 'עַל הַפָּנִים', tr: 'al hapanim', mot: '« sur le visage »', sens: 'nul, raté, horrible', ex: { he: 'הַיּוֹם הָיָה עַל הַפָּנִים', tr: 'hayom haya al hapanim', fr: 'La journée a été horrible.' } },
  { he: 'יֵשׁ מַצָּב', tr: 'yesh matsav', mot: '« il y a une situation »', sens: 'c’est possible, peut-être bien', ex: { he: 'אַתְּ בָּאָה מָחָר? — יֵשׁ מַצָּב', tr: 'at ba’a makhar? — yesh matsav', fr: 'Tu viens demain ? — Peut-être bien.' } },
  { he: 'אֵין מַצָּב', tr: 'ein matsav', mot: '« il n’y a pas de situation »', sens: 'pas question ! ou : c’est pas vrai ! (étonnement)', ex: { he: 'קִבַּלְתִּי מֵאָה בַּמִּבְחָן! — אֵין מַצָּב!', tr: 'kibalti me’a bamivkhan! — ein matsav!', fr: 'J’ai eu 100 à l’examen ! — C’est pas vrai !' } },
  { he: 'תַּכְלֶס', tr: 'takhles', mot: 'mot venu du yiddish, « le but »', sens: 'concrètement, en pratique, bref', ex: { he: 'תַּכְלֶס, מָה אַתָּה רוֹצֶה?', tr: 'takhles, ma ata rotse?', fr: 'Concrètement, qu’est-ce que tu veux ?' } },
  { he: 'בְּכֵּיף', tr: 'bekef', mot: '« dans le plaisir »', sens: 'avec plaisir', ex: { he: 'תּוֹדָה עַל הָעֶזְרָה! — בְּכֵּיף!', tr: 'toda al ha’ezra! — bekef!', fr: 'Merci pour ton aide ! — Avec plaisir !' } },
  { he: 'כָּל הַכָּבוֹד', tr: 'kol hakavod', mot: '« tout l’honneur »', sens: 'bravo !', ex: { he: 'עָבַרְתְּ אֶת הַמִּבְחָן? כָּל הַכָּבוֹד!', tr: 'avart et hamivkhan? kol hakavod!', fr: 'Tu as réussi l’examen ? Bravo !' } },
  { he: 'לֹא נוֹרָא', tr: 'lo nora', mot: '« pas terrible »', sens: 'ce n’est pas grave', ex: { he: 'סְלִיחָה, אִחַרְתִּי. — לֹא נוֹרָא', tr: 'slikha, ikharti. — lo nora', fr: 'Pardon, je suis en retard. — Ce n’est pas grave.' } },
  { he: 'יִהְיֶה בְּסֵדֶר', tr: 'yihye beseder', mot: '« ce sera en ordre »', sens: 'tout ira bien (la devise optimiste du pays)', ex: { he: 'אַל תִּדְאֲגִי, יִהְיֶה בְּסֵדֶר', tr: 'al tid’agi, yihye beseder', fr: 'Ne t’inquiète pas, tout ira bien.' } },
  { he: 'שָׂם פַּס', tr: 'sam pas', mot: '« il met une bande »', sens: 'il s’en fiche complètement', ex: { he: 'הוּא שָׂם פַּס עַל הַשִּׁעוּרִים', tr: 'hou sam pas al hashi’ourim', fr: 'Il se fiche complètement des cours.' } },
  { he: 'עָשִׂיתָ לִי אֶת הַיּוֹם', tr: 'asita li et hayom', mot: '« tu m’as fait la journée »', sens: 'tu as illuminé ma journée', ex: { he: 'אֵיזוֹ מַתָּנָה יָפָה! עָשִׂיתָ לִי אֶת הַיּוֹם', tr: 'eizo matana yafa! asita li et hayom', fr: 'Quel beau cadeau ! Tu as illuminé ma journée.' } },
  { he: 'חַי בְּסֶרֶט', tr: 'khai beseret', mot: '« il vit dans un film »', sens: 'il se fait des films, il est à côté de la réalité', ex: { he: 'הוּא חוֹשֵׁב שֶׁהוּא יִהְיֶה מִילְיוֹנֶר? הוּא חַי בְּסֶרֶט', tr: 'hou khoshev shehou yihye milyoner? hou khai beseret', fr: 'Il croit qu’il sera millionnaire ? Il se fait des films.' } },
  { he: 'נָפַל לִי הָאֲסִימוֹן', tr: 'nafal li ha’asimon', mot: '« le jeton m’est tombé » (le jeton des anciennes cabines téléphoniques)', sens: 'j’ai enfin compris, ça a fait tilt', ex: { he: 'אָה, עַכְשָׁו נָפַל לִי הָאֲסִימוֹן!', tr: 'ah, akhshav nafal li ha’asimon!', fr: 'Ah, maintenant j’ai compris !' } },
  { he: 'עַל הָאֵשׁ', tr: 'al ha’esh', mot: '« sur le feu »', sens: 'au barbecue (le grand plaisir israélien)', ex: { he: 'בְּשַׁבָּת אֲנַחְנוּ עוֹשִׂים עַל הָאֵשׁ', tr: 'beshabat anakhnou osim al ha’esh', fr: 'Samedi, on fait un barbecue.' } },
  { he: 'מָה הָעִנְיָנִים?', tr: 'ma ha’inyanim?', mot: '« quelles sont les affaires ? »', sens: 'quoi de neuf ? comment ça va ?', ex: { he: 'הַיי, מָה הָעִנְיָנִים?', tr: 'hai, ma ha’inyanim?', fr: 'Salut, quoi de neuf ?' } },
  { he: 'אֵיזֶה סֶרֶט!', tr: 'eize seret!', mot: '« quel film ! »', sens: 'quelle histoire ! quelle aventure !', ex: { he: 'הַטִּיסָה בֻּטְּלָה פַּעֲמַיִם. אֵיזֶה סֶרֶט!', tr: 'hatisa boutla pa’amayim. eize seret!', fr: 'Le vol a été annulé deux fois. Quelle histoire !' } },
  { he: 'סָגַרְנוּ', tr: 'sagarnou', mot: '« on a fermé »', sens: 'marché conclu, c’est d’accord', ex: { he: 'מָחָר בְּעֶשֶׂר? — סָגַרְנוּ', tr: 'makhar be’eser? — sagarnou', fr: 'Demain à dix heures ? — C’est d’accord.' } },
  { he: 'בְּלִי לַחַץ', tr: 'bli lakhats', mot: '« sans pression »', sens: 'pas de stress, prends ton temps', ex: { he: 'תַּחְזִיר לִי אֶת הַסֵּפֶר בְּלִי לַחַץ', tr: 'takhzir li et hasefer bli lakhats', fr: 'Rends-moi le livre quand tu veux, pas de stress.' } },
  { he: 'אַחְלָה', tr: 'akhla', mot: 'mot venu de l’arabe, « le plus beau »', sens: 'super, excellent', ex: { he: 'זֶה אַחְלָה רַעְיוֹן!', tr: 'ze akhla ra’ayon!', fr: 'C’est une super idée !' } },
  { he: 'לְאַט לְאַט', tr: 'le’at le’at', mot: '« lentement lentement »', sens: 'petit à petit, doucement', ex: { he: 'לְאַט לְאַט אֲנִי מְבִינָה יוֹתֵר', tr: 'le’at le’at ani mevina yoter', fr: 'Petit à petit, je comprends mieux.' } },
  { he: 'בְּלִי עַיִן הָרַע', tr: 'bli ayin hara', mot: '« sans le mauvais œil »', sens: 'touchons du bois', ex: { he: 'הַיְּלָדִים בְּרִיאִים, בְּלִי עַיִן הָרַע', tr: 'hayeladim bri’im, bli ayin hara', fr: 'Les enfants sont en bonne santé, touchons du bois.' } },
  { he: 'שְׁתֵּי יָדַיִם שְׂמָאלִיּוֹת', tr: 'shtei yadayim smaliyot', mot: '« deux mains gauches »', sens: 'maladroit, pas doué de ses mains (comme en français !)', ex: { he: 'אֲנִי לֹא מְתַקֶּנֶת כְּלוּם, יֵשׁ לִי שְׁתֵּי יָדַיִם שְׂמָאלִיּוֹת', tr: 'ani lo metakenet kloum, yesh li shtei yadayim smaliyot', fr: 'Je ne répare rien, j’ai deux mains gauches.' } },
  { he: 'הוּא חוֹפֵר', tr: 'hou khofer', mot: '« il creuse »', sens: 'il parle trop, il saoule tout le monde', ex: { he: 'דַּי, אַתָּה חוֹפֵר!', tr: 'dai, ata khofer!', fr: 'Arrête, tu nous saoules !' } },
  { he: 'כַּפָּרָה עָלַיִךְ', tr: 'kapara alayikh', mot: '« une expiation sur toi »', sens: 'ma chérie (très affectueux, entre proches)', ex: { he: 'תּוֹדָה, כַּפָּרָה עָלַיִךְ!', tr: 'toda, kapara alayikh!', fr: 'Merci, ma chérie !' } },
  { he: 'בְּאֶמְצַע הַחַיִּים', tr: 'be’emtsa hakhayim', mot: '« au milieu de la vie »', sens: 'tout à coup, sans prévenir', ex: { he: 'בְּאֶמְצַע הַחַיִּים הוּא הֶחְלִיט לָגוּר בְּאֵילַת', tr: 'be’emtsa hakhayim hou hekhlit lagour be’eilat', fr: 'Du jour au lendemain, il a décidé de vivre à Eilat.' } },
  { he: 'סוֹף הַדֶּרֶךְ', tr: 'sof haderekh', mot: '« la fin du chemin »', sens: 'extraordinaire, le top', ex: { he: 'הָאֹכֶל שָׁם סוֹף הַדֶּרֶךְ', tr: 'ha’okhel sham sof haderekh', fr: 'La nourriture là-bas est extraordinaire.' } },
  { he: 'קַח אֶת הַזְּמַן', tr: 'kakh et hazman', mot: '« prends le temps »', sens: 'prends ton temps (à un homme ; à une femme : קְחִי אֶת הַזְּמַן)', ex: { he: 'אֵין לַחַץ, קַח אֶת הַזְּמַן', tr: 'ein lakhats, kakh et hazman', fr: 'Pas de stress, prends ton temps.' } },
  { he: 'עַל הַבֹּקֶר', tr: 'al haboker', mot: '« sur le matin »', sens: 'dès le matin, à la première heure', ex: { he: 'קָפֶה עַל הַבֹּקֶר', tr: 'kafe al haboker', fr: 'Un café dès le réveil.' } },
  { he: 'יַאלְלָה בַּי', tr: 'yala bai', mot: '« allez, bye » (arabe + anglais !)', sens: 'allez, salut ! (pour finir une conversation)', ex: { he: 'טוֹב, יַאלְלָה בַּי, נְדַבֵּר מָחָר', tr: 'tov, yala bai, nedaber makhar', fr: 'Bon, allez salut, on se parle demain.' } },
];
// L'expression du jour change chaque jour, dans l'ordre de la liste
const expressionDuJour = () => EXPRESSIONS[Math.floor(new Date(dayKey() + 'T12:00').getTime() / 864e5) % EXPRESSIONS.length];

// Le petit encart de l'accueil (à la place de la citation)
function encartExpression() {
  const e = expressionDuJour();
  return `<a class="msp-w msp-citation msp-expr" href="#/expressions"><div class="msp-wt">Expression du jour</div><span class="he" lang="he" dir="rtl">${esc(e.he)}</span><span class="msp-script">${esc(e.sens.split(/[,(]/)[0])}</span></a>`;
}

function expressions() {
  const jour = expressionDuJour();
  const carte = (e, grande) => `<article class="card ex-carte${grande ? ' grande' : ''}">
    ${grande ? '<span class="cap">Expression du jour</span>' : ''}
    <div class="ex-tete">${HE(e.he)} ${sayBtn(e.he)}</div><small class="ex-tr">${esc(e.tr)}</small>
    <p class="ex-mot">Mot à mot : <i>${esc(e.mot)}</i></p>
    <p class="ex-sens">👉 ${e.sens.replace(/([א-ת][א-ת֑-ׇ ]*[א-ת֑-ׇ])/g, '<span class="he" lang="he" dir="rtl">$1</span>')}</p>
    <div class="ex-exemple">${HE(e.ex.he)} ${sayBtn(e.ex.he)}<small>${TRS(e.ex.tr)}${esc(e.ex.fr)}</small></div>
    <button class="btn ghost ex-ajout" data-he="${esc(e.he)}" type="button">⭐ À apprendre</button>
  </article>`;
  app.innerHTML = `<section class="ex-hero"><span class="he gr-hero-he" lang="he" dir="rtl">בִּיטּוּיִים</span><h2>Les expressions de tous les jours</h2>
    <p>L’hébreu qu’on entend vraiment dans la rue. Une nouvelle expression chaque jour sur l’accueil.</p></section>
  ${carte(jour, true)}
  <h3 class="ex-titre">Toutes les expressions (${EXPRESSIONS.length})</h3>
  <div class="ex-grille">${EXPRESSIONS.filter((e) => e !== jour).map((e) => carte(e, false)).join('')}</div>`;
  $$('.ex-ajout').forEach((b) => {
    const e = EXPRESSIONS.find((x) => x.he === b.dataset.he);
    const maj = () => { if (estDansMesMots(e.he)) { b.disabled = true; b.textContent = '✓ Dans tes mots à apprendre'; } };
    maj();
    b.onclick = () => { ajouterMesMots([NFC(e.he), e.tr, e.sens.split(/[,(]/)[0].trim()]); toast('⭐ Expression ajoutée à tes mots à apprendre'); maj(); };
  });
}
routes.expressions = expressions;
