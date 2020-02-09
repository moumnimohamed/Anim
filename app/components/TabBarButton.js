import React, {useState} from 'react';
import {View,Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default TabBarButton = props => {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
      <View style={{justifyContent:"center",alignItems:"center"}} >
      <Icon name={props.icon}  color="black"  size={15} color={"#89C13D"}/>
      </View>
   
  );
};
