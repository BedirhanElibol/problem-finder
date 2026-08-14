import os
import re

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Executing Complete Ultra-Clean HD Redesign for KinderLog & CareLog Landing...")

# 1. Update <head> styles: Crisp Plus Jakarta Sans + Inter + Clean Shadows (No Heavy Dark Box)
clean_head_css = '''
  <!-- Ultra-Clean Modern SaaS Fonts: Plus Jakarta Sans & Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              teal: '#0d9488',
              emerald: '#10b981',
              mint: '#34d399',
              coral: '#FF6B6B',
              coralHover: '#FA5252',
              darkBg: '#091317'
            }
          },
          fontFamily: {
            heading: ['Plus Jakarta Sans', 'sans-serif'],
            sans: ['Inter', 'sans-serif']
          }
        }
      }
    }
  </script>

  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <style>
    html {
      scrollbar-width: none;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }
    html::-webkit-scrollbar { display: none; }

    body {
      background-color: #091317;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
    }
    
    .clean-glass-nav {
      background: rgba(9, 19, 23, 0.75);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
    
    .clean-glass-card {
      background: rgba(15, 23, 42, 0.45);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 24px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .clean-glass-card:hover {
      background: rgba(15, 23, 42, 0.6);
      border-color: rgba(52, 211, 153, 0.4);
      transform: translateY(-3px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    }
    
    .clean-btn-primary {
      background: linear-gradient(135deg, #10b981 0%, #0d9488 100%);
      color: #ffffff;
      box-shadow: 0 8px 24px rgba(16, 185, 129, 0.35);
      transition: all 0.25s ease;
    }
    .clean-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(16, 185, 129, 0.5);
    }

    .clean-btn-glass {
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.25s ease;
    }
    .clean-btn-glass:hover {
      background: rgba(255, 255, 255, 0.18);
      border-color: rgba(255, 255, 255, 0.4);
    }

    .hero-text-shadow {
      text-shadow: 0 2px 20px rgba(0, 0, 0, 0.8), 0 4px 40px rgba(0, 0, 0, 0.6);
    }

    .sharp-video-overlay {
      background: 
        radial-gradient(circle at 65% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 60%),
        linear-gradient(to bottom, rgba(9, 19, 23, 0.6) 0%, transparent 20%, transparent 80%, rgba(9, 19, 23, 0.95) 100%),
        linear-gradient(to right, rgba(9, 19, 23, 0.75) 0%, rgba(9, 19, 23, 0.4) 40%, transparent 80%);
    }
  </style>
'''

# Replace head styles
html = re.sub(r'<!-- Google Fonts: Outfit[\s\S]*?</style>', clean_head_css.strip(), html)

# 2. Build Ultra-Clean Floating Navbar and Hero Content Section
clean_hero_html = '''<!-- CRYSTAL CLEAR 4K HD BACKGROUND VIDEO -->
    <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <video id="heroVideo" autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover filter brightness-105 contrast-105">
        <source src="https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/hero-bg-glass-ball-1_5mb.mp4" type="video/mp4">
      </video>
      <div class="absolute inset-0 sharp-video-overlay"></div>
    </div>

    <!-- FLOATING ULTRA-CLEAN GLASS NAVBAR HEADER -->
    <header class="w-full fixed top-4 left-0 right-0 z-50 px-4 sm:px-8">
      <div class="max-w-6xl mx-auto h-16 sm:h-20 px-6 rounded-full clean-glass-nav flex items-center justify-between">
        
        <!-- LOGO AREA -->
        <a href="#" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1.5px] shadow-lg shadow-emerald-500/20">
            <div class="w-full h-full rounded-full bg-[#091317] flex items-center justify-center">
              <i data-lucide="shield-check" class="w-5 h-5 text-emerald-400"></i>
            </div>
          </div>
          <div>
            <div class="font-heading font-extrabold tracking-wide text-lg sm:text-xl text-white group-hover:text-emerald-400 transition-colors">
              KinderLog <span class="text-emerald-400">& CareLog</span>
            </div>
            <div class="text-[9px] font-bold tracking-[0.2em] text-emerald-400/90 uppercase">SaaS Care Platform</div>
          </div>
        </a>

        <!-- DESKTOP NAV LINKS -->
        <nav class="hidden md:flex items-center gap-8">
          <a href="#features" data-i18n="navFeatures" class="text-xs font-bold tracking-wider text-slate-200 hover:text-white uppercase transition-colors">Özellikler</a>
          <a href="#how-it-works" data-i18n="navHowItWorks" class="text-xs font-bold tracking-wider text-slate-200 hover:text-white uppercase transition-colors">Nasıl Çalışır</a>
          <a href="#pricing" data-i18n="navPricing" class="text-xs font-bold tracking-wider text-slate-200 hover:text-white uppercase transition-colors">Fiyatlandırma</a>
          <a href="#contact" data-i18n="navContact" class="text-xs font-bold tracking-wider text-slate-200 hover:text-white uppercase transition-colors">İletişim</a>
        </nav>

        <!-- RIGHT ACTION GROUP -->
        <div class="flex items-center gap-3 sm:gap-4">
          
          <!-- GLOBAL i18n LANGUAGE DROPDOWN -->
          <div class="lang-dropdown-wrapper relative inline-block">
            <button id="lang-btn" onclick="toggleLangDropdown()" class="clean-btn-glass px-3.5 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer">
              <span id="lang-btn-flag">🇹🇷</span>
              <span id="lang-btn-label">TR</span>
              <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400"></i>
            </button>
            <div id="lang-menu" class="hidden absolute right-0 top-11 bg-[#091317]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-2 min-w-[150px] shadow-2xl z-50">
              <div onclick="selectGlobalLang('en')" class="lang-option-item px-3 py-2 rounded-xl cursor-pointer hover:bg-white/10 text-xs font-bold flex items-center gap-2 text-white">
                <span>🇺🇸</span> English (US)
              </div>
              <div onclick="selectGlobalLang('tr')" class="lang-option-item px-3 py-2 rounded-xl cursor-pointer hover:bg-white/10 text-xs font-bold flex items-center gap-2 text-white">
                <span>🇹🇷</span> Türkçe (TR)
              </div>
              <div onclick="selectGlobalLang('es')" class="lang-option-item px-3 py-2 rounded-xl cursor-pointer hover:bg-white/10 text-xs font-bold flex items-center gap-2 text-white">
                <span>🇪🇸</span> Español (ES)
              </div>
              <div onclick="selectGlobalLang('zh')" class="lang-option-item px-3 py-2 rounded-xl cursor-pointer hover:bg-white/10 text-xs font-bold flex items-center gap-2 text-white">
                <span>🇨🇳</span> 中文 (ZH)
              </div>
            </div>
          </div>

          <!-- LOGIN BUTTON -->
          <button onclick="openRoleGatewayModal()" data-i18n="navLogin" class="btn-nav-login clean-btn-glass px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase text-white hover:border-emerald-400 hover:text-emerald-400 cursor-pointer">
            Giriş Yap
          </button>

          <!-- GET STARTED CTA BUTTON -->
          <button onclick="openRoleGatewayModal()" data-i18n="navStartFree" class="clean-btn-primary px-5 py-2 rounded-full text-xs font-extrabold tracking-wider uppercase flex items-center gap-2 cursor-pointer">
            Ücretsiz Deneyin
          </button>
        </div>
      </div>
    </header>

    <!-- MAIN HERO CONTENT SECTION (NO DARK BOX AROUND TEXT!) -->
    <main class="relative z-10 pt-36 sm:pt-44 pb-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <!-- LEFT TYPOGRAPHY COLUMN (CLEAN, ELEGANT, NO HEAVY BOX) -->
        <div class="lg:col-span-7 space-y-6">
          
          <!-- TAGLINE BADGE -->
          <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full clean-btn-glass border-emerald-500/30">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span data-i18n="heroTag" class="text-xs font-bold tracking-wider text-emerald-400 uppercase">
              Çocuk & Yaşlı Bakımında Yeni Nesil Şeffaflık
            </span>
          </div>

          <!-- MAIN HEADLINE WITH PERFECT BALANCE & CASING -->
          <div class="space-y-3">
            <h1 data-i18n="heroTitle" class="hero-h1 font-heading font-extrabold text-4xl sm:text-6xl lg:text-[56px] leading-[1.12] tracking-tight text-white hero-text-shadow">
              KinderLog & CareLog:<br>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Kreş ve Huzurevleri İçin Şeffaf Bakım Platformu.</span>
            </h1>
          </div>

          <!-- SUBTITLE PARAGRAPH -->
          <p data-i18n="heroSub" class="hero-subtitle text-slate-200 text-base sm:text-lg font-normal max-w-xl leading-relaxed hero-text-shadow">
            Personelinizi 2 tıkla hızlı kayıtla güçlendirin, aileleri anlık şeffaf raporlarla sevindirin. WhatsApp karmaşasına ve kağıt formlara son verin!
          </p>

          <!-- BUTTON ACTION GROUP -->
          <div class="flex flex-wrap items-center gap-4 pt-4">
            <!-- PRIMARY CTA -->
            <button onclick="openRoleGatewayModal()" data-i18n="heroCta" class="clean-btn-primary text-xs sm:text-sm font-extrabold tracking-wider uppercase px-8 py-4 rounded-full flex items-center gap-3 cursor-pointer">
              <i data-lucide="shield-check" class="w-5 h-5 text-white"></i>
              <span>14 Gün Ücretsiz Deneyin</span>
            </button>

            <!-- SECONDARY CTA: WATCH VIDEO DEMO -->
            <button id="openVideoModal" data-i18n="heroSecondaryCta" class="clean-btn-glass text-white font-bold text-xs sm:text-sm tracking-wider uppercase px-7 py-4 rounded-full flex items-center gap-3 cursor-pointer">
              <div class="w-6 h-6 rounded-full bg-emerald-400/20 flex items-center justify-center border border-emerald-400/40">
                <i data-lucide="play" class="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 ml-0.5"></i>
              </div>
              <span>Canlı Demo Görün</span>
            </button>
          </div>
        </div>

        <!-- RIGHT COLUMN: ELEGANT LIVE PREVIEW CARD & STAT BADGES -->
        <div class="lg:col-span-5 flex flex-col items-center lg:items-end space-y-5">
          
          <!-- LIVE SAAS WORKSPACE PREVIEW CARD -->
          <div class="clean-glass-card p-6 w-full max-w-md border border-white/15">
            <div class="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <i data-lucide="activity" class="w-5 h-5 text-emerald-400"></i>
                </div>
                <div>
                  <div class="text-xs font-bold text-white">Canlı Bakım Akışı</div>
                  <div class="text-[10px] font-semibold text-emerald-400">Little Explorers Sınıfı</div>
                </div>
              </div>
              <span class="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">100% Senkronize</span>
            </div>

            <div class="space-y-3">
              <div class="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span class="font-semibold text-slate-200">Mila Yılmaz (Öğlen Yemeği)</span>
                </div>
                <span class="font-bold text-emerald-400">%100 Yendi</span>
              </div>

              <div class="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-blue-400"></span>
                  <span class="font-semibold text-slate-200">Ayşe Teyze (Tansiyon Takibi)</span>
                </div>
                <span class="font-bold text-blue-400">120/80 mmHg</span>
              </div>
            </div>
          </div>

          <!-- STAT BADGES -->
          <div class="grid grid-cols-2 gap-4 w-full max-w-md">
            <div class="clean-glass-card p-4 text-center">
              <div class="font-heading font-black text-2xl text-white">500+</div>
              <div class="text-[10px] font-bold text-slate-300 uppercase mt-0.5" data-i18n="trustTitle">Kreş & Bakımevi</div>
            </div>
            <div class="clean-glass-card p-4 text-center">
              <div class="font-heading font-black text-2xl text-emerald-400">%99.8</div>
              <div class="text-[10px] font-bold text-slate-300 uppercase mt-0.5" data-i18n="badgeSecurity">Veli Memnuniyeti</div>
            </div>
          </div>

        </div>
      </div>
    </main>

    <!-- FOOTER CONTROLS BAR -->
    <footer class="relative z-20 w-full py-6">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        
        <!-- LEFT VIDEO CONTROLS -->
        <div class="flex items-center gap-3">
          <button id="toggleAudioBtn" class="clean-btn-glass p-3 rounded-full text-white hover:text-emerald-400 transition-colors cursor-pointer" title="Mute/Unmute Video">
            <i data-lucide="volume-x" class="w-4 h-4"></i>
          </button>
          <button id="togglePlayBtn" class="clean-btn-glass p-3 rounded-full text-white hover:text-emerald-400 transition-colors cursor-pointer" title="Play/Pause Video">
            <i data-lucide="pause" class="w-4 h-4"></i>
          </button>
        </div>

        <!-- CENTER SCROLL DOWN INDICATOR -->
        <a href="#features" class="hidden sm:flex flex-col items-center gap-2 group cursor-pointer">
          <div class="w-6 h-10 rounded-full border-2 border-white/30 group-hover:border-emerald-400 flex items-start justify-center p-1.5 transition-colors">
            <div class="w-1.5 h-2.5 rounded-full bg-emerald-400 animate-bounce-slow"></div>
          </div>
          <span class="text-[10px] font-bold tracking-widest text-slate-400 group-hover:text-white uppercase transition-colors">SCROLL DOWN</span>
        </a>

        <!-- RIGHT SECURITY CUE -->
        <div class="text-xs font-bold tracking-wider text-emerald-400 uppercase flex items-center gap-2">
          <i data-lucide="shield-check" class="w-4 h-4"></i>
          <span>KVKK & GDPR COMPLIANT</span>
        </div>
      </div>
    </footer>

    <!-- VIDEO DOCUMENTARY DEMO MODAL -->
    <div id="videoModal" class="fixed inset-0 z-50 hidden flex items-center justify-center bg-black/85 backdrop-blur-2xl p-4 sm:p-8">
      <div class="max-w-4xl w-full bg-[#091317] border border-white/20 rounded-3xl overflow-hidden shadow-2xl relative">
        <div class="p-6 border-b border-white/10 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <i data-lucide="video" class="w-5 h-5 text-emerald-400"></i>
            <h3 class="font-heading font-bold text-lg text-white">KinderLog & CareLog — Facility Transformation Demo</h3>
          </div>
          <button id="closeVideoModal" class="clean-btn-glass p-2 rounded-full text-white/70 hover:text-white cursor-pointer">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>
        <div class="aspect-video w-full bg-black relative">
          <video id="modalVideo" controls class="w-full h-full object-cover">
            <source src="https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/hero-bg-glass-ball-1_5mb.mp4" type="video/mp4">
          </video>
        </div>
      </div>
    </div>
'''

# Replace previous hero section html
old_section_regex = r'<!-- BACKGROUND VIDEO LAYER WITH ATMOSPHERIC OVERLAY -->[\s\S]*?<!-- VIDEO DOCUMENTARY MODAL -->[\s\S]*?</div>\s*</div>'
if re.search(old_section_regex, html):
    html = re.sub(old_section_regex, clean_hero_html.strip(), html)
    print("Replaced old hero section with Ultra-Clean Modern SaaS Hero Section!")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Saved Ultra-Clean Modern SaaS Redesign!")
