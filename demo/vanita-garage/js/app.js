/* =========================================================
   VANITA ROLEPLAY — Garage logic
   Mock data only. Replace `VEHICLES` with data from the game
   and call render() — every element reads from this array.
========================================================= */

const ICONS = {"screwdriver-wrench": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M78.6 5C69.1-2.4 55.6-1.5 47 7L7 47c-8.5 8.5-9.4 22-2.1 31.6l80 104c4.5 5.9 11.6 9.4 19 9.4l54.1 0 109 109c-14.7 29-10 65.4 14.3 89.6l112 112c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-112-112c-24.2-24.2-60.6-29-89.6-14.3l-109-109 0-54.1c0-7.5-3.5-14.5-9.4-19L78.6 5zM19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L233.7 374.3c-7.8-20.9-9-43.6-3.6-65.1l-61.7-61.7L19.9 396.1zM512 144c0-10.5-1.1-20.7-3.2-30.5c-2.4-11.2-16.1-14.1-24.2-6l-63.9 63.9c-3 3-7.1 4.7-11.3 4.7L352 176c-8.8 0-16-7.2-16-16l0-57.4c0-4.2 1.7-8.3 4.7-11.3l63.9-63.9c8.1-8.1 5.2-21.8-6-24.2C388.7 1.1 378.5 0 368 0C288.5 0 224 64.5 224 144l0 .8 85.3 85.3c36-9.1 75.8 .5 104 28.7L429 274.5c49-23 83-72.8 83-130.5zM56 432a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z\"/></svg>", "gas-pump": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M32 64C32 28.7 60.7 0 96 0L256 0c35.3 0 64 28.7 64 64l0 192 8 0c48.6 0 88 39.4 88 88l0 32c0 13.3 10.7 24 24 24s24-10.7 24-24l0-154c-27.6-7.1-48-32.2-48-62l0-64L384 64c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l77.3 77.3c12 12 18.7 28.3 18.7 45.3l0 13.5 0 24 0 32 0 152c0 39.8-32.2 72-72 72s-72-32.2-72-72l0-32c0-22.1-17.9-40-40-40l-8 0 0 144c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 512c-17.7 0-32-14.3-32-32s14.3-32 32-32L32 64zM96 80l0 96c0 8.8 7.2 16 16 16l128 0c8.8 0 16-7.2 16-16l0-96c0-8.8-7.2-16-16-16L112 64c-8.8 0-16 7.2-16 16z\"/></svg>", "soap": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M208 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM320 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128zM416 32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0 160c0 27.6-11.7 52.5-30.4 70.1C422.1 275.7 448 310.8 448 352c0 53-43 96-96 96l-192 0c-53 0-96-43-96-96s43-96 96-96l88.4 0c-15.2-17-24.4-39.4-24.4-64L96 192c-53 0-96 43-96 96L0 416c0 53 43 96 96 96l320 0c53 0 96-43 96-96l0-128c0-53-43-96-96-96zM160 288c-35.3 0-64 28.7-64 64s28.7 64 64 64l192 0c35.3 0 64-28.7 64-64s-28.7-64-64-64l-32 0-160 0z\"/></svg>", "key": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17l0 80c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24l0-40 40 0c13.3 0 24-10.7 24-24l0-40 40 0c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z\"/></svg>", "car-side": "<svg viewBox=\"0 0 640 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M171.3 96L224 96l0 96-112.7 0 30.4-75.9C146.5 104 158.2 96 171.3 96zM272 192l0-96 81.2 0c9.7 0 18.9 4.4 25 12l67.2 84L272 192zm256.2 1L428.2 68c-18.2-22.8-45.8-36-75-36L171.3 32c-39.3 0-74.6 23.9-89.1 60.3L40.6 196.4C16.8 205.8 0 228.9 0 256L0 368c0 17.7 14.3 32 32 32l33.3 0c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80l130.7 0c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80l33.3 0c17.7 0 32-14.3 32-32l0-48c0-65.2-48.8-119-111.8-127zM434.7 368a48 48 0 1 1 90.5 32 48 48 0 1 1 -90.5-32zM160 336a48 48 0 1 1 0 96 48 48 0 1 1 0-96z\"/></svg>", "motorcycle": "<svg viewBox=\"0 0 640 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M280 32c-13.3 0-24 10.7-24 24s10.7 24 24 24l57.7 0 16.4 30.3L256 192l-45.3-45.3c-12-12-28.3-18.7-45.3-18.7L64 128c-17.7 0-32 14.3-32 32l0 32 96 0c88.4 0 160 71.6 160 160c0 11-1.1 21.7-3.2 32l70.4 0c-2.1-10.3-3.2-21-3.2-32c0-52.2 25-98.6 63.7-127.8l15.4 28.6C402.4 276.3 384 312 384 352c0 70.7 57.3 128 128 128s128-57.3 128-128s-57.3-128-128-128c-13.5 0-26.5 2.1-38.7 6L418.2 128l61.8 0c17.7 0 32-14.3 32-32l0-32c0-17.7-14.3-32-32-32l-20.4 0c-7.5 0-14.7 2.6-20.5 7.4L391.7 78.9l-14-26c-7-12.9-20.5-21-35.2-21L280 32zM462.7 311.2l28.2 52.2c6.3 11.7 20.9 16 32.5 9.7s16-20.9 9.7-32.5l-28.2-52.2c2.3-.3 4.7-.4 7.1-.4c35.3 0 64 28.7 64 64s-28.7 64-64 64s-64-28.7-64-64c0-15.5 5.5-29.7 14.7-40.8zM187.3 376c-9.5 23.5-32.5 40-59.3 40c-35.3 0-64-28.7-64-64s28.7-64 64-64c26.9 0 49.9 16.5 59.3 40l66.4 0C242.5 268.8 190.5 224 128 224C57.3 224 0 281.3 0 352s57.3 128 128 128c62.5 0 114.5-44.8 125.8-104l-66.4 0zM128 384a32 32 0 1 0 0-64 32 32 0 1 0 0 64z\"/></svg>", "truck-pickup": "<svg viewBox=\"0 0 640 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M368.6 96l76.8 96L288 192l0-96 80.6 0zM224 80l0 112L64 192c-17.7 0-32 14.3-32 32l0 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l33.1 0c-.7 5.2-1.1 10.6-1.1 16c0 61.9 50.1 112 112 112s112-50.1 112-112c0-5.4-.4-10.8-1.1-16l66.3 0c-.7 5.2-1.1 10.6-1.1 16c0 61.9 50.1 112 112 112s112-50.1 112-112c0-5.4-.4-10.8-1.1-16l33.1 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64c0-17.7-14.3-32-32-32l-48.6 0L418.6 56c-12.1-15.2-30.5-24-50-24L272 32c-26.5 0-48 21.5-48 48zm0 288a48 48 0 1 1 -96 0 48 48 0 1 1 96 0zm288 0a48 48 0 1 1 -96 0 48 48 0 1 1 96 0z\"/></svg>", "warehouse": "<svg viewBox=\"0 0 640 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 488L0 171.3c0-26.2 15.9-49.7 40.2-59.4L308.1 4.8c7.6-3.1 16.1-3.1 23.8 0L599.8 111.9c24.3 9.7 40.2 33.3 40.2 59.4L640 488c0 13.3-10.7 24-24 24l-48 0c-13.3 0-24-10.7-24-24l0-264c0-17.7-14.3-32-32-32l-384 0c-17.7 0-32 14.3-32 32l0 264c0 13.3-10.7 24-24 24l-48 0c-13.3 0-24-10.7-24-24zm488 24l-336 0c-13.3 0-24-10.7-24-24l0-56 384 0 0 56c0 13.3-10.7 24-24 24zM128 400l0-64 384 0 0 64-384 0zm0-96l0-80 384 0 0 80-384 0z\"/></svg>", "gauge-high": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM256 416c35.3 0 64-28.7 64-64c0-17.4-6.9-33.1-18.1-44.6L366 161.7c5.3-12.1-.2-26.3-12.3-31.6s-26.3 .2-31.6 12.3L257.9 288c-.6 0-1.3 0-1.9 0c-35.3 0-64 28.7-64 64s28.7 64 64 64zM176 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM96 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm352-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z\"/></svg>", "heart-pulse": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M228.3 469.1L47.6 300.4c-4.2-3.9-8.2-8.1-11.9-12.4l87 0c22.6 0 43-13.6 51.7-34.5l10.5-25.2 49.3 109.5c3.8 8.5 12.1 14 21.4 14.1s17.8-5 22-13.3L320 253.7l1.7 3.4c9.5 19 28.9 31 50.1 31l104.5 0c-3.7 4.3-7.7 8.5-11.9 12.4L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9zM503.7 240l-132 0c-3 0-5.8-1.7-7.2-4.4l-23.2-46.3c-4.1-8.1-12.4-13.3-21.5-13.3s-17.4 5.1-21.5 13.3l-41.4 82.8L205.9 158.2c-3.9-8.7-12.7-14.3-22.2-14.1s-18.1 5.9-21.8 14.8l-31.8 76.3c-1.2 3-4.2 4.9-7.4 4.9L16 240c-2.6 0-5 .4-7.3 1.1C3 225.2 0 208.2 0 190.9l0-5.8c0-69.9 50.5-129.5 119.4-141C165 36.5 211.4 51.4 244 84l12 12 12-12c32.6-32.6 79-47.5 124.6-39.9C461.5 55.6 512 115.2 512 185.1l0 5.8c0 16.9-2.8 33.5-8.3 49.1z\"/></svg>", "shield-halved": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8l0 378.1C394 378 431.1 230.1 432 141.4L256 66.8s0 0 0 0z\"/></svg>", "xmark": "<svg viewBox=\"0 0 384 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z\"/></svg>", "chevron-left": "<svg viewBox=\"0 0 320 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z\"/></svg>", "chevron-right": "<svg viewBox=\"0 0 320 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z\"/></svg>", "circle-check": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z\"/></svg>", "triangle-exclamation": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z\"/></svg>", "location-dot": "<svg viewBox=\"0 0 384 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z\"/></svg>", "house": "<svg viewBox=\"0 0 576 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z\"/></svg>", "wrench": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M352 320c88.4 0 160-71.6 160-160c0-15.3-2.2-30.1-6.2-44.2c-3.1-10.8-16.4-13.2-24.3-5.3l-76.8 76.8c-3 3-7.1 4.7-11.3 4.7L336 192c-8.8 0-16-7.2-16-16l0-57.4c0-4.2 1.7-8.3 4.7-11.3l76.8-76.8c7.9-7.9 5.4-21.2-5.3-24.3C382.1 2.2 367.3 0 352 0C263.6 0 192 71.6 192 160c0 19.1 3.4 37.5 9.5 54.5L19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L297.5 310.5c17 6.2 35.4 9.5 54.5 9.5zM80 408a24 24 0 1 1 0 48 24 24 0 1 1 0-48z\"/></svg>", "lock": "<svg viewBox=\"0 0 448 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z\"/></svg>", "bolt": "<svg viewBox=\"0 0 448 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6z\"/></svg>", "wallet": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L80 128c-8.8 0-16-7.2-16-16s7.2-16 16-16l368 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L64 32zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z\"/></svg>"};
function icon(name) { return `<i class="icon">${ICONS[name] || ""}</i>`; }

const VEHICLES = [
  { id: "sultan",  name: "Sultan RS",             plate: "VNT 101", icon: "car-side",     status: "out",
    health: 72, engine: 68, fuel: 40, clean: 55 },
  { id: "elegy",   name: "Elegy Retro Custom",    plate: "VNT 205", icon: "car-side",     status: "stored",
    health: 100, engine: 100, fuel: 100, clean: 100 },
  { id: "bati",    name: "Bati 801",              plate: "VNT 332", icon: "motorcycle",   status: "out",
    health: 45, engine: 50, fuel: 20, clean: 30 },
  { id: "burrito", name: "Burrito",                plate: "VNT 410", icon: "truck-pickup", status: "stored",
    health: 90, engine: 95, fuel: 80, clean: 70 },
];

const state = { selectedId: VEHICLES[0].id };

function getVehicle(id) { return VEHICLES.find((v) => v.id === id) || null; }
function statFill(v) { return v >= 60 ? "var(--fuel)" : v >= 30 ? "var(--vehicle)" : "var(--health)"; }

/* ---------------------------------------------------------
   Render: vehicle list
--------------------------------------------------------- */
function renderList() {
  const el = document.getElementById("vehicleList");
  el.innerHTML = VEHICLES.map((v) => {
    const active = state.selectedId === v.id ? "is-active" : "";
    const statusClass = v.status === "out" ? "veh-status--out" : "veh-status--stored";
    const statusText = v.status === "out" ? "\u0e08\u0e2d\u0e14\u0e2d\u0e22\u0e39\u0e48\u0e02\u0e49\u0e32\u0e07\u0e19\u0e2d\u0e01" : "\u0e43\u0e19\u0e42\u0e23\u0e07\u0e23\u0e16";
    return `
      <div class="veh-card ${active}" data-id="${v.id}">
        <span class="veh-status ${statusClass} mono">${statusText}</span>
        <div class="veh-icon">${icon(v.icon)}</div>
        <div class="veh-info">
          <div class="veh-name">${v.name}</div>
          <div class="veh-plate">${v.plate}</div>
          <div class="veh-mini-bars">
            <div class="veh-mini-bar"><i style="width:${v.health}%; background:${statFill(v.health)}"></i></div>
            <div class="veh-mini-bar"><i style="width:${v.fuel}%; background:${statFill(v.fuel)}"></i></div>
          </div>
        </div>
      </div>`;
  }).join("");

  el.querySelectorAll(".veh-card").forEach((card) => {
    card.addEventListener("click", () => {
      state.selectedId = card.dataset.id;
      renderList();
      renderStage();
    });
  });
}

/* ---------------------------------------------------------
   Render: stage (detail)
--------------------------------------------------------- */
function renderStage() {
  const stage = document.getElementById("stageContent");
  const v = getVehicle(state.selectedId);
  if (!v) {
    stage.innerHTML = `<div class="stage-empty">${icon("warehouse")}<p>\u0e40\u0e25\u0e37\u0e2d\u0e01\u0e23\u0e16\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e14\u0e39\u0e23\u0e32\u0e22\u0e25\u0e30\u0e40\u0e2d\u0e35\u0e22\u0e14</p></div>`;
    return;
  }

  const isOut = v.status === "out";
  const statusBadge = isOut
    ? `<span class="stage-status-badge" style="color:var(--fuel);background:rgba(53,211,153,0.14);border:1px solid rgba(53,211,153,0.3)">\u0e08\u0e2d\u0e14\u0e2d\u0e22\u0e39\u0e48\u0e02\u0e49\u0e32\u0e07\u0e19\u0e2d\u0e01</span>`
    : `<span class="stage-status-badge" style="color:var(--text-4);background:rgba(232,237,245,0.06);border:1px solid var(--panel-border)">\u0e43\u0e19\u0e42\u0e23\u0e07\u0e23\u0e16</span>`;

  stage.innerHTML = `
    <div class="stage-head">
      <div class="stage-title-row">
        <div class="stage-veh-icon">${icon(v.icon)}</div>
        <div>
          <h2 class="stage-name">${v.name}</h2>
          <p class="stage-plate">${v.plate}</p>
        </div>
      </div>
      ${statusBadge}
    </div>

    <div class="stage-stats">
      ${statRow("heart-pulse", "\u0e2a\u0e20\u0e32\u0e1e\u0e15\u0e31\u0e27\u0e16\u0e31\u0e07", v.health, "var(--health)")}
      ${statRow("gauge-high", "\u0e40\u0e04\u0e23\u0e37\u0e48\u0e2d\u0e07\u0e22\u0e19\u0e15\u0e4c", v.engine, "var(--vehicle)")}
      ${statRow("gas-pump", "\u0e19\u0e49\u0e33\u0e21\u0e31\u0e19", v.fuel, "var(--fuel)")}
      ${statRow("soap", "\u0e04\u0e27\u0e32\u0e21\u0e2a\u0e30\u0e2d\u0e32\u0e14", v.clean, "var(--armor)")}
    </div>

    <div class="stage-showroom">
      <div class="showroom-glow"></div>
      <div class="showroom-icon">${icon(v.icon)}</div>
      <div class="showroom-platform"></div>
    </div>

    <div class="stage-actions">
      <button class="action-btn" data-action="repair" ${isOut ? "" : "disabled"}>${icon("wrench")}\u0e0b\u0e48\u0e2d\u0e21\u0e23\u0e16</button>
      <button class="action-btn" data-action="refuel" ${isOut ? "" : "disabled"}>${icon("gas-pump")}\u0e40\u0e15\u0e34\u0e21\u0e19\u0e49\u0e33\u0e21\u0e31\u0e19</button>
      <button class="action-btn" data-action="wash" ${isOut ? "" : "disabled"}>${icon("soap")}\u0e25\u0e49\u0e32\u0e07\u0e23\u0e16</button>
      <button class="action-btn" data-action="toggle">${icon("key")}${isOut ? "\u0e40\u0e01\u0e47\u0e1a\u0e23\u0e16" : "\u0e40\u0e23\u0e35\u0e22\u0e01\u0e23\u0e16"}</button>
    </div>
  `;

  stage.querySelectorAll(".action-btn").forEach((btn) => {
    btn.addEventListener("click", () => runAction(v.id, btn.dataset.action));
  });
}

function statRow(iconName, label, value, color) {
  return `
    <div class="stat-row">
      <div class="stat-icon" style="background:color-mix(in srgb, ${color} 16%, transparent); color:${color}">${icon(iconName)}</div>
      <div class="stat-body">
        <div class="stat-label-row"><span>${label}</span><span>${value}%</span></div>
        <div class="stat-track"><i class="stat-fill" style="width:${value}%; background:${color}"></i></div>
      </div>
    </div>`;
}

/* ---------------------------------------------------------
   Actions + progress overlay (same ring language as the HUD's
   Action Progress UI — conic-gradient ring, icon+label+underline)
--------------------------------------------------------- */
const ACTIONS = {
  repair: { icon: "wrench", label: "\u0e01\u0e33\u0e25\u0e31\u0e07\u0e0b\u0e48\u0e2d\u0e21\u0e23\u0e16...", color: "var(--vehicle)", duration: 2600,
    apply: (v) => { v.health = 100; v.engine = 100; }, done: "\u0e0b\u0e48\u0e2d\u0e21\u0e23\u0e16\u0e40\u0e2a\u0e23\u0e47\u0e08\u0e41\u0e25\u0e49\u0e27" },
  refuel: { icon: "gas-pump", label: "\u0e01\u0e33\u0e25\u0e31\u0e07\u0e40\u0e15\u0e34\u0e21\u0e19\u0e49\u0e33\u0e21\u0e31\u0e19...", color: "var(--fuel)", duration: 2000,
    apply: (v) => { v.fuel = 100; }, done: "\u0e40\u0e15\u0e34\u0e21\u0e19\u0e49\u0e33\u0e21\u0e31\u0e19\u0e40\u0e15\u0e47\u0e21\u0e41\u0e25\u0e49\u0e27" },
  wash: { icon: "soap", label: "\u0e01\u0e33\u0e25\u0e31\u0e07\u0e25\u0e49\u0e32\u0e07\u0e23\u0e16...", color: "var(--armor)", duration: 2200,
    apply: (v) => { v.clean = 100; }, done: "\u0e25\u0e49\u0e32\u0e07\u0e23\u0e16\u0e40\u0e2a\u0e23\u0e47\u0e08\u0e41\u0e25\u0e49\u0e27" },
  toggle: { icon: "key", label: "", color: "var(--lockpick)", duration: 1400,
    apply: (v) => { v.status = v.status === "out" ? "stored" : "out"; }, done: "" },
};

let activeTimer = null;

function runAction(vehicleId, actionKey) {
  const v = getVehicle(vehicleId);
  const cfg = ACTIONS[actionKey];
  if (!v || !cfg) return;

  const label = actionKey === "toggle"
    ? (v.status === "out" ? "\u0e01\u0e33\u0e25\u0e31\u0e07\u0e40\u0e01\u0e47\u0e1a\u0e23\u0e16..." : "\u0e01\u0e33\u0e25\u0e31\u0e07\u0e40\u0e23\u0e35\u0e22\u0e01\u0e23\u0e16...")
    : cfg.label;
  const doneMsg = actionKey === "toggle"
    ? (v.status === "out" ? "\u0e40\u0e01\u0e47\u0e1a\u0e23\u0e16\u0e40\u0e02\u0e49\u0e32\u0e42\u0e23\u0e07\u0e23\u0e16\u0e41\u0e25\u0e49\u0e27" : "\u0e40\u0e23\u0e35\u0e22\u0e01\u0e23\u0e16\u0e2d\u0e2d\u0e01\u0e21\u0e32\u0e41\u0e25\u0e49\u0e27")
    : cfg.done;

  const overlay = document.getElementById("progressOverlay");
  const ring = document.getElementById("progressRing");
  const pctEl = document.getElementById("progressPct");
  const labelEl = document.getElementById("progressLabel");
  const underlineEl = document.getElementById("progressUnderline");
  const iconEl = document.getElementById("progressIcon");

  ring.style.setProperty("--ring-color", cfg.color);
  ring.style.setProperty("--pct", 0);
  iconEl.innerHTML = ICONS[cfg.icon] || "";
  iconEl.style.color = cfg.color;
  pctEl.textContent = "0%";
  labelEl.textContent = label;
  underlineEl.style.background = cfg.color;
  overlay.hidden = false;

  const start = performance.now();
  function tick(now) {
    const t = Math.min(1, (now - start) / cfg.duration);
    const pct = Math.round(t * 100);
    ring.style.setProperty("--pct", pct);
    pctEl.textContent = pct + "%";
    if (t < 1) {
      activeTimer = requestAnimationFrame(tick);
    } else {
      overlay.hidden = true;
      cfg.apply(v);
      renderList();
      renderStage();
      if (doneMsg) toast(doneMsg);
    }
  }
  activeTimer = requestAnimationFrame(tick);

  document.getElementById("progressCancel").onclick = () => {
    cancelAnimationFrame(activeTimer);
    overlay.hidden = true;
  };
}

/* ---------------------------------------------------------
   Toasts
--------------------------------------------------------- */
function toast(message) {
  const stack = document.getElementById("toastStack");
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `${icon("circle-check")}<span>${message}</span>`;
  stack.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

/* ---------------------------------------------------------
   Static icon slots
--------------------------------------------------------- */
document.getElementById("iconCash").innerHTML = ICONS["wallet"];

/* ---------------------------------------------------------
   Init
--------------------------------------------------------- */
renderList();
renderStage();
