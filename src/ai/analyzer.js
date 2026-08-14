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
        model: "gemini-2.5-flash",
        generationConfig: {
            temperature: 0.9
        }
    });

    const localDate = new Date();
    const tzOffset = localDate.getTimezoneOffset();
    const localTime = new Date(localDate.getTime() - (tzOffset * 60 * 1000));
    const today = localTime.toISOString().split('T')[0];

    // Konsept grubu bazlı yasaklama listesi oluştur
    const bannedConceptGroups = [];
    if (ideaHistory && ideaHistory.length > 0) {
        // Konsept gruplarını otomatik oluştur
        const conceptMap = {};
        for (const idea of ideaHistory) {
            const lower = idea.toLowerCase();
            if (lower.includes('rezervasyon') || lower.includes('booking') || lower.includes('randevu')) {
                conceptMap['Rezervasyon/Booking Widget'] = (conceptMap['Rezervasyon/Booking Widget'] || 0) + 1;
            }
            if (lower.includes('kargo') || lower.includes('takip') || lower.includes('shipping')) {
                conceptMap['Kargo Takip/İade Portal'] = (conceptMap['Kargo Takip/İade Portal'] || 0) + 1;
            }
            if (lower.includes('sponsorluk') || lower.includes('sponsorship') || lower.includes('sponsor')) {
                conceptMap['Sponsorluk Yönetim'] = (conceptMap['Sponsorluk Yönetim'] || 0) + 1;
            }
            if (lower.includes('qr') || lower.includes('fotoğraf') || lower.includes('photo')) {
                conceptMap['QR Fotoğraf Toplama'] = (conceptMap['QR Fotoğraf Toplama'] || 0) + 1;
            }
            if (lower.includes('dijital ürün') || lower.includes('digital') || lower.includes('paywall') || lower.includes('pdf')) {
                conceptMap['Dijital Ürün Satış/Teslimat'] = (conceptMap['Dijital Ürün Satış/Teslimat'] || 0) + 1;
            }
            if (lower.includes('testimonial') || lower.includes('kanıt') || lower.includes('proof')) {
                conceptMap['Testimonial/Sosyal Kanıt Duvarı'] = (conceptMap['Testimonial/Sosyal Kanıt Duvarı'] || 0) + 1;
            }
            if (lower.includes('carousel') || lower.includes('sosyal medya') || lower.includes('slide')) {
                conceptMap['Sosyal Medya Carousel/Şablon'] = (conceptMap['Sosyal Medya Carousel/Şablon'] || 0) + 1;
            }
            if (lower.includes('fiyat hesap') || lower.includes('estimat') || lower.includes('dinamik fiyat')) {
                conceptMap['Dinamik Fiyat Hesaplama'] = (conceptMap['Dinamik Fiyat Hesaplama'] || 0) + 1;
            }
            if (lower.includes('biletleme') || lower.includes('ticket') || lower.includes('check-in')) {
                conceptMap['Biletleme/Check-in'] = (conceptMap['Biletleme/Check-in'] || 0) + 1;
            }
            if (lower.includes('evcil') || lower.includes('pet') || lower.includes('hayvan')) {
                conceptMap['Evcil Hayvan Takip'] = (conceptMap['Evcil Hayvan Takip'] || 0) + 1;
            }
            if (lower.includes('whatsapp')) {
                conceptMap['WhatsApp Otomasyon'] = (conceptMap['WhatsApp Otomasyon'] || 0) + 1;
            }
            if (lower.includes('mutfak') || lower.includes('kitchen') || lower.includes('sipariş yönetim')) {
                conceptMap['Mutfak/Sipariş Ekranı'] = (conceptMap['Mutfak/Sipariş Ekranı'] || 0) + 1;
            }
            if (lower.includes('paketleme') || lower.includes('pack')) {
                conceptMap['Paketleme/Fulfillment'] = (conceptMap['Paketleme/Fulfillment'] || 0) + 1;
            }
            // E-ticaret İade/Kargo
            if (lower.includes('iade') || lower.includes('return') || lower.includes('envanter sync')) {
                conceptMap['E-ticaret İade/Envanter'] = (conceptMap['E-ticaret İade/Envanter'] || 0) + 1;
            }
            // CRM/Pipeline
            if (lower.includes('crm') || lower.includes('pipeline') || lower.includes('lead scor')) {
                conceptMap['CRM/Pipeline'] = (conceptMap['CRM/Pipeline'] || 0) + 1;
            }
            // SEO/Marketing
            if (lower.includes('seo') || lower.includes('backlink') || lower.includes('keyword track')) {
                conceptMap['SEO/Backlink Aracı'] = (conceptMap['SEO/Backlink Aracı'] || 0) + 1;
            }
            // Analytics Dashboard
            if (lower.includes('analytics') || lower.includes('analitik') || lower.includes('mrr dashboard')) {
                conceptMap['Analytics Dashboard'] = (conceptMap['Analytics Dashboard'] || 0) + 1;
            }
            // Creator/Newsletter
            if (lower.includes('newsletter') || lower.includes('bülten') || lower.includes('creator crm')) {
                conceptMap['Creator/Newsletter Aracı'] = (conceptMap['Creator/Newsletter Aracı'] || 0) + 1;
            }
            // Shared Inbox / Helpdesk
            if (lower.includes('shared inbox') || lower.includes('helpdesk') || lower.includes('ticket yönetim')) {
                conceptMap['Helpdesk/Shared Inbox'] = (conceptMap['Helpdesk/Shared Inbox'] || 0) + 1;
            }
            // HR/ATS
            if (lower.includes('ats') || lower.includes('onboarding') || lower.includes('işe alım')) {
                conceptMap['HR/ATS Aracı'] = (conceptMap['HR/ATS Aracı'] || 0) + 1;
            }
        }
        // 2+ kez tekrarlanan konseptleri yasakla
        for (const [concept, count] of Object.entries(conceptMap)) {
            if (count >= 2) {
                bannedConceptGroups.push(concept);
            }
        }
    }

    // TrustMRR doğrulanmış pazar istihbaratı
    const trustmrrContext = `
## TrustMRR VERİFİYE PAZAR İSTİHBARATI (Gerçek Gelir Verileri — trustmrr.com)

Aşağıdaki veriler TrustMRR.com'daki 5,000+ doğrulanmış startup'tan (toplam $1.53B doğrulanmış gelir, 54M işlem) elde edilmiştir.
Fırsat değerlendirmelerinde bu verileri REFERANS AL ve puanlamana yansıt:

### Kategori Bazlı Ortalama MRR ve Büyüme (Doğrulanmış)
| Kategori | Ort. MRR | Büyüme (30g) | Yorum |
|----------|----------|-------------|-------|
| Content Creation | $14,220 | %32 | EN YÜKSEK ortalama MRR |
| Social Media | $3,470 | %20 | Yüksek değer, düşük churn |
| Analytics | $3,048 | %17 | Veri-odaklı, yapışkan |
| E-commerce | $2,754 | %19 | En büyük toplam hacim ($616K) |
| Entertainment | $2,603 | %49 | Hızlı büyüme |
| Sales | $2,101 | %5 | Müşteriler en kolay para ödediği alan |
| Customer Support | $2,066 | %1 | Olgun, stabil pazar |
| SaaS (genel) | $1,946 | %50 | Hızlı büyüme |
| Marketing | $1,881 | %158 | EN HIZLI büyüyen kategori |

### Pazar Gerçekleri
- Startup'ların %67.6'sı ayda $1K bile kazanamıyor → doğru problemi bulmak kritik
- En çok para kazanan projelerin %76'sı yapay zekasız, geleneksel araçlar
- B2B/B2Prosumer modeller toplam gelirin %82'sini oluşturuyor
- Stripe pazar payı %59.3 → ödeme entegrasyonunda Stripe-first düşün
- Marketing %158 büyüyor → bu alandaki fırsatları yüksek öncelikli değerlendir
- Shopify kullanıcılarının %16'sı $1M+ gelire ulaşmış → e-ticaret araçları skalalar

### Fırsat Değerlendirme Kuralı
Bir fırsat değerlendirirken, yukarıdaki TrustMRR kategorilerinden birine denk düşüyorsa bu veriyi GENEL SKOR hesaplamasında kullan. Yüksek MRR ve büyüme gösteren kategorilerdeki fırsatlara bonus puan ver.
`;

    const prompt = `
Sen bir **para kazandıran SaaS stratejistisin**. Hem bir yatırımcı gibi fırsatları değerlendiriyor, hem de bir yazılımcı (builder) gibi "bunu gerçekten inşa edip satabilir miyim?" diye düşünüyorsun.

${trustmrrContext}

Aşağıda Reddit, Hacker News, Product Hunt ve X/Twitter'dan toplanmış **gerçek kullanıcı şikayetleri ve tartışma verileri** var.

## SENİN GÖREVİN

Basit "şu widget'ı yap" önerileri YAPMA. Bunun yerine şunları yap:

1. **Gerçek acı noktalarını bul:** İnsanların gerçekten sinirlendiği, para kaybettiği veya saatlerini boşa harcadığı spesifik sorunları tespit et.
2. **"Boring but profitable" (sıkıcı ama karlı) işlere odaklan:** Sexy olmak zorunda değil. Her gün kullanılan, müşterinin vazgeçemeyeceği, "sıkıcı" ama sürekli gelir getiren araçlar en karlı SaaS'lardır. Muhasebe, fatura, envanter, randevu, CRM gibi düz operasyonel sorunlar genellikle en iyi para kazandırır.
3. **İlk 10 müşteriyi nasıl bulacağını açıkla:** Genel "Product Hunt'ta lansman yap" deme. Somut adımlar ver: "Google Maps'te 'diş kliniği' ara, ilk 50 sonuca soğuk e-posta at, demo teklif et."
4. **Unit economics hesapla:** Her fırsat için CAC (müşteri edinme maliyeti), LTV (yaşam boyu değer), aylık break-even noktası ve kâr marjı tahmini ver.
5. **"Quick Win" vs "Büyük Bahis" ayrımı yap:** Bazı fırsatlar 2 haftada MVP çıkarıp $500 kazandırır (Quick Win), bazıları 3 ayda $5K MRR'a ulaştırır (Büyük Bahis). İkisini de değerlendir.

## KRİTİK KURALLAR

- Raporun TAMAMI akıcı ve doğal **TÜRKÇE** ile yazılmalıdır.
- Her fırsatın ve fikrin başlığında açıkça **[B2B]** veya **[B2C]** etiketi yer almalıdır.
- Fırsatlar **%75 B2B** ağırlıklı olmalıdır.
- **DÜŞÜK SEVİYE DEVOPS/ALTYAPI ARAÇLARI YASAK:** CLI araçları, sunucu izleme, SSL/DNS takip, Git araçları, container yönetimi gibi sadece SRE/DevOps mühendislerine hitap eden altyapı araçları yasaktır. ANCAK: SaaS kurucuları, pazarlamacılar, satışçılar ve işletme sahipleri için olan yazılım araçları (CRM, analytics dashboard, SEO aracı, e-ticaret widget, faturalama, müşteri destek paneli vb.) İZİNLİDİR ve teşvik edilir.
- **AI/LLM/GPT/CHATBOT FİKİRLERİ KESİNLİKLE YASAK:** Fikirlerin en az %90'ı yapay zekasız, geleneksel işlevsel araçlar olmalıdır.
- Fırsatları hem fiziksel/yerel hizmet sektörlerinden hem de dijital/SaaS dünyasından dengeli bir şekilde sun. Sadece tek bir dünyaya odaklanma.
- Acımasızca dürüst ol. Zayıf fırsatları açıkça belirt. Gerçekçi puanla.
- Fırsatları farklı sektörlerden ve nişlerden seç. Aynı sektörden 2+ fırsat sunma.
- Kaynak meta verisini (Platform, Subreddit, Sorgu) her fırsat ve fikirde belirt.

${bannedConceptGroups.length > 0 ? `
**YASAKLI KONSEPT GRUPLARI (Bu kategorilerdeki fikirler daha önce çok kez detaylandırıldı, KESİNLİKLE bu konseptlere ait fikirler üretme):**
${bannedConceptGroups.map((g, i) => `${i + 1}. ❌ ${g}`).join('\n')}

Bu konseptlerin hiçbirini farklı isimlerle, farklı açılardan veya farklı hedef kitlelerle yeniden paketleyerek sunma. Tamamen farklı sorunlara ve sektörlere odaklan.
` : ''}

${previousReportText ? `
**ÖNCEKİ RAPORLARDA VERİLEN FİKİRLER (TEKRAR ETME):**
Aşağıdaki fırsatlar zaten raporlanmıştır. Bunları veya bunlara çok benzer konseptleri TEKRAR ETME:
------------------
${previousReportText.substring(0, 100000)}
------------------
` : ''}

${ideaHistory && ideaHistory.length > 0 ? `
**DAHA ÖNCE ÜRETİLMİŞ FİKİRLER (BUNLARI TEKRAR ETME):**
${ideaHistory.map((item, idx) => `${idx + 1}. ${item}`).join('\n')}
` : ''}

${focusArea ? `
**BUGÜNÜN ÖZEL ODAK ALANI:**
Bu raporda özellikle şu alandaki fırsatları bulmaya odaklan: **${focusArea}**.
Bu alandaki GERÇEK operasyonel sorunları, mevcut araçların neden yetersiz kaldığını ve insanların GERÇEKTEN ne kadar ödemeye hazır olduğunu derinlemesine analiz et.
` : ''}


---

# 📊 Problem Bulucu ve Pazar Fırsatları Raporu
**Tarih:** ${today}
**Veri Kaynakları:** Reddit RSS, Hacker News Algolia API, Product Hunt, X/Twitter

---

## 1. 🏆 En İyi Pazar Fırsatları (Derinlemesine Analiz)

Her fırsat için aşağıdaki **kapsamlı analiz kartını** oluştur:

### Fırsat #N: [B2B veya B2C] [Net Problem Başlığı]

| Kriter | Skor | Analiz |
|--------|------|--------|
| 🎯 Problemin Netliği | ?/10 | Sorun ne kadar spesifik? |
| 👥 Pazar Büyüklüğü | Küçük / Orta / Büyük | Tahmini hedef kitle sayısı |
| 💰 Ödeme İstekliliği | Düşük / Orta / Yüksek | Para ödeme kanıtı |
| 🏁 Rekabet | Yok / Düşük / Orta / Yüksek | Mevcut çözümler ve eksikleri |
| 🔧 Teknik Fizibilite | Kolay / Orta / Zor | Solo geliştirici yapabilir mi? |
| 📈 Trend Yönü | Azalan / Sabit / Büyüyen | Pazar trendi |
| ⭐ **GENEL SKOR** | **?/100** | Toplam puan |

**Sektör:** [Hangi sektöre hitap ediyor?]
**Model Türü:** B2B veya B2C

**Problem Açıklaması:** [Detaylı açıklama]

**Neden Para Kazandırır (Unit Economics):**
- **Hedef Fiyat:** $?/ay
- **Tahmini CAC (Müşteri Edinme Maliyeti):** $? (hangi kanaldan?)
- **Tahmini Churn:** %? aylık
- **LTV (Yaşam Boyu Değer):** $?
- **Break-even:** ? müşteri ile kâra geçilir
- **100 müşteri senaryosu:** $?K MRR

**İlk 10 Müşteriyi Nasıl Bulursun? (Somut Adımlar):**
1. [Spesifik kanal ve adım]
2. [Spesifik kanal ve adım]
3. [Spesifik kanal ve adım]

**Mevcut Rakipler ve Boşluklar:**
| Rakip | Fiyat | Zayıf Yönü |
|-------|-------|------------|
| ... | ... | ... |

**Kaynak:** [Kaynak: Platform | Subreddit/Konu | Sorgu]

---

En az 3-4 fırsat üret ve GENEL SKOR'a göre sırala. Her fırsat FARKLI bir sektörden olmalı.

## 2. 💡 İnşa Edilebilir Mikro-SaaS Fikirleri

Her fikir için:

### Fikir #N: [B2B veya B2C] [Ürün Adı Önerisi]

**Tek Cümlelik Özet:** [Ne yapıyor?]
**Sektör:** [Hangi sektör?]
**Tür:** 🚀 Quick Win (2 hafta MVP) veya 🎯 Büyük Bahis (1-3 ay MVP)

**Temel Özellikler:**
- Özellik 1
- Özellik 2
- Özellik 3

**Gelir Modeli:** [Fiyat] — **Neden bu fiyat?** [Fiyat psikolojisi açıklaması]
**30 Günlük Lansman Planı:**
- Hafta 1: [Ne yapılacak?]
- Hafta 2: [Ne yapılacak?]
- Hafta 3: [Ne yapılacak?]
- Hafta 4: [Ne yapılacak?]

---

## 3. 🗣️ Müşterinin Sesi (Doğrudan Kanıtlar)

Her alıntı için kaynak ve hangi fırsatı desteklediğini belirt.

---

## 4. ⚠️ Kaçınılması Gereken Tuzaklar

İYİ GİBİ GÖRÜNEN ama aslında KÖTÜ iş fırsatı olan 2-3 fikri listele. Neden tuzak olduğunu açıkla.

---

## 5. 📋 Yönetici Özeti (TL;DR)

| Sıra | Fırsat | Skor | Sektör | Model | Tür | İlk Gelir Tahmini | Karar |
|------|--------|------|--------|-------|-----|-------------------|-------|
| 1 | ... | .../100 | ... | B2B/B2C | Quick Win/Büyük Bahis | $?K MRR @100 müşteri | 🟢 GO / 🟡 MAYBE / 🔴 SKIP |

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
