const axios = require('axios');
const Parser = require('rss-parser');
const parser = new Parser({
    customFields: {
        item: ['content']
    }
});

async function scrapeReddit(subreddit, query = "hate", limit = 10) {
    console.log(`[Reddit] '${subreddit}' üzerinde '${query}' için aranıyor (RSS ile)...`);
    try {
        const url = `https://www.reddit.com/r/${subreddit}/search.rss?q=${encodeURIComponent(query)}&restrict_sr=1&sort=new`;
        
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            timeout: 10000
        });

        const feed = await parser.parseString(response.data);
        const posts = [];
        
        for (let i = 0; i < Math.min(feed.items.length, limit); i++) {
            const item = feed.items[i];
            // Reddit RSS content is HTML, so we strip HTML tags and unescape some entities.
            // But just the title is often enough for the AI, let's include title.
            posts.push(`[Source: Reddit | Subreddit: r/${subreddit} | Query: ${query}]\nTitle: ${item.title}\n---\n`);
        }
        
        return posts;
    } catch (error) {
        console.error(`[Reddit Error] ${error.message}`);
        return [];
    }
}

module.exports = { scrapeReddit };
