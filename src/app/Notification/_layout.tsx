import { View } from '@/src/components/Themed'
import React from 'react'
import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';


const Notification_Page_layout = () => {
    return (
        <Stack>
            <Stack.Screen name="notification_tab" options={{ title:"Notification", headerShown: true, headerTitleAlign:'center' }} />
        
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
export default Notification_Page_layout