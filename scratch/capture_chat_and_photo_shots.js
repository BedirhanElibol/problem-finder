const puppeteer = require('puppeteer');
const path = require('path');

async function captureChatAndPhotoShots() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960, deviceScaleFactor: 2 });

  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });
  await page.evaluate(() => localStorage.setItem('kinderlog_cookie_consent', 'all'));
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  // Open Teacher App
  await page.evaluate(() => {
    if (window.launchDedicatedRoleApp) window.launchDedicatedRoleApp('ogretmen');
  });
  await new Promise(r => setTimeout(r, 600));

  // Switch to Chat Tab
  await page.evaluate(() => {
    if (window.switchWorkspaceTab) window.switchWorkspaceTab('mesaj');
  });
  await new Promise(r => setTimeout(r, 600));

  const chatShotPath = path.join('C:', 'Users', 'Bedirhan', '.gemini', 'antigravity-ide', 'brain', '15d9f643-d00e-4b92-9c79-43f304384e90', 'realtime_chat_shot.png');
  await page.screenshot({ path: chatShotPath, fullPage: false });
  console.log('✅ Realtime Chat Screenshot saved:', chatShotPath);

  // Switch to Photo Gallery Tab
  await page.evaluate(() => {
    if (window.switchWorkspaceTab) window.switchWorkspaceTab('fotograf');
  });
  await new Promise(r => setTimeout(r, 600));

  const photoShotPath = path.join('C:', 'Users', 'Bedirhan', '.gemini', 'antigravity-ide', 'brain', '15d9f643-d00e-4b92-9c79-43f304384e90', 'photo_gallery_shot.png');
  await page.screenshot({ path: photoShotPath, fullPage: false });
  console.log('✅ Photo Gallery Screenshot saved:', photoShotPath);

  await browser.close();
}

captureChatAndPhotoShots().catch(err => {
  console.error(err);
  process.exit(1);
});
