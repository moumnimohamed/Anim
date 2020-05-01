import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import {default as Icon} from 'react-native-vector-icons/MaterialCommunityIcons';
import {set} from 'react-native-reanimated';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class Account extends React.Component {
  state = {
    firstQuery: '',
    anime: [],
    epsHref: [],
    showModal: false,
    fetching: false,
    data: [
      {
        name: 'إنشاء حساب',
        image: '../images/red.png',
        icon: 'account-check-outline',
        color: '#89C13D',
        onClick: () => {
          this.goSignUp();
        },
      },
      {
        name: 'تسجيل الدخول',
        image: '../images/red.png',
        icon: 'login-variant',
        color: '#89C13D',
        onClick: () => {
          alert('clicked');
        },
      },
      {
        name: 'قائمتي',
        image: '../images/red.png',
        icon: 'heart-multiple-outline',
        color: '#89C13D',
        onClick: () => {
          alert('clicked');
        },
      },
    ],
    account: true,
    login: false,
    signUp: false,
  };

  goSignUp = () => {
    this.setState({signUp: true, account: false});
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
          <View style={styles.imageView}>
            <Image
              style={styles.animImage}
              source={require('../images/red.png')}
            />
          </View>
        </View>

        <ScrollView
          style={{
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            overflow: 'hidden',
            backgroundColor: '#fff',
            height: screenHeight,
          }}>
          {this.state.login && <Login />}
          {this.state.signUp && (
            <SignUp
              return={() => this.setState({signUp: false, account: true})}
            />
          )}
          {this.state.account && (
            <View style={styles.cardsContainer}>
              {this.state.data.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => item.onClick()}
                    style={styles.surface}>
                    <View
                      style={{
                        ...styles.iconContainer,
                        backgroundColor: item.color,
                      }}>
                      <Icon name={item.icon} size={40} color="#fff" />
                    </View>
                    <Text style={styles.textInCard}>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </ScrollView>
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

    alignSelf: 'center',
    position: 'absolute',
    flex: 1,
    width: screenWidth - 100,
    top: screenHeight / 5,
  },
  cardsContainer: {
    flexWrap: 'wrap',
    height: '100%',

    overflow: 'hidden',

    flexDirection: 'row',

    padding: 20,
  },
  surface: {
    marginHorizontal: screenWidth / 45,
    marginBottom: 20,
    backgroundColor: 'white',
    paddingTop: 12,
    borderRadius: 30,
    padding: 8,
    height: screenWidth / 2.5,
    width: screenWidth / 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  iconContainer: {
    flex: 1,
    borderRadius: 20,

    width: '96%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInCard: {
    color: '#89C13D',
    fontFamily: 'JF Flat regular',
    padding: 5,
    fontSize: 15,
    textAlign: 'center',
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
