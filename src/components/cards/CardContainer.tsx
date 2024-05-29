import { styles } from '@/src/style';
import { CustomComponentProp } from '@/src/types';
import React from 'react';
import { View } from 'react-native';


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