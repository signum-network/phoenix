import { NavigationRouteConfig } from 'react-navigation';

// we need to describe interface to get proper type-hinting
export interface Routes {
  accounts: string;
  addAccount: string;
  createAccount: string;
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
  createAccount: 'createAccount'
};
