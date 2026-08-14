const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Ensure window.currentLangKey is declared globally
if (!html.includes('window.currentLangKey =')) {
  html = html.replace('<script>', '<script>\n    window.currentLangKey = \'en\';\n    var currentLangKey = \'en\';\n');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully fixed global currentLangKey variable declaration in landing-page.html!');
