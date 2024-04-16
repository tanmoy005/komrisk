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
import { ActivityStatusUserFilterLevelData, ChartProp, UserFilterReportChartData, ActivityStatusUserFilterLevelDataPayLoad } from '../types';

const UserChartFilterLevel = ({ filterLevel,chartuserfilterPayload, reportType, setUserFilterLevelModalVisible }: userchartFilterLevelProps) => {
    const [activityStatusUserFilterLevelChartData, setActivityStatusUserFilterLevelChartData] = useState<ActivityStatusUserFilterLevelData>({
        title: null,
        subTitle: null,
        xAxisName: null ,
        yAxisName: null,
        chartData: null
    });

    const chartuserfilterlevelPayload: ActivityStatusUserFilterLevelDataPayLoad = {
        ...chartuserfilterPayload,
        filterLevel
    };


    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const [filteredLevelChartData, setFilteredLevelChartData] = useState<UserFilterReportChartData[]>([]);

    const [selectedUserFilterLevel, setSelectedUserFilterLevel] = useState<any | null>(null); // State to hold the selected filter level


    const handleGetUserFilterLevelData = async (chartuserfilterlevelPayload: ActivityStatusUserFilterLevelDataPayLoad) => {
        const { data, error, status } = await GetActivityStatusUserFilterLevelData(chartuserfilterlevelPayload);
        if (status === 200) {
            const { chartData, title, subTitle } = data;
            setActivityStatusUserFilterLevelChartData(data);
            const userfilteredlevelchartData: UserFilterReportChartData[] = chartData && chartData.filter((x: UserFilterReportChartData) => x.label !== "NULL");
            setFilteredLevelChartData(userfilteredlevelchartData);
        } else {
            Alert.alert("error", error.message);
        }
    };

    useEffect(() => {
        handleGetUserFilterLevelData(chartuserfilterlevelPayload);
    }, []); // This will call the function when the component mounts

    useEffect(() => {
        console.log("response from api with filter level****", activityStatusUserFilterLevelChartData);
        console.log("with filterlevel chartdata response", filteredLevelChartData);
    }, [activityStatusUserFilterLevelChartData, filteredLevelChartData]);






    const handleItemPress = (userFilter : any) => {
        console.log("userFilter", userFilter);
        setSelectedUserFilterLevel(userFilter); // Set the selected filter level in state
    };


    const renderItem = ({ item }: { item: UserFilterReportChartData }) => (
        <Pressable onPress={() => handleItemPress(item.userFilter)}>
            <Text style={{ fontSize: 22, marginBottom: 10 }}>{item.label}</Text>
        </Pressable>

    );

    return (
        <View style={{ ...styles.dashboardContainer, width: (screenWidth * 0.75) }}>
            <View style={styles.chartContainer}>
                <View style={{ ...styles.taskCard, justifyContent: 'space-between', width: '100%', height: '100%', position: 'relative' }}>
                    <CardContainer styles={{ position: 'relative', width: '100%' }}>
                        <CardTextContainer styles={{ position: 'relative', width: '100%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', position: 'absolute', top: 11, zIndex: 2, right: 0 }}>
                                <FlatList
                                    data={filteredLevelChartData}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.label }
                                />
                            </View>
                        </CardTextContainer>
                    </CardContainer>
                </View>
            </View>
        </View>
    );
};

export default UserChartFilterLevel;