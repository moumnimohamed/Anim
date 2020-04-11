import React from 'react';
import {Alert, Platform} from 'react-native';
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {Provider} from 'react-redux';
import PlayerProvider from './app/components/PlayerProvider';
import Navigator from './app/navigation/Navigation';
import {store} from './app/redux/index';

import SplashScreen from 'react-native-splash-screen';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'JF Flat regular',
    },
  },
};

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
};

class App extends React.Component {
  state = {
    isConnected: true,
  };

  componentDidMount() {
    SplashScreen.hide();
   
  }

   

  handleConnectivityChange = state => {};

  render() {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <PlayerProvider>
            <Navigator />
          </PlayerProvider>
        </PaperProvider>
      </Provider>
    );
  }
}

export default App;
