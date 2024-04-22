import GetActivityStatusUserFilterLevelData from "@/src/server/api-functions/get-activity-status-userfilter-filterlevel-data";
import GetComplianceStatusUserFilterLevelData from "@/src/server/api-functions/get-compliance-status-userfilter-filterlevel-data";
import GetImpactAnalysisUserFilterLevelData from "@/src/server/api-functions/get-impact-analysis-userfilter-filterlevel-data";
import GetIncidentActivityUserFilterLevelData from "@/src/server/api-functions/get-incident-activity-userfilter-filterlevel-data";
import GetIncidentComparisonUserFilterLevelData from "@/src/server/api-functions/get-incident-comparison-userfilter-filterlevel-data";
import GetComplianceUserFilterData from "@/src/server/api-functions/get-userfilter-compliance-data";
import GetIncidentUserFilterData from "@/src/server/api-functions/get-userfilter-incident-data";
import { RootState } from "@/src/store/rootReducer";
import { ActivityStatusUserFilterLevelData, ChartUserFilterModalProps, ComplianceStatusUserFilterLevelData, ComplianceUserFilterData, DropDownItem, FilterTypeModalProps, ImpactAnalysisUserFilterLevelData, IncidentActivityUserFilterLevelData, IncidentComparisonUserFilterLevelData, IncidentUserFilterData, UserFilterDataPayLoad, UserFilterLevelDataPayLoad, UserFilterReportChartData } from "@/src/types";
import { hasValue } from "@/src/utils";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import DropDown from "../Dropdown";
import Button from "../Button";



const ChartUserFilter = ({
    setModalVisible,
    chartFilterPayload,
    reportType,
    selectedTab,
    chartUserFilterPayload,
    setUserFilterPayload
}: ChartUserFilterModalProps) => {

    const [selectedFilterType1, setSelectedFilterType1] = useState('');
    const [selectedFilterType2, setSelectedFilterType2] = useState('');
    const [complianceUserFilterChartData, setComplianceUserFilterChartData] = useState<ComplianceUserFilterData>({
        title: null,
        subTitle: null,
        chartData: null
    });
    const [firstFilterDropdown, setFirstFilterDropdown] = useState<DropDownItem[]>([{ label: '', value: '' }]);

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


    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const userfilterPayload: UserFilterDataPayLoad = {
        ...useCredential,
        ...chartFilterPayload
    };

    const handleGetUserFilterData = async (userfilterPayload: UserFilterDataPayLoad) => {
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

        const { data, error, status } = await apiFunction(userfilterPayload);
        if (status === 200) {
            const { chartData, title, subTitle } = data;

            setDataFunction(data);
            const userfilteredchartData: UserFilterReportChartData[] = chartData &&
                chartData.filter((x: UserFilterReportChartData) => x.label !== null && x.userFilter !== null);

            const filterDropdown = userfilteredchartData.map(({ displayValue, filterLevel }) => {

                return {
                    label: displayValue,
                    value: filterLevel
                }
            })
            setFilteredChartData(userfilteredchartData);
            setFirstFilterDropdown(filterDropdown);
        } else {
            Alert.alert("error", error.message);
        }
    };

    useEffect(() => {
        handleGetUserFilterData(userfilterPayload);
    }, []); // This will call the function when the component mounts

    const handleGetUserFilterLevelData = async (chartuserfilterlevelPayload: UserFilterLevelDataPayLoad) => {
        let apiFunction;
        let setLevelDataFunction;
        if (reportType === "COMPLIANCE" && selectedTab === "activity_status") {
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

            const userfilteredleveltData: UserFilterReportChartData[] = chartData && chartData.filter((x: UserFilterReportChartData) => x.label !== "NULL");

            const userfilteredlevelchartData = userfilteredleveltData && userfilteredleveltData.length > 0 ? userfilteredleveltData?.map((data) => {
                return { value: data?.userFilter?.toString(), label: data.label, userFilter: data?.userFilter };
            }) : [];

            setFilteredLevelChartData(userfilteredlevelchartData);
        } else {
            Alert.alert("error", error.message);
        }
    };

    const chartuserfilterlevelPayload: UserFilterLevelDataPayLoad = {
        ...userfilterPayload,
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

    }, [complianceUserFilterChartData, incidentUserFilterChartData, filteredChartData]);

    const handleApplyFilters = () => {
        const filtrLevelArray = selectedFilterType2?.toString()?.split(':');
        const filterLevel = filtrLevelArray.length > 1 ? filtrLevelArray[1] : filtrLevelArray[0];
        chartUserFilterPayload.filterType = selectedFilterType1?.toString();
        chartUserFilterPayload.filterLevel = `${selectedFilterType1?.toString()}:${filterLevel}`;

        setUserFilterPayload({ ...chartUserFilterPayload });
        setModalVisible(false)
    }

    return (
        <View style={{ marginTop: 48, rowGap: 20, zIndex: 2110 }}>
            <View style={{ zIndex: 2110 }}>
                <DropDown
                    dropdownItems={firstFilterDropdown}
                    setSelectedValue={setSelectedFilterType1}
                    selectedValue={selectedFilterType1}
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

export default ChartUserFilter