
import Heart from 'react-native-vector-icons/AntDesign';
import V from 'react-native-vector-icons/AntDesign';
import Play from 'react-native-vector-icons/AntDesign';
import {Dimensions,ImageBackground,View,ScrollView,TouchableOpacity,Text,StyleSheet} from 'react-native';
import { Switch } from 'react-native-paper';
import React from "react"
import LinearGradient from 'react-native-linear-gradient';
import PlayerContext from './PlayerContext';

export function Playeroo  (props) {
 
 

    return(
        <PlayerContext.Consumer>
        {
            ({setVideo}) => (
                <LinearGradient
        start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
        style={styles.container}
        colors={['#fff','#89C13D']}
         > 
         
 
{/* <TouchableOpacity style={styles.btn} onPress={props.navigate}>*/}
<TouchableOpacity style={styles.btn} onPress={()=>setVideo(true)}> 
          <Play name="play" size={20} color="white"  />
               </TouchableOpacity>
         
               <Switch
               style={styles.btn}
               color={"#89C13D"}
        value={true}
        onValueChange={() =>
          { this.setState({ isSwitchOn: !isSwitchOn }); }
        }
      />

         <TouchableOpacity style={styles.btn}>
          <Heart name="hearto" size={15} color="black"  />
               </TouchableOpacity>

               
               <View style={styles.name}>
              <Text style={{paddingHorizontal:10,textAlign:"center",color:"#535353"}}>{props.video && props.video.text ? props.video.text : ""}</Text> 
              <V name="videocamera" size={20} color="#535353"  />
               </View>
            
        
        </LinearGradient>
            )
        }
        </PlayerContext.Consumer> 
        
       
    )
}

   


const styles = StyleSheet.create({
    container:{
        marginVertical:10,
        borderRadius:20,
        paddingVertical:5,
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
    name:{
        flexDirection:"row",
  flex:1,
   justifyContent:"flex-end",
   alignItems:"center"
    },

    btn:{marginRight:10}
})
 