import Button from '@/src/components/Button'
import Profile from '@/src/components/Profile'
// import Profile from '@/src/components/Profile'
import { View } from '@/src/components/Themed'
import CardContainer from '@/src/components/cards/CardContainer'
import CardContainer2 from '@/src/components/cards/CardContainer2'
import CardContainer3 from '@/src/components/cards/CardContainer3'
import CardTextContainer from '@/src/components/cards/CardTextContainer'
import HeadImageSection from '@/src/components/headSection/HeadImageSection'
import Text1 from '@/src/components/headings/Label1'
import InputField from '@/src/components/input-fields/InputField'
import SmSectionSeperator from '@/src/components/seperators/SmSectionSeperator'
import Colors from '@/src/constants/Colors'
import { screenHeight, screenWidth, styles } from '@/src/style'
import { FontAwesome } from '@expo/vector-icons'
import { Link, Stack } from 'expo-router'
import React, { useState } from 'react'
import { Pressable, Text, useColorScheme } from 'react-native'
import { Divider, Image } from 'react-native-elements'



import AuthProvider, {AuthContext} from '../../provider/AuthProvider';
import { router } from 'expo-router';

const ProfilePage = () => {
  const colorScheme = useColorScheme();
  const [firstName, setFirstName] = useState<string>('test');
  const { clearToken } = React.useContext(AuthContext);

  const handleLogout = () => {
    clearToken(); 

    router.push('/(pages)')
    
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