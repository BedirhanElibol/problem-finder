const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. ADD LEGAL MODALS & COOKIE BANNER HTML
const legalHTML = `
  <!-- COOKIE CONSENT BANNER (KVKK & GDPR COMPLIANT) -->
  <div id="cookie-banner" class="cookie-banner-bar" style="display:none;">
    <div class="cookie-content">
      <div class="cookie-icon">🍪</div>
      <div class="cookie-text">
        <strong data-i18n="cookieTitle">Çerez ve Gizlilik Bildirimi (KVKK / GDPR)</strong>
        <p data-i18n="cookieDesc">KinderLog & CareLog platformunda hizmet kalitesini artırmak, oturum güvenliğini sağlamak ve tercihlerinizi hatırlamak için zorunlu ve analitik çerezler kullanmaktayız. Detaylı bilgi için <a href="#" onclick="openLegalModal('privacy'); return false;" style="color:#0d9488; text-decoration:underline;">Gizlilik & KVKK Politikası</a>'nı inceleyebilirsiniz.</p>
      </div>
    </div>
    <div class="cookie-actions">
      <button onclick="acceptCookies('essential')" class="cookie-btn-sec" data-i18n="cookieEssential">Yalnızca Zorunlu</button>
      <button onclick="acceptCookies('all')" class="cookie-btn-main" data-i18n="cookieAcceptAll">Tümünü Kabul Et</button>
    </div>
  </div>

  <!-- LEGAL MODAL: PRIVACY POLICY & KVKK -->
  <div id="modal-privacy" class="legal-modal-backdrop" style="display:none;" onclick="closeLegalModalOnBackdrop(event, 'privacy')">
    <div class="legal-modal-card">
      <div class="legal-modal-header">
        <div style="display:flex; align-items:center; gap:10px;">
          <span style="font-size:24px;">🛡️</span>
          <div>
            <h3 data-i18n="privacyModalTitle" style="margin:0; font-size:18px; font-weight:800; color:var(--text-primary);">Gizlilik Politikası & KVKK Aydınlatma Metni</h3>
            <span style="font-size:12px; color:var(--text-muted);">Son Güncelleme: 13 Ağustos 2026 | Versiyon 2.4</span>
          </div>
        </div>
        <button onclick="closeLegalModal('privacy')" class="legal-modal-close">&times;</button>
      </div>
      <div class="legal-modal-body" style="max-height:60vh; overflow-y:auto; padding:20px; font-size:13.5px; line-height:1.6; color:var(--text-secondary);">
        <h4 style="color:var(--text-primary); margin-top:0;">1. Veri Sorumlusu ve Kapsam</h4>
        <p>KinderLog & CareLog B2B SaaS Platformu olarak, kreşlerdeki çocukların ve huzurevlerindeki sakinlerin verilerinin 6698 sayılı KVKK ve AB GDPR standartlarına tam uygun olarak işlenmesini garanti ederiz.</p>
        
        <h4 style="color:var(--text-primary);">2. İşlenen Kişisel ve Özel Nitelikli Veriler</h4>
        <ul>
          <li><strong>Öğrenci & Sakin Verileri:</strong> İsim, yaş, sınıf/oda no, günlük beslenme, uyku, aktivite ve tıbbi vital bulgular (tansiyon, nabız, şeker).</li>
          <li><strong>Veli & Yakın Verileri:</strong> Ad-soyad, telefon, e-posta ve anlık mesajlaşma geçmişi.</li>
          <li><strong>Kurum Personeli:</strong> Öğretmen, hemşire ve bakıcı sistem kullanım kayıtları.</li>
        </ul>

        <h4 style="color:var(--text-primary);">3. Veri Güvenliği ve Şifreleme</h4>
        <p>Tüm veriler uçtan uca TLS 1.3 şifrelemesi ile aktarılır. Veritabanı verileri AES-256 standartlarında saklanır ve yetkisiz 3. taraflarla asla paylaşılmaz.</p>

        <h4 style="color:var(--text-primary);">4. Veri Sahibinin Hakları</h4>
        <p>KVKK Madde 11 uyarınca, verilerinizin silinmesini, düzeltilmesini veya aktarılmasını talep etme hakkınız mevcuttur. Taleplerinizi <a href="mailto:kvkk@kinderlog.com" style="color:var(--brand-teal);">kvkk@kinderlog.com</a> adresine iletebilirsiniz.</p>
      </div>
      <div class="legal-modal-footer">
        <button onclick="closeLegalModal('privacy')" class="cookie-btn-main" style="width:100%;">Anladım, Kapat</button>
      </div>
    </div>
  </div>

  <!-- LEGAL MODAL: TERMS OF SERVICE -->
  <div id="modal-terms" class="legal-modal-backdrop" style="display:none;" onclick="closeLegalModalOnBackdrop(event, 'terms')">
    <div class="legal-modal-card">
      <div class="legal-modal-header">
        <div style="display:flex; align-items:center; gap:10px;">
          <span style="font-size:24px;">📜</span>
          <div>
            <h3 data-i18n="termsModalTitle" style="margin:0; font-size:18px; font-weight:800; color:var(--text-primary);">Kullanım Koşulları & Hizmet Sözleşmesi</h3>
            <span style="font-size:12px; color:var(--text-muted);">SaaS Hizmet Seviyesi Taahhüdü (SLA %99.9)</span>
          </div>
        </div>
        <button onclick="closeLegalModal('terms')" class="legal-modal-close">&times;</button>
      </div>
      <div class="legal-modal-body" style="max-height:60vh; overflow-y:auto; padding:20px; font-size:13.5px; line-height:1.6; color:var(--text-secondary);">
        <h4 style="color:var(--text-primary); margin-top:0;">1. Hizmetin Kullanım Şartları</h4>
        <p>KinderLog & CareLog platformuna üye olan kurumlar, sisteme girilen verilerin doğruluğundan sorumludur. Öğretmen ve hemşire panellerinden yapılan veri girişleri gerçek zamanlı olarak veli ve yöneticilere yansıtılır.</p>

        <h4 style="color:var(--text-primary);">2. Kesintisiz Hizmet (SLA)</h4>
        <p>Platformumuz yıllık %99.9 çalışma süresi (uptime) garantisi sunar. Planlı bakım çalışmaları en az 48 saat öncesinden kurumlara bildirilir.</p>

        <h4 style="color:var(--text-primary);">3. Fikri Mülkiyet ve Lisans</h4>
        <p>KinderLog & CareLog yazılımı, amblemi ve markası koruma altındadır. İzin alınmaksızın kopyalanamaz veya 3. kişilere devredilemez.</p>
      </div>
      <div class="legal-modal-footer">
        <button onclick="closeLegalModal('terms')" class="cookie-btn-main" style="width:100%;">Koşulları Kabul Ediyorum</button>
      </div>
    </div>
  </div>
`;

// 2. ADD CSS FOR COOKIE BANNER & LEGAL MODALS
const legalCSS = `
  /* COOKIE BANNER FLOATING BAR */
  .cookie-banner-bar {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 48px);
    max-width: 960px;
    background: rgba(15, 23, 42, 0.94);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 20px;
    padding: 18px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    z-index: 99999;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    color: white;
    animation: slideUpCookie 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  @keyframes slideUpCookie {
    from { transform: translate(-50%, 100px); opacity: 0; }
    to { transform: translate(-50%, 0); opacity: 1; }
  }
  .cookie-content { display: flex; align-items: center; gap: 16px; flex: 1; }
  .cookie-icon { font-size: 28px; flex-shrink: 0; }
  .cookie-text strong { font-size: 14.5px; font-weight: 800; display: block; margin-bottom: 2px; color: #f8fafc; }
  .cookie-text p { font-size: 12.5px; color: #94a3b8; margin: 0; line-height: 1.4; }
  .cookie-actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
  .cookie-btn-main { background: linear-gradient(135deg, #0d9488, #10b981); color: white; border: none; padding: 10px 20px; border-radius: 12px; font-size: 13px; font-weight: 800; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 14px rgba(13, 148, 136, 0.3); }
  .cookie-btn-main:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(13, 148, 136, 0.4); }
  .cookie-btn-sec { background: rgba(255, 255, 255, 0.1); color: #cbd5e1; border: 1px solid rgba(255, 255, 255, 0.15); padding: 10px 16px; border-radius: 12px; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
  .cookie-btn-sec:hover { background: rgba(255, 255, 255, 0.2); color: white; }

  /* LEGAL MODALS STYLES */
  .legal-modal-backdrop { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 100000; padding: 20px; }
  .legal-modal-card { background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 24px; width: 100%; max-width: 620px; box-shadow: var(--shadow-xl); overflow: hidden; animation: popLegalModal 0.3s ease; }
  @keyframes popLegalModal { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  .legal-modal-header { padding: 20px 24px; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between; background: var(--bg-subtle); }
  .legal-modal-close { background: none; border: none; font-size: 24px; color: var(--text-muted); cursor: pointer; }
  .legal-modal-footer { padding: 16px 24px; border-top: 1px solid var(--border-color); background: var(--bg-subtle); }

  @media (max-width: 768px) {
    .cookie-banner-bar { flex-direction: column; align-items: flex-start; bottom: 12px; width: calc(100% - 24px); padding: 16px; }
    .cookie-actions { width: 100%; justify-content: flex-end; }
  }
`;

// 3. ADD JAVASCRIPT FUNCTIONS FOR COOKIE & LEGAL MODALS
const legalJS = `
  // COOKIE CONSENT ENGINE
  function checkCookieConsent() {
    const consent = localStorage.getItem('kinderlog_cookie_consent');
    if (!consent) {
      setTimeout(() => {
        const banner = document.getElementById('cookie-banner');
        if (banner) banner.style.display = 'flex';
      }, 800);
    }
  }

  function acceptCookies(type) {
    localStorage.setItem('kinderlog_cookie_consent', type);
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.opacity = '0';
      banner.style.transform = 'translate(-50%, 20px)';
      banner.style.transition = 'all 0.3s ease';
      setTimeout(() => { banner.style.display = 'none'; }, 300);
    }
    showToast('success', type === 'all' ? 'Tüm çerezler kabul edildi.' : 'Zorunlu çerezler aktifleştirildi.');
  }

  function openLegalModal(modalId) {
    const modal = document.getElementById('modal-' + modalId);
    if (modal) modal.style.display = 'flex';
  }

  function closeLegalModal(modalId) {
    const modal = document.getElementById('modal-' + modalId);
    if (modal) modal.style.display = 'none';
  }

  function closeLegalModalOnBackdrop(e, modalId) {
    if (e.target.id === 'modal-' + modalId) {
      closeLegalModal(modalId);
    }
  }

  // Auto check cookies on load
  document.addEventListener('DOMContentLoaded', checkCookieConsent);
`;

// Insert HTML before </body>
if (!html.includes('id="cookie-banner"')) {
  html = html.replace('</body>', `${legalHTML}\n</body>`);
}

// Insert CSS before </style>
if (!html.includes('.cookie-banner-bar')) {
  html = html.replace('</style>', `${legalCSS}\n</style>`);
}

// Insert JS before </script> at end
if (!html.includes('function checkCookieConsent')) {
  const lastScriptIdx = html.lastIndexOf('</script>');
  if (lastScriptIdx !== -1) {
    html = html.slice(0, lastScriptIdx) + `\n${legalJS}\n` + html.slice(lastScriptIdx);
  }
}

// 4. Update Footer Links to open Privacy & Terms Modals
html = html.replace(/<a href="#privacy"[^>]*>Privacy Policy<\/a>/g, `<a href="#" onclick="openLegalModal('privacy'); return false;" data-i18n="footerPrivacy">Privacy Policy & KVKK</a>`);
html = html.replace(/<a href="#terms"[^>]*>Terms of Service<\/a>/g, `<a href="#" onclick="openLegalModal('terms'); return false;" data-i18n="footerTerms">Terms of Service (SLA)</a>`);

// Also add footer links if missing
if (!html.includes("openLegalModal('privacy')")) {
  html = html.replace('© Copyright', `<div style="display:flex; gap:16px; margin-bottom:10px;"><a href="#" onclick="openLegalModal('privacy'); return false;" style="color:#0d9488; font-weight:700; text-decoration:underline;">🛡️ Gizlilik & KVKK</a> <a href="#" onclick="openLegalModal('terms'); return false;" style="color:#0d9488; font-weight:700; text-decoration:underline;">📜 Kullanım Şartları</a></div>\n© Copyright`);
}

// 5. ADD DICTIONARY ENTRIES FOR EN, TR, ES, ZH FOR COOKIE & LEGAL MODALS
const dictionaryEn = `
        cookieTitle: "Cookie & Privacy Notice (KVKK / GDPR)",
        cookieDesc: "KinderLog & CareLog uses essential and analytical cookies to improve service quality, ensure session security, and remember your preferences.",
        cookieEssential: "Essential Only",
        cookieAcceptAll: "Accept All",
        privacyModalTitle: "Privacy Policy & KVKK Disclosure Notice",
        termsModalTitle: "Terms of Service & SaaS SLA Agreement",
        footerPrivacy: "Privacy Policy & KVKK",
        footerTerms: "Terms of Service (SLA)",
`;

const dictionaryTr = `
        cookieTitle: "Çerez ve Gizlilik Bildirimi (KVKK / GDPR)",
        cookieDesc: "KinderLog & CareLog platformunda hizmet kalitesini artırmak, oturum güvenliğini sağlamak ve tercihlerinizi hatırlamak için zorunlu ve analitik çerezler kullanmaktayız.",
        cookieEssential: "Yalnızca Zorunlu",
        cookieAcceptAll: "Tümünü Kabul Et",
        privacyModalTitle: "Gizlilik Politikası & KVKK Aydınlatma Metni",
        termsModalTitle: "Kullanım Koşulları & Hizmet Sözleşmesi (SLA)",
        footerPrivacy: "Gizlilik Politikası & KVKK",
        footerTerms: "Kullanım Şartları (SLA)",
`;

// Insert into fullDictionary if not present
if (!html.includes('cookieTitle:')) {
  html = html.replace('fullDictionary = {', `fullDictionary = {\n      en: {\n${dictionaryEn}\n      },\n      tr: {\n${dictionaryTr}\n      },`);
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ Integrated KVKK/GDPR Cookie Banner, Privacy Policy Modal & Terms of Service Modal into landing-page.html!');
