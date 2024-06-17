import { configureStore } from '@reduxjs/toolkit';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from 'redux-persist';

import rootReducer from '@/src/store/rootReducer';
import SecureStorage from './secureStore'; // Import the updated SecureStore adapter

const persistConfig = {
    key: 'root',
    storage: SecureStorage, // Use SecureStorage with sanitized keys
    whitelist: ['authUserCred', 'authUserDetails', 'authUserAccess', 'incidentAvailableViews', 'comments'] // Only persist these slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
