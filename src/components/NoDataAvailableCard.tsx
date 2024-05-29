import { screenWidth, styles } from '@/src/style'
import React from 'react'
import { Text, View } from 'react-native'

const NoDataAvailableCard = () => {
    return (
        <View style={styles.taskCard}>
            <View style={{ width: screenWidth * 0.86, height: 200, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.title1}>{"No Data Available"}</Text>
            </View>
        </View>
    )
}

export default NoDataAvailableCard