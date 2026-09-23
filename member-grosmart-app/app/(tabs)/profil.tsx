import { router } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MemberCard from '@/components/MemberCard';
import { useMember } from '@/context/MemberContext';
import { Brand, formatDate } from '@/constants/theme';
import { formatPhoneDisplay } from '@/utils/phone';

export default function ProfileScreen() {
  const { member, logout } = useMember();

  if (!member) {
    return null;
  }

  const onLogout = () => {
    Alert.alert('Keluar', 'Yakin ingin keluar dari akun member?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/welcome');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Profil Member</Text>
        <MemberCard member={member} compact />

        <View style={styles.details}>
          <DetailRow label="Email" value={member.email} />
          <DetailRow
            label="WhatsApp"
            value={
              member.phone.startsWith('62')
                ? formatPhoneDisplay(member.phone)
                : member.phone
            }
          />
          <DetailRow
            label="Bergabung"
            value={formatDate(`${member.joinedAt}T12:00:00`)}
          />
        </View>

        <Pressable
          style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]}
          onPress={onLogout}>
          <Text style={styles.logoutText}>Keluar / Ganti Member</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={[styles.detailValue, accent ? { color: accent } : null]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Brand.surface,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 20,
    paddingBottom: 32,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A2420',
  },
  details: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8E5',
    overflow: 'hidden',
  },
  detailRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E2E8E5',
  },
  detailLabel: {
    fontSize: 12,
    color: Brand.textMuted,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A2420',
  },
  logoutButton: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Brand.danger,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  pressed: {
    opacity: 0.85,
  },
  logoutText: {
    color: Brand.danger,
    fontWeight: '700',
    fontSize: 15,
  },
});
