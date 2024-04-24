// ====================================== Updated on 16-04-2024 ======================================= //

import { size12, size24, styles } from '@/src/style'
import React, { useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import MuiIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { DefaultDropDownItem, DropDownItem, FilterProps } from '@/src/types';
import { hasValue } from '@/src/utils';
import FilterModal from './FilterModal';
import FilterDropdown from './FilterDropdown';
import CustomeDropDown from '../CustomeDropDown';


const Filter = (
    {
        selectedTab, currentChart, setCurrentChart, reportType,
        setChartFilterPayload, chartFilterPayload, filterType, setFilterType, setChartUserFilterPayload, chartUserFilterPayload, chartDataFilterPayload, setChartDataFilterPayload
    }: FilterProps): JSX.Element => {
    const [modalVisible, setModalVisible] = useState(false);
    // const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [filterTypemModal, setFilterTypeModal] = useState(false);
    const [filterTypemModalIsOpen, setFilterTypeModalIsOpen] = useState(false);

    const filterList = [
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
        {
            lable: 'PIE',
            value: 'PIE',
            image: {
                uri: require('@/assets/images/Pie.png'),
            }
            // icon: () => <MuiIcon name="chart-pie" size={size24} color="rgba(120, 106, 205, 1)" />
        },
        {
            lable: 'BAR',
            value: 'BAR',
            image: {
                uri: require('@/assets/images/Graph.png'),
            }
            // icon: () => <MuiIcon name="chart-bar" size={size24} color="rgba(120, 106, 205, 1)" />
        },
        {
            lable: 'DONUT',
            value: 'DONUT',
            image: {
                uri: require('@/assets/images/Donut.png'),
            }
            // icon: () => <MuiIcon name="chart-donut" size={size24} color="rgba(120, 106, 205, 1)" />
        }
    ];

    let filterTypes: DropDownItem[] = [DefaultDropDownItem];

    if (reportType === 'COMPLIANCE') {
        const filterTypesData = [
            {
                lable: 'Chart Data', value: 'Chart Data',
                image: {
                    uri: ''
                }
            },
            {
                lable: 'Chart User', value: 'Chart User',
                image: {
                    uri: ''
                }
            },
            {
                lable: 'Chart Filter', value: 'Chart Filter',
                image: {
                    uri: ''
                }
            },

        ];
        filterTypes = filterTypesData;
    }
    if (reportType === 'INCIDENT') {
        const filterTypesData = [
            {
                lable: 'Chart User', value: 'Chart User',
                image: {
                    uri: ''
                }
            },
            {
                lable: 'Chart Filter', value: 'Chart Filter', image: {
                    uri: ''
                }
            }
        ];
        filterTypes = filterTypesData;
    }

    const handleOnpressFilterItem = () => {
        setFilterTypeModal(true);
    }

    return (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            <View style={styles.dashboardFilterContainer}>
                <FilterDropdown
                    filterType={filterType}
                    filterTypes={filterTypes}
                    setFilterType={setFilterType}
                    filterTypemModalIsOpen={filterTypemModalIsOpen}
                    setFilterTypeModalIsOpen={setFilterTypeModalIsOpen}
                    handleOnpressFilterItem={handleOnpressFilterItem}
                />
                <View style={styles.filterBoxContainer}>
                    <CustomeDropDown
                        selectedValue={currentChart}
                        dropdownItems={chartItems}
                        setSelectedValue={setCurrentChart}
                        minWidth={75}
                    />
                    <Text style={{ marginTop: size12 }}>Chart Type</Text>
                </View>
                {
                    filterList.map(({ iconName, Icon, handlePress }, index) => {
                        return (
                            <View key={index} style={styles.filterIconContainer}>
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
                {
                    filterTypemModal && hasValue(filterType) ?

                        <FilterModal
                            setModalVisible={setFilterTypeModal}
                            modalVisible={filterTypemModal}
                            filterType={filterType}
                            filterTypes={filterTypes}
                            setFilterType={setFilterType}
                            filterTypemModalIsOpen={filterTypemModalIsOpen}
                            setFilterTypeModalIsOpen={setFilterTypeModalIsOpen}
                            reportType={reportType}
                            selectedTab={selectedTab}
                            handleOnpressFilterItem={handleOnpressFilterItem}
                            setChartUserFilterPayload={setChartUserFilterPayload}
                            chartUserFilterPayload={chartUserFilterPayload}
                            setChartDataFilterPayload={setChartDataFilterPayload}
                            chartDataFilterPayload={chartDataFilterPayload}
                            setChartFilterPayload={setChartFilterPayload}
                            chartFilterPayload={chartFilterPayload}
                        />
                        : null
                }
            </View>
        </ScrollView>
    )
}

export default Filter