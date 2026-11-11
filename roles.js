'use strict';
/* ============ Les jeux de rôle : tes réponses changent l'histoire ============
   Chaque scène est un petit graphe : une réplique, deux réponses possibles, et plusieurs fins.
   Tu joues une femme (les réponses sont au féminin). S.roles[id] = liste des fins découvertes. */
const ROLES = [
  { id: 'restaurant', titre: 'Au restaurant', he: 'בַּמִּסְעָדָה', em: '🍽️', perso: 'Le serveur', c1: '#e46a92', c2: '#f2a12e',
    intro: 'Tu arrives dans un petit restaurant de Tel-Aviv. Le serveur vient vers toi.',
    debut: 'r1',
    noeuds: {
      r1: { he: 'עֶרֶב טוֹב! שֻׁלְחָן לְכַמָּה?', tr: 'erev tov! shoulkhan lekama?', fr: 'Bonsoir ! Une table pour combien ?',
        choix: [{ he: 'לִשְׁנַיִם, בְּבַקָּשָׁה.', tr: 'lishnayim, bevakasha', fr: 'Pour deux, s’il vous plaît.', suite: 'r2' }, { he: 'רַק לִי. אֲנִי לְבַד.', tr: 'rak li. ani levad', fr: 'Juste pour moi. Je suis seule.', suite: 'r2b' }] },
      r2: { he: 'בְּבַקָּשָׁה, שְׁבוּ. הִנֵּה הַתַּפְרִיט.', tr: 'bevakasha, shvou. hine hatafrit', fr: 'Je vous en prie, asseyez-vous. Voici la carte.',
        choix: [{ he: 'מָה אַתָּה מַמְלִיץ?', tr: 'ma ata mamlits?', fr: 'Qu’est-ce que vous recommandez ?', suite: 'r3' }, { he: 'אֲנַחְנוּ רוֹצִים פִּיצָה.', tr: 'anakhnou rotsim pitsa', fr: 'Nous voulons une pizza.', suite: 'r4' }] },
      r2b: { he: 'אֵין בְּעָיָה. שְׁבִי פֹּה, לְיַד הַחַלּוֹן.', tr: 'ein be’aya. shvi po, leyad hakhalon', fr: 'Pas de problème. Asseyez-vous ici, près de la fenêtre.',
        choix: [{ he: 'מָה אַתָּה מַמְלִיץ?', tr: 'ma ata mamlits?', fr: 'Qu’est-ce que vous recommandez ?', suite: 'r3' }, { he: 'אֲנִי רוֹצָה פִּיצָה.', tr: 'ani rotsa pitsa', fr: 'Je veux une pizza.', suite: 'r4' }] },
      r3: { he: 'הַשַּׁקְשׁוּקָה שֶׁלָּנוּ מְצֻיֶּנֶת!', tr: 'hashakshouka shelanou metsouyenet!', fr: 'Notre chakchouka est excellente !',
        choix: [{ he: 'מְצֻיָּן, אֲנִי אֶקַּח שַׁקְשׁוּקָה.', tr: 'metsouyan, ani ekakh shakshouka', fr: 'Parfait, je vais prendre une chakchouka.', suite: 'r5' }, { he: 'אֲנִי לֹא אוֹהֶבֶת בֵּיצִים…', tr: 'ani lo ohevet beitsim…', fr: 'Je n’aime pas les œufs…', suite: 'r4' }] },
      r4: { he: 'סְלִיחָה, אֵין לָנוּ פִּיצָה. יֵשׁ סָלָט וְדָג.', tr: 'slikha, ein lanou pitsa. yesh salat vedag', fr: 'Désolé, nous n’avons pas de pizza. Il y a de la salade et du poisson.',
        choix: [{ he: 'אָז סָלָט, בְּבַקָּשָׁה.', tr: 'az salat, bevakasha', fr: 'Alors une salade, s’il vous plaît.', suite: 'r5' }, { he: 'אָז אֲנִי הוֹלֶכֶת. שָׁלוֹם!', tr: 'az ani holekhet. shalom!', fr: 'Alors je m’en vais. Au revoir !', suite: 'finPartie' }] },
      r5: { he: 'מַשֶּׁהוּ לִשְׁתּוֹת?', tr: 'mashehou lishtot?', fr: 'Quelque chose à boire ?',
        choix: [{ he: 'מַיִם, בְּבַקָּשָׁה.', tr: 'mayim, bevakasha', fr: 'De l’eau, s’il vous plaît.', suite: 'r6' }, { he: 'כּוֹס יַיִן אָדֹם.', tr: 'kos yayin adom', fr: 'Un verre de vin rouge.', suite: 'r6' }] },
      r6: { he: 'אָז… הָיָה טָעִים?', tr: 'az… haya ta’im?', fr: 'Alors… c’était bon ?',
        choix: [{ he: 'טָעִים מְאוֹד! אֶפְשָׁר חֶשְׁבּוֹן?', tr: 'ta’im me’od! efshar kheshbon?', fr: 'Très bon ! L’addition, s’il vous plaît ?', suite: 'finRepas' }, { he: 'כֵּן! וְאֶפְשָׁר גַּם קִנּוּחַ?', tr: 'ken! ve’efshar gam kinouakh?', fr: 'Oui ! Et je peux avoir un dessert aussi ?', suite: 'finDessert' }] },
      finPartie: { fin: true, em: '🚪', titre: 'Partie le ventre vide', etoiles: 1, fr: 'Tu es repartie sans manger. La prochaine fois, laisse une chance à la salade !' },
      finRepas: { fin: true, em: '🍽️', titre: 'Un bon repas', etoiles: 2, fr: 'Repas commandé, mangé et payé, tout en hébreu. Bravo !' },
      finDessert: { fin: true, em: '🍰', titre: 'Le grand jeu', etoiles: 3, fr: 'Repas et dessert : tu as tout demandé comme une habituée !' },
    } },
  { id: 'medecin', titre: 'Chez le médecin', he: 'אֵצֶל הָרוֹפֵא', em: '🩺', perso: 'Le médecin', c1: '#2f8fb0', c2: '#2fae6b',
    intro: 'Tu ne te sens pas bien. Tu entres dans le cabinet du médecin.',
    debut: 'm1',
    noeuds: {
      m1: { he: 'שָׁלוֹם, מָה קָרָה?', tr: 'shalom, ma kara?', fr: 'Bonjour, qu’est-ce qui vous arrive ?',
        choix: [{ he: 'כּוֹאֵב לִי הָרֹאשׁ.', tr: 'ko’ev li harosh', fr: 'J’ai mal à la tête.', suite: 'm2' }, { he: 'יֵשׁ לִי חֹם וְשִׁעוּל.', tr: 'yesh li khom veshi’oul', fr: 'J’ai de la fièvre et je tousse.', suite: 'm3' }] },
      m2: { he: 'מִמָּתַי?', tr: 'mimatai?', fr: 'Depuis quand ?',
        choix: [{ he: 'מֵאֶתְמוֹל.', tr: 'me’etmol', fr: 'Depuis hier.', suite: 'm4' }, { he: 'כְּבָר שָׁבוּעַ.', tr: 'kvar shavoua', fr: 'Depuis une semaine déjà.', suite: 'm5' }] },
      m3: { he: 'בּוֹאִי נִבְדֹּק. תִּפְתְּחִי אֶת הַפֶּה, בְּבַקָּשָׁה.', tr: 'bo’i nivdok. tiftekhi et hape, bevakasha', fr: 'Voyons ça. Ouvrez la bouche, s’il vous plaît.',
        choix: [{ he: 'אָה…', tr: 'aaah…', fr: 'Aaah…', suite: 'm6' }, { he: 'זֶה חַיָּב?', tr: 'ze khayav?', fr: 'C’est obligatoire ?', suite: 'm6' }] },
      m4: { he: 'שְׁתִי הַרְבֵּה מַיִם וְתָנוּחִי.', tr: 'shti harbe mayim vetanoukhi', fr: 'Buvez beaucoup d’eau et reposez-vous.',
        choix: [{ he: 'תּוֹדָה רַבָּה, דּוֹקְטוֹר!', tr: 'toda raba, doktor!', fr: 'Merci beaucoup, docteur !', suite: 'finMaison' }, { he: 'אֶפְשָׁר אִשּׁוּר מַחֲלָה לָעֲבוֹדָה?', tr: 'efshar ishour makhala la’avoda?', fr: 'Je peux avoir un arrêt maladie pour le travail ?', suite: 'finArret' }] },
      m5: { he: 'שָׁבוּעַ? צָרִיךְ לַעֲשׂוֹת בְּדִיקַת דָּם.', tr: 'shavoua? tsarikh la’asot bdikat dam', fr: 'Une semaine ? Il faut faire une prise de sang.',
        choix: [{ he: 'בְּסֵדֶר. מָתַי?', tr: 'beseder. matai?', fr: 'D’accord. Quand ?', suite: 'finLabo' }, { he: 'אֲנִי מְפַחֶדֶת מִמְּחָטִים…', tr: 'ani mefakhedet mimkhatim…', fr: 'J’ai peur des aiguilles…', suite: 'm7' }] },
      m6: { he: 'זֶה וִירוּס. הִנֵּה מִרְשָׁם לִתְרוּפָה.', tr: 'ze virous. hine mirsham litroufa', fr: 'C’est un virus. Voici une ordonnance pour un médicament.',
        choix: [{ he: 'כַּמָּה פְּעָמִים בְּיוֹם?', tr: 'kama pe’amim beyom?', fr: 'Combien de fois par jour ?', suite: 'finOrdonnance' }, { he: 'תּוֹדָה, דּוֹקְטוֹר!', tr: 'toda, doktor!', fr: 'Merci, docteur !', suite: 'finMaison' }] },
      m7: { he: 'אַל תִּדְאֲגִי, זֶה לוֹקֵחַ דַּקָּה.', tr: 'al tid’agi, ze lokeakh daka', fr: 'Ne vous inquiétez pas, ça prend une minute.',
        choix: [{ he: 'טוֹב… אִם רַק דַּקָּה.', tr: 'tov… im rak daka', fr: 'Bon… si c’est juste une minute.', suite: 'finLabo' }, { he: 'אֶפְשָׁר לְהַחְזִיק לְךָ אֶת הַיָּד?', tr: 'efshar lehakhazik lekha et hayad?', fr: 'Je peux vous tenir la main ?', suite: 'finCourage' }] },
      finMaison: { fin: true, em: '🏠', titre: 'Retour à la maison', etoiles: 2, fr: 'Un peu de repos et ça ira mieux. Tu as tout compris du médecin !' },
      finArret: { fin: true, em: '📄', titre: 'Arrêt maladie en poche', etoiles: 3, fr: 'Tu as même pensé au papier pour le travail : une vraie Israélienne !' },
      finLabo: { fin: true, em: '🩸', titre: 'Direction le laboratoire', etoiles: 2, fr: 'Prise de sang prévue. Courage, et רְפוּאָה שְׁלֵמָה (prompt rétablissement) !' },
      finOrdonnance: { fin: true, em: '💊', titre: 'Ordonnance bien comprise', etoiles: 3, fr: 'Tu as demandé la posologie : rien ne t’échappe !' },
      finCourage: { fin: true, em: '🤝', titre: 'La main du docteur', etoiles: 3, fr: 'Le médecin a ri et t’a tenu la main. Tu as survécu à la piqûre !' },
    } },
  { id: 'marche', titre: 'Au marché', he: 'בַּשּׁוּק', em: '🍅', perso: 'Le marchand', c1: '#e0524f', c2: '#2fae6b',
    intro: 'Le marché Mahané Yehouda, à Jérusalem. Les marchands crient leurs prix. L’un d’eux t’interpelle.',
    debut: 's1',
    noeuds: {
      s1: { he: 'בּוֹאִי, בּוֹאִי! עַגְבָנִיּוֹת טְרִיּוֹת!', tr: 'bo’i, bo’i! agvaniyot triyot!', fr: 'Venez, venez ! Des tomates fraîches !',
        choix: [{ he: 'כַּמָּה עוֹלֶה קִילוֹ?', tr: 'kama ole kilo?', fr: 'Combien coûte le kilo ?', suite: 's2' }, { he: 'יֵשׁ לְךָ תּוּתִים?', tr: 'yesh lekha toutim?', fr: 'Vous avez des fraises ?', suite: 's3' }] },
      s2: { he: 'עֲשָׂרָה שְׁקָלִים לְקִילוֹ.', tr: 'asara shkalim lekilo', fr: 'Dix shekels le kilo.',
        choix: [{ he: 'יָקָר! אוּלַי שְׁמוֹנָה?', tr: 'yakar! oulai shmona?', fr: 'C’est cher ! Huit, peut-être ?', suite: 's4' }, { he: 'בְּסֵדֶר, שְׁנֵי קִילוֹ בְּבַקָּשָׁה.', tr: 'beseder, shnei kilo bevakasha', fr: 'D’accord, deux kilos s’il vous plaît.', suite: 'finAchat' }] },
      s3: { he: 'אֵין תּוּתִים עַכְשָׁו, זוֹ לֹא הָעוֹנָה. יֵשׁ אֲבַטִּיחַ!', tr: 'ein toutim akhshav, zo lo ha’ona. yesh avatiakh!', fr: 'Pas de fraises maintenant, ce n’est pas la saison. Il y a de la pastèque !',
        choix: [{ he: 'יֹפִי! כַּמָּה זֶה עוֹלֶה?', tr: 'yofi! kama ze ole?', fr: 'Super ! Combien ça coûte ?', suite: 's5' }, { he: 'לֹא, תּוֹדָה.', tr: 'lo, toda', fr: 'Non, merci.', suite: 'finRien' }] },
      s4: { he: 'שְׁמוֹנָה? אַתְּ הוֹרֶגֶת אוֹתִי! נוּ, תִּשְׁעָה.', tr: 'shmona? at horeget oti! nou, tish’a', fr: 'Huit ? Vous me tuez ! Bon, neuf.',
        choix: [{ he: 'סָגַרְנוּ!', tr: 'sagarnou!', fr: 'Marché conclu !', suite: 'finAffaire' }, { he: 'שְׁמוֹנָה, אוֹ שֶׁאֲנִי הוֹלֶכֶת.', tr: 'shmona, o she’ani holekhet', fr: 'Huit, ou je m’en vais.', suite: 's6' }] },
      s5: { he: 'עֶשְׂרִים שְׁקָלִים, וְהוּא מָתוֹק כְּמוֹ דְּבַשׁ!', tr: 'esrim shkalim, vehou matok kmo dvash!', fr: 'Vingt shekels, et elle est sucrée comme du miel !',
        choix: [{ he: 'אֲנִי לוֹקַחַת!', tr: 'ani lokakhat!', fr: 'Je la prends !', suite: 'finAchat' }, { he: 'הוּא כָּבֵד מִדַּי בִּשְׁבִילִי.', tr: 'hou kaved midai bishvili', fr: 'Elle est trop lourde pour moi.', suite: 'finRien' }] },
      s6: { he: 'טוֹב, טוֹב, שְׁמוֹנָה. רַק בִּשְׁבִילֵךְ!', tr: 'tov, tov, shmona. rak bishvilekh!', fr: 'Bon, bon, huit. Seulement pour vous !',
        choix: [{ he: 'תּוֹדָה! יוֹם טוֹב!', tr: 'toda! yom tov!', fr: 'Merci ! Bonne journée !', suite: 'finChampionne' }, { he: 'אַתָּה נֶחְמָד מְאוֹד!', tr: 'ata nekhmad me’od!', fr: 'Vous êtes très gentil !', suite: 'finChampionne' }] },
      finRien: { fin: true, em: '🧺', titre: 'Panier vide', etoiles: 1, fr: 'Tu repars les mains vides… mais tu as compris tout ce qu’il disait !' },
      finAchat: { fin: true, em: '🍅', titre: 'Courses faites', etoiles: 2, fr: 'Achat réussi, en hébreu et en shekels !' },
      finAffaire: { fin: true, em: '🤝', titre: 'Bonne affaire', etoiles: 3, fr: 'Tu as fait baisser le prix : un vrai réflexe du שׁוּק !' },
      finChampionne: { fin: true, em: '🏆', titre: 'Reine du marchandage', etoiles: 3, fr: 'Tu as tenu bon jusqu’au bout et obtenu ton prix. Le marchand s’en souviendra !' },
    } },
];
const finsDe = (r) => Object.entries(r.noeuds).filter(([, n]) => n.fin);

/* ---------- La mise en scène : décor, personnages, accessoires ---------- */
// Chaque scène : le décor (dessins des « Scènes »), le personnage, son humeur à chaque réplique,
// et les objets qui apparaissent au fil de l'histoire.
const ROLES_SCENE = {
  restaurant: {
    decor: 'resto',
    pnj: { peau: '#e8b48f', cheveux: '#3b2a24', coiffure: 'court', haut: '#fbfbf7', bas: '#2f2f3d', tablier: '#2f2f3d', noeud: '#c0394b', carnet: true, yeux: '#4a6b8a' },
    emo: { r1: 'content', r2: 'neutre', r2b: 'content', r3: 'ravi', r4: 'desole', r5: 'neutre', r6: 'content', finPartie: 'desole', finRepas: 'content', finDessert: 'ravi' },
    objets: { table: ['r2', 'r2b', 'r3', 'r4', 'r5', 'r6', 'finRepas', 'finDessert', 'finPartie'], assiette: ['r6', 'finRepas', 'finDessert'], verre: ['r6', 'finRepas', 'finDessert'], gateau: ['finDessert'] },
  },
  medecin: {
    decor: 'medecin',
    pnj: { peau: '#c98e6a', cheveux: '#9a9aa6', coiffure: 'degarni', haut: '#8fb6d6', bas: '#4a5470', blouse: true, stetho: true, lunettes: true, yeux: '#6b4a2a' },
    emo: { m1: 'neutre', m2: 'neutre', m3: 'content', m4: 'content', m5: 'surpris', m6: 'neutre', m7: 'content', finMaison: 'content', finArret: 'ravi', finLabo: 'neutre', finOrdonnance: 'ravi', finCourage: 'ravi' },
    objets: { ordonnance: ['m6', 'finOrdonnance'], seringue: ['m7', 'finLabo', 'finCourage'], eau: ['m4', 'finMaison', 'finArret'] },
  },
  marche: {
    decor: 'marche',
    pnj: { peau: '#b97b52', cheveux: '#2c211d', coiffure: 'casquette', casquette: '#3f8a5a', haut: '#e9d3a6', bas: '#5a4a3a', tablier: '#3f8a5a', moustache: true, yeux: '#3f6b3a' },
    emo: { s1: 'ravi', s2: 'neutre', s3: 'desole', s4: 'surpris', s5: 'ravi', s6: 'desole', finRien: 'desole', finAchat: 'content', finAffaire: 'content', finChampionne: 'ravi' },
    objets: { etal: ['*'], pasteque: ['s3', 's5', 'finAchat'], sachet: ['finAchat', 'finAffaire', 'finChampionne'] },
  },
};

// Un personnage dans le style de la chambre : pieds en (0,0), tête vers y = -192
function pnjSvg(t, emo) {
  const O = `stroke="${CH_TRAIT}" stroke-width="2" stroke-linejoin="round"`;
  const pe = t.peau;
  const sourcils = {
    neutre: 'M-22-212Q-13-216-5-212M5-212Q13-216 22-212',
    content: 'M-22-213Q-13-220-5-214M5-214Q13-220 22-213',
    ravi: 'M-22-215Q-13-223-5-216M5-216Q13-223 22-215',
    surpris: 'M-22-219Q-13-226-5-220M5-220Q13-226 22-219',
    desole: 'M-22-210Q-13-211-5-217M5-217Q13-211 22-210',
  }[emo] || '';
  const bouche = {
    neutre: `<path d="M-8-169Q0-164 8-169" stroke="${CH_TRAIT}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
    content: `<path d="M-10-170Q0-160 10-170Q0-166-10-170Z" fill="#c4505f" ${O.replace('2"', '1.6"')}/>`,
    ravi: `<path d="M-12-171Q0-155 12-171Z" fill="#a8364a" ${O.replace('2"', '1.6"')}/><path d="M-7-163Q0-159 7-163" stroke="#f08aa0" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    surpris: `<ellipse cx="0" cy="-166" rx="5.5" ry="7" fill="#a8364a" ${O.replace('2"', '1.6"')}/>`,
    desole: `<path d="M-8-165Q0-171 8-165" stroke="${CH_TRAIT}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
  }[emo] || '';
  const iris = t.yeux || '#5b3a40';
  const oeil = (x) => (emo === 'ravi'
    ? `<path d="M${x - 8}-187Q${x}-198 ${x + 8}-187" stroke="${CH_TRAIT}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`
    : `<ellipse cx="${x}" cy="-189" rx="8" ry="${emo === 'surpris' ? 11 : 9.5}" fill="#24161d"/><ellipse cx="${x}" cy="-186.5" rx="6" ry="${emo === 'surpris' ? 8.5 : 7}" fill="${iris}"/><ellipse cx="${x}" cy="-186" rx="3.6" ry="4.2" fill="#24161d"/><circle cx="${x + 3}" cy="-192.5" r="3.4" fill="#fff"/><circle cx="${x - 3.2}" cy="-184" r="1.6" fill="#fff"/>`);
  const cheveux = {
    court: `<path d="M-37-196Q-40-236 0-236Q40-236 37-196Q32-218 12-220Q-6-210-37-196Z" fill="${t.cheveux}" ${O}/>`,
    degarni: `<path d="M-37-190Q-40-214-30-222Q-34-200-34-188ZM37-190Q40-214 30-222Q34-200 34-188Z" fill="${t.cheveux}" ${O}/>`,
    casquette: `<path d="M-37-198Q-38-238 0-238Q38-238 37-198Z" fill="${t.casquette}" ${O}/><path d="M10-204Q52-210 60-198Q40-196 10-198Z" fill="${t.casquette}" ${O}/><circle cy="-238" r="4" fill="${t.casquette}" ${O}/>`,
  }[t.coiffure] || '';
  const jambe = (x) => `<rect x="${x - 8}" y="-68" width="16" height="64" rx="7" fill="${t.bas}" ${O}/><ellipse cx="${x + (x < 0 ? -3 : 3)}" cy="-3" rx="13" ry="6" fill="#2b2128" ${O}/>`;
  const bras = (s) => `<path d="M${s * 32}-146Q${s * 46}-120 ${s * 44}-86" stroke="${CH_TRAIT}" stroke-width="16" stroke-linecap="round" fill="none"/><path d="M${s * 32}-146Q${s * 46}-120 ${s * 44}-86" stroke="${t.blouse ? '#f7f7f2' : t.haut}" stroke-width="12" stroke-linecap="round" fill="none"/><circle cx="${s * 44}" cy="-82" r="7" fill="${pe}" ${O}/>`;
  return `<g class="rl-corps">
    <ellipse rx="34" ry="6" fill="#2b1f3a" opacity=".22"/>
    ${jambe(-12)}${jambe(12)}
    ${bras(-1)}${bras(1)}
    <path d="M-34-150Q-36-108-30-62H30Q36-108 34-150Q0-160-34-150Z" fill="${t.haut}" ${O}/>
    ${t.blouse ? `<path d="M-36-150Q-40-100-34-44H-4L0-120L4-44H34Q40-100 36-150Q18-158 10-156L0-130L-10-156Q-18-158-36-150Z" fill="#f7f7f2" ${O}/><rect x="14" y="-118" width="12" height="16" rx="2" fill="#dfe7ee" ${O.replace('2"', '1.4"')}/>` : ''}
    ${t.tablier ? `<path d="M-26-120H26L28-58H-28Z" fill="${t.tablier}" ${O}/><path d="M-26-120Q-30-140-22-150M26-120Q30-140 22-150" stroke="${t.tablier}" stroke-width="4" fill="none"/>` : ''}
    ${t.stetho ? `<path d="M-14-152Q-22-120-6-104Q8-96 10-112" stroke="#3d4658" stroke-width="3.5" fill="none" stroke-linecap="round"/><circle cx="10" cy="-114" r="6" fill="#aeb8c8" ${O.replace('2"', '1.4"')}/><path d="M14-152Q20-132 12-120" stroke="#3d4658" stroke-width="3.5" fill="none" stroke-linecap="round"/>` : ''}
    ${t.carnet ? `<g transform="translate(46 -84) rotate(-12)"><rect x="-10" y="-14" width="20" height="26" rx="2" fill="#fffdf4" ${O}/><path d="M-5-6H5M-5-1H5M-5 4H3" stroke="#9aa" stroke-width="1.5"/></g>` : ''}
    <rect x="-7" y="-160" width="14" height="14" fill="${pe}" ${O}/>
    ${t.noeud ? `<path d="M0-150L-12-157V-143ZM0-150L12-157V-143Z" fill="${t.noeud}" ${O}/><circle cy="-150" r="3" fill="${t.noeud}" ${O}/>` : ''}
    <ellipse cx="-37" cy="-190" rx="5" ry="7" fill="${pe}" ${O}/><ellipse cx="37" cy="-190" rx="5" ry="7" fill="${pe}" ${O}/>
    <path d="M-36-196Q-36-232 0-232Q36-232 36-196Q36-166 20-157Q10-152 0-152Q-10-152-20-157Q-36-166-36-196Z" fill="${pe}" ${O}/>
    <path d="M-28-210Q0-224 28-210Q18-216 0-217Q-18-216-28-210Z" fill="${CH_OMBRE}"/>
    <ellipse cx="-24" cy="-173" rx="9" ry="5.5" fill="#f58fa0" opacity=".42"/><ellipse cx="24" cy="-173" rx="9" ry="5.5" fill="#f58fa0" opacity=".42"/>
    ${cheveux}
    <g class="rl-yeux">${oeil(-14)}${oeil(14)}</g>
    <path d="${sourcils}" stroke="${t.coiffure === 'degarni' ? '#7d7d88' : t.cheveux}" stroke-width="3" fill="none" stroke-linecap="round"/>
    ${t.lunettes ? `<g fill="none" stroke="#3d4658" stroke-width="2.5"><circle cx="-14" cy="-189" r="12"/><circle cx="14" cy="-189" r="12"/><path d="M-2-190H2"/></g>` : ''}
    <path d="M-2-182Q0-178 2-182" stroke="${CH_TRAIT}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    ${t.moustache ? `<path d="M-15-174Q-8-180 0-175Q8-180 15-174Q8-170 0-173Q-8-170-15-174Z" fill="${t.cheveux}"/>` : ''}
    <g class="rl-bouche">${bouche}</g>
  </g>`;
}

// Quelques accessoires qui n'existent pas encore dans les dessins du site
const ROLES_OBJ = {
  pasteque: () => `<ellipse cy="6" rx="46" ry="34" fill="#3f8a4a" stroke="#2c5f33" stroke-width="3"/><path d="M-30-14Q-34 6-26 30M-10-26Q-14 6-8 38M12-26Q8 6 12 38M32-14Q28 6 32 28" stroke="#2c5f33" stroke-width="4" fill="none"/><ellipse cx="-14" cy="-10" rx="14" ry="6" fill="#fff" opacity=".18"/>`,
  ordonnance: () => `<g transform="rotate(-8)"><rect x="-30" y="-38" width="60" height="76" rx="3" fill="#fff" stroke="#9fb2c2" stroke-width="2.5"/><path d="M-20-24H20M-20-12H20M-20 0H12M-20 12H16" stroke="#9fb2c2" stroke-width="3"/><text x="-18" y="32" font-size="18" fill="#2f8fb0" font-weight="700">℞</text></g>`,
  seringue: () => `<g transform="rotate(-30)"><rect x="-34" y="-8" width="52" height="16" rx="4" fill="#e9f4fb" stroke="#7fa4bc" stroke-width="2.5"/><rect x="-26" y="-5" width="30" height="10" fill="#f4a3b3"/><path d="M18 0H40" stroke="#7fa4bc" stroke-width="3"/><path d="M-34-12V12M-46 0H-34" stroke="#7fa4bc" stroke-width="4" stroke-linecap="round"/></g>`,
};
const objetRole = (nom) => (ROLES_OBJ[nom] ? ROLES_OBJ[nom]() : OBJ[nom] ? OBJ[nom]() : '');
// Où poser chaque objet dans la scène (x, y, échelle)
const ROLES_POSE = {
  table: [400, 520, 1.25], assiette: [370, 482, .7], verre: [440, 470, .6], gateau: [400, 455, .5],
  ordonnance: [400, 460, .9], seringue: [390, 470, .9], eau: [405, 470, .7],
  etal: [400, 460, 1], pasteque: [470, 470, .9], sachet: [330, 488, .8],
};

// Ce que montre chaque affiche
const ROLES_INFOS = { restaurant: { duree: '3 min', niveau: 'Débutant' }, medecin: { duree: '3 min', niveau: 'Intermédiaire' }, marche: { duree: '3 min', niveau: 'Débutant' } };
const etoilesDe = (r) => { const fins = finsDe(r), vues = (S.roles || {})[r.id] || []; return { eu: fins.filter(([k]) => vues.includes(k)).reduce((t, [, f]) => t + f.etoiles, 0), max: fins.reduce((t, [, f]) => t + f.etoiles, 0) }; };

function roles(id) {
  if (!S.roles) S.roles = {};
  const r = ROLES.find((x) => x.id === id);
  if (!r) {
    const total = ROLES.reduce((t, x) => t + finsDe(x).length, 0), vues = ROLES.reduce((t, x) => t + (S.roles[x.id] || []).length, 0);
    const et = ROLES.reduce((t, x) => { const e = etoilesDe(x); return { eu: t.eu + e.eu, max: t.max + e.max }; }, { eu: 0, max: 0 });
    app.innerHTML = `<section class="rlx-hero">
      <span class="rlx-drape g" aria-hidden="true"></span><span class="rlx-drape d" aria-hidden="true"></span><span class="rlx-lambrequin" aria-hidden="true"></span>
      <div class="rlx-hero-txt"><span class="he rlx-hero-he" lang="he" dir="rtl">מִשְׂחֲקֵי תַּפְקִידִים</span><h2>Jeux de rôle</h2>
        <p>Entre en scène : une situation de la vie, et c’est toi qui réponds. Selon tes choix, l’histoire finit autrement.</p>
        <div class="rlx-chiffres"><span>🎬 <b>${vues}</b> / ${total} fins</span><span>⭐ <b>${et.eu}</b> / ${et.max} étoiles</span></div></div>
    </section>
    <div class="rlx-affiches">${ROLES.map((x, k) => {
      const sc = ROLES_SCENE[x.id], v = S.roles[x.id] || [], fins = finsDe(x), e = etoilesDe(x), inf = ROLES_INFOS[x.id] || {};
      return `<a class="rlx-affiche" href="#/roles/${x.id}" style="--c1:${x.c1};--c2:${x.c2}">
        <div class="rlx-image">
          <svg class="sc-svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${DECORS_SCENE[sc.decor]('rlm' + x.id)}<g transform="translate(400 600) scale(1.75)">${pnjSvg(sc.pnj, 'ravi')}</g></svg>
          <span class="rlx-num">Scène ${k + 1}</span>${v.length === fins.length ? '<span class="rlx-complet">✓ Toutes les fins</span>' : ''}
          <div class="rlx-titre-img"><b>${x.em} ${esc(x.titre)}</b><span class="he" lang="he" dir="rtl">${esc(x.he)}</span></div>
        </div>
        <div class="rlx-corps">
          <p>${esc(x.intro)}</p>
          <div class="rlx-meta"><span>👤 ${esc(x.perso)}</span><span>⏱️ ${inf.duree || '3 min'}</span><span>📶 ${inf.niveau || 'Débutant'}</span></div>
          <div class="rlx-progres">
            <div class="rlx-fins">${fins.map(([key, f]) => `<span class="${v.includes(key) ? 'vue' : ''}" title="${v.includes(key) ? esc(f.titre) : 'Fin encore secrète'}">${v.includes(key) ? f.em : '?'}</span>`).join('')}</div>
            <span class="rlx-etoiles-txt">⭐ ${e.eu}/${e.max}</span>
          </div>
          <div class="rlx-barre-et"><i style="width:${e.max ? (e.eu / e.max) * 100 : 0}%"></i></div>
          <span class="btn rlx-jouer">${v.length ? (v.length < fins.length ? '🎬 Chercher une autre fin' : '🎬 Rejouer') : '🎬 Entrer en scène'}</span>
        </div></a>`; }).join('')}</div>
    <section class="card rlx-aide"><h3>Comment jouer ?</h3><div class="rlx-etapes">
      <div><span>👂</span><b>Écoute</b><small>Le personnage te parle : touche 🔊 pour réécouter.</small></div>
      <div><span>💬</span><b>Réponds</b><small>Choisis ta réplique (ou tape 1 ou 2 au clavier).</small></div>
      <div><span>🔀</span><b>Explore</b><small>Chaque choix mène ailleurs : rejoue pour trouver toutes les fins.</small></div>
    </div></section>`;
    return;
  }
  const sc = ROLES_SCENE[r.id];
  const perso = Object.assign({}, typeof CH_PERSO_DEFAUT !== 'undefined' ? CH_PERSO_DEFAUT : {}, S.perso || {});
  let noeud = r.debut, traduire = S.rolesTrad !== false, tour = 0;
  const chemin = [];
  const fins = finsDe(r);
  const etroit = matchMedia('(max-width: 600px)').matches;
  const visibles = (k) => Object.entries(sc.objets).filter(([, liste]) => liste.includes('*') || liste.includes(k)).map(([o]) => o);

  // La scène façon roman illustré : décor flou et éclairé, personnages, puis le dialogue et les choix dans l'image
  app.innerHTML = `<div class="rlx-barre">
    <a class="rlx-retour" href="#/roles">← Scènes</a>
    <div class="rlx-plaque"><b>${r.em} ${esc(r.titre)}</b><span class="he" lang="he" dir="rtl">${esc(r.he)}</span></div>
    <label class="rlx-switch" title="Afficher les traductions"><input type="checkbox" id="rlTrad" ${traduire ? 'checked' : ''}><span class="rlx-glisse"></span><span class="rlx-switch-txt">FR</span></label>
  </div>
  <div class="rl-theatre rlx-scene rlv" id="rlTheatre" style="--c1:${r.c1};--c2:${r.c2}">
    <svg class="sc-svg rl-svg" viewBox="${etroit ? '160 120 480 480' : '0 0 800 600'}" preserveAspectRatio="xMidYMax slice" role="img" aria-label="${esc(r.titre)}">
      <defs>
        <filter id="rlvFlou" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="2.2"/><feColorMatrix type="saturate" values=".85"/></filter>
        <radialGradient id="rlvSpot" cx="50%" cy="78%" r="60%"><stop offset="0" stop-color="#fff6dc" stop-opacity=".38"/><stop offset=".55" stop-color="#fff6dc" stop-opacity=".08"/><stop offset="1" stop-color="#1a0c22" stop-opacity=".45"/></radialGradient>
      </defs>
      <g filter="url(#rlvFlou)">${DECORS_SCENE[sc.decor]('rl' + r.id)}</g>
      <rect x="0" y="0" width="800" height="600" fill="url(#rlvSpot)"/>
      <ellipse cx="400" cy="590" rx="330" ry="34" fill="#1a0c22" opacity=".25"/>
      <g id="rlPnj" class="rl-pnj" transform="translate(${etroit ? 290 : 215} ${etroit ? 520 : 555}) scale(${etroit ? 1.15 : 1.3})"></g>
      <g class="rl-moi" transform="translate(${etroit ? 520 : 590} ${etroit ? 526 : 561}) scale(${etroit ? 1.08 : 1.2})"><g class="rl-moi-corps">${persoSvg(perso)}</g></g>
      <g id="rlObjets"></g>
    </svg>
    <div class="rlx-tour" id="rlTour"></div>
    <div class="rlv-dialogue" id="rlDialogue" hidden>
      <span class="rlv-nom" id="rlNom"></span>
      <div class="rlv-texte" id="rlTexte"></div>
      <div class="rlv-choix" id="rlChoix"></div>
    </div>
    <div class="rlx-rideaux" aria-hidden="true"><i class="g"></i><i class="d"></i></div>
    <span class="rlx-cadre-haut" aria-hidden="true"></span>
    <button class="rlx-clap" id="rlClap" type="button"><span class="rlx-clap-planche"></span><span class="rlx-clap-txt"><small>🎬 Scène</small><b>${esc(r.titre)}</b><span class="he" lang="he" dir="rtl">${esc(r.he)}</span><em>${esc(r.intro)}</em><small class="rlx-clap-go">Touche pour commencer</small></span></button>
  </div>
  <div class="rlv-choix bas" id="rlChoixBas"></div>
  <p class="rlv-aide">Clavier : <kbd>1</kbd> ou <kbd>2</kbd> pour répondre · 🔊 pour réécouter</p>
  <div id="rlBas"></div>`;
  let objetsAvant = [];
  const majScene = (k, emo) => {
    const pnj = $('#rlPnj');
    pnj.innerHTML = pnjSvg(sc.pnj, emo);
    pnj.classList.remove('saute'); void pnj.getBoundingClientRect(); pnj.classList.add('saute');
    const obj = visibles(k);
    $('#rlObjets').innerHTML = obj.map((o) => { const [x, y, s] = ROLES_POSE[o]; return `<g transform="translate(${x} ${y}) scale(${s})"><g class="rl-objet${objetsAvant.includes(o) ? '' : ' nouveau'}">${objetRole(o)}</g></g>`; }).join('');
    objetsAvant = obj;
  };
  // Qui parle est mis en lumière, l'autre passe légèrement dans l'ombre
  const projecteur = (qui) => { $('#rlTheatre').classList.toggle('parle-lui', qui === 'lui'); $('#rlTheatre').classList.toggle('parle-moi', qui === 'moi'); };
  const parler = (texte, qui) => {
    const g = qui === 'moi' ? $('.rl-moi') : $('#rlPnj');
    if (!g) return;
    g.classList.add('parle');
    Promise.resolve(speak(texte)).then(() => g.classList.remove('parle'));
  };
  const dialogue = (qui, he, tr, fr, son) => {
    const d = $('#rlDialogue');
    d.hidden = false;
    d.className = `rlv-dialogue ${qui}`;
    $('#rlNom').textContent = qui === 'moi' ? 'Toi' : r.perso;
    $('#rlTexte').innerHTML = `<span class="rlv-he">${HE(he)}${son ? ` ${sayBtn(he)}` : ''}</span>${tr ? `<small class="tr-x">${esc(tr)}</small>` : ''}${traduire && fr ? `<small class="rl-fr">${esc(fr)}</small>` : ''}`;
    d.classList.remove('entre'); void d.offsetWidth; d.classList.add('entre');
    projecteur(qui);
  };
  $('#rlTrad').onchange = (e) => { traduire = e.target.checked; S.rolesTrad = traduire; save(); montrer(true); };

  const montrer = (memeTour) => {
    const n = r.noeuds[noeud];
    if (n.fin) return finir(n);
    if (!memeTour) tour++;
    if (!memeTour) majScene(noeud, sc.emo[noeud] || 'neutre');
    $('#rlTour').innerHTML = `Réplique <b>${tour}</b>`;
    dialogue('lui', n.he, n.tr, n.fr, true);
    const c = etroit ? $('#rlChoixBas') : $('#rlChoix'); // sur téléphone, les réponses passent sous la scène
    c.innerHTML = n.choix.map((x, j) => `<button class="rlv-btn" data-j="${j}" type="button" style="--i:${j}"><span class="rlx-n">${j + 1}</span><span class="rlv-btn-txt">${HE(x.he)}${traduire ? `<small class="rl-fr">${esc(x.fr)}</small>` : `<small class="tr-x">${esc(x.tr)}</small>`}</span></button>`).join('');
    c.classList.remove('visible');
    later(() => c.classList.add('visible'), memeTour ? 0 : 900);
    if (!memeTour) later(() => parler(n.he, 'lui'), 300);
    let fait = false;
    const choisir = (j) => {
      if (fait || !c.classList.contains('visible')) return; fait = true;
      const ch = n.choix[j];
      chemin.push({ dit: n, rep: ch });
      $$('.rlv-btn').forEach((x, i) => { x.disabled = true; x.classList.add(i === j ? 'choisi' : 'ecarte'); });
      later(() => { c.classList.remove('visible'); dialogue('moi', ch.he, ch.tr, ch.fr, false); parler(ch.he, 'moi'); }, 350);
      noeud = ch.suite;
      later(() => montrer(), 2100);
    };
    $$('.rlv-btn').forEach((x) => (x.onclick = () => choisir(+x.dataset.j)));
    keyHandler = (e) => { const k = +e.key; if (k >= 1 && k <= n.choix.length) choisir(k - 1); };
  };

  const finir = (n) => {
    keyHandler = null;
    majScene(noeud, sc.emo[noeud] || 'content');
    $('#rlDialogue').hidden = true;
    $('#rlChoix').innerHTML = ''; $('#rlChoixBas').remove();
    $('#rlTour').innerHTML = '';
    projecteur('');
    const vues = S.roles[r.id] || (S.roles[r.id] = []);
    const nouvelle = !vues.includes(noeud);
    if (nouvelle) { vues.push(noeud); addXP(10 + n.etoiles * 5); }
    save();
    if (n.etoiles === 3) $('.rl-moi').classList.add('fete');
    const voile = document.createElement('div');
    voile.className = 'rlx-fin-voile';
    voile.innerHTML = `<div class="rlx-fin-carte"><span class="rlx-tampon">FIN</span><span class="rlx-fin-em">${n.em}</span><b>${esc(n.titre)}</b>
      <span class="rlx-fin-etoiles">${[0, 1, 2].map((i) => `<i class="${i < n.etoiles ? 'on' : ''}" style="--d:${0.5 + i * 0.35}s">★</i>`).join('')}</span>
      ${nouvelle ? `<span class="rlx-nouvelle">✨ Nouvelle fin ! +${10 + n.etoiles * 5} XP</span>` : '<span class="rlx-nouvelle deja">Fin déjà découverte</span>'}</div>`;
    $('#rlTheatre').appendChild(voile);
    if (n.etoiles === 3) later(confetti, 900);
    $('.rlv-aide').remove();
    $('#rlBas').innerHTML = `<div class="card rlx-bilan">
      <p class="rlx-bilan-txt">${n.fr.replace(/([א-ת][א-ת֑-ׇ ]*[א-ת֑-ׇ])/g, '<span class="he" lang="he" dir="rtl">$1</span>')}</p>
      <div class="rlx-collection"><span class="rlx-col-titre">Tes fins : ${vues.length}/${fins.length}</span>
        <div class="rlx-fins grand">${fins.map(([k, f]) => `<span class="${vues.includes(k) ? 'vue' : ''}${k === noeud ? ' ici' : ''}" title="${vues.includes(k) ? esc(f.titre) : 'Fin encore secrète'}">${vues.includes(k) ? f.em : '?'}<small>${vues.includes(k) ? esc(f.titre) : 'secrète'}</small></span>`).join('')}</div></div>
      <details class="rl-relire"><summary>📜 Relire la conversation</summary><div class="rl-fil petit">${chemin.map((c) => `<div class="rl-bulle lui">${HE(c.dit.he)}<small>${esc(c.dit.fr)}</small></div><div class="rl-bulle moi">${HE(c.rep.he)}<small>${esc(c.rep.fr)}</small></div>`).join('')}</div></details>
      <div class="row" style="justify-content:center"><button class="btn gold" id="rlAgain" type="button">${vues.length < fins.length ? '🎬 Chercher une autre fin' : '🎬 Rejouer'}</button><a class="btn ghost" href="#/roles">Autres scènes</a></div></div>`;
    $('#rlAgain').onclick = () => roles(r.id);
  };

  // Lever de rideau, puis la première réplique
  const commencer = () => {
    const c = $('#rlClap');
    if (!c || c.classList.contains('parti')) return;
    c.classList.add('parti');
    $('#rlTheatre').classList.add('ouvert');
    later(() => c.remove(), 600);
    later(() => montrer(), 700);
  };
  majScene(noeud, sc.emo[noeud] || 'neutre'); // le personnage attend déjà derrière le rideau
  $('#rlClap').onclick = commencer;
  keyHandler = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); commencer(); } };
  later(commencer, 3200);
}
routes.roles = roles;
