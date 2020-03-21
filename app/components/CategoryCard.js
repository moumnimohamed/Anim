import * as React from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class CategoryCard extends React.Component {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.view}
        onPress={() => this.props.navigate()}>
         
          <Image source={{uri: this.props.item.img}} style={styles.img} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Title
              style={{
                fontFamily: 'JF Flat regular',
                fontSize: 15,
                color: 'white',
                textShadowColor: '#000',
                textShadowOffset: {width: 0.5, height: 0.5},
                textShadowRadius: 1,
              }}>
              {this.props.item.title}
            </Title>
            <Icon
              style={{paddingHorizontal: 10}}
              name={'animation-play'}
              color="black"
              size={15}
              color={'#fff'}
            />
          </View>
         
      </TouchableOpacity>
    );
  }
}
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  view: {
    
     

    marginHorizontal: 10,

    width: screenWidth / 3,
    height: 40,
    borderRadius: 10,
    overflow: 'hidden',
  },

  img: {
    width: "100%",
    height: "100%",
  
    position:"absolute",

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
  linearGradient: {flex: 1, justifyContent: 'center'},
});
