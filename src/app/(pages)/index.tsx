import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, SafeAreaView, Button, Image, Text, ToastAndroid, Alert } from 'react-native';
import { router } from 'expo-router';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@/src/store/RootReducer';




export const connection = {
  apiBaseUrl: `https://komrisknxtcont.komrisk.com/komrisk/api/`
  //  https://komrisknxtcont.komrisk.com/komrisk
  // apiBaseUrl:`http://localhost:${port}`
}




const Workspace = () => {


  //    const [workSpaceName, setWorkSpaceName] = useState();
  const [workSpaceName, setWorkSpaceName] = useState<string>('');

  
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.count);
  console.log("apiSlice34343", count);
  useEffect(() => { 
    // const apiSlice = useSelector((state) => state.baseUrlSlice)
 


  }, [])

  const handleSubmitWorkSpace = async () => {
    // rrouter.push("/signin");
    if (workSpaceName === undefined || workSpaceName === '') {

      Alert.alert("Alert", "Workspace can not be empty");
    }
    else {
      router.push("/signin");

    }

  }



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

export default Workspace;