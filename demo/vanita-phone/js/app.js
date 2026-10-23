/* =========================================================
   VANITA ROLEPLAY — Phone logic
   Mock data only. Replace CONVERSATIONS / CALLS / bank values
   with real data from the game and keep calling render()/the
   screen functions below — nothing else needs to change.
========================================================= */

const ICONS = {"signal": "<svg viewBox=\"0 0 640 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M576 0c17.7 0 32 14.3 32 32l0 448c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-448c0-17.7 14.3-32 32-32zM448 96c17.7 0 32 14.3 32 32l0 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-352c0-17.7 14.3-32 32-32zM352 224l0 256c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32s32 14.3 32 32zM192 288c17.7 0 32 14.3 32 32l0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-160c0-17.7 14.3-32 32-32zM96 416l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32s32 14.3 32 32z\"/></svg>", "wifi": "<svg viewBox=\"0 0 640 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M54.2 202.9C123.2 136.7 216.8 96 320 96s196.8 40.7 265.8 106.9c12.8 12.2 33 11.8 45.2-.9s11.8-33-.9-45.2C549.7 79.5 440.4 32 320 32S90.3 79.5 9.8 156.7C-2.9 169-3.3 189.2 8.9 202s32.5 13.2 45.2 .9zM320 256c56.8 0 108.6 21.1 148.2 56c13.3 11.7 33.5 10.4 45.2-2.8s10.4-33.5-2.8-45.2C459.8 219.2 393 192 320 192s-139.8 27.2-190.5 72c-13.3 11.7-14.5 31.9-2.8 45.2s31.9 14.5 45.2 2.8c39.5-34.9 91.3-56 148.2-56zm64 160a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z\"/></svg>", "battery-full": "<svg viewBox=\"0 0 576 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M464 160c8.8 0 16 7.2 16 16l0 160c0 8.8-7.2 16-16 16L80 352c-8.8 0-16-7.2-16-16l0-160c0-8.8 7.2-16 16-16l384 0zM80 96C35.8 96 0 131.8 0 176L0 336c0 44.2 35.8 80 80 80l384 0c44.2 0 80-35.8 80-80l0-16c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l0-16c0-44.2-35.8-80-80-80L80 96zm368 96L96 192l0 128 352 0 0-128z\"/></svg>", "comment-dots": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3c0 0 0 0 0 0c0 0 0 0 0 0s0 0 0 0s0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z\"/></svg>", "phone-volume": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M280 0C408.1 0 512 103.9 512 232c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-101.6-82.4-184-184-184c-13.3 0-24-10.7-24-24s10.7-24 24-24zm8 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm-32-72c0-13.3 10.7-24 24-24c75.1 0 136 60.9 136 136c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-48.6-39.4-88-88-88c-13.3 0-24-10.7-24-24zM117.5 1.4c19.4-5.3 39.7 4.6 47.4 23.2l40 96c6.8 16.3 2.1 35.2-11.6 46.3L144 207.3c33.3 70.4 90.3 127.4 160.7 160.7L345 318.7c11.2-13.7 30-18.4 46.3-11.6l96 40c18.6 7.7 28.5 28 23.2 47.4l-24 88C481.8 499.9 466 512 448 512C200.6 512 0 311.4 0 64C0 46 12.1 30.2 29.5 25.4l88-24z\"/></svg>", "phone-slash": "<svg viewBox=\"0 0 640 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M228.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C76.1 30.2 64 46 64 64c0 107.4 37.8 206 100.8 283.1L9.2 469.1c-10.4 8.2-12.3 23.3-4.1 33.7s23.3 12.3 33.7 4.1l592-464c10.4-8.2 12.3-23.3 4.1-33.7s-23.3-12.3-33.7-4.1L253 278c-17.8-21.5-32.9-45.2-45-70.7L257.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96zm96.8 319l-91.3 72C310.7 476 407.1 512 512 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L368.7 368c-15-7.1-29.3-15.2-43-24.3z\"/></svg>", "building-columns": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160l0 8c0 13.3 10.7 24 24 24l400 0c13.3 0 24-10.7 24-24l0-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224l-64 0 0 196.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512l448 0c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1L448 224l-64 0 0 192-40 0 0-192-64 0 0 192-48 0 0-192-64 0 0 192-40 0 0-192zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z\"/></svg>", "car-side": "<svg viewBox=\"0 0 640 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M171.3 96L224 96l0 96-112.7 0 30.4-75.9C146.5 104 158.2 96 171.3 96zM272 192l0-96 81.2 0c9.7 0 18.9 4.4 25 12l67.2 84L272 192zm256.2 1L428.2 68c-18.2-22.8-45.8-36-75-36L171.3 32c-39.3 0-74.6 23.9-89.1 60.3L40.6 196.4C16.8 205.8 0 228.9 0 256L0 368c0 17.7 14.3 32 32 32l33.3 0c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80l130.7 0c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80l33.3 0c17.7 0 32-14.3 32-32l0-48c0-65.2-48.8-119-111.8-127zM434.7 368a48 48 0 1 1 90.5 32 48 48 0 1 1 -90.5-32zM160 336a48 48 0 1 1 0 96 48 48 0 1 1 0-96z\"/></svg>", "chevron-left": "<svg viewBox=\"0 0 320 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z\"/></svg>", "paper-plane": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z\"/></svg>", "magnifying-glass": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z\"/></svg>", "user-group": "<svg viewBox=\"0 0 640 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM609.3 512l-137.8 0c5.4-9.4 8.6-20.3 8.6-32l0-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2l61.4 0C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z\"/></svg>", "right-left": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M32 96l320 0 0-64c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l96 96c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-96 96c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6l0-64L32 160c-17.7 0-32-14.3-32-32s14.3-32 32-32zM480 352c17.7 0 32 14.3 32 32s-14.3 32-32 32l-320 0 0 64c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-96-96c-6-6-9.4-14.1-9.4-22.6s3.4-16.6 9.4-22.6l96-96c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 64 320 0z\"/></svg>", "wallet": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L80 128c-8.8 0-16-7.2-16-16s7.2-16 16-16l368 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L64 32zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z\"/></svg>", "circle-plus": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z\"/></svg>", "circle-check": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z\"/></svg>", "key": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17l0 80c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24l0-40 40 0c13.3 0 24-10.7 24-24l0-40 40 0c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z\"/></svg>", "arrow-right": "<svg viewBox=\"0 0 448 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z\"/></svg>", "location-dot": "<svg viewBox=\"0 0 384 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z\"/></svg>", "user": "<svg viewBox=\"0 0 448 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z\"/></svg>", "house": "<svg viewBox=\"0 0 576 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z\"/></svg>", "xmark": "<svg viewBox=\"0 0 384 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z\"/></svg>", "camera": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M149.1 64.8L138.7 96 64 96C28.7 96 0 124.7 0 160L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64l-74.7 0L362.9 64.8C356.4 45.2 338.1 32 317.4 32L194.6 32c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z\"/></svg>", "gear": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z\"/></svg>", "delete-left": "<svg viewBox=\"0 0 576 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M576 128c0-35.3-28.7-64-64-64L205.3 64c-17 0-33.3 6.7-45.3 18.7L9.4 233.4c-6 6-9.4 14.1-9.4 22.6s3.4 16.6 9.4 22.6L160 429.3c12 12 28.3 18.7 45.3 18.7L512 448c35.3 0 64-28.7 64-64l0-256zM271 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z\"/></svg>", "plane": "<svg viewBox=\"0 0 576 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z\"/></svg>", "moon": "<svg viewBox=\"0 0 384 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z\"/></svg>", "globe": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M352 256c0 22.2-1.2 43.6-3.3 64l-185.3 0c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64l185.3 0c2.2 20.4 3.3 41.8 3.3 64zm28.8-64l123.1 0c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64l-123.1 0c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32l-116.7 0c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0l-176.6 0c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0L18.6 160C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192l123.1 0c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64L8.1 320C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6l176.6 0c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352l116.7 0zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6l116.7 0z\"/></svg>", "map-location-dot": "<svg viewBox=\"0 0 576 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152l0 270.8c0 9.8-6 18.6-15.1 22.3L416 503l0-302.6zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6l0 251.4L32.9 502.7C17.1 509 0 497.4 0 480.4L0 209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77l0 249.3L192 449.4 192 255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z\"/></svg>", "cart-shopping": "<svg viewBox=\"0 0 576 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z\"/></svg>", "newspaper": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M96 96c0-35.3 28.7-64 64-64l288 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L80 480c-44.2 0-80-35.8-80-80L0 128c0-17.7 14.3-32 32-32s32 14.3 32 32l0 272c0 8.8 7.2 16 16 16s16-7.2 16-16L96 96zm64 24l0 80c0 13.3 10.7 24 24 24l112 0c13.3 0 24-10.7 24-24l0-80c0-13.3-10.7-24-24-24L184 96c-13.3 0-24 10.7-24 24zm208-8c0 8.8 7.2 16 16 16l48 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-48 0c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16l48 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-48 0c-8.8 0-16 7.2-16 16zM160 304c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-256 0c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-256 0c-8.8 0-16 7.2-16 16z\"/></svg>", "bullhorn": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M480 32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9L381.7 53c-48 48-113.1 75-181 75l-8.7 0-32 0-96 0c-35.3 0-64 28.7-64 64l0 96c0 35.3 28.7 64 64 64l0 128c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-128 8.7 0c67.9 0 133 27 181 75l43.6 43.6c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-147.6c18.6-8.8 32-32.5 32-60.4s-13.4-51.6-32-60.4L480 32zm-64 76.7L416 240l0 131.3C357.2 317.8 280.5 288 200.7 288l-8.7 0 0-96 8.7 0c79.8 0 156.5-29.8 215.3-83.3z\"/></svg>", "calendar-days": "<svg viewBox=\"0 0 448 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z\"/></svg>", "taxi": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M192 0c-17.7 0-32 14.3-32 32l0 32 0 .2c-38.6 2.2-72.3 27.3-85.2 64.1L39.6 228.8C16.4 238.4 0 261.3 0 288L0 432l0 48c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32l0-48 320 0 0 48c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32l0-48 0-144c0-26.7-16.4-49.6-39.6-59.2L437.2 128.3c-12.9-36.8-46.6-62-85.2-64.1l0-.2 0-32c0-17.7-14.3-32-32-32L192 0zM165.4 128l181.2 0c13.6 0 25.7 8.6 30.2 21.4L402.9 224l-293.8 0 26.1-74.6c4.5-12.8 16.6-21.4 30.2-21.4zM96 288a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm288 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z\"/></svg>", "truck-medical": "<svg viewBox=\"0 0 640 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 48C0 21.5 21.5 0 48 0L368 0c26.5 0 48 21.5 48 48l0 48 50.7 0c17 0 33.3 6.7 45.3 18.7L589.3 192c12 12 18.7 28.3 18.7 45.3l0 18.7 0 32 0 64c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0c0 53-43 96-96 96s-96-43-96-96l-128 0c0 53-43 96-96 96s-96-43-96-96l-16 0c-26.5 0-48-21.5-48-48L0 48zM416 256l128 0 0-18.7L466.7 160 416 160l0 96zM160 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm368-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM176 80l0 48-48 0c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l48 0 0 48c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-48 48 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-48 0 0-48c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z\"/></svg>", "address-book": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M96 0C60.7 0 32 28.7 32 64l0 384c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L96 0zM208 288l64 0c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64zM496 192c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64z\"/></svg>", "heart": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z\"/></svg>", "comment": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c0 0 0 0 0 0s0 0 0 0s0 0 0 0c0 0 0 0 0 0l.3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z\"/></svg>", "hammer": "<svg viewBox=\"0 0 576 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M413.5 237.5c-28.2 4.8-58.2-3.6-80-25.4l-38.1-38.1C280.4 159 272 138.8 272 117.6l0-12.1L192.3 62c-5.3-2.9-8.6-8.6-8.3-14.7s3.9-11.5 9.5-14l47.2-21C259.1 4.2 279 0 299.2 0l18.1 0c36.7 0 72 14 98.7 39.1l44.6 42c24.2 22.8 33.2 55.7 26.6 86L503 183l8-8c9.4-9.4 24.6-9.4 33.9 0l24 24c9.4 9.4 9.4 24.6 0 33.9l-88 88c-9.4 9.4-24.6 9.4-33.9 0l-24-24c-9.4-9.4-9.4-24.6 0-33.9l8-8-17.5-17.5zM27.4 377.1L260.9 182.6c3.5 4.9 7.5 9.6 11.8 14l38.1 38.1c6 6 12.4 11.2 19.2 15.7L134.9 484.6c-14.5 17.4-36 27.4-58.6 27.4C34.1 512 0 477.8 0 435.7c0-22.6 10.1-44.1 27.4-58.6z\"/></svg>", "briefcase": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M184 48l144 0c4.4 0 8 3.6 8 8l0 40L176 96l0-40c0-4.4 3.6-8 8-8zm-56 8l0 40L64 96C28.7 96 0 124.7 0 160l0 96 192 0 128 0 192 0 0-96c0-35.3-28.7-64-64-64l-64 0 0-40c0-30.9-25.1-56-56-56L184 0c-30.9 0-56 25.1-56 56zM512 288l-192 0 0 32c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-32L0 288 0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-128z\"/></svg>", "wrench": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M352 320c88.4 0 160-71.6 160-160c0-15.3-2.2-30.1-6.2-44.2c-3.1-10.8-16.4-13.2-24.3-5.3l-76.8 76.8c-3 3-7.1 4.7-11.3 4.7L336 192c-8.8 0-16-7.2-16-16l0-57.4c0-4.2 1.7-8.3 4.7-11.3l76.8-76.8c7.9-7.9 5.4-21.2-5.3-24.3C382.1 2.2 367.3 0 352 0C263.6 0 192 71.6 192 160c0 19.1 3.4 37.5 9.5 54.5L19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L297.5 310.5c17 6.2 35.4 9.5 54.5 9.5zM80 408a24 24 0 1 1 0 48 24 24 0 1 1 0-48z\"/></svg>", "shield-halved": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8l0 378.1C394 378 431.1 230.1 432 141.4L256 66.8s0 0 0 0z\"/></svg>"};
function icon(name) { return `<i class="icon">${ICONS[name] || ""}</i>`; }

/* ---------------------------------------------------------
   Mock data
--------------------------------------------------------- */
const CONVERSATIONS = [
  { id: "nina",  name: "Nina",  preview: "\u0e40\u0e14\u0e35\u0e4b\u0e22\u0e27\u0e21\u0e32\u0e23\u0e31\u0e1a\u0e02\u0e2d\u0e07\u0e14\u0e49\u0e27\u0e22\u0e19\u0e30\u0e2dีกครั้ง", time: "21:30", unread: 2 },
  { id: "deezy", name: "Deezy", preview: "\u0e23\u0e16\u0e0b\u0e48\u0e2d\u0e21\u0e40\u0e2a\u0e23\u0e47\u0e08\u0e41\u0e25\u0e49\u0e27\u0e19\u0e30", time: "20:12", unread: 0 },
  { id: "boss",  name: "\u0e1a\u0e2d\u0e2a\u0e40\u0e08\u0e49", preview: "\u0e1e\u0e23\u0e38\u0e48\u0e07\u0e19\u0e35\u0e49\u0e21\u0e32\u0e23\u0e32\u0e22\u0e07\u0e32\u0e19\u0e14\u0e49\u0e27\u0e22", time: "\u0e40\u0e21\u0e37\u0e48\u0e2d\u0e27\u0e32\u0e19", unread: 0 },
];

const THREADS = {
  nina: [
    { from: "in", text: "\u0e40\u0e14\u0e35\u0e4b\u0e22\u0e27\u0e21\u0e32\u0e23\u0e31\u0e1a\u0e02\u0e2d\u0e07\u0e14\u0e49\u0e27\u0e22\u0e19\u0e30\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07" },
    { from: "out", text: "\u0e44\u0e14\u0e49\u0e40\u0e25\u0e22 \u0e40\u0e14\u0e35\u0e4b\u0e22\u0e27\u0e44\u0e1b\u0e2b\u0e32" },
  ],
  deezy: [
    { from: "in", text: "\u0e23\u0e16\u0e0b\u0e48\u0e2d\u0e21\u0e40\u0e2a\u0e23\u0e47\u0e08\u0e41\u0e25\u0e49\u0e27\u0e19\u0e30" },
    { from: "out", text: "\u0e42\u0e2d\u0e40\u0e04 \u0e02\u0e2d\u0e1a\u0e04\u0e38\u0e13\u0e21\u0e32\u0e01" },
  ],
  boss: [
    { from: "in", text: "\u0e1e\u0e23\u0e38\u0e48\u0e07\u0e19\u0e35\u0e49\u0e21\u0e32\u0e23\u0e32\u0e22\u0e07\u0e32\u0e19\u0e14\u0e49\u0e27\u0e22" },
  ],
};

const AUTO_REPLIES = [
  "\u0e23\u0e31\u0e1a\u0e17\u0e23\u0e32\u0e1a\u0e04\u0e23\u0e31\u0e1a",
  "555 \u0e42\u0e2d\u0e40\u0e04\u0e40\u0e25\u0e22",
  "\u0e40\u0e14\u0e35\u0e4b\u0e22\u0e27\u0e40\u0e08\u0e2d\u0e01\u0e31\u0e19",
];

const CALLS = [
  { id: "nina",  name: "Nina",  number: "555-0142", type: "in",  time: "21:05" },
  { id: "deezy", name: "Deezy", number: "555-0198", type: "out", time: "19:40" },
  { id: "boss",  name: "\u0e1a\u0e2d\u0e2a\u0e40\u0e08\u0e49", number: "555-0101", type: "missed", time: "\u0e40\u0e21\u0e37\u0e48\u0e2d\u0e27\u0e32\u0e19" },
];

const CONTACTS = [
  { id: "nina",  name: "Nina",  number: "555-0142" },
  { id: "deezy", name: "Deezy", number: "555-0198" },
  { id: "boss",  name: "\u0e1a\u0e2d\u0e2a\u0e40\u0e08\u0e49", number: "555-0101" },
  { id: "mika",  name: "Mika",  number: "555-0177" },
  { id: "jay",   name: "Jay",   number: "555-0133" },
].sort((a, b) => a.name.localeCompare(b.name));

const bank = { cash: 125420, account: 850000 };

/* ---------------------------------------------------------
   Screen navigation (simple stack so the back button and the
   home indicator both make sense)
--------------------------------------------------------- */
let screenStack = ["home"];

function showScreen(name) {
  document.querySelectorAll(".phone-screen").forEach((s) => {
    s.classList.toggle("is-active", s.dataset.screen === name);
  });
}
function navigate(name) {
  screenStack.push(name);
  showScreen(name);
}
function goBack() {
  if (screenStack.length > 1) screenStack.pop();
  showScreen(screenStack[screenStack.length - 1]);
}
function goHome() {
  screenStack = ["home"];
  showScreen("home");
}

document.querySelectorAll("[data-back]").forEach((btn) => btn.addEventListener("click", goBack));
document.getElementById("homeIndicator").addEventListener("click", goHome);

/* ---------------------------------------------------------
   Home screen: data-driven app grid (matches the VANITA PHONE
   reference — 15 apps). `screen` = a dedicated screen, `list` = a
   generic list app defined in LIST_APPS below, `href` = external page.
--------------------------------------------------------- */
const APPS = [
  { key: "social",      label: "\u0e42\u0e0b\u0e40\u0e0a\u0e35\u0e22\u0e25",     icon: "globe",            c: ["#a56bff", "#6a3de0"], list: "social" },
  { key: "messages",    label: "\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21",     icon: "comment-dots",     c: ["#5aa7ff", "#2f6fd6"], screen: "messages", badge: true },
  { key: "calls",       label: "\u0e42\u0e17\u0e23",          icon: "phone-volume",     c: ["#4fe0a0", "#1f9e68"], screen: "calls" },
  { key: "bank",        label: "\u0e18\u0e19\u0e32\u0e04\u0e32\u0e23",      icon: "building-columns", c: ["#4f9bff", "#2a5fc4"], screen: "bank" },
  { key: "garage",      label: "\u0e42\u0e23\u0e07\u0e23\u0e16",       icon: "car-side",         c: ["#ffc766", "#e08a2f"], href: "../vanita-garage/index.html" },
  { key: "map",         label: "\u0e41\u0e1c\u0e19\u0e17\u0e35\u0e48",       icon: "map-location-dot", c: ["#a98bff", "#7a52e0"], list: "map" },
  { key: "market",      label: "\u0e15\u0e25\u0e32\u0e14\u0e0b\u0e37\u0e49\u0e2d\u0e02\u0e32\u0e22",  icon: "cart-shopping",    c: ["#ff7aa2", "#e0386f"], list: "market" },
  { key: "housing",     label: "\u0e17\u0e35\u0e48\u0e2d\u0e22\u0e39\u0e48\u0e2d\u0e32\u0e28\u0e31\u0e22", icon: "house",            c: ["#3fd6c0", "#16a08c"], list: "housing" },
  { key: "services",    label: "\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23",       icon: "wrench",           c: ["#ff7a6a", "#e03a3a"], list: "services" },
  { key: "news",        label: "\u0e02\u0e48\u0e32\u0e27\u0e2a\u0e32\u0e23",      icon: "newspaper",        c: ["#7d8aa3", "#4a566e"], list: "news" },
  { key: "camera",      label: "\u0e01\u0e25\u0e49\u0e2d\u0e07",        icon: "camera",           c: ["#9a7bff", "#6a46e0"], screen: "camera" },
  { key: "contacts",    label: "\u0e23\u0e32\u0e22\u0e0a\u0e37\u0e48\u0e2d",       icon: "user",             c: ["#3fd0d8", "#1a96a8"], list: "contacts" },
  { key: "classifieds", label: "\u0e1b\u0e23\u0e30\u0e01\u0e32\u0e28/\u0e07\u0e32\u0e19",  icon: "bullhorn",         c: ["#ffbf5a", "#e08a1f"], list: "classifieds" },
  { key: "events",      label: "\u0e01\u0e34\u0e08\u0e01\u0e23\u0e23\u0e21",      icon: "calendar-days",    c: ["#e052b5", "#a8307f"], list: "events" },
  { key: "settings",    label: "\u0e15\u0e31\u0e49\u0e07\u0e04\u0e48\u0e32",       icon: "gear",             c: ["#8a93a3", "#555e6d"], screen: "settings" },
];

function renderAppGrid() {
  const grid = document.getElementById("appGrid");
  grid.innerHTML = APPS.map((a) => {
    const glyph = `<span class="app-icon-glyph" style="background:linear-gradient(160deg,${a.c[0]},${a.c[1]})">${icon(a.icon)}${a.badge ? '<span class="app-badge" id="msgBadge">0</span>' : ""}</span>`;
    const label = `<span class="app-icon-label">${a.label}</span>`;
    return a.href
      ? `<a class="app-icon" href="${a.href}">${glyph}${label}</a>`
      : `<button class="app-icon" data-app="${a.key}">${glyph}${label}</button>`;
  }).join("");

  grid.querySelectorAll(".app-icon[data-app]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const a = APPS.find((x) => x.key === btn.dataset.app);
      if (a.screen) navigate(a.screen);
      else if (a.list) openListApp(a.list);
    });
  });
}

/* ---------------------------------------------------------
   Clock
--------------------------------------------------------- */
function updateClock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const t = `${hh}:${mm}`;
  document.getElementById("statusTime").textContent = t;
  document.getElementById("homeClockTime").textContent = t;
}
updateClock();
setInterval(updateClock, 15000);

/* ---------------------------------------------------------
   Messages
--------------------------------------------------------- */
function renderConvList() {
  const el = document.getElementById("convList");
  el.innerHTML = CONVERSATIONS.map((c) => `
    <div class="conv-row ${c.unread ? "is-unread" : ""}" data-id="${c.id}">
      <div class="conv-avatar">${c.name[0]}</div>
      <div class="conv-info">
        <div class="conv-name-row"><span class="conv-name">${c.name}</span><span class="conv-time">${c.time}</span></div>
        <div class="conv-preview">${c.preview}</div>
      </div>
      ${c.unread ? '<span class="conv-unread-dot"></span>' : ""}
    </div>`).join("");

  el.querySelectorAll(".conv-row").forEach((row) => {
    row.addEventListener("click", () => openThread(row.dataset.id));
  });

  const totalUnread = CONVERSATIONS.reduce((n, c) => n + (c.unread ? 1 : 0), 0);
  const badge = document.getElementById("msgBadge");
  if (totalUnread > 0) { badge.hidden = false; badge.textContent = totalUnread; }
  else badge.hidden = true;
}

function openThread(id) {
  const convo = CONVERSATIONS.find((c) => c.id === id);
  if (convo) convo.unread = 0;
  renderConvList();

  document.getElementById("threadName").textContent = convo ? convo.name : id;
  renderThreadMessages(id);
  navigate("thread");
  currentThreadId = id;
}

let currentThreadId = null;

function renderThreadMessages(id) {
  const el = document.getElementById("threadMessages");
  const msgs = THREADS[id] || [];
  el.innerHTML = msgs.map((m) => `<div class="msg-bubble ${m.from}">${m.text}</div>`).join("");
  el.scrollTop = el.scrollHeight;
}

function sendThreadMessage() {
  const input = document.getElementById("threadInput");
  const text = input.value.trim();
  if (!text || !currentThreadId) return;
  THREADS[currentThreadId] = THREADS[currentThreadId] || [];
  THREADS[currentThreadId].push({ from: "out", text });
  renderThreadMessages(currentThreadId);
  input.value = "";

  setTimeout(() => {
    const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
    THREADS[currentThreadId].push({ from: "in", text: reply });
    renderThreadMessages(currentThreadId);
  }, 900);
}
document.getElementById("threadSend").addEventListener("click", sendThreadMessage);
document.getElementById("threadInput").addEventListener("keydown", (e) => { if (e.key === "Enter") sendThreadMessage(); });

/* ---------------------------------------------------------
   Calls
--------------------------------------------------------- */
function renderCallList() {
  const el = document.getElementById("callList");
  el.innerHTML = CALLS.map((c) => {
    const typeClass = c.type === "missed" ? "missed" : c.type === "out" ? "out" : "in";
    return `
      <div class="call-row" data-id="${c.id}">
        <div class="conv-avatar">${c.name[0]}</div>
        <div class="conv-info">
          <div class="conv-name">${c.name}</div>
          <div class="call-meta"><i class="icon call-type-icon ${typeClass}">${ICONS["arrow-right"]}</i>${c.number} \u00b7 ${c.time}</div>
        </div>
        <button class="call-row-btn" data-call="${c.id}"><i class="icon">${ICONS["phone-volume"]}</i></button>
      </div>`;
  }).join("");

  el.querySelectorAll(".call-row").forEach((row) => {
    row.addEventListener("click", (e) => {
      if (e.target.closest(".call-row-btn")) return; // handled separately below
      startCall(row.dataset.id);
    });
  });
  el.querySelectorAll(".call-row-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => { e.stopPropagation(); startCall(btn.dataset.call); });
  });
}

function renderContactList() {
  const el = document.getElementById("contactList");
  el.innerHTML = CONTACTS.map((c) => `
    <div class="call-row" data-id="${c.id}">
      <div class="conv-avatar">${c.name[0]}</div>
      <div class="conv-info">
        <div class="conv-name">${c.name}</div>
        <div class="call-meta mono">${c.number}</div>
      </div>
      <button class="call-row-btn" data-call="${c.id}"><i class="icon">${ICONS["phone-volume"]}</i></button>
    </div>`).join("");

  el.querySelectorAll(".call-row").forEach((row) => {
    row.addEventListener("click", (e) => {
      if (e.target.closest(".call-row-btn")) return;
      startCall(row.dataset.id);
    });
  });
  el.querySelectorAll(".call-row-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => { e.stopPropagation(); startCall(btn.dataset.call); });
  });
}

/* ---------------------------------------------------------
   Calls: tab switching (Keypad / Recent / Contacts)
--------------------------------------------------------- */
document.querySelectorAll(".call-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".call-tab").forEach((t) => t.classList.remove("is-active"));
    document.querySelectorAll(".call-tab-panel").forEach((p) => p.classList.remove("is-active"));
    tab.classList.add("is-active");
    document.querySelector(`.call-tab-panel[data-panel="${tab.dataset.tab}"]`).classList.add("is-active");
  });
});

/* ---------------------------------------------------------
   Keypad — dial an arbitrary number; matches a known contact
   by number when possible, otherwise calls as "Unknown".
--------------------------------------------------------- */
let dialBuffer = "";
const KEYS = [
  ["1", ""], ["2", "ABC"], ["3", "DEF"],
  ["4", "GHI"], ["5", "JKL"], ["6", "MNO"],
  ["7", "PQRS"], ["8", "TUV"], ["9", "WXYZ"],
  ["*", ""], ["0", "+"], ["#", ""],
];
function renderKeypadGrid() {
  const el = document.getElementById("keypadGrid");
  el.innerHTML = KEYS.map(([digit, sub]) => `
    <button class="keypad-btn" data-digit="${digit}">${digit}${sub ? `<span class="keypad-sub">${sub}</span>` : ""}</button>
  `).join("");
  el.querySelectorAll(".keypad-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      dialBuffer += btn.dataset.digit;
      updateKeypadDisplay();
    });
  });
}
function updateKeypadDisplay() {
  document.getElementById("keypadDisplay").textContent = dialBuffer;
}
document.getElementById("btnKeypadBack").addEventListener("click", () => {
  dialBuffer = dialBuffer.slice(0, -1);
  updateKeypadDisplay();
});
document.getElementById("btnKeypadCall").addEventListener("click", () => {
  if (!dialBuffer) return;
  const match = CONTACTS.find((c) => c.number.replace(/-/g, "") === dialBuffer.replace(/-/g, ""));
  startCall(match ? match.id : null, match ? null : dialBuffer);
  dialBuffer = "";
  updateKeypadDisplay();
});

let callTimerInterval = null;
let callSeconds = 0;

function startCall(id, rawNumber) {
  const contact = CONTACTS.find((c) => c.id === id) || CALLS.find((c) => c.id === id) || CONVERSATIONS.find((c) => c.id === id);
  const name = contact ? contact.name : (rawNumber || id || "\u0e44\u0e21\u0e48\u0e17\u0e23\u0e32\u0e1a\u0e08\u0e31\u0e01");

  document.getElementById("callingAvatar").textContent = name[0];
  document.getElementById("callingName").textContent = name;
  document.getElementById("callingSub").textContent = "\u0e01\u0e33\u0e25\u0e31\u0e07\u0e42\u0e17\u0e23\u0e2d\u0e2d\u0e01...";
  navigate("calling");

  const ring = document.getElementById("callRing");
  ring.style.setProperty("--pct", 0);
  const start = performance.now();
  const duration = 2200;
  let cancelled = false;

  function tick(now) {
    if (cancelled) return;
    const t = Math.min(1, (now - start) / duration);
    ring.style.setProperty("--pct", Math.round(t * 100));
    if (t < 1) {
      requestAnimationFrame(tick);
    } else {
      document.getElementById("incallAvatar").textContent = name[0];
      document.getElementById("incallName").textContent = name;
      callSeconds = 0;
      updateCallTimer();
      clearInterval(callTimerInterval);
      callTimerInterval = setInterval(() => { callSeconds++; updateCallTimer(); }, 1000);
      screenStack = ["home", "calls", "incall"];
      showScreen("incall");
    }
  }
  requestAnimationFrame(tick);

  document.getElementById("btnCancelCall").onclick = () => {
    cancelled = true;
    goBack();
  };
}

function updateCallTimer() {
  const m = String(Math.floor(callSeconds / 60)).padStart(2, "0");
  const s = String(callSeconds % 60).padStart(2, "0");
  document.getElementById("callTimer").textContent = `${m}:${s}`;
}

document.getElementById("btnEndCall").addEventListener("click", () => {
  clearInterval(callTimerInterval);
  screenStack = ["home", "calls"];
  showScreen("calls");
  toast("\u0e27\u0e32\u0e07\u0e2a\u0e32\u0e22\u0e41\u0e25\u0e49\u0e27");
});
document.getElementById("btnMute").addEventListener("click", (e) => e.target.classList.toggle("is-active"));
document.getElementById("btnSpeaker").addEventListener("click", (e) => e.target.classList.toggle("is-active"));

/* ---------------------------------------------------------
   Bank
--------------------------------------------------------- */
function renderBank() {
  document.getElementById("bankCashValue").textContent = "$" + bank.cash.toLocaleString("en-US");
  document.getElementById("bankAccountValue").textContent = "$" + bank.account.toLocaleString("en-US");
}

document.getElementById("btnBankMax").addEventListener("click", () => {
  document.getElementById("bankAmount").value = bank.account;
});

document.getElementById("btnBankTransfer").addEventListener("click", () => {
  const idInput = document.getElementById("bankTargetId");
  const amountInput = document.getElementById("bankAmount");
  const errEl = document.getElementById("bankError");
  const id = idInput.value.trim();
  const amount = parseInt(amountInput.value, 10);

  if (!/^[0-9]{1,6}$/.test(id) || !Number.isInteger(amount) || amount <= 0 || amount > bank.account) {
    errEl.hidden = false;
    return;
  }
  errEl.hidden = true;

  const overlay = document.getElementById("transferOverlay");
  const ring = document.getElementById("transferRing");
  ring.style.setProperty("--pct", 0);
  overlay.hidden = false;

  const start = performance.now();
  const duration = 1800;
  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    ring.style.setProperty("--pct", Math.round(t * 100));
    if (t < 1) {
      requestAnimationFrame(tick);
    } else {
      overlay.hidden = true;
      bank.account -= amount;
      renderBank();
      idInput.value = "";
      amountInput.value = "";
      toast(`\u0e42\u0e2d\u0e40\u0e07\u0e34\u0e19 $${amount.toLocaleString("en-US")} \u0e44\u0e1b\u0e22\u0e31\u0e07\u0e44\u0e2d\u0e14\u0e35 #${id} \u0e41\u0e25\u0e49\u0e27`);
    }
  }
  requestAnimationFrame(tick);
});

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
const staticIcons = {
  iconSignal: "signal", iconWifi: "wifi", iconBattery: "battery-full",
  iconAppMessages: "comment-dots", iconAppCalls: "phone-volume", iconAppBank: "building-columns", iconAppGarage: "car-side",
  iconAppCamera: "camera", iconAppSettings: "gear",
  iconBack1: "chevron-left", iconBack2: "chevron-left", iconBack3: "chevron-left", iconBack4: "chevron-left",
  iconBack5: "chevron-left", iconBack6: "chevron-left", iconBack7: "chevron-left",
  iconSend: "paper-plane",
  iconRingPhone: "phone-volume", iconEndCall1: "phone-slash", iconEndCall2: "phone-slash",
  iconTransfer: "right-left", iconTransferRing: "right-left",
  iconKeypadCall: "phone-volume", iconKeypadBack: "delete-left",
  iconSettingsPlane: "plane", iconSettingsDnd: "moon", iconSettingsRing: "phone-volume",
};
Object.entries(staticIcons).forEach(([id, name]) => {
  const el = document.getElementById(id);
  if (el) el.innerHTML = ICONS[name] || "";
});

/* ---------------------------------------------------------
   Camera (mock) + Settings toggles
--------------------------------------------------------- */
document.getElementById("btnShutter").addEventListener("click", () => {
  toast("\u0e16\u0e48\u0e32\u0e22\u0e20\u0e32\u0e1e\u0e41\u0e25\u0e49\u0e27 (\u0e08\u0e33\u0e25\u0e2d\u0e07)");
});
document.querySelectorAll(".settings-toggle").forEach((t) => {
  t.addEventListener("click", () => t.classList.toggle("is-on"));
});


/* ---------------------------------------------------------
   Generic list apps (Social / Map / Marketplace / Housing /
   Services / News / Contacts / Classifieds / Events).
   Each entry only needs data — mock content, swap for game data.
--------------------------------------------------------- */
const LIST_APPS = {
  social: {
    title: "VANITA Social",
    posts: [
      { name: "Aiden Carter", handle: "@aiden.carter", time: "2 \u0e0a\u0e21.", text: "\u0e27\u0e31\u0e19\u0e19\u0e35\u0e49\u0e1b\u0e25\u0e32\u0e22\u0e1d\u0e19\u0e17\u0e35\u0e48\u0e40\u0e21\u0e37\u0e2d\u0e07\u0e2a\u0e27\u0e22\u0e21\u0e32\u0e01 #LosSantos", likes: 342, comments: 48, liked: false },
      { name: "Bella Rose",   handle: "@bella.rose",   time: "3 \u0e0a\u0e21.", text: "\u0e43\u0e04\u0e23\u0e44\u0e1b\u0e07\u0e32\u0e19 Meet & Greet \u0e04\u0e37\u0e19\u0e19\u0e35\u0e49\u0e1a\u0e49\u0e32\u0e07 #Event #VANITA", likes: 128, comments: 12, liked: false },
      { name: "Marcus",       handle: "@marcus",       time: "5 \u0e0a\u0e21.", text: "\u0e23\u0e16\u0e04\u0e31\u0e19\u0e43\u0e2b\u0e21\u0e48\u0e40\u0e1e\u0e34\u0e48\u0e07\u0e2d\u0e2d\u0e01\u0e08\u0e32\u0e01\u0e42\u0e23\u0e07\u0e1b\u0e23\u0e31\u0e1a\u0e41\u0e15\u0e48\u0e07 \u0e2a\u0e27\u0e22\u0e21\u0e32\u0e01", likes: 89, comments: 7, liked: false },
    ],
  },
  map: {
    title: "\u0e41\u0e1c\u0e19\u0e17\u0e35\u0e48",
    places: [
      { title: "\u0e2a\u0e16\u0e32\u0e19\u0e35\u0e15\u0e33\u0e23\u0e27\u0e08", sub: "Mission Row", meta: "1.2 km" },
      { title: "\u0e42\u0e23\u0e07\u0e1e\u0e22\u0e32\u0e1a\u0e32\u0e25 Pillbox", sub: "Downtown", meta: "2.4 km" },
      { title: "\u0e23\u0e49\u0e32\u0e19\u0e2a\u0e30\u0e14\u0e27\u0e01\u0e0b\u0e37\u0e49\u0e2d 24 \u0e0a\u0e21.", sub: "Strawberry", meta: "0.8 km" },
      { title: "\u0e2d\u0e39\u0e48\u0e0b\u0e48\u0e2d\u0e21\u0e23\u0e16", sub: "La Mesa", meta: "3.1 km" },
    ],
  },
  market: {
    title: "\u0e15\u0e25\u0e32\u0e14\u0e0b\u0e37\u0e49\u0e2d\u0e02\u0e32\u0e22",
    cta: "\u0e25\u0e07\u0e1b\u0e23\u0e30\u0e01\u0e32\u0e28\u0e43\u0e2b\u0e21\u0e48",
    rows: [
      { title: "BMW M4", sub: "\u0e23\u0e16\u0e22\u0e19\u0e15\u0e4c \u00b7 \u0e2a\u0e20\u0e32\u0e1e\u0e14\u0e35", meta: "$125,000", icon: "car-side" },
      { title: "\u0e21\u0e35\u0e14\u0e1e\u0e1a\u0e2a\u0e38\u0e14\u0e17\u0e49\u0e32\u0e22", sub: "\u0e02\u0e2d\u0e07\u0e2a\u0e30\u0e2a\u0e21", meta: "$8,500", icon: "hammer" },
      { title: "\u0e0a\u0e38\u0e14\u0e1b\u0e23\u0e31\u0e1a\u0e41\u0e15\u0e48\u0e07\u0e23\u0e16", sub: "\u0e2d\u0e30\u0e44\u0e2b\u0e25\u0e48", meta: "$3,200", icon: "wrench" },
    ],
  },
  housing: {
    title: "\u0e17\u0e35\u0e48\u0e2d\u0e22\u0e39\u0e48\u0e2d\u0e32\u0e28\u0e31\u0e22",
    rows: [
      { title: "House \u2014 Vinewood", sub: "4 \u0e2b\u0e49\u0e2d\u0e07\u0e19\u0e2d\u0e19 \u00b7 3 \u0e2b\u0e49\u0e2d\u0e07\u0e19\u0e49\u0e33", meta: "$1,200,000", icon: "house" },
      { title: "Apartment \u2014 Downtown", sub: "2 \u0e2b\u0e49\u0e2d\u0e07\u0e19\u0e2d\u0e19 \u00b7 1 \u0e2b\u0e49\u0e2d\u0e07\u0e19\u0e49\u0e33", meta: "$450,000", icon: "house" },
      { title: "Room \u2014 East Side", sub: "1 \u0e2b\u0e49\u0e2d\u0e07\u0e19\u0e2d\u0e19", meta: "$150,000", icon: "house" },
    ],
  },
  services: {
    title: "\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23",
    rows: [
      { title: "Taxi", sub: "\u0e40\u0e23\u0e35\u0e22\u0e01\u0e41\u0e17\u0e47\u0e01\u0e0b\u0e35\u0e48", icon: "taxi", action: "\u0e01\u0e33\u0e25\u0e31\u0e07\u0e40\u0e23\u0e35\u0e22\u0e01 Taxi" },
      { title: "Mechanic", sub: "\u0e0a\u0e48\u0e32\u0e07\u0e0b\u0e48\u0e2d\u0e21\u0e23\u0e16", icon: "wrench", action: "\u0e01\u0e33\u0e25\u0e31\u0e07\u0e40\u0e23\u0e35\u0e22\u0e01\u0e0a\u0e48\u0e32\u0e07\u0e0b\u0e48\u0e2d\u0e21" },
      { title: "EMS", sub: "\u0e2b\u0e19\u0e48\u0e27\u0e22\u0e01\u0e39\u0e49\u0e0a\u0e35\u0e1e\u0e09\u0e38\u0e01\u0e40\u0e09\u0e34\u0e19", icon: "truck-medical", action: "\u0e01\u0e33\u0e25\u0e31\u0e07\u0e40\u0e23\u0e35\u0e22\u0e01 EMS" },
      { title: "Police", sub: "\u0e15\u0e33\u0e23\u0e27\u0e08", icon: "shield-halved", action: "\u0e01\u0e33\u0e25\u0e31\u0e07\u0e40\u0e23\u0e35\u0e22\u0e01\u0e15\u0e33\u0e23\u0e27\u0e08" },
    ],
  },
  news: {
    title: "\u0e02\u0e48\u0e32\u0e27\u0e2a\u0e32\u0e23",
    rows: [
      { title: "\u0e40\u0e2b\u0e15\u0e38\u0e23\u0e16\u0e0a\u0e19\u0e1a\u0e19\u0e16\u0e19\u0e19 East Side", sub: "\u0e27\u0e31\u0e19\u0e19\u0e35\u0e49 21:42", meta: "\u0e14\u0e48\u0e27\u0e19", icon: "newspaper" },
      { title: "\u0e1b\u0e23\u0e30\u0e01\u0e32\u0e28\u0e01\u0e32\u0e23\u0e1b\u0e34\u0e14\u0e16\u0e19\u0e19\u0e0a\u0e31\u0e48\u0e27\u0e04\u0e23\u0e32\u0e27", sub: "\u0e27\u0e31\u0e19\u0e19\u0e35\u0e49 19:30", meta: "\u0e17\u0e31\u0e48\u0e27\u0e44\u0e1b", icon: "newspaper" },
      { title: "\u0e07\u0e32\u0e19 Meet & Greet \u0e04\u0e37\u0e19\u0e19\u0e35\u0e49 \u0e17\u0e35\u0e48 Downtown", sub: "\u0e27\u0e31\u0e19\u0e19\u0e35\u0e49 16:20", meta: "\u0e01\u0e34\u0e08\u0e01\u0e23\u0e23\u0e21", icon: "newspaper" },
    ],
  },
  classifieds: {
    title: "\u0e1b\u0e23\u0e30\u0e01\u0e32\u0e28 / \u0e07\u0e32\u0e19",
    rows: [
      { title: "\u0e2b\u0e32\u0e04\u0e19\u0e02\u0e31\u0e1a\u0e23\u0e16\u0e2a\u0e48\u0e07\u0e02\u0e2d\u0e07", sub: "\u0e40\u0e07\u0e34\u0e19\u0e40\u0e14\u0e37\u0e2d\u0e19\u0e14\u0e35 \u00b7 Downtown", meta: "$4,500", icon: "briefcase" },
      { title: "\u0e23\u0e31\u0e1a\u0e2a\u0e21\u0e31\u0e04\u0e23\u0e1e\u0e19\u0e31\u0e01\u0e07\u0e32\u0e19\u0e23\u0e49\u0e32\u0e19\u0e01\u0e32\u0e41\u0e1f", sub: "\u0e01\u0e30\u0e01\u0e25\u0e32\u0e07\u0e04\u0e37\u0e19", meta: "$3,200", icon: "briefcase" },
      { title: "\u0e08\u0e49\u0e32\u0e07\u0e0a\u0e48\u0e32\u0e07\u0e0b\u0e48\u0e2d\u0e21\u0e23\u0e16\u0e1b\u0e23\u0e30\u0e08\u0e33", sub: "La Mesa", meta: "$5,000", icon: "briefcase" },
    ],
  },
  events: {
    title: "\u0e01\u0e34\u0e08\u0e01\u0e23\u0e23\u0e21",
    rows: [
      { title: "Car Meet \u2014 Del Perro Pier", sub: "\u0e40\u0e2a\u0e32\u0e23\u0e4c 22:00", meta: "\u0e1f\u0e23\u0e35", icon: "calendar-days" },
      { title: "Street Race Night", sub: "\u0e2d\u0e32\u0e17\u0e34\u0e15\u0e22\u0e4c 23:30", meta: "$500", icon: "calendar-days" },
      { title: "Meet & Greet", sub: "\u0e27\u0e31\u0e19\u0e19\u0e35\u0e49 20:00", meta: "\u0e1f\u0e23\u0e35", icon: "calendar-days" },
    ],
  },
};

function rowHTML(r) {
  return `
    <div class="list-row" ${r.action ? `data-action="${r.action}"` : ""}>
      <div class="list-thumb">${icon(r.icon || "location-dot")}</div>
      <div class="list-info">
        <div class="list-title">${r.title}</div>
        <div class="list-sub">${r.sub || ""}</div>
      </div>
      ${r.meta ? `<span class="list-meta mono">${r.meta}</span>` : ""}
    </div>`;
}

function renderSocialPosts(posts) {
  return posts.map((p, i) => `
    <div class="social-post">
      <div class="social-head">
        <div class="conv-avatar">${p.name[0]}</div>
        <div><div class="list-title">${p.name}</div><div class="list-sub">${p.handle} \u00b7 ${p.time}</div></div>
      </div>
      <p class="social-text">${p.text}</p>
      <div class="social-actions">
        <button class="social-like ${p.liked ? "is-liked" : ""}" data-post="${i}">${icon("heart")}<span class="mono">${p.likes}</span></button>
        <span class="social-count">${icon("comment")}<span class="mono">${p.comments}</span></span>
      </div>
    </div>`).join("");
}

function openListApp(key) {
  const body = document.getElementById("listBody");
  const titleEl = document.getElementById("listTitle");

  if (key === "contacts") {
    titleEl.textContent = "\u0e23\u0e32\u0e22\u0e0a\u0e37\u0e48\u0e2d\u0e1c\u0e39\u0e49\u0e15\u0e34\u0e14\u0e15\u0e48\u0e2d";
    body.innerHTML = CONTACTS.map((c) => `
      <div class="call-row" data-id="${c.id}">
        <div class="conv-avatar">${c.name[0]}</div>
        <div class="conv-info"><div class="conv-name">${c.name}</div><div class="call-meta mono">${c.number}</div></div>
        <button class="call-row-btn" data-call="${c.id}">${icon("phone-volume")}</button>
      </div>`).join("");
    body.querySelectorAll(".call-row").forEach((row) => row.addEventListener("click", () => startCall(row.dataset.id)));
    navigate("list");
    return;
  }

  const def = LIST_APPS[key];
  if (!def) return;
  titleEl.textContent = def.title;

  if (key === "social") {
    body.innerHTML = `<div class="social-feed" id="socialFeed">${renderSocialPosts(def.posts)}</div>`;
    const bindLikes = () => {
      body.querySelectorAll(".social-like").forEach((btn) => btn.addEventListener("click", () => {
        const post = def.posts[Number(btn.dataset.post)];
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        document.getElementById("socialFeed").innerHTML = renderSocialPosts(def.posts);
        bindLikes();
      }));
    };
    bindLikes();
  } else if (key === "map") {
    body.innerHTML = `
      <div class="map-mock"><div class="map-road r1"></div><div class="map-road r2"></div><div class="map-road r3"></div><div class="map-road r4"></div>
        <div class="map-pin">${icon("location-dot")}</div><span class="map-you">\u0e04\u0e38\u0e13\u0e2d\u0e22\u0e39\u0e48\u0e17\u0e35\u0e48\u0e19\u0e35\u0e48</span></div>
      <div class="list-section">${def.places.map((r) => rowHTML({ ...r, icon: "location-dot", action: "\u0e1b\u0e31\u0e01\u0e2b\u0e21\u0e38\u0e14 " + r.title })).join("")}</div>`;
  } else {
    body.innerHTML = `${def.cta ? `<button class="list-cta" id="listCta">${def.cta}</button>` : ""}<div class="list-section">${def.rows.map(rowHTML).join("")}</div>`;
    const cta = document.getElementById("listCta");
    if (cta) cta.addEventListener("click", () => toast("\u0e2a\u0e23\u0e49\u0e32\u0e07\u0e1b\u0e23\u0e30\u0e01\u0e32\u0e28\u0e43\u0e2b\u0e21\u0e48 (\u0e08\u0e33\u0e25\u0e2d\u0e07)"));
  }

  body.querySelectorAll(".list-row[data-action]").forEach((row) => {
    row.addEventListener("click", () => toast(row.dataset.action + " (\u0e08\u0e33\u0e25\u0e2d\u0e07)"));
  });
  navigate("list");
}

/* ---------------------------------------------------------
   Init
--------------------------------------------------------- */
showScreen("home");
renderAppGrid();
renderConvList();
renderCallList();
renderContactList();
renderKeypadGrid();
renderBank();
