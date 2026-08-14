import os
import re

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Replacing modal-role-gateway with Clean Glass Modal...")

clean_modal_html = '''
  <!-- ROLE GATEWAY MODAL (GİRİŞ MODALI) -->
  <div id="modal-role-gateway" class="fixed inset-0 z-50 hidden flex items-center justify-center bg-black/80 backdrop-blur-2xl p-4 sm:p-6">
    <div class="relative w-full max-w-xl bg-[#091317] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      
      <!-- CLOSE BUTTON -->
      <button onclick="closeRoleGatewayModal()" class="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>

      <!-- MODAL HEADER -->
      <div class="space-y-1.5">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold uppercase tracking-wider">
          PORTAL SEÇİMİ
        </div>
        <h3 class="font-heading font-extrabold text-2xl text-white" data-i18n="modalRoleTitle">
          Giriş Yapılacak Portalı Seçin
        </h3>
        <p class="text-slate-300 text-xs sm:text-sm" data-i18n="modalRoleSub">
          Rolünüze özel tasarlanmış canlı çalışma alanına tek tıkla bağlanın:
        </p>
      </div>

      <!-- 4 ROLE CARDS GRID -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        
        <!-- CARD 1: TEACHER -->
        <div onclick="launchDedicatedRoleApp('ogretmen')" class="clean-glass-card p-5 border border-white/15 hover:border-emerald-400 cursor-pointer group flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
            🏫
          </div>
          <div>
            <div class="font-heading font-extrabold text-base text-white group-hover:text-emerald-400 transition-colors" data-i18n="roleOgretmenTitle">
              Öğretmen Portalı
            </div>
            <div class="text-[11px] font-medium text-slate-300">Kreş & Anaokulu Sınıf Takibi</div>
          </div>
        </div>

        <!-- CARD 2: CAREGIVER -->
        <div onclick="launchDedicatedRoleApp('carelog')" class="clean-glass-card p-5 border border-white/15 hover:border-teal-400 cursor-pointer group flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
            👵
          </div>
          <div>
            <div class="font-heading font-extrabold text-base text-white group-hover:text-teal-400 transition-colors" data-i18n="roleCarelogTitle">
              CareLog Revir & Bakıcı
            </div>
            <div class="text-[11px] font-medium text-slate-300">Huzurevi Vital & İlaç Takibi</div>
          </div>
        </div>

        <!-- CARD 3: PARENT -->
        <div onclick="launchDedicatedRoleApp('veli')" class="clean-glass-card p-5 border border-white/15 hover:border-blue-400 cursor-pointer group flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
            👨‍👩‍👧
          </div>
          <div>
            <div class="font-heading font-extrabold text-base text-white group-hover:text-blue-400 transition-colors" data-i18n="roleVeliTitle">
              Veli / Aile Akışı
            </div>
            <div class="text-[11px] font-medium text-slate-300">Anlık Günlük Raporlar & Fotoğraf</div>
          </div>
        </div>

        <!-- CARD 4: DIRECTOR -->
        <div onclick="launchDedicatedRoleApp('yonetici')" class="clean-glass-card p-5 border border-white/15 hover:border-amber-400 cursor-pointer group flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
            📊
          </div>
          <div>
            <div class="font-heading font-extrabold text-base text-white group-hover:text-amber-400 transition-colors" data-i18n="roleYoneticiTitle">
              Kurum Yöneticisi
            </div>
            <div class="text-[11px] font-medium text-slate-300">Genel Finans & Performans</div>
          </div>
        </div>

      </div>
    </div>
  </div>
'''

# Find modal-role-gateway
start_idx = html.find('id="modal-role-gateway"')
if start_idx != -1:
    # Find beginning of <div ... id="modal-role-gateway"
    div_start = html.rfind('<div', 0, start_idx)
    div_end = html.find('<!-- VIEW 2', div_start)
    if div_end == -1:
        div_end = html.find('<div class="saas-layout"', div_start)
    
    html = html[:div_start] + clean_modal_html.strip() + '\n\n  ' + html[div_end:]
    print("Replaced modal-role-gateway cleanly with modern Glass Modal!")

# Also fix any remaining ÖğÖğ or Akışıışı in html
html = html.replace('ÖğÖğÖğretmen', 'Öğretmen')
html = html.replace('ÖğÖğretmen', 'Öğretmen')
html = html.replace('Akışıışır', 'Akışı')
html = html.replace('Akışıışı', 'Akışı')

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Saved clean role modal HTML!")
