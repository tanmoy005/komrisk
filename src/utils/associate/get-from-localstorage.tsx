import AsyncStorage from "@react-native-async-storage/async-storage";

const getDataFromAsyncStorage = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        } else {
            return undefined;
        }
    } catch (e) {
        return undefined;
    }
};
export default getDataFromAsyncStorage;