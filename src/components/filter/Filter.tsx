import { size12, size24, styles } from '@/src/style'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import MuiIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import DropDown from '../Dropdown';
import { FilterProps } from '@/src/types';
import { router } from 'expo-router';


const Filter = ({ currentChart, setCurrentChart }: FilterProps): JSX.Element => {
    const filterList = [
        {
            iconName: 'filter',
            Icon: MuiIcon,
            handlePress: () => { router.push('/filterModal') }
        },
        {
            iconName: 'share',
            Icon: MuiIcon,
            handlePress: () => { }
        },
        {
            iconName: 'download',
            Icon: AntDesignIcon,
            handlePress: () => { }
        },
    ];

    const chartItems = [
        { label: 'PIE', value: 'PIE', icon: () => <MuiIcon name="chart-pie" size={size24} color="rgba(120, 106, 205, 1)" /> },
        { label: 'BAR', value: 'BAR', icon: () => <MuiIcon name="chart-bar" size={size24} color="rgba(120, 106, 205, 1)" /> },
        { label: 'DONUT', value: 'DONUT', icon: () => <MuiIcon name="chart-donut" size={size24} color="rgba(120, 106, 205, 1)" /> }
    ];
    console.log('currentChart', currentChart);

    return (
        <View style={styles.dashboardFilterContainer}>

            {
                filterList.map(({ iconName, Icon, handlePress }) => {
                    return (
                        <View style={styles.filterIconContainer}>
                            <Pressable onPress={handlePress}> 
                                <View style={styles.filterIconBoxContainer}>
                                    <Icon name={iconName}
                                        size={size24}
                                        style={styles.filterIcon}
                                    />
                                </View>
                            </Pressable>
                            <Text
                                style={{ marginTop: size12 }}
                            >
                                {iconName.charAt(0).toUpperCase() + iconName.slice(1).toLowerCase()}
                            </Text>
                        </View>
                    )
                })
            }
            <View style={styles.chartSelctorContainer}>
                <DropDown
                    selectedValue={currentChart}
                    dropdownItems={chartItems}
                    setSelectedValue={setCurrentChart}
                />
                <Text style={{ marginTop: size12 }}>Chart Type</Text>
            </View>
        </View>
    )
}

export default Filter