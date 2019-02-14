import { createStackNavigator, StackNavigatorConfig } from 'react-navigation';
import { defaultStackOptions } from '../../../core/navigation/defaultStackOptions';
import { routes, RoutesMap } from '../../../core/navigation/routes';
import { AccountsScreen } from '../screens/AccountsScreen';
import { AddAccountScreen } from '../screens/AddAccountScreen';
import { CreateAccountScreen } from '../screens/CreateAccountScreen';

const stackConfig: StackNavigatorConfig = {
  initialRouteName: routes.accounts,
  defaultNavigationOptions: defaultStackOptions
};

const routesMap: RoutesMap = {
  [routes.accounts]: AccountsScreen,
  [routes.addAccount]: AddAccountScreen,
  [routes.createAccount]: CreateAccountScreen
};

export const authStack = createStackNavigator(routesMap, stackConfig);
