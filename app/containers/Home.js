import axios from 'axios';
import cheerio from 'cheerio-without-node-native';
import React from 'react';
import Toast from 'react-native-simple-toast';
 
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {StatusBar} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {connect} from 'react-redux';
import {AnimatedCard} from '../components/AnimatedCard';
import AnimeServers from '../components/AnimeServers';
import {FilmCard} from '../components/FilmCard';
import Header from '../components/Header';
import Loader from '../components/Loader';
import TextStyled from '../components/TextStyled';
import {aniEpisodeRequest} from '../redux/AnimeEpisodes';
import {getAnimeListRequest} from '../redux/AnimeListRedux';
import {filmRequest} from '../redux/FilmRedux';
import {getNewRequest} from '../redux/newAnimRedux';
import {Button as B} from 'react-native-paper';
import {default as Icon} from 'react-native-vector-icons/MaterialCommunityIcons';

import * as NetInfo from '@react-native-community/netinfo';

import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';

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

  checkUpdate = async () => {
      
    // Request last version number from your server
    // And compare with current version.
    // You can save this number in device storage with AsyncStorage
    // At last:
    this.setState({
       
      updateKnow: false, // Or false
    });
  };

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

  getEpsServers = async link => {
    this.setState({showModal: true});
    axios({
      method: 'get',
      url: link,
    })
      .then(response => {
        if (response.status === 200) {
          const htmlString = response.data; // get response text
          const $ = cheerio.load(htmlString); // parse HTML string
          href = [];
          $('.embed-player-tabs .nav.nav-tabs  li').map((_, elm) => {
            href.push({text: $(elm).text(), link: $(elm).attr('hrefa')});
            /* console.log("lala",$('a', elm).attr('href')) */
          });

          if (href.length <= 0) {
            console.log('count2', href.length);
            $('.episode-videoplay ul li').map((_, elm) => {
              href.push({text: $(elm).text(), link: $(elm).attr('data-href')});
            });
          }
          /*  const animeHrefLink=   $(".col-md-4.col-no-padding-right a").attr('href')
     console.log(animeHrefLink,) */
          console.log(href);
          this.setState({epsHref: href});
        }
      })
      .catch(error => {
        error;
      });
  };

  componentDidUpdate() {
     
    /* this.allImages=[];
    if (this.props.newAnimeFailure) {
      this.setState({show: true});
    } */
  }

  getData = () => {
    this.props.getAnimRequest();
    this.getLegendAnime();
    this.props.getAnimeList(0);
    this.props.aniEpisodeRequest();
    this.props.filmRequest();
  };

  componentDidMount() {
    this.checkUpdate();
    this.unsubscribe();
    this.getData();
  }

  getLegendAnime = async () => {
    axios({
      method: 'get',
      url:
        'https://anime2001.com/anime_season/%d8%a7%d9%84%d8%a3%d9%86%d9%85%d9%8a%d8%a7%d8%aa-%d8%a7%d9%84%d8%a3%d8%b3%d8%b7%d9%88%d8%b1%d9%8a%d8%a9/',
    })
      .then(response => {
        if (response.status === 200) {
          const htmlString = response.data; // get response text
          const $ = cheerio.load(htmlString); // parse HTML string

          const liList = $('.col-list-padding > .hovereffect').map(
            (_, hover) => ({
              title: $('h2', hover).text(),
              img: $('.img-responsive', hover).attr('src'),
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
  };

  render() {
    const newAnime = this.props.newAnime.filter(a => a.img);
    const legendAnime = this.state.legendAnime.filter(a => a.img);
    const anim =
      this.props.newAnime && this.props.newAnime.length > 0
        ? this.props.newAnime[this.state.activeSlider]
        : {};
    return (
      <SafeAreaView style={{backgroundColor: '#f8f5fa'}}>
        <StatusBar translucent backgroundColor="transparent" />
        <ScrollView>
          {this.props.fetching ? (
            <Loader />
          ) : (
            <React.Fragment>
              {/*  {this.props.fetching ?
            <View style={styles.container}>
      <ActivityIndicator animating={true} color={'#89C13D'} />
      </View>} */}

              <ImageBackground
                blurRadius={1}
                source={{uri: anim.img}}
                style={{width: '100%'}}>
                <LinearGradient colors={['#ffffff00', '#f8f5fa']}>
                  <View>
                    <Carousel
                    loop
                    autoplay
                    enableMomentum ={false}
                    lockScrollWhileSnapping  ={true}
                    autoplayInterval={3000}
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
                            item={item}
                            navigate={() => {
                              item.title.includes('فيلم')
                                ? this.props.navigation.push('FilmDetail', {
                                    index: index,
                                    item: item,
                                  })
                                : this.props.navigation.push('AnimeDetail', {
                                    index: index,
                                    item: item,
                                  });
                            }}
                          />
                        );
                      }}
                      slideStyle={styles.slide}
                      containerCustomStyle={{flex: 1}}
                      slideStyle={{marginTop: 150, marginBottom: 20}}
                      sliderWidth={screenWidth}
                      itemWidth={itemWidth}
                    />
                  </View>
                </LinearGradient>
              </ImageBackground>

              <TextStyled hide title={'أنميات الأسطورية'} />

              <Carousel
                firstItem={legendAnime.length - 1}
                inactiveSlideOpacity={1}
                layout={'stack'}
                data={legendAnime}
                renderItem={({item, index}) => {
                  return (
                    <AnimatedCard
                      key={index}
                      item={item}
                      navigate={() => {
                        item.title.includes('فيلم')
                          ? this.props.navigation.push('FilmDetail', {
                              index: index,
                              item: item,
                            })
                          : this.props.navigation.push('AnimeDetail', {
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
              <TextStyled
                title={' آخر الحلقات المضافة'}
                onClick={() => {
                  this.props.navigation.push('EpisodesAllList');
                }}
              />
              <View style={{position: 'relative'}}>
                <View style={styles.view}>
                  <Image
                    style={styles.animImage}
                    source={require('../images/onepiese.png')}
                  />
                </View>

                <FlatList
                  style={styles.ScrollView}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={this.props.animeEpisodes.slice(0, 20)}
                  renderItem={({item}) => (
                    <FilmCard
                      item={item}
                      navigate={() => this.getEpsServers(item.link)}
                    />
                  )}
                  keyExtractor={item => item.title}
                />
                <AnimeServers
                  hide={() => this.setState({showModal: false})}
                  epsHref={this.state.epsHref}
                  showModal={this.state.showModal}
                  navigation={this.props.navigation}
                />
              </View>

              {/* آخر الأنميات المضافة */}
              <TextStyled
                title={'آخر الأنميات المضافة'}
                onClick={() => {
                  this.props.navigation.push('AnimeAllList');
                }}
              />

              <View style={{position: 'relative'}}>
                <View style={styles.view}>
                  <Image
                    style={styles.animImage}
                    source={require('../images/hero.png')}
                  />
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
                      item={item}
                      showTitle={false}
                      navigate={() => {
                        this.props.navigation.push('AnimeDetail', {item: item});
                      }}
                    />
                  )}
                  keyExtractor={item => item.title}
                />
              </View>
              {/*التصنيف*/}
              {/* <TextStyled title={"التصنيف"}/> */}

              {/*آخر أفلام الأنميات المضافة  */}
              <TextStyled
                title={'آخر أفلام'}
                onClick={() => {
                  this.props.navigation.push('FilmAllList');
                }}
              />

              <View style={{position: 'relative'}}>
                <View style={styles.view}>
                  <Image
                    style={styles.animImage}
                    source={require('../images/red.png')}
                  />
                </View>
                {/* <ScrollView
              style={{paddingLeft: 10 , flex: 1}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
            this.props.filmCategories &&
                this.props.filmCategories.map((cat, index) => cat.title && <Chip key={index} style={{marginTop:10,marginRight:10}}  onPress={() => console.log('Pressed')}>{cat.title}</Chip>)
                
                </ScrollView>
           */}

                <FlatList
                  data={this.props.films.slice(0, 20)}
                  style={styles.ScrollView}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) =>
                    item.img && (
                      <FilmCard
                        item={item}
                        showTitle={false}
                        navigate={() => {
                          this.props.navigation.push('FilmDetail', {
                            item: item,
                          });
                        }}
                      />
                    )
                  }
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </React.Fragment>
          )}

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
                  Linking.canOpenURL('https://stackoverflow.com/')
                    .then(supported => {
                      if (!supported) {
                        alert(
                          "Can't handle url: " + 'https://stackoverflow.com/',
                        );
                      } else {
                        return Linking.openURL('https://stackoverflow.com/');
                      }
                    })
                    .catch(err => alert('An error occurred', err))
                }>
                تحديث
              </B>
            </SCLAlert>
          </View>
        </ScrollView>
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
    paddingLeft: 80,
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
    fetching: state.newAnime.fetching,
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAnimRequest: data => dispatch(getNewRequest(data)),
    getAnimeList: data => dispatch(getAnimeListRequest(data)),
    aniEpisodeRequest: data => dispatch(aniEpisodeRequest(data)),
    filmRequest: data => dispatch(filmRequest(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
