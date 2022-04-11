import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Button } from 'react-native-elements';

import { auth, db } from '../../config/firebase';
import Colors from '../../constant/Colors';
import Fonts from '../../constant/Fonts';

const SignUp = ({navigation}) => {
  const [value, setValue] = useState({
    email: '',
    password: '',
    error: ''
  });

  const appLogo = require('../../assets/fav_logo.png');

  const writeUserData = (userId, email) => {
    firebase.database().ref('users/' + userId).set({
      email: email,
    });
  }

  const signUp = async () => {
    if (value.email === '' || value.password === '') {
        setValue({
          ...value,
          error: 'Email and password are mandatory.'
        })
        return;
      }
  
      try {
        await auth.createUserWithEmailAndPassword(value.email, value.password);
        writeUserData(auth.currentUser.uid, value.email);
        navigation.replace('SignIn');
      } catch (error) {
        setValue({
          ...value,
          error: error.message,
        })
      }
    }

  const navigateToSignIn = () => {
    navigation.replace('SignIn');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={appLogo} style={styles.appLogo} />

      {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email...'
          style={styles.control}
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
          textContentType='emailAddress'
        />

        <TextInput
          placeholder='Password...'
          style={styles.control}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
          textContentType='password'
        />

        <Button title="Sign Up" titleStyle={styles.submitText} buttonStyle={[styles.control, styles.submitButton]} onPress={signUp} />

        <View style={styles.ctaContainer}>
            <Text style={styles.ctaText}>Already have an account?</Text>
            <Text style={[styles.ctaText, styles.ctaLinkText]} onPress={navigateToSignIn}>Sign In Here</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Pink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appLogo: {
    resizeMode: 'contain',
    width: '65%',
    height: 60
  },
  inputContainer: {
    // backgroundColor: '#fff',
    width: '75%',
    // flex: 1,
    justifyContent: 'center',
    // alignItems: 'center'
  },
  control: {
    marginVertical: 10,
    backgroundColor: Colors.White,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  submitButton: {
    width: '100%',
    backgroundColor: Colors.Red,
  },
  submitText: {
    textTransform: 'uppercase',
    fontFamily: Fonts.HelveticaNeueBold
  },
  ctaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 6
  },
  ctaText: {
    textAlign: 'center',
    fontFamily: Fonts.HelveticaNeue,
    fontSize: 15,
  },
  ctaLinkText: {
    textDecorationLine: 'underline',
    textTransform: 'uppercase',
    color: Colors.White,
    fontFamily: Fonts.HelveticaNeueBold,
  },
  error: {
    padding: 10,
    color: Colors.White,
    backgroundColor: Colors.Yellow,
  }
});

export default SignUp;