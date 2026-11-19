/* ============================================================
   AGRILINK - SCRIPT
   - Fitur login & daftar (simpan password via "Ingatkan saya")
   - Semua logika aplikasi (tab, listing, jelajah, profil, posting)
   ============================================================ */
"use strict";

// ---------- 1. STATE & SEED DATA ----------
const CATEGORIES = ['Semua', 'Buah', 'Sayuran', 'Perkebunan', 'Pangan & Padi', 'Rempah'];
const VISUAL_PRESETS = ['🍌', '☕', '🥥', '🥬', '🌾', '🍍', '🌶️', '🌴', '🍠', '🍋'];

const DEFAULT_PROFILE = {
  id: 'user-main',
  name: 'Anonim AgriLink',
  role: 'supplier',
  businessType: 'Pelaku Usaha',
  location: 'Pontianak, Kalbar',
  whatsapp: '628123456789'
};

const INITIAL_LISTINGS = [
  {
    id: 'item-1', type: 'offer', ownerId: 'sup-1', ownerName: 'Hendra Wijaya',
    ownerBusiness: 'Kelompok Tani Harapan', ownerWa: '628125551101', rating: '4.9',
    title: 'Pisang Kepok Kuning Super', category: 'Buah', price: 8500, unit: 'kg',
    qty: 1500, location: 'Sungai Kakap, Kubu Raya', emoji: '🍌',
    desc: 'Pisang kepok kuning tua pohon, cocok untuk olahan keripik maupun ekspor lokal. Panen rutin setiap Selasa dan Jumat.',
    createdAt: '2 jam lalu'
  },
  {
    id: 'item-2', type: 'offer', ownerId: 'sup-2', ownerName: 'Siti Rahmah',
    ownerBusiness: 'Koperasi Kopi Borneo', ownerWa: '628134442202', rating: '5.0',
    title: 'Biji Kopi Liberika Green Bean', category: 'Perkebunan', price: 68000, unit: 'kg',
    qty: 400, location: 'Sukadana, Kayong Utara', emoji: '☕',
    desc: 'Kopi Liberika khas lahan gambut Kayong Utara. Proses natural, kadar air 12%, aroma nangka kuat dan siap sangrai.',
    createdAt: '4 jam lalu'
  },
  {
    id: 'item-3', type: 'offer', ownerId: 'sup-3', ownerName: 'Pak Darmawan',
    ownerBusiness: 'Kebun Kelapa Mempawah', ownerWa: '628521113303', rating: '4.8',
    title: 'Kelapa Dalam Kupas Tua', category: 'Perkebunan', price: 4200, unit: 'kg',
    qty: 5000, location: 'Sungai Pinyuh, Mempawah', emoji: '🥥',
    desc: 'Kelapa tua daging tebal untuk kebutuhan santan industri maupun kopra. Siap muat ke truk di pinggir jalan provinsi.',
    createdAt: '6 jam lalu'
  },
  {
    id: 'item-4', type: 'offer', ownerId: 'sup-4', ownerName: 'Rina Marlina',
    ownerBusiness: 'Khatulistiwa Hidroponik', ownerWa: '628967774404', rating: '4.9',
    title: 'Pakcoy & Selada Hidroponik Segar', category: 'Sayuran', price: 18000, unit: 'kg',
    qty: 120, location: 'Pontianak Tenggara, Pontianak', emoji: '🥬',
    desc: 'Sayuran bebas pestisida, panen pagi hari. Siap suplai rutin untuk hotel, restoran, dan supermarket di area Pontianak.',
    createdAt: '1 hari lalu'
  },
  {
    id: 'item-5', type: 'offer', ownerId: 'sup-5', ownerName: 'Yohanes K.',
    ownerBusiness: 'Gapoktan Kapuas Hulu/Sintang', ownerWa: '628128885505', rating: '4.7',
    title: 'Beras Lokal Wangi Sintang', category: 'Pangan & Padi', price: 13500, unit: 'kg',
    qty: 3000, location: 'Sintang, Kalbar', emoji: '🌾',
    desc: 'Beras giling baru kualitas premium, pulen alami tanpa pemutih. Tersedia kemasan karung 25kg dan 50kg.',
    createdAt: '1 hari lalu'
  },
  {
    id: 'item-6', type: 'offer', ownerId: 'sup-6', ownerName: 'M. Ridwan',
    ownerBusiness: 'Kebun Nanas Galang', ownerWa: '628539996606', rating: '4.8',
    title: 'Nanas Madu & Nanas Susu Manis', category: 'Buah', price: 6000, unit: 'kg',
    qty: 2000, location: 'Singkawang Selatan, Singkawang', emoji: '🍍',
    desc: 'Nanas manis segar langsung dari kebun, ukuran rata-rata 1.2 - 1.5 kg per buah. Melayani pengiriman ke Pontianak & Sambas.',
    createdAt: '2 hari lalu'
  },
  {
    id: 'req-1', type: 'request', ownerId: 'buy-1', ownerName: 'CV Borneo Agro Ekspor',
    ownerBusiness: 'Distributor & Eksportir', ownerWa: '628115007701', rating: '4.9',
    title: 'Dicari: Lada Putih Biji Kering', category: 'Rempah', price: 92000, unit: 'kg',
    qty: 1000, location: 'Pontianak, Kalbar', emoji: '🌶️',
    desc: 'Membutuhkan pasokan lada putih kering bersih, kadar air maksimal 13%. Pembayaran tunai saat barang tiba di gudang Pontianak.',
    createdAt: '3 jam lalu'
  },
  {
    id: 'req-2', type: 'request', ownerId: 'buy-2', ownerName: 'UD Sumber Pangan Kaltim',
    ownerBusiness: 'Pengepul Besar / Grosir', ownerWa: '628125108802', rating: '4.8',
    title: 'Butuh Rutin: Pisang Kepok & Raja', category: 'Buah', price: 9000, unit: 'kg',
    qty: 2500, location: 'Balikpapan, Kaltim', emoji: '🍌',
    desc: 'Mencari mitra petani atau pengepul pisang untuk suplai mingguan ke pasar induk Balikpapan dan Samarinda.',
    createdAt: '5 jam lalu'
  },
  {
    id: 'req-3', type: 'request', ownerId: 'buy-3', ownerName: 'PT Sawit Mandiri Nusantara',
    ownerBusiness: 'Pabrik & Pengolahan', ownerWa: '628135209903', rating: '5.0',
    title: 'Kebutuhan TBS Kelapa Sawit Rakyat', category: 'Perkebunan', price: 2650, unit: 'kg',
    qty: 20000, location: 'Ketapang, Kalbar', emoji: '🌴',
    desc: 'Menerima Tandan Buah Segar (TBS) petani mandiri dan kelompok tani sekitar Ketapang. Harga kompetitif sesuai penetapan dinas.',
    createdAt: '1 hari lalu'
  },
  {
    id: 'req-4', type: 'request', ownerId: 'buy-4', ownerName: 'Dapur Segar Samarinda',
    ownerBusiness: 'Supplier Horeka', ownerWa: '628525301104', rating: '4.7',
    title: 'Dicari: Cabai Rawit Merah & Sayur', category: 'Sayuran', price: 45000, unit: 'kg',
    qty: 150, location: 'Samarinda, Kaltim', emoji: '🥬',
    desc: 'Butuh pasokan cabai rawit merah segar dan sayuran daun 3 kali seminggu untuk kebutuhan katering dan restoran.',
    createdAt: '2 hari lalu'
  }
];

// ---------- 2. STATE AKSES (Auth + App) ----------
let userProfile = JSON.parse(localStorage.getItem('agrilink_profile')) || { ...DEFAULT_PROFILE };
let listings = JSON.parse(localStorage.getItem('agrilink_listings')) || INITIAL_LISTINGS;
let contactLogs = JSON.parse(localStorage.getItem('agrilink_contacts')) || [];
let currentUser = null;

let activeTab = 'beranda';
let homeFeedType = 'offer';
let selectedHomeCategory = 'Semua';
let postFormType = userProfile.role === 'buyer' ? 'request' : 'offer';
let selectedEmoji = '🍌';

// ---------- 3. AUTH (LOGIN / DAFTAR / SIMPAN SANDI) ----------
const AUTH_USERS_KEY = 'agrilink_users';
const AUTH_SESSION_KEY = 'agrilink_session';
const AUTH_REMEMBER_KEY = 'agrilink_remembered';
const AUTH_PASS_KEY = 'agrilink_passwords'; // Simpan password (hash) untuk otomatis login

// Element container (must exist in HTML)
let $ = (id) => document.getElementById(id);

const authOverlay = $('auth-overlay');
const authForm = $('auth-form');
const loginFields = $('login-fields');
const registerFields = $('register-fields');
const authTabLogin = $('auth-tab-login');
const authTabRegister = $('auth-tab-register');
const authError = $('auth-error');

let authMode = 'login';

// ---------- UTILITY ----------
function hashPassword(pw) {
  // Hash sederhana (hanya untuk lokal/demo)
  let hash = 0;
  const enc = new TextEncoder().encode(pw);
  for (let i = 0; i < enc.length; i++) {
    hash = ((hash << 5) - hash) + enc[i];
    hash |= 0;
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

function getStoredPasswords() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_PASS_KEY)) || {};
  } catch { return {}; }
}

function saveStoredPassword(email, hash) {
  const store = getStoredPasswords();
  store[email.trim()] = hash;
  localStorage.setItem(AUTH_PASS_KEY, JSON.stringify(store));
}

function removeStoredPassword(email) {
  const store = getStoredPasswords();
  delete store[email.trim()];
  localStorage.setItem(AUTH_PASS_KEY, JSON.stringify(store));
}

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_USERS_KEY)) || [];
  } catch { return []; }
}

function saveUsers(users) {
  localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

function findUserByEmail(email) {
  return loadUsers().find(u => u.email === email.trim());
}

// ---------- AUTH ACTIONS ----------
function doLogin(email, password, remember) {
  const user = findUserByEmail(email);
  if (!user) {
    showAuthError('Email tidak ditemukan. Daftar terlebih dahulu.');
    return false;
  }
  if (user.passwordHash !== hashPassword(password)) {
    showAuthError('Kata sandi salah.');
    return false;
  }
  currentUser = user;
  userProfile = { ...user, role: user.role };
  saveState();

  // Simpan password (hash) jika "Ingatkan saya" aktif
  if (remember) {
    saveStoredPassword(user.email, user.passwordHash);
    showToast(`🏠 Login disimpan, ${user.name.split(' ')[0]}! Sandi akan otomatis isi berikut kali Anda buka aplikasi.`);
  } else {
    removeStoredPassword(user.email);
    showToast('Selamat datang, ' + user.name.split(' ')[0] + '!');
  }
  hideAuthOverlay();
  return true;
}

function doRegister(name, email, password, confirm, role) {
  if (!name.trim()) { showAuthError('Nama tidak boleh kosong.'); return false; }
  if (!email.trim()) { showAuthError('Email tidak boleh kosong.'); return false; }
  if (!password) { showAuthError('Kata sandi tidak boleh kosong.'); return false; }
  if (password !== confirm) { showAuthError('Kata sandi dan konfirmasi tidak cocok.'); return false; }
  if (password.length < 6) { showAuthError('Kata sandi minimal 6 karakter.'); return false; }
  if (findUserByEmail(email.trim())) { showAuthError('Email sudah terdaftar.'); return false; }

  const newUser = {
    id: 'u-' + Date.now(),
    name: name.trim(),
    email: email.trim(),
    passwordHash: hashPassword(password),
    role: role === 'buyer' ? 'buyer' : 'supplier'
  };
  const users = loadUsers();
  users.push(newUser);
  saveUsers(users);

  currentUser = newUser;
  userProfile = { ...newUser, role: newUser.role };
  saveState();
  localStorage.removeItem(AUTH_REMEMBER_KEY);
  localStorage.removeItem(AUTH_PASS_KEY);
  hideAuthOverlay();
  showToast('Daftar berhasil, selamat berselancar!');
  return true;
}

function logout() {
  currentUser = null;
  userProfile = { ...DEFAULT_PROFILE };
  localStorage.removeItem(AUTH_SESSION_KEY);
  localStorage.removeItem(AUTH_REMEMBER_KEY);
  localStorage.removeItem(AUTH_PASS_KEY);
  saveState();
  switchTab("beranda");
  showAuthOverlay();
  showToast("Anda keluar. Sampai jumpa kembali!");
}

// ---------- AUTH OVERLAY CONTROL ----------
function showAuthOverlay() {
  authOverlay.classList.remove('hidden');
  document.getElementById('main-content').classList.add('hidden');
  authMode = 'login';
  showAuthTab('login');
}

function hideAuthOverlay() {
  authOverlay.classList.add("hidden");
  document.getElementById("main-content").classList.remove("hidden");
  initApp();
}

function showAuthError(msg) {
  authError.textContent = msg;
  authError.classList.remove("hidden");
}

function clearAuthError() {
  authError.classList.add("hidden");
}

function showAuthTab(mode) {
  authMode = mode;
  loginFields.classList.toggle("hidden", mode !== "login");
  registerFields.classList.toggle("hidden", mode !== "register");
  authTabLogin.classList.toggle("active", mode === "login");
  authTabRegister.classList.toggle("active", mode === "register");
}

authTabLogin.addEventListener('click', () => {
  clearAuthError();
  showAuthTab('login');
});

authTabRegister.addEventListener('click', () => {
  clearAuthError();
  showAuthTab('register');
});

authForm.addEventListener('submit', (e) => {
  e.preventDefault();
  clearAuthError();
  if (authMode === 'login') {
    const email = $('f-email-login').value;
    const password = $('f-password-login').value;
    const remember = $('f-remember-login').checked;
    doLogin(email, password, remember);
  } else {
    const name = $('f-name-register').value;
    const email = $('f-email-register').value;
    const password = $('f-password-register').value;
    const confirm = $('f-confirm-register').value;
    const role = $('f-role-register').value;
    doRegister(name, email, password, confirm, role);
  }
});

// Toggle password visibility
function setupEyeToggle(inputId, eyeId) {
  const input = $(inputId);
  const eye = $(eyeId);
  if (!input || !eye) return;
  eye.addEventListener('click', () => {
    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
    eye.classList.toggle('text-agri-primary');
    eye.classList.toggle('text-slate-400');
    eye.innerHTML = type === 'password'
      ? '<i data-lucide="eye" class="w-4 h-4"></i>'
      : '<i data-lucide="eye-off" class="w-4 h-4"></i>';
    lucide.createIcons();
  });
}

setupEyeToggle('f-password-login', 'eye-icon-login');
setupEyeToggle('f-password-register', 'eye-icon-register');
setupEyeToggle('f-confirm-register', 'eye-icon-confirm');

// ---------- APP LOGIC ----------
function saveState() {
  localStorage.setItem('agrilink_profile', JSON.stringify(userProfile));
  localStorage.setItem('agrilink_listings', JSON.stringify(listings));
  localStorage.setItem('agrilink_contacts', JSON.stringify(contactLogs));
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-message').textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => { toast.classList.add('hidden'); }, 3000);
}

function formatRupiah(num) {
  return 'Rp ' + Number(num).toLocaleString('id-ID');
}

function switchTab(tabName) {
  activeTab = tabName;
  ['beranda', 'jelajah', 'pasang', 'profil'].forEach(t => {
    document.getElementById('tab-' + t).classList.add('hidden');
    const navBtn = document.getElementById('nav-' + t);
    if (t !== 'pasang') {
      navBtn.classList.remove('text-agri-dark', 'font-bold');
      navBtn.classList.add('text-slate-400', 'font-medium');
    }
  });
  document.getElementById('tab-' + tabName).classList.remove('hidden');
  if (tabName !== 'pasang') {
    const activeNav = document.getElementById('nav-' + tabName);
    activeNav.classList.remove('text-slate-400', 'font-medium');
    activeNav.classList.add('text-agri-dark', 'font-bold');
  }
  if (tabName === 'beranda') renderHomeFeed();
  if (tabName === 'jelajah') renderExplore();
  if (tabName === 'profil') renderProfile();
  document.getElementById('main-content').scrollTop = 0;
  lucide.createIcons();
}

function toggleRoleModal() {
  document.getElementById('role-modal').classList.toggle('hidden');
  lucide.createIcons();
}

function quickSwitchRole(newRole) {
  userProfile.role = newRole;
  postFormType = newRole === 'supplier' ? 'offer' : 'request';
  saveState();
  updateRoleUI();
  setPostType(postFormType);
  toggleRoleModal();
  showToast('Berhasil beralih ke mode ' + (newRole === 'supplier' ? 'Supplier' : 'Buyer'));
}

function updateRoleUI() {
  const isSupplier = userProfile.role === 'supplier';
  document.getElementById('header-role-label').textContent = isSupplier ? 'Supplier' : 'Buyer';
  document.getElementById('header-location').textContent = userProfile.location;
  const dot = document.getElementById('role-indicator-dot');
  dot.className = 'w-2 h-2 rounded-full ' + (isSupplier ? 'bg-agri-fresh' : 'bg-agri-gold');
  setPostType(isSupplier ? 'offer' : 'request');
}

// ---------- 6. BERANDA / LISTING ----------
function renderCategories() {
  document.getElementById('home-categories').innerHTML = CATEGORIES.map(cat =>
    `<button onclick="selectHomeCategory('${cat}')" class="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${selectedHomeCategory === cat ? 'bg-agri-dark text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:border-agri-primary'}">${cat}</button>`
  ).join('');
}

function selectHomeCategory(cat) {
  selectedHomeCategory = cat;
  renderCategories();
  renderHomeFeed();
}

function setHomeFeedType(type) {
  homeFeedType = type;
  const btnOffer = document.getElementById('btn-feed-offer');
  const btnRequest = document.getElementById('btn-feed-request');
  if (type === 'offer') {
    btnOffer.className = 'py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 bg-white text-agri-dark shadow-sm';
    btnRequest.className = 'py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 text-slate-600 hover:text-slate-900';
  } else {
    btnRequest.className = 'py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 bg-white text-amber-700 shadow-sm';
    btnOffer.className = 'py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 text-slate-600 hover:text-slate-900';
  }
  renderHomeFeed();
  lucide.createIcons();
}

function createListingCardHTML(item) {
  const isOffer = item.type === 'offer';
  return `
    <div onclick="openDetailModal('${item.id}')" class="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-agri-fresh active:scale-[0.99] transition cursor-pointer flex gap-3.5">
      <div class="w-20 h-20 rounded-xl ${isOffer ? 'bg-agri-light/50' : 'bg-amber-50'} flex flex-col items-center justify-center shrink-0 border ${isOffer ? 'border-agri-fresh/20' : 'border-amber-200/60'}">
        <span class="text-3xl">${item.emoji}</span>
        <span class="text-[9px] font-bold mt-1 px-1.5 py-0.5 rounded bg-white/90 text-slate-600 truncate max-w-[72px]">${item.category}</span>
      </div>
      <div class="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-1">
            <span class="text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-md ${isOffer ? 'bg-emerald-100 text-agri-dark' : 'bg-amber-100 text-amber-800'}">${isOffer ? 'Penawaran' : 'Permintaan'}</span>
            <span class="text-[10px] text-slate-400">${item.createdAt}</span>
          </div>
          <h4 class="font-bold text-sm text-slate-900 truncate mt-1">${item.title}</h4>
          <p class="text-xs font-extrabold ${isOffer ? 'text-agri-primary' : 'text-amber-600'} mt-0.5">${formatRupiah(item.price)} <span class="text-[11px] font-normal text-slate-500">/ ${item.unit}</span></p>
        </div>
        <div class="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-1.5 border-t border-slate-100">
          <span class="flex items-center gap-1 truncate max-w-[55%]"><i data-lucide="map-pin" class="w-3 h-3 text-agri-primary shrink-0"></i><span class="truncate">${item.location}</span></span>
          <span class="font-semibold text-slate-700 shrink-0">${isOffer ? 'Stok:' : 'Butuh:'} ${Number(item.qty).toLocaleString('id-ID')} ${item.unit}</span>
        </div>
      </div>
    </div>
  `;
}

function renderHomeFeed() {
  const container = document.getElementById('home-listing-container');
  const filtered = listings.filter(item => {
    const matchType = item.type === homeFeedType;
    const matchCat = selectedHomeCategory === 'Semua' || item.category === selectedHomeCategory;
    return matchType && matchCat;
  });
  container.innerHTML = filtered.length === 0
    ? `<div class="bg-white rounded-2xl p-8 text-center border border-slate-200/80"><p class="text-2xl mb-2">🌾</p><p class="text-xs font-bold text-slate-700">Belum ada listing di kategori ini</p><p class="text-[11px] text-slate-400 mt-1">Jadilah yang pertama memasang penawaran atau permintaan!</p></div>`
    : filtered.map(createListingCardHTML).join('');
  lucide.createIcons();
}

// ---------- 7. JELAJAH ----------
function renderExplore() {
  const query = document.getElementById('explore-search').value.toLowerCase();
  const typeFilter = document.getElementById('explore-type').value;
  const catFilter = document.getElementById('explore-category').value;
  const locFilter = document.getElementById('explore-location').value;
  const results = listings.filter(item => {
    const matchQuery = item.title.toLowerCase().includes(query) || item.location.toLowerCase().includes(query) || item.ownerName.toLowerCase().includes(query);
    const matchType = typeFilter === 'all' || item.type === typeFilter;
    const matchCat = catFilter === 'Semua' || item.category === catFilter;
    const matchLoc = locFilter === 'Semua' || item.location.toLowerCase().includes(locFilter.toLowerCase());
    return matchQuery && matchType && matchCat && matchLoc;
  });
  document.getElementById('explore-count').textContent = `Menampilkan ${results.length} komoditas`;
  const container = document.getElementById('explore-listing-container');
  container.innerHTML = results.length === 0
    ? `<div class="bg-white rounded-2xl p-8 text-center border border-slate-200/80"><p class="text-2xl mb-2">🔍</p><p class="text-xs font-bold text-slate-700">Komoditas tidak ditemukan</p><p class="text-[11px] text-slate-400 mt-1">Coba ubah kata kunci atau reset filter wilayah.</p></div>`
    : results.map(createListingCardHTML).join('');
  lucide.createIcons();
}

function resetExploreFilters() {
  document.getElementById('explore-search').value = '';
  document.getElementById('explore-type').value = 'all';
  document.getElementById('explore-category').value = 'Semua';
  document.getElementById('explore-location').value = 'Semua';
  renderExplore();
}

// ---------- 8. PASANG POSTING ----------
function renderVisualPicker() {
  document.getElementById('visual-picker').innerHTML = VISUAL_PRESETS.map(emoji =>
    `<button type="button" onclick="selectEmoji('${emoji}')" class="emoji-btn h-10 rounded-xl border text-lg flex items-center justify-center transition ${selectedEmoji === emoji ? 'bg-agri-light border-agri-primary scale-105' : 'bg-slate-50 border-slate-200'}">${emoji}</button>`
  ).join('');
}

function selectEmoji(emoji) {
  selectedEmoji = emoji;
  renderVisualPicker();
}

function setPostType(type) {
  postFormType = type;
  const isOffer = type === 'offer';
  document.getElementById('post-type-offer').className = isOffer
    ? 'py-2 rounded-lg text-xs font-bold transition bg-agri-primary text-white shadow-sm'
    : 'py-2 rounded-lg text-xs font-bold transition text-slate-600';
  document.getElementById('post-type-request').className = !isOffer
    ? 'py-2 rounded-lg text-xs font-bold transition bg-amber-500 text-white shadow-sm'
    : 'py-2 rounded-lg text-xs font-bold transition text-slate-600';
  document.getElementById('post-role-badge').textContent = isOffer ? 'Mode Supplier' : 'Mode Buyer';
  document.getElementById('post-form-title').textContent = isOffer ? 'Pasang Penawaran Produk' : 'Publikasikan Permintaan Pembelian';
  document.getElementById('post-form-subtitle').textContent = isOffer
    ? 'Tampilkan stok hasil panen Anda agar ditemukan oleh buyer & pengepul.'
    : 'Informasikan komoditas yang Anda butuhkan agar supplier menghubungi Anda.';
  document.getElementById('label-price').textContent = isOffer ? 'Harga Penawaran (Rp) *' : 'Target Harga Beli (Rp) *';
  document.getElementById('label-qty').textContent = isOffer ? 'Stok Tersedia *' : 'Volume Dibutuhkan *';
}

function handleCreatePost(e) {
  e.preventDefault();
  const newItem = {
    id: 'item-' + Date.now(),
    type: postFormType,
    ownerId: userProfile.id,
    ownerName: userProfile.name,
    ownerBusiness: userProfile.businessType,
    ownerWa: userProfile.whatsapp,
    rating: '4.9',
    title: document.getElementById('input-title').value.trim(),
    category: document.getElementById('input-category').value,
    price: Number(document.getElementById('input-price').value),
    unit: document.getElementById('input-unit').value,
    qty: Number(document.getElementById('input-qty').value),
    location: document.getElementById('input-location').value,
    emoji: selectedEmoji,
    desc: document.getElementById('input-desc').value.trim(),
    createdAt: 'Baru saja'
  };
  listings.unshift(newItem);
  saveState();
  document.getElementById('create-post-form').reset();
  selectedHomeCategory = 'Semua';
  renderCategories();
  setHomeFeedType(postFormType);
  switchTab('beranda');
  showToast(postFormType === 'offer' ? 'Penawaran produk berhasil dipublikasikan!' : 'Permintaan pembelian berhasil dipasang!');
}

// ---------- 9. MODAL & WHATSAPP ----------
function openDetailModal(itemId) {
  const item = listings.find(i => i.id === itemId);
  if (!item) return;
  const isOffer = item.type === 'offer';
  const badge = document.getElementById('modal-badge');
  badge.textContent = isOffer ? 'Penawaran Supplier' : 'Permintaan Buyer';
  badge.className = `text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${isOffer ? 'bg-agri-light text-agri-dark' : 'bg-amber-100 text-amber-800'}`;
  document.getElementById('modal-emoji').textContent = item.emoji;
  document.getElementById('modal-category-tag').textContent = item.category;
  document.getElementById('modal-title').textContent = item.title;
  document.getElementById('modal-price').textContent = formatRupiah(item.price);
  document.getElementById('modal-unit').textContent = `/ ${item.unit}`;
  document.getElementById('modal-qty-label').textContent = isOffer ? 'Stok Tersedia' : 'Volume Dibutuhkan';
  document.getElementById('modal-qty').textContent = `${Number(item.qty).toLocaleString('id-ID')} ${item.unit}`;
  document.getElementById('modal-location').textContent = item.location;
  document.getElementById('modal-desc').textContent = item.desc;
  const initials = item.ownerName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  document.getElementById('modal-owner-avatar').textContent = initials;
  document.getElementById('modal-owner-name').textContent = item.ownerName;
  document.getElementById('modal-owner-role').textContent = `${item.ownerBusiness} • ${item.location.split(',')[0]}`;
  document.getElementById('modal-owner-rating').textContent = item.rating;
  const waBtn = document.getElementById('btn-whatsapp-cta');
  waBtn.onclick = () => triggerWhatsAppContact(item);
  document.getElementById('detail-modal').classList.remove('hidden');
  lucide.createIcons();
}

function closeDetailModal() {
  document.getElementById('detail-modal').classList.add('hidden');
}

function triggerWhatsAppContact(item) {
  const logEntry = {
    id: 'contact-' + Date.now(),
    partnerName: item.ownerName,
    itemTitle: item.title,
    type: item.type,
    timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
  };
  contactLogs.unshift(logEntry);
  saveState();
  let phone = item.ownerWa.replace(/\D/g, '');
  if (phone.startsWith('0')) phone = '62' + phone.substring(1);
  const actionText = item.type === 'offer' ? 'penawaran produk' : 'permintaan pembelian';
  const message = `Halo ${item.ownerName}, saya ${userProfile.name} (${userProfile.location}) melihat ${actionText} *${item.title}* (${formatRupiah(item.price)}/${item.unit}) di aplikasi *AgriLink*. Apakah bisa kita diskusikan lebih lanjut?`;
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  showToast('Mencatat kontak & membuka WhatsApp...');
  setTimeout(() => { window.open(waUrl, '_blank'); }, 450);
}

// ---------- 10. PROFIL ----------
function renderProfile() {
  const initials = userProfile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  document.getElementById('profile-avatar').textContent = initials || 'AG';
  document.getElementById('profile-name').textContent = userProfile.name;
  document.getElementById('profile-business').textContent = userProfile.businessType;
  document.getElementById('profile-location').textContent = userProfile.location;
  const rolePill = document.getElementById('profile-role-pill');
  rolePill.textContent = userProfile.role === 'supplier' ? 'Supplier (Penjual)' : 'Buyer (Pembeli)';
  rolePill.className = `text-[10px] font-bold px-2 py-0.5 rounded-full ${userProfile.role === 'supplier' ? 'bg-agri-light text-agri-dark' : 'bg-amber-100 text-amber-800'}`;
  document.getElementById('edit-name').value = userProfile.name;
  document.getElementById('edit-role').value = userProfile.role;
  document.getElementById('edit-wa').value = userProfile.whatsapp;
  document.getElementById('edit-business').value = userProfile.businessType;
  document.getElementById('edit-location').value = userProfile.location;
  const myPosts = listings.filter(i => i.ownerId === userProfile.id);
  document.getElementById('stat-posts').textContent = myPosts.length;
  document.getElementById('stat-contacts').textContent = contactLogs.length;
  const myPostsContainer = document.getElementById('my-posts-container');
  myPostsContainer.innerHTML = myPosts.length === 0
    ? `<div class="bg-white p-4 rounded-xl border border-slate-200/70 text-center text-xs text-slate-400">Anda belum mempublikasikan penawaran atau permintaan.</div>`
    : myPosts.map(item => `
        <div class="bg-white p-3 rounded-xl border border-slate-200/80 flex items-center justify-between gap-2">
          <div class="flex items-center gap-2.5 min-w-0">
            <span class="text-2xl">${item.emoji}</span>
            <div class="truncate">
              <p class="text-xs font-bold text-slate-900 truncate">${item.title}</p>
              <p class="text-[11px] text-agri-primary font-semibold">${formatRupiah(item.price)} / ${item.unit}</p>
            </div>
          </div>
          <button onclick="deleteMyPost('${item.id}')" class="p-2 text-rose-500 hover:bg-rose-50 rounded-lg shrink-0" title="Hapus"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
        </div>
      `).join('');
  const historyContainer = document.getElementById('contact-history-container');
  historyContainer.innerHTML = contactLogs.length === 0
    ? `<div class="bg-white p-4 rounded-xl border border-slate-200/70 text-center text-xs text-slate-400">Belum ada riwayat klik hubungi WhatsApp.</div>`
    : contactLogs.slice(0, 5).map(log => `
        <div class="bg-white p-3 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
          <div><p class="font-bold text-slate-800">${log.partnerName}</p><p class="text-[11px] text-slate-500 truncate max-w-[210px]">Terkait: ${log.itemTitle}</p></div>
          <span class="text-[10px] font-semibold text-agri-primary bg-agri-light/60 px-2 py-1 rounded-md">${log.timestamp}</span>
        </div>
      `).join('');
  lucide.createIcons();
}

function saveProfileSettings() {
  userProfile.name = document.getElementById('edit-name').value.trim() || 'Pengguna AgriLink';
  userProfile.role = document.getElementById('edit-role').value;
  userProfile.whatsapp = document.getElementById('edit-wa').value.trim() || '628123456789';
  userProfile.businessType = document.getElementById('edit-business').value.trim() || 'Pelaku Usaha';
  userProfile.location = document.getElementById('edit-location').value.trim() || 'Pontianak, Kalbar';
  saveState();
  updateRoleUI();
  renderProfile();
  showToast('Profil & pengaturan WhatsApp disimpan!');
}

function deleteMyPost(itemId) {
  listings = listings.filter(i => i.id !== itemId);
  saveState();
  renderProfile();
  showToast('Postingan dihapus');
}

// ---------- 11. AUTH FLOW (startup) ----------
function checkAuth() {
  const remembered = localStorage.getItem(AUTH_REMEMBER_KEY);
  if (remembered) {
    try {
      const cred = JSON.parse(remembered);
      const user = findUserByEmail(cred.email);
      if (user && user.passwordHash === cred.passwordHash) {
        currentUser = user;
        userProfile = { ...user, role: user.role };
        saveState();
        hideAuthOverlay();
        showToast('Selamat datang kembali, ' + user.name.split(' ')[0] + '!');
        return;
      } else {
        localStorage.removeItem(AUTH_REMEMBER_KEY);
      }
    } catch { /* malformed */ }
  }
  // Cek penyimpanan password (hash) dari "Ingatkan saya"
  const stored = getStoredPasswords();
  const email = Object.keys(stored).find(e => stored[e] && findUserByEmail(e));
  if (email) {
    const user = findUserByEmail(email);
    if (user && user.passwordHash === stored[email]) {
      currentUser = user;
      userProfile = { ...user, role: user.role };
      saveState();
      hideAuthOverlay();
      showToast('Selamat datang kembali, ' + user.name.split(' ')[0] + '! (dari penyimpanan sandi)');
      return;
    } else {
      removeStoredPassword(email);
    }
  }
  showAuthOverlay();
}

function initApp() {
  updateRoleUI();
  renderCategories();
  renderHomeFeed();
  renderVisualPicker();
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  checkAuth();
});
