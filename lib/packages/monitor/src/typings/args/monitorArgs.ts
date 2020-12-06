import {Logger} from '../logger';

interface KeyArgs {
    key: string;
}

interface FulfilledArgs<T> extends KeyArgs {
    data: T;
}

export type FetchFunction<T = any> = () => Promise<T>;
export type PredicateFunction<T = any> = (fetchData: T) => boolean;
export type TimeoutFunction = (args: KeyArgs) => void;
export type FulfilledFunction<T = any> = (args: FulfilledArgs<T>) => void;

export interface MonitorArgs<T> {
    key: string;
    intervalSecs: number;
    timeoutSecs: number;
    logger?: Logger;
    asyncFetcherFn: FetchFunction<T>;
    compareFn: PredicateFunction<T>;
}
