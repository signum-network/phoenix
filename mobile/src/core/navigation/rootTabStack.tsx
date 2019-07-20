import {
  BottomTabNavigatorConfig,
  createBottomTabNavigator,
  NavigationContainer
} from 'react-navigation';
import { mainStack } from '../../modules/auth/navigation/mainStack';
import { settingsStack } from '../../modules/settings/navigation/settingsStack';
import { receiveStack } from '../../modules/transactions/navigation/receiveStack';
import { sendStack } from '../../modules/transactions/navigation/sendStack';
import { Colors } from '../theme/colors';
import { routes, RoutesMap } from './routes';

const routesMap: RoutesMap = {
  [routes.home]: mainStack,
  [routes.send]: sendStack,
  [routes.receive]: receiveStack,
  [routes.settings]: settingsStack
};

const rootTabStackConfig: BottomTabNavigatorConfig = {
  initialRouteName: routes.home,
  tabBarOptions: {
    activeTintColor: Colors.WHITE,
    activeBackgroundColor: Colors.BLUE,
    inactiveTintColor: Colors.WHITE,
    inactiveBackgroundColor: Colors.BLUE
  }
};

export const rootTabStack: NavigationContainer = createBottomTabNavigator(
  routesMap,
  rootTabStackConfig
);
