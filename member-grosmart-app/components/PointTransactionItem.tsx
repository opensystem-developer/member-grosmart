import { StyleSheet, Text, View } from 'react-native';

import { Brand, formatDate, formatPoints } from '@/constants/theme';
import type { PointTransaction } from '@/types/member';

type Props = {
  transaction: PointTransaction;
};

export default function PointTransactionItem({ transaction }: Props) {
  const isEarn = transaction.type === 'earn';
  const sign = isEarn ? '+' : '−';

  return (
    <View style={styles.row}>
      <View style={[styles.icon, isEarn ? styles.iconEarn : styles.iconRedeem]}>
        <Text style={styles.iconText}>{isEarn ? '↑' : '↓'}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{transaction.description}</Text>
        <Text style={styles.meta}>{formatDate(transaction.date)}</Text>
        {transaction.store ? <Text style={styles.store}>{transaction.store}</Text> : null}
      </View>
      <Text style={[styles.amount, isEarn ? styles.amountEarn : styles.amountRedeem]}>
        {sign}
        {formatPoints(transaction.amount)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 14,
    gap: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E2E8E5',
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEarn: {
    backgroundColor: '#E6F7EF',
  },
  iconRedeem: {
    backgroundColor: '#FFEBEE',
  },
  iconText: {
    fontSize: 16,
    fontWeight: '700',
    color: Brand.primary,
  },
  body: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A2420',
  },
  meta: {
    fontSize: 12,
    color: Brand.textMuted,
    marginTop: 4,
  },
  store: {
    fontSize: 12,
    color: Brand.textMuted,
    marginTop: 2,
  },
  amount: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
  amountEarn: {
    color: Brand.primary,
  },
  amountRedeem: {
    color: Brand.danger,
  },
});
