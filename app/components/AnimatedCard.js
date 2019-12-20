import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Play from 'react-native-vector-icons/AntDesign';
import {Button} from 'react-native-paper';

export class AnimatedCard extends React.Component {
  render() {
    return (

        <Image
          style={styles.image}
          source={{uri: this.props.img}}

        />

    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom:20,
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    height: 450,
  },
  image: {
    borderRadius: 10,
    width: '100%',
    height: 300,

  },
  title: {
    marginTop: 10,
  },
  icon: {marginRight: 8, marginLeft: 8, color: 'black'},
  playBtn: {
    alignItems: 'center',

    borderRadius: 40,
    marginLeft: 40,
    marginRight: 40,
  },
  button: {
    position: 'absolute',
    bottom: -15,
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 20,
  },
});
