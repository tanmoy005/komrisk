import { configureStore  } from "@reduxjs/toolkit";
import baseUrlSlice from "./slices/base-url-slice";


const store = configureStore(
    {
        reducer: {
            baseUrlSlice: baseUrlSlice
        }       
    }
);

export default store;