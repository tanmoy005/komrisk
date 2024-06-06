// import Workspace from '@/src/app/(pages)';
// import React from 'react';

// import { AuthContext } from '@/src/provider/AuthProvider';

// import TabIndex from '@/src/app/(user)';


// const index = () => {
//   const { token, loading,session } = React.useContext(AuthContext);


//   if (session) 
//   {
//     return <TabIndex />;
//   } 
//   else 
//   {
//     // router.navigate('/(user)/dashboard/complianceStatus')
//      //router.navigate('./(pages)/index') ;
//     return <Workspace />;
//   }
// };

// export default index;


// // ================================ Updated on 06-06-2024 adding android version ================================ //

import React, { useState, useContext } from 'react';
import { View, Text, Alert, Platform } from 'react-native';
import * as Device from 'expo-device';

import Workspace from '@/src/app/(pages)';
import { AuthContext } from '@/src/provider/AuthProvider';
import TabIndex from '@/src/app/(user)';

const index = () => {
  const { token, loading, session } = useContext(AuthContext);
  const [isSupported, setIsSupported] = useState(true);

  const checkAndroidVersion = () => {
    if (Platform.OS === 'android') {
      const osVersion: string | null = Device.osVersion; // This returns a string like '9', '10', etc.
      const versionNumber = parseInt(osVersion ?? '0', 10); // Provide a default value of '0' if osVersion is null
      if (versionNumber <= 9) {
        setIsSupported(false);

      }
    }
  };

  if (session) {
    return <TabIndex />;
  } else {
    if (isSupported) {
      checkAndroidVersion();
      return <Workspace />;
    }

    if (!isSupported) {
      return (
        Alert.alert(
          'Unsupported Android Version',
          'Your Android version is not supported. Please upgrade your OS to above Android 9 to continue using this app.',
          [{ text: 'OK' }]
        )
      );
    }

    
  }
};

export default index;
