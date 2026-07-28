import * as SecureStore from 'expo-secure-store';

export const tokenStorage = {
  async getToken(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  async saveToken(key: string, value: string): Promise<void> {
    try {
      return await SecureStore.setItemAsync(key, value);
    } catch {
      return;
    }
  },
};