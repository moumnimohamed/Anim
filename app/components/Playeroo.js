import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { default as Play, default as V } from 'react-native-vector-icons/AntDesign';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export function Playeroo(props) {
  /* const downloadWithADM = () => {
    const url = 'whatsapp://';

			 Linking.canOpenURL(url).then(supported => {

				if (!supported) {

					console.log('Can\'t handle url: ' + url);

		 }else{

					return Linking.openURL(url);

		}

		 }).catch(err =>

		       console.error('An error occurred', err));
  }
   */
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.container}
      colors={['#fff', '#89C13D']}>
      <TouchableOpacity style={styles.btn} onPress={props.navigate}>
        <Play name="play" size={20} color="#89C13D" />
      </TouchableOpacity>

      

      <View style={styles.name}>
        <Text
          style={{
            paddingHorizontal: 10,
            textAlign: 'center',
            color: '#fff',
            fontFamily: 'JF Flat regular',
          }}>
          {props.video && props.video.text ? props.video.text : ''}
        </Text>
        <V name="videocamera" size={20} color="#fff" />
      </View>
       </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderRadius: 20,
    paddingVertical: 5,
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
  name: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  btn: {marginRight: 10},
});
