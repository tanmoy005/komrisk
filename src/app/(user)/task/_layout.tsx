import React from 'react'
import { Stack } from 'expo-router';

const Tasklayout = () => {
    return (
        <Stack screenOptions={{
            // headerStyle: headerColor
        }}>
            <Stack.Screen name="pendingTaskPage" options={{ title: "Pending Task", headerShown: false, headerTitleAlign: 'center' }} />
            <Stack.Screen name="[id]" options={{ title: 'Pending Task', headerShown: false, headerTitleAlign: 'center' }} />
        </Stack>

    )
}

export default Tasklayout