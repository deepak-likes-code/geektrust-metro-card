import { updateCheckInDB, calculateFare } from "../src/utils/functions"
import { checkInDBList, balances } from "../src/utils/db";

describe("Metro Card System", () => {

    beforeEach(() => {
        // reset the db list and balances before each test
        checkInDBList.length = 0;
        balances.clear();
    });

    test("updateCheckInDB should add new user to db", () => {
        updateCheckInDB(["CHECK_IN", "MC1", "ADULT", "AIRPORT"]);
        expect(checkInDBList).toHaveLength(1);
        expect(checkInDBList[0].id).toBe("MC1");
        expect(checkInDBList[0].userType).toBe("ADULT");
        expect(checkInDBList[0].destination).toEqual(["AIRPORT"]);
    });

    test("calculateFare should update collected fare", () => {
        balances.set("MC1", 500);
        updateCheckInDB(["CHECK_IN", "MC1", "ADULT", "AIRPORT"]);
        const fareData = calculateFare();
        expect(fareData[0].totalCollection).toBeGreaterThan(0);  // Assuming "AIRPORT" is at index 0
        expect(fareData[0].passengerCount.ADULT).toBe(1);
    });

    // ... you can add more test cases for different scenarios, for example, insufficient balances, multiple check-ins, etc.
});
