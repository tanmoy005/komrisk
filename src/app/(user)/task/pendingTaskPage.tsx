
import ComplianceChartDataList from '@/assets/data/chartdataList';
import NoDataAvailableCard from '@/src/components/NoDataAvailableCard';
import { View } from '@/src/components/Themed';
import CardContainer3 from '@/src/components/cards/CardContainer3';
import HeadImageSection from '@/src/components/headSection/HeadImageSection';
import Seperator48 from '@/src/components/seperators/Seperator48';
import BtnFilterHeader from '@/src/components/tabs/BtnFilterHeader';
import PendingTaskDetails from '@/src/components/task/pendingTask/PendingTaskDetails';
import GetActivityStatusDataList from '@/src/server/api-functions/TaskList_(DataList)/get-activity-status-datalist-details';
import { RootState } from '@/src/store';
import { screenHeight } from '@/src/style';
import { ActivityStatusDataListPayLoad, ChartFilterDataPayLoad, PendingTaskDataList, TaskListDataItem, ownerReviewerType } from '@/src/types';
import { router } from 'expo-router';
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, RefreshControl, useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { AuthContext } from '@/src/provider/AuthProvider';

const PendingTaskPage = () => {
  const colorScheme = useColorScheme();
  const data = ComplianceChartDataList;
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pendingTaskDataList, setPendingDataList] = useState<PendingTaskDataList>({
    sEcho: null,
    aaData: null,
    iTotalRecords: null,
    iTotalDisplayRecords: null,
  });
  const [DataListOwner, setDataListOwner] = useState<TaskListDataItem[]>([]);
  const [DataListReviewer, setDataListReviewer] = useState<TaskListDataItem[]>([]);
  const { userDetails } = useSelector((state: RootState) => state.authUserDetails.payload);
  const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
  const { clearToken } = React.useContext(AuthContext);
  const [taskType, setTaskType] = useState('OwnerTask');
  const currentDate = moment().format('DD/MM/YYYY');
  const startDate = moment().startOf('month').format('DD/MM/YYYY');
  const [chartFilterPayload, setChartFilterPayload] = useState<ChartFilterDataPayLoad>({
    start: startDate,
    end: currentDate,
    viewAs: "COMPANY HEAD",
  });

  const [payLoad, setPayLoad] = useState<ActivityStatusDataListPayLoad>({
    ...useCredential,
    ...chartFilterPayload,
    status: "initiated,pending",
  });

  const handleLogout = () => {
    clearToken();
    router.push('/(pages)');
  };

  const fetchData = async (filterLevel: ownerReviewerType, setDataList: React.Dispatch<React.SetStateAction<TaskListDataItem[]>>, setRefreshingState: React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true);
    setRefreshingState(true);
    const { data, error, status } = await GetActivityStatusDataList({ ...payLoad, filterLevel });
    if (status === 200) {
      const { aaData } = data;
      if (aaData.length > 0) {
        setDataList(aaData);
      }
    } else {
      // Handle error appropriately
    }
    setLoading(false);
    setRefreshingState(false);
  };

  useEffect(() => {
    fetchData(ownerReviewerType.Owner, setDataListOwner, setRefreshing);
  }, []);

  const handlePressOnOwner = () => {
    setTaskType('OwnerTask');
    fetchData(ownerReviewerType.Owner, setDataListOwner, setRefreshing);
  };

  const handlePressOnReviewer = () => {
    setTaskType('APPROVAL');
    fetchData(ownerReviewerType.Reviewer, setDataListReviewer, setRefreshing);
  };

  const renderFooter = () => {
    return loading ? (
      <View style={{ padding: 10 }}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  return (
    <CardContainer3 styles={{ backgroundColor: '#fff', height: screenHeight }}>
      <HeadImageSection />
      <BtnFilterHeader
        firstBtnName='Owner'
        fistBtnOnpress={handlePressOnOwner}
        secondBtnName='Reviewer'
        secondBtnOnpress={handlePressOnReviewer}
      />
      <Seperator48 />
      {taskType === 'OwnerTask' && (
        <View>
          {DataListOwner.length === 0 && refreshing == false ? (
            <NoDataAvailableCard />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={DataListOwner}
              renderItem={({ item }) => <PendingTaskDetails data={item} taskType={taskType} />}
              contentContainerStyle={{ gap: 10, padding: 10 }}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => fetchData(ownerReviewerType.Owner, setDataListOwner, setRefreshing)}
                />
              }
              ListFooterComponent={renderFooter}
            />
          )}
        </View>
      )}
      {taskType === 'APPROVAL' && (
        <View>
          {DataListReviewer.length === 0 && refreshing== false ? (
            <NoDataAvailableCard />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={DataListReviewer}
              renderItem={({ item }) => <PendingTaskDetails data={item} taskType={taskType} />}
              contentContainerStyle={{ gap: 10, padding: 10 }}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => fetchData(ownerReviewerType.Reviewer, setDataListReviewer, setRefreshing)}
                />
              }
              ListFooterComponent={renderFooter}
            />
          )}
        </View>
      )}
    </CardContainer3>
  );
};

export default PendingTaskPage;
