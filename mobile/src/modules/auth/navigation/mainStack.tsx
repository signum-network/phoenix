import { Transaction } from "@burstjs/core/src/typings/transaction";

export type RootStackParamList = {
  Home: {};
  Receive: {
    accountRS?: string;
  };
  Send: {
    accountRS?: string;
  };
  AddAccount: {};
  CreateAccount: {};
  Settings: {};
  Scan: {};
  TransactionDetails: {
    transaction: Transaction;
  };
  AccountDetails: {
    accountRS?: string;
  };
  ViewQRCode: {
    form?: any;
  };
}
