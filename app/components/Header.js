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

  console.log("header props",props)
  return <View style={styles.container}>
  <Image
          style={{width: 80, height:80 }}
          source={require('../images/logo.png')}
        />
        <View style={styles.texts}>
      <Text style={styles.text}  onPress={()=> { props.navigation.navigate('FilmAllList')}} >الأفلام</Text>
      <Text style={styles.text} onPress={()=> { props.navigation.navigate('AnimeAllList')}}  >الانمي</Text>
      <Text style={styles.text} onPress={()=> { props.navigation.navigate('EpisodesAllList')}} >الحلقات</Text>
      </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection:"row",
        
     paddingTop:20,
  },
  texts:{
  
    flexDirection:"row",
     flex:1,
      justifyContent:"space-around",
      alignItems:"center"
  },
  text:{
    fontFamily: 'JF Flat regular',
      color:"white",
      textShadowColor: '#000',
      textShadowOffset: {width: 1, height: 1},
      textShadowRadius: 1,
      fontSize:17,
    paddingHorizontal:20,
}

});
