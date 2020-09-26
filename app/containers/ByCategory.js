import axios from 'axios';
import cheerio from 'cheerio-without-node-native';
import React from 'react';
import {FlatList, SafeAreaView, StyleSheet,View,Image,Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {FilmCard} from '../components/FilmCard';
import {toggleFavorites} from '../redux/FavoritesAnim';
import {ActivityIndicator} from 'react-native-paper';
import Toast from 'react-native-simple-toast';


const screenHeight = Math.round(Dimensions.get('window').height);
class AnimeDetail extends React.Component {
  state = {
    anime: [],
    fetching: false,
  };

  getAnimeByCat = async link => {

    console.log("catLink",link)
    this.setState({fetching:true})
    axios({
      method: 'get',
      url: link,
    })
      .then(response => {

        if (response.status === 200) {
          
          const htmlString = response.data; // get response text
          const $ = cheerio.load(htmlString); // parse HTML string

           const  liList = $('.anime-card-container  .hover.ehover6').map((_, hover) => ({
            // map to an list of objects
            title: $('img', hover).attr('alt'),
            img: $('img', hover).attr('src'),
            link: $('a', hover).attr('href'),
          }));

          var myData = Object.keys(liList).map(key => {
            return liList[key];
          });
        }

        console.log("catLinkmyData",myData)
        this.setState({
          fetching:false,
          anime: myData,
        });
      })
      .catch(error => {
        this.setState({fetching:false})
        error;
      });
  };

  componentDidMount() {
    const type = this.props.navigation.state.params.type;
    const catName = this.props.navigation.state.params.title.replace(' ', '-');
    const link =
      type === 'anime'
        ? `https://animekom.com/anime-genre/${catName}`
        : `https://animekom.com/anime-genre/${catName}`;
    this.getAnimeByCat(link);
  }

  componentWillUpdate = nextProps => {
    if (
      this.props.navigation.state.params.title !==
      nextProps.navigation.state.params.title
    ) {
      const type = nextProps.navigation.state.params.type;
      const catName = nextProps.navigation.state.params.title.replace(' ', '-');
      const link =
        type === 'anime'
          ? `https://anime2001.com/anime_genre/${catName}`
          : `https://anime2001.com/movie_genre/${catName}`;
      this.getAnimeByCat(link);
    }
  };

  _toggleFavorites = anime => {
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
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {!this.state.fetching ? (
          <FlatList
            data={this.state.anime}
            extraData={this.state.anime}
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
                  showTitle={true}
                  item={item}
                  navigate={() => {
                     this.props.navigation.navigate('AnimeDetail', {item: item});
                  }}
                />
              )
            }
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View style={styles.ActivityIndicator}>
            <Image
              style={{width: 50, height: 50, position: 'absolute'}}
              source={require('../images/logo.png')}
            />
            <ActivityIndicator animating={true} size={50} color={'#000'} />
          </View>
        )}
      </SafeAreaView>
    );
  }
}

AnimeDetail.navigationOptions = screenProps => ({
  title: screenProps.navigation.state.params.title,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ActivityIndicator: {
    height: screenHeight/2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    favoritesAnim: state.favoritesAnim.data || [],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleFavorites: data => dispatch(toggleFavorites(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnimeDetail);
