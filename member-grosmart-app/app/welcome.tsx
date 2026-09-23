import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PrimaryButton from '@/components/auth/PrimaryButton';
import { Brand } from '@/constants/theme';

export default function WelcomeAuthScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.logo}>GrosMart</Text>
          <Text style={styles.title}>Member Card</Text>
          <Text style={styles.subtitle}>
            Cek poin, tunjukkan barcode, dan kelola profil member dari ponsel Anda.
          </Text>
        </View>

        <View style={styles.actions}>
          <PrimaryButton label="Login Member Lama" onPress={() => router.push('/login')} />
          <PrimaryButton
            label="Daftar Member Baru"
            onPress={() => router.push('/register')}
            variant="ghost"
          />
        </View>

        <Text style={styles.note}>
          Verifikasi akun menggunakan OTP via WhatsApp untuk keamanan login dan pendaftaran.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Brand.surface,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 28,
    justifyContent: 'space-between',
  },
  hero: {
    gap: 10,
    marginTop: 24,
  },
  logo: {
    fontSize: 36,
    fontWeight: '800',
    color: Brand.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: Brand.textMuted,
    marginTop: 4,
  },
  actions: {
    gap: 12,
  },
  note: {
    fontSize: 12,
    lineHeight: 18,
    color: Brand.textMuted,
    textAlign: 'center',
  },
});
