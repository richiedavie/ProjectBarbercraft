import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function getUtcShiftDates(dayOffset: number, startHour: number, endHour: number) {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  d.setHours(0, 0, 0, 0);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  const startTime = `${String(startHour).padStart(2, "0")}.00`;
  const endTime = `${String(endHour).padStart(2, "0")}.00`;

  const startAt = new Date(`${year}-${month}-${day}T${String(startHour).padStart(2, "0")}:00:00+07:00`);
  const endAt = new Date(`${year}-${month}-${day}T${String(endHour).padStart(2, "0")}:00:00+07:00`);

  return { date: d, startTime, endTime, startAt, endAt };
}

async function main() {
  console.log("Menjalankan seed database BarberCraft (Indonesian dev data)...");

  // Hapus data dummy bawaan seed sebelumnya (jika ada) agar tidak duplikat saat db:seed dijalankan ulang,
  // tanpa menyentuh data barbershop/shift buatan user asli
  const seedEmails = [
    "owner@rootsbarbershop.com",
    "owner@gentlemencut.com",
    "capster@barbercraft.com",
    "budi.fade@gmail.com",
    "reza.classic@gmail.com",
    "dimas.newbie@gmail.com",
  ];
  const oldSeedUsers = await prisma.user.findMany({
    where: { email: { in: seedEmails } },
    select: { id: true, barberProfile: { select: { id: true } } },
  });
  const oldSeedUserIds = oldSeedUsers.map((u) => u.id);
  const oldSeedShopIds = oldSeedUsers
    .map((u) => u.barberProfile?.id)
    .filter(Boolean) as string[];

  if (oldSeedUserIds.length > 0) {
    await prisma.review.deleteMany({ where: { reviewerId: { in: oldSeedUserIds } } });
    await prisma.transaction.deleteMany({ where: { userId: { in: oldSeedUserIds } } });
    await prisma.booking.deleteMany({ where: { capsterId: { in: oldSeedUserIds } } });
    await prisma.shift.deleteMany({ where: { shopId: { in: oldSeedShopIds } } });
    await prisma.capsterProfile.deleteMany({ where: { userId: { in: oldSeedUserIds } } });
    await prisma.barberProfile.deleteMany({ where: { userId: { in: oldSeedUserIds } } });
    await prisma.user.deleteMany({ where: { id: { in: oldSeedUserIds } } });
  }

  // 1. Buat / Pastikan 2 Owner Barbershop
  const owner1 = await prisma.user.upsert({
    where: { email: "owner@rootsbarbershop.com" },
    update: {},
    create: {
      email: "owner@rootsbarbershop.com",
      name: "Bambang Pamungkas",
      phone: "6281234567890",
      role: "OWNER",
      barberProfile: {
        create: {
          shopName: "Roots Barbershop Kemang",
          address: "Jl. Kemang Raya No. 12, Bangka",
          city: "Jakarta Selatan",
          whatsapp: "6281234567890",
          chairCount: 4,
          openTime: "10.00",
          closeTime: "21.00",
          openDays: [1, 2, 3, 4, 5, 6, 7],
          sop: "Wajib hadir 15 menit sebelum shift, mengenakan seragam rapi dan sepatu tertutup, serta menjaga kebersihan kursi pangkas.",
        },
      },
    },
    include: { barberProfile: true },
  });

  const owner2 = await prisma.user.upsert({
    where: { email: "owner@gentlemencut.com" },
    update: {},
    create: {
      email: "owner@gentlemencut.com",
      name: "Dedi Prasetyo",
      phone: "6281987654321",
      role: "OWNER",
      barberProfile: {
        create: {
          shopName: "Gentlemen Cut Tebet",
          address: "Jl. Tebet Barat Dalam Raya No. 45",
          city: "Jakarta Selatan",
          whatsapp: "6281987654321",
          chairCount: 3,
          openTime: "09.00",
          closeTime: "20.00",
          openDays: [2, 3, 4, 5, 6, 7],
          sop: "Hospitality ramah, tawarkan handuk hangat setelah potong, bersihkan clipper dengan disinfektan.",
        },
      },
    },
    include: { barberProfile: true },
  });

  console.log("2 Barbershop Owners terdaftar:", owner1.name, "&", owner2.name);

  // 2. Buat / Pastikan 4 Capster
  const capster1 = await prisma.user.upsert({
    where: { email: "capster@barbercraft.com" },
    update: {},
    create: {
      email: "capster@barbercraft.com",
      name: "Arya Pratama",
      phone: "6289876543210",
      role: "CAPSTER",
      capsterProfile: {
        create: {
          experienceYears: 4,
          skills: ["Skin Fade", "Classic Cut", "Beard Trim", "Hot Towel Massage"],
          dailyRate: 250000,
          whatsapp: "6289876543210",
        },
      },
    },
    include: { capsterProfile: true },
  });

  const capster2 = await prisma.user.upsert({
    where: { email: "budi.fade@gmail.com" },
    update: {},
    create: {
      email: "budi.fade@gmail.com",
      name: "Budi Santoso",
      phone: "6281311223344",
      role: "CAPSTER",
      capsterProfile: {
        create: {
          experienceYears: 2,
          skills: ["Skin Fade", "Pompadour", "Hair Tattoo"],
          dailyRate: 220000,
          whatsapp: "6281311223344",
        },
      },
    },
    include: { capsterProfile: true },
  });

  const capster3 = await prisma.user.upsert({
    where: { email: "reza.classic@gmail.com" },
    update: {},
    create: {
      email: "reza.classic@gmail.com",
      name: "Reza Ramadhan",
      phone: "6285788990011",
      role: "CAPSTER",
      capsterProfile: {
        create: {
          experienceYears: 6,
          skills: ["Classic Cut", "Beard Trim", "Coloring"],
          dailyRate: 300000,
          whatsapp: "6285788990011",
        },
      },
    },
    include: { capsterProfile: true },
  });

  const capster4 = await prisma.user.upsert({
    where: { email: "dimas.newbie@gmail.com" },
    update: {},
    create: {
      email: "dimas.newbie@gmail.com",
      name: "Dimas Anggara",
      phone: "6287766554433",
      role: "CAPSTER",
      capsterProfile: {
        create: {
          experienceYears: 1,
          skills: ["Classic Cut", "Pompadour"],
          dailyRate: 180000,
          whatsapp: "6287766554433",
        },
      },
    },
    include: { capsterProfile: true },
  });

  console.log("4 Capster profesional terdaftar:", capster1.name, capster2.name, capster3.name, capster4.name);

  const shop1Id = owner1.barberProfile!.id;
  const shop2Id = owner2.barberProfile!.id;

  // 3. Buat Shift Realistis
  // Shift 1: Hari ini di Roots Barbershop (OPEN)
  const s1 = getUtcShiftDates(0, 10, 18);
  const shift1 = await prisma.shift.create({
    data: {
      shopId: shop1Id,
      title: "Shift Siang - Weekend Rush",
      date: s1.date,
      startTime: s1.startTime,
      endTime: s1.endTime,
      startAt: s1.startAt,
      endAt: s1.endAt,
      payAmount: 250000,
      capsterCount: 2,
      minExperienceYears: 2,
      requiredSkills: ["Skin Fade", "Classic Cut"],
      notes: "Trafik pelanggan biasanya padat setelah jam 13.00.",
      status: "OPEN",
    },
  });

  // Shift 2: Besok di Roots Barbershop (BOOKED - Kuota penuh)
  const s2 = getUtcShiftDates(1, 13, 21);
  const shift2 = await prisma.shift.create({
    data: {
      shopId: shop1Id,
      title: "Shift Malam Pengganti Sakit",
      date: s2.date,
      startTime: s2.startTime,
      endTime: s2.endTime,
      startAt: s2.startAt,
      endAt: s2.endAt,
      payAmount: 275000,
      capsterCount: 1,
      minExperienceYears: 3,
      requiredSkills: ["Skin Fade", "Beard Trim"],
      notes: "Menggantikan capster reguler yang cuti medis.",
      status: "BOOKED",
    },
  });

  // Shift 3: Lusa di Gentlemen Cut Tebet (OPEN)
  const s3 = getUtcShiftDates(2, 9, 17);
  await prisma.shift.create({
    data: {
      shopId: shop2Id,
      title: "Shift Pagi Gentlemen Cut",
      date: s3.date,
      startTime: s3.startTime,
      endTime: s3.endTime,
      startAt: s3.startAt,
      endAt: s3.endAt,
      payAmount: 260000,
      capsterCount: 1,
      minExperienceYears: 1,
      requiredSkills: ["Classic Cut", "Hot Towel Massage"],
      notes: "Pelanggan mayoritas pekerja kantoran dan pejabat lokal.",
      status: "OPEN",
    },
  });

  // Shift 4: 3 Hari lagi di Gentlemen Cut Tebet (OPEN)
  const s4 = getUtcShiftDates(3, 11, 19);
  await prisma.shift.create({
    data: {
      shopId: shop2Id,
      title: "Shift Reguler Event Grooming",
      date: s4.date,
      startTime: s4.startTime,
      endTime: s4.endTime,
      startAt: s4.startAt,
      endAt: s4.endAt,
      payAmount: 280000,
      capsterCount: 2,
      minExperienceYears: 2,
      requiredSkills: ["Pompadour", "Coloring"],
      notes: "Ada paket promo styling rambut akhir pekan.",
      status: "OPEN",
    },
  });

  // Shift 5: Minggu lalu - Selesai (COMPLETED) di Roots Barbershop
  const s5 = getUtcShiftDates(-5, 10, 18);
  const shiftPast = await prisma.shift.create({
    data: {
      shopId: shop1Id,
      title: "Shift Reguler Selesai",
      date: s5.date,
      startTime: s5.startTime,
      endTime: s5.endTime,
      startAt: s5.startAt,
      endAt: s5.endAt,
      payAmount: 250000,
      capsterCount: 1,
      minExperienceYears: 2,
      requiredSkills: ["Classic Cut"],
      status: "COMPLETED",
    },
  });

  console.log("5 Shift harian telah dibuat.");

  // 4. Buat Booking & Pelamar
  // Capster 1 melamar Shift 1 (PENDING)
  await prisma.booking.create({
    data: {
      shiftId: shift1.id,
      capsterId: capster1.capsterProfile!.id,
      status: "PENDING",
    },
  });

  // Capster 2 melamar Shift 1 (PENDING)
  await prisma.booking.create({
    data: {
      shiftId: shift1.id,
      capsterId: capster2.capsterProfile!.id,
      status: "PENDING",
    },
  });

  // Capster 3 diterima di Shift 2 (ACCEPTED)
  await prisma.booking.create({
    data: {
      shiftId: shift2.id,
      capsterId: capster3.capsterProfile!.id,
      status: "ACCEPTED",
    },
  });

  // Capster 1 menyelesaikan Shift Past (COMPLETED)
  const completedBooking = await prisma.booking.create({
    data: {
      shiftId: shiftPast.id,
      capsterId: capster1.capsterProfile!.id,
      status: "COMPLETED",
    },
  });

  // 5. Review & Ulasan untuk Capster 1 dari Owner 1
  await prisma.review.create({
    data: {
      bookingId: completedBooking.id,
      reviewerId: owner1.id,
      rating: 5,
      comment: "Potongan sangat rapi, customer puas dan datang tepat waktu. Sangat direkomendasikan!",
    },
  });

  // 6. Transaksi Dompet untuk Capster 1
  // Bayaran shift selesai (EARNING COMPLETED)
  await prisma.transaction.create({
    data: {
      userId: capster1.id,
      bookingId: completedBooking.id,
      type: "EARNING",
      amount: 250000,
      status: "COMPLETED",
    },
  });

  // Simulasi penarikan dana sebagian (WITHDRAWAL COMPLETED)
  await prisma.transaction.create({
    data: {
      userId: capster1.id,
      type: "WITHDRAWAL",
      amount: 100000,
      status: "COMPLETED",
      bankName: "BCA",
      accountNumber: "1234567890",
    },
  });

  console.log("Seeding selesai dengan sukses!");
}

main()
  .catch((e) => {
    console.error("Error saat seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
