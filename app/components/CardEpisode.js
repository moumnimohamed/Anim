
import Heart from 'react-native-vector-icons/AntDesign';
import V from 'react-native-vector-icons/AntDesign';
import Play from 'react-native-vector-icons/AntDesign';
import {Image,ImageBackground,View,ScrollView,TouchableOpacity,Text,StyleSheet} from 'react-native';
import { Switch } from 'react-native-paper';
import React from "react"
import LinearGradient from 'react-native-linear-gradient';
import PlayerContext from './PlayerContext';

export function CardEpisode  (props) {
            console.log("hania",props.video)
 

    return(
       
                <LinearGradient
        start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
        style={styles.container}
        colors={['#fff','#89C13D']}
         > 
         <Image
                  ImageResizeMode={'contain'}
                  style={styles.image}
                  source={{uri: props.img ? props.img : ''}}
                />
  <Text style={{paddingHorizontal:10,textAlign:"center",color:"#535353"}}>{props.video && props.video.text ? props.video.text : ""}</Text>

         
                

      

               
               <View style={styles.name}>
               <TouchableOpacity style={{...styles.btn,marginRight:25}}>
          <Heart name="hearto" size={15} color="white"  />
               </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={props.navigate}>

          <Play name="play" size={20} color="white"  />
         
               </TouchableOpacity>
               </View>
            
        
        </LinearGradient>
            
       
    )
}

   


const styles = StyleSheet.create({
    container:{
        marginVertical:10,
        borderRadius:20,
        paddingVertical:10,
        paddingHorizontal:10,
        marginHorizontal:10,
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
         
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        
        elevation: 13,
        
 
    },
    image:{
        width: 50,
        height: 50,
        borderRadius:20,
    },
    name:{
        flexDirection:"row",
  flex:1,
   justifyContent:"flex-end",
   alignItems:"center"
    },

    btn:{marginRight:10}
})
 