"use client";

import { useEffect } from "react";

/* Ported from shared/vanita.js — scales the fixed 1920x1080 .game-stage to
   the window (in-game the CEF viewport is the game resolution, so the scale
   is simply res / 1920x1080). ?ingame -> transparent page, no demo backdrop. */
export default function StageScale() {
  useEffect(() => {
    const root = document.documentElement;
    const W = 1920;
    const H = 1080;
    if (/[?&]ingame\b/.test(location.search)) root.classList.add("is-ingame");
    function fit() {
      root.style.setProperty("--stage-scale", Math.min(innerWidth / W, innerHeight / H));
    }
    addEventListener("resize", fit);
    fit();

    // Original root index.html had <body oncontextmenu="return false">
    // (right-click would exit the "game" view); replicated here since body
    // lives in the server-rendered root layout.
    function blockContextMenu(e) {
      e.preventDefault();
    }
    document.addEventListener("contextmenu", blockContextMenu);

    return () => {
      removeEventListener("resize", fit);
      document.removeEventListener("contextmenu", blockContextMenu);
    };
  }, []);

  return null;
}
