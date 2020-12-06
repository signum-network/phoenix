/**
 * Copyright (c) 2020 Burst Apps Team
 */

/**
 * Storage interface for LocalStorage
 * https://developer.mozilla.org/en-US/docs/Web/API/Storage
 * @module monitor
 */
export interface LocalStorage {
    length: number;
    setItem: (key: string, value: any) => void;
    getItem: (key: string) => any | null;
    removeItem: (key: string) => void;
    key: (n: number) => any | null;
    clear: () => void;
}
