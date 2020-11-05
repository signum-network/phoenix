import { Transaction } from "@burstjs/core/src/typings/transaction";
import { ReceiveBurstPayload } from "../../transactions/store/actions";

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
    form: ReceiveBurstPayload
  };
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
