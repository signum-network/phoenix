import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import * as React from 'react';
import {tabbarIcons} from '../../../assets/icons';
import {TabBarIcon} from '../../../core/components/tabbar/TabBarIcon';
import {defaultStackOptions} from '../../../core/navigation/defaultStackOptions';
import {routes} from '../../../core/navigation/routes';
import {ScanQRCodeScreen} from '../screens/ScanQRCodeScreen';
import {SendScreen} from '../screens/SendScreen';

/*const stackConfig: StackNavigationOptions = {
  tabBarIcon: (options) => (
    <TabBarIcon source={tabbarIcons.send} {...options} />
  ),
};*/

const Stack = createStackNavigator();

export const sendStack = () => (
  <Stack.Navigator
    initialRouteName={routes.send}
    screenOptions={defaultStackOptions}>
    <Stack.Screen name={routes.send} component={SendScreen} />
    <Stack.Screen name={routes.scan} component={ScanQRCodeScreen} />
  </Stack.Navigator>
);
