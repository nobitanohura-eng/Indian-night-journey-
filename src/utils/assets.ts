/**
 * Robust asset resolver that works in all deployment environments:
 * - Local development
 * - Cloud Run / AI Studio preview
 * - GitHub Pages (subdirectories)
 * - Vercel / Netlify
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = (import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL || './';
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${normalizedBase}${cleanPath}`;
}
