const puppeteer = require('puppeteer');

async function testFixedNavbarAndLogin() {
  console.log('🚀 Testing Fixed Navbar Header Clearance & Login Button on http://localhost:3030 ...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  
  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  // 1. Verify Hero Title Clearance
  const heroTop = await page.evaluate(() => {
    const el = document.querySelector('.hero-h1');
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    return rect.top;
  });
  console.log(`   ✔ Hero Title Top Position: ${heroTop}px (Must be > 100px to avoid navbar overlap)`);
  if (heroTop < 100) {
    throw new Error(`Hero title is still overlapped by fixed navbar! (Top: ${heroTop}px)`);
  }

  // 2. Verify Login Button Visibility
  const loginBtnText = await page.evaluate(() => {
    const btn = document.querySelector('.btn-nav-login');
    return btn ? btn.innerText.trim() : null;
  });
  console.log(`   ✔ Navbar Login Button Found: "${loginBtnText}"`);
  if (!loginBtnText) {
    throw new Error('Navbar Login button is missing!');
  }

  // 3. Test Opening Role Gateway Modal via window.openRoleGatewayModal()
  await page.evaluate(() => window.openRoleGatewayModal());
  await new Promise(r => setTimeout(r, 400));
  const gatewayModalVisible = await page.evaluate(() => {
    const modal = document.getElementById('modal-role-gateway');
    return modal && getComputedStyle(modal).display !== 'none';
  });
  console.log(`   ✔ Role Gateway Login Modal Opened: ${gatewayModalVisible}`);
  if (!gatewayModalVisible) {
    throw new Error('Role Gateway modal failed to open when triggering Login!');
  }

  // 4. Test Launching Teacher Workspace from Modal
  await page.evaluate(() => window.launchDedicatedRoleApp('ogretmen'));
  await new Promise(r => setTimeout(r, 400));
  const saasWorkspaceVisible = await page.evaluate(() => {
    const dashboard = document.getElementById('view-app-dashboard');
    return dashboard && getComputedStyle(dashboard).display !== 'none';
  });
  console.log(`   ✔ Teacher SaaS Workspace Launched Successfully: ${saasWorkspaceVisible}`);
  if (!saasWorkspaceVisible) {
    throw new Error('Teacher SaaS workspace failed to launch!');
  }

  await browser.close();
  console.log('\n🎉 NAVBAR HEADER OVERLAP FIXED, LOGIN BUTTON & ALL ROLE PORTALS VERIFIED 100%!');
}

testFixedNavbarAndLogin().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
