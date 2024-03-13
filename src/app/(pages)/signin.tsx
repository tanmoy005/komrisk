import React, { useState } from 'react';
import { StyleSheet, TextInput, View, SafeAreaView, Button, Image, Text, ToastAndroid, Alert } from 'react-native';
import axios from "axios";
import { Redirect, router } from 'expo-router';
import { UserModel } from '@/src/types';
import AuthenticateUser from '@/src/server/api-functions/authenticate-user';


let SignIn = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmitSignIn = async () => {
        //   router.push("/(user)/");
        // <Redirect href={'/(user)/dashboard/'} />
        console.log('werwer');
        router.push("/(user)/dashboard");

        // const payLoad: UserModel = {
        //     username,
        //     password
        // }
        // const { error, status } = await AuthenticateUser(payLoad);
        // if (status === 200) {
        //     router.push("/(user)/dashboard");
        // } else {
        //     Alert.alert("error", error.message);
        // }
     
    }

    // const handleSubmitSignIn = async () => {
    //     const payLoad = {
    //       Url: `https://${baseURL}.komrisk.com`
    //     };
    //     console.log('handleSubmitSignIn');
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
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value: string) => setUsername(value)}
                        value={username}
                        placeholder="User Name"
                    />
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value: string) => setPassword(value)}
                        value={password}
                        placeholder="Password"
                    />
                </View>
            </SafeAreaView>
            <View style={styles.submitBtnContainer}>
                <Button
                    //   style={styles.submitBtn}
                    title="Login"
                    color="#A097DC"
                    onPress={handleSubmitSignIn}
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
    inputBox: {
        margin: 10
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

console.log("SignIn", SignIn);
export default SignIn;