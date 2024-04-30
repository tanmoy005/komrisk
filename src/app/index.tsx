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

  // console.log("session",session);
  // const authUserDetails = useSelector((state: RootState) => state.authUserDetails);
  
  // console.log("authUserDetails got log out",authUserDetails);

  // const authUserCred = useSelector((state: RootState) => state.authUserCred);

  // console.log("authUserCred got log out",authUserCred);

  
  // const authUserAccess = useSelector((state: RootState) => state.authUserAccess);

  // console.log("authUserAccess got log out",authUserAccess);


  // const baseUrl = useSelector((state: RootState) => state.baseUrl);

  // console.log("baseUrl got log out",baseUrl);

  // const incidentAvailableViews = useSelector((state: RootState) => state.incidentAvailableViews);

  // console.log("incidentAvailableViews got log out",incidentAvailableViews);

  // const comments = useSelector((state: RootState) => state.comments);

  // console.log("comments got log out",comments);

  

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
