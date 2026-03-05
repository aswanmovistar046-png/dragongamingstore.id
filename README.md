# Dragon Gaming Store - Template Top Up Game Premium

Template website top up game yang siap pakai, responsif, dan mudah dikustomisasi.

## Fitur Utama

- 🎮 Support 6 Game: Mobile Legends, PUBG Mobile, Roblox, Call of Duty Mobile, eFootball, Valorant
- 💰 Harga dalam Rupiah Indonesia (IDR)
- 📱 Desain Responsif (Mobile First)
- 🎨 Tema Gelap dengan aksen Orange dan Biru
- 🔄 Slider Banner Otomatis
- 📝 Form Top Up 4 Langkah
- 💳 Multiple Metode Pembayaran (Bank & E-Wallet)
- 👨‍💼 Halaman Admin dengan LocalStorage
- ✨ Animasi Smooth & Toast Notifications

## Cara Penggunaan

1. Buka `index.html` di browser
2. Klik game yang ingin di-top up
3. Isi formulir langkah demi langkah
4. Upload bukti pembayaran
5. Pesanan akan tersimpan di LocalStorage
6. Buka `admin.html` untuk melihat dan kelola pesanan

## Kustomisasi

### Mengubah Harga
Edit file `js/config.js` pada bagian `DENOMINATIONS`:
```
javascript
const DENOMINATIONS = {
    mlbb: [
        { diamond: 86, harga: 19000 },
        // Tambahkan atau ubah harga di sini
    ]
};
```

### Mengubah Metode Pembayaran
Edit file `js/config.js` pada bagian `PAYMENT_METHODS`:
```
javascript
const PAYMENT_METHODS = {
    bank: [
        { nama: 'BRI', norek: '1234567890', penerima: 'Nama Toko' }
    ],
    ewallet: [
        { nama: 'DANA', norek: '081234567890', penerima: 'Nama Toko' }
    ]
};
```

### Menambahkan Game Baru
Tambahkan game baru di `GAMES_CONFIG` dan `DENOMINATIONS` pada `js/config.js`.

## Struktur File

```
.
├── index.html          # Halaman utama
├── topup.html          # Halaman top up
├── admin.html         # Halaman admin
├── css/
│   └── style.css      # Styling lengkap
├── js/
│   ├── config.js      # Konfigurasi (harga, game, dll)
│   ├── main.js       # Script halaman utama
│   └── topup.js      # Script halaman top up
└── assets/
    └── images/       # Folder untuk gambar game
```

## Requirements

- Browser modern (Chrome, Firefox, Edge, Safari)
- Koneksi internet untuk font dan icon
- LocalStorage support (untuk admin)

## Lisensi

Template ini dibuat untuk digunakan sebagai titik awal pengembangan website top up game. Silakan kustomisasi sesuai kebutuhan Anda.

---

© 2024 Dragon Gaming Store
