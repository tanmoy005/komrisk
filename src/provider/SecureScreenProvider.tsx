import React, { createContext, useContext, useCallback, ReactNode } from 'react';
import * as ScreenCapture from 'expo-screen-capture';

type ScreenCaptureContextType = {
    preventScreenCapture: () => Promise<void>;
    allowScreenCapture: () => Promise<void>;
};

const ScreenCaptureContext = createContext<ScreenCaptureContextType>({
    preventScreenCapture: async () => {},
    allowScreenCapture: async () => {}
});

export const useScreenCapture = () => useContext(ScreenCaptureContext);

interface ScreenCaptureProviderProps {
    children: ReactNode;
}

export const ScreenCaptureProvider: React.FC<ScreenCaptureProviderProps> = ({ children }) => {
    const preventScreenCapture = useCallback(async () => {
        await ScreenCapture.preventScreenCaptureAsync();
    }, []);

    const allowScreenCapture = useCallback(async () => {
        await ScreenCapture.allowScreenCaptureAsync();
    }, []);

    return (
        <ScreenCaptureContext.Provider value={{ preventScreenCapture, allowScreenCapture }}>
            {children}
        </ScreenCaptureContext.Provider>
    );
};
