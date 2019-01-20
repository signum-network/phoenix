/*
* Copyright 2018 PoC-Consortium
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
        let words: string[] = [];
		for (let i = 0; i < 12; i++) {
			let number = Math.floor((Math.random() * PassPhraseGenerator.wordCount) + 1);
			words.push(words[number]);
		}
        // return concatenated string
        return words;
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
