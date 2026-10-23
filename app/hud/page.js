"use client";

import { useEffect } from "react";
import "./style.css";


export default function HudPage() {
  useEffect(() => {
    /* =========================================================
       VANITA ROLEPLAY — HUD Prototype logic
       All values below are MOCK DATA. When this UI is wired into
       the real GTA client, replace the `player` object and the
       `setPlayer()` calls with data pushed from the game (e.g. via
       a CEF/NUI message handler) — every element on screen reads
       from this single object rather than being hardcoded.
    ========================================================= */

    const player = {
      name: "Centered101",
      id: "#101",
      health: 75,
      armor: 60,
      hunger: 82,
      thirst: 68,
      stamina: 91,
      cash: 125420,
      bank: 850000,
    };

    const actions = {
      medkit:  { pct: 72 },
      armor:   { pct: 56 },
      vehicle: { pct: 38 },
      fuel:    { pct: 61 },
      lockpick:{ pct: 45 },
    };

    /* ---------------------------------------------------------
       Rendering
    --------------------------------------------------------- */
    function formatMoney(n) {
      return "$" + Math.round(n).toLocaleString("en-US");
    }

    // Smoothly tweens a displayed number instead of snapping straight to
    // the new value (used for cash/bank and the Action Progress % labels
    // so the text keeps pace with the ring's animated sweep).
    const numberAnimState = {};
    function animateNumber(elId, toValue, formatFn, duration = 600) {
      const el = document.getElementById(elId);
      const fromValue = numberAnimState[elId] ?? toValue;
      const startTime = performance.now();

      function tick(now) {
        const t = Math.min(1, (now - startTime) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        const current = fromValue + (toValue - fromValue) * eased;
        el.textContent = formatFn(current);
        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          numberAnimState[elId] = toValue;
        }
      }
      requestAnimationFrame(tick);
    }
    const animateMoney = (elId, toValue, duration) => animateNumber(elId, toValue, formatMoney, duration);
    const animatePercent = (elId, toValue, duration) => animateNumber(elId, toValue, (v) => Math.round(v) + "%", duration);

    function healthState(hp) {
      if (hp < 25) return "critical";
      if (hp <= 50) return "low";
      return "normal";
    }

    function renderPlayer() {
      // Identity + money
      document.getElementById("playerName").textContent = player.name;
      document.getElementById("playerId").textContent = player.id;
      animateMoney("cashValue", player.cash);
      animateMoney("bankValue", player.bank);

      // Health state drives ring glow / heart icon / ECG / blood mist (see CSS)
      const hud = document.getElementById("playerHud");
      hud.dataset.state = healthState(player.health);

      document.getElementById("healthBar").style.width = player.health + "%";
      document.getElementById("healthValue").innerHTML = `<b>${player.health}</b><span>/ 100</span>`;

      // Armor bar
      document.getElementById("armorBar").style.width = player.armor + "%";
      document.getElementById("armorValue").innerHTML = `<b>${player.armor}</b><span>/ 100</span>`;

      // Status icons
      setStatus("hunger", player.hunger, "hungerBar");
      setStatus("thirst", player.thirst, "thirstBar");
      setStatus("armor", player.armor, "armorMiniBar");
      setStatus("stamina", player.stamina, "staminaBar");
    }

    function setStatus(statName, value, barId) {
      document.getElementById(barId).style.width = value + "%";
      const item = document.querySelector(`.status-item[data-stat="${statName}"]`);
      item.classList.toggle("is-low", value < 30);
      item.title = `${statName.charAt(0).toUpperCase()}${statName.slice(1)}: ${value}%`;
    }

    function renderActions() {
      renderRing("ringMedkit", "pctMedkit", actions.medkit.pct);
      renderRing("ringArmorAction", "pctArmorAction", actions.armor.pct);
      renderRing("ringVehicle", "pctVehicle", actions.vehicle.pct);
      renderRing("ringFuel", "pctFuel", actions.fuel.pct);
      renderRing("ringLockpick", "pctLockpick", actions.lockpick.pct);
    }

    function renderRing(ringId, pctId, pct) {
      document.getElementById(ringId).style.setProperty("--pct", pct);
      animatePercent(pctId, pct);
    }

    /* ---------------------------------------------------------
       Public entry point — call this whenever real game data
       arrives, e.g. window.setPlayer({ health: 40, armor: 10, ... })
    --------------------------------------------------------- */
    function setPlayer(partial) {
      Object.assign(player, partial);
      renderPlayer();
    }
    window.setPlayer = setPlayer;

    /* ---------------------------------------------------------
       Dev / prototype controls
    --------------------------------------------------------- */
    const devToggle = document.getElementById("devToggle");
    const devPanel = document.getElementById("devPanel");

    devToggle.addEventListener("click", () => {
      devPanel.classList.toggle("open");
    });

    const sliderMap = [
      ["rangeHealth", "valHealth", "health"],
      ["rangeArmor", "valArmor", "armor"],
      ["rangeHunger", "valHunger", "hunger"],
      ["rangeThirst", "valThirst", "thirst"],
      ["rangeStamina", "valStamina", "stamina"],
    ];

    sliderMap.forEach(([rangeId, labelId, key]) => {
      const input = document.getElementById(rangeId);
      const label = document.getElementById(labelId);
      input.addEventListener("input", () => {
        const v = Number(input.value);
        label.textContent = v;
        setPlayer({ [key]: v });
      });
    });

    const actionSliderMap = [
      ["rangeMedkit", "valMedkit", "medkit", "ringMedkit", "pctMedkit"],
      ["rangeArmorAction", "valArmorAction", "armor", "ringArmorAction", "pctArmorAction"],
      ["rangeVehicle", "valVehicle", "vehicle", "ringVehicle", "pctVehicle"],
      ["rangeFuel", "valFuel", "fuel", "ringFuel", "pctFuel"],
      ["rangeLockpick", "valLockpick", "lockpick", "ringLockpick", "pctLockpick"],
    ];

    actionSliderMap.forEach(([rangeId, labelId, actionKey, ringId, pctId]) => {
      const input = document.getElementById(rangeId);
      const label = document.getElementById(labelId);
      input.addEventListener("input", () => {
        const v = Number(input.value);
        label.textContent = v;
        actions[actionKey].pct = v;
        renderRing(ringId, pctId, v);
      });
    });

    document.getElementById("btnRandomize").addEventListener("click", () => {
      const rnd = () => Math.floor(Math.random() * 101);
      const next = {
        health: rnd(),
        armor: rnd(),
        hunger: rnd(),
        thirst: rnd(),
        stamina: rnd(),
        cash: Math.floor(Math.random() * 300000) + 500,
        bank: Math.floor(Math.random() * 2000000) + 10000,
      };
      Object.entries(next).forEach(([key, v]) => {
        const entry = sliderMap.find((s) => s[2] === key);
        if (entry) {
          document.getElementById(entry[0]).value = v;
          document.getElementById(entry[1]).textContent = v;
        }
      });
      setPlayer(next);

      // Also shuffle the Action Progress cards so "Randomize" affects
      // everything visible on screen, not just the Blood UI stats.
      Object.keys(actions).forEach((key) => {
        actions[key].pct = rnd();
      });
      renderActions();

      // Keep their dedicated sliders in sync too.
      actionSliderMap.forEach(([rangeId, labelId, actionKey]) => {
        const v = actions[actionKey].pct;
        document.getElementById(rangeId).value = v;
        document.getElementById(labelId).textContent = v;
      });
    });

    let healTimer = null;
    document.getElementById("btnHeal").addEventListener("click", () => {
      const hud = document.getElementById("playerHud");

      // Actually restore HP, capped at 100 (and keep the slider in sync)
      const healed = Math.min(100, player.health + 30);
      setPlayer({ health: healed });
      document.getElementById("rangeHealth").value = healed;
      document.getElementById("valHealth").textContent = healed;

      // Temporary green "healing" state with the + icon
      hud.dataset.healing = "true";
      clearTimeout(healTimer);
      healTimer = setTimeout(() => hud.removeAttribute("data-healing"), 1500);
    });

    /* ---------------------------------------------------------
       Scroll-to-adjust directly on the HUD's own Health/Armor bars
       (in addition to the dev-panel sliders) — mouse wheel over the
       bar nudges the value, for a quicker prototype demo feel.
    --------------------------------------------------------- */
    function wireScrollAdjust(trackId, key, rangeId, labelId) {
      const track = document.getElementById(trackId);
      track.addEventListener(
        "wheel",
        (e) => {
          e.preventDefault();
          const step = e.deltaY < 0 ? 3 : -3;
          const next = Math.max(0, Math.min(100, player[key] + step));
          setPlayer({ [key]: next });
          const slider = document.getElementById(rangeId);
          const label = document.getElementById(labelId);
          if (slider) slider.value = next;
          if (label) label.textContent = next;
        },
        { passive: false }
      );
    }
    wireScrollAdjust("healthBarTrack", "health", "rangeHealth", "valHealth");
    wireScrollAdjust("armorBarTrack", "armor", "rangeArmor", "valArmor");

    /* ---------------------------------------------------------
       Init
    --------------------------------------------------------- */
    renderPlayer();
    renderActions();

    /* ---------------------------------------------------------
       Quick slots (hotbar) — press 1-5 to "use" the item in that
       slot. Mock data only; wire `QUICK_SLOTS` to real inventory
       data and call renderQuickSlots() when it changes.
    --------------------------------------------------------- */
    const QUICK_SLOT_ART = {"bottle-water": "\n<svg viewBox=\"0 0 64 64\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M25 4h14v7c3 2 4 5 4 8v34a5 5 0 0 1-5 5H26a5 5 0 0 1-5-5V19c0-3 1-6 4-8V4z\" fill=\"#bfe3ff\"/>\n  <path d=\"M25 4h14v7h-14z\" fill=\"#8fc9f2\"/>\n  <rect x=\"22\" y=\"13\" width=\"20\" height=\"4\" rx=\"1\" fill=\"#5aa9dd\"/>\n  <path d=\"M23 26h18v22a3 3 0 0 1-3 3H26a3 3 0 0 1-3-3V26z\" fill=\"#eaf6ff\"/>\n  <rect x=\"24\" y=\"30\" width=\"16\" height=\"12\" rx=\"2\" fill=\"#2f6fb0\"/>\n  <text x=\"32\" y=\"38.5\" font-family=\"Arial,sans-serif\" font-size=\"6.2\" font-weight=\"700\" fill=\"#eaf6ff\" text-anchor=\"middle\">VANITA</text>\n  <path d=\"M25 19c0-3 1-6 4-8\" stroke=\"#ffffff\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\" opacity=\"0.6\"/>\n</svg>", "suitcase-medical": "\n<svg viewBox=\"0 0 64 64\" xmlns=\"http://www.w3.org/2000/svg\">\n  <rect x=\"8\" y=\"20\" width=\"48\" height=\"32\" rx=\"4\" fill=\"#e23b3b\"/>\n  <rect x=\"8\" y=\"20\" width=\"48\" height=\"8\" rx=\"4\" fill=\"#c92c2c\"/>\n  <path d=\"M24 14h16a4 4 0 0 1 4 4v3H20v-3a4 4 0 0 1 4-4z\" fill=\"#b0b6bd\"/>\n  <rect x=\"26\" y=\"30\" width=\"12\" height=\"18\" rx=\"2\" fill=\"#ffffff\"/>\n  <rect x=\"29\" y=\"33\" width=\"6\" height=\"12\" fill=\"#e23b3b\"/>\n  <rect x=\"26.5\" y=\"37\" width=\"11\" height=\"4\" fill=\"#e23b3b\"/>\n  <rect x=\"10\" y=\"30\" width=\"6\" height=\"14\" rx=\"1.5\" fill=\"#f5b7b7\" opacity=\"0.5\"/>\n</svg>", "screwdriver-wrench": "\n<svg viewBox=\"0 0 64 64\" xmlns=\"http://www.w3.org/2000/svg\">\n  <rect x=\"6\" y=\"52\" width=\"52\" height=\"6\" rx=\"2\" fill=\"#3a3f47\"/>\n  <g stroke=\"#c7cdd6\" stroke-width=\"3\" stroke-linecap=\"round\">\n    <path d=\"M14 52 L20 14\"/>\n    <path d=\"M26 52 L34 16\"/>\n    <path d=\"M40 52 L50 18\"/>\n  </g>\n  <path d=\"M20 14c2-2 5-2 6 1\" stroke=\"#eef1f5\" stroke-width=\"2.4\" fill=\"none\" stroke-linecap=\"round\"/>\n  <path d=\"M34 16c-3 0-5 2-4 5\" stroke=\"#eef1f5\" stroke-width=\"2.4\" fill=\"none\" stroke-linecap=\"round\"/>\n  <path d=\"M50 18c1 3-1 5-4 5\" stroke=\"#eef1f5\" stroke-width=\"2.4\" fill=\"none\" stroke-linecap=\"round\"/>\n</svg>", "gun": "\n<svg viewBox=\"0 0 64 64\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M10 30h34v8H36l-3 6h-9v-6h-4l-10-4z\" fill=\"#3a3f47\"/>\n  <rect x=\"10\" y=\"30\" width=\"34\" height=\"8\" rx=\"1.5\" fill=\"#4a515c\"/>\n  <path d=\"M20 38 L26 54 L33 54 L30 38 Z\" fill=\"#2c313a\"/>\n  <rect x=\"42\" y=\"28\" width=\"14\" height=\"4\" rx=\"1\" fill=\"#20242c\"/>\n  <rect x=\"16\" y=\"27\" width=\"6\" height=\"3\" fill=\"#8a94a3\"/>\n</svg>"};

    const QUICK_SLOTS = [
      { icon: "bottle-water", qty: 3 },
      { icon: "suitcase-medical", qty: 1 },
      { icon: "screwdriver-wrench", qty: 4 },
      { icon: "gun", qty: 1 },
      null,
    ];

    function renderQuickSlots() {
      const el = document.getElementById("quickSlots");
      el.innerHTML = QUICK_SLOTS.map((item, i) => {
        const num = i + 1;
        if (!item) {
          return `<div class="q-slot is-empty" data-slot="${num}"><span class="q-slot-num">${num}</span></div>`;
        }
        return `
          <div class="q-slot" data-slot="${num}">
            <span class="q-slot-num">${num}</span>
            <span class="q-slot-icon">${QUICK_SLOT_ART[item.icon] || ""}</span>
            <span class="q-slot-qty">x${item.qty}</span>
          </div>`;
      }).join("");
    }

    function useQuickSlot(num) {
      const slotEl = document.querySelector(`.q-slot[data-slot="${num}"]`);
      const item = QUICK_SLOTS[num - 1];
      if (!slotEl || !item) return;
      slotEl.classList.remove("is-flash");
      void slotEl.offsetWidth; // restart animation
      slotEl.classList.add("is-flash");
    }

    document.addEventListener("keydown", (e) => {
      const n = Number(e.key);
      if (n >= 1 && n <= 5) useQuickSlot(n);
    });

    renderQuickSlots();



  }, []);

  return (
    <>
      <div className="game-stage" id="gameStage">
        {/* Shared icon gradients (silver / state tints) */}
        <svg width="0" height="0" style={{position: 'absolute'}} aria-hidden="true">
          <defs>
            <linearGradient id="gHeartSilver" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e8eaee"/><stop offset="1" stopColor="#abafb8"/></linearGradient>
            <linearGradient id="gHeartPink" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffdce1"/><stop offset="1" stopColor="#ff8d9f"/></linearGradient>
            <linearGradient id="gHeartRed" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff5d74"/><stop offset="1" stopColor="#cd1a38"/></linearGradient>
            <linearGradient id="gIcon" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f4f6f9"/><stop offset="1" stopColor="#9ea6b2"/></linearGradient>
            <linearGradient id="gShield" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#e9ecf1"/><stop offset="0.5" stopColor="#d2d7de"/><stop offset="0.5" stopColor="#8d94a1"/><stop offset="1" stopColor="#a8aeba"/></linearGradient>
          </defs>
        </svg>


        {/* Gameplay backdrop (stand-in for the GTA game world) */}
        <div className="scene"></div>
        <div className="scene-vignette"></div>

        {/* Brand mark */}
        <div className="brandmark">
          <img src="/vanita-logo@2x.png" alt="VANITA ROLEPLAY" className="brandmark-logo" />
          <div className="brandmark-sub">LOS SANTOS &middot; SAN ANDREAS</div>
        </div>

        {/* ============ DEV / PROTOTYPE CONTROL DRAWER ============ */}
        <div className="dev-drawer" id="devDrawer">
          <button className="vn-icon-btn" id="devToggle" aria-label="Toggle prototype controls">
            <i className="icon"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"/></svg></i>
          </button>

          <div className="dev-panel" id="devPanel">
            <div className="dev-panel-head">
              <span>PROTOTYPE CONTROLS</span>
              <span className="dev-panel-tag">mock data</span>
            </div>

            <div className="dev-field">
              <label htmlFor="rangeHealth">Health <em id="valHealth">75</em></label>
              <input type="range" id="rangeHealth" min="0" max="100" defaultValue="75" className="dev-range dev-range-health" />
            </div>
            <div className="dev-field">
              <label htmlFor="rangeArmor">Armor <em id="valArmor">60</em></label>
              <input type="range" id="rangeArmor" min="0" max="100" defaultValue="60" className="dev-range dev-range-armor" />
            </div>
            <div className="dev-field">
              <label htmlFor="rangeHunger">Hunger <em id="valHunger">82</em></label>
              <input type="range" id="rangeHunger" min="0" max="100" defaultValue="82" className="dev-range" />
            </div>
            <div className="dev-field">
              <label htmlFor="rangeThirst">Thirst <em id="valThirst">68</em></label>
              <input type="range" id="rangeThirst" min="0" max="100" defaultValue="68" className="dev-range" />
            </div>
            <div className="dev-field">
              <label htmlFor="rangeStamina">Stamina <em id="valStamina">91</em></label>
              <input type="range" id="rangeStamina" min="0" max="100" defaultValue="91" className="dev-range" />
            </div>

            <div className="dev-panel-head dev-panel-head--sub">
              <span>ACTION PROGRESS</span>
            </div>
            <div className="dev-field">
              <label htmlFor="rangeMedkit">Using Medkit <em id="valMedkit">72</em></label>
              <input type="range" id="rangeMedkit" min="0" max="100" defaultValue="72" className="dev-range" />
            </div>
            <div className="dev-field">
              <label htmlFor="rangeArmorAction">Equipping Armor <em id="valArmorAction">56</em></label>
              <input type="range" id="rangeArmorAction" min="0" max="100" defaultValue="56" className="dev-range" />
            </div>
            <div className="dev-field">
              <label htmlFor="rangeVehicle">Repairing Vehicle <em id="valVehicle">38</em></label>
              <input type="range" id="rangeVehicle" min="0" max="100" defaultValue="38" className="dev-range" />
            </div>
            <div className="dev-field">
              <label htmlFor="rangeFuel">Refueling <em id="valFuel">61</em></label>
              <input type="range" id="rangeFuel" min="0" max="100" defaultValue="61" className="dev-range" />
            </div>
            <div className="dev-field">
              <label htmlFor="rangeLockpick">Lockpicking <em id="valLockpick">45</em></label>
              <input type="range" id="rangeLockpick" min="0" max="100" defaultValue="45" className="dev-range" />
            </div>

            <div className="dev-actions">
              <button id="btnRandomize" className="dev-btn">
                <i className="icon"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M403.8 34.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6l0-32-32 0c-10.1 0-19.6 4.7-25.6 12.8L284 229.3 244 176l31.2-41.6C293.3 110.2 321.8 96 352 96l32 0 0-32c0-12.9 7.8-24.6 19.8-29.6zM164 282.7L204 336l-31.2 41.6C154.7 401.8 126.2 416 96 416l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c10.1 0 19.6-4.7 25.6-12.8L164 282.7zm274.6 188c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6l0-32-32 0c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c30.2 0 58.7 14.2 76.8 38.4L326.4 339.2c6 8.1 15.5 12.8 25.6 12.8l32 0 0-32c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z"/></svg></i> Randomize
              </button>
              <button id="btnHeal" className="dev-btn dev-btn-ghost">
                <i className="icon"><svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg></i> Simulate Heal
              </button>
            </div>
          </div>
        </div>

        {/* ============ MAIN PLAYER HUD (bottom-left overlay) ============ */}
        <div className="hud-shell">
          <div className="hud" id="playerHud" data-state="normal">

            {/* Angled frame: two joined panels (bars + status), drawn from vector paths */}
            <svg className="hud-frame" viewBox="0 0 1000 145" aria-hidden="true">
              <defs>
                <linearGradient id="gPanel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#0e1016" stopOpacity="0.88"/>
                  <stop offset="1" stopColor="#06080c" stopOpacity="0.93"/>
                </linearGradient>
              </defs>
              <path className="frame-fill" fill="url(#gPanel)" d="M120,15.75 L178.75,15.75 L188.75,25 L689,25 L694,30 L694,116 L128,116 L110,71 Z"/>
              <path className="frame-fill" fill="url(#gPanel)" d="M694,31 L940,31 L997,113 L990,124 L710,124 L702,116 L694,116 Z"/>
              <path className="frame-line" d="M120,15.75 L178.75,15.75 L188.75,25 L689,25 L694,30 L694,116 L128,116"/>
              <path className="frame-line" d="M694,31 L940,31 L997,113 L990,124 L710,124 L702,116 L694,116"/>
            </svg>

            <div className="hud-mist"></div>

            {/* Health / Armor bars */}
            <div className="bar bar-health" id="healthBarTrack" title="Scroll to adjust (prototype only)">
              <div className="bar-track"></div>
              <div className="bar-fill" id="healthBar"></div>
            </div>
            <div className="bar bar-armor" id="armorBarTrack" title="Scroll to adjust (prototype only)">
              <div className="bar-track"></div>
              <div className="bar-fill" id="armorBar"></div>
            </div>
            <div className="bar-value value-health" id="healthValue"><b>75</b><span>/ 100</span></div>
            <div className="bar-value value-armor" id="armorValue"><b>60</b><span>/ 100</span></div>

            {/* Status icons */}
            <div className="status-item" data-stat="hunger" title="Hunger">
              <div className="status-badge"><i className="icon"><svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M416 0C400 0 288 32 288 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 0-112 0-208c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7L80 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16l0 134.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8L64 16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z"/></svg></i></div>
              <div className="status-underline"><i style={{width: '82%'}} id="hungerBar"></i></div>
            </div>
            <div className="status-item" data-stat="thirst" title="Thirst">
              <div className="status-badge"><i className="icon"><svg viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg"><path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0l1.8 0c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/></svg></i></div>
              <div className="status-underline"><i style={{width: '68%'}} id="thirstBar"></i></div>
            </div>
            <div className="status-item" data-stat="armor" title="Armor">
              <div className="status-badge"><i className="icon"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z"/></svg></i></div>
              <div className="status-underline"><i style={{width: '60%'}} id="armorMiniBar"></i></div>
            </div>
            <div className="status-item" data-stat="stamina" title="Stamina">
              <div className="status-badge"><i className="icon"><svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M320 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM125.7 175.5c9.9-9.9 23.4-15.5 37.5-15.5c1.9 0 3.8 .1 5.6 .3L137.6 254c-9.3 28 1.7 58.8 26.8 74.5l86.2 53.9-25.4 88.8c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l28.7-100.4c5.9-20.6-2.6-42.6-20.7-53.9L238 299l30.9-82.4 5.1 12.3C289 264.7 323.9 288 362.7 288l21.3 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-21.3 0c-12.9 0-24.6-7.8-29.5-19.7l-6.3-15c-14.6-35.1-44.1-61.9-80.5-73.1l-48.7-15c-11.1-3.4-22.7-5.2-34.4-5.2c-31 0-60.8 12.3-82.7 34.3L57.4 153.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l23.1-23.1zM91.2 352L32 352c-17.7 0-32 14.3-32 32s14.3 32 32 32l69.6 0c19 0 36.2-11.2 43.9-28.5L157 361.6l-9.5-6c-17.5-10.9-30.5-26.8-37.9-44.9L91.2 352z"/></svg></i></div>
              <div className="status-underline"><i style={{width: '91%'}} id="staminaBar"></i></div>
            </div>

            {/* Circular health indicator */}
            <div className="hud-circle">
              <div className="circle-base"></div>
              <svg className="ecg" viewBox="0 0 40 24" aria-hidden="true"><polyline points="0,12 12,12 15,5 19,19 22,12 40,12"/></svg>
              <div className="health-ring" id="healthRing">
                <div className="ring-hole">
                  <i className="icon heart-icon heart-normal"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M228.3 469.1L47.6 300.4c-4.2-3.9-8.2-8.1-11.9-12.4l87 0c22.6 0 43-13.6 51.7-34.5l10.5-25.2 49.3 109.5c3.8 8.5 12.1 14 21.4 14.1s17.8-5 22-13.3L320 253.7l1.7 3.4c9.5 19 28.9 31 50.1 31l104.5 0c-3.7 4.3-7.7 8.5-11.9 12.4L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9zM503.7 240l-132 0c-3 0-5.8-1.7-7.2-4.4l-23.2-46.3c-4.1-8.1-12.4-13.3-21.5-13.3s-17.4 5.1-21.5 13.3l-41.4 82.8L205.9 158.2c-3.9-8.7-12.7-14.3-22.2-14.1s-18.1 5.9-21.8 14.8l-31.8 76.3c-1.2 3-4.2 4.9-7.4 4.9L16 240c-2.6 0-5 .4-7.3 1.1C3 225.2 0 208.2 0 190.9l0-5.8c0-69.9 50.5-129.5 119.4-141C165 36.5 211.4 51.4 244 84l12 12 12-12c32.6-32.6 79-47.5 124.6-39.9C461.5 55.6 512 115.2 512 185.1l0 5.8c0 16.9-2.8 33.5-8.3 49.1z"/></svg></i>
                  <i className="icon heart-icon heart-broken"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M119.4 44.1c23.3-3.9 46.8-1.9 68.6 5.3l49.8 77.5-75.4 75.4c-1.5 1.5-2.4 3.6-2.3 5.8s1 4.2 2.6 5.7l112 104c2.9 2.7 7.4 2.9 10.5 .3s3.8-7 1.7-10.4l-60.4-98.1 90.7-75.6c2.6-2.1 3.5-5.7 2.4-8.8L296.8 61.8c28.5-16.7 62.4-23.2 95.7-17.6C461.5 55.6 512 115.2 512 185.1l0 5.8c0 41.5-17.2 81.2-47.6 109.5L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9L47.6 300.4C17.2 272.1 0 232.4 0 190.9l0-5.8c0-69.9 50.5-129.5 119.4-141z"/></svg></i>
                </div>
              </div>
              <i className="icon heal-plus" id="healBadge"><svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg></i>
            </div>

          </div>

          {/* Identity / money */}
          <div className="hud-info">
            <div className="hud-info-id">
              <span className="hud-name" id="playerName">Centered101</span>
              <span className="hud-tag mono" id="playerId">#101</span>
            </div>
            <div className="hud-info-money">
              <div className="money-item">
                <i className="icon"><svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><path d="M0 112.5L0 422.3c0 18 10.1 35 27 41.3c87 32.5 174 10.3 261-11.9c79.8-20.3 159.6-40.7 239.3-18.9c23 6.3 48.7-9.5 48.7-33.4l0-309.9c0-18-10.1-35-27-41.3C462 15.9 375 38.1 288 60.3C208.2 80.6 128.4 100.9 48.7 79.1C25.6 72.8 0 88.6 0 112.5zM288 352c-44.2 0-80-43-80-96s35.8-96 80-96s80 43 80 96s-35.8 96-80 96zM64 352c35.3 0 64 28.7 64 64l-64 0 0-64zm64-208c0 35.3-28.7 64-64 64l0-64 64 0zM512 304l0 64-64 0c0-35.3 28.7-64 64-64zM448 96l64 0 0 64c-35.3 0-64-28.7-64-64z"/></svg></i>
                <span className="mono" id="cashValue">$125,420</span>
              </div>
              <div className="money-item">
                <i className="icon"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160l0 8c0 13.3 10.7 24 24 24l400 0c13.3 0 24-10.7 24-24l0-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224l-64 0 0 196.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512l448 0c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1L448 224l-64 0 0 192-40 0 0-192-64 0 0 192-48 0 0-192-64 0 0 192-40 0 0-192zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg></i>
                <span className="mono" id="bankValue">$850,000</span>
              </div>
            </div>
          </div>

          {/* Quick slots: numbered hotbar, stacks under the HUD */}
          <div className="quick-slots" id="quickSlots"></div>
        </div>

        {/* ============ ACTION PROGRESS UI (bottom-center) ============ */}
        <div className="action-row" id="actionRow">

          <div className="action-card" data-color="medkit">
            <div className="action-ring" id="ringMedkit">
              <div className="action-ring-inner">
                <i className="icon"><svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg></i>
                <span className="action-pct mono" id="pctMedkit">72%</span>
              </div>
            </div>
            <span className="action-label">Using Medkit</span>
            <i className="action-underline"></i>
          </div>

          <div className="action-card" data-color="armor">
            <div className="action-ring" id="ringArmorAction">
              <div className="action-ring-inner">
                <i className="icon"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8l0 378.1C394 378 431.1 230.1 432 141.4L256 66.8s0 0 0 0z"/></svg></i>
                <span className="action-pct mono" id="pctArmorAction">56%</span>
              </div>
            </div>
            <span className="action-label">Equipping Armor</span>
            <i className="action-underline"></i>
          </div>

          <div className="action-card" data-color="vehicle">
            <div className="action-ring" id="ringVehicle">
              <div className="action-ring-inner">
                <i className="icon"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M352 320c88.4 0 160-71.6 160-160c0-15.3-2.2-30.1-6.2-44.2c-3.1-10.8-16.4-13.2-24.3-5.3l-76.8 76.8c-3 3-7.1 4.7-11.3 4.7L336 192c-8.8 0-16-7.2-16-16l0-57.4c0-4.2 1.7-8.3 4.7-11.3l76.8-76.8c7.9-7.9 5.4-21.2-5.3-24.3C382.1 2.2 367.3 0 352 0C263.6 0 192 71.6 192 160c0 19.1 3.4 37.5 9.5 54.5L19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L297.5 310.5c17 6.2 35.4 9.5 54.5 9.5zM80 408a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg></i>
                <span className="action-pct mono" id="pctVehicle">38%</span>
              </div>
            </div>
            <span className="action-label">Repairing Vehicle</span>
            <i className="action-underline"></i>
          </div>

          <div className="action-card" data-color="fuel">
            <div className="action-ring" id="ringFuel">
              <div className="action-ring-inner">
                <i className="icon"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M32 64C32 28.7 60.7 0 96 0L256 0c35.3 0 64 28.7 64 64l0 192 8 0c48.6 0 88 39.4 88 88l0 32c0 13.3 10.7 24 24 24s24-10.7 24-24l0-154c-27.6-7.1-48-32.2-48-62l0-64L384 64c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l77.3 77.3c12 12 18.7 28.3 18.7 45.3l0 13.5 0 24 0 32 0 152c0 39.8-32.2 72-72 72s-72-32.2-72-72l0-32c0-22.1-17.9-40-40-40l-8 0 0 144c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 512c-17.7 0-32-14.3-32-32s14.3-32 32-32L32 64zM96 80l0 96c0 8.8 7.2 16 16 16l128 0c8.8 0 16-7.2 16-16l0-96c0-8.8-7.2-16-16-16L112 64c-8.8 0-16 7.2-16 16z"/></svg></i>
                <span className="action-pct mono" id="pctFuel">61%</span>
              </div>
            </div>
            <span className="action-label">Refueling</span>
            <i className="action-underline"></i>
          </div>

          <div className="action-card" data-color="lockpick">
            <div className="action-ring" id="ringLockpick">
              <div className="action-ring-inner">
                <i className="icon"><svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"/></svg></i>
                <span className="action-pct mono" id="pctLockpick">45%</span>
              </div>
            </div>
            <span className="action-label">Lockpicking</span>
            <i className="action-underline"></i>
          </div>

        </div>

      </div>{/* /.game-stage */}
    </>
  );
}
