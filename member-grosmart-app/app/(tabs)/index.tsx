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

        <View style={styles.pointsCard}>
          <Text style={styles.statLabel}>Saldo poin</Text>
          <Text style={styles.statValue}>{formatPoints(member.points)}</Text>
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
  pointsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: Brand.textMuted,
  },
  statValue: {
    marginTop: 6,
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  pullHint: {
    textAlign: 'center',
    fontSize: 12,
    color: Brand.textMuted,
    paddingBottom: 8,
  },
});
