import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {tabbarIcons} from '../../../assets/icons';
import {TabBarIcon} from '../../../core/components/tabbar/TabBarIcon';
import {defaultStackOptions} from '../../../core/navigation/defaultStackOptions';
import {routes} from '../../../core/navigation/routes';
import {ReceiveScreen} from '../screens/ReceiveScreen';
import {ViewQRCodeScreen} from '../screens/ViewQRCodeScreen';

/*const stackConfig: StackNavigatorConfig = {
  navigationOptions: {
    tabBarIcon: (options) => (
      <TabBarIcon source={tabbarIcons.receive} {...options} />
    ),
  },
};*/

const Stack = createStackNavigator();

export const sendStack = () => (
  <Stack.Navigator
    initialRouteName={routes.receive}
    screenOptions={defaultStackOptions}>
    <Stack.Screen name={routes.receive} component={ReceiveScreen} />
    <Stack.Screen name={routes.viewQRCode} component={ViewQRCodeScreen} />
  </Stack.Navigator>
);
