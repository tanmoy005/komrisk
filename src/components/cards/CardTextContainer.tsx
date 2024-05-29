import { styles } from '@/src/style'
import { CustomComponentProp } from '@/src/types'
import React from 'react'
import { View } from 'react-native'


const CardTextContainer = ({ children, styles: customStyle }: CustomComponentProp): JSX.Element => {
    return (
        <View
            style={{...styles.cardTextContainer, ...customStyle}}
        >
            {children}
        </View>
    )
}

export default CardTextContainer