
// import React, { useEffect, useState } from 'react'
// import { screenWidth, styles } from '../style'
// import { Text, View } from 'react-native'
// import CardTextContainer from '../components/cards/CardTextContainer'
// import CardContainer from '../components/cards/CardContainer'
// import { ComplianceUserFilterData, DropDownItem, FilterTypeModalProps, IncidentUserFilterData, UserFilterDataPayLoad, UserFilterLevelDataPayLoad, UserFilterReportChartData } from '../types'
// import FilterDropdown from '../components/filter/FilterDropdown'
// import { Divider } from 'react-native-elements'
// import DropDown from '../components/Dropdown'
// import Button from '../components/Button'
// // import GetActivityStatusUserFilterData from '../server/api-functions/get-activity-status-userfilter-data'
// import { RootState } from '../store/rootReducer'
// import { useSelector } from 'react-redux'
// import GetComplianceUserFilterData from '../server/api-functions/get-userfilter-compliance-data'
// import GetIncidentUserFilterData from '../server/api-functions/get-userfilter-incident-data'
// import { hasValue } from '../utils'
// import GetActivityStatusUserFilterLevelData from '../server/api-functions/get-activity-status-userfilter-filterlevel-data'
// import GetComplianceStatusUserFilterLevelData from '../server/api-functions/get-compliance-status-userfilter-filterlevel-data'
// import GetImpactAnalysisUserFilterLevelData from '../server/api-functions/get-impact-analysis-userfilter-filterlevel-data'
// import GetIncidentActivityUserFilterLevelData from '../server/api-functions/get-incident-activity-userfilter-filterlevel-data'
// import GetIncidentComparisonUserFilterLevelData from '../server/api-functions/get-incident-comparison-userfilter-filterlevel-data'

import GetActivityStatusDataFilterLevelData from "@/src/server/api-functions/get-activity-status-datafilter-filterlevel-data";
import GetComplianceStatusDataFilterLevelData from "@/src/server/api-functions/get-compliance-status-datafilter-filterlevel-data";
import GetImpactAnalysisDataFilterLevelData from "@/src/server/api-functions/get-impact-analysis-datafilter-filterlevel-data";
import GetIncidentActivityDataFilterLevelData from "@/src/server/api-functions/get-incident-activity-datafilter-filterlevel-data";
import GetIncidentComparisonDataFilterLevelData from "@/src/server/api-functions/get-incident-comparison-datafilter-filterlevel-data";
import GetComplianceDataFilterData from "@/src/server/api-functions/get-datafilter-compliance-data";
//import GetIncidentUserFilterData from "@/src/server/api-functions/get-userfilter-incident-data";
import { RootState } from "@/src/store/rootReducer";
import { screenWidth, styles } from "@/src/style";
import { ActivityStatusDataFilterLevelData, ComplianceStatusDataFilterLevelData, ComplianceUserFilterData, DropDownItem, FilterTypeModalProps, ImpactAnalysisDataFilterLevelData,  DataFilterDataPayLoad, DataFilterLevelDataPayLoad, DataFilterReportChartData } from "@/src/types";
import { hasValue } from "@/src/utils";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import CardContainer from "../cards/CardContainer";
import CardTextContainer from "../cards/CardTextContainer";
import FilterDropdown from "./FilterDropdown";
import DropDown from "../Dropdown";
import Button from "../Button";



const ChartDataFilter = ({
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

    const [firstFilterDropdown, setFirstFilterDropdown] = useState<DropDownItem[]>([{ label: '', value: '' }]);
    // const [incidentUserDropdown, setIncidentUserDropdown] = useState<DropDownItem[]>();




    const [filteredLevelChartData, setFilteredLevelChartData] = useState<DataFilterReportChartData[]>([]);
    const [activityStatusDataFilterLevelChartData, setActivityStatusDataFilterLevelChartData] = useState<ActivityStatusDataFilterLevelData>({
        title: null,
        subTitle: null,
        xAxisName: null,
        yAxisName: null,
        chartData: null
    });


    const [complianceStatusDataFilterLevelChartData, setComplianceStatusDataFilterLevelChartData] = useState<ComplianceStatusDataFilterLevelData>({
        title: null,
        xAxisName: null,
        yAxisName: null,
        chartData: null
    });



    const [impactAnalysisDataFilterLevelChartData, setImpactAnalysisDataFilterLevelChartData] = useState<ImpactAnalysisDataFilterLevelData>({
        title: null,
        subTitle: null,
        xAxisName: null,
        yAxisName: null,
        chartData: null
    });


    const [datafilteredData, setDataFilteredData]= useState(null)
    // const [filteredData, setFilteredData] = useState<>([]);

    // console.log('selectedField1Value', selectedField1Value);

    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const chartdatafilterPayload: DataFilterDataPayLoad = {
        ...useCredential,
        ...chartFilterPayload
    };
    // const [ selectedValue, setSelectedValue] = useState();
    // const [ selectedValue, setSelectedValue] = useState();
    // setSelectedValue, dropdownItems, selectedValue, minWidth


    const handleGetDataFilterData = async (chartuserfilterPayload: DataFilterDataPayLoad) => {
        let apiFunction;
        if (reportType === 'COMPLIANCE') {
            apiFunction = GetComplianceDataFilterData;

        }  else {
            // Handle other report types or set a default API function
            return;
        }

        const { data, error, status } = await apiFunction(chartuserfilterPayload);
        if (status === 200) {
            const { chartData, title, subTitle } = data;
            console.log('data343434', data);

            setDataFilteredData(data);

            const filterDropdown = data.map((item: string) => ({ label: item, value: item }));

            console.log("filterDropdown",filterDropdown);
            setFirstFilterDropdown(filterDropdown);


            
        } else {
            // Alert.alert("error", error.message);
        }
    };

    useEffect(() => {
        handleGetDataFilterData(chartdatafilterPayload);
    }, []); // This will call the function when the component mounts
    const handleGetDataFilterLevelData = async (chartdatafilterlevelPayload: DataFilterLevelDataPayLoad) => {
        let apiFunction;
        let setLevelDataFunction;
        if (reportType === "COMPLIANCE" && selectedTab === "activity_status") {
            apiFunction = GetActivityStatusDataFilterLevelData;
            setLevelDataFunction = setActivityStatusDataFilterLevelChartData;
        }
        else if (reportType === "COMPLIANCE" && selectedTab === "compliance_status") {
            apiFunction = GetComplianceStatusDataFilterLevelData;
            setLevelDataFunction = setComplianceStatusDataFilterLevelChartData;
        }
        else if (reportType === "COMPLIANCE" && selectedTab === "impact_analysis") {
            apiFunction = GetImpactAnalysisDataFilterLevelData;
            setLevelDataFunction = setImpactAnalysisDataFilterLevelChartData;
        }

        else {
            // Handle other report types and selected tabs as needed
            return;
        }

        const { data, error, status } = await apiFunction(chartdatafilterlevelPayload);
        if (status === 200) {
            const { chartData, title, subTitle } = data;
            setLevelDataFunction(data);
            console.log('data5434534534534', data);

            console.log("response filterlevel api",activityStatusDataFilterLevelChartData)

            const datafilteredlevelchartData: DataFilterReportChartData[] = chartData && chartData.filter((x: DataFilterReportChartData) => x.label !== "NULL");
            console.log('datafilteredlevelchartData', datafilteredlevelchartData);

            setFilteredLevelChartData(datafilteredlevelchartData);
            // setUserFilterLevelModalVisible(false)
            // setUserFilterLevelModalVisible(true)
        } else {
            Alert.alert("error", error.message);
        }
    };
    const chartdatafilterlevelPayload: DataFilterLevelDataPayLoad = {
        ...chartdatafilterPayload,
        filterType: selectedFilterType1.toString()
    };
    useEffect(() => {
        if (hasValue(selectedFilterType1)) {
            handleGetDataFilterLevelData(chartdatafilterlevelPayload);
        }
    }, [selectedFilterType1]); //
    useEffect(() => {
        let chartDataToLog;
        if (reportType === 'COMPLIANCE') {
            chartDataToLog = datafilteredData;
        } 
        console.log('DATA FILTER DATA', datafilteredData);


    }, [datafilteredData]);

    const handleApplyFilters = () => {

    }

    return (
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
            <View>
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
            </View>
        </View>
    )
}

export default ChartDataFilter