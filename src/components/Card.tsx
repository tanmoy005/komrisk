import { View } from '@/src/components/Themed'
import { styles } from '@/src/style'
import React, { PropsWithChildren } from 'react'

const Card = ({children}: PropsWithChildren):  JSX.Element => {
  return (
    <View style={styles.cardContainer}>{children}</View>
  )
}

export default Card