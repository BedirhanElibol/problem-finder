const fs = require('fs');
const path = require('path');

const uris = JSON.parse(fs.readFileSync(path.join(__dirname, 'data_uris.json'), 'utf8'));
const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace relative img srcs with base64 data URIs
html = html.replace('src="src/assets/kinderlog_hero.png"', `src="${uris.uri1}"`);
html = html.replace('src="src/assets/carelog_hero.png"', `src="${uris.uri2}"`);

// Update Turkey local text to Universal Worldwide text
html = html.replace(
  'TÜRKİYE GENELİNDE 450+ SEÇKİN KREŞ VE BAKIM EVİ TARAFINDAN KULLANILMAKTADIR',
  'TRUSTED BY 450+ CHILDCARE & SENIOR CARE FACILITIES ACROSS 15+ COUNTRIES WORLDWIDE'
);

// Add Language Switcher Dropdown into navbar
const navActionsOld = '<div>\n          <button onclick="openRoleGatewayModal()" class="btn-nav-primary">Start Free Trial</button>\n        </div>';
const navActionsNew = `<div style="display:flex; align-items:center; gap:12px;">
          <!-- GLOBAL LANGUAGE SWITCHER -->
          <div style="background:var(--bg-subtle); border:1px solid var(--border-color); border-radius:var(--radius-full); padding:4px 8px; font-size:13px; font-weight:700; display:flex; align-items:center; gap:4px;">
            <span>🌐</span>
            <select onchange="setGlobalLang(this.value)" style="background:transparent; border:none; color:var(--text-primary); font-weight:700; font-size:13px; cursor:pointer; outline:none;">
              <option value="en" selected>US EN</option>
              <option value="tr">TR TR</option>
              <option value="es">ES ES</option>
              <option value="zh">CN ZH</option>
            </select>
          </div>
          <button onclick="openRoleGatewayModal()" class="btn-nav-primary">Start Free Trial</button>
        </div>`;

html = html.replace(navActionsOld, navActionsNew);

// Add setGlobalLang function to script
const langScript = `
    const i18nDict = {
      en: {
        headline: "KinderLog & CareLog: Transformative Care & Communication for Childcare & Senior Facilities",
        sub: "Empower Staff with Easy Recording, Delight Families with Transparent Updates. Say Goodbye to WhatsApp Chaos and Paper Forms!",
        btnTrial: "Start Your 14-Day Free Trial",
        btnNav: "Start Free Trial"
      },
      tr: {
        headline: "KinderLog & CareLog: Kreş ve Huzurevleri İçin Yeni Nesil Şeffaf İletişim Platformu",
        sub: "Personelinizi 2 tıkla hızlı kayıtla güçlendirin, aileleri anlık şeffaf raporlarla sevindirin. WhatsApp karmaşasına ve kağıt formlara son verin!",
        btnTrial: "14 Günlük Ücretsiz Denemenizi Başlatın",
        btnNav: "Ücretsiz Dene"
      },
      es: {
        headline: "KinderLog & CareLog: Transformación del Cuidado y Comunicación para Guarderías y Residencias",
        sub: "Capacite al personal con registros rápidos y deleite a las familias con actualizaciones transparentes.",
        btnTrial: "Comience su prueba gratuita de 14 días",
        btnNav: "Prueba Gratuita"
      },
      zh: {
        headline: "KinderLog & CareLog：托儿与养老机构的变革性护理与沟通平台",
        sub: "简化员工记录流程，通过透明的更新给家庭带来安心。",
        btnTrial: "开始 14 天免费试用",
        btnNav: "免费试用"
      }
    };

    function setGlobalLang(lang) {
      const d = i18nDict[lang] || i18nDict.en;
      document.querySelector('.hero-h1').innerText = d.headline;
      document.querySelector('.hero-subtitle').innerText = d.sub;
      document.querySelector('.btn-hero-main-cta span').innerText = d.btnTrial;
      document.querySelector('.btn-nav-primary').innerText = d.btnNav;
      showToast('info', '🌐 Language updated: ' + lang.toUpperCase());
    }
`;

html = html.replace('function showToast(type, message) {', langScript + '\n    function showToast(type, message) {');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully updated landing-page.html with base64 URIs, language switcher, and global universal positioning!');
