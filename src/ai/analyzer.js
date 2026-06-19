const { GoogleGenerativeAI } = require("@google/generative-ai");

async function analyzeComplaints(dataText, previousReportText = "", focusArea = "", ideaHistory = []) {
    console.log(`[AI] Veriler Gemini ile analiz ediliyor...`);
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("GEMINI_API_KEY bulunamadı!");
        return "HATA: GEMINI_API_KEY eksik.";
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
        model: "gemini-3.1-flash-lite",
        generationConfig: {
            temperature: 0.85
        }
    });

    const localDate = new Date();
    const tzOffset = localDate.getTimezoneOffset();
    const localTime = new Date(localDate.getTime() - (tzOffset * 60 * 1000));
    const today = localTime.toISOString().split('T')[0];

    const prompt = `
Sen kıdemli bir **SaaS pazar analisti ve ürün stratejistisin**. Hem bir yatırımcı hem de bir yazılımcı (builder) gibi düşünüyorsun.
Aşağıda Reddit, Hacker News ve Product Hunt'tan toplanmış gerçek kullanıcı şikayetleri ve tartışma verileri yer almaktadır.

Göreyin sadece şikayetleri listelemek DEĞİLDİR. Görevin, aşağıdaki kriterleri analiz ederek **doğrulanmış ve inşa edilebilir (buildable) SaaS fırsatlarını** bulmaktır:
- İnsanların karşılaştığı spesifik ve tekrarlayan sorunlar neler?
- İnsanlar bu sorunu çözmek için ÖDEME YAPAR MI? (Ödeme istekliliği)
- Potansiyel pazar ne kadar büyük?
- Mevcut çözümler neler ve nerede yetersiz kalıyorlar?
- Tek bir geliştirici (solo developer) veya küçük bir ekip modern araçlarla (Next.js, Supabase, Stripe, Yapay Zeka API'leri) bunu inşa edebilir mi?

**KRİTİK KURALLAR:**
- Raporun TAMAMI (tüm başlıklar, tablo kolonları, kriter isimleri, analiz detayları, açıklamalar, notlar vb.) tamamen anlaşılır ve akıcı bir **TÜRKÇE** ile yazılmalıdır. Kesinlikle İngilizce başlık, açıklama veya yarı İngilizce / yarı Türkçe ifadeler bırakılmamalıdır.
- Her bölüm, verinin hangi platformdan, hangi alt forumdan (subreddit/konu) ve hangi arama sorgusundan geldiğini gösteren KAYNAK meta veri etiketini (Source/Kaynak) içermelidir.
- Fırsatlar ve fikirler **B2B** (Business to Business) ağırlıklı olmalıdır (Yaklaşık %75 B2B ve %25 B2C/B2Prosumer oranında) ve TrustMRR üzerindeki başarılı ve kârlı girişimler gibi **E-commerce, Content Creation, Marketing, Analytics, Education veya Sales** alanlarına odaklanmalıdır.
- **YAZILIMCI/DEVOPS VE ALTYAPI ARAÇLARINA KESİNLİKLE YER VERME (YASAK VE VETO):**
  - CLI veritabanı yedekleme araçları, sunucu izleme/cron-job log monitörleri, SSL/DNS izleme, Git/PR şema denetleme araçları gibi tamamen yazılımcıları ve sistem yöneticilerini hedefleyen "derin teknik" DevOps altyapı fikirleri **kesinlikle yasaktır ve elenecektir**. Bu araçların pazar hacmi dar olup TrustMRR gerçekleriyle (Stan, Gumroad, Jungle Bee, Avenue Ticketing) uyuşmamaktadır.
- **YAPAY ZEKA FİKİRLERİNE (AI/LLM/GPT/CHATBOT/CO-PILOT) KESİNLİKLE YER VERME (YASAK VE VETO):**
  - Raporda sunulacak fırsatların ve mikro-SaaS fikirlerinin en az **%90'ı tamamen yapay zekasız (Non-AI), geleneksel işlevsel araçlar (Traditional Utilities & Workflow Automation)** olmak zorundadır.
  - Temel işlevi "AI yardımıyla [X] yapmak", "AI chatbot", "LLM/GPU VM optimizasyonu", "AI SEO içeriği yazımı", "AI görsel üretimi" gibi yapay zekaya veya LLM API'lerine dayanan tüm fikirler **kesinlikle yasaktır ve elenecektir**.
  - Sadece ve sadece yapay zekasız, düz kod/kod dışı mantık, rezervasyon formları, tak-çalıştır takvim widget'ları, QR kodlu veri toplama, e-ticaret kargo/iade asistanları, sosyal medya şablon ve görsel oluşturucuları gibi geleneksel işlevsel mikro-SaaS fikirleri üretilmelidir (Örnek: Düğünler için QR ile fotoğraf toplama aracı, yerel turlar için tak-çalıştır rezervasyon takvimi widget'ı, link-in-bio sponsorluk yönetim kutusu, yerel servis siteleri için dinamik rezervasyon formu).
  - Fikirlerin başlıklarında, özelliklerinde ve pazarlama modellerinde "AI", "Yapay Zeka", "GPT", "LLM", "Chatbot" kelimeleri kesinlikle geçmemelidir.
- Her fırsatın ve fikrin başlığında açıkça **[B2B]** veya **[B2C]** etiketi yer almalıdır.
- Fikirlerin pazar başarısı için **nasıl, nerede ve hangi kanallarla pazarlanması gerektiği** (Soğuk E-posta, LinkedIn Sosyal Satış, Product Hunt Lansmanı, Dizin Listelemeleri, Yan Proje Pazarlaması vb.) başarılı benzer örnekler referans gösterilerek detaylandırılmalıdır.
- **Acımasızca dürüst ol ve çok seçici davran:** Eğer bir fırsat zayıfsa, pazar doymuşsa veya insanların bunun için para ödemeyeceği (willingness to pay) açıksa, bunu çok net bir şekilde eleştir ve gerekirse listeden çıkar. Sadece gerçekçi, para kazandırma potansiyeli yüksek fikirlere yer ver. "Bu çok güzel bir fikir" demek yerine, "Müşteri edinme maliyeti (CAC) yüksek, kimse buna aylık $10'dan fazla vermez" gibi net ve gerçekçi TrustMRR verilerine (MRR, Multiple, vs.) dayalı finansal eleştiriler yap.

${previousReportText ? `
**ÖNEMLİ KISIT (ÖNCEKİ RAPORLARDA VERİLEN FİKİRLER):**
Aşağıdaki fırsatlar ve fikirler önceki günlerde zaten raporlanmıştır ve bu fikirlerin tekrar üretilmesi KESİNLİKLE YASAKTIR:
------------------
${previousReportText.substring(0, 120000)}
------------------
Lütfen yukarıdaki fikirleri ve fırsatları BİREBİR VEYA BENZER ŞEKİLDE TEKRAR ETME. Bu sorunlar yeni gelen veride olsa bile tamamen farklı pazar fırsatlarına odaklan veya bu sorunları tamamen farklı açılardan/başka nişler için çöz. Yeni raporda farklı, yenilikçi ve taze fırsatlar bulmamız çok önemlidir.
` : ''}

${ideaHistory && ideaHistory.length > 0 ? `
**KESİNLİKLE YASAKLI FİKİRLER/BAŞLIKLAR (BU KONSEPTE SAHİP FİKİRLER DAHA ÖNCE DETAYLANDIRILDI, LÜTFEN BUNLARDAN FARKLI FİKİRLER ÜRET):**
${ideaHistory.map((item, idx) => `${idx + 1}. ${item}`).join('\n')}
------------------
Lütfen yukarıdaki listede yer alan fikirleri, başlıkları veya bunlara çok benzeyen çözümleri KESİNLİKLE tekrar sunma. Tamamen farklı sorunları ve çözümleri ele al.
` : ''}

${focusArea ? `
**BUGÜNÜN ÖZEL ODAK ALANI (BU NİŞE ODAKLAN):**
Bu raporda özellikle şu alandaki/nişteki fırsatları ve fikirleri bulmaya odaklan: **${focusArea}**.
Bulacağın 3-4 fırsat ve fikir en azından ağırlıklı olarak bu alandaki geleneksel (Non-AI) sorunları çözmelidir. Bu, raporun her gün farklı ve taze fırsatları kapsamasını sağlar.
` : ''}


---

# 📊 Problem Bulucu ve Pazar Fırsatları Raporu
**Tarih:** ${today}
**Veri Kaynakları:** Reddit RSS, Hacker News Algolia API, Product Hunt

---

## 1. 🏆 En İyi Pazar Fırsatları (Skora Göre Sıralı)

Bulunan HER fırsat için aşağıdaki analiz kartını oluştur:

### Fırsat #N: [B2B veya B2C] [Net Problem Başlığı]

| Kriter | Skor | Analiz |
|--------|------|--------|
| 🎯 Problemin Netliği | ?/10 | Bu sorun ne kadar spesifik ve iyi tanımlanmış? |
| 👥 Pazar Büyüklüğü | Küçük / Orta / Büyük | Bu sorundan etkilenen tahmini kişi sayısı |
| 💰 Ödeme İstekliliği | Düşük / Orta / Yüksek | İnsanlar bir çözüm için ödeme yapmaya hazır görünüyor mu? |
| 🏁 Rekabet | Yok / Düşük / Orta / Yüksek | Mevcut çözümler var mı? Ne kadar iyiler? |
| 🔧 Teknik Fizibilite | Kolay / Orta / Zor | Küçük bir ekip bunu Next.js + Supabase ile kurabilir mi? |
| 📈 Trend Yönü | Azalan / Sabit / Büyüyen | Bu sorun giderek büyüyor mu yoksa küçülüyor mu? |
| ⭐ **GENEL SKOR** | **?/100** | Ağırlıklı toplam puan |

**Model Türü:** B2B veya B2C (Neden bu modele girdiğini kısa açıkla)

**Problem Açıklaması:**
[Problemin detaylı Türkçe açıklaması]

**Neden Önemli (Fırsat Analizi):**
[Birinin bunu neden inşa etmesi gerektiğine dair Türkçe analiz]

**Kaynak(lar):**
[Kaynak: Platform | Subreddit/Konu: X | Sorgu: Y]

**Mevcut Rakipler ve Eksik Yönleri:**
[Bilinen rakiplerin listesi ve sundukları çözümlerdeki eksiklikler/boşluklar]

---

Tüm fırsatları en yüksek GENEL SKOR'dan en düşüğe doğru sırala. En az 3-5 adet fırsat ekle.

## 2. 💡 İnşa Edilebilir Mikro-SaaS Fikirleri (Gelir ve Pazarlama Modeli ile)

Her fikir için şunları ekle:

### Fikir #N: [B2B veya B2C] [Ürün Adı Önerisi]

**İlham Kaynağı:** [Kaynak: Platform | Sorgu: X]

**Tek Cümlelik Özet:** [Ürünün ne yaptığını açıklayan tek cümlelik Türkçe özet]

**Temel Özellikler:**
- Özellik 1
- Özellik 2
- Özellik 3

**Hedef Kitle:** [Buna tam olarak kim para öder?]

**Önerilen Teknoloji Yığını:** Next.js + Supabase + [gereken spesifik API'ler/araçlar]
**Gelir Modeli:** [Freemium / Abonelik / Tek Seferlik / Kullanım Bazlı] — [Önerilen fiyatlandırma, B2B için $49+, B2C için $9-29 aralığında olmalı]
**Tahmini MVP Süresi:** [Solo bir geliştirici için yapay zeka araçlarıyla X hafta]
**Gelir Potansiyeli:** [Pazar verilerine dayanan gerçekçi aylık gelir tahmini]

**Pazarlama Stratejisi ve Dağıtım Kanalları:**
- **Pazarlama Yöntemi:** [Hangi yöntemlerin kullanılacağı ve nasıl uygulanacağı]
- **Benzer Başarı Hikayesi:** [Benzer hedeflere ulaşmış indie hacker'ların (örn. Marc Lou'nun Twitter lansmanı, soğuk e-postalarla müşteri edinme vb.) pazarlama taktiklerinden ilham alarak somut yönlendirme]
- **Lansman Kanalları:** [Product Hunt, TrustMRR, Twitter/X, LinkedIn, Niş Dizinler vb.]

---

## 3. 🗣️ Müşterinin Sesi (Doğrudan Kanıtlar)

Her alıntı için şunları ekle:
- Kesin kaynak etiketi: [Kaynak: Platform | Subreddit: X | Sorgu: Y]
- Orijinal İngilizce yorum/şikayet metni ve altında Türkçe çevirisi
- Bunun hangi fırsatı desteklediğine dair kısa bir not

---

## 4. ⚠️ Kaçınılması Gereken Anti-Pattern'ler ve Tuzaklar

Şikayetlerden İYİ GİBİ GÖRÜNEN ama aslında KÖTÜ iş fırsatı (tuzak) olacak 2-3 fikri listele. Nedenini açıkla.

---

## 5. 📋 Yönetici Özeti (TL;DR)

Tüm fırsatları sıralayan nihai bir özet tablo:

| Sıra | Fırsat | Skor | Model | Pazar | Rekabet | Geliştirme Süresi | Ana Pazarlama Kanalı | Karar |
|------|--------|------|-------|-------|---------|-------------------|----------------------|-------|
| 1 | ... | .../100 | B2B / B2C | ... | ... | ... | ... | 🟢 GO / 🟡 MAYBE / 🔴 SKIP |

---

Veri:
${dataText.substring(0, 50000)}
`;

    let retries = 5;
    let delay = 2000;
    while (retries > 0) {
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            let waitTime = delay;
            if (error.message.includes('429') || error.message.includes('Quota') || error.message.includes('Rate limit')) {
                console.warn(`[AI Rate Limit] Quota hit. Waiting 45 seconds to reset limits...`);
                waitTime = 45000;
                // Do not decrement retries on rate limits
            } else {
                retries--;
                console.warn(`[AI Error] ${error.message}. Retries left: ${retries}. Waiting ${waitTime}ms...`);
            }
            if (retries === 0) {
                console.error(`[AI Critical Error] All retries exhausted. failing.`);
                return "HATA: AI analizi başarısız oldu.";
            }
            await new Promise(r => setTimeout(r, waitTime));
            delay *= 2.5;
        }
    }
}

module.exports = { analyzeComplaints };
