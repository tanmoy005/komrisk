
// import React, { useState, useEffect } from 'react';
// import { View, Text, Pressable, Alert, FlatList } from 'react-native';
// import { screenWidth, styles } from '../style';
// import { Card, Divider } from 'react-native-elements';
// import CardContainer3 from '../components/cards/CardContainer3';
// import CardContainer from '../components/cards/CardContainer';
// import CardTextContainer from '../components/cards/CardTextContainer';
// import Button from '../components/Button';
// import CustomDatePicker from '../components/CustomDatePicker';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/rootReducer';
// import { userchartFilterProps, chartFilterProps, ComplianceView, DefaultDropDownItem, DropDownItem } from '../types';
// import GetActivityStatusUserFilterData from '../server/api-functions/get-activity-status-userfilter-data';
// import { ActivityStatusUserFilterData, ChartProp, UserFilterReportChartData, ActivityStatusUserFilterDataPayLoad } from '../types';
// import UserChartFilterLevel from './userchartFilterLevelModal';


// const UserChartFilter = ({ chartFilterPayload, setChartFilterPayload, reportType, setUserFilterModalVisible }: userchartFilterProps) => {
//     const [activityStatusUserFilterChartData, setActivityStatusUserFilterChartData] = useState<ActivityStatusUserFilterData>({
//         title: null,
//         subTitle: null,
//         chartData: null
//     });

//     const [selectedFilterLevel, setSelectedFilterLevel] = useState<number | null>(null); // State to hold the selected filter level


//     const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
//     const [filteredChartData, setFilteredChartData] = useState<UserFilterReportChartData[]>([]);

//     const chartuserfilterPayload: ActivityStatusUserFilterDataPayLoad = {
//         ...useCredential,
//         ...chartFilterPayload
//     };

//     const handleGetUserFilterData = async (chartuserfilterPayload: ActivityStatusUserFilterDataPayLoad) => {
//         const { data, error, status } = await GetActivityStatusUserFilterData(chartuserfilterPayload);
//         if (status === 200) {
//             const { chartData, title, subTitle } = data;
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

//     const handleItemPress = (filterLevel: number) => {
//         console.log("filterLevel", filterLevel);
//         setSelectedFilterLevel(filterLevel); // Set the selected filter level in state
//     };


//     const renderItem = ({ item }: { item: UserFilterReportChartData }) => (
//         <Pressable onPress={() => handleItemPress(item.filterLevel)}>
//             <Text style={{ fontSize: 22, marginBottom: 10 }}>{item.displayValue}</Text>
//         </Pressable>

//     );

//     return (
//         <View style={{ ...styles.dashboardContainer, width: (screenWidth * 0.75) }}>
//             <View style={styles.chartContainer}>
//                 <View style={{ ...styles.taskCard, justifyContent: 'space-between', width: '100%', height: '100%', position: 'relative' }}>
//                     <CardContainer styles={{ position: 'relative', width: '100%' }}>
//                         <CardTextContainer styles={{ position: 'relative', width: '100%' }}>
//                             <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', position: 'absolute', top: 11, zIndex: 2, right: 0 }}>
//                                 <FlatList
//                                     data={filteredChartData}
//                                     renderItem={renderItem}
//                                     keyExtractor={item => item.displayValue}
//                                 />
//                             </View>
//                         </CardTextContainer>
//                     </CardContainer>
//                 </View>
//             </View>
//             {selectedFilterLevel  && <UserChartFilterLevel filterLevel={selectedFilterLevel} chartuserfilterPayload={chartuserfilterPayload}/>}

//         </View>
//     );
// };

// export default UserChartFilter;


// ================================= Updated on 17-04-2024 ======================================= //

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
import GetComplianceUserFilterData from '../server/api-functions/get-userfilter-compliance-data';
import GetIncidentUserFilterData from '../server/api-functions/get-userfilter-incident-data';
import { ComplianceUserFilterData,IncidentUserFilterData, ChartProp, UserFilterReportChartData, UserFilterDataPayLoad } from '../types';
import UserChartFilterLevel from './userchartFilterLevelModal';
import FilterOptionCard from '../components/cards/FilterOptionCard';


const UserChartFilter = ({ selectedTab,chartFilterPayload, setChartFilterPayload, reportType, setUserFilterModalVisible,setUserFilterLevelModalVisible }: userchartFilterProps) => {
    const [complianceUserFilterChartData, setComplianceUserFilterChartData] = useState<ComplianceUserFilterData>({
        title: null,
        subTitle: null,
        chartData: null
    });

    const [incidentUserFilterChartData, setIncidentUserFilterChartData] = useState<IncidentUserFilterData>({
        title: null,
        subTitle: null,
        xAxisName:  null,
        yAxisName: null,
        chartData: null
    });

    const [selectedFilterLevel, setSelectedFilterLevel] = useState<number | null>(null); // State to hold the selected filter level


    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const [filteredChartData, setFilteredChartData] = useState<UserFilterReportChartData[]>([]);

    const chartuserfilterPayload: UserFilterDataPayLoad = {
        ...useCredential,
        ...chartFilterPayload
    };

    console.log("Report Type", reportType)

    const handleGetUserFilterData = async (chartuserfilterPayload: UserFilterDataPayLoad) => {
        let apiFunction;
        let setDataFunction;
        if (reportType === 'COMPLIANCE') {
            apiFunction = GetComplianceUserFilterData;
            setDataFunction = setComplianceUserFilterChartData;
        } else if (reportType === 'INCIDENT') {
            apiFunction = GetIncidentUserFilterData;
            setDataFunction = setIncidentUserFilterChartData;
        } else {
            // Handle other report types or set a default API function
            return;
        }
    
        const { data, error, status } = await apiFunction(chartuserfilterPayload);
        if (status === 200) {
            const { chartData, title, subTitle } = data;
            setDataFunction(data);
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
        let chartDataToLog;
        if (reportType === 'COMPLIANCE') {
            chartDataToLog = complianceUserFilterChartData;
        } else if (reportType === 'INCIDENT') {
            chartDataToLog = incidentUserFilterChartData;
        }
        
        console.log("response from api****", chartDataToLog);
        console.log("chartdata response", filteredChartData);
    }, [complianceUserFilterChartData, incidentUserFilterChartData, filteredChartData]);
    

    const handleItemPress = (filterLevel: number) => {
        console.log("filterLevel", filterLevel);
        setSelectedFilterLevel(filterLevel); // Set the selected filter level in state
        // setUserFilterModalVisible(false)
        // setUserFilterLevelModalVisible(true)
        
    };


    console.log("selectedFilterLevel",selectedFilterLevel)


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
            {/* {selectedFilterLevel  && 
            <UserChartFilterLevel 
                filterLevel={selectedFilterLevel} 
                chartuserfilterPayload={chartuserfilterPayload}  
                reportType={reportType} 
                selectedTab={selectedTab}
                setUserFilterModalVisible={setUserFilterModalVisible}
                setUserFilterLevelModalVisible={setUserFilterLevelModalVisible}
                
                />} */}
        </View>
    );
};

export default UserChartFilter;
