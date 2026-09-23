import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import MemberBarcode from '@/components/MemberBarcode';
import { Brand } from '@/constants/theme';
import type { Member } from '@/types/member';

const CARD_ASPECT = 1.586;
const HORIZONTAL_GUTTER = 40;

type Props = {
  member: Member;
  compact?: boolean;
};

type CardFaceProps = {
  member: Member;
  cardWidth: number;
  cardHeight: number;
  compact: boolean;
};

function CardFront({ member, cardWidth, cardHeight, compact }: CardFaceProps) {
  const radius = compact ? 16 : 20;

  return (
    <View style={[styles.cardShell, { width: cardWidth, borderRadius: radius }]}>
      <Image
        source={require('../assets/images/member-card-front.png')}
        style={{ width: cardWidth, height: cardHeight, borderRadius: radius }}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.82)']}
        style={[
          styles.footerScrim,
          {
            width: cardWidth,
            borderBottomLeftRadius: radius,
            borderBottomRightRadius: radius,
          },
        ]}>
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
  );
}

function CardBack({ member, cardWidth, cardHeight, compact }: CardFaceProps) {
  const radius = compact ? 16 : 20;
  const barcodeMaxWidth = cardWidth * 0.78;
  const stripBottom = cardHeight * 0.055;
  const stripHeight = cardHeight * 0.24;
  const stripHorizontal = cardWidth * 0.06;

  return (
    <View style={[styles.cardShell, { width: cardWidth, borderRadius: radius }]}>
      <Image
        source={require('../assets/images/member-card-back.png')}
        style={{ width: cardWidth, height: cardHeight, borderRadius: radius }}
        resizeMode="cover"
      />
      <View
        style={[
          styles.barcodeStrip,
          {
            left: stripHorizontal,
            width: cardWidth - stripHorizontal * 2,
            height: stripHeight,
            bottom: stripBottom,
          },
        ]}>
        <MemberBarcode
          value={member.memberNumber}
          maxWidth={barcodeMaxWidth}
          compact={compact}
          variant="strip"
        />
      </View>
    </View>
  );
}

export default function MemberCard({ member, compact = false }: Props) {
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = Math.min(screenWidth - (compact ? 48 : HORIZONTAL_GUTTER), 420);
  const cardHeight = cardWidth / CARD_ASPECT;
  const faceProps = { member, cardWidth, cardHeight, compact };

  return (
    <View style={[styles.wrapper, compact && styles.wrapperCompact]}>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Depan kartu</Text>
        <CardFront {...faceProps} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Belakang kartu · scan barcode</Text>
        <CardBack {...faceProps} />
      </View>

      {!compact ? (
        <Text style={styles.hint}>
          Tunjukkan bagian belakang (barcode) saat belanja di kasir.
        </Text>
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
  section: {
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  sectionLabel: {
    alignSelf: 'flex-start',
    marginLeft: 4,
    fontSize: 13,
    fontWeight: '700',
    color: Brand.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
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
  barcodeStrip: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 12,
    lineHeight: 18,
    color: Brand.textMuted,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
});
