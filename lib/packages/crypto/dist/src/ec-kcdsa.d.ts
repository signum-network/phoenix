export declare class ECKCDSA {
    static sign(h: any, x: any, s: any): any[];
    static verify(v: any, h: any, P: any): any[];
    static keygen(k: any): {
        p: any[];
        s: any[];
        k: any;
    };
    static clamp(k: any): any;
    static sharedkey(privateKey: any, publicKey: any): any[];
}
