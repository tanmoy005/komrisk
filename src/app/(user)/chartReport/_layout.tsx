import React from 'react'
import { Stack } from 'expo-router';
import { headerColor } from '@/src/style';

const ChartReportLayout = () => {
  return (
    <Stack screenOptions={{
      headerStyle: headerColor
    }}>
      <Stack.Screen name="GetActivityStatusDataListDetailsInfo" options={{ title: 'Activity Task List', headerShown: true, headerTitleAlign: 'center' }} />
      <Stack.Screen name="GetComplianceStatusDataListDetailsInfo" options={{ title: 'Compliance Task List', headerShown: true, headerTitleAlign: 'center' }} />
      <Stack.Screen name="GetIncidentActivityDataListDetailsInfo" options={{ title: 'Incident Activity List', headerShown: true, headerTitleAlign: 'center' }} />
      <Stack.Screen name="GetImpactAnalysisDataListDetailsInfo" options={{ title: 'Impact Analysis List', headerShown: true, headerTitleAlign: 'center' }} />
      <Stack.Screen name="GetIncidentComparisonDataListDetailsInfo" options={{ title: 'Incident Comparison List', headerShown: true, headerTitleAlign: 'center' }} />
      <Stack.Screen name="[id]" options={{ title: 'Task Details', headerShown: true, headerTitleAlign: 'center' }} />
    </Stack>
  )
}

export default ChartReportLayout