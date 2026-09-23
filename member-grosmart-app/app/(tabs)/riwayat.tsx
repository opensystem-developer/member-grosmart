import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PointTransactionItem from '@/components/PointTransactionItem';
import PointsSummary from '@/components/PointsSummary';
import { useMember } from '@/context/MemberContext';
import { Brand } from '@/constants/theme';

export default function PointsHistoryScreen() {
  const { member, refreshPoints, isRefreshing, totalEarned, totalRedeemed } = useMember();

  if (!member) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <FlatList
        data={member.transactions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.headerBlock}>
            <Text style={styles.title}>Cek Poin</Text>
            <Text style={styles.subtitle}>Riwayat penambahan dan penukaran poin</Text>
            <PointsSummary
              balance={member.points}
              earned={totalEarned}
              redeemed={totalRedeemed}
            />
            <Text style={styles.sectionTitle}>Transaksi Terakhir</Text>
          </View>
        }
        renderItem={({ item }) => <PointTransactionItem transaction={item} />}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshPoints}
            tintColor={Brand.primary}
            colors={[Brand.primary]}
          />
        }
        ListEmptyComponent={
          <Text style={styles.empty}>Belum ada transaksi poin.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Brand.surface,
  },
  list: {
    padding: 20,
    paddingBottom: 32,
  },
  headerBlock: {
    gap: 14,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A2420',
  },
  subtitle: {
    fontSize: 14,
    color: Brand.textMuted,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A2420',
    marginTop: 8,
  },
  empty: {
    textAlign: 'center',
    color: Brand.textMuted,
    marginTop: 24,
  },
});
