import {ByteBuffer} from '../ByteBuffer';

describe('ByteBuffer', () => {

    describe('putByte', () => {
        it('puts a single byte - Big Endian', () => {
            const byteBuffer = new ByteBuffer(2, false);
            byteBuffer.putByte(1);
            byteBuffer.putByte(2);
            const bytes = new Uint8Array(byteBuffer.getBytes());
            expect(bytes).toEqual(new Uint8Array([1, 2]));
        });

        it('puts a single signed byte - Little Endian', () => {
            const byteBuffer = new ByteBuffer(2, true);
            byteBuffer.putByte(1);
            byteBuffer.putByte(-2);
            const bytes = new Int8Array(byteBuffer.getBytes());
            expect(bytes).toEqual(new Int8Array([1, -2]));
        });

        it('puts a single byte - Buffer overflow', () => {
            const byteBuffer = new ByteBuffer(1, false);
            byteBuffer.putByte(1);
            try {
                byteBuffer.putByte(2);
                expect('Expects exception').toBeFalsy();
            } catch (e) {
                expect(e.message).toContain('Offset is outside the bounds');
            }
        });

        it('puts a single byte - Out of range', () => {
            const byteBuffer = new ByteBuffer(1, false);
            try {
                byteBuffer.putByte(345);
                expect('Expects exception').toBeFalsy();
            } catch (e) {
                expect(e.message).toContain('Out of range');
            }
        });
    });

    describe('putBytes', () => {
        it('puts multiple bytes - Big Endian', () => {
            const byteBuffer = new ByteBuffer(4, false);
            byteBuffer.putBytes(new Int8Array([-1, 0, 1, 2]));
            const bytes = new Uint8Array(byteBuffer.getBytes());
            expect(bytes).toEqual(new Uint8Array([255, 0, 1, 2]));
        });

        it('puts a multiple bytes - Little Endian', () => {
            const byteBuffer = new ByteBuffer(4, true);
            byteBuffer.putBytes(new Int8Array([-1, 0, 1, 2]));
            const bytes = new Uint8Array(byteBuffer.getBytes());
            expect(bytes).toEqual(new Uint8Array([2, 1, 0, 255]));
        });
    });

    describe('putShort', () => {
        it('puts short - Big Endian', () => {
            const byteBuffer = new ByteBuffer(2, false);
            byteBuffer.putShort(12345);
            const bytes = new Uint8Array(byteBuffer.getBytes());
            expect(bytes).toEqual(new Uint8Array([48, 57]));
        });

        it('puts a short - Little Endian', () => {
            const byteBuffer = new ByteBuffer(2, true);
            byteBuffer.putShort(12345);
            const bytes = new Uint8Array(byteBuffer.getBytes());
            expect(bytes).toEqual(new Uint8Array([57, 48]));
        });

        it('puts a short - Out of range', () => {
            const byteBuffer = new ByteBuffer(2, false);
            try {
                byteBuffer.putShort(400000);
                expect('Expects exception').toBeFalsy();
            } catch (e) {
                expect(e.message).toContain('Out of range');
            }
        });

    });

    describe('putUint32', () => {
        it('puts an Uint32- Big Endian', () => {
            const byteBuffer = new ByteBuffer(4, false);
            byteBuffer.putUInt32(12345678);
            const bytes = new Uint8Array(byteBuffer.getBytes());
            expect(bytes).toEqual(new Uint8Array([0, 188, 97, 78]));
        });

        it('puts an Uint32 - Little Endian', () => {
            const byteBuffer = new ByteBuffer(4, true);
            byteBuffer.putUInt32(12345678);
            const bytes = new Uint8Array(byteBuffer.getBytes());
            expect(bytes).toEqual(new Uint8Array([78, 97, 188, 0]));
        });

        it('puts an Uint32 - Out of range', () => {
            const byteBuffer = new ByteBuffer(4, false);
            try {
                byteBuffer.putShort(400000);
                expect('Expects exception').toBeFalsy();
            } catch (e) {
                expect(e.message).toContain('Out of range');
            }
        });

    });

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
