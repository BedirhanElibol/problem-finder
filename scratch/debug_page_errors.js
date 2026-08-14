const puppeteer = require('puppeteer');

async function debugPageErrors() {
  console.log('🔍 Catching browser JS console/page errors on http://localhost:3030 ...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  page.on('pageerror', err => {
    console.error('❌ PAGE ERROR:', err.message);
  });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error('❌ CONSOLE ERROR:', msg.text());
    }
  });

  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  await browser.close();
}

debugPageErrors().catch(err => {
  console.error(err);
  process.exit(1);
});
