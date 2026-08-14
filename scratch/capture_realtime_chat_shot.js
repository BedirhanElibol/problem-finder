const puppeteer = require('puppeteer');

async function captureRealtimeChatShot() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });

  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  // Switch to TR and launch Family Feed
  await page.evaluate(() => selectGlobalLang('tr'));
  await page.evaluate(() => launchDedicatedRoleApp('veli'));

  // Type and send chat message
  await page.type('#chat-input-msg', 'Saat 16:00 öksürük şurubu hatırlatması!');
  await page.evaluate(() => document.querySelector('#role-workspace-veli form').dispatchEvent(new Event('submit')));
  await new Promise(r => setTimeout(r, 600));

  const artifactPath = 'C:\\Users\\Bedirhan\\.gemini\\antigravity-ide\\brain\\15d9f643-d00e-4b92-9c79-43f304384e90\\realtime_chat_shot.png';
  await page.screenshot({ path: artifactPath, fullPage: false });

  await browser.close();
  console.log(`📸 Screenshot saved to ${artifactPath}`);
}

captureRealtimeChatShot().catch(console.error);
