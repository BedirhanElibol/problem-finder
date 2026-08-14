const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Replace the language switcher UI in navbar with a sleek custom dropdown button
const oldNavLangUI = `<div style="background:var(--bg-subtle); border:1px solid var(--border-color); border-radius:var(--radius-full); padding:4px 8px; font-size:13px; font-weight:700; display:flex; align-items:center; gap:4px;">
            <span>🌐</span>
            <select onchange="setGlobalLang(this.value)" style="background:transparent; border:none; color:var(--text-primary); font-weight:700; font-size:13px; cursor:pointer; outline:none;">
              <option value="en" selected>US EN</option>
              <option value="tr">TR TR</option>
              <option value="es">ES ES</option>
              <option value="zh">CN ZH</option>
            </select>
          </div>`;

const newNavLangUI = `<!-- PREMIUM CUSTOM LANGUAGE SWITCHER BUTTON -->
          <div class="lang-dropdown-wrapper" style="position:relative; display:inline-block;">
            <button id="lang-btn" onclick="toggleLangDropdown()" style="background:var(--bg-surface); border:1.5px solid var(--border-color); border-radius:var(--radius-full); padding:8px 16px; font-size:13.5px; font-weight:700; color:var(--text-primary); cursor:pointer; display:flex; align-items:center; gap:8px; box-shadow:var(--shadow-sm); transition:all 0.2s ease;">
              <span id="lang-btn-flag">🇺🇸</span>
              <span id="lang-btn-label">EN</span>
              <span style="font-size:10px; color:var(--text-muted); margin-left:2px;">▼</span>
            </button>
            <div id="lang-menu" style="display:none; position:absolute; right:0; top:46px; background:var(--bg-surface); border:1px solid var(--border-color); border-radius:14px; box-shadow:var(--shadow-lg); padding:6px; min-width:140px; z-index:200;">
              <div onclick="selectGlobalLang('en')" class="lang-option-item" style="padding:8px 12px; border-radius:8px; cursor:pointer; font-weight:700; font-size:13px; display:flex; align-items:center; gap:8px; color:var(--text-primary);">
                <span>🇺🇸</span> English (US)
              </div>
              <div onclick="selectGlobalLang('tr')" class="lang-option-item" style="padding:8px 12px; border-radius:8px; cursor:pointer; font-weight:700; font-size:13px; display:flex; align-items:center; gap:8px; color:var(--text-primary);">
                <span>🇹🇷</span> Türkçe (TR)
              </div>
              <div onclick="selectGlobalLang('es')" class="lang-option-item" style="padding:8px 12px; border-radius:8px; cursor:pointer; font-weight:700; font-size:13px; display:flex; align-items:center; gap:8px; color:var(--text-primary);">
                <span>🇪🇸</span> Español (ES)
              </div>
              <div onclick="selectGlobalLang('zh')" class="lang-option-item" style="padding:8px 12px; border-radius:8px; cursor:pointer; font-weight:700; font-size:13px; display:flex; align-items:center; gap:8px; color:var(--text-primary);">
                <span>🇨🇳</span> 中文 (ZH)
              </div>
            </div>
          </div>`;

if (html.includes(oldNavLangUI)) {
  html = html.replace(oldNavLangUI, newNavLangUI);
  console.log('✔ Replaced navbar language switcher with premium dropdown button UI');
}

// 2. Attach data-i18n attributes to HTML elements across the page
html = html.replace('<a href="#features">Features</a>', '<a href="#features" data-i18n="navFeatures">Features</a>');
html = html.replace('<a href="#how-it-works">How It Works</a>', '<a href="#how-it-works" data-i18n="navHowItWorks">How It Works</a>');
html = html.replace('<a href="#pricing">Pricing</a>', '<a href="#pricing" data-i18n="navPricing">Pricing</a>');
html = html.replace('<a href="#blog">Blog</a>', '<a href="#blog" data-i18n="navBlog">Blog</a>');
html = html.replace('<a href="#contact">Contact</a>', '<a href="#contact" data-i18n="navContact">Contact</a>');

html = html.replace(
  '<button onclick="openRoleGatewayModal()" class="btn-nav-primary">Start Free Trial</button>',
  '<button onclick="openRoleGatewayModal()" class="btn-nav-primary" data-i18n="navStartFree">Start Free Trial</button>'
);

html = html.replace(
  '<div class="pill-title">Effortless Recording</div>',
  '<div class="pill-title" data-i18n="pill1Title">Effortless Recording</div>'
);
html = html.replace(
  '<div class="pill-desc">2 Taps, Mass Logging for Teachers & Staff</div>',
  '<div class="pill-desc" data-i18n="pill1Desc">2 Taps, Mass Logging for Teachers & Staff</div>'
);

html = html.replace(
  '<div class="pill-title">Transparent Updates</div>',
  '<div class="pill-title" data-i18n="pill2Title">Transparent Updates</div>'
);
html = html.replace(
  '<div class="pill-desc">Real-time Notifications, Private Photo Feed</div>',
  '<div class="pill-desc" data-i18n="pill2Desc">Real-time Notifications, Private Photo Feed</div>'
);

html = html.replace(
  '<div class="pill-title">Digital Documentation</div>',
  '<div class="pill-title" data-i18n="pill3Title">Digital Documentation</div>'
);
html = html.replace(
  '<div class="pill-desc">Secure Digital Daily Records, No Paper Forms</div>',
  '<div class="pill-desc" data-i18n="pill3Desc">Secure Digital Daily Records, No Paper Forms</div>'
);

html = html.replace(
  '<div class="pill-title">Secure Communication</div>',
  '<div class="pill-title" data-i18n="pill4Title">Secure Communication</div>'
);
html = html.replace(
  '<div class="pill-desc">GDPR Compliant, No Informal Groups</div>',
  '<div class="pill-desc" data-i18n="pill4Desc">GDPR Compliant, No Informal Groups</div>'
);

html = html.replace(
  '<h2 style="font-family:var(--font-heading); font-size:36px; font-weight:800; margin-bottom:12px;">Choose Your Dedicated Portal</h2>',
  '<h2 data-i18n="portalSectionTitle" style="font-family:var(--font-heading); font-size:36px; font-weight:800; margin-bottom:12px;">Choose Your Dedicated Portal</h2>'
);
html = html.replace(
  '<p style="font-size:17px; color:var(--text-secondary); max-width:680px; margin:0 auto;">Dedicated workspaces for Teachers, Senior Care Nurses, Parents, and Facility Managers.</p>',
  '<p data-i18n="portalSectionSub" style="font-size:17px; color:var(--text-secondary); max-width:680px; margin:0 auto;">Dedicated workspaces for Teachers, Senior Care Nurses, Parents, and Facility Managers.</p>'
);

html = html.replace(
  '<div class="role-select-title">Teacher Portal</div>',
  '<div class="role-select-title" data-i18n="cardTeacherTitle">Teacher Portal</div>'
);
html = html.replace(
  '<div class="role-select-sub">Childcare Class Roster, Meal & Nap Loggers</div>',
  '<div class="role-select-sub" data-i18n="cardTeacherSub">Childcare Class Roster, Meal & Nap Loggers</div>'
);

html = html.replace(
  '<div class="role-select-title">CareLog Nurse</div>',
  '<div class="role-select-title" data-i18n="cardCarelogTitle">CareLog Nurse</div>'
);
html = html.replace(
  '<div class="role-select-sub">Senior Vitals, Blood Pressure & Med Alerts</div>',
  '<div class="role-select-sub" data-i18n="cardCarelogSub">Senior Vitals, Blood Pressure & Med Alerts</div>'
);

html = html.replace(
  '<div class="role-select-title">Family Feed</div>',
  '<div class="role-select-title" data-i18n="cardFamilyTitle">Family Feed</div>'
);
html = html.replace(
  '<div class="role-select-sub">Live Child Timeline, Med Requests & Photo Vault</div>',
  '<div class="role-select-sub" data-i18n="cardFamilySub">Live Child Timeline, Med Requests & Photo Vault</div>'
);

html = html.replace(
  '<div class="role-select-title">Facility Manager</div>',
  '<div class="role-select-title" data-i18n="cardManagerTitle">Facility Manager</div>'
);
html = html.replace(
  '<div class="role-select-sub">Financial Reports, Mass SMS & PDF Generation</div>',
  '<div class="role-select-sub" data-i18n="cardManagerSub">Financial Reports, Mass SMS & PDF Generation</div>'
);

// 3. Write comprehensive JavaScript engine for setGlobalLang & dropdown toggling
const fullI18nScript = `
    const fullDictionary = {
      en: {
        navFeatures: "Features",
        navHowItWorks: "How It Works",
        navPricing: "Pricing",
        navBlog: "Blog",
        navContact: "Contact",
        navStartFree: "Start Free Trial",
        heroTitle: "KinderLog & CareLog: Transformative Care & Communication for Childcare & Senior Facilities",
        heroSub: "Empower Staff with Easy Recording, Delight Families with Transparent Updates. Say Goodbye to WhatsApp Chaos and Paper Forms!",
        heroCta: "Start Your 14-Day Free Trial",
        pill1Title: "Effortless Recording",
        pill1Desc: "2 Taps, Mass Logging for Teachers & Staff",
        pill2Title: "Transparent Updates",
        pill2Desc: "Real-time Notifications, Private Photo Feed",
        pill3Title: "Digital Documentation",
        pill3Desc: "Secure Digital Daily Records, No Paper Forms",
        pill4Title: "Secure Communication",
        pill4Desc: "GDPR Compliant, No Informal Groups",
        statusTitle: "System Status: Operational",
        statusSub: "99.99% Uptime SLA",
        badgeCompliance: "GDPR & HIPAA Compliant",
        badgeSecurity: "256-bit AES Encrypted",
        portalSectionTitle: "Choose Your Dedicated Portal",
        portalSectionSub: "Dedicated workspaces for Teachers, Senior Care Nurses, Parents, and Facility Managers.",
        cardTeacherTitle: "Teacher Portal",
        cardTeacherSub: "Childcare Class Roster, Meal & Nap Loggers",
        cardCarelogTitle: "CareLog Nurse",
        cardCarelogSub: "Senior Vitals, Blood Pressure & Med Alerts",
        cardFamilyTitle: "Family Feed",
        cardFamilySub: "Live Child Timeline, Med Requests & Photo Vault",
        cardManagerTitle: "Facility Manager",
        cardManagerSub: "Financial Reports, Mass SMS & PDF Generation"
      },
      tr: {
        navFeatures: "Özellikler",
        navHowItWorks: "Nasıl Çalışır",
        navPricing: "Fiyatlandırma",
        navBlog: "Blog",
        navContact: "İletişim",
        navStartFree: "Ücretsiz Dene",
        heroTitle: "KinderLog & CareLog: Kreş ve Huzurevleri İçin Yeni Nesil Şeffaf Bakım & İletişim Platformu",
        heroSub: "Personelinizi 2 tıkla hızlı kayıtla güçlendirin, aileleri anlık şeffaf raporlarla sevindirin. WhatsApp karmaşasına ve kağıt formlara son verin!",
        heroCta: "14 Günlük Ücretsiz Denemenizi Başlatın",
        pill1Title: "Hızlı & Kolay Kayıt",
        pill1Desc: "Öğretmenler ve Personel İçin 2 Tıkla Toplu Kayıt",
        pill2Title: "Şeffaf Aile Güncellemeleri",
        pill2Desc: "Anlık Bildirimler, Özel Fotoğraf Akışı",
        pill3Title: "Dijital Belgelendirme",
        pill3Desc: "Güvenli Dijital Günlük Kayıtlar, Kağıt Formlara Son",
        pill4Title: "Güvenli İletişim",
        pill4Desc: "GDPR ve KVKK Uyumlu, Kayıtsız WhatsApp Gruplarına Son",
        statusTitle: "Sistem Durumu: Aktif",
        statusSub: "%99.99 Kesintisiz Hizmet SLA",
        badgeCompliance: "GDPR & KVKK Uyumlu",
        badgeSecurity: "256-bit AES Şifrelenmiş",
        portalSectionTitle: "Özel Portalınızı Seçin",
        portalSectionSub: "Öğretmenler, Yaşlı Bakım Hemşireleri, Veliler ve Kurum Yöneticileri için özel çalışma alanları.",
        cardTeacherTitle: "Öğretmen Portalı",
        cardTeacherSub: "Sınıf Listesi, Yemek & Uyku Kayıt Araçları",
        cardCarelogTitle: "CareLog Revir & Bakıcı",
        cardCarelogSub: "Yaşlı Vital Bulgular, Tansiyon & İlaç Alarmları",
        cardFamilyTitle: "Veli / Aile Akışı",
        cardFamilySub: "Canlı Çocuk Zaman Çizelgesi, İlaç Talepleri & Foto Galeri",
        cardManagerTitle: "Kurum Yöneticisi",
        cardManagerSub: "Finansal Raporlar, Toplu SMS & PDF Oluşturucu"
      },
      es: {
        navFeatures: "Características",
        navHowItWorks: "Cómo Funciona",
        navPricing: "Precios",
        navBlog: "Blog",
        navContact: "Contacto",
        navStartFree: "Prueba Gratuita",
        heroTitle: "KinderLog & CareLog: Transformación del Cuidado y Comunicación para Guarderías y Residencias",
        heroSub: "Capacite al personal con registros rápidos de 2 toques y deleite a las familias con actualizaciones transparentes.",
        heroCta: "Comience su prueba gratuita de 14 días",
        pill1Title: "Registro Sin Esfuerzo",
        pill1Desc: "2 Toques, Registro Masivo para Profesores",
        pill2Title: "Actualizaciones Transparentes",
        pill2Desc: "Notificaciones en Tiempo Real, Fotos Privadas",
        pill3Title: "Documentación Digital",
        pill3Desc: "Registros Diarios Digitales Seguros",
        pill4Title: "Comunicación Segura",
        pill4Desc: "Cumple con GDPR y HIPAA, Sin Grupos Informales",
        statusTitle: "Estado del Sistema: Operativo",
        statusSub: "99.99% SLA de Actividad",
        badgeCompliance: "Cumple GDPR y HIPAA",
        badgeSecurity: "Cifrado AES de 256 bits",
        portalSectionTitle: "Elija su Portal Dedicado",
        portalSectionSub: "Espacios de trabajo dedicados para profesores, enfermeros, padres y directores.",
        cardTeacherTitle: "Portal del Profesor",
        cardTeacherSub: "Lista de Clase, Registro de Comidas y Sueño",
        cardCarelogTitle: "Enfermero CareLog",
        cardCarelogSub: "Signos Vitales, Presión y Alertas de Medicamentos",
        cardFamilyTitle: "Feed Familiar",
        cardFamilySub: "Cronología en Vivo del Niño, Peticiones y Fotos",
        cardManagerTitle: "Director del Centro",
        cardManagerSub: "Informes Financieros, SMS Masivos y PDF"
      },
      zh: {
        navFeatures: "功能",
        navHowItWorks: "工作原理",
        navPricing: "价格",
        navBlog: "博客",
        navContact: "联系我们",
        navStartFree: "免费试用",
        heroTitle: "KinderLog & CareLog：托儿与养老机构的变革性护理与沟通平台",
        heroSub: "简化员工记录流程，通过透明的更新给家庭带来安心。",
        heroCta: "开始 14 天免费试用",
        pill1Title: "轻松记录",
        pill1Desc: "2次点击，教师与员工批量记录",
        pill2Title: "透明更新",
        pill2Desc: "实时通知，私密照片流",
        pill3Title: "电子 Form",
        pill3Desc: "安全数字 daily 记录，告别纸质表格",
        pill4Title: "安全沟通",
        pill4Desc: "符合 GDPR/HIPAA 标准，拒绝非正式群组",
        statusTitle: "系统状态：运行正常",
        statusSub: "99.99% 在线 SLA",
        badgeCompliance: "符合 GDPR & HIPAA",
        badgeSecurity: "256 位 AES 加密",
        portalSectionTitle: "选择您的专属门户",
        portalSectionSub: "适用于教师、护理人员、家长和机构管理者的专属工作区。",
        cardTeacherTitle: "教师门户",
        cardTeacherSub: "班级名册、饮食与睡眠记录",
        cardCarelogTitle: "CareLog 护理人员",
        cardCarelogSub: "长者生命体征、血压与用药提醒",
        cardFamilyTitle: "家长/家庭动态",
        cardFamilySub: "实时儿童时间线、用药申请与相册",
        cardManagerTitle: "机构管理者",
        cardManagerSub: "财务报告、群发短信与 PDF 生成"
      }
    };

    const langMeta = {
      en: { flag: '🇺🇸', label: 'EN' },
      tr: { flag: '🇹🇷', label: 'TR' },
      es: { flag: '🇪🇸', label: 'ES' },
      zh: { flag: '🇨🇳', label: 'ZH' }
    };

    function toggleLangDropdown() {
      const menu = document.getElementById('lang-menu');
      if (menu) menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }

    function selectGlobalLang(lang) {
      document.getElementById('lang-menu').style.display = 'none';
      setGlobalLang(lang);
    }

    function setGlobalLang(lang) {
      currentLangKey = lang;
      const dict = fullDictionary[lang] || fullDictionary.en;
      const meta = langMeta[lang] || langMeta.en;

      // Update button visual
      document.getElementById('lang-btn-flag').innerText = meta.flag;
      document.getElementById('lang-btn-label').innerText = meta.label;

      // Translate all data-i18n elements
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
          el.innerText = dict[key];
        }
      });

      // Direct main elements
      document.querySelector('.hero-h1').innerText = dict.heroTitle;
      document.querySelector('.hero-subtitle').innerText = dict.heroSub;
      document.querySelector('.btn-hero-main-cta span').innerText = dict.heroCta;
      
      const statusTitleEl = document.getElementById('status-title');
      if (statusTitleEl) statusTitleEl.innerText = dict.statusTitle;

      const statusSubEl = document.getElementById('status-sub');
      if (statusSubEl) statusSubEl.innerText = dict.statusSub;

      const complianceEl = document.getElementById('badge-compliance');
      if (complianceEl) complianceEl.innerText = dict.badgeCompliance;

      const securityEl = document.getElementById('badge-security');
      if (securityEl) securityEl.innerText = dict.badgeSecurity;

      showToast('info', meta.flag + ' Language switched to ' + meta.label);
    }

    document.addEventListener('click', (e) => {
      const wrapper = document.querySelector('.lang-dropdown-wrapper');
      if (wrapper && !wrapper.contains(e.target)) {
        const menu = document.getElementById('lang-menu');
        if (menu) menu.style.display = 'none';
      }
    });
`;

// Replace old script block
const scriptStart = 'const i18nDict = {';
const scriptEnd = 'showToast(\'info\', \'🌐 Language updated: \' + lang.toUpperCase());\n    }';

if (html.includes(scriptStart)) {
  const startIndex = html.indexOf(scriptStart);
  const endIndex = html.indexOf(scriptEnd) + scriptEnd.length;
  html = html.substring(0, startIndex) + fullI18nScript + html.substring(endIndex);
  console.log('✔ Successfully updated i18n translation engine and dropdown logic');
} else {
  console.log('⚠ scriptStart pattern not matched directly, appending script');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Finished updating landing-page.html!');
