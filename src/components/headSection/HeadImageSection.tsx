import { screenWidth, styles } from '@/src/style'
import React from 'react'
import { Image, View } from 'react-native'


const HeadImageSection = () => {
    return (
        <View style={styles.imageContainer}>
            <Image style={{ width: 30 }} source={require('@/assets/images/Icons_Mo.png')} />
            <Image style={{ width: (screenWidth * 0.2333333333), height: (screenWidth * 0.06) }} source={require('@/assets/images/Small-logo.png')} />
        </View>
    )
}

export default HeadImageSection