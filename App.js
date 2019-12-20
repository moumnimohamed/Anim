import React from 'react';
import {Provider} from 'react-redux';
import Home from './app/containers/Home';
import {store} from './app/redux/index';
import {Provider as PaperProvider} from 'react-native-paper';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PaperProvider>
          <Home />
        </PaperProvider>
      </Provider>
    );
  }
}

export default App;
