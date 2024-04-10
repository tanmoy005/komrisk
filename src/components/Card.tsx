import React, { PropsWithChildren } from 'react'
import { View } from './Themed'
import { styles } from '../style'

const Card = ({children}: PropsWithChildren):  JSX.Element => {
  return (
    <View style={styles.cardContainer}>{children}</View>
  )
}

export default Card