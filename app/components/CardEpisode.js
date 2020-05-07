import Heart from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Play from 'react-native-vector-icons/AntDesign';
import share from '../components/Share';
import {
  Image,
  ImageBackground,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {Switch} from 'react-native-paper';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import PlayerContext from './PlayerContext';

export function CardEpisode(props) {
  console.log('hania', props.alreadyViewed);

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.container}
      colors={['#fff', props.alreadyViewed ? 'red' : '#89C13D']}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={props.navigate}>
          <Image
            ImageResizeMode={'contain'}
            style={styles.image}
            source={{uri: props.img ? props.img : ''}}
          />
        </TouchableOpacity>
        {props.alreadyViewed && (
          <View style={{...styles.eye}}>
            <Heart name="eyeo" size={20} color="red" />
          </View>
        )}
      </View>
      <Text
        onPress={props.navigate}
        style={{
          width: '60%',
          fontFamily: 'JF Flat regular',
          paddingHorizontal: 10,
          textAlign: 'center',
          color: '#535353',
        }}>
        {props.video && props.video.text ? props.video.text : ''}
      </Text>

      <View style={styles.name}>
        <TouchableOpacity
          style={{...styles.btn, marginRight: 10}}
          onPress={() => share({title: props.video.text})}>
          <FontAwesome name="send-o" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={props.navigate}>
          <Play name="play" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  name: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  btn: {justifyContent: 'center', alignItems: 'center', width: 30, height: 30},
  eye: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
    borderRadius: 15,
    backgroundColor: '#fff',
    position: 'absolute',

    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
});
