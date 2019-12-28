   
   import React from 'react';
   import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
   

   export default    TextStyled = (props) => {
return(

    <Text  style={{fontSize:34,marginLeft:10,marginRight:10}}>{props.title}</Text>
   
)

   }