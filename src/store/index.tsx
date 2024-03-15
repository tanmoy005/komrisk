import { configureStore  } from "@reduxjs/toolkit";
import loginDataSlice from "./slices/login-data-slice";
import baseUrlSlice from "./slices/base-url-slice";


const store = configureStore(
    {
        reducer: {
            baseUrlSlice: baseUrlSlice,
            loginDataSlice: loginDataSlice
        }       
    }
);

export default store;