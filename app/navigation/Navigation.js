import React from 'react';
import {Image} from 'react-native'; 
import { createAppContainer } from 'react-navigation';
import { createStackNavigator  } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from "../containers/Home"
import StreamPage from "../containers/StreamPage"
import FilmDetail from "../containers/FilmDetail"
import FilmAllList from "../containers/FilmAllList"

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
  FilmDetail: {
    screen: FilmDetail,
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

  FilmAllList :{
    screen: FilmAllList,
    navigationOptions: {
      title:"FilmAllList",
      headerTintColor: '#fff',
      headerTransparent: true,
    },
  },
})

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: SearchStackNavigator,
    navigationOptions: { tabBarVisible: false }
  },
   
})

export default createAppContainer(TabNavigator)