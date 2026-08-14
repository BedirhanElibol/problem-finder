const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const dictStartIndex = html.indexOf('const fullDictionary = {');
const dictEndIndex = html.indexOf('function setGlobalLang(');

let dictBlock = html.substring(dictStartIndex, dictEndIndex);

// Add keys explicitly to dictBlock
const enKeys = `modalRoleTitle: "Select Portal to Launch", modalRoleSub: "Dedicated workspaces for each user role:", btnLaunchPortal: "Launch Portal ➜", badgeLiveFeed: "LIVE FEED", badgeGdpr: "🔒 GDPR & HIPAA Compliant", badgeAes: "🛡️ 256-bit AES Encrypted"`;

const trKeys = `modalRoleTitle: "Başlatılacak Portalı Seçin", modalRoleSub: "Her kullanıcı rolü için özel çalışma alanları:", btnLaunchPortal: "Portalı Başlat ➜", badgeLiveFeed: "CANLI AKIŞ", badgeGdpr: "🔒 KVKK & GDPR Uyumlu", badgeAes: "🛡️ 256-bit AES Şifreli"`;

const esKeys = `modalRoleTitle: "Seleccionar Portal a Iniciar", modalRoleSub: "Espacios de trabajo dedicados para cada rol:", btnLaunchPortal: "Iniciar Portal ➜", badgeLiveFeed: "FEED EN VIVO", badgeGdpr: "🔒 Compatible con GDPR y HIPAA", badgeAes: "🛡️ Cifrado AES de 256 bits"`;

const zhKeys = `modalRoleTitle: "选择要启动的门户", modalRoleSub: "每个用户角色的专属工作区:", btnLaunchPortal: "启动门户 ➜", badgeLiveFeed: "实时动态", badgeGdpr: "🔒 符合 GDPR 与 HIPAA 标准", badgeAes: "🛡️ 256 位 AES 加密"`;

// Insert into respective dictionary blocks
if (!dictBlock.includes('modalRoleTitle: "Select Portal to Launch"')) {
  dictBlock = dictBlock.replace('en: {', 'en: {\n        ' + enKeys + ',');
  dictBlock = dictBlock.replace('tr: {', 'tr: {\n        ' + trKeys + ',');
  dictBlock = dictBlock.replace('es: {', 'es: {\n        ' + esKeys + ',');
  dictBlock = dictBlock.replace('zh: {', 'zh: {\n        ' + zhKeys + ',');
}

html = html.substring(0, dictStartIndex) + dictBlock + html.substring(dictEndIndex);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully updated fullDictionary in landing-page.html!');
