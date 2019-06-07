export declare class PassPhraseGenerator {
    private static readonly wordCount;
    private seed;
    constructor();
    generate(): string[];
    reSeed(seed: any): void;
    generatePassPhrase(seed?: any[]): Promise<string[]>;
}
