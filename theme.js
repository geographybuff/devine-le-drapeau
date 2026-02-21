"use strict";
/* theme.js — gestion du thème clair/sombre, persistance localStorage */
(function () {
  const saved = localStorage.getItem("dtd_theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("dtd_theme", theme);
    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.textContent = theme === "dark" ? "☀️" : "🌙";
      btn.title = theme === "dark" ? "Passer au mode clair" : "Passer au mode sombre";
    }
  }

  applyTheme(saved);

  document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    applyTheme(localStorage.getItem("dtd_theme") || "dark");
    btn.addEventListener("click", function () {
      const current = document.documentElement.getAttribute("data-theme");
      applyTheme(current === "dark" ? "light" : "dark");
    });
  });
})();
