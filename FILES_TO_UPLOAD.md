# Súbory na nahratie na GitHub

## Hlavné súbory (root)
- `package.json`
- `vite.config.ts`
- `vite.config.static.ts`
- `tsconfig.json`
- `tailwind.config.ts`
- `postcss.config.js`
- `components.json`
- `README.md`
- `DEPLOYMENT_GUIDE.md`

## Client priečinok (celý)
- `client/index.html`
- `client/src/` (všetky súbory a podpriečinky)

## Server priečinok (celý)
- `server/index.ts`
- `server/routes.ts`
- `server/storage.ts`
- `server/vite.ts`

## Shared priečinok
- `shared/schema.ts`

## Attached assets (len potrebné obrázky)
- `attached_assets/i have team_1749988424193.webp`
- `attached_assets/I_do_not_have-team_1749988424194.webp`
- `attached_assets/I do not have project topic_1749988424193.webp`
- `attached_assets/continue project_1750009392222.webp`
- `attached_assets/seek_help_1750009386120.webp`
- `attached_assets/project canceled_1750009386119.webp`
- `attached_assets/succesfull happy student_1750009386120.webp`

## GitHub Actions
- `.github/workflows/deploy.yml`

## Čo NENAHRÁVA:
- `node_modules/` - automaticky sa ignoruje
- `.replit` - špecifické pre Replit
- `replit.nix` - špecifické pre Replit
- Všetky ostatné súbory z `attached_assets/` (PDF, screenshoty, atď.)

## Postup uploadu:
1. Na GitHub vytvorte nový repozitár
2. Drag & drop všetky tieto súbory naraz
3. Commit s názvom "Initial commit"
4. V Settings → Pages nastavte Source na "GitHub Actions"
5. Push spustí automatické nasadenie