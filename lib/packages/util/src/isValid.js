/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
var _1 = require(".");
/**
 * Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)
 * @param address The address
 */
exports.isValid = function (address) {
    if (address.indexOf('BURST-') === 0) {
        address = address.substr(6);
    }
    var codeword = _1.initialCodeword.slice();
    var codewordLength = 0;
    for (var i = 0; i < address.length; i++) {
        var pos = _1.alphabet.indexOf(address.charAt(i));
        if (pos <= -1 || pos > _1.alphabet.length) {
            continue;
        }
        if (codewordLength > 16) {
            return false;
        }
        var codeworkIndex = _1.cwmap[codewordLength];
        codeword[codeworkIndex] = pos;
        codewordLength++;
    }
    if (codewordLength !== 17) {
        return false;
    }
    var sum = 0;
    for (var i = 1; i < 5; i++) {
        var t = 0;
        for (var j = 0; j < 31; j++) {
            if (j > 12 && j < 27) {
                continue;
            }
            var pos = j;
            if (j > 26) {
                pos -= 14;
            }
            t ^= _1.gmult(codeword[pos], _1.gexp[(i * j) % 31]);
        }
        sum |= t;
    }
    return (sum === 0);
};
