
import React from 'react';
// import FontAwesome5  from '@expo/vector-icons/FontAwesome';
import { FontAwesome5, MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons'

import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { BackHandler, ToastAndroid } from 'react-native';
import { useEffect, useRef } from 'react';

import Colors from '@/src/constants/Colors';
import { useColorScheme } from '@/src/components/useColorScheme';
import { useClientOnlyValue } from '@/src/components/useClientOnlyValue';
import { useNavigation } from 'expo-router';
import { styles } from '@/src/style';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={22} style={{ marginBottom: -3 }} {...props} />;
}


const CustomTabLabel = ({ title }: { title: string }) => (
  <View style={{ alignItems: 'center' }}>
    <Text style={{ textAlign: 'center', fontSize: 7.5, fontWeight: '500', color: '#000000' }}>{title}</Text>
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


    // navigation.addListener('beforeRemove', (e) => {

    //   if (e?.data?.action?.source != null) {
    //     e.preventDefault();
    //   } else {
    //     navigation.dispatch(e.data.action);
    //   }
    // });
    return () => backHandler.remove();

  }, []);


  return (

    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.

        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="impactAnalysis"
        options={{
          title: 'Impact Analysis',
          headerShown: false,
          tabBarIcon: () => <MaterialCommunityIcons name="gavel" size={24} color="black" />,
          tabBarLabel: () => (
            <CustomTabLabel title="Impact Analysis" />
          ),
          tabBarItemStyle: styles.tabBarItemStyle,
          tabBarIconStyle: styles.tabBarIconStyle
        }}
      />
      <Tabs.Screen
        name="activityStatus"
        options={{
          title: 'Activity Status',
          headerShown: false,
          tabBarIcon: () => <TabBarIcon name="tasks" color={"#000"} />,
          tabBarLabel: () => (
            <CustomTabLabel title="Activity Status" />
          ),
          tabBarItemStyle: styles.tabBarItemStyle,
          tabBarIconStyle: styles.tabBarIconStyle
        }}
      />
      <Tabs.Screen
        name="complianceStatus"
        options={{
          title: 'Compliance Status',
          headerShown: false,
          tabBarIcon: () => <MaterialCommunityIcons name="checkbox-marked-circle-plus-outline" size={24} color="black" />,
          tabBarLabel: () => (
            <CustomTabLabel title="Compliance Status" />
          ),
          tabBarItemStyle: styles.tabBarItemStyle,
          tabBarIconStyle: styles.tabBarIconStyle

        }}
      />


      <Tabs.Screen
        name="incidentActivity"
        options={{
          title: 'Incident Activity',
          headerShown: false,
          tabBarIcon: () => <AntDesign name="exclamationcircle" size={22} color="black" />,
          tabBarLabel: () => (
            <CustomTabLabel title="Incident Activity" />
          ),
          tabBarItemStyle: styles.tabBarItemStyle,
          tabBarIconStyle: styles.tabBarIconStyle

        }}
      />


      <Tabs.Screen
        name="incidentComparison"
        options={{
          title: 'Incident Comparison',
          headerShown: false,
          tabBarIcon: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="alert-circle" size={24} color="black" style={{ marginRight: -8 }} />
              <Ionicons name="alert-circle-outline" size={24} color="black" style={{ marginLeft: -2 }} />
            </View>
          ),
          tabBarLabel: () => (
            <CustomTabLabel title="Incident Comparison" />
          ),
          tabBarItemStyle: styles.tabBarItemStyle,
          tabBarIconStyle: styles.tabBarIconStyle
        }}
      />


      <Tabs.Screen
        name="advancedReports"
        options={{
          title: 'Advanced Reports',
          headerShown: false,
          tabBarIcon: () => (
            <View style={{ transform: [{ rotate: '270deg' }] }}>
              <MaterialCommunityIcons name="text-box-plus-outline" size={24} color="black" />
            </View>
          ),
          tabBarLabel: () => (
            <CustomTabLabel title="Advanced Reports" />
          ),
          tabBarItemStyle: styles.tabBarItemStyle,
          tabBarIconStyle: styles.tabBarIconStyle
        }}
      />
    </Tabs>

  );
}