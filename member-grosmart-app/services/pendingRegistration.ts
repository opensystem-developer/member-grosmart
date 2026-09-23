import AsyncStorage from '@react-native-async-storage/async-storage';

import type { PendingRegistration } from '@/types/auth';

const KEY = '@grosmart/pending_registration';

export async function savePendingRegistration(data: PendingRegistration) {
  await AsyncStorage.setItem(KEY, JSON.stringify(data));
}

export async function readPendingRegistration(): Promise<PendingRegistration | null> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PendingRegistration;
  } catch {
    return null;
  }
}

export async function clearPendingRegistration() {
  await AsyncStorage.removeItem(KEY);
}
