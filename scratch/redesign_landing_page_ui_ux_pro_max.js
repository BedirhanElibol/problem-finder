const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

console.log('Original landing-page.html length:', html.length);

// 1. UPDATE GOOGLE FONTS IMPORT & CSS DESIGN SYSTEM
const fontsAndDesignSystemCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@500;700&display=swap');

  :root {
    --font-heading: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: 'Fira Code', monospace;
    
    --brand-teal: #0d9488;
    --brand-teal-hover: #0f766e;
    --brand-teal-light: #f0fdf4;
    --brand-emerald: #10b981;
    --brand-cyan: #06b6d4;
    --brand-amber: #f59e0b;
    
    --bg-main: #f8fafc;
    --bg-surface: #ffffff;
    --bg-subtle: #f1f5f9;
    --text-primary: #0f172a;
    --text-secondary: #475569;
    --text-muted: #64748b;
    --border-color: #e2e8f0;
    
    --shadow-sm: 0 2px 8px rgba(15, 23, 42, 0.04);
    --shadow-md: 0 8px 24px rgba(15, 23, 42, 0.08);
    --shadow-lg: 0 16px 36px rgba(15, 23, 42, 0.12);
    --shadow-glow: 0 8px 28px rgba(13, 148, 136, 0.35);
    
    --radius-sm: 8px;
    --radius-md: 14px;
    --radius-lg: 20px;
    --radius-full: 9999px;
  }

  body {
    font-family: var(--font-body);
    background-color: var(--bg-main);
    color: var(--text-primary);
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    letter-spacing: -0.02em;
  }

  /* FLOATING NAVBAR HEADER */
  .navbar {
    position: fixed;
    top: 16px;
    left: 24px;
    right: 24px;
    height: 72px;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(226, 232, 240, 0.8);
    border-radius: 20px;
    z-index: 1000;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    transition: all 0.3s ease;
  }
  
  .navbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1320px;
    margin: 0 auto;
  }

  .logo-group {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    cursor: pointer;
  }

  .logo-title-text {
    font-family: var(--font-heading);
    font-size: 17px;
    font-weight: 800;
    color: var(--text-primary);
    line-height: 1.1;
  }
  .logo-title-text span {
    color: var(--brand-teal);
    font-size: 13px;
    font-weight: 700;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 32px;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .nav-links a {
    color: var(--text-secondary);
    font-weight: 600;
    font-size: 14.5px;
    text-decoration: none;
    transition: color 0.2s ease;
    cursor: pointer;
  }
  .nav-links a:hover {
    color: var(--brand-teal);
  }

  /* PREMIUM HERO SECTION */
  .hero-section {
    padding-top: 140px;
    padding-bottom: 70px;
    text-align: center;
    background: radial-gradient(circle at 50% 0%, rgba(13, 148, 136, 0.08) 0%, transparent 60%);
  }

  .hero-headline {
    font-size: 52px;
    font-weight: 800;
    color: var(--text-primary);
    max-width: 900px;
    margin: 0 auto 20px;
    line-height: 1.12;
  }
  @media (max-width: 768px) { .hero-headline { font-size: 36px; } }

  .hero-subtitle {
    font-size: 19px;
    color: var(--text-secondary);
    max-width: 720px;
    margin: 0 auto 36px;
    line-height: 1.5;
  }

  .btn-hero-main-cta {
    background: linear-gradient(135deg, var(--brand-teal), #10b981);
    color: white;
    font-family: var(--font-heading);
    font-size: 18px;
    font-weight: 800;
    padding: 16px 40px;
    border-radius: var(--radius-full);
    border: none;
    cursor: pointer;
    box-shadow: var(--shadow-glow);
    transition: all 0.25s ease;
    display: inline-flex;
    align-items: center;
    gap: 12px;
  }
  .btn-hero-main-cta:hover {
    background: linear-gradient(135deg, var(--brand-teal-hover), #059669);
    transform: translateY(-3px);
    box-shadow: 0 12px 36px rgba(13, 148, 136, 0.45);
  }

  /* ROLE CARDS HOVER STYLES */
  .role-select-card {
    background: white;
    border: 1px solid var(--border-color);
    border-radius: 20px;
    padding: 28px 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: var(--shadow-sm);
  }
  .role-select-card:hover {
    border-color: var(--brand-teal);
    transform: translateY(-5px);
    box-shadow: 0 16px 36px rgba(13, 148, 136, 0.15);
  }

  /* SVG ICON CONTAINER STYLES */
  .svg-icon-box {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: #f0fdf4;
    color: var(--brand-teal);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
`;

// Replace emoji icons with Lucide SVG Icons in Feature Cards and Role Selection Cards
html = html.replace(/🍽️/g, '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>');
html = html.replace(/💤/g, '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>');
html = html.replace(/🎨/g, '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.72 1.7-1.65 0-.43-.17-.83-.44-1.14-.29-.33-.46-.77-.46-1.21 0-.93.75-1.7 1.7-1.7h2.5c3.3 0 6-2.7 6-6 0-5.5-4.5-10-10-10Z"/></svg>');
html = html.replace(/👵/g, '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>');
html = html.replace(/💬/g, '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>');
html = html.replace(/🍪/g, '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Z"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M11 17v.01"/><path d="M7 14v.01"/></svg>');
html = html.replace(/🛡️/g, '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>');
html = html.replace(/📜/g, '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>');

// Inject Design System CSS before </style>
if (!html.includes('/* FLOATING NAVBAR HEADER */')) {
  html = html.replace('</style>', `${fontsAndDesignSystemCSS}\n</style>`);
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ Overhauled landing-page.html with UI/UX Pro Max Design System & Lucide SVG icons!');
