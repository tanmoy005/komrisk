import { Pressable, StyleSheet } from 'react-native';

import { Text, View } from '@/src/components/Themed';
import Button from '@/src/components/Button';
import { router } from 'expo-router';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { styles } from '../style';
import Initials from '../components/Initials';


export default function Menu() {
  const userDetails = useSelector((state: RootState) => state.authUserDetails.payload);
  const [userName, setUserName] = useState<string>(userDetails?.userDetails?.displayName ?? "");
  const [userRole, setUserRole] = useState<string>(userDetails?.userDetails?.role ?? "");
  const navigateToProfile = () => {
    router.push('/profilePage');
  }

  useEffect(() => {
    setUserName(userDetails?.userDetails?.displayName ?? "");
    setUserRole(userDetails?.userDetails?.role ?? "");
  }, [userDetails]);
 // Ensure the first character is always upper case.
  return (
    <View style={styles.profileImageSectioncontainer}>
      <Pressable onPress={navigateToProfile}>
        <View style={{ ...styles.bigprofileImageContainer, height: "50%" }}>
          <Initials size={120} fontSize ={50} />
          <Text style={styles.userTitle}>{userName}</Text>
          <Text style={{ ...styles.designation, marginTop: 3 }}>{userRole}</Text>
        </View>
      </Pressable>
      <View
        style={{
          backgroundColor: "#red",
          height: "50%",
          justifyContent: "center",
          alignItems: "stretch",
          rowGap: 20
        }}
      >
        <Button
          text='My Pending Tasks'
          btnColor='#5645C0'
          type='outline'
          onPress={() => router.push('/(user)/task/pendingTaskPage')}
          style={{
            paddingVertical: 20,
            paddingHorizontal: 48,
            fontWeight: '400',
            fontSize: 16
          }}
        />
        <Button
          text='Dashboard'
          btnColor='#5645C0'
          type='outline'
          onPress={() => router.push('/(user)/dashboard/complianceStatus')}
          style={{
            paddingVertical: 20,
            paddingHorizontal: 48,
            fontWeight: '400',
            fontSize: 16
          }}
        />

        <Button
          text='Notifications'
          btnColor='#5645C0'
          type='outline'
          onPress={() => router.push('/notification/notification_tab/allnotificationList')}
          style={{
            paddingVertical: 20,
            paddingHorizontal: 48,
            fontWeight: '400',
            fontSize: 16,
            borderRadius: 3
          }}
        />
      </View>
    </View >
  );
}
