import React, {useState, useEffect} from 'react';
import {Text, ScrollView, StyleSheet, View, Dimensions} from 'react-native';
import {
  TextInput,
  Button,
  IconButton,
  Colors,
  ActivityIndicator,
} from 'react-native-paper';
// import auth from '@react-native-firebase/auth';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import Toast from 'react-native-simple-toast';
export default function Login(props) {
  const [email, setEmail] = useState('');
  const [fetching, setFetching] = useState(false);

  useEffect(() => {}, []);
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const signUp = () => {
    alert("khasera")
    // setFetching(true);
    // auth()
    //   .createUserWithEmailAndPassword(email, 'animiarondompassword!')
    //   .then(() => {
    //     setFetching(false);
    //     Toast.showWithGravity(
    //       'شكرا لك على الاشتراك 😍🙏',
    //       Toast.LONG,
    //       Toast.BOTTOM,
    //     );
    //   })
    //   .catch(error => {
    //     setFetching(false);
    //     if (error.code === 'auth/email-already-in-use') {
    //       Toast.showWithGravity(
    //         'انت مشترك اصلا 😅🥰',
    //         Toast.LONG,
    //         Toast.BOTTOM,
    //       );
    //     }
    //
    //     if (error.code === 'auth/invalid-email') {
    //       Toast.showWithGravity(
    //         'هذا عنوان الإلكتروني غير صالح ',
    //         Toast.LONG,
    //         Toast.BOTTOM,
    //       );
    //     }
    //
    //     console.log(error);
    //   });
  };
  return (
    <View contentContainerStyle={styles.container}>
    <Text style={{...styles.allText,fontSize:20,color:"gray",marginBottom:10}}>اشترك</Text>
    <Text style={styles.allText}>ابق على اطلاع! احصل على جميع أحدث وأفضل الأنميات مباشرة إلى بريدك</Text>
      <View style={styles.inputContainer}>
        <TextInput
          theme={{
            colors: {
              backgroundColor: 'white',
              placeholder: '#89C13D',
              text: 'gray',
              primary: '#89C13D',
              textAlign: 'right',
            },
          }}
          keyboardType={'default'}
          style={{height: 50, backgroundColor: '#fff'}}
          underlineColor="#89C13D"
          label="البريد الإلكتروني"
          onChangeText={query => {
            setEmail(query);
          }}
          onSubmitEditing= {() =>
              !email.length
                ? Toast.showWithGravity(
                    'يرجى إدخال بريد إلكتروني صالح',
                    Toast.LONG,
                    Toast.BOTTOM,
                  )
                : signUp()
            }
        />

        {/*  <TextInput
          theme={{
            colors: {
              backgroundColor: 'white',
              placeholder: '#89C13D',
              text: 'gray',
              primary: '#89C13D',
              textAlign: 'right',
            },
          }}
          keyboardType={'default'}
          style={{height: 50, backgroundColor: '#fff'}}
          underlineColor="#89C13D"
          label="كلمة المرور"
          onChangeText={query => {
            this.setState({firstQuery: query}, () =>
              this.SearchKnow(this.state.firstQuery),
            );
          }}
        />*/}
        {/*  <Text style={styles.allText} onPress={() => alert('dd')}>نسيت كلمة المرور</Text> */}
        {fetching ? (
          <ActivityIndicator
            style={{
              marginTop: 20,
            }}
            animating={true}
            color={'#89C13D'}
          />
        ) : (
          <Button
            style={{
              marginTop: 20,
              borderRadius: 20,
              backgroundColor: '#89C13D',
              fontFamily: 'JF Flat regular',
            }}
            mode="contained"
            onPress={() =>
              !email.length
                ? Toast.showWithGravity(
                    'يرجى إدخال بريد إلكتروني صالح',
                    Toast.LONG,
                    Toast.BOTTOM,
                  )
                : signUp()
            }
            >


            تسجيل
          </Button>
        )}
        {/*  <Text style={{...styles.allText,textAlign:"center"}}>أو</Text>
         <View
          style={{


            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <IconButton
          style={{backgroundColor:"#fbbc05"}}
            icon="google"
            color={Colors.white}
            size={20}
            onPress={() => console.log('Pressed')}
          />
          <IconButton
          style={{backgroundColor:"#3b5998"}}
            icon="facebook"
            color={Colors.white}
            size={20}
            onPress={() => console.log('Pressed')}
          />
          <IconButton
            style={{backgroundColor:"#b9a3e3"}}
            icon="twitter"
            color={Colors.white}
            size={20}
            onPress={() => console.log('Pressed')}
          />
        </View> */}

        {/*  <View
          style={{

            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{...styles.allText,color:"red"}} >سجل</Text>
          <Text style={styles.allText} >ليس لديك حساب؟ </Text>

        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  inputContainer: {
    height: '90%',
    padding: 20,

    flexDirection: 'column',
  },
  allText: {
    lineHeight:25,
    fontFamily: 'JF Flat regular',
    fontSize: 17,
    color: '#89C13D',
    textAlign:"center",
  },
});
