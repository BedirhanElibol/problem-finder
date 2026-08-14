const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace <div class="logo-badge-icon">K</div> exactly
html = html.replace('<div class="logo-badge-icon">K</div>', '<img src="' + 'AI_LOGO_BASE64' + '" alt="KinderLog Logo" style="height:44px; width:44px; border-radius:12px; object-fit:cover; margin-right:10px; box-shadow:0 4px 12px rgba(13,148,136,0.4);" />');

const logoImagePath = 'C:\\Users\\Bedirhan\\.gemini\\antigravity-ide\\brain\\15d9f643-d00e-4b92-9c79-43f304384e90\\kinderlog_carelog_logo_1786627135989.png';
const imageBuffer = fs.readFileSync(logoImagePath);
const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

html = html.replace('AI_LOGO_BASE64', base64Image);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ Exact replacement of logo-badge-icon done!');
