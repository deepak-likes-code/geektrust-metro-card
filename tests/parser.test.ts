import { processLine, outputParser } from "../src/utils/processor" // adjust the path accordingly
import { InputType } from "../src/types/enums";
import { balances, checkInDBList } from "../src/utils/db";
import { collectedFareInterface } from "../src/types/interface";
import { Console } from "console";


// Mock console.log
console.log = jest.fn();



describe("processLine", () => {
    beforeEach(() => {
        balances.clear(); // Ensure a fresh state for each test
    });

    it("should update balances", () => {
        processLine("BALANCE MC1 100");
        expect(balances.get("MC1")).toBe(100);
    });

    // You can add similar tests for CHECK_IN and PRINT_SUMMARY
});


describe.only("outputParser", () => {



    it("should generate the correct output string", () => {
        const mockData: collectedFareInterface[] = [
            {
                destination: 'AIRPORT',
                totalCollection: 252,
                totalDiscountGiven: 100,
                passengerCount: { ADULT: 1, SENIOR_CITIZEN: 1, KID: 1 }
            }
        ];

        outputParser(mockData);

        const expectedOutput = "TOTAL_COLLECTION AIRPORT 252 100\nPASSENGER_TYPE_SUMMARY\nADULT 1\nSENIOR_CITIZEN 1\nKID 1\n";
        expect(console.log).toHaveBeenCalledWith(expectedOutput);
    });
});