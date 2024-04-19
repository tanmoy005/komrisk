import React, { useEffect, useState } from 'react'
import { screenWidth, styles } from '../style'
import { Text, View } from 'react-native'
import CardTextContainer from '../components/cards/CardTextContainer'
import CardContainer from '../components/cards/CardContainer'
import { ComplianceUserFilterData, DropDownItem, FilterTypeModalProps, IncidentUserFilterData, UserFilterDataPayLoad, UserFilterReportChartData } from '../types'
import FilterDropdown from '../components/filter/FilterDropdown'
import { Divider } from 'react-native-elements'
import DropDown from '../components/Dropdown'
import Button from '../components/Button'
// import GetActivityStatusUserFilterData from '../server/api-functions/get-activity-status-userfilter-data'
import { RootState } from '../store/rootReducer'
import { useSelector } from 'react-redux'
import GetComplianceUserFilterData from '../server/api-functions/get-userfilter-compliance-data'
import GetIncidentUserFilterData from '../server/api-functions/get-userfilter-incident-data'



const FilterTypeModal = ({
    filterType,
    filterTypes,
    setFilterType,
    filterTypemModalIsOpen,
    setFilterTypeModalIsOpen,
    chartFilterPayload,
    reportType
}: FilterTypeModalProps) => {

    const [selectedField1Value, setSelectedField1Value] = useState('');
    const [complianceUserFilterChartData, setComplianceUserFilterChartData] = useState<ComplianceUserFilterData>({
        title: null,
        subTitle: null,
        chartData: null
    });
    const [complianceUserDropdown, setComplianceUserDropdown] = useState<DropDownItem[]>();
    const [incidentUserDropdown, setIncidentUserDropdown] = useState<DropDownItem[]>();
  
    const [incidentUserFilterChartData, setIncidentUserFilterChartData] = useState<IncidentUserFilterData>({
        title: null,
        subTitle: null,
        xAxisName: null,
        yAxisName: null,
        chartData: null
    });
    const [filteredChartData, setFilteredChartData] = useState<UserFilterReportChartData[]>([]);
    // const [filteredData, setFilteredData] = useState<>([]);

    console.log('selectedField1Value', selectedField1Value);

    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const chartuserfilterPayload: UserFilterDataPayLoad = {
        ...useCredential,
        ...chartFilterPayload
    };
    // const [ selectedValue, setSelectedValue] = useState();
    // const [ selectedValue, setSelectedValue] = useState();
    // setSelectedValue, dropdownItems, selectedValue, minWidth

    const fields1Values = [
        { label: 'Field1Label', value: 'Field1Label' }
    ]
    const handleGetUserFilterData = async (chartuserfilterPayload: UserFilterDataPayLoad) => {
        let apiFunction;
        let setDataFunction;
        let setDropDown;
        if (reportType === 'COMPLIANCE') {
            apiFunction = GetComplianceUserFilterData;
            setDataFunction = setComplianceUserFilterChartData;
            setDropDown = setComplianceUserDropdown;
        } else if (reportType === 'INCIDENT') {
            apiFunction = GetIncidentUserFilterData;
            setDataFunction = setIncidentUserFilterChartData;
            setDropDown = setIncidentUserDropdown;
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
 

            const filterDropdown = userfilteredchartData.map(({displayValue, filterLevel})=>{

                return {
                    label: displayValue,
                    value: filterLevel
                }
            })
            setFilteredChartData(userfilteredchartData);
            console.log('filterDropdown', filterDropdown);
            
            setDropDown(filterDropdown);
        } else {
            // Alert.alert("error", error.message);
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
                                    {/* <DropDown
                                        dropdownItems={complianceUserFilterChartData.chartData}
                                        setSelectedValue={setSelectedField1Value}
                                        selectedValue={selectedField1Value}
                                        // minWidth={screenWidth * 0.00822222222}
                                        minWidth={'100%'}
                                    /> */}
                                </View>
                                <View style={{ zIndex: 2108 }}>
                                    <DropDown
                                        dropdownItems={fields1Values}
                                        setSelectedValue={setSelectedField1Value}
                                        selectedValue={selectedField1Value}
                                        // minWidth={screenWidth * 0.00822222222}
                                        minWidth={'100%'}
                                    />
                                </View>
                                <View style={{ zIndex: 2106 }}>
                                    <DropDown
                                        dropdownItems={fields1Values}
                                        setSelectedValue={setSelectedField1Value}
                                        selectedValue={selectedField1Value}
                                        // minWidth={screenWidth * 0.00822222222}
                                        minWidth={'100%'}
                                    />
                                </View>
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
                                alignSelf: 'stretch'
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