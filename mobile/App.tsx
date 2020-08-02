// @ts-ignore
import 'react-native-gesture-handler';
import React from 'react';
import { Image, Linking, Platform, View } from 'react-native';
import { addEventListener, removeEventListener } from 'react-native-localize';

import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { i18n } from './src/core/i18n';
import { ChangeLanguageEvent } from './src/core/interfaces';
import { RootView } from './src/core/layout/RootView';
import { routes } from './src/core/navigation/routes';
import { getStore } from './src/core/store/store';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// @ts-ignore
import * as PushNotifications from 'react-native-push-notification';
import { tabbarIcons } from './src/assets/icons';
import { Colors } from './src/core/theme/colors';
import { core } from './src/core/translations';
import { HomeScreen } from './src/modules/auth/screens/HomeScreen';
import { settings } from './src/modules/settings/translations';
import { SendScreen } from './src/modules/transactions/screens/SendScreen';
import { ReceiveScreen } from './src/modules/transactions/screens/ReceiveScreen';
import { transactions } from './src/modules/transactions/translations';
import { SettingsScreen } from './src/modules/settings/screens/SettingsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { AddAccountScreen } from './src/modules/auth/screens/AddAccountScreen';
import { CreateAccountScreen } from './src/modules/auth/screens/CreateAccountScreen';
import { ImportAccountScreen } from './src/modules/auth/screens/ImportAccountScreen';
import { AccountDetailsScreen } from './src/modules/auth/screens/AccountDetailsScreen';
import { TransactionDetailsScreen } from './src/modules/auth/screens/TransactionDetailsScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScanQRCodeScreen } from './src/modules/transactions/screens/ScanQRCodeScreen';
import { ViewQRCodeScreen } from './src/modules/transactions/screens/ViewQRCodeScreen';

const store: Store = getStore();

interface AppState {
  deviceId?: string;
}

const rootTabStackConfig = {
  initialRouteName: routes.home,
  tabBarOptions: {
    activeTintColor: Colors.WHITE,
    activeBackgroundColor: Colors.BLUE_DARKER,
    inactiveTintColor: Colors.GREY,
    inactiveBackgroundColor: Colors.BLUE_DARKER,
    showIcon: true,
    style: {
      backgroundColor: Colors.BLUE_DARKER,
      borderTopWidth: 0
    }
  }
};

export const navigationRef = React.createRef();

export default class App extends React.Component<{}, AppState> {

  state: AppState = {};

  navigator = navigationRef;

  constructor (props) {
    super(props);

    // const onNotification = (notification: PushNotificationIOS) => {
    //   if (!notification.foreground) {
    //     // @ts-ignore
    //     this.navigator.dispatch(
    //       NavigationActions.navigate({
    //         routeName: routes.accountDetails,
    //         params: {
    //           accountRS: notification.data.accountRS
    //         }
    //       })
    //     );
    //   }
    //   // required on iOS only (see fetchCompletionHandler docs:
    //   // https://github.com/react-native-community/react-native-push-notification-ios)
    //   notification.finish(PushNotificationIOS.FetchResult.NoData);
    // };

    // PushNotifications.configure({

    //   onRegister: ({ token }: TokenResponse) => {
    //     this.setState({
    //       deviceId: token
    //     });

    //     // Need to wait for the store to be setup
    //     setTimeout(async () => {
    //       const accounts = store.getState().auth.accounts;
    //       if (accounts) {
    //         try {
    //           await Promise.all(accounts.map(({ accountRS }: Account) => {
    //             return fetch(defaultSettings.burstAlertsURL, {
    //               method: 'POST',
    //               body: JSON.stringify({
    //                 address: accountRS,
    //                 phone: token,
    //                 method: 2
    //               }),
    //               headers: {
    //                 'Content-Type': 'application/json'
    //               }
    //             }).then((result) => console.log);
    //           }));
    //         } catch (e) {
    //           console.log(e);
    //         }
    //       }
    //     }, 500);
    //   },

    //   // (required) Called when a remote or local notification is opened or received
    //   onNotification,

    //   // ANDROID ONLY: GCM or FCM Sender ID (product_number)
    //   senderID: '1025777552500',

    //   // IOS ONLY (optional): default: all - Permissions to register.
    //   permissions: {
    //     alert: true,
    //     badge: true,
    //     sound: true
    //   }
    // });

    addEventListener('change', this.handleLanguagesChange);

    if (Platform.OS === 'android') {
      Linking.getInitialURL().then((url) => {
        if (url) {
          this.navigate(url);
        }
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
  }

  componentWillUnmount (): void {
    removeEventListener('change', this.handleLanguagesChange);
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleLanguagesChange = (event: ChangeLanguageEvent) => {
    i18n.locale = event.language;
    // we need to re-render whole tree
    this.forceUpdate();
  }

  handleOpenURL = (event: any) => {
    this.navigate(event.url);
  }

  navigate = (url: string) => {
    const route = url.replace(/.*?:\/\//g, '');
    const routeName = route.split('/')[0];

    // user clicked on a deep link to pay someone else burst
    if (navigationRef && routeName.indexOf('requestBurst') > -1) {
      navigationRef.current.navigate(routes.home);
      navigationRef.current.navigate(routes.send, { url });
    }
  }

  render () {
    const RootTabStack = createBottomTabNavigator();
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <RootView>
              <View />
            </RootView>
            <RootTabStack.Navigator
              tabBarOptions={rootTabStackConfig.tabBarOptions}
              initialRouteName={rootTabStackConfig.initialRouteName}>
              <RootTabStack.Screen
                options={{
                  tabBarLabel: i18n.t(core?.screens?.home?.title) || '',
                  tabBarIcon: ({ color }) => (
                    <Image
                      source={tabbarIcons.home}
                      style={{ opacity: color === Colors.WHITE ?
                        1 : .5, width: 25, height: 25
                      }}
                    />
                  )
                }}
                name={routes.home}
                component={MainStack}
              />
              <RootTabStack.Screen
                options={{
                  tabBarLabel: i18n.t(transactions.screens.send.title),
                  tabBarIcon: ({ color }) => (
                    <Image
                      source={tabbarIcons.send}
                      style={{ opacity: color === Colors.WHITE ?
                        1 : .5, width: 25, height: 25
                      }}
                    />
                  )
                }}  name={routes.send} component={SendStack} />
              <RootTabStack.Screen
                options={{
                  tabBarLabel: i18n.t(transactions.screens.receive.title),
                  tabBarIcon: ({ color }) => (
                    <Image
                      source={tabbarIcons.receive}
                      style={{ opacity: color === Colors.WHITE ?
                        1 : .5, width: 25, height: 25
                      }}
                    />
                  )
                }}  name={routes.receive} component={ReceiveStack} />
              <RootTabStack.Screen
                options={{
                  tabBarLabel: i18n.t(settings.screens.settings.title),
                  tabBarIcon: ({ color }) => (
                    <Image
                      source={tabbarIcons.settings}
                      style={{ opacity: color === Colors.WHITE ?
                        1 : .5, width: 25, height: 25
                      }}
                    />
                  ) 
                }}  name={routes.settings} component={SettingsScreen} />
            </RootTabStack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
      </Provider>
    );
  }
}

const Stack = createStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={routes.home} component={HomeScreen} />
      <Stack.Screen name={routes.addAccount} component={AddAccountScreen} />
      <Stack.Screen name={routes.createAccount} component={CreateAccountScreen} />
      <Stack.Screen name={routes.importAccount} component={ImportAccountScreen} />
      <Stack.Screen name={routes.accountDetails} component={AccountDetailsScreen} />
      <Stack.Screen name={routes.transactionDetails} component={TransactionDetailsScreen} />
    </Stack.Navigator>
  );
};

export const SendStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={routes.send} component={SendScreen} />
      <Stack.Screen name={routes.scan} component={ScanQRCodeScreen} />
    </Stack.Navigator>
  );
};

export const ReceiveStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={routes.receive} component={ReceiveScreen} />
      <Stack.Screen name={routes.viewQRCode} component={ViewQRCodeScreen} />
    </Stack.Navigator>
  );
};
