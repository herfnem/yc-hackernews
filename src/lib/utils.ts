import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleApiError(error: unknown, defaultMessage: string): never {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const details = error.response?.data?.details;

    if (status === 500 && details) {
      throw new Error(`Server Error: ${details}`);
    }

    throw new Error(details || defaultMessage);
  }
  throw new Error("An unexpected error occurred.");
}
