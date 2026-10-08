"use strict";
/* ================================================================
   MODES CROISÉS — crossmodes.js
   Capitale→Drapeau  |  Drapeau→Capitale
   195 pays ONU · sélection par continent
================================================================ */

// ─── DONNÉES ────────────────────────────────────────────────────
const COUNTRIES = [
  {code:"dz",name:"Algérie",capital:"Alger",c:"af"},
  {code:"ao",name:"Angola",capital:"Luanda",c:"af"},
  {code:"bj",name:"Bénin",capital:"Porto-Novo",c:"af"},
  {code:"bw",name:"Botswana",capital:"Gaborone",c:"af"},
  {code:"bf",name:"Burkina Faso",capital:"Ouagadougou",c:"af"},
  {code:"bi",name:"Burundi",capital:"Gitega",c:"af"},
  {code:"cv",name:"Cap-Vert",capital:"Praia",c:"af"},
  {code:"cm",name:"Cameroun",capital:"Yaoundé",c:"af"},
  {code:"cf",name:"Rép. centrafricaine",capital:"Bangui",c:"af"},
  {code:"td",name:"Tchad",capital:"N'Djaména",c:"af"},
  {code:"km",name:"Comores",capital:"Moroni",c:"af"},
  {code:"cg",name:"Congo",capital:"Brazzaville",c:"af"},
  {code:"cd",name:"R.D. Congo",capital:"Kinshasa",c:"af"},
  {code:"dj",name:"Djibouti",capital:"Djibouti",c:"af"},
  {code:"eg",name:"Égypte",capital:"Le Caire",c:"af"},
  {code:"gq",name:"Guinée équatoriale",capital:"Ciudad de la Paz",c:"af"},
  {code:"er",name:"Érythrée",capital:"Asmara",c:"af"},
  {code:"sz",name:"Eswatini",capital:"Mbabane",c:"af"},
  {code:"et",name:"Éthiopie",capital:"Addis-Abeba",c:"af"},
  {code:"ga",name:"Gabon",capital:"Libreville",c:"af"},
  {code:"gm",name:"Gambie",capital:"Banjul",c:"af"},
  {code:"gh",name:"Ghana",capital:"Accra",c:"af"},
  {code:"gn",name:"Guinée",capital:"Conakry",c:"af"},
  {code:"gw",name:"Guinée-Bissau",capital:"Bissau",c:"af"},
  {code:"ci",name:"Côte d'Ivoire",capital:"Yamoussoukro",c:"af"},
  {code:"ke",name:"Kenya",capital:"Nairobi",c:"af"},
  {code:"ls",name:"Lesotho",capital:"Maseru",c:"af"},
  {code:"lr",name:"Libéria",capital:"Monrovia",c:"af"},
  {code:"ly",name:"Libye",capital:"Tripoli",c:"af"},
  {code:"mg",name:"Madagascar",capital:"Antananarivo",c:"af"},
  {code:"mw",name:"Malawi",capital:"Lilongwe",c:"af"},
  {code:"ml",name:"Mali",capital:"Bamako",c:"af"},
  {code:"mr",name:"Mauritanie",capital:"Nouakchott",c:"af"},
  {code:"mu",name:"Maurice",capital:"Port-Louis",c:"af"},
  {code:"ma",name:"Maroc",capital:"Rabat",c:"af"},
  {code:"mz",name:"Mozambique",capital:"Maputo",c:"af"},
  {code:"na",name:"Namibie",capital:"Windhoek",c:"af"},
  {code:"ne",name:"Niger",capital:"Niamey",c:"af"},
  {code:"ng",name:"Nigeria",capital:"Abuja",c:"af"},
  {code:"rw",name:"Rwanda",capital:"Kigali",c:"af"},
  {code:"st",name:"Sao Tomé",capital:"São Tomé",c:"af"},
  {code:"sn",name:"Sénégal",capital:"Dakar",c:"af"},
  {code:"sc",name:"Seychelles",capital:"Victoria",c:"af"},
  {code:"sl",name:"Sierra Leone",capital:"Freetown",c:"af"},
  {code:"so",name:"Somalie",capital:"Mogadiscio",c:"af"},
  {code:"za",name:"Afrique du Sud",capital:"Pretoria",c:"af"},
  {code:"ss",name:"Soudan du Sud",capital:"Djouba",c:"af"},
  {code:"sd",name:"Soudan",capital:"Khartoum",c:"af"},
  {code:"tz",name:"Tanzanie",capital:"Dodoma",c:"af"},
  {code:"tg",name:"Togo",capital:"Lomé",c:"af"},
  {code:"tn",name:"Tunisie",capital:"Tunis",c:"af"},
  {code:"ug",name:"Ouganda",capital:"Kampala",c:"af"},
  {code:"zm",name:"Zambie",capital:"Lusaka",c:"af"},
  {code:"zw",name:"Zimbabwe",capital:"Harare",c:"af"},
  {code:"ag",name:"Antigua-et-Barbuda",capital:"Saint John's",c:"am"},
  {code:"ar",name:"Argentine",capital:"Buenos Aires",c:"am"},
  {code:"bs",name:"Bahamas",capital:"Nassau",c:"am"},
  {code:"bb",name:"Barbade",capital:"Bridgetown",c:"am"},
  {code:"bz",name:"Belize",capital:"Belmopan",c:"am"},
  {code:"bo",name:"Bolivie",capital:"Sucre",c:"am"},
  {code:"br",name:"Brésil",capital:"Brasilia",c:"am"},
  {code:"ca",name:"Canada",capital:"Ottawa",c:"am"},
  {code:"cl",name:"Chili",capital:"Santiago",c:"am"},
  {code:"co",name:"Colombie",capital:"Bogotá",c:"am"},
  {code:"cr",name:"Costa Rica",capital:"San José",c:"am"},
  {code:"cu",name:"Cuba",capital:"La Havane",c:"am"},
  {code:"dm",name:"Dominique",capital:"Roseau",c:"am"},
  {code:"do",name:"Rép. dominicaine",capital:"Saint-Domingue",c:"am"},
  {code:"ec",name:"Équateur",capital:"Quito",c:"am"},
  {code:"sv",name:"Salvador",capital:"San Salvador",c:"am"},
  {code:"gd",name:"Grenade",capital:"Saint-Georges",c:"am"},
  {code:"gt",name:"Guatemala",capital:"Guatemala",c:"am"},
  {code:"gy",name:"Guyana",capital:"Georgetown",c:"am"},
  {code:"ht",name:"Haïti",capital:"Port-au-Prince",c:"am"},
  {code:"hn",name:"Honduras",capital:"Tegucigalpa",c:"am"},
  {code:"jm",name:"Jamaïque",capital:"Kingston",c:"am"},
  {code:"mx",name:"Mexique",capital:"Mexico",c:"am"},
  {code:"ni",name:"Nicaragua",capital:"Managua",c:"am"},
  {code:"pa",name:"Panama",capital:"Panama",c:"am"},
  {code:"py",name:"Paraguay",capital:"Asunción",c:"am"},
  {code:"pe",name:"Pérou",capital:"Lima",c:"am"},
  {code:"kn",name:"Saint-Kitts",capital:"Basseterre",c:"am"},
  {code:"lc",name:"Sainte-Lucie",capital:"Castries",c:"am"},
  {code:"vc",name:"Saint-Vincent",capital:"Kingstown",c:"am"},
  {code:"sr",name:"Suriname",capital:"Paramaribo",c:"am"},
  {code:"tt",name:"Trinité-et-Tobago",capital:"Port of Spain",c:"am"},
  {code:"us",name:"États-Unis",capital:"Washington D.C.",c:"am"},
  {code:"uy",name:"Uruguay",capital:"Montevideo",c:"am"},
  {code:"ve",name:"Venezuela",capital:"Caracas",c:"am"},
  {code:"af",name:"Afghanistan",capital:"Kaboul",c:"as"},
  {code:"am",name:"Arménie",capital:"Erevan",c:"as"},
  {code:"az",name:"Azerbaïdjan",capital:"Bakou",c:"as"},
  {code:"bh",name:"Bahreïn",capital:"Manama",c:"as"},
  {code:"bd",name:"Bangladesh",capital:"Dacca",c:"as"},
  {code:"bt",name:"Bhoutan",capital:"Thimphou",c:"as"},
  {code:"bn",name:"Brunéi",capital:"Bandar Seri Begawan",c:"as"},
  {code:"kh",name:"Cambodge",capital:"Phnom Penh",c:"as"},
  {code:"cn",name:"Chine",capital:"Pékin",c:"as"},
  {code:"cy",name:"Chypre",capital:"Nicosie",c:"as"},
  {code:"ge",name:"Géorgie",capital:"Tbilissi",c:"as"},
  {code:"in",name:"Inde",capital:"New Delhi",c:"as"},
  {code:"id",name:"Indonésie",capital:"Jakarta",c:"as"},
  {code:"ir",name:"Iran",capital:"Téhéran",c:"as"},
  {code:"iq",name:"Irak",capital:"Bagdad",c:"as"},
  {code:"il",name:"Israël",capital:"Jérusalem",c:"as"},
  {code:"jp",name:"Japon",capital:"Tokyo",c:"as"},
  {code:"jo",name:"Jordanie",capital:"Amman",c:"as"},
  {code:"kz",name:"Kazakhstan",capital:"Astana",c:"as"},
  {code:"kw",name:"Koweït",capital:"Koweït",c:"as"},
  {code:"kg",name:"Kirghizistan",capital:"Bichkek",c:"as"},
  {code:"la",name:"Laos",capital:"Vientiane",c:"as"},
  {code:"lb",name:"Liban",capital:"Beyrouth",c:"as"},
  {code:"my",name:"Malaisie",capital:"Kuala Lumpur",c:"as"},
  {code:"mv",name:"Maldives",capital:"Malé",c:"as"},
  {code:"mn",name:"Mongolie",capital:"Oulan-Bator",c:"as"},
  {code:"mm",name:"Myanmar",capital:"Naypyidaw",c:"as"},
  {code:"np",name:"Népal",capital:"Katmandou",c:"as"},
  {code:"kp",name:"Corée du Nord",capital:"Pyongyang",c:"as"},
  {code:"om",name:"Oman",capital:"Mascate",c:"as"},
  {code:"pk",name:"Pakistan",capital:"Islamabad",c:"as"},
  {code:"ph",name:"Philippines",capital:"Manille",c:"as"},
  {code:"qa",name:"Qatar",capital:"Doha",c:"as"},
  {code:"sa",name:"Arabie saoudite",capital:"Riyad",c:"as"},
  {code:"sg",name:"Singapour",capital:"Singapour",c:"as"},
  {code:"kr",name:"Corée du Sud",capital:"Séoul",c:"as"},
  {code:"lk",name:"Sri Lanka",capital:"Sri Jayawardenepura Kotte",c:"as"},
  {code:"sy",name:"Syrie",capital:"Damas",c:"as"},
  {code:"tw",name:"Taïwan",capital:"Taipei",c:"as"},
  {code:"tj",name:"Tadjikistan",capital:"Douchanbe",c:"as"},
  {code:"th",name:"Thaïlande",capital:"Bangkok",c:"as"},
  {code:"tl",name:"Timor oriental",capital:"Dili",c:"as"},
  {code:"tm",name:"Turkménistan",capital:"Achgabat",c:"as"},
  {code:"tr",name:"Turquie",capital:"Ankara",c:"as"},
  {code:"ae",name:"Émirats arabes unis",capital:"Abou Dabi",c:"as"},
  {code:"uz",name:"Ouzbékistan",capital:"Tachkent",c:"as"},
  {code:"vn",name:"Viêt Nam",capital:"Hanoï",c:"as"},
  {code:"ye",name:"Yémen",capital:"Sanaa",c:"as"},
  {code:"al",name:"Albanie",capital:"Tirana",c:"eu"},
  {code:"ad",name:"Andorre",capital:"Andorre-la-Vieille",c:"eu"},
  {code:"at",name:"Autriche",capital:"Vienne",c:"eu"},
  {code:"by",name:"Biélorussie",capital:"Minsk",c:"eu"},
  {code:"be",name:"Belgique",capital:"Bruxelles",c:"eu"},
  {code:"ba",name:"Bosnie-Herzégovine",capital:"Sarajevo",c:"eu"},
  {code:"bg",name:"Bulgarie",capital:"Sofia",c:"eu"},
  {code:"hr",name:"Croatie",capital:"Zagreb",c:"eu"},
  {code:"cz",name:"Tchéquie",capital:"Prague",c:"eu"},
  {code:"dk",name:"Danemark",capital:"Copenhague",c:"eu"},
  {code:"ee",name:"Estonie",capital:"Tallinn",c:"eu"},
  {code:"fi",name:"Finlande",capital:"Helsinki",c:"eu"},
  {code:"fr",name:"France",capital:"Paris",c:"eu"},
  {code:"de",name:"Allemagne",capital:"Berlin",c:"eu"},
  {code:"gr",name:"Grèce",capital:"Athènes",c:"eu"},
  {code:"hu",name:"Hongrie",capital:"Budapest",c:"eu"},
  {code:"is",name:"Islande",capital:"Reykjavik",c:"eu"},
  {code:"ie",name:"Irlande",capital:"Dublin",c:"eu"},
  {code:"it",name:"Italie",capital:"Rome",c:"eu"},
  {code:"lv",name:"Lettonie",capital:"Riga",c:"eu"},
  {code:"li",name:"Liechtenstein",capital:"Vaduz",c:"eu"},
  {code:"lt",name:"Lituanie",capital:"Vilnius",c:"eu"},
  {code:"lu",name:"Luxembourg",capital:"Luxembourg",c:"eu"},
  {code:"mt",name:"Malte",capital:"La Valette",c:"eu"},
  {code:"md",name:"Moldavie",capital:"Chișinău",c:"eu"},
  {code:"mc",name:"Monaco",capital:"Monaco",c:"eu"},
  {code:"me",name:"Monténégro",capital:"Podgorica",c:"eu"},
  {code:"nl",name:"Pays-Bas",capital:"Amsterdam",c:"eu"},
  {code:"mk",name:"Macédoine du Nord",capital:"Skopje",c:"eu"},
  {code:"no",name:"Norvège",capital:"Oslo",c:"eu"},
  {code:"pl",name:"Pologne",capital:"Varsovie",c:"eu"},
  {code:"pt",name:"Portugal",capital:"Lisbonne",c:"eu"},
  {code:"ro",name:"Roumanie",capital:"Bucarest",c:"eu"},
  {code:"ru",name:"Russie",capital:"Moscou",c:"eu"},
  {code:"sm",name:"Saint-Marin",capital:"Saint-Marin",c:"eu"},
  {code:"rs",name:"Serbie",capital:"Belgrade",c:"eu"},
  {code:"sk",name:"Slovaquie",capital:"Bratislava",c:"eu"},
  {code:"si",name:"Slovénie",capital:"Ljubljana",c:"eu"},
  {code:"es",name:"Espagne",capital:"Madrid",c:"eu"},
  {code:"se",name:"Suède",capital:"Stockholm",c:"eu"},
  {code:"ch",name:"Suisse",capital:"Berne",c:"eu"},
  {code:"ua",name:"Ukraine",capital:"Kiev",c:"eu"},
  {code:"gb",name:"Royaume-Uni",capital:"Londres",c:"eu"},
  {code:"va",name:"Vatican",capital:"Vatican",c:"eu"},
  {code:"au",name:"Australie",capital:"Canberra",c:"oc"},
  {code:"fj",name:"Fidji",capital:"Suva",c:"oc"},
  {code:"ki",name:"Kiribati",capital:"Tarawa-Sud",c:"oc"},
  {code:"mh",name:"Îles Marshall",capital:"Majuro",c:"oc"},
  {code:"fm",name:"Micronésie",capital:"Palikir",c:"oc"},
  {code:"nr",name:"Nauru",capital:"Yaren",c:"oc"},
  {code:"nz",name:"Nouvelle-Zélande",capital:"Wellington",c:"oc"},
  {code:"pw",name:"Palaos",capital:"Ngerulmud",c:"oc"},
  {code:"pg",name:"Papouasie",capital:"Port Moresby",c:"oc"},
  {code:"ws",name:"Samoa",capital:"Apia",c:"oc"},
  {code:"sb",name:"Îles Salomon",capital:"Honiara",c:"oc"},
  {code:"to",name:"Tonga",capital:"Nukuʻalofa",c:"oc"},
  {code:"tv",name:"Tuvalu",capital:"Funafuti",c:"oc"},
  {code:"vu",name:"Vanuatu",capital:"Port-Vila",c:"oc"},
];

const CONTINENTS = [
  {id:"all",name:"Monde entier",icon:"🌐"},
  {id:"af", name:"Afrique",     icon:"🌍"},
  {id:"am", name:"Amériques",   icon:"🌎"},
  {id:"as", name:"Asie",        icon:"🌏"},
  {id:"eu", name:"Europe",      icon:"🏰"},
  {id:"oc", name:"Océanie",     icon:"🏝️"},
];

const QUESTIONS_PER_GAME = 10;
const flagUrl = code => `https://flagcdn.com/w160/${code}.png`;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── ÉTAT ────────────────────────────────────────────────────────
let state = {
  mode: null,       // 'cap-flag' | 'flag-cap'
  continent: 'all',
  pool: [],
  session: [],
  index: 0,
  score: 0,
  answered: false,
  correctCountry: null,
};

// ─── NAVIGATION ──────────────────────────────────────────────────
window.showScreen = function(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
};

// ─── SÉLECTION MODE ──────────────────────────────────────────────
window.selectMode = function(mode) {
  state.mode = mode;
  document.getElementById('cont-title').textContent =
    mode === 'cap-flag' ? '🏙️ → 🏳️ Choisir une région' : '🏳️ → 🏙️ Choisir une région';
  buildContinentGrid();
  showScreen('screen-continent');
};

// ─── GRILLE CONTINENTS ───────────────────────────────────────────
function buildContinentGrid() {
  const grid = document.getElementById('cont-grid');
  grid.innerHTML = '';
  CONTINENTS.forEach(cont => {
    const pool = cont.id === 'all' ? COUNTRIES : COUNTRIES.filter(c => c.c === cont.id);
    const btn = document.createElement('button');
    btn.className = 'cont-btn';
    btn.innerHTML = `
      <span class="cont-icon">${cont.icon}</span>
      <span class="cont-name">${cont.name}</span>
      <span class="cont-count">${pool.length} pays</span>`;
    btn.onclick = () => startGame(cont.id);
    grid.appendChild(btn);
  });
}

// ─── DÉMARRER ────────────────────────────────────────────────────
window.startGame = function(contId) {
  state.continent = contId;
  state.pool = contId === 'all' ? [...COUNTRIES] : COUNTRIES.filter(c => c.c === contId);
  state.session = shuffle(state.pool).slice(0, QUESTIONS_PER_GAME);
  state.index = 0;
  state.score = 0;
  state.answered = false;

  if (state.mode === 'cap-flag') {
    showScreen('screen-capflag');
    buildCapFlagQuestion();
  } else {
    showScreen('screen-flagcap');
    buildFlagCapQuestion();
  }
};

// ─── MODE CAPITALE → DRAPEAU ─────────────────────────────────────
function buildCapFlagQuestion() {
  const correct = state.session[state.index];
  state.correctCountry = correct;
  state.answered = false;

  updateTopBar('cf', state.index, state.score);

  document.getElementById('cf-capital').textContent = correct.capital;
  document.getElementById('cf-hint').textContent = `Continent : ${getContinentName(correct.c)}`;
  document.getElementById('cf-feedback').className = 'feedback-cx';
  document.getElementById('cf-feedback').textContent = '';
  document.getElementById('cf-next').disabled = true;
  document.getElementById('cf-next').textContent = 'Suivant →';

  // 4 drapeaux (1 correct + 3 faux)
  const wrongs = shuffle(state.pool.filter(c => c.code !== correct.code)).slice(0, 3);
  const options = shuffle([correct, ...wrongs]);

  const container = document.getElementById('cf-flags');
  container.innerHTML = '';
  options.forEach(country => {
    const btn = document.createElement('button');
    btn.className = 'flag-choice';
    btn.dataset.code = country.code;
    btn.innerHTML = `<img src="${flagUrl(country.code)}" alt="${country.name}" loading="lazy" />`;
    btn.onclick = () => handleCapFlagAnswer(btn, country.code, correct.code, correct.name);
    container.appendChild(btn);
  });
}

function handleCapFlagAnswer(btn, chosen, correctCode, correctName) {
  if (state.answered) return;
  state.answered = true;
  const isOk = chosen === correctCode;

  document.querySelectorAll('.flag-choice').forEach(b => {
    b.disabled = true;
    if (b.dataset.code === correctCode) b.classList.add('correct');
    else if (b.dataset.code === chosen && !isOk) b.classList.add('wrong');
  });

  if (isOk) state.score++;
  showFeedback('cf', isOk, correctName);
}

// ─── MODE DRAPEAU → CAPITALE ─────────────────────────────────────
function buildFlagCapQuestion() {
  const correct = state.session[state.index];
  state.correctCountry = correct;
  state.answered = false;

  updateTopBar('fc', state.index, state.score);

  // Charger le drapeau
  const img = document.getElementById('fc-flag');
  img.style.opacity = '0';
  img.onload = () => { img.style.opacity = '1'; };
  img.src = flagUrl(correct.code);

  document.getElementById('fc-feedback').className = 'feedback-cx';
  document.getElementById('fc-feedback').textContent = '';
  document.getElementById('fc-next').disabled = true;
  document.getElementById('fc-next').textContent = 'Suivant →';

  // 4 capitales (1 correcte + 3 fausses)
  const wrongs = shuffle(state.pool.filter(c => c.code !== correct.code)).slice(0, 3);
  const options = shuffle([correct, ...wrongs]);

  const container = document.getElementById('fc-options');
  container.innerHTML = '';
  options.forEach(country => {
    const btn = document.createElement('button');
    btn.className = 'cap-btn';
    btn.textContent = country.capital;
    btn.dataset.code = country.code;
    btn.onclick = () => handleFlagCapAnswer(btn, country.code, correct.code, correct.capital, correct.name);
    container.appendChild(btn);
  });
}

function handleFlagCapAnswer(btn, chosen, correctCode, correctCapital, correctName) {
  if (state.answered) return;
  state.answered = true;
  const isOk = chosen === correctCode;

  document.querySelectorAll('.cap-btn').forEach(b => {
    b.disabled = true;
    if (b.dataset.code === correctCode) b.classList.add('correct');
    else if (b.dataset.code === chosen && !isOk) b.classList.add('wrong');
  });

  if (isOk) state.score++;
  showFeedback('fc', isOk, `${correctName} → ${correctCapital}`);
}

// ─── HELPERS ─────────────────────────────────────────────────────
function updateTopBar(prefix, idx, score) {
  document.getElementById(`${prefix}-counter`).textContent = `${idx + 1}/${QUESTIONS_PER_GAME}`;
  document.getElementById(`${prefix}-score`).textContent = `${score} pts`;
  document.getElementById(`${prefix}-progress`).style.width = `${(idx / QUESTIONS_PER_GAME) * 100}%`;
}

function showFeedback(prefix, isOk, info) {
  const fb = document.getElementById(`${prefix}-feedback`);
  fb.className = `feedback-cx show ${isOk ? 'ok' : 'bad'}`;
  fb.textContent = isOk ? `✓ Correct ! ${info}` : `✗ Incorrect. La bonne réponse : ${info}`;
  const btn = document.getElementById(`${prefix}-next`);
  const isLast = state.index >= QUESTIONS_PER_GAME - 1;
  btn.textContent = isLast ? 'Voir les résultats →' : 'Suivant →';
  btn.disabled = false;
}

function getContinentName(c) {
  const map = {af:'Afrique',am:'Amériques',as:'Asie',eu:'Europe',oc:'Océanie'};
  return map[c] || c;
}

// ─── QUESTION SUIVANTE ───────────────────────────────────────────
window.nextQ = function(which) {
  if (state.index >= QUESTIONS_PER_GAME - 1) {
    showResult();
    return;
  }
  state.index++;
  if (which === 'capflag') buildCapFlagQuestion();
  else buildFlagCapQuestion();
};

// ─── RÉSULTAT ────────────────────────────────────────────────────
function showResult() {
  const s = state.score;
  const pct = s / QUESTIONS_PER_GAME;
  let emoji, title, sub;
  if (pct === 1)      { emoji='🏆'; title='Score parfait !'; sub='Excellent ! Vous maîtrisez les deux !'; }
  else if (pct >= .8) { emoji='🎉'; title='Excellent !'; sub='Très bonne maîtrise !'; }
  else if (pct >= .5) { emoji='👍'; title='Pas mal !'; sub='Continuez à vous entraîner !'; }
  else                { emoji='📚'; title='À améliorer…'; sub='Révisez et recommencez !'; }

  document.getElementById('res-emoji').textContent = emoji;
  document.getElementById('res-title').textContent = title;
  document.getElementById('res-sub').textContent = sub;
  document.getElementById('res-score').textContent = s;

  const offset = 327 * (1 - pct);
  setTimeout(() => { document.getElementById('res-ring').style.strokeDashoffset = offset; }, 100);
  showScreen('screen-result');
}

window.replayGame = function() {
  document.getElementById('res-ring').style.strokeDashoffset = '327';
  startGame(state.continent);
};
