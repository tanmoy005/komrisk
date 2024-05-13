import React from 'react';
import Workspace from './(pages)';
// import store from '../store';
import {AuthContext} from '../provider/AuthProvider';
//import ComplianceStatus from './(user)/dashboard/complianceStatus';
import TabIndex from './(user)';
import { router } from 'expo-router';


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
