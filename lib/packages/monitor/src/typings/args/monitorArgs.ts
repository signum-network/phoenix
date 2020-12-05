import {Logger} from '../logger';

export type FetchFunction<T = any> = () => Promise<T>;
export type PredicateFunction<T = any> = (fetchData: T) => boolean;

export interface MonitorArgs<T> {
    key: string;
    intervalSecs: number;
    timeoutSecs: number;
    logger?: Logger;
    asyncFetcherFn: FetchFunction<T>;
    compareFn: PredicateFunction<T>;
}
