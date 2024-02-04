import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const timeDifference = now.getTime() - createdAt.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // Approximate, assuming 30 days per month
  const years = Math.floor(days / 365);

  if (years > 1) {
    return `${years} years ago`;
  } else if (years === 1) {
    return `1 year ago`;
  } else if (months > 1) {
    return `${months} months ago`;
  } else if (months === 1) {
    return `1 month ago`;
  } else if (days > 1) {
    return `${days} days ago`;
  } else if (days === 1) {
    return `1 day ago`;
  } else if (hours > 1) {
    return `${hours} hours ago`;
  } else if (hours === 1) {
    return `1 hour ago`;
  } else if (minutes > 1) {
    return `${minutes} minutes ago`;
  } else if (minutes === 1) {
    return `1 minute ago`;
  } else {
    return `just now`;
  }
};

export const formatBigNumber = (num: number): string => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + "B";
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(0) + "M";
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K";
  } else {
    return num.toString();
  }
};
