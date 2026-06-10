const puppeteer = require('puppeteer');

async function scrapeReddit(subreddit, query = "hate", limit = 10) {
    console.log(`[Reddit] '${subreddit}' üzerinde '${query}' için aranıyor...`);
    let browser;
    try {
        browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        
        const url = `https://www.reddit.com/r/${subreddit}/search/?q=${encodeURIComponent(query)}&restrict_sr=1`;
        await page.goto(url, { waitUntil: 'networkidle2' });
        
        await page.waitForSelector('shreddit-post', { timeout: 10000 }).catch(() => console.log("[Reddit] Zaman aşımı veya sonuç bulunamadı."));
        
        const posts = await page.evaluate((maxLimits) => {
            const articles = document.querySelectorAll('shreddit-post');
            const results = [];
            for(let i=0; i < Math.min(articles.length, maxLimits); i++) {
                const title = articles[i].getAttribute('post-title') || '';
                results.push(`Title: ${title}\n---\n`);
            }
            return results;
        }, limit);
        
        return posts;
    } catch (error) {
        console.error(`[Reddit Error] ${error.message}`);
        return [];
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

module.exports = { scrapeReddit };
