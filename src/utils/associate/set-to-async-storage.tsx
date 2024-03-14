import AsyncStorage from "@react-native-async-storage/async-storage";

const setDataToAsyncStorage = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('Data stored successfully');
  } catch (e) {
    console.error('Failed to store data:', e);
  }
};

export default setDataToAsyncStorage;