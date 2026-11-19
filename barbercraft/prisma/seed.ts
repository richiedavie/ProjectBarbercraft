import { PrismaClient } from "@prisma/client";
import { hashPassword } from "better-auth/crypto";

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
  if (process.env.NODE_ENV === "production") {
    console.error("EROR: Seed database tidak boleh dijalankan di environment production!");
    process.exit(1);
  }

  console.log("Menjalankan seed database BarberCraft (Indonesian dev data)...");

  // Hapus data dummy bawaan seed sebelumnya jika ada
  const seedEmails = [
    "owner@roots.example.com",
    "owner@gentlemen.example.com",
    "arya@capster.example.com",
    "budi@capster.example.com",
    "reza@capster.example.com",
    "dimas@capster.example.com",
    // Clean old dev emails
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
    await prisma.session.deleteMany({ where: { userId: { in: oldSeedUserIds } } });
    await prisma.account.deleteMany({ where: { userId: { in: oldSeedUserIds } } });
    await prisma.user.deleteMany({ where: { id: { in: oldSeedUserIds } } });
  }

  // Hash password standar untuk dev akun via Better Auth crypto
  const defaultPasswordHash = await hashPassword("Password123!");

  // Helper untuk membuat user + account Better Auth
  async function createDevUser(data: {
    email: string;
    name: string;
    phone: string;
    role: "OWNER" | "CAPSTER";
    barberProfile?: {
      shopName: string;
      address: string;
      city: string;
      whatsapp: string;
      chairCount: number;
      openTime?: string;
      closeTime?: string;
      openDays?: number[];
      sop?: string;
    };
    capsterProfile?: {
      experienceYears: number;
      skills: string[];
      dailyRate: number;
      whatsapp: string;
    };
  }) {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        phone: data.phone,
        role: data.role,
        emailVerified: true,
        ...(data.barberProfile ? { barberProfile: { create: data.barberProfile } } : {}),
        ...(data.capsterProfile ? { capsterProfile: { create: data.capsterProfile } } : {}),
      },
      include: { barberProfile: true, capsterProfile: true },
    });

    await prisma.account.create({
      data: {
        userId: user.id,
        accountId: user.id,
        providerId: "credential",
        password: defaultPasswordHash,
      },
    });

    return user;
  }

  // 1. Buat 2 Owner Barbershop
  const owner1 = await createDevUser({
    email: "owner@roots.example.com",
    name: "Bambang Pamungkas",
    phone: "6281234567890",
    role: "OWNER",
    barberProfile: {
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
  });

  const owner2 = await createDevUser({
    email: "owner@gentlemen.example.com",
    name: "Dedi Prasetyo",
    phone: "6281987654321",
    role: "OWNER",
    barberProfile: {
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
  });

  console.log("2 Barbershop Owners terdaftar:", owner1.name, "&", owner2.name);

  // 2. Buat 4 Capster
  const capster1 = await createDevUser({
    email: "arya@capster.example.com",
    name: "Arya Pratama",
    phone: "6289876543210",
    role: "CAPSTER",
    capsterProfile: {
      experienceYears: 4,
      skills: ["Skin Fade", "Classic Cut", "Beard Trim", "Hot Towel Massage"],
      dailyRate: 250000,
      whatsapp: "6289876543210",
    },
  });

  const capster2 = await createDevUser({
    email: "budi@capster.example.com",
    name: "Budi Santoso",
    phone: "6281311223344",
    role: "CAPSTER",
    capsterProfile: {
      experienceYears: 2,
      skills: ["Skin Fade", "Pompadour", "Hair Tattoo"],
      dailyRate: 220000,
      whatsapp: "6281311223344",
    },
  });

  const capster3 = await createDevUser({
    email: "reza@capster.example.com",
    name: "Reza Ramadhan",
    phone: "6285788990011",
    role: "CAPSTER",
    capsterProfile: {
      experienceYears: 6,
      skills: ["Classic Cut", "Beard Trim", "Coloring"],
      dailyRate: 300000,
      whatsapp: "6285788990011",
    },
  });

  const capster4 = await createDevUser({
    email: "dimas@capster.example.com",
    name: "Dimas Anggara",
    phone: "6287766554433",
    role: "CAPSTER",
    capsterProfile: {
      experienceYears: 1,
      skills: ["Classic Cut", "Pompadour"],
      dailyRate: 180000,
      whatsapp: "6287766554433",
    },
  });

  console.log("4 Capster profesional terdaftar:", capster1.name, capster2.name, capster3.name, capster4.name);

  const shop1Id = owner1.barberProfile!.id;
  const shop2Id = owner2.barberProfile!.id;

  // 3. Buat Shift Realistis
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
      notes: "Prioritaskan pelanggan booking online terlebih dahulu.",
      status: "OPEN",
    },
  });

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
      minExperienceYears: 1,
      requiredSkills: ["Classic Cut"],
      status: "COMPLETED",
    },
  });

  console.log("5 Shift harian telah dibuat.");

  // 4. Buat Booking
  await prisma.booking.create({
    data: {
      shiftId: shift1.id,
      capsterId: capster1.capsterProfile!.id,
      status: "PENDING",
      notes: "Siap hadir on time dengan perlengkapan pribadi.",
    },
  });

  await prisma.booking.create({
    data: {
      shiftId: shift2.id,
      capsterId: capster2.capsterProfile!.id,
      status: "ACCEPTED",
    },
  });

  const pastBooking = await prisma.booking.create({
    data: {
      shiftId: shiftPast.id,
      capsterId: capster1.capsterProfile!.id,
      status: "COMPLETED",
    },
  });

  // 5. Review & Transaksi
  await prisma.review.create({
    data: {
      bookingId: pastBooking.id,
      reviewerId: owner1.id,
      rating: 5,
      comment: "Kerja sangat rapi, komunikasi baik dengan customer, datang tepat waktu.",
    },
  });

  await prisma.transaction.create({
    data: {
      userId: capster1.id,
      bookingId: pastBooking.id,
      type: "EARNING",
      amount: 250000,
      status: "COMPLETED",
    },
  });

  await prisma.transaction.create({
    data: {
      userId: capster1.id,
      type: "WITHDRAWAL",
      amount: 150000,
      status: "COMPLETED",
      bankName: "BCA",
      accountNumber: "8820192837",
    },
  });

  console.log("Seeding selesai dengan sukses!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
