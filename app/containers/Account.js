import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-paper';

import Play from 'react-native-vector-icons/AntDesign';
import FACE from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

const {height, width} = Dimensions.get('window');
class Account extends React.Component {
  state = {};

  componentDidMount() {}

  render() {
    
    return (
      <SafeAreaView style={{...styles.container}}>
        <ImageBackground
       
          source={{uri: 'https://wallpaperaccess.com/full/200338.jpg'}}
          style={{width: '100%'}}>
          <LinearGradient colors={['#ffffff00', '#f8f5fa']}>
            <View style={{height:height ,justifyContent:"flex-end"}}>
              <View
                style={{  height: height / 2, justifyContent: 'space-around'}}>
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={{...styles.btn, backgroundColor: '#1DA1F2'}}
                    onPress={this.props.navigate}>
                    <Play name="twitter" size={24} color="#fff" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{...styles.btn, backgroundColor: 'red'}}
                    onPress={this.props.navigate}>
                    <Play name="google" size={24} color="#fff" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{...styles.btn, backgroundColor: '#4267B2'}}
                    onPress={this.props.navigate}>
                    <FACE name="facebook-square" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
                <View style={styles.soloBtn}>
                  <Button
                    style={{
                      borderRadius: 20,
                      backgroundColor: 'white',
                      paddingVertical: 4,
                    }}
                    mode="contained"
                    onPress={() => console.log('Pressed')}>
                    <Text style={{color: '#535353'}}>تسجيل الدخول</Text>
                  </Button>
                </View>
                <Text
                  style={{
                    borderBottomColor: '#535353',

                    alignSelf: 'center',
                    borderBottomWidth: 2,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#535353',
                  }}>
                  حساب جديد ؟
                </Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'flex-end',
  },
  absoluteFill: {},
  image: {
    flex: 1,
    height: null,
    width: null,
  },
  btnContainer: {
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  btn: {
    padding: 17,
    borderRadius: 50,
  },
  soloBtn: {
    justifyContent: 'center',
    marginHorizontal: 20,
    borderRadius: 20,
  },
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, null)(Account);
