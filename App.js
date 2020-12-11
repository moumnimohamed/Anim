import React from 'react';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import PlayerProvider from './app/components/PlayerProvider';
import Navigator from './app/navigation/Navigation';
import {store} from './app/redux/index';
import codePush from 'react-native-code-push';

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

let codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};

class App extends React.Component {
  constructor(properties) {
    super(properties);

    OneSignal.init('adcdfe88-e634-46fc-a233-e06f2202799d', {
      kOSSettingsKeyAutoPrompt: true,
    }); // set kOSSettingsKeyAutoPrompt to false prompting manually on iOS

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    this.state = {
      splashScreenTimer: null,
    };
  }

  componentDidMount() {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE,
    });

    let splashScreenTimer = setInterval(this.hideSplashScreen, 3000); // hide splash screen after 3s
    this.setState({splashScreenTimer});
    // you can also add sound here :D
  }

  hideSplashScreen = () => {
    SplashScreen.hide();
    clearInterval(this.state.splashScreenTimer);
  };

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

export default (App = codePush(codePushOptions)(App));
