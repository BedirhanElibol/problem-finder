import os
import re

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Building Full Rich SaaS Landing Page with All Banners & Sections...")

# Build full rich landing page sections
rich_sections_html = '''
    <!-- 1. VALUE PROPOSITION FEATURE PILLS BANNER ROW (ALTTTAKİ BANNERLAR) -->
    <div class="relative z-20 -mt-10 mb-16 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div class="clean-glass-card p-5 border border-white/15 flex items-center gap-4 hover:border-emerald-400/40 transition-all">
          <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
            <i data-lucide="zap" class="w-6 h-6 text-emerald-400"></i>
          </div>
          <div>
            <div class="text-sm font-bold text-white" data-i18n="pill1Title">Çaba Gerektirmeyen Kayıt</div>
            <div class="text-xs text-slate-300 font-medium" data-i18n="pill1Desc">2 Tıkla Toplu Veri Girişi</div>
          </div>
        </div>

        <div class="clean-glass-card p-5 border border-white/15 flex items-center gap-4 hover:border-emerald-400/40 transition-all">
          <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
            <i data-lucide="bell" class="w-6 h-6 text-emerald-400"></i>
          </div>
          <div>
            <div class="text-sm font-bold text-white" data-i18n="pill2Title">Şeffaf Veli Akışı</div>
            <div class="text-xs text-slate-300 font-medium" data-i18n="pill2Desc">Anlık Bildirim & Özel Fotoğraf</div>
          </div>
        </div>

        <div class="clean-glass-card p-5 border border-white/15 flex items-center gap-4 hover:border-emerald-400/40 transition-all">
          <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
            <i data-lucide="file-check" class="w-6 h-6 text-emerald-400"></i>
          </div>
          <div>
            <div class="text-sm font-bold text-white" data-i18n="pill3Title">Dijital Arşivleme</div>
            <div class="text-xs text-slate-300 font-medium" data-i18n="pill3Desc">Sıfır Kağıt, Otomatik Günlük Rapor</div>
          </div>
        </div>

        <div class="clean-glass-card p-5 border border-white/15 flex items-center gap-4 hover:border-emerald-400/40 transition-all">
          <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
            <i data-lucide="shield-check" class="w-6 h-6 text-emerald-400"></i>
          </div>
          <div>
            <div class="text-sm font-bold text-white" data-i18n="pill4Title">Güvenli İletişim</div>
            <div class="text-xs text-slate-300 font-medium" data-i18n="pill4Desc">KVKK Uyumlu, WhatsApp Gruplarına Son</div>
          </div>
        </div>

      </div>
    </div>

    <!-- 2. TRUST & LIVE ACTIVITY STRIP BANNER -->
    <section class="relative z-20 py-6 bg-slate-900/60 border-y border-white/10 backdrop-blur-md my-12">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-wrap items-center justify-between gap-6">
        <div class="flex items-center gap-3">
          <span class="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="text-sm font-bold text-white">Canlı Sistem Akışı:</span>
          <span class="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">500+ Kurum Aktif Senkronize</span>
        </div>
        <div class="text-xs font-semibold text-slate-300 flex items-center gap-6 flex-wrap">
          <span>✔️ Melis Öğretmen yemeği onayladı (12s önce)</span>
          <span>✔️ CareLog Revir tansiyon kaydı girdi (45s önce)</span>
          <span>✔️ Veli anlık bildirimi aldı (1dk önce)</span>
        </div>
      </div>
    </section>

    <!-- 3. CHOOSE YOUR DEDICATED PORTAL CARDS SECTION (#features) -->
    <section id="features" class="relative z-20 py-16 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <div class="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          ÖZELLEŞTİRİLMİŞ ÇALIŞMA ALANLARI
        </div>
        <h2 class="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight" data-i18n="portalSectionTitle">
          Kurumsal Rolünüze Özel Canlı Paneller
        </h2>
        <p class="text-slate-300 text-base sm:text-lg font-normal" data-i18n="portalSectionSub">
          Öğretmenler, Huzurevi Bakıcıları, Veliler ve Yönetim için ayrı ayrı tasarlanmış hızlı arayüzler.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <!-- CARD 1: TEACHER -->
        <div onclick="launchDedicatedRoleApp('ogretmen')" class="clean-glass-card p-6 border border-white/15 cursor-pointer hover:border-emerald-400 group">
          <div class="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <i data-lucide="graduation-cap" class="w-7 h-7 text-emerald-400"></i>
          </div>
          <h3 class="font-heading font-extrabold text-xl text-white mb-2" data-i18n="roleOgretmenTitle">🏫 Öğretmen Portalı</h3>
          <p class="text-slate-300 text-xs leading-relaxed mb-6" data-i18n="roleOgretmenDesc">Sınıf katılımı, uyku, yemek ve günlük aktivite girişlerini 2 tıkla hızlıca tamamlayın.</p>
          <div class="text-xs font-bold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>Portala Giriş Yap</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </div>
        </div>

        <!-- CARD 2: CAREGIVER -->
        <div onclick="launchDedicatedRoleApp('carelog')" class="clean-glass-card p-6 border border-white/15 cursor-pointer hover:border-emerald-400 group">
          <div class="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <i data-lucide="heart-pulse" class="w-7 h-7 text-teal-400"></i>
          </div>
          <h3 class="font-heading font-extrabold text-xl text-white mb-2" data-i18n="roleCarelogTitle">👵 CareLog Revir & Bakıcı</h3>
          <p class="text-slate-300 text-xs leading-relaxed mb-6" data-i18n="roleCarelogDesc">Yaşlı bakımevi sakinlerinin tansiyon, nabız, ilaç takibi ve sağlık durumunu eksiksiz kaydedin.</p>
          <div class="text-xs font-bold text-teal-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>Portala Giriş Yap</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </div>
        </div>

        <!-- CARD 3: PARENT -->
        <div onclick="launchDedicatedRoleApp('veli')" class="clean-glass-card p-6 border border-white/15 cursor-pointer hover:border-emerald-400 group">
          <div class="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <i data-lucide="message-circle" class="w-7 h-7 text-blue-400"></i>
          </div>
          <h3 class="font-heading font-extrabold text-xl text-white mb-2" data-i18n="roleVeliTitle">💬 Veli Akışı</h3>
          <p class="text-slate-300 text-xs leading-relaxed mb-6" data-i18n="roleVeliDesc">Çocuğunuzun veya yakınınızın anlık günlük raporlarını, fotoğraflarını ve duyurularını takip edin.</p>
          <div class="text-xs font-bold text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>Portala Giriş Yap</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </div>
        </div>

        <!-- CARD 4: DIRECTOR -->
        <div onclick="launchDedicatedRoleApp('yonetici')" class="clean-glass-card p-6 border border-white/15 cursor-pointer hover:border-emerald-400 group">
          <div class="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <i data-lucide="bar-chart-3" class="w-7 h-7 text-purple-400"></i>
          </div>
          <h3 class="font-heading font-extrabold text-xl text-white mb-2" data-i18n="roleYoneticiTitle">📊 Kurum Yöneticisi</h3>
          <p class="text-slate-300 text-xs leading-relaxed mb-6" data-i18n="roleYoneticiDesc">Tüm sınıfları, personel performansını, aidat takibini ve genel raporları tek panelden yönetin.</p>
          <div class="text-xs font-bold text-purple-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>Portala Giriş Yap</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </div>
        </div>

      </div>
    </section>

    <!-- 4. HOW IT WORKS SECTION (#how-it-works) -->
    <section id="how-it-works" class="relative z-20 py-16 bg-slate-900/40 border-y border-white/10 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div class="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            3 ADIMDA KOLAY KURULUM
          </div>
          <h2 class="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight" data-i18n="navHowItWorks">
            Nasıl Çalışır?
          </h2>
          <p class="text-slate-300 text-base" data-i18n="howSub">
            Kurumunuzda dakikalar içinde kullanmaya başlayın, karmaşık eğitim süreçlerini unutun.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="clean-glass-card p-8 text-center space-y-4">
            <div class="w-12 h-12 rounded-full bg-emerald-400 text-slate-950 font-black text-xl flex items-center justify-center mx-auto">1</div>
            <h3 class="font-heading font-extrabold text-xl text-white">Sınıf & Sakin Defteri Oluşturun</h3>
            <p class="text-slate-300 text-xs leading-relaxed">Öğrencilerinizi veya bakımevi sakinlerinizi tek tıkla sisteme aktarın.</p>
          </div>

          <div class="clean-glass-card p-8 text-center space-y-4">
            <div class="w-12 h-12 rounded-full bg-emerald-400 text-slate-950 font-black text-xl flex items-center justify-center mx-auto">2</div>
            <h3 class="font-heading font-extrabold text-xl text-white">2 Tıkla Günlük Kayıt Girin</h3>
            <p class="text-slate-300 text-xs leading-relaxed">Yemek, uyku, aktivite ve ilaç bilgilerini personel zaman kaybetmeden kaydetsin.</p>
          </div>

          <div class="clean-glass-card p-8 text-center space-y-4">
            <div class="w-12 h-12 rounded-full bg-emerald-400 text-slate-950 font-black text-xl flex items-center justify-center mx-auto">3</div>
            <h3 class="font-heading font-extrabold text-xl text-white">Anlık Şeffaf Veli Akışı</h3>
            <p class="text-slate-300 text-xs leading-relaxed">Veliler özel uygulama üzerinden günlük raporları ve fotoğrafları anında görsün.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. PRICING SECTION (#pricing) -->
    <section id="pricing" class="relative z-20 py-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <div class="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          ESNEK VE ŞEFFAF PAKETLER
        </div>
        <h2 class="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight" data-i18n="navPricing">
          Fiyatlandırma
        </h2>
        <p class="text-slate-300 text-base" data-i18n="pricingSub">
          14 gün boyunca tüm özellikleri ücretsiz ve taahhütsüz deneyin.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <!-- PLAN 1 -->
        <div class="clean-glass-card p-8 border border-white/15 flex flex-col justify-between">
          <div>
            <div class="text-xs font-bold text-emerald-400 uppercase mb-2">BAŞLANGIÇ PAKETİ</div>
            <h3 class="font-heading font-extrabold text-2xl text-white mb-4">Butik Kreş</h3>
            <div class="font-heading font-black text-4xl text-white mb-6">₺499 <span class="text-xs font-normal text-slate-300">/ ay</span></div>
            <ul class="space-y-3 text-xs text-slate-200 mb-8">
              <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-400"></i> 30 Öğrenciye Kadar</li>
              <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-400"></i> Sınıf & Yemek Takibi</li>
              <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-400"></i> Sınırsız Veli Bildirimi</li>
            </ul>
          </div>
          <button onclick="openRoleGatewayModal()" class="w-full clean-btn-glass py-3 rounded-full text-xs font-bold uppercase text-white cursor-pointer">Ücretsiz Deneyin</button>
        </div>

        <!-- PLAN 2 POPULAR -->
        <div class="clean-glass-card p-8 border-2 border-emerald-400 flex flex-col justify-between relative shadow-2xl shadow-emerald-500/20">
          <span class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-400 text-slate-950 text-[10px] font-black uppercase px-4 py-1 rounded-full">EN POPÜLER PAKET</span>
          <div>
            <div class="text-xs font-bold text-emerald-400 uppercase mb-2">PROFESYONEL PAKET</div>
            <h3 class="font-heading font-extrabold text-2xl text-white mb-4">Anaokulu & Bakımevi</h3>
            <div class="font-heading font-black text-4xl text-white mb-6">₺999 <span class="text-xs font-normal text-slate-300">/ ay</span></div>
            <ul class="space-y-3 text-xs text-slate-200 mb-8">
              <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-400"></i> Sınırsız Öğrenci & Sakin</li>
              <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-400"></i> CareLog Revir & İlaç Modülü</li>
              <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-400"></i> Fotoğraf & Video Paylaşımı</li>
              <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-400"></i> Özel Müşteri Temsilcisi</li>
            </ul>
          </div>
          <button onclick="openRoleGatewayModal()" class="w-full clean-btn-primary py-3 rounded-full text-xs font-bold uppercase text-white cursor-pointer">14 Gün Ücretsiz Başla</button>
        </div>

        <!-- PLAN 3 -->
        <div class="clean-glass-card p-8 border border-white/15 flex flex-col justify-between">
          <div>
            <div class="text-xs font-bold text-emerald-400 uppercase mb-2">KURUMSAL PAKET</div>
            <h3 class="font-heading font-extrabold text-2xl text-white mb-4">Zincir Tesisler</h3>
            <div class="font-heading font-black text-4xl text-white mb-6">Özel Teklif</div>
            <ul class="space-y-3 text-xs text-slate-200 mb-8">
              <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-400"></i> Çoklu Şube Yönetimi</li>
              <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-400"></i> Özel Entegrasyon & API</li>
              <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-400"></i> 7/24 VIP Destek</li>
            </ul>
          </div>
          <button onclick="openRoleGatewayModal()" class="w-full clean-btn-glass py-3 rounded-full text-xs font-bold uppercase text-white cursor-pointer">Bize Ulaşın</button>
        </div>

      </div>
    </section>

    <!-- 6. FOOTER SECTION (#contact) -->
    <footer id="contact" class="relative z-20 pt-16 pb-12 bg-slate-950 border-t border-white/10 text-slate-400 text-xs">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div class="space-y-4">
          <div class="font-heading font-extrabold text-xl text-white">KinderLog <span class="text-emerald-400">& CareLog</span></div>
          <p class="text-slate-400 leading-relaxed">Kreşler, anaokulları ve yaşlı bakımevleri için yeni nesil şeffaf dijital bakım ve iletişim platformu.</p>
        </div>
        <div>
          <h4 class="font-bold text-white uppercase tracking-wider mb-4">Hızlı Bağlantılar</h4>
          <ul class="space-y-2">
            <li><a href="#features" class="hover:text-emerald-400 transition-colors">Özellikler</a></li>
            <li><a href="#how-it-works" class="hover:text-emerald-400 transition-colors">Nasıl Çalışır</a></li>
            <li><a href="#pricing" class="hover:text-emerald-400 transition-colors">Fiyatlandırma</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-white uppercase tracking-wider mb-4">Güvenlik & Yasal</h4>
          <ul class="space-y-2">
            <li><a href="#" onclick="openLegalModal('privacy'); return false;" class="hover:text-emerald-400 transition-colors">Gizlilik Politikası</a></li>
            <li><a href="#" onclick="openLegalModal('kvkk'); return false;" class="hover:text-emerald-400 transition-colors">KVKK Aydınlatma Metni</a></li>
            <li><a href="#" onclick="openLegalModal('cookies'); return false;" class="hover:text-emerald-400 transition-colors">Çerez Tercihleri</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-white uppercase tracking-wider mb-4">İletişim & Destek</h4>
          <p class="text-slate-400 leading-relaxed mb-2">destek@kinderlog-carelog.com</p>
          <p class="text-slate-400 leading-relaxed">+90 (850) 885 00 00</p>
        </div>
      </div>
      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div>© 2026 KinderLog & CareLog Inc. Tüm hakları saklıdır.</div>
        <div class="flex items-center gap-3">
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span class="text-emerald-400 font-bold">KVKK & GDPR COMPLIANT</span>
        </div>
      </div>
    </footer>
'''

# Find end of main hero section or append rich_sections_html inside view-landing before modal
if '</main>' in html:
    html = html.replace('</main>', '</main>\n' + rich_sections_html.strip())
    print("Appended all rich sections below hero main section!")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Saved Full Rich SaaS Landing Page with All Banners & Sections!")
