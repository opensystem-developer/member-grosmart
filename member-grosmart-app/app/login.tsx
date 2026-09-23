import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DEMO_MEMBER_HINT } from '@/data/members';
import { useMember } from '@/context/MemberContext';
import { Brand } from '@/constants/theme';

export default function LoginScreen() {
  const { login } = useMember();
  const [memberNumber, setMemberNumber] = useState('GSM-001234');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    setError(null);
    setSubmitting(true);
    const result = await login(memberNumber);
    setSubmitting(false);
    if (result.ok) {
      router.replace('/(tabs)');
    } else {
      setError(result.error ?? 'Gagal masuk.');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.container}>
          <View style={styles.hero}>
            <Text style={styles.logo}>GrosMart</Text>
            <Text style={styles.subtitle}>Member Card — cek poin kapan saja</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Nomor Member</Text>
            <TextInput
              value={memberNumber}
              onChangeText={setMemberNumber}
              autoCapitalize="characters"
              autoCorrect={false}
              placeholder="Contoh: GSM-001234"
              placeholderTextColor="#9AA8A1"
              style={styles.input}
            />
            <Text style={styles.hint}>Demo: {DEMO_MEMBER_HINT}</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Pressable
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              onPress={onSubmit}
              disabled={submitting}>
              {submitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Masuk & Lihat Kartu</Text>
              )}
            </Pressable>
          </View>

          <Text style={styles.footer}>
            Aplikasi ini berjalan di iOS dan Android. Hubungkan ke backend Grosmart untuk data
            produksi.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Brand.surface,
  },
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  hero: {
    gap: 8,
  },
  logo: {
    fontSize: 36,
    fontWeight: '800',
    color: Brand.primary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: Brand.textMuted,
    lineHeight: 22,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8E5',
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2420',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D5DFDA',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    fontSize: 16,
    color: '#1A2420',
    backgroundColor: '#FAFCFB',
  },
  hint: {
    fontSize: 12,
    color: Brand.textMuted,
  },
  error: {
    color: Brand.danger,
    fontSize: 13,
  },
  button: {
    marginTop: 8,
    backgroundColor: Brand.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    fontSize: 12,
    color: Brand.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
});
