/* tslint:disable */

var zeros = [
    '',
    '0',
    '00',
    '000',
    '0000',
    '00000',
    '000000',
    '0000000',
    '00000000',
    '000000000',
    '0000000000',
    '00000000000',
    '000000000000',
    '0000000000000',
    '00000000000000',
    '000000000000000',
    '0000000000000000',
    '00000000000000000',
    '000000000000000000',
    '0000000000000000000',
    '00000000000000000000',
    '000000000000000000000',
    '0000000000000000000000',
    '00000000000000000000000',
    '000000000000000000000000',
    '0000000000000000000000000'
];

var groupSizes = [
    0, 0,
    25, 16, 12, 11, 10, 9, 8,
    8, 7, 7, 7, 7, 6, 6,
    6, 6, 6, 6, 6, 5, 5,
    5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5
];

var groupBases = [
    0, 0,
    33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
    43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
    16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
    6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
    24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
];

// Utils
function assert (val, msg = 'Assertion failed') {
    if (!val) throw new Error(msg);
}

export class BigNumber{
    negative = 0;
    words = null;
    length = 0;
    // Reduction context
    red = null;


    constructor(number, base, endian = 'be'){

        if (number !== null) {
            if (base === 'le' || base === 'be') {
                endian = base;
                base = 10;
            }

            this._init(number || 0, base || 10, endian || 'be');
        }

    }

    _init (number, base, endian) {
        if (typeof number === 'number') {
            return this._initNumber(number, base, endian);
        }

        if (typeof number === 'object') {
            return this._initArray(number, base, endian);
        }

        if (base === 'hex') {
            base = 16;
        }
        assert(base === (base | 0) && base >= 2 && base <= 36);

        number = number.toString().replace(/\s+/g, '');
        var start = 0;
        if (number[0] === '-') {
            start++;
        }

        if (base === 16) {
            this._parseHex(number, start);
        } else {
            this._parseBase(number, base, start);
        }

        if (number[0] === '-') {
            this.negative = 1;
        }

        this.strip();

        if (endian !== 'le') return;

        this._initArray(this.toArray(), base, endian);
    };

    _initNumber (number, base, endian) {
        if (number < 0) {
            this.negative = 1;
            number = -number;
        }
        if (number < 0x4000000) {
            this.words = [ number & 0x3ffffff ];
            this.length = 1;
        } else if (number < 0x10000000000000) {
            this.words = [
                number & 0x3ffffff,
                (number / 0x4000000) & 0x3ffffff
            ];
            this.length = 2;
        } else {
            assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)
            this.words = [
                number & 0x3ffffff,
                (number / 0x4000000) & 0x3ffffff,
                1
            ];
            this.length = 3;
        }

        if (endian !== 'le') return;

        // Reverse the bytes
        this._initArray(this.toArray(), base, endian);
    };

    _initArray (number, base, endian) {
        // Perhaps a Uint8Array
        assert(typeof number.length === 'number');
        if (number.length <= 0) {
            this.words = [ 0 ];
            this.length = 1;
            return this;
        }

        this.length = Math.ceil(number.length / 3);
        this.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
            this.words[i] = 0;
        }

        var j, w;
        var off = 0;
        if (endian === 'be') {
            for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
                w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
                this.words[j] |= (w << off) & 0x3ffffff;
                this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
                off += 24;
                if (off >= 26) {
                    off -= 26;
                    j++;
                }
            }
        } else if (endian === 'le') {
            for (i = 0, j = 0; i < number.length; i += 3) {
                w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
                this.words[j] |= (w << off) & 0x3ffffff;
                this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
                off += 24;
                if (off >= 26) {
                    off -= 26;
                    j++;
                }
            }
        }
        return this.strip();
    };

    strip () {
        while (this.length > 1 && this.words[this.length - 1] === 0) {
            this.length--;
        }
        return this._normSign();
    };

    _normSign () {
        // -0 = 0
        if (this.length === 1 && this.words[0] === 0) {
            this.negative = 0;
        }
        return this;
    };

    copy (dest) {
        dest.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
            dest.words[i] = this.words[i];
        }
        dest.length = this.length;
        dest.negative = this.negative;
        dest.red = this.red;
    };

    clone () {
        var r = new BigNumber(null);
        this.copy(r);
        return r;
    };

    modn (num) {
        assert(num <= 0x3ffffff);
        var p = (1 << 26) % num;

        var acc = 0;
        for (var i = this.length - 1; i >= 0; i--) {
            acc = (p * acc + (this.words[i] | 0)) % num;
        }

        return acc;
    };

    idivn (num) {
        assert(num <= 0x3ffffff);

        var carry = 0;
        for (var i = this.length - 1; i >= 0; i--) {
            var w = (this.words[i] | 0) + carry * 0x4000000;
            this.words[i] = (w / num) | 0;
            carry = w % num;
        }

        return this.strip();
    };

    isZero () {
        return this.length === 1 && this.words[0] === 0;
    };

    toString (base = 10, padding = 1) {
        base = base || 10;
        padding = padding | 0 || 1;

        var out;
        if (base === 16 || base === 'hex') {
            out = '';
            var off = 0;
            var carry = 0;
            for (var i = 0; i < this.length; i++) {
                var w = this.words[i];
                var word = (((w << off) | carry) & 0xffffff).toString(16);
                carry = (w >>> (24 - off)) & 0xffffff;
                if (carry !== 0 || i !== this.length - 1) {
                    out = zeros[6 - word.length] + word + out;
                } else {
                    out = word + out;
                }
                off += 2;
                if (off >= 26) {
                    off -= 26;
                    i--;
                }
            }
            if (carry !== 0) {
                out = carry.toString(16) + out;
            }
            while (out.length % padding !== 0) {
                out = '0' + out;
            }
            if (this.negative !== 0) {
                out = '-' + out;
            }
            return out;
        }

        if (base === (base | 0) && base >= 2 && base <= 36) {
            // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
            var groupSize = groupSizes[base];
            // var groupBase = Math.pow(base, groupSize);
            var groupBase = groupBases[base];
            out = '';
            var c = this.clone();
            c.negative = 0;
            while (!c.isZero()) {
                var r = c.modn(groupBase).toString(base);
                c = c.idivn(groupBase);

                if (!c.isZero()) {
                    out = zeros[groupSize - r.length] + r + out;
                } else {
                    out = r + out;
                }
            }
            if (this.isZero()) {
                out = '0' + out;
            }
            while (out.length % padding !== 0) {
                out = '0' + out;
            }
            if (this.negative !== 0) {
                out = '-' + out;
            }
            return out;
        }

        assert(false, 'Base should be between 2 and 36');
    };
}
