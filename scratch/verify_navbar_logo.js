const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const lines = html.split('\n');
console.log('Lines 190-205:');
lines.slice(190, 205).forEach((line, idx) => {
  console.log(`${191 + idx}: ${line}`);
});
