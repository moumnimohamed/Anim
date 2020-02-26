import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function VideoModal(props) {
  return (
    <View style={styles.container}>
      <Text
        style={{paddingHorizontal: 10, textAlign: 'center', color: '#535353'}}>
        {props.video && props.video.text ? props.video.text : 'no video'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});
