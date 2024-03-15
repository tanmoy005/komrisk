import AsyncStorage from "@react-native-async-storage/async-storage";
// import secureLocalStorage from "react-secure-storage";


// export const SetLocalStorageItem = (id: string, data: any):void => {
//     console.log('data', data);

// //    secureLocalStorage.setItem(id, data)
// }


const setDataToAsyncStorage = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(key, value);
        console.log('Data stored successfully');
    } catch (e) {
        console.error('Failed to store data:', e);
    }
};

export default setDataToAsyncStorage;