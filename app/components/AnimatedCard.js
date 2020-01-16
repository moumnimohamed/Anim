import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Play from 'react-native-vector-icons/AntDesign';
import {Button, Card} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Heart from 'react-native-vector-icons/AntDesign';
export class AnimatedCard extends React.Component {
  render() {
     
    return (


      <View  style={styles.container}>
 
        
       <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{uri: this.props.item.img}}
        />
        <TouchableOpacity style={styles.playBtn} onPress={this.props.navigate}>
                                            <Play name="play" size={50} color="#89C13D"/>
                                        </TouchableOpacity>
</View>
         <View style={styles.info}>

         <View style={styles.socialBtns}>
         <TouchableOpacity style={styles.btn}>
          <Heart name="hearto" size={20} color="black"  />
               </TouchableOpacity>
               <TouchableOpacity style={styles.btn}>
          <FontAwesome name="send" size={20} color="black"  />
               </TouchableOpacity>
               <View style={styles.likeNumber}>
               <TouchableOpacity >
          <AntDesign name="like2" size={20} color="black"  />
               </TouchableOpacity>
              <Text style={{marginLeft:1}}>+1</Text> 
               </View>
         </View>

<Text style={styles.title}>{this.props.item.title}</Text>
                                
                                     

                           <View style={styles.linkContainer}>
                         
   <Text style={styles.link}>Overview</Text> 
   <Text style={styles.link}>episodes</Text> 
                           </View>

                            </View>
  </View>
    );
  }
}

const styles = StyleSheet.create({

  container:{
     
    overflow:"visible",
     marginLeft:3,
     marginRight:3,
    overflow: "visible",
    borderRadius:20,
   
     backgroundColor:"white",
     shadowColor: "#000",
     shadowOffset: {
       width: 0,
       height: 2,
     },
     shadowOpacity: 0.25,
     shadowRadius: 3.84,
     height:"90%",
     elevation: 5,
  },

  imageContainer:
  {

    top:-40,
    width:"80%",height:300, 
   
  borderRadius: 10,
   overflow:"hidden", 
  display:"flex",
  justifyContent:"center",
  backgroundColor:"white",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  alignSelf:"center",
  elevation: 5,
  },  


  image: {
    flex:1,
    width: null,
    height: null,
    

},
info:{
  
  width:"80%",
    alignSelf:"center",
     top:-25,
    
},
title: {
    textAlign: 'center',
     top:10,
},
icon: {marginRight: 8, marginLeft: 8, color: 'black'},
playBtn: {
position:"absolute",
alignSelf:"center"
},
linkContainer: {
    marginTop: 20,
    marginBottom: 0,
   flexDirection:"row",
   justifyContent:"space-around",
    
   
},
 link:{
  borderBottomColor: '#89C13D',
  borderBottomWidth: 2,
  marginBottom: 30,
  color:"#707070"
 },
socialBtns:{
  flexDirection:"row",
},
 
btn:{
 marginRight:10
},
likeNumber:{
  flexDirection:"row",
  flex:1,
   justifyContent:"flex-end",
}




 
});
