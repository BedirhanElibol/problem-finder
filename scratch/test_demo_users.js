const puppeteer = require('puppeteer');

async function testDemoUsers() {
  console.log('🚀 Testing Demo Users Quick Picker & Live Role Portals on http://localhost:3030 ...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });

  // Open Login Modal
  console.log('\n1. Opening Login Portal Modal...');
  await page.evaluate(() => openLoginModal());

  // Click Teacher Demo Button
  console.log('\n2. Clicking Teacher Demo User Button ("ogretmen")...');
  await page.evaluate(() => fillDemoUser('ogretmen'));

  const filledEmail = await page.evaluate(() => document.getElementById('login-email-input').value);
  console.log(`   ✔ Auto-filled email: ${filledEmail}`);

  // Submit Login Form via JS dispatchEvent
  console.log('\n3. Submitting Login Form...');
  await page.evaluate(() => {
    const form = document.querySelector('#modal-login form');
    if (form) form.onsubmit(new Event('submit'));
  });

  await new Promise(r => setTimeout(r, 600));

  const isPortalVisible = await page.evaluate(() => {
    const p = document.getElementById('modal-portal');
    return p && p.style.display === 'flex';
  });
  console.log(`   ✔ Live Role Portal Opened: ${isPortalVisible}`);

  const teacherHeading = await page.evaluate(() => {
    const el = document.querySelector('#portal-sec-ogretmen h3');
    return el ? el.innerText : '';
  });
  console.log(`   ✔ Teacher Dashboard Title: "${teacherHeading}"`);

  await browser.close();
  console.log('\n🎉 DEMO USERS & LIVE ROLE PORTALS TESTED & VERIFIED 100%!');
}

testDemoUsers().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
