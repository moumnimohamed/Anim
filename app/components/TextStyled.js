   
   import React from 'react';
   import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
   import  Arrow from 'react-native-vector-icons/Ionicons';

   export default    TextStyled = (props) => {
return(
     <View style={{ marginLeft:10,marginRight:10, flexDirection: 'row',alignItems:"center" ,justifyContent:"space-between"}}>
      <View style={{ alignItems:"center",flexDirection: 'row',}}>
      <Arrow name="ios-arrow-round-back" size={17}  color="#89C13D" />
    <Text  style={{fontSize:17,color:"#89C13D" ,marginLeft:5}}>المزيد</Text>
    </View>
    <View style={{ alignItems:"center",flexDirection: 'row',}}>
    <Text  style={ {color:"#535353",fontSize:24}}>{props.title}</Text>
    <Image
               style={{ marginLeft:5, width: 30,height: 30,}}
                source={require('../images/logo.png')}
              />
       
    </View>
    
   
    </View>
   
)

   }