import { Link, router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AuthField from '@/components/auth/AuthField';
import AuthShell from '@/components/auth/AuthShell';
import PrimaryButton from '@/components/auth/PrimaryButton';
import { Brand } from '@/constants/theme';
import { isPhoneRegistered } from '@/services/memberStore';
import { savePendingRegistration } from '@/services/pendingRegistration';
import { sendWhatsAppOtp } from '@/services/whatsappOtp';
import { normalizePhone } from '@/utils/phone';

export default function RegisterMemberScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [devCode, setDevCode] = useState<string | null>(null);

  const onRegister = async () => {
    setError(null);
    setDevCode(null);

    if (!name.trim()) {
      setError('Nama lengkap wajib diisi.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Email tidak valid.');
      return;
    }
    if (!normalizePhone(phone)) {
      setError('Nomor WhatsApp tidak valid.');
      return;
    }

    setLoading(true);
    if (await isPhoneRegistered(phone)) {
      setLoading(false);
      setError('Nomor sudah terdaftar. Gunakan login member lama.');
      return;
    }

    await savePendingRegistration({
      name: name.trim(),
      email: email.trim(),
      phone,
    });

    const otp = await sendWhatsAppOtp(phone, 'register');
    setLoading(false);

    if (!otp.ok) {
      setError(otp.error);
      return;
    }

    if (otp.devCode) setDevCode(otp.devCode);

    router.push({
      pathname: '/verify-otp',
      params: {
        purpose: 'register',
        phone,
        devCode: otp.devCode ?? '',
      },
    });
  };

  return (
    <AuthShell
      title="Daftar Member Baru"
      subtitle="Isi data diri. Verifikasi nomor WhatsApp dengan OTP sebelum kartu member aktif.">
      <AuthField
        label="Nama Lengkap"
        value={name}
        onChangeText={setName}
        placeholder="Contoh: Budi Santoso"
        autoCapitalize="words"
      />
      <AuthField
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="email@domain.com"
      />
      <AuthField
        label="Nomor WhatsApp"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholder="08xxxxxxxxxx"
        hint="OTP pendaftaran dikirim ke nomor ini via WhatsApp."
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {devCode ? (
        <Text style={styles.devCode}>Demo OTP (tanpa API): {devCode}</Text>
      ) : null}

      <PrimaryButton label="Kirim OTP WhatsApp" onPress={onRegister} loading={loading} />

      <View style={styles.links}>
        <Text style={styles.linkHint}>Sudah terdaftar?</Text>
        <Link href="/login" style={styles.link}>
          Login member lama
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
