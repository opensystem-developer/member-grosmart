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
    <SafeAreaView style={styles.safe} edges={['left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshPoints}
            tintColor={Brand.primary}
            colors={[Brand.primary]}
          />
        }>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Halo, {member.name.split(' ')[0]}!</Text>
            <Text style={styles.subtitle}>Kartu member digital Anda</Text>
          </View>
          <Link href="/modal" style={styles.infoLink}>
            <Text style={styles.infoLinkText}>Info</Text>
          </Link>
        </View>

        <MemberCard member={member} />

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
    backgroundColor: Brand.surface,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
    gap: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A2420',
  },
  subtitle: {
    fontSize: 14,
    color: Brand.textMuted,
    marginTop: 4,
  },
  infoLink: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E2E8E5',
  },
  infoLinkText: {
    color: Brand.primary,
    fontWeight: '600',
    fontSize: 13,
  },
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8E5',
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2420',
    marginBottom: 12,
  },
  progressTrack: {
    height: 10,
    backgroundColor: '#E6F0EB',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Brand.primaryLight,
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
  },
});
