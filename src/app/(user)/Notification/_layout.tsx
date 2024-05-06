import { View } from '@/src/components/Themed'
import React from 'react'
import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { headerColor } from '@/src/style';


const Notification_Page_layout = () => {
    return (
        <Stack screenOptions={{
            headerStyle: headerColor
            
          }}>
             {/* <Stack.Screen name="notification" options={{ title: "Notification", headerShown: true, headerTitleAlign: 'center' }} /> */}
            <Stack.Screen name="notification_tab" options={{ title:"Notification", headerShown: false, headerTitleAlign:'center' }} />
            <Stack.Screen name="[id]" options={{ title: 'Notification Details', headerShown: false, headerTitleAlign:'center' }} />

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