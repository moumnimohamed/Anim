import axios from 'axios';
import cheerio from 'cheerio-without-node-native';
import React from 'react';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import {connect} from 'react-redux';
import {AnimatedCard} from '../components/AnimatedCard';
import AnimeServers from '../components/AnimeServers';
import {FilmCard} from '../components/FilmCard';
import Header from '../components/Header';
import LoaderModal from '../components/LoaderModal';
import TextStyled from '../components/TextStyled';
import {aniEpisodeRequest} from '../redux/AnimeEpisodes';
import {getAnimeListRequest} from '../redux/AnimeListRedux';
import {filmRequest} from '../redux/FilmRedux';
import {initialFavorites, toggleFavorites} from '../redux/FavoritesAnim';
import {getNewRequest} from '../redux/newAnimRedux';
import {Button as B} from 'react-native-paper';
import {default as Icon} from 'react-native-vector-icons/MaterialCommunityIcons';
import * as NetInfo from '@react-native-community/netinfo';

import {SCLAlert} from 'react-native-scl-alert';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const horizontalMargin = 30;
const slideWidth = 200;

const itemWidth = slideWidth + horizontalMargin * 2;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImage: '',
      activeSlider: 1,
      title: 0,
      show: false,
      showModal: false,
      epsHref: [],
      legendAnime: [],
      showAlertDesigned: false,
      updateKnow: false,
    };
  }

  // Subscribe
  unsubscribe = NetInfo.addEventListener(state => {
    /* alert("Connection type", state.type); */

    if (!state.isConnected) {
      this.setState({showAlertDesigned: true});
    } else {
      this.setState({showAlertDesigned: false});
    }
  });

  static navigationOptions = ({navigation}) => {
    return {
      header: <Header navigation={navigation} />,
    };
  };

  handleOpen = () => {
    this.setState({show: true});
  };

  handleClose = () => {
    this.setState({show: false});
  };

  loadState = async () => {
    try {
      const serializedState = await AsyncStorage.getItem('favoritesAnim');
      let fav = JSON.parse(serializedState);
      console.log('favoritesAnim10', fav);
      this.props.initialFavorites(fav.data);
      if (serializedState === null) {
        return undefined;
      }
      return json;
    } catch (err) {
      return undefined;
    }
  };

  _toggleFavorites(anime) {
    const index = this.props.favoritesAnim.findIndex(
      anim => anim.link === anime.link,
    );
    if (index == -1) {
      Toast.showWithGravity('تمت إضافتها إلى قائمتك', Toast.LONG, Toast.BOTTOM);
    } else {
      Toast.showWithGravity('تمت إزالته من قائمتك', Toast.LONG, Toast.BOTTOM);
    }

    this.props.toggleFavorites(anime);
  }

  getEpsServers = async link => {
    let href = [];
    this.setState({showModal: true});
    axios({
      method: 'get',
      url: link,
    })
      .then(response => {
        if (response.status === 200) {
          const htmlString = response.data; // get response text
          const $ = cheerio.load(htmlString); // parse HTML string

          $('#episode-servers   li').map((_, elm) => {
            href.push({
              text: $('a', elm).text(),
              link: $('a', elm).attr('data-ep-url'),
            });
          });

          const animeLink = $('.anime-page-link a').attr('href');

          console.log('lala', href);

          this.setState({epsHref: href, animeHrefLink: animeLink});
        }
      })
      .catch(error => {
        error;
      });
  };

  componentDidUpdate(nextProps, nextState) {
    /* this.allImages=[];
    if (this.props.newAnimeFailure) {
      this.setState({show: true});
    } */
  }

  getData = () => {
    this.props.getAnimRequest();
    this.props.aniEpisodeRequest();
    this.props.getAnimeList(0);
    this.getLegendAnime();
    this.props.filmRequest();
  };

  componentDidMount() {
    this.loadState();

    this.props.getAnimRequest();
    this.props.aniEpisodeRequest();
    this.props.getAnimeList(0);
    this.getLegendAnime();
    this.props.filmRequest();

    this.unsubscribe();
  }

  getLegendAnime = async () => {
    axios({
      method: 'get',
      url: 'https://apk.addanime.online',
    })
      .then(response => {
        if (response.status === 200) {
          const htmlString = response.data; // get response text
          const $ = cheerio.load(htmlString); // parse HTML string

          const link = $('#menu-item-3508 a').attr('href');

          axios({
            method: 'get',
            url: link,
          })
            .then(response => {
              if (response.status === 200) {
                const htmlString = response.data; // get response text
                const $ = cheerio.load(htmlString); // parse HTML string

                const liList = $('.anime-card-container  .hover.ehover6').map(
                  (_, hover) => ({
                    // map to an list of objects
                    title: $('img', hover).attr('alt'),
                    img: $('img', hover).attr('src'),
                    link: $('a', hover).attr('href'),
                  }),
                );

                var myData = Object.keys(liList).map(key => {
                  return liList[key];
                });
              }

              this.setState({legendAnime: myData});
            })
            .catch(error => {
              error;
            });
        }
      })
      .catch(error => {
        error;
      });
  };

  render() {
    const newAnime = this.props.newAnime.filter(a => a.img);
    const legendAnime = this.state.legendAnime.filter(a => a.img);
    const anim =
      this.props.newAnime && this.props.newAnime.length > 0
        ? this.props.newAnime[this.state.activeSlider]
        : {};
    return (
      <SafeAreaView style={{backgroundColor: '#f8f5fa', flex: 1}}>
        <LoaderModal visible={this.props.fetching} />
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        {!this.state.showAlertDesigned ? (
          <ScrollView>
            <Text>moumni</Text>
            <React.Fragment>
              {newAnime && newAnime?.length > 0 && (
                <ImageBackground
                  blurRadius={1}
                  source={{uri: anim.img}}
                  style={{width: '100%'}}>
                  <LinearGradient colors={['#ffffff00', '#f8f5fa']}>
                    <View>
                      <Carousel
                        loop
                        //autoplay
                        enableMomentum={false}
                        lockScrollWhileSnapping={true}
                        autoplayInterval={5000}
                        firstItem={1}
                        layoutCardOffset={0}
                        maxToRenderPerBatch={3}
                        windowSize={10}
                        onSnapToItem={index =>
                          this.setState({activeSlider: index})
                        }
                        inactiveSlideOpacity={1}
                        layout={'default'}
                        data={newAnime}
                        renderItem={({item, index}) => {
                          return (
                            <AnimatedCard
                              isFavorite={
                                this.props.favoritesAnim.filter(
                                  animF => animF.link === item.link,
                                ).length > 0
                              }
                              heartClick={() => this._toggleFavorites(item)}
                              item={item}
                              navigate={() => {
                                this.props.navigation.navigate('AnimeDetail', {
                                  index: index,
                                  item: item,
                                });
                              }}
                            />
                          );
                        }}
                        containerCustomStyle={{flex: 1}}
                        slideStyle={{marginTop: 130, marginBottom: 20}}
                        sliderWidth={screenWidth}
                        itemWidth={itemWidth}
                      />
                    </View>
                  </LinearGradient>
                </ImageBackground>
              )}
              {legendAnime?.length > 0 && !this.props.fetching && (
                <TextStyled hide title={'أنميات الموسم'} />
              )}
              <Carousel
                firstItem={legendAnime.length - 1}
                inactiveSlideOpacity={1}
                layout={'stack'}
                data={legendAnime}
                renderItem={({item, index}) => {
                  return (
                    <AnimatedCard
                      heartClick={() => this._toggleFavorites(item)}
                      isFavorite={
                        this.props.favoritesAnim.filter(
                          animF => animF.link === item.link,
                        ).length > 0
                      }
                      key={index}
                      item={item}
                      navigate={() => {
                        this.props.navigation.navigate('AnimeDetail', {
                          index: index,
                          item: item,
                        });
                      }}
                    />
                  );
                }}
                slideStyle={{
                  marginTop: 20,
                  paddingTop: 50,
                  overflow: 'visible',
                }}
                sliderWidth={screenWidth}
                itemWidth={itemWidth + 50}
                containerCustomStyle={{overflow: 'visible'}}
                contentContainerCustomStyle={{overflow: 'visible'}}
                layoutCardOffset={16}
              />

              {/*  آخر الحلقات المضافة */}
              {!this.props.fetching && (
                <TextStyled
                  title={'  آخر الحلقات المضافة'}
                  onClick={() => {
                    this.props.navigation.navigate('EpisodesAllList');
                  }}
                />
              )}

              <View style={{position: 'relative'}}>
                <View style={styles.view}>
                  {!this.props.fetching && (
                    <Image
                      style={styles.animImage}
                      source={require('../images/onepiese.png')}
                    />
                  )}
                </View>

                <FlatList
                  style={styles.ScrollView}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={this.props.animeEpisodes.slice(0, 20)}
                  renderItem={({item}) => (
                    <FilmCard
                      showTitle={true}
                      isFavorite={
                        this.props.favoritesAnim.filter(
                          animF => animF.link === item.link,
                        ).length > 0
                      }
                      heartClick={() => this._toggleFavorites(item)}
                      item={item}
                      navigate={() => this.getEpsServers(item.link)}
                    />
                  )}
                  keyExtractor={item => item.link}
                />
                <AnimeServers
                  hide={() => this.setState({showModal: false})}
                  epsHref={this.state.epsHref}
                  animeHrefLink={this.state.animeHrefLink}
                  showModal={this.state.showModal}
                  navigation={this.props.navigation}
                />
              </View>

              {/* آخر الأنميات المضافة */}
              {!this.props.fetching && (
                <TextStyled
                  title={'آخر الأنميات المضافة'}
                  onClick={() => {
                    this.props.navigation.navigate('AnimeAllList');
                  }}
                />
              )}

              <View style={{position: 'relative'}}>
                <View style={styles.view}>
                  {!this.props.fetching && (
                    <Image
                      style={styles.animImage}
                      source={require('../images/hero.png')}
                    />
                  )}
                </View>
                {/* <ScrollView
              style={{paddingLeft: 10 , flex: 1}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
               this.props.categories &&
                this.props.categories.map((cat, index) => cat.title && <Chip key={index} style={{marginTop:10,marginRight:10}}  onPress={() => console.log('Pressed')}>{cat.title}</Chip>)*/}
                {/*  </ScrollView> */}
                <FlatList
                  style={styles.ScrollView}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={this.props.animeList.slice(0, 20)}
                  renderItem={({item}) => (
                    <FilmCard
                      isFavorite={
                        this.props.favoritesAnim.filter(
                          animF => animF.link === item.link,
                        ).length > 0
                      }
                      heartClick={() => this._toggleFavorites(item)}
                      item={item}
                      showTitle={true}
                      navigate={() => {
                        this.props.navigation.navigate('AnimeDetail', {
                          item: item,
                        });
                      }}
                    />
                  )}
                  keyExtractor={item => item.title}
                />
              </View>
              {/*التصنيف*/}
              {/* <TextStyled title={"التصنيف"}/> */}

              {/*آخر أفلام الأنميات المضافة  */}
              {!this.props.fetching && (
                <TextStyled
                  title={'آخر أفلام'}
                  onClick={() => {
                    this.props.navigation.navigate('FilmAllList');
                  }}
                />
              )}
              {!this.props.fetching && (
                <View style={{position: 'relative'}}>
                  <View style={styles.view}>
                    <Image
                      style={styles.animImage}
                      source={require('../images/red.png')}
                    />
                  </View>

                  <FlatList
                    data={this.props.films.slice(0, 20)}
                    style={styles.ScrollView}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) =>
                      item.img && (
                        <FilmCard
                          isFavorite={
                            this.props.favoritesAnim.filter(
                              animF => animF.link === item.link,
                            ).length > 0
                          }
                          heartClick={() => this._toggleFavorites(item)}
                          item={item}
                          showTitle={true}
                          navigate={() => {
                            this.props.navigation.navigate('AnimeDetail', {
                              item: item,
                            });
                          }}
                        />
                      )
                    }
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              )}
            </React.Fragment>

            {this.state.showAlertDesigned &&
              Toast.showWithGravity(
                'اتصال إنترنت بطيء أو معدوم. يرجى التحقق من إعدادات الإنترنت الخاصة بك',
                Toast.LONG,
                Toast.BOTTOM,
              )}
            <View style={styles.alertContainer}>
              <SCLAlert
                headerIconComponent={
                  <Icon name="update" size={40} color="#fff" />
                }
                onRequestClose={() => {}}
                theme="info"
                show={this.state.updateKnow}
                titleStyle={{fontFamily: 'JF Flat regular'}}
                subtitleStyle={{lineHeight: 30, fontFamily: 'JF Flat regular'}}
                title="مطلوب التحديث"
                subtitle="لأسباب فنية نحتاج أن نطلب منك تحديث التطبيق. اسف بشأن ذلك">
                <B
                  mode="contained"
                  style={{
                    fontFamily: 'JF Flat regular',
                    backgroundColor: '#027BFF',
                  }}
                  onPress={() =>
                    Linking.canOpenURL('http://animia.co')
                      .then(supported => {
                        if (!supported) {
                          alert("Can't handle url: " + 'http://animia.co');
                        } else {
                          return Linking.openURL('http://animia.co');
                        }
                      })
                      .catch(err => alert('An error occurred', err))
                  }>
                  تحديث
                </B>
              </SCLAlert>
            </View>
          </ScrollView>
        ) : (
          <View
            style={{
              paddingTop: screenHeight / 2,

              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}>
            <Icon name="wifi-off" size={50} color="#000" />
            <Text
              style={{
                fontFamily: 'JF Flat regular',
                textAlign: 'center',
                margin: 10,
                flex: 1,
              }}>
              اتصال إنترنت بطيء أو معدوم. يرجى التحقق من إعدادات الإنترنت الخاصة
              بك
            </Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  alertContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  ScrollView: {
    paddingLeft: 40,
    overflow: 'visible',
  },

  view: {
    flex: 1,
    marginLeft: -80,
    width: screenWidth / 1.5,
    height: screenWidth / 1.5,
    position: 'absolute',

    bottom: 0,
  },
  animImage: {
    width: null,
    height: null,
    flex: 1,
  },
  slide: {
    overflow: 'visible',
  },

  ActivityIndicator: {
    height: screenHeight,
    backgroundColor: 'white',
    zIndex: 12,
    justifyContent: 'center',
    flex: 1,
  },
});

const mapStateToProps = state => {
  return {
    fetching:
      state.newAnime.fetching ||
      state.animeList.fetching ||
      state.films.fetching ||
      state.animeEpisodes.fetching,
    //|| state.animeList.fetching || state.animeEpisodes.fetching,
    newAnime:
      state.newAnime && state.newAnime.payload ? state.newAnime.payload : [],
    animeList:
      state.animeList && state.animeList.payload ? state.animeList.payload : [],
    newAnimeFailure: state.newAnime.error,
    animeEpisodes:
      state.animeEpisodes && state.animeEpisodes.payload
        ? state.animeEpisodes.payload
        : [],
    films: state.films && state.films.payload ? state.films.payload : [],
    filmCategories:
      state.films && state.films.categories ? state.films.categories : [],
    favoritesAnim: state.favoritesAnim.data || [],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAnimRequest: data => dispatch(getNewRequest(data)),
    getAnimeList: data => dispatch(getAnimeListRequest(data)),
    aniEpisodeRequest: data => dispatch(aniEpisodeRequest(data)),
    filmRequest: data => dispatch(filmRequest(data)),
    toggleFavorites: data => dispatch(toggleFavorites(data)),
    initialFavorites: data => dispatch(initialFavorites(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
