import * as React from 'react';
import { createStackNavigator, StackNavigatorConfig } from 'react-navigation';
import { tabbarIcons } from '../../../assets/icons';
import { TabBarIcon } from '../../../core/components/tabbar/TabBarIcon';
import { defaultStackOptions } from '../../../core/navigation/defaultStackOptions';
import { routes, RoutesMap } from '../../../core/navigation/routes';
import { ReceiveScreen } from '../screens/ReceiveScreen';

const stackConfig: StackNavigatorConfig = {
  initialRouteName: routes.receive,
  navigationOptions: {
    tabBarIcon: (options) => <TabBarIcon source={tabbarIcons.receive} {...options} />
  },
  defaultNavigationOptions: defaultStackOptions
};

const routesMap: RoutesMap = {
  [routes.receive]: ReceiveScreen
};

export const receiveStack = createStackNavigator(routesMap, stackConfig);
