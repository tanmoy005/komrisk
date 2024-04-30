import React from 'react';
import Workspace from './(pages)';
import { Provider } from 'react-redux';
// import store from '../store';
import AuthProvider, {AuthContext} from '../provider/AuthProvider';
//import ComplianceStatus from './(user)/dashboard/complianceStatus';
import TabIndex from './(user)';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';


const index = () => {
  const { token, loading,session } = React.useContext(AuthContext);

  // ===================== Checking for removing redux elements except comments ========================== //
  if (session) 
  {
    return <TabIndex />;
  } 
  else 
  {
    return <Workspace />;
  }
};

export default index;
