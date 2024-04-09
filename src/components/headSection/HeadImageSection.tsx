import { styles } from '@/src/style'
import React from 'react'
import { View, Image } from 'react-native'


const HeadImageSection = () => {
    return (
        <View style={styles.imageContainer}>
            <Image style={{ width: 30 }} source={require('@/assets/images/Icons_Mo.png')} />
            <Image style={{ width: 100 }} source={require('@/assets/images/Komrisk-Logo-small.png')} />
        </View>
    )
}

export default HeadImageSection