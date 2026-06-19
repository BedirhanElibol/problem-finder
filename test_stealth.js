const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function run() {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    console.log("Testing Reddit...");
    await page.goto("https://www.reddit.com/r/startups/search/?q=hate&restrict_sr=1&sort=new", { waitUntil: 'networkidle2' });
    const title = await page.title();
    console.log("Reddit Title:", title);
    
    console.log("Testing Twitter...");
    await page.goto("https://twitter.com/search?q=test&src=typed_query&f=live", { waitUntil: 'networkidle2' });
    const tTitle = await page.title();
    console.log("Twitter Title:", tTitle);
    
    await browser.close();
}

run();
