import os

html_path = os.path.join("src", "components", "landing-page.html")

# Clean Turkish dictionary string
clean_tr_dict = '''    tr: {
      navFeatures: "Özellikler",
      navHowItWorks: "Nasıl Çalışır",
      navPricing: "Fiyatlandırma",
      navBlog: "Blog",
      navContact: "İletişim",
      navLogin: "Giriş Yap",
      navStartFree: "Ücretsiz Deneyin",
      lblCategory: "Kategori",
      lblValue: "Değer / Durum",
      lblNote: "Not / Açıklama",
      heroMeal: "Yemek",
      heroSleep: "Uyku",
      heroActivity: "Etkinlik",
      heroPhoto: "Fotoğraf",
      heroTag: "Çocuk & Yaşlı Bakımında Yeni Nesil Standart",
      heroTitle: "KinderLog & CareLog: Kreş ve Huzurevleri İçin Yeni Nesil Şeffaf Bakım & İletişim Platformu",
      heroSub: "Personelinizi 2 tıkla hızlı kayıtla güçlendirin, aileleri anlık şeffaf raporlarla sevindirin. WhatsApp karmaşasına ve kağıt formlara son verin!",
      heroCta: "14 Gün Ücretsiz Deneyin",
      heroSecondaryCta: "Canlı Demo Görün",
      trustTitle: "500+ Seçkin Kreş, Anaokulu ve Yaşlı Bakımevi Tarafından Güvenle Kullanılıyor",
      featSectionTag: "Neden KinderLog & CareLog?",
      featSectionTitle: "Tesisinizin Tüm Bakım Operasyonlarını Tek Ekrandan Yönetin",
      feat1Title: "Hızlı Bulgular & Günlük Kayıt",
      feat1Desc: "Öğretmenler ve bakıcılar yemek, uyku, ilaç ve etkinlik bulgularını saniyeler içinde kaydeder.",
      feat2Title: "Şeffaf Veli & Aile İletişimi",
      feat2Desc: "Fotoğraflar, duyurular ve günlük raporlar veli uygulamasına anında güvenle iletilir.",
      feat3Title: "Sağlık & Revir İlaç Takibi",
      feat3Desc: "Revir hemşireleri ateş, nabız, tansiyon ve düzenli ilaç saatlerini hatasız takip eder.",
      feat4Title: "Kurumsal Yönetim & KVKK Güvenlik",
      feat4Desc: "Sınıf dolulukları, personel yetkileri ve uçtan uca şeffaf raporlama tek panelde.",
      pricingTag: "Esnek & Şeffaf Paketler",
      pricingTitle: "Tesisinizin Büyüklüğüne Uygun Çözümü Seçin",
      pricingSub: "Gizli ücret yok, kurulum ücreti yok. İster aylık ister yıllık ödeyin.",
      plan1Title: "Başlangıç Kreş",
      plan1Price: "₺890",
      plan1Desc: "50 Öğrenciye kadar küçük ve orta ölçekli kreşler için ideal.",
      plan2Title: "Kurumsal CareLog",
      plan2Price: "₺1.850",
      plan2Desc: "Gelişmiş revir takibi gerektiren büyük tesisler ve bakımevleri için.",
      planSelect: "Paketi Seçin",
      footerTag: "Geleceğin Bakım Standardı",
      footerDesc: "Kreşler, anaokulları ve yaşlı bakımevleri için dijital dönüşüm platformu.",
      rights: "Tüm hakları saklıdır. KVKK & GDPR Uyumlu.",
      statusTitle: "Tesis Operasyonları Canlı & Aktif",
      statusSub: "Tüm kayıtlar anlık olarak buluta senkronize edilmektedir.",
      badgeCompliance: "KVKK & GDPR Uyumlu",
      badgeSecurity: "%100 Şifreli Veri"
    },'''

with open(html_path, "rb") as f:
    content_bytes = f.read()

# Decode as utf-8 replacing invalid bytes
content_text = content_bytes.decode("utf-8", errors="replace")

# Replace corrupted regex pattern
import re
content_text = re.sub(r'tr:\s*\{[\s\S]*?\},\s*es:', clean_tr_dict.strip() + '\n    es:', content_text)

# Also fix userMap corrupted text
content_text = content_text.replace("Melis retmen", "Melis Öğretmen")
content_text = content_text.replace("Hemire Aye", "Hemşire Ayşe")
content_text = content_text.replace("Ahmet Ylmaz", "Ahmet Yılmaz")
content_text = content_text.replace("Aye Hanm", "Ayşe Hanım")
content_text = content_text.replace("(Mdr)", "(Müdür)")

with open(html_path, "wb") as f:
    f.write(content_text.encode("utf-8"))

print("Saved clean UTF-8 encoded landing-page.html!")
