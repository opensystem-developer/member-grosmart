import { Link, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AuthField from '@/components/auth/AuthField';
import AuthShell from '@/components/auth/AuthShell';
import PrimaryButton from '@/components/auth/PrimaryButton';
import { Brand } from '@/constants/theme';
import { useMember } from '@/context/MemberContext';
import { findMemberByPhone, registerMember } from '@/services/memberStore';
import {
  clearPendingRegistration,
  readPendingRegistration,
} from '@/services/pendingRegistration';
import { resendWhatsAppOtp, verifyWhatsAppOtp } from '@/services/whatsappOtp';
import { formatPhoneDisplay, normalizePhone } from '@/utils/phone';
import type { OtpPurpose } from '@/types/auth';

export default function VerifyOtpScreen() {
  const params = useLocalSearchParams<{ purpose?: string; phone?: string; devCode?: string }>();
  const purpose = (params.purpose === 'register' ? 'register' : 'login') as OtpPurpose;
  const phone = String(params.phone ?? '');

  const { establishSession } = useMember();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [devCode, setDevCode] = useState<string | null>(params.devCode ? String(params.devCode) : null);

  const normalized = normalizePhone(phone);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const onVerify = async () => {
    setError(null);
    if (otp.replace(/\D/g, '').length !== 6) {
      setError('Masukkan 6 digit kode OTP.');
      return;
    }

    setLoading(true);
    const result = await verifyWhatsAppOtp(phone, otp, purpose);
    if (!result.ok) {
      setLoading(false);
      setError(result.error);
      return;
    }

    try {
      if (purpose === 'login') {
        const member = await findMemberByPhone(phone);
        if (!member) throw new Error('Member tidak ditemukan.');
        await establishSession(member.memberNumber);
      } else {
        const pending = await readPendingRegistration();
        if (!pending) {
          throw new Error('Data pendaftaran tidak ditemukan. Ulangi daftar.');
        }
        const created = await registerMember(pending);
        await clearPendingRegistration();
        await establishSession(created.memberNumber);
      }
      setLoading(false);
      router.replace('/(tabs)');
    } catch (e) {
      setLoading(false);
      setError(e instanceof Error ? e.message : 'Verifikasi gagal.');
    }
  };

  const onResend = async () => {
    if (cooldown > 0) return;
    setError(null);
    setResendLoading(true);
    const result = await resendWhatsAppOtp(phone, purpose);
    setResendLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    if (result.devCode) setDevCode(result.devCode);
    setCooldown(60);
  };

  if (!normalized) {
    return (
      <AuthShell title="OTP WhatsApp" subtitle="Nomor tidak valid.">
        <Text style={styles.error}>Parameter nomor WhatsApp hilang atau salah.</Text>
        <Link href="/login" style={styles.link}>
          Kembali ke login
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Verifikasi OTP WhatsApp"
      subtitle={`Masukkan 6 digit kode yang dikirim ke ${formatPhoneDisplay(normalized)}.`}>
      <AuthField
        label="Kode OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        maxLength={6}
        placeholder="123456"
        hint="Cek pesan WhatsApp dari GrosMart."
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {devCode ? (
        <Text style={styles.devCode}>Demo OTP (tanpa API): {devCode}</Text>
      ) : null}

      <PrimaryButton label="Verifikasi & Masuk" onPress={onVerify} loading={loading} />
      <PrimaryButton
        label={cooldown > 0 ? `Kirim ulang (${cooldown}s)` : 'Kirim ulang OTP WhatsApp'}
        onPress={onResend}
        loading={resendLoading}
        disabled={cooldown > 0}
        variant="ghost"
      />

      <View style={styles.links}>
        <Link href={purpose === 'register' ? '/register' : '/login'} style={styles.link}>
          Ubah nomor / kembali
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
    marginTop: 4,
  },
  link: {
    color: Brand.primary,
    fontWeight: '700',
    fontSize: 15,
  },
});
