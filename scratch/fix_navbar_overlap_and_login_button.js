const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Fix .hero-wrapper top padding clearance to 140px
html = html.replace(/\.hero-wrapper\s*\{[^}]*\}/g, `.hero-wrapper { background: linear-gradient(180deg, var(--bg-hero) 0%, var(--bg-main) 100%); padding: 140px 0 80px !important; text-align: center; position: relative; }`);

// Also fix inline style or duplicate hero-wrapper padding
html = html.replace('padding: 60px 0 80px;', 'padding: 140px 0 80px !important;');

// 2. Add Login Button next to Start Free Trial button in Navbar
const oldNavButtons = `<button onclick="openRoleGatewayModal()" class="btn-nav-primary" data-i18n="navStartFree">Start Free Trial</button>`;
const newNavButtons = `
  <button onclick="openRoleGatewayModal()" class="btn-nav-login" data-i18n="navLogin" style="background:transparent; border:1.5px solid var(--brand-teal); color:var(--brand-teal); font-weight:700; padding:9px 18px; border-radius:12px; cursor:pointer; margin-right:8px; transition:all 0.2s;">Giriş Yap</button>
  <button onclick="openRoleGatewayModal()" class="btn-nav-primary" data-i18n="navStartFree" style="background:linear-gradient(135deg, var(--brand-teal), #10b981); color:white; border:none; font-weight:800; padding:10px 22px; border-radius:12px; cursor:pointer; box-shadow:0 4px 14px rgba(13,148,136,0.3);">Ücretsiz Deneyin</button>
`;

html = html.replace(oldNavButtons, newNavButtons.trim());

// 3. Add navLogin key to i18n dictionaries
if (!html.includes('navLogin:')) {
  html = html.replace('navFeatures: "Features"', 'navLogin: "Login",\n        navFeatures: "Features"');
  html = html.replace('navFeatures: "Özellikler"', 'navLogin: "Giriş Yap",\n        navFeatures: "Özellikler"');
  html = html.replace('navFeatures: "Características"', 'navLogin: "Iniciar Sesión",\n        navFeatures: "Características"');
  html = html.replace('navFeatures: "功能"', 'navLogin: "登录",\n        navFeatures: "功能"');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ Added Login button, fixed hero padding clearance to 140px, and updated i18n dictionaries!');
