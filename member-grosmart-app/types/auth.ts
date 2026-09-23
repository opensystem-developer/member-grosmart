export type OtpPurpose = 'login' | 'register';

export type PendingRegistration = {
  name: string;
  email: string;
  phone: string;
};

export type StoredOtp = {
  code: string;
  phone: string;
  purpose: OtpPurpose;
  expiresAt: number;
  attempts: number;
};
