import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Linking, Modal, Text, View} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import Loader from '../components/Loader';
import {Playeroo} from '../components/Playeroo';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const AnimeServers = props => {
  const {epsHref} = props;

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  useEffect(() => {}, [props.forDownload]);

  const download = async url => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  console.log('animeServer000', epsHref);

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
            top: 100,
            borderRadius: 20,
            overflow: 'hidden',
            backgroundColor: '#fff',
            width: screenWidth - 50,
            height: screenHeight / 2,
          }}>
          <View style={{flexDirection: 'row'}}>
            {props?.animeHrefLink ? (
              <Button
                style={{backgroundColor: '#89C13D'}}
                icon="arrow-left"
                color={'white'}
                size={20}
                onPress={() => {
                  props.hide();
                  props.navigation.navigate('AnimeDetail', {
                    item: {link: props.animeHrefLink},
                  });
                }}>
                أنمي
              </Button>
            ) : null}
            <Text
              style={{
                fontFamily: 'JF Flat regular',
                textAlign: 'center',
                marginVertical: 10,
                flex: 1,
              }}>
              {props.forDownload === true ? 'روابط  التحميل' : 'روابط المشاهدة'}
            </Text>
            <IconButton
              onPress={() => props.hide()}
              icon="close"
              color={'gray'}
              size={20}
            />
          </View>
          {props?.epsHref?.length <= 0 ? (
            <View style={{height: '100%', position: 'relative', marginTop: 20}}>
              <Loader />
            </View>
          ) : null}
          <FlatList
            data={props.epsHref}
            renderItem={({item, i}) => (
              <Playeroo
                video={item}
                navigate={() => {
                  props.hide();
                  props.forDownload
                    ? download(item.link)
                    : props.navigation.navigate('streamPage', {
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
};

export default AnimeServers;
