import React from 'react';
import Share from 'react-native-share';

import {
  Platform,
  Linking,
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

  share = () => {
     
  const url = "https://play.google.com/store/apps/details?id=com.anim";
  const title = "";
  const message = `تطبيق مجاني لمشاهدة وتحميل الأنمي`;
  const options = Platform.select({
    ios: {
      activityItemSources: [
        {
          placeholderItem: {type: 'url', content: url},
          item: {
            default: {type: 'url', content: url},
          },
          subject: {
            default: title,
          },
          linkMetadata: {originalUrl: url, url, title},
        },
        {
          placeholderItem: {type: 'text', content: message},
          item: {
            default: {type: 'text', content: message},
            message: null, // Specify no text to share via Messages app.
          },
        },
      ],
    },
    default: {
      title,
      subject: title,
      message: `${message} ${url}`,
    },
  });

  Share.open(options);
};

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
            paddingVertical: 20,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            overflow: 'hidden',
            backgroundColor: '#fff',
            height: screenHeight,
          }}>
          <TouchableOpacity
            onPress={() =>
              Linking.canOpenURL('https://www.instagram.com/animia_app/')
                .then(supported => {
                  if (!supported) {
                    alert("Can't handle url: " + 'https://www.instagram.com/animia_app/');
                  } else {
                    return Linking.openURL('https://www.instagram.com/animia_app/');
                  }
                })
                .catch(err => alert('An error occurred', err))
            }
            style={styles.btnBig}>
            <Text style={styles.btnText}>تابعنا على انستغرام</Text>
            <Image
              style={{width: 20, height: 20}}
              source={require('../images/insta.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.share()  } style={styles.btnBig}>
            <Text style={styles.btnText}>شارك هذا التطبيق</Text>
            <Icon name={'share'} size={25} color="#89C13D" />
          </TouchableOpacity>
          <TouchableOpacity  onPress={() =>
              Linking.canOpenURL('https://play.google.com/store/apps/details?id=com.anim')
                .then(supported => {
                  if (!supported) {
                    alert("Can't handle url: " + 'https://play.google.com/store/apps/details?id=com.anim');
                  } else {
                    return Linking.openURL('https://play.google.com/store/apps/details?id=com.anim');
                  }
                })
                .catch(err => alert('An error occurred', err))
            } style={styles.btnBig}>
            <Text style={styles.btnText}>قيم هذا التطبيق</Text>
            <Icon name={'star'} size={25} color="#89C13D" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:xman012312@gmail.com')} style={styles.btnBig}>
            <Text style={styles.btnText}>اتصل بنا (اقتراح ، خطأ في التطبيق ، طلب)</Text>
            <Icon name={'account'} size={25} color="#89C13D" />
          </TouchableOpacity>

          {/*  {this.state.login && <Login />}
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
          )} */}
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
  btnBig: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 5,

    flexDirection: 'row',
    borderRadius: 10,
  },
  btnText: {
    paddingRight: 20,
    color: '#89C13D',
    fontFamily: 'JF Flat regular',

    fontSize: 15,
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
