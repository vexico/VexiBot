// Bowling Ball - modules/eco/GroupTransactions.js
// Written by Brendan Lane | http://git.imbl.me/brendanlane

// Import necessary modules
import axios from "axios";
import config from "../../config.js";
import secret_store from "../../secret_store.js";

// Start of module
function groupPayEntityBySvid(toEntity, amount) {
    axios.get(`${config.base_api_url}/eco/SendTransactionByIDs`, {
        params: {
            from: config.default_group_svid,
            to: toEntity,
            amount: amount,
            auth: secret_store.api_key,
            detail: "payment"
        }
    })
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error;
        });
}

function groupMakeSaleToEntity(toEntity, amount) {
    axios.get(`${config.base_api_url}/eco/SendTransactionByIDs`, {
        params: {
            from: config.default_group_svid,
            to: toEntity,
            amount: amount,
            auth: secret_store.api_key,
            detail: "sale"
        }
    })
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