import {SafeAreaView, FlatList, StyleSheet,Image,View,Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {toggleFavorites} from '../redux/FavoritesAnim';
import {FilmCard} from '../components/FilmCard';
import CategoryCard from '../components/CategoryCard';
import cheerio from 'cheerio-without-node-native';
import axios from 'axios';

import Loader from '../components/Loader';
import {ActivityIndicator} from 'react-native-paper';

const screenHeight = Math.round(Dimensions.get('window').height);
function BySeason(props) {
  const [anime, setAnime] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    console.log('dd', props.navigation.state.params.link);
    if (!anime.length > 0) {
      getAnimeBySeason(props.navigation.state.params.link);
    }
  }, [props.navigation.state.params.link]);

  const getAnimeBySeason = async link => {
    setFetching(true)
    axios({
      method: 'get',
      url: link,
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
        setFetching(false)
        setAnime(myData);
      })
      .catch(error => {
        setFetching(false)
        error;
      });
  };

  const _toggleFavorites = (anime, props) => {
    const index = props.favoritesAnim.findIndex(
      anim => anim.link === anime.link,
    );
    if (index == -1) {
      alert('added to favorites');
    } else {
      alert('deleted from favorites');
    }

    props.toggleFavorites(anime);
  };

  return (
    <SafeAreaView>
      {/* <FlatList
              style={{ marginLeft:5,marginTop:10,marginBottom:10 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={props.categories}
              renderItem={({ item }) => item.title && <CategoryCard title={ item.title}  navigate={()=> {  props.navigation.push('ByCategory',{title:item.title,type:"anime"})}}/>}
        keyExtractor={item => (Math.random() * (0.120 - 0.0200) + 0.0200).toFixed(8)}
        /> */}
      {!fetching ? (
        <FlatList
          data={anime}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) =>
            item &&
            item.img && (
              <FilmCard
                showTitle={true}
                isFavorite={
                  props.favoritesAnim.filter(animF => animF.link === item.link)
                    .length > 0
                }
                heartClick={() => _toggleFavorites(item, props)}
                item={item}
                navigate={() => {
                  props.navigation.navigate('AnimeDetail', {item: item});
                }}
              />
            )
          }
          numColumns={2}
          ListFooterComponent={() => {
            if (!props.fetching) return null;
            return <Loader />;
          }}
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


const styles = StyleSheet.create({
  
  ActivityIndicator: {
    height: screenHeight/2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


BySeason.navigationOptions = screenProps => ({
  title: screenProps.navigation.state.params.title,
});

const mapStateToProps = state => {
  return {
    favoritesAnim: state.favoritesAnim.data || [],
    categories:
      state.animeList && state.animeList.categories
        ? state.animeList.categories
        : [],
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
)(BySeason);
