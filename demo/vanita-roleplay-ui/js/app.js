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

