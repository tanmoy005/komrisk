
import GetActivityStatusDataFilterLevelData from "@/src/server/api-functions/DataFilter/get-activity-status-datafilter-filterlevel-data";
import GetComplianceStatusDataFilterLevelData from "@/src/server/api-functions/DataFilter/get-compliance-status-datafilter-filterlevel-data";
import GetImpactAnalysisDataFilterLevelData from "@/src/server/api-functions/DataFilter/get-impact-analysis-datafilter-filterlevel-data";
import GetComplianceDataFilterData from "@/src/server/api-functions/DataFilterType/get-datafilter-compliance-data";
import { ActivityStatusDataFilterLevelData, ComplianceStatusDataFilterLevelData, DropDownItem, ImpactAnalysisDataFilterLevelData, DataFilterDataPayLoad, DataFilterLevelDataPayLoad, DataFilterReportChartData, DefaultDropDownItem, ChartDataFilterModalProps } from "@/src/types";
import { hasValue } from "@/src/utils";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import DropDown from "../CustomeDropDown";
import Button from "../Button";
import { RootState } from "@/src/store";



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


    const [datafilteredData, setDataFilteredData] = useState(null)

    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const dataFilterPayload: DataFilterDataPayLoad = {
        ...useCredential,
        ...chartFilterPayload
    };


    const handleGetDataFilterData = async (dataFilterPayload: DataFilterDataPayLoad) => {
        let apiFunction;
        if (reportType === 'COMPLIANCE') {
            apiFunction = GetComplianceDataFilterData;

        } else {
            // Handle other report types or set a default API function
            return;
        }

        const { data, error, status } = await apiFunction(dataFilterPayload);
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
    }, [selectedFilterType1]); //

    const handleApplyFilters = () => {

        chartDataFilterPayload.dataFilter = selectedFilterType2?.toString();

        setDataFilterPayload({ ...chartDataFilterPayload });
        setModalVisible(false)
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

export default ChartDataFilter