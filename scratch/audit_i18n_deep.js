const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
const html = fs.readFileSync(htmlPath, 'utf8');

console.log('🚀 Running Deep i18n & Localization Audit on landing-page.html ...');

// 1. Extract all data-i18n attributes from HTML
const i18nKeysInHTML = [];
const regex = /data-i18n=["']([^"']+)["']/g;
let match;
while ((match = regex.exec(html)) !== null) {
  i18nKeysInHTML.push(match[1]);
}

const uniqueKeys = [...new Set(i18nKeysInHTML)];
console.log(`Total data-i18n elements found in HTML: ${i18nKeysInHTML.length} (${uniqueKeys.length} unique keys)`);

// 2. Extract fullDictionary keys for EN, TR, ES, ZH
const fullDictStart = html.indexOf('const fullDictionary =');
const fullDictEnd = html.indexOf('function selectGlobalLang');

if (fullDictStart === -1 || fullDictEnd === -1) {
  console.error('❌ fullDictionary not found in landing-page.html!');
  process.exit(1);
}

const dictText = html.substring(fullDictStart, fullDictEnd);

// Find keys inside dictText
const dictKeys = [];
const dictKeyRegex = /([a-zA-Z0-9_]+)\s*:\s*["'`]/g;
let keyMatch;
while ((keyMatch = dictKeyRegex.exec(dictText)) !== null) {
  const k = keyMatch[1];
  if (!['en', 'tr', 'es', 'zh', 'const', 'fullDictionary', 'roleTitles', 'userMap'].includes(k)) {
    dictKeys.push(k);
  }
}

const uniqueDictKeys = [...new Set(dictKeys)];
console.log(`Total keys found in fullDictionary: ${uniqueDictKeys.length}`);

// 3. Find missing keys
const missingKeys = uniqueKeys.filter(k => !uniqueDictKeys.includes(k));
console.log(`Missing keys in dictionary: ${missingKeys.length}`);
if (missingKeys.length > 0) {
  console.log('Missing keys list:', missingKeys);
}

// 4. Find elements in HTML that contain raw hardcoded text without data-i18n
const lines = html.split('\n');
const hardcodedElements = [];
lines.forEach((line, idx) => {
  if (line.includes('<h1') || line.includes('<h2') || line.includes('<h3') || line.includes('<h4') || line.includes('<p') || line.includes('<span') || line.includes('<button') || line.includes('<th') || line.includes('<td')) {
    if (!line.includes('data-i18n=') && !line.includes('<script') && !line.includes('style=') && !line.includes('class="logo') && !line.includes('<img')) {
      const textOnly = line.replace(/<[^>]+>/g, '').trim();
      if (textOnly.length > 3 && !textOnly.startsWith('©') && !textOnly.startsWith('{') && !textOnly.startsWith('//')) {
        hardcodedElements.push({ line: idx + 1, content: textOnly.substring(0, 80) });
      }
    }
  }
});

console.log(`\nPotential hardcoded elements without data-i18n: ${hardcodedElements.length}`);
console.log(hardcodedElements.slice(0, 25));
