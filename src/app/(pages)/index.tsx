import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, SafeAreaView, Button, Image, Text, ToastAndroid, Alert } from 'react-native';
import axios from "axios";
import { Redirect, router } from 'expo-router';
import { useDispatch, useSelector } from "react-redux";
import { storeBaseUrl } from '@/src/store/slices/base-url-slice';
import { connect } from 'react-redux';
import { BaseUrl } from '@/src/types';
import { getLocalStorageItem, SetLocalStorageItem } from '@/src/utils';
import AuthenticateWorkspace from '@/src/server/api-functions/authenticate-workspace';



export const connection = {
  apiBaseUrl: `https://komrisknxtcont.komrisk.com/komrisk/api/`
  //  https://komrisknxtcont.komrisk.com/komrisk
  // apiBaseUrl:`http://localhost:${port}`
}




let Workspace = () => {


  //    const [workSpaceName, setWorkSpaceName] = useState();
  const [workSpaceName, setWorkSpaceName] = useState<string>('');
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const apiSlice = useSelector((state: Object) => state.baseUrlSlice)
  // console.log("apiSlice34343", apiSlice);


  // }, [])

  const handleSubmitWorkSpace = async () => {
    // rrouter.push("/signin");
    if (workSpaceName === undefined || workSpaceName === '') {

      Alert.alert("Alert", "Workspace can not be empty");
    }
    else {
      router.push("/signin");

      // const payLoad = {
      //   Url: `https://${workSpaceName}.komrisk.com`
      // };
      // const {error, status} = await AuthenticateWorkspace(payLoad);
      
      // if (status === 200) {
      //   router.push("/signin");
      // } else {
      //   Alert.alert("error", error.message);
      // }
    }

  }


  // const handleSubmitWorkSpace = async () => {
  //     const payLoad = {
  //       Url: `https://${workSpaceName}.komrisk.com`
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
          onChangeText={(value: string) => setWorkSpaceName(value)}
          value={workSpaceName}
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