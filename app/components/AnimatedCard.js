import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  default as Heart,
  default as Play,
} from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import share from '../components/Share';
export class AnimatedCard extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {
            <Image
              style={styles.image}
              source={
                this.props.item.img
                  ? {uri: this.props.item.img}
                  : require('../images/splash.png')
              }
            />
          }
          <TouchableOpacity
            style={styles.playBtn}
            onPress={this.props.navigate}>
            <Play name="play" size={50} color="#89C13D" />
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <View style={styles.socialBtns}>
            <TouchableOpacity
              onPress={() => share(this.props.item)}
              style={styles.btn}>
              <FontAwesome name="send" size={20} color="black" />
            </TouchableOpacity>
            <View style={styles.likeNumber}>
              {/* <TouchableOpacity>
                <AntDesign name="like2" size={20} color="black" />
              </TouchableOpacity>
              <Text style={{marginLeft: 1}}>+1</Text> */}
              <TouchableOpacity
                style={styles.btn}
                onPress={this.props.heartClick}>
                <Heart
                  name={this.props.isFavorite ? 'heart' : 'hearto'}
                  color={this.props.isFavorite ? 'red' : 'black'}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text onPress={this.props.navigate} style={styles.title}>
            {this.props.item.title}
          </Text>

          <View style={styles.linkContainer}>
            <Text style={styles.link} onPress={this.props.navigate}>
              {this.props.item.title.includes('فيلم')
                ? 'مشاهدة الفيلم'
                : 'الحلقات'}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'visible',
    marginLeft: 3,
    marginRight: 3,
    borderRadius: 20,

    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    height: '90%',
    elevation: 5,
  },

  imageContainer: {
    top: -40,
    width: '80%',
    height: 300,

    borderRadius: 10,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignSelf: 'center',
    elevation: 5,
  },

  image: {
    flex: 1,
    width: null,
    height: null,
    overflow: 'visible',
  },
  info: {
    width: '80%',
    alignSelf: 'center',
    top: -25,
  },
  title: {
    fontFamily: 'JF Flat regular',
    textAlign: 'center',
    top: 10,
  },
  icon: {marginRight: 8, marginLeft: 8, color: 'black'},
  playBtn: {
    position: 'absolute',
    alignSelf: 'center',
  },
  linkContainer: {
    marginTop: 20,
    marginBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  link: {
    fontFamily: 'JF Flat regular',
    borderBottomColor: '#89C13D',
    borderBottomWidth: 2,
    marginBottom: 30,
    color: '#707070',
  },
  socialBtns: {
    flexDirection: 'row',
  },

  btn: {},
  likeNumber: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
});
