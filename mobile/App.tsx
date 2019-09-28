import React from 'react';
import { Linking, Platform } from 'react-native';
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

const AppContainer: NavigationContainer = createAppContainer(rootTabStack);
const store: Store = getStore();

export default class App extends React.Component<{}, {}> {

  navigator?: NavigationContainerComponent | null;

  componentDidMount (): void {

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
          routeName: routes.send,
          params: { url }
        })
      );
    }
  }

  render () {
    return (
      <Provider store={store}>
        <RootView>
          <AppContainer ref={(nav) => { this.navigator = nav; }} />
        </RootView>
      </Provider>
    );
  }
}
