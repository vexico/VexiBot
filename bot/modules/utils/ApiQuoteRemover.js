// Bowling Ball - modules/utils/ApiQuoteRemover.js
// Written by Brendan Lane | http://git.imbl.me/brendanlane

// Start of module
function removeQuotes(input) {
    var strToRemove = input;
    var strRemoved = strToRemove.replace(/['"`]+/g, '');
    return strRemoved;
}

// Export necessary items
export {
    removeQuotes
};