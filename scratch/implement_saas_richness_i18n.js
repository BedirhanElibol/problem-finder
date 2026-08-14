const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace the saas-workspace-content section with rich multi-column widgets for all 4 roles
const oldSaasContent = `<div class="saas-workspace-content">
          
          <div id="role-workspace-ogretmen" style="display:none;">
            <div class="saas-metrics-grid">
              <div class="saas-metric-card"><div class="saas-metric-label">CLASS ATTENDANCE</div><div class="saas-metric-value">18 / 18</div><div class="saas-metric-sub">▲ 100% Present</div></div>
              <div class="saas-metric-card"><div class="saas-metric-label">NAP STATUS</div><div class="saas-metric-value">14 Asleep</div><div class="saas-metric-sub">💤 13:00 - 14:30</div></div>
              <div class="saas-metric-card"><div class="saas-metric-label">MEAL SUCCESS</div><div class="saas-metric-value">94.2%</div><div class="saas-metric-sub">▲ 18/18 Eaten</div></div>
              <div class="saas-metric-card"><div class="saas-metric-label">MEDICATIONS</div><div class="saas-metric-value">2 Pending</div><div class="saas-metric-sub">⏰ 14:00 & 16:00</div></div>
            </div>

            <div style="display:grid; grid-template-columns:1.6fr 1fr; gap:24px;">
              <div style="background:var(--bg-surface); border:1px solid var(--border-color); border-radius:16px; padding:24px;">
                <h4 style="font-size:16.5px; font-weight:800; margin-bottom:14px;">📋 Little Explorers Class Roster</h4>
                <table class="saas-table">
                  <thead><tr><th>Child Name</th><th>Age</th><th>Meal</th><th>Nap</th><th>Medication</th></tr></thead>
                  <tbody>
                    <tr><td style="font-weight:700;">Mila Yılmaz</td><td>3 Yrs</td><td><span class="status-pill green">✔ 100% Eaten</span></td><td>13:00 - 14:30</td><td>Pending (14:00)</td></tr>
                    <tr><td style="font-weight:700;">Zeynep Kaya</td><td>3 Yrs</td><td><span class="status-pill green">✔ 75% Eaten</span></td><td>💤 Asleep</td><td>None</td></tr>
                  </tbody>
                </table>
              </div>

              <div style="background:var(--bg-surface); border:1px solid var(--border-color); border-radius:16px; padding:24px;">
                <h4 style="font-size:16.5px; font-weight:800; margin-bottom:14px;">✍️ Log Entry for Mila</h4>
                <form onsubmit="event.preventDefault(); showToast('success', '✔ Log saved for Mila Yılmaz!');">
                  <div style="margin-bottom:12px;">
                    <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;">Select Child</label>
                    <select id="sel-child-log" style="width:100%; padding:10px; border:1px solid var(--border-color); background:var(--bg-main); border-radius:8px; font-weight:600;"><option>Mila Yılmaz</option></select>
                  </div>
                  <div style="margin-bottom:14px;">
                    <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;">Meal Log Status</label>
                    <select id="sel-meal-log" style="width:100%; padding:10px; border:1px solid var(--border-color); background:var(--bg-main); border-radius:8px; font-weight:600;"><option>Lunch: 100% Eaten</option></select>
                  </div>
                  <button type="submit" style="width:100%; background:var(--brand-teal); color:white; font-weight:700; padding:12px; border:none; border-radius:10px; cursor:pointer;">Save & Notify Family ➜</button>
                </form>
              </div>
            </div>
          </div>

          <div id="role-workspace-carelog" style="display:none;">
            <div class="saas-metrics-grid">
              <div class="saas-metric-card"><div class="saas-metric-label">TOTAL RESIDENTS</div><div class="saas-metric-value">80 Residents</div></div>
              <div class="saas-metric-card"><div class="saas-metric-label">INFIRMARY ACTIVE</div><div class="saas-metric-value">3 Active</div></div>
            </div>
          </div>

          <div id="role-workspace-veli" style="display:none;">
            <div style="background:var(--bg-surface); border:1px solid var(--border-color); border-radius:16px; padding:24px;">
              <h4 style="font-size:18px; font-weight:800;">👨‍👩‍👧 Family Feed for Mila Yılmaz</h4>
              <p style="font-size:14px; color:var(--text-secondary);">Today: Afternoon Activity: Painting! Lunch 100% Eaten, Nap 1.5 hrs.</p>
            </div>
          </div>

          <div id="role-workspace-yonetici" style="display:none;">
            <div style="background:var(--bg-surface); border:1px solid var(--border-color); border-radius:16px; padding:24px;">
              <h4 style="font-size:18px; font-weight:800;">📊 Facility Manager Dashboard</h4>
              <p style="font-size:14px; color:var(--text-secondary);">Monthly Revenue: $4,900 / mo | Occupancy: 94.2%</p>
            </div>
          </div>

        </div>`;

const newSaasContent = `<div class="saas-workspace-content">
          
          <!-- ROLE 1: TEACHER PORTAL WORKSPACE -->
          <div id="role-workspace-ogretmen" style="display:none;">
            <div class="saas-metrics-grid">
              <div class="saas-metric-card">
                <div class="saas-metric-label" data-i18n="mAttendanceLabel">CLASS ATTENDANCE</div>
                <div class="saas-metric-value">18 / 18</div>
                <div class="saas-metric-sub" data-i18n="mAttendanceSub">▲ 100% Present</div>
              </div>
              <div class="saas-metric-card">
                <div class="saas-metric-label" data-i18n="mNapLabel">NAP STATUS</div>
                <div class="saas-metric-value">14 Asleep</div>
                <div class="saas-metric-sub">💤 13:00 - 14:30</div>
              </div>
              <div class="saas-metric-card">
                <div class="saas-metric-label" data-i18n="mMealLabel">MEAL SUCCESS</div>
                <div class="saas-metric-value">94.2%</div>
                <div class="saas-metric-sub" data-i18n="mMealSub">▲ 18/18 Eaten</div>
              </div>
              <div class="saas-metric-card">
                <div class="saas-metric-label" data-i18n="mMedicationLabel">MEDICATIONS</div>
                <div class="saas-metric-value">2 Pending</div>
                <div class="saas-metric-sub">⏰ 14:00 & 16:00</div>
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1.6fr 1fr; gap:24px; margin-bottom:24px;">
              <!-- CLASS ROSTER TABLE -->
              <div style="background:var(--bg-surface); border:1px solid var(--border-color); border-radius:16px; padding:24px; box-shadow:var(--shadow-sm);">
                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px;">
                  <h4 style="font-size:16.5px; font-weight:800; color:var(--text-primary);" data-i18n="classRosterTitle">📋 Little Explorers Class Roster</h4>
                  <span style="font-size:12px; font-weight:700; color:var(--brand-teal); background:var(--brand-teal-light); padding:4px 10px; border-radius:9999px;" data-i18n="roomLabel">Room 102</span>
                </div>
                <table class="saas-table">
                  <thead>
                    <tr>
                      <th data-i18n="thChildName">Child Name</th>
                      <th data-i18n="thAge">Age</th>
                      <th data-i18n="thMeal">Meal</th>
                      <th data-i18n="thNap">Nap</th>
                      <th data-i18n="thMedication">Medication</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="font-weight:700;">Mila Yılmaz</td>
                      <td>3 Yrs</td>
                      <td><span class="status-pill green" data-i18n="statusMeal100">✔ 100% Eaten</span></td>
                      <td>13:00 - 14:30</td>
                      <td><span class="status-pill blue" data-i18n="statusPending14">Pending (14:00)</span></td>
                    </tr>
                    <tr>
                      <td style="font-weight:700;">Zeynep Kaya</td>
                      <td>3 Yrs</td>
                      <td><span class="status-pill green" data-i18n="statusMeal75">✔ 75% Eaten</span></td>
                      <td>💤 Asleep</td>
                      <td data-i18n="statusNone">None</td>
                    </tr>
                    <tr>
                      <td style="font-weight:700;">Ali Demir</td>
                      <td>3 Yrs</td>
                      <td><span class="status-pill green" data-i18n="statusMeal100">✔ 100% Eaten</span></td>
                      <td>13:00 - 14:30</td>
                      <td><span class="status-pill blue" data-i18n="statusPending16">Pending (16:00)</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- 2-TAP QUICK LOG ENTRY FORM -->
              <div style="background:var(--bg-surface); border:1px solid var(--border-color); border-radius:16px; padding:24px; box-shadow:var(--shadow-sm);">
                <h4 style="font-size:16.5px; font-weight:800; margin-bottom:14px; color:var(--text-primary);" data-i18n="logEntryTitle">✍️ Log Entry & Family Sync</h4>
                <form onsubmit="event.preventDefault(); showToast('success', '✔ Log saved & sent to family!');">
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
                </form>
              </div>
            </div>

            <!-- RICH BOTTOM ROW (SCHEDULE & LIVE TIMELINE) -->
            <div style="display:grid; grid-template-columns:1fr 1.2fr; gap:24px;">
              <div style="background:var(--bg-surface); border:1px solid var(--border-color); border-radius:16px; padding:20px;">
                <h4 style="font-size:15px; font-weight:800; margin-bottom:12px; color:var(--text-primary);" data-i18n="schedTitle">📅 Today's Class Schedule</h4>
                <div style="display:flex; flex-direction:column; gap:8px; font-size:13px;">
                  <div style="display:flex; justify-content:space-between; padding:8px 12px; background:var(--bg-subtle); border-radius:8px;">
                    <span style="font-weight:700;">09:00 - 10:00</span>
                    <span data-i18n="schedItem1">🎨 Morning Arts & Crafts</span>
                  </div>
                  <div style="display:flex; justify-content:space-between; padding:8px 12px; background:var(--bg-subtle); border-radius:8px;">
                    <span style="font-weight:700;">12:00 - 13:00</span>
                    <span data-i18n="schedItem2">🥗 Healthy Lunch Service</span>
                  </div>
                  <div style="display:flex; justify-content:space-between; padding:8px 12px; background:var(--bg-subtle); border-radius:8px;">
                    <span style="font-weight:700;">13:00 - 14:30</span>
                    <span data-i18n="schedItem3">💤 Nap & Rest Time</span>
                  </div>
                </div>
              </div>

              <div style="background:var(--bg-surface); border:1px solid var(--border-color); border-radius:16px; padding:20px;">
                <h4 style="font-size:15px; font-weight:800; margin-bottom:12px; color:var(--text-primary);" data-i18n="liveStreamTitle">⚡ Real-Time Family Activity Feed</h4>
                <div style="display:flex; flex-direction:column; gap:8px; font-size:12.5px;">
                  <div style="display:flex; align-items:center; justify-content:space-between; color:var(--text-secondary);">
                    <span>📸 Photo shared with Mila's Family</span>
                    <span style="font-size:11px; color:var(--text-muted);">12:45 PM</span>
                  </div>
                  <div style="display:flex; align-items:center; justify-content:space-between; color:var(--text-secondary);">
                    <span>💊 Cough syrup administered to Ali</span>
                    <span style="font-size:11px; color:var(--text-muted);">12:30 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ROLE 2: CARELOG INFIRMARY WORKSPACE -->
          <div id="role-workspace-carelog" style="display:none;">
            <div class="saas-metrics-grid">
              <div class="saas-metric-card">
                <div class="saas-metric-label" data-i18n="mTotalResidents">TOTAL RESIDENTS</div>
                <div class="saas-metric-value">80 Residents</div>
                <div class="saas-metric-sub">▲ 100% Tracked</div>
              </div>
              <div class="saas-metric-card">
                <div class="saas-metric-label" data-i18n="mActiveInfirmary">ACTIVE INFIRMARY</div>
                <div class="saas-metric-value">3 Active Beds</div>
                <div class="saas-metric-sub">🏥 Room 204, 208, 212</div>
              </div>
              <div class="saas-metric-card">
                <div class="saas-metric-label" data-i18n="mVitalsChecked">VITALS CHECKED</div>
                <div class="saas-metric-value">78 / 80</div>
                <div class="saas-metric-sub">▲ Morning Shift</div>
              </div>
              <div class="saas-metric-card">
                <div class="saas-metric-label" data-i18n="mMedAlerts">CRITICAL MED ALERTS</div>
                <div class="saas-metric-value">0 Pending</div>
                <div class="saas-metric-sub">✔ All Meds Administered</div>
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1.6fr 1fr; gap:24px;">
              <div style="background:var(--bg-surface); border:1px solid var(--border-color); border-radius:16px; padding:24px; box-shadow:var(--shadow-sm);">
                <h4 style="font-size:16.5px; font-weight:800; margin-bottom:14px; color:var(--text-primary);" data-i18n="residentVitalsTitle">👵 Resident Vitals & Health Monitor</h4>
                <table class="saas-table">
                  <thead>
                    <tr>
                      <th data-i18n="thResident">Resident Name</th>
                      <th data-i18n="thRoom">Room</th>
                      <th data-i18n="thBP">Blood Pressure</th>
                      <th data-i18n="thPulse">Pulse</th>
                      <th data-i18n="thBloodSugar">Blood Sugar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="font-weight:700;">Ayşe Teyze</td>
                      <td>204</td>
                      <td><span class="status-pill green">120 / 80 mmHg</span></td>
                      <td>72 bpm</td>
                      <td>98 mg/dL</td>
                    </tr>
                    <tr>
                      <td style="font-weight:700;">Mehmet Amca</td>
                      <td>208</td>
                      <td><span class="status-pill green">125 / 82 mmHg</span></td>
                      <td>75 bpm</td>
                      <td>105 mg/dL</td>
                    </tr>
                    <tr>
                      <td style="font-weight:700;">Fatma Teyze</td>
                      <td>212</td>
                      <td><span class="status-pill green">118 / 78 mmHg</span></td>
                      <td>70 bpm</td>
                      <td>92 mg/dL</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style="background:var(--bg-surface); border:1px solid var(--border-color); border-radius:16px; padding:24px; box-shadow:var(--shadow-sm);">
                <h4 style="font-size:16.5px; font-weight:800; margin-bottom:14px; color:var(--text-primary);" data-i18n="medFormTitle">💊 Quick Med Administration</h4>
                <form onsubmit="event.preventDefault(); showToast('success', '✔ Medication logged for Ayşe Teyze!');">
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
                </form>
              </div>
            </div>
          </div>

          <!-- ROLE 3: FAMILY FEED WORKSPACE -->
          <div id="role-workspace-veli" style="display:none;">
            <div style="display:grid; grid-template-columns:1.5fr 1fr; gap:24px;">
              <div style="background:var(--bg-surface); border:1px solid var(--border-color); border-radius:16px; padding:24px; box-shadow:var(--shadow-sm);">
                <h4 style="font-size:18px; font-weight:800; margin-bottom:12px; color:var(--text-primary);" data-i18n="familyFeedTitle">👨‍👩‍👧 Family Feed for Mila Yılmaz</h4>
                <p style="font-size:14px; color:var(--text-secondary); margin-bottom:18px;" data-i18n="familyFeedDesc">Today's Timeline Summary & Live Photo Updates:</p>
                
                <div style="display:flex; flex-direction:column; gap:14px;">
                  <div style="background:var(--bg-subtle); border-radius:12px; padding:16px; border:1px solid var(--border-color);">
                    <div style="display:flex; justify-content:space-between; font-weight:800; font-size:13.5px; margin-bottom:6px; color:var(--brand-teal);">
                      <span>🎨 Afternoon Activity: Painting</span>
                      <span style="font-size:11.5px; color:var(--text-muted);">13:45 PM</span>
                    </div>
                    <p style="font-size:13px; color:var(--text-secondary);">Mila painted a colorful rainbow today with her friends!</p>
                  </div>

                  <div style="background:var(--bg-subtle); border-radius:12px; padding:16px; border:1px solid var(--border-color);">
                    <div style="display:flex; justify-content:space-between; font-weight:800; font-size:13.5px; margin-bottom:6px; color:#047857;">
                      <span>🍽️ Lunch: 100% Eaten | 💤 Nap: 1.5 Hours</span>
                      <span style="font-size:11.5px; color:var(--text-muted);">13:00 PM</span>
                    </div>
                    <p style="font-size:13px; color:var(--text-secondary);">Mood: Happy and energetic 😊</p>
                  </div>
                </div>
              </div>

              <div style="background:var(--bg-surface); border:1px solid var(--border-color); border-radius:16px; padding:24px; box-shadow:var(--shadow-sm);">
                <h4 style="font-size:16.5px; font-weight:800; margin-bottom:14px; color:var(--text-primary);" data-i18n="msgTeacherTitle">📩 Message Teacher / Request Med</h4>
                <form onsubmit="event.preventDefault(); showToast('success', '✔ Message sent to Melis Öğretmen!');">
                  <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;" data-i18n="lblMessageNote">Note for Teacher</label>
                  <textarea style="width:100%; height:90px; padding:10px; border:1px solid var(--border-color); background:var(--bg-main); color:var(--text-primary); border-radius:8px; font-weight:600; margin-bottom:12px;" placeholder="Please give cough syrup at 16:00..."></textarea>
                  <button type="submit" style="width:100%; background:#854d0e; color:white; font-weight:700; padding:12px; border:none; border-radius:10px; cursor:pointer;" data-i18n="btnSendTeacher">Send Message ➜</button>
                </form>
              </div>
            </div>
          </div>

          <!-- ROLE 4: FACILITY MANAGER WORKSPACE -->
          <div id="role-workspace-yonetici" style="display:none;">
            <div class="saas-metrics-grid">
              <div class="saas-metric-card">
                <div class="saas-metric-label" data-i18n="mRevenueLabel">MONTHLY REVENUE</div>
                <div class="saas-metric-value">$4,900 / mo</div>
                <div class="saas-metric-sub">▲ +12% Growth</div>
              </div>
              <div class="saas-metric-card">
                <div class="saas-metric-label" data-i18n="mOccupancyLabel">OCCUPANCY RATE</div>
                <div class="saas-metric-value">94.2%</div>
                <div class="saas-metric-sub">▲ 80/85 Capacity</div>
              </div>
              <div class="saas-metric-card">
                <div class="saas-metric-label" data-i18n="mActiveStaff">ACTIVE STAFF</div>
                <div class="saas-metric-value">14 / 14</div>
                <div class="saas-metric-sub">✔ All Shifts Full</div>
              </div>
              <div class="saas-metric-card">
                <div class="saas-metric-label" data-i18n="mSatisfaction">FAMILY SATISFACTION</div>
                <div class="saas-metric-value">98.4%</div>
                <div class="saas-metric-sub">⭐ 4.9 / 5 Rating</div>
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1.6fr 1fr; gap:24px;">
              <div style="background:var(--bg-surface); border:1px solid var(--border-color); border-radius:16px; padding:24px; box-shadow:var(--shadow-sm);">
                <h4 style="font-size:16.5px; font-weight:800; margin-bottom:14px; color:var(--text-primary);" data-i18n="mgrReportsTitle">📊 Facility Financial & Operational Reports</h4>
                <p style="font-size:13.5px; color:var(--text-secondary); margin-bottom:16px;" data-i18n="mgrReportsDesc">Export monthly billing, occupancy reports, and staff logs:</p>
                <div style="display:flex; gap:12px;">
                  <button onclick="showToast('success', '📄 PDF Report Generated!');" style="background:var(--brand-amber); color:white; font-weight:700; padding:10px 18px; border:none; border-radius:8px; cursor:pointer;" data-i18n="btnExportPdf">Export PDF Report 📄</button>
                  <button onclick="showToast('info', '📱 Mass Announcement Sent!');" style="background:var(--bg-subtle); border:1px solid var(--border-color); color:var(--text-primary); font-weight:700; padding:10px 18px; border-radius:8px; cursor:pointer;" data-i18n="btnMassSms">Send Mass Announcement 📱</button>
                </div>
              </div>

              <div style="background:var(--bg-surface); border:1px solid var(--border-color); border-radius:16px; padding:24px; box-shadow:var(--shadow-sm);">
                <h4 style="font-size:16.5px; font-weight:800; margin-bottom:14px; color:var(--text-primary);" data-i18n="staffStatusTitle">👥 Staff Shift Status</h4>
                <div style="display:flex; flex-direction:column; gap:8px; font-size:13px;">
                  <div style="display:flex; justify-content:space-between; padding:8px; background:var(--bg-subtle); border-radius:6px;">
                    <span>Melis Öğretmen (KinderLog)</span>
                    <span style="color:#047857; font-weight:700;">● Active</span>
                  </div>
                  <div style="display:flex; justify-content:space-between; padding:8px; background:var(--bg-subtle); border-radius:6px;">
                    <span>Nurse Ayşe (CareLog)</span>
                    <span style="color:#047857; font-weight:700;">● Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>`;

html = html.replace(oldSaasContent, newSaasContent);

// Add data-i18n tags on sidebar & topbar exit buttons
html = html.replace(
  '🚪 Exit App to Landing Page',
  '<span data-i18n="btnExitApp">🚪 Exit App to Landing Page</span>'
);
html = html.replace(
  'Landing Page ➜',
  '<span data-i18n="btnLandingPage">Landing Page ➜</span>'
);

// Update launchDedicatedRoleApp to apply current language immediately on workspace switch
const oldLaunchApp = `function launchDedicatedRoleApp(roleKey) {
      closeRoleGatewayModal();
      document.getElementById('view-landing').style.display = 'none';
      document.getElementById('view-app-dashboard').style.display = 'block';

      document.getElementById('role-workspace-ogretmen').style.display = 'none';
      document.getElementById('role-workspace-carelog').style.display = 'none';
      document.getElementById('role-workspace-veli').style.display = 'none';
      document.getElementById('role-workspace-yonetici').style.display = 'none';

      const userMap = {
        ogretmen: { name: 'Melis Öğretmen', role: '🏫 Teacher Portal', avatar: 'M', workspaceId: 'role-workspace-ogretmen' },
        carelog: { name: 'Nurse Ayşe', role: '👵 CareLog Infirmary', avatar: 'A', workspaceId: 'role-workspace-carelog' },
        veli: { name: 'Ahmet Yılmaz', role: '👨‍👩‍👧 Family Feed', avatar: 'V', workspaceId: 'role-workspace-veli' },
        yonetici: { name: 'Ayşe Hanım', role: '📊 Manager Panel', avatar: 'Y', workspaceId: 'role-workspace-yonetici' }
      };

      const u = userMap[roleKey] || userMap.ogretmen;
      document.getElementById('saas-profile-name').innerText = u.name;
      document.getElementById('saas-profile-role').innerText = \`● \${u.role}\`;
      document.getElementById('saas-avatar').innerText = u.avatar;
      document.getElementById('saas-topbar-title').innerText = \`\${u.role} — Live Workspace\`;

      const targetWorkspace = document.getElementById(u.workspaceId);
      if (targetWorkspace) targetWorkspace.style.display = 'block';

      showToast('success', \`🚀 Logged in to \${u.name} workspace!\`);
    }`;

const newLaunchApp = `function launchDedicatedRoleApp(roleKey) {
      closeRoleGatewayModal();
      document.getElementById('view-landing').style.display = 'none';
      document.getElementById('view-app-dashboard').style.display = 'block';

      document.getElementById('role-workspace-ogretmen').style.display = 'none';
      document.getElementById('role-workspace-carelog').style.display = 'none';
      document.getElementById('role-workspace-veli').style.display = 'none';
      document.getElementById('role-workspace-yonetici').style.display = 'none';

      const roleTitles = {
        en: { ogretmen: '🏫 Teacher Portal', carelog: '👵 CareLog Infirmary', veli: '👨‍👩‍👧 Family Feed', yonetici: '📊 Manager Panel' },
        tr: { ogretmen: '🏫 Öğretmen Portalı', carelog: '👵 CareLog Revir & Bakıcı', veli: '👨‍👩‍👧 Veli / Aile Akışı', yonetici: '📊 Kurum Yöneticisi' },
        es: { ogretmen: '🏫 Portal del Profesor', carelog: '👵 Enfermero CareLog', veli: '👨‍👩‍👧 Feed Familiar', yonetici: '📊 Director del Centro' },
        zh: { ogretmen: '🏫 教师门户', carelog: '👵 CareLog 护理人员', veli: '👨‍👩‍👧 家长/家庭动态', yonetici: '📊 机构管理者' }
      };

      const tDict = roleTitles[currentLangKey] || roleTitles.en;

      const userMap = {
        ogretmen: { name: currentLangKey === 'tr' ? 'Melis Öğretmen' : 'Teacher Melis', role: tDict.ogretmen, avatar: 'M', workspaceId: 'role-workspace-ogretmen' },
        carelog: { name: currentLangKey === 'tr' ? 'Hemşire Ayşe' : 'Nurse Ayşe', role: tDict.carelog, avatar: 'A', workspaceId: 'role-workspace-carelog' },
        veli: { name: currentLangKey === 'tr' ? 'Ahmet Yılmaz (Veli)' : 'Ahmet Yılmaz (Parent)', role: tDict.veli, avatar: 'V', workspaceId: 'role-workspace-veli' },
        yonetici: { name: currentLangKey === 'tr' ? 'Ayşe Hanım (Müdür)' : 'Ayşe Hanım (Manager)', role: tDict.yonetici, avatar: 'Y', workspaceId: 'role-workspace-yonetici' }
      };

      const u = userMap[roleKey] || userMap.ogretmen;
      document.getElementById('saas-profile-name').innerText = u.name;
      document.getElementById('saas-profile-role').innerText = \`● \${u.role}\`;
      document.getElementById('saas-avatar').innerText = u.avatar;
      document.getElementById('saas-topbar-title').innerText = \`\${u.role} — Live Workspace\`;

      const targetWorkspace = document.getElementById(u.workspaceId);
      if (targetWorkspace) targetWorkspace.style.display = 'block';

      // Apply full i18n translation
      setGlobalLang(currentLangKey);

      showToast('success', \`🚀 Logged in to \${u.name} workspace!\`);
    }`;

html = html.replace(oldLaunchApp, newLaunchApp);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully updated landing-page.html with rich SaaS widgets and full i18n binding!');
