const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const lines = html.split('\n');
console.log('Finding hero-section and tablet mockup in html...');

lines.forEach((line, idx) => {
  if (line.includes('hero-section') || line.includes('tablet-action-btn') || line.includes('Caregiver App')) {
    console.log(`Line ${idx + 1}: ${line.substring(0, 120)}`);
  }
});
