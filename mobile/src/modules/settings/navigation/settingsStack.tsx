import * as React from 'react';
import { createStackNavigator, StackNavigatorConfig } from 'react-navigation';
import { tabbarIcons } from '../../../assets/icons';
import { TabBarIcon } from '../../../core/components/tabbar/TabBarIcon';
import { defaultStackOptions } from '../../../core/navigation/defaultStackOptions';
import { routes, RoutesMap } from '../../../core/navigation/routes';
import { SettingsScreen } from '../screens/SettingsScreen';

const stackConfig: StackNavigatorConfig = {
  initialRouteName: routes.settings,
  navigationOptions: {
    tabBarIcon: (options) => <TabBarIcon source={tabbarIcons.settings} {...options} />
  },
  defaultNavigationOptions: defaultStackOptions
};

const routesMap: RoutesMap = {
  [routes.settings]: SettingsScreen
};

export const settingsStack = createStackNavigator(routesMap, stackConfig);
