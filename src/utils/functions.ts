import { checkInDBList, balances } from "./db";
import { collectedFareInterface } from "../types/interface";
import { outputParser } from "./processor";

export const updateCheckInDB = ((checkIn: string[]) => {
    if (checkInDBList.find((item) => item.id === checkIn[1])) {
        const index = checkInDBList.findIndex((item) => item.id === checkIn[1]);
        checkInDBList[index].destination.push(checkIn[3]);
    } else {

        checkInDBList.push({ id: checkIn[1], userType: checkIn[2], destination: [checkIn[3]] });
    }
})


// ticket prices
const ticketPrices = {
    "ADULT": 200,
    "SENIOR_CITIZEN": 100,
    "KID": 50
}



const collectedFare: collectedFareInterface[] = [
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
]


export const calculateFare = (): collectedFareInterface[] => {
    for (const item of checkInDBList) {
        const ticketType = item.userType as keyof typeof ticketPrices;
        let count = 0
        for (const destination of item.destination) {
            count++;
            if (collectedFare.find((item) => item.destination === destination)) {
                const index = collectedFare.findIndex((item) => item.destination === destination);
                if (count % 2 === 0) {

                    const balanceAmount = userDebit(item.id, ticketPrices[ticketType] / 2)
                    balanceAmount == 0 ? collectedFare[index].totalCollection += (ticketPrices[ticketType] / 2) : collectedFare[index].totalCollection += (ticketPrices[ticketType] / 2 + 0.02 * balanceAmount);

                    collectedFare[index].totalDiscountGiven += ticketPrices[ticketType] / 2;

                } else {
                    // debit the amount
                    const balanceAmount = userDebit(item.id, ticketPrices[ticketType])
                    balanceAmount == 0 ? collectedFare[index].totalCollection += ticketPrices[ticketType] : collectedFare[index].totalCollection += (ticketPrices[ticketType] + 0.02 * balanceAmount);


                }
                collectedFare[index].passengerCount[ticketType] += 1;
            }

        }
    }
    outputParser(collectedFare);
    return collectedFare;
}

const userDebit = (id: string, amount: number): number => {
    const balance = balances.get(id);
    if (balance !== undefined) {
        if (balance >= amount) {
            balances.set(id, balance - amount);
            return 0
        } else {
            // console.log(`Insufficient balance for user ${id}`);
            balances.set(id, 0);
            return amount - balance;
        }

    } else {
        console.log(`User ${id} not found`);
        return 0;
    }
}


