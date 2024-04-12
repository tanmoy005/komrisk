import { StatusBar } from 'expo-status-bar';
import { Image, Platform, Pressable, StyleSheet } from 'react-native';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import Button from '../components/Button';
import { router } from 'expo-router';
interface RedirectionButton {
    btnName: string;
    pathName: string;
}

export default function ModalScreen() {

    // const buttonList:RedirectionButton[] = [
    //   {
    //     btnName: 'My Pending Tasks',
    //     pathName: '/(user)/dashboard/complianceStatus'
    //   },
    //   {
    //     btnName: 'Dashboard',
    //     pathName: '/(user)/dashboard/complianceStatus'
    //   },
    //   {
    //     btnName: 'Notifications',
    //     pathName: '/(user)/dashboard/complianceStatus'
    //   }
    // ]
    const navigateToProfile = () => {
        router.push('/profilePage');
    }

    return (
        <View style={styles.container}>
            <View
                style={{
                    backgroundColor: "#red",
                    height: "50%",
                    justifyContent: "center",
                    alignItems: "stretch",
                    rowGap: 20
                }}
            >
                <Button
                    text='Chart Filter'
                    btnColor='#5645C0'
                    type='outline'
                    onPress={() => router.push('/chartFilterModel')}
                    style={{
                        paddingVertical: 20,
                        paddingHorizontal: 48,
                        fontWeight: '400',
                        fontSize: 16
                    }}
                />
                <Button
                    text='Filter 2'
                    btnColor='#5645C0'
                    type='outline'
                    onPress={() => router.push('/(user)/dashboard/complianceStatus')}
                    style={{
                        paddingVertical: 20,
                        paddingHorizontal: 48,
                        fontWeight: '400',
                        fontSize: 16
                    }}
                />

                <Button
                    text='Filter 3'
                    btnColor='#5645C0'
                    type='outline'
                    onPress={() => router.push('/(user)/dashboard/complianceStatus')}
                    style={{
                        paddingVertical: 20,
                        paddingHorizontal: 48,
                        fontWeight: '400',
                        fontSize: 16,
                        borderRadius: 3
                    }}
                />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 60
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 5,
        height: 1,
        width: '45%',
        backgroundColor: "#26262C3D"
    },
    profileImageContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginTop: 5
    },
    designation: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 14,
        color: '#26262C'
    }
});
