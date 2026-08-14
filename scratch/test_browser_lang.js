const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function testLanguages() {
  console.log('🚀 Launching Puppeteer browser test on http://localhost:3030 ...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });

  const langs = ['en', 'es', 'zh', 'tr'];

  for (const lang of langs) {
    console.log(`\n--- Testing Language: [${lang.toUpperCase()}] ---`);
    await page.click(`#lang-${lang}`);
    await new Promise(r => setTimeout(r, 500)); // wait for DOM update

    // Extract text of key sections
    const data = await page.evaluate(() => {
      return {
        badge: document.querySelector('[data-i18n="hero.badge"]')?.innerText,
        title: document.querySelector('[data-i18n="hero.title"]')?.innerText,
        navLogin: document.querySelector('[data-i18n="nav.login"]')?.innerText,
        trustTitle: document.querySelector('[data-i18n="trust.title"]')?.innerText,
        portalTitle: document.querySelector('[data-i18n="portal.title"]')?.innerText,
        compTitle: document.querySelector('[data-i18n="comp.title"]')?.innerText,
        pricingTitle: document.querySelector('[data-i18n="pricing.title"]')?.innerText,
        planKresTitle: document.querySelector('[data-i18n="pricing.planKresTitle"]')?.innerText,
        planSeniorTitle: document.querySelector('[data-i18n="pricing.planSeniorTitle"]')?.innerText,
        ctaKres: document.querySelector('[data-i18n="pricing.ctaKres"]')?.innerText,
        ctaSenior: document.querySelector('[data-i18n="pricing.ctaSenior"]')?.innerText,
        footerText: document.querySelector('[data-i18n="footer.text"]')?.innerText
      };
    });

    console.log('Result:', JSON.stringify(data, null, 2));

    const screenshotPath = path.join(__dirname, `lang_${lang}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`📸 Screenshot saved to ${screenshotPath}`);
  }

  await browser.close();
  console.log('\n✅ All language tests completed successfully!');
}

testLanguages().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
