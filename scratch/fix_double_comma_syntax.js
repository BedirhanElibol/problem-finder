const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Fix double commas
html = html.replace(/,\s*,/g, ',');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ Fixed double comma syntax error!');
