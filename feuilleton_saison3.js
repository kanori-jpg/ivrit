'use strict';
/* Le feuilleton, saison 3 : « La recette perdue » (épisodes 17 à 24, un par semaine après la saison 2).
   Tamar, la boulangère, cherche la recette de la hallah de sa grand-mère Hanna, de Jaffa jusqu'à Akko. */
Object.assign(FEUILLETON_PERSOS, {
  rachel: { nom: 'Rachel', em: '👵🏽', desc: 'la mère de Shimon, à Akko' },
});
FEUILLETON.push(
  { num: 17, saison: 3, titre: 'La recette de grand-mère', em: '🍞', lieu: 'La boulangerie de Tamar', lignes: [
    { qui: 'tamar', he: 'שָׁלוֹם, בָּנוֹת! בּוֹאוּ, יֵשׁ לִי בְּעָיָה גְּדוֹלָה.', tr: 'shalom, banot ! boou, yesh li beaya gdola.', fr: 'Bonjour les filles ! Venez, j’ai un gros problème.', rep: { he: 'מָה קָרָה, תָּמָר?', tr: 'ma kara, Tamar ?', fr: 'Qu’est-ce qui s’est passé, Tamar ?' } },
    { qui: 'tamar', he: 'בְּעוֹד שָׁבוּעַ יֵשׁ תַּחֲרוּת שֶׁל חַלּוֹת בָּעִיר.', tr: 'beod shavoua yesh takharout shel khalot bair.', fr: 'Dans une semaine, il y a un concours de hallot en ville.', rep: { he: 'זֶה נִשְׁמָע כֵּיף!', tr: 'zé nishma kef !', fr: 'Ça a l’air sympa !' } },
    { qui: 'tamar', he: 'אֲנִי רוֹצָה לֶאֱפוֹת אֶת הַחַלָּה שֶׁל סָבְתָא שֶׁלִּי.', tr: 'ani rotsa leefot et hakhala shel savta sheli.', fr: 'Je veux faire la hallah de ma grand-mère.', rep: { he: 'הִיא הָיְתָה טְעִימָה?', tr: 'hi hayta teïma ?', fr: 'Elle était bonne ?' } },
    { qui: 'tamar', he: 'הֲכִי טְעִימָה בָּעוֹלָם! אֲבָל הַמַּתְכּוֹן נֶעְלַם.', tr: 'hakhi teïma baolam ! aval hamatkon nelam.', fr: 'La meilleure du monde ! Mais la recette a disparu.', rep: { he: 'אוֹי, אֵיפֹה הוּא הָיָה?', tr: 'oy, eifo hou haya ?', fr: 'Oh, où était-elle ?' } },
    { qui: 'tamar', he: 'בְּמַחְבֶּרֶת יְשָׁנָה. כְּשֶׁעָבַרְנוּ דִּירָה, אִמָּא שֶׁלִּי מָכְרָה הַרְבֵּה דְּבָרִים יְשָׁנִים בַּשּׁוּק בְּיָפוֹ.', tr: 'bemakhbéret yeshana. ksheavarnou dira, ima sheli makhra harbé dvarim yeshanim bashouk beYafo.', fr: 'Dans un vieux cahier. Quand nous avons déménagé, ma mère a vendu beaucoup de vieilles choses au marché de Jaffa.', rep: { he: 'אוּלַי הַמַּחְבֶּרֶת עוֹד שָׁם!', tr: 'oulaï hamakhbéret od sham !', fr: 'Le cahier y est peut-être encore !' } },
    { qui: 'shira', he: 'מָחָר בַּבֹּקֶר נֵלֵךְ לַשּׁוּק וּנְחַפֵּשׂ אוֹתָהּ.', tr: 'makhar baboker nelekh lashouk ounekhapes ota.', fr: 'Demain matin, on ira au marché et on le cherchera.' },
  ], suspense: 'Le lendemain matin, au marché aux puces de Jaffa, le brocanteur vous attend déjà, avec un grand sourire…',
  mots: [['מַתְכּוֹן', 'matkon', 'recette'], ['תַּחֲרוּת', 'takharout', 'concours, compétition'], ['לֶאֱפוֹת', 'leefot', 'cuire au four, faire (du pain, un gâteau)'], ['מַחְבֶּרֶת', 'makhbéret', 'cahier'], ['לְהֵעָלֵם', 'lehealem', 'disparaître']] },

  { num: 18, saison: 3, titre: 'Le cahier de Hanna', em: '📒', lieu: 'Le marché aux puces de Jaffa', lignes: [
    { qui: 'mokher', he: 'בֹּקֶר טוֹב, בָּנוֹת! שׁוּב אַתֶּן מְחַפְּשׂוֹת מִכְתָּבִים יְשָׁנִים?', tr: 'boker tov, banot ! shouv aten mekhapsot mikhtavim yeshanim ?', fr: 'Bonjour les filles ! Vous cherchez encore de vieilles lettres ?', rep: { he: 'לֹא, הַפַּעַם אֲנַחְנוּ מְחַפְּשׂוֹת מַחְבֶּרֶת', tr: 'lo, hapaam anakhnou mekhapsot makhbéret', fr: 'Non, cette fois nous cherchons un cahier' } },
    { qui: 'mokher', he: 'מַחְבֶּרֶת? יֵשׁ לִי אַרְגָּז מָלֵא מַחְבָּרוֹת.', tr: 'makhbéret ? yesh li argaz malé makhbarot.', fr: 'Un cahier ? J’ai une caisse pleine de cahiers.', rep: { he: 'זֹאת מַחְבֶּרֶת שֶׁל מַתְכּוֹנִים', tr: 'zot makhbéret shel matkonim', fr: 'C’est un cahier de recettes' } },
    { qui: 'mokher', he: 'רֶגַע... הִנֵּה! "הַמַּתְכּוֹנִים שֶׁל חַנָּה".', tr: 'réga… hiné ! « hamatkonim shel Khana ».', fr: 'Attendez… voilà ! « Les recettes de Hanna ».', rep: { he: 'חַנָּה הִיא הַסָּבְתָא שֶׁל תָּמָר!', tr: 'Khana hi hasavta shel Tamar !', fr: 'Hanna, c’est la grand-mère de Tamar !' } },
    { qui: 'mokher', he: 'אֲבָל תִּרְאוּ: חֲסֵרִים דַּפִּים. מִישֶׁהוּ קָרַע אוֹתָם.', tr: 'aval tirou : khaserim dapim. mishéhou kara otam.', fr: 'Mais regardez : il manque des pages. Quelqu’un les a arrachées.', rep: { he: 'וְהַמַּתְכּוֹן שֶׁל הַחַלָּה?', tr: 'vehamatkon shel hakhala ?', fr: 'Et la recette de la hallah ?' } },
    { qui: 'mokher', he: 'הוּא לֹא פֹּה. אֲבָל יֵשׁ פֶּתֶק בְּסוֹף הַמַּחְבֶּרֶת.', tr: 'hou lo po. aval yesh petek besof hamakhbéret.', fr: 'Elle n’est pas là. Mais il y a un petit mot à la fin du cahier.', rep: { he: 'מָה כָּתוּב בּוֹ?', tr: 'ma katouv bo ?', fr: 'Qu’est-ce qui est écrit dessus ?' } },
    { qui: 'shira', he: '"אֶת הַסּוֹד שֶׁל הַחַלָּה נָתַתִּי לַסִּפְרִיָּה."', tr: '« et hasod shel hakhala natati lasifriya. »', fr: '« Le secret de la hallah, je l’ai donné à la bibliothèque. »' },
  ], suspense: 'Un secret donné à une bibliothèque ? Il n’y a qu’une personne pour vous aider : Dalia, aux archives.',
  mots: [['אַרְגָּז', 'argaz', 'caisse'], ['דַּף', 'daf', 'page, feuille'], ['חָסֵר', 'khaser', 'qui manque'], ['לִקְרֹעַ', 'likroa', 'déchirer, arracher'], ['סוֹד', 'sod', 'secret']] },

  { num: 19, saison: 3, titre: 'Le livre de cuisine', em: '📚', lieu: 'Les archives de la bibliothèque', lignes: [
    { qui: 'dalia', he: 'שׁוּב אַתֶּן! מָה הַסִּפּוּר הַפַּעַם?', tr: 'shouv aten ! ma hasipour hapaam ?', fr: 'Encore vous ! Quelle est l’histoire, cette fois ?', rep: { he: 'אֲנַחְנוּ מְחַפְּשׂוֹת מַתְכּוֹן שֶׁל חַלָּה', tr: 'anakhnou mekhapsot matkon shel khala', fr: 'Nous cherchons une recette de hallah' } },
    { qui: 'dalia', he: 'מַתְכּוֹן? בַּסִּפְרִיָּה? זֶה מוּזָר...', tr: 'matkon ? basifriya ? zé mouzar…', fr: 'Une recette ? À la bibliothèque ? C’est bizarre…', rep: { he: 'חַנָּה כָּתְבָה שֶׁהִיא נָתְנָה אוֹתוֹ לַסִּפְרִיָּה', tr: 'Khana katva shehi natna oto lasifriya', fr: 'Hanna a écrit qu’elle l’avait donnée à la bibliothèque' } },
    { qui: 'dalia', he: 'חַנָּה? חַנָּה הָאוֹפָה? הִיא בָּאָה לְכָאן כָּל יוֹם שִׁשִּׁי עִם עוּגָה!', tr: 'Khana ? Khana haofa ? hi baa lekhan kol yom shishi im ouga !', fr: 'Hanna ? Hanna la boulangère ? Elle venait ici tous les vendredis avec un gâteau !', rep: { he: 'אַתְּ זוֹכֶרֶת אוֹתָהּ?', tr: 'at zokhéret ota ?', fr: 'Tu te souviens d’elle ?' } },
    { qui: 'dalia', he: 'כַּמּוּבָן. הִיא נָתְנָה לָנוּ סֵפֶר בִּשּׁוּל יָשָׁן.', tr: 'kamouvan. hi natna lanou séfer bishoul yashan.', fr: 'Bien sûr. Elle nous a donné un vieux livre de cuisine.', rep: { he: 'אֶפְשָׁר לִרְאוֹת אוֹתוֹ?', tr: 'efshar lirot oto ?', fr: 'On peut le voir ?' } },
    { qui: 'dalia', he: 'הִנֵּה הוּא. וּבְתוֹכוֹ... דַּף מֵהַמַּחְבֶּרֶת!', tr: 'hiné hou. ouvtokho… daf mehamakhbéret !', fr: 'Le voici. Et dedans… une page du cahier !', rep: { he: '"קֶמַח, מַיִם, שְׁמָרִים, סֻכָּר..."', tr: '« kémakh, mayim, shmarim, soukar… »', fr: '« Farine, eau, levure, sucre… »' } },
    { qui: 'dalia', he: 'אֲבָל הַסּוֹף חָסֵר. כָּתוּב רַק: "וְהַסּוֹד בְּעַכּוֹ".', tr: 'aval hasof khaser. katouv rak : « vehasod beAko ».', fr: 'Mais la fin manque. Il est seulement écrit : « Et le secret est à Akko ».' },
  ], suspense: 'Akko ? Shira sourit : « Shimon, le pêcheur, connaît tout le monde là-bas. On prend le train demain ! »',
  mots: [['מוּזָר', 'mouzar', 'bizarre'], ['קֶמַח', 'kémakh', 'farine'], ['שְׁמָרִים', 'shmarim', 'levure'], ['סֻכָּר', 'soukar', 'sucre'], ['בִּשּׁוּל', 'bishoul', 'cuisine (le fait de cuisiner)']] },

  { num: 20, saison: 3, titre: 'Le train pour Akko', em: '🚆', lieu: 'Dans le train, le long de la mer', lignes: [
    { qui: 'tamar', he: 'תּוֹדָה שֶׁאַתֶּן בָּאוֹת אִתִּי.', tr: 'toda sheaten baot iti.', fr: 'Merci de venir avec moi.', rep: { he: 'בִּשְׁבִיל מָה יֵשׁ חֲבֵרוֹת?', tr: 'bishvil ma yesh khaverot ?', fr: 'À quoi servent les amies ?' } },
    { qui: 'tamar', he: 'סָבְתָא נוֹלְדָה בְּעַכּוֹ. אֲבָל אֲנִי אַף פַּעַם לֹא הָיִיתִי שָׁם.', tr: 'savta nolda beAko. aval ani af paam lo hayiti sham.', fr: 'Grand-mère est née à Akko. Mais moi, je n’y suis jamais allée.', rep: { he: 'אַף פַּעַם? עַכּוֹ כָּל כָּךְ יָפָה!', tr: 'af paam ? Ako kol kakh yafa !', fr: 'Jamais ? Akko est tellement belle !' } },
    { qui: 'shira', he: 'תִּסְתַּכְּלִי מֵהַחַלּוֹן: הַיָּם!', tr: 'tistakli mehakhalon : hayam !', fr: 'Regarde par la fenêtre : la mer !', rep: { he: 'וְהִנֵּה הַחוֹמוֹת שֶׁל הָעִיר הָעַתִּיקָה', tr: 'vehiné hakhomot shel hair haatika', fr: 'Et voici les remparts de la vieille ville' } },
    { qui: 'tamar', he: 'יֵשׁ לִי תְּמוּנָה שֶׁל סָבְתָא לְיַד מַאֲפִיָּה קְטַנָּה.', tr: 'yesh li tmouna shel savta leyad maafiya ktana.', fr: 'J’ai une photo de grand-mère à côté d’une petite boulangerie.', rep: { he: 'אוּלַי הַמַּאֲפִיָּה עוֹד קַיֶּמֶת', tr: 'oulaï hamaafiya od kayémet', fr: 'La boulangerie existe peut-être encore' } },
    { qui: 'shira', he: 'הָרַכֶּבֶת עוֹצֶרֶת. הִגַּעְנוּ!', tr: 'harakévet otséret. higanou !', fr: 'Le train s’arrête. Nous sommes arrivées !', rep: { he: 'קָדִימָה, לַנָּמָל!', tr: 'kadima, lanamal !', fr: 'En avant, au port !' } },
    { qui: 'tamar', he: 'שִׁמְעוֹן מְחַכֶּה לָנוּ שָׁם.', tr: 'Shimon mekhaké lanou sham.', fr: 'Shimon nous attend là-bas.' },
  ], suspense: 'Au port d’Akko, Shimon répare ses filets. Quand il voit la photo, il ouvre de grands yeux…',
  mots: [['חוֹמָה', 'khoma', 'rempart, muraille'], ['עַתִּיק', 'atik', 'ancien, antique'], ['קַיָּם', 'kayam', 'qui existe'], ['לַעֲצֹר', 'laatsor', 's’arrêter, arrêter'], ['נָמָל', 'namal', 'port']] },

  { num: 21, saison: 3, titre: 'La boulangerie du port', em: '⚓', lieu: 'Le port d’Akko', lignes: [
    { qui: 'shimon', he: 'שָׁלוֹם, חֲבֵרוֹת! מָה מֵבִיא אֶתְכֶן לְעַכּוֹ?', tr: 'shalom, khaverot ! ma mevi etkhen leAko ?', fr: 'Bonjour, les amies ! Qu’est-ce qui vous amène à Akko ?', rep: { he: 'אֲנַחְנוּ מְחַפְּשׂוֹת אֶת הַמַּאֲפִיָּה שֶׁבַּתְּמוּנָה', tr: 'anakhnou mekhapsot et hamaafiya shebatmouna', fr: 'Nous cherchons la boulangerie de la photo' } },
    { qui: 'shimon', he: 'אֲנִי מַכִּיר אֶת הַמָּקוֹם הַזֶּה! זֶה הָיָה הַבַּיִת שֶׁל אַבָּא שֶׁלִּי.', tr: 'ani makir et hamakom hazé ! zé haya habayit shel aba sheli.', fr: 'Je connais cet endroit ! C’était la maison de mon père.', rep: { he: 'בֶּאֱמֶת?', tr: 'beemet ?', fr: 'Vraiment ?' } },
    { qui: 'shimon', he: 'כֵּן. הָאוֹפָה הָיְתָה חֲבֵרָה טוֹבָה שֶׁל אִמָּא שֶׁלִּי. הִיא קָרְאָה לָהּ "חַנָּה הַקְּטַנָּה".', tr: 'kèn. haofa hayta khavera tova shel ima sheli. hi kara la « Khana haktana ».', fr: 'Oui. La boulangère était une bonne amie de ma mère. Elle l’appelait « la petite Hanna ».', rep: { he: 'זֹאת הַסָּבְתָא שֶׁל תָּמָר!', tr: 'zot hasavta shel Tamar !', fr: 'C’est la grand-mère de Tamar !' } },
    { qui: 'shimon', he: 'אִמָּא שֶׁלִּי עוֹד גָּרָה כָּאן. הִיא בַּת תִּשְׁעִים וְהִיא זוֹכֶרֶת הַכֹּל.', tr: 'ima sheli od gara kan. hi bat tishim vehi zokhéret hakol.', fr: 'Ma mère habite encore ici. Elle a quatre-vingt-dix ans et elle se souvient de tout.', rep: { he: 'אֶפְשָׁר לְדַבֵּר אִתָּהּ?', tr: 'efshar ledaber ita ?', fr: 'On peut lui parler ?' } },
    { qui: 'shimon', he: 'בּוֹאוּ. הִיא תִּשְׂמַח לְאוֹרְחִים.', tr: 'boou. hi tismakh leorkhim.', fr: 'Venez. Elle sera contente d’avoir des invités.', rep: { he: 'וְנָבִיא לָהּ פְּרָחִים', tr: 'venavi la prakhim', fr: 'Et on lui apportera des fleurs' } },
    { qui: 'tamar', he: 'אֲנִי כָּל כָּךְ מִתְרַגֶּשֶׁת...', tr: 'ani kol kakh mitragéshet…', fr: 'Je suis tellement émue…' },
  ], suspense: 'La mère de Shimon ouvre une vieille boîte en fer. Dedans, une feuille jaunie, pliée en quatre.',
  mots: [['לְהָבִיא', 'lehavi', 'apporter, amener'], ['אוֹפָה', 'ofa', 'boulangère'], ['אוֹרֵחַ', 'oréakh', 'invité'], ['לְהִתְרַגֵּשׁ', 'lehitragesh', 'être ému(e)'], ['לִזְכֹּר', 'lizkor', 'se souvenir']] },

  { num: 22, saison: 3, titre: 'Le secret de Hanna', em: '🍯', lieu: 'Chez Rachel, la mère de Shimon', lignes: [
    { qui: 'rachel', he: 'חַנָּה הַקְּטַנָּה... כַּמָּה שָׁנִים לֹא שָׁמַעְתִּי אֶת הַשֵּׁם הַזֶּה.', tr: 'Khana haktana… kama shanim lo shamati et hashem hazé.', fr: 'La petite Hanna… Il y a tant d’années que je n’ai pas entendu ce nom.', rep: { he: 'הַנֶּכְדָּה שֶׁלָּהּ פֹּה, עִם הַמַּחְבֶּרֶת', tr: 'hanekhda shela po, im hamakhbéret', fr: 'Sa petite-fille est ici, avec le cahier' } },
    { qui: 'rachel', he: 'הִיא נָתְנָה לִי אֶת הַדַּף הַזֶּה לִפְנֵי שֶׁעָזְבָה אֶת עַכּוֹ.', tr: 'hi natna li et hadaf hazé lifnei sheazva et Ako.', fr: 'Elle m’a donné cette page avant de quitter Akko.', rep: { he: 'מָה כָּתוּב בּוֹ?', tr: 'ma katouv bo ?', fr: 'Qu’est-ce qui est écrit dessus ?' } },
    { qui: 'rachel', he: '"הַסּוֹד: קְצָת דְּבַשׁ, וְהַרְבֵּה סַבְלָנוּת."', tr: '« hasod : ktsat dvash, veharbé savlanout. »', fr: '« Le secret : un peu de miel, et beaucoup de patience. »', rep: { he: 'דְּבַשׁ וְסַבְלָנוּת!', tr: 'dvash vesavlanout !', fr: 'Du miel et de la patience !' } },
    { qui: 'rachel', he: 'הִיא תָּמִיד אָמְרָה: "בָּצֵק צָרִיךְ זְמַן, כְּמוֹ חֲבֵרוּת."', tr: 'hi tamid amra : « batsek tsarikh zman, kmo khaverout. »', fr: 'Elle disait toujours : « La pâte a besoin de temps, comme l’amitié. »', rep: { he: 'זֶה יָפֶה מְאוֹד', tr: 'zé yafé meod', fr: 'C’est très beau' } },
    { qui: 'tamar', he: 'תּוֹדָה רַבָּה. אֲנִי מַבְטִיחָה לֶאֱפוֹת חַלָּה גַּם בִּשְׁבִילֵךְ.', tr: 'toda raba. ani mavtikha leefot khala gam bishvilekh.', fr: 'Merci beaucoup. Je promets de faire une hallah pour vous aussi.', rep: { he: 'וַאֲנַחְנוּ נַעֲזֹר לָךְ!', tr: 'vaanakhnou naazor lakh !', fr: 'Et nous t’aiderons !' } },
    { qui: 'shira', he: 'עַכְשָׁיו צָרִיךְ לַחֲזֹר הַבַּיְתָה, וּמַהֵר!', tr: 'akhshav tsarikh lakhzor habayta, oumaher !', fr: 'Maintenant, il faut rentrer à la maison, et vite !' },
  ], suspense: 'Il reste deux jours avant le concours. Ce soir, la boulangerie de Tamar ne fermera pas…',
  mots: [['נֶכְדָּה', 'nekhda', 'petite-fille'], ['לַעֲזֹב', 'laazov', 'quitter'], ['סַבְלָנוּת', 'savlanout', 'patience'], ['בָּצֵק', 'batsek', 'pâte'], ['חֲבֵרוּת', 'khaverout', 'amitié']] },

  { num: 23, saison: 3, titre: 'La nuit au fournil', em: '🌙', lieu: 'La boulangerie de Tamar, la nuit', lignes: [
    { qui: 'tamar', he: 'מִי רוֹצָה לָלוּשׁ אֶת הַבָּצֵק?', tr: 'mi rotsa lalouch et habatsek ?', fr: 'Qui veut pétrir la pâte ?', rep: { he: 'אֲנִי! מָה צָרִיךְ לַעֲשׂוֹת?', tr: 'ani ! ma tsarikh laasot ?', fr: 'Moi ! Qu’est-ce qu’il faut faire ?' } },
    { qui: 'tamar', he: 'מְעַרְבְּבִים קֶמַח, מַיִם, שְׁמָרִים וּדְבַשׁ.', tr: 'mearbevim kémakh, mayim, shmarim oudvash.', fr: 'On mélange de la farine, de l’eau, de la levure et du miel.', rep: { he: 'כַּמָּה קֶמַח?', tr: 'kama kémakh ?', fr: 'Combien de farine ?' } },
    { qui: 'tamar', he: 'קִילוֹ אֶחָד. עַכְשָׁיו מְחַכִּים שָׁעָה, שֶׁהַבָּצֵק יִגְדַּל.', tr: 'kilo ekhad. akhshav mekhakim shaa, shehabatsek yigdal.', fr: 'Un kilo. Maintenant, on attend une heure que la pâte gonfle.', rep: { he: 'שָׁעָה שְׁלֵמָה?', tr: 'shaa shlema ?', fr: 'Une heure entière ?' } },
    { qui: 'shira', he: '"הַרְבֵּה סַבְלָנוּת", זוֹכְרוֹת?', tr: '« harbé savlanout », zokhrot ?', fr: '« Beaucoup de patience », vous vous souvenez ?', rep: { he: 'נִשְׁתֶּה תֵּה בֵּינְתַיִם', tr: 'nishté té beintayim', fr: 'Buvons un thé en attendant' } },
    { qui: 'tamar', he: 'הַבָּצֵק מוּכָן. עַכְשָׁיו קוֹלְעִים אֶת הַחַלָּה, כְּמוֹ צַמָּה.', tr: 'habatsek moukhan. akhshav kolim et hakhala, kmo tsama.', fr: 'La pâte est prête. Maintenant, on tresse la hallah, comme une natte.', rep: { he: 'וְהַחַלָּה הוֹלֶכֶת לַתַּנּוּר!', tr: 'vehakhala holékhet latanour !', fr: 'Et la hallah va au four !' } },
    { qui: 'tamar', he: 'אֵיזֶה רֵיחַ! זֶה בְּדִיּוּק הָרֵיחַ שֶׁל הַבַּיִת שֶׁל סָבְתָא.', tr: 'eizé réakh ! zé bediyouk haréakh shel habayit shel savta.', fr: 'Quelle odeur ! C’est exactement l’odeur de la maison de grand-mère.' },
  ], suspense: 'À l’aube, trois hallot dorées refroidissent sur la table. Le concours, c’est aujourd’hui !',
  mots: [['לָלוּשׁ', 'lalouch', 'pétrir'], ['לְעַרְבֵּב', 'learbev', 'mélanger'], ['לִקְלֹעַ', 'likloa', 'tresser'], ['צַמָּה', 'tsama', 'tresse, natte'], ['רֵיחַ', 'réakh', 'odeur']] },

  { num: 24, saison: 3, titre: 'Le concours', em: '🏆', lieu: 'La fête du quartier', lignes: [
    { qui: 'cohen', he: 'תָּמָר, כָּל הַשְּׁכוּנָה בָּאָה לְעוֹדֵד אוֹתָךְ!', tr: 'Tamar, kol hashkhouna baa leoded otakh !', fr: 'Tamar, tout le quartier est venu t’encourager !', rep: { he: 'גַּם שִׁמְעוֹן וְאִמָּא שֶׁלּוֹ בָּאוּ מֵעַכּוֹ', tr: 'gam Shimon veima shelo baou meAko', fr: 'Shimon et sa mère sont venus d’Akko, eux aussi' } },
    { qui: 'tamar', he: 'אֲנִי לְחוּצָה. יֵשׁ פֹּה עֶשְׂרִים אוֹפִים!', tr: 'ani lekhoutsa. yesh po esrim ofim !', fr: 'Je suis stressée. Il y a vingt boulangers ici !', rep: { he: 'הַחַלָּה שֶׁלָּךְ הֲכִי יָפָה', tr: 'hakhala shelakh hakhi yafa', fr: 'Ta hallah est la plus belle' } },
    { qui: 'cohen', he: 'הַשּׁוֹפְטִים טוֹעֲמִים... וְהֵם מְחַיְּכִים!', tr: 'hashoftim toamim… vehem mekhaykhim !', fr: 'Les juges goûtent… et ils sourient !', rep: { he: 'זֶה סִימָן טוֹב!', tr: 'zé siman tov !', fr: 'C’est bon signe !' } },
    { qui: 'cohen', he: '"הַפְּרָס הָרִאשׁוֹן... לַמַּאֲפִיָּה שֶׁל תָּמָר!"', tr: '« hapras harishon… lamaafiya shel Tamar ! »', fr: '« Le premier prix… pour la boulangerie de Tamar ! »', rep: { he: 'מַזָּל טוֹב, תָּמָר!', tr: 'mazal tov, Tamar !', fr: 'Félicitations, Tamar !' } },
    { qui: 'tamar', he: 'הַפְּרָס הַזֶּה שֶׁל סָבְתָא חַנָּה. וְשֶׁלָּכֶן.', tr: 'hapras hazé shel savta Khana. veshelakhen.', fr: 'Ce prix est à grand-mère Hanna. Et à vous.', rep: { he: 'וְעַכְשָׁיו כֻּלָּם אוֹכְלִים חַלָּה!', tr: 'veakhshav koulam okhlim khala !', fr: 'Et maintenant, tout le monde mange de la hallah !' } },
    { qui: 'shira', he: 'לְחַיִּים! וּלְהִתְרָאוֹת בַּהַרְפַּתְקָה הַבָּאָה.', tr: 'lekhayim ! oulehitraot baharpatka habaa.', fr: 'Santé ! Et à la prochaine aventure.' },
  ], suspense: 'Le soir même, Tamar accroche au mur la page jaunie de Hanna, dans un cadre doré. — Fin de la saison 3.',
  mots: [['לְעוֹדֵד', 'leoded', 'encourager'], ['לָחוּץ', 'lakhouts', 'stressé'], ['שׁוֹפֵט', 'shofet', 'juge'], ['לִטְעֹם', 'litom', 'goûter'], ['פְּרָס', 'pras', 'prix (récompense)']] },
);
// Le sens des mots de la saison 3 qui ne sont pas encore dans le vocabulaire (quand on les touche)
window.GLOSES_HEBDO = Object.assign(window.GLOSES_HEBDO || {}, {
  'חַלּוֹת': ['hallot (pluriel de hallah)', 'khalot'], 'נִשְׁמָע': ['a l’air, semble ; « זֶה נִשְׁמָע כֵּיף » : ça a l’air sympa', 'nishma'], 'טְעִימָה': ['bonne, savoureuse (féminin)', 'teïma'],
  'נֶעְלַם': ['a disparu', 'nelam'], 'כְּשֶׁעָבַרְנוּ': ['quand nous avons déménagé (« עָבַרְנוּ דִּירָה »)', 'ksheavarnou'], 'מָכְרָה': ['a vendu (elle)', 'makhra'],
  'נֵלֵךְ': ['nous irons', 'nelekh'], 'וּנְחַפֵּשׂ': ['et nous chercherons', 'ounekhapes'], 'מַחְבָּרוֹת': ['cahiers', 'makhbarot'], 'מַתְכּוֹנִים': ['recettes', 'matkonim'],
  'הַמַּתְכּוֹנִים': ['les recettes', 'hamatkonim'], 'חַנָּה': ['Hanna (prénom)', 'Khana'], 'חֲסֵרִים': ['manquent, il manque (pluriel)', 'khaserim'], 'דַּפִּים': ['pages', 'dapim'],
  'קָרַע': ['a déchiré, a arraché', 'kara'], 'נָתַתִּי': ['j’ai donné', 'natati'], 'נָתְנָה': ['a donné (elle)', 'natna'], 'וּבְתוֹכוֹ': ['et dedans, et à l’intérieur', 'ouvtokho'],
  'חֲבֵרוֹת': ['amies', 'khaverot'], 'נוֹלְדָה': ['est née', 'nolda'], 'עַכּוֹ': ['Akko (ville)', 'Ako'], 'קַיֶּמֶת': ['existe (féminin)', 'kayémet'], 'עוֹצֶרֶת': ['s’arrête (féminin)', 'otséret'],
  'אֶתְכֶן': ['vous (complément, féminin pluriel)', 'etkhen'], 'קָרְאָה': ['a appelé, a lu (elle)', 'kara'], 'אִתָּהּ': ['avec elle', 'ita'], 'לְאוֹרְחִים': ['pour des invités', 'leorkhim'],
  'מִתְרַגֶּשֶׁת': ['émue, je suis émue (femme)', 'mitragéshet'], 'שָׁמַעְתִּי': ['j’ai entendu', 'shamati'], 'שֶׁעָזְבָה': ['qu’elle a quitté', 'sheazva'], 'נַעֲזֹר': ['nous aiderons', 'naazor'],
  'מְעַרְבְּבִים': ['on mélange', 'mearbevim'], 'יִגְדַּל': ['grandira, gonflera', 'yigdal'], 'זוֹכְרוֹת': ['vous vous souvenez (femmes)', 'zokhrot'], 'נִשְׁתֶּה': ['nous boirons, buvons', 'nishté'],
  'קוֹלְעִים': ['on tresse', 'kolim'], 'מֵעַכּוֹ': ['d’Akko', 'meAko'], 'לְחוּצָה': ['stressée', 'lekhoutsa'], 'הַשּׁוֹפְטִים': ['les juges', 'hashoftim'], 'טוֹעֲמִים': ['goûtent (pluriel)', 'toamim'],
  'מְחַיְּכִים': ['sourient (pluriel)', 'mekhaykhim'], 'בַּהַרְפַּתְקָה': ['dans l’aventure', 'baharpatka'],
});
