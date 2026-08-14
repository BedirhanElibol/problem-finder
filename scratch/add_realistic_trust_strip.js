const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// The new realistic Trust & Activity Bar HTML
const trustStripHtml = `
    <!-- REALISTIC GLOBAL TRUST & LIVE ACTIVITY BAR -->
    <section class="trust-activity-strip" style="background: #0f172a; color: #f8fafc; padding: 18px 0; border-top: 1px solid #1e293b; border-bottom: 1px solid #1e293b; font-size: 13.5px;">
      <div class="container" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
        
        <!-- LIVE OPERATIONAL STATUS BADGE -->
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="width: 10px; height: 10px; background: #10b981; border-radius: 50%; display: inline-block; box-shadow: 0 0 10px #10b981;"></span>
          <span id="status-title" style="font-weight: 700; color: #34d399;">System Status: Operational</span>
          <span style="color: #64748b;">|</span>
          <span id="status-sub" style="color: #94a3b8; font-weight: 600;">99.99% Uptime SLA</span>
        </div>

        <!-- REALISTIC LIVE ACTIVITY STREAM -->
        <div class="live-ticker-box" style="display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.06); padding: 8px 18px; border-radius: 9999px; border: 1px solid rgba(255,255,255,0.1);">
          <span style="font-weight: 800; color: #38bdf8; font-size: 12px; letter-spacing: 0.5px; text-transform: uppercase;">LIVE FEED</span>
          <span id="ticker-text" style="color: #e2e8f0; font-weight: 600; min-width: 380px;">🧒 KinderLog: Little Explorers Class — Afternoon Painting Activity Logged</span>
        </div>

        <!-- GLOBAL COMPLIANCE & TRUST BADGES -->
        <div style="display: flex; align-items: center; gap: 18px; font-weight: 700; color: #cbd5e1;">
          <span style="display: flex; align-items: center; gap: 6px;">🔒 <span id="badge-compliance">GDPR & HIPAA Compliant</span></span>
          <span style="display: flex; align-items: center; gap: 6px;">🛡️ <span id="badge-security">256-bit AES Encrypted</span></span>
        </div>

      </div>
    </section>
`;

// Insert the Trust Strip right after the feature pills grid
html = html.replace('</div>\n\n      </div>\n    </section>\n\n    <!-- DEDICATED ROLE APP LAUNCHER CARDS -->', '</div>\n\n      </div>\n    </section>\n' + trustStripHtml + '\n    <!-- DEDICATED ROLE APP LAUNCHER CARDS -->');

// Add live ticker rotation script into setGlobalLang & setInterval
const tickerScript = `
    const tickerEvents = {
      en: [
        "🧒 KinderLog: Little Explorers Class — Afternoon Painting Activity Logged",
        "👵 CareLog: Sunrise Senior Care — Vitals Recorded (BP 120/80, Pulse 72)",
        "🥗 KinderLog: Sunshine Preschool — Lunch Service Completed (100% Eaten)",
        "💊 CareLog: Golden Care Facility — Afternoon Medication Administered"
      ],
      tr: [
        "🧒 KinderLog: Minik Kaşifler Sınıfı — Öğleden Sonra Resim Etkinliği Kaydedildi",
        "👵 CareLog: Huzur Yaşlı Bakım Evi — Sabah Vital Bulguları Alındı (Tansiyon 120/80)",
        "🥗 KinderLog: Gökkuşağı Anaokulu — Öğle Yemeği Tamamlandı (%100 Tüketildi)",
        "💊 CareLog: Sevgi Bakımevi — Düzenli İlaç Takibi Tamamlandı"
      ]
    };

    let currentLangKey = 'en';
    let tickerIdx = 0;

    setInterval(() => {
      const el = document.getElementById('ticker-text');
      if (!el) return;
      const list = tickerEvents[currentLangKey] || tickerEvents.en;
      tickerIdx = (tickerIdx + 1) % list.length;
      el.style.opacity = 0;
      setTimeout(() => {
        el.innerText = list[tickerIdx];
        el.style.opacity = 1;
      }, 200);
    }, 4000);
`;

html = html.replace('let currentLangKey = \'en\';', '');
html = html.replace('function setGlobalLang(lang) {', tickerScript + '\n    function setGlobalLang(lang) {\n      currentLangKey = lang;');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully added realistic Trust & Activity Bar to landing-page.html!');
