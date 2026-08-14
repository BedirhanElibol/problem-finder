const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../src/components/landing-page.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Extract all data-i18n keys used in HTML
const matches = [...htmlContent.matchAll(/data-i18n="([^"]+)"/g)];
const htmlKeys = new Set(matches.map(m => m[1]));

console.log(`🔍 Found ${htmlKeys.size} data-i18n keys in HTML.`);

// Extract dict object from script tag
const dictMatch = htmlContent.match(/const dict = (\{[\s\S]+?\});\n\n    function setLang/);
if (!dictMatch) {
  console.error('❌ Could not parse dict object from HTML script!');
  process.exit(1);
}

let dict;
try {
  eval('dict = ' + dictMatch[1]);
} catch (err) {
  console.error('❌ Failed to eval dict object:', err);
  process.exit(1);
}

const languages = ['tr', 'en', 'es', 'zh'];
let missingCount = 0;

for (const lang of languages) {
  const langDict = dict[lang];
  if (!langDict) {
    console.error(`❌ Language dict [${lang}] is missing entirely!`);
    missingCount++;
    continue;
  }

  for (const key of htmlKeys) {
    if (!langDict[key]) {
      console.warn(`⚠️ Key "${key}" missing in language [${lang.toUpperCase()}]`);
      missingCount++;
    }
  }
}

if (missingCount === 0) {
  console.log('✅ ALL 100% data-i18n keys exist across ALL 4 languages (TR, EN, ES, ZH)!');
} else {
  console.log(`❌ Total missing translation keys: ${missingCount}`);
}
