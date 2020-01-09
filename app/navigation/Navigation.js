import React from 'react';
import {Image} from 'react-native'; 
import { createAppContainer } from 'react-navigation';
import { createStackNavigator  } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from "../containers/Home"
import Heart from 'react-native-vector-icons/AntDesign';
 
const SearchStackNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title:   <Image
      style={{ width: 40,height: 40,}}
      source={require('../images/logo.png')}
    />,
      headerTransparent: true,
      headerStyle: {
        
         
      },
       
      headerTintColor: '#fff',
     
    },
     
  },
  
})

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: SearchStackNavigator
  },
   
})

export default createAppContainer(TabNavigator)