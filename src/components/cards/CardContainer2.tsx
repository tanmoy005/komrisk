import React from 'react'
import { styles } from '@/src/style';
import { View } from 'react-native';
import { CustomComponentProp } from '@/src/types';


const CardContainer2 = ({ children, styles: customStyle }: CustomComponentProp): JSX.Element => {
    return (
        <View
            style={{...styles.cardContainer2, ...customStyle}}
        >
            {children}
        </View>
    )
}

export default CardContainer2