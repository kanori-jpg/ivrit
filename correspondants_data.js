'use strict';
/* D'autres correspondants que Noa : même principe, une lettre le lendemain de ta réponse.
   Chaque lettre : phrases (la 1re est la salutation), ouverture[clé de ta réponse à la 1re question de la lettre d'avant], 2 questions. */
const CORRESPONDANTS = [
  { id: 'yael', nom: 'Yaël', em: '👩🏽‍🎓', desc: 'étudiante à Jérusalem', ville: 'יְרוּשָׁלַיִם', couleur: '#b5485a',
    formules: {
      salut: { he: 'שָׁלוֹם יָעֵל,', tr: 'shalom Yaël,', fr: 'Bonjour Yaël,' },
      bises: { he: 'נְשִׁיקוֹת!', tr: 'neshikot !', fr: 'Bisous !' },
      signature: { he: 'נְשִׁיקוֹת, יָעֵל', tr: 'neshikot, Yaël', fr: 'Bisous, Yaël' } },
    lettres: [
      { num: 1, titre: 'Bonjour de Jérusalem', ouverture: {},
        phrases: [
          { he: 'שָׁלוֹם! קוֹרְאִים לִי יָעֵל.', tr: 'shalom ! korim li Yaël.', fr: 'Bonjour ! Je m’appelle Yaël.' },
          { he: 'אֲנִי לוֹמֶדֶת בָּאוּנִיבֶרְסִיטָה בִּירוּשָׁלַיִם.', tr: 'ani lomédet baounivèrsita biYroushalayim.', fr: 'J’étudie à l’université, à Jérusalem.' },
          { he: 'נוֹעָה סִפְּרָה לִי שֶׁאַתְּ לוֹמֶדֶת עִבְרִית.', tr: 'Noa sipra li sheat lomédet ivrit.', fr: 'Noa m’a raconté que tu apprends l’hébreu.' },
          { he: 'הָעִיר שֶׁלִּי עַתִּיקָה וְיָפָה מְאוֹד.', tr: 'hair sheli atika veyafa meod.', fr: 'Ma ville est ancienne et très belle.' },
        ],
        questions: [
          { he: 'מָה אַתְּ לוֹמֶדֶת חוּץ מֵעִבְרִית?', tr: 'ma at lomédet khouts meivrit ?', fr: 'Qu’est-ce que tu apprends, à part l’hébreu ?', options: [
            { cle: 'travail', he: 'אֲנִי לֹא לוֹמֶדֶת, אֲנִי עוֹבֶדֶת', tr: 'ani lo lomédet, ani ovédet', fr: 'Je n’étudie pas, je travaille' },
            { cle: 'musique', he: 'אֲנִי לוֹמֶדֶת מוּזִיקָה', tr: 'ani lomédet mouzika', fr: 'J’apprends la musique' },
            { cle: 'cuisine', he: 'אֲנִי לוֹמֶדֶת לְבַשֵּׁל', tr: 'ani lomédet levashel', fr: 'J’apprends à cuisiner' } ] },
          { he: 'הָיִית פַּעַם בִּירוּשָׁלַיִם?', tr: 'hayit paam biYroushalayim ?', fr: 'Tu es déjà allée à Jérusalem ?', options: [
            { cle: 'oui', he: 'כֵּן, וְהִיא מְאוֹד יָפָה', tr: 'kèn, vehi meod yafa', fr: 'Oui, et elle est très belle' },
            { cle: 'non', he: 'עוֹד לֹא, אֲבָל אֲנִי רוֹצָה', tr: 'od lo, aval ani rotsa', fr: 'Pas encore, mais j’aimerais' },
            { cle: 'photos', he: 'רַק בִּתְמוּנוֹת', tr: 'rak bitmounot', fr: 'Seulement en photos' } ] },
        ] },
      { num: 2, titre: 'Au marché', ouverture: {
          travail: { he: 'אַתְּ עוֹבֶדֶת? כָּל הַכָּבוֹד! גַּם אֲנִי עוֹבֶדֶת בְּבֵית קָפֶה בָּעֶרֶב.', tr: 'at ovédet ? kol hakavod ! gam ani ovédet beveit kafé baérev.', fr: 'Tu travailles ? Bravo ! Moi aussi, je travaille dans un café le soir.' },
          musique: { he: 'מוּזִיקָה? אֵיזֶה כֵּיף! אֲנִי מְנַגֶּנֶת בְּגִיטָרָה.', tr: 'mouzika ? eizé kef ! ani menaguénet beguitara.', fr: 'De la musique ? Génial ! Je joue de la guitare.' },
          cuisine: { he: 'לְבַשֵּׁל? אָז אַתְּ חַיֶּבֶת לָבוֹא לַשּׁוּק שֶׁלָּנוּ!', tr: 'levashel ? az at khayévet lavo lashouk shelanou !', fr: 'Cuisiner ? Alors tu dois venir à notre marché !' } },
        phrases: [
          { he: 'שָׁלוֹם שׁוּב!', tr: 'shalom shouv !', fr: 'Re-bonjour !' },
          { he: 'בְּיוֹם שִׁשִּׁי הָלַכְתִּי לַשּׁוּק הַגָּדוֹל שֶׁל הָעִיר.', tr: 'beyom shishi halakhti lashouk hagadol shel hair.', fr: 'Vendredi, je suis allée au grand marché de la ville.' },
          { he: 'הָיוּ שָׁם הַרְבֵּה אֲנָשִׁים, וְרֵיחַ שֶׁל פֵּרוֹת וְתַבְלִינִים.', tr: 'hayou sham harbé anashim, vereakh shel perot vetavlinim.', fr: 'Il y avait beaucoup de monde, et une odeur de fruits et d’épices.' },
          { he: 'קָנִיתִי חַלָּה וּפְרָחִים לְשַׁבָּת.', tr: 'kaniti khala ouprakhim leshabat.', fr: 'J’ai acheté une hallah et des fleurs pour shabbat.' },
        ],
        questions: [
          { he: 'מָה אַתְּ קוֹנָה בַּשּׁוּק?', tr: 'ma at kona bashouk ?', fr: 'Qu’est-ce que tu achètes au marché ?', options: [
            { cle: 'fruits', he: 'אֲנִי קוֹנָה פֵּרוֹת וִירָקוֹת', tr: 'ani kona perot virakot', fr: 'J’achète des fruits et des légumes' },
            { cle: 'pain', he: 'אֲנִי קוֹנָה לֶחֶם טָרִי', tr: 'ani kona lékhem tari', fr: 'J’achète du pain frais' },
            { cle: 'rien', he: 'אֲנִי לֹא הוֹלֶכֶת לַשּׁוּק', tr: 'ani lo holékhet lashouk', fr: 'Je ne vais pas au marché' } ] },
          { he: 'מָה הַמַּאֲכָל הָאָהוּב עָלַיִךְ?', tr: 'ma hamaakhal haahouv alayikh ?', fr: 'Quel est ton plat préféré ?', options: [
            { cle: 'houmous', he: 'חוּמוּס, כַּמּוּבָן!', tr: 'khoumous, kamouvan !', fr: 'Le houmous, bien sûr !' },
            { cle: 'pates', he: 'פַּסְטָה עִם עַגְבָנִיּוֹת', tr: 'pasta im agvaniyot', fr: 'Des pâtes à la tomate' },
            { cle: 'gateau', he: 'עוּגַת שׁוֹקוֹלָד', tr: 'ougat shokolad', fr: 'Le gâteau au chocolat' } ] },
        ] },
      { num: 3, titre: 'Shabbat à Jérusalem', ouverture: {
          fruits: { he: 'גַּם אֲנִי אוֹהֶבֶת פֵּרוֹת, בִּמְיֻחָד עֲנָבִים.', tr: 'gam ani ohévet perot, bimyoukhad anavim.', fr: 'Moi aussi, j’aime les fruits, surtout le raisin.' },
          pain: { he: 'לֶחֶם טָרִי זֶה הַדָּבָר הֲכִי טוֹב בָּעוֹלָם!', tr: 'lékhem tari zé hadavar hakhi tov baolam !', fr: 'Le pain frais, c’est la meilleure chose au monde !' },
          rien: { he: 'אֵין שׁוּק לְיַד הַבַּיִת שֶׁלָּךְ? חֲבָל!', tr: 'ein shouk leyad habayit shelakh ? khaval !', fr: 'Il n’y a pas de marché près de chez toi ? Dommage !' } },
        phrases: [
          { he: 'שָׁלוֹם חֲבֵרָה!', tr: 'shalom khavera !', fr: 'Salut mon amie !' },
          { he: 'בִּירוּשָׁלַיִם, בְּשַׁבָּת, הָעִיר שְׁקֵטָה מְאוֹד.', tr: 'biYroushalayim, beshabat, hair shketa meod.', fr: 'À Jérusalem, le shabbat, la ville est très calme.' },
          { he: 'אֵין אוֹטוֹבּוּסִים, וְכֻלָּם הוֹלְכִים בָּרֶגֶל.', tr: 'ein otobousim, vekhoulam holkhim baréguel.', fr: 'Il n’y a pas de bus, et tout le monde va à pied.' },
          { he: 'בָּעֶרֶב אֲנִי אוֹכֶלֶת אֲרוּחַת שַׁבָּת עִם הַמִּשְׁפָּחָה שֶׁלִּי.', tr: 'baérev ani okhélet aroukhat shabat im hamishpakha sheli.', fr: 'Le soir, je mange le repas de shabbat avec ma famille.' },
        ],
        questions: [
          { he: 'מָה אַתְּ עוֹשָׂה בְּסוֹף הַשָּׁבוּעַ?', tr: 'ma at ossa besof hashavoua ?', fr: 'Que fais-tu le week-end ?', options: [
            { cle: 'repos', he: 'אֲנִי נָחָה בַּבַּיִת', tr: 'ani nakha babayit', fr: 'Je me repose à la maison' },
            { cle: 'amis', he: 'אֲנִי פּוֹגֶשֶׁת חֲבֵרִים', tr: 'ani poguéshet khaverim', fr: 'Je vois des amis' },
            { cle: 'balade', he: 'אֲנִי מְטַיֶּלֶת בַּטֶּבַע', tr: 'ani metayélet bateva', fr: 'Je me promène dans la nature' } ] },
          { he: 'תָּבוֹאִי לְבַקֵּר אוֹתִי?', tr: 'tavoï levaker oti ?', fr: 'Tu viendras me rendre visite ?', options: [
            { cle: 'oui', he: 'בְּשִׂמְחָה!', tr: 'besimkha !', fr: 'Avec plaisir !' },
            { cle: 'ete', he: 'אוּלַי בַּקַּיִץ', tr: 'oulaï bakayits', fr: 'Peut-être cet été' },
            { cle: 'promesse', he: 'כֵּן, אֲנִי מַבְטִיחָה', tr: 'kèn, ani mavtikha', fr: 'Oui, je te le promets' } ] },
        ] },
    ] },

  { id: 'dani', nom: 'Dani', em: '👦🏻', desc: '10 ans, à Haïfa', ville: 'חֵיפָה', couleur: '#2f8fb0',
    formules: {
      salut: { he: 'שָׁלוֹם דָּנִי,', tr: 'shalom Dani,', fr: 'Bonjour Dani,' },
      bises: { he: 'לְהִתְרָאוֹת!', tr: 'lehitraot !', fr: 'À bientôt !' },
      signature: { he: 'לְהִתְרָאוֹת, דָּנִי', tr: 'lehitraot, Dani', fr: 'À bientôt, Dani' } },
    lettres: [
      { num: 1, titre: 'Un nouveau correspondant', ouverture: {},
        phrases: [
          { he: 'שָׁלוֹם! אֲנִי דָּנִי, וַאֲנִי בֶּן עֶשֶׂר.', tr: 'shalom ! ani Dani, vaani ben éser.', fr: 'Bonjour ! Je suis Dani, et j’ai dix ans.' },
          { he: 'אֲנִי גָּר בְּחֵיפָה, עַל הַר הַכַּרְמֶל.', tr: 'ani gar beKhaïfa, al har haKarmel.', fr: 'J’habite à Haïfa, sur le mont Carmel.' },
          { he: 'הַמּוֹרָה שֶׁלִּי אָמְרָה לִי לִכְתֹּב מִכְתָּב לְמִישֶׁהוּ בְּצָרְפַת.', tr: 'hamora sheli amra li likhtov mikhtav lemishéhou beTsarfat.', fr: 'Ma maîtresse m’a dit d’écrire une lettre à quelqu’un en France.' },
          { he: 'יֵשׁ לִי כֶּלֶב קָטָן, וְהוּא מְאוֹד מַצְחִיק.', tr: 'yesh li kélev katan, vehou meod matskhik.', fr: 'J’ai un petit chien, et il est très drôle.' },
        ],
        questions: [
          { he: 'יֵשׁ לָךְ חַיָּה בַּבַּיִת?', tr: 'yesh lakh khaya babayit ?', fr: 'Tu as un animal à la maison ?', options: [
            { cle: 'chat', he: 'כֵּן, יֵשׁ לִי חָתוּל', tr: 'kèn, yesh li khatoul', fr: 'Oui, j’ai un chat' },
            { cle: 'non', he: 'לֹא, אֵין לִי', tr: 'lo, ein li', fr: 'Non, je n’en ai pas' },
            { cle: 'poisson', he: 'יֵשׁ לִי דָּג קָטָן', tr: 'yesh li dag katan', fr: 'J’ai un petit poisson' } ] },
          { he: 'בַּת כַּמָּה אַתְּ?', tr: 'bat kama at ?', fr: 'Quel âge as-tu ?', options: [
            { cle: 'trente', he: 'אֲנִי בַּת שְׁלוֹשִׁים', tr: 'ani bat shloshim', fr: 'J’ai trente ans' },
            { cle: 'secret', he: 'זֶה סוֹד!', tr: 'zé sod !', fr: 'C’est un secret !' },
            { cle: 'grande', he: 'אֲנִי כְּבָר גְּדוֹלָה', tr: 'ani kvar gdola', fr: 'Je suis déjà grande' } ] },
        ] },
      { num: 2, titre: 'À l’école', ouverture: {
          chat: { he: 'חָתוּל? אֲנִי מְפַחֵד קְצָת מֵחֲתוּלִים...', tr: 'khatoul ? ani mefakhed ktsat mekhatoulim…', fr: 'Un chat ? J’ai un peu peur des chats…' },
          non: { he: 'אֵין לָךְ חַיָּה? אַתְּ יְכוֹלָה לְשַׂחֵק עִם הַכֶּלֶב שֶׁלִּי!', tr: 'ein lakh khaya ? at yekhola lessakhek im hakélev sheli !', fr: 'Tu n’as pas d’animal ? Tu peux jouer avec mon chien !' },
          poisson: { he: 'דָּג? אֵיזֶה כֵּיף! הוּא שׂוֹחֶה כָּל הַיּוֹם?', tr: 'dag ? eizé kef ! hou sokhé kol hayom ?', fr: 'Un poisson ? Génial ! Il nage toute la journée ?' } },
        phrases: [
          { he: 'הַיּוֹם הָיָה יוֹם אָרֹךְ בְּבֵית הַסֵּפֶר.', tr: 'hayom haya yom arokh beveit hassefer.', fr: 'Aujourd’hui, c’était une longue journée à l’école.' },
          { he: 'לָמַדְנוּ חֶשְׁבּוֹן וְאַנְגְּלִית.', tr: 'lamadnou kheshbon veanglit.', fr: 'On a fait des maths et de l’anglais.' },
          { he: 'בַּהַפְסָקָה שִׂחַקְתִּי כַּדּוּרֶגֶל עִם הַחֲבֵרִים שֶׁלִּי.', tr: 'bahafsaka sikhakti kadouréguel im hakhaverim sheli.', fr: 'À la récré, j’ai joué au foot avec mes copains.' },
        ],
        questions: [
          { he: 'מָה אָהַבְתְּ לִלְמֹד בְּבֵית הַסֵּפֶר?', tr: 'ma ahavt lilmod beveit hassefer ?', fr: 'Qu’est-ce que tu aimais apprendre à l’école ?', options: [
            { cle: 'langues', he: 'שָׂפוֹת', tr: 'safot', fr: 'Les langues' },
            { cle: 'dessin', he: 'צִיּוּר', tr: 'tsiyour', fr: 'Le dessin' },
            { cle: 'sport', he: 'סְפּוֹרְט', tr: 'sport', fr: 'Le sport' } ] },
          { he: 'הָיִית תַּלְמִידָה טוֹבָה?', tr: 'hayit talmida tova ?', fr: 'Tu étais une bonne élève ?', options: [
            { cle: 'oui', he: 'כֵּן, מְאוֹד', tr: 'kèn, meod', fr: 'Oui, très' },
            { cle: 'pas', he: 'לֹא תָּמִיד', tr: 'lo tamid', fr: 'Pas toujours' },
            { cle: 'bavarde', he: 'דִּבַּרְתִּי יוֹתֵר מִדַּי', tr: 'dibarti yoter midaï', fr: 'Je parlais trop' } ] },
        ] },
      { num: 3, titre: 'Un château de sable', ouverture: {
          langues: { he: 'שָׂפוֹת? אֲנִי רוֹצֶה לִלְמֹד צָרְפָתִית. תְּלַמְּדִי אוֹתִי?', tr: 'safot ? ani rotsé lilmod tsarfatit. telamdi oti ?', fr: 'Les langues ? Je veux apprendre le français. Tu m’apprendras ?' },
          dessin: { he: 'צִיּוּר? גַּם אֲנִי אוֹהֵב לְצַיֵּר!', tr: 'tsiyour ? gam ani ohev letsayer !', fr: 'Le dessin ? Moi aussi, j’aime dessiner !' },
          sport: { he: 'גַּם אֲנִי אוֹהֵב סְפּוֹרְט, בִּמְיֻחָד כַּדּוּרֶגֶל.', tr: 'gam ani ohev sport, bimyoukhad kadouréguel.', fr: 'Moi aussi, j’aime le sport, surtout le foot.' } },
        phrases: [
          { he: 'שָׁלוֹם!', tr: 'shalom !', fr: 'Bonjour !' },
          { he: 'בְּשַׁבָּת הָלַכְנוּ לַיָּם עִם אַבָּא וְאִמָּא.', tr: 'beshabat halakhnou layam im aba veima.', fr: 'Samedi, on est allés à la mer avec papa et maman.' },
          { he: 'בָּנִיתִי אַרְמוֹן גָּדוֹל מֵחוֹל, אֲבָל גַּל גָּדוֹל הָרַס אוֹתוֹ.', tr: 'baniti armon gadol mekhol, aval gal gadol haras oto.', fr: 'J’ai construit un grand château de sable, mais une grosse vague l’a détruit.' },
        ],
        questions: [
          { he: 'אַתְּ יוֹדַעַת לִשְׂחוֹת?', tr: 'at yodaat liskhot ?', fr: 'Tu sais nager ?', options: [
            { cle: 'oui', he: 'כֵּן, אֲנִי שׂוֹחָה טוֹב', tr: 'kèn, ani sokha tov', fr: 'Oui, je nage bien' },
            { cle: 'peu', he: 'קְצָת', tr: 'ktsat', fr: 'Un peu' },
            { cle: 'non', he: 'לֹא, אֲנִי מְפַחֶדֶת מֵהַמַּיִם', tr: 'lo, ani mefakhédet mehamayim', fr: 'Non, j’ai peur de l’eau' } ] },
          { he: 'מָה אַתְּ אוֹהֶבֶת לַעֲשׂוֹת בַּיָּם?', tr: 'ma at ohévet laassot bayam ?', fr: 'Qu’est-ce que tu aimes faire à la mer ?', options: [
            { cle: 'soleil', he: 'לָשֶׁבֶת בַּשֶּׁמֶשׁ', tr: 'lashévet bashémesh', fr: 'M’asseoir au soleil' },
            { cle: 'lire', he: 'לִקְרֹא סֵפֶר', tr: 'likro séfer', fr: 'Lire un livre' },
            { cle: 'nager', he: 'לִשְׂחוֹת', tr: 'liskhot', fr: 'Nager' } ] },
        ] },
    ] },

  { id: 'esther', nom: 'Savta Esther', em: '👵🏽', desc: 'la grand-mère de Noa, à Be’er Sheva', ville: 'בְּאֵר שֶׁבַע', couleur: '#c4733a',
    formules: {
      salut: { he: 'סָבְתָא אֶסְתֵּר הַיְּקָרָה,', tr: 'savta Ester hayekara,', fr: 'Chère Savta Esther,' },
      bises: { he: 'נְשִׁיקוֹת!', tr: 'neshikot !', fr: 'Bisous !' },
      signature: { he: 'בְּאַהֲבָה, סָבְתָא אֶסְתֵּר', tr: 'beahava, savta Ester', fr: 'Avec amour, Savta Esther' } },
    lettres: [
      { num: 1, titre: 'Une lettre de grand-mère', ouverture: {},
        phrases: [
          { he: 'שָׁלוֹם, יַלְדָּה יְקָרָה.', tr: 'shalom, yalda yekara.', fr: 'Bonjour, chère enfant.' },
          { he: 'אֲנִי אֶסְתֵּר, הַסָּבְתָא שֶׁל נוֹעָה.', tr: 'ani Ester, hasavta shel Noa.', fr: 'Je suis Esther, la grand-mère de Noa.' },
          { he: 'אֲנִי גָּרָה בִּבְאֵר שֶׁבַע, בַּנֶּגֶב.', tr: 'ani gara biVeer Sheva, baNeguev.', fr: 'J’habite à Be’er Sheva, dans le Néguev.' },
          { he: 'כְּשֶׁהָיִיתִי צְעִירָה, בָּאתִי לְיִשְׂרָאֵל מִמָּרוֹקוֹ.', tr: 'kshehayiti tseïra, bati leIsrael miMaroko.', fr: 'Quand j’étais jeune, je suis venue du Maroc en Israël.' },
        ],
        questions: [
          { he: 'מֵאֵיפֹה הַמִּשְׁפָּחָה שֶׁלָּךְ?', tr: 'meeifo hamishpakha shelakh ?', fr: 'D’où vient ta famille ?', options: [
            { cle: 'france', he: 'מִצָּרְפַת', tr: 'miTsarfat', fr: 'De France' },
            { cle: 'loin', he: 'מִמְּדִינָה רְחוֹקָה', tr: 'mimedina rekhoka', fr: 'D’un pays lointain' },
            { cle: 'partout', he: 'מִכָּל מִינֵי מְקוֹמוֹת', tr: 'mikol minei mekomot', fr: 'De toutes sortes d’endroits' } ] },
          { he: 'אַתְּ אוֹהֶבֶת לְבַשֵּׁל?', tr: 'at ohévet levashel ?', fr: 'Tu aimes cuisiner ?', options: [
            { cle: 'oui', he: 'כֵּן, מְאוֹד', tr: 'kèn, meod', fr: 'Oui, beaucoup' },
            { cle: 'simple', he: 'רַק דְּבָרִים פְּשׁוּטִים', tr: 'rak dvarim pshoutim', fr: 'Seulement des choses simples' },
            { cle: 'manger', he: 'לֹא, אֲבָל אֲנִי אוֹהֶבֶת לֶאֱכֹל!', tr: 'lo, aval ani ohévet leekhol !', fr: 'Non, mais j’aime manger !' } ] },
        ] },
      { num: 2, titre: 'Le repas du vendredi', ouverture: {
          france: { he: 'מִצָּרְפַת? גַּם אֲנִי מְדַבֶּרֶת צָרְפָתִית, מֵהַיַּלְדוּת בְּמָרוֹקוֹ!', tr: 'miTsarfat ? gam ani medabéret tsarfatit, mehayaldout beMaroko !', fr: 'De France ? Moi aussi, je parle français, depuis mon enfance au Maroc !' },
          loin: { he: 'גַּם הַמִּשְׁפָּחָה שֶׁלִּי בָּאָה מֵרָחוֹק.', tr: 'gam hamishpakha sheli baa merakhok.', fr: 'Ma famille aussi est venue de loin.' },
          partout: { he: 'כְּמוֹ בְּיִשְׂרָאֵל! פֹּה כֻּלָּם בָּאוּ מִכָּל הָעוֹלָם.', tr: 'kmo beIsrael ! po koulam baou mikol haolam.', fr: 'Comme en Israël ! Ici, tout le monde est venu du monde entier.' } },
        phrases: [
          { he: 'שָׁלוֹם, מֹתֶק!', tr: 'shalom, motek !', fr: 'Bonjour, ma chérie !' },
          { he: 'כָּל יוֹם שִׁשִּׁי אֲנִי מְבַשֶּׁלֶת לְכָל הַמִּשְׁפָּחָה.', tr: 'kol yom shishi ani mevashélet lekhol hamishpakha.', fr: 'Chaque vendredi, je cuisine pour toute la famille.' },
          { he: 'הַנְּכָדִים שֶׁלִּי בָּאִים, וְהַבַּיִת מָלֵא רַעַשׁ וְשִׂמְחָה.', tr: 'hanekhadim sheli baïm, vehabayit malé raash vesimkha.', fr: 'Mes petits-enfants viennent, et la maison est pleine de bruit et de joie.' },
        ],
        questions: [
          { he: 'מָה אוֹכְלִים אֶצְלְכֶם בַּחַגִּים?', tr: 'ma okhlim etslekhem bakhaguim ?', fr: 'Qu’est-ce qu’on mange chez vous pour les fêtes ?', options: [
            { cle: 'gateau', he: 'עוּגָה גְּדוֹלָה', tr: 'ouga gdola', fr: 'Un grand gâteau' },
            { cle: 'poulet', he: 'עוֹף בַּתַּנּוּר', tr: 'of batanour', fr: 'Du poulet au four' },
            { cle: 'fromage', he: 'הַרְבֵּה גְּבִינוֹת', tr: 'harbé gvinot', fr: 'Beaucoup de fromages' } ] },
          { he: 'מִי מְבַשֵּׁל אֶצְלְכֶם?', tr: 'mi mevashel etslekhem ?', fr: 'Qui cuisine chez vous ?', options: [
            { cle: 'moi', he: 'אֲנִי', tr: 'ani', fr: 'Moi' },
            { cle: 'maman', he: 'אִמָּא שֶׁלִּי', tr: 'ima sheli', fr: 'Ma mère' },
            { cle: 'tous', he: 'כֻּלָּם בְּיַחַד', tr: 'koulam beyakhad', fr: 'Tout le monde ensemble' } ] },
        ] },
      { num: 3, titre: 'Ce qui compte', ouverture: {
          gateau: { he: 'עוּגָה? אֲנִי שׁוֹלַחַת לָךְ אֶת הַמַּתְכּוֹן שֶׁלִּי!', tr: 'ouga ? ani sholakhat lakh et hamatkon sheli !', fr: 'Un gâteau ? Je t’envoie ma recette !' },
          poulet: { he: 'עוֹף בַּתַּנּוּר, כְּמוֹ אֶצְלִי!', tr: 'of batanour, kmo etsli !', fr: 'Du poulet au four, comme chez moi !' },
          fromage: { he: 'גְּבִינוֹת? אֵין כְּמוֹ הַגְּבִינוֹת שֶׁל צָרְפַת!', tr: 'gvinot ? ein kmo hagvinot shel Tsarfat !', fr: 'Des fromages ? Rien ne vaut les fromages de France !' } },
        phrases: [
          { he: 'יַלְדָּה יְקָרָה,', tr: 'yalda yekara,', fr: 'Chère enfant,' },
          { he: 'אֲנִי כְּבָר בַּת שְׁמוֹנִים, וְלָמַדְתִּי דָּבָר אֶחָד.', tr: 'ani kvar bat shmonim, velamadti davar ekhad.', fr: 'J’ai déjà quatre-vingts ans, et j’ai appris une chose.' },
          { he: 'הַדָּבָר הֲכִי חָשׁוּב בַּחַיִּים זֶה הָאֲנָשִׁים שֶׁאַתְּ אוֹהֶבֶת.', tr: 'hadavar hakhi khashouv bakhaïm zé haanashim sheat ohévet.', fr: 'La chose la plus importante dans la vie, ce sont les gens que tu aimes.' },
        ],
        questions: [
          { he: 'מָה הֲכִי חָשׁוּב לָךְ?', tr: 'ma hakhi khashouv lakh ?', fr: 'Qu’est-ce qui compte le plus pour toi ?', options: [
            { cle: 'famille', he: 'הַמִּשְׁפָּחָה', tr: 'hamishpakha', fr: 'La famille' },
            { cle: 'sante', he: 'הַבְּרִיאוּת', tr: 'habriout', fr: 'La santé' },
            { cle: 'liberte', he: 'הַחֹפֶשׁ', tr: 'hakhofesh', fr: 'La liberté' } ] },
          { he: 'תִּכְתְּבִי לִי שׁוּב?', tr: 'tikhtevi li shouv ?', fr: 'Tu m’écriras encore ?', options: [
            { cle: 'oui', he: 'כֵּן, בָּטוּחַ', tr: 'kèn, batouakh', fr: 'Oui, bien sûr' },
            { cle: 'souvent', he: 'כָּל שָׁבוּעַ', tr: 'kol shavoua', fr: 'Chaque semaine' },
            { cle: 'visite', he: 'וַאֲנִי אָבוֹא לְבַקֵּר!', tr: 'vaani avo levaker !', fr: 'Et je viendrai te rendre visite !' } ] },
        ] },
    ] },

  { id: 'omer', nom: 'Omer', em: '🧔🏽', desc: 'guide dans le désert, à Eilat', ville: 'אֵילַת', couleur: '#d08a3a',
    formules: {
      salut: { he: 'שָׁלוֹם עוֹמֶר,', tr: 'shalom Omer,', fr: 'Bonjour Omer,' },
      bises: { he: 'לְהִתְרָאוֹת!', tr: 'lehitraot !', fr: 'À bientôt !' },
      signature: { he: 'לְהִתְרָאוֹת, עוֹמֶר', tr: 'lehitraot, Omer', fr: 'À bientôt, Omer' } },
    lettres: [
      { num: 1, titre: 'Des nouvelles du désert', ouverture: {},
        phrases: [
          { he: 'שָׁלוֹם מֵאֵילַת!', tr: 'shalom meEilat !', fr: 'Bonjour d’Eilat !' },
          { he: 'אֲנִי עוֹמֶר, וַאֲנִי מַדְרִיךְ טִיּוּלִים בַּמִּדְבָּר.', tr: 'ani Omer, vaani madrikh tiyoulim bamidbar.', fr: 'Je suis Omer, et je suis guide de randonnée dans le désert.' },
          { he: 'נוֹעָה הִיא חֲבֵרָה שֶׁלִּי מֵהַצָּבָא.', tr: 'Noa hi khavera sheli mehatsava.', fr: 'Noa est une amie de l’armée.' },
          { he: 'פֹּה חַם מְאוֹד, גַּם בַּחֹרֶף!', tr: 'po kham meod, gam bakhoref !', fr: 'Ici, il fait très chaud, même en hiver !' },
        ],
        questions: [
          { he: 'אַתְּ אוֹהֶבֶת חֹם אוֹ קֹר?', tr: 'at ohévet khom o kor ?', fr: 'Tu aimes la chaleur ou le froid ?', options: [
            { cle: 'chaud', he: 'אֲנִי אוֹהֶבֶת חֹם', tr: 'ani ohévet khom', fr: 'J’aime la chaleur' },
            { cle: 'froid', he: 'אֲנִי מַעֲדִיפָה קֹר', tr: 'ani maadifa kor', fr: 'Je préfère le froid' },
            { cle: 'entre', he: 'מַשֶּׁהוּ בָּאֶמְצַע', tr: 'mashéhou baemtsa', fr: 'Entre les deux' } ] },
          { he: 'עָשִׂית פַּעַם טִיּוּל בַּמִּדְבָּר?', tr: 'assit paam tiyoul bamidbar ?', fr: 'Tu as déjà fait une randonnée dans le désert ?', options: [
            { cle: 'oui', he: 'כֵּן, וְזֶה הָיָה מַדְהִים', tr: 'kèn, vezé haya madhim', fr: 'Oui, et c’était incroyable' },
            { cle: 'non', he: 'עוֹד לֹא', tr: 'od lo', fr: 'Pas encore' },
            { cle: 'peur', he: 'לֹא, אֲנִי מְפַחֶדֶת מֵעַקְרָבִים', tr: 'lo, ani mefakhédet meakravim', fr: 'Non, j’ai peur des scorpions' } ] },
        ] },
      { num: 2, titre: 'Une nuit sous les étoiles', ouverture: {
          chaud: { he: 'אָז אֵילַת זֶה הַמָּקוֹם בִּשְׁבִילֵךְ!', tr: 'az Eilat zé hamakom bishvilekh !', fr: 'Alors Eilat, c’est l’endroit qu’il te faut !' },
          froid: { he: 'קֹר? בַּמִּדְבָּר, בַּלַּיְלָה, דַּוְקָא קַר מְאוֹד!', tr: 'kor ? bamidbar, balayla, davka kar meod !', fr: 'Le froid ? Dans le désert, la nuit, il fait justement très froid !' },
          entre: { he: 'בָּאָבִיב, מֶזֶג הָאֲוִיר פֹּה מֻשְׁלָם.', tr: 'baaviv, mézeg haavir po moushlam.', fr: 'Au printemps, le temps est parfait ici.' } },
        phrases: [
          { he: 'שָׁלוֹם שׁוּב!', tr: 'shalom shouv !', fr: 'Re-bonjour !' },
          { he: 'אֶתְמוֹל יָשַׁנּוּ בַּמִּדְבָּר, מִתַּחַת לַכּוֹכָבִים.', tr: 'etmol yashanou bamidbar, mitakhat lakokhavim.', fr: 'Hier, on a dormi dans le désert, sous les étoiles.' },
          { he: 'הָיָה שָׁקֵט מְאוֹד, וְרָאִינוּ אֶלֶף כּוֹכָבִים.', tr: 'haya shaket meod, veraïnou élef kokhavim.', fr: 'C’était très calme, et on a vu mille étoiles.' },
        ],
        questions: [
          { he: 'אַתְּ יְכוֹלָה לִישֹׁן בְּאֹהֶל?', tr: 'at yekhola lishon beohel ?', fr: 'Tu peux dormir sous une tente ?', options: [
            { cle: 'oui', he: 'כֵּן, בְּלִי בְּעָיָה', tr: 'kèn, bli beaya', fr: 'Oui, sans problème' },
            { cle: 'hotel', he: 'אֲנִי מַעֲדִיפָה מָלוֹן', tr: 'ani maadifa malon', fr: 'Je préfère l’hôtel' },
            { cle: 'peut', he: 'אוּלַי, לַיְלָה אֶחָד', tr: 'oulaï, layla ekhad', fr: 'Peut-être, une nuit' } ] },
          { he: 'מָה אַתְּ רוֹצָה לִרְאוֹת בְּיִשְׂרָאֵל?', tr: 'ma at rotsa lirot beIsrael ?', fr: 'Qu’est-ce que tu veux voir en Israël ?', options: [
            { cle: 'desert', he: 'אֶת הַמִּדְבָּר', tr: 'et hamidbar', fr: 'Le désert' },
            { cle: 'jerusalem', he: 'אֶת יְרוּשָׁלַיִם', tr: 'et Yroushalayim', fr: 'Jérusalem' },
            { cle: 'tout', he: 'אֶת כָּל הָאָרֶץ', tr: 'et kol haarets', fr: 'Tout le pays' } ] },
        ] },
      { num: 3, titre: 'Sous la mer', ouverture: {
          oui: { he: 'יֹפִי! אָז בַּפַּעַם הַבָּאָה נִישַׁן בַּמִּדְבָּר יַחַד.', tr: 'yofi ! az bapaam haba nishan bamidbar yakhad.', fr: 'Super ! Alors la prochaine fois, on dormira ensemble dans le désert.' },
          hotel: { he: 'אֵין בְּעָיָה, יֵשׁ פֹּה הַרְבֵּה מְלוֹנוֹת יָפִים.', tr: 'ein beaya, yesh po harbé melonot yafim.', fr: 'Pas de problème, il y a beaucoup de beaux hôtels ici.' },
          peut: { he: 'לַיְלָה אֶחָד זֶה מַסְפִּיק כְּדֵי לִרְאוֹת אֶת הַכּוֹכָבִים.', tr: 'layla ekhad zé maspik kedei lirot et hakokhavim.', fr: 'Une nuit, ça suffit pour voir les étoiles.' } },
        phrases: [
          { he: 'שָׁלוֹם חֲבֵרָה!', tr: 'shalom khavera !', fr: 'Salut mon amie !' },
          { he: 'הַיּוֹם לֹא הָיִיתִי בַּמִּדְבָּר, אֶלָּא בַּיָּם.', tr: 'hayom lo hayiti bamidbar, ela bayam.', fr: 'Aujourd’hui, je n’étais pas dans le désert, mais dans la mer.' },
          { he: 'צָלַלְתִּי וְרָאִיתִי דָּגִים צִבְעוֹנִיִּים וְאַלְמֻגִּים.', tr: 'tsalalti veraïti daguim tsivoniyim vealmouguim.', fr: 'J’ai plongé, et j’ai vu des poissons de toutes les couleurs et des coraux.' },
        ],
        questions: [
          { he: 'אַתְּ רוֹצָה לְנַסּוֹת לִצְלֹל?', tr: 'at rotsa lenasot litslol ?', fr: 'Tu veux essayer de plonger ?', options: [
            { cle: 'oui', he: 'כֵּן, מְאוֹד!', tr: 'kèn, meod !', fr: 'Oui, très envie !' },
            { cle: 'peur', he: 'אֲנִי קְצָת מְפַחֶדֶת', tr: 'ani ktsat mefakhédet', fr: 'J’ai un peu peur' },
            { cle: 'regarder', he: 'אֲנִי מַעֲדִיפָה לְהִסְתַּכֵּל מֵהַחוֹף', tr: 'ani maadifa lehistakel mehakhof', fr: 'Je préfère regarder depuis la plage' } ] },
          { he: 'מָתַי תָּבוֹאִי לְאֵילַת?', tr: 'matai tavoï leEilat ?', fr: 'Quand viendras-tu à Eilat ?', options: [
            { cle: 'ete', he: 'בַּקַּיִץ', tr: 'bakayits', fr: 'En été' },
            { cle: 'hiver', he: 'בַּחֹרֶף, כְּשֶׁקַּר אֶצְלִי', tr: 'bakhoref, kshekar etsli', fr: 'En hiver, quand il fait froid chez moi' },
            { cle: 'bientot', he: 'בְּקָרוֹב, אֲנִי מְקַוָּה', tr: 'bekarov, ani mekava', fr: 'Bientôt, j’espère' } ] },
        ] },
    ] },
];
// Le sens des mots de ces lettres (quand on les touche)
window.GLOSES_HEBDO = Object.assign(window.GLOSES_HEBDO || {}, {'סִפְּרָה': ["a raconté (elle)", "sipra"], 'יָפָה': ["belle", "yafa"], 'חוּץ': ["dehors ; « חוּץ מִ » : à part", "khouts"], 'תְּמוּנוֹת': ["photos, images", "tmounot"], 'קָנִיתִי': ["j’ai acheté", "kaniti"], 'מְנַגֶּנֶת': ["joue (d’un instrument), femme", "menaguénet"], 'קוֹנָה': ["achète (femme)", "kona"], 'אָהוּב': ["aimé, préféré", "ahouv"], 'עוּגַת': ["gâteau de… (« עוּגַת שׁוֹקוֹלָד » : gâteau au chocolat)", "ougat"], 'שְׁקֵטָה': ["calme (féminin)", "shketa"], 'אוֹטוֹבּוּסִים': ["bus (pluriel)", "otobousim"], 'נָחָה': ["se repose (femme)", "nakha"], 'פּוֹגֶשֶׁת': ["rencontre, voit (femme)", "poguéshet"], 'מְטַיֶּלֶת': ["se promène (femme)", "metayélet"], 'מַבְטִיחָה': ["promets (femme)", "mavtikha"], 'חַיָּה': ["animal", "khaya"], 'אָרֹךְ': ["long", "arokh"], 'שִׂחַקְתִּי': ["j’ai joué", "sikhakti"], 'חֲתוּלִים': ["chats", "khatoulim"], 'אָהַבְתְּ': ["tu aimais, tu as aimé (femme)", "ahavt"], 'שָׂפוֹת': ["langues", "safot"], 'דִּבַּרְתִּי': ["j’ai parlé", "dibarti"], 'בָּנִיתִי': ["j’ai construit", "baniti"], 'הָרַס': ["a détruit", "haras"], 'תְּלַמְּדִי': ["tu enseigneras (à une femme)", "telamdi"], 'שׂוֹחָה': ["nage (femme)", "sokha"], 'אֶסְתֵּר': ["Esther (prénom)", "Ester"], 'יְקָרָה': ["chère", "yekara"], 'בְּאֵר': ["puits (« בְּאֵר שֶׁבַע » : Be’er Sheva)", "beer"], 'בָּאתִי': ["je suis venu(e)", "bati"], 'מָרוֹקוֹ': ["le Maroc", "Maroko"], 'מִינֵי': ["sortes de (« כָּל מִינֵי » : toutes sortes de)", "minei"], 'מְקוֹמוֹת': ["endroits", "mekomot"], 'פְּשׁוּטִים': ["simples", "pshoutim"], 'מְבַשֶּׁלֶת': ["cuisine (femme)", "mevashélet"], 'נְכָדִים': ["petits-enfants", "nekhadim"], 'יַלְדוּת': ["enfance", "yaldout"], 'עוֹלָם': ["monde", "olam"], 'אֶצְלְכֶם': ["chez vous", "etslekhem"], 'חַגִּים': ["fêtes", "khaguim"], 'גְּבִינוֹת': ["fromages", "gvinot"], 'מְבַשֵּׁל': ["cuisine (homme)", "mevashel"], 'לָמַדְתִּי': ["j’ai appris", "lamadti"], 'שׁוֹלַחַת': ["envoie (femme)", "sholakhat"], 'תִּכְתְּבִי': ["tu écriras (à une femme)", "tikhtevi"], 'עוֹמֶר': ["Omer (prénom)", "Omer"], 'טִיּוּלִים': ["randonnées, excursions", "tiyoulim"], 'קֹר': ["le froid", "kor"], 'עָשִׂית': ["tu as fait (femme)", "assit"], 'עַקְרָבִים': ["scorpions", "akravim"], 'יָשַׁנּוּ': ["nous avons dormi", "yashanou"], 'רָאִינוּ': ["nous avons vu", "raïnou"], 'מֶזֶג': ["« מֶזֶג אֲוִיר » : la météo", "mézeg"], 'הָיִיתִי': ["j’étais", "hayiti"], 'צָלַלְתִּי': ["j’ai plongé", "tsalalti"], 'צִבְעוֹנִיִּים': ["colorés", "tsivoniyim"], 'נִישַׁן': ["nous dormirons", "nishan"], 'מְלוֹנוֹת': ["hôtels", "melonot"], 'מְקַוָּה': ["espère (femme)", "mekava"]});
