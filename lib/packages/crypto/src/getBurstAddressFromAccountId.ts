import { encode } from "@burstjs/util";

/*
* Convert the account id to the appropriate Burst address
*/
export const getBurstAddressFromAccountId = (id: string): string => {
    return encode(id);
};
