export type DomainErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "QUOTA_FULL"
  | "SHIFT_ENDED"
  | "ALREADY_PROCESSED"
  | "ALREADY_APPLIED"
  | "NOT_OWNER"
  | "INSUFFICIENT_BALANCE"
  | "INVALID_STATUS"
  | "UNKNOWN";

const ERROR_MESSAGES: Record<DomainErrorCode, string> = {
  UNAUTHORIZED: "Sesi login Anda tidak valid atau telah berakhir. Silakan login kembali.",
  FORBIDDEN: "Anda tidak memiliki izin untuk melakukan aksi ini.",
  NOT_FOUND: "Data yang diminta tidak ditemukan.",
  VALIDATION_ERROR: "Data yang dikirimkan tidak valid.",
  QUOTA_FULL: "Kuota shift ini sudah penuh atau tidak menerima pendaftaran lagi.",
  SHIFT_ENDED: "Shift ini sudah melewati batas waktu dan tidak dapat diubah.",
  ALREADY_PROCESSED: "Permintaan ini sudah pernah diproses sebelumnya.",
  ALREADY_APPLIED: "Anda sudah mengajukan lamaran untuk shift ini.",
  NOT_OWNER: "Hanya pemilik barbershop yang dapat melakukan perubahan ini.",
  INSUFFICIENT_BALANCE: "Saldo yang dapat ditarik tidak mencukupi.",
  INVALID_STATUS: "Status data tidak memungkinkan operasi ini dijalankan.",
  UNKNOWN: "Terjadi kesalahan pada sistem. Silakan coba beberapa saat lagi.",
};

export class DomainError extends Error {
  readonly code: DomainErrorCode;

  constructor(code: DomainErrorCode, customMessage?: string) {
    super(customMessage || ERROR_MESSAGES[code] || ERROR_MESSAGES.UNKNOWN);
    this.name = "DomainError";
    this.code = code;
  }
}

export function mapDomainError(err: unknown): { error: string; code: string } {
  if (err instanceof DomainError) {
    return { error: err.message, code: err.code };
  }

  console.error("Unexpected system error:", err);
  return {
    error: ERROR_MESSAGES.UNKNOWN,
    code: "UNKNOWN",
  };
}

