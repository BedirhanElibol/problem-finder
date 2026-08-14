const puppeteer = require('puppeteer');
const path = require('path');

async function captureAllLanguagesShot() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960, deviceScaleFactor: 2 });

  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });
  await page.evaluate(() => localStorage.setItem('kinderlog_cookie_consent', 'all'));

  // 1. Turkish Shot
  await page.evaluate(() => window.selectGlobalLang('tr'));
  await new Promise(r => setTimeout(r, 400));
  const shotTR = path.join('C:', 'Users', 'Bedirhan', '.gemini', 'antigravity-ide', 'brain', '15d9f643-d00e-4b92-9c79-43f304384e90', 'i18n_tr_shot.png');
  await page.screenshot({ path: shotTR, fullPage: false });
  console.log('✅ TR Shot saved:', shotTR);

  // 2. English Shot
  await page.evaluate(() => window.selectGlobalLang('en'));
  await new Promise(r => setTimeout(r, 400));
  const shotEN = path.join('C:', 'Users', 'Bedirhan', '.gemini', 'antigravity-ide', 'brain', '15d9f643-d00e-4b92-9c79-43f304384e90', 'i18n_en_shot.png');
  await page.screenshot({ path: shotEN, fullPage: false });
  console.log('✅ EN Shot saved:', shotEN);

  await browser.close();
}

captureAllLanguagesShot().catch(err => {
  console.error(err);
  process.exit(1);
});
