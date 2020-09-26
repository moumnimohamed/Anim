import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Arrow from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';

export default TextStyled = props => {
  return (
    <View
      style={{
        zIndex: 2,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        
        {!props.hide && (
           <React.Fragment>
         <Arrow name="ios-arrow-round-back" size={20} color="#535353" />
          <Text
            onPress={props.onClick && props.onClick}
            style={{
              textShadowColor: '#000',
              textShadowOffset: {width: 0.5, height: 0.5},
              textShadowRadius: 1,
              fontFamily: 'JF Flat regular',
              fontSize: 17,
              color: '#fff',
              marginLeft: 5,
            }}>
            المزيد
          </Text>
          </React.Fragment>
        )}
      </View>
      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        <Text
          style={{
            color: '#535353',
            fontSize: 24,
            fontFamily: 'JF Flat regular',
          }}>
          {props.title}
        </Text>
        <Image
          style={{marginLeft: 0, width: 60, height: 60}}
          source={require('../images/logo.png')}
        />
      </View>
    </View>
  );
};
