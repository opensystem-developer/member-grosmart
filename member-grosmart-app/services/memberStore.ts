import AsyncStorage from '@react-native-async-storage/async-storage';

import { DEMO_MEMBERS } from '@/data/members';
import type { MemberProfile } from '@/types/member';
import { normalizePhone, phonesMatch } from '@/utils/phone';

const REGISTERED_KEY = '@grosmart/registered_members';

function cloneProfile(profile: MemberProfile): MemberProfile {
  return {
    ...profile,
    transactions: profile.transactions.map((t) => ({ ...t })),
  };
}

function initialsFromName(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

async function readRegistered(): Promise<Record<string, MemberProfile>> {
  const raw = await AsyncStorage.getItem(REGISTERED_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, MemberProfile>;
  } catch {
    return {};
  }
}

async function writeRegistered(members: Record<string, MemberProfile>) {
  await AsyncStorage.setItem(REGISTERED_KEY, JSON.stringify(members));
}

export async function getMemberByNumber(memberNumber: string): Promise<MemberProfile | null> {
  const key = memberNumber.trim().toUpperCase();
  const registered = await readRegistered();
  const source = registered[key] ?? DEMO_MEMBERS[key];
  return source ? cloneProfile(source) : null;
}

export async function findMemberByPhone(phone: string): Promise<MemberProfile | null> {
  const normalized = normalizePhone(phone);
  if (!normalized) return null;

  const registered = await readRegistered();
  const all = { ...DEMO_MEMBERS, ...registered };

  for (const profile of Object.values(all)) {
    if (phonesMatch(profile.phone, normalized)) {
      return cloneProfile(profile);
    }
  }
  return null;
}

export async function isPhoneRegistered(phone: string): Promise<boolean> {
  return !!(await findMemberByPhone(phone));
}

export async function registerMember(input: {
  name: string;
  email: string;
  phone: string;
}): Promise<MemberProfile> {
  const normalizedPhone = normalizePhone(input.phone);
  if (!normalizedPhone) {
    throw new Error('Nomor WhatsApp tidak valid.');
  }

  const existing = await findMemberByPhone(normalizedPhone);
  if (existing) {
    throw new Error('Nomor WhatsApp sudah terdaftar. Silakan login.');
  }

  const registered = await readRegistered();
  const memberNumber = `GSM-${String(Date.now()).slice(-6)}`;
  const today = new Date().toISOString().slice(0, 10);

  const profile: MemberProfile = {
    id: `mem_${memberNumber}`,
    memberNumber,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: normalizedPhone,
    tier: 'Bronze',
    points: 100,
    joinedAt: today,
    avatarInitials: initialsFromName(input.name),
    transactions: [
      {
        id: `tx_welcome_${memberNumber}`,
        date: new Date().toISOString(),
        description: 'Bonus member baru',
        amount: 100,
        type: 'earn',
        store: 'GrosMart',
      },
    ],
  };

  registered[memberNumber] = profile;
  await writeRegistered(registered);
  return cloneProfile(profile);
}

export function demoLoginPhonesHint(): string {
  return '081234567890 (Andi) · 081398765432 (Siti)';
}
