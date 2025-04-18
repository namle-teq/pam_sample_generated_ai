import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { CurrencyUnit } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number, unit: CurrencyUnit = "USD"): string {
  return new Intl.NumberFormat(unit === "USD" ? "en-US" : "vi-VN", {
    style: "currency",
    currency: unit,
    maximumFractionDigits: unit === "VND" ? 0 : 2,
  }).format(value)
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}
