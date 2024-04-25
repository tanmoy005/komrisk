import NotificationDetails from '@/src/components/NotificationDetails';
import HeadImageSection from '@/src/components/headSection/HeadImageSection';
import Seperator24 from '@/src/components/seperators/Seperator24';
import BtnFilterHeader from '@/src/components/tabs/BtnFilterHeader';
import { styles } from '@/src/style';
import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';



const allnotificationList: React.FC = () => {

  const handleSeeAll = () => {

  }
  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <HeadImageSection />
      <BtnFilterHeader
        firstBtnName='See All'
        fistBtnOnpress={handleSeeAll}
        secondBtnName='Closed'
        secondBtnOnpress={handleSeeAll}
      />
      <Seperator24 />
      {/* <NotificationDetails /> */}
    </SafeAreaView>
  );
};

export default allnotificationList;