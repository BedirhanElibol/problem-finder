const puppeteer = require('puppeteer');

async function testLegalCompliance() {
  console.log('🚀 Testing KVKK & GDPR Cookie Banner, Privacy Policy & Terms Modals on http://localhost:3030 ...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  // Clear localStorage before load
  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // 1. Check Cookie Banner visibility
  const cookieBannerVisible = await page.evaluate(() => {
    const el = document.getElementById('cookie-banner');
    return el && getComputedStyle(el).display !== 'none';
  });
  console.log(`   ✔ KVKK/GDPR Cookie Banner Visible on Load: ${cookieBannerVisible}`);
  if (!cookieBannerVisible) {
    throw new Error('Cookie Banner failed to show on first visit!');
  }

  // 2. Click Accept All Cookies
  await page.evaluate(() => acceptCookies('all'));
  await new Promise(r => setTimeout(r, 400));
  const consentStored = await page.evaluate(() => localStorage.getItem('kinderlog_cookie_consent'));
  console.log(`   ✔ Cookie Consent saved in localStorage: "${consentStored}"`);
  if (consentStored !== 'all') {
    throw new Error('Cookie consent failed to save in localStorage!');
  }

  // 3. Open Privacy Policy & KVKK Modal
  await page.evaluate(() => openLegalModal('privacy'));
  await new Promise(r => setTimeout(r, 400));
  const privacyModalVisible = await page.evaluate(() => {
    const el = document.getElementById('modal-privacy');
    return el && getComputedStyle(el).display !== 'none';
  });
  console.log(`   ✔ Privacy Policy & KVKK Disclosure Modal Opened: ${privacyModalVisible}`);
  if (!privacyModalVisible) {
    throw new Error('Privacy Policy modal failed to open!');
  }

  // Close Privacy Modal
  await page.evaluate(() => closeLegalModal('privacy'));
  await new Promise(r => setTimeout(r, 300));

  // 4. Open Terms of Service Modal
  await page.evaluate(() => openLegalModal('terms'));
  await new Promise(r => setTimeout(r, 400));
  const termsModalVisible = await page.evaluate(() => {
    const el = document.getElementById('modal-terms');
    return el && getComputedStyle(el).display !== 'none';
  });
  console.log(`   ✔ Terms of Service (SLA) Modal Opened: ${termsModalVisible}`);
  if (!termsModalVisible) {
    throw new Error('Terms of Service modal failed to open!');
  }

  await browser.close();
  console.log('\n🎉 ALL LEGAL & KVKK/GDPR COMPLIANCE COMPONENTS VERIFIED 100%!');
}

testLegalCompliance().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
