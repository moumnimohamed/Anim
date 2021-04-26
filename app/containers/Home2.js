import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Image,
  FlatList,
  Linking,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getNewRequest} from '../redux/newAnimRedux';
import LoaderModal from '../components/LoaderModal';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import {AnimatedCard} from '../components/AnimatedCard';
import TextStyled from '../components/TextStyled';
import {FilmCard} from '../components/FilmCard';
import AnimeServers from '../components/AnimeServers';
import Toast from 'react-native-simple-toast';
import {SCLAlert} from 'react-native-scl-alert';
import {default as Icon} from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button as B} from 'react-native-paper';
import {aniEpisodeRequest} from '../redux/AnimeEpisodes';
import {filmRequest} from '../redux/FilmRedux';
import {getAnimeListRequest} from '../redux/AnimeListRedux';
import {initialFavorites, toggleFavorites} from '../redux/FavoritesAnim';
import axios from 'axios';
import cheerio from 'cheerio-without-node-native';
import Header from '../components/Header';
import * as NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const horizontalMargin = 30;
const slideWidth = 200;

const itemWidth = slideWidth + horizontalMargin * 2;
const Home2 = props => {
  const fullState = useSelector(state => state || []);
  const newAnime = useSelector(state => state?.newAnime?.payload || []);
  const films = useSelector(state => state?.films?.payload || []);
  const animeEpisodes = useSelector(
    state => state?.animeEpisodes?.payload || [],
  );
  const animeList = useSelector(state => state?.animeList?.payload || []);
  const favoritesAnim = useSelector(state => state?.favoritesAnim?.data || []);
  console.log('favoritesAnim', favoritesAnim);
  const fetching  =  useSelector(state => state?.newAnime?.fetching || state.animeList.fetching ||
  state.films.fetching ||
  state.animeEpisodes.fetching  );

  const [activeSlider, setActiveSlider] = useState(1);
  const [data, setData] = useState({
    epsHref: [],
    show: false,
    animeHrefLink: '',
  });

  const [showAlertDesigned, setShowAlertDesigned] = useState(false);
  const dispatch = useDispatch();

  const loadState = async () => {
    try {
      const serializedState = await AsyncStorage.getItem('favoritesAnim');
      let fav = JSON.parse(serializedState);
      console.log('favoritesAnim10', fav);

      dispatch(initialFavorites(fav.data));
      if (serializedState === null) {
        return undefined;
      }
      return json;
    } catch (err) {
      return undefined;
    }
  };


  useEffect(() => {
    loadState();

  }, []);

  useEffect(() => {
    dispatch(getNewRequest());
    dispatch(aniEpisodeRequest());
    dispatch(getAnimeListRequest());
    dispatch(filmRequest());
  }, [dispatch]);

  useEffect(() => {
    console.log('halilolia bom', fullState);
  }, [fullState, newAnime]);

  const anim = newAnime && newAnime?.length > 0 ? newAnime?.[activeSlider] : {};

  const _toggleFavorites = anime => {
    const index = favoritesAnim.findIndex(anim => anim.link === anime.link);
    if (index == -1) {
      Toast.showWithGravity('تمت إضافتها إلى قائمتك', Toast.LONG, Toast.BOTTOM);
    } else {
      Toast.showWithGravity('تمت إزالته من قائمتك', Toast.LONG, Toast.BOTTOM);
    }
    dispatch(toggleFavorites(anime));
  };

  const getEpsServers = async link => {
    let href = [];

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
          console.log('lala2', animeLink);
          setData({epsHref: href, show: true, animeHrefLink: animeLink});

          //  this.setState({epsHref: href, animeHrefLink: animeLink});
        }
      })
      .catch(error => {
        error;
      });
  };

  return (
    <SafeAreaView style={{backgroundColor: '#f8f5fa', flex: 1}}>
      <LoaderModal visible={fetching} />
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      {!showAlertDesigned ? (
        <ScrollView>
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
                  onSnapToItem={index => setActiveSlider(index)}
                  inactiveSlideOpacity={1}
                  layout={'default'}
                  data={newAnime.filter(a => a.img)}
                  renderItem={({item, index}) => {
                    return (
                      <AnimatedCard
                        isFavorite={
                          favoritesAnim.filter(
                            animF => animF.link === item.link,
                          ).length > 0
                        }
                        heartClick={() => _toggleFavorites(item)}
                        item={item}
                        navigate={() => {
                          props.navigation.navigate('AnimeDetail', {
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
          {/*  آخر الحلقات المضافة */}
          {!fetching && (
            <TextStyled
              title={'  آخر الحلقات المضافة'}
              onClick={() => {
                props.navigation.navigate('EpisodesAllList');
              }}
            />
          )}

          <View style={{position: 'relative'}}>
            <View style={styles.view}>
              {!fetching && (
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
              data={animeEpisodes.slice(0, 20)}
              renderItem={({item}) => (
                <FilmCard
                  showTitle={true}
                  isFavorite={
                    favoritesAnim.filter(animF => animF.link === item.link)
                      .length > 0
                  }
                  heartClick={() => _toggleFavorites(item)}
                  item={item}
                  navigate={() => getEpsServers(item.link)}
                />
              )}
              keyExtractor={item => item.link}
            />
            <AnimeServers
              hide={() => setData({...data, show: false})}
              epsHref={data?.epsHref}
              animeHrefLink={data?.animeHrefLink || ''}
              showModal={data.show}
              navigation={props.navigation}
            />
          </View>
          {/* آخر الأنميات المضافة */}
          {!fetching && (
            <TextStyled
              title={'آخر الأنميات المضافة'}
              onClick={() => {
                props.navigation.navigate('AnimeAllList');
              }}
            />
          )}

          <View style={{position: 'relative'}}>
            <View style={styles.view}>
              {!fetching && (
                <Image
                  style={styles.animImage}
                  source={require('../images/hero.png')}
                />
              )}
            </View>

            <FlatList
              style={styles.ScrollView}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={animeList.slice(0, 20)}
              renderItem={({item}) => (
                <FilmCard
                  isFavorite={
                    favoritesAnim.filter(animF => animF.link === item.link)
                      .length > 0
                  }
                  heartClick={() => _toggleFavorites(item)}
                  item={item}
                  showTitle={true}
                  navigate={() => {
                    props.navigation.navigate('AnimeDetail', {
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
          {!fetching && (
            <TextStyled
              title={'آخر أفلام'}
              onClick={() => {
                props.navigation.navigate('FilmAllList');
              }}
            />
          )}
          {!fetching && (
            <View style={{position: 'relative'}}>
              <View style={styles.view}>
                <Image
                  style={styles.animImage}
                  source={require('../images/red.png')}
                />
              </View>

              <FlatList
                data={films.slice(0, 20)}
                style={styles.ScrollView}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) =>
                  item.img && (
                    <FilmCard
                      isFavorite={
                        favoritesAnim.filter(animF => animF.link === item.link)
                          .length > 0
                      }
                      heartClick={() => _toggleFavorites(item)}
                      item={item}
                      showTitle={true}
                      navigate={() => {
                        props.navigation.navigate('AnimeDetail', {
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
};

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

Home2.navigationOptions = ({navigation}) => {
  return {
    header: <Header navigation={navigation} />,
  };
};

export default Home2;
