/** @module contracts */

import {convertHexEndianess, convertHexStringToByteArray} from '@burstjs/util';
import {GenerateContractBytesArgs} from './typings/args';

const ContractVersion = 1;

class ByteBuffer {
    private bytes: Uint8Array;
    private view: DataView;
    private offset = 0;

    constructor(length: number, public littleEndian: boolean) {
        // this.bytes = new Uint8Array(length);
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

    putUInt53(uint53: number) {
        if (!Number.isSafeInteger(uint53)) {
            // workaround: instead of struggling with BigInt here, we limit max activation amount
            throw new Error('Activation Amount exceeds supported limit (2^53 -1 Planck)');
        }

        const uint32_l = uint53 & 0xFFFFFFFF;
        const uint32_u = uint53 & 0xFFFFFFFF00000000;
        this.putUInt32(uint32_l);
        this.putUInt32(uint32_u);
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


/**
 * Generate the byte sequence for a contract, such that this can be committed to blockchain
 * @param args The [[GenerateContractBytesArgs]] arguments
 * @return ArrayBuffer The byte sequence to be committed to Blockchain.
 *
 * @note This implementation is only for the AT Version 1, and a simplified version without data yet
 */
export const generateContractBytes = (
    {activationFeePlanck, hexCode, isLittleEndian = true}: GenerateContractBytesArgs
): ArrayBuffer => {

    const code = isLittleEndian ? convertHexEndianess(hexCode) : hexCode;
    const codeLength = code.length / 2;
    const cPages = ((codeLength / 256) >> 0) + ((codeLength % 256) !== 0 ? 1 : 0);
    const dPages = 1;
    const csPages = 1;
    const usPages = 1;

    let creationLength = 4; // version + reserved
    creationLength += 8; // pages
    creationLength += 8; // minActivationAmount
    creationLength += cPages * 256 <= 256 ? 1 : (cPages * 256 <= 32767 ? 2 : 4); // code size
    creationLength += codeLength;
    creationLength += dPages * 256 <= 256 ? 1 : (dPages * 256 <= 32767 ? 2 : 4); // data size
    creationLength += 0; // data length

    const activationAmountNumber = +activationFeePlanck;


    const putLength = (nPages: number, length: number, buffer: ByteBuffer) => {
        if (nPages * 256 <= 256) {
            buffer.putByte(length);
        } else if (nPages * 256 <= 32767) {
            buffer.putShort(length);
        } else {
            buffer.putUInt32(length);
        }
    };

    const byteBuffer = new ByteBuffer(creationLength, true);
    byteBuffer.putShort(ContractVersion);
    byteBuffer.putShort(0);
    byteBuffer.putShort(cPages);
    byteBuffer.putShort(dPages);
    byteBuffer.putShort(csPages);
    byteBuffer.putShort(usPages);
    byteBuffer.putUInt53(activationAmountNumber);
    // byteBuffer.putUInt32(activationAmountNumber);
    // byteBuffer.putUInt32(0);
    putLength(cPages, codeLength, byteBuffer);
    byteBuffer.putBytes(new Int8Array(convertHexStringToByteArray(code)));
    putLength(dPages, 0, byteBuffer); // no data support yet

    return byteBuffer.getBytes();
};
