import React from 'react';
import RNLanguages from 'react-native-languages';
import { createAppContainer, NavigationContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { i18n } from './src/core/i18n';
import { ChangeLanguageEvent } from './src/core/interfaces';
import { RootView } from './src/core/layout/RootView';
import { rootTabStack } from './src/core/navigation/rootTabStack';
import { getStore } from './src/core/store/store';

const AppContainer: NavigationContainer = createAppContainer(rootTabStack);
const store: Store = getStore();

export default class App extends React.Component<{}, {}> {
  componentDidMount (): void {
    RNLanguages.addEventListener('change', this.handleLanguagesChange);
  }

  componentWillUnmount (): void {
    RNLanguages.removeEventListener('change', this.handleLanguagesChange);
  }

  handleLanguagesChange = (event: ChangeLanguageEvent) => {
    i18n.locale = event.language;
    // we need to re-render whole tree
    this.forceUpdate();
  }

  render () {
    return (
      <Provider store={store}>
        <RootView>
          <AppContainer/>
        </RootView>
      </Provider>
    );
  }
}
