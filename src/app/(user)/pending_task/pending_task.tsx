import React from 'react';
import { View, Button } from 'react-native';

import { router } from 'expo-router';

const Pending_task = () => {
  
  const goToSecondScreen = () => {
    router.push('/(user)/pending_task/pending_task_details');
  };

  return (
    <View>
      <Button title="Go to Second Screen" onPress={goToSecondScreen} />
    </View>
  );
};

export default Pending_task;
