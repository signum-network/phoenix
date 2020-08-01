import * as React from 'react';
import { createStackNavigator, StackNavigatorConfig } from 'react-navigation';
import { tabbarIcons } from '../../../assets/icons';
import { TabBarIcon } from '../../../core/components/tabbar/TabBarIcon';
import { defaultStackOptions } from '../../../core/navigation/defaultStackOptions';
import { routes, RoutesMap } from '../../../core/navigation/routes';
import { AccountDetailsScreen } from '../screens/AccountDetailsScreen';
import { AddAccountScreen } from '../screens/AddAccountScreen';
import { CreateAccountScreen } from '../screens/CreateAccountScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ImportAccountScreen } from '../screens/ImportAccountScreen';
import { TransactionDetailsScreen } from '../screens/TransactionDetailsScreen';

const stackConfig: StackNavigatorConfig = {
  initialRouteName: routes.home,
  navigationOptions: {
    tabBarIcon: (options) => <TabBarIcon source={tabbarIcons.home} {...options} />
  },
  defaultNavigationOptions: defaultStackOptions
};

const routesMap: RoutesMap = {
  [routes.home]: HomeScreen,
  [routes.addAccount]: AddAccountScreen,
  [routes.createAccount]: CreateAccountScreen,
  [routes.importAccount]: ImportAccountScreen,
  [routes.accountDetails]: AccountDetailsScreen,
  [routes.transactionDetails]: TransactionDetailsScreen
};

export const mainStack = createStackNavigator(routesMap, stackConfig);
