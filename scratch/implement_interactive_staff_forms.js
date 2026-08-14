const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace the Teacher Log Entry Form with a complete multi-field Interactive Finding Logger
const oldTeacherForm = `<form onsubmit="event.preventDefault(); showToast('success', '✔ Log saved & sent to family!');">
                  <div style="margin-bottom:12px;">
                    <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;" data-i18n="lblSelectChild">Select Child</label>
                    <select id="sel-child-log" style="width:100%; padding:10px; border:1px solid var(--border-color); background:var(--bg-main); color:var(--text-primary); border-radius:8px; font-weight:600;">
                      <option>Mila Yılmaz</option>
                      <option>Zeynep Kaya</option>
                      <option>Ali Demir</option>
                    </select>
                  </div>
                  <div style="margin-bottom:14px;">
                    <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;" data-i18n="lblMealStatus">Meal Log Status</label>
                    <select id="sel-meal-log" style="width:100%; padding:10px; border:1px solid var(--border-color); background:var(--bg-main); color:var(--text-primary); border-radius:8px; font-weight:600;">
                      <option data-i18n="optMeal100">Lunch: 100% Eaten</option>
                      <option data-i18n="optMeal75">Lunch: 75% Eaten</option>
                      <option data-i18n="optMeal50">Lunch: 50% Eaten</option>
                    </select>
                  </div>
                  <button type="submit" style="width:100%; background:var(--brand-teal); color:white; font-weight:700; padding:12px; border:none; border-radius:10px; cursor:pointer;" data-i18n="btnSaveNotify">
                    Save & Notify Family ➜
                  </button>
                </form>`;

const newTeacherForm = `<form onsubmit="addTeacherFinding(event)">
                  <div style="margin-bottom:10px;">
                    <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;" data-i18n="lblSelectChild">Select Child</label>
                    <select id="t-child" style="width:100%; padding:10px; border:1px solid var(--border-color); background:var(--bg-main); color:var(--text-primary); border-radius:8px; font-weight:600;">
                      <option value="Mila Yılmaz">Mila Yılmaz</option>
                      <option value="Zeynep Kaya">Zeynep Kaya</option>
                      <option value="Ali Demir">Ali Demir</option>
                      <option value="Mehmet Can">Mehmet Can</option>
                    </select>
                  </div>
                  <div style="margin-bottom:10px;">
                    <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;" data-i18n="lblCategory">Finding Category (Bulgu Türü)</label>
                    <select id="t-category" style="width:100%; padding:10px; border:1px solid var(--border-color); background:var(--bg-main); color:var(--text-primary); border-radius:8px; font-weight:600;">
                      <option value="Meal">🍽️ Meal (Yemek)</option>
                      <option value="Nap">💤 Nap (Uyku)</option>
                      <option value="Activity">🎨 Activity (Etkinlik)</option>
                      <option value="Medication">💊 Medication (İlaç)</option>
                    </select>
                  </div>
                  <div style="margin-bottom:10px;">
                    <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;" data-i18n="lblValue">Finding Value / Status (Bulgu Detayı)</label>
                    <select id="t-val" style="width:100%; padding:10px; border:1px solid var(--border-color); background:var(--bg-main); color:var(--text-primary); border-radius:8px; font-weight:600;">
                      <option value="100% Eaten">✔ 100% Eaten (%100 Yenildi)</option>
                      <option value="75% Eaten">✔ 75% Eaten (%75 Yenildi)</option>
                      <option value="Slept 1.5 Hours">💤 Slept 1.5 Hours (1.5 Saat Uyu)</option>
                      <option value="Painting Activity">🎨 Finger Painting (Resim)</option>
                      <option value="Cough Syrup 5ml">💊 Given Cough Syrup 5ml</option>
                    </select>
                  </div>
                  <div style="margin-bottom:12px;">
                    <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;" data-i18n="lblNote">Teacher Note (Öğretmen Notu)</label>
                    <input id="t-note" type="text" placeholder="e.g. Very energetic today..." style="width:100%; padding:10px; border:1px solid var(--border-color); background:var(--bg-main); color:var(--text-primary); border-radius:8px; font-weight:600;">
                  </div>
                  <button type="submit" style="width:100%; background:var(--brand-teal); color:white; font-weight:700; padding:12px; border:none; border-radius:10px; cursor:pointer;" data-i18n="btnSaveNotify">
                    Save Finding & Notify Family ➜
                  </button>
                </form>`;

html = html.replace(oldTeacherForm, newTeacherForm);

// Replace the Nurse Vitals Form with a complete multi-vitals Interactive Form
const oldNurseForm = `<form onsubmit="event.preventDefault(); showToast('success', '✔ Medication logged for Ayşe Teyze!');">
                  <div style="margin-bottom:12px;">
                    <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;" data-i18n="lblResident">Select Resident</label>
                    <select style="width:100%; padding:10px; border:1px solid var(--border-color); background:var(--bg-main); color:var(--text-primary); border-radius:8px; font-weight:600;"><option>Ayşe Teyze (Room 204)</option></select>
                  </div>
                  <div style="margin-bottom:14px;">
                    <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;" data-i18n="lblMedType">Medication Type</label>
                    <select style="width:100%; padding:10px; border:1px solid var(--border-color); background:var(--bg-main); color:var(--text-primary); border-radius:8px; font-weight:600;"><option>BP Regulator (14:00 Dose)</option></select>
                  </div>
                  <button type="submit" style="width:100%; background:var(--brand-blue); color:white; font-weight:700; padding:12px; border:none; border-radius:10px; cursor:pointer;" data-i18n="btnLogMed">
                    Log Medication & Notify Doctor ➜
                  </button>
                </form>`;

const newNurseForm = `<form onsubmit="addNurseVitalFinding(event)">
                  <div style="margin-bottom:10px;">
                    <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;" data-i18n="lblResident">Select Resident (Sakin)</label>
                    <select id="n-resident" style="width:100%; padding:10px; border:1px solid var(--border-color); background:var(--bg-main); color:var(--text-primary); border-radius:8px; font-weight:600;">
                      <option value="Ayşe Teyze (Room 204)">Ayşe Teyze (Room 204)</option>
                      <option value="Mehmet Amca (Room 208)">Mehmet Amca (Room 208)</option>
                      <option value="Fatma Teyze (Room 212)">Fatma Teyze (Room 212)</option>
                    </select>
                  </div>
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
                    <div>
                      <label style="display:block; font-size:11.5px; font-weight:700; margin-bottom:4px;">BP (Tansiyon)</label>
                      <input id="n-bp" type="text" value="120/80" style="width:100%; padding:8px; border:1px solid var(--border-color); background:var(--bg-main); color:var(--text-primary); border-radius:6px; font-weight:600;">
                    </div>
                    <div>
                      <label style="display:block; font-size:11.5px; font-weight:700; margin-bottom:4px;">Pulse (Nabız)</label>
                      <input id="n-pulse" type="text" value="72" style="width:100%; padding:8px; border:1px solid var(--border-color); background:var(--bg-main); color:var(--text-primary); border-radius:6px; font-weight:600;">
                    </div>
                  </div>
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px;">
                    <div>
                      <label style="display:block; font-size:11.5px; font-weight:700; margin-bottom:4px;">Sugar (Şeker)</label>
                      <input id="n-sugar" type="text" value="98" style="width:100%; padding:8px; border:1px solid var(--border-color); background:var(--bg-main); color:var(--text-primary); border-radius:6px; font-weight:600;">
                    </div>
                    <div>
                      <label style="display:block; font-size:11.5px; font-weight:700; margin-bottom:4px;">Temp (Ateş °C)</label>
                      <input id="n-temp" type="text" value="36.6" style="width:100%; padding:8px; border:1px solid var(--border-color); background:var(--bg-main); color:var(--text-primary); border-radius:6px; font-weight:600;">
                    </div>
                  </div>
                  <button type="submit" style="width:100%; background:var(--brand-blue); color:white; font-weight:700; padding:12px; border:none; border-radius:10px; cursor:pointer;" data-i18n="btnLogMed">
                    Log Vitals & Notify Doctor ➜
                  </button>
                </form>`;

html = html.replace(oldNurseForm, newNurseForm);

// Add the JavaScript handlers for dynamic table insertion and live feed sync
const interactiveScript = `
    // LIVE FINDINGS & VITALS DATA STORE
    const liveTeacherFindings = [];
    const liveNurseVitals = [];

    function addTeacherFinding(e) {
      e.preventDefault();
      const child = document.getElementById('t-child').value;
      const cat = document.getElementById('t-category').value;
      const val = document.getElementById('t-val').value;
      const note = document.getElementById('t-note').value || 'Daily log recorded.';

      const timeStr = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

      // Add to live teacher findings store
      liveTeacherFindings.unshift({ child, cat, val, note, timeStr });

      // Dynamic Table Row Insertion in Class Roster
      const tbody = document.querySelector('#role-workspace-ogretmen table tbody');
      if (tbody) {
        const tr = document.createElement('tr');
        tr.style.background = 'rgba(16,185,129,0.1)';
        tr.innerHTML = \`
          <td style="font-weight:700;">\${child}</td>
          <td>3 Yrs</td>
          <td><span class="status-pill green">\${val}</span></td>
          <td>\${timeStr}</td>
          <td><span class="status-pill blue">\${note}</span></td>
        \`;
        tbody.insertBefore(tr, tbody.firstChild);
      }

      // Dynamic Feed Item Insertion in Live Activity Stream
      const feedContainer = document.querySelector('#role-workspace-ogretmen .live-stream-box');
      const feedItemText = \`\${cat === 'Meal' ? '🍽️' : cat === 'Nap' ? '💤' : '🎨'} \${cat} logged for \${child}: \${val}\`;
      
      const tickerTextEl = document.getElementById('ticker-text');
      if (tickerTextEl) {
        tickerTextEl.innerText = \`🧒 KinderLog: \${child} — \${cat}: \${val}\`;
      }

      // Add to Family Feed View
      const familyFeedBox = document.querySelector('#role-workspace-veli .family-live-feed');
      if (familyFeedBox) {
        const card = document.createElement('div');
        card.style.cssText = 'background:var(--bg-subtle); border-radius:12px; padding:16px; border:1px solid var(--border-color); animation:slideInRight 0.3s ease;';
        card.innerHTML = \`
          <div style="display:flex; justify-content:space-between; font-weight:800; font-size:13.5px; margin-bottom:6px; color:var(--brand-teal);">
            <span>\${cat === 'Meal' ? '🍽️' : '🎨'} \${cat}: \${val}</span>
            <span style="font-size:11.5px; color:var(--text-muted);">\${timeStr}</span>
          </div>
          <p style="font-size:13px; color:var(--text-secondary);">\${child} — \${note}</p>
        \`;
        familyFeedBox.insertBefore(card, familyFeedBox.firstChild);
      }

      showToast('success', \`✔ \${cat} finding logged for \${child}!\`);
      document.getElementById('t-note').value = '';
    }

    function addNurseVitalFinding(e) {
      e.preventDefault();
      const resident = document.getElementById('n-resident').value;
      const bp = document.getElementById('n-bp').value || '120/80';
      const pulse = document.getElementById('n-pulse').value || '72';
      const sugar = document.getElementById('n-sugar').value || '98';
      const temp = document.getElementById('n-temp').value || '36.6';

      const roomMatch = resident.match(/\\(Room (\\d+)\\)/);
      const roomNum = roomMatch ? roomMatch[1] : '204';
      const resName = resident.split(' (')[0];

      // Dynamic Table Row Insertion in Resident Health Monitor
      const tbody = document.querySelector('#role-workspace-carelog table tbody');
      if (tbody) {
        const tr = document.createElement('tr');
        tr.style.background = 'rgba(37,99,235,0.1)';
        tr.innerHTML = \`
          <td style="font-weight:700;">\${resName}</td>
          <td>\${roomNum}</td>
          <td><span class="status-pill green">\${bp} mmHg</span></td>
          <td>\${pulse} bpm</td>
          <td>\${sugar} mg/dL (\${temp}°C)</td>
        \`;
        tbody.insertBefore(tr, tbody.firstChild);
      }

      const tickerTextEl = document.getElementById('ticker-text');
      if (tickerTextEl) {
        tickerTextEl.innerText = \`👵 CareLog: \${resName} (Room \${roomNum}) — Vitals Recorded: BP \${bp}, Pulse \${pulse} bpm\`;
      }

      showToast('success', \`✔ Vitals logged for \${resName}: BP \${bp}, Pulse \${pulse} bpm!\`);
    }
`;

html = html.replace('function showToast(type, message) {', interactiveScript + '\n    function showToast(type, message) {');

// Add class name to family live feed container
html = html.replace(
  '<div style="display:flex; flex-direction:column; gap:14px;">',
  '<div class="family-live-feed" style="display:flex; flex-direction:column; gap:14px;">'
);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully added Interactive Staff Findings & Vitals Logging Engine to landing-page.html!');
