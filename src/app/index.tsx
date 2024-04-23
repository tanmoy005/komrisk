// import React from 'react';
// import Workspace from './(pages)';
// import { Provider } from 'react-redux';
// import store from '../store';
// // import store from '../store';

// const index = () => {
//   return (
//     <Workspace />
//   );
// };

// export default index;


import React from 'react';
import Workspace from './(pages)';
import { Provider } from 'react-redux';
import store from '../store';
// import store from '../store';
import AuthProvider, {AuthContext} from '../provider/AuthProvider';
//import ComplianceStatus from './(user)/dashboard/complianceStatus';
import TabIndex from './(user)';


const index = () => {
  const { token, loading,session } = React.useContext(AuthContext);

  

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
