const puppeteer = require('puppeteer');

async function checkTitleCleanliness() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });
  
  const title = await page.evaluate(() => document.querySelector('.hero-h1').innerText);
  console.log('Title extracted from page:', title);
  console.log('Contains replacement char \\uFFFD:', title.includes('\uFFFD'));

  await browser.close();
}

checkTitleCleanliness();
