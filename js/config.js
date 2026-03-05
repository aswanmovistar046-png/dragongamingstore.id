// ============================================
// DRAGON GAMING STORE - KONFIGURASI
// Template Top Up Game Premium
// ============================================

// ==================== PENGATURAN MEREK ====================
const BRAND_CONFIG = {
    nama: 'Dragon Gaming',
    tagline: 'Cepat, Aman & Terjangkau',
    namaWebsite: 'Dragon Gaming Store',
    warnaUtama: '#ff6600',
    warnaAksen: '#0066ff'
};

// ==================== KONFIGURASI GAME ====================
const GAMES_CONFIG = [
    { 
        id: 'mlbb', 
        nama: 'Mobile Legends', 
        ikon: '/assets/images/ml.png',
        populer: true,
        membutuhkanServer: true,
        labelServer: 'ID Server'
    },
    { 
        id: 'pubgm', 
        nama: 'PUBG Mobile', 
        ikon: '/assets/images/PUBGmobile.png',
        populer: true,
        membutuhkanServer: true,
        labelServer: 'Character ID'
    },
    { 
        id: 'roblox', 
        nama: 'Roblox', 
        ikon: '/assets/images/Roblox_Logo_2025.png',
        populer: true,
        membutuhkanServer: true,
        labelServer: 'Roblox ID'
    },
    { 
        id: 'codm', 
        nama: 'Call of Duty Mobile', 
        ikon: '/assets/images/COD.webp',
        populer: false,
        membutuhkanServer: true,
        labelServer: 'Player ID'
    },
    { 
        id: 'efootball', 
        nama: 'eFootball', 
        ikon: '/assets/images/brandLogo.png',
        populer: false,
        membutuhkanServer: true,
        labelServer: 'Konami ID'
    },
    { 
        id: 'valorant', 
        nama: 'Valorant', 
        ikon: '/assets/images/valorant_tile.jpg',
        populer: false,
        membutuhkanServer: true,
        labelServer: 'Riot ID'
    }
];

// ==================== KONFIGURASI DENOMINASI ====================
const DENOMINATIONS = {
    mlbb: [
        { diamond: 86, harga: 19000 },
        { diamond: 172, harga: 36000 },
        { diamond: 257, harga: 53000 },
        { diamond: 514, harga: 99000 },
        { diamond: 1000, harga: 185000 },
        { diamond: 2000, harga: 365000 }
    ],
    pubgm: [
        { uc: 100, harga: 22000 },
        { uc: 250, harga: 49000 },
        { uc: 500, harga: 95000 },
        { uc: 1000, harga: 185000 },
        { uc: 2000, harga: 365000 }
    ],
    roblox: [
        { robux: 80, harga: 15000 },
        { robux: 400, harga: 65000 },
        { robux: 800, harga: 125000 },
        { robux: 1700, harga: 250000 },
        { robux: 4500, harga: 590000 }
    ],
    codm: [
        { cp: 50, harga: 12000 },
        { cp: 100, harga: 22000 },
        { cp: 200, harga: 42000 },
        { cp: 500, harga: 99000 },
        { cp: 1000, harga: 185000 }
    ],
    efootball: [
        { coin: 100, harga: 25000 },
        { coin: 500, harga: 115000 },
        { coin: 1000, harga: 220000 },
        { coin: 2000, harga: 420000 }
    ],
    valorant: [
        { vp: 125, harga: 25000 },
        { vp: 275, harga: 49000 },
        { vp: 525, harga: 89000 },
        { vp: 1100, harga: 175000 },
        { vp: 2200, harga: 340000 }
    ]
};

// ==================== KONFIGURASI METODE PEMBAYARAN ====================
const PAYMENT_METHODS = {
    bank: [
        { nama: 'BRI', norek: '1234567890', penerima: 'Dragon Gaming' },
        { nama: 'Mandiri', norek: '0987654321', penerima: 'Dragon Gaming' },
        { nama: 'BNI', norek: '1122334455', penerima: 'Dragon Gaming' }
    ],
    ewallet: [
        { nama: 'DANA', norek: '081234567890', penerima: 'Dragon Gaming' },
        { nama: 'OVO', norek: '081234567890', penerima: 'Dragon Gaming' },
        { nama: 'GoPay', norek: '081234567890', penerima: 'Dragon Gaming' },
        { nama: 'ShopeePay', norek: '081234567890', penerima: 'Dragon Gaming' }
    ]
};

// ==================== KONFIGURASI BANNER SLIDER ====================
const BANNERS = [
    {
        gambar: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop',
        headline: 'Siap Untuk Menang',
        subheadline: 'Top up game favorit Anda secara instan',
        judul: 'Cepat, Aman & Terjangkau',
        teksTombol: 'Top Up Sekarang'
    },
    {
        gambar: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=600&fit=crop',
        headline: 'Naikkan Level Sekarang',
        subheadline: 'Tidak ada waktu tunggu, langsung masuk',
        judul: 'Pengiriman Instan',
        teksTombol: 'Belanja Sekarang'
    },
    {
        gambar: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=600&fit=crop',
        headline: 'Bermain Tanpa Batas',
        subheadline: 'Kami siap membantu kapan saja',
        judul: 'Dukungan 24/7',
        teksTombol: 'Mulai Sekarang'
    }
];

// ==================== HITUNG MUNDUR PROMO ====================
const PROMO_COUNTDOWN = {
    targetDate: '2025-12-31T23:59:59',
    pesan: 'Flash Sale Berakhir Dalam:'
};

// ==================== DATA TESTIMONI ====================
const TESTIMONIALS = [
    {
        nama: 'Andi Pratama',
        game: 'Mobile Legends',
        rating: 5,
        teks: 'Pengiriman super cepat! Sangat direkomendasikan.',
        gambar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
        nama: 'Sarah',
        game: 'PUBG Mobile',
        rating: 5,
        teks: 'Harga terbaik di kota! Selalu terpercaya.',
        gambar: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
        nama: 'Budi Santoso',
        game: 'Roblox',
        rating: 4,
        teks: 'Layanan luar biasa dan support pelanggan yang baik.',
        gambar: 'https://randomuser.me/api/portraits/men/2.jpg'
    }
];

// ==================== DATA WHY CHOOSE US ====================
const WHY_CHOOSE_US = [
    {
        ikon: 'fas fa-bolt',
        judul: 'Pengiriman Instan',
        deskripsi: 'Item Anda akan dikirim dalam hitungan detik setelah konfirmasi pembayaran.'
    },
    {
        ikon: 'fas fa-shield-alt',
        judul: 'Pembayaran Aman',
        deskripsi: 'Kami menggunakan sistem pembayaran terenkripsi untuk melindungi transaksi Anda.'
    },
    {
        ikon: 'fas fa-headset',
        judul: 'Dukungan 24/7',
        deskripsi: 'Tim kami tersedia kapan saja untuk membantu Anda dengan pertanyaan apa pun.'
    }
];

// ==================== DATA ADMIN (Sample) ====================
const ADMIN_ORDERS = [
    { id: 'ORD-001', game: 'Mobile Legends', jumlah: 'Rp 36.000', status: 'sukses', tanggal: '2024-01-15' },
    { id: 'ORD-002', game: 'PUBG Mobile', jumlah: 'Rp 95.000', status: 'pending', tanggal: '2024-01-15' },
    { id: 'ORD-003', game: 'Roblox', jumlah: 'Rp 65.000', status: 'batal', tanggal: '2024-01-14' },
    { id: 'ORD-004', game: 'Call of Duty', jumlah: 'Rp 185.000', status: 'sukses', tanggal: '2024-01-14' },
    { id: 'ORD-005', game: 'Mobile Legends', jumlah: 'Rp 53.000', status: 'pending', tanggal: '2024-01-13' }
];

// ==================== FUNGSI FORMAT RUPIAH ====================
function formatRupiah(angka) {
    return 'Rp ' + angka.toLocaleString('id-ID');
}

// ==================== AMBIL PESANAN DARI LOCALSTORAGE ====================
function getOrders() {
    const orders = localStorage.getItem('dragonGamingOrders');
    return orders ? JSON.parse(orders) : [];
}

// ==================== SIMPAN PESANAN KE LOCALSTORAGE ====================
function saveOrder(order) {
    const orders = getOrders();
    orders.unshift(order);
    localStorage.setItem('dragonGamingOrders', JSON.stringify(orders));
}
