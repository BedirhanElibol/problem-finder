const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const metaStart = html.indexOf('const langMeta =');
const metaEnd = html.indexOf('function selectGlobalLang');

let metaCode = html.substring(metaStart, metaEnd);
metaCode = metaCode.replace('const langMeta =', 'global.langMeta =');

eval(metaCode);
console.log('langMeta:', global.langMeta);
