# _site\assets\css\styles.css

```css
/* Base Styles */
:root {
    --primary: #3d7dca;
    --secondary: #ffcb05;
    --accent: #ff5350;
    --text: #333;
    --bg: #f5f5f5;
    --card-hover-scale: 1.1;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: var(--text);
    background-color: var(--bg);
    padding: 20px;
}

header {
    background-color: var(--primary);
    color: white;
    padding: 16px;
    margin-bottom: 32px;
}

nav a {
    color: white;
    text-decoration: none;
    font-weight: bold;
}

h1 {
    color: var(--primary);
    margin-bottom: 24px;
}

h2 {
    margin-bottom: 16px;
}

/* Card Styles */
.card-section {
    margin-bottom: 32px;
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
}

.card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s ease-out;
}

.card:hover {
    transform: scale(var(--card-hover-scale));
    z-index: 1;
}

.card-image {
    width: 100%;
    height: auto;
    display: block;
}

.card-info {
    padding: 12px;
}

.card-count {
    font-weight: bold;
    margin-right: 4px;
}

.image-error {
    height: 280px;
    background: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    padding: 16px;
    text-align: center;
}

/* Deck Directory */
.deck-directory {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 24px;
}

.deck-card {
    display: block;
    text-decoration: none;
    color: inherit;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.deck-card:hover {
    transform: translateY(-8px);
}

.deck-thumbnail {
    height: 220px;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.deck-thumbnail img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.deck-info {
    padding: 16px;
}

.deck-validation {
    display: inline-block;
    background: var(--accent);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 14px;
    margin-top: 8px;
}

.validation-error {
    background: #ffebee;
    border-left: 4px solid var(--accent);
    color: #c62828;
    padding: 12px 16px;
    margin-bottom: 24px;
    border-radius: 4px;
}

/* Modal */
.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    overflow: auto;
}

.modal-content {
    position: relative;
    background-color: white;
    margin: 5% auto;
    padding: 20px;
    width: 80%;
    max-width: 600px;
    border-radius: 8px;
}

.modal-close {
    position: absolute;
    top: 8px;
    right: 16px;
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.modal-close:hover {
    color: black;
}

#modal-image {
    width: 100%;
    height: auto;
    display: block;
}

/* Responsive */
@media (max-width: 768px) {
    .card-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
    
    .modal-content {
        width: 90%;
        margin: 10% auto;
    }
}

```

# _site\assets\js\deck.js

```js
document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.modal-close');
    
    // Get all card elements
    const cards = document.querySelectorAll('.card');
    
    // Open modal with card image
    function openModal(imageUrl, cardName) {
        modalImg.src = imageUrl;
        modalImg.alt = cardName;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Add click listeners to cards
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const imageUrl = this.getAttribute('data-image');
            const cardName = this.getAttribute('data-name');
            openModal(imageUrl, cardName);
        });
    });
    
    // Close button click
    closeBtn.addEventListener('click', closeModal);
    
    // Click outside modal to close
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close with ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});

```

# _site\debug.html

```html
<!DOCTYPE html>
<html>
<head>
    <title>Debug Info</title>
    <style>
        body { font-family: monospace; padding: 20px; }
        h1 { color: #333; }
        pre { background: #f5f5f5; padding: 10px; border-radius: 5px; overflow: auto; }
        .card { margin-bottom: 10px; padding: 10px; border: 1px solid #ddd; }
    </style>
</head>
<body>
    <h1>Debug Information</h1>
    
    <h2>Available Decks</h2>
    <ul>
        
        <li>
            <strong>Dragapult</strong> - 
            <a href="/decks/dragapult/">/decks/dragapult/</a>
            (60 cards)
        </li>
        
        <li>
            <strong>Flareon</strong> - 
            <a href="/decks/flareon/">/decks/flareon/</a>
            (60 cards)
        </li>
        
    </ul>
    
    <h2>Collection Keys</h2>
    <ul>
        
        <li>all</li>
        
        <li>deckPages</li>
        
    </ul>
    
    <h2>Template Files</h2>
    <ul>
        <li>src/decks/index.njk → /decks/index.html</li>
        
        <li>src/templates/dragapult.njk → /decks/dragapult/index.html</li>
        
        <li>src/templates/flareon.njk → /decks/flareon/index.html</li>
        
    </ul>
</body>
</html>

```

# _site\decks\index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokémon Deck Directory</title>
    <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>
    <header>
        <nav>
            <a href="/decks/">Deck Directory</a>
        </nav>
    </header>
    
    <main>
        
<h1>Pokémon Deck Directory</h1>

<div class="deck-directory">
    
    <a href="/decks/dragapult/" class="deck-card">
        <div class="deck-thumbnail">
            <img 
                src="https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/tpci/PRE/PRE_073_R_EN_LG.png" 
                alt="Dragapult ex"
                loading="lazy"
                onerror="this.onerror=null; this.src=''; this.alt='Dragapult ex'; this.classList.add('image-error');"
            >
        </div>
        <div class="deck-info">
            <h2>Dragapult</h2>
            
        </div>
    </a>
    
    <a href="/decks/flareon/" class="deck-card">
        <div class="deck-thumbnail">
            <img 
                src="https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/tpci/PRE/PRE_014_R_EN_LG.png" 
                alt="Flareon ex"
                loading="lazy"
                onerror="this.onerror=null; this.src=''; this.alt='Flareon ex'; this.classList.add('image-error');"
            >
        </div>
        <div class="deck-info">
            <h2>Flareon</h2>
            
        </div>
    </a>
    
</div>

    </main>
    
    <footer>
        <p>Pokémon Deck Viewer</p>
    </footer>
    
    <div id="modal" class="modal">
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <img id="modal-image" src="" alt="Card">
        </div>
    </div>
    
    <script src="/assets/js/deck.js"></script>
</body>
</html>

```

# .eleventy.js

```js
module.exports = function(eleventyConfig) {
    // Copy assets to the root of _site
    eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
    
    // Add a filter to get object keys
    eleventyConfig.addFilter("keys", function(obj) {
        return Object.keys(obj);
    });
    
    // Create deck pages programmatically
    eleventyConfig.addCollection("deckPages", function(collectionApi) {
        console.log("\n=== GENERATING DECK PAGES ===");
        const decks = require("./src/_data/decks.js")();
        
        console.log(`Found ${Object.keys(decks).length} decks: ${Object.keys(decks).join(", ")}`);
        
        if (Object.keys(decks).length === 0) {
            console.error("ERROR: No decks found! Check your deck-files directory.");
            return [];
        }
        
        const pages = [];
        
        Object.keys(decks).forEach(deckName => {
            const permalink = `/decks/${deckName}/index.html`;
            console.log(`Creating page for deck: ${deckName} with permalink: ${permalink}`);
            
            pages.push({
                data: {
                    layout: "layouts/deck.njk",
                    title: `${decks[deckName].title} Deck`,
                    permalink: permalink,
                    deckName: deckName,
                    deck: decks[deckName]  // Pass the deck data directly
                }
            });
        });
        
        console.log(`Generated ${pages.length} deck pages`);
        console.log("=== END GENERATING DECK PAGES ===\n");
        
        return pages;
    });
    
    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
            data: "_data"
        },
        templateFormats: ["njk", "md", "html"],
        htmlTemplateEngine: "njk"
    };
};

```

# netlify.toml

```toml
[build]
  command = "npm run build"
  publish = "_site"

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404

```

# package.json

```json
{
    "name": "pokemon-deck-viewer",
    "version": "1.0.0",
    "description": "Static, interactive decklist viewer for Pokémon card decks",
    "scripts": {
        "build": "eleventy",
        "start": "eleventy --serve",
        "debug": "DEBUG=* eleventy"
    },
    "dependencies": {
        "@11ty/eleventy": "^2.0.1",
        "ai-digest": "^1.0.8"
    }
}

```

# src\_data\decks.js

```js
const fs = require('fs');
const path = require('path');

function parseDeckFile(filePath, fileName) {
    console.log(`\nParsing deck file: ${filePath}`);
    
    if (!fs.existsSync(filePath)) {
        console.error(`ERROR: Deck file not found: ${filePath}`);
        return null;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`File content length: ${content.length} characters`);
    
    const lines = content.split('\n').filter(line => line.trim());
    console.log(`Found ${lines.length} non-empty lines`);
    
    let cards = [];
    let currentSection = null;
    let thumbnailCard = null;
    
    lines.forEach((line, index) => {
        // Check if this is a section header
        if (line.trim() && !line.match(/^\*?\d+/)) {
            currentSection = line.trim();
            console.log(`Line ${index + 1}: Found section header: "${currentSection}"`);
            return;
        }
        
        // Parse card line
        const hasThumbnailMarker = line.startsWith('*');
        const cleanLine = hasThumbnailMarker ? line.substring(1).trim() : line.trim();
        
        // Extract card information
        const cardMatch = cleanLine.match(/^(\d+)\s+(.+?)\s+([A-Z0-9]+)\s+(\d+[A-Za-z]*)$/);
        
        if (cardMatch) {
            const [, count, name, set, number] = cardMatch;
            
            // Format the card number with leading zeros if it's numeric
            let formattedNumber = number;
            if (/^\d+$/.test(number)) {
                formattedNumber = number.padStart(3, '0');
            }
            
            console.log(`Line ${index + 1}: Card "${name}" (${set} ${number}) -> Formatted number: ${formattedNumber}`);
            
            const imageUrl = `https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/tpci/${set}/${set}_${formattedNumber}_R_EN_LG.png`;
            const thumbnailUrl = `https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/tpci/${set}/${set}_${formattedNumber}_R_EN_SM.png`;
            
            console.log(`Generated image URL: ${imageUrl}`);
            
            const card = {
                count: parseInt(count, 10),
                name,
                set,
                number: formattedNumber,
                section: currentSection,
                imageUrl,
                thumbnailUrl
            };
            
            cards.push(card);
            
            if (hasThumbnailMarker) {
                thumbnailCard = card;
                console.log(`Marked as thumbnail card: ${name}`);
            }
        } else {
            console.warn(`Line ${index + 1}: Could not parse card line: "${cleanLine}"`);
        }
    });
    
    // Calculate total cards
    const totalCards = cards.reduce((sum, card) => sum + card.count, 0);
    const isValid = totalCards === 60;
    
    console.log(`Total cards: ${totalCards} (${isValid ? 'valid' : 'INVALID'})`);
    
    if (!isValid) {
        console.warn(`WARNING: Deck "${fileName}" has ${totalCards} cards instead of the required 60.`);
    }
    
    if (!thumbnailCard && cards.length > 0) {
        console.warn(`WARNING: No thumbnail card marked in deck "${fileName}". Using first card as default.`);
        thumbnailCard = cards[0];
    } else if (!thumbnailCard) {
        console.error(`ERROR: No cards found in deck "${fileName}".`);
        return null;
    }
    
    // Group cards by section
    const cardsBySection = cards.reduce((acc, card) => {
        if (!acc[card.section]) {
            acc[card.section] = [];
        }
        acc[card.section].push(card);
        return acc;
    }, {});
    
    console.log(`Grouped cards into ${Object.keys(cardsBySection).length} sections`);
    Object.keys(cardsBySection).forEach(section => {
        console.log(`- ${section}: ${cardsBySection[section].length} unique cards (${cardsBySection[section].reduce((sum, card) => sum + card.count, 0)} total)`);
    });
    
    const result = {
        name: fileName.replace('.txt', ''),
        title: fileName.replace('.txt', '').charAt(0).toUpperCase() + fileName.replace('.txt', '').slice(1),
        cards,
        cardsBySection,
        totalCards,
        isValid,
        thumbnailCard
    };
    
    console.log(`Successfully parsed deck: ${result.title}`);
    return result;
}

module.exports = function() {
    console.log("\n=== LOADING DECK DATA ===");
    const deckDir = path.join(__dirname, '../deck-files');
    
    console.log(`Looking for deck files in: ${deckDir}`);
    
    if (!fs.existsSync(deckDir)) {
        console.error(`ERROR: Deck directory not found: ${deckDir}`);
        console.log("Creating deck directory...");
        try {
            fs.mkdirSync(deckDir, { recursive: true });
            console.log("Deck directory created successfully");
        } catch (err) {
            console.error(`Failed to create deck directory: ${err.message}`);
        }
        return {};
    }
    
    const deckFiles = fs.readdirSync(deckDir).filter(file => file.endsWith('.txt'));
    console.log(`Found ${deckFiles.length} deck files: ${deckFiles.join(", ")}`);
    
    const decks = {};
    
    deckFiles.forEach(file => {
        const filePath = path.join(deckDir, file);
        const deckName = file.replace('.txt', '');
        const deckData = parseDeckFile(filePath, file);
        
        if (deckData) {
            decks[deckName] = deckData;
        }
    });
    
    console.log(`Loaded ${Object.keys(decks).length} decks successfully`);
    console.log("=== END LOADING DECK DATA ===\n");
    
    return decks;
};

```

# src\_includes\layouts\base.njk

```njk
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }}</title>
    <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>
    <header>
        <nav>
            <a href="/decks/">Deck Directory</a>
        </nav>
    </header>
    
    <main>
        {{ content | safe }}
    </main>
    
    <footer>
        <p>Pokémon Deck Viewer</p>
    </footer>
    
    <div id="modal" class="modal">
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <img id="modal-image" src="" alt="Card">
        </div>
    </div>
    
    <script src="/assets/js/deck.js"></script>
</body>
</html>

```

# src\_includes\layouts\deck.njk

```njk
---
layout: layouts/base.njk
---

<h1>{{ title }}</h1>

{% if not deck.isValid %}
<div class="validation-error">
    This deck contains {{ deck.totalCards }} cards. A valid deck must contain exactly 60 cards.
</div>
{% endif %}

<div class="deck-container">
    {% for sectionName, sectionCards in deck.cardsBySection %}
    <section class="card-section">
        <h2>{{ sectionName }}</h2>
        <div class="card-grid">
            {% for card in sectionCards %}
            <div class="card-container">
                <div class="card" data-image="{{ card.imageUrl }}" data-name="{{ card.name }}">
                    <img 
                        src="{{ card.imageUrl }}" 
                        alt="{{ card.name }}" 
                        class="card-image"
                        loading="lazy"
                        onerror="this.onerror=null; this.src=''; this.alt='{{ card.name }}'; this.classList.add('image-error');"
                    >
                    <div class="card-info">
                        <span class="card-count">{{ card.count }}×</span>
                        <span class="card-name">{{ card.name }}</span>
                    </div>
                </div>
            </div>
            {% endfor %}
        </div>
    </section>
    {% endfor %}
</div>

```

# src\assets\css\styles.css

```css
/* Base Styles */
:root {
    --primary: #3d7dca;
    --secondary: #ffcb05;
    --accent: #ff5350;
    --text: #333;
    --bg: #f5f5f5;
    --card-hover-scale: 1.1;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: var(--text);
    background-color: var(--bg);
    padding: 20px;
}

header {
    background-color: var(--primary);
    color: white;
    padding: 16px;
    margin-bottom: 32px;
}

nav a {
    color: white;
    text-decoration: none;
    font-weight: bold;
}

h1 {
    color: var(--primary);
    margin-bottom: 24px;
}

h2 {
    margin-bottom: 16px;
}

/* Card Styles */
.card-section {
    margin-bottom: 32px;
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
}

.card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s ease-out;
}

.card:hover {
    transform: scale(var(--card-hover-scale));
    z-index: 1;
}

.card-image {
    width: 100%;
    height: auto;
    display: block;
}

.card-info {
    padding: 12px;
}

.card-count {
    font-weight: bold;
    margin-right: 4px;
}

.image-error {
    height: 280px;
    background: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    padding: 16px;
    text-align: center;
}

/* Deck Directory */
.deck-directory {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 24px;
}

.deck-card {
    display: block;
    text-decoration: none;
    color: inherit;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.deck-card:hover {
    transform: translateY(-8px);
}

.deck-thumbnail {
    height: 220px;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.deck-thumbnail img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.deck-info {
    padding: 16px;
}

.deck-validation {
    display: inline-block;
    background: var(--accent);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 14px;
    margin-top: 8px;
}

.validation-error {
    background: #ffebee;
    border-left: 4px solid var(--accent);
    color: #c62828;
    padding: 12px 16px;
    margin-bottom: 24px;
    border-radius: 4px;
}

/* Modal */
.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    overflow: auto;
}

.modal-content {
    position: relative;
    background-color: white;
    margin: 5% auto;
    padding: 20px;
    width: 80%;
    max-width: 600px;
    border-radius: 8px;
}

.modal-close {
    position: absolute;
    top: 8px;
    right: 16px;
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.modal-close:hover {
    color: black;
}

#modal-image {
    width: 100%;
    height: auto;
    display: block;
}

/* Responsive */
@media (max-width: 768px) {
    .card-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
    
    .modal-content {
        width: 90%;
        margin: 10% auto;
    }
}

```

# src\assets\js\deck.js

```js
document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.modal-close');
    
    // Get all card elements
    const cards = document.querySelectorAll('.card');
    
    // Open modal with card image
    function openModal(imageUrl, cardName) {
        modalImg.src = imageUrl;
        modalImg.alt = cardName;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Add click listeners to cards
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const imageUrl = this.getAttribute('data-image');
            const cardName = this.getAttribute('data-name');
            openModal(imageUrl, cardName);
        });
    });
    
    // Close button click
    closeBtn.addEventListener('click', closeModal);
    
    // Click outside modal to close
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close with ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});

```

# src\debug.njk

```njk
---
permalink: /debug.html
---
<!DOCTYPE html>
<html>
<head>
    <title>Debug Info</title>
    <style>
        body { font-family: monospace; padding: 20px; }
        h1 { color: #333; }
        pre { background: #f5f5f5; padding: 10px; border-radius: 5px; overflow: auto; }
        .card { margin-bottom: 10px; padding: 10px; border: 1px solid #ddd; }
    </style>
</head>
<body>
    <h1>Debug Information</h1>
    
    <h2>Available Decks</h2>
    <ul>
        {% for deckName, deckData in decks %}
        <li>
            <strong>{{ deckData.title }}</strong> - 
            <a href="/decks/{{ deckName }}/">/decks/{{ deckName }}/</a>
            ({{ deckData.totalCards }} cards)
        </li>
        {% endfor %}
    </ul>
    
    <h2>Collection Keys</h2>
    <ul>
        {% for key in collections | keys %}
        <li>{{ key }}</li>
        {% endfor %}
    </ul>
    
    <h2>Template Files</h2>
    <ul>
        <li>src/decks/index.njk → /decks/index.html</li>
        {% for deckName in decks | keys %}
        <li>src/templates/{{ deckName }}.njk → /decks/{{ deckName }}/index.html</li>
        {% endfor %}
    </ul>
</body>
</html>

```

# src\deck-files\dragapult.txt

```txt
Pokémon: 22
4 Drakloak PRE 72
4 Dreepy PRE 71
*3 Dragapult ex PRE 73
2 Dusknoir PRE 37
2 Duskull SFA 18
2 Pelipper PAL 159
2 Wingull PAL 158
1 Budew PRE 4
1 Dusclops PRE 36
1 Fezandipiti ex SFA 38

Trainer: 32
4 Arven OBF 186
2 Iono PAF 80
1 Boss's Orders PAL 172
1 Crispin PRE 105
1 Professor Turo's Scenario PRE 121
1 Professor's Research PRE 125
4 Buddy-Buddy Poffin PRE 101
3 Ultra Ball PAF 91
2 Counter Catcher PAR 160
2 Nest Ball PAF 84
2 Night Stretcher SFA 61
2 Rare Candy PAF 89
1 Earthen Vessel PRE 106
1 Super Rod PAL 188
1 Tera Orb SSP 189
1 Rescue Board PRE 126
1 Sparkling Crystal PRE 129
1 Technical Machine: Evolution PAR 178
1 Artazon PAF 76

Energy: 6
3 Basic Fire Energy SVE 2
3 Basic Psychic Energy SVE 5
```

# src\deck-files\flareon.txt

```txt
Pokémon: 23
4 Hoothoot SCR 114
4 Noctowl SCR 115
2 Eevee SSP 143
2 Eevee ex PRE 75
*2 Flareon ex PRE 14
2 Sylveon ex SSP 86
2 Fan Rotom SCR 118
1 Wellspring Mask Ogerpon ex TWM 64
1 Lillie's Clefairy ex SV9 33
1 Mew ex MEW 151
1 Latias ex SSP 76
1 Fezandipiti ex SFA 38

Trainer: 29
4 Crispin SCR 133
3 Boss's Orders PAL 172
2 Iono PAL 185
1 Briar SCR 132
1 Professor Turo's Scenario PRE 121
4 Ultra Ball SVI 196
4 Nest Ball SVI 181
2 Super Rod PAL 188
1 Buddy-Buddy Poffin TEF 144
1 Tera Orb SSP 189
1 Switch SVI 194
1 Counter Catcher PAR 160
1 Earthen Vessel PRE 106
1 Sparkling Crystal SCR 142
2 Area Zero Underdepths SCR 131

Energy: 8
2 Fire Energy SVE 10
2 Water Energy SVE 11
2 Lightning Energy SVE 12
2 Psychic Energy SVE 13
```

# src\decks\index.njk

```njk
---
layout: layouts/base.njk
title: Pokémon Deck Directory
permalink: /decks/index.html
---

<h1>Pokémon Deck Directory</h1>

<div class="deck-directory">
    {% for deckName, deckData in decks %}
    <a href="/decks/{{ deckName }}/" class="deck-card">
        <div class="deck-thumbnail">
            <img 
                src="{{ deckData.thumbnailCard.imageUrl }}" 
                alt="{{ deckData.thumbnailCard.name }}"
                loading="lazy"
                onerror="this.onerror=null; this.src=''; this.alt='{{ deckData.thumbnailCard.name }}'; this.classList.add('image-error');"
            >
        </div>
        <div class="deck-info">
            <h2>{{ deckData.title }}</h2>
            {% if not deckData.isValid %}
            <div class="deck-validation">
                Invalid: {{ deckData.totalCards }}/60 cards
            </div>
            {% endif %}
        </div>
    </a>
    {% endfor %}
</div>

```

