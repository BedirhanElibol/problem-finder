const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Fix Modal Role Gateway Titles & Subtitles
html = html.replace(
  '<h3 style="font-size:22px; font-weight:800; margin-bottom:6px;">Select Portal to Launch</h3>',
  '<h3 style="font-size:22px; font-weight:800; margin-bottom:6px;" data-i18n="modalRoleTitle">Select Portal to Launch</h3>'
);

html = html.replace(
  '<p style="font-size:14px; color:var(--text-secondary); margin-bottom:24px;">Dedicated workspaces for each user role:</p>',
  '<p style="font-size:14px; color:var(--text-secondary); margin-bottom:24px;" data-i18n="modalRoleSub">Dedicated workspaces for each user role:</p>'
);

// 2. Fix Launch Portal Buttons inside Role Cards
html = html.replace(
  /<button class="btn-nav-primary" style="font-size:13px; padding:8px 16px;">Launch Portal ➜<\/button>/g,
  '<button class="btn-nav-primary" style="font-size:13px; padding:8px 16px;" data-i18n="btnLaunchPortal">Launch Portal ➜</button>'
);
html = html.replace(
  /<button class="btn-nav-primary" style="font-size:13px; padding:8px 16px; background:var\(--brand-blue\);">Launch Portal ➜<\/button>/g,
  '<button class="btn-nav-primary" style="font-size:13px; padding:8px 16px; background:var(--brand-blue);" data-i18n="btnLaunchPortal">Launch Portal ➜</button>'
);
html = html.replace(
  /<button class="btn-nav-primary" style="font-size:13px; padding:8px 16px; background:#854d0e;">Launch Portal ➜<\/button>/g,
  '<button class="btn-nav-primary" style="font-size:13px; padding:8px 16px; background:#854d0e;" data-i18n="btnLaunchPortal">Launch Portal ➜</button>'
);
html = html.replace(
  /<button class="btn-nav-primary" style="font-size:13px; padding:8px 16px; background:var\(--brand-amber\);">Launch Portal ➜<\/button>/g,
  '<button class="btn-nav-primary" style="font-size:13px; padding:8px 16px; background:var(--brand-amber);" data-i18n="btnLaunchPortal">Launch Portal ➜</button>'
);

// 3. Fix Trust Strip Labels
html = html.replace(
  '<span style="background:#ef4444; color:white; font-size:10px; font-weight:800; padding:2px 6px; border-radius:4px; margin-right:8px;">LIVE FEED</span>',
  '<span style="background:#ef4444; color:white; font-size:10px; font-weight:800; padding:2px 6px; border-radius:4px; margin-right:8px;" data-i18n="badgeLiveFeed">LIVE FEED</span>'
);

html = html.replace(
  '<span>🔒 GDPR & HIPAA Compliant</span>',
  '<span data-i18n="badgeGdpr">🔒 GDPR & HIPAA Compliant</span>'
);

html = html.replace(
  '<span>🛡️ 256-bit AES Encrypted</span>',
  '<span data-i18n="badgeAes">🛡️ 256-bit AES Encrypted</span>'
);

// 4. Add Missing Dictionary Keys for All 4 Languages
const extraKeysEn = `
        modalRoleTitle: "Select Portal to Launch",
        modalRoleSub: "Dedicated workspaces for each user role:",
        btnLaunchPortal: "Launch Portal ➜",
        badgeLiveFeed: "LIVE FEED",
        badgeGdpr: "🔒 GDPR & HIPAA Compliant",
        badgeAes: "🛡️ 256-bit AES Encrypted"`;

const extraKeysTr = `
        modalRoleTitle: "Başlatılacak Portalı Seçin",
        modalRoleSub: "Her kullanıcı rolü için özel çalışma alanları:",
        btnLaunchPortal: "Portalı Başlat ➜",
        badgeLiveFeed: "CANLI AKIŞ",
        badgeGdpr: "🔒 KVKK & GDPR Uyumlu",
        badgeAes: "🛡️ 256-bit AES Şifreli"`;

const extraKeysEs = `
        modalRoleTitle: "Seleccionar Portal a Iniciar",
        modalRoleSub: "Espacios de trabajo dedicados para cada rol:",
        btnLaunchPortal: "Iniciar Portal ➜",
        badgeLiveFeed: "FEED EN VIVO",
        badgeGdpr: "🔒 Compatible con GDPR y HIPAA",
        badgeAes: "🛡️ Cifrado AES de 256 bits"`;

const extraKeysZh = `
        modalRoleTitle: "选择要启动的门户",
        modalRoleSub: "每个用户角色的专属工作区:",
        btnLaunchPortal: "启动门户 ➜",
        badgeLiveFeed: "实时动态",
        badgeGdpr: "🔒 符合 GDPR 与 HIPAA 标准",
        badgeAes: "🛡️ 256 位 AES 加密"`;

html = html.replace('btnLandingPage: "Landing Page ➜"', 'btnLandingPage: "Landing Page ➜",' + extraKeysEn);
html = html.replace('btnLandingPage: "Landing Page ➜"', 'btnLandingPage: "Landing Page ➜",' + extraKeysTr);
html = html.replace('btnLandingPage: "Landing Page ➜"', 'btnLandingPage: "Landing Page ➜",' + extraKeysEs);
html = html.replace('btnLandingPage: "Landing Page ➜"', 'btnLandingPage: "Landing Page ➜",' + extraKeysZh);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully fixed all i18n bugs in landing-page.html!');
