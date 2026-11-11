'use strict';
/* Les lettres de Noa : une par semaine. La première phrase de chaque lettre répond à ce que tu as choisi la fois d'avant
   (ouverture[clé de ta réponse à la 1re question de la lettre précédente]). */
const LETTRES_NOA = [
  { num: 1, titre: 'On s’écrit ?', ouverture: {},
    phrases: [
      { he: 'שָׁלוֹם חֲבֵרָה!', tr: 'shalom khavera !', fr: 'Salut mon amie !' },
      { he: 'זוֹכֶרֶת אוֹתִי? נוֹעָה, מֵהַקָּפֶה בְּתֵל אָבִיב.', tr: 'zokhéret oti ? Noa, mehakafé beTel Aviv.', fr: 'Tu te souviens de moi ? Noa, du café à Tel-Aviv.' },
      { he: 'אֲנִי רוֹצָה לִכְתֹּב לָךְ מִכְתָּב כָּל שָׁבוּעַ, כְּדֵי שֶׁתְּתַרְגְּלִי עִבְרִית.', tr: 'ani rotsa likhtov lakh mikhtav kol shavoua, kedei shetetargli ivrit.', fr: 'Je veux t’écrire une lettre chaque semaine, pour que tu pratiques l’hébreu.' },
      { he: 'הַיּוֹם יֵשׁ שֶׁמֶשׁ, וַאֲנִי בַּדֶּרֶךְ לַיָּם.', tr: 'hayom yesh shemesh, vaani baderekh layam.', fr: 'Aujourd’hui il y a du soleil, et je suis en route pour la mer.' },
    ],
    questions: [
      { he: 'מָה אַתְּ אוֹהֶבֶת יוֹתֵר: אֶת הַיָּם אוֹ אֶת הֶהָרִים?', tr: 'ma at ohevet yoter : et hayam o et heharim ?', fr: 'Qu’est-ce que tu préfères : la mer ou la montagne ?', options: [
        { cle: 'mer', he: 'אֲנִי אוֹהֶבֶת יוֹתֵר אֶת הַיָּם', tr: 'ani ohevet yoter et hayam', fr: 'Je préfère la mer' },
        { cle: 'montagne', he: 'אֲנִי אוֹהֶבֶת יוֹתֵר אֶת הֶהָרִים', tr: 'ani ohevet yoter et heharim', fr: 'Je préfère la montagne' },
        { cle: 'deux', he: 'אֲנִי אוֹהֶבֶת אֶת שְׁנֵיהֶם', tr: 'ani ohevet et shneihem', fr: 'J’aime les deux' } ] },
      { he: 'וְאֵיפֹה אַתְּ גָּרָה?', tr: 'veeifo at gara ?', fr: 'Et où est-ce que tu habites ?', options: [
        { cle: 'france', he: 'אֲנִי גָּרָה בְּצָרְפַת', tr: 'ani gara beTsarfat', fr: 'J’habite en France' },
        { cle: 'ville', he: 'אֲנִי גָּרָה בְּעִיר גְּדוֹלָה', tr: 'ani gara beir gdola', fr: 'J’habite dans une grande ville' },
        { cle: 'village', he: 'אֲנִי גָּרָה בִּכְפָר קָטָן', tr: 'ani gara bikhfar katan', fr: 'J’habite dans un petit village' } ] },
    ] },
  { num: 2, titre: 'Dans ma cuisine', ouverture: {
      mer: { he: 'גַּם אֲנִי אוֹהֶבֶת אֶת הַיָּם! בְּשַׁבָּת שָׂחִיתִי בַּבֹּקֶר.', tr: 'gam ani ohevet et hayam ! beshabat sakhiti baboker.', fr: 'Moi aussi j’aime la mer ! Samedi, j’ai nagé le matin.' },
      montagne: { he: 'אַתְּ אוֹהֶבֶת הָרִים? בְּשַׁבָּת טִיַּלְתִּי בַּגָּלִיל, וְחָשַׁבְתִּי עָלַיִךְ.', tr: 'at ohevet harim ? beshabat tiyalti baGalil, vekhashavti alayikh.', fr: 'Tu aimes la montagne ? Samedi, je me suis baladée en Galilée et j’ai pensé à toi.' },
      deux: { he: 'גַּם הַיָּם וְגַם הֶהָרִים? בְּיִשְׂרָאֵל אֶפְשָׁר בְּאוֹתוֹ יוֹם!', tr: 'gam hayam vegam heharim ? beIsrael efshar beoto yom !', fr: 'La mer et la montagne ? En Israël, on peut faire les deux le même jour !' } },
    phrases: [
      { he: 'הַשָּׁבוּעַ הִתְחַלְתִּי לְבַשֵּׁל יוֹתֵר בַּבַּיִת.', tr: 'hashavoua hitkhalti levashel yoter babayit.', fr: 'Cette semaine, j’ai commencé à cuisiner plus à la maison.' },
      { he: 'אֶתְמוֹל הֵכַנְתִּי שַׁקְשׁוּקָה, וְהִיא יָצְאָה מְצֻיֶּנֶת.', tr: 'etmol hekhanti shakshouka, vehi yatsa metsouyénet.', fr: 'Hier, j’ai fait une shakshouka, et elle était excellente.' },
    ],
    questions: [
      { he: 'מָה אַתְּ אוֹכֶלֶת בַּאֲרוּחַת הַבֹּקֶר?', tr: 'ma at okhélet baaroukhat haboker ?', fr: 'Qu’est-ce que tu manges au petit-déjeuner ?', options: [
        { cle: 'croissant', he: 'קְרוֹאָסוֹן וְקָפֶה, כְּמוֹ בְּצָרְפַת', tr: 'kroasson vekafé, kmo beTsarfat', fr: 'Un croissant et un café, comme en France' },
        { cle: 'oeufs', he: 'בֵּיצִים וְסָלָט, כְּמוֹ בְּיִשְׂרָאֵל', tr: 'beitsim vesalat, kmo beIsrael', fr: 'Des œufs et une salade, comme en Israël' },
        { cle: 'cafe', he: 'רַק קָפֶה, אֵין לִי זְמַן', tr: 'rak kafé, ein li zman', fr: 'Juste un café, je n’ai pas le temps' } ] },
      { he: 'אַתְּ אוֹהֶבֶת לְבַשֵּׁל?', tr: 'at ohevet levashel ?', fr: 'Tu aimes cuisiner ?', options: [
        { cle: 'oui', he: 'כֵּן, מְאוֹד', tr: 'kèn, meod', fr: 'Oui, beaucoup' },
        { cle: 'unpeu', he: 'קְצָת, בְּסוֹף הַשָּׁבוּעַ', tr: 'ktsat, besof hashavoua', fr: 'Un peu, le week-end' },
        { cle: 'manger', he: 'לֹא, אֲנִי אוֹהֶבֶת לֶאֱכֹל!', tr: 'lo, ani ohevet leekhol !', fr: 'Non, j’aime manger !' } ] },
    ] },
  { num: 3, titre: 'Huit bougies', ouverture: {
      croissant: { he: 'קְרוֹאָסוֹן בַּבֹּקֶר? אֵיזֶה כֵּיף! לְיַד הַבַּיִת שֶׁלִּי יֵשׁ מַאֲפִיָּה צָרְפָתִית.', tr: 'kroasson baboker ? eizé kef ! leyad habayit sheli yesh maafiya tsarfatit.', fr: 'Un croissant le matin ? Trop bien ! Près de chez moi, il y a une boulangerie française.' },
      oeufs: { he: 'בֵּיצִים וְסָלָט? אַתְּ כְּבָר אוֹכֶלֶת כְּמוֹ יִשְׂרְאֵלִית!', tr: 'beitsim vesalat ? at kvar okhélet kmo israelit !', fr: 'Des œufs et une salade ? Tu manges déjà comme une Israélienne !' },
      cafe: { he: 'רַק קָפֶה? אַתְּ צְרִיכָה לֶאֱכֹל מַשֶּׁהוּ בַּבֹּקֶר!', tr: 'rak kafé ? at tsrikha leekhol mashéhou baboker !', fr: 'Juste un café ? Tu dois manger quelque chose le matin !' } },
    phrases: [
      { he: 'עוֹד מְעַט חֲנֻכָּה. בְּכָל הַמַּאֲפִיּוֹת יֵשׁ סֻפְגָּנִיּוֹת.', tr: 'od meat Khanouka. bekhol hamaafiyot yesh soufganiyot.', fr: 'Bientôt Hanoukka. Dans toutes les boulangeries, il y a des beignets.' },
      { he: 'כָּל עֶרֶב מַדְלִיקִים נֵרוֹת, שְׁמוֹנָה לֵילוֹת.', tr: 'kol erev madlikim nerot, shmona leilot.', fr: 'Chaque soir, on allume des bougies, pendant huit nuits.' },
    ],
    questions: [
      { he: 'מָה הַחַג שֶׁאַתְּ הֲכִי אוֹהֶבֶת?', tr: 'ma hakhag sheat hakhi ohevet ?', fr: 'Quelle est la fête que tu préfères ?', options: [
        { cle: 'noel', he: 'חַג הַמּוֹלָד', tr: 'khag hamolad', fr: 'Noël' },
        { cle: 'nouvelan', he: 'הַשָּׁנָה הַחֲדָשָׁה', tr: 'hashana hakhadasha', fr: 'Le Nouvel An' },
        { cle: 'anniv', he: 'יוֹם הַהֻלֶּדֶת שֶׁלִּי', tr: 'yom hahouledet sheli', fr: 'Mon anniversaire' } ] },
      { he: 'אַתְּ אוֹהֶבֶת סֻפְגָּנִיּוֹת?', tr: 'at ohevet soufganiyot ?', fr: 'Tu aimes les beignets ?', options: [
        { cle: 'oui', he: 'כֵּן, עִם רִבָּה!', tr: 'kèn, im riba !', fr: 'Oui, à la confiture !' },
        { cle: 'sucre', he: 'לֹא, זֶה מָתוֹק מִדַּי', tr: 'lo, zé matok midaï', fr: 'Non, c’est trop sucré' },
        { cle: 'jamais', he: 'עוֹד לֹא טָעַמְתִּי', tr: 'od lo taamti', fr: 'Je n’ai pas encore goûté' } ] },
    ] },
  { num: 4, titre: 'Une grande nouvelle', ouverture: {
      noel: { he: 'חַג הַמּוֹלָד? בְּיָפוֹ וּבְחֵיפָה יֵשׁ אוֹרוֹת וְעֵצִים יָפִים בְּדֶצֶמְבֶּר!', tr: 'khag hamolad ? beYafo ouveHaifa yesh orot veetsim yafim bedetsember !', fr: 'Noël ? À Jaffa et à Haïfa, il y a des lumières et de beaux sapins en décembre !' },
      nouvelan: { he: 'הַשָּׁנָה הַחֲדָשָׁה? אֶצְלֵנוּ יֵשׁ שְׁתַּיִם: רֹאשׁ הַשָּׁנָה בַּסְּתָו, וְעוֹד אַחַת בְּיָנוּאָר!', tr: 'hashana hakhadasha ? etslenou yesh shtayim : Rosh Hashana bastav, veod akhat beyanouar !', fr: 'Le Nouvel An ? Chez nous, il y en a deux : Rosh Hashana à l’automne, et un autre en janvier !' },
      anniv: { he: 'יוֹם הַהֻלֶּדֶת שֶׁלָּךְ? מָתַי הוּא? אֲנִי רוֹצָה לִשְׁלֹחַ לָךְ מַתָּנָה!', tr: 'yom hahouledet shelakh ? mataï hou ? ani rotsa lishloakh lakh matana !', fr: 'Ton anniversaire ? C’est quand ? Je veux t’envoyer un cadeau !' } },
    phrases: [
      { he: 'יֵשׁ לִי חֲדָשׁוֹת גְּדוֹלוֹת: אִמַּצְתִּי כֶּלֶב!', tr: 'yesh li khadashot gdolot : imatsti kelev !', fr: 'J’ai une grande nouvelle : j’ai adopté un chien !' },
      { he: 'קוֹרְאִים לוֹ פִּיתָה, כִּי הוּא עָגֹל וְחוּם.', tr: 'korim lo Pita, ki hou agol vekhoum.', fr: 'Il s’appelle Pita, parce qu’il est rond et marron.' },
      { he: 'הוּא אוֹהֵב לִישֹׁן עַל הַסַּפָּה שֶׁלִּי.', tr: 'hou ohev lishon al hasapa sheli.', fr: 'Il aime dormir sur mon canapé.' },
    ],
    questions: [
      { he: 'יֵשׁ לָךְ חַיַּת מַחְמָד?', tr: 'yesh lakh khayat makhmad ?', fr: 'Tu as un animal de compagnie ?', options: [
        { cle: 'chat', he: 'כֵּן, יֵשׁ לִי חָתוּל', tr: 'kèn, yesh li khatoul', fr: 'Oui, j’ai un chat' },
        { cle: 'chien', he: 'כֵּן, יֵשׁ לִי כֶּלֶב', tr: 'kèn, yesh li kelev', fr: 'Oui, j’ai un chien' },
        { cle: 'non', he: 'לֹא, אֲבָל אֲנִי רוֹצָה', tr: 'lo, aval ani rotsa', fr: 'Non, mais j’aimerais bien' } ] },
      { he: 'אַתְּ אוֹהֶבֶת כְּלָבִים?', tr: 'at ohevet klavim ?', fr: 'Tu aimes les chiens ?', options: [
        { cle: 'oui', he: 'מְאוֹד!', tr: 'meod !', fr: 'Beaucoup !' },
        { cle: 'bruit', he: 'קְצָת, הֵם עוֹשִׂים רַעַשׁ', tr: 'ktsat, hem osim raash', fr: 'Un peu, ils font du bruit' },
        { cle: 'peur', he: 'אֲנִי מְפַחֶדֶת מֵהֶם', tr: 'ani mefakhédet mehem', fr: 'J’en ai peur' } ] },
    ] },
  { num: 5, titre: 'Une semaine chargée', ouverture: {
      chat: { he: 'יֵשׁ לָךְ חָתוּל? פִּיתָה בֶּטַח יִרְצֶה לְשַׂחֵק אִתּוֹ!', tr: 'yesh lakh khatoul ? Pita betakh yirtsé lessakhek ito !', fr: 'Tu as un chat ? Pita voudra sûrement jouer avec lui !' },
      chien: { he: 'יֵשׁ לָךְ כֶּלֶב? אוּלַי יוֹם אֶחָד הֵם יִפָּגְשׁוּ!', tr: 'yesh lakh kelev ? oulaï yom ekhad hem yipagshou !', fr: 'Tu as un chien ? Peut-être qu’un jour ils se rencontreront !' },
      non: { he: 'אַתְּ רוֹצָה חַיַּת מַחְמָד? אֲנִי מַמְלִיצָה, זֶה הַרְבֵּה אַהֲבָה!', tr: 'at rotsa khayat makhmad ? ani mamlitsa, zé harbé ahava !', fr: 'Tu voudrais un animal ? Je te le conseille, c’est beaucoup d’amour !' } },
    phrases: [
      { he: 'הַשָּׁבוּעַ הָיָה קָשֶׁה בָּעֲבוֹדָה. הָיוּ לִי הַרְבֵּה פְּגִישׁוֹת.', tr: 'hashavoua haya kashé baavoda. hayou li harbé pguishot.', fr: 'La semaine a été difficile au travail. J’ai eu beaucoup de réunions.' },
      { he: 'בָּעֶרֶב הָלַכְתִּי לְטַיֵּל עִם פִּיתָה עַל הַחוֹף, וְהִרְגַּשְׁתִּי יוֹתֵר טוֹב.', tr: 'baerev halakhti letayel im Pita al hakhof, vehirgashti yoter tov.', fr: 'Le soir, je suis allée me promener avec Pita sur la plage, et je me suis sentie mieux.' },
    ],
    questions: [
      { he: 'מָה אַתְּ עוֹשָׂה כְּשֶׁאַתְּ עֲיֵפָה?', tr: 'ma at osa ksheat ayefa ?', fr: 'Qu’est-ce que tu fais quand tu es fatiguée ?', options: [
        { cle: 'musique', he: 'אֲנִי שׁוֹמַעַת מוּזִיקָה', tr: 'ani shomaat mouzika', fr: 'J’écoute de la musique' },
        { cle: 'balade', he: 'אֲנִי הוֹלֶכֶת לְטַיֵּל', tr: 'ani holékhet letayel', fr: 'Je vais me promener' },
        { cle: 'dormir', he: 'אֲנִי הוֹלֶכֶת לִישֹׁן מֻקְדָּם', tr: 'ani holékhet lishon moukdam', fr: 'Je vais me coucher tôt' } ] },
      { he: 'אַתְּ עוֹבֶדֶת אוֹ לוֹמֶדֶת?', tr: 'at ovédet o lomédet ?', fr: 'Tu travailles ou tu étudies ?', options: [
        { cle: 'travail', he: 'אֲנִי עוֹבֶדֶת', tr: 'ani ovédet', fr: 'Je travaille' },
        { cle: 'etudes', he: 'אֲנִי לוֹמֶדֶת', tr: 'ani lomédet', fr: 'J’étudie' },
        { cle: 'deux', he: 'גַּם וְגַם!', tr: 'gam vegam !', fr: 'Les deux !' } ] },
    ] },
  { num: 6, titre: 'Une surprise', ouverture: {
      musique: { he: 'מוּזִיקָה זֶה הַפִּתָּרוֹן הֲכִי טוֹב! תִּשְׁלְחִי לִי שִׁיר צָרְפָתִי?', tr: 'mouzika zé hapitaron hakhi tov ! tishlekhi li shir tsarfati ?', fr: 'La musique, c’est la meilleure solution ! Tu m’envoies une chanson française ?' },
      balade: { he: 'גַּם אֲנִי! אֵין כְּמוֹ טִיּוּל קָטָן בָּעֶרֶב.', tr: 'gam ani ! ein kmo tiyoul katan baerev.', fr: 'Moi aussi ! Rien de tel qu’une petite balade le soir.' },
      dormir: { he: 'לִישֹׁן מֻקְדָּם? אֲנִי לֹא מַצְלִיחָה... פִּיתָה מְעִיר אוֹתִי!', tr: 'lishon moukdam ? ani lo matslikha… Pita meir oti !', fr: 'Te coucher tôt ? Moi, je n’y arrive pas… Pita me réveille !' } },
    phrases: [
      { he: 'יֵשׁ לִי הַפְתָּעָה: בַּקַּיִץ אֲנִי בָּאָה לְצָרְפַת!', tr: 'yesh li haftaa : bakayits ani baa leTsarfat !', fr: 'J’ai une surprise : cet été, je viens en France !' },
      { he: 'אֲנִי רוֹצָה לִרְאוֹת אוֹתָךְ וּלְדַבֵּר אִתָּךְ בְּעִבְרִית.', tr: 'ani rotsa lirot otakh ouledaber itakh beivrit.', fr: 'Je veux te voir et parler hébreu avec toi.' },
      { he: 'אַתְּ כְּבָר כּוֹתֶבֶת כָּל כָּךְ טוֹב!', tr: 'at kvar kotévet kol kakh tov !', fr: 'Tu écris déjà tellement bien !' },
    ],
    questions: [
      { he: 'מָה כְּדַאי לִי לִרְאוֹת?', tr: 'ma kedaï li lirot ?', fr: 'Qu’est-ce que je devrais voir ?', options: [
        { cle: 'paris', he: 'אֶת פָּרִיז, כַּמּוּבָן', tr: 'et Pariz, kamouvan', fr: 'Paris, bien sûr' },
        { cle: 'villages', he: 'אֶת הַכְּפָרִים הַקְּטַנִּים', tr: 'et hakfarim haktanim', fr: 'Les petits villages' },
        { cle: 'mer', he: 'אֶת הַיָּם, בַּדָּרוֹם', tr: 'et hayam, badarom', fr: 'La mer, dans le sud' } ] },
      { he: 'נִפָּגֵשׁ?', tr: 'nipaguesh ?', fr: 'On se voit ?', options: [
        { cle: 'oui', he: 'בֶּטַח! אֲנִי מְחַכָּה', tr: 'betakh ! ani mekhaka', fr: 'Bien sûr ! J’ai hâte' },
        { cle: 'joie', he: 'כֵּן, בְּשִׂמְחָה רַבָּה', tr: 'kèn, besimkha raba', fr: 'Oui, avec grand plaisir' },
        { cle: 'hebreu', he: 'כֵּן, וּנְדַבֵּר רַק בְּעִבְרִית!', tr: 'kèn, ouneddaber rak beivrit !', fr: 'Oui, et on ne parlera qu’hébreu !' } ] },
    ] },
];
// Les formules de ta réponse et la signature de Noa (pour qu'elles aient leur son)
const LETTRES_FORMULES = {
  salut: { he: 'שָׁלוֹם נוֹעָה,', tr: 'shalom Noa,', fr: 'Bonjour Noa,' },
  bises: { he: 'נְשִׁיקוֹת!', tr: 'neshikot !', fr: 'Bisous !' },
  signature: { he: 'נְשִׁיקוֹת, נוֹעָה', tr: 'neshikot, Noa', fr: 'Bisous, Noa' },
};
// Le sens des mots du feuilleton et des lettres (quand on les touche)
window.GLOSES_HEBDO = {
  'יְשָׁנָה': ['vieille', 'yeshana'], 'תְּשַׁע': ['neuf (dans « neuf cents »)', 'tsha'], 'לְיוֹסֵף': ['pour Yossef', 'leYossef'], 'סְגוּרָה': ['fermée', 'sgoura'],
  'אֵלָיו': ['à lui, vers lui', 'elav'], 'פּוֹתַחַת': ['ouvre (femme)', 'potakhat'], 'בָּנוֹת': ['les filles', 'banot'], 'שְׁלוֹמְכֶן': ['comment allez-vous (à des femmes)', 'shlomkhen'],
  'מָצָאנוּ': ['nous avons trouvé', 'matsanou'], 'מִשְּׁנַת': ['depuis l’année, de l’année', 'mishnat'], 'שֶׁלָּכֶן': ['à vous (femmes), votre', 'shelakhen'], 'יוֹסֵף': ['Yossef (prénom)', 'Yossef'],
  'חוֹשֶׁבֶת': ['pense, crois (femme)', 'khoshévet'], 'מְחַכּוֹת': ['attendons, attendent (femmes)', 'mekhakot'], 'תִּרְאוּ': ['regardez', 'tirou'], 'תֵּבַת': ['boîte (de)', 'tevat'],
  'מִישֶׁהוּ': ['quelqu’un', 'mishéhou'], 'מִשְׁתַּמֵּשׁ': ['utilise', 'mishtamesh'], 'בַּתֵּבָה': ['dans la boîte', 'batéva'], 'מְשַׁלֵּם': ['paie', 'meshalem'],
  'בָּא': ['vient, est venu', 'ba'], 'לָכֶן': ['à vous (femmes)', 'lakhen'], 'הַתֵּבוֹת': ['les boîtes', 'hatevot'], 'מִגְדַּל': ['la tour (de)', 'migdal'],
  'מְחַפְּשׂוֹת': ['cherchez, cherchent (femmes)', 'mekhapsot'], 'מַכִּיר': ['connais, connaît', 'makir'], 'הַכְּתָב': ['l’écriture', 'haktav'], 'אֶצְלִי': ['chez moi', 'etsli'],
  'מַפּוֹת': ['cartes (géographiques)', 'mapot'], 'יְשָׁנוֹת': ['vieilles', 'yeshanot'], 'לִמְצֹא': ['trouver', 'limtso'], 'וְיוֹשֵׁב': ['et s’assoit', 'veyoshev'],
  'נָרוּץ': ['courons, nous courrons', 'narouts'], 'מֹשֶׁה': ['Moshé (prénom)', 'Moshé'], 'חִכָּה': ['a attendu', 'khika'], 'בֵּינֵיהֶם': ['entre eux', 'beineihem'],
  'יָצָא': ['est sorti, est parti', 'yatsa'], 'קִבֵּל': ['a reçu', 'kibel'], 'חָזַר': ['est revenu', 'khazar'], 'הָיְתָה': ['était (elle)', 'hayta'],
  'מְדַבֵּר': ['parle', 'medaber'], 'אָבוֹת': ['pères (« beit avot » : maison de retraite)', 'avot'], 'עִתּוֹנִים': ['journaux', 'itonim'], 'יְשָׁנִים': ['vieux (pluriel)', 'yeshanim'],
  'בְּרוּכוֹת': ['bienvenues (« broukhot habaot »)', 'broukhot'], 'הַבָּאוֹת': ['les arrivantes (« bienvenues »)', 'habaot'], 'הָעִתּוֹנִים': ['les journaux', 'haitonim'], 'וְדָוִד': ['et David', 'veDavid'],
  'שָׁמִיר': ['Shamir (nom de famille)', 'Shamir'], 'הַיַּרְקוֹן': ['HaYarkon (nom de rue)', 'haYarkon'], 'רָצִים': ['on court', 'ratsim'], 'שֶׁאָבַד': ['qui a été perdu', 'sheavad'],
  'דָּוִד': ['David (prénom)', 'David'], 'מִצְטַעֲרוֹת': ['désolées', 'mitstaarot'], 'זוֹכֶרֶת': ['se souvient, te souviens (femme)', 'zokhéret'], 'לִפְגֹּשׁ': ['rencontrer', 'lifgosh'],
  'מִתְקַשֶּׁרֶת': ['appelle (femme)', 'mitkashéret'], 'אֵלֶיהָ': ['à elle', 'eleiha'], 'אֶצְלָהּ': ['chez elle', 'etsla'], 'בּוֹאוּ': ['venez', 'boou'],
  'תִּכָּנְסוּ': ['entrez', 'tikansou'], 'הַבָּנוֹת': ['les filles', 'habanot'], 'כָּתַבְתִּי': ['j’ai écrit', 'katavti'], 'אוֹהֵב': ['aime (homme)', 'ohev'],
  'אוֹתִי': ['moi (complément)', 'oti'], 'חַכֶּה': ['attends (à un homme)', 'khaké'], 'חָשַׁבְתִּי': ['j’ai pensé, j’ai cru', 'khashavti'], 'הִמְשִׁיכוּ': ['ont continué', 'himshikhou'],
  'מְחַכֶּה': ['attend (homme)', 'mekhaké'], 'שֶׁכָּתַבְתִּי': ['que j’ai écrit', 'shekatavti'], 'נָבִיא': ['nous amènerons', 'navi'], 'מַחְזִיקִים': ['tiennent', 'makhzikim'],
  'יָדַיִם': ['mains', 'yadayim'], 'שֶׁתְּתַרְגְּלִי': ['que tu pratiques', 'shetetargli'], 'הֶהָרִים': ['les montagnes', 'heharim'], 'שְׁנֵיהֶם': ['les deux', 'shneihem'],
  'בִּכְפָר': ['dans un village', 'bikhfar'], 'הִתְחַלְתִּי': ['j’ai commencé', 'hitkhalti'], 'יָצְאָה': ['est sortie (« elle était… » réussie)', 'yatsa'], 'מְצֻיֶּנֶת': ['excellente', 'metsouyénet'],
  'שָׂחִיתִי': ['j’ai nagé', 'sakhiti'], 'הָרִים': ['montagnes', 'harim'], 'טִיַּלְתִּי': ['je me suis promenée', 'tiyalti'], 'בַּגָּלִיל': ['en Galilée', 'baGalil'],
  'וְחָשַׁבְתִּי': ['et j’ai pensé', 'vekhashavti'], 'עָלַיִךְ': ['à toi (femme)', 'alayikh'], 'חֲנֻכָּה': ['Hanoukka', 'Khanouka'], 'הַמַּאֲפִיּוֹת': ['les boulangeries', 'hamaafiyot'],
  'הַחַג': ['la fête', 'hakhag'], 'חַג': ['fête', 'khag'], 'הַמּוֹלָד': ['la naissance (« khag hamolad » : Noël)', 'hamolad'], 'רִבָּה': ['confiture', 'riba'],
  'טָעַמְתִּי': ['j’ai goûté', 'taamti'], 'גְּדוֹלוֹת': ['grandes', 'gdolot'], 'אִמַּצְתִּי': ['j’ai adopté', 'imatsti'], 'וְחוּם': ['et marron', 'vekhoum'],
  'הַסַּפָּה': ['le canapé', 'hasapa'], 'בְּדֶצֶמְבֶּר': ['en décembre', 'bedetsember'], 'אֶצְלֵנוּ': ['chez nous', 'etslenou'], 'בְּיָנוּאָר': ['en janvier', 'beyanouar'],
  'חַיַּת': ['animal (de) : « khayat makhmad » = animal de compagnie', 'khayat'], 'מַחְמָד': ['chéri (« animal de compagnie »)', 'makhmad'], 'כְּלָבִים': ['chiens', 'klavim'], 'רַעַשׁ': ['bruit', 'raash'],
  'מְפַחֶדֶת': ['ai peur, a peur (femme)', 'mefakhédet'], 'פְּגִישׁוֹת': ['réunions', 'pguishot'], 'הָלַכְתִּי': ['je suis allée', 'halakhti'], 'וְהִרְגַּשְׁתִּי': ['et je me suis sentie', 'vehirgashti'],
  'יִרְצֶה': ['voudra', 'yirtsé'], 'אִתּוֹ': ['avec lui', 'ito'], 'יִפָּגְשׁוּ': ['se rencontreront', 'yipagshou'], 'עֲיֵפָה': ['fatiguée', 'ayefa'],
  'מוּזִיקָה': ['musique', 'mouzika'], 'אִתָּךְ': ['avec toi (femme)', 'itakh'], 'כּוֹתֶבֶת': ['écris (femme)', 'kotévet'], 'תִּשְׁלְחִי': ['envoie (à une femme)', 'tishlekhi'],
  'צָרְפָתִי': ['français', 'tsarfati'], 'מַצְלִיחָה': ['réussis, arrive à (femme)', 'matslikha'], 'פָּרִיז': ['Paris', 'Pariz'], 'הַכְּפָרִים': ['les villages', 'hakfarim'],
  'בַּדָּרוֹם': ['dans le sud', 'badarom'], 'וּנְדַבֵּר': ['et nous parlerons', 'ouneddaber'], 'נְשִׁיקוֹת': ['bisous', 'neshikot'],
};
