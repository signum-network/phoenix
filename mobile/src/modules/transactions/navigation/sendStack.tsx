import * as React from 'react';
import { createStackNavigator, StackNavigatorConfig } from 'react-navigation';
import { tabbarIcons } from '../../../assets/icons';
import { TabBarIcon } from '../../../core/components/tabbar/TabBarIcon';
import { defaultStackOptions } from '../../../core/navigation/defaultStackOptions';
import { routes, RoutesMap } from '../../../core/navigation/routes';
import { SendScreen } from '../screens/SendScreen';

const stackConfig: StackNavigatorConfig = {
  initialRouteName: routes.send,
  navigationOptions: {
    tabBarIcon: (options) => <TabBarIcon source={tabbarIcons.send} {...options} />
  },
  defaultNavigationOptions: defaultStackOptions
};

const routesMap: RoutesMap = {
  [routes.send]: SendScreen
};

export const sendStack = createStackNavigator(routesMap, stackConfig);
