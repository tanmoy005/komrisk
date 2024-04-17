// import React, { useState, useEffect,useRef } from 'react'
// import { View } from '../components/Themed'
// import { StyleSheet } from 'react-native';
// import { Text } from 'react-native';
// import { screenWidth, styles } from '../style';
// import { Card, Divider } from 'react-native-elements';
// import CardContainer3 from '../components/cards/CardContainer3';
// import CardContainer from '../components/cards/CardContainer';
// import CardTextContainer from '../components/cards/CardTextContainer';
// import Button from '../components/Button';
// import DropDown from '../components/Dropdown';
// import CustomDatePicker from '../components/CustomDatePicker';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/rootReducer';
// import { userchartFilterProps, chartFilterProps, ComplianceView, DefaultDropDownItem, DropDownItem } from '../types';
// import { Alert, Pressable } from 'react-native';
// import GetActivityStatusUserFilterData from '../server/api-functions/get-activity-status-userfilter-data';
// import { ActivityStatusUserFilterData, ChartProp, UserFilterReportChartData, ActivityStatusUserFilterDataPayLoad } from '../types';
// import moment from 'moment';
// // interface chartFilterProps {
// //     setFilterPayload: React.Dispatch<React.SetStateAction<ActivityStatusDataPayLoad>>
// //     reportType: string
// // }


// const UserChartFilter = ({ chartFilterPayload, setChartFilterPayload, reportType, setUserFilterModalVisible }: userchartFilterProps) => {
//     const [activityStatusUserFilterChartData, setActivityStatusUserFilterChartData] = useState<ActivityStatusUserFilterData>({
//         title: null,
//         subTitle: null,
//         chartData: null
//     });



//     const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
//     const [filteredChartData, setFilteredChartData] = useState<UserFilterReportChartData[]>([]);

//     const chartuserfilterPayload: ActivityStatusUserFilterDataPayLoad = {
//         ...useCredential,
//         ...chartFilterPayload
//     }

//     const [height, setHeight] = useState('');
//     const handleLayout = (event: any) => {
//         const { height } = event.nativeEvent.layout;
//         setHeight(height);
//         console.log('height', height);

//     }



//     console.log("chartuserfilterPayload", chartuserfilterPayload)

//     const handleGetUserFilterData = async (chartuserfilterPayload: ActivityStatusUserFilterDataPayLoad) => {
//         const { data, error, status } = await GetActivityStatusUserFilterData(chartuserfilterPayload);
//         if (status === 200) {
//             const { chartData,title,subTitle } = data;
//             setActivityStatusUserFilterChartData(data);
//             const userfilteredchartData: UserFilterReportChartData[] = chartData && chartData.filter((x: UserFilterReportChartData) => x.label !== "NULL");
//             setFilteredChartData(userfilteredchartData);
//         } else {
//             Alert.alert("error", error.message);
//         }
//     };

//     useEffect(() => {
//         handleGetUserFilterData(chartuserfilterPayload);
//     }, []); // This will call the function when the component mounts

//     useEffect(() => {
//         console.log("response from api****", activityStatusUserFilterChartData);
//         console.log("chartdata response", filteredChartData);
//     }, [activityStatusUserFilterChartData, filteredChartData]);


//     return (
//         <View style={{ ...styles.dashboardContainer, width: (screenWidth * 0.75) }}>
//             <View style={styles.chartContainer}>

//                 <View style={{ ...styles.taskCard, justifyContent: 'space-between', width: '100%', height: '100%', position: 'relative' }}>
//                     <CardContainer styles={{ position: 'relative', width: '100%' }}>
//                         <CardTextContainer styles={{ position: 'relative', width: '100%' }}>
//                             <View onLayout={handleLayout} style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', position: 'absolute', top: 11, zIndex: 2, right: 0 }}>
//                                 <Text style={{ textAlign: 'left' }}>Organisation </Text>
//                                 {/* <DropDown
//                                     dropdownItems={filterCountrylist}
//                                     selectedValue={selectedCountry}
//                                     setSelectedValue={setSelectedCountry}
//                                     minWidth={150}
//                                 /> */}
//                             </View>
//                         </CardTextContainer>
//                     </CardContainer>
//                 </View>
//             </View>
//             {/* Your component content */}
//         </View>
//     );
// };

// export default UserChartFilter;



import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Alert, FlatList } from 'react-native';
import { screenWidth, styles } from '../style';
import { Card, Divider } from 'react-native-elements';
import CardContainer3 from '../components/cards/CardContainer3';
import CardContainer from '../components/cards/CardContainer';
import CardTextContainer from '../components/cards/CardTextContainer';
import Button from '../components/Button';
import CustomDatePicker from '../components/CustomDatePicker';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { userchartFilterProps, chartFilterProps, ComplianceView, DefaultDropDownItem, DropDownItem } from '../types';
import GetActivityStatusUserFilterData from '../server/api-functions/get-activity-status-userfilter-data';
import { ActivityStatusUserFilterData, ChartProp, UserFilterReportChartData, ActivityStatusUserFilterDataPayLoad } from '../types';
import UserChartFilterLevel from './userchartFilterLevelModal';
import FilterOptionCard from '../components/cards/FilterOptionCard';


const UserChartFilter = ({ chartFilterPayload, setChartFilterPayload, reportType, setUserFilterModalVisible }: userchartFilterProps) => {
    const [activityStatusUserFilterChartData, setActivityStatusUserFilterChartData] = useState<ActivityStatusUserFilterData>({
        title: null,
        subTitle: null,
        chartData: null
    });

    const [selectedFilterLevel, setSelectedFilterLevel] = useState<number | null>(null); // State to hold the selected filter level


    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const [filteredChartData, setFilteredChartData] = useState<UserFilterReportChartData[]>([]);

    const chartuserfilterPayload: ActivityStatusUserFilterDataPayLoad = {
        ...useCredential,
        ...chartFilterPayload
    };

    const handleGetUserFilterData = async (chartuserfilterPayload: ActivityStatusUserFilterDataPayLoad) => {
        const { data, error, status } = await GetActivityStatusUserFilterData(chartuserfilterPayload);
        if (status === 200) {
            const { chartData, title, subTitle } = data;
            setActivityStatusUserFilterChartData(data);
            const userfilteredchartData: UserFilterReportChartData[] = chartData && chartData.filter((x: UserFilterReportChartData) => x.label !== "NULL");
            setFilteredChartData(userfilteredchartData);
        } else {
            Alert.alert("error", error.message);
        }
    };

    useEffect(() => {
        handleGetUserFilterData(chartuserfilterPayload);
    }, []); // This will call the function when the component mounts

    useEffect(() => {
        console.log("response from api****", activityStatusUserFilterChartData);
        console.log("chartdata response", filteredChartData);
    }, [activityStatusUserFilterChartData, filteredChartData]);

    const handleItemPress = (filterLevel: number) => {
        console.log("filterLevel", filterLevel);
        setSelectedFilterLevel(filterLevel); // Set the selected filter level in state
    };


    const renderItem = ({ item }: { item: UserFilterReportChartData }) => (
        <FilterOptionCard value={item.value}
            label={item.label} />
    );
    const gap = 5
    return (
        <View style={{ ...styles.dashboardContainer, width: (screenWidth * 0.75) }}>
            <View style={styles.chartContainer}>
                {/* <View style={{ ...styles.taskCard, justifyContent: 'space-between', width: '100%', height: '100%', position: 'relative' }}>
                    <CardContainer styles={{ position: 'relative', width: '100%' }}> */}
                {/* <CardTextContainer styles={{ position: 'relative', width: '100%' }}> */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', position: 'absolute', top: 11, zIndex: 2, right: 0 }}>
                    <FlatList
                        data={filteredChartData}
                        ItemSeparatorComponent={
                            (() => (
                                <View
                                    style={{ marginVertical: 6 }}
                                />
                            ))
                        }
                        renderItem={renderItem}
                        keyExtractor={item => item.label}
                    />

                </View>
                {/* </CardTextContainer> */}
                {/* </CardContainer>
                </View> */}
            </View>
            {selectedFilterLevel !== null && <UserChartFilterLevel filterLevel={selectedFilterLevel} chartuserfilterPayload={chartuserfilterPayload} />}
        </View>
    );
};

export default UserChartFilter;
