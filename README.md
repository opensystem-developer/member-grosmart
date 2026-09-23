# member-grosmart

Aplikasi **kartu member GrosMart** untuk mengecek poin — berjalan di **iOS** dan **Android** (React Native + Expo).

## Lokasi proyek

Kode aplikasi ada di folder [`member-grosmart-app/`](./member-grosmart-app/).

## Menjalankan

```bash
cd member-grosmart-app
npm install
npm start
```

- **Android:** tekan `a` di terminal Expo, atau `npm run android` (emulator/device + Android Studio).
- **iOS:** tekan `i` di terminal Expo, atau `npm run ios` (memerlukan macOS + Xcode), atau instal **Expo Go** di iPhone dan scan QR code.
- **Web (preview):** `npm run web`

## Autentikasi (OTP WhatsApp)

1. **Welcome** — pilih *Login Member Lama* atau *Daftar Member Baru*
2. Masukkan nomor WhatsApp → OTP dikirim via WhatsApp
3. **Verifikasi OTP** (6 digit) → masuk ke kartu member

### Demo login (member lama)

| WhatsApp | Member |
|----------|--------|
| `081234567890` | Andi Pratama |
| `081398765432` | Siti Rahayu |

Tanpa backend OTP, kode demo ditampilkan di layar verifikasi (lihat juga log Metro).

### OTP produksi

Set variabel `EXPO_PUBLIC_WHATSAPP_OTP_API_URL` (lihat [`member-grosmart-app/.env.example`](./member-grosmart-app/.env.example)). Backend harus menerima `POST /send-otp` dan mengirim pesan WhatsApp (Fonnte, Wablas, Twilio, Meta Cloud API, dll.).

## Fitur

- Login member lama & register member baru (OTP WhatsApp)
- Kartu member digital (gambar depan resmi) + **barcode 1D** (Code 128)
- Bottom navigation: Kartu, Poin, Profil
- Saldo poin & progress reward
- Riwayat transaksi poin

Member baru disimpan lokal (AsyncStorage) untuk demo. Member demo ada di `member-grosmart-app/data/members.ts`.
