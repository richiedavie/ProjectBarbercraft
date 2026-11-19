import { getCurrentUser } from "@/lib/auth";
import { DomainError } from "./errors";

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    throw new DomainError("UNAUTHORIZED");
  }
  return user;
}

export async function requireOwner() {
  const user = await requireUser();
  if (user.role !== "OWNER") {
    throw new DomainError("FORBIDDEN", "Akses khusus pemilik barbershop (Owner).");
  }
  if (!user.barberProfile) {
    throw new DomainError("NOT_FOUND", "Profil barbershop tidak ditemukan.");
  }
  return {
    user,
    profile: user.barberProfile,
  };
}

export async function requireCapster() {
  const user = await requireUser();
  if (user.role !== "CAPSTER") {
    throw new DomainError("FORBIDDEN", "Akses khusus Capster.");
  }
  if (!user.capsterProfile) {
    throw new DomainError("NOT_FOUND", "Profil capster tidak ditemukan.");
  }
  return {
    user,
    profile: user.capsterProfile,
  };
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "ADMIN") {
    throw new DomainError("FORBIDDEN", "Akses khusus Administrator.");
  }
  return user;
}

