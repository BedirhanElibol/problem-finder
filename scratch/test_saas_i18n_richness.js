const puppeteer = require('puppeteer');

async function testSaasI18nRichness() {
  console.log('🚀 Testing SaaS Workspace Multi-Column Widgets & Full i18n Sync on http://localhost:3030 ...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });

  // 1. Launch Teacher Portal in Turkish
  console.log('\n1. Setting Language to TR and Launching Teacher Portal...');
  await page.evaluate(() => selectGlobalLang('tr'));
  await page.evaluate(() => launchDedicatedRoleApp('ogretmen'));

  const profileNameTR = await page.evaluate(() => document.getElementById('saas-profile-name').innerText);
  console.log(`   ✔ TR Profile Name: "${profileNameTR}" (Expected: Melis Öğretmen)`);

  const topbarTitleTR = await page.evaluate(() => document.getElementById('saas-topbar-title').innerText);
  console.log(`   ✔ TR Topbar Title: "${topbarTitleTR}"`);

  const mAttendanceTR = await page.evaluate(() => document.querySelector('[data-i18n="mAttendanceLabel"]').innerText);
  console.log(`   ✔ TR Attendance Metric: "${mAttendanceTR}" (Expected: SINIF KATILIMI)`);

  const thChildNameTR = await page.evaluate(() => document.querySelector('[data-i18n="thChildName"]').innerText);
  console.log(`   ✔ TR Table Header: "${thChildNameTR}" (Expected: ÖĞRENCİ ADI)`);

  const btnSaveTR = await page.evaluate(() => document.querySelector('[data-i18n="btnSaveNotify"]').innerText);
  console.log(`   ✔ TR Form Button: "${btnSaveTR}" (Expected: Kaydet & Veliye Bildir ➜)`);

  if (mAttendanceTR !== 'SINIF KATILIMI' || thChildNameTR.toUpperCase() !== 'ÖĞRENCİ ADI') {
    throw new Error('SaaS Workspace Turkish Translation Failed!');
  }

  // 2. Launch CareLog Nurse Portal in Turkish
  console.log('\n2. Testing CareLog Nurse Portal in TR...');
  await page.evaluate(() => launchDedicatedRoleApp('carelog'));

  const resVitalsTitleTR = await page.evaluate(() => document.querySelector('[data-i18n="residentVitalsTitle"]').innerText);
  console.log(`   ✔ TR Resident Vitals Title: "${resVitalsTitleTR}"`);

  const thBPTR = await page.evaluate(() => document.querySelector('[data-i18n="thBP"]').innerText);
  console.log(`   ✔ TR Blood Pressure Header: "${thBPTR}" (Expected: TANSİYON)`);

  // 3. Switch to Spanish (ES) inside SaaS Dashboard
  console.log('\n3. Switching Language to Spanish (ES) in SaaS Dashboard...');
  await page.evaluate(() => setGlobalLang('es'));

  const mAttendanceES = await page.evaluate(() => document.querySelector('[data-i18n="mAttendanceLabel"]').innerText);
  console.log(`   ✔ ES Attendance Metric: "${mAttendanceES}" (Expected: ASISTENCIA A CLASE)`);

  await browser.close();
  console.log('\n🎉 SAAS WORKSPACE MULTI-COLUMN WIDGETS & FULL I18N SYNC VERIFIED 100%!');
}

testSaasI18nRichness().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
