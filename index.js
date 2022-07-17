/**
 * @format
 */

import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {Provider as PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';

// React Redux
import {Provider} from 'react-redux';
import {store} from './store';

export default function Main() {
  return (
    <PaperProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
