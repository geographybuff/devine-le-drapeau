"use strict";
/* ================================================================
   MODE SILHOUETTE — silhouette.js
   Utilise jsvectormap (carte SVG intégrée)
   Un pays est mis en évidence en violet ; le joueur choisit
   son nom parmi 4 propositions.
================================================================ */

// ─── PAYS JOUABLES ──────────────────────────────────────────────
const COUNTRIES = [
  // Afrique
  {code:"DZ",name:"Algérie",c:"af"},{code:"AO",name:"Angola",c:"af"},
  {code:"BJ",name:"Bénin",c:"af"},{code:"BW",name:"Botswana",c:"af"},
  {code:"BF",name:"Burkina Faso",c:"af"},{code:"BI",name:"Burundi",c:"af"},
  {code:"CM",name:"Cameroun",c:"af"},{code:"CF",name:"Rép. centrafricaine",c:"af"},
  {code:"TD",name:"Tchad",c:"af"},{code:"CG",name:"Congo",c:"af"},
  {code:"CD",name:"R.D. Congo",c:"af"},{code:"DJ",name:"Djibouti",c:"af"},
  {code:"EG",name:"Égypte",c:"af"},{code:"GQ",name:"Guinée équatoriale",c:"af"},
  {code:"ER",name:"Érythrée",c:"af"},{code:"ET",name:"Éthiopie",c:"af"},
  {code:"GA",name:"Gabon",c:"af"},{code:"GM",name:"Gambie",c:"af"},
  {code:"GH",name:"Ghana",c:"af"},{code:"GN",name:"Guinée",c:"af"},
  {code:"GW",name:"Guinée-Bissau",c:"af"},{code:"CI",name:"Côte d'Ivoire",c:"af"},
  {code:"KE",name:"Kenya",c:"af"},{code:"LS",name:"Lesotho",c:"af"},
  {code:"LR",name:"Libéria",c:"af"},{code:"LY",name:"Libye",c:"af"},
  {code:"MG",name:"Madagascar",c:"af"},{code:"MW",name:"Malawi",c:"af"},
  {code:"ML",name:"Mali",c:"af"},{code:"MR",name:"Mauritanie",c:"af"},
  {code:"MA",name:"Maroc",c:"af"},{code:"MZ",name:"Mozambique",c:"af"},
  {code:"NA",name:"Namibie",c:"af"},{code:"NE",name:"Niger",c:"af"},
  {code:"NG",name:"Nigeria",c:"af"},{code:"RW",name:"Rwanda",c:"af"},
  {code:"SN",name:"Sénégal",c:"af"},{code:"SL",name:"Sierra Leone",c:"af"},
  {code:"SO",name:"Somalie",c:"af"},{code:"ZA",name:"Afrique du Sud",c:"af"},
  {code:"SS",name:"Soudan du Sud",c:"af"},{code:"SD",name:"Soudan",c:"af"},
  {code:"SZ",name:"Eswatini",c:"af"},{code:"TZ",name:"Tanzanie",c:"af"},
  {code:"TG",name:"Togo",c:"af"},{code:"TN",name:"Tunisie",c:"af"},
  {code:"UG",name:"Ouganda",c:"af"},{code:"ZM",name:"Zambie",c:"af"},
  {code:"ZW",name:"Zimbabwe",c:"af"},
  // Amériques
  {code:"AR",name:"Argentine",c:"am"},{code:"BO",name:"Bolivie",c:"am"},
  {code:"BR",name:"Brésil",c:"am"},{code:"CA",name:"Canada",c:"am"},
  {code:"CL",name:"Chili",c:"am"},{code:"CO",name:"Colombie",c:"am"},
  {code:"CR",name:"Costa Rica",c:"am"},{code:"CU",name:"Cuba",c:"am"},
  {code:"DO",name:"Rép. dominicaine",c:"am"},{code:"EC",name:"Équateur",c:"am"},
  {code:"SV",name:"Salvador",c:"am"},{code:"GT",name:"Guatemala",c:"am"},
  {code:"GY",name:"Guyana",c:"am"},{code:"HT",name:"Haïti",c:"am"},
  {code:"HN",name:"Honduras",c:"am"},{code:"JM",name:"Jamaïque",c:"am"},
  {code:"MX",name:"Mexique",c:"am"},{code:"NI",name:"Nicaragua",c:"am"},
  {code:"PA",name:"Panama",c:"am"},{code:"PY",name:"Paraguay",c:"am"},
  {code:"PE",name:"Pérou",c:"am"},{code:"SR",name:"Suriname",c:"am"},
  {code:"TT",name:"Trinité-et-Tobago",c:"am"},{code:"US",name:"États-Unis",c:"am"},
  {code:"UY",name:"Uruguay",c:"am"},{code:"VE",name:"Venezuela",c:"am"},
  // Asie
  {code:"AF",name:"Afghanistan",c:"as"},{code:"AM",name:"Arménie",c:"as"},
  {code:"AZ",name:"Azerbaïdjan",c:"as"},{code:"BD",name:"Bangladesh",c:"as"},
  {code:"BT",name:"Bhoutan",c:"as"},{code:"BN",name:"Brunéi",c:"as"},
  {code:"KH",name:"Cambodge",c:"as"},{code:"CN",name:"Chine",c:"as"},
  {code:"GE",name:"Géorgie",c:"as"},{code:"IN",name:"Inde",c:"as"},
  {code:"ID",name:"Indonésie",c:"as"},{code:"IR",name:"Iran",c:"as"},
  {code:"IQ",name:"Irak",c:"as"},{code:"IL",name:"Israël",c:"as"},
  {code:"JP",name:"Japon",c:"as"},{code:"JO",name:"Jordanie",c:"as"},
  {code:"KZ",name:"Kazakhstan",c:"as"},{code:"KW",name:"Koweït",c:"as"},
  {code:"KG",name:"Kirghizistan",c:"as"},{code:"LA",name:"Laos",c:"as"},
  {code:"LB",name:"Liban",c:"as"},{code:"MY",name:"Malaisie",c:"as"},
  {code:"MN",name:"Mongolie",c:"as"},{code:"MM",name:"Myanmar",c:"as"},
  {code:"NP",name:"Népal",c:"as"},{code:"KP",name:"Corée du Nord",c:"as"},
  {code:"OM",name:"Oman",c:"as"},{code:"PK",name:"Pakistan",c:"as"},
  {code:"PH",name:"Philippines",c:"as"},{code:"QA",name:"Qatar",c:"as"},
  {code:"SA",name:"Arabie saoudite",c:"as"},{code:"SG",name:"Singapour",c:"as"},
  {code:"KR",name:"Corée du Sud",c:"as"},{code:"LK",name:"Sri Lanka",c:"as"},
  {code:"SY",name:"Syrie",c:"as"},{code:"TJ",name:"Tadjikistan",c:"as"},
  {code:"TH",name:"Thaïlande",c:"as"},{code:"TR",name:"Turquie",c:"as"},
  {code:"TM",name:"Turkménistan",c:"as"},{code:"AE",name:"Émirats arabes unis",c:"as"},
  {code:"UZ",name:"Ouzbékistan",c:"as"},{code:"VN",name:"Viêt Nam",c:"as"},
  {code:"YE",name:"Yémen",c:"as"},
  // Europe
  {code:"AL",name:"Albanie",c:"eu"},{code:"AT",name:"Autriche",c:"eu"},
  {code:"BY",name:"Biélorussie",c:"eu"},{code:"BE",name:"Belgique",c:"eu"},
  {code:"BA",name:"Bosnie-Herzégovine",c:"eu"},{code:"BG",name:"Bulgarie",c:"eu"},
  {code:"HR",name:"Croatie",c:"eu"},{code:"CZ",name:"Tchéquie",c:"eu"},
  {code:"DK",name:"Danemark",c:"eu"},{code:"EE",name:"Estonie",c:"eu"},
  {code:"FI",name:"Finlande",c:"eu"},{code:"FR",name:"France",c:"eu"},
  {code:"DE",name:"Allemagne",c:"eu"},{code:"GR",name:"Grèce",c:"eu"},
  {code:"HU",name:"Hongrie",c:"eu"},{code:"IS",name:"Islande",c:"eu"},
  {code:"IE",name:"Irlande",c:"eu"},{code:"IT",name:"Italie",c:"eu"},
  {code:"LV",name:"Lettonie",c:"eu"},{code:"LT",name:"Lituanie",c:"eu"},
  {code:"LU",name:"Luxembourg",c:"eu"},{code:"MT",name:"Malte",c:"eu"},
  {code:"MD",name:"Moldavie",c:"eu"},{code:"ME",name:"Monténégro",c:"eu"},
  {code:"NL",name:"Pays-Bas",c:"eu"},{code:"MK",name:"Macédoine du Nord",c:"eu"},
  {code:"NO",name:"Norvège",c:"eu"},{code:"PL",name:"Pologne",c:"eu"},
  {code:"PT",name:"Portugal",c:"eu"},{code:"RO",name:"Roumanie",c:"eu"},
  {code:"RU",name:"Russie",c:"eu"},{code:"RS",name:"Serbie",c:"eu"},
  {code:"SK",name:"Slovaquie",c:"eu"},{code:"SI",name:"Slovénie",c:"eu"},
  {code:"ES",name:"Espagne",c:"eu"},{code:"SE",name:"Suède",c:"eu"},
  {code:"CH",name:"Suisse",c:"eu"},{code:"UA",name:"Ukraine",c:"eu"},
  {code:"GB",name:"Royaume-Uni",c:"eu"},
  // Océanie
  {code:"AU",name:"Australie",c:"oc"},{code:"FJ",name:"Fidji",c:"oc"},
  {code:"NZ",name:"Nouvelle-Zélande",c:"oc"},{code:"PG",name:"Papouasie",c:"oc"},
  {code:"SB",name:"Îles Salomon",c:"oc"},{code:"VU",name:"Vanuatu",c:"oc"},
];

const CONTINENTS = [
  {id:"all", name:"Monde entier", icon:"🌐"},
  {id:"af",  name:"Afrique",      icon:"🌍"},
  {id:"am",  name:"Amériques",    icon:"🌎"},
  {id:"as",  name:"Asie",         icon:"🌏"},
  {id:"eu",  name:"Europe",       icon:"🏰"},
  {id:"oc",  name:"Océanie",      icon:"🏝️"},
];

const Q_OPTIONS  = [5, 10, 15, 20];
const ACCENT_COL = '#a855f7';   // violet = couleur du mode Silhouette
const CORRECT_COL = '#22c55e';  // vert   = bonne réponse révélée
const WRONG_COL   = '#ef4444';  // rouge  = erreur

// ─── ÉTAT ────────────────────────────────────────────────────────
let state = {
  continent: 'all',
  totalQ:    10,
  session:   [],
  index:     0,
  score:     0,
  correct:   0,
  answered:  false,
};

let mapInstance = null;

// ─── THÈME ───────────────────────────────────────────────────────
function isDark()      { return document.documentElement.getAttribute('data-theme') !== 'light'; }
function bgColor()     { return isDark() ? '#0d1627' : '#c8d8f0'; }
function fillColor()   { return isDark() ? '#1e2235' : '#d9e2ef'; }
function borderColor() { return isDark() ? '#2a2d3e' : '#b0bacf'; }

// ─── INIT PAGE ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildContinentChips();
  buildQChips();
});

function buildContinentChips() {
  const container = document.getElementById('cont-chips');
  CONTINENTS.forEach(cont => {
    const btn = document.createElement('button');
    btn.className = 'chip' + (cont.id === state.continent ? ' on' : '');
    btn.textContent = cont.icon + ' ' + cont.name;
    btn.onclick = () => {
      state.continent = cont.id;
      container.querySelectorAll('.chip').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
    };
    container.appendChild(btn);
  });
}

function buildQChips() {
  const container = document.getElementById('q-chips');
  Q_OPTIONS.forEach(n => {
    const btn = document.createElement('button');
    btn.className = 'chip' + (n === state.totalQ ? ' on' : '');
    btn.textContent = n;
    btn.onclick = () => {
      state.totalQ = n;
      container.querySelectorAll('.chip').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
    };
    container.appendChild(btn);
  });
}

// ─── INIT CARTE ───────────────────────────────────────────────────
function initMap() {
  mapInstance = new jsVectorMap({
    selector:        '#map',
    map:             'world',
    backgroundColor: bgColor(),
    zoomButtons:     true,
    zoomOnScroll:    true,
    zoomMax:         24,
    zoomStep:        1.5,
    selectable:      false,
    regionStyle: {
      initial: {
        fill:        fillColor(),
        stroke:      borderColor(),
        strokeWidth: 0.4,
        fillOpacity: 1,
      },
      hover: {
        fill: fillColor(),
        cursor: 'default',
      },
    },
  });
}

// ─── COULEURS DIRECTEMENT SUR LE SVG ─────────────────────────────
function setRegionFill(code, color) {
  const el = document.querySelector(`#map [data-code="${code}"]`);
  if (el) {
    el.setAttribute('fill', color);
    el.style.fill = '';
  }
}

function resetAllColors() {
  const fc = fillColor();
  const bc = borderColor();
  document.querySelectorAll('#map [data-code]').forEach(el => {
    el.setAttribute('fill',   fc);
    el.setAttribute('stroke', bc);
    el.style.fill   = '';
    el.style.stroke = '';
  });
}

// Zoom léger sur la zone du pays cible
function focusOnCountry(code) {
  if (!mapInstance) return;
  try {
    // jsvectormap 1.5.3 expose setFocus
    if (typeof mapInstance.setFocus === 'function') {
      mapInstance.setFocus({ region: code, animate: false });
      return;
    }
  } catch(e) { /* pas disponible — on reste sur la vue mondiale */ }

  // Fallback : centrer via la bounding box SVG du chemin
  try {
    const path = document.querySelector(`#map [data-code="${code}"]`);
    if (!path) return;
    const bb   = path.getBBox();
    const svg  = document.querySelector('#map svg');
    if (!svg) return;
    const vb   = svg.viewBox.baseVal;
    if (!vb || !vb.width) return;

    // Centre du pays dans l'espace SVG
    const cx = bb.x + bb.width  / 2;
    const cy = bb.y + bb.height / 2;

    // Facteur de zoom : plus le pays est petit, plus on zoome
    const maxDim = Math.max(bb.width, bb.height);
    const scale  = Math.min(6, Math.max(1.5, vb.width / (maxDim * 3)));

    // Translateion pour centrer
    const mapW = svg.clientWidth  || svg.getBoundingClientRect().width;
    const mapH = svg.clientHeight || svg.getBoundingClientRect().height;
    const tx   = mapW / 2 - cx * scale;
    const ty   = mapH / 2 - cy * scale;

    const g = svg.querySelector('g');
    if (g) g.setAttribute('transform', `translate(${tx},${ty}) scale(${scale})`);
  } catch(e) { /* fallback silencieux */ }
}

// ─── THÈME CHANGE ─────────────────────────────────────────────────
function applyThemeToMap() {
  if (!mapInstance) return;
  const svg = document.querySelector('#map svg');
  if (svg) svg.style.background = bgColor();
  resetAllColors();
  // Re-mettre en violet le pays actuel si une question est en cours
  if (isGameActive() && state.session.length) {
    const country = state.session[state.index];
    if (country) setRegionFill(country.code, state.answered ? CORRECT_COL : ACCENT_COL);
  }
}

new MutationObserver(() => applyThemeToMap())
  .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
window.addEventListener('themechange', applyThemeToMap);

function isGameActive() {
  return !document.getElementById('game-screen').classList.contains('hidden');
}

// ─── UTILS ────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── START GAME ──────────────────────────────────────────────────
window.startGame = function () {
  const pool = state.continent === 'all'
    ? [...COUNTRIES]
    : COUNTRIES.filter(c => c.c === state.continent);

  if (pool.length < 4) {
    alert('Pas assez de pays dans cette région (minimum 4).');
    return;
  }

  state.session = shuffle(pool).slice(0, Math.min(state.totalQ, pool.length));
  state.index   = 0;
  state.score   = 0;
  state.correct = 0;

  document.getElementById('screen-home').classList.add('hidden');
  document.getElementById('screen-result').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  document.getElementById('topbar').classList.remove('hidden');
  document.getElementById('btn-next').style.display = 'none';

  if (!mapInstance) {
    initMap();
  } else {
    resetAllColors();
  }

  askQuestion();
};

// ─── QUESTION ─────────────────────────────────────────────────────
function askQuestion() {
  state.answered = false;

  const country = state.session[state.index];

  document.getElementById('tb-count').textContent = `${state.index + 1} / ${state.session.length}`;
  document.getElementById('tb-score').textContent = `${state.score} pts`;
  document.getElementById('pbar').style.width     = `${(state.index / state.session.length) * 100}%`;
  document.getElementById('tb-q').textContent     = 'De quel pays s\'agit-il ?';
  document.getElementById('btn-next').style.display = 'none';

  resetAllColors();
  setRegionFill(country.code, ACCENT_COL);

  focusOnCountry(country.code);
  renderAnswerButtons(country);
}

// ─── GÉNÉRATION DES 4 BOUTONS ─────────────────────────────────────
function renderAnswerButtons(correct) {
  const grid = document.getElementById('answer-grid');
  grid.innerHTML = '';

  // 3 mauvaises réponses : même continent si possible, sinon random
  const sameContinent = COUNTRIES.filter(c => c.code !== correct.code && c.c === correct.c);
  const others        = COUNTRIES.filter(c => c.code !== correct.code && c.c !== correct.c);

  let wrongPool = sameContinent.length >= 3 ? sameContinent : [...sameContinent, ...others];
  const wrong   = shuffle(wrongPool).slice(0, 3);

  const choices = shuffle([correct, ...wrong]);

  choices.forEach(country => {
    const btn = document.createElement('button');
    btn.className         = 'ans-btn';
    btn.textContent       = country.name;
    btn.dataset.code      = country.code;
    btn.addEventListener('click', () => handleAnswer(country.code, correct.code));
    grid.appendChild(btn);
  });
}

// ─── RÉPONSE ──────────────────────────────────────────────────────
function handleAnswer(clicked, correctCode) {
  if (state.answered) return;
  state.answered = true;

  const isCorrect = clicked === correctCode;

  if (isCorrect) {
    state.score++;
    state.correct++;
    setRegionFill(correctCode, CORRECT_COL);
  } else {
    setRegionFill(correctCode, CORRECT_COL);
    setRegionFill(clicked,     WRONG_COL);
  }

  document.getElementById('tb-score').textContent = `${state.score} pts`;

  // Colorier les boutons
  document.querySelectorAll('.ans-btn').forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.code === correctCode) {
      btn.classList.add('correct');
    } else if (btn.dataset.code === clicked && !isCorrect) {
      btn.classList.add('wrong');
    }
  });

  // Bouton suivant
  const btnNext = document.getElementById('btn-next');
  btnNext.textContent   = (state.index + 1 >= state.session.length) ? 'Voir le résultat 🏆' : 'Question suivante →';
  btnNext.style.display = 'block';
}

// ─── SUIVANT ─────────────────────────────────────────────────────
window.nextQuestion = function () {
  state.index++;
  if (state.index >= state.session.length) {
    showResult();
  } else {
    askQuestion();
  }
};

// ─── RÉSULTAT ─────────────────────────────────────────────────────
function showResult() {
  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('topbar').classList.add('hidden');

  const total = state.session.length;
  const pct   = Math.round((state.correct / total) * 100);

  document.getElementById('res-pts').textContent     = state.score;
  document.getElementById('res-correct').textContent = state.correct;
  document.getElementById('res-total').textContent   = total;
  document.getElementById('res-emoji').textContent   = pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '😅';
  document.getElementById('res-detail').textContent  = `${pct} % de réussite`;

  document.getElementById('screen-result').classList.remove('hidden');
}

// ─── ACCUEIL ──────────────────────────────────────────────────────
window.goHome = function () {
  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('topbar').classList.add('hidden');
  document.getElementById('screen-result').classList.add('hidden');
  document.getElementById('btn-next').style.display = 'none';
  resetAllColors();
  document.getElementById('screen-home').classList.remove('hidden');
};
