import React from 'react';
import { Dimensions, StyleSheet, View,Image } from 'react-native';
const screenHeight = Math.round(Dimensions.get('window').height);

export default function Loader(props) {
  return (
    <View style={styles.ActivityIndicator}>
      <Image
        style={{width: 50, height: 50, margin: 10}}
        source={require('../images/logo.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ActivityIndicator: {
    zIndex:9,
    opacity: 0.5,
    height: screenHeight,
    backgroundColor: '#89C13D',
    zIndex: 12,
   alignItems:"center",
    justifyContent: 'center',
  },
});
