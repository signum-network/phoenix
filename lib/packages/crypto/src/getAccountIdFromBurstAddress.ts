import { BurstUtil } from "@burst/core"

/*
* Convert Burst Address back to account id
*/
export const getAccountIdFromBurstAddress = (address: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        // TODO: refactor shitty nxt address resolution
        resolve(BurstUtil.decode(address));
    });
}