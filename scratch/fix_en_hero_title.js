const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const enAdditions = `
      heroTitle: "KinderLog & CareLog: Transformative Care & Communication for Childcare & Senior Facilities",
      heroSub: "Empower Staff with Easy Recording, Delight Families with Transparent Updates. Say Goodbye to WhatsApp Chaos and Paper Forms!",
`;

if (!html.includes('heroTitle: "KinderLog & CareLog: Transformative Care')) {
  html = html.replace('en: {', 'en: {\n' + enAdditions.trim());
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ Added missing heroTitle & heroSub to fullDictionary.en!');
