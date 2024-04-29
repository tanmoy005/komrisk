// import Profile from '@/src/components/Profile'
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

const PendingTaskPage = () => {
  const colorScheme = useColorScheme();
  const data = ComplianceChartDataList;
  console.log('DataList2323', data);

  const [refreshing, setRefreshing] = useState(true);
  const [pendingTaskDataList, setPendingDataList] = useState<PendingTaskDataList>({
    sEcho: null,
    aaData: null,
    iTotalRecords: null,
    iTotalDisplayRecords: null,
  });
  const [DataList, setDataList] = useState<TaskListDataItem[]>([]);
  const { userDetails } = useSelector((state: RootState) => state.authUserDetails.payload);
  console.log('userDetails', userDetails);

  const { clearToken } = React.useContext(AuthContext);

  const handleLogout = () => {
    clearToken();
    router.push('/(pages)');
    // Navigate to login or perform other actions
  };
  const handlePressOnOwner = () => {
    handleGetTaskList();
  }
  const handlePressOnReviewer = () => {
    const reviewerList = DataList.filter(({ reviewer }) => reviewer === userDetails.displayName);
    setDataList(reviewerList);
  }

  const handleGetTaskList = async () => {

    // const { data, error, status } = await GetComplianceStatusDataList(payLoad);
    const status = 200;
    if (status === 200) {
      const { aaData } = data;
      setPendingDataList(data);
      if (aaData.length > 0) {
        setDataList(aaData);
        setRefreshing(false);
      }
    } else {
      // Alert.alert("error4444", error.message);
    }
  }
  useEffect(() => {
    handleGetTaskList();
  }, []);
  return (
    <CardContainer3 styles={{
      backgroundColor: '#FFFFFF',
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
      <View >
        <FlatList showsVerticalScrollIndicator={false}
          data={DataList}
          renderItem={({ item }) => <PendingTaskDetails data={item} />}
          contentContainerStyle={{ gap: 10, padding: 10 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleGetTaskList} />
          }
        />
      </View>
    </CardContainer3>
  )
}

export default PendingTaskPage