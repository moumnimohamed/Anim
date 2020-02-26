import React from 'react';
import {Provider} from 'react-redux';
import Navigator from './app/navigation/Navigation';
import {store} from './app/redux/index';
import PlayerProvider from './app/components/PlayerProvider';

import {Provider as PaperProvider} from 'react-native-paper';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PaperProvider>
        <PlayerProvider>
          <Navigator/>
          </PlayerProvider>
        </PaperProvider>
      </Provider>
    );
  }
}

export default App;
