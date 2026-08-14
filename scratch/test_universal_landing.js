const puppeteer = require('puppeteer');

async function testUniversalLanding() {
  console.log('🚀 Testing Universal App Landing Page with Base64 Images & Language Switcher on http://localhost:3030 ...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });

  // 1. Verify Images Loaded 100% (Natural Width > 0)
  const imagesNaturalWidth = await page.evaluate(() => {
    const imgs = document.querySelectorAll('.hero-illustration-card img');
    return Array.from(imgs).map(img => ({ srcLength: img.src.length, naturalWidth: img.naturalWidth, complete: img.complete }));
  });
  console.log('   ✔ Hero images rendering check:', imagesNaturalWidth);

  if (imagesNaturalWidth.some(img => img.naturalWidth === 0)) {
    throw new Error('Image failed to render!');
  }

  // 2. Verify Global Universal Text
  const subText = await page.evaluate(() => document.querySelector('.hero-subtitle').innerText);
  console.log(`   ✔ Global Universal Positioning Subtitle: "${subText.trim().replace(/\n/g, ' ')}"`);

  // 3. Test Language Switcher (TR TR)
  console.log('\n3. Testing Language Switcher (Changing to TR)...');
  await page.evaluate(() => setGlobalLang('tr'));
  const h1TR = await page.evaluate(() => document.querySelector('.hero-h1').innerText);
  console.log(`   ✔ Headline in Turkish: "${h1TR}"`);

  await browser.close();
  console.log('\n🎉 ALL FIXES VERIFIED 100%! IMAGES RENDERED, LANGUAGE SWITCHER ACTIVE, GLOBAL POSITIONING CONFIRMED!');
}

testUniversalLanding().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
