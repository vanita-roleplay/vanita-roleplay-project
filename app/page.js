"use client";

import { useEffect } from "react";
import "./page.css";


export default function HubPage() {
  useEffect(() => {
    /* =========================================================
       VANITA ROLEPLAY — Prototype Hub
       Static navigation page. No mock data, no game logic —
       just links out to the other prototype builds.
    ========================================================= */

    const ICONS = {"heart-pulse": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M228.3 469.1L47.6 300.4c-4.2-3.9-8.2-8.1-11.9-12.4l87 0c22.6 0 43-13.6 51.7-34.5l10.5-25.2 49.3 109.5c3.8 8.5 12.1 14 21.4 14.1s17.8-5 22-13.3L320 253.7l1.7 3.4c9.5 19 28.9 31 50.1 31l104.5 0c-3.7 4.3-7.7 8.5-11.9 12.4L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9zM503.7 240l-132 0c-3 0-5.8-1.7-7.2-4.4l-23.2-46.3c-4.1-8.1-12.4-13.3-21.5-13.3s-17.4 5.1-21.5 13.3l-41.4 82.8L205.9 158.2c-3.9-8.7-12.7-14.3-22.2-14.1s-18.1 5.9-21.8 14.8l-31.8 76.3c-1.2 3-4.2 4.9-7.4 4.9L16 240c-2.6 0-5 .4-7.3 1.1C3 225.2 0 208.2 0 190.9l0-5.8c0-69.9 50.5-129.5 119.4-141C165 36.5 211.4 51.4 244 84l12 12 12-12c32.6-32.6 79-47.5 124.6-39.9C461.5 55.6 512 115.2 512 185.1l0 5.8c0 16.9-2.8 33.5-8.3 49.1z\"/></svg>", "bag-shopping": "<svg viewBox=\"0 0 448 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48C336 50.1 285.9 0 224 0S112 50.1 112 112l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z\"/></svg>", "box-open": "<svg viewBox=\"0 0 640 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M58.9 42.1c3-6.1 9.6-9.6 16.3-8.7L320 64 564.8 33.4c6.7-.8 13.3 2.7 16.3 8.7l41.7 83.4c9 17.9-.6 39.6-19.8 45.1L439.6 217.3c-13.9 4-28.8-1.9-36.2-14.3L320 64 236.6 203c-7.4 12.4-22.3 18.3-36.2 14.3L37.1 170.6c-19.3-5.5-28.8-27.2-19.8-45.1L58.9 42.1zM321.1 128l54.9 91.4c14.9 24.8 44.6 36.6 72.5 28.6L576 211.6l0 167c0 22-15 41.2-36.4 46.6l-204.1 51c-10.2 2.6-20.9 2.6-31 0l-204.1-51C79 419.7 64 400.5 64 378.5l0-167L191.6 248c27.8 8 57.6-3.8 72.5-28.6L318.9 128l2.2 0z\"/></svg>", "arrow-right": "<svg viewBox=\"0 0 448 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z\"/></svg>", "lock": "<svg viewBox=\"0 0 448 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z\"/></svg>", "car": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M135.2 117.4L109.1 192l293.8 0-26.1-74.6C372.3 104.6 360.2 96 346.6 96L165.4 96c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32l181.2 0c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2l0 144 0 48c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-48L96 400l0 48c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-48L0 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z\"/></svg>", "mobile-screen-button": "<svg viewBox=\"0 0 384 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M16 64C16 28.7 44.7 0 80 0L304 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L80 512c-35.3 0-64-28.7-64-64L16 64zM224 448a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM304 64L80 64l0 320 224 0 0-320z\"/></svg>", "hourglass-half": "<svg viewBox=\"0 0 384 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M32 0C14.3 0 0 14.3 0 32S14.3 64 32 64l0 11c0 42.4 16.9 83.1 46.9 113.1L146.7 256 78.9 323.9C48.9 353.9 32 394.6 32 437l0 11c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0 256 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-11c0-42.4-16.9-83.1-46.9-113.1L237.3 256l67.9-67.9c30-30 46.9-70.7 46.9-113.1l0-11c17.7 0 32-14.3 32-32s-14.3-32-32-32L320 0 64 0 32 0zM96 75l0-11 192 0 0 11c0 19-5.6 37.4-16 53L112 128c-10.3-15.6-16-34-16-53zm16 309c3.5-5.3 7.6-10.3 12.1-14.9L192 301.3l67.9 67.9c4.6 4.6 8.6 9.6 12.1 14.9L112 384z\"/></svg>", "gauge-high": "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM256 416c35.3 0 64-28.7 64-64c0-17.4-6.9-33.1-18.1-44.6L366 161.7c5.3-12.1-.2-26.3-12.3-31.6s-26.3 .2-31.6 12.3L257.9 288c-.6 0-1.3 0-1.9 0c-35.3 0-64 28.7-64 64s28.7 64 64 64zM176 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM96 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm352-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z\"/></svg>", "house": "<svg viewBox=\"0 0 576 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z\"/></svg>", "walkie-talkie": "<svg viewBox=\"0 0 384 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M112 24c0-13.3-10.7-24-24-24S64 10.7 64 24l0 72L48 96C21.5 96 0 117.5 0 144L0 300.1c0 12.7 5.1 24.9 14.1 33.9l3.9 3.9c9 9 14.1 21.2 14.1 33.9L32 464c0 26.5 21.5 48 48 48l224 0c26.5 0 48-21.5 48-48l0-92.1c0-12.7 5.1-24.9 14.1-33.9l3.9-3.9c9-9 14.1-21.2 14.1-33.9L384 144c0-26.5-21.5-48-48-48l-16 0c0-17.7-14.3-32-32-32s-32 14.3-32 32l-32 0c0-17.7-14.3-32-32-32s-32 14.3-32 32l-48 0 0-72zm0 136l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z\"/></svg>", "id-card": "<svg viewBox=\"0 0 576 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 96l576 0c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96zm0 32L0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-288L0 128zM64 405.3c0-29.5 23.9-53.3 53.3-53.3l117.3 0c29.5 0 53.3 23.9 53.3 53.3c0 5.9-4.8 10.7-10.7 10.7L74.7 416c-5.9 0-10.7-4.8-10.7-10.7zM176 192a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm176 16c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16z\"/></svg>"};

    const slots = {
      iconHud: "heart-pulse",
      iconInv: "bag-shopping",
      iconPhone: "mobile-screen-button",
      iconGarage: "car",
      arrowHud: "arrow-right",
      arrowInv: "arrow-right",
      arrowPhone: "arrow-right",
      arrowGarage: "arrow-right",
    };

    Object.entries(slots).forEach(([id, name]) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = ICONS[name] || "";
    });


  }, []);

  return (
    <>
      <div className="game-stage" id="gameStage">

        <div className="scene"></div>

        <main className="hub">

          <div className="hub-brand">
            <img src="/vanita-logo@2x.png" alt="VANITA ROLEPLAY" className="hub-logo" />
            <p className="hub-tagline">LOS SANTOS &middot; SAN ANDREAS</p>
          </div>

          <h1 className="hub-title">PROTOTYPE HUB</h1>
          <p className="hub-sub">เลือกหน้า Prototype ที่ต้องการเปิดดู — ทุกหน้าใช้ Mock Data เท่านั้น ยังไม่เชื่อมกับ Server จริง</p>

          <div className="hub-grid">

            <a className="hub-card" href="/hud">
              <span className="hub-card-tag hub-card-tag--live">READY</span>
              <div className="hub-card-icon hub-card-icon--health" id="iconHud"></div>
              <h2 className="hub-card-title">HUD Prototype</h2>
              <p className="hub-card-desc">Blood UI, Health/Armor circle, Status icons &amp; Action Progress overlay</p>
              <span className="hub-card-cta">เปิดหน้า <i className="icon" id="arrowHud"></i></span>
            </a>

            <a className="hub-card" href="/inventory">
              <span className="hub-card-tag hub-card-tag--live">READY</span>
              <div className="hub-card-icon hub-card-icon--armor" id="iconInv"></div>
              <h2 className="hub-card-title">Inventory</h2>
              <p className="hub-card-desc">หมวดหมู่ไอเทม, Use / Give / Drop พร้อม Modal ให้ของผู้เล่นอื่น</p>
              <span className="hub-card-cta">เปิดหน้า <i className="icon" id="arrowInv"></i></span>
            </a>

            <a className="hub-card" href="/phone">
              <span className="hub-card-tag hub-card-tag--live">READY</span>
              <div className="hub-card-icon hub-card-icon--vehicle" id="iconPhone"></div>
              <h2 className="hub-card-title">Phone UI</h2>
              <p className="hub-card-desc">โทรศัพท์ในเกม — 15 แอป: ข้อความ, โทร (ปุ่มกด/รายชื่อ), ธนาคาร, โซเชียล, แผนที่ ฯลฯ</p>
              <span className="hub-card-cta">เปิดหน้า <i className="icon" id="arrowPhone"></i></span>
            </a>

            <a className="hub-card" href="/garage">
              <span className="hub-card-tag hub-card-tag--live">READY</span>
              <div className="hub-card-icon hub-card-icon--fuel" id="iconGarage"></div>
              <h2 className="hub-card-title">Garage</h2>
              <p className="hub-card-desc">จัดการยานพาหนะ ซ่อม/เติมน้ำมัน/ล้างรถ พร้อม Action Progress</p>
              <span className="hub-card-cta">เปิดหน้า <i className="icon" id="arrowGarage"></i></span>
            </a>

          </div>

          <footer className="hub-footer">
            <span>VANITA ROLEPLAY &middot; Internal Prototype Build</span>
          </footer>

        </main>

      </div>{/* /.game-stage */}
    </>
  );
}
