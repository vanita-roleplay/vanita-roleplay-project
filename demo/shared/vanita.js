/* VANITA ROLEPLAY — shared stage helper
   Scales the fixed 1920x1080 .game-stage to the window (in-game the CEF
   viewport is the game resolution, so the scale is simply res / 1920x1080).
   ?ingame  ->  transparent page, no demo backdrop. */
(function () {
  var root = document.documentElement, W = 1920, H = 1080;
  if (/[?&]ingame\b/.test(location.search)) root.classList.add("is-ingame");
  function fit() { root.style.setProperty("--stage-scale", Math.min(innerWidth / W, innerHeight / H)); }
  addEventListener("resize", fit);
  fit();
})();
