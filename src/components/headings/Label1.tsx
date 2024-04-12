import { styles } from '@/src/style'
import { CustomComponentProp } from '@/src/types'
import React from 'react'
import { Text } from 'react-native'

const Text1 = ({children}:CustomComponentProp): JSX.Element => {
  return (
    <Text style={styles.text1}>{children}</Text>
  )
}

export default Text1