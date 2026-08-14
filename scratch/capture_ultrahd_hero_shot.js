const puppeteer = require('puppeteer');
const path = require('path');

async function captureUltraHDHeroShot() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960, deviceScaleFactor: 2 });

  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });
  await page.evaluate(() => localStorage.setItem('kinderlog_cookie_consent', 'all'));
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));

  const screenshotPath = path.join('C:', 'Users', 'Bedirhan', '.gemini', 'antigravity-ide', 'brain', '15d9f643-d00e-4b92-9c79-43f304384e90', 'ultrahd_pro_max_hero_shot.png');
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log('✅ Ultra HD Hero Screenshot saved:', screenshotPath);

  await browser.close();
}

captureUltraHDHeroShot().catch(err => {
  console.error(err);
  process.exit(1);
});
