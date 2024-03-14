import React, { useState } from 'react';
import { StyleSheet, TextInput, View, SafeAreaView, Button, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import { UserModel } from '@/src/types';
import AuthenticateUser from '@/src/server/api-functions/authenticate-user';
import { useDispatch } from 'react-redux';
import { storeUserDetails } from '@/src/store/slices/login-data-slice';
import { setDataToAsyncStorage } from '@/src/utils';


let SignIn = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useDispatch();
    const handleSubmitSignIn = async () => {

        // console.log('werwer');
        // router.push("/(user)/dashboard");
        if (username === '' || password === '') {
            Alert.alert("error", 'Username or password cannot be empty');
            return;
        }
        const payLoad: UserModel = {
            username,
            password
        }
        const { data, error, status } = await AuthenticateUser(payLoad);
        console.log('data', data);

        if (status === 200) {
            dispatch(storeUserDetails(data));
            setDataToAsyncStorage('token', data.token);
            router.push("/(user)/dashboard/complianceStatus");
        } else {
            Alert.alert("error", error.message);
        }
        setUsername('');
        setPassword('');
    }

  

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={{ width: 100 }} source={require('@/assets/images/Komrisk-Logo-small.png')} />
            </View>
            <View style={styles.loginImageContainer}>
                <Image style={{ width: 300, height: 300 }} source={require('@/assets/images/Ellipse 4.png')} />
                <Image style={styles.humanImg} source={require('@/assets/images/Human.png')} />
                {/* <Image style={{ width: 100 }} source={require('@/assets/images/Polygon 3.png')} /> */}

            </View>
            {/* <View style={styles.logoContainer}>

                <View style={styles.lexLogoContainer}>
                    <Image source={require('@/assets/images/Rectangle98.png')} />
                    <Text>BY</Text>
                    <Image source={require('@/assets/images/Lex-Logo.png')} />
                </View>
            </View> */}

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
        padding: 50
        // backgroundColor: "red"
    },
    loginImageContainer: {
        flexDirection: "row",
        position: "relative",
        marginLeft: 70
    },
    humanImg:{
        position: "absolute",
        bottom: -40,
        left: "30%",
        // transform: "translateX(-50%)"
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
        alignItems: 'stretch',
        width: '100%',
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
        alignItems: 'flex-end',
        width: '100%'
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