
export interface collectedFareInterface {
    destination: "AIRPORT" | "CENTRAL",
    totalCollection: number,
    totalDiscountGiven: number,
    passengerCount: {
        ADULT: number,
        SENIOR_CITIZEN: number,
        KID: number
    },
}