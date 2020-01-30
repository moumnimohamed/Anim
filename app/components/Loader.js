import {View, StyleSheet} from 'react-native';
import React  from 'react';
import {ActivityIndicator} from 'react-native-paper';

export  default  function Loader (props) {
  return (
    <View style={styles.ActivityIndicator}>
    
      <ActivityIndicator animating={true} color={'#89C13D'} />
    </View>
  );
}

const styles = StyleSheet.create({
    ActivityIndicator:{
      height:100,
         
       zIndex:12,
        
       justifyContent:"center"
     
     }
});
