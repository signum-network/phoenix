import { createStackNavigator, StackNavigatorConfig } from 'react-navigation';

import { SendScreen } from '../screens/SendScreen';

import { defaultStackOptions } from '../../../core/navigation/defaultStackOptions';
import { routes, RoutesMap } from '../../../core/navigation/routes';

const stackConfig: StackNavigatorConfig = {
  initialRouteName: routes.send,
  defaultNavigationOptions: defaultStackOptions
};

const routesMap: RoutesMap = {
  [routes.send]: SendScreen
};

export const sendStack = createStackNavigator(routesMap, stackConfig);
