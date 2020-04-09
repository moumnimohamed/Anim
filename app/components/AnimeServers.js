import React , {useState,useEffect} from "react"
import {
  Modal,
  Text,
  FlatList,
  Dimensions,
  View,
  ImageBackground,
} from 'react-native';

import SendIntentAndroid from  "react-native-send-intent";
 
import cheerio from 'cheerio-without-node-native';
import axios from 'axios';
 
import {IconButton,Switch} from 'react-native-paper';
import {Playeroo} from '../components/Playeroo';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function AnimeServers(props) {

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const _onToggleSwitch = () => {setIsSwitchOn(!isSwitchOn),()=>{}
        !isSwitchOn  ? download() : remove()
  }

  useEffect (()=>{
     
  })
  
  
  const remove = async () => { alert("remove")}
  const download = async () => {
      
    axios({
      method: 'get',
      url: "https://www.4shared.com/web/embed/file/ou2hTuU7iq.html",
    })
      .then((response) => {
      
        if (response.status === 200) {
          
          const htmlString = response.data; // get response text
          const $ = cheerio.load(htmlString); // parse HTML string
         const  dl = $('#player video source').attr('src');
         SendIntentAndroid.openAppWithData(
          "com.dv.adm",
           dl,
          "video/*",
          {
            position: { type: "int", value: 60 },
          }
        ).then(wasOpened => {});
        }
      })
      .catch((error) => {
        error;
      });

     
  };

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
            top:100,
            borderRadius: 20,
            overflow: 'hidden',
            backgroundColor: '#fff',
            width: screenWidth - 50,
            height: screenHeight /2,
          }}>
          <View  style={{flexDirection:"row"}}>
         { props.animeHrefLink && <Text style={{fontFamily: 'JF Flat regular',textAlign: 'center', marginVertical: 10,flex:1}}>
               {props.animeHrefLink}   
            </Text>}
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
          <View  style={{ justifyContent:"flex-end", flexDirection:"row",alignItems:"center",marginRight:15}}>
          <Switch
         
         color={'#89C13D'}
         value={isSwitchOn}
         onValueChange={ _onToggleSwitch}
       />
       <Text style={{fontFamily: 'JF Flat regular',color:"gray",marginLeft:5}}>
       تحميل
       </Text>


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
