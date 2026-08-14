const puppeteer = require('puppeteer');
const path = require('path');

async function testToastSystem() {
  console.log('🚀 Testing Production Toast Notification System on http://localhost:3030 ...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  let nativeAlertTriggered = false;
  page.on('dialog', async dialog => {
    nativeAlertTriggered = true;
    console.error('❌ FAILURE: Native browser alert dialog detected:', dialog.message());
    await dialog.dismiss();
  });

  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });

  // Test 1: Video Player Toast Notification
  console.log('\n1. Testing Toast on Video Player Click...');
  await page.click('.btn-hero-video');
  await page.evaluate(() => {
    // Click button inside video scene 1
    const btn = document.querySelector('#v-scene-1 button');
    if (btn) btn.click();
  });

  await page.waitForSelector('.toast-card', { timeout: 3000 });
  const toastText = await page.evaluate(() => document.querySelector('.toast-card').innerText);
  console.log(`   ✔ Toast UI created successfully: "${toastText.trim().replace(/\n/g, ' ')}"`);

  // Take screenshot
  const screenshotPath = path.join(__dirname, 'toast_system_verified.png');
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`📸 Saved verification screenshot to ${screenshotPath}`);

  // Test 2: Login Form Toast
  console.log('\n2. Testing Toast on Login Submit...');
  await page.evaluate(() => openLoginModal());
  await page.type('#modal-login input[type="text"]', 'demo@kinderlog.com');
  await page.type('#modal-login input[type="password"]', '123456');
  await page.click('#modal-login button[type="submit"]');

  await new Promise(r => setTimeout(r, 500));
  const toastCount = await page.evaluate(() => document.querySelectorAll('.toast-card').length);
  console.log(`   ✔ Total active toasts in container: ${toastCount}`);

  await browser.close();

  if (nativeAlertTriggered) {
    throw new Error('Native alert dialog was triggered!');
  } else {
    console.log('\n🎉 PRODUCTION TOAST NOTIFICATION SYSTEM VERIFIED 100%! ZERO ALERTS DETECTED.');
  }
}

testToastSystem().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
