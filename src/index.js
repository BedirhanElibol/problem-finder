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
    // === FİZİKSEL / YEREL HİZMET NİŞLERİ ===
    const physicalSubreddits = [
        // Orijinal nişler
        "wedding", "travel", "ecommerce", "creators", "smallbusiness", "solopreneur", "eventplanning", "indiehackers", "shopify",
        // Sağlık & Klinik
        "dentistry", "veterinary", "physicaltherapy", "optometry", "chiropractor",
        // Gayrimenkul & Mülk
        "realestate", "propertymanagement", "landlord", "airbnb_hosts",
        // Restoran & F&B
        "restaurateur", "barowners", "coffeeshops", "catering", "foodtruck",
        // Freelance & Ajans
        "freelance", "graphic_design", "photography", "videography", "webdev",
        // Fitness & Spor
        "fitness", "personaltraining", "crossfit", "martialarts",
        // Güzellik & Bakım
        "hairstylist", "estheticians", "tattoo", "nailtech",
        // Hizmet & Lojistik
        "contractor", "landscaping", "trucking", "autodetailing", "hvac",
        // Eğitim & Çocuk
        "daycare", "tutoring", "privateschool",
        // Muhasebe & Hukuk
        "accounting", "legaladvice", "bookkeeping",
        // Tarım & Sera
        "farming", "gardening", "hydroponics"
    ];

    // === DİJİTAL / SaaS NİŞLERİ (TrustMRR İstihbaratı) ===
    const digitalSubreddits = [
        // E-ticaret & Shopify Ekosistemi
        "dropshipping", "AmazonSeller", "Etsy", "WooCommerce",
        // Creator Economy & İçerik Üretimi
        "NewTubers", "podcasting", "Blogging", "ContentCreation", "DigitalNomad",
        // Pazarlama & SEO
        "SEO", "PPC", "EmailMarketing", "GrowthHacking", "ContentMarketing",
        // Satış & CRM
        "sales", "coldEmail", "leadgeneration",
        // Müşteri Destek
        "CustomerSuccess", "helpdesk",
        // SaaS Genel
        "SaaS", "startups", "microsaas",
        // HR & İşe Alım
        "humanresources", "recruiting",
        // No-Code
        "nocode"
    ];

    const subreddits = [...physicalSubreddits, ...digitalSubreddits];
    const keywords = [
        // Orijinal anahtar kelimeler
        "frustrated with", "looking for a tool", "why is there no", "waste of time", "wish there was", "alternative to", "annoying", "hate", "sucks", "need a widget",
        // Derin problem sinyalleri
        "paying too much for", "switched from", "canceling my subscription", "manual process", "spreadsheet nightmare",
        "no good solution", "overpriced", "clunky", "overkill for", "too expensive",
        "wasting hours on", "built my own", "cobbled together", "duct tape solution", "jury-rigged",
        "need something simple", "tired of", "broken workflow", "nobody makes", "shut up and take my money",
        // SaaS/Dijital dünya sinyalleri (TrustMRR insight)
        "too complex for small", "cheaper alternative to", "simpler version of", "self-hosted alternative",
        "integration doesn't work", "onboarding sucks", "API is terrible", "dashboard is useless",
        "can't export data", "locked into", "per seat pricing", "hidden fees",
        "enterprise only", "need for small team", "solo founder tool"
    ];
    
    // Dengeli dağılım: min 2 fiziksel + 2 dijital + 2 rastgele (toplam 6)
    const redditQueries = [];
    // 2 fiziksel niş garanti
    for (let i = 0; i < 2; i++) {
        const sub = physicalSubreddits[Math.floor(Math.random() * physicalSubreddits.length)];
        const kw = keywords[Math.floor(Math.random() * keywords.length)];
        redditQueries.push({ sub, kw });
    }
    // 2 dijital niş garanti
    for (let i = 0; i < 2; i++) {
        const sub = digitalSubreddits[Math.floor(Math.random() * digitalSubreddits.length)];
        const kw = keywords[Math.floor(Math.random() * keywords.length)];
        redditQueries.push({ sub, kw });
    }
    // 2 tamamen rastgele (her iki havuzdan)
    for (let i = 0; i < 2; i++) {
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
        if (i < redditQueries.length - 1) await sleep(5000 + Math.random() * 3000);
    }
    
    // 2. HackerNews'ten veri çek (rastgele seçilen sorgularla)
    console.log("\n>>> 🟠 Hacker News Verileri Toplanıyor (Dinamik Arama)...");
    const hnQueriesPool = [
        // Orijinal sorgular
        "booking pain", "creator monetization", "travel booking", "local service SaaS", 
        "booking widget", "event planning tool", "sponsorship management", "QR photo sharing",
        "ticket check-in", "paywall widget", "class scheduler widget", "testimonial wall",
        // Sağlık & Klinik
        "dentist software pain", "veterinary practice management", "clinic appointment scheduling",
        "patient portal", "medical billing small practice",
        // Gayrimenkul
        "real estate CRM pain", "property management software", "tenant portal",
        "rental listing automation", "open house scheduling",
        // Restoran & F&B
        "restaurant POS alternative", "food truck ordering system", "kitchen display system",
        "restaurant inventory management", "menu QR ordering",
        // Freelance & Ajans
        "freelancer invoicing pain", "client portal freelance", "proposal automation",
        "contract management freelance", "agency project management",
        // Fitness & Güzellik
        "gym management software", "salon booking system", "personal trainer scheduling",
        "barbershop software", "nail salon booking",
        // Hizmet & Lojistik
        "contractor estimating software", "landscaping scheduling", "trucking dispatch software",
        "auto shop management", "HVAC scheduling",
        // Eğitim
        "daycare management software", "tutoring platform small", "online course platform alternative",
        // Muhasebe & Hukuk
        "accounting automation small business", "law firm client portal", "bookkeeping pain",
        // === TrustMRR İSTİHBARAT: DİJİTAL / SaaS NİŞLERİ ===
        // E-ticaret Operasyonları
        "Shopify alternative small store", "e-commerce returns management", "product photo optimization tool",
        "inventory management pain point", "cross-sell widget ecommerce",
        // Creator Economy
        "newsletter monetization tool", "creator sponsorship CRM", "digital product delivery platform",
        "course platform alternative Teachable",
        // Pazarlama & SEO
        "SEO tool small business affordable", "cold email deliverability tool", "social proof notification widget",
        "backlink building tool alternative",
        // Satış & CRM
        "CRM for solo founder", "sales pipeline small team tool", "proposal software freelance alternative",
        // Müşteri Destek
        "helpdesk alternative small team", "shared inbox affordable",
        // Analytics
        "simple analytics dashboard alternative", "Stripe revenue dashboard indie",
        // HR & İşe Alım
        "hiring tool startup small", "employee onboarding small company"
    ];
    // Rastgele 5 sorgu seç (eskiden 3'tü)
    const shuffledHn = hnQueriesPool.sort(() => 0.5 - Math.random()).slice(0, 5);
    
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
            // === DİŞ KLİNİĞİ & SAĞLIK ===
            "[Source: Reddit | Subreddit: r/dentistry | Query: frustrated with]\nTitle: Dental practice management software is overpriced garbage\nContent: I run a small dental clinic with 2 chairs. Dentrix costs $400/mo and Open Dental is confusing. All I need is appointment scheduling with SMS reminders, a simple patient intake form patients fill on a tablet, and insurance verification status tracking. I'd pay $79/mo for something clean and simple.",
            
            "[Source: Reddit | Subreddit: r/veterinary | Query: manual process]\nTitle: Tracking pet vaccinations and sending reminders is all manual\nContent: Our vet clinic still uses paper cards for vaccination records. When a booster is due, we have to manually check files and call owners. A simple system where we log vaccines, auto-calculate next due dates, and send SMS/email reminders would save us 5 hours/week. Worth $49/mo easily.",
            
            // === GAYRİMENKUL & MÜLK YÖNETİMİ ===
            "[Source: Reddit | Subreddit: r/propertymanagement | Query: spreadsheet nightmare]\nTitle: Managing 15 rental units with spreadsheets is killing me\nContent: I manage 15 rental properties. Tracking rent payments, maintenance requests, and lease renewals in Excel is a nightmare. Every property management software I find is designed for 500+ units and costs $200+/mo. I need a simple dashboard for small landlords. $39/mo.",
            
            "[Source: Reddit | Subreddit: r/realestate | Query: no good solution]\nTitle: Open house sign-in sheets are still paper\nContent: As a realtor, I use paper sign-in sheets at open houses. Then I manually type each name and phone number into my CRM. A simple tablet app where visitors tap their info, it auto-sends a follow-up email, and exports to CSV would be amazing. $19/mo.",
            
            // === RESTORAN & YİYECEK-İÇECEK ===
            "[Source: Reddit | Subreddit: r/restaurateur | Query: too expensive]\nTitle: Toast POS charges a fortune for basic features\nContent: Toast charges us $165/mo plus payment processing fees. For a 30-seat restaurant, that's insane. I just need: take orders on a tablet, send to kitchen printer, split bills, and process cards. Why does this cost so much? Someone build a $49/mo alternative.",
            
            "[Source: Reddit | Subreddit: r/foodtruck | Query: wasting hours on]\nTitle: Food truck pre-ordering is impossible without expensive apps\nContent: I run a taco truck. Customers line up for 30 minutes. If I had a simple website where people pre-order and pay before arriving, I could have their food ready. Square Online is clunky for mobile food. I need something purpose-built for food trucks. $29/mo.",
            
            // === FREELANCE & AJANS ===
            "[Source: Reddit | Subreddit: r/freelance | Query: cobbled together]\nTitle: Freelancer proposal + contract + invoice is 3 different tools\nContent: I use Canva for proposals, HelloSign for contracts, and Wave for invoices. It's ridiculous. I want ONE tool where I create a proposal, client approves it, contract auto-generates, and when work is done, invoice sends automatically. For freelancers, not enterprises. $19/mo.",
            
            "[Source: Reddit | Subreddit: r/photography | Query: looking for a tool]\nTitle: Client photo gallery delivery is broken\nContent: After a wedding shoot, I need to deliver 500+ photos to clients. Dropbox looks unprofessional, Google Drive has no selection/favorites feature. I want a branded gallery where clients can favorite, download, and even order prints. Pixieset is $20/mo but their UI is dated. $15/mo.",
            
            // === FİTNES & SPOR ===
            "[Source: Reddit | Subreddit: r/personaltraining | Query: need something simple]\nTitle: Personal trainer client tracking is all in my Notes app\nContent: I train 20 clients. I track their workouts, measurements, and progress photos in Apple Notes. It's chaos. I want a simple app where each client has a profile, I log their sessions, they can see their progress chart, and I can send them their workout plan. Not a full gym management system. $29/mo.",
            
            "[Source: Reddit | Subreddit: r/crossfit | Query: alternative to]\nTitle: Wodify is overkill for a small box\nContent: We're a 50-member CrossFit box. Wodify costs $149/mo. We literally only use it for class scheduling and WOD posting. If someone made a simple class scheduler with a daily WOD board that members can access, I'd switch instantly. $39/mo.",
            
            // === GÜZELLİK & KUAFÖR ===
            "[Source: Reddit | Subreddit: r/hairstylist | Query: paying too much for]\nTitle: Salon booking software charges per stylist which gets expensive\nContent: I own a salon with 4 stylists. Vagaro charges $25/stylist/mo = $100/mo total. All I really need is online booking, Google Calendar sync, and automated reminder texts. A flat-rate tool for small salons would be great. $49/mo flat, no per-seat pricing.",
            
            "[Source: Reddit | Subreddit: r/tattoo | Query: broken workflow]\nTitle: Tattoo deposit management is pure chaos\nContent: Clients DM me on Instagram to book. I ask for a $50 deposit via Venmo. Half forget. I need a booking page where clients pick a date, see my portfolio, pay the deposit via Stripe, and sign a consent form digitally. All in one link I can put in my bio. $25/mo.",
            
            // === İNŞAAT & TAŞERONLUK ===
            "[Source: Reddit | Subreddit: r/contractor | Query: duct tape solution]\nTitle: Contractor job estimating is still done on napkins\nContent: I'm a general contractor. Creating estimates involves measuring, calculating materials, adding labor, then formatting it nicely in Word. An app where I input room dimensions, select finish types, and it auto-generates a professional PDF estimate with my logo would save hours. $39/mo.",
            
            "[Source: Reddit | Subreddit: r/landscaping | Query: tired of]\nTitle: Landscape crew scheduling is a whiteboard nightmare\nContent: I run a landscaping company with 3 crews. Scheduling which crew goes where is done on a whiteboard. If it rains, rescheduling is chaos. I need a simple drag-and-drop calendar where I assign jobs to crews, they see it on their phones, and clients get an 'on our way' text. $49/mo.",
            
            // === LOJİSTİK & OTOMOTİV ===
            "[Source: Reddit | Subreddit: r/trucking | Query: waste of time]\nTitle: Small fleet dispatch is all phone calls and texts\nContent: I have 5 trucks. Dispatching loads is done via phone calls and group texts. I need a simple board showing which truck is where, which load they're carrying, and ETA. Not a full TMS that costs $500/mo. Just a visual dispatch board for small fleets. $79/mo.",
            
            "[Source: Reddit | Subreddit: r/autodetailing | Query: wish there was]\nTitle: Auto detailing booking + upselling is impossible\nContent: I run a mobile detailing business. Clients book via text. I wish I had a booking page where they pick a package (Basic/Premium/Ceramic), see the price, add extras (pet hair removal +$30), pick a date, and pay a deposit. Upselling would increase my revenue 30%. $29/mo.",
            
            // === EĞİTİM & ÇOCUK ===
            "[Source: Reddit | Subreddit: r/daycare | Query: frustrated with]\nTitle: Daycare parent communication is scattered across 5 apps\nContent: We use text for daily reports, email for billing, a paper sign-in sheet, and Facebook for photos. Parents hate it. I want ONE parent portal: digital check-in/out, daily activity reports with photos, invoice/payment tracking, and a message center. Brightwheel costs $200/mo for 30 kids. $59/mo.",
            
            "[Source: Reddit | Subreddit: r/tutoring | Query: no good solution]\nTitle: Tracking tutoring sessions and payments is impossible\nContent: I tutor 12 students privately. Scheduling, tracking hours, and invoicing parents is done in 3 different apps. A simple tool where parents book sessions, I confirm, hours are tracked, and invoices auto-generate monthly would save my sanity. $19/mo.",
            
            // === MUHASEBE & HUKUK ===
            "[Source: Reddit | Subreddit: r/accounting | Query: clunky]\nTitle: Client document collection for tax season is email hell\nContent: Every tax season I chase 100+ clients for W2s, receipts, and bank statements via email. I need a secure portal where each client has a checklist, uploads their docs, and I can see completion status at a glance. Smartvault costs $50/mo minimum. $29/mo.",
            
            "[Source: Reddit | Subreddit: r/legaladvice | Query: overpriced]\nTitle: Small law firm client intake is still paper forms\nContent: Clio is $49/user/mo which is $200/mo for our 4-person firm. We really just need: client intake form on our website, automatic conflict check, engagement letter e-sign, and a simple case status portal clients can check. $59/mo flat.",
            
            // === TARIM & SERA ===
            "[Source: Reddit | Subreddit: r/farming | Query: manual process]\nTitle: Farm stand inventory and pre-orders are managed on paper\nContent: We run a small organic farm with a roadside stand. Customers ask what's available via Facebook messenger. I want a simple online store showing current harvest availability, where customers can pre-order and pick up. Not Shopify-level complexity. $19/mo.",
            
            "[Source: Reddit | Subreddit: r/hydroponics | Query: looking for a tool]\nTitle: Tracking grow room conditions across multiple sensors is chaos\nContent: I run a small hydroponic operation with 8 grow trays. I check pH, EC, temperature, and humidity manually 3 times a day and log it in a notebook. A simple dashboard where I input readings and it shows trends/alerts when something is off range would prevent crop losses. $25/mo.",
            
            // === HVAC & TEKNİK SERVİS ===
            "[Source: Reddit | Subreddit: r/hvac | Query: built my own]\nTitle: HVAC service agreement tracking is a filing cabinet\nContent: We have 200 service agreement customers. Tracking when each unit needs its semi-annual maintenance, sending reminders, and managing renewals is done in a filing cabinet. I built a janky spreadsheet but it breaks. A simple CRM for HVAC service agreements. $49/mo.",
            
            // === KATERING & ETKİNLİK ===
            "[Source: Reddit | Subreddit: r/catering | Query: need something simple]\nTitle: Catering quote calculator for my website\nContent: As a caterer, every inquiry starts with 'how much for 50 people?' I want a calculator on my website where clients select menu type, guest count, service style (buffet/plated), and instantly see an estimate. Then they can submit a formal inquiry. Saves me hours of back-and-forth. $29/mo.",
            
            // === BAR & GECE HAYATI ===
            "[Source: Reddit | Subreddit: r/barowners | Query: nobody makes]\nTitle: Bar tab management is stuck in the 90s\nContent: Opening tabs, tracking who ordered what, and splitting bills at 2am is chaos. Square doesn't handle tabs well. I want a system where customers open a tab by scanning a QR at the bar, order from their phone, and close/split when done. No app download. $69/mo.",
            
            // === VİDEOGRAFİ ===
            "[Source: Reddit | Subreddit: r/videography | Query: waste of time]\nTitle: Sending wedding video drafts for client review is painful\nContent: I upload a 2GB draft to Google Drive, client watches, tells me timestamps of changes in a long email. I want a video review portal where clients watch and leave time-stamped comments directly on the video. Frame.io is $15/user/mo and overkill. $19/mo for freelance videographers."
        ];
        
        // === DİJİTAL / SaaS NİŞLERİ MOCK DATA (TrustMRR İstihbaratı) ===
        const digitalMockPool = [
            // === E-TİCARET OPERASYONLARI ===
            "[Source: Reddit | Subreddit: r/shopify | Query: wasting hours on]\nTitle: Managing returns across Shopify and Amazon is killing me\nContent: I sell on both Shopify and Amazon. Returns come through different channels with different policies. No unified view of all returns, reason codes, and refund status. I need a single dashboard showing everything across platforms. Loop Returns is $300/mo minimum. I'd pay $49/mo for something simpler.",
            
            "[Source: Reddit | Subreddit: r/Etsy | Query: manual process]\nTitle: Syncing inventory between Etsy and Shopify is spreadsheet hell\nContent: I sell handmade candles on both Etsy and Shopify. When something sells on one platform, I manually update the other. I've oversold 3 times this month. A simple 2-way inventory sync tool. Not a full ERP. $29/mo.",
            
            // === CREATOR ECONOMY ===
            "[Source: Reddit | Subreddit: r/NewTubers | Query: no good solution]\nTitle: Tracking YouTube sponsorship deals is pure chaos\nContent: I have 50K subscribers. Sponsor inquiries come from email, Instagram DMs, and my manager. I track everything in a Google Sheet. I need a simple CRM: track deals, contracts, deliverables, payment status, and deadlines. Not HubSpot. Something built for creators. $29/mo.",
            
            "[Source: Reddit | Subreddit: r/podcasting | Query: looking for a tool]\nTitle: Podcast sponsorship invoicing takes me 2 hours per week\nContent: I run a podcast with 4 sponsors per episode. Creating invoices, tracking payments, sending ad performance reports to sponsors — all manual. A tool that auto-generates invoices from my sponsorship calendar and tracks payment status. $19/mo.",
            
            "[Source: Reddit | Subreddit: r/Blogging | Query: frustrated with]\nTitle: Selling digital downloads on my blog is harder than it should be\nContent: I sell PDF guides and Notion templates on my blog. Gumroad takes 10% + fees. I want a simple checkout widget I can embed on any page: customer pays via Stripe, gets instant download link, I keep 97% of revenue. No marketplace. Just a checkout button. $15/mo.",
            
            // === PAZARLAMA & SEO ===
            "[Source: Reddit | Subreddit: r/SEO | Query: too expensive]\nTitle: Ahrefs is $99/mo just to check my backlinks\nContent: I run a small business website. All I need is: check my backlinks, find broken links, see competitor backlinks, get basic keyword difficulty scores. Ahrefs, SEMrush, Moz — all $99+/mo. I need a simple backlink checker for small sites. Would gladly pay $19/mo.",
            
            "[Source: Reddit | Subreddit: r/GrowthHacking | Query: wish there was]\nTitle: Social proof notifications that actually work without bloat\nContent: I want a simple widget showing 'John from NYC just signed up 5 mins ago' on my landing page. ProveSource is $29/mo for basic plan. I literally need ONE widget with real-time Stripe/signup webhook. $9/mo.",
            
            // === SATIŞ & CRM ===
            "[Source: Reddit | Subreddit: r/sales | Query: alternative to]\nTitle: HubSpot free CRM is crippled, paid is too expensive for solopreneurs\nContent: Solo founder here. HubSpot free works until you need email sequences — then it's $50/mo+. All I need: contact database, deal pipeline with drag-and-drop, email templates, and follow-up reminders. For 1-3 person teams. $19/mo.",
            
            "[Source: Reddit | Subreddit: r/coldEmail | Query: cobbled together]\nTitle: Cold email follow-up tracking is 5 tabs and a spreadsheet\nContent: I send 50 cold emails/day for my agency. Tracking who opened, who replied, who needs follow-up is chaos. Lemlist charges $59/mo per seat. I need: send sequences, track opens/replies, auto-follow-up, basic CRM. For small agencies. $29/mo.",
            
            // === MÜŞTERİ DESTEK ===
            "[Source: Reddit | Subreddit: r/SaaS | Query: overkill for]\nTitle: Zendesk is absurd for a 2-person SaaS team\nContent: We have a SaaS with 200 users. Customer support comes through email. Zendesk wants $19/agent/mo minimum and the UI is overwhelming. I need: shared inbox, canned responses, basic ticket status (open/pending/closed), and a simple FAQ widget for our site. $15/mo total, not per seat.",
            
            // === ANALİTİK & DASHBOARD ===
            "[Source: Reddit | Subreddit: r/microsaas | Query: built my own]\nTitle: I built a janky Stripe dashboard because nothing simple exists\nContent: I have 3 micro-SaaS products on Stripe. Seeing my MRR, churn rate, and revenue per product requires exporting CSV and making pivot tables. I built a Google Sheets dashboard but it breaks monthly. A simple Stripe MRR/Churn/LTV dashboard for indie hackers. $9/mo.",
            
            "[Source: Reddit | Subreddit: r/startups | Query: dashboard is useless]\nTitle: Google Analytics 4 is unusable for non-technical founders\nContent: GA4 migration broke all my reports. I just want to see: visitors today, top pages, where traffic comes from, and conversion rate. That's it. Plausible is $9/mo but doesn't do funnels. Simple Analytics is nice but limited. A founder-friendly analytics dashboard. $12/mo.",
            
            // === HR & İŞE ALIM ===
            "[Source: Reddit | Subreddit: r/humanresources | Query: need for small team]\nTitle: Applicant tracking for a 10-person company is impossible\nContent: We're hiring 2-3 people. Resumes come to a shared inbox. We forward them to hiring managers. Comments are scattered across Slack and email. Greenhouse wants $6K/year. I just need: job posting page, applicant pipeline (applied/phone screen/interview/offer), and team comments. $29/mo.",
            
            "[Source: Reddit | Subreddit: r/recruiting | Query: simpler version of]\nTitle: Employee onboarding is still a PDF checklist\nContent: Every new hire gets a 3-page PDF checklist: set up email, join Slack channels, read handbook, sign NDA. Half the items don't get done. A digital onboarding checklist where the new hire and manager can track completion. Not BambooHR ($8/employee). $19/mo flat.",
            
            // === NO-CODE & SaaS GENEL ===
            "[Source: Reddit | Subreddit: r/nocode | Query: cheaper alternative to]\nTitle: Building a simple client portal shouldn't require a developer\nContent: I'm a consultant. I want a portal where my clients can: see project status, upload documents, view invoices, and message me. Every solution is either $99/mo or requires coding. A no-code client portal builder for service businesses. $29/mo."
        ];
        
        // Dengeli seçim: 4 fiziksel + 4 dijital + 4 rastgele (toplam 12)
        const shuffledPhysical = mockPool.sort(() => 0.5 - Math.random());
        const shuffledDigital = digitalMockPool.sort(() => 0.5 - Math.random());
        const physicalPicks = shuffledPhysical.slice(0, 4);
        const digitalPicks = shuffledDigital.slice(0, 4);
        // Kalan 4'ü her iki havuzdan rastgele
        const remainingPool = [...shuffledPhysical.slice(4), ...shuffledDigital.slice(4)];
        const randomPicks = remainingPool.sort(() => 0.5 - Math.random()).slice(0, 4);
        const mockData = [...physicalPicks, ...digitalPicks, ...randomPicks];
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
        // === FİZİKSEL / YEREL HİZMET NİŞLERİ ===
        "Turizm, Rezervasyon ve Etkinlikler (Yerel tur operatörleri, düğün planlayıcıları, etkinlik organizatörleri için rezervasyon ve biletleme araçları)",
        "Sağlık, Diş ve Veteriner Klinikler (Küçük klinikler için randevu yönetimi, hasta portalı, aşı/tedavi takip, SMS hatırlatma sistemleri)",
        "Gayrimenkul ve Mülk Yönetimi (Ev sahipleri ve emlakçılar için kiracı portalı, kira takibi, bakım talep yönetimi, açık ev dijitalleştirme araçları)",
        "Restoran, Kafe ve Yiyecek-İçecek Operasyonları (Küçük restoranlar için POS alternatifleri, food truck sipariş sistemleri, mutfak ekranları, envanter takibi)",
        "Freelancer ve Ajans Araçları (Serbest çalışanlar için teklif-sözleşme-fatura birleşik panelleri, fotoğrafçı müşteri galerileri, proje yönetim araçları)",
        "Fitness, Spor ve Kişisel Antrenörlük (Butik spor stüdyoları ve PT'ler için müşteri takibi, ders planlama, ilerleme fotoğrafı/ölçüm takip araçları)",
        "Güzellik, Kuaför ve Bakım Sektörü (Kuaför salonları, dövmeciler ve güzellik uzmanları için randevu/depozito yönetimi, müşteri CRM'i)",
        "İnşaat, Taşeronluk ve Peyzaj (Müteahhitler için otomatik keşif/teklif oluşturucu, ekip-iş atama takvimi, saha raporu portalları)",
        "Lojistik, Filo ve Oto Servis (Küçük filolar için görsel sevkiyat panosu, oto kuaför/detailing randevu ve upselling sistemleri)",
        "Eğitim, Kreş ve Özel Ders (Küçük kreşler için ebeveyn portalı, özel ders öğretmenleri için seans takip ve faturalama araçları)",
        "Muhasebe, Hukuk ve Belge Yönetimi (Küçük muhasebe/hukuk büroları için müşteri belge toplama portalı, müvekkil durum izleme paneli)",
        "Tarım, Sera ve Çiftlik (Küçük çiftlikler için ürün stok/satış yönetimi, sera iklim takip panoları, doğrudan tüketiciye satış portalları)",
        // === DİJİTAL / SaaS NİŞLERİ (TrustMRR İstihbaratı) ===
        "E-ticaret Operasyonları ve Shopify/Etsy Ekosistemi (Küçük e-ticaret mağazaları için envanter senkronizasyonu, iade yönetim portalı, ürün fotoğrafı optimizasyonu, sipariş hazırlama takibi, çapraz satış widget'ları, kargo takip sayfaları — TrustMRR: $616K toplam gelir, %19 büyüme, EN BÜYÜK hacim)",
        "İçerik Üretici (Creator) Ekonomisi ve Dijital Ürün Satışı (Youtuber, podcaster, bülten yazarı, kurs satıcısı için sponsorluk yönetim CRM'i, dijital ürün teslimat otomasyonu, abone yönetimi, gelir takibi, topluluk yönetimi araçları — TrustMRR: $14,220 ortalama MRR, EN YÜKSEK ortalama gelir)",
        "Pazarlama, SEO ve Büyüme Araçları (Küçük SaaS ve e-ticaret işletmeleri için uygun fiyatlı backlink analizi, soğuk e-posta optimizasyonu, sosyal kanıt widget'ları, landing page A/B test araçları, anahtar kelime takip panoları — TrustMRR: %158 büyüme, EN HIZLI büyüyen kategori)",
        "Satış, CRM ve Lead Generation (Solo kurucular ve küçük satış ekipleri için basit deal pipeline yönetimi, soğuk e-posta takibi, teklif/sözleşme/fatura tek akış, lead skorlama, LinkedIn prospecting araçları — TrustMRR: $2,101 ort. MRR, müşterilerin en kolay para ödediği alan)",
        "Müşteri Destek ve Paylaşımlı Gelen Kutusu (Küçük SaaS ekipleri için uygun fiyatlı ticket yönetimi, shared inbox, FAQ widget, canlı sohbet alternatifleri, müşteri memnuniyeti anketi araçları — TrustMRR: $2,066 ort. MRR, olgun ve stabil pazar)",
        "SaaS Analitik ve Gelir Takibi (Indie hacker ve küçük SaaS kurucuları için MRR/Churn/LTV dashboard, Stripe gelir analizi, kullanıcı davranış analizi, cohort analiz, basit heatmap araçları — TrustMRR: $3,048 ort. MRR, yüksek yapışkanlık)",
        "İşe Alım, HR ve Çalışan Yönetimi (Küçük startup ve KOBİ'ler için basit başvuru takip sistemi ATS, onboarding checklist oluşturucu, çalışan izin/maaş takibi, performans değerlendirme araçları — TrustMRR: keşfedilmemiş niş, düşük rekabet)"
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
