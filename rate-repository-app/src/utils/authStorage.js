import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const key = `${this.namespace}:accessToken`;
    try {
      const accessToken = await AsyncStorage.getItem(key);
      return accessToken ? JSON.parse(accessToken) : null;
    } catch (error) {
      console.error('Error getting access token from storage:', error);
      return null;
    }
  }

  async setAccessToken(accessToken) {
    const key = `${this.namespace}:accessToken`;
    try {
      await AsyncStorage.setItem(key, JSON.stringify(accessToken));
    } catch (error) {
      console.error('Error setting access token to storage:', error);
    }
  }

  async removeAccessToken() {
    const key = `${this.namespace}:accessToken`;
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing access token from storage:', error);
    }
  }
}

export default AuthStorage;
