// Contenu des nouvelles fonctions : histoires, scènes, articles, boutique.
// Tout texte hébreu placé dans « he: '...' » ou en tête de « ['...', ...] » reçoit un son
// avec : python outils/generer_audio.py

/* ---------- Histoires dialoguées ---------- */
const STORIES = [
  { id: 'noa', title: 'Un café avec Noa', emoji: '☕', intro: 'Tu rencontres Noa dans un café de Tel-Aviv.', who: 'Noa', lines: [
    { he: 'שָׁלוֹם! מַה שְּׁלוֹמֵךְ?', tr: 'shalom ! ma shlomekh ?', fr: 'Bonjour ! Comment vas-tu ?', choices: [
      { he: 'טוֹב, תּוֹדָה!', tr: 'tov, toda !', fr: 'Bien, merci !', ok: true },
      { he: 'לַיְלָה טוֹב', tr: 'layla tov', fr: 'Bonne nuit' },
      { he: 'כֶּלֶב', tr: 'kelev', fr: 'Chien' } ] },
    { he: 'אֲנִי נוֹעָה.', tr: 'ani Noa.', fr: 'Je suis Noa.', choices: [
      { he: 'נָעִים מְאוֹד!', tr: 'naïm meod !', fr: 'Enchantée !', ok: true },
      { he: 'לְהִתְרָאוֹת', tr: 'lehitraot', fr: 'Au revoir' },
      { he: 'לֹא', tr: 'lo', fr: 'Non' } ] },
    { he: 'אַתְּ רוֹצָה קָפֶה?', tr: 'at rotsa kafé ?', fr: 'Tu veux un café ?', choices: [
      { he: 'כֵּן, בְּבַקָּשָׁה!', tr: 'kèn, bevakasha !', fr: "Oui, s'il te plaît !", ok: true },
      { he: 'אֲנִי חָתוּל', tr: 'ani khatoul', fr: 'Je suis un chat' },
      { he: 'עֶרֶב טוֹב', tr: 'érev tov', fr: 'Bonsoir' } ] },
    { he: 'הִנֵּה הַקָּפֶה.', tr: 'hiné hakafé.', fr: 'Voici le café.', choices: [
      { he: 'תּוֹדָה רַבָּה!', tr: 'toda raba !', fr: 'Merci beaucoup !', ok: true },
      { he: 'סְלִיחָה', tr: 'slikha', fr: 'Pardon' },
      { he: 'שָׁחֹר', tr: 'shakhor', fr: 'Noir' } ] },
    { he: 'לְהִתְרָאוֹת!', tr: 'lehitraot !', fr: 'Au revoir !' },
  ] },
  { id: 'shouk', title: 'Au marché', emoji: '🍎', intro: 'Tu fais tes courses chez Dan, le marchand de fruits.', who: 'Dan', lines: [
    { he: 'בֹּקֶר טוֹב! מָה אַתְּ רוֹצָה?', tr: 'boker tov ! ma at rotsa ?', fr: "Bonjour ! Qu'est-ce que tu veux ?", choices: [
      { he: 'תַּפּוּחַ, בְּבַקָּשָׁה', tr: "tapouakh, bevakasha", fr: "Une pomme, s'il te plaît", ok: true },
      { he: 'מִטָּה, בְּבַקָּשָׁה', tr: 'mita, bevakasha', fr: "Un lit, s'il te plaît" },
      { he: 'לְהִתְרָאוֹת', tr: 'lehitraot', fr: 'Au revoir' } ] },
    { he: 'תַּפּוּחַ אָדֹם אוֹ יָרֹק?', tr: 'tapouakh adom o yarok ?', fr: 'Une pomme rouge ou verte ?', choices: [
      { he: 'אָדֹם, בְּבַקָּשָׁה', tr: 'adom, bevakasha', fr: "Rouge, s'il te plaît", ok: true },
      { he: 'כָּחֹל, בְּבַקָּשָׁה', tr: 'kakhol, bevakasha', fr: "Bleue, s'il te plaît" },
      { he: 'לַיְלָה טוֹב', tr: 'layla tov', fr: 'Bonne nuit' } ] },
    { he: 'עוֹד מַשֶּׁהוּ?', tr: 'od mashéhou ?', fr: 'Autre chose ?', choices: [
      { he: 'כֵּן, לֶחֶם וּגְבִינָה', tr: 'kèn, lekhem ougvina', fr: 'Oui, du pain et du fromage', ok: true },
      { he: 'שֶׁמֶשׁ וְיָרֵחַ', tr: 'shemesh veyaréakh', fr: 'Le soleil et la lune' },
      { he: 'אֲנִי כֶּלֶב', tr: 'ani kelev', fr: 'Je suis un chien' } ] },
    { he: 'זֶה עֲשָׂרָה שְׁקָלִים.', tr: 'zé assara shkalim.', fr: 'Ça fait dix shekels.', choices: [
      { he: 'הִנֵּה, תּוֹדָה!', tr: 'hiné, toda !', fr: 'Voilà, merci !', ok: true },
      { he: 'בֹּקֶר טוֹב', tr: 'boker tov', fr: 'Bonjour (le matin)' },
      { he: 'אַחַת', tr: 'akhat', fr: 'Un' } ] },
    { he: 'תּוֹדָה, יוֹם טוֹב!', tr: 'toda, yom tov !', fr: 'Merci, bonne journée !' },
  ] },
  { id: 'gueshem', title: 'Un jour de pluie', emoji: '☔', intro: 'Il pleut. Tu croises ton ami Yossi dans la rue.', who: 'Yossi', lines: [
    { he: 'יֵשׁ גֶּשֶׁם הַיּוֹם!', tr: 'yesh gueshem hayom !', fr: "Il pleut aujourd'hui !", choices: [
      { he: 'אֵיפֹה הַמִּטְרִיָּה שֶׁלִּי?', tr: 'eifo hamitriya sheli ?', fr: 'Où est mon parapluie ?', ok: true },
      { he: 'הַשֶּׁמֶשׁ גְּדוֹלָה', tr: 'hashemesh gdola', fr: 'Le soleil est grand' },
      { he: 'אֲנִי עוּגָה', tr: 'ani ouga', fr: 'Je suis un gâteau' } ] },
    { he: 'הַמִּטְרִיָּה בַּתִּיק.', tr: 'hamitriya batik.', fr: 'Le parapluie est dans le sac.', choices: [
      { he: 'תּוֹדָה, יוֹסִי!', tr: 'toda, Yossi !', fr: 'Merci, Yossi !', ok: true },
      { he: 'לַיְלָה טוֹב', tr: 'layla tov', fr: 'Bonne nuit' },
      { he: 'לֹא, סוּס', tr: 'lo, sous', fr: 'Non, un cheval' } ] },
    { he: 'לְאָן אַתְּ הוֹלֶכֶת?', tr: 'lean at holekhet ?', fr: 'Où vas-tu ?', choices: [
      { he: 'אֲנִי הוֹלֶכֶת הַבַּיְתָה', tr: 'ani holekhet habayta', fr: 'Je rentre à la maison', ok: true },
      { he: 'אֲנִי גְּבִינָה', tr: 'ani gvina', fr: 'Je suis un fromage' },
      { he: 'הַכֶּלֶב גָּדוֹל', tr: 'hakelev gadol', fr: 'Le chien est grand' } ] },
    { he: 'יֵשׁ לָךְ חָתוּל בַּבַּיִת?', tr: 'yesh lakh khatoul babayit ?', fr: 'Tu as un chat à la maison ?', choices: [
      { he: 'כֵּן, יֵשׁ לִי חָתוּל קָטָן', tr: 'kèn, yesh li khatoul katan', fr: "Oui, j'ai un petit chat", ok: true },
      { he: 'תּוֹדָה רַבָּה', tr: 'toda raba', fr: 'Merci beaucoup' },
      { he: 'עֶרֶב טוֹב', tr: 'érev tov', fr: 'Bonsoir' } ] },
    { he: 'יָפֶה! לְהִתְרָאוֹת.', tr: 'yafé ! lehitraot.', fr: 'Super ! Au revoir.' },
  ] },
  { id: 'eingedi', title: 'L’oasis', emoji: '💧', intro: 'Maya, une guide, te fait découvrir les cascades.', who: 'Maya', lines: [
    { he: 'בְּרוּכָה הַבָּאָה לְעֵין גֶּדִי!', tr: 'broukha habaa leEin Guedi !', fr: 'Bienvenue à Ein Guedi !', choices: [
      { he: 'תּוֹדָה, זֶה יָפֶה מְאוֹד!', tr: 'toda, zé yafé meod !', fr: "Merci, c'est très beau !", ok: true },
      { he: 'אֲנִי לֶחֶם', tr: 'ani lekhem', fr: 'Je suis du pain' },
      { he: 'לַיְלָה טוֹב', tr: 'layla tov', fr: 'Bonne nuit' } ] },
    { he: 'אַתְּ רוֹאָה אֶת הַמַּפָּל?', tr: 'at roa et hamapal ?', fr: 'Tu vois la cascade ?', choices: [
      { he: 'כֵּן, הַמַּיִם יָפִים!', tr: 'kèn, hamayim yafim !', fr: "Oui, l'eau est belle !", ok: true },
      { he: 'לֹא, אֲנִי כִּסֵּא', tr: 'lo, ani kissé', fr: 'Non, je suis une chaise' },
      { he: 'הַיָּם קָטָן', tr: 'hayam katan', fr: 'La mer est petite' } ] },
    { he: 'תִּרְאִי! יָעֵל עַל הַסֶּלַע!', tr: 'tiri ! yaël al hassela !', fr: 'Regarde ! Un bouquetin sur le rocher !', choices: [
      { he: 'אֵיזֶה יָפֶה!', tr: 'eizé yafé !', fr: "Comme c'est beau !", ok: true },
      { he: 'אֵיפֹה הַמַּפְתֵּחַ?', tr: 'eifo hamaftéakh ?', fr: 'Où est la clé ?' },
      { he: 'אֲנִי רוֹצָה עוּגָה', tr: 'ani rotsa ouga', fr: 'Je veux un gâteau' } ] },
    { he: 'אַתְּ צְמֵאָה? יֵשׁ לִי מַיִם.', tr: "at tsméa ? yesh li mayim.", fr: "Tu as soif ? J'ai de l'eau.", choices: [
      { he: 'כֵּן, תּוֹדָה רַבָּה!', tr: 'kèn, toda raba !', fr: 'Oui, merci beaucoup !', ok: true },
      { he: 'הַכֶּלֶב שָׁחֹר', tr: 'hakelev shakhor', fr: 'Le chien est noir' },
      { he: 'שָׁלוֹשׁ', tr: 'shalosh', fr: 'Trois' } ] },
    { he: 'נְסִיעָה טוֹבָה!', tr: 'nessia tova !', fr: 'Bon voyage !' },
  ] },
  { id: 'tsippori', title: 'La mosaïque', emoji: '🏛️', intro: 'Avi, un archéologue, te montre les ruines de la ville.', who: 'Avi', lines: [
    { he: 'זֶה פְּסֵיפָס עַתִּיק.', tr: 'zé psefas atik.', fr: "C'est une mosaïque ancienne.", choices: [
      { he: 'זֶה יָפֶה מְאוֹד!', tr: 'zé yafé meod !', fr: "C'est très beau !", ok: true },
      { he: 'אֲנִי גְּבִינָה', tr: 'ani gvina', fr: 'Je suis un fromage' },
      { he: 'בֹּקֶר טוֹב', tr: 'boker tov', fr: 'Bonjour (le matin)' } ] },
    { he: 'הָאֲבָנִים קְטַנּוֹת מְאוֹד.', tr: 'haavanim ktanot meod.', fr: 'Les pierres sont très petites.', choices: [
      { he: 'כֵּן, וְיֵשׁ הַרְבֵּה אֲבָנִים', tr: 'kèn, veyesh harbé avanim', fr: 'Oui, et il y a beaucoup de pierres', ok: true },
      { he: 'לֹא, יֵשׁ גֶּשֶׁם', tr: 'lo, yesh gueshem', fr: 'Non, il pleut' },
      { he: 'הַתִּיק שֶׁלִּי', tr: 'hatik sheli', fr: 'Mon sac' } ] },
    { he: 'אַתְּ יוֹדַעַת לִקְרֹא עִבְרִית?', tr: 'at yodaat likro ivrit ?', fr: "Tu sais lire l'hébreu ?", choices: [
      { he: 'כֵּן, קְצָת!', tr: 'kèn, ktsat !', fr: 'Oui, un peu !', ok: true },
      { he: 'אֲנִי שׁוֹתָה מַיִם', tr: 'ani shota mayim', fr: "Je bois de l'eau" },
      { he: 'הַשֶּׁמֶשׁ גְּדוֹלָה', tr: 'hashemesh gdola', fr: 'Le soleil est grand' } ] },
    { he: 'תִּרְאִי אֶת הַצִּבְעוֹנִים!', tr: 'tiri et hatsivonim !', fr: 'Regarde les tulipes !', choices: [
      { he: 'אֵיזֶה פְּרָחִים יָפִים!', tr: 'eizé prakhim yafim !', fr: 'Quelles belles fleurs !', ok: true },
      { he: 'אֵיפֹה הַמִּטָּה?', tr: 'eifo hamita ?', fr: 'Où est le lit ?' },
      { he: 'אַרְבַּע', tr: 'arba', fr: 'Quatre' } ] },
    { he: 'שָׁלוֹם, וּלְהִתְרָאוֹת!', tr: 'shalom, oulehitraot !', fr: 'Bonjour, et au revoir !' },
  ] },
];

/* ---------- Mots des histoires absents du vocabulaire, et formes rattachées à leur mot de base ---------- */
const MOTS_HISTOIRES = [
  ['נָעִים', 'naïm', 'agréable'],
  ['הִנֵּה', 'hiné', 'voici / voilà'],
  ['מַשֶּׁהוּ', 'mashéhou', 'quelque chose'],
  ['עֲשָׂרָה', 'assara', 'dix (avec un nom masculin)'],
  ['שֶׁקֶל', 'shékel', 'shekel (la monnaie)'],
  ['שֶׁלִּי', 'sheli', 'à moi / mon, ma'],
  ['לְאָן', 'lean', 'où (vers où)'],
  ['הַבַּיְתָה', 'habayta', 'à la maison (on y va)'],
  ['לָךְ', 'lakh', 'à toi (à une femme)'],
  ['לִי', 'li', 'à moi'],
  ['בְּרוּכָה הַבָּאָה', 'broukha habaa', 'bienvenue (à une femme)'],
  ['אֶת', 'et', 'annonce un complément défini'],
  ['עַל', 'al', 'sur'],
  ['נְסִיעָה', 'nessia', 'trajet / voyage'],
];
const FORMES_HISTOIRES = { 'מַה': 'מָה', 'שְּׁלוֹמֵךְ': 'מַה שְּׁלוֹמֵךְ?', 'רוֹצָה': 'לִרְצוֹת', 'הַקָּפֶה': 'קָפֶה', 'רַבָּה': 'תּוֹדָה רַבָּה', 'וּגְבִינָה': 'גְּבִינָה', 'וְיָרֵחַ': 'יָרֵחַ', 'שְׁקָלִים': 'שֶׁקֶל', 'הַמִּטְרִיָּה': 'מִטְרִיָּה', 'הַשֶּׁמֶשׁ': 'שֶׁמֶשׁ', 'גְּדוֹלָה': 'גָּדוֹל', 'בַּתִּיק': 'תִּיק', 'הַתִּיק': 'תִּיק', 'הוֹלֶכֶת': 'לָלֶכֶת', 'הַכֶּלֶב': 'כֶּלֶב', 'בַּבַּיִת': 'בַּיִת', 'בְּרוּכָה': 'בְּרוּכָה הַבָּאָה', 'הַבָּאָה': 'בְּרוּכָה הַבָּאָה', 'רוֹאָה': 'לִרְאוֹת', 'תִּרְאִי': 'לִרְאוֹת', 'הַמַּפָּל': 'מַפָּל', 'הַמַּיִם': 'מַיִם', 'יָפִים': 'יָפֶה', 'הַיָּם': 'יָם', 'הַסֶּלַע': 'סֶלַע', 'הַמַּפְתֵּחַ': 'מַפְתֵּחַ', 'צְמֵאָה': 'צָמֵא', 'טוֹבָה': 'טוֹב', 'הָאֲבָנִים': 'אֶבֶן', 'אֲבָנִים': 'אֶבֶן', 'קְטַנּוֹת': 'קָטָן', 'וְיֵשׁ': 'יֵשׁ', 'יוֹדַעַת': 'לָדַעַת', 'שׁוֹתָה': 'לִשְׁתּוֹת', 'הַצִּבְעוֹנִים': 'צִבְעוֹנִי', 'פְּרָחִים': 'פֶּרַח', 'הַמִּטָּה': 'מִטָּה', 'וּלְהִתְרָאוֹת': 'לְהִתְרָאוֹת' };

/* ---------- Scènes : des objets à toucher, regroupés par thème ---------- */
const SCENES = [
  { id: 'parc', theme: 'Dehors', name: 'Matin au parc', emoji: '🌳', objects: [
    ['שֶׁמֶשׁ', 'soleil', 665, 92], ['עָנָן', 'nuage', 235, 92, .95], ['צִפּוֹר', 'oiseau', 440, 160, .9], ['עֵץ', 'arbre', 135, 330, 1.45], ['פַּרְפַּר', 'papillon', 355, 305, .75], ['דְּבוֹרָה', 'abeille', 255, 415, .7], ['פֶּרַח', 'fleur', 75, 535, 1.05], ['יַלְדָּה', 'fille', 335, 485, .95], ['אוֹפַנַּיִם', 'velo', 520, 455, 1.05], ['כֶּלֶב', 'chien', 660, 515, 1], ['חָתוּל', 'chat', 175, 530, .8] ] },
  { id: 'pluie', theme: 'Dehors', name: 'Jour de pluie', emoji: '☔', objects: [
    ['עָנָן', 'nuage', 150, 85, 1, '#585f85'], ['גֶּשֶׁם', 'nuagePluie', 630, 90, 1.05], ['בַּיִת', 'maison', 305, 340, .95], ['מִטְרִיָּה', 'parapluie', 490, 385, 1], ['פַּנָּס', 'reverbere', 115, 340, 1], ['עֵץ', 'arbre', 690, 345, 1], ['תִּיק', 'sac', 610, 425, .75], ['חָתוּל', 'chat', 200, 500, .8, '#d8a66a'], ['מְכוֹנִית', 'voiture', 355, 535, 1] ] },
  { id: 'plage', theme: 'Dehors', name: 'À la plage', emoji: '🏖️', objects: [
    ['שֶׁמֶשׁ', 'soleil', 610, 180, .95], ['עָנָן', 'nuage', 175, 90], ['צִפּוֹר', 'oiseau', 410, 110, .85], ['יָם', 'mer', 225, 335, 1.3], ['דָּג', 'poisson', 430, 365, .85], ['חוֹף', 'sable', 110, 465, 1.05], ['יַלְדָּה', 'fille', 300, 490, 1], ['כּוֹבַע', 'chapeau', 455, 495, .95], ['צָב', 'tortue', 130, 555, .8], ['גְּלִידָה', 'glace', 570, 510, .85] ] },
  { id: 'nuit', theme: 'Maison', name: 'La chambre, la nuit', emoji: '🌙', objects: [
    ['יָרֵחַ', 'lune', 390, 130, 1], ['כּוֹכָב', 'etoile', 180, 110, 1.1], ['חָתוּל', 'chat', 300, 268, .8], ['אוֹר', 'lampe', 385, 345, .8], ['שָׁעוֹן', 'horloge', 640, 120, .9], ['מִטָּה', 'lit', 590, 405, 1.15], ['נֵר', 'bougie', 90, 450, 1], ['סֵפֶר', 'livre', 245, 525, .9] ] },
  { id: 'cuisine', theme: 'Maison', name: 'La cuisine', emoji: '🍳', objects: [
    ['דְּבַשׁ', 'miel', 390, 72, .8], ['לִימוֹן', 'citron', 505, 80, .7], ['קָפֶה', 'cafe', 120, 350, .95], ['חָלָב', 'lait', 240, 335, 1], ['מַיִם', 'eau', 345, 340, .95], ['לֶחֶם', 'pain', 475, 360, .95], ['תַּפּוּחַ', 'pomme', 595, 350, .95], ['גְּבִינָה', 'fromage', 710, 360, .95], ['בֵּיצָה', 'oeuf', 90, 495, .95], ['צַלַּחַת', 'assiette', 225, 510, 1.1], ['מַזְלֵג', 'fourchette', 355, 505, .85], ['סַכִּין', 'couteau', 480, 505, .85], ['כּוֹס', 'verre', 590, 500, .95], ['עוּגָה', 'gateau', 710, 510, 1.05] ] },
  { id: 'salon', theme: 'Maison', name: 'Le salon', emoji: '🏠', objects: [
    ['דֶּלֶת', 'porte', 85, 320, 1.05], ['חַלּוֹן', 'fenetre', 290, 150, 1], ['שָׁעוֹן', 'horloge', 470, 85, .95], ['סֵפֶר', 'livre', 255, 545, .85], ['כִּסֵּא', 'chaise', 215, 395, .9], ['שֻׁלְחָן', 'table', 415, 470, 1.15], ['מַחְשֵׁב', 'ordinateur', 345, 385, .65], ['כּוֹס', 'verre', 445, 395, .55], ['טֶלֶפוֹן', 'telephone', 520, 400, .55], ['עִתּוֹן', 'journal', 690, 385, .85], ['מַפְתֵּחַ', 'cle', 110, 545, .75], ['עֵט', 'stylo', 620, 530, .85] ] },
];

/* ---------- Articles simplifiés, écrits pour l'apprentissage ---------- */
const ARTICLES = [
  { id: 'meteo', title: 'מֶזֶג הָאֲוִיר', fr: 'La météo', sentences: [
    { he: 'הַיּוֹם יֵשׁ שֶׁמֶשׁ בְּתֵל אָבִיב.', fr: "Aujourd'hui, il y a du soleil à Tel-Aviv.", w: [['הַיּוֹם', "aujourd'hui"], ['יֵשׁ', 'il y a'], ['שֶׁמֶשׁ', 'soleil'], ['בְּתֵל', 'à Tel-'], ['אָבִיב', '-Aviv']] },
    { he: 'בִּירוּשָׁלַיִם יֵשׁ גֶּשֶׁם קָטָן.', fr: 'À Jérusalem, il y a une petite pluie.', w: [['בִּירוּשָׁלַיִם', 'à Jérusalem'], ['יֵשׁ', 'il y a'], ['גֶּשֶׁם', 'pluie'], ['קָטָן', 'petit(e)']] },
    { he: 'מָחָר יִהְיֶה יוֹם יָפֶה.', fr: 'Demain, ce sera une belle journée.', w: [['מָחָר', 'demain'], ['יִהְיֶה', 'sera'], ['יוֹם', 'jour'], ['יָפֶה', 'beau']] },
  ], q: 'Où pleut-il aujourd’hui ?', opts: ['À Jérusalem', 'À Tel-Aviv', 'À Haïfa'], a: 0 },
  { id: 'sifriya', title: 'סִפְרִיָּה חֲדָשָׁה', fr: 'Une nouvelle bibliothèque', sentences: [
    { he: 'בַּשְּׁכוּנָה יֵשׁ סִפְרִיָּה חֲדָשָׁה.', fr: 'Dans le quartier, il y a une nouvelle bibliothèque.', w: [['בַּשְּׁכוּנָה', 'dans le quartier'], ['יֵשׁ', 'il y a'], ['סִפְרִיָּה', 'bibliothèque'], ['חֲדָשָׁה', 'nouvelle']] },
    { he: 'יֵשׁ בָּהּ אֶלֶף סְפָרִים.', fr: 'Elle contient mille livres.', w: [['יֵשׁ', 'il y a'], ['בָּהּ', 'en elle'], ['אֶלֶף', 'mille'], ['סְפָרִים', 'livres']] },
    { he: 'יְלָדִים וְהוֹרִים בָּאִים לִקְרֹא.', fr: 'Des enfants et des parents viennent lire.', w: [['יְלָדִים', 'enfants'], ['וְהוֹרִים', 'et des parents'], ['בָּאִים', 'viennent'], ['לִקְרֹא', 'lire']] },
  ], q: 'Combien de livres y a-t-il ?', opts: ['Dix', 'Mille', 'Cent'], a: 1 },
  { id: 'hatoul', title: 'חָתוּל בַּתַּחֲנָה', fr: 'Un chat à la gare', sentences: [
    { he: 'בַּתַּחֲנָה בְּחֵיפָה גָּר חָתוּל.', fr: 'À la gare de Haïfa vit un chat.', w: [['בַּתַּחֲנָה', 'à la gare'], ['בְּחֵיפָה', 'à Haïfa'], ['גָּר', 'habite'], ['חָתוּל', 'chat']] },
    { he: 'כָּל בֹּקֶר הוּא שׁוֹתֶה חָלָב.', fr: 'Chaque matin, il boit du lait.', w: [['כָּל', 'chaque'], ['בֹּקֶר', 'matin'], ['הוּא', 'il'], ['שׁוֹתֶה', 'boit'], ['חָלָב', 'lait']] },
    { he: 'הָאֲנָשִׁים אוֹהֲבִים אוֹתוֹ מְאוֹד.', fr: 'Les gens l’aiment beaucoup.', w: [['הָאֲנָשִׁים', 'les gens'], ['אוֹהֲבִים', 'aiment'], ['אוֹתוֹ', 'le (lui)'], ['מְאוֹד', 'beaucoup']] },
  ], q: 'Que boit le chat ?', opts: ['Du café', 'De l’eau', 'Du lait'], a: 2 },
  { id: 'shouk', niveau: 1, title: 'יוֹם שִׁשִּׁי בַּשּׁוּק', fr: 'Vendredi au marché', sentences: [
    { he: 'בְּיוֹם שִׁשִּׁי הַשּׁוּק מָלֵא אֲנָשִׁים.', fr: 'Le vendredi, le marché est plein de monde.', w: [['בְּיוֹם', 'le jour'], ['שִׁשִּׁי', 'vendredi (sixième)'], ['הַשּׁוּק', 'le marché'], ['מָלֵא', 'plein'], ['אֲנָשִׁים', 'de gens']] },
    { he: 'הֵם קוֹנִים פֵּרוֹת, יְרָקוֹת וְחַלּוֹת.', fr: 'Ils achètent des fruits, des légumes et des hallot.', w: [['הֵם', 'ils'], ['קוֹנִים', 'achètent'], ['פֵּרוֹת', 'des fruits'], ['יְרָקוֹת', 'des légumes'], ['וְחַלּוֹת', 'et des hallot (pains tressés)']] },
    { he: 'הַמּוֹכְרִים צוֹעֲקִים מְחִירִים.', fr: 'Les vendeurs crient les prix.', w: [['הַמּוֹכְרִים', 'les vendeurs'], ['צוֹעֲקִים', 'crient'], ['מְחִירִים', 'des prix']] },
  ], q: 'Qu’achètent les gens ?', opts: ['Des vêtements', 'Des fruits et des légumes', 'Des livres'], a: 1 },
  { id: 'ofanayim', niveau: 1, title: 'אוֹפַנַּיִם בָּעִיר', fr: 'Le vélo en ville', sentences: [
    { he: 'בְּתֵל אָבִיב יֵשׁ הַרְבֵּה אוֹפַנַּיִם.', fr: 'À Tel-Aviv, il y a beaucoup de vélos.', w: [['בְּתֵל', 'à Tel-'], ['אָבִיב', '-Aviv'], ['יֵשׁ', 'il y a'], ['הַרְבֵּה', 'beaucoup de'], ['אוֹפַנַּיִם', 'vélos']] },
    { he: 'אֲנָשִׁים נוֹסְעִים לָעֲבוֹדָה בְּאוֹפַנַּיִם.', fr: 'Les gens vont au travail à vélo.', w: [['אֲנָשִׁים', 'des gens'], ['נוֹסְעִים', 'vont (en véhicule)'], ['לָעֲבוֹדָה', 'au travail'], ['בְּאוֹפַנַּיִם', 'à vélo']] },
    { he: 'זֶה זוֹל, מָהִיר וּבָרִיא.', fr: 'C’est bon marché, rapide et bon pour la santé.', w: [['זֶה', 'c’est'], ['זוֹל', 'bon marché'], ['מָהִיר', 'rapide'], ['וּבָרִיא', 'et sain']] },
  ], q: 'Comment les gens vont-ils au travail ?', opts: ['En bus', 'À vélo', 'À pied'], a: 1 },
  { id: 'kelev', niveau: 1, title: 'כֶּלֶב גִּבּוֹר', fr: 'Un chien héros', sentences: [
    { he: 'כֶּלֶב קָטָן מָצָא יֶלֶד בַּיַּעַר.', fr: 'Un petit chien a trouvé un enfant dans la forêt.', w: [['כֶּלֶב', 'un chien'], ['קָטָן', 'petit'], ['מָצָא', 'a trouvé'], ['יֶלֶד', 'un enfant'], ['בַּיַּעַר', 'dans la forêt']] },
    { he: 'הַיֶּלֶד הָלַךְ לְאִבּוּד בָּעֶרֶב.', fr: 'L’enfant s’était perdu le soir.', w: [['הַיֶּלֶד', 'l’enfant'], ['הָלַךְ', 'est allé'], ['לְאִבּוּד', 'se perdre (« à la perte »)'], ['בָּעֶרֶב', 'le soir']] },
    { he: 'עַכְשָׁיו הַכֶּלֶב הוּא גִּבּוֹר.', fr: 'Maintenant, le chien est un héros.', w: [['עַכְשָׁיו', 'maintenant'], ['הַכֶּלֶב', 'le chien'], ['הוּא', 'est (lui)'], ['גִּבּוֹר', 'un héros']] },
  ], q: 'Où le chien a-t-il trouvé l’enfant ?', opts: ['À la plage', 'Dans la forêt', 'À l’école'], a: 1 },
  { id: 'hofesh', niveau: 1, title: 'הַחֹפֶשׁ הַגָּדוֹל', fr: 'Les grandes vacances', sentences: [
    { he: 'מָחָר מַתְחִיל הַחֹפֶשׁ הַגָּדוֹל.', fr: 'Demain commencent les grandes vacances.', w: [['מָחָר', 'demain'], ['מַתְחִיל', 'commence'], ['הַחֹפֶשׁ', 'les vacances'], ['הַגָּדוֹל', 'grandes']] },
    { he: 'הַיְּלָדִים לֹא הוֹלְכִים לְבֵית הַסֵּפֶר.', fr: 'Les enfants ne vont pas à l’école.', w: [['הַיְּלָדִים', 'les enfants'], ['לֹא', 'ne… pas'], ['הוֹלְכִים', 'vont'], ['לְבֵית', 'à la maison de…'], ['הַסֵּפֶר', '…du livre (l’école)']] },
    { he: 'הֵם הוֹלְכִים לַיָּם וְלַבְּרֵכָה.', fr: 'Ils vont à la mer et à la piscine.', w: [['הֵם', 'ils'], ['הוֹלְכִים', 'vont'], ['לַיָּם', 'à la mer'], ['וְלַבְּרֵכָה', 'et à la piscine']] },
  ], q: 'Où vont les enfants ?', opts: ['À la mer et à la piscine', 'À l’école', 'Au cinéma'], a: 0 },
  { id: 'beitkafe', niveau: 1, title: 'בֵּית קָפֶה חָדָשׁ', fr: 'Un nouveau café', sentences: [
    { he: 'בִּרְחוֹב הֶרְצְל נִפְתַּח בֵּית קָפֶה.', fr: 'Rue Herzl, un café a ouvert.', w: [['בִּרְחוֹב', 'dans la rue'], ['הֶרְצְל', 'Herzl'], ['נִפְתַּח', 'a ouvert'], ['בֵּית', 'maison de…'], ['קָפֶה', '…café (un café)']] },
    { he: 'יֵשׁ שָׁם עוּגוֹת טְעִימוֹת וּמוּזִיקָה.', fr: 'Il y a de bons gâteaux et de la musique.', w: [['יֵשׁ', 'il y a'], ['שָׁם', 'là-bas'], ['עוּגוֹת', 'des gâteaux'], ['טְעִימוֹת', 'délicieux'], ['וּמוּזִיקָה', 'et de la musique']] },
    { he: 'הַקָּפֶה הָרִאשׁוֹן בְּחִנָּם.', fr: 'Le premier café est gratuit.', w: [['הַקָּפֶה', 'le café'], ['הָרִאשׁוֹן', 'premier'], ['בְּחִנָּם', 'gratuit']] },
  ], q: 'Qu’est-ce qui est gratuit ?', opts: ['Les gâteaux', 'Le premier café', 'La musique'], a: 1 },
  { id: 'marathon', niveau: 2, title: 'מָרָתוֹן בִּירוּשָׁלַיִם', fr: 'Un marathon à Jérusalem', sentences: [
    { he: 'אֶתְמוֹל רָצוּ אֲלָפִים בַּמָּרָתוֹן.', fr: 'Hier, des milliers de personnes ont couru le marathon.', w: [['אֶתְמוֹל', 'hier'], ['רָצוּ', 'ont couru'], ['אֲלָפִים', 'des milliers'], ['בַּמָּרָתוֹן', 'au marathon']] },
    { he: 'הַדֶּרֶךְ עָבְרָה לְיַד הָעִיר הָעַתִּיקָה.', fr: 'Le parcours est passé près de la vieille ville.', w: [['הַדֶּרֶךְ', 'le chemin'], ['עָבְרָה', 'est passé'], ['לְיַד', 'près de'], ['הָעִיר', 'la ville'], ['הָעַתִּיקָה', 'ancienne']] },
    { he: 'אִשָּׁה בַּת שִׁבְעִים גַּם סִיְּמָה.', fr: 'Une femme de soixante-dix ans a aussi terminé.', w: [['אִשָּׁה', 'une femme'], ['בַּת', 'âgée de'], ['שִׁבְעִים', 'soixante-dix (ans)'], ['גַּם', 'aussi'], ['סִיְּמָה', 'a terminé']] },
  ], q: 'Quel âge avait la femme ?', opts: ['Vingt ans', 'Cinquante ans', 'Soixante-dix ans'], a: 2 },
  { id: 'pil', niveau: 2, title: 'פִּיל קָטָן נוֹלַד', fr: 'Un éléphanteau est né', sentences: [
    { he: 'בְּגַן הַחַיּוֹת נוֹלַד פִּיל קָטָן.', fr: 'Au zoo, un petit éléphant est né.', w: [['בְּגַן', 'au jardin…'], ['הַחַיּוֹת', '…des animaux (le zoo)'], ['נוֹלַד', 'est né'], ['פִּיל', 'un éléphant'], ['קָטָן', 'petit']] },
    { he: 'הוּא שׁוֹקֵל מֵאָה קִילוֹ.', fr: 'Il pèse cent kilos.', w: [['הוּא', 'il'], ['שׁוֹקֵל', 'pèse'], ['מֵאָה', 'cent'], ['קִילוֹ', 'kilos']] },
    { he: 'הַיְּלָדִים יִבְחֲרוּ לוֹ שֵׁם.', fr: 'Les enfants lui choisiront un nom.', w: [['הַיְּלָדִים', 'les enfants'], ['יִבְחֲרוּ', 'choisiront'], ['לוֹ', 'pour lui'], ['שֵׁם', 'un nom']] },
  ], q: 'Qui va choisir son nom ?', opts: ['Les enfants', 'Le directeur du zoo', 'Les journalistes'], a: 0 },
  { id: 'rakevet', niveau: 2, title: 'קַו רַכֶּבֶת חָדָשׁ', fr: 'Une nouvelle ligne de train', sentences: [
    { he: 'בַּשָּׁבוּעַ הַבָּא יִפָּתַח קַו רַכֶּבֶת חָדָשׁ.', fr: 'La semaine prochaine, une nouvelle ligne de train ouvrira.', w: [['בַּשָּׁבוּעַ', 'la semaine'], ['הַבָּא', 'prochaine'], ['יִפָּתַח', 'ouvrira (sera ouvert)'], ['קַו', 'une ligne'], ['רַכֶּבֶת', 'de train'], ['חָדָשׁ', 'nouvelle']] },
    { he: 'הַנְּסִיעָה מֵחֵיפָה לִבְאֵר שֶׁבַע תִּהְיֶה קְצָרָה יוֹתֵר.', fr: 'Le trajet de Haïfa à Be’er Sheva sera plus court.', w: [['הַנְּסִיעָה', 'le trajet'], ['מֵחֵיפָה', 'de Haïfa'], ['לִבְאֵר', 'à Be’er…'], ['שֶׁבַע', '…Sheva'], ['תִּהְיֶה', 'sera'], ['קְצָרָה', 'courte'], ['יוֹתֵר', 'plus']] },
    { he: 'הַכַּרְטִיס יַעֲלֶה עֶשְׂרִים שְׁקָלִים.', fr: 'Le billet coûtera vingt shekels.', w: [['הַכַּרְטִיס', 'le billet'], ['יַעֲלֶה', 'coûtera'], ['עֶשְׂרִים', 'vingt'], ['שְׁקָלִים', 'shekels']] },
  ], q: 'Combien coûtera le billet ?', opts: ['Dix shekels', 'Vingt shekels', 'Cent shekels'], a: 1 },
  { id: 'sheleg', niveau: 2, title: 'שֶׁלֶג בַּחֶרְמוֹן', fr: 'De la neige sur l’Hermon', sentences: [
    { he: 'בַּלַּיְלָה יָרַד שֶׁלֶג בַּחֶרְמוֹן.', fr: 'Cette nuit, il a neigé sur l’Hermon.', w: [['בַּלַּיְלָה', 'la nuit'], ['יָרַד', 'est tombé (descendu)'], ['שֶׁלֶג', 'de la neige'], ['בַּחֶרְמוֹן', 'sur l’Hermon']] },
    { he: 'מִשְׁפָּחוֹת רַבּוֹת נָסְעוּ לִרְאוֹת אוֹתוֹ.', fr: 'Beaucoup de familles sont allées la voir.', w: [['מִשְׁפָּחוֹת', 'des familles'], ['רַבּוֹת', 'nombreuses'], ['נָסְעוּ', 'sont allées'], ['לִרְאוֹת', 'voir'], ['אוֹתוֹ', 'la (le, la neige)']] },
    { he: 'הַיְּלָדִים בָּנוּ בֻּבַּת שֶׁלֶג.', fr: 'Les enfants ont fait un bonhomme de neige.', w: [['הַיְּלָדִים', 'les enfants'], ['בָּנוּ', 'ont construit'], ['בֻּבַּת', 'une poupée de…'], ['שֶׁלֶג', '…neige (un bonhomme de neige)']] },
  ], q: 'Qu’ont fait les enfants ?', opts: ['Un château de sable', 'Un bonhomme de neige', 'Un pique-nique'], a: 1 },
  { id: 'madaanit', niveau: 2, title: 'מַדְּעָנִית צְעִירָה', fr: 'Une jeune scientifique', sentences: [
    { he: 'תַּלְמִידָה מֵאֵילַת זָכְתָה בִּפְרָס.', fr: 'Une élève d’Eilat a gagné un prix.', w: [['תַּלְמִידָה', 'une élève'], ['מֵאֵילַת', 'd’Eilat'], ['זָכְתָה', 'a gagné'], ['בִּפְרָס', 'un prix']] },
    { he: 'הִיא חָקְרָה אֶת הָאַלְמֻגִּים בַּיָּם.', fr: 'Elle a étudié les coraux dans la mer.', w: [['הִיא', 'elle'], ['חָקְרָה', 'a étudié (a fait des recherches sur)'], ['אֶת', '(devant le complément)'], ['הָאַלְמֻגִּים', 'les coraux'], ['בַּיָּם', 'dans la mer']] },
    { he: 'הִיא רוֹצָה לִהְיוֹת מַדְּעָנִית.', fr: 'Elle veut devenir scientifique.', w: [['הִיא', 'elle'], ['רוֹצָה', 'veut'], ['לִהְיוֹת', 'être, devenir'], ['מַדְּעָנִית', 'scientifique']] },
  ], q: 'Qu’a-t-elle étudié ?', opts: ['Les étoiles', 'Les coraux', 'Les oiseaux'], a: 1 },
  { id: 'aplikatsia', niveau: 3, title: 'עִבְרִית בַּטֶּלֶפוֹן', fr: 'L’hébreu sur le téléphone', sentences: [
    { he: 'יוֹתֵר וְיוֹתֵר אֲנָשִׁים לוֹמְדִים עִבְרִית בְּאַפְּלִיקַצְיָה.', fr: 'De plus en plus de gens apprennent l’hébreu avec une application.', w: [['יוֹתֵר', 'de plus…'], ['וְיוֹתֵר', '…en plus'], ['אֲנָשִׁים', 'de gens'], ['לוֹמְדִים', 'apprennent'], ['עִבְרִית', 'l’hébreu'], ['בְּאַפְּלִיקַצְיָה', 'avec une application']] },
    { he: 'הֵם לוֹמְדִים עֶשֶׂר דַּקּוֹת כָּל יוֹם.', fr: 'Ils apprennent dix minutes par jour.', w: [['הֵם', 'ils'], ['לוֹמְדִים', 'apprennent'], ['עֶשֶׂר', 'dix'], ['דַּקּוֹת', 'minutes'], ['כָּל', 'chaque'], ['יוֹם', 'jour']] },
    { he: 'לְפִי הַמּוֹרִים, זֶה טוֹב, אֲבָל לֹא מַסְפִּיק.', fr: 'Selon les professeurs, c’est bien, mais pas suffisant.', w: [['לְפִי', 'selon'], ['הַמּוֹרִים', 'les professeurs'], ['זֶה', 'c’est'], ['טוֹב', 'bien'], ['אֲבָל', 'mais'], ['לֹא', 'pas'], ['מַסְפִּיק', 'suffisant']] },
    { he: 'צָרִיךְ גַּם לְדַבֵּר עִם אֲנָשִׁים.', fr: 'Il faut aussi parler avec des gens.', w: [['צָרִיךְ', 'il faut'], ['גַּם', 'aussi'], ['לְדַבֵּר', 'parler'], ['עִם', 'avec'], ['אֲנָשִׁים', 'des gens']] },
  ], q: 'Que disent les professeurs ?', opts: ['Que l’application ne sert à rien', 'Que c’est bien, mais pas suffisant', 'Qu’il faut étudier une heure par jour'], a: 1 },
  { id: 'mayim', niveau: 3, title: 'לַחֲסֹךְ מַיִם', fr: 'Économiser l’eau', sentences: [
    { he: 'הַקַּיִץ הָיָה חַם מְאוֹד, וְלֹא יָרַד גֶּשֶׁם.', fr: 'L’été a été très chaud, et il n’a pas plu.', w: [['הַקַּיִץ', 'l’été'], ['הָיָה', 'a été'], ['חַם', 'chaud'], ['מְאוֹד', 'très'], ['וְלֹא', 'et ne… pas'], ['יָרַד', 'est tombée'], ['גֶּשֶׁם', 'la pluie']] },
    { he: 'הָעִירִיָּה מְבַקֶּשֶׁת מֵהַתּוֹשָׁבִים לַחֲסֹךְ מַיִם.', fr: 'La mairie demande aux habitants d’économiser l’eau.', w: [['הָעִירִיָּה', 'la mairie'], ['מְבַקֶּשֶׁת', 'demande'], ['מֵהַתּוֹשָׁבִים', 'aux habitants'], ['לַחֲסֹךְ', 'd’économiser'], ['מַיִם', 'de l’eau']] },
    { he: 'אֶפְשָׁר לְהִתְקַלֵּחַ פָּחוֹת זְמַן.', fr: 'On peut se doucher moins longtemps.', w: [['אֶפְשָׁר', 'on peut'], ['לְהִתְקַלֵּחַ', 'se doucher'], ['פָּחוֹת', 'moins (de)'], ['זְמַן', 'temps']] },
    { he: 'וְאֶפְשָׁר לְהַשְׁקוֹת אֶת הַגִּנָּה בַּלַּיְלָה.', fr: 'Et on peut arroser le jardin la nuit.', w: [['וְאֶפְשָׁר', 'et on peut'], ['לְהַשְׁקוֹת', 'arroser'], ['אֶת', '(devant le complément)'], ['הַגִּנָּה', 'le jardin'], ['בַּלַּיְלָה', 'la nuit']] },
  ], q: 'Que demande la mairie ?', opts: ['D’économiser l’eau', 'De planter des arbres', 'De rester à la maison'], a: 0 },
  { id: 'atsmaout', niveau: 3, title: 'יוֹם הָעַצְמָאוּת', fr: 'Le jour de l’Indépendance', sentences: [
    { he: 'בְּיוֹם הָעַצְמָאוּת הַרְבֵּה מִשְׁפָּחוֹת עוֹשׂוֹת מַנְגָּל.', fr: 'Le jour de l’Indépendance, beaucoup de familles font un barbecue.', w: [['בְּיוֹם', 'le jour'], ['הָעַצְמָאוּת', 'de l’Indépendance'], ['הַרְבֵּה', 'beaucoup de'], ['מִשְׁפָּחוֹת', 'familles'], ['עוֹשׂוֹת', 'font'], ['מַנְגָּל', 'un barbecue']] },
    { he: 'בָּעֶרֶב יֵשׁ זִקּוּקִים בַּשָּׁמַיִם.', fr: 'Le soir, il y a des feux d’artifice dans le ciel.', w: [['בָּעֶרֶב', 'le soir'], ['יֵשׁ', 'il y a'], ['זִקּוּקִים', 'des feux d’artifice'], ['בַּשָּׁמַיִם', 'dans le ciel']] },
    { he: 'אֲנָשִׁים שָׁרִים וְרוֹקְדִים בָּרְחוֹבוֹת.', fr: 'Les gens chantent et dansent dans les rues.', w: [['אֲנָשִׁים', 'des gens'], ['שָׁרִים', 'chantent'], ['וְרוֹקְדִים', 'et dansent'], ['בָּרְחוֹבוֹת', 'dans les rues']] },
    { he: 'הַדְּגָלִים הַכְּחֻלִּים וְהַלְּבָנִים בְּכָל מָקוֹם.', fr: 'Les drapeaux bleus et blancs sont partout.', w: [['הַדְּגָלִים', 'les drapeaux'], ['הַכְּחֻלִּים', 'bleus'], ['וְהַלְּבָנִים', 'et blancs'], ['בְּכָל', 'dans chaque…'], ['מָקוֹם', '…endroit (partout)']] },
  ], q: 'Que voit-on le soir dans le ciel ?', opts: ['Des avions', 'Des feux d’artifice', 'Des ballons'], a: 1 },
  { id: 'shvouasefer', niveau: 3, title: 'שְׁבוּעַ הַסֵּפֶר', fr: 'La semaine du livre', sentences: [
    { he: 'בְּיוּנִי מַתְחִיל שְׁבוּעַ הַסֵּפֶר.', fr: 'En juin commence la semaine du livre.', w: [['בְּיוּנִי', 'en juin'], ['מַתְחִיל', 'commence'], ['שְׁבוּעַ', 'la semaine'], ['הַסֵּפֶר', 'du livre']] },
    { he: 'בְּכָל הָעָרִים יֵשׁ דּוּכָנִים עִם סְפָרִים.', fr: 'Dans toutes les villes, il y a des stands avec des livres.', w: [['בְּכָל', 'dans toutes'], ['הָעָרִים', 'les villes'], ['יֵשׁ', 'il y a'], ['דּוּכָנִים', 'des stands'], ['עִם', 'avec'], ['סְפָרִים', 'des livres']] },
    { he: 'סוֹפְרִים פּוֹגְשִׁים אֶת הַקּוֹרְאִים.', fr: 'Des écrivains rencontrent les lecteurs.', w: [['סוֹפְרִים', 'des écrivains'], ['פּוֹגְשִׁים', 'rencontrent'], ['אֶת', '(devant le complément)'], ['הַקּוֹרְאִים', 'les lecteurs']] },
    { he: 'הַסְּפָרִים זוֹלִים יוֹתֵר מֵהָרָגִיל.', fr: 'Les livres sont moins chers que d’habitude.', w: [['הַסְּפָרִים', 'les livres'], ['זוֹלִים', 'bon marché'], ['יוֹתֵר', 'plus'], ['מֵהָרָגִיל', 'que d’habitude']] },
  ], q: 'Que font les écrivains ?', opts: ['Ils vendent des glaces', 'Ils rencontrent les lecteurs', 'Ils écrivent dans la rue'], a: 1 },
  { id: 'tsiporim', niveau: 3, title: 'צִפּוֹרִים בָּעֵמֶק', fr: 'Les oiseaux de la vallée', sentences: [
    { he: 'בַּסְּתָיו מַגִּיעוֹת לְיִשְׂרָאֵל מִילְיוֹנֵי צִפּוֹרִים.', fr: 'En automne, des millions d’oiseaux arrivent en Israël.', w: [['בַּסְּתָיו', 'en automne'], ['מַגִּיעוֹת', 'arrivent'], ['לְיִשְׂרָאֵל', 'en Israël'], ['מִילְיוֹנֵי', 'des millions de'], ['צִפּוֹרִים', 'oiseaux']] },
    { he: 'הֵן עָפוֹת מֵאֵירוֹפָּה לְאַפְרִיקָה.', fr: 'Ils volent d’Europe vers l’Afrique.', w: [['הֵן', 'elles (les oiseaux)'], ['עָפוֹת', 'volent'], ['מֵאֵירוֹפָּה', 'd’Europe'], ['לְאַפְרִיקָה', 'vers l’Afrique']] },
    { he: 'בְּעֵמֶק הַחוּלָה הֵן נָחוֹת וְאוֹכְלוֹת.', fr: 'Dans la vallée de la Houla, ils se reposent et mangent.', w: [['בְּעֵמֶק', 'dans la vallée'], ['הַחוּלָה', 'de la Houla'], ['הֵן', 'elles (les oiseaux)'], ['נָחוֹת', 'se reposent'], ['וְאוֹכְלוֹת', 'et mangent']] },
    { he: 'תַּיָּרִים בָּאִים לִרְאוֹת אֶת הָעֲגוּרִים.', fr: 'Des touristes viennent voir les grues.', w: [['תַּיָּרִים', 'des touristes'], ['בָּאִים', 'viennent'], ['לִרְאוֹת', 'voir'], ['אֶת', '(devant le complément)'], ['הָעֲגוּרִים', 'les grues (oiseaux)']] },
  ], q: 'D’où viennent les oiseaux ?', opts: ['D’Europe', 'D’Amérique', 'D’Asie'], a: 0 },
  { id: 'touki', niveau: 3, title: 'תֻּכִּי מְדַבֵּר', fr: 'Un perroquet qui parle', sentences: [
    { he: 'בְּחֵיפָה יֵשׁ תֻּכִּי שֶׁמְּדַבֵּר עִבְרִית.', fr: 'À Haïfa, il y a un perroquet qui parle hébreu.', w: [['בְּחֵיפָה', 'à Haïfa'], ['יֵשׁ', 'il y a'], ['תֻּכִּי', 'un perroquet'], ['שֶׁמְּדַבֵּר', 'qui parle'], ['עִבְרִית', 'hébreu']] },
    { he: 'כָּל בֹּקֶר הוּא אוֹמֵר ״בֹּקֶר טוֹב״ לַשְּׁכֵנִים.', fr: 'Chaque matin, il dit « bonjour » aux voisins.', w: [['כָּל', 'chaque'], ['בֹּקֶר', 'matin'], ['הוּא', 'il'], ['אוֹמֵר', 'dit'], ['״בֹּקֶר', '« matin…'], ['טוֹב״', '…bon » (bonjour)'], ['לַשְּׁכֵנִים', 'aux voisins']] },
    { he: 'בַּעֲלַת הַבַּיִת לִמְּדָה אוֹתוֹ חֲמִשִּׁים מִלִּים.', fr: 'Sa maîtresse lui a appris cinquante mots.', w: [['בַּעֲלַת', 'la propriétaire de…'], ['הַבַּיִת', '…la maison'], ['לִמְּדָה', 'a enseigné'], ['אוֹתוֹ', 'à lui (le)'], ['חֲמִשִּׁים', 'cinquante'], ['מִלִּים', 'mots']] },
    { he: 'הַמִּלָּה הָאֲהוּבָה עָלָיו הִיא ״עוּגִיָּה״.', fr: 'Son mot préféré, c’est « biscuit ».', w: [['הַמִּלָּה', 'le mot'], ['הָאֲהוּבָה', 'aimé'], ['עָלָיו', 'par lui (son… préféré)'], ['הִיא', 'c’est (elle)'], ['״עוּגִיָּה״', '« biscuit »']] },
  ], q: 'Quel est le mot préféré du perroquet ?', opts: ['« Bonjour »', '« Biscuit »', '« Shalom »'], a: 1 },
  { id: 'ginna', niveau: 1, title: 'גִּנָּה חֲדָשָׁה', fr: 'Un nouveau jardin public', sentences: [
    { he: 'בַּגִּנָּה יֵשׁ עֵץ גָּדוֹל.', fr: 'Dans le jardin public, il y a un grand arbre.', w: [['בַּגִּנָּה', 'dans le jardin public'], ['יֵשׁ', 'il y a'], ['עֵץ', 'un arbre'], ['גָּדוֹל', 'grand']] },
    { he: 'הַיְּלָדִים מְשַׂחֲקִים בַּגִּנָּה.', fr: 'Les enfants jouent dans le jardin.', w: [['הַיְּלָדִים', 'les enfants'], ['מְשַׂחֲקִים', 'jouent'], ['בַּגִּנָּה', 'dans le jardin']] },
    { he: 'הָאִמָּהוֹת יוֹשְׁבוֹת עַל הַסַּפְסָל.', fr: 'Les mamans sont assises sur le banc.', w: [['הָאִמָּהוֹת', 'les mamans'], ['יוֹשְׁבוֹת', 'sont assises'], ['עַל', 'sur'], ['הַסַּפְסָל', 'le banc']] },
  ], q: 'Où sont assises les mamans ?', opts: ['Sur le banc', 'Sur l’herbe', 'Dans la voiture'], a: 0 },
  { id: 'glida', niveau: 1, title: 'גְּלִידָה בַּקַּיִץ', fr: 'Une glace en été', sentences: [
    { he: 'בַּקַּיִץ חַם מְאוֹד.', fr: 'En été, il fait très chaud.', w: [['בַּקַּיִץ', 'en été'], ['חַם', 'chaud'], ['מְאוֹד', 'très']] },
    { he: 'כֻּלָּם קוֹנִים גְּלִידָה.', fr: 'Tout le monde achète une glace.', w: [['כֻּלָּם', 'tout le monde'], ['קוֹנִים', 'achètent'], ['גְּלִידָה', 'de la glace']] },
    { he: 'הַגְּלִידָה הָאֲהוּבָה הִיא שׁוֹקוֹלָד.', fr: 'La glace préférée, c’est le chocolat.', w: [['הַגְּלִידָה', 'la glace'], ['הָאֲהוּבָה', 'préférée (aimée)'], ['הִיא', 'c’est (elle)'], ['שׁוֹקוֹלָד', 'chocolat']] },
  ], q: 'Quelle est la glace préférée ?', opts: ['La vanille', 'Le chocolat', 'La fraise'], a: 1 },
  { id: 'otobous', niveau: 1, title: 'הָאוֹטוֹבּוּס מְאַחֵר', fr: 'Le bus est en retard', sentences: [
    { he: 'הָאוֹטוֹבּוּס מְאַחֵר הַיּוֹם.', fr: 'Le bus est en retard aujourd’hui.', w: [['הָאוֹטוֹבּוּס', 'le bus'], ['מְאַחֵר', 'est en retard'], ['הַיּוֹם', 'aujourd’hui']] },
    { he: 'אֲנָשִׁים מְחַכִּים בַּתַּחֲנָה.', fr: 'Des gens attendent à l’arrêt.', w: [['אֲנָשִׁים', 'des gens'], ['מְחַכִּים', 'attendent'], ['בַּתַּחֲנָה', 'à l’arrêt']] },
    { he: 'הֵם מְדַבְּרִים בַּטֶּלֶפוֹן.', fr: 'Ils parlent au téléphone.', w: [['הֵם', 'ils'], ['מְדַבְּרִים', 'parlent'], ['בַּטֶּלֶפוֹן', 'au téléphone']] },
  ], q: 'Où attendent les gens ?', opts: ['À la gare', 'Au café', 'À l’arrêt de bus'], a: 2 },
  { id: 'savta90', niveau: 1, title: 'יוֹם הֻלֶּדֶת לְסָבְתָא', fr: 'L’anniversaire de grand-mère', sentences: [
    { he: 'הַיּוֹם יוֹם הֻלֶּדֶת לְסָבְתָא.', fr: 'Aujourd’hui, c’est l’anniversaire de grand-mère.', w: [['הַיּוֹם', 'aujourd’hui'], ['יוֹם', 'jour de…'], ['הֻלֶּדֶת', '…naissance (anniversaire)'], ['לְסָבְתָא', 'pour grand-mère']] },
    { he: 'הִיא בַּת תִּשְׁעִים.', fr: 'Elle a quatre-vingt-dix ans.', w: [['הִיא', 'elle'], ['בַּת', 'âgée de'], ['תִּשְׁעִים', 'quatre-vingt-dix (ans)']] },
    { he: 'כָּל הַמִּשְׁפָּחָה בָּאָה.', fr: 'Toute la famille vient.', w: [['כָּל', 'toute'], ['הַמִּשְׁפָּחָה', 'la famille'], ['בָּאָה', 'vient']] },
  ], q: 'Quel âge a grand-mère ?', opts: ['90 ans', '60 ans', '100 ans'], a: 0 },
  { id: 'dag', niveau: 1, title: 'דָּג בַּכִּתָּה', fr: 'Un poisson dans la classe', sentences: [
    { he: 'בַּכִּתָּה שֶׁלָּנוּ יֵשׁ דָּג.', fr: 'Dans notre classe, il y a un poisson.', w: [['בַּכִּתָּה', 'dans la classe'], ['שֶׁלָּנוּ', 'à nous (notre)'], ['יֵשׁ', 'il y a'], ['דָּג', 'un poisson']] },
    { he: 'הוּא כָּתֹם וְקָטָן.', fr: 'Il est orange et petit.', w: [['הוּא', 'il'], ['כָּתֹם', 'orange'], ['וְקָטָן', 'et petit']] },
    { he: 'קוֹרְאִים לוֹ זָהָב.', fr: 'Il s’appelle Zahav (« or »).', w: [['קוֹרְאִים', 'on appelle'], ['לוֹ', 'lui'], ['זָהָב', 'Zahav (or)']] },
  ], q: 'Comment s’appelle le poisson ?', opts: ['Dag', 'Zahav', 'Katom'], a: 1 },
  { id: 'mitriya', niveau: 1, title: 'גֶּשֶׁם בִּירוּשָׁלַיִם', fr: 'De la pluie à Jérusalem', sentences: [
    { he: 'הַיּוֹם יוֹרֵד גֶּשֶׁם בִּירוּשָׁלַיִם.', fr: 'Aujourd’hui, il pleut à Jérusalem.', w: [['הַיּוֹם', 'aujourd’hui'], ['יוֹרֵד', 'tombe (descend)'], ['גֶּשֶׁם', 'de la pluie'], ['בִּירוּשָׁלַיִם', 'à Jérusalem']] },
    { he: 'לְכֻלָּם יֵשׁ מִטְרִיָּה.', fr: 'Tout le monde a un parapluie.', w: [['לְכֻלָּם', 'à tout le monde'], ['יֵשׁ', 'il y a'], ['מִטְרִיָּה', 'un parapluie']] },
    { he: 'הָרְחוֹבוֹת רְטֻבִּים.', fr: 'Les rues sont mouillées.', w: [['הָרְחוֹבוֹת', 'les rues'], ['רְטֻבִּים', 'mouillées']] },
  ], q: 'Qu’a tout le monde ?', opts: ['Un chapeau', 'Des lunettes de soleil', 'Un parapluie'], a: 2 },
  { id: 'falafel', niveau: 1, title: 'פָלָאפֶל בַּצָּהֳרַיִם', fr: 'Un falafel à midi', sentences: [
    { he: 'בַּצָּהֳרַיִם אֲנַחְנוּ אוֹכְלִים פָלָאפֶל.', fr: 'À midi, nous mangeons un falafel.', w: [['בַּצָּהֳרַיִם', 'à midi'], ['אֲנַחְנוּ', 'nous'], ['אוֹכְלִים', 'mangeons'], ['פָלָאפֶל', 'falafel']] },
    { he: 'הַפָלָאפֶל חַם וְטָעִים.', fr: 'Le falafel est chaud et délicieux.', w: [['הַפָלָאפֶל', 'le falafel'], ['חַם', 'chaud'], ['וְטָעִים', 'et délicieux']] },
    { he: 'הוּא עוֹלֶה עֶשְׂרִים שֶׁקֶל.', fr: 'Il coûte vingt shekels.', w: [['הוּא', 'il'], ['עוֹלֶה', 'coûte'], ['עֶשְׂרִים', 'vingt'], ['שֶׁקֶל', 'shekels']] },
  ], q: 'Combien coûte le falafel ?', opts: ['Vingt shekels', 'Cinq shekels', 'Cinquante shekels'], a: 0 },
  { id: 'yomyam', niveau: 1, title: 'יוֹם בַּיָּם', fr: 'Une journée à la mer', sentences: [
    { he: 'הַמִּשְׁפָּחָה בַּיָּם.', fr: 'La famille est à la mer.', w: [['הַמִּשְׁפָּחָה', 'la famille'], ['בַּיָּם', 'à la mer']] },
    { he: 'אַבָּא שׂוֹחֶה וְאִמָּא קוֹרֵאת סֵפֶר.', fr: 'Papa nage et maman lit un livre.', w: [['אַבָּא', 'papa'], ['שׂוֹחֶה', 'nage'], ['וְאִמָּא', 'et maman'], ['קוֹרֵאת', 'lit'], ['סֵפֶר', 'un livre']] },
    { he: 'הַיְּלָדִים בּוֹנִים אַרְמוֹן חוֹל.', fr: 'Les enfants construisent un château de sable.', w: [['הַיְּלָדִים', 'les enfants'], ['בּוֹנִים', 'construisent'], ['אַרְמוֹן', 'un château de…'], ['חוֹל', '…sable']] },
  ], q: 'Que fait maman ?', opts: ['Elle nage', 'Elle lit un livre', 'Elle dort'], a: 1 },
  { id: 'mouzeon', niveau: 1, title: 'מוּזֵיאוֹן לִילָדִים', fr: 'Un musée pour les enfants', sentences: [
    { he: 'בְּתֵל אָבִיב יֵשׁ מוּזֵיאוֹן חָדָשׁ.', fr: 'À Tel-Aviv, il y a un nouveau musée.', w: [['בְּתֵל', 'à Tel-'], ['אָבִיב', '-Aviv'], ['יֵשׁ', 'il y a'], ['מוּזֵיאוֹן', 'un musée'], ['חָדָשׁ', 'nouveau']] },
    { he: 'הוּא לִילָדִים.', fr: 'Il est pour les enfants.', w: [['הוּא', 'il'], ['לִילָדִים', 'pour des enfants']] },
    { he: 'אֶפְשָׁר לָגַעַת בַּכֹּל.', fr: 'On peut tout toucher.', w: [['אֶפְשָׁר', 'on peut'], ['לָגַעַת', 'toucher'], ['בַּכֹּל', 'à tout']] },
  ], q: 'Que peut-on faire dans ce musée ?', opts: ['Dormir', 'Faire la cuisine', 'Tout toucher'], a: 2 },
  { id: 'mora', niveau: 1, title: 'מוֹרָה חֲדָשָׁה', fr: 'Une nouvelle professeure', sentences: [
    { he: 'בְּבֵית הַסֵּפֶר יֵשׁ מוֹרָה חֲדָשָׁה.', fr: 'À l’école, il y a une nouvelle professeure.', w: [['בְּבֵית', 'à la maison de…'], ['הַסֵּפֶר', '…du livre (à l’école)'], ['יֵשׁ', 'il y a'], ['מוֹרָה', 'une professeure'], ['חֲדָשָׁה', 'nouvelle']] },
    { he: 'הִיא מְלַמֶּדֶת אַנְגְּלִית.', fr: 'Elle enseigne l’anglais.', w: [['הִיא', 'elle'], ['מְלַמֶּדֶת', 'enseigne'], ['אַנְגְּלִית', 'anglais']] },
    { he: 'הַתַּלְמִידִים אוֹהֲבִים אוֹתָהּ.', fr: 'Les élèves l’aiment.', w: [['הַתַּלְמִידִים', 'les élèves'], ['אוֹהֲבִים', 'aiment'], ['אוֹתָהּ', 'elle (la)']] },
  ], q: 'Qu’enseigne la nouvelle professeure ?', opts: ['L’anglais', 'Les maths', 'La musique'], a: 0 },
  { id: 'akko', niveau: 2, title: 'תַּיָּרִים בְּעַכּוֹ', fr: 'Des touristes à Akko', sentences: [
    { he: 'הַשָּׁנָה בָּאוּ הַרְבֵּה תַּיָּרִים לְעַכּוֹ.', fr: 'Cette année, beaucoup de touristes sont venus à Akko.', w: [['הַשָּׁנָה', 'cette année'], ['בָּאוּ', 'sont venus'], ['הַרְבֵּה', 'beaucoup de'], ['תַּיָּרִים', 'touristes'], ['לְעַכּוֹ', 'à Akko']] },
    { he: 'הֵם טִיְּלוּ בָּעִיר הָעַתִּיקָה.', fr: 'Ils se sont promenés dans la vieille ville.', w: [['הֵם', 'ils'], ['טִיְּלוּ', 'se sont promenés'], ['בָּעִיר', 'dans la ville'], ['הָעַתִּיקָה', 'ancienne']] },
    { he: 'הֵם אָכְלוּ דָּגִים לְיַד הַיָּם.', fr: 'Ils ont mangé du poisson près de la mer.', w: [['הֵם', 'ils'], ['אָכְלוּ', 'ont mangé'], ['דָּגִים', 'des poissons'], ['לְיַד', 'près de'], ['הַיָּם', 'la mer']] },
  ], q: 'Qu’ont mangé les touristes ?', opts: ['De la viande', 'Du poisson', 'Des pâtes'], a: 1 },
  { id: 'maafiya', niveau: 2, title: 'מַאֲפִיָּה בַּשְּׁכוּנָה', fr: 'Une boulangerie dans le quartier', sentences: [
    { he: 'בַּשָּׁבוּעַ שֶׁעָבַר נִפְתְּחָה מַאֲפִיָּה בַּשְּׁכוּנָה.', fr: 'La semaine dernière, une boulangerie a ouvert dans le quartier.', w: [['בַּשָּׁבוּעַ', 'la semaine'], ['שֶׁעָבַר', 'qui est passée (dernière)'], ['נִפְתְּחָה', 'a ouvert'], ['מַאֲפִיָּה', 'une boulangerie'], ['בַּשְּׁכוּנָה', 'dans le quartier']] },
    { he: 'הָאוֹפֶה קָם כָּל לַיְלָה בְּשָׁלוֹשׁ.', fr: 'Le boulanger se lève chaque nuit à trois heures.', w: [['הָאוֹפֶה', 'le boulanger'], ['קָם', 'se lève'], ['כָּל', 'chaque'], ['לַיְלָה', 'nuit'], ['בְּשָׁלוֹשׁ', 'à trois (heures)']] },
    { he: 'הַלֶּחֶם שֶׁלּוֹ נִגְמַר כָּל בֹּקֶר.', fr: 'Son pain est épuisé chaque matin.', w: [['הַלֶּחֶם', 'le pain'], ['שֶׁלּוֹ', 'à lui (son)'], ['נִגְמַר', 'se termine'], ['כָּל', 'chaque'], ['בֹּקֶר', 'matin']] },
  ], q: 'À quelle heure se lève le boulanger ?', opts: ['À sept heures', 'À midi', 'À trois heures'], a: 2 },
  { id: 'hofaa', niveau: 2, title: 'הוֹפָעָה בַּפָּארְק', fr: 'Un concert dans le parc', sentences: [
    { he: 'בְּיוֹם חֲמִישִׁי תִּהְיֶה הוֹפָעָה בַּפָּארְק.', fr: 'Jeudi, il y aura un concert dans le parc.', w: [['בְּיוֹם', 'le jour'], ['חֲמִישִׁי', 'cinquième (jeudi)'], ['תִּהְיֶה', 'il y aura'], ['הוֹפָעָה', 'un spectacle'], ['בַּפָּארְק', 'dans le parc']] },
    { he: 'הַכְּנִיסָה תִּהְיֶה בְּחִנָּם.', fr: 'L’entrée sera gratuite.', w: [['הַכְּנִיסָה', 'l’entrée'], ['תִּהְיֶה', 'sera'], ['בְּחִנָּם', 'gratuite']] },
    { he: 'כְּדַאי לְהָבִיא כִּסֵּא.', fr: 'Il vaut mieux apporter une chaise.', w: [['כְּדַאי', 'il vaut mieux'], ['לְהָבִיא', 'apporter'], ['כִּסֵּא', 'une chaise']] },
  ], q: 'Que vaut-il mieux apporter ?', opts: ['Une chaise', 'Un parapluie', 'Un gâteau'], a: 0 },
  { id: 'tsav', niveau: 2, title: 'צָב בָּרְחוֹב', fr: 'Une tortue dans la rue', sentences: [
    { he: 'אֶתְמוֹל רָאוּ צָב גָּדוֹל בְּאֶמְצַע הָרְחוֹב.', fr: 'Hier, on a vu une grosse tortue au milieu de la rue.', w: [['אֶתְמוֹל', 'hier'], ['רָאוּ', 'on a vu'], ['צָב', 'une tortue'], ['גָּדוֹל', 'grande'], ['בְּאֶמְצַע', 'au milieu de'], ['הָרְחוֹב', 'la rue']] },
    { he: 'שׁוֹטֵר עָצַר אֶת הַמְּכוֹנִיּוֹת.', fr: 'Un policier a arrêté les voitures.', w: [['שׁוֹטֵר', 'un policier'], ['עָצַר', 'a arrêté'], ['אֶת', '(devant le complément)'], ['הַמְּכוֹנִיּוֹת', 'les voitures']] },
    { he: 'הַצָּב עָבַר לְאַט לְאַט.', fr: 'La tortue a traversé très lentement.', w: [['הַצָּב', 'la tortue'], ['עָבַר', 'a traversé'], ['לְאַט', 'lentement…'], ['לְאַט', '…lentement']] },
  ], q: 'Qui a arrêté les voitures ?', opts: ['Un enfant', 'Un policier', 'Un chauffeur de bus'], a: 1 },
  { id: 'sadna', niveau: 2, title: 'סַדְנַת בִּשּׁוּל', fr: 'Un atelier de cuisine', sentences: [
    { he: 'בַּמַּתְנָ״ס פָּתְחוּ סַדְנַת בִּשּׁוּל.', fr: 'Au centre culturel, on a ouvert un atelier de cuisine.', w: [['בַּמַּתְנָ״ס', 'au centre culturel'], ['פָּתְחוּ', 'on a ouvert'], ['סַדְנַת', 'un atelier de'], ['בִּשּׁוּל', 'cuisine']] },
    { he: 'כָּל שָׁבוּעַ מְבַשְּׁלִים מַאֲכָל אַחֵר.', fr: 'Chaque semaine, on cuisine un plat différent.', w: [['כָּל', 'chaque'], ['שָׁבוּעַ', 'semaine'], ['מְבַשְּׁלִים', 'on cuisine'], ['מַאֲכָל', 'un plat'], ['אַחֵר', 'autre']] },
    { he: 'בַּפַּעַם הָרִאשׁוֹנָה הֵם הֵכִינוּ שַׁקְשׁוּקָה.', fr: 'La première fois, ils ont préparé une chakchouka.', w: [['בַּפַּעַם', 'la fois'], ['הָרִאשׁוֹנָה', 'première'], ['הֵם', 'ils'], ['הֵכִינוּ', 'ont préparé'], ['שַׁקְשׁוּקָה', 'une chakchouka']] },
  ], q: 'Qu’ont-ils préparé la première fois ?', opts: ['Un couscous', 'Une soupe', 'Une chakchouka'], a: 2 },
  { id: 'sefer50', niveau: 2, title: 'סֵפֶר חָזַר אַחֲרֵי חֲמִשִּׁים שָׁנָה', fr: 'Un livre rendu après cinquante ans', sentences: [
    { he: 'אִישׁ אֶחָד הֶחֱזִיר סֵפֶר לַסִּפְרִיָּה.', fr: 'Un homme a rendu un livre à la bibliothèque.', w: [['אִישׁ', 'un homme'], ['אֶחָד', 'un'], ['הֶחֱזִיר', 'a rendu'], ['סֵפֶר', 'un livre'], ['לַסִּפְרִיָּה', 'à la bibliothèque']] },
    { he: 'הוּא לָקַח אוֹתוֹ לִפְנֵי חֲמִשִּׁים שָׁנָה.', fr: 'Il l’avait emprunté il y a cinquante ans.', w: [['הוּא', 'il'], ['לָקַח', 'a pris'], ['אוֹתוֹ', 'le'], ['לִפְנֵי', 'il y a (avant)'], ['חֲמִשִּׁים', 'cinquante'], ['שָׁנָה', 'ans']] },
    { he: 'הַסַּפְרָנִית צָחֲקָה וְלֹא בִּקְּשָׁה כֶּסֶף.', fr: 'La bibliothécaire a ri et n’a pas demandé d’argent.', w: [['הַסַּפְרָנִית', 'la bibliothécaire'], ['צָחֲקָה', 'a ri'], ['וְלֹא', 'et ne… pas'], ['בִּקְּשָׁה', 'a demandé'], ['כֶּסֶף', 'de l’argent']] },
  ], q: 'Qu’a fait la bibliothécaire ?', opts: ['Elle a ri', 'Elle s’est fâchée', 'Elle a appelé la police'], a: 0 },
  { id: 'tapouzim', niveau: 2, title: 'קְטִיף תַּפּוּזִים', fr: 'La cueillette des oranges', sentences: [
    { he: 'בַּחֹרֶף מַתְחִיל קְטִיף הַתַּפּוּזִים.', fr: 'En hiver commence la cueillette des oranges.', w: [['בַּחֹרֶף', 'en hiver'], ['מַתְחִיל', 'commence'], ['קְטִיף', 'la cueillette de'], ['הַתַּפּוּזִים', 'les oranges']] },
    { he: 'מִשְׁפָּחוֹת יְכוֹלוֹת לִקְטֹף בְּעַצְמָן.', fr: 'Les familles peuvent cueillir elles-mêmes.', w: [['מִשְׁפָּחוֹת', 'des familles'], ['יְכוֹלוֹת', 'peuvent'], ['לִקְטֹף', 'cueillir'], ['בְּעַצְמָן', 'elles-mêmes']] },
    { he: 'כָּל קִילוֹ יַעֲלֶה חֲמִשָּׁה שְׁקָלִים.', fr: 'Chaque kilo coûtera cinq shekels.', w: [['כָּל', 'chaque'], ['קִילוֹ', 'kilo'], ['יַעֲלֶה', 'coûtera'], ['חֲמִשָּׁה', 'cinq'], ['שְׁקָלִים', 'shekels']] },
  ], q: 'Combien coûtera un kilo d’oranges ?', opts: ['Cinquante shekels', 'Cinq shekels', 'Un shekel'], a: 1 },
  { id: 'blisoukar', niveau: 2, title: 'יוֹם בְּלִי סֻכָּר', fr: 'Une journée sans sucre', sentences: [
    { he: 'בֵּית סֵפֶר בִּרְחוֹבוֹת הֶחְלִיט עַל יוֹם בְּלִי סֻכָּר.', fr: 'Une école de Rehovot a décidé d’une journée sans sucre.', w: [['בֵּית', 'maison de…'], ['סֵפֶר', '…livre (une école)'], ['בִּרְחוֹבוֹת', 'à Rehovot'], ['הֶחְלִיט', 'a décidé'], ['עַל', 'de'], ['יוֹם', 'un jour'], ['בְּלִי', 'sans'], ['סֻכָּר', 'sucre']] },
    { he: 'הַיְּלָדִים אָכְלוּ פֵּרוֹת בִּמְקוֹם עוּגוֹת.', fr: 'Les enfants ont mangé des fruits au lieu de gâteaux.', w: [['הַיְּלָדִים', 'les enfants'], ['אָכְלוּ', 'ont mangé'], ['פֵּרוֹת', 'des fruits'], ['בִּמְקוֹם', 'au lieu de'], ['עוּגוֹת', 'gâteaux']] },
    { he: 'רֹב הַיְּלָדִים אָהֲבוּ אֶת הָרַעְיוֹן.', fr: 'La plupart des enfants ont aimé l’idée.', w: [['רֹב', 'la plupart de'], ['הַיְּלָדִים', 'les enfants'], ['אָהֲבוּ', 'ont aimé'], ['אֶת', '(devant le complément)'], ['הָרַעְיוֹן', 'l’idée']] },
  ], q: 'Qu’ont mangé les enfants ?', opts: ['Des gâteaux', 'Des bonbons', 'Des fruits'], a: 2 },
  { id: 'galgiliot', niveau: 2, title: 'מַסְלוּל חָדָשׁ לְגַלְגִּלִּיּוֹת', fr: 'Une nouvelle piste de roller', sentences: [
    { he: 'בַּפָּארְק הַגָּדוֹל בָּנוּ מַסְלוּל לְגַלְגִּלִּיּוֹת.', fr: 'Dans le grand parc, on a construit une piste de roller.', w: [['בַּפָּארְק', 'dans le parc'], ['הַגָּדוֹל', 'grand'], ['בָּנוּ', 'on a construit'], ['מַסְלוּל', 'une piste'], ['לְגַלְגִּלִּיּוֹת', 'pour rollers']] },
    { he: 'בְּיוֹם שִׁשִּׁי בָּאוּ מֵאוֹת יְלָדִים.', fr: 'Vendredi, des centaines d’enfants sont venus.', w: [['בְּיוֹם', 'le jour'], ['שִׁשִּׁי', 'sixième (vendredi)'], ['בָּאוּ', 'sont venus'], ['מֵאוֹת', 'des centaines de'], ['יְלָדִים', 'enfants']] },
    { he: 'הֵם צְרִיכִים לִלְבֹּשׁ קַסְדָּה.', fr: 'Ils doivent porter un casque.', w: [['הֵם', 'ils'], ['צְרִיכִים', 'doivent'], ['לִלְבֹּשׁ', 'porter (s’habiller de)'], ['קַסְדָּה', 'un casque']] },
  ], q: 'Que doivent porter les enfants ?', opts: ['Un casque', 'Un chapeau', 'Des gants'], a: 0 },
  { id: 'yareah', niveau: 2, title: 'לַיְלָה שֶׁל יָרֵחַ מָלֵא', fr: 'Une nuit de pleine lune', sentences: [
    { he: 'מָחָר בַּלַּיְלָה יִהְיֶה יָרֵחַ מָלֵא.', fr: 'Demain soir, ce sera la pleine lune.', w: [['מָחָר', 'demain'], ['בַּלַּיְלָה', 'la nuit'], ['יִהְיֶה', 'il y aura'], ['יָרֵחַ', 'une lune'], ['מָלֵא', 'pleine']] },
    { he: 'הוּא יִהְיֶה גָּדוֹל וּבָהִיר מְאוֹד.', fr: 'Elle sera très grande et très lumineuse.', w: [['הוּא', 'il (elle)'], ['יִהְיֶה', 'sera'], ['גָּדוֹל', 'grande'], ['וּבָהִיר', 'et lumineuse'], ['מְאוֹד', 'très']] },
    { he: 'אֶפְשָׁר יִהְיֶה לִרְאוֹת אוֹתוֹ בְּלִי טֶלֶסְקוֹפּ.', fr: 'On pourra la voir sans télescope.', w: [['אֶפְשָׁר', 'possible'], ['יִהְיֶה', 'sera (on pourra)'], ['לִרְאוֹת', 'voir'], ['אוֹתוֹ', 'la'], ['בְּלִי', 'sans'], ['טֶלֶסְקוֹפּ', 'télescope']] },
  ], q: 'De quoi a-t-on besoin pour voir la lune ?', opts: ['D’un télescope', 'De rien : on la voit sans télescope', 'De jumelles'], a: 1 },
  { id: 'omanim', niveau: 3, title: 'קִבּוּץ שֶׁל אָמָּנִים', fr: 'Un kibboutz d’artistes', sentences: [
    { he: 'בַּצָּפוֹן יֵשׁ קִבּוּץ קָטָן שֶׁל אָמָּנִים.', fr: 'Dans le nord, il y a un petit kibboutz d’artistes.', w: [['בַּצָּפוֹן', 'dans le nord'], ['יֵשׁ', 'il y a'], ['קִבּוּץ', 'un kibboutz'], ['קָטָן', 'petit'], ['שֶׁל', 'de'], ['אָמָּנִים', 'artistes']] },
    { he: 'הֵם מְצַיְּרִים, מְפַסְּלִים וְעוֹשִׂים כְּלֵי חֶרֶס.', fr: 'Ils peignent, sculptent et font des poteries.', w: [['הֵם', 'ils'], ['מְצַיְּרִים', 'dessinent (peignent)'], ['מְפַסְּלִים', 'sculptent'], ['וְעוֹשִׂים', 'et font'], ['כְּלֵי', 'objets de…'], ['חֶרֶס', '…terre cuite (poteries)']] },
    { he: 'פַּעַם בְּחֹדֶשׁ הֵם פּוֹתְחִים אֶת הַבָּתִּים לַמְּבַקְּרִים.', fr: 'Une fois par mois, ils ouvrent leurs maisons aux visiteurs.', w: [['פַּעַם', 'une fois'], ['בְּחֹדֶשׁ', 'par mois'], ['הֵם', 'ils'], ['פּוֹתְחִים', 'ouvrent'], ['אֶת', '(devant le complément)'], ['הַבָּתִּים', 'les maisons'], ['לַמְּבַקְּרִים', 'aux visiteurs']] },
    { he: 'הַמְּבַקְּרִים יְכוֹלִים לִלְמֹד וְלִקְנוֹת.', fr: 'Les visiteurs peuvent apprendre et acheter.', w: [['הַמְּבַקְּרִים', 'les visiteurs'], ['יְכוֹלִים', 'peuvent'], ['לִלְמֹד', 'apprendre'], ['וְלִקְנוֹת', 'et acheter']] },
  ], q: 'Quand ouvrent-ils leurs maisons aux visiteurs ?', opts: ['Tous les jours', 'Une fois par an', 'Une fois par mois'], a: 2 },
  { id: 'robot', niveau: 3, title: 'רוֹבּוֹט בְּבֵית הַחוֹלִים', fr: 'Un robot à l’hôpital', sentences: [
    { he: 'בְּבֵית חוֹלִים בְּחֵיפָה עוֹבֵד רוֹבּוֹט חָדָשׁ.', fr: 'Dans un hôpital de Haïfa travaille un nouveau robot.', w: [['בְּבֵית', 'dans une maison de…'], ['חוֹלִים', '…malades (hôpital)'], ['בְּחֵיפָה', 'à Haïfa'], ['עוֹבֵד', 'travaille'], ['רוֹבּוֹט', 'un robot'], ['חָדָשׁ', 'nouveau']] },
    { he: 'הוּא מֵבִיא תְּרוּפוֹת וְאֹכֶל לַחוֹלִים.', fr: 'Il apporte des médicaments et de la nourriture aux malades.', w: [['הוּא', 'il'], ['מֵבִיא', 'apporte'], ['תְּרוּפוֹת', 'des médicaments'], ['וְאֹכֶל', 'et de la nourriture'], ['לַחוֹלִים', 'aux malades']] },
    { he: 'הָאֲחָיוֹת אוֹמְרוֹת שֶׁיֵּשׁ לָהֶן יוֹתֵר זְמַן לַחוֹלִים.', fr: 'Les infirmières disent qu’elles ont plus de temps pour les malades.', w: [['הָאֲחָיוֹת', 'les infirmières'], ['אוֹמְרוֹת', 'disent'], ['שֶׁיֵּשׁ', 'qu’il y a'], ['לָהֶן', 'à elles (elles ont)'], ['יוֹתֵר', 'plus de'], ['זְמַן', 'temps'], ['לַחוֹלִים', 'pour les malades']] },
    { he: 'הַיְּלָדִים בַּמַּחְלָקָה קָרְאוּ לוֹ ״חָבֵר״.', fr: 'Les enfants du service l’ont appelé « Ami ».', w: [['הַיְּלָדִים', 'les enfants'], ['בַּמַּחְלָקָה', 'dans le service'], ['קָרְאוּ', 'ont appelé'], ['לוֹ', 'lui'], ['״חָבֵר״', '« ami »']] },
  ], q: 'Comment les enfants ont-ils appelé le robot ?', opts: ['« Ami »', '« Docteur »', '« Robot »'], a: 0 },
  { id: 'midbar', niveau: 3, title: 'לַיְלָה בַּמִּדְבָּר', fr: 'Une nuit dans le désert', sentences: [
    { he: 'הַרְבֵּה יִשְׂרְאֵלִים אוֹהֲבִים לִישׁוֹן בַּמִּדְבָּר.', fr: 'Beaucoup d’Israéliens aiment dormir dans le désert.', w: [['הַרְבֵּה', 'beaucoup d’'], ['יִשְׂרְאֵלִים', 'Israéliens'], ['אוֹהֲבִים', 'aiment'], ['לִישׁוֹן', 'dormir'], ['בַּמִּדְבָּר', 'dans le désert']] },
    { he: 'בַּיּוֹם חַם מְאוֹד, אֲבָל בַּלַּיְלָה קַר.', fr: 'Le jour il fait très chaud, mais la nuit il fait froid.', w: [['בַּיּוֹם', 'le jour'], ['חַם', 'chaud'], ['מְאוֹד', 'très'], ['אֲבָל', 'mais'], ['בַּלַּיְלָה', 'la nuit'], ['קַר', 'froid']] },
    { he: 'בַּשָּׁמַיִם רוֹאִים אַלְפֵי כּוֹכָבִים.', fr: 'Dans le ciel, on voit des milliers d’étoiles.', w: [['בַּשָּׁמַיִם', 'dans le ciel'], ['רוֹאִים', 'on voit'], ['אַלְפֵי', 'des milliers de'], ['כּוֹכָבִים', 'étoiles']] },
    { he: 'חָשׁוּב לְהָבִיא הַרְבֵּה מַיִם וּשְׂמִיכָה חַמָּה.', fr: 'Il est important d’apporter beaucoup d’eau et une couverture chaude.', w: [['חָשׁוּב', 'important'], ['לְהָבִיא', 'd’apporter'], ['הַרְבֵּה', 'beaucoup d’'], ['מַיִם', 'eau'], ['וּשְׂמִיכָה', 'et une couverture'], ['חַמָּה', 'chaude']] },
  ], q: 'Comment est la nuit dans le désert ?', opts: ['Chaude', 'Froide', 'Pluvieuse'], a: 1 },
  { id: 'savtastudent', niveau: 3, title: 'סָבְתָא בָּאוּנִיבֶרְסִיטָה', fr: 'Une grand-mère à l’université', sentences: [
    { he: 'סָבְתָא מִנְּתַנְיָה הִתְחִילָה לִלְמֹד בָּאוּנִיבֶרְסִיטָה.', fr: 'Une grand-mère de Netanya a commencé à étudier à l’université.', w: [['סָבְתָא', 'une grand-mère'], ['מִנְּתַנְיָה', 'de Netanya'], ['הִתְחִילָה', 'a commencé'], ['לִלְמֹד', 'à étudier'], ['בָּאוּנִיבֶרְסִיטָה', 'à l’université']] },
    { he: 'הִיא בַּת שִׁבְעִים וְחָמֵשׁ.', fr: 'Elle a soixante-quinze ans.', w: [['הִיא', 'elle'], ['בַּת', 'âgée de'], ['שִׁבְעִים', 'soixante-dix'], ['וְחָמֵשׁ', 'et cinq']] },
    { he: 'הִיא לוֹמֶדֶת הִיסְטוֹרְיָה עִם סְטוּדֶנְטִים צְעִירִים.', fr: 'Elle étudie l’histoire avec de jeunes étudiants.', w: [['הִיא', 'elle'], ['לוֹמֶדֶת', 'étudie'], ['הִיסְטוֹרְיָה', 'histoire'], ['עִם', 'avec'], ['סְטוּדֶנְטִים', 'des étudiants'], ['צְעִירִים', 'jeunes']] },
    { he: 'הֵם אוֹמְרִים שֶׁהִיא הַתַּלְמִידָה הֲכִי טוֹבָה.', fr: 'Ils disent qu’elle est la meilleure élève.', w: [['הֵם', 'ils'], ['אוֹמְרִים', 'disent'], ['שֶׁהִיא', 'qu’elle'], ['הַתַּלְמִידָה', 'l’élève'], ['הֲכִי', 'la plus'], ['טוֹבָה', 'bonne']] },
  ], q: 'Quel âge a la grand-mère ?', opts: ['57 ans', '25 ans', '75 ans'], a: 2 },
  { id: 'nikayon', niveau: 3, title: 'מִבְצַע נִקָּיוֹן בַּחוֹף', fr: 'Opération nettoyage sur la plage', sentences: [
    { he: 'בְּשַׁבָּת בַּבֹּקֶר בָּאוּ מִתְנַדְּבִים לְחוֹף הַיָּם.', fr: 'Samedi matin, des bénévoles sont venus sur la plage.', w: [['בְּשַׁבָּת', 'samedi'], ['בַּבֹּקֶר', 'le matin'], ['בָּאוּ', 'sont venus'], ['מִתְנַדְּבִים', 'des bénévoles'], ['לְחוֹף', 'au bord de…'], ['הַיָּם', '…la mer (la plage)']] },
    { he: 'הֵם אָסְפוּ בַּקְבּוּקִים, שַׂקִּיּוֹת וּפְלַסְטִיק.', fr: 'Ils ont ramassé des bouteilles, des sacs et du plastique.', w: [['הֵם', 'ils'], ['אָסְפוּ', 'ont ramassé'], ['בַּקְבּוּקִים', 'des bouteilles'], ['שַׂקִּיּוֹת', 'des sacs (en plastique)'], ['וּפְלַסְטִיק', 'et du plastique']] },
    { he: 'בְּסוֹף הַיּוֹם הָיוּ לָהֶם מֵאָה שַׂקִּים מְלֵאִים.', fr: 'À la fin de la journée, ils avaient cent sacs pleins.', w: [['בְּסוֹף', 'à la fin de'], ['הַיּוֹם', 'la journée'], ['הָיוּ', 'il y avait'], ['לָהֶם', 'à eux (ils avaient)'], ['מֵאָה', 'cent'], ['שַׂקִּים', 'sacs'], ['מְלֵאִים', 'pleins']] },
    { he: 'הָעִירִיָּה אָמְרָה לָהֶם תּוֹדָה רַבָּה.', fr: 'La mairie leur a dit un grand merci.', w: [['הָעִירִיָּה', 'la mairie'], ['אָמְרָה', 'a dit'], ['לָהֶם', 'à eux'], ['תּוֹדָה', 'merci'], ['רַבָּה', 'beaucoup']] },
  ], q: 'Combien de sacs pleins avaient-ils ?', opts: ['Cent', 'Dix', 'Mille'], a: 0 },
  { id: 'kelevnehiya', niveau: 3, title: 'כֶּלֶב נְחִיָּה', fr: 'Un chien guide', sentences: [
    { he: 'לְדָנִי יֵשׁ כֶּלֶב נְחִיָּה.', fr: 'Dani a un chien guide.', w: [['לְדָנִי', 'à Dani'], ['יֵשׁ', 'il y a'], ['כֶּלֶב', 'un chien'], ['נְחִיָּה', 'de guidage']] },
    { he: 'דָּנִי לֹא רוֹאֶה, וְהַכֶּלֶב עוֹזֵר לוֹ בָּרְחוֹב.', fr: 'Dani ne voit pas, et le chien l’aide dans la rue.', w: [['דָּנִי', 'Dani'], ['לֹא', 'ne… pas'], ['רוֹאֶה', 'voit'], ['וְהַכֶּלֶב', 'et le chien'], ['עוֹזֵר', 'aide'], ['לוֹ', 'lui'], ['בָּרְחוֹב', 'dans la rue']] },
    { he: 'הֵם נוֹסְעִים יַחַד בָּאוֹטוֹבּוּס וּבָרַכֶּבֶת.', fr: 'Ils voyagent ensemble en bus et en train.', w: [['הֵם', 'ils'], ['נוֹסְעִים', 'voyagent'], ['יַחַד', 'ensemble'], ['בָּאוֹטוֹבּוּס', 'en bus'], ['וּבָרַכֶּבֶת', 'et en train']] },
    { he: 'הַכֶּלֶב עוֹבֵד כָּל הַיּוֹם, וּבָעֶרֶב הוּא מְשַׂחֵק.', fr: 'Le chien travaille toute la journée, et le soir il joue.', w: [['הַכֶּלֶב', 'le chien'], ['עוֹבֵד', 'travaille'], ['כָּל', 'toute'], ['הַיּוֹם', 'la journée'], ['וּבָעֶרֶב', 'et le soir'], ['הוּא', 'il'], ['מְשַׂחֵק', 'joue']] },
  ], q: 'Que fait le chien le soir ?', opts: ['Il travaille', 'Il joue', 'Il prend le bus seul'], a: 1 },
  { id: 'gag', niveau: 3, title: 'גִּנָּה עַל הַגַּג', fr: 'Un potager sur le toit', sentences: [
    { he: 'בְּבִנְיָן בְּתֵל אָבִיב הַשְּׁכֵנִים שָׁתְלוּ גִּנָּה עַל הַגַּג.', fr: 'Dans un immeuble de Tel-Aviv, les voisins ont planté un jardin sur le toit.', w: [['בְּבִנְיָן', 'dans un immeuble'], ['בְּתֵל', 'à Tel-'], ['אָבִיב', '-Aviv'], ['הַשְּׁכֵנִים', 'les voisins'], ['שָׁתְלוּ', 'ont planté'], ['גִּנָּה', 'un jardin'], ['עַל', 'sur'], ['הַגַּג', 'le toit']] },
    { he: 'הֵם מְגַדְּלִים עַגְבָנִיּוֹת, מְלָפְפוֹנִים וְנַעְנַע.', fr: 'Ils cultivent des tomates, des concombres et de la menthe.', w: [['הֵם', 'ils'], ['מְגַדְּלִים', 'cultivent'], ['עַגְבָנִיּוֹת', 'des tomates'], ['מְלָפְפוֹנִים', 'des concombres'], ['וְנַעְנַע', 'et de la menthe']] },
    { he: 'כָּל שָׁבוּעַ שָׁכֵן אַחֵר מַשְׁקֶה אֶת הַצְּמָחִים.', fr: 'Chaque semaine, un voisin différent arrose les plantes.', w: [['כָּל', 'chaque'], ['שָׁבוּעַ', 'semaine'], ['שָׁכֵן', 'un voisin'], ['אַחֵר', 'autre'], ['מַשְׁקֶה', 'arrose'], ['אֶת', '(devant le complément)'], ['הַצְּמָחִים', 'les plantes']] },
    { he: 'עַכְשָׁיו הַשְּׁכֵנִים מַכִּירִים זֶה אֶת זֶה.', fr: 'Maintenant, les voisins se connaissent.', w: [['עַכְשָׁיו', 'maintenant'], ['הַשְּׁכֵנִים', 'les voisins'], ['מַכִּירִים', 'connaissent'], ['זֶה', 'l’un…'], ['אֶת', '(devant le complément)'], ['זֶה', '…l’autre']] },
  ], q: 'Qui arrose les plantes ?', opts: ['Le gardien de l’immeuble', 'Personne', 'Un voisin différent chaque semaine'], a: 2 },
  { id: 'shahmat', niveau: 3, title: 'אַלּוּפַת שַׁחְמָט בַּת עֶשֶׂר', fr: 'Une championne d’échecs de dix ans', sentences: [
    { he: 'יַלְדָּה בַּת עֶשֶׂר מִבְּאֵר שֶׁבַע נִצְּחָה בְּתַחֲרוּת שַׁחְמָט.', fr: 'Une fillette de dix ans de Be’er Sheva a gagné un tournoi d’échecs.', w: [['יַלְדָּה', 'une fillette'], ['בַּת', 'âgée de'], ['עֶשֶׂר', 'dix (ans)'], ['מִבְּאֵר', 'de Be’er…'], ['שֶׁבַע', '…Sheva'], ['נִצְּחָה', 'a gagné'], ['בְּתַחֲרוּת', 'dans un tournoi'], ['שַׁחְמָט', 'd’échecs']] },
    { he: 'הִיא שִׂחֲקָה נֶגֶד מְבֻגָּרִים.', fr: 'Elle a joué contre des adultes.', w: [['הִיא', 'elle'], ['שִׂחֲקָה', 'a joué'], ['נֶגֶד', 'contre'], ['מְבֻגָּרִים', 'des adultes']] },
    { he: 'אַבָּא שֶׁלָּהּ לִמֵּד אוֹתָהּ לְשַׂחֵק כְּשֶׁהָיְתָה בַּת חָמֵשׁ.', fr: 'Son père lui a appris à jouer quand elle avait cinq ans.', w: [['אַבָּא', 'papa'], ['שֶׁלָּהּ', 'à elle (son)'], ['לִמֵּד', 'a enseigné'], ['אוֹתָהּ', 'elle (la)'], ['לְשַׂחֵק', 'à jouer'], ['כְּשֶׁהָיְתָה', 'quand elle était'], ['בַּת', 'âgée de'], ['חָמֵשׁ', 'cinq (ans)']] },
    { he: 'עַכְשָׁיו הִיא מְלַמֶּדֶת אוֹתוֹ.', fr: 'Maintenant, c’est elle qui lui apprend.', w: [['עַכְשָׁיו', 'maintenant'], ['הִיא', 'elle'], ['מְלַמֶּדֶת', 'enseigne'], ['אוֹתוֹ', 'lui (le)']] },
  ], q: 'Qui lui a appris à jouer aux échecs ?', opts: ['Son père', 'Sa mère', 'Son professeur'], a: 0 },
  { id: 'hanouka', niveau: 3, title: 'חֲנֻכָּה בָּעִיר', fr: 'Hanoukka en ville', sentences: [
    { he: 'בַּחֲנֻכָּה מַדְלִיקִים נֵרוֹת שְׁמוֹנָה לֵילוֹת.', fr: 'À Hanoukka, on allume des bougies pendant huit nuits.', w: [['בַּחֲנֻכָּה', 'à Hanoukka'], ['מַדְלִיקִים', 'on allume'], ['נֵרוֹת', 'des bougies'], ['שְׁמוֹנָה', 'huit'], ['לֵילוֹת', 'nuits']] },
    { he: 'בַּחַלּוֹנוֹת רוֹאִים חֲנֻכִּיּוֹת.', fr: 'Aux fenêtres, on voit des chandeliers de Hanoukka.', w: [['בַּחַלּוֹנוֹת', 'aux fenêtres'], ['רוֹאִים', 'on voit'], ['חֲנֻכִּיּוֹת', 'des hanoukiot (chandeliers)']] },
    { he: 'כֻּלָּם אוֹכְלִים סֻפְגָּנִיּוֹת וּלְבִיבוֹת.', fr: 'Tout le monde mange des beignets et des galettes de pommes de terre.', w: [['כֻּלָּם', 'tout le monde'], ['אוֹכְלִים', 'mange'], ['סֻפְגָּנִיּוֹת', 'des beignets'], ['וּלְבִיבוֹת', 'et des galettes (latkes)']] },
    { he: 'הַיְּלָדִים מְשַׂחֲקִים בִּסְבִיבוֹן.', fr: 'Les enfants jouent à la toupie.', w: [['הַיְּלָדִים', 'les enfants'], ['מְשַׂחֲקִים', 'jouent'], ['בִּסְבִיבוֹן', 'à la toupie']] },
  ], q: 'Pendant combien de nuits allume-t-on les bougies ?', opts: ['Sept', 'Huit', 'Trois'], a: 1 },
  { id: 'teatron', niveau: 3, title: 'תֵּאַטְרוֹן בָּרְחוֹב', fr: 'Du théâtre dans la rue', sentences: [
    { he: 'קְבוּצַת שַׂחְקָנִים מַעֲלָה הַצָּגוֹת בָּרְחוֹב.', fr: 'Une troupe d’acteurs joue des pièces dans la rue.', w: [['קְבוּצַת', 'un groupe de'], ['שַׂחְקָנִים', 'acteurs'], ['מַעֲלָה', 'monte (joue)'], ['הַצָּגוֹת', 'des spectacles'], ['בָּרְחוֹב', 'dans la rue']] },
    { he: 'הֵם לֹא צְרִיכִים בָּמָה גְּדוֹלָה.', fr: 'Ils n’ont pas besoin d’une grande scène.', w: [['הֵם', 'ils'], ['לֹא', 'ne… pas'], ['צְרִיכִים', 'ont besoin de'], ['בָּמָה', 'une scène'], ['גְּדוֹלָה', 'grande']] },
    { he: 'הַקָּהָל עוֹמֵד מִסָּבִיב וְצוֹחֵק.', fr: 'Le public se tient autour et rit.', w: [['הַקָּהָל', 'le public'], ['עוֹמֵד', 'se tient debout'], ['מִסָּבִיב', 'autour'], ['וְצוֹחֵק', 'et rit']] },
    { he: 'בַּסּוֹף כֻּלָּם מוֹחֲאִים כַּפַּיִם.', fr: 'À la fin, tout le monde applaudit.', w: [['בַּסּוֹף', 'à la fin'], ['כֻּלָּם', 'tout le monde'], ['מוֹחֲאִים', 'frappent…'], ['כַּפַּיִם', '…des mains (applaudissent)']] },
  ], q: 'Où joue la troupe ?', opts: ['Dans un grand théâtre', 'À la télévision', 'Dans la rue'], a: 2 },
  { id: 'blimehoniyot', niveau: 4, title: 'עִיר בְּלִי מְכוֹנִיּוֹת', fr: 'Une ville sans voitures', sentences: [
    { he: 'בְּיוֹם שִׁשִּׁי הַבָּא, מֶרְכַּז הָעִיר יִהְיֶה סָגוּר לִמְכוֹנִיּוֹת.', fr: 'Vendredi prochain, le centre-ville sera fermé aux voitures.', w: [['בְּיוֹם', 'le jour'], ['שִׁשִּׁי', 'sixième (vendredi)'], ['הַבָּא', 'prochain'], ['מֶרְכַּז', 'le centre de'], ['הָעִיר', 'la ville'], ['יִהְיֶה', 'sera'], ['סָגוּר', 'fermé'], ['לִמְכוֹנִיּוֹת', 'aux voitures']] },
    { he: 'הָעִירִיָּה רוֹצָה שֶׁהַתּוֹשָׁבִים יֵלְכוּ בָּרֶגֶל אוֹ יִרְכְּבוּ עַל אוֹפַנַּיִם.', fr: 'La mairie veut que les habitants marchent ou fassent du vélo.', w: [['הָעִירִיָּה', 'la mairie'], ['רוֹצָה', 'veut'], ['שֶׁהַתּוֹשָׁבִים', 'que les habitants'], ['יֵלְכוּ', 'aillent'], ['בָּרֶגֶל', 'à pied'], ['אוֹ', 'ou'], ['יִרְכְּבוּ', 'montent'], ['עַל', 'sur'], ['אוֹפַנַּיִם', 'des vélos']] },
    { he: 'לְפִי רֹאשׁ הָעִיר, הָאֲוִיר יִהְיֶה נָקִי יוֹתֵר.', fr: 'Selon le maire, l’air sera plus propre.', w: [['לְפִי', 'selon'], ['רֹאשׁ', 'la tête de…'], ['הָעִיר', '…la ville (le maire)'], ['הָאֲוִיר', 'l’air'], ['יִהְיֶה', 'sera'], ['נָקִי', 'propre'], ['יוֹתֵר', 'plus']] },
    { he: 'אֲבָל חֵלֶק מֵהַסּוֹחֲרִים מוּדְאָגִים, כִּי הֵם מְפַחֲדִים לְהַפְסִיד לָקוֹחוֹת.', fr: 'Mais une partie des commerçants sont inquiets, car ils ont peur de perdre des clients.', w: [['אֲבָל', 'mais'], ['חֵלֶק', 'une partie'], ['מֵהַסּוֹחֲרִים', 'des commerçants'], ['מוּדְאָגִים', 'inquiets'], ['כִּי', 'car'], ['הֵם', 'ils'], ['מְפַחֲדִים', 'ont peur'], ['לְהַפְסִיד', 'de perdre'], ['לָקוֹחוֹת', 'des clients']] },
    { he: 'אִם הַנִּסָּיוֹן יַצְלִיחַ, הוּא יַחֲזֹר כָּל חֹדֶשׁ.', fr: 'Si l’essai réussit, il reviendra chaque mois.', w: [['אִם', 'si'], ['הַנִּסָּיוֹן', 'l’essai'], ['יַצְלִיחַ', 'réussit (réussira)'], ['הוּא', 'il'], ['יַחֲזֹר', 'reviendra'], ['כָּל', 'chaque'], ['חֹדֶשׁ', 'mois']] },
  ], q: 'Pourquoi certains commerçants sont-ils inquiets ?', opts: ['Ils ont peur de perdre des clients', 'Ils n’aiment pas les vélos', 'Il y aura trop de bruit'], a: 0 },
  { id: 'halomot', niveau: 4, title: 'לָמָּה אֲנַחְנוּ חוֹלְמִים?', fr: 'Pourquoi rêvons-nous ?', sentences: [
    { he: 'כָּל לַיְלָה אֲנַחְנוּ חוֹלְמִים, גַּם אִם אֲנַחְנוּ לֹא זוֹכְרִים.', fr: 'Chaque nuit, nous rêvons, même si nous ne nous en souvenons pas.', w: [['כָּל', 'chaque'], ['לַיְלָה', 'nuit'], ['אֲנַחְנוּ', 'nous'], ['חוֹלְמִים', 'rêvons'], ['גַּם', 'même'], ['אִם', 'si'], ['אֲנַחְנוּ', 'nous'], ['לֹא', 'ne… pas'], ['זוֹכְרִים', 'nous souvenons']] },
    { he: 'חוֹקְרִים בָּאוּנִיבֶרְסִיטָה עוֹקְבִים אַחֲרֵי אֲנָשִׁים שֶׁיְּשֵׁנִים בַּמַּעְבָּדָה.', fr: 'Des chercheurs de l’université suivent des personnes qui dorment au laboratoire.', w: [['חוֹקְרִים', 'des chercheurs'], ['בָּאוּנִיבֶרְסִיטָה', 'à l’université'], ['עוֹקְבִים', 'suivent'], ['אַחֲרֵי', '(derrière)'], ['אֲנָשִׁים', 'des gens'], ['שֶׁיְּשֵׁנִים', 'qui dorment'], ['בַּמַּעְבָּדָה', 'au laboratoire']] },
    { he: 'לְדִבְרֵיהֶם, הַחֲלוֹמוֹת עוֹזְרִים לַמֹּחַ לְסַדֵּר אֶת מַה שֶּׁקָּרָה בַּיּוֹם.', fr: 'D’après eux, les rêves aident le cerveau à ranger ce qui s’est passé dans la journée.', w: [['לְדִבְרֵיהֶם', 'd’après eux (selon leurs paroles)'], ['הַחֲלוֹמוֹת', 'les rêves'], ['עוֹזְרִים', 'aident'], ['לַמֹּחַ', 'au cerveau'], ['לְסַדֵּר', 'à ranger'], ['אֶת', '(devant le complément)'], ['מַה', 'ce'], ['שֶּׁקָּרָה', 'qui s’est passé'], ['בַּיּוֹם', 'dans la journée']] },
    { he: 'לָכֵן, לְדַעְתָּם, שֵׁנָה טוֹבָה חֲשׁוּבָה גַּם לַזִּכָּרוֹן.', fr: 'Donc, à leur avis, un bon sommeil est aussi important pour la mémoire.', w: [['לָכֵן', 'donc'], ['לְדַעְתָּם', 'à leur avis'], ['שֵׁנָה', 'un sommeil'], ['טוֹבָה', 'bon'], ['חֲשׁוּבָה', 'important'], ['גַּם', 'aussi'], ['לַזִּכָּרוֹן', 'pour la mémoire']] },
    { he: 'הַמֶּחְקָר יִמָּשֵׁךְ עוֹד שְׁנָתַיִם.', fr: 'L’étude durera encore deux ans.', w: [['הַמֶּחְקָר', 'l’étude'], ['יִמָּשֵׁךְ', 'durera'], ['עוֹד', 'encore'], ['שְׁנָתַיִם', 'deux ans']] },
  ], q: 'Selon les chercheurs, à quoi servent les rêves ?', opts: ['À prédire l’avenir', 'À ranger ce qui s’est passé dans la journée', 'À rien du tout'], a: 1 },
  { id: 'pishpeshim', niveau: 4, title: 'שׁוּק הַפִּשְׁפְּשִׁים מִתְחַדֵּשׁ', fr: 'Le marché aux puces fait peau neuve', sentences: [
    { he: 'שׁוּק הַפִּשְׁפְּשִׁים בְּיָפוֹ הוּא אֶחָד הַמְּקוֹמוֹת הַוְּתִיקִים בָּעִיר.', fr: 'Le marché aux puces de Jaffa est l’un des plus anciens lieux de la ville.', w: [['שׁוּק', 'le marché'], ['הַפִּשְׁפְּשִׁים', 'aux puces'], ['בְּיָפוֹ', 'à Jaffa'], ['הוּא', 'est'], ['אֶחָד', 'un de'], ['הַמְּקוֹמוֹת', 'les lieux'], ['הַוְּתִיקִים', 'anciens'], ['בָּעִיר', 'de la ville']] },
    { he: 'בַּשָּׁנִים הָאַחֲרוֹנוֹת נִפְתְּחוּ בּוֹ בָּתֵּי קָפֶה וּמִסְעָדוֹת.', fr: 'Ces dernières années, des cafés et des restaurants y ont ouvert.', w: [['בַּשָּׁנִים', 'dans les années'], ['הָאַחֲרוֹנוֹת', 'dernières'], ['נִפְתְּחוּ', 'ont ouvert'], ['בּוֹ', 'en lui (y)'], ['בָּתֵּי', 'maisons de…'], ['קָפֶה', '…café (des cafés)'], ['וּמִסְעָדוֹת', 'et des restaurants']] },
    { he: 'הַמּוֹכְרִים הַוְּתִיקִים שְׂמֵחִים עַל הַקָּהָל הֶחָדָשׁ.', fr: 'Les vendeurs de longue date sont contents du nouveau public.', w: [['הַמּוֹכְרִים', 'les vendeurs'], ['הַוְּתִיקִים', 'anciens'], ['שְׂמֵחִים', 'contents'], ['עַל', 'de'], ['הַקָּהָל', 'le public'], ['הֶחָדָשׁ', 'nouveau']] },
    { he: 'עִם זֹאת, הֵם מְבַקְּשִׁים לִשְׁמֹר עַל הָאֹפִי הַמְּיֻחָד שֶׁל הַשּׁוּק.', fr: 'Toutefois, ils demandent qu’on préserve le caractère particulier du marché.', w: [['עִם', 'avec…'], ['זֹאת', '…cela (toutefois)'], ['הֵם', 'ils'], ['מְבַקְּשִׁים', 'demandent'], ['לִשְׁמֹר', 'de préserver'], ['עַל', '(sur)'], ['הָאֹפִי', 'le caractère'], ['הַמְּיֻחָד', 'particulier'], ['שֶׁל', 'de'], ['הַשּׁוּק', 'le marché']] },
    { he: '״פֹּה כָּל חֵפֶץ מְסַפֵּר סִפּוּר״, אוֹמֵר אֶחָד מֵהֶם.', fr: '« Ici, chaque objet raconte une histoire », dit l’un d’eux.', w: [['״פֹּה', '« ici'], ['כָּל', 'chaque'], ['חֵפֶץ', 'objet'], ['מְסַפֵּר', 'raconte'], ['סִפּוּר״', 'une histoire »'], ['אוֹמֵר', 'dit'], ['אֶחָד', 'un'], ['מֵהֶם', 'd’eux']] },
  ], q: 'Que demandent les vendeurs de longue date ?', opts: ['De fermer les cafés', 'De baisser les prix', 'De préserver le caractère du marché'], a: 2 },
  { id: 'hatsalatohel', niveau: 4, title: 'מַצִּילִים אֹכֶל', fr: 'Ils sauvent de la nourriture', sentences: [
    { he: 'בְּכָל עֶרֶב, מִתְנַדְּבִים אוֹסְפִים אֹכֶל שֶׁנִּשְׁאַר בַּמִּסְעָדוֹת.', fr: 'Chaque soir, des bénévoles ramassent la nourriture qui reste dans les restaurants.', w: [['בְּכָל', 'chaque'], ['עֶרֶב', 'soir'], ['מִתְנַדְּבִים', 'des bénévoles'], ['אוֹסְפִים', 'ramassent'], ['אֹכֶל', 'de la nourriture'], ['שֶׁנִּשְׁאַר', 'qui est restée'], ['בַּמִּסְעָדוֹת', 'dans les restaurants']] },
    { he: 'בִּמְקוֹם לִזְרֹק אוֹתוֹ, הֵם מְבִיאִים אוֹתוֹ לְמִשְׁפָּחוֹת שֶׁצְּרִיכוֹת עֶזְרָה.', fr: 'Au lieu de la jeter, ils l’apportent à des familles qui ont besoin d’aide.', w: [['בִּמְקוֹם', 'au lieu de'], ['לִזְרֹק', 'jeter'], ['אוֹתוֹ', 'la (le)'], ['הֵם', 'ils'], ['מְבִיאִים', 'apportent'], ['אוֹתוֹ', 'la (le)'], ['לְמִשְׁפָּחוֹת', 'à des familles'], ['שֶׁצְּרִיכוֹת', 'qui ont besoin de'], ['עֶזְרָה', 'aide']] },
    { he: 'הָעֲמוּתָּה הִתְחִילָה לִפְנֵי שָׁלוֹשׁ שָׁנִים עִם חֲמִשָּׁה אֲנָשִׁים בִּלְבַד.', fr: 'L’association a commencé il y a trois ans avec seulement cinq personnes.', w: [['הָעֲמוּתָּה', 'l’association'], ['הִתְחִילָה', 'a commencé'], ['לִפְנֵי', 'il y a (avant)'], ['שָׁלוֹשׁ', 'trois'], ['שָׁנִים', 'ans'], ['עִם', 'avec'], ['חֲמִשָּׁה', 'cinq'], ['אֲנָשִׁים', 'personnes'], ['בִּלְבַד', 'seulement']] },
    { he: 'הַיּוֹם יֵשׁ בָּהּ יוֹתֵר מֵאֶלֶף מִתְנַדְּבִים.', fr: 'Aujourd’hui, elle compte plus de mille bénévoles.', w: [['הַיּוֹם', 'aujourd’hui'], ['יֵשׁ', 'il y a'], ['בָּהּ', 'en elle'], ['יוֹתֵר', 'plus'], ['מֵאֶלֶף', 'que mille'], ['מִתְנַדְּבִים', 'bénévoles']] },
    { he: '״אֹכֶל טוֹב לֹא צָרִיךְ לְהַגִּיעַ לַפַּח״, הֵם אוֹמְרִים.', fr: '« Une bonne nourriture ne doit pas finir à la poubelle », disent-ils.', w: [['״אֹכֶל', '« nourriture'], ['טוֹב', 'bonne'], ['לֹא', 'ne… pas'], ['צָרִיךְ', 'doit'], ['לְהַגִּיעַ', 'arriver'], ['לַפַּח״', 'à la poubelle »'], ['הֵם', 'ils'], ['אוֹמְרִים', 'disent']] },
  ], q: 'Combien de bénévoles l’association compte-t-elle aujourd’hui ?', opts: ['Plus de mille', 'Cinq', 'Cent'], a: 0 },
  { id: 'gesher', niveau: 4, title: 'הַגֶּשֶׁר שֶׁחִכּוּ לוֹ עֶשֶׂר שָׁנִים', fr: 'Le pont attendu depuis dix ans', sentences: [
    { he: 'אַחֲרֵי עֶשֶׂר שָׁנִים שֶׁל תִּכְנוּן, נִפְתַּח הַשָּׁבוּעַ גֶּשֶׁר חָדָשׁ מֵעַל הַנַּחַל.', fr: 'Après dix ans de préparation, un nouveau pont a ouvert cette semaine au-dessus de la rivière.', w: [['אַחֲרֵי', 'après'], ['עֶשֶׂר', 'dix'], ['שָׁנִים', 'ans'], ['שֶׁל', 'de'], ['תִּכְנוּן', 'planification'], ['נִפְתַּח', 'a ouvert'], ['הַשָּׁבוּעַ', 'cette semaine'], ['גֶּשֶׁר', 'un pont'], ['חָדָשׁ', 'nouveau'], ['מֵעַל', 'au-dessus de'], ['הַנַּחַל', 'la rivière']] },
    { he: 'עַד עַכְשָׁיו, הַתּוֹשָׁבִים הָיוּ צְרִיכִים לִנְסֹעַ עֶשְׂרִים דַּקּוֹת כְּדֵי לַעֲבֹר לַצַּד הַשֵּׁנִי.', fr: 'Jusqu’à maintenant, les habitants devaient rouler vingt minutes pour passer de l’autre côté.', w: [['עַד', 'jusqu’à'], ['עַכְשָׁיו', 'maintenant'], ['הַתּוֹשָׁבִים', 'les habitants'], ['הָיוּ', 'étaient'], ['צְרִיכִים', 'obligés'], ['לִנְסֹעַ', 'de rouler'], ['עֶשְׂרִים', 'vingt'], ['דַּקּוֹת', 'minutes'], ['כְּדֵי', 'pour'], ['לַעֲבֹר', 'passer'], ['לַצַּד', 'au côté'], ['הַשֵּׁנִי', 'second (autre)']] },
    { he: 'עַכְשָׁיו אֶפְשָׁר לַעֲבֹר בָּרֶגֶל בְּחָמֵשׁ דַּקּוֹת.', fr: 'Maintenant, on peut traverser à pied en cinq minutes.', w: [['עַכְשָׁיו', 'maintenant'], ['אֶפְשָׁר', 'on peut'], ['לַעֲבֹר', 'passer'], ['בָּרֶגֶל', 'à pied'], ['בְּחָמֵשׁ', 'en cinq'], ['דַּקּוֹת', 'minutes']] },
    { he: 'בְּטֶקֶס הַפְּתִיחָה רָקְדוּ וְשָׁרוּ יַלְדֵי בֵּית הַסֵּפֶר.', fr: 'À la cérémonie d’ouverture, les enfants de l’école ont dansé et chanté.', w: [['בְּטֶקֶס', 'à la cérémonie de'], ['הַפְּתִיחָה', 'l’ouverture'], ['רָקְדוּ', 'ont dansé'], ['וְשָׁרוּ', 'et ont chanté'], ['יַלְדֵי', 'les enfants de'], ['בֵּית', 'maison de…'], ['הַסֵּפֶר', '…du livre (l’école)']] },
    { he: 'הַגֶּשֶׁר נִקְרָא עַל שֵׁם מוֹרָה אֲהוּבָה מֵהַיִּשּׁוּב.', fr: 'Le pont porte le nom d’une professeure très aimée du village.', w: [['הַגֶּשֶׁר', 'le pont'], ['נִקְרָא', 'est appelé'], ['עַל', 'sur'], ['שֵׁם', 'le nom de'], ['מוֹרָה', 'une professeure'], ['אֲהוּבָה', 'aimée'], ['מֵהַיִּשּׁוּב', 'du village']] },
  ], q: 'Combien de temps faut-il maintenant à pied ?', opts: ['Vingt minutes', 'Cinq minutes', 'Une heure'], a: 1 },
  { id: 'claire', niveau: 4, title: 'מִפָּרִיז לְחֵיפָה', fr: 'De Paris à Haïfa', sentences: [
    { he: 'לִפְנֵי שָׁנָה עָלְתָה קְלֵר מִפָּרִיז לְחֵיפָה.', fr: 'Il y a un an, Claire a quitté Paris pour s’installer à Haïfa.', w: [['לִפְנֵי', 'il y a (avant)'], ['שָׁנָה', 'un an'], ['עָלְתָה', 'a fait son aliya (est montée)'], ['קְלֵר', 'Claire'], ['מִפָּרִיז', 'de Paris'], ['לְחֵיפָה', 'à Haïfa']] },
    { he: 'בְּהַתְחָלָה הָיָה לָהּ קָשֶׁה, כִּי הִיא לֹא דִּבְּרָה עִבְרִית.', fr: 'Au début, c’était difficile pour elle, car elle ne parlait pas hébreu.', w: [['בְּהַתְחָלָה', 'au début'], ['הָיָה', 'c’était'], ['לָהּ', 'pour elle'], ['קָשֶׁה', 'difficile'], ['כִּי', 'car'], ['הִיא', 'elle'], ['לֹא', 'ne… pas'], ['דִּבְּרָה', 'parlait'], ['עִבְרִית', 'hébreu']] },
    { he: 'הִיא לָמְדָה בָּאוּלְפָּן חֲמִשָּׁה חֳדָשִׁים.', fr: 'Elle a étudié à l’oulpan pendant cinq mois.', w: [['הִיא', 'elle'], ['לָמְדָה', 'a étudié'], ['בָּאוּלְפָּן', 'à l’oulpan'], ['חֲמִשָּׁה', 'cinq'], ['חֳדָשִׁים', 'mois']] },
    { he: 'הַיּוֹם הִיא עוֹבֶדֶת כְּאָחוֹת וּמְדַבֶּרֶת עִם הַחוֹלִים בְּעִבְרִית.', fr: 'Aujourd’hui, elle travaille comme infirmière et parle avec les malades en hébreu.', w: [['הַיּוֹם', 'aujourd’hui'], ['הִיא', 'elle'], ['עוֹבֶדֶת', 'travaille'], ['כְּאָחוֹת', 'comme infirmière'], ['וּמְדַבֶּרֶת', 'et parle'], ['עִם', 'avec'], ['הַחוֹלִים', 'les malades'], ['בְּעִבְרִית', 'en hébreu']] },
    { he: '״הַשָּׂפָה פָּתְחָה לִי אֶת הַדֶּלֶת״, הִיא אוֹמֶרֶת.', fr: '« La langue m’a ouvert la porte », dit-elle.', w: [['״הַשָּׂפָה', '« la langue'], ['פָּתְחָה', 'a ouvert'], ['לִי', 'pour moi'], ['אֶת', '(devant le complément)'], ['הַדֶּלֶת״', 'la porte »'], ['הִיא', 'elle'], ['אוֹמֶרֶת', 'dit']] },
  ], q: 'Combien de temps Claire a-t-elle étudié à l’oulpan ?', opts: ['Un an', 'Deux semaines', 'Cinq mois'], a: 2 },
  { id: 'kineret', niveau: 4, title: 'הַכִּנֶּרֶת עָלְתָה', fr: 'Le lac de Tibériade est monté', sentences: [
    { he: 'אַחֲרֵי חֹרֶף גָּשׁוּם, מִפְלַס הַכִּנֶּרֶת עָלָה בְּמֶטֶר שָׁלֵם.', fr: 'Après un hiver pluvieux, le niveau du lac de Tibériade est monté d’un mètre entier.', w: [['אַחֲרֵי', 'après'], ['חֹרֶף', 'un hiver'], ['גָּשׁוּם', 'pluvieux'], ['מִפְלַס', 'le niveau de'], ['הַכִּנֶּרֶת', 'le lac de Tibériade'], ['עָלָה', 'est monté'], ['בְּמֶטֶר', 'd’un mètre'], ['שָׁלֵם', 'entier']] },
    { he: 'זוֹ בְּשׂוֹרָה טוֹבָה לַחַקְלָאִים וְלַדָּגִים.', fr: 'C’est une bonne nouvelle pour les agriculteurs et pour les poissons.', w: [['זוֹ', 'c’est'], ['בְּשׂוֹרָה', 'une nouvelle'], ['טוֹבָה', 'bonne'], ['לַחַקְלָאִים', 'pour les agriculteurs'], ['וְלַדָּגִים', 'et pour les poissons']] },
    { he: 'בַּשָּׁנִים הַקּוֹדְמוֹת הַמַּיִם יָרְדוּ, וְהַחוֹף הִתְרַחֵק.', fr: 'Les années précédentes, l’eau avait baissé et la rive s’était éloignée.', w: [['בַּשָּׁנִים', 'dans les années'], ['הַקּוֹדְמוֹת', 'précédentes'], ['הַמַּיִם', 'l’eau'], ['יָרְדוּ', 'est descendue'], ['וְהַחוֹף', 'et la rive'], ['הִתְרַחֵק', 's’est éloignée']] },
    { he: 'עַכְשָׁיו הַמַּיִם חוֹזְרִים לִמְקוֹמָם.', fr: 'Maintenant, l’eau revient à sa place.', w: [['עַכְשָׁיו', 'maintenant'], ['הַמַּיִם', 'l’eau'], ['חוֹזְרִים', 'revient'], ['לִמְקוֹמָם', 'à sa place']] },
    { he: 'עִם זֹאת, הַמֻּמְחִים מְבַקְּשִׁים לְהַמְשִׁיךְ לַחֲסֹךְ בְּמַיִם.', fr: 'Toutefois, les experts demandent de continuer à économiser l’eau.', w: [['עִם', 'avec…'], ['זֹאת', '…cela (toutefois)'], ['הַמֻּמְחִים', 'les experts'], ['מְבַקְּשִׁים', 'demandent'], ['לְהַמְשִׁיךְ', 'de continuer'], ['לַחֲסֹךְ', 'à économiser'], ['בְּמַיִם', 'de l’eau']] },
  ], q: 'De combien le niveau du lac est-il monté ?', opts: ['D’un mètre', 'De dix mètres', 'D’un centimètre'], a: 0 },
  { id: 'soferet', niveau: 4, title: 'סוֹפֶרֶת שֶׁכּוֹתֶבֶת בָּאוֹטוֹבּוּס', fr: 'Une écrivaine qui écrit dans le bus', sentences: [
    { he: 'סוֹפֶרֶת צְעִירָה מִירוּשָׁלַיִם כָּתְבָה אֶת כָּל הַסֵּפֶר שֶׁלָּהּ בָּאוֹטוֹבּוּס.', fr: 'Une jeune écrivaine de Jérusalem a écrit tout son livre dans le bus.', w: [['סוֹפֶרֶת', 'une écrivaine'], ['צְעִירָה', 'jeune'], ['מִירוּשָׁלַיִם', 'de Jérusalem'], ['כָּתְבָה', 'a écrit'], ['אֶת', '(devant le complément)'], ['כָּל', 'tout'], ['הַסֵּפֶר', 'le livre'], ['שֶׁלָּהּ', 'à elle (son)'], ['בָּאוֹטוֹבּוּס', 'dans le bus']] },
    { he: 'בְּכָל יוֹם הִיא נָסְעָה שָׁעָה לָעֲבוֹדָה וְשָׁעָה בַּחֲזָרָה.', fr: 'Chaque jour, elle faisait une heure de trajet pour aller au travail et une heure pour revenir.', w: [['בְּכָל', 'chaque'], ['יוֹם', 'jour'], ['הִיא', 'elle'], ['נָסְעָה', 'roulait'], ['שָׁעָה', 'une heure'], ['לָעֲבוֹדָה', 'au travail'], ['וְשָׁעָה', 'et une heure'], ['בַּחֲזָרָה', 'au retour']] },
    { he: 'בִּמְקוֹם לְהִסְתַּכֵּל בַּטֶּלֶפוֹן, הִיא כָּתְבָה בְּמַחְבֶּרֶת.', fr: 'Au lieu de regarder son téléphone, elle écrivait dans un cahier.', w: [['בִּמְקוֹם', 'au lieu de'], ['לְהִסְתַּכֵּל', 'regarder'], ['בַּטֶּלֶפוֹן', 'le téléphone'], ['הִיא', 'elle'], ['כָּתְבָה', 'a écrit'], ['בְּמַחְבֶּרֶת', 'dans un cahier']] },
    { he: 'הַסֵּפֶר מְסַפֵּר עַל הַנּוֹסְעִים שֶׁהִיא פָּגְשָׁה בַּדֶּרֶךְ.', fr: 'Le livre parle des passagers qu’elle a rencontrés en chemin.', w: [['הַסֵּפֶר', 'le livre'], ['מְסַפֵּר', 'raconte'], ['עַל', 'sur'], ['הַנּוֹסְעִים', 'les passagers'], ['שֶׁהִיא', 'qu’elle'], ['פָּגְשָׁה', 'a rencontrés'], ['בַּדֶּרֶךְ', 'en chemin']] },
    { he: 'עַכְשָׁיו הוּא אֶחָד הַסְּפָרִים הַנִּמְכָּרִים בְּיוֹתֵר.', fr: 'C’est maintenant l’un des livres les plus vendus.', w: [['עַכְשָׁיו', 'maintenant'], ['הוּא', 'il'], ['אֶחָד', 'un de'], ['הַסְּפָרִים', 'les livres'], ['הַנִּמְכָּרִים', 'vendus'], ['בְּיוֹתֵר', 'le plus']] },
  ], q: 'Où l’écrivaine a-t-elle écrit son livre ?', opts: ['Dans un café', 'Dans le bus', 'À la bibliothèque'], a: 1 },
  { id: 'tsaveyam', niveau: 4, title: 'צַבֵּי יָם חוֹזְרִים לַחוֹף', fr: 'Les tortues de mer reviennent sur la plage', sentences: [
    { he: 'בַּקַּיִץ, צַבֵּי יָם מַטִּילִים בֵּיצִים בַּחוֹל שֶׁל חוֹפֵי יִשְׂרָאֵל.', fr: 'En été, des tortues de mer pondent des œufs dans le sable des plages d’Israël.', w: [['בַּקַּיִץ', 'en été'], ['צַבֵּי', 'tortues de…'], ['יָם', '…mer'], ['מַטִּילִים', 'pondent'], ['בֵּיצִים', 'des œufs'], ['בַּחוֹל', 'dans le sable'], ['שֶׁל', 'de'], ['חוֹפֵי', 'plages de'], ['יִשְׂרָאֵל', 'Israël']] },
    { he: 'מִתְנַדְּבִים שׁוֹמְרִים עַל הַקִּנִּים כְּדֵי שֶׁאַף אֶחָד לֹא יִדְרֹךְ עֲלֵיהֶם.', fr: 'Des bénévoles surveillent les nids pour que personne ne marche dessus.', w: [['מִתְנַדְּבִים', 'des bénévoles'], ['שׁוֹמְרִים', 'gardent'], ['עַל', '(sur)'], ['הַקִּנִּים', 'les nids'], ['כְּדֵי', 'pour'], ['שֶׁאַף', 'que aucun…'], ['אֶחָד', '…un (personne)'], ['לֹא', 'ne… pas'], ['יִדְרֹךְ', 'marche'], ['עֲלֵיהֶם', 'sur eux']] },
    { he: 'אַחֲרֵי חָדְשַׁיִם, הַצַּבִּים הַקְּטַנִּים יוֹצְאִים מֵהַבֵּיצִים.', fr: 'Après deux mois, les petites tortues sortent des œufs.', w: [['אַחֲרֵי', 'après'], ['חָדְשַׁיִם', 'deux mois'], ['הַצַּבִּים', 'les tortues'], ['הַקְּטַנִּים', 'petites'], ['יוֹצְאִים', 'sortent'], ['מֵהַבֵּיצִים', 'des œufs']] },
    { he: 'הֵם הוֹלְכִים לְבַד אֶל הַיָּם, בְּדֶרֶךְ כְּלָל בַּלַּיְלָה.', fr: 'Elles vont seules vers la mer, généralement la nuit.', w: [['הֵם', 'ils (elles)'], ['הוֹלְכִים', 'vont'], ['לְבַד', 'seuls'], ['אֶל', 'vers'], ['הַיָּם', 'la mer'], ['בְּדֶרֶךְ', 'en général…'], ['כְּלָל', '…(généralement)'], ['בַּלַּיְלָה', 'la nuit']] },
    { he: 'הַשָּׁנָה סָפְרוּ יוֹתֵר קִנִּים מִבְּכָל שָׁנָה אַחֶרֶת.', fr: 'Cette année, on a compté plus de nids que n’importe quelle autre année.', w: [['הַשָּׁנָה', 'cette année'], ['סָפְרוּ', 'on a compté'], ['יוֹתֵר', 'plus de'], ['קִנִּים', 'nids'], ['מִבְּכָל', 'que dans toute'], ['שָׁנָה', 'année'], ['אַחֶרֶת', 'autre']] },
  ], q: 'Quand les petites tortues vont-elles vers la mer ?', opts: ['À midi', 'Avec les bénévoles, en bateau', 'Généralement la nuit'], a: 2 },
  { id: 'mekarer', niveau: 4, title: 'מְקָרֵר שֶׁל סְפָרִים', fr: 'Un frigo à livres', sentences: [
    { he: 'בְּפִנַּת רְחוֹב בִּרְחוֹבוֹת עוֹמֵד מְקָרֵר יָשָׁן, אֲבָל אֵין בּוֹ אֹכֶל.', fr: 'Au coin d’une rue de Rehovot se trouve un vieux frigo, mais il n’y a pas de nourriture dedans.', w: [['בְּפִנַּת', 'au coin de'], ['רְחוֹב', 'rue'], ['בִּרְחוֹבוֹת', 'à Rehovot'], ['עוֹמֵד', 'se tient'], ['מְקָרֵר', 'un frigo'], ['יָשָׁן', 'vieux'], ['אֲבָל', 'mais'], ['אֵין', 'il n’y a pas'], ['בּוֹ', 'en lui'], ['אֹכֶל', 'nourriture']] },
    { he: 'הוּא מָלֵא סְפָרִים שֶׁהַשְּׁכֵנִים מְבִיאִים.', fr: 'Il est plein de livres que les voisins apportent.', w: [['הוּא', 'il'], ['מָלֵא', 'plein'], ['סְפָרִים', 'de livres'], ['שֶׁהַשְּׁכֵנִים', 'que les voisins'], ['מְבִיאִים', 'apportent']] },
    { he: 'כָּל אֶחָד יָכוֹל לָקַחַת סֵפֶר, לִקְרֹא אוֹתוֹ וּלְהַחֲזִיר.', fr: 'Chacun peut prendre un livre, le lire et le rapporter.', w: [['כָּל', 'chaque'], ['אֶחָד', 'un (chacun)'], ['יָכוֹל', 'peut'], ['לָקַחַת', 'prendre'], ['סֵפֶר', 'un livre'], ['לִקְרֹא', 'lire'], ['אוֹתוֹ', 'le'], ['וּלְהַחֲזִיר', 'et rapporter']] },
    { he: 'הָרַעְיוֹן הִתְחִיל בְּאֵירוֹפָּה וְהִגִּיעַ גַּם לְיִשְׂרָאֵל.', fr: 'L’idée est née en Europe et est arrivée aussi en Israël.', w: [['הָרַעְיוֹן', 'l’idée'], ['הִתְחִיל', 'a commencé'], ['בְּאֵירוֹפָּה', 'en Europe'], ['וְהִגִּיעַ', 'et est arrivée'], ['גַּם', 'aussi'], ['לְיִשְׂרָאֵל', 'en Israël']] },
    { he: '״זֶה הַמְּקָרֵר הֲכִי מְעַנְיֵן בָּעִיר״, צוֹחֶקֶת שְׁכֵנָה.', fr: '« C’est le frigo le plus intéressant de la ville », rit une voisine.', w: [['״זֶה', '« c’est'], ['הַמְּקָרֵר', 'le frigo'], ['הֲכִי', 'le plus'], ['מְעַנְיֵן', 'intéressant'], ['בָּעִיר״', 'de la ville »'], ['צוֹחֶקֶת', 'rit'], ['שְׁכֵנָה', 'une voisine']] },
  ], q: 'Que contient le frigo ?', opts: ['Des livres', 'De la nourriture', 'Des jouets'], a: 0 },
];

/* ---------- Boutique ---------- */
const SHOP = [
  { id: 'gel', kind: 'objet', em: '🧊', name: 'Gel de série', desc: 'Protège ta série si tu rates un jour (3 max).', price: 60 },
  { id: 'joker', kind: 'objet', em: '🎯', name: 'Joker 50/50', desc: 'Retire deux mauvaises réponses dans un quiz.', price: 25 },
  { id: 'boost', kind: 'objet', em: '⚡', name: 'XP doublés', desc: 'Tous tes XP comptent double pendant 30 minutes.', price: 50 },
  { id: 'plante', kind: 'deco', em: '🪴', name: 'Petite plante', price: 30 },
  { id: 'bougie', kind: 'deco', em: '🕯️', name: 'Bougie', price: 40 },
  { id: 'livres', kind: 'deco', em: '📚', name: 'Pile de livres', price: 50 },
  { id: 'ours', kind: 'deco', em: '🧸', name: 'Ours en peluche', price: 60 },
  { id: 'cadre', kind: 'deco', em: '🖼️', name: 'Cadre', price: 80 },
  { id: 'lune', kind: 'deco', em: '🌙', name: 'Veilleuse lune', price: 90 },
  { id: 'fauteuil', kind: 'deco', em: '🛋️', name: 'Fauteuil', price: 120 },
  { id: 'hanoukia', kind: 'deco', em: '🕎', name: 'Hanoukia', price: 150 },
  { id: 'hatoul', kind: 'deco', em: '🐈', name: 'Hatoul le chat', price: 150 },
  { id: 'affiche', kind: 'deco', em: '🔤', name: 'Affiche Alef', price: 60 },
  { id: 'tapis', kind: 'deco', em: '🧶', name: 'Tapis rond', price: 70 },
  { id: 'guirlande', kind: 'deco', em: '✨', name: 'Guirlande lumineuse', price: 80 },
  { id: 'mur-ciel', kind: 'decor', em: '🩵', name: 'Mur bleu ciel', price: 40 },
  { id: 'mur-peche', kind: 'decor', em: '🍑', name: 'Mur pêche', price: 40 },
  { id: 'mur-rayures', kind: 'decor', em: '🎀', name: 'Mur à rayures', price: 60 },
  { id: 'mur-etoiles', kind: 'decor', em: '⭐', name: 'Mur étoilé', price: 80 },
  { id: 'sol-clair', kind: 'decor', em: '🪵', name: 'Parquet clair', price: 50 },
  { id: 'sol-carrelage', kind: 'decor', em: '🔲', name: 'Carrelage', price: 60 },
  { id: 'mur-menthe', kind: 'decor', em: '🌿', name: 'Mur menthe', price: 40 },
  { id: 'mur-soleil', kind: 'decor', em: '🌻', name: 'Mur jaune soleil', price: 40 },
  { id: 'mur-pois', kind: 'decor', em: '🩷', name: 'Mur à pois', price: 50 },
  { id: 'mur-vichy', kind: 'decor', em: '🧺', name: 'Mur vichy bleu', price: 60 },
  { id: 'mur-briques', kind: 'decor', em: '🧱', name: 'Mur de briques', price: 70 },
  { id: 'mur-fleurs', kind: 'decor', em: '🌸', name: 'Mur fleuri', price: 70 },
  { id: 'mur-coeurs', kind: 'decor', em: '💗', name: 'Mur à cœurs', price: 70 },
  { id: 'mur-lambris', kind: 'decor', em: '🪵', name: 'Mur en lambris', price: 80 },
  { id: 'mur-aurore', kind: 'decor', em: '🌅', name: 'Mur coucher de soleil', price: 80 },
  { id: 'mur-alefbet', kind: 'decor', em: 'א', name: 'Mur aux lettres hébraïques', price: 90 },
  { id: 'sol-chene', kind: 'decor', em: '🟧', name: 'Parquet chêne doré', price: 50 },
  { id: 'sol-noyer', kind: 'decor', em: '🟫', name: 'Parquet noyer foncé', price: 60 },
  { id: 'sol-blanchi', kind: 'decor', em: '🤍', name: 'Bois blanchi', price: 60 },
  { id: 'sol-rose', kind: 'decor', em: '🌷', name: 'Parquet rose', price: 70 },
  { id: 'sol-tomettes', kind: 'decor', em: '🧡', name: 'Tomettes', price: 60 },
  { id: 'sol-menthe', kind: 'decor', em: '💚', name: 'Carreaux menthe', price: 60 },
  { id: 'sol-damier', kind: 'decor', em: '🏁', name: 'Damier noir et blanc', price: 80 },
  { id: 'sol-damier-rose', kind: 'decor', em: '🎀', name: 'Damier rose', price: 80 },
  { id: 'sol-moquette', kind: 'decor', em: '💜', name: 'Moquette lilas', price: 70 },
  { id: 'sol-marbre', kind: 'decor', em: '🏛️', name: 'Marbre', price: 90 },
  { id: 'p-robe', kind: 'perso', place: 'tenue', em: '👗', name: 'Robe fleurie', price: 90 },
  { id: 'p-pull', kind: 'perso', place: 'tenue', em: '🧥', name: 'Pull rayé', price: 70 },
  { id: 'p-salopette', kind: 'perso', place: 'tenue', em: '👖', name: 'Salopette', price: 80 },
  { id: 'p-sport', kind: 'perso', place: 'tenue', em: '🎽', name: 'Survêtement', price: 70 },
  { id: 'p-chapeau', kind: 'perso', place: 'tete', em: '👒', name: 'Chapeau de paille', price: 60 },
  { id: 'p-bonnet', kind: 'perso', place: 'tete', em: '🎅', name: 'Bonnet', price: 50 },
  { id: 'p-couronne', kind: 'perso', place: 'tete', em: '🌸', name: 'Couronne de fleurs', price: 90 },
  { id: 'p-casquette', kind: 'perso', place: 'tete', em: '🧢', name: 'Casquette', price: 40 },
  { id: 'p-lunettes', kind: 'perso', place: 'yeux', em: '👓', name: 'Lunettes rondes', price: 40 },
  { id: 'p-solaires', kind: 'perso', place: 'yeux', em: '🕶️', name: 'Lunettes de soleil', price: 50 },
  { id: 'p-echarpe', kind: 'perso', place: 'cou', em: '🧣', name: 'Écharpe', price: 40 },
  { id: 'p-collier', kind: 'perso', place: 'cou', em: '📿', name: 'Collier', price: 70 },
  { id: 'p-sac', kind: 'perso', place: 'dos', em: '🎒', name: 'Sac à dos', price: 60 },
  { id: 'p-pose-coucou', kind: 'perso', place: 'pose', em: '👋', name: 'Pose coucou', price: 90 },
  { id: 'p-pose-hanches', kind: 'perso', place: 'pose', em: '💁', name: 'Mains sur les hanches', price: 80 },
  { id: 'p-pose-dos', kind: 'perso', place: 'pose', em: '😊', name: 'Mains dans le dos', price: 70 },
  { id: 'p-pose-coeur', kind: 'perso', place: 'pose', em: '🫶', name: 'Cœur avec les mains', price: 100 },
  { id: 'p-pose-reveuse', kind: 'perso', place: 'pose', em: '🤔', name: 'Pose rêveuse', price: 80 },
  { id: 'p-co-tresses', kind: 'perso', place: 'coiffure', em: '👧', name: 'Deux tresses', price: 80 },
  { id: 'p-co-couettes', kind: 'perso', place: 'coiffure', em: '🎀', name: 'Couettes', price: 80 },
  { id: 'p-co-ondules', kind: 'perso', place: 'coiffure', em: '💇', name: 'Longs ondulés', price: 90 },
  { id: 'p-co-macarons', kind: 'perso', place: 'coiffure', em: '🍡', name: 'Macarons', price: 90 },
  { id: 'p-co-tresse', kind: 'perso', place: 'coiffure', em: '💫', name: 'Tresse sur le côté', price: 80 },
  { id: 'p-ch-rose', kind: 'perso', place: 'cheveux', em: '🩷', name: 'Cheveux rose bonbon', price: 60 },
  { id: 'p-ch-bleu', kind: 'perso', place: 'cheveux', em: '💙', name: 'Cheveux bleu ciel', price: 60 },
  { id: 'p-ch-menthe', kind: 'perso', place: 'cheveux', em: '💚', name: 'Cheveux menthe', price: 60 },
  { id: 'p-ch-platine', kind: 'perso', place: 'cheveux', em: '🤍', name: 'Blond platine', price: 50 },
  { id: 'p-ch-ombre', kind: 'perso', place: 'cheveux', em: '🌸', name: 'Ombré brun et rose', price: 100 },
  { id: 'p-hoodie', kind: 'perso', place: 'tenue', em: '🩷', name: 'Sweat à capuche', price: 80 },
  { id: 'p-princesse', kind: 'perso', place: 'tenue', em: '👸', name: 'Robe de princesse', price: 150 },
  { id: 'p-pois', kind: 'perso', place: 'tenue', em: '🔴', name: 'Robe à pois', price: 100 },
  { id: 'p-ecoliere', kind: 'perso', place: 'tenue', em: '🏫', name: 'Jupe plissée et gilet', price: 100 },
  { id: 'p-pyjama', kind: 'perso', place: 'tenue', em: '☁️', name: 'Pyjama nuage', price: 90 },
  { id: 'p-oreilles-chat', kind: 'perso', place: 'tete', em: '🐱', name: 'Oreilles de chat', price: 70 },
  { id: 'p-noeud-tete', kind: 'perso', place: 'tete', em: '🎀', name: 'Gros nœud', price: 50 },
  { id: 'p-diademe', kind: 'perso', place: 'tete', em: '👑', name: 'Diadème', price: 120 },
  { id: 'p-casque', kind: 'perso', place: 'tete', em: '🎧', name: 'Casque audio', price: 90 },
  { id: 'p-lunettes-coeur', kind: 'perso', place: 'yeux', em: '💖', name: 'Lunettes cœur', price: 60 },
  { id: 'p-noeud-cou', kind: 'perso', place: 'cou', em: '🎗️', name: 'Nœud au cou', price: 40 },
  { id: 'p-ailes', kind: 'perso', place: 'dos', em: '🧚', name: 'Ailes de fée', price: 130 },
  { id: 'p-m-ballon', kind: 'perso', place: 'main', em: '🎈', name: 'Ballon cœur', price: 50 },
  { id: 'p-m-glace', kind: 'perso', place: 'main', em: '🍦', name: 'Glace', price: 40 },
  { id: 'p-m-fleurs', kind: 'perso', place: 'main', em: '💐', name: 'Bouquet de fleurs', price: 60 },
  { id: 'p-m-livre', kind: 'perso', place: 'main', em: '📕', name: 'Livre en hébreu', price: 50 },
  { id: 'p-m-boba', kind: 'perso', place: 'main', em: '🧋', name: 'Bubble tea', price: 50 },
];
