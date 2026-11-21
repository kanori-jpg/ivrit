'use strict';
/* ============ Transcription en lettres latines ============
   trouverTr(he) : la transcription d'un mot hébreu, pour les mots qui n'en ont pas (mots ajoutés depuis
   les articles, la presse, les familles de mots…). On cherche d'abord dans tout ce que le site connaît
   (vocabulaire, gloses des histoires, du roman, du feuilleton…) ; sinon on la lit à partir des voyelles (nikoud),
   avec les mêmes habitudes que le reste du site : kh, sh, ou, ts, gu devant e/i, ss entre deux voyelles. */
const TR_EXCEPTIONS = { 'כָּל': 'kol', 'כֹּל': 'kol', 'כָּל־': 'kol', 'צָהֳרַיִם': 'tsohorayim', 'תָּכְנִית': 'tokhnit', 'חָכְמָה': 'khokhma', 'אָזְנַיִם': 'oznayim', 'אֳנִיָּה': 'oniya', 'יְרוּשָׁלַיִם': 'Yeroushalayim', 'יִשְׂרָאֵל': 'Israël', 'מֹשֶׁה': 'Moshé' };

function trAuto(texte) {
  const NIQ = { PATAH: 'ַ', KAMATZ: 'ָ', SEGOL: 'ֶ', TSERE: 'ֵ', HIRIK: 'ִ', HOLAM: 'ֹ', HOLAM_V: 'ֺ', KUBUTS: 'ֻ', SHVA: 'ְ', HPATAH: 'ֲ', HSEGOL: 'ֱ', HKAMATZ: 'ֳ', DAGESH: 'ּ', SHIN: 'ׁ', SIN: 'ׂ' };
  const mot = (m) => {
    const ex = TR_EXCEPTIONS[m.normalize('NFC')];
    if (ex) return ex;
    const lettres = (m.normalize('NFD').match(/[א-ת][֑-ׇ׳']*/g) || []).map((g) => ({ c: g[0], n: g.slice(1), geresh: /[׳']/.test(g) }));
    const voy = (L) => {
      if (!L) return null;
      const n = L.n;
      if (n.includes(NIQ.PATAH) || n.includes(NIQ.KAMATZ) || n.includes(NIQ.HPATAH)) return 'a';
      if (n.includes(NIQ.SEGOL) || n.includes(NIQ.TSERE) || n.includes(NIQ.HSEGOL)) return 'e';
      if (n.includes(NIQ.HIRIK)) return 'i';
      if (n.includes(NIQ.HOLAM) || n.includes(NIQ.HOLAM_V) || n.includes(NIQ.HKAMATZ)) return 'o';
      if (n.includes(NIQ.KUBUTS)) return 'ou';
      return null;
    };
    let s = '';
    for (let i = 0; i < lettres.length; i++) {
      const L = lettres[i], n = L.n, dag = n.includes(NIQ.DAGESH), dernier = i === lettres.length - 1, P = lettres[i - 1], N = lettres[i + 1];
      let v = voy(L);
      // vav : voyelle (וֹ, וּ) ou consonne
      if (L.c === 'ו') {
        if (n.includes(NIQ.HOLAM) && !v) { s += 'o'; continue; }
        if (n.includes(NIQ.HOLAM)) { s += 'o'; continue; }
        if (dag && !v && !n.includes(NIQ.SHVA)) { s += 'ou'; continue; } // shourouk
        if (N && N.c === 'ו' && !v) { s += 'v'; continue; } // וו : la consonne v
      }
      // yod sans voyelle après une voyelle : prolonge la voyelle (i, e) ou fait « y »
      if (L.c === 'י' && !v && !n.includes(NIQ.SHVA) && !dag && P) {
        const pv = voy(P) || ('אע'.includes(P.c) && !P.n.includes(NIQ.SHVA) ? voy(lettres[i - 2]) : null);
        if (pv === 'i') continue;
        if (pv === 'e') { if (P.n.includes(NIQ.TSERE)) s += 'i'; continue; }
        if (pv === 'a' && (dernier || (N && N.c === 'ם'))) { s += 'ï'; continue; }
        if (pv && dernier) { s += 'y'; continue; }
        if (pv && N && !voy(N) && !(N.c === 'ו')) { s += 'y'; continue; }
      }
      // consonne
      let c = '';
      switch (L.c) {
        case 'א': case 'ע': c = ''; break;
        case 'ב': c = dag || i === 0 ? 'b' : 'v'; break;
        case 'ג': c = L.geresh ? 'dj' : 'g'; break;
        case 'ד': c = 'd'; break;
        case 'ה': c = dernier && !v && !dag ? '' : 'h'; break;
        case 'ו': c = 'v'; break;
        case 'ז': c = L.geresh ? 'j' : 'z'; break;
        case 'ח': c = 'kh'; break;
        case 'ט': case 'ת': c = 't'; break;
        case 'י': c = 'y'; break;
        case 'כ': case 'ך': c = dag || (i === 0 && L.c === 'כ') ? 'k' : 'kh'; break;
        case 'ל': c = 'l'; break;
        case 'מ': case 'ם': c = 'm'; break;
        case 'נ': case 'ן': c = 'n'; break;
        case 'ס': c = 's'; break;
        case 'פ': case 'ף': c = dag || (i === 0 && L.c === 'פ') ? 'p' : 'f'; break;
        case 'צ': case 'ץ': c = L.geresh ? 'tch' : 'ts'; break;
        case 'ק': c = 'k'; break;
        case 'ר': c = 'r'; break;
        case 'ש': c = n.includes(NIQ.SIN) ? 's' : 'sh'; break;
        default: c = '';
      }
      // patah « furtif » sous ח, ע, ה finales : la voyelle se dit avant (רוּחַ : rouakh)
      if (dernier && v === 'a' && 'חע'.includes(L.c) && n.includes(NIQ.PATAH) && /[eiou]$/.test(s)) { s += 'a' + c; continue; }
      // shva : prononcé « e » au début du mot (sauf groupes faciles) et après un autre shva
      if (!v && n.includes(NIQ.SHVA) && !dernier) {
        const debut = i === 0, apresShva = P && P.n.includes(NIQ.SHVA) && i >= 2;
        const facile = 'בלמנרויהאע'.includes(L.c) || (N && ('אעהח'.includes(N.c) || N.c === L.c)) || (L.c === 'ת' && N && 'שסצז'.includes(N.c));
        if ((debut && facile) || apresShva) v = 'e';
      }
      if (c === 'g' && v === 'i') c = 'gu';
      s += c + (v || '');
      // hirik suivi d'un yod-voyelle, holam/shourouk déjà traités
    }
    return s;
  };
  return texte.split(/(\s+|־)/).map((p) => (/[א-ת]/.test(p) ? mot(p) : p === '־' ? '-' : p)).join('').replace(/[״"׳]/g, '').trim();
}

// D'abord ce que le site connaît déjà, sinon la lecture automatique
let INDEX_TR = null;
function trouverTr(he) {
  const k = he.normalize('NFC');
  if (!INDEX_TR) {
    INDEX_TR = new Map();
    const ajoute = (h, tr) => { if (h && tr && typeof tr === 'string') { const kk = h.normalize('NFC'); if (!INDEX_TR.has(kk)) INDEX_TR.set(kk, tr); } };
    if (typeof THEMES !== 'undefined') THEMES.forEach((t) => t.id !== 'mesmots' && t.words.forEach(([h, tr]) => ajoute(h, tr)));
    if (typeof MOTS_HISTOIRES !== 'undefined') MOTS_HISTOIRES.forEach((m) => ajoute(m[0], m[1]));
    if (typeof GLOSES_HISTOIRES !== 'undefined') Object.entries(GLOSES_HISTOIRES).forEach(([h, g]) => ajoute(h, g && g[1]));
    if (window.GLOSES_HEBDO) Object.entries(window.GLOSES_HEBDO).forEach(([h, g]) => ajoute(h, g && g[1]));
    if (typeof VERBES !== 'undefined') VERBES.forEach((v) => ajoute(v.he, v.tr));
  }
  return INDEX_TR.get(k) || trAuto(k);
}

// Les mots déjà inscrits avant que ce fichier soit chargé (tes mots, au démarrage) : on complète leur transcription
(() => {
  if (typeof THEMES !== 'undefined') THEMES.forEach((t) => t.words.forEach((w) => { if (!w[1]) w[1] = trouverTr(w[0]); }));
  if (typeof WORDS !== 'undefined') WORDS.forEach((w) => { if (!w.tr) w.tr = trouverTr(w.he); });
})();
