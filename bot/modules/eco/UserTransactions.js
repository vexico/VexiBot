// Bowling Ball - modules/eco/UserTransactions.js
// Written by Brendan Lane | http://git.imbl.me/brendanlane

// Import necessary modules
import axios from "axios";
import config from "../../config.js";
import secret_store from "../../secret_store.js";

// Start of module

// Pay from a user to an entity with a payment
function payEntity(from, to, amount, auth) {
    // Call the base api + the correct route
    axios.get(`${config.base_api_url}/eco/SendTransactionByIDs`, {
        // Set parameters
        params: {
            from: from,
            to: to,
            amount: amount,
            auth: auth,
            detail: "payment"
        }
    })
    // Handle success + errors
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error;
        });
}

// Export necessary functions
export {
    payEntity
};
