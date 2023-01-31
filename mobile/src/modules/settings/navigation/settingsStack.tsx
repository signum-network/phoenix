import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {tabbarIcons} from '../../../assets/icons';
import {TabBarIcon} from '../../../core/components/tabbar/TabBarIcon';
import {defaultStackOptions} from '../../../core/navigation/defaultStackOptions';
import {routes} from '../../../core/navigation/routes';
import {SettingsScreen} from '../screens/SettingsScreen';

/*const stackConfig: StackNavigatorConfig = {
  navigationOptions: {
    tabBarIcon: (options) => (
      <TabBarIcon source={tabbarIcons.settings} {...options} />
    ),
  },
};*/

const Stack = createStackNavigator();

export const sendStack = () => (
  <Stack.Navigator
    initialRouteName={routes.settings}
    screenOptions={defaultStackOptions}>
    <Stack.Screen name={'settings'} component={SettingsScreen} />
  </Stack.Navigator>
);
