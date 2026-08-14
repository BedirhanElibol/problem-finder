const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace multi-font imports with clean 2-font setup (Outfit & Fira Code)
html = html.replace(/@import url\('https:\/\/fonts\.googleapis\.com\/css2\?[^']+'\);/g, "@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Fira+Code:wght@500;700&display=swap');");

// Clean font variables to 2 font families only
html = html.replace(/--font-heading:[^;]+;/g, "--font-heading: 'Outfit', sans-serif;");
html = html.replace(/--font-body:[^;]+;/g, "--font-body: 'Outfit', sans-serif;");
html = html.replace(/font-family:[^;]*Roboto[^;]*;/g, "font-family: 'Outfit', sans-serif;");
html = html.replace(/font-family:[^;]*Inter[^;]*;/g, "font-family: 'Outfit', sans-serif;");
html = html.replace(/font-family:[^;]*Plus Jakarta Sans[^;]*;/g, "font-family: 'Outfit', sans-serif;");

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ Streamlined landing-page.html font families to 2 fonts (Outfit & Fira Code)!');
