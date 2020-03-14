import * as React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {LinearTextGradient} from 'react-native-text-gradient';
import {connect} from 'react-redux';

export default class CategoryCard extends React.Component {
  render() {
    
    return (
      <TouchableOpacity
      activeOpacity={0.9}
        style={styles.view}
        onPress={() => this.props.navigate()}>
        <LinearGradient
          colors={[this.props.item.colorLeft, this.props.item.colorRight]}
          style={styles.linearGradient}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Title
              style={{
                color: 'white',
                textShadowColor: '#000',
                textShadowOffset: {width: 0.5, height: 0.5},
                textShadowRadius: 1,
              }}>
              {this.props.item.title}
            </Title>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  view: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    alignSelf: 'center',
     marginHorizontal:10,

    width: screenWidth / 3,
    height: 30 ,
    borderRadius: 10,
    overflow: 'hidden',
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
  linearGradient: {flex: 1},
});
