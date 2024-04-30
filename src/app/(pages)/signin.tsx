import React, { useState } from 'react';
import { StyleSheet, TextInput, View, SafeAreaView, Image, Text, ToastAndroid, Alert } from 'react-native';
// import axios from "axios";
import { Redirect, router } from 'expo-router';
import { UserModel } from '@/src/types';
import AuthenticateUser from '@/src/server/api-functions/Login/authenticate-user';
import setDataToAsyncStorage from '@/src/utils/associate/set-to-localstorage';
import { useDispatch, useSelector } from 'react-redux';
import { storeAuthUserCred } from '@/src/store/slices/auth-user-cred-slice';
import Button from '@/src/components/Button';
import GetUserAccessDetails from '@/src/server/api-functions/Misc/user-access-details';
import { storeAuthUserAccessDetails } from '@/src/store/slices/auth-user-access-details-slice';
import { storeAuthUserDetails } from '@/src/store/slices/auth-user-details-slice';
import GetIncidentAvailableViews from '@/src/server/api-functions/Misc/get-incident-available-views';
import { storeIncidentAvailableViews } from '@/src/store/slices/incident-available-views-slice';
import { RootState } from '@/src/store';
import { screenWidth } from '@/src/style';



let SignIn = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const workspaceName = useSelector((state: RootState) => state.baseUrl.payload.workSpaceName);

    const dispatch = useDispatch();
    


    const handleSubmitSignIn = async () => {

        if (username === '' || password === '') {
            Alert.alert("error", 'Username or password cannot be empty');
            return;
        }
        const payLoad: UserModel = {
            username,
            password
        }
        const { data, error, status } = await AuthenticateUser(payLoad);

        if (status === 200) {
            const { token, userDetails, countryEnabled } = data
            setDataToAsyncStorage('token', token);
            router.navigate("/(user)/dashboard/complianceStatus");
            dispatch(storeAuthUserCred({ username, password }))
            dispatch(storeAuthUserDetails({ userDetails, countryEnabled }))
            GetUserAccessData();
            GetIncidentAvaliableViews();

        } else {
            Alert.alert("error", "Invalid Credentials");
            return;
        }
        setUsername('');
        setPassword('');
    }

    const GetUserAccessData = async () => {
        const payLoad: UserModel = {
            username,
            password
        }
        const { data, error, status } = await GetUserAccessDetails(payLoad);
        if (status === 200) {
            const { countryEnabled, countryList, complianceViewAs, entityView } = data;
            dispatch(storeAuthUserAccessDetails({ countryEnabled, countryList, complianceViewAs, entityView }))
        } else {
            Alert.alert("error", "Invalid User Credentials");
            return;
        }
    }
    const GetIncidentAvaliableViews = async () => {
        const payLoad: UserModel = {
            username,
            password
        }
        const { data, error, status } = await GetIncidentAvailableViews(payLoad);
        if (status === 200) {
            dispatch(storeIncidentAvailableViews(data))
        } else {
            Alert.alert("error", "Invalid User Credentials");
            return;
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={{ width: (screenWidth * 0.2333333333), height: (screenWidth * 0.06) }} source={require('@/assets/images/Small-logo.png')} />
            </View>
            <View style={styles.workSpaceImageContainer}>
                <View style={styles.workspaceHeadingSection}>
                    <Text style={styles.workspaceHeading}>Workspace</Text>
                    <Text style={styles.workspaceName}>{workspaceName}</Text>
                    {/* <Text style={styles.workspaceName}>{"workspaceName"}</Text> */}

                </View>
                <View style={styles.loginImageContainer}>
                    <Image style={{ width: 250, height: 250 }} source={require('@/assets/images/Ellipse 4.png')} />
                    <Image style={styles.humanImg} source={require('@/assets/images/Human.png')} />
                    {/* <Image style={{ width: 100 }} source={require('@/assets/images/Polygon 3.png')} /> */}

                </View>
                <Text style={styles.smallFont}>Just one more step</Text>
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
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText={(value: string) => setPassword(value)}
                        value={password}
                        placeholder="Password"
                    />
                </View>
                <Text style={styles.forgetPass}>Forgot password ?</Text>
            </SafeAreaView>
            <View style={styles.submitBtnContainer}>
                <Button
                    btnColor={'#A097DC'}
                    text='Login'
                    style={{
                        paddingVertical: 20,
                        paddingHorizontal: 48,
                        fontWeight: '400',
                        fontSize: 16,
                        borderRadius: 5
                    }}
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
    workSpaceImageContainer: {
        width: '100%',
        position: 'relative',
        marginTop: -55,
    },
    loginImageContainer: {
        flexDirection: "row",
        position: "relative",
        marginLeft: 70
    },
    humanImg: {
        height: 175,
        width: 150,
        position: "absolute",
        bottom: -30,
        left: "15%",
        // transform: "translateX(-50%)"
    },
    forgetPass: {
        textAlign: 'right',
        marginRight: 11,
        marginTop: 20,
        color: '#A097DC'
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
        alignItems: 'stretch',
        width: '100%',
        marginTop: 0
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
        marginTop: 50,
        alignItems: 'flex-end',
        width: '100%'
    },
    lexLogoContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'stretch'
    },
    workspaceHeadingSection: {
        position: 'absolute',
        left: 0,
        top: '40%',
        zIndex: 1
    },
    workspaceHeading: {
        color: '#26262C',
        fontWeight: "400",
        fontSize: 24
    },
    workspaceName: {
        marginTop: 10,
        fontSize: 12
    },
    smallFont: {
        fontSize: 16,
        fontWeight: "400",
        marginTop: 40,
        textAlign: 'center'
    }
});
export default SignIn;