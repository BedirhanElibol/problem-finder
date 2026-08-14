const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

console.log('🚀 Adding missing translation keys to fullDictionary ...');

// Missing keys to insert:
// lblCategory, lblValue, lblNote, heroMeal, heroSleep, heroActivity, heroPhoto

const enAdditions = `
      lblCategory: "Category",
      lblValue: "Value / Status",
      lblNote: "Notes / Description",
      heroMeal: "Meal",
      heroSleep: "Sleep",
      heroActivity: "Activity",
      heroPhoto: "Photo",
`;

const trAdditions = `
      lblCategory: "Kategori",
      lblValue: "Değer / Durum",
      lblNote: "Not / Açıklama",
      heroMeal: "Yemek",
      heroSleep: "Uyku",
      heroActivity: "Etkinlik",
      heroPhoto: "Fotoğraf",
`;

const esAdditions = `
      lblCategory: "Categoría",
      lblValue: "Valor / Estado",
      lblNote: "Notas / Descripción",
      heroMeal: "Comida",
      heroSleep: "Sueño",
      heroActivity: "Actividad",
      heroPhoto: "Foto",
`;

const zhAdditions = `
      lblCategory: "类别",
      lblValue: "数值 / 状态",
      lblNote: "备注 / 描述",
      heroMeal: "饮食",
      heroSleep: "睡眠",
      heroActivity: "活动",
      heroPhoto: "照片",
`;

if (!html.includes('heroMeal:')) {
  html = html.replace('navLogin: "Login",', 'navLogin: "Login",\n' + enAdditions.trim() + ',');
  html = html.replace('navLogin: "Giriş Yap",', 'navLogin: "Giriş Yap",\n' + trAdditions.trim() + ',');
  html = html.replace('navLogin: "Iniciar Sesión",', 'navLogin: "Iniciar Sesión",\n' + esAdditions.trim() + ',');
  html = html.replace('navLogin: "登录",', 'navLogin: "登录",\n' + zhAdditions.trim() + ',');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ Added missing i18n keys to fullDictionary for all 4 languages!');
