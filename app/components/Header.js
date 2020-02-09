import {
  Dimensions,
  ImageBackground,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

import React from 'react';

export default function Header(props) {
  return <View style={styles.container}>
  <Image
          style={{width: 20, height:40 ,margin:10}}
          source={require('../images/logo.png')}
        />
        <View style={styles.texts}>
      <Text style={styles.text}>الأفلام</Text>
      <Text style={styles.text}>الانمي</Text>
      <Text style={styles.text}>الحلقات</Text>
      </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection:"row",
     margin:5,
     
  },
  texts:{
       
    flexDirection:"row",
     flex:1,
      justifyContent:"space-around",
      alignItems:"center"
  },
  text:{
      color:"white",
      fontWeight:"bold",
      fontSize:17,
    paddingHorizontal:20,
}

});
