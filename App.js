import React from 'react';
import {Provider} from 'react-redux';
import Navigator from './app/navigation/Navigation';
import {store} from './app/redux/index';
import {Provider as PaperProvider} from 'react-native-paper';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PaperProvider>
          <Navigator/>
        </PaperProvider>
      </Provider>
    );
  }
}

export default App;
