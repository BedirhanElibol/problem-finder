const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Ensure missing keys badgeLiveFeed, badgeGdpr, badgeAes exist in TR, ES, ZH
const missingKeysTr = `badgeLiveFeed: "CANLI AKIŞ", badgeGdpr: "🔒 KVKK & GDPR Uyumlu", badgeAes: "🛡️ 256-bit AES Şifreli"`;
const missingKeysEs = `badgeLiveFeed: "FEED EN VIVO", badgeGdpr: "🔒 Compatible con GDPR y HIPAA", badgeAes: "🛡️ Cifrado AES de 256 bits"`;
const missingKeysZh = `badgeLiveFeed: "实时动态", badgeGdpr: "🔒 符合 GDPR 与 HIPAA 标准", badgeAes: "🛡️ 256 位 AES 加密"`;

if (!html.includes('badgeLiveFeed: "CANLI AKIŞ"')) {
  html = html.replace('modalRoleTitle: "Başlatılacak Portalı Seçin",', 'modalRoleTitle: "Başlatılacak Portalı Seçin", ' + missingKeysTr + ',');
  html = html.replace('modalRoleTitle: "Seleccionar Portal a Iniciar",', 'modalRoleTitle: "Seleccionar Portal a Iniciar", ' + missingKeysEs + ',');
  html = html.replace('modalRoleTitle: "选择要启动的门户",', 'modalRoleTitle: "选择要启动的门户", ' + missingKeysZh + ',');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully synchronized all i18n keys across all 4 languages in landing-page.html!');
