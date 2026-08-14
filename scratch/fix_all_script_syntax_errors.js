const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Fix multi-line string breaks inside <script> tags
const scriptStart = html.indexOf('<script>');
const scriptEnd = html.lastIndexOf('</script>');

if (scriptStart !== -1 && scriptEnd !== -1) {
  let scriptContent = html.substring(scriptStart, scriptEnd);
  
  // Replace unescaped newlines inside strings or fix roleTitles object
  const cleanRoleTitles = `
    const roleTitles = {
      en: { ogretmen: '🏫 Teacher Portal', carelog: '👵 CareLog Infirmary', veli: '💬 Family Feed', yonetici: '📊 Facility Manager' },
      tr: { ogretmen: '🏫 Öğretmen Portalı', carelog: '👵 CareLog Revir & Bakıcı', veli: '💬 Veli Akışı', yonetici: '📊 Kurum Yöneticisi' },
      es: { ogretmen: '🏫 Portal del Profesor', carelog: '👵 Enfermería CareLog', veli: '💬 Muro Familiar', yonetici: '📊 Director General' },
      zh: { ogretmen: '🏫 教师门户', carelog: '👵 护理日志', veli: '💬 家长动态', yonetici: '📊 机构管理者' }
    };
  `;
  
  scriptContent = scriptContent.replace(/const roleTitles = \{[\s\S]*?\};/, cleanRoleTitles.trim());
  html = html.substring(0, scriptStart) + scriptContent + html.substring(scriptEnd);
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ Cleaned up JavaScript script block syntax errors!');
