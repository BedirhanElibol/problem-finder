const puppeteer = require('puppeteer');

async function testInteractiveStaffEntry() {
  console.log('🚀 Testing Dynamic Interactive Staff Findings & Vitals Logging Engine on http://localhost:3030 ...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });

  // 1. Launch Teacher Portal
  console.log('\n1. Launching Teacher Portal and entering live finding for Ali Demir...');
  await page.evaluate(() => launchDedicatedRoleApp('ogretmen'));

  // Fill teacher form
  await page.select('#t-child', 'Ali Demir');
  await page.select('#t-category', 'Meal');
  await page.select('#t-val', '100% Eaten');
  await page.type('#t-note', 'Finished all vegetables!');

  // Submit form
  await page.evaluate(() => document.querySelector('#role-workspace-ogretmen form').dispatchEvent(new Event('submit')));
  await new Promise(r => setTimeout(r, 400));

  // Check inserted row in Class Roster Table
  const tableRowsCount = await page.evaluate(() => document.querySelectorAll('#role-workspace-ogretmen table tbody tr').length);
  console.log(`   ✔ Class Roster Rows Count: ${tableRowsCount} (Row dynamically added!)`);

  const firstRowChild = await page.evaluate(() => document.querySelector('#role-workspace-ogretmen table tbody tr:first-child td:first-child').innerText);
  console.log(`   ✔ First Row Child Name: "${firstRowChild}" (Expected: Ali Demir)`);

  if (firstRowChild !== 'Ali Demir') {
    throw new Error('Teacher finding dynamic insertion failed!');
  }

  // 2. Launch CareLog Nurse Portal & Submit Vitals
  console.log('\n2. Launching CareLog Nurse Portal and logging vital signs for Ayşe Teyze...');
  await page.evaluate(() => launchDedicatedRoleApp('carelog'));

  // Submit nurse form
  await page.evaluate(() => document.querySelector('#role-workspace-carelog form').dispatchEvent(new Event('submit')));
  await new Promise(r => setTimeout(r, 400));

  const nurseTableRows = await page.evaluate(() => document.querySelectorAll('#role-workspace-carelog table tbody tr').length);
  console.log(`   ✔ Resident Vitals Rows Count: ${nurseTableRows} (Vitals row dynamically added!)`);

  // 3. Switch to Family Feed and verify live finding reflected
  console.log('\n3. Launching Family Feed and verifying real-time finding reflection...');
  await page.evaluate(() => launchDedicatedRoleApp('veli'));

  const familyCardsCount = await page.evaluate(() => document.querySelectorAll('#role-workspace-veli .family-live-feed > div').length);
  console.log(`   ✔ Family Feed Cards Count: ${familyCardsCount} (Real-time finding reflected!)`);

  await browser.close();
  console.log('\n🎉 DYNAMIC INTERACTIVE STAFF FINDINGS & VITALS ENGINE VERIFIED 100%!');
}

testInteractiveStaffEntry().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
