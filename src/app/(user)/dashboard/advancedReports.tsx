import { Stack } from 'expo-router';

import UnderConstructionView from '@/src/components/UnderConstructionView';


export default function AdvancedReports() {
  return (
    <>
      <Stack.Screen options={{ title: 'Advanced Reports' }} />
      <UnderConstructionView/>
      {/* <PushNotificationExample /> */}

    </>
  );
}

