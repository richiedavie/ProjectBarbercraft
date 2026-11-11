/**
 * Central copy repository for BarberCraft.
 * Strictly in Bahasa Indonesia without extra fluff.
 */
export const copy = {
  brand: "BarberCraft",
  logout: "Keluar",
  
  roles: {
    owner: "OWNER",
    capster: "CAPSTER",
  },

  ownerNav: {
    summary: "Ringkasan",
    shift: "Shift",
    applicants: "Pelamar",
    barbershop: "Barbershop",
  },

  capsterNav: {
    shift: "Shift",
    applications: "Lamaran",
    wallet: "Dompet",
    profile: "Profil",
  },

  ownerSummary: {
    title: "Ringkasan",
    newShiftBtn: "Buat Shift Baru",
    activeShifts: "Shift aktif",
    activeShiftsHelper: "Dibuka dan terisi",
    incomingApplicants: "Pelamar masuk",
    incomingApplicantsHelper: "Menunggu keputusan",
    totalExpenses: "Total pengeluaran",
    totalExpensesHelper: "Bulan ini",
    emptyHeading: "Belum ada shift yang diposting.",
  },

  ownerShift: {
    title: "Shift",
    newShiftBtn: "Buat Shift Baru",
    tabs: {
      active: "Aktif",
      filled: "Terisi",
      completed: "Selesai",
    },
    emptyActive: "Belum ada shift aktif.",
    emptyFilled: "Belum ada shift terisi.",
    emptyCompleted: "Belum ada shift selesai.",
  },

  ownerNewShift: {
    title: "Buat Shift Harian",
    sections: {
      time: "Waktu",
      requirements: "Kebutuhan",
      pay: "Bayaran",
      notes: "Catatan",
    },
    fields: {
      date: "Tanggal",
      startTime: "Jam Mulai",
      endTime: "Jam Selesai",
      skills: "Keahlian Dibutuhkan",
      capsterCount: "Jumlah Capster",
      minExperience: "Pengalaman Minimum (Tahun)",
      payAmount: "Tarif per Shift",
      notes: "Catatan Tambahan",
    },
    cancelBtn: "Batal",
    publishBtn: "Terbitkan Shift",
  },

  ownerApplicants: {
    title: "Pelamar",
    tabs: {
      pending: "Menunggu",
      accepted: "Diterima",
      rejected: "Ditolak",
    },
    viewProfile: "Lihat Profil",
    accept: "Terima",
    reject: "Tolak",
    acceptedStatus: "Diterima",
    contactBtn: "Hubungi",
    emptyHeading: "Belum ada pelamar.",
    viewShiftBtn: "Lihat Shift",
  },

  ownerBarbershop: {
    title: "Barbershop",
    cards: {
      profile: "Profil Barbershop",
      operational: "Operasional",
      sop: "SOP untuk Capster",
    },
    saveBtn: "Simpan Perubahan",
  },

  capsterFeed: {
    title: "Shift Tersedia",
    filters: {
      nearest: "Terdekat",
      today: "Hari ini",
      tomorrow: "Besok",
      highestPay: "Gaji tertinggi",
    },
    perShift: "/ shift",
    applyBtn: "Lamar Shift",
    appliedBtn: "Lamaran Terkirim",
    emptyHeading: "Belum ada shift di sekitar Anda.",
  },

  capsterApplications: {
    title: "Shift Saya",
    tabs: {
      processing: "Diproses",
      accepted: "Diterima",
      completed: "Selesai",
    },
    waitingNotice: "Menunggu konfirmasi owner",
    cancelApplication: "Batalkan Lamaran",
    openInMaps: "Buka di Maps",
    contactOwner: "Hubungi Owner via WhatsApp",
    emptyHeading: "Belum ada lamaran.",
    findShiftBtn: "Cari Shift",
  },

  capsterWallet: {
    title: "Dompet",
    weekEarnings: "Penghasilan minggu ini",
    withdrawableBalance: "Saldo dapat ditarik",
    withdrawBtn: "Tarik Dana",
    historyTitle: "Riwayat shift dibayar",
    withdrawModalTitle: "Tarik Dana",
    fields: {
      amount: "Jumlah",
      destination: "Tujuan",
      accountNumber: "Nomor rekening/e-wallet",
    },
    confirmWithdrawBtn: "Konfirmasi Penarikan",
  },

  capsterProfile: {
    title: "Profil",
    skillsCard: "Keahlian",
    galleryCard: "Galeri Hasil Potong",
    certificatesCard: "Sertifikat",
    addPhotoBtn: "Tambah Foto",
    addCertificateBtn: "Tambah Sertifikat",
    editProfileBtn: "Ubah Profil",
  },
} as const;

