import axios from 'axios';
import cheerio from 'cheerio-without-node-native';
import React from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import AnimeServers from '../components/AnimeServers';
import {FilmCard} from '../components/FilmCard';
import Loader from '../components/Loader';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
class SearchPage extends React.Component {
  state = {
    firstQuery: '',
    anime: [],
    epsHref: [],
    showModal: false,
    fetching: false,
  };

  SearchKnow = async searchQuery => {
    this.setState({fetching: true});
    axios({
      method: 'get',
      url: `https://anime2001.com/?s=${searchQuery}`,
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

        let filmN = this.props.films.filter(
          film =>
            film.title &&
            film.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );

        const concat = [...filmN, ...myData];

        this.setState({
          anime: concat,
          fetching: false,
        });
      })
      .catch(error => {
        error;
      });
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
          
          
          if ( href.length <= 0  ) {
            console.log("count2",href.length)
            $('.episode-videoplay ul li').map((_, elm) => {
              href.push({text: $(elm).text(), link: $(elm).attr('data-href')});
            });
          } 
          
          this.setState({epsHref: href});
        }
      })
      .catch(error => {
        error;
      });
  };

  componentDidMount() {}

  render() {
    console.log('search props', this.props);
    const {firstQuery} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            height: screenHeight / 4,
            flexDirection: 'row',
            backgroundColor: '#89C13D',
            overflow:"hidden"
          }}>
          <Text style={styles.message}>
            ابحث عن الأنمي المفضل لديك هنا واستمتع !!!
          </Text>
          <View style={styles.imageView}>
            <Image
              style={styles.animImage}
              source={require('../images/hero.png')}
            />
          </View>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            theme={{
              colors: {
                backgroundColor: 'white',
                placeholder: '#89C13D',
                text: 'gray',
                primary: '#89C13D',
                textAlign:"right"
              },
            }}
             
keyboardType={"default"}
            style={{height:50,backgroundColor:"#fff"}}
            underlineColor="#89C13D"
            label="بحث"
            onChangeText={query => {
              this.setState({firstQuery: query}, () =>
                this.SearchKnow(this.state.firstQuery),
              );
            }}
          />
        </View>
        <View style={{borderRadius:30,overflow:"hidden",backgroundColor:"#fff",height:screenHeight}}>
        {this.state.fetching ? (
          <Loader />
        ) : (
          this.state.anime &&
          this.state.anime.length > 0 && (
          
            <FlatList
               
              data={this.state.anime}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) =>
                item.img ? (
                  item.title.includes('فيلم') ? (
                    <FilmCard
                      item={item}
                      showTitle={true}
                      navigate={() => {
                        this.props.navigation.navigate('FilmDetail', {
                          item: item,
                        });
                      }}
                    />
                  ) : (
                    <FilmCard
                      item={item}
                      showTitle={true}
                      navigate={() => this.getEpsServers(item.link)}
                    />
                  )
                ) : null
              }
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
            />
          )
        )}
</View>
        <AnimeServers
          hide={() => this.setState({showModal: false})}
          epsHref={this.state.epsHref}
          showModal={this.state.showModal}
          navigation={this.props.navigation}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: '#89C13D',
    flex: 1,
    
  },
  animImage: {
    width: null,
    height: null,
    flex: 1,
  },
  imageView: {
    flex: 2,

    width: screenWidth / 1.5,
    height: screenWidth / 1.5,
  },
  message: {
    padding: 20,
    top:-20,
    lineHeight: 40,
    color: '#fff',
    fontFamily: 'JF Flat regular',
    flex: 2,
    fontSize: 17,
    alignSelf: 'center',
  },
  textInputContainer: {
    overflow:"hidden",
    borderRadius: 50,
    alignSelf: 'center',
    position: 'absolute',
    flex: 1,
    width: screenWidth - 100,
    top: screenHeight / 5,
  },
});

const mapStateToProps = state => {
  return {
    films: state.films && state.films.payload ? state.films.payload : [],
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  null,
)(SearchPage);
