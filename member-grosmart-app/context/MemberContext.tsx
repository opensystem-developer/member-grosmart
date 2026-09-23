import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { DEMO_MEMBERS } from '@/data/members';
import type { MemberProfile, PointTransaction } from '@/types/member';

const STORAGE_KEY = '@grosmart/member_number';

type MemberContextValue = {
  member: MemberProfile | null;
  isLoading: boolean;
  isRefreshing: boolean;
  login: (memberNumber: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshPoints: () => Promise<void>;
  totalEarned: number;
  totalRedeemed: number;
};

const MemberContext = createContext<MemberContextValue | null>(null);

function cloneMember(number: string): MemberProfile | null {
  const source = DEMO_MEMBERS[number.trim().toUpperCase()];
  if (!source) return null;
  return {
    ...source,
    transactions: source.transactions.map((t) => ({ ...t })),
  };
}

function computeTotals(transactions: PointTransaction[]) {
  return transactions.reduce(
    (acc, tx) => {
      if (tx.type === 'earn') acc.earned += tx.amount;
      else acc.redeemed += tx.amount;
      return acc;
    },
    { earned: 0, redeemed: 0 },
  );
}

export function MemberProvider({ children }: { children: ReactNode }) {
  const [member, setMember] = useState<MemberProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved && mounted) {
          const profile = cloneMember(saved);
          if (profile) setMember(profile);
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const login = useCallback(async (memberNumber: string) => {
    const normalized = memberNumber.trim().toUpperCase();
    const profile = cloneMember(normalized);
    if (!profile) {
      return { ok: false, error: 'Nomor member tidak ditemukan.' };
    }
    await AsyncStorage.setItem(STORAGE_KEY, normalized);
    setMember(profile);
    return { ok: true };
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setMember(null);
  }, []);

  const refreshPoints = useCallback(async () => {
    if (!member) return;
    setIsRefreshing(true);
    await new Promise((r) => setTimeout(r, 800));
    const fresh = cloneMember(member.memberNumber);
    if (fresh) setMember(fresh);
    setIsRefreshing(false);
  }, [member]);

  const { earned: totalEarned, redeemed: totalRedeemed } = useMemo(
    () => computeTotals(member?.transactions ?? []),
    [member?.transactions],
  );

  const value = useMemo(
    () => ({
      member,
      isLoading,
      isRefreshing,
      login,
      logout,
      refreshPoints,
      totalEarned,
      totalRedeemed,
    }),
    [member, isLoading, isRefreshing, login, logout, refreshPoints, totalEarned, totalRedeemed],
  );

  return <MemberContext.Provider value={value}>{children}</MemberContext.Provider>;
}

export function useMember() {
  const ctx = useContext(MemberContext);
  if (!ctx) {
    throw new Error('useMember must be used within MemberProvider');
  }
  return ctx;
}
