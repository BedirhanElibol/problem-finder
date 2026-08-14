const axios = require('axios');

const PH_QUERIES = [
    "product hunt launch feedback",
    "small business tool launch",
    "SaaS for local business",
    "booking system launch",
    "invoicing tool small business",
    "client portal launch",
    "scheduling app small business",
    "CRM alternative launch",
    "property management tool",
    "restaurant management launch",
    "salon booking launch",
    "freelancer tool launch"
];

async function scrapeProductHunt(limit = 15) {
    console.log(`[ProductHunt] En yeni ürünlerin tartışmaları aranıyor (API ile)...`);
    try {
        // Product Hunt doesn't have a public search API without auth,
        // so we use Hacker News Algolia search with rotating queries
        const randomQuery = PH_QUERIES[Math.floor(Math.random() * PH_QUERIES.length)];
        const url = `https://hn.algolia.com/api/v1/search_by_date?query=${encodeURIComponent(randomQuery)}&tags=story&hitsPerPage=${limit}`;
        
        const response = await axios.get(url, { timeout: 10000 });

        const hits = response.data.hits;
        const posts = [];
        
        for (let i = 0; i < Math.min(hits.length, limit); i++) {
            const hit = hits[i];
            const title = hit.title || hit.story_title || '';
            if (title.trim()) {
                posts.push(`[Source: HackerNews-ProductHunt | Query: ${randomQuery}]\nTitle: ${title}\n---\n`);
            }
        }
        
        return posts;
    } catch (error) {
        console.error(`[ProductHunt Error] ${error.message}`);
        return [];
    }
}

module.exports = { scrapeProductHunt };
