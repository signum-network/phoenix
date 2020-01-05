// @ts-ignore
import * as PushNotificationIOS from '@react-native-community/push-notification-ios';
import React from 'react';
import { Alert, Linking, Platform } from 'react-native';
import { addEventListener, removeEventListener } from 'react-native-localize';
import {
  createAppContainer,
  NavigationActions,
  NavigationContainer,
  NavigationContainerComponent
} from 'react-navigation';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { i18n } from './src/core/i18n';
import { ChangeLanguageEvent } from './src/core/interfaces';
import { RootView } from './src/core/layout/RootView';
import { rootTabStack } from './src/core/navigation/rootTabStack';
import { routes } from './src/core/navigation/routes';
import { getStore } from './src/core/store/store';

import { Account } from '@burstjs/core';
// @ts-ignore
import * as PushNotifications from 'react-native-push-notification';
import { defaultSettings } from './src/core/environment';

const AppContainer: NavigationContainer = createAppContainer(rootTabStack);
const store: Store = getStore();

interface TokenResponse {
  token: string;
  os: string;
}

interface AppState {
  deviceId?: string;
}

export default class App extends React.Component<{}, AppState> {

  navigator?: NavigationContainerComponent | null;

  state: AppState = {};

  componentDidMount (): void {

    const onNotification = (notification: PushNotificationIOS) => {
      if (!notification.foreground) {
        // @ts-ignore
        this.navigator.dispatch(
          NavigationActions.navigate({
            routeName: routes.accountDetails,
            params: {
              accountRS: notification.data.accountRS
            }
          })
        );
      }
      // required on iOS only (see fetchCompletionHandler docs:
      // https://github.com/react-native-community/react-native-push-notification-ios)
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    };

    PushNotifications.configure({

      onRegister: ({ token }: TokenResponse) => {
        this.setState({
          deviceId: token
        });

        // Need to wait for the store to be setup
        setTimeout(async () => {
          const accounts = store.getState().auth.accounts;
          if (accounts) {
            try {
              await Promise.all(accounts.map(({ accountRS }: Account) => {
                return fetch(defaultSettings.burstAlertsURL, {
                  method: 'POST',
                  body: JSON.stringify({
                    address: accountRS,
                    phone: token,
                    method: 2
                  }),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }).then((result) => console.log);
              }));
            } catch (e) {
              console.log(e);
            }
          }
        }, 500);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification,

      // ANDROID ONLY: GCM or FCM Sender ID (product_number)
      senderID: '1025777552500',

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      }
    });

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
    if (this.navigator && routeName.indexOf('requestBurst') > -1) {
      this.navigator.dispatch(
        NavigationActions.navigate({
          routeName: routes.home
        })
      );
      this.navigator.dispatch(
        NavigationActions.navigate({
          routeName: routes.send,
          params: { url }
        })
      );
    }
  }

  render () {
    const { deviceId } = this.state;
    return (
      <Provider store={store}>
        <RootView>
          <AppContainer
            screenProps={{
              deviceId
            }}
            ref={(nav) => { this.navigator = nav; }}
          />
        </RootView>
      </Provider>
    );
  }
}
