import {Transaction} from '@signumjs/core';
import {startCase, toNumber} from 'lodash';
import {getTransactionSubtypeTranslationKey} from './getTransactionTypeTranslationKey';

export const mountTxTypeString = (tx: Transaction): string =>
    startCase(getTransactionSubtypeTranslationKey(toNumber(tx.type), toNumber(tx.subtype)));
