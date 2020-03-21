import {
  Modal,
  Text,
  FlatList,
  Dimensions,
  View,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {IconButton} from 'react-native-paper';
import {Playeroo} from '../components/Playeroo';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function AnimeServers(props) {
  return (
    <Modal transparent={true} animationType="fade" visible={props.showModal}>
      <View
        style={{
          backgroundColor: 'rgba(52, 52, 52,.5)',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            borderRadius: 20,
            overflow: 'hidden',
            backgroundColor: '#fff',
            width: screenWidth - 50,
            height: screenHeight / 2,
          }}>
          <View  style={{flexDirection:"row"}}>
          <Text style={{fontFamily: 'JF Flat regular',textAlign: 'center', marginVertical: 10,flex:1}}>
              روابط المشاهدة
            </Text>
          <IconButton
          onPress={() => props.hide()}
    icon="close"
    color={"gray"}
    size={20}
     
  />
           
          </View>
          <FlatList
            data={props.epsHref}
            renderItem={({item, i}) => (
              <Playeroo
                video={item}
                navigate={() => {
                  props.hide();
                  props.navigation.push('streamPage', {
                    link: item.link,
                  });
                }}
              />
            )}
            keyExtractor={(item, i) => i.toString()}
          />
      
        </View>
      </View>
    </Modal>
  );
}
