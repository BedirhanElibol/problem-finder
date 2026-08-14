const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
const html = fs.readFileSync(htmlPath, 'utf8');

console.log('Cookie banner present:', html.includes('cookie-banner') || html.includes('KVKK') || html.includes('GDPR'));
console.log('Privacy policy modal present:', html.includes('modal-privacy') || html.includes('Gizlilik Politikası'));
console.log('Terms of service present:', html.includes('modal-terms') || html.includes('Kullanım Koşulları'));
