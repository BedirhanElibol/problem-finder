import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Replacing broken legacy footer in landing-page.html...")

kin_idx = html.find('info@kinellog.com')
if kin_idx != -1:
    footer_start = html.rfind('<footer', 0, kin_idx)
    footer_end = html.find('</footer>', kin_idx) + len('</footer>')
    print(f"Found broken footer from char {footer_start} to {footer_end}")

    clean_footer_html = '''
    <!-- CLEAN ULTRA-MODERN FOOTER -->
    <footer id="contact" class="relative z-20 pt-16 pb-12 bg-[#091317] border-t border-white/10 text-slate-400 text-xs">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1.5px]">
              <div class="w-full h-full rounded-full bg-[#091317] flex items-center justify-center">
                <i data-lucide="shield-check" class="w-5 h-5 text-emerald-400"></i>
              </div>
            </div>
            <div>
              <div class="font-heading font-extrabold text-lg text-white">KinderLog <span class="text-emerald-400">& CareLog</span></div>
              <div class="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Çocuk & Yaşlı Bakım Platformu</div>
            </div>
          </div>
          <p class="text-slate-400 leading-relaxed text-xs">Kreşler, anaokulları ve yaşlı bakımevleri için yeni nesil şeffaf dijital bakım ve iletişim platformu.</p>
        </div>

        <div>
          <h4 class="font-bold text-white uppercase tracking-wider mb-4">Hızlı Bağlantılar</h4>
          <ul class="space-y-2.5">
            <li><a href="#features" class="hover:text-emerald-400 transition-colors">Özellikler</a></li>
            <li><a href="#how-it-works" class="hover:text-emerald-400 transition-colors">Nasıl Çalışır</a></li>
            <li><a href="#pricing" class="hover:text-emerald-400 transition-colors">Fiyatlandırma</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-white uppercase tracking-wider mb-4">Güvenlik & Yasal</h4>
          <ul class="space-y-2.5">
            <li><a href="#" onclick="openLegalModal('privacy'); return false;" class="hover:text-emerald-400 transition-colors">Gizlilik Politikası</a></li>
            <li><a href="#" onclick="openLegalModal('kvkk'); return false;" class="hover:text-emerald-400 transition-colors">KVKK Aydınlatma Metni</a></li>
            <li><a href="#" onclick="openLegalModal('cookies'); return false;" class="hover:text-emerald-400 transition-colors">Çerez Tercihleri</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-white uppercase tracking-wider mb-4">İletişim & Destek</h4>
          <p class="text-slate-300 font-semibold mb-1">E-posta: <span class="text-emerald-400">destek@kinderlog-carelog.com</span></p>
          <p class="text-slate-300 font-semibold mb-1">Telefon: +90 (850) 885 00 00</p>
          <p class="text-slate-400 text-[11px] mt-2">7/24 Canlı Destek & Müşteri Hizmetleri</p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div>© 2026 KinderLog & CareLog Inc. Tüm hakları saklıdır.</div>
        <div class="flex items-center gap-3">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="text-emerald-400 font-bold tracking-wider">KVKK & GDPR COMPLIANT</span>
        </div>
      </div>
    </footer>
'''
    html = html[:footer_start] + clean_footer_html.strip() + html[footer_end:]
    print("Replaced broken footer with clean modern footer!")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Saved clean footer fix!")
