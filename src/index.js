require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { scrapeReddit } = require('./scrapers/reddit');
const { scrapeTwitter } = require('./scrapers/twitter');
const { analyzeComplaints } = require('./ai/analyzer');

async function main() {
    console.log("=== Problem Finder & Complaint Analyzer Başlatılıyor ===");
    
    // 1. Reddit'ten veri çek
    console.log("\n>>> Reddit Verileri Toplanıyor...");
    const redditData1 = await scrapeReddit("startups", "hate", 15);
    const redditData2 = await scrapeReddit("SaaS", "hard to", 15);
    const redditData3 = await scrapeReddit("Entrepreneur", "why is there no app", 10);
    
    // 2. Twitter'dan veri çek
    console.log("\n>>> Twitter Verileri Toplanıyor...");
    const twitterData = await scrapeTwitter("I wish there was an app that", 10);
    
    // Verileri Birleştir
    const allData = [
        ...redditData1, 
        ...redditData2, 
        ...redditData3, 
        ...twitterData
    ];
    
    const combinedText = allData.join("\n");
    console.log(`\nToplam ${allData.length} adet veri toplandı. Analiz ediliyor...\n`);
    
    // 3. Yapay Zeka Analizi
    if (allData.length === 0 || combinedText.trim().length === 0) {
        console.log("\n⚠️ Scraper'lar canlı veri bulamadı (Reddit 403 veya Twitter Captcha engeline takıldı).");
        console.log("👉 Demo amaçlı, sistemi test etmek için örnek (mock) şikayet verileri Gemini'a gönderiliyor...\n");
        
        const mockData = [
            "Title: Why is there no app for tracking SaaS spending?",
            "Content: I hate when I realize I've been paying for 5 different SaaS tools I don't use. It's so hard to keep track of everything across different teams. We need a unified dashboard.",
            "Title: Finding a good co-founder is impossible",
            "Content: I wish there was an app that actually matched you with co-founders based on work ethic and complementary skills, not just a dating-app swipe interface.",
            "Tweet: I'm so sick of email. Why hasn't anyone reinvented email for project management yet? Slack is too noisy, email is too slow.",
            "Title: Why is B2B sales so manual?",
            "Content: I hate having to copy paste data from LinkedIn to our CRM. It's 2024, why is there no app that just automates this specific workflow without costing $1000/mo?"
        ];
        allData.push(...mockData);
    }
    
    const finalCombinedText = allData.join("\n");
    const report = await analyzeComplaints(finalCombinedText);
    
    // 4. Raporu Kaydet
    const reportsDir = path.join(__dirname, '..', 'reports');
    if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    const dateStr = new Date().toISOString().split('T')[0];
    const reportPath = path.join(reportsDir, `${dateStr}-report.md`);
    fs.writeFileSync(reportPath, report);
    
    console.log(`\n✅ İşlem tamamlandı! Rapor kaydedildi: ${reportPath}`);
}

main();
