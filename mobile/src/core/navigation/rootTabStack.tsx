import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  BottomTabNavigatorConfig,
  createBottomTabNavigator,
  NavigationContainer
} from 'react-navigation';
import { mainStack } from '../../modules/auth/navigation/mainStack';
import { receiveStack } from '../../modules/transactions/navigation/receiveStack';
import { sendStack } from '../../modules/transactions/navigation/sendStack';
import { Colors } from '../theme/colors';
import { routes, RoutesMap } from './routes';

const routesMap: RoutesMap = {
  [routes.home]: mainStack,
  [routes.send]: sendStack,
  [routes.receive]: receiveStack
};

const rootTabStackConfig: BottomTabNavigatorConfig = {
  initialRouteName: routes.home,
  // defaultNavigationOptions: ({ navigation }) => ({
  //   tabBarIcon: ({ focused }) => {
  //     const { routeName } = navigation.state;
  //     const IconComponent = Ionicons;
  //     let iconName = '';
  //     if (routeName === 'home') {
  //       iconName = `ios-information-circle${focused ? '' : '-outline'}`;
  //     } else if (routeName === 'Settings') {
  //       iconName = `ios-options`;
  //     }

  //     // You can return any component that you like here!
  //     return <IconComponent name={iconName} size={25} color={Colors.WHITE} />;
  //   }
  // }),
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
