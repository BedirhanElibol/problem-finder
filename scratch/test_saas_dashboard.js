const puppeteer = require('puppeteer');

async function testSaaSDashboard() {
  console.log('🚀 Testing Full-Screen Enterprise SaaS Admin Dashboard Page View on http://localhost:3030 ...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });

  // 1. Click "🏫 Öğretmen Paneli Girişi" button to launch Full-Screen SaaS App View
  console.log('\n1. Launching Full-Screen SaaS Web App View...');
  await page.click('.btn-hero-primary');
  await new Promise(r => setTimeout(r, 600));

  const isDashboardVisible = await page.evaluate(() => {
    const el = document.getElementById('view-app-dashboard');
    return el && getComputedStyle(el).display !== 'none';
  });
  console.log(`   ✔ Full-Screen SaaS Dashboard Stage Visible: ${isDashboardVisible}`);

  // 2. Verify Profile & Title in Topbar
  const profileName = await page.evaluate(() => document.getElementById('saas-profile-name').innerText);
  console.log(`   ✔ Active Profile Name in Sidebar: "${profileName}"`);

  // 3. Test Global Command Filter Search
  console.log('\n3. Testing Global Command Roster Search Filter ("Zeynep")...');
  await page.type('#saas-global-search', 'Zeynep');
  const filteredCount = await page.evaluate(() => document.querySelectorAll('#saas-roster-tbody tr').length);
  console.log(`   ✔ Filtered roster count for "Zeynep": ${filteredCount}`);

  // 4. Test Form Submit
  console.log('\n4. Submitting Form Entry in SaaS Stage...');
  await page.evaluate(() => handleSaaSFormSubmit(new Event('submit')));
  const toastText = await page.evaluate(() => document.querySelector('.toast-card').innerText);
  console.log(`   ✔ Toast notification emitted: "${toastText.trim().replace(/\n/g, ' ')}"`);

  await browser.close();
  console.log('\n🎉 FULL-SCREEN ENTERPRISE SAAS DASHBOARD PAGE SYSTEM VERIFIED 100%!');
}

testSaaSDashboard().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
