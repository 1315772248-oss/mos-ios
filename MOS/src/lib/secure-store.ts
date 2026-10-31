import { SecureStorage } from "@aparajita/capacitor-secure-storage";

const KEYCHAIN_KEY = "mos_deepseek_api_key";

export async function saveApiKey(key: string): Promise<void> {
  await SecureStorage.set(KEYCHAIN_KEY, key.trim());
}

export async function getApiKey(): Promise<string | null> {
  try {
    return await SecureStorage.get(KEYCHAIN_KEY);
  } catch {
    return null;
  }
}

export async function clearApiKey(): Promise<void> {
  await SecureStorage.remove(KEYCHAIN_KEY);
}