import os
import re

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Applying Soft Warm Coral KinderLog & CareLog Premium Hero Section...")

# 1. Update <head> fonts, Tailwind Config & Soft Warm Coral CSS
new_head_content = '''
  <!-- Google Fonts: Outfit, Instrument Serif & Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=Outfit:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              accent: '#FF6B6B',
              accentHover: '#FA5252',
              accentDark: '#E03131',
              bgDark: '#0F172A',
              glow: 'rgba(255, 107, 107, 0.4)'
            }
          },
          fontFamily: {
            heading: ['Outfit', 'sans-serif'],
            serif: ['"Instrument Serif"', 'serif'],
            sans: ['"Plus Jakarta Sans"', 'sans-serif']
          },
          animation: {
            'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            'bounce-slow': 'bounce 2.5s infinite',
            'float': 'float 6s ease-in-out infinite',
            'glow': 'glow 3s ease-in-out infinite alternate'
          },
          keyframes: {
            float: {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-10px)' }
            },
            glow: {
              '0%': { opacity: '0.4' },
              '100%': { opacity: '0.8' }
            }
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
      background-color: #0F172A;
      color: #ffffff;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    
    .glass-nav {
      background: rgba(15, 23, 42, 0.7);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    
    .glass-card {
      background: rgba(255, 255, 255, 0.04);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .glass-card:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 107, 107, 0.4);
      transform: translateY(-3px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
    }
    
    .glass-button {
      background: rgba(255, 255, 255, 0.06);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.22);
      transition: all 0.3s ease;
    }
    
    .glass-button:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.5);
    }
    
    .text-glow {
      text-shadow: 0 0 24px rgba(255, 107, 107, 0.45);
    }
    
    .hero-title-shadow {
      text-shadow: 0 4px 24px rgba(0, 0, 0, 0.7);
    }
    
    .video-overlay {
      background: 
        radial-gradient(circle at 50% 45%, rgba(255, 107, 107, 0.03) 0%, rgba(15, 23, 42, 0.4) 45%, rgba(10, 15, 28, 0.85) 85%, rgba(5, 8, 15, 0.96) 100%),
        linear-gradient(to bottom, rgba(15, 23, 42, 0.85) 0%, transparent 20%, transparent 75%, rgba(15, 23, 42, 0.95) 100%),
        linear-gradient(to right, rgba(15, 23, 42, 0.75) 0%, transparent 35%, transparent 65%, rgba(15, 23, 42, 0.75) 100%);
    }
  </style>
'''

# Replace head styles
html = re.sub(r'<!-- CreativaX Google Fonts[\s\S]*?</style>', new_head_content.strip(), html)
if '<!-- Google Fonts: Outfit, Instrument Serif' not in html:
    html = re.sub(r'<!-- Ultra HD Fonts[\s\S]*?</style>', new_head_content.strip(), html)

# 2. Build Soft Warm Coral Hero Section HTML
hero_coral_html = '''<!-- BACKGROUND VIDEO LAYER WITH ATMOSPHERIC OVERLAY -->
    <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <video id="heroVideo" autoplay loop muted playsinline poster="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1920&q=80" class="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-1000 ease-out">
        <source src="https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/hero-bg-glass-ball-1_5mb.mp4" type="video/mp4">
      </video>
      <div class="absolute inset-0 video-overlay"></div>
    </div>

    <!-- GLASS NAV HEADER -->
    <header class="w-full fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
      <div class="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 h-20 sm:h-24 flex items-center justify-between">
        
        <!-- LOGO AREA -->
        <a href="#" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center relative group-hover:border-[#FF6B6B] transition-all duration-300">
            <i data-lucide="shield-check" class="w-5 h-5 text-[#FF6B6B]"></i>
            <span class="w-2.5 h-2.5 rounded-full bg-[#FF6B6B] animate-pulse absolute -top-0.5 -right-0.5 shadow-lg shadow-[#FF6B6B]/50"></span>
          </div>
          <div>
            <div class="font-heading font-extrabold tracking-wider text-xl sm:text-2xl text-white group-hover:text-[#FF6B6B] transition-colors">
              KINDERLOG <span class="text-[#FF6B6B]">& CareLog</span>
            </div>
            <div class="text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] text-white/60 uppercase">A WARM & SECURE CARE PLANET</div>
          </div>
        </a>

        <!-- DESKTOP NAV LINKS -->
        <nav class="hidden md:flex items-center gap-8 lg:gap-10">
          <a href="#features" data-i18n="navFeatures" class="text-xs lg:text-sm font-semibold tracking-widest text-white/80 hover:text-white uppercase relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF6B6B] hover:after:w-full after:transition-all after:duration-300">Özellikler</a>
          <a href="#how-it-works" data-i18n="navHowItWorks" class="text-xs lg:text-sm font-semibold tracking-widest text-white/80 hover:text-white uppercase relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF6B6B] hover:after:w-full after:transition-all after:duration-300">Nasıl Çalışır</a>
          <a href="#pricing" data-i18n="navPricing" class="text-xs lg:text-sm font-semibold tracking-widest text-white/80 hover:text-white uppercase relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF6B6B] hover:after:w-full after:transition-all after:duration-300">Fiyatlandırma</a>
          <a href="#contact" data-i18n="navContact" class="text-xs lg:text-sm font-semibold tracking-widest text-white/80 hover:text-white uppercase relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF6B6B] hover:after:w-full after:transition-all after:duration-300">İletişim</a>
        </nav>

        <!-- RIGHT ACTION GROUP -->
        <div class="flex items-center gap-3 sm:gap-4">
          
          <!-- GLOBAL i18n LANGUAGE DROPDOWN -->
          <div class="lang-dropdown-wrapper relative inline-block">
            <button id="lang-btn" onclick="toggleLangDropdown()" class="glass-button px-3.5 py-2 rounded-full text-xs font-bold tracking-widest text-white flex items-center gap-1.5 hover:border-[#FF6B6B] cursor-pointer">
              <span id="lang-btn-flag">🇹🇷</span>
              <span id="lang-btn-label">TR</span>
              <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-white/60"></i>
            </button>
            <div id="lang-menu" class="hidden absolute right-0 top-12 bg-[#0F172A]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-2 min-w-[150px] shadow-2xl z-50">
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
          <button onclick="openRoleGatewayModal()" data-i18n="navLogin" class="btn-nav-login glass-button px-4 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase text-white hover:border-[#FF6B6B] hover:text-[#FF6B6B] transition-all cursor-pointer">
            Giriş Yap
          </button>

          <!-- GET STARTED CTA BUTTON -->
          <button onclick="openRoleGatewayModal()" data-i18n="navStartFree" class="bg-[#FF6B6B] hover:bg-[#FA5252] text-white font-extrabold px-5 py-2.5 rounded-full text-xs tracking-widest uppercase flex items-center gap-2 shadow-lg shadow-[#FF6B6B]/30 hover:shadow-[#FF6B6B]/50 transition-all transform hover:scale-105 cursor-pointer">
            Ücretsiz Deneyin
          </button>

          <!-- MOBILE MENU BUTTON -->
          <button id="mobileMenuBtn" class="md:hidden glass-button p-2.5 rounded-full text-white cursor-pointer">
            <i data-lucide="menu" class="w-5 h-5"></i>
          </button>
        </div>
      </div>

      <!-- MOBILE MENU DROPDOWN -->
      <div id="mobileMenu" class="hidden md:hidden bg-[#0F172A]/95 backdrop-blur-2xl border-t border-white/10 px-6 py-6 flex-col gap-4">
        <a href="#features" data-i18n="navFeatures" class="text-sm font-semibold tracking-widest text-white/80 hover:text-[#FF6B6B] uppercase">Özellikler</a>
        <a href="#how-it-works" data-i18n="navHowItWorks" class="text-sm font-semibold tracking-widest text-white/80 hover:text-[#FF6B6B] uppercase">Nasıl Çalışır</a>
        <a href="#pricing" data-i18n="navPricing" class="text-sm font-semibold tracking-widest text-white/80 hover:text-[#FF6B6B] uppercase">Fiyatlandırma</a>
        <a href="#contact" data-i18n="navContact" class="text-sm font-semibold tracking-widest text-white/80 hover:text-[#FF6B6B] uppercase">İletişim</a>
        <button onclick="openRoleGatewayModal()" data-i18n="navStartFree" class="w-full bg-[#FF6B6B] text-white font-extrabold py-3 rounded-full text-xs tracking-widest uppercase">
          Ücretsiz Deneyin
        </button>
      </div>
    </header>

    <!-- MAIN HERO CONTENT SECTION -->
    <main class="relative z-10 pt-32 sm:pt-40 pb-20 max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        <!-- LEFT TYPOGRAPHY COLUMN -->
        <div class="lg:col-span-7 xl:col-span-6 space-y-6">
          
          <!-- TAGLINE BADGE -->
          <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card border-[#FF6B6B]/30">
            <span class="w-2 h-2 rounded-full bg-[#FF6B6B] animate-pulse"></span>
            <span data-i18n="heroTag" class="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#FF6B6B] uppercase">
              ÇOCUK & YAŞLI BAKIMINDA YENİ NESİL STANDART
            </span>
          </div>

          <!-- MAIN HEADLINE -->
          <div class="space-y-1">
            <h1 data-i18n="heroTitle" class="hero-h1 font-heading font-extrabold text-3xl sm:text-5xl xl:text-[58px] leading-[1.12] uppercase tracking-tight text-white hero-title-shadow">
              BUILDING TOMORROW'S CARE.
            </h1>
            <div class="font-serif italic font-normal text-[#FF6B6B] text-glow capitalize text-4xl sm:text-6xl xl:text-[66px] tracking-normal inline-block">
              Protecting Today's Loved Ones.
            </div>
          </div>

          <!-- SUBTITLE PARAGRAPH -->
          <p data-i18n="heroSub" class="hero-subtitle text-white/80 text-base sm:text-lg font-normal max-w-xl leading-relaxed">
            Personelinizi 2 tıkla hızlı kayıtla güçlendirin, aileleri anlık şeffaf raporlarla sevindirin. WhatsApp karmaşasına ve kağıt formlara son verin!
          </p>

          <!-- BUTTON ACTION GROUP -->
          <div class="flex flex-wrap items-center gap-4 pt-4">
            <!-- PRIMARY CTA -->
            <button onclick="openRoleGatewayModal()" data-i18n="heroCta" class="bg-[#FF6B6B] hover:bg-[#FA5252] text-white font-extrabold text-xs sm:text-sm tracking-widest uppercase px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 transform hover:scale-[1.03] shadow-lg shadow-[#FF6B6B]/30 hover:shadow-[#FF6B6B]/50 cursor-pointer">
              <i data-lucide="shield-check" class="w-4 h-4"></i>
              <span>14 Gün Ücretsiz Deneyin</span>
            </button>

            <!-- SECONDARY CTA: WATCH VIDEO -->
            <button id="openVideoModal" data-i18n="heroSecondaryCta" class="glass-button text-white font-semibold text-xs sm:text-sm tracking-widest uppercase px-7 py-4 rounded-full flex items-center gap-3 transition-all duration-300 hover:border-white/60 cursor-pointer">
              <div class="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                <i data-lucide="play" class="w-3 h-3 text-white fill-white ml-0.5"></i>
              </div>
              <span>Canlı Demo Görün</span>
            </button>
          </div>
        </div>

        <!-- CENTER SPACER FOR 3D GLASS BALL BACKGROUND VIDEO -->
        <div class="hidden lg:block lg:col-span-1 xl:col-span-2"></div>

        <!-- RIGHT STATS COLUMN (GLASS CARDS) -->
        <div class="lg:col-span-4 flex flex-col justify-center items-start lg:items-end space-y-5">
          
          <!-- STAT CARD 1 -->
          <div class="glass-card p-6 rounded-3xl w-full max-w-sm border border-white/15 hover:border-[#FF6B6B]/40 transition-all">
            <div class="flex items-center justify-between mb-3">
              <div class="w-10 h-10 rounded-2xl bg-[#FF6B6B]/10 border border-[#FF6B6B]/30 flex items-center justify-center">
                <i data-lucide="heart-pulse" class="w-5 h-5 text-[#FF6B6B]"></i>
              </div>
              <span class="text-[10px] font-extrabold tracking-widest text-[#FF6B6B] bg-[#FF6B6B]/10 px-3 py-1 rounded-full uppercase border border-[#FF6B6B]/20">LIVE PLATFORM</span>
            </div>
            <div class="font-heading font-extrabold text-3xl sm:text-4xl text-white mb-1">500+</div>
            <div data-i18n="trustTitle" class="text-xs font-semibold tracking-wider text-white/70 uppercase">
              Seçkin Kreş & Yaşlı Bakımevi Güvenle Kullanıyor
            </div>
          </div>

          <!-- STAT CARD 2 -->
          <div class="glass-card p-6 rounded-3xl w-full max-w-sm border border-white/15 hover:border-[#FF6B6B]/40 transition-all">
            <div class="flex items-center justify-between mb-3">
              <div class="w-10 h-10 rounded-2xl bg-[#FF6B6B]/10 border border-[#FF6B6B]/30 flex items-center justify-center">
                <i data-lucide="shield-check" class="w-5 h-5 text-[#FF6B6B]"></i>
              </div>
              <span data-i18n="badgeCompliance" class="text-[10px] font-extrabold tracking-widest text-[#FF6B6B] bg-[#FF6B6B]/10 px-3 py-1 rounded-full uppercase border border-[#FF6B6B]/20">KVKK & GDPR</span>
            </div>
            <div class="font-heading font-extrabold text-3xl sm:text-4xl text-white mb-1">%99.8</div>
            <div data-i18n="badgeSecurity" class="text-xs font-semibold tracking-wider text-white/70 uppercase">
              Veli Memnuniyeti & %100 Şifreli Güvenli Veri
            </div>
          </div>

        </div>
      </div>
    </main>

    <!-- FOOTER CONTROLS BAR -->
    <footer class="relative z-20 w-full py-6">
      <div class="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        
        <!-- LEFT VIDEO CONTROLS -->
        <div class="flex items-center gap-3">
          <button id="toggleAudioBtn" class="glass-button p-3 rounded-full text-white hover:text-[#FF6B6B] transition-colors cursor-pointer" title="Mute/Unmute Video">
            <i data-lucide="volume-x" class="w-4 h-4"></i>
          </button>
          <button id="togglePlayBtn" class="glass-button p-3 rounded-full text-white hover:text-[#FF6B6B] transition-colors cursor-pointer" title="Play/Pause Video">
            <i data-lucide="pause" class="w-4 h-4"></i>
          </button>
        </div>

        <!-- CENTER SCROLL DOWN INDICATOR -->
        <a href="#features" class="hidden sm:flex flex-col items-center gap-2 group cursor-pointer">
          <div class="w-6 h-10 rounded-full border-2 border-white/30 group-hover:border-[#FF6B6B] flex items-start justify-center p-1.5 transition-colors">
            <div class="w-1.5 h-2.5 rounded-full bg-[#FF6B6B] animate-bounce-slow"></div>
          </div>
          <span class="text-[10px] font-bold tracking-[0.25em] text-white/50 group-hover:text-white uppercase transition-colors">SCROLL DOWN</span>
        </a>

        <!-- RIGHT SYSTEM TAG -->
        <div class="text-[11px] font-bold tracking-widest text-white/40 uppercase">
          KINDERLOG & CARELOG OS v2.4
        </div>
      </div>
    </footer>

    <!-- VIDEO DOCUMENTARY MODAL -->
    <div id="videoModal" class="fixed inset-0 z-50 hidden flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-8">
      <div class="max-w-4xl w-full bg-[#0F172A] border border-white/20 rounded-3xl overflow-hidden shadow-2xl relative">
        <div class="p-6 border-b border-white/10 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <i data-lucide="video" class="w-5 h-5 text-[#FF6B6B]"></i>
            <h3 class="font-heading font-bold text-lg text-white">KinderLog & CareLog — Facility Transformation Demo</h3>
          </div>
          <button id="closeVideoModal" class="glass-button p-2 rounded-full text-white/70 hover:text-white cursor-pointer">
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

# Replace previous landing section
old_section_regex = r'<!-- CREATIVAX BACKGROUND VIDEO & GRADIENT MASKING LAYERS -->[\s\S]*?<!-- FULLSCREEN VIDEO SHOWREEL MODAL -->[\s\S]*?</div>\s*</div>'
if not re.search(old_section_regex, html):
    old_section_regex = r'<!-- BACKGROUND VIDEO LAYER WITH ATMOSPHERIC OVERLAY -->[\s\S]*?<!-- VIDEO DOCUMENTARY MODAL -->[\s\S]*?</div>\s*</div>'

if re.search(old_section_regex, html):
    html = re.sub(old_section_regex, hero_coral_html.strip(), html)
    print("Replaced hero section with Soft Warm Coral KinderLog & CareLog Hero Section!")

# 3. Interactive Logic for Audio, Play/Pause, Video Modal, Mobile Menu
js_coral_logic = '''
  // KinderLog & CareLog Video & Modal Controls
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

    // Video Modal Handlers
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

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
      });
    }
  });
'''

if 'KinderLog & CareLog Video & Modal Controls' not in html and '</script>' in html:
    html = html.replace('</script>', js_coral_logic.strip() + '\n</script>')

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Saved Soft Warm Coral KinderLog & CareLog Hero Section integration!")
