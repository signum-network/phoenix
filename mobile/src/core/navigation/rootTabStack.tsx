import {
  BottomTabNavigatorConfig,
  createBottomTabNavigator,
  NavigationContainer
} from 'react-navigation';
import { mainStack } from '../../modules/auth/navigation/mainStack';
import { receiveStack } from '../../modules/transactions/navigation/receiveStack';
import { sendStack } from '../../modules/transactions/navigation/sendStack';
import { routes, RoutesMap } from './routes';

const routesMap: RoutesMap = {
  [routes.home]: mainStack,
  [routes.send]: sendStack,
  [routes.receive]: receiveStack
};

const rootTabStackConfig: BottomTabNavigatorConfig = {
  initialRouteName: routes.home
};

export const rootTabStack: NavigationContainer = createBottomTabNavigator(
  routesMap,
  rootTabStackConfig
);