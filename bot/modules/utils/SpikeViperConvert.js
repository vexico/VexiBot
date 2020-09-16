// Bowling Ball - modules/utils/SpikeViperConvert.js
// Written by Brendan Lane | http://git.imbl.me/brendanlane

// Import necessary modules
import axios from "axios";
import config from "../../config.js";
import { removeQuotes } from "./ApiQuoteRemover.js";

// Starting variables
var returnedError = 0;

// Start of module
function convertUser(type, method, input) {
    if (type == "svid") {
        if (method == "discord") {
            // Make a request to the api + the correct route
            axios.get(`${config.base_api_url}/user/GetSVIDFromDiscord`, {
                params: {
                    discordid: removeQuotes(input)
                }
            })
                // Handle error + correct repsonse
                .then(function (response) {
                    returnedError = false;
                    return response.data;
                })
                .catch(function (error) {
                    returnedError = true;
                    return error;
                });
        } else if (method == "username") {
            // Make a request to the api + the correct route + parameters
            axios.get(`${config.base_api_url}/user/GetSVIDFromUsername`, {
                params: {
                    username: lonr
                }
            })
                // Handle error + correct repsonse
                .then(function (response) {
                    returnedError = false;
                    return response.data;
                })
                .catch(function (error) {
                    returnedError = true;
                    return error;
                });
        } else if (method == "minecraft") {
            // Make a request to the api + the correct route + parameters
            axios.get(`${config.base_api_url}/user/GetSVIDFromMinecraft`, {
                params: {
                    minecraftid: removeQuotes(input)
                }
            })
                // Handle error + correct repsonse
                .then(function (response) {
                    returnedError = false;
                    return response.data;
                })
                .catch(function (error) {
                    returnedError = true;
                    return error;
                });
        } else {
            // Return error
            return "This is not a valid method!";
        }
    } else if (type == "username") {
        if (method == "svid") {
            // Make a request to the api + the correct route + parameters
            axios.get(`${config.base_api_url}/user/GetUsername`, {
                params: {
                    svid: removeQuotes(input)
                }
            })
                // Handle error + correct repsonse
                .then(function (response) {
                    returnedError = false;
                    return response.data;
                })
                .catch(function (error) {
                    returnedError = true;
                    return error;
                });
        } else if (method == "discord") {
            // Make a request to the api + the correct route + parameters
            axios.get(`${config.base_api_url}/user/GetUsernameFromDiscord`, {
                params: {
                    discordid: removeQuotes(input)
                }
            })
                // Handle error + correct repsonse
                .then(function (response) {
                    returnedError = false;
                    return response.data;
                })
                .catch(function (error) {
                    returnedError = true;
                    return error;
                });
        } else if (method == "minecraft") {
            // Make a request to the api + the correct route + parameters
            axios.get(`${config.base_api_url}/user/GetUsernameFromMinecraft`, {
                params: {
                    minecraftid: removeQuotes(input)
                }
            })
                // Handle error + correct repsonse
                .then(function (response) {
                    returnedError = false;
                    return response.data;
                })
                .catch(function (error) {
                    returnedError = true;
                    return error;
                });
        } else {
            // Return error
            return "That is not a valid method!";
        }
    } else {
        // Return error
        return "That is not a valid type!";
    }
}

function convertGroup(type, input) {
    if (type == "svid") {
        // Make a request to the api + the correct route + parameters
        axios.get(`${config.base_api_url}/group/GetSVIDFromName`, {
            params: {
                name: removeQuotes(input)
            }
        })
            // Handle error + correct repsonse
            .then(function (response) {
                returnedError = false;
                return response.data;
            })
            .catch(function (error) {
                returnedError = true;
                return error;
            });
    } else if (type == "name") {
        // Make a request to the api + the correct route + parameters
        axios.get(`${config.base_api_url}/group/GetName`, {
            params: {
                svid: removeQuotes(input)
            }
        })
            // Handle error + correct repsonse
            .then(function (response) {
                returnedError = false;
                return response.data;
            })
            .catch(function (error) {
                returnedError = true;
                return error;
            });
    } else {
        // Return error
        return "That is not a valid type!";
    }
}

// Export necessary functions
export {
    convertUser,
    convertGroup,
    returnedError
};
