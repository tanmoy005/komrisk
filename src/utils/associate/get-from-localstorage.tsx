// import  secureLocalStorage  from  "react-secure-storage";

import AsyncStorage from "@react-native-async-storage/async-storage";

// export const getLocalStorageItem = (id: string): any | null => {
//     return secureLocalStorage.getItem(id);
// };

const getDataFromAsyncStorage = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log('Retrieved data:', value);
        return value;
      } else {
        console.log('No data found');
        return undefined;
      }
    } catch (e) {
      console.error('Failed to retrieve data:', e);
      return undefined;
    }
  };
  export default getDataFromAsyncStorage;