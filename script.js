"use strict";
/* ================================================================
   DEVINE LE DRAPEAU — script.js  v2
   5 continents · 5 modes de jeu · localStorage records
================================================================ */

// ─────────────────────────────────────────────────────────────────
//  COUNTRIES  (195 pays ONU, code ISO 3166-1 α-2 + continent)
//  Continents : af=Afrique, am=Amériques, as=Asie, eu=Europe, oc=Océanie
// ─────────────────────────────────────────────────────────────────
const COUNTRIES = [
  // ── AFRIQUE (54) ──────────────────────────────────────────────
  {code:"dz",name:"Algérie",c:"af"},
  {code:"ao",name:"Angola",c:"af"},
  {code:"bj",name:"Bénin",c:"af"},
  {code:"bw",name:"Botswana",c:"af"},
  {code:"bf",name:"Burkina Faso",c:"af"},
  {code:"bi",name:"Burundi",c:"af"},
  {code:"cv",name:"Cap-Vert",c:"af"},
  {code:"cm",name:"Cameroun",c:"af"},
  {code:"cf",name:"République centrafricaine",c:"af"},
  {code:"td",name:"Tchad",c:"af"},
  {code:"km",name:"Comores",c:"af"},
  {code:"cg",name:"République du Congo",c:"af"},
  {code:"cd",name:"R.D. du Congo",c:"af"},
  {code:"dj",name:"Djibouti",c:"af"},
  {code:"eg",name:"Égypte",c:"af"},
  {code:"gq",name:"Guinée équatoriale",c:"af"},
  {code:"er",name:"Érythrée",c:"af"},
  {code:"sz",name:"Eswatini",c:"af"},
  {code:"et",name:"Éthiopie",c:"af"},
  {code:"ga",name:"Gabon",c:"af"},
  {code:"gm",name:"Gambie",c:"af"},
  {code:"gh",name:"Ghana",c:"af"},
  {code:"gn",name:"Guinée",c:"af"},
  {code:"gw",name:"Guinée-Bissau",c:"af"},
  {code:"ci",name:"Côte d'Ivoire",c:"af"},
  {code:"ke",name:"Kenya",c:"af"},
  {code:"ls",name:"Lesotho",c:"af"},
  {code:"lr",name:"Libéria",c:"af"},
  {code:"ly",name:"Libye",c:"af"},
  {code:"mg",name:"Madagascar",c:"af"},
  {code:"mw",name:"Malawi",c:"af"},
  {code:"ml",name:"Mali",c:"af"},
  {code:"mr",name:"Mauritanie",c:"af"},
  {code:"mu",name:"Maurice",c:"af"},
  {code:"ma",name:"Maroc",c:"af"},
  {code:"mz",name:"Mozambique",c:"af"},
  {code:"na",name:"Namibie",c:"af"},
  {code:"ne",name:"Niger",c:"af"},
  {code:"ng",name:"Nigeria",c:"af"},
  {code:"rw",name:"Rwanda",c:"af"},
  {code:"st",name:"Sao Tomé-et-Principe",c:"af"},
  {code:"sn",name:"Sénégal",c:"af"},
  {code:"sc",name:"Seychelles",c:"af"},
  {code:"sl",name:"Sierra Leone",c:"af"},
  {code:"so",name:"Somalie",c:"af"},
  {code:"za",name:"Afrique du Sud",c:"af"},
  {code:"ss",name:"Soudan du Sud",c:"af"},
  {code:"sd",name:"Soudan",c:"af"},
  {code:"tz",name:"Tanzanie",c:"af"},
  {code:"tg",name:"Togo",c:"af"},
  {code:"tn",name:"Tunisie",c:"af"},
  {code:"ug",name:"Ouganda",c:"af"},
  {code:"zm",name:"Zambie",c:"af"},
  {code:"zw",name:"Zimbabwe",c:"af"},

  // ── AMÉRIQUES (35) ────────────────────────────────────────────
  {code:"ag",name:"Antigua-et-Barbuda",c:"am"},
  {code:"ar",name:"Argentine",c:"am"},
  {code:"bs",name:"Bahamas",c:"am"},
  {code:"bb",name:"Barbade",c:"am"},
  {code:"bz",name:"Belize",c:"am"},
  {code:"bo",name:"Bolivie",c:"am"},
  {code:"br",name:"Brésil",c:"am"},
  {code:"ca",name:"Canada",c:"am"},
  {code:"cl",name:"Chili",c:"am"},
  {code:"co",name:"Colombie",c:"am"},
  {code:"cr",name:"Costa Rica",c:"am"},
  {code:"cu",name:"Cuba",c:"am"},
  {code:"dm",name:"Dominique",c:"am"},
  {code:"do",name:"République dominicaine",c:"am"},
  {code:"ec",name:"Équateur",c:"am"},
  {code:"sv",name:"Salvador",c:"am"},
  {code:"gd",name:"Grenade",c:"am"},
  {code:"gt",name:"Guatemala",c:"am"},
  {code:"gy",name:"Guyana",c:"am"},
  {code:"ht",name:"Haïti",c:"am"},
  {code:"hn",name:"Honduras",c:"am"},
  {code:"jm",name:"Jamaïque",c:"am"},
  {code:"mx",name:"Mexique",c:"am"},
  {code:"ni",name:"Nicaragua",c:"am"},
  {code:"pa",name:"Panama",c:"am"},
  {code:"py",name:"Paraguay",c:"am"},
  {code:"pe",name:"Pérou",c:"am"},
  {code:"kn",name:"Saint-Kitts-et-Nevis",c:"am"},
  {code:"lc",name:"Sainte-Lucie",c:"am"},
  {code:"vc",name:"Saint-Vincent-et-les-Grenadines",c:"am"},
  {code:"sr",name:"Suriname",c:"am"},
  {code:"tt",name:"Trinité-et-Tobago",c:"am"},
  {code:"us",name:"États-Unis",c:"am"},
  {code:"uy",name:"Uruguay",c:"am"},
  {code:"ve",name:"Venezuela",c:"am"},

  // ── ASIE (48) ─────────────────────────────────────────────────
  {code:"af",name:"Afghanistan",c:"as"},
  {code:"am",name:"Arménie",c:"as"},
  {code:"az",name:"Azerbaïdjan",c:"as"},
  {code:"bh",name:"Bahreïn",c:"as"},
  {code:"bd",name:"Bangladesh",c:"as"},
  {code:"bt",name:"Bhoutan",c:"as"},
  {code:"bn",name:"Brunéi",c:"as"},
  {code:"kh",name:"Cambodge",c:"as"},
  {code:"cn",name:"Chine",c:"as"},
  {code:"cy",name:"Chypre",c:"as"},
  {code:"ge",name:"Géorgie",c:"as"},
  {code:"in",name:"Inde",c:"as"},
  {code:"id",name:"Indonésie",c:"as"},
  {code:"ir",name:"Iran",c:"as"},
  {code:"iq",name:"Irak",c:"as"},
  {code:"il",name:"Israël",c:"as"},
  {code:"jp",name:"Japon",c:"as"},
  {code:"jo",name:"Jordanie",c:"as"},
  {code:"kz",name:"Kazakhstan",c:"as"},
  {code:"kw",name:"Koweït",c:"as"},
  {code:"kg",name:"Kirghizistan",c:"as"},
  {code:"la",name:"Laos",c:"as"},
  {code:"lb",name:"Liban",c:"as"},
  {code:"my",name:"Malaisie",c:"as"},
  {code:"mv",name:"Maldives",c:"as"},
  {code:"mn",name:"Mongolie",c:"as"},
  {code:"mm",name:"Myanmar",c:"as"},
  {code:"np",name:"Népal",c:"as"},
  {code:"kp",name:"Corée du Nord",c:"as"},
  {code:"om",name:"Oman",c:"as"},
  {code:"pk",name:"Pakistan",c:"as"},
  {code:"ph",name:"Philippines",c:"as"},
  {code:"qa",name:"Qatar",c:"as"},
  {code:"sa",name:"Arabie saoudite",c:"as"},
  {code:"sg",name:"Singapour",c:"as"},
  {code:"kr",name:"Corée du Sud",c:"as"},
  {code:"lk",name:"Sri Lanka",c:"as"},
  {code:"sy",name:"Syrie",c:"as"},
  {code:"tw",name:"Taïwan",c:"as"},
  {code:"tj",name:"Tadjikistan",c:"as"},
  {code:"th",name:"Thaïlande",c:"as"},
  {code:"tl",name:"Timor oriental",c:"as"},
  {code:"tm",name:"Turkménistan",c:"as"},
  {code:"ae",name:"Émirats arabes unis",c:"as"},
  {code:"uz",name:"Ouzbékistan",c:"as"},
  {code:"vn",name:"Viêt Nam",c:"as"},
  {code:"ye",name:"Yémen",c:"as"},
  {code:"ps",name:"Palestine",c:"as"},

  // ── EUROPE (44) ───────────────────────────────────────────────
  {code:"al",name:"Albanie",c:"eu"},
  {code:"ad",name:"Andorre",c:"eu"},
  {code:"at",name:"Autriche",c:"eu"},
  {code:"by",name:"Biélorussie",c:"eu"},
  {code:"be",name:"Belgique",c:"eu"},
  {code:"ba",name:"Bosnie-Herzégovine",c:"eu"},
  {code:"bg",name:"Bulgarie",c:"eu"},
  {code:"hr",name:"Croatie",c:"eu"},
  {code:"cz",name:"Tchéquie",c:"eu"},
  {code:"dk",name:"Danemark",c:"eu"},
  {code:"ee",name:"Estonie",c:"eu"},
  {code:"fi",name:"Finlande",c:"eu"},
  {code:"fr",name:"France",c:"eu"},
  {code:"de",name:"Allemagne",c:"eu"},
  {code:"gr",name:"Grèce",c:"eu"},
  {code:"hu",name:"Hongrie",c:"eu"},
  {code:"is",name:"Islande",c:"eu"},
  {code:"ie",name:"Irlande",c:"eu"},
  {code:"it",name:"Italie",c:"eu"},
  {code:"lv",name:"Lettonie",c:"eu"},
  {code:"li",name:"Liechtenstein",c:"eu"},
  {code:"lt",name:"Lituanie",c:"eu"},
  {code:"lu",name:"Luxembourg",c:"eu"},
  {code:"mt",name:"Malte",c:"eu"},
  {code:"md",name:"Moldavie",c:"eu"},
  {code:"mc",name:"Monaco",c:"eu"},
  {code:"me",name:"Monténégro",c:"eu"},
  {code:"nl",name:"Pays-Bas",c:"eu"},
  {code:"mk",name:"Macédoine du Nord",c:"eu"},
  {code:"no",name:"Norvège",c:"eu"},
  {code:"pl",name:"Pologne",c:"eu"},
  {code:"pt",name:"Portugal",c:"eu"},
  {code:"ro",name:"Roumanie",c:"eu"},
  {code:"ru",name:"Russie",c:"eu"},
  {code:"sm",name:"Saint-Marin",c:"eu"},
  {code:"rs",name:"Serbie",c:"eu"},
  {code:"sk",name:"Slovaquie",c:"eu"},
  {code:"si",name:"Slovénie",c:"eu"},
  {code:"es",name:"Espagne",c:"eu"},
  {code:"se",name:"Suède",c:"eu"},
  {code:"ch",name:"Suisse",c:"eu"},
  {code:"ua",name:"Ukraine",c:"eu"},
  {code:"gb",name:"Royaume-Uni",c:"eu"},
  {code:"va",name:"Vatican",c:"eu"},

  // ── OCÉANIE (14) ──────────────────────────────────────────────
  {code:"au",name:"Australie",c:"oc"},
  {code:"fj",name:"Fidji",c:"oc"},
  {code:"ki",name:"Kiribati",c:"oc"},
  {code:"mh",name:"Îles Marshall",c:"oc"},
  {code:"fm",name:"Micronésie",c:"oc"},
  {code:"nr",name:"Nauru",c:"oc"},
  {code:"nz",name:"Nouvelle-Zélande",c:"oc"},
  {code:"pw",name:"Palaos",c:"oc"},
  {code:"pg",name:"Papouasie-Nouvelle-Guinée",c:"oc"},
  {code:"ws",name:"Samoa",c:"oc"},
  {code:"sb",name:"Îles Salomon",c:"oc"},
  {code:"to",name:"Tonga",c:"oc"},
  {code:"tv",name:"Tuvalu",c:"oc"},
  {code:"vu",name:"Vanuatu",c:"oc"},
];

// ─────────────────────────────────────────────────────────────────
//  CONTINENTS CONFIG
// ─────────────────────────────────────────────────────────────────
const CONTINENTS = [
  {id:"all", name:"Monde entier",  icon:"🌐", color:"#6c63ff"},
  {id:"af",  name:"Afrique",       icon:"🌍", color:"#f59e0b"},
  {id:"am",  name:"Amériques",     icon:"🌎", color:"#22c55e"},
  {id:"as",  name:"Asie",          icon:"🌏", color:"#3b82f6"},
  {id:"eu",  name:"Europe",        icon:"🏰", color:"#a78bfa"},
  {id:"oc",  name:"Océanie",       icon:"🏝️", color:"#06b6d4"},
];

// ─────────────────────────────────────────────────────────────────
//  MODES CONFIG
// ─────────────────────────────────────────────────────────────────
const MODES = [
  {
    id:"classic",
    name:"Classique",
    icon:"🎯",
    desc:"10 questions, 4 choix possibles. Le mode de base.",
    tags:["10 questions","4 choix"],
  },
  {
    id:"chrono",
    name:"Chrono",
    icon:"⏱️",
    desc:"60 secondes pour marquer un maximum de points. Chaque bonne réponse vaut +1.",
    tags:["60 secondes","Vitesse"],
    warn:true,
  },
  {
    id:"survival",
    name:"Survie",
    icon:"❤️",
    desc:"Réponds correctement autant de fois que possible. Une seule erreur = fin de partie.",
    tags:["Sans limite","1 vie"],
    warn:true,
  },
  {
    id:"hardcore",
    name:"Hardcore",
    icon:"⌨️",
    desc:"Aucun choix proposé : tapez le nom du pays. Petites fautes tolérées.",
    tags:["10 questions","Saisie libre","Tolérance fautes"],
    warn:true,
  },
  {
    id:"reverse",
    name:"Carte Inversée",
    icon:"🔄",
    desc:"Le nom du pays est affiché. Trouvez son drapeau parmi 4 propositions.",
    tags:["10 questions","4 drapeaux"],
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
const flagUrl = code => `https://flagcdn.com/w320/${code}.png`;

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

/** Levenshtein distance (case-insensitive, diacritics stripped) */
function normalize(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({length:m+1}, (_, i) =>
    Array.from({length:n+1}, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1]
        ? dp[i-1][j-1]
        : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}
function typoTolerance(name) {
  const l = name.length;
  if (l <= 4)  return 0;
  if (l <= 7)  return 1;
  if (l <= 11) return 2;
  return 3;
}

// ─────────────────────────────────────────────────────────────────
//  LOCALSTORAGE  helpers
// ─────────────────────────────────────────────────────────────────
const LS_KEY = "dtd_records_v2";

function loadRecords() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch { return {}; }
}
function saveRecords(r) {
  localStorage.setItem(LS_KEY, JSON.stringify(r));
}
function getRecord(continent, mode) {
  return loadRecords()[`${continent}_${mode}`] ?? 0;
}
function setRecord(continent, mode, value) {
  const r = loadRecords();
  const key = `${continent}_${mode}`;
  const prev = r[key] ?? 0;
  const isNew = value > prev;
  if (isNew) { r[key] = value; saveRecords(r); }
  return isNew;
}

// ─────────────────────────────────────────────────────────────────
//  GAME STATE
// ─────────────────────────────────────────────────────────────────
const state = {
  continent:      "all",
  mode:           "classic",
  pool:           [],       // countries available for this game
  session:        [],       // countries chosen for this run
  questionIndex:  0,
  score:          0,
  totalAnswered:  0,        // chronos: may differ from questionIndex
  wrongAnswers:   0,
  answered:       false,
  correctCountry: null,

  // survival
  streak:         0,

  // chrono
  chronoTotal:    60,
  chronoLeft:     60,
  chronoInterval: null,
  chronoStarted:  false,
};

const QUESTIONS_PER_GAME = 10;  // classic / hardcore / reverse
const CHRONO_DURATION     = 60; // seconds

// ─────────────────────────────────────────────────────────────────
//  DOM SHORTCUTS
// ─────────────────────────────────────────────────────────────────
const $  = id => document.getElementById(id);
const cl = (el, ...cs) => el.classList;

const screens = {
  welcome:   $("screen-welcome"),
  continent: $("screen-continent"),
  mode:      $("screen-mode"),
  game:      $("screen-game"),
  results:   $("screen-results"),
};

function showScreen(name) {
  Object.entries(screens).forEach(([k, el]) => el.classList.toggle("active", k === name));
}

// ─────────────────────────────────────────────────────────────────
//  BUILD CONTINENT GRID
// ─────────────────────────────────────────────────────────────────
function buildContinentGrid() {
  const grid = $("continent-grid");
  grid.innerHTML = "";
  CONTINENTS.forEach(cont => {
    const pool = cont.id === "all" ? COUNTRIES : COUNTRIES.filter(c => c.c === cont.id);
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
  const cont = CONTINENTS.find(c => c.id === id);
  state.pool = id === "all" ? [...COUNTRIES] : COUNTRIES.filter(c => c.c === id);

  // Update pill on mode screen
  $("mode-continent-pill").innerHTML = `${cont.icon} ${cont.name} — ${state.pool.length} pays`;

  // Highlight selected card
  document.querySelectorAll(".continent-card").forEach(c => c.classList.toggle("selected", c.dataset.id === id));
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
    const tagsHtml = m.tags.map(t =>
      `<span class="mode-tag-pill${m.warn ? " warn" : ""}">${t}</span>`
    ).join("");
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
//  GAME SETUP — show correct zones per mode
// ─────────────────────────────────────────────────────────────────
function configureGameUI() {
  const m = state.mode;

  // Zones
  $("zone-standard").classList.toggle("hidden", m === "reverse");
  $("zone-reverse").classList.toggle("hidden",   m !== "reverse");
  $("zone-hardcore").classList.toggle("hidden",  m !== "hardcore");
  $("answers-grid").classList.toggle("hidden",   m === "hardcore" || m === "reverse");

  // Bars
  $("streak-bar").classList.toggle("show",       m === "survival");
  $("chrono-wrap").classList.toggle("show",      m === "chrono");
  $("progress-bar-wrap").classList.toggle("hidden", m === "survival" || m === "chrono" || m === "infini");

  // Mode tag
  const mCfg = MODES.find(x => x.id === m);
  $("game-mode-tag").textContent = mCfg ? mCfg.icon + " " + mCfg.name : "";

  // Infini home button
  $("btn-infini-home").classList.toggle("hidden", m !== "infini");
}

// ─────────────────────────────────────────────────────────────────
//  START GAME
// ─────────────────────────────────────────────────────────────────
function startGame() {
  // reset state
  state.questionIndex = 0;
  state.score         = 0;
  state.wrongAnswers  = 0;
  state.totalAnswered = 0;
  state.answered      = false;
  state.streak        = 0;
  clearInterval(state.chronoInterval);
  state.chronoStarted = false;
  state.chronoLeft    = CHRONO_DURATION;

  // Build session
  const count = (state.mode === "survival" || state.mode === "chrono" || state.mode === "infini")
    ? Math.min(200, state.pool.length)
    : QUESTIONS_PER_GAME;
  state.session = pickN(state.pool, count);

  // Reset UI
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

  // Start chrono timer
  if (state.mode === "chrono") startChrono();
}

// ─────────────────────────────────────────────────────────────────
//  CHRONO TIMER
// ─────────────────────────────────────────────────────────────────
function startChrono() {
  state.chronoStarted = true;
  state.chronoInterval = setInterval(() => {
    state.chronoLeft--;
    $("chrono-time").textContent = state.chronoLeft;
    const pct = (state.chronoLeft / CHRONO_DURATION) * 100;
    $("chrono-bar").style.width = pct + "%";
    if (state.chronoLeft <= 15) $("chrono-bar").classList.add("warn");
    if (state.chronoLeft <= 0) {
      clearInterval(state.chronoInterval);
      showResults();
    }
  }, 1000);
}

// ─────────────────────────────────────────────────────────────────
//  BUILD QUESTION
// ─────────────────────────────────────────────────────────────────
function loadFlag(imgEl, code, shimmer) {
  if (shimmer) shimmer.classList.add("loading");
  imgEl.style.opacity = "0";
  const img = new Image();
  img.src = flagUrl(code);
  img.onload = img.onerror = () => {
    imgEl.src = img.src;
    imgEl.style.opacity = "1";
    if (shimmer) shimmer.classList.remove("loading");
  };
}

function buildQuestion(index) {
  const correct = state.session[index];
  state.correctCountry = correct;
  state.answered = false;

  // Counter / progress
  const total = state.session.length;
  if (state.mode === "survival") {
    $("question-counter").textContent = `${state.streak} bonne${state.streak !== 1 ? "s" : ""}`;
  } else if (state.mode === "chrono") {
    $("question-counter").textContent = `#${index + 1}`;
  } else {
    const shown = Math.min(index + 1, QUESTIONS_PER_GAME);
    $("question-counter").textContent = `${shown} / ${QUESTIONS_PER_GAME}`;
    const pct = (index / QUESTIONS_PER_GAME) * 100;
    $("progress-bar").style.width = pct + "%";
  }

  // Hide feedback, disable next
  const fb = $("feedback-banner");
  fb.className = "feedback-banner";
  $("btn-next").disabled = true;

  // ── REVERSE MODE ──────────────────────────────────────────────
  if (state.mode === "reverse") {
    $("reverse-country-name").textContent = correct.name;
    const wrongs  = pickN(state.pool, 3, [correct]);
    const options = shuffle([correct, ...wrongs]);
    const btns    = document.querySelectorAll(".flag-choice-btn");
    btns.forEach(btn => {
      btn.className = "flag-choice-btn";
      btn.disabled  = false;
      const imgEl   = btn.querySelector("img");
      imgEl.style.opacity = "0";
    });
    options.forEach((country, i) => {
      btns[i].dataset.code = country.code;
      loadFlag(btns[i].querySelector("img"), country.code, null);
    });
    return;
  }

  // ── HARDCORE MODE ─────────────────────────────────────────────
  if (state.mode === "hardcore") {
    loadFlag($("flag-img"), correct.code, $("flag-shimmer"));
    const tol = typoTolerance(correct.name);
    $("hc-tol-badge").textContent = tol > 0 ? `±${tol} fautes tolérées` : "Orthographe exacte";
    const inp = $("hardcore-input");
    inp.value = "";
    inp.className = "hardcore-input";
    inp.disabled = false;
    $("btn-hc-submit").disabled = false;
    setTimeout(() => inp.focus(), 100);
    return;
  }

  // ── STANDARD MODES (classic, survival, chrono) ────────────────
  loadFlag($("flag-img"), correct.code, $("flag-shimmer"));
  const wrongs  = pickN(state.pool, 3, [correct]);
  const options = shuffle([correct, ...wrongs]);
  document.querySelectorAll(".answer-btn").forEach((btn, i) => {
    btn.textContent  = options[i].name;
    btn.dataset.code = options[i].code;
    btn.className    = "answer-btn";
    btn.disabled     = false;
  });
}

// ─────────────────────────────────────────────────────────────────
//  HANDLE ANSWER
// ─────────────────────────────────────────────────────────────────
function resolveAnswer(isCorrect, correctName, closEnough = false) {
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
    $("feedback-text").textContent = closEnough
      ? `Proche ! La réponse est ${correctName}.`
      : `Correct ! C'est bien ${correctName}.`;
  } else {
    state.wrongAnswers++;
    if (state.mode === "survival") {
      // End immediately after feedback
      fb.classList.add("show", "incorrect");
      $("feedback-icon").textContent = "✗";
      $("feedback-text").textContent = `Dommage ! C'était ${correctName}.`;
      $("btn-next").textContent = "Voir les résultats →";
      $("btn-next").disabled = false;
      return;
    }
    fb.classList.add("show", "incorrect");
    $("feedback-icon").textContent = "✗";
    $("feedback-text").textContent = `Incorrect. C'était ${correctName}.`;
  }

  const isLimited = ["classic","hardcore","reverse"].includes(state.mode);
  const isLast    = isLimited && state.questionIndex >= QUESTIONS_PER_GAME - 1;

  if (state.mode === "chrono") {
    // Auto-advance after short delay in chrono
    setTimeout(nextQuestion, 900);
  } else {
    const label = isLimited && isLast ? "Voir les résultats →" : "Suivant →";
    $("btn-next").textContent = state.mode === "infini" ? "Suivant →" : label;
    $("btn-next").disabled = false;
  }
}

// ── Standard answer click ──
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
    resolveAnswer(isOk, state.correctCountry.name);
  });
});

// ── Reverse flag click ──
document.querySelectorAll(".flag-choice-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (state.answered) return;
    const chosen  = btn.dataset.code;
    const correct = state.correctCountry.code;
    const isOk    = chosen === correct;

    document.querySelectorAll(".flag-choice-btn").forEach(b => { b.disabled = true; });
    btn.classList.add(isOk ? "correct" : "incorrect");
    if (!isOk) {
      document.querySelectorAll(".flag-choice-btn").forEach(b => {
        if (b.dataset.code === correct) b.classList.add("correct");
      });
    }
    resolveAnswer(isOk, state.correctCountry.name);
  });
});

// ── Hardcore submit ──
function submitHardcore() {
  if (state.answered) return;
  const inp   = $("hardcore-input");
  const typed = inp.value.trim();
  if (!typed) return;

  const correctName = state.correctCountry.name;
  const dist  = levenshtein(normalize(typed), normalize(correctName));
  const tol   = typoTolerance(correctName);
  const close = dist > 0 && dist <= tol;
  const exact = dist === 0;
  const isOk  = exact || close;

  inp.disabled = true;
  $("btn-hc-submit").disabled = true;
  inp.classList.add(isOk ? "ok" : "bad");

  document.querySelectorAll(".answer-btn").forEach(b => { b.disabled = true; });
  resolveAnswer(isOk, correctName, close);
}
$("btn-hc-submit").addEventListener("click", submitHardcore);
$("hardcore-input").addEventListener("keydown", e => { if (e.key === "Enter") submitHardcore(); });

// ─────────────────────────────────────────────────────────────────
//  NEXT QUESTION
// ─────────────────────────────────────────────────────────────────
function nextQuestion() {
  $("feedback-banner").className = "feedback-banner"; // hide

  // Survival game-over check
  if (state.mode === "survival" && state.wrongAnswers > 0) {
    showResults(); return;
  }

  // Finite games: check end
  if (["classic","hardcore","reverse"].includes(state.mode)) {
    if (state.questionIndex >= QUESTIONS_PER_GAME - 1) { showResults(); return; }
  }

  // Replenish session for survival/chrono/infini if needed
  if (state.questionIndex >= state.session.length - 2) {
    const extra = pickN(state.pool, 20, state.session);
    state.session.push(...extra);
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

  // Ensure progress bar full for finite modes
  if (["classic","hardcore","reverse"].includes(state.mode))
    $("progress-bar").style.width = "100%";

  const m     = state.mode;
  const score = state.score;
  const total = ["classic","hardcore","reverse"].includes(m) ? QUESTIONS_PER_GAME : state.totalAnswered;
  const pct   = total > 0 ? score / total : 0;

  // Visibility toggles
  $("score-circle").classList.toggle("hidden",     m === "survival");
  $("survival-result").classList.toggle("show",    m === "survival");
  $("results-stats").classList.toggle("hidden",    m === "survival");
  $("chrono-result").classList.toggle("show",      m === "chrono");
  $("new-record-badge").classList.remove("show");

  // Infini: always show ring
  if (m === "infini") $("score-circle").classList.remove("hidden");

  // Emoji + title
  let emoji="🏆", title="Partie terminée !";
  if (m === "survival") {
    emoji = state.streak >= 20 ? "🔥" : state.streak >= 10 ? "💪" : "💀";
    title = "Partie terminée !";
  } else if (m === "infini") {
    emoji = score >= 50 ? "🔥" : score >= 20 ? "🎉" : "🏆";
    title = "Session terminée !"; 
  } else if (pct === 1) { emoji="🏆"; title="Score parfait !"; }
  else if (pct >= .8)   { emoji="🎉"; title="Excellent !"; }
  else if (pct >= .5)   { emoji="👍"; title="Pas mal !"; }
  else                   { emoji="📚"; title="Continuez !"; }

  $("results-emoji").textContent = emoji;
  $("results-title").textContent = title;

  // Subtitle
  const subtitles = {
    classic:  pct>=1?"Vous connaissez tous ces drapeaux !":pct>=.8?"Très bonne maîtrise !":pct>=.5?"Encore un peu d'entraînement !":"Les drapeaux attendent votre retour !",
    chrono:   `${score} bonne${score!==1?"s":""} réponse${score!==1?"s":""} en ${CHRONO_DURATION}s.`,
    survival: `Vous avez enchaîné ${state.streak} bonne${state.streak!==1?"s":""} réponse${state.streak!==1?"s":""} !`,
    hardcore: pct>=1?"Parfait ! Aucune faute.": pct>=.5?"Bonne mémoire orthographique !":"L'écriture des pays, ça s'apprend !",
    reverse:  pct>=1?"Vous reconnaissez tous les drapeaux !": pct>=.5?"Bon œil !":"Observez mieux les drapeaux.",
    infini:   `${score} bonne${score!==1?"s":""} réponse${score!==1?"s":""} sur ${total} question${total!==1?"s":""}. Bien joué !`,
  };
  $("results-subtitle").textContent = subtitles[m] || "";

  // Survival specific
  if (m === "survival") {
    $("survival-streak").textContent = state.streak;
    const isNewRec = setRecord(state.continent, "survival", state.streak);
    $("survival-record-display").textContent = getRecord(state.continent, "survival");
    if (isNewRec && state.streak > 0) $("new-record-badge").classList.add("show");
  }

  // Score ring (non-survival)
  if (m !== "survival") {
    $("final-score").textContent = score;
    $("final-total").textContent = m === "infini" ? ` / ${total}` : `/${total}`;
    $("stat-correct").textContent   = `${score} correcte${score!==1?"s":""}` ;
    $("stat-incorrect").textContent = `${total - score} incorrecte${(total-score)!==1?"s":""}` ;
    const circ   = 2 * Math.PI * 52;
    // For infini, cap the ring fill at 100 questions for visual
    const ringPct = m === "infini" ? Math.min(score / Math.max(total, 1), 1) : pct;
    const offset  = circ * (1 - ringPct);
    setTimeout(() => { $("ring-fill").style.strokeDashoffset = offset; }, 100);

    // Records
    if (["classic","hardcore","reverse","infini"].includes(m)) {
      const isNewRec = setRecord(state.continent, m, score);
      if (isNewRec && score > 0) $("new-record-badge").classList.add("show");
    }
  }

  // Chrono stats
  if (m === "chrono") {
    const elapsed  = CHRONO_DURATION - state.chronoLeft;
    const rateRaw  = elapsed > 0 ? (score / elapsed * 60).toFixed(1) : "—";
    const accRaw   = state.totalAnswered > 0 ? Math.round(score / state.totalAnswered * 100) : 0;
    $("chrono-stat-speed").textContent = `${rateRaw} rép/min`;
    $("chrono-stat-acc").textContent   = `${accRaw} % précision`;
    // Record for chrono = best score in 60s
    const isNewRec = setRecord(state.continent, "chrono", score);
    if (isNewRec && score > 0) $("new-record-badge").classList.add("show");
  }

  showScreen("results");
}

// ─────────────────────────────────────────────────────────────────
//  RESULT BUTTONS
// ─────────────────────────────────────────────────────────────────
$("btn-play-again").addEventListener("click", () => {
  $("ring-fill").style.strokeDashoffset = "327";
  startGame();
});
$("btn-change-mode").addEventListener("click", () => showScreen("mode"));
$("btn-home").addEventListener("click", () => showScreen("welcome"));

// ─────────────────────────────────────────────────────────────────
//  NAVIGATION BUTTONS
// ─────────────────────────────────────────────────────────────────
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
  const key = e.key;
  const mode = state.mode;

  if (mode !== "hardcore") {
    const answerKeys = {"1":0,"2":1,"3":2,"4":3};
    if (key in answerKeys && screens.game.classList.contains("active")) {
      const idx = answerKeys[key];
      if (mode === "reverse") {
        const btns = document.querySelectorAll(".flag-choice-btn");
        if (btns[idx] && !btns[idx].disabled) btns[idx].click();
      } else {
        const btns = document.querySelectorAll(".answer-btn");
        if (btns[idx] && !btns[idx].disabled) btns[idx].click();
      }
    }
  }

  if ((key === "Enter" || key === " ") && !$("btn-next").disabled
      && screens.game.classList.contains("active")
      && document.activeElement !== $("hardcore-input")) {
    e.preventDefault();
    $("btn-next").click();
  }
});

// ─────────────────────────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────────────────────────
buildContinentGrid();
buildModeGrid();
showScreen("welcome");

