import * as pMemoize from 'p-memoize';
import ExpiryMap from 'expiry-map';
import { memoize } from 'lodash';

interface ExpMemoOptions {
  expiry?: number;
}

const DefaultXMemoOptions: ExpMemoOptions =  {
  expiry: 30_000
};

const expMemo = <R= any>(fn: (...arg: any) => Promise<R>, opts = DefaultXMemoOptions) => {
  const cache = new ExpiryMap(opts.expiry);
  return pMemoize(fn, {cache});
};

const memo = <R= any>(fn: (...arg: any) => Promise<R>) => {
  // @ts-ignore
  return pMemoize(fn);
};

const syncMemo = memoize;

export {
  syncMemo,
  memo,
  expMemo,
};

