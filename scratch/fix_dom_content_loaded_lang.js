const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const initLangScript = `
  document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('app_lang') || 'tr';
    if (typeof setGlobalLang === 'function') {
      setGlobalLang(savedLang);
    }
  });
`;

if (!html.includes("localStorage.getItem('app_lang')")) {
  html = html.replace('document.addEventListener(\'DOMContentLoaded\', checkCookieConsent);', 'document.addEventListener(\'DOMContentLoaded\', checkCookieConsent);\n' + initLangScript);
} else {
  html = html.replace('document.addEventListener(\'DOMContentLoaded\', checkCookieConsent);', 'document.addEventListener(\'DOMContentLoaded\', checkCookieConsent);\n' + initLangScript);
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ Added DOMContentLoaded setGlobalLang execution!');
