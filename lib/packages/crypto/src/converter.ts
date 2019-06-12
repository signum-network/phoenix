/* tslint:disable */
/** @module crypto */
/** @ignore */ // internal - shouldn't be used externally

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

import * as CryptoJS from 'crypto-js';

declare function escape(s: string): string;
declare function unescape(s: string): string;


// FIXME: test coverage

/**
 * A set of useful converter methods for crypto operations.
 */
export class Converter {

    private static charToNibble: any = {};
    private static nibbleToChar: any = [];

    static initialize() {
        for (let i = 0; i <= 9; ++i) {
            let character = i.toString();
            Converter.charToNibble[character] = i;
            Converter.nibbleToChar.push(character);
        }

        for (let i = 10; i <= 15; ++i) {
            let lowerChar = String.fromCharCode('a'.charCodeAt(0) + i - 10);
            let upperChar = String.fromCharCode('A'.charCodeAt(0) + i - 10);

            Converter.charToNibble[lowerChar] = i;
            Converter.charToNibble[upperChar] = i;
            Converter.nibbleToChar.push(lowerChar);
        }
    }

    // @deprecated Use util.convertHexStringToByteArray instead
    public static convertHexStringToByteArray(hex): number[] {
        for (var bytes = [], c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substr(c, 2), 16));
        return bytes;
    }

    public static convertByteArrayToHexString(bytes) {
        for (var hex = [], i = 0; i < bytes.length; i++) {
            hex.push((bytes[i] >>> 4).toString(16));
            hex.push((bytes[i] & 0xF).toString(16));
        }
        return hex.join("");
    }

    public static convertStringToByteArray(str) {
        str = unescape(encodeURIComponent(str)); //temporary

        let bytes = new Array(str.length);
        for (let i = 0; i < str.length; ++i)
            bytes[i] = str.charCodeAt(i);

        return bytes;
    }

    public static convertStringToHexString(str) {
        return Converter.convertByteArrayToHexString(Converter.convertStringToByteArray(str));
    }

    public static convertHexStringToString(hex) {
        return Converter.convertByteArrayToString(Converter.convertHexStringToByteArray(hex));
    }

    public static checkBytesToIntInput(bytes, numBytes, opt_startIndex) {
        let startIndex = opt_startIndex || 0;
        if (startIndex < 0) {
            throw new Error('Start index should not be negative');
        }

        if (bytes.length < startIndex + numBytes) {
            throw new Error('Need at least ' + (numBytes) + ' bytes to convert to an integer');
        }
        return startIndex;
    }

    public static convertByteArrayToSignedShort(bytes, opt_startIndex) {
        let index = this.checkBytesToIntInput(bytes, 2, opt_startIndex);
        let value = bytes[index];
        value += bytes[index + 1] << 8;
        return value;
    }

    public static convertByteArrayToSignedInt32(bytes, opt_startIndex) {
        let value;
        let index = this.checkBytesToIntInput(bytes, 4, opt_startIndex);
        value = bytes[index];
        value += bytes[index + 1] << 8;
        value += bytes[index + 2] << 16;
        value += bytes[index + 3] << 24;
        return value;
    }

    public static convertByteArrayToWordArray(ba) {
        var wa = [],
            i;
        for (i = 0; i < ba.length; i++) {
            wa[(i / 4) | 0] |= ba[i] << (24 - 8 * i);
        }

        // @ts-ignore
        return CryptoJS.lib.WordArray.create(wa, ba.length);
    }

    public static convertWordToByteArray(word, length) {
        var ba = [],
            i,
            xFF = 0xFF;
        if (length > 0)
            ba.push(word >>> 24);
        if (length > 1)
            ba.push((word >>> 16) & xFF);
        if (length > 2)
            ba.push((word >>> 8) & xFF);
        if (length > 3)
            ba.push(word & xFF);

        return ba;
    }

    public static convertWordArrayToByteArray(wordArray, length = 0) {
        if (wordArray.hasOwnProperty("sigBytes") && wordArray.hasOwnProperty("words")) {
            length = wordArray.sigBytes;
            wordArray = wordArray.words;
        }

        let result: number[] = [],
            bytes,
            i = 0;
        while (length > 0) {
            bytes = Converter.convertWordToByteArray(wordArray[i], Math.min(4, length));
            length -= bytes.length;
            result.push(bytes);
            i++;
        }
        return [].concat.apply([], result);
    }

    public static convertByteArrayToString(bytes, opt_startIndex = 0, length = 0) {
        if (length == 0) {
            return "";
        }

        if (opt_startIndex && length) {
            let index = this.checkBytesToIntInput(bytes, parseInt(length.toString(), 10), parseInt(opt_startIndex.toString(), 10));

            bytes = bytes.slice(opt_startIndex, opt_startIndex + length);
        }

        return decodeURIComponent(escape(String.fromCharCode.apply(null, bytes)));
    }

    public static convertByteArrayToShortArray(byteArray) {
        let shortArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let i;
        for (i = 0; i < 16; i++) {
            shortArray[i] = byteArray[i * 2] | byteArray[i * 2 + 1] << 8;
        }
        return shortArray;
    }

    public static convertShortArrayToByteArray(shortArray) {
        let byteArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let i;
        for (i = 0; i < 16; i++) {
            byteArray[2 * i] = shortArray[i] & 0xff;
            byteArray[2 * i + 1] = shortArray[i] >> 8;
        }

        return byteArray;
    }

    public static convertShortArrayToHexString(ary) {
        let res = "";
        for (let i = 0; i < ary.length; i++) {
            res += Converter.nibbleToChar[(ary[i] >> 4) & 0x0f] + Converter.nibbleToChar[ary[i] & 0x0f] + Converter.nibbleToChar[(ary[i] >> 12) & 0x0f] + Converter.nibbleToChar[(ary[i] >> 8) & 0x0f];
        }
        return res;
    }

    // assumes wordArray is Big-Endian (because it comes from CryptoJS which is all BE)
    // From: https://gist.github.com/creationix/07856504cf4d5cede5f9#file-encode-js
    public static convertWordArrayToUint8Array(wordArray) {
        let len = wordArray.words.length,
            u8_array = new Uint8Array(len << 2),
            offset = 0, word, i
            ;
        for (i = 0; i < len; i++) {
            word = wordArray.words[i];
            u8_array[offset++] = word >> 24;
            u8_array[offset++] = (word >> 16) & 0xff;
            u8_array[offset++] = (word >> 8) & 0xff;
            u8_array[offset++] = word & 0xff;
        }
        return u8_array;
    }

    // create a wordArray that is Big-Endian (because it's used with CryptoJS which is all BE)
    // From: https://gist.github.com/creationix/07856504cf4d5cede5f9#file-encode-js
    public static convertUint8ArrayToWordArray(u8Array) {
        let words = [], i = 0, len = u8Array.length;

        while (i < len) {
            words.push(
                (u8Array[i++] << 24) |
                (u8Array[i++] << 16) |
                (u8Array[i++] << 8) |
                (u8Array[i++])
            );
        }

        return {
            sigBytes: words.length * 4,
            words: words
        };
    }

    public static convertUint8ArrayToBinaryString(u8Array) {
        let i, len = u8Array.length, b_str = "";
        for (i = 0; i < len; i++) {
            b_str += String.fromCharCode(u8Array[i]);
        }
        return b_str;
    }

    public static convertBinaryStringToUint8Array(bStr) {
        let i, len = bStr.length, u8_array = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            u8_array[i] = bStr.charCodeAt(i);
        }
        return u8_array;
    }

    /**
     * Produces an array of the specified number of bytes to represent the integer
     * value. Default output encodes ints in little endian format. Handles signed
     * as well as unsigned integers. Due to limitations in JavaScript's number
     * format, x cannot be a true 64 bit integer (8 bytes).
     */
    public static intToBytes_(x, numBytes, unsignedMax, opt_bigEndian) {
        let signedMax = Math.floor(unsignedMax / 2);
        let negativeMax = (signedMax + 1) * -1;
        if (x != Math.floor(x) || x < negativeMax || x > unsignedMax) {
            throw new Error(
                x + ' is not a ' + (numBytes * 8) + ' bit integer');
        }
        let bytes = [];
        let current;
        // Number type 0 is in the positive int range, 1 is larger than signed int,
        // and 2 is negative int.
        let numberType = x >= 0 && x <= signedMax ? 0 :
            x > signedMax && x <= unsignedMax ? 1 : 2;
        if (numberType == 2) {
            x = (x * -1) - 1;
        }
        for (let i = 0; i < numBytes; i++) {
            if (numberType == 2) {
                current = 255 - (x % 256);
            } else {
                current = x % 256;
            }

            if (opt_bigEndian) {
                bytes.unshift(current);
            } else {
                bytes.push(current);
            }

            if (numberType == 1) {
                x = Math.floor(x / 256);
            } else {
                x = x >> 8;
            }
        }
        return bytes;

    }

    public static int32ToBytes(x, opt_bigEndian) {
        return Converter.intToBytes_(x, 4, 4294967295, opt_bigEndian);
    }

    /**
     * Converts a string to base64
     * @param text The string to be converted
     * @return the converted base64 string
     */
    public static convertStringToBase64(text: string) : string{
        if (global && global.Buffer) {
            return new Buffer(text).toString('base64');
        }
        else {
            // @ts-ignore
            return btoa(text);
        }
    }

    /**
     * Converts a base64 string to clear text
     * @param base64 The base64 string to be converted
     * @return the clear text string
     */
    public static convertBase64ToString(base64: string): string{
        if (global && global.Buffer) {
            return new Buffer(base64, 'base64').toString();
        }
        else {
            // @ts-ignore
            return atob(base64)
        }
    }

}
