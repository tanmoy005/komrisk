import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../store/RootReducer';
import Workspace from './(pages)';

// import store from '../store';
const store = configureStore({
  reducer: rootReducer,
});

const index = () => (
  <Workspace />
);

// const index = () => {
//     <Provider store={store}>
//        <Workspace />
//       {/* <Redirect href={'/(pages)/'} /> */}
//     </Provider>
//     // <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
//     //   <Workspace />
//     //   {/* <Link href={'/(user)'} asChild>
//     //     <Button text="User" />
//     //   </Link> */}
//     //   {/* <Link href={'/(admin)'} asChild>
//     //     <Button text="Admin" />
//     //   </Link> */}
//     // </View>
//   );

// export default index;
AppRegistry.registerComponent('YourAppName', () => index);