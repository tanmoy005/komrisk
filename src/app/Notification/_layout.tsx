import { View } from '@/src/components/Themed'
import React from 'react'
import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';


const Notification_layout = () => {
    return (
        <Stack>
            <Stack.Screen name="Notification" options={{ headerShown: false }} />

        </Stack>
    )
}

export default Notification_layout