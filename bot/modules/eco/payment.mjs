// Bowling Ball - modules/eco/payment.js
// Written by: Brendan Lane | https://github.com/brendan-lane

// Import necessary files
import spookvooperapi from "spookvooperapi";

// Define variables
let toUser;
let fromUser;
let toGroup;
let toSvid;

// Getter function
function get(sc) {
    switch (sc) {
        case "toUser":
            return toUser;

        case "fromUser":
            return fromUser;
        
        case "toGroup":
            return toGroup;

        case "toSvid":
            return toSvid;

        default:
            console.error("[Bowling Ball] Error: No get() switch case set!");
            return "Error";
    }
}

// Setter Function
function set(sc, value) {
    if (value === undefined) {
        console.log("[Bowling Ball] Error: No set() value set!")
        return "Error"
    } else {
        switch (sc) {
            case "toUser":
                toUser = value;
                return true;
    
            case "fromUser":
                fromUser = value;
                return true;
            
            case "toGroup":
                toGroup = value;
                return true;
    
            default:
                console.error("[Bowling Ball] Error: No set() switch case set!");
                return "Error";
        }
    }
}

function reset() {
    toGroup = undefined;
    toUser = undefined;
    toSvid = undefined;
    fromUser = undefined;
}

function execPayment(amount) {
	if (toUser === undefined && toGroup !== undefined) {
		toSvid = toGroup;
	} else if (toUser !== undefined && toGroup === undefined) {
		toSvid = toUser;
	} else {
		console.error("[Bowling Ball] Error: Something has gone catastrophically wrong. Please open an issue on GitHub.");
		return "Error"
    }
    
    return new Promise((resolve, reject) => {
        spookvooperapi.eco.sendTransactionByIDs(toSvid, fromUser, amount, "api key", `Transaction of ${amount} fulfilled by Bowling Ball`, false)
            .then(function () {
                resolve(0);
            })
            .catch(function () {
                reject(1);
            })
    });
}

// Export
export {
    get,
    set,
    execPayment,
    reset
}
