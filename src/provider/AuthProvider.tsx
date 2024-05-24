
import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ScreenCapture from 'expo-screen-capture';
import { removeAuthUserDetails } from '@/src/store/slices/auth-user-details-slice';
import { removeAuthUserAccessDetails } from '@/src/store/slices/auth-user-access-details-slice';
import {removeBaseUrl} from '@/src/store/slices/base-url-slice';
import {removeAuthUserCred} from '@/src/store/slices/auth-user-cred-slice'
import {removeIncidentAvailableViews} from '@/src/store/slices/incident-available-views-slice';
import { useDispatch } from 'react-redux';
import { removeAllComments } from '../store/slices/task-comments-slice';

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextType {
    token: string | null;
    loading: boolean;
    session: boolean;
    clearToken: () => void;

}


export const AuthContext = createContext<AuthContextType>({ token: null, loading: true, session: false, clearToken: () => { } });


const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        async function preventScreenCapture() {
            await ScreenCapture.preventScreenCaptureAsync();
        }

        preventScreenCapture();

        // Optional: Return a cleanup function to allow screen capture when the app is closed or backgrounded
        return () => {
            ScreenCapture.allowScreenCaptureAsync();
        };
    }, []);
    useEffect(() => {
        const getToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');


                if (storedToken) {
                    setToken(storedToken);
                    setSession(true)
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to retrieve token');
            } finally {
                setLoading(false); // Set loading to false regardless of success or failure
            }
        };

        getToken();
    }, []);

    useEffect(() => {
    }, [token, session]);

    // Example function to clear token
    const clearToken = async () => {
        try {
            await AsyncStorage.removeItem('token'); // Assuming you store the token in AsyncStorage
            await AsyncStorage.removeItem('baseUrl'); // Assuming you store the token in AsyncStorage
            setToken(null);
            setSession(false);
            // dispatch(removeBaseUrl())
            dispatch(removeAuthUserCred())
            dispatch(removeAuthUserDetails());
            dispatch(removeAuthUserAccessDetails())
            dispatch(removeIncidentAvailableViews())
            //dispatch(removeAllComments())
        } catch (error) {
            Alert.alert('Error', 'Failed to clear token');
        }
    };

    return (
        <AuthContext.Provider value={{ token, loading, session, clearToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;


