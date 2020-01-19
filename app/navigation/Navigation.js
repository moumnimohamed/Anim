import React from 'react';
import {Image} from 'react-native'; 
import { createAppContainer } from 'react-navigation';
import { createStackNavigator  } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from "../containers/Home"
import StreamPage from "../containers/StreamPage"
import AnimeDetail from "../containers/AnimeDetail"
import Heart from 'react-native-vector-icons/AntDesign';
 
const SearchStackNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle:   <Image
      style={{ width: 40,height: 40,}}
      source={require('../images/logo.png')}
    />,
      headerTransparent: true,
      headerStyle: {
        
         
      },
       
      headerTintColor: '#fff',
     
    },
     
  },
  AnimeDetail: {
    screen: AnimeDetail,
    navigationOptions: {
      title:"",
      headerTintColor: '#fff',
      headerTransparent: true,
    },
  },
  
  streamPage :{
    screen: StreamPage,
    navigationOptions: {
      title:"stream",
      headerTintColor: '#fff',
      headerTransparent: true,
    },
  },

})

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: SearchStackNavigator
  },
   
})

export default createAppContainer(TabNavigator)