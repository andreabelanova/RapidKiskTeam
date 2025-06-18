# Jednoduché nasadenie RapidKISK Team na GitHub Pages

## Krok 1: Zmaže všetko v docs/ priečinku
V repozitári zmaže všetky súbory v docs/ priečinku.

## Krok 2: Vytvorte jediný súbor docs/index.html

Vytvorte súbor `docs/index.html` s týmto obsahom (kompletná funkčná aplikácia):

```html
<!DOCTYPE html>
<html lang="sk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RapidKISK Team Game</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            padding: 2rem; 
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .header { 
            text-align: center; 
            margin-bottom: 3rem; 
            color: white;
        }
        .title { 
            font-size: 3rem; 
            font-weight: bold; 
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .subtitle { 
            font-size: 1.2rem; 
            opacity: 0.9;
        }
        .game-area { 
            background: white; 
            border-radius: 20px; 
            padding: 3rem; 
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            backdrop-filter: blur(10px);
        }
        .character-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); 
            gap: 2rem; 
            margin-bottom: 2rem; 
        }
        .character-card { 
            padding: 2rem; 
            border: 3px solid #e2e8f0; 
            border-radius: 15px; 
            cursor: pointer; 
            transition: all 0.3s ease;
            background: linear-gradient(145deg, #f8fafc, #e2e8f0);
            position: relative;
            overflow: hidden;
        }
        .character-card:hover { 
            border-color: #3b82f6; 
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(59, 130, 246, 0.2);
        }
        .character-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6);
        }
        .character-title { 
            font-weight: 700; 
            color: #1e293b; 
            margin-bottom: 1rem;
            font-size: 1.3rem;
        }
        .character-desc { 
            color: #64748b; 
            line-height: 1.6;
        }
        .scenario-content {
            display: none;
            text-align: center;
        }
        .scenario-content.active {
            display: block;
        }
        .scenario-title {
            font-size: 2rem;
            color: #1e293b;
            margin-bottom: 1.5rem;
            font-weight: 700;
        }
        .scenario-description {
            font-size: 1.1rem;
            color: #64748b;
            margin-bottom: 2rem;
            line-height: 1.6;
        }
        .decisions {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-width: 600px;
            margin: 0 auto;
        }
        .decision-btn {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            padding: 1rem 2rem;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            transition: all 0.3s ease;
            text-align: left;
        }
        .decision-btn:hover {
            transform: translateX(10px);
            box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
        }
        .back-btn {
            background: #6b7280;
            color: white;
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1rem;
            margin-top: 2rem;
            transition: all 0.3s ease;
        }
        .back-btn:hover {
            background: #4b5563;
        }
        .success {
            background: linear-gradient(135deg, #10b981, #047857);
            color: white;
            padding: 2rem;
            border-radius: 15px;
            text-align: center;
        }
        .conflict {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: white;
            padding: 2rem;
            border-radius: 15px;
            text-align: center;
        }
        @media (max-width: 768px) {
            .container { padding: 1rem; }
            .title { font-size: 2rem; }
            .game-area { padding: 1.5rem; }
            .character-card { padding: 1.5rem; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="title">RapidKISK Team</h1>
            <p class="subtitle">Interaktívny simulátor tímovej spolupráce pre vzdelávacie účely</p>
        </div>
        
        <div class="game-area">
            <!-- Úvodná obrazovka -->
            <div id="landing" class="character-grid">
                <div class="character-card" onclick="startScenario('team')">
                    <h3 class="character-title">Mám tím</h3>
                    <p class="character-desc">Už máte vytvorený tím a ste pripravení spolupracovať na projekte.</p>
                </div>
                <div class="character-card" onclick="startScenario('no-team')">
                    <h3 class="character-title">Nemám tím</h3>
                    <p class="character-desc">Potrebujete nájsť členov tímu a vytvoriť spolupracujúcu skupinu.</p>
                </div>
                <div class="character-card" onclick="startScenario('no-topic')">
                    <h3 class="character-title">Nemám tému projektu</h3>
                    <p class="character-desc">Potrebujete vymyslieť a vybrať vhodnú tému projektu pre váš tím.</p>
                </div>
            </div>

            <!-- Scenáre -->
            <div id="scenario-team" class="scenario-content">
                <h2 class="scenario-title">Výzva tímovej spolupráce</h2>
                <p class="scenario-description">Váš tím je pripravený pracovať, ale potrebujete ustanoviť efektívne postupy spolupráce. Ako pristúpite k organizácii práce?</p>
                <div class="decisions">
                    <button class="decision-btn" onclick="showResult('success')">Nastavíme pravidelné tímové stretnutia a komunikačné kanály</button>
                    <button class="decision-btn" onclick="showResult('conflict')">Začneme pracovať individuálne a až potom spojíme výsledky</button>
                    <button class="decision-btn" onclick="showResult('success')">Vytvoríme zdieľaný pracovný priestor a rozdelíme úlohy</button>
                </div>
                <button class="back-btn" onclick="goBack()">Späť na začiatok</button>
            </div>

            <div id="scenario-no-team" class="scenario-content">
                <h2 class="scenario-title">Formovanie tímu</h2>
                <p class="scenario-description">Potrebujete nájsť správnych členov tímu pre váš projekt. Aká bude vaša stratégia?</p>
                <div class="decisions">
                    <button class="decision-btn" onclick="showResult('success')">Hľadám ľudí s komplementárnymi zručnosťami a skúsenosťami</button>
                    <button class="decision-btn" onclick="showResult('conflict')">Vyberiem si priateľov bez ohľadu na ich odborné zručnosti</button>
                    <button class="decision-btn" onclick="showResult('success')">Aktívne oslovím ľudí a predstavím im náš projekt</button>
                </div>
                <button class="back-btn" onclick="goBack()">Späť na začiatok</button>
            </div>

            <div id="scenario-no-topic" class="scenario-content">
                <h2 class="scenario-title">Výber témy projektu</h2>
                <p class="scenario-description">Potrebujete vybrať vhodnú tému projektu. Ako pristúpite k tomuto rozhodnutiu?</p>
                <div class="decisions">
                    <button class="decision-btn" onclick="showResult('success')">Preskúmam aktuálne trendy v odvetví a potreby trhu</button>
                    <button class="decision-btn" onclick="showResult('conflict')">Vyberiem prvú myšlienku, ktorá mi príde na um</button>
                    <button class="decision-btn" onclick="showResult('success')">Zapojím tím do brainstormingu a spoločne vyberieme tému</button>
                </div>
                <button class="back-btn" onclick="goBack()">Späť na začiatok</button>
            </div>

            <!-- Výsledky -->
            <div id="result-success" class="scenario-content success">
                <h2 class="scenario-title">Gratulujeme! 🎉</h2>
                <p class="scenario-description">Urobili ste vynikajúce rozhodnutie! Vaša tímová spolupráca je úspešná. Preukázali ste efektívne zručnosti tímovej práce a komunikácie.</p>
                <button class="back-btn" onclick="goBack()">Skúsiť iný scenár</button>
            </div>

            <div id="result-conflict" class="scenario-content conflict">
                <h2 class="scenario-title">Výzva narazila na prekážky</h2>
                <p class="scenario-description">Váš prístup viedol k určitým komplikáciám. Zvážte skúsenie inej stratégie, ktorá sa viac zameriava na tímovú komunikáciu a plánovanie.</p>
                <button class="back-btn" onclick="goBack()">Skúsiť znovu</button>
            </div>
        </div>
    </div>

    <script>
        function startScenario(type) {
            document.getElementById('landing').style.display = 'none';
            document.getElementById('scenario-' + type).classList.add('active');
        }

        function showResult(result) {
            document.querySelectorAll('.scenario-content').forEach(el => {
                el.classList.remove('active');
            });
            document.getElementById('result-' + result).classList.add('active');
        }

        function goBack() {
            document.querySelectorAll('.scenario-content').forEach(el => {
                el.classList.remove('active');
            });
            document.getElementById('landing').style.display = 'grid';
        }
    </script>
</body>
</html>
```

## Krok 3: Nastavte Pages
- Settings → Pages → Source: "Deploy from a branch"
- Branch: main / Folder: /docs

## Výsledok
Aplikácia bude okamžite dostupná na: https://andreabelanova.github.io/rapidkisk-team-game/

Táto verzia funguje bez build procesov alebo workflows - je to kompletná, funkčná hra v jednom súbore.