const fs = require('fs');
const path = require('path');

const logoImagePath = 'C:\\Users\\Bedirhan\\.gemini\\antigravity-ide\\brain\\15d9f643-d00e-4b92-9c79-43f304384e90\\kinderlog_carelog_logo_1786627135989.png';
const imageBuffer = fs.readFileSync(logoImagePath);
const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace standard logo containers with the new premium logo image
const logoImgTag = `<img src="${base64Image}" alt="KinderLog & CareLog Logo" style="height: 40px; width: 40px; border-radius: 10px; object-fit: cover; box-shadow: 0 4px 12px rgba(13, 148, 136, 0.3);" />`;

// Find brand logo icon elements in landing-page.html and update them
html = html.replace(/<div class="logo-icon font-bold[^"]*">K<\/div>/g, logoImgTag);
html = html.replace(/<div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400[^"]*">K<\/div>/g, logoImgTag);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ New premium logo image applied successfully to landing-page.html!');
