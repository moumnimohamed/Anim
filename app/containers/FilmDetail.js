import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {detailRequest} from '../redux/filmDetailRedux';
import TextStyled from '../components/TextStyled';
import Play from 'react-native-vector-icons/AntDesign';
import {FilmCard} from '../components/FilmCard';
import {ActivityIndicator, Chip} from 'react-native-paper';
import {toggleFavorites} from '../redux/FavoritesAnim';
import Toast from 'react-native-simple-toast';

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
  state = {
    animeName: this.props.navigation.state.params.item.title,
    anime: this.props.navigation.state.params.item,
  };

  componentDidMount = () => {
    console.log('anime....', this.state.anime);

    this.props.filmDetailRequest(this.state.anime.link);
  };

  componentWillUpdate = (nextProps, nextState) => {
    if (
      this.props.navigation.state.params.item !==
      nextProps.navigation.state.params.item
    ) {
      this.setState({anime: nextProps.navigation.state.params.item});
      nextProps.filmDetailRequest(nextProps.navigation.state.params.item.link);
    }
  };

  _toggleFavorites(anime) {
    const index = this.props.favoritesAnim.findIndex(
      anim => anim.link === anime.link,
    );
    if (index == -1) {
      Toast.showWithGravity(
        "تمت إضافتها إلى قائمتك",
        Toast.LONG,
        Toast.BOTTOM,
      )
      
    } else {
      Toast.showWithGravity(
                "تمت إزالته من قائمتك",
                Toast.LONG,
                Toast.BOTTOM,
              )
    }

    this.props.toggleFavorites(anime);
  }


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

    const relatedF =
      this.props.filmDetail && this.props.filmDetail.length > 0
        ? this.props.filmDetail[0]['relatedF']
        : [];

    reactotron.log('ha streamLinks', streamLinks);
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scroll}>
          <ImageBackground
            blurRadius={1}
            source={{uri: this.state.anime.img ? this.state.anime.img : null}}
            style={styles.bkg}>
            <View style={styles.viewDATA}>
              <View style={styles.imageContainer}>
                <Image
                  ImageResizeMode={'contain'}
                  style={styles.image}
                  source={{
                    uri: this.state.anime.img ? this.state.anime.img : null,
                  }}
                />
              </View>

              {!this.props.fetching && (
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
                        style={{
                          color: '#9A999A',
                          fontFamily: 'JF Flat regular',
                        }}>
                        {item.title}
                      </Text>
                    </Chip>
                  )}
                  keyExtractor={item => item.title}
                />
              )}
              {!this.props.fetching && (
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
                        <Text
                          style={{
                            color: '#9A999A',
                            marginRight: 24,
                            fontFamily: 'JF Flat regular',
                          }}>
                          {duration[1]}
                        </Text>
                        <Text style={{fontFamily: 'JF Flat regular'}}>
                          {duration[0]}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              )}
              {!this.props.fetching &&
                story.map((p, i) => {
                  return p && p.text ? (
                    <Text
                      key={i}
                      style={{
                        padding: 20,
                        color: '#9A999A',
                        fontFamily: 'JF Flat regular',
                      }}>
                      {p.text}
                    </Text>
                  ) : null;
                })}
            </View>
          </ImageBackground>
          {!this.props.fetching &&
            streamLinks.map((video, i) => {
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
          {!this.props.fetching && (
            <React.Fragment>
              <TextStyled hide title={'أفلام ذات صلة'} />
              <FlatList
                style={styles.relatedF}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={relatedF}
                renderItem={({item}) => (
                  <FilmCard
                  isFavorite={
                              this.props.favoritesAnim.filter(
                                animF => animF.link === item.link,
                              ).length > 0
                            }
                            heartClick={() => this._toggleFavorites(item)}
                    item={item}
                    navigate={() => {
                      this.props.navigation.push('AnimeDetail', {item: item});
                    }}
                  />
                )}
                keyExtractor={item => item.title}
              />
            </React.Fragment>
          )}
          {this.props.fetching && (
            <View style={styles.ActivityIndicator}>
              <Image
                style={{width: 50, height: 50, position: 'absolute'}}
                source={require('../images/logo.png')}
              />
              <ActivityIndicator animating={true} size={50} color={'#000'} />
            </View>
          )}
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
    backgroundColor: '#fff',
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
  relatedF: {
    paddingBottom: 10,
  },
  imageContainer: {
    top: 0,
    marginBottom: 20,
    width: '50%',
    height: 300,
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
    zIndex: 9,
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
  ActivityIndicator: {
    height: screenHeight / 2,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    filmDetail: state.filmDetail.payload ? state.filmDetail.payload : [],
    fetching: state.filmDetail.fetching,
    favoritesAnim: state.favoritesAnim.data || [],
    
    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleFavorites: data => dispatch(toggleFavorites(data)),
    filmDetailRequest: data => dispatch(detailRequest(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilmDetail);
