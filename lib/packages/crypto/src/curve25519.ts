/** @ignore */
/** @internal */

/* tslint:disable */
/*
 * Ported to TypeScript 2.4.2 (https://github.com/Microsoft/TypeScript/issues/18158) 09/02/17.
 * Ported to JavaScript from Java 07/01/14.
 * Ported from C to Java by Dmitry Skiba [sahn0], 23/02/08.
 * Original: http://cds.xs4all.nl:8081/ecdh/
 */
/*
 * Generic 64-bit integer implementation of Curve25519 ECDH
 * Written by Matthijs van Duin, 200608242056
 * Public domain.
 *
 * Based on work by Daniel J Bernstein, http://cr.yp.to/ecdh.html
 */

export class Curve25519 {

    //region Constants

    public static KEY_SIZE: number = 32;

    /* array length */
    public static UNPACKED_SIZE: number = 16;

    /* group order (a prime near 2^252+2^124) */
    public static ORDER: number[] = [
        237, 211, 245, 92,
        26, 99, 18, 88,
        214, 156, 247, 162,
        222, 249, 222, 20,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 16
    ];

    /* smallest multiple of the order that's >= 2^255 */
    public static ORDER_TIMES_8: number[] = [
        104, 159, 174, 231,
        210, 24, 147, 192,
        178, 230, 188, 23,
        245, 206, 247, 166,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 128
    ];

    /* constants 2Gy and 1/(2Gy) */
    public static BASE_2Y: number[] = [
        22587, 610, 29883, 44076,
        15515, 9479, 25859, 56197,
        23910, 4462, 17831, 16322,
        62102, 36542, 52412, 16035
    ];

    public static BASE_R2Y: number[] = [
        5744, 16384, 61977, 54121,
        8776, 18501, 26522, 34893,
        23833, 5823, 55924, 58749,
        24147, 14085, 13606, 6080
    ];

    public static C1: number[] = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    public static C9: number[] = [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    public static C486671 = [0x6D0F, 0x0007, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    public static C39420360 = [0x81C8, 0x0259, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    public static P25: number = 33554431; /* (1 << 25) - 1 */
    public static P26: number = 67108863; /* (1 << 26) - 1 */

    //#endregion

    //region Key Agreement

    /* Private key clamping
     *   k [out] your private key for key agreement
     *   k  [in]  32 random bytes
     */
    public static clamp(k) {
        k[31] &= 0x7F;
        k[31] |= 0x40;
        k[ 0] &= 0xF8;
    }

    //endregion

    //region radix 2^8 math

    public static cpy32(d, s) {
        for (let i = 0; i < 32; i++)
            d[i] = s[i];
    }

    /* p[m..n+m-1] = q[m..n+m-1] + z * x */
    /* n is the size of x */
    /* n+m is the size of p and q */
    public static mula_small(p, q, m, x, n, z) {
        m = m | 0;
        n = n | 0;
        z = z | 0;

        let v = 0;
        for (let i = 0; i < n; ++i) {
            v += (q[i + m] & 0xFF) + z * (x[i] & 0xFF);
            p[i + m] = (v & 0xFF);
            v >>= 8;
        }

        return v;
    }

    /* p += x * y * z  where z is a small integer
     * x is size 32, y is size t, p is size 32+t
     * y is allowed to overlap with p+32 if you don't care about the upper half  */
    public static mula32(p, x, y, t, z) {
        t = t | 0;
        z = z | 0;

        let n = 31;
        let w = 0;
        let i = 0;
        for (; i < t; i++) {
            let zy = z * (y[i] & 0xFF);
            w += Curve25519.mula_small(p, p, i, x, n, zy) + (p[i+n] & 0xFF) + zy * (x[n] & 0xFF);
            p[i + n] = w & 0xFF;
            w >>= 8;
        }
        p[i + n] = (w + (p[i + n] & 0xFF)) & 0xFF;
        return w >> 8;
    }

    /* divide r (size n) by d (size t), returning quotient q and remainder r
     * quotient is size n-t+1, remainder is size t
     * requires t > 0 && d[t-1] !== 0
     * requires that r[-1] and d[-1] are valid memory locations
     * q may overlap with r+t */
    public static divmod(q, r, n, d, t) {
        n = n | 0;
        t = t | 0;

        let rn = 0;
        let dt = (d[t - 1] & 0xFF) << 8;
        if (t > 1)
            dt |= (d[t - 2] & 0xFF);

        while (n-- >= t) {
            let z = (rn << 16) | ((r[n] & 0xFF) << 8);
            if (n > 0)
                z |= (r[n - 1] & 0xFF);

            let i = n - t + 1;
            z /= dt;
            rn += Curve25519.mula_small(r, r, i, d, t, -z);
            q[i] = (z + rn) & 0xFF;
            /* rn is 0 or -1 (underflow) */
            Curve25519.mula_small(r, r, i, d, t, -rn);
            rn = r[n] & 0xFF;
            r[n] = 0;
        }

        r[t-1] = rn & 0xFF;
    }

    public static numsize(x, n) {
        while (n-- !== 0 && x[n] === 0) { }
        return n + 1;
    }

    /* Returns x if a contains the gcd, y if b.
     * Also, the returned buffer contains the inverse of a mod b,
     * as 32-byte signed.
     * x and y must have 64 bytes space for temporary use.
     * requires that a[-1] and b[-1] are valid memory locations  */
    public static egcd32(x, y, a, b) {
        let an, bn = 32, qn, i;
        for (i = 0; i < 32; i++)
            x[i] = y[i] = 0;
        x[0] = 1;
        an = Curve25519.numsize(a, 32);
        if (an === 0)
            return y; /* division by zero */
        let temp = new Array(32);
        while (true) {
            qn = bn - an + 1;
            Curve25519.divmod(temp, b, bn, a, an);
            bn = Curve25519.numsize(b, bn);
            if (bn === 0)
                return x;
            Curve25519.mula32(y, x, temp, qn, -1);

            qn = an - bn + 1;
            Curve25519.divmod(temp, a, an, b, bn);
            an = Curve25519.numsize(a, an);
            if (an === 0)
                return y;
            Curve25519.mula32(x, y, temp, qn, -1);
        }
    }

    //endregion

    //region radix 2^25.5 GF(2^255-19) math

    //region pack / unpack

    /* Convert to internal format from little-endian byte format */
    public static unpack(x, m) {
        for (let i = 0; i < Curve25519.KEY_SIZE; i += 2)
            x[i / 2] = m[i] & 0xFF | ((m[i + 1] & 0xFF) << 8);
    }

    /* Check if reduced-form input >= 2^255-19 */
    public static is_overflow(x) {
        return (
            ((x[0] > Curve25519.P26 - 19)) &&
                ((x[1] & x[3] & x[5] & x[7] & x[9]) === Curve25519.P25) &&
                ((x[2] & x[4] & x[6] & x[8]) === Curve25519.P26)
            ) || (x[9] > Curve25519.P25);
    }

    /* Convert from internal format to little-endian byte format.  The
     * number must be in a reduced form which is output by the following ops:
     *     unpack, mul, sqr
     *     set --  if input in range 0 .. P25
     * If you're unsure if the number is reduced, first multiply it by 1.  */
    public static pack(x, m) {
        for (let i = 0; i < Curve25519.UNPACKED_SIZE; ++i) {
            m[2 * i] = x[i] & 0x00FF;
            m[2 * i + 1] = (x[i] & 0xFF00) >> 8;
        }
    }

    //endregion

    public static createUnpackedArray() {
        return new Uint16Array(Curve25519.UNPACKED_SIZE);
    }

    /* Copy a number */
    public static cpy(d, s) {
        for (let i = 0; i < Curve25519.UNPACKED_SIZE; ++i)
            d[i] = s[i];
    }

    /* Set a number to value, which must be in range -185861411 .. 185861411 */
    public static set(d, s) {
        d[0] = s;
        for (let i = 1; i < Curve25519.UNPACKED_SIZE; ++i)
            d[i] = 0;
    }

    /* Calculates a reciprocal.  The output is in reduced form, the inputs need not
     * be.  Simply calculates  y = x^(p-2)  so it's not too fast. */
    /* When sqrtassist is true, it instead calculates y = x^((p-5)/8) */
    public static recip(y, x, sqrtassist) {
        let t0 = Curve25519.createUnpackedArray();
        let t1 = Curve25519.createUnpackedArray();
        let t2 = Curve25519.createUnpackedArray();
        let t3 = Curve25519.createUnpackedArray();
        let t4 = Curve25519.createUnpackedArray();

        /* the chain for x^(2^255-21) is straight from djb's implementation */
        let i;
        Curve25519.sqr(t1, x); /*  2 === 2 * 1	*/
        Curve25519.sqr(t2, t1); /*  4 === 2 * 2	*/
        Curve25519.sqr(t0, t2); /*  8 === 2 * 4	*/
        Curve25519.mul(t2, t0, x); /*  9 === 8 + 1	*/
        Curve25519.mul(t0, t2, t1); /* 11 === 9 + 2	*/
        Curve25519.sqr(t1, t0); /* 22 === 2 * 11	*/
        Curve25519.mul(t3, t1, t2); /* 31 === 22 + 9 === 2^5   - 2^0	*/
        Curve25519.sqr(t1, t3); /* 2^6   - 2^1	*/
        Curve25519.sqr(t2, t1); /* 2^7   - 2^2	*/
        Curve25519.sqr(t1, t2); /* 2^8   - 2^3	*/
        Curve25519.sqr(t2, t1); /* 2^9   - 2^4	*/
        Curve25519.sqr(t1, t2); /* 2^10  - 2^5	*/
        Curve25519.mul(t2, t1, t3); /* 2^10  - 2^0	*/
        Curve25519.sqr(t1, t2); /* 2^11  - 2^1	*/
        Curve25519.sqr(t3, t1); /* 2^12  - 2^2	*/
        for (i = 1; i < 5; i++) {
            Curve25519.sqr(t1, t3);
            Curve25519.sqr(t3, t1);
        } /* t3 */ /* 2^20  - 2^10	*/
        Curve25519.mul(t1, t3, t2); /* 2^20  - 2^0	*/
        Curve25519.sqr(t3, t1); /* 2^21  - 2^1	*/
        Curve25519.sqr(t4, t3); /* 2^22  - 2^2	*/
        for (i = 1; i < 10; i++) {
            Curve25519.sqr(t3, t4);
            Curve25519.sqr(t4, t3);
        } /* t4 */ /* 2^40  - 2^20	*/
        Curve25519.mul(t3, t4, t1); /* 2^40  - 2^0	*/
        for (i = 0; i < 5; i++) {
            Curve25519.sqr(t1, t3);
            Curve25519.sqr(t3, t1);
        } /* t3 */ /* 2^50  - 2^10	*/
        Curve25519.mul(t1, t3, t2); /* 2^50  - 2^0	*/
        Curve25519.sqr(t2, t1); /* 2^51  - 2^1	*/
        Curve25519.sqr(t3, t2); /* 2^52  - 2^2	*/
        for (i = 1; i < 25; i++) {
            Curve25519.sqr(t2, t3);
            Curve25519.sqr(t3, t2);
        } /* t3 */ /* 2^100 - 2^50 */
        Curve25519.mul(t2, t3, t1); /* 2^100 - 2^0	*/
        Curve25519.sqr(t3, t2); /* 2^101 - 2^1	*/
        Curve25519.sqr(t4, t3); /* 2^102 - 2^2	*/
        for (i = 1; i < 50; i++) {
            Curve25519.sqr(t3, t4);
            Curve25519.sqr(t4, t3);
        } /* t4 */ /* 2^200 - 2^100 */
        Curve25519.mul(t3, t4, t2); /* 2^200 - 2^0	*/
        for (i = 0; i < 25; i++) {
            Curve25519.sqr(t4, t3);
            Curve25519.sqr(t3, t4);
        } /* t3 */ /* 2^250 - 2^50	*/
        Curve25519.mul(t2, t3, t1); /* 2^250 - 2^0	*/
        Curve25519.sqr(t1, t2); /* 2^251 - 2^1	*/
        Curve25519.sqr(t2, t1); /* 2^252 - 2^2	*/
        if (sqrtassist !== 0) {
            Curve25519.mul(y, x, t2); /* 2^252 - 3 */
        } else {
            Curve25519.sqr(t1, t2); /* 2^253 - 2^3	*/
            Curve25519.sqr(t2, t1); /* 2^254 - 2^4	*/
            Curve25519.sqr(t1, t2); /* 2^255 - 2^5	*/
            Curve25519.mul(y, t1, t0); /* 2^255 - 21	*/
        }
    }

    /* checks if x is "negative", requires reduced input */
    public static is_negative(x) {
        let isOverflowOrNegative = Curve25519.is_overflow(x) || x[9] < 0;
        let leastSignificantBit = x[0] & 1;
        return ((isOverflowOrNegative ? 1 : 0) ^ leastSignificantBit) & 0xFFFFFFFF;
    }

    /* a square root */
    public static sqrt(x, u) {
        let v = Curve25519.createUnpackedArray();
        let t1 = Curve25519.createUnpackedArray();
        let t2 = Curve25519.createUnpackedArray();

        Curve25519.add(t1, u, u); /* t1 = 2u		*/
        Curve25519.recip(v, t1, 1); /* v = (2u)^((p-5)/8)	*/
        Curve25519.sqr(x, v); /* x = v^2		*/
        Curve25519.mul(t2, t1, x); /* t2 = 2uv^2		*/
        Curve25519.sub(t2, t2, Curve25519.C1); /* t2 = 2uv^2-1		*/
        Curve25519.mul(t1, v, t2); /* t1 = v(2uv^2-1)	*/
        Curve25519.mul(x, u, t1); /* x = uv(2uv^2-1)	*/
    }

    //endregion

    //region JavaScript Fast Math

    public static c255lsqr8h(a7, a6, a5, a4, a3, a2, a1, a0) {
        let r = [];
        let v;
        v = a0*a0;
        r[0] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + 2*a0*a1;
        r[1] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + 2*a0*a2 + a1*a1;
        r[2] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + 2*a0*a3 + 2*a1*a2;
        r[3] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + 2*a0*a4 + 2*a1*a3 + a2*a2;
        r[4] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + 2*a0*a5 + 2*a1*a4 + 2*a2*a3;
        r[5] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + 2*a0*a6 + 2*a1*a5 + 2*a2*a4 + a3*a3;
        r[6] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + 2*a0*a7 + 2*a1*a6 + 2*a2*a5 + 2*a3*a4;
        r[7] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + 2*a1*a7 + 2*a2*a6 + 2*a3*a5 + a4*a4;
        r[8] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + 2*a2*a7 + 2*a3*a6 + 2*a4*a5;
        r[9] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + 2*a3*a7 + 2*a4*a6 + a5*a5;
        r[10] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + 2*a4*a7 + 2*a5*a6;
        r[11] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + 2*a5*a7 + a6*a6;
        r[12] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + 2*a6*a7;
        r[13] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + a7*a7;
        r[14] = v & 0xFFFF;

        r[15] = ((v / 0x10000) | 0);
        return r;
    }

    /* Square a number.  Optimization of  mul25519(x2, x, x)  c255lsqrmodp*/
    public static sqr(r, a) {
        let x = Curve25519.c255lsqr8h(a[15], a[14], a[13], a[12], a[11], a[10], a[9], a[8]);
        let z = Curve25519.c255lsqr8h(a[7], a[6], a[5], a[4], a[3], a[2], a[1], a[0]);
        let y = Curve25519.c255lsqr8h(a[15] + a[7], a[14] + a[6], a[13] + a[5], a[12] + a[4], a[11] + a[3], a[10] + a[2], a[9] + a[1], a[8] + a[0]);

        let v;
        v = 0x800000 + z[0] + (y[8] -x[8] -z[8] + x[0] -0x80) * 38;
        r[0] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[1] + (y[9] -x[9] -z[9] + x[1]) * 38;
        r[1] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[2] + (y[10] -x[10] -z[10] + x[2]) * 38;
        r[2] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[3] + (y[11] -x[11] -z[11] + x[3]) * 38;
        r[3] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[4] + (y[12] -x[12] -z[12] + x[4]) * 38;
        r[4] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[5] + (y[13] -x[13] -z[13] + x[5]) * 38;
        r[5] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[6] + (y[14] -x[14] -z[14] + x[6]) * 38;
        r[6] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[7] + (y[15] -x[15] -z[15] + x[7]) * 38;
        r[7] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[8] + y[0] -x[0] -z[0] + x[8] * 38;
        r[8] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[9] + y[1] -x[1] -z[1] + x[9] * 38;
        r[9] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[10] + y[2] -x[2] -z[2] + x[10] * 38;
        r[10] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[11] + y[3] -x[3] -z[3] + x[11] * 38;
        r[11] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[12] + y[4] -x[4] -z[4] + x[12] * 38;
        r[12] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[13] + y[5] -x[5] -z[5] + x[13] * 38;
        r[13] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[14] + y[6] -x[6] -z[6] + x[14] * 38;
        r[14] = v & 0xFFFF;

        let r15 = 0x7fff80 + ((v / 0x10000) | 0) + z[15] + y[7] -x[7] -z[7] + x[15] * 38;
        Curve25519.c255lreduce(r, r15);
    }

    public static c255lmul8h(a7, a6, a5, a4, a3, a2, a1, a0, b7, b6, b5, b4, b3, b2, b1, b0) {
        let r = [];
        let v;
        v = a0*b0;
        r[0] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + a0*b1 + a1*b0;
        r[1] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + a0*b2 + a1*b1 + a2*b0;
        r[2] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + a0*b3 + a1*b2 + a2*b1 + a3*b0;
        r[3] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + a0*b4 + a1*b3 + a2*b2 + a3*b1 + a4*b0;
        r[4] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + a0*b5 + a1*b4 + a2*b3 + a3*b2 + a4*b1 + a5*b0;
        r[5] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + a0*b6 + a1*b5 + a2*b4 + a3*b3 + a4*b2 + a5*b1 + a6*b0;
        r[6] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + a0*b7 + a1*b6 + a2*b5 + a3*b4 + a4*b3 + a5*b2 + a6*b1 + a7*b0;
        r[7] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + a1*b7 + a2*b6 + a3*b5 + a4*b4 + a5*b3 + a6*b2 + a7*b1;
        r[8] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + a2*b7 + a3*b6 + a4*b5 + a5*b4 + a6*b3 + a7*b2;
        r[9] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + a3*b7 + a4*b6 + a5*b5 + a6*b4 + a7*b3;
        r[10] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + a4*b7 + a5*b6 + a6*b5 + a7*b4;
        r[11] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + a5*b7 + a6*b6 + a7*b5;
        r[12] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + a6*b7 + a7*b6;
        r[13] = v & 0xFFFF;

        v = ((v / 0x10000) | 0) + a7*b7;
        r[14] = v & 0xFFFF;

        r[15] = ((v / 0x10000) | 0);
        return r;
    }

    /* Multiply two numbers.  The output is in reduced form, the inputs need not be. c255lmulmodp*/
    public static mul(r, a, b) {
        // Karatsuba multiplication scheme: x*y = (b^2+b)*x1*y1 - b*(x1-x0)*(y1-y0) + (b+1)*x0*y0
        let x = Curve25519.c255lmul8h(a[15], a[14], a[13], a[12], a[11], a[10], a[9], a[8], b[15], b[14], b[13], b[12], b[11], b[10], b[9], b[8]);
        let z = Curve25519.c255lmul8h(a[7], a[6], a[5], a[4], a[3], a[2], a[1], a[0], b[7], b[6], b[5], b[4], b[3], b[2], b[1], b[0]);
        let y = Curve25519.c255lmul8h(a[15] + a[7], a[14] + a[6], a[13] + a[5], a[12] + a[4], a[11] + a[3], a[10] + a[2], a[9] + a[1], a[8] + a[0],
            b[15] + b[7], b[14] + b[6], b[13] + b[5], b[12] + b[4], b[11] + b[3], b[10] + b[2], b[9] + b[1], b[8] + b[0]);

        let v;
        v = 0x800000 + z[0] + (y[8] -x[8] -z[8] + x[0] -0x80) * 38;
        r[0] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[1] + (y[9] -x[9] -z[9] + x[1]) * 38;
        r[1] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[2] + (y[10] -x[10] -z[10] + x[2]) * 38;
        r[2] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[3] + (y[11] -x[11] -z[11] + x[3]) * 38;
        r[3] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[4] + (y[12] -x[12] -z[12] + x[4]) * 38;
        r[4] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[5] + (y[13] -x[13] -z[13] + x[5]) * 38;
        r[5] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[6] + (y[14] -x[14] -z[14] + x[6]) * 38;
        r[6] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[7] + (y[15] -x[15] -z[15] + x[7]) * 38;
        r[7] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[8] + y[0] -x[0] -z[0] + x[8] * 38;
        r[8] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[9] + y[1] -x[1] -z[1] + x[9] * 38;
        r[9] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[10] + y[2] -x[2] -z[2] + x[10] * 38;
        r[10] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[11] + y[3] -x[3] -z[3] + x[11] * 38;
        r[11] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[12] + y[4] -x[4] -z[4] + x[12] * 38;
        r[12] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[13] + y[5] -x[5] -z[5] + x[13] * 38;
        r[13] = v & 0xFFFF;

        v = 0x7fff80 + ((v / 0x10000) | 0) + z[14] + y[6] -x[6] -z[6] + x[14] * 38;
        r[14] = v & 0xFFFF;

        let r15 = 0x7fff80 + ((v / 0x10000) | 0) + z[15] + y[7] -x[7] -z[7] + x[15] * 38;
        Curve25519.c255lreduce(r, r15);
    }

    public static c255lreduce(a, a15) {
        let v = a15;
        a[15] = v & 0x7FFF;
        v = ((v / 0x8000) | 0) * 19;
        for (let i = 0; i <= 14; ++i) {
            v += a[i];
            a[i] = v & 0xFFFF;
            v = ((v / 0x10000) | 0);
        }

        a[15] += v;
    }

    /* Add/subtract two numbers.  The inputs must be in reduced form, and the
     * output isn't, so to do another addition or subtraction on the output,
     * first multiply it by one to reduce it. c255laddmodp*/
    public static add(r, a, b) {
        let v;
        v = (((a[15] / 0x8000) | 0) + ((b[15] / 0x8000) | 0)) * 19 + a[0] + b[0];
        r[0] = v & 0xFFFF;
        for (let i = 1; i <= 14; ++i) {
            v = ((v / 0x10000) | 0) + a[i] + b[i];
            r[i] = v & 0xFFFF;
        }

        r[15] = ((v / 0x10000) | 0) + (a[15] & 0x7FFF) + (b[15] & 0x7FFF);
    }

    /* Add/subtract two numbers.  The inputs must be in reduced form, and the
     * output isn't, so to do another addition or subtraction on the output,
     * first multiply it by one to reduce it. c255lsubmodp*/
    public static sub(r, a, b) {
        let v;
        v = 0x80000 + (((a[15] / 0x8000) | 0) - ((b[15] / 0x8000) | 0) - 1) * 19 + a[0] - b[0];
        r[0] = v & 0xFFFF;
        for (let i = 1; i <= 14; ++i) {
            v = ((v / 0x10000) | 0) + 0x7fff8 + a[i] - b[i];
            r[i] = v & 0xFFFF;
        }
        r[15] = ((v / 0x10000) | 0) + 0x7ff8 + (a[15] & 0x7FFF) - (b[15] & 0x7FFF);
    }

    /* Multiply a number by a small integer in range -185861411 .. 185861411.
     * The output is in reduced form, the input x need not be.  x and xy may point
     * to the same buffer. c255lmulasmall*/
    public static mul_small(r, a, m) {
        let v;
        v = a[0] * m;
        r[0] = v & 0xFFFF;
        for (let i = 1; i <= 14; ++i) {
            v = ((v / 0x10000) | 0) + a[i]*m;
            r[i] = v & 0xFFFF;
        }

        let r15 = ((v / 0x10000) | 0) + a[15]*m;
        Curve25519.c255lreduce(r, r15);
    }

    //endregion

    /********************* Elliptic curve *********************/

    /* y^2 = x^3 + 486662 x^2 + x  over GF(2^255-19) */

    /* t1 = ax + az
     * t2 = ax - az  */
    public static mont_prep(t1, t2, ax, az) {
        Curve25519.add(t1, ax, az);
        Curve25519.sub(t2, ax, az);
    }

    /* A = P + Q   where
     *  X(A) = ax/az
     *  X(P) = (t1+t2)/(t1-t2)
     *  X(Q) = (t3+t4)/(t3-t4)
     *  X(P-Q) = dx
     * clobbers t1 and t2, preserves t3 and t4  */
    public static mont_add(t1, t2, t3, t4, ax, az, dx) {
        Curve25519.mul(ax, t2, t3);
        Curve25519.mul(az, t1, t4);
        Curve25519.add(t1, ax, az);
        Curve25519.sub(t2, ax, az);
        Curve25519.sqr(ax, t1);
        Curve25519.sqr(t1, t2);
        Curve25519.mul(az, t1, dx);
    }

    /* B = 2 * Q   where
     *  X(B) = bx/bz
     *  X(Q) = (t3+t4)/(t3-t4)
     * clobbers t1 and t2, preserves t3 and t4  */
    public static mont_dbl(t1, t2, t3, t4, bx, bz) {
        Curve25519.sqr(t1, t3);
        Curve25519.sqr(t2, t4);
        Curve25519.mul(bx, t1, t2);
        Curve25519.sub(t2, t1, t2);
        Curve25519.mul_small(bz, t2, 121665);
        Curve25519.add(t1, t1, bz);
        Curve25519.mul(bz, t1, t2);
    }

    /* Y^2 = X^3 + 486662 X^2 + X
     * t is a temporary  */
    public static x_to_y2(t, y2, x) {
        Curve25519.sqr(t, x);
        Curve25519.mul_small(y2, x, 486662);
        Curve25519.add(t, t, y2);
        Curve25519.add(t, t, Curve25519.C1);
        Curve25519.mul(y2, t, x);
    }

    /* P = kG   and  s = sign(P)/k  */
    public static core(Px, s, k, Gx) {
        let dx = Curve25519.createUnpackedArray();
        let t1 = Curve25519.createUnpackedArray();
        let t2 = Curve25519.createUnpackedArray();
        let t3 = Curve25519.createUnpackedArray();
        let t4 = Curve25519.createUnpackedArray();
        let x = [Curve25519.createUnpackedArray(), Curve25519.createUnpackedArray()];
        let z = [Curve25519.createUnpackedArray(), Curve25519.createUnpackedArray()];
        let i, j;

        /* unpack the base */
        if (Gx !== null)
            Curve25519.unpack(dx, Gx);
        else
            Curve25519.set(dx, 9);

        /* 0G = point-at-infinity */
        Curve25519.set(x[0], 1);
        Curve25519.set(z[0], 0);

        /* 1G = G */
        Curve25519.cpy(x[1], dx);
        Curve25519.set(z[1], 1);

        for (i = 32; i-- !== 0;) {
            for (j = 8; j-- !== 0;) {
                /* swap arguments depending on bit */
                let bit1 = (k[i] & 0xFF) >> j & 1;
                let bit0 = ~(k[i] & 0xFF) >> j & 1;
                let ax = x[bit0];
                let az = z[bit0];
                let bx = x[bit1];
                let bz = z[bit1];

                /* a' = a + b	*/
                /* b' = 2 b	*/
                Curve25519.mont_prep(t1, t2, ax, az);
                Curve25519.mont_prep(t3, t4, bx, bz);
                Curve25519.mont_add(t1, t2, t3, t4, ax, az, dx);
                Curve25519.mont_dbl(t1, t2, t3, t4, bx, bz);
            }
        }

        Curve25519.recip(t1, z[0], 0);
        Curve25519.mul(dx, x[0], t1);

        Curve25519.pack(dx, Px);

        /* calculate s such that s abs(P) = G  .. assumes G is std base point */
        if (s !== null) {
            Curve25519.x_to_y2(t2, t1, dx); /* t1 = Py^2  */
            Curve25519.recip(t3, z[1], 0); /* where Q=P+G ... */
            Curve25519.mul(t2, x[1], t3); /* t2 = Qx  */
            Curve25519.add(t2, t2, dx); /* t2 = Qx + Px  */
            Curve25519.add(t2, t2, Curve25519.C486671); /* t2 = Qx + Px + Gx + 486662  */
            Curve25519.sub(dx, dx, Curve25519.C9); /* dx = Px - Gx  */
            Curve25519.sqr(t3, dx); /* t3 = (Px - Gx)^2  */
            Curve25519.mul(dx, t2, t3); /* dx = t2 (Px - Gx)^2  */
            Curve25519.sub(dx, dx, t1); /* dx = t2 (Px - Gx)^2 - Py^2  */
            Curve25519.sub(dx, dx, Curve25519.C39420360); /* dx = t2 (Px - Gx)^2 - Py^2 - Gy^2  */
            Curve25519.mul(t1, dx, Curve25519.BASE_R2Y); /* t1 = -Py  */

            if (Curve25519.is_negative(t1) !== 0)    /* sign is 1, so just copy  */
                Curve25519.cpy32(s, k);
            else            /* sign is -1, so negate  */
                Curve25519.mula_small(s, Curve25519.ORDER_TIMES_8, 0, k, 32, -1);

            /* reduce s mod q
             * (is this needed?  do it just in case, it's fast anyway) */
            //divmod((dstptr) t1, s, 32, order25519, 32);

            /* take reciprocal of s mod q */
            let temp1 = new Array(32);
            let temp2 = new Array(64);
            let temp3 = new Array(64);
            Curve25519.cpy32(temp1, Curve25519.ORDER);
            Curve25519.cpy32(s, Curve25519.egcd32(temp2, temp3, s, temp1));
            if ((s[31] & 0x80) !== 0)
                Curve25519.mula_small(s, s, 0, Curve25519.ORDER, 32, 1);

        }
    }

}
