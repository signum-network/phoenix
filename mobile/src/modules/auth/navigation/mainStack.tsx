import {NavigatorScreenParams} from '@react-navigation/native';
import {Transaction} from '@signumjs/core';
import {DeeplinkParts} from '@signumjs/util';
import {AppReduxState} from '../../../core/store/app/reducer';
import {ReceiveAmountPayload} from '../../transactions/store/actions';
import {AuthReduxState} from '../store/reducer';

export type RootStackParamList = {
  Accounts: undefined;
  AddAccount: undefined;
  CreateAccount: undefined;
  ImportAccount: undefined;
  Settings: undefined;
  TransactionDetails: {
    transaction: Transaction;
  };
  AccountDetails: {
    account?: string;
  };
};

export type SendStackParamList = {
  Send: {
    accountRS?: string;
    payload?: DeeplinkParts;
  };
  Scan: {
    form: ReceiveAmountPayload;
  };
};

export type ReceiveStackParamList = {
  Receive: {
    accountRS?: string;
  };
  ViewQRCode: {
    form?: any;
  };
};

export type BottomTabNavigatorParamList = {
  Home: NavigatorScreenParams<RootStackParamList>;
  SendStack: NavigatorScreenParams<SendStackParamList>;
  ReceiveStack: NavigatorScreenParams<ReceiveStackParamList>;
  Settings: {
    auth: AuthReduxState;
    app: AppReduxState;
  };
};
