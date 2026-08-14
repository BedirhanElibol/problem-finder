const puppeteer = require('puppeteer');
const path = require('path');

async function captureLegalShot() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  
  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  const screenshotPath = path.join('C:', 'Users', 'Bedirhan', '.gemini', 'antigravity-ide', 'brain', '15d9f643-d00e-4b92-9c79-43f304384e90', 'legal_cookie_banner_shot.png');
  await page.screenshot({ path: screenshotPath, fullPage: false });
  
  console.log('✅ Legal cookie banner screenshot saved:', screenshotPath);
  await browser.close();
}

captureLegalShot().catch(err => {
  console.error(err);
  process.exit(1);
});
