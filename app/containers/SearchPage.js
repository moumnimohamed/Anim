import axios from 'axios';
import cheerio from 'cheerio-without-node-native';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet,Text } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { connect } from 'react-redux';
import AnimeServers from '../components/AnimeServers';
import { FilmCard } from '../components/FilmCard';
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

    console.log("search props",this.props)
    const {firstQuery} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        
          <Searchbar
            
            placeholder="بحث"
            onChangeText={query => {
              this.setState({firstQuery: query}, () =>
                this.SearchKnow(this.state.firstQuery),
              );
            }}
            value={firstQuery}
          />
          
         

        {this.state.fetching ? (
          <Loader />
        ) : this.state.anime && this.state.anime.length > 0  ? (
          <FlatList
            data={this.state.anime}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) =>
            item.img ?  item.title.includes("فيلم") ? 
               
            (  <FilmCard item={item}  showTitle={true} navigate={()=>{this.props.navigation.navigate('FilmDetail', {item:item })} } />)
              :
             ( <FilmCard
                  item={item}
                  showTitle={true}
                  navigate={() => this.getEpsServers(item.link)}
                />)
                :   null 
            }
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          />
        )
        :
        (
           <Text> إبحث  عن أنيمي المفضلة لديك !!!</Text>
        )
        }

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
