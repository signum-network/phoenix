var b$util = (function (exports) {
    'use strict';

    var constructBurstAddress = function constructBurstAddress(parts) {
      return 'BURST-' + parts[0] + '-' + parts[1] + '-' + parts[2] + '-' + parts[3];
    };

    var convertNumberToNQTString = function convertNumberToNQTString(n) {
      if (n === undefined || n === null) {
        throw new Error('Invalid argument');
      }

      return parseFloat(n.toString()).toFixed(8).replace('.', '');
    };

    var convertNQTStringToNumber = function convertNQTStringToNumber(amount) {
      if (amount === undefined || amount === null || amount === '') {
        throw new Error('Invalid argument');
      }

      return parseFloat(amount) / 100000000;
    };

    var GenesisBlockTime = Date.UTC(2014, 7, 11, 2, 0, 0, 0) / 1000;
    var initialCodeword = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var gexp = [1, 2, 4, 8, 16, 5, 10, 20, 13, 26, 17, 7, 14, 28, 29, 31, 27, 19, 3, 6, 12, 24, 21, 15, 30, 25, 23, 11, 22, 9, 18, 1];
    var glog = [0, 0, 1, 18, 2, 5, 19, 11, 3, 29, 6, 27, 20, 8, 12, 23, 4, 10, 30, 17, 7, 22, 28, 26, 21, 25, 9, 16, 13, 14, 24, 15];
    var cwmap = [3, 2, 1, 0, 7, 6, 5, 4, 13, 14, 15, 16, 12, 8, 9, 10, 11];
    var alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'.split('');
    var base32Length = 13;
    var gmult = function gmult(a, b) {
      if (a === 0 || b === 0) {
        return 0;
      }

      var idx = (glog[a] + glog[b]) % 31;
      return gexp[idx];
    };

    var convertNumericIdToAddress = function convertNumericIdToAddress(numericId) {
      if (numericId === undefined || numericId === null || numericId.trim().length === 0) {
        return undefined;
      }

      var plainString10 = [],
          codeword = initialCodeword.slice();
      var pos = 0;
      var length = numericId.length;

      for (var i = 0; i < length; i++) {
        plainString10[i] = numericId.charCodeAt(i) - '0'.charCodeAt(0);
      }

      var digit32 = 0,
          newLength = 0;

      do {
        digit32 = 0;
        newLength = 0;

        for (var _i = 0; _i < length; _i++) {
          digit32 = digit32 * 10 + plainString10[_i];

          if (digit32 >= 32) {
            plainString10[newLength] = digit32 >> 5;
            digit32 &= 31;
            newLength++;
          } else if (newLength > 0) {
            plainString10[newLength] = 0;
            newLength++;
          }
        }

        length = newLength;
        codeword[pos] = digit32;
        pos++;
      } while (length > 0);

      var p = [0, 0, 0, 0];

      for (var _i2 = base32Length - 1; _i2 >= 0; _i2--) {
        var fb = codeword[_i2] ^ p[3];
        p[3] = p[2] ^ gmult(30, fb);
        p[2] = p[1] ^ gmult(6, fb);
        p[1] = p[0] ^ gmult(9, fb);
        p[0] = gmult(17, fb);
      }

      codeword[13] = p[0];
      codeword[14] = p[1];
      codeword[15] = p[2];
      codeword[16] = p[3];
      var out = 'BURST-';

      for (var _i3 = 0; _i3 < 17; _i3++) {
        out += alphabet[codeword[cwmap[_i3]]];

        if ((_i3 & 3) === 3 && _i3 < 13) {
          out += '-';
        }
      }

      return out;
    };

    var convertBurstTimeToEpochTime = function convertBurstTimeToEpochTime(burstTimestamp) {
      return (GenesisBlockTime + burstTimestamp) * 1000;
    };

    var convertBurstTimeToDate = function convertBurstTimeToDate(burstTimestamp) {
      return new Date(convertBurstTimeToEpochTime(burstTimestamp));
    };

    var convertDateToBurstTime = function convertDateToBurstTime(date) {
      return Math.round(date.getTime() / 1000) - GenesisBlockTime;
    };

    var isValid = function isValid(address) {
      if (address.indexOf('BURST-') === 0) {
        address = address.substr(6);
      }

      var codeword = initialCodeword.slice();
      var codewordLength = 0;

      for (var i = 0; i < address.length; i++) {
        var pos = alphabet.indexOf(address.charAt(i));

        if (pos <= -1 || pos > alphabet.length) {
          continue;
        }

        if (codewordLength > 16) {
          return false;
        }

        var codeworkIndex = cwmap[codewordLength];
        codeword[codeworkIndex] = pos;
        codewordLength++;
      }

      if (codewordLength !== 17) {
        return false;
      }

      var sum = 0;

      for (var _i = 1; _i < 5; _i++) {
        var t = 0;

        for (var j = 0; j < 31; j++) {
          if (j > 12 && j < 27) {
            continue;
          }

          var _pos = j;

          if (j > 26) {
            _pos -= 14;
          }

          t ^= gmult(codeword[_pos], gexp[_i * j % 31]);
        }

        sum |= t;
      }

      return sum === 0;
    };
    var isBurstAddress = function isBurstAddress(address) {
      return /^BURST\-[A-Z0-9]{4}\-[A-Z0-9]{4}\-[A-Z0-9]{4}\-[A-Z0-9]{5}/i.test(address) && isValid(address);
    };

    var convertAddressToNumericId = function convertAddressToNumericId(address) {
      if (address === undefined || address === null || address.trim().length === 0) {
        return undefined;
      }

      if (address.indexOf('BURST-') === 0) {
        address = address.substr(6);
      } else {
        return undefined;
      }

      var codeword = initialCodeword.slice();
      var codewordLength = 0;

      for (var i = 0; i < address.length; i++) {
        var pos = alphabet.indexOf(address.charAt(i));

        if (pos <= -1 || pos > alphabet.length) {
          continue;
        }

        if (codewordLength > 16) {
          return undefined;
        }

        var codeworkIndex = cwmap[codewordLength];
        codeword[codeworkIndex] = pos;
        codewordLength++;
      }

      if (!isValid(address)) {
        return undefined;
      }

      var length = base32Length;
      var cypherString32 = [];

      for (var _i = 0; _i < length; _i++) {
        cypherString32[_i] = codeword[length - _i - 1];
      }

      var out = '',
          newLength,
          digit10 = 0;

      do {
        newLength = 0;
        digit10 = 0;

        for (var _i2 = 0; _i2 < length; _i2++) {
          digit10 = digit10 * 32 + cypherString32[_i2];

          if (digit10 >= 10) {
            cypherString32[newLength] = Math.floor(digit10 / 10);
            digit10 %= 10;
            newLength += 1;
          } else if (newLength > 0) {
            cypherString32[newLength] = 0;
            newLength += 1;
          }
        }

        length = newLength;
        out += digit10;
      } while (length > 0);

      return out.split('').reverse().join('');
    };

    var splitBurstAddress = function splitBurstAddress(address) {
      var parts = address.split('-');
      parts.shift();

      if (parts.length === 4) {
        return parts;
      } else {
        return [];
      }
    };

    function sumNQTStringToNumber() {
      for (var _len = arguments.length, nqts = new Array(_len), _key = 0; _key < _len; _key++) {
        nqts[_key] = arguments[_key];
      }

      return nqts.reduce(function (sum, v) {
        return sum + convertNQTStringToNumber(v);
      }, 0);
    }

    var burstAddressPattern = {
      '_': {
        pattern: new RegExp('\[a-zA-Z0-9\]')
      }
    };

    exports.burstAddressPattern = burstAddressPattern;
    exports.constructBurstAddress = constructBurstAddress;
    exports.convertAddressToNumericId = convertAddressToNumericId;
    exports.convertBurstTimeToDate = convertBurstTimeToDate;
    exports.convertBurstTimeToEpochTime = convertBurstTimeToEpochTime;
    exports.convertDateToBurstTime = convertDateToBurstTime;
    exports.convertNQTStringToNumber = convertNQTStringToNumber;
    exports.convertNumberToNQTString = convertNumberToNQTString;
    exports.convertNumericIdToAddress = convertNumericIdToAddress;
    exports.isBurstAddress = isBurstAddress;
    exports.isValid = isValid;
    exports.splitBurstAddress = splitBurstAddress;
    exports.sumNQTStringToNumber = sumNQTStringToNumber;

    return exports;

}({}));
