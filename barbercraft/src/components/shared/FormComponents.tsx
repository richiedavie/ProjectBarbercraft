"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function Stepper({
  value,
  onChange,
  min = 1,
  max = 10,
  className,
}: StepperProps) {
  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div
      className={cn(
        "flex items-center border border-[#E6DFD3] rounded-[10px] bg-white h-12 w-fit px-2 select-none",
        className
      )}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        className="w-8 h-8 flex items-center justify-center text-[#1B1B1B] hover:text-[#F26B21] disabled:opacity-30 disabled:hover:text-[#1B1B1B] cursor-pointer"
        aria-label="Kurangi"
      >
        <Minus className="w-4 h-4" strokeWidth={1.5} />
      </button>
      <span className="w-10 text-center font-bold text-sm text-[#1B1B1B]">
        {value}
      </span>
      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        className="w-8 h-8 flex items-center justify-center text-[#1B1B1B] hover:text-[#F26B21] disabled:opacity-30 disabled:hover:text-[#1B1B1B] cursor-pointer"
        aria-label="Tambah"
      >
        <Plus className="w-4 h-4" strokeWidth={1.5} />
      </button>
    </div>
  );
}

interface MoneyInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  className?: string;
}

export function MoneyInput({
  value,
  onChange,
  placeholder = "0",
  className,
}: MoneyInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    onChange(raw ? parseInt(raw, 10) : 0);
  };

  const displayValue = value ? new Intl.NumberFormat("id-ID").format(value) : "";

  return (
    <div
      className={cn(
        "flex items-center border border-[#E6DFD3] rounded-[10px] bg-white h-12 px-3 focus-within:border-[#F26B21] transition-colors",
        className
      )}
    >
      <span className="text-sm font-bold text-[#1B1B1B] mr-2">Rp</span>
      <input
        type="text"
        inputMode="numeric"
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-[#1B1B1B] font-medium outline-none placeholder:text-[#5C5C5C]/60"
      />
    </div>
  );
}

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormSection({
  title,
  description,
  children,
  className,
}: FormSectionProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="border-b border-[#E6DFD3] pb-2">
        <h4 className="text-sm font-bold text-[#1B1B1B]">{title}</h4>
        {description && (
          <p className="text-xs text-[#5C5C5C] mt-0.5">{description}</p>
        )}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

