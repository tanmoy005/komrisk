import HeadImageSection from '@/src/components/headSection/HeadImageSection';
import Seperator24 from '@/src/components/seperators/Seperator24';
import BtnFilterHeader from '@/src/components/tabs/BtnFilterHeader';
import { styles } from '@/src/style';
import React from 'react';
import { SafeAreaView } from 'react-native';
import NotificationList from '@/src/components/notification/nofificationList';

const alertsnotificationList: React.FC = () => {

  const handleSeeAll = () => {

  }

  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <HeadImageSection />
      <BtnFilterHeader
        firstBtnName='See All'
        fistBtnOnpress={handleSeeAll}
        //secondBtnName='Closed'
        secondBtnOnpress={handleSeeAll}
      />
      <Seperator24 />
      <NotificationList />
    </SafeAreaView>
  );
};

export default alertsnotificationList;

