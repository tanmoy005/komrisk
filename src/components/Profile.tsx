import { RootState } from '@/src/store'
import React, { useState } from 'react'
import { View } from 'react-native'
import { Divider } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { screenWidth, styles } from '@/src/style'
import Initials from '@/src/components/Initials'
import CardTextContainer from '@/src/components/cards/CardTextContainer'
import Text1 from '@/src/components/headings/Label1'
import InputField from '@/src/components/input-fields/InputField'

interface FormLabelProps {
  label: string;
}

const FormLabel = ({ label }: FormLabelProps) => {
  return (
    <View style={styles.inputType1}>
      <Text1>{label}</Text1>
    </View>
  )
}

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
      <Initials size={60} fontSize={30} />
      </View>
      <Divider style={{ ...styles.divider1, marginTop: Math.floor(screenWidth * 0.066) }} />
      <View style={{ marginTop: Math.floor(screenWidth * 0.066), height: 'auto', alignItems: 'stretch' }}>
        <CardTextContainer styles={{width: '100%', position: 'relative'}}>
          <View style={{ flexDirection: 'row', width: '90%' }}>
            <View style={{ rowGap: 10 }}>
              <FormLabel label={'First Name'} />
              <FormLabel label={'Last Name'} />
              <FormLabel label={'Role'} />
              <FormLabel label={'Username'} />
              <FormLabel label={'Company'} />
              <FormLabel label={'Operating Unit'} />
              <FormLabel label={'Department'} />
              <FormLabel label={'Phone'} />
            </View>
            <View style={{ ...styles.profileInputFieldContainer, rowGap: 10 }}>
              <InputField value={firstName} setInput={setFirstName} placeholder={'first name here'} type='1' editable={false} />
              <InputField value={lastName} setInput={setLastName} placeholder={'last Name here'} type='1' editable={false} />
              <InputField value={roleName} setInput={setRoleName} placeholder={'role here'} type='1' editable={false} />
              <InputField value={username} setInput={setUsername} placeholder={'username here'} type='1' editable={false} />
              <InputField value={company} setInput={setCompany} placeholder={'company name here'} type='1' editable={false} />
              <InputField value={operatingUnit} setInput={setOperatingUnit} placeholder={'operating unit name here'} type='1' editable={false} />
              <InputField value={department} setInput={setDepartment} placeholder={'dept. name here'} type='1' editable={false} />
              <InputField value={phone} setInput={setPhone} placeholder={'phone number here'} type='1' editable={false} />
            </View>
          </View>
        </CardTextContainer>
      </View>
    </View>
  )
}

export default Profile