const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const fullDictStart = html.indexOf('const fullDictionary =');
const fullDictEnd = html.indexOf('function selectGlobalLang');

let dictCode = html.substring(fullDictStart, fullDictEnd);
dictCode = dictCode.replace('const fullDictionary =', 'global.fullDictionary =');

eval(dictCode);

console.log('EN heroTitle:', global.fullDictionary.en.heroTitle);
console.log('TR heroTitle:', global.fullDictionary.tr.heroTitle);
console.log('ES heroTitle:', global.fullDictionary.es.heroTitle);
console.log('ZH heroTitle:', global.fullDictionary.zh.heroTitle);
