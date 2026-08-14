const puppeteer = require('puppeteer');

async function captureAllRoles() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const roles = ['ogretmen', 'carelog', 'veli', 'yonetici'];

  for (const r of roles) {
    await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });
    await page.evaluate((role) => launchDedicatedRoleApp(role), r);
    await new Promise(res => setTimeout(res, 500));

    const shotPath = `C:\\Users\\Bedirhan\\.gemini\\antigravity-ide\\brain\\15d9f643-d00e-4b92-9c79-43f304384e90\\role_${r}_dashboard.png`;
    await page.screenshot({ path: shotPath, fullPage: false });
    console.log(`📸 Captured screenshot for role "${r}" -> ${shotPath}`);
  }

  await browser.close();
}

captureAllRoles().catch(console.error);
