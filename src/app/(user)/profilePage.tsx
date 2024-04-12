import Button from '@/src/components/Button'
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

const ProfilePage = () => {
  const colorScheme = useColorScheme();
  const [firstName, setFirstName] = useState<string>('test');
  return (
    <CardContainer3 styles={{
      backgroundColor: '#FFFFFF',
      height: screenHeight
    }}>

      <HeadImageSection />
      <View style={styles.profileImageContainer}>
        <Image style={styles.profileImage} source={require('@/assets/images/User.png')} />
      </View>
      <Divider style={{ ...styles.divider1, marginTop: Math.floor(screenWidth * 0.066) }} />
      <View style={{ marginTop: Math.floor(screenWidth * 0.066), height:'auto',alignItems:'stretch' }}>
        <CardTextContainer>
          <View style={styles.profileFormContainer}>
            <View style={styles.profileInputFiledRowContainer}>
              <Text1>First Name</Text1>
              <View style={styles.profileInputFieldContainer}>
                <InputField value={''} setInput={setFirstName} placeholder={'first name here'} type='1' />
              </View>
            </View>
            <View style={styles.profileInputFiledRowContainer}>
              <Text1>Last Name</Text1>
              <View style={styles.profileInputFieldContainer}>
                <InputField value={''} setInput={setFirstName} placeholder={'last Name here'} type='1' />
              </View>
            </View>
            <View style={styles.profileInputFiledRowContainer}>
              <Text1>Role</Text1>
              <View style={styles.profileInputFieldContainer}>
                <InputField value={''} setInput={setFirstName} placeholder={'role here'} type='1' />
              </View>
            </View>
            <View style={styles.profileInputFiledRowContainer}>
              <Text1>Username</Text1>
              <View style={styles.profileInputFieldContainer}>
                <InputField value={''} setInput={setFirstName} placeholder={'username here'} type='1' />
              </View>
            </View>
            <View style={styles.profileInputFiledRowContainer}>
              <Text1>Company</Text1>
              <View style={styles.profileInputFieldContainer}>
                <InputField value={''} setInput={setFirstName} placeholder={'company name here'} type='1' />
              </View>
            </View>
            <View style={styles.profileInputFiledRowContainer}>
              <Text1>Operating Unit</Text1>
              <View style={styles.profileInputFieldContainer}>
                <InputField value={''} setInput={setFirstName} placeholder={'operating unit name here'} type='1' />
              </View>
            </View>
            <View style={styles.profileInputFiledRowContainer}>
              <Text1>Department</Text1>
              <View style={styles.profileInputFieldContainer}>
                <InputField value={''} setInput={setFirstName} placeholder={'dept. name here'} type='1' />
              </View>
            </View>
            <View style={styles.profileInputFiledRowContainer}>
              <Text1>Phone</Text1>
              <View style={styles.profileInputFieldContainer}>
                <InputField value={''} setInput={setFirstName} placeholder={'phone number here'} type='1' />
              </View>
            </View>
          </View>
        </CardTextContainer>
        <View >

          <Button
            text='Logout'
            btnColor='#5645C0'
            type='outline'
            // onPress={() => router.push('/(user)/dashboard/complianceStatus')}
            style={{
              // paddingVertical: 20,
              paddingVertical: Math.floor(screenWidth * 0.05),
              paddingHorizontal: Math.floor(screenWidth * 0.01),
              fontWeight: '400',
              fontSize: 16,
              borderRadius: 3,
              width: Math.floor(screenWidth * 0.35)
            }} />
        </View>
      </View>
      {/* <View>

        <Text>This is testasdddddddddddddddddddddddddddddddd Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem cumque doloremque sunt atque delectus quam distinctio deleniti. Perferendis ut totam vitae, molestiae iste repudiandae unde. Eaque illum atque eius praesentium. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias eos eum placeat consequuntur minima quo voluptates doloribus cupiditate reprehenderit quas laborum accusantium cum molestiae, assumenda nulla ratione distinctio, cumque necessitatibus!</Text>
        <Text>This is testasdddddddddddddddddddddddddddddddd Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem cumque doloremque sunt atque delectus quam distinctio deleniti. Perferendis ut totam vitae, molestiae iste repudiandae unde. Eaque illum atque eius praesentium. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias eos eum placeat consequuntur minima quo voluptates doloribus cupiditate reprehenderit quas laborum accusantium cum molestiae, assumenda nulla ratione distinctio, cumque necessitatibus!</Text>
        <Text>This is testasdddddddddddddddddddddddddddddddd Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem cumque doloremque sunt atque delectus quam distinctio deleniti. Perferendis ut totam vitae, molestiae iste repudiandae unde. Eaque illum atque eius praesentium. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias eos eum placeat consequuntur minima quo voluptates doloribus cupiditate reprehenderit quas laborum accusantium cum molestiae, assumenda nulla ratione distinctio, cumque necessitatibus!</Text>
        <Text>This is testasdddddddddddddddddddddddddddddddd Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem cumque doloremque sunt atque delectus quam distinctio deleniti. Perferendis ut totam vitae, molestiae iste repudiandae unde. Eaque illum atque eius praesentium. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias eos eum placeat consequuntur minima quo voluptates doloribus cupiditate reprehenderit quas laborum accusantium cum molestiae, assumenda nulla ratione distinctio, cumque necessitatibus!</Text>
        <Text>This is testasdddddddddddddddddddddddddddddddd Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem cumque doloremque sunt atque delectus quam distinctio deleniti. Perferendis ut totam vitae, molestiae iste repudiandae unde. Eaque illum atque eius praesentium. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias eos eum placeat consequuntur minima quo voluptates doloribus cupiditate reprehenderit quas laborum accusantium cum molestiae, assumenda nulla ratione distinctio, cumque necessitatibus!</Text>
        <Text>This is testasdddddddddddddddddddddddddddddddd Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem cumque doloremque sunt atque delectus quam distinctio deleniti. Perferendis ut totam vitae, molestiae iste repudiandae unde. Eaque illum atque eius praesentium. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias eos eum placeat consequuntur minima quo voluptates doloribus cupiditate reprehenderit quas laborum accusantium cum molestiae, assumenda nulla ratione distinctio, cumque necessitatibus!</Text>
      </View> */}
      {/* <Profile /> */}
    </CardContainer3>
    // <View>
    //   <Text>
    //     fkdfjdfj jkdfjk jksdjk
    //   </Text>
    // </View>
  )
}

export default ProfilePage