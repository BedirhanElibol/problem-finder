import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Implementing Role Switcher and Form Handlers in JS...")

role_switch_js = '''
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
'''

# Find last </script> in html and insert role_switch_js before it
end_script_idx = html.rfind('</script>')
if end_script_idx != -1:
    html = html[:end_script_idx] + '\n' + role_switch_js.strip() + '\n  </script>\n</html>'
    print("Inserted role switcher and form handlers in main script block!")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Saved complete JS handlers!")
