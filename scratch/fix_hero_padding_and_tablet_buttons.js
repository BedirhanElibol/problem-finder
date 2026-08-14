const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Fix hero section padding-top to 190px
html = html.replace(/\.hero-section\s*\{[^}]*\}/g, `.hero-section {
    padding-top: 190px !important;
    padding-bottom: 80px;
    text-align: center;
    background: radial-gradient(circle at 50% 0%, rgba(13, 148, 136, 0.08) 0%, transparent 60%);
  }`);

// Also fix any inline styles or other .hero-section declarations
html = html.replace('padding-top: 140px;', 'padding-top: 190px;');

// 2. Fix the tablet frame buttons HTML inside hero section
const mealSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; margin-right:4px;"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>`;
const sleepSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; margin-right:4px;"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>`;
const activitySvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; margin-right:4px;"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.72 1.7-1.65 0-.43-.17-.83-.44-1.14-.29-.33-.46-.77-.46-1.21 0-.93.75-1.7 1.7-1.7h2.5c3.3 0 6-2.7 6-6 0-5.5-4.5-10-10-10Z"/></svg>`;
const photoSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; margin-right:4px;"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`;

const cleanTabletButtons = `
                  <button onclick="showToast('success', 'Meal logged for Mila')" class="tablet-action-btn">${mealSvg} Meal</button>
                  <button onclick="showToast('success', 'Sleep logged for Mila')" class="tablet-action-btn">${sleepSvg} Sleep</button>
                  <button onclick="showToast('info', 'Activity logged for Mila')" class="tablet-action-btn">${activitySvg} Activity</button>
                  <button onclick="showToast('info', 'Photo uploaded')" class="tablet-action-btn">${photoSvg} Photo</button>
`;

// Replace broken buttons container
html = html.replace(/<button onclick="showToast[^>]*>[\s\S]*?<\/button>\s*<button onclick="showToast[^>]*>[\s\S]*?<\/button>\s*<button onclick="showToast[^>]*>[\s\S]*?<\/button>\s*<button onclick="showToast[^>]*>[\s\S]*?<\/button>/, cleanTabletButtons.trim());

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ Fixed hero section padding-top clearance & clean tablet buttons HTML!');
