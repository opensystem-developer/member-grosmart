import { Link, router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AuthField from '@/components/auth/AuthField';
import AuthShell from '@/components/auth/AuthShell';
import PrimaryButton from '@/components/auth/PrimaryButton';
import { Brand } from '@/constants/theme';
import { demoLoginPhonesHint, findMemberByPhone } from '@/services/memberStore';
import { sendWhatsAppOtp } from '@/services/whatsappOtp';

export default function LoginMemberScreen() {
  const [phone, setPhone] = useState('081234567890');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [devCode, setDevCode] = useState<string | null>(null);

  const onSendOtp = async () => {
    setError(null);
    setDevCode(null);
    setLoading(true);

    const member = await findMemberByPhone(phone);
    if (!member) {
      setLoading(false);
      setError('Nomor belum terdaftar. Daftar sebagai member baru.');
      return;
    }

    const otp = await sendWhatsAppOtp(phone, 'login');
    setLoading(false);

    if (!otp.ok) {
      setError(otp.error);
      return;
    }

    if (otp.devCode) setDevCode(otp.devCode);

    router.push({
      pathname: '/verify-otp',
      params: {
        purpose: 'login',
        phone,
        devCode: otp.devCode ?? '',
      },
    });
  };

  return (
    <AuthShell
      title="Login Member Lama"
      subtitle="Masukkan nomor WhatsApp yang terdaftar. Kami kirim kode OTP via WhatsApp.">
      <AuthField
        label="Nomor WhatsApp"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholder="08xxxxxxxxxx"
        hint={`Demo: ${demoLoginPhonesHint()}`}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {devCode ? (
        <Text style={styles.devCode}>Demo OTP (tanpa API): {devCode}</Text>
      ) : null}

      <PrimaryButton label="Kirim OTP WhatsApp" onPress={onSendOtp} loading={loading} />

      <View style={styles.links}>
        <Text style={styles.linkHint}>Belum punya akun?</Text>
        <Link href="/register" style={styles.link}>
          Daftar member baru
        </Link>
      </View>
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  error: {
    color: Brand.danger,
    fontSize: 13,
  },
  devCode: {
    fontSize: 12,
    color: Brand.primaryDark,
    backgroundColor: Brand.accentSoft,
    padding: 10,
    borderRadius: 10,
  },
  links: {
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  linkHint: {
    fontSize: 13,
    color: Brand.textMuted,
  },
  link: {
    color: Brand.primary,
    fontWeight: '700',
    fontSize: 15,
  },
});
