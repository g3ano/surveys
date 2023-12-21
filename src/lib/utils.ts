import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

export function capitalize(para: string) {
  return para.charAt(0).toUpperCase() + para.slice(1);
}
