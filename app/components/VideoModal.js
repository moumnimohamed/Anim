import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from "react-native-webview";

export default function VideoModal(props) {
  console.log("layla",props)
  return (
    
    <View style={styles.container}>
      <View style={styles.video}>
        {props.video && props.video.length &&
          <WebView 
        source={{uri : props.video[0].link}}
        allowsFullscreenVideo={true}
        allowsInlineMediaPlayback={true}
      />
        }
       </View>
       <View style={styles.links}>
       <Text>nfevbebvebebveueb</Text>
       <Text>nfevbebvebebveueb</Text>
       <Text>nfevbebvebebveueb</Text>
       <Text>nfevbebvebebveueb</Text>
       
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  container: {
    flex: 1,
     
  },
  links:{
    flex:1,
    backgroundColor: 'blue',
  }
});
