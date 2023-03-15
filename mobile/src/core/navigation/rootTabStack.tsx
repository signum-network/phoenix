import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {mainStack} from '../../modules/auth/navigation/mainStack';
import {settingsStack} from '../../modules/settings/navigation/settingsStack';
import {receiveStack} from '../../modules/transactions/navigation/receiveStack';
import {sendStack} from '../../modules/transactions/navigation/sendStack';
import {Colors} from '../theme/colors';
import {fonts} from '../theme/fonts';
import {routes, RoutesMap} from './routes';

const routesMap: RoutesMap = {
  [routes.home]: mainStack,
  [routes.send]: sendStack,
  [routes.receive]: receiveStack,
  [routes.settings]: settingsStack,
};

const rootTabStackConfig: BottomTabNavigationOptions = {
  tabBarActiveTintColor: Colors.WHITE,
  tabBarActiveBackgroundColor: Colors.BLUE_DARKER,
  tabBarInactiveTintColor: Colors.GREY,
  tabBarInactiveBackgroundColor: Colors.BLUE_DARKER,
  tabBarLabelStyle: {
    textTransform: 'uppercase',
    fontFamily: fonts.bebas,
  },
  tabBarStyle: {
    backgroundColor: Colors.BLUE_DARKER,
    borderTopWidth: 0,
  },
};

const BottomTabStack = createBottomTabNavigator();

export const rootTabStack = () => (
  <BottomTabStack.Navigator
    initialRouteName={routes.home}
    screenOptions={rootTabStackConfig}>
    <BottomTabStack.Screen name={routes.home} component={mainStack} />
    <BottomTabStack.Screen name={routes.send} component={sendStack} />
    <BottomTabStack.Screen name={routes.receive} component={receiveStack} />
    <BottomTabStack.Screen name={routes.settings} component={settingsStack} />
  </BottomTabStack.Navigator>
);
