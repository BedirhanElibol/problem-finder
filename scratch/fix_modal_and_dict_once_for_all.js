const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Update openRoleGatewayModal to run setGlobalLang
html = html.replace(
  'function openRoleGatewayModal() {\n      document.getElementById(\'modal-role-gateway\').style.display = \'flex\';\n    }',
  'function openRoleGatewayModal() {\n      document.getElementById(\'modal-role-gateway\').style.display = \'flex\';\n      setGlobalLang(currentLangKey);\n    }'
);

// 2. Insert dictionary keys explicitly inside fullDictionary objects
html = html.replace('tr: {', 'tr: {\n        modalRoleTitle: "Başlatılacak Portalı Seçin",\n        modalRoleSub: "Her kullanıcı rolü için özel çalışma alanları:",\n        btnLaunchPortal: "Portalı Başlat ➜",');
html = html.replace('en: {', 'en: {\n        modalRoleTitle: "Select Portal to Launch",\n        modalRoleSub: "Dedicated workspaces for each user role:",\n        btnLaunchPortal: "Launch Portal ➜",');
html = html.replace('es: {', 'es: {\n        modalRoleTitle: "Seleccionar Portal a Iniciar",\n        modalRoleSub: "Espacios de trabajo dedicados para cada rol:",\n        btnLaunchPortal: "Iniciar Portal ➜",');
html = html.replace('zh: {', 'zh: {\n        modalRoleTitle: "选择要启动的门户",\n        modalRoleSub: "每个用户角色的专属工作区:",\n        btnLaunchPortal: "启动门户 ➜",');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully updated openRoleGatewayModal and fullDictionary!');
