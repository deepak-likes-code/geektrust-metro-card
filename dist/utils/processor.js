"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputParser = exports.processLine = void 0;
const enums_1 = require("../types/enums");
const db_1 = require("./db");
const functions_1 = require("./functions");
const processLine = (line) => {
    if (line.startsWith(enums_1.InputType.BALANCE)) {
        const balance = line.split(' ');
        db_1.balances.set(balance[1], parseInt(balance[2]));
    }
    else if (line.startsWith(enums_1.InputType.CHECK_IN)) {
        const checkIn = line.split(' ');
        (0, functions_1.updateCheckInDB)(checkIn);
    }
    else if (line === enums_1.InputType.PRINT_SUMMARY) {
        (0, functions_1.calculateFare)();
    }
};
exports.processLine = processLine;
const outputParser = (output) => {
    let outputString = "";
    for (const item of output) {
        outputString += `TOTAL_COLLECTION ${item.destination} ${item.totalCollection} ${item.totalDiscountGiven}\n`;
        outputString += `PASSENGER_TYPE_SUMMARY\n`;
        // Looping through passengerCount to print the counts
        for (const passenger in item.passengerCount) {
            const passengerType = passenger;
            if (item.passengerCount[passengerType] && item.passengerCount[passengerType] > 0) { // Ensure the count is greater than 0
                outputString += `${passengerType} ${item.passengerCount[passengerType]}\n`;
            }
        }
    }
    console.log(outputString);
};
exports.outputParser = outputParser;
// find the id and all their trips
