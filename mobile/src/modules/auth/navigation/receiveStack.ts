import { createStackNavigator, StackNavigatorConfig } from 'react-navigation';

import { defaultStackOptions } from '../../../core/navigation/defaultStackOptions';
import { routes, RoutesMap } from '../../../core/navigation/routes';
import { ReceiveScreen } from '../screens/ReceiveScreen';

const stackConfig: StackNavigatorConfig = {
  initialRouteName: routes.receive,
  defaultNavigationOptions: defaultStackOptions
};

const routesMap: RoutesMap = {
  [routes.receive]: ReceiveScreen
};

export const receiveStack = createStackNavigator(routesMap, stackConfig);
