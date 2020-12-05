import React, {useState, useEffect} from 'react';
import {
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import {TextInput, Button, IconButton, Colors} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import Toast from 'react-native-simple-toast';

export default function SignUp(props) {
  [loading, setLoading] = useState(false);
  useEffect(() => {}, []);

  const signUp = () => {
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(
        'xman012312@gmail.com',
        'SuperSecassword!',
      )
      .then(() => {
        setLoading(false);
        Toast.showWithGravity(
          ' تم إنشاء حساب المستخدم !',
          Toast.LONG,
          Toast.BOTTOM,
        );
      })
      .catch(error => {
        setLoading(false);
        if (error.code === 'auth/email-already-in-use') {
          Toast.showWithGravity(
            'هذا البريد الإلكتروني قيد الاستخدام !',
            Toast.LONG,
            Toast.BOTTOM,
          );
        }

        if (error.code === 'auth/invalid-email') {
          Toast.showWithGravity('', Toast.LONG, Toast.BOTTOM);
        }

        console.log(error);
      });
  };
  return (
    <View contentContainerStyle={styles.container}>
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
            this.setState({firstQuery: query}, () =>
              this.SearchKnow(this.state.firstQuery),
            );
          }}
        />

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
          label="كلمة المرور"
          onChangeText={query => {
            this.setState({firstQuery: query}, () =>
              this.SearchKnow(this.state.firstQuery),
            );
          }}
        />
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
          label="كلمة المرور"
          onChangeText={query => {
            this.setState({firstQuery: query}, () =>
              this.SearchKnow(this.state.firstQuery),
            );
          }}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#89C13D" />
        ) : (
          <Button
            style={{
              borderRadius: 20,
              backgroundColor: '#89C13D',
              fontFamily: 'JF Flat regular',
            }}
            mode="contained"
            onPress={() => signUp()}>
            إنشاء حساب
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
        <IconButton
          style={{backgroundColor: '#89C13D'}}
          icon="arrow-left"
          color={Colors.white}
          size={20}
          onPress={() => props.return()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    height: '90%',
    padding: 20,

    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  allText: {
    fontFamily: 'JF Flat regular',
    fontSize: 17,
    color: '#89C13D',
  },
});
