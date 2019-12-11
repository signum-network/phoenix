/** @module contracts */

/**
 * Copyright (c) 2019 Burst Apps Team
 */

import {convertHexEndianess, convertHexStringToByteArray} from '@burstjs/util';
import {GenerateContractBytesArgs} from './typings/args';
import {ByteBuffer} from './internal/ByteBuffer';
import BigNumber from 'bignumber.js';

const ContractVersion = 1;

/**
 * Generate the byte sequence for a contract, such that this can be committed to blockchain
 * @param args The [[GenerateContractBytesArgs]] arguments
 * @return ArrayBuffer The byte sequence to be committed to Blockchain.
 *
 * @note This implementation is only for the AT Version 1, and a simplified version without data support yet
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
    byteBuffer.putUInt64(new BigNumber(activationFeePlanck));
    putLength(cPages, codeLength, byteBuffer);
    byteBuffer.putBytes(convertHexStringToByteArray(code));
    putLength(dPages, 0, byteBuffer); // no data support yet

    return byteBuffer.getBytes();
};
