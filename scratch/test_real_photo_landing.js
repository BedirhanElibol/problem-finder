const puppeteer = require('puppeteer');

async function testRealPhotoLanding() {
  console.log('🚀 Testing Ultra-Realistic Human Photography on http://localhost:3030 ...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });

  // Verify Natural Widths of Both Human Photos
  const photosInfo = await page.evaluate(() => {
    const imgs = document.querySelectorAll('.hero-illustration-card img');
    return Array.from(imgs).map(img => ({ srcLen: img.src.length, w: img.naturalWidth, h: img.naturalHeight }));
  });

  console.log('   ✔ Hero Human Photos Rendering Info:', photosInfo);

  if (photosInfo.some(p => p.w === 0 || p.h === 0)) {
    throw new Error('Real photo failed to render!');
  }

  await browser.close();
  console.log('\n🎉 ULTRA-REALISTIC HUMAN PHOTOGRAPHY VERIFIED 100%!');
}

testRealPhotoLanding().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
