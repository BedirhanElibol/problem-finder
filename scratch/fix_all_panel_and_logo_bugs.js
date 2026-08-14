const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

console.log('🚀 Fixing Panel, Logo, Role Launchers, and i18n Dashboard Translations ...');

// 1. Fix corrupted onclick string keys in role selection cards (e.g. 'ogretmen' -> 'ogretmen')
html = html.replace(/launchDedicatedRoleApp\(['"]og[^'"]*retmen['"]\)/g, "launchDedicatedRoleApp('ogretmen')");

// 2. Fix Sidebar Brand Logo Header in SaaS Workspace
const oldSidebarBrand = `<div class="saas-sidebar-brand">
        <img src="data:image/png;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/6xeISlAAAQAAAAEAABd+anVtYgAAAB5qdW1kYzJwYQARABCAAACqADibcQNjMnBhAAAAF1hqdW1iAAAA
        <div class="brand-name">KinderLog SaaS</div>
      </div>`;

const cleanSidebarBrand = `
      <div class="saas-sidebar-brand" style="padding:18px 20px; display:flex; align-items:center; gap:12px; border-bottom:1px solid rgba(255,255,255,0.1);">
        <div style="width:36px; height:36px; background:linear-gradient(135deg, #0d9488, #10b981); border-radius:10px; display:flex; align-items:center; justify-content:center; color:white; font-weight:800; font-size:18px; box-shadow:0 4px 12px rgba(13,148,136,0.4);">K</div>
        <div>
          <div class="brand-name" style="font-size:15px; font-weight:800; color:white; line-height:1.2;">KinderLog</div>
          <div style="font-size:11px; color:#94a3b8; font-weight:600;">& CareLog SaaS</div>
        </div>
      </div>
`;

html = html.replace(/<div class="saas-sidebar-brand">[\s\S]*?<div class="brand-name">KinderLog SaaS<\/div>\s*<\/div>/, cleanSidebarBrand.trim());

// 3. Fix static profile card and topbar title corrupted characters
html = html.replace('Melis retmen', 'Melis Öğretmen');
html = html.replace(' retmen Portal  Live Workspace', 'Öğretmen Portalı — Live Workspace');

// 4. Update launchDedicatedRoleApp JS implementation
const cleanLaunchFn = `
  window.launchDedicatedRoleApp = function(roleKey) {
    if (typeof closeRoleGatewayModal === 'function') closeRoleGatewayModal();
    
    // Normalize roleKey if corrupted
    if (roleKey.includes('og') || roleKey.includes('retmen')) roleKey = 'ogretmen';
    
    document.getElementById('view-landing').style.display = 'none';
    document.getElementById('view-app-dashboard').style.display = 'block';

    const wsOgretmen = document.getElementById('role-workspace-ogretmen');
    const wsCarelog = document.getElementById('role-workspace-carelog');
    const wsVeli = document.getElementById('role-workspace-veli');
    const wsYonetici = document.getElementById('role-workspace-yonetici');

    if (wsOgretmen) wsOgretmen.style.display = 'none';
    if (wsCarelog) wsCarelog.style.display = 'none';
    if (wsVeli) wsVeli.style.display = 'none';
    if (wsYonetici) wsYonetici.style.display = 'none';

    const roleTitles = {
      en: { ogretmen: '🏫 Teacher Portal', carelog: '👵 CareLog Infirmary', veli: '💬 Family Feed', yonetici: '📊 Facility Manager' },
      tr: { ogretmen: '🏫 Öğretmen Portalı', carelog: '👵 CareLog Revir & Bakıcı', veli: '💬 Veli Akışı', yonetici: '📊 Kurum Yöneticisi' },
      es: { ogretmen: '🏫 Portal del Profesor', carelog: '👵 Enfermería CareLog', veli: '💬 Muro Familiar', yonetici: '📊 Director General' },
      zh: { ogretmen: '🏫 教师门户', carelog: '👵 护理日志', veli: '💬 家长动态', yonetici: '📊 机构管理者' }
    };

    const currentLang = window.currentLangKey || localStorage.getItem('app_lang') || 'tr';
    const tDict = roleTitles[currentLang] || roleTitles.tr;

    const userMap = {
      ogretmen: { name: currentLang === 'tr' ? 'Melis Öğretmen' : 'Teacher Melis', role: tDict.ogretmen, avatar: 'M', workspaceId: 'role-workspace-ogretmen' },
      carelog: { name: currentLang === 'tr' ? 'Hemşire Ayşe' : 'Nurse Ayşe', role: tDict.carelog, avatar: 'A', workspaceId: 'role-workspace-carelog' },
      veli: { name: currentLang === 'tr' ? 'Ahmet Yılmaz (Veli)' : 'Ahmet Yılmaz (Parent)', role: tDict.veli, avatar: 'V', workspaceId: 'role-workspace-veli' },
      yonetici: { name: currentLang === 'tr' ? 'Ayşe Hanım (Müdür)' : 'Ayşe Hanım (Manager)', role: tDict.yonetici, avatar: 'Y', workspaceId: 'role-workspace-yonetici' }
    };

    const userData = userMap[roleKey] || userMap.ogretmen;

    // Show corresponding workspace
    const targetWs = document.getElementById(userData.workspaceId);
    if (targetWs) targetWs.style.display = 'block';

    // Update Topbar and Profile Card
    const topTitle = document.getElementById('saas-topbar-title');
    if (topTitle) topTitle.innerText = userData.role + ' — Live Workspace';

    const pName = document.getElementById('saas-profile-name');
    if (pName) pName.innerText = userData.name;

    const pRole = document.getElementById('saas-profile-role');
    if (pRole) pRole.innerText = '• ' + userData.role;

    const pAvatar = document.getElementById('saas-avatar');
    if (pAvatar) pAvatar.innerText = userData.avatar;
    
    // Re-run setGlobalLang to translate any dashboard data-i18n elements
    if (typeof setGlobalLang === 'function') setGlobalLang(currentLang);
  };
`;

html = html.replace(/window\.launchDedicatedRoleApp = function\(roleKey\) \{[\s\S]*?\};/, cleanLaunchFn.trim());

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ Cleaned launchDedicatedRoleApp, fixed sidebar brand logo & userMap!');
