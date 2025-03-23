module.exports = function(eleventyConfig) {
    // Copy assets to the root of _site
    eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
    
    // Add a filter to get object keys
    eleventyConfig.addFilter("keys", function(obj) {
        return obj ? Object.keys(obj) : [];
    });
    
    // Add a filter to convert newlines to <br> tags
    eleventyConfig.addFilter("nl2br", function(str) {
        if (!str) return '';
        return str.replace(/\n/g, '<br>');
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
    
    // Configure BrowserSync
    eleventyConfig.setBrowserSyncConfig({
        server: {
            baseDir: "_site"
        },
        files: ["_site/**/*"]
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
