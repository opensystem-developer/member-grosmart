import { Link } from 'expo-router';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MemberCard from '@/components/MemberCard';
import { useMember } from '@/context/MemberContext';
import { Brand, formatPoints } from '@/constants/theme';

export default function CardScreen() {
  const { member, refreshPoints, isRefreshing } = useMember();

  if (!member) {
    return null;
  }

  const nextRewardAt = 15000;
  const progress = Math.min(member.points / nextRewardAt, 1);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshPoints}
            tintColor={Brand.primary}
            colors={[Brand.primary]}
          />
        }>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.greeting}>Halo, {member.name.split(' ')[0]}!</Text>
            <Text style={styles.subtitle}>Depan & belakang kartu dalam satu layar</Text>
          </View>
          <Link href="/modal" style={styles.infoLink}>
            <Text style={styles.infoLinkText}>Info</Text>
          </Link>
        </View>

        <MemberCard member={member} />

        <View style={styles.quickStats}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Saldo poin</Text>
            <Text style={styles.statValue}>{formatPoints(member.points)}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Tier</Text>
            <Text style={styles.statValue}>{member.tier}</Text>
          </View>
        </View>

        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Menuju voucher Rp150.000</Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressMeta}>
            {formatPoints(member.points)} / {formatPoints(nextRewardAt)} poin
          </Text>
        </View>

        <Text style={styles.pullHint}>Tarik ke bawah untuk memperbarui saldo poin</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 28,
    gap: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    paddingTop: 4,
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 14,
    color: Brand.textMuted,
    marginTop: 4,
    lineHeight: 20,
  },
  infoLink: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    minHeight: 44,
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E2E2E2',
  },
  infoLinkText: {
    color: Brand.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  quickStats: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#ECECEC',
  },
  statLabel: {
    fontSize: 12,
    color: Brand.textMuted,
  },
  statValue: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  progressTrack: {
    height: 10,
    backgroundColor: '#F3DDE2',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Brand.primary,
    borderRadius: 999,
  },
  progressMeta: {
    marginTop: 8,
    fontSize: 12,
    color: Brand.textMuted,
  },
  pullHint: {
    textAlign: 'center',
    fontSize: 12,
    color: Brand.textMuted,
    paddingBottom: 8,
  },
});
