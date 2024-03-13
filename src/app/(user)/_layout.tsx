import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import PieChartData from '@/src/components/PieChart';
import Colors from '@/src/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  // const CustomHeaderTitle = ({ children }) => (
  //   <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 15 }}>
  //     <Text>{children}</Text>
  //   </View>
  // );
  return <Stack screenOptions={{
    headerRight: () => (
      <Link href="/modal" asChild>
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
    ),
  }}>
    <Stack.Screen name='index'
      options={{
        title: "Dashboard",
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#F6EEF4', // Change the background color here
        },
      }} />
  </Stack>;
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});