# Kouzla stehů – jednoduchý profi web (statický)

## Rychlý náhled
- Otevři `index.html` dvojklikem (design je vložený přímo v HTML).
- Ještě jistější varianta: ve složce spusť lokální server:
  - `python -m http.server 5500`
  - otevři `http://localhost:5500`

## Jak vyměnit fotky v galerii
Složka: `assets/gallery/`
- Nahraď soubory `photo1.jpg` až `photo6.jpg` vlastními fotkami (stejné názvy).
- Hotovo – nemusíš nic měnit v HTML.

Tip: fotky ideálně 1200×800 nebo podobný poměr stran.

## Kontakty
V `index.html` si uprav:
- Instagram URL
- telefon
- e-mail

## Nasazení na Cloudflare Pages
- Nahraj obsah do GitHub repo (index.html + assets/)
- Cloudflare Pages → Create project → Connect to Git → Framework: None
- Custom domains: `kouzlastehu.cz` + `www.kouzlastehu.cz`
