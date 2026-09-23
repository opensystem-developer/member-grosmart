import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { Brand, formatPoints, tierColor } from '@/constants/theme';
import type { Member } from '@/types/member';

type Props = {
  member: Member;
  compact?: boolean;
};

export default function MemberCard({ member, compact = false }: Props) {
  const tier = tierColor(member.tier);

  return (
    <View style={[styles.wrapper, compact && styles.wrapperCompact]}>
      <LinearGradient
        colors={[...Brand.cardGradient]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, compact && styles.cardCompact]}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.brand}>Grosmart Member</Text>
            <Text style={styles.tierLabel}>{member.tier} Tier</Text>
          </View>
          <View style={[styles.tierBadge, { borderColor: tier }]}>
            <Text style={[styles.tierBadgeText, { color: tier }]}>{member.tier}</Text>
          </View>
        </View>

        <View style={styles.memberRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{member.avatarInitials}</Text>
          </View>
          <View style={styles.memberInfo}>
            <Text style={styles.memberName}>{member.name}</Text>
            <Text style={styles.memberNumber}>{member.memberNumber}</Text>
          </View>
        </View>

        <View style={styles.pointsBlock}>
          <Text style={styles.pointsLabel}>Saldo Poin</Text>
          <Text style={styles.pointsValue}>{formatPoints(member.points)}</Text>
          <Text style={styles.pointsHint}>1 poin = Rp100 saat ditukar</Text>
        </View>

        {!compact && (
          <View style={styles.qrRow}>
            <View style={styles.qrBox}>
              <QRCode value={member.memberNumber} size={88} backgroundColor="#fff" color="#033D26" />
            </View>
            <View style={styles.qrCaption}>
              <Text style={styles.qrTitle}>Scan di kasir</Text>
              <Text style={styles.qrSubtitle}>
                Tunjukkan QR ini saat belanja untuk menambah atau menggunakan poin.
              </Text>
            </View>
          </View>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
  wrapperCompact: {
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  card: {
    borderRadius: 24,
    padding: 22,
    overflow: 'hidden',
  },
  cardCompact: {
    padding: 18,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  brand: {
    color: '#E8FFF3',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  tierLabel: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    marginTop: 4,
  },
  tierBadge: {
    borderWidth: 1.5,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  tierBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 22,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  memberNumber: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    marginTop: 4,
    letterSpacing: 0.5,
  },
  pointsBlock: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
  },
  pointsLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
  },
  pointsValue: {
    color: Brand.accent,
    fontSize: 36,
    fontWeight: '800',
    marginTop: 4,
    letterSpacing: -0.5,
  },
  pointsHint: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 11,
    marginTop: 6,
  },
  qrRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  qrBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
  },
  qrCaption: {
    flex: 1,
  },
  qrTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 6,
  },
  qrSubtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    lineHeight: 18,
  },
});
