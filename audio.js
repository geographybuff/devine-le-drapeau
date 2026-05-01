"use strict";
/* ================================================================
   AUDIO — audio.js
   Sons de feedback via Web Audio API (aucun fichier externe)
================================================================ */
(function () {
  let _ctx = null;

  function getCtx() {
    if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (_ctx.state === "suspended") _ctx.resume();
    return _ctx;
  }

  function beep(freq, type, duration, vol, freqEnd) {
    try {
      const c = getCtx();
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = type;
      o.frequency.setValueAtTime(freq, c.currentTime);
      if (freqEnd !== undefined)
        o.frequency.linearRampToValueAtTime(freqEnd, c.currentTime + duration);
      g.gain.setValueAtTime(vol, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
      o.connect(g);
      g.connect(c.destination);
      o.start(c.currentTime);
      o.stop(c.currentTime + duration);
    } catch (_) {}
  }

  window.playCorrect = function () {
    beep(523, "sine", 0.12, 0.22);
    setTimeout(() => beep(784, "sine", 0.18, 0.18), 100);
  };

  window.playWrong = function () {
    beep(300, "sawtooth", 0.07, 0.18, 220);
    setTimeout(() => beep(180, "sawtooth", 0.18, 0.14), 70);
  };
})();
