import { StyleSheet, Text } from 'react-native';
import Colors from '@/src/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import { headerColor } from '@/src/style';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();

  return <Stack screenOptions={{
    headerStyle: headerColor,
    title: "dashboard",
    headerTitleAlign: 'center',

    headerRight: () =>
      <Link href="/menu" asChild>
        <Pressable>
          {({ pressed }) => (
            <FontAwesome
              name="bars"
              size={25}
              color={Colors[colorScheme ?? 'light'].text}
              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </Link>
  }}>
    <Stack.Screen name='index'
      options={{
        title: "Dashboard",
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#F6EEF4', // Change the background color here
        }
      }} />
    <Stack.Screen name="chartReport" options={{ headerShown: false }} />
    <Stack.Screen name="profilePage" options={{ title: "Profile", headerShown: true, headerTitleAlign: 'center' }} />
    <Stack.Screen name="task" options={{ title: "Pending Task", headerShown: false, headerTitleAlign: 'center' }} />
    <Stack.Screen name="notification" options={{ title: "Notification", headerShown: false, headerTitleAlign: 'center' }} />
  </Stack>;

};