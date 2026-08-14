const puppeteer = require('puppeteer');
const path = require('path');

async function captureHeaderShot() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 400, deviceScaleFactor: 2 });
  
  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 500));

  const screenshotPath = path.join('C:', 'Users', 'Bedirhan', '.gemini', 'antigravity-ide', 'brain', '15d9f643-d00e-4b92-9c79-43f304384e90', 'header_ai_logo_shot.png');
  
  const headerElem = await page.$('.navbar');
  if (headerElem) {
    await headerElem.screenshot({ path: screenshotPath });
  } else {
    await page.screenshot({ path: screenshotPath });
  }
  
  console.log('✅ Screenshot saved:', screenshotPath);
  await browser.close();
}

captureHeaderShot().catch(err => {
  console.error(err);
  process.exit(1);
});
