import AsyncStorage from '@react-native-async-storage/async-storage';

import type { OtpPurpose, StoredOtp } from '@/types/auth';
import { formatPhoneDisplay, normalizePhone } from '@/utils/phone';

const OTP_PREFIX = '@grosmart/otp:';
const OTP_TTL_MS = 5 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function otpKey(phone: string) {
  return `${OTP_PREFIX}${phone}`;
}

function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function saveOtp(record: StoredOtp) {
  await AsyncStorage.setItem(otpKey(record.phone), JSON.stringify(record));
}

async function readOtp(phone: string): Promise<StoredOtp | null> {
  const raw = await AsyncStorage.getItem(otpKey(phone));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredOtp;
  } catch {
    return null;
  }
}

async function clearOtp(phone: string) {
  await AsyncStorage.removeItem(otpKey(phone));
}

function buildWhatsAppMessage(code: string): string {
  return `Kode OTP GrosMart Member Anda: *${code}*. Berlaku 5 menit. Jangan bagikan kode ini.`;
}

/**
 * Production: set EXPO_PUBLIC_WHATSAPP_OTP_API_URL to your backend
 * (Fonnte, Wablas, Twilio WhatsApp, Meta Cloud API, dll).
 */
async function dispatchWhatsAppOtp(phone: string, code: string): Promise<void> {
  const apiUrl = process.env.EXPO_PUBLIC_WHATSAPP_OTP_API_URL;
  if (!apiUrl) {
    if (__DEV__) {
      console.info(`[WhatsApp OTP demo] ${formatPhoneDisplay(phone)} → ${code}`);
    }
    return;
  }

  const response = await fetch(`${apiUrl.replace(/\/$/, '')}/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone,
      channel: 'whatsapp',
      message: buildWhatsAppMessage(code),
      code,
    }),
  });

  if (!response.ok) {
    throw new Error('Gagal mengirim OTP via WhatsApp. Coba lagi.');
  }
}

export async function sendWhatsAppOtp(
  rawPhone: string,
  purpose: OtpPurpose,
): Promise<{ ok: true; devCode?: string } | { ok: false; error: string }> {
  const phone = normalizePhone(rawPhone);
  if (!phone) {
    return { ok: false, error: 'Nomor WhatsApp tidak valid.' };
  }

  const code = generateCode();
  const record: StoredOtp = {
    code,
    phone,
    purpose,
    expiresAt: Date.now() + OTP_TTL_MS,
    attempts: 0,
  };

  try {
    await dispatchWhatsAppOtp(phone, code);
    await saveOtp(record);
    return {
      ok: true,
      devCode: process.env.EXPO_PUBLIC_WHATSAPP_OTP_API_URL ? undefined : code,
    };
  } catch {
    return { ok: false, error: 'Gagal mengirim OTP via WhatsApp.' };
  }
}

export async function verifyWhatsAppOtp(
  rawPhone: string,
  inputCode: string,
  expectedPurpose: OtpPurpose,
): Promise<{ ok: true; purpose: OtpPurpose } | { ok: false; error: string }> {
  const phone = normalizePhone(rawPhone);
  if (!phone) {
    return { ok: false, error: 'Nomor WhatsApp tidak valid.' };
  }

  const record = await readOtp(phone);
  if (!record) {
    return { ok: false, error: 'OTP belum diminta atau sudah kedaluwarsa.' };
  }

  if (record.purpose !== expectedPurpose) {
    return { ok: false, error: 'Sesi OTP tidak valid.' };
  }

  if (Date.now() > record.expiresAt) {
    await clearOtp(phone);
    return { ok: false, error: 'OTP sudah kedaluwarsa. Minta kode baru.' };
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    await clearOtp(phone);
    return { ok: false, error: 'Terlalu banyak percobaan. Minta OTP baru.' };
  }

  const code = inputCode.replace(/\D/g, '');
  if (code !== record.code) {
    record.attempts += 1;
    await saveOtp(record);
    return { ok: false, error: 'Kode OTP salah.' };
  }

  await clearOtp(phone);
  return { ok: true, purpose: record.purpose };
}

export async function resendWhatsAppOtp(
  rawPhone: string,
  purpose: OtpPurpose,
): Promise<{ ok: true; devCode?: string } | { ok: false; error: string }> {
  const phone = normalizePhone(rawPhone);
  if (phone) await clearOtp(phone);
  return sendWhatsAppOtp(rawPhone, purpose);
}
