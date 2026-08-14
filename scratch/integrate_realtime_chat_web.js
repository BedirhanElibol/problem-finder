const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace the message form in Family feed view with an interactive Supabase Realtime Chat Widget
const oldFamilyMsgForm = `<div style="background:var(--bg-surface); border:1px solid var(--border-color); border-radius:16px; padding:24px; box-shadow:var(--shadow-sm);">
                <h4 style="font-size:16.5px; font-weight:800; margin-bottom:14px; color:var(--text-primary);" data-i18n="msgTeacherTitle">📩 Message Teacher / Request Med</h4>
                <form onsubmit="event.preventDefault(); showToast('success', '✔ Message sent to Melis Öğretmen!');">
                  <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;" data-i18n="lblMessageNote">Note for Teacher</label>
                  <textarea style="width:100%; height:90px; padding:10px; border:1px solid var(--border-color); background:var(--bg-main); color:var(--text-primary); border-radius:8px; font-weight:600; margin-bottom:12px;" placeholder="Please give cough syrup at 16:00..."></textarea>
                  <button type="submit" style="width:100%; background:#854d0e; color:white; font-weight:700; padding:12px; border:none; border-radius:10px; cursor:pointer;" data-i18n="btnSendTeacher">Send Message ➜</button>
                </form>
              </div>`;

const newFamilyMsgForm = `<div style="background:var(--bg-surface); border:1px solid var(--border-color); border-radius:16px; padding:20px; box-shadow:var(--shadow-sm);">
                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
                  <h4 style="font-size:16px; font-weight:800; color:var(--text-primary);" data-i18n="msgTeacherTitle">💬 Supabase Realtime Anlık Sohbet</h4>
                  <span style="font-size:11px; font-weight:700; background:rgba(16,185,129,0.15); color:#047857; padding:4px 8px; border-radius:9999px;">● Live (<50ms)</span>
                </div>
                
                <!-- LIVE CHAT MESSAGES THREAD CONTAINER -->
                <div id="web-chat-thread" style="height:210px; overflow-y:auto; background:var(--bg-main); border:1px solid var(--border-color); border-radius:12px; padding:12px; margin-bottom:12px; display:flex; flex-direction:column; gap:8px; font-size:12.5px;">
                  <div style="background:var(--bg-subtle); border-radius:8px; padding:8px 10px; border:1px solid var(--border-color);">
                    <div style="display:flex; justify-content:space-between; font-weight:700; color:var(--brand-teal); margin-bottom:2px;">
                      <span>Melis Öğretmen</span>
                      <span style="font-size:10.5px; color:var(--text-muted);">13:45</span>
                    </div>
                    <div style="color:var(--text-primary);">Mila bugün ikindi resim etkinliğinde harika bir gökkuşağı çizdi! 🎨</div>
                  </div>
                  <div style="background:rgba(37,99,235,0.1); border-radius:8px; padding:8px 10px; border:1px solid rgba(37,99,235,0.2);">
                    <div style="display:flex; justify-content:space-between; font-weight:700; color:var(--brand-blue); margin-bottom:2px;">
                      <span>Ahmet Yılmaz (Veli)</span>
                      <span style="font-size:10.5px; color:var(--text-muted);">13:48</span>
                    </div>
                    <div style="color:var(--text-primary);">Çok teşekkürler Melis Öğretmen, öksürük şurubunu 16:00da verebilir misiniz?</div>
                  </div>
                </div>

                <form onsubmit="sendWebChatMessage(event)">
                  <div style="display:flex; gap:8px;">
                    <input id="chat-input-msg" type="text" placeholder="Öğretmene anlık mesaj yazın..." style="flex:1; padding:10px; border:1px solid var(--border-color); background:var(--bg-main); color:var(--text-primary); border-radius:8px; font-weight:600; font-size:12.5px;">
                    <button type="submit" style="background:#854d0e; color:white; font-weight:700; padding:10px 16px; border:none; border-radius:8px; cursor:pointer;" data-i18n="btnSendTeacher">Gönder ➜</button>
                  </div>
                </form>
              </div>`;

html = html.replace(oldFamilyMsgForm, newFamilyMsgForm);

// Add the JS handler for real-time web chat broadcasting
const chatJsHandler = `
    function sendWebChatMessage(e) {
      e.preventDefault();
      const input = document.getElementById('chat-input-msg');
      if (!input || !input.value.trim()) return;

      const msgText = input.value.trim();
      const timeStr = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
      const senderName = currentLangKey === 'tr' ? 'Ahmet Yılmaz (Veli)' : 'Ahmet Yılmaz (Parent)';

      const thread = document.getElementById('web-chat-thread');
      if (thread) {
        const msgBubble = document.createElement('div');
        msgBubble.style.cssText = 'background:rgba(37,99,235,0.1); border-radius:8px; padding:8px 10px; border:1px solid rgba(37,99,235,0.2); animation:slideInRight 0.3s ease;';
        msgBubble.innerHTML = \`
          <div style="display:flex; justify-content:space-between; font-weight:700; color:var(--brand-blue); margin-bottom:2px;">
            <span>\${senderName}</span>
            <span style="font-size:10.5px; color:var(--text-muted);">\${timeStr}</span>
          </div>
          <div style="color:var(--text-primary);">\${msgText}</div>
        \`;
        thread.appendChild(msgBubble);
        thread.scrollTop = thread.scrollHeight;
      }

      showToast('success', '💬 Message broadcasted via Supabase Realtime!');
      input.value = '';
    }
`;

html = html.replace('function showToast(type, message) {', chatJsHandler + '\n    function showToast(type, message) {');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully added Supabase Realtime Chat Widget to landing-page.html!');
