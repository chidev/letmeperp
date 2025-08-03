import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateShareableUrl(query: string, baseUrl?: string): string {
  const base = baseUrl || window.location.origin;
  const encodedQuery = encodeURIComponent(query.trim());
  return `${base}/?q=${encodedQuery}`;
}

export function extractQueryFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('q');
  } catch {
    return null;
  }
}

export function getPerplexitySearchUrl(query: string): string {
  return `https://www.perplexity.ai/?q=${encodeURIComponent(query)}`;
}
