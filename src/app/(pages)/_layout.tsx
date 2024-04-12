import { View } from '@/src/components/Themed'
import React from 'react'
import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';


const Page_layout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="signin" options={{ headerShown: false }} />
            <Stack.Screen name="profilePage" options={{ headerShown: false }} />
        </Stack>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 50,
        // backgroundColor: "red"
    }
})
export default Page_layout