import { Pressable, StyleSheet } from 'react-native';

import { Text, View } from '@/src/components/Themed';
import Button from '@/src/components/Button';
import { router } from 'expo-router';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
interface RedirectionButton {
  btnName: string;
  pathName: string;
}

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
  const avatarLetter = userName ? userName[0].toUpperCase() : ''; // Ensure the first character is always upper case.
  return (
    <View style={styles.container}>
      <Pressable onPress={navigateToProfile}>
        <View style={{ ...styles.profileImageContainer, height: "50%" }}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{avatarLetter}</Text>
          </View>
          <Text style={styles.userTitle}>{userName}</Text>
          <View style={styles.separator}></View>
          <Text style={styles.designation}>{userRole}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 60
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: '45%',
    backgroundColor: "#26262C3D"
  },
  profileImageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 5
  },
  designation: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    color: '#26262C'
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#5645C0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarText: {
    color: 'white',
    fontSize: 50, // Adjust size as needed
    fontWeight: 'bold'
  },
});