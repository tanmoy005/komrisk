import NotificationList from '@/src/components/notification/nofificationList';
import React from 'react';
import { View, Text } from 'react-native';

const compliancesnotificationList: React.FC = () => {
  return (
    <View>
      {/* <Text>This is the New Page of Compliances Notification List!</Text> */}
      <NotificationList />
    </View>
  );
};

export default compliancesnotificationList;