const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
const html = fs.readFileSync(htmlPath, 'utf8');

// Regex to find headers, paragraphs, buttons, labels, spans without data-i18n that contain text
const textTagRegex = /<(h1|h2|h3|h4|h5|h6|p|button|span|label|a|td|th)\b(?![^>]*\bdata-i18n\b)[^>]*>(.*?)<\/\1>/gi;

let match;
const untranslated = [];

while ((match = textTagRegex.exec(html)) !== null) {
  const tag = match[1];
  const innerText = match[2].replace(/<[^>]+>/g, '').trim();
  // Filter out empty text, icons, numbers, or script tags
  if (innerText && innerText.length > 2 && !/^\d+$/.test(innerText) && !/^(➜|✕|●|▲|▼|✔)$/.test(innerText)) {
    untranslated.push({ tag, text: innerText });
  }
}

console.log(`Found ${untranslated.length} potentially untranslated elements without data-i18n:`);
untranslated.slice(0, 30).forEach((item, idx) => console.log(`${idx + 1}. [<${item.tag}>] ${item.text}`));
