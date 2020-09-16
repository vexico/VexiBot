// Bowling Ball - modules/eco/GroupTransactions.js
// Written by Brendan Lane | http://git.imbl.me/brendanlane

// Import necessary modules
import axios from "axios";
import config from "../../config.js";

// Start of module

// Function to pay from the group which is marked as a payment
function groupPayEntityBySvid(toEntity, amount, auth) {
    // Call the base api + the correct route
    axios.get(`${config.base_api_url}/eco/SendTransactionByIDs`, {
        // Set parameters
        params: {
            from: config.default_group_svid,
            to: toEntity,
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

// Function to pay from the group which is marked as a sale
function groupMakeSaleToEntity(toEntity, amount, auth) {
    // Call the base api + the correct route
    axios.get(`${config.base_api_url}/eco/SendTransactionByIDs`, {
        // Set parameters
        params: {
            from: config.default_group_svid,
            to: toEntity,
            amount: amount,
            auth: auth,
            detail: "sale"
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
    groupPayEntityBySvid,
    groupMakeSaleToEntity
};