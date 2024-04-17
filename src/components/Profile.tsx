import React, { useState } from 'react'
import { View } from 'react-native'
import { screenWidth, styles } from '../style'
import { Divider, Image } from 'react-native-elements'
import CardTextContainer from './cards/CardTextContainer'
import Text1 from './headings/Label1'
import InputField from './input-fields/InputField'
import Button from './Button'
import { useSelector } from 'react-redux'
import { RootState } from '../store/rootReducer'

const Profile = () => {
  const { userDetails, countryEnabled } = useSelector((state: RootState) => state.authUserDetails.payload);
  const [firstName, setFirstName] = useState<string>(userDetails?.firstName ?? "");
  const [lastName, setLastName] = useState<string>(userDetails?.lastName ?? "");
  const [username, setUsername] = useState<string>(userDetails?.username ?? "");
  const [roleName, setRoleName] = useState<string>(userDetails?.role ?? "");
  const [phone, setPhone] = useState<string>(userDetails?.phone ?? "");
  const [department, setDepartment] = useState<string>(userDetails?.department ?? "");
  const [operatingUnit, setOperatingUnit] = useState<string>(userDetails?.operatingUnit ?? "");
  const [company, setCompany] = useState<string>(userDetails?.company ?? "");

  return (
    <View>
      <View style={styles.profileImageContainer}>
        <Image style={styles.profileImage} source={require('@/assets/images/User.png')} />
      </View>
      <Divider style={{ ...styles.divider1, marginTop: Math.floor(screenWidth * 0.066) }} />
      <View style={{ marginTop: Math.floor(screenWidth * 0.066), height: 'auto', alignItems: 'stretch' }}>
        <CardTextContainer>
          <View style={styles.profileFormContainer}>
            <View style={styles.profileInputFiledRowContainer}>
              <Text1>First Name</Text1>
              <View style={styles.profileInputFieldContainer}>
                <InputField value={firstName} setInput={setFirstName} placeholder={'first name here'} type='1' editable={false} />
              </View>
            </View>
            <View style={styles.profileInputFiledRowContainer}>
              <Text1>Last Name</Text1>
              <View style={styles.profileInputFieldContainer}>
                <InputField value={lastName} setInput={setFirstName} placeholder={'last Name here'} type='1' editable={false} />
              </View>
            </View>
            <View style={styles.profileInputFiledRowContainer}>
              <Text1>Role</Text1>
              <View style={styles.profileInputFieldContainer}>
                <InputField value={roleName} setInput={setRoleName} placeholder={'role here'} type='1' editable={false} />
              </View>
            </View>
            <View style={styles.profileInputFiledRowContainer}>
              <Text1>Username</Text1>
              <View style={styles.profileInputFieldContainer}>
                <InputField value={username} setInput={setUsername} placeholder={'username here'} type='1' editable={false} />
              </View>
            </View>
            <View style={styles.profileInputFiledRowContainer}>
              <Text1>Company</Text1>
              <View style={styles.profileInputFieldContainer}>
                <InputField value={company} setInput={setCompany} placeholder={'company name here'} type='1' editable={false} />
              </View>
            </View>
            <View style={styles.profileInputFiledRowContainer}>
              <Text1>Operating Unit</Text1>
              <View style={styles.profileInputFieldContainer}>
                <InputField value={operatingUnit} setInput={setOperatingUnit} placeholder={'operating unit name here'} type='1' editable={false} />
              </View>
            </View>
            <View style={styles.profileInputFiledRowContainer}>
              <Text1>Department</Text1>
              <View style={styles.profileInputFieldContainer}>
                <InputField value={department} setInput={setDepartment} placeholder={'dept. name here'} type='1' editable={false} />
              </View>
            </View>
            <View style={styles.profileInputFiledRowContainer}>
              <Text1>Phone</Text1>
              <View style={styles.profileInputFieldContainer}>
                <InputField value={phone} setInput={setPhone} placeholder={'phone number here'} type='1' editable={false} />
              </View>
            </View>
          </View>
        </CardTextContainer>
      </View>
    </View>
  )
}

export default Profile