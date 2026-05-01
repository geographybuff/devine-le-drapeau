"use strict";
/* ================================================================
   DEVINE LE DRAPEAU — script.js  v2
   5 continents · 5 modes de jeu · localStorage records
================================================================ */

// ─────────────────────────────────────────────────────────────────
//  COUNTRIES — dérivé de WORLD_COUNTRIES (countries.js) + États US
// ─────────────────────────────────────────────────────────────────
const US_STATES = [
  {code:"us-al",name:"Alabama",c:"us"},
  {code:"us-ak",name:"Alaska",c:"us"},
  {code:"us-az",name:"Arizona",c:"us"},
  {code:"us-ar",name:"Arkansas",c:"us"},
  {code:"us-ca",name:"Californie",c:"us"},
  {code:"us-co",name:"Colorado",c:"us"},
  {code:"us-ct",name:"Connecticut",c:"us"},
  {code:"us-de",name:"Delaware",c:"us"},
  {code:"us-fl",name:"Floride",c:"us"},
  {code:"us-ga",name:"Géorgie",c:"us"},
  {code:"us-hi",name:"Hawaï",c:"us"},
  {code:"us-id",name:"Idaho",c:"us"},
  {code:"us-il",name:"Illinois",c:"us"},
  {code:"us-in",name:"Indiana",c:"us"},
  {code:"us-ia",name:"Iowa",c:"us"},
  {code:"us-ks",name:"Kansas",c:"us"},
  {code:"us-ky",name:"Kentucky",c:"us"},
  {code:"us-la",name:"Louisiane",c:"us"},
  {code:"us-me",name:"Maine",c:"us"},
  {code:"us-md",name:"Maryland",c:"us"},
  {code:"us-ma",name:"Massachusetts",c:"us"},
  {code:"us-mi",name:"Michigan",c:"us"},
  {code:"us-mn",name:"Minnesota",c:"us"},
  {code:"us-ms",name:"Mississippi",c:"us"},
  {code:"us-mo",name:"Missouri",c:"us"},
  {code:"us-mt",name:"Montana",c:"us"},
  {code:"us-ne",name:"Nebraska",c:"us"},
  {code:"us-nv",name:"Nevada",c:"us"},
  {code:"us-nh",name:"New Hampshire",c:"us"},
  {code:"us-nj",name:"New Jersey",c:"us"},
  {code:"us-nm",name:"Nouveau-Mexique",c:"us"},
  {code:"us-ny",name:"New York",c:"us"},
  {code:"us-nc",name:"Caroline du Nord",c:"us"},
  {code:"us-nd",name:"Dakota du Nord",c:"us"},
  {code:"us-oh",name:"Ohio",c:"us"},
  {code:"us-ok",name:"Oklahoma",c:"us"},
  {code:"us-or",name:"Oregon",c:"us"},
  {code:"us-pa",name:"Pennsylvanie",c:"us"},
  {code:"us-ri",name:"Rhode Island",c:"us"},
  {code:"us-sc",name:"Caroline du Sud",c:"us"},
  {code:"us-sd",name:"Dakota du Sud",c:"us"},
  {code:"us-tn",name:"Tennessee",c:"us"},
  {code:"us-tx",name:"Texas",c:"us"},
  {code:"us-ut",name:"Utah",c:"us"},
  {code:"us-vt",name:"Vermont",c:"us"},
  {code:"us-va",name:"Virginie",c:"us"},
  {code:"us-wa",name:"Washington",c:"us"},
  {code:"us-wv",name:"Virginie-Occidentale",c:"us"},
  {code:"us-wi",name:"Wisconsin",c:"us"},
  {code:"us-wy",name:"Wyoming",c:"us"},
];

const COUNTRIES = [
  ...WORLD_COUNTRIES.map(({code, name, c}) => ({code, name, c})),
  ...US_STATES,
];

// ─────────────────────────────────────────────────────────────────
//  CONTINENTS CONFIG
// ─────────────────────────────────────────────────────────────────
const CONTINENTS = [
  {id:"all", name:"Monde entier",    icon:"🌐", color:"#6c63ff", unit:"pays"},
  {id:"af",  name:"Afrique",         icon:"🌍", color:"#f59e0b", unit:"pays"},
  {id:"am",  name:"Amériques",       icon:"🌎", color:"#22c55e", unit:"pays"},
  {id:"as",  name:"Asie",            icon:"🌏", color:"#3b82f6", unit:"pays"},
  {id:"eu",  name:"Europe",          icon:"🏰", color:"#a78bfa", unit:"pays"},
  {id:"oc",  name:"Océanie",         icon:"🏙️", color:"#06b6d4", unit:"pays"},
  {id:"us",  name:"États des USA",   icon:"🇺🇸", img:"https://flagcdn.com/w40/us.png", color:"#ef4444", unit:"états"},
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
//  GAME HISTORY  (clé partagée avec capitals.js)
// ─────────────────────────────────────────────────────────────────
const LS_HISTORY_KEY = "dtd_history_v1";
const MAX_HISTORY    = 100;
function loadHistory() {
  try { return JSON.parse(localStorage.getItem(LS_HISTORY_KEY)) || []; } catch { return []; }
}
function saveGameHistory(entry) {
  const h = loadHistory();
  h.push(entry);
  if (h.length > MAX_HISTORY) h.splice(0, h.length - MAX_HISTORY);
  localStorage.setItem(LS_HISTORY_KEY, JSON.stringify(h));
}
function getWeakCountryCodes(game) {
  const h = loadHistory().filter(e => e.game === game);
  const stats = {};
  h.forEach(g => (g.questions||[]).forEach(q => {
    if (!stats[q.code]) stats[q.code] = {correct:0, wrong:0};
    if (q.correct) stats[q.code].correct++; else stats[q.code].wrong++;
  }));
  return Object.entries(stats)
    .filter(([,v]) => v.wrong > 0)
    .sort((a,b) => (b[1].wrong/(b[1].wrong+b[1].correct)) - (a[1].wrong/(a[1].wrong+a[1].correct)))
    .slice(0, 30)
    .map(([code]) => code);
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
  questionHistory: [],

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
    const pool = cont.id === "all"
      ? COUNTRIES.filter(c => c.c !== "us")
      : COUNTRIES.filter(c => c.c === cont.id);
    const card = document.createElement("button");
    card.className = "continent-card";
    card.dataset.id = cont.id;
    const iconHtml = cont.img
      ? `<img src="${cont.img}" alt="${cont.name}" style="width:36px;height:auto;border-radius:4px;object-fit:cover;"/>`
      : `<span class="continent-icon">${cont.icon}</span>`;
    card.innerHTML = `
      ${iconHtml}
      <span class="continent-name">${cont.name}</span>
      <span class="continent-count">${pool.length} ${cont.unit || 'pays'}</span>`;
    card.addEventListener("click", () => selectContinent(cont.id));
    grid.appendChild(card);
  });
}

function selectContinent(id) {
  state.continent = id;
  const cont = CONTINENTS.find(c => c.id === id);
  state.pool = id === "all"
    ? COUNTRIES.filter(c => c.c !== "us")   // Monde entier = pays uniquement (sans États US)
    : COUNTRIES.filter(c => c.c === id);

  // Update pill on mode screen
  const iconHtml = cont.img
    ? `<img src="${cont.img}" alt="${cont.name}" style="width:24px;height:auto;border-radius:3px;vertical-align:middle;"/>`
    : cont.icon;
  $('mode-continent-pill').innerHTML = `${iconHtml} ${cont.name} — ${state.pool.length} ${cont.unit || 'pays'}`;

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
  const isFinite = ["classic","hardcore","reverse"].includes(m);

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

  // Progress dots (modes à 10 questions fixes)
  const dotsEl = $("progress-dots");
  dotsEl.innerHTML = "";
  if (isFinite) {
    for (let i = 0; i < QUESTIONS_PER_GAME; i++) {
      const d = document.createElement("span");
      d.className = "pdot" + (i === 0 ? " current" : "");
      d.id = "pdot-" + i;
      dotsEl.appendChild(d);
    }
  }
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
  state.questionHistory = [];
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
  state.questionHistory.push({code: state.correctCountry.code, name: state.correctCountry.name, correct: isCorrect});

  // Son de feedback
  if (isCorrect) window.playCorrect?.(); else window.playWrong?.();

  // Dot de progression
  const dotEl = $("pdot-" + state.questionIndex);
  if (dotEl) {
    dotEl.classList.remove("current");
    dotEl.classList.add(isCorrect ? "correct" : "incorrect");
  }
  const nextDot = $("pdot-" + (state.questionIndex + 1));
  if (nextDot) nextDot.classList.add("current");

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
  transitionTo(state.questionIndex);
}

// ─────────────────────────────────────────────────────────────────
//  TRANSITION ENTRE QUESTIONS
// ─────────────────────────────────────────────────────────────────
function transitionTo(index) {
  const area = $("question-area");
  area.classList.remove("q-in");
  area.classList.add("q-out");
  setTimeout(() => {
    area.classList.remove("q-out");
    buildQuestion(index);
    area.classList.add("q-in");
  }, 160);
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

  saveGameHistory({
    game: "flags", mode: m, continent: state.continent,
    score, total, date: new Date().toISOString(),
    questions: [...state.questionHistory],
  });
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

// ── Revision mode (lancé depuis stats.html) ──────────────────────
const _revParam = new URLSearchParams(window.location.search).get("revision");
if (_revParam === "flags") {
  const _weakCodes = getWeakCountryCodes("flags");
  if (_weakCodes.length >= 4) {
    state.pool      = COUNTRIES.filter(c => _weakCodes.includes(c.code));
    state.continent = "all";
    state.mode      = "classic";
    startGame();
  } else {
    showScreen("welcome");
  }
} else {
  showScreen("welcome");
}

