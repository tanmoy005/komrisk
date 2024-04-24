
import React from 'react';
// import FontAwesome5  from '@expo/vector-icons/FontAwesome';
import { FontAwesome5, MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons'

import { Link, Tabs } from 'expo-router';
import { Image, Pressable } from 'react-native';
import { Text, View } from 'react-native';

import Colors from '@/src/constants/Colors';
import { useColorScheme } from '@/src/components/useColorScheme';
import { useClientOnlyValue } from '@/src/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={20} style={{ marginBottom: -3 }} {...props} />;
}




const CustomTabLabel = ({ title }: { title: string }) => (
  <View style={{ alignItems: 'center' }}>
    <Text style={{ textAlign: 'center', fontSize: 10, color: '#000000' }}>{title}</Text>
  </View>
);


export default function NotificationTabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: {
          height: 80,
          backgroundColor: "#F1F1F1",

        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '400',
          lineHeight: 16,
          textAlign: 'center',
          color: '#000000',


        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.

        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="allnotificationList"
        options={{
          title: 'See All',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="wall" size={24} color="black" />,
          tabBarLabel: ({ focused, color }) => (
            <CustomTabLabel title="See All" />
          ),
          tabBarItemStyle: {
            marginBottom: 5,
            borderRadius: 6,
            margin: 5,
            padding: 10,
            backgroundColor: "#fff"
          },
          tabBarIconStyle: {
            padding: 1
          },

        }}
      />

      <Tabs.Screen
        name="compliancesnotificationList"
        options={{
          title: 'Compliances',
          headerShown: false,
          // tabBarIcon: ({ color, size }) => (

          //   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          //     <AntDesign name="file1" size={24} color="black" style={{ marginRight: -12 }} />
          //     <MaterialCommunityIcons name="playlist-check" size={18} color="black" style={{ marginLeft: -6, marginTop: 12 }} />
          //   </View>
          // ),

          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('@/assets/images/Property 1=Compliances.png')}
              style={{ width: 20, height: 24 }} // Set the width and height to the desired size
            />
          ),
          
          
          
          // tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="text-box-check-outline" size={24} color="black" />,
          tabBarLabel: ({ focused, color }) => (
            <CustomTabLabel title="Compliances" />
          ),
          tabBarItemStyle: {
            marginBottom: 5,
            borderRadius: 6,
            margin: 5,
            padding: 10,
            backgroundColor: "#fff"
          },
          tabBarIconStyle: {
            padding: 1
          },

        }}
      />

<Tabs.Screen
        name="tasksnotificationList"
        options={{
          title: 'Tasks',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="format-list-checks" size={24} color="black" />,
          tabBarLabel: ({ focused, color }) => (
            <CustomTabLabel title="Tasks" />
          ),
          tabBarItemStyle: {
            marginBottom: 5,
            borderRadius: 6,
            margin: 5,
            padding: 10,
            backgroundColor: "#fff"
          },
          tabBarIconStyle: {
            padding: 1
          },

        }}
      />

<Tabs.Screen
        name="alertsnotificationList"
        options={{
          title: 'Alerts',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="bell-plus-outline" size={24} color="black" />,
          tabBarLabel: ({ focused, color }) => (
            <CustomTabLabel title="Alerts" />
          ),
          tabBarItemStyle: {
            marginBottom: 5,
            borderRadius: 6,
            margin: 5,
            padding: 10,
            backgroundColor: "#fff"
          },
          tabBarIconStyle: {
            padding: 1
          },

        }}
      />









    </Tabs>
  );
}
