import React from 'react';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import SplashScreen from 'react-native-splash-screen';
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
  constructor(properties) {
    super(properties);
 
    OneSignal.init("adcdfe88-e634-46fc-a233-e06f2202799d", {kOSSettingsKeyAutoPrompt : true});// set kOSSettingsKeyAutoPrompt to false prompting manually on iOS

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    this.state = {
      splashScreenTimer: null
  };
  }

  componentDidMount() {
    let splashScreenTimer = setInterval(this.hideSplashScreen, 3000); // hide splash screen after 3s
    this.setState({ splashScreenTimer });
    // you can also add sound here :D
}
   
hideSplashScreen = () => {
  SplashScreen.hide();
  clearInterval(this.state.splashScreenTimer);
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
