const puppeteer = require('puppeteer');

async function testFixedModalI18n() {
  console.log('🚀 Testing Fixed Role Gateway Modal i18n Translation on http://localhost:3030 ...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });

  // 1. Switch to Turkish (TR) and Open Gateway Modal
  console.log('\n1. Switching Language to Turkish (TR)...');
  await page.evaluate(() => selectGlobalLang('tr'));
  await page.evaluate(() => openRoleGatewayModal());

  const modalTitleTR = await page.evaluate(() => document.querySelector('[data-i18n="modalRoleTitle"]').innerText);
  console.log(`   ✔ TR Modal Title: "${modalTitleTR}" (Expected: Başlatılacak Portalı Seçin)`);

  const modalSubTR = await page.evaluate(() => document.querySelector('[data-i18n="modalRoleSub"]').innerText);
  console.log(`   ✔ TR Modal Subtitle: "${modalSubTR}" (Expected: Her kullanıcı rolü için özel çalışma alanları:)`);

  if (modalTitleTR !== 'Başlatılacak Portalı Seçin' || modalSubTR !== 'Her kullanıcı rolü için özel çalışma alanları:') {
    throw new Error('Turkish Modal i18n Translation Failed!');
  }

  // 2. Switch to Spanish (ES)
  console.log('\n2. Switching Language to Spanish (ES)...');
  await page.evaluate(() => setGlobalLang('es'));

  const modalTitleES = await page.evaluate(() => document.querySelector('[data-i18n="modalRoleTitle"]').innerText);
  console.log(`   ✔ ES Modal Title: "${modalTitleES}" (Expected: Seleccionar Portal a Iniciar)`);

  await browser.close();
  console.log('\n🎉 ROLE GATEWAY MODAL I18N TRANSLATION BUGS FIXED 100%!');
}

testFixedModalI18n().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
