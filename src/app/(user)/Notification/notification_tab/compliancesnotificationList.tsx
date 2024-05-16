import NotificationDetails from '@/src/components/NotificationDetails';
import HeadImageSection from '@/src/components/headSection/HeadImageSection';
import NotificationList from '@/src/components/notification/nofificationList';
import Seperator24 from '@/src/components/seperators/Seperator24';
import BtnFilterHeader from '@/src/components/tabs/BtnFilterHeader';
import { styles } from '@/src/style';
import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import UnderConstructionView from '@/src/components/UnderConstructionView';

const compliancesnotificationList: React.FC = () => {


  const handleSeeAll = () => {


  }
  const handleClose = () => {

  }
  

  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <HeadImageSection />
      <BtnFilterHeader
        firstBtnName='See All'
        fistBtnOnpress={handleSeeAll}
        secondBtnName='Closed'
        secondBtnOnpress={handleClose}
      />
      <Seperator24 />
      
      <UnderConstructionView/>
      
    </SafeAreaView>

  );
};

export default compliancesnotificationList;