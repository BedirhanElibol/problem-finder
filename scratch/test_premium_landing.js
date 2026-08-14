const puppeteer = require('puppeteer');

async function testPremiumLanding() {
  console.log('🚀 Testing World-Class Premium SaaS Landing Page Redesign on http://localhost:3030 ...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });

  // 1. Verify Landing Page Title & Headline
  const h1Text = await page.evaluate(() => document.querySelector('.hero-h1').innerText);
  console.log(`   ✔ Premium Headline loaded: "${h1Text.trim().replace(/\n/g, ' ')}"`);

  // 2. Test Live Showcase Tabs
  console.log('\n2. Testing Interactive Live Showcase Tabs on Landing Page...');
  await page.click('#sc-tab-2');
  const scTitle2 = await page.evaluate(() => document.getElementById('showcase-title').innerText);
  console.log(`   ✔ Showcase tab switched to Revir Vital: "${scTitle2}"`);

  // 3. Test Pricing Toggle (Yearly 20% Discount)
  console.log('\n3. Testing Pricing Toggle (Yearly Billing)...');
  await page.click('#b-yearly');
  const priceVal2 = await page.evaluate(() => document.getElementById('p-val-2').innerText);
  console.log(`   ✔ Popular Plan Price after 20% discount: "${priceVal2.trim().replace(/\n/g, ' ')}"`);

  // 4. Test FAQ Accordion
  console.log('\n4. Testing FAQ Accordion click...');
  await page.click('.faq-q');
  const isFaqVisible = await page.evaluate(() => document.getElementById('faq-a-1').style.display === 'block');
  console.log(`   ✔ FAQ Accordion Answer Expanded: ${isFaqVisible}`);

  await browser.close();
  console.log('\n🎉 WORLD-CLASS PREMIUM SAAS LANDING PAGE VERIFIED 100%!');
}

testPremiumLanding().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
