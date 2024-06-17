import * as SecureStore from 'expo-secure-store';

const sanitizeKey = (key) => {
  return key.replace(/[^a-zA-Z0-9._-]/g, '_');
};

const SecureStorage = {
  async getItem(key) {
    const sanitizedKey = sanitizeKey(key);
    return await SecureStore.getItemAsync(sanitizedKey);
  },
  async setItem(key, value) {
    const sanitizedKey = sanitizeKey(key);
    await SecureStore.setItemAsync(sanitizedKey, value);
  },
  async removeItem(key) {
    const sanitizedKey = sanitizeKey(key);
    await SecureStore.deleteItemAsync(sanitizedKey);
  }
};

export default SecureStorage;
