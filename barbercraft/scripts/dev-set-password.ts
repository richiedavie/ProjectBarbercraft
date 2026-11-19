import { PrismaClient } from "@prisma/client";
import { hashPassword } from "better-auth/crypto";

const prisma = new PrismaClient();

async function main() {
  if (process.env.NODE_ENV === "production") {
    console.error("EROR: Skrip dev ini tidak boleh dijalankan di environment production!");
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const emailArg = args[0]?.trim().toLowerCase();
  const passwordArg = args[1];

  if (!emailArg || !passwordArg) {
    console.log("Penggunaan: npx tsx scripts/dev-set-password.ts <email> <password>");
    console.log("Contoh: node --experimental-strip-types scripts/dev-set-password.ts owner@roots.example.com Password123!");
    process.exit(1);
  }

  if (passwordArg.length < 8 || passwordArg.length > 128) {
    console.error("EROR: Password harus terdiri dari 8 hingga 128 karakter.");
    process.exit(1);
  }

  const user = await prisma.user.findUnique({
    where: { email: emailArg },
  });

  if (!user) {
    console.error(`EROR: User dengan email "${emailArg}" tidak ditemukan di database.`);
    process.exit(1);
  }

  const hashedPassword = await hashPassword(passwordArg);

  // Buat atau perbarui record Account credential milik user (Better Auth credential provider menggunakan userId sebagai accountId)
  await prisma.account.upsert({
    where: {
      providerId_accountId: {
        providerId: "credential",
        accountId: user.id,
      },
    },
    update: {
      password: hashedPassword,
    },
    create: {
      userId: user.id,
      providerId: "credential",
      accountId: user.id,
      password: hashedPassword,
    },
  });

  console.log(`SUKSES: Kata sandi untuk akun "${emailArg}" berhasil diperbarui.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

