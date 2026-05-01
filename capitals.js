"use strict";
/* ================================================================
   JEU DE LA CAPITALE — capitals.js  v1
   195 pays ONU · 6 modes de jeu · localStorage records
================================================================ */

// ─────────────────────────────────────────────────────────────────
//  COUNTRIES — provient de WORLD_COUNTRIES (countries.js)
// ─────────────────────────────────────────────────────────────────
const COUNTRIES = WORLD_COUNTRIES;

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
//  GAME HISTORY  (clé partagée avec script.js)
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
  continent:"all", mode:"classic",
  pool:[], session:[],
  questionIndex:0, score:0, wrongAnswers:0, totalAnswered:0,
  answered:false, correctCountry:null,
  questionHistory:[],
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
  const isFinite   = ["classic","hardcore","reverse"].includes(m);

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

  // Progress dots
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
  state.questionIndex = 0;
  state.score         = 0;
  state.wrongAnswers  = 0;
  state.totalAnswered = 0;
  state.answered      = false;
  state.streak        = 0;
  state.questionHistory = [];
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

  saveGameHistory({
    game: "capitals", mode: m, continent: state.continent,
    score, total, date: new Date().toISOString(),
    questions: [...state.questionHistory],
  });
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

// ── Revision mode (lancé depuis stats.html) ──────────────────────
const _revParam = new URLSearchParams(window.location.search).get("revision");
if (_revParam === "capitals") {
  const _weakCodes = getWeakCountryCodes("capitals");
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
