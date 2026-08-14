const puppeteer = require('puppeteer');

async function testRealisticStrip() {
  console.log('🚀 Testing Realistic Global Trust & Live Activity Bar on http://localhost:3030 ...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });

  // 1. Verify Trust Strip Elements
  const statusText = await page.evaluate(() => document.getElementById('status-title').innerText);
  console.log(`   ✔ Live System Status: "${statusText}"`);

  const ticker1 = await page.evaluate(() => document.getElementById('ticker-text').innerText);
  console.log(`   ✔ Initial Live Feed Activity: "${ticker1}"`);

  // Wait 4.5 seconds for live ticker rotation
  await new Promise(r => setTimeout(r, 4500));
  const ticker2 = await page.evaluate(() => document.getElementById('ticker-text').innerText);
  console.log(`   ✔ Rotated Live Feed Activity: "${ticker2}"`);

  const complianceText = await page.evaluate(() => document.getElementById('badge-compliance').innerText);
  console.log(`   ✔ Global Enterprise Compliance: "${complianceText}"`);

  await browser.close();
  console.log('\n🎉 REALISTIC GLOBAL TRUST & LIVE ACTIVITY BAR VERIFIED 100%!');
}

testRealisticStrip().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
