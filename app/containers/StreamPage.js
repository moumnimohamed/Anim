import {WebView}  from "react-native-webview"
import React from "react"
import { View ,StyleSheet} from 'react-native';

export default class StreamPage extends React.Component {
    render() {
  
      return (
      
          <WebView
            source={{uri: "https://anime2001.com/embed_player/?url=https%3A%2F%2Fletsupload.co%2Fplugins%2Fmediaplayer%2Fsite%2F_embed.php%3Fu%3D1tctq&h=238f5a5de80a467c64f068bb10eefd86"}}
             
          />
         
         
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
     
    },
    video: {
      zIndex:9,
      maxHeight: "100%",
      maxWidth: "100%",
      flex: 1
    }
  });