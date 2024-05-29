import UnderConstructionView from '@/src/components/UnderConstructionView';
import HeadImageSection from '@/src/components/headSection/HeadImageSection';
import Seperator24 from '@/src/components/seperators/Seperator24';
import BtnFilterHeader from '@/src/components/tabs/BtnFilterHeader';
import { styles } from '@/src/style';
import React from 'react';
import { SafeAreaView } from 'react-native';

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
        //secondBtnName='Closed'
        secondBtnOnpress={handleClose}
      />
      <Seperator24 />
      
      <UnderConstructionView/>
      
    </SafeAreaView>

  );
};

export default compliancesnotificationList;