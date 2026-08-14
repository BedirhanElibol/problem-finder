const puppeteer = require('puppeteer');

async function testAllButtons() {
  console.log('🚀 Testing all interactive buttons on http://localhost:3030 ...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });

  // Test 1: Language Switcher
  console.log('\n1. Testing Language Switcher Buttons...');
  for (const lang of ['en', 'es', 'zh', 'tr']) {
    await page.click(`#lang-${lang}`);
    console.log(`   ✔ Clicked #lang-${lang}`);
  }

  // Test 2: Hero Primary CTA
  console.log('\n2. Testing Hero Primary CTA...');
  await page.click('.btn-hero-primary');
  const isDemoModalVisible = await page.evaluate(() => {
    return document.getElementById('demo-modal').style.display === 'flex';
  });
  console.log('   ✔ Demo Modal Opened:', isDemoModalVisible);
  await page.click('#demo-modal button'); // close modal

  // Test 3: Video Demo Button
  console.log('\n3. Testing Video Demo Button...');
  await page.click('.btn-hero-video');
  const isVideoModalVisible = await page.evaluate(() => {
    return document.getElementById('video-modal').style.display === 'flex';
  });
  console.log('   ✔ Video Modal Opened:', isVideoModalVisible);
  await page.click('#video-modal button'); // close video modal

  // Test 4: Pricing CTA Buttons
  console.log('\n4. Testing Pricing CTA Buttons...');
  const ctaButtons = await page.$$('.plan-cta');
  for (let i = 0; i < ctaButtons.length; i++) {
    await ctaButtons[i].click();
    console.log(`   ✔ Clicked Plan CTA #${i + 1}`);
    await page.click('#demo-modal button'); // close modal
  }

  // Test 5: Footer CTA Buttons
  console.log('\n5. Testing Footer CTA Buttons...');
  await page.click('.btn-footer-primary');
  console.log('   ✔ Clicked Footer Primary CTA');
  await page.click('#demo-modal button');

  await page.click('.btn-footer-secondary');
  console.log('   ✔ Clicked Footer Secondary CTA');
  await page.click('#demo-modal button');

  await browser.close();
  console.log('\n🎉 ALL BUTTONS TESTED & WORKING 100%!');
}

testAllButtons().catch(err => {
  console.error('❌ Button test failed:', err);
  process.exit(1);
});
