import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import MemberBarcode from '@/components/MemberBarcode';
import { Brand, formatPoints, tierColor } from '@/constants/theme';
import type { Member } from '@/types/member';

const CARD_ASPECT = 1.586;
const HORIZONTAL_GUTTER = 40;

type Props = {
  member: Member;
  compact?: boolean;
};

export default function MemberCard({ member, compact = false }: Props) {
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = Math.min(screenWidth - (compact ? 48 : HORIZONTAL_GUTTER), 420);
  const cardHeight = cardWidth / CARD_ASPECT;
  const barcodeMaxWidth = cardWidth - 32;
  const tier = tierColor(member.tier);

  return (
    <View style={[styles.wrapper, compact && styles.wrapperCompact]}>
      <View style={[styles.cardShell, { width: cardWidth, borderRadius: compact ? 16 : 20 }]}>
        <Image
          source={require('../assets/images/member-card-front.png')}
          style={{ width: cardWidth, height: cardHeight, borderRadius: compact ? 16 : 20 }}
          resizeMode="cover"
          accessible
          accessibilityLabel="Kartu member GrosMart"
        />

        <View style={[styles.tierPill, { borderColor: tier }]}>
          <Text style={[styles.tierText, { color: tier }]}>{member.tier}</Text>
        </View>

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.82)']}
          style={[styles.footerScrim, { width: cardWidth, borderBottomLeftRadius: compact ? 16 : 20, borderBottomRightRadius: compact ? 16 : 20 }]}>
          <Text style={styles.memberName} numberOfLines={1}>
            {member.name}
          </Text>
          <Text style={styles.memberNumber}>{member.memberNumber}</Text>
        </LinearGradient>

        <View style={styles.pointsBadge}>
          <Text style={styles.pointsLabel}>Poin</Text>
          <Text style={styles.pointsValue}>{formatPoints(member.points)}</Text>
        </View>
      </View>

      {!compact ? (
        <View style={{ width: cardWidth }}>
          <MemberBarcode value={member.memberNumber} maxWidth={barcodeMaxWidth} />
          <Text style={styles.hint}>
            Tunjukkan barcode saat belanja untuk menambah atau menggunakan poin.
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: 16,
  },
  wrapperCompact: {
    gap: 12,
  },
  cardShell: {
    overflow: 'hidden',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 10,
    backgroundColor: '#1A1A1A',
  },
  tierPill: {
    position: 'absolute',
    top: 12,
    left: 12,
    borderWidth: 1.5,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  tierText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  footerScrim: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingHorizontal: 14,
    paddingTop: 28,
    paddingBottom: 12,
  },
  memberName: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  memberNumber: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 13,
    marginTop: 2,
    letterSpacing: 0.6,
  },
  pointsBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    minWidth: 72,
    backgroundColor: 'rgba(196, 30, 58, 0.92)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  pointsLabel: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  pointsValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 2,
  },
  hint: {
    marginTop: 10,
    fontSize: 12,
    lineHeight: 18,
    color: Brand.textMuted,
    textAlign: 'center',
    paddingHorizontal: 4,
  },
});
