import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Switch } from 'react-native-paper';
import { default as Play, default as V } from 'react-native-vector-icons/AntDesign';

export function Playeroo(props) {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.container}
      colors={['#fff', '#89C13D']}>
      <TouchableOpacity style={styles.btn} onPress={props.navigate}>
        <Play name="play" size={20} color="#89C13D" />
      </TouchableOpacity>

      <Switch
        style={styles.btn}
        color={'#89C13D'}
        value={true}
        onValueChange={() => {
          this.setState({isSwitchOn: !isSwitchOn});
        }}
      />

      <View style={styles.name}>
        <Text
          style={{paddingHorizontal: 10, textAlign: 'center', color: '#fff',   fontFamily: 'JF Flat regular',}}>
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
