import { View } from '@/src/components/Themed'
import React from 'react'
import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { headerColor } from '@/src/style';


const Pending_Task_layout = () => {
    return (
        <Stack screenOptions={{
            headerStyle: headerColor
          }}>
            <Stack.Screen name="pending_task" options={{ title:"Pending Task", headerShown: true, headerTitleAlign:'center' }} />
            <Stack.Screen name="pending_task_details" options={{ title:"Pending Task Details", headerShown: true, headerTitleAlign:'center' }} />

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
export default Pending_Task_layout