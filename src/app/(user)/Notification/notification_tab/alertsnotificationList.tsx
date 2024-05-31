

import React, { useState, useCallback } from 'react';
import { SafeAreaView, ActivityIndicator, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import HeadImageSection from '@/src/components/headSection/HeadImageSection';
import Seperator24 from '@/src/components/seperators/Seperator24';
import BtnFilterHeader from '@/src/components/tabs/BtnFilterHeader';
import NotificationList from '@/src/components/notification/nofificationList';
import { styles } from '@/src/style';

const alertsnotificationList: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(() => {
    setLoading(true);
    // Simulate an API call or data fetching
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the timeout as needed for your actual data fetching
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
    }, [fetchNotifications])
  );

  const handleSeeAll = () => {
    // Implement the functionality for the 'See All' button
  };

  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <HeadImageSection />
      <BtnFilterHeader
        firstBtnName='See All'
        fistBtnOnpress={handleSeeAll}
        // secondBtnName='Closed'
        secondBtnOnpress={handleSeeAll}
      />
      <Seperator24 />
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <NotificationList />
      )}
    </SafeAreaView>
  );
};

export default alertsnotificationList;
