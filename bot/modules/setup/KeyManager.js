// Bowling Ball - modules/setup/KeyManager.js
// Written by Brendan Lane | http://git.imbl.me/brendanlane

// Import necessary modules
import { keys } from "../../api_keys.js";
import config from "../../config.js";
import secret_store from "../../secret_store.js";

// Start of code

// Function to add a key to add 
function addKey(idToAdd, keyToAdd) {
    // Push key and discord id of author to the array
    keys.push({ discordid: `${idToAdd}`, key: `${keyToAdd}` });
    // Return true for parsing
    return true;
}

// Function to find an api key by a discord id
function findKey(idToLookup) {
    // Variable to store found element
    var found = keys.find(element => element = idToLookup);
    // Catch any error with looking up the key
    try {
        // If found, return the key
        return found.key;
    } catch (error) {
        // If not found, return an error
        return "KeyNotFound";
    }
}

// Export functions
export {
    addKey,
    findKey
};
