import { styles } from '@/src/style'
import React from 'react'
import { View } from 'react-native'
import { Divider } from 'react-native-elements'

const DefaultDivider = () => {
  return (
    <Divider style={styles.separator}></Divider>
  )
}

export default DefaultDivider