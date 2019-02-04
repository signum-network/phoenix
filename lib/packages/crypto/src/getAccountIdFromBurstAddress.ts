import { decode } from "@burstjs/util"

/*
* Convert Burst Address back to account id
*/
export const getAccountIdFromBurstAddress = (address: string): string => {
    return decode(address);
}
