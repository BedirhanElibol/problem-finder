import os
import re

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Applying Ultra HD UI/UX Pro Max & Frontend Design Redesign...")

# 1. Replace <head> fonts & Tailwind Config
new_head_fonts_and_config = '''
  <!-- Ultra HD Fonts: Outfit & Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
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
              darkBg: '#061216',
              surface: '#0b191e',
              glow: 'rgba(16, 185, 129, 0.4)'
            }
          },
          fontFamily: {
            heading: ['Outfit', 'sans-serif'],
            sans: ['Plus Jakarta Sans', 'sans-serif']
          },
          animation: {
            'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            'bounce-slow': 'bounce 2.5s infinite',
            'float': 'float 6s ease-in-out infinite'
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
      background-color: #061216;
      color: #ffffff;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    
    .hd-glass-nav {
      background: rgba(11, 25, 30, 0.75);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    }
    
    .hd-glass-card {
      background: rgba(255, 255, 255, 0.04);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .hd-glass-card:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(52, 211, 153, 0.5);
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(16, 185, 129, 0.2);
    }
    
    .hd-glass-button {
      background: rgba(255, 255, 255, 0.06);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.25s ease;
    }
    
    .hd-glass-button:hover {
      background: rgba(255, 255, 255, 0.16);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-1px);
    }
    
    .text-hd-glow {
      text-shadow: 0 0 30px rgba(52, 211, 153, 0.5);
    }
    
    .text-title-shadow {
      text-shadow: 0 4px 30px rgba(0, 0, 0, 0.8);
    }
  </style>
'''

# Replace head fonts & config
html = re.sub(r'<!-- EarthGuard Glassmorphism[\s\S]*?</style>', new_head_fonts_and_config.strip(), html)

# 2. Build Ultra HD Landing Page Section (Nav + Hero + HD Canvas)
hd_landing_section = '''<!-- ULTRA HD GRAPHICS CANVAS BACKGROUND -->
    <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas id="hdParticleCanvas" class="w-full h-full opacity-60"></canvas>
      <div class="absolute inset-0 bg-gradient-to-b from-[#061216]/80 via-[#061216]/50 to-[#061216] pointer-events-none"></div>
    </div>

    <!-- FLOATING ULTRA HD GLASS NAV HEADER -->
    <header class="w-full fixed top-5 left-0 right-0 z-50 px-4 sm:px-8">
      <div class="max-w-6xl mx-auto h-16 sm:h-20 px-6 rounded-full hd-glass-nav flex items-center justify-between">
        
        <!-- LOGO AREA -->
        <a href="#" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-600 to-emerald-400 p-[1.5px] shadow-lg shadow-emerald-500/20">
            <div class="w-full h-full rounded-full bg-[#0b191e] flex items-center justify-center">
              <i data-lucide="shield-check" class="w-5 h-5 text-emerald-400"></i>
            </div>
          </div>
          <div>
            <div class="font-heading font-black tracking-wide text-lg sm:text-xl text-white group-hover:text-emerald-400 transition-colors">
              KINDERLOG <span class="text-emerald-400">& CareLog</span>
            </div>
            <div class="text-[9px] font-bold tracking-[0.25em] text-emerald-400/80 uppercase">SAAS CARE PLATFORM</div>
          </div>
        </a>

        <!-- DESKTOP NAV LINKS -->
        <nav class="hidden md:flex items-center gap-8">
          <a href="#features" data-i18n="navFeatures" class="text-xs font-bold tracking-widest text-slate-300 hover:text-white uppercase transition-colors">Özellikler</a>
          <a href="#how-it-works" data-i18n="navHowItWorks" class="text-xs font-bold tracking-widest text-slate-300 hover:text-white uppercase transition-colors">Nasıl Çalışır</a>
          <a href="#pricing" data-i18n="navPricing" class="text-xs font-bold tracking-widest text-slate-300 hover:text-white uppercase transition-colors">Fiyatlandırma</a>
          <a href="#contact" data-i18n="navContact" class="text-xs font-bold tracking-widest text-slate-300 hover:text-white uppercase transition-colors">İletişim</a>
        </nav>

        <!-- RIGHT ACTION GROUP -->
        <div class="flex items-center gap-3 sm:gap-4">
          
          <!-- GLOBAL i18n LANGUAGE DROPDOWN -->
          <div class="lang-dropdown-wrapper relative inline-block">
            <button id="lang-btn" onclick="toggleLangDropdown()" class="hd-glass-button px-3 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer">
              <span id="lang-btn-flag">🇹🇷</span>
              <span id="lang-btn-label">TR</span>
              <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400"></i>
            </button>
            <div id="lang-menu" class="hidden absolute right-0 top-11 bg-[#0b191e]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-2 min-w-[150px] shadow-2xl z-50">
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
          <button onclick="openRoleGatewayModal()" data-i18n="navLogin" class="btn-nav-login hd-glass-button px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase text-white hover:border-emerald-400 hover:text-emerald-400 cursor-pointer">
            Giriş Yap
          </button>

          <!-- GET STARTED CTA BUTTON -->
          <button onclick="openRoleGatewayModal()" data-i18n="navStartFree" class="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black px-5 py-2 rounded-full text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all transform hover:scale-105 cursor-pointer">
            Ücretsiz Deneyin
          </button>
        </div>
      </div>
    </header>

    <!-- MAIN HERO CONTENT SECTION -->
    <main class="relative z-10 pt-36 sm:pt-44 pb-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <!-- LEFT TYPOGRAPHY COLUMN -->
        <div class="lg:col-span-7 space-y-6">
          
          <!-- TAGLINE BADGE -->
          <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full hd-glass-card border-emerald-500/30">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span data-i18n="heroTag" class="text-xs font-bold tracking-widest text-emerald-400 uppercase">
              ÇOCUK & YAŞLI BAKIMINDA YENİ NESİL STANDART
            </span>
          </div>

          <!-- MAIN HEADLINE -->
          <div class="space-y-2">
            <h1 data-i18n="heroTitle" class="hero-h1 font-heading font-black text-4xl sm:text-6xl xl:text-[58px] leading-[1.08] uppercase tracking-tight text-white text-title-shadow">
              KİNDERLOG & CARELOG:
            </h1>
            <div class="font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 text-3xl sm:text-5xl xl:text-[52px] leading-tight text-hd-glow">
              Kreş ve Huzurevleri İçin Şeffaf Bakım Platformu.
            </div>
          </div>

          <!-- SUBTITLE PARAGRAPH -->
          <p data-i18n="heroSub" class="hero-subtitle text-slate-300 text-base sm:text-lg font-medium max-w-xl leading-relaxed">
            Personelinizi 2 tıkla hızlı kayıtla güçlendirin, aileleri anlık şeffaf raporlarla sevindirin. WhatsApp karmaşasına ve kağıt formlara son verin!
          </p>

          <!-- BUTTON ACTION GROUP -->
          <div class="flex flex-wrap items-center gap-4 pt-4">
            <!-- PRIMARY CTA -->
            <button onclick="openRoleGatewayModal()" data-i18n="heroCta" class="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm tracking-widest uppercase px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-emerald-500/30 cursor-pointer">
              <i data-lucide="shield-check" class="w-5 h-5 text-slate-950"></i>
              <span>14 Gün Ücretsiz Deneyin</span>
            </button>

            <!-- SECONDARY CTA: WATCH VIDEO DEMO -->
            <button id="openVideoModal" data-i18n="heroSecondaryCta" class="hd-glass-button text-white font-bold text-xs sm:text-sm tracking-widest uppercase px-7 py-4 rounded-full flex items-center gap-3 transition-all hover:border-emerald-400/60 cursor-pointer">
              <div class="w-6 h-6 rounded-full bg-emerald-400/20 flex items-center justify-center border border-emerald-400/40">
                <i data-lucide="play" class="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 ml-0.5"></i>
              </div>
              <span>Canlı Demo Görün</span>
            </button>
          </div>
        </div>

        <!-- RIGHT STATS COLUMN (HD GLASS CARDS) -->
        <div class="lg:col-span-5 flex flex-col justify-center items-center lg:items-end space-y-6">
          
          <!-- STAT CARD 1 -->
          <div class="hd-glass-card p-6 rounded-3xl w-full max-w-md border border-white/15">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <i data-lucide="heart-pulse" class="w-6 h-6 text-emerald-400"></i>
              </div>
              <span class="text-[10px] font-extrabold tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full uppercase border border-emerald-500/20">LIVE CANLI PLATFORM</span>
            </div>
            <div class="font-heading font-black text-4xl text-white mb-1">500+</div>
            <div data-i18n="trustTitle" class="text-xs font-bold tracking-wider text-slate-300 uppercase">
              Seçkin Kreş, Anaokulu & Yaşlı Bakımevi Güvenle Kullanıyor
            </div>
          </div>

          <!-- STAT CARD 2 -->
          <div class="hd-glass-card p-6 rounded-3xl w-full max-w-md border border-white/15">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <i data-lucide="lock" class="w-6 h-6 text-emerald-400"></i>
              </div>
              <span data-i18n="badgeCompliance" class="text-[10px] font-extrabold tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full uppercase border border-emerald-500/20">KVKK & GDPR COMPLIANT</span>
            </div>
            <div class="font-heading font-black text-4xl text-white mb-1">%99.8</div>
            <div data-i18n="badgeSecurity" class="text-xs font-bold tracking-wider text-slate-300 uppercase">
              Veli Memnuniyeti & Uçtan Uca Şifreli Veri Güvenliği
            </div>
          </div>

        </div>
      </div>
    </main>

    <!-- FOOTER CONTROLS BAR -->
    <footer class="relative z-20 w-full py-6">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        
        <!-- LEFT SYSTEM TAG -->
        <div class="flex items-center gap-3">
          <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <div class="text-xs font-extrabold tracking-widest text-slate-400 uppercase">
            KINDERLOG & CARELOG OS v2.4 — ULTRA HD
          </div>
        </div>

        <!-- CENTER SCROLL DOWN INDICATOR -->
        <a href="#features" class="hidden sm:flex flex-col items-center gap-2 group cursor-pointer">
          <div class="w-6 h-10 rounded-full border-2 border-white/30 group-hover:border-emerald-400 flex items-start justify-center p-1.5 transition-colors">
            <div class="w-1.5 h-2.5 rounded-full bg-emerald-400 animate-bounce-slow"></div>
          </div>
          <span class="text-[10px] font-bold tracking-[0.25em] text-slate-400 group-hover:text-white uppercase transition-colors">SCROLL DOWN</span>
        </a>

        <!-- RIGHT SECURITY CUE -->
        <div class="text-xs font-bold tracking-wider text-emerald-400 uppercase flex items-center gap-2">
          <i data-lucide="shield-check" class="w-4 h-4"></i>
          <span>%100 KVKK & GDPR READY</span>
        </div>
      </div>
    </footer>

    <!-- VIDEO DOCUMENTARY DEMO MODAL -->
    <div id="videoModal" class="fixed inset-0 z-50 hidden flex items-center justify-center bg-black/85 backdrop-blur-2xl p-4 sm:p-8">
      <div class="max-w-4xl w-full bg-[#0b191e] border border-white/20 rounded-3xl overflow-hidden shadow-2xl relative">
        <div class="p-6 border-b border-white/10 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <i data-lucide="video" class="w-5 h-5 text-emerald-400"></i>
            <h3 class="font-heading font-bold text-lg text-white">KinderLog & CareLog — Facility Transformation Demo</h3>
          </div>
          <button id="closeVideoModal" class="hd-glass-button p-2 rounded-full text-white/70 hover:text-white cursor-pointer">
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

# Replace previous background video & main container in landing-page.html
old_section_regex = r'<!-- BACKGROUND VIDEO LAYER WITH ATMOSPHERIC OVERLAY -->[\s\S]*?<!-- VIDEO DOCUMENTARY MODAL -->[\s\S]*?</div>\s*</div>'
if re.search(old_section_regex, html):
    html = re.sub(old_section_regex, hd_landing_section.strip(), html)
    print("Replaced old section with Ultra HD Glassmorphism Section!")

# Add HD Interactive Particle Canvas JS script
hd_canvas_js = '''
  // Ultra HD Particle Canvas Renderer
  document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('hdParticleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.5 + 1,
        color: i % 2 === 0 ? 'rgba(52, 211, 153, ' + (Math.random() * 0.4 + 0.1) + ')' : 'rgba(13, 148, 136, ' + (Math.random() * 0.4 + 0.1) + ')',
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw glowing radial spheres
      const g1 = ctx.createRadialGradient(canvas.width * 0.3, canvas.height * 0.4, 10, canvas.width * 0.3, canvas.height * 0.4, 400);
      g1.addColorStop(0, 'rgba(16, 185, 129, 0.12)');
      g1.addColorStop(1, 'rgba(6, 18, 22, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(52, 211, 153, 0.6)';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }
    animate();
  });
'''

if 'hdParticleCanvas' in html and 'Ultra HD Particle Canvas Renderer' not in html:
    html = html.replace('</script>', hd_canvas_js.strip() + '\n</script>')

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Saved Ultra HD UI/UX Pro Max Landing Page!")
