import React, { useState } from 'react';
import { StyleSheet, TextInput, View, SafeAreaView, Image, Text, Alert } from 'react-native';
import { router } from 'expo-router';
import AuthenticateWorkspace from '@/src/server/api-functions/Login/authenticate-workspace';
import setDataToAsyncStorage from '@/src/utils/associate/set-to-localstorage';
import { useDispatch } from 'react-redux';
import { storeBaseUrl } from '@/src/store/slices/base-url-slice';
import Button from '@/src/components/Button';


const Workspace = () => {

  const [workSpaceName, setWorkSpaceName] = useState<string>('');
  const dispatch = useDispatch();

  const handleSubmitWorkSpace = async () => {

    if (workSpaceName === undefined || workSpaceName === '') {
      Alert.alert("Alert", "Workspace can not be empty");
    }
    else {
      const payLoad = {
        Url: `https://${workSpaceName.trim()}.komrisk.com`
      };
      const baseURL = `${payLoad.Url}/komrisk/api`;
      setDataToAsyncStorage('baseUrl', baseURL);
      const { error, status } = await AuthenticateWorkspace(payLoad);

      if (status === 200) {

        dispatch(storeBaseUrl({ workSpaceName: workSpaceName.trim(), baseUrl: baseURL }));

        router.push("/signin");
      } else {
        setDataToAsyncStorage('baseUrl', "");
        Alert.alert("error", "Unknown workspace");
      }
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
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
          btnColor={'#A097DC'}
          text='Next'
          style={{
            paddingVertical: 20,
            paddingHorizontal: 48,
            fontWeight: '400',
            fontSize: 16,
            borderRadius: 5
          }}
          onPress={handleSubmitWorkSpace}
        />
        {/* <Button
          text='Next'
          type='default'
          btnColor={'#A097DC'}
          style={{
            paddingVertical: 20,
            paddingHorizontal: 48,
            fontWeight: '400',
            fontSize: 16,
            borderRadius: 5
          }}
        /> */}
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
    // height: 60,
    borderColor: '#D9D9D9',
    borderWidth: 2,
    padding: 13,
    // paddingHorizontal: 20,
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
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch'
  }
});
export default Workspace;