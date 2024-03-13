import { Redirect } from 'expo-router';

export default function TabIndex () {
  console.log('================================')
  return <Redirect href={'/dashboard/complianceStatus'} />;
};