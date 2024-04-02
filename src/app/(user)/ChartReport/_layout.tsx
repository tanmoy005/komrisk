import React from 'react'
import { Stack } from 'expo-router';

const ChartReportLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="GetActivityStatusDataListDetailsInfo" options={{ title: 'Task list', headerShown: false }} />
    </Stack>
  )
}

export default ChartReportLayout