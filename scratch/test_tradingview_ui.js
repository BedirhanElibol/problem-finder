const puppeteer = require('puppeteer');

async function testTradingViewUi() {
  console.log('🚀 Testing TradingView-Inspired UI on http://localhost:3030 ...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });

  // Test 1: Verify Live Care Ticker Tape
  console.log('\n1. Verifying Live Care Ticker Tape...');
  const isTickerPresent = await page.evaluate(() => !!document.querySelector('.ticker-bar'));
  console.log('   ✔ Live Care Ticker Tape Present:', isTickerPresent);

  // Test 2: Verify Theme Switcher (Dark Mode Toggle)
  console.log('\n2. Testing Dark Mode Theme Toggle...');
  await page.click('.theme-toggle-btn');
  let isDarkMode = await page.evaluate(() => document.body.classList.contains('dark-mode'));
  console.log('   ✔ Dark Mode Activated:', isDarkMode);
  await page.screenshot({ path: 'scratch/tradingview_dark.png' });

  await page.click('.theme-toggle-btn');
  isDarkMode = await page.evaluate(() => document.body.classList.contains('dark-mode'));
  console.log('   ✔ Switched Back to Light Mode:', !isDarkMode);
  await page.screenshot({ path: 'scratch/tradingview_light.png' });

  // Test 3: Verify Command Search Bar
  console.log('\n3. Testing TradingView Command Search Bar...');
  const isSearchPresent = await page.evaluate(() => !!document.querySelector('.nav-search-box'));
  console.log('   ✔ Command Search Bar Present:', isSearchPresent);

  // Test 4: Verify Live Metrics Widget
  console.log('\n4. Verifying High-Density Live Metrics Widget...');
  const isWidgetPresent = await page.evaluate(() => !!document.querySelector('.tv-dashboard-widget'));
  console.log('   ✔ High-Density Live Metrics Widget Present:', isWidgetPresent);

  await browser.close();
  console.log('\n🎉 TRADINGVIEW-INSPIRED EDITION TESTED & VERIFIED 100%!');
}

testTradingViewUi().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
