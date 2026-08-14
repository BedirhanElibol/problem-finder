const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace any font-family declaration that is not Outfit or Fira Code
html = html.replace(/font-family:\s*[^;\}]+/g, (match) => {
  if (match.includes('Fira Code') || match.includes('monospace')) {
    return "font-family: 'Fira Code', monospace";
  }
  return "font-family: 'Outfit', sans-serif";
});

// Update Google Fonts import at top to only import Outfit & Fira Code
html = html.replace(/@import url\('https:\/\/fonts\.googleapis\.com\/css2\?[^']+'\);/g, "@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@500;700&family=Outfit:wght@400;500;600;700;800&display=swap');");

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ Cleaned all font-family declarations in landing-page.html to exactly 2 families!');
