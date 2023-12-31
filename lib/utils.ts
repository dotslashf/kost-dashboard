import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"
import { id } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  if (date === '-') return null
  return format(new Date(date), "EEEE. MMM dd, yyyy", { locale: id })
}

export function formatPhone(phone: string) {
  return phone.split('')[0] === '0' || phone.startsWith('+62') ? phone.substring(1) : phone
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount)
}