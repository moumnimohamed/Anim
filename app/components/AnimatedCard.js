import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Play from 'react-native-vector-icons/AntDesign';
import {Button, Card} from 'react-native-paper';

export class AnimatedCard extends React.Component {
  render() {
    return (


      <View>
        
    
        <Image
          style={styles.image}
          source={{uri: this.props.item.img}}
        />
         <View style={{
                                marginLeft: 30,
                                marginRight: 30,
                                marginTop: 0,
                                zIndex: 0,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor:"fff000",
                                boxShadow:0,
                                border:5
                            }}>
                                <Card.Content>

                                    <Text style={styles.title}>{this.props.item.title}</Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: 10,

                                        }}>
                                        <TouchableOpacity>
                                            <Icon name="arrow-left" size={10} color="black"/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.playBtn}>
                                            <Play name="playcircleo" size={40} color="black"/>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Icon name="arrow-right" size={10} color="black"/>
                                        </TouchableOpacity>
                                    </View>
                                    <Button
                                        style={styles.button}
                                        mode="contained"
                                        onPress={() => console.log('Pressed')}>
                                      <Text style={{fontFamily:"JF Flat"}}> معلومات</Text>
                                    </Button>
                                </Card.Content>

                            </View>
  </View>
    );
  }
}

const styles = StyleSheet.create({
   
  image: {
    borderRadius: 10,
    width: '100%',
    height: 300,
},
title: {
    textAlign: 'center',
    marginTop: 10,
},
icon: {marginRight: 8, marginLeft: 8, color: 'black'},
playBtn: {
    alignItems: 'center',

    borderRadius: 40,
    marginLeft: 40,
    marginRight: 40,
},
button: {
    marginTop: 10,
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 20,
},
});
