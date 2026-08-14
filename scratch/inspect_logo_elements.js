const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
const html = fs.readFileSync(htmlPath, 'utf8');

// Search for header or logo text in html
console.log('HTML Total length:', html.length);

const logoMatches = [];
const lines = html.split('\n');
lines.forEach((line, index) => {
  if (line.includes('Kinder') || line.includes('CareLog') || line.includes('rounded-xl') || line.includes('flex items-center space-x')) {
    logoMatches.push({ lineNum: index + 1, content: line.trim().substring(0, 150) });
  }
});

console.log('Matching lines count:', logoMatches.length);
console.log(logoMatches.slice(0, 20));
