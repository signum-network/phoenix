/** @ignore */
/** @module contracts */

import BigNumber from 'bignumber.js';
import './padStartPolyfill';

/**
 * Helper class to deal easier with bytes
 */
export class ByteBuffer {
    private view: DataView;
    private offset = 0;

    constructor(length: number, public littleEndian: boolean) {
        this.view = new DataView(new ArrayBuffer(length));
    }

    putByte(byte: number) {
        this.view.setInt8(this.offset, byte);
        this.offset += 1;
    }

    putShort(int16: number) {
        this.view.setInt16(this.offset, int16, this.littleEndian);
        this.offset += 2;
    }

    putUInt32(uint32: number) {
        this.view.setUint32(this.offset, uint32, this.littleEndian);
        this.offset += 4;
    }

    putUInt64(value: number) {
        const bigNumber = new BigNumber(value);
        // @ts-ignore
        const hex = bigNumber.toString(16).padStart(16, '0');
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

    putBytes(bytes: Int8Array) {
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
