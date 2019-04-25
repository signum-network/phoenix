import { createStackNavigator, StackNavigatorConfig } from 'react-navigation';
import { defaultStackOptions } from '../../../core/navigation/defaultStackOptions';
import { routes, RoutesMap } from '../../../core/navigation/routes';
import { SendScreen } from '../screens/SendScreen';
import { ReceiveScreen } from '../screens/ReceiveScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { AccountsScreen } from '../screens/AccountsScreen';
import { AddAccountScreen } from '../screens/AddAccountScreen';
import { CreateAccountScreen } from '../screens/CreateAccountScreen';
import { ImportAccountScreen } from '../screens/ImportAccountScreen';

const stackConfig: StackNavigatorConfig = {
  initialRouteName: routes.home,
  defaultNavigationOptions: defaultStackOptions
};

const routesMap: RoutesMap = {
  [routes.home]: HomeScreen,
  [routes.send]: SendScreen,
  [routes.receive]: ReceiveScreen,
  [routes.accounts]: AccountsScreen,
  [routes.addAccount]: AddAccountScreen,
  [routes.createAccount]: CreateAccountScreen,
  [routes.importAccount]: ImportAccountScreen
  
};

export const mainStack = createStackNavigator(routesMap, stackConfig);
