import React from 'react';

import {Searchbar} from 'react-native-paper';
import {
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  View,
  Modal,
  ScrollView,
  Image,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';

import cheerio from 'cheerio-without-node-native';
import axios from 'axios';
import AnimeServers from '../components/AnimeServers';
import {PlayCard} from '../components/PlayCard';
import {FilmCard} from '../components/FilmCard';
import Loader from '../components/Loader';

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
          console.log(href);
          this.setState({epsHref: href});
        }
      })
      .catch(error => {
        error;
      });
  };

  componentDidMount() {}

  render() {
    const {firstQuery} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        
          <Searchbar
            
            placeholder="Search"
            onChangeText={query => {
              this.setState({firstQuery: query}, () =>
                this.SearchKnow(this.state.firstQuery),
              );
            }}
            value={firstQuery}
          />
          
         

        {this.state.fetching ? (
          <Loader />
        ) : (
          <FlatList
            data={this.state.anime}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) =>
            item.img &&  item.title.includes("فيلم") ? 
               
            (  <FilmCard item={item}  showTitle={false} navigate={()=>{this.props.navigation.push('FilmDetail', {  item:item })} } />)
              :
             ( <PlayCard
                  item={item}
                  showTitle={true}
                  navigate={() => this.getEpsServers(item.link)}
                />)
            }
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          />
        )}

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
    backgroundColor: '#f8f5fa',
    flex: 1,
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

export default connect(mapStateToProps, null)(SearchPage);
