import { StatusBar } from 'expo-status-bar';
import { Image, Platform, Pressable, StyleSheet } from 'react-native';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import Button from '../components/Button';
import { router } from 'expo-router';
interface RedirectionButton {
  btnName: string;
  pathName: string;
}

export default function ProfileModalScreen() {

  // const buttonList:RedirectionButton[] = [
  //   {
  //     btnName: 'My Pending Tasks',
  //     pathName: '/(user)/dashboard/complianceStatus'
  //   },
  //   {
  //     btnName: 'Dashboard',
  //     pathName: '/(user)/dashboard/complianceStatus'
  //   },
  //   {
  //     btnName: 'Notifications',
  //     pathName: '/(user)/dashboard/complianceStatus'
  //   }
  // ]
  const navigateToProfile =()=>{
    router.push('/profilePage');
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Modal</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/modal.tsx" />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} /> */}
      <Pressable onPress={navigateToProfile}>
        <View  style={{ ...styles.profileImageContainer, height: "50%" }}>
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
        {/* {
            buttonList.map(({btnName, pathName}: RedirectionButton)=>{
              return (

                <Button
                  text={btnName}
                  btnColor='#5645C0'
                  type='outline'
                  onPress={()=> router.push({pathName: pathName})}
                  style={{
                    paddingVertical: 20,
                    paddingHorizontal: 48,
                    fontWeight: '400',
                    fontSize: 16
                  }}
                />
              )
            })
          } */}
        <Button
          text='My Pending Tasks'
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
          onPress={() => router.push('/(user)/dashboard/complianceStatus')}
          style={{
            paddingVertical: 20,
            paddingHorizontal: 48,
            fontWeight: '400',
            fontSize: 16,
            borderRadius: 3
          }}
        />
        {/* <View style={{ marginVertical: 10 }}>
        </View> */}
        {/* <View style={{ marginVertical: 10 }}>
          <Button
            text='My Pending Tasks'
            btnColor='#5645C0'
            type='outline'
            style={{
              paddingVertical: 5,
              paddingHorizontal: 16,
              fontWeight: '400',
              fontSize: 16
            }}
          />
        </View> */}
      </View>

      {/* <View style={styles.submitBtnContainer}> */}
      {/* <Button
                    //   style={styles.submitBtn}
                    title="My Pending Tasks"
                    color="#A097DC"
                    // onPress={handleSubmitSignIn}
                /> */}
      {/* </View> */}

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
