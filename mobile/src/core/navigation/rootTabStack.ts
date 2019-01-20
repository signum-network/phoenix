import {
  BottomTabNavigatorConfig,
  createBottomTabNavigator,
  NavigationContainer
} from 'react-navigation'
import { homeStack } from '../../modules/home/navigation/homeStack'
import { settingsStack } from '../../modules/settings/navigation/settingsStack'
import { routes, TRoutesMap } from './routes'

const routesMap: TRoutesMap = {
  [routes.home]: homeStack,
  [routes.settings]: settingsStack
}

const rootTabStackConfig: BottomTabNavigatorConfig = {
  initialRouteName: routes.home
}

export const rootTabStack: NavigationContainer = createBottomTabNavigator(
  routesMap,
  rootTabStackConfig
)
