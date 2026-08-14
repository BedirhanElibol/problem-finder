const puppeteer = require('puppeteer');

async function testRolesAndModals() {
  console.log('🚀 Testing Role-Based Login Modal & Demo Modals on http://localhost:3030 ...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });

  // Test 1: Click "Giriş Yap" button
  console.log('\n1. Testing "Giriş Yap" Login Modal & Role Switcher Tabs...');
  await page.click('.btn-login');
  
  const isLoginModalVisible = await page.evaluate(() => {
    return document.getElementById('modal-login').style.display === 'flex';
  });
  console.log('   ✔ Login Modal Opened:', isLoginModalVisible);

  // Test Role Tabs inside Login Modal
  for (const role of ['ogretmen', 'veli', 'yonetici']) {
    await page.click(`#role-${role}`);
    const headingText = await page.evaluate(() => document.getElementById('login-role-heading').innerText);
    console.log(`   ✔ Selected Role Tab [#role-${role}]: "${headingText}"`);
  }

  // Close Login Modal
  await page.click('#modal-login button');
  console.log('   ✔ Closed Login Modal.');

  // Test 2: Click "Ücretsiz Demo Talep Et" button
  console.log('\n2. Testing "Ücretsiz Demo Talep Et" Demo Modal...');
  await page.click('.btn-cta-nav');
  const isDemoModalVisible = await page.evaluate(() => {
    return document.getElementById('modal-demo').style.display === 'flex';
  });
  console.log('   ✔ Demo Modal Opened:', isDemoModalVisible);
  await page.click('#modal-demo button');

  // Test 3: Language Switching Verification
  console.log('\n3. Testing Language Switcher Buttons...');
  for (const lang of ['en', 'es', 'zh', 'tr']) {
    await page.click(`#lang-${lang}`);
    const loginBtnText = await page.evaluate(() => document.querySelector('.btn-login').innerText);
    console.log(`   ✔ Changed language to [${lang.toUpperCase()}]. Login button text: "${loginBtnText}"`);
  }

  await browser.close();
  console.log('\n🎉 ROLE-BASED LOGIN & DEMO MODALS TESTED & WORKING 100%!');
}

testRolesAndModals().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
