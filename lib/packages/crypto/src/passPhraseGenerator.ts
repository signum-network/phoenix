/**
 * Original work Copyright (c) 2018 PoC-Consortium  
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

import * as seedrandom from "seedrandom";
import { words } from "./words";
 
export class PassPhraseGenerator {

    private static readonly wordCount: number = words.length;

    private seed: any[];

    constructor() {
        seedrandom();
        this.seed = [];
    }

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

	public reSeed(seed) {
		this.seed = seed;
    }

    /*
    * Generate a passphrase with the help of the PassPhraseGenerator
    * pass optional seed for seeding generation
    */
    public generatePassPhrase(seed: any[] = []): Promise<string[]> {
        return new Promise((resolve, reject) => {
            this.reSeed(seed);
            resolve(this.generate());
        });
    }
}
