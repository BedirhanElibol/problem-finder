import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Implementing Demo Login Query & Logout JS logic...")

demo_login_js = '''
    // DEMO LOGIN QUERY & LOGOUT HANDLERS
    function selectDemoAccount(roleKey) {
      const emailInput = document.getElementById('login-email-input');
      const passInput = document.getElementById('login-password-input');
      const roleHidden = document.getElementById('login-selected-role');

      if (roleHidden) roleHidden.value = roleKey;

      if (roleKey === 'ogretmen') {
        if (emailInput) emailInput.value = 'ogretmen@kinderlog.com';
        if (passInput) passInput.value = 'demo123';
      } else if (roleKey === 'carelog') {
        if (emailInput) emailInput.value = 'hemsire@carelog.com';
        if (passInput) passInput.value = 'demo123';
      } else if (roleKey === 'veli') {
        if (emailInput) emailInput.value = 'veli@kinderlog.com';
        if (passInput) passInput.value = 'demo123';
      } else if (roleKey === 'yonetici') {
        if (emailInput) emailInput.value = 'mudur@kinderlog.com';
        if (passInput) passInput.value = 'demo123';
      }
      showToast('Demo hesap seçildi: ' + (emailInput ? emailInput.value : roleKey));
    }

    function handleLoginQuerySubmit(e) {
      e.preventDefault();
      const email = document.getElementById('login-email-input').value;
      const pass = document.getElementById('login-password-input').value;
      const roleKey = document.getElementById('login-selected-role').value || 'ogretmen';

      if (!email || !pass) {
        showToast('❌ Lütfen geçerli e-posta ve şifre giriniz!');
        return;
      }

      showToast(`🔒 Giriş sorgulandı... Doğrulama Başarılı! (${email})`);
      closeRoleGatewayModal();

      setTimeout(() => {
        launchDedicatedRoleApp(roleKey);
      }, 400);
    }

    function exitSaaSApp() {
      const landing = document.getElementById('view-landing');
      const app = document.getElementById('view-app-dashboard');
      if (landing) landing.style.display = 'block';
      if (app) app.style.display = 'none';
      showToast('🚪 Oturum kapatıldı, Ana Sayfaya yönlendirildiniz.');
    }
'''

end_script_idx = html.rfind('</script>')
if end_script_idx != -1:
    html = html[:end_script_idx] + '\n' + demo_login_js.strip() + '\n  </script>\n</html>'
    print("Inserted Demo Login and Logout JS handlers!")

# Also ensure topbar and sidebar have prominent logout buttons with clear Turkish text
html = html.replace('Exit App to Landing Page', 'Çıkış Yap')
html = html.replace('Landing Page &#10140;', '🚪 Çıkış Yap')

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Saved complete Demo Login Query & Logout fixes!")
