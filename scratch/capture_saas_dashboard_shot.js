const puppeteer = require('puppeteer');
const path = require('path');

async function captureDashboard() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });

  // Click Teacher Panel Login button
  await page.click('.btn-hero-primary');
  await new Promise(r => setTimeout(r, 600));

  const artifactPath = 'C:\\Users\\Bedirhan\\.gemini\\antigravity-ide\\brain\\15d9f643-d00e-4b92-9c79-43f304384e90\\fullscreen_saas_dashboard.png';
  await page.screenshot({ path: artifactPath, fullPage: false });

  await browser.close();
  console.log(`📸 Screenshot saved to ${artifactPath}`);
}

captureDashboard().catch(console.error);
