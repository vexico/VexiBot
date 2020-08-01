// Bowling Ball - modules/utils/SpikeViperConvert.js
// Written by Brendan Lane | http://git.imbl.me/brendanlane

// Import necessary modules
import axios from "axios";
import config from "../../config.js";

// Starting variables
var returnedError = 0;

// Start of module
function convertUser(type, method, input) {
    if (type == "svid") {
        if (method == "discord") {
            axios.get(`${config.base_api_url}/user/GetSVIDFromDiscord?discordid=${input}`)
                .then(function (response) {
                    returnedError = false;
                    return response.data;
                })
                .catch(function (error) {
                    returnedError = true;
                    return error;
                });
        } else if (method == "username") {
            axios.get(`${config.base_api_url}/user/GetSVIDFromUsername?username=${input}`)
                .then(function (response) {
                    returnedError = false;
                    return response.data;
                })
                .catch(function (error) {
                    returnedError = true;
                    return error;
                });
        } else if (method == "minecraft") {
            axios.get(`${config.base_api_url}/user/GetSVIDFromMinecraft?minecraftid=${input}`)
                .then(function (response) {
                    returnedError = false;
                    return response.data;
                })
                .catch(function (error) {
                    returnedError = true;
                    return error;
                });
        } else {
            return "This is not a valid method!";
        }
    } else if (type == "username") {
        if (method == "svid") {
            axios.get(`${config.base_api_url}/user/GetUsername?svid=${input}`)
                .then(function (response) {
                    returnedError = false;
                    return response.data;
                })
                .catch(function (error) {
                    returnedError = true;
                    return error;
                });
        } else if (method == "discord") {
            axios.get(`${config.base_api_url}/user/GetUsernameFromDiscord?discordid=${input}`)
                .then(function (response) {
                    returnedError = false;
                    return response.data;
                })
                .catch(function (error) {
                    returnedError = true;
                    return error;
                });
        } else if (method == "minecraft") {
            axios.get(`${config.base_api_url}/user/GetUsernameFromMinecraft?minecraftid=${input}`)
                .then(function (response) {
                    returnedError = false;
                    return response.data;
                })
                .catch(function (error) {
                    returnedError = true;
                    return error;
                });
        } else {
            return "That is not a valid method!";
        }
    } else {
        return "That is not a valid type!";
    }
}

function convertGroup(type, imput) {
    if (type == "svid") {
        axios.get(`${config.base_api_url}/group/GetSVIDFromName?name=${input}`)
            .then(function (response) {
                returnedError = false;
                return response.data;
            })
            .catch(function (error) {
                returnedError = true;
                return error;
            });
    } else if (type == "name") {
        axios.get(`${config.base_api_url}/group/GetName?svid=${input}`)
            .then(function (response) {
                returnedError = false;
                return response.data;
            })
            .catch(function (error) {
                returnedError = true;
                return error;
            });
    } else {
        return "That is not a valid type!";
    }
}

// Export necessary functions
export {
    convertUser,
    convertGroup,
    returnedError
};