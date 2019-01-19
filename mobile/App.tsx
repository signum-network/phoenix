import React from 'react';
import {Provider} from 'react-redux';
import {Store} from 'redux';
import {createAppContainer, NavigationContainer} from 'react-navigation';
import {rootTabStack} from './src/core/navigation/rootTabStack';
import {getStore} from './src/core/store/store';
import {RootView} from './src/core/layout/RootView';

const AppContainer: NavigationContainer = createAppContainer(rootTabStack);
const store: Store = getStore();

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <Provider store={store}>
        <RootView>
          <AppContainer/>
        </RootView>
      </Provider>
    );
  }
}
