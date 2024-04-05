import React from 'react'
import { Stack } from 'expo-router';

const ChartReportLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="GetActivityStatusDataListDetailsInfo" options={{ title: 'Activity Task List', headerShown: true }} />
      <Stack.Screen name="GetComplianceStatusDataListDetailsInfo" options={{ title: 'Compiance Task List', headerShown: true }} />
    </Stack>
  )
}

export default ChartReportLayout