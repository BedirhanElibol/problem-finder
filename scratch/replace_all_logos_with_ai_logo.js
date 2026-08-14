const fs = require('fs');
const path = require('path');

const logoImagePath = 'C:\\Users\\Bedirhan\\.gemini\\antigravity-ide\\brain\\15d9f643-d00e-4b92-9c79-43f304384e90\\kinderlog_carelog_logo_1786627135989.png';
const imageBuffer = fs.readFileSync(logoImagePath);
const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace logo-badge-icon div in navbar
const navbarLogoImg = `<img src="${base64Image}" alt="KinderLog & CareLog Logo" class="logo-badge-icon-img" style="height: 44px; width: 44px; border-radius: 12px; object-fit: cover; box-shadow: 0 4px 14px rgba(13, 148, 136, 0.4); border: 2px solid rgba(255,255,255,0.2);" />`;

// Replace <div class="logo-badge-icon">K</div>
html = html.replace(/<div class="logo-badge-icon">K<\/div>/g, navbarLogoImg);
html = html.replace(/<div class="logo-badge-icon font-bold[^"]*">K<\/div>/g, navbarLogoImg);

// Replace saas sidebar logo div
const sidebarLogoImg = `<img src="${base64Image}" alt="KinderLog Logo" style="height: 36px; width: 36px; border-radius: 9px; object-fit: cover; border: 1px solid rgba(255,255,255,0.2);" />`;
html = html.replace(/<div class="logo-icon font-bold[^"]*">K<\/div>/g, sidebarLogoImg);
html = html.replace(/<div class="logo-icon">K<\/div>/g, sidebarLogoImg);

// Also add styling for .logo-badge-icon to render nicely if any remain
if (!html.includes('.logo-badge-icon-img')) {
  html = html.replace('</style>', `
    .logo-badge-icon-img { transition: transform 0.25s ease; }
    .logo-badge-icon-img:hover { transform: scale(1.06); }
  </style>`);
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ Replaced ALL occurrences of logo with AI generated image in landing-page.html!');
