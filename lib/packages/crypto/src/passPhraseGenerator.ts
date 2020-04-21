/* tslint:disable */
/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

import * as _seedrandom from 'seedrandom';
import { words } from './words';

const seedrandom = (_seedrandom as any).default || _seedrandom;

/**
 * A secure random passphrase generator
 *
 * @note For secure randomization [seedrandom](https://www.npmjs.com/package/seedrandom) is used.
 *
 * @module crypto
 */
export class PassPhraseGenerator {

    private static readonly wordCount: number = words.length;

    private seed: any[];

    constructor() {
        seedrandom();
        this.seed = [];
    }

    /**
     * Generates a passphrase based on priory set
     * @return The _secret_ twelve-worded passphrase
     */
	public generate(): string[] {
        // seed with given seed if seed was given, yep
        this.seed.map(element => seedrandom(element, { "entropy": true, "global":true }));

        // get random words
        let randomWords: string[] = [];
		for (let i = 0; i < 12; i++) {
			let number = Math.floor((Math.random() * PassPhraseGenerator.wordCount) + 1);
			randomWords.push(words[number]);
		}
        // return concatenated string
        return randomWords;
	}

    /**
     * Sets a new seed for generation
     * @param seed
     */
	public reSeed(seed) {
		this.seed = seed;
    }

    /**
     * Creates a secure randomized passphrase
     * @param seed An arbitrary array of elements used for seeding
     * @return The _secret_ twelve-worded passphrase
     */
    public generatePassPhrase(seed: any[] = []): Promise<string[]> {
        return new Promise((resolve, reject) => {
            this.reSeed(seed);
            resolve(this.generate());
        });
    }
}
