const axios = require('axios');

async function scrapeHackerNews(query = "wish there was an app", limit = 10) {
    console.log(`[HackerNews] '${query}' için aranıyor (Algolia API ile)...`);
    try {
        const url = `https://hn.algolia.com/api/v1/search_by_date?query=${encodeURIComponent(query)}&tags=story`;
        
        const response = await axios.get(url, {
            timeout: 10000
        });

        const hits = response.data.hits;
        const posts = [];
        
        for (let i = 0; i < Math.min(hits.length, limit); i++) {
            const hit = hits[i];
            const title = hit.title || hit.story_title || '';
            posts.push(`[Source: Hacker News | Query: ${query}]\nTitle: ${title}\n---\n`);
        }
        
        return posts;
    } catch (error) {
        console.error(`[HackerNews Error] ${error.message}`);
        return [];
    }
}

module.exports = { scrapeHackerNews };
