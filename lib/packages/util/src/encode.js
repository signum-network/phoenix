/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
var BN = require('bn.js');
var _1 = require(".");
/**
 * Encode a numeric id into BURST-XXXX-XXXX-XXXX-XXXXX
 * @param numericId The numeric Id
 */
exports.encode = function (numericId) {
    var plainString10 = [], codeword = _1.initialCodeword.slice();
    var pos = 0;
    var plainString = new BN(numericId).toString();
    var length = plainString.length;
    for (var i = 0; i < length; i++) {
        plainString10[i] = plainString.charCodeAt(i) - '0'.charCodeAt(0);
    }
    var digit32 = 0, newLength = 0;
    do {
        digit32 = 0;
        newLength = 0;
        for (var i = 0; i < length; i++) {
            digit32 = digit32 * 10 + plainString10[i];
            if (digit32 >= 32) {
                plainString10[newLength] = digit32 >> 5;
                digit32 &= 31;
                newLength++;
            }
            else if (newLength > 0) {
                plainString10[newLength] = 0;
                newLength++;
            }
        }
        length = newLength;
        codeword[pos] = digit32;
        pos++;
    } while (length > 0);
    var p = [0, 0, 0, 0];
    for (var i = _1.base32Length - 1; i >= 0; i--) {
        var fb = codeword[i] ^ p[3];
        p[3] = p[2] ^ _1.gmult(30, fb);
        p[2] = p[1] ^ _1.gmult(6, fb);
        p[1] = p[0] ^ _1.gmult(9, fb);
        p[0] = _1.gmult(17, fb);
    }
    codeword[13] = p[0];
    codeword[14] = p[1];
    codeword[15] = p[2];
    codeword[16] = p[3];
    var out = 'BURST-';
    for (var i = 0; i < 17; i++) {
        out += _1.alphabet[codeword[_1.cwmap[i]]];
        if ((i & 3) === 3 && i < 13) {
            out += '-';
        }
    }
    return out;
};
