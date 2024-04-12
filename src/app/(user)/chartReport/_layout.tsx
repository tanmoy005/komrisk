import React from 'react'
import { Stack } from 'expo-router';

const ChartReportLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="GetActivityStatusDataListDetailsInfo" options={{ title: 'Activity Task List', headerShown: true }} />
      <Stack.Screen name="GetComplianceStatusDataListDetailsInfo" options={{ title: 'Compliance Task List', headerShown: true }} />
      <Stack.Screen name="GetIncidentActivityDataListDetailsInfo" options={{ title: 'Incident Activity List', headerShown: true }} />
      <Stack.Screen name="GetImpactAnalysisDataListDetailsInfo" options={{ title: 'Impact Analysis List', headerShown: true }} />
      <Stack.Screen name="GetIncidentComparisonDataListDetailsInfo" options={{ title: 'Incident Comparison List', headerShown: true }} />
      <Stack.Screen name="[complianceId]" options={{ title: 'Task Details', headerShown: true }} />
    </Stack>
  )
}

export default ChartReportLayout