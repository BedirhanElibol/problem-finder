const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

html = html.replace('data-i18n="navLogin" class="glass-button', 'data-i18n="navLogin" class="btn-nav-login glass-button');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ Added btn-nav-login class!');
