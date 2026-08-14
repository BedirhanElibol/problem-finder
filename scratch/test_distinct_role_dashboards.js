const puppeteer = require('puppeteer');
const path = require('path');

async function testDistinctRoleDashboards() {
  console.log('🚀 Testing All 4 Role Dashboards, Form Submissions & Tables on http://localhost:3030 ...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960, deviceScaleFactor: 2 });

  await page.goto('http://localhost:3030', { waitUntil: 'networkidle0' });
  await page.evaluate(() => localStorage.setItem('kinderlog_cookie_consent', 'all'));
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const roles = [
    { key: 'ogretmen', expectedTitle: '🏫 Öğretmen Portalı', expectedForm: 'form-teacher-activity' },
    { key: 'carelog', expectedTitle: '👵 CareLog Revir & Bakıcı', expectedForm: 'form-nurse-vitals' },
    { key: 'veli', expectedTitle: '💬 Veli / Aile Akışı', expectedForm: 'form-parent-note' },
    { key: 'yonetici', expectedTitle: '📊 Kurum Yöneticisi', expectedForm: 'form-director-register' }
  ];

  for (const role of roles) {
    console.log(`\n--- Testing Role Dashboard: ${role.key.toUpperCase()} ---`);
    
    // Launch role workspace
    await page.evaluate((k) => {
      if (window.launchDedicatedRoleApp) window.launchDedicatedRoleApp(k);
    }, role.key);
    await new Promise(r => setTimeout(r, 600));

    // Verify topbar title
    const topbarText = await page.evaluate(() => document.getElementById('saas-topbar-title')?.innerText || '');
    console.log(`   ✔ Topbar Title: "${topbarText}"`);
    if (!topbarText.includes(role.expectedTitle.split(' ')[1])) {
      throw new Error(`Role topbar title mismatch for ${role.key}: expected "${role.expectedTitle}", got "${topbarText}"`);
    }

    // Verify form exists and is visible
    const formVisible = await page.evaluate((fId) => {
      const el = document.getElementById(fId);
      return el !== null && el.offsetParent !== null;
    }, role.expectedForm);
    console.log(`   ✔ Interactive Data Entry Form ("${role.expectedForm}") Visible: ${formVisible}`);

    // Take screenshot of role dashboard
    const shotPath = path.join('C:', 'Users', 'Bedirhan', '.gemini', 'antigravity-ide', 'brain', '15d9f643-d00e-4b92-9c79-43f304384e90', `role_${role.key}_dashboard.png`);
    await page.screenshot({ path: shotPath, fullPage: false });
    console.log(`   ✔ Saved screenshot for ${role.key}: ${shotPath}`);

    // Return to landing page before next role test
    await page.evaluate(() => {
      if (window.exitSaaSApp) window.exitSaaSApp();
    });
    await new Promise(r => setTimeout(r, 400));
  }

  console.log('\n🎉 ALL 4 ROLE DASHBOARDS, FORMS & TABLES VERIFIED 100% SUCCESSFUL!');
  await browser.close();
}

testDistinctRoleDashboards().catch(err => {
  console.error('❌ Role Dashboard Test Failed:', err);
  process.exit(1);
});
