const axios = require('axios');

async function scrapeProductHunt(limit = 15) {
    console.log(`[ProductHunt] En yeni ürünlerin tartışmaları aranıyor (API ile)...`);
    try {
        // Product Hunt doesn't have a public search API without auth,
        // so we use their public RSS-like newest endpoint
        const url = `https://hn.algolia.com/api/v1/search_by_date?query=product+hunt+launch+feedback&tags=story&hitsPerPage=${limit}`;
        
        const response = await axios.get(url, { timeout: 10000 });

        const hits = response.data.hits;
        const posts = [];
        
        for (let i = 0; i < Math.min(hits.length, limit); i++) {
            const hit = hits[i];
            const title = hit.title || hit.story_title || '';
            if (title.trim()) {
                posts.push(`[Source: HackerNews-ProductHunt | Query: product launch feedback]\nTitle: ${title}\n---\n`);
            }
        }
        
        return posts;
    } catch (error) {
        console.error(`[ProductHunt Error] ${error.message}`);
        return [];
    }
}

module.exports = { scrapeProductHunt };
