
import React, { useEffect, useState } from "react";
import { Alert, View, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import Button from "@/src/components/Button";
import DropDown from "@/src/components/CustomeDropDown";
import GetActivityStatusDataFilterLevelData from "@/src/server/api-functions/DataFilter/get-activity-status-datafilter-filterlevel-data";
import GetComplianceStatusDataFilterLevelData from "@/src/server/api-functions/DataFilter/get-compliance-status-datafilter-filterlevel-data";
import GetImpactAnalysisDataFilterLevelData from "@/src/server/api-functions/DataFilter/get-impact-analysis-datafilter-filterlevel-data";
import GetComplianceDataFilterData from "@/src/server/api-functions/DataFilterType/get-datafilter-compliance-data";
import { RootState } from "@/src/store";
import { ActivityStatusDataFilterLevelData, ChartDataFilterModalProps, ComplianceStatusDataFilterLevelData, DataFilterDataPayLoad, DataFilterLevelDataPayLoad, DataFilterReportChartData, DropDownItem, ImpactAnalysisDataFilterLevelData } from "@/src/types";
import { hasValue } from "@/src/utils";

const ChartDataFilter = ({
    setModalVisible,
    chartFilterPayload,
    reportType,
    selectedTab,
    chartDataFilterPayload,
    setDataFilterPayload
}: ChartDataFilterModalProps) => {
    const [selectedFilterType1, setSelectedFilterType1] = useState('');
    const [selectedFilterType2, setSelectedFilterType2] = useState('');
    const [firstFilterDropdown, setFirstFilterDropdown] = useState<DropDownItem[]>([{
        lable: '',
        value: '',
        image: {
            uri: ''
        }
    }]);
    const [filteredLevelChartData, setFilteredLevelChartData] = useState<DropDownItem[]>([]);
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
    const [datafilteredData, setDataFilteredData] = useState(null);
    const [loading, setLoading] = useState(false);

    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const dataFilterPayload: DataFilterDataPayLoad = {
        ...useCredential,
        ...chartFilterPayload
    };

    const handleGetDataFilterData = async (dataFilterPayload: DataFilterDataPayLoad) => {
        setLoading(true);
        let apiFunction;
        if (reportType === 'COMPLIANCE') {
            apiFunction = GetComplianceDataFilterData;
        } else {
            setLoading(false);
            return;
        }

        const { data, error, status } = await apiFunction(dataFilterPayload);
        setLoading(false);
        if (status === 200) {
            const { chartData, title, subTitle } = data;
            setDataFilteredData(data);
            let filterDropdown: DropDownItem[] = [];
            data.forEach((item: string) => {
                filterDropdown = [...filterDropdown, {
                    lable: item,
                    value: item,
                    image: {
                        uri: ''
                    }
                }];
            });
            setFirstFilterDropdown(filterDropdown);
        } else {
            // Alert.alert("error", error.message);
        }
    };

    useEffect(() => {
        handleGetDataFilterData(dataFilterPayload);
    }, []); // This will call the function when the component mounts

    const handleGetDataFilterLevelData = async (chartdatafilterlevelPayload: DataFilterLevelDataPayLoad) => {
        setLoading(true);
        let apiFunction;
        let setLevelDataFunction;
        if (reportType === "COMPLIANCE" && selectedTab === "activity_status") {
            apiFunction = GetActivityStatusDataFilterLevelData;
            setLevelDataFunction = setActivityStatusDataFilterLevelChartData;
        } else if (reportType === "COMPLIANCE" && selectedTab === "compliance_status") {
            apiFunction = GetComplianceStatusDataFilterLevelData;
            setLevelDataFunction = setComplianceStatusDataFilterLevelChartData;
        } else if (reportType === "COMPLIANCE" && selectedTab === "impact_analysis") {
            apiFunction = GetImpactAnalysisDataFilterLevelData;
            setLevelDataFunction = setImpactAnalysisDataFilterLevelChartData;
        } else {
            setLoading(false);
            return;
        }

        const { data, error, status } = await apiFunction(chartdatafilterlevelPayload);
        setLoading(false);
        if (status === 200) {
            const { chartData, title, subTitle } = data;
            setLevelDataFunction(data);

            const datafilteredlevelchartData: DataFilterReportChartData[] = chartData && chartData.filter((x: DataFilterReportChartData) => x.label !== "NULL");

            const chartFilteredSecondLevelData = datafilteredlevelchartData && datafilteredlevelchartData.length > 0 ? datafilteredlevelchartData?.map((data) => {
                return {
                    value: data.dataFilter.toString(),
                    lable: data.label,
                    image: {
                        uri: ''
                    }
                };
            }) : [];

            setFilteredLevelChartData(chartFilteredSecondLevelData);
        } else {
            Alert.alert("error", error.message);
        }
    };

    const chartdatafilterlevelPayload: DataFilterLevelDataPayLoad = {
        ...dataFilterPayload,
        filterType: selectedFilterType1.toString()
    };

    useEffect(() => {
        if (hasValue(selectedFilterType1)) {
            handleGetDataFilterLevelData(chartdatafilterlevelPayload);
        }
    }, [selectedFilterType1]);

    const handleApplyFilters = () => {
        chartDataFilterPayload.dataFilter = selectedFilterType2?.toString();
        setDataFilterPayload({ ...chartDataFilterPayload });
        setModalVisible(false);
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
                <DropDown
                    dropdownItems={firstFilterDropdown}
                    setSelectedValue={setSelectedFilterType1}
                    selectedValue={selectedFilterType1}
                    minWidth={'100%'}
                />
            </View>
            {filteredLevelChartData.length > 0 && (
                <View style={{ zIndex: 2108 }}>
                    <DropDown
                        dropdownItems={filteredLevelChartData}
                        setSelectedValue={setSelectedFilterType2}
                        selectedValue={selectedFilterType2}
                        minWidth={'100%'}
                    />
                </View>
            )}
            <View style={{marginTop:25}}>
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

export default ChartDataFilter;
