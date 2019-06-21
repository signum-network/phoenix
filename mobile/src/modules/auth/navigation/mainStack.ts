import { createStackNavigator, StackNavigatorConfig } from 'react-navigation';

import { AccountsScreen } from '../screens/AccountsScreen';
import { AddAccountScreen } from '../screens/AddAccountScreen';
import { CreateAccountScreen } from '../screens/CreateAccountScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ImportAccountScreen } from '../screens/ImportAccountScreen';

import { defaultStackOptions } from '../../../core/navigation/defaultStackOptions';
import { routes, RoutesMap } from '../../../core/navigation/routes';
import { AccountDetailsScreen } from '../screens/AccountDetailsScreen';

const stackConfig: StackNavigatorConfig = {
  initialRouteName: routes.home,
  defaultNavigationOptions: defaultStackOptions
};

const routesMap: RoutesMap = {
  [routes.home]: HomeScreen,
  [routes.accounts]: AccountsScreen,
  [routes.addAccount]: AddAccountScreen,
  [routes.createAccount]: CreateAccountScreen,
  [routes.importAccount]: ImportAccountScreen,
  [routes.accountDetails]: AccountDetailsScreen
};

export const mainStack = createStackNavigator(routesMap, stackConfig);
