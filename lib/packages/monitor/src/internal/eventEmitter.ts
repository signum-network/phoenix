/* global window */
import {isNode} from './isNode';

export class EventEmitter {
    private readonly _emitter: any;

    constructor() {
        if (isNode()) {
            // @ts-ignore
            const Events = require('events');
            this._emitter = new Events();
        } else {
            this._emitter = {
                on: (name: string | symbol, cb: Function) => {
                    // @ts-ignore
                    window.addEventListener(name, cb);
                },
                once: (name: string | symbol, cb: Function) => {
                    const singleCallback = (data) => {
                        cb(data);
                    };
                    // @ts-ignore
                    window.addEventListener(name, (data) => {
                        singleCallback(data);
                        // @ts-ignore
                        window.removeEventListener(name, singleCallback);
                    });
                },
                off: (name: string | symbol, cb: Function) => {
                    // @ts-ignore
                    window.removeEventListener(name, cb);
                },
                emit: (name: string | symbol, payload: object) => {
                    // @ts-ignore
                    window.dispatchEvent(new window.CustomEvent(name, payload));
                },
            };
        }
    }

    public off(eventName: string | symbol, fn: Function): void {
        this._emitter.off(eventName, fn);
    }

    public on(eventName: string | symbol, fn: Function): void {
        this._emitter.on(eventName, fn);
    }

    public once(eventName: string | symbol, fn: Function): void {
        this._emitter.once(eventName, fn);
    }

    public emit(eventName: string | symbol, payload: object) {
        this._emitter.emit(eventName, payload);
    }
}
