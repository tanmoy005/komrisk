import React, { useState } from 'react'
import { View } from '../components/Themed'
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { screenWidth, styles } from '../style';
import { Card, Divider } from 'react-native-elements';
import CardContainer3 from '../components/cards/CardContainer3';
import CardContainer from '../components/cards/CardContainer';
import CardTextContainer from '../components/cards/CardTextContainer';
import Button from '../components/Button';
import DropDown from '../components/Dropdown';
import CustomeDatePicker from '../components/CustomeDatePicker';


export default function ModalScreen() {
    const handleApplyFilters = () => {

    }
    const countryList = [
        { label: 'United Kingdom', value: 'United Kingdom', },
        { label: 'Antigua and Barbuda', value: 'Antigua and Barbuda', },
        { label: 'Saint Vincent and the Grenadines', value: 'Saint Vincent and the Grenadines', }
    ];
    const viewAsList = [
        { label: 'United Kingdom', value: 'United Kingdom', },
        { label: 'Antigua and Barbuda', value: 'Antigua and Barbuda', },
        { label: 'Saint Vincent and the Grenadines', value: 'Saint Vincent and the Grenadines', }
    ];

    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedViewAs, setSelectedViewAs] = useState<string>('');
    const [height, setHeight] = useState('');
    const handleLayout = (event: any) => {
        const { height } = event.nativeEvent.layout;
        setHeight(height);
        console.log('height', height);

    }
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    return (
        <View style={styles.dashboardContainer}>


            <View style={styles.chartContainer}>

                <View style={{ ...styles.taskCard, justifyContent: 'space-between', width: '100%', height: '100%', position: 'relative' }}>
                    <CardContainer styles={{ position: 'relative', width: '100%' }}>
                        <CardTextContainer styles={{ position: 'relative', width: '100%' }}>
                            <View onLayout={handleLayout} style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', position: 'absolute', top: 11, zIndex: 2, right: 0 }}>
                                <Text style={{ textAlign: 'left' }}>Country </Text>
                                <DropDown
                                    dropdownItems={countryList}
                                    selectedValue={selectedCountry}
                                    setSelectedValue={setSelectedCountry}
                                    minWidth={150}
                                />
                            </View>
                            {/* <Divider style={{ ...styles.divider1, position:'absolute', top: height+ 22, width:'100%' }} /> */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', position: 'absolute', top: 71, zIndex: 1, right: 0 }}>
                                <Text style={{ textAlign: 'left' }}>View as </Text>
                                <DropDown
                                    dropdownItems={viewAsList}
                                    selectedValue={selectedViewAs}
                                    setSelectedValue={setSelectedViewAs}
                                    minWidth={150}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', position: 'absolute', top: 141, zIndex: 1, right: 0 }}>
                                <Text style={{ textAlign: 'left' }}>Start Date </Text>
                                <CustomeDatePicker
                                    setDate={setStartDate}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', position: 'absolute', top: 191, zIndex: 1, right: 0 }}>
                                <Text style={{ textAlign: 'left' }}>End Date </Text>
                                <CustomeDatePicker
                                    setDate={setEndDate}
                                />
                            </View>
                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ textAlign: 'left' }}>Country </Text>
                                <DropDown
                                    dropdownItems={countryList}
                                    selectedValue={selectedCountry}
                                    setSelectedValue={setSelectedCountry}
                                />
                            </View> */}
                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ textAlign: 'left' }}>Country </Text>
                                <Text style={{ textAlign: 'left' }}>fsdf </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ textAlign: 'left' }}>Country </Text>
                                <Text style={{ textAlign: 'left' }}>fsdf </Text>
                            </View> */}
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
