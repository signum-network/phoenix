export declare class Converter {
    private static charToNibble;
    private static nibbleToChar;
    static initialize(): void;
    static convertHexStringToByteArray(hex: any): number[];
    static convertByteArrayToHexString(bytes: any): string;
    static convertStringToByteArray(str: any): any[];
    static convertStringToHexString(str: any): string;
    static convertHexStringToString(hex: any): string;
    static checkBytesToIntInput(bytes: any, numBytes: any, opt_startIndex: any): any;
    static convertByteArrayToSignedShort(bytes: any, opt_startIndex: any): any;
    static convertByteArrayToSignedInt32(bytes: any, opt_startIndex: any): any;
    static convertByteArrayToWordArray(ba: any): any;
    static convertWordToByteArray(word: any, length: any): any[];
    static convertWordArrayToByteArray(wordArray: any, length?: number): any[];
    static convertByteArrayToString(bytes: any, opt_startIndex?: number, length?: number): string;
    static convertByteArrayToShortArray(byteArray: any): number[];
    static convertShortArrayToByteArray(shortArray: any): number[];
    static convertShortArrayToHexString(ary: any): string;
    static convertWordArrayToUint8Array(wordArray: any): Uint8Array;
    static convertUint8ArrayToWordArray(u8Array: any): {
        sigBytes: number;
        words: any[];
    };
    static convertUint8ArrayToBinaryString(u8Array: any): string;
    static convertBinaryStringToUint8Array(bStr: any): Uint8Array;
    static intToBytes_(x: any, numBytes: any, unsignedMax: any, opt_bigEndian: any): any[];
    static int32ToBytes(x: any, opt_bigEndian: any): any[];
    static convertStringToBase64(text: string): string;
    static convertBase64ToString(base64: string): string;
}
