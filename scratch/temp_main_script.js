
    // KinderLog & CareLog Main JS Controls
    function toggleLangDropdown() {
      const menu = document.getElementById('lang-menu');
      if (menu) menu.classList.toggle('hidden');
    }

    function selectGlobalLang(lang) {
      if (window.setGlobalLang) {
        window.setGlobalLang(lang);
      }
      const flagMap = { en: '🇺🇸', tr: '🇹🇷', es: '🇪🇸', zh: '🇨🇳' };
      const labelMap = { en: 'EN', tr: 'TR', es: 'ES', zh: 'ZH' };
      const flagEl = document.getElementById('lang-btn-flag');
      const labelEl = document.getElementById('lang-btn-label');
      if (flagEl && flagMap[lang]) flagEl.innerText = flagMap[lang];
      if (labelEl && labelMap[lang]) labelEl.innerText = labelMap[lang];
      const menu = document.getElementById('lang-menu');
      if (menu) menu.classList.add('hidden');
    }

    function openRoleGatewayModal() {
      const modal = document.getElementById('modal-role-gateway');
      if (modal) {
        modal.style.display = 'flex';
        modal.classList.remove('hidden');
      }
    }

    function closeRoleGatewayModal() {
      const modal = document.getElementById('modal-role-gateway');
      if (modal) {
        modal.style.display = 'none';
        modal.classList.add('hidden');
      }
    }

    function launchDedicatedRoleApp(roleKey) {
      closeRoleGatewayModal();
      const landing = document.getElementById('view-landing');
      const app = document.getElementById('view-app-dashboard');
      if (landing) landing.style.display = 'none';
      if (app) app.style.display = 'flex';
      
      if (window.switchAppRole) {
        window.switchAppRole(roleKey);
      }
    }

    function exitSaaSApp() {
      const landing = document.getElementById('view-landing');
      const app = document.getElementById('view-app-dashboard');
      if (landing) landing.style.display = 'block';
      if (app) app.style.display = 'none';
    }

    function openLegalModal(type) {
      const modal = document.getElementById('legalModal');
      const title = document.getElementById('legalModalTitle');
      const body = document.getElementById('legalModalBody');
      if (!modal) return;

      if (type === 'privacy') {
        if (title) title.innerText = 'Gizlilik Politikası (Privacy Policy)';
        if (body) body.innerText = 'KinderLog & CareLog olarak kişisel verilerinizin güvenliği en yüksek önceliğimizdir. Verileriniz 256-bit SSL şifreleme ile korunmaktadır.';
      } else if (type === 'kvkk') {
        if (title) title.innerText = 'KVKK Aydınlatma Metni';
        if (body) body.innerText = '6698 Sayılı Kişisel Verilerin Korunması Kanunu uyarınca verileriniz yalnızca yetkili kurum personeli ve veliler ile paylaşılmaktadır.';
      } else if (type === 'cookies') {
        if (title) title.innerText = 'Çerez Politikası (Cookie Policy)';
        if (body) body.innerText = 'Kullanıcı deneyiminizi iyileştirmek için zorunlu ve analitik çerezler kullanılmaktadır.';
      }

      modal.style.display = 'flex';
      modal.classList.remove('hidden');
    }

    function closeLegalModal() {
      const modal = document.getElementById('legalModal');
      if (modal) {
        modal.style.display = 'none';
        modal.classList.add('hidden');
      }
    }

    document.addEventListener('DOMContentLoaded', function() {
      if (window.lucide) lucide.createIcons();

      const heroVideo = document.getElementById('heroVideo');
      const toggleAudioBtn = document.getElementById('toggleAudioBtn');
      const togglePlayBtn = document.getElementById('togglePlayBtn');

      if (heroVideo && toggleAudioBtn) {
        toggleAudioBtn.addEventListener('click', function() {
          heroVideo.muted = !heroVideo.muted;
          toggleAudioBtn.innerHTML = heroVideo.muted ? '<i data-lucide="volume-x" class="w-4 h-4"></i>' : '<i data-lucide="volume-2" class="w-4 h-4"></i>';
          if (window.lucide) lucide.createIcons();
        });
      }

      if (heroVideo && togglePlayBtn) {
        togglePlayBtn.addEventListener('click', function() {
          if (heroVideo.paused) {
            heroVideo.play();
            togglePlayBtn.innerHTML = '<i data-lucide="pause" class="w-4 h-4"></i>';
          } else {
            heroVideo.pause();
            togglePlayBtn.innerHTML = '<i data-lucide="play" class="w-4 h-4"></i>';
          }
          if (window.lucide) lucide.createIcons();
        });
      }

      const openVideoModalBtn = document.getElementById('openVideoModal');
      const closeVideoModalBtn = document.getElementById('closeVideoModal');
      const videoModal = document.getElementById('videoModal');
      const modalVideo = document.getElementById('modalVideo');

      if (openVideoModalBtn && videoModal && modalVideo) {
        openVideoModalBtn.addEventListener('click', function() {
          videoModal.classList.remove('hidden');
          modalVideo.play();
        });
      }

      if (closeVideoModalBtn && videoModal && modalVideo) {
        closeVideoModalBtn.addEventListener('click', function() {
          videoModal.classList.add('hidden');
          modalVideo.pause();
        });
      }

      if (videoModal && modalVideo) {
        videoModal.addEventListener('click', function(e) {
          if (e.target === videoModal) {
            videoModal.classList.add('hidden');
            modalVideo.pause();
          }
        });
      }

      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
          mobileMenu.classList.toggle('hidden');
          mobileMenu.classList.toggle('flex');
        });
      }
    });
  
// ROLE DASHBOARD SWITCHER & FORM HANDLERS
    window.switchAppRole = function(roleKey) {
      const panes = document.querySelectorAll('.role-workspace-pane');
      panes.forEach(pane => {
        pane.classList.add('hidden');
        pane.style.display = 'none';
      });

      const targetPane = document.getElementById('role-workspace-' + roleKey);
      if (targetPane) {
        targetPane.classList.remove('hidden');
        targetPane.style.display = 'block';
      }

      const avatarEl = document.getElementById('saas-avatar');
      const nameEl = document.getElementById('saas-profile-name');
      const roleEl = document.getElementById('saas-profile-role');
      const titleEl = document.getElementById('saas-topbar-title');

      if (roleKey === 'ogretmen') {
        if (avatarEl) avatarEl.innerText = 'M';
        if (nameEl) nameEl.innerText = 'Melis Öğretmen';
        if (roleEl) roleEl.innerText = '🏫 Öğretmen Portalı';
        if (titleEl) titleEl.innerHTML = '🏫 Öğretmen Portalı — Sınıf Takibi & Günlük Akış';
      } else if (roleKey === 'carelog') {
        if (avatarEl) avatarEl.innerText = 'S';
        if (nameEl) nameEl.innerText = 'Hemşire Selin';
        if (roleEl) roleEl.innerText = '👵 CareLog Revir & Bakıcı';
        if (titleEl) titleEl.innerHTML = '👵 CareLog Revir & Bakıcı — Vital & İlaç Takibi';
      } else if (roleKey === 'veli') {
        if (avatarEl) avatarEl.innerText = 'A';
        if (nameEl) nameEl.innerText = 'Ayşe Yılmaz (Veli)';
        if (roleEl) roleEl.innerText = '💬 Veli / Aile Akışı';
        if (titleEl) titleEl.innerHTML = '💬 Veli / Aile Akışı — Anlık Şeffaf Günlük Raporlar';
      } else if (roleKey === 'yonetici') {
        if (avatarEl) avatarEl.innerText = 'K';
        if (nameEl) nameEl.innerText = 'Kemal Bey (Kurum Müdürü)';
        if (roleEl) roleEl.innerText = '📊 Kurum Yöneticisi';
        if (titleEl) titleEl.innerHTML = '📊 Kurum Yöneticisi — Genel Finans & Performans';
      }

      if (window.lucide) lucide.createIcons();
      showToast('Canlı Çalışma Alanı Değiştirildi: ' + (nameEl ? nameEl.innerText : roleKey));
    };

    function showToast(message) {
      let toast = document.getElementById('global-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'global-toast';
        toast.className = 'fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-400/50 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2 transition-all duration-300 transform translate-y-10 opacity-0';
        document.body.appendChild(toast);
      }
      toast.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>' + message;
      toast.classList.remove('translate-y-10', 'opacity-0');
      setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
      }, 3000);
    }

    function handleTeacherActivitySubmit(e) {
      e.preventDefault();
      const student = document.getElementById('teacher-student-select').value;
      const type = document.getElementById('teacher-activity-type').value;
      const note = document.getElementById('teacher-note-text').value || 'Aktivite tamamlandı.';

      const tbody = document.getElementById('table-teacher-log');
      if (tbody) {
        const tr = document.createElement('tr');
        const now = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
        tr.innerHTML = `
          <td class="py-3 px-3 font-bold text-white">${student}</td>
          <td class="py-3 px-3 text-emerald-400">✨ ${type}</td>
          <td class="py-3 px-3 text-slate-400">${now}</td>
          <td class="py-3 px-3"><span class="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold">Kaydedildi</span></td>
          <td class="py-3 px-3 text-right"><button onclick="notifyParent('${student}')" class="text-xs text-emerald-400 hover:underline">Bildirim Gönder</button></td>
        `;
        tbody.insertBefore(tr, tbody.firstChild);
      }

      showToast(`✅ ${student} için ${type} kaydı eklendi ve veliye bildirildi!`);
      document.getElementById('teacher-note-text').value = '';
    }

    function handleNurseVitalSubmit(e) {
      e.preventDefault();
      const resident = document.getElementById('nurse-resident-select').value;
      const bp = document.getElementById('nurse-bp-input').value || '120/80';
      const pulse = document.getElementById('nurse-pulse-input').value || '75';

      const tbody = document.getElementById('table-nurse-log');
      if (tbody) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="py-3 px-3 font-bold text-white">${resident}</td>
          <td class="py-3 px-3 text-teal-400">${bp} mmHg</td>
          <td class="py-3 px-3 text-slate-300">${pulse} bpm</td>
          <td class="py-3 px-3"><span class="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold">Kaydedildi</span></td>
          <td class="py-3 px-3 text-right"><button onclick="notifyDoctor('${resident}')" class="text-xs text-teal-400 hover:underline">Doktora İlet</button></td>
        `;
        tbody.insertBefore(tr, tbody.firstChild);
      }

      showToast(`✅ ${resident} vital değerleri revir defterine kaydedildi!`);
      document.getElementById('nurse-bp-input').value = '';
      document.getElementById('nurse-pulse-input').value = '';
      document.getElementById('nurse-note-input').value = '';
    }

    function handleParentNoteSubmit(e) {
      e.preventDefault();
      const note = document.getElementById('parent-note-text').value;
      if (!note) return;

      const timeline = document.getElementById('stream-parent-timeline');
      if (timeline) {
        const div = document.createElement('div');
        const now = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
        div.className = 'p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3';
        div.innerHTML = `
          <div class="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
            <i data-lucide="message-square" class="w-4 h-4"></i>
          </div>
          <div class="flex-1 text-xs">
            <div class="flex items-center justify-between">
              <span class="font-bold text-white">Veli Notu Gönderildi</span>
              <span class="text-slate-400 text-[10px]">${now}</span>
            </div>
            <p class="text-slate-300 mt-1">${note}</p>
          </div>
        `;
        timeline.insertBefore(div, timeline.firstChild);
      }

      showToast('📩 Notunuz okula başarıyla iletildi!');
      document.getElementById('parent-note-text').value = '';
      if (window.lucide) lucide.createIcons();
    }

    function handleDirectorRegisterSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('director-name-input').value;
      const cls = document.getElementById('director-class-input').value;
      const fee = document.getElementById('director-fee-input').value;

      const tbody = document.getElementById('table-director-log');
      if (tbody) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="py-3 px-3 font-bold text-white">${name}</td>
          <td class="py-3 px-3 text-slate-300">${cls}</td>
          <td class="py-3 px-3 text-amber-400">₺${fee}</td>
          <td class="py-3 px-3"><span class="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold">Kayıtlı</span></td>
          <td class="py-3 px-3 text-right"><button onclick="sendReceipt('${name}')" class="text-xs text-amber-400 hover:underline">Makbuz Gönder</button></td>
        `;
        tbody.insertBefore(tr, tbody.firstChild);
      }

      showToast(`🎉 ${name} kuruma başarıyla kaydedildi!`);
      document.getElementById('director-name-input').value = '';
      document.getElementById('director-class-input').value = '';
      document.getElementById('director-fee-input').value = '';
    }

    function notifyParent(student) {
      showToast(`📲 ${student} velisine WhatsApp ve SMS bildirimi gönderildi!`);
    }

    function notifyDoctor(resident) {
      showToast(`🩺 ${resident} vital verileri sorumlu doktora e-posta ile iletildi!`);
    }

    function sendReceipt(name) {
      showToast(`🧾 ${name} için dijital tahsilat makbuzu oluşturuldu!`);
    }
  
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
  
// DEMO LOGIN QUERY & LOGOUT HANDLERS
    function selectDemoAccount(roleKey) {
      const emailInput = document.getElementById('login-email-input');
      const passInput = document.getElementById('login-password-input');
      const roleHidden = document.getElementById('login-selected-role');

      if (roleHidden) roleHidden.value = roleKey;

      if (roleKey === 'ogretmen') {
        if (emailInput) emailInput.value = 'ogretmen@kinderlog.com';
        if (passInput) passInput.value = 'demo123';
      } else if (roleKey === 'carelog') {
        if (emailInput) emailInput.value = 'hemsire@carelog.com';
        if (passInput) passInput.value = 'demo123';
      } else if (roleKey === 'veli') {
        if (emailInput) emailInput.value = 'veli@kinderlog.com';
        if (passInput) passInput.value = 'demo123';
      } else if (roleKey === 'yonetici') {
        if (emailInput) emailInput.value = 'mudur@kinderlog.com';
        if (passInput) passInput.value = 'demo123';
      }
      showToast('Demo hesap seçildi: ' + (emailInput ? emailInput.value : roleKey));
    }

    function handleLoginQuerySubmit(e) {
      e.preventDefault();
      const email = document.getElementById('login-email-input').value;
      const pass = document.getElementById('login-password-input').value;
      const roleKey = document.getElementById('login-selected-role').value || 'ogretmen';

      if (!email || !pass) {
        showToast('❌ Lütfen geçerli e-posta ve şifre giriniz!');
        return;
      }

      showToast(`🔒 Giriş sorgulandı... Doğrulama Başarılı! (${email})`);
      closeRoleGatewayModal();

      setTimeout(() => {
        launchDedicatedRoleApp(roleKey);
      }, 400);
    }

    function exitSaaSApp() {
      const landing = document.getElementById('view-landing');
      const app = document.getElementById('view-app-dashboard');
      if (landing) landing.style.display = 'block';
      if (app) app.style.display = 'none';
      showToast('🚪 Oturum kapatıldı, Ana Sayfaya yönlendirildiniz.');
    }
  