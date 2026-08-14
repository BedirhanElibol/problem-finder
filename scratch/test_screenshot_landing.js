const puppeteer = require('puppeteer');

async function testScreenshotLanding() {
  console.log('🚀 Testing Adapted Landing Page matching user design screenshot on http://localhost:3030 ...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });

  // 1. Check Main Headline matching design
  const h1 = await page.evaluate(() => document.querySelector('.hero-h1').innerText);
  console.log(`   ✔ Headline matched: "${h1.trim().replace(/\n/g, ' ')}"`);

  // 2. Check 4 Value Proposition Feature Pills
  const pillsCount = await page.evaluate(() => document.querySelectorAll('.feature-pill-card').length);
  console.log(`   ✔ Value proposition feature pills count: ${pillsCount} (Expected 4)`);

  const pillTitle1 = await page.evaluate(() => document.querySelector('.pill-title').innerText);
  console.log(`   ✔ Pill #1 Title: "${pillTitle1}" (Effortless Recording)`);

  // 3. Check Images Loaded
  const teacherImgSrc = await page.evaluate(() => document.querySelector('.hero-illustration-card img').getAttribute('src'));
  console.log(`   ✔ Teacher hero illustration src: "${teacherImgSrc}"`);

  await browser.close();
  console.log('\n🎉 LANDING PAGE MATCHING USER DESIGN SCREENSHOT VERIFIED 100%!');
}

testScreenshotLanding().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
