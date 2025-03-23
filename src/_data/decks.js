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
    
    const lines = content.split('\n');
    console.log(`Found ${lines.length} lines`);
    
    // Extract metadata
    let deckName = fileName.replace('.txt', '');
    let deckTitle = deckName.charAt(0).toUpperCase() + deckName.slice(1);
    let deckDescription = '';
    let deckCreditName = '';
    let deckCreditUrl = '';
    let inDescription = false;
    let cardLines = [];
    let customImages = {};
    
    // Process metadata and separate card lines
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip empty lines
        if (!line) continue;

        // Check for metadata
        if (line.startsWith('Name:')) {
            deckTitle = line.substring(5).trim();
            continue;
        }
        
        if (line.startsWith('Description:')) {
            inDescription = true;
            // If there's text after "Description:", add it
            const descText = line.substring(12).trim();
            if (descText) {
                deckDescription = descText;
            }
            continue;
        }
        
        // Check for custom image definitions
        if (line.startsWith('Image:')) {
            const imageDef = line.substring(6).trim();
            const parts = imageDef.split('=');
            if (parts.length === 2) {
                const cardId = parts[0].trim();
                const imageUrl = parts[1].trim();
                customImages[cardId] = imageUrl;
                console.log(`Found custom image for ${cardId}: ${imageUrl}`);
            }
            continue;
        }

        if (line.startsWith('Credit:')) {
            const creditText = line.substring(7).trim();
            // Look for URL in parentheses
            const urlMatch = creditText.match(/\((https?:\/\/[^\s)]+)\)/);
            
            if (urlMatch) {
                deckCreditUrl = urlMatch[1];
                // Remove the URL part from the credit name
                deckCreditName = creditText.replace(/\s*\(https?:\/\/[^\s)]+\)\s*/, '').trim();
            } else {
                deckCreditName = creditText;
            }
            
            console.log(`Credit: ${deckCreditName} (${deckCreditUrl || 'no URL'})`);
            continue;
        }
        
        // If we're in description mode and line doesn't start a new section
        if (inDescription && !line.match(/^(Pokémon|Pokemon|Trainer|Energy|Image):/i)) {
            // If we hit a card line (starts with number), end description
            if (line.match(/^\*?\d+/)) {
                inDescription = false;
                cardLines.push(line);
            } else {
                // Add to description
                deckDescription += (deckDescription ? '\n' : '') + line;
                continue;
            }
        } else {
            // Not in description mode, must be a card line or section header
            if (!line.startsWith('Image:')) {
                inDescription = false;
                cardLines.push(line);
            }
        }
    }
    
    // Now parse the card lines
    let cards = [];
    let currentSection = null;
    let thumbnailCard = null;
    
    cardLines.forEach((line, index) => {
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
            
            // Create a card ID for custom image lookup
            const cardId = `${name} ${set} ${number}`.toLowerCase();
            
            // Default image URLs
            let imageUrl = `https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/tpci/${set}/${set}_${formattedNumber}_R_EN_LG.png`;
            let thumbnailUrl = `https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/tpci/${set}/${set}_${formattedNumber}_R_EN_SM.png`;
            
            // Check if we have a custom image for this card
            for (const [key, url] of Object.entries(customImages)) {
                if (cardId.includes(key.toLowerCase())) {
                    console.log(`Using custom image for "${name}": ${url}`);
                    imageUrl = url;
                    thumbnailUrl = url;
                    break;
                }
            }
            
            console.log(`Generated image URL: ${imageUrl}`);
            
            const card = {
                count: parseInt(count, 10),
                name,
                set,
                number: formattedNumber,
                section: currentSection,
                imageUrl,
                thumbnailUrl,
                originalLine: cleanLine,
                hasCustomImage: Object.entries(customImages).some(([key]) => cardId.includes(key.toLowerCase()))
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
    
    // Generate PTCGL format for copying
    const ptcglFormat = cards.map(card => `${card.count} ${card.name} ${card.set} ${card.number}`).join('\n');
    
    const result = {
        name: deckName,
        title: deckTitle,
        description: deckDescription,
        creditName: deckCreditName,
        creditUrl: deckCreditUrl,
        cards,
        cardsBySection,
        totalCards,
        isValid,
        thumbnailCard,
        ptcglFormat,
        customImages
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
