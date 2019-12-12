/** @ignore */
/** @module contracts */

import BigNumber from 'bignumber.js';
import './padStartPolyfill';

const MaxUInt64 = new BigNumber('18446744073709551615');

function assertRange(value, min, max) {
    if (min <= value && value <= max) {
        return;
    }
    throw Error(`Out of range (${min}, ${max}): ${value}`);
}

/**
 * Helper class to deal easier with bytes
 *
 * The implementations are not performant
 */
export class ByteBuffer {
    private view: DataView;
    private offset = 0;

    constructor(length: number, public littleEndian: boolean) {
        this.view = new DataView(new ArrayBuffer(length));
    }

    putByte(byte: number) {
        assertRange(byte, -128, 255);
        this.view.setInt8(this.offset, byte);
        this.offset += 1;
    }

    putShort(int16: number) {
        assertRange(int16, -(2 ** 15) - 1, 2 ** 16 - 1);
        this.view.setInt16(this.offset, int16, this.littleEndian);
        this.offset += 2;
    }

    putUInt32(uint32: number) {
        assertRange(uint32, 0, 2 ** 32 - 1);
        this.view.setUint32(this.offset, uint32, this.littleEndian);
        this.offset += 4;
    }

    putUInt64(uint64: BigNumber | number) {

        const value = uint64 instanceof BigNumber ? uint64 : new BigNumber(uint64);

        if (value.lt(0) || value.gt(MaxUInt64)) {
            throw Error(`Out of range (0, ${MaxUInt64})`);
        }
        // @ts-ignore
        const hex = value.toString(16).padStart(16, '0');
        const upperUint32 = parseInt(hex.slice(0, 8), 16);
        const lowerUint32 = parseInt(hex.slice(8), 16);
        if (this.littleEndian) {
            this.putUInt32(lowerUint32);
            this.putUInt32(upperUint32);
        } else {
            this.putUInt32(upperUint32);
            this.putUInt32(lowerUint32);
        }
    }

    putBytes(bytes: Uint8Array | Int8Array) {
        // not a fast implementation!
        const l = bytes.length;
        if (this.littleEndian) {
            for (let i = l - 1; i >= 0; --i) {
                this.putByte(bytes[i]);
            }
        } else {
            for (let i = 0; i < l; ++i) {
                this.putByte(bytes[i]);
            }
        }
    }

    getBytes(): ArrayBuffer {
        return this.view.buffer;
    }

}
