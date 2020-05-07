import {View, SafeAreaView, FlatList, StyleSheet, Tex} from 'react-native';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {getAnimeListRequest} from '../redux/AnimeListRedux';
import {FilmCard} from '../components/FilmCard';
import CategoryCard from '../components/CategoryCard';
import Toast from 'react-native-simple-toast';

import {toggleFavorites} from '../redux/FavoritesAnim';

const _toggleFavorites = (anime, props) => {
  const index = props.favoritesAnim.findIndex(anim => anim.link === anime.link);
  if (index == -1) {
    Toast.showWithGravity(
      "تمت إضافتها إلى قائمتك",
      Toast.LONG,
      Toast.BOTTOM,
    )
  } else {
    Toast.showWithGravity(
      "تمت إزالته إلى قائمتك",
      Toast.LONG,
      Toast.BOTTOM,
    )
  }

  props.toggleFavorites(anime);
};

const FlatListHeader = props => {
  return (
    <View>
      <FlatList
        style={{marginLeft: 5, marginTop: 10, marginBottom: 10}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={props.categories}
        renderItem={({item}) =>
          item.title && (
            <CategoryCard
              item={item}
              navigate={() => {
                props.navigation.push('ByCategory', {
                  title: item.title,
                  type: 'film',
                });
              }}
            />
          )
        }
        keyExtractor={item => (Math.random() * (0.12 - 0.02) + 0.02).toFixed(8)}
      />
    </View>
  );
};

function AnimeAllList(props) {
  const [page, setPage] = useState(2);

  const _loadAnime = () => {
    props.getAnimeList(page);
    setPage(page + 1);
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.animeList}
        ListHeaderComponent={FlatListHeader(props)}
        style={styles.FlatList}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) =>
          item.img && (
            <FilmCard
              isFavorite={
                props.favoritesAnim.filter(animF => animF.link === item.link)
                  .length > 0
              }
              heartClick={() => _toggleFavorites(item, props)}
              showTitle={true}
              item={item}
              navigate={() => {
                props.navigation.push('AnimeDetail', {item: item});
              }}
            />
          )
        }
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          _loadAnime();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  FlatList: {},
});

const mapStateToProps = state => {
  return {
    favoritesAnim: state.favoritesAnim.data || [],
    
    animeList:
      state.animeList && state.animeList.payload ? state.animeList.payload : [],
    fetching: state.animeList.fetching,
    categories:
      state.animeList && state.animeList.categories
        ? state.animeList.categories
        : [],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleFavorites: data => dispatch(toggleFavorites(data)),
    getAnimeList: data => dispatch(getAnimeListRequest(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnimeAllList);
