import React from 'react'
import { Stack } from 'expo-router';


const Page_layout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="signin" options={{ headerShown: false }} />
        </Stack>
    )
}

export default Page_layout