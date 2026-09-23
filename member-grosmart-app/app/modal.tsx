import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Brand } from '@/constants/theme';

export default function AboutModal() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>GrosMart Member Card</Text>
      <Text style={styles.body}>
        Aplikasi ini dibuat dengan Expo (React Native) sehingga dapat dijalankan di iOS dan
        Android dari satu codebase.
      </Text>
      <View style={styles.box}>
        <Text style={styles.boxTitle}>Fitur</Text>
        <Text style={styles.item}>• Kartu member depan/belakang (desain resmi) + barcode 1D di belakang</Text>
        <Text style={styles.item}>• Login member lama & daftar member baru</Text>
        <Text style={styles.item}>• Verifikasi OTP via WhatsApp</Text>
        <Text style={styles.item}>• Cek saldo poin secara real-time (demo)</Text>
        <Text style={styles.item}>• Riwayat penambahan & penukaran poin</Text>
        <Text style={styles.item}>• Profil member & tier</Text>
      </View>
      <Text style={styles.footer}>
        Untuk produksi, sambungkan ke API Grosmart dan ganti data demo di folder data/.
      </Text>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A2420',
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: Brand.textMuted,
  },
  box: {
    backgroundColor: Brand.accentSoft,
    borderRadius: 14,
    padding: 16,
    gap: 8,
  },
  boxTitle: {
    fontWeight: '700',
    color: '#1A2420',
    marginBottom: 4,
  },
  item: {
    fontSize: 14,
    color: '#1A2420',
    lineHeight: 20,
  },
  footer: {
    fontSize: 12,
    color: Brand.textMuted,
    lineHeight: 18,
  },
});
