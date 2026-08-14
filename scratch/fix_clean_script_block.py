import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Rebuilding clean script block in landing-page.html...")

clean_script = '''<script>
  window.currentLangKey = localStorage.getItem('app_lang') || 'tr';
  var currentLangKey = window.currentLangKey;

  const fullDictionary = {
    en: {
      heroTitle: "KinderLog & CareLog: Transformative Care & Communication for Childcare & Senior Facilities",
      heroSub: "Empower Staff with Easy Recording, Delight Families with Transparent Updates. Say Goodbye to WhatsApp Chaos and Paper Forms!",
      navFeatures: "Features",
      navHowItWorks: "How It Works",
      navPricing: "Pricing",
      navBlog: "Blog",
      navContact: "Contact",
      navLogin: "Login",
      navStartFree: "Start Free Trial",
      lblCategory: "Category",
      lblValue: "Value / Status",
      lblNote: "Notes / Description",
      heroMeal: "Meal",
      heroSleep: "Sleep",
      heroActivity: "Activity",
      heroPhoto: "Photo",
      heroTag: "Transformative Care & Communication Standard",
      heroCta: "Start 14-Day Free Trial",
      heroSecondaryCta: "See Live Demo",
      trustTitle: "Trusted by 500+ Top Childcare & Senior Facilities",
      featSectionTag: "Why KinderLog & CareLog?",
      featSectionTitle: "Manage Facility Operations from a Single Interface",
      feat1Title: "Fast Findings & Daily Logs",
      feat1Desc: "Teachers and caregivers log meal, sleep, vitals, and activity findings in seconds.",
      feat2Title: "Transparent Family Communication",
      feat2Desc: "Photos, announcements, and daily reports delivered instantly to family app.",
      feat3Title: "Health & Infirmary Tracking",
      feat3Desc: "Infirmary nurses track temperature, vitals, and medication doses accurately.",
      feat4Title: "Facility Operations & Security",
      feat4Desc: "Class capacity, staff permissions, and end-to-end audit reporting in one dashboard.",
      pricingTag: "Flexible & Transparent Pricing",
      pricingTitle: "Choose the Perfect Plan for Your Facility",
      pricingSub: "No hidden fees, no setup costs. Cancel anytime.",
      plan1Title: "Starter Facility",
      plan1Price: "$49",
      plan1Desc: "Ideal for small childcare centers up to 50 enrolled children.",
      plan2Title: "Enterprise CareLog",
      plan2Price: "$99",
      plan2Desc: "For large facilities & senior care centers needing infirmary log suite.",
      planSelect: "Select Plan",
      footerTag: "Future of Care Standards",
      footerDesc: "Digital transformation platform for childcare centers and senior facilities.",
      rights: "All rights reserved. KVKK & GDPR Compliant.",
      statusTitle: "Facility Operations Live & Active",
      statusSub: "All logs synced in real-time to encrypted cloud.",
      badgeCompliance: "KVKK & GDPR Compliant",
      badgeSecurity: "100% Encrypted Data",
      dashAttendance: "CLASS ATTENDANCE",
      dashNapStatus: "NAP STATUS",
      dashMealSuccess: "MEAL SUCCESS",
      dashMedications: "PENDING MEDICATIONS",
      dashRosterTitle: "Little Explorers Class Roster",
      dashLogTitle: "Log Entry & Family Sync",
      dashSelectChild: "Select Child",
      dashSaveBtn: "Save Finding & Notify Family →",
      dashScheduleTitle: "Today's Class Schedule",
      dashFeedTitle: "Real-Time Family Activity Feed"
    },
    tr: {
      heroTitle: "KinderLog & CareLog: Kreş ve Huzurevleri İçin Yeni Nesil Şeffaf Bakım & İletişim Platformu",
      heroSub: "Personelinizi 2 tıkla hızlı kayıtla güçlendirin, aileleri anlık şeffaf raporlarla sevindirin. WhatsApp karmaşasına ve kağıt formlara son verin!",
      navFeatures: "Özellikler",
      navHowItWorks: "Nasıl Çalışır",
      navPricing: "Fiyatlandırma",
      navBlog: "Blog",
      navContact: "İletişim",
      navLogin: "Giriş Yap",
      navStartFree: "Ücretsiz Deneyin",
      lblCategory: "Kategori",
      lblValue: "Değer / Durum",
      lblNote: "Not / Açıklama",
      heroMeal: "Yemek",
      heroSleep: "Uyku",
      heroActivity: "Etkinlik",
      heroPhoto: "Fotoğraf",
      heroTag: "Çocuk & Yaşlı Bakımında Yeni Nesil Standart",
      heroCta: "14 Gün Ücretsiz Deneyin",
      heroSecondaryCta: "Canlı Demo Görün",
      trustTitle: "500+ Seçkin Kreş, Anaokulu ve Yaşlı Bakımevi Tarafından Güvenle Kullanılıyor",
      featSectionTag: "Neden KinderLog & CareLog?",
      featSectionTitle: "Tesisinizin Tüm Bakım Operasyonlarını Tek Ekrandan Yönetin",
      feat1Title: "Hızlı Bulgular & Günlük Kayıt",
      feat1Desc: "Öğretmenler ve bakıcılar yemek, uyku, ilaç ve etkinlik bulgularını saniyeler içinde kaydeder.",
      feat2Title: "Şeffaf Veli & Aile İletişimi",
      feat2Desc: "Fotoğraflar, duyurular ve günlük raporlar veli uygulamasına anında güvenle iletilir.",
      feat3Title: "Sağlık & Revir İlaç Takibi",
      feat3Desc: "Revir hemşireleri ateş, nabız, tansiyon ve düzenli ilaç saatlerini hatasız takip eder.",
      feat4Title: "Kurumsal Yönetim & KVKK Güvenlik",
      feat4Desc: "Sınıf dolulukları, personel yetkileri ve uçtan uca şeffaf raporlama tek panelde.",
      pricingTag: "Esnek & Şeffaf Paketler",
      pricingTitle: "Tesisinizin Büyüklüğüne Uygun Çözümü Seçin",
      pricingSub: "Gizli ücret yok, kurulum ücreti yok. İster aylık ister yıllık ödeyin.",
      plan1Title: "Başlangıç Kreş",
      plan1Price: "₺890",
      plan1Desc: "50 Öğrenciye kadar küçük ve orta ölçekli kreşler için ideal.",
      plan2Title: "Kurumsal CareLog",
      plan2Price: "₺1.850",
      plan2Desc: "Gelişmiş revir takibi gerektiren büyük tesisler ve bakımevleri için.",
      planSelect: "Paketi Seçin",
      footerTag: "Geleceğin Bakım Standardı",
      footerDesc: "Kreşler, anaokulları ve yaşlı bakımevleri için dijital dönüşüm platformu.",
      rights: "Tüm hakları saklıdır. KVKK & GDPR Uyumlu.",
      statusTitle: "Tesis Operasyonları Canlı & Aktif",
      statusSub: "Tüm kayıtlar anlık olarak buluta senkronize edilmektedir.",
      badgeCompliance: "KVKK & GDPR Uyumlu",
      badgeSecurity: "%100 Şifreli Veri",
      dashAttendance: "SINIF KATILIMI",
      dashNapStatus: "UYKU DURUMU",
      dashMealSuccess: "YEMEK BAŞARISI",
      dashMedications: "BEKLEYEN İLAÇLAR",
      dashRosterTitle: "Little Explorers Sınıf Listesi",
      dashLogTitle: "Bulgu Girişi & Veli Senkronizasyonu",
      dashSelectChild: "Öğrenci Seçin",
      dashSaveBtn: "Bulguyu Kaydet & Veliye Bildir →",
      dashScheduleTitle: "Bugünün Sınıf Programı",
      dashFeedTitle: "Canlı Veli Etkinlik Akışı"
    },
    es: {
      heroTitle: "KinderLog & CareLog: Transformación del Cuidado y Comunicación para Guarderías y Residencias",
      heroSub: "Capacite al personal con registros rápidos de 2 toques y deleite a las familias con actualizaciones transparentes.",
      navFeatures: "Características",
      navHowItWorks: "Cómo Funciona",
      navPricing: "Precios",
      navBlog: "Blog",
      navContact: "Contacto",
      navLogin: "Iniciar Sesión",
      navStartFree: "Prueba Gratuita",
      lblCategory: "Categoría",
      lblValue: "Valor / Estado",
      lblNote: "Notas / Descripción",
      heroMeal: "Comida",
      heroSleep: "Sueño",
      heroActivity: "Actividad",
      heroPhoto: "Foto",
      heroTag: "Estándar de Cuidado y Comunicación",
      heroCta: "Comenzar Prueba de 14 Días",
      heroSecondaryCta: "Ver Demo en Vivo",
      trustTitle: "Con la confianza de más de 500 centros de cuidado infantil y de ancianos",
      featSectionTag: "¿Por qué KinderLog & CareLog?",
      featSectionTitle: "Gestione todas las operaciones desde una sola pantalla",
      feat1Title: "Registros Rápidos y Hallazgos",
      feat1Desc: "Profesores y cuidadores registran comida, sueño y salud en segundos.",
      feat2Title: "Comunicación Familiar Transparente",
      feat2Desc: "Fotos y reportes diarios entregados al instante en la app familiar.",
      feat3Title: "Seguimiento de Salud e Enfermería",
      feat3Desc: "Enfermeros rastrean signos vitales y medicinas con precisión.",
      feat4Title: "Gestión Institucional y Seguridad",
      feat4Desc: "Capacidad de aulas y reportes de auditoría en un solo panel.",
      pricingTag: "Precios Flexibles",
      pricingTitle: "Elija el Plan Perfecto para su Centro",
      pricingSub: "Sin cargos ocultos ni costos de configuración.",
      plan1Title: "Centro Inicial",
      plan1Price: "€45",
      plan1Desc: "Ideal para centros de cuidado hasta 50 niños.",
      plan2Title: "CareLog Empresarial",
      plan2Price: "€89",
      plan2Desc: "Para residencias de ancianos y grandes instalaciones.",
      planSelect: "Seleccionar Plan",
      footerTag: "El Futuro del Cuidado",
      footerDesc: "Plataforma de transformación digital para guarderías y residencias.",
      rights: "Todos los derechos reservados. Cumple con GDPR.",
      statusTitle: "Operaciones del Centro en Vivo",
      statusSub: "Todos los registros sincronizados en tiempo real.",
      badgeCompliance: "Cumple con GDPR",
      badgeSecurity: "Datos 100% Encriptados",
      dashAttendance: "ASISTENCIA DE CLASE",
      dashNapStatus: "ESTADO DE SIESTA",
      dashMealSuccess: "ÉXITO DE COMIDA",
      dashMedications: "MEDICAMENTOS PENDIENTES",
      dashRosterTitle: "Lista de Clase Little Explorers",
      dashLogTitle: "Registro y Sincronización Familiar",
      dashSelectChild: "Seleccionar Estudiante",
      dashSaveBtn: "Guardar Hallazgo y Notificar →",
      dashScheduleTitle: "Horario de Hoy",
      dashFeedTitle: "Muro de Actividades en Vivo"
    },
    zh: {
      heroTitle: "KinderLog & CareLog：托儿与养老机构的变革性护理与沟通平台",
      heroSub: "简化员工记录，让家庭享受透明更新。告别微信混乱与纸质表单！",
      navFeatures: "功能",
      navHowItWorks: "工作原理",
      navPricing: "价格",
      navBlog: "博客",
      navContact: "联系我们",
      navLogin: "登录",
      navStartFree: "免费试用",
      lblCategory: "类别",
      lblValue: "数值 / 状态",
      lblNote: "备注 / 描述",
      heroMeal: "饮食",
      heroSleep: "睡眠",
      heroActivity: "活动",
      heroPhoto: "照片",
      heroTag: "下一代护理与沟通标准",
      heroCta: "开始14天免费试用",
      heroSecondaryCta: "查看实时演示",
      trustTitle: "超过500家顶级托儿所与养老机构信赖使用",
      featSectionTag: "为什么选择 KinderLog & CareLog？",
      featSectionTitle: "在一个界面中管理机构的所有护理运营",
      feat1Title: "快速记录与每日日志",
      feat1Desc: "教师与护理人员在几秒钟内记录饮食、睡眠和健康状况。",
      feat2Title: "透明的家庭沟通",
      feat2Desc: "照片、公告和每日报告即时推送至家长应用程序。",
      feat3Title: "健康与医务室药物跟踪",
      feat3Desc: "医务室护士精准跟踪体温、生命体征与服药时间。",
      feat4Title: "机构管理与数据安全",
      feat4Desc: "班级容量、员工权限与端到端审计报告尽在一个仪表板。",
      pricingTag: "灵活透明的定价",
      pricingTitle: "为您的机构选择最适合的方案",
      pricingSub: "无隐藏费用，无安装费。随时取消。",
      plan1Title: "初创托儿所",
      plan1Price: "¥350",
      plan1Desc: "适合容纳50名以下儿童的中小型托儿所。",
      plan2Title: "企业级 CareLog",
      plan2Price: "¥680",
      plan2Desc: "适合需要完整医务室记录的大型机构与养老院。",
      planSelect: "选择方案",
      footerTag: "护理标准的未来",
      footerDesc: "托儿所与养老机构的数字化转型平台。",
      rights: "保留所有权利。符合 GDPR / 数据保护标准。",
      statusTitle: "机构运营实时在线",
      statusSub: "所有日志实时同步至加密云端。",
      badgeCompliance: "符合 GDPR 标准",
      badgeSecurity: "100% 加密数据",
      dashAttendance: "出勤统计",
      dashNapStatus: "午睡状态",
      dashMealSuccess: "就餐完成率",
      dashMedications: "待用药物",
      dashRosterTitle: "探索者班级花名册",
      dashLogTitle: "日志录入与家庭同步",
      dashSelectChild: "选择学生",
      dashSaveBtn: "保存日志并通知家长 →",
      dashScheduleTitle: "今日课程安排",
      dashFeedTitle: "实时家庭动态流"
    }
  };

  const langMeta = {
    en: { flag: "🇺🇸", label: "EN" },
    tr: { flag: "🇹🇷", label: "TR" },
    es: { flag: "🇪🇸", label: "ES" },
    zh: { flag: "🇨🇳", label: "ZH" }
  };

  function toggleLangDropdown() {
    const menu = document.getElementById('lang-menu');
    if (menu) menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  }

  function selectGlobalLang(lang) {
    const menu = document.getElementById('lang-menu');
    if (menu) menu.style.display = 'none';
    setGlobalLang(lang);
  }

  function setGlobalLang(lang) {
    currentLangKey = lang;
    localStorage.setItem('app_lang', lang);

    const dict = fullDictionary[lang] || fullDictionary.tr;
    const meta = langMeta[lang] || langMeta.tr;

    const flagEl = document.getElementById('lang-btn-flag');
    if (flagEl) flagEl.innerText = meta.flag;

    const labelEl = document.getElementById('lang-btn-label');
    if (labelEl) labelEl.innerText = meta.label;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerText = dict[key];
      }
    });

    const heroH1 = document.querySelector('.hero-h1');
    if (heroH1) heroH1.innerText = dict.heroTitle;

    const heroSub = document.querySelector('.hero-subtitle');
    if (heroSub) heroSub.innerText = dict.heroSub;
  }

  window.openRoleGatewayModal = function() {
    const modal = document.getElementById('modal-role-gateway');
    if (modal) modal.style.display = 'flex';
  };

  window.closeRoleGatewayModal = function() {
    const modal = document.getElementById('modal-role-gateway');
    if (modal) modal.style.display = 'none';
  };

  window.launchDedicatedRoleApp = function(roleKey) {
    if (typeof closeRoleGatewayModal === 'function') closeRoleGatewayModal();

    let cleanKey = roleKey;
    if (cleanKey.includes('og') || cleanKey.includes('retmen')) cleanKey = 'ogretmen';
    if (cleanKey.includes('care')) cleanKey = 'carelog';
    if (cleanKey.includes('vel')) cleanKey = 'veli';
    if (cleanKey.includes('yonet')) cleanKey = 'yonetici';

    document.getElementById('view-landing').style.display = 'none';
    document.getElementById('view-app-dashboard').style.display = 'block';

    const wsOg = document.getElementById('role-workspace-ogretmen');
    const wsCare = document.getElementById('role-workspace-carelog');
    const wsVeli = document.getElementById('role-workspace-veli');
    const wsYon = document.getElementById('role-workspace-yonetici');

    if (wsOg) wsOg.style.display = 'none';
    if (wsCare) wsCare.style.display = 'none';
    if (wsVeli) wsVeli.style.display = 'none';
    if (wsYon) wsYon.style.display = 'none';

    const roleTitles = {
      en: { ogretmen: '🏫 Teacher Portal', carelog: '👵 CareLog Infirmary', veli: '💬 Family Feed', yonetici: '📊 Facility Manager' },
      tr: { ogretmen: '🏫 Öğretmen Portalı', carelog: '👵 CareLog Revir & Bakıcı', veli: '💬 Veli Akışı', yonetici: '📊 Kurum Yöneticisi' },
      es: { ogretmen: '🏫 Portal del Profesor', carelog: '👵 Enfermería CareLog', veli: '💬 Muro Familiar', yonetici: '📊 Director General' },
      zh: { ogretmen: '🏫 教师门户', carelog: '👵 护理日志', veli: '💬 家长动态', yonetici: '📊 机构管理者' }
    };

    const currentLang = window.currentLangKey || localStorage.getItem('app_lang') || 'tr';
    const tDict = roleTitles[currentLang] || roleTitles.tr;

    const userMap = {
      ogretmen: { name: currentLang === 'tr' ? 'Melis Öğretmen' : 'Teacher Melis', role: tDict.ogretmen, avatar: 'M', workspaceId: 'role-workspace-ogretmen' },
      carelog: { name: currentLang === 'tr' ? 'Hemşire Ayşe' : 'Nurse Ayşe', role: tDict.carelog, avatar: 'A', workspaceId: 'role-workspace-carelog' },
      veli: { name: currentLang === 'tr' ? 'Ahmet Yılmaz (Veli)' : 'Ahmet Yılmaz (Parent)', role: tDict.veli, avatar: 'V', workspaceId: 'role-workspace-veli' },
      yonetici: { name: currentLang === 'tr' ? 'Ayşe Hanım (Müdür)' : 'Ayşe Hanım (Manager)', role: tDict.yonetici, avatar: 'Y', workspaceId: 'role-workspace-yonetici' }
    };

    const userData = userMap[cleanKey] || userMap.ogretmen;

    const targetWs = document.getElementById(userData.workspaceId);
    if (targetWs) targetWs.style.display = 'block';

    const topTitle = document.getElementById('saas-topbar-title');
    if (topTitle) topTitle.innerText = userData.role + ' — Live Workspace';

    const pName = document.getElementById('saas-profile-name');
    if (pName) pName.innerText = userData.name;

    const pRole = document.getElementById('saas-profile-role');
    if (pRole) pRole.innerText = '• ' + userData.role;

    const pAvatar = document.getElementById('saas-avatar');
    if (pAvatar) pAvatar.innerText = userData.avatar;

    setGlobalLang(currentLang);
  };

  function exitSaaSApp() {
    document.getElementById('view-app-dashboard').style.display = 'none';
    document.getElementById('view-landing').style.display = 'block';
  }

  function showToast(type, msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-\${type}`;
    toast.innerHTML = `<div>\${msg}</div><button class="toast-close" onclick="this.parentElement.remove()"></button>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('fadeOut');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  function checkCookieConsent() {
    const consent = localStorage.getItem('kinderlog_cookie_consent');
    if (!consent) {
      setTimeout(() => {
        const banner = document.getElementById('cookie-banner');
        if (banner) banner.style.display = 'flex';
      }, 800);
    }
  }

  function acceptCookies(type) {
    localStorage.setItem('kinderlog_cookie_consent', type);
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.opacity = '0';
      banner.style.transform = 'translate(-50%, 20px)';
      banner.style.transition = 'all 0.3s ease';
      setTimeout(() => { banner.style.display = 'none'; }, 300);
    }
  }

  function openLegalModal(modalId) {
    const modal = document.getElementById('modal-' + modalId);
    if (modal) modal.style.display = 'flex';
  }

  function closeLegalModal(modalId) {
    const modal = document.getElementById('modal-' + modalId);
    if (modal) modal.style.display = 'none';
  }

  function closeLegalModalOnBackdrop(e, modalId) {
    if (e.target.id === 'modal-' + modalId) closeLegalModal(modalId);
  }

  document.addEventListener('DOMContentLoaded', function() {
    checkCookieConsent();
    const savedLang = localStorage.getItem('app_lang') || 'tr';
    setGlobalLang(savedLang);
  });
</script>'''

# Replace script tag content in html
start_script = html.find('<script>')
end_script = html.rfind('</script>')

if start_script != -1 and end_script != -1:
    html = html[:start_script] + clean_script.strip() + html[end_script + 9:]

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Saved cleanly rebuilt script block!")
