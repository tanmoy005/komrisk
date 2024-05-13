import React from 'react'
import { Stack } from 'expo-router';
import { headerColor } from '@/src/style';

const Tasklayout = () => {
    return (
        <Stack screenOptions={{
            headerStyle: headerColor
            
          }}>
            <Stack.Screen name="pendingTaskPage" options={{ title: "Pending Task", headerShown: true, headerTitleAlign: 'center' }} />
            <Stack.Screen name="[id]" options={{ title: 'Pending Task Details', headerShown: true, headerTitleAlign: 'center' }} />

        </Stack>

    )
}

export default Tasklayout