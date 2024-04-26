import { StatusBar } from 'expo-status-bar';
import { Image, Platform, Pressable, StyleSheet } from 'react-native';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import Button from '@/src/components/Button';
import { router } from 'expo-router';
interface RedirectionButton {
  btnName: string;
  pathName: string;
}

export default function Menu() {
  const navigateToProfile = () => {
    router.push('/profilePage');
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={navigateToProfile}>
        <View style={{ ...styles.profileImageContainer, height: "50%" }}>
          <Image style={{ width: 120, height: 120 }} source={require('@/assets/images/User.png')} />
          <Text style={styles.userTitle}>Alicia Lockheed</Text>
          <View style={styles.separator}></View>
          <Text style={styles.designation}>Senior Manager</Text>
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
          onPress={() => router.push('/(user)/pending_task/pending_task')}
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
  }
});