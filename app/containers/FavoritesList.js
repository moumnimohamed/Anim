import axios from 'axios';
import cheerio from 'cheerio-without-node-native';
import {Button as B} from 'react-native-paper';
import React from 'react';
import Toast from 'react-native-simple-toast';

import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import {FilmCard} from '../components/FilmCard';
import {toggleFavorites} from '../redux/FavoritesAnim';
import AnimeServers from '../components/AnimeServers';
class FavoritesList extends React.Component {
  state = {
    epsHref: [],
    showModal: false,
    fetching: false,
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

          this.setState({epsHref: href});
        }
      })
      .catch(error => {
        error;
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {!this.props.favoritesAnim.length && (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Image
              style={{width: 100, height: 100, margin: 10}}
              source={require('../images/logo.png')}
            />
            <Text
              style={{
                marginBottom: 20,
                color: '#89C13D',
                fontSize: 17,
                fontFamily: 'JF Flat regular',
              }}>
              هنا ، ستجد كل الأنمي المحفوظ الخاص بك
            </Text>
            <Text
              style={{
                marginBottom: 20,
                fontSize: 15,
                fontFamily: 'JF Flat regular',
              }}>
              لا يوجد انمي محفوظ
            </Text>
            <B
              mode="contained"
              style={{
                fontFamily: 'JF Flat regular',
                backgroundColor: '#89C13D',
                borderRadius: 20,
              }}
              onPress={() => this.props.navigation.navigate('Home')}>
              اكتشف
            </B>
          </View>
        )}
        <FlatList
          data={this.props.favoritesAnim}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) =>
            item.img ? (
              item.title.includes('فيلم') ? (
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
                    this.props.navigation.navigate('FilmDetail', {
                      item: item,
                    });
                  }}
                />
              ) : (
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
            ) : null
          }
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
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
       marginTop:40,
       flex:1
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
)(FavoritesList);
