import Workspace from '@/src/app/(pages)';
import React from 'react';

import { AuthContext } from '@/src/provider/AuthProvider';

import TabIndex from '@/src/app/(user)';


const index = () => {
  const { token, loading,session } = React.useContext(AuthContext);

  // ===================== Checking for removing redux elements except comments ========================== //
  if (session) 
  {
    return <TabIndex />;
  } 
  else 
  {
    // router.navigate('/(user)/dashboard/complianceStatus')
     //router.navigate('./(pages)/index') ;
    return <Workspace />;
  }
};

export default index;
