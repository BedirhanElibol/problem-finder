const fs = require('fs');
const path = require('path');

const img1Path = 'C:\\Users\\Bedirhan\\.gemini\\antigravity-ide\\brain\\15d9f643-d00e-4b92-9c79-43f304384e90\\real_kindergarten_teacher_photo_1786614918174.png';
const img2Path = 'C:\\Users\\Bedirhan\\.gemini\\antigravity-ide\\brain\\15d9f643-d00e-4b92-9c79-43f304384e90\\real_senior_caregiver_photo_1786614936408.png';

const b64_1 = fs.readFileSync(img1Path).toString('base64');
const b64_2 = fs.readFileSync(img2Path).toString('base64');

const dataUri1 = `data:image/png;base64,${b64_1}`;
const dataUri2 = `data:image/png;base64,${b64_2}`;

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Find the two img tags inside .hero-illustration-card and update their src attributes
const regexImg1 = /<div class="hero-illustration-card">\s*<img src="[^"]*"/;
html = html.replace(regexImg1, `<div class="hero-illustration-card">\n            <img src="${dataUri1}"`);

const regexImg2 = /<div class="hero-illustration-card">\s*<img src="[^"]*" alt="CareLog Nurse with Senior Resident"/;
if (html.includes('alt="CareLog Nurse with Senior Resident"')) {
  const parts = html.split('alt="CareLog Nurse with Senior Resident"');
  // Second image card
  const lastCardIdx = parts[0].lastIndexOf('<div class="hero-illustration-card">');
  const cardPart = parts[0].substring(lastCardIdx);
  const updatedCardPart = cardPart.replace(/<img src="[^"]*"/, `<img src="${dataUri2}"`);
  html = parts[0].substring(0, lastCardIdx) + updatedCardPart + 'alt="CareLog Nurse with Senior Resident"' + parts[1];
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully updated landing-page.html with ultra-realistic human photo base64 URIs!');
