import axios from 'axios';
import cheerio from 'cheerio-without-node-native';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Chip} from 'react-native-paper';
import Play from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {CardEpisode} from '../components/CardEpisode';
import {Playeroo} from '../components/Playeroo';
import AnimeServers from '../components/AnimeServers';
import {animeDetailRequest} from '../redux/AnimeDetailRedux';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import {NavigationEvents} from 'react-navigation';

class AnimeDetail extends React.Component {
  state = {
    epsHref: [],
    showModal: false,
    anime: this.props.navigation.state.params.item,
  };

  componentDidMount() {
    this.props.AnimeDetailRequest(this.state.anime.link);
  }

  /*   componentWillUpdate  = (nextProps, nextState) => {
     if(this.props.navigation.state.params.item.title !== nextProps.navigation.state.params.item.title) 
    this.props.AnimeDetailRequest(nextState.anime.link);
  };  */

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
          });
                   console.log("count",href.length)
           if ( href.length <= 0  ) {
            console.log("count2",href.length)
            $('.episode-videoplay ul li').map((_, elm) => {
              href.push({text: $(elm).text(), link: $(elm).attr('data-href')});
            });
          } 
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

    const season =
      this.props.animeDetail && this.props.animeDetail.length > 0
        ? this.props.animeDetail[0]['season']
        : '';

    const status =
      this.props.animeDetail && this.props.animeDetail.length > 0
        ? this.props.animeDetail[0]['status']
        : '';

    const episodesNbr =
      this.props.animeDetail && this.props.animeDetail.length > 0
        ? this.props.animeDetail[0]['episodesNbr']
        : '';

    const cat =
      this.props.animeDetail && this.props.animeDetail.length > 0
        ? this.props.animeDetail[0]['category']
        : '';

    const story =
      this.props.animeDetail && this.props.animeDetail.length > 0
        ? this.props.animeDetail[0]['story']
        : [];
    const published =
      this.props.animeDetail && this.props.animeDetail.length > 0
        ? this.props.animeDetail[0]['published']
        : [];
    const duration = '';
    /* this.props.animeDetail && this.props.animeDetail.length > 0
        ? this.props.animeDetail[0]['duration']
        : []; */
    const streamLinks =
      this.props.animeDetail && this.props.animeDetail.length > 0
        ? this.props.animeDetail[0]['streamLinks']
        : [];

    console.log('streamLinks@', season);
    return (
      <ScrollView style={styles.scroll}>
        <ImageBackground
          blurRadius={1}
          source={{uri: this.state.anime.img ? this.state.anime.img : ''}}
          style={styles.bkg}>
          <View style={styles.viewDATA}>
            <View style={styles.imageContainer}>
              <Image
                ImageResizeMode={'contain'}
                style={styles.image}
                source={{uri: this.state.anime.img ? this.state.anime.img : ''}}
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
                      type: 'anime',
                    });
                  }}>
                  <Text style={{color: '#9A999A'}}>{item.title}</Text>
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
                  onPress={() => this.getEpsServers(streamLinks[0].link)}>
                  <Play
                    name="play"
                    size={35}
                    color="#89C13D"
                    style={{borderRadius: 20}}
                  />
                </TouchableOpacity>
              </View>

              <View style={{flex: 1}}>
                {status[0] && (
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      flexDirection: 'row',
                    }}>
                    <Text style={{color: '#9A999A', marginRight: 10}}>
                      {status[1]}
                    </Text>
                    <Text>{status[0]}</Text>
                  </View>
                )}
                {published[0] && (
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      flexDirection: 'row',
                    }}>
                    <Text style={{color: '#9A999A', marginRight: 10}}>
                      {published[1]}
                    </Text>
                    <Text>{published[0]}</Text>
                  </View>
                )}
                {duration[0] && (
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      flexDirection: 'row',
                    }}>
                    <Text style={{color: '#9A999A', marginRight: 24}}>
                      {duration[1]}
                    </Text>
                    <Text>{duration[0]}</Text>
                  </View>
                )}
                {episodesNbr[0] && (
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      flexDirection: 'row',
                    }}>
                    <Text style={{color: '#9A999A', marginRight: 10}}>
                      {episodesNbr[1]}
                    </Text>
                    <Text>{episodesNbr[0]}</Text>
                  </View>
                )}
                {season[0] && (
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      flexDirection: 'row',
                    }}>
                    <Text
                      onPress={() =>
                        this.props.navigation.push('BySeason', {
                          link: season[2],
                        })
                      }
                      style={{
                        color: 'red',
                        borderBottomWidth: 1,
                        borderColor: 'red',
                        marginRight: 10,
                      }}>
                      {season[1]}
                    </Text>

                    <Text>{season[0]}</Text>
                  </View>
                )}
              </View>
            </View>
            {story.map((p, i) => {
              return p && p.text ? (
                <Text key={i} style={{padding: 20, color: '#9A999A'}}>
                  {p.text}
                </Text>
              ) : null;
            })}
          </View>
        </ImageBackground>
        {streamLinks.map((video, i) => {
          return video && video.text ? (
            <CardEpisode
              img={this.state.anime.img}
              key={i}
              video={video}
              navigate={() => this.getEpsServers(video.link)}
            />
          ) : null;
        })}
        <AnimeServers
          hide={() => this.setState({showModal: false})}
          epsHref={this.state.epsHref}
          showModal={this.state.showModal}
          navigation={this.props.navigation}
        />
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
    animeDetail: state.animeDetail.payload ? state.animeDetail.payload : [],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    AnimeDetailRequest: data => dispatch(animeDetailRequest(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimeDetail);
