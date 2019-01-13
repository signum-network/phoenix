/*
* Copyright 2018 PoC-Consortium
*/

/********* DIGITAL SIGNATURES *********/

/* deterministic EC-KCDSA
 *
 *    s is the private key for signing
 *    P is the corresponding public key
 *    Z is the context data (signer public key or certificate, etc)
 *
 * signing:
 *
 *    m = hash(Z, message)
 *    x = hash(m, s)
 *    keygen25519(Y, NULL, x);
 *    r = hash(Y);
 *    h = m XOR r
 *    sign25519(v, h, x, s);
 *
 *    output (v,r) as the signature
 *
 * verification:
 *
 *    m = hash(Z, message);
 *    h = m XOR r
 *    verify25519(Y, v, h, P)
 *
 *    confirm  r === hash(Y)
 *
 * It would seem to me that it would be simpler to have the signer directly do
 * h = hash(m, Y) and send that to the recipient instead of r, who can verify
 * the signature by checking h === hash(m, Y).  If there are any problems with
 * such a scheme, please let me know.
 *
 * Also, EC-KCDSA (like most DS algorithms) picks x random, which is a waste of
 * perfectly good entropy, but does allow Y to be calculated in advance of (or
 * parallel to) hashing the message.
 */

/* Signature generation primitive, calculates (x-h)s mod q
 *   h  [in]  signature hash (of message, signature pub key, and context data)
 *   x  [in]  signature private key
 *   s  [in]  private key for signing
 * returns signature value on success, undefined on failure (use different x or h)
 */

import { Curve25519 } from "./curve25519";

export class ECKCDSA {

    public static sign(h, x, s) {
        // v = (x - h) s  mod q
        let w, i;
        let h1 = new Array(32)
        let x1 = new Array(32);
        let tmp1 = new Array(64);
        let tmp2 = new Array(64);

        // Don't clobber the arguments, be nice!
        Curve25519.cpy32(h1, h);
        Curve25519.cpy32(x1, x);

        // Reduce modulo group order
        let tmp3 = new Array(32);
        Curve25519.divmod(tmp3, h1, 32, Curve25519.ORDER, 32);
        Curve25519.divmod(tmp3, x1, 32, Curve25519.ORDER, 32);

        // v = x1 - h1
        // If v is negative, add the group order to it to become positive.
        // If v was already positive we don't have to worry about overflow
        // when adding the order because v < ORDER and 2*ORDER < 2^256
        let v = new Array(32);
        Curve25519.mula_small(v, x1, 0, h1, 32, -1);
        Curve25519.mula_small(v, v , 0, Curve25519.ORDER, 32, 1);

        // tmp1 = (x-h)*s mod q
        Curve25519.mula32(tmp1, v, s, 32, 1);
        Curve25519.divmod(tmp2, tmp1, 64, Curve25519.ORDER, 32);

        for (w = 0, i = 0; i < 32; i++)
            w |= v[i] = tmp1[i];

        return w !== 0 ? v : undefined;
    }

    /* Signature verification primitive, calculates Y = vP + hG
     *   v  [in]  signature value
     *   h  [in]  signature hash
     *   P  [in]  public key
     *   Returns signature public key
     */
    public static verify(v, h, P) {
        /* Y = v abs(P) + h G  */
        let d = new Array(32);
        let p = [Curve25519.createUnpackedArray(), Curve25519.createUnpackedArray()];
        let s = [Curve25519.createUnpackedArray(), Curve25519.createUnpackedArray()];
        let yx = [Curve25519.createUnpackedArray(), Curve25519.createUnpackedArray(), Curve25519.createUnpackedArray()];
        let yz = [Curve25519.createUnpackedArray(), Curve25519.createUnpackedArray(), Curve25519.createUnpackedArray()];
        let t1 = [Curve25519.createUnpackedArray(), Curve25519.createUnpackedArray(), Curve25519.createUnpackedArray()];
        let t2 = [Curve25519.createUnpackedArray(), Curve25519.createUnpackedArray(), Curve25519.createUnpackedArray()];

        let vi = 0, hi = 0, di = 0, nvh = 0, i, j, k;

        /* set p[0] to G and p[1] to P  */

        Curve25519.set(p[0], 9);
        Curve25519.unpack(p[1], P);

        /* set s[0] to P+G and s[1] to P-G  */

        /* s[0] = (Py^2 + Gy^2 - 2 Py Gy)/(Px - Gx)^2 - Px - Gx - 486662  */
        /* s[1] = (Py^2 + Gy^2 + 2 Py Gy)/(Px - Gx)^2 - Px - Gx - 486662  */

        Curve25519.x_to_y2(t1[0], t2[0], p[1]); /* t2[0] = Py^2  */
        Curve25519.sqrt(t1[0], t2[0]); /* t1[0] = Py or -Py  */
        j = Curve25519.is_negative(t1[0]); /*      ... check which  */
        Curve25519.add(t2[0], t2[0], Curve25519.C39420360); /* t2[0] = Py^2 + Gy^2  */
        Curve25519.mul(t2[1], Curve25519.BASE_2Y, t1[0]); /* t2[1] = 2 Py Gy or -2 Py Gy  */
        Curve25519.sub(t1[j], t2[0], t2[1]); /* t1[0] = Py^2 + Gy^2 - 2 Py Gy  */
        Curve25519.add(t1[1 - j], t2[0], t2[1]); /* t1[1] = Py^2 + Gy^2 + 2 Py Gy  */
        Curve25519.cpy(t2[0], p[1]); /* t2[0] = Px  */
        Curve25519.sub(t2[0], t2[0], Curve25519.C9); /* t2[0] = Px - Gx  */
        Curve25519.sqr(t2[1], t2[0]); /* t2[1] = (Px - Gx)^2  */
        Curve25519.recip(t2[0], t2[1], 0); /* t2[0] = 1/(Px - Gx)^2  */
        Curve25519.mul(s[0], t1[0], t2[0]); /* s[0] = t1[0]/(Px - Gx)^2  */
        Curve25519.sub(s[0], s[0], p[1]); /* s[0] = t1[0]/(Px - Gx)^2 - Px  */
        Curve25519.sub(s[0], s[0], Curve25519.C486671); /* s[0] = X(P+G)  */
        Curve25519.mul(s[1], t1[1], t2[0]); /* s[1] = t1[1]/(Px - Gx)^2  */
        Curve25519.sub(s[1], s[1], p[1]); /* s[1] = t1[1]/(Px - Gx)^2 - Px  */
        Curve25519.sub(s[1], s[1], Curve25519.C486671); /* s[1] = X(P-G)  */
        Curve25519.mul_small(s[0], s[0], 1); /* reduce s[0] */
        Curve25519.mul_small(s[1], s[1], 1); /* reduce s[1] */

        /* prepare the chain  */
        for (i = 0; i < 32; i++) {
            vi = (vi >> 8) ^ (v[i] & 0xFF) ^ ((v[i] & 0xFF) << 1);
            hi = (hi >> 8) ^ (h[i] & 0xFF) ^ ((h[i] & 0xFF) << 1);
            nvh = ~(vi ^ hi);
            di = (nvh & (di & 0x80) >> 7) ^ vi;
            di ^= nvh & (di & 0x01) << 1;
            di ^= nvh & (di & 0x02) << 1;
            di ^= nvh & (di & 0x04) << 1;
            di ^= nvh & (di & 0x08) << 1;
            di ^= nvh & (di & 0x10) << 1;
            di ^= nvh & (di & 0x20) << 1;
            di ^= nvh & (di & 0x40) << 1;
            d[i] = di & 0xFF;
        }

        di = ((nvh & (di & 0x80) << 1) ^ vi) >> 8;

        /* initialize state */
        Curve25519.set(yx[0], 1);
        Curve25519.cpy(yx[1], p[di]);
        Curve25519.cpy(yx[2], s[0]);
        Curve25519.set(yz[0], 0);
        Curve25519.set(yz[1], 1);
        Curve25519.set(yz[2], 1);

        /* y[0] is (even)P + (even)G
         * y[1] is (even)P + (odd)G  if current d-bit is 0
         * y[1] is (odd)P + (even)G  if current d-bit is 1
         * y[2] is (odd)P + (odd)G
         */

        vi = 0;
        hi = 0;

        /* and go for it! */
        for (i = 32; i-- !== 0;) {
            vi = (vi << 8) | (v[i] & 0xFF);
            hi = (hi << 8) | (h[i] & 0xFF);
            di = (di << 8) | (d[i] & 0xFF);

            for (j = 8; j-- !== 0;) {
                Curve25519.mont_prep(t1[0], t2[0], yx[0], yz[0]);
                Curve25519.mont_prep(t1[1], t2[1], yx[1], yz[1]);
                Curve25519.mont_prep(t1[2], t2[2], yx[2], yz[2]);

                k = ((vi ^ vi >> 1) >> j & 1)
                    + ((hi ^ hi >> 1) >> j & 1);
                Curve25519.mont_dbl(yx[2], yz[2], t1[k], t2[k], yx[0], yz[0]);

                k = (di >> j & 2) ^ ((di >> j & 1) << 1);
                Curve25519.mont_add(t1[1], t2[1], t1[k], t2[k], yx[1], yz[1],
                    p[di >> j & 1]);

                Curve25519.mont_add(t1[2], t2[2], t1[0], t2[0], yx[2], yz[2],
                    s[((vi ^ hi) >> j & 2) >> 1]);
            }
        }

        k = (vi & 1) + (hi & 1);
        Curve25519.recip(t1[0], yz[k], 0);
        Curve25519.mul(t1[1], yx[k], t1[0]);

        let Y = [];
        Curve25519.pack(t1[1], Y);
        return Y;
    }

    /* Key-pair generation
     *   P  [out] your public key
     *   s  [out] your private key for signing
     *   k  [out] your private key for key agreement
     *   k  [in]  32 random bytes
     * s may be NULL if you don't care
     *
     * WARNING: if s is not NULL, this function has data-dependent timing */
    public static keygen(k) {
        let P = [];
        let s = [];
        k = k || [];
        Curve25519.clamp(k);
        Curve25519.core(P, s, k, null);
        return { p: P, s: s, k: k };
    }


    /*
    * Get private key for encryption
    */
    public static clamp(k) {
        Curve25519.clamp(k);
        return k;
    }

    /*
    * Get shared key for encryption
    */
    public static sharedkey(privateKey, publicKey) {
        let P = [];
        Curve25519.core(P, null, privateKey, publicKey);
        return P;
    }

}
