import React from 'react';
// import FontAwesome5  from '@expo/vector-icons/FontAwesome';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'

import { Link, Tabs } from 'expo-router';
import { Image, Pressable } from 'react-native';

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

export default function TabLayout() {
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
          color: '#000000'
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.

        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="complianceStatus"
        options={{
          title: 'Compliance Status',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="checkbox-marked-circle-plus-outline" size={24} color="black" />,
          tabBarItemStyle: {
            marginBottom: 10,
            borderRadius: 6,
            margin: 10,
            padding: 10,
            backgroundColor: "#fff"
          },
          tabBarIconStyle: {
            padding: 1
          },

        }}
      />
      <Tabs.Screen
        name="activityStatus"
        options={{
          title: 'Activity Status',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <TabBarIcon name="tasks" color={"#000"} />,
          tabBarItemStyle: {
            // fontSize: 12,

            marginBottom: 10,
            borderRadius: 6,
            margin: 10,
            padding: 10,
            backgroundColor: "#fff"
          },
          tabBarIconStyle: {
            padding: 1
          },

        }}
      />

      <Tabs.Screen
        name="incidentStatus"
        options={{
          title: 'Incident Activity',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="information" size={24} color="black" />,
          tabBarItemStyle: {
            // fontSize: 12,

            marginBottom: 10,
            borderRadius: 6,
            margin: 10,
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
