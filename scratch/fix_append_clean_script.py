import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Appending clean main JS script block to landing-page.html...")

clean_js = '''
  <script>
    // KinderLog & CareLog Main JS Controls
    function toggleLangDropdown() {
      const menu = document.getElementById('lang-menu');
      if (menu) menu.classList.toggle('hidden');
    }

    function selectGlobalLang(lang) {
      if (window.setGlobalLang) {
        window.setGlobalLang(lang);
      }
      const menu = document.getElementById('lang-menu');
      if (menu) menu.classList.add('hidden');
    }

    function openRoleGatewayModal() {
      const modal = document.getElementById('modal-role-gateway');
      if (modal) {
        modal.style.display = 'flex';
        modal.classList.remove('hidden');
      }
    }

    function closeRoleGatewayModal() {
      const modal = document.getElementById('modal-role-gateway');
      if (modal) {
        modal.style.display = 'none';
        modal.classList.add('hidden');
      }
    }

    function launchDedicatedRoleApp(roleKey) {
      closeRoleGatewayModal();
      const landing = document.getElementById('view-landing');
      const app = document.getElementById('view-app-dashboard');
      if (landing) landing.style.display = 'none';
      if (app) app.style.display = 'flex';
      
      if (window.switchAppRole) {
        window.switchAppRole(roleKey);
      }
    }

    function exitSaaSApp() {
      const landing = document.getElementById('view-landing');
      const app = document.getElementById('view-app-dashboard');
      if (landing) landing.style.display = 'block';
      if (app) app.style.display = 'none';
    }

    function openLegalModal(type) {
      const modal = document.getElementById('legalModal');
      const title = document.getElementById('legalModalTitle');
      const body = document.getElementById('legalModalBody');
      if (!modal) return;

      if (type === 'privacy') {
        if (title) title.innerText = 'Gizlilik Politikası (Privacy Policy)';
        if (body) body.innerText = 'KinderLog & CareLog olarak kişisel verilerinizin güvenliği en yüksek önceliğimizdir. Verileriniz 256-bit SSL şifreleme ile korunmaktadır.';
      } else if (type === 'kvkk') {
        if (title) title.innerText = 'KVKK Aydınlatma Metni';
        if (body) body.innerText = '6698 Sayılı Kişisel Verilerin Korunması Kanunu uyarınca verileriniz yalnızca yetkili kurum personeli ve veliler ile paylaşılmaktadır.';
      } else if (type === 'cookies') {
        if (title) title.innerText = 'Çerez Politikası (Cookie Policy)';
        if (body) body.innerText = 'Kullanıcı deneyiminizi iyileştirmek için zorunlu ve analitik çerezler kullanılmaktadır.';
      }

      modal.style.display = 'flex';
      modal.classList.remove('hidden');
    }

    function closeLegalModal() {
      const modal = document.getElementById('legalModal');
      if (modal) {
        modal.style.display = 'none';
        modal.classList.add('hidden');
      }
    }

    document.addEventListener('DOMContentLoaded', function() {
      if (window.lucide) lucide.createIcons();

      const heroVideo = document.getElementById('heroVideo');
      const toggleAudioBtn = document.getElementById('toggleAudioBtn');
      const togglePlayBtn = document.getElementById('togglePlayBtn');

      if (heroVideo && toggleAudioBtn) {
        toggleAudioBtn.addEventListener('click', function() {
          heroVideo.muted = !heroVideo.muted;
          toggleAudioBtn.innerHTML = heroVideo.muted ? '<i data-lucide="volume-x" class="w-4 h-4"></i>' : '<i data-lucide="volume-2" class="w-4 h-4"></i>';
          if (window.lucide) lucide.createIcons();
        });
      }

      if (heroVideo && togglePlayBtn) {
        togglePlayBtn.addEventListener('click', function() {
          if (heroVideo.paused) {
            heroVideo.play();
            togglePlayBtn.innerHTML = '<i data-lucide="pause" class="w-4 h-4"></i>';
          } else {
            heroVideo.pause();
            togglePlayBtn.innerHTML = '<i data-lucide="play" class="w-4 h-4"></i>';
          }
          if (window.lucide) lucide.createIcons();
        });
      }

      const openVideoModalBtn = document.getElementById('openVideoModal');
      const closeVideoModalBtn = document.getElementById('closeVideoModal');
      const videoModal = document.getElementById('videoModal');
      const modalVideo = document.getElementById('modalVideo');

      if (openVideoModalBtn && videoModal && modalVideo) {
        openVideoModalBtn.addEventListener('click', function() {
          videoModal.classList.remove('hidden');
          modalVideo.play();
        });
      }

      if (closeVideoModalBtn && videoModal && modalVideo) {
        closeVideoModalBtn.addEventListener('click', function() {
          videoModal.classList.add('hidden');
          modalVideo.pause();
        });
      }

      if (videoModal && modalVideo) {
        videoModal.addEventListener('click', function(e) {
          if (e.target === videoModal) {
            videoModal.classList.add('hidden');
            modalVideo.pause();
          }
        });
      }

      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
          mobileMenu.classList.toggle('hidden');
          mobileMenu.classList.toggle('flex');
        });
      }
    });
  </script>
'''

html += '\n' + clean_js.strip()

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Saved clean JS script block at end of landing-page.html!")
