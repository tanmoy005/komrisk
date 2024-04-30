import React from 'react'
import { Text, View } from 'react-native'
import { screenWidth, styles } from '../style'

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