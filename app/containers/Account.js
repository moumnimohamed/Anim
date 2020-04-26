import axios from 'axios';
import cheerio from 'cheerio-without-node-native';
import React from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import AnimeServers from '../components/AnimeServers';
import {FilmCard} from '../components/FilmCard';
import Loader from '../components/Loader';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
class Account extends React.Component {
  state = {
    firstQuery: '',
    anime: [],
    epsHref: [],
    showModal: false,
    fetching: false,
  };

  componentDidMount() {}

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            height: screenHeight / 4,
            flexDirection: 'row',
            backgroundColor: '#89C13D',
            overflow: 'hidden',
          }}>
          <Text style={styles.message}>
          ابدأ بإدارة حسابك هنا !!!
          </Text>
          <View style={styles.imageView}>
            <Image
              style={styles.animImage}
              source={require('../images/red.png')}
            />
          </View>
        </View>
         
        <View
          style={{
            borderRadius: 30,
            overflow: 'hidden',
            backgroundColor: '#fff',
            height: screenHeight,
          }}
        >
          <Text style={{...styles.message,color:"#000"}}>
          كيف تبدأ؟
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: '#89C13D',
    flex: 1,
  },
  animImage: {
    width: null,
    height: null,
    flex: 1,
  },
  imageView: {
    flex: 3,
 
    height: screenWidth / 1.5,
  },
  message: {
    padding: 20,
    top: -10,
    lineHeight: 40,
    color: '#f2f2f2',
    fontFamily: 'JF Flat regular',
    flex: 2,
    fontSize: 17,
    alignSelf: 'center',
  },
  textInputContainer: {
    overflow: 'hidden',
    borderRadius: 50,
    alignSelf: 'center',
    position: 'absolute',
    flex: 1,
    width: screenWidth - 100,
    top: screenHeight / 5,
  },
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  null,
)(Account);
