import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

print("Cleaning script tags in landing-page.html...")

# Fix Tailwind CDN tag
html = html.replace('<script src="https://cdn.tailwindcss.com">// EarthGuard Interactive Logic & Video Controls', '<script src="https://cdn.tailwindcss.com">')

# Fix Lucide CDN tag
html = html.replace('<script src="https://unpkg.com/lucide@latest">// EarthGuard Interactive Logic & Video Controls', '<script src="https://unpkg.com/lucide@latest">')

# Remove duplicate JS logic blocks inside <head>
import re
html = re.sub(r'<script src="https://cdn\.tailwindcss\.com">[\s\S]*?</script>', '''<script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              green: '#86d028',
              greenHover: '#76b821',
              greenDark: '#5a9216',
              tealDark: '#0b191e',
              glow: 'rgba(134, 208, 40, 0.4)'
            }
          },
          fontFamily: {
            heading: ['Syne', 'sans-serif'],
            serif: ['"Instrument Serif"', 'serif'],
            sans: ['"Space Grotesk"', 'sans-serif']
          },
          animation: {
            'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            'bounce-slow': 'bounce 2.5s infinite',
            'float': 'float 6s ease-in-out infinite',
            'glow': 'glow 3s ease-in-out infinite alternate'
          }
        }
      }
    }
  </script>''', html)

html = re.sub(r'<script src="https://unpkg\.com/lucide@latest">[\s\S]*?</script>', '<script src="https://unpkg.com/lucide@latest"></script>', html)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Saved clean CDN script tags!")
