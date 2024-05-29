import Button from '@/src/components/Button'
import Profile from '@/src/components/Profile'

import { View } from '@/src/components/Themed'
import CardContainer3 from '@/src/components/cards/CardContainer3'
import HeadImageSection from '@/src/components/headSection/HeadImageSection'
import { screenHeight, screenWidth } from '@/src/style'
import React, { useState } from 'react'
import { useColorScheme } from 'react-native'

import { router } from 'expo-router'
import { AuthContext } from '@/src/provider/AuthProvider'

const ProfilePage = () => {
  const colorScheme = useColorScheme();
  const [firstName, setFirstName] = useState<string>('test');
  const { clearToken } = React.useContext(AuthContext);

  const handleLogout = () => {
    clearToken();
    router.replace('/(pages)')
    // Navigate to login or perform other actions
  };
  return (
    <CardContainer3 styles={{
      backgroundColor: '#FFFFFF',
      height: screenHeight
    }}>

      <HeadImageSection />
      <Profile />
      <View style={{ marginTop: Math.floor(screenHeight * 0.05) }}>
        <Button
          text='Logout'
          btnColor='#5645C0'
          type='outline'
          onPress={handleLogout}
          // onPress={() => router.push('/(user)/dashboard/complianceStatus')}
          style={{
            paddingVertical: Math.floor(screenWidth * 0.05),
            paddingHorizontal: Math.floor(screenWidth * 0.01),
            fontWeight: '400',
            fontSize: 16,
            borderRadius: 3,
            width: Math.floor(screenWidth * 0.35)
          }} />
      </View>
    </CardContainer3>
  )
}

export default ProfilePage