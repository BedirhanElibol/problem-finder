const test = require('node:test');
const assert = require('node:assert');
const { scrapeReddit } = require('../src/scrapers/reddit');
const { scrapeHackerNews } = require('../src/scrapers/hackernews');
const { scrapeProductHunt } = require('../src/scrapers/producthunt');
const { scrapeTwitter } = require('../src/scrapers/twitter');

test('Scrapers validation suite', async (t) => {
    await t.test('scrapeReddit returns posts array', async () => {
        // Since we fetch live feed, we can mock or check if it returns an array
        // We will call the scraper with a popular subreddit to get results
        const posts = await scrapeReddit('wedding', 'frustrated with', 2);
        assert.ok(Array.isArray(posts));
    });

    await t.test('scrapeHackerNews returns posts array', async () => {
        const posts = await scrapeHackerNews('booking pain', 2);
        assert.ok(Array.isArray(posts));
    });

    await t.test('scrapeProductHunt returns posts array', async () => {
        const posts = await scrapeProductHunt(2);
        assert.ok(Array.isArray(posts));
    });

    await t.test('scrapeTwitter returns posts array', async () => {
        const posts = await scrapeTwitter(2);
        assert.ok(Array.isArray(posts));
        assert.ok(posts.length > 0);
    });
});
