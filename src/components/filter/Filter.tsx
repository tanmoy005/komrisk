// ====================================== Updated on 16-04-2024 ======================================= //

import { size12, size24, styles } from '@/src/style'
import React, { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import MuiIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import DropDown from '../Dropdown';
import { ChartFilterDataPayLoad, FilterProps } from '@/src/types';
import { router } from 'expo-router';
import CustomModal from '../CustomModal';
import FilterScreen from '@/src/app/filterScreen';
import ChartFilter from '@/src/app/chartFilterModal';
import UserChartFilter from '@/src/app/userchartFilterModal';
import { hasValue } from '@/src/utils';
import ChartUserFilter from './ChartUserFilter';
import FilterTypeModal from '@/src/app/filterTypeModal';
import FilterModal from './FilterModal';
import FilterDropdown from './FilterDropdown';


const Filter = (
    {
        selectedTab, currentChart, setCurrentChart, reportType,
        setChartFilterPayload, chartFilterPayload, filterType, setFilterType
    }: FilterProps): JSX.Element => {
    const [modalVisible, setModalVisible] = useState(false);
    // const [filterModalVisible, setFilterModalVisible] = useState(false);
    // const [userfilterModalVisible, setUserFilterModalVisible] = useState(false);
    // const [userfilterlevelModalVisible, setUserFilterLevelModalVisible] = useState(false);
    const [filterTypemModal, setFilterTypeModal] = useState(false);
    const [filterTypemModalIsOpen, setFilterTypeModalIsOpen] = useState(false);

    console.log("3", chartFilterPayload);
    const filterList = [
        {
            iconName: 'filter',
            Icon: MuiIcon,
            handlePress: () => { setModalVisible(true); }
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
    const filterTypes = [
        { label: 'Chart Data', value: 'Chart Data', icon: () => <MuiIcon name="filter" size={size24} color="rgba(160, 151, 220, 1)" /> },
        { label: 'Chart User', value: 'Chart User', icon: () => <MuiIcon name="filter" size={size24} color="rgba(160, 151, 220, 1)" /> },
        { label: 'Chart Filter', value: 'Chart Filter', icon: () => <MuiIcon name="filter" size={size24} color="rgba(160, 151, 220, 1)" /> }
    ];


    // useEffect(() => {
    //     console.log('filterType', filterType);

    //     if (hasValue(filterType) && !filterTypemModal && filterTypemModalIsOpen) {
    //         setFilterTypeModal(true);
    //     }
    // }, [filterType])
    const handleOnpressFilterItem = () => {
        setFilterTypeModal(true);
    }

    return (
        <View style={styles.dashboardFilterContainer}>
            <FilterDropdown
                filterType={filterType}
                filterTypes={filterTypes}
                setFilterType={setFilterType}
                filterTypemModalIsOpen={filterTypemModalIsOpen}
                setFilterTypeModalIsOpen={setFilterTypeModalIsOpen}
                handleOnpressFilterItem={handleOnpressFilterItem}
            />
            {/* <View style={styles.filterBoxContainer}>
                <DropDown
                    selectedValue={currentChart}
                    dropdownItems={chartItems}
                    setSelectedValue={setCurrentChart}
                    minWidth={175}
                />
                <Text style={{ marginTop: size12 }}>Chart Type</Text>
            </View> */}
            {
                filterList.map(({ iconName, Icon, handlePress }, index) => {
                    return (
                        <View key={iconName} style={styles.filterIconContainer}>
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
            {/* { setFilterPayload,reportType }: chartFilterProps */}
            {/* {
                modalVisible &&
                <FilterModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    component={
                        <FilterScreen
                            setModalVisible={setModalVisible}
                            setFilterModalVisible={setFilterModalVisible}
                            setUserFilterModalVisible={setUserFilterModalVisible}

                        />}
                />
            } */}
            {/* {
                filterModalVisible &&
                <CustomModal
                    setModalVisible={setFilterModalVisible}
                    modalVisible={filterModalVisible}
                    component={
                        <ChartFilter
                            setModalVisible={setFilterModalVisible}
                            setFilterModalVisible={setFilterModalVisible}
                            setChartFilterPayload={setChartFilterPayload}
                            chartFilterPayload={chartFilterPayload}
                            reportType={reportType}
                           
                        />
                    }
                />
            } */}
            {/* {
                userfilterModalVisible &&
                <CustomModal
                    setModalVisible={setUserFilterModalVisible}
                    modalVisible={userfilterModalVisible}
                    component={
                        <UserChartFilter
                            setModalVisible={setUserFilterModalVisible}
                            setUserFilterModalVisible={setUserFilterModalVisible}
                            setUserFilterLevelModalVisible={setUserFilterLevelModalVisible}
                        setChartFilterPayload={setChartFilterPayload}
                            chartFilterPayload={chartFilterPayload}
                            reportType={reportType}
                            selectedTab={selectedTab}
                    />
                    }
                />
            } */}
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
                        chartFilterPayload={chartFilterPayload}
                        reportType={reportType}
                        selectedTab={selectedTab}
                        setChartFilterPayload={setChartFilterPayload}
                    />
                    : null
            }
            {/* {
                filterTypemModal &&
                <CustomModal
                    setModalVisible={setFilterTypeModal}
                    modalVisible={filterTypemModal}
                    component={
                        <FilterTypeModal
                            filterType={filterType}
                            filterTypes={filterTypes}
                            setFilterType={setFilterType}
                            filterTypemModalIsOpen={filterTypemModalIsOpen}
                            setFilterTypeModalIsOpen={setFilterTypeModalIsOpen}
                        />
                    }
                />
            } */}
        </View>
    )
}

export default Filter