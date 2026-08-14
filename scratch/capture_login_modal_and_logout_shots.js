const puppeteer = require('puppeteer');
const path = require('path');

async function captureLoginModalAndLogoutShots() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960, deviceScaleFactor: 2 });

  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });
  await page.evaluate(() => localStorage.setItem('kinderlog_cookie_consent', 'all'));
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  // Open Demo Login Modal
  await page.evaluate(() => {
    if (window.openRoleGatewayModal) window.openRoleGatewayModal();
  });
  await new Promise(r => setTimeout(r, 600));

  const modalShotPath = path.join('C:', 'Users', 'Bedirhan', '.gemini', 'antigravity-ide', 'brain', '15d9f643-d00e-4b92-9c79-43f304384e90', 'final_login_modal_shot.png');
  await page.screenshot({ path: modalShotPath, fullPage: false });
  console.log('✅ Final Demo Login Modal Screenshot saved:', modalShotPath);

  // Submit login query form to enter Teacher App
  await page.evaluate(() => {
    const form = document.getElementById('form-login-query');
    if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  });
  await new Promise(r => setTimeout(r, 800));

  const headerShotPath = path.join('C:', 'Users', 'Bedirhan', '.gemini', 'antigravity-ide', 'brain', '15d9f643-d00e-4b92-9c79-43f304384e90', 'final_header_and_hero_shot.png');
  await page.screenshot({ path: headerShotPath, fullPage: false });
  console.log('✅ Final Header and Logout Screenshot saved:', headerShotPath);

  await browser.close();
}

captureLoginModalAndLogoutShots().catch(err => {
  console.error(err);
  process.exit(1);
});
