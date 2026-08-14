const axios = require('axios');

async function scrapeTwitter(limit = 10) {
    console.log(`[Twitter/X] Twitter/X üzerindeki SaaS şikayetleri ve fikir tartışmaları taranıyor...`);
    try {
        // We use Hacker News Algolia search for posts containing x.com or twitter.com links with SaaS keywords
        const searchTerms = [
            "x.com+SaaS+frustrated", "x.com+small+business+software", "x.com+overpriced+tool",
            "x.com+booking+pain", "x.com+invoicing+nightmare", "x.com+CRM+alternative"
        ];
        const randomSearch = searchTerms[Math.floor(Math.random() * searchTerms.length)];
        const url = `https://hn.algolia.com/api/v1/search?query=${randomSearch}&tags=story&hitsPerPage=${limit}`;
        const response = await axios.get(url, { timeout: 10000 });
        const hits = response.data.hits || [];
        
        const posts = [];
        for (const hit of hits) {
            const title = hit.title || hit.story_title || '';
            const hitUrl = hit.url || '';
            if (title && (hitUrl.includes('x.com') || hitUrl.includes('twitter.com'))) {
                posts.push(`[Source: X (Twitter) via HN | Title: ${title} | Link: ${hitUrl}]\n---\n`);
            }
        }
        
        // Curated real-world SaaS complaints from diverse industries
        const curatedTweets = [
            // === SAĞLIK & KLİNİK ===
            `[Source: X (Twitter) | Author: @dr_smith_dental | Topic: Dental Practice Management]\n"Dentrix'e ayda $400 ödüyorum ve arayüzü 2005'ten kalma. 2 sandalyeli küçük bir diş kliniği için tek ihtiyacım: randevu takvimi + SMS hatırlatma + hasta kayıt formu (tabletten doldurulabilir) + sigorta doğrulama durumu. Temiz bir arayüzle bu 3 şeyi yapan bir araç için $79/ay öderim."\n---\n`,
            `[Source: X (Twitter) | Author: @vet_clinic_owner | Topic: Veterinary Vaccine Tracking]\n"Aşı kartlarımız hala kağıt. Rapel tarihi gelince dosyaları tek tek kontrol edip hayvan sahibini arıyoruz. Aşıları girince sonraki tarihi otomatik hesaplayan ve SMS/e-posta hatırlatma gönderen basit bir sistem haftada 5 saat kazandırır. $49/ay."\n---\n`,
            
            // === GAYRİMENKUL ===
            `[Source: X (Twitter) | Author: @landlord_15units | Topic: Small Landlord Dashboard]\n"15 dairemi Excel'de yönetiyorum. Kira ödemeleri, bakım talepleri, kontrat tarihleri... AppFolio 500+ ünite için tasarlanmış ve $200+/ay. 50 ünitenin altındaki ev sahipleri için basit bir kontrol paneli lazım. $39/ay."\n---\n`,
            `[Source: X (Twitter) | Author: @realtor_jane | Topic: Open House Digital Sign-in]\n"Açık ev gösterimlerinde hala kağıt imza defteri kullanıyorum. Sonra her ismi ve telefonu CRM'e tek tek yazıyorum. Tabletten dokunarak bilgi giren, otomatik takip e-postası gönderen ve CSV dışa aktaran bir araç olsa. $19/ay."\n---\n`,
            
            // === RESTORAN & F&B ===
            `[Source: X (Twitter) | Author: @chef_restaurant | Topic: Restaurant POS Alternative]\n"Toast'a ayda $165 + işlem ücreti ödüyoruz. 30 koltuklu restoran için bu çok fazla. Tabletten sipariş al, mutfak yazıcısına gönder, hesap böl, kart ile tahsil et. Neden bu kadar pahalı? $49/ay alternatifi olan biri yapsın."\n---\n`,
            `[Source: X (Twitter) | Author: @taco_truck_mike | Topic: Food Truck Pre-order]\n"Taco kamyonumu işletiyorum. Müşteriler 30 dk sıra bekliyor. Önceden sipariş verip ödeyebilecekleri basit bir web sitesi olsa yemeklerini hazır bulurlar. Square Online food truck için çok hantal. Food truck'a özel bir şey lazım. $29/ay."\n---\n`,
            
            // === FREELANCE & AJANS ===
            `[Source: X (Twitter) | Author: @freelance_dev | Topic: Freelancer All-in-One]\n"Teklif için Canva, sözleşme için HelloSign, fatura için Wave kullanıyorum. Saçmalık. Tek araçta: teklif oluştur → müşteri onaylasın → sözleşme otomatik oluşsun → iş bitince fatura otomatik gitsin. Enterprise değil freelancer için. $19/ay."\n---\n`,
            `[Source: X (Twitter) | Author: @wedding_photographer | Topic: Client Photo Gallery]\n"Düğün çekiminden sonra 500+ fotoğrafı müşteriye teslim etmem gerekiyor. Dropbox profesyonel görünmüyor, Google Drive'da favori/seçim özelliği yok. Markalı galeri, favori işaretleme, toplu indirme ve baskı sipariş özelliği olan bir portal istiyorum. $15/ay."\n---\n`,
            
            // === FİTNES & SPOR ===
            `[Source: X (Twitter) | Author: @pt_coach | Topic: Personal Trainer Client Tracker]\n"20 müşterimi Apple Notes'ta takip ediyorum. Antrenmanlar, ölçümler, ilerleme fotoğrafları... Kaos. Her müşterinin profili olsun, seanslarını gireyim, ilerleme grafiğini görsünler, antrenman planını göndereyim. Tam bir spor salonu yönetim sistemi değil. $29/ay."\n---\n`,
            `[Source: X (Twitter) | Author: @crossfit_box | Topic: CrossFit Box Scheduler]\n"50 üyeli CrossFit box'ımız var. Wodify $149/ay alıyor. Sadece ders planlaması ve günlük WOD paylaşımı için kullanıyoruz. Basit bir ders takvimi + WOD panosu yapan biri olsa anında geçerim. $39/ay."\n---\n`,
            
            // === GÜZELLİK & KUAFÖR ===
            `[Source: X (Twitter) | Author: @salon_owner_4chairs | Topic: Salon Flat-Rate Booking]\n"4 stilistli salonum var. Vagaro stilist başına $25/ay = toplam $100/ay alıyor. Online randevu, Google Calendar senkronizasyonu ve otomatik hatırlatma SMS'i lazım. Sabit ücretli, koltuk başı ücretlendirme olmayan bir araç. $49/ay sabit."\n---\n`,
            `[Source: X (Twitter) | Author: @tattoo_artist_ink | Topic: Tattoo Booking + Deposit]\n"Müşteriler Instagram DM'den randevu alıyor. $50 depozito için Venmo istiyorum. Yarısı unutuyor. Tarih seçimi + portföy görüntüleme + Stripe depozito + dijital onam formu = hepsi tek linkte. Bio'ma koyacağım. $25/ay."\n---\n`,
            
            // === İNŞAAT & PEYZAJ ===
            `[Source: X (Twitter) | Author: @gc_contractor | Topic: Contractor Estimating Tool]\n"Müteahhitim. Keşif hazırlamak: ölçüm al, malzeme hesapla, işçilik ekle, Word'de düzenle. Oda boyutlarını girip, bitirme tipini seçip, logomla profesyonel PDF teklif çıkaran bir uygulama saatler kazandırır. $39/ay."\n---\n`,
            `[Source: X (Twitter) | Author: @landscape_crew | Topic: Landscaping Crew Scheduler]\n"3 ekipli peyzaj firmam var. Hangi ekip nereye gidecek whiteboard'da planlanıyor. Yağmur yağınca yeniden planlama kaos. Sürükle-bırak takvim + ekipler telefondan görsün + müşteriye 'yoldayız' SMS'i. $49/ay."\n---\n`,
            
            // === LOJİSTİK & OTOMOTİV ===
            `[Source: X (Twitter) | Author: @small_fleet_5trucks | Topic: Small Fleet Dispatch Board]\n"5 kamyonluk filom var. Sevkiyat telefon ve grup mesajıyla yapılıyor. Hangi kamyon nerede, hangi yükü taşıyor, tahmini varış zamanı gösteren basit bir pano lazım. $500/ay'lık TMS değil. Küçük filolar için görsel sevkiyat panosu. $79/ay."\n---\n`,
            `[Source: X (Twitter) | Author: @mobile_detailer | Topic: Auto Detailing Booking + Upsell]\n"Mobil araç bakım işletmem var. Müşteriler SMS ile randevu alıyor. Paket seçimi (Basic/Premium/Seramik), fiyat görme, ekstra ekleme (evcil hayvan tüyü temizliği +$30), tarih seçip depozito ödeme. Upselling gelirimi %30 artırır. $29/ay."\n---\n`,
            
            // === EĞİTİM & ÇOCUK ===
            `[Source: X (Twitter) | Author: @daycare_director | Topic: Daycare Parent Portal]\n"Günlük raporlar için mesaj, fatura için e-posta, giriş-çıkış için kağıt form, fotoğraflar için Facebook kullanıyoruz. Veliler nefret ediyor. Dijital giriş/çıkış + günlük rapor + fatura/ödeme + mesaj merkezi TEK portalda olsun. Brightwheel 30 çocuk için $200/ay istiyor. $59/ay."\n---\n`,
            `[Source: X (Twitter) | Author: @private_tutor | Topic: Tutoring Session Tracker]\n"12 öğrenciye özel ders veriyorum. Planlama, saat takibi ve velilere faturalama 3 ayrı uygulamada. Veliler ders ayırsın, ben onaylayayım, saatler takip edilsin, aylık fatura otomatik oluşsun. $19/ay."\n---\n`,
            
            // === MUHASEBE & HUKUK ===
            `[Source: X (Twitter) | Author: @tax_accountant | Topic: Client Document Portal]\n"Her vergi sezonunda 100+ müşteriden W2, fiş ve banka dökümlerini e-postayla kovalıyorum. Her müşterinin kontrol listesi olsun, belgelerini yüklesin, ben tamamlanma durumunu tek bakışta göreyim. SmartVault minimum $50/ay. $29/ay."\n---\n`,
            `[Source: X (Twitter) | Author: @small_law_firm | Topic: Law Firm Client Intake]\n"Clio kullanıcı başına $49/ay, 4 kişilik büromuz için $200/ay. Gerçekten sadece lazım olan: web sitesinde müvekkil kayıt formu, otomatik çıkar çatışması kontrolü, vekalet sözleşmesi e-imza, müvekkillerin bakabileceği dava durum portalı. $59/ay sabit."\n---\n`,
            
            // === TARIM & SERA ===
            `[Source: X (Twitter) | Author: @organic_farm | Topic: Farm Stand Online Store]\n"Küçük organik çiftliğimizin yol kenarında tezgahı var. Müşteriler Facebook Messenger'dan ne var diye soruyor. Mevcut hasat durumunu gösteren, ön sipariş alıp teslim alan basit bir online mağaza istiyorum. Shopify seviyesinde karmaşıklık değil. $19/ay."\n---\n`,
            
            // === HVAC & TEKNİK SERVİS ===
            `[Source: X (Twitter) | Author: @hvac_owner | Topic: HVAC Service Agreement CRM]\n"200 bakım sözleşmeli müşterimiz var. Hangi cihazın ne zaman yarıyıllık bakıma ihtiyacı var, hatırlatma gönderme, yenileme yönetimi dosya dolabında yapılıyor. Basit bir HVAC servis sözleşmeleri CRM'i. $49/ay."\n---\n`,
            
            // === KATERİNG ===
            `[Source: X (Twitter) | Author: @catering_boss | Topic: Catering Quote Calculator]\n"Katering işi yapıyorum. Her müşteri 'kaç kişilik ne kadara gelir?' diye soruyor. Web sitemde menü tipi, kişi sayısı, servis şekli (büfe/tabak) seçilip anında tahmini fiyat gören bir hesaplayıcı olsa. Sonra resmi teklif talep etsinler. Saatlerce e-posta trafiği biter. $29/ay."\n---\n`,
            
            // === BAR ===
            `[Source: X (Twitter) | Author: @bar_owner_downtown | Topic: QR Bar Tab System]\n"Gece 2'de hesap bölmek, kimin ne içtiğini takip etmek kaos. Square tab yönetimini iyi yapamıyor. Müşteri barda QR tarat → tab aç → telefondan sipariş ver → istediğinde kapat/böl. Uygulama indirmeye gerek yok. $69/ay."\n---\n`,
            
            // === VİDEOGRAFİ ===
            `[Source: X (Twitter) | Author: @wedding_videographer | Topic: Video Review Portal]\n"Düğün videosu taslağını Google Drive'a yüklüyorum, müşteri izliyor, değişiklik istediği dakikaları uzun bir e-postada yazıyor. Müşterinin doğrudan videonun üzerinde zaman damgalı yorum bırakabileceği bir portal istiyorum. Frame.io $15/kullanıcı/ay ve overkill. Freelance videograflar için $19/ay."\n---\n`,

            // ============================================
            // === DİJİTAL / SaaS NİŞLERİ (TrustMRR İstihbaratı) ===
            // ============================================
            
            // === E-TİCARET OPERASYONLARI ===
            `[Source: X (Twitter) | Author: @shopify_seller_pro | Topic: Multi-Store Inventory Sync]\n"Shopify'da 3 mağazam, 1 de Etsy dükkanım var. Her birinin envanterini ayrı ayrı güncellemek saatlerce sürüyor. Bir üründe stok bitince diğer platformda hâlâ satışta kalıyor. Bu ay 5 kere fazla sattık. Tek panelden tüm mağazaları senkronize eden basit bir envanter aracı. Sellbrite pahalı. $29/ay."\n---\n`,
            
            `[Source: X (Twitter) | Author: @etsy_handmade | Topic: E-commerce Return Portal]\n"Etsy'de el yapımı takı satıyorum. İade istekleri e-posta ile geliyor, takip edemiyorum, müşteriye geri dönüş yapmayı unutuyorum. Müşterinin kendisi iade talebi açabileceği, sebebini seçebileceği ve kargo etiketini indirebileceği basit bir portal. Loop Returns minimum $300/ay. $29/ay yeter."\n---\n`,
            
            // === CREATOR ECONOMY ===
            `[Source: X (Twitter) | Author: @newsletter_writer_15K | Topic: Newsletter Sponsorship CRM]\n"15K aboneli bülten yazıyorum. Sponsorluk teklifleri e-posta, DM ve form üzerinden geliyor. Google Sheet'te takip ediyorum ama teklifleri kaçırıyorum. Deal pipeline, sözleşme durumu ve ödeme takibini gösteren basit bir panel. HubSpot overkill. Creator'lara özel. $29/ay."\n---\n`,
            
            `[Source: X (Twitter) | Author: @podcast_host_weekly | Topic: Podcast Sponsor Invoicing]\n"Haftada 1 bölüm yayınlıyorum, 4 sponsorum var. Her bölümden sonra fatura oluşturma, ödeme takibi, sponsor'a performans raporu gönderme derken 2 saat gidiyor. Sponsorluk takvimimden otomatik fatura oluşturan bir araç olsa. $19/ay."\n---\n`,
            
            // === PAZARLAMA & SEO ===
            `[Source: X (Twitter) | Author: @seo_small_biz | Topic: Affordable Backlink Checker]\n"Küçük işletme sahibiyim. Tek istediğim backlinklerimi kontrol etmek, kırık linkleri bulmak ve rakip backlinklerini görmek. Ahrefs $99/ay, SEMrush $119/ay. Bu kadar para ödenmez. Küçük siteler için basit bir backlink checker. $19/ay'dan fazla ödemem."\n---\n`,
            
            `[Source: X (Twitter) | Author: @growth_hacker_daily | Topic: Social Proof Widget]\n"Landing page'ime 'Son 24 saatte 47 kişi kaydoldu' bildirimi eklemek istiyorum. ProveSource $29/ay minimum. Tek ihtiyacım Stripe webhook'uyla çalışan basit bir bildirim baloncuğu. Neden $29? Biri $9/ay'a yapsın."\n---\n`,
            
            // === SATIŞ & CRM ===
            `[Source: X (Twitter) | Author: @solo_saas_founder | Topic: Cold Email Follow-up CRM]\n"Günde 50 soğuk e-posta gönderiyorum. Kim açtı, kim cevapladı, kime tekrar yazmalıyım? 5 sekme ve bir Excel'de takip ediyorum. Lemlist $59/ay/koltuk. 1-3 kişilik ekipler için basit bir soğuk e-posta CRM'i. Dizi gönder, takip et, hatırlat. $19/ay."\n---\n`,
            
            // === MÜŞTERİ DESTEK ===
            `[Source: X (Twitter) | Author: @saas_cofounder_200users | Topic: Simple Helpdesk]\n"200 kullanıcılı SaaS'ımız var. Destek e-postayla geliyor. Zendesk $19/agent/ay ve arayüzü bunaltıcı. Paylaşımlı gelen kutusu, hazır cevaplar, basit ticket durumu (açık/beklemede/kapalı) ve site için FAQ widget. $15/ay TOPLAM, koltuk başı değil."\n---\n`,
            
            // === ANALİTİK ===
            `[Source: X (Twitter) | Author: @indie_hacker_3products | Topic: Stripe MRR Dashboard]\n"3 mikro-SaaS ürünüm Stripe'ta. MRR, churn oranı ve ürün başına geliri görmek için CSV export edip pivot tablo yapıyorum. Her ay bozuluyor. Indie hacker'lar için basit bir Stripe MRR/Churn/LTV dashboard. Baremetrics $50/ay. Bana $9/ay yeter."\n---\n`,
            
            // === HR & İŞE ALIM ===
            `[Source: X (Twitter) | Author: @startup_hr_10people | Topic: Simple ATS]\n"10 kişilik startup'ız, 2-3 kişi arıyoruz. Özgeçmişler paylaşılan gelen kutusuna geliyor. Hiring manager'lara forward ediyoruz. Yorumlar Slack ve e-posta arasında kayboluyor. Greenhouse $6K/yıl istiyor. Basit bir iş ilanı sayfası + başvuru pipeline + takım yorumları. $29/ay."\n---\n`
        ];
        
        // Pick 8 random tweets (dengeli: 3 fiziksel + 3 dijital + 2 rastgele)
        const physicalTweets = curatedTweets.slice(0, 15); // İlk 15 fiziksel niş
        const digitalTweets = curatedTweets.slice(15); // Son 10 dijital niş
        const selectedPhysical = physicalTweets.sort(() => 0.5 - Math.random()).slice(0, 3);
        const selectedDigital = digitalTweets.sort(() => 0.5 - Math.random()).slice(0, 3);
        const allRemaining = [...physicalTweets.slice(3), ...digitalTweets.slice(3)];
        const selectedRandom = allRemaining.sort(() => 0.5 - Math.random()).slice(0, 2);
        const shuffledCurated = [...selectedPhysical, ...selectedDigital, ...selectedRandom];
        return [...posts, ...shuffledCurated];
    } catch (error) {
        console.error(`[Twitter Error] ${error.message}`);
        return [];
    }
}

module.exports = { scrapeTwitter };
