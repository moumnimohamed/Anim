import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {detailRequest} from '../redux/filmDetailRedux';

import Play from 'react-native-vector-icons/AntDesign';

import {Chip} from 'react-native-paper';
import {
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  View,
  ScrollView,
  Image,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import reactotron from 'reactotron-react-native';
import {Playeroo} from '../components/Playeroo';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class FilmDetail extends React.Component {
  animeName = this.props.navigation.state.params.item.title;
  anime = this.props.navigation.state.params.item;

  componentDidMount = () => {
    console.log('anime....', this.anime);

    this.props.filmDetailRequest(this.anime.link);
  };

  render() {
    const cat =
      this.props.filmDetail && this.props.filmDetail.length > 0
        ? this.props.filmDetail[0]['category']
        : '';
    const story =
      this.props.filmDetail && this.props.filmDetail.length > 0
        ? this.props.filmDetail[0]['story']
        : [];
    const published =
      this.props.filmDetail && this.props.filmDetail.length > 0
        ? this.props.filmDetail[0]['published']
        : [];
    const duration =
      this.props.filmDetail && this.props.filmDetail.length > 0
        ? this.props.filmDetail[0]['duration']
        : [];
    const streamLinks =
      this.props.filmDetail && this.props.filmDetail.length > 0
        ? this.props.filmDetail[0]['streamLinks']
        : [];

    reactotron.log('ha streamLinks', streamLinks);
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scroll}>
          <ImageBackground
            blurRadius={1}
            source={{uri: this.anime.img ? this.anime.img : ''}}
            style={styles.bkg}>
            <View style={styles.viewDATA}>
              <View style={styles.imageContainer}>
                <Image
                  ImageResizeMode={'contain'}
                  style={styles.image}
                  source={{uri: this.anime.img ? this.anime.img : ''}}
                />
              </View>

              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={cat}
                renderItem={({item, index}) => (
                  <Chip
                    key={index}
                    style={{
                      marginTop: 10,
                      marginRight: 10,
                      backgroundColor: '#F5F5F5',
                    }}
                    onPress={() => {
                      this.props.navigation.push('ByCategory', {
                        title: item.title,
                        type: 'film',
                      });
                    }}>
                    <Text
                      style={{color: '#9A999A', fontFamily: 'JF Flat regular'}}>
                      {item.title}
                    </Text>
                  </Chip>
                )}
                keyExtractor={item => item.title}
              />
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingTop: 20,
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    style={styles.playBtn}
                    onPress={() =>
                      this.props.navigation.push('streamPage', {
                        link: streamLinks[0].link,
                      })
                    }>
                    <Play
                      name="play"
                      size={35}
                      color="#89C13D"
                      style={{borderRadius: 20}}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{flex: 1}}>
                  {published[0] && (
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          color: '#9A999A',
                          marginRight: 10,
                          fontFamily: 'JF Flat regular',
                        }}>
                        {published[1]}
                      </Text>
                      <Text style={{fontFamily: 'JF Flat regular'}}>
                        {published[0]}
                      </Text>
                    </View>
                  )}
                  {duration[0] && (
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                      }}>
                      <Text style={{color: '#9A999A', marginRight: 24,   fontFamily: 'JF Flat regular',}}>
                        {duration[1]}
                      </Text>
                      <Text style={{   fontFamily: 'JF Flat regular',}}>{duration[0]}</Text>
                    </View>
                  )}
                </View>
              </View>
              {story.map((p, i) => {
                return p && p.text ? (
                  <Text key={i} style={{padding: 20, color: '#9A999A',   fontFamily: 'JF Flat regular',}}>
                    {p.text}
                  </Text>
                ) : null;
              })}

              
            </View>
          </ImageBackground>
          {streamLinks.map((video, i) => {
                return video && video.text ? (
                  <Playeroo
                    key={i}
                    video={video}
                    navigate={() => {
                      this.props.navigation.push('streamPage', {
                        link: video.link,
                      });
                    }}
                  />
                ) : null;
              })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f5fa',
    flex: 1,
  },
  bkg: {
    width: '100%',
    
  },
  scroll: {
    backgroundColor:"#fff"
  },

  viewDATA: {
    /*  marginTop:200,*/
    paddingTop: 90,
    backgroundColor: '#FFF',
    overflow: 'hidden',

    width: screenWidth,
    borderTopLeftRadius: screenWidth / 2,
    borderTopRightRadius: screenWidth / 2,
    alignItems: 'center',
  },

  imageContainer: {
    top: -140,
    position: 'absolute',
    width: '50%',
    height: 220,
    borderRadius: 90,
    overflow: 'hidden',

    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  playBtn: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    filmDetail: state.filmDetail.payload ? state.filmDetail.payload : [],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    filmDetailRequest: data => dispatch(detailRequest(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmDetail);
