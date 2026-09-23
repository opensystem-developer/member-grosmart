import { StyleSheet, Text, View } from 'react-native';

import { Brand, formatPoints } from '@/constants/theme';

type Props = {
  balance: number;
  earned: number;
  redeemed: number;
};

export default function PointsSummary({ balance, earned, redeemed }: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.card, styles.cardPrimary]}>
        <Text style={styles.labelPrimary}>Saldo Poin</Text>
        <Text style={styles.balance}>{formatPoints(balance)}</Text>
      </View>
      <View style={styles.row}>
        <View style={[styles.card, styles.cardSmall]}>
          <Text style={styles.label}>Total Dapat</Text>
          <Text style={[styles.value, styles.earn]}>+{formatPoints(earned)}</Text>
        </View>
        <View style={[styles.card, styles.cardSmall]}>
          <Text style={styles.label}>Total Tukar</Text>
          <Text style={[styles.value, styles.redeem]}>−{formatPoints(redeemed)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8E5',
  },
  cardPrimary: {
    backgroundColor: Brand.primary,
    borderColor: Brand.primaryDark,
  },
  cardSmall: {
    flex: 1,
  },
  labelPrimary: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
  },
  balance: {
    color: Brand.accent,
    fontSize: 32,
    fontWeight: '800',
    marginTop: 6,
  },
  label: {
    fontSize: 12,
    color: Brand.textMuted,
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
  },
  earn: {
    color: Brand.primary,
  },
  redeem: {
    color: Brand.danger,
  },
});
