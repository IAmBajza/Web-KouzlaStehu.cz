# KouzlaStehu.cz – statický web (Cloudflare Pages + GitHub)

Tahle verze webu je **čistý statický HTML/CSS/JS** (rychlá, levná, jednoduchá).
- ✅ Super výkon (žádné frameworkové břicho)
- ✅ Funguje na mobilu i na desktopu
- ✅ Galerie s „lightboxem“ (kliknu → zvětším)
- ✅ Základní SEO (meta, OG, sitemap, robots)
- ✅ Bezpečnostní hlavičky přes `_headers`

---

## Jak aktualizovat web přes GitHub (nejjednodušší workflow)

### Varianta A – GitHub Desktop (nejvíc „klikací“, skoro bez nervů)
1. Nainstaluj **GitHub Desktop**.
2. Otevři svůj repozitář: `IAmBajza/Web-KouzlaStehu.cz` (Clone).
3. Do složky repozitáře **zkopíruj obsah tohoto ZIPu** (přepiš staré soubory).
4. V GitHub Desktop uvidíš změny → napiš krátký popis (např. „Úprava homepage + galerie“).
5. Klikni **Commit to main**.
6. Klikni **Push origin**.

Hotovo. Cloudflare Pages si to stáhne a nasadí samo (pokud je propojené s repem).

### Varianta B – přes příkazovou řádku (pro odvážné)
```bash
git clone https://github.com/IAmBajza/Web-KouzlaStehu.cz
cd Web-KouzlaStehu.cz

# zkopíruj sem nové soubory (přepsat)
git add .
git commit -m "Update web"
git push
```

---

## Cloudflare Pages – nastavení build/deploy

Protože je to statický web, nastav:
- **Framework preset:** None
- **Build command:** (prázdné) nebo `echo "no build"`
- **Build output directory:** `/` (root) – protože `index.html` je v rootu repozitáře

### Custom domain
V Cloudflare Pages přidej doménu `kouzlastehu.cz` a `www.kouzlastehu.cz` (podle toho co používáš).

---

## Kde měnit obsah

- `index.html` – texty, sekce, pořadí
- `assets/css/styles.css` – vzhled
- `assets/js/main.js` – menu + lightbox
- `assets/img/` – obrázky (portfolio + logo)

---

## Co bych vylepšil jako další krok (pokud chceš „profi prodej“)
- Stránka „Produkty“ (detailní kategorie + varianty)
- Ceník „od…“ + konfigurátor (velikost, materiál, kapsy)
- Reference (reálné recenze – ideálně s fotkou)
- Jednoduchý formulář poptávky (nebo Tally/Typeform embed)
- Web analytika (Cloudflare Web Analytics – bez cookies)
