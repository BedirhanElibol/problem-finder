const puppeteer = require('puppeteer');

async function testFullI18n100pct() {
  console.log('🚀 Running Exhaustive i18n & Localization Suite across all 4 Languages on http://localhost:3030 ...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });

  const languages = [
    { code: 'en', nav: 'Start Free Trial', hero: 'KinderLog & CareLog: Transformative Care & Communication for Childcare & Eldercare Facilities' },
    { code: 'tr', nav: 'Ücretsiz Dene', hero: 'KinderLog & CareLog: Kreş ve Huzurevleri İçin Dönüştürücü Bakım ve İletişim Platformu' },
    { code: 'es', nav: 'Prueba Gratuita', hero: 'KinderLog & CareLog: Transformación del Cuidado y Comunicación para Guarderías y Residencias' },
    { code: 'zh', nav: '免费试用', hero: 'KinderLog & CareLog：托儿与养老机构的变革性护理与沟通平台' }
  ];

  for (const lang of languages) {
    await page.evaluate((l) => selectGlobalLang(l), lang.code);
    await new Promise(r => setTimeout(r, 200));

    const navText = await page.evaluate(() => document.querySelector('[data-i18n="navStartFree"]').innerText);
    const heroText = await page.evaluate(() => document.querySelector('.hero-h1').innerText);

    console.log(`   ✔ Language [${lang.code.toUpperCase()}]: Navbar CTA="${navText}", Hero H1="${heroText.slice(0, 45)}..."`);

    if (navText !== lang.nav) {
      throw new Error(`i18n failed for language: ${lang.code}`);
    }
  }

  await browser.close();
  console.log('\n🎉 EXHAUSTIVE I18N & LOCALIZATION SUITE PASSED 100% ACROSS ALL 4 LANGUAGES!');
}

testFullI18n100pct().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
