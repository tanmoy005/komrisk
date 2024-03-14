import { configureStore  } from "@reduxjs/toolkit";
import loginDataSlice from "./slices/login-data-slice";
import baseUrlSlice from "./slices/base-url-slice";
import counterSlice from "./slices/counter-slice";


// const store = configureStore(
//     {
//         reducer: {
//             baseUrlSlice: baseUrlSlice,
//             loginDataSlice: loginDataSlice
//         } 
        
        
//     }
// );
const store = configureStore({
    reducer: {
        baseUrl: counterSlice.reducer,
      // Add other slices as needed
    },
  });

export default store;