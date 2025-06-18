# GitHub Pages Deployment Guide

## Možnosti nasadenia

### 1. Replit Deployments (Najjednoduchšie)
- Kliknite na tlačidlo "Deploy" v Replit interface
- Aplikácia sa automaticky nasadí na `https://your-app-name.replit.app`
- Žiadna dodatočná konfigurácia nie je potrebná

### 2. GitHub Pages (Pre vlastnú doménu)

#### Krok 1: Príprava repozitára
1. Vytvorte nový GitHub repozitár
2. Nahrајte všetky súbory z tohto projektu do repozitára
3. Skontrolujte, že branch sa volá "main"

#### Krok 2: Konfigurácia GitHub Pages
1. Idite do Settings → Pages vo vašom GitHub repozitári
2. Source: Vyberte "GitHub Actions"
3. GitHub automaticky nájde `.github/workflows/deploy.yml` súbor

#### Krok 3: Nasadenie
1. Pushnutie do main branch automaticky spustí deployment
2. Aplikácia bude dostupná na `https://yourusername.github.io/repository-name`

#### Krok 4: Vlastná doména (voliteľné)
1. V Settings → Pages pridajte svoju doménu
2. Nastavte DNS záznamy u vášho domain providera

### 3. Manuálny build pre iné hosting služby

Pre Netlify, Vercel, alebo iné služby:

1. Spustite build lokálne:
```bash
npm install
npx vite build --config vite.config.static.ts
```

2. Nahrajte obsah priečinka `dist/` na vašu hosting službu

## Dôležité poznámky

- Aplikácia funguje úplne offline po načítaní
- Všetky dáta sú uložené v localStorage prehliadača
- Žiadny backend server nie je potrebný pre produkciu
- Všetky obrázky sú optimalizované a pripravené na nasadenie

## Riešenie problémov

### Chybné cesty k súborom
Ak sa obrázky nenačítavajú, upravte `base` cestu vo `vite.config.static.ts`:
```typescript
base: "/your-repository-name/"
```

### Routing problémy
Pre SPA routing pridajte do `dist/` priečinka súbor `_redirects`:
```
/*    /index.html   200
```

### Pomalý build
Build môže trvať 2-5 minút kvôli optimalizácii všetkých komponentov a ikon.

## Technické detaily

- Statická verzia používa localStorage namiesto backend API
- Všetky 42 scenárov sú vstavané do aplikácie
- Progress tracking funguje lokálne v prehliadači
- Aplikácia je responzívna a optimalizovaná pre mobily