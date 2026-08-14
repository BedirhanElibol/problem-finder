const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Fix unescaped double quotes inside fullDictionary strings
const fullDictIdx = html.indexOf('const fullDictionary =');
const fullDictEnd = html.indexOf('function selectGlobalLang');

if (fullDictIdx !== -1 && fullDictEnd !== -1) {
  let dictText = html.substring(fullDictIdx, fullDictEnd);
  
  // Remove broken inline SVGs inside fullDictionary strings
  dictText = dictText.replace(/<svg[^>]*>[\s\S]*?<\/svg>/g, '');
  // Clean up any double quote issues
  dictText = dictText.replace(/"\s*"/g, '"');
  
  html = html.substring(0, fullDictIdx) + dictText + html.substring(fullDictEnd);
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ Fixed fullDictionary unescaped SVG double quote syntax error!');
