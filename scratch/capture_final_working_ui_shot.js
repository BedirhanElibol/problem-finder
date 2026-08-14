const puppeteer = require('puppeteer');
const path = require('path');

async function captureFinalWorkingUIShot() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960, deviceScaleFactor: 2 });
  
  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });
  await page.evaluate(() => localStorage.setItem('kinderlog_cookie_consent', 'all'));
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  // 1. Screenshot of Landing Header & Clear Hero Text
  const screenshotPath1 = path.join('C:', 'Users', 'Bedirhan', '.gemini', 'antigravity-ide', 'brain', '15d9f643-d00e-4b92-9c79-43f304384e90', 'final_header_and_hero_shot.png');
  await page.screenshot({ path: screenshotPath1, fullPage: false });
  console.log('✅ Screenshot 1 saved:', screenshotPath1);

  // 2. Click Login Button to open Role Gateway Modal and capture screenshot
  await page.evaluate(() => window.openRoleGatewayModal());
  await new Promise(r => setTimeout(r, 400));

  const screenshotPath2 = path.join('C:', 'Users', 'Bedirhan', '.gemini', 'antigravity-ide', 'brain', '15d9f643-d00e-4b92-9c79-43f304384e90', 'final_login_modal_shot.png');
  await page.screenshot({ path: screenshotPath2, fullPage: false });
  console.log('✅ Screenshot 2 saved:', screenshotPath2);

  await browser.close();
}

captureFinalWorkingUIShot().catch(err => {
  console.error(err);
  process.exit(1);
});
