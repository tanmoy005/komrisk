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
// import { userchartFilterLevelProps, chartFilterProps, ComplianceView, DefaultDropDownItem, DropDownItem } from '../types';
// import GetActivityStatusUserFilterLevelData from '../server/api-functions/get-activity-status-userfilter-filterlevel-data';
// import GetComplianceStatusUserFilterLevelData from '../server/api-functions/get-compliance-status-userfilter-filterlevel-data';
// import GetImpactAnalysisUserFilterLevelData from '../server/api-functions/get-impact-analysis-userfilter-filterlevel-data';
// import GetIncidentActivityUserFilterLevelData from '../server/api-functions/get-incident-activity-userfilter-filterlevel-data';
// import GetIncidentComparisonUserFilterLevelData from '../server/api-functions/get-incident-comparison-userfilter-filterlevel-data';

// import { ActivityStatusUserFilterLevelData,
//     ComplianceStatusUserFilterLevelData, 
//     ImpactAnalysisUserFilterLevelData,
//     IncidentActivityUserFilterLevelData,
//     IncidentComparisonUserFilterLevelData,
//     ChartProp, 
//     UserFilterReportChartData, 
//     UserFilterLevelDataPayLoad } 
// from '../types';
// import { CryptoDigestAlgorithm } from 'expo-crypto';

// const UserChartFilterLevel = ({ selectedTab,filterLevel,chartuserfilterPayload, reportType,setChartFilterPayload}: userchartFilterLevelProps) => {
//     const [activityStatusUserFilterLevelChartData, setActivityStatusUserFilterLevelChartData] = useState<ActivityStatusUserFilterLevelData>({
//         title: null,
//         subTitle: null,
//         xAxisName: null ,
//         yAxisName: null,
//         chartData: null
//     });


//     const [complianceStatusUserFilterLevelChartData, setComplianceStatusUserFilterLevelChartData] = useState<ComplianceStatusUserFilterLevelData>({
//         title: null,
//         xAxisName: null ,
//         yAxisName: null,
//         chartData: null
//     });


//     console.log("filterLevel got ",filterLevel)


//     const [impactAnalysisUserFilterLevelChartData, setImpactAnalysisUserFilterLevelChartData] = useState<ImpactAnalysisUserFilterLevelData>({
//         title: null,
//         subTitle: null,
//         xAxisName: null ,
//         yAxisName: null,
//         chartData: null
//     });

//     const [incidentActivityUserFilterLevelChartData, setIncidentActivityUserFilterLevelChartData] = useState<IncidentActivityUserFilterLevelData>({
//         title: null,
//         subTitle: null,
//         xAxisName: null ,
//         yAxisName: null,
//         chartData: null
//     });


//     const [incidentComparisonUserFilterLevelChartData, setIncidentComparisonUserFilterLevelChartData] = useState<IncidentComparisonUserFilterLevelData>({
//         title: null,
//         subTitle: null,
//         xAxisName: null ,
//         yAxisName: null,
//         chartData: null
//     });


//     const chartuserfilterlevelPayload: UserFilterLevelDataPayLoad = {
//         ...chartuserfilterPayload,
//         filterLevel: filterLevel.toString()
//     };

//     console.log("selected tab",selectedTab)
//     console.log("Report type******",reportType);

//     console.log("giving payload",chartuserfilterlevelPayload);
    
//     //console.log("filterLevel after",typeof(filterLevel))

//     const [isUserFilterModalVisible, setUserFilterModalVisible] = useState(false);
//     const [isUserChartFilterLevelModalVisible, setUserFilterLevelModalVisible] = useState(true);


//     const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
//     const [filteredLevelChartData, setFilteredLevelChartData] = useState<UserFilterReportChartData[]>([]);

//     const [selectedUserFilterType, setSelectedUserFilterType] = useState<any | null>(null); // State to hold the selected filter level
//     const [selectedtab, setSelectedTab] = useState<any | null>(null); // State to hold the selected filter level


//     const handleGetUserFilterLevelData = async (chartuserfilterlevelPayload: UserFilterLevelDataPayLoad) => {
//         let apiFunction;
//         let setLevelDataFunction;
//         if (reportType === "COMPLIANCE" && selectedTab === "activity_status") {
//             console.log("yesss")
//             apiFunction = GetActivityStatusUserFilterLevelData;
//             setLevelDataFunction = setActivityStatusUserFilterLevelChartData;
//         } 
//         else if (reportType === "COMPLIANCE" && selectedTab === "compliance_status") {
//             apiFunction = GetComplianceStatusUserFilterLevelData;
//             setLevelDataFunction = setComplianceStatusUserFilterLevelChartData;
//         }
//         else if (reportType === "COMPLIANCE" && selectedTab === "impact_analysis") {
//             apiFunction = GetImpactAnalysisUserFilterLevelData;
//             setLevelDataFunction = setImpactAnalysisUserFilterLevelChartData;
//         }
//         else if (reportType === "INCIDENT" && selectedTab === "incident_activity") {
//             apiFunction = GetIncidentActivityUserFilterLevelData;
//             setLevelDataFunction = setIncidentActivityUserFilterLevelChartData;
//         }
//         else if (reportType === "INCIDENT" && selectedTab === "incident_comparison") {
//             apiFunction = GetIncidentComparisonUserFilterLevelData;
//             setLevelDataFunction = setIncidentComparisonUserFilterLevelChartData;
//         }
//         else {
//             // Handle other report types and selected tabs as needed
//             return;
//         }
    
//         const { data, error, status } = await apiFunction(chartuserfilterlevelPayload);
//         if (status === 200) {
//             const { chartData, title, subTitle } = data;
//             setLevelDataFunction(data);
//             //console.log("response filterlevel api",activityStatusUserFilterLevelChartData)
//             const userfilteredlevelchartData: UserFilterReportChartData[] = chartData && chartData.filter((x: UserFilterReportChartData) => x.label !== "NULL");
//             setFilteredLevelChartData(userfilteredlevelchartData);
//         } else {
//             Alert.alert("error", error.message);
//         }
//     };
    
//     useEffect(() => {
//         handleGetUserFilterLevelData(chartuserfilterlevelPayload);
//     }, []); // This will call the function when the component mounts


//     useEffect(() => {
//         let chartDataToLog;
//         if (reportType === "COMPLIANCE" && selectedTab === "activity_status") {
//             chartDataToLog = activityStatusUserFilterLevelChartData;
//         } 
//         else if (reportType === "COMPLIANCE" && selectedTab === "compliance_status") {
//             chartDataToLog = complianceStatusUserFilterLevelChartData;
//         }
//         else if (reportType === "COMPLIANCE" && selectedTab === "impact_analysis") {
//             chartDataToLog = impactAnalysisUserFilterLevelChartData;
//         }
//         else if (reportType === "INCIDENT" && selectedTab === "incident_activity") {
//             chartDataToLog = incidentActivityUserFilterLevelChartData;
//         }
//         else if (reportType === "INCIDENT" && selectedTab === "incident_comparison") {
//             chartDataToLog = incidentComparisonUserFilterLevelChartData;
//         }
        

//         console.log("Got in next modal-----------------------------");
        
        
//         console.log("response from api****", chartDataToLog);
//         console.log("chartdata response", filteredLevelChartData);
//     },   [activityStatusUserFilterLevelChartData, complianceStatusUserFilterLevelChartData, 
//         incidentActivityUserFilterLevelChartData,incidentComparisonUserFilterLevelChartData,
//         impactAnalysisUserFilterLevelChartData,filteredLevelChartData]  );


        

//         // const newchartuserfilterlevelPayload: UserFilterLevelDataPayLoad = {
//         //     ...chartuserfilterPayload,
//         //     filterLevel: filterLevel.toString()
//         //     fil
//         // };

 
        




//     const handleItemPress = (userFilter : any) => {
//         console.log("userFilter", userFilter);
//         setSelectedUserFilterType(userFilter); // Set the selected filter level in state
//         setSelectedTab(selectedTab)
//     };


//     const renderItem = ({ item }: { item: UserFilterReportChartData }) => (
//         <Pressable onPress={() => handleItemPress(item.userFilter)}>
//             <Text style={{ fontSize: 22, marginBottom: 10 }}>{item.label}</Text>
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
//                                     data={filteredLevelChartData}
//                                     renderItem={renderItem}
//                                     keyExtractor={item => item.label }
//                                 />
//                             </View>
//                         </CardTextContainer>
//                     </CardContainer>
//                 </View>
//             </View>
//         </View>
//     );
// };

// export default UserChartFilterLevel;



// ======================================= Updated on 18-04-2024 ======================================== //


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
import { userchartFilterLevelProps, chartFilterProps, ComplianceView, DefaultDropDownItem, DropDownItem } from '../types';
import GetActivityStatusUserFilterLevelData from '../server/api-functions/get-activity-status-userfilter-filterlevel-data';
import GetComplianceStatusUserFilterLevelData from '../server/api-functions/get-compliance-status-userfilter-filterlevel-data';
import GetImpactAnalysisUserFilterLevelData from '../server/api-functions/get-impact-analysis-userfilter-filterlevel-data';
import GetIncidentActivityUserFilterLevelData from '../server/api-functions/get-incident-activity-userfilter-filterlevel-data';
import GetIncidentComparisonUserFilterLevelData from '../server/api-functions/get-incident-comparison-userfilter-filterlevel-data';

import { ActivityStatusUserFilterLevelData,
    ComplianceStatusUserFilterLevelData, 
    ImpactAnalysisUserFilterLevelData,
    IncidentActivityUserFilterLevelData,
    IncidentComparisonUserFilterLevelData,
    ChartProp, 
    UserFilterReportChartData, 
    UserFilterLevelDataPayLoad } 
from '../types';
import { CryptoDigestAlgorithm } from 'expo-crypto';
import TaskCard from '../components/cards/TaskCard';
import FilterOptionCard from '../components/cards/FilterOptionCard';

const UserChartFilterLevel = ({ selectedTab,filterLevel, chartuserfilterPayload, reportType,setChartFilterPayload}: userchartFilterLevelProps) => {
    const [activityStatusUserFilterLevelChartData, setActivityStatusUserFilterLevelChartData] = useState<ActivityStatusUserFilterLevelData>({
        title: null,
        subTitle: null,
        xAxisName: null,
        yAxisName: null,
        chartData: null
    });


    const [complianceStatusUserFilterLevelChartData, setComplianceStatusUserFilterLevelChartData] = useState<ComplianceStatusUserFilterLevelData>({
        title: null,
        xAxisName: null ,
        yAxisName: null,
        chartData: null
    });


    console.log("filterLevel got ",filterLevel)


    const [impactAnalysisUserFilterLevelChartData, setImpactAnalysisUserFilterLevelChartData] = useState<ImpactAnalysisUserFilterLevelData>({
        title: null,
        subTitle: null,
        xAxisName: null ,
        yAxisName: null,
        chartData: null
    });

    const [incidentActivityUserFilterLevelChartData, setIncidentActivityUserFilterLevelChartData] = useState<IncidentActivityUserFilterLevelData>({
        title: null,
        subTitle: null,
        xAxisName: null ,
        yAxisName: null,
        chartData: null
    });


    const [incidentComparisonUserFilterLevelChartData, setIncidentComparisonUserFilterLevelChartData] = useState<IncidentComparisonUserFilterLevelData>({
        title: null,
        subTitle: null,
        xAxisName: null ,
        yAxisName: null,
        chartData: null
    });


    const chartuserfilterlevelPayload: UserFilterLevelDataPayLoad = {
        ...chartuserfilterPayload,
        filterLevel: filterLevel.toString()
    };

    console.log("selected tab",selectedTab)
    console.log("Report type******",reportType);

    console.log("giving payload",chartuserfilterlevelPayload);
    
    //console.log("filterLevel after",typeof(filterLevel))

    const [isUserFilterModalVisible, setUserFilterModalVisible] = useState(false);
    const [isUserChartFilterLevelModalVisible, setUserFilterLevelModalVisible] = useState(true);


    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const [filteredLevelChartData, setFilteredLevelChartData] = useState<UserFilterReportChartData[]>([]);

    const [selectedUserFilterType, setSelectedUserFilterType] = useState<any | null>(null); // State to hold the selected filter level
    const [selectedtab, setSelectedTab] = useState<any | null>(null); // State to hold the selected filter level


    const handleGetUserFilterLevelData = async (chartuserfilterlevelPayload: UserFilterLevelDataPayLoad) => {
        let apiFunction;
        let setLevelDataFunction;
        if (reportType === "COMPLIANCE" && selectedTab === "activity_status") {
            console.log("yesss")
            apiFunction = GetActivityStatusUserFilterLevelData;
            setLevelDataFunction = setActivityStatusUserFilterLevelChartData;
        } 
        else if (reportType === "COMPLIANCE" && selectedTab === "compliance_status") {
            apiFunction = GetComplianceStatusUserFilterLevelData;
            setLevelDataFunction = setComplianceStatusUserFilterLevelChartData;
        }
        else if (reportType === "COMPLIANCE" && selectedTab === "impact_analysis") {
            apiFunction = GetImpactAnalysisUserFilterLevelData;
            setLevelDataFunction = setImpactAnalysisUserFilterLevelChartData;
        }
        else if (reportType === "INCIDENT" && selectedTab === "incident_activity") {
            apiFunction = GetIncidentActivityUserFilterLevelData;
            setLevelDataFunction = setIncidentActivityUserFilterLevelChartData;
        }
        else if (reportType === "INCIDENT" && selectedTab === "incident_comparison") {
            apiFunction = GetIncidentComparisonUserFilterLevelData;
            setLevelDataFunction = setIncidentComparisonUserFilterLevelChartData;
        }
        else {
            // Handle other report types and selected tabs as needed
            return;
        }
    
        const { data, error, status } = await apiFunction(chartuserfilterlevelPayload);
        if (status === 200) {
            const { chartData, title, subTitle } = data;
            setLevelDataFunction(data);
            //console.log("response filterlevel api",activityStatusUserFilterLevelChartData)
            const userfilteredlevelchartData: UserFilterReportChartData[] = chartData && chartData.filter((x: UserFilterReportChartData) => x.label !== "NULL");
            setFilteredLevelChartData(userfilteredlevelchartData);
            // setUserFilterLevelModalVisible(false)
            // setUserFilterLevelModalVisible(true)
        } else {
            Alert.alert("error", error.message);
        }
    };
    
    useEffect(() => {
        handleGetUserFilterLevelData(chartuserfilterlevelPayload);
    }, []); // This will call the function when the component mounts


    useEffect(() => {
        let chartDataToLog;
        if (reportType === "COMPLIANCE" && selectedTab === "activity_status") {
            chartDataToLog = activityStatusUserFilterLevelChartData;
        } 
        else if (reportType === "COMPLIANCE" && selectedTab === "compliance_status") {
            chartDataToLog = complianceStatusUserFilterLevelChartData;
        }
        else if (reportType === "COMPLIANCE" && selectedTab === "impact_analysis") {
            chartDataToLog = impactAnalysisUserFilterLevelChartData;
        }
        else if (reportType === "INCIDENT" && selectedTab === "incident_activity") {
            chartDataToLog = incidentActivityUserFilterLevelChartData;
        }
        else if (reportType === "INCIDENT" && selectedTab === "incident_comparison") {
            chartDataToLog = incidentComparisonUserFilterLevelChartData;
        }
        

        console.log("Got in next modal-----------------------------");
        
        
        console.log("response from api****", chartDataToLog);
        console.log("chartdata response", filteredLevelChartData);
    },   [activityStatusUserFilterLevelChartData, complianceStatusUserFilterLevelChartData, 
        incidentActivityUserFilterLevelChartData,incidentComparisonUserFilterLevelChartData,
        impactAnalysisUserFilterLevelChartData,filteredLevelChartData]  );


        

        // const newchartuserfilterlevelPayload: UserFilterLevelDataPayLoad = {
        //     ...chartuserfilterPayload,
        //     filterLevel: filterLevel.toString()
        //     fil
        // };


        const handleApplyFilters = () => {
            const chartuserfilterlevelPayloadWithFilter = {
                ...chartuserfilterPayload,
                filterLevel: filterLevel,
                userFilter: selectedUserFilterType
            };
            // Call any function to apply the filters using chartuserfilterlevelPayloadWithFilter
            console.log('Applying Filters:', chartuserfilterlevelPayloadWithFilter);
        };

 
        




    const handleItemPress = (userFilter: any) => {
        console.log("userFilter", userFilter);
        setSelectedUserFilterType(userFilter); // Set the selected filter level in state
        //setSelectedTab(selectedTab)
    };


    // const renderItem = ({ item }: { item: UserFilterReportChartData }) => (
    //     <Pressable onPress={() => handleItemPress(item.userFilter)}>
    //         <Text style={{ fontSize: 22, marginBottom: 10 }}>{item.label}</Text>
    //     </Pressable>

    // );

    const renderItem = ({ item }: { item: UserFilterReportChartData }) => {
 
        return (
            <Pressable onPress={() => handleItemPress(item.userFilter)}>
                <FilterOptionCard
                    value={item.value}
                    label={item.label}
                />
            </Pressable>
        )

    };

    return (
        <View >
            {/* <View style={styles.chartContainer}> */}
                {/* <View style={{ ...styles.taskCard, justifyContent: 'space-between', width: '100%', height: '100%', position: 'relative' }}> */}
                    {/* <CardContainer styles={{ position: 'relative', width: '100%' }}> */}
                        {/* <CardTextContainer styles={{ position: 'relative', width: '100%' }}> */}
                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', position: 'absolute', top: 11, zIndex: 2, right: 0 }}> */}
                                <FlatList
                                    data={filteredLevelChartData}
                                 renderItem={({ item }) => <FilterOptionCard  value={item.value}
                                 label={item.label} />}
                                    // renderItem={renderItem}
                                    keyExtractor={item => item.label}
                                />
                            {/* </View> */}
                        {/* </CardTextContainer> */}
                    {/* </CardContainer> */}
                    <View>
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
                {/* </View> */}
            {/* </View> */}
        </View>
    );
};

export default UserChartFilterLevel;



