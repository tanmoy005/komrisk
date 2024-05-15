
import { View } from '@/src/components/Themed'
import CardContainer3 from '@/src/components/cards/CardContainer3'
import HeadImageSection from '@/src/components/headSection/HeadImageSection'
import { screenHeight } from '@/src/style'
import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, useColorScheme } from 'react-native'
import { AuthContext } from '../../../provider/AuthProvider';
import { router } from 'expo-router';
import BtnFilterHeader from '@/src/components/tabs/BtnFilterHeader'
import Seperator48 from '@/src/components/seperators/Seperator48'
import ComplianceChartDataList from '@/assets/data/chartdataList'
import PendingTaskDetails from '@/src/components/task/pendingTask/PendingTaskDetails'
import { PendingTaskDataList, TaskListDataItem } from '@/src/types'
import { RootState } from '@/src/store'
import { useSelector } from 'react-redux'
import GetActivityStatusDataList from '@/src/server/api-functions/TaskList_(DataList)/get-activity-status-datalist-details';
import { ActivityStatusDataListPayLoad, ChartFilterDataPayLoad } from '@/src/types';
import moment from "moment";

const PendingTaskPage = () => {
  const colorScheme = useColorScheme();
  const data = ComplianceChartDataList;
  const [refreshingowner, setRefreshingOwner] = useState(true);
  const [refreshingreviewer, setRefreshingReviewer] = useState(true);
  const currentDate: string = moment().format('DD/MM/YYYY');
  const startDate: string = moment().startOf('month').format('DD/MM/YYYY');
  const [pendingTaskDataList, setPendingDataList] = useState<PendingTaskDataList>({
    sEcho: null,
    aaData: null,
    iTotalRecords: null,
    iTotalDisplayRecords: null,
  });
  //const [DataList, setDataList] = useState<TaskListDataItem[]>([]);
  const [DataListOwner, setDataListOwner] = useState<TaskListDataItem[]>([]);
  const [DataListReviewer, setDataListReviewer] = useState<TaskListDataItem[]>([]);
  const { userDetails } = useSelector((state: RootState) => state.authUserDetails.payload);
  const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
  const { clearToken } = React.useContext(AuthContext);
  const [taskType, setTaskType] = useState('OwnerTask');
  const [chartFilterPayload, setChartFilterPayload] = useState<ChartFilterDataPayLoad>({
    start: startDate,
    end: currentDate,
    // viewAs: "COMPANY HEAD",

  });

  const [payLoad, setPayLoad] = useState<ActivityStatusDataListPayLoad>({
    ...useCredential,
    ...chartFilterPayload,
    status: "pending"

  });

  //console.log("payload in pending task", payLoad);



  const handleLogout = () => {
    clearToken();
    router.push('/(pages)');
    // Navigate to login or perform other actions
  };
  const handlePressOnOwner = () => {
    setTaskType('OwnerTask')
    handleGetTaskListOwner();
  }
  const handlePressOnReviewer = () => {
    setTaskType('ReviewerTask')
    handleGetTaskListReviewer();
    // const reviewerList = DataList.filter(({ reviewer }) => reviewer === userDetails.displayName);
    // setDataList(reviewerList);
  }

  const handleGetTaskListOwner = async () => {
    setRefreshingOwner(true);

    const { data, error, status } = await GetActivityStatusDataList(payLoad);
    //console.log("response got", data);

    //const status = 200;
    if (status === 200) {
      const { aaData } = data;
      setTaskType('OwnerTask')
      setPendingDataList(data);
      if (aaData.length > 0) {
        setDataListOwner(aaData);
        setRefreshingOwner(false);
      }
    } else {
      // Alert.alert("error4444", error.message);
    }
  }
  useEffect(() => {
    handleGetTaskListOwner();
    //handleGetTaskListReviewer();
  }, []);


  const handleGetTaskListReviewer = async () => {
    

    const { data, error, status } = await GetActivityStatusDataList(payLoad);
    //console.log("response got", data);

    //const status = 200;
    if (status === 200) {
      const { aaData } = data;
      setTaskType('ReviewerTask')
      setPendingDataList(data);
      if (aaData.length > 0) {
        setDataListReviewer(aaData);
        setRefreshingReviewer(false);
      }
    } else {
      // Alert.alert("error4444", error.message);
    }
  }

  //console.log("taskType", taskType);

  return (
    <CardContainer3 styles={{
      backgroundColor: '#fff',
      height: screenHeight
    }}>
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
          <FlatList
            showsVerticalScrollIndicator={false}
            data={DataListOwner}
            renderItem={({ item }) => <PendingTaskDetails data={item} taskType={taskType} />}
            contentContainerStyle={{ gap: 10, padding: 10 }}
            refreshControl={<RefreshControl refreshing={refreshingowner} onRefresh={handleGetTaskListOwner} />}
          />
        </View>
      )}

      {taskType === 'ReviewerTask' && (
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={DataListReviewer}
            renderItem={({ item }) => <PendingTaskDetails data={item} taskType={taskType} />}
            contentContainerStyle={{ gap: 10, padding: 10 }}
            refreshControl={<RefreshControl refreshing={refreshingreviewer} onRefresh={handleGetTaskListReviewer} />}
          />
        </View>
      )}

    </CardContainer3>
  )
}

export default PendingTaskPage
