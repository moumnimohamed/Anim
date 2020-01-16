/* eslint-disable */
import React from 'react';
import {Image, Dimensions, View, StyleSheet, TouchableOpacity} from 'react-native';
import Heart from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-paper';
export class FilmCard extends React.Component {

    render() {
        return (
           <View  style={styles.view} >
        <Image
            ImageResizeMode ={"contain"}
            style={styles.image} source={{uri: this.props.item.img}} />

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
 
    view:{
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.23,
shadowRadius: 2.62,

elevation: 4,
        marginTop:10,
        marginBottom:10,
        marginLeft:20,
        width:screenWidth/2.5,
        height: screenWidth/2,
    backgroundColor:"white",
    overflow:"visible",
           padding:10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
    },
    
    image: {
       
        width:null,
        height: null,
        flex:1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
         

    },
    Btncontainer:{
        position: 'absolute',
        top: screenWidth/5,
        left:-18 ,
        bottom: 0,
         zIndex:9,
         overflow:"visible",

    },
    btn:{
        marginBottom:10,
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