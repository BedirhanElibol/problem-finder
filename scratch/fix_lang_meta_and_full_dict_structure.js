const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Fix langMeta structure
const cleanLangMeta = `
const langMeta = {
  en: { flag: '🇺🇸', label: 'EN' },
  tr: { flag: '🇹🇷', label: 'TR' },
  es: { flag: '🇪🇸', label: 'ES' },
  zh: { flag: '🇨🇳', label: 'ZH' }
};
`;

html = html.replace(/const langMeta = \{[\s\S]*?\};\s*function selectGlobalLang/, cleanLangMeta.trim() + '\n\nfunction selectGlobalLang');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ Separated langMeta cleanly from fullDictionary!');
