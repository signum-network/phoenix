/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
var BN = require('bn.js');
var _1 = require(".");
var isValid_1 = require("./isValid");
/**
 * Decode BURST-XXXX-XXXX-XXXX-XXXXX into numeric Id
 * @param address The BURST address
 */
exports.decode = function (address) {
    // remove Burst prefix
    if (address.indexOf('BURST-') === 0) {
        address = address.substr(6);
    }
    else {
        return undefined;
    }
    var codeword = _1.initialCodeword.slice();
    var codewordLength = 0;
    for (var i = 0; i < address.length; i++) {
        var pos = _1.alphabet.indexOf(address.charAt(i));
        if (pos <= -1 || pos > _1.alphabet.length) {
            continue;
        }
        if (codewordLength > 16) {
            return undefined;
        }
        var codeworkIndex = _1.cwmap[codewordLength];
        codeword[codeworkIndex] = pos;
        codewordLength++;
    }
    if (!isValid_1.isValid(address)) {
        return undefined;
    }
    var length = _1.base32Length;
    var cypherString32 = [];
    for (var i = 0; i < length; i++) {
        cypherString32[i] = codeword[length - i - 1];
    }
    var out = '', newLength, digit10 = 0;
    do {
        newLength = 0;
        digit10 = 0;
        for (var i = 0; i < length; i++) {
            digit10 = digit10 * 32 + cypherString32[i];
            if (digit10 >= 10) {
                cypherString32[newLength] = Math.floor(digit10 / 10);
                digit10 %= 10;
                newLength += 1;
            }
            else if (newLength > 0) {
                cypherString32[newLength] = 0;
                newLength += 1;
            }
        }
        length = newLength;
        out += digit10;
    } while (length > 0);
    return new BN(out.split('').reverse().join('')).toString();
};
