import { styles } from '@/src/style'
import { CustomComponentProp } from '@/src/types'
import React from 'react'
import { Text } from 'react-native'

export const SmallHeading = ({children}: CustomComponentProp):  JSX.Element=> {
  return (
    <Text style={styles.accordTitle}>{children}</Text>
  )
}
