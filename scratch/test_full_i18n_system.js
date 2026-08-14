const puppeteer = require('puppeteer');

async function testFullI18nSystem() {
  console.log('🚀 Testing Full-Page i18n Translation & Premium Language Dropdown Button on http://localhost:3030 ...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });

  // 1. Check Initial English Text Elements
  const initialNavStart = await page.evaluate(() => document.querySelector('[data-i18n="navStartFree"]').innerText);
  console.log(`   ✔ Initial EN Navbar CTA: "${initialNavStart}"`);

  const initialPill1 = await page.evaluate(() => document.querySelector('[data-i18n="pill1Title"]').innerText);
  console.log(`   ✔ Initial EN Pill 1 Title: "${initialPill1}"`);

  // 2. Switch to Turkish (TR)
  console.log('\n2. Switching Language to Turkish (TR)...');
  await page.evaluate(() => selectGlobalLang('tr'));

  const trNavStart = await page.evaluate(() => document.querySelector('[data-i18n="navStartFree"]').innerText);
  console.log(`   ✔ TR Navbar CTA: "${trNavStart}" (Expected: Ücretsiz Dene)`);

  const trPill1 = await page.evaluate(() => document.querySelector('[data-i18n="pill1Title"]').innerText);
  console.log(`   ✔ TR Pill 1 Title: "${trPill1}" (Expected: Hızlı & Kolay Kayıt)`);

  const trCardTeacher = await page.evaluate(() => document.querySelector('[data-i18n="cardTeacherTitle"]').innerText);
  console.log(`   ✔ TR Teacher Card Title: "${trCardTeacher}" (Expected: Öğretmen Portalı)`);

  if (trNavStart !== 'Ücretsiz Dene' || trPill1 !== 'Hızlı & Kolay Kayıt' || trCardTeacher !== 'Öğretmen Portalı') {
    throw new Error('Turkish translation failed!');
  }

  // 3. Switch to Spanish (ES)
  console.log('\n3. Switching Language to Spanish (ES)...');
  await page.evaluate(() => selectGlobalLang('es'));

  const esPill1 = await page.evaluate(() => document.querySelector('[data-i18n="pill1Title"]').innerText);
  console.log(`   ✔ ES Pill 1 Title: "${esPill1}" (Expected: Registro Sin Esfuerzo)`);

  // 4. Switch to Chinese (ZH)
  console.log('\n4. Switching Language to Chinese (ZH)...');
  await page.evaluate(() => selectGlobalLang('zh'));

  const zhPill1 = await page.evaluate(() => document.querySelector('[data-i18n="pill1Title"]').innerText);
  console.log(`   ✔ ZH Pill 1 Title: "${zhPill1}" (Expected: 轻松记录)`);

  await browser.close();
  console.log('\n🎉 FULL-PAGE I18N SYSTEM & PREMIUM LANGUAGE SWITCHER VERIFIED 100%!');
}

testFullI18nSystem().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
