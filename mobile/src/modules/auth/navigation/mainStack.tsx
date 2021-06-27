import { Transaction } from '@burstjs/core';
import { ReceiveAmountPayload } from '../../transactions/store/actions';

export type RootStackParamList = {
  Home: {};
  Receive: {
    accountRS?: string;
  };
  send: {
    accountRS?: string;
    url?: string;
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

