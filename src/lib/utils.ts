import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatMMSS = (second: number) => {
  const date = new Date(0)
  date.setSeconds(second) // specify value for SECONDS here
  const timeString = date.toISOString().substring(11, 19)
  return timeString
}
