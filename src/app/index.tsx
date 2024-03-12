import { View, Text } from 'react-native';
import React from 'react';
import Button from '@/src/components/Button';
import { Link, Redirect } from 'expo-router';
import Workspace from './(pages)';

const index = () => {
  return (
    <Redirect href={'/(pages)/'} />
    // <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
    //   <Workspace />
    //   {/* <Link href={'/(user)'} asChild>
    //     <Button text="User" />
    //   </Link> */}
    //   {/* <Link href={'/(admin)'} asChild>
    //     <Button text="Admin" />
    //   </Link> */}
    // </View>
  );
};

export default index;