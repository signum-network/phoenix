import { NavigationRouteConfig } from 'react-navigation';

// we have to describe interface to get proper type-hinting
export interface Routes {
  accounts: string;
  addAccount: string;
  createAccount: string;
  importAccount: string;
  home: string;
  send: string;
  receive: string;
  viewQRCode: string;
  accountDetails: string;
  settings: string;
}

export type RoutesMap = {
  [key in keyof Partial<Routes>]: NavigationRouteConfig
};

/**
 * List of all in-app routes
 */
export const routes: Routes = {
  accounts: 'accounts',
  addAccount: 'addAccount',
  createAccount: 'createAccount',
  importAccount: 'importAccount',
  home: 'home',
  send: 'send',
  receive: 'receive',
  viewQRCode: 'viewQRCode',
  accountDetails: 'accountDetails',
  settings: 'settings'
};
