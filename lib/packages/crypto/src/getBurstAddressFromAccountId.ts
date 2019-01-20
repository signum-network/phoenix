import { BurstUtil } from "@burst/core";

/*
* Convert the account id to the appropriate Burst address
*/
export const getBurstAddressFromAccountId = (id: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        resolve(BurstUtil.encode(id));
    });
}