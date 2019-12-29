/* eslint-disable */
import React from 'react';
import {Image, Dimensions, View, StyleSheet, TouchableOpacity} from 'react-native';
import Play from 'react-native-vector-icons/AntDesign';

export class FilmCard extends React.Component {

    render() {
        return (
           <View  style={styles.view} >
        <Image
            ImageResizeMode ={"contain"}
            style={styles.image} source={{uri: this.props.item.img}} />
           </View>
        );
    }
}
const     screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
 
    view:{
         
        marginTop:10,
        marginLeft:20,
        width:screenWidth/2.5,
        height: screenWidth/2,
    backgroundColor:"white",
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
