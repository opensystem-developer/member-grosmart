# member-grosmart

Aplikasi **kartu member Grosmart** untuk mengecek poin — berjalan di **iOS** dan **Android** (React Native + Expo).

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

## Akun demo

| Nomor member | Nama |
|--------------|------|
| `GSM-001234` | Andi Pratama |
| `GSM-005678` | Siti Rahayu |

## Fitur

- Kartu member digital + QR code
- Saldo poin & progress reward
- Riwayat transaksi poin
- Profil member & keluar / ganti akun

Data saat ini masih **demo** (file `member-grosmart-app/data/members.ts`). Untuk produksi, hubungkan ke API backend Grosmart.
