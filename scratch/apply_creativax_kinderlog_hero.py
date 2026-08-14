import os
import re
import json

# Load base64 avatars
with open("scratch/avatar_base64.json", "r", encoding="utf-8") as f:
    avatars = json.load(f)

av1 = avatars.get("kindergarten_teacher_avatar_1786654816944.png", "")
av2 = avatars.get("senior_caregiver_avatar_1786654829719.png", "")
av3 = avatars.get("family_parent_avatar_1786654841637.png", "")
av4 = avatars.get("facility_director_avatar_1786654853363.png", "")

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Building CreativaX Warm Cream Hero Section for KinderLog & CareLog...")

# 1. Update <head> fonts, Tailwind Config & Warm Cream CSS
creativax_head = f'''
  <!-- CreativaX Google Fonts: Plus Jakarta Sans & Instrument Serif -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN with Custom Extended Colors -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {{
      darkMode: 'class',
      theme: {{
        extend: {{
          colors: {{
            cream: {{
              bg: '#F5EFE6',
              soft: '#FAF7F2',
              border: '#EADFCF'
            }},
            studio: {{
              orange: '#DE5D35',
              dark: '#161514',
              muted: '#635E59'
            }}
          }},
          fontFamily: {{
            sans: ['Plus Jakarta Sans', 'sans-serif'],
            serif: ['"Instrument Serif"', 'serif']
          }}
        }}
      }}
    }}
  </script>

  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <style>
    html {{
      scrollbar-width: none;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }}
    html::-webkit-scrollbar {{ display: none; }}

    body {{
      background-color: #F5EFE6;
      color: #161514;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }}
    
    .nav-link-hover {{
      position: relative;
    }}
    .nav-link-hover::after {{
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: #DE5D35;
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }}
    .nav-link-hover:hover::after {{
      width: 100%;
    }}
    
    .creativax-btn-primary {{
      background-color: #161514;
      color: #ffffff;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }}
    .creativax-btn-primary:hover {{
      background-color: #DE5D35;
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(222, 93, 53, 0.3);
    }}

    .creativax-btn-outline {{
      border: 1.5px solid #161514;
      color: #161514;
      background: transparent;
      transition: all 0.3s ease;
    }}
    .creativax-btn-outline:hover {{
      background: #161514;
      color: #ffffff;
      border-color: #161514;
    }}
  </style>
'''

# Replace head fonts & styles
html = re.sub(r'<!-- Ultra HD Fonts[\s\S]*?</style>', creativax_head.strip(), html)

# 2. Build CreativaX Hero HTML Section
creativax_hero_html = f'''<!-- CREATIVAX BACKGROUND VIDEO & GRADIENT MASKING LAYERS -->
    <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <video id="heroVideo" autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover scale-105">
        <source src="https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/creative_studio_video.mp4" type="video/mp4">
      </video>
      
      <!-- LAYER 1: LEFT COLUMN GRADIENT COVERING LEFT 45% FOR TEXT READABILITY -->
      <div class="absolute inset-y-0 left-0 w-full lg:w-[48%] bg-gradient-to-r from-[#F5EFE6] via-[#F5EFE6]/95 to-transparent"></div>
      
      <!-- LAYER 2: TOP NAVIGATION OVERLAY GRADIENT -->
      <div class="absolute top-0 inset-x-0 h-48 sm:h-56 lg:h-64 bg-gradient-to-b from-[#F5EFE6] via-[#F5EFE6]/95 via-[#F5EFE6]/60 to-transparent"></div>
      
      <!-- LAYER 3: BOTTOM OVERLAY GRADIENT -->
      <div class="absolute bottom-0 inset-x-0 h-48 sm:h-56 lg:h-64 bg-gradient-to-t from-[#F5EFE6] via-[#F5EFE6]/95 via-[#F5EFE6]/60 to-transparent"></div>
    </div>

    <!-- FULL-WIDTH OUTER WRAPPER CONTAINER -->
    <div class="relative z-10 w-full min-h-screen px-6 sm:px-12 lg:px-16 py-6 flex flex-col justify-between">
      
      <!-- TOP NAVIGATION BAR -->
      <header class="w-full flex items-center justify-between">
        
        <!-- LOGO AREA -->
        <a href="#" class="flex items-center gap-1 group">
          <span class="font-sans font-extrabold text-2xl sm:text-3xl tracking-tight text-[#161514]">CreativaX<span class="text-[#DE5D35]">.</span></span>
          <span class="text-[10px] font-bold tracking-widest text-[#635E59] uppercase ml-2 hidden sm:inline-block">KINDERLOG & CARELOG</span>
        </a>

        <!-- DESKTOP NAV LINKS -->
        <nav class="hidden md:flex items-center gap-8 lg:gap-10">
          <a href="#features" data-i18n="navFeatures" class="nav-link-hover text-xs lg:text-sm font-bold tracking-wider text-[#161514] uppercase py-1">Work</a>
          <a href="#how-it-works" data-i18n="navHowItWorks" class="nav-link-hover text-xs lg:text-sm font-bold tracking-wider text-[#161514] uppercase py-1">Services</a>
          <a href="#pricing" data-i18n="navPricing" class="nav-link-hover text-xs lg:text-sm font-bold tracking-wider text-[#161514] uppercase py-1">Pricing</a>
          <a href="#contact" data-i18n="navContact" class="nav-link-hover text-xs lg:text-sm font-bold tracking-wider text-[#161514] uppercase py-1">Contact</a>
        </nav>

        <!-- RIGHT ACTION GROUP -->
        <div class="flex items-center gap-3 sm:gap-4">
          
          <!-- GLOBAL i18n LANGUAGE DROPDOWN -->
          <div class="lang-dropdown-wrapper relative inline-block">
            <button id="lang-btn" onclick="toggleLangDropdown()" class="creativax-btn-outline px-3.5 py-2 rounded-full text-xs font-bold tracking-wider flex items-center gap-1.5 cursor-pointer">
              <span id="lang-btn-flag">🇹🇷</span>
              <span id="lang-btn-label">TR</span>
              <i data-lucide="chevron-down" class="w-3.5 h-3.5"></i>
            </button>
            <div id="lang-menu" class="hidden absolute right-0 top-12 bg-[#FAF7F2] border border-[#EADFCF] rounded-2xl p-2 min-w-[150px] shadow-xl z-50">
              <div onclick="selectGlobalLang('en')" class="lang-option-item px-3 py-2 rounded-xl cursor-pointer hover:bg-[#F5EFE6] text-xs font-bold flex items-center gap-2 text-[#161514]">
                <span>🇺🇸</span> English (US)
              </div>
              <div onclick="selectGlobalLang('tr')" class="lang-option-item px-3 py-2 rounded-xl cursor-pointer hover:bg-[#F5EFE6] text-xs font-bold flex items-center gap-2 text-[#161514]">
                <span>🇹🇷</span> Türkçe (TR)
              </div>
              <div onclick="selectGlobalLang('es')" class="lang-option-item px-3 py-2 rounded-xl cursor-pointer hover:bg-[#F5EFE6] text-xs font-bold flex items-center gap-2 text-[#161514]">
                <span>🇪🇸</span> Español (ES)
              </div>
              <div onclick="selectGlobalLang('zh')" class="lang-option-item px-3 py-2 rounded-xl cursor-pointer hover:bg-[#F5EFE6] text-xs font-bold flex items-center gap-2 text-[#161514]">
                <span>🇨🇳</span> 中文 (ZH)
              </div>
            </div>
          </div>

          <!-- LOGIN BUTTON -->
          <button onclick="openRoleGatewayModal()" data-i18n="navLogin" class="btn-nav-login creativax-btn-outline px-5 py-2.5 rounded-full text-xs font-extrabold tracking-wider uppercase cursor-pointer">
            Giriş Yap
          </button>

          <!-- CONTACT US / START TRIAL CTA -->
          <button onclick="openRoleGatewayModal()" data-i18n="navStartFree" class="creativax-btn-primary px-6 py-2.5 rounded-full text-xs font-extrabold tracking-wider uppercase flex items-center gap-2 cursor-pointer">
            <span>Contact Us</span>
            <i data-lucide="arrow-up-right" class="w-4 h-4 text-[#DE5D35]"></i>
          </button>

          <!-- MOBILE MENU BUTTON -->
          <button id="mobileMenuBtn" class="md:hidden creativax-btn-outline p-2.5 rounded-full text-[#161514]">
            <i data-lucide="menu" class="w-5 h-5"></i>
          </button>
        </div>
      </header>

      <!-- MAIN HERO CONTENT (LEFT COLUMN) -->
      <main class="my-auto py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div class="lg:col-span-7 xl:col-span-6 space-y-6">
          
          <!-- CATEGORY TAG -->
          <div class="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-[#DE5D35] uppercase flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#DE5D35] animate-pulse"></span>
            <span data-i18n="heroTag">• WE CARE • WE CONNECT • WE PROTECT</span>
          </div>

          <!-- DISPLAY HEADLINE -->
          <div class="space-y-1">
            <h1 data-i18n="heroTitle" class="hero-h1 font-sans font-black text-5xl sm:text-7xl xl:text-[80px] leading-[1.05] tracking-tight text-[#161514]">
              Care That
            </h1>
            <div class="font-serif italic font-normal text-[#DE5D35] text-6xl sm:text-8xl xl:text-[92px] leading-tight block">
              Inspires.
            </div>
          </div>

          <!-- SUBTITLE PARAGRAPH -->
          <p data-i18n="heroSub" class="hero-subtitle text-[#635E59] text-base sm:text-lg font-medium max-w-xl leading-relaxed">
            We help childcare facilities and senior care homes turn daily logs into transparent, meaningful family connections. Say goodbye to paper forms and WhatsApp chaos!
          </p>

          <!-- ACTION BUTTONS -->
          <div class="flex flex-wrap items-center gap-4 pt-4">
            <!-- PRIMARY CTA -->
            <button onclick="openRoleGatewayModal()" data-i18n="heroCta" class="creativax-btn-primary px-8 py-4 rounded-full text-xs sm:text-sm font-extrabold tracking-widest uppercase flex items-center gap-3 cursor-pointer group">
              <span>See Our Work</span>
              <i data-lucide="arrow-up-right" class="w-4 h-4 text-[#DE5D35] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
            </button>

            <!-- SECONDARY CTA: SHOWREEL MODAL -->
            <button id="openVideoModal" data-i18n="heroSecondaryCta" class="creativax-btn-outline px-7 py-4 rounded-full text-xs sm:text-sm font-extrabold tracking-widest uppercase flex items-center gap-3 cursor-pointer">
              <i data-lucide="play" class="w-4 h-4 text-[#DE5D35] fill-[#DE5D35]"></i>
              <span>Showreel İzleyin</span>
            </button>
          </div>

          <!-- SOCIAL PROOF STACK (4 OVERLAPPING CIRCULAR AI AVATARS) -->
          <div class="pt-6 flex items-center gap-4 border-t border-[#EADFCF]/60">
            <div class="flex -space-x-3 overflow-hidden">
              <img class="inline-block h-11 w-11 rounded-full ring-2 ring-[#F5EFE6] object-cover" src="{av1}" alt="Kindergarten Teacher">
              <img class="inline-block h-11 w-11 rounded-full ring-2 ring-[#F5EFE6] object-cover" src="{av2}" alt="Senior Caregiver">
              <img class="inline-block h-11 w-11 rounded-full ring-2 ring-[#F5EFE6] object-cover" src="{av3}" alt="Family Parent">
              <img class="inline-block h-11 w-11 rounded-full ring-2 ring-[#F5EFE6] object-cover" src="{av4}" alt="Facility Director">
            </div>
            <div>
              <div class="text-xs font-black tracking-wider text-[#161514] uppercase">500+ Facilities & Care Homes</div>
              <div class="text-[11px] font-semibold text-[#635E59]" data-i18n="trustTitle">Trusted by 200+ brands worldwide</div>
            </div>
          </div>

        </div>

        <!-- RIGHT CLEAR ARTWORK AREA (Preserved 100% bright and visible over video) -->
        <div class="hidden lg:block lg:col-span-5 xl:col-span-6"></div>

      </main>

      <!-- FOOTER CONTROLS BAR -->
      <footer class="w-full flex items-center justify-between pt-4 border-t border-[#EADFCF]/60 text-xs font-bold text-[#635E59]">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-[#DE5D35] animate-pulse"></span>
          <span class="tracking-widest uppercase text-[#161514]">CREATIVAX STUDIO • KINDERLOG OS</span>
        </div>

        <div class="hidden sm:flex items-center gap-6 tracking-widest uppercase">
          <span>• 100% KVKK & GDPR COMPLIANT</span>
          <span>• 24/7 SUPPORT</span>
        </div>
      </footer>
    </div>

    <!-- FULLSCREEN VIDEO SHOWREEL MODAL -->
    <div id="videoModal" class="fixed inset-0 z-50 hidden flex items-center justify-center bg-[#161514]/90 backdrop-blur-2xl p-4 sm:p-8">
      <div class="max-w-4xl w-full bg-[#FAF7F2] border border-[#EADFCF] rounded-3xl overflow-hidden shadow-2xl relative">
        <div class="p-6 border-b border-[#EADFCF] flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="w-3 h-3 rounded-full bg-[#DE5D35]"></span>
            <h3 class="font-sans font-bold text-lg text-[#161514]">CreativaX — KinderLog & CareLog Studio Showreel</h3>
          </div>
          <button id="closeVideoModal" class="creativax-btn-outline p-2 rounded-full text-[#161514] cursor-pointer">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>
        <div class="aspect-video w-full bg-black relative">
          <video id="modalVideo" controls class="w-full h-full object-cover">
            <source src="https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/creative_studio_video.mp4" type="video/mp4">
          </video>
        </div>
      </div>
    </div>
'''

# Replace old landing section regex
old_section_regex = r'<!-- ULTRA HD GRAPHICS CANVAS BACKGROUND -->[\s\S]*?<!-- VIDEO DOCUMENTARY DEMO MODAL -->[\s\S]*?</div>\s*</div>'
if not re.search(old_section_regex, html):
    old_section_regex = r'<!-- BACKGROUND VIDEO LAYER WITH ATMOSPHERIC OVERLAY -->[\s\S]*?<!-- VIDEO DOCUMENTARY MODAL -->[\s\S]*?</div>\s*</div>'

if re.search(old_section_regex, html):
    html = re.sub(old_section_regex, creativax_hero_html.strip(), html)
    print("Replaced hero section with CreativaX Studio Warm Cream Hero Section!")

# 3. Add JS playbackRate = 0.7 & Lucide icons initialization
creativax_js = '''
  // CreativaX Video Playback Rate & Modal Control
  document.addEventListener('DOMContentLoaded', function() {
    if (window.lucide) lucide.createIcons();

    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
      heroVideo.playbackRate = 0.7; // Smooth ambient motion
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
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !videoModal.classList.contains('hidden')) {
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
'''

if 'playbackRate = 0.7' not in html and '</script>' in html:
    html = html.replace('</script>', creativax_js.strip() + '\n</script>')

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Saved CreativaX Hero Section integration!")
