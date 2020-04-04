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
          style={{width: 50, height:50 ,margin:10}}
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
        zIndex:7,
     paddingTop:30,
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
       
      fontSize:17,
    paddingHorizontal:20,
}

});
