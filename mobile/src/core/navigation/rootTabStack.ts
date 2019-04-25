import {
  BottomTabNavigatorConfig,
  createBottomTabNavigator,
  NavigationContainer
} from 'react-navigation';
import { routes, RoutesMap } from './routes';
import { mainStack } from '../../modules/auth/navigation/mainStack';

const routesMap: RoutesMap = {
  [routes.home]: mainStack,
  [routes.send]: mainStack,
  [routes.receive]: mainStack
};

const rootTabStackConfig: BottomTabNavigatorConfig = {
  initialRouteName: routes.home
};

export const rootTabStack: NavigationContainer = createBottomTabNavigator(
  routesMap,
  rootTabStackConfig
);
