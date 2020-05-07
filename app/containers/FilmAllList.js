import {View, SafeAreaView, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import CategoryCard from '../components/CategoryCard';
import {FilmCard} from '../components/FilmCard';
import {toggleFavorites} from '../redux/FavoritesAnim';
import Toast from 'react-native-simple-toast';

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
                props.navigation.navigate('ByCategory', {
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

const _toggleFavorites = (anime,props) => {
  const index = props.favoritesAnim.findIndex(
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

  props.toggleFavorites(anime);
}

function FilmAllList(props) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={FlatListHeader(props)}
        data={props.films}
        style={styles.FlatList}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) =>
          item.img && (
            <FilmCard
              isFavorite={
                props.favoritesAnim.filter(
                  animF => animF.link === item.link,
                ).length > 0
              }
              heartClick={() =>  _toggleFavorites(item,props)}
              showTitle={true}
              item={item}
              navigate={() => {
                props.navigation.navigate('FilmDetail', {item: item});
              }}
            />
          )
        }
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
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
    films: state.films && state.films.payload ? state.films.payload : [],
    categories:
      state.films && state.films.categories ? state.films.categories : [],
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
)(FilmAllList);
