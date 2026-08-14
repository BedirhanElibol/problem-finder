import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Building Demo Login Gateway Form in modal-role-gateway...")

demo_login_modal_html = '''
  <!-- ROLE & DEMO LOGIN GATEWAY MODAL -->
  <div id="modal-role-gateway" class="fixed inset-0 z-50 hidden flex items-center justify-center bg-black/85 backdrop-blur-2xl p-4 sm:p-6">
    <div class="relative w-full max-w-xl bg-[#091317] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      
      <!-- CLOSE BUTTON -->
      <button onclick="closeRoleGatewayModal()" class="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>

      <!-- MODAL HEADER -->
      <div class="space-y-1.5 text-center sm:text-left">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold uppercase tracking-wider">
          GÜVENLİ GİRİŞ & DEMO PORTALI
        </div>
        <h3 class="font-heading font-extrabold text-2xl text-white">
          Kullanıcı Girişi & Demo Portalı
        </h3>
        <p class="text-slate-300 text-xs sm:text-sm">
          Aşağıdaki hazır demo hesaplarını seçebilir veya giriş bilgilerinizi girebilirsiniz:
        </p>
      </div>

      <!-- QUICK DEMO CREDENTIAL CHIPS -->
      <div class="space-y-2">
        <label class="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Hızlı Demo Hesapları (Tek Tıkla Doldur):</label>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button type="button" onclick="selectDemoAccount('ogretmen')" class="clean-btn-glass p-2.5 rounded-xl text-left border border-white/15 hover:border-emerald-400 transition-all group cursor-pointer">
            <div class="text-xs font-bold text-white group-hover:text-emerald-400">🏫 Öğretmen</div>
            <div class="text-[10px] text-slate-400">ogretmen@kinderlog.com</div>
          </button>

          <button type="button" onclick="selectDemoAccount('carelog')" class="clean-btn-glass p-2.5 rounded-xl text-left border border-white/15 hover:border-teal-400 transition-all group cursor-pointer">
            <div class="text-xs font-bold text-white group-hover:text-teal-400">👵 Revir & Bakıcı</div>
            <div class="text-[10px] text-slate-400">hemsire@carelog.com</div>
          </button>

          <button type="button" onclick="selectDemoAccount('veli')" class="clean-btn-glass p-2.5 rounded-xl text-left border border-white/15 hover:border-blue-400 transition-all group cursor-pointer">
            <div class="text-xs font-bold text-white group-hover:text-blue-400">💬 Veli Akışı</div>
            <div class="text-[10px] text-slate-400">veli@kinderlog.com</div>
          </button>

          <button type="button" onclick="selectDemoAccount('yonetici')" class="clean-btn-glass p-2.5 rounded-xl text-left border border-white/15 hover:border-amber-400 transition-all group cursor-pointer">
            <div class="text-xs font-bold text-white group-hover:text-amber-400">📊 Yönetici</div>
            <div class="text-[10px] text-slate-400">mudur@kinderlog.com</div>
          </button>
        </div>
      </div>

      <!-- INTERACTIVE LOGIN QUERY FORM -->
      <form id="form-login-query" onsubmit="handleLoginQuerySubmit(event)" class="space-y-4 pt-2">
        <input type="hidden" id="login-selected-role" value="ogretmen">

        <div>
          <label class="block text-xs font-bold text-slate-300 mb-1">E-posta Adresi</label>
          <input type="email" id="login-email-input" value="ogretmen@kinderlog.com" required placeholder="ornek@kinderlog.com" class="w-full bg-slate-900/90 border border-white/20 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none font-medium">
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-300 mb-1">Giriş Şifresi</label>
          <input type="password" id="login-password-input" value="demo123" required placeholder="••••••••" class="w-full bg-slate-900/90 border border-white/20 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none font-medium">
        </div>

        <div class="flex items-center justify-between text-xs text-slate-300">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked class="rounded border-white/20 text-emerald-500 focus:ring-0">
            <span>Beni Hatırla (Demo Oturumu)</span>
          </label>
          <span class="text-emerald-400 hover:underline cursor-pointer">Şifremi Unuttum?</span>
        </div>

        <button type="submit" class="w-full clean-btn-primary py-3.5 rounded-xl text-xs font-extrabold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/25">
          <i data-lucide="log-in" class="w-4 h-4 text-white"></i>
          <span>Giriş Bilgilerini Doğrula & Portala Bağlan</span>
        </button>
      </form>
    </div>
  </div>
'''

modal_start = html.find('id="modal-role-gateway"')
if modal_start != -1:
    div_start = html.rfind('<div', 0, modal_start)
    div_end = html.find('<!-- VIEW 2', div_start)
    if div_end == -1:
        div_end = html.find('<div class="saas-layout"', div_start)
    
    html = html[:div_start] + demo_login_modal_html.strip() + '\n\n  ' + html[div_end:]
    print("Replaced modal-role-gateway with Demo Login Query Form!")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Saved Demo Login Form HTML!")
