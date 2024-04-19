import React, { useEffect, useState } from 'react'
import { screenWidth, styles } from '../style'
import { Text, View } from 'react-native'
import CardTextContainer from '../components/cards/CardTextContainer'
import CardContainer from '../components/cards/CardContainer'
import { ComplianceUserFilterData, DropDownItem, FilterTypeModalProps, IncidentUserFilterData, UserFilterDataPayLoad, UserFilterLevelDataPayLoad, UserFilterReportChartData } from '../types'
import FilterDropdown from '../components/filter/FilterDropdown'
import { Divider } from 'react-native-elements'
import DropDown from '../components/Dropdown'
import Button from '../components/Button'
// import GetActivityStatusUserFilterData from '../server/api-functions/get-activity-status-userfilter-data'
import { RootState } from '../store/rootReducer'
import { useSelector } from 'react-redux'
import GetComplianceUserFilterData from '../server/api-functions/get-userfilter-compliance-data'
import GetIncidentUserFilterData from '../server/api-functions/get-userfilter-incident-data'
import { hasValue } from '../utils'
import GetActivityStatusUserFilterLevelData from '../server/api-functions/get-activity-status-userfilter-filterlevel-data'
import GetComplianceStatusUserFilterLevelData from '../server/api-functions/get-compliance-status-userfilter-filterlevel-data'
import GetImpactAnalysisUserFilterLevelData from '../server/api-functions/get-impact-analysis-userfilter-filterlevel-data'
import GetIncidentActivityUserFilterLevelData from '../server/api-functions/get-incident-activity-userfilter-filterlevel-data'
import GetIncidentComparisonUserFilterLevelData from '../server/api-functions/get-incident-comparison-userfilter-filterlevel-data'



const FilterTypeModal = ({
    filterType,
    filterTypes,
    setFilterType,
    filterTypemModalIsOpen,
    setFilterTypeModalIsOpen,
    chartFilterPayload,
    reportType,
    selectedTab
}: FilterTypeModalProps) => {

    const [selectedFilterType1, setSelectedFilterType1] = useState('');
    const [selectedFilterType2, setSelectedFilterType2] = useState('');
    const [complianceUserFilterChartData, setComplianceUserFilterChartData] = useState<ComplianceUserFilterData>({
        title: null,
        subTitle: null,
        chartData: null
    });
    const [firstFilterDropdown, setFirstFilterDropdown] = useState<DropDownItem[]>([{ label: '', value: '' }]);
    // const [incidentUserDropdown, setIncidentUserDropdown] = useState<DropDownItem[]>();

    const [incidentUserFilterChartData, setIncidentUserFilterChartData] = useState<IncidentUserFilterData>({
        title: null,
        subTitle: null,
        xAxisName: null,
        yAxisName: null,
        chartData: null
    });
    const [filteredChartData, setFilteredChartData] = useState<UserFilterReportChartData[]>([]);

    const [filteredLevelChartData, setFilteredLevelChartData] = useState<UserFilterReportChartData[]>([]);
    const [activityStatusUserFilterLevelChartData, setActivityStatusUserFilterLevelChartData] = useState<ActivityStatusUserFilterLevelData>({
        title: null,
        subTitle: null,
        xAxisName: null,
        yAxisName: null,
        chartData: null
    });


    const [complianceStatusUserFilterLevelChartData, setComplianceStatusUserFilterLevelChartData] = useState<ComplianceStatusUserFilterLevelData>({
        title: null,
        xAxisName: null,
        yAxisName: null,
        chartData: null
    });



    const [impactAnalysisUserFilterLevelChartData, setImpactAnalysisUserFilterLevelChartData] = useState<ImpactAnalysisUserFilterLevelData>({
        title: null,
        subTitle: null,
        xAxisName: null,
        yAxisName: null,
        chartData: null
    });

    const [incidentActivityUserFilterLevelChartData, setIncidentActivityUserFilterLevelChartData] = useState<IncidentActivityUserFilterLevelData>({
        title: null,
        subTitle: null,
        xAxisName: null,
        yAxisName: null,
        chartData: null
    });


    const [incidentComparisonUserFilterLevelChartData, setIncidentComparisonUserFilterLevelChartData] = useState<IncidentComparisonUserFilterLevelData>({
        title: null,
        subTitle: null,
        xAxisName: null,
        yAxisName: null,
        chartData: null
    });
    // const [filteredData, setFilteredData] = useState<>([]);

    // console.log('selectedField1Value', selectedField1Value);

    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const chartuserfilterPayload: UserFilterDataPayLoad = {
        ...useCredential,
        ...chartFilterPayload
    };
    // const [ selectedValue, setSelectedValue] = useState();
    // const [ selectedValue, setSelectedValue] = useState();
    // setSelectedValue, dropdownItems, selectedValue, minWidth


    const handleGetUserFilterData = async (chartuserfilterPayload: UserFilterDataPayLoad) => {
        let apiFunction;
        let setDataFunction;
        if (reportType === 'COMPLIANCE') {
            apiFunction = GetComplianceUserFilterData;
            setDataFunction = setComplianceUserFilterChartData;

        } else if (reportType === 'INCIDENT') {
            apiFunction = GetIncidentUserFilterData;
            setDataFunction = setIncidentUserFilterChartData;
            // setDropDown = setIncidentUserDropdown;
        } else {
            // Handle other report types or set a default API function
            return;
        }

        const { data, error, status } = await apiFunction(chartuserfilterPayload);
        if (status === 200) {
            const { chartData, title, subTitle } = data;
            console.log('data343434', data);

            setDataFunction(data);
            const userfilteredchartData: UserFilterReportChartData[] = chartData &&
                chartData.filter((x: UserFilterReportChartData) => x.label !== "NULL");
            console.log('userfilteredchartData', userfilteredchartData);


            const filterDropdown = userfilteredchartData.map(({ displayValue, filterLevel }) => {

                return {
                    label: displayValue,
                    value: filterLevel
                }
            })
            setFilteredChartData(userfilteredchartData);
            console.log('filterDropdown', filterDropdown);

            setFirstFilterDropdown(filterDropdown);
        } else {
            // Alert.alert("error", error.message);
        }
    };

    useEffect(() => {
        handleGetUserFilterData(chartuserfilterPayload);
    }, []); // This will call the function when the component mounts
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
            console.log('data5434534534534', data);
            
            //console.log("response filterlevel api",activityStatusUserFilterLevelChartData)
            
            const userfilteredlevelchartData: UserFilterReportChartData[] = chartData && chartData.filter((x: UserFilterReportChartData) => x.label !== "NULL");
            console.log('userfilteredlevelchartData', userfilteredlevelchartData);

            setFilteredLevelChartData(userfilteredlevelchartData);
            // setUserFilterLevelModalVisible(false)
            // setUserFilterLevelModalVisible(true)
        } else {
            Alert.alert("error", error.message);
        }
    };
    const chartuserfilterlevelPayload: UserFilterLevelDataPayLoad = {
        ...chartuserfilterPayload,
        filterLevel: selectedFilterType1.toString()
    };
    useEffect(() => {
        if (hasValue(selectedFilterType1)) {
            handleGetUserFilterLevelData(chartuserfilterlevelPayload);
        }
    }, [selectedFilterType1]); //
    useEffect(() => {
        let chartDataToLog;
        if (reportType === 'COMPLIANCE') {
            chartDataToLog = complianceUserFilterChartData;
        } else if (reportType === 'INCIDENT') {
            chartDataToLog = incidentUserFilterChartData;
        }
        console.log('complianceUserFilterChartData', complianceUserFilterChartData);


    }, [complianceUserFilterChartData, incidentUserFilterChartData, filteredChartData]);

    const handleApplyFilters = () => {

    }

    return (
        <View style={{ ...styles.dashboardContainer, marginTop: 23, width: (screenWidth * 0.75) }}>
            <View style={styles.chartContainer}>
                <View style={{ ...styles.taskCard, borderWidth: 0, width: (screenWidth * 0.85), height: '100%', alignItems: 'stretch' }}>
                    <CardContainer>
                        <CardTextContainer styles={{ position: 'relative' }}>
                            <View style={{ zIndex: 2119 }}>
                                <FilterDropdown
                                    filterType={filterType}
                                    setFilterType={setFilterType}
                                    filterTypes={filterTypes}
                                    filterTypemModalIsOpen={filterTypemModalIsOpen}
                                    setFilterTypeModalIsOpen={setFilterTypeModalIsOpen}
                                    labelPosition='H'
                                />
                            </View>
                            <View style={{ marginTop: 48, rowGap: 20, zIndex: 2110 }}>
                                <View style={{ zIndex: 2110 }}>
                                    <DropDown
                                        dropdownItems={firstFilterDropdown}
                                        setSelectedValue={setSelectedFilterType1}
                                        selectedValue={selectedFilterType1}
                                        // minWidth={screenWidth * 0.00822222222}
                                        minWidth={'100%'}
                                    />
                                </View>
                                {
                                    filteredLevelChartData.length > 0 && 
                                <View style={{ zIndex: 2108 }}>
                                    <DropDown
                                        dropdownItems={filteredLevelChartData}
                                        setSelectedValue={setSelectedFilterType2}
                                        selectedValue={selectedFilterType2}
                                        // minWidth={screenWidth * 0.00822222222}
                                        minWidth={'100%'}
                                    />
                                </View>
                                }
                            </View>
                        </CardTextContainer>
                        <Button
                            btnColor={'#A097DC'}
                            text='APPLY FILTERS'
                            style={{
                                paddingVertical: 20,
                                paddingHorizontal: 48,
                                fontWeight: '400',
                                fontSize: 16,
                                borderRadius: 5,
                            }}
                            onPress={handleApplyFilters}
                        />
                    </CardContainer>
                </View>
            </View>
        </View>
    )
}

export default FilterTypeModal