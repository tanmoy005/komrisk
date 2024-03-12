import  secureLocalStorage  from  "react-secure-storage";

export const getLocalStorageItem = (id: string): any | null => {
    return secureLocalStorage.getItem(id);
};