import { BurstUtil } from "./burstUtil";

/*
* Convert the account id to the appropriate Burst address
*/
export const getBurstAddressFromAccountId = (id: string): string => {
    return BurstUtil.encode(id);
};
