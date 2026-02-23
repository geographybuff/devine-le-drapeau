"use strict";
/* ================================================================
   MODE CARTE — map.js
   Leaflet + GeoJSON Natural Earth 110m
================================================================ */

// ─── PAYS JOUABLES ──────────────────────────────────────────────
const COUNTRIES = [
  {code:"dz",name:"Algérie",c:"af"},{code:"ao",name:"Angola",c:"af"},
  {code:"bj",name:"Bénin",c:"af"},{code:"bw",name:"Botswana",c:"af"},
  {code:"bf",name:"Burkina Faso",c:"af"},{code:"bi",name:"Burundi",c:"af"},
  {code:"cm",name:"Cameroun",c:"af"},{code:"cv",name:"Cap-Vert",c:"af"},
  {code:"cf",name:"Rép. centrafricaine",c:"af"},{code:"td",name:"Tchad",c:"af"},
  {code:"km",name:"Comores",c:"af"},{code:"cg",name:"Congo",c:"af"},
  {code:"cd",name:"R.D. Congo",c:"af"},{code:"dj",name:"Djibouti",c:"af"},
  {code:"eg",name:"Égypte",c:"af"},{code:"gq",name:"Guinée équatoriale",c:"af"},
  {code:"er",name:"Érythrée",c:"af"},{code:"et",name:"Éthiopie",c:"af"},
  {code:"ga",name:"Gabon",c:"af"},{code:"gm",name:"Gambie",c:"af"},
  {code:"gh",name:"Ghana",c:"af"},{code:"gn",name:"Guinée",c:"af"},
  {code:"gw",name:"Guinée-Bissau",c:"af"},{code:"ci",name:"Côte d'Ivoire",c:"af"},
  {code:"ke",name:"Kenya",c:"af"},{code:"ls",name:"Lesotho",c:"af"},
  {code:"lr",name:"Libéria",c:"af"},{code:"ly",name:"Libye",c:"af"},
  {code:"mg",name:"Madagascar",c:"af"},{code:"mw",name:"Malawi",c:"af"},
  {code:"ml",name:"Mali",c:"af"},{code:"mr",name:"Mauritanie",c:"af"},
  {code:"ma",name:"Maroc",c:"af"},{code:"mz",name:"Mozambique",c:"af"},
  {code:"na",name:"Namibie",c:"af"},{code:"ne",name:"Niger",c:"af"},
  {code:"ng",name:"Nigeria",c:"af"},{code:"rw",name:"Rwanda",c:"af"},
  {code:"sn",name:"Sénégal",c:"af"},{code:"sl",name:"Sierra Leone",c:"af"},
  {code:"so",name:"Somalie",c:"af"},{code:"za",name:"Afrique du Sud",c:"af"},
  {code:"ss",name:"Soudan du Sud",c:"af"},{code:"sd",name:"Soudan",c:"af"},
  {code:"sz",name:"Eswatini",c:"af"},{code:"tz",name:"Tanzanie",c:"af"},
  {code:"tg",name:"Togo",c:"af"},{code:"tn",name:"Tunisie",c:"af"},
  {code:"ug",name:"Ouganda",c:"af"},{code:"zm",name:"Zambie",c:"af"},
  {code:"zw",name:"Zimbabwe",c:"af"},
  {code:"ar",name:"Argentine",c:"am"},{code:"bs",name:"Bahamas",c:"am"},
  {code:"bz",name:"Belize",c:"am"},{code:"bo",name:"Bolivie",c:"am"},
  {code:"br",name:"Brésil",c:"am"},{code:"ca",name:"Canada",c:"am"},
  {code:"cl",name:"Chili",c:"am"},{code:"co",name:"Colombie",c:"am"},
  {code:"cr",name:"Costa Rica",c:"am"},{code:"cu",name:"Cuba",c:"am"},
  {code:"do",name:"Rép. dominicaine",c:"am"},{code:"ec",name:"Équateur",c:"am"},
  {code:"sv",name:"Salvador",c:"am"},{code:"gt",name:"Guatemala",c:"am"},
  {code:"gy",name:"Guyana",c:"am"},{code:"ht",name:"Haïti",c:"am"},
  {code:"hn",name:"Honduras",c:"am"},{code:"jm",name:"Jamaïque",c:"am"},
  {code:"mx",name:"Mexique",c:"am"},{code:"ni",name:"Nicaragua",c:"am"},
  {code:"pa",name:"Panama",c:"am"},{code:"py",name:"Paraguay",c:"am"},
  {code:"pe",name:"Pérou",c:"am"},{code:"sr",name:"Suriname",c:"am"},
  {code:"tt",name:"Trinité-et-Tobago",c:"am"},{code:"us",name:"États-Unis",c:"am"},
  {code:"uy",name:"Uruguay",c:"am"},{code:"ve",name:"Venezuela",c:"am"},
  {code:"af",name:"Afghanistan",c:"as"},{code:"am",name:"Arménie",c:"as"},
  {code:"az",name:"Azerbaïdjan",c:"as"},{code:"bd",name:"Bangladesh",c:"as"},
  {code:"bt",name:"Bhoutan",c:"as"},{code:"bn",name:"Brunéi",c:"as"},
  {code:"kh",name:"Cambodge",c:"as"},{code:"cn",name:"Chine",c:"as"},
  {code:"cy",name:"Chypre",c:"as"},{code:"ge",name:"Géorgie",c:"as"},
  {code:"in",name:"Inde",c:"as"},{code:"id",name:"Indonésie",c:"as"},
  {code:"ir",name:"Iran",c:"as"},{code:"iq",name:"Irak",c:"as"},
  {code:"il",name:"Israël",c:"as"},{code:"jp",name:"Japon",c:"as"},
  {code:"jo",name:"Jordanie",c:"as"},{code:"kz",name:"Kazakhstan",c:"as"},
  {code:"kw",name:"Koweït",c:"as"},{code:"kg",name:"Kirghizistan",c:"as"},
  {code:"la",name:"Laos",c:"as"},{code:"lb",name:"Liban",c:"as"},
  {code:"my",name:"Malaisie",c:"as"},{code:"mn",name:"Mongolie",c:"as"},
  {code:"mm",name:"Myanmar",c:"as"},{code:"np",name:"Népal",c:"as"},
  {code:"kp",name:"Corée du Nord",c:"as"},{code:"om",name:"Oman",c:"as"},
  {code:"pk",name:"Pakistan",c:"as"},{code:"ph",name:"Philippines",c:"as"},
  {code:"qa",name:"Qatar",c:"as"},{code:"sa",name:"Arabie saoudite",c:"as"},
  {code:"sg",name:"Singapour",c:"as"},{code:"kr",name:"Corée du Sud",c:"as"},
  {code:"lk",name:"Sri Lanka",c:"as"},{code:"sy",name:"Syrie",c:"as"},
  {code:"tw",name:"Taïwan",c:"as"},{code:"tj",name:"Tadjikistan",c:"as"},
  {code:"th",name:"Thaïlande",c:"as"},{code:"tr",name:"Turquie",c:"as"},
  {code:"tm",name:"Turkménistan",c:"as"},{code:"ae",name:"Émirats arabes unis",c:"as"},
  {code:"uz",name:"Ouzbékistan",c:"as"},{code:"vn",name:"Viêt Nam",c:"as"},
  {code:"ye",name:"Yémen",c:"as"},
  {code:"al",name:"Albanie",c:"eu"},{code:"at",name:"Autriche",c:"eu"},
  {code:"by",name:"Biélorussie",c:"eu"},{code:"be",name:"Belgique",c:"eu"},
  {code:"ba",name:"Bosnie-Herzégovine",c:"eu"},{code:"bg",name:"Bulgarie",c:"eu"},
  {code:"hr",name:"Croatie",c:"eu"},{code:"cz",name:"Tchéquie",c:"eu"},
  {code:"dk",name:"Danemark",c:"eu"},{code:"ee",name:"Estonie",c:"eu"},
  {code:"fi",name:"Finlande",c:"eu"},{code:"fr",name:"France",c:"eu"},
  {code:"de",name:"Allemagne",c:"eu"},{code:"gr",name:"Grèce",c:"eu"},
  {code:"hu",name:"Hongrie",c:"eu"},{code:"is",name:"Islande",c:"eu"},
  {code:"ie",name:"Irlande",c:"eu"},{code:"it",name:"Italie",c:"eu"},
  {code:"lv",name:"Lettonie",c:"eu"},{code:"lt",name:"Lituanie",c:"eu"},
  {code:"lu",name:"Luxembourg",c:"eu"},{code:"mt",name:"Malte",c:"eu"},
  {code:"md",name:"Moldavie",c:"eu"},{code:"me",name:"Monténégro",c:"eu"},
  {code:"nl",name:"Pays-Bas",c:"eu"},{code:"mk",name:"Macédoine du Nord",c:"eu"},
  {code:"no",name:"Norvège",c:"eu"},{code:"pl",name:"Pologne",c:"eu"},
  {code:"pt",name:"Portugal",c:"eu"},{code:"ro",name:"Roumanie",c:"eu"},
  {code:"ru",name:"Russie",c:"eu"},{code:"rs",name:"Serbie",c:"eu"},
  {code:"sk",name:"Slovaquie",c:"eu"},{code:"si",name:"Slovénie",c:"eu"},
  {code:"es",name:"Espagne",c:"eu"},{code:"se",name:"Suède",c:"eu"},
  {code:"ch",name:"Suisse",c:"eu"},{code:"ua",name:"Ukraine",c:"eu"},
  {code:"gb",name:"Royaume-Uni",c:"eu"},
  {code:"au",name:"Australie",c:"oc"},{code:"fj",name:"Fidji",c:"oc"},
  {code:"nz",name:"Nouvelle-Zélande",c:"oc"},{code:"pg",name:"Papouasie",c:"oc"},
  {code:"sb",name:"Îles Salomon",c:"oc"},{code:"vu",name:"Vanuatu",c:"oc"},
];

const CONTINENTS = [
  {id:"all",name:"Monde entier",icon:"🌐"},
  {id:"af", name:"Afrique",     icon:"🌍"},
  {id:"am", name:"Amériques",   icon:"🌎"},
  {id:"as", name:"Asie",        icon:"🌏"},
  {id:"eu", name:"Europe",      icon:"🏰"},
  {id:"oc", name:"Océanie",     icon:"🏝️"},
];

// ─── THÈME ───────────────────────────────────────────────────────
function getTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}
function countryStyle(isDark) {
  return {
    fillColor: isDark ? '#2a2d3e' : '#dde3f0',
    color: isDark ? '#3d4160' : '#b0bacf',
    weight: 1,
    fillOpacity: 1
  };
}
function highlightStyle() {
  return { fillColor: '#6c63ff', color: '#6c63ff', weight: 2, fillOpacity: .85 };
}
function correctStyle() {
  return { fillColor: '#22c55e', color: '#22c55e', weight: 2, fillOpacity: .9 };
}
function wrongStyle() {
  return { fillColor: '#ef4444', color: '#ef4444', weight: 2, fillOpacity: .7 };
}

// ─── MAP INIT ────────────────────────────────────────────────────
const map = L.map('map', {
  center: [20, 10],
  zoom: 2,
  minZoom: 1,
  maxZoom: 6,
  zoomControl: true,
  attributionControl: false,
  worldCopyJump: false,
});

let geojsonLayer = null;
let layerByCode = {};  // ISO_A2 (lowercase) → Leaflet layer

// ─── ISO_A2 ALIASES (certains pays ont des codes spéciaux dans Natural Earth) ──
const ALIASES = {
  'xk': 'XK',  // Kosovo
  'tw': 'TW',  // Taïwan
  'ps': 'PS',  // Palestine
};

// ─── CHARGER LE GEOJSON ──────────────────────────────────────────
async function loadGeoJSON() {
  try {
    const resp = await fetch(
      'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'
    );
    const data = await resp.json();
    buildMap(data);
  } catch (e) {
    console.error('GeoJSON load error', e);
  }
}

function buildMap(data) {
  const isDark = getTheme() === 'dark';
  geojsonLayer = L.geoJSON(data, {
    style: () => countryStyle(isDark),
    onEachFeature: (feature, layer) => {
      const iso = (feature.properties.ISO_A2 || '').toLowerCase();
      if (iso && iso !== '-9') {
        layerByCode[iso] = layer;
      }
      // Also map by ISO_A2_EH for some edge cases
      const iso2 = (feature.properties.ISO_A2_EH || '').toLowerCase();
      if (iso2 && iso2 !== '-9' && !layerByCode[iso2]) {
        layerByCode[iso2] = layer;
      }
      layer.on('click', () => handleMapClick(iso));
    }
  }).addTo(map);
}

// Update map colors when theme changes
window.addEventListener('themechange', () => {
  if (!geojsonLayer) return;
  const isDark = getTheme() === 'dark';
  geojsonLayer.setStyle(countryStyle(isDark));
  if (state.answered && state.lastCorrectCode) {
    const cl = layerByCode[state.lastCorrectCode];
    if (cl) cl.setStyle(correctStyle());
  }
  if (state.answered && state.lastWrongCode) {
    const wl = layerByCode[state.lastWrongCode];
    if (wl) wl.setStyle(wrongStyle());
  }
});

// ─── ÉTAT JEUX ───────────────────────────────────────────────────
const state = {
  continent: 'all',
  totalQ: 10,
  pool: [],
  session: [],
  index: 0,
  score: 0,
  answered: false,
  correctCountry: null,
  lastCorrectCode: null,
  lastWrongCode: null,
};

// ─── INIT UI ─────────────────────────────────────────────────────
function buildContChips() {
  const row = document.getElementById('cont-chips');
  CONTINENTS.forEach(cont => {
    const btn = document.createElement('button');
    btn.className = 'cont-chip' + (cont.id === 'all' ? ' selected' : '');
    btn.textContent = `${cont.icon} ${cont.name}`;
    btn.dataset.id = cont.id;
    btn.onclick = () => {
      document.querySelectorAll('.cont-chip').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.continent = cont.id;
    };
    row.appendChild(btn);
  });
}

function buildQChips() {
  document.querySelectorAll('[data-q]').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('[data-q]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.totalQ = parseInt(btn.dataset.q);
    };
  });
}

// ─── GAME FLOW ───────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

window.startGame = function() {
  if (Object.keys(layerByCode).length === 0) {
    // GeoJSON pas encore chargé — attendre
    document.querySelector('.btn-ov-primary').textContent = '⏳ Chargement de la carte…';
    const wait = setInterval(() => {
      if (Object.keys(layerByCode).length > 0) {
        clearInterval(wait);
        document.querySelector('.btn-ov-primary').textContent = 'C\'est parti ! 🚀';
        window.startGame();
      }
    }, 300);
    return;
  }

  state.pool = state.continent === 'all'
    ? [...COUNTRIES]
    : COUNTRIES.filter(c => c.c === state.continent);

  // Filter to only countries that exist in the GeoJSON
  const available = state.pool.filter(c => layerByCode[c.code]);
  if (available.length < 4) {
    alert('Pas assez de pays disponibles pour cette région. Essayez "Monde entier".');
    return;
  }

  state.session = shuffle(available).slice(0, Math.min(state.totalQ, available.length));
  state.index = 0;
  state.score = 0;
  state.answered = false;

  document.getElementById('screen-home').classList.add('hidden');
  document.getElementById('map-ui').style.display = 'flex';
  askQuestion();
};

function askQuestion() {
  if (!geojsonLayer) { setTimeout(askQuestion, 500); return; }

  // Reset map styles
  const isDark = getTheme() === 'dark';
  geojsonLayer.setStyle(countryStyle(isDark));
  state.lastCorrectCode = null;
  state.lastWrongCode = null;

  const country = state.session[state.index];
  state.correctCountry = country;
  state.answered = false;

  // Update top bar
  document.getElementById('map-question').textContent = `🔍 Où est ${country.name} ?`;
  document.getElementById('map-counter').textContent = `${state.index + 1}/${state.session.length}`;
  document.getElementById('map-score').textContent = `${state.score} pts`;
  document.getElementById('map-pbar').style.width = `${(state.index / state.session.length) * 100}%`;

  // Hide feedback & next button
  const fb = document.getElementById('map-feedback');
  fb.style.display = 'none';
  document.getElementById('btn-map-next').style.display = 'none';

  // Hint: highlight the continent zone
  fitContinent(country.c);
}

function fitContinent(c) {
  const bounds = {
    af: [[-35, -20], [38, 52]],
    am: [[-56, -118], [60, -34]],
    as: [[-10, 26], [55, 150]],
    eu: [[35, -25], [72, 45]],
    oc: [[-50, 110], [10, 180]],
  };
  if (bounds[c]) {
    map.fitBounds(bounds[c], { padding: [20, 20], animate: true, duration: .5 });
  } else {
    map.setView([20, 10], 2);
  }
}

function handleMapClick(clickedCode) {
  if (state.answered || !state.correctCountry) return;
  if (!clickedCode || clickedCode === '-9') return;

  state.answered = true;
  const isOk = clickedCode === state.correctCountry.code;

  // Style clicked country
  const clickedLayer = layerByCode[clickedCode];
  const correctLayer = layerByCode[state.correctCountry.code];

  if (isOk) {
    state.score++;
    state.lastCorrectCode = clickedCode;
    if (clickedLayer) clickedLayer.setStyle(correctStyle());
  } else {
    state.lastWrongCode = clickedCode;
    state.lastCorrectCode = state.correctCountry.code;
    if (clickedLayer) clickedLayer.setStyle(wrongStyle());
    if (correctLayer) {
      correctLayer.setStyle(highlightStyle());
      // Zoom to correct country
      try { map.fitBounds(correctLayer.getBounds(), { padding: [40, 40], maxZoom: 5, animate: true }); } catch {}
    }
  }

  // Feedback
  const fb = document.getElementById('map-feedback');
  fb.className = `map-feedback ${isOk ? 'ok' : 'bad'}`;
  fb.style.display = 'block';
  fb.innerHTML = isOk
    ? `✓ Correct ! C'est bien <strong>${state.correctCountry.name}</strong>`
    : `✗ Incorrect. <strong>${state.correctCountry.name}</strong> est en surbrillance.`;

  // Next button
  const nextBtn = document.getElementById('btn-map-next');
  nextBtn.textContent = state.index >= state.session.length - 1 ? 'Voir les résultats →' : 'Suivant →';
  nextBtn.style.display = 'block';
}

window.nextQuestion = function() {
  if (state.index >= state.session.length - 1) {
    showResult();
    return;
  }
  state.index++;
  askQuestion();
};

window.endGame = function() {
  goHome();
};

function showResult() {
  document.getElementById('map-ui').style.display = 'none';
  document.getElementById('map-feedback').style.display = 'none';
  document.getElementById('btn-map-next').style.display = 'none';

  const s = state.score;
  const t = state.session.length;
  const pct = s / t;
  let emoji, title, sub;
  if (pct === 1)       { emoji='🏆'; title='Score parfait !';   sub='Vous connaissez parfaitement la carte !'; }
  else if (pct >= .8)  { emoji='🎉'; title='Excellent !';       sub='Très bonne maîtrise de la géographie !'; }
  else if (pct >= .5)  { emoji='👍'; title='Pas mal !';         sub='Continuez à vous entraîner !'; }
  else                 { emoji='📚'; title='À améliorer…';      sub='Révisez la carte et recommencez !'; }

  document.getElementById('res-emoji').textContent = emoji;
  document.getElementById('res-title').textContent = title;
  document.getElementById('res-sub').textContent = sub;
  document.getElementById('res-score').textContent = s;
  document.getElementById('res-total').textContent = t;
  document.getElementById('screen-result').classList.remove('hidden');

  // Reset map
  if (geojsonLayer) {
    const isDark = getTheme() === 'dark';
    geojsonLayer.setStyle(countryStyle(isDark));
  }
}

window.replayGame = function() {
  document.getElementById('screen-result').classList.add('hidden');
  startGame();
};

window.goHome = function() {
  document.getElementById('screen-result').classList.add('hidden');
  document.getElementById('map-ui').style.display = 'none';
  document.getElementById('map-feedback').style.display = 'none';
  document.getElementById('btn-map-next').style.display = 'none';
  document.getElementById('screen-home').classList.remove('hidden');
  if (geojsonLayer) {
    const isDark = getTheme() === 'dark';
    geojsonLayer.setStyle(countryStyle(isDark));
  }
  map.setView([20, 10], 2);
};

// ─── BOOT ────────────────────────────────────────────────────────
buildContChips();
buildQChips();
loadGeoJSON();
