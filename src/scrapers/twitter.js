const puppeteer = require('puppeteer');

async function scrapeTwitter(query = "is there an app for", limit = 10) {
    console.log(`[Twitter] '${query}' için aranıyor...`);
    let browser;
    try {
        browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        
        // Go to Twitter search
        const url = `https://twitter.com/search?q=${encodeURIComponent(query)}&src=typed_query&f=live`;
        await page.goto(url, { waitUntil: 'networkidle2' });
        
        // Wait for tweets to load
        await page.waitForSelector('article[data-testid="tweet"]', { timeout: 10000 }).catch(() => console.log("[Twitter] Zaman aşımı veya sonuç bulunamadı."));
        
        // Extract tweet text
        const tweets = await page.evaluate((maxLimits) => {
            const articles = document.querySelectorAll('article[data-testid="tweet"]');
            const results = [];
            for(let i=0; i < Math.min(articles.length, maxLimits); i++) {
                const tweetTextDiv = articles[i].querySelector('div[data-testid="tweetText"]');
                if(tweetTextDiv) {
                    results.push(`Tweet: ${tweetTextDiv.innerText}\n---\n`);
                }
            }
            return results;
        }, limit);
        
        return tweets;
    } catch (error) {
        console.error(`[Twitter Error] ${error.message}`);
        return [];
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

module.exports = { scrapeTwitter };
