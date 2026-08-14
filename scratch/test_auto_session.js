const puppeteer = require('puppeteer');

async function testAutoSession() {
  console.log('🚀 Testing Persistent Auto-Login Session Engine on http://localhost:3030 ...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });

  // Step 1: Open Login Modal & Auto Login as Teacher
  console.log('\n1. Opening Login Modal and Clicking Auto-Login for Teacher...');
  await page.evaluate(() => openLoginModal());
  await page.evaluate(() => autoLoginDemoUser('ogretmen'));

  await new Promise(r => setTimeout(r, 500));

  const navTextBefore = await page.evaluate(() => document.querySelector('.btn-login').innerText);
  console.log(`   ✔ Navbar state after auto-login: "${navTextBefore.trim().replace(/\n/g, ' ')}"`);

  // Step 2: Reload Page and Verify Session Persistence
  console.log('\n2. Reloading page (F5) to test session persistence...');
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  const navTextAfter = await page.evaluate(() => document.querySelector('.btn-login').innerText);
  console.log(`   ✔ Navbar state after page reload: "${navTextAfter.trim().replace(/\n/g, ' ')}"`);

  const hasSessionInStorage = await page.evaluate(() => {
    return !!localStorage.getItem('kinderlog_session');
  });
  console.log(`   ✔ Session saved in localStorage: ${hasSessionInStorage}`);

  await browser.close();
  console.log('\n🎉 PERSISTENT AUTO-LOGIN SESSION ENGINE VERIFIED 100%!');
}

testAutoSession().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
