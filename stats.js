"use strict";
/* ================================================================
   STATS PAGE — stats.js  v1
   Lit dtd_history_v1 depuis localStorage
================================================================ */

const LS_HISTORY_KEY = "dtd_history_v1";

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(LS_HISTORY_KEY)) || []; }
  catch { return []; }
}

const MODE_NAMES = {
  classic:"Classique", chrono:"Chrono", survival:"Survie",
  hardcore:"Hardcore", reverse:"Inversé", infini:"Infini",
};
const CONT_NAMES = {
  all:"Monde entier", af:"Afrique", am:"Amériques",
  as:"Asie", eu:"Europe", oc:"Océanie",
};

// ─────────────────────────────────────────────────────────────────
//  SUMMARY CARDS
// ─────────────────────────────────────────────────────────────────
function buildSummary(history) {
  const container = document.getElementById("stats-summary");
  if (!history.length) {
    container.innerHTML = `<p style="color:var(--muted);font-size:.9rem;padding:4px 0">
      Aucune partie enregistrée. Jouez pour voir vos stats !</p>`;
    return;
  }

  function avgPct(games) {
    const valid = games.filter(g => g.mode !== "survival" && g.total > 0);
    if (!valid.length) return null;
    return Math.round(valid.reduce((a, g) => a + g.score / g.total, 0) / valid.length * 100);
  }

  const flags = history.filter(e => e.game === "flags");
  const caps  = history.filter(e => e.game === "capitals");

  const cards = [
    { label:"Parties jouées",  value: history.length },
    { label:"Jeux drapeaux",   value: flags.length },
    { label:"Jeux capitales",  value: caps.length },
    { label:"Moy. drapeaux",   value: avgPct(flags)  !== null ? avgPct(flags)  + "%" : "—" },
    { label:"Moy. capitales",  value: avgPct(caps)   !== null ? avgPct(caps)   + "%" : "—" },
  ];

  container.innerHTML = cards.map(c => `
    <div class="summary-card">
      <span class="summary-value">${c.value}</span>
      <span class="summary-label">${c.label}</span>
    </div>`).join("");
}

// ─────────────────────────────────────────────────────────────────
//  HISTORY TABLE
// ─────────────────────────────────────────────────────────────────
function buildHistoryTable(history) {
  const tbody = document.getElementById("history-tbody");
  const empty = document.getElementById("history-empty");
  const wrap  = document.getElementById("history-table-wrap");
  const rows  = [...history].reverse().slice(0, 50);

  if (!rows.length) {
    empty.classList.remove("hidden");
    wrap.style.display = "none";
    return;
  }
  empty.classList.add("hidden");
  wrap.style.display = "";

  tbody.innerHTML = rows.map(g => {
    const d    = new Date(g.date);
    const date = d.toLocaleDateString("fr-FR", {day:"2-digit", month:"2-digit"})
               + " " + d.toLocaleTimeString("fr-FR", {hour:"2-digit", minute:"2-digit"});
    const mode = MODE_NAMES[g.mode] || g.mode;
    const cont = CONT_NAMES[g.continent] || g.continent;
    const icon = g.game === "flags" ? "🚩" : "🏙️";
    const label = g.game === "flags" ? "Drapeaux" : "Capitales";

    let scoreStr, pctStr, pctClass;
    if (g.mode === "survival") {
      scoreStr = `🔥 ${g.score}`;
      pctStr   = "—"; pctClass = "";
    } else {
      const t  = g.total || 0;
      scoreStr = `${g.score} / ${t}`;
      const p  = t > 0 ? Math.round(g.score / t * 100) : 0;
      pctStr   = p + "%";
      pctClass = p >= 80 ? "high" : p >= 50 ? "mid" : "low";
    }

    return `<tr>
      <td>${date}</td>
      <td><span class="badge-game ${g.game}">${icon} ${label}</span></td>
      <td>${mode}</td>
      <td>${cont}</td>
      <td>${scoreStr}</td>
      <td><span class="score-pct ${pctClass}">${pctStr}</span></td>
    </tr>`;
  }).join("");
}

// ─────────────────────────────────────────────────────────────────
//  PROGRESSION CHART
// ─────────────────────────────────────────────────────────────────
function buildChart(history) {
  const svg   = document.getElementById("progress-chart");
  const empty = document.getElementById("progress-empty");
  const wrap  = document.getElementById("chart-wrap");

  const plottable = history.filter(g => g.mode !== "survival" && g.total > 0);
  const flagsData = plottable.filter(g => g.game === "flags").slice(-30);
  const capsData  = plottable.filter(g => g.game === "capitals").slice(-30);

  if (flagsData.length < 2 && capsData.length < 2) {
    empty.classList.remove("hidden");
    wrap.classList.add("hidden");
    return;
  }
  empty.classList.add("hidden");
  wrap.classList.remove("hidden");

  const W = 600, H = 250;
  const ML = 38, MR = 14, MT = 12, MB = 28;
  const cW = W - ML - MR, cH = H - MT - MB;

  function pts(data) {
    if (data.length < 2) return "";
    return data.map((g, i) => {
      const x = ML + (i / (data.length - 1)) * cW;
      const y = MT + (1 - g.score / g.total) * cH;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
  }

  function dot(data, color) {
    if (!data.length) return "";
    const last = data[data.length - 1];
    const x = data.length >= 2 ? (ML + cW) : (ML + cW / 2);
    const y = MT + (1 - last.score / last.total) * cH;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.5" fill="${color}" />`;
  }

  const grid = [0, 25, 50, 75, 100].map(p => {
    const y = MT + (1 - p / 100) * cH;
    return `<line x1="${ML}" y1="${y.toFixed(1)}" x2="${W - MR}" y2="${y.toFixed(1)}"
              stroke="var(--border)" stroke-width="1" />
            <text x="${ML - 4}" y="${(y + 4).toFixed(1)}" text-anchor="end"
              font-size="10" fill="var(--muted)">${p}</text>`;
  }).join("");

  const axes = `
    <line x1="${ML}" y1="${MT}" x2="${ML}" y2="${H - MB}" stroke="var(--border)" stroke-width="1" />
    <line x1="${ML}" y1="${H - MB}" x2="${W - MR}" y2="${H - MB}" stroke="var(--border)" stroke-width="1" />`;

  const linFlags = flagsData.length >= 2
    ? `<polyline points="${pts(flagsData)}" fill="none" stroke="#818cf8"
         stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />` : "";
  const linCaps  = capsData.length >= 2
    ? `<polyline points="${pts(capsData)}" fill="none" stroke="#fbbf24"
         stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />` : "";

  svg.innerHTML = grid + axes + linFlags + linCaps
    + dot(flagsData, "#818cf8") + dot(capsData, "#fbbf24");
}

// ─────────────────────────────────────────────────────────────────
//  WEAK COUNTRIES
// ─────────────────────────────────────────────────────────────────
function computeWeak(history, game) {
  const stats = {};
  history.filter(e => e.game === game).forEach(g =>
    (g.questions || []).forEach(q => {
      if (!stats[q.code]) stats[q.code] = { name: q.name, correct: 0, wrong: 0 };
      stats[q.code][q.correct ? "correct" : "wrong"]++;
    })
  );
  return Object.entries(stats)
    .filter(([, v]) => v.wrong > 0)
    .map(([code, v]) => ({
      code, name: v.name,
      wrong: v.wrong,
      total: v.correct + v.wrong,
      pct: Math.round(v.wrong / (v.correct + v.wrong) * 100),
    }))
    .sort((a, b) => b.pct - a.pct || b.wrong - a.wrong)
    .slice(0, 25);
}

function getFlagUrl(code) {
  return `https://flagcdn.com/w40/${code}.png`;
}

function getCapital(code) {
  if (!window.WORLD_COUNTRIES) return "";
  const c = WORLD_COUNTRIES.find(x => x.code === code);
  return c ? c.capital : "";
}

let activeWeakGame = "flags";

function buildWeakList(history) {
  const list  = document.getElementById("weak-list");
  const empty = document.getElementById("weak-empty");
  const items = computeWeak(history, activeWeakGame);

  // Enable/disable revision buttons
  const wF = computeWeak(history, "flags");
  const wC = computeWeak(history, "capitals");
  document.getElementById("btn-revise-flags").disabled    = wF.length < 4;
  document.getElementById("btn-revise-capitals").disabled = wC.length < 4;

  if (!items.length) {
    empty.classList.remove("hidden");
    list.innerHTML = "";
    return;
  }
  empty.classList.add("hidden");

  const showCapital = activeWeakGame === "capitals";

  list.innerHTML = items.map((item, i) => {
    const capital = showCapital ? getCapital(item.code) : "";
    const subtitle = capital
      ? `<span class="weak-capital">${capital}</span>`
      : "";
    const severity = item.pct >= 75 ? "high" : item.pct >= 40 ? "mid" : "low";
    return `
    <div class="weak-item">
      <span class="weak-rank">${i + 1}</span>
      <img class="weak-flag-img" src="${getFlagUrl(item.code)}" alt="${item.name}"
           onerror="this.style.display='none'" loading="lazy" />
      <span class="weak-name-wrap">
        <span class="weak-name">${item.name}</span>${subtitle}
      </span>
      <div class="weak-bar-wrap">
        <div class="weak-bar-fill weak-bar-${severity}" style="width:${item.pct}%"></div>
      </div>
      <span class="weak-pct weak-pct-${severity}">${item.pct}%</span>
      <span class="weak-attempts">${item.wrong}✗/${item.total}</span>
    </div>`;
  }).join("");
}

// ─────────────────────────────────────────────────────────────────
//  RENDER
// ─────────────────────────────────────────────────────────────────
function render() {
  const h = loadHistory();
  buildSummary(h);
  buildHistoryTable(h);
  buildChart(h);
  buildWeakList(h);
}

// ─────────────────────────────────────────────────────────────────
//  EVENTS
// ─────────────────────────────────────────────────────────────────

// Main tabs
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById("tab-" + tab.dataset.tab).classList.add("active");
  });
});

// Weak sub-tabs (flags / capitals)
document.querySelectorAll(".weak-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".weak-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    activeWeakGame = tab.dataset.game;
    buildWeakList(loadHistory());
  });
});

// Revision buttons
document.getElementById("btn-revise-flags").addEventListener("click", () => {
  window.location.href = "flags.html?revision=flags";
});
document.getElementById("btn-revise-capitals").addEventListener("click", () => {
  window.location.href = "capitals.html?revision=capitals";
});

// Clear history
document.getElementById("btn-clear-history").addEventListener("click", () => {
  if (confirm("Effacer tout l'historique ? Cette action est irréversible.")) {
    localStorage.removeItem(LS_HISTORY_KEY);
    render();
  }
});

// ─────────────────────────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────────────────────────
render();
