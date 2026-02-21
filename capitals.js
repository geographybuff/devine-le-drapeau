"use strict";
/* ================================================================
   JEU DE LA CAPITALE — capitals.js  v1
   195 pays ONU · 6 modes de jeu · localStorage records
================================================================ */

// ─────────────────────────────────────────────────────────────────
//  COUNTRIES  (code ISO, nom français, capitale, continent)
// ─────────────────────────────────────────────────────────────────
const COUNTRIES = [
  // ── AFRIQUE ──────────────────────────────────────────────────
  {code:"dz",name:"Algérie",capital:"Alger",c:"af"},
  {code:"ao",name:"Angola",capital:"Luanda",c:"af"},
  {code:"bj",name:"Bénin",capital:"Porto-Novo",c:"af"},
  {code:"bw",name:"Botswana",capital:"Gaborone",c:"af"},
  {code:"bf",name:"Burkina Faso",capital:"Ouagadougou",c:"af"},
  {code:"bi",name:"Burundi",capital:"Gitega",c:"af"},
  {code:"cv",name:"Cap-Vert",capital:"Praia",c:"af"},
  {code:"cm",name:"Cameroun",capital:"Yaoundé",c:"af"},
  {code:"cf",name:"République centrafricaine",capital:"Bangui",c:"af"},
  {code:"td",name:"Tchad",capital:"N'Djaména",c:"af"},
  {code:"km",name:"Comores",capital:"Moroni",c:"af"},
  {code:"cg",name:"République du Congo",capital:"Brazzaville",c:"af"},
  {code:"cd",name:"R.D. du Congo",capital:"Kinshasa",c:"af"},
  {code:"dj",name:"Djibouti",capital:"Djibouti",c:"af"},
  {code:"eg",name:"Égypte",capital:"Le Caire",c:"af"},
  {code:"gq",name:"Guinée équatoriale",capital:"Malabo",c:"af"},
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
  {code:"st",name:"Sao Tomé-et-Principe",capital:"São Tomé",c:"af"},
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

  // ── AMÉRIQUES ─────────────────────────────────────────────────
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
  {code:"do",name:"République dominicaine",capital:"Saint-Domingue",c:"am"},
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
  {code:"kn",name:"Saint-Kitts-et-Nevis",capital:"Basseterre",c:"am"},
  {code:"lc",name:"Sainte-Lucie",capital:"Castries",c:"am"},
  {code:"vc",name:"Saint-Vincent-et-les-Grenadines",capital:"Kingstown",c:"am"},
  {code:"sr",name:"Suriname",capital:"Paramaribo",c:"am"},
  {code:"tt",name:"Trinité-et-Tobago",capital:"Port of Spain",c:"am"},
  {code:"us",name:"États-Unis",capital:"Washington D.C.",c:"am"},
  {code:"uy",name:"Uruguay",capital:"Montevideo",c:"am"},
  {code:"ve",name:"Venezuela",capital:"Caracas",c:"am"},

  // ── ASIE ──────────────────────────────────────────────────────
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
  {code:"ae",name:"Émirats arabes unis",capital:"Abou Dabi",c:"as"},
  {code:"uz",name:"Ouzbékistan",capital:"Tachkent",c:"as"},
  {code:"vn",name:"Viêt Nam",capital:"Hanoï",c:"as"},
  {code:"ye",name:"Yémen",capital:"Sanaa",c:"as"},
  {code:"ps",name:"Palestine",capital:"Ramallah",c:"as"},

  // ── EUROPE ────────────────────────────────────────────────────
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

  // ── OCÉANIE ───────────────────────────────────────────────────
  {code:"au",name:"Australie",capital:"Canberra",c:"oc"},
  {code:"fj",name:"Fidji",capital:"Suva",c:"oc"},
  {code:"ki",name:"Kiribati",capital:"Tarawa",c:"oc"},
  {code:"mh",name:"Îles Marshall",capital:"Majuro",c:"oc"},
  {code:"fm",name:"Micronésie",capital:"Palikir",c:"oc"},
  {code:"nr",name:"Nauru",capital:"Yaren",c:"oc"},
  {code:"nz",name:"Nouvelle-Zélande",capital:"Wellington",c:"oc"},
  {code:"pw",name:"Palaos",capital:"Ngerulmud",c:"oc"},
  {code:"pg",name:"Papouasie-Nouvelle-Guinée",capital:"Port Moresby",c:"oc"},
  {code:"ws",name:"Samoa",capital:"Apia",c:"oc"},
  {code:"sb",name:"Îles Salomon",capital:"Honiara",c:"oc"},
  {code:"to",name:"Tonga",capital:"Nuku'alofa",c:"oc"},
  {code:"tv",name:"Tuvalu",capital:"Funafuti",c:"oc"},
  {code:"vu",name:"Vanuatu",capital:"Port-Vila",c:"oc"},
];

// ─────────────────────────────────────────────────────────────────
//  CONTINENTS CONFIG
// ─────────────────────────────────────────────────────────────────
const CONTINENTS = [
  {id:"all", name:"Monde entier",  icon:"🌐"},
  {id:"af",  name:"Afrique",       icon:"🌍"},
  {id:"am",  name:"Amériques",     icon:"🌎"},
  {id:"as",  name:"Asie",          icon:"🌏"},
  {id:"eu",  name:"Europe",        icon:"🏰"},
  {id:"oc",  name:"Océanie",       icon:"🏝️"},
];

// ─────────────────────────────────────────────────────────────────
//  MODES CONFIG
// ─────────────────────────────────────────────────────────────────
const MODES = [
  {
    id:"classic",
    name:"Classique",
    icon:"🎯",
    desc:"10 questions — un pays, 4 capitales proposées. Trouvez la bonne.",
    tags:["10 questions","4 choix"],
  },
  {
    id:"chrono",
    name:"Chrono",
    icon:"⏱️",
    desc:"60 secondes pour marquer le plus de points. Enchaînez les bonnes réponses !",
    tags:["60 secondes","Vitesse"],
    warn:true,
  },
  {
    id:"survival",
    name:"Survie",
    icon:"❤️",
    desc:"Répondez correctement autant de fois que possible. Une erreur = fin de partie.",
    tags:["Sans limite","1 vie"],
    warn:true,
  },
  {
    id:"hardcore",
    name:"Hardcore",
    icon:"⌨️",
    desc:"Aucun choix proposé : tapez le nom de la capitale. Petites fautes tolérées.",
    tags:["10 questions","Saisie libre","Tolérance fautes"],
    warn:true,
  },
  {
    id:"reverse",
    name:"Capitale Inversée",
    icon:"🔄",
    desc:"La capitale est affichée. Trouvez le pays correspondant parmi 4 propositions.",
    tags:["10 questions","4 pays"],
  },
  {
    id:"infini",
    name:"Infini",
    icon:"♾️",
    desc:"Questions sans fin jusqu'à ce que vous décidiez de rentrer. Score illimité.",
    tags:["Sans limite","4 choix","Libre"],
  },
];

// ─────────────────────────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────────────────────────
const flagUrl = code => `https://flagcdn.com/w80/${code}.png`;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickN(pool, n, exclude = []) {
  return shuffle(pool.filter(x => !exclude.includes(x))).slice(0, n);
}

function normalize(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
}
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({length:m+1},(_,i)=>Array.from({length:n+1},(_,j)=>i===0?j:j===0?i:0));
  for (let i=1;i<=m;i++) for (let j=1;j<=n;j++)
    dp[i][j] = a[i-1]===b[j-1]?dp[i-1][j-1]:1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);
  return dp[m][n];
}
function typoTolerance(name) {
  const l = name.length;
  if (l <= 4) return 0;
  if (l <= 7) return 1;
  if (l <= 12) return 2;
  return 3;
}

// ─────────────────────────────────────────────────────────────────
//  LOCALSTORAGE
// ─────────────────────────────────────────────────────────────────
const LS_KEY = "cap_records_v1";
function loadRecords() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch { return {}; }
}
function saveRecords(r) { localStorage.setItem(LS_KEY, JSON.stringify(r)); }
function getRecord(continent, mode) { return loadRecords()[`${continent}_${mode}`] ?? 0; }
function setRecord(continent, mode, value) {
  const r = loadRecords();
  const key = `${continent}_${mode}`;
  const isNew = value > (r[key] ?? 0);
  if (isNew) { r[key] = value; saveRecords(r); }
  return isNew;
}

// ─────────────────────────────────────────────────────────────────
//  GAME STATE
// ─────────────────────────────────────────────────────────────────
const state = {
  continent:"all", mode:"classic",
  pool:[], session:[],
  questionIndex:0, score:0, wrongAnswers:0, totalAnswered:0,
  answered:false, correctCountry:null,
  streak:0,
  chronoTotal:60, chronoLeft:60, chronoInterval:null,
};
const QUESTIONS_PER_GAME = 10;
const CHRONO_DURATION    = 60;

// ─────────────────────────────────────────────────────────────────
//  DOM SHORTCUTS
// ─────────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);

const screens = {
  welcome:   $("screen-welcome"),
  continent: $("screen-continent"),
  mode:      $("screen-mode"),
  game:      $("screen-game"),
  results:   $("screen-results"),
};

function showScreen(name) {
  Object.entries(screens).forEach(([k,el]) => el.classList.toggle("active", k===name));
}

// ─────────────────────────────────────────────────────────────────
//  BUILD CONTINENT GRID
// ─────────────────────────────────────────────────────────────────
function buildContinentGrid() {
  const grid = $("continent-grid");
  grid.innerHTML = "";
  CONTINENTS.forEach(cont => {
    const pool = cont.id==="all" ? COUNTRIES : COUNTRIES.filter(c=>c.c===cont.id);
    const card = document.createElement("button");
    card.className = "continent-card";
    card.dataset.id = cont.id;
    card.innerHTML = `
      <span class="continent-icon">${cont.icon}</span>
      <span class="continent-name">${cont.name}</span>
      <span class="continent-count">${pool.length} pays</span>`;
    card.addEventListener("click", () => selectContinent(cont.id));
    grid.appendChild(card);
  });
}

function selectContinent(id) {
  state.continent = id;
  const cont = CONTINENTS.find(c=>c.id===id);
  state.pool = id==="all" ? [...COUNTRIES] : COUNTRIES.filter(c=>c.c===id);
  $("mode-continent-pill").innerHTML = `${cont.icon} ${cont.name} — ${state.pool.length} pays`;
  document.querySelectorAll(".continent-card").forEach(c=>c.classList.toggle("selected",c.dataset.id===id));
  showScreen("mode");
}

// ─────────────────────────────────────────────────────────────────
//  BUILD MODE GRID
// ─────────────────────────────────────────────────────────────────
function buildModeGrid() {
  const grid = $("mode-grid");
  grid.innerHTML = "";
  MODES.forEach(m => {
    const card = document.createElement("button");
    card.className = "mode-card";
    card.dataset.id = m.id;
    const tagsHtml = m.tags.map(t=>`<span class="mode-tag-pill${m.warn?" warn":""}">${t}</span>`).join("");
    card.innerHTML = `
      <span class="mode-icon">${m.icon}</span>
      <span class="mode-info">
        <span class="mode-name">${m.name}</span>
        <span class="mode-desc">${m.desc}</span>
        <span class="mode-tags">${tagsHtml}</span>
      </span>
      <span class="mode-arrow">›</span>`;
    card.addEventListener("click", () => { state.mode = m.id; startGame(); });
    grid.appendChild(card);
  });
}

// ─────────────────────────────────────────────────────────────────
//  CONFIGURE GAME UI
// ─────────────────────────────────────────────────────────────────
function configureGameUI() {
  const m = state.mode;
  const isReverse  = m === "reverse";
  const isHardcore = m === "hardcore";

  $("zone-standard").classList.toggle("hidden", isReverse);
  $("zone-reverse").classList.toggle("hidden",  !isReverse);
  $("zone-hardcore").classList.toggle("hidden", !isHardcore);
  $("answers-grid").classList.toggle("hidden",  isHardcore);

  $("streak-bar").classList.toggle("show",     m === "survival");
  $("chrono-wrap").classList.toggle("show",    m === "chrono");
  $("progress-bar-wrap").classList.toggle("hidden", m==="survival"||m==="chrono"||m==="infini");

  const mCfg = MODES.find(x=>x.id===m);
  $("game-mode-tag").textContent = mCfg ? mCfg.icon+" "+mCfg.name : "";

  $("btn-infini-home").classList.toggle("hidden", m !== "infini");
}

// ─────────────────────────────────────────────────────────────────
//  START GAME
// ─────────────────────────────────────────────────────────────────
function startGame() {
  state.questionIndex = 0;
  state.score         = 0;
  state.wrongAnswers  = 0;
  state.totalAnswered = 0;
  state.answered      = false;
  state.streak        = 0;
  clearInterval(state.chronoInterval);
  state.chronoLeft = CHRONO_DURATION;

  const isInfinite = ["survival","chrono","infini"].includes(state.mode);
  state.session = pickN(state.pool, isInfinite ? Math.min(200, state.pool.length) : QUESTIONS_PER_GAME);

  $("score-value").textContent = "0";
  $("ring-fill").style.strokeDashoffset = "327";
  $("progress-bar").style.width = "0%";
  $("chrono-bar").style.width = "100%";
  $("chrono-bar").classList.remove("warn");
  $("chrono-time").textContent = CHRONO_DURATION;
  $("streak-count").textContent = "0";
  $("streak-record-val").textContent = getRecord(state.continent, "survival");

  configureGameUI();
  showScreen("game");
  buildQuestion(0);
  if (state.mode === "chrono") startChrono();
}

// ─────────────────────────────────────────────────────────────────
//  CHRONO TIMER
// ─────────────────────────────────────────────────────────────────
function startChrono() {
  state.chronoInterval = setInterval(() => {
    state.chronoLeft--;
    $("chrono-time").textContent = state.chronoLeft;
    $("chrono-bar").style.width = (state.chronoLeft / CHRONO_DURATION * 100) + "%";
    if (state.chronoLeft <= 15) $("chrono-bar").classList.add("warn");
    if (state.chronoLeft <= 0) { clearInterval(state.chronoInterval); showResults(); }
  }, 1000);
}

// ─────────────────────────────────────────────────────────────────
//  BUILD QUESTION
// ─────────────────────────────────────────────────────────────────
function buildQuestion(index) {
  const country = state.session[index];
  state.correctCountry = country;
  state.answered = false;

  // Counter
  if (state.mode === "survival") {
    $("question-counter").textContent = `${state.streak} bonne${state.streak!==1?"s":""}`;
  } else if (state.mode === "chrono") {
    $("question-counter").textContent = `#${index+1}`;
  } else {
    const shown = Math.min(index+1, QUESTIONS_PER_GAME);
    $("question-counter").textContent = `${shown} / ${QUESTIONS_PER_GAME}`;
    $("progress-bar").style.width = (index / QUESTIONS_PER_GAME * 100) + "%";
  }

  $("feedback-banner").className = "feedback-banner";
  $("btn-next").disabled = true;

  // ── REVERSE mode: show capital, pick country ──────────────────
  if (state.mode === "reverse") {
    $("reverse-capital-name").textContent = country.capital;
    const wrongs  = pickN(state.pool, 3, [country]);
    const options = shuffle([country, ...wrongs]);
    const btns = document.querySelectorAll(".answer-btn");
    btns.forEach((btn, i) => {
      btn.textContent  = options[i].name;
      btn.dataset.code = options[i].code;
      btn.dataset.capital = options[i].capital;
      btn.className = "answer-btn";
      btn.disabled  = false;
    });
    return;
  }

  // ── HARDCORE mode: show country, type capital ─────────────────
  if (state.mode === "hardcore") {
    $("cap-country-name").textContent = country.name;
    $("cap-question-label").textContent = "Quelle est la capitale de…";
    setFlagHint(country.code);
    const tol = typoTolerance(country.capital);
    $("hc-tol-badge").textContent = tol > 0 ? `±${tol} fautes tolérées` : "Orthographe exacte";
    const inp = $("hardcore-input");
    inp.value = ""; inp.className = "hardcore-input"; inp.disabled = false;
    $("btn-hc-submit").disabled = false;
    setTimeout(() => inp.focus(), 100);
    return;
  }

  // ── STANDARD modes (classic, survival, chrono, infini) ────────
  $("cap-country-name").textContent = country.name;
  $("cap-question-label").textContent = "Quelle est la capitale de…";
  setFlagHint(country.code);

  const wrongs  = pickN(state.pool, 3, [country]);
  const options = shuffle([country, ...wrongs]);
  const btns = document.querySelectorAll(".answer-btn");
  btns.forEach((btn, i) => {
    btn.textContent     = options[i].capital;
    btn.dataset.code    = options[i].code;
    btn.dataset.capital = options[i].capital;
    btn.className = "answer-btn";
    btn.disabled  = false;
  });
}

function setFlagHint(code) {
  const hint = $("cap-flag-hint");
  if (!hint) return;
  const img = new Image();
  img.src = flagUrl(code);
  img.onload = () => { hint.textContent = ""; hint.style.backgroundImage=`url(${img.src})`; };
  img.onerror = () => { hint.textContent = ""; };
  // Use emoji flag via regional indicators as fallback
  const codePoints = code.toUpperCase().split("").map(c => 127397 + c.charCodeAt(0));
  hint.textContent = String.fromCodePoint(...codePoints);
}

// ─────────────────────────────────────────────────────────────────
//  RESOLVE ANSWER
// ─────────────────────────────────────────────────────────────────
function resolveAnswer(isCorrect, correctCapital, closeEnough = false) {
  if (state.answered) return;
  state.answered = true;
  state.totalAnswered++;

  const fb = $("feedback-banner");

  if (isCorrect) {
    state.score++;
    $("score-value").textContent = state.score;
    if (state.mode === "survival") {
      state.streak++;
      $("streak-count").textContent = state.streak;
    }
    fb.classList.add("show", "correct");
    $("feedback-icon").textContent = "✓";
    $("feedback-text").textContent = closeEnough
      ? `Proche ! La réponse est ${correctCapital}.`
      : `Correct ! La capitale est ${correctCapital}.`;
  } else {
    state.wrongAnswers++;
    fb.classList.add("show", "incorrect");
    $("feedback-icon").textContent = "✗";
    $("feedback-text").textContent = `La capitale est ${correctCapital}.`;
    if (state.mode === "survival") {
      $("btn-next").textContent = "Voir les résultats →";
      $("btn-next").disabled = false;
      return;
    }
  }

  const isFinite = ["classic","hardcore","reverse"].includes(state.mode);
  const isLast   = isFinite && state.questionIndex >= QUESTIONS_PER_GAME - 1;

  if (state.mode === "chrono") {
    setTimeout(nextQuestion, 900);
  } else {
    $("btn-next").textContent = isLast ? "Voir les résultats →" : "Suivant →";
    if (state.mode === "infini") $("btn-next").textContent = "Suivant →";
    $("btn-next").disabled = false;
  }
}

// ─────────────────────────────────────────────────────────────────
//  ANSWER EVENTS
// ─────────────────────────────────────────────────────────────────
document.querySelectorAll(".answer-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (state.answered) return;
    const chosen  = btn.dataset.code;
    const correct = state.correctCountry.code;
    const isOk    = chosen === correct;

    document.querySelectorAll(".answer-btn").forEach(b => { b.disabled = true; });
    btn.classList.add(isOk ? "correct" : "incorrect");
    if (!isOk) {
      document.querySelectorAll(".answer-btn").forEach(b => {
        if (b.dataset.code === correct) b.classList.add("correct");
      });
    }
    // The "correct answer" text differs by mode
    const correctAnswer = state.mode === "reverse"
      ? state.correctCountry.name
      : state.correctCountry.capital;
    resolveAnswer(isOk, correctAnswer);
  });
});

// ── Hardcore submit ──
function submitHardcore() {
  if (state.answered) return;
  const inp   = $("hardcore-input");
  const typed = inp.value.trim();
  if (!typed) return;

  const correctCapital = state.correctCountry.capital;
  const dist  = levenshtein(normalize(typed), normalize(correctCapital));
  const tol   = typoTolerance(correctCapital);
  const close = dist > 0 && dist <= tol;
  const isOk  = dist === 0 || close;

  inp.disabled = true;
  $("btn-hc-submit").disabled = true;
  inp.classList.add(isOk ? "ok" : "bad");
  document.querySelectorAll(".answer-btn").forEach(b => { b.disabled = true; });
  resolveAnswer(isOk, correctCapital, close);
}
$("btn-hc-submit").addEventListener("click", submitHardcore);
$("hardcore-input").addEventListener("keydown", e => { if (e.key==="Enter") submitHardcore(); });

// ─────────────────────────────────────────────────────────────────
//  NEXT QUESTION
// ─────────────────────────────────────────────────────────────────
function nextQuestion() {
  $("feedback-banner").className = "feedback-banner";

  if (state.mode === "survival" && state.wrongAnswers > 0) { showResults(); return; }

  if (["classic","hardcore","reverse"].includes(state.mode)) {
    if (state.questionIndex >= QUESTIONS_PER_GAME - 1) { showResults(); return; }
  }

  // Replenish for infinite modes
  if (state.questionIndex >= state.session.length - 2) {
    state.session.push(...pickN(state.pool, 20, state.session));
  }

  state.questionIndex++;
  state.answered = false;
  buildQuestion(state.questionIndex);
}

$("btn-next").addEventListener("click", nextQuestion);

// Infini home button
$("btn-infini-home").addEventListener("click", () => {
  clearInterval(state.chronoInterval);
  showResults();
});

// ─────────────────────────────────────────────────────────────────
//  SHOW RESULTS
// ─────────────────────────────────────────────────────────────────
function showResults() {
  clearInterval(state.chronoInterval);

  if (["classic","hardcore","reverse"].includes(state.mode))
    $("progress-bar").style.width = "100%";

  const m     = state.mode;
  const score = state.score;
  const total = ["classic","hardcore","reverse"].includes(m) ? QUESTIONS_PER_GAME : state.totalAnswered;
  const pct   = total > 0 ? score / total : 0;

  $("score-circle").classList.toggle("hidden",   m === "survival");
  $("survival-result").classList.toggle("show",  m === "survival");
  $("results-stats").classList.toggle("hidden",  m === "survival");
  $("chrono-result").classList.toggle("show",    m === "chrono");
  $("new-record-badge").classList.remove("show");

  if (m === "infini") $("score-circle").classList.remove("hidden");

  // Emoji + title
  let emoji="🏆", title="Partie terminée !";
  if (m === "survival") {
    emoji = state.streak>=20?"🔥":state.streak>=10?"💪":"😤";
  } else if (m === "infini") {
    emoji = score>=50?"🔥":score>=20?"🎉":"🏙️";
    title = "Session terminée !";
  } else if (pct===1) { emoji="🏆"; title="Score parfait !"; }
  else if (pct>=.8)   { emoji="🎉"; title="Excellent !"; }
  else if (pct>=.5)   { emoji="👍"; title="Pas mal !"; }
  else                 { emoji="📚"; title="Continuez !"; }

  $("results-emoji").textContent = emoji;
  $("results-title").textContent = title;

  const subs = {
    classic:  pct>=1?"Toutes les capitales connues !":pct>=.8?"Très bonne géographie !":pct>=.5?"Encore un peu d'entraînement !":"La géographie, ça s'apprend !",
    chrono:   `${score} bonne${score!==1?"s":""} réponse${score!==1?"s":""} en ${CHRONO_DURATION}s.`,
    survival: `${state.streak} bonne${state.streak!==1?"s":""} réponse${state.streak!==1?"s":""} enchaînée${state.streak!==1?"s":""} !`,
    hardcore: pct>=1?"Parfait ! Toutes les capitales bien orthographiées.":pct>=.5?"Bonne mémoire des capitales !":"L'orthographe des capitales, ça s'entraîne !",
    reverse:  pct>=1?"Vous associez parfaitement capitales et pays !":pct>=.5?"Bon sens de l'orientation !":"Continuez à mémoriser les capitales.",
    infini:   `${score} bonne${score!==1?"s":""} réponse${score!==1?"s":""} sur ${total} question${total!==1?"s":""}. Bien joué !`,
  };
  $("results-subtitle").textContent = subs[m] || "";

  if (m === "survival") {
    $("survival-streak").textContent = state.streak;
    const isNewRec = setRecord(state.continent, "survival", state.streak);
    $("survival-record-display").textContent = getRecord(state.continent, "survival");
    if (isNewRec && state.streak > 0) $("new-record-badge").classList.add("show");
  }

  if (m !== "survival") {
    $("final-score").textContent = score;
    $("final-total").textContent = `/${total}`;
    $("stat-correct").textContent   = `${score} correcte${score!==1?"s":""}`;
    $("stat-incorrect").textContent = `${total-score} incorrecte${(total-score)!==1?"s":""}`;
    const circ = 2*Math.PI*52;
    const ringPct = m==="infini" ? Math.min(score/Math.max(total,1),1) : pct;
    setTimeout(() => { $("ring-fill").style.strokeDashoffset = circ*(1-ringPct); }, 100);

    if (["classic","hardcore","reverse","infini"].includes(m)) {
      const isNewRec = setRecord(state.continent, m, score);
      if (isNewRec && score > 0) $("new-record-badge").classList.add("show");
    }
  }

  if (m === "chrono") {
    const elapsed = CHRONO_DURATION - state.chronoLeft;
    const rate = elapsed > 0 ? (score/elapsed*60).toFixed(1) : "—";
    const acc  = state.totalAnswered > 0 ? Math.round(score/state.totalAnswered*100) : 0;
    $("chrono-stat-speed").textContent = `${rate} rép/min`;
    $("chrono-stat-acc").textContent   = `${acc} % précision`;
    const isNewRec = setRecord(state.continent, "chrono", score);
    if (isNewRec && score > 0) $("new-record-badge").classList.add("show");
  }

  showScreen("results");
}

// ─────────────────────────────────────────────────────────────────
//  RESULT & NAV BUTTONS
// ─────────────────────────────────────────────────────────────────
$("btn-play-again").addEventListener("click", () => {
  $("ring-fill").style.strokeDashoffset = "327";
  startGame();
});
$("btn-change-mode").addEventListener("click", () => showScreen("mode"));
$("btn-home").addEventListener("click", () => { window.location.href = "index.html"; });

$("btn-start").addEventListener("click", () => showScreen("continent"));
$("btn-back-from-continent").addEventListener("click", () => showScreen("welcome"));
$("btn-back-from-mode").addEventListener("click", () => showScreen("continent"));
$("btn-quit-game").addEventListener("click", () => {
  clearInterval(state.chronoInterval);
  showScreen("mode");
});

// ─────────────────────────────────────────────────────────────────
//  KEYBOARD SHORTCUTS
// ─────────────────────────────────────────────────────────────────
document.addEventListener("keydown", e => {
  if (state.mode === "hardcore") return;
  const key = e.key;
  const ansMap = {"1":0,"2":1,"3":2,"4":3};
  if (key in ansMap && screens.game.classList.contains("active")) {
    const btn = document.querySelectorAll(".answer-btn")[ansMap[key]];
    if (btn && !btn.disabled) btn.click();
  }
  if ((key==="Enter"||key===" ") && !$("btn-next").disabled
      && screens.game.classList.contains("active")) {
    e.preventDefault(); $("btn-next").click();
  }
});

// ─────────────────────────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────────────────────────
buildContinentGrid();
buildModeGrid();
showScreen("welcome");
