const puppeteer = require('puppeteer');

async function captureRealPhotoLandingShot() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });

  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));

  const artifactPath = 'C:\\Users\\Bedirhan\\.gemini\\antigravity-ide\\brain\\15d9f643-d00e-4b92-9c79-43f304384e90\\real_photo_landing_shot.png';
  await page.screenshot({ path: artifactPath, fullPage: false });

  await browser.close();
  console.log(`📸 Screenshot saved to ${artifactPath}`);
}

captureRealPhotoLandingShot().catch(console.error);
