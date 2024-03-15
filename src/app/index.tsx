import React from 'react';
import Workspace from './(pages)';
import { Provider } from 'react-redux';
import store from '../store';
// import store from '../store';

const index = () => {
  return (
    <Provider store={store}>
       <Workspace />
      {/* <Redirect href={'/(pages)/'} /> */}
    </Provider>
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