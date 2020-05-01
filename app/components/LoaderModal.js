import React from 'react';
import {Dimensions, StyleSheet, View, Image, Modal, Text} from 'react-native';
const screenHeight = Math.round(Dimensions.get('window').height);
import {ActivityIndicator} from 'react-native-paper';
export default function LoaderModal(props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={ props.visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.ActivityIndicator}>
       
        <Image
          style={{width: 50, height: 50 ,position:"absolute"}}
          source={require('../images/logo.png')}
        />
        <ActivityIndicator  animating={true} size={50} color={'#000'} />
       </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  ActivityIndicator: {
      height:"100%",
position:"relative",
    backgroundColor: '#89C13D',

    alignItems: 'center',
    justifyContent: 'center',
  },
});
