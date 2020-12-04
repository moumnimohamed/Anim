import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';

import PlayerContext from '../components/PlayerContext';
import VideoModal from '../components/VideoModal';
/*  
import {type Video} from './videos';
 */

export default class PlayerProvider extends React.PureComponent<
  PlayerProviderProps,
  PlayerProviderState,
> {
  state = {
    video: null,
  };

  setVideo = (video: Video | null) => {
    this.setState({video});
  };

  toggleVideo = () => {
    const {video} = this.state;
    timing(this.animation, {
      toValue: video ? 1 : 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    }).start();
  };

  render() {
    const {setVideo, animation} = this;
    const {children} = this.props;
    const {video} = this.state;
    /* const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [height, 0],
    }); */
    const isOS = Platform.OS === 'ios';
    return (
      <PlayerContext.Provider value={{video, setVideo}}>
       
        <View style={styles.container}>
          <View style={StyleSheet.absoluteFill}>{children}</View>

          {video && <VideoModal {...{video}} />}
        </View>
      </PlayerContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});
