const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Ensure currentLangKey is initialized globally on window
if (!html.includes('window.currentLangKey =')) {
  html = html.replace('<script>', '<script>\n  window.currentLangKey = "tr";\n');
}

// Safely update openRoleGatewayModal
html = html.replace('setGlobalLang(currentLangKey);', 'if (typeof selectGlobalLang === "function") selectGlobalLang(window.currentLangKey || "tr");');
html = html.replace('setGlobalLang(window.currentLangKey);', 'if (typeof selectGlobalLang === "function") selectGlobalLang(window.currentLangKey || "tr");');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ Fixed openRoleGatewayModal currentLangKey reference error!');
