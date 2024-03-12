import React, { useState } from 'react';
import { StyleSheet, TextInput, View, SafeAreaView, Button, Image, Text, ToastAndroid, Alert } from 'react-native';
import axios from "axios";
import { Redirect, router } from 'expo-router';





export const connection = {
  apiBaseUrl: `https://komrisknxtcont.komrisk.com/komrisk/api/`
  //  https://komrisknxtcont.komrisk.com/komrisk
  // apiBaseUrl:`http://localhost:${port}`
}
export const api = axios.create({
  baseURL: connection.apiBaseUrl
});



let Workspace = () => {


  //    const [baseURL, setBaseURL] = useState();
  const [baseURL, setBaseURL] = useState<string>('');

  const handleSubmitWorkSpace = async () => {
// rrouter.push("/signin");
    if (baseURL === undefined || baseURL === '') {

      Alert.alert("Alert", "Workspace can not be empty");
    }
    else {

      try {
        const payLoad = {
          Url: `https://${baseURL}.komrisk.com`
        };
        const url = `komrisk/api/auth/authURL`;
  
        const api = axios.create({
          baseURL: "https://komrisknxtcont.komrisk.com/"
        });
        console.log("url", url);
  
        const response = await api.post(url, payLoad, {
          headers: {
  
            "API-KEY": "1d339a8918bfd92522267f0dd76415f8",
            "Content-Type": "application/json",
            "Cookie": "JSESSIONID=86FE4C0D803C89A638BEC0F75AF59C5A"
          }
        });
        console.log('response', response);
        if (response.status === 200) {
          // <Redirect href={'/signin'} />
          router.push("/signin");
        } else {
        }
      } catch (error) {
        Alert.alert("error", error.message);
        console.log('error', error);
  
      }
    }
    console.log('werwer');
  }
  // const handleSubmitWorkSpace = async () => {
  //     const payLoad = {
  //       Url: `https://${baseURL}.komrisk.com`
  //     };
  //     console.log('handleSubmitWorkSpace');
  //     try {
  //       const response = await AuthURL(payLoad);
  //       console.log("response", response);
  //     } catch (error) {
  //       console.log('error', error);
  //     }
  // }


  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* <Image style={{ width: 230 }} source={require('../../../assets/images/Komrisk-Logo.png')} /> */}

        <Image style={{ width: 230 }} source={require('@/assets/images/Komrisk-Logo.png')} />
        <View style={styles.lexLogoContainer}>
          <Image source={require('@/assets/images/Rectangle98.png')} />
          <Text>BY</Text>
          <Image source={require('@/assets/images/Lex-Logo.png')} />
        </View>
      </View>

      <SafeAreaView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(value: string) => setBaseURL(value)}
          value={baseURL}
          placeholder="Your workspace name..."
        />
      </SafeAreaView>
      <View style={styles.submitBtnContainer}>
        <Button
          //   style={styles.submitBtn}
          title="Next"
          color="#A097DC"
          onPress={handleSubmitWorkSpace}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 50,
    // backgroundColor: "red"
  },
  input: {
    height: 40,
    borderColor: '#D9D9D9',
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#99A3A4'
  },
  inputContainer: {
    alignSelf: 'stretch',
    marginTop: 100
  },
  submitBtn: {
    height: 56
  },
  submitBtnContainer: {
    // marginTop: 100,
    alignSelf: 'stretch'
  },
  logoContainer: {
    marginTop: 120
  },
  lexLogoContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch'
  }
});

console.log("Workspace", Workspace);
export default Workspace;