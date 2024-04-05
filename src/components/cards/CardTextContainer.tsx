import { styles } from '@/src/style'
import React, { PropsWithChildren } from 'react'
import { View } from 'react-native'


const CardTextContainer = ({ children }: PropsWithChildren): JSX.Element => {
    return (
        <View
            style={styles.cardTextContainer}
        >
            {children}
        </View>
    )
}

export default CardTextContainer