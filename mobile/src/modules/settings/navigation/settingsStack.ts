import { createStackNavigator, StackNavigatorConfig } from 'react-navigation';

import { defaultStackOptions } from '../../../core/navigation/defaultStackOptions';
import { routes, RoutesMap } from '../../../core/navigation/routes';
import { SettingsScreen } from '../screens/SettingsScreen';

const stackConfig: StackNavigatorConfig = {
  initialRouteName: routes.settings,
  defaultNavigationOptions: defaultStackOptions
};

const routesMap: RoutesMap = {
  [routes.settings]: SettingsScreen
};

export const settingsStack = createStackNavigator(routesMap, stackConfig);
