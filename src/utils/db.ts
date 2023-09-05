export const balances = new Map<string, number>();

type checkInDBType = {
    id: string, userType: string, destination: string[],
}

export const checkInDBList: checkInDBType[] = [];

