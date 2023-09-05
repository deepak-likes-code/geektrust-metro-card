"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateFare = exports.updateCheckInDB = void 0;
const db_1 = require("./db");
const processor_1 = require("./processor");
exports.updateCheckInDB = ((checkIn) => {
    if (db_1.checkInDBList.find((item) => item.id === checkIn[1])) {
        const index = db_1.checkInDBList.findIndex((item) => item.id === checkIn[1]);
        db_1.checkInDBList[index].destination.push(checkIn[3]);
    }
    else {
        db_1.checkInDBList.push({ id: checkIn[1], userType: checkIn[2], destination: [checkIn[3]] });
    }
});
// ticket prices
const ticketPrices = {
    "ADULT": 200,
    "SENIOR_CITIZEN": 100,
    "KID": 50
};
const collectedFare = [
    {
        destination: "AIRPORT",
        totalCollection: 0,
        totalDiscountGiven: 0,
        passengerCount: {
            ADULT: 0,
            SENIOR_CITIZEN: 0,
            KID: 0
        }
    },
    {
        destination: "CENTRAL",
        totalCollection: 0,
        totalDiscountGiven: 0,
        passengerCount: {
            ADULT: 0,
            SENIOR_CITIZEN: 0,
            KID: 0
        }
    }
];
const calculateFare = () => {
    for (const item of db_1.checkInDBList) {
        const ticketType = item.userType;
        let count = 0;
        for (const destination of item.destination) {
            count++;
            if (collectedFare.find((item) => item.destination === destination)) {
                const index = collectedFare.findIndex((item) => item.destination === destination);
                if (count % 2 === 0) {
                    const balanceAmount = userDebit(item.id, ticketPrices[ticketType] / 2);
                    balanceAmount == 0 ? collectedFare[index].totalCollection += (ticketPrices[ticketType] / 2) : collectedFare[index].totalCollection += (ticketPrices[ticketType] / 2 + 0.02 * balanceAmount);
                    collectedFare[index].totalDiscountGiven += ticketPrices[ticketType] / 2;
                }
                else {
                    // debit the amount
                    const balanceAmount = userDebit(item.id, ticketPrices[ticketType]);
                    balanceAmount == 0 ? collectedFare[index].totalCollection += ticketPrices[ticketType] : collectedFare[index].totalCollection += (ticketPrices[ticketType] + 0.02 * balanceAmount);
                }
                collectedFare[index].passengerCount[ticketType] += 1;
            }
        }
    }
    (0, processor_1.outputParser)(collectedFare);
    return collectedFare;
};
exports.calculateFare = calculateFare;
const userDebit = (id, amount) => {
    const balance = db_1.balances.get(id);
    if (balance !== undefined) {
        if (balance >= amount) {
            db_1.balances.set(id, balance - amount);
            return 0;
        }
        else {
            // console.log(`Insufficient balance for user ${id}`);
            db_1.balances.set(id, 0);
            return amount - balance;
        }
    }
    else {
        console.log(`User ${id} not found`);
        return 0;
    }
};
