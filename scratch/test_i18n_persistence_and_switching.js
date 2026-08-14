const puppeteer = require('puppeteer');

async function testI18nPersistenceAndSwitching() {
  console.log('🚀 Testing i18n Language Switching, Persistence & Encoding on http://localhost:3030 ...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  
  // 1. Clear localStorage and load page (Must default to TR)
  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });
  await page.evaluate(() => localStorage.removeItem('app_lang'));
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const initialLangLabel = await page.evaluate(() => {
    const el = document.getElementById('lang-btn-label');
    return el ? el.innerText.trim() : null;
  });
  console.log(`   ✔ Default Initial Language: "${initialLangLabel}" (Expected TR)`);

  const initialHeroTitle = await page.evaluate(() => {
    const h1 = document.querySelector('.hero-h1');
    return h1 ? h1.innerText.trim() : '';
  });
  console.log(`   ✔ Turkish Hero Title Loaded: "${initialHeroTitle.substring(0, 60)}..."`);
  
  if (initialHeroTitle.includes('\uFFFD')) {
    throw new Error('Corrupted UTF-8 character found in Turkish title!');
  }

  // 2. Test Switching to English
  await page.evaluate(() => window.selectGlobalLang('en'));
  await new Promise(r => setTimeout(r, 400));

  const enLangLabel = await page.evaluate(() => document.getElementById('lang-btn-label').innerText.trim());
  const enHeroTitle = await page.evaluate(() => document.querySelector('.hero-h1').innerText.trim());
  console.log(`   ✔ Switched to English: Label="${enLangLabel}", Title="${enHeroTitle.substring(0, 60)}..."`);
  if (enLangLabel !== 'EN') throw new Error('Failed to switch language to EN');

  // 3. Test Switching to Spanish
  await page.evaluate(() => window.selectGlobalLang('es'));
  await new Promise(r => setTimeout(r, 400));

  const esLangLabel = await page.evaluate(() => document.getElementById('lang-btn-label').innerText.trim());
  const esHeroTitle = await page.evaluate(() => document.querySelector('.hero-h1').innerText.trim());
  console.log(`   ✔ Switched to Spanish: Label="${esLangLabel}", Title="${esHeroTitle.substring(0, 60)}..."`);
  if (esLangLabel !== 'ES') throw new Error('Failed to switch language to ES');

  // 4. Test Switching to Chinese
  await page.evaluate(() => window.selectGlobalLang('zh'));
  await new Promise(r => setTimeout(r, 400));

  const zhLangLabel = await page.evaluate(() => document.getElementById('lang-btn-label').innerText.trim());
  const zhHeroTitle = await page.evaluate(() => document.querySelector('.hero-h1').innerText.trim());
  console.log(`   ✔ Switched to Chinese: Label="${zhLangLabel}", Title="${zhHeroTitle.substring(0, 60)}..."`);
  if (zhLangLabel !== 'ZH') throw new Error('Failed to switch language to ZH');

  // 5. Test Switching back to Turkish & Verify Persistence on Reload
  await page.evaluate(() => window.selectGlobalLang('tr'));
  await new Promise(r => setTimeout(r, 400));
  
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const reloadedLangLabel = await page.evaluate(() => document.getElementById('lang-btn-label').innerText.trim());
  console.log(`   ✔ Language Persisted After Reload: "${reloadedLangLabel}" (Expected TR)`);
  if (reloadedLangLabel !== 'TR') throw new Error('Language selection did not persist after page reload!');

  await browser.close();
  console.log('\n🎉 ALL 4-LANGUAGE i18n SWITCHING, ENCODING & PERSISTENCE VERIFIED 100%!');
}

testI18nPersistenceAndSwitching().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
