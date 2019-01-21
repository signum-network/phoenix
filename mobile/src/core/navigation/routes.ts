import { NavigationRouteConfig } from 'react-navigation'

// we need to describe interface to get proper type-hinting
export interface IRoutes {
  home: string
  settings: string
}

export type TRoutesMap = {
  [key in keyof Partial<IRoutes>]: NavigationRouteConfig
}

/**
 * List of all in-app routes
 */
export const routes: IRoutes = {
  home: 'home',
  settings: 'settings'
}
