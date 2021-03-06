/* eslint-disable */
import share from '../components/Share';
import React from 'react';
import {
  Image,
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Heart from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-paper';

export class FilmCard extends React.Component {
  screenWidth = Math.round(Dimensions.get('window').width);

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={this.props.navigate}
        style={styles.view}>
        {
          <Image
            ImageResizeMode={'contain'}
            style={styles.image}
            source={
              this.props.item.img
                ? {uri: this.props.item.img}
                : null
            }
          />
        }

        <View style={styles.Btncontainer}>
          {!this.props.item.title.includes('الحلقة') && (
            <TouchableOpacity
              style={styles.btn}
              onPress={this.props.heartClick}>
              <Heart
                name={this.props.isFavorite ? 'heart' : 'hearto'}
                color={this.props.isFavorite ? 'red' : 'black'}
                size={15}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => share(this.props.item)}>
            <FontAwesome name="send-o" size={15} color="black" />
          </TouchableOpacity>
        </View>
        {this.props.showTitle && (
          <Text style={styles.title}>{this.props.item.title}</Text>
        )}
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
      height: 15,
    },
    shadowOpacity: 0.23,
    shadowRadius: 30,

    elevation: 4,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: screenWidth / 24,
    width: screenWidth / 2.5,
    height: screenWidth / 2,
    backgroundColor: 'white',
    overflow: 'visible',
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },

  image: {
    width: null,
    height: null,
    flex: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  Btncontainer: {
    position: 'absolute',
    top: screenWidth / 5,
    right: -13,
    bottom: 0,
    zIndex: 9,
    overflow: 'visible',
  },
  btn: {
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  title: {
    position: 'absolute',
    bottom: 0,
    color: 'white',
    textAlign: 'left',
    fontFamily: 'JF Flat regular',
    fontSize: 17,

    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 1,
    textShadowColor: '#000',
    paddingLeft: 20,
    paddingBottom: 20,
  },
});
