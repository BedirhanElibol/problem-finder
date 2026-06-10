const { GoogleGenerativeAI } = require("@google/generative-ai");

async function analyzeComplaints(dataText) {
    console.log(`[AI] Veriler Gemini ile analiz ediliyor...`);
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("GEMINI_API_KEY bulunamadı!");
        return "HATA: GEMINI_API_KEY eksik.";
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are an expert SaaS builder and product researcher.
Below are user complaints and pain points scraped from Reddit and X (Twitter).
Your goal is to extract **highly specific problems that can be solved by building a Micro-SaaS or a B2B/B2C SaaS product**. 
Ignore generic complaints, political issues, physical problems, or anything that cannot be solved with software.

Please analyze the text and generate a Markdown report in English, but you MUST add the Turkish translation in parentheses immediately after every English sentence or phrase. Use the following structure:

## 🎯 Top SaaS Opportunities (En İyi SaaS Fırsatları)
Group the complaints into clear, actionable SaaS opportunities. Explain why this is a good problem to solve in English (with Turkish translation in parentheses).

## 💡 Micro-SaaS Product Ideas (Mikro-SaaS Ürün Fikirleri)
Based on the opportunities, propose 3-4 specific, buildable Micro-SaaS ideas. Include a brief feature list and target audience for each in English (with Turkish translation in parentheses).

## 🗣️ Exact Voice of Customer (Müşterinin Gerçek Sesi)
Quote the most compelling complaints verbatim. Then provide the Turkish translation of the quote in parentheses.

Data:
${dataText.substring(0, 50000)}
`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error(`[AI Error] ${error.message}`);
        return "HATA: AI analizi başarısız oldu.";
    }
}

module.exports = { analyzeComplaints };
