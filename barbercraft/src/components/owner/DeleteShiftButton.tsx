"use client";

import * as React from "react";
import { Trash2 } from "lucide-react";
import { deleteShiftAction } from "@/app/(owner)/owner/shift/actions";

interface DeleteShiftButtonProps {
  shiftId: string;
}

export function DeleteShiftButton({ shiftId }: DeleteShiftButtonProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus shift ini?");
    if (!confirmDelete) return;

    setIsDeleting(true);
    await deleteShiftAction(shiftId);
    setIsDeleting(false);
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-1.5 rounded-[8px] text-[#5C5C5C] hover:text-[#C0392B] hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-40"
      title="Hapus Shift"
      aria-label="Hapus Shift"
    >
      <Trash2 className="w-4 h-4" strokeWidth={1.5} />
    </button>
  );
}

