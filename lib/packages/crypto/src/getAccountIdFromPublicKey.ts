
import { Converter } from "./converter";
import * as CryptoJS from "crypto-js";
import * as BN from "bn.js";


/*
* Convert hex string of the public key to the account id
*/
export const getAccountIdFromPublicKey = (publicKey: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        // hash with SHA 256
        let hash = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(publicKey));
        let bytes = Converter.convertWordArrayToByteArray(hash);
        // slice away first 8 bytes of SHA256 string
        let slice = bytes.slice(0, 8);
        // order it from lowest bit to highest / little-endian first / reverse
        slice = slice.reverse();
        // convert each byte into a number with radix 10
        let numbers = slice.map((byte:Number) => byte.toString(10));
        // create a biginteger based on the reversed byte/number array
        let id = new BN(numbers, 256); // base 256 for byte
        resolve(id.toString()); // return big integer in string
    });
}