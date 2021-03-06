import axios from 'axios';
import cheerio from 'cheerio-without-node-native';
import React from 'react';
import TextStyled from '../components/TextStyled';
import {FilmCard} from '../components/FilmCard';
import {toggleFavorites} from '../redux/FavoritesAnim';
import Toast from 'react-native-simple-toast';

import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {
  TextInput,
  ActivityIndicator,
  Chip,
  IconButton,
} from 'react-native-paper';
import Play from 'react-native-vector-icons/AntDesign';
import Pray from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import AnimeServers from '../components/AnimeServers';
import {CardEpisode} from '../components/CardEpisode';
import {animeDetailRequest} from '../redux/AnimeDetailRedux';
import {set} from 'react-native-reanimated';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
let links = [];
class AnimeDetail extends React.Component {
  state = {
    epsHref: [],
    showModal: false,
    anime: this.props.navigation.state.params.item,
    display: false,
    firstQuery: '',

    alreadyViewed: [],

    downloadUrls: [],
    downloadModal: false,
  };

  componentDidMount() {
    console.log('mamamia', this.props.navigation.state.params.item);
    this.showEyes();
    this.props.AnimeDetailRequest(this.state.anime.link);
  }

  componentWillUpdate = (nextProps, nextState) => {
    if (
      this.props.navigation.state.params.item !==
      nextProps.navigation.state.params.item
    ) {
      this.setState({anime: nextProps.navigation.state.params.item});
      nextProps.AnimeDetailRequest(nextProps.navigation.state.params.item.link);
    }
  };

  showEyes = async () => {
    const existingNames = await AsyncStorage.getItem('names');

    let AllNames = JSON.parse(existingNames);

    this.setState({alreadyViewed: AllNames});
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

  getEpsServers = async (link, name) => {
    const nameToBeSaved = {name: name};
    const existingNames = await AsyncStorage.getItem('names');

    let newName = JSON.parse(existingNames);

    if (!newName) {
      newName = [];
    }
    let alreadyExist = newName.filter(n => n.name === name).length > 0;

    if (!alreadyExist) {
      newName.push(nameToBeSaved);
    }
    let href = [];
    await AsyncStorage.setItem('names', JSON.stringify(newName))
      .then(() => {
        console.log('‘It was saved successfully’');
      })
      .catch(() => {
        console.log('‘There was an error saving the product’');
      });

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

          console.log('count', href.length);
          /*  if (href.length <= 0) {
            console.log('count2', href.length);
            $('.episode-videoplay ul li').map((_, elm) => {
              href.push({text: $(elm).text(), link: $(elm).attr('data-href')});
            });
          } */
          console.log(href);
          this.setState({epsHref: href}, () => {
            console.log('hahowa', this.state.epsHref);
          });
        }
      })
      .catch(error => {
        error;
      });
  };
  render() {
    console.log('@@animeDetail', this.props.animeDetail);
    console.log('@@anime name', this.props.navigation.state.params.item.title);
    /*
    published
season
category
status
episodesNbr
story
streamLinks
relatedF */
    const posterImage =
      this.props.animeDetail && this.props.animeDetail.length > 0
        ? this.props.animeDetail[0].image
        : '';

    const season =
      this.props.animeDetail && this.props.animeDetail.length > 0
        ? this.props.animeDetail[0].season
        : '';

    const status =
      this.props.animeDetail && this.props.animeDetail.length > 0
        ? this.props.animeDetail[0].status
        : '';

    console.log('hiastatus', status);

    const episodesNbr =
      this.props.animeDetail && this.props.animeDetail.length > 0
        ? this.props.animeDetail[0].episodesNbr
        : '';

    const cat =
      this.props.animeDetail && this.props.animeDetail.length > 0
        ? this.props.animeDetail[0].category
        : '';

    console.log('voilacat', cat);

    const story =
      this.props.animeDetail && this.props.animeDetail.length > 0
        ? this.props.animeDetail[0].story
        : [];

    console.log('storia', story);
    const published =
      this.props.animeDetail && this.props.animeDetail.length > 0
        ? this.props.animeDetail[0].published
        : [];
    const duration = '';
    /* this.props.animeDetail && this.props.animeDetail.length > 0
        ? this.props.animeDetail[0]['duration']
        : []; */
    const streamLinks =
      this.props.animeDetail && this.props.animeDetail.length > 0
        ? this.props.animeDetail[0].streamLinks
        : [];

    links = streamLinks.filter(video =>
      video.text.includes(this.state.firstQuery),
    );

    console.log('alreadyViewed', this.state.alreadyViewed);

    const relatedF =
      this.props.animeDetail && this.props.animeDetail.length > 0
        ? this.props.animeDetail[0].relatedF
        : [];

    const getDownloadLinks = link => {
      let href = [];

      this.setState({downloadModal: true});
      axios({
        method: 'get',
        url: link,
      })
        .then(response => {
          if (response.status === 200) {
            const htmlString = response.data; // get response text
            const $ = cheerio.load(htmlString); // parse HTML string

            $('.quality-list   li').map((_, elm) => {
              href.push({
                text: $('a', elm).text(),
                link: $('a', elm).attr('href'),
              });
            });

            console.log('downloadUrls', href.length);

            console.log(href);
            this.setState({downloadUrls: href});
          }
        })
        .catch(error => {
          error;
        });
    };

    return (
      <ScrollView style={styles.scroll}>
        <ImageBackground
          blurRadius={1}
          source={{
            uri: this.state.anime.img
              ? this.state.anime.img
              : posterImage
              ? posterImage
              : null,
          }}
          style={styles.bkg}>
          <View style={styles.viewDATA}>
            <View style={styles.imageContainer}>
              <Image
                ImageResizeMode={'contain'}
                style={styles.image}
                source={{
                  uri: this.state.anime.img
                    ? this.state.anime.img
                    : posterImage
                    ? posterImage
                    : null,
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
                      this.props.navigation.navigate('ByCategory', {
                        title: item.title,
                        type: 'anime',
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
                    onPress={() => this.getEpsServers(streamLinks[0].link, '')}>
                    <Play
                      name="play"
                      size={35}
                      color="#89C13D"
                      style={{borderRadius: 20}}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{flex: 1}}>
                  {status[0] ? (
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          color: '#9A999A',
                          fontFamily: 'JF Flat regular',
                          marginRight: 10,
                        }}>
                        {status[1]}
                      </Text>
                      <Text style={{fontFamily: 'JF Flat regular'}}>
                        {status[0]}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                  {published[0] ? (
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'JF Flat regular',
                          color: '#9A999A',
                          marginRight: 10,
                        }}>
                        {published[1]}
                      </Text>
                      <Text style={{fontFamily: 'JF Flat regular'}}>
                        {published[0]}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                  {duration[0] ? (
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'JF Flat regular',
                          color: '#9A999A',
                          marginRight: 24,
                        }}>
                        {duration[1]}
                      </Text>
                      <Text style={{fontFamily: 'JF Flat regular'}}>
                        {duration[0]}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                  {episodesNbr[0] ? (
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'JF Flat regular',
                          color: '#9A999A',
                          marginRight: 10,
                        }}>
                        {episodesNbr[1]}
                      </Text>
                      <Text style={{fontFamily: 'JF Flat regular'}}>
                        {episodesNbr[0]}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                  {season[0] ? (
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                      }}>
                      <Text
                        onPress={() =>
                          this.props.navigation.navigate('BySeason', {
                            link: season[2],
                            title: season[1],
                          })
                        }
                        style={{
                          fontFamily: 'JF Flat regular',
                          color: 'red',
                          borderBottomWidth: 1,
                          borderColor: 'red',
                          marginRight: 10,
                        }}>
                        {season[1]}
                      </Text>
                      <Text style={{fontFamily: 'JF Flat regular'}}>
                        {season[0]}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                </View>
              </View>
            )}
            {!this.props.fetching &&
              story.map((p, i) => {
                return p ? (
                  <Text
                    key={i}
                    style={{
                      lineHeight: 20,
                      fontFamily: 'JF Flat regular',
                      padding: 20,
                      color: '#9A999A',
                    }}>
                    {p}
                  </Text>
                ) : (
                  <></>
                );
              })}
          </View>
        </ImageBackground>

        {!this.props.fetching && (
          <React.Fragment>
            {links.length > 0 && (
              <View>
                <IconButton
                  icon={() => (
                    <Play name="search1" size={20} color={'#89C13D'} />
                  )}
                  size={20}
                  onPress={() => this.setState({display: !this.state.display})}
                />

                {this.state.display && (
                  <TextInput
                    style={{margin: 10}}
                    theme={{
                      colors: {
                        placeholder: '#89C13D',
                        text: 'gray',
                        primary: '#89C13D',
                      },
                    }}
                    underlineColor="#89C13D"
                    label="رقم الحلقة"
                    onChangeText={query => {
                      this.setState({firstQuery: query});
                    }}
                  />
                )}
              </View>
            )}

            <View style={{flex: 1}} />
            {links.length > 0 ? (
              <FlatList
                data={links}
                renderItem={({item, i}) => (
                  <CardEpisode
                    getDownloadLinks={() => getDownloadLinks(item.link)}
                    alreadyViewed={
                      this.state.alreadyViewed &&
                      this.state.alreadyViewed.length
                        ? this.state.alreadyViewed.filter(
                            obj => obj.name === item.text,
                          ).length > 0
                        : false
                    }
                    img={this.state.anime.img}
                    key={i}
                    video={item}
                    navigate={() => this.getEpsServers(item.link, item.text)}
                  />
                )}
                keyExtractor={(item, i) => i.toString()}
              />
            ) : (
              <View style={{alignItems: 'center'}}>
                {published[0] && (
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'JF Flat regular',
                        color: '#9A999A',
                        marginRight: 10,
                      }}>
                      {published[1]}
                    </Text>
                    <Text style={{fontFamily: 'JF Flat regular'}}>
                      {published[0]}
                    </Text>
                  </View>
                )}
                <Text
                  style={{fontFamily: 'JF Flat regular', alignSelf: 'center'}}>
                  نعتذر، الحلقات في عملية التحضير
                </Text>
                <IconButton
                  icon={() => (
                    <Pray name="praying-hands" size={30} color={'#89C13D'} />
                  )}
                  size={30}
                  onPress={() => this.props.navigation.goBack()}
                />
              </View>
            )}
          </React.Fragment>
        )}
        <AnimeServers
          hide={() => this.setState({showModal: false})}
          epsHref={this.state.epsHref}
          showModal={this.state.showModal}
          navigation={this.props.navigation}
        />

        <AnimeServers
          hide={() => this.setState({downloadModal: false})}
          epsHref={this.state.downloadUrls.slice(
            1,
            this.state.downloadUrls.length,
          )}
          showModal={this.state.downloadModal}
          forDownload={true}
        />

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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  bkg: {
    width: '100%',
  },
  scroll: {backgroundColor: '#FFF'},

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
    top: 0,
    marginBottom: 20,
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
  relatedF: {
    paddingBottom: 10,
  },
  ActivityIndicator: {
    height: screenHeight / 2,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    animeDetail: state.animeDetail.payload ? state.animeDetail.payload : [],
    fetching: state.animeDetail.fetching,
    favoritesAnim: state.favoritesAnim.data || [],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleFavorites: data => dispatch(toggleFavorites(data)),
    AnimeDetailRequest: data => dispatch(animeDetailRequest(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnimeDetail);
