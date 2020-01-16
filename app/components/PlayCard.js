/* eslint-disable */
import React from 'react';
import {Image, Dimensions, View, StyleSheet, TouchableOpacity,Text} from 'react-native';
import Play from 'react-native-vector-icons/AntDesign';
import Heart from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export class PlayCard extends React.Component {

  

    render() {
        return (
           <View  style={styles.view} >
             <Image
            resizeMode="contain"
            style={styles.image} source={{uri: this.props.item.img}} />
               <TouchableOpacity style={styles.playBtn}>
          <Play name="play" size={35} color="white" style={{backgroundColor:"black",borderRadius:20}} />
               </TouchableOpacity>
               <View style={styles.Btncontainer} >
            
            <TouchableOpacity style={styles.btn}>
          <Heart name="hearto" size={15} color="black"  />
               </TouchableOpacity>
               <TouchableOpacity style={styles.btn}>
          <FontAwesome name="send-o" size={15} color="black"  />
               </TouchableOpacity>
</View>
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
        marginBottom:5,

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

    },
    Btncontainer:{
        marginTop:-50,
         flexDirection:"row-reverse",
         justifyContent:"space-around",
         alignItems:"center",
         display:"flex",
       

    },
    btn:{
        
        backgroundColor:"white",
        borderRadius:20,
        padding:10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        
        elevation: 4,
        
    }
});
