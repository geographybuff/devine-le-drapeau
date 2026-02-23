// duel.js — Mode 1v1 en ligne via Firebase Firestore
// ES Module (type="module" dans duel.html)

import { db } from './firebase.js';
import {
  doc, setDoc, getDoc, updateDoc, onSnapshot,
  serverTimestamp, deleteDoc, collection
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// ─── PAYS (pour générer les questions) ───────────────────────────
const COUNTRIES = [
  {code:"dz",name:"Algérie"},{code:"ao",name:"Angola"},{code:"bj",name:"Bénin"},
  {code:"bw",name:"Botswana"},{code:"bf",name:"Burkina Faso"},{code:"bi",name:"Burundi"},
  {code:"cm",name:"Cameroun"},{code:"cv",name:"Cap-Vert"},{code:"cf",name:"Rép. centrafricaine"},
  {code:"td",name:"Tchad"},{code:"km",name:"Comores"},{code:"cg",name:"Congo"},
  {code:"cd",name:"R.D. Congo"},{code:"dj",name:"Djibouti"},{code:"eg",name:"Égypte"},
  {code:"gq",name:"Guinée équatoriale"},{code:"er",name:"Érythrée"},{code:"et",name:"Éthiopie"},
  {code:"ga",name:"Gabon"},{code:"gm",name:"Gambie"},{code:"gh",name:"Ghana"},
  {code:"gn",name:"Guinée"},{code:"gw",name:"Guinée-Bissau"},{code:"ci",name:"Côte d'Ivoire"},
  {code:"ke",name:"Kenya"},{code:"ls",name:"Lesotho"},{code:"lr",name:"Libéria"},
  {code:"ly",name:"Libye"},{code:"mg",name:"Madagascar"},{code:"mw",name:"Malawi"},
  {code:"ml",name:"Mali"},{code:"mr",name:"Mauritanie"},{code:"mu",name:"Maurice"},
  {code:"ma",name:"Maroc"},{code:"mz",name:"Mozambique"},{code:"na",name:"Namibie"},
  {code:"ne",name:"Niger"},{code:"ng",name:"Nigeria"},{code:"rw",name:"Rwanda"},
  {code:"sn",name:"Sénégal"},{code:"sc",name:"Seychelles"},{code:"sl",name:"Sierra Leone"},
  {code:"so",name:"Somalie"},{code:"za",name:"Afrique du Sud"},{code:"ss",name:"Soudan du Sud"},
  {code:"sd",name:"Soudan"},{code:"tz",name:"Tanzanie"},{code:"tg",name:"Togo"},
  {code:"tn",name:"Tunisie"},{code:"ug",name:"Ouganda"},{code:"zm",name:"Zambie"},
  {code:"zw",name:"Zimbabwe"},{code:"sz",name:"Eswatini"},{code:"st",name:"Sao Tomé"},
  {code:"ag",name:"Antigua-et-Barbuda"},{code:"ar",name:"Argentine"},{code:"bs",name:"Bahamas"},
  {code:"bb",name:"Barbade"},{code:"bz",name:"Belize"},{code:"bo",name:"Bolivie"},
  {code:"br",name:"Brésil"},{code:"ca",name:"Canada"},{code:"cl",name:"Chili"},
  {code:"co",name:"Colombie"},{code:"cr",name:"Costa Rica"},{code:"cu",name:"Cuba"},
  {code:"dm",name:"Dominique"},{code:"do",name:"Rép. dominicaine"},{code:"ec",name:"Équateur"},
  {code:"sv",name:"Salvador"},{code:"gd",name:"Grenade"},{code:"gt",name:"Guatemala"},
  {code:"gy",name:"Guyane"},{code:"ht",name:"Haïti"},{code:"hn",name:"Honduras"},
  {code:"jm",name:"Jamaïque"},{code:"mx",name:"Mexique"},{code:"ni",name:"Nicaragua"},
  {code:"pa",name:"Panama"},{code:"py",name:"Paraguay"},{code:"pe",name:"Pérou"},
  {code:"kn",name:"Saint-Kitts"},{code:"lc",name:"Sainte-Lucie"},{code:"vc",name:"Saint-Vincent"},
  {code:"sr",name:"Suriname"},{code:"tt",name:"Trinité-et-Tobago"},{code:"us",name:"États-Unis"},
  {code:"uy",name:"Uruguay"},{code:"ve",name:"Venezuela"},{code:"af",name:"Afghanistan"},
  {code:"am",name:"Arménie"},{code:"az",name:"Azerbaïdjan"},{code:"bh",name:"Bahreïn"},
  {code:"bd",name:"Bangladesh"},{code:"bt",name:"Bhoutan"},{code:"bn",name:"Brunei"},
  {code:"kh",name:"Cambodge"},{code:"cn",name:"Chine"},{code:"cy",name:"Chypre"},
  {code:"ge",name:"Géorgie"},{code:"in",name:"Inde"},{code:"id",name:"Indonésie"},
  {code:"ir",name:"Iran"},{code:"iq",name:"Irak"},{code:"il",name:"Israël"},
  {code:"jp",name:"Japon"},{code:"jo",name:"Jordanie"},{code:"kz",name:"Kazakhstan"},
  {code:"kw",name:"Koweït"},{code:"kg",name:"Kirghizistan"},{code:"la",name:"Laos"},
  {code:"lb",name:"Liban"},{code:"my",name:"Malaisie"},{code:"mv",name:"Maldives"},
  {code:"mn",name:"Mongolie"},{code:"mm",name:"Myanmar"},{code:"np",name:"Népal"},
  {code:"kp",name:"Corée du Nord"},{code:"om",name:"Oman"},{code:"pk",name:"Pakistan"},
  {code:"ph",name:"Philippines"},{code:"qa",name:"Qatar"},{code:"sa",name:"Arabie saoudite"},
  {code:"sg",name:"Singapour"},{code:"kr",name:"Corée du Sud"},{code:"lk",name:"Sri Lanka"},
  {code:"sy",name:"Syrie"},{code:"tw",name:"Taïwan"},{code:"tj",name:"Tadjikistan"},
  {code:"th",name:"Thaïlande"},{code:"tl",name:"Timor oriental"},{code:"tr",name:"Turquie"},
  {code:"tm",name:"Turkménistan"},{code:"ae",name:"Émirats arabes unis"},{code:"uz",name:"Ouzbékistan"},
  {code:"vn",name:"Viêt Nam"},{code:"ye",name:"Yémen"},{code:"al",name:"Albanie"},
  {code:"ad",name:"Andorre"},{code:"at",name:"Autriche"},{code:"by",name:"Biélorussie"},
  {code:"be",name:"Belgique"},{code:"ba",name:"Bosnie-Herzégovine"},{code:"bg",name:"Bulgarie"},
  {code:"hr",name:"Croatie"},{code:"cz",name:"Tchéquie"},{code:"dk",name:"Danemark"},
  {code:"ee",name:"Estonie"},{code:"fi",name:"Finlande"},{code:"fr",name:"France"},
  {code:"de",name:"Allemagne"},{code:"gr",name:"Grèce"},{code:"hu",name:"Hongrie"},
  {code:"is",name:"Islande"},{code:"ie",name:"Irlande"},{code:"it",name:"Italie"},
  {code:"xk",name:"Kosovo"},{code:"lv",name:"Lettonie"},{code:"li",name:"Liechtenstein"},
  {code:"lt",name:"Lituanie"},{code:"lu",name:"Luxembourg"},{code:"mt",name:"Malte"},
  {code:"md",name:"Moldavie"},{code:"mc",name:"Monaco"},{code:"me",name:"Monténégro"},
  {code:"nl",name:"Pays-Bas"},{code:"mk",name:"Macédoine du Nord"},{code:"no",name:"Norvège"},
  {code:"pl",name:"Pologne"},{code:"pt",name:"Portugal"},{code:"ro",name:"Roumanie"},
  {code:"ru",name:"Russie"},{code:"sm",name:"Saint-Marin"},{code:"rs",name:"Serbie"},
  {code:"sk",name:"Slovaquie"},{code:"si",name:"Slovénie"},{code:"es",name:"Espagne"},
  {code:"se",name:"Suède"},{code:"ch",name:"Suisse"},{code:"ua",name:"Ukraine"},
  {code:"gb",name:"Royaume-Uni"},{code:"va",name:"Vatican"},{code:"au",name:"Australie"},
  {code:"fj",name:"Fidji"},{code:"ki",name:"Kiribati"},{code:"mh",name:"Marshall"},
  {code:"fm",name:"Micronésie"},{code:"nr",name:"Nauru"},{code:"nz",name:"Nouvelle-Zélande"},
  {code:"pw",name:"Palaos"},{code:"pg",name:"Papouasie"},{code:"ws",name:"Samoa"},
  {code:"sb",name:"Salomon"},{code:"to",name:"Tonga"},{code:"tv",name:"Tuvalu"},
  {code:"vu",name:"Vanuatu"}
];

// ─── UTILITAIRES ─────────────────────────────────────────────────
function flagImg(code) {
  return `<img src="https://flagcdn.com/w160/${code.toLowerCase()}.png"
    srcset="https://flagcdn.com/w320/${code.toLowerCase()}.png 2x"
    style="max-width:180px;border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,.25);"
    alt="drapeau"/>`;
}

function randomCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateQuestions(n) {
  const pool = shuffle(COUNTRIES).slice(0, n);
  return pool.map(country => {
    const wrongs = shuffle(COUNTRIES.filter(c => c.code !== country.code)).slice(0, 3);
    const options = shuffle([country, ...wrongs]).map(c => c.name);
    return { code: country.code, answer: country.name, options };
  });
}

// ─── ÉTAT LOCAL ──────────────────────────────────────────────────
let state = {
  roomId: null,
  playerId: null,      // "player1" ou "player2"
  myName: null,
  roomRef: null,
  unsubscribe: null,
  currentQ: 0,
  totalQ: 10,
  myScore: 0,
  oppScore: 0,
  answered: false,
  timerInterval: null,
  timerStart: null,
  TIMER_SEC: 12
};

// ─── NAVIGATION ──────────────────────────────────────────────────
window.showScreen = function(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
};

// ─── CRÉER UNE PARTIE ────────────────────────────────────────────
window.createRoom = async function() {
  const name = document.getElementById('create-name').value.trim();
  const qcount = parseInt(document.getElementById('create-qcount').value);
  const err = document.getElementById('create-error');

  if (!name) { err.textContent = 'Entre ton pseudo !'; return; }
  err.textContent = '';

  const roomId = randomCode();
  state.roomId = roomId;
  state.playerId = 'player1';
  state.myName = name;
  state.totalQ = qcount;
  state.roomRef = doc(db, 'rooms', roomId);

  await setDoc(state.roomRef, {
    status: 'waiting',
    totalQ: qcount,
    player1: { name, score: 0 },
    player2: null,
    questions: null,
    currentQ: 0,
    answers: { player1: null, player2: null },
    createdAt: serverTimestamp()
  });

  state.unsubscribe = onSnapshot(state.roomRef, snap => handleRoomUpdate(snap.data()));
  showLobby();
};

// ─── REJOINDRE UNE PARTIE ────────────────────────────────────────
window.joinRoom = async function() {
  const name = document.getElementById('join-name').value.trim();
  const code = document.getElementById('join-code').value.trim().toUpperCase();
  const err = document.getElementById('join-error');

  if (!name) { err.textContent = 'Entre ton pseudo !'; return; }
  if (!code || code.length < 4) { err.textContent = 'Entre un code valide (4 chiffres) !'; return; }
  err.textContent = '';

  const roomRef = doc(db, 'rooms', code);
  const snap = await getDoc(roomRef);

  if (!snap.exists()) { err.textContent = 'Aucune partie avec ce code.'; return; }
  const data = snap.data();
  if (data.status !== 'waiting') { err.textContent = 'Cette partie a déjà commencé ou est terminée.'; return; }
  if (data.player2) { err.textContent = 'Cette partie est déjà pleine.'; return; }

  state.roomId = code;
  state.playerId = 'player2';
  state.myName = name;
  state.totalQ = data.totalQ;
  state.roomRef = roomRef;

  await updateDoc(roomRef, {
    'player2': { name, score: 0 },
    'status': 'ready'
  });

  state.unsubscribe = onSnapshot(roomRef, snap => handleRoomUpdate(snap.data()));
  showLobby();
};

// ─── AFFICHER LE LOBBY ───────────────────────────────────────────
function showLobby() {
  showScreen('screen-lobby');
  document.getElementById('lobby-code').textContent = state.roomId;
  document.getElementById('p1-name').textContent = state.myName;
}

// ─── DÉMARRER LA PARTIE (host seulement) ─────────────────────────
window.startGame = async function() {
  if (state.playerId !== 'player1') return;
  const questions = generateQuestions(state.totalQ);
  await updateDoc(state.roomRef, {
    status: 'playing',
    questions,
    currentQ: 0,
    answers: { player1: null, player2: null }
  });
};

// ─── QUITTER ─────────────────────────────────────────────────────
window.leaveRoom = async function() {
  if (state.unsubscribe) state.unsubscribe();
  if (state.roomRef && state.playerId === 'player1') {
    await deleteDoc(state.roomRef).catch(() => {});
  }
  state = { ...state, roomId: null, playerId: null, roomRef: null, unsubscribe: null };
  showScreen('screen-menu');
};

// ─── LISTENER FIRESTORE ──────────────────────────────────────────
function handleRoomUpdate(data) {
  if (!data) return;

  // ── LOBBY ──
  if (data.status === 'waiting' || data.status === 'ready') {
    const p2 = data.player2;
    document.getElementById('p2-name').textContent = p2 ? p2.name : 'En attente…';
    document.getElementById('p2-status').innerHTML = p2
      ? '<span class="status-dot online"></span> En ligne'
      : '<span class="status-dot waiting"></span> En attente';
    if (data.player2) {
      document.getElementById('p1-name').textContent = data.player1.name;
    }
    const btnStart = document.getElementById('btn-start');
    if (state.playerId === 'player1' && data.player2) {
      btnStart.disabled = false;
      btnStart.textContent = '🚀 Lancer la partie !';
    }
    return;
  }

  // ── JEU ──
  if (data.status === 'playing') {
    if (!document.getElementById('screen-game').classList.contains('active')) {
      showScreen('screen-game');
      state.myScore = 0;
      state.oppScore = 0;
      const oppKey = state.playerId === 'player1' ? 'player2' : 'player1';
      document.getElementById('score-my-name').textContent = state.myName;
      document.getElementById('score-opp-name').textContent = data[oppKey]?.name || 'Adversaire';
    }

    const q = data.currentQ;
    // si question différente → afficher
    if (q !== state.currentQ || state.currentQ === 0) {
      state.currentQ = q;
      state.answered = false;
      clearInterval(state.timerInterval);
      state.timerStart = Date.now();
      renderQuestion(data.questions[q], q, data.totalQ);
      startTimer(data.questions[q].answer, q, data);
    }

    // mise à jour des scores depuis Firestore
    state.myScore = data[state.playerId]?.score ?? 0;
    const oppKey = state.playerId === 'player1' ? 'player2' : 'player1';
    state.oppScore = data[oppKey]?.score ?? 0;
    document.getElementById('score-my').textContent = state.myScore;
    document.getElementById('score-opp').textContent = state.oppScore;

    // afficher si l'adversaire a répondu
    const oppAnswer = data.answers[oppKey];
    document.getElementById('waiting-msg').textContent =
      oppAnswer !== null && oppAnswer !== undefined
        ? '✅ Adversaire a répondu !'
        : '⏳ En attente de l\'adversaire…';

    // si les deux ont répondu, l'hôte avance
    if (state.playerId === 'player1' &&
        data.answers.player1 !== null && data.answers.player1 !== undefined &&
        data.answers.player2 !== null && data.answers.player2 !== undefined) {
      clearInterval(state.timerInterval);
      setTimeout(() => advanceQuestion(data), 1400);
    }
    return;
  }

  // ── FIN ──
  if (data.status === 'finished') {
    clearInterval(state.timerInterval);
    showResult(data);
  }
}

// ─── RENDU QUESTION ──────────────────────────────────────────────
function renderQuestion(q, idx, total) {
  document.getElementById('q-counter').textContent = `Question ${idx + 1}/${total}`;
  document.getElementById('progress-fill').style.width = `${((idx + 1) / total) * 100}%`;
  document.getElementById('flag-display').innerHTML = flagImg(q.code);
  document.getElementById('question-text').textContent = '🌍 Quel est ce pays ?';
  document.getElementById('waiting-msg').textContent = '';

  const container = document.getElementById('options-container');
  container.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.onclick = () => submitAnswer(opt, q.answer);
    container.appendChild(btn);
  });
}

// ─── TIMER ───────────────────────────────────────────────────────
function startTimer(correctAnswer, qIdx, data) {
  const fill = document.getElementById('timer-fill');
  fill.style.transition = 'none';
  fill.style.width = '100%';
  clearInterval(state.timerInterval);
  let t = state.TIMER_SEC;
  void fill.offsetWidth; // reflow
  fill.style.transition = `width ${state.TIMER_SEC}s linear`;
  fill.style.width = '0%';

  state.timerInterval = setInterval(() => {
    t--;
    if (t <= 0) {
      clearInterval(state.timerInterval);
      if (!state.answered) {
        submitAnswer(null, correctAnswer);
      }
    }
  }, 1000);
}

// ─── SOUMETTRE UNE RÉPONSE ───────────────────────────────────────
async function submitAnswer(chosen, correctAnswer) {
  if (state.answered) return;
  state.answered = true;
  clearInterval(state.timerInterval);

  const isCorrect = chosen === correctAnswer;
  const pointsKey = `${state.playerId}.score`;
  const answerKey = `answers.${state.playerId}`;

  // Colorier les boutons
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) btn.classList.add('correct');
    else if (btn.textContent === chosen && !isCorrect) btn.classList.add('wrong');
  });

  const newScore = (state.myScore || 0) + (isCorrect ? 1 : 0);
  await updateDoc(state.roomRef, {
    [answerKey]: chosen ?? '__timeout__',
    [pointsKey]: newScore
  });
}

// ─── AVANCER QUESTION (host) ─────────────────────────────────────
async function advanceQuestion(data) {
  const next = data.currentQ + 1;
  if (next >= data.totalQ) {
    await updateDoc(state.roomRef, { status: 'finished' });
  } else {
    await updateDoc(state.roomRef, {
      currentQ: next,
      'answers.player1': null,
      'answers.player2': null
    });
  }
}

// ─── RÉSULTAT ────────────────────────────────────────────────────
function showResult(data) {
  showScreen('screen-result');
  const s1 = data.player1.score;
  const s2 = data.player2?.score ?? 0;
  const n1 = data.player1.name;
  const n2 = data.player2?.name ?? 'Joueur 2';

  const myName = data[state.playerId].name;
  const myScore = data[state.playerId].score;
  const oppKey = state.playerId === 'player1' ? 'player2' : 'player1';
  const oppName = data[oppKey]?.name ?? 'Adversaire';
  const oppScore = data[oppKey]?.score ?? 0;

  document.getElementById('result-name-p1').textContent = myName;
  document.getElementById('result-score-p1').textContent = myScore;
  document.getElementById('result-name-p2').textContent = oppName;
  document.getElementById('result-score-p2').textContent = oppScore;

  let emoji, title, subtitle;
  if (myScore > oppScore) {
    emoji = '🏆'; title = 'Victoire !'; subtitle = `Bravo ${myName} !`;
    document.getElementById('result-card-p1').classList.add('winner');
  } else if (myScore < oppScore) {
    emoji = '😔'; title = 'Défaite !'; subtitle = `${oppName} a gagné.`;
    document.getElementById('result-card-p2').classList.add('winner');
  } else {
    emoji = '🤝'; title = 'Égalité !'; subtitle = 'Vous êtes à égalité !';
  }

  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-subtitle').textContent = subtitle;
}

// ─── REVANCHE ────────────────────────────────────────────────────
window.rematch = async function() {
  if (state.playerId !== 'player1') {
    // Player 2 attend que l'hôte relance
    document.querySelector('.result-title').textContent = '⏳ En attente de l\'hôte…';
    return;
  }
  const questions = generateQuestions(state.totalQ);
  await updateDoc(state.roomRef, {
    status: 'playing',
    questions,
    currentQ: 0,
    'player1.score': 0,
    'player2.score': 0,
    'answers.player1': null,
    'answers.player2': null
  });
  state.myScore = 0;
  state.oppScore = 0;
  state.currentQ = -1;

  // reset UI
  document.getElementById('result-card-p1').classList.remove('winner');
  document.getElementById('result-card-p2').classList.remove('winner');
};
