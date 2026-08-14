const fs = require('fs');
const path = require('path');

const img1Path = path.join(__dirname, '..', 'src', 'assets', 'kinderlog_hero.png');
const img2Path = path.join(__dirname, '..', 'src', 'assets', 'carelog_hero.png');

const b64_1 = fs.readFileSync(img1Path).toString('base64');
const b64_2 = fs.readFileSync(img2Path).toString('base64');

const dataUri1 = `data:image/png;base64,${b64_1}`;
const dataUri2 = `data:image/png;base64,${b64_2}`;

console.log('Image 1 Base64 length:', b64_1.length);
console.log('Image 2 Base64 length:', b64_2.length);

fs.writeFileSync(path.join(__dirname, 'data_uris.json'), JSON.stringify({ uri1: dataUri1, uri2: dataUri2 }));
console.log('Saved data URIs to scratch/data_uris.json');
