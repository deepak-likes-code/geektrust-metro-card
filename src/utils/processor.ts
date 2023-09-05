import fs from "fs";
import { InputType } from "../enums/enums";
import { balances, checkInDBList } from "./db";
import { updateCheckInDB, calculateFare } from "./functions";
import { collectedFareInterface } from "./interface";


export const processLine = (line: string) => {
    if (line.startsWith(InputType.BALANCE)) {
        const balance = line.split(' ');
        balances.set(balance[1], parseInt(balance[2]));
    } else if (line.startsWith(InputType.CHECK_IN)) {
        const checkIn = line.split(' ');
        updateCheckInDB(checkIn)
    } else if (line === InputType.PRINT_SUMMARY) {
        calculateFare();

    }
}

export const outputParser = (output: collectedFareInterface[]) => {
    let outputString = "";
    for (const item of output) {
        outputString += `TOTAL_COLLECTION ${item.destination} ${item.totalCollection} ${item.totalDiscountGiven}\n`;
        outputString += `PASSENGER_TYPE_SUMMARY\n`;


        // Looping through passengerCount to print the counts
        for (const passenger in item.passengerCount) {
            const passengerType = passenger as keyof typeof item.passengerCount;
            if (item.passengerCount[passengerType] && item.passengerCount[passengerType] > 0) { // Ensure the count is greater than 0
                outputString += `${passengerType} ${item.passengerCount[passengerType]}\n`;
            }
        }

    }
    console.log(outputString);
}



// find the id and all their trips


