import React from 'react';
import {Animated, Dimensions, View} from 'react-native';
import {Text} from 'react-native-paper';
import {AnimatedCard} from './AnimatedCard';

const {width, height} = Dimensions.get('window');

const AnimatedCarousel = props => {
  const scrollX = React.useRef(new Animated.Value()).current;
  const {newAnime, _toggleFavorites, favoritesAnim} = props;
  return (
    <View style={{height: height}}>
      {newAnime && newAnime.length ? (
        <Animated.FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={newAnime}
          bounce={false}
          contentContainerStyle={{alignItems: 'center'}}
          snapToInterval={width * 0.72}
          bounces={0}
          decelerationRate={0}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={16}
          renderItem={({item, index}) => (
            <AnimatedCard
              index={index}
              isFavorite={
                favoritesAnim.filter(animF => animF.link === item.link).length >
                0
              }
              heartClick={() => _toggleFavorites(item)}
              item={item}
              navigate={() => {
                props.navigation.navigate('AnimeDetail', {
                  index: index,
                  item: item,
                });
              }}
            />
          )}
          keyExtractor={item => item.link}
        />
      ) : (
        <View />
      )}
    </View>
  );
};

export default AnimatedCarousel;
