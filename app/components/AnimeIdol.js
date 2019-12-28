/* eslint-disable */
import React from 'react';
import {Image, Dimensions, View, StyleSheet, TouchableOpacity} from 'react-native';
import Play from 'react-native-vector-icons/AntDesign';

export class AnimeIdol extends React.Component {

    render() {
         
        
        return (
           <View  style={styles.view} >

<Image
        style={styles.image}
        source={require(  "../images/onepiese.png")}
      />
               <TouchableOpacity style={styles.playBtn}>
          <Play name="playcircleo" size={40} color="black" />
               </TouchableOpacity>
           </View>
        );
    }
}
const     screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({

    image: {
        borderRadius: 10,
        width:null,
        height: null,
        flex:1,

    },
    view:{
        marginLeft:20,
        width:screenWidth/3,
        height: screenWidth-140,
    },
    playBtn:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'

    }
});
