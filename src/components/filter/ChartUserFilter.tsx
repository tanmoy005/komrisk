
import Button from "@/src/components/Button";
import CustomeDropDown from "@/src/components/CustomeDropDown";
import GetActivityStatusUserFilterLevelData from "@/src/server/api-functions/UserFilter/get-activity-status-userfilter-filterlevel-data";
import GetComplianceStatusUserFilterLevelData from "@/src/server/api-functions/UserFilter/get-compliance-status-userfilter-filterlevel-data";
import GetImpactAnalysisUserFilterLevelData from "@/src/server/api-functions/UserFilter/get-impact-analysis-userfilter-filterlevel-data";
import GetIncidentActivityUserFilterLevelData from "@/src/server/api-functions/UserFilter/get-incident-activity-userfilter-filterlevel-data";
import GetIncidentComparisonUserFilterLevelData from "@/src/server/api-functions/UserFilter/get-incident-comparison-userfilter-filterlevel-data";
import GetComplianceUserFilterData from "@/src/server/api-functions/UserFilterType/get-userfilter-compliance-data";
import GetIncidentUserFilterData from "@/src/server/api-functions/UserFilterType/get-userfilter-incident-data";
import { RootState } from "@/src/store";
import { ActivityStatusUserFilterLevelData, ChartUserFilterModalProps, ComplianceStatusUserFilterLevelData, ComplianceUserFilterData, DropDownItem, ImpactAnalysisUserFilterLevelData, IncidentActivityUserFilterLevelData, IncidentComparisonUserFilterLevelData, IncidentUserFilterData, UserFilterDataPayLoad, UserFilterLevelDataPayLoad, UserFilterReportChartData } from "@/src/types";
import { hasValue } from "@/src/utils";
import { useEffect, useState } from "react";
import { Alert, View, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";

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
    const [loading, setLoading] = useState(false); // New loading state
    const [complianceUserFilterChartData, setComplianceUserFilterChartData] = useState<ComplianceUserFilterData>({
        title: null,
        subTitle: null,
        chartData: null
    });
    const [firstFilterDropdown, setFirstFilterDropdown] = useState<DropDownItem[]>([{
        lable: '',
        value: '',
        image: {
            uri: ''
        }
    }]);

    const [incidentUserFilterChartData, setIncidentUserFilterChartData] = useState<IncidentUserFilterData>({
        title: null,
        subTitle: null,
        xAxisName: null,
        yAxisName: null,
        chartData: null
    });
    const [filteredChartData, setFilteredChartData] = useState<UserFilterReportChartData[]>([]);

    const [filteredLevelChartData, setFilteredLevelChartData] = useState<DropDownItem[]>([]);

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
        setLoading(true); // Show loader
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
            setLoading(false);
            return;
        }

        const { data, error, status } = await apiFunction(userfilterPayload);

        setLoading(false); // Hide loader

        if (status === 200) {
            const { chartData, title, subTitle } = data;

            setDataFunction(data);
            const userfilteredchartData: UserFilterReportChartData[] = chartData &&
                chartData.filter((x: UserFilterReportChartData) => x.label !== null && x.userFilter !== null);

            const filterDropdown = userfilteredchartData.map(({ displayValue, filterLevel }) => {

                return {
                    lable: displayValue,
                    value: filterLevel?.toString(),
                    image: {
                        uri: ''
                    }
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
        setLoading(true); // Show loader
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
            setLoading(false);
            return;
        }
        console.log("================================", chartuserfilterlevelPayload);
        const { data, error, status } = await apiFunction(chartuserfilterlevelPayload);
        setLoading(false); // Hide loader
        if (status === 200) {
            const { chartData, title, subTitle } = data;
            setLevelDataFunction(data);

            const userfilteredleveltData: UserFilterReportChartData[] = chartData && chartData.filter((x: UserFilterReportChartData) => x.label !== "NULL");

            const userfilteredlevelchartData = userfilteredleveltData && userfilteredleveltData.length > 0 ? userfilteredleveltData?.map((data) => {
                return {
                    value: data?.userFilter?.toString(),
                    lable: data.label,
                    image: {
                        uri: ''
                    }
                };
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
    }, [selectedFilterType1]);

    useEffect(() => {
        if (reportType === 'COMPLIANCE') {
            if (filteredChartData) {
                const ToLog = complianceUserFilterChartData;
            }
        } else if (reportType === 'INCIDENT') {
            if (filteredChartData) {
                const ToLog = incidentUserFilterChartData;
            }
        }

    }, [complianceUserFilterChartData, incidentUserFilterChartData, filteredChartData]);

    const handleApplyFilters = () => {
        if (hasValue(selectedFilterType2)) {
            const filtrLevelArray = selectedFilterType2?.toString()?.split(':');
            const filterLevel = filtrLevelArray.length > 1 ? filtrLevelArray[1] : filtrLevelArray[0];
            chartUserFilterPayload.userFilter = `${selectedFilterType1?.toString()}:${filterLevel}`;

            setUserFilterPayload({ ...chartUserFilterPayload });
            setModalVisible(false);
        }
        else {
            Alert.alert("Alert", "Please select some filter criteria.");
            return;
        }
    }

    return (
        <View style={{ marginTop: 48, rowGap: 20, zIndex: 2110 }}>
            {loading && (
                <View style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: [{ translateX: -25 }, { translateY: -25 }],
                    zIndex: 2120
                }}>
                    <ActivityIndicator size="large" color="#A097DC" />
                </View>
            )}
            <View style={{ zIndex: 2110 }}>
                <CustomeDropDown
                    dropdownItems={firstFilterDropdown}
                    setSelectedValue={setSelectedFilterType1}
                    selectedValue={selectedFilterType1}
                    minWidth={'100%'}
                />
            </View>
            {filteredLevelChartData.length > 0 && (
                <View style={{ zIndex: 2108 }}>
                    <CustomeDropDown
                        dropdownItems={filteredLevelChartData}
                        setSelectedValue={setSelectedFilterType2}
                        selectedValue={selectedFilterType2}
                        minWidth={'100%'}
                    />
                </View>
            )}
            <View style={{ marginTop: 25 }}>
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
    );

}

export default ChartUserFilter

