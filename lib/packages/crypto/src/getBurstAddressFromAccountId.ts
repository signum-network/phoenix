import { BurstUtil } from "@burst/core";

/*
* Convert the account id to the appropriate Burst address
*/
export const getBurstAddressFromAccountId = (id: string): string => {
    return BurstUtil.encode(id);
}