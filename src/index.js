require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { scrapeReddit } = require('./scrapers/reddit');
const { scrapeHackerNews } = require('./scrapers/hackernews');
const { scrapeProductHunt } = require('./scrapers/producthunt');
const { scrapeTwitter } = require('./scrapers/twitter');
const { analyzeComplaints } = require('./ai/analyzer');

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
    console.log("=== 🔍 Problem Finder & Market Opportunity Analyzer ===");
    console.log("=== TrustMRR-İlhamlı Derin Pazar Analizi ===\n");
    
    // 1. Reddit'ten veri çek (rastgele seçilen subbreddit ve keyword'ler ile)
    console.log(">>> 📡 Reddit Verileri Toplanıyor (Dinamik Arama)...");
    const subreddits = ["wedding", "travel", "ecommerce", "creators", "smallbusiness", "marketing", "solopreneur", "eventplanning", "indiehackers", "shopify"];
    const keywords = ["frustrated with", "looking for a tool", "why is there no", "waste of time", "wish there was", "alternative to", "annoying", "hate", "sucks", "need a widget"];
    
    // Rastgele 4 kombinasyon seç
    const redditQueries = [];
    for (let i = 0; i < 4; i++) {
        const sub = subreddits[Math.floor(Math.random() * subreddits.length)];
        const kw = keywords[Math.floor(Math.random() * keywords.length)];
        redditQueries.push({ sub, kw });
    }
    
    const redditData = [];
    for (let i = 0; i < redditQueries.length; i++) {
        const { sub, kw } = redditQueries[i];
        console.log(`[Reddit] 'r/${sub}' üzerinde '${kw}' aranıyor...`);
        const data = await scrapeReddit(sub, kw, 15);
        redditData.push(...data);
        if (i < redditQueries.length - 1) await sleep(3000);
    }
    
    // 2. HackerNews'ten veri çek (rastgele seçilen sorgularla)
    console.log("\n>>> 🟠 Hacker News Verileri Toplanıyor (Dinamik Arama)...");
    const hnQueriesPool = [
        "booking pain", "creator monetization", "travel booking", "local service SaaS", 
        "booking widget", "event planning tool", "sponsorship management", "QR photo sharing",
        "ticket check-in", "paywall widget", "class scheduler widget", "testimonial wall"
    ];
    // Rastgele 3 sorgu seç
    const shuffledHn = hnQueriesPool.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    const hnData = [];
    for (const query of shuffledHn) {
        console.log(`[HackerNews] '${query}' aranıyor...`);
        const data = await scrapeHackerNews(query, 12);
        hnData.push(...data);
    }
    
    // 3. Product Hunt tartışmalarını çek
    console.log("\n>>> 🚀 Product Hunt Tartışmaları Toplanıyor...");
    const phData = await scrapeProductHunt(15);
    
    // 3.5. X/Twitter verilerini çek
    console.log("\n>>> 🐦 X/Twitter Verileri Toplanıyor...");
    const twitterData = await scrapeTwitter(10);
    
    // Verileri Birleştir
    const allData = [
        ...redditData,
        ...hnData,
        ...phData,
        ...twitterData
    ];
    
    const combinedText = allData.join("\n");
    console.log(`\n📊 Toplam ${allData.length} adet veri toplandı. Derin analiz başlıyor...\n`);
    
    // 4. Canlı veri bulunamazsa zengin ve çeşitlendirilmiş mock data kullan
    if (allData.length === 0 || combinedText.trim().length === 0) {
        console.log("\n⚠️ Scraper'lar canlı veri bulamadı (API hatası veya zaman aşımı).");
        console.log("👉 Demo amaçlı, rastgele seçilmiş gerçekçi örnek verilerle analiz yapılıyor...\n");
        
        const mockPool = [
            // Wedding QR photo sharing
            "[Source: Reddit | Subreddit: r/wedding | Query: frustrated with]\nTitle: Wedding photo sharing apps are bloated and require downloads\nContent: We paid $200 for a photo sharing app so guests could upload pictures, but older relatives couldn't figure out how to install the app. I just want a simple QR code on tables: guests scan it, drag and drop their photos from their browser, and it saves to a shared album. No login, no install. I'd pay $29 per event.",
            
            // Local tour booking calendar widget
            "[Source: Hacker News | Query: booking pain]\nTitle: Commission-free tour booking widget for local operators\nContent: I run boat charters in the Caribbean. Rezdy and FareHarbor charge 6% per transaction which eats my margins. I want a clean booking calendar widget I can embed on my custom website that takes payments via Stripe and emails tickets directly. Just a flat $19/mo fee.",
            
            // Link-in-bio Weekly Sponsorship Box
            "[Source: Reddit | Subreddit: r/creators | Query: looking for a tool]\nTitle: Managing sponsorships manually on my Link-in-bio is tedious\nContent: I have 50K followers on Twitter. Setting up sponsorship slots manually is annoying. I want a widget on my Link-in-bio page where sponsors can buy a slot (weekly/monthly) by uploading their banner and paying via Stripe automatically. I'd pay $15/mo.",
            
            // Cleaners/plumbers booking form with meter-price calculator
            "[Source: Reddit | Subreddit: r/smallbusiness | Query: waste of time]\nTitle: Local service booking forms are either ugly or too complex\nContent: Home cleaning businesses need a simple booking form that calculates price based on number of rooms/sqft, checks calendar availability, and collects a card deposit. Most tools are either enterprise CRMs or too ugly. Simple booking widget for local service websites is worth $39/mo.",
            
            // Social Media Visual Templates Generator
            "[Source: Reddit | Subreddit: r/marketing | Query: need a widget]\nTitle: Creating social carousels takes hours\nContent: As a marketing manager, making carousel slides for LinkedIn and Instagram takes hours in Figma. I want a tool that takes a text outline and generates beautiful visual carousel slides using pre-made minimal templates. Single payment of $19.",
            
            // Boutique hotels WhatsApp reservation helper
            "[Source: Reddit | Subreddit: r/travel | Query: booking widget]\nTitle: Direct booking via WhatsApp is hard to track\nContent: Our guesthouse takes reservations via WhatsApp. But managing bank transfers or manually creating Stripe payment links is messy. I want an automation panel that generates a Stripe payment link upon clicking a reservation button and auto-sends the WhatsApp ticket once paid. I'd pay $29/mo.",
            
            // Event ticketing check-in scanner web app
            "[Source: Hacker News | Query: ticket check-in]\nTitle: kapti: Mobile-friendly QR scanner for event check-in\nContent: We host local food festivals. Checking in ticket holders at the entrance is slow. We need a web-based ticket scanner that uses the phone camera (no app download needed for volunteers) and validates our custom ticket database in 500ms. I'd pay $19/mo.",
            
            // Creators subscriber-only newsletter delivery / paywall box
            "[Source: Reddit | Subreddit: r/creators | Query: alternative to]\nTitle: Paywalling PDF guides without Gumroad's high fees\nContent: I want to sell digital PDF guides to my audience. Gumroad takes 10%. I want a simple embeddable buy button that collects credit card info and provides a temporary download link. Just $9/mo flat fee.",
            
            // Independent gym class scheduler widget
            "[Source: Reddit | Subreddit: r/smallbusiness | Query: why is there no]\nTitle: Simple class booking widget for boutique fitness studios\nContent: Mindbody is bloated and costs $120/mo. I run a tiny yoga studio. I just want a simple schedule widget on my site where students select a class, see remaining slots, and pay $15 to reserve. I'd pay $29/mo.",
            
            // Pet boarding/sitter booking and pet-updates photo timeline page
            "[Source: Reddit | Subreddit: r/smallbusiness | Query: waste of time]\nTitle: Sending pet photo updates to owners is manual\nContent: At our pet hotel, owners expect daily photo updates of their dogs. Doing it via WhatsApp is messy. I want a simple app where I can snap a photo, assign it to a pet's profile, and it updates a private timeline page for the owner. I'd pay $25/mo.",
            
            // Local restaurant digital menu with checkout and table routing (no app)
            "[Source: Hacker News | Query: QR photo sharing]\nTitle: Dynamic QR menu order and pay at table\nContent: Customers scan a QR code at the table, view menu, place order, and pay with Apple Pay directly. Order goes to a simple tablet kitchen display. No app download. It prevents long queues. Worth $49/mo.",
            
            // Custom widgets for Notion/Link-in-bio (testimonial wall)
            "[Source: Hacker News | Query: testimonial wall]\nTitle: Dynamic testimonial wall widgets for personal websites\nContent: Existing social proof walls cost $60/year. I just want a lightweight tool where I paste Twitter/ProductHunt review links, and it compiles a gorgeous iframe card grid. Single payment of $19."
        ];
        
        // Rastgele karıştır ve 8 tanesini seç
        const shuffled = mockPool.sort(() => 0.5 - Math.random());
        const mockData = shuffled.slice(0, 8);
        allData.push(...mockData);
    }
    
    const finalCombinedText = allData.join("\n");
    
    // Kalıcı fikir geçmişini yükle (raporlar silinse bile fikir tekrarlarını önlemek için)
    const historyPath = path.join(__dirname, '..', '.idea_history.json');
    let ideaHistory = [];
    if (fs.existsSync(historyPath)) {
        try {
            ideaHistory = JSON.parse(fs.readFileSync(historyPath, 'utf-8'));
        } catch (e) {
            console.warn("[Uyarı] Fikir geçmişi okunamadı, yeni oluşturulacak.");
        }
    }

    // Tüm geçmiş raporları oku (tekrarları önlemek için daha fazla veri sunar)
    let previousReport = "";
    const reportsDir = path.join(__dirname, '..', 'reports');
    
    // Calculate local timezone date string (e.g. GMT+3) instead of UTC to avoid midnight offset issues
    const localDate = new Date();
    const tzOffset = localDate.getTimezoneOffset();
    const localTime = new Date(localDate.getTime() - (tzOffset * 60 * 1000));
    const todayStr = localTime.toISOString().split('T')[0];
    
    try {
        if (fs.existsSync(reportsDir)) {
            const files = fs.readdirSync(reportsDir)
                .filter(f => f.endsWith('-report.md') && !f.includes(todayStr))
                .sort(); // Alfabetik/tarihsel sıralama
            
            if (files.length > 0) {
                // Reverse slice to read newest first so they are at the top of the prompt limits
                const last5Files = files.slice(-5).reverse();
                console.log(`\n📄 Geçmiş Raporlar Okundu (Yeni -> Eski): ${last5Files.join(', ')} (Fikir tekrarlarını engellemek için kullanılacak)`);
                previousReport = last5Files.map(file => {
                    return fs.readFileSync(path.join(reportsDir, file), 'utf-8');
                }).join("\n\n=== RAPOR AYRAC ===\n\n");
            }
        }
    } catch (err) {
        console.warn("[Uyarı] Önceki raporlar okunurken hata:", err.message);
    }
    
    // Her çalıştırmada farklı nişlere odaklanıp yeni fikirler bulması için rastgele bir B2B odak alanı seçelim
    const focusAreas = [
        "Yaratıcı Ekonomisi ve Dijital Ürün Satış Çözümleri (Link-in-bio sponsorluk yönetim araçları, dijital ürün teslimat widget'ları, yaratıcılar için özel abonelik kutuları)",
        "Turizm, Rezervasyon ve Etkinlikler (Yerel tekne/tur operatörleri için komisyonsuz Stripe biletleme motorları, düğün ve etkinlikler için QR kodlu fotoğraf toplama panelleri)",
        "Sosyal Medya, Tasarım ve İçerik Üretici Araçları (Sosyal medya için metinden görsel şablonu/carousel oluşturan araçlar, hızlı video/ses editörleri)",
        "E-ticaret ve Yerel Hizmetler (Butik e-ticaret siteleri için kargo/iade takip asistanları, temizlikçi/tesisatçı siteleri için dinamik fiyat hesaplayan rezervasyon formları)"
    ];
    const randomFocus = focusAreas[Math.floor(Math.random() * focusAreas.length)];
    console.log(`🎯 Bugünün B2B SaaS Analiz Odağı: ${randomFocus}\n`);

    const report = await analyzeComplaints(finalCombinedText, previousReport, randomFocus, ideaHistory);
    
    // 5. Raporu Kaydet
    if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    const reportPath = path.join(reportsDir, `${todayStr}-report.md`);
    fs.writeFileSync(reportPath, report);
    
    console.log(`\n✅ İşlem tamamlandı! Rapor kaydedildi: ${reportPath}`);
    console.log(`📄 Raporu açmak için: code "${reportPath}"`);

    // Yeni fikirleri ve fırsatları rapordan ayıkla ve kalıcı geçmişe ekle
    const newOpportunities = [];
    const newIdeas = [];
    
    // Fırsatları eşleştir: örn. ### Fırsat #1: [B2B] ... veya ### Fırsat 1: ...
    const oppRegex = /### Fırsat #?\d+:\s*(.+)/g;
    let match;
    while ((match = oppRegex.exec(report)) !== null) {
        newOpportunities.push(match[1].trim());
    }
    
    // Fikirleri eşleştir: örn. ### Fikir #1: [B2B] ... veya ### Fikir 1: ...
    const ideaRegex = /### Fikir #?\d+:\s*(.+)/g;
    while ((match = ideaRegex.exec(report)) !== null) {
        newIdeas.push(match[1].trim());
    }
    
    const allNewIdeas = [...newOpportunities, ...newIdeas];
    if (allNewIdeas.length > 0) {
        allNewIdeas.forEach(idea => {
            if (!ideaHistory.includes(idea)) {
                ideaHistory.push(idea);
            }
        });
        // Son 100 fikri tut
        if (ideaHistory.length > 100) {
            ideaHistory = ideaHistory.slice(-100);
        }
        try {
            fs.writeFileSync(historyPath, JSON.stringify(ideaHistory, null, 2), 'utf-8');
            console.log(`💾 ${allNewIdeas.length} adet yeni fırsat/fikir kalıcı geçmişe kaydedildi (.idea_history.json).`);
        } catch (e) {
            console.error("[Hata] Kalıcı fikir geçmişi kaydedilemedi:", e.message);
        }
    }
}

main();
