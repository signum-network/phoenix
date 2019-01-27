import { BurstUtil } from "./burstUtil"

/*
* Convert Burst Address back to account id
*/
export const getAccountIdFromBurstAddress = (address: string): string => {
    return BurstUtil.decode(address);
}
