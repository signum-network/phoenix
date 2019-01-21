import { createStackNavigator, StackNavigatorConfig } from 'react-navigation'
import { defaultStackOptions } from '../../../core/navigation/defaultStackOptions'
import { routes, TRoutesMap } from '../../../core/navigation/routes'
import { HomeScreen } from '../screens/HomeScreen'

const stackConfig: StackNavigatorConfig = {
  initialRouteName: routes.home,
  defaultNavigationOptions: defaultStackOptions
}

const routesMap: TRoutesMap = {
  [routes.home]: HomeScreen
}

export const homeStack = createStackNavigator(routesMap, stackConfig)
