import { View } from '@/src/components/Themed'
import React from 'react'
import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';


const Page_layout = () => {
    return (
        <Stack>
            
            <View style={styles.container}>
                <Stack.Screen name="(pages)" options={{headerTitle:"Test", headerShown: true }} />
                <Stack.Screen name="(pages)/signin" options={{ headerShown: false }} />
            </View>
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