export type MemberTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export type PointTransactionType = 'earn' | 'redeem';

export interface PointTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: PointTransactionType;
  store?: string;
}

export interface Member {
  id: string;
  memberNumber: string;
  name: string;
  email: string;
  phone: string;
  tier: MemberTier;
  points: number;
  joinedAt: string;
  avatarInitials: string;
}

export interface MemberProfile extends Member {
  transactions: PointTransaction[];
}
