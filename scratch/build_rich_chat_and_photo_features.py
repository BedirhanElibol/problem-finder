import os
import re

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Upgrading workspace with Photo Upload, Live Chat & Feature Tabs...")

# 1. Update Sidebar Navigation with Feature Tabs
old_sidebar_ul = '''<ul style="list-style:none; padding:0 12px; margin-top:8px;">
          <li style="background:var(--brand-teal); border-radius:10px;"><a href="#" onclick="event.preventDefault();" style="color:white; padding:12px; display:block; text-decoration:none; font-weight:700;">&#128202; Live Workspace</a></li>
        </ul>'''

new_sidebar_ul = '''
        <div class="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">ÖZELLİK MODÜLLERİ</div>
        <ul class="space-y-1 px-3">
          <li>
            <button onclick="switchWorkspaceTab('defter')" id="tab-btn-defter" class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-2.5 transition-colors cursor-pointer">
              <i data-lucide="layout-dashboard" class="w-4 h-4"></i> Günlük Defter & Akış
            </button>
          </li>
          <li>
            <button onclick="switchWorkspaceTab('fotograf')" id="tab-btn-fotograf" class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:bg-white/10 flex items-center gap-2.5 transition-colors cursor-pointer">
              <i data-lucide="camera" class="w-4 h-4 text-emerald-400"></i> Fotoğraf Galerisi
            </button>
          </li>
          <li>
            <button onclick="switchWorkspaceTab('mesaj')" id="tab-btn-mesaj" class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:bg-white/10 flex items-center justify-between transition-colors cursor-pointer">
              <div class="flex items-center gap-2.5">
                <i data-lucide="message-square" class="w-4 h-4 text-blue-400"></i> Anlık Mesajlaşma
              </div>
              <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            </button>
          </li>
          <li>
            <button onclick="switchWorkspaceTab('ilac')" id="tab-btn-ilac" class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:bg-white/10 flex items-center gap-2.5 transition-colors cursor-pointer">
              <i data-lucide="pill" class="w-4 h-4 text-amber-400"></i> İlaç Takvimi & Onay
            </button>
          </li>
        </ul>
'''

if old_sidebar_ul in html:
    html = html.replace(old_sidebar_ul, new_sidebar_ul.strip())

# 2. Add Photo Upload Field & Live Photo Feed + Chat Panel inside saas-workspace-content
extra_modals_html = '''
          <!-- MODULE 2: PHOTO GALLERY TAB -->
          <div id="tab-pane-fotograf" class="tab-pane-content space-y-6 hidden">
            <div class="clean-glass-card p-6 border border-white/15 space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <h3 class="font-heading font-extrabold text-xl text-white flex items-center gap-2">
                    <i data-lucide="camera" class="w-5 h-5 text-emerald-400"></i>
                    <span>Sınıf & Sakin Canlı Fotoğraf Galerisi</span>
                  </h3>
                  <p class="text-xs text-slate-300">Veliler ve yöneticiler için anlık güvenli fotoğraf akışı</p>
                </div>
                <button onclick="triggerPhotoUpload()" class="clean-btn-primary px-4 py-2 rounded-xl text-xs font-extrabold uppercase flex items-center gap-2 cursor-pointer">
                  <i data-lucide="upload" class="w-4 h-4"></i>
                  <span>Yeni Fotoğraf Yükle</span>
                </button>
              </div>

              <!-- PHOTO GRID -->
              <div id="gallery-photo-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                <div class="clean-glass-card overflow-hidden border border-white/15 group">
                  <div class="h-44 bg-slate-800 relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80" alt="Resim Saati" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                    <span class="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-400/30">11:15</span>
                  </div>
                  <div class="p-4 space-y-1">
                    <div class="text-xs font-bold text-white">🎨 Resim & Oyun Saati</div>
                    <div class="text-[11px] text-slate-300">Mila ve arkadaşları sulu boya etkinliğinde.</div>
                  </div>
                </div>

                <div class="clean-glass-card overflow-hidden border border-white/15 group">
                  <div class="h-44 bg-slate-800 relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80" alt="Öğle Yemeği" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                    <span class="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-400/30">12:40</span>
                  </div>
                  <div class="p-4 space-y-1">
                    <div class="text-xs font-bold text-white">🍲 Öğle Yemeği Paylaşımı</div>
                    <div class="text-[11px] text-slate-300">Organik sebze çorbası ve meyve saati.</div>
                  </div>
                </div>

                <div class="clean-glass-card overflow-hidden border border-white/15 group">
                  <div class="h-44 bg-slate-800 relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80" alt="Bahçe Aktivitesi" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                    <span class="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-400/30">14:00</span>
                  </div>
                  <div class="p-4 space-y-1">
                    <div class="text-xs font-bold text-white">🌿 Bahçe & Çim Saati</div>
                    <div class="text-[11px] text-slate-300">Hava açık, açık alanda fiziksel egzersiz yapıldı.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- MODULE 3: REALTIME CHAT TAB -->
          <div id="tab-pane-mesaj" class="tab-pane-content space-y-6 hidden">
            <div class="clean-glass-card p-6 border border-white/15 space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-white/10">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <i data-lucide="message-square" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h3 class="font-heading font-extrabold text-lg text-white">💬 Anlık İletişim & Mesajlaşma Merkezi</h3>
                    <p class="text-xs text-blue-400 font-semibold">● Çevrimiçi: Melis Öğretmen & Ayşe Hanım (Veli)</p>
                  </div>
                </div>
                <span class="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">256-BIT SSL GÜVENLİ SOHBET</span>
              </div>

              <!-- CHAT BOX MESSAGES -->
              <div id="chat-messages-container" class="h-72 overflow-y-auto space-y-3 p-4 rounded-2xl bg-slate-900/60 border border-white/10">
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">M</div>
                  <div class="bg-white/10 border border-white/10 p-3 rounded-2xl max-w-md text-xs">
                    <div class="font-bold text-emerald-400 mb-0.5">Melis Öğretmen <span class="text-[10px] text-slate-400 font-normal ml-2">12:45</span></div>
                    <p class="text-slate-200">Merhaba Ayşe Hanım, Mila öğle yemeğini tamamen bitirdi, bilgisi olsun 😊</p>
                  </div>
                </div>

                <div class="flex items-start gap-3 justify-end">
                  <div class="bg-blue-600/30 border border-blue-500/40 p-3 rounded-2xl max-w-md text-xs">
                    <div class="font-bold text-blue-300 mb-0.5">Ayşe Hanım (Veli) <span class="text-[10px] text-slate-400 font-normal ml-2">12:48</span></div>
                    <p class="text-slate-100">Harika haber öğretmenim! Çok teşekkür ederiz, saat 16:30'da almaya geleceğiz.</p>
                  </div>
                  <div class="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">A</div>
                </div>
              </div>

              <!-- QUICK CHIP REPLIES & CHAT INPUT FORM -->
              <div class="space-y-3">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-[10px] font-bold text-slate-400 uppercase">Hızlı Yanıtlar:</span>
                  <button onclick="sendQuickChatMessage('Yemeğini yedi mi?')" class="clean-btn-glass px-2.5 py-1 rounded-full text-[11px] text-slate-200 hover:text-white cursor-pointer">Yemeğini yedi mi?</button>
                  <button onclick="sendQuickChatMessage('İlacı verildi mi?')" class="clean-btn-glass px-2.5 py-1 rounded-full text-[11px] text-slate-200 hover:text-white cursor-pointer">İlacı verildi mi?</button>
                  <button onclick="sendQuickChatMessage('Teşekkürler öğretmenim!')" class="clean-btn-glass px-2.5 py-1 rounded-full text-[11px] text-slate-200 hover:text-white cursor-pointer">Teşekkürler öğretmenim!</button>
                </div>

                <form onsubmit="handleLiveChatSend(event)" class="flex items-center gap-3">
                  <input type="text" id="live-chat-input" placeholder="Mesajınızı yazın..." class="flex-1 bg-slate-900/80 border border-white/20 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none">
                  <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-extrabold px-6 py-3 rounded-xl text-xs uppercase flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20 transition-all">
                    <i data-lucide="send" class="w-4 h-4"></i>
                    <span>Gönder</span>
                  </button>
                </form>
              </div>
            </div>
          </div>

          <!-- MODULE 4: MEDICATION SCHEDULER TAB -->
          <div id="tab-pane-ilac" class="tab-pane-content space-y-6 hidden">
            <div class="clean-glass-card p-6 border border-white/15 space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 class="font-heading font-extrabold text-lg text-white flex items-center gap-2">
                  <i data-lucide="pill" class="w-5 h-5 text-amber-400"></i>
                  <span>💊 İlaç Takvimi & Onay Listesi</span>
                </h3>
                <span class="text-xs text-slate-400">Bugünün Dozları</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div class="space-y-1">
                    <div class="font-bold text-white text-xs">Mila Yılmaz — Öksürük Şurubu</div>
                    <div class="text-[11px] text-amber-400 font-semibold">Saat: 14:30 (1 Ölçek)</div>
                    <div class="text-[10px] text-slate-400">Veli Onayı: Tamamlandı (10:15)</div>
                  </div>
                  <button onclick="confirmMedication('Mila Yılmaz')" class="clean-btn-primary px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer">Verildi İşaretle</button>
                </div>

                <div class="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div class="space-y-1">
                    <div class="font-bold text-white text-xs">Ayşe Teyze — Tansiyon İlacı</div>
                    <div class="text-[11px] text-teal-400 font-semibold">Saat: 15:00 (1 Tablet)</div>
                    <div class="text-[10px] text-slate-400">Revir Onayı: Hemşire Selin</div>
                  </div>
                  <button onclick="confirmMedication('Ayşe Teyze')" class="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer">Verildi İşaretle</button>
                </div>
              </div>
            </div>
          </div>
'''

# Find end of role-workspace-yonetici div and insert extra_modals_html before </div> (end of saas-workspace-content)
target_insert = '<!-- ROLE 4: FACILITY DIRECTOR WORKSPACE (YONETICI) -->'
if target_insert in html:
    end_yonetici_idx = html.find('</div>', html.find(target_insert))
    # Find closing div of workspace content
    next_div_end = html.find('</div>', html.find('</div>', end_yonetici_idx) + 1)
    html = html[:next_div_end] + '\n' + extra_modals_html.strip() + '\n' + html[next_div_end:]
    print("Inserted Photo Gallery, Live Chat and Medication Scheduler tabs!")

# 3. Add JS Tab Switcher & Chat / Photo Handlers
js_handlers = '''
    // TAB SWITCHER & LIVE CHAT HANDLERS
    function switchWorkspaceTab(tabKey) {
      const tabPanes = document.querySelectorAll('.tab-pane-content');
      tabPanes.forEach(pane => pane.classList.add('hidden'));

      const defaultPane = document.getElementById('role-workspace-ogretmen');
      
      const targetPane = document.getElementById('tab-pane-' + tabKey);
      if (targetPane) {
        if (defaultPane && tabKey !== 'defter') defaultPane.classList.add('hidden');
        targetPane.classList.remove('hidden');
      } else if (tabKey === 'defter' && defaultPane) {
        defaultPane.classList.remove('hidden');
      }

      const tabs = ['defter', 'fotograf', 'mesaj', 'ilac'];
      tabs.forEach(t => {
        const btn = document.getElementById('tab-btn-' + t);
        if (btn) {
          if (t === tabKey) {
            btn.className = 'w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-2.5 transition-colors cursor-pointer';
          } else {
            btn.className = 'w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:bg-white/10 flex items-center gap-2.5 transition-colors cursor-pointer';
          }
        }
      });

      if (window.lucide) lucide.createIcons();
    }

    function triggerPhotoUpload() {
      const grid = document.getElementById('gallery-photo-grid');
      if (grid) {
        const now = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
        const card = document.createElement('div');
        card.className = 'clean-glass-card overflow-hidden border border-white/15 group';
        card.innerHTML = `
          <div class="h-44 bg-slate-800 relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80" alt="Yeni Fotoğraf" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            <span class="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-400/30">${now}</span>
          </div>
          <div class="p-4 space-y-1">
            <div class="text-xs font-bold text-white">📷 Yeni Sınıf Fotoğrafı</div>
            <div class="text-[11px] text-slate-300">Öğretmen tarafından yeni yüklendi.</div>
          </div>
        `;
        grid.insertBefore(card, grid.firstChild);
      }
      showToast('📷 Yeni fotoğraf başarıyla yüklendi ve galeriye eklendi!');
    }

    function handleLiveChatSend(e) {
      e.preventDefault();
      const input = document.getElementById('live-chat-input');
      const text = input ? input.value : '';
      if (!text) return;
      sendQuickChatMessage(text);
      if (input) input.value = '';
    }

    function sendQuickChatMessage(msgText) {
      const container = document.getElementById('chat-messages-container');
      if (container) {
        const now = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
        const div = document.createElement('div');
        div.className = 'flex items-start gap-3 justify-end';
        div.innerHTML = `
          <div class="bg-blue-600/30 border border-blue-500/40 p-3 rounded-2xl max-w-md text-xs">
            <div class="font-bold text-blue-300 mb-0.5">Siz (Veli / Öğretmen) <span class="text-[10px] text-slate-400 font-normal ml-2">${now}</span></div>
            <p class="text-slate-100">${msgText}</p>
          </div>
          <div class="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">S</div>
        `;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
      }
      showToast('💬 Mesajınız anında iletildi!');
    }

    function confirmMedication(name) {
      showToast(`💊 ${name} için ilaç saati onaylandı ve sistem defterine işlendi!`);
    }
'''

end_script_idx = html.rfind('</script>')
if end_script_idx != -1:
    html = html[:end_script_idx] + '\n' + js_handlers.strip() + '\n  </script>\n</html>'
    print("Inserted JS tab switcher, photo upload and live chat handlers!")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Saved clean upgrade with Photo Gallery, Live Chat & Feature Tabs!")
