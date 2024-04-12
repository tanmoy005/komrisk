import React from 'react'
import { View } from '../components/Themed'
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { styles } from '../style';
import { Card } from 'react-native-elements';
import CardContainer3 from '../components/cards/CardContainer3';
import CardContainer from '../components/cards/CardContainer';
import CardTextContainer from '../components/cards/CardTextContainer';
import Button from '../components/Button';


export default function ModalScreen() {
    const handleApplyFilters = () => {

    }
    return (
        <View style={styles.dashboardContainer}>


            <View style={styles.chartContainer}>

                <View style={{ ...styles.taskCard, justifyContent: 'space-between', width: '100%' }}>
                    <CardContainer>
                        <CardTextContainer>
                            <View>
                                <Text style={{ textAlign: 'left' }}>Country </Text>
                                <Text style={{ textAlign: 'left' }}>fsdf </Text>
                            </View>
                        </CardTextContainer>
                    </CardContainer>
                    <View style={styles.submitBtnContainer}>
                        <Button
                            btnColor={'#A097DC'}
                            text='APPLY FILTERS'
                            style={{
                                paddingVertical: 20,
                                paddingHorizontal: 48,
                                fontWeight: '400',
                                fontSize: 16,
                                borderRadius: 5
                            }}
                            onPress={handleApplyFilters}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         padding: 60
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
//     separator: {
//         marginVertical: 5,
//         height: 1,
//         width: '45%',
//         backgroundColor: "#26262C3D"
//     },
//     profileImageContainer: {
//         width: '100%',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     userTitle: {
//         fontSize: 16,
//         fontWeight: '700',
//         marginTop: 5
//     },
//     designation: {
//         fontSize: 12,
//         fontWeight: '400',
//         lineHeight: 14,
//         color: '#26262C'
//     }
// });
