const puppeteer = require('puppeteer');

async function captureInteractiveFindingsShot() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });

  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  // Switch to TR and launch Teacher Portal
  await page.evaluate(() => selectGlobalLang('tr'));
  await page.evaluate(() => launchDedicatedRoleApp('ogretmen'));

  // Enter a live finding for Ali Demir
  await page.select('#t-child', 'Ali Demir');
  await page.select('#t-category', 'Meal');
  await page.select('#t-val', '100% Eaten');
  await page.type('#t-note', 'Sebzelerin hepsini bitirdi!');
  await page.evaluate(() => document.querySelector('#role-workspace-ogretmen form').dispatchEvent(new Event('submit')));
  await new Promise(r => setTimeout(r, 600));

  const artifactPath = 'C:\\Users\\Bedirhan\\.gemini\\antigravity-ide\\brain\\15d9f643-d00e-4b92-9c79-43f304384e90\\interactive_staff_findings_shot.png';
  await page.screenshot({ path: artifactPath, fullPage: false });

  await browser.close();
  console.log(`📸 Screenshot saved to ${artifactPath}`);
}

captureInteractiveFindingsShot().catch(console.error);
