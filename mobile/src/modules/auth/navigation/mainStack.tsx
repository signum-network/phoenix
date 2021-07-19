import {Transaction} from '@signumjs/core';
import {DeeplinkParts} from '@signumjs/util';
import {ReceiveAmountPayload} from '../../transactions/store/actions';

export type RootStackParamList = {
    Home: {};
    Receive: {
        accountRS?: string;
    };
    send: {
        accountRS?: string;
        payload?: DeeplinkParts;
    };
    AddAccount: {};
    CreateAccount: {};
    Settings: {};
    Scan: {
        form: ReceiveAmountPayload
    };
    TransactionDetails: {
        transaction: Transaction;
    };
    AccountDetails: {
        account?: string;
    };
    ViewQRCode: {
        form?: any;
    };
};

