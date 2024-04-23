
import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextType {
    token: string | null;
    loading: boolean;
    session:boolean;
    clearToken: () => void;
    
}

export const AuthContext = createContext<AuthContextType>({ token: null, loading: true,session:false ,clearToken: () => {}});

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [session,setSession] =useState(false);

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
    }, [token,session]);

    // Example function to clear token
    const clearToken = async () => {
      try {
        await AsyncStorage.removeItem('token'); // Assuming you store the token in AsyncStorage
        setToken(null);
        setSession(false);
      } catch (error) {
        Alert.alert('Error', 'Failed to clear token');
      }
    };

    return (
        <AuthContext.Provider value={{ token, loading,session,clearToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;


