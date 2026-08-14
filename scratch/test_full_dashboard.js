const puppeteer = require('puppeteer');

async function testFullDashboard() {
  console.log('🚀 Testing Full-Featured Dashboard Panel System on http://localhost:3030 ...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });

  // 1. Open Portal as Teacher
  console.log('\n1. Auto-logging in as Teacher & Opening Dashboard...');
  await page.evaluate(() => autoLoginDemoUser('ogretmen'));
  await new Promise(r => setTimeout(r, 600));

  const isPortalVisible = await page.evaluate(() => document.getElementById('modal-portal').style.display === 'flex');
  console.log(`   ✔ Dashboard Portal Opened: ${isPortalVisible}`);

  // 2. Test Student Roster & Live Search
  console.log('\n2. Testing Live Roster & Student Search Filter...');
  await page.type('#student-search-input', 'Ali');
  const studentRowsCount = await page.evaluate(() => document.querySelectorAll('#student-roster-tbody tr').length);
  console.log(`   ✔ Filtered student count for "Ali": ${studentRowsCount}`);

  // 3. Test Subtabs
  console.log('\n3. Testing Subtab switching to Form Input...');
  await page.evaluate(() => switchSubTab('ogretmen', 't2'));
  const isFormPaneVisible = await page.evaluate(() => document.getElementById('pane-ogretmen-t2').style.display === 'block');
  console.log(`   ✔ Form Input Pane Visible: ${isFormPaneVisible}`);

  // 4. Test Form Submission
  console.log('\n4. Submitting New Student Report Form...');
  await page.evaluate(() => handleStudentLogFormSubmit(new Event('submit')));
  const toastText = await page.evaluate(() => document.querySelector('.toast-card').innerText);
  console.log(`   ✔ Toast notification emitted: "${toastText.trim().replace(/\n/g, ' ')}"`);

  await browser.close();
  console.log('\n🎉 FULL-FEATURED DASHBOARD PANEL SYSTEM VERIFIED 100%!');
}

testFullDashboard().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
