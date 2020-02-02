  

import {Modal,Text ,FlatList,   } from 'react-native';
import React  from 'react';
import { Button } from 'react-native-paper';
import {Playeroo} from '../components/Playeroo';
export  default  function AnimeServers (props) {
  return (

   <Modal
   animationType="slide"
   transparent={false}
   visible={props.showModal}
 >
    
 <Text style={{textAlign:"center",marginVertical:10}}>روابط المشاهدة</Text>
 <FlatList
           
           data={props.epsHref}
           renderItem={({item, i}) => (
             <Playeroo
               key={i}
               video={item}
               navigate={() => {
                 
                 props.hide()
                  props.navigation.navigate('streamPage', {
                   link: item.link,
                 });
               }}
             />
           )}
           keyExtractor={video => video.title}
         />
           <Button icon="camera" mode="contained" onPress={() => props.hide()}>
    Return
  </Button>
 </Modal>

  )
            }