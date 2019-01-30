import {
  BottomTabNavigatorConfig,
  createBottomTabNavigator,
  NavigationContainer
} from 'react-navigation';
import { authStack } from '../../modules/auth/navigation/authStack';
import { routes, RoutesMap } from './routes';

const routesMap: RoutesMap = {
  [routes.accounts]: authStack
};

const rootTabStackConfig: BottomTabNavigatorConfig = {
  initialRouteName: routes.accounts
};

export const rootTabStack: NavigationContainer = createBottomTabNavigator(
  routesMap,
  rootTabStackConfig
);
