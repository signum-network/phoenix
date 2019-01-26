import { BurstUtil } from "@burstjs/core"

/*
* Convert Burst Address back to account id
*/
export const getAccountIdFromBurstAddress = (address: string): string => {
    return BurstUtil.decode(address);
}
