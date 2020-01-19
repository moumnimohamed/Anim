import {WebView}  from "react-native-webview"
import React from "react"
import { View ,StyleSheet} from 'react-native';

export default class StreamPage extends React.Component {

    

    render() {
      console.log("str",this.props.navigation.state.params.link)
  
      return (
      
          <WebView
            source={{uri: this.props.navigation.state.params.link}}
             
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