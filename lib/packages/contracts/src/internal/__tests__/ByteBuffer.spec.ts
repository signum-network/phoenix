import {ByteBuffer} from '../ByteBuffer';

describe('ByteBuffer', () => {

    describe('putUInt64', () => {
        it('puts long number correctly into byte buffer - Big Endian', () => {
            const long = 12345689123456789;
            const expected = new Uint8Array([0, 43, 220, 86, 190, 182, 7, 20]);
            const byteBuffer = new ByteBuffer(8, false);
            byteBuffer.putUInt64(long);
            const bytes = new Uint8Array(byteBuffer.getBytes());
            expect(bytes).toEqual(expected);
        });
        it('puts long number correctly into byte buffer - Little Endian', () => {
            const long = 12345689123456789;
            const expected = new Uint8Array([20, 7, 182, 190, 86, 220, 43, 0]);
            const byteBuffer = new ByteBuffer(8, true);
            byteBuffer.putUInt64(long);
            const bytes = new Uint8Array(byteBuffer.getBytes());
            expect(bytes).toEqual(expected);
        });
    });

});
