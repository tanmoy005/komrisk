
import React from 'react';
// import FontAwesome5  from '@expo/vector-icons/FontAwesome';
import { FontAwesome5, MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons'

import { Link, Tabs } from 'expo-router';
import { Image, Pressable } from 'react-native';
import { Text, View } from 'react-native';
import { BackHandler, ToastAndroid } from 'react-native';
import  { useEffect, useRef } from 'react';

import Colors from '@/src/constants/Colors';
import { useColorScheme } from '@/src/components/useColorScheme';
import { useClientOnlyValue } from '@/src/components/useClientOnlyValue';
import { useNavigation } from 'expo-router';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={20} style={{ marginBottom: -3 }} {...props} />;
}


const CustomTabLabel = ({ title }: { title: string }) => (
  <View style={{ alignItems: 'center' }}>
    <Text style={{ textAlign: 'center', fontSize: 6.5, color: '#000000' }}>{title}</Text>
  </View>
);


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const lastBackPressed = useRef<number | null>(null);
  const navigation = useNavigation();


  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (lastBackPressed.current && lastBackPressed.current + 2000 >= Date.now()) {
        BackHandler.exitApp();
        return true;
      }

      lastBackPressed.current = Date.now();
      ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
      return true;

    });


    navigation .addListener('beforeRemove', (e) => {
      e.preventDefault();
     // backHandler.remove()
      //console.log('onback');
      // Do your stuff here
     // navigation.dispatch(e.data.action);
     
  });
  return () => backHandler.remove();

  }, []);


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
        name="impactAnalysis"
        options={{
          title: 'Impact Analysis',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="gavel" size={24} color="black" />,
          tabBarLabel: ({ focused, color }) => (
            <CustomTabLabel title="Impact Analysis" />
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
        name="activityStatus"
        options={{
          title: 'Activity Status',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <TabBarIcon name="tasks" color={"#000"} />,
          tabBarLabel: ({ focused, color }) => (
            <CustomTabLabel title="Activity Status" />
          ),
          tabBarItemStyle: {
            marginBottom: 5,
            borderRadius: 6,
            margin: 5,
            padding: 10,
            backgroundColor: "#fff",
          },
          tabBarIconStyle: {
            padding: 1
          },
        }}
      />
      <Tabs.Screen
        name="complianceStatus"
        options={{
          title: 'Compliance Status',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="checkbox-marked-circle-plus-outline" size={24} color="black" />,
          tabBarLabel: ({ focused, color }) => (
            <CustomTabLabel title="Compliance Status" />
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
        name="incidentActivity"
        options={{
          title: 'Incident Activity',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <AntDesign name="exclamationcircle" size={22} color="black" />,
          tabBarLabel: ({ focused, color }) => (
            <CustomTabLabel title="Incident Activity" />
          ),
          tabBarItemStyle: {
            // fontSize: 12,

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
        name="incidentComparison"
        options={{
          title: 'Incident Comparison',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="alert-circle" size={24} color="black" style={{ marginRight: -8 }} />
              <Ionicons name="alert-circle-outline" size={24} color="black" style={{ marginLeft: -2 }} />
            </View>
          ),
          tabBarLabel: ({ focused, color }) => (
            <CustomTabLabel title="Incident Comparison" />
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
        name="advancedReports"
        options={{
          title: 'Advanced Reports',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View style={{ transform: [{ rotate: '270deg' }] }}>
              <MaterialCommunityIcons name="text-box-plus-outline" size={24} color="black" />
            </View>
          ),
          tabBarLabel: ({ focused, color }) => (
            <CustomTabLabel title="Advanced Reports" />
          ),
          tabBarItemStyle: {
            marginBottom: 5,
            borderRadius: 6,
            margin: 5,
            padding: 10,
            backgroundColor: "#fff",

          },
          tabBarIconStyle: {
            padding: 1
          },
        }}
      />
    </Tabs>

  );
}