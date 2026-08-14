const fs = require('fs');
const path = require('path');

const logoImagePath = 'C:\\Users\\Bedirhan\\.gemini\\antigravity-ide\\brain\\15d9f643-d00e-4b92-9c79-43f304384e90\\kinderlog_carelog_logo_1786627135989.png';
const imageBuffer = fs.readFileSync(logoImagePath);
const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

console.log('Original length:', html.length);

// Standard image replacement tag for dark headers/footers/sidebars
const logoImgDark = `<img src="${base64Image}" alt="KinderLog Logo" style="height: 38px; width: 38px; border-radius: 10px; object-fit: cover; box-shadow: 0 4px 12px rgba(13, 148, 136, 0.5); border: 1.5 solid rgba(255,255,255,0.2); vertical-align: middle; display: inline-block;" />`;

// 1. Footer logo or dark header logo
html = html.replace(/<div style="width:36px; height:36px; border-radius:10px; background:linear-gradient\(135deg, var\(--brand-teal\), #10b981\); color:white; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:16px;">K<\/div>/g, logoImgDark);

// 2. Generic div logo icons with K
html = html.replace(/<div class="logo-icon font-bold[^"]*">K<\/div>/g, logoImgDark);
html = html.replace(/<div class="logo-icon">K<\/div>/g, logoImgDark);

// 3. SaaS Sidebar brand icon
html = html.replace(/<div class="saas-sidebar-brand">[\s\S]*?<div class="logo-icon">K<\/div>/g, (match) => {
  return match.replace('<div class="logo-icon">K</div>', logoImgDark);
});

// 4. Any leftover <div ...>K</div> in branding or logo contexts
html = html.replace(/<div([^>]*)>K<\/div>/g, (match, attrs) => {
  if (attrs.includes('logo') || attrs.includes('brand') || attrs.includes('badge') || attrs.includes('icon')) {
    return logoImgDark;
  }
  return match;
});

// 5. CSS rule force override to replace text-based 'K' boxes if any are generated dynamically
const extraCSS = `
  .saas-sidebar-brand .logo-icon, .logo-badge-icon, .logo-icon {
    background: none !important;
    font-size: 0 !important;
    position: relative;
  }
  .saas-sidebar-brand .logo-icon::after, .logo-badge-icon::after, .logo-icon::after {
    content: '';
    display: inline-block;
    width: 38px;
    height: 38px;
    background-image: url("${base64Image}");
    background-size: cover;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(13, 148, 136, 0.4);
  }
`;

if (!html.includes('.logo-icon::after')) {
  html = html.replace('</style>', `${extraCSS}\n</style>`);
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ Replaced ALL dark logo occurrences across landing-page.html!');
