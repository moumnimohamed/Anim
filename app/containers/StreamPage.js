import axios from 'axios';
import cheerio from 'cheerio-without-node-native';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {AdMobRewarded} from 'react-native-admob';
import {PLAYER_STATES} from 'react-native-media-controls';
import Orientation from 'react-native-orientation';
import {WebView} from 'react-native-webview';
import {ActivityIndicator} from 'react-native-paper';

const screenHeight = Math.round(Dimensions.get('window').height);

export default class StreamPage extends React.Component {
  videoPlayer;

  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
      isLoading: true,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'cover',
      fetching: false,
    };
  }

  getVideoURL = async link => {
    axios({
      method: 'get',
      url:
        'https://anime2001.com/embed_player/?url=https%3A%2F%2Fgounlimited.to%2Fembed-5n3zo8lt3gu1.html&h=d0783360ee8c1c8a8e2a2a4813c9f8ad',
    })
      .then(response => {
        if (response.status === 200) {
          console.warn('hahia!!', response.data);
          const htmlString = response.data;
          const $ = cheerio.load(htmlString);
          const liList = $('#vplayer .container video').attr('src');

          console.log('voila !!!');
        }
      })
      .catch(error => {
        error;
      });
  };

  onSeek = seek => {
    //Handler for change in seekbar
    this.videoPlayer.seek(seek);
  };

  onPaused = playerState => {
    //Handler for Video Pause
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };

  onReplay = () => {
    //Handler for Replay
    this.setState({playerState: PLAYER_STATES.PLAYING});
    this.videoPlayer.seek(0);
  };

  onProgress = data => {
    const {isLoading, playerState} = this.state;
    // Video Player will continue progress even if the video already ended
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({currentTime: data.currentTime});
    }
  };

  onLoad = data => this.setState({duration: data.duration, isLoading: false});

  onLoadStart = data => this.setState({isLoading: true});

  onEnd = () => this.setState({playerState: PLAYER_STATES.ENDED});

  onError = () => alert('Oh! ', error);

  exitFullScreen = () => {};

  enterFullScreen = () => {};

  onFullScreen = () => {
    if (this.state.screenType == 'content')
      this.setState({screenType: 'cover'});
    else this.setState({screenType: 'content'});
  };
  renderToolbar = () => (
    <View>
      <Text> toolbar </Text>
    </View>
  );
  onSeeking = currentTime => this.setState({currentTime});

  static navigationOptions = {
    header: null,
    keepGoing: false,
  };

  componentWillUnmount = () => {
    StatusBar.setHidden(false);
    /* Orientation.lockToPortrait();  */

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = 0;
    }
  };

  componentDidMount() {
    StatusBar.setHidden(true);

    this.timer = setTimeout(() => {
      AdMobRewarded.setAdUnitID('ca-app-pub-4024120289306171/8777670113');
      AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd());
    }, 2000);

    /* Orientation.lockToLandscape(); */
    /* if (this.props.navigation.state.params.link) {
  console.log("lala link",this.props.navigation.state.params.link)
  this.getVideoURL(this.props.navigation.state.params.link)
} */
  }

  componentWillUpdate = (nextState, nextProps) => {};

  render() {
    /* mega      :  in webview 
   Let's Upload : in webview 
   4 shared: in webview 
    go unlimeted show ads : in video player 
    ok.ru: in webview 
    vibbom : not working (loading)
    fileUpload : in webview 
    google drive : in webview 
   */

    return (
      <View style={styles.container}>
        <WebView
          onLoadStart={() => this.setState({fetching: true})}
          onLoad={() => this.setState({fetching: false})}
          source={{uri: this.props.navigation.state.params.link}}
          allowsFullscreenVideo={true}
          allowsInlineMediaPlayback={true}
        />
        {this.state.fetching && (
          <View style={styles.ActivityIndicator}>
            <Image
              style={{width: 50, height: 50, position: 'absolute'}}
              source={require('../images/logo.png')}
            />
            <ActivityIndicator animating={true} size={50} color={'#000'} />
           
          </View>
        )}
      </View>
      /*   <View style={styles.container}>
        <Video

          onEnd={this.onEnd}
          onLoad={this.onLoad}
          onLoadStart={this.onLoadStart}
          onProgress={this.onProgress}
          paused={this.state.paused}
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          resizeMode={this.state.screenType}
          onFullScreen={this.state.isFullScreen}
          fullscreen={true}
     
          source={{ uri: 'https://mega.nz/embed#!T08DFQgL!6wjwvCOv_XmDkYWD4p7YXk9o8DJA9_nFwsDxq9ZcbE4' }}
          style={styles.mediaPlayer}
          volume={10}
        />
        <MediaControls
          duration={this.state.duration}
          isLoading={this.state.isLoading}
          mainColor="#333"
          onFullScreen={this.onFullScreen}
          onPaused={this.onPaused}
          onReplay={this.onReplay}
          onSeek={this.onSeek}
          onSeeking={this.onSeeking}
          playerState={this.state.playerState}
          progress={this.state.currentTime}
          toolbar={this.renderToolbar()}
        />
      </View>
           */
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
  ActivityIndicator: {
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
