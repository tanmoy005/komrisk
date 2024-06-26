import React, { useState } from 'react';
import { StyleSheet, TextInput, View, SafeAreaView, Image, Text, Alert,ActivityIndicator  } from 'react-native';
import { router } from 'expo-router';
import AuthenticateWorkspace from '@/src/server/api-functions/Login/authenticate-workspace';
import setDataToAsyncStorage from '@/src/utils/associate/set-to-localstorage';
import { useDispatch, useSelector } from 'react-redux';
import { removeBaseUrl, storeBaseUrl } from '@/src/store/slices/base-url-slice';
import Button from '@/src/components/Button';
import { RootState } from '@/src/store';



const Workspace = () => {
  const prevWorkSpaceName = useSelector((state: RootState) => state.baseUrl.payload.workSpaceName);
  const [workSpaceName, setWorkSpaceName] = useState<string>(prevWorkSpaceName ?? '');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleSubmitWorkSpace = async () => {

    if (workSpaceName === undefined || workSpaceName === '') {
      Alert.alert("Alert", "Workspace can not be empty");
    }
    else {
      setLoading(true); // Start loading
      const payLoad = {
        Url: `https://${workSpaceName.trim()}.komrisk.com`
      };
      const baseURL = `${payLoad.Url}/komrisk/api`;
      setDataToAsyncStorage('baseUrl', baseURL);

      const { status } = await AuthenticateWorkspace(payLoad);

      setLoading(false); // Stop loading

      if (status === 200) {
        dispatch(removeBaseUrl())
        dispatch(storeBaseUrl({ workSpaceName: workSpaceName.trim(), baseUrl: baseURL }));

        router.replace("/signin");
      } else {
        setDataToAsyncStorage('baseUrl', "");
        Alert.alert("error", "Unknown workspace");
      }
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* <Image style={{ width: 230 }} source={require('@/assets/images/Komrisk-Logo.png')} /> */}
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
        {loading ? (
          <ActivityIndicator size="large" color="#A097DC" />
        ) : (
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
        )}
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
  },
  input: {
    borderColor: '#D9D9D9',
    borderWidth: 2,
    padding: 13,
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