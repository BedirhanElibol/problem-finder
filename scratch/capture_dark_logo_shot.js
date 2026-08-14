const puppeteer = require('puppeteer');
const path = require('path');

async function captureDarkLogoShot() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  
  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 400));

  // Open Teacher SaaS workspace to inspect dark sidebar logo
  await page.evaluate(() => launchDedicatedRoleApp('ogretmen'));
  await new Promise(r => setTimeout(r, 400));

  const screenshotPath = path.join('C:', 'Users', 'Bedirhan', '.gemini', 'antigravity-ide', 'brain', '15d9f643-d00e-4b92-9c79-43f304384e90', 'dark_sidebar_ai_logo_shot.png');
  await page.screenshot({ path: screenshotPath, fullPage: false });
  
  console.log('✅ Dark sidebar screenshot saved:', screenshotPath);
  await browser.close();
}

captureDarkLogoShot().catch(err => {
  console.error(err);
  process.exit(1);
});
