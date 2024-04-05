import React from 'react'
import { styles } from '@/src/style';
import { View } from 'react-native';
import { CustomComponentProp } from '@/src/types';


const CardContainer = ({ children, styles: customStyle }: CustomComponentProp): JSX.Element => {
    return (
        <View
            style={{...styles.taskCardContainer, ...customStyle}}
        >
            {children}
        </View>
    )
}

export default CardContainer